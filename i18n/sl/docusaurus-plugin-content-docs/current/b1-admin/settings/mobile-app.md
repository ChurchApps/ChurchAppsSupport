---
title: "Nastavitve mobilne aplikacije"
description: "Nastavite navigacijske zavihke, ploščice na domačem zaslonu, poziv k prijavi in nastavitve zasebnosti imenika članov za aplikacijo za člane B1.church v programu B1 Admin."
---

# Nastavitve mobilne aplikacije

<div class="article-intro">

Stran Nastavitve mobilne aplikacije vam omogoča, da nastavite navigacijske zavihke, ki se prikažejo v **mobilni izkušnji B1.church (PWA)** za člane vaše cerkve. Nadzirate, kateri zavihki so vidni, kam vodijo in kako so prikazani.

</div>

## Video o uporabi

<YouTube id="ydY7WGK16fE" title="Prilagajanje aplikacije za člane vaše cerkve v B1" />

:::info
Zavihki, nastavljeni tukaj, se prikažejo v aplikaciji B1 App, ki jo lahko člani [namestijo kot progresivno spletno aplikacijo (PWA)](../../b1-church/getting-started/installing-pwa.md). Članom delite stran za namestitev vaše cerkve — `https://yourchurchname.b1.church/mobile/install`; ta jih vodi skozi namestitev aplikacije na njihovo napravo, brez prenosa iz trgovine App Store ali Google Play.
:::

<div class="prereqs">
<h4>Preden začnete</h4>

- Potrebujete dovoljenje »Uredi nastavitve cerkve«. Če nimate dostopa, si oglejte [Vloge in dovoljenja](./roles-permissions.md).
- Najprej nastavite [nastavitve cerkve](./church-settings.md), vključno z imenom cerkve in celostno podobo

</div>

## Dostop do navigacijskih nastavitev

