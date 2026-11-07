---
title: "Nastavitve mobilne aplikacije"
description: "Za mobilno aplikacijo B1.church v B1 Admin nastavite zavihke za krmarjenje, ploščice na začetnem zaslonu, poziv za prijavo ter zasebnost imenika članov."
---

# Nastavitve mobilne aplikacije

<div class="article-intro">

Stran Nastavitve mobilne aplikacije vam omogoča, da nastavite navigacijske zavihke, ki se prikažejo v **mobilni izkušnji B1.church (PWA)** za člane vaše cerkve. Nadzorujete, kateri zavihki so vidni, kam vodijo in kako so prikazani.

</div>

## Video za usposabljanje

<YouTube id="ydY7WGK16fE" title="Prilagajanje aplikacije za člane vaše cerkve v B1" />

:::info Izvorna aplikacija B1 Mobile je zastarela
Zavihki, nastavljeni tukaj, se prikazujejo prek [progresivne spletne aplikacije B1.church (PWA)](/docs/b1-church/getting-started/installing-pwa), ki je nadomestila izvorno aplikacijo B1 Mobile. Članom delite stran za namestitev vaše cerkve — `https://yourchurchname.b1.church/mobile/install` — ki jih vodi skozi namestitev aplikacije v njihovo napravo, brez potrebe po prenosu iz trgovine App Store ali Google Play.
:::

<div class="prereqs">
<h4>Preden začnete</h4>

- Potrebujete dovoljenje „Edit Church Settings“. Če nimate dostopa, si oglejte [Vloge in dovoljenja](./roles-permissions.md).
- Najprej nastavite [nastavitve cerkve](./church-settings.md), vključno z imenom cerkve in blagovno znamko

</div>

## Dostop do nastavitev navigacije

