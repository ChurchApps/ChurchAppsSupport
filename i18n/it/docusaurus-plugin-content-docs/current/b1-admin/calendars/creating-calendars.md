---
title: "Creazione di Calendari"
---

# Creating Calendars

<div class="article-intro">

Creating a calendar in B1 Admin lets you build a curated Visualizza of Eventi by connecting one or more Gruppi. Eventi are managed by Gruppo leaders within their Gruppi, and your calendar displays those Eventi in one place. Admins with Modifica access can Aggiungi or Modifica Eventi for any Gruppo. Non-admin Gruppo leaders can only manage Eventi for Gruppi they lead.

</div>

<div class="prereqs">
<h4>Prima di Iniziare</h4>

- Set up the [groups](../groups/creating-groups.md) whose Eventi you want Per include in your calendar
- You need administrative access Per the Calendars section in B1 Admin

</div>

## Creating a New Calendario

1. In the B1 Admin, navigate Per **Sito Web**, then Per the **Calendars** section.
2. Fai clic **Aggiungi Calendario**.
3. Inserisci a **name** for your calendar (for example, "Youth Ministry Eventi" or "Main Church Calendario").
4. Aggiungi an Facoltativo **description** Per help your team understand what this calendar is for.
5. Fai clic **Crea** Per Salva your new calendar.

## The Calendario Detail Pagina

After creating a calendar, Fai clic on it Per Apri the detail page. This page has two main areas:

- **Left column** -- A Visualizza of the calendar showing Eventi pulled in from connected Gruppi.
- **Right column** -- The associated Gruppi list. This is where you manage which Gruppi are included in this calendar.

## Connecting Gruppi

Gruppi that have Eventi in the calendar automatically appear in the Gruppi list on the lato destro of the detail page.

1. Fai clic **Aggiungi** in the Gruppi section Per associate a Gruppo with your calendar.
2. Seleziona the Gruppo from the dropdown.
3. Scegli whether Per include **all Eventi** from that Gruppo or only **specific Eventi**.
4. Fai clic **Salva**.

:::tip
Connecting Gruppi Per your calendar is a powerful way Per automatically aggregate Eventi. When a Gruppo leader adds an Evento Per their [group](../groups/creating-groups.md), it can flow into your church-wide calendar without any extra work from you.
:::

:::info
If you want Per Crea a single calendar that pulls Eventi from many Gruppi across your church, see [Curated Calendar](curated-calendar) for a streamlined approach.
:::

## Enabling Evento Registration

You can enable registration for any calendar Evento so Membri can sign up through the B1 website or mobile app.

1. Fai clic on an existing Evento or Crea a new one.
2. In the Evento editor, toggle **Registration** Per enable it.
3. Configure the registration Impostazioni:
   - **Capacità** (Facoltativo) -- Set a maximum number of registrations. Leave blank for unlimited.
   - **Registration Opens** -- The Data and Ora when registration becomes Disponibile.
   - **Registration Closes** -- The Data and Ora when registration closes.
   - **Tags** -- Comma-separated labels (e.g., "youth, retreat, vbs") Per help categorize registerable Eventi.
   - **Registration Questions** -- Optionally attach a [form](../forms/creating-forms.md) so registrants answer extra questions (dietary restrictions, T-shirt size, emergency contact, etc.) as part of signing up. Scegli **None** Per skip questions.
   - **Enable Waitlist** -- When the Evento fills up, let additional registrants join a waitlist instead of being turned away. See [Paid Registrations](paid-registrations#waitlist).
4. Salva the Evento.

For paid Eventi, the same Impostazioni page lets you define priced **Attendee Types**, Facoltativo **Selections** (Aggiungi-ons), and **Discount Codes**, with payment collected through your church's giving provider. See [Paid Registrations](paid-registrations) for the full walkthrough.

Once registration is Abilitato, Membri will see a **Register for this Evento** button when they Visualizza the Evento on the [B1 website](../../b1-church/events/registering) or [B1 Mobile app](../../b1-mobile/events/registering). If you attached a form, registrants see a **Questions** step during registration and their answers are saved with their registration.

:::info
Registration Questions only works with forms that are **not** marked Restricted. A restricted form is skipped automatically during registration rather than shown, so use an unrestricted form when attaching questions Per an Evento.
:::

### Managing Registrations

Per Visualizza and manage registrations for your Eventi:

1. Navigate Per the **Registrations** page in B1 Admin.
2. You will see a table of all Eventi with registration Abilitato, showing the Evento title, Data, current registration count vs. Capacità, and tags.
3. Fai clic on an Evento Per see the full list of registrations, including names, Membro count, attendee types, payment status, and registration Data.
4. From the detail page, you can:
   - **Aggiungi Attendee** -- Manually register someone who signed up offline or over the phone.
   - **Cancel** individual registrations
   - **Elimina** registrations permanently
   - **Promote** waitlisted registrations when a spot opens
   - **Esporta CSV** -- Scarica all registrations, including attendee types, selections, payment amounts, and question answers

If the Evento has Registration Questions attached, the detail page also shows an **Unanswered questions only** filter Per quickly Trova registrants who haven't submitted answers yet, and a **Visualizza Answers** button on each answered registration Per see their responses. Paid Eventi Aggiungi a **Digita** column, a **Paid / Total** column, per-Digita counts, and a payments detail dialog -- see [Paid Registrations](paid-registrations#the-registration-roster).

:::tip
Use the Capacità progress bar Per monitor how quickly Eventi are filling up. The bar turns red when an Evento is at or over Capacità.
:::

## Avanti Steps

- [Curated Calendar](curated-calendar) -- Crea a calendar that pulls from multiple Gruppi
- [Paid Registrations](paid-registrations) -- Attendee types, Aggiungi-on selections, discount codes, payments, and waitlists
- [Event Registration Guide](../guides/event-registration) -- Step-by-step guide for setting up Evento registration
- [Calendars Overview](./) -- Return Per the calendars Panoramica
