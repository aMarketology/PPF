-- =====================================================
-- COMPLETE MARKETPLACE DATABASE SETUP
-- =====================================================
-- Run this entire script in your Supabase SQL Editor
-- This will create all tables, functions, triggers, and policies
-- for the complete marketplace platform
-- =====================================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- =====================================================
-- 1. USER PROFILES
-- =====================================================
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT,
    avatar_url TEXT,
    phone TEXT,
    bio TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- 2. COMPANY PROFILES
-- =====================================================
CREATE TABLE IF NOT EXISTS public.company_profiles (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    owner_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    company_name TEXT NOT NULL,
    description TEXT,
    email TEXT,
    phone TEXT,
    website TEXT,
    address TEXT,
    city TEXT,
    state TEXT,
    zip_code TEXT,
    country TEXT DEFAULT 'US',
    logo_url TEXT,
    specialties TEXT[],
    is_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    
    CONSTRAINT unique_owner UNIQUE (owner_id)
);

-- =====================================================
-- 3. STRIPE CONNECT ACCOUNTS
-- =====================================================
CREATE TABLE IF NOT EXISTS public.stripe_connect_accounts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    company_id UUID NOT NULL REFERENCES company_profiles(id) ON DELETE CASCADE,
    stripe_account_id TEXT NOT NULL UNIQUE,
    account_type TEXT DEFAULT 'standard',
    charges_enabled BOOLEAN DEFAULT FALSE,
    payouts_enabled BOOLEAN DEFAULT FALSE,
    details_submitted BOOLEAN DEFAULT FALSE,
    country TEXT,
    default_currency TEXT DEFAULT 'usd',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    
    CONSTRAINT unique_company_stripe UNIQUE (company_id)
);

