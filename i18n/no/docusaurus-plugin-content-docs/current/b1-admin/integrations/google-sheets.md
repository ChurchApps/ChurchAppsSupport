---
title: "Google Sheets"
---

# Google Sheets

<div class="article-intro">

**B1 Export** er det offisielle Google Sheets-tillegget for B1.church. Det legger til en sidefelt til et regneark som eksporterer mennesker, donasjoner, grupper eller frammøte fra kirka di til navngitte faner — på etterspørsel, med ett klikk. Tillegget kjører helt inne i brukerens Google-konto; ingenting om det berører ChurchApps-servere utover de skrivebeskyttede API-kall hver eksport gjør.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- En Google-konto med redigeringsprivilegier til regnearket du vil eksportere til
- En kirkeadministrator (eller noen med lesetilgang til dataene du vil eksportere) som kan opprette en B1 API-nøkkel
- B1 Export-tillegget installert fra Google Workspace Marketplace

</div>

## Hva det eksporterer

| Menyelement | Regnearkfane | Data |
|---|---|---|
| Eksporter mennesker | `B1 People` | ID, Visningsnavn, Fornavn, Etternavn, E-post, Medlemskapsstatus |
| Eksporter donasjoner | `B1 Donations` | ID, Person-ID, Dato, Beløp, Metode, Batch-ID |
| Eksporter grupper | `B1 Groups` | ID, Navn, Kategori, Antall medlemmer |
| Eksporter frammøte | `B1 Attendance` | ID, Person-ID, Besøksdag, Service-ID, Gruppe-ID |

Hver eksport **erstatter** innholdet i sin navngitte fane — kjøring av en eksport på nytt gir deg et nytt øyeblikksbilde, ikke tilføyde rader. Andre faner i regnearket er uberørte.

## Oppsett

### 1. Opprett en B1 API-nøkkel med riktige scoper

1. I B1Admin gå til **Innstillinger → Utviklernavn → API-nøkler**.
2. Klikk **Ny API-nøkkel**, gi den navnet "Sheets Export", og gi de **lese**-scopene for det du planlegger å eksportere:
   - `people:read` for eksport av mennesker
   - `donations:read` for donasjoner
   - `groups:read` for grupper
   - `attendance:read` for frammøte
3. En nøkkel som bare gjør eksporter behøver **ikke** `settings:write` — det scopet er bare for koblinger som registrerer webhooks (Zapier / Make). Behold denne nøkkelen snever.
4. Lagre og kopier `cak_…`-nøkkelen.

### 2. Installere tillegget

1. Åpne regnearket du vil eksportere til.
2. **Utvidelser → Tillegg → Få tillegg**.
3. Søk etter **B1 Export** og installere det. Google ber deg om å gi tilgang til arkene dine og til ekstern HTTP (slik at tillegget kan ringe B1 API).

Etter installasjon vises en **B1 Export**-oppføring under **Utvidelser**-menyen i hvert regneark du åpner med denne Google-kontoen.

### 3. Koble nøkkelen

1. **Utvidelser → B1 Export → Koble til…** (eller **B1 Export → Koble til…** fra menylinja etter første åpning).
2. Lim inn API-nøkkelen i sidefeltet, la Base URL være `https://api.churchapps.org` (hvis du ikke tester mot staging), og klikk **Lagre**.
3. Klikk **Testforbindelse** — en grønn "Forbindelse OK" bekrefter at nøkkelen fungerer.

Nøkkelen er lagret i **per-bruker-egenskaper** (`PropertiesService.getUserProperties()`) — den er knyttet til Google-kontoen din, aldri skrevet inn i arket, og aldri synlig for andre redigerer av regnearket.

## Kjør en eksport

Enten:

- **Fra menyen** — **Utvidelser → B1 Export → Eksporter mennesker** (eller donasjoner / grupper / frammøte)
- **Fra sidefeltet** — åpne sidefeltet (Koble til…) og klikk på riktig datasett-knapp

En kunngjøring bekrefter når det er ferdig — "_N_ rad(er) skrevet til 'B1 People'."

## Bygge rapporter på toppen

De eksporterte fanene er vanlige Google Sheets-data. Bygg dine egne analyser på referanser-faner:

- En **oppsummeringsfane** med `=SUMIF('B1 Donations'!E:E, "card", 'B1 Donations'!D:D)` for å totalt kort-gaver
- En **filtret visning** av bare medlemmer med `=FILTER('B1 People'!A:F, 'B1 People'!F:F = "Member")`
- Et **diagram** over frammøte-trender som trekker fra `B1 Attendance`

Kjøring av eksport på nytt oppdaterer underliggende fane; formlene dine oppdateres automatisk.

## Planlegging av gjentakende eksporter

Tillegget er på etterspørsel som standard. For ukentlige eller månedlige eksporter bruker du Apps Scripts innebygde tidsdrevne utløsere:

1. **Utvidelser → Apps Script** i regnearket (dette åpner tilleggets bundne script).
2. Klikk **⏰ Utløsere**-ikonet i venstre sidefelt.
3. **Legg til utløser** for `exportPeople` (eller en annen eksportfunksjon) — velg *Tidsdrevet*, *Uketimer*, f.eks. *Hver mandag 06:00*.

Eksport kjører i bakgrunnen under Google-kontoen din. Hvis API-nøkkelen roteres eller tilbakekalles, e-posten-utløseren deg neste gang den mislykkes.

## Tillatelser og personvern

- Tillegget ber bare om `spreadsheets.currentonly` (den kan bare berøre regnearket den er åpen i) og `script.external_request` (slik at `UrlFetchApp` kan ringe B1 API). Det **ser ikke** Drive-, Gmail- eller andre Google-data.
- B1 API-nøkkelen er lagret per-bruker — andre redigerere av samme regneark kan ikke se den.
- Alle B1 API-kall blir gjort over HTTPS med `Authorization: Bearer cak_…`.

## Problemløsing

- **"Ingen API-nøkkel satt"** — åpne **Utvidelser → B1 Export → Koble til…** og lim inn nøkkelen.
- **"B1 avviste API-nøkkelen (401)"** — nøkkelen ble tilbakekalt eller er feil. Opprett på nytt og lim inn på nytt.
- **"Denne API-nøkkelen mangler tillatelse for /giving/donations (403)"** — nøkkelen har ikke `donations:read`. Oppdater nøkkelens scoper i B1Admin.
- **Arket ikke oppdatert** etter kjøring — kontroller at du ser på *riktig* fane-navn (`B1 People` osv.). Eksport oppretter fanen hvis den ikke eksisterte.
- **"Kvote overskredet"** — Apps Script pålegger per-bruker daglige kvotaer på `UrlFetchApp` (vanligvis tusenvis av anrop per dag). En stor kirke med mange poster kan trenge å dele eksporter på tvers av flere dager eller bruke [Make](./make) / en tilpasset integrasjon for høyvolum-sync.

## Tilpasse tillegget

Tillegget er åpen kildekode — Apps Script-prosjektet lever i `B1Integrations/GoogleSheetsAddon/`-repoet. Hvis du vil ha en kolonne vi ikke eksporterer, et ekstra datasett, eller et annet utdataformat, åpne en issue eller PR der.

## Se også

- [Zapier](./zapier) — for sanntidssync i stedet for eksport på etterspørsel
- [Make](./make) — for sync med mer komplekse transformasjoner
- [API-nøkler (utviklerreferanse)](/docs/developer/api/api-keys)
