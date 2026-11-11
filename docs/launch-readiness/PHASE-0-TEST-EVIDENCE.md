# Phase 0 — Executed test and inspection evidence

**Audit date:** 8 November 2026  
**Environment:** local workspace only. No public target, external production account, personal data or destructive test was used.

## 1. Static quality checks

| Command | Observed result | Scope / limit |
|---|---|---|
| `npm run typecheck` | Completed successfully | Repository TypeScript only; does not validate remote configuration. |
| `npm run lint` | Completed successfully | Repository lint rules only. |
| `npm test` | 5 files, 16 tests completed successfully | Unit coverage is limited to existing suites. |

## 2. Production build

Command: `NEXT_PUBLIC_SCROLL_PRESET=balanced npm run build`

Observed result: completed successfully; Next.js reported 50 generated pages. `scripts/check-indexing.mjs` reported that indexation was disabled because `VERQIA_INDEXING_ENABLED` was not `true`; rendered-placeholder enforcement was consequently skipped by design. This validates compilation, not launch facts.

## 3. Dependency audit

Commands:

```text
npm audit --omit=dev --json
npm audit --json
```

Initial result: runtime audit reported 72 production dependencies and 0 vulnerabilities. After removal of `next-themes`, the latest runtime audit reported 71 production dependencies and 0 vulnerabilities. The initial full audit reported 0 info, low, moderate, high and critical vulnerabilities; its metadata listed 568 total dependency entries (72 production, 436 development, 127 optional, 0 peer). Audit status is point-in-time and does not replace upgrade monitoring.

## 4. Production-mode Playwright navigation scenarios

Procedure:

1. Build the application locally.
2. Serve the built app locally with `npm run start -- --port 3100`.
3. Execute the existing `tests/e2e/navigation.spec.ts` through a temporary external audit configuration that supplied the same base URL and Chromium desktop project but did **not** alter repository source/configuration.

Observed result: all existing scenarios completed successfully.

```text
✓ desktop dropdown is keyboard accessible and closes on Escape
✓ mobile navigation traps focus and closes with Escape
✓ locale switch keeps the current route and footer carries required legal links
3 passed
```

This is evidence for the tested built-artifact navigation behavior only. It does not prove contact delivery, authentication, authorization, external integrations, accessibility conformance, production headers or launch readiness.

## 5. Repository-native Playwright issue (historical initial audit evidence)

Command: `npm run test:e2e`

At the time of the initial audit, the configured `webServer` ran `next dev` and became unavailable after the first scenario in this constrained environment. The selector `button[aria-controls="nav-panel-product"]` was confirmed present in the built DOM and is not obsolete. The issue was addressed in the later controlled continuation documented in §12; this section is retained as the chronological initial evidence.

## 6. Route smoke scan (historical initial audit evidence)

The initial Playwright load/status/console scan loaded 23 application paths, including `/_kit`, in FR and EN (46 route-locales) against the built local app. All returned HTTP 200. The only browser errors were React minified error #418 on the two internal-kit route-locales. The later post-correction route scan is in §13.

## 7. Baseline accessibility heuristics (historical initial audit evidence)

Across the initial 46 route-locales, a browser DOM scan found:

- 0 image elements missing an `alt` attribute;
- 0 links or buttons without text, `aria-label` or title according to the scan heuristic;
- one `main` landmark and a valid `#main-content` target for the skip link on every route;
- matching document language for each locale;
- one `h1` on every route.

This is a narrow automated structural check. It is **not** a WCAG conformance statement and does not replace manual keyboard, screen-reader, contrast, zoom/reflow or assistive-technology testing.

## 8. Mobile overflow heuristic (historical initial audit evidence)

At a 390 × 844 viewport, the initial 46 routes had no horizontal overflow (`scrollWidth` did not exceed `clientWidth`). The only recorded browser errors were the two `/_kit` hydration errors.

## 9. Reproduced hydration mismatch on `/_kit` (historical initial audit evidence)

A raw HTTP response for `/fr/_kit` rendered the kit theme control with the Moon icon and `aria-label="Activer le thème sombre"`. After browser hydration, the same control rendered the Sun icon and `aria-label="Activer le thème clair"` with `data-theme="dark"`. The mismatch triggered React #418. Source review identified the unguarded `useTheme()` branch in `components/ui/KitShowcase.tsx`; `components/navigation/ThemeToggle.tsx` already demonstrated a hydration guard pattern.

The condition was corrected/restricted in the controlled continuation; see §12–13.

## 10. HTTP / indexing observations (historical initial audit evidence)

Against the initial built local app:

- `/fr` and `/fr/contact` returned HTTP 200 and emitted `noindex, nofollow` metadata.
- `/robots.txt` returned `User-Agent: *` and `Allow: /`.
- `/sitemap.xml` returned an empty URL set.
- `next.config.ts` disabled `X-Powered-By` but did not then define CSP, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy` or clickjacking headers.
- Local HTTP cannot validate production HTTPS/TLS/HSTS behavior.

The baseline header correction and recheck are recorded in §14.

## 11. Truthful unavailable-state checks

Rendered local checks confirmed that, without public environment configuration:

- `/fr/contact` says no direct contact channel is published;
- `/fr/connexion` says authentication is not activated and no account will be created/connected;
- `/fr/produit` discloses that VERQIA PILOT is in need-validation phase.

These are useful honesty safeguards; they do not make the absent services operational.

## 12. Controlled continuation — code corrections and native E2E

The following controlled source changes were made without enabling an external service, domain, data store, account, contact channel or public deployment:

- a static `lib/launch-scope.ts` guard disables public auth, contact and commercial-offer capability;
- auth routes remain for compatibility but render no form/OAuth interaction in this scope;
- contact values/CTA, pricing/plan language, legal price table and Offer schema are scope-gated off;
- the internal kit uses hydration-safe theme state and `proxy.ts` sends a pre-render 404 for `/{fr,en}/_kit` in the production artifact;
- `test:e2e` builds first and Playwright starts only the already-built `next start` server;
- generic application response headers were added to `next.config.ts`;
- the in-house theme provider replaces `next-themes` and renders no theme script in the React tree; CSS safely defaults to dark and the stored `light`/`dark` preference is restored after hydration without React 19’s client-script warning;
- header, compact header, mobile sheet and footer now compose the supplied V symbol with the user-provided VERQIA wordmark image; its transparent source canvas was cropped locally without changing the mark, and both elements scale down across responsive breakpoints without horizontal overflow.

Validation after the corrections:

```text
npm run typecheck                 → completed successfully
npm run lint                      → completed successfully
npm test                          → 5 files / 16 tests passed
npm audit --omit=dev --json       → 0 vulnerabilities
npm run test:e2e                  → 9/9 Playwright tests passed
```

The E2E suite includes existing keyboard/mobile/locale navigation plus FR/EN informational-scope regressions and both `/_kit` 404 responses. It validates the local production artifact only; it is not a staging/CI evidence substitute.

## 13. Final public-route, responsive and scope scan

**Procedure:** an isolated fresh Chromium page was used for each public route. The 22 paths were loaded in both FR and EN against the current local production server: home, about, login, contact, signup, five legal pages, password-reset, product and three product subpages, resources and two resource subpages, security, solutions and pricing. `/_kit` was requested separately.

**At 390 × 844:** 44/44 public route-locales returned HTTP 200 with no page error. Every route met the stated DOM heuristic: document language matched locale; one H1 and one main; skip link and `#main-content` target present; zero image without an `alt` attribute; zero unnamed link/button; and no horizontal overflow. The scan also found zero rendered forms, zero `mailto:`/WhatsApp/Calendly link, zero Offer JSON-LD script and zero tested public auth/price pattern.

**At 1440 × 900:** the same 44 route-locales returned HTTP 200 without page errors or horizontal overflow.

**Restricted internal route:** `/fr/_kit` and `/en/_kit` both returned HTTP 404.

This is repeatable local browser evidence. It is intentionally limited to structural/scope/range heuristics; it is not a WCAG, visual-design, security or product-function certification.

## 14. Current headers, indexing and local resource/performance observation

`curl` inspection of the current local production `/fr` response observed:

```text
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
X-Frame-Options: SAMEORIGIN
Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=(), usb=()
Cross-Origin-Opener-Policy: same-origin
```

CSP and HSTS are deliberately not claimed: both require approved HTTPS/domain and a final service-origin inventory. `robots.txt` continued to return `Allow: /`; the sitemap remained an empty URL set; indexation is still disabled. Therefore robots/noindex must not be used as staging access control.

Fresh local mobile navigation measurements were sampled on FR/EN home, product, product demonstration and pricing. Navigation DCL/load ranged from 38–233 ms and navigation transfer sizes from 22–31 KB. Each sampled resource originated from `http://127.0.0.1:3100` only. These local values exclude real network/CDN/domain/third-party/field conditions and are **not** Core Web Vitals or public performance evidence.

## 15. Remaining technical evidence boundary

Still not evidenced: authorized HTTPS staging; CSP/HSTS behavior; final canonical `metadataBase`; manual keyboard, contrast, zoom/reflow and screen-reader audits; service/processor/cookie inventory after deployment; real auth/data/contact flows; and operational monitoring/backup/restore/rollback. None of those gaps is closed by the local results above.

## 16. Founder-approved local pricing review and reduced About page

The founder confirmed that the existing plan values and labels may be rendered for a **local review only**. This did not authorize deployment or public launch. The safeguard therefore remains default-deny: `publicCommercialOfferEnabled` is true only when `NEXT_PUBLIC_LOCAL_PRICING_REVIEW=true` is deliberately supplied at build time. Default builds keep commercial pricing, authentication and contact capabilities disabled.

A separate production-artifact command was added and executed:

```text
npm run test:e2e:pricing-review  → 2/2 Playwright tests passed (FR and EN)
```

It built the local review artifact with the explicit flag and confirmed four plan cards, the monthly/annual switch, comparison and FAQ sections in both locales. The normal scope suite was also refreshed and passed **12/12**, preserving the default informational artifact safeguards.

At the same time, the rendered About page removed the founder, illustrative partner, team and testimonial sections. It retains the hero, purpose, values and any configured location facts. This is a rendering-scope change only: no source data or media was destructively deleted.

The overall programme remains **NO-GO**: the local pricing-review permission does not close any outstanding legal, domain, HTTPS/staging, operational or final-publication gate.
