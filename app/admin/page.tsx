'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { createClient } from '@/lib/supabase/client'
import { mockServices, mockCompanies } from '@/lib/mockData'

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalEngineers: 0,
    totalClients: 0,
    totalServices: mockServices.length,
    totalCompanies: mockCompanies.length,
    totalRevenue: 125000,
    pendingOrders: 12,
    completedOrders: 458,
  })

  useEffect(() => {
    async function loadStats() {
      const supabase = createClient()
      
      // Get user counts
      const { count: totalUsers } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })
      
      const { count: totalEngineers } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })
        .eq('user_type', 'engineer')
      
      const { count: totalClients } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })
        .eq('user_type', 'client')

      setStats(prev => ({
        ...prev,
        totalUsers: totalUsers || 0,
        totalEngineers: totalEngineers || 0,
        totalClients: totalClients || 0,
      }))
    }

    loadStats()
  }, [])

  const recentActivity = [
    { type: 'user', action: 'New user registered', user: 'john@example.com', time: '5 minutes ago' },
    { type: 'order', action: 'Order completed', details: 'Order #1234', time: '15 minutes ago' },
    { type: 'service', action: 'New service listed', user: 'ElectricDisk Inc', time: '1 hour ago' },
    { type: 'report', action: 'User reported', details: 'Spam content', time: '2 hours ago' },
    { type: 'payment', action: 'Payment processed', details: '$2,500', time: '3 hours ago' },
  ]

  const activityIcons: Record<string, string> = {
    user: '👤',
    order: '📦',
    service: '🛠️',
    report: '🚨',
    payment: '💰',
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-8">Dashboard Overview</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-800 rounded-xl p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Users</p>
              <p className="text-3xl font-bold text-white">{stats.totalUsers}</p>
            </div>
            <span className="text-4xl">👥</span>
          </div>
          <div className="mt-4 flex gap-4 text-sm">
            <span className="text-blue-400">{stats.totalEngineers} Engineers</span>
            <span className="text-green-400">{stats.totalClients} Clients</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gray-800 rounded-xl p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Companies</p>
              <p className="text-3xl font-bold text-white">{stats.totalCompanies}</p>
            </div>
            <span className="text-4xl">🏢</span>
          </div>
          <div className="mt-4 text-sm text-gray-400">
            {mockCompanies.filter(c => c.claimed).length} claimed profiles
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gray-800 rounded-xl p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Revenue</p>
              <p className="text-3xl font-bold text-white">${stats.totalRevenue.toLocaleString()}</p>
            </div>
            <span className="text-4xl">💰</span>
          </div>
          <div className="mt-4 text-sm text-green-400">
            +12.5% from last month
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gray-800 rounded-xl p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Orders</p>
              <p className="text-3xl font-bold text-white">{stats.completedOrders + stats.pendingOrders}</p>
            </div>
            <span className="text-4xl">📦</span>
          </div>
          <div className="mt-4 flex gap-4 text-sm">
            <span className="text-green-400">{stats.completedOrders} completed</span>
            <span className="text-yellow-400">{stats.pendingOrders} pending</span>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gray-800 rounded-xl"
        >
          <div className="p-6 border-b border-gray-700">
            <h2 className="text-lg font-semibold text-white">Recent Activity</h2>
          </div>
          <div className="divide-y divide-gray-700">
            {recentActivity.map((activity, index) => (
              <div key={index} className="p-4 hover:bg-gray-700/50 transition-colors">
                <div className="flex items-center gap-4">
                  <span className="text-2xl">{activityIcons[activity.type]}</span>
                  <div className="flex-1">
                    <p className="text-white font-medium">{activity.action}</p>
                    <p className="text-sm text-gray-400">{activity.user || activity.details}</p>
                  </div>
                  <span className="text-xs text-gray-500">{activity.time}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gray-800 rounded-xl"
        >
          <div className="p-6 border-b border-gray-700">
            <h2 className="text-lg font-semibold text-white">Quick Actions</h2>
          </div>
          <div className="p-6 grid grid-cols-2 gap-4">
            <button className="flex flex-col items-center justify-center p-6 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors">
              <span className="text-3xl mb-2">👤</span>
              <span className="text-white">Add User</span>
            </button>
            <button className="flex flex-col items-center justify-center p-6 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors">
              <span className="text-3xl mb-2">🏢</span>
              <span className="text-white">Add Company</span>
            </button>
            <button className="flex flex-col items-center justify-center p-6 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors">
              <span className="text-3xl mb-2">📊</span>
              <span className="text-white">View Reports</span>
            </button>
            <button className="flex flex-col items-center justify-center p-6 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors">
              <span className="text-3xl mb-2">⚙️</span>
              <span className="text-white">Settings</span>
            </button>
          </div>
        </motion.div>
      </div>

      {/* Platform Health */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-gray-800 rounded-xl mt-8"
      >
        <div className="p-6 border-b border-gray-700">
          <h2 className="text-lg font-semibold text-white">Platform Health</h2>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-4 gap-6">
          <div>
            <p className="text-gray-400 text-sm">Response Time</p>
            <p className="text-2xl font-bold text-green-400">98ms</p>
            <p className="text-xs text-gray-500">Average</p>
          </div>
          <div>
            <p className="text-gray-400 text-sm">Uptime</p>
            <p className="text-2xl font-bold text-green-400">99.9%</p>
            <p className="text-xs text-gray-500">Last 30 days</p>
          </div>
          <div>
            <p className="text-gray-400 text-sm">Error Rate</p>
            <p className="text-2xl font-bold text-green-400">0.1%</p>
            <p className="text-xs text-gray-500">Last 24 hours</p>
          </div>
          <div>
            <p className="text-gray-400 text-sm">Active Sessions</p>
            <p className="text-2xl font-bold text-blue-400">234</p>
            <p className="text-xs text-gray-500">Current</p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
