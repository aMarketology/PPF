#!/bin/bash

# Quick RLS Fix Script
# This script helps you apply the RLS policy fix to your Supabase database

echo "🔧 Precision Project Flow - RLS Policy Fix"
echo "=========================================="
echo ""
echo "This will fix the 401 Unauthorized error when vendors try to create company profiles."
echo ""
echo "📋 Steps to apply this fix:"
echo ""
echo "1. Go to your Supabase Dashboard:"
echo "   https://supabase.com/dashboard/project/vqmadoejowuyvdrisnyd"
echo ""
echo "2. Click on 'SQL Editor' in the left sidebar"
echo ""
echo "3. Click 'New Query'"
echo ""
echo "4. Copy and paste the contents of this file:"
echo "   supabase/migrations/007_fix_company_profiles_rls.sql"
echo ""
echo "5. Click 'Run' to execute the migration"
echo ""
echo "6. You should see: 'Success. No rows returned'"
echo ""
echo "7. Try the vendor signup again!"
echo ""
echo "=========================================="
echo ""
echo "Alternative: Run this command to copy the SQL to clipboard (macOS):"
echo "cat supabase/migrations/007_fix_company_profiles_rls.sql | pbcopy"
echo ""

# Check if we're on macOS and can copy to clipboard
if [[ "$OSTYPE" == "darwin"* ]]; then
    echo "Would you like to copy the SQL to clipboard? (y/n)"
    read -r response
    if [[ "$response" =~ ^[Yy]$ ]]; then
        cat supabase/migrations/007_fix_company_profiles_rls.sql | pbcopy
        echo "✅ SQL copied to clipboard! Now paste it in Supabase SQL Editor."
    fi
fi
