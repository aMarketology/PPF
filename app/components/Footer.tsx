'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export default function Footer() {
  const services = [
    'Epoxy Garage Floors',
    'Metallic Resin Floors',
    'Concrete Polishing',
  ]

  const quickLinks = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ]

  const serviceAreas = [
    'Tampa', 'St. Petersburg', 'Clearwater', 'Brandon', 'Riverview'
  ]

  return (
    <footer className="bg-gradient-to-b from-black to-gray-900 text-white border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4">
        {/* Main Footer Content */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">{}
          {/* Company Info */}
          <div>
            <motion.div
              className="mb-6"
              whileHover={{ scale: 1.02 }}
            >
              <div className="text-2xl font-bold leading-none mb-1">Tampa Bay</div>
              <div className="text-2xl font-bold leading-none">
                Concrete <span className="text-red-600">Coatings</span>
              </div>
            </motion.div>
            <p className="text-gray-400 mb-6 text-sm leading-relaxed">
              Professional concrete coating solutions for residential and commercial properties in Tampa Bay.
            </p>
            <div className="flex gap-4">
              <motion.a
                href="#"
                className="w-10 h-10 bg-white/10 hover:bg-red-600 rounded-full flex items-center justify-center transition"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </motion.a>
              <motion.a
                href="#"
                className="w-10 h-10 bg-white/10 hover:bg-red-600 rounded-full flex items-center justify-center transition"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.011 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.011 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.011-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073z" />
                </svg>
              </motion.a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-white">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-red-600 transition flex items-center gap-2 group"
                  >
                    <span className="w-0 h-0.5 bg-red-600 group-hover:w-4 transition-all" />
                    {link.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-white">Our Services</h3>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-gray-400 flex items-center gap-2"
                >
                  <svg className="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  {service}
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-white">Contact Us</h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="tel:(727) 743-7242"
                  className="text-red-600 hover:text-orange-400 transition font-semibold flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                  </svg>
                  (727) 743-7242
                </a>
              </li>
              <li className="text-gray-400 text-sm flex items-start gap-2">
                <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                386 Tavernier Cir<br />Oldsmar, FL 34677
              </li>
              <li className="text-gray-400 text-sm flex items-start gap-2">
                <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                Mon-Fri: 8am-8pm<br />
                Sat: 9am-4pm
              </li>
            </ul>
          </div>
        </div>

        {/* Service Areas Bar */}
        <div className="py-6 border-t border-white/10">
          <p className="text-center text-gray-400 text-sm mb-3">Proudly Serving:</p>
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-sm">
            {serviceAreas.map((area, index) => (
              <span key={index} className="text-gray-500">
                {area}{index < serviceAreas.length - 1 ? ' •' : ''}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
          <p>&copy; 2024 Tampa Bay Concrete Coatings. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-red-600 transition">Privacy Policy</Link>
            <Link href="#" className="hover:text-red-600 transition">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
