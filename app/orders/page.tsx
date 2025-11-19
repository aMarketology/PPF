'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { getUser } from '@/app/actions/auth';
import { Package, Clock, CheckCircle, XCircle, Calendar, DollarSign } from 'lucide-react';
import { useRouter } from 'next/navigation';

// Mock orders data - replace with real data from Supabase
const mockOrders = [
  {
    id: '1',
    serviceName: 'CAD Modeling & Design',
    status: 'completed',
    date: '2024-11-15',
    amount: 250,
    engineer: 'John Smith',
    description: 'Custom mechanical part design for manufacturing'
  },
  {
    id: '2',
    serviceName: 'PCB Circuit Design',
    status: 'in_progress',
    date: '2024-11-18',
    amount: 350,
    engineer: 'Sarah Johnson',
    description: 'Custom PCB layout for IoT device'
  },
  {
    id: '3',
    serviceName: 'Structural Analysis',
    status: 'pending',
    date: '2024-11-20',
    amount: 180,
    engineer: 'Mike Chen',
    description: 'FEA analysis for building component'
  },
];

const statusConfig = {
  pending: {
    icon: Clock,
    color: 'text-yellow-600',
    bg: 'bg-yellow-100',
    label: 'Pending'
  },
  in_progress: {
    icon: Package,
    color: 'text-blue-600',
    bg: 'bg-blue-100',
    label: 'In Progress'
  },
  completed: {
    icon: CheckCircle,
    color: 'text-green-600',
    bg: 'bg-green-100',
    label: 'Completed'
  },
  cancelled: {
    icon: XCircle,
    color: 'text-red-600',
    bg: 'bg-red-100',
    label: 'Cancelled'
  }
};

export default function OrdersPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<string>('all');

  useEffect(() => {
    const loadUser = async () => {
      try {
        const userData = await getUser();
        if (!userData) {
          router.push('/login');
          return;
        }
        setUser(userData);
      } catch (error) {
        console.error('Error loading user:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadUser();
  }, [router]);

  if (isLoading) {
    return (
      <>
        <Navigation />
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-slate-50 pt-24 pb-12 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading orders...</p>
          </div>
        </div>
      </>
    );
  }

  if (!user) {
    return null;
  }

  const filteredOrders = activeFilter === 'all' 
    ? mockOrders 
    : mockOrders.filter(order => order.status === activeFilter);

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-slate-50 pt-24 pb-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-4xl font-bold text-gray-900 mb-2">My Orders</h1>
            <p className="text-gray-600">Track and manage your engineering service orders</p>
          </motion.div>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8 flex flex-wrap gap-3"
          >
            {[
              { key: 'all', label: 'All Orders' },
              { key: 'pending', label: 'Pending' },
              { key: 'in_progress', label: 'In Progress' },
              { key: 'completed', label: 'Completed' },
            ].map((filter) => (
              <button
                key={filter.key}
                onClick={() => setActiveFilter(filter.key)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  activeFilter === filter.key
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-blue-600'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </motion.div>

          {/* Orders List */}
          {filteredOrders.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl shadow-xl border-2 border-gray-200 p-12 text-center"
            >
              <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No orders found</h3>
              <p className="text-gray-600 mb-6">You haven't placed any orders yet</p>
              <button
                onClick={() => router.push('/marketplace')}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Browse Services
              </button>
            </motion.div>
          ) : (
            <div className="space-y-6">
              {filteredOrders.map((order, index) => {
                const statusInfo = statusConfig[order.status as keyof typeof statusConfig];
                const StatusIcon = statusInfo.icon;

                return (
                  <motion.div
                    key={order.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className="bg-white rounded-2xl shadow-xl border-2 border-gray-200 p-6 hover:shadow-2xl transition-shadow"
                  >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="text-xl font-bold text-gray-900 mb-1">{order.serviceName}</h3>
                            <p className="text-gray-600">{order.description}</p>
                          </div>
                          <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${statusInfo.bg} ${statusInfo.color}`}>
                            <StatusIcon className="h-4 w-4" />
                            {statusInfo.label}
                          </span>
                        </div>
                        
                        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {new Date(order.date).toLocaleDateString()}
                          </span>
                          <span className="flex items-center gap-1">
                            <DollarSign className="h-4 w-4" />
                            ${order.amount}
                          </span>
                          <span className="flex items-center gap-1">
                            👤 {order.engineer}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                          View Details
                        </button>
                        {order.status === 'completed' && (
                          <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors">
                            Review
                          </button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}

          {/* Stats Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl shadow-xl p-8 text-white"
          >
            <h3 className="text-2xl font-bold mb-6">Order Summary</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div>
                <p className="text-blue-200 text-sm">Total Orders</p>
                <p className="text-3xl font-bold">{mockOrders.length}</p>
              </div>
              <div>
                <p className="text-blue-200 text-sm">In Progress</p>
                <p className="text-3xl font-bold">{mockOrders.filter(o => o.status === 'in_progress').length}</p>
              </div>
              <div>
                <p className="text-blue-200 text-sm">Completed</p>
                <p className="text-3xl font-bold">{mockOrders.filter(o => o.status === 'completed').length}</p>
              </div>
              <div>
                <p className="text-blue-200 text-sm">Total Spent</p>
                <p className="text-3xl font-bold">${mockOrders.reduce((sum, o) => sum + o.amount, 0)}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </>
  );
}
