---
title: "Push-varsler"
---

# Push-varsler

<div class="article-intro">

Siden **Push Notifications** lar deg sende et push-varsel til alle som bruker B1.church-appen til menigheten din, eller til én gruppe, enten med en gang eller på et tidspunkt du planlegger. Den viser også varsler som venter på å bli sendt, slik at du kan redigere, sende eller avbryte dem, og viser hvordan nylige varsler ble levert.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- For å sende til **Everyone with the app** trenger du tillatelsen **Edit Content**. For å sende til en gruppe trenger du **Edit Group Members**. Med en av dem vises siden **Push Notifications** under **Mobile**. Se [Roller og tillatelser](./roles-permissions.md).
- Varsler når bare medlemmer som har installert [B1.church-appen](/docs/b1-church/getting-started/installing-pwa) og tillatt varsler.

</div>

## Åpne siden

1. I B1 Admin åpner du [Jump-menyen](../introduction.md#getting-around-with-the-jump-menu) (søkefeltet øverst til venstre) og utvider **Mobile**.
2. Klikk på **Push Notifications** (`/mobile/notifications`).

Alle klokkeslett på siden vises i menighetens tidssone (eller nettleserens, hvis menigheten ikke har satt noen). Siden sier hvilken tidssone den bruker, for eksempel *«Times are in America/Chicago.»*

## Sende eller planlegge et varsel

1. Klikk på **Send Notification** øverst på siden.
2. Under **Audience** velger du **Everyone with the app** eller en av gruppene dine.
3. Fyll inn varselet:
   - **Title** *(påkrevd)* -- Et kort sammendrag, opptil 80 tegn.
   - **Message** *(påkrevd)* -- Brødteksten i varselet, opptil 240 tegn.
   - **Open link or flyer URL** *(valgfritt)* -- En relativ sti i appen (for eksempel `/mobile/groups`) eller en full `https://`-URL som åpnes når varselet trykkes på. Uten lenke åpner et varsel til hele menigheten medlemmets varslingsliste, og et gruppevarsel åpner den gruppen.
   - **Image URL** *(valgfritt)* -- Et `https://`-bilde som vises sammen med varselet på enheter som støtter det.
4. Under **When** velger du **Send now**, eller **Schedule for later** og velger et tidspunkt under **Send at**. Tidspunktet må ligge i fremtiden.
5. Klikk på **Send Notification** (eller **Schedule Notification** for et planlagt varsel).

En forhåndsvisning i dialogen viser hvordan varselet ser ut, og hvor mange personer som kan motta det. Et varsel som sendes nå, krever minst én person som kan nås. Et planlagt varsel kan lagres selv om ingen kan nås ennå, fordi mottakerne kontrolleres på nytt når det sendes.

Etter at du har planlagt et varsel, bekrefter dialogen sendetidspunktet og minner deg på at du kan se, redigere eller avbryte det under **Mobile > Push Notifications**.

:::tip
Du kan også sende eller planlegge et varsel til én gruppe fra gruppens side, med knappen **Notify**. Se [Sende push-varsler til gruppemedlemmer](../groups/group-members.md#sending-push-notifications-to-group-members).
:::

## Administrere planlagte varsler

Kortet **Scheduled** viser varsler som venter på å bli sendt, med tidspunktet **Send at**, **Audience** og teksten i **Notification**. Hvert varsel har tre handlinger:

- **Edit** -- Endre tittel, melding, lenke, bilde eller sendetidspunkt. Målgruppen kan ikke endres. Avbryt varselet og lag et nytt i stedet.
- **Send now** -- Send det med en gang i stedet for å vente. Bekreft med **Send now**.
- **Cancel** -- Stopp det fra å bli sendt. Bekreft med **Cancel notification**.

Når ingenting venter, står det *«Nothing is scheduled.»* på kortet.

## Gå gjennom nylige varsler

Kortet **Recent** viser varsler som er sendt eller stoppet, med tidspunktet **Sent at**, **Audience**, teksten i **Notification** og **Status**:

- **Sent: X of Y** -- Hvor mange av personene i målgruppen varselet nådde.
- **Failed** -- Sendingen mislyktes, med feilmeldingen. B1 prøver en mislykket sending opptil tre ganger før den markeres som mislykket.
- **Cancelled** -- Noen avbrøt varselet før det ble sendt.
- **Missed (the send time passed)** -- Det kunne ikke sendes innen 30 minutter etter sendetidspunktet, så det ble hoppet over i stedet for å sendes for sent.

## Hvem som mottar et varsel

- **Everyone with the app** når alle i menigheten din som har installert B1.church-appen og tillatt varsler, bortsett fra personen som sendte det.
- Et gruppevarsel når gruppens medlemmer som har appen og har tillatt varsler.
- Medlemmer som har slått av push for **Church Announcements** i sine [varslingsinnstillinger](/docs/b1-church/getting-started/notification-preferences), får ikke varsler til hele menigheten.

## Relaterte artikler

- [Sende push-varsler til gruppemedlemmer](../groups/group-members.md#sending-push-notifications-to-group-members)
- [Innstillinger for mobilappen](./mobile-app.md)
- [Arrangementspåminnelser](../calendars/event-reminders.md)
- [Varslingsinnstillinger](/docs/b1-church/getting-started/notification-preferences)
