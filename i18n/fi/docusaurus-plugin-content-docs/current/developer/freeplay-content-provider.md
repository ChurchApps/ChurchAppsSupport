---
title: "FreePlay-sisällöntarjoaja"
---

# FreePlay-sisällöntarjoaja

<div class="article-intro">

FreePlay on ChurchAppsin mediasoitin, jolla suoratoistetaan oppitunteja ja muuta videosisältöä puhelimilla, tableteilla ja televisioilla. Jos sinulla on oppituntisisältöjen kirjasto ja haluat tuoda sen FreePlayhin, tämä opas kertoo kaiken tarvittavan.

</div>

## Brändäys

Ennen integraation aloittamista tarvitsemme:

- **Logo** -- Logokuva **16:9**-kuvasuhteessa (käytetään tarjoajakorteissa FreePlay-käyttöliittymässä)
- **Brändin nimi** -- Haluttu nimi, joka näytetään organisaatiollesi FreePlayssä

## API-päätepisteet

FreePlay kommunikoi palvelusi kanssa pienen REST-päätepistejoukon kautta. Kirjoitamme jokaiselle tarjoajalle oman sovittimen, joten tarkka URL-rakenne on joustava, mutta alla olevat tiedot ovat niitä, joita tarvitsemme.

### Todennus

Valitse sisältösi mukainen malli:

| Malli | Milloin käytetään | Mitä tarvitsemme |
|-------|-------------------|------------------|
| **Ei mitään** | Julkinen sisältö, kirjautumista ei vaadita | Ei mitään -- kutsumme luettelon päätepisteitä suoraan |
| **OAuth (PKCE)** | Web- ja mobiilikirjautuminen | Valtuutus-URL, tokenin vaihtopäätepiste, asiakastunnus (client ID), käyttöoikeudet (scopes) |
| **Laitevirta (Device Flow)** | Suositeltu TV-sovelluksiin (käyttäjä syöttää lyhyen koodin puhelimellaan) | Laitteen valtuutuspäätepiste, tokenin kyselypäätepiste, asiakastunnus (client ID) |

:::tip
Jos sisältösi vaatii todennuksen, todennuspäätepiste palauttaa **käyttäjätokenin**, jonka FreePlay välittää selaus- ja oppituntipäätepisteille sisältöön pääsyn valtuuttamiseksi.
:::

### Selaus / luettelo

Päätepiste (tai päätepisteiden joukko), joka palauttaa **kansiopuun** kaikista saatavilla olevista oppitunneista.

- Tämä voi olla **yksi kutsu**, joka palauttaa koko puun, tai **useita kutsuja**, joista kukin palauttaa yhden tason, kun käyttäjä etenee syvemmälle.
- Jokaisen puun kohteen tulisi sisältää:

| Kenttä | Pakollinen | Kuvaus |
|--------|------------|--------|
| `id` | Kyllä | Kansion yksilöllinen tunniste |
| `name` | Kyllä | Kansion näytettävä nimi |
| `thumbnail` | Suositeltava | **16:9**-pikkukuvan URL |

### Oppitunnin soittolista

Päätepiste, joka palauttaa yksittäisen oppitunnin **mediatiedostojen soittolistan**.

Jokaisen soittolistan kohteen tulisi sisältää:

| Kenttä | Pakollinen | Kuvaus |
|--------|------------|--------|
| `title` | Kyllä | Median näytettävä otsikko |
| `mediaType` | Kyllä | `video` tai `image` |
| `url` | Kyllä | Suora latauslinkki tiedostoon (katso [Mediamuodot](#media-formats) alla) |
| `thumbnail` | Suositeltava | Kohteen pikkukuva |
| `duration` | Suositeltava | Kesto sekunneissa (videoille) |

## Mediamuodot

FreePlay lataa tiedostot suoraan, joten jokaisella media-kohteella on oltava **suora linkki** (ei upotettuja soittimia tai sivuohjauksia).

| Tyyppi | Hyväksytyt muodot |
|--------|-------------------|
| Video | **MP4** (vaaditaan alustojen väliseen toistoon Apple- ja Android-laitteilla) |
| Kuva | JPG, PNG tai GIF |

## Huomautuksia

- **JSON-palauttava REST API** on tyypillinen integraatiomalli, mutta koska kirjoitamme jokaiselle tarjoajalle oman sovittimen, voimme toimia lähes minkä tahansa API-muodon kanssa.
- Jos olet kiinnostunut tulemaan FreePlay-sisällöntarjoajaksi, ota yhteyttä [Slackissa](https://join.slack.com/t/livechurchsolutions/shared_invite/zt-i88etpo5-ZZhYsQwQLVclW12DKtVflg) tai avaa ongelma [GitHubissa](https://github.com/ChurchApps/ChurchAppsSupport/issues).
