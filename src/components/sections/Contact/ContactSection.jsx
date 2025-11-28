import React, { useState } from 'react';
import { MapPin, Mail, Phone, Instagram } from 'lucide-react';

const designTokens = {
  colors: {
    primary: {
      blue: '#1e40af',
      orange: '#f97316',
    },
    neutral: {
      white: '#ffffff',
      black: '#000000',
      gray: {
        50: '#f9fafb',
        100: '#f3f4f6',
        200: '#e5e7eb',
        300: '#d1d5db',
        400: '#9ca3af',
        500: '#6b7280',
        600: '#4b5563',
        700: '#374151',
        800: '#1f2937',
        900: '#111827',
      },
    },
  },
  typography: {
    h2: 'text-2xl sm:text-3xl lg:text-4xl font-bold',
    h3: 'text-lg sm:text-xl lg:text-2xl font-bold',
    bodyLg: 'text-sm md:text-base lg:text-lg leading-relaxed',
    bodyBase: 'text-xs md:text-sm lg:text-base leading-relaxed',
    label: 'text-xs md:text-sm font-medium',
  },
  spacing: {
    section: 'py-16 md:py-24 lg:py-32',
    container: 'container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl',
    stack: {
      md: 'space-y-4 md:space-y-6',
      lg: 'space-y-6 md:space-y-8',
    },
  },
  shadows: {
    lift: 'shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1',
  },
  transitions: {
    base: 'transition-all duration-300 ease-in-out',
  },
};

const { colors, typography, spacing, shadows, transitions } = designTokens;

