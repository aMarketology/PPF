/**
 * Seed Script - Test Data for Product Marketplace
 * 
 * This script creates:
 * - 5 fake test companies
 * - 15 fake products across different categories
 * - Realistic data for testing
 * 
 * Run with: node scripts/seed-test-data.js
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

// Test Companies Data
const testCompanies = [
  {
    email: 'contact@structuretech.com',
    password: 'TestPass123!',
    company_name: 'StructureTech Engineering',
    description: 'Leading structural engineering firm specializing in high-rise buildings and complex structures. Over 20 years of experience.',
    specialties: 'Structural Analysis, Seismic Design, High-Rise Buildings, Bridge Engineering',
    website: 'https://structuretech-demo.com',
    phone: '(555) 123-4567',
    address: '123 Engineering Plaza',
    city: 'San Francisco',
    state: 'CA',
    zip_code: '94105',
    products: [
      {
        name: 'Residential Structural Analysis',
        description: 'Comprehensive structural analysis for residential buildings up to 4 stories. Includes foundation design, load calculations, and detailed reports.',
        price: 2500.00,
        category: 'Structural Engineering',
        delivery_time_days: 14,
        image_url: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=400&h=300&fit=crop'
      },
      {
        name: 'Commercial Building Structural Design',
        description: 'Full structural design services for commercial buildings including office spaces, retail centers, and mixed-use developments.',
        price: 7500.00,
        category: 'Structural Engineering',
        delivery_time_days: 30,
        image_url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop'
      },
      {
        name: 'Seismic Retrofit Analysis',
        description: 'Seismic vulnerability assessment and retrofit recommendations for existing buildings to meet current code requirements.',
        price: 4500.00,
        category: 'Structural Engineering',
        delivery_time_days: 21,
        image_url: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=400&h=300&fit=crop'
      }
    ]
  },
  {
    email: 'info@mechanix.com',
    password: 'TestPass123!',
    company_name: 'MechaniX Solutions',
    description: 'Expert mechanical engineering services for HVAC, plumbing, and industrial systems. Energy-efficient solutions for modern buildings.',
    specialties: 'HVAC Design, Plumbing Systems, Energy Modeling, Industrial Equipment',
    website: 'https://mechanix-demo.com',
    phone: '(555) 234-5678',
    address: '456 Tech Drive',
    city: 'Austin',
    state: 'TX',
    zip_code: '78701',
    products: [
      {
        name: 'HVAC System Design Package',
        description: 'Complete HVAC system design including load calculations, equipment selection, ductwork layout, and control systems for buildings up to 50,000 sq ft.',
        price: 5000.00,
        category: 'Mechanical Engineering',
        delivery_time_days: 20,
        image_url: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&h=300&fit=crop'
      },
      {
        name: 'Energy Efficiency Audit',
        description: 'Comprehensive energy audit with thermal imaging, equipment analysis, and recommendations for reducing energy costs by 20-40%.',
        price: 1800.00,
        category: 'Consulting Services',
        delivery_time_days: 7,
        image_url: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=400&h=300&fit=crop'
      },
      {
        name: 'Industrial Equipment Specification',
        description: 'Custom specification and selection of industrial mechanical equipment including pumps, compressors, and process equipment.',
        price: 3200.00,
        category: 'Mechanical Engineering',
        delivery_time_days: 10,
        image_url: 'https://images.unsplash.com/photo-1565373679347-9c8d8c1c6f4d?w=400&h=300&fit=crop'
      }
    ]
  },
  {
    email: 'hello@powerdesign.com',
    password: 'TestPass123!',
    company_name: 'PowerDesign Electrical',
    description: 'Cutting-edge electrical engineering firm focused on power distribution, lighting design, and renewable energy integration.',
    specialties: 'Power Distribution, Lighting Design, Solar Integration, Data Centers',
    website: 'https://powerdesign-demo.com',
    phone: '(555) 345-6789',
    address: '789 Innovation Blvd',
    city: 'Seattle',
    state: 'WA',
    zip_code: '98101',
    products: [
      {
        name: 'Commercial Electrical System Design',
        description: 'Complete electrical system design including power distribution, lighting, fire alarm, and telecommunications infrastructure.',
        price: 6000.00,
        category: 'Electrical Engineering',
        delivery_time_days: 25,
        image_url: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=400&h=300&fit=crop'
      },
      {
        name: 'LED Lighting Retrofit Design',
        description: 'Energy-efficient LED lighting upgrade design with ROI analysis, photometric calculations, and rebate assistance.',
        price: 2200.00,
        category: 'Electrical Engineering',
        delivery_time_days: 10,
        image_url: 'https://images.unsplash.com/photo-1524234107056-1f1f2e7c5a8b?w=400&h=300&fit=crop'
      },
      {
        name: 'Solar PV System Integration',
        description: 'Complete solar photovoltaic system design with grid integration, battery storage options, and utility interconnection documents.',
        price: 4800.00,
        category: 'Electrical Engineering',
        delivery_time_days: 18,
        image_url: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400&h=300&fit=crop'
      }
    ]
  },
  {
    email: 'contact@civilpro.com',
    password: 'TestPass123!',
    company_name: 'CivilPro Engineering',
    description: 'Comprehensive civil engineering services for site development, transportation, and water resources projects.',
    specialties: 'Site Development, Grading Plans, Stormwater Management, Traffic Studies',
    website: 'https://civilpro-demo.com',
    phone: '(555) 456-7890',
    address: '321 Commerce St',
    city: 'Denver',
    state: 'CO',
    zip_code: '80202',
    products: [
      {
        name: 'Site Development Plan',
        description: 'Complete site civil engineering including grading, drainage, utilities, and erosion control for developments up to 10 acres.',
        price: 5500.00,
        category: 'Civil Engineering',
        delivery_time_days: 28,
        image_url: 'https://images.unsplash.com/photo-1590932775730-e4b0d5cd2e5f?w=400&h=300&fit=crop'
      },
      {
        name: 'Stormwater Management Design',
        description: 'Stormwater detention, retention, and treatment system design with hydrologic and hydraulic calculations.',
        price: 3800.00,
        category: 'Civil Engineering',
        delivery_time_days: 15,
        image_url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop'
      },
      {
        name: 'Traffic Impact Study',
        description: 'Professional traffic impact analysis including trip generation, intersection analysis, and mitigation recommendations.',
        price: 4200.00,
        category: 'Civil Engineering',
        delivery_time_days: 20,
        image_url: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop'
      }
    ]
  },
  {
    email: 'info@codecrafters.com',
    password: 'TestPass123!',
    company_name: 'CodeCrafters Software',
    description: 'Modern software engineering firm specializing in web applications, mobile apps, and cloud infrastructure.',
    specialties: 'Web Development, Mobile Apps, Cloud Architecture, DevOps, API Design',
    website: 'https://codecrafters-demo.com',
    phone: '(555) 567-8901',
    address: '654 Digital Avenue',
    city: 'Boston',
    state: 'MA',
    zip_code: '02101',
    products: [
      {
        name: 'Custom Web Application Development',
        description: 'Full-stack web application development using React, Node.js, and modern cloud infrastructure. Includes design, development, testing, and deployment.',
        price: 8500.00,
        category: 'Software Engineering',
        delivery_time_days: 45,
        image_url: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop'
      },
      {
        name: 'Mobile App Development',
        description: 'Native iOS and Android mobile application development with cross-platform compatibility. Includes UI/UX design and app store deployment.',
        price: 12000.00,
        category: 'Software Engineering',
        delivery_time_days: 60,
        image_url: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=300&fit=crop'
      },
      {
        name: 'API Design & Development',
        description: 'RESTful API design and development with comprehensive documentation, authentication, and scalable cloud deployment.',
        price: 4500.00,
        category: 'Software Engineering',
        delivery_time_days: 21,
        image_url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=300&fit=crop'
      }
    ]
  }
];

async function seedTestData() {
  console.log('🌱 Starting seed process...\n');

  let successCount = 0;
  let errorCount = 0;

  for (const companyData of testCompanies) {
    try {
      console.log(`📦 Creating company: ${companyData.company_name}`);

      // 1. Create auth user
      const { data: authData, error: authError } = await supabase.auth.admin.createUser({
        email: companyData.email,
        password: companyData.password,
        email_confirm: true,
      });

      if (authError) {
        if (authError.message.includes('already registered')) {
          console.log(`   ⚠️  User ${companyData.email} already exists, skipping...`);
          continue;
        }
        throw authError;
      }

      const userId = authData.user.id;
      console.log(`   ✅ Auth user created: ${userId}`);

      // 2. Create company profile
      const { data: companyProfile, error: companyError } = await supabase
        .from('company_profiles')
        .insert([{
          owner_id: userId,
          company_name: companyData.company_name,
          description: companyData.description,
          specialties: [companyData.specialties],
          website: companyData.website,
          email: companyData.email,
          phone: companyData.phone,
          street_address: companyData.address,
          city: companyData.city,
          state: companyData.state,
          zip_code: companyData.zip_code,
        }])
        .select()
        .single();

      if (companyError) throw companyError;
      console.log(`   ✅ Company profile created: ${companyProfile.id}`);

      // 3. Create products for this company
      for (const product of companyData.products) {
        const { error: productError } = await supabase
          .from('products')
          .insert([{
            company_id: companyProfile.id,
            name: product.name,
            description: product.description,
            price: product.price,
            currency: 'usd',
            category: product.category,
            delivery_time_days: product.delivery_time_days,
            image_url: product.image_url,
            is_active: true,
          }]);

        if (productError) throw productError;
        console.log(`   ✅ Product created: ${product.name}`);
      }

      successCount++;
      console.log(`✅ ${companyData.company_name} setup complete!\n`);

    } catch (error) {
      errorCount++;
      console.error(`❌ Error creating ${companyData.company_name}:`, error.message);
      console.log('');
    }
  }

  console.log('\n' + '='.repeat(60));
  console.log('🎉 Seed process complete!');
  console.log('='.repeat(60));
  console.log(`✅ Success: ${successCount} companies created`);
  console.log(`❌ Errors: ${errorCount} companies failed`);
  console.log(`📦 Total products: ${successCount * 3} products created`);
  console.log('\n📋 Test Accounts:');
  console.log('─'.repeat(60));
  testCompanies.forEach((company, index) => {
    if (index < successCount) {
      console.log(`\n${index + 1}. ${company.company_name}`);
      console.log(`   Email: ${company.email}`);
      console.log(`   Password: ${company.password}`);
      console.log(`   Products: ${company.products.length}`);
    }
  });
  console.log('\n' + '='.repeat(60));
  console.log('\n💡 Next steps:');
  console.log('1. Visit http://localhost:3000/marketplace/products');
  console.log('2. See all test products in the marketplace');
  console.log('3. Login with any test account above');
  console.log('4. Manage products at http://localhost:3000/products');
  console.log('');
}

// Run the seed script
seedTestData().catch(console.error);
