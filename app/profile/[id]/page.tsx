'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Navigation from '@/app/components/Navigation'
import Footer from '@/app/components/Footer'
import { mockCompanies } from '@/lib/mockData'
import { 
  MapPin, 
  Phone, 
  Globe, 
  Mail, 
  Star, 
  CheckCircle,
  Award,
  Clock,
  TrendingUp,
  Users,
  Building,
  Send,
  ChevronLeft,
  Calendar,
  ShieldCheck,
  Briefcase,
  AlertCircle
} from 'lucide-react'

export default function ProfilePage({ params }: { params: { id: string } }) {
  const { id } = params
  const company = mockCompanies.find(c => c.id === id)

  if (!company) {
    return (
      <div className="min-h-screen bg-white">
        <Navigation />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-32 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Company Not Found</h1>
          <p className="text-gray-600 mb-8">The company profile you're looking for doesn't exist.</p>
          <Link
            href="/profiles"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Companies
          </Link>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero/Cover Section */}
      <section className="relative pt-24 pb-0 bg-gradient-to-br from-blue-600 to-blue-700">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Back Button */}
          <Link
            href="/profiles"
            className="inline-flex items-center gap-2 text-white hover:text-blue-100 mb-6 transition-all"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Companies
          </Link>

          {/* Unclaimed Profile Banner */}
          {!company.claimed && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6 bg-yellow-50 border-2 border-yellow-300 rounded-xl p-4 flex items-start gap-3"
            >
              <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <h3 className="font-semibold text-yellow-900 mb-1">Unclaimed Profile</h3>
                <p className="text-sm text-yellow-800">
                  This profile has not been claimed by the business owner. Is this your company?
                </p>
              </div>
              <Link
                href="/signup"
                className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg font-semibold text-sm whitespace-nowrap transition-all"
              >
                Claim Profile
              </Link>
            </motion.div>
          )}

          {/* Company Header */}
          <div className="pb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col md:flex-row gap-6 items-start"
            >
              {/* Company Logo */}
              <div className="w-24 h-24 rounded-2xl bg-white flex items-center justify-center shadow-xl flex-shrink-0">
                <Building className="w-12 h-12 text-blue-600" />
              </div>

              {/* Company Info */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <h1 className="text-4xl md:text-5xl font-bold text-white">{company.name}</h1>
                  {company.verified && (
                    <CheckCircle className="w-8 h-8 text-green-400" />
                  )}
                  {company.featured && (
                    <div className="bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1">
                      <Award className="w-4 h-4" />
                      Featured
                    </div>
                  )}
                </div>
                <p className="text-2xl text-blue-100 mb-4">{company.tagline}</p>

                {/* Rating and Stats */}
                <div className="flex flex-wrap gap-6 text-white">
                  {company.rating > 0 ? (
                    <div className="flex items-center gap-2">
                      <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      <span className="font-bold text-xl">{company.rating}</span>
                      <span className="text-blue-100">({company.reviewCount} reviews)</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Star className="w-5 h-5 text-blue-200" />
                      <span className="text-blue-100">New to platform</span>
                    </div>
                  )}
                  {company.projectsCompleted > 0 && (
                    <div className="flex items-center gap-2">
                      <Briefcase className="w-5 h-5" />
                      <span className="font-semibold">{company.projectsCompleted} Projects</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    <span className="font-semibold">{company.yearsInBusiness} Years in Business</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left Column - Main Info */}
            <div className="lg:col-span-2 space-y-8">
              
              {/* About Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="bg-white rounded-2xl border-2 border-gray-200 p-8"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-4">About {company.name}</h2>
                <p className="text-gray-600 leading-relaxed">{company.description}</p>
              </motion.div>

              {/* Specialties */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white rounded-2xl border-2 border-gray-200 p-8"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Specialties</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {company.specialties.map((specialty, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg border border-blue-200"
                    >
                      <CheckCircle className="w-4 h-4 text-blue-600 flex-shrink-0" />
                      <span className="text-sm font-medium text-gray-900">{specialty}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Services Offered */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-white rounded-2xl border-2 border-gray-200 p-8"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Services Offered</h2>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {company.services.map((service, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{service}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Certifications */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-white rounded-2xl border-2 border-gray-200 p-8"
              >
                <div className="flex items-center gap-2 mb-6">
                  <ShieldCheck className="w-6 h-6 text-blue-600" />
                  <h2 className="text-2xl font-bold text-gray-900">Certifications & Credentials</h2>
                </div>
                <ul className="space-y-3">
                  {company.certifications.map((cert, index) => (
                    <li key={index} className="flex items-center gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
                      <Award className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <span className="font-medium text-gray-900">{cert}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>

            {/* Right Column - Contact & Stats */}
            <div className="lg:col-span-1 space-y-6">
              
              {/* Contact Card */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="bg-white rounded-2xl border-2 border-gray-200 p-6 sticky top-24"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-6">Contact Information</h3>
                
                <div className="space-y-4 mb-6">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-medium text-gray-900">{company.address.street}</div>
                      <div className="text-gray-600">
                        {company.address.city}, {company.address.state} {company.address.zip}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-blue-600 flex-shrink-0" />
                    <a href={`tel:${company.phone}`} className="text-blue-600 hover:text-blue-700 font-medium">
                      {company.phone}
                    </a>
                  </div>

                  <div className="flex items-center gap-3">
                    <Globe className="w-5 h-5 text-blue-600 flex-shrink-0" />
                    <a 
                      href={`https://${company.website}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-700 font-medium"
                    >
                      {company.website}
                    </a>
                  </div>

                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-blue-600 flex-shrink-0" />
                    <a href={`mailto:${company.email}`} className="text-blue-600 hover:text-blue-700 font-medium">
                      {company.email}
                    </a>
                  </div>
                </div>

                <div className="space-y-3">
                  <button className="w-full bg-blue-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2">
                    <Send className="w-5 h-5" />
                    Contact Company
                  </button>

                  {!company.claimed && (
                    <Link
                      href="/signup"
                      className="w-full bg-yellow-500 text-white py-3 px-6 rounded-xl font-semibold hover:bg-yellow-600 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                    >
                      <Building className="w-5 h-5" />
                      Claim This Profile
                    </Link>
                  )}
                </div>
              </motion.div>

              {/* Stats Card */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl border-2 border-blue-200 p-6"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-6">Company Stats</h3>
                
                <div className="space-y-4">
                  {company.completionRate > 0 && (
                    <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-blue-600" />
                        <span className="text-gray-700">Success Rate</span>
                      </div>
                      <span className="font-bold text-gray-900">{company.completionRate}%</span>
                    </div>
                  )}

                  <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                    <div className="flex items-center gap-2">
                      <Clock className="w-5 h-5 text-blue-600" />
                      <span className="text-gray-700">Response Time</span>
                    </div>
                    <span className="font-bold text-gray-900">{company.responseTime}</span>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                    <div className="flex items-center gap-2">
                      <Users className="w-5 h-5 text-blue-600" />
                      <span className="text-gray-700">Team Size</span>
                    </div>
                    <span className="font-bold text-gray-900">{company.employeeCount}</span>
                  </div>

                  {company.projectsCompleted > 0 ? (
                    <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                      <div className="flex items-center gap-2">
                        <Briefcase className="w-5 h-5 text-blue-600" />
                        <span className="text-gray-700">Projects Done</span>
                      </div>
                      <span className="font-bold text-gray-900">{company.projectsCompleted}</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-blue-600" />
                        <span className="text-gray-700">Experience</span>
                      </div>
                      <span className="font-bold text-gray-900">{company.yearsInBusiness} Years</span>
                    </div>
                  )}
                </div>
              </motion.div>

              {/* Verification Badge */}
              {company.verified && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="bg-green-50 rounded-2xl border-2 border-green-200 p-6 text-center"
                >
                  <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-3" />
                  <h3 className="font-bold text-gray-900 mb-2">Verified Company</h3>
                  <p className="text-sm text-gray-600">
                    This company has been verified and approved by Precision Project Flow
                  </p>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
