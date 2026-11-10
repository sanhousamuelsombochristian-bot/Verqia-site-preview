export type VideoAsset = {
  src: string | null;
  mobileSrc: string | null;
  poster: string | null;
  captionsFr: string | null;
  captionsEn: string | null;
  durationLabel?: string;
};
export type ImageAsset = { src: string | null; alt: { fr: string; en: string } };
const nullable = (value: string | undefined): string | null => value?.trim() || null;
const video = (
  src: string | undefined,
  poster: string | undefined,
  captionsFr: string | undefined,
  captionsEn: string | undefined,
  mobileSrc?: string | undefined,
): VideoAsset => ({
  src: nullable(src), mobileSrc: nullable(mobileSrc), poster: nullable(poster),
  captionsFr: nullable(captionsFr), captionsEn: nullable(captionsEn),
});
const image = (src: string | undefined, alt: ImageAsset['alt']): ImageAsset => ({ src: nullable(src), alt });

const motionMedia = {
  horizontal: '/media/brand-motion/VERQIA_PILOT_motion_16x9.mp4',
  horizontalWhite: '/media/brand-motion/VERQIA_PILOT_motion_16x9_blanc.mp4',
  vertical: '/media/brand-motion/VERQIA_PILOT_motion_9x16.mp4',
  verticalWhite: '/media/brand-motion/VERQIA_PILOT_motion_9x16_blanc.mp4',
} as const;

function responsiveVideo(
  desktopEnv: string | undefined,
  mobileEnv: string | undefined,
  defaultDesktop: string,
  defaultMobile: string,
): Pick<VideoAsset, 'src' | 'mobileSrc'> {
  const desktopOverride = nullable(desktopEnv);
  return {
    src: desktopOverride ?? defaultDesktop,
    mobileSrc: nullable(mobileEnv) ?? (desktopOverride ? desktopOverride : defaultMobile),
  };
}

export const media = {
  homeRecap: {
    ...responsiveVideo(
      process.env.NEXT_PUBLIC_MEDIA_HOME_RECAP_SRC,
      process.env.NEXT_PUBLIC_MEDIA_HOME_RECAP_MOBILE_SRC,
      motionMedia.horizontalWhite,
      motionMedia.verticalWhite,
    ),
    poster: nullable(process.env.NEXT_PUBLIC_MEDIA_HOME_RECAP_POSTER),
    captionsFr: nullable(process.env.NEXT_PUBLIC_MEDIA_HOME_RECAP_CAPTIONS_FR),
    captionsEn: nullable(process.env.NEXT_PUBLIC_MEDIA_HOME_RECAP_CAPTIONS_EN),
  } satisfies VideoAsset,
  productDetail: {
    ...responsiveVideo(
      process.env.NEXT_PUBLIC_MEDIA_PRODUCT_DETAIL_SRC,
      process.env.NEXT_PUBLIC_MEDIA_PRODUCT_DETAIL_MOBILE_SRC,
      motionMedia.horizontal,
      motionMedia.vertical,
    ),
    poster: nullable(process.env.NEXT_PUBLIC_MEDIA_PRODUCT_DETAIL_POSTER),
    captionsFr: nullable(process.env.NEXT_PUBLIC_MEDIA_PRODUCT_DETAIL_CAPTIONS_FR),
    captionsEn: nullable(process.env.NEXT_PUBLIC_MEDIA_PRODUCT_DETAIL_CAPTIONS_EN),
  } satisfies VideoAsset,
  pricingShort: video(process.env.NEXT_PUBLIC_MEDIA_PRICING_SHORT_SRC, process.env.NEXT_PUBLIC_MEDIA_PRICING_SHORT_POSTER, process.env.NEXT_PUBLIC_MEDIA_PRICING_SHORT_CAPTIONS_FR, process.env.NEXT_PUBLIC_MEDIA_PRICING_SHORT_CAPTIONS_EN),
  founder: video(process.env.NEXT_PUBLIC_MEDIA_FOUNDER_SRC, process.env.NEXT_PUBLIC_MEDIA_FOUNDER_POSTER, process.env.NEXT_PUBLIC_MEDIA_FOUNDER_CAPTIONS_FR, process.env.NEXT_PUBLIC_MEDIA_FOUNDER_CAPTIONS_EN),
  heroImage: image(process.env.NEXT_PUBLIC_MEDIA_HERO_IMAGE_SRC, { fr: 'Tableau de bord de démonstration VERQIA', en: 'VERQIA demonstration dashboard' }),
  dividers: [] as ImageAsset[],
  audiences: {
    commerce: image(process.env.NEXT_PUBLIC_MEDIA_AUDIENCE_COMMERCE_SRC, { fr: 'Illustration du secteur commerce et distribution', en: 'Illustration of commerce and distribution' }),
    professionalServices: image(process.env.NEXT_PUBLIC_MEDIA_AUDIENCE_PROFESSIONAL_SERVICES_SRC, { fr: 'Illustration de cabinets et services professionnels', en: 'Illustration of professional services' }),
    startups: image(process.env.NEXT_PUBLIC_MEDIA_AUDIENCE_STARTUPS_SRC, { fr: 'Illustration de startups', en: 'Illustration of startups' }),
    smes: image(process.env.NEXT_PUBLIC_MEDIA_AUDIENCE_SMES_SRC, { fr: 'Illustration de PME', en: 'Illustration of small and medium-sized businesses' }),
    b2b: image(process.env.NEXT_PUBLIC_MEDIA_AUDIENCE_B2B_SRC, { fr: 'Illustration d’entreprises B2B', en: 'Illustration of B2B businesses' }),
    wholesalers: image(process.env.NEXT_PUBLIC_MEDIA_AUDIENCE_WHOLESALERS_SRC, { fr: 'Illustration de grossistes et supermarchés', en: 'Illustration of wholesalers and supermarkets' }),
    largeOrganizations: image(process.env.NEXT_PUBLIC_MEDIA_AUDIENCE_LARGE_ORGANIZATIONS_SRC, { fr: 'Illustration de grandes organisations', en: 'Illustration of large organizations' }),
  } satisfies Record<string, ImageAsset>,
} as const;
