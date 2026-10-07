import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Send, 
  Map, 
  CheckCircle2,
  ChevronDown 
} from 'lucide-react';
import { safariImages, faqs, contactInfo, parkInfo } from '../data/safariData';
import { submitContact } from '../api/client';
import SEO from '../components/SEO';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: ''
  });
  const [honeypot, setHoneypot] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [cooldown, setCooldown] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [openFaqs, setOpenFaqs] = useState({ 0: true });

  const toggleFaq = (index) => {
    setOpenFaqs((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const contactFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Silent drop if honeypot was filled by an automated bot
    if (honeypot) {
      console.warn("Spam bot submission trapped.");
      return;
    }

    if (isSubmitting || cooldown) return;

    setIsSubmitting(true);

    try {
      await submitContact({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        subject: formData.subject,
        message: formData.message,
      });
      setSubmitted(true);
      setCooldown(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: 'General Inquiry',
        message: ''
      });
      setTimeout(() => setSubmitted(false), 3000);
      setTimeout(() => setCooldown(false), 30000);
    } catch (err) {
      console.error("Contact form error:", err);
      alert("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#fbfcfa] dark:bg-gray-950 transition-colors">
      {/* Subtle organic botanical texture across page */}
      <div className="pattern-leaf-delicate fixed inset-0 opacity-[0.03] dark:opacity-[0.025] pointer-events-none z-0" />

      <SEO
        title="Get in Touch & Forest Gate Location | Rajaji National Park"
        description="Contact the Rajaji National Park expedition desk. Inquire about safari permits, custom expeditions, school trips, and national park visitor guidelines."
        keywords="contact rajaji national park, safari permit help, rajaji safari phone number, national park gate location chilla haridwar"
        ogImage={safariImages.contactHero}
        schemaJson={contactFaqSchema}
      />

      {/* 1. HERO SECTION - Deep Jungle Forest with Tiger Watermark & Leaf Texture */}
      <section className="relative min-h-[420px] lg:min-h-[460px] flex items-center justify-center text-center overflow-hidden bg-[#07150c] text-white">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-35 mix-blend-luminosity"
          style={{ backgroundImage: `url("${safariImages.contactHero}")` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#040b06]/95 via-[#07150c]/85 to-[#07150c]" />

        {/* Botanical leaf vein texture */}
        <div className="pattern-leaf-veins absolute inset-0 opacity-10 pointer-events-none" />

        {/* Tiger watermark stencil */}
        <div 
          className="absolute right-0 bottom-0 top-0 w-2/3 max-w-2xl bg-contain bg-right-bottom bg-no-repeat pointer-events-none opacity-[0.14]"
          style={{
            backgroundImage: `url("/images/tiger for bg overlay.jpg")`,
            filter: 'invert(1)',
            mixBlendMode: 'screen',
          }}
        />

        {/* Corner foliage flourish */}
        <div 
          className="absolute -top-10 -left-10 w-60 h-60 bg-contain bg-no-repeat pointer-events-none opacity-20 filter invert"
          style={{
            backgroundImage: `url("/images/leaf for cta.jpg")`,
            mixBlendMode: 'screen',
          }}
        />

        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 py-16">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-400/20 backdrop-blur-md text-[11px] font-bold uppercase tracking-widest text-emerald-300 mb-5">
            <Mail className="w-3.5 h-3.5 text-emerald-400" />
            Expedition Assistance Desk
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[1.1] mb-4">
            Get in Touch
          </h1>
          <p className="text-base sm:text-lg text-emerald-100/80 font-normal leading-relaxed max-w-xl mx-auto">
            Have questions about your upcoming adventure? Our team is ready to help you plan the perfect safari experience.
          </p>
        </div>
      </section>

      {/* 2. CONTACT DETAILS & MESSAGE FORM */}
      <section className="relative z-10 py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Contact Details & Map Card */}
          <div className="lg:col-span-4 space-y-6">
            {/* Contact Details Card */}
            <div className="bg-[#fdfcf8]/90 dark:bg-[#0c1f13]/90 backdrop-blur-md rounded-3xl p-8 shadow-sm border border-emerald-950/10 dark:border-emerald-500/20 space-y-7 transition-colors">
              <h3 className="font-serif text-xl font-bold text-gray-900 dark:text-white">
                Contact Details
              </h3>

              <div className="space-y-6">
                {/* Visit Us */}
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 flex items-center justify-center text-emerald-700 dark:text-emerald-400 border border-emerald-200/50 dark:border-emerald-800/40 shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-gray-400 dark:text-gray-400 uppercase tracking-wider block">
                      VISIT US
                    </span>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white mt-0.5 leading-snug">
                      {contactInfo.address}
                    </p>
                    <span className="text-xs text-safari-700 dark:text-safari-400 font-medium block mt-0.5">
                      {parkInfo.name} Range Office
                    </span>
                  </div>
                </div>

                {/* Call Us */}
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 flex items-center justify-center text-emerald-700 dark:text-emerald-400 border border-emerald-200/50 dark:border-emerald-800/40 shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-gray-400 dark:text-gray-400 uppercase tracking-wider block">
                      CALL US
                    </span>
                    <a href={`tel:${contactInfo.safari.phone}`} className="text-sm font-semibold text-gray-900 dark:text-white hover:text-emerald-600 dark:hover:text-emerald-400 transition block mt-0.5">
                      {contactInfo.safari.phone} <span className="text-xs text-gray-500 dark:text-gray-400 font-normal">({contactInfo.safari.name})</span>
                    </a>
                    <a href={`tel:${contactInfo.phone}`} className="text-xs text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition block mt-0.5">
                      Landline: {contactInfo.phone}
                    </a>
                  </div>
                </div>

                {/* Email Us */}
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 flex items-center justify-center text-emerald-700 dark:text-emerald-400 border border-emerald-200/50 dark:border-emerald-800/40 shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-gray-400 dark:text-gray-400 uppercase tracking-wider block">
                      EMAIL US
                    </span>
                    <a
                      href={`mailto:${contactInfo.email}`}
                      className="text-sm font-semibold text-gray-900 dark:text-white hover:text-emerald-600 dark:hover:text-emerald-400 transition block mt-0.5"
                    >
                      {contactInfo.email}
                    </a>
                    <a
                      href={`mailto:${contactInfo.safariEmail}`}
                      className="text-xs text-gray-500 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition block mt-0.5"
                    >
                      {contactInfo.safariEmail}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* 3D Map Preview Card */}
            <div className="relative bg-[#fdfcf8]/90 dark:bg-[#0c1f13]/90 backdrop-blur-md rounded-3xl p-6 shadow-sm border border-emerald-950/10 dark:border-emerald-500/20 overflow-hidden flex flex-col items-center justify-center min-h-[220px] group transition-colors">
              {/* Map vector stylization */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#07150c]/5 to-[#07150c]/10 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
                <div className="w-32 h-32 rounded-full bg-emerald-100/40 dark:bg-emerald-900/30 blur-2xl absolute" />
                <svg className="w-48 h-48 opacity-25 stroke-gray-500 dark:stroke-gray-600" fill="none" viewBox="0 0 100 100">
                  <path d="M10 20 L40 10 L70 20 L90 10 L90 80 L70 90 L40 80 L10 90 Z" strokeWidth="2" strokeDasharray="3 3"/>
                  <path d="M40 10 L40 80 M70 20 L70 90" strokeWidth="2"/>
                </svg>
                {/* 3D-styled Pin */}
                <div className="absolute text-emerald-600 group-hover:scale-110 transition duration-300">
                  <MapPin className="w-16 h-16 fill-emerald-100/80 dark:fill-emerald-950/80 text-emerald-600 dark:text-emerald-400 drop-shadow-md" />
                </div>
              </div>

              {/* View on Maps Button */}
              <a
                href="https://www.google.com/maps/search/?api=1&query=Rajaji+National+Park+Uttarakhand"
                target="_blank"
                rel="noopener noreferrer"
                className="relative z-10 px-6 py-2.5 bg-white/95 dark:bg-gray-800/95 backdrop-blur-md rounded-full text-xs font-bold text-gray-900 dark:text-white shadow-md hover:shadow-lg border border-gray-100 dark:border-gray-700 flex items-center gap-2 hover:text-emerald-600 dark:hover:text-emerald-400 transition"
              >
                <Map className="w-4 h-4 text-emerald-600" />
                View on Google Maps
              </a>
            </div>
          </div>

          {/* Right Column: Send a Message Form */}
          <div className="lg:col-span-8">
            <div className="bg-[#fdfcf8]/90 dark:bg-[#0c1f13]/90 backdrop-blur-md rounded-3xl p-8 sm:p-12 shadow-sm border border-emerald-950/10 dark:border-emerald-500/20">
              <div className="mb-8">
                <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 mb-1 block">
                  EXPEDITION INQUIRY
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
                  Send a Message
                </h2>
                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Fill out the form below and we'll get back to you within 24 hours.
                </p>
              </div>

              {submitted ? (
                <div className="py-16 text-center space-y-3 bg-emerald-50/70 dark:bg-emerald-950/30 rounded-2xl p-6 border border-emerald-200/60 dark:border-emerald-800/40">
                  <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                  <h3 className="font-serif text-xl font-bold text-gray-900 dark:text-white">Message Delivered!</h3>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 max-w-sm mx-auto">
                    Thank you, {formData.name}. Our expedition coordination desk has received your request and will contact you shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6 text-sm">
                  {/* Invisible Honeypot Trap against automated spam bots */}
                  <div className="opacity-0 absolute -z-10 select-none pointer-events-none h-0 w-0 overflow-hidden" aria-hidden="true">
                    <label htmlFor="website_hp">Leave this empty</label>
                    <input
                      id="website_hp"
                      type="text"
                      name="website_hp"
                      value={honeypot}
                      onChange={(e) => setHoneypot(e.target.value)}
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </div>

                  {/* Row 1: Name & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs sm:text-sm font-semibold text-gray-900 dark:text-white mb-2">
                        Your Name
                      </label>
                      <input
                        type="text"
                        required
                        maxLength={120}
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 text-sm bg-gray-50/80 dark:bg-gray-800/90 border border-gray-200 dark:border-gray-700 rounded-2xl focus:outline-none focus:bg-white dark:focus:bg-gray-800 focus:border-emerald-600 dark:focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 font-medium"
                      />
                    </div>

                    <div>
                      <label className="block text-xs sm:text-sm font-semibold text-gray-900 dark:text-white mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        maxLength={160}
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 text-sm bg-gray-50/80 dark:bg-gray-800/90 border border-gray-200 dark:border-gray-700 rounded-2xl focus:outline-none focus:bg-white dark:focus:bg-gray-800 focus:border-emerald-600 dark:focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 font-medium"
                      />
                    </div>
                  </div>

                  {/* Row 2: Phone & Subject */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs sm:text-sm font-semibold text-gray-900 dark:text-white mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        maxLength={30}
                        placeholder="+1 (555) 000-0000"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 text-sm bg-gray-50/80 dark:bg-gray-800/90 border border-gray-200 dark:border-gray-700 rounded-2xl focus:outline-none focus:bg-white dark:focus:bg-gray-800 focus:border-emerald-600 dark:focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 font-medium"
                      />
                    </div>

                    <div>
                      <label className="block text-xs sm:text-sm font-semibold text-gray-900 dark:text-white mb-2">
                        Subject
                      </label>
                      <select
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full px-4 py-3 text-sm bg-gray-50/80 dark:bg-gray-800/90 border border-gray-200 dark:border-gray-700 rounded-2xl focus:outline-none focus:bg-white dark:focus:bg-gray-800 focus:border-emerald-600 dark:focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition text-gray-900 dark:text-white font-medium"
                      >
                        <option className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">General Inquiry</option>
                        <option className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">Permit Booking & Pricing</option>
                        <option className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">Custom Safari Expedition</option>
                        <option className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">Filming & Wildlife Photography Permit</option>
                        <option className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">Educational & School Group Tours</option>
                      </select>
                    </div>
                  </div>

                  {/* Row 3: How can we help? */}
                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-gray-900 dark:text-white mb-2">
                      How can we help?
                    </label>
                    <textarea
                      rows="6"
                      required
                      maxLength={4000}
                      placeholder="Tell us more about your plans..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 text-sm bg-gray-50/80 dark:bg-gray-800/90 border border-gray-200 dark:border-gray-700 rounded-2xl focus:outline-none focus:bg-white dark:focus:bg-gray-800 focus:border-emerald-600 dark:focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 font-medium resize-none"
                    ></textarea>
                  </div>

                  {/* Submit Button aligned Right */}
                  <div className="flex justify-end pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting || cooldown}
                      className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition duration-200 active:scale-95"
                    >
                      {isSubmitting ? (
                        'Sending...'
                      ) : cooldown ? (
                        'Sent! Please wait 30s'
                      ) : (
                        <>
                          Send Message
                          <Send className="w-3.5 h-3.5 fill-white" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 3. FREQUENTLY ASKED QUESTIONS SECTION */}
      <section className="relative z-10 py-20 max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 mb-2">
            Help & Information
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-gray-900 dark:text-white text-center tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-2 max-w-lg mx-auto">
            Essential information regarding safari permits, timings, gear recommendations, and family visit guidelines.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = !!openFaqs[idx];
            return (
              <div
                key={idx}
                className="bg-[#fdfcf8]/90 dark:bg-[#0c1f13]/90 backdrop-blur-md border border-emerald-950/10 dark:border-emerald-500/20 rounded-2xl shadow-sm transition-all duration-200 overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full text-left py-4 sm:py-5 px-5 sm:px-6 flex items-center justify-between gap-4 group cursor-pointer focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm sm:text-base font-bold text-gray-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                    {faq.question}
                  </span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                    isOpen 
                      ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 rotate-180' 
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400'
                  }`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-5 pt-1 text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed border-t border-gray-100 dark:border-gray-800/80">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
