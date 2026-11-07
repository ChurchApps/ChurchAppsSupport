---
title: "Import dat"
description: "Přeneste stávající lidi, skupiny, docházku a záznamy darů do B1 Admin nástrojem B1 Transfer nebo kdykoli exportujte zálohu dat."
---

# Import dat

<div class="article-intro">

Nástroj B1 Transfer usnadňuje přenos stávajících dat do B1, ať už začínáte od nuly s tabulkou, přecházíte z jiné platformy pro správu církve, nebo importujete záznamy darů. Lze jej také kdykoli použít k exportu nebo zálohování dat.

</div>

## Školicí video

<YouTube id="G-VnhzACYIU" title="Import databáze osob v B1" next="Vyhledávání osob a vytváření seznamů v B1" nextUrl="/docs/b1-admin/people/searching-people" />

<div class="prereqs">
<h4>Než začnete</h4>

- Potřebujete aktivní účet B1 Admin s přístupem k **Nastavení**.
- Před zahájením mějte data připravená k exportu z vašeho předchozího systému.
- Tento nástroj je určen pro počáteční migraci dat. Pokud již B1 delší dobu používáte, může opakovaný import vytvořit duplicitní záznamy.

</div>

## Přístup k nástroji pro přenos

1. Přihlaste se do **B1 Admin**.
2. Otevřete [nabídku Jump](../introduction.md#getting-around-with-the-jump-menu) (vyhledávací pole vlevo nahoře), rozbalte **Nastavení** a klikněte na **Nastavení**.
3. Klikněte na odkaz **Import/Export** pod názvem vaší církve v levé nabídce nastavení.
4. Otevře se nástroj **B1 Transfer** v nové záložce na adrese [transfer.b1.church](https://transfer.b1.church).

Nástroj vás provede čtyřmi kroky: Zdroj, Náhled, Cíl a Spuštění.

---

## Krok 1 - Vyberte zdroj

Vyberte, odkud data pocházejí. Na výběr je sedm možností:

- **B1 Database** — Načte data přímo z vaší stávající církve v B1. Hodí se pro zálohu nebo převod dat do jiného formátu. Pro použití této možnosti musíte být přihlášeni.
- **B1 Import Zip** — ZIP soubor ve formátu B1. Slouží hlavně k obnovení předchozího exportu z B1. Načtení ZIP souboru B1 Export zpět do **B1 Database** obnoví vše, co export obsahuje (viz [Export dat](./exporting-data.md#full-data-export-from-settings)). Pokud soubor nelze přečíst, nástroj zobrazí chybu namísto toho, aby začal od začátku.
- **Breeze Import Zip** — ZIP soubor obsahující exportované soubory z Breeze ChMS.
- **Planning Center Zip** — ZIP nebo CSV soubor exportovaný z Planning Center.
- **Vlastní CSV / Excel** — Libovolný soubor CSV nebo Excel obsahující údaje o osobách. Po nahrání budete muset přiřadit sloupce k polím B1, než import pokračuje.
- **Tithe.ly CSV** — Soubor s exportem osob nebo darů z Tithe.ly (přijímá formáty CSV i Excel).
- **CCB / Pushpay CSV** — CSV export osob nebo darů z Church Community Builder nebo Pushpay.

Soubor můžete přetáhnout do oblasti pro nahrávání, nebo na něj kliknout a vyhledat ho v počítači.

---

## Krok 1b - Přiřaďte pole (pouze Vlastní CSV / Excel)

Pokud jste vybrali **Vlastní CSV / Excel**, zobrazí nástroj po nahrání souboru obrazovku pro přiřazení polí, než přejdete k náhledu.

Každý sloupec ze souboru je uveden spolu s ukázkovou hodnotou. U každého sloupce vyberte v rozbalovací nabídce odpovídající pole B1. Nástroj automaticky rozpozná běžné názvy sloupců, jako „First Name“, „Email“ nebo „Zip Code“, ale měli byste projít každý řádek a opravit cokoli, co nástroj přehlédl.

Mezi dostupná pole B1 patří:

- First Name, Last Name, Middle Name, Nickname, Display Name, Title/Prefix, Suffix
- Email, Home Phone, Mobile Phone, Work Phone
- Address Line 1, Address Line 2, City, State, Zip Code
- Birth Date, Anniversary, Gender, Marital Status, Membership Status
- Household/Family Name
- Group Name — přiřadí osobu do skupiny podle názvu
- **Custom Field (match by name)** — uloží sloupec do jednoho z [vlastních polí osob](../settings/custom-fields.md) vaší církve. Objeví se pole **B1 field name** předvyplněné záhlavím sloupce. Změňte ho na název pole přesně tak, jak je zapsán v B1 (na velikosti písmen nezáleží).
- **Form Answer (custom field)** — uloží hodnotu sloupce jako vlastní pole připojené k záznamu osoby. Pokud tuto možnost použijete, budete vyzváni k pojmenování formuláře.

Data mohou být v běžných formátech, například `9/17/1994`, a jsou automaticky převedena. U vlastních polí přijímají pole Ano/Ne hodnoty jako Yes, No, Y, N, True, False, 1 a 0. Pole s výběrem z možností přijímají buď text volby, nebo její hodnotu.

:::info
Vlastní pole osob vytvořte v B1 Admin ještě před importem. Po dokončení importu krok **Custom Fields** vypíše všechny názvy sloupců, které neodpovídají žádnému poli B1, a spočítá hodnoty, které neodpovídají typu pole. Tyto hodnoty budou přeskočeny a zbytek importu se dokončí.
:::

Sloupce, které nechcete importovat, můžete nastavit na **(Přeskočit)**. Než budete moci pokračovat, musí být přiřazeno alespoň jedno jméno (First Name nebo Last Name).

Kliknutím na **Confirm Mapping & Import** přejdete k náhledu.

---

## Krok 2 - Zkontrolujte data

Po nahrání nástroj zobrazí náhled všeho, co bude importováno. Pomocí záložek zkontrolujte každý typ dat:

- **People** — Seřazeno podle domácností, s fotografiemi, pokud jsou zahrnuty.
- **Groups** — Seřazeno podle kampusu, bohoslužby, času a kategorie.
- **Attendance** — Data relací, skupiny a počty návštěv.
- **Donations** — Dávky, fondy, dárci a částky.
- **Forms** — Názvy formulářů a typy obsahu.

Pečlivě to zkontrolujte, než budete pokračovat. Pokud něco vypadá špatně, klikněte na **Start Over** a opravte zdrojový soubor.

---

## Krok 3 - Vyberte cíl

Vyberte, kam mají data směřovat:

- **B1 Database** — Importuje přímo do databáze vaší církve v B1. Po výběru této možnosti nástroj zobrazí konečný počet záznamů, které budou přidány. Potvrďte kliknutím na **Start Transfer**.
- **B1 Export Zip** — Stáhne vaše data jako ZIP soubor ve formátu B1, který lze později obnovit pomocí **B1 Import Zip**. Vhodné pro zálohy.
- **Breeze Export Zip** — Převede vaše data do formátu Breeze.
- **Planning Center Zip** — Převede vaše data do formátu Planning Center.

:::warning
Zdrojový a cílový formát nemohou být stejné. Pokud se shodují, nástroj vás upozorní, aby nedošlo k nechtěnému duplikování.
:::

---

## Krok 4 - Spuštění

Nástroj zpracuje přenos a zobrazí průběh každého kroku:

- Kampusy, bohoslužby a časy
- Osoby
- Fotografie
- Skupiny a členové skupin
- Dary
- Docházka
- Formuláře, otázky, odpovědi a odeslané formuláře
- Vlastní pole (pokud jste přiřadili nějaké sloupce Custom Field)
- Komprimace (pouze pro cíle ve formátu ZIP)

Pokud je cílem **B1 Database**, karta průběhu se jmenuje **Import Progress** a končí zprávou **Import Complete!** (nebo **Import Completed with Errors**). Pro cíle ve formátu ZIP stejné zprávy používají slovo **Export**.

:::info
Při obnovení **B1 Import Zip** se záznamy, které odkazují na něco, co v souboru již není, přeskočí, aby se import nezastavil. Jde o členství ve skupinách u osob nebo skupin, které nejsou v ZIP souboru, o docházku u smazaných skupin nebo osob a o vazby mezi skupinami a smazanými časy bohoslužeb. Relace docházky, které nikdy nebyly svázány s časem bohoslužby, se obnoví. Při exportu se podobně fotografie, kterou nelze stáhnout nebo přečíst, vynechá, aby krok **Photos** mohl pokračovat.
:::

:::warning
Během přenosu nezavírejte prohlížeč. Počkejte, dokud všechny kroky nebudou označeny jako dokončené.
:::

---

## Příprava ZIP souboru pro import z Breeze

1. V Breeze přejděte do **Settings** a v levém postranním panelu klikněte na **Export**.
2. Exportujte tři samostatné soubory: **People**, **Tags** a **Contributions**.
3. Vyberte všechny tři soubory, klikněte na ně pravým tlačítkem a zkomprimujte je do jednoho ZIP souboru.
   - Na Macu: vyberte soubory, klikněte pravým tlačítkem a zvolte **Compress**.
   - Na PC: vyberte soubory, klikněte pravým tlačítkem, zvolte **Send to** a poté **Compressed (zipped) folder**.
4. Nahrajte ZIP soubor pomocí možnosti **Breeze Import Zip** v kroku 1.

Import z Breeze automaticky přenese osoby, skupiny (štítky) a záznamy darů.

---

## Příprava exportu z Planning Center

1. Přihlaste se do Planning Center a otevřete produkt **People**.
2. V levém postranním panelu klikněte na **Lists** a vytvořte seznam, který obsahuje všechny osoby, které chcete přenést. (Pokud již máte seznam celého sboru, použijte ten.)
3. Otevřete seznam a pomocí možnosti **export** stáhněte osoby jako soubor **CSV**. Zahrňte pole, která chcete zachovat. Jméno, e-mail, telefon, adresa, datum narození, pohlaví a stav členství se všechna přenesou do B1.
4. Pokud Planning Center poskytne více souborů, vyberte je všechny, klikněte na ně pravým tlačítkem a zkomprimujte je do jednoho ZIP souboru.
   - Na Macu: vyberte soubory, klikněte pravým tlačítkem a zvolte **Compress**.
   - Na PC: vyberte soubory, klikněte pravým tlačítkem, zvolte **Send to** a poté **Compressed (zipped) folder**.
5. Nahrajte CSV nebo ZIP soubor pomocí možnosti **Planning Center Zip** v kroku 1.

Po nahrání pokračujte k náhledu a před spuštěním importu zkontrolujte, zda osoby a domácnosti vypadají správně.

---

## Příprava exportu z Tithe.ly

1. V Tithe.ly exportujte data **People** jako soubor CSV nebo Excel. Pokud chcete importovat záznamy darů, můžete exportovat také samostatný soubor **Giving**.
2. Nástroj automaticky rozpozná, zda soubor obsahuje data o osobách, nebo o darech, podle názvů sloupců.
3. Nahrajte soubor pomocí možnosti **Tithe.ly CSV** v kroku 1.

:::info
Exporty z Tithe.ly lze importovat jeden soubor po druhém. Pokud potřebujete importovat osoby a dary odděleně, spusťte tento postup dvakrát.
:::

---

## Příprava exportu z CCB nebo Pushpay

1. V Church Community Builder nebo Pushpay exportujte data **People** jako soubor CSV. Můžete také exportovat samostatný soubor s dary nebo příspěvky.
2. Nástroj automaticky rozpozná, zda soubor obsahuje data o osobách, nebo o darech, podle názvů sloupců.
3. Nahrajte soubor pomocí možnosti **CCB / Pushpay CSV** v kroku 1.

---

## Po importu

Jakmile je přenos dokončen, věnujte několik minut ověření dat:

1. Projděte stránku [Osoby](../people/adding-people.md) a zkontrolujte několik profilů.
2. Ověřte, že se jména, e-maily, telefonní čísla a adresy přenesly správně.
3. Zkontrolujte, zda jsou zachována propojení v domácnostech. Role každé osoby v domácnosti (Head, Spouse, Child nebo Other) se přenese, pokud ji zdroj obsahuje: sloupec **householdRole** v ZIP souboru B1 Import, **Family Role** v Breeze nebo Tithe.ly a **Family Position** v CCB / Pushpay. Role jako „Head of Household“, „Primary“, „Wife“ nebo „Son“ se převedou na odpovídající roli v B1. Importy z Planning Center a Vlastní CSV / Excel žádný sloupec s rolemi neobsahují, takže těmto osobám se nastaví **Other**. Roli můžete změnit v domácnosti dané osoby na stránce [Osoby](../people/adding-people.md#managing-households).
4. Zkontrolujte importované skupiny a záznamy darů.

Pokud zjistíte problémy, můžete jednotlivé profily upravit na stránce Osoby. Nástroj pro přenos můžete také spustit znovu a [exportovat data](exporting-data.md) jako zálohu.
