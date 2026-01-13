'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navigation from '@/app/components/Navigation';
import Footer from '@/app/components/Footer';
import { createClient } from '@/lib/supabase/client';
import { getUser } from '@/app/actions/auth';
import { useRouter, useParams } from 'next/navigation';
import {
  Package,
  Clock,
  CheckCircle,
  Truck,
  User,
  Mail,
  Phone,
  Calendar,
  DollarSign,
  ArrowLeft,
  MessageSquare,
  FileText,
} from 'lucide-react';

interface OrderDetail {
  id: string;
  order_number: string;
  product_name: string;
  product_price: number;
  quantity: number;
  subtotal: number;
  platform_fee: number;
  total_amount: number;
  status: string;
  created_at: string;
  paid_at: string | null;
  delivered_at: string | null;
  completed_at: string | null;
  buyer_notes: string | null;
  company_notes: string | null;
  products: {
    id: string;
    name: string;
    description: string;
    category: string;
    delivery_time_days: number;
  };
  profiles: {
    id: string;
    full_name: string;
    email: string;
    phone: string | null;
  };
}

export default function CompanyOrderDetailPage() {
  const router = useRouter();
  const params = useParams();
  const supabase = createClient();
  const [user, setUser] = useState<any>(null);
  const [company, setCompany] = useState<any>(null);
  const [order, setOrder] = useState<OrderDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [companyNotes, setCompanyNotes] = useState('');

  useEffect(() => {
    loadOrderDetails();
  }, [params.id]);

  const loadOrderDetails = async () => {
    try {
      const userData = await getUser();
      if (!userData) {
        router.push('/login');
        return;
      }
      setUser(userData);

      // Get company profile
      const { data: companyData } = await supabase
        .from('company_profiles')
        .select('*')
        .eq('owner_id', userData.id)
        .single();

      if (!companyData) {
        router.push('/profile');
        return;
      }
      setCompany(companyData);

      // Fetch order details
      const { data: orderData, error } = await supabase
        .from('product_orders')
        .select(`
          *,
          products (
            id,
            name,
            description,
            category,
            delivery_time_days
          ),
          profiles!product_orders_buyer_id_fkey (
            id,
            full_name,
            email,
            phone
          )
        `)
        .eq('id', params.id)
        .eq('company_id', companyData.id)
        .single();

      if (error || !orderData) {
        console.error('Error fetching order:', error);
        router.push('/orders/sales');
        return;
      }

      setOrder(orderData);
      setCompanyNotes(orderData.company_notes || '');
    } catch (error) {
      console.error('Error loading order details:', error);
      router.push('/orders/sales');
    } finally {
      setIsLoading(false);
    }
  };

  const updateStatus = async (newStatus: string) => {
    if (!order) return;

    try {
      const response = await fetch(`/api/orders/${order.id}/update-status`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to update status');
      }

      alert(data.message || 'Order status updated successfully!');
      await loadOrderDetails();
    } catch (error) {
      console.error('Error updating status:', error);
      alert(error instanceof Error ? error.message : 'Failed to update order status');
    }
  };

  const saveNotes = async () => {
    if (!order) return;

    try {
      const { error } = await supabase
        .from('product_orders')
        .update({ company_notes: companyNotes })
        .eq('id', order.id);

      if (error) throw error;

      alert('Notes saved successfully!');
      await loadOrderDetails();
    } catch (error) {
      console.error('Error saving notes:', error);
      alert('Failed to save notes');
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Not yet';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (isLoading) {
    return (
      <>
        <Navigation />
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-slate-50 pt-24 pb-12 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading order details...</p>
          </div>
        </div>
      </>
    );
  }

  if (!order) {
    return null;
  }

  const yourEarnings = parseFloat((order.total_amount - order.platform_fee).toString());

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-slate-50 pt-24 pb-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => router.push('/orders/sales')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back to Sales Dashboard</span>
          </motion.button>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Order Management</h1>
            <p className="text-gray-600">Order #{order.order_number}</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Status & Actions */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl shadow-lg p-6"
              >
                <h2 className="text-xl font-bold text-gray-900 mb-4">Order Status</h2>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className={`px-4 py-2 rounded-full ${
                      order.status === 'completed' ? 'bg-green-100 text-green-700' :
                      order.status === 'delivered' ? 'bg-orange-100 text-orange-700' :
                      order.status === 'in_progress' ? 'bg-purple-100 text-purple-700' :
                      'bg-blue-100 text-blue-700'
                    }`}>
                      <span className="font-semibold capitalize">{order.status.replace('_', ' ')}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  {order.status === 'paid' && (
                    <button
                      onClick={() => updateStatus('in_progress')}
                      className="w-full px-6 py-3 bg-purple-600 text-white rounded-xl font-medium hover:bg-purple-700 transition-colors"
                    >
                      Mark as "In Progress"
                    </button>
                  )}
                  {order.status === 'in_progress' && (
                    <button
                      onClick={() => updateStatus('delivered')}
                      className="w-full px-6 py-3 bg-orange-600 text-white rounded-xl font-medium hover:bg-orange-700 transition-colors"
                    >
                      Mark as "Delivered"
                    </button>
                  )}
                  {order.status === 'delivered' && (
                    <button
                      onClick={() => updateStatus('completed')}
                      className="w-full px-6 py-3 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 transition-colors"
                    >
                      Mark as "Completed"
                    </button>
                  )}
                </div>
              </motion.div>

              {/* Timeline */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-2xl shadow-lg p-6"
              >
                <h2 className="text-xl font-bold text-gray-900 mb-6">Order Timeline</h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Order Created</p>
                      <p className="text-sm text-gray-500">{formatDate(order.created_at)}</p>
                    </div>
                  </div>

                  {order.paid_at && (
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">Payment Confirmed</p>
                        <p className="text-sm text-gray-500">{formatDate(order.paid_at)}</p>
                      </div>
                    </div>
                  )}

                  {['in_progress', 'delivered', 'completed'].includes(order.status) && (
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">Work Started</p>
                        <p className="text-sm text-gray-500">In Progress</p>
                      </div>
                    </div>
                  )}

                  {order.delivered_at && (
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">Delivered</p>
                        <p className="text-sm text-gray-500">{formatDate(order.delivered_at)}</p>
                      </div>
                    </div>
                  )}

                  {order.completed_at && (
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">Order Completed</p>
                        <p className="text-sm text-gray-500">{formatDate(order.completed_at)}</p>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>

              {/* Product Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-2xl shadow-lg p-6"
              >
                <h2 className="text-xl font-bold text-gray-900 mb-4">Product Information</h2>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{order.product_name}</h3>
                  <p className="text-gray-600 mb-3">{order.products.description}</p>
                  <div className="flex gap-3">
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                      {order.products.category}
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Company Notes */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-2xl shadow-lg p-6"
              >
                <h2 className="text-xl font-bold text-gray-900 mb-4">Internal Notes</h2>
                <textarea
                  value={companyNotes}
                  onChange={(e) => setCompanyNotes(e.target.value)}
                  placeholder="Add internal notes about this order..."
                  rows={4}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none"
                />
                <button
                  onClick={saveNotes}
                  className="mt-3 px-6 py-2 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors"
                >
                  Save Notes
                </button>
              </motion.div>

              {/* Customer Notes */}
              {order.buyer_notes && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="bg-blue-50 rounded-2xl p-6"
                >
                  <h3 className="font-semibold text-gray-900 mb-2">Customer Notes:</h3>
                  <p className="text-gray-700">{order.buyer_notes}</p>
                </motion.div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Earnings */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl shadow-lg p-6 text-white"
              >
                <h2 className="text-lg font-bold mb-2 opacity-90">Your Earnings</h2>
                <p className="text-4xl font-bold mb-4">{formatPrice(yourEarnings)}</p>
                <div className="space-y-2 text-sm opacity-90">
                  <div className="flex justify-between">
                    <span>Customer Paid:</span>
                    <span>{formatPrice(order.total_amount)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Platform Fee (10%):</span>
                    <span>-{formatPrice(order.platform_fee)}</span>
                  </div>
                </div>
              </motion.div>

              {/* Customer Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-2xl shadow-lg p-6"
              >
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <User className="w-5 h-5 text-blue-600" />
                  Customer
                </h2>
                <div className="space-y-3">
                  <div>
                    <p className="font-bold text-gray-900">{order.profiles.full_name || 'N/A'}</p>
                  </div>
                  {order.profiles.email && (
                    <a
                      href={`mailto:${order.profiles.email}`}
                      className="flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm"
                    >
                      <Mail className="w-4 h-4" />
                      {order.profiles.email}
                    </a>
                  )}
                  {order.profiles.phone && (
                    <a
                      href={`tel:${order.profiles.phone}`}
                      className="flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm"
                    >
                      <Phone className="w-4 h-4" />
                      {order.profiles.phone}
                    </a>
                  )}
                  <button
                    onClick={() => router.push(`/messages?user=${order.profiles.id}`)}
                    className="w-full mt-4 px-4 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <MessageSquare className="w-5 h-5" />
                    Contact Customer
                  </button>
                </div>
              </motion.div>

              {/* Order Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-2xl shadow-lg p-6"
              >
                <h2 className="text-xl font-bold text-gray-900 mb-4">Order Info</h2>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Order Number:</span>
                    <span className="font-medium">{order.order_number}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Created:</span>
                    <span className="font-medium">
                      {new Date(order.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Quantity:</span>
                    <span className="font-medium">{order.quantity}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Delivery Time:</span>
                    <span className="font-medium">{order.products.delivery_time_days} days</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
