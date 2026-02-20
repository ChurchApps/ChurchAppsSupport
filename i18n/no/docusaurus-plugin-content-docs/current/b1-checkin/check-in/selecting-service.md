---
title: "Velge en Gudstjeneste"
---

# Velge en Gudstjeneste

<div class="article-intro">

Det første trinnet i hver innsjekking er å velge hvilken gudstjeneste du deltar på. Gudstjenesteskjermen vises rett etter at appen er ferdig med å laste og bestemmer hvilke gudstjenestetider og grupper som er tilgjengelige for resten av innsjekkingsflyten.

</div>

<div class="prereqs">
<h4>Før Du Begynner</h4>

- [Logg inn](../getting-started/logging-in) på B1 Church Checkin-appen og velg kirken din
- Sørg for at kirkens administrator har [konfigurert gudstjenester og gudstjenestetider](../../b1-admin/attendance/setup.md) i B1 Admin

</div>

## Hvordan Det Fungerer

1. Etter innlogging (eller etter automatisk innlogging ved gjentatte besøk), viser appen **gudstjenesteskjermen**.
2. Du vil se en liste over alle gudstjenester som er konfigurert for kirken din. Hver gudstjeneste vises som et kort som viser gudstjenestenavnet (for eksempel "Sunday Morning" eller "Wednesday Evening").
3. Trykk på gudstjenesten du deltar på.

Appen laster inn gudstjenestetidene og gruppene knyttet til den gudstjenesten, og tar deg deretter til [medlemssøkskjermen](./looking-up-members).

:::info
Gudstjenester konfigureres av kirkens administrator i B1 Admin under Oppmøte-seksjonen. Hvis du ikke ser gudstjenesten du forventer, be administratoren om å bekrefte at den er opprettet i [oppmøteoppsettet](../../b1-admin/attendance/setup.md).
:::

## Hva Som Skjer Bak Kulissene

Når du velger en gudstjeneste, henter appen tre ting fra serveren:

- **Gudstjenestetidene** for den gudstjenesten (for eksempel kan en enkelt gudstjeneste ha en tidsluke kl. 9:00 og en kl. 11:00).
- **Gruppene** tilgjengelige for hver gudstjenestetid (for eksempel Nursery, Preschool, Elementary).
- **Gruppe-til-gudstjenestetid-koblingene** som bestemmer hvilke grupper som er tilgjengelige til hvilke tider.

Disse dataene lagres lokalt slik at resten av innsjekkingsprosessen er rask og responsiv.

:::tip
Hvis kirken din bare har én gudstjeneste konfigurert, må du fortsatt trykke på den for å fortsette. Appen velger ikke automatisk en enkelt gudstjeneste.
:::

## Neste Trinn

Etter å ha valgt en gudstjeneste, vil du [søke opp familien din](./looking-up-members) med telefonnummer eller navn.
