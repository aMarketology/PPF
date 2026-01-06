'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import Navigation from '@/app/components/Navigation';
import Footer from '@/app/components/Footer';

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navigation />
      
      <div className="pt-24 pb-12 px-4">
        <div className="max-w-6xl mx-auto">
          
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <Link 
              href="/"
              className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm font-medium">Back to home</span>
            </Link>
            
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center">
                <FileText className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-gray-900">Terms of Service</h1>
                <p className="text-gray-600 mt-1">Last updated: January 2026</p>
              </div>
            </div>
            
            <p className="text-gray-600 mb-6">
              Please read these terms carefully before using our platform. By using Precision Product Flow, you agree to these terms.
            </p>
            
            <a
              href="/Terms%20of%20Service_joshgoto-7.pdf"
              download
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all shadow-lg hover:shadow-xl"
            >
              <Download className="w-5 h-5" />
              Download PDF
            </a>
          </motion.div>

          {/* PDF Viewer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl shadow-xl overflow-hidden"
          >
            <div className="w-full" style={{ height: 'calc(100vh - 300px)', minHeight: '600px' }}>
              <iframe
                src="/Terms%20of%20Service_joshgoto-7.pdf"
                className="w-full h-full"
                title="Terms of Service"
              />
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-8 p-6 bg-white rounded-2xl shadow-xl"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-4">Related Documents</h2>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/privacy-policy"
                className="flex items-center gap-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-all"
              >
                Privacy Policy
              </Link>
              <Link
                href="/contact"
                className="flex items-center gap-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-all"
              >
                Contact Support
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