1. V B1 Admin odprite [meni za hitro iskanje](../introduction.md#getting-around-with-the-jump-menu) (iskalno polje v zgornjem levem kotu) in razširite **Mobile**.
2. Kliknite **Navigation** (`/mobile/navigation`).
3. Stran Navigation prikazuje vaše trenutne zavihke aplikacije.

## Dodajanje novega zavihka

1. Kliknite gumb **Add Tab** na vrhu strani.
2. Izpolnite podrobnosti zavihka:
   - **Name** -- Oznaka, ki se prikaže na zavihku (na primer „Sermons“ ali „Give“).
   - **Icon** -- Kliknite izbirnik ikon, da izberete ikono za svoj zavihek.
   - **Image** -- Kliknite **Select Image** (ali **Change Image**), da zavihku dodate fotografijo. Zavihki s fotografijo se na začetnem zaslonu aplikacije prikažejo kot ploščice s fotografijo -- glejte [Ploščice na začetnem zaslonu](#home-screen-tiles).
   - **Tab Type** -- Izberite med možnostmi, kot so Bible, Live Stream, Donation, Website in druge.
   - **URL** -- Vnesite spletni naslov, na katerega naj zavihek vodi.
   - **Visibility** -- Nadzorujete, kdo lahko vidi ta zavihek (vsi, samo člani itd.). Pri zavihku **Member Directory** to določa le, kdo vidi sam zavihek; kdo lahko odpre imenik, nastavite z možnostjo **Show in Directory** na strani Member portal (glejte [Nastavitve imenika članov in sporočanja](#member-directory--messaging-settings)).
3. Kliknite **Save Tab**, da zavihek dodate v svojo aplikacijo.

## Urejanje obstoječega zavihka

1. Kliknite kateri koli obstoječi zavihek na seznamu **App Tabs**.
2. Posodobite ime zavihka, ikono, URL, vrsto ali nastavitve vidnosti.
3. Kliknite **Save Tab**, da uveljavite spremembe.

## Spreminjanje vrstnega reda zavihkov

Spremenite lahko vrstni red, v katerem se zavihki prikazujejo v mobilni aplikaciji. Zavihke v seznamu povlecite in spustite, da jih preuredite. Vrstni red, prikazan na tej strani, je enak vrstnemu redu, ki ga bodo člani videli v aplikaciji.

:::info
Nekateri zavihki se lahko samodejno prikažejo, ko so izpolnjeni določeni pogoji -- na primer zavihek Live Stream se lahko prikaže, ko je prenos aktiven. Ročno dodani zavihki vam dajejo popoln nadzor nad tem, kaj člani vidijo ves čas.
:::

:::tip
Število zavihkov naj bo obvladljivo. Za večino cerkva dobro deluje tri do pet zavihkov. Preveč zavihkov lahko člane zmede pri krmarjenju.
:::

## Nastavitve imenika članov in sporočanja

Element **Member portal** v istem razdelku Mobile vsebuje nastavitve, ki urejajo imenik članov in zasebno sporočanje v izkušnji B1.church:

- **Directory Approval Group** -- Skupina, ki pregleda posodobitve imenika članov in [zahtevke za izbris računa](../profile/account-deletion.md), preden začnejo veljati.
- **Show in Directory** -- Kdo lahko odpre imenik članov in kdo je v njem naveden: **Admins Only**, **Members and Above** (privzeto), **Regular Attendees and Above** ali **Visitors and Above**. Osebe, katerih status članstva je nižji od ravni, ki jo izberete, imenika ne vidijo in v njem niso navedene. **Admins Only** zapre imenik za vse razen za osebje z dovoljenjem People &gt; View (sam status osebja Staff ni dovolj), ki lahko imenik vedno odprejo in vidijo vse, ne glede na to nastavitev. Gostje nikoli niso vključeni, saj tisti, ki se spletno samoregistrirajo, začnejo kot gostje.
- **Visibility Preference** -- Določi privzeto nastavitev za celotno cerkev za člane, ki še niso izbrali lastne. **Address**, **Phone Number** in **Email** imajo vsak svoj spustni meni s spodnjimi petimi ravnmi, ki so na voljo povsod, kjer se nastavlja vidnost:
  - **Everyone** -- vidno komur koli, vključno z anonimnimi obiskovalci
  - **Members** -- vidno samo osebam z zapisom Member ali Staff
  - **Groups Only** -- vidno samo osebam, ki si s to osebo delijo skupino, in osebju
  - **My Group Leaders and Staff** -- vidno samo vodjem skupine, katere član je ta oseba, in osebju
  - **Staff Only** -- vidno samo osebju (vsakomur, katerega status članstva je Staff, ali kdo ima dovoljenje People &gt; View) ter samemu članu

  „Osebje“ v teh ravneh pomeni vsakogar, katerega status članstva je Staff, ali kdo ima dovoljenje People &gt; View. Spremembe skupin začnejo veljati takoj: kdo se pridruži skupini ali postane vodja skupine, lahko vidi ustrezne podatke članov te skupine z ravnmi **Groups Only** ali **My Group Leaders and Staff**, ne da bi se moral odjaviti in znova prijaviti.

  Člani lahko te privzete nastavitve za svoj zapis prepišejo na zavihku **Privacy** svojega profila v PWA B1.church -- glejte [Urejanje profila](/docs/b1-church/getting-started/me-page).
- **Minimum Age for Private Messages** -- Nadzor za zaščito otrok. B1 ne bo odprl **novega** zasebnega pogovora, če je katera od oseb mlajša od te starosti, na podlagi datuma rojstva (če datum rojstva ni shranjen, se uporabi vloga v gospodinjstvu). Ljudje, mlajši od te starosti, ostajajo v imeniku v celoti vidni -- blokirano je samo neposredno sporočanje, in sicer **v obe smeri**, za vse, tudi za osebje. Skupinski pogovori in sporočanje staršem otrok še vedno delujejo. Na voljo so možnosti Off, 13, 16 ali 18; privzeto je **18**. Obstoječih pogovorov to ne vpliva.

:::tip
Ker se preverjanje najnižje starosti opira na datume rojstva, poskrbite, da so datumi rojstva izpolnjeni za otroke v vaši občini. Ta nastavitev spada v isto družino nadzora za zaščito otrok kot [nadzor varnosti pri prijavi](../attendance/checkin-safety.md).
:::

### Poziv k prijavi na začetnem zaslonu

Obiskovalci, ki odprejo [začetni zaslon](/docs/b1-church/getting-started/navigating#home) aplikacije, ne da bi se prijavili, vidijo kratek poziv -- privzeto *„Prijavite se in si oglejte svoje skupine, darovanja in več.“* -- poleg gumba **Sign In**. Nastavitve **Home screen sign-in prompt** na isti strani Member portal (`/mobile/b1-mobile`) vam omogočajo, da jih spremenite:

- **Show sign-in prompt on the app home screen** -- Izklopite to možnost, če želite na začetnem zaslonu skriti tako poziv kot gumb **Sign In**. Obiskovalci se lahko še vedno prijavijo prek menija aplikacije.
- **Sign-in prompt text** -- Zamenjajte privzeto besedilo s svojim sporočilom (do 150 znakov). Če polje pustite prazno, se uporabi privzeto besedilo. To polje je onemogočeno, dokler je poziv izklopljen.

Kliknite **Save**, da uveljavite spremembe. Sporočilo **Saved** potrdi spremembo. Shranjevanje osveži predpomnjene nastavitve aplikacije, zato se sprememba prikaže, ko se začetni zaslon naslednjič naloži.

### Ploščice na začetnem zaslonu

Zavihki, ki imajo fotografijo (glejte **Image** pod [Dodajanje novega zavihka](#adding-a-new-tab)), se na [začetnem zaslonu](/docs/b1-church/getting-started/navigating#home) aplikacije prikažejo kot ploščice s fotografijami v razdelku z imenom vaše cerkve. To vključuje zavihek Verse of the Day, če mu dodelite fotografijo. Zavihki s fotografijami se prikažejo tudi v vrstici zavihkov.

Nastavitev **Home screen tiles** na isti strani Member portal (`/mobile/b1-mobile`) določa postavitev teh ploščic. Izberite **Layout**:

- **Grid** -- Dve ploščici v vrstici (privzeto). Če je število ploščic liho, prva ploščica zavzame celotno širino.
- **Scrolling row** -- Ena vrstica ploščic, po kateri člani drsijo vstran.
- **Scrolling (automatic)** -- Enaka vrstica, ki pa se tudi sama premika in približno vsaki štiri sekunde preskoči na naslednjo ploščico ter se na koncu vrne na začetek. Premikanje se ustavi, ko se član dotakne vrstice, se nad njo premakne z miško ali se z tipko Tab premakne vanjo, nato pa se nadaljuje nekaj sekund pozneje. Na napravah z nastavljenim zmanjšanim gibanjem vrstica miruje in deluje kot **Scrolling row**.
- **List** -- Seznam z majhno sličico fotografije ob imenu vsakega zavihka.

Kliknite **Save**, da uveljavite spremembe.

### Razdelki na začetnem zaslonu

Prijavljeni člani vedno vidijo svojo zgodovino obiskov in oddane obrazce na [strani Me](/docs/b1-church/getting-started/me-page). Stikala **Home screen sections** na isti strani Member portal (`/mobile/b1-mobile`) lahko te podatke prikažejo tudi na začetnem zaslonu:

- **Show My Attendance on Home** -- Doda razdelek **My Attendance** s številom obiskov člana v zadnjih 90 dneh, njegovima dvema zadnjima obiskoma in povezavo **History** do celotnega seznama obiskov.
- **Show My Forms on Home** -- Doda razdelek **My Forms** z dvema zadnjima oddanima obrazcema člana in povezavo **All forms**.

Obe možnosti sta privzeto izklopljeni. Razdelek se prikaže samo prijavljenim članom, ki imajo vsaj en zapis za prikaz. Kliknite **Save**, da uveljavite spremembe.

## Kje se ti zavihki prikazujejo

Zavihki, ki jih nastavite tukaj, se prikazujejo v **PWA B1.church**, ki jo člani namestijo z vsake strani na `https://yourchurchname.b1.church`. Spremembe, ki jih naredite na tej strani, se prikažejo, ko člani naslednjič odprejo aplikacijo.

Na telefonu spodnja vrstica zavihkov prikazuje **Home**, do tri vaše zavihke in **More**; na računalniku glava prikazuje do pet zavihkov. Vgrajeni zasloni (na primer Sermons, Giving ali Groups) dobijo mesta najprej, zavihki **Internal Page** pa zapolnijo preostala prosta mesta. Zavihki **External URL** in **Verse of the Day** nikoli ne dobijo mesta v vrstici. Vsak zavihek, tudi tisti, ki v vrstico ne sodi, je naveden na strani **More** v aplikaciji. Za to, kaj vidijo člani, glejte [Krmarjenje po B1App](/docs/b1-church/getting-started/navigating). (Zavihke za člane, ki še uporabljajo zastarelo izvorno aplikacijo [B1 Mobile](/docs/b1-church/index.md), prikazuje tudi ta aplikacija, vendar je ta zastarela in se ne posodablja več.)

## Naslednji koraki

- [Nastavitve cerkve](./church-settings.md) -- Nastavite podatke o cerkvi in blagovno znamko
- [Vloge in dovoljenja](./roles-permissions.md) -- Upravljajte dostop za svojo ekipo
