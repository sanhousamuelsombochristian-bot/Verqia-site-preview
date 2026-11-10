export const scrollPresets = {
  responsive: { lerp: 0.1, wheelMultiplier: 1 },
  balanced: { lerp: 0.055, wheelMultiplier: 0.82 },
  slow: { lerp: 0.05, wheelMultiplier: 0.75 },
} as const;

export type ScrollPreset = keyof typeof scrollPresets;
const requestedPreset = process.env.NEXT_PUBLIC_SCROLL_PRESET?.trim().toLowerCase();
export const activeScrollPreset: ScrollPreset =
  requestedPreset && Object.hasOwn(scrollPresets, requestedPreset)
    ? (requestedPreset as ScrollPreset)
    : 'balanced';

export const motionConfig = {
  scroll: scrollPresets[activeScrollPreset],
  reveal: {
    duration: 0.7,
    stagger: 0.08,
    amount: 0.35,
    once: true,
    ease: [0.22, 1, 0.36, 1] as const,
    distance: 24,
  },
  ambient: { duration: 7, distance: 6 },
  pageTransition: { duration: 0.2 },
} as const;
