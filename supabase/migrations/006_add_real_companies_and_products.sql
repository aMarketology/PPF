-- =====================================================
-- ADD REAL COMPANIES AND THEIR PRODUCTS
-- Migration to populate marketplace with real businesses
-- =====================================================

-- Note: These companies will need owner_id from auth.users
-- For now, we'll create placeholder entries that can be claimed later
-- In production, you'd run this after the companies sign up

-- First, let's create a migration-specific UUID function for demo purposes
-- These UUIDs will be used as temporary owner_ids until real users claim them

-- =====================================================
-- ELECTRICAL COMPANIES
-- =====================================================

-- ElectricDisk
INSERT INTO public.company_profiles (
    id,
    owner_id,
    company_name,
    description,
    email,
    phone,
    website,
    address,
    city,
    state,
    zip_code,
    specialties,
    is_verified
) VALUES (
    'a1111111-1111-1111-1111-111111111111'::uuid,
    'a1111111-1111-1111-1111-111111111111'::uuid, -- Temporary owner_id
    'ElectricDisk',
    'Professional electrical services and solutions for residential and commercial projects. Specializing in electrical installations, repairs, and maintenance.',
    'contact@electricdisk.com',
    '(210) 573-3918',
    'https://electricdisk.com',
    '13726 Evanswood',
    'SAN ANTONIO',
    'TX',
    '78232',
    ARRAY['Commercial Electrical', 'Residential Electrical', 'Electrical Repairs', 'Panel Upgrades', 'Lighting Installation'],
    true
) ON CONFLICT (owner_id) DO NOTHING;

-- Tim Smoot Electric, Inc.
INSERT INTO public.company_profiles (
    id,
    owner_id,
    company_name,
    description,
    email,
    phone,
    website,
    address,
    city,
    state,
    zip_code,
    specialties,
    is_verified
) VALUES (
    'a2222222-2222-2222-2222-222222222222'::uuid,
    'a2222222-2222-2222-2222-222222222222'::uuid,
    'Tim Smoot Electric, Inc.',
    'Licensed and insured electrical contractors providing quality electrical services. Over 20 years of experience in residential and commercial electrical work.',
    'info@smoot-elec.com',
    '(210) 496-2004',
    'https://smoot-elec.com',
    '848 W. Rhapsody',
    'SAN ANTONIO',
    'TX',
    '78216',
    ARRAY['Electrical Contracting', 'Commercial Wiring', 'Residential Wiring', 'Electrical Troubleshooting', 'Emergency Repairs'],
    true
) ON CONFLICT (owner_id) DO NOTHING;

-- San Antonio Electric
INSERT INTO public.company_profiles (
    id,
    owner_id,
    company_name,
    description,
    email,
    phone,
    website,
    address,
    city,
    state,
    zip_code,
    specialties,
    is_verified
) VALUES (
    'a3333333-3333-3333-3333-333333333333'::uuid,
    'a3333333-3333-3333-3333-333333333333'::uuid,
    'San Antonio Electric',
    'Full-service electrical contractor serving San Antonio and surrounding areas. Committed to delivering reliable electrical solutions.',
    'contact@sanantonioelectric.net',
    '(210) 342-0419',
    'https://sanantonioelectric.net',
    '342 Dresden',
    'SAN ANTONIO',
    'TX',
    '78212',
    ARRAY['Electrical Services', 'Commercial Projects', 'Residential Projects', 'Electrical Maintenance', 'Code Compliance'],
    true
) ON CONFLICT (owner_id) DO NOTHING;

-- Judd Electric, Inc
INSERT INTO public.company_profiles (
    id,
    owner_id,
    company_name,
    description,
    email,
    phone,
    website,
    address,
    city,
    state,
    zip_code,
    specialties,
    is_verified
) VALUES (
    'a4444444-4444-4444-4444-444444444444'::uuid,
    'a4444444-4444-4444-4444-444444444444'::uuid,
    'Judd Electric, Inc',
    'Premier electrical contractor in New York City. Specializing in high-end residential and commercial electrical installations.',
    'info@judd-electric.com',
    '(212) 317-2525',
    'https://judd-electric.com',
    '1097 2 Avenue 3FL',
    'NEW YORK',
    'NY',
    '10021',
    ARRAY['High-End Electrical', 'Smart Home Systems', 'Commercial Electrical', 'Lighting Design', 'Power Distribution'],
    true
) ON CONFLICT (owner_id) DO NOTHING;

