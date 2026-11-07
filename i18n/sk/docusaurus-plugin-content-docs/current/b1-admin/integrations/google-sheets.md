---
title: "Google Sheets"
---

# Google Sheets

<div class="article-intro">

**B1 Export** je oficiálny doplnok pre Google Sheets od B1.church. Pridáva bočný panel do ľubovoľnej tabuľky, ktorá exportuje ľudí, dary, skupiny alebo účasť z vášho cirkevného účtu B1 do pomenovaných hárkov – na požiadanie, jedným kliknutím. Doplnok beží úplne v rámci Google účtu používateľa; okrem služobných API volaní len na čítanie, ktoré každý export vykoná, nijak nezasahuje do serverov ChurchApps.

</div>

<div class="prereqs">
<h4>Predtým, ako začnete</h4>

- Účet Google s právom úpravy tabuľky, do ktorej chcete exportovať
- Správca cirkvi (alebo niekto s prístupom na čítanie k údajom, ktoré chcete exportovať), ktorý dokáže vytvoriť kľúč API B1
- Doplnok B1 Export nainštalovaný z Google Workspace Marketplace

</div>

## Čo sa exportuje

| Položka ponuky | Hárok | Údaje |
|---|---|---|
| Exportovať ľudí | `B1 People` | ID, Display Name, First, Last, Email, Membership Status |
| Exportovať dary | `B1 Donations` | ID, Person ID, Date, Amount, Method, Batch ID |
| Exportovať skupiny | `B1 Groups` | ID, Name, Category, Member Count |
| Exportovať účasť | `B1 Attendance` | ID, Person ID, Visit Date, Service ID, Group ID |

Každý export **nahradí** obsah svojho pomenovaného hárka – opätovné spustenie exportu vám dá čerstvý snímok, nie pripojené riadky. Ostatné hárky v tabuľke zostanú nedotknuté.

## Nastavenie

### 1. Vytvorte kľúč API B1 so správnymi oprávneniami

1. V B1Admin prejdite na **Settings → Developer → API Keys** (Nastavenia → Vývojár → Kľúče API).
2. Kliknite na **New API Key**, pomenujte ho „Sheets Export“ a udeľte oprávnenia **read** pre to, čo plánujete exportovať:
   - `people:read` pre export ľudí
   - `donations:read` pre dary
   - `groups:read` pre skupiny
   - `attendance:read` pre účasť
3. Kľúč, ktorý slúži len na exporty, **nepotrebuje** `settings:write` – toto oprávnenie je určené len pre konektory, ktoré registrujú webhooky (Zapier / Make). Udržujte tento kľúč čo najužší.
4. Uložte a skopírujte kľúč `cak_…`.

### 2. Nainštalujte doplnok

1. Otvorte tabuľku, do ktorej chcete exportovať.
2. **Extensions → Add-ons → Get add-ons** (Rozšírenia → Doplnky → Získať doplnky).
3. Vyhľadajte **B1 Export** a nainštalujte ho. Google vás požiada o udelenie prístupu k vašim tabuľkám a k externým HTTP požiadavkám (aby doplnok mohol volať API B1).

Po inštalácii sa položka **B1 Export** zobrazí v ponuke **Extensions** (Rozšírenia) každej tabuľky, ktorú otvoríte s týmto účtom Google.

### 3. Pripojte kľúč

1. **Extensions → B1 Export → Connect…** (alebo **B1 Export → Connect…** z panela ponuky po prvom otvorení).
2. Vložte kľúč API do bočného panela, ponechajte Base URL ako `https://api.churchapps.org` (pokiaľ netestujete na staging prostredí) a kliknite na **Save**.
3. Kliknite na **Test Connection** – zelený nápis „Connection OK“ potvrdí, že kľúč funguje.

Kľúč sa ukladá do **vlastností jednotlivých používateľov** (`PropertiesService.getUserProperties()`) – je viazaný na váš účet Google, nikdy sa nezapisuje do tabuľky a nie je viditeľný pre ostatných editorov tabuľky.

## Spustenie exportu

Buď:

