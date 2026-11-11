# Phase 2 — Commercial readiness

## Objective

Ensure every public CTA has an honest destination, a named owner and evidence that a request is received and handled. The current repository does not evidence this.

## Current state

- The first-release scope gate keeps WhatsApp, email, Calendly and all public contact CTA unavailable; the page transparently says that no direct channel is published.
- There is no form API, CRM integration, email sender, database persistence, receipt, queue, owner or response-SLA implementation.
- Public pricing, plan availability, commercial CTA and Offer structured data are disabled in the current informational scope.
- Product/pilot content is presented as conceptual/validation-stage. No client, partner, testimonial or financial result is authorized.

## Required deliverables

| Deliverable | Status | Closure evidence |
|---|---|---|
| Approved launch commercial scope and claims register | `NEEDS_USER_VALIDATION` | UV-04 and UV-06 |
| At least one official monitored contact channel | `NOT_APPLICABLE` for first release | Required only if UV-04 later authorizes a public channel; then UV-02 plus live end-to-end test |
| Real lead/demo request design, receiver and acknowledgement | `NOT_APPLICABLE` for first release | Future capability: chosen channel/processor/owner and recorded request proof |
| Anti-abuse controls appropriate to the selected channel | `NOT_APPLICABLE` for first release | Future capability: threat model, rate-limit/CAPTCHA/abuse test as applicable |
| Privacy/retention and deletion process for lead data | `NOT_APPLICABLE` for first release | Future capability: approved legal processing rules and operational evidence |
| CTA and conversion path acceptance tests | `NOT_APPLICABLE` for first release | Future capability: staging desktop/mobile tests from CTA through receipt |
| Trust content evidence register | `NEEDS_USER_VALIDATION` | Signed authority for any testimonial, partner, logo, result or case study |

## Contact decision update — 8 November 2026

The first-release contact posture is **deferred** (VR-004). No form, demo/devis request CTA or new external contact channel is authorized by that decision. Until a later approved and tested choice exists, the current transparent no-channel behavior must remain; no request may be represented as receivable.

## Acceptance rule

A CTA is not “working” merely because it is visible. It is verified only after a safe test request reaches the designated receiver, is persisted or delivered as designed, can be traced without exposing personal data, and receives the promised acknowledgement/handling.

## Release gate

If the public launch invites demos, pilots, quotes or contact, R-003 is a P0 blocker until the path above is evidenced. If launch is strictly informational, every CTA must make that limitation clear and avoid collecting personal data unexpectedly.
