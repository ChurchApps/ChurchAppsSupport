---
title: "Importiranje podataka"
---

Ovo je prijevod na slovački, vidi dolje.

---
title: "Import údajov"
---

# Import údajov

<div class="article-intro">

Nástroj B1 Transfer uľahčuje prenos vašich existujúcich údajov do B1, či už začínate od nuly z tabuľky, prechádzate z inej platformy na správu cirkvi, alebo importujete záznamy o darovaniach. Kedykoľvek ho môžete použiť aj na export alebo zálohovanie údajov.

</div>

## Výukové video

<YouTube id="G-VnhzACYIU" title="Import databázy ľudí v B1" next="Vyhľadávanie ľudí a vytváranie zoznamov v B1" nextUrl="/docs/b1-admin/people/searching-people" />

<div class="prereqs">
<h4>Skôr než začnete</h4>

- Potrebujete aktívny účet B1 Admin s prístupom k **Nastaveniam**.
- Pred začiatkom si pripravte údaje exportované z vášho predchádzajúceho systému.
- Tento nástroj je určený na počiatočnú migráciu údajov. Ak už B1 používate dlhšie, opätovný import môže vytvoriť duplicitné záznamy.

</div>

## Prístup k nástroju Transfer

1. Prihláste sa do **B1 Admin**.
2. Otvorte [ponuku Jump](../introduction.md#getting-around-with-the-jump-menu) (vyhľadávací panel v ľavom hornom rohu), rozbaľte **Nastavenia** a kliknite na **Nastavenia**.
3. Kliknite na odkaz **Import/Export** pod názvom vašej cirkvi v ľavom menu nastavení.
4. Otvorí sa nástroj **B1 Transfer** na novej karte na adrese [transfer.b1.church](https://transfer.b1.church).

Nástroj Transfer vás prevedie štyrmi krokmi: Zdroj, Náhľad, Cieľ a Spustenie.

---

## Krok 1 - Výber zdroja

Vyberte, odkiaľ pochádzajú vaše údaje. K dispozícii je sedem možností:

- **B1 Database** — Načíta údaje priamo z vašej existujúcej cirkvi v B1. Hodí sa na vytvorenie zálohy alebo prevod údajov do iného formátu. Na použitie tejto možnosti musíte byť prihlásení.
- **B1 Import Zip** — Zip súbor vo formáte samotného B1. Používa sa hlavne na obnovu predchádzajúceho exportu z B1. Pri načítaní B1 Export Zip späť do **B1 Database** sa obnoví všetko, čo export obsahuje (pozri [Export údajov](./exporting-data.md#full-data-export-from-settings)). Ak súbor nemožno prečítať, nástroj zobrazí chybu namiesto toho, aby začal odznova.
- **Breeze Import Zip** — Zip súbor obsahujúci exportované súbory z Breeze ChMS.
- **Planning Center Zip** — Zip alebo CSV súbor exportovaný z Planning Center.
- **Custom CSV / Excel** — Ľubovoľný CSV alebo Excel súbor obsahujúci údaje o ľuďoch. Po nahratí priradíte stĺpce k poliam B1, až potom import pokračuje.
- **Tithe.ly CSV** — Súbor exportu ľudí alebo darovaní z Tithe.ly (prijímaný formát CSV alebo Excel).
- **CCB / Pushpay CSV** — CSV export ľudí alebo darovaní z Church Community Builder alebo Pushpay.

Súbor môžete pretiahnuť do oblasti na nahrávanie alebo kliknúť a vybrať ho zo svojho počítača.

---

## Krok 1b - Priradenie polí (iba Custom CSV / Excel)

Ak ste vybrali **Custom CSV / Excel**, po nahratí súboru nástroj zobrazí obrazovku priraďovania polí, až potom prejde na náhľad.

Každý stĺpec vášho súboru je uvedený spolu s ukážkovou hodnotou. Pri každom stĺpci použite rozbaľovací zoznam a vyberte zodpovedajúce pole B1. Nástroj automaticky rozpozná bežné názvy stĺpcov ako „First Name“, „Email“ alebo „Zip Code“, no mali by ste skontrolovať každý riadok a opraviť to, čo nástroj nerozpoznal.

Dostupné polia B1 zahŕňajú:

- First Name, Last Name, Middle Name, Nickname, Display Name, Title/Prefix, Suffix
- Email, Home Phone, Mobile Phone, Work Phone
- Address Line 1, Address Line 2, City, State, Zip Code
- Birth Date, Anniversary, Gender, Marital Status, Membership Status
- Household/Family Name
- Group Name — priradí osobu do skupiny podľa názvu
- **Custom Field (match by name)** — uloží stĺpec do jedného z [vlastných polí osôb](../settings/custom-fields.md) vašej cirkvi. Zobrazí sa políčko **B1 field name**, predvyplnené hlavičkou stĺpca. Zmeňte ho na názov poľa presne tak, ako sa zobrazuje v B1 (na veľkosti písmen nezáleží).
- **Form Answer (custom field)** — uloží hodnotu stĺpca ako vlastné pole pripojené k záznamu osoby. Ak túto možnosť použijete, budete vyzvaní zadať názov formulára.

Dátumy môžu byť v bežných formátoch, napríklad `9/17/1994`, a automaticky sa prevedú. Pri vlastných poliach akceptujú polia Áno/Nie hodnoty ako Yes, No, Y, N, True, False, 1 a 0, a polia s viacerými možnosťami akceptujú buď text možnosti, alebo jej hodnotu.

:::info
Vlastné polia osôb vytvorte v B1 Admin ešte pred importom. Keď import skončí, krok **Custom Fields** uvedie všetky názvy stĺpcov, ktoré nezodpovedajú poľu B1, a spočíta hodnoty, ktoré nezodpovedajú typu poľa. Tieto hodnoty budú preskočené a zvyšok importu sa aj tak dokončí.
:::

Stĺpce, ktoré nechcete importovať, môžete nastaviť na **(Skip)**. Kým nepriradíte aspoň jedno meno (First Name alebo Last Name), nemôžete pokračovať.

Kliknutím na **Confirm Mapping & Import** prejdete na náhľad.

---

## Krok 2 - Náhľad údajov

Po nahratí nástroj zobrazí náhľad všetkého, čo sa bude importovať. Pomocou záložiek skontrolujte každý typ údajov:

- **People** — Zoradené podľa domácností, s fotografiami, ak sú zahrnuté.
- **Groups** — Usporiadané podľa kampusu, bohoslužby, času a kategórie.
- **Attendance** — Dátumy relácií, skupiny a počty návštev.
- **Donations** — Dávky, fondy, darcovia a sumy.
- **Forms** — Názvy formulárov a typy obsahu.

Pozorne to skontrolujte pred pokračovaním. Ak niečo nevyzerá správne, kliknite na **Start Over** a opravte svoj zdrojový súbor.

---

## Krok 3 - Výber cieľa

Vyberte, kam chcete údaje odoslať:

- **B1 Database** — Importuje priamo do databázy vašej cirkvi v B1. Po výbere tejto možnosti nástroj zobrazí konečný počet záznamov, ktoré sa pridajú. Kliknutím na **Start Transfer** potvrdíte.
- **B1 Export Zip** — Stiahne vaše údaje ako zip súbor vo formáte B1, ktorý môžete neskôr obnoviť pomocou **B1 Import Zip**. Vhodné na zálohy.
- **Breeze Export Zip** — Prevedie vaše údaje do formátu Breeze.
- **Planning Center Zip** — Prevedie vaše údaje do formátu Planning Center.

:::warning
Zdrojový a cieľový formát nemôžu byť rovnaké. Ak sa zhodujú, nástroj vás upozorní, aby ste predišli náhodnej duplikácii.
:::

---

## Krok 4 - Spustenie

Nástroj spracuje prenos a pri každom kroku zobrazuje priebeh:

- Campuses, Services a Times
- People
- Photos
- Groups a Group Members
- Donations
- Attendance
- Forms, Questions, Answers a Form Submissions
- Custom Fields (ak ste priradili nejaké stĺpce Custom Field)
- Compressing (iba pri cieľoch vo forme zip súboru)

Ak je cieľom **B1 Database**, karta priebehu sa volá **Import Progress** a skončí sa správou **Import Complete!** (alebo **Import Completed with Errors**). Pri cieľoch vo forme zip súboru tie isté správy hovoria **Export**.

:::info
Pri obnovovaní **B1 Import Zip** sa záznamy, ktoré odkazujú na niečo, čo už v súbore nie je, preskočia namiesto zastavenia importu: členstvá v skupinách osôb alebo skupín, ktoré nie sú v zip súbore, návštevy vymazaných skupín alebo osôb a prepojenia medzi skupinami a vymazanými časmi bohoslužieb. Relácie návštevnosti, ktoré neboli nikdy priradené k času bohoslužby, sa obnovia. Podobne pri exporte sa fotografia, ktorú nemožno stiahnuť alebo prečítať, vynechá, aby krok **Photos** pokračoval.
:::

:::warning
Počas prenosu nezatvárajte prehliadač. Počkajte, kým všetky kroky nebudú označené ako dokončené.
:::

---

## Príprava Breeze Import Zip

1. V Breeze otvorte **Settings** a v ľavom bočnom paneli kliknite na **Export**.
2. Exportujte tri samostatné súbory: **People**, **Tags** a **Contributions**.
3. Vyberte všetky tri súbory, kliknite pravým tlačidlom a zabaľte ich do jedného zip súboru.
   - Na Macu: vyberte súbory, kliknite pravým tlačidlom a zvoľte **Compress**.
   - Na PC: vyberte súbory, kliknite pravým tlačidlom, zvoľte **Send to** a potom **Compressed (zipped) folder**.
4. Nahrajte zip súbor pomocou možnosti **Breeze Import Zip** v Kroku 1.

Import z Breeze automaticky prenesie ľudí, skupiny (tagy) a záznamy o darovaniach.

---

## Príprava exportu z Planning Center

1. Prihláste sa do Planning Center a otvorte produkt **People**.
2. V ľavom bočnom paneli kliknite na **Lists** a vytvorte zoznam, ktorý obsahuje všetkých, koho chcete preniesť. (Ak už máte zoznam celej zboru, použite ten.)
3. Otvorte zoznam a pomocou možnosti **export** stiahnite ľudí ako súbor **CSV**. Zahrňte polia, ktoré chcete zachovať — meno, email, telefón, adresu, dátum narodenia, pohlavie a stav členstva sa všetky namapujú do B1.
4. Ak Planning Center poskytne viac súborov, vyberte ich všetky, kliknite pravým tlačidlom a zabaľte ich do jedného zip súboru.
   - Na Macu: vyberte súbory, kliknite pravým tlačidlom a zvoľte **Compress**.
   - Na PC: vyberte súbory, kliknite pravým tlačidlom, zvoľte **Send to** a potom **Compressed (zipped) folder**.
5. Nahrajte CSV alebo zip súbor pomocou možnosti **Planning Center Zip** v Kroku 1.

Po nahratí pokračujte na náhľad a pred spustením importu potvrďte, že vaši ľudia a domácnosti vyzerajú správne.

---

## Príprava exportu z Tithe.ly

1. V Tithe.ly exportujte údaje **People** ako súbor CSV alebo Excel. Ak chcete preniesť záznamy o darovaniach, môžete exportovať aj samostatný súbor **Giving**.
2. Nástroj automaticky rozpozná, či súbor obsahuje údaje o ľuďoch alebo darovaniach, na základe názvov stĺpcov.
3. Nahrajte súbor pomocou možnosti **Tithe.ly CSV** v Kroku 1.

:::info
Exporty z Tithe.ly sa importujú po jednom súbore. Ak potrebujete importovať údaje o ľuďoch aj darovaniach samostatne, spustite proces dvakrát.
:::

---

## Príprava exportu z CCB alebo Pushpay

1. V Church Community Builder alebo Pushpay exportujte údaje **People** ako súbor CSV. Môžete tiež exportovať samostatný súbor darovaní/príspevkov.
2. Nástroj automaticky rozpozná, či súbor obsahuje údaje o ľuďoch alebo darovaniach, na základe názvov stĺpcov.
3. Nahrajte súbor pomocou možnosti **CCB / Pushpay CSV** v Kroku 1.

---

## Po importe

Keď je prenos dokončený, vyhraďte si niekoľko minút na overenie údajov:

1. Prejdite na stránku [People](../people/adding-people.md) a skontrolujte niekoľko profilov.
2. Overte, či sa mená, emaily, telefónne čísla a adresy preniesli správne.
3. Skontrolujte, či sú zachované väzby v domácnostiach. Rola každej osoby v domácnosti (Head, Spouse, Child alebo Other) sa prenesie, ak ju zdroj obsahuje: stĺpec **householdRole** v B1 Import Zip, **Family Role** v Breeze alebo Tithe.ly a **Family Position** v CCB / Pushpay. Roly ako „Head of Household“, „Primary“, „Wife“ alebo „Son“ sa prevedú na zodpovedajúcu rolu v B1. Importy z Planning Center a Custom CSV / Excel nemajú stĺpec roly, takže tieto osoby dostanú rolu **Other**; rolu môžete zmeniť v domácnosti osoby na stránke [People](../people/adding-people.md#managing-households).
4. Skontrolujte importované skupiny a záznamy o darovaniach.

Ak zistíte problémy, jednotlivé profily môžete upraviť na stránke People. Nástroj Transfer môžete tiež spustiť znova a [exportovať svoje údaje](exporting-data.md) ako zálohu.
