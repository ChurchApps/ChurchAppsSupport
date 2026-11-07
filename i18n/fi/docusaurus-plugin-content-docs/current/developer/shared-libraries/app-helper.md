---
title: "AppHelper"
description: "Viite @churchapps/apphelper-paketille: alipolkujen sisääntulopisteet, sovellukset jotka käyttävät kutakin exportia sekä paikallinen kehitys ja julkaisu."
---

# AppHelper

<div class="article-intro">

Paketti `@churchapps/apphelper` tarjoaa jaettuja React-komponentteja ja apuohjelmia kaikille ChurchApps-verkkosovelluksille. Se on yksi julkaistu paketti, joka tarjoaa ominaisuusmoduulit alipolkujen kautta -- kirjautuminen, lahjoitukset, lomakkeet, Markdown sekä verkkosivusto- ja CMS-toiminnot -- sekä joukon yhteisiä peruskomponentteja ja apufunktioita.

</div>

<div class="prereqs">
<h4>Ennen aloittamista</h4>

- Asenna **Node.js** ja **Git** -- katso [Esivaatimukset](../setup/prerequisites.md)
- Tutustu [Packages-työtilaan](./index.md) ja julkaisuprosessiin

</div>

## Sisääntulopisteet

Paketin `package.json`-tiedostossa on määritelty alipolkujen exportit, joten jokainen ominaisuusmoduuli voidaan tuoda erikseen:

| Sisääntulopiste | Sisältö |
|-------------|----------|
| `@churchapps/apphelper` | Ydinkomponentit, apufunktiot ja hookit |
| `@churchapps/apphelper/login` | Kirjautumis- ja rekisteröintikäyttöliittymä |
| `@churchapps/apphelper/donations` | Lahjoitus- ja antokomponentit |
| `@churchapps/apphelper/forms` | Lomakkeiden lähetyskomponentit |
| `@churchapps/apphelper/markdown` | Markdown- ja HTML-editorit sekä renderöijät |
| `@churchapps/apphelper/website` | Verkkosivustorakentajan ja CMS:n komponentit |

## Kuka käyttää mitäkin

Ennen jaetun exportin muuttamista tarkista, mitkä sovellukset sitä tuovat:

| Exportin alue | Mitä se tarjoaa | Käyttäjät |
|---|---|---|
| Juuri -- ydinkomponentit ja hookit | `DisplayBox`, `InputBox`, `Loading`, `PageHeader`, `PersonAvatar`, `SmallButton`, `ErrorMessages`, `ExportLink`, `useMountedState` sekä uudelleen exportoidut `@churchapps/helpers`-apufunktiot (`ApiHelper`, `DateHelper`, `Locale`, `UserHelper` jne.) | B1Admin, B1App, B1Transfer, LessonsApp |
| Juuri -- sivuston kehys | `SiteHeader` (navigaatio, käyttäjävalikko, ilmoitukset) | B1Admin, B1Transfer, LessonsApp |
| Juuri -- sisällön muokkaimet ylläpidossa | `ImageEditor`, `HelpIcon` | B1Admin |
| Juuri -- reaaliaikainen infrastruktuuri | `SocketHelper`, `SubscriptionManager`, `NotificationService` | B1Admin, B1App |
| Juuri -- chat- ja läsnäolotilat | `ConversationStore`, `PresenceStore` | B1App |
| Juuri -- muistiinpanot ja viestintä | `Notes` (henkilöiden ja tehtävien henkilökunnan muistiinpanot); `AddNote`, `SubscriptionToggle` (jäsenviestintä) | B1Admin (`Notes`), B1App (`AddNote`, `SubscriptionToggle`) |
| Juuri -- Lessons-kohtaiset | `AnalyticsHelper`, `FloatingSupport`, `SupportModal` | LessonsApp |
| `./login` | `LoginPage`, `LogoutPage` | B1Admin, B1App, B1Transfer, LessonsApp |
| `./markdown` | `MarkdownEditor`, `MarkdownPreviewLight` (jaettu); `MarkdownPreview`, `HtmlEditor` (sisällön muokkaus ylläpidossa) | B1Admin, B1App, LessonsApp |
| `./donations` | `MultiGatewayDonationForm`, `RecurringDonations`, `PaymentMethods`, `StripePaymentMethod`, `DonationHelper`/`getPaymentProvider` (jaettu); `FundDonations` (vain ylläpito) | B1Admin, B1App |
| `./forms` | `FormSubmissionEdit` (renderöi `ConversationalForm`-komponentin, kun lomakkeen `displayMode` on `conversational`) | B1Admin, B1App |
| `./website` | Sivunrenderöinnin ydin, jonka muokkain ja renderöijä jakavat (`Element` sekä tyyppikohtaiset renderöijät, jotka haetaan `ElementRegistry`:n kautta, `StyleHelper`, `DroppableArea`, `DraggableWrapper`, `Theme`, `YoutubeBackground`, `SectionDivider`/`parseDividerConfig`); koko sivuston kattavat widgetit (`AnnouncementBanner`, `Launcher` sekä niiden `parse*Config`-apufunktiot); `Animate`, `ElementBlock`, `NonAuthDonationWrapper` ja `SermonElement`, joita käyttää vain julkinen renderöijä | B1Admin (muokkain), B1App (muokkainkomponentit ja renderöijä) |

