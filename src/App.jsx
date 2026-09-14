import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import BookingModal from './components/BookingModal';
import FloatingActions from './components/FloatingActions';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import SafariInfoPage from './pages/SafariInfoPage';
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
          <Route path="/" element={<HomePage onOpenBooking={() => setBookingOpen(true)} />} />
          <Route path="/about" element={<AboutPage onOpenBooking={() => setBookingOpen(true)} />} />
          <Route path="/safari" element={<SafariInfoPage onOpenBooking={() => setBookingOpen(true)} />} />
          <Route path="/tours" element={<SafariInfoPage onOpenBooking={() => setBookingOpen(true)} />} />
          <Route path="/gallery" element={<GalleryPage onOpenBooking={() => setBookingOpen(true)} />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/journal" element={<BlogPage />} />
          <Route path="/blog/:id" element={<BlogPostPage />} />
          <Route path="/contact" element={<ContactPage />} />
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
