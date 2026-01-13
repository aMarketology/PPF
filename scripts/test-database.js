#!/usr/bin/env node

/**
 * Database Connection Test Script
 * Tests connection to Supabase and verifies table setup
 */

require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Error: Missing Supabase credentials');
  console.error('Please create .env.local file with:');
  console.error('  NEXT_PUBLIC_SUPABASE_URL=your-url');
  console.error('  NEXT_PUBLIC_SUPABASE_ANON_KEY=your-key');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function testDatabase() {
  console.log('🔄 Testing Supabase connection...\n');
  console.log('URL:', supabaseUrl);
  console.log('Key:', supabaseKey.substring(0, 20) + '...\n');

  const tables = [
    'profiles',
    'company_profiles',
    'products',
    'product_orders',
    'payment_intents',
    'stripe_connect_accounts',
  ];

  let allGood = true;

  for (const table of tables) {
    try {
      const { data, error, count } = await supabase
        .from(table)
        .select('*', { count: 'exact', head: true });

      if (error) {
        console.error(`❌ ${table}: ${error.message}`);
        allGood = false;
      } else {
        console.log(`✅ ${table}: Connected (${count || 0} rows)`);
      }
    } catch (err) {
      console.error(`❌ ${table}: ${err.message}`);
      allGood = false;
    }
  }

  console.log('\n' + '='.repeat(50));
  if (allGood) {
    console.log('✅ All database tables are accessible!');
    console.log('\nNext steps:');
    console.log('1. Run seed script: node scripts/seed-test-data.js');
    console.log('2. Start dev server: npm run dev');
    console.log('3. Visit http://localhost:3000');
  } else {
    console.log('❌ Some tables are not accessible');
    console.log('\nTroubleshooting:');
    console.log('1. Check if you ran COMPLETE_SETUP.sql in Supabase SQL Editor');
    console.log('2. Verify Row Level Security policies are enabled');
    console.log('3. Check Supabase dashboard for errors');
  }
  console.log('='.repeat(50) + '\n');
}

// Run the test
testDatabase().catch(console.error);
