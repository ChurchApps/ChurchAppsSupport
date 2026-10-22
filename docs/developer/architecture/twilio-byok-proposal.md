---
title: "Twilio BYOK (Proposal)"
description: "Proposed church-owned Twilio integration, consent model, implementation scope, and release criteria."
---

# Twilio BYOK integration proposal

:::caution Proposal — not an available integration
This is a design for maintainer review, based on public source and Twilio documentation reviewed on October 22, 2026. It does not enable Twilio in B1 or describe a tested production integration. The companion [church onboarding draft](./twilio-byok-onboarding-draft) contains proposed setup guidance and church-specific examples.
:::

## Recommended path

Add Twilio to B1's existing texting provider system using **a church-owned Twilio account, API credentials, Messaging Service, and SMS-capable phone number**. The church registers its own legal entity and messaging campaign, pays Twilio directly, maintains recipient consent, and manages approval in Twilio Console. ChurchApps supplies the integration and documentation.

Start with one messaging program, one Messaging Service, and one US local 10DLC sender per B1 church. Support individual texts, group texts, workflow texts, and opt-in reminders through the existing B1 screens. A reasonable first program covers service changes, event reminders, and volunteer scheduling when all three are described in that church's consent and approved campaign. Fundraising or promotional messaging requires a separately assessed scope and consent; do not silently add it to this program.

| Responsibility | Church | B1 / ChurchApps |
|---|---|---|
| Twilio account, billing, number ownership | Owns and administers them | Does not provision a platform account or resell credits |
| Brand, campaign, number registration | Submits accurate church information; handles review and corrections | Explains prerequisites and reads available readiness information |
| Signup page, policies, message purpose | Publishes and maintains them | Provides compatible form controls, examples, and consent records |
| Recipient eligibility and STOP handling | Reviews consent evidence and requests received outside SMS | Enforces consent, suppression, permissions, and signed webhooks |
| Delivery and support | Watches Twilio errors, account health, and incoming replies | Shows submission and delivery status without claiming approval guarantees |

Defer a ChurchApps-owned Twilio parent account, customer subaccounts, number purchasing, Trust Hub submissions, billing, a conversation inbox, MMS/WhatsApp, international sending, and toll-free onboarding. Toll-free is a separate verified-sender path, not a registration bypass. These boundaries keep the first release aligned with B1's existing bring-your-own-provider model.

## Existing foundation and gaps

The following observations are tied to source snapshots, rather than an assumption about what is currently deployed:

