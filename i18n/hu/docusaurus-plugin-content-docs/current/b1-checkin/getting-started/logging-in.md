---
title: "B1 Church Checkin'e Bejelentkezés"
sidebar_label: "Bejelentkezés"
description: "Jelentkezzen be a B1 Church Checkin kioszk alkalmazásba, válassza ki a gyülekezetét, és ismerje meg az automatikus bejelentkezést, az adminisztrátori beállításokat és a kijelentkezést a bejelentkező táblagépen."
---

# Bejelentkezés

<div class="article-intro">

Mielőtt a kioszkot a bejelentkezéshez használhatná, be kell jelentkeznie egy olyan ChurchApps-fiókkal, amelynek hozzáférése van a gyülekezetéhez. Ez az oldal az első bejelentkezés folyamatát, a gyülekezet kiválasztását, az automatikus bejelentkezés működését és a kijelentkezés módját ismerteti.

</div>

<div class="prereqs">
<h4>Mielőtt elkezdi</h4>

- Telepítse a B1 Church Checkin alkalmazást Android táblagépére (lásd: [Első lépések](./index.md))
- Készítse elő a ChurchApps-fiókjának e-mail-címét és jelszavát
- A fióknak rendelkeznie kell a **Checkin** (vagy **Edit Attendance**) jogosultsággal a gyülekezetében. Ezt a gyülekezet adminisztrátora adja hozzá a B1 Adminban a **Beállítások > Szerepkörök** menüpontban — lásd: [Bejelentkező kioszk fiókok](../../b1-admin/settings/roles-permissions.md#check-in-kiosk-accounts)

</div>

## Első bejelentkezés

1. Nyissa meg a B1 Church Checkin alkalmazást. A indítóképernyő után megjelenik a bejelentkező képernyő a B1 Church Checkin logóval.
2. Írja be **e-mail-címét** az első mezőbe.
3. Írja be **jelszavát** a második mezőbe.
4. Koppintson a **Bejelentkezés** gombra.

Az alkalmazás ellenőrzi a hitelesítő adatokat, és bejelentkezteti Önt. Ha az e-mail-cím vagy a jelszó hibás, a képernyő alján hibaüzenet jelenik meg.

Ha a fiókon be van kapcsolva a [kétlépcsős bejelentkezés](../../b1-admin/profile/managing-profile.md#two-factor-sign-in), az alkalmazás ezután kódot kér. Adja meg a fiók tulajdonosának hitelesítő alkalmazásában megjelenő 6 jegyű kódot vagy egy tartalék kódját, majd koppintson ismét a **Bejelentkezés** gombra. A kódra csak ennél az első bejelentkezésnél van szükség; ezután a kioszk bejelentkezve marad.

:::info
Ez ugyanaz az e-mail-cím és jelszó, amelyet a B1 Adminhoz vagy bármely más ChurchApps-termékhez használ. A bejelentkező kioszkhoz nincs szükség külön fiókra.
:::

## A gyülekezet kiválasztása

Sikeres bejelentkezés után az alkalmazás betölti azokat a gyülekezeteket, ahol fiókja rendelkezik a **Checkin** vagy **Edit Attendance** jogosultsággal. Azok a gyülekezetek, ahol csak más jogosultságai vannak, kimaradnak. Ha egyik sem marad, az alkalmazás a **Nincs bejelentkezési hozzáférés** üzenetet jeleníti meg, és arra kéri, hogy a gyülekezet adminisztrátora adja hozzá a Checkin jogosultságot valamelyik szerepköréhez. Minden gyülekezet egy kártyaként jelenik meg, amely a gyülekezet nevét és logóját mutatja (ha azt a B1 Adminban beállították).

- Ha fiókja **csak egy gyülekezethez** tartozik, akkor is megjelenik a kiválasztó képernyő. Koppintson a gyülekezetére a folytatáshoz.
- Ha fiókja **több gyülekezethez** tartozik, koppintson arra a gyülekezetre, amelyet ez a kioszk ki fog szolgálni.

Miután kiválasztotta a gyülekezetet, az alkalmazás betölti annak arculati és megjelenési beállításait. A gyülekezet logója ezután minden további képernyő fejlécében megjelenik.

## Automatikus bejelentkezés visszatérő használatkor

Az első sikeres bejelentkezés után az alkalmazás biztonságos bejelentkezési tokent és a kiválasztott gyülekezetet tárolja a táblagépen. A jelszavát nem tárolja. A későbbi indításoknál:

- Az alkalmazás a mentett tokennel automatikusan bejelentkezteti Önt.
- Ha korábban már kiválasztott gyülekezetet, visszaállítja a választását, és közvetlenül a **szolgálatok képernyőjére** viszi.
- Ha a mentett bejelentkezés már nem érvényes, az alkalmazás visszatér a bejelentkező képernyőre, hogy újra be tudjon jelentkezni.

:::tip
Mivel a kioszk automatikusan bejelentkezik, a hitelesítő adatokat csak a kezdeti beállításkor kell megadnia. Ezután a táblagépet csak be kell kapcsolni, és készen áll a használatra.
:::

## Adminisztrátori beállítások

Az adminisztrátori beállítások szándékosan rejtve maradnak, hogy a kioszkot használó gyülekezeti tagok véletlenül se módosíthassák a konfigurációt. Az eléréséhez:

1. Koppintson a fejlécben lévő **gyülekezeti logóra** gyorsan egymás után **hétszer** (két másodpercen belül).
2. Ha van beállítva kioszk PIN-kód, az előugró kérésre adja meg a PIN-kódot.
3. Megnyílik az **Adminisztrátori beállítások** képernyő a következő lehetőségekkel:
   - **Szolgálat módosítása** — a kiválasztott szolgálati időpont megváltoztatása
   - **Nyomtató módosítása** — a [nyomtatóbeállítások](./printer-setup.md) megnyitása a nyomtató keresésére és kiválasztására
   - **Adminisztrátori PIN beállítása** (vagy **Adminisztrátori PIN módosítása**, ha már be van állítva) — az adminisztrátori hozzáférést védő kioszk PIN-kód beállítása vagy frissítése
   - **Vészhelyzeti üzenet** — SMS küldése minden bejelentkezett háztartás gondviselőinek (lásd: [Vészhelyzeti üzenet](../check-in/checking-out.md#emergency-broadcast))
   - **Személyzettel működtetett állomás mód** — kapcsoló, amely a kijelentkezést, a hívórendszert, az újranyomtatást és a profilszerkesztést adja hozzá ehhez az állomáshoz (lásd: [Kijelentkezés](../check-in/checking-out.md))
   - **Kijelentkezés** — kijelentkezés és visszatérés a bejelentkező képernyőre

   A check-in folyamathoz a **Vissza a kioszkhoz** gombra koppintva térhet vissza.

:::warning
A kijelentkezés törli az összes mentett hitelesítő adatot és a gyülekezet kiválasztását. A kioszk újbóli használatához ismét meg kell adnia e-mail-címét és jelszavát. Csak akkor jelentkezzen ki, ha fiókot szeretne váltani, vagy újra be szeretné állítani a kioszkot.
:::

## Következő lépések

Miután bejelentkezett, [beállíthat nyomtatót](./printer-setup.md), vagy közvetlenül a [bejelentkezési folyamathoz](../check-in/index.md) léphet.
