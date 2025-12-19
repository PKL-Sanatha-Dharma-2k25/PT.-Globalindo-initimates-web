import React, { useState } from 'react';
import { CheckCircle, AlertCircle } from 'lucide-react';

// ========================================
// DESIGN TOKENS - Imported
// ========================================
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
    h2: 'text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold',
    h3: 'text-lg sm:text-xl lg:text-2xl font-bold',
    bodyLg: 'text-sm md:text-base lg:text-lg leading-relaxed',
    bodyBase: 'text-xs md:text-sm lg:text-base leading-relaxed',
    label: 'text-xs md:text-sm font-medium',
  },
  spacing: {
    section: 'py-10 md:py-14 lg:py-20 xl:py-24',
    container: 'container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl',
    stack: {
      md: 'space-y-4 md:space-y-5 lg:space-y-6',
      lg: 'space-y-5 md:space-y-6 lg:space-y-8',
    },
    gridGap: {
      lg: 'gap-6 md:gap-8',
      xl: 'gap-8 md:gap-10 lg:gap-12',
    },
  },
  shadows: {
    lg: 'shadow-lg',
    xl: 'shadow-xl',
    hover: 'shadow-md hover:shadow-lg transition-shadow duration-300',
    lift: 'shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1',
  },
  transitions: {
    base: 'transition-all duration-300 ease-in-out',
    slow: 'transition-all duration-500 ease-in-out',
  },
  presets: {
    sectionHeader: {
      title: 'text-2xl sm:text-3xl md:text-4xl font-bold mb-2',
      subtitle: 'text-sm md:text-base text-gray-600',
      container: 'mb-8 md:mb-10 lg:mb-12',
    },
    cardHeader: {
      container: 'flex items-center gap-2.5 md:gap-3 mb-3',
      iconOrange: 'w-8 h-8 md:w-9 md:h-9 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center flex-shrink-0',
    },
  },
};

const { colors, typography, spacing, shadows, transitions, presets } = designTokens;

