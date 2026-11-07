---
title: "Päätepisteiden viite"
description: "Löydä jokainen ChurchApps-API-päätepiste moduulin mukaan, näe kunkin reitin HTTP-metodi, polku, todennus ja käyttöoikeus sekä opi erätallennuksen ja virhekäytännöt ennen API:n kutsumista."
---

# Päätepisteiden viite

<div class="article-intro">

Tämä osio kuvaa kaikki ChurchApps API:n tarjoamat REST-päätepisteet. Jokainen moduulisivu luettelee kaikki reitit HTTP-metodeineen, polkuineen, todennusvaatimuksineen ja vaadittuine oikeuksineen.

</div>

## Perus-URL

| Ympäristö | URL |
|-----------|-----|
| Paikallinen kehitys | `http://localhost:8084` |
| Tuotanto | `https://api.churchapps.org` |

## Pyyntöjen käytännöt

- **Content-Type:** Kaikki pyyntö- ja vastausrungot käyttävät muotoa `application/json`
- **Monivuokraus:** Jokainen todennettu pyyntö rajataan JWT-tokenista poimittuun `churchId`-arvoon. `churchId`-arvoa ei välitetä URL-osoitteessa
- **Erätallennus:** Useimmat `POST`-päätepisteet hyväksyvät **olioiden taulukon**. API lisää uudet tietueet (ilman `id`-kenttää) ja päivittää olemassa olevat (joissa on `id`-kenttä) yhdellä kutsulla
- **Tunnisteet:** Kaikki kohdetunnisteet ovat UUID-muotoisia

### Esimerkki: Erätallennus

```json
POST /membership/people
Authorization: Bearer <token>

[
  { "firstName": "Jane", "lastName": "Doe" },
  { "id": "abc-123", "firstName": "John", "lastName": "Smith" }
]
```

Ensimmäinen olio luodaan (uusi); toinen päivitetään (siinä on `id`).

## Vastausmuoto

Onnistuneet vastaukset palauttavat JSON-muotoista dataa, joko yksittäisen olion tai taulukon. Virhevastaukset käyttävät HTTP-standardin tilakoodeja:

| Koodi | Merkitys |
|-------|----------|
| `200` | Onnistui |
| `400` | Virheellinen pyyntö (validointivirheet) |
| `401` | Ei valtuuksia (token puuttuu tai on virheellinen, tai oikeudet eivät riitä) |
| `404` | Ei löytynyt |
| `500` | Palvelinvirhe |

Validointivirheet palauttavat:

```json
{
  "errors": [
    { "msg": "enter a valid email address", "param": "email", "location": "body" }
  ]
}
```

## Päätepistetaulukoiden lukeminen

Jokaisella moduulisivulla päätepisteet on järjestetty ohjaimen mukaan. Taulukoissa on seuraavat sarakkeet:

| Sarake | Kuvaus |
|--------|--------|
| **Metodi** | HTTP-metodi (`GET`, `POST`, `DELETE`) |
| **Polku** | Reitti suhteessa ohjaimen perusreittiin |
| **Todennus** | **JWT** = vaatii Bearer-tokenin, **Public** = ei todennusta |
| **Oikeus** | Vaadittu oikeus (esim. `People.Edit`). `—` tarkoittaa, että mikä tahansa todennettu käyttäjä voi käyttää päätepistettä |
| **Kuvaus** | Mitä päätepiste tekee |

Ohjaimet, jotka perivät vakiomuotoisen CRUD-kantaluokan, tarjoavat automaattisesti neljä päätepistettä: `GET /` (listaa kaikki), `GET /:id` (hae tunnisteen perusteella), `POST /` (luo tai päivitä) ja `DELETE /:id` (poista).

## Raportointimoduuli

Raportointimoduuli toimii eri tavalla kuin muut moduulit. Tietokantapohjaisen CRUD-toiminnon sijaan se lataa raporttimääritykset levyllä olevista JSON-tiedostoista ja suorittaa parametroituja SQL-kyselyitä.

| Metodi | Polku | Todennus | Kuvaus |
|--------|-------|----------|--------|
| GET | `/reporting/reports/:keyName` | JWT | Lataa raporttimääritys avaimen nimen perusteella |
| GET | `/reporting/reports/:keyName/run` | JWT | Suorita raportti ja palauta tulokset |

Raportin parametrit välitetään kyselymerkkijonon arvoina (esim. `?startDate=2024-01-01&endDate=2024-12-31`). `churchId`-parametri lisätään automaattisesti JWT-tokenista. Jokainen raporttimääritys voi määrittää omat oikeusvaatimuksensa.

## Moduulihakemisto

| Moduuli | Perusreitti | Kuvaus |
|---------|-------------|--------|
| [Authentication](./authentication.md) | `/membership/users`, `/membership/oauth` | Kirjautuminen, rekisteröityminen, JWT-tokenit, OAuth, oikeudet |
| [Membership](./membership.md) | `/membership/*` | Henkilöt, seurakunnat, ryhmät, taloudet, roolit, lomakkeet, asetukset |
| [Attendance](./attendance.md) | `/attendance/*` | Kampukset, palvelut, istunnot, vierailut, sisäänkirjautumistiedot |
| [Content](./content.md) | `/content/*` | Sivut, saarnat, tapahtumat, tiedostot, galleriat, Raamattu, suoratoisto |
| [Giving](./giving.md) | `/giving/*` | Lahjoitukset, rahastot, maksuyhdyskäytävät, tilaukset |
| [Messaging](./messaging.md) | `/messaging/*` | Keskustelut, ilmoitukset, laitteet, tekstiviestit |
| [Doing](./doing.md) | `/doing/*` | Suunnitelmat, tehtävät, tehtävänjaot, automaatiot, aikataulutus |
