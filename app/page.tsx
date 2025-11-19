'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Navigation from './components/Navigation'
import Footer from './components/Footer'

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* === HERO SECTION === */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-blue-50 via-white to-slate-50">
        {/* Background Image Placeholder */}
        <div className="absolute inset-0">
          {/* Hero Background Image */}
          <div className="absolute inset-0 bg-gradient-to-b from-blue-50/60 via-white/50 to-slate-50">
            <img 
              src="/hero-bg-hibachi.jpg" 
              alt="Precision Product Flow Background"
              className="w-full h-full object-cover opacity-10"
            />
          </div>
          {/* Overlay Effects */}
          <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl" />
        </div>
        
        {/* Grid Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:100px_100px]" />

        {/* Content Container */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8 py-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column - Text Content */}
            <div className="lg:col-span-7 space-y-8">
              {/* Premium Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-200 bg-blue-50 backdrop-blur-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                  <span className="text-xs font-medium text-gray-700 uppercase tracking-widest">Irvine, California</span>
                </div>
              </motion.div>

              {/* Main Headline */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="space-y-4"
              >
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-light text-gray-900 tracking-tight leading-none">
                  Precision Product
                </h1>
                <h2 className="text-5xl md:text-7xl lg:text-8xl font-normal bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 bg-clip-text text-transparent leading-none">
                  Flow
                </h2>
              </motion.div>

              {/* Tagline */}
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.35 }}
                className="text-3xl md:text-4xl text-gray-700 font-light leading-tight"
              >
                Expert Product Flow Solutions for Your Business
              </motion.h3>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-xl md:text-2xl text-gray-600 font-light leading-relaxed max-w-2xl"
              >
                Precision Product Flow delivers expertly designed product flow solutions tailored to your operations. Our experienced team brings efficient processes and innovative strategies to optimize your supply chain, logistics, and operational workflows across all industries.
              </motion.p>

              {/* CTA Buttons Row */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-4 pt-4"
              >
                <a
                  href="tel:(858) 434-7166"
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg font-medium text-white hover:shadow-2xl hover:shadow-blue-600/40 transition-all duration-300"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  Contact Us
                </a>
                
                <Link
                  href="/gallery"
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-zinc-900/50 border border-zinc-800 rounded-lg font-medium text-zinc-300 hover:bg-zinc-800/50 hover:border-zinc-700 backdrop-blur-sm transition-all duration-300"
                >
                  See Gallery
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              </motion.div>
            </div>

            {/* Right Column - Stats Grid */}
            <div className="lg:col-span-5">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="grid grid-cols-2 gap-4"
              >
                {/* Stat Card 1 */}
                <div className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800 backdrop-blur-sm">
                  <div className="text-4xl font-bold text-blue-600 mb-2">20+</div>
                  <div className="text-sm text-zinc-400">Years Experience</div>
                </div>

                {/* Stat Card 2 */}
                <div className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800 backdrop-blur-sm">
                  <div className="text-4xl font-bold text-blue-600 mb-2">5.0</div>
                  <div className="text-sm text-zinc-400">Google Rating</div>
                </div>

                {/* Stat Card 3 */}
                <div className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800 backdrop-blur-sm">
                  <div className="text-4xl font-bold text-blue-600 mb-2">1000+</div>
                  <div className="text-sm text-zinc-400">Projects Done</div>
                </div>

                {/* Stat Card 4 */}
                <div className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800 backdrop-blur-sm">
                  <div className="text-4xl font-bold text-blue-600 mb-2">100%</div>
                  <div className="text-sm text-zinc-400">Satisfaction</div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* === ABOUT / VIDEO SECTION === */}
      <section className="relative py-32 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Left Column - Video */}
            <div className="relative">
              {/* Video Placeholder */}
              <div className="relative aspect-video rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800">
                <video 
                  className="w-full h-full object-cover"
                  poster="/video-poster-cooking.jpg"
                  controls
                  preload="metadata"
                >
                  <source src="/video-hibachi-cooking-demo.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                {/* Play button overlay - optional */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-20 h-20 rounded-full bg-blue-600/90 flex items-center justify-center backdrop-blur-sm">
                    <svg className="w-10 h-10 text-white ml-1" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                    </svg>
                  </div>
                </div>
              </div>
              
              {/* Decorative Elements */}
              <div className="absolute -bottom-6 -right-6 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl -z-10" />
            </div>

            {/* Right Column - Content */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-zinc-800 bg-zinc-900/50 backdrop-blur-sm">
                <span className="text-xs font-medium text-zinc-400 uppercase tracking-widest">About Us</span>
              </div>

              <h2 className="text-4xl md:text-5xl font-light text-zinc-100">
                Professional Solutions
                <br />
                <span className="bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text text-transparent">Brought to Your Operations</span>
              </h2>

              <p className="text-lg text-zinc-400 leading-relaxed">
                With over 20 years of experience, Precision Product Flow has been serving businesses with premium product flow optimization services. Our expert consultants trained in advanced operational techniques bring efficiency and innovation to your supply chain and logistics operations.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-red-600/10 border border-red-600/20 flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-zinc-100 mb-2">Experienced Chefs</h3>
                    <p className="text-zinc-400">Master hibachi chefs with decades of culinary expertise and entertainment skills</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-red-600/10 border border-red-600/20 flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                      <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-zinc-100 mb-2">Premium Quality</h3>
                    <p className="text-zinc-400">Only the freshest, highest-quality ingredients for every event we cater</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-red-600/10 border border-red-600/20 flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-zinc-100 mb-2">Full Service</h3>
                    <p className="text-zinc-400">Complete setup, cooking, service, and cleanup - we handle everything</p>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg font-medium text-white transition-all"
                >
                  Learn More About Us
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* === SERVICES SECTION === */}
      <section className="relative py-32 bg-black">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-zinc-800 bg-zinc-900/50 backdrop-blur-sm mb-6">
              <span className="text-xs font-medium text-zinc-400 uppercase tracking-widest">Catering Services</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-light text-zinc-100 mb-6">
              Hibachi Catering for Every Occasion
            </h2>
            <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
              Expert chefs bringing authentic hibachi experiences to your events across Southern California
            </p>
          </div>

          {/* Services Grid - 3 Columns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Service Card 1 */}
            <div className="group relative rounded-2xl overflow-hidden bg-zinc-900/50 border border-zinc-800 hover:border-zinc-700 transition-all duration-300">
              {/* Service Image */}
              <div className="relative h-64 overflow-hidden">
                <img 
                  src="/service-corporate-events.jpg" 
                  alt="Corporate Event Hibachi Catering"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/50 to-transparent" />
              </div>
              
              <div className="p-8">
                {/* Icon */}
                <div className="w-14 h-14 mb-6 rounded-xl bg-gradient-to-br from-red-600/20 to-red-700/10 border border-red-600/20 flex items-center justify-center">
                  <svg className="w-7 h-7 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>

                {/* Content */}
                <h3 className="text-2xl font-semibold text-zinc-100 mb-4">Corporate & Private Events</h3>
                <p className="text-zinc-400 mb-6 leading-relaxed">
                  Elevate your corporate gatherings with our interactive hibachi catering. Perfect for team building events, client appreciation dinners, and company celebrations.
                </p>

                {/* Feature List */}
                <ul className="space-y-2 mb-6">
                  {['Professional Service', 'Interactive Experience', 'Customizable Menus', 'On-Site Cooking'].map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-zinc-500">
                      <svg className="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Link */}
                <Link href="/services" className="inline-flex items-center gap-2 text-red-600 font-medium hover:gap-3 transition-all">
                  Learn More
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Service Card 2 */}
            <div className="group relative rounded-2xl overflow-hidden bg-zinc-900/50 border border-zinc-800 hover:border-zinc-700 transition-all duration-300">
              {/* Service Image */}
              <div className="relative h-64 overflow-hidden">
                <img 
                  src="/service-wedding-catering.jpg" 
                  alt="Wedding Hibachi Catering"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/50 to-transparent" />
              </div>
              
              <div className="p-8">
                <div className="w-14 h-14 mb-6 rounded-xl bg-gradient-to-br from-red-600/20 to-red-700/10 border border-red-600/20 flex items-center justify-center">
                  <svg className="w-7 h-7 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>

                <h3 className="text-2xl font-semibold text-zinc-100 mb-4">Weddings & Celebrations</h3>
                <p className="text-zinc-400 mb-6 leading-relaxed">
                  Make your special day unforgettable with our premium hibachi catering. Our expert chefs create memorable dining experiences that wow your guests.
                </p>

                <ul className="space-y-2 mb-6">
                  {['Premium Ingredients', 'Live Entertainment', 'Elegant Presentation', 'Guest Engagement'].map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-zinc-500">
                      <svg className="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>

                <Link href="/services" className="inline-flex items-center gap-2 text-red-600 font-medium hover:gap-3 transition-all">
                  Learn More
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Service Card 3 */}
            <div className="group relative rounded-2xl overflow-hidden bg-zinc-900/50 border border-zinc-800 hover:border-zinc-700 transition-all duration-300">
              {/* Service Image */}
              <div className="relative h-64 overflow-hidden">
                <img 
                  src="/service-private-party.jpg" 
                  alt="Private Party Hibachi Catering"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/50 to-transparent" />
              </div>
              
              <div className="p-8">
                <div className="w-14 h-14 mb-6 rounded-xl bg-gradient-to-br from-red-600/20 to-red-700/10 border border-red-600/20 flex items-center justify-center">
                  <svg className="w-7 h-7 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>

                <h3 className="text-2xl font-semibold text-zinc-100 mb-4">Private Parties</h3>
                <p className="text-zinc-400 mb-6 leading-relaxed">
                  Transform your private events into culinary experiences. From intimate gatherings to large celebrations, we bring authentic hibachi to your venue.
                </p>

                <ul className="space-y-2 mb-6">
                  {['Flexible Service', 'All Event Sizes', 'Authentic Flavors', 'Entertainment Value'].map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-zinc-500">
                      <svg className="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>

                <Link href="/services" className="inline-flex items-center gap-2 text-red-600 font-medium hover:gap-3 transition-all">
                  Learn More
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* === WHY CHOOSE US SECTION === */}
      <section className="relative py-32 bg-gradient-to-b from-black to-zinc-950">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          
          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Left Column - Content */}
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-zinc-800 bg-zinc-900/50 backdrop-blur-sm">
                <span className="text-xs font-medium text-zinc-400 uppercase tracking-widest">Why Choose Us</span>
              </div>

              <h2 className="text-4xl md:text-5xl font-light text-zinc-100">
                Orange County's Premier
                <br />
                <span className="bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">Hibachi Catering</span>
              </h2>

              <p className="text-lg text-zinc-400 leading-relaxed">
                Fire Up Hibachi brings the authentic hibachi experience directly to your event. Our expert chefs combine traditional Japanese cooking techniques with modern flair, creating unforgettable culinary entertainment for your guests.
              </p>

              {/* Feature List with Icons */}
              <div className="space-y-4">
                {[
                  { title: 'Expert Chefs', desc: 'Professionally trained hibachi masters' },
                  { title: 'Premium Ingredients', desc: 'Fresh, high-quality selections' },
                  { title: 'Full Service Catering', desc: 'Setup to cleanup included' },
                  { title: 'Interactive Experience', desc: 'Live cooking entertainment' }
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-zinc-900/30 border border-zinc-800/50">
                    <div className="w-10 h-10 rounded-lg bg-red-600/10 border border-red-600/20 flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-zinc-100 font-semibold mb-1">{item.title}</h4>
                      <p className="text-sm text-zinc-500">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column - Image Placeholder / Stats */}
            <div className="space-y-6">
              {/* Large Feature Card */}
              <div className="relative p-8 rounded-2xl bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800 overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/10 rounded-full blur-2xl" />
                <div className="relative">
                  <div className="text-6xl font-bold text-red-600 mb-2">5.0</div>
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-zinc-400">Rated 5.0 from 28 verified reviews on Google</p>
                </div>
              </div>

              {/* Stats Row */}
              <div className="grid grid-cols-2 gap-6">
                <div className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800">
                  <div className="text-3xl font-bold text-red-600 mb-1">500+</div>
                  <div className="text-sm text-zinc-400">Events Catered</div>
                </div>
                <div className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800">
                  <div className="text-3xl font-bold text-red-600 mb-1">5.0</div>
                  <div className="text-sm text-zinc-400">Star Rating</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* === MENU SHOWCASE SECTION === */}
      <section className="relative py-32 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-zinc-800 bg-zinc-900/50 backdrop-blur-sm mb-6">
              <span className="text-xs font-medium text-zinc-400 uppercase tracking-widest">Our Menu</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-light text-zinc-100 mb-6">
              Featured Hibachi Dishes
            </h2>
            <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
              Premium quality ingredients prepared fresh at your event
            </p>
          </div>

          {/* Menu Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {/* Dish 1 */}
            <div className="group relative rounded-2xl overflow-hidden bg-zinc-900/50 border border-zinc-800 hover:border-zinc-700 transition-all duration-300">
              <div className="aspect-square relative overflow-hidden">
                <img 
                  src="/menu-filet-mignon.jpg" 
                  alt="Filet Mignon Hibachi"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/50 to-transparent opacity-60" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-zinc-100 mb-2">Filet Mignon</h3>
                <p className="text-zinc-400 text-sm mb-4">Premium beef tenderloin, perfectly grilled with hibachi vegetables and signature sauces</p>
                <div className="flex items-center justify-between">
                  <span className="text-red-600 font-semibold">From $65/person</span>
                </div>
              </div>
            </div>

            {/* Dish 2 */}
            <div className="group relative rounded-2xl overflow-hidden bg-zinc-900/50 border border-zinc-800 hover:border-zinc-700 transition-all duration-300">
              <div className="aspect-square relative overflow-hidden">
                <img 
                  src="/menu-lobster-tail.jpg" 
                  alt="Lobster Tail Hibachi"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/50 to-transparent opacity-60" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-zinc-100 mb-2">Lobster Tail</h3>
                <p className="text-zinc-400 text-sm mb-4">Fresh lobster tail grilled to perfection with garlic butter and lemon</p>
                <div className="flex items-center justify-between">
                  <span className="text-red-600 font-semibold">From $75/person</span>
                </div>
              </div>
            </div>

            {/* Dish 3 */}
            <div className="group relative rounded-2xl overflow-hidden bg-zinc-900/50 border border-zinc-800 hover:border-zinc-700 transition-all duration-300">
              <div className="aspect-square relative overflow-hidden">
                <img 
                  src="/menu-shrimp-combo.jpg" 
                  alt="Shrimp Combo Hibachi"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/50 to-transparent opacity-60" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-zinc-100 mb-2">Shrimp & Steak</h3>
                <p className="text-zinc-400 text-sm mb-4">Succulent shrimp paired with tender New York steak, hibachi style</p>
                <div className="flex items-center justify-between">
                  <span className="text-red-600 font-semibold">From $55/person</span>
                </div>
              </div>
            </div>

            {/* Dish 4 */}
            <div className="group relative rounded-2xl overflow-hidden bg-zinc-900/50 border border-zinc-800 hover:border-zinc-700 transition-all duration-300">
              <div className="aspect-square relative overflow-hidden">
                <img 
                  src="/menu-chicken-hibachi.jpg" 
                  alt="Chicken Hibachi"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/50 to-transparent opacity-60" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-zinc-100 mb-2">Chicken Hibachi</h3>
                <p className="text-zinc-400 text-sm mb-4">Tender chicken breast with seasonal vegetables and teriyaki glaze</p>
                <div className="flex items-center justify-between">
                  <span className="text-red-600 font-semibold">From $40/person</span>
                </div>
              </div>
            </div>
          </div>

          {/* View Full Menu CTA */}
          <div className="text-center mt-12">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 px-8 py-4 bg-zinc-900/50 border-2 border-zinc-800 rounded-lg font-medium text-zinc-300 hover:bg-zinc-800/50 hover:border-zinc-700 transition-all"
            >
              View Full Menu & Packages
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* === GALLERY PREVIEW SECTION === */}
      <section className="relative py-32 bg-black">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-zinc-800 bg-zinc-900/50 backdrop-blur-sm mb-6">
              <span className="text-xs font-medium text-zinc-400 uppercase tracking-widest">Our Work</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-light text-zinc-100 mb-6">
              Recent Events
            </h2>
            <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
              See our hibachi catering in action at real events
            </p>
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              { src: '/gallery-event-wedding-1.jpg', alt: 'Wedding Reception Hibachi' },
              { src: '/gallery-event-corporate-1.jpg', alt: 'Corporate Event Catering' },
              { src: '/gallery-food-steak-1.jpg', alt: 'Hibachi Steak Cooking' },
              { src: '/gallery-chef-cooking-1.jpg', alt: 'Chef Cooking Performance' },
              { src: '/gallery-event-party-1.jpg', alt: 'Private Party Setup' },
              { src: '/gallery-food-shrimp-1.jpg', alt: 'Fresh Shrimp Hibachi' },
              { src: '/gallery-setup-grill-1.jpg', alt: 'Professional Hibachi Setup' },
              { src: '/gallery-event-celebration-1.jpg', alt: 'Celebration Event' }
            ].map((image, i) => (
              <div
                key={i}
                className="group relative aspect-square rounded-xl overflow-hidden bg-zinc-900 border border-zinc-800 hover:border-red-600/50 transition-all duration-300"
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-white text-sm font-medium">{image.alt}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* View Gallery CTA */}
          <div className="text-center mt-12">
            <Link
              href="/gallery"
              className="inline-flex items-center gap-2 px-8 py-4 bg-red-600 hover:bg-red-700 rounded-lg font-medium text-white transition-all"
            >
              View Full Gallery
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* === TESTIMONIALS SECTION === */}
      <section className="relative py-32 bg-zinc-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-zinc-800 bg-zinc-950/50 backdrop-blur-sm mb-6">
              <span className="text-xs font-medium text-zinc-400 uppercase tracking-widest">Client Reviews</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-light text-zinc-100 mb-6">
              What Our Clients Say
            </h2>
            <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
              Trusted by hundreds of satisfied customers across Orange County
            </p>
          </div>

          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Testimonial 1 */}
            <div className="bg-zinc-950/50 border border-zinc-800 rounded-2xl p-8 hover:border-red-600/30 transition-all">
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-zinc-300 mb-6 leading-relaxed">
                "Fire Up Hibachi made our corporate event absolutely unforgettable! The chef was entertaining, the food was incredible, and our entire team couldn't stop talking about it. Highly recommend!"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-red-600/10 flex items-center justify-center text-red-600 font-bold text-lg">
                  JS
                </div>
                <div>
                  <p className="text-zinc-100 font-semibold">Jennifer S.</p>
                  <p className="text-zinc-500 text-sm">Corporate Event, Irvine</p>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-zinc-950/50 border border-zinc-800 rounded-2xl p-8 hover:border-red-600/30 transition-all">
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-zinc-300 mb-6 leading-relaxed">
                "We hired Fire Up Hibachi for our wedding reception and it was the BEST decision! Our guests are still raving about the food and entertainment. The chef was professional and amazing!"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-red-600/10 flex items-center justify-center text-red-600 font-bold text-lg">
                  MR
                </div>
                <div>
                  <p className="text-zinc-100 font-semibold">Michael & Rachel</p>
                  <p className="text-zinc-500 text-sm">Wedding Reception, Newport Beach</p>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-zinc-950/50 border border-zinc-800 rounded-2xl p-8 hover:border-red-600/30 transition-all">
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-zinc-300 mb-6 leading-relaxed">
                "Amazing experience from start to finish! The hibachi setup in our backyard was professional, the food quality was restaurant-grade, and the whole process was stress-free. Will definitely book again!"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-red-600/10 flex items-center justify-center text-red-600 font-bold text-lg">
                  DL
                </div>
                <div>
                  <p className="text-zinc-100 font-semibold">David L.</p>
                  <p className="text-zinc-500 text-sm">Private Party, Tustin</p>
                </div>
              </div>
            </div>
          </div>

          {/* Google Reviews Badge */}
          <div className="mt-16 text-center">
            <div className="inline-flex items-center gap-4 px-8 py-4 bg-zinc-950/50 border border-zinc-800 rounded-2xl">
              <div>
                <div className="flex gap-1 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-zinc-100 font-semibold text-2xl">5.0 Rating</p>
              </div>
              <div className="w-px h-12 bg-zinc-700"></div>
              <div>
                <p className="text-zinc-400 text-sm">Based on</p>
                <p className="text-zinc-100 font-semibold text-2xl">28+ Reviews</p>
              </div>
              <div className="w-px h-12 bg-zinc-700"></div>
              <div>
                <p className="text-zinc-400 text-sm">Platform</p>
                <p className="text-zinc-100 font-semibold text-lg">Google Reviews</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* === SERVICE AREAS SECTION === */}
      <section className="relative py-32 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-zinc-800 bg-zinc-900/50 backdrop-blur-sm mb-6">
              <span className="text-xs font-medium text-zinc-400 uppercase tracking-widest">Service Areas</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-light text-zinc-100 mb-4">
              Serving Irvine & Orange County
            </h2>
            <p className="text-xl text-zinc-400">
              Irvine • Newport Beach • Tustin • Lake Forest • Laguna Beach & More
            </p>
          </div>

          {/* Cities Grid - 5 Columns */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {['Irvine', 'Newport Beach', 'Tustin', 'Lake Forest', 'Laguna Beach', 'Costa Mesa', 'Mission Viejo', 'Laguna Niguel', 'Aliso Viejo', 'Huntington Beach'].map((city, i) => (
              <div
                key={i}
                className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900/70 transition-all text-center"
              >
                <div className="flex items-center justify-center gap-2">
                  <svg className="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm font-medium text-zinc-300">{city}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* === FINAL CTA SECTION === */}
      <section className="relative py-32 bg-gradient-to-b from-black to-zinc-950 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,140,0,0.1),transparent_50%)]" />
        
        <div className="relative max-w-5xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-6xl font-light text-zinc-100 mb-6">
            Ready to Fire Up
            <br />
            <span className="bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">Your Event?</span>
          </h2>
          
          <p className="text-xl text-zinc-400 mb-12 max-w-2xl mx-auto">
            Book your hibachi catering experience today. Let our expert chefs create an unforgettable culinary event for your guests.
          </p>

          {/* CTA Buttons Row */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:(858) 434-7166"
              className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-gradient-to-r from-red-600 to-red-700 rounded-lg font-semibold text-lg text-white hover:shadow-2xl hover:shadow-red-600/40 transition-all duration-300"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              (858) 434-7166
            </a>
            
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-zinc-900/50 border-2 border-zinc-800 rounded-lg font-semibold text-lg text-zinc-300 hover:bg-zinc-800/50 hover:border-zinc-700 backdrop-blur-sm transition-all duration-300"
            >
              Get Free Quote
            </Link>
          </div>

          {/* Contact Info */}
          <div className="mt-16 pt-8 border-t border-zinc-800">
            <p className="text-zinc-500 flex items-center justify-center gap-2">
              <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              Serving Irvine & Orange County, California
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
