'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Navigation from '@/app/components/Navigation'
import Footer from '@/app/components/Footer'
import { createClient } from '@/lib/supabase/client'

// Mock project requests
const mockProjectRequests = [
  {
    id: '1',
    title: 'Commercial Building Electrical Upgrade',
    description: 'Looking for a licensed electrician to upgrade the electrical system in our 30,000 sq ft commercial building. Need new panel installation, LED lighting conversion, and EV charging station setup.',
    category: 'Electrical',
    budget: { min: 50000, max: 80000 },
    deadline: '2024-03-15',
    location: 'San Antonio, TX',
    client: {
      name: 'Downtown Properties LLC',
      verified: true,
      projectsPosted: 12,
      hireRate: 85,
    },
    requirements: [
      'Licensed Electrician',
      'Commercial Experience',
      'Insurance Required',
      'Minimum 5 years experience',
    ],
    attachments: 2,
    proposalCount: 8,
    status: 'open',
    postedAt: '2024-01-20',
  },
  {
    id: '2',
    title: 'Industrial HVAC System Design',
    description: 'Need a mechanical engineer to design an HVAC system for our new manufacturing facility. Must include air filtration for clean room requirements.',
    category: 'HVAC',
    budget: { min: 25000, max: 40000 },
    deadline: '2024-02-28',
    location: 'Austin, TX',
    client: {
      name: 'TechMfg Inc',
      verified: true,
      projectsPosted: 5,
      hireRate: 90,
    },
    requirements: [
      'PE License Preferred',
      'Clean Room Experience',
      'AutoCAD/Revit Skills',
    ],
    attachments: 4,
    proposalCount: 5,
    status: 'open',
    postedAt: '2024-01-18',
  },
  {
    id: '3',
    title: 'Custom Machinery Fabrication',
    description: 'Seeking experienced machinist for custom parts fabrication. Project involves precision CNC machining for automotive performance parts.',
    category: 'Machining',
    budget: { min: 15000, max: 25000 },
    deadline: '2024-02-15',
    location: 'Houston, TX',
    client: {
      name: 'Performance Auto Co',
      verified: false,
      projectsPosted: 3,
      hireRate: 100,
    },
    requirements: [
      'CNC Experience',
      'Precision Tolerances',
      'Quality Certification',
    ],
    attachments: 6,
    proposalCount: 12,
    status: 'open',
    postedAt: '2024-01-15',
  },
]

export default function ProjectsPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [profile, setProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [projects, setProjects] = useState(mockProjectRequests)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterCategory, setFilterCategory] = useState('all')
  const [selectedProject, setSelectedProject] = useState<any>(null)

  useEffect(() => {
    async function loadUser() {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        router.push('/login')
        return
      }

      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

      setUser(user)
      setProfile(profile)
      setLoading(false)
    }

    loadUser()
  }, [router])

  const filteredProjects = projects.filter(project => {
    const matchesSearch = 
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesCategory = filterCategory === 'all' || project.category === filterCategory
    
    return matchesSearch && matchesCategory
  })

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Project Requests</h1>
            <p className="mt-1 text-gray-600">Browse and bid on projects from clients</p>
          </div>
          {profile?.user_type === 'client' && (
            <Link
              href="/projects/new"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              + Post a Project
            </Link>
          )}
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Categories</option>
              <option value="Electrical">Electrical</option>
              <option value="HVAC">HVAC</option>
              <option value="Plumbing">Plumbing</option>
              <option value="Machining">Machining</option>
              <option value="Welding">Welding</option>
              <option value="Carpentry">Carpentry</option>
            </select>
          </div>
        </div>

        {/* Projects List */}
        <div className="space-y-6">
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                        {project.category}
                      </span>
                      <span className="text-sm text-gray-500">
                        Posted {new Date(project.postedAt).toLocaleDateString()}
                      </span>
                    </div>
                    <h2 className="text-xl font-bold text-gray-900 mb-2">{project.title}</h2>
                    <p className="text-gray-600 line-clamp-2">{project.description}</p>
                  </div>
                  <div className="text-right ml-6">
                    <p className="text-2xl font-bold text-green-600">
                      ${project.budget.min.toLocaleString()} - ${project.budget.max.toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-500">Budget</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 mb-4 text-sm text-gray-600">
                  <span className="flex items-center gap-1">
                    📍 {project.location}
                  </span>
                  <span className="flex items-center gap-1">
                    📅 Due: {new Date(project.deadline).toLocaleDateString()}
                  </span>
                  <span className="flex items-center gap-1">
                    📎 {project.attachments} attachments
                  </span>
                  <span className="flex items-center gap-1">
                    📝 {project.proposalCount} proposals
                  </span>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                      {project.client.name.charAt(0)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-gray-900">{project.client.name}</span>
                        {project.client.verified && (
                          <span className="text-blue-500">✓</span>
                        )}
                      </div>
                      <p className="text-sm text-gray-500">
                        {project.client.projectsPosted} projects • {project.client.hireRate}% hire rate
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="text-blue-600 border border-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors"
                    >
                      View Details
                    </button>
                    {profile?.user_type === 'engineer' && (
                      <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                        Submit Proposal
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </main>

      {/* Project Details Modal */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-start">
                <div>
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                    {selectedProject.category}
                  </span>
                  <h2 className="text-2xl font-bold text-gray-900 mt-2">{selectedProject.title}</h2>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Budget & Deadline */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-green-50 rounded-lg p-4">
                  <p className="text-sm text-gray-500">Budget</p>
                  <p className="text-2xl font-bold text-green-600">
                    ${selectedProject.budget.min.toLocaleString()} - ${selectedProject.budget.max.toLocaleString()}
                  </p>
                </div>
                <div className="bg-blue-50 rounded-lg p-4">
                  <p className="text-sm text-gray-500">Deadline</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {new Date(selectedProject.deadline).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {/* Description */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Project Description</h3>
                <p className="text-gray-600">{selectedProject.description}</p>
              </div>

              {/* Requirements */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Requirements</h3>
                <ul className="space-y-2">
                  {selectedProject.requirements.map((req: string, index: number) => (
                    <li key={index} className="flex items-center gap-2 text-gray-600">
                      <span className="text-green-500">✓</span>
                      {req}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Client Info */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-3">About the Client</h3>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-xl">
                    {selectedProject.client.name.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-gray-900">{selectedProject.client.name}</span>
                      {selectedProject.client.verified && (
                        <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">Verified</span>
                      )}
                    </div>
                    <p className="text-sm text-gray-500">
                      {selectedProject.client.projectsPosted} projects posted • {selectedProject.client.hireRate}% hire rate
                    </p>
                  </div>
                </div>
              </div>

              {/* Actions */}
              {profile?.user_type === 'engineer' && (
                <div className="flex gap-4 pt-4">
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <Link
                    href={`/projects/${selectedProject.id}/proposal`}
                    className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors text-center"
                  >
                    Submit Proposal
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
      
      <Footer />
    </div>
  )
}
