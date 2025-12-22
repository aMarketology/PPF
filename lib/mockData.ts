// Mock data for engineering marketplace

export interface Category {
  id: string;
  name: string;
  icon: string;
  count: number;
}

export interface Service {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  price: number;
  duration: string;
  category: string;
  rating: number;
  reviewCount: number;
  provider: {
    id: string;
    name: string;
    avatar: string;
    location: string;
    rating: number;
    verified: boolean;
    responseTime: string;
    completionRate: number;
  };
  tags: string[];
  deliveryTime: string;
  createdAt: string;
  featured: boolean;
}

export const mockCategories: Category[] = [
  { id: 'structural', name: 'Structural Engineering', icon: '🏗️', count: 245 },
  { id: 'mechanical', name: 'Mechanical Engineering', icon: '⚙️', count: 312 },
  { id: 'electrical', name: 'Electrical Engineering', icon: '⚡', count: 189 },
  { id: 'civil', name: 'Civil Engineering', icon: '🌉', count: 156 },
  { id: 'software', name: 'Software Engineering', icon: '💻', count: 423 },
  { id: 'chemical', name: 'Chemical Engineering', icon: '🧪', count: 98 },
  { id: 'aerospace', name: 'Aerospace Engineering', icon: '✈️', count: 76 },
  { id: 'environmental', name: 'Environmental Engineering', icon: '🌱', count: 134 },
];

