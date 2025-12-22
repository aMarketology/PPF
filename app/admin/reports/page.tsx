'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

export default function AdminReportsPage() {
  const [timeRange, setTimeRange] = useState('30d')

  const revenueData = {
    '7d': { total: 12500, growth: 15 },
    '30d': { total: 52000, growth: 22 },
    '90d': { total: 145000, growth: 35 },
    '1y': { total: 520000, growth: 45 },
  }

  const currentData = revenueData[timeRange as keyof typeof revenueData]

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">Reports & Analytics</h1>
        <div className="flex gap-2">
          {['7d', '30d', '90d', '1y'].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                timeRange === range
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-800 rounded-xl p-6"
        >
          <p className="text-gray-400 text-sm">Total Revenue</p>
          <p className="text-3xl font-bold text-white">${currentData.total.toLocaleString()}</p>
          <p className="text-sm text-green-400 mt-2">+{currentData.growth}% vs previous period</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gray-800 rounded-xl p-6"
        >
          <p className="text-gray-400 text-sm">Platform Fees</p>
          <p className="text-3xl font-bold text-white">${Math.round(currentData.total * 0.1).toLocaleString()}</p>
          <p className="text-sm text-gray-400 mt-2">10% transaction fee</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gray-800 rounded-xl p-6"
        >
          <p className="text-gray-400 text-sm">New Users</p>
          <p className="text-3xl font-bold text-white">234</p>
          <p className="text-sm text-green-400 mt-2">+18% vs previous period</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gray-800 rounded-xl p-6"
        >
          <p className="text-gray-400 text-sm">Order Completion Rate</p>
          <p className="text-3xl font-bold text-white">94.5%</p>
          <p className="text-sm text-green-400 mt-2">+2.3% vs previous period</p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Top Performing Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gray-800 rounded-xl"
        >
          <div className="p-6 border-b border-gray-700">
            <h2 className="text-lg font-semibold text-white">Top Performing Categories</h2>
          </div>
          <div className="p-6 space-y-4">
            {[
              { name: 'Electrical Engineering', revenue: 18500, percentage: 35 },
              { name: 'Mechanical Engineering', revenue: 12000, percentage: 23 },
              { name: 'Plumbing Services', revenue: 8500, percentage: 16 },
              { name: 'HVAC Systems', revenue: 7200, percentage: 14 },
              { name: 'Welding & Fabrication', revenue: 6300, percentage: 12 },
            ].map((category, index) => (
              <div key={index}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-300">{category.name}</span>
                  <span className="text-white font-medium">${category.revenue.toLocaleString()}</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-blue-500 h-2 rounded-full" 
                    style={{ width: `${category.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Top Engineers */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gray-800 rounded-xl"
        >
          <div className="p-6 border-b border-gray-700">
            <h2 className="text-lg font-semibold text-white">Top Engineers by Revenue</h2>
          </div>
          <div className="divide-y divide-gray-700">
            {[
              { name: 'ElectricDisk Inc', revenue: 12500, orders: 45 },
              { name: 'MCG Plumbing LLC', revenue: 9800, orders: 38 },
              { name: 'CoolAir Specialists', revenue: 8200, orders: 32 },
              { name: 'Allens Performance', revenue: 7500, orders: 28 },
              { name: 'Pro Welders', revenue: 6100, orders: 24 },
            ].map((engineer, index) => (
              <div key={index} className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                    {index + 1}
                  </div>
                  <div>
                    <p className="text-white font-medium">{engineer.name}</p>
                    <p className="text-sm text-gray-400">{engineer.orders} orders</p>
                  </div>
                </div>
                <div className="text-green-400 font-semibold">${engineer.revenue.toLocaleString()}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Recent Reports */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-gray-800 rounded-xl mt-8"
      >
        <div className="p-6 border-b border-gray-700 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-white">User Reports</h2>
          <button className="text-blue-400 hover:text-blue-300 text-sm">View All</button>
        </div>
        <div className="divide-y divide-gray-700">
          {[
            { type: 'Spam', description: 'Reported user posting spam content', status: 'pending', date: '2024-01-20' },
            { type: 'Fraud', description: 'Suspected fraudulent service listing', status: 'investigating', date: '2024-01-18' },
            { type: 'Quality', description: 'Poor quality work delivered', status: 'resolved', date: '2024-01-15' },
          ].map((report, index) => (
            <div key={index} className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className={`px-2 py-1 text-xs rounded-full ${
                  report.type === 'Spam' ? 'bg-yellow-500/20 text-yellow-400' :
                  report.type === 'Fraud' ? 'bg-red-500/20 text-red-400' :
                  'bg-blue-500/20 text-blue-400'
                }`}>
                  {report.type}
                </span>
                <div>
                  <p className="text-white">{report.description}</p>
                  <p className="text-sm text-gray-400">{report.date}</p>
                </div>
              </div>
              <span className={`px-2 py-1 text-xs rounded-full ${
                report.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                report.status === 'investigating' ? 'bg-blue-500/20 text-blue-400' :
                'bg-green-500/20 text-green-400'
              }`}>
                {report.status}
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
