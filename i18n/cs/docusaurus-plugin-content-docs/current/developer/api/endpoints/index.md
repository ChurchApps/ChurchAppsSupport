---
title: "Referenčník koncových bodů"
---

# Referenčník koncových bodů

<div class="article-intro">

Tato sekce dokumentuje všechny REST koncové body, které poskytuje API ChurchApps. Každá stránka modulu uvádí všechny trasy s jejich HTTP metodou, cestou, požadavky na autentizaci a požadovanými oprávněními.

</div>

## Základní URL

| Prostředí | URL |
|-----------|-----|
| Lokální vývoj | `http://localhost:8084` |
| Produkce | `https://api.churchapps.org` |

## Konvence požadavků

- **Content-Type:** Všechna těla požadavků a odpovědí používají `application/json`
- **Multi-tenant:** Každý autentizovaný požadavek je vázán na `churchId` extrahované z JWT tokenu — `churchId` neuvádíte v URL
- **Dávkové ukládání:** Většina `POST` koncových bodů přijímá **pole objektů**. API vloží nové záznamy (bez pole `id`) a aktualizuje existující (s polem `id`) v jediném volání
- **ID:** Všechna ID entit jsou UUID

### Příklad: Dávkové ukládání

```json
POST /membership/people
Authorization: Bearer <token>

[
  { "firstName": "Jane", "lastName": "Doe" },
  { "id": "abc-123", "firstName": "John", "lastName": "Smith" }
]
```

První objekt se vytvoří (nový); druhý se aktualizuje (má `id`).

## Formát odpovědi

Úspěšné odpovědi vracejí JSON — buď jeden objekt, nebo pole. Chybové odpovědi používají standardní HTTP stavové kódy:

| Kód | Význam |
|-----|--------|
| `200` | Úspěch |
| `400` | Neplatný požadavek (chyby validace) |
| `401` | Neautorizováno (chybějící/neplatný token nebo nedostatečná oprávnění) |
| `404` | Nenalezeno |
| `500` | Chyba serveru |

Chyby validace vracejí:

```json
{
  "errors": [
    { "msg": "enter a valid email address", "param": "email", "location": "body" }
  ]
}
```

## Jak číst tabulky koncových bodů

Každá stránka modulu uspořádává koncové body podle kontroleru. Tabulky používají tyto sloupce:

| Sloupec | Popis |
|---------|-------|
| **Method** | HTTP metoda (`GET`, `POST`, `DELETE`) |
| **Path** | Cesta trasy relativní k základní cestě kontroleru |
| **Auth** | **JWT** = vyžaduje Bearer token, **Public** = autentizace není vyžadována |
| **Permission** | Požadované oprávnění (např. `People.Edit`). `—` znamená libovolný autentizovaný uživatel |
| **Description** | Co koncový bod dělá |

Kontrolery, které dědí ze standardní CRUD základní třídy, poskytují čtyři koncové body automaticky: `GET /` (seznam všech), `GET /:id` (načtení podle ID), `POST /` (vytvoření/aktualizace) a `DELETE /:id` (smazání).

## Modul Reporting

Modul Reporting funguje jinak než ostatní moduly. Namísto CRUD operací nad databází načítá definice reportů z JSON souborů na disku a spouští parametrizované SQL dotazy.

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/reporting/reports/:keyName` | JWT | Načte definici reportu podle klíčového názvu |
| GET | `/reporting/reports/:keyName/run` | JWT | Spustí report a vrátí výsledky |

Parametry reportu se předávají jako hodnoty v query stringu (např. `?startDate=2024-01-01&endDate=2024-12-31`). Parametr `churchId` se automaticky vloží z JWT tokenu. Každá definice reportu může specifikovat vlastní požadavky na oprávnění.

## Přehled modulů

| Modul | Základní cesta | Popis |
|-------|----------------|-------|
| [Authentication](./authentication) | `/membership/users`, `/membership/oauth` | Přihlášení, registrace, JWT tokeny, OAuth, oprávnění |
| [Membership](./membership) | `/membership/*` | Lidé, sbory, skupiny, domácnosti, role, formuláře, nastavení |
| [Attendance](./attendance) | `/attendance/*` | Kampusy, bohoslužby, relace, návštěvy, záznamy o check-inu |
| [Content](./content) | `/content/*` | Stránky, kázání, události, soubory, galerie, Bible, streamování |
| [Giving](./giving) | `/giving/*` | Dary, fondy, platební brány, předplatná |
| [Messaging](./messaging) | `/messaging/*` | Konverzace, oznámení, zařízení, SMS |
| [Doing](./doing) | `/doing/*` | Plány, úkoly, přiřazení, automatizace, plánování |
