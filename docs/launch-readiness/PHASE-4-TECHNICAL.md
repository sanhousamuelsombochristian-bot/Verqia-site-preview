# Phase 4 — Technical quality, security and operability

## Objective

Turn the local code-quality baseline into verified, deployment-specific quality, security, accessibility, performance and recovery evidence.

## Baseline now evidenced locally

| Area | Status | Evidence / boundary |
|---|---|---|
| Typecheck, lint, unit tests | `VERIFIED` | Typecheck/lint succeeded; Vitest 5 files / 16 tests |
| Production build | `VERIFIED` | Optimized local build completed; 50 pages generated |
| Dependency audit | `VERIFIED` | Runtime/full npm audit reported 0 vulnerabilities at test time |
| Native production-artifact E2E | `VERIFIED` | Repository `npm run test:e2e` builds then starts `next start`; 9/9 passed locally, including reduced-motion hydration, theme-script handling and responsive V/VERQIA brand checks |
| Public route/responsive heuristic | `VERIFIED` | 44 public route-locales in FR/EN clean at 390px and 1440px under stated structural/overflow/error checks |
| Internal kit exposure | `VERIFIED` locally | Production `/fr/_kit` and `/en/_kit` return HTTP 404 |
| Generic application header baseline | `VERIFIED` locally | MIME/referrer/frame/permissions/opener headers observed in HTTP response |
| Local navigation observation | `VERIFIED` as a baseline only | Eight fresh local route samples; not a performance or CWV claim |

Detailed command/method/limit evidence: `PHASE-4-LOCAL-TECHNICAL-EVIDENCE.md` and `PHASE-0-TEST-EVIDENCE.md` §§12–15.

## Required technical deliverables

| Deliverable | Status | Closure evidence |
|---|---|---|
| Security-header design and HTTPS verification | `IN_PROGRESS` | CSP, frame policy, referrer policy, MIME policy, permissions policy and HSTS verified on staging; directives derived from actual integrations |
| Secrets and deployment-environment review | `NOT_STARTED` | Private platform review confirms least privilege and no public secret exposure |
| Dependency update/watch process | `NOT_STARTED` | Owner, cadence and alert/remediation procedure |
| Repeatable CI quality gate | `NOT_STARTED` | CI artifacts for type/lint/unit/build/E2E |
| Accessibility audit to agreed target | `NOT_STARTED` | Automated and manual keyboard, screen-reader, contrast, zoom/reflow evidence |
| Performance budget and monitoring | `IN_PROGRESS` | Local baseline exists; representative mobile/desktop staging measurements and thresholds remain needed |
| SEO/canonical/robots/sitemap validation | `NOT_STARTED` | Owned HTTPS domain staging check; noindex/access controls where needed |
| Observability, alerting and error handling | `NOT_STARTED` | Named owner, synthetic/error alert test, retention/privacy review |
| Backup, restore and rollback drill | `NOT_STARTED` | Timed drill result with owner and acceptance criteria |

## Security design constraints

- Do not add a broad CSP before the approved list of third-party media, analytics, Supabase and contact services is known.
- HSTS can be verified only on the final HTTPS domain after DNS/TLS ownership is established.
- Browser-visible Supabase anonymous/publishable keys require tested RLS; no service-role key may be public.
- The absence of an API route today is not a substitute for a secure design if backend services are later added.
- Local headers do not prove proxy/CDN/host behavior; capture the final HTTPS response on staging.

## Release gate

R-005, R-006, R-007 and applicable accessibility/performance gates must be closed with staging evidence before a technical GO.
