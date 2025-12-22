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
  { id: '1', title: 'Electrical Panel Upgrade', client: 'John Smith', status: 'in_progress', amount: 2500, date: '2024-01-15' },
  { id: '2', title: 'Industrial Wiring Design', client: 'ABC Manufacturing', status: 'pending', amount: 4200, date: '2024-01-18' },
  { id: '3', title: 'Solar Integration Plan', client: 'Green Home LLC', status: 'completed', amount: 3800, date: '2024-01-10' },
  { id: '4', title: 'Commercial HVAC Controls', client: 'Office Park Inc', status: 'completed', amount: 5600, date: '2024-01-05' },
]

const mockServices = [
  { id: '1', title: 'Electrical Panel Design', price: 1500, orders: 12, rating: 4.9, active: true },
  { id: '2', title: 'Industrial Automation', price: 3500, orders: 8, rating: 4.8, active: true },
  { id: '3', title: 'Solar System Design', price: 2200, orders: 15, rating: 5.0, active: true },
  { id: '4', title: 'Load Analysis', price: 800, orders: 22, rating: 4.7, active: false },
]

const mockProposals = [
  { id: '1', projectTitle: 'Factory Electrical Overhaul', client: 'Steel Works Inc', budget: '$15,000-$25,000', deadline: '2024-02-01', status: 'pending' },
  { id: '2', projectTitle: 'Office Building Wiring', client: 'Downtown Properties', budget: '$8,000-$12,000', deadline: '2024-02-10', status: 'submitted' },
]

