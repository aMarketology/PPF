'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Navigation from './components/Navigation'
import Footer from './components/Footer'
import { 
  ArrowRight,
  Building,
  Cog,
  Zap,
  Star,
  MapPin,
  CheckCircle,
  Users,
  Shield,
  TrendingUp,
  FileText,
  Search,
  Scale,
  Target,
  HeadphonesIcon,
  Award,
  Globe
} from 'lucide-react';

const serviceAreas = [
  { name: 'Detroit', state: 'Michigan' },
  { name: 'Houston', state: 'Texas' },
  { name: 'Indianapolis', state: 'Indiana' },
  { name: 'Los Angeles', state: 'California' }
];

const engineeringCategories = [
  {
    icon: Building,
    title: 'Structural Engineering',
    description: 'Foundation design, seismic analysis, and code compliance',
    features: ['Foundation Design', 'Seismic Analysis', 'Building Codes', 'CAD Drawings'],
    color: 'blue'
  },
  {
    icon: Cog,
    title: 'Mechanical Engineering',
    description: 'HVAC systems, mechanical design, and optimization',
    features: ['HVAC Design', 'Energy Analysis', 'MEP Systems', 'Load Calculations'],
    color: 'blue'
  },
  {
    icon: Zap,
    title: 'Electrical Engineering',
    description: 'Power systems, lighting design, and smart solutions',
    features: ['Power Systems', 'Lighting Design', 'Solar/Renewable', 'Smart Building'],
    color: 'blue'
  }
];

const whyChooseUs = [
  {
    icon: Shield,
    title: 'Verified Professionals',
    description: 'Every engineer is thoroughly vetted and certified'
  },
  {
    icon: Globe,
    title: 'Global Network',
    description: '2,000+ experts across all engineering disciplines worldwide'
  },
  {
    icon: CheckCircle,
    title: 'Secure Transactions',
    description: 'Escrow payments and quality guarantees on every project'
  },
  {
    icon: HeadphonesIcon,
    title: '24/7 Expert Support',
    description: 'Dedicated team ready to assist whenever you need help'
  }
];

const howItWorks = [
  {
    number: '01',
    icon: FileText,
    title: 'Post Your Project',
    description: 'Describe your engineering needs with our guided project form'
  },
  {
    number: '02',
    icon: Search,
    title: 'Get Matched',
    description: 'We connect you with pre-vetted engineers who match your requirements'
  },
  {
    number: '03',
    icon: Scale,
    title: 'Review Proposals',
    description: 'Compare proposals, portfolios, and ratings to find the perfect fit'
  },
  {
    number: '04',
    icon: Target,
    title: 'Get Results',
    description: 'Collaborate securely and receive high-quality deliverables on time'
  }
];

