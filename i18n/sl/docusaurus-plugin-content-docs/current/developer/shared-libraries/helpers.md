---
title: "Pomočniki"
---

# Pomočniki

<div class="article-intro">

Paket `@churchapps/helpers` ponuja osnovne pripomočke, ki jih uporabljajo vsi projekti ChurchApps, tako na strani odjemalca kot na strežniku. Ni vezan na ogrodje in vključuje pogosto uporabljene pomočnike, kot so `DateHelper`, `ApiHelper` in `CurrencyHelper`, ter skupne vmesnike TypeScript, ki določajo podatkovno pogodbo med aplikacijami in API-ji.

</div>

<div class="prereqs">
<h4>Preden začnete</h4>

- Namestite **Node.js** in **Git** -- glejte [Predpogoji](../setup/prerequisites)
- Seznanite se z nastavitvijo [delovnega prostora paketov](./index.md) in postopkom izdaje

</div>

## Kdo to uporablja

Vsak API ChurchApps (Api, AskApi in LessonsApi) in vsak spletni odjemalec (B1Admin, B1App, B1Transfer, LessonsApp) neposredno uporablja ta paket. Spletni odjemalci prejmejo tudi številne njegove izvoze (`ApiHelper`, `DateHelper`, `UserHelper` in druge vmesnike), ki so ponovno izvoženi prek [`@churchapps/apphelper`](./app-helper). Drugi skupni paketi ga navajajo kot odvisnost `peer`, tako da vsaka aplikacija uporablja natanko eno kopijo.

## Nastavitev za lokalni razvoj

Ta paket je del delovnega prostora [Packages](https://github.com/ChurchApps/Packages) skupaj z drugimi skupnimi knjižnicami:

1. Klonirajte delovni prostor:

   ```bash
   git clone https://github.com/ChurchApps/Packages.git
   ```

2. Namestite odvisnosti v korenu delovnega prostora:

   ```bash
   cd Packages && yarn install
   ```

3. Zgradite paket (prevede TypeScript v `dist/`):

   ```bash
   yarn workspace @churchapps/helpers build
   ```

   Ali zaženite `yarn build` v korenu, da zgradite vse pakete v vrstnem redu odvisnosti.

Če želite spremembe preizkusiti znotraj porabniške aplikacije, uporabite začasni Yarn portal -- glejte [Lokalni razvoj proti porabniški aplikaciji](./index.md#local-development-against-a-consuming-app).

## Objava

Izdaje potekajo prek changesets, namesto ročnega povečevanja različic:

1. V korenu delovnega prostora zaženite `yarn changeset`, izberite `@churchapps/helpers` z ustrezno vrsto povečanja različice in datoteko changeset, ki nastane, potrdite skupaj s svojo spremembo.
2. Ko ste pripravljeni na izdajo, zaženite `yarn publish-all` v korenu -- ukaz poveča različice, zapiše CHANGELOG-e, zgradi pakete v vrstnem redu odvisnosti in jih objavi v npm.

Novi skupni vmesniki sodijo v `helpers/src/interfaces/` in so ponovno izvoženi prek glavne datoteke paketa (barrel). Katalog tipov elementov gradnika spletnih strani (`ElementTypes.ts` -- 35 tipov s shemami odgovorov) je prav tako tukaj; je pogodba, ki jo skupno uporabljajo upodabljalniki apphelper, obrazci urejevalnika B1Admin in generiranje pozivov za UI (glejte [Arhitektura gradnika spletnih strani](../architecture/website-builder)).

:::warning
Ker ta paket uporablja vsak projekt ChurchApps, imajo spremembe tukaj širok vpliv. Izdaja paketa `helpers` samodejno poveča različice `apihelper` in `apphelper`, da njihova razmerja odvisnosti ostanejo posodobljena. Pred objavo preizkusite z Yarn portalom vsaj v enem porabniškem API-ju in vsaj v eni porabniški spletni aplikaciji.
:::

## Sorodni članki

- **[ApiHelper](./api-helper)** -- Pripomočki na strežniku, ki so odvisni od tega paketa
- **[AppHelper](./app-helper)** -- React komponente, ki so odvisne od tega paketa
- **[Pregled skupnih knjižnic](./index.md)** -- Nastavitev delovnega prostora, postopek izdaje in potek lokalnih povezav
