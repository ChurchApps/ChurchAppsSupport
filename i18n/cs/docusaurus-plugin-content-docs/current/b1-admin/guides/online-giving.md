---
title: "Průvodce: Nastavení online darování"
description: "Nastavte online dary v B1 Admin: vytvořte fondy darů, připojte Stripe a přidejte na web B1.church stránku Darovat pro členy."
---

# Nastavení online darování

<div class="article-intro">

Projděte si vše, co potřebujete k přijímání online darů ve vašem sboru: od vytvoření darovacích fondů, přes propojení služby Stripe pro zpracování plateb, až po sdílení stránky pro dary se sborem. Jakmile budete hotovi, budou moci členové dávat online prostřednictvím vaší webové stránky a mobilní aplikace.

</div>

<div class="prereqs">
<h4>Než začnete</h4>

- Účet B1 Admin s přístupem správce – viz [Role a oprávnění](../people/roles-permissions.md)
- Účet Stripe (v případě potřeby si ho můžete zdarma vytvořit na [stripe.com](https://stripe.com))

</div>

## Krok 1: Vytvoření darovacích fondů

Fondy jsou kategorie, do kterých mohou dárci přispívat. Než budete moci přijímat dary, potřebujete alespoň jeden fond.

Podle návodu [Fondy](../donations/funds.md) nastavte své kategorie darování:

1. Vytvořte své nejčastější fondy (např. „Všeobecný fond“, „Stavební fond“, „Misie“)
2. Správně označte fondy, které jsou daňově uznatelné – ovlivní to roční výpisy darů

:::tip
Další fondy můžete přidat kdykoli. Začněte s nejběžnějšími kategoriemi darování.
:::

## Krok 2: Připojení služby Stripe

Stripe zajišťuje veškeré zpracování plateb. Svůj účet Stripe připojíte k aplikaci B1 Admin, aby dary směřovaly na váš bankovní účet.

Podle návodu [Nastavení online darování](../donations/online-giving-setup.md) připojte Stripe:

1. Přihlaste se do svého panelu Stripe a získejte Publishable Key (veřejný klíč) a Secret Key (tajný klíč)
2. V aplikaci B1 Admin přejděte do Nastavení a zadejte oba klíče

:::warning
Stripe zobrazí Secret Key pouze jednou. Před opuštěním panelu Stripe ho zkopírujte a uložte. Pokud ho ztratíte, budete muset vygenerovat nový.
:::

## Krok 3: Přidání stránky pro dary na váš web

Zpřístupněte darování přidáním stránky pro dary na svůj web B1.

Podle návodů [Nastavení online darování](../donations/online-giving-setup.md) a [Správa stránek](../website/managing-pages.md) proveďte následující:

1. Přidejte na web B1.church záložku „Darovat“
2. Adresa URL pro dary bude: `https://yoursubdomain.b1.church/donate`
3. Členové mohou dávat bez přihlášení (veřejná stránka), nebo se přihlásit a využít uložené platební metody a historii darů

## Krok 4: Provedení testovacího daru

Než o tom informujete sbor, ověřte, že vše funguje.

1. Proveďte malý testovací dar, abyste si ověřili, že celý postup funguje od začátku do konce
2. Zkontrolujte, že se dar zobrazuje v aplikaci B1 Admin v sekci Dary

:::tip
Pokud chcete ověřit postup bez skutečných plateb, nejprve použijte testovací režim služby Stripe. Než o tom informujete sbor, přepněte na živý režim.
:::

## Krok 5: Oznámení sboru

Informujte členy, že mohou dávat online.

1. Sdílejte adresu URL pro dary prostřednictvím webu, e-mailových newsletterů, sborových bulletinů a sociálních sítí
2. Členové mohou dávat také prostřednictvím [aplikace B1 Mobile](../../b1-mobile/giving/index.md) – funkce darování je její součástí

:::info
Členové, kteří se přihlásí, mohou ukládat platební metody, nastavovat pravidelné dary a prohlížet si historii darů. Funguje i anonymní darování – přihlášení není vyžadováno.
:::

## Krok 6: Průběžná správa

Udržujte záznamy o darech aktuální a během roku generujte přehledy.

1. [Importujte transakce Stripe](../donations/stripe-import.md) pravidelně (každý týden nebo každý měsíc), aby byly vaše záznamy aktuální
2. [Zobrazte přehledy darů](../donations/donation-reports.md), abyste sledovali trendy darování a součty podle fondů
3. [Vygenerujte roční výpisy darů](../donations/giving-statements.md) pro daňové účely vašich dárců

:::tip
Importujte transakce Stripe alespoň jednou za měsíc, aby vaše záznamy zůstaly aktuální. Kompletní postup na konci roku najdete v [Průvodci ročními přehledy](./year-end-reports.md).
:::

## Hotovo!

Váš sbor nyní přijímá online dary. Členové mohou dávat prostřednictvím vaší webové stránky, aplikace B1 Mobile nebo jakéhokoli zařízení s webovým prohlížečem. Všechny dary se automaticky zaznamenávají v aplikaci B1 Admin.

## Související články

- [Fondy](../donations/funds.md) – vytváření a správa kategorií darování
- [Dávky](../donations/batches.md) – seskupování darů do skupin
- [Zaznamenávání darů](../donations/recording-donations.md) – ruční zadávání hotovostních darů a darů šekem
- [Import Stripe](../donations/stripe-import.md) – načtení online transakcí do aplikace B1 Admin
- [Přehledy darů](../donations/donation-reports.md) – zobrazení trendů a součtů darování
- [Výpisy darů](../donations/giving-statements.md) – generování ročních daňových výpisů
- [Darování (web)](../../b1-church/giving/making-donations.md) – zkušenost členů s darováním na webu
- [Darování (mobil)](../../b1-mobile/giving/making-donations.md) – darování z mobilní aplikace