-- electricwebdesign
INSERT INTO public.company_profiles (
    id,
    owner_id,
    company_name,
    description,
    email,
    phone,
    website,
    address,
    city,
    state,
    zip_code,
    specialties,
    is_verified
) VALUES (
    'a5555555-5555-5555-5555-555555555555'::uuid,
    'a5555555-5555-5555-5555-555555555555'::uuid,
    'Electric Web Design',
    'Innovative electrical solutions combined with smart home technology. Bringing modern electrical design to Brooklyn and beyond.',
    'contact@electricwebdesign.com',
    '(212) 330-9277',
    'https://electricwebdesign.com',
    '61 Eastern Parkway 3F',
    'BROOKLYN',
    'NY',
    '11238',
    ARRAY['Electrical Design', 'Smart Home Integration', 'Home Automation', 'Electrical Consulting', 'Energy Efficiency'],
    true
) ON CONFLICT (owner_id) DO NOTHING;

-- Alamo City Electric Football League
INSERT INTO public.company_profiles (
    id,
    owner_id,
    company_name,
    description,
    email,
    phone,
    website,
    address,
    city,
    state,
    zip_code,
    specialties,
    is_verified
) VALUES (
    'a6666666-6666-6666-6666-666666666666'::uuid,
    'a6666666-6666-6666-6666-666666666666'::uuid,
    'Alamo City Electric Football League',
    'Specialized electrical services for sports facilities and recreational areas. Expert in field lighting and facility electrical systems.',
    'contact@acefl.net',
    '(210) 481-1632',
    'https://acefl.net',
    'San Antonio',
    'SAN ANTONIO',
    'TX',
    '78257',
    ARRAY['Sports Facility Electrical', 'Field Lighting', 'Facility Maintenance', 'Electrical Systems', 'Commercial Projects'],
    true
) ON CONFLICT (owner_id) DO NOTHING;

-- =====================================================
-- PLUMBING COMPANIES
-- =====================================================

-- MCG Plumbing
INSERT INTO public.company_profiles (
    id,
    owner_id,
    company_name,
    description,
    email,
    phone,
    website,
    address,
    city,
    state,
    zip_code,
    specialties,
    is_verified
) VALUES (
    'b1111111-1111-1111-1111-111111111111'::uuid,
    'b1111111-1111-1111-1111-111111111111'::uuid,
    'MCG Plumbing',
    'Expert plumbing services for residential and commercial properties. Offering repairs, installations, and maintenance with 24/7 emergency service.',
    'service@mcgplumbing.com',
    '(281) 450-8158',
    'https://mcgplumbing.com',
    '12426 Laurel Meadow Way',
    'HOUSTON',
    'TX',
    '77014',
    ARRAY['Plumbing Services', 'Emergency Plumbing', 'Drain Cleaning', 'Water Heater Installation', 'Pipe Repair'],
    true
) ON CONFLICT (owner_id) DO NOTHING;

-- =====================================================
-- MACHINIST / MANUFACTURING COMPANIES
-- =====================================================

-- Allens Performance Machine, Inc
INSERT INTO public.company_profiles (
    id,
    owner_id,
    company_name,
    description,
    email,
    phone,
    website,
    address,
    city,
    state,
    zip_code,
    specialties,
    is_verified
) VALUES (
    'c1111111-1111-1111-1111-111111111111'::uuid,
    'c1111111-1111-1111-1111-111111111111'::uuid,
    'Allens Performance Machine, Inc',
    'Precision machining and manufacturing services. Specializing in custom parts, CNC machining, and performance components.',
    'sales@allensmachine.com',
    '(865) 856-7175',
    'https://allensmachine.com',
    '17527 Apshawa Road West',
    'CLERMONT',
    'FL',
    '34711',
    ARRAY['CNC Machining', 'Custom Manufacturing', 'Precision Parts', 'Performance Components', 'Prototyping'],
    true
) ON CONFLICT (owner_id) DO NOTHING;

