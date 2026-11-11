# Phase 5 — Preproduction and controlled launch

## Objective

Use a distinct, protected staging environment to reproduce the intended public configuration, collect acceptance evidence and execute an explicitly authorized release with rollback capability.

## Current decision

**NO-GO / publication prohibited** was formally confirmed on 8 November 2026. This runbook is preparatory only and does not authorize a deployment, DNS change or public release.

The platform/staging situation is reported partially ready (VR-004), but no identifying operational evidence has been supplied. It therefore remains a launch blocker, not a staging verification.

## Preconditions

- Legal/public facts, launch scope and approved claims are resolved.
- A domain and authorized hosting account exist.
- If applicable, real contact/auth/product integrations are configured in staging with safe test data.
- Staging is not merely `noindex`; it has appropriate access protection and is distinct from production.

## Required runbook

| Check | Status | Evidence required |
|---|---|---|
| Named staging and production environments | `BLOCKED` | URLs, owners, separation proof and access policy |
| Deployment procedure and approval | `NOT_STARTED` | Version/artifact, approver, change window and owner |
| Rollback procedure | `NOT_STARTED` | Prior artifact/rollback command and rehearsal result |
| DNS/TLS/domain validation | `NEEDS_USER_VALIDATION` | UV-02/UV-08 and HTTPS checks |
| Desktop E2E | `VERIFIED` locally | Current production-artifact suite passed 9/9, including reduced-motion hydration, theme-script handling and responsive V/VERQIA brand checks; staging scenarios remain required if applicable |
| Mobile E2E | `VERIFIED` locally | Current suite includes mobile navigation and 390px route checks; staging critical journeys remain required |
| Security/headers/robots/canonical verification | `NOT_STARTED` | HTTPS response evidence for final staging config |
| Accessibility/performance acceptance | `NOT_STARTED` | Agreed metrics/results and remaining exceptions |
| Monitoring/alerting and incident contacts | `NOT_STARTED` | Test alert and named responders |
| Backup/restore validation | `NOT_STARTED` | Timed restore evidence when data services exist |
| Founder final publication authorization | `NEEDS_USER_VALIDATION` | UV-09 explicit written GO |

## Final NO-GO conditions

Do not publish if any of the following is true:

- a public fact, legal text, contact address, customer claim or consent is unverified;
- a CTA implies receipt/operation that has not been tested end to end;
- product/auth capability is claimed without authorized staging evidence;
- staging and rollback are absent;
- required security/privacy review is incomplete;
- founder authorization is absent.

## Final GO format

A final GO record must state: release version; production origin; approved scope; evidence links; open accepted risks with approver; rollback owner; incident contact; date/time window; and founder’s explicit authorization. It must not contain secrets.