export const mockServices: Service[] = [
  {
    id: '1',
    title: 'Structural Analysis & Design for Residential Buildings',
    shortDescription: 'Complete structural engineering services for homes and small buildings',
    fullDescription: 'Professional structural analysis and design services including load calculations, foundation design, and construction drawings.',
    price: 1500,
    duration: '7-10 days',
    category: 'structural',
    rating: 4.9,
    reviewCount: 87,
    provider: {
      id: 'p1',
      name: 'John Martinez PE',
      avatar: '/avatars/john.jpg',
      location: 'San Francisco, CA',
      rating: 4.9,
      verified: true,
      responseTime: '< 2 hours',
      completionRate: 98
    },
    tags: ['Residential', 'Load Analysis', 'Foundation Design', 'AutoCAD'],
    deliveryTime: '7 days',
    createdAt: '2024-01-15',
    featured: true
  },
  {
    id: '2',
    title: 'HVAC System Design & Energy Optimization',
    shortDescription: 'Efficient HVAC design for commercial and residential projects',
    fullDescription: 'Expert mechanical engineering services for heating, ventilation, and air conditioning systems with energy efficiency focus.',
    price: 2200,
    duration: '10-14 days',
    category: 'mechanical',
    rating: 4.8,
    reviewCount: 65,
    provider: {
      id: 'p2',
      name: 'Sarah Chen',
      avatar: '/avatars/sarah.jpg',
      location: 'Austin, TX',
      rating: 4.8,
      verified: true,
      responseTime: '< 3 hours',
      completionRate: 96
    },
    tags: ['HVAC', 'Energy Efficiency', 'Commercial', 'Revit MEP'],
    deliveryTime: '10 days',
    createdAt: '2024-01-20',
    featured: true
  },
  {
    id: '3',
    title: 'Electrical Panel Design & Load Calculations',
    shortDescription: 'Professional electrical design services for all building types',
    fullDescription: 'Comprehensive electrical engineering including panel schedules, load calculations, and one-line diagrams.',
    price: 800,
    duration: '3-5 days',
    category: 'electrical',
    rating: 4.7,
    reviewCount: 124,
    provider: {
      id: 'p3',
      name: 'Michael Thompson',
      avatar: '/avatars/michael.jpg',
      location: 'Seattle, WA',
      rating: 4.7,
      verified: true,
      responseTime: '< 4 hours',
      completionRate: 95
    },
    tags: ['Electrical Design', 'Load Calculations', 'NEC Code', 'AutoCAD Electrical'],
    deliveryTime: '5 days',
    createdAt: '2024-02-01',
    featured: false
  },
  {
    id: '4',
    title: 'Site Grading & Drainage Design',
    shortDescription: 'Civil engineering solutions for site development',
    fullDescription: 'Expert site grading, drainage design, and stormwater management for residential and commercial developments.',
    price: 1800,
    duration: '7-14 days',
    category: 'civil',
    rating: 4.9,
    reviewCount: 92,
    provider: {
      id: 'p4',
      name: 'Emily Rodriguez PE',
      avatar: '/avatars/emily.jpg',
      location: 'Denver, CO',
      rating: 4.9,
      verified: true,
      responseTime: '< 1 hour',
      completionRate: 99
    },
    tags: ['Site Development', 'Grading', 'Drainage', 'Civil 3D'],
    deliveryTime: '10 days',
    createdAt: '2024-02-05',
    featured: true
  },
  {
    id: '5',
    title: 'Full Stack Web Application Development',
    shortDescription: 'Modern web applications with React, Node.js, and cloud deployment',
    fullDescription: 'Custom web application development using the latest technologies including React, Next.js, Node.js, and PostgreSQL.',
    price: 5000,
    duration: '30-45 days',
    category: 'software',
    rating: 5.0,
    reviewCount: 156,
    provider: {
      id: 'p5',
      name: 'David Kim',
      avatar: '/avatars/david.jpg',
      location: 'Remote',
      rating: 5.0,
      verified: true,
      responseTime: '< 2 hours',
      completionRate: 100
    },
    tags: ['React', 'Node.js', 'PostgreSQL', 'AWS', 'TypeScript'],
    deliveryTime: '30 days',
    createdAt: '2024-02-10',
    featured: true
  },
  {
    id: '6',
    title: 'Chemical Process Design & Optimization',
    shortDescription: 'Process engineering for chemical manufacturing',
    fullDescription: 'Professional chemical process design, optimization, and safety analysis for industrial applications.',
    price: 3500,
    duration: '14-21 days',
    category: 'chemical',
    rating: 4.8,
    reviewCount: 43,
    provider: {
      id: 'p6',
      name: 'Dr. Amanda Foster',
      avatar: '/avatars/amanda.jpg',
      location: 'Houston, TX',
      rating: 4.8,
      verified: true,
      responseTime: '< 5 hours',
      completionRate: 97
    },
    tags: ['Process Design', 'HAZOP', 'ASPEN Plus', 'Safety Analysis'],
    deliveryTime: '14 days',
    createdAt: '2024-02-12',
    featured: false
  },
  {
    id: '7',
    title: 'Aircraft Systems Analysis & Design',
    shortDescription: 'Aerospace engineering for aircraft and UAV systems',
    fullDescription: 'Expert aerospace engineering services including aerodynamic analysis, structural design, and systems integration.',
    price: 4500,
    duration: '21-30 days',
    category: 'aerospace',
    rating: 4.9,
    reviewCount: 38,
    provider: {
      id: 'p7',
      name: 'Captain James Wilson',
      avatar: '/avatars/james.jpg',
      location: 'Los Angeles, CA',
      rating: 4.9,
      verified: true,
      responseTime: '< 6 hours',
      completionRate: 98
    },
    tags: ['Aerodynamics', 'UAV', 'CFD Analysis', 'CATIA'],
    deliveryTime: '21 days',
    createdAt: '2024-02-15',
    featured: true
  },
  {
    id: '8',
    title: 'Water Treatment System Design',
    shortDescription: 'Environmental engineering for water and wastewater',
    fullDescription: 'Design and optimization of water treatment systems for municipal and industrial applications.',
    price: 2800,
    duration: '10-14 days',
    category: 'environmental',
    rating: 4.7,
    reviewCount: 71,
    provider: {
      id: 'p8',
      name: 'Lisa Anderson PE',
      avatar: '/avatars/lisa.jpg',
      location: 'Portland, OR',
      rating: 4.7,
      verified: true,
      responseTime: '< 4 hours',
      completionRate: 96
    },
    tags: ['Water Treatment', 'Wastewater', 'Environmental', 'EPA Compliance'],
    deliveryTime: '10 days',
    createdAt: '2024-02-18',
    featured: false
  },
  {
    id: '9',
    title: 'Steel Frame Building Design',
    shortDescription: 'Structural design for commercial steel structures',
    fullDescription: 'Complete structural engineering for steel-framed commercial buildings including connection design and shop drawings.',
    price: 3200,
    duration: '14-21 days',
    category: 'structural',
    rating: 4.8,
    reviewCount: 95,
    provider: {
      id: 'p9',
      name: 'Robert Jackson SE',
      avatar: '/avatars/robert.jpg',
      location: 'Chicago, IL',
      rating: 4.8,
      verified: true,
      responseTime: '< 3 hours',
      completionRate: 97
    },
    tags: ['Steel Design', 'Commercial', 'AISC', 'Tekla Structures'],
    deliveryTime: '14 days',
    createdAt: '2024-02-20',
    featured: true
  },
  {
    id: '10',
    title: 'Industrial Automation & Control Systems',
    shortDescription: 'PLC programming and SCADA system design',
    fullDescription: 'Industrial automation solutions including PLC programming, HMI design, and SCADA systems for manufacturing.',
    price: 3800,
    duration: '14-28 days',
    category: 'mechanical',
    rating: 4.9,
    reviewCount: 82,
    provider: {
      id: 'p10',
      name: 'Carlos Mendez',
      avatar: '/avatars/carlos.jpg',
      location: 'Detroit, MI',
      rating: 4.9,
      verified: true,
      responseTime: '< 2 hours',
      completionRate: 99
    },
    tags: ['PLC', 'SCADA', 'Automation', 'Siemens', 'Allen-Bradley'],
    deliveryTime: '14 days',
    createdAt: '2024-02-22',
    featured: true
  },
  {
    id: '11',
    title: 'Solar PV System Design & Analysis',
    shortDescription: 'Renewable energy engineering for solar installations',
    fullDescription: 'Complete solar photovoltaic system design including electrical calculations, equipment selection, and permitting support.',
    price: 1200,
    duration: '5-7 days',
    category: 'electrical',
    rating: 4.8,
    reviewCount: 118,
    provider: {
      id: 'p11',
      name: 'Jennifer Lee',
      avatar: '/avatars/jennifer.jpg',
      location: 'Phoenix, AZ',
      rating: 4.8,
      verified: true,
      responseTime: '< 3 hours',
      completionRate: 98
    },
    tags: ['Solar PV', 'Renewable Energy', 'NEC 690', 'PVsyst'],
    deliveryTime: '7 days',
    createdAt: '2024-02-25',
    featured: false
  },
  {
    id: '12',
    title: 'Bridge Structural Analysis & Design',
    shortDescription: 'Civil engineering for bridge and highway structures',
    fullDescription: 'Professional bridge engineering services including structural analysis, load rating, and rehabilitation design.',
    price: 6500,
    duration: '30-45 days',
    category: 'civil',
    rating: 5.0,
    reviewCount: 54,
    provider: {
      id: 'p12',
      name: 'Dr. Thomas Wright PE SE',
      avatar: '/avatars/thomas.jpg',
      location: 'Boston, MA',
      rating: 5.0,
      verified: true,
      responseTime: '< 4 hours',
      completionRate: 100
    },
    tags: ['Bridge Design', 'AASHTO', 'Load Rating', 'SAP2000'],
    deliveryTime: '30 days',
    createdAt: '2024-03-01',
    featured: true
  },
  {
    id: '13',
    title: 'Mobile App Development (iOS & Android)',
    shortDescription: 'Native and cross-platform mobile applications',
    fullDescription: 'Professional mobile app development using React Native or native technologies for iOS and Android platforms.',
    price: 7500,
    duration: '45-60 days',
    category: 'software',
    rating: 4.9,
    reviewCount: 203,
    provider: {
      id: 'p13',
      name: 'Alex Patel',
      avatar: '/avatars/alex.jpg',
      location: 'Remote',
      rating: 4.9,
      verified: true,
      responseTime: '< 1 hour',
      completionRate: 99
    },
    tags: ['React Native', 'iOS', 'Android', 'Firebase', 'Swift'],
    deliveryTime: '45 days',
    createdAt: '2024-03-05',
    featured: true
  },
  {
    id: '14',
    title: 'Seismic Retrofit Analysis & Design',
    shortDescription: 'Earthquake engineering for existing structures',
    fullDescription: 'Seismic evaluation and retrofit design for existing buildings to meet current building codes.',
    price: 4200,
    duration: '14-21 days',
    category: 'structural',
    rating: 4.9,
    reviewCount: 67,
    provider: {
      id: 'p14',
      name: 'Michelle Wu SE',
      avatar: '/avatars/michelle.jpg',
      location: 'San Francisco, CA',
      rating: 4.9,
      verified: true,
      responseTime: '< 5 hours',
      completionRate: 98
    },
    tags: ['Seismic', 'Retrofit', 'ASCE 41', 'ETABS'],
    deliveryTime: '14 days',
    createdAt: '2024-03-08',
    featured: false
  },
  {
    id: '15',
    title: 'Fire Protection System Design',
    shortDescription: 'Life safety engineering for sprinkler and alarm systems',
    fullDescription: 'Complete fire protection engineering including sprinkler hydraulic calculations and fire alarm system design.',
    price: 1600,
    duration: '7-10 days',
    category: 'mechanical',
    rating: 4.7,
    reviewCount: 89,
    provider: {
      id: 'p15',
      name: 'Brian Cooper',
      avatar: '/avatars/brian.jpg',
      location: 'Atlanta, GA',
      rating: 4.7,
      verified: true,
      responseTime: '< 4 hours',
      completionRate: 96
    },
    tags: ['Fire Protection', 'NFPA 13', 'Sprinkler', 'Hydraulic Calc'],
    deliveryTime: '10 days',
    createdAt: '2024-03-10',
    featured: false
  },
];

