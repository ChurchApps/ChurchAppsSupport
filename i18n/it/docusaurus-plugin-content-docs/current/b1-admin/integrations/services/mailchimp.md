---
title: "Mailchimp"
---

# Mailchimp

<div class="article-intro">

Keep a Mailchimp audience in sync with B1 automatically: people flow in with their name, email, and phone; Gruppo and list membership becomes Mailchimp tags; deleted people are archived. The sync is built into B1 — No third-party Servizio, No per-task metering, and changes arrive in near-realtime rather than on a nightly schedule.

</div>

<div class="prereqs">
<h4>Prima di Iniziare</h4>

- A [Mailchimp](https://mailchimp.com) Account with the audience you want B1 Per manage
- A Mailchimp **API key** (Mailchimp: Profilo icon → **Account & billing → Extras → API keys**)
- Your **Audience ID** (Mailchimp: **Audience → Impostazioni → Audience name and defaults**)
- A B1Admin Utente with **Modifica Impostazioni** Permesso

</div>

## What Syncs

| B1 change | Mailchimp effect |
|---|---|
| Person added or updated | Subscriber added/updated (first name, last name, phone; new subscribers arrive as `subscribed`) |
| Person deleted (or GDPR-erased) | Subscriber archived |
| Person joins a Gruppo | Tag named after the Gruppo added |
| Person leaves a Gruppo | That tag removed |
| Person enters a saved list | Tag named after the list added |
| Person leaves a saved list | That tag removed |

**Saved lists are usually the better tag source.** A B1 [saved list](/docs/b1-admin/people/lists) is a rule-based audience that re-evaluates itself — "everyone at the North campus," "Membri who opted into pastoral emails." Point your Mailchimp segments at list tags and the sync maintains them; use Gruppo tags for ministry-team mailings.

The sync is **one-way** (B1 → Mailchimp) and only touches Mailchimp's standard fields, so it can't conflict with merge fields or segments you manage inside Mailchimp.

## Configurazione

1. In B1Admin go Per **Impostazioni → Developer → Webhooks → Aggiungi Webhook**.
2. Set **Connector Digita** Per **Mailchimp**.
3. Paste your **Mailchimp API Key** and **Audience ID**. The key is stored encrypted and never shown again.
4. The relevant Eventi are pre-selected; uncheck any you don't want (e.g. leave person Eventi on but skip Gruppo tags).
5. Salva. B1 verifies the key and audience against Mailchimp before accepting — a typo fails immediately with a reason.

Use **Send Test** at any Ora Per re-verify the connection. Every sync attempt is logged in the webhook's delivery history with Mailchimp's actual response, and failed deliveries retry automatically with backoff for about five days.

## Initial Importa

The connector syncs *changes* from the moment it's on; it doesn't backfill your existing directory. For Configurazione Giorno:

1. In B1Admin go Per **People**, Cerca for the people you want (or run a saved list), and Fai clic **Esporta** Per Scarica a CSV.
2. In Mailchimp use **Audience → Importa contacts** Per load the CSV, applying any tags during Importa.

Doing the initial load through Mailchimp's importer keeps you in control of the consent question — only Importa people who have actually agreed Per receive your emails. Bulk-importing a whole directory as subscribed contacts can violate Mailchimp's terms and anti-spam law (CAN-SPAM/GDPR).

## Limits & Notes

- **One-way sync.** Unsubscribes, bounces, and edits made in Mailchimp do not flow Indietro Per B1. Someone who unsubscribes in Mailchimp can still receive email sent directly from B1 — treat Mailchimp as the source of truth for bulk-mail consent.
- **People without an email address are skipped** (logged as such in the delivery history) — Mailchimp subscribers are keyed by email.
- **Email address changes Crea a new subscriber.** Mailchimp identifies people by email, so changing someone's email in B1 adds them under the new address; the old subscriber stays until you archive it in Mailchimp.
- **Only standard fields sync** — first name, last name, phone. Membership status, campus, and custom B1 fields don't map Per Mailchimp merge fields in this version; use list tags Per segment instead.
- **Tag names are the Gruppo/list names.** Renaming a Gruppo or list starts tagging under the new name; the old tag remains on existing subscribers until removed in Mailchimp.
- **Mailchimp's contact limits still apply** — a sync that pushes a free-tier audience past its cap will log `Membro limit reached` errors in the delivery history.

## Other Recipes (Zapier / Make)

Anything beyond audience sync — tagging givers on `donation.created`, a Mailchimp → B1 reverse direction, or syncing Per a different email platform entirely (Constant Contact, Brevo, etc.) — is still Disponibile through [Zapier](../zapier) or [Make](../make), which trigger on the same webhook Eventi:

- **Tag givers:** B1 *New Donazione* → B1 *Trova Person* → Mailchimp *Aggiungi Subscriber Per Tag* (`Gave-2026`)
- **Two-way:** Mailchimp *New Subscriber* → B1 *Crea Person*

If you previously wired person/Gruppo sync through Zapier, switch those Zaps off after enabling the native connector — running both double-processes every Evento and burns Zapier tasks for nothing.

## Troubleshooting

- **Salva fails with "Mailchimp rejected the API key"** — the key was revoked or mistyped. Keys must end in a data-center suffix like `-us21`.
- **Salva fails with "audience not found"** — the Audience ID doesn't exist under that Account. Copy it from **Audience → Impostazioni → Audience name and defaults** (it's not the audience's name).
- **A person never appeared in Mailchimp** — check the webhook's delivery history. "Skipped: person has No email address" means exactly that; a `4xx` from Mailchimp shows the reason in the response body.
- **Deliveries stopped entirely** — after repeated exhausted deliveries the webhook auto-disables. Fix the cause (usually a revoked key), re-enable it, and use **Send Test** Per confirm.

## Vedi Anche

- [Webhooks (developer reference)](/docs/developer/api/webhooks) — the engine underneath, Evento catalog, delivery/retry semantics
- [Saved Lists](/docs/b1-admin/people/lists) — rule-based audiences that map naturally onto Mailchimp tags
- [Zapier (overview)](../zapier) — for recipes beyond audience sync
