import { contactInfo } from '../data/safariData';

// The numbers from Admin → Settings → Website Details; the built-in ones only
// while the content has not loaded.
export const sitePhone = (settings) => settings?.contact?.phone || contactInfo.phone;

export const siteWhatsapp = (settings) =>
  settings?.contact?.whatsapp || settings?.contact?.phone || contactInfo.whatsapp;
