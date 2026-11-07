---
title: "Google Sheets"
---

# Google Sheets

<div class="article-intro">

**B1 Export** er den officielle Google Sheets-tilføjelse til B1.church. Den tilføjer en sidepanel til ethvert regneark, der eksporterer personer, donationer, grupper eller fremmøde fra din B1-kirke til navngivne faner — efter behov, med ét klik. Tilføjelsen kører helt inde i brugerens Google-konto; den rører ikke ChurchApps' servere ud over de skrivebeskyttede API-kald, hver eksport foretager.

</div>

<div class="prereqs">
<h4>Før du begynder</h4>

- En Google-konto med redigeringsadgang til det regneark, du vil eksportere til
- En kirkeadministrator (eller nogen med læseadgang til de data, du vil eksportere), som kan oprette en B1 API-nøgle
- B1 Export-tilføjelsen installeret fra Google Workspace Marketplace

</div>

## Hvad den eksporterer

| Menupunkt | Regnearksfane | Data |
|---|---|---|
| Eksportér personer | `B1 People` | ID, Visningsnavn, Fornavn, Efternavn, E-mail, Medlemsstatus |
| Eksportér donationer | `B1 Donations` | ID, Person-ID, Dato, Beløb, Metode, Batch-ID |
| Eksportér grupper | `B1 Groups` | ID, Navn, Kategori, Antal medlemmer |
| Eksportér fremmøde | `B1 Attendance` | ID, Person-ID, Besøgsdato, Gudstjeneste-ID, Gruppe-ID |

Hver eksport **erstatter** indholdet i den navngivne fane — gentagelse af en eksport giver dig et nyt øjebliksbillede, ikke tilføjede rækker. Andre faner i regnearket berøres ikke.

## Opsætning

### 1. Opret en B1 API-nøgle med de rigtige tilladelser

1. Gå i B1Admin til **Indstillinger → Udvikler → API-nøgler**.
2. Klik på **Ny API-nøgle**, giv den navnet "Sheets Export", og tildel **læse**-tilladelserne til det, du vil eksportere:
   - `people:read` til eksport af personer
   - `donations:read` til donationer
   - `groups:read` til grupper
   - `attendance:read` til fremmøde
3. En nøgle, der kun bruges til eksport, har **ikke** brug for `settings:write` — den tilladelse er kun til connectors, der registrerer webhooks (Zapier / Make). Hold denne nøgle snæver.
4. Gem og kopiér nøglen `cak_…`.

### 2. Installér tilføjelsen

1. Åbn det regneark, du vil eksportere til.
2. **Udvidelser → Tilføjelser → Hent tilføjelser**.
3. Søg efter **B1 Export** og installér den. Google beder dig give adgang til dine regneark og til eksterne HTTP-kald (så tilføjelsen kan kalde B1 API'et).

Efter installationen vises en **B1 Export**-post under menuen **Udvidelser** i alle regneark, du åbner med denne Google-konto.

### 3. Forbind nøglen

1. **Udvidelser → B1 Export → Forbind…** (eller **B1 Export → Forbind…** i menulinjen efter første åbning).
2. Indsæt API-nøglen i sidepanelet, lad Base-URL'en stå som `https://api.churchapps.org` (medmindre du tester mod staging), og klik på **Gem**.
3. Klik på **Test forbindelse** — en grøn besked "Forbindelse OK" bekræfter, at nøglen virker.

Nøglen gemmes i **brugerspecifikke egenskaber** (`PropertiesService.getUserProperties()`) — den er knyttet til din Google-konto, bliver aldrig skrevet ind i regnearket og er aldrig synlig for andre redigerere af regnearket.

## Kørsel af en eksport

Enten:

- **Fra menuen** — **Udvidelser → B1 Export → Eksportér personer** (eller donationer / grupper / fremmøde)
- **Fra sidepanelet** — åbn sidepanelet (Forbind…) og klik på den relevante datasætknap

En besked bekræfter, når eksporten er færdig — "_N_ række(r) skrevet til 'B1 People'."

## Opbygning af rapporter ovenpå

De eksporterede faner er almindelige Google Sheets-data. Byg dine egne analyser ved at referere til fanerne:

- En **oversigtsfane** med `=SUMIF('B1 Donations'!E:E, "card", 'B1 Donations'!D:D)` til at summere gaver via kort
- En **filtreret visning** af kun medlemmer med `=FILTER('B1 People'!A:F, 'B1 People'!F:F = "Member")`
- Et **diagram** over fremmødetendenser, der henter data fra `B1 Attendance`

Når eksporten køres igen, opdateres den underliggende fane; dine formler opdateres automatisk.

## Planlægning af gentagne eksporter

Tilføjelsen kører som standard efter behov. Til ugentlige eller månedlige eksporter bruger du Apps Scripts indbyggede tidsbaserede triggere:

1. **Udvidelser → Apps Script** i regnearket (dette åbner tilføjelsens tilknyttede script).
2. Klik på **⏰ Triggere**-ikonet i venstre sidepanel.
3. **Tilføj trigger** for `exportPeople` (eller en anden eksportfunktion) — vælg *Tidsbaseret*, *Ugentlig timer*, f.eks. *Hver mandag kl. 6*.

Eksporten kører i baggrunden under din Google-konto. Hvis API-nøglen roteres eller tilbagekaldes, sender triggeren dig en e-mail, næste gang den fejler.

## Tilladelser og privatliv

- Tilføjelsen anmoder kun om `spreadsheets.currentonly` (den kan kun få adgang til det regneark, den er åbnet i) og `script.external_request` (så `UrlFetchApp` kan kalde B1 API'et). Den ser **ikke** dit Drev, din Gmail eller andre Google-data.
- B1 API-nøglen gemmes pr. bruger — andre redigerere af samme regneark kan ikke se den.
- Alle B1 API-kald foretages over HTTPS med `Authorization: Bearer cak_…`.

## Fejlfinding

- **"No API key set"** — åbn **Udvidelser → B1 Export → Forbind…** og indsæt nøglen.
- **"B1 rejected the API key (401)"** — nøglen er tilbagekaldt eller forkert. Opret en ny og indsæt den igen.
- **"This API key lacks permission for /giving/donations (403)"** — nøglen mangler `donations:read`. Opdatér nøglens tilladelser i B1Admin.
- **Regnearket opdateres ikke** efter kørsel — kontroller, at du kigger på det *korrekte* fanenavn (`B1 People` osv.). Eksporten opretter fanen, hvis den ikke findes.
- **"Quota exceeded"** — Apps Script pålægger daglige kvoter pr. bruger for `UrlFetchApp` (typisk tusindvis af kald pr. dag). En stor kirke med mange poster kan have brug for at fordele eksporter over flere dage eller bruge [Make](./make) / en skræddersyet integration til synkronisering med stort volumen.

## Tilpasning af tilføjelsen

Tilføjelsen er open source — Apps Script-projektet ligger i repoet `B1Integrations/GoogleSheetsAddon/`. Hvis du ønsker en kolonne, vi ikke eksporterer, et ekstra datasæt eller et andet outputformat, så åbn et issue eller en PR dér.

## Se også

- [Zapier](./zapier) — til synkronisering i realtid frem for eksport efter behov
- [Make](./make) — til synkronisering med mere komplekse transformationer
- [API-nøgler (udviklerreference)](/docs/developer/api/api-keys)
