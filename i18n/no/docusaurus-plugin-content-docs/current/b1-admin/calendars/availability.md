---
title: "Tilgjengelighetskalender"
description: "Sett opp rom og utstyr som kan bookes i B1 Admin, book dem i kalenderen, legg til buffere for oppsett og opprydding, og håndter gjentakende bookinger eller bookinger som krever godkjenning."
---

# Tilgjengelighetskalender

<div class="article-intro">

Tilgjengelighetskalenderen gir deg et helhetsbilde av alle rom- og ressursbookinger i menigheten din. Her ser du hva som er planlagt, oppdager konflikter før de oppstår, og kan booke et rom eller en ressurs direkte for en hvilken som helst hendelse.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Sett opp minst ett [rom eller én ressurs](./rooms-resources.md) i seksjonen Rooms & Resources
- Du trenger tillatelsen **Edit Content**

</div>

## Åpne tilgjengelighetskalenderen {#opening-the-availability-calendar}

I B1 Admin åpner du [hurtigmenyen](../introduction.md#getting-around-with-the-jump-menu) (søkefeltet øverst til venstre), utvider **Calendars** og klikker **Availability**.

## Lese kalenderen {#reading-the-calendar}

Kalenderen viser som standard inneværende måned. Bruk **Today**, **Back** og **Next** øverst for å bla, og **Month**, **Week**, **Day** eller **Agenda** for å endre visningen.

Hver booking er fargekodet etter status:

| Farge | Betydning |
|-------|---------|
| Grønn | Godkjent |
| Oransje | Venter på godkjenning |
| Grå | Sperret (ikke tilgjengelig), vises som *Blocked: reason* |

Hver booking vises som hendelsens tittel etterfulgt av rommene og ressursene den bruker. Hold musepekeren over en booking for å se hele teksten. Klikk på en booking for å åpne hendelsen og redigere den.

## Filtrere etter rom eller ressurs {#filtering-by-room-or-resource}

Bruk nedtrekkslisten **Room / Resource** øverst til venstre for å begrense kalenderen til ett rom eller én ressurs. Velg **All rooms & resources** for å gå tilbake til hele oversikten.

## Booke et rom eller en ressurs {#booking-a-room-or-resource}

1. Klikk på knappen **Book** øverst på siden.
2. Dialogen **New Event** åpnes – den samme redigeringsvisningen som brukes i en kalender (se [Legge til og redigere hendelser](./creating-calendars.md#adding-and-editing-events)). Fyll inn detaljene for hendelsen:
   - **Group** *(påkrevd)* – gruppen hendelsen tilhører. Hvis du har [maler](./rooms-resources.md#event-templates), kan du også velge en **Template** for å fylle ut resten.
   - **Title** *(påkrevd)*
   - **Start** og **End** dato/klokkeslett *(påkrevd; End må være etter Start)*
   - **Visibility** – Public eller Private
   - **Rooms** – velg ett eller flere rom å reservere
   - **Resources** – velg én eller flere ressurser å reservere
3. Når et rom eller en ressurs er valgt, kan du angi **Setup (min before)** og **Teardown (min after)**. Disse utvider bookingen i begge ender, slik at lokalet reserveres til oppsett og opprydding, selv om start- og sluttidspunktet for hendelsen forblir det samme.
4. For å gjenta bookingen angir du **Start** først, og deretter krysser du av for **Repeats** og konfigurerer gjentakelsen:
   - **Interval** – hvor ofte den gjentas (for eksempel 2 med Week for hver 2. uke).
   - **Frequency** – Day, Week eller Month. Ukentlig lar deg velge bestemte ukedager; månedlig lar deg velge en fast dag i måneden eller et relativt mønster, for eksempel «den andre tirsdagen».
   - **Ends** – **Never**, **On** med en bestemt **End Date**, eller **After** et angitt antall forekomster.
5. For å angi et eget bookingvindu (annerledes enn start og slutt for hendelsen), slår du på **Custom reservation window** og fyller inn **Reserve from** og **Reserve until**. Dette erstatter minuttene for oppsett og opprydding. Bruk dette når et rom må være tilgjengelig utenfor hendelsens oppgitte tidspunkter.
6. Klikk **Save** for å sende inn bookingen.

:::info
Hvis rommet eller ressursen har en konfigurert **Approval Group**, vises bookingen som **Pending** til den er godkjent på siden Approvals – med mindre du er medlem av den gruppen, da godkjennes den med én gang. Se [Kalendergodkjenninger](./approvals.md) for godkjenningsprosessen.
:::

:::tip
Redigeringsvisningen viser en advarsel før du lagrer hvis et rom eller en ressurs allerede er booket eller sperret på det tidspunktet. Hvis du ser en konfliktadvarsel, justerer du tidspunktene eller velger et annet rom.
:::

## Relaterte artikler {#related-articles}

- [Rom, ressurser og planlegging](./rooms-resources.md) — sett opp rom og utstyr som kan bookes
- [Kalendergodkjenninger](./approvals.md) — godkjenn eller avslå bookingforespørsler
- [Opprette kalendere](./creating-calendars.md) — administrer hendelseskalendere
