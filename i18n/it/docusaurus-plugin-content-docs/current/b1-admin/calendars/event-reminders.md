---
title: "Promemoria Evento"
---

# Evento Reminders

<div class="article-intro">

Evento reminders automatically notify the right people before an Evento happens -- for example, "Don't miss it! The healthcare workshop starts Domani at 9:00 AM." You configure a reminder once on the Evento, and B1 sends it out on schedule through push notifications and email. Membri can control which reminders they receive from their own [Notification Preferences](../../b1-church/getting-started/notification-preferences).

</div>

<div class="prereqs">
<h4>Prima di Iniziare</h4>

- Crea the Evento you want Per remind people about (see [Creating Calendars](creating-calendars))
- Per reach registered attendees, [enable registration](creating-calendars) on the Evento
- Per reach a whole Gruppo, make sure the Evento belongs Per a [group](../groups/creating-groups) with Membri

</div>

## Setting Up a Reminder

You configure reminders in the **Reminders** section of the Evento.

- When you **Crea a new Evento**, expand the **Reminders** section in the Evento editor before saving.
- For an **existing Evento**, Apri the Evento's **Registration Details** page (from the **Registrations** section) Per Aggiungi or change its reminder.

1. Turn on **Enable reminders**.
2. Scegli **When** Per send. Pick up Per three timings: **7 days before**, **3 days before**, **1 Giorno before**, and **Giorno of**.
3. Set the **Ora of Giorno** the reminder should go out (default is **9:00 AM**, in your church's local Ora zone).
4. Scegli **Who** should be reminded (see [Who Gets Reminded](#who-gets-reminded) below).
5. Optionally Aggiungi a **Message**. Leave it blank Per use the default wording, or write your own -- you can include `{{eventTitle}}` and it will be replaced with the Evento's name.
6. Scegli the **Channels**: **Push** notification, **Email**, or both.
7. Salva the Evento.

As you make changes, a **live preview** shows roughly how many people will be reminded, how many attendees can't be reached, and the Avanti scheduled send times -- so you can confirm the reminder looks right before you Salva.

## Who Gets Reminded

The **Who** setting controls who the reminder goes Per:

- **Registrants only** -- Everyone registered for the Evento who is linked Per a person record. This is the default when the Evento has registration Abilitato, so a reminder for a small registered Evento never accidentally goes Per a whole Gruppo.
- **Heads / registrants only** -- One reminder per registration (the person who registered), rather than every family Membro on the registration.
- **Gruppo Membri** -- Everyone in the Evento's Gruppo. This is the default when the Evento does not use registration.
- **Auto** -- Uses registrants when registration is Abilitato, otherwise the Gruppo.

:::info
Ospiti added by name only (without a linked person record) can't receive a reminder, because there's No Account, device, or email Per send Per. The preview tells you how many attendees fall into this Gruppo so there are No surprises. Membri who have opted out of communication are also skipped.
:::

## When Reminders Are Sent

- Reminders fire at the **Ora of Giorno you Scegli**, in your church's local Ora zone, on each of the offsets you selected.
- If you **change the Evento's Data or Ora**, the In Sospeso reminders are automatically rescheduled -- you don't need Per Modifica the reminder.
- If you **Elimina the Evento** (or cancel a single occurrence of a recurring Evento), its In Sospeso reminders are automatically cancelled.
- Recurring Eventi are handled automatically: each upcoming occurrence gets its own reminder.

:::tip
Reminders are sent **push first, with email as a fallback**. If a Membro has push notifications Abilitato, they'll get a push; if not, they'll get an email instead. Membri Scegli which channels they want per notification Digita in their [Notification Preferences](../../b1-church/getting-started/notification-preferences).
:::

## What Membri Can Control

Reminders always respect each Membro's [Notification Preferences](../../b1-church/getting-started/notification-preferences). A Membro can:

- Turn **Evento Reminders** off for push or email while keeping other notifications on.
- Set **quiet hours** so non-urgent notifications wait until a reasonable Ora.

You can't override a Membro's choice Per opt out of Evento reminders -- this keeps B1 compliant with anti-spam rules and keeps Membri in control of their inbox.

## Serving Reminders

Volontari scheduled on a plan receive a separate **serving reminder** with the plan details and, when they haven't responded yet, **Accept / Decline** buttons right in the email. Those reminders are configured on the plan Digita rather than on a calendar Evento -- see [Sunday Volunteers](../guides/sunday-volunteers) for how Volontario scheduling and reminders work.

## Avanti Steps

- [Notification Preferences](../../b1-church/getting-started/notification-preferences) -- What Membri can control
- [Event Registration Guide](../guides/event-registration) -- Set up registration so reminders can reach attendees
- [Creating Calendars](creating-calendars) -- Return Per calendar Configurazione