-- =====================================================
-- 4. PRODUCTS/SERVICES
-- =====================================================
CREATE TABLE IF NOT EXISTS public.products (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    company_id UUID NOT NULL REFERENCES company_profiles(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL CHECK (price > 0),
    currency TEXT DEFAULT 'usd',
    category TEXT,
    delivery_time_days INTEGER,
    is_active BOOLEAN DEFAULT TRUE,
    image_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    
    CONSTRAINT valid_price CHECK (price >= 1.00)
);

-- =====================================================
-- 5. PRODUCT ORDERS
-- =====================================================
CREATE TABLE IF NOT EXISTS public.product_orders (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    order_number TEXT NOT NULL UNIQUE,
    product_id UUID NOT NULL REFERENCES products(id) ON DELETE RESTRICT,
    company_id UUID NOT NULL REFERENCES company_profiles(id) ON DELETE RESTRICT,
    buyer_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE RESTRICT,
    
    -- Order details
    product_name TEXT NOT NULL,
    product_price DECIMAL(10, 2) NOT NULL,
    quantity INTEGER DEFAULT 1,
    subtotal DECIMAL(10, 2) NOT NULL,
    platform_fee DECIMAL(10, 2) NOT NULL,
    total_amount DECIMAL(10, 2) NOT NULL,
    currency TEXT DEFAULT 'usd',
    
    -- Status tracking
    status TEXT DEFAULT 'pending_payment' CHECK (
        status IN (
            'pending_payment',
            'paid',
            'in_progress',
            'delivered',
            'completed',
            'cancelled',
            'refunded',
            'disputed'
        )
    ),
    
    -- Important dates
    paid_at TIMESTAMPTZ,
    delivered_at TIMESTAMPTZ,
    completed_at TIMESTAMPTZ,
    cancelled_at TIMESTAMPTZ,
    
    -- Notes
    delivery_notes TEXT,
    buyer_notes TEXT,
    company_notes TEXT,
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- 6. PAYMENT INTENTS
-- =====================================================
CREATE TABLE IF NOT EXISTS public.payment_intents (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    order_id UUID NOT NULL REFERENCES product_orders(id) ON DELETE CASCADE,
    stripe_payment_intent_id TEXT NOT NULL UNIQUE,
    amount DECIMAL(10, 2) NOT NULL,
    currency TEXT DEFAULT 'usd',
    status TEXT NOT NULL,
    client_secret TEXT,
    payment_method TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- 7. STRIPE TRANSFERS
-- =====================================================
CREATE TABLE IF NOT EXISTS public.stripe_transfers (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    order_id UUID NOT NULL REFERENCES product_orders(id) ON DELETE RESTRICT,
    stripe_transfer_id TEXT NOT NULL UNIQUE,
    destination_account_id TEXT NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    currency TEXT DEFAULT 'usd',
    status TEXT DEFAULT 'pending',
    transferred_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- 8. PLATFORM FEES
-- =====================================================
CREATE TABLE IF NOT EXISTS public.platform_fees (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    order_id UUID NOT NULL REFERENCES product_orders(id) ON DELETE RESTRICT,
    amount DECIMAL(10, 2) NOT NULL,
    currency TEXT DEFAULT 'usd',
    collected_at TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- 9. REFUNDS
-- =====================================================
CREATE TABLE IF NOT EXISTS public.refunds (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    order_id UUID NOT NULL REFERENCES product_orders(id) ON DELETE RESTRICT,
    stripe_refund_id TEXT NOT NULL UNIQUE,
    amount DECIMAL(10, 2) NOT NULL,
    currency TEXT DEFAULT 'usd',
    reason TEXT,
    status TEXT DEFAULT 'pending',
    refunded_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- INDEXES FOR PERFORMANCE
-- =====================================================
CREATE INDEX IF NOT EXISTS idx_profiles_email ON profiles(email);
CREATE INDEX IF NOT EXISTS idx_company_profiles_owner ON company_profiles(owner_id);

CREATE INDEX IF NOT EXISTS idx_products_company ON products(company_id);
CREATE INDEX IF NOT EXISTS idx_products_active ON products(is_active) WHERE is_active = TRUE;
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_created ON products(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_orders_company ON product_orders(company_id);
CREATE INDEX IF NOT EXISTS idx_orders_buyer ON product_orders(buyer_id);
CREATE INDEX IF NOT EXISTS idx_orders_product ON product_orders(product_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON product_orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created ON product_orders(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_payment_intents_order ON payment_intents(order_id);
CREATE INDEX IF NOT EXISTS idx_stripe_transfers_order ON stripe_transfers(order_id);

-- =====================================================
-- FUNCTIONS
-- =====================================================

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, email, full_name, avatar_url)
    VALUES (
        NEW.id,
        NEW.email,
        NEW.raw_user_meta_data->>'full_name',
        NEW.raw_user_meta_data->>'avatar_url'
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Generate unique order number
CREATE OR REPLACE FUNCTION generate_order_number()
RETURNS TEXT AS $$
DECLARE
    new_number TEXT;
    exists BOOLEAN;
BEGIN
    LOOP
        new_number := 'ORD-' || TO_CHAR(NOW(), 'YYYYMMDD') || '-' || 
                      LPAD(FLOOR(RANDOM() * 9999)::TEXT, 4, '0');
        SELECT EXISTS(SELECT 1 FROM product_orders WHERE order_number = new_number) INTO exists;
        IF NOT exists THEN
            RETURN new_number;
        END IF;
    END LOOP;
END;
$$ LANGUAGE plpgsql;

-- Auto-update timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- =====================================================
-- TRIGGERS
-- =====================================================

-- Trigger to create profile on user signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_new_user();

-- Update timestamp triggers
CREATE TRIGGER update_profiles_updated_at
    BEFORE UPDATE ON profiles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_company_profiles_updated_at
    BEFORE UPDATE ON company_profiles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_products_updated_at
    BEFORE UPDATE ON products
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_orders_updated_at
    BEFORE UPDATE ON product_orders
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_stripe_connect_updated_at
    BEFORE UPDATE ON stripe_connect_accounts
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_payment_intents_updated_at
    BEFORE UPDATE ON payment_intents
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- ROW LEVEL SECURITY (RLS)
-- =====================================================

-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE company_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE stripe_connect_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE payment_intents ENABLE ROW LEVEL SECURITY;
ALTER TABLE stripe_transfers ENABLE ROW LEVEL SECURITY;
ALTER TABLE platform_fees ENABLE ROW LEVEL SECURITY;
ALTER TABLE refunds ENABLE ROW LEVEL SECURITY;

-- PROFILES POLICIES
CREATE POLICY "Public profiles are viewable by everyone"
    ON profiles FOR SELECT
    USING (true);

CREATE POLICY "Users can update their own profile"
    ON profiles FOR UPDATE
    USING (auth.uid() = id);

-- COMPANY PROFILES POLICIES
CREATE POLICY "Company profiles are viewable by everyone"
    ON company_profiles FOR SELECT
    USING (true);

CREATE POLICY "Users can create their own company profile"
    ON company_profiles FOR INSERT
    WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "Users can update their own company profile"
    ON company_profiles FOR UPDATE
    USING (auth.uid() = owner_id);

-- STRIPE CONNECT POLICIES
CREATE POLICY "Companies can view their own Stripe accounts"
    ON stripe_connect_accounts FOR SELECT
    USING (
        company_id IN (
            SELECT id FROM company_profiles WHERE owner_id = auth.uid()
        )
    );

CREATE POLICY "Companies can update their own Stripe accounts"
    ON stripe_connect_accounts FOR UPDATE
    USING (
        company_id IN (
            SELECT id FROM company_profiles WHERE owner_id = auth.uid()
        )
    );

-- PRODUCTS POLICIES
CREATE POLICY "Anyone can view active products"
    ON products FOR SELECT
    USING (is_active = TRUE);

CREATE POLICY "Companies can view all their own products"
    ON products FOR SELECT
    USING (
        company_id IN (
            SELECT id FROM company_profiles WHERE owner_id = auth.uid()
        )
    );

CREATE POLICY "Companies can insert products"
    ON products FOR INSERT
    WITH CHECK (
        company_id IN (
            SELECT id FROM company_profiles WHERE owner_id = auth.uid()
        )
    );

CREATE POLICY "Companies can update their own products"
    ON products FOR UPDATE
    USING (
        company_id IN (
            SELECT id FROM company_profiles WHERE owner_id = auth.uid()
        )
    );

CREATE POLICY "Companies can delete their own products"
    ON products FOR DELETE
    USING (
        company_id IN (
            SELECT id FROM company_profiles WHERE owner_id = auth.uid()
        )
    );

-- ORDERS POLICIES
CREATE POLICY "Buyers can view their orders"
    ON product_orders FOR SELECT
    USING (buyer_id = auth.uid());

CREATE POLICY "Companies can view orders for their products"
    ON product_orders FOR SELECT
    USING (
        company_id IN (
            SELECT id FROM company_profiles WHERE owner_id = auth.uid()
        )
    );

CREATE POLICY "Buyers can create orders"
    ON product_orders FOR INSERT
    WITH CHECK (buyer_id = auth.uid());

CREATE POLICY "Companies can update their orders"
    ON product_orders FOR UPDATE
    USING (
        company_id IN (
            SELECT id FROM company_profiles WHERE owner_id = auth.uid()
        )
    );

-- PAYMENT INTENTS POLICIES
CREATE POLICY "Users can view their payment intents"
    ON payment_intents FOR SELECT
    USING (
        order_id IN (
            SELECT id FROM product_orders WHERE buyer_id = auth.uid()
        )
    );

CREATE POLICY "Companies can view payment intents for their orders"
    ON payment_intents FOR SELECT
    USING (
        order_id IN (
            SELECT id FROM product_orders 
            WHERE company_id IN (
                SELECT id FROM company_profiles WHERE owner_id = auth.uid()
            )
        )
    );

-- TRANSFERS POLICIES
CREATE POLICY "Companies can view their transfers"
    ON stripe_transfers FOR SELECT
    USING (
        order_id IN (
            SELECT id FROM product_orders 
            WHERE company_id IN (
                SELECT id FROM company_profiles WHERE owner_id = auth.uid()
            )
        )
    );

-- REFUNDS POLICIES
CREATE POLICY "Users can view refunds for their orders"
    ON refunds FOR SELECT
    USING (
        order_id IN (
            SELECT id FROM product_orders 
            WHERE buyer_id = auth.uid()
            OR company_id IN (
                SELECT id FROM company_profiles WHERE owner_id = auth.uid()
            )
        )
    );

-- =====================================================
-- GRANTS
-- =====================================================
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;

-- =====================================================
-- VERIFICATION
-- =====================================================
-- Run this to verify all tables were created:
-- SELECT table_name FROM information_schema.tables 
-- WHERE table_schema = 'public' ORDER BY table_name;

-- Expected tables:
-- ✅ company_profiles
-- ✅ payment_intents
-- ✅ platform_fees
-- ✅ product_orders
-- ✅ products
-- ✅ profiles
-- ✅ refunds
-- ✅ stripe_connect_accounts
-- ✅ stripe_transfers
