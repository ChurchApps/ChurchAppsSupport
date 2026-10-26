---
title: "Velge en gudstjeneste"
---

# Velge en gudstjeneste

<div class="article-intro">

Det første trinnet i hver innsjekking er å velge hvilken gudstjeneste du deltar på. Gudstjenesteskjermbildet vises rett etter at appen er ferdig med å laste, og det avgjør hvilke gudstjenestetider og grupper som er tilgjengelige for resten av innsjekkingsflyten.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- [Logg inn](../getting-started/logging-in) i appen B1 Church Checkin og velg menigheten din
- Sørg for at menighetsadministratoren din har [konfigurert gudstjenester og gudstjenestetider](../../b1-admin/attendance/setup.md) i B1 Admin

</div>

## Slik fungerer det

1. Etter at du har logget inn (eller etter automatisk innlogging ved senere besøk), viser appen **gudstjenesteskjermbildet**.
2. Du ser en liste over alle gudstjenestene som er konfigurert for menigheten din. Hver gudstjeneste vises som et kort med gudstjenestens navn (for eksempel «Søndag formiddag» eller «Onsdag kveld»).
3. Trykk på gudstjenesten du deltar på.

Appen laster gudstjenestetidene og gruppene som hører til den gudstjenesten, og tar deg deretter til [oppslagsskjermbildet for medlemmer](./looking-up-members).

## Når innsjekking ikke er åpen

Hvis administratoren din har gitt en gudstjenestetid en [innsjekkingsplan](../../b1-admin/attendance/setup#setting-a-check-in-schedule), lar appen familier velge den gudstjenestetiden bare mens innsjekkingsvinduet er åpent. Gudstjenestetider der vinduet er stengt akkurat nå, vises fortsatt på [husstandsskjermbildet](./household-review), men er merket **Stengt** (for eksempel **Stengt · åpner søn 9:30**) i stedet for å tilby en gruppeknapp.

Hvis alle gudstjenestetidene for gudstjenesten du trykket på er stengt, forteller appen deg når innsjekkingen åpner -- for eksempel **«Innsjekking for denne gudstjenesten åpner søn 9:30.»** (Hvis ingen åpningstid kan vises, står det **«Innsjekking er ikke åpen for denne gudstjenesten akkurat nå.»**) Trykk på **Tilbake** for å gå tilbake til gudstjenestelisten og velge en annen gudstjeneste, eller vent til vinduet åpner og prøv igjen.

:::info
Innsjekkingsvinduene følger tidssonen for gudstjenestens campus. Hvis campusen ikke har en tidssone satt, brukes menighetens tidssone i stedet. Hvis en gudstjenestetid ser ut til å åpne på feil klokkeslett, be administratoren din om å sjekke tidssonen i campus- eller menighetsinnstillingene. På husstandsskjermbildet bruker kiosken også nettbrettets egen klokke for å åpne og stenge gudstjenestetider, så pass på at nettbrettet er satt til riktig klokkeslett og tidssone.
:::

:::info
Gudstjenester konfigureres av menighetsadministratoren din i B1 Admin under delen Oppmøte. Hvis du ikke ser gudstjenesten du forventer, be administratoren din om å kontrollere at den er opprettet i [oppsettet for oppmøte](../../b1-admin/attendance/setup.md).
:::

## Hva som skjer i bakgrunnen

Når du velger en gudstjeneste, henter appen tre ting fra serveren:

- **Gudstjenestetidene** for den gudstjenesten (for eksempel kan én gudstjeneste ha et tidspunkt kl. 9:00 og et kl. 11:00).
- **Gruppene** som er tilgjengelige på hver gudstjenestetid (for eksempel Barnehage, Førskole, Barneskole).
- **Koblingene mellom gruppe og gudstjenestetid** som avgjør hvilke grupper som er tilgjengelige på hvilke tidspunkter.

Disse dataene bufres lokalt, slik at resten av innsjekkingsprosessen er rask og responsiv.

:::tip
Hvis menigheten din bare har én gudstjeneste konfigurert, må du fortsatt trykke på den for å gå videre. Appen velger ikke automatisk en enkelt gudstjeneste.
:::

## Neste steg

Etter at du har valgt en gudstjeneste, slår du opp familien din [med telefonnummer eller navn](./looking-up-members).
