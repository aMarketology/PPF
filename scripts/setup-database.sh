#!/bin/bash

# ===========================================
# Supabase Database Setup Script
# ===========================================
# This script helps you set up your Supabase database
# ===========================================

set -e

echo "🚀 Precision Project Flow - Database Setup"
echo "==========================================="
echo ""

# Check if .env.local exists
if [ ! -f .env.local ]; then
    echo "⚠️  No .env.local file found"
    echo ""
    echo "Creating .env.local from template..."
    cp .env.template .env.local
    echo "✅ Created .env.local"
    echo ""
    echo "📝 Please edit .env.local and add your Supabase credentials:"
    echo "   1. Go to https://supabase.com/dashboard"
    echo "   2. Open your project"
    echo "   3. Go to Settings → API"
    echo "   4. Copy Project URL and Keys to .env.local"
    echo ""
    echo "Then run this script again."
    exit 0
fi

# Check if Supabase URL is set
source .env.local
if [ -z "$NEXT_PUBLIC_SUPABASE_URL" ] || [ "$NEXT_PUBLIC_SUPABASE_URL" = "https://xxxxxxxxxxxxx.supabase.co" ]; then
    echo "❌ Error: NEXT_PUBLIC_SUPABASE_URL not set in .env.local"
    echo ""
    echo "Please edit .env.local and set your Supabase URL"
    echo "Get it from: Supabase Dashboard → Settings → API"
    exit 1
fi

if [ -z "$NEXT_PUBLIC_SUPABASE_ANON_KEY" ] || [[ "$NEXT_PUBLIC_SUPABASE_ANON_KEY" == eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9... ]]; then
    echo "❌ Error: NEXT_PUBLIC_SUPABASE_ANON_KEY not set in .env.local"
    echo ""
    echo "Please edit .env.local and set your Supabase anon key"
    echo "Get it from: Supabase Dashboard → Settings → API"
    exit 1
fi

echo "✅ Environment variables configured"
echo ""

# Test database connection
echo "🔄 Testing database connection..."
echo ""
node scripts/test-database.js

echo ""
echo "==========================================="
echo "📋 Next Steps:"
echo "==========================================="
echo ""
echo "1. If all tables show ✅, run seed script:"
echo "   node scripts/seed-test-data.js"
echo ""
echo "2. If you see ❌ errors:"
echo "   a. Go to Supabase Dashboard → SQL Editor"
echo "   b. Run the SQL script: supabase/COMPLETE_SETUP.sql"
echo "   c. Run this script again to verify"
echo ""
echo "3. Start development server:"
echo "   npm run dev"
echo ""
echo "4. Open http://localhost:3000"
echo ""
echo "📚 Documentation:"
echo "   - SETUP_CHECKLIST.md - Step-by-step guide"
echo "   - SUPABASE_SETUP_GUIDE.md - Detailed setup"
echo ""
