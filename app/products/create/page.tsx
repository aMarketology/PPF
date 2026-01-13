'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { 
  Package, 
  DollarSign, 
  Clock,
  FileText,
  Image as ImageIcon,
  ArrowLeft,
  Loader,
  Save
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navigation from '@/app/components/Navigation';
import Footer from '@/app/components/Footer';
import { toast } from 'react-hot-toast';

const productSchema = z.object({
  name: z.string().min(3, 'Product name must be at least 3 characters'),
  description: z.string().min(20, 'Description must be at least 20 characters'),
  price: z.number().min(1, 'Price must be at least $1.00'),
  currency: z.string(),
  category: z.string().min(1, 'Please select a category'),
  delivery_time_days: z.number().min(1, 'Delivery time must be at least 1 day').optional(),
  image_url: z.string().url('Please enter a valid URL').optional().or(z.literal('')),
});

type ProductFormData = z.infer<typeof productSchema>;

const categories = [
  'Structural Engineering',
  'Mechanical Engineering',
  'Electrical Engineering',
  'Civil Engineering',
  'Software Engineering',
  'Consulting Services',
  'Design Services',
  'Analysis & Testing',
  'Project Management',
  'Other Services',
];

export default function CreateProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [companyId, setCompanyId] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      currency: 'usd',
      delivery_time_days: 7,
    },
  });

  useEffect(() => {
    checkCompany();
  }, []);

  const checkCompany = async () => {
    try {
      const supabase = createClient();
      
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/login');
        return;
      }

      const { data: company } = await supabase
        .from('company_profiles')
        .select('id')
        .eq('owner_id', user.id)
        .single();

      if (!company) {
        toast.error('No company profile found');
        router.push('/profile');
        return;
      }

      setCompanyId(company.id);

    } catch (error: any) {
      console.error('Error checking company:', error);
      toast.error('Failed to verify company profile');
    }
  };

  const onSubmit = async (data: ProductFormData) => {
    if (!companyId) {
      toast.error('Company ID not found');
      return;
    }

    setLoading(true);

    try {
      const supabase = createClient();

      const productData = {
        company_id: companyId,
        name: data.name,
        description: data.description,
        price: data.price,
        currency: data.currency,
        category: data.category,
        delivery_time_days: data.delivery_time_days || null,
        image_url: data.image_url || null,
        is_active: true,
      };

      const { error } = await supabase
        .from('products')
        .insert([productData]);

      if (error) throw error;

      toast.success('Product created successfully!');
      router.push('/products');

    } catch (error: any) {
      console.error('Error creating product:', error);
      toast.error(error.message || 'Failed to create product');
    } finally {
      setLoading(false);
    }
  };

  const watchPrice = watch('price');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navigation />
      
      <div className="pt-24 pb-12 px-4">
        <div className="max-w-3xl mx-auto">
          
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <Link 
              href="/products"
              className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm font-medium">Back to products</span>
            </Link>
            
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center">
                <Package className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-gray-900">Create New Product</h1>
                <p className="text-gray-600 mt-1">Add a new service or product to your offerings</p>
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl shadow-xl p-8"
          >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              
              {/* Product Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                  Product/Service Name *
                </label>
                <div className="relative">
                  <Package className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    id="name"
                    type="text"
                    {...register('name')}
                    placeholder="e.g., Structural Analysis Report"
                    className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none"
                  />
                </div>
                {errors.name && (
                  <p className="mt-2 text-sm text-red-600">{errors.name.message}</p>
                )}
              </div>

              {/* Description */}
              <div>
                <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-2">
                  Description *
                </label>
                <div className="relative">
                  <FileText className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                  <textarea
                    id="description"
                    {...register('description')}
                    rows={5}
                    placeholder="Describe your product or service in detail..."
                    className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none resize-none"
                  />
                </div>
                {errors.description && (
                  <p className="mt-2 text-sm text-red-600">{errors.description.message}</p>
                )}
              </div>

              {/* Price and Currency */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                  <label htmlFor="price" className="block text-sm font-semibold text-gray-700 mb-2">
                    Price *
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      id="price"
                      type="number"
                      step="0.01"
                      min="1"
                      {...register('price', { valueAsNumber: true })}
                      placeholder="99.00"
                      className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none"
                    />
                  </div>
                  {errors.price && (
                    <p className="mt-2 text-sm text-red-600">{errors.price.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="currency" className="block text-sm font-semibold text-gray-700 mb-2">
                    Currency
                  </label>
                  <select
                    id="currency"
                    {...register('currency')}
                    className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none"
                  >
                    <option value="usd">USD ($)</option>
                    <option value="eur">EUR (€)</option>
                    <option value="gbp">GBP (£)</option>
                    <option value="cad">CAD ($)</option>
                  </select>
                </div>
              </div>

              {/* Price Preview */}
              {watchPrice > 0 && (
                <div className="bg-blue-50 rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Customer pays</p>
                      <p className="text-2xl font-bold text-gray-900">
                        ${watchPrice.toFixed(2)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">You receive (after 10% fee)</p>
                      <p className="text-2xl font-bold text-green-600">
                        ${(watchPrice * 0.9).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Category */}
              <div>
                <label htmlFor="category" className="block text-sm font-semibold text-gray-700 mb-2">
                  Category *
                </label>
                <select
                  id="category"
                  {...register('category')}
                  className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none"
                >
                  <option value="">Select a category</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
                {errors.category && (
                  <p className="mt-2 text-sm text-red-600">{errors.category.message}</p>
                )}
              </div>

              {/* Delivery Time */}
              <div>
                <label htmlFor="delivery_time_days" className="block text-sm font-semibold text-gray-700 mb-2">
                  Estimated Delivery Time (days)
                </label>
                <div className="relative">
                  <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    id="delivery_time_days"
                    type="number"
                    min="1"
                    {...register('delivery_time_days', { valueAsNumber: true })}
                    placeholder="7"
                    className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none"
                  />
                </div>
                {errors.delivery_time_days && (
                  <p className="mt-2 text-sm text-red-600">{errors.delivery_time_days.message}</p>
                )}
              </div>

              {/* Image URL */}
              <div>
                <label htmlFor="image_url" className="block text-sm font-semibold text-gray-700 mb-2">
                  Image URL (optional)
                </label>
                <div className="relative">
                  <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    id="image_url"
                    type="url"
                    {...register('image_url')}
                    placeholder="https://example.com/image.jpg"
                    className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none"
                  />
                </div>
                {errors.image_url && (
                  <p className="mt-2 text-sm text-red-600">{errors.image_url.message}</p>
                )}
                <p className="mt-2 text-sm text-gray-500">
                  Provide a direct link to an image of your product or service
                </p>
              </div>

              {/* Submit Button */}
              <div className="flex gap-4">
                <Link
                  href="/products"
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-all"
                >
                  Cancel
                </Link>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-xl transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <Loader className="w-5 h-5 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    <>
                      <Save className="w-5 h-5" />
                      Create Product
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
