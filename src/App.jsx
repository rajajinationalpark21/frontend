import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
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
import BookingPage from './pages/BookingPage';
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
  const navigate = useNavigate();
  const handleOpenBooking = () => navigate('/booking');

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar onOpenBooking={handleOpenBooking} />
      
      <main className="flex-grow">
        <Routes>
          {/* Primary Core Pages */}
          <Route path="/" element={<HomePage onOpenBooking={handleOpenBooking} />} />
          <Route path="/about" element={<AboutPage onOpenBooking={handleOpenBooking} />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/booking" element={<BookingPage />} />
          <Route path="/book" element={<BookingPage />} />
          <Route path="/safari/book" element={<BookingPage />} />

          {/* Safari Section & Dropdown Routes */}
          <Route path="/safari" element={<SafariInfoPage onOpenBooking={handleOpenBooking} />} />
          <Route path="/tours" element={<SafariInfoPage onOpenBooking={handleOpenBooking} />} />
          <Route path="/safari/zones" element={<SafariZonesPage onOpenBooking={handleOpenBooking} />} />
          <Route path="/zones" element={<SafariZonesPage onOpenBooking={handleOpenBooking} />} />
          <Route path="/safari/tickets" element={<TicketsPage onOpenBooking={handleOpenBooking} />} />
          <Route path="/tickets" element={<TicketsPage onOpenBooking={handleOpenBooking} />} />
          <Route path="/safari/rules" element={<ParkRulesPage onOpenBooking={handleOpenBooking} />} />
          <Route path="/park-rules" element={<ParkRulesPage onOpenBooking={handleOpenBooking} />} />
          <Route path="/how-to-reach" element={<HowToReachPage onOpenBooking={handleOpenBooking} />} />

          {/* Wildlife & Nature Section */}
          <Route path="/wildlife/birds" element={<BirdsPage onOpenBooking={handleOpenBooking} />} />
          <Route path="/birds" element={<BirdsPage onOpenBooking={handleOpenBooking} />} />
          <Route path="/wildlife/birding-areas" element={<BirdingAreasPage onOpenBooking={handleOpenBooking} />} />
          <Route path="/birding-areas" element={<BirdingAreasPage onOpenBooking={handleOpenBooking} />} />
          <Route path="/wildlife/fauna" element={<FaunaPage onOpenBooking={handleOpenBooking} />} />
          <Route path="/fauna" element={<FaunaPage onOpenBooking={handleOpenBooking} />} />
          <Route path="/wildlife/flora" element={<FloraPage onOpenBooking={handleOpenBooking} />} />
          <Route path="/flora" element={<FloraPage onOpenBooking={handleOpenBooking} />} />
          <Route path="/wildlife/butterflies" element={<ButterfliesPage onOpenBooking={handleOpenBooking} />} />
          <Route path="/butterflies" element={<ButterfliesPage onOpenBooking={handleOpenBooking} />} />

          {/* Stay & Eco-Tourism */}
          <Route path="/stay" element={<StayPage onOpenBooking={handleOpenBooking} />} />
          <Route path="/eco-tourism" element={<EcoTourismPage onOpenBooking={handleOpenBooking} />} />

          {/* Gallery & Journal */}
          <Route path="/gallery" element={<GalleryPage onOpenBooking={handleOpenBooking} />} />
          <Route path="/blog" element={<BlogPage onOpenBooking={handleOpenBooking} />} />
          <Route path="/journal" element={<BlogPage onOpenBooking={handleOpenBooking} />} />
          <Route path="/blog/:slug" element={<BlogPostPage onOpenBooking={handleOpenBooking} />} />
          <Route path="/journal/:slug" element={<BlogPostPage onOpenBooking={handleOpenBooking} />} />
          <Route path="/blog/:id" element={<BlogPostPage onOpenBooking={handleOpenBooking} />} />

          {/* Catch-all Not Found */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      <Footer />

      {/* Floating Book Now, WhatsApp & Scroll-to-Top Actions */}
      <FloatingActions onOpenBooking={handleOpenBooking} />
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
