---
title: "Tilgjengelighetkalender"
---

# Tilgjengelighetkalender

<div class="article-intro">

Tilgjengelighetkalenderen gir deg en fugleperspektivoversikt over alle rom- og ressursreservasjoner på tvers av kirken din. Herfra kan du se hva som er planlagt, oppdage konflikter før de skjer, og reservere et rom eller en ressurs for enhver begivenhet direkte.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Sett opp minst ett [rom eller ressurs](rooms-resources) i Rooms & Resources-seksjonen
- Du trenger redigeringstilgang til Calendars-seksjonen i B1 Admin

</div>

## Åpning av tilgjengelighetkalenderen

I B1 Admin åpner du **seksjonsmenyen** i øvre venstre hjørne og velger **Calendars**, og deretter velger du **Availability**.

## Lesing av kalenderen

Kalenderen viser gjeldende måned som standard. Du kan navigere fremover og bakover med pilene øverst, eller bytte mellom måned-, uke- og dagvisninger.

Hver begivenhet er fargekodet etter reservasjonsstatus:

| Farge | Betydning |
|-------|---------|
| Grønn | Godkjent |
| Oransje | Avventer godkjenning |
| Grå | Blokkert (ikke tilgjengelig) |

Hvis du holder over en begivenhet, vises begivenhetstittel og rommet eller ressursen som er vedlagt.

## Filtrering etter rom eller ressurs

Bruk **Filter**-rullegardinmenyen øverst til venstre for å begrense kalenderen til et enkelt rom eller ressurs. Velg **All Rooms & Resources** for å gå tilbake til fullvisningen.

## Reservering av et rom eller en ressurs

1. Klikk på **Book**-knappen i øvre høyre hjørne av siden.
2. I dialogboksen som åpnes, fyll inn begivenhetdetaljene:
   - **Title** — navn på begivenheten
   - **Start** og **End** dato/klokkeslett
   - **Visibility** — Public eller Private
   - **Rooms** — velg ett eller flere rom å reservere
   - **Resources** — velg en eller flere ressurser å reservere
3. Sett eventuelt **Setup** og **Teardown**-tider (i minutter). Disse legger til reservasjonen på begge ender slik at plassen er reservert for oppsett og rydding, selv om start-/sluttidene for begivenheten blir de samme.
4. For å gjenta reservasjonen, sjekk **Repeats** og konfigurer gjentakelsen:
   - **Repeat every** -- sett intervallet (for eksempel hver 2. uke).
   - **Frequency** -- Daily, Weekly, eller Monthly. Weekly lar deg velge spesifikke ukedager; Monthly lar deg velge en fast ukedag eller et relativt mønster som "andre tirsdag."
   - **Ends** -- Aldri, på en spesifikk dato, eller etter et bestemt antall gjentakelser.
5. For å angi et egendefinert reservasjonsvindu (annerledes enn begivenhetens start/slutt), slå på **Custom Booking Window** og angi vinduets start- og sluttider. Bruk dette når et rom må være tilgjengelig utenfor begivenhetens oppgitte timer.
6. Klikk **Save** for å sende reservasjonen.

:::info
Hvis rommet eller ressursen har en **Approval Group** konfigurert, vil reservasjonen vises som **Pending** til en leder i denne gruppen godkjenner den. Se [Calendar Approvals](approvals) for godkjenningsarbeidsflyten.
:::

:::tip
Kalenderen vil fremheve eventuelle konflikter før du lagrer. Hvis du ser en konfliktadvarsel, justerer du tidene eller velger et annet rom.
:::

## Relaterte artikler

- [Rooms, Resources & Scheduling](rooms-resources) -- sett opp bookbare områder og utstyr
- [Calendar Approvals](approvals) -- godkjenn eller avvis reserveringsforespørsler
- [Creating Calendars](creating-calendars) -- administrer begivenhetkalendere
