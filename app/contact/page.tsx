'use client'

import Navigation from '../components/Navigation'
import Footer from '../components/Footer'
import EventInquiryForm from '../components/EventInquiryForm'

export default function Contact() {
  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col">
      <Navigation />

      {/* Page Header */}
      <section className="bg-gradient-to-br from-zinc-900 to-black text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">
            Get Your Free Quote
          </h1>
          <p className="text-xl text-zinc-300">
            Let's make your event unforgettable with premium hibachi catering
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="flex-1 py-16 px-4 bg-zinc-950">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Contact Info Sidebar */}
            <div className="lg:col-span-1 space-y-8">
              
              {/* Contact Methods */}
              <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-zinc-100 mb-6">Contact Information</h3>
                
                <div className="space-y-6">
                  {/* Phone */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-red-600/10 border border-red-600/20 flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-zinc-400 mb-1">PHONE</h4>
                      <a href="tel:(858) 434-7166" className="text-lg font-semibold text-red-600 hover:text-red-500 transition">
                        (858) 434-7166
                      </a>
                      <p className="text-sm text-zinc-500 mt-1">Mon-Fri 9am-6pm PST</p>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-red-600/10 border border-red-600/20 flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-zinc-400 mb-1">EMAIL</h4>
                      <a href="mailto:info@fireuphibachi.com" className="text-lg font-semibold text-red-600 hover:text-red-500 transition break-all">
                        info@fireuphibachi.com
                      </a>
                      <p className="text-sm text-zinc-500 mt-1">24-48 hour response</p>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-red-600/10 border border-red-600/20 flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-zinc-400 mb-1">SERVICE AREA</h4>
                      <p className="text-lg font-semibold text-zinc-100">Irvine, CA</p>
                      <p className="text-sm text-zinc-500 mt-1">Serving all of Orange County</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Facts */}
              <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-8">
                <h3 className="text-xl font-bold text-zinc-100 mb-4">Why Choose Us?</h3>
                <ul className="space-y-3">
                  {[
                    'Free consultation & quote',
                    '20+ years experience',
                    'Licensed & insured',
                    'Premium ingredients',
                    'Professional service',
                    'Flexible scheduling'
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-zinc-400">
                      <svg className="w-5 h-5 text-red-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Event Inquiry Form */}
            <div className="lg:col-span-2">
              <EventInquiryForm />
            </div>
          </div>
        </div>
      </section>

      {/* Map Placeholder Section */}
      <section className="py-16 px-4 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
            <div className="aspect-video bg-zinc-800 flex items-center justify-center">
              <div className="text-center">
                <svg className="w-16 h-16 mx-auto mb-4 text-zinc-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <p className="text-zinc-400 font-semibold">Service Area Map</p>
                <p className="text-zinc-600 text-sm mt-2">Serving Irvine & Orange County</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
