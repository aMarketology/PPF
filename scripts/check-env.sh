#!/bin/bash

echo "============================================"
echo "🔍 Environment Variables Check"
echo "============================================"
echo ""

# Check .env.local exists
if [ -f ".env.local" ]; then
    echo "✅ .env.local file found"
    echo ""
    
    # Check each required variable
    echo "Checking required variables:"
    echo ""
    
    # Supabase
    if grep -q "NEXT_PUBLIC_SUPABASE_URL=" .env.local; then
        SUPABASE_URL=$(grep "NEXT_PUBLIC_SUPABASE_URL=" .env.local | cut -d '=' -f2)
        echo "✅ NEXT_PUBLIC_SUPABASE_URL: ${SUPABASE_URL:0:30}..."
    else
        echo "❌ NEXT_PUBLIC_SUPABASE_URL: MISSING"
    fi
    
    if grep -q "NEXT_PUBLIC_SUPABASE_ANON_KEY=" .env.local; then
        echo "✅ NEXT_PUBLIC_SUPABASE_ANON_KEY: Found"
    else
        echo "❌ NEXT_PUBLIC_SUPABASE_ANON_KEY: MISSING"
    fi
    
    # Stripe
    if grep -q "STRIPE_SECRET_KEY=" .env.local; then
        STRIPE_KEY=$(grep "STRIPE_SECRET_KEY=" .env.local | cut -d '=' -f2)
        echo "✅ STRIPE_SECRET_KEY: ${STRIPE_KEY:0:15}..."
    else
        echo "❌ STRIPE_SECRET_KEY: MISSING"
    fi
    
    if grep -q "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=" .env.local; then
        STRIPE_PUB=$(grep "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=" .env.local | cut -d '=' -f2)
        echo "✅ NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: ${STRIPE_PUB:0:15}..."
    else
        echo "❌ NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: MISSING"
    fi
    
    # App URL (optional)
    if grep -q "NEXT_PUBLIC_APP_URL=" .env.local; then
        APP_URL=$(grep "NEXT_PUBLIC_APP_URL=" .env.local | cut -d '=' -f2)
        echo "✅ NEXT_PUBLIC_APP_URL: $APP_URL"
    else
        echo "⚠️  NEXT_PUBLIC_APP_URL: Not set (will default to localhost)"
    fi
    
else
    echo "❌ .env.local file NOT FOUND"
    echo ""
    echo "Create it by copying .env.example:"
    echo "  cp .env.example .env.local"
fi

echo ""
echo "============================================"
echo "📋 Copy These to Vercel"
echo "============================================"
echo ""
echo "Go to: https://vercel.com/your-project/settings/environment-variables"
echo ""
echo "Add these variables (copy from your .env.local):"
echo ""
echo "1. NEXT_PUBLIC_SUPABASE_URL"
echo "2. NEXT_PUBLIC_SUPABASE_ANON_KEY"
echo "3. STRIPE_SECRET_KEY"
echo "4. NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY"
echo "5. NEXT_PUBLIC_APP_URL (set to your Vercel domain)"
echo ""
echo "⚠️  IMPORTANT: After adding env vars, REDEPLOY!"
echo ""
echo "============================================"
