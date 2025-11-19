'use client'

import Navigation from '../components/Navigation'
import Footer from '../components/Footer'
import Link from 'next/link'

export default function Services() {
  return (
    <div className="min-h-screen bg-zinc-950 flex-col">
      <Navigation />

      {/* Page Header */}
      <section className="bg-gradient-to-br from-zinc-900 to-black text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">Our Services</h1>
          <p className="text-xl text-zinc-300">Premium Hibachi Catering for Every Occasion in Irvine & Orange County</p>
        </div>
      </section>

      {/* Services Detail */}
      <section className="flex-1 py-16 px-4 bg-zinc-950">
        <div className="max-w-6xl mx-auto space-y-16">

          {/* Service 1: Corporate & Private Events */}
          <div className="bg-zinc-900/50 border border-zinc-800 p-8 md:p-12 rounded-2xl shadow-xl">
            <h2 className="text-4xl font-bold text-zinc-100 mb-4">Corporate & Private Events</h2>
            <p className="text-xl text-red-600 font-semibold mb-6 pb-4 border-b-2 border-red-600">
              Professional hibachi catering that transforms your corporate gatherings into unforgettable experiences
            </p>

            <h3 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Perfect For:</h3>
            <p className="text-zinc-300 leading-relaxed mb-8">
              Elevate your corporate events with our interactive hibachi catering. Our expert chefs bring the excitement of traditional Japanese hibachi cooking directly to your venue, creating an engaging atmosphere that your team and clients will remember.
            </p>

            <Link href="/contact" className="inline-block bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-8 rounded-lg transition transform hover:-translate-y-1 shadow-lg">
              Request Quote
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
