---
title: "Stripe-import"
---

# Stripe-import

<div class="article-intro">

Hvis du tar imot nettgaver via Stripe, lar Stripe-import-verktøyet deg hente disse transaksjonene inn i B1 Admin, slik at alle giverdataene dine ligger på ett sted. Dette er særlig nyttig for å fange opp transaksjoner som ikke ble synkronisert automatisk.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Fullfør [oppsett for nettbasert giving](online-giving-setup.md) for å koble Stripe-kontoen din til B1 Admin. Menyvalget **Stripe-import** og knappen på siden for bunter vises bare når kirkens giveløsning er Stripe, og bare for personer som kan redigere gaver
- Kontroller at du har gaver i Stripe-dashbordet for datointervallet du vil importere

</div>

## Slik fungerer det

Importprosessen bruker en arbeidsflyt i to steg: først forhåndsviser du hva som ville blitt importert, deretter bekrefter du importen. Denne tørrkjøringen lar deg gå gjennom alt før noen data opprettes.

## Importere transaksjoner

1. I **B1 Admin** går du til **Gaver > Stripe-import**. (Du kan også klikke **Importer manglende Stripe-transaksjoner** øverst på siden **Bunter**.)
2. Siden **Stripe-import** åpnes.
3. Velg et **datointervall** for transaksjonene du vil importere.
4. Klikk **Forhåndsvis** for å kjøre en tørrkjøring.

## Gå gjennom forhåndsvisningen

Forhåndsvisningen viser hver transaksjon fra Stripe med en statusindikator:

- **Ny** -- denne transaksjonen er ikke importert ennå og blir med hvis du fortsetter.
- **Allerede importert** -- denne transaksjonen finnes allerede i B1 Admin og hoppes over.
- **Hoppet over** -- denne transaksjonen ble utelatt av en annen grunn (f.eks. en refusjon eller en mislykket belastning).

Et oppsummeringsavsnitt øverst viser det totale antallet transaksjoner i hver kategori og beløpene det gjelder.

:::info
Forhåndsvisningen oppretter ingen poster. Den er en skrivebeskyttet kontroll, slik at du kan se hva som vil skje før du forplikter deg.
:::

## Fullføre importen

1. Gå gjennom resultatene i forhåndsvisningen og oppsummeringssummene.
2. Klikk **Importer manglende** for å importere alle transaksjoner merket som **Ny**.
3. Når importen er ferdig, oppdateres statusmerkene ved siden av hver transaksjon for å vise resultatet.

## Tips for bruk av Stripe-import

- Kjør importen jevnlig (ukentlig eller månedlig) for å holde oppgavene dine oppdatert.
- Hvis en transaksjon vises som **Allerede importert**, betyr det at B1 Admin allerede har en tilsvarende post -- ingen handling er nødvendig.
- Bruk filteret for datointervall for å fokusere på en bestemt periode hvis du leter etter bestemte transaksjoner.

:::tip
Etter importen bør du gå til siden [Bunter](batches.md) for å kontrollere at de importerte gavene vises riktig og at summene stemmer med det du ser i Stripe-dashbordet.
:::

## Neste steg

- Sjekk [giverrapportene](donation-reports.md) for å gå gjennom de importerte transaksjonene sammen med resten av giverdataene dine
- Sørg for at importerte gaver er knyttet til riktige [fond](funds.md), slik at [giveroppgavene](giving-statements.md) blir riktige