- **Z ponuky** – **Extensions → B1 Export → Export People** (alebo Donations / Groups / Attendance)
- **Z bočného panela** – otvorte bočný panel (Connect…) a kliknite na tlačidlo príslušného súboru údajov

Po dokončení sa zobrazí správa – „_N_ riadok(ov) zapísaných do 'B1 People'.“

## Tvorba reportov nad údajmi

Exportované hárky sú bežné údaje Google Sheets. Vlastnú analytiku budujte odkazovaním na tieto hárky:

- **Súhrnný hárok** so vzorcom `=SUMIF('B1 Donations'!E:E, "card", 'B1 Donations'!D:D)` na sčítanie darov platobnou kartou
- **Filtrovaný pohľad** len na členov pomocou `=FILTER('B1 People'!A:F, 'B1 People'!F:F = "Member")`
- **Graf** trendov účasti čerpajúci z hárka `B1 Attendance`

Opätovné spustenie exportu obnoví základný hárok; vaše vzorce sa aktualizujú automaticky.

## Plánovanie opakovaných exportov

Doplnok je predvolene spúšťaný na požiadanie. Pre týždenné alebo mesačné exporty použite vstavané časovo riadené spúšťače Apps Script:

1. **Extensions → Apps Script** v tabuľke (otvorí sa naviazaný skript doplnku).
2. Kliknite na ikonu **⏰ Triggers** (Spúšťače) v ľavom bočnom paneli.
3. **Add Trigger** pre `exportPeople` (alebo ľubovoľnú exportnú funkciu) – zvoľte *Time-driven* (Podľa času), *Week timer* (Týždenný časovač), napríklad *Every Monday 6am* (Každý pondelok o 6:00).

Export beží na pozadí pod vaším účtom Google. Ak sa kľúč API zmení alebo zruší, spúšťač vám pri ďalšom zlyhaní pošle e-mail.

## Oprávnenia a ochrana súkromia

- Doplnok žiada len `spreadsheets.currentonly` (môže pracovať iba s tabuľkou, v ktorej je otvorený) a `script.external_request` (aby `UrlFetchApp` mohol volať API B1). **Nevidí** váš Disk, Gmail ani iné údaje Google.
- Kľúč API B1 sa ukladá pre jednotlivého používateľa – ostatní editori tej istej tabuľky ho nevidia.
- Všetky volania API B1 prebiehajú cez HTTPS s hlavičkou `Authorization: Bearer cak_…`.

## Riešenie problémov

- **„No API key set“** (Nie je nastavený kľúč API) – otvorte **Extensions → B1 Export → Connect…** a vložte kľúč.
- **„B1 rejected the API key (401)“** (B1 odmietol kľúč API) – kľúč bol zrušený alebo je nesprávny. Vytvorte ho znova a vložte.
- **„This API key lacks permission for /giving/donations (403)“** (Tento kľúč API nemá oprávnenie pre /giving/donations) – kľúč nemá `donations:read`. Aktualizujte oprávnenia kľúča v B1Admin.
- **Hárok sa po spustení neobnoví** – skontrolujte, že sa pozeráte na *správny* názov hárka (`B1 People` atď.). Export vytvorí hárok, ak neexistoval.
- **„Quota exceeded“** (Prekročená kvóta) – Apps Script ukladá na `UrlFetchApp` denné kvóty pre jednotlivých používateľov (zvyčajne tisíce volaní denne). Veľká cirkev s mnohými záznamami môže potrebovať rozdeliť exporty na viac dní alebo použiť [Make](./make) / vlastnú integráciu na synchronizáciu s veľkým objemom údajov.

## Prispôsobenie doplnku

Doplnok je open source – projekt Apps Script sa nachádza v repozitári `B1Integrations/GoogleSheetsAddon/`. Ak chcete stĺpec, ktorý neexportujeme, ďalší súbor údajov alebo iný výstupný formát, otvorte issue alebo PR v tomto repozitári.

## Pozri tiež

- [Zapier](./zapier) – pre synchronizáciu v reálnom čase namiesto exportu na požiadanie
- [Make](./make) – pre synchronizáciu so zložitejšími transformáciami
- [API Keys (developer reference)](/docs/developer/api/api-keys) (Kľúče API – referencia pre vývojárov)
