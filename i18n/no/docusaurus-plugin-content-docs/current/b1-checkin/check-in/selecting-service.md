---
title: "Velge en gudstjeneste"
---

# Velge en gudstjeneste

<div class="article-intro">

Det første steget i hver innsjekking er å velge hvilken gudstjeneste du deltar på. Gudstjenestebildet vises rett etter at appen er ferdig lastet, og det bestemmer hvilke gudstjenestetidspunkter og grupper som er tilgjengelige for resten av innsjekkingsflyten.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- [Logg inn](../getting-started/logging-in) i appen B1 Church Checkin og velg menigheten din
- Sørg for at menighetsadministratoren din har [konfigurert tjenester og gudstjenestetidspunkter](../../b1-admin/attendance/setup.md) i B1 Admin

</div>

## Slik fungerer det

1. Etter innlogging (eller etter automatisk innlogging ved senere besøk) viser appen **tjenestebildet**.
2. Du ser en liste over alle tjenestene som er konfigurert for menigheten din. Hver tjeneste vises som et kort med tjenestenavnet (for eksempel «Søndag formiddag» eller «Onsdag kveld»).
3. Trykk på tjenesten du deltar på.

Appen laster gudstjenestetidspunktene og gruppene som hører til tjenesten, og tar deg deretter til [oppslagsbildet for medlemmer](./looking-up-members).

## Når innsjekking ikke er åpen {#when-check-in-isnt-open}

Hvis administratoren din har gitt et gudstjenestetidspunkt en [innsjekkingsplan](../../b1-admin/attendance/setup#setting-a-check-in-schedule), tilbyr appen bare dette gudstjenestetidspunktet mens innsjekkingsvinduet er åpent. Gudstjenestetidspunkter der vinduet er stengt akkurat nå, skjules, slik at familier ikke kan velge dem senere i flyten.

Hvis alle gudstjenestetidspunktene for tjenesten du trykket på er stengt, viser appen **«Innsjekking er ikke åpen for denne tjenesten akkurat nå.»** Trykk på **Tilbake** for å gå tilbake til listen over tjenester og velge en annen tjeneste, eller vent til vinduet åpnes og prøv igjen.

:::info
Innsjekkingsvinduene følger menighetens tidssone. Hvis menigheten din ikke har en tidssone satt, brukes i stedet tidssonen til kampusen din. Hvis et gudstjenestetidspunkt ser ut til å åpne til feil tid, be administratoren din om å sjekke tidssonen i innstillingene for menigheten eller kampusen.
:::

:::info
Tjenester konfigureres av menighetsadministratoren din i B1 Admin under seksjonen Oppmøte. Hvis du ikke ser tjenesten du forventer, be administratoren din om å bekrefte at den er opprettet i [oppmøteoppsettet](../../b1-admin/attendance/setup.md).
:::

## Hva som skjer i bakgrunnen

Når du velger en tjeneste, henter appen tre ting fra serveren:

- **Gudstjenestetidspunktene** for den tjenesten (for eksempel kan én tjeneste ha et tidspunkt kl. 09.00 og et kl. 11.00).
- **Gruppene** tilgjengelige på hvert gudstjenestetidspunkt (for eksempel Barnehage, Førskole, Barneskole).
- **Koblingene mellom grupper og gudstjenestetidspunkter** som avgjør hvilke grupper som er tilgjengelige på hvilke tidspunkter.

Disse dataene mellomlagres lokalt, slik at resten av innsjekkingsprosessen er rask og responsiv.

:::tip
Hvis menigheten din bare har én tjeneste satt opp, må du likevel trykke på den for å gå videre. Appen velger ikke en enkelt tjeneste automatisk.
:::

## Neste steg

Etter at du har valgt en tjeneste, vil du [slå opp familien din](./looking-up-members) med telefonnummer eller navn.
