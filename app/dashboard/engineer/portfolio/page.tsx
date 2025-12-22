'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import Navigation from '@/app/components/Navigation'
import Footer from '@/app/components/Footer'
import { createClient } from '@/lib/supabase/client'

// Mock portfolio projects
const mockProjects = [
  {
    id: '1',
    title: 'Commercial Building Electrical Renovation',
    description: 'Complete electrical system upgrade for a 50,000 sq ft commercial building including panel replacement, LED lighting conversion, and EV charging stations.',
    images: ['/portfolio/project1-1.jpg', '/portfolio/project1-2.jpg', '/portfolio/project1-3.jpg'],
    category: 'Electrical',
    client: 'Downtown Commercial Properties',
    completionDate: '2024-01-15',
    budget: '$125,000',
    duration: '3 months',
    tags: ['Commercial', 'Renovation', 'LED', 'EV Charging'],
    featured: true,
  },
  {
    id: '2',
    title: 'Industrial HVAC System Installation',
    description: 'Design and installation of a comprehensive HVAC system for a manufacturing facility with precision climate control requirements.',
    images: ['/portfolio/project2-1.jpg', '/portfolio/project2-2.jpg'],
    category: 'HVAC',
    client: 'Tech Manufacturing Inc',
    completionDate: '2023-11-20',
    budget: '$85,000',
    duration: '2 months',
    tags: ['Industrial', 'HVAC', 'Climate Control'],
    featured: true,
  },
  {
    id: '3',
    title: 'Residential Solar Panel System',
    description: 'Custom designed and installed 15kW solar panel system with battery storage for complete energy independence.',
    images: ['/portfolio/project3-1.jpg'],
    category: 'Solar',
    client: 'Private Residence',
    completionDate: '2023-09-10',
    budget: '$45,000',
    duration: '2 weeks',
    tags: ['Residential', 'Solar', 'Renewable Energy'],
    featured: false,
  },
]

export default function PortfolioManagementPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [profile, setProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [projects, setProjects] = useState(mockProjects)
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingProject, setEditingProject] = useState<any>(null)

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

      if (profile?.user_type !== 'engineer') {
        router.push('/dashboard/client')
        return
      }

      setUser(user)
      setProfile(profile)
      setLoading(false)
    }

    loadUser()
  }, [router])

  const deleteProject = (projectId: string) => {
    if (confirm('Are you sure you want to delete this project?')) {
      setProjects(projects.filter(p => p.id !== projectId))
    }
  }

  const toggleFeatured = (projectId: string) => {
    setProjects(projects.map(p => 
      p.id === projectId ? { ...p, featured: !p.featured } : p
    ))
  }

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
            <h1 className="text-3xl font-bold text-gray-900">Portfolio</h1>
            <p className="mt-1 text-gray-600">Showcase your best work to attract more clients</p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            + Add Project
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <p className="text-sm text-gray-500">Total Projects</p>
            <p className="text-3xl font-bold text-gray-900">{projects.length}</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6">
            <p className="text-sm text-gray-500">Featured</p>
            <p className="text-3xl font-bold text-yellow-500">{projects.filter(p => p.featured).length}</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6">
            <p className="text-sm text-gray-500">Categories</p>
            <p className="text-3xl font-bold text-blue-600">{new Set(projects.map(p => p.category)).size}</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6">
            <p className="text-sm text-gray-500">Profile Views</p>
            <p className="text-3xl font-bold text-green-600">1,234</p>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-sm overflow-hidden"
            >
              {/* Project Image */}
              <div className="h-48 bg-gray-200 relative">
                {project.featured && (
                  <span className="absolute top-2 left-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded-full">
                    ⭐ Featured
                  </span>
                )}
                <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                  📷 Project Image
                </div>
              </div>

              {/* Project Details */}
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 text-lg mb-2">{project.title}</h3>
                <p className="text-sm text-gray-500 line-clamp-2 mb-4">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                    {project.category}
                  </span>
                  <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                    {project.duration}
                  </span>
                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                    {project.budget}
                  </span>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => setEditingProject(project)}
                    className="flex-1 text-blue-600 border border-blue-600 px-3 py-2 rounded-lg hover:bg-blue-50 transition-colors text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => toggleFeatured(project.id)}
                    className={`flex-1 px-3 py-2 rounded-lg text-sm transition-colors ${
                      project.featured 
                        ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200' 
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {project.featured ? 'Unfeature' : 'Feature'}
                  </button>
                  <button
                    onClick={() => deleteProject(project.id)}
                    className="text-red-600 border border-red-600 px-3 py-2 rounded-lg hover:bg-red-50 transition-colors text-sm"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Add Project Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={() => setShowAddModal(true)}
            className="bg-white rounded-xl shadow-sm border-2 border-dashed border-gray-300 flex items-center justify-center min-h-[350px] cursor-pointer hover:border-blue-500 hover:bg-blue-50/50 transition-colors"
          >
            <div className="text-center">
              <div className="text-4xl mb-2">➕</div>
              <p className="text-gray-600 font-medium">Add New Project</p>
              <p className="text-sm text-gray-400">Showcase your work</p>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Add/Edit Project Modal */}
      {(showAddModal || editingProject) && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-900">
                  {editingProject ? 'Edit Project' : 'Add New Project'}
                </h2>
                <button
                  onClick={() => {
                    setShowAddModal(false)
                    setEditingProject(null)
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
            </div>

            <form className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Project Title</label>
                <input
                  type="text"
                  defaultValue={editingProject?.title || ''}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., Commercial Building Electrical Renovation"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  rows={4}
                  defaultValue={editingProject?.description || ''}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Describe the project, challenges, and solutions..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select
                    defaultValue={editingProject?.category || ''}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select category</option>
                    <option value="Electrical">Electrical</option>
                    <option value="HVAC">HVAC</option>
                    <option value="Plumbing">Plumbing</option>
                    <option value="Solar">Solar</option>
                    <option value="Machining">Machining</option>
                    <option value="Welding">Welding</option>
                    <option value="Carpentry">Carpentry</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Client Name</label>
                  <input
                    type="text"
                    defaultValue={editingProject?.client || ''}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g., ABC Corporation"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Budget</label>
                  <input
                    type="text"
                    defaultValue={editingProject?.budget || ''}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g., $50,000"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                  <input
                    type="text"
                    defaultValue={editingProject?.duration || ''}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g., 3 months"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Completion Date</label>
                  <input
                    type="date"
                    defaultValue={editingProject?.completionDate || ''}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Project Images</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 cursor-pointer transition-colors">
                  <div className="text-4xl mb-2">📷</div>
                  <p className="text-gray-600">Click or drag images to upload</p>
                  <p className="text-sm text-gray-400">PNG, JPG up to 10MB each</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
                <input
                  type="text"
                  defaultValue={editingProject?.tags?.join(', ') || ''}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., Commercial, Renovation, LED (comma separated)"
                />
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddModal(false)
                    setEditingProject(null)
                  }}
                  className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {editingProject ? 'Save Changes' : 'Add Project'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
      
      <Footer />
    </div>
  )
}
