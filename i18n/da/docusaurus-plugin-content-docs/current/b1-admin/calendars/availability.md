---
title: "Tilgængelighedskalender"
description: "Opsæt bookbare lokaler og udstyr i B1 Admin, book dem i kalenderen med buffertid, og håndtér gentagne bookinger og bookinger, der kræver godkendelse."
---

# Tilgængelighedskalender

<div class="article-intro">

Tilgængelighedskalenderen giver dig et overblik over alle lokale- og ressourcebookinger i din kirke. Herfra kan du se, hvad der er planlagt, opdage konflikter, før de opstår, og booke et lokale eller en ressource til enhver begivenhed direkte.

</div>

<div class="prereqs">
<h4>Før du begynder</h4>

- Opret mindst ét [lokale eller én ressource](./rooms-resources.md) i afsnittet Lokaler og ressourcer
- Du skal have redigeringsadgang til afsnittet Kalendere i B1 Admin

</div>

## Åbning af tilgængelighedskalenderen

I B1 Admin åbner du [Hurtigmenuen](../introduction.md#getting-around-with-the-jump-menu) (søgefeltet øverst til venstre), udvider **Kalendere** og klikker på **Tilgængelighed**.

## Sådan læser du kalenderen

Kalenderen viser som standard den aktuelle måned. Du kan navigere frem og tilbage med pilene øverst eller skifte mellem visningerne måned, uge og dag.

Hver begivenhed er farvekodet efter bookingstatus:

| Farve | Betydning |
|-------|-----------|
| Grøn | Godkendt |
| Orange | Afventer godkendelse |
| Grå | Blokeret (ikke tilgængelig) |

Når du holder musen over en begivenhed, vises begivenhedens titel og det lokale eller den ressource, den er knyttet til.

## Filtrering efter lokale eller ressource

Brug rullemenuen **Lokale / ressource** øverst til venstre for at indsnævre kalenderen til ét bestemt lokale eller én ressource. Vælg **Alle lokaler og ressourcer** for at vende tilbage til den fulde visning.

## Booking af et lokale eller en ressource

1. Klik på knappen **Book** øverst på siden.
2. Udfyld begivenhedens oplysninger i dialogen, der åbner:
   - **Titel** — navnet på begivenheden
   - **Start** og **Slut** dato/klokkeslæt
   - **Synlighed** — Offentlig eller Privat
   - **Lokaler** — vælg et eller flere lokaler, der skal reserveres
   - **Ressourcer** — vælg en eller flere ressourcer, der skal reserveres
3. Du kan eventuelt angive tidspunkterne **Opsætning** og **Nedtagning** (i minutter). Disse udvider bookingen i begge ender, så lokalet er reserveret til opstilling og oprydning, selvom begivenhedens start- og sluttidspunkter forbliver de samme.
4. Hvis bookingen skal gentages, markerer du **Gentages** og konfigurerer gentagelsen:
   - **Gentag hver** -- angiv intervallet (for eksempel hver 2. uge).
   - **Frekvens** -- Dagligt, Ugentligt eller Månedligt. Ved ugentligt kan du vælge bestemte ugedag(e); ved månedligt kan du vælge en fast dag i måneden eller et relativt mønster som „den anden tirsdag".
   - **Slutter** -- Aldrig, på en bestemt dato eller efter et fastsat antal forekomster.
5. Hvis du vil angive et særligt bookingvindue (et andet end begivenhedens start/slut), slår du **Tilpasset bookingvindue** til og angiver vinduets start- og sluttidspunkter. Brug dette, når et lokale skal være tilgængeligt uden for begivenhedens angivne tidsrum.
6. Klik på **Gem** for at sende bookingen.

:::info
Hvis lokalet eller ressourcen har en konfigureret **Godkendelsesgruppe**, vises bookingen som **Afventer**, indtil en leder i den gruppe godkender den. Se [Kalendergodkendelser](./approvals.md) for godkendelsesprocessen.
:::

:::tip
Kalenderen fremhæver eventuelle konflikter, før du gemmer. Hvis du ser en konfliktadvarsel, skal du justere tidspunkterne eller vælge et andet lokale.
:::

## Relaterede artikler

- [Lokaler, ressourcer og planlægning](./rooms-resources.md) — opsæt bookbare lokaler og udstyr
- [Kalendergodkendelser](./approvals.md) — godkend eller afvis bookinganmodninger
- [Oprettelse af kalendere](./creating-calendars.md) — administrer begivenhedskalendere
