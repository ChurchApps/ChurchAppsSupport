---
title: "Referenca končnih točk"
description: "Poiščite končne točke API-ja ChurchApps po modulih z metodo, potjo, avtentikacijo in dovoljenji ter spoznajte konvencije za shranjevanje in napake."
---

# Referenca končnih točk

<div class="article-intro">

Ta razdelek dokumentira vse REST končne točke, ki jih izpostavlja API ChurchApps. Vsaka stran modula navaja vse poti z njihovo metodo HTTP, potjo, zahtevami za overjanje in potrebnimi dovoljenji.

</div>

## Osnovni URL

| Okolje | URL |
|--------|-----|
| Lokalni razvoj | `http://localhost:8084` |
| Produkcija | `https://api.churchapps.org` |

## Konvencije zahtev

- **Content-Type:** Vse zahteve in odzivi uporabljajo `application/json`
- **Več najemnikov:** Vsaka overjena zahteva je omejena na `churchId`, pridobljen iz žetona JWT – `churchId` ne posredujete v URL-ju
- **Serijsko shranjevanje:** Večina končnih točk `POST` sprejme **polje objektov**. API v enem klicu vstavi nove zapise (brez polja `id`) in posodobi obstoječe (s poljem `id`)
- **ID-ji:** Vsi ID-ji entitet so UUID-ji

### Primer: serijsko shranjevanje

```json
POST /membership/people
Authorization: Bearer <token>

[
  { "firstName": "Jane", "lastName": "Doe" },
  { "id": "abc-123", "firstName": "John", "lastName": "Smith" }
]
```

Prvi objekt se ustvari (nov); drugi se posodobi (ima `id`).

## Format odziva

Uspešni odzivi vrnejo JSON – bodisi en objekt bodisi polje. Odzivi z napako uporabljajo standardne kode stanja HTTP:

| Koda | Pomen |
|------|-------|
| `200` | Uspeh |
| `400` | Neveljavna zahteva (napake pri preverjanju) |
| `401` | Neodobreno (manjkajoč ali neveljaven žeton ali nezadostna dovoljenja) |
| `404` | Ni najdeno |
| `500` | Napaka strežnika |

Napake pri preverjanju vrnejo:

```json
{
  "errors": [
    { "msg": "enter a valid email address", "param": "email", "location": "body" }
  ]
}
```

## Kako brati tabele končnih točk

Vsaka stran modula razvršča končne točke po krmilniku. Tabele uporabljajo te stolpce:

| Stolpec | Opis |
|---------|------|
| **Method** | Metoda HTTP (`GET`, `POST`, `DELETE`) |
| **Path** | Pot glede na osnovno pot krmilnika |
| **Auth** | **JWT** = zahteva žeton Bearer, **Public** = overjanje ni potrebno |
| **Permission** | Zahtevano dovoljenje (npr. `People.Edit`). `—` pomeni katerikoli overjen uporabnik |
| **Description** | Kaj končna točka počne |

Krmilniki, ki razširjajo standardni osnovni razred CRUD, samodejno zagotovijo štiri končne točke: `GET /` (seznam vseh), `GET /:id` (pridobi po ID-ju), `POST /` (ustvari/posodobi) in `DELETE /:id` (izbriše).

## Modul za poročila

Modul za poročila deluje drugače kot ostali moduli. Namesto CRUD operacij, podprtih z bazo podatkov, naloži definicije poročil iz datotek JSON na disku in izvaja parametrizirane poizvedbe SQL.

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/reporting/reports/:keyName` | JWT | Naloži definicijo poročila po ključnem imenu |
| GET | `/reporting/reports/:keyName/run` | JWT | Izvede poročilo in vrne rezultate |

Parametri poročila se posredujejo kot vrednosti niza poizvedbe (npr. `?startDate=2024-01-01&endDate=2024-12-31`). Parameter `churchId` se samodejno vnese iz žetona JWT. Vsaka definicija poročila lahko določi svoje zahteve glede dovoljenj.

## Kazalo modulov

| Modul | Osnovna pot | Opis |
|-------|-------------|------|
| [Authentication](./authentication.md) | `/membership/users`, `/membership/oauth` | Prijava, registracija, žetoni JWT, OAuth, dovoljenja |
| [Membership](./membership.md) | `/membership/*` | Osebe, cerkve, skupine, gospodinjstva, vloge, obrazci, nastavitve |
| [Attendance](./attendance.md) | `/attendance/*` | Kampusi, bogoslužja, seje, obiski, zapisi prijav |
| [Content](./content.md) | `/content/*` | Strani, pridige, dogodki, datoteke, galerije, Biblija, pretakanje |
| [Giving](./giving.md) | `/giving/*` | Donacije, skladi, plačilni prehodi, naročnine |
| [Messaging](./messaging.md) | `/messaging/*` | Pogovori, obvestila, naprave, SMS |
| [Doing](./doing.md) | `/doing/*` | Načrti, naloge, dodelitve, avtomatizacije, načrtovanje |
