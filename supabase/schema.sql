-- =============================================
-- PRECISION PRODUCT FLOW - SIMPLIFIED SCHEMA
-- Engineering Marketplace Platform
-- =============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============================================
-- PROFILES TABLE
-- User profiles (clients and engineers)
-- =============================================
CREATE TABLE public.profiles (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT,
    avatar_url TEXT,
    user_type TEXT CHECK (user_type IN ('client', 'engineer')) NOT NULL DEFAULT 'client',
    company_name TEXT,
    bio TEXT,
    location TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- =============================================
-- SERVICES TABLE
-- Services offered by engineers
-- =============================================
CREATE TABLE public.services (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    provider_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    category TEXT NOT NULL,
    tags TEXT[],
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- =============================================
-- ORDERS TABLE
-- Orders placed by clients
-- =============================================
CREATE TABLE public.orders (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    client_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    engineer_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    service_id UUID REFERENCES public.services(id) ON DELETE SET NULL,
    status TEXT CHECK (status IN ('pending', 'in_progress', 'completed', 'cancelled')) DEFAULT 'pending',
    total_amount DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- =============================================
-- INDEXES
-- =============================================
CREATE INDEX idx_profiles_user_type ON public.profiles(user_type);
CREATE INDEX idx_services_provider_id ON public.services(provider_id);
CREATE INDEX idx_services_active ON public.services(active);
CREATE INDEX idx_orders_client_id ON public.orders(client_id);
CREATE INDEX idx_orders_engineer_id ON public.orders(engineer_id);

-- =============================================
-- ROW LEVEL SECURITY
-- =============================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Profiles: Public read, users can update their own
CREATE POLICY "profiles_select" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "profiles_update" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "profiles_insert" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- Services: Public read active services, engineers manage their own
CREATE POLICY "services_select" ON public.services FOR SELECT USING (active = true OR auth.uid() = provider_id);
CREATE POLICY "services_insert" ON public.services FOR INSERT WITH CHECK (auth.uid() = provider_id);
CREATE POLICY "services_update" ON public.services FOR UPDATE USING (auth.uid() = provider_id);
CREATE POLICY "services_delete" ON public.services FOR DELETE USING (auth.uid() = provider_id);

-- Orders: Users can view and manage their own orders
CREATE POLICY "orders_select" ON public.orders FOR SELECT USING (auth.uid() = client_id OR auth.uid() = engineer_id);
CREATE POLICY "orders_insert" ON public.orders FOR INSERT WITH CHECK (auth.uid() = client_id);
CREATE POLICY "orders_update" ON public.orders FOR UPDATE USING (auth.uid() = client_id OR auth.uid() = engineer_id);

-- =============================================
-- FUNCTIONS
-- =============================================

-- Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER profiles_updated_at BEFORE UPDATE ON public.profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, email, full_name)
    VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'full_name');
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION handle_new_user();