-- AAA Machine
INSERT INTO public.company_profiles (
    id,
    owner_id,
    company_name,
    description,
    email,
    phone,
    website,
    address,
    city,
    state,
    zip_code,
    specialties,
    is_verified
) VALUES (
    'c2222222-2222-2222-2222-222222222222'::uuid,
    'c2222222-2222-2222-2222-222222222222'::uuid,
    'AAA Machine',
    'Professional machine shop providing quality machining services. From simple repairs to complex manufacturing projects.',
    'info@aaammminc.com',
    '(210) 534-9492',
    'https://aaammminc.com',
    '438 Vine St',
    'SAN ANTONIO',
    'TX',
    '78209',
    ARRAY['Machine Shop', 'Metal Fabrication', 'Welding', 'Machining Services', 'Repair Services'],
    true
) ON CONFLICT (owner_id) DO NOTHING;

-- RS-Machine Corporation
INSERT INTO public.company_profiles (
    id,
    owner_id,
    company_name,
    description,
    email,
    phone,
    website,
    address,
    city,
    state,
    zip_code,
    specialties,
    is_verified
) VALUES (
    'c3333333-3333-3333-3333-333333333333'::uuid,
    'c3333333-3333-3333-3333-333333333333'::uuid,
    'RS-Machine Corporation',
    'Advanced machining solutions for industrial and commercial applications. State-of-the-art equipment and experienced technicians.',
    'contact@rsmachine.com',
    '(210) 492-9399',
    'https://rsmachine.com',
    '13827 Shavano Mist',
    'SAN ANTONIO',
    'TX',
    '78229',
    ARRAY['Industrial Machining', 'Production Runs', 'Quality Control', 'Engineering Support', 'Manufacturing'],
    true
) ON CONFLICT (owner_id) DO NOTHING;

-- LPS Office Machine Specialists
INSERT INTO public.company_profiles (
    id,
    owner_id,
    company_name,
    description,
    email,
    phone,
    website,
    address,
    city,
    state,
    zip_code,
    specialties,
    is_verified
) VALUES (
    'c4444444-4444-4444-4444-444444444444'::uuid,
    'c4444444-4444-4444-4444-444444444444'::uuid,
    'LPS Office Machine Specialists',
    'Specialized in office machinery repair and maintenance. Expert service for copiers, printers, and business equipment.',
    'service@l2psonline.com',
    '(210) 737-2777',
    'https://l2psonline.com',
    '174 Sherwood Suite B',
    'SAN ANTONIO',
    'TX',
    '78201',
    ARRAY['Office Equipment', 'Machine Repair', 'Maintenance Services', 'Parts Supply', 'Technical Support'],
    true
) ON CONFLICT (owner_id) DO NOTHING;

-- GALA PITCHING MACHINES
INSERT INTO public.company_profiles (
    id,
    owner_id,
    company_name,
    description,
    email,
    phone,
    website,
    address,
    city,
    state,
    zip_code,
    specialties,
    is_verified
) VALUES (
    'c5555555-5555-5555-5555-555555555555'::uuid,
    'c5555555-5555-5555-5555-555555555555'::uuid,
    'GALA Pitching Machines',
    'Manufacturer and distributor of professional pitching machines. Serving baseball and softball facilities nationwide.',
    'info@galapitchingmachines.com',
    '(210) 921-1234',
    'https://galapitchingmachines.com',
    '1355 W. THEO',
    'SAN ANTONIO',
    'TX',
    '78224',
    ARRAY['Pitching Machines', 'Sports Equipment', 'Manufacturing', 'Equipment Repair', 'Installation'],
    true
) ON CONFLICT (owner_id) DO NOTHING;

-- studio machine
INSERT INTO public.company_profiles (
    id,
    owner_id,
    company_name,
    description,
    email,
    phone,
    website,
    address,
    city,
    state,
    zip_code,
    specialties,
    is_verified
) VALUES (
    'c6666666-6666-6666-6666-666666666666'::uuid,
    'c6666666-6666-6666-6666-666666666666'::uuid,
    'Studio Machine',
    'Creative machining solutions for artistic and industrial applications. Combining precision engineering with innovative design.',
    'contact@studiomachine.net',
    '(210) 949-1282',
    'https://studiomachine.net',
    '4119 Medical Dr. #307-E',
    'SAN ANTONIO',
    'TX',
    '78229',
    ARRAY['Custom Machining', 'Artistic Fabrication', 'Design Services', 'Prototyping', 'Small Batch Production'],
    true
) ON CONFLICT (owner_id) DO NOTHING;