| Component | Existing behavior | Implication |
|---|---|---|
| [Provider registry and contract](https://github.com/ChurchApps/Packages/tree/68c93d610031d3ed56d3582055413e851c5cb2ee/texting/src) | `ITextingProvider` has single/bulk sends, validation, optional subscriber/list capabilities, and a provider message ID in results. No Twilio adapter is registered. | Add Twilio in `@churchapps/texting`; it needs neither subscriber creation nor provider-managed lists. |
| [Texting settings](https://github.com/ChurchApps/B1Admin/blob/e33cc2386d96e2e3cb24e760d458a72b699c71c3/src/settings/components/TextingSettingsEdit.tsx) | Clearstream, Text In Church, and Nalo are selectable; MinistryStuff is feature-gated. Sender editing/saving is currently specific to Nalo. | Add explicit Twilio fields, validation, sender saving, and onboarding help. A dropdown entry alone is insufficient. |
| [Controller](https://github.com/ChurchApps/Api/blob/82eda28b6803754548ce007bd52177a21700f118/src/modules/messaging/controllers/TextingController.ts) and [module gateway](https://github.com/ChurchApps/Api/blob/82eda28b6803754548ce007bd52177a21700f118/src/shared/modules/MessagingModuleGateway.ts) | Credentials are encrypted/masked; manual and automated sends resolve a church's provider. Group sends deduplicate shared phone numbers. | Reuse these paths and preserve authorization. Put new consent/readiness gates in a common server path so workflows cannot bypass them. |
| [STOP helper](https://github.com/ChurchApps/Api/blob/82eda28b6803754548ce007bd52177a21700f118/src/modules/messaging/helpers/SmsOptOutHelper.ts) | Parses Twilio-style `From`/`Body`; validates a church URL token; sets `person.optedOut` and disables SMS reminders. Other replies are ignored. | This is a useful starting point, not a complete Twilio webhook. Add Twilio signatures and independent SMS subscription state. |
| [Messaging schema](https://github.com/ChurchApps/Api/blob/82eda28b6803754548ce007bd52177a21700f118/tools/migrations/messaging/2026-04-03_initial_schema.ts) | Stores `apiKey`, `apiSecret`, and a 20-character `fromNumber`; delivery logs store immediate success/error, not provider IDs or final delivery states. | An E.164 sender fits; a 34-character Messaging Service SID needs its own field. Add durable provider message/status storage. |
| [Public form page](https://github.com/ChurchApps/B1App/blob/5ca19ee4ef947235b8ffba9fbb35af42d0dcb41d/src/app/%5BsdSlug%5D/%28public%29/%5BpageSlug%5D/%5Bid%5D/components/FormPage.tsx), [shared form renderer](https://github.com/ChurchApps/Packages/blob/68c93d610031d3ed56d3582055413e851c5cb2ee/apphelper/src/forms/components/QuestionEdit.tsx), and [submission controller](https://github.com/ChurchApps/Api/blob/82eda28b6803754548ce007bd52177a21700f118/src/modules/membership/controllers/FormSubmissionController.ts) | Unrestricted forms and optional checkboxes exist. Descriptions are plain text. Submissions retain answers, but the texting path has no campaign-specific consent ledger. | Add a configured SMS consent control with real policy links and server-side evidence capture; a generic checkbox or group membership must not automatically authorize SMS. |

The user-facing [church settings documentation](../../b1-admin/settings/church-settings#texting) also explains that the current opt-out flag is shared with directory privacy. That coupling is a release concern: replying START must never change directory visibility.

## Configuration and credential design

Use explicit, additive configuration fields rather than overloading `fromNumber` or storing structured data in an API-key string:

| Field | Proposed purpose |
|---|---|
| `accountSid` | Church-owned Twilio account/project identifier (`AC…`) |
| `apiKey`, `apiSecret` | Dedicated Twilio API Key SID (`SK…`) and secret for outbound API access; encrypted and masked |
| `webhookAuthToken` | Account Auth Token used by the Twilio SDK to validate incoming signatures; separately encrypted/masked |
| `messagingServiceSid` | Church's Messaging Service (`MG…`, 34 characters) |
| `fromNumber` | Selected SMS-capable number in E.164 format, verified as a sender in that account/service |
| Program configuration | Stable program ID, name, permitted purposes, signup/policy URLs, and disclosure version |

Twilio [prefers API keys for REST authentication](https://www.twilio.com/docs/iam/api-keys). Use the narrowest tested key permissions that cover sending and the required read-only setup checks. The account Auth Token is still needed for the [standard Twilio webhook signature check](https://www.twilio.com/docs/usage/security). Explain this distinction in the UI; an API secret is not a webhook Auth Token. Keep credentials exclusively in the server-side settings store, never in public pages, form answers, browser send requests, or support issues.

The church creates and manages these resources in Console. B1's validation action must only read the configured service, senders, and registration information. It must not buy numbers, create campaigns, change Twilio settings, or send a test message as a side effect. Provide a separate explicit test-send action limited to an eligible, consenting recipient.

Preserve masked credentials only when editing the same saved provider. Switching to Twilio must require its own credentials and clear stale provider-specific values; do not carry a masked Clearstream or Nalo key into a Twilio configuration.

Scope every load/update to the authenticated B1 church. Bind callbacks to a saved integration and expected Twilio account/service/sender, and reject conflicting cross-church assignments. Credential rotation and provider disconnection must invalidate readiness and pause queued sends without erasing consent or historical delivery records.

## Consent and suppression are required release work

Introduce phone-bound subscription records for the Twilio program, plus append-only consent/suppression events. Suggested minimum evidence is: church ID, program ID, normalized phone, optional verified person association, affirmative action, source form/submission ID or reviewed external proof, server timestamp, disclosure text/version, source URL, policy URLs, and withdrawal/restart events. Limit access and retention under the existing church data-security policy.

Use states such as `unknown`, `pending`, `active`, and `suppressed`. Existing mobile numbers, imported contacts, attendance, donations, group membership, `person.optedOut = false`, and `allowSms` are not affirmative program consent. Importing documented consent should be a permissioned, audited action with a recorded source; a migration must not enroll everybody.

For the initial web flow, use B1's standard public form mode. Add an explicitly configured SMS consent question that starts unchecked, remains optional, renders clickable policy links, and maps to one program and mobile field. Validate that mapping on the server and snapshot the displayed disclosure when saving an affirmative response. Never derive consent from arbitrary question labels, conversational AI, or workflow membership. Enable a conversational equivalent only after its explicit affirmative interaction and evidence recording are tested.

An unchecked submission creates no subscription and must not withdraw someone else's existing consent. Bind consent to the submitted phone; staff can resolve ambiguous person associations without merging household records. A changed mobile number needs its own consent. For anonymous forms, apply abuse controls and make any number-ownership verification or double-opt-in step explicit; a checked box alone does not prove who owns a phone. If confirmation is used, leave the subscription pending until completed and describe that exact flow in registration materials.

For Twilio, separate SMS suppression from directory visibility. Conservatively migrate any legacy opt-out into a suppression record; leave other legacy recipients `unknown`. An explicit, documented new enrollment can establish SMS consent while directory privacy remains unchanged. Preserve other providers' behavior until their migrations are separately reviewed.

At each actual send, require the church integration to be enabled/ready, current program consent for the exact phone, no phone-level suppression, and the existing caller permission. Reminders additionally honor `allowSms`, category preferences, and quiet hours. Recheck after queueing, resolve merge fields, normalize/validate numbers, and deduplicate by phone. STOP suppresses all sends for the service/program, including manual sends and workflows; it must also cover every person sharing that phone.

Render the church identity and STOP instruction consistently in the common Twilio send path, and preview the final SMS/segment count. Merge-field expansion and length handling must preserve those elements; do not silently truncate the opt-out instruction. Keep examples and actual reminder/workflow templates aligned.

## Twilio sends, replies, and delivery state

Implement `TwilioProvider.sendMessage` through the Messages API with the selected Messaging Service and sender. Return a provider message SID and an accepted/submitted result; HTTP acceptance is not handset delivery. A group send uses per-recipient results in input order.

Bound outbound concurrency for **both** `sendBulk` and individual sends: the current merge-field branch fans out `sendMessage` calls. Persist send intent and claimable work for groups that cannot fit within a request budget; reuse the existing deployment model rather than requiring churches to run another service. Retry known transient/rate-limit failures with backoff. Treat ambiguous timeouts as unknown outcomes to reconcile, not an instruction to blindly resend and risk duplicate texts and charges.

Configure church-specific inbound and status callback URLs. Validate `X-Twilio-Signature` with the SDK, the exact configured external URL, original form parameters, and the matching account Auth Token. A secret URL alone is insufficient. Match callbacks to saved church/account/message records, handle duplicates and callbacks that arrive before the send result is committed, and prevent older events from overwriting a terminal status. Return empty TwiML for an inbound acknowledgment and an appropriate success response for status events. [Twilio security](https://www.twilio.com/docs/usage/security), [status callbacks](https://www.twilio.com/docs/messaging/guides/track-outbound-message-status)

Recommend Messaging Service **Advanced Opt-Out**. Twilio owns STOP/START/HELP confirmations; B1 consumes authenticated `OptOutType` events without sending duplicate confirmations. STOP records suppression immediately. START restores only a known subscription to this same disclosed program, with a fresh restart event; it must not opt a new phone into unrelated messaging or turn on reminder preferences. HELP does not enroll anyone. Other inbound replies remain outside the B1 inbox scope; churches need a documented way to monitor them in Twilio. [Advanced Opt-Out](https://www.twilio.com/docs/messaging/tutorials/advanced-opt-out)

Store the Twilio message SID, account/service binding, submission time, final status/error code, and callback time alongside the delivery log. Display queued/accepted, delivered, failed, undelivered, or unknown accurately. Maintain the existing response contract for other providers and define whether aggregate success counts represent submission or delivery.

## Setup readiness and approval validation

Show distinct checkpoints for credentials, service/sender ownership, campaign verification, number registration, webhook checks, and a delivered smoke test. Never show a single green “approved” badge just because credentials work.

For US local numbers, read the service's [Usa2p campaign resource](https://www.twilio.com/docs/messaging/api/usapptoperson-resource) and require the relevant campaign to be `VERIFIED`. Separately verify the selected phone is associated with that service and has completed number registration: an approved campaign can still have a pending number. Where a supported read API does not expose a required signal, show **manual Console verification required** and record the church administrator's dated confirmation as such; do not label it API-verified. Automated number-registration events can be a follow-up. [Number registration errors](https://www.twilio.com/docs/api/errors/30035), [A2P registration events](https://www.twilio.com/docs/messaging/compliance/a2p-10dlc/event-streams-setup)

Require current checks before enabling sends; record when and how readiness was checked, expire stale checks, and pause on revoked credentials, changed senders, registration failures, or persistent account errors. Delivery of a smoke test confirms the tested path, not universal carrier approval or recipient consent. The companion draft specifies the church's pre-submission, pre-launch, and ongoing operational checks.

## Repository and release plan

The [organization contribution guide](https://github.com/ChurchApps/.github/blob/main/CONTRIBUTING.md) directs B1 feature requests to ChurchAppsSupport and implementation PRs to the owning repositories. Use one central feature request and link focused implementation PRs to it:

1. **ChurchAppsSupport:** review this design and its onboarding draft before presenting Twilio as an available user feature.
2. **Packages:** add the Twilio adapter, explicit shared configuration/interfaces, and SMS consent form rendering where shared by B1Admin/B1App. Include changesets and publish through the existing release workflow before updating consumers.
3. **Api:** add additive migrations for integration metadata, consent/suppression, and delivery states; implement configuration validation, shared send gates, form evidence capture, webhook handling, and dispatch persistence.
4. **B1Admin:** add Twilio configuration/readiness UI, program/consent management, provider-aware sender saving, and accurate delivery reporting. Expose no SMS consent override through ordinary person edits.
5. **B1App:** verify the public form/page and policy-link experience against the shared controls, including anonymous and mobile visitors. No separate Twilio browser client is needed.
6. **ChurchAppsSupport:** after release, turn the onboarding draft into supported settings/help pages, add actual screenshots, link it from Texting settings, and arrange translations.

Deploy schema and shared packages before consumers. Keep Twilio feature-gated for a small opt-in pilot; existing providers must continue working. Rollback disables Twilio dispatch and cancels unsubmitted jobs while preserving opt-outs and evidence; it must not automatically switch recipients to a different provider or sender.

## Effort assessment

Planning estimate for a contributor familiar with the ecosystem; no production credentials or live SMS were used in this assessment:

| Work | Developer days |
|---|---|
| Adapter, configuration/schema extensions, settings UI | 2–3 |
| Phone/program consent, independent suppression, shared send gates, public form integration | 3–5 |
| Signed callbacks, delivery persistence, bounded/durable dispatch | 2–3 |
| Readiness UI, church guide, integration/regression testing, pilot fixes | 3–4 |
| **Recommended launch scope** | **10–15 total** |

A basic adapter/settings proof of concept is roughly 1–2 days. A sender-only estimate excludes the consent and onboarding work necessary for this recommendation. External Twilio/carrier review time is separate and variable; the project should not promise an approval date or approval outcome.

## Acceptance criteria

- [ ] Church owns and pays for the account, service, registered sender, and campaign; no ChurchApps-managed Twilio account is required.
- [ ] Credentials are encrypted/masked, tenant-scoped, rotatable, and absent from logs/public content; validation is read-only.
- [ ] Optional unchecked consent renders real policy links and saves server-side program/phone/disclosure evidence; declining still permits the primary form action.
- [ ] All manual, group, merge-field, workflow, and reminder paths enforce the same Twilio eligibility gate. Unknown, unconsented, changed-phone, or suppressed recipients are skipped with a useful reason; rendering preserves church identity/STOP instructions after expansion and length handling.
- [ ] Legacy directory privacy does not enroll recipients; STOP/START never changes directory visibility or unrelated preferences. Shared-phone and cross-church cases are tested.
- [ ] Signed STOP/START/HELP, invalid signatures, wrong accounts/services, duplicate events, replayed form submissions, and forged consent mappings are covered.
- [ ] Group size/timeouts, rate limits, partial failure, ambiguous outcomes, callback races, and out-of-order delivery events are tested without duplicate sends.
- [ ] Campaign approval and completed number registration are distinct from credential validation. Manual evidence is clearly labeled; stale/revoked readiness blocks sends.
- [ ] A pilot church checks its signup page, declined and accepted form paths, exact policy URLs, and a consenting test recipient through submission, delivery, STOP suppression, and permitted resubscription.
- [ ] Existing Clearstream, Text In Church, and Nalo settings and send behavior pass regression checks; help copy distinguishes proposals from released features.

