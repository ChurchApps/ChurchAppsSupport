---
title: "Potvrzení o darech"
---

# Potvrzení o darech

<div class="article-intro">

Na konci každého roku potřebují vaši dárci přehled svých daňově odpočitatelných darů pro své záznamy. B1 Admin umožňuje vytvořit tato potvrzení pro všechny dárce najednou, čímž vám ušetří hodiny ruční práce.

</div>

<div class="prereqs">
<h4>Než začnete</h4>

- Ověřte, že jsou vaše [fondy](funds.md) správně označeny jako **Daňově odpočitatelné**. Na potvrzeních se zobrazují pouze dary určené do daňově odpočitatelných fondů.
- Ujistěte se, že byly všechny dary [zaznamenány](recording-donations.md) a že byly všechny online transakce [importovány ze Stripe](stripe-import.md).

</div>

## Otevření potvrzení o darech

1. V **B1 Admin** otevřete [nabídku Jump](../introduction.md#getting-around-with-the-jump-menu) (vyhledávací pole v levém horním rohu) a rozbalte položku **Dary**.
2. Klikněte na **Potvrzení o darech**. Otevře se stránka **Hromadná potvrzení o darech**.

## Vytvoření potvrzení

1. V panelu **Vyberte rok** zvolte v rozbalovací nabídce **Rok**. Můžete zvolit aktuální rok nebo kterýkoli z pěti předchozích let.
2. Stránka načte pouze dary datované v daném roce (od 1. ledna do 31. prosince), takže se otevře rychle, i když má váš sbor dlouhou historii darů. Když vyberete jiný rok, souhrn se obnoví a zobrazí dary za tento rok. Panel **Souhrn** pod výběrem roku zobrazuje statistiky za daný rok, včetně:
   - **Celkem dárců** – počet lidí, kteří přispěli
   - **Celkem darů** – počet jednotlivých záznamů o darech
   - **Celková částka** – celková částka všech darů

## Stažení potvrzení

Panel **Možnosti stahování** nabízí dvě možnosti, jak potvrzení předat dárcům:

### Stažení jako soubory CSV

V části **Jednotlivé soubory CSV** klikněte na **Stáhnout ZIP** a stáhněte soubor ZIP obsahující samostatný soubor CSV pro každého dárce. Tato možnost se hodí, pokud chcete potvrzení posílat e-mailem jednotlivě nebo je importovat do jiného systému.

### Vytisknout všechna potvrzení

V části **Tisknutelná potvrzení** klikněte na **Vytisknout vše** (tlačítko ukazuje počet potvrzení), čímž v prohlížeči otevřete tiskový náhled potvrzení všech dárců za vybraný rok. Odtud použijte funkci tisku v prohlížeči a odešlete je na tiskárnu. Každé potvrzení začíná na nové stránce, takže je lze snadno přeložit a poslat poštou. Potvrzení jsou seřazena podle příjmení dárce a poté podle jména.

Pokud jste nahráli **Logo pro světlé pozadí** v sekci [Web > Vzhled](../website/appearance.md), vytiskne se vycentrované v horní části každého potvrzení, nad jeho názvem. Platí to jak pro **Vytisknout vše**, tak pro potvrzení jednoho dárce vytištěné z jeho záznamu.

:::tip
Potvrzení vytvářejte včas v lednu, dokud jsou vaše záznamy čerstvé. Před vytvořením potvrzení si ověřte, že jsou vaše fondy správně označeny jako daňově odpočitatelné. Zahrnuty jsou pouze dary do takových fondů.
:::

:::info
Potvrzení o darech obsahují pouze dary přiřazené k fondům, u nichž je zapnuto nastavení **Daňově odpočitatelné**. Pokud fond není označen jako daňově odpočitatelný, jeho dary se na potvrzení neobjeví. Toto nastavení můžete spravovat na stránce [Fondy](funds.md).
:::

## Formáty potvrzení pro Kanadu, Austrálii a Nový Zéland

Sbory mimo Spojené státy mohou přepnout potvrzení na oficiální formát potvrzení své země. Klikněte na **Formát potvrzení** v horní části stránky Potvrzení o darech (nebo přejděte do **Nastavení** a otevřete sekci **Dary**) a nastavte **Formát potvrzení** na **Kanada**, **Austrálie** nebo **Nový Zéland**. Poté vyplňte pole, která se zobrazí: registrační číslo (registrační číslo CRA, ABN nebo registrační číslo charitativní organizace na Novém Zélandu), adresu vaší organizace, jméno osoby oprávněné podepisovat potvrzení a u Kanady také město, kde se potvrzení vystavují.

Potvrzení pak obsahují znění, které od nich vyžaduje daňový úřad (u Kanady "Oficiální potvrzení pro účely daně z příjmu" s odkazem na CRA), číslo potvrzení ve tvaru `ROK-IDDÁRCE`, částku způsobilou k odpočtu, která zahrnuje pouze dary z daňově odpočitatelných fondů, a samostatný řádek pro dary do fondů, které odpočitatelné nejsou. Dárci vidí stejný blok potvrzení, když si vytisknou vlastní potvrzení z B1.church.

## Co vidí členové v B1.church

Stejná sekce nastavení **Dary** určuje, co členové vidí na své stránce darů v B1.church:

- **Historie darů členů** určuje, které roky mohou členové vidět. Výchozí je **Všechny roky**. Volba **Do roku 2025** (nebo jiný rok) zobrazí historii jen do tohoto roku, takže členové nemohou zobrazit nebo vytisknout pozdější rok, dokud jej nepovolíte. Použijte ji, pokud chcete zadržet aktuální rok, dokud dokončíte opravy a vratky. Volba **Skryto** úplně odstraní historii darů, roční součty i tisk potvrzení. Členové stále mohou dávat dary.
- **Poznámka k darům** je krátká zpráva zobrazená na stránce darů člena a v jeho historii darů a vytištěná na spodku každého potvrzení o darech, včetně potvrzení, která zde vytisknete. Použijte ji pro informace, jako je vaše zásada vracení peněz.

Tato nastavení mění pouze to, co členové vidí. Z této stránky můžete stále vytisknout potvrzení za libovolný rok.

## Další kroky

Pokud potřebujete před vytvořením potvrzení zkontrolovat podrobnosti darů, navštivte stránku [Přehledy darů](donation-reports.md) nebo si jednotlivé [dávky](batches.md) prohlédněte.
