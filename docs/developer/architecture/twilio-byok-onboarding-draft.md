---
title: "Twilio Church Onboarding (Draft)"
description: "Draft B1 church-owned Twilio setup, public signup guidance, campaign examples, and approval checklist."
---

# Church-owned Twilio onboarding draft

:::caution Draft for the proposed integration
This is a proposed workflow. B1 now has a basic **Twilio** choice under **Settings > Texting** (Account SID, Auth Token, From Number, and the inbound STOP webhook) -- see [Church Settings: Texting](../../b1-admin/settings/church-settings.md#texting). The additional B1 setup controls, consent mapping, and validation steps below are requirements for a future release, not instructions to find existing settings. Read the [technical proposal](./twilio-byok-proposal) for scope and dependencies. Twilio sources were checked on October 22, 2026; verify current requirements before submitting a campaign.
:::

## The recommended arrangement

Your church owns its paid Twilio account, phone number, Messaging Service, billing, and campaign registration. B1 would send through those resources using credentials entered privately in church settings. Keep at least two appropriate church administrators able to access the Twilio account, enable account security, and assign a person responsible for consent, incoming replies, and rejection notices.

The first release proposed here covers one US local number and one clearly described church messaging program. The examples below use the fictional **Grace Community Church** program **Grace Church Updates** for service changes, event reminders, and volunteer scheduling. Replace every name, domain, frequency, contact, and purpose with the church's real practice. These are church-specific examples of Twilio's rules, not a pre-approved campaign or a promise of approval.

## 1. Prepare the public B1 signup experience

Publish a page such as `https://www.example.org/text-updates` on the church's B1 website, with an embedded public B1 form or an obvious link to its standalone public form. Also publish `https://www.example.org/privacy` and `https://www.example.org/sms-terms`. Those addresses are placeholders; submit the actual reachable URLs.

For the proposed SMS signup form:

| Setting | Recommended configuration |
|---|---|
| Access | Public/unrestricted; active during review and ongoing enrollment; available without login |
| Form mode | Standard mode initially; conversational mode needs the explicit consent support described in the technical proposal |
| Mobile | Clearly labeled with country code; required only when choosing SMS enrollment if used inside a general connection/event form |
| SMS choice | Separate optional checkbox, unchecked by default, mapped to the specific program and mobile field |
| Disclosures | Visible beside the SMS choice: church/program, message purpose and frequency, possible rates, STOP, HELP, support contact, and real clickable Privacy Policy/SMS Terms links |
| Other actions | Guests can submit the connection card, register for an event, or request information without opting into SMS |
| Evidence | Save program, exact phone, selected consent, source submission, server time, and disclosure/policy version; an ordinary form answer alone does not enroll someone today |
| People/group automation | Keep automatic person creation/group assignment off for an initial signup pilot unless reviewed for the church's existing matching rules. Group assignment is never the SMS authorization. |
| Existing automations | Do not enroll every form submitter or group member into a texting workflow. Only the proposed verified consent mapping may authorize that program. |
| Thank-you text | Confirm the form was received without claiming SMS enrollment when the box was declined or confirmation/review is still pending. |

An existing checkbox question can illustrate the form, but B1 still needs the consent ledger and send gates. The current shared renderer shows descriptions as plain text; typing Markdown or a URL there is not sufficient assurance that policy links are clickable. The implementation must supply an accessible consent control with actual links. See [creating B1 forms](../../b1-admin/forms/creating-forms) and the [technical proposal](./twilio-byok-proposal#consent-and-suppression-are-required-release-work).

Twilio requires a voluntary, verifiable opt-in. Do not bundle SMS with required membership terms, email/phone permissions, donation consent, or event registration. A mobile number on a visitor card is not itself SMS consent. See Twilio's [voluntary-consent requirements](https://www.twilio.com/docs/api/errors/30923) and [campaign recommendations](https://help.twilio.com/hc/en-us/articles/26149060902555-A2P-10DLC-Campaign-Registration-Recommendations).

### Example signup copy

Use this only after the church chooses the actual purposes, sender, and frequency. The checkbox is optional and starts unchecked; the policy names below must be links in the rendered form.

> Yes, I want Grace Community Church to text me through Grace Church Updates about service changes, church events, and volunteer schedules from [registered church number]. Expect up to 4 messages each month. Message and data rates may apply. Reply STOP to unsubscribe or HELP for assistance. SMS enrollment is optional and is not required to attend, register, or give. See our Privacy Policy and SMS Terms. Questions: [church support email or phone].

“Up to 4” is an example commitment, not a Twilio-prescribed limit. Replace it with a frequency the church can actually honor; if frequency varies, disclose that truthfully and describe the expected cadence. Keep promotional appeals or additional ministry programs outside this checkbox unless their purposes and consent have been separately assessed.

For a general visitor/event form, submitting with this box unchecked must still succeed. A dedicated SMS-only form may explain that checking it requests enrollment, but it must never make unrelated church services depend on enrollment. Confirm the real behavior on both phone and desktop.

### Policy content to prepare

The church's privacy page should explain what information it collects for texting, how it uses and protects it, and its retention/contact practices. It should clearly state that mobile numbers and messaging consent are not sold or shared with third parties or affiliates for their marketing or promotional use. Explain necessary service-provider processing accurately; do not claim that the church never uses a processor while it uses B1 and Twilio. Twilio's [privacy-policy guidance](https://www.twilio.com/docs/api/errors/30908) and [campaign recommendations](https://help.twilio.com/hc/en-us/articles/26149060902555-A2P-10DLC-Campaign-Registration-Recommendations) are the reference for this distinction.

The SMS terms should identify the church and program, purposes, actual frequency, possible messaging charges, STOP/HELP instructions, support contact, and the privacy link; include any additional disclosures requested by Twilio's current review. Match the opt-in page's policy links exactly to the URLs submitted in the campaign. Since June 30, 2026, Twilio requires dedicated public privacy and terms URLs for new API campaign registrations; its Console flow also collects them. [Twilio requirement](https://www.twilio.com/en-us/changelog/a2p-10dlc-campaign-registration-will-require-privacy-policy-and-)

These are content requirements to apply to the church's real policies, not a replacement for its existing privacy practices or a generic policy to paste without checking.

## 2. Register the church and its messaging program in Twilio

1. Create or use a **paid account owned by the church** and an SMS-capable US local number. Use the church's legal name, EIN/business registration information, address, website, and authorized representative consistently. Do not substitute ChurchApps' identity or another church's information.
2. Follow Twilio's direct-customer Brand registration flow for the church's actual entity type. For an eligible nonprofit, use the [nonprofit registration guidance](https://www.twilio.com/docs/messaging/compliance/a2p-10dlc/onboarding-for-government-and-non-profit-agencies). Charity/501(c)(3) use cases depend on eligibility; a church's name alone does not establish Twilio approval or exemption.
3. Create a dedicated Messaging Service and submit the relevant A2P 10DLC campaign. Choose the use case that truthfully matches the real messages and the options available to that approved Brand; the examples here do not prescribe a universal church use-case code.
4. Supply the public signup URL, policy URLs, full opt-in/message-flow description, and the requested sample messages. Include every real signup method; set the embedded-link/phone-number declarations to match actual content. Do not list keyword enrollment or double opt-in unless that flow exists and is tested.
5. Associate the sending number with the service and approved campaign. Wait for both campaign verification **and completed number registration** before sending.

Keep these steps in the church's own Twilio Console. The proposed B1 integration does not submit registrations for churches. Twilio's [registration quickstart](https://www.twilio.com/docs/messaging/compliance/a2p-10dlc/quickstart) and [campaign resource](https://www.twilio.com/docs/messaging/api/usapptoperson-resource) explain the registration fields and status. A pending number can still block sending after a campaign is approved. [Number registration](https://www.twilio.com/docs/api/errors/30035)

### Example campaign description

> Grace Community Church uses Grace Church Updates to send service schedule changes, reminders for church events, and volunteer scheduling notices to people who choose this program on our public church website. We send no more than four messages per month under this program. Recipients can stop these messages at any time. This program does not include purchased contacts, third-party promotions, or fundraising appeals.

This example fits only a church that actually follows those limits and exclusions. If volunteer reminders alone exceed the promised frequency, change the program design and disclosure before submission.

### Example message-flow description

> Visitors open [actual church signup URL], enter their mobile number, and independently select the optional Grace Church Updates checkbox. It is unchecked when the form opens. The disclosure names Grace Community Church, describes service changes, event reminders and volunteer schedules, gives the monthly limit and possible rates, and explains STOP and HELP. The displayed Privacy Policy and SMS Terms link to [actual privacy URL] and [actual SMS terms URL]. Declining SMS does not prevent attendance, event registration, giving, or use of the general connection form. B1 records the affirmative selection, phone number, submission time, and disclosure version. We send this program only to those documented subscribers and suppress withdrawals before further sends.

Adapt that paragraph to the implemented flow. If phone confirmation or staff review is used, describe the pending state and exact activation step. If other methods are used, include each method and its evidence. Where enrollment is behind a login or occurs on paper, Twilio asks for public, redacted evidence of the actual opt-in experience; never expose completed forms or member data. [Verifiable opt-in guidance](https://www.twilio.com/docs/api/errors/30923)

### Example outbound messages

These are fictional samples to adapt; use genuine church URLs and replace bracketed values before submission. Twilio's campaign API accepts two to five samples. Samples should identify the church, reflect the declared purpose, and include an opt-out instruction. [Campaign sample fields](https://www.twilio.com/docs/messaging/api/usapptoperson-resource)

```text
Grace Community Church: Sunday's service will start at [time] due to [reason]. Details: [church website URL]. Reply STOP to end texts.
```

```text
Grace Community Church: A reminder that [church event] is on [date] at [time]. Information: [church event URL]. Reply STOP to end texts.
```

```text
Grace Community Church: You are scheduled to serve on [team] this [day]. Please review your plan: [B1 church portal URL]. Reply STOP to end texts.
```

The bracketed URLs describe sample variables; the submitted examples should show the real church domain and the actual link style. A link to a plan may require login, but the signup page and policies used for vetting should be publicly reviewable. Do not include private notes, children's information, or identifiable member details in approval samples. Keep sample content consistent with what B1's templates actually send; do not promise a reply inbox or a particular reminder behavior that is unavailable.

### STOP, START, and HELP responses

Use Twilio Messaging Service Advanced Opt-Out for these confirmations and customize the church/program identity and support details. Example response intent:

- **STOP:** Confirm that Grace Church Updates has stopped and explain the supported way to resume.
- **START:** Confirm resumption of that same program, including its identity, cadence/rates, and help/stop instructions as required by the configured flow.
- **HELP:** Identify Grace Community Church and give the real support contact and opt-out instructions.

Do not send a second B1 confirmation when Twilio already responded. A HELP reply is not enrollment. START must not sign someone up for additional church programs or reveal them in the member directory. [Twilio Advanced Opt-Out](https://www.twilio.com/docs/messaging/tutorials/advanced-opt-out)

## 3. Check the approval packet before submission

- [ ] The church's real legal/Brand information, website identity, and campaign purpose agree.
- [ ] The signup page and active form open without login in a private browser, including on a mobile device.
- [ ] The SMS box starts unchecked and can be declined while completing the primary visitor/event action.
- [ ] Program purpose, sender, actual frequency, possible charges, STOP, HELP, support contact, and clickable policy links appear next to the SMS choice.
- [ ] The exact privacy/terms URLs supplied to Twilio are public, work without credentials, and identify the same church/program. Policy content agrees with actual processing.
- [ ] Each sample message matches the program, actual sender identity, and expected link/phone behavior. The campaign describes every real opt-in method.
- [ ] Redacted screenshots show the blank form, checkbox/disclosures, and policy links as reviewers will see them. Evidence contains no member records or keys.
- [ ] The church has an operational way to retain consent evidence and honor withdrawals before sending, including requests received by phone/email.

These checks reduce avoidable mismatches; Twilio and its review partners make the approval decision. Keep the real signup page and policy URLs available after approval, not just during review.

## 4. Connect and validate the future B1 integration

After the integration ships, its proposed Texting setup should collect the church's Account SID, dedicated API Key SID/secret, separate webhook Auth Token, Messaging Service SID, and selected sender. Create keys only in the church's Console and enter secrets only in private B1 settings. [Twilio API key guidance](https://www.twilio.com/docs/iam/api-keys)

Copy the church-specific inbound and delivery-status webhook URLs supplied by B1 into the matching Twilio service configuration. Enable Advanced Opt-Out and check that incoming messages reach that configured webhook. B1 should display separate checks for credentials, service/sender ownership, verified campaign, completed number registration, inbound verification, and the delivered test. A saved credential or an accepted API request is not final delivery.

If B1 cannot programmatically check a registration signal, confirm it directly in Console; the UI must label the dated result as administrator-confirmed. Resolve pending/failed status before enabling production texts. Use a separate, explicitly requested test to a real consenting adult test recipient, then:

1. Confirm that a matching documented signup creates the correct phone/program consent record; declining or a phone change must not silently enroll a recipient.
2. Send one test, confirm receipt, and compare the B1 status with the Twilio Message SID and delivery outcome.
3. Reply STOP and check that manual texts, group texts, workflows, and reminders skip that phone. Directory visibility should not change.
4. Exercise the documented same-program resubscription flow and HELP response; verify there are no duplicate confirmations and no unrelated preference changes.

## 5. Maintain the program

Designate a church owner to monitor campaign/account status, balance and billing alerts, message failures, and incoming replies in Twilio. The proposed first B1 release has no conversational SMS inbox, so publish and monitor a real help contact and check replies rather than assuming staff see them in B1.

Keep consent and withdrawal history, current disclosure/policy versions, campaign identifiers, and redacted approval evidence in church-controlled records. Never paste keys or recipient lists into public support tickets. When a number, service, credentials, signup flow, frequency, or purpose changes, recheck the integration and update registration/consent where required before resuming. Review shared household numbers and changed numbers carefully; eligibility follows the consenting phone and program, not every family member's record.

For rejection, read the actual Twilio error, correct the specific inconsistency in both the website and submission, and resubmit through the church's Console. For unregistered/pending senders, wait for registration completion rather than rotating numbers to work around it. Use [Twilio's registration troubleshooting](https://www.twilio.com/docs/messaging/compliance/a2p-10dlc/troubleshooting-a2p-brands) and the supplied error-code reference. Do not promise a fixed turnaround time.
