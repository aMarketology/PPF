'use client'

import { useState, useEffect, use } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import Navigation from '@/app/components/Navigation'
import Footer from '@/app/components/Footer'
import { createClient } from '@/lib/supabase/client'

// Mock project data
const mockProject = {
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
  },
}

export default function ProposalPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params)
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [profile, setProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  const [formData, setFormData] = useState({
    bidAmount: '',
    deliveryTime: '',
    coverLetter: '',
    milestones: [{ title: '', amount: '', description: '' }],
  })

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
        router.push('/projects')
        return
      }

      setUser(user)
      setProfile(profile)
      setLoading(false)
    }

    loadUser()
  }, [router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    // Simulate submission
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    alert('Proposal submitted successfully! The client will review and respond.')
    router.push('/projects')
  }

  const addMilestone = () => {
    setFormData({
      ...formData,
      milestones: [...formData.milestones, { title: '', amount: '', description: '' }]
    })
  }

  const updateMilestone = (index: number, field: string, value: string) => {
    const newMilestones = [...formData.milestones]
    newMilestones[index] = { ...newMilestones[index], [field]: value }
    setFormData({ ...formData, milestones: newMilestones })
  }

  const removeMilestone = (index: number) => {
    setFormData({
      ...formData,
      milestones: formData.milestones.filter((_, i) => i !== index)
    })
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
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Submit Proposal</h1>
            <p className="mt-1 text-gray-600">for: {mockProject.title}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Your Bid</h2>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Bid Amount *
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-2.5 text-gray-500">$</span>
                        <input
                          type="number"
                          required
                          min="0"
                          value={formData.bidAmount}
                          onChange={(e) => setFormData({ ...formData, bidAmount: e.target.value })}
                          className="w-full border border-gray-300 rounded-lg pl-7 pr-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="65,000"
                        />
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        Client budget: ${mockProject.budget.min.toLocaleString()} - ${mockProject.budget.max.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Delivery Time *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.deliveryTime}
                        onChange={(e) => setFormData({ ...formData, deliveryTime: e.target.value })}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="e.g., 6 weeks"
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Cover Letter</h2>
                  
                  <textarea
                    required
                    rows={8}
                    value={formData.coverLetter}
                    onChange={(e) => setFormData({ ...formData, coverLetter: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Introduce yourself and explain why you're the best fit for this project. Include relevant experience, approach, and what makes you stand out..."
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Tip: Be specific about your relevant experience and how you'll approach this project
                  </p>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold text-gray-900">Milestones</h2>
                    <button
                      type="button"
                      onClick={addMilestone}
                      className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                    >
                      + Add Milestone
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    {formData.milestones.map((milestone, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex justify-between items-center mb-3">
                          <span className="font-medium text-gray-700">Milestone {index + 1}</span>
                          {formData.milestones.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeMilestone(index)}
                              className="text-red-500 hover:text-red-600 text-sm"
                            >
                              Remove
                            </button>
                          )}
                        </div>
                        <div className="grid grid-cols-2 gap-3 mb-3">
                          <input
                            type="text"
                            value={milestone.title}
                            onChange={(e) => updateMilestone(index, 'title', e.target.value)}
                            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Milestone title"
                          />
                          <div className="relative">
                            <span className="absolute left-3 top-2.5 text-gray-500">$</span>
                            <input
                              type="number"
                              value={milestone.amount}
                              onChange={(e) => updateMilestone(index, 'amount', e.target.value)}
                              className="w-full border border-gray-300 rounded-lg pl-7 pr-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              placeholder="Amount"
                            />
                          </div>
                        </div>
                        <textarea
                          rows={2}
                          value={milestone.description}
                          onChange={(e) => updateMilestone(index, 'description', e.target.value)}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="What will be delivered in this milestone?"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Attachments</h2>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 cursor-pointer transition-colors">
                    <div className="text-3xl mb-2">📎</div>
                    <p className="text-gray-600 text-sm">Attach relevant documents, samples, or certifications</p>
                    <p className="text-xs text-gray-400">PDF, DOC, Images up to 25MB each</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => router.back()}
                    className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {submitting ? 'Submitting...' : 'Submit Proposal'}
                  </button>
                </div>
              </form>
            </div>

            {/* Project Summary Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Project Summary</h2>
                
                <div className="space-y-4">
                  <div>
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                      {mockProject.category}
                    </span>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Budget</p>
                    <p className="font-semibold text-green-600">
                      ${mockProject.budget.min.toLocaleString()} - ${mockProject.budget.max.toLocaleString()}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Deadline</p>
                    <p className="font-medium text-gray-900">
                      {new Date(mockProject.deadline).toLocaleDateString()}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Location</p>
                    <p className="font-medium text-gray-900">{mockProject.location}</p>
                  </div>

                  <hr />

                  <div>
                    <p className="text-sm text-gray-500">Client</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="font-medium text-gray-900">{mockProject.client.name}</span>
                      {mockProject.client.verified && (
                        <span className="text-blue-500">✓</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </main>
      
      <Footer />
    </div>
  )
}
