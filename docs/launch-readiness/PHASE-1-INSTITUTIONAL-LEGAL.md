# Phase 1 — Institutional and legal readiness

## Objective

Publish only factual organization information and legal notices that match the actual business, deployment and data-processing practices.

## Existing evidence

- Legal templates, localized legal pages and Côte d’Ivoire reference links are present in the repository.
- Cookie preferences are stored locally; no repository-integrated analytics/advertising tracker was found during Phase 0.
- The current configuration intentionally leaves legal identity/contact/hosting fields unset.
- `npm run check:placeholders` reported 33 unresolved publication inputs in the local environment.

## Required deliverables

| Deliverable | Status | Closure evidence |
|---|---|---|
| Approved information register: legal name, form, address, RCCM, tax ID, capital, representative, director of publication | `NEEDS_USER_VALIDATION` | UV-01 evidence, source/date/approver |
| Domain/contact/hosting register | `NEEDS_USER_VALIDATION` | UV-02 and verified controlled URLs/channels |
| Public founder identity/title/portrait rights record | `NEEDS_USER_VALIDATION` | UV-05 written confirmation |
| Legal notices, privacy policy, CGU, CGV and cookie policy review | `IN_PROGRESS` | UV-03 written approval or dated exceptions; see `PHASE-1-LEGAL-REVIEW-PACKET.md` |
| Processor/cookie/data-retention/transfer inventory for actual deployment | `NOT_STARTED` | Staging service inventory and counsel review |
| Côte d’Ivoire/ARTCI applicability assessment | `NEEDS_USER_VALIDATION` | Counsel/adviser determination; do not infer a registration/notification outcome |
| Accessible media rights/captions/alt-text source register | `NEEDS_USER_VALIDATION` | Approved assets and caption files, with rights/consent evidence |

## Validation update — 8 November 2026

The founder/user confirmed that UV-01, UV-02 and UV-05 are **not yet available**: no verified public legal/contact/domain/hosting/status facts, portrait-publication consent or complete approval sources may be published. This confirms the Phase 1 blocking state; it does not authorize an approximation. See `USER_VALIDATIONS.md` VR-001.

The legal/data-protection review is now reported **in progress** (VR-004). It remains non-verifiable until the authorized reviewer, scope, date and written approval or exceptions are documented; it does not clear any publication gate.

## Work method after validation

1. Record approved facts in a controlled private evidence source; expose only sanctioned public values.
2. Reconcile every legal statement with actual hosting, forms, email/CRM, analytics, Supabase and support workflows.
3. Have the reviewer identify applicable requirements and exceptions; do not represent references as a compliance certification.
4. Configure public values only in the authorized staging/production environment; run placeholder checks there.
5. Test all legal/cookie links and consent choices on staging with the real third-party inventory.

## Release gate

No legal/public-information GO until UV-01, UV-02, UV-03 and UV-05 are closed and deployed content matches the approved register.
