// Public launch scope — decisions D-011, D-015, D-016 and D-017.
// The first public release remains an informational/conceptual presentation only.
// Authentication and contact channels stay disabled. Commercial pricing is also
// disabled by default: the narrowly-scoped local review below is enabled only
// when deliberately baked into a local artifact after founder approval.
export const informationalPublicLaunch = true;
export const publicAuthenticationEnabled = false;
export const publicContactEnabled = false;

// This is a public build flag, not a secret. It is intentionally false unless
// NEXT_PUBLIC_LOCAL_PRICING_REVIEW=true is set during a local review build.
// It must not be enabled for a deployment until the remaining launch gates and
// final publication authorization are closed.
export const publicCommercialOfferEnabled = process.env.NEXT_PUBLIC_LOCAL_PRICING_REVIEW === 'true';
