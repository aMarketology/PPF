'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Navigation from '@/app/components/Navigation';
import Footer from '@/app/components/Footer';
import { createClient } from '@/lib/supabase/client';
import { getUser } from '@/app/actions/auth';
import { 
  Star, 
  MapPin, 
  Clock, 
  CheckCircle, 
  Shield, 
  Award,
  MessageCircle,
  Heart,
  Share2,
  ArrowLeft,
  ChevronRight,
  DollarSign
} from 'lucide-react';

interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  delivery_time_days: number;
  image_url: string | null;
  is_active: boolean;
  company_profiles: {
    id: string;
    company_name: string;
    city: string | null;
    state: string | null;
    phone: string | null;
    email: string;
  };
}

export default function ServiceDetailPage() {
  const params = useParams();
  const router = useRouter();
  const supabase = createClient();
  const serviceId = params.id as string;
  
  const [product, setProduct] = useState<Product | null>(null);
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    loadProduct();
    checkUser();
  }, [serviceId]);

  const checkUser = async () => {
    try {
      const userData = await getUser();
      setUser(userData);
    } catch (error) {
      console.error('Error checking user:', error);
    }
  };

  const loadProduct = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select(`
          *,
          company_profiles (
            id,
            company_name,
            city,
            state,
            phone,
            email
          )
        `)
        .eq('id', serviceId)
        .eq('is_active', true)
        .single();

      if (error) {
        console.error('Error loading product:', error);
      } else {
        setProduct(data);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOrderNow = async () => {
    if (!user) {
      router.push(`/login?redirect=/marketplace/service/${serviceId}`);
      return;
    }
    router.push(`/checkout/${serviceId}`);
  };

  const handleContactProvider = () => {
    if (!user) {
      router.push(`/login?redirect=/marketplace/service/${serviceId}`);
      return;
    }
    if (product?.company_profiles) {
      router.push(`/messages?company=${product.company_profiles.id}`);
    }
  };

  if (isLoading) {
    return (
      <>
        <Navigation />
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-slate-50 pt-24 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading service...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (!product) {
    return (
      <>
        <Navigation />
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-slate-50 pt-24 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Service Not Found</h1>
            <p className="text-gray-600 mb-6">This service is no longer available or does not exist.</p>
            <Link 
              href="/marketplace" 
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Marketplace
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const serviceImages = [
    product.image_url || 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop',
  ];

  const location = [product.company_profiles.city, product.company_profiles.state]
    .filter(Boolean)
    .join(', ') || 'Location not specified';

  return (
    <>
      <Navigation />
      <div className="bg-gradient-to-br from-blue-50 via-white to-slate-50 min-h-screen pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="flex items-center gap-2 text-sm text-gray-600 mb-6"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Link href="/" className="hover:text-blue-600 transition">Home</Link>
            <ChevronRight className="h-4 w-4" />
            <Link href="/marketplace" className="hover:text-blue-600 transition">Marketplace</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-gray-900 font-medium">{product.category}</span>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden"
              >
                <div className="relative h-96 bg-gray-900">
                  <img 
                    src={serviceImages[currentImageIndex]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 flex gap-2">
                    <motion.button
                      onClick={() => setIsFavorite(!isFavorite)}
                      className="p-3 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-all shadow-lg"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Heart className={`h-5 w-5 ${isFavorite ? 'text-red-500 fill-current' : 'text-gray-600'}`} />
                    </motion.button>
                    <motion.button
                      className="p-3 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-all shadow-lg"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Share2 className="h-5 w-5 text-gray-600" />
                    </motion.button>
                  </div>
                </div>
                <div className="flex gap-2 p-4 overflow-x-auto">
                  {serviceImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentImageIndex(idx)}
                      className={`flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden border-2 transition-all ${
                        currentImageIndex === idx ? 'border-blue-600' : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <img src={img} alt={`Preview ${idx + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-2xl shadow-lg p-6"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-sm font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full uppercase">
                        {product.category.replace('-', ' ')}
                      </span>
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
                    <p className="text-gray-600 text-lg mb-4">{product.description}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-gradient-to-br from-blue-50 to-slate-50 rounded-xl">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-2xl font-bold">
                      {product.company_profiles.company_name.charAt(0)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-bold text-gray-900 text-lg">{product.company_profiles.company_name}</h3>
                        <CheckCircle className="h-5 w-5 text-blue-600" />
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          <span>{location}</span>
                        </div>
                        {product.company_profiles.phone && (
                          <div className="flex items-center gap-1">
                            <span>{product.company_profiles.phone}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <button 
                    onClick={handleContactProvider}
                    className="px-6 py-2.5 bg-white border-2 border-gray-200 hover:border-blue-500 text-gray-900 font-semibold rounded-lg transition-all"
                  >
                    Contact
                  </button>
                </div>

                <div className="grid grid-cols-3 gap-4 mt-6">
                  <div className="text-center p-4 bg-gray-50 rounded-xl">
                    <Clock className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                    <div className="text-sm text-gray-600">Delivery Time</div>
                    <div className="text-lg font-bold text-gray-900">{product.delivery_time_days} days</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-xl">
                    <DollarSign className="h-6 w-6 text-green-600 mx-auto mb-2" />
                    <div className="text-sm text-gray-600">Starting Price</div>
                    <div className="text-lg font-bold text-gray-900">\${product.price.toLocaleString()}</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-xl">
                    <CheckCircle className="h-6 w-6 text-purple-600 mx-auto mb-2" />
                    <div className="text-sm text-gray-600">Active Listing</div>
                    <div className="text-lg font-bold text-gray-900">Yes</div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden p-6"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-4">About This Service</h3>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">{product.description}</p>
              </motion.div>
            </div>

            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="sticky top-24 bg-white rounded-2xl shadow-xl border-2 border-gray-200 overflow-hidden"
              >
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Order This Service</h3>

                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-4xl font-bold text-gray-900">
                      \${product.price.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-gray-600 mb-6">
                    <Clock className="h-5 w-5" />
                    <span className="font-medium">Delivery in {product.delivery_time_days} days</span>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 text-sm">Professional engineering service</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 text-sm">Verified company</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 text-sm">Secure payment processing</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 text-sm">Delivery in {product.delivery_time_days} days</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <motion.button
                      onClick={handleOrderNow}
                      className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-4 rounded-xl transition-all shadow-md hover:shadow-lg"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {user ? 'Order Now' : 'Sign In to Order'}
                    </motion.button>
                    <motion.button
                      onClick={handleContactProvider}
                      className="w-full bg-white border-2 border-gray-200 hover:border-blue-500 text-gray-900 font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <MessageCircle className="h-5 w-5" />
                      Contact Provider
                    </motion.button>
                  </div>
                </div>

                <div className="p-6 bg-gradient-to-br from-blue-50 to-slate-50">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-gray-700">
                      <Shield className="h-5 w-5 text-blue-600" />
                      <span className="text-sm">Secure payments via Stripe</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-700">
                      <Award className="h-5 w-5 text-blue-600" />
                      <span className="text-sm">Verified professional engineer</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-700">
                      <CheckCircle className="h-5 w-5 text-blue-600" />
                      <span className="text-sm">Platform fee: 10%</span>
                    </div>
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
