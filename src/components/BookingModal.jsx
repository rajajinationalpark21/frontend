import React, { useState } from 'react';
import { X, Calendar, Clock, Users, Compass, CheckCircle2, ShieldCheck, User, Mail, Phone } from 'lucide-react';
// TODO: When booking backend is ready, uncomment:
// import { submitBooking } from '../api/client';

export default function BookingModal({ isOpen, onClose }) {
  const [zone, setZone] = useState('Chila Core Range');
  const [slot, setSlot] = useState('06:00 AM - Morning Shift');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [guests, setGuests] = useState(2);
  const [vehicle, setVehicle] = useState('Open 4x4 Safari Gypsy');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Silent drop if automated spam bot filled honeypot
    if (honeypot) {
      console.warn("Spam bot trapped.");
      return;
    }

    if (isSubmitting) return;
    setIsSubmitting(true);

    // TODO: When booking backend is ready, replace the setTimeout below with:
    //
    // try {
    //   const res = await submitBooking({
    //     zone, date, timeSlot: slot, guests, vehicle,
    //     fullName, email, phone
    //   });
    //   setIsSuccess(true);
    //   setTimeout(() => { setIsSuccess(false); onClose(); }, 3000);
    // } catch (err) {
    //   alert("Failed to submit booking. Please try again.");
    // } finally {
    //   setIsSubmitting(false);
    // }

    // Current: fake success with timeout (no backend)
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        onClose();
      }, 3000);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div 
        className="relative w-full max-w-lg bg-white dark:bg-gray-900 rounded-3xl shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-800 p-5 sm:p-8 max-h-[92dvh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 sm:top-5 sm:right-5 p-2 rounded-full text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {isSuccess ? (
          <div className="py-12 text-center space-y-4">
            <div className="w-16 h-16 bg-safari-100 dark:bg-safari-900/40 text-safari-600 dark:text-safari-400 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              Permit Reserved!
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm max-w-xs mx-auto">
              Thank you, <strong>{fullName || 'Explorer'}</strong>. Your provisional booking for <strong>{zone}</strong> on <strong>{date}</strong> ({slot}) has been confirmed. Confirmation details sent to <strong>{email}</strong>.
            </p>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-safari-50 dark:bg-safari-900/40 text-safari-700 dark:text-safari-300 text-xs font-semibold mb-2">
                <ShieldCheck className="w-3.5 h-3.5" /> Official Safari Permit Portal
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                Reserve Your Safari Permit
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Daily visitor quotas are capped to protect the pristine wildlife habitat.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-sm">
              {/* Invisible Honeypot Trap against automated bots */}
              <div className="opacity-0 absolute -z-10 select-none pointer-events-none h-0 w-0 overflow-hidden" aria-hidden="true">
                <label htmlFor="permit_hp">Leave empty</label>
                <input
                  id="permit_hp"
                  type="text"
                  name="permit_hp"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              {/* Visitor Contact Info */}
              <div className="space-y-3 pb-2 border-b border-gray-100 dark:border-gray-800">
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-gray-800 dark:text-gray-200 mb-1.5 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-safari-600 dark:text-safari-400" /> Full Name
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={120}
                    placeholder="Primary Permit Holder Name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-gray-50 dark:bg-gray-800/90 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white rounded-xl focus:outline-none focus:border-safari-500 dark:focus:border-safari-500 focus:ring-2 focus:ring-safari-500/20 placeholder:text-gray-400 dark:placeholder:text-gray-500 font-medium transition"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-gray-800 dark:text-gray-200 mb-1.5 flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-safari-600 dark:text-safari-400" /> Email
                    </label>
                    <input
                      type="email"
                      required
                      maxLength={160}
                      placeholder="permit@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm bg-gray-50 dark:bg-gray-800/90 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white rounded-xl focus:outline-none focus:border-safari-500 dark:focus:border-safari-500 focus:ring-2 focus:ring-safari-500/20 placeholder:text-gray-400 dark:placeholder:text-gray-500 font-medium transition"
                    />
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-gray-800 dark:text-gray-200 mb-1.5 flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-safari-600 dark:text-safari-400" /> Mobile Phone
                    </label>
                    <input
                      type="tel"
                      required
                      maxLength={30}
                      placeholder="+91 98765 43210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm bg-gray-50 dark:bg-gray-800/90 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white rounded-xl focus:outline-none focus:border-safari-500 dark:focus:border-safari-500 focus:ring-2 focus:ring-safari-500/20 placeholder:text-gray-400 dark:placeholder:text-gray-500 font-medium transition"
                    />
                  </div>
                </div>
              </div>

              {/* Safari Zone */}
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-gray-800 dark:text-gray-200 mb-1.5">
                  Select Zone
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    'Chila Core Range',
                    'Motichur Range',
                    'Jhilmil Jheel Sanctuary',
                    'Gohari Range'
                  ].map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setZone(item)}
                      className={`px-3 py-2 text-xs sm:text-sm rounded-xl border text-left transition font-medium ${
                        zone === item
                          ? 'border-safari-500 bg-safari-50/70 dark:bg-safari-950/60 text-safari-900 dark:text-safari-300 ring-1 ring-safari-500'
                          : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800'
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              {/* Date & Slot */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-gray-800 dark:text-gray-200 mb-1.5 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-safari-600 dark:text-safari-400" /> Date
                  </label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-gray-50 dark:bg-gray-800/90 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white rounded-xl focus:outline-none focus:border-safari-500 dark:focus:border-safari-500 focus:ring-2 focus:ring-safari-500/20 font-medium transition"
                  />
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-gray-800 dark:text-gray-200 mb-1.5 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-safari-600 dark:text-safari-400" /> Time Slot
                  </label>
                  <select
                    value={slot}
                    onChange={(e) => setSlot(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-gray-50 dark:bg-gray-800/90 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white rounded-xl focus:outline-none focus:border-safari-500 dark:focus:border-safari-500 focus:ring-2 focus:ring-safari-500/20 font-medium transition"
                  >
                    <option className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white">06:00 AM - Morning Shift (Summer)</option>
                    <option className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white">07:00 AM - Morning Shift (Winter)</option>
                    <option className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white">02:30 PM - Afternoon Shift (Winter)</option>
                    <option className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white">03:00 PM - Afternoon Shift (Summer)</option>
                  </select>
                </div>
              </div>

              {/* Guests & Vehicle */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5 flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-gray-400" /> Number of Guests
                  </label>
                  <div className="flex items-center border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden bg-gray-50 dark:bg-gray-800">
                    <button
                      type="button"
                      onClick={() => setGuests(Math.max(1, guests - 1))}
                      className="px-3 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 font-bold"
                    >
                      -
                    </button>
                    <span className="flex-1 text-center font-semibold text-xs text-gray-900 dark:text-white">
                      {guests} {guests === 1 ? 'Guest' : 'Guests'}
                    </span>
                    <button
                      type="button"
                      onClick={() => setGuests(Math.min(8, guests + 1))}
                      className="px-3 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 font-bold"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5 flex items-center gap-1">
                    <Compass className="w-3.5 h-3.5 text-gray-400" /> Vehicle Type
                  </label>
                  <select
                    value={vehicle}
                    onChange={(e) => setVehicle(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white rounded-xl focus:outline-none focus:border-safari-500"
                  >
                    <option>Open 4x4 Safari Gypsy (Max 6 Guests)</option>
                  </select>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 text-sm font-semibold text-white bg-safari-500 hover:bg-safari-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl shadow-md transition duration-200 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Validating & Reserving Permit...
                    </>
                  ) : (
                    'Confirm Permit Reservation'
                  )}
                </button>
                <p className="text-center text-[11px] text-gray-400 mt-2">
                  Instant digital permit barcode generated upon booking. Zero cancellation fee up to 48 hrs.
                </p>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
