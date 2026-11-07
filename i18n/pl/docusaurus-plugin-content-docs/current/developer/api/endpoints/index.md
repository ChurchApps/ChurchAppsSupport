---
title: "Referenca API krajnjih tačaka"
---

# Referenca API krajnjih tačaka

<div class="article-intro">

Ovaj odjeljak dokumentuje sve REST krajnje tačke koje izlaže ChurchApps API. Svaka stranica modula navodi sve rute sa njihovom HTTP metodom, putanjom, zahtjevima za autentifikaciju i potrebnim dozvolama.

</div>

## Osnovna URL adresa

| Okruženje | URL |
|-----------|-----|
| Lokalni razvoj | `http://localhost:8084` |
| Produkcija | `https://api.churchapps.org` |

## Konvencije zahtjeva

- **Content-Type:** Sva tijela zahtjeva i odgovora koriste `application/json`
- **Više zakupaca:** Svaki autentifikovani zahtjev vezan je za `churchId` izdvojen iz JWT tokena — `churchId` ne prosljeđujete u URL-u
- **Grupno čuvanje:** Većina `POST` krajnjih tačaka prihvata **niz objekata**. API će u jednom pozivu umetnuti nove zapise (bez polja `id`) i ažurirati postojeće (sa poljem `id`)
- **ID-jevi:** Svi ID-jevi entiteta su UUID

### Primjer: grupno čuvanje

```json
POST /membership/people
Authorization: Bearer <token>

[
  { "firstName": "Jane", "lastName": "Doe" },
  { "id": "abc-123", "firstName": "John", "lastName": "Smith" }
]
```

Prvi objekat se kreira (novi); drugi se ažurira (ima `id`).

## Format odgovora

Uspješni odgovori vraćaju JSON — bilo pojedinačni objekat ili niz. Odgovori o greškama koriste standardne HTTP statusne kodove:

| Kod | Značenje |
|-----|----------|
| `200` | Uspjeh |
| `400` | Neispravan zahtjev (greške validacije) |
| `401` | Neovlašten pristup (nedostaje ili nije važeći token, ili nedovoljne dozvole) |
| `404` | Nije pronađeno |
| `500` | Greška na serveru |

Greške validacije vraćaju:

```json
{
  "errors": [
    { "msg": "enter a valid email address", "param": "email", "location": "body" }
  ]
}
```

## Kako čitati tabele krajnjih tačaka

Svaka stranica modula organizuje krajnje tačke po kontroleru. Tabele koriste sljedeće kolone:

| Kolona | Opis |
|--------|------|
| **Method** | HTTP metoda (`GET`, `POST`, `DELETE`) |
| **Path** | Putanja rute u odnosu na osnovnu putanju kontrolera |
| **Auth** | **JWT** = zahtijeva Bearer token, **Public** = nije potrebna autentifikacija |
| **Permission** | Potrebna dozvola (npr. `People.Edit`). `—` znači da je dovoljan bilo koji autentifikovani korisnik |
| **Description** | Šta krajnja tačka radi |

Kontroleri koji nasljeđuju standardnu CRUD osnovnu klasu automatski pružaju četiri krajnje tačke: `GET /` (lista svih), `GET /:id` (dohvat po ID-ju), `POST /` (kreiranje/ažuriranje) i `DELETE /:id` (brisanje).

## Modul za izvještaje

Modul za izvještaje radi drugačije od ostalih modula. Umjesto CRUD operacija zasnovanih na bazi podataka, učitava definicije izvještaja iz JSON datoteka na disku i izvršava parametrizovane SQL upite.

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/reporting/reports/:keyName` | JWT | Učitava definiciju izvještaja po ključnom nazivu |
| GET | `/reporting/reports/:keyName/run` | JWT | Izvršava izvještaj i vraća rezultate |

Parametri izvještaja prosljeđuju se kao vrijednosti u query stringu (npr. `?startDate=2024-01-01&endDate=2024-12-31`). Parametar `churchId` automatski se dodaje iz JWT tokena. Svaka definicija izvještaja može navesti sopstvene zahtjeve za dozvole.

## Indeks modula

| Modul | Osnovna putanja | Opis |
|-------|-----------------|------|
| [Authentication](./authentication) | `/membership/users`, `/membership/oauth` | Prijava, registracija, JWT tokeni, OAuth, dozvole |
| [Membership](./membership) | `/membership/*` | Osobe, crkve, grupe, domaćinstva, uloge, obrasci, postavke |
| [Attendance](./attendance) | `/attendance/*` | Kampusi, službe, sesije, posjete, zapisi prijava |
| [Content](./content) | `/content/*` | Stranice, propovijedi, događaji, datoteke, galerije, Biblija, streaming |
| [Giving](./giving) | `/giving/*` | Donacije, fondovi, platni gateway-i, pretplate |
| [Messaging](./messaging) | `/messaging/*` | Razgovori, obavještenja, uređaji, SMS |
| [Doing](./doing) | `/doing/*` | Planovi, zadaci, zaduženja, automatizacije, raspoređivanje |