1. V programu B1 Admin odprite [meni Jump](../introduction.md#getting-around-with-the-jump-menu) (iskalno polje v zgornjem levem kotu) in razširite **Mobilno**.
2. Kliknite **Navigacija** (`/mobile/navigation`).
3. Stran Navigacija prikazuje vaše trenutne zavihke aplikacije.

## Dodajanje novega zavihka

1. Na vrhu strani kliknite gumb **Dodaj zavihek**.
2. Vnesite podrobnosti zavihka:
   - **Ime** -- Oznaka, ki se prikaže na zavihku (na primer »Pridige« ali »Darovanje«).
   - **Ikona** -- Kliknite izbirnik ikon in izberite ikono za zavihek.
   - **Slika** -- Kliknite **Izberi sliko** (ali **Spremeni sliko**), da zavihku dodelite fotografijo. Zavihki s fotografijo se na domačem zaslonu aplikacije prikažejo kot fotografske ploščice -- glejte [Ploščice na domačem zaslonu](#home-screen-tiles).
   - **Vrsta zavihka** -- Izberite med možnostmi, kot so Biblija, Prenos v živo, Darovanje, Spletna stran in druge.
   - **URL** -- Vnesite spletni naslov, na katerega naj zavihek vodi.
   - **Vidnost** -- Določite, kdo lahko vidi ta zavihek (vsi, samo člani itd.). Za zavihek **Imenik članov** to določa le, kdo vidi sam zavihek; kdo lahko odpre imenik, nastavite z možnostjo **Prikaži v imeniku** na strani Portal za člane (glejte [Nastavitve imenika članov in sporočanja](#member-directory--messaging-settings)).
3. Kliknite **Shrani zavihek**, da ga dodate v aplikacijo.

## Urejanje obstoječega zavihka

1. Kliknite kateri koli obstoječi zavihek na seznamu **Zavihki aplikacije**.
2. Posodobite ime, ikono, URL, vrsto ali nastavitve vidnosti zavihka.
3. Kliknite **Shrani zavihek**, da uveljavite spremembe.

## Spreminjanje vrstnega reda zavihkov

Vrstni red, v katerem se zavihki prikažejo v mobilni aplikaciji, lahko spremenite. Zavihke povlecite in spustite na seznamu, da jih razporedite. Vrstni red, prikazan na tej strani, je enak vrstnemu redu, ki ga bodo videli vaši člani v aplikaciji.

:::info
Nekateri zavihki se lahko samodejno prikažejo, ko so izpolnjeni določeni pogoji -- na primer zavihek Prenos v živo se lahko pojavi, ko je prenos aktiven. Ročno dodani zavihki vam dajo popoln nadzor nad tem, kaj vaši člani vidijo ves čas.
:::

:::tip
Število zavihkov naj bo obvladljivo. Za večino cerkva je dobro imeti od tri do pet zavihkov. Preveč zavihkov lahko članom otežuje krmarjenje.
:::

## Nastavitve imenika članov in sporočanja

Element **Portal za člane** v istem razdelku Mobilno vsebuje nastavitve, ki urejajo imenik članov in zasebno sporočanje v izkušnji B1.church:

- **Skupina za odobritev imenika** -- Skupina, ki pregleda posodobitve imenika članov in [zahtevke za izbris računa](../profile/account-deletion.md), preden začnejo veljati.
- **Prikaži v imeniku** -- Kdo lahko odpre imenik članov in kdo je v njem naveden: **Samo skrbniki**, **Člani in višji** (privzeto), **Redni obiskovalci in višji** ali **Obiskovalci in višji**. Osebe, katerih status članstva je nižji od izbrane ravni, imenika ne vidijo in v njem niso navedene. **Samo skrbniki** zapre imenik za vse razen za osebje z dovoljenjem Ljudje > Ogled (sam status članstva Osebje ni dovolj), ki lahko imenik vedno odpre in vidi vse, ne glede na to nastavitev. Gosti nikoli niso vključeni, saj vsak, ki se spletno samostojno registrira, začne kot gost.
- **Nastavitev vidnosti** -- Določa privzeto nastavitev za celo cerkev za člane, ki še niso izbrali lastne. **Naslov**, **Telefonska številka** in **E-pošta** imajo vsak svoj spustni meni s� enakimi petimi ravnmi, ki so na voljo povsod, kjer je vidnost nastavljiva:
  - **Vsi** -- vidno vsakomur, tudi anonimnim obiskovalcem
  - **Člani** -- vidno samo osebam z zapisom Član ali Osebje
  - **Samo skupine** -- vidno samo osebam, ki si delijo skupino s to osebo, ter osebju
  - **Moji voditelji skupin in osebje** -- vidno samo voditeljem skupine, v kateri je ta oseba, ter osebju
  - **Samo osebje** -- vidno samo osebju (vsem, katerih status članstva je Osebje, ali ki imajo dovoljenje Ljudje > Ogled), ter sami osebi

  »Osebje« v teh ravneh pomeni vsakogar, čigar status članstva je Osebje, ali ki ima dovoljenje Ljudje > Ogled. Spremembe skupin začnejo veljati takoj: nekdo, ki se pridruži skupini ali postane voditelj skupine, lahko vidi ustrezne podrobnosti **Samo skupine** ali **Moji voditelji skupin in osebje** za člane te skupine, ne da bi se moral odjaviti in ponovno prijaviti.

  Člani lahko te privzete nastavitve za svoj zapis prepišejo na zavihku **Zasebnost** svojega profila v PWA B1.church -- glejte [Urejanje profila](/docs/b1-church/getting-started/me-page).
- **Najmanjša starost za zasebna sporočila** -- Nadzor za zaščito otrok. B1 ne bo odprl **novega** zasebnega pogovora, če je katera koli od oseb mlajša od te starosti, na podlagi datuma rojstva (če datum rojstva ni shranjen, se uporabi vloga v gospodinjstvu). Osebe, mlajše od te starosti, so v imeniku še vedno popolnoma vidne -- blokirano je le neposredno sporočanje, in sicer **v obe smeri**, za vse, tudi za osebje. Skupinski pogovori in sporočanje staršem otroka še vedno delujejo. Na voljo so možnosti Izklopljeno, 13, 16 ali 18; privzeto je **18**. Obstoječi pogovori niso prizadeti.

:::tip
Ker se preverjanje najmanjše starosti opira na datume rojstva, poskrbite, da bodo datumi rojstva izpolnjeni za otroke v vaši skupnosti. Ta nastavitev spada v isto družino nastavitev za zaščito otrok kot [varnostni nadzori prijave](../attendance/checkin-safety.md).
:::

### Poziv k prijavi na domačem zaslonu

Obiskovalci, ki odprejo [domači zaslon](/docs/b1-church/getting-started/navigating#home) aplikacije, ne da bi se prijavili, vidijo kratek poziv -- privzeto *»Prijavite se, da si ogledate svoje skupine, darovanja in več.«* -- poleg gumba **Prijava**. Nastavitve **Poziv k prijavi na domačem zaslonu** na isti strani Portal za člane (`/mobile/b1-mobile`) vam omogočajo, da ga spremenite:

- **Prikaži poziv k prijavi na domačem zaslonu aplikacije** -- Izklopite to možnost, če želite skriti tako poziv kot gumb **Prijava** z domačega zaslona. Obiskovalci se lahko še vedno prijavijo iz menija aplikacije.
- **Besedilo poziva k prijavi** -- Privzeto besedilo zamenjajte s svojim sporočilom (do 150 znakov). Če pustite prazno, se uporabi privzeto besedilo. To polje je onemogočeno, medtem ko je poziv izklopljen.

Kliknite **Shrani**, da uveljavite spremembe. Sporočilo **Shranjeno** potrdi spremembo. Shranjevanje osveži predpomnjene nastavitve aplikacije, zato se sprememba prikaže ob naslednjem nalaganju domačega zaslona.

### Ploščice na domačem zaslonu

Zavihki, ki imajo fotografijo (glejte **Slika** pod [Dodajanje novega zavihka](#adding-a-new-tab)), se na [domačem zaslonu](/docs/b1-church/getting-started/navigating#home) aplikacije prikažejo kot fotografske ploščice v razdelku z naslovom, ki vsebuje ime vaše cerkve. To vključuje tudi zavihek Vers dneva, če mu dodelite fotografijo. Zavihki s fotografijo se prikažejo tudi v vrstici zavihkov.

Nastavitev **Ploščice na domačem zaslonu** na isti strani Portal za člane (`/mobile/b1-mobile`) določa, kako so te ploščice razporejene. Izberite **Postavitev**:

- **Mreža** -- Dve ploščici v vrstici (privzeto). Če je število ploščic liho, prva ploščica zavzame celotno širino.
- **Drsna vrstica** -- Ena vrstica ploščic, ki jih člani drsijo v stran.
- **Drsenje (samodejno)** -- Enaka vrstica, ki pa se tudi sama premika in vsakih približno štiri sekunde preskoči na naslednjo ploščico ter se po zadnji vrne na prvo. Premikanje se ustavi, ko se član dotakne vrstice, nad njo premakne miško ali se z tipko Tab premakne v vrstico, nato pa se nadaljuje nekaj sekund pozneje. Na napravah z nastavitvijo zmanjšanega gibanja vrstica miruje in deluje kot **Drsna vrstica**.
- **Seznam** -- Seznam z majhno sličico fotografije ob imenu vsakega zavihka.

V obeh drsnih postavitvah, kadar je ploščic več, kot jih na zaslonu lahko vodoravno prikažemo, se pod ploščicami prikaže vrsta pik, po ena za vsako ploščico; pika trenutne ploščice je napolnjena. Člani se lahko dotaknejo pike, da preskočijo na določeno ploščico.

Kliknite **Shrani**, da uveljavite spremembe.

### Razdelki na domačem zaslonu

Prijavljeni člani vedno vidijo svojo zgodovino obiskov in oddane obrazce na [strani Jaz](/docs/b1-church/getting-started/me-page). Stikala **Razdelki na domačem zaslonu** na isti strani Portal za člane (`/mobile/b1-mobile`) jih lahko prikažejo tudi na domačem zaslonu:

- **Prikaži moj obisk na domači strani** -- Doda razdelek **Moj obisk**, ki prikazuje, kolikokrat je član obiskal cerkev v zadnjih 90 dneh, njegova dva najnovejša obiska in povezavo **Zgodovina** do celotnega seznama obiskov.
- **Prikaži moje obrazce na domači strani** -- Doda razdelek **Moji obrazci**, ki prikazuje njegovi dve najnovejši oddaji obrazcev in povezavo **Vsi obrazci**.

Obe možnosti sta privzeto izklopljeni. Razdelek se prikaže samo za člane, ki so prijavljeni in imajo vsaj en zapis za prikaz. Kliknite **Shrani**, da uveljavite spremembe.

## Kje se ti zavihki prikazujejo

Zavihki, ki jih nastavite tukaj, so prikazani v **PWA B1.church**, ki jo člani namestijo s katere koli strani na `https://yourchurchname.b1.church`. Spremembe, ki jih naredite na tej strani, se prikažejo, ko član naslednjič odpre aplikacijo.

Na telefonu spodnja vrstica zavihkov prikazuje **Domov**, do tri vaše zavihke in **Več**; na računalniku glava prikazuje do pet zavihkov. Vgrajeni zasloni (na primer Pridige, Darovanja ali Skupine) dobijo mesta najprej, zavihki **Notranja stran** pa zapolnijo preostala mesta. Zavihki **Zunanji URL** in **Vers dneva** nikoli ne dobijo mesta v vrstici. Vsi zavihki, tudi tisti, ki se ne prilegajo, so navedeni na strani **Več** v aplikaciji.

Izjema so zavihki, nameščeni znotraj zavihka **Mapa**: ti se prikažejo samo na zaslonu mape, ki jo član odpre s tapkanjem na mapo. Ta zaslon prikaže zavihke kot fotografske ploščice, če ima vsak od njih sliko, sicer pa kot seznam. Mapa, ki ne vsebuje nobenega zavihka, ki ga član lahko vidi, je za tega člana skrita. Glejte [Zavihki map](../../b1-church/getting-started/navigating.md#folder-tabs). Za to, kaj vidijo člani, glejte [Krmarjenje po aplikaciji B1](../../b1-church/getting-started/navigating.md).

## Naslednji koraki

- [Nastavitve cerkve](./church-settings.md) -- Nastavite podatke o cerkvi in celostno podobo
- [Vloge in dovoljenja](./roles-permissions.md) -- Upravljajte dostop za svojo ekipo
