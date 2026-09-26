import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingActions from './components/FloatingActions';

// Client Sitemap Pages
import HomePage from './pages/HomePage';
import TicketsPage from './pages/TicketsPage';
import TermsConditionsPage from './pages/TermsConditionsPage';
import SafariZonesPage from './pages/SafariZonesPage';
import SafariZoneDetailPage from './pages/SafariZoneDetailPage';
import ActivitiesPage from './pages/ActivitiesPage';
import RaftingPage from './pages/RaftingPage';
import StayPage from './pages/StayPage';
import WildlifeHubPage from './pages/WildlifeHubPage';
import FaunaPage from './pages/FaunaPage';
import BirdsPage from './pages/BirdsPage';
import ButterfliesPage from './pages/ButterfliesPage';
import ReptilesPage from './pages/ReptilesPage';
import FloraPage from './pages/FloraPage';
import BookingPage from './pages/BookingPage';
import ContactPage from './pages/ContactPage';
import BlogPage from './pages/BlogPage';
import BlogPostPage from './pages/BlogPostPage';
import FAQPage from './pages/FAQPage';
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
          {/* 1. Page – Home (About Rajaji) */}
          <Route path="/" element={<HomePage onOpenBooking={handleOpenBooking} />} />

          {/* 2. Page – Tickets, Entry Fees & Safari Charges */}
          <Route path="/tickets" element={<TicketsPage onOpenBooking={handleOpenBooking} />} />
          <Route path="/safari/tickets" element={<TicketsPage onOpenBooking={handleOpenBooking} />} />
          <Route path="/rajaji-national-park-jeep-safari-tickets-entry-fees-charges" element={<TicketsPage onOpenBooking={handleOpenBooking} />} />

          {/* 3. Rajaji Safari Terms & Conditions – Cancellation, Refunds & Safari Rules */}
          <Route path="/terms" element={<TermsConditionsPage />} />
          <Route path="/terms-and-conditions" element={<TermsConditionsPage />} />
          <Route path="/safari/rules" element={<TermsConditionsPage />} />
          <Route path="/park-rules" element={<TermsConditionsPage />} />
          <Route path="/cancellation-policy" element={<TermsConditionsPage />} />
          <Route path="/rajaji-jeep-safari-terms-conditions-cancellation-refund" element={<TermsConditionsPage />} />

          {/* 4. Page – Jungle Safari/Jeep Safari Zones */}
          <Route path="/zones" element={<SafariZonesPage onOpenBooking={handleOpenBooking} />} />
          <Route path="/safari/zones" element={<SafariZonesPage onOpenBooking={handleOpenBooking} />} />
          <Route path="/safari" element={<SafariZonesPage onOpenBooking={handleOpenBooking} />} />
          <Route path="/tours" element={<SafariZonesPage onOpenBooking={handleOpenBooking} />} />
          
          {/* 7 Zone Sub-pages */}
          <Route path="/chilla-jeep-safari" element={<SafariZoneDetailPage defaultSlug="chilla-jeep-safari" onOpenBooking={handleOpenBooking} />} />
          <Route path="/ranipur-gate-jeep-safari" element={<SafariZoneDetailPage defaultSlug="ranipur-gate-jeep-safari" onOpenBooking={handleOpenBooking} />} />
          <Route path="/chillawali-jeep-safari" element={<SafariZoneDetailPage defaultSlug="chillawali-jeep-safari" onOpenBooking={handleOpenBooking} />} />
          <Route path="/motichur-jeep-safari" element={<SafariZoneDetailPage defaultSlug="motichur-jeep-safari" onOpenBooking={handleOpenBooking} />} />
          <Route path="/jhilmil-jheel-safari" element={<SafariZoneDetailPage defaultSlug="jhilmil-jheel-safari" onOpenBooking={handleOpenBooking} />} />
          <Route path="/gohri-range-safari" element={<SafariZoneDetailPage defaultSlug="gohri-range-safari" onOpenBooking={handleOpenBooking} />} />
          <Route path="/chaurasi-kutiya-beatles-ashram" element={<SafariZoneDetailPage defaultSlug="chaurasi-kutiya-beatles-ashram" onOpenBooking={handleOpenBooking} />} />
          <Route path="/safari/zones/:slug" element={<SafariZoneDetailPage onOpenBooking={handleOpenBooking} />} />

          {/* 5. Page – Activities at Rajaji */}
          <Route path="/activities" element={<ActivitiesPage onOpenBooking={handleOpenBooking} />} />
          <Route path="/rafting" element={<RaftingPage onOpenBooking={handleOpenBooking} />} />
          <Route path="/activities/rafting" element={<RaftingPage onOpenBooking={handleOpenBooking} />} />
          <Route path="/stay" element={<StayPage onOpenBooking={handleOpenBooking} />} />

          {/* 6. Page – Wildlife & Biodiversity */}
          <Route path="/wildlife" element={<WildlifeHubPage onOpenBooking={handleOpenBooking} />} />
          
          {/* 5 Wildlife Sub-pages */}
          <Route path="/mammals-of-rajaji-tiger-reserve" element={<FaunaPage onOpenBooking={handleOpenBooking} />} />
          <Route path="/fauna" element={<FaunaPage onOpenBooking={handleOpenBooking} />} />
          <Route path="/wildlife/fauna" element={<FaunaPage onOpenBooking={handleOpenBooking} />} />

          <Route path="/birds-of-rajaji-national-park" element={<BirdsPage onOpenBooking={handleOpenBooking} />} />
          <Route path="/birds" element={<BirdsPage onOpenBooking={handleOpenBooking} />} />
          <Route path="/wildlife/birds" element={<BirdsPage onOpenBooking={handleOpenBooking} />} />

          <Route path="/butterflies-of-rajaji-national-park" element={<ButterfliesPage onOpenBooking={handleOpenBooking} />} />
          <Route path="/butterflies" element={<ButterfliesPage onOpenBooking={handleOpenBooking} />} />
          <Route path="/wildlife/butterflies" element={<ButterfliesPage onOpenBooking={handleOpenBooking} />} />

          <Route path="/reptiles-of-rajaji-tiger-reserve" element={<ReptilesPage onOpenBooking={handleOpenBooking} />} />
          <Route path="/reptiles" element={<ReptilesPage onOpenBooking={handleOpenBooking} />} />
          <Route path="/wildlife/reptiles" element={<ReptilesPage onOpenBooking={handleOpenBooking} />} />

          <Route path="/flora-of-rajaji-national-park" element={<FloraPage onOpenBooking={handleOpenBooking} />} />
          <Route path="/flora" element={<FloraPage onOpenBooking={handleOpenBooking} />} />
          <Route path="/wildlife/flora" element={<FloraPage onOpenBooking={handleOpenBooking} />} />

          {/* 7. Page – Book Now */}
          <Route path="/booking" element={<BookingPage />} />
          <Route path="/book" element={<BookingPage />} />
          <Route path="/safari/book" element={<BookingPage />} />

          {/* 8. Contact us */}
          <Route path="/contact" element={<ContactPage />} />

          {/* 9. Page – Blog */}
          <Route path="/blog" element={<BlogPage onOpenBooking={handleOpenBooking} />} />
          <Route path="/journal" element={<BlogPage onOpenBooking={handleOpenBooking} />} />
          <Route path="/blog/:slug" element={<BlogPostPage onOpenBooking={handleOpenBooking} />} />
          <Route path="/journal/:slug" element={<BlogPostPage onOpenBooking={handleOpenBooking} />} />
          <Route path="/blog/:id" element={<BlogPostPage onOpenBooking={handleOpenBooking} />} />

          {/* 10. FAQ */}
          <Route path="/faq" element={<FAQPage onOpenBooking={handleOpenBooking} />} />

          {/* Legacy URL redirects to client-requested pages */}
          <Route path="/about" element={<Navigate to="/" replace />} />
          <Route path="/gallery" element={<Navigate to="/wildlife" replace />} />
          <Route path="/eco-tourism" element={<Navigate to="/activities" replace />} />
          <Route path="/how-to-reach" element={<Navigate to="/contact" replace />} />
          <Route path="/wildlife/birding-areas" element={<Navigate to="/birds-of-rajaji-national-park" replace />} />
          <Route path="/birding-areas" element={<Navigate to="/birds-of-rajaji-national-park" replace />} />

          {/* Catch-all Not Found */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      <Footer />

      {/* Floating Book Now, Call, WhatsApp & Scroll-to-Top Actions */}
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
