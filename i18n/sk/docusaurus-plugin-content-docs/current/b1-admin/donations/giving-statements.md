---
title: "Výpisy o daroch"
---

# Výpisy o daroch

<div class="article-intro">

Na konci každého roka potrebujú vaši darcovia prehľad svojich daňovo uznateľných darov pre svoju evidenciu. B1 Admin umožňuje vygenerovať tieto výpisy pre všetkých darcov naraz, čím vám ušetrí hodiny manuálnej práce.

</div>

<div class="prereqs">
<h4>Predtým, ako začnete</h4>

- Overte, že vaše [fondy](funds.md) sú správne označené ako **Daňovo uznateľné** -- na výpisoch sa zobrazia iba dary určené daňovo uznateľným fondom
- Uistite sa, že všetky dary boli [zaznamenané](recording-donations.md) a že všetky online transakcie boli [importované zo Stripe](stripe-import.md)

</div>

## Otvorenie výpisov o daroch

1. V **B1 Admin** otvorte [ponuku Jump](../introduction.md#getting-around-with-the-jump-menu) (vyhľadávací panel v ľavom hornom rohu) a rozbaľte **Donations**.
2. Kliknite na **Giving Statements**. Otvorí sa stránka **Batch Giving Statements**.

## Generovanie výpisov

1. V paneli **Select Year** vyberte z rozbaľovacieho zoznamu **Year**. Môžete zvoliť aktuálny rok alebo ktorýkoľvek z piatich predchádzajúcich rokov.
2. Stránka načíta iba dary s dátumom v danom roku (od 1. januára do 31. decembra), takže sa otvorí rýchlo, aj keď vaša cirkev má históriu darov z mnohých rokov. Keď vyberiete iný rok, prehľad sa obnoví a zobrazí dary za daný rok. Panel **Summary** pod výberom roka zobrazuje štatistiky za daný rok, vrátane:
   - **Total Donors** -- počet ľudí, ktorí darovali
   - **Total Donations** -- počet jednotlivých záznamov o daroch
   - **Total Amount** -- celková suma všetkých darov v dolároch

## Sťahovanie výpisov

Panel **Download Options** ponúka dve možnosti, ako odovzdať výpisy vašim darcom:

### Stiahnutie ako súbory CSV

V časti **Individual CSV Files** kliknite na **Download ZIP** a stiahnite ZIP súbor obsahujúci samostatný súbor CSV pre každého darcu. Toto je užitočné, ak chcete výpisy posielať e-mailom jednotlivo alebo ich importovať do iného systému.

### Tlač všetkých výpisov

V časti **Printable Statements** kliknite na **Print All** (tlačidlo zobrazuje počet výpisov), čím sa vo vašom prehliadači otvorí tlačiteľné zobrazenie výpisu každého darcu za vybraný rok. Odtiaľ použite funkciu tlače prehliadača a odošlite ich na tlačiareň. Každý výpis začína na novej strane, takže sú pripravené na zloženie a odoslanie poštou, a výpisy sú zoradené podľa priezviska darcu, potom podľa mena.

Ak ste nahrali **Light Background Logo** v sekcii [Website > Appearance](../website/appearance.md), vytlačí sa vycentrované v hornej časti každého výpisu, nad názvom výpisu. Platí to pre **Print All` aj pre výpis jedného darcu vytlačený z jeho záznamu.

:::tip
Spúšťajte výpisy skoro v januári, kým sú vaše záznamy čerstvé. Pred generovaním výpisov si dvakrát overte, že vaše fondy sú správne označené ako daňovo uznateľné -- zahrnuté sú iba dary určeným daňovo uznateľným fondom.
:::

:::info
Výpisy o daroch obsahujú iba dary priradené k fondom, pri ktorých je zapnuté nastavenie **Tax Deductible**. Ak fond nie je označený ako daňovo uznateľný, jeho dary sa na výpise neobjavia. Toto nastavenie môžete spravovať na stránke [Funds](funds.md).
:::

## Formáty potvrdení pre Kanadu, Austráliu a Nový Zéland

Cirkvi mimo Spojených štátov môžu prepnúť výpis na oficiálny formát potvrdenia svojej krajiny. Kliknite na **Statement format** v hornej časti stránky Giving Statements (alebo prejdite na **Settings** a otvorte sekciu **Giving**), nastavte **Statement Format** na **Canada**, **Australia** alebo **New Zealand** a potom vyplňte polia, ktoré sa zobrazia: číslo registrácie (CRA registration number, ABN alebo číslo registrácie charity na Novom Zélande), adresu vašej organizácie, meno osoby oprávnenej podpisovať potvrdenia a pre Kanadu mesto, v ktorom sa potvrdenia vydávajú.

Výpisy potom obsahujú znenie, ktoré vyžaduje daňový úrad (pre Kanadu „Official Receipt for Income Tax Purposes“ s referenčným číslom CRA), číslo potvrdenia v tvare `YEAR-DONORID`, oprávnenú sumu počítanú iba z daňovo uznateľných fondov a samostatný riadok pre dary určené nedaňovo uznateľným fondom. Darcovia vidia rovnaký blok potvrdenia, keď si vytlačia vlastný výpis z B1.church.

## Čo vidia členovia v B1.church

Rovnaká sekcia nastavení **Giving** riadi, čo členovia vidia na svojej vlastnej stránke darov v B1.church:

- **Member Giving History** určuje, ktoré roky môžu členovia vidieť. Predvolená hodnota je **All years**. **Through 2025** (alebo iný rok) zastaví zobrazenie na tomto roku, takže členovia nemôžu zobraziť ani vytlačiť neskorší rok, kým to nepovolíte. Použite to, ak chcete zatiaľ skryť aktuálny rok, kým dokončíte opravy a vrátenia platieb. **Hidden** úplne odstráni históriu darov, ročné súčty a tlač výpisov. Členovia môžu stále darovať.
- **Giving Note** je krátka správa zobrazená na stránke darov člena a v jeho histórii darov a vytlačená na spodku každého výpisu o daroch, vrátane výpisov, ktoré tu vytlačíte. Použite ju napríklad na uvedenie zásad vrátenia platieb.

Tieto nastavenia menia iba to, čo vidia členovia. Z tejto stránky môžete stále vytlačiť výpis za ktorýkoľvek rok.

## Ďalšie kroky

Ak potrebujete pred generovaním výpisov skontrolovať podrobnosti o daroch, navštívte stránku [Donation Reports](donation-reports.md) alebo si pozrite jednotlivé [dávky](batches.md).
