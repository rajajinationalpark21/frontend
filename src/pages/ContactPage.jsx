import React, { useEffect, useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Send, 
  CheckCircle2,
  ChevronDown 
} from 'lucide-react';
import { safariImages, faqs, contactInfo } from '../data/safariData';
import { fetchContent, submitContact } from '../api/client';
import SEO from '../components/SEO';
import PageHero from '../components/PageHero';
import HoneypotField from '../components/HoneypotField';
import RichText from '../components/RichText';
import { hoverToOpen } from '../utils/canHover';
import AnswerReveal from '../components/AnswerReveal';

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
  const [submitError, setSubmitError] = useState('');
  const [cooldown, setCooldown] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [openFaqs, setOpenFaqs] = useState({ 0: true });

  // Contact details are edited in the admin panel (Settings → Website Details).
  const [siteContact, setSiteContact] = useState(null);
  useEffect(() => {
    fetchContent()
      .then((res) => setSiteContact(res.data?.settings?.contact || null))
      .catch(() => {});
  }, []);
  const address = siteContact?.address || contactInfo.address;
  const phones = [siteContact?.phone, siteContact?.secondaryPhone, siteContact?.tertiaryPhone].filter(Boolean);
  const callNumbers = phones.length ? phones : [contactInfo.safari.phone];
  const contactName = siteContact?.name || contactInfo.safari.name;
  const email = siteContact?.email || contactInfo.email;
  // The admin pastes Google's "Embed a map" code (or its link); until then the
  // map searches the Map URL's place, or the address.
  const pastedEmbed = String(siteContact?.mapEmbed || '').match(/https:\/\/www\.google\.com\/maps\/embed\?[^"'\s<>]+/)?.[0]?.replace(/&amp;/g, '&');
  const mapPlace = (() => {
    try {
      return new URL(siteContact?.mapUrl || contactInfo.mapUrl || '').searchParams.get('q');
    } catch {
      return null;
    }
  })() || address;
  const mapEmbedSrc = pastedEmbed || `https://www.google.com/maps?q=${encodeURIComponent(mapPlace)}&output=embed`;
  const telHref = (number) => `tel:${number.replace(/[^\d+]/g, '')}`;

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
    if (isSubmitting || cooldown) return;
    setSubmitError('');
    if (formData.phone.replace(/\D/g, '').length < 10) {
      setSubmitError('Please enter your phone or WhatsApp number (at least 10 digits) so our safari desk can reply.');
      return;
    }

    setIsSubmitting(true);

    try {
      await submitContact({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        subject: formData.subject,
        message: formData.message,
        website_hp: honeypot,
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
      setSubmitError(err?.message || 'Your message could not be sent. Please try again, or call or WhatsApp us.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#fafaf7] dark:bg-[#070c09] transition-colors">
      <SEO
        ogImage={safariImages.contactHero}
        schemaJson={contactFaqSchema}
      />

      <PageHero
        title="Get in Touch"
        subtitle="Have questions about your upcoming adventure? Our team is ready to help you plan the perfect safari experience."
        image={safariImages.contactHero}
        fallbackImage={safariImages.tigerStalking}
        alt="Chilla forest gate, Rajaji National Park"
      />

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
                      {address}
                    </p>
                    <span className="text-xs text-safari-700 dark:text-safari-400 font-medium block mt-0.5">
                      Safari Enquiry &amp; Booking Assistance
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
                    {contactName && (() => {
                      // "Rajaji Safari Desk / Dr. Chaturbhuj": the desk as a label, the person in bold.
                      const [desk, person] = contactName.includes(' / ') ? contactName.split(' / ') : ['', contactName];
                      return (
                        <div className="mt-1">
                          {desk && <span className="block text-xs font-medium text-gray-500 dark:text-gray-400">{desk}</span>}
                          <p className="text-lg font-bold leading-snug text-gray-950 dark:text-white">{person}</p>
                        </div>
                      );
                    })()}
                    {callNumbers.map((number) => (
                      <a key={number} href={telHref(number)} className="text-sm font-semibold text-gray-900 dark:text-white hover:text-emerald-600 dark:hover:text-emerald-400 transition block mt-0.5">
                        {number}
                      </a>
                    ))}
                    <span className="text-xs text-gray-500 dark:text-gray-400 block mt-0.5">Call / WhatsApp</span>
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
                      href={`mailto:${email}`}
                      className="text-sm font-semibold text-gray-900 dark:text-white hover:text-emerald-600 dark:hover:text-emerald-400 transition block mt-0.5"
                    >
                      {email}
                    </a>
                    {contactInfo.safariEmail && contactInfo.safariEmail !== email && (
                      <a
                        href={`mailto:${contactInfo.safariEmail}`}
                        className="text-xs text-gray-500 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition block mt-0.5"
                      >
                        {contactInfo.safariEmail}
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* The map itself, from the admin's Google Maps embed */}
            <div className="relative bg-[#fdfcf8]/90 dark:bg-[#0c1f13]/90 backdrop-blur-md rounded-3xl p-2 shadow-sm border border-emerald-950/10 dark:border-emerald-500/20 overflow-hidden">
              <iframe
                title={`Map: ${address}`}
                src={mapEmbedSrc}
                className="block w-full h-[300px] sm:h-[340px] rounded-[20px] border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </div>

          {/* Right Column: Send a Message Form */}
          <div className="lg:col-span-8 lg:self-stretch">
            <div className="flex h-full flex-col bg-[#fdfcf8]/90 dark:bg-[#0c1f13]/90 backdrop-blur-md rounded-3xl p-6 sm:p-10 lg:p-12 shadow-sm border border-emerald-950/10 dark:border-emerald-500/20">
              <div className="mb-8">
                <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 mb-1 block">
                  Safari enquiry
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
                  Send us a message
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1.5">
                  Our safari desk replies by phone, WhatsApp or email. For the quickest answer, call or WhatsApp us.
                </p>
              </div>

              {submitted ? (
                <div className="py-16 text-center space-y-3 bg-emerald-50/70 dark:bg-emerald-950/30 rounded-2xl p-6 border border-emerald-200/60 dark:border-emerald-800/40">
                  <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                  <h3 className="font-serif text-xl font-bold text-gray-900 dark:text-white">Message sent</h3>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 max-w-sm mx-auto">
                    Thank you, {formData.name}. Our safari desk has your message and will contact you shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-1 flex-col gap-6 text-sm">
                  {/* Spam trap, checked by the server */}
                  <HoneypotField value={honeypot} onChange={setHoneypot} />

                  {/* Row 1: Name & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs sm:text-sm font-semibold text-gray-900 dark:text-white mb-2">
                        Your name
                      </label>
                      <input
                        type="text"
                        required
                        maxLength={120}
                        autoComplete="name"
                        placeholder="Your full name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 text-sm bg-gray-50/80 dark:bg-gray-800/90 border border-gray-200 dark:border-gray-700 rounded-2xl focus:outline-none focus:bg-white dark:focus:bg-gray-800 focus:border-emerald-600 dark:focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 font-medium"
                      />
                    </div>

                    <div>
                      <label className="block text-xs sm:text-sm font-semibold text-gray-900 dark:text-white mb-2">
                        Email <span className="font-normal text-gray-400">(optional)</span>
                      </label>
                      <input
                        type="email"
                        maxLength={160}
                        autoComplete="email"
                        placeholder="you@example.com"
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
                        Phone / WhatsApp
                      </label>
                      <input
                        type="tel"
                        required
                        maxLength={30}
                        autoComplete="tel"
                        inputMode="tel"
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 text-sm bg-gray-50/80 dark:bg-gray-800/90 border border-gray-200 dark:border-gray-700 rounded-2xl focus:outline-none focus:bg-white dark:focus:bg-gray-800 focus:border-emerald-600 dark:focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 font-medium"
                      />
                    </div>

                    <div>
                      <label className="block text-xs sm:text-sm font-semibold text-gray-900 dark:text-white mb-2">
                        What is it about?
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

                  {/* Row 3: the message, taking any extra height */}
                  <div className="flex flex-1 flex-col">
                    <label className="block text-xs sm:text-sm font-semibold text-gray-900 dark:text-white mb-2">
                      Your message
                    </label>
                    <textarea
                      rows="6"
                      required
                      maxLength={4000}
                      placeholder="Preferred dates, safari zone, number of people, any questions…"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="min-h-[160px] flex-1 w-full px-4 py-3 text-sm bg-gray-50/80 dark:bg-gray-800/90 border border-gray-200 dark:border-gray-700 rounded-2xl focus:outline-none focus:bg-white dark:focus:bg-gray-800 focus:border-emerald-600 dark:focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 font-medium resize-none"
                    ></textarea>
                  </div>

                  {submitError && (
                    <p role="alert" className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-300">
                      {submitError}
                    </p>
                  )}

                  {/* Submit */}
                  <div className="flex flex-col-reverse items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-xs text-gray-500 dark:text-gray-400">We only use your details to reply to this message.</p>
                    <button
                      type="submit"
                      disabled={isSubmitting || cooldown}
                      className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-sm shadow-md hover:shadow-lg transition duration-200 active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700"
                    >
                      {isSubmitting ? (
                        'Sending...'
                      ) : cooldown ? (
                        'Sent – you can send another in 30 s'
                      ) : (
                        <>
                          Send message
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
                // With a mouse, pointing at a question opens its answer (and closes the others).
                {...hoverToOpen(() => setOpenFaqs({ [idx]: true }))}
                className={`bg-[#fdfcf8]/90 dark:bg-[#0c1f13]/90 backdrop-blur-md border rounded-2xl transition-[border-color,box-shadow] duration-300 overflow-hidden ${
                  isOpen ? 'border-emerald-600/30 dark:border-emerald-400/30 shadow-md' : 'border-emerald-950/10 dark:border-emerald-500/20 shadow-sm hover:border-emerald-600/25'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full text-left py-4 sm:py-5 px-5 sm:px-6 flex items-center justify-between gap-4 group cursor-pointer focus:outline-none"
                  aria-expanded={isOpen}
                  aria-controls={`contact-faq-${idx}`}
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

                <AnswerReveal
                  open={isOpen}
                  id={`contact-faq-${idx}`}
                  className="px-5 sm:px-6 pb-5 pt-3 text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed border-t border-gray-100 dark:border-gray-800/80"
                >
                  <RichText text={faq.answer} />
                </AnswerReveal>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
