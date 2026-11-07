---
title: "Zaznamenávání darů"
description: "Zaznamenejte dary v B1 Admin: vytvořte dávku a zadejte dary jednotlivě, importujte CSV nebo zapište jeden dar z profilu dárce."
---

# Zaznamenávání darů

<div class="article-intro">

Dary v B1 Admin zaznamenáváte pomocí systému dávek (Batches). Vytvoříte dávku, která představuje sbírku (například nedělní obětní dar), a potom do ní přidáváte jednotlivé dary. Díky tomu zůstávají záznamy o darech přehledné a snadno se srovnávají.

</div>

<div class="prereqs">
<h4>Než začnete</h4>

- Nastavte si [fondy](funds.md), abyste mohli dary přiřazovat ke správným kategoriím
- Vytvořte [dávku](batches.md), která bude obsahovat dary, které se chystáte zadat
- Ujistěte se, že dárci jsou v [adresáři osob](../people/adding-people.md), abyste je mohli při zadávání darů vyhledat
- K zadávání darů do dávky potřebujete oprávnění **Upravit dary**, nebo oprávnění **Zadávat dary** spolu s oprávněním **Zobrazit dary** (viz [Kdo může měnit dávku](batches.md#who-can-change-a-batch))

</div>

## Vytvoření dávky a přidání darů

1. V **B1 Admin** otevřete [nabídku Jump](../introduction.md#getting-around-with-the-jump-menu) (vyhledávací pole v levém horním rohu), rozbalte položku **Donations** a klikněte na **Batches**.
2. Nahoře na stránce klikněte na **Add Batch**.
3. Zadejte název dávky (například „Nedělní obětní dar – 5. ledna“) a vyberte datum. Klikněte na **Save**.
4. Nová dávka se objeví v seznamu a zobrazí nula darů a 0,00 $.
5. Kliknutím na **název dávky** ji otevřete.

## Zadávání jednotlivých darů

1. Na detailu dávky se vedle seznamu darů zobrazí panel pro zadávání darů. V části **Select Person or Anonymous** zadejte do vyhledávacího pole jméno dárce, nebo klikněte na **Anonymous**. (Kliknutí na **Add Donation** nahoře na stránce přesune zobrazení na tento panel.)
2. Po výběru osoby formulář zobrazí pole **Date**, **Method** (Check, Cash, Card nebo In-Kind), **Fund**, **Notes**, **Amount** a **Check #** (nebo **Last 4 digits** u darů platební kartou, případně **Item** pro popis věcného daru). Kliknutím na **Change** vedle jména dárce vyberete jinou osobu.
3. Vyplňte údaje a klikněte na **Add Donation** (nebo stiskněte Enter).
4. Dar se přidá do seznamu darů a formulář se vynuluje, takže můžete zadat další.

:::info
Pokud je dávka [uzavřena](batches.md#closing-and-reopening-a-batch), panel pro zadávání a odkazy **Edit** jsou skryté pro každého, kdo nemá oprávnění **Upravit dary**. Nahoře v dávce se zobrazí upozornění, že je uzavřena. Požádejte někoho s oprávněním **Upravit dary**, aby ji znovu otevřel.
:::

:::tip
Více darů za sebou můžete rychle zadat, aniž byste opustili stránku dávky. Formulář se po každém zápisu vynuluje, takže můžete efektivně projít balíček šeků nebo obálek.
:::

## Import darů ze souboru CSV {#importing-donations-from-a-csv-file}

Pokud už jsou vaše dary v tabulce, například jako export z jiného systému pro evidenci darů nebo jako tabulka sčítací skupiny, můžete je importovat do dávky místo ručního přepisování.

1. Otevřete dávku a nahoře na stránce klikněte na **Import CSV**. (Tlačítko se zobrazí, pokud můžete dávku měnit a váš sbor má alespoň jeden [fond](funds.md).)
2. Klikněte na **Choose CSV File** a vyberte soubor. Soubor musí obsahovat řádek se záhlavím a sloupce mohou být v libovolném pořadí:
   - **Amount** (povinné; funguje také `Total`) -- Měnové symboly a čárky se ignorují, takže `$1,250.00` je v pořádku. Částka musí být vyšší než nula.
   - **Date** -- Použijte formát jako `2026-10-25` nebo `10/25/2026`. Pokud je pole prázdné, použije se datum dávky.
   - **Fund** -- Název fondu, porovnávaný bez ohledu na velikost písmen. Pokud je pole prázdné, použije se váš první fond.
   - **Method** -- **Check**, **Cash**, **Card** nebo **In-Kind**. Pokud je pole prázdné, použije se **Check**.
   - **Check Number** -- Číslo šeku (nebo jiný údaj o platbě).
   - **Notes**
   - **Email**, **Name**, nebo **First Name** a **Last Name** -- Slouží k přiřazení dárce k osobě ve vaší databázi. Jméno zapsané jako „Smith, John“ se načte jako „John Smith“.
3. Zkontrolujte náhled. Každý řádek ukazuje své číslo, dárce ze souboru, položku **Match**, fond a částku:
   - Jméno osoby znamená, že dárce byl přiřazen. B1 nejprve hledá shodu podle e-mailu, potom podle přesného jména, a to pouze tehdy, když odpovídá přesně jedna osoba.
   - **Not found — anonymous** znamená, že nebyla nalezena jediná shoda. Dar se importuje jako anonymní a do jeho poznámek se přidá text „Imported as:“ se jménem dárce, abyste ho mohli později přiřadit.
   - Červená zpráva, například **Invalid amount**, **Unknown fund**, **Unknown method** nebo **Invalid date**, znamená, že tento řádek bude přeskočen. Opravte soubor a vyberte jej znovu, aby se řádek zahrnul.
4. Klikněte na **Import** (tlačítko ukazuje, kolik řádků bude importováno). Dary se přidají do dávky.

:::tip
Po importu použijte u každého anonymního daru tlačítko **Edit** a vyberte správnou osobu. Poznámka „Imported as:“ vám řekne, od koho podle souboru dar pochází.
:::

## Zaznamenání daru z kartoteky osoby

Chcete-li zaznamenat jeden dar bez otevření dávky, otevřete záznam dárce v sekci **People** a klikněte na **Log a gift** (v přehledu darů nebo v zobrazení darů dané osoby).

1. Nastavte **Date** a **Amount**.
2. Vyberte **Fund** a **Method** (Check, Cash, Card nebo In-Kind) a v případě potřeby zadejte **Check #**, **Last 4 digits**, nebo **Item** (u věcných darů).
3. Volitelně přidejte **Notes** a klikněte na **Save**.

Dar se uloží do dávky pro dané datum. Pokud pro toto datum ještě dávka neexistuje, vytvoří se automaticky a pojmenuje se podle data.

## Rozdělení daru mezi více fondů

Někdy jeden dárce v rámci jedné transakce přispěje do více fondů. Postup je následující:

1. Pod panelem pro zadávání klikněte na odkaz **full donation editor** (nebo klikněte na **Edit** u existujícího řádku daru).
2. V úplném editoru přidejte částky k různým fondům. Celkový součet se vypočítá automaticky z jednotlivých částek fondů.
3. Kliknutím na **Save** dar aktualizujte.

:::info
Rozdělování darů mezi fondy je běžné, když dárce vystaví jeden šek určený pro více účelů, například Všeobecný fond a Misie.
:::

## Úprava a odstranění darů

Chcete-li dar upravit, klikněte v dávce na tlačítko **Edit** u jeho řádku. Můžete změnit datum, částku, fond, způsob platby (Check, Cash, Card nebo In-Kind) nebo jakýkoli jiný údaj. U věcného daru editor pole s údajem označí jako **Item**, abyste mohli popsat, co bylo darováno. Až budete hotovi, klikněte na **Save**.

:::tip
Řádek pod názvem dávky nahoře na stránce se automaticky aktualizuje a zobrazuje datum dávky, počet darů a celkovou částku v penězích, jak přidáváte nebo upravujete záznamy. Použijte jej k porovnání s vaším výpisem z vkladu.
:::

## Vrácení daru

Pokud byl dárce omylem zatížen platbou, nebo si žádá vrácení peněz, můžete dokončený dar vrátit přímo z jeho obrazovky úprav, a to bez nutnosti přecházet do panelu vaší platební brány.

1. Otevřete dar a klikněte na **Edit**.
2. Ve spodní části formuláře vedle tlačítka Delete klikněte na tlačítko **Refund**.
3. Potvrďte dialog: „Refund this donation in full through the payment gateway? This cannot be undone.“

Dar bude vrácen v plné výši přes původní platební bránu a v seznamech darů bude označen jako **Refunded**.

:::warning
Vrácení je možné pouze v plné výši – z B1 Admin nelze vrátit část částky. Po potvrzení také nelze vrácení vzít zpět.
:::

:::info
Tlačítko **Refund** se zobrazí pouze u darů zaplacených online (které mají transakci v platební bráně) a které jsou stále ve stavu **Complete**. Ručně zadané dary (hotovost, šek) nemají transakci v bráně, kterou by bylo možné vrátit. Takové dary upravte nebo smažte.
:::

## Tisk potvrzení o jednom daru

Když vám někdo předá šek, zaplatí za akci nebo tričko, nebo když návštěvní organizace přinese dar, můžete vytisknout potvrzení jen pro tento jeden dar, a ne pro celou dávku nebo roční výpis.

1. Otevřete dávku, která obsahuje daný dar.
2. Na řádku daru klikněte na **Receipt** vedle **Edit**. Můžete také kliknout na **Receipt** ve spodní části formuláře Edit Donation.
3. Klikněte na **Print**, nebo na **Close** pro návrat zpět.

Potvrzení používá stejné uspořádání jako výpis darů: název vašeho sboru a dárce (nebo „Anonymous“), datum a způsob daru, každý fond a částku, poznámku, váš text Giving Note a oficiální blok potvrzení, pokud jste nastavili **Statement format** (viz [Výpisy darů](giving-statements.md)). Číslo potvrzení v tomto bloku je ID daru.

:::info
Formulace „bez zboží nebo služeb“ se tiskne pouze tehdy, když jsou všechny fondy u daru označeny jako daňově odpočitatelné. Pokud některá část daru šla do fondu, který není daňově odpočitatelný, například na poplatek za akci nebo nákup, tato formulace se z potvrzení vynechá, aby vyznělo jako platba, a ne jako charitativní dar.
:::

:::tip
Online dary už automaticky dostávají e-mail s poděkováním, takže potvrzení je užitečné hlavně u darů, které zadáváte ručně.
:::

## Další kroky

- Zkontrolujte své záznamy pomocí [přehledů darů](donation-reports.md), abyste ověřili jejich správnost
- Na konci roku vygenerujte pro své dárce [výpisy darů](giving-statements.md)
