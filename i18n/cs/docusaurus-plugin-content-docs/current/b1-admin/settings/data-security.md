---
title: "Bezpečnost dat"
description: "Zjistěte, jak ChurchApps chrání data vaší církve v B1 Admin: od hashovaných hesel a HTTPS po oddělené databáze a nástroje pro GDPR."
---

# Bezpečnost dat

<div class="article-intro">

Dokonale bezpečný systém neexistuje, ale ChurchApps bere bezpečnost dat vážně. Tato stránka popisuje opatření, která chrání všechna data zadaná do B1.church Admin a dalších produktů ChurchApps.

</div>

<div class="prereqs">
<h4>Než začnete</h4>

- Přečtěte si tuto stránku, abyste pochopili, jak jsou data vaší církve chráněna
- Nastavte [Role a oprávnění](./roles-permissions.md), abyste řídili, kdo má přístup k citlivým informacím
- Seznamte se se [zásadami ochrany osobních údajů](https://churchapps.org/privacy)

</div>

## Omezení ukládání citlivých dat

Naším prvním přístupem je neukládat více citlivých dat, než je nezbytně nutné. To znamená, že nikdy neukládáme údaje o platebních kartách ani bankovních účtech používaných k darování. Když uživatel provede dar prostřednictvím B1.church Admin nebo B1, údaje o platební kartě se nikdy nepřenesou na naše servery, ale pouze k vaší platební bráně (Stripe). V případě úniku dat tak nebudou kompromitovány žádné údaje o kartách ani bankovní informace.

Hesla také nikdy neukládáme. Všechna hesla procházejí jednosměrným hashovacím algoritmem, který část dat nevratně zničí, takže nikdo, ani my, nemůže hesla z databáze získat. Pro ověření hesla musí zadaná hodnota projít stejným jednosměrným hashem a dát stejný výsledek.

Po odstranění těchto dvou zdrojů zůstává jako jediná citlivá data seznam jmen a kontaktních informací.

:::tip
Protože ChurchApps nikdy neukládá údaje o platebních kartách ani bankovních účtech, ani nejhorší možný únik dat neodhalí finanční údaje. Ohroženy by byly pouze jména a kontaktní informace.
:::

## Dodržování osvědčených postupů

Dodržujeme v oboru běžně uznávané osvědčené postupy zabezpečení, včetně šifrování všech dat přenášených z našich serverů a na ně pomocí HTTPS. Všechny servery jsou provozovány v zabezpečeném fyzickém datovém centru Amazon Web Services. Všechny databázové servery jsou umístěny za firewallem a jsou z internetu nedostupné.

## Oddělení dat

Data jsou rozdělena do různých databází podle rozsahu. Každé z našich API (Membership, Giving, Attendance, Messaging, Doing a Lessons) představuje nezávislé úložiště dat s vlastními databázemi. Pokud je jedno z nich kompromitováno, užitečnost získaných dat je omezená, pokud nejsou kompromitována i ostatní. Pokud by například bylo kompromitováno API a databáze Giving, útočník by se potenciálně mohl dostat k seznamu darů a dat, kdy byly provedeny (nikdy však k údajům o kartách ani bankovním účtům). Neměl by ale přístup k tomu, které uživatele dary provedli nebo pro které církve byly určeny, protože tyto údaje jsou uloženy v odděleném databázovém systému Membership.

:::info
Oddělení dat znamená, že kompromitace jednoho systému neposkytne přístup ke všem údajům církve. Každé API funguje nezávisle se svou vlastní databází, čímž omezuje dopad případného úniku dat.
:::

## Omezený přístup

Přístup k produkčním serverům je přísně omezen na správce serverů, kteří jej potřebují. Aktuálně jsou to dvě osoby, které jsou zároveň členy správní rady. Vývojáři, dobrovolníci a ostatní členové správní rady nemají ke produkčním serverům přístup.

## Zásady ochrany osobních údajů

Vaše data patří vám a nikdy nebudou prodána třetím stranám. Úplné zásady ochrany osobních údajů si můžete přečíst [zde](https://churchapps.org/privacy).

## Soulad s GDPR

ChurchApps podporuje soulad s GDPR pro církve s členy ve Spojeném království nebo Evropské unii. Zde je popis, jak řešíme klíčové požadavky:

### Práva subjektů údajů

ChurchApps poskytuje nástroje, které církvím pomáhají reagovat na žádosti subjektů údajů:

- **Právo na přístup (článek 15)** — Členové mohou požádat o kopii svých osobních údajů tak, že se obrátí na svou církev. Správci mohou exportovat údaje jakékoli osoby v sekci **Správa dat** na stránce s detailem osoby v B1.church Admin.
- **Právo na výmaz (článek 17)** — Členové mohou požádat o smazání účtu sami na své stránce Profil (viz [Kontrola žádostí o smazání účtu](../profile/account-deletion.md)), nebo se přímo obrátit na svou církev. Správci mohou také anonymizovat údaje osoby ve všech modulech v sekci **Správa dat** na stránce s detailem osoby. Anonymizace nahradí osobní údaje obecnými hodnotami, přičemž zachová souhrnné záznamy (součty darů, počty účastí), které jsou potřebné pro finanční výkaznictví církve.
- **Právo na omezení zpracování (článek 18)** — Členové mohou požádat o omezení zpracování tím, že se obrátí na svou církev, včetně odhlášení z komunikace.
- **Právo na přenositelnost údajů (článek 20)** — Správci mohou exportovat osobní údaje ve strukturovaném, strojově čitelném formátu JSON jménem členů, kteří o to požádají.

### Používání nástrojů pro správu dat

Pro přístup k nástrojům GDPR u jednotlivce:

1. V B1 Admin přejděte do sekce **Osoby** a otevřete záznam dané osoby.
2. Klikněte na **Upravit**, čímž přejdete do režimu úprav.
3. Přejděte dolů do sekce **Správa dat** (ve výchozím stavu sbalená) a kliknutím ji rozbalte.
4. Pomocí **Exportovat data** stáhněte soubor JSON se všemi údaji uloženými pro danou osobu.
5. Pomocí **Anonymizovat** nahraďte osobní údaje obecnými hodnotami. Budete vyzváni, abyste pro potvrzení napsali `ANONYMIZE` — tuto akci nelze vrátit zpět.

:::warning
Anonymizace je trvalá. Součty darů a počty účastí se zachovávají pro účely finančního výkaznictví, ale všechny osobní identifikátory (jméno, e-mail, adresa atd.) budou odstraněny a nelze je obnovit.
:::

### Zpracování dat

ChurchApps jedná jako **zpracovatel dat** jménem vaší církve (**správce údajů**). Naše [Smlouva o zpracování osobních údajů](https://churchapps.org/terms) popisuje odpovědnosti jednotlivých stran, včetně využívání dalších zpracovatelů, postupů při oznamování porušení zabezpečení a nakládání s daty při ukončení služby.

### Mezinárodní předávání dat

Data ChurchApps jsou hostována na Amazon Web Services (AWS) ve Spojených státech. Mezinárodní předávání dat z Velké Británie a EU je kryto standardními smluvními doložkami (SCC) společnosti AWS v rámci [Dodatku o zpracování dat AWS](https://aws.amazon.com/compliance/data-processing-addendum/). Dodatek AWS o zpracování dat je automaticky začleněn do podmínek služeb AWS pro všechny zákazníky. Hostování v EU není vyžadováno, pokud jsou zavedeny vhodné mechanismy předávání, jako jsou SCC.

Podrobnosti o tom, jak byla vyhodnocena rizika předávání, najdete v [Posouzení rizik předávání](./transfer-risk-assessment.md).

### Dílčí zpracovatelé

- **Amazon Web Services (AWS)** — hostování infrastruktury, ukládání dat a doručování obsahu
- **Stripe** — zpracování plateb za dary (ChurchApps neukládá žádné údaje o kartách)

:::info
Úplné podrobnosti o tom, jak zpracováváme osobní údaje, najdete v naších [Zásadách ochrany osobních údajů](https://churchapps.org/privacy) a [Podmínkách služby](https://churchapps.org/terms). Máte-li dotazy ohledně souladu s GDPR, kontaktujte nás na adrese support@churchapps.org.
:::