export default function EngineerDashboard() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [profile, setProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'overview' | 'orders' | 'services' | 'proposals' | 'earnings'>('overview')

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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  const stats = {
    totalEarnings: 42500,
    pendingAmount: 6700,
    ordersCompleted: 45,
    activeOrders: 3,
    averageRating: 4.9,
    responseRate: 98,
  }

  const statusColors: Record<string, string> = {
    pending: 'bg-yellow-100 text-yellow-800',
    in_progress: 'bg-blue-100 text-blue-800',
    completed: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800',
    submitted: 'bg-purple-100 text-purple-800',
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Engineer Dashboard</h1>
          <p className="mt-1 text-gray-600">Welcome back, {profile?.full_name || 'Engineer'}!</p>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="-mb-px flex space-x-8">
            {['overview', 'orders', 'services', 'proposals', 'earnings'].map((tab) => (
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Total Earnings</p>
                    <p className="text-3xl font-bold text-gray-900">${stats.totalEarnings.toLocaleString()}</p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-2xl">💰</span>
                  </div>
                </div>
                <p className="mt-2 text-sm text-green-600">+12% from last month</p>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Pending Amount</p>
                    <p className="text-3xl font-bold text-gray-900">${stats.pendingAmount.toLocaleString()}</p>
                  </div>
                  <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                    <span className="text-2xl">⏳</span>
                  </div>
                </div>
                <p className="mt-2 text-sm text-gray-500">{mockOrders.filter(o => o.status !== 'completed').length} orders in progress</p>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Orders Completed</p>
                    <p className="text-3xl font-bold text-gray-900">{stats.ordersCompleted}</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-2xl">✅</span>
                  </div>
                </div>
                <p className="mt-2 text-sm text-gray-500">{stats.activeOrders} active orders</p>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Average Rating</p>
                    <p className="text-3xl font-bold text-gray-900">{stats.averageRating} ⭐</p>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <span className="text-2xl">🏆</span>
                  </div>
                </div>
                <p className="mt-2 text-sm text-gray-500">Based on 87 reviews</p>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Response Rate</p>
                    <p className="text-3xl font-bold text-gray-900">{stats.responseRate}%</p>
                  </div>
                  <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                    <span className="text-2xl">💬</span>
                  </div>
                </div>
                <p className="mt-2 text-sm text-green-600">Excellent response time</p>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Active Services</p>
                    <p className="text-3xl font-bold text-gray-900">{mockServices.filter(s => s.active).length}</p>
                  </div>
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                    <span className="text-2xl">🛠️</span>
                  </div>
                </div>
                <Link href="/dashboard/engineer?tab=services" className="mt-2 text-sm text-blue-600 hover:underline">Manage services →</Link>
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
                          <p className="text-sm text-gray-500">{order.client}</p>
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

              {/* New Project Requests */}
              <div className="bg-white rounded-xl shadow-sm">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900">New Project Requests</h2>
                </div>
                <div className="divide-y divide-gray-200">
                  {mockProposals.map((proposal) => (
                    <div key={proposal.id} className="p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900">{proposal.projectTitle}</p>
                          <p className="text-sm text-gray-500">{proposal.client}</p>
                          <p className="text-sm text-gray-400">Budget: {proposal.budget}</p>
                        </div>
                        <div className="text-right">
                          <span className={`inline-flex px-2 py-1 text-xs rounded-full ${statusColors[proposal.status]}`}>
                            {proposal.status}
                          </span>
                          <p className="text-xs text-gray-500 mt-1">Due: {proposal.deadline}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-4 border-t border-gray-200">
                  <button 
                    onClick={() => setActiveTab('proposals')}
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                  >
                    View all proposals →
                  </button>
                </div>
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
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
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
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.client}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.date}</td>
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

        {/* Services Tab */}
        {activeTab === 'services' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-gray-900">My Services</h2>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                + Add New Service
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {mockServices.map((service) => (
                <div key={service.id} className={`bg-white rounded-xl shadow-sm p-6 ${!service.active && 'opacity-60'}`}>
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-semibold text-gray-900">{service.title}</h3>
                    <span className={`px-2 py-1 text-xs rounded-full ${service.active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}`}>
                      {service.active ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-500">Price</p>
                      <p className="font-semibold">${service.price}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Orders</p>
                      <p className="font-semibold">{service.orders}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Rating</p>
                      <p className="font-semibold">{service.rating} ⭐</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="flex-1 text-blue-600 border border-blue-600 px-3 py-2 rounded-lg hover:bg-blue-50 transition-colors text-sm">
                      Edit
                    </button>
                    <button className={`flex-1 px-3 py-2 rounded-lg text-sm ${service.active ? 'text-red-600 border border-red-600 hover:bg-red-50' : 'text-green-600 border border-green-600 hover:bg-green-50'}`}>
                      {service.active ? 'Deactivate' : 'Activate'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Proposals Tab */}
        {activeTab === 'proposals' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Project Proposals</h2>
                <p className="text-sm text-gray-500 mt-1">Review and respond to project requests from clients</p>
              </div>
              <div className="divide-y divide-gray-200">
                {mockProposals.map((proposal) => (
                  <div key={proposal.id} className="p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{proposal.projectTitle}</h3>
                        <p className="text-sm text-gray-500 mt-1">Client: {proposal.client}</p>
                        <div className="flex gap-4 mt-2">
                          <span className="text-sm text-gray-600">💰 {proposal.budget}</span>
                          <span className="text-sm text-gray-600">📅 Deadline: {proposal.deadline}</span>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <span className={`inline-flex px-2 py-1 text-xs rounded-full ${statusColors[proposal.status]}`}>
                          {proposal.status}
                        </span>
                        {proposal.status === 'pending' && (
                          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm">
                            Submit Proposal
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Earnings Tab */}
        {activeTab === 'earnings' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <p className="text-sm text-gray-500">Available Balance</p>
                <p className="text-3xl font-bold text-gray-900">$8,450</p>
                <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  Withdraw Funds
                </button>
              </div>
              <div className="bg-white rounded-xl shadow-sm p-6">
                <p className="text-sm text-gray-500">Pending Clearance</p>
                <p className="text-3xl font-bold text-gray-900">$6,700</p>
                <p className="mt-4 text-sm text-gray-500">Expected in 7-14 days</p>
              </div>
              <div className="bg-white rounded-xl shadow-sm p-6">
                <p className="text-sm text-gray-500">Total Withdrawn</p>
                <p className="text-3xl font-bold text-gray-900">$27,350</p>
                <p className="mt-4 text-sm text-gray-500">Lifetime withdrawals</p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Recent Transactions</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Order #1234 - Commercial HVAC Controls</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Jan 15, 2024</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">Payment</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">+$5,600</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Withdrawal to Bank ****4521</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Jan 10, 2024</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">Withdrawal</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">-$3,500</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Order #1233 - Solar Integration Plan</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Jan 8, 2024</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">Payment</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">+$3,800</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}
      </main>
      
      <Footer />
    </div>
  )
}
