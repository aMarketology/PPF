'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ADMIN_EMAILS } from '@/lib/admin-config'

export default function AdminSettingsPage() {
  const [platformFee, setPlatformFee] = useState('10')
  const [maintenanceMode, setMaintenanceMode] = useState(false)
  const [newUserRegistration, setNewUserRegistration] = useState(true)
  const [emailNotifications, setEmailNotifications] = useState(true)

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-8">Platform Settings</h1>

      <div className="space-y-8">
        {/* General Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-800 rounded-xl"
        >
          <div className="p-6 border-b border-gray-700">
            <h2 className="text-lg font-semibold text-white">General Settings</h2>
          </div>
          <div className="p-6 space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Platform Fee (%)
              </label>
              <input
                type="number"
                value={platformFee}
                onChange={(e) => setPlatformFee(e.target.value)}
                min="0"
                max="100"
                className="w-full max-w-xs bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-sm text-gray-400 mt-1">Transaction fee charged on each order</p>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-gray-300">Maintenance Mode</label>
                <p className="text-sm text-gray-400">Temporarily disable the platform for all users</p>
              </div>
              <button
                onClick={() => setMaintenanceMode(!maintenanceMode)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  maintenanceMode ? 'bg-red-600' : 'bg-gray-600'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    maintenanceMode ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-gray-300">New User Registration</label>
                <p className="text-sm text-gray-400">Allow new users to create accounts</p>
              </div>
              <button
                onClick={() => setNewUserRegistration(!newUserRegistration)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  newUserRegistration ? 'bg-green-600' : 'bg-gray-600'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    newUserRegistration ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-gray-300">Email Notifications</label>
                <p className="text-sm text-gray-400">Send email notifications to users</p>
              </div>
              <button
                onClick={() => setEmailNotifications(!emailNotifications)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  emailNotifications ? 'bg-green-600' : 'bg-gray-600'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    emailNotifications ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Admin Access */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gray-800 rounded-xl"
        >
          <div className="p-6 border-b border-gray-700">
            <h2 className="text-lg font-semibold text-white">Admin Access</h2>
          </div>
          <div className="p-6">
            <p className="text-gray-400 mb-4">
              Users with admin access can manage the platform. Add admin emails in <code className="bg-gray-700 px-2 py-1 rounded text-sm">lib/admin-config.ts</code>
            </p>
            <div className="bg-gray-700 rounded-lg p-4">
              <h3 className="text-sm font-medium text-gray-300 mb-2">Current Admins</h3>
              {ADMIN_EMAILS.length === 0 ? (
                <p className="text-gray-400 text-sm">No admins configured. Add your email to ADMIN_EMAILS in lib/admin-config.ts</p>
              ) : (
                <ul className="space-y-2">
                  {ADMIN_EMAILS.map((email) => (
                    <li key={email} className="flex items-center gap-2 text-white">
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      {email}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </motion.div>

        {/* Danger Zone */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gray-800 rounded-xl border border-red-500/30"
        >
          <div className="p-6 border-b border-gray-700">
            <h2 className="text-lg font-semibold text-red-400">Danger Zone</h2>
          </div>
          <div className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-gray-300">Reset All Statistics</label>
                <p className="text-sm text-gray-400">Clear all analytics and statistics data</p>
              </div>
              <button className="px-4 py-2 bg-red-600/20 text-red-400 rounded-lg hover:bg-red-600/30 transition-colors">
                Reset Stats
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-gray-300">Delete All Test Data</label>
                <p className="text-sm text-gray-400">Remove all mock/test data from the platform</p>
              </div>
              <button className="px-4 py-2 bg-red-600/20 text-red-400 rounded-lg hover:bg-red-600/30 transition-colors">
                Delete Test Data
              </button>
            </div>
          </div>
        </motion.div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium">
            Save Settings
          </button>
        </div>
      </div>
    </div>
  )
}
