/**
 * Cleanup Script - Remove Test Data
 * 
 * This script deletes all test users and related data
 * Run with: node scripts/cleanup-test-data.js
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config({ path: join(__dirname, '../.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase credentials in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Test emails to delete
const testEmails = [
  'contact@structuretech.com',
  'info@mechanix.com',
  'hello@powerdesign.com',
  'contact@civilpro.com',
  'info@codecrafters.com',
];

async function cleanupTestData() {
  console.log('🧹 Starting cleanup process...\n');

  for (const email of testEmails) {
    try {
      console.log(`🗑️  Deleting user: ${email}`);
      
      // Get user by email
      const { data: users } = await supabase.auth.admin.listUsers();
      const user = users.users.find(u => u.email === email);
      
      if (user) {
        // Delete user (cascade will delete profile and company)
        const { error } = await supabase.auth.admin.deleteUser(user.id);
        if (error) throw error;
        console.log(`   ✅ Deleted user and related data\n`);
      } else {
        console.log(`   ⚠️  User not found\n`);
      }
    } catch (error) {
      console.error(`   ❌ Error:`, error.message, '\n');
    }
  }

  console.log('✅ Cleanup complete!\n');
}

cleanupTestData().catch(console.error);
