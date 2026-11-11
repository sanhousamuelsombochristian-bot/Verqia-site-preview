# Phase 1 — Legal and personal-data review packet

**UV-03 status:** `IN_PROGRESS`  
**Purpose:** prepare factual review material. This packet is not legal advice, proof of compliance or ARTCI approval.

## A. Current documented implementation facts for review

| Topic | Current local evidence | Review question |
|---|---|---|
| Site scope | Informational/conceptual first release only; no operational product, authenticated workspace or data service is enabled | Is the stated public scope accurate and sufficiently prominent? |
| Contact | No public channel, form, demo/devis request CTA or lead persistence is active | Does the contact-page wording correctly avoid collecting/soliciting data? |
| Authentication | Public auth UI is unavailable; Supabase browser client is scope-gated off | Are auth-related notices and retained routes adequate for the declared scope? |
| Cookies/local storage | Cookie-preference state is stored locally; no repository-integrated analytics/advertising tracker was found | Are categories, duration, legal basis and notice wording accurate for the deployed stack? |
| Personal data | No backend/API/database or request receiver is evidenced in the repository | Does each legal page avoid claiming unimplemented processing, retention or recipient facts? |
| Hosting/processors | No approved domain/hosting/provider/subprocessor facts supplied | What must be stated, deferred or removed once the actual platform is chosen? |
| Marketing facts | No authorized customers, partners, testimonials, performance outcomes, prices or offer terms | Are all claims clearly conceptual/illustrative and supported? |

## B. Documents requiring review

1. `/[locale]/legal/mentions-legales`
2. `/[locale]/legal/confidentialite`
3. `/[locale]/legal/cgu`
4. `/[locale]/legal/cgv` — applicability itself must be decided before publication; pricing table is currently suppressed for the informational scope.
5. `/[locale]/legal/cookies`
6. `docs_LEGAL_REVIEW.md`
7. `config/legal.ts` references and `config/site.ts` public-field behavior
8. Any later contact, analytics, hosting, email, scheduling, authentication or media/portrait configuration.

## C. Formal review evidence required to close UV-03

| Evidence item | Required value |
|---|---|
| Authorized reviewer | Name, capacity/organization and authority to review the scope |
| Scope | Exact pages, languages, deployment/services and data flows examined |
| Review date | Date of review and version/revision reviewed |
| Outcome | Written approval, conditional approval with exceptions, or rejected items |
| Required changes | Concrete text/config/process changes and owner/date |
| Côte d’Ivoire / ARTCI applicability | Reviewer’s reasoned determination; no registration/notification outcome may be inferred |
| Retention/deletion | Approved durations, owner and practical deletion process if/when data processing is enabled |
| Processor/transfer inventory | Actual providers, locations, agreements and transfer assessment for the chosen deployment |

## D. Explicit non-claims pending review

- No legal compliance certification.
- No ARTCI approval, registration or notification claim.
- No assertion that a future contact/auth/analytics processor is already in use.
- No legal entity, data-controller, rights-contact, hosting or transfer detail without approved evidence.

## E. Reviewer response template

```text
Reviewer:
Capacity / authority:
Review date:
Repository / deployed version reviewed:
Locales/pages/services examined:
Decision: approved / conditionally approved / not approved
Conditions or exceptions:
Required changes and owners:
Côte d’Ivoire / ARTCI applicability note:
Written-proof reference:
```
