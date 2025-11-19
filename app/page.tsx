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
  TrendingUp
} from 'lucide-react';

const serviceAreas = [
  { name: 'Detroit', state: 'Michigan' },
  { name: 'Houston', state: 'Texas' },
  { name: 'Indianapolis', state: 'Indiana' },
  { name: 'Los Angeles', state: 'California' }
];

const engineeringCategories = [
  {
    icon: Cog,
    title: 'Mechanical Engineering',
    description: 'Product design, CAD modeling, prototyping, and manufacturing optimization.',
    features: ['CAD/CAM Design', 'Product Development', 'Prototyping', 'Manufacturing'],
    color: 'blue'
  },
  {
    icon: Zap,
    title: 'Electrical Engineering',
    description: 'Circuit design, PCB layout, power systems, and embedded electronics.',
    features: ['Circuit Design', 'PCB Layout', 'Power Systems', 'Embedded Systems'],
    color: 'blue'
  },
  {
    icon: Building,
    title: 'Software Engineering',
    description: 'Embedded systems, automation, IoT solutions, and custom applications.',
    features: ['Embedded Software', 'IoT Solutions', 'Automation', 'Custom Apps'],
    color: 'blue'
  }
];

const whyChooseUs = [
  {
    icon: Shield,
    title: 'Verified Engineers',
    description: 'All engineers are vetted and verified professionals'
  },
  {
    icon: Users,
    title: 'Wide Network',
    description: 'Access to engineering talent across the United States'
  },
  {
    icon: TrendingUp,
    title: 'Quality Projects',
    description: 'Connect with serious clients on meaningful projects'
  },
  {
    icon: CheckCircle,
    title: 'Secure Platform',
    description: 'Safe, reliable platform for project management'
  }
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
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight"
            >
              Connect with Expert
              <span className="block bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                Engineering Services
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto"
            >
              Find specialized engineering talent for your projects or offer your engineering expertise to clients nationwide.
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
              <span className="text-sm font-medium text-gray-700">Engineering Services</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Browse Expert Engineering Services
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Find specialized engineering talent across multiple disciplines
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
                    Browse Services
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* === WHY CHOOSE US === */}
      <section className="relative py-24 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Why Choose
              <span className="block bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                Precision Product Flow
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The trusted marketplace connecting engineers with clients nationwide
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUs.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="bg-white rounded-2xl p-8 border-2 border-gray-200 hover:border-blue-600 transition-all">
                  <div className="w-12 h-12 mb-4 rounded-xl bg-blue-100 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              );
            })}
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
