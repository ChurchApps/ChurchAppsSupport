---
title: "Bezpečnosť údajov"
---

# Bezpečnosť údajov

<div class="article-intro">

Hoci neexistuje dokonale bezpečný systém, ChurchApps berie bezpečnosť údajov veľmi vážne. Táto stránka vysvetľuje opatrenia, ktoré sa uplatňujú na ochranu všetkých údajov zadaných do B1.church Admin a ostatných produktov ChurchApps.

</div>

<div class="prereqs">
<h4>Predtým, ako začnete</h4>

- Prečítajte si túto stránku, aby ste pochopili, ako sú chránené údaje vašej cirkvi
- Nastavte [Roly a oprávnenia](./roles-permissions.md), aby ste riadili, kto má prístup k citlivým informáciám
- Oboznámte sa so [zásadami ochrany osobných údajov](https://churchapps.org/privacy)

</div>

## Obmedzenie ukladania citlivých údajov

Naším prvým prístupom je neukladať viac citlivých údajov, než je nevyhnutné. To znamená, že nikdy neukladáme údaje o platobných kartách ani bankových účtoch používaných na darovanie. Keď používateľ daruje prostredníctvom B1.church Admin alebo B1, údaje o platobnej karte sa nikdy neprenášajú na naše servery, ale iba na vašu platobnú bránu (Stripe). To znamená, že v prípade úniku údajov by sa nekompromitovali žiadne údaje o kartách ani bankové informácie.

Heslá v našom systéme tiež nikdy neukladáme. Všetky heslá sa spracúvajú pomocou jednosmernej hashovacej funkcie, pri ktorej sa časť údajov zničí, takže nikto – ani my – nemôže heslá z databázy získať späť. Na overenie hesla sa zadaná hodnota musí prepočítať tou istou jednosmernou funkciou a musí dať rovnaký výsledok.

Po odstránení týchto dvoch zdrojov zostáva ako jediné citlivé údaje zoznam mien a kontaktných informácií.

:::tip
Keďže ChurchApps nikdy neukladá údaje o platobných kartách ani bankových účtoch, ani v najhoršom prípade úniku údajov by sa nesprístupnili podrobnosti o finančných účtoch. Ohrozené by boli iba mená a kontaktné údaje.
:::

## Používanie štandardných osvedčených postupov

Dodržiavame priemyselne štandardné osvedčené postupy bezpečnosti vrátane šifrovania všetkých údajov prenášaných do našich serverov a z nich pomocou HTTPS. Všetky servery sú hostované v zabezpečenom fyzickom dátovom centre v Amazon Web Services. Všetky databázové servery sú umiestnené za firewallom a nie sú dostupné z internetu.

## Oddelenie údajov

Údaje sú rozdelené do rôznych databáz podľa rozsahu. Každé z našich API (Membership, Giving, Attendance, Messaging, Doing a Lessons) predstavuje nezávislé úložisko údajov s vlastnými databázami. Ak je jedno z nich kompromitované, použiteľnosť údajov je obmedzená, pokiaľ nie sú kompromitované aj ostatné. Napríklad ak by bolo kompromitované API/databáza Giving, útočník by potenciálne mohol získať zoznam darov a dátumov (nikdy však údaje o kartách ani bankových účtoch). Nemal by však prístup k tomu, ktorí používatelia dary poskytli alebo pre ktoré cirkvi boli určené, pretože tieto údaje sú uložené v samostatnej databáze Membership.

:::info
Oddelenie údajov znamená, že kompromitovanie jedného systému nedáva prístup ku všetkým údajom cirkvi. Každé API funguje nezávisle so svojou vlastnou databázou, čo obmedzuje dopad prípadného úniku.
:::

## Obmedzený prístup

Prístup k produkčným serverom je prísne obmedzený na správcov serverov, ktorí ho potrebujú. Aktuálne ide o dvoch jednotlivcov, ktorí sú zároveň členmi predstavenstva. Vývojári, dobrovoľníci a ostatní členovia predstavenstva nemajú k produkčným serverom prístup.

## Zásady ochrany osobných údajov

Vaše údaje patria vám a nikdy nebudú predané tretím stranám. Úplné zásady ochrany osobných údajov si môžete prečítať [tu](https://churchapps.org/privacy).

## Súlad s GDPR

ChurchApps podporuje súlad s GDPR pre cirkvi s členmi vo Veľkej Británii alebo v Európskej únii. Tu je návod, ako riešime kľúčové požiadavky:

### Práva dotknutých osôb

ChurchApps poskytuje nástroje, ktoré pomáhajú cirkvám reagovať na žiadosti dotknutých osôb:

- **Právo na prístup (článok 15)** — Členovia si môžu vyžiadať kópiu svojich osobných údajov kontaktovaním svojej cirkvi. Správcovia môžu exportovať údaje ktorejkoľvek osoby v sekcii **Správa údajov** na stránke s detailmi osoby v B1.church Admin.
- **Právo na vymazanie (článok 17)** — Členovia si môžu vyžiadať vymazanie účtu sami zo stránky Profil (pozri [Kontrola žiadostí o vymazanie účtu](../profile/account-deletion.md)) alebo priamym kontaktom so svojou cirkvou. Správcovia môžu tiež anonymizovať údaje osoby vo všetkých moduloch v sekcii **Správa údajov** na stránke s detailmi osoby. Anonymizácia nahradí osobné údaje všeobecnými hodnotami, pričom zachová súhrnné záznamy (súčty darov, počty návštev), ktoré sú potrebné na finančné vykazovanie cirkvi.
- **Právo na obmedzenie spracúvania (článok 18)** — Členovia môžu požiadať o obmedzenie spracúvania kontaktovaním svojej cirkvi, vrátane odhlásenia sa z komunikácie.
- **Právo na prenosnosť údajov (článok 20)** — Správcovia môžu na žiadosť členov exportovať osobné údaje v štruktúrovanom, strojovo čitateľnom formáte JSON.

### Používanie nástrojov na správu údajov

Na prístup k nástrojom GDPR pre jednotlivca:

1. V B1 Admin prejdite do **Ľudia** a otvorte záznam danej osoby.
2. Kliknite na **Upraviť**, aby ste prešli do režimu úprav.
3. Prejdite nadol do sekcie **Správa údajov** (predvolene zbalenej) a kliknutím ju rozbaľte.
4. Pomocou **Exportovať údaje** stiahnite súbor JSON so všetkými údajmi uloženými o danej osobe.
5. Pomocou **Anonymizovať** nahraďte osobné údaje všeobecnými hodnotami. Budete vyzvaní, aby ste na potvrdenie napísali `ANONYMIZE` — túto akciu nie je možné vrátiť späť.

:::warning
Anonymizácia je trvalá. Súčty darov a počty návštev sa zachovávajú na účely finančného vykazovania, ale všetky osobné identifikátory (meno, e-mail, adresa atď.) sa odstránia a nie je ich možné obnoviť.
:::

### Spracúvanie údajov

ChurchApps koná ako **sprostredkovateľ spracúvania údajov** v mene vašej cirkvi (**prevádzkovateľ údajov**). Naša [Zmluva o spracúvaní údajov](https://churchapps.org/terms) upravuje povinnosti každej zo strán vrátane využívania subdodávateľov, postupov pri oznamovaní porušení a nakladania s údajmi pri ukončení služby.

### Medzinárodné prenosy údajov

Údaje ChurchApps sú hostované v Amazon Web Services (AWS) v Spojených štátoch. Medzinárodné prenosy údajov z Veľkej Británie/EÚ sú kryté štandardnými zmluvnými doložkami (SCC) spoločnosti AWS v rámci [Dodatku o spracúvaní údajov AWS](https://aws.amazon.com/compliance/data-processing-addendum/). Dodatok DPA AWS je automaticky začlenený do Podmienok služby AWS pre všetkých zákazníkov. Hosting v EÚ nie je vyžadovaný, ak sú zavedené vhodné mechanizmy prenosu, ako sú SCC.

Podrobnosti o tom, ako boli vyhodnotené riziká prenosu, nájdete v [Posúdení rizika prenosu](./transfer-risk-assessment.md).

### Subdodávatelia

- **Amazon Web Services (AWS)** — Hosting infraštruktúry, ukladanie údajov a doručovanie obsahu
- **Stripe** — Spracovanie platieb za dary (ChurchApps neukladá žiadne údaje o kartách)

:::info
Úplné podrobnosti o tom, ako spracúvame osobné údaje, nájdete v našich [Zásadách ochrany osobných údajov](https://churchapps.org/privacy) a [Podmienkach služby](https://churchapps.org/terms). Ak máte otázky týkajúce sa súladu s GDPR, kontaktujte nás na support@churchapps.org.
:::
