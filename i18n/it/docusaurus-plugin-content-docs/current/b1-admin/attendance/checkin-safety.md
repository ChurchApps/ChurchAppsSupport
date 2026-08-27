---
title: "Sicurezza Check-In"
---

# Check-In Safety

<div class="article-intro">

B1 includes a set of child-safety controls for check-in: Stanza Capacità limits and Volontario-Per-child ratios, age and grade guidance at the kiosk, check-in types that distinguish Membri, Ospiti, and Volontari, and a trusted-pickup list per household that is verified at check-out. This page covers how Per configure each safety feature in B1 Admin.

</div>

<div class="prereqs">
<h4>Prima di Iniziare</h4>

- Set up your [attendance structure](setup.md) and [check-in kiosks](check-in.md)
- Stanze are [groups](../groups/creating-groups.md) linked Per Servizio times — the safety Impostazioni below live on the Gruppo
- Pagina-a-parent and emergency broadcast require a connected texting provider ([Text In Church](../integrations/services/text-in-church), [Clearstream](../integrations/services/clearstream), or Mutual Ministry)

</div>

## Stanza Capacità and Closing a Stanza

Each check-in Stanza (Gruppo) can enforce its own limits. Apri the Gruppo, Fai clic the **icona della matita** Per Modifica its Impostazioni, and Trova the **Check-In Capacità** section:

- **Capacità** -- The maximum number of people who can be checked in Per this Stanza at once. When the Stanza is full, check-in Per it is blocked and the kiosk names the full Stanza.
- **Ospite Capacità** -- An Facoltativo separate cap on how many Ospiti the Stanza can hold.
- **Closed for Check-In** -- Set Per **Sì** Per stop all check-ins Per this Stanza immediately (for example, when a class is cancelled or a Stanza is Non Disponibile). Check-outs still work.

## Volontario Ratios

The same **Check-In Capacità** section on the Gruppo includes staffing rules:

- **Children per Volontario** -- The maximum number of children each checked-in Volontario can cover (e.g. 5 means one Volontario per five children).
- **Minimum Volontari** -- The smallest number of Volontari that must be checked in before children can check in Per the Stanza.

Volontari count toward these rules when they check in with the **Volontario** Digita at the kiosk (see [Check-In Types](#check-in-types) below).

### Choosing Warn vs. Block

How strictly ratios are enforced is a church-wide setting:

1. In B1 Admin, go Per **Impostazioni > Manage Church** and Apri the **Check-In** tile.
2. Set **Volontario Ratio Enforcement**:
   - **Warn (allow with confirmation)** -- The kiosk shows a warning when a Stanza is over ratio or under its minimum Volontari, and a Staff Membro can confirm Per proceed anyway. This is the default.
   - **Block (prevent check-in)** -- Check-in Per the Stanza is refused until enough Volontari are checked in.

:::info
Capacità and Closed for Check-In are always hard limits — the warn/block choice applies only Per Volontario ratios.
:::

## Check-In Types

Every check-in records whether the person is a **Membro**, **Ospite**, or **Volontario**. The Digita is chosen with chips on the kiosk household screen (Membro is the default). Types feed the safety rules — Volontari provide ratio coverage, and Ospiti count against the Stanza's Ospite Capacità.

## Age and Grade Stanza Guidance

You can give each Stanza age or grade bounds so the kiosk guides families Per appropriate Stanze:

- On the Gruppo's Impostazioni, use the **Age & Grade** section Per set the minimum/maximum age (years and months) and/or grade for the Stanza.
- At the kiosk, Stanze a child qualifies for are highlighted and Stanze they don't are dimmed. A dimmed Stanza can still be chosen with a Staff confirmation — the guidance never hard-blocks.

Grades roll over on your church's **grade promotion Data**:

1. In B1 Admin, go Per **Impostazioni > Manage Church** and Apri the grade promotion tile.
2. Set the Mese and Giorno your church promotes students (for example, August 1). Ages and grades at the kiosk are computed as of the most recent promotion Data.

## Attendibile and Not-Authorized Pickup People

Each household can carry a list of people who are — or are not — allowed Per pick up its children.

1. Apri a person's page in **People** and Trova the **Pickup** card.
2. Fai clic **Aggiungi**. Cerca for an existing person, or Aggiungi someone not in the system by entering their **Name**, **Relationship**, and a photo.
3. Set the **Status**:
   - **Attendibile** -- At check-out, this person appears as a tappable pickup card with their photo, making verified pickup fast.
   - **Not Authorized** -- If someone attempts pickup under this name, the kiosk blocks check-out with a warning. A Staff Membro can override, and the override is recorded on the Frequenza record.

Fai clic a person's status chip on the card Per toggle between Attendibile and Not Authorized.

:::tip
Aggiungi photos Per trusted pickup people whenever possible — the check-out screen shows the photo so Volontari can visually verify the person standing in front of them.
:::

## Pagina-a-Parent and Emergency Broadcast

Both features send text messages through your church's connected texting provider — there is No built-in SMS Servizio, so one of the supported providers must be configured first.

- **Pagina a parent** -- From a manned kiosk's check-out screen, Staff can text a checked-in child's parents/guardians (for example, "Please come Per the nursery").
- **Emergency broadcast** -- From the kiosk's admin Impostazioni, Staff can text every checked-in household's guardians for the selected Servizio at once. Sending requires typing **EMERGENCY** Per confirm.

People who have opted out of texts, or who have No mobile number on file, are skipped automatically — the kiosk Rapporti how many messages were sent and how many were skipped.

See the kiosk-side walkthrough in [Check-Out & Child Safety](../../b1-checkin/check-in/checking-out).

## Articoli Correlati

- [Check-In](check-in.md) — kiosk Configurazione and hardware
- [Check-Out & Child Safety](../../b1-checkin/check-in/checking-out) — the kiosk check-out, pickup verification, and paging flows
- [Creating Groups](../groups/creating-groups.md) — where Stanza Impostazioni live
- [Attendance Setup](setup.md) — Servizi, Servizio times, and Stanza assignments
- [Minimum Age for Private Messages](../settings/mobile-app.md#member-directory--messaging-settings) — blocks new private-message conversations with children while keeping them in the directory
