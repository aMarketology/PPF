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