const ContactSection = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  });
  const [focusedField, setFocusedField] = useState(null);
  const [submitStatus, setSubmitStatus] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.firstName && formData.lastName && formData.email && formData.message) {
      console.log('Form submitted:', formData);
      setSubmitStatus('success');
      setFormData({ firstName: '', lastName: '', email: '', message: '' });
      setTimeout(() => setSubmitStatus(''), 3000);
    } else {
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus(''), 3000);
    }
  };

  return (
    <>
      <style>{`
        h1, h2, h3, h4, h5, h6 {
          font-family: 'Playfair Display', serif;
        }
        body, p, span, button, div {
          font-family: 'Lato', sans-serif;
        }
      `}</style>
      
      <section id="contact-form" className={`${spacing.section} bg-white`}>
        <div className={spacing.container}>
          
          {/* ===== SECTION HEADER ===== */}
          <div className="mb-16">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-px" style={{ backgroundColor: colors.primary.orange }}></div>
              <span className="text-xs font-semibold tracking-widest uppercase text-gray-500">Get In Touch</span>
            </div>
            
            <h2 className={`${typography.h2} mb-6`} style={{ color: colors.neutral.gray[900] }}>
              Let's <span style={{ color: colors.primary.orange }}>Connect</span>
            </h2>
            
            <p className={`${typography.bodyLg} max-w-2xl`} style={{ color: colors.neutral.gray[600] }}>
              We're here to answer your questions and discuss how we can help bring your vision to life
            </p>
          </div>

          {/* ===== MAIN CONTENT GRID ===== */}
          <div className="grid lg:grid-cols-5 gap-8">
            
            {/* ===== CONTACT INFO CARDS (2 columns) ===== */}
            <div className={`lg:col-span-2 ${spacing.stack.lg}`}>
              
              {/* Location Card */}
              <div className={`group bg-white rounded-2xl overflow-hidden ${shadows.lift} border border-gray-100`}>
                <div className="w-full h-48 bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3955.2!2d110.5!3d-7.7!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zN8KwNDInMDAuMCJTIDExMMKwMzAnMDAuMCJF!5e0!3m2!1sen!2sid!4v1234567890"
                    className="w-full h-full border-0"
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Location Map"
                  ></iframe>
                </div>
                
                <div className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center w-10 h-10 rounded-lg" style={{ backgroundColor: colors.primary.orange }}>
                        <MapPin className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <h3 className={`${typography.h3} mb-3`} style={{ color: colors.primary.blue }}>
                        Our Location
                      </h3>
                      <p className={`${typography.bodyBase} mb-4`} style={{ color: colors.neutral.gray[600] }}>
                        Jalan Jombor Poka, RT.01/RW.01, Jayan, Jombor<br />
                        Kec. Ceper, Kabupaten Klaten<br />
                        Jawa Tengah 57465
                      </p>
                      <a 
                        href="https://maps.google.com/?q=Jalan+Jombor+Poka+RT01+RW01+Jayan+Jombor+Ceper+Klaten+Jawa+Tengah+57465" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className={`inline-flex items-center gap-2 text-sm font-semibold ${transitions.base} hover:gap-3`}
                        style={{ color: colors.primary.orange }}
                      >
                        <span>Get Directions</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Email Card */}
              <div className={`group bg-white rounded-2xl p-6 ${shadows.lift} border border-gray-100`}>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center w-10 h-10 rounded-lg" style={{ backgroundColor: colors.primary.orange }}>
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className={`${typography.h3} mb-3`} style={{ color: colors.primary.blue }}>Email Us</h3>
                    <a href="mailto:info@globalindo-intimates.com" 
                      className={`text-sm break-all ${transitions.base}`}
                      style={{ color: colors.neutral.gray[600] }}
                      onMouseEnter={(e) => e.target.style.color = colors.primary.orange}
                      onMouseLeave={(e) => e.target.style.color = colors.neutral.gray[600]}
                    >
                      info@globalindo-intimates.com
                    </a>
                  </div>
                </div>
              </div>

              {/* Phone Card */}
              <div className={`group bg-white rounded-2xl p-6 ${shadows.lift} border border-gray-100`}>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center w-10 h-10 rounded-lg" style={{ backgroundColor: colors.primary.orange }}>
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className={`${typography.h3} mb-3`} style={{ color: colors.primary.blue }}>Call Us</h3>
                    <a href="tel:0212301120" 
                      className={`text-sm font-medium ${transitions.base}`}
                      style={{ color: colors.neutral.gray[600] }}
                      onMouseEnter={(e) => e.target.style.color = colors.primary.orange}
                      onMouseLeave={(e) => e.target.style.color = colors.neutral.gray[600]}
                    >
                      +62-212-301120
                    </a>
                  </div>
                </div>
              </div>

              {/* Social Card */}
              <div className={`group bg-white rounded-2xl p-6 ${shadows.lift} border border-gray-100`}>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center w-10 h-10 rounded-lg" style={{ backgroundColor: colors.primary.orange }}>
                      <Instagram className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className={`${typography.h3} mb-3`} style={{ color: colors.primary.blue }}>Follow Us</h3>
                    <a href="https://instagram.com/merchantt.globalindo" target="_blank" rel="noopener noreferrer" 
                      className={`text-sm ${transitions.base}`}
                      style={{ color: colors.neutral.gray[600] }}
                      onMouseEnter={(e) => e.target.style.color = colors.primary.orange}
                      onMouseLeave={(e) => e.target.style.color = colors.neutral.gray[600]}
                    >
                      @merchantt.globalindo
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* ===== CONTACT FORM (3 columns) ===== */}
            <div className="lg:col-span-3">
              <form onSubmit={handleSubmit} className={`bg-white rounded-2xl p-8 md:p-10 ${shadows.lift} border border-gray-100`}>
                <h3 className={`${typography.h2} mb-8`} style={{ color: colors.primary.blue }}>
                  Send us a Message
                </h3>
                
                <div className={spacing.stack.md}>
                  {/* Status Messages */}
                  {submitStatus === 'success' && (
                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">
                      ✓ Thank you! Your message has been sent successfully. We'll get back to you soon!
                    </div>
                  )}
                  {submitStatus === 'error' && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                      ✗ Please fill in all required fields.
                    </div>
                  )}

                  {/* Name Fields */}
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* First Name */}
                    <div>
                      <label className={`${typography.label} mb-3 block`} style={{ color: colors.primary.blue }}>
                        First Name
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('firstName')}
                        onBlur={() => setFocusedField(null)}
                        placeholder=""
                        className={`w-full px-4 py-3 bg-gray-50 border-2 rounded-lg focus:outline-none focus:bg-white ${transitions.base}`}
                        style={{
                          borderColor: focusedField === 'firstName' ? colors.primary.orange : colors.neutral.gray[200],
                          boxShadow: focusedField === 'firstName' ? `0 0 0 3px rgba(249, 115, 22, 0.1)` : 'none'
                        }}
                      />
                    </div>

                    {/* Last Name */}
                    <div>
                      <label className={`${typography.label} mb-3 block`} style={{ color: colors.primary.blue }}>
                        Last Name
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('lastName')}
                        onBlur={() => setFocusedField(null)}
                        placeholder=""
                        className={`w-full px-4 py-3 bg-gray-50 border-2 rounded-lg focus:outline-none focus:bg-white ${transitions.base}`}
                        style={{
                          borderColor: focusedField === 'lastName' ? colors.primary.orange : colors.neutral.gray[200],
                          boxShadow: focusedField === 'lastName' ? `0 0 0 3px rgba(249, 115, 22, 0.1)` : 'none'
                        }}
                      />
                    </div>
                  </div>

                  {/* Email Field */}
                  <div>
                    <label className={`${typography.label} mb-3 block`} style={{ color: colors.primary.blue }}>
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField(null)}
                      placeholder=""
                      className={`w-full px-4 py-3 bg-gray-50 border-2 rounded-lg focus:outline-none focus:bg-white ${transitions.base}`}
                      style={{
                        borderColor: focusedField === 'email' ? colors.primary.orange : colors.neutral.gray[200],
                        boxShadow: focusedField === 'email' ? `0 0 0 3px rgba(249, 115, 22, 0.1)` : 'none'
                      }}
                    />
                  </div>

                  {/* Message Field */}
                  <div>
                    <label className={`${typography.label} mb-3 block`} style={{ color: colors.primary.blue }}>
                      Your Message
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('message')}
                      onBlur={() => setFocusedField(null)}
                      placeholder="Tell us about your project or inquiry..."
                      rows="4"
                      className={`w-full px-4 py-3 bg-gray-50 border-2 rounded-lg focus:outline-none focus:bg-white resize-none ${transitions.base}`}
                      style={{
                        borderColor: focusedField === 'message' ? colors.primary.orange : colors.neutral.gray[200],
                        boxShadow: focusedField === 'message' ? `0 0 0 3px rgba(249, 115, 22, 0.1)` : 'none'
                      }}
                    ></textarea>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className={`group relative w-full text-white font-bold py-4 md:py-5 rounded-lg overflow-hidden ${transitions.base} transform hover:-translate-y-1 active:translate-y-0`}
                    style={{ backgroundColor: colors.primary.blue }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-orange-600 transform translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
                    <div className="relative flex items-center justify-center gap-3">
                      <span>Send Message</span>
                      <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </div>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactSection;