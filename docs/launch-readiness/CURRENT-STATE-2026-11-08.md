# VERQIA — Consolidated execution state

**Reference date:** 8 November 2026  
**Binding decision:** **NO-GO — publication prohibited.**  
**Scope:** first public release is informational/conceptual only (VR-002). No public deployment, DNS/domain change, external-service activation, account creation or data connection was performed.

## 1. Completed and evidenced

| Area | Evidence now available | Limit |
|---|---|---|
| Static quality | `npm run typecheck`, `npm run lint`, `npm test` completed; Vitest: 5 files / 16 tests | Local repository evidence only |
| Build | `NEXT_PUBLIC_SCROLL_PRESET=balanced npm run build` completed; 50 pages generated; indexation remains disabled | Build does not approve public facts or services |
| Dependencies | `npm audit --omit=dev --json` reported 0 vulnerabilities | Point-in-time audit |
| E2E reproducibility | Repository `npm run test:e2e` now builds first, serves `next start`, and completed 9/9 Playwright tests, including reduced-motion hydration, React 19 theme-script handling and responsive V/VERQIA brand checks | Local production artifact, not staging |
| Public-scope enforcement | New E2E tests verify FR/EN: no public account/auth links, no auth form/OAuth options, no contact channel/form, no commercial offer JSON-LD or displayed pricing | Does not replace legal/publication approval |
| Route and responsive scan | 44 public FR/EN route-locales: HTTP 200, no page errors, one main/H1, skip target, no missing image alt or unnamed link/button, no horizontal overflow at 390px and 1440px | Automated heuristic, not WCAG conformance |
| Internal kit | `/_kit` returns HTTP 404 in FR/EN production artifact; its theme control was aligned with the hydration-safe pattern | Dev-only internal component remains outside public acceptance scope |
| Local baseline headers | `X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options`, `Permissions-Policy`, `Cross-Origin-Opener-Policy` verified locally | CSP/HSTS/TLS need approved HTTPS staging/domain |
| Local third-party observation | Sampled FR/EN home/product/demo/pricing route resources came only from `127.0.0.1:3100` | Not an inventory of a future deployed service stack |

## 2. Started

| Item | Status | What exists | What is still required |
|---|---|---|---|
| UV-03 legal/data review | `IN_PROGRESS` | Review reported in progress; review packet prepared | Authorized reviewer, scope, date, written approval/exceptions |
| UV-08 platform/preproduction | `IN_PROGRESS` | Evidence-plan checklist prepared; local E2E production path is repeatable | Staging URL/owner/access control/deployment/rollback/monitoring/restore proof |
| Security hardening | `IN_PROGRESS` | Baseline application headers added and locally checked | Approved CSP, HSTS and HTTPS validation on staging |
| Performance/accessibility | `IN_PROGRESS` | Local route/mobile/desktop checks and local navigation timings captured | Staging performance/Core Web Vitals and manual/assistive-technology audit |

## 3. Blocked or awaiting founder/external input

- **UV-01:** legal entity, registration, tax, responsible persons and evidence owner.
- **UV-02:** authorized domain, official contact channels, hosting facts and proof that channels are monitored.
- **UV-04:** commercial claims and first-release contact posture remain deferred; no contact CTA/form/request channel may be added.
- **UV-05:** public name/title and portrait publication consent/rights.
- **UV-09:** final written founder authorization, only after all GO gates are evidenced.
- **UV-03:** reviewer proof and outcome.
- **UV-08:** actual staging/operational evidence.

## 4. Independent work completed in this continuation

1. Reconciled public UI with the informational-only scope: public account navigation, active auth surfaces, public contact channels/CTA, commercial pricing/offers and offer schema markup are guarded off.
2. Preserved unavailable-state pages rather than simulating account, OAuth, lead or commercial behavior.
3. Corrected the known internal-kit hydration pattern and blocked the route at the proxy in production before the App Router can stream a misleading public 200 response.
4. Moved build execution outside Playwright’s web-server process and made the native E2E command test the production artifact.
5. Added scope and route E2E evidence plus locally verifiable baseline headers.

## 5. Next dependent sequence

1. Attach documentary review evidence to UV-03.
2. Supply controlled staging evidence for UV-08 without sharing secrets here.
3. Resolve UV-01, UV-02 and UV-05 with factual approved records.
4. Decide UV-04 contact/commercial posture explicitly before enabling any channel or CTA.
5. Execute staging HTTPS, CSP/HSTS, performance, manual accessibility, monitoring/rollback and legal acceptance checks.
6. Reassess GO only after UV-09 written authorization.
