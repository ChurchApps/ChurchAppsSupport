---
title: "Google Sheets"
---

# Google Sheets

<div class="article-intro">

**B1 Export** je uradni dodatek za Google Sheets za B1.church. Dodaja stransko vrstico v katero koli preglednico, ki iz vaše cerkve B1 izvozi osebe, donacije, skupine ali udeležbo v poimenovane zavihke — na zahtevo, z enim klikom. Dodatek deluje povsem znotraj Google računa uporabnika; razen za branje podatkov prek API-ja, ki ga zahteva vsak izvoz, se nič v zvezi z njim ne dotika strežnikov ChurchApps.

</div>

<div class="prereqs">
<h4>Preden začnete</h4>

- Google račun z urejevalnimi pravicami do preglednice, v katero želite izvoziti podatke
- Skrbnik cerkve (ali nekdo z dostopom za branje podatkov, ki jih želite izvoziti), ki lahko ustvari API ključ za B1
- Dodatek B1 Export, nameščen iz Google Workspace Marketplace

</div>

## Kaj se izvozi

| Element menija | Zavihek preglednice | Podatki |
|---|---|---|
| Izvozi osebe | `B1 People` | ID, Display Name, First, Last, Email, Membership Status |
| Izvozi donacije | `B1 Donations` | ID, Person ID, Date, Amount, Method, Batch ID |
| Izvozi skupine | `B1 Groups` | ID, Name, Category, Member Count |
| Izvozi udeležbo | `B1 Attendance` | ID, Person ID, Visit Date, Service ID, Group ID |

Vsak izvoz **nadomesti** vsebino svojega poimenovanega zavihka — ponovni zagon izvoza da svež posnetek, ne pa dodanih vrstic. Drugi zavihki v preglednici ostanejo nespremenjeni.

## Nastavitev

### 1. Ustvarite API ključ za B1 z ustreznimi dovoljenji

1. V B1Admin pojdite na **Settings → Developer → API Keys**.
2. Kliknite **New API Key**, ključ poimenujte »Sheets Export« in dodelite dovoljenja **read** za tisto, kar nameravate izvažati:
   - `people:read` za izvoz oseb
   - `donations:read` za donacije
   - `groups:read` za skupine
   - `attendance:read` za udeležbo
3. Ključ, ki je namenjen samo izvozom, **ne** potrebuje `settings:write` — to dovoljenje je potrebno samo za konektorje, ki registrirajo webhooke (Zapier / Make). Naj bo ta ključ čim ožji.
4. Shranite in kopirajte ključ `cak_…`.

### 2. Namestite dodatek

1. Odprite preglednico, v katero želite izvažati.
2. **Extensions → Add-ons → Get add-ons**.
3. Poiščite **B1 Export** in ga namestite. Google vas bo prosil, da dovolite dostop do vaših preglednic in do zunanjih HTTP zahtevkov (da lahko dodatek kliče API B1).

Po namestitvi se unos **B1 Export** prikaže pod menijem **Extensions** v vsaki preglednici, ki jo odprete s tem Google računom.

### 3. Povežite ključ

1. **Extensions → B1 Export → Connect…** (ali **B1 Export → Connect…** v menijski vrstici po prvem odprtju).
2. Prilepite API ključ v stransko vrstico, pustite Base URL kot `https://api.churchapps.org` (razen če testirate na staging okolju) in kliknite **Save**.
3. Kliknite **Test Connection** — zelena oznaka »Connection OK« potrdi, da ključ deluje.

Ključ je shranjen v **uporabniških lastnostih** (`PropertiesService.getUserProperties()`) — vezan je na vaš Google račun, nikoli ni zapisan v preglednico in ga drugi urejevalci preglednice ne vidijo.

## Zagon izvoza

Uporabite eno od možnosti:

- **Iz menija** — **Extensions → B1 Export → Export People** (ali Donations / Groups / Attendance)
- **Iz stranske vrstice** — odprite stransko vrstico (Connect…) in kliknite ustrezen gumb za nabor podatkov

Ko je izvoz končan, se prikaže obvestilo — »_N_ vrstic zapisanih v 'B1 People'.«

## Gradnja poročil na podlagi izvoza

Izvoženi zavihki so običajni podatki Google Sheets. Lastne analize gradite z sklicevanjem na te zavihke:

- **Povzetek** z `=SUMIF('B1 Donations'!E:E, "card", 'B1 Donations'!D:D)` za seštevek darov s kartico
- **Filtriran pogled** samo na člane z `=FILTER('B1 People'!A:F, 'B1 People'!F:F = "Member")`
- **Grafikon** trendov udeležbe, ki črpa podatke iz `B1 Attendance`

Ponovni izvoz osveži osnovni zavihek; vaše formule se posodobijo samodejno.

## Načrtovanje ponavljajočih se izvozov

Dodatek je privzeto namenjen izvozu na zahtevo. Za tedenske ali mesečne izvoze uporabite časovne sprožilce, ki so vgrajeni v Apps Script:

1. **Extensions → Apps Script** v preglednici (to odpre skripto, vezano na dodatek).
2. Kliknite ikono **⏰ Triggers** v levi stranski vrstici.
3. **Add Trigger** za `exportPeople` (ali katero koli funkcijo izvoza) — izberite *Time-driven*, *Week timer*, npr. *Every Monday 6am*.

Izvoz se izvaja v ozadju pod vašim Google računom. Če se API ključ zamenja ali prekliče, vam sprožilec ob naslednji napaki pošlje e-pošto.

## Dovoljenja in zasebnost

- Dodatek zahteva samo `spreadsheets.currentonly` (lahko dostopa le do preglednice, v kateri je odprt) in `script.external_request` (da lahko `UrlFetchApp` kliče API B1). **Ne** vidi vašega Drive-a, Gmaila ali drugih podatkov Google.
- API ključ B1 je shranjen za posameznega uporabnika — drugi urejevalci iste preglednice ga ne morejo videti.
- Vsi klici API-ja B1 potekajo prek HTTPS z `Authorization: Bearer cak_…`.

## Odpravljanje težav

- **»No API key set«** — odprite **Extensions → B1 Export → Connect…** in prilepite ključ.
- **»B1 rejected the API key (401)«** — ključ je bil preklican ali je napačen. Ustvarite novega in ga ponovno prilepite.
- **»This API key lacks permission for /giving/donations (403)«** — ključ nima dovoljenja `donations:read`. Posodobite dovoljenja ključa v B1Admin.
- **Preglednica se po zagonu ne osveži** — preverite, ali gledate *pravilen* zavihek (`B1 People` itd.). Izvoz ustvari zavihek, če ta ni obstajal.
- **»Quota exceeded«** — Apps Script omejuje dnevne kvote za `UrlFetchApp` na uporabnika (običajno nekaj tisoč klicev na dan). Večja cerkev z veliko zapisi bo morda morala izvoze razdeliti na več dni ali za sinhronizacijo z velikim obsegom uporabiti [Make](./make) ali integracijo po meri.

## Prilagajanje dodatka

Dodatek je odprtokoden — projekt Apps Script je v repozitoriju `B1Integrations/GoogleSheetsAddon/`. Če želite stolpec, ki ga ne izvažamo, dodaten nabor podatkov ali drugačen izhodni format, odprite issue ali PR v tem repozitoriju.

## Glej tudi

- [Zapier](./zapier) — za sinhronizacijo v realnem času namesto izvoza na zahtevo
- [Make](./make) — za sinhronizacijo z bolj zapletenimi transformacijami
- [API ključi (referenca za razvijalce)](/docs/developer/api/api-keys)
