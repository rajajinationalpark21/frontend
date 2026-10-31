import React, { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingActions from './components/FloatingActions';
import { ThemeProvider } from './context/ThemeContext';
import { countPageView, fetchContent } from './api/client';
import { warmHeaderPhotos } from './utils/warmHeaderPhotos';
import PageLoader from './components/PageLoader';
import RelatedPages from './components/RelatedPages';

// Client Sitemap Pages. Home ships with the app; every other page loads on demand.
import HomePage from './pages/HomePage';
const AboutPage = lazy(() => import('./pages/AboutPage'));
const TicketsPage = lazy(() => import('./pages/TicketsPage'));
const TermsConditionsPage = lazy(() => import('./pages/TermsConditionsPage'));
const SafariZonesPage = lazy(() => import('./pages/SafariZonesPage'));
const SafariZoneDetailPage = lazy(() => import('./pages/SafariZoneDetailPage'));
const ActivitiesPage = lazy(() => import('./pages/ActivitiesPage'));
const RaftingPage = lazy(() => import('./pages/RaftingPage'));
const StayPage = lazy(() => import('./pages/StayPage'));
const WildlifeHubPage = lazy(() => import('./pages/WildlifeHubPage'));
const FaunaPage = lazy(() => import('./pages/FaunaPage'));
const BirdsPage = lazy(() => import('./pages/BirdsPage'));
const ButterfliesPage = lazy(() => import('./pages/ButterfliesPage'));
const ReptilesPage = lazy(() => import('./pages/ReptilesPage'));
const FloraPage = lazy(() => import('./pages/FloraPage'));
const BookingPage = lazy(() => import('./pages/BookingPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const BlogPage = lazy(() => import('./pages/BlogPage'));
const BlogPostPage = lazy(() => import('./pages/BlogPostPage'));
const FAQPage = lazy(() => import('./pages/FAQPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));
const CmsDocPage = lazy(() => import('./components/CmsDocPage'));
const CmsSlugRoute = lazy(() => import('./components/CmsSlugRoute'));


/** On every page change: back to the top, and count the view for the admin dashboard. */
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    countPageView(pathname);
  }, [pathname]);

  return null;
}

const ACTIVITIES_PARENT = { label: 'Activities at Rajaji', path: '/activities' };

function MainLayout() {
  const navigate = useNavigate();
  // Every Book button lands on the booking form itself (scrolled into view), also when
  // the visitor is already on /booking. A zone slug pre-selects that zone; click events are ignored.
  const handleOpenBooking = (zone) =>
    navigate(typeof zone === 'string' && zone ? `/booking?zone=${encodeURIComponent(zone)}` : '/booking', {
      state: { toForm: Date.now() },
    });

  // Once the site content is in, fetch every page's header photo in the background.
  useEffect(() => {
    fetchContent().then((res) => warmHeaderPhotos(res?.data)).catch(() => {});
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar onOpenBooking={handleOpenBooking} />
      
      <main className="site-page-canvas flex-grow">
        <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* 1. Page – Home (About Rajaji) */}
          <Route path="/" element={<HomePage onOpenBooking={handleOpenBooking} />} />
          <Route path="/about" element={<AboutPage onOpenBooking={handleOpenBooking} />} />

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
          <Route path="/chillawali-jeep-safari-mohand-gate" element={<SafariZoneDetailPage defaultSlug="chillawali-jeep-safari-mohand-gate" onOpenBooking={handleOpenBooking} />} />
          <Route path="/chillawali-jeep-safari" element={<Navigate to="/chillawali-jeep-safari-mohand-gate" replace />} />
          <Route path="/motichur-jeep-safari" element={<SafariZoneDetailPage defaultSlug="motichur-jeep-safari" onOpenBooking={handleOpenBooking} />} />
          <Route path="/jhilmil-jheel-safari" element={<SafariZoneDetailPage defaultSlug="jhilmil-jheel-safari" onOpenBooking={handleOpenBooking} />} />
          <Route path="/gohri-range-safari" element={<SafariZoneDetailPage defaultSlug="gohri-range-safari" onOpenBooking={handleOpenBooking} />} />
          <Route path="/chaurasi-kutiya-beatles-ashram" element={<SafariZoneDetailPage defaultSlug="chaurasi-kutiya-beatles-ashram" onOpenBooking={handleOpenBooking} />} />
          <Route path="/safari/zones/:slug" element={<SafariZoneDetailPage onOpenBooking={handleOpenBooking} />} />

          {/* 5. Page – Activities at Rajaji */}
          <Route path="/activities" element={<ActivitiesPage onOpenBooking={handleOpenBooking} />} />
          <Route path="/rajaji-jeep-safari" element={<CmsDocPage section="jeepSafari" parent={ACTIVITIES_PARENT} onOpenBooking={handleOpenBooking} />} />
          <Route path="/rajaji-national-park-bird-watching-jungle-safari" element={<CmsDocPage section="birdWatching" parent={ACTIVITIES_PARENT} onOpenBooking={handleOpenBooking} />} />
          <Route path="/trekking-in-rajaji" element={<CmsDocPage section="trekking" parent={ACTIVITIES_PARENT} onOpenBooking={handleOpenBooking} />} />
          <Route path="/river-rafting-rishikesh" element={<RaftingPage onOpenBooking={handleOpenBooking} />} />
          <Route path="/rafting" element={<Navigate to="/river-rafting-rishikesh" replace />} />
          <Route path="/activities/rafting" element={<Navigate to="/river-rafting-rishikesh" replace />} />
          <Route path="/stay-near-rajaji-national-park" element={<StayPage onOpenBooking={handleOpenBooking} />} />
          <Route path="/stay" element={<Navigate to="/stay-near-rajaji-national-park" replace />} />

          {/* How to Reach (client site structure) */}
          <Route path="/how-to-reach" element={<CmsDocPage section="howToReach" onOpenBooking={handleOpenBooking} />} />

          {/* 6. Page – Wildlife & Biodiversity */}
          <Route path="/wildlife-biodiversity-rajaji-tiger-reserve" element={<WildlifeHubPage onOpenBooking={handleOpenBooking} />} />
          <Route path="/wildlife" element={<Navigate to="/wildlife-biodiversity-rajaji-tiger-reserve" replace />} />
          
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
          <Route path="/gallery" element={<Navigate to="/wildlife-biodiversity-rajaji-tiger-reserve" replace />} />
          <Route path="/eco-tourism" element={<Navigate to="/activities" replace />} />

          {/* Addresses the client documents link to */}
          <Route path="/booking-form" element={<Navigate to="/booking" replace />} />
          <Route path="/safari-zones" element={<Navigate to="/zones" replace />} />
          <Route path="/tickets-entries" element={<Navigate to="/rajaji-national-park-jeep-safari-tickets-entry-fees-charges" replace />} />
          <Route path="/safari-timings" element={<Navigate to="/rajaji-national-park-jeep-safari-tickets-entry-fees-charges" replace />} />
          <Route path="/flora-fauna-rajaji-national-park" element={<Navigate to="/wildlife-biodiversity-rajaji-tiger-reserve" replace />} />

          {/* A page URL changed in the admin panel */}
          <Route path="/:slug" element={<CmsSlugRoute onOpenBooking={handleOpenBooking} />} />
          <Route path="/wildlife/birding-areas" element={<Navigate to="/birds-of-rajaji-national-park" replace />} />
          <Route path="/birding-areas" element={<Navigate to="/birds-of-rajaji-national-park" replace />} />

          {/* Catch-all Not Found */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        </Suspense>
        <RelatedPages />
      </main>

      <Footer />

      {/* Floating Book Now, Call, WhatsApp & Scroll-to-Top Actions */}
      <FloatingActions onOpenBooking={handleOpenBooking} />
    </div>
  );
}

/** The whole site inside a router: the browser's (App) or the build's (entry-server.jsx). */
export function AppShell() {
  return (
    <ThemeProvider>
      <ScrollToTop />
      <MainLayout />
    </ThemeProvider>
  );
}

export default function App() {
  return (
    <Router>
      <AppShell />
    </Router>
  );
}
