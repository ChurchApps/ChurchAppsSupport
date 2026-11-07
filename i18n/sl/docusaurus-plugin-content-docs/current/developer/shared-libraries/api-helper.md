---
title: "ApiHelper"
---

# ApiHelper

<div class="article-intro">

Paket `@churchapps/apihelper` vsebuje strežniške pripomočke za vse ChurchApps Express.js API-je. Vključuje osnovni razred krmilnika, avtentikacijo JWT, pripomočke za bazo podatkov ter integracije z AWS, ki jih potrebuje vsak projekt API.

</div>

<div class="prereqs">
<h4>Preden začnete</h4>

- Namestite **Node.js** in **Git** -- glejte [Predpogoji](../setup/prerequisites)
- Seznanite se z nastavitvijo in tokom objav [delovnega prostora Packages](./index.md)
- Ta paket je odvisen od [`@churchapps/helpers`](./helpers) (kot vrstniška odvisnost) in ga ponovno izvaža

</div>

## Kaj je vključeno

- **CustomBaseController** -- osnovni razred za krmilnike API-jev, zgrajen na `inversify-express-utils`
- **Auth** -- avtentikacija JWT prek `CustomAuthProvider`, `AuthenticatedUser` in `Principal`
- **Pripomočki za bazo podatkov** -- `DB.query` / `DB.queryOne` in razred `Pool` za upravljanje povezav z MySQL, ter `MySqlHelper` in `DBCreator` za nastavitev sheme
- **Integracije z AWS** -- `AwsHelper` za shranjevanje datotek v S3 in branje iz SSM Parameter Store
- **E-pošta** -- `EmailHelper`, ki podpira prenosna sredstva SES in SMTP
- **Nalaganje nastavitev** -- `EnvironmentBase` bere nize za povezave in skrivnosti iz spremenljivk okolja ali iz Parameter Store
- **Razno** -- `EncryptionHelper`, `FileStorageHelper`, `LoggingHelper`, `BasePermissions`, `SlugHelper`

## Nastavitev za lokalni razvoj

Ta paket je v [delovnem prostoru Packages](https://github.com/ChurchApps/Packages) skupaj z drugimi skupnimi knjižnicami:

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
   yarn workspace @churchapps/apihelper build
   ```

   Ali zaženite `yarn build` v korenu, da zgradite vse pakete v vrstnem redu odvisnosti.

Za preizkus sprememb znotraj API-ja, ki paket uporablja, uporabite začasni Yarn portal -- glejte [Lokalni razvoj z aplikacijo, ki uporablja paket](./index.md#local-development-against-a-consuming-app).

## Objava

Izdaje potekajo prek changesets: ob vsaki spremembi zaženite `yarn changeset` v korenu delovnega prostora, ko ste pripravljeni na izdajo, pa `yarn publish-all`. Celoten postopek je opisan v [Pregledu skupnih knjižnic](./index.md#releasing-with-changesets).

:::info
Ta paket je odvisnost vsakega ChurchApps API-ja -- glavnega Api, AskApi in LessonsApi. Ob spremembah jih preizkusite z lokalnim API-jem, preden objavite paket.
:::

## Sorodni članki

- **[Helpers](./helpers)** -- Osnovni pripomočkovni paket, od katerega je odvisen ta paket
- **[Struktura modulov](../api/module-structure)** -- Kako se krmilniki in vmesna programska oprema za avtentikacijo uporabljata v modulih API-ja
- **[Lokalna nastavitev API-ja](../api/local-setup)** -- Nastavitev API-ja za lokalni razvoj
