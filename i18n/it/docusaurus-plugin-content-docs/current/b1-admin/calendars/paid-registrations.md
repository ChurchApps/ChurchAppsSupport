---
title: "Registrazioni a Pagamento"
---

# Paid Registrations

<div class="article-intro">

Evento registration can go beyond a simple head count. You can define priced attendee types (like Adult and Child), offer Facoltativo Aggiungi-ons with their own prices and quantities, Crea discount codes, and collect payment at registration through your church's existing giving provider. When an Evento fills up, an Facoltativo waitlist keeps interested Membri in line and promotes them automatically as spots Apri.

</div>

<div class="prereqs">
<h4>Prima di Iniziare</h4>

- Enable registration on the Evento first — see [Creating Calendars](creating-calendars#enabling-event-registration)
- Per collect payments, your church needs [online giving configured](../donations/online-giving-setup.md) (Stripe, PayPal, or Kingdom Funding). Free Eventi need No giving Configurazione.

</div>

## Opening Registration Impostazioni

1. In B1 Admin, go Per the **Registrations** page and Apri your Evento (or Apri the Evento from its calendar).
2. The **Registration Impostazioni** card shows the basics — **Enable Registration**, **Capacità**, **Registration Opens/Closes**, **Tags**, and **Registration Questions**.
3. Below the basics are three accordions: **Attendee Types**, **Selections**, and **Discount Codes**.

## Attendee Types

Attendee types let you charge different prices for different kinds of attendees — and cap each one separately.

1. Expand the **Attendee Types** accordion and Fai clic **Aggiungi Digita**.
2. Inserisci a **Name** (e.g. "Adult", "Child", "Student").
3. Set a **Price**. Use 0 for a free Digita.
4. Optionally set a **Capacità** for just this Digita (e.g. only 20 Child spots). Leave blank for No per-Digita limit.
5. Fai clic **Salva**.

During registration, each attendee picks a Digita; sold-out types are shown as **Sold out** and cannot be selected. The roster shows each attendee's Digita and running per-Digita counts.

## Selections

Selections are Facoltativo priced Aggiungi-ons — T-shirts, meal plans, activity upgrades.

1. Expand the **Selections** accordion and Fai clic **Aggiungi Selection**.
2. Inserisci a **Name**, Facoltativo **Description**, and a **Price** (0 shows as "Free").
3. Optionally set a **Capacità** (total Disponibile across all registrations) and a **Max Qty** (the most one registration can order).
4. Fai clic **Salva**.

Registrants Scegli quantities during signup, and the totals count against Capacità so you never oversell.

## Discount Codes

1. Expand the **Discount Codes** accordion and Fai clic **Aggiungi Discount Code**.
2. Inserisci the **Code** registrants will Digita.
3. Scegli the **Digita** — **Percent** or **Amount** — and its **Value**.
4. Optionally limit the code with a **Start Data** / **End Data**, a **Min Membri** (minimum number of attendees on the registration), and **Max Uses**.
5. Fai clic **Salva**.

Each code shows a **Uses** count so you can see how often it has been redeemed. Registrants get instant feedback when they apply a code — including clear messages when a code has expired, hasn't started, or needs more attendees.

## Waitlist

Turn on **Enable Waitlist** in the Registration Impostazioni card. When the Evento reaches Capacità:

- New registrants are offered a waitlist spot instead of being turned away. They complete the same signup (payment is skipped while waitlisted).
- When someone cancels, the oldest waitlisted registration is **promoted automatically** and receives an email that a spot opened. If they owe a balance, the email links them Per complete payment.
- You can promote someone manually at any Ora with the **Promote** action on a waitlisted row — useful after raising the Evento Capacità.

:::info
Promoted registrations stay *In Sospeso* until any balance is paid; paying (or having nothing Per pay) confirms them.
:::

## The Registration Roster

Apri an Evento from the Registrations page Per see every registration. The table shows **Name**, **Membri**, **Digita** (each attendee's Digita), **Paid / Total** (with a balance warning when money is still owed), **Status**, and **Data**, plus per-Digita count chips above the table.

- Fai clic a row's details icon Per Apri the **Registration Details** dialog — Membri, selections, paid/balance, and a **Payments** table listing every charge (amount, method, Data).
- **Esporta CSV** downloads the full roster with columns for Membri, attendee types, selections, paid/total/balance, status, and one column per registration question.
- **Aggiungi Attendee** still lets you record offline signups manually.

:::info
Refunds are not processed inside B1. If you need Per refund a cancelled paid registration, issue the refund from your giving provider's dashboard (e.g. Stripe).
:::

## How Payment Works

Payments run through the same giving gateway your church already uses for donations — card details go straight Per the provider and never touch B1's servers. Prices are always computed on the server from your configured types, selections, and discount codes, so a registrant can't tamper with the total. Logged-in Membri can pay with a saved card; Ospiti Inserisci a card at checkout.

## Articoli Correlati

- [Creating Calendars](creating-calendars#enabling-event-registration) — enable registration and the basic Impostazioni
- [Online Giving Setup](../donations/online-giving-setup.md) — configure the payment gateway used at checkout
- [Registering for Events](../../b1-church/events/registering) — what Membri see when they sign up
- [My Registrations](../../b1-church/events/my-registrations) — how Membri pay balances and Modifica registrations
