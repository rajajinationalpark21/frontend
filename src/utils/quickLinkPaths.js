/**
 * Where the home page's quick links go. The section anchors are the Tickets page's
 * headings as DocContent turns them into ids.
 */
export function quickLinkPaths(site) {
  const tickets = `/${site?.tickets?.slug || 'rajaji-national-park-jeep-safari-tickets-entry-fees-charges'}`;
  return {
    timings: `${tickets}#rajaji-jeep-safari-timings`,
    tickets: `${tickets}#rajaji-national-park-entry-fees-jeep-permit-charges`,
    zones: '/zones',
    rules: `/${site?.parkRules?.slug || 'rajaji-jeep-safari-terms-conditions-cancellation-refund'}`,
  };
}
