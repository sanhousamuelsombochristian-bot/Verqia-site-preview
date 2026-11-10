import { publicContactEnabled } from '@/lib/launch-scope';

const nullable = (value: string | undefined): string | null => value?.trim() || null;
const publicContact = (value: string | undefined): string | null => publicContactEnabled ? nullable(value) : null;

// All identity and contact values remain null until supplied/approved.
export const site = {
  // D-017: public contact remains disabled for the informational first release.
  whatsapp: publicContact(process.env.NEXT_PUBLIC_WHATSAPP),
  email: publicContact(process.env.NEXT_PUBLIC_CONTACT_EMAIL),
  calendly: publicContact(process.env.NEXT_PUBLIC_CALENDLY),
  domain: nullable(process.env.NEXT_PUBLIC_SITE_URL),
  city: nullable(process.env.NEXT_PUBLIC_CITY),
  legalAddress: nullable(process.env.NEXT_PUBLIC_LEGAL_ADDRESS),
  legalIdentity: nullable(process.env.NEXT_PUBLIC_LEGAL_IDENTITY),
  registrationNumber: nullable(process.env.NEXT_PUBLIC_REGISTRATION_NUMBER),
  legalForm: nullable(process.env.NEXT_PUBLIC_LEGAL_FORM),
  rccm: nullable(process.env.NEXT_PUBLIC_RCCM ?? process.env.NEXT_PUBLIC_REGISTRATION_NUMBER),
  shareCapital: nullable(process.env.NEXT_PUBLIC_SHARE_CAPITAL),
  taxId: nullable(process.env.NEXT_PUBLIC_TAX_ID),
  legalRepresentative: nullable(process.env.NEXT_PUBLIC_LEGAL_REPRESENTATIVE),
  publicationDirector: nullable(process.env.NEXT_PUBLIC_PUBLICATION_DIRECTOR),
  contactPhone: publicContact(process.env.NEXT_PUBLIC_CONTACT_PHONE),
  privacyContactEmail: publicContact(process.env.NEXT_PUBLIC_PRIVACY_CONTACT_EMAIL),
  hostingProvider: nullable(process.env.NEXT_PUBLIC_HOSTING_PROVIDER),
  hostingAddress: nullable(process.env.NEXT_PUBLIC_HOSTING_ADDRESS),
  hostingContact: nullable(process.env.NEXT_PUBLIC_HOSTING_CONTACT),
  // Transparent originals supplied by the user; override paths only with approved source files.
  logoPath: nullable(process.env.NEXT_PUBLIC_LOGO_PATH) ?? '/media/brand/logo.png',
  logoSloganPath: nullable(process.env.NEXT_PUBLIC_LOGO_SLOGAN_PATH) ?? '/media/brand/logo-slogan.png',
  logoSymbolPath: nullable(process.env.NEXT_PUBLIC_LOGO_SYMBOL_PATH) ?? '/media/brand/symbole.png',
  // User-supplied VERQIA wordmark, cropped only to remove transparent canvas padding.
  logoWordmarkPath: nullable(process.env.NEXT_PUBLIC_LOGO_WORDMARK_PATH) ?? '/media/brand/verqia-wordmark-lime.png',
  logoOnyxPath: nullable(process.env.NEXT_PUBLIC_LOGO_ONYX_PATH),
  logoRoundIconPath: nullable(process.env.NEXT_PUBLIC_LOGO_ROUND_ICON_PATH),
  // Approved founder identity and portrait; deployments can replace the path/name through public environment variables.
  founderName: nullable(process.env.NEXT_PUBLIC_FOUNDER_NAME) ?? 'SANHOU Sombo Christian Samuel',
  founderPhotoPath: nullable(process.env.NEXT_PUBLIC_FOUNDER_PHOTO) ?? '/media/about/founder-sanhou-sombo-christian-samuel.webp',
  signupUrl: nullable(process.env.NEXT_PUBLIC_SIGNUP_URL),
} as const;
