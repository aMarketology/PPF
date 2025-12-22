'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

// Mock orders data
const mockOrders = [
  { id: 'ORD-001', service: 'Electrical Panel Design', client: 'John Smith', engineer: 'ElectricDisk Inc', amount: 2500, status: 'completed', date: '2024-01-15' },
  { id: 'ORD-002', service: 'HVAC System Design', client: 'ABC Corp', engineer: 'CoolAir Specialists', amount: 4200, status: 'in_progress', date: '2024-01-18' },
  { id: 'ORD-003', service: 'Plumbing Design', client: 'Home Builders LLC', engineer: 'MCG Plumbing', amount: 1800, status: 'pending', date: '2024-01-20' },
  { id: 'ORD-004', service: 'Solar Installation Plan', client: 'Green Energy Inc', engineer: 'SolarTech Pro', amount: 5500, status: 'completed', date: '2024-01-10' },
  { id: 'ORD-005', service: 'CNC Machining', client: 'Auto Parts Mfg', engineer: 'Allens Performance', amount: 3200, status: 'completed', date: '2024-01-08' },
  { id: 'ORD-006', service: 'Industrial Wiring', client: 'Factory One', engineer: 'ElectricDisk Inc', amount: 8500, status: 'in_progress', date: '2024-01-19' },
  { id: 'ORD-007', service: 'Welding Services', client: 'Steel Works Co', engineer: 'Pro Welders', amount: 2100, status: 'cancelled', date: '2024-01-05' },
]

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState(mockOrders)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.engineer.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = filterStatus === 'all' || order.status === filterStatus
    
    return matchesSearch && matchesStatus
  })

  const totalRevenue = orders.filter(o => o.status === 'completed').reduce((a, o) => a + o.amount, 0)
  const platformFee = Math.round(totalRevenue * 0.1) // 10% platform fee

  const statusColors: Record<string, string> = {
    pending: 'bg-yellow-500/20 text-yellow-400',
    in_progress: 'bg-blue-500/20 text-blue-400',
    completed: 'bg-green-500/20 text-green-400',
    cancelled: 'bg-red-500/20 text-red-400',
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">Order Management</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          Export Orders
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-4 mb-6">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search by order ID, service, client, or engineer..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="in_progress">In Progress</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-5 gap-4 mb-8">
        <div className="bg-gray-800 rounded-lg p-4">
          <p className="text-gray-400 text-sm">Total Orders</p>
          <p className="text-2xl font-bold text-white">{orders.length}</p>
        </div>
        <div className="bg-gray-800 rounded-lg p-4">
          <p className="text-gray-400 text-sm">Pending</p>
          <p className="text-2xl font-bold text-yellow-400">{orders.filter(o => o.status === 'pending').length}</p>
        </div>
        <div className="bg-gray-800 rounded-lg p-4">
          <p className="text-gray-400 text-sm">In Progress</p>
          <p className="text-2xl font-bold text-blue-400">{orders.filter(o => o.status === 'in_progress').length}</p>
        </div>
        <div className="bg-gray-800 rounded-lg p-4">
          <p className="text-gray-400 text-sm">Total Revenue</p>
          <p className="text-2xl font-bold text-green-400">${totalRevenue.toLocaleString()}</p>
        </div>
        <div className="bg-gray-800 rounded-lg p-4">
          <p className="text-gray-400 text-sm">Platform Fee (10%)</p>
          <p className="text-2xl font-bold text-purple-400">${platformFee.toLocaleString()}</p>
        </div>
      </div>

      {/* Orders Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gray-800 rounded-xl overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700">
            <thead className="bg-gray-900">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Order ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Service</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Client</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Engineer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-700/50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-white font-mono">{order.id}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-300">{order.service}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-300">{order.client}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-300">{order.engineer}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-green-400 font-medium">
                    ${order.amount.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs rounded-full ${statusColors[order.status]}`}>
                      {order.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-400">{order.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex gap-2">
                      <button className="text-blue-400 hover:text-blue-300 text-sm">View</button>
                      <button className="text-yellow-400 hover:text-yellow-300 text-sm">Edit</button>
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
