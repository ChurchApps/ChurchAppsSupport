---
title: "Přihlášení do B1 Church Checkin"
sidebar_label: "Přihlášení"
description: "Přihlaste se do kiosku B1 Church Checkin, vyberte církev a pochopte automatické přihlášení, nastavení správce a odhlášení na check-in tabletu."
---

# Přihlášení

<div class="article-intro">

Než bude možné kiosek použít pro odbavování, je potřeba se přihlásit účtem ChurchApps, který má přístup k vašemu sboru. Tato stránka popisuje první přihlášení, výběr sboru, chování automatického přihlášení a odhlášení.

</div>

<div class="prereqs">
<h4>Než začnete</h4>

- Nainstalujte aplikaci B1 Church Checkin na svůj tablet s Androidem (viz [Začínáme](./index.md))
- Připravte si e-mail a heslo k účtu ChurchApps
- Účet potřebuje oprávnění **Checkin** (nebo **Úprava účasti**) ve vašem sboru. Přidá ho správce v aplikaci B1 Admin v sekci **Nastavení > Role** — viz [Účty kiosku pro odbavování](../../b1-admin/settings/roles-permissions.md#check-in-kiosk-accounts)

</div>

## První přihlášení

1. Otevřete aplikaci B1 Church Checkin. Po úvodní obrazovce se zobrazí přihlašovací obrazovka s logem B1 Church Checkin.
2. Do prvního pole zadejte svou **e-mailovou adresu**.
3. Do druhého pole zadejte své **heslo**.
4. Klepněte na tlačítko **Přihlásit se**.

Aplikace ověří vaše přihlašovací údaje a přihlásí vás. Pokud je e-mail nebo heslo nesprávné, zobrazí se ve spodní části obrazovky chybová zpráva.

Pokud má účet zapnuté [dvoufázové přihlašování](../../b1-admin/profile/managing-profile.md#two-factor-sign-in), aplikace následně vyžádá kód. Zadejte 6místný kód z autentizační aplikace vlastníka účtu, nebo jeden z jeho záložních kódů, a znovu klepněte na **Přihlásit se**. Kód potřebujete jen při tomto prvním přihlášení; poté kiosek zůstane přihlášený.

:::info
Je to stejný e-mail a heslo, které používáte v aplikaci B1 Admin nebo v jiném produktu ChurchApps. Pro kiosek na odbavování nepotřebujete samostatný účet.
:::

## Výběr sboru

Po úspěšném přihlášení aplikace načte sbory, ve kterých má váš účet oprávnění **Checkin** nebo **Úprava účasti**. Sbory, ve kterých máte jen jiná oprávnění, se vynechají. Pokud žádný nezbyde, aplikace zobrazí **Žádný přístup k odbavování** a požádá vás, abyste nechali správce sboru přidat oprávnění Checkin k jedné z vašich rolí. Každý sbor se zobrazuje jako karta s názvem a logem sboru (pokud bylo v aplikaci B1 Admin nastaveno).

- Pokud je váš účet propojen **pouze s jedním sborem**, stále uvidíte obrazovku výběru. Klepnutím na svůj sbor pokračujte.
- Pokud je váš účet propojen **s více sbory**, klepněte na sbor, který má tento kiosek obsluhovat.

Jakmile vyberete sbor, aplikace načte jeho vzhled a nastavení. Logo vašeho sboru se pak zobrazí v záhlaví všech dalších obrazovek.

## Automatické přihlášení při dalších spuštěních

Po prvním úspěšném přihlášení si aplikace v tabletu uchová zabezpečený přihlašovací token a vybraný sbor. Heslo neukládá. Při dalších spuštěních:

- Aplikace vás přihlásí zpět pomocí uloženého tokenu.
- Pokud jste dříve vybrali sbor, obnoví tento výběr a přesune vás přímo na **obrazovku bohoslužeb**.
- Pokud uložené přihlášení již není platné, aplikace vás vrátí na přihlašovací obrazovku, abyste se mohli znovu přihlásit.

:::tip
Protože se kiosek přihlašuje automaticky, stačí zadat přihlašovací údaje jen jednou při počátečním nastavení. Poté je tablet po zapnutí připraven k použití.
:::

## Nastavení správce

Nastavení správce jsou záměrně skrytá, aby členové sboru používající kiosek nemohli náhodně změnit konfiguraci. Přístup k nim:

1. Klepněte **sedmkrát rychle za sebou** (do dvou sekund) na **logo sboru** v záhlaví.
2. Pokud je nastaven PIN kiosku, zadejte jej, když budete vyzváni.
3. Otevře se obrazovka **Nastavení správce** s těmito možnostmi:
   - **Změnit bohoslužbu** — přepnout vybraný čas bohoslužby
   - **Změnit tiskárnu** — otevřít [nastavení tiskárny](./printer-setup.md), kde vyhledáte a vyberete tiskárnu
   - **Nastavit/změnit PIN** — nastavit nebo upravit PIN kiosku, který chrání přístup správce
   - **Odhlásit se** — odhlásit se a vrátit na přihlašovací obrazovku

:::warning
Odhlášení vymaže všechny uložené přihlašovací údaje a výběr sboru. Pro opětovné použití kiosku budete muset znovu zadat e-mail a heslo. Odhlašujte se, jen když potřebujete přepnout účet nebo znovu nakonfigurovat kiosek.
:::

## Další kroky

Po přihlášení můžete [nastavit tiskárnu](./printer-setup.md) nebo přejít přímo na [postup odbavování](../check-in/index.md).
