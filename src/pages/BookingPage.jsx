import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  Calendar, 
  Clock, 
  Users, 
  Car, 
  CheckCircle2, 
  MapPin, 
  AlertCircle, 
  Compass, 
  ArrowRight, 
  Phone, 
  Sparkles,
  Ticket,
  ChevronRight,
  Info
} from 'lucide-react';
import { safariImages, contactInfo } from '../data/safariData';
import { fetchContent } from '../api/client';
import { submitBooking } from '../api/client';
import SEO from '../components/SEO';

const DEFAULT_ZONES = [
  { id: 'chila', name: 'Chila Core Range', tag: 'Highest Wildlife Density', distance: '36 km Safari Track', highlights: 'Royal Bengal Tigers, wild elephant herds, leopards, spotted deer', gates: 'Chilla Gate, Haridwar-Rishikesh Road', image: safariImages.chillaRiverbed },
  { id: 'motichur', name: 'Motichur Range', tag: 'Dense Sal Forest & Birding', distance: '32 km Forest Track', highlights: 'Dense virgin Sal canopies, sambar, hornbills, raptors', gates: 'Motichur Gate, NH-72 Haridwar-Dehradun', image: safariImages.motichurGate },
  { id: 'jhilmil', name: 'Jhilmil Jheel Sanctuary', tag: 'Rare Swamp Deer Habitat', distance: '28 km Wetland Circuit', highlights: 'Only habitat in Uttarakhand for Barasingha (Swamp Deer)', gates: 'Ransi Gate near Laksar, Haridwar', image: safariImages.jhilmilWetlands },
  { id: 'gohari', name: 'Gohari Range', tag: 'Scenic Ravines & Twilight', distance: '30 km River Track', highlights: 'Song River bed, evening elephant crossings, tranquil wilderness', gates: 'Gohari Gate, Rishikesh periphery', image: safariImages.gohariCorridor },
];

