---
title: "Lagrede lister"
description: "Lagre et personsøk i B1 Admin som en navngitt liste, og last det inn igjen med ett klikk. Lister er levende, så nye medlemmer som passer, vises automatisk."
---

# Lagrede lister

<div class="article-intro">

**Lagrede lister** lar deg lagre et søk under et navn og kjøre det på nytt med ett klikk når som helst. Bygg en liste én gang («Aktive medlemmer på Nordre kampus», «Besøkende de siste 90 dagene» eller et hvilket som helst avansert filter), og den blir værende øverst på siden Personer, slik at du aldri trenger å bygge søket på nytt.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Kjør minst ett søk i seksjonen Personer, slik at du har resultater å lagre. Se [Søke etter personer](./searching-people.md) eller [AI-søk](./ai-search.md).
- Å lagre, endre og slette lister krever tillatelsen **Rediger personer**. Se [Tildele roller](./roles-permissions.md).

</div>

## Lagre et søk som en liste {#saving-a-search-as-a-list}

1. Kjør et søk på siden **Personer**: et hurtigsøk, et KI-søk eller et avansert filtersøk.
2. Når søket finner minst én person, vises en knapp **Lagre som liste** i sidetoppen på siden Personer.
3. Klikk på **Lagre som liste**.
4. Skriv inn et **Listenavn** (påkrevd).
5. Du kan valgfritt skrive inn en **Kategori** for å gruppere beslektede lister (for eksempel «Oppsøking» eller «Medlemskap»).
6. Under **Hvem kan se denne listen** velger du **Alle ansatte** eller **Bare meg**.
7. Under **Treff** velger du **Alle filtre** (personer må treffe alle filtrene) eller **Ett av filtrene** (personer som treffer minst ett filter).
8. Under **Ta med husstand** velger du **Bare treff**, **Barn av treff** (legger også til barna i hver treffpersons husstand), eller **Hele husstanden** (legger til alle i hver treffpersons husstand).
9. Du kan valgfritt kryss av for **Oppdater hver natt** (se [Nattlig oppdatering](#nightly-refresh) nedenfor). Når den er avkrysset, kan du også kryss av for **Send meg e-post når medlemskap endres**.
10. Klikk på **Lagre**.

Listen er nå lagret og vises som en knapp i raden med lagrede lister øverst på siden Personer, ved siden av **Alle**. Lister merket **Bare meg** viser et lite låsikon.

:::info
Lister satt til **Alle ansatte** deles på tvers av kirken din. Alle med tilgang til Personer kan se og laste dem. Bare ansatte med riktig tillatelse kan endre eller slette lister.
:::

## Laste inn en lagret liste {#loading-a-saved-list}

Klikk på et hvilket som helst listenavn øverst på siden Personer. Søket kjøres på nytt umiddelbart med det lagrede spørringen, og resultatene oppdateres. Klikk på **Alle** for å gå tilbake til hele katalogen din.

Lister grupperes etter kategori (hvis du har tildelt en), og lister uten kategori vises sist.

:::tip
Lister er **levende spørringer**, ikke øyeblikksbilder. Hver gang du laster en liste, kjøres søket på nytt mot de gjeldende dataene dine. Nye personer som nå passer kriteriene, vil dermed vises.
:::

## Gi nytt navn til og slette lister {#renaming-and-deleting-lists}

Ansatte med administrasjonstillatelse kan gi nytt navn til eller slette en hvilken som helst liste fra siden Personer. Først klikker du på listen for å laste den. Da vises to ikoner ved siden av navnet:

- Klikk på ikonet **Listeinnstillinger** (tannhjul) for å gi listen nytt navn, eller endre kategori og deling. Lister som er lagret med disse alternativene kan også endre **Ta med husstand**, **Oppdater hver natt** og **Send meg e-post når medlemskap endres** her. Innstillingen **Treff** kan ikke endres etter at listen er lagret.
- Klikk på ikonet **Slett** (søppelbøtte) for å slette den (du blir bedt om å bekrefte).

## Nattlig oppdatering {#nightly-refresh}

Å laste en liste kjører alltid søket på nytt, enten **Oppdater hver natt** er avkrysset eller ikke. **Oppdater hver natt** får også B1 til å kjøre listen på nytt hver natt og holde styr på hvem som ble med i den eller forlot den. Hvis du har krysset av for **Send meg e-post når medlemskap endres**, sender B1 deg e-post (personen som lagret listen) etter en nattlig oppdatering som la til eller fjernet noen, med hvor mange personer som ble lagt til og fjernet. Den nattlige oppdateringen sender også endringer i listemedlemskap til [integrasjonene](../integrations/index.md) dine, for eksempel Mailchimp-merkelapper.

## Bruksområder {#use-cases}

| Scenario | Slik bygger du listen |
|---|---|
| Alle besøkende | Avansert søk: Medlemsstatus = Besøkende |
| Medlemmer på en bestemt kampus | Avansert søk: Kampus = [din kampus] |
| Frivillige med utløpt bakgrunnssjekk | Avansert søk: [egendefinert felt](../settings/custom-fields.md) «Bakgrunnssjekk utløper» er før i dag |
| Resultater fra et KI-spørsmål | Still et spørsmål i KI-søk, og lagre deretter |

## Relaterte artikler {#related-articles}

- [Søke etter personer](./searching-people.md): hurtigsøk og tilpasning av kolonner
- [AI-søk](./ai-search.md): spørsmål på naturlig språk som du kan lagre som lister
- [Egendefinerte felt](../settings/custom-fields.md): definer dine egne personfelt, og filtrer og lagre lister på dem
- [Demografi](./demographics.md): gå i dybden på et demografidiagram til et filter i Personer, og lagre det deretter som en liste
- [Masseredigering](./bulk-editing.md): etter at du har lastet en liste, kan du masseoppdatere alle medlemmene samtidig
