# Phase 3 — Product truth, authentication and authorization

## Objective

Align public product descriptions with verified capabilities, then prove that any real account/data workflow enforces correct authentication, authorization and tenant isolation.

## Current truth matrix

| Capability | State evidenced in repository | Public-safe statement |
|---|---|---|
| Product workflow pages | Conceptual content and local demonstration states | Proposed product scope / validation-stage demonstration |
| Receivables data | No backend/data source found | No real customer or invoice data workflow is evidenced |
| Contact/demo request | Public channel and CTA are scope-gated off | No request receipt/persistence is evidenced or solicited |
| Email/password auth | Retained compatibility routes; public auth/client initialization scope-gated off | Explicitly unavailable for this first release |
| Google/Microsoft auth | No public provider option is rendered in scope | Not operational and must not be activated/claimed |
| Tenant/role model | Not found | No isolation/authorization claim permitted |
| Payments/subscriptions | Not found | No payment/subscription capability claim permitted |

## Scope update — 8 November 2026

The user selected an **informational/conceptual** first public release (VR-002). Accordingly, real authentication, tenant isolation, business-data operations and live request handling are not part of that first-release scope and must remain unavailable/unclaimed. This does not certify those functions for a later operational launch; it simply prevents them from being represented as current capability.

## Required deliverables

| Deliverable | Status | Closure evidence |
|---|---|---|
| Founder-approved product truth matrix | `NEEDS_USER_VALIDATION` | UV-06, mapped page-by-page claims |
| Business scenarios and acceptance criteria | `NOT_STARTED` | Approved scenarios using fictional/non-personal data |
| Auth provider, redirect and email configuration | `NOT_APPLICABLE` | Outside the selected first-release scope; future activation needs UV-07 plus staging execution evidence |
| Data model, workspace/tenant boundary and roles | `NOT_APPLICABLE` | Outside the selected first-release scope; future operational design needs owner review |
| RLS and server-side authorization tests | `NOT_APPLICABLE` | Outside the selected first-release scope; future activation needs cross-tenant test evidence |
| Demo/real-data separation | `NOT_APPLICABLE` | No real business-data workflow is in first-release scope; future scope needs tagged fixtures/access rules |
| Auth recovery/OAuth/abuse/resilience suite | `NOT_APPLICABLE` | Outside the selected first-release scope; future activation needs safe staging E2E results |

## Required test examples once a backend is authorized

- A user cannot read/write another organization’s records by UI, direct API or guessed identifier.
- Role changes revoke access immediately and are logged appropriately.
- Password reset, expired link, OAuth denial, duplicate signup and network loss have safe user outcomes.
- No privileged key reaches browser code; RLS blocks unauthorized direct Supabase requests.
- Demo fixtures cannot be mistaken for customer data, and no personal production data is copied to test.

## Release gate

For an operational-product launch, R-001 and R-004 are P0 blockers. For a marketing-only launch, retain the explicit conceptual/unavailable wording and exclude product/auth CTA claims that imply a live service.
