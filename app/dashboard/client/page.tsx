'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Navigation from '@/app/components/Navigation'
import Footer from '@/app/components/Footer'
import { createClient } from '@/lib/supabase/client'

// Mock data for demo purposes - will be replaced with real Supabase data
const mockOrders = [
  { id: '1', title: 'Electrical Panel Upgrade', engineer: 'ElectricDisk Inc', status: 'in_progress', amount: 2500, date: '2024-01-15', deliveryDate: '2024-01-25' },
  { id: '2', title: 'HVAC System Design', engineer: 'CoolAir Specialists', status: 'pending', amount: 4200, date: '2024-01-18', deliveryDate: '2024-02-01' },
  { id: '3', title: 'Plumbing Renovation Plan', engineer: 'MCG Plumbing LLC', status: 'completed', amount: 1800, date: '2024-01-05', deliveryDate: '2024-01-12' },
  { id: '4', title: 'Structural Analysis', engineer: 'Steel Builders Co', status: 'completed', amount: 3500, date: '2023-12-20', deliveryDate: '2023-12-30' },
]

const mockSavedServices = [
  { id: '1', title: 'Commercial Electrical Design', provider: 'ElectricDisk Inc', price: 2500, rating: 4.9 },
  { id: '2', title: 'Industrial Plumbing Design', provider: 'MCG Plumbing LLC', price: 3200, rating: 4.8 },
  { id: '3', title: 'Custom CNC Machining', provider: 'Allens Performance Machine', price: 1500, rating: 5.0 },
]

const mockProjectRequests = [
  { id: '1', title: 'Office Building Electrical Overhaul', budget: '$15,000-$25,000', proposals: 5, deadline: '2024-02-01', status: 'active' },
  { id: '2', title: 'Factory HVAC System', budget: '$30,000-$50,000', proposals: 3, deadline: '2024-02-15', status: 'active' },
]

