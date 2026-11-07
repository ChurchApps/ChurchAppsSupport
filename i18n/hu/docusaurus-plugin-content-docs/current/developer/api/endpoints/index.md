---
title: "Végpontok referenciája"
---

# Végpontok referenciája

<div class="article-intro">

Ez a szakasz a ChurchApps API által elérhető összes REST-végpontot dokumentálja. Minden moduloldal felsorolja az összes útvonalat a HTTP-metódusával, elérési útjával, hitelesítési követelményeivel és a szükséges jogosultságokkal.

</div>

## Alap URL

| Környezet | URL |
|-------------|-----|
| Helyi fejlesztés | `http://localhost:8084` |
| Éles környezet | `https://api.churchapps.org` |

## Kérési konvenciók

- **Content-Type:** Minden kérés- és választörzs `application/json` formátumot használ
- **Többbérlős működés:** Minden hitelesített kérés a JWT-tokenből kinyert `churchId` értékhez kötődik — a `churchId`-t nem kell megadnia az URL-ben
- **Kötegelt mentés:** A legtöbb `POST` végpont **objektumtömböt** fogad el. Az API egyetlen hívással szúrja be az új rekordokat (`id` mező nélkül), és frissíti a meglévőket (`id` mezővel)
- **Azonosítók:** Minden entitás-azonosító UUID

### Példa: kötegelt mentés

```json
POST /membership/people
Authorization: Bearer <token>

[
  { "firstName": "Jane", "lastName": "Doe" },
  { "id": "abc-123", "firstName": "John", "lastName": "Smith" }
]
```

Az első objektum létrejön (új), a második frissül (van `id`-je).

## Válaszformátum

A sikeres válaszok JSON formátumban érkeznek — egyetlen objektumként vagy tömbként. A hibaválaszok a szabványos HTTP-állapotkódokat használják:

| Kód | Jelentés |
|------|---------|
| `200` | Sikeres |
| `400` | Hibás kérés (érvényesítési hibák) |
| `401` | Nincs jogosultság (hiányzó vagy érvénytelen token, vagy nincs elegendő jogosultság) |
| `404` | Nem található |
| `500` | Szerverhiba |

Az érvényesítési hibák a következőt adják vissza:

```json
{
  "errors": [
    { "msg": "enter a valid email address", "param": "email", "location": "body" }
  ]
}
```

## Hogyan olvassuk a végpontos táblázatokat

Minden moduloldal a végpontokat vezérlőnként csoportosítja. A táblázatok a következő oszlopokat használják:

| Oszlop | Leírás |
|--------|-------------|
| **Method** | HTTP-metódus (`GET`, `POST`, `DELETE`) |
| **Path** | Útvonal a vezérlő alap elérési útjához viszonyítva |
| **Auth** | **JWT** = Bearer-tokent igényel, **Public** = nem igényel hitelesítést |
| **Permission** | A szükséges jogosultság (pl. `People.Edit`). A `—` jelentése: bármely hitelesített felhasználó |
| **Description** | A végpont funkciója |

A szabványos CRUD-alaposztályból öröklő vezérlők automatikusan négy végpontot biztosítanak: `GET /` (összes listázása), `GET /:id` (lekérés azonosító alapján), `POST /` (létrehozás/frissítés) és `DELETE /:id` (törlés).

## Jelentésmodul

A Jelentésmodul másként működik, mint a többi modul. Adatbázis-alapú CRUD helyett a jelentésdefiníciókat a lemezen lévő JSON-fájlokból tölti be, és paraméterezett SQL-lekérdezéseket hajt végre.

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/reporting/reports/:keyName` | JWT | Jelentésdefiníció betöltése kulcsnév alapján |
| GET | `/reporting/reports/:keyName/run` | JWT | Jelentés futtatása és az eredmények visszaadása |

A jelentés paramétereit lekérdezési karakterlánc értékeiként adja át (pl. `?startDate=2024-01-01&endDate=2024-12-31`). A `churchId` paramétert a rendszer automatikusan a JWT-tokenből illeszti be. Minden jelentésdefiníció megadhatja a saját jogosultsági követelményeit.

## Modulmutató

| Modul | Alap elérési út | Leírás |
|--------|-----------|-------------|
| [Hitelesítés](./authentication) | `/membership/users`, `/membership/oauth` | Bejelentkezés, regisztráció, JWT-tokenek, OAuth, jogosultságok |
| [Tagság](./membership) | `/membership/*` | Személyek, egyházak, csoportok, háztartások, szerepkörök, űrlapok, beállítások |
| [Részvétel](./attendance) | `/attendance/*` | Telephelyek, istentiszteletek, alkalmak, látogatások, bejelentkezési rekordok |
| [Tartalom](./content) | `/content/*` | Oldalak, prédikációk, események, fájlok, galériák, Biblia, streaming |
| [Adakozás](./giving) | `/giving/*` | Adományok, alapok, fizetési átjárók, előfizetések |
| [Üzenetküldés](./messaging) | `/messaging/*` | Beszélgetések, értesítések, eszközök, SMS |
| [Teendők](./doing) | `/doing/*` | Tervek, feladatok, kiosztások, automatizálások, ütemezés |
