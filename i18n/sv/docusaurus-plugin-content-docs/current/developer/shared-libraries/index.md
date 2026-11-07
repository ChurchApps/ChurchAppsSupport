---
title: "Delade bibliotek"
---

# Delade bibliotek

<div class="article-intro">

Den delade koden från ChurchApps publiceras på npm under scopet `@churchapps/*`. Alla delade paket finns i ett och samma repository -- [Packages](https://github.com/ChurchApps/Packages) -- som hanteras som en Yarn (Berry)-arbetsyta och versioneras med [changesets](https://github.com/changesets/changesets).

</div>

## Paket

| Paket | Beskrivning | Används av |
|-------|-------------|------------|
| [`@churchapps/helpers`](./helpers) | Grundlager: ramverksoberoende hjälpfunktioner och de delade TypeScript-gränssnitt som utgör det gemensamma dataavtalet mellan apparna | Alla projekt |
| [`@churchapps/apihelper`](./api-helper) | Express-verktyg på serversidan: autentisering, grundläggande controllers, databasåtkomst, AWS- och e-postintegrationer | Alla API:er |
| [`@churchapps/apphelper`](./app-helper) | Delade React-komponenter och funktionsmoduler (inloggning, gåvor, formulär, markdown, webbplats) | Alla webbappar |
| `@churchapps/content-providers` | Abstraktion över tredjepartsleverantörer av innehåll (Lessons.church, Planning Center, Dropbox och andra) | Api, B1Admin, B1App, FreePlay |
| `@churchapps/integration-sdk` | Verktygslåda för att bygga integrationer till B1.church: verifiering av webhooks, typad REST-klient och OAuth-hjälpfunktioner | Externa utvecklare av integrationer |
| `@churchapps/texting` | Abstraktion över SMS-leverantörer (Text In Church, Clearstream, Mutual Ministry, MinistryStuff, Nalo Solutions, Twilio) | Api |

Beroenderiktningen går strikt nedåt: apparna är beroende av `apihelper` och `apphelper`, som deklarerar `@churchapps/helpers` som en **peer dependency** så att varje app använder exakt en kopia av det.

## Installation av arbetsytan

```bash
git clone https://github.com/ChurchApps/Packages.git
cd Packages
yarn install
yarn build
```

Repot använder Yarn Berry (fältet `packageManager` i roten är avgörande) med en enda lockfil. `yarn build` bygger alla paket i beroendeordning; `yarn test` kör alla paketens tester.

## Publicera med changesets

Varje ändring i ett paket levereras med en changeset:

1. Kör `yarn changeset` i arbetsytans rot. Välj de paket du har ändrat, versionshöjningstypen (patch = rättelse, minor = ny export eller funktion, major = brytande ändring) och skriv en sammanfattning på en rad -- den blir posten i CHANGELOG.
2. Committa den genererade filen `.changeset/*.md` tillsammans med din kodändring. En pre-commit-hook blockerar commits som ändrar ett pakets källkod utan en stegad changeset.
3. När du är redo att publicera kör du `yarn publish-all` i roten. Detta förbrukar väntande changesets (höjer versioner, skriver CHANGELOG-filer, synkroniserar interna beroendeintervall), bygger allt i beroendeordning och publicerar de uppdaterade paketen till npm. Committa och pusha sedan versionsuppdateringarna.

:::warning
Kör aldrig ett rått `npm publish` inuti ett enskilt paket -- det hoppar över byggordningen och den versionsbokföring som releaseskriptet sköter. Publicering kräver ett npm-konto med publiceringsrättigheter för scopet `@churchapps`.
:::

## Lokal utveckling mot en konsumerande app

Inom arbetsytan byggs paketen direkt mot sina systerpaket -- ingen länkning behövs. För att testa en opublicerad paketbyggnad inuti en konsumerande app (B1Admin, B1App m.fl.) lägger du till en tillfällig Yarn-portal i konsumenten:

```bash
# in the consuming project
yarn link ../Packages/helpers
# ... test ...
yarn unlink ../Packages/helpers && yarn install
```

Bygg paketet först (`yarn build` i arbetsytans rot) -- konsumenten läser den kompilerade `dist/`-utdatan, inte källkoden.

:::warning
`yarn link` skriver en portal-upplösning i konsumentens `package.json`. Committa den aldrig -- kör alltid `yarn unlink` och installera om när du är klar.
:::
