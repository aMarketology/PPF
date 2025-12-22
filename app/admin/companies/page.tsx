'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { mockCompanies, Company } from '@/lib/mockData'

export default function AdminCompaniesPage() {
  const [companies, setCompanies] = useState<Company[]>(mockCompanies)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterSpecialty, setFilterSpecialty] = useState('all')
  const [filterClaimed, setFilterClaimed] = useState<'all' | 'claimed' | 'unclaimed'>('all')

  // Get unique specialties from all companies
  const specialties = Array.from(new Set(companies.flatMap(c => c.specialties)))

  const filteredCompanies = companies.filter(company => {
    const fullLocation = `${company.address.city}, ${company.address.state}`
    const matchesSearch = 
      company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      fullLocation.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesSpecialty = filterSpecialty === 'all' || company.specialties.includes(filterSpecialty)
    const matchesClaimed = filterClaimed === 'all' || 
      (filterClaimed === 'claimed' ? company.claimed : !company.claimed)
    
    return matchesSearch && matchesSpecialty && matchesClaimed
  })

  const toggleClaimed = (companyId: string) => {
    setCompanies(companies.map(c => 
      c.id === companyId ? { ...c, claimed: !c.claimed } : c
    ))
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">Company Management</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          + Add Company
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-4 mb-6">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search by company name or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <select
          value={filterSpecialty}
          onChange={(e) => setFilterSpecialty(e.target.value)}
          className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Specialties</option>
          {specialties.map(s => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        <select
          value={filterClaimed}
          onChange={(e) => setFilterClaimed(e.target.value as any)}
          className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Status</option>
          <option value="claimed">Claimed</option>
          <option value="unclaimed">Unclaimed</option>
        </select>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        <div className="bg-gray-800 rounded-lg p-4">
          <p className="text-gray-400 text-sm">Total Companies</p>
          <p className="text-2xl font-bold text-white">{companies.length}</p>
        </div>
        <div className="bg-gray-800 rounded-lg p-4">
          <p className="text-gray-400 text-sm">Claimed</p>
          <p className="text-2xl font-bold text-green-400">{companies.filter(c => c.claimed).length}</p>
        </div>
        <div className="bg-gray-800 rounded-lg p-4">
          <p className="text-gray-400 text-sm">Unclaimed</p>
          <p className="text-2xl font-bold text-yellow-400">{companies.filter(c => !c.claimed).length}</p>
        </div>
        <div className="bg-gray-800 rounded-lg p-4">
          <p className="text-gray-400 text-sm">Verified</p>
          <p className="text-2xl font-bold text-blue-400">{companies.filter(c => c.verified).length}</p>
        </div>
      </div>

      {/* Companies Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gray-800 rounded-xl overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700">
            <thead className="bg-gray-900">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Company</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Specialty</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Location</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Rating</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {filteredCompanies.map((company) => (
                <tr key={company.id} className="hover:bg-gray-700/50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center text-white font-semibold">
                        {company.name.charAt(0)}
                      </div>
                      <div>
                        <div className="text-white font-medium flex items-center gap-2">
                          {company.name}
                          {company.verified && <span className="text-blue-400">✓</span>}
                        </div>
                        <div className="text-sm text-gray-400">{company.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-gray-300">{company.specialties[0]}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                    {company.address.city}, {company.address.state}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                    {company.rating ? `${company.rating} ⭐ (${company.reviewCount})` : 'No reviews'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs rounded-full ${
                      company.claimed 
                        ? 'bg-green-500/20 text-green-400' 
                        : 'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {company.claimed ? 'Claimed' : 'Unclaimed'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex gap-2">
                      <button className="text-blue-400 hover:text-blue-300 text-sm">
                        Edit
                      </button>
                      <button 
                        onClick={() => toggleClaimed(company.id)}
                        className="text-yellow-400 hover:text-yellow-300 text-sm"
                      >
                        {company.claimed ? 'Unclaim' : 'Claim'}
                      </button>
                      <button className="text-red-400 hover:text-red-300 text-sm">
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  )
}