const API_URL = 'http://localhost:5000/api';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [focusedField, setFocusedField] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    setLoading(true);

    // Validasi
    if (!formData.name || !formData.email || !formData.phone || !formData.subject || !formData.message) {
      setError('Mohon lengkapi semua field yang diperlukan!');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`${API_URL}/inquiries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (data.success) {
        setSuccess(true);
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
        setTimeout(() => setSuccess(false), 5000);
      } else {
        setError(data.error || 'Gagal mengirim pesan. Silakan coba lagi.');
      }
    } catch (err) {
      console.error('Submit error:', err);
      setError('Koneksi error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact-form" className={`${spacing.section} bg-white`}>
      <div className={spacing.container}>
        {/* ===== SECTION HEADER ===== */}
        <div className={`mb-16 ${presets.sectionHeader.container}`}>
          {/* Subtitle Label */}
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-px" style={{ backgroundColor: colors.primary.orange }}></div>
            <span className="text-xs font-semibold tracking-widest uppercase text-gray-500">Get In Touch</span>
          </div>
          
          {/* Main Title */}
          <h2 className={`${presets.sectionHeader.title} mb-6 max-w-2xl`} style={{ color: colors.neutral.gray[900] }}>
            Let's <span style={{ color: colors.primary.orange }}>Connect</span>
          </h2>
          
          {/* Subtitle */}
          <p className={`${typography.bodyLg} max-w-xl`} style={{ color: colors.neutral.gray[600] }}>
            We're here to answer your questions and discuss how we can help bring your vision to life
          </p>
        </div>

        {/* ===== MAIN CONTENT GRID ===== */}
        <div className="grid lg:grid-cols-5 gap-8 max-w-7xl mx-auto">
          
          {/* ===== CONTACT INFO CARDS (2 columns) ===== */}
          <div className={`lg:col-span-2 ${spacing.stack.lg}`}>
            
            {/* Location Card */}
            <div className={`group bg-white rounded-xl ${shadows.lift} border border-gray-100`}
              style={{ borderColor: colors.neutral.gray[100] }}>
              {/* Map */}
              <div className="w-full h-48 bg-gray-200 relative overflow-hidden rounded-t-xl">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3955.2!2d110.5!3d-7.7!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zN8KwNDInMDAuMCJTIDExMMKwMzAnMDAuMCJF!5e0!3m2!1sen!2sid!4v1234567890"
                  className="w-full h-full border-0"
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Location Map"
                ></iframe>
              </div>
              
              {/* Content */}
              <div className="p-6">
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg blur opacity-50 group-hover:opacity-75 transition-opacity"></div>
                    <div className={`${presets.cardHeader.iconOrange}`}>
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                  </div>
                  
                  {/* Text */}
                  <div className="flex-1">
                    <h3 className={`${typography.h3} mb-3`} style={{ color: colors.primary.blue }}>
                      Our Location
                    </h3>
                    <p className={`${typography.bodyBase} mb-3`} style={{ color: colors.neutral.gray[600] }}>
                      Jalan Jombor Poka, RT.01/RW.01, Jayan, Jombor<br />
                      Kec. Ceper, Kabupaten Klaten<br />
                      Jawa Tengah 57465
                    </p>
                    <a 
                      href="https://maps.google.com/?q=Jalan+Jombor+Poka+RT01+RW01+Jayan+Jombor+Ceper+Klaten+Jawa+Tengah+57465" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-2 text-sm font-semibold ${transitions.base}`}
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
            <div className={`group bg-white rounded-xl p-6 ${shadows.lift} border border-gray-100`}>
              <div className="flex items-start gap-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg blur opacity-50 group-hover:opacity-75 transition-opacity"></div>
                  <div className={`${presets.cardHeader.iconOrange}`}>
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
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
            <div className={`group bg-white rounded-xl p-6 ${shadows.lift} border border-gray-100`}>
              <div className="flex items-start gap-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg blur opacity-50 group-hover:opacity-75 transition-opacity"></div>
                  <div className={`${presets.cardHeader.iconOrange}`}>
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
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
                    0212 - 301120
                  </a>
                </div>
              </div>
            </div>

            {/* Instagram Card */}
            <div className={`group bg-white rounded-xl p-6 ${shadows.lift} border border-gray-100`}>
              <div className="flex items-start gap-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg blur opacity-50 group-hover:opacity-75 transition-opacity"></div>
                  <div className={`${presets.cardHeader.iconOrange}`}>
                    <img 
                      src={import.meta.env.VITE_BASE_URL  + "/images/icon.PNG"} 
                      alt="Instagram"
                      className="w-6 h-6"
                    />
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
            <div className={`bg-white rounded-xl p-8 md:p-10 ${shadows.lift} border border-gray-100`}>
              <h3 className={`${typography.h2} mb-8`} style={{ color: colors.primary.blue }}>
                Send us a Message
              </h3>

              {/* Success Alert */}
              {success && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-green-600">Terima kasih! Pesan Anda telah terkirim. Tim kami akan segera menghubungi Anda.</p>
                </div>
              )}

              {/* Error Alert */}
              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}
              
              <form onSubmit={handleSubmit} className={spacing.stack.md}>
                {/* Name Field */}
                <div>
                  <label className={`${typography.label} mb-3 block`} style={{ color: colors.primary.blue }}>
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('name')}
                    onBlur={() => setFocusedField(null)}
                    placeholder="Masukkan nama Anda"
                    className={`w-full px-4 py-3 bg-gray-50 border-2 rounded-lg focus:outline-none focus:bg-white ${transitions.base}`}
                    style={{
                      borderColor: focusedField === 'name' ? colors.primary.orange : colors.neutral.gray[200],
                      boxShadow: focusedField === 'name' ? `0 0 0 3px rgba(249, 115, 22, 0.1)` : 'none'
                    }}
                  />
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
                    placeholder="Masukkan email Anda"
                    className={`w-full px-4 py-3 bg-gray-50 border-2 rounded-lg focus:outline-none focus:bg-white ${transitions.base}`}
                    style={{
                      borderColor: focusedField === 'email' ? colors.primary.orange : colors.neutral.gray[200],
                      boxShadow: focusedField === 'email' ? `0 0 0 3px rgba(249, 115, 22, 0.1)` : 'none'
                    }}
                  />
                </div>

                {/* Phone Field */}
                <div>
                  <label className={`${typography.label} mb-3 block`} style={{ color: colors.primary.blue }}>
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('phone')}
                    onBlur={() => setFocusedField(null)}
                    placeholder="Masukkan nomor telepon Anda"
                    className={`w-full px-4 py-3 bg-gray-50 border-2 rounded-lg focus:outline-none focus:bg-white ${transitions.base}`}
                    style={{
                      borderColor: focusedField === 'phone' ? colors.primary.orange : colors.neutral.gray[200],
                      boxShadow: focusedField === 'phone' ? `0 0 0 3px rgba(249, 115, 22, 0.1)` : 'none'
                    }}
                  />
                </div>

                {/* Subject Field */}
                <div>
                  <label className={`${typography.label} mb-3 block`} style={{ color: colors.primary.blue }}>
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('subject')}
                    onBlur={() => setFocusedField(null)}
                    placeholder="Topik pesan Anda"
                    className={`w-full px-4 py-3 bg-gray-50 border-2 rounded-lg focus:outline-none focus:bg-white ${transitions.base}`}
                    style={{
                      borderColor: focusedField === 'subject' ? colors.primary.orange : colors.neutral.gray[200],
                      boxShadow: focusedField === 'subject' ? `0 0 0 3px rgba(249, 115, 22, 0.1)` : 'none'
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
                  disabled={loading}
                  className={`group relative w-full text-white font-bold py-4 md:py-5 rounded-lg overflow-hidden ${transitions.base} transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed`}
                  style={{ backgroundColor: colors.primary.blue }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-orange-600 transform translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
                  <div className="relative flex items-center justify-center gap-3">
                    <span>{loading ? 'Mengirim...' : 'Send Message'}</span>
                    <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;