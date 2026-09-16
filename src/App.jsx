import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import BookingModal from './components/BookingModal';
import FloatingActions from './components/FloatingActions';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import SafariInfoPage from './pages/SafariInfoPage';
import SafariZonesPage from './pages/SafariZonesPage';
import TicketsPage from './pages/TicketsPage';
import ParkRulesPage from './pages/ParkRulesPage';
import HowToReachPage from './pages/HowToReachPage';
import StayPage from './pages/StayPage';
import BirdsPage from './pages/BirdsPage';
import BirdingAreasPage from './pages/BirdingAreasPage';
import FaunaPage from './pages/FaunaPage';
import FloraPage from './pages/FloraPage';
import ButterfliesPage from './pages/ButterfliesPage';
import EcoTourismPage from './pages/EcoTourismPage';
import BlogPage from './pages/BlogPage';
import BlogPostPage from './pages/BlogPostPage';
import GalleryPage from './pages/GalleryPage';
import ContactPage from './pages/ContactPage';
import NotFoundPage from './pages/NotFoundPage';
import { ThemeProvider } from './context/ThemeContext';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
}

function MainLayout() {
  const [bookingOpen, setBookingOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar onOpenBooking={() => setBookingOpen(true)} />
      
      <main className="flex-grow">
        <Routes>
          {/* Primary Core Pages */}
          <Route path="/" element={<HomePage onOpenBooking={() => setBookingOpen(true)} />} />
          <Route path="/about" element={<AboutPage onOpenBooking={() => setBookingOpen(true)} />} />
          <Route path="/contact" element={<ContactPage />} />

          {/* Safari Section & Dropdown Routes */}
          <Route path="/safari" element={<SafariInfoPage onOpenBooking={() => setBookingOpen(true)} />} />
          <Route path="/tours" element={<SafariInfoPage onOpenBooking={() => setBookingOpen(true)} />} />
          <Route path="/safari/zones" element={<SafariZonesPage onOpenBooking={() => setBookingOpen(true)} />} />
          <Route path="/zones" element={<SafariZonesPage onOpenBooking={() => setBookingOpen(true)} />} />
          <Route path="/safari/tickets" element={<TicketsPage onOpenBooking={() => setBookingOpen(true)} />} />
          <Route path="/tickets" element={<TicketsPage onOpenBooking={() => setBookingOpen(true)} />} />
          <Route path="/safari/rules" element={<ParkRulesPage onOpenBooking={() => setBookingOpen(true)} />} />
          <Route path="/park-rules" element={<ParkRulesPage onOpenBooking={() => setBookingOpen(true)} />} />
          <Route path="/how-to-reach" element={<HowToReachPage onOpenBooking={() => setBookingOpen(true)} />} />

          {/* Wildlife & Nature Section */}
          <Route path="/wildlife/birds" element={<BirdsPage onOpenBooking={() => setBookingOpen(true)} />} />
          <Route path="/birds" element={<BirdsPage onOpenBooking={() => setBookingOpen(true)} />} />
          <Route path="/wildlife/birding-areas" element={<BirdingAreasPage onOpenBooking={() => setBookingOpen(true)} />} />
          <Route path="/birding-areas" element={<BirdingAreasPage onOpenBooking={() => setBookingOpen(true)} />} />
          <Route path="/wildlife/fauna" element={<FaunaPage onOpenBooking={() => setBookingOpen(true)} />} />
          <Route path="/fauna" element={<FaunaPage onOpenBooking={() => setBookingOpen(true)} />} />
          <Route path="/wildlife/flora" element={<FloraPage onOpenBooking={() => setBookingOpen(true)} />} />
          <Route path="/flora" element={<FloraPage onOpenBooking={() => setBookingOpen(true)} />} />
          <Route path="/wildlife/butterflies" element={<ButterfliesPage onOpenBooking={() => setBookingOpen(true)} />} />
          <Route path="/butterflies" element={<ButterfliesPage onOpenBooking={() => setBookingOpen(true)} />} />

          {/* Stay & Eco-Tourism */}
          <Route path="/stay" element={<StayPage onOpenBooking={() => setBookingOpen(true)} />} />
          <Route path="/eco-tourism" element={<EcoTourismPage onOpenBooking={() => setBookingOpen(true)} />} />

          {/* Gallery & Journal */}
          <Route path="/gallery" element={<GalleryPage onOpenBooking={() => setBookingOpen(true)} />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/journal" element={<BlogPage />} />
          <Route path="/blog/:id" element={<BlogPostPage />} />

          {/* Catch-all Not Found */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      <Footer />

      {/* Floating Book Now, WhatsApp & Scroll-to-Top Actions */}
      <FloatingActions onOpenBooking={() => setBookingOpen(true)} />

      {/* Global Booking Modal */}
      <BookingModal
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <Router>
        <ScrollToTop />
        <MainLayout />
      </Router>
    </ThemeProvider>
  );
}
