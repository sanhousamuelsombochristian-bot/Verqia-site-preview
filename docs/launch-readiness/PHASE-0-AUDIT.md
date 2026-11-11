# Phase 0 — Complete audit

**Programme:** VERQIA — Public Launch Readiness 2026  
**Audit date:** 8 November 2026  
**Scope:** repository and local built application only. No public deployment, DNS, account, secret, production service or personal data was accessed or changed.

## 1. Executive audit conclusion

The repository builds and its existing static/unit/navigation checks provide useful baseline evidence. It is **not ready for a public operational launch**. The current implementation is a bilingual Next.js presentation/concept experience with intentional unavailable-state wording when key public configuration is absent. It contains no verified business backend, contact-request persistence, configured authentication service, tenant authorization model, staging/CI/monitoring/restore evidence, legal approval or approved public organization/contact facts.

This conclusion is not a redesign request. It is a truth and operational-readiness boundary: do not publish or market unverified functions as available.

## 2. Architecture inventory

| Area | Observed implementation | Audit conclusion |
|---|---|---|
| Framework | Next.js 16.4.5 / React 19.3.1, TypeScript, `next-intl` FR/EN localized routes | Frontend application with server-rendered pages and client interaction. |
| Routes | 19 route definitions under `app/[locale]`, including conceptual product, auth, legal and internal kit routes | 23 rendered public-path variants per locale when dynamic legal pages are counted. |
| Backend/API | No `app/**/route.ts`, no database schema/migration or repository server business API found | No repository evidence for lead persistence, product data, role checks or business workflow processing. |
| Authentication | Browser-only Supabase client in `lib/supabase-browser.ts`; public URL/anon key required | UI can expose auth flows only after external project configuration; no RLS/role/tenant proof is present. |
| Contact | `ContactChannels` builds WhatsApp/email/Calendly links only when configured | No form endpoint, CRM, queue, receipt, delivery or persistence exists. |
| Deployment | `vercel.json` contains only region `cpt1` | No account, project, staging/production split, DNS, CI, rollback or monitoring configuration is evidenced. |
| Environment | `.env.example` contains only public Supabase variables | No secret was found in the reviewed repository; production public metadata/contact variables are unset locally. |

## 3. Functional truth matrix

| Public area | What is evidenced locally | What is not evidenced / must not be claimed |
|---|---|---|
| Product pages | Conceptual copy and local demonstration states with disclosure language | Operational receivables service, real customer data, integrations, automation, forecasts, payment handling or results |
| Contact | Honest empty-state when no approved public channel is configured | A request sent, received, stored, assigned or answered |
| Email/password/OAuth UI | Conditional Supabase client calls and explicit unavailable state without variables | Email delivery, account creation, Google/Microsoft OAuth, redirects, rate limits, recovery, RLS or isolation |
| Legal/cookie pages | Templates, legal references and local cookie-preference UI | Approved legal content, actual processor inventory, correct retention/transfers, registrations/notifications or compliance |
| SEO | Localized metadata, alternate links, disabled indexation guard, robots/sitemap routes | Owned canonical domain, production metadata base, indexation approval or crawl restriction for staging |

## 4. Routes and user-facing quality

The production-mode local smoke scan returned HTTP 200 for 46 route/locales. Existing E2E navigation scenarios passed in production mode. A basic DOM accessibility heuristic and 390px mobile overflow check found no issue across those routes except the internal kit page hydration error.

`/_kit` is not in the sitemap but is reachable. It is explicitly an internal UI showcase and must not be treated as a public-quality route. Its `KitShowcase` theme control produces a server/client mismatch, triggering React #418 in both locales. The mismatch was reproduced by comparing the raw response and hydrated DOM; see `PHASE-0-TEST-EVIDENCE.md`.

## 5. Dependency and source security baseline

