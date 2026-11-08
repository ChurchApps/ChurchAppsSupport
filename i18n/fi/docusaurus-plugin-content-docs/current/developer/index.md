---
title: "Kehittäjädokumentaatio"
description: "Löydä tiesi ChurchAppsin kehittäjädokumentaatioon: paikallinen asennus, API- ja verkkosovellusohjeet, jaetut kirjastot, mobiilikäännökset ja avoimen lähdekoodin projektien julkaisu."
---

# Kehittäjädokumentaatio

<div class="article-intro">

ChurchApps on kokoelma noin 20 avoimen lähdekoodin projektia, jotka yhdessä muodostavat kattavan seurakunnan hallintajärjestelmän. Projektit kattavat taustapalvelun API:t, verkkosovellukset, mobiilisovellukset, työpöytäsovelluksen ja jaetut kirjastot – kaikki kirjoitettu TypeScriptillä. Tämä osio sisältää kaiken, mitä tarvitset paikallisen kehitysympäristön pystyttämiseen ja kehitystyöhön osallistumiseen.

</div>

## Arkkitehtuuri lyhyesti

Projektit ovat **itsenäisiä repositorioita** (ei monorepoa). Jaettu koodi julkaistaan npm-paketteina `@churchapps/*`-nimiavaruudessa, ja sitä käytetään tavallisina riippuvuuksina. Tämä tarkoittaa, että voit työskennellä yhden projektin parissa kloonaamatta koko ekosysteemiä.

Keskeiset ominaisuudet:

- **Kieli:** TypeScript kaikkialla
- **Taustapalvelu:** Node.js / Express -API:t, jotka julkaistaan AWS Lambda -palveluun Serverless Frameworkin kautta
- **Verkko:** React 19 (Vite ja Next.js), Material-UI 7
- **Mobiili:** React Native Expolla
- **Tietokanta:** MySQL 8.0, yksi tietokanta per API-moduuli

## Mitä tämä osio sisältää

- **[Asennus](./setup/index.md)** -- Paikallinen kehitysympäristö, esivaatimukset ja määritykset
  - [Esivaatimukset](./setup/prerequisites.md) -- Tarvittavat työkalut ja ohjelmistot
  - [Projektien yleiskatsaus](./setup/project-overview.md) -- Kaikki projektit yhdellä silmäyksellä
  - [Ympäristömuuttujat](./setup/environment-variables.md) -- `.env`-tiedostojen määrittäminen
- **[API](./api/index.md)** -- Ydin-API:n paikallinen asennus, tietokannan alustus ja moduulirakenne
- **[Verkkosovellukset](./web-apps/index.md)** -- B1Adminin, B1Appin ja LessonsAppin ajaminen paikallisesti
- **[Mobiilisovellukset](./mobile/index.md)** -- B1Checkinin ja muiden Expo-sovellusten rakentaminen
- **[Jaetut kirjastot](./shared-libraries/index.md)** -- Helpers-, ApiHelper- ja AppHelper-kirjastojen käyttö
- **[Julkaisu](./deployment/index.md)** -- API:den, verkkosovellusten ja mobiilisovellusten julkaiseminen
- **[FreePlay-sisällöntarjoaja](./freeplay-content-provider.md)** -- Oppituntikirjastosi integroiminen FreePlayhin

## Yhteisö ja resurssit

| Resurssi | Linkki |
|----------|--------|
| GitHub-organisaatio | [github.com/ChurchApps](https://github.com/ChurchApps) |
| Ongelmaseuranta | [ChurchAppsSupport Issues](https://github.com/ChurchApps/ChurchAppsSupport/issues) |
| Slack-yhteisö | [Liity Slackiin](https://join.slack.com/t/livechurchsolutions/shared_invite/zt-i88etpo5-ZZhYsQwQLVclW12DKtVflg) |

:::tip
Nopein tapa aloittaa kehitystyö on valita verkkosovellus (esimerkiksi B1Admin), osoittaa se jaettuihin **demo-API:hin** ja aloittaa käyttöliittymämuutokset. Tietokantaa tai API:n asennusta ei tarvita.
:::
