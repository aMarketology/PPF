'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, User, LogOut, Settings, Briefcase } from 'lucide-react'

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [isSignedIn, setIsSignedIn] = useState(false) // TODO: Replace with actual auth state
  const userMenuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 backdrop-blur-lg shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex-shrink-0">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center"
            >
              <Image
                src="/fireup-logo.png"
                alt="Precision Product Flow"
                width={120}
                height={120}
                className="h-16 w-auto"
              />
            </motion.div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-8 items-center">
            {['Home', 'Marketplace', 'Contact'].map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  href={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                  className={`font-medium transition-colors relative group ${
                    scrolled
                      ? 'text-gray-900 hover:text-blue-600'
                      : 'text-gray-900 hover:text-blue-600'
                  }`}
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full" />
                </Link>
              </motion.div>
            ))}
            
            {/* User Menu Dropdown */}
            <motion.div
              ref={userMenuRef}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="relative"
            >
              {isSignedIn ? (
                // Signed In - User Menu
                <>
                  <motion.button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center gap-2 bg-white border-2 border-gray-200 hover:border-blue-500 text-gray-900 font-semibold px-4 py-2 rounded-lg transition-all"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-sm font-bold">
                      JD
                    </div>
                    <span>John Doe</span>
                    <ChevronDown className={`h-4 w-4 transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} />
                  </motion.button>

                  <AnimatePresence>
                    {userMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden"
                      >
                        <div className="p-3 bg-gradient-to-br from-blue-50 to-slate-50 border-b border-gray-200">
                          <p className="font-semibold text-gray-900">John Doe</p>
                          <p className="text-sm text-gray-600">john@example.com</p>
                        </div>
                        <div className="py-2">
                          <Link
                            href="/dashboard"
                            className="flex items-center gap-3 px-4 py-2.5 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                            onClick={() => setUserMenuOpen(false)}
                          >
                            <Briefcase className="h-4 w-4" />
                            <span>Dashboard</span>
                          </Link>
                          <Link
                            href="/profile"
                            className="flex items-center gap-3 px-4 py-2.5 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                            onClick={() => setUserMenuOpen(false)}
                          >
                            <User className="h-4 w-4" />
                            <span>Profile</span>
                          </Link>
                          <Link
                            href="/settings"
                            className="flex items-center gap-3 px-4 py-2.5 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                            onClick={() => setUserMenuOpen(false)}
                          >
                            <Settings className="h-4 w-4" />
                            <span>Settings</span>
                          </Link>
                          <div className="border-t border-gray-200 my-2"></div>
                          <button
                            onClick={() => {
                              setIsSignedIn(false)
                              setUserMenuOpen(false)
                            }}
                            className="flex items-center gap-3 w-full px-4 py-2.5 text-red-600 hover:bg-red-50 transition-colors"
                          >
                            <LogOut className="h-4 w-4" />
                            <span>Sign Out</span>
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </>
              ) : (
                // Signed Out - Sign Up/Login Dropdown
                <>
                  <motion.button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold px-6 py-2.5 rounded-lg transition-all shadow-md hover:shadow-lg"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span>Get Started</span>
                    <ChevronDown className={`h-4 w-4 transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} />
                  </motion.button>

                  <AnimatePresence>
                    {userMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden"
                      >
                        <div className="p-4">
                          <Link
                            href="/signup"
                            className="block w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-center font-semibold px-6 py-3 rounded-lg transition-all shadow-md mb-3"
                            onClick={() => setUserMenuOpen(false)}
                          >
                            Sign Up
                          </Link>
                          <Link
                            href="/login"
                            className="block w-full bg-white border-2 border-gray-200 hover:border-blue-500 text-gray-900 text-center font-semibold px-6 py-3 rounded-lg transition-all"
                            onClick={() => setUserMenuOpen(false)}
                          >
                            Log In
                          </Link>
                        </div>
                        <div className="bg-gradient-to-br from-blue-50 to-slate-50 px-4 py-3 border-t border-gray-200">
                          <p className="text-xs text-gray-600 text-center">
                            Join 2,000+ engineers and clients on our platform
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </>
              )}
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden flex flex-col gap-1.5 z-50"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            whileTap={{ scale: 0.9 }}
          >
            <motion.div
              className={`w-6 h-0.5 transition-all ${
                scrolled ? 'bg-gray-900' : 'bg-gray-900'
              }`}
              animate={{
                rotate: mobileMenuOpen ? 45 : 0,
                y: mobileMenuOpen ? 8 : 0,
              }}
            />
            <motion.div
              className={`w-6 h-0.5 transition-all ${
                scrolled ? 'bg-gray-900' : 'bg-gray-900'
              }`}
              animate={{
                opacity: mobileMenuOpen ? 0 : 1,
              }}
            />
            <motion.div
              className={`w-6 h-0.5 transition-all ${
                scrolled ? 'bg-gray-900' : 'bg-gray-900'
              }`}
              animate={{
                rotate: mobileMenuOpen ? -45 : 0,
                y: mobileMenuOpen ? -8 : 0,
              }}
            />
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden overflow-hidden"
            >
              <div className="py-4 space-y-1 bg-white/95 backdrop-blur-lg rounded-lg mt-4 shadow-xl">
                {['Home', 'Marketplace', 'Contact'].map((item, index) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      href={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                      className="block px-4 py-3 text-gray-900 hover:bg-blue-50 hover:text-blue-600 transition font-medium rounded"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item}
                    </Link>
                  </motion.div>
                ))}
                
                {isSignedIn ? (
                  // Signed In Mobile Menu
                  <>
                    <div className="border-t border-gray-200 my-2"></div>
                    <div className="px-4 py-3 bg-gradient-to-br from-blue-50 to-slate-50 rounded-lg mx-2">
                      <p className="font-semibold text-gray-900">John Doe</p>
                      <p className="text-sm text-gray-600">john@example.com</p>
                    </div>
                    <Link
                      href="/dashboard"
                      className="flex items-center gap-3 px-4 py-3 text-gray-900 hover:bg-blue-50 hover:text-blue-600 transition font-medium rounded"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Briefcase className="h-4 w-4" />
                      <span>Dashboard</span>
                    </Link>
                    <Link
                      href="/profile"
                      className="flex items-center gap-3 px-4 py-3 text-gray-900 hover:bg-blue-50 hover:text-blue-600 transition font-medium rounded"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <User className="h-4 w-4" />
                      <span>Profile</span>
                    </Link>
                    <Link
                      href="/settings"
                      className="flex items-center gap-3 px-4 py-3 text-gray-900 hover:bg-blue-50 hover:text-blue-600 transition font-medium rounded"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Settings className="h-4 w-4" />
                      <span>Settings</span>
                    </Link>
                    <div className="border-t border-gray-200 my-2"></div>
                    <button
                      onClick={() => {
                        setIsSignedIn(false)
                        setMobileMenuOpen(false)
                      }}
                      className="flex items-center gap-3 w-full px-4 py-3 text-red-600 hover:bg-red-50 transition font-medium rounded"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Sign Out</span>
                    </button>
                  </>
                ) : (
                  // Signed Out Mobile Menu
                  <>
                    <div className="px-4 pt-2 space-y-2">
                      <Link
                        href="/signup"
                        className="block w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-center font-semibold px-6 py-3 rounded-lg transition shadow-md"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Sign Up
                      </Link>
                      <Link
                        href="/login"
                        className="block w-full bg-white border-2 border-gray-200 hover:border-blue-500 text-gray-900 text-center font-semibold px-6 py-3 rounded-lg transition"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Log In
                      </Link>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  )
}
