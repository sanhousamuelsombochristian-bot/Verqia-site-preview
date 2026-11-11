# Phase 4 — Local technical evidence (controlled continuation)

**Date:** 8 November 2026  
**Environment:** local production artifact only; no public domain, staging account, real personal data or external service was used.

## Corrections made

| Item | Targeted correction | Evidence |
|---|---|---|
| Informational scope enforcement | Added `lib/launch-scope.ts`; gates public authentication, contact channels and commercial offer surfaces off | Scope E2E tests, source review |
| Public auth claims | Removed public account navigation; auth routes display availability notice without form/OAuth buttons while scope gate is off | FR/EN scope E2E |
| Contact claims | Scope-gated public contact values; disabled sticky contact CTA; contact page uses transparent availability wording | FR/EN scope E2E and route scan |
| Commercial claims | Public pricing remains disabled by default, including legal CGV price table, plan availability labels and Offer JSON-LD. Founder-approved existing price content can be reviewed only in a deliberately built local artifact using `NEXT_PUBLIC_LOCAL_PRICING_REVIEW=true`; authentication, contact, legal and deployment gates remain unchanged. | Default FR/EN scope E2E; separate FR/EN local pricing-review E2E (2 passed) |
| Internal kit | Applied hydration-safe theme state and returned proxy-level 404 for `/{locale}/_kit` | E2E 404 test; route scan |
| E2E reproducibility | `test:e2e` builds the default informational artifact before Playwright; web server runs `next start` only | `npm run test:e2e`: 12 passed, including the removed About sections, reduced-motion hydration, theme-script handling, responsive V/VERQIA brand checks and the compact-header no-overlap regression |
| Baseline headers | Added local checks for MIME, referrer, framing, browser permissions and opener isolation | `curl` header inspection |
| Reduced-motion hydration | `Reveal` renders an identical static element for SSR/first hydration, then adds Motion only after hydration when appropriate | Production E2E test with `prefers-reduced-motion: reduce` passed without hydration console mismatch |
| Theme state and React 19 | In-house `ThemeProvider` replaces `next-themes`; it renders no theme script in the React tree. CSS defaults to dark and the persisted `light`/`dark` value is restored after hydration | Production E2E stored-theme test passed with zero application-JSON/theme-bootstrap scripts and without React’s client script-tag warning or hydration error |
| Responsive brand | Header, compact header, mobile sheet and footer compose the supplied V symbol with the user-provided VERQIA wordmark image. Its transparent 500×500 canvas was losslessly cropped to a 210×44 local asset before display; both values scale down through CSS breakpoints | Production E2E verified V/wordmark image at 1440px and 390px with no horizontal overflow. This local asset use does not close the separate public-logo authority gate. |
| About-page scope | Removed the founder, illustrative partners, team-carousel and testimonial sections from the rendered About page; retained the page hero, purpose, values and available location facts | Default production E2E confirms the four removed section classes are absent in FR and EN. The source data/assets remain untouched. |
| Compact mobile header | Replaced a late 138px fixed capsule/grid override with one horizontal, responsive `min(248px, calc(100vw - 20px))` capsule: V + VERQIA, then theme control, then menu. The compact mark uses 25px V / 78px wordmark sizing. | Fresh production Chromium check at 390×844, using a real mouse-wheel scroll: compact state active at `scrollY: 1248`; wordmark `111–188px`, theme control `227–262px`, menu `268–312px`. The ordered controls are visible with no overlap. The E2E regression verifies this sequence from an actual wheel interaction. |

## Executed commands and outcomes

| Command | Outcome |
|---|---|
| `npm ci` | Dependencies restored; audit reported 0 vulnerabilities |
| `npm run typecheck` | Completed successfully |
| `npm run lint` | Completed successfully |
| `npm test` | 5 files / 16 tests completed successfully |
| `NEXT_PUBLIC_SCROLL_PRESET=balanced npm run build` | Completed successfully; 50 pages generated; indexation disabled |
| `npm run test:e2e` | 12 Playwright tests completed successfully against the freshly built default informational artifact |
| `npm run test:e2e:pricing-review` | 2 Playwright tests completed successfully against a separate founder-approved local pricing-review artifact, built with `NEXT_PUBLIC_LOCAL_PRICING_REVIEW=true` |
| `npm audit --omit=dev --json` | 0 vulnerabilities (71 production dependencies after removing `next-themes`) |

## Browser evidence

- **44 public route/locales** (22 paths × FR/EN): all HTTP 200; no page errors.
- **Internal kit:** `/fr/_kit` and `/en/_kit` return HTTP 404.
- **Mobile 390×844 and desktop 1440×900:** no horizontal overflow in the 44 public route/locales.
- **Structural heuristic:** each audited public route had one H1, one main, valid skip-link target, correct language, no image without alt and no unnamed link/button under the stated DOM rule.
- **Scope heuristic:** no rendered form, public email/WhatsApp/Calendly link, Offer JSON-LD, Google/Microsoft auth option or configured price pattern in the audited public route-locales.

## Local performance observation — not launch-performance evidence

Fresh local mobile-navigation timings were captured for FR/EN home, product, demonstration and pricing routes. DCL/load fell in a 38–233 ms local range; navigation transfer sizes were 22–31 KB; sampled resource origins were only `http://127.0.0.1:3100`.

These measurements exclude network, CDN, real domain, third-party configuration and field conditions. They are not Core Web Vitals and cannot support a public performance claim.

## Headers observed locally

```text
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
X-Frame-Options: SAMEORIGIN
Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=(), usb=()
Cross-Origin-Opener-Policy: same-origin
```

CSP, HSTS, deployed TLS and final `metadataBase` remain open because they depend on the approved HTTPS domain and final third-party/service inventory.
