---
title: "Kehittäjädokumentaatio"
---

# Kehittäjädokumentaatio

<div class="article-intro">

ChurchApps on noin 20 avoimen lähdekoodin projektin kokoelma, joka yhdessä tarjoaa täydellisen seurakunnan hallintaalustan. Projektit kattavat backend-rajapinnat, verkkosovellukset, mobiilisovellukset, työpöytäsovelluksen ja jaetut kirjastot. Kaikki on kirjoitettu TypeScriptillä. Tämä osio sisältää kaiken, mitä tarvitset paikallisen kehitysympäristön pystyttämiseen ja kontribuoinnin aloittamiseen.

</div>

## Arkkitehtuuri silmäyksellä

Projektit ovat **itsenäisiä repositorioita** (eivät monorepo). Jaettu koodi julkaistaan npm-pakettina `@churchapps/*`-nimiavaruudessa, ja sitä käytetään tavallisina riippuvuuksina. Tämä tarkoittaa, että voit työskennellä yhden projektin parissa kloonaamatta koko ekosysteemiä.

Keskeiset ominaisuudet:

- **Kieli:** TypeScript kaikkialla
- **Backend:** Node.js / Express -rajapinnat, jotka julkaistaan AWS Lambdaan Serverless Frameworkin kautta
- **Web:** React 19 (Vite ja Next.js), Material-UI 7
- **Mobiili:** React Native Expolla
- **Tietokanta:** MySQL 8.0, yksi tietokanta per API-moduuli

## Mitä tämä osio kattaa

- **[Asennus](setup/)** -- Paikallinen kehitysympäristö, esivaatimukset ja määritykset
  - [Esivaatimukset](setup/prerequisites) -- Vaaditut työkalut ja ohjelmistot
  - [Projektin yleiskatsaus](setup/project-overview) -- Kaikki projektit yhdellä silmäyksellä
  - [Ympäristömuuttujat](setup/environment-variables) -- `.env`-tiedostojen määrittäminen
- **[API](api/)** -- Ydin-API:n paikallinen asennus, tietokannan alustus ja moduulirakenne
- **[Verkkosovellukset](web-apps/)** -- B1Adminin, B1Appin ja LessonsAppin ajaminen paikallisesti
- **[Mobiilisovellukset](mobile/)** -- B1Mobilen ja muiden Expo-sovellusten rakentaminen
- **[Jaetut kirjastot](shared-libraries/)** -- Helpers-, ApiHelper- ja AppHelper-kirjastojen käyttö
- **[Julkaisu](deployment/)** -- API:iden, verkkosovellusten ja mobiilisovellusten julkaiseminen
- **[FreePlay-sisältöpalveluntarjoaja](freeplay-content-provider)** -- Oppituntikirjastosi integrointi FreePlayhin

## Yhteisö ja resurssit

| Resurssi | Linkki |
|----------|--------|
| GitHub-organisaatio | [github.com/ChurchApps](https://github.com/ChurchApps) |
| Ongelmaseuranta | [ChurchAppsSupport Issues](https://github.com/ChurchApps/ChurchAppsSupport/issues) |
| Slack-yhteisö | [Liity Slackiin](https://join.slack.com/t/livechurchsolutions/shared_invite/zt-i88etpo5-ZZhYsQwQLVclW12DKtVflg) |

:::tip
Nopein tapa aloittaa kontribuointi on valita verkkosovellus (kuten B1Admin), osoittaa se jaettuihin **demo-rajapintoihin** ja aloittaa käyttöliittymämuutosten tekeminen. Tietokantaa tai API-asennusta ei tarvita.
:::
