---
title: "Google Sheets"
---

# Google Sheets

<div class="article-intro">

**B1 Export** je oficiální doplněk pro Google Sheets od B1.church. Přidá postranní panel do libovolné tabulky, která exportuje lidi, dary, skupiny nebo docházku z vašeho církevního účtu B1 do pojmenovaných listů. Exportuje se na vyžádání, jedním kliknutím. Doplněk běží celý v Google účtu uživatele. Kromě čtecích volání API, která provede každý export, se nic nepřipojuje k serverům ChurchApps.

</div>

<div class="prereqs">
<h4>Než začnete</h4>

- Google účet s právem úprav tabulky, do které chcete exportovat
- Správce církve (nebo někdo s právem čtení dat, která chcete exportovat), který dokáže vytvořit klíč API pro B1
- Doplněk B1 Export nainstalovaný z Google Workspace Marketplace

</div>

## Co se exportuje

| Položka nabídky | List | Data |
|---|---|---|
| Exportovat lidi | `B1 People` | ID, Zobrazované jméno, Jméno, Příjmení, E-mail, Stav členství |
| Exportovat dary | `B1 Donations` | ID, ID osoby, Datum, Částka, Způsob platby, ID dávky |
| Exportovat skupiny | `B1 Groups` | ID, Název, Kategorie, Počet členů |
| Exportovat docházku | `B1 Attendance` | ID, ID osoby, Datum návštěvy, ID bohoslužby, ID skupiny |

Každý export **nahradí** obsah svého pojmenovaného listu. Opětovné spuštění exportu tedy dá čerstvý snímek dat, ne připojené řádky. Ostatní listy v tabulce zůstanou beze změny.

## Nastavení

### 1. Vytvořte klíč API pro B1 s правильnými oprávněními

1. V B1Admin přejděte na **Nastavení → Vývojář → Klíče API**.
2. Klikněte na **Nový klíč API**, pojmenujte ho „Export do Sheets“ a udělte oprávnění **čtení** pro to, co chcete exportovat:
   - `people:read` pro export lidí
   - `donations:read` pro dary
   - `groups:read` pro skupiny
   - `attendance:read` pro docházku
3. Klíč, který slouží jen k exportům, **nepotřebuje** `settings:write`. Toto oprávnění je určeno jen pro konektory, které registrují webhooky (Zapier / Make). Udržujte tento klíč co nejužší.
4. Uložte a zkopírujte klíč `cak_…`.

### 2. Nainstalujte doplněk

1. Otevřete tabulku, do které chcete exportovat.
2. **Rozšíření → Doplňky → Získat doplňky**.
3. Vyhledejte **B1 Export** a nainstalujte jej. Google vás požádá o přístup k vašim tabulkám a k externím HTTP požadavkům (aby mohl doplněk volat API B1).

Po instalaci se položka **B1 Export** objeví v nabídce **Rozšíření** každé tabulky, kterou otevřete s tímto Google účtem.

### 3. Připojte klíč

1. **Rozšíření → B1 Export → Připojit…** (nebo **B1 Export → Připojit…** z panelu nabídek po prvním otevření).
2. Vložte klíč API do postranního panelu, ponechte základní URL `https://api.churchapps.org` (pokud netestujete na staging prostředí) a klikněte na **Uložit**.
3. Klikněte na **Otestovat připojení**. Zelené hlášení „Připojení v pořádku“ potvrzuje, že klíč funguje.

Klíč se ukládá do **vlastností uživatele** (`PropertiesService.getUserProperties()`). Je svázán s vaším Google účtem, nikdy se nezapisuje do tabulky a není viditelný pro ostatní editory tabulky.

## Spuštění exportu

Buď:

- **Z nabídky**: **Rozšíření → B1 Export → Exportovat lidi** (nebo Dary / Skupiny / Docházku)
- **Z postranního panelu**: otevřete postranní panel (Připojit…) a klikněte na tlačítko příslušné datové sady

Po dokončení se zobrazí upozornění, např. „_N_ řádek(ky) zapsán(y) do 'B1 People'.“

## Vytváření přehledů nad daty

Exportované listy jsou běžná data v Google Sheets. Vlastní analýzy budujte odkazováním na tyto listy:

- **Souhrnný list** se vzorcem `=SUMIF('B1 Donations'!E:E, "card", 'B1 Donations'!D:D)` pro součet darů platební kartou
- **Filtrovaný pohled** jen na členy pomocí `=FILTER('B1 People'!A:F, 'B1 People'!F:F = "Member")`
- **Graf** trendů docházky načtený z listu `B1 Attendance`

Opětovné spuštění exportu obnoví podkladový list a vaše vzorce se aktualizují automaticky.

## Plánování pravidelných exportů

Doplněk je ve výchozím nastavení spouštěn na vyžádání. Pro týdenní nebo měsíční exporty použijte časově řízené spouštěče (triggery) vestavěné do Apps Script:

1. V tabulce zvolte **Rozšíření → Apps Script** (otevře se skript svázaný s doplňkem).
2. V levém postranním panelu klikněte na ikonu **⏰ Spouštěče**.
3. Klikněte na **Přidat spouštěč** pro `exportPeople` (nebo jinou exportní funkci), zvolte *Časově řízený*, *Týdenní časovač*, např. *Každé pondělí v 6:00*.

Export běží na pozadí pod vaším Google účtem. Pokud je klíč API změněn nebo odvolán, spouštěč vám při příštím selhání pošle e-mail.

## Oprávnění a soukromí

- Doplněk vyžaduje pouze `spreadsheets.currentonly` (může přistupovat jen k tabulce, ve které je otevřen) a `script.external_request` (aby `UrlFetchApp` mohl volat API B1). **Nevidí** váš Disk, Gmail ani jiná data Google.
- Klíč API pro B1 se ukládá pro každého uživatele zvlášť. Ostatní editoři stejné tabulky ho nemohou vidět.
- Všechna volání API B1 probíhají přes HTTPS s hlavičkou `Authorization: Bearer cak_…`.

## Řešení potíží

- **„No API key set“** (Klíč API není nastaven) – otevřete **Rozšíření → B1 Export → Připojit…** a vložte klíč.
- **„B1 rejected the API key (401)“** (B1 odmítl klíč API) – klíč byl odvolán nebo je chybný. Vytvořte nový a vložte ho.
- **„This API key lacks permission for /giving/donations (403)“** (Tento klíč API nemá oprávnění pro /giving/donations) – klíč nemá `donations:read`. Upravte oprávnění klíče v B1Admin.
- **List se po spuštění neobnoví** – ujistěte se, že se díváte na *správný* název listu (`B1 People` atd.). Export list vytvoří, pokud ještě neexistoval.
- **„Quota exceeded“** (Překročen limit) – Apps Script omezuje denní kvóty pro `UrlFetchApp` na uživatele (obvykle tisíce volání denně). Velká církev s mnoha záznamy může potřebovat rozdělit exporty do více dnů, nebo pro synchronizaci s velkým objemem použít [Make](./make) nebo vlastní integraci.

## Úprava doplňku

Doplněk je open source. Projekt Apps Script je v repozitáři `B1Integrations/GoogleSheetsAddon/`. Pokud chcete sloupec, který neexportujeme, další datovou sadu nebo jiný výstupní formát, otevřete tam issue nebo pull request.

## Viz také

- [Zapier](./zapier) – pro synchronizaci v reálném čase místo exportu na vyžádání
- [Make](./make) – pro synchronizaci se složitějšími transformacemi
- [Klíče API (referenční příručka pro vývojáře)](/docs/developer/api/api-keys)