B1Transfer ja LessonsApp käyttävät vain juuri- ja `login`-sisääntulopisteitä -- `donations`-, `forms`- ja `website`-alipolkuja käyttävät tällä hetkellä yksinomaan B1Admin ja B1App.

## Paikallinen kehitysympäristö

Tämä paketti sijaitsee [Packages](https://github.com/ChurchApps/Packages)-työtilassa muiden jaettujen kirjastojen rinnalla:

1. Kloonaa työtila:

   ```bash
   git clone https://github.com/ChurchApps/Packages.git
   ```

2. Asenna riippuvuudet työtilan juuressa:

   ```bash
   cd Packages && yarn install
   ```

3. Käynnistä Vite-leikkikenttä paketin hakemistosta:

   ```bash
   cd apphelper && yarn dev
   ```

   Leikkikentän kehityspalvelin käynnistyy osoitteeseen `http://localhost:3001`. Kopioi ensin `playground/dotenv.sample` tiedostoon `playground/.env` ja täytä tarvittavat arvot.

Paketin rakentaminen käyttöön (kääntää `dist/`-hakemistoon ja kopioi kieli- ja CSS-resurssit) tapahtuu komennolla `yarn workspace @churchapps/apphelper build` -- tai rakenna kaikki paketit riippuvuusjärjestyksessä juuresta komennolla `yarn build`. Testataksesi julkaisematonta versiota kuluttavassa sovelluksessa käytä väliaikaista Yarn-portaalia -- katso [Paikallinen kehitys kuluttavaa sovellusta vasten](./index.md#local-development-against-a-consuming-app).

:::tip
Leikkikenttä on nopein tapa kehittää ja testata AppHelper-komponentteja. Se päivittyy Vite-kehityspalvelimen kautta heti, joten näet muutokset reaaliajassa.
:::

## Julkaiseminen

Julkaisut kulkevat changeset-työkalun kautta: aja `yarn changeset` työtilan juuressa jokaisen muutoksen kohdalla ja sitten `yarn publish-all`, kun olet valmis julkaisemaan. Koko prosessi on kuvattu [Jaettujen kirjastojen yleiskatsauksessa](./index.md#releasing-with-changesets).

:::warning
Älä poista tai nimeä uudelleen exportia ennen kuin korvaava versio on julkaistu ja jokainen kuluttaja on siirretty. Etsi kaikki kuluttavat repositoriot komennolla grep ennen poistoa.
:::

## Aiheeseen liittyvät artikkelit

- **[Helpers](./helpers.md)** -- AppHelperin rinnalla käytettävä peruspaketti apufunktioille
- **[Verkkosovellukset](../web-apps/index.md)** -- Verkkosovellukset, jotka käyttävät tätä pakettia
- **[Jaettujen kirjastojen yleiskatsaus](./index.md)** -- Työtilan asennus, julkaisuprosessi ja paikallisen linkityksen työnkulku