// Company Profiles
export interface Company {
  id: string;
  name: string;
  tagline: string;
  description: string;
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
  phone: string;
  website: string;
  email: string;
  logo: string;
  coverImage: string;
  specialties: string[];
  services: string[];
  certifications: string[];
  rating: number;
  reviewCount: number;
  projectsCompleted: number;
  yearsInBusiness: number;
  employeeCount: string;
  featured: boolean;
  verified: boolean;
  responseTime: string;
  completionRate: number;
  claimed: boolean;
}

export const mockCompanies: Company[] = [
  {
    id: 'electricdisk',
    name: 'ElectricDisk',
    tagline: 'Leading Electrical Engineering Solutions',
    description: 'ElectricDisk is a premier electrical engineering firm specializing in power systems, lighting design, and renewable energy solutions. With over 15 years of experience, we deliver innovative electrical engineering services for commercial, industrial, and residential projects.',
    address: {
      street: '13726 Evanswood',
      city: 'SAN ANTONIO',
      state: 'TX',
      zip: '78232'
    },
    phone: '(210) 573-3918',
    website: 'ELECTRICDISK.COM',
    email: 'contact@electricdisk.com',
    logo: '/company-logos/electricdisk.png',
    coverImage: '/company-covers/electricdisk.jpg',
    specialties: [
      'Power System Design',
      'Lighting Design',
      'Solar & Renewable Energy',
      'Smart Building Systems',
      'Electrical Code Compliance',
      'Energy Efficiency Analysis'
    ],
    services: [
      'Electrical Engineering Consultation',
      'Power Distribution Design',
      'Lighting Layout & Photometric Analysis',
      'Solar PV System Design',
      'Backup Generator Systems',
      'Energy Audits',
      'Load Calculations',
      'Electrical Panel Upgrades',
      'EV Charging Station Design',
      'Building Automation Systems'
    ],
    certifications: [
      'Licensed Professional Engineer (PE)',
      'LEED Accredited Professional',
      'NABCEP Certified',
      'IEEE Member',
      'NFPA 70E Certified'
    ],
    rating: 4.9,
    reviewCount: 127,
    projectsCompleted: 450,
    yearsInBusiness: 15,
    employeeCount: '25-50',
    featured: true,
    verified: true,
    responseTime: '< 2 hours',
    completionRate: 98,
    claimed: false
  },
  {
    id: 'mcg-plumbing',
    name: 'MCG Plumbing',
    tagline: 'Professional Plumbing & MEP Engineering',
    description: 'MCG Plumbing is a full-service mechanical, electrical, and plumbing (MEP) engineering firm. We provide comprehensive design and engineering services for commercial buildings, ensuring efficient and code-compliant systems that meet your project needs.',
    address: {
      street: '12426 Laurel Meadow Way',
      city: 'HOUSTON',
      state: 'TX',
      zip: '77014'
    },
    phone: '(281) 450-8158',
    website: 'MCGPLUMBING.COM',
    email: 'info@mcgplumbing.com',
    logo: '/company-logos/mcg-plumbing.png',
    coverImage: '/company-covers/mcg-plumbing.jpg',
    specialties: [
      'MEP Engineering',
      'HVAC System Design',
      'Plumbing Design',
      'Fire Protection Systems',
      'Energy Modeling',
      'Building Code Compliance'
    ],
    services: [
      'MEP Engineering Design',
      'HVAC Load Calculations',
      'Plumbing System Layout',
      'Fire Sprinkler Design',
      'Medical Gas Systems',
      'Storm Water Management',
      'Backflow Prevention',
      'Water Treatment Systems',
      'Pump Selection & Sizing',
      'Mechanical Code Review'
    ],
    certifications: [
      'Licensed Professional Engineer (PE)',
      'ASPE Certified',
      'ASHRAE Member',
      'Master Plumber License',
      'NICET Certified'
    ],
    rating: 4.8,
    reviewCount: 93,
    projectsCompleted: 320,
    yearsInBusiness: 12,
    employeeCount: '15-25',
    featured: true,
    verified: true,
    responseTime: '< 3 hours',
    completionRate: 96,
    claimed: false
  },
  {
    id: 'allens-machine',
    name: 'Allens Performance Machine, Inc',
    tagline: 'Precision Machining & Manufacturing Excellence',
    description: 'Allens Performance Machine is a precision machining and manufacturing company specializing in custom parts, prototype development, and production runs. Our state-of-the-art CNC equipment and experienced machinists deliver high-quality components for automotive, aerospace, and industrial applications.',
    address: {
      street: '17527 Apshawa Road West',
      city: 'CLERMONT',
      state: 'FL',
      zip: '34711'
    },
    phone: '(865) 856-7175',
    website: 'allensmachine.com',
    email: 'info@allensmachine.com',
    logo: '/company-logos/allens-machine.png',
    coverImage: '/company-covers/allens-machine.jpg',
    specialties: [
      'CNC Machining',
      'Precision Manufacturing',
      'CAD/CAM Design',
      'Prototype Development',
      'Quality Control',
      'Production Manufacturing'
    ],
    services: [
      'Custom CNC Machining',
      '3-Axis & 5-Axis Milling',
      'CNC Turning',
      'Prototype Fabrication',
      'Production Machining',
      'CAD Design & Engineering',
      'Reverse Engineering',
      'Quality Inspection (CMM)',
      'Material Selection Consulting',
      'Assembly Services'
    ],
    certifications: [
      'ISO 9001:2015 Certified',
      'AS9100 Aerospace Certified',
      'ITAR Registered',
      'NADCAP Accredited',
      'API Certified'
    ],
    rating: 4.9,
    reviewCount: 156,
    projectsCompleted: 875,
    yearsInBusiness: 20,
    employeeCount: '50-100',
    featured: true,
    verified: true,
    responseTime: '< 1 hour',
    completionRate: 99,
    claimed: false
  },
  // Electrical Companies
  {
    id: 'alamo-city-electric',
    name: 'Alamo City Electric Football League',
    tagline: 'Professional Electrical Solutions',
    description: 'Alamo City Electric provides comprehensive electrical services for commercial and residential projects. Our experienced team delivers quality workmanship and reliable electrical solutions for the San Antonio area.',
    address: {
      street: '23504 Flowing Mist',
      city: 'SAN ANTONIO',
      state: 'TX',
      zip: '78257'
    },
    phone: '(210) 481-1632',
    website: 'ACEFL.NET',
    email: 'contact@acefl.net',
    logo: '/company-logos/alamo-city-electric.png',
    coverImage: '/company-covers/alamo-city-electric.jpg',
    specialties: [
      'Commercial Electrical',
      'Residential Electrical',
      'Electrical Repairs',
      'Code Compliance',
      'Safety Inspections'
    ],
    services: [
      'Electrical Installation',
      'Wiring & Rewiring',
      'Panel Upgrades',
      'Troubleshooting',
      'Maintenance Services',
      'Emergency Repairs'
    ],
    certifications: [
      'Licensed Electrician',
      'Insured & Bonded',
      'NEC Compliant'
    ],
    rating: 0,
    reviewCount: 0,
    projectsCompleted: 0,
    yearsInBusiness: 5,
    employeeCount: '1-10',
    featured: false,
    verified: false,
    responseTime: 'Contact for details',
    completionRate: 0,
    claimed: false
  },
  {
    id: 'tim-smoot-electric',
    name: 'Tim Smoot Electric, Inc.',
    tagline: 'Expert Electrical Contractor',
    description: 'Tim Smoot Electric, Inc. specializes in professional electrical contracting services. We provide expert installations, repairs, and maintenance for both residential and commercial clients.',
    address: {
      street: '848 W. Rhapsody',
      city: 'SAN ANTONIO',
      state: 'TX',
      zip: '78216'
    },
    phone: '(210) 496-2004',
    website: 'smoot-elec.com',
    email: 'info@smoot-elec.com',
    logo: '/company-logos/tim-smoot-electric.png',
    coverImage: '/company-covers/tim-smoot-electric.jpg',
    specialties: [
      'Electrical Contracting',
      'Commercial Electrical',
      'Residential Services',
      'Installation & Repair'
    ],
    services: [
      'Electrical Design',
      'Installation Services',
      'Repair & Maintenance',
      'Code Compliance',
      'Consultation Services'
    ],
    certifications: [
      'Licensed Electrical Contractor',
      'Fully Insured'
    ],
    rating: 0,
    reviewCount: 0,
    projectsCompleted: 0,
    yearsInBusiness: 10,
    employeeCount: '1-10',
    featured: false,
    verified: false,
    responseTime: 'Contact for details',
    completionRate: 0,
    claimed: false
  },
  {
    id: 'san-antonio-electric',
    name: 'San Antonio Electric',
    tagline: 'Reliable Electrical Services',
    description: 'San Antonio Electric offers reliable electrical services for the greater San Antonio area. Our team provides quality electrical work for residential and commercial properties.',
    address: {
      street: '342 Dresden',
      city: 'SAN ANTONIO',
      state: 'TX',
      zip: '78212'
    },
    phone: '(210) 342-0419',
    website: 'SANANTONIOELECTRIC.NET',
    email: 'info@sanantonioelectric.net',
    logo: '/company-logos/san-antonio-electric.png',
    coverImage: '/company-covers/san-antonio-electric.jpg',
    specialties: [
      'Residential Electrical',
      'Commercial Electrical',
      'Repairs & Maintenance',
      'Emergency Services'
    ],
    services: [
      'Electrical Wiring',
      'Panel Services',
      'Lighting Installation',
      'Outlet Installation',
      'Safety Inspections'
    ],
    certifications: [
      'Licensed Electrician',
      'Insured'
    ],
    rating: 0,
    reviewCount: 0,
    projectsCompleted: 0,
    yearsInBusiness: 8,
    employeeCount: '1-10',
    featured: false,
    verified: false,
    responseTime: 'Contact for details',
    completionRate: 0,
    claimed: false
  },
  {
    id: 'us-electric-co',
    name: 'U S Electric Co',
    tagline: 'Professional Electrical Solutions',
    description: 'U S Electric Co provides comprehensive electrical services for commercial and industrial clients. With decades of experience, we deliver reliable electrical solutions.',
    address: {
      street: '301 North First Street',
      city: 'SPRINGFIELD',
      state: 'IL',
      zip: '62701'
    },
    phone: '(217) 522-3347',
    website: 'USELECTCO.COM',
    email: 'info@uselectco.com',
    logo: '/company-logos/us-electric.png',
    coverImage: '/company-covers/us-electric.jpg',
    specialties: [
      'Commercial Electrical',
      'Industrial Electrical',
      'Electrical Engineering',
      'Project Management'
    ],
    services: [
      'Electrical Design',
      'Installation',
      'Maintenance',
      'Troubleshooting',
      'Upgrades'
    ],
    certifications: [
      'Licensed Electrical Contractor',
      'Insured & Bonded'
    ],
    rating: 0,
    reviewCount: 0,
    projectsCompleted: 0,
    yearsInBusiness: 15,
    employeeCount: '10-25',
    featured: false,
    verified: false,
    responseTime: 'Contact for details',
    completionRate: 0,
    claimed: false
  },
  {
    id: 'springfield-electric',
    name: 'Springfield Electric',
    tagline: 'Complete Electrical & Lighting Solutions',
    description: 'Springfield Electric offers complete electrical services and lighting solutions. From design to installation, we provide comprehensive electrical services for all project types.',
    address: {
      street: '700 N 9th Street',
      city: 'SPRINGFIELD',
      state: 'IL',
      zip: '62708'
    },
    phone: '(217) 788-2100',
    website: 'SPRINGFIELDELECTRIC.COM',
    email: 'info@springfieldelectric.com',
    logo: '/company-logos/springfield-electric.png',
    coverImage: '/company-covers/springfield-electric.jpg',
    specialties: [
      'Electrical Services',
      'Lighting Design',
      'Commercial Projects',
      'Residential Services'
    ],
    services: [
      'Electrical Installation',
      'Lighting Solutions',
      'Design Services',
      'Maintenance',
      'Energy Efficiency'
    ],
    certifications: [
      'Licensed Electrician',
      'Certified Lighting Specialist'
    ],
    rating: 0,
    reviewCount: 0,
    projectsCompleted: 0,
    yearsInBusiness: 20,
    employeeCount: '25-50',
    featured: false,
    verified: false,
    responseTime: 'Contact for details',
    completionRate: 0,
    claimed: false
  },
  // Machinist Companies
  {
    id: 'aaa-machine',
    name: 'AAA Machine',
    tagline: 'Precision Machining Services',
    description: 'AAA Machine provides precision machining services for industrial and commercial applications. Our experienced machinists deliver quality parts and components.',
    address: {
      street: '438 Vine St',
      city: 'SAN ANTONIO',
      state: 'TX',
      zip: '78209'
    },
    phone: '(210) 534-9492',
    website: 'AAAMMMINC.COM',
    email: 'info@aaammminc.com',
    logo: '/company-logos/aaa-machine.png',
    coverImage: '/company-covers/aaa-machine.jpg',
    specialties: [
      'CNC Machining',
      'Precision Parts',
      'Custom Fabrication',
      'Industrial Machining'
    ],
    services: [
      'CNC Milling',
      'CNC Turning',
      'Custom Parts',
      'Repair Services',
      'Consultation'
    ],
    certifications: [
      'Quality Certified',
      'Experienced Machinists'
    ],
    rating: 0,
    reviewCount: 0,
    projectsCompleted: 0,
    yearsInBusiness: 12,
    employeeCount: '1-10',
    featured: false,
    verified: false,
    responseTime: 'Contact for details',
    completionRate: 0,
    claimed: false
  },
  {
    id: 'rs-machine',
    name: 'RS-Machine Corporation',
    tagline: 'Advanced Machining Solutions',
    description: 'RS-Machine Corporation specializes in advanced machining solutions for various industries. We provide high-quality machined parts and components with precision and accuracy.',
    address: {
      street: '13827 Shavano Mist',
      city: 'SAN ANTONIO',
      state: 'TX',
      zip: '78229'
    },
    phone: '(210) 492-9399',
    website: 'RSMACHINE.COM',
    email: 'info@rsmachine.com',
    logo: '/company-logos/rs-machine.png',
    coverImage: '/company-covers/rs-machine.jpg',
    specialties: [
      'CNC Machining',
      'Production Runs',
      'Prototype Development',
      'Quality Assurance'
    ],
    services: [
      'CNC Services',
      'Custom Machining',
      'Part Manufacturing',
      'Engineering Support',
      'Quality Control'
    ],
    certifications: [
      'ISO Certified',
      'Quality Management'
    ],
    rating: 0,
    reviewCount: 0,
    projectsCompleted: 0,
    yearsInBusiness: 15,
    employeeCount: '10-25',
    featured: false,
    verified: false,
    responseTime: 'Contact for details',
    completionRate: 0,
    claimed: false
  },
  {
    id: 'lps-office-machine',
    name: 'LPS Office Machine Specialists',
    tagline: 'Office Equipment & Machining Services',
    description: 'LPS Office Machine Specialists provides comprehensive office equipment services and machining solutions. We specialize in maintenance, repair, and custom machining.',
    address: {
      street: '174 Sherwood Suite B',
      city: 'SAN ANTONIO',
      state: 'TX',
      zip: '78201'
    },
    phone: '(210) 737-2777',
    website: 'l2psonline.com',
    email: 'info@l2psonline.com',
    logo: '/company-logos/lps-machine.png',
    coverImage: '/company-covers/lps-machine.jpg',
    specialties: [
      'Office Equipment',
      'Machine Services',
      'Maintenance & Repair',
      'Technical Support'
    ],
    services: [
      'Equipment Servicing',
      'Repairs',
      'Maintenance',
      'Technical Consultation',
      'Parts Supply'
    ],
    certifications: [
      'Certified Technicians',
      'Authorized Service Provider'
    ],
    rating: 0,
    reviewCount: 0,
    projectsCompleted: 0,
    yearsInBusiness: 10,
    employeeCount: '1-10',
    featured: false,
    verified: false,
    responseTime: 'Contact for details',
    completionRate: 0,
    claimed: false
  },
  {
    id: 'studio-machine',
    name: 'Studio Machine',
    tagline: 'Creative Machining Solutions',
    description: 'Studio Machine offers creative machining solutions for unique and custom projects. We combine technical expertise with innovative design to deliver exceptional results.',
    address: {
      street: '4119 Medical Dr. #307-E',
      city: 'SAN ANTONIO',
      state: 'TX',
      zip: '78229'
    },
    phone: '(210) 949-1282',
    website: 'STUDIOMACHINE.NET',
    email: 'info@studiomachine.net',
    logo: '/company-logos/studio-machine.png',
    coverImage: '/company-covers/studio-machine.jpg',
    specialties: [
      'Custom Machining',
      'Creative Design',
      'Prototype Development',
      'Specialty Projects'
    ],
    services: [
      'Custom Fabrication',
      'Design Services',
      'Prototyping',
      'Production',
      'Consultation'
    ],
    certifications: [
      'Experienced Craftsmen',
      'Design Specialists'
    ],
    rating: 0,
    reviewCount: 0,
    projectsCompleted: 0,
    yearsInBusiness: 8,
    employeeCount: '1-10',
    featured: false,
    verified: false,
    responseTime: 'Contact for details',
    completionRate: 0,
    claimed: false
  },
  // Plumbing Companies
  {
    id: 'advanced-plumbing',
    name: 'Advanced Plumbing Building Services, Inc.',
    tagline: 'Professional Plumbing Solutions',
    description: 'Advanced Plumbing Building Services provides comprehensive plumbing solutions for commercial and residential properties. Our experienced team delivers reliable service and quality workmanship.',
    address: {
      street: '146-11 13th Avenue',
      city: 'WHITESTONE',
      state: 'NY',
      zip: '11357'
    },
    phone: '(212) 725-2600',
    website: 'PIPECENTRAL.COM',
    email: 'info@pipecentral.com',
    logo: '/company-logos/advanced-plumbing.png',
    coverImage: '/company-covers/advanced-plumbing.jpg',
    specialties: [
      'Commercial Plumbing',
      'Residential Plumbing',
      'Building Services',
      'Emergency Repairs'
    ],
    services: [
      'Plumbing Installation',
      'Repairs & Maintenance',
      'Pipe Fitting',
      'Drain Cleaning',
      'Emergency Services'
    ],
    certifications: [
      'Licensed Plumber',
      'Insured & Bonded'
    ],
    rating: 0,
    reviewCount: 0,
    projectsCompleted: 0,
    yearsInBusiness: 15,
    employeeCount: '10-25',
    featured: false,
    verified: false,
    responseTime: 'Contact for details',
    completionRate: 0,
    claimed: false
  },
  {
    id: 'ashland-plumbing',
    name: 'Ashland Plumbing Corp',
    tagline: 'Trusted Plumbing Services',
    description: 'Ashland Plumbing Corp offers trusted plumbing services for residential and commercial clients. We provide quality installations, repairs, and maintenance services.',
    address: {
      street: '216 W 18th Street',
      city: 'NEW YORK',
      state: 'NY',
      zip: '10010'
    },
    phone: '(212) 353-8232',
    website: 'ASHLANDPLUMBING.COM',
    email: 'info@ashlandplumbing.com',
    logo: '/company-logos/ashland-plumbing.png',
    coverImage: '/company-covers/ashland-plumbing.jpg',
    specialties: [
      'Residential Plumbing',
      'Commercial Plumbing',
      'Repairs',
      'Installations'
    ],
    services: [
      'Plumbing Repairs',
      'Installation Services',
      'Maintenance',
      'Drain Services',
      'Water Heaters'
    ],
    certifications: [
      'Licensed Plumber',
      'Fully Insured'
    ],
    rating: 0,
    reviewCount: 0,
    projectsCompleted: 0,
    yearsInBusiness: 12,
    employeeCount: '1-10',
    featured: false,
    verified: false,
    responseTime: 'Contact for details',
    completionRate: 0,
    claimed: false
  },
  {
    id: 'shelton-plumbing',
    name: 'Shelton Plumbing, Inc.',
    tagline: 'Quality Plumbing Services',
    description: 'Shelton Plumbing, Inc. provides quality plumbing services for the Waco area. Our experienced plumbers deliver reliable solutions for all your plumbing needs.',
    address: {
      street: '201 Otis Drive',
      city: 'WACO',
      state: 'TX',
      zip: '76711'
    },
    phone: '(254) 751-9655',
    website: 'shelton-plumbing.com',
    email: 'info@shelton-plumbing.com',
    logo: '/company-logos/shelton-plumbing.png',
    coverImage: '/company-covers/shelton-plumbing.jpg',
    specialties: [
      'Residential Plumbing',
      'Commercial Services',
      'Repairs & Installation',
      'Emergency Plumbing'
    ],
    services: [
      'Plumbing Installation',
      'Repair Services',
      'Drain Cleaning',
      'Water Heater Services',
      'Pipe Repair'
    ],
    certifications: [
      'Licensed Master Plumber',
      'Insured'
    ],
    rating: 0,
    reviewCount: 0,
    projectsCompleted: 0,
    yearsInBusiness: 10,
    employeeCount: '1-10',
    featured: false,
    verified: false,
    responseTime: 'Contact for details',
    completionRate: 0,
    claimed: false
  },
  {
    id: 'rosenberg-plumbing',
    name: 'Rosenberg Plumbing Service',
    tagline: 'Reliable Plumbing Solutions',
    description: 'Rosenberg Plumbing Service offers reliable plumbing solutions for residential and commercial properties. We provide expert service and quality workmanship.',
    address: {
      street: '1604 Jones Street',
      city: 'ROSENBERG',
      state: 'TX',
      zip: '77471'
    },
    phone: '(281) 342-1228',
    website: 'ROSENBERGPLUMBING.COM',
    email: 'info@rosenbergplumbing.com',
    logo: '/company-logos/rosenberg-plumbing.png',
    coverImage: '/company-covers/rosenberg-plumbing.jpg',
    specialties: [
      'Residential Plumbing',
      'Commercial Plumbing',
      'Emergency Services',
      'Repairs & Maintenance'
    ],
    services: [
      'Plumbing Repairs',
      'Installation',
      'Drain Services',
      'Water Heater Installation',
      'Emergency Response'
    ],
    certifications: [
      'Licensed Plumber',
      'Bonded & Insured'
    ],
    rating: 0,
    reviewCount: 0,
    projectsCompleted: 0,
    yearsInBusiness: 8,
    employeeCount: '1-10',
    featured: false,
    verified: false,
    responseTime: 'Contact for details',
    completionRate: 0,
    claimed: false
  },
  // HVAC Companies
  {
    id: 'abar-hvac',
    name: 'ABAR Heating and Air Conditioning',
    tagline: 'Expert HVAC Services',
    description: 'ABAR Heating and Air Conditioning provides expert HVAC services for residential and commercial clients. Our certified technicians deliver quality heating and cooling solutions.',
    address: {
      street: '8211 Forney Rd',
      city: 'DALLAS',
      state: 'TX',
      zip: '75227'
    },
    phone: '(214) 275-2227',
    website: 'ABARHVAC.COM',
    email: 'info@abarhvac.com',
    logo: '/company-logos/abar-hvac.png',
    coverImage: '/company-covers/abar-hvac.jpg',
    specialties: [
      'HVAC Installation',
      'Air Conditioning',
      'Heating Systems',
      'Maintenance & Repair'
    ],
    services: [
      'AC Installation',
      'Heating Installation',
      'System Maintenance',
      'Emergency Repairs',
      'Energy Efficiency'
    ],
    certifications: [
      'HVAC Licensed',
      'Certified Technicians',
      'Insured'
    ],
    rating: 0,
    reviewCount: 0,
    projectsCompleted: 0,
    yearsInBusiness: 12,
    employeeCount: '10-25',
    featured: false,
    verified: false,
    responseTime: 'Contact for details',
    completionRate: 0,
    claimed: false
  },
  {
    id: 'peters-hvac',
    name: 'Peters Heating and Air Conditioning',
    tagline: 'Comfort Solutions You Can Trust',
    description: 'Peters Heating and Air Conditioning offers reliable comfort solutions for homes and businesses. We specialize in HVAC installation, repair, and maintenance services.',
    address: {
      street: '4520 Broadway',
      city: 'WATERLOO',
      state: 'IL',
      zip: '62298'
    },
    phone: '(217) 222-1368',
    website: 'PETERSHEATINGANDAIR.COM',
    email: 'info@petersheatingandair.com',
    logo: '/company-logos/peters-hvac.png',
    coverImage: '/company-covers/peters-hvac.jpg',
    specialties: [
      'Heating Services',
      'Air Conditioning',
      'HVAC Maintenance',
      'System Installation'
    ],
    services: [
      'Furnace Installation',
      'AC Repair',
      'System Maintenance',
      'Duct Work',
      'Thermostat Installation'
    ],
    certifications: [
      'Licensed HVAC Contractor',
      'Certified Service Technicians'
    ],
    rating: 0,
    reviewCount: 0,
    projectsCompleted: 0,
    yearsInBusiness: 15,
    employeeCount: '1-10',
    featured: false,
    verified: false,
    responseTime: 'Contact for details',
    completionRate: 0,
    claimed: false
  },
  {
    id: 'wrays-ac',
    name: 'Wrays Airconditioning Heating',
    tagline: 'Complete HVAC Solutions',
    description: 'Wrays Airconditioning Heating provides complete HVAC solutions for the Houston area. Our experienced team offers quality installation, repair, and maintenance services.',
    address: {
      street: '2101 W. Main',
      city: 'LEAGUE CITY',
      state: 'TX',
      zip: '77573'
    },
    phone: '(281) 332-2417',
    website: 'WRAYSAC.COM',
    email: 'info@wraysac.com',
    logo: '/company-logos/wrays-ac.png',
    coverImage: '/company-covers/wrays-ac.jpg',
    specialties: [
      'Air Conditioning',
      'Heating Services',
      'HVAC Repair',
      'Installation'
    ],
    services: [
      'AC Installation & Repair',
      'Heating Services',
      'Maintenance Plans',
      'Emergency Service',
      'Indoor Air Quality'
    ],
    certifications: [
      'Licensed HVAC Contractor',
      'Insured & Bonded'
    ],
    rating: 0,
    reviewCount: 0,
    projectsCompleted: 0,
    yearsInBusiness: 10,
    employeeCount: '10-25',
    featured: false,
    verified: false,
    responseTime: 'Contact for details',
    completionRate: 0,
    claimed: false
  },
  // Carpentry & Welding
  {
    id: 'space-carpenter',
    name: 'Space Carpenter, Inc.',
    tagline: 'Expert Carpentry Services',
    description: 'Space Carpenter, Inc. provides expert carpentry services for residential and commercial projects. Our skilled craftsmen deliver quality woodworking and construction services.',
    address: {
      street: '336 East 5th Street Store East',
      city: 'NEW YORK',
      state: 'NY',
      zip: '10003'
    },
    phone: '(212) 995-8765',
    website: 'spacecarpenter.com',
    email: 'info@spacecarpenter.com',
    logo: '/company-logos/space-carpenter.png',
    coverImage: '/company-covers/space-carpenter.jpg',
    specialties: [
      'Custom Carpentry',
      'Woodworking',
      'Renovations',
      'Commercial Carpentry'
    ],
    services: [
      'Custom Millwork',
      'Cabinetry',
      'Finish Carpentry',
      'Renovations',
      'Commercial Projects'
    ],
    certifications: [
      'Licensed Contractor',
      'Skilled Craftsmen'
    ],
    rating: 0,
    reviewCount: 0,
    projectsCompleted: 0,
    yearsInBusiness: 10,
    employeeCount: '1-10',
    featured: false,
    verified: false,
    responseTime: 'Contact for details',
    completionRate: 0,
    claimed: false
  },
  {
    id: 'weldon-group',
    name: 'The Weldon Group',
    tagline: 'Professional Welding Services',
    description: 'The Weldon Group offers professional welding services for industrial and commercial applications. Our certified welders provide quality workmanship and reliable service.',
    address: {
      street: '204 E. 38th St. 2nd Floor',
      city: 'NEW YORK',
      state: 'NY',
      zip: '10015'
    },
    phone: '(212) 490-1411',
    website: 'THEWELDONGROUP.COM',
    email: 'info@theweldongroup.com',
    logo: '/company-logos/weldon-group.png',
    coverImage: '/company-covers/weldon-group.jpg',
    specialties: [
      'Industrial Welding',
      'Commercial Welding',
      'Fabrication',
      'Repairs'
    ],
    services: [
      'Welding Services',
      'Metal Fabrication',
      'Structural Welding',
      'Repairs',
      'Custom Projects'
    ],
    certifications: [
      'Certified Welders',
      'Licensed & Insured'
    ],
    rating: 0,
    reviewCount: 0,
    projectsCompleted: 0,
    yearsInBusiness: 12,
    employeeCount: '10-25',
    featured: false,
    verified: false,
    responseTime: 'Contact for details',
    completionRate: 0,
    claimed: false
  },
  {
    id: 'springfield-welding',
    name: 'Springfield Welding And Auto Body',
    tagline: 'Welding & Auto Body Specialists',
    description: 'Springfield Welding And Auto Body provides welding and auto body services. Our experienced team delivers quality repairs and custom fabrication work.',
    address: {
      street: '2720 S. Holmes',
      city: 'SPRINGFIELD',
      state: 'IL',
      zip: '62703'
    },
    phone: '(217) 544-9889',
    website: 'AUTOSALVAGEPOOL.COM',
    email: 'info@autosalvagepool.com',
    logo: '/company-logos/springfield-welding.png',
    coverImage: '/company-covers/springfield-welding.jpg',
    specialties: [
      'Welding Services',
      'Auto Body Repair',
      'Metal Fabrication',
      'Custom Work'
    ],
    services: [
      'Welding',
      'Auto Body Repair',
      'Fabrication',
      'Restoration',
      'Custom Projects'
    ],
    certifications: [
      'Certified Welders',
      'Auto Body Specialists'
    ],
    rating: 0,
    reviewCount: 0,
    projectsCompleted: 0,
    yearsInBusiness: 15,
    employeeCount: '1-10',
    featured: false,
    verified: false,
    responseTime: 'Contact for details',
    completionRate: 0,
    claimed: false
  }
];


