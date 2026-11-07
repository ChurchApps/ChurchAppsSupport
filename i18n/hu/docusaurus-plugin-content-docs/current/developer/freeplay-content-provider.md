---
title: "FreePlay tartalomszolgáltató"
description: "Mit kell biztosítania egy tartalomszolgáltatónak a FreePlay-hez: logó, bejelentkezési mód, katalógus- és lejátszólista-végpontok, valamint médiaformátumok."
---

# FreePlay tartalomszolgáltató

<div class="article-intro">

A FreePlay a ChurchApps médialejátszója, amellyel telefonokon, táblagépeken és TV-kön lehet streamelni leckéket és más videós tartalmakat. Ha van leckekönyvtárad, és szeretnéd elérhetővé tenni a FreePlayben, ez az útmutató mindent tartalmaz, amire szükséged lehet.

</div>

## Arculat

Mielőtt az integráció elkezdődhetne, a következőkre van szükségünk:

- **Logó** -- Logókép **16:9** képarányban (a FreePlay felületén a szolgáltatókártyákhoz használjuk)
- **Márkanév** -- A szervezeted neve, ahogyan a FreePlayben megjelenjen

## API végpontok

A FreePlay egy kisebb REST-végpontkészleten keresztül kommunikál a szolgáltatásoddal. Minden szolgáltatóhoz egyedi adaptert írunk, ezért a pontos URL-struktúra rugalmas, de az alábbi információkra szükségünk van.

### Hitelesítés

Válaszd ki a tartalmadnak megfelelő modellt:

| Modell | Mikor használd | Amire szükségünk van |
|--------|----------------|----------------------|
| **Nincs** | Nyilvános tartalom, nincs bejelentkezés | Semmi -- a katalógusvégpontjaidat közvetlenül hívjuk |
| **OAuth (PKCE)** | Web- és mobilbejelentkezés | Engedélyezési URL, tokencsere-végpont, kliensazonosító, hatókörök |
| **Eszközfolyamat (Device Flow)** | Előnyben részesített TV-alkalmazásoknál (a felhasználó a telefonján ad meg egy rövid kódot) | Eszközengedélyezési végpont, tokenlekérdező végpont, kliensazonosító |

:::tip
Ha a tartalmad hitelesítést igényel, az auth-végpont egy **felhasználói tokent** ad vissza, amelyet a FreePlay a böngészési és lecke-végpontoknak továbbít a hozzáférés engedélyezéséhez.
:::

### Böngészés / Katalógus

Egy végpont (vagy végpontok halmaza), amely az összes elérhető lecke **mappafáját** adja vissza.

- Ez lehet **egyetlen hívás**, amely a teljes fát visszaadja, vagy **több hívás**, ahol mindegyik egy szintet ad vissza, ahogy a felhasználó egyre mélyebbre navigál.
- A fa minden elemének tartalmaznia kell:

| Mező | Kötelező | Leírás |
|------|----------|--------|
| `id` | Igen | A mappa egyedi azonosítója |
| `name` | Igen | A mappa megjelenítendő neve |
| `thumbnail` | Ajánlott | Egy **16:9** bélyegkép URL-je |

### Lecke lejátszási lista

Egy végpont, amely egyetlen lecke **médiafájljainak lejátszási listáját** adja vissza.

A lejátszási lista minden elemének tartalmaznia kell:

| Mező | Kötelező | Leírás |
|------|----------|--------|
| `title` | Igen | A médiaelem megjelenítendő címe |
| `mediaType` | Igen | `video` vagy `image` |
| `url` | Igen | Közvetlen letöltési hivatkozás a fájlhoz (lásd lent: [Médiaformátumok](#media-formats)) |
| `thumbnail` | Ajánlott | Az elemhez tartozó bélyegkép |
| `duration` | Ajánlott | Hossz másodpercben (videóknál) |

## Médiaformátumok

A FreePlay közvetlenül tölti le a fájlokat, ezért minden médiaelemnek **közvetlen hivatkozással** kell rendelkeznie (beágyazott lejátszók vagy oldalátirányítások nélkül).

| Típus | Elfogadott formátumok |
|-------|----------------------|
| Videó | **MP4** (Apple- és Android-eszközökön történő platformfüggetlen lejátszáshoz szükséges) |
| Kép | JPG, PNG vagy GIF |

## Megjegyzések

- A **JSON-t visszaadó REST API** a tipikus integrációs minta, de mivel minden szolgáltatóhoz egyedi adaptert írunk, szinte bármilyen API-formátummal tudunk dolgozni.
- Ha érdekel, hogy FreePlay-tartalomszolgáltató legyél, keress meg minket a [Slacken](https://join.slack.com/t/livechurchsolutions/shared_invite/zt-i88etpo5-ZZhYsQwQLVclW12DKtVflg), vagy nyiss egy hibajegyet (issue-t) a [GitHubon](https://github.com/ChurchApps/ChurchAppsSupport/issues).
