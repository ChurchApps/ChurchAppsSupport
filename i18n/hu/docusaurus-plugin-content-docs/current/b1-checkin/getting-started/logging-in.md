---
title: "Bejelentkezés a B1 Church Checkinbe"
sidebar_label: "Bejelentkezés"
description: "Bejelentkezés a B1 Church Checkin kioszk alkalmazásba, egyház kiválasztása, automatikus bejelentkezés, adminbeállítások és kijelentkezés a táblagépen."
---

# Bejelentkezés

<div class="article-intro">

Mielőtt a kioszkot a bejelentkezéshez használhatja, be kell jelentkeznie egy olyan ChurchApps-fiókkal, amelynek van hozzáférése a gyülekezetéhez. Ez az oldal az első bejelentkezés folyamatát, a gyülekezet kiválasztását, az automatikus bejelentkezés működését és a kijelentkezés módját ismerteti.

</div>

<div class="prereqs">
<h4>Mielőtt elkezdi</h4>

- Telepítse a B1 Church Checkin alkalmazást Android-táblagépére (lásd: [Első lépések](./index.md))
- Készítse elő a ChurchApps-fiókjához tartozó e-mail-címet és jelszót
- A fióknak rendelkeznie kell a **Checkin** (vagy **Részvétel szerkesztése**) jogosultsággal a gyülekezetében. Ezt egy adminisztrátor adja hozzá a B1 Adminban a **Beállítások > Szerepkörök** menüpontban — lásd: [Bejelentkező kioszk fiókok](../../b1-admin/settings/roles-permissions.md#check-in-kiosk-accounts)

</div>

## Első bejelentkezés

1. Nyissa meg a B1 Church Checkin alkalmazást. Az indítóképernyő után megjelenik a bejelentkező képernyő a B1 Church Checkin logójával.
2. Írja be **e-mail-címét** az első mezőbe.
3. Írja be **jelszavát** a második mezőbe.
4. Koppintson a **Bejelentkezés** gombra.

Az alkalmazás ellenőrzi a hitelesítő adatait, és bejelentkezteti Önt. Ha az e-mail-cím vagy a jelszó hibás, a képernyő alján hibaüzenet jelenik meg.

Ha a fiókhoz [kétlépcsős bejelentkezés](../../b1-admin/profile/managing-profile.md#two-factor-sign-in) van bekapcsolva, az alkalmazás ezután egy kódot kér. Írja be a fiók tulajdonosának hitelesítő alkalmazásából származó 6 jegyű kódot vagy egyik biztonsági kódját, majd ismét koppintson a **Bejelentkezés** gombra. A kódra csak az első bejelentkezéskor van szükség; ezt követően a kioszk bejelentkezve marad.

:::info
Ez ugyanaz az e-mail-cím és jelszó, amelyet a B1 Adminhoz vagy bármely más ChurchApps-termékhez használ. A bejelentkező kioszkhoz nincs szükség külön fiókra.
:::

## A gyülekezet kiválasztása

Sikeres bejelentkezés után az alkalmazás betölti azokat a gyülekezeteket, ahol a fiókjának van **Checkin** vagy **Részvétel szerkesztése** jogosultsága. Azok a gyülekezetek, ahol csak más jogosultsága van, kimaradnak. Ha nem marad egy sem, az alkalmazás a **Nincs bejelentkezési hozzáférés** üzenetet jeleníti meg, és kéri, hogy a gyülekezet adminisztrátora adja hozzá a Checkin jogosultságot az egyik szerepkörhöz. Minden gyülekezet egy kártyaként jelenik meg, amely a gyülekezet nevét és logóját mutatja (ha ezt a B1 Adminban beállították).

- Ha a fiókja **csak egy gyülekezethez** kapcsolódik, akkor is megjelenik a kiválasztó képernyő. A folytatáshoz koppintson a gyülekezetére.
- Ha a fiókja **több gyülekezethez** kapcsolódik, koppintson arra a gyülekezetre, amelyet ez a kioszk ki fog szolgálni.

Miután kiválasztott egy gyülekezetet, az alkalmazás betölti annak arculati és megjelenési beállításait. A gyülekezet logója ezután minden további képernyő fejlécében megjelenik.

## Automatikus bejelentkezés visszatérő használatkor

Az első sikeres bejelentkezés után az alkalmazás egy biztonságos bejelentkezési tokent és a kiválasztott gyülekezetet tárolja a táblagépen. A jelszót nem tárolja. A következő indításkor:

- Az alkalmazás a mentett tokennel automatikusan bejelentkezteti Önt.
- Ha korábban már kiválasztott egy gyülekezetet, visszaállítja ezt a választást, és közvetlenül a **szolgálatok képernyőjére** viszi.
- Ha a mentett bejelentkezés már nem érvényes, az alkalmazás visszatér a bejelentkező képernyőre, hogy újra be tudjon jelentkezni.

:::tip
Mivel a kioszk automatikusan bejelentkezik, a hitelesítő adatokat csak a kezdeti beállításkor kell megadnia. Ezt követően a táblagép bekapcsolható, és azonnal használatra kész lesz.
:::

## Adminisztrátori beállítások

Az adminisztrátori beállítások szándékosan rejtve vannak, hogy a kioszkot használó gyülekezeti tagok véletlenül se módosíthassák a konfigurációt. A megnyitásukhoz:

1. Koppintson a **gyülekezet logójára** a fejlécben, **hétszer** egymás után gyorsan (két másodpercen belül).
2. Ha van beállítva kioszk PIN-kód, a kérésre adja meg a PIN-kódot.
3. Megnyílik az **Adminisztrátori beállítások** képernyő a következő lehetőségekkel:
   - **Szolgálat módosítása** — a kiválasztott szolgálati időpont megváltoztatása
   - **Nyomtató módosítása** — megnyitja a [nyomtatóbeállításokat](./printer-setup.md), ahol nyomtatót kereshet és választhat
   - **PIN-kód beállítása/módosítása** — az adminisztrátori hozzáférést védő kioszk PIN-kód beállítása vagy frissítése
   - **Kijelentkezés** — kijelentkezés és visszatérés a bejelentkező képernyőre

:::warning
A kijelentkezés törli az összes mentett hitelesítő adatot és a gyülekezet-kiválasztást. A kioszk újbóli használatához újra meg kell adnia e-mail-címét és jelszavát. Csak akkor jelentkezzen ki, ha fiókot kell váltania vagy újra kell konfigurálnia a kioszkot.
:::

## Következő lépések

Miután bejelentkezett, [nyomtatót állíthat be](./printer-setup.md), vagy közvetlenül a [bejelentkezési folyamathoz](../check-in/index.md) léphet.