- Runtime and full `npm audit` executions reported 0 known vulnerabilities at audit time.
- No secret-bearing `.env` file was found in the reviewed workspace; `.env.example` warns against public `service_role`/OAuth secrets.
- No application API endpoint was found, reducing repository attack surface but also confirming absence of server-side business controls.
- Static source review found JSON-LD uses `JSON.stringify(...).replace(/</g, '\\u003c')`, an appropriate basic mitigation for embedding generated JSON in a script element.
- Reviewed application links with `target="_blank"` use `rel="noopener noreferrer"`.
- Browser session preference storage is used for authentication persistence selection and cookie preferences. Actual security depends on the future Supabase project, browser policy and deployed origin.

### Header gap

`next.config.ts` only sets `poweredByHeader: false`, development-origin allowance and image formats. Local production-mode responses did not contain a configured CSP, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy` or frame-embedding policy. This is a release-hardening gap. Exact CSP directives must be derived from approved media, Supabase, analytics and contact providers; do not deploy a guessed policy.

## 6. Privacy, legal and cookie baseline

The repository includes legal references and templates, but the factual organization/contact/hosting fields resolve from public environment variables and are absent locally. `npm run check:placeholders` reported 33 missing items, including legal identity, contact/hosting facts, legal reviewer approval, video posters/captions, audience images, brand variants, founder-portrait confirmation and an approved public contact channel.

Cookie code stores a preference in browser local storage. The audit did not find an integrated analytics or advertising tracker in repository source. That does not validate a future deployed environment or third-party embed. Legal and data-protection review remains required before publication.

## 7. SEO and indexing baseline

Indexation is deliberately opt-in. In the local audit build, pages emitted `noindex,nofollow`, sitemap output was empty and `robots.txt` allowed crawling without naming a sitemap. This is a useful anti-indexation layer but not access control. A separate staging origin must be protected independently of robots/noindex.

No owned domain or HTTPS canonical origin was supplied, so canonical absolute URLs, TLS, Search Console, analytics, social previews and redirect behavior cannot be audited. `lib/seo.ts` does not set `metadataBase`; the local production server logged Next.js’s warning that social image URLs would fall back to `http://localhost:3100`. This must be corrected only after the approved canonical HTTPS domain is known.

## 8. Operational and release engineering baseline

No source evidence was found for CI workflow, staging environment, deployment approval, rollback, alerting, metrics, error reporting, backup or restore. Vercel region configuration does not prove data residency, DPA/subprocessor review, commercial-plan suitability or operational controls.

A repository-native Playwright execution is not currently repeatable in this audit environment because the configured development server becomes unavailable during the run. The same test scenarios pass on the built production-mode local app. This distinction is recorded as a pipeline reliability risk, not a selector defect.

## 9. Risk register

| ID | Priority | Risk | Evidence | Required closure evidence |
|---|---|---|---|---|
| R-001 | P0 | No verified operational product/backend; potential mismatch between public claims and actual service | No API/database/service found; product copy identifies conceptual validation | Approved scope and, if operational launch is intended, tested backend/business workflow evidence |
| R-002 | P0 | Legal identity, contact, domain, hosting and legal approval are incomplete | 33 placeholder checks; local values absent | UV-01 to UV-05, reviewed legal pages and deployment configuration |
| R-003 | P0 | No real lead/demo/contact receipt or persistence | Contact links only; no endpoint/service configured | End-to-end request test showing receipt, owner, anti-abuse and retention controls |
| R-004 | P0 | Auth/OAuth and authorization are unverified | Supabase variables/service/RLS absent | Staging provider/config/RLS evidence and safe end-to-end scenarios |
| R-005 | P1 | Response security baseline is incomplete | Header inspection and `next.config.ts` review | Approved header policy verified over staging HTTPS, including only necessary third-party origins |
| R-006 | P1 | No evidenced staging, CI, monitoring, backup/restore or rollback | No workflow/operational configuration found | Separate staging, deployment runbook, alert test and restore/rollback drill |
| R-007 | P1 | Non-indexed staging could still be crawled if reachable | `robots.txt` allows `/`; no staging access control evidenced | Staging access restriction and noindex verification |
| R-008 | P2 | Internal kit page hydrates incorrectly and remains reachable | Production browser scan and raw/hydrated comparison | Regression test and fixed/restricted internal route |
| R-009 | P2 | Native E2E developer-server command is not repeatable | `npm run test:e2e` server unavailable during run | Stable CI/staging run with retained artifacts |
| R-010 | P2 | Accessibility evidence is only heuristic | DOM scan does not equal WCAG audit | Automated axe/manual keyboard, zoom, contrast and screen-reader evidence against staging |
| R-011 | P1 | Legal/cookie statements could diverge from deployed processors | No deployed service inventory or professional review | Approved register of processors, cookies, retention and cross-border handling |
| R-012 | P3 | No representative performance budget or monitoring | Local-only build/testing; no public/staging target | Core Web Vitals/performance budget and monitoring results on staging |
| R-013 | P1 | Social/canonical metadata has no `metadataBase` | Next.js local production warning; no approved domain supplied | Approved HTTPS canonical domain configured and rendered metadata/social URLs verified on staging |