const trustBadges = [
  { icon: '🏗️', title: 'ASCE Certified', subtitle: 'American Society of Civil Engineers' },
  { icon: '⚙️', title: 'ASME Member', subtitle: 'Mechanical Engineering Society' },
  { icon: '⚡', title: 'IEEE Standards', subtitle: 'Electrical Engineering Institute' },
  { icon: '✅', title: 'ISO 9001', subtitle: 'Quality Management Standard' },
  { icon: '🎓', title: 'FE Licensed', subtitle: 'Fundamentals of Engineering' }
];

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* === HERO SECTION === */}
      <section className="relative min-h-[90vh] flex items-center bg-gradient-to-br from-blue-50 via-white to-slate-50">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
        </div>
        
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8 py-20">
          <div className="text-center max-w-4xl mx-auto space-y-8">
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-200 bg-blue-50 mb-6">
                <Zap className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-gray-700">Engineering Marketplace</span>
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight mb-8"
            >
              Professional Services for
              <span className="block bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent pb-2">
                Every Discipline
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto"
            >
              From structural engineering to electrical systems, we connect you with verified experts across all engineering specialties
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center pt-4"
            >
              <Link
                href="/marketplace"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl"
              >
                Browse Services
                <ArrowRight className="w-5 h-5" />
              </Link>
              
              <Link
                href="/signup"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white border-2 border-gray-200 rounded-lg font-semibold text-gray-900 hover:border-blue-600 transition-all"
              >
                Start Offering Services
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* === ENGINEERING SERVICES SECTION === */}
      <section className="relative py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-200 bg-blue-50 mb-6">
              <Cog className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-gray-700">Professional Services</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Professional Services for Every Discipline
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              From structural engineering to electrical systems, we connect you with verified experts across all engineering specialties
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {engineeringCategories.map((category, index) => {
              const Icon = category.icon;
              return (
                <Link 
                  key={index}
                  href="/marketplace"
                  className="group relative rounded-2xl overflow-hidden bg-gradient-to-br from-blue-50 to-white border-2 border-gray-200 hover:border-blue-600 transition-all duration-300 hover:shadow-xl p-8"
                >
                  <div className="w-14 h-14 mb-6 rounded-xl bg-blue-100 flex items-center justify-center">
                    <Icon className="w-7 h-7 text-blue-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{category.title}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {category.description}
                  </p>
                  <ul className="space-y-2 mb-6">
                    {category.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                        <CheckCircle className="w-4 h-4 text-blue-600" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <div className="inline-flex items-center gap-2 text-blue-600 font-semibold group-hover:gap-3 transition-all">
                    Learn More
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* === HOW IT WORKS === */}
      <section className="relative py-24 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-200 bg-blue-50 mb-6">
              <Target className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-gray-700">HOW IT WORKS</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Simple. Professional.
              <span className="block bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                Results-Driven.
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get your engineering project completed in 4 simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorks.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="relative bg-white rounded-2xl p-8 border-2 border-gray-200 hover:border-blue-600 transition-all hover:shadow-xl">
                  <div className="absolute -top-4 left-8">
                    <div className="w-12 h-12 rounded-xl bg-blue-600 text-white font-bold text-xl flex items-center justify-center shadow-lg">
                      {step.number}
                    </div>
                  </div>
                  <div className="mt-6">
                    <div className="text-4xl mb-4">{step.icon === FileText ? '📝' : step.icon === Search ? '🔍' : step.icon === Scale ? '⚖️' : '🎯'}</div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{step.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* === WHY CHOOSE US === */}
      <section className="relative py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Why Teams Choose
              <span className="block bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                Precision Project Flow
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We're the engineering marketplace built for professionals who demand quality, reliability, and results.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {whyChooseUs.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="bg-gradient-to-br from-blue-50 to-white rounded-2xl p-8 border-2 border-gray-200 hover:border-blue-600 transition-all hover:shadow-xl">
                  <div className="w-12 h-12 mb-4 rounded-xl bg-blue-100 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              );
            })}
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="text-center p-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl text-white">
              <div className="text-5xl font-bold mb-2">4.8</div>
              <div className="text-xl font-semibold mb-1">Highly Trusted</div>
              <div className="text-blue-100">Rated by thousands of satisfied clients globally</div>
            </div>
            <div className="text-center p-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl text-white">
              <div className="text-5xl font-bold mb-2">2K+</div>
              <div className="text-xl font-semibold mb-1">Expert Engineers</div>
              <div className="text-blue-100">Across all disciplines</div>
            </div>
            <div className="text-center p-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl text-white">
              <div className="text-5xl font-bold mb-2">500+</div>
              <div className="text-xl font-semibold mb-1">Active Services</div>
              <div className="text-blue-100">Available right now</div>
            </div>
          </div>

          {/* Trust Badge */}
          <div className="text-center">
            <p className="text-lg text-gray-600 font-semibold mb-4">Trusted in 50+ Countries</p>
            <p className="text-gray-500">International engineering teams rely on us daily</p>
          </div>
        </div>
      </section>

      {/* === TRUSTED BY LEADING ORGANIZATIONS === */}
      <section className="relative py-24 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-200 bg-blue-50 mb-6">
              <Award className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-gray-700">TRUSTED BY LEADING ORGANIZATIONS</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Industry Certifications & Standards
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {trustBadges.map((badge, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 border-2 border-gray-200 hover:border-blue-600 transition-all text-center hover:shadow-xl">
                <div className="text-5xl mb-4">{badge.icon}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">{badge.title}</h3>
                <p className="text-sm text-gray-600">{badge.subtitle}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* === SERVICE AREAS === */}
      <section className="relative py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-200 bg-blue-50 mb-6">
              <MapPin className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-gray-700">Service Areas</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Serving Engineers & Clients Nationwide
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Connecting engineering talent with projects across the United States
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {serviceAreas.map((area, index) => (
              <div key={index} className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-6 border-2 border-gray-200 hover:border-blue-600 transition-all text-center">
                <MapPin className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                <h3 className="text-xl font-bold text-gray-900">{area.name}</h3>
                <p className="text-sm text-gray-600">{area.state}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-600 text-lg">
              And expanding to more cities across the United States
            </p>
          </div>
        </div>
      </section>

      {/* === FINAL CTA === */}
      <section className="relative py-24 bg-gradient-to-br from-blue-600 to-blue-700">
        <div className="max-w-5xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          
          <p className="text-xl text-blue-100 mb-12 max-w-2xl mx-auto">
            Join Precision Product Flow today and connect with top engineering talent or find your next project.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/signup"
              className="inline-flex items-center justify-center gap-2 px-10 py-5 bg-white text-blue-600 rounded-lg font-semibold text-lg hover:shadow-2xl transition-all"
            >
              Create Account
              <ArrowRight className="w-6 h-6" />
            </Link>
            
            <Link
              href="/marketplace"
              className="inline-flex items-center justify-center gap-2 px-10 py-5 bg-transparent border-2 border-white text-white rounded-lg font-semibold text-lg hover:bg-white/10 transition-all"
            >
              Browse Marketplace
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
