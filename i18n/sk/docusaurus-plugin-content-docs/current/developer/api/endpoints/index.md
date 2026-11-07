---
title: "Referencia koncových bodov"
description: "Nájdite každý koncový bod API ChurchApps podľa modulu, pozrite si HTTP metódu, cestu, autentifikáciu a oprávnenie pre každú trasu a naučte sa konvencie dávkového ukladania a chýb pred volaním API."
---

# Referencia koncových bodov

<div class="article-intro">

Táto sekcia dokumentuje všetky REST koncové body, ktoré sprístupňuje ChurchApps API. Každá stránka modulu uvádza všetky trasy s ich HTTP metódou, cestou, požiadavkami na autentifikáciu a potrebnými oprávneniami.

</div>

## Základná URL

| Prostredie | URL |
|-------------|-----|
| Lokálny vývoj | `http://localhost:8084` |
| Produkcia | `https://api.churchapps.org` |

## Konvencie požiadaviek

- **Content-Type:** Všetky telá požiadaviek a odpovedí používajú `application/json`
- **Viacnájomcovosť (multi-tenant):** Každá autentifikovaná požiadavka je viazaná na `churchId` extrahované z JWT tokenu — `churchId` do URL neposielate
- **Hromadné ukladanie:** Väčšina `POST` koncových bodov prijíma **pole objektov**. API v jedinom volaní vloží nové záznamy (bez poľa `id`) a aktualizuje existujúce (s poľom `id`)
- **ID:** Všetky ID entít sú UUID

### Príklad: hromadné uloženie

```json
POST /membership/people
Authorization: Bearer <token>

[
  { "firstName": "Jane", "lastName": "Doe" },
  { "id": "abc-123", "firstName": "John", "lastName": "Smith" }
]
```

Prvý objekt sa vytvorí (je nový); druhý sa aktualizuje (má `id`).

## Formát odpovede

Úspešné odpovede vracajú JSON — buď jeden objekt, alebo pole. Chybové odpovede používajú štandardné HTTP stavové kódy:

| Kód | Význam |
|------|---------|
| `200` | Úspech |
| `400` | Chybná požiadavka (chyby validácie) |
| `401` | Neautorizované (chýbajúci alebo neplatný token, alebo nedostatočné oprávnenia) |
| `404` | Nenájdené |
| `500` | Chyba servera |

Chyby validácie vracajú:

```json
{
  "errors": [
    { "msg": "enter a valid email address", "param": "email", "location": "body" }
  ]
}
```

## Ako čítať tabuľky koncových bodov

Každá stránka modulu organizuje koncové body podľa kontroléra. Tabuľky používajú tieto stĺpce:

| Stĺpec | Popis |
|--------|-------------|
| **Metóda** | HTTP metóda (`GET`, `POST`, `DELETE`) |
| **Cesta** | Cesta trasy relatívna k základnej ceste kontroléra |
| **Autentifikácia** | **JWT** = vyžaduje Bearer token, **Public** = nevyžaduje autentifikáciu |
| **Oprávnenie** | Požadované oprávnenie (napr. `People.Edit`). `—` znamená ľubovoľného autentifikovaného používateľa |
| **Popis** | Čo koncový bod robí |

Kontroléry, ktoré dedia zo štandardnej základnej triedy CRUD, poskytujú automaticky štyri koncové body: `GET /` (zoznam všetkých záznamov), `GET /:id` (získanie podľa ID), `POST /` (vytvorenie alebo aktualizácia) a `DELETE /:id` (vymazanie).

## Modul Reporting

Modul Reporting funguje inak ako ostatné moduly. Namiesto operácií CRUD nad databázou načítava definície reportov z JSON súborov na disku a vykonáva parametrizované SQL dotazy.

| Metóda | Cesta | Autentifikácia | Popis |
|--------|-------|------|-------------|
| GET | `/reporting/reports/:keyName` | JWT | Načíta definíciu reportu podľa kľúča |
| GET | `/reporting/reports/:keyName/run` | JWT | Spustí report a vráti výsledky |

Parametre reportu sa odovzdávajú ako hodnoty v reťazci dotazu (napr. `?startDate=2024-01-01&endDate=2024-12-31`). Parameter `churchId` sa automaticky vkladá z JWT tokenu. Každá definícia reportu môže určiť vlastné požiadavky na oprávnenia.

## Index modulov

| Modul | Základná cesta | Popis |
|--------|-----------|-------------|
| [Autentifikácia](./authentication.md) | `/membership/users`, `/membership/oauth` | Prihlásenie, registrácia, JWT tokeny, OAuth, oprávnenia |
| [Členstvo](./membership.md) | `/membership/*` | Ľudia, cirkvi, skupiny, domácnosti, roly, formuláre, nastavenia |
| [Účasť](./attendance.md) | `/attendance/*` | Kampusy, služby, relácie, návštevy, záznamy o prihlásení |
| [Obsah](./content.md) | `/content/*` | Stránky, kázne, udalosti, súbory, galérie, Biblia, streamovanie |
| [Dary](./giving.md) | `/giving/*` | Dary, fondy, platobné brány, predplatné |
| [Správy](./messaging.md) | `/messaging/*` | Konverzácie, oznámenia, zariadenia, SMS |
| [Doing](./doing.md) | `/doing/*` | Plány, úlohy, priradenia, automatizácie, plánovanie |
