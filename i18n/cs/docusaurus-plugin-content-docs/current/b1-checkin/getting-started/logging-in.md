---
title: "Přihlášení do B1 Church Checkin"
sidebar_label: "Přihlášení"
description: "Přihlaste se do kiosku B1 Church Checkin, vyberte svůj sbor a seznamte se s automatickým přihlášením, administračním nastavením a odhlášením na tabletu pro odbavení."
---

# Přihlášení

<div class="article-intro">

Než lze kiosek použít k odbavování, musíte se přihlásit pomocí účtu ChurchApps, který má k vašemu sboru přístup. Tato stránka popisuje první přihlášení, výběr sboru, chování automatického přihlášení a způsob odhlášení.

</div>

<div class="prereqs">
<h4>Než začnete</h4>

- Nainstalujte aplikaci B1 Church Checkin na svůj tablet s Androidem (viz [Začínáme](./index.md))
- Připravte si e-mail a heslo k účtu ChurchApps
- Účet potřebuje oprávnění **Checkin** (nebo **Úprava docházky**) pro váš sbor. Přidá je správce v aplikaci B1 Admin v sekci **Nastavení > Role** — viz [Účty pro kiosky odbavování](../../b1-admin/settings/roles-permissions.md#check-in-kiosk-accounts)

</div>

## První přihlášení

1. Otevřete aplikaci B1 Church Checkin. Po úvodní obrazovce se zobrazí přihlašovací obrazovka s logem B1 Church Checkin.
2. Do prvního pole zadejte svou **e-mailovou adresu**.
3. Do druhého pole zadejte své **heslo**.
4. Klepněte na tlačítko **Přihlásit se**.

Aplikace ověří vaše přihlašovací údaje a přihlásí vás. Pokud je e-mail nebo heslo nesprávné, ve spodní části obrazovky se zobrazí chybová zpráva.

Pokud má účet zapnuté [dvoufázové přihlašování](../../b1-admin/profile/managing-profile.md#two-factor-sign-in), aplikace následně vyžádá kód. Zadejte 6místný kód z aplikace pro ověření vlastníka účtu nebo jeden z jeho záložních kódů a znovu klepněte na **Přihlásit se**. Kód potřebujete pouze při tomto prvním přihlášení; poté zůstane kiosek přihlášen.

:::info
Jde o stejný e-mail a heslo, které používáte pro B1 Admin nebo jakýkoli jiný produkt ChurchApps. Pro kiosek odbavování nepotřebujete samostatný účet.
:::

## Výběr sboru

Po úspěšném přihlášení aplikace načte sbory, u kterých má váš účet oprávnění **Checkin** nebo **Úprava docházky**. Sbory, kde máte pouze jiná oprávnění, se nezobrazí. Pokud žádný nezbyde, aplikace zobrazí hlášku **Nemáte přístup k odbavování** a požádá vás, abyste nechali správce sboru přidat oprávnění Checkin jedné z vašich rolí. Každý sbor je zobrazen jako karta s názvem sboru a logem (pokud bylo v aplikaci B1 Admin nastaveno).

- Pokud je váš účet propojen **pouze s jedním sborem**, výběrová obrazovka se i tak zobrazí. Pokračujte klepnutím na svůj sbor.
- Pokud je váš účet propojen **s více sbory**, klepněte na sbor, který má tento kiosek obsluhovat.

Jakmile vyberete sbor, aplikace načte jeho vzhled a nastavení zobrazení. Logo vašeho sboru se pak objeví v záhlaví na všech dalších obrazovkách.

## Automatické přihlášení při dalším použití

Po prvním úspěšném přihlášení si aplikace v tabletu uloží zabezpečený přihlašovací token a vybraný sbor. Heslo neukládá. Při dalším spuštění:

- Aplikace vás přihlásí pomocí uloženého tokenu.
- Pokud jste dříve vybrali sbor, obnoví tento výběr a přesune vás přímo na **obrazovku bohoslužeb**.
- Pokud uložené přihlášení už neplatí, aplikace vás vrátí na přihlašovací obrazovku, abyste se mohli znovu přihlásit.

:::tip
Protože se kiosek přihlašuje automaticky, stačí zadat přihlašovací údaje pouze jednou při počátečním nastavení. Poté lze tablet zapnout a je připraven k použití.
:::

## Administrační nastavení

Administrační nastavení jsou záměrně skrytá, aby členové sboru, kteří kiosek používají, nemohli omylem změnit konfiguraci. Otevřete je takto:

1. Klepněte na **logo sboru** v záhlaví **sedmkrát** za sebou rychle (do dvou sekund).
2. Pokud je nastaven PIN kiosku, zadejte jej, když budete vyzváni.
3. Otevře se obrazovka **Administrační nastavení** s těmito možnostmi:
   - **Změnit bohoslužbu** — přepnout vybraný čas bohoslužby
   - **Změnit tiskárnu** — otevřít [nastavení tiskárny](./printer-setup.md) a vyhledat a vybrat tiskárnu
   - **Nastavit administrační PIN** (nebo **Změnit administrační PIN**, jakmile je nastaven) — nastavit nebo upravit PIN kiosku, který chrání přístup k administraci
   - **Mimořádné hromadné oznámení** — poslat SMS zprávu opatrovníkům všech odbavených domácností (viz [Mimořádné hromadné oznámení](../check-in/checking-out.md#emergency-broadcast))
   - **Režim obsluhované stanice** — přepínač, který této stanici přidá odhlašování, vyvolávání, opětovný tisk a úpravy profilu (viz [Odhlašování](../check-in/checking-out.md))
   - **Odhlásit se** — odhlásit se a vrátit na přihlašovací obrazovku

   Pro návrat k odbavování klepněte na **Zpět do kiosku**.

:::warning
Odhlášení vymaže všechny uložené přihlašovací údaje a výběr sboru. Pro opětovné použití kiosku budete muset znovu zadat e-mail a heslo. Odhlašujte se pouze tehdy, když potřebujete přepnout účet nebo přenastavit kiosek.
:::

## Další kroky

Po přihlášení můžete [nastavit tiskárnu](./printer-setup.md) nebo přejít přímo na [postup odbavování](../check-in/index.md).
