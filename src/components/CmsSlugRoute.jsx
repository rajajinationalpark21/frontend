import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchContent } from '../api/client';
import PageLoader from './PageLoader';
import CmsDocPage from './CmsDocPage';
import NotFoundPage from '../pages/NotFoundPage';
import SafariZoneDetailPage from '../pages/SafariZoneDetailPage';
import StayPage from '../pages/StayPage';
import RaftingPage from '../pages/RaftingPage';
import TicketsPage from '../pages/TicketsPage';
import TermsConditionsPage from '../pages/TermsConditionsPage';
import ActivitiesPage from '../pages/ActivitiesPage';
import WildlifeHubPage from '../pages/WildlifeHubPage';
import FaunaPage from '../pages/FaunaPage';
import BirdsPage from '../pages/BirdsPage';
import ButterfliesPage from '../pages/ButterfliesPage';
import ReptilesPage from '../pages/ReptilesPage';
import FloraPage from '../pages/FloraPage';
import FAQPage from '../pages/FAQPage';

const ACTIVITIES_PARENT = { label: 'Activities at Rajaji', path: '/activities' };

// Sections whose page is the client document alone.
const DOC_PAGES = {
  jeepSafari: ACTIVITIES_PARENT,
  birdWatching: ACTIVITIES_PARENT,
  trekking: ACTIVITIES_PARENT,
  howToReach: null,
};

// Pages with their own layout, found by the URL stored on their section.
const LAYOUT_PAGES = [
  ['stay', 'slug', StayPage],
  ['rafting', 'slug', RaftingPage],
  ['tickets', 'slug', TicketsPage],
  ['parkRules', 'slug', TermsConditionsPage],
  ['activities', 'slug', ActivitiesPage],
  ['fauna', 'hubSlug', WildlifeHubPage],
  ['fauna', 'slug', FaunaPage],
  ['birds', 'slug', BirdsPage],
  ['butterflies', 'slug', ButterfliesPage],
  ['reptiles', 'slug', ReptilesPage],
  ['flora', 'slug', FloraPage],
  ['faqs', 'slug', FAQPage],
];

/**
 * Resolves a one-segment URL that no fixed route matches against the page URLs
 * stored in the CMS, so a URL changed in the admin panel works straight away.
 */
export default function CmsSlugRoute({ onOpenBooking }) {
  const { slug } = useParams();
  const [content, setContent] = useState(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    fetchContent()
      .then((res) => setContent(res.data))
      .catch(() => setFailed(true));
  }, []);

  if (failed) return <NotFoundPage />;
  if (!content) return <PageLoader />;

  if ((content.safari?.zones || []).some((zone) => zone.slug === slug)) {
    return <SafariZoneDetailPage defaultSlug={slug} onOpenBooking={onOpenBooking} />;
  }
  const docSection = Object.keys(DOC_PAGES).find((key) => content[key]?.slug === slug);
  if (docSection) {
    return <CmsDocPage section={docSection} parent={DOC_PAGES[docSection]} onOpenBooking={onOpenBooking} />;
  }
  const layout = LAYOUT_PAGES.find(([key, field]) => content[key]?.[field] === slug);
  if (layout) {
    const Page = layout[2];
    return <Page onOpenBooking={onOpenBooking} />;
  }
  return <NotFoundPage />;
}
