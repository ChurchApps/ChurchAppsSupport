---
title: "Pomoćne funkcije"
---

# Pomoćne funkcije

<div class="article-intro">

Paket `@churchapps/helpers` sadrži osnovne pomoćne funkcije koje koriste svi ChurchApps projekti, i frontend i backend. Nezavisan je od okvira i uključuje česte pomoćne funkcije kao što su `DateHelper`, `ApiHelper`, `CurrencyHelper`, kao i zajedničke TypeScript interfejse koji čine ugovor o podacima između aplikacija i API-ja.

</div>

<div class="prereqs">
<h4>Prije početka</h4>

- Instalirajte **Node.js** i **Git** -- pogledajte [Preduslove](../setup/prerequisites)
- Upoznajte se s postavkom [radnog prostora paketa](./index.md) i tokom objavljivanja

</div>

## Ko ga koristi

Svaki ChurchApps API (glavni Api, AskApi i LessonsApi) i svaki web frontend (B1Admin, B1App, B1Transfer, LessonsApp) direktno zavisi od ovog paketa. Frontendi takođe dobijaju mnoge njegove izvoze (`ApiHelper`, `DateHelper`, `UserHelper` i druge interfejse) ponovo izvezene kroz [`@churchapps/apphelper`](./app-helper). Ostali zajednički paketi ga deklarišu kao peer zavisnost, tako da svaka aplikacija koristi tačno jednu kopiju.

## Postavka za lokalni razvoj

Ovaj paket se nalazi u [Packages](https://github.com/ChurchApps/Packages) radnom prostoru, zajedno s ostalim zajedničkim bibliotekama:

1. Klonirajte radni prostor:

   ```bash
   git clone https://github.com/ChurchApps/Packages.git
   ```

2. Instalirajte zavisnosti u korijenu radnog prostora:

   ```bash
   cd Packages && yarn install
   ```

3. Izgradite (kompajlira TypeScript u `dist/`):

   ```bash
   yarn workspace @churchapps/helpers build
   ```

   Ili pokrenite `yarn build` u korijenu da izgradite sve pakete po redoslijedu zavisnosti.

Da testirate izmjene unutar aplikacije koja koristi paket, koristite privremeni Yarn portal -- pogledajte [Lokalni razvoj protiv aplikacije koja koristi paket](./index.md#local-development-against-a-consuming-app).

## Objavljivanje

Izdanja se objavljuju kroz changesets, umjesto ručnog povećanja verzija:

1. Pokrenite `yarn changeset` u korijenu radnog prostora i izaberite `@churchapps/helpers` s odgovarajućom vrstom povećanja; commitujte generisanu changeset datoteku zajedno sa svojom izmjenom.
2. Kada budete spremni za izdanje, pokrenite `yarn publish-all` u korijenu -- on povećava verzije, piše CHANGELOG-ove, gradi po redoslijedu zavisnosti i objavljuje na npm.

Novi zajednički interfejsi idu u `helpers/src/interfaces/` i ponovo se izvoze kroz paketni barrel. Katalog tipova elemenata website buildera (`ElementTypes.ts` -- 35 tipova sa njihovim šemama odgovora) također se nalazi ovdje; to je ugovor koji dijele apphelper renderi, obrasci za uređivanje B1Admin-a i AI prompti za generisanje (pogledajte [Arhitekturu website buildera](../architecture/website-builder)).

:::warning
Pošto se ovaj paket koristi u svakom ChurchApps projektu, izmjene ovdje imaju širok uticaj. Izdanje `helpers` automatski povećava `apihelper` i `apphelper` kako bi njihovi opsezi zavisnosti ostali ažurni. Testirajte s Yarn portalom u najmanje jednom API-ju i jednoj web aplikaciji koja koristi paket prije objavljivanja.
:::

## Povezani članci

- **[ApiHelper](./api-helper)** -- Serverske pomoćne funkcije koje zavise od ovog paketa
- **[AppHelper](./app-helper)** -- React komponente koje zavise od ovog paketa
- **[Pregled zajedničkih biblioteka](./index.md)** -- Postavka radnog prostora, tok objavljivanja i workflow lokalnih veza
