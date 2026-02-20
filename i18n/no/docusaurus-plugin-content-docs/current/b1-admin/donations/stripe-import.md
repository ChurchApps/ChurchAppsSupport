---
title: "Stripe-import"
---

# Stripe-import

<div class="article-intro">

Hvis du aksepterer donasjoner på nett gjennom Stripe, lar Stripe-importverktøyet deg hente disse transaksjonene inn i B1 Admin slik at alle giverdataene dine er samlet på ett sted. Dette er spesielt nyttig for å fange opp transaksjoner som ikke ble automatisk synkronisert.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Fullfør [Oppsett av nettbasert givertjeneste](online-giving-setup.md) for å koble Stripe-kontoen din til B1 Admin
- Verifiser at du har donasjoner i Stripe-dashbordet ditt for datoperioden du vil importere

</div>

## Hvordan det fungerer

Importprosessen bruker en to-trinns arbeidsflyt: først forhåndsviser du hva som vil bli importert, deretter bekrefter du importen. Denne prøvekjøringstilnærmingen lar deg gjennomgå alt før noen data opprettes.

## Importere transaksjoner

1. I **B1 Admin**, naviger til **Donasjoner > Grupper**.
2. Klikk **Stripe Import**-lenken nederst på Gruppesiden.
3. Velg en **datoperiode** for transaksjonene du vil importere.
4. Klikk **Preview** for å kjøre en prøvekontroll.

## Gjennomgå forhåndsvisningen

Forhåndsvisningen viser hver transaksjon fra Stripe sammen med en statusindikator:

- **Ny** -- denne transaksjonen er ikke importert ennå og vil bli inkludert hvis du fortsetter.
- **Allerede importert** -- denne transaksjonen finnes allerede i B1 Admin og vil bli hoppet over.
- **Hoppet over** -- denne transaksjonen ble ekskludert av en annen grunn (f.eks. en refusjon eller mislykket belastning).

En sammendragsseksjon øverst viser totalt antall transaksjoner i hver kategori og beløpene som er involvert.

:::info
Forhåndsvisningssteget oppretter ingen poster. Det er en skrivebeskyttet kontroll slik at du kan verifisere hva som vil skje før du bekrefter.
:::

## Fullføre importen

1. Gjennomgå forhåndsvisningsresultatene og sammendragstotalene.
2. Klikk **Import Missing** for å importere alle transaksjoner merket som **Ny**.
3. Etter at importen er fullført, oppdateres statusmerkene ved siden av hver transaksjon for å vise resultatet.

## Tips for bruk av Stripe-import

- Kjør importen regelmessig (ukentlig eller månedlig) for å holde registrene dine oppdatert.
- Hvis en transaksjon viser **Allerede importert**, betyr det at B1 Admin allerede har en tilsvarende post -- ingen handling er nødvendig.
- Bruk datoperiode-filteret for å fokusere på en bestemt periode hvis du leter etter bestemte transaksjoner.

:::tip
Etter import, besøk [Grupper](batches.md)-siden for å verifisere at de importerte donasjonene vises riktig og at totalene stemmer med det du ser i Stripe-dashbordet ditt.
:::

## Neste steg

- Sjekk [Donasjonsrapporter](donation-reports.md) for å gjennomgå de importerte transaksjonene sammen med dine andre giverdata
- Sørg for at importerte donasjoner er tilordnet de riktige [fondene](funds.md) for nøyaktige [giveroppgaver](giving-statements.md)