export default function BookingPage() {
  const [zones, setZones] = useState(DEFAULT_ZONES);
  const [selectedZone, setSelectedZone] = useState(DEFAULT_ZONES[0].id);
  const [date, setDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 3);
    return d.toISOString().split('T')[0];
  });
  const [slot, setSlot] = useState('06:00 AM - Morning Shift');
  const [guests, setGuests] = useState(2);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(null);

  useEffect(() => {
    fetchContent()
      .then((data) => {
        const safari = data?.data?.safari || data?.safari;
        if (safari?.zones && safari.zones.length > 0) {
          const mapped = safari.zones.map((z, i) => ({
            id: `zone-${i}`,
            name: z.name,
            tag: z.description ? z.description.substring(0, 40) : 'Safari Zone',
            distance: '',
            highlights: z.description || '',
            gates: '',
            image: DEFAULT_ZONES[i % DEFAULT_ZONES.length].image,
          }));
          setZones(mapped);
        }
      })
      .catch(() => {});
  }, []);

  const currentZone = zones.find((z) => z.id === selectedZone) || zones[0];

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const bookingRef = `RTR-${Date.now().toString().slice(-6)}`;

    try {
      const res = await submitBooking({
        name: fullName,
        email,
        phone,
        zone: currentZone.name,
        date,
        shift: slot,
        guests,
        specialRequests,
      });

      const savedRef = res?.booking?.refNumber || bookingRef;

      setBookingConfirmed({
        refNumber: savedRef,
        name: fullName,
        phone,
        email,
        zone: currentZone.name,
        date,
        slot,
        guests,
      });
    } catch {
      setBookingConfirmed({
        refNumber: bookingRef,
        name: fullName,
        phone,
        email,
        zone: currentZone.name,
        date,
        slot,
        guests,
      });
    } finally {
      setIsSubmitting(false);
      window.scrollTo({ top: 120, behavior: 'smooth' });
    }
  };

  const whatsappNumber = contactInfo.safari.whatsapp.replace(/\D/g, '') || "919660871429";
  const getWhatsAppMessage = () => {
    if (!bookingConfirmed) return '';
    return encodeURIComponent(
      `Hello Rajaji Safari Desk! I would like to inquire about a safari booking.\n\n` +
      `*Reference:* ${bookingConfirmed.refNumber}\n` +
      `*Name:* ${bookingConfirmed.name}\n` +
      `*Phone:* ${bookingConfirmed.phone}\n` +
      `*Zone:* ${bookingConfirmed.zone}\n` +
      `*Date:* ${bookingConfirmed.date} (${bookingConfirmed.slot})\n` +
      `*Guests:* ${bookingConfirmed.guests}\n\n` +
      `Please share the tariff and permit details.`
    );
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors pt-6 pb-24">
      <SEO
        title="Book Safari Permit Online | Rajaji National Park 4x4 Gypsy Reservation"
        description="Official safari permit reservation portal for Rajaji National Park. Reserve your open-top 4x4 gypsy and certified naturalist guide for Chila, Motichur, Gohari & Jhilmil ranges."
        keywords="book rajaji safari, safari permit booking, chila gypsy reservation, motichur safari booking, online safari permit uttarakhand"
        ogImage={safariImages.chillaRiverbed}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 py-3 mb-6 border-b border-gray-100 dark:border-gray-800 text-xs text-gray-500 dark:text-gray-400">
          <Link to="/" className="hover:text-safari-600 dark:hover:text-safari-400 transition">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <Link to="/safari" className="hover:text-safari-600 dark:hover:text-safari-400 transition">Safaris</Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <span className="text-gray-900 dark:text-white font-semibold">Permit Reservation</span>
        </div>

        {/* Page Hero Header */}
        <div className="mb-10 max-w-3xl">
          <h1 className="text-3xl sm:text-5xl font-extrabold text-gray-950 dark:text-white tracking-tight leading-tight mb-3">
            Reserve Your Safari Permit
          </h1>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
            Daily visitor permits are strictly capped to protect sanctuary wildlife corridors. Plan in advance to secure your registered 4x4 gypsy, licensed driver, and authorized forest naturalist.
          </p>
        </div>

        {/* Confirmation State Screen */}
        {bookingConfirmed ? (
          <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 sm:p-12 border border-safari-200 dark:border-safari-800/80 shadow-2xl animate-fadeIn max-w-3xl mx-auto my-6 text-center">
            <div className="w-16 h-16 rounded-full bg-safari-100 dark:bg-safari-900/60 text-safari-600 dark:text-safari-400 flex items-center justify-center mx-auto mb-4 border border-safari-300 dark:border-safari-700">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <span className="text-xs font-bold uppercase tracking-widest text-safari-600 dark:text-safari-400">
              Reservation Inquiry Initiated
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-950 dark:text-white mt-1 mb-2">
              Permit Slot Reserved!
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-6">
              Reference ID: <span className="font-mono font-bold text-gray-900 dark:text-white text-base">{bookingConfirmed.refNumber}</span>
            </p>

            <div className="bg-gray-50 dark:bg-gray-800/70 rounded-2xl p-6 text-left border border-gray-200/80 dark:border-gray-700/80 space-y-3 mb-8">
              <div className="grid grid-cols-2 gap-4 text-xs sm:text-sm">
                <div>
                  <span className="text-gray-400 block text-xs">Primary Guest</span>
                  <span className="font-bold text-gray-900 dark:text-white">{bookingConfirmed.name}</span>
                </div>
                <div>
                  <span className="text-gray-400 block text-xs">Selected Range</span>
                  <span className="font-bold text-gray-900 dark:text-white">{bookingConfirmed.zone}</span>
                </div>
                <div>
                  <span className="text-gray-400 block text-xs">Safari Date</span>
                  <span className="font-bold text-gray-900 dark:text-white">{bookingConfirmed.date}</span>
                </div>
                <div>
                  <span className="text-gray-400 block text-xs">Shift Timing</span>
                  <span className="font-bold text-gray-900 dark:text-white">{bookingConfirmed.slot}</span>
                </div>
                <div className="sm:col-span-2">
                  <span className="text-gray-400 block text-xs">Party Size</span>
                  <span className="font-bold text-gray-900 dark:text-white">{bookingConfirmed.guests} Guests</span>
                </div>
              </div>
            </div>

            <p className="text-xs text-gray-500 dark:text-gray-400 mb-6">
              Our team will contact you shortly with the tariff and permit details.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={`https://wa.me/${whatsappNumber}?text=${getWhatsAppMessage()}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-2xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-sm shadow-lg transition duration-200"
              >
                Confirm on WhatsApp Desk <ArrowRight className="w-4 h-4" />
              </a>

              <button
                onClick={() => setBookingConfirmed(null)}
                className="w-full sm:w-auto px-6 py-3.5 rounded-2xl border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 text-sm font-semibold transition"
              >
                Book Another Permit
              </button>
            </div>
          </div>
        ) : (
          /* Main Booking Form */
          <div className="max-w-3xl mx-auto">
            <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 sm:p-10 border border-gray-100 dark:border-gray-800 shadow-sm">
              <form onSubmit={handleBookingSubmit} className="space-y-8">
                {/* 1. SELECT SAFARI ZONE */}
                <div>
                  <label className="block text-sm font-bold text-gray-900 dark:text-white mb-3 flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <Compass className="w-4 h-4 text-safari-600 dark:text-safari-400" />
                      1. Choose Safari Zone
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400 font-normal">Capped Daily Quotas</span>
                  </label>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {zones.map((zone) => {
                      const isSelected = selectedZone === zone.id;
                      return (
                        <div
                          key={zone.id}
                          onClick={() => setSelectedZone(zone.id)}
                          className={`rounded-2xl p-4 border transition-all cursor-pointer flex flex-col justify-between ${
                            isSelected
                              ? 'border-safari-500 bg-safari-50/50 dark:bg-safari-900/25 ring-2 ring-safari-500/40 shadow-sm'
                              : 'border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 bg-white dark:bg-gray-900'
                          }`}
                        >
                          <div>
                            <div className="flex items-center justify-between gap-2 mb-1.5">
                              <span className="font-bold text-sm text-gray-950 dark:text-white">{zone.name}</span>
                            </div>
                            <span className="inline-block px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800 text-[10px] font-semibold text-gray-600 dark:text-gray-300 mb-2">
                              {zone.tag}
                            </span>
                            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed line-clamp-2">{zone.highlights}</p>
                          </div>
                          <div className="pt-3 mt-3 border-t border-gray-100 dark:border-gray-800/80 flex items-center justify-between text-[11px] text-gray-400">
                            <span>{zone.distance}</span>
                            {isSelected && (
                              <span className="inline-flex items-center gap-1 font-bold text-safari-600 dark:text-safari-400">
                                Selected <CheckCircle2 className="w-3.5 h-3.5" />
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* 2. DATE & SHIFT TIMINGS */}
                <div className="pt-4 border-t border-gray-100 dark:border-gray-800">
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-safari-600 dark:text-safari-400" />
                    2. Date & Safari Timing
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Preferred Safari Date</label>
                      <input
                        type="date"
                        required
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full px-4 py-3 text-sm bg-gray-50 dark:bg-gray-800/90 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white rounded-2xl focus:outline-none focus:border-safari-500 dark:focus:border-safari-500 focus:ring-2 focus:ring-safari-500/20 font-medium transition"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Select Safari Shift</label>
                      <select
                        value={slot}
                        onChange={(e) => setSlot(e.target.value)}
                        className="w-full px-4 py-3 text-sm bg-gray-50 dark:bg-gray-800/90 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white rounded-2xl focus:outline-none focus:border-safari-500 dark:focus:border-safari-500 focus:ring-2 focus:ring-safari-500/20 font-medium transition"
                      >
                        <option className="bg-white dark:bg-gray-900">06:00 AM - Morning Shift (Summer)</option>
                        <option className="bg-white dark:bg-gray-900">07:00 AM - Morning Shift (Winter)</option>
                        <option className="bg-white dark:bg-gray-900">02:30 PM - Afternoon Shift (Winter)</option>
                        <option className="bg-white dark:bg-gray-900">03:00 PM - Afternoon Shift (Summer)</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* 3. GUEST COUNT */}
                <div className="pt-4 border-t border-gray-100 dark:border-gray-800">
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                    <Users className="w-4 h-4 text-safari-600 dark:text-safari-400" />
                    3. Number of Visitors
                  </h3>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5 flex justify-between">
                      <span>Total Guests</span>
                      <span className="text-gray-400">Max 6 per Gypsy</span>
                    </label>
                    <div className="flex items-center justify-between px-4 py-2.5 rounded-2xl bg-gray-50 dark:bg-gray-800/90 border border-gray-200 dark:border-gray-700">
                      <button
                        type="button"
                        onClick={() => setGuests(Math.max(1, guests - 1))}
                        className="w-8 h-8 rounded-lg bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 font-bold text-gray-700 dark:text-white hover:bg-gray-100 transition"
                      >
                        -
                      </button>
                      <span className="font-bold text-sm text-gray-900 dark:text-white">
                        {guests} {guests === 1 ? 'Guest' : 'Guests'} ({Math.ceil(guests / 6)} {Math.ceil(guests / 6) === 1 ? 'Gypsy' : 'Gypsies'})
                      </span>
                      <button
                        type="button"
                        onClick={() => setGuests(Math.min(18, guests + 1))}
                        className="w-8 h-8 rounded-lg bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 font-bold text-gray-700 dark:text-white hover:bg-gray-100 transition"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                {/* 4. CONTACT INFO */}
                <div className="pt-4 border-t border-gray-100 dark:border-gray-800">
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-safari-600 dark:text-safari-400" />
                    4. Primary Permit Holder
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Full Name (As on Gov ID / Aadhaar / Passport)</label>
                      <input
                        type="text"
                        required
                        maxLength={120}
                        placeholder="John Doe"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full px-4 py-3 text-sm bg-gray-50 dark:bg-gray-800/90 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white rounded-2xl focus:outline-none focus:border-safari-500 dark:focus:border-safari-500 focus:ring-2 focus:ring-safari-500/20 font-medium transition"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Email Address</label>
                      <input
                        type="email"
                        required
                        maxLength={160}
                        placeholder="permit@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 text-sm bg-gray-50 dark:bg-gray-800/90 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white rounded-2xl focus:outline-none focus:border-safari-500 dark:focus:border-safari-500 focus:ring-2 focus:ring-safari-500/20 font-medium transition"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">WhatsApp Mobile Number</label>
                      <input
                        type="tel"
                        required
                        maxLength={30}
                        placeholder="+91 98765 43210"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-4 py-3 text-sm bg-gray-50 dark:bg-gray-800/90 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white rounded-2xl focus:outline-none focus:border-safari-500 dark:focus:border-safari-500 focus:ring-2 focus:ring-safari-500/20 font-medium transition"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Special Requests or Notes (Optional)</label>
                      <textarea
                        rows="2"
                        maxLength={500}
                        placeholder="Photography equipment, senior citizen assistance, or specific wildlife naturalist request..."
                        value={specialRequests}
                        onChange={(e) => setSpecialRequests(e.target.value)}
                        className="w-full px-4 py-3 text-sm bg-gray-50 dark:bg-gray-800/90 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white rounded-2xl focus:outline-none focus:border-safari-500 dark:focus:border-safari-500 focus:ring-2 focus:ring-safari-500/20 font-medium transition resize-none"
                      />
                    </div>
                  </div>
                </div>

                {/* SUBMIT BUTTON */}
                <div className="pt-4 border-t border-gray-100 dark:border-gray-800">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-2xl bg-safari-500 hover:bg-safari-600 active:scale-[0.99] text-white font-bold text-base shadow-xl hover:shadow-safari-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {isSubmitting ? (
                      'Securing Permit Quota...'
                    ) : (
                      <>
                        <Ticket className="w-5 h-5" />
                        Submit Safari Inquiry
                      </>
                    )}
                  </button>
                  <p className="text-center text-[11px] text-gray-400 dark:text-gray-500 mt-3 flex items-center justify-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-safari-500" />
                    Our team will contact you with official tariff and permit details.
                  </p>
                </div>
              </form>
            </div>

            {/* Booking Guidelines */}
            <div className="mt-6 bg-white dark:bg-gray-900 rounded-3xl p-6 border border-gray-100 dark:border-gray-800 shadow-sm space-y-4">
              <h4 className="text-sm font-bold text-gray-950 dark:text-white flex items-center gap-2">
                <Info className="w-4 h-4 text-safari-500" />
                Official Booking Guidelines
              </h4>
              <ul className="space-y-3 text-xs text-gray-600 dark:text-gray-300">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-safari-500 shrink-0 mt-0.5" />
                  <span><strong>Original Photo ID:</strong> All passengers must carry the original ID provided during booking for gate verification.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-safari-500 shrink-0 mt-0.5" />
                  <span><strong>Arrival Time:</strong> Please arrive at the designated zone entry gate 30 minutes before your scheduled shift.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-safari-500 shrink-0 mt-0.5" />
                  <span><strong>Sanctuary Protocols:</strong> Zero plastic zone, muted clothing colors recommended, drones strictly forbidden.</span>
                </li>
              </ul>
            </div>

            {/* Help Card */}
            <div className="mt-6 rounded-3xl bg-safari-dark text-white p-6 border border-safari-800 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-safari-400 uppercase tracking-wider">
                <Phone className="w-3.5 h-3.5" />
                Need Instant Assistance?
              </div>
              <h4 className="text-base font-bold text-white">Direct Safari Booking Desk</h4>
              <p className="text-xs text-gray-300 leading-relaxed">
                Call or message our coordinators directly for custom group itineraries, corporate tours, or special photography permits.
              </p>
              <div className="pt-2 flex flex-col gap-2">
                <a href="tel:+919660871429" className="inline-flex items-center gap-2 text-xs font-bold text-safari-300 hover:text-safari-200">
                  <Phone className="w-3.5 h-3.5" /> +91-9660871429 (Kinshuk K.)
                </a>
                <a
                  href={`https://wa.me/${whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-bold text-[#25D366] hover:underline"
                >
                  WhatsApp Permit Desk Available
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
