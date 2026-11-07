---
title: "Egyéni domain"
description: "Saját domain, például www.yourchurch.org, mutasson a B1 webhelyére: DNS-rekordok beállítása a B1 Adminban, majd a domain hozzáadása a Beállításokban."
---

# Egyéni domain

<div class="article-intro">

Saját domainnevét (például **`www.yourchurch.org`**) hozzárendelheti a B1 webhelyéhez, így a látogatók az egyháza valódi webcímén érik el az oldalt, nem pedig az alapértelmezett yourchurch.b1.church címen.

</div>

## Oktatóvideó

<YouTube id="L5yaDusHts8" title="Egyéni domain csatlakoztatása a B1-ben" next="Élő közvetítés beállítása a B1-ben" nextUrl="/docs/b1-admin/sermons/live-streaming" />

## 1. lépés — Először állítsa be a DNS-rekordot

Mielőtt hozzáadná a domainjét a B1-ben, a domain-regisztrátoránál (GoDaddy, Namecheap, Cloudflare stb.) meg kell mutatnia a domaint a B1 szervereire.

Adja hozzá az egyik alábbi rekordot — a CNAME-t ajánljuk:

| Típus | Gazdagép | Érték |
|------|------|-------|
| CNAME | `www` | `proxy.b1.church` |
| A | `yourchurch.org` | `3.23.251.61` |

A `www` címhez a **CNAME** rekordot használja. Az **A rekordot** akkor használja, ha a regisztrátora nem támogatja a CNAME-t a gyökértartományon (www nélküli, úgynevezett apex domainen), vagy ha a gyökértartománynak is működnie kell.

A DNS-módosítások néhány perctől néhány óráig tarthatnak, mire érvénybe lépnek.

## 2. lépés — Adja hozzá a domaint a B1-ben

Miután a DNS a B1-re mutat:

1. Lépjen a **Beállítások** menüpontra a B1 Adminban.
2. A bal oldali listában kattintson a **Domainek** elemre, majd a **Domainek** szakaszban kattintson a **Szerkesztés** gombra.
3. Írja be a domaint a mezőbe, majd kattintson a **Mentés** gombra.

Nem kell először a **+** gombra kattintania — a mezőbe beírt domain mentéskor automatikusan hozzáadódik. A **+** gombot (vagy az **Enter** billentyűt) akkor használja, ha mentés előtt több domaint szeretne felvenni a listába.

A B1 automatikusan kezeli az SSL-tanúsítványt, így nem kell tanúsítványt vásárolnia.

:::warning
Ha a DNS-rekordok beállítása előtt adja hozzá a domaint a B1-ben, a mentés nem sikerül. Mindig előbb állítsa be a DNS-t.
:::

## Ellenőrzés, hogy működik-e

Mentés után nyissa meg a domaint böngészőben. Ha betöltődik a B1 webhelye, készen van. Ha hibaüzenetet lát, lehet, hogy a DNS-módosítás még terjed. Várjon néhány percet, majd próbálja újra.

A DNS-terjedést a [dnschecker.org](https://dnschecker.org) oldalon is ellenőrizheti. Keresse meg a domaint, és nézze meg, megjelenik-e a CNAME vagy az A rekordja.
