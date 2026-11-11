# Phase 2 — Future commercial/contact validation register

**UV-04 status:** `NEEDS_USER_VALIDATION`  
**Current decision:** contact/commercial posture is deferred (D-017 / VR-004). No form, demo/devis request CTA, external channel, price, offer, testimonial, partner claim or client outcome is authorized for the first release.

## Future decisions required before any commercial activation

| Topic | Required decision/evidence | Current status |
|---|---|---|
| Contact posture | Explicit decision: no contact, official contact details only, or real request flow | `NEEDS_USER_VALIDATION` |
| Official receiver | Named inbox/CRM/channel owner and monitoring responsibility | `NEEDS_USER_VALIDATION` |
| CTA wording | Factual wording matching the tested receiving path | `NOT_STARTED` |
| Lead receipt/persistence | Safe end-to-end proof: submission → receiver/persistence → acknowledgement | `BLOCKED` |
| Anti-abuse | Proportionate rate limit/CAPTCHA/abuse controls for selected channel | `NOT_STARTED` |
| Privacy/retention | Legal purpose, minimisation, retention, deletion and rights process | `NOT_STARTED` |
| Offer/prices/terms | Founder-approved factual commercial offer and legal review | `NEEDS_USER_VALIDATION` |
| Testimonials/partners/results | Source, consent and publication authorization per item | `NEEDS_USER_VALIDATION` |

## First-release safeguards now verified locally

- Contact page renders the transparent no-channel state.
- No contact form, `mailto:`, WhatsApp or scheduling link rendered in the audited FR/EN build.
- No public commercial plan, pricing-card CTA or Offer JSON-LD rendered.
- Public navigation no longer advertises user-account access.

These safeguards do not create a commercial capability. They prevent an unverified one from being implied.
