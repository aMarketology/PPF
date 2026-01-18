'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Navigation from '@/app/components/Navigation';
import Footer from '@/app/components/Footer';
import {
  Building2,
  Users,
  TrendingUp,
  Shield,
  Zap,
  Clock,
  DollarSign,
  Award,
  CheckCircle,
  ArrowRight,
  Search,
  MessageSquare,
  FileText,
  Star,
  Target,
  Briefcase,
  BarChart,
  Globe,
  Phone,
  Mail
} from 'lucide-react';

export default function GetStartedPage() {
  const router = useRouter();
  const [userType, setUserType] = useState<'client' | 'provider' | null>(null);

  const handleGetStarted = (type: 'client' | 'provider') => {
    router.push(`/signup?type=${type}`);
  };

  return (
    <>
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-slate-900 pt-32 pb-20 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,.05) 10px, rgba(255,255,255,.05) 20px)',
          }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-blue-500/20 backdrop-blur-sm border border-blue-400/30 rounded-full px-6 py-2 mb-6"
            >
              <Award className="h-5 w-5 text-blue-300" />
              <span className="text-blue-100 font-medium">Join Engineering Professionals</span>
            </motion.div>

            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight">
              Unlock Growth & Efficiency
              <span className="block text-4xl md:text-5xl lg:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300 mt-0 pb-2 leading-normal">
                The Premier B2B Engineering Marketplace
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed">
              Connect, Collaborate, and Thrive in a Streamlined Ecosystem for Construction, 
              Engineering, and Industrial Services
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <motion.button
                onClick={() => handleGetStarted('client')}
                className="group w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white text-lg font-bold rounded-xl shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                I Need Services
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>

              <motion.button
                onClick={() => handleGetStarted('provider')}
                className="group w-full sm:w-auto px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-white/30 hover:bg-white/20 text-white text-lg font-bold rounded-xl transition-all flex items-center justify-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                I Offer Services
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6 text-blue-200">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <span>Free to Join</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <span>Secure Payments</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <span>Verified Professionals</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* Social Proof */}
      <section className="py-12 bg-gradient-to-r from-blue-50 to-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { icon: Building2, value: '500+', label: 'Companies' },
              { icon: Users, value: '1,000+', label: 'Professionals' },
              { icon: Briefcase, value: '$2M+', label: 'Projects Value' },
              { icon: Star, value: '4.9/5', label: 'Avg Rating' },
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-6 shadow-lg"
              >
                <stat.icon className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Benefits */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Why Industry Leaders Choose Us
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              In today's fast-paced business environment, efficiency and strategic networking 
              are key to success. Here's how we help you thrive.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Globe,
                title: 'Expand Your Network',
                description: 'Connect with a diverse range of industry professionals, opening doors to new partnerships and collaborations across construction, engineering, and industrial sectors.',
                color: 'blue'
              },
              {
                icon: Search,
                title: 'Streamline Procurement',
                description: 'Easily source the services and products you need from verified vendors, saving time and resources with our intelligent matching system.',
                color: 'green'
              },
              {
                icon: Target,
                title: 'Showcase Your Expertise',
                description: 'Offer your services and products to a targeted audience, increasing your visibility and generating qualified leads that convert.',
                color: 'purple'
              },
              {
                icon: TrendingUp,
                title: 'Optimize Resources',
                description: 'Efficiently manage your resources by outsourcing tasks and projects to qualified professionals, focus on what you do best.',
                color: 'orange'
              },
              {
                icon: DollarSign,
                title: 'Reduce Costs',
                description: 'Competitive pricing and streamlined processes help you minimize expenses and maximize your ROI with transparent fee structures.',
                color: 'red'
              },
              {
                icon: Shield,
                title: 'Secure Transactions',
                description: 'Every payment is protected with escrow. Every professional is verified. Your business is safe with enterprise-grade security.',
                color: 'indigo'
              },
            ].map((benefit, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="group bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all border border-gray-100 hover:border-blue-200"
              >
                <div className={`inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-${benefit.color}-500 to-${benefit.color}-600 rounded-xl mb-6 group-hover:scale-110 transition-transform shadow-lg`}>
                  <benefit.icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{benefit.title}</h3>
                <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Who It's For */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Built for Industry Professionals
            </h2>
            <p className="text-xl text-gray-600">
              Whether you're seeking services or offering them, we've got you covered
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* For Clients */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl p-10 shadow-xl border border-gray-100"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl mb-6">
                <Briefcase className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-6">For Clients & Businesses</h3>
              <ul className="space-y-4">
                {[
                  'Construction Companies',
                  'General Contractors',
                  'Property Developers',
                  'Operating Plants & Facilities',
                  'Architects & Design Firms',
                  'Manufacturing Operations',
                  'Municipal & Government Projects',
                  'Small to Medium Businesses'
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 text-lg">{item}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => handleGetStarted('client')}
                className="w-full mt-8 px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
              >
                Find Services Now
                <ArrowRight className="h-5 w-5" />
              </button>
            </motion.div>

            {/* For Providers */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-blue-900 to-slate-900 rounded-3xl p-10 shadow-xl text-white"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl mb-6">
                <Building2 className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold mb-6">For Service Providers</h3>
              <ul className="space-y-4">
                {[
                  'Engineering Firms (Structural, Civil, MEP)',
                  'Licensed Contractors',
                  'Machine Shops & Fabrication',
                  'Welding & Industrial Services',
                  'HVAC & Plumbing Specialists',
                  'Carpentry & Specialized Trades',
                  'Independent Professional Engineers',
                  'Multi-Discipline Consultants'
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-blue-400 flex-shrink-0 mt-0.5" />
                    <span className="text-blue-50 text-lg">{item}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => handleGetStarted('provider')}
                className="w-full mt-8 px-6 py-4 bg-white hover:bg-blue-50 text-blue-900 font-bold rounded-xl transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
              >
                Start Growing Your Business
                <ArrowRight className="h-5 w-5" />
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Get Started in 3 Simple Steps
            </h2>
            <p className="text-xl text-gray-600">
              From registration to project completion - we make it seamless
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connecting Lines */}
            <div className="hidden md:block absolute top-1/4 left-0 right-0 h-1 bg-gradient-to-r from-blue-200 via-blue-400 to-blue-200 -z-10" />

            {[
              {
                step: '01',
                icon: Users,
                title: 'Create Your Profile',
                description: 'Sign up in minutes. Tell us about your business and what you need (or offer). Get verified instantly.',
              },
              {
                step: '02',
                icon: Search,
                title: 'Connect & Discover',
                description: 'Browse verified professionals or let clients find you. Message directly, review portfolios, and discuss projects.',
              },
              {
                step: '03',
                icon: Zap,
                title: 'Collaborate & Succeed',
                description: 'Award projects, manage orders, make secure payments, and build lasting professional relationships.',
              },
            ].map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.2 }}
                viewport={{ once: true }}
                className="relative bg-gradient-to-br from-white to-blue-50 rounded-2xl p-8 shadow-xl border border-blue-100"
              >
                <div className="absolute -top-6 left-8 w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg">
                  {step.step}
                </div>
                <div className="mt-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl mb-6">
                    <step.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Everything You Need to Succeed
            </h2>
            <p className="text-xl text-gray-600">
              Powerful features designed for modern B2B collaboration
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: MessageSquare, title: 'Direct Messaging', description: 'Real-time communication with any user' },
              { icon: Shield, title: 'Secure Payments', description: 'Escrow protection for every transaction' },
              { icon: FileText, title: 'Smart Contracts', description: 'Clear terms and deliverables' },
              { icon: Star, title: 'Reviews & Ratings', description: 'Build trust through feedback' },
              { icon: Clock, title: 'Project Tracking', description: 'Monitor progress in real-time' },
              { icon: BarChart, title: 'Analytics', description: 'Track your business growth' },
              { icon: Award, title: 'Verified Badges', description: 'Showcase your credentials' },
              { icon: Users, title: 'Team Management', description: 'Collaborate with your team' },
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.05 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all text-center group hover:-translate-y-1"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl mb-4 group-hover:scale-110 transition-transform">
                  <feature.icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 bg-gradient-to-br from-blue-900 via-blue-800 to-slate-900 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,.05) 10px, rgba(255,255,255,.05) 20px)',
          }} />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl text-blue-100 mb-10">
              Join the marketplace today and experience the future of B2B collaboration. 
              Free to join, easy to use, powerful results.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <motion.button
                onClick={() => handleGetStarted('client')}
                className="group px-10 py-5 bg-white hover:bg-blue-50 text-blue-900 text-xl font-bold rounded-xl transition-all shadow-2xl hover:shadow-3xl flex items-center justify-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get Started as Client
                <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
              </motion.button>

              <motion.button
                onClick={() => handleGetStarted('provider')}
                className="group px-10 py-5 bg-white/10 backdrop-blur-sm border-2 border-white hover:bg-white/20 text-white text-xl font-bold rounded-xl transition-all flex items-center justify-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get Started as Provider
                <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-8 text-blue-200 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <span>No Credit Card Required</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <span>Setup in 5 Minutes</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <span>Cancel Anytime</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Questions? We're Here to Help
            </h3>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-gray-600">
              <a href="tel:716-755-4237" className="flex items-center gap-2 hover:text-blue-600 transition-colors">
                <Phone className="h-5 w-5" />
                <span className="font-medium">716-755-4237</span>
              </a>
              <span className="hidden sm:block text-gray-300">|</span>
              <a href="mailto:PrecisionProjectFlow@gmail.com" className="flex items-center gap-2 hover:text-blue-600 transition-colors">
                <Mail className="h-5 w-5" />
                <span className="font-medium">PrecisionProjectFlow@gmail.com</span>
              </a>
              <span className="hidden sm:block text-gray-300">|</span>
              <a href="https://precisionprojectflow.com" className="flex items-center gap-2 hover:text-blue-600 transition-colors">
                <Globe className="h-5 w-5" />
                <span className="font-medium">PrecisionProjectFlow.com</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
