---
title: "Velge en tjeneste"
---

# Velge en tjeneste {#selecting-a-service}

<div class="article-intro">

Det første steget i enhver innsjekk er å velge hvilken tjeneste du deltar på. Tjenesteskjermen vises rett etter at appen er ferdig lastet, og den bestemmer hvilke gudstjenestetider og grupper som er tilgjengelige for resten av innsjekkflyten.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- [Logg inn](../getting-started/logging-in) i appen B1 Church Checkin og velg kirken din
- Pass på at kirkeadministratoren din har [konfigurert tjenester og gudstjenestetider](../../b1-admin/attendance/setup.md) i B1 Admin

</div>

## Slik fungerer det {#how-it-works}

1. Etter innlogging (eller etter automatisk innlogging ved senere besøk) viser appen **tjenesteskjermen**.
2. Du ser en liste over alle tjenestene som er konfigurert for kirken din. Hver tjeneste vises som et kort med tjenestenavnet (for eksempel «Søndag formiddag» eller «Onsdag kveld»).
3. Trykk på tjenesten du deltar på.

Appen laster gudstjenestetidene og gruppene som hører til tjenesten, og tar deg deretter til [oppslagsskjermen for medlemmer](./looking-up-members).

## Når innsjekk ikke er åpen {#when-check-in-isnt-open}

Hvis administratoren din har gitt en gudstjenestetid en [innsjekkplan](../../b1-admin/attendance/setup#setting-a-check-in-schedule), lar appen familier velge den gudstjenestetiden bare mens innsjekkvinduet er åpent. Gudstjenestetider der vinduet er stengt akkurat nå, vises fortsatt på [husstandsskjermen](./household-review), men er merket **Stengt** (for eksempel **Stengt · åpner søn 09.30**) i stedet for å tilby en gruppeknapp.

Hvis alle gudstjenestetidene for tjenesten du trykket på er stengt, forteller appen deg når innsjekken åpner – for eksempel **«Innsjekk for denne tjenesten åpner søn 09.30.»** (Hvis ingen åpningstid kan vises, står det **«Innsjekk er ikke åpen for denne tjenesten akkurat nå.»**) Trykk på **Tilbake** for å gå tilbake til tjenestelisten og velge en annen tjeneste, eller vent til vinduet åpner og prøv igjen.

:::info
Innsjekkvinduer følger tidssonen til tjenestens campus. Hvis campuset ikke har en tidssone satt, brukes kirkens tidssone i stedet. Hvis en gudstjenestetid ser ut til å åpne på feil time, be administratoren din om å kontrollere tidssonen i innstillingene for campus eller kirke. På husstandsskjermen bruker kiosken også nettbrettets egen klokke for å åpne og lukke gudstjenestetider, så pass på at nettbrettet er satt til riktig tid og tidssone.
:::

:::info
Tjenester settes opp av kirkeadministratoren din i B1 Admin under delen Oppmøte. Hvis du ikke ser tjenesten du forventer, be administratoren din om å kontrollere at den er opprettet i [oppmøteoppsettet](../../b1-admin/attendance/setup.md).
:::

## Hva som skjer i bakgrunnen {#what-happens-behind-the-scenes}

Når du velger en tjeneste, henter appen tre ting fra serveren:

- **Gudstjenestetidene** for tjenesten (for eksempel kan en enkelt tjeneste ha et tidspunkt kl. 09.00 og et kl. 11.00).
- **Gruppene** som er tilgjengelige på hver gudstjenestetid (for eksempel Barnehage, Førskole, Barneskole).
- **Koblingene mellom gruppe og gudstjenestetid** som avgjør hvilke grupper som er tilgjengelige på hvilke tidspunkter.

Disse dataene hurtigbufres lokalt, slik at resten av innsjekkprosessen går raskt og responsivt.

:::tip
Hvis kirken din bare har én tjeneste konfigurert, må du likevel trykke på den for å gå videre. Appen velger ikke en enkelt tjeneste automatisk.
:::

## Neste steg {#next-step}

Etter at du har valgt en tjeneste, slår du opp familien din [med telefonnummer eller navn](./looking-up-members).
