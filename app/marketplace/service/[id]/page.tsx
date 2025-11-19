'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { mockServices } from '@/lib/mockData';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Navigation from '@/app/components/Navigation';
import Footer from '@/app/components/Footer';
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
  TrendingUp,
  Users,
  Calendar,
  Package,
  ArrowLeft,
  ChevronRight
} from 'lucide-react';

export default function ServiceDetailPage() {
  const params = useParams();
  const serviceId = params.id as string;
  const service = mockServices.find(s => s.id === serviceId);
  const [selectedPackage, setSelectedPackage] = useState('standard');
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  if (!service) {
    return (
      <>
        <Navigation />
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-slate-50 pt-24 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Service Not Found</h1>
            <Link href="/marketplace" className="text-blue-600 hover:text-blue-700 font-medium">
              ← Back to Marketplace
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  // Dummy images for the service
  const serviceImages = [
    'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop',
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Pricing packages
  const packages = {
    basic: {
      name: 'Basic',
      price: service.price * 0.7,
      delivery: service.duration,
      features: [
        'Initial consultation',
        'Basic analysis',
        'Standard delivery',
        '1 revision included',
      ]
    },
    standard: {
      name: 'Standard',
      price: service.price,
      delivery: service.duration,
      features: [
        'Everything in Basic',
        'Detailed analysis & report',
        'Priority support',
        '3 revisions included',
        'Source files included'
      ]
    },
    premium: {
      name: 'Premium',
      price: service.price * 1.5,
      delivery: service.duration.split('-')[0] + ' days',
      features: [
        'Everything in Standard',
        'Comprehensive documentation',
        '24/7 priority support',
        'Unlimited revisions',
        'Fast-track delivery',
        'Post-delivery support (30 days)'
      ]
    }
  };

  const currentPackage = packages[selectedPackage as keyof typeof packages];

  return (
    <>
      <Navigation />
      <div className="bg-gradient-to-br from-blue-50 via-white to-slate-50 min-h-screen pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumb */}
          <motion.div 
            className="flex items-center gap-2 text-sm text-gray-600 mb-6"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Link href="/" className="hover:text-blue-600 transition">Home</Link>
            <ChevronRight className="h-4 w-4" />
            <Link href="/marketplace" className="hover:text-blue-600 transition">Marketplace</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-gray-900 font-medium">{service.category}</span>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left Column - Images & Details */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Image Gallery */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden"
              >
                <div className="relative h-96 bg-gray-900">
                  <img 
                    src={serviceImages[currentImageIndex]}
                    alt={service.title}
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

              {/* Title & Provider */}
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
                        {service.category.replace('-', ' ')}
                      </span>
                      {service.featured && (
                        <span className="text-sm font-semibold text-purple-600 bg-purple-50 px-3 py-1 rounded-full flex items-center gap-1">
                          <TrendingUp className="h-3 w-3" />
                          Featured
                        </span>
                      )}
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">{service.title}</h1>
                    <p className="text-gray-600 text-lg mb-4">{service.shortDescription}</p>
                  </div>
                </div>

                {/* Provider Info */}
                <div className="flex items-center justify-between p-4 bg-gradient-to-br from-blue-50 to-slate-50 rounded-xl">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-2xl font-bold">
                      {service.provider.name.charAt(0)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-bold text-gray-900 text-lg">{service.provider.name}</h3>
                        {service.provider.verified && (
                          <CheckCircle className="h-5 w-5 text-blue-600" />
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
                          <span className="font-medium">{service.provider.rating}</span>
                          <span>({service.reviewCount} reviews)</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          <span>{service.provider.location}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Link 
                    href={`/profile/${service.provider.id}`}
                    className="px-6 py-2.5 bg-white border-2 border-gray-200 hover:border-blue-500 text-gray-900 font-semibold rounded-lg transition-all"
                  >
                    View Profile
                  </Link>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mt-6">
                  <div className="text-center p-4 bg-gray-50 rounded-xl">
                    <Clock className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                    <div className="text-sm text-gray-600">Response Time</div>
                    <div className="text-lg font-bold text-gray-900">{service.provider.responseTime}</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-xl">
                    <CheckCircle className="h-6 w-6 text-green-600 mx-auto mb-2" />
                    <div className="text-sm text-gray-600">Completion Rate</div>
                    <div className="text-lg font-bold text-gray-900">{service.provider.completionRate}%</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-xl">
                    <Users className="h-6 w-6 text-purple-600 mx-auto mb-2" />
                    <div className="text-sm text-gray-600">Orders</div>
                    <div className="text-lg font-bold text-gray-900">{service.reviewCount}+</div>
                  </div>
                </div>
              </motion.div>

              {/* Tabs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden"
              >
                <div className="border-b border-gray-200">
                  <div className="flex gap-8 px-6">
                    {['overview', 'description', 'reviews'].map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`py-4 font-medium capitalize transition-all relative ${
                          activeTab === tab 
                            ? 'text-blue-600' 
                            : 'text-gray-600 hover:text-gray-900'
                        }`}
                      >
                        {tab}
                        {activeTab === tab && (
                          <motion.div
                            layoutId="activeTab"
                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"
                          />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-6">
                  {activeTab === 'overview' && (
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-4">What You'll Get</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {currentPackage.features.map((feature, idx) => (
                            <div key={idx} className="flex items-start gap-3">
                              <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                              <span className="text-gray-700">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-4">Skills & Expertise</h3>
                        <div className="flex flex-wrap gap-2">
                          {service.tags.map((tag, idx) => (
                            <span 
                              key={idx}
                              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium text-sm"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'description' && (
                    <div className="prose max-w-none">
                      <p className="text-gray-700 leading-relaxed mb-4">{service.shortDescription}</p>
                      <p className="text-gray-700 leading-relaxed mb-4">{service.fullDescription}</p>
                      
                      <h3 className="text-xl font-bold text-gray-900 mt-6 mb-4">Why Choose This Service?</h3>
                      <ul className="space-y-2">
                        <li className="text-gray-700">✓ Licensed and certified professional engineer</li>
                        <li className="text-gray-700">✓ Years of industry experience</li>
                        <li className="text-gray-700">✓ Compliance with all relevant codes and standards</li>
                        <li className="text-gray-700">✓ Clear communication throughout the project</li>
                        <li className="text-gray-700">✓ Quality assurance and professional liability coverage</li>
                      </ul>
                    </div>
                  )}

                  {activeTab === 'reviews' && (
                    <div className="space-y-6">
                      <div className="flex items-center gap-8 p-6 bg-gradient-to-br from-blue-50 to-slate-50 rounded-xl">
                        <div className="text-center">
                          <div className="text-5xl font-bold text-gray-900 mb-2">{service.rating}</div>
                          <div className="flex items-center justify-center gap-1 mb-2">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="h-5 w-5 text-yellow-500 fill-current" />
                            ))}
                          </div>
                          <div className="text-sm text-gray-600">{service.reviewCount} reviews</div>
                        </div>
                        <div className="flex-1">
                          {[5, 4, 3, 2, 1].map((stars) => (
                            <div key={stars} className="flex items-center gap-3 mb-2">
                              <span className="text-sm text-gray-600 w-12">{stars} star</span>
                              <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                                <div 
                                  className="h-full bg-yellow-500"
                                  style={{ width: `${stars === 5 ? 85 : stars === 4 ? 10 : 5}%` }}
                                />
                              </div>
                              <span className="text-sm text-gray-600 w-12">{stars === 5 ? 85 : stars === 4 ? 10 : 5}%</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Sample Reviews */}
                      <div className="space-y-4">
                        {[1, 2, 3].map((review) => (
                          <div key={review} className="border border-gray-200 rounded-xl p-6">
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center text-white font-bold">
                                  J
                                </div>
                                <div>
                                  <div className="font-semibold text-gray-900">John Client</div>
                                  <div className="text-sm text-gray-600">2 weeks ago</div>
                                </div>
                              </div>
                              <div className="flex items-center gap-1">
                                {[...Array(5)].map((_, i) => (
                                  <Star key={i} className="h-4 w-4 text-yellow-500 fill-current" />
                                ))}
                              </div>
                            </div>
                            <p className="text-gray-700">
                              Excellent work! Professional, timely, and delivered exactly what was promised. 
                              Highly recommend for any engineering projects.
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            </div>

            {/* Right Column - Pricing & Order */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="sticky top-24 bg-white rounded-2xl shadow-xl border-2 border-gray-200 overflow-hidden"
              >
                {/* Package Selection */}
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Select Package</h3>
                  <div className="flex gap-2 mb-4">
                    {Object.entries(packages).map(([key, pkg]) => (
                      <button
                        key={key}
                        onClick={() => setSelectedPackage(key)}
                        className={`flex-1 py-2 px-3 rounded-lg font-medium text-sm transition-all ${
                          selectedPackage === key
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {pkg.name}
                      </button>
                    ))}
                  </div>

                  {/* Price */}
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-4xl font-bold text-gray-900">
                      ${currentPackage.price.toLocaleString()}
                    </span>
                  </div>

                  {/* Delivery Time */}
                  <div className="flex items-center gap-2 text-gray-600 mb-6">
                    <Clock className="h-5 w-5" />
                    <span className="font-medium">Delivery in {currentPackage.delivery}</span>
                  </div>

                  {/* Features */}
                  <div className="space-y-3 mb-6">
                    {currentPackage.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Buttons */}
                  <div className="space-y-3">
                    <motion.button
                      className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-4 rounded-xl transition-all shadow-md hover:shadow-lg"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Order Now (${(currentPackage.price * quantity).toLocaleString()})
                    </motion.button>
                    <motion.button
                      className="w-full bg-white border-2 border-gray-200 hover:border-blue-500 text-gray-900 font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <MessageCircle className="h-5 w-5" />
                      Contact Provider
                    </motion.button>
                  </div>
                </div>

                {/* Trust Badges */}
                <div className="p-6 bg-gradient-to-br from-blue-50 to-slate-50">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-gray-700">
                      <Shield className="h-5 w-5 text-blue-600" />
                      <span className="text-sm">Secure payments via escrow</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-700">
                      <Award className="h-5 w-5 text-blue-600" />
                      <span className="text-sm">Verified professional engineer</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-700">
                      <CheckCircle className="h-5 w-5 text-blue-600" />
                      <span className="text-sm">Money-back guarantee</span>
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