export default function ClientDashboard() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [profile, setProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'overview' | 'orders' | 'projects' | 'saved' | 'messages'>('overview')

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

      if (profile?.user_type === 'engineer') {
        router.push('/dashboard/engineer')
        return
      }

      setUser(user)
      setProfile(profile)
      setLoading(false)
    }

    loadUser()
  }, [router])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  const stats = {
    totalSpent: 12000,
    activeOrders: 2,
    completedOrders: 8,
    savedServices: mockSavedServices.length,
    unreadMessages: 3,
    activeProjects: mockProjectRequests.length,
  }

  const statusColors: Record<string, string> = {
    pending: 'bg-yellow-100 text-yellow-800',
    in_progress: 'bg-blue-100 text-blue-800',
    completed: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800',
    active: 'bg-green-100 text-green-800',
    closed: 'bg-gray-100 text-gray-800',
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Client Dashboard</h1>
            <p className="mt-1 text-gray-600">Welcome back, {profile?.full_name || 'Client'}!</p>
          </div>
          <Link
            href="/marketplace"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Browse Services
          </Link>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="-mb-px flex space-x-8">
            {['overview', 'orders', 'projects', 'saved', 'messages'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`py-4 px-1 border-b-2 font-medium text-sm capitalize transition-colors ${
                  activeTab === tab
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab}
                {tab === 'messages' && stats.unreadMessages > 0 && (
                  <span className="ml-2 bg-red-500 text-white text-xs rounded-full px-2 py-0.5">
                    {stats.unreadMessages}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Total Spent</p>
                    <p className="text-3xl font-bold text-gray-900">${stats.totalSpent.toLocaleString()}</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-2xl">💳</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Active Orders</p>
                    <p className="text-3xl font-bold text-gray-900">{stats.activeOrders}</p>
                  </div>
                  <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                    <span className="text-2xl">📦</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Completed Orders</p>
                    <p className="text-3xl font-bold text-gray-900">{stats.completedOrders}</p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-2xl">✅</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Active Projects</p>
                    <p className="text-3xl font-bold text-gray-900">{stats.activeProjects}</p>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <span className="text-2xl">📋</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Recent Orders */}
              <div className="bg-white rounded-xl shadow-sm">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900">Recent Orders</h2>
                </div>
                <div className="divide-y divide-gray-200">
                  {mockOrders.slice(0, 4).map((order) => (
                    <div key={order.id} className="p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900">{order.title}</p>
                          <p className="text-sm text-gray-500">{order.engineer}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">${order.amount.toLocaleString()}</p>
                          <span className={`inline-flex px-2 py-1 text-xs rounded-full ${statusColors[order.status]}`}>
                            {order.status.replace('_', ' ')}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-4 border-t border-gray-200">
                  <button 
                    onClick={() => setActiveTab('orders')}
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                  >
                    View all orders →
                  </button>
                </div>
              </div>

              {/* Active Project Requests */}
              <div className="bg-white rounded-xl shadow-sm">
                <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                  <h2 className="text-lg font-semibold text-gray-900">Project Requests</h2>
                  <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                    + New Request
                  </button>
                </div>
                <div className="divide-y divide-gray-200">
                  {mockProjectRequests.map((project) => (
                    <div key={project.id} className="p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900">{project.title}</p>
                          <p className="text-sm text-gray-500">Budget: {project.budget}</p>
                          <p className="text-xs text-gray-400">Deadline: {project.deadline}</p>
                        </div>
                        <div className="text-right">
                          <span className={`inline-flex px-2 py-1 text-xs rounded-full ${statusColors[project.status]}`}>
                            {project.proposals} proposals
                          </span>
                          <button className="block mt-2 text-blue-600 hover:text-blue-700 text-sm">
                            Review →
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-4 border-t border-gray-200">
                  <button 
                    onClick={() => setActiveTab('projects')}
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                  >
                    View all projects →
                  </button>
                </div>
              </div>
            </div>

            {/* Saved Services */}
            <div className="bg-white rounded-xl shadow-sm">
              <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-900">Saved Services</h2>
                <button 
                  onClick={() => setActiveTab('saved')}
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  View all →
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6">
                {mockSavedServices.map((service) => (
                  <div key={service.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <h3 className="font-semibold text-gray-900">{service.title}</h3>
                    <p className="text-sm text-gray-500">{service.provider}</p>
                    <div className="flex justify-between items-center mt-3">
                      <span className="font-semibold text-blue-600">${service.price}</span>
                      <span className="text-sm text-gray-500">{service.rating} ⭐</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">All Orders</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Engineer</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Delivery Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {mockOrders.map((order) => (
                      <tr key={order.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="font-medium text-gray-900">{order.title}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.engineer}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.date}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.deliveryDate}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${order.amount.toLocaleString()}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs rounded-full ${statusColors[order.status]}`}>
                            {order.status.replace('_', ' ')}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <button className="text-blue-600 hover:text-blue-700">View Details</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        {/* Projects Tab */}
        {activeTab === 'projects' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-gray-900">My Project Requests</h2>
              <Link 
                href="/projects/new"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                + Post New Project
              </Link>
            </div>
            <div className="space-y-4">
              {mockProjectRequests.map((project) => (
                <div key={project.id} className="bg-white rounded-xl shadow-sm p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-gray-900 text-lg">{project.title}</h3>
                      <div className="flex gap-4 mt-2">
                        <span className="text-sm text-gray-600">💰 Budget: {project.budget}</span>
                        <span className="text-sm text-gray-600">📅 Deadline: {project.deadline}</span>
                      </div>
                    </div>
                    <span className={`inline-flex px-3 py-1 text-sm rounded-full ${statusColors[project.status]}`}>
                      {project.status}
                    </span>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                        {project.proposals} proposals received
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <button className="text-blue-600 border border-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors text-sm">
                        Edit
                      </button>
                      <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm">
                        View Proposals
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Saved Tab */}
        {activeTab === 'saved' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Saved Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockSavedServices.map((service) => (
                <div key={service.id} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
                  <h3 className="font-semibold text-gray-900 text-lg">{service.title}</h3>
                  <p className="text-gray-500 mt-1">{service.provider}</p>
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-2xl font-bold text-blue-600">${service.price}</span>
                    <span className="text-gray-500">{service.rating} ⭐</span>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <button className="flex-1 text-red-600 border border-red-600 px-3 py-2 rounded-lg hover:bg-red-50 transition-colors text-sm">
                      Remove
                    </button>
                    <button className="flex-1 bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm">
                      View Service
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Messages Tab */}
        {activeTab === 'messages' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="bg-white rounded-xl shadow-sm">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Messages</h2>
              </div>
              <div className="divide-y divide-gray-200">
                {[
                  { id: '1', from: 'ElectricDisk Inc', message: 'Your order has been updated. Please review the changes.', time: '2 hours ago', unread: true },
                  { id: '2', from: 'MCG Plumbing LLC', message: 'Thank you for your order! We will start work tomorrow.', time: '1 day ago', unread: true },
                  { id: '3', from: 'Allens Performance Machine', message: 'Your project has been completed. Please review and approve.', time: '3 days ago', unread: true },
                  { id: '4', from: 'Support Team', message: 'Welcome to Precision Project Flow! Let us know if you have any questions.', time: '1 week ago', unread: false },
                ].map((msg) => (
                  <div key={msg.id} className={`p-4 hover:bg-gray-50 transition-colors cursor-pointer ${msg.unread ? 'bg-blue-50' : ''}`}>
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 font-semibold">
                        {msg.from.charAt(0)}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <h3 className={`font-medium ${msg.unread ? 'text-gray-900' : 'text-gray-600'}`}>{msg.from}</h3>
                          <span className="text-xs text-gray-500">{msg.time}</span>
                        </div>
                        <p className={`text-sm mt-1 ${msg.unread ? 'text-gray-700' : 'text-gray-500'}`}>{msg.message}</p>
                      </div>
                      {msg.unread && (
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </main>
      
      <Footer />
    </div>
  )
}
