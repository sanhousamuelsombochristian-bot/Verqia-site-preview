# Phase 5 — Preproduction evidence plan

**UV-08 status:** `IN_PROGRESS`  
**Constraint:** platform is reported partially ready, but no staging URL, owner, account, DNS/TLS, access-control, deployment or recovery proof is available. This plan does not authorize configuration or publication.

## Evidence package required before staging can be accepted

| Area | Required proof | Owner to identify | Status |
|---|---|---|---|
| Environment separation | Staging and production URLs; distinct configuration/account/secrets boundary | Platform owner | `NEEDS_USER_VALIDATION` |
| Access control | Authorized user list and staging access method; no reliance on robots alone | Platform owner | `NOT_STARTED` |
| Domain/DNS/TLS | Ownership/control evidence, DNS owner, certificate/HTTPS checks | Domain owner | `NEEDS_USER_VALIDATION` |
| Deployment | Reproducible artifact/version, approver and documented deploy command/workflow | Release owner | `NOT_STARTED` |
| Rollback | Previous artifact/version, rollback steps and timed rehearsal | Release owner | `NOT_STARTED` |
| Quality gate | Retained type/lint/unit/build/E2E artifacts | Engineering owner | `IN_PROGRESS` — local basis exists |
| Security headers | HTTPS response capture incl. final CSP/HSTS based on actual services | Security/platform owner | `NOT_STARTED` |
| Monitoring/alerts | Error/synthetic alert test, recipients, escalation and privacy review | Operations owner | `NOT_STARTED` |
| Backup/restore | Data-store scope, backup policy and timed restore drill if data services become applicable | Data owner | `NOT_STARTED` |
| Performance/accessibility | Staging mobile/desktop measurements and manual assistive-technology evidence | Quality owner | `NOT_STARTED` |
| Final publication | Founder written authorization after all gates | Founder | `NEEDS_USER_VALIDATION` |

## Safe handoff instructions

Provide URLs, account owners, runbooks, evidence references and non-secret configuration names only. Do **not** put passwords, API keys, OAuth secrets, service-role keys or customer data in the repository, issue tracker or this document.

## Current local-to-staging transition rule

The local production-artifact test suite is a useful baseline, not a staging substitute. Staging evidence must be produced against a distinct authorized origin before any GO review.
