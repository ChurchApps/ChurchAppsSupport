---
title: "Verkkosovellukset"
---

# Verkkosovellukset

<div class="article-intro">

ChurchApps sisältää kolme verkkosovellusta, joista kukin palvelee eri käyttäjäryhmää ja tarkoitusta. Niillä on yhteinen teknologiapohja: React 19, TypeScript ja Material-UI 7. Ne eroavat toisistaan kuitenkin käännösworkflow'nsa ja julkaisukohteidensa osalta.

</div>

## Sovellukset yhdellä silmäyksellä

| Sovellus | Käyttötarkoitus | Kehys | Kehityksen portti |
|-----|---------|-----------|----------|
| [**B1Admin**](./b1-admin.md) | Seurakunnan hallintanäkymä | React 19 + Vite + MUI 7 | 5173 |
| [**B1App**](./b1-app.md) | Seurakuntalaisten julkinen sovellus | Next.js 16 + React 19 + MUI 7 | 3301 |
| [**LessonsApp**](./lessons-app.md) | Oppituntisisällön hallinta | Next.js 16 + React 19 | 3501 |

## Jaettu teknologiapino

Kaikki kolme verkkosovellusta on rakennettu seuraavilla:

- **TypeScript** -- Tyyppiturvallisuus päästä päähän
- **React 19** -- Käyttöliittymäkomponenttikirjasto
- **Material-UI 7** -- Suunnittelujärjestelmä ja komponenttityökalupakki
- **React Query 5** -- Palvelimen tilan hallinta

## Jaetut komponentit

Sovellukset jakavat käyttöliittymäkomponentit ja apuohjelmat `@churchapps/apphelper*`-pakettiperheen kautta:

| Paketti | Käyttötarkoitus |
|---------|---------|
| `@churchapps/apphelper` | Jaetut ydinkomponentit Reactille |
| `@churchapps/apphelper-login` | Kirjautumisen käyttöliittymäkomponentit |
| `@churchapps/apphelper-donations` | Lahjoitus- ja antolomakkeet |
| `@churchapps/apphelper-forms` | Lomakerakentajan komponentit |
| `@churchapps/apphelper-markdown` | Markdown-renderöinti |
| `@churchapps/apphelper-website` | Verkkosivu- ja CMS-komponentit |

:::tip
Näiden jaettujen pakettien paikalliseen kehittämiseen liittyvät tiedot löydät [AppHelper](../shared-libraries/app-helper)-dokumentaatiosta.
:::

## Postinstall-skripti

Jokaisessa verkkosovelluksessa on `postinstall`-skripti, joka kopioi kieliasetustiedostot ja CSS-resurssit paketista `@churchapps/apphelper` projektiin. Skripti suoritetaan automaattisesti `npm install` -komennon jälkeen.

:::info
Jos komponentit näyttävät tyylittömiltä riippuvuuksien asentamisen jälkeen, `postinstall`-skripti ei ehkä suoriutunut oikein. Voit käynnistää sen manuaalisesti komennolla `npm run postinstall`.
:::

## Rakennustyökalut

Sovelluksissa käytetään kahta eri rakennustyökalua:

- **B1Admin** käyttää **Vitea** -- nopeaa ja nykyaikaista paketoijaa, joka sopii hyvin yksisivuisiin sovelluksiin
- **B1App** ja **LessonsApp** käyttävät **Next.js:ää** -- tarjoaa palvelinpuolen renderöinnin, tiedostopohjaisen reitityksen ja optimoidut tuotantoversiot