## 10. Prioritized intervention plan

1. **Do not publish.** Resolve the P0 truth, legal identity, contact and service-scope gates first.
2. Obtain the validations in `USER_VALIDATIONS.md`; record source, approver and date without putting secrets into the repository.
3. Decide launch scope: transparent marketing/concept release or operational product release. Apply only the corresponding claims and acceptance criteria.
4. For any real lead/auth/product flow, provision a distinct staging environment, non-personal test data and authorized external services; test end to end.
5. Add deployment-specific headers, monitoring, backup/restore and rollback only after the approved service inventory is known; verify over HTTPS.
6. Correct or protect the internal kit route and make native E2E repeatable in CI/staging.
7. Complete accessibility, performance, SEO and legal reviews on the real staging origin.
8. Run the Phase 5 checklist and request explicit founder GO authorization. A public release remains a separate, manual act.

## 11. Audit limitations

This audit cannot confirm facts or controls not present in the workspace: ownership of a domain, legal status, portrait consent, hosting terms, TLS, DNS, external mailbox/WhatsApp/Calendly behavior, Supabase configuration, RLS, third-party processors, real customer workflow, monitoring, backup or production data handling. Those are deliberate validation gates, not negative assertions about an external system.

## 12. Controlled continuation status — 8 November 2026

The initial audit is retained above as historical evidence. A controlled local continuation then addressed the identified implementation defects without changing the external/public perimeter:

| Initial item | Current local status | Evidence / remaining boundary |
|---|---|---|
| R-008 internal-kit hydration/exposure | **Locally mitigated.** Theme state follows a hydration-safe approach; production `proxy.ts` returns HTTP 404 for FR/EN kit routes. | Current production-artifact E2E and isolated route scan; retain staging regression check. |
| R-009 unstable repository E2E run | **Locally mitigated.** E2E now builds outside the Playwright server lifecycle then tests `next start`; 9/9 passed, including reduced-motion hydration, theme-script handling and responsive V/VERQIA brand checks. | CI/staging artifacts remain absent, so operational release evidence is still incomplete. |
| R-005 generic security headers absent | **Partially mitigated.** Baseline response headers are now configured and were locally observed. | CSP, HSTS, TLS and service-specific origin decisions still require approved HTTPS staging. |
| R-003 untested lead/contact flow | **Not applicable to the selected first informational release.** No form/channel/CTA is enabled. | Any future channel remains blocked until receiver, privacy/retention, anti-abuse and end-to-end proof exist. |
| R-010 accessibility evidence | **Open.** Current 44-route two-viewport structural heuristic is clean. | It is not an accessibility conformance audit. |
| R-012 performance evidence | **Open.** Local navigation observations were recorded. | Staging/field representative performance and an agreed budget are still required. |
| R-013 canonical metadata base | **Open.** The local Next.js warning is intentionally unresolved. | Configure only after an authorized HTTPS canonical domain is supplied. |

The detailed continuation proof is in `PHASE-0-TEST-EVIDENCE.md` §§12–15 and `PHASE-4-LOCAL-TECHNICAL-EVIDENCE.md`. The final decision remains **NO-GO**.