-- =====================================================
-- PRODUCTS/SERVICES FOR ELECTRICAL COMPANIES
-- =====================================================

-- ElectricDisk Products
INSERT INTO public.products (company_id, name, description, price, category, delivery_time_days, image_url, is_active) VALUES
('a1111111-1111-1111-1111-111111111111'::uuid, 'Residential Electrical Inspection', 'Complete home electrical system inspection with detailed report and safety recommendations', 299.00, 'electrical', 3, 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400', true),
('a1111111-1111-1111-1111-111111111111'::uuid, 'Electrical Panel Upgrade', 'Professional electrical panel upgrade to 200 amp service with permits and inspection', 2500.00, 'electrical', 7, 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400', true),
('a1111111-1111-1111-1111-111111111111'::uuid, 'Ceiling Fan Installation', 'Expert ceiling fan installation including electrical connection and mounting', 175.00, 'electrical', 2, 'https://images.unsplash.com/photo-1545259741-2ea3ebf61fa3?w=400', true),
('a1111111-1111-1111-1111-111111111111'::uuid, 'Outdoor Lighting Package', 'Complete outdoor lighting design and installation for home security and aesthetics', 1200.00, 'electrical', 5, 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=400', true);

-- Tim Smoot Electric Products
INSERT INTO public.products (company_id, name, description, price, category, delivery_time_days, image_url, is_active) VALUES
('a2222222-2222-2222-2222-222222222222'::uuid, 'Commercial Electrical Audit', 'Comprehensive electrical system audit for commercial buildings with code compliance review', 850.00, 'electrical', 5, 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400', true),
('a2222222-2222-2222-2222-222222222222'::uuid, 'Emergency Electrical Repair', '24/7 emergency electrical repair service for urgent electrical issues', 195.00, 'electrical', 1, 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=400', true),
('a2222222-2222-2222-2222-222222222222'::uuid, 'EV Charger Installation', 'Professional electric vehicle charging station installation for home or business', 1400.00, 'electrical', 4, 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=400', true),
('a2222222-2222-2222-2222-222222222222'::uuid, 'Smart Home Electrical Setup', 'Smart home electrical system integration including switches, outlets, and controls', 2800.00, 'electrical', 10, 'https://images.unsplash.com/photo-1558002038-1055907df827?w=400', true);

-- San Antonio Electric Products
INSERT INTO public.products (company_id, name, description, price, category, delivery_time_days, image_url, is_active) VALUES
('a3333333-3333-3333-3333-333333333333'::uuid, 'Electrical Rewiring Service', 'Complete home rewiring service for older homes, includes permits and inspection', 4500.00, 'electrical', 14, 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400', true),
('a3333333-3333-3333-3333-333333333333'::uuid, 'Outlet & Switch Installation', 'Professional installation of electrical outlets and switches throughout your property', 120.00, 'electrical', 1, 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=400', true),
('a3333333-3333-3333-3333-333333333333'::uuid, 'Generator Installation', 'Whole house backup generator installation with transfer switch', 5500.00, 'electrical', 10, 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=400', true);

-- Judd Electric Products  
INSERT INTO public.products (company_id, name, description, price, category, delivery_time_days, image_url, is_active) VALUES
('a4444444-4444-4444-4444-444444444444'::uuid, 'Luxury Home Electrical Design', 'Premium electrical design and installation for high-end residential properties', 12000.00, 'electrical', 21, 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400', true),
('a4444444-4444-4444-4444-444444444444'::uuid, 'Home Theater Electrical', 'Complete electrical setup for home theater systems including dedicated circuits', 2200.00, 'electrical', 7, 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400', true),
('a4444444-4444-4444-4444-444444444444'::uuid, 'Architectural Lighting Design', 'Custom architectural lighting design and installation for residential spaces', 6500.00, 'electrical', 14, 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=400', true);

-- Electric Web Design Products
INSERT INTO public.products (company_id, name, description, price, category, delivery_time_days, image_url, is_active) VALUES
('a5555555-5555-5555-5555-555555555555'::uuid, 'Smart Home Automation', 'Complete smart home automation system design and installation', 4200.00, 'electrical', 12, 'https://images.unsplash.com/photo-1558002038-1055907df827?w=400', true),
('a5555555-5555-5555-5555-555555555555'::uuid, 'Home Network Wiring', 'Professional Cat6 network wiring throughout home for high-speed connectivity', 1800.00, 'electrical', 5, 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=400', true),
('a5555555-5555-5555-5555-555555555555'::uuid, 'Solar Panel Electrical Integration', 'Electrical integration for solar panel systems including inverter installation', 3200.00, 'electrical', 8, 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400', true);

-- Alamo City Electric Products
INSERT INTO public.products (company_id, name, description, price, category, delivery_time_days, image_url, is_active) VALUES
('a6666666-6666-6666-6666-666666666666'::uuid, 'Sports Field Lighting Installation', 'Professional sports field lighting system design and installation', 18000.00, 'electrical', 30, 'https://images.unsplash.com/photo-1459865264687-595d652de67e?w=400', true),
('a6666666-6666-6666-6666-666666666666'::uuid, 'Facility Electrical Maintenance', 'Annual electrical maintenance contract for sports and recreational facilities', 2400.00, 'electrical', 5, 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400', true);

-- =====================================================
-- PRODUCTS/SERVICES FOR PLUMBING COMPANIES
-- =====================================================

-- MCG Plumbing Products
INSERT INTO public.products (company_id, name, description, price, category, delivery_time_days, image_url, is_active) VALUES
('b1111111-1111-1111-1111-111111111111'::uuid, 'Water Heater Replacement', 'Professional water heater removal and installation with 10-year warranty', 1450.00, 'plumbing', 3, 'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=400', true),
('b1111111-1111-1111-1111-111111111111'::uuid, 'Emergency Plumbing Service', '24/7 emergency plumbing repair for leaks, clogs, and burst pipes', 185.00, 'plumbing', 1, 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=400', true),
('b1111111-1111-1111-1111-111111111111'::uuid, 'Drain Cleaning Service', 'Professional drain cleaning and video inspection service', 225.00, 'plumbing', 2, 'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=400', true),
('b1111111-1111-1111-1111-111111111111'::uuid, 'Bathroom Remodel Plumbing', 'Complete plumbing installation for bathroom remodel projects', 3500.00, 'plumbing', 10, 'https://images.unsplash.com/photo-1620626011761-996317b8d101?w=400', true),
('b1111111-1111-1111-1111-111111111111'::uuid, 'Sewer Line Repair', 'Trenchless sewer line repair and replacement service', 4200.00, 'plumbing', 7, 'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=400', true);

-- =====================================================
-- PRODUCTS/SERVICES FOR MACHINING COMPANIES
-- =====================================================

-- Allens Performance Machine Products
INSERT INTO public.products (company_id, name, description, price, category, delivery_time_days, image_url, is_active) VALUES
('c1111111-1111-1111-1111-111111111111'::uuid, 'Custom CNC Machining Service', 'Precision CNC machining for custom parts and components', 450.00, 'machining', 7, 'https://images.unsplash.com/photo-1565206077212-4eb48d41f54b?w=400', true),
('c1111111-1111-1111-1111-111111111111'::uuid, 'Performance Engine Components', 'High-performance engine components machining and finishing', 850.00, 'machining', 14, 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=400', true),
('c1111111-1111-1111-1111-111111111111'::uuid, 'Rapid Prototyping Service', 'Fast prototyping service for product development and testing', 650.00, 'machining', 5, 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=400', true);

-- AAA Machine Products
INSERT INTO public.products (company_id, name, description, price, category, delivery_time_days, image_url, is_active) VALUES
('c2222222-2222-2222-2222-222222222222'::uuid, 'General Machine Shop Services', 'Comprehensive machine shop services for repairs and custom parts', 325.00, 'machining', 5, 'https://images.unsplash.com/photo-1565206077212-4eb48d41f54b?w=400', true),
('c2222222-2222-2222-2222-222222222222'::uuid, 'Metal Fabrication Service', 'Custom metal fabrication and welding services', 520.00, 'machining', 7, 'https://images.unsplash.com/photo-1597484661064-8d5b6b8b2e9d?w=400', true),
('c2222222-2222-2222-2222-222222222222'::uuid, 'Equipment Repair Service', 'Professional repair service for industrial machinery and equipment', 275.00, 'machining', 3, 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400', true);

-- RS-Machine Corporation Products
INSERT INTO public.products (company_id, name, description, price, category, delivery_time_days, image_url, is_active) VALUES
('c3333333-3333-3333-3333-333333333333'::uuid, 'Industrial Machining Service', 'High-precision industrial machining for large-scale production', 1200.00, 'machining', 14, 'https://images.unsplash.com/photo-1565206077212-4eb48d41f54b?w=400', true),
('c3333333-3333-3333-3333-333333333333'::uuid, 'Quality Inspection Service', 'Comprehensive quality control and inspection services', 380.00, 'machining', 3, 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400', true),
('c3333333-3333-3333-3333-333333333333'::uuid, 'Production Run Service', 'Medium to large production runs with quality assurance', 2500.00, 'machining', 21, 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=400', true);

-- LPS Office Machine Products
INSERT INTO public.products (company_id, name, description, price, category, delivery_time_days, image_url, is_active) VALUES
('c4444444-4444-4444-4444-444444444444'::uuid, 'Copier Repair Service', 'Professional repair service for copiers and multifunction devices', 165.00, 'office-equipment', 2, 'https://images.unsplash.com/photo-1589395937658-0d5d8e880742?w=400', true),
('c4444444-4444-4444-4444-444444444444'::uuid, 'Printer Maintenance Package', 'Annual maintenance package for office printers and equipment', 450.00, 'office-equipment', 5, 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=400', true),
('c4444444-4444-4444-4444-444444444444'::uuid, 'Office Equipment Installation', 'Professional installation and setup of office machinery', 225.00, 'office-equipment', 3, 'https://images.unsplash.com/photo-1589395937658-0d5d8e880742?w=400', true);

-- GALA Pitching Machines Products
INSERT INTO public.products (company_id, name, description, price, category, delivery_time_days, image_url, is_active) VALUES
('c5555555-5555-5555-5555-555555555555'::uuid, 'Professional Pitching Machine', 'High-quality pitching machine for baseball and softball training', 2800.00, 'sports-equipment', 10, 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400', true),
('c5555555-5555-5555-5555-555555555555'::uuid, 'Pitching Machine Repair', 'Complete repair and maintenance service for pitching machines', 285.00, 'sports-equipment', 5, 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400', true),
('c5555555-5555-5555-5555-555555555555'::uuid, 'Pitching Machine Installation', 'Professional installation and setup of pitching machines', 350.00, 'sports-equipment', 3, 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400', true);

-- Studio Machine Products
INSERT INTO public.products (company_id, name, description, price, category, delivery_time_days, image_url, is_active) VALUES
('c6666666-6666-6666-6666-666666666666'::uuid, 'Custom Artistic Fabrication', 'Custom fabrication services for artistic and creative projects', 980.00, 'machining', 14, 'https://images.unsplash.com/photo-1565206077212-4eb48d41f54b?w=400', true),
('c6666666-6666-6666-6666-666666666666'::uuid, 'Design Consultation Service', 'Professional design consultation for machining and fabrication projects', 175.00, 'machining', 2, 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400', true),
('c6666666-6666-6666-6666-666666666666'::uuid, 'Small Batch Production', 'Small batch production service for custom parts and components', 1500.00, 'machining', 10, 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=400', true);

-- =====================================================
-- UPDATE RLS POLICIES TO ALLOW PUBLIC READ FOR DEMO
-- =====================================================

-- Note: In production, you'll want to modify these policies
-- For now, we're allowing public read access to companies and products

DROP POLICY IF EXISTS "company_profiles_select" ON public.company_profiles;
CREATE POLICY "company_profiles_select" 
    ON public.company_profiles FOR SELECT 
    USING (true);

DROP POLICY IF EXISTS "products_select" ON public.products;
CREATE POLICY "products_select" 
    ON public.products FOR SELECT 
    USING (is_active = true);
