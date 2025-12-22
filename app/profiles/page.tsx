'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'
import { mockCompanies } from '@/lib/mockData'
import { 
  Search, 
  MapPin, 
  Star, 
  CheckCircle, 
  TrendingUp,
  Building,
  Clock,
  Award,
  ChevronRight,
  Filter,
  Users
} from 'lucide-react'

export default function ProfilesPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedState, setSelectedState] = useState('all')
  const [sortBy, setSortBy] = useState('featured')

  // Get unique states from companies
  const states = Array.from(new Set(mockCompanies.map(c => c.address.state)))

  // Filter and sort companies
  const filteredCompanies = mockCompanies
    .filter(company => {
      const matchesSearch = company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          company.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          company.specialties.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()))
      const matchesState = selectedState === 'all' || company.address.state === selectedState
      return matchesSearch && matchesState
    })
    .sort((a, b) => {
      if (sortBy === 'featured') return b.featured ? 1 : -1
      if (sortBy === 'rating') return b.rating - a.rating
      if (sortBy === 'projects') return b.projectsCompleted - a.projectsCompleted
      return 0
    })

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 bg-gradient-to-br from-blue-50 via-white to-slate-50">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-200 bg-blue-50 mb-6">
              <Building className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-gray-700">Company Profiles</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Verified Engineering
              <span className="block bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                Companies
              </span>
            </h1>
            
            <p className="text-xl text-gray-600">
              Connect with established engineering firms and manufacturing companies across the United States
            </p>
          </motion.div>

          {/* Search and Filter Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-white rounded-2xl shadow-xl border-2 border-gray-200 p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Search */}
                <div className="md:col-span-2">
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search companies, services, specialties..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    />
                  </div>
                </div>

                {/* State Filter */}
                <div className="relative">
                  <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <select
                    value={selectedState}
                    onChange={(e) => setSelectedState(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all appearance-none bg-white"
                  >
                    <option value="all">All States</option>
                    {states.map(state => (
                      <option key={state} value={state}>{state}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Sort Options */}
              <div className="flex items-center gap-4 mt-4 pt-4 border-t border-gray-200">
                <span className="text-sm font-medium text-gray-700">Sort by:</span>
                <div className="flex gap-2">
                  {[
                    { value: 'featured', label: 'Featured' },
                    { value: 'rating', label: 'Highest Rated' },
                    { value: 'projects', label: 'Most Projects' }
                  ].map(option => (
                    <button
                      key={option.value}
                      onClick={() => setSortBy(option.value)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        sortBy === option.value
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Companies Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">
              {filteredCompanies.length} {filteredCompanies.length === 1 ? 'Company' : 'Companies'} Found
            </h2>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={searchQuery + selectedState + sortBy}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredCompanies.map((company, index) => (
                <motion.div
                  key={company.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <Link
                    href={`/profile/${company.id}`}
                    className="block group"
                  >
                    <div className="bg-gradient-to-br from-white to-blue-50 rounded-2xl border-2 border-gray-200 hover:border-blue-600 transition-all duration-300 hover:shadow-xl overflow-hidden h-full">
                      {/* Company Header */}
                      <div className="p-6 bg-gradient-to-br from-blue-600 to-blue-700 text-white relative">
                        {company.featured && (
                          <div className="absolute top-4 right-4">
                            <div className="bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                              <Award className="w-3 h-3" />
                              Featured
                            </div>
                          </div>
                        )}
                        {!company.claimed && (
                          <div className="absolute top-4 left-4">
                            <div className="bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-xs font-bold">
                              Unclaimed
                            </div>
                          </div>
                        )}
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center">
                            <Building className="w-6 h-6 text-blue-600" />
                          </div>
                          {company.verified && (
                            <CheckCircle className="w-5 h-5 text-green-400" />
                          )}
                        </div>
                        <h3 className="text-xl font-bold mb-1">{company.name}</h3>
                        <p className="text-blue-100 text-sm">{company.tagline}</p>
                      </div>

                      {/* Company Details */}
                      <div className="p-6 space-y-4">
                        {/* Location */}
                        <div className="flex items-start gap-2">
                          <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                          <p className="text-sm text-gray-600">
                            {company.address.city}, {company.address.state}
                          </p>
                        </div>

                        {/* Rating */}
                        {company.rating > 0 ? (
                          <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              <span className="font-bold text-gray-900">{company.rating}</span>
                            </div>
                            <span className="text-sm text-gray-600">
                              ({company.reviewCount} reviews)
                            </span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            <Star className="w-4 h-4 text-gray-400" />
                            <span className="text-sm text-gray-600">No reviews yet</span>
                          </div>
                        )}

                        {/* Stats */}
                        {company.projectsCompleted > 0 ? (
                          <div className="grid grid-cols-2 gap-3">
                            <div className="bg-blue-50 rounded-lg p-3">
                              <div className="text-2xl font-bold text-blue-600">{company.projectsCompleted}</div>
                              <div className="text-xs text-gray-600">Projects</div>
                            </div>
                            <div className="bg-blue-50 rounded-lg p-3">
                              <div className="text-2xl font-bold text-blue-600">{company.completionRate}%</div>
                              <div className="text-xs text-gray-600">Success Rate</div>
                            </div>
                          </div>
                        ) : (
                          <div className="bg-blue-50 rounded-lg p-3 text-center">
                            <div className="text-sm font-medium text-gray-700">
                              {company.yearsInBusiness} Years in Business
                            </div>
                            <div className="text-xs text-gray-600 mt-1">Established Company</div>
                          </div>
                        )}

                        {/* Response Time */}
                        <div className="flex items-center gap-2 text-sm">
                          <Clock className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-600">{company.responseTime}</span>
                        </div>

                        {/* Top Specialties */}
                        <div>
                          <div className="text-xs font-semibold text-gray-700 mb-2">Specialties:</div>
                          <div className="flex flex-wrap gap-2">
                            {company.specialties.slice(0, 3).map((specialty, i) => (
                              <span
                                key={i}
                                className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full"
                              >
                                {specialty}
                              </span>
                            ))}
                            {company.specialties.length > 3 && (
                              <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full">
                                +{company.specialties.length - 3} more
                              </span>
                            )}
                          </div>
                        </div>

                        {/* View Profile Button */}
                        <div className="pt-4">
                          <div className="inline-flex items-center gap-2 text-blue-600 font-semibold group-hover:gap-3 transition-all">
                            View Profile
                            <ChevronRight className="w-4 h-4" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {filteredCompanies.length === 0 && (
            <div className="text-center py-20">
              <Building className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">No Companies Found</h3>
              <p className="text-gray-600">
                Try adjusting your search or filter criteria
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-blue-700">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Is Your Company Listed?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join our marketplace and connect with clients looking for engineering services
          </p>
          <Link
            href="/signup"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold text-lg hover:shadow-2xl transition-all"
          >
            Register Your Company
            <ChevronRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
