'use client'

import Navigation from '../components/Navigation'
import Footer from '../components/Footer'
import Link from 'next/link'

export default function About() {
  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col">
      <Navigation />

      {/* Page Header */}
      <section className="bg-gradient-to-br from-zinc-900 to-black text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">About Fire Up Hibachi</h1>
          <p className="text-xl text-zinc-300">Bringing authentic hibachi excellence to Orange County since 2003</p>
        </div>
      </section>

      {/* Main Content */}
      <section className="flex-1 py-16 px-4 bg-zinc-950">
        <div className="max-w-6xl mx-auto">
          
          {/* Our Story Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
            {/* Image */}
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800">
                <img 
                  src="/about-team-photo.jpg" 
                  alt="Fire Up Hibachi Team"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Decorative element */}
              <div className="absolute -bottom-6 -right-6 w-72 h-72 bg-red-600/10 rounded-full blur-3xl -z-10" />
            </div>

            {/* Content */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-zinc-800 bg-zinc-900/50 backdrop-blur-sm">
                <span className="text-xs font-medium text-zinc-400 uppercase tracking-widest">Our Story</span>
              </div>

              <h2 className="text-4xl font-bold text-zinc-100">
                Over 20 Years of 
                <span className="block text-red-600">Hibachi Excellence</span>
              </h2>

              <p className="text-lg text-zinc-400 leading-relaxed">
                Fire Up Hibachi was founded in 2003 with a simple mission: bring the authentic Japanese hibachi experience directly to our clients' events. What started as a small catering operation has grown into Orange County's premier hibachi catering service.
              </p>

              <p className="text-lg text-zinc-400 leading-relaxed">
                Our master chefs are trained in traditional Japanese cooking techniques and bring years of experience to every event. We've had the honor of serving thousands of satisfied customers at weddings, corporate events, private parties, and celebrations across Southern California.
              </p>

              <div className="grid grid-cols-3 gap-6 pt-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-red-600 mb-2">20+</div>
                  <div className="text-sm text-zinc-400">Years Experience</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-red-600 mb-2">5000+</div>
                  <div className="text-sm text-zinc-400">Events Catered</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-red-600 mb-2">100%</div>
                  <div className="text-sm text-zinc-400">Satisfaction</div>
                </div>
              </div>
            </div>
          </div>

          {/* Mission & Values */}
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-12 mb-20">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-zinc-100 mb-4">Our Mission</h2>
              <p className="text-xl text-zinc-400 max-w-3xl mx-auto">
                To deliver exceptional hibachi catering experiences that exceed expectations and create unforgettable memories for every event we serve.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-red-600/10 border border-red-600/20 flex items-center justify-center">
                  <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-zinc-100 mb-3">Quality First</h3>
                <p className="text-zinc-400">Premium ingredients, expert preparation, and attention to every detail</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-red-600/10 border border-red-600/20 flex items-center justify-center">
                  <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-zinc-100 mb-3">Customer Focused</h3>
                <p className="text-zinc-400">Your satisfaction is our priority from first contact to final cleanup</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-red-600/10 border border-red-600/20 flex items-center justify-center">
                  <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-zinc-100 mb-3">Authentic Experience</h3>
                <p className="text-zinc-400">Traditional techniques combined with modern culinary innovation</p>
              </div>
            </div>
          </div>

          {/* What Makes Us Different */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-zinc-800 bg-zinc-900/50 backdrop-blur-sm mb-6">
                <span className="text-xs font-medium text-zinc-400 uppercase tracking-widest">Why Choose Us</span>
              </div>
              <h2 className="text-4xl font-bold text-zinc-100 mb-4">What Makes Us Different</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  title: 'Master Hibachi Chefs',
                  desc: 'Our chefs are trained in authentic Japanese hibachi techniques with years of professional experience',
                  icon: '👨‍🍳'
                },
                {
                  title: 'Premium Ingredients',
                  desc: 'We source only the highest quality meats, seafood, and fresh vegetables for every event',
                  icon: '🥩'
                },
                {
                  title: 'Professional Equipment',
                  desc: 'Commercial-grade hibachi grills and equipment for authentic cooking and safety',
                  icon: '🔥'
                },
                {
                  title: 'Full Service',
                  desc: 'Complete setup, cooking, service, and cleanup - we handle everything',
                  icon: '✨'
                },
                {
                  title: 'Licensed & Insured',
                  desc: 'Fully licensed catering operation with comprehensive liability insurance',
                  icon: '✓'
                },
                {
                  title: 'Flexible Menus',
                  desc: 'Customizable options to accommodate dietary restrictions and preferences',
                  icon: '📋'
                }
              ].map((item, i) => (
                <div key={i} className="flex gap-4 p-6 bg-zinc-900/50 border border-zinc-800 rounded-xl hover:border-red-600/30 transition-all">
                  <div className="text-4xl flex-shrink-0">{item.icon}</div>
                  <div>
                    <h3 className="text-xl font-bold text-zinc-100 mb-2">{item.title}</h3>
                    <p className="text-zinc-400">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-zinc-900 to-black text-white py-20 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Experience Fire Up Hibachi?</h2>
          <p className="text-xl text-zinc-300 mb-8">
            Let us make your next event unforgettable with premium hibachi catering
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="tel:(858) 434-7166" 
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-10 rounded-lg inline-flex items-center justify-center gap-2 transition transform hover:-translate-y-1 shadow-lg"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              (858) 434-7166
            </a>
            <Link
              href="/contact"
              className="bg-zinc-800 border-2 border-zinc-700 hover:bg-zinc-700 text-white font-bold py-4 px-10 rounded-lg inline-block transition transform hover:-translate-y-1"
            >
              Request Event Quote
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
