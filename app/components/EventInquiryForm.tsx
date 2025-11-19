'use client'

import { useState } from 'react'

export default function EventInquiryForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventType: '',
    eventDate: '',
    guestCount: '',
    eventLocation: '',
    budget: '',
    dietaryRestrictions: '',
    message: ''
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    // TODO: Integrate with form service (Web3Forms, Formspree, etc.)
    console.log('Form submitted:', formData)
    
    // Simulate API call
    setTimeout(() => {
      setSubmitted(true)
      setLoading(false)
      setFormData({
        name: '',
        email: '',
        phone: '',
        eventType: '',
        eventDate: '',
        guestCount: '',
        eventLocation: '',
        budget: '',
        dietaryRestrictions: '',
        message: ''
      })
      setTimeout(() => setSubmitted(false), 5000)
    }, 1000)
  }

  return (
    <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-8 md:p-12">
      <h2 className="text-3xl font-bold text-zinc-100 mb-2">Event Inquiry Form</h2>
      <p className="text-zinc-400 mb-8">Fill out the form below and we'll get back to you within 24 hours</p>
      
      {submitted && (
        <div className="mb-8 p-4 bg-green-500/10 border border-green-500/20 rounded-xl">
          <div className="flex items-center gap-3">
            <svg className="w-6 h-6 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <div>
              <p className="text-green-500 font-semibold">Thank you for your inquiry!</p>
              <p className="text-green-400 text-sm">We'll contact you within 24 hours to discuss your event.</p>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Contact Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-semibold text-zinc-300 mb-2">
              Full Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="John Doe"
              className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-lg text-zinc-100 placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-semibold text-zinc-300 mb-2">
              Phone Number *
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              placeholder="(555) 123-4567"
              className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-lg text-zinc-100 placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition"
            />
          </div>
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-zinc-300 mb-2">
            Email Address *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="john@example.com"
            className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-lg text-zinc-100 placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition"
          />
        </div>

        {/* Event Details */}
        <div className="pt-4 border-t border-zinc-800">
          <h3 className="text-xl font-bold text-zinc-100 mb-4">Event Details</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="eventType" className="block text-sm font-semibold text-zinc-300 mb-2">
                Event Type *
              </label>
              <select
                id="eventType"
                name="eventType"
                value={formData.eventType}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-lg text-zinc-100 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition"
              >
                <option value="">Select event type</option>
                <option value="corporate">Corporate Event</option>
                <option value="wedding">Wedding Reception</option>
                <option value="rehearsal">Rehearsal Dinner</option>
                <option value="birthday">Birthday Party</option>
                <option value="anniversary">Anniversary</option>
                <option value="graduation">Graduation</option>
                <option value="private">Private Party</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label htmlFor="eventDate" className="block text-sm font-semibold text-zinc-300 mb-2">
                Event Date *
              </label>
              <input
                type="date"
                id="eventDate"
                name="eventDate"
                value={formData.eventDate}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-lg text-zinc-100 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div>
              <label htmlFor="guestCount" className="block text-sm font-semibold text-zinc-300 mb-2">
                Number of Guests *
              </label>
              <select
                id="guestCount"
                name="guestCount"
                value={formData.guestCount}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-lg text-zinc-100 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition"
              >
                <option value="">Select guest count</option>
                <option value="10-25">10-25 guests</option>
                <option value="25-50">25-50 guests</option>
                <option value="50-75">50-75 guests</option>
                <option value="75-100">75-100 guests</option>
                <option value="100+">100+ guests</option>
              </select>
            </div>

            <div>
              <label htmlFor="budget" className="block text-sm font-semibold text-zinc-300 mb-2">
                Estimated Budget
              </label>
              <select
                id="budget"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-lg text-zinc-100 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition"
              >
                <option value="">Select budget range</option>
                <option value="under-1000">Under $1,000</option>
                <option value="1000-2500">$1,000 - $2,500</option>
                <option value="2500-5000">$2,500 - $5,000</option>
                <option value="5000-10000">$5,000 - $10,000</option>
                <option value="10000+">$10,000+</option>
              </select>
            </div>
          </div>

          <div className="mt-6">
            <label htmlFor="eventLocation" className="block text-sm font-semibold text-zinc-300 mb-2">
              Event Location/City *
            </label>
            <input
              type="text"
              id="eventLocation"
              name="eventLocation"
              value={formData.eventLocation}
              onChange={handleChange}
              required
              placeholder="Irvine, CA"
              className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-lg text-zinc-100 placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition"
            />
          </div>

          <div className="mt-6">
            <label htmlFor="dietaryRestrictions" className="block text-sm font-semibold text-zinc-300 mb-2">
              Dietary Restrictions/Allergies
            </label>
            <input
              type="text"
              id="dietaryRestrictions"
              name="dietaryRestrictions"
              value={formData.dietaryRestrictions}
              onChange={handleChange}
              placeholder="Vegetarian, gluten-free, nut allergies, etc."
              className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-lg text-zinc-100 placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition"
            />
          </div>
        </div>

        {/* Additional Information */}
        <div>
          <label htmlFor="message" className="block text-sm font-semibold text-zinc-300 mb-2">
            Additional Details
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Tell us more about your event, special requests, or any questions you have..."
            rows={5}
            className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-lg text-zinc-100 placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent resize-none transition"
          ></textarea>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-red-600 hover:bg-red-700 disabled:bg-zinc-700 disabled:cursor-not-allowed text-white font-bold py-4 px-6 rounded-lg transition transform hover:-translate-y-1 disabled:transform-none shadow-lg flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Sending...
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
              Send Event Inquiry
            </>
          )}
        </button>

        <p className="text-sm text-zinc-500 text-center">
          By submitting this form, you agree to be contacted about your event inquiry
        </p>
      </form>
    </div>
  )
}
