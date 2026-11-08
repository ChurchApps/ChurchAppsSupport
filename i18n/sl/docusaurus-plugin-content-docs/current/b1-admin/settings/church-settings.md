---
title: "Nastavitve cerkve"
description: "Na strani Nastavitve cerkve v B1 Admin nastavite ime, naslov, poddomeno, časovni pas, obliko regije, ponudnika SMS-sporočil in shranjevanje datotek za svojo cerkev."
---

# Nastavitve cerkve

<div class="article-intro">

Stran Nastavitve cerkve je mesto, kjer nastavite osnovne podatke o svoji cerkvi, kontaktne podatke in celostno podobo. Ti podatki se uporabljajo v vseh orodjih ChurchApps, vključno s spletnim mestom B1.church in aplikacijo B1 App.

</div>

## Videoposnetek za usposabljanje

<YouTube id="634zSbzDkYA" title="Nastavitev podatkov in celostne podobe cerkve v B1" next="Vloge, dovoljenja in povabilo ekipe v B1" nextUrl="/docs/b1-admin/settings/roles-permissions" />

<div class="prereqs">
<h4>Preden začnete</h4>

- Potrebujete dovoljenje »Uredi nastavitve cerkve«. Če nimate dostopa, glejte [Vloge in dovoljenja](./roles-permissions.md).
- Pripravite naslov cerkve, kontaktne podatke in logotip

</div>

## Urejanje podatkov o cerkvi

1. V aplikaciji B1 Admin odprite [meni Jump](../introduction.md#getting-around-with-the-jump-menu) (iskalno polje v zgornjem levem kotu), razširite **Settings** (Nastavitve) in kliknite **Settings**.
2. V razdelku **Church Information** (Podatki o cerkvi) na vrhu strani kliknite **Edit** (Uredi).
3. Posodobite katero koli od naslednjih polj:
   - **Church Name** (Ime cerkve) -- Ime, ki se prikazuje v vseh izdelkih ChurchApps.
   - **Address** (Naslov) -- Fizični naslov vaše cerkve.
   - **Contact Information** (Kontaktni podatki) -- Telefonska številka, e-poštni naslov in drugi kontaktni podatki.
   - **Time Zone** (Časovni pas) -- Časovni pas vaše cerkve. Glejte [Časovni pas](#time-zone) spodaj.
4. Kliknite **Save** (Shrani), da uveljavite spremembe.

## Nastavitev poddomene

Vaša cerkev dobi brezplačno poddomeno **vašacerkev.1.church**. To je spletni naslov, na katerem lahko člani in obiskovalci dostopajo do spletne predstavitve vaše cerkve.

1. Na strani Settings kliknite **Edit** v razdelku **Church Information** in poiščite polje **Subdomain** (Poddomena).
2. Vnesite želeno poddomeno (na primer »gracechurch« za gracechurch.1.church).
3. Shranite spremembe.

:::info
Vaša poddomena mora biti edinstvena med vsemi cerkvami ChurchApps. Če je želeno ime že zasedeno, poskusite dodati mesto ali regijo (na primer »gracechurch-ljubljana«).
:::

Če želite, da obiskovalci dostopajo do vašega spletnega mesta prek lastne domene (na primer **`www.gracechurch.org`**), glejte [Domena po meri](./custom-domain.md).

## Nastavitev celostne podobe

Prilagodite, kako se vaša cerkev predstavlja v vseh orodjih ChurchApps:

1. Naložite **logotip cerkve** tako, da kliknete območje za logotip in izberete slikovno datoteko.
2. Dodajte dodatne **slike cerkve**, ki se uporabljajo na vašem spletnem mestu in v [mobilni aplikaciji](./mobile-app.md).

:::tip
Za najboljše rezultate uporabite logotip v formatu PNG s prozornim ozadjem. Tako bo videti dobro tako na svetlem kot na temnem ozadju.
:::

## Prvi dan v tednu

Izberite, s katerim dnem se začnejo vaši koledarji. Spustni meni **First Day of Week** (Prvi dan v tednu) v razdelku Church Information je privzeto nastavljen na **Sunday** (nedelja), vendar ga lahko nastavite na kateri koli dan. Ko ga spremenite, se upošteva v koledarskih mrežah v aplikaciji B1 Admin in na portalu za člane B1.church. Skupinski koledarji, kuratorski koledarji in urejevalnik dogodkov vedno prikažejo tedne, ki se začnejo z dnem, ki ste ga izbrali.

## Časovni pas

Spustni meni **Time Zone** v razdelku **Church Information** določa časovni pas vaše cerkve (na primer *America/Chicago*). Izberite **None** (brez), če ga želite pustiti prazno. Po shranjevanju se časovni pas prikaže v povzetku podatkov o cerkvi.

B1 uporablja ta časovni pas za splošne čase v cerkvi, na primer za opomnike o dogodkih in urnike na vaših televizorjih [FreePlay](../../freeplay/scheduled-mode/scheduling-the-calendar.md). [Urniki prijave](../attendance/setup.md#setting-a-check-in-schedule) se najprej merijo v časovnem pasu [kampusa](./campuses.md), kjer poteka bogoslužje, in le če kampus nima svojega časovnega pasu, se uporabi časovni pas cerkve. Če so vsi vaši kampusi v istem časovnem pasu, ga nastavite tako za cerkev kot za vsak kampus posebej.

## Regija (oblika datuma in telefonske številke)

Nastavitev **Region** (Regija) določa, kako se datumi in časi zapisujejo v celotnem B1. Privzeto se datumi prikazujejo v ameriški obliki (na primer »Sep 28, 2026« in »9/28/2026«). Cerkve zunaj ZDA lahko preklopijo na svojo obliko. Če na primer izberete angleščino (Združeno kraljestvo), se namesto tega prikaže »28 Sept 2026« in »28/09/2026«.

1. Na strani Settings kliknite **Region** na seznamu na levi, nato pa kliknite **Edit** v razdelku **Region**.
2. V spustnem meniju **Region** izberite svojo regijo. Vsaka možnost prikazuje vzorčni datum, tako da natančno vidite, kako bodo datumi videti.
3. Kliknite **Save**.

Razdelek Region nato prikaže izbrano regijo, vzorec **Date format** (oblika datuma) in vašo obliko **Phone numbers** (telefonske številke).

### Oblika telefonskih številk

Isti razdelek Region vsebuje nastavitev **Phone numbers**, ki določa, kako se telefonske številke vnašajo v zapis osebe:

- **International (with country code)** (Mednarodna, s klicno kodo) -- privzeto. Polja za telefonske številke prikažejo izbirnik zastave države in številke shranijo s klicno kodo (na primer +1 918 555 1234).
- **Local (as typed)** (Lokalna, kot vnesena) -- polja za telefonske številke postanejo navadna besedilna polja in številke shranijo natanko tako, kot jih vnesete, brez dodane klicne kode (na primer 0701 234 5678). Izberite to možnost, če vaša cerkev zapisuje številke v lokalni obliki in ne želi, da B1 doda klicno kodo.

Ko je izbrana možnost **Local**, razdelek Region poleg vaše regije prikaže tudi »Local phone numbers« (Lokalne telefonske številke).

:::tip
Pošiljanje SMS-sporočil deluje najbolje, če številke vsebujejo klicno kodo. Če pošiljate sporočila iz B1, ohranite obliko **International** ali poskrbite, da številke, ki jih vnesete v lokalnem načinu, vsebujejo klicno kodo.
:::

Vaša regija velja za datume in čase v aplikaciji B1 Admin ter na vašem spletnem mestu B1.church in portalu za člane, vključno z pridigami, objavami na blogu, skupinskimi koledarji in načrti služenja. Tako člani vidijo datume v isti obliki kot vaše osebje.

## Pošiljanje SMS-sporočil {#texting}

Povežite ponudnika SMS-sporočil, da lahko iz aplikacije B1 Admin pošljete SMS-sporočilo posamezni osebi ali celotni skupini. Sporočila se pošiljajo prek vašega lastnega računa pri ponudniku, zato veljajo njegove cene in omejitve.

1. Na strani Settings kliknite **Texting** na seznamu na levi, nato pa kliknite **Edit** v razdelku **Texting**.
2. Izberite **Provider** (Ponudnik):
   - **Clearstream** -- vnesite **API Key** (Ključ API). Ustvarite ga v svojih nastavitvah računa Clearstream v razdelku API Keys.
   - **Text In Church** -- vnesite **API Key** (Ključ API). Najprej zaprosite za dostop do razvijalskega API-ja pri podpori podjetja Text In Church, nato pa ustvarite ključ v razdelku Account Settings > Developer API.
   - **Nalo Solutions** (Gana) -- kot **API Key** vnesite avtorizacijski ključ iz svojega računa Nalo Solutions, kot **Sender ID** (ID pošiljatelja) pa vnesite ID, ki ga je Nalo odobril za vas (do 11 znakov).
   - **Twilio** -- uporabite lasten račun Twilio svoje cerkve; Twilio vam zaračuna neposredno. Kopirajte **Account SID** in **Auth Token** iz [konzole Twilio](https://console.twilio.com) ter vnesite **From Number** (Številka pošiljatelja) -- telefonsko številko Twilio, registrirano za A2P 10DLC, v obliki, kot je `+15551234567`. Po shranjevanju prilepite URL za prejeta sporočila (glejte spodaj) v polje **A message comes in** (Sporočilo prispe) za številko v Twilio, tako da se odgovori STOP zabeležijo tudi v B1.
3. Kliknite **Save**.

Če želite prenehati s pošiljanjem SMS-sporočil, nastavite **Provider** na **None** (brez) in shranite. S tem se shranjeni ponudnik odstrani.

### Odjava oseb, ki odgovorijo STOP

Ko je ponudnik shranjen, znova odprite razdelek Texting s **Edit**. Pod nastavitvami ponudnika se prikaže polje samo za branje **Inbound (STOP) webhook URL** s spletnim naslovom, ki je edinstven za vašo cerkev. Kliknite polje, da izberete naslov, ga kopirajte in prilepite v nastavitev za prejeta sporočila (odgovore) webhook pri svojem ponudniku SMS-sporočil. To deluje z vsemi zgoraj navedenimi ponudniki, ki lahko dohodne odgovore posredujejo prek webhooka.

Nato, ko nekdo odgovori **STOP** (ali STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT, OPTOUT ali REVOKE) na eno od vaših sporočil, B1 poišče vse, katerih mobilna številka se ujema, jih označi kot odjavljene in izklopi njihove SMS-opomnike. Nato jih pri skupinskih sporočilih preskoči. Drugi odgovori se prezrejo.

:::info
To uporablja isto nastavitev odjave kot **Hide me from the member directory** (Skrij me iz imenika članov), zato so osebe, ki odgovorijo STOP, na svojem profilu označene tudi kot **Hidden from directory** (Skrito v imeniku). Polje se prikaže le, ko je izbran shranjen ponudnik. Če v spustnem meniju preklopite na drugega ponudnika, najprej shranite spremembe, da znova vidite URL.
:::

Ko je ponudnik povezan, osebe z dovoljenjem za pošiljanje sporočil na strani skupine vidijo gumb **Text** (Sporočilo) z napisom **Text this group** (Pošlji sporočilo tej skupini), na strani osebe z mobilnim telefonom pa gumb **Send text message** (Pošlji SMS-sporočilo). Vnesite sporočilo in kliknite **Send** (Pošlji). Pogovorno okno šteje znake in SMS-segmente. Pri skupini pred pošiljanjem prikaže, koliko članov bo prejelo sporočilo:

- Člani brez mobilne številke v evidenci so preskočeni.
- Člani, ki so izbrali **Hide me from the member directory**, se štejejo kot odjavljeni in so preskočeni.
- Družinski člani, ki delijo isto mobilno številko, prejmejo sporočilo le enkrat.

### Personalizacija sporočil s polji za združevanje {#personalizing-texts-with-merge-fields}

Pod poljem za sporočilo pogovorno okno Text prikaže oznake mest za vsebino: **First Name** (Ime), **Last Name** (Priimek), **Display Name** (Prikazno ime) in **Church Name** (Ime cerkve). Kliknite oznako, da na mesto kazalke vstavite ustrezno oznako (`{{firstName}}`, `{{lastName}}`, `{{displayName}}` ali `{{churchName}}`). Ob pošiljanju se vsaka oznaka nadomesti s podatki posameznega prejemnika, zato skupinsko sporočilo, kot je `Živjo {{firstName}}, se vidimo v nedeljo!`, pride do vsakega člana z njegovim imenom. Oznake delujejo tako pri skupinskih sporočilih kot pri sporočilih posamezni osebi. Pri sporočilih skupini je na voljo tudi oznaka **Group Name** (Ime skupine) (`{{groupName}}`), ki se nadomesti z imenom skupine.

Če želite ponovno uporabiti sporočilo, ga shranite kot [predlogo sporočila](./email-templates.md#text-templates) (predloga e-pošte s kategorijo **Text**) in ga izberite v polju **Load Template (optional)** (Naloži predlogo, neobvezno) na vrhu okna Text.

:::info
Omejitev 1.600 znakov velja za sporočilo, kot ga vnašate. Potem ko se oznake nadomestijo, se vsako besedilo, daljše od 1.600 znakov, skrajša na to dolžino.
:::

Sporočila se lahko pošljejo tudi samodejno iz koraka [poteka dela](../serving/workflows.md#sending-a-text) z dejanjem **Send Text**, ki uporablja istega ponudnika in ista polja za vsebino.

## Shranjevanje datotek

Datoteke, ki jih naložite na svoje spletno mesto (prek [Datotek](../website/files.md)) in v druga območja z vsebino, privzeto uporabljajo brezplačno gostovanje B1 z do 100 MB prostora. Če potrebujete več prostora, lahko namesto tega povežete lasten oblačni prostor. Nove datoteke se nato shranjujejo neposredno na vaš račun brez omejitve platforme.

1. Na strani Settings kliknite **File Storage** na seznamu na levi, nato pa kliknite **Edit** v razdelku **File Storage**.
2. Izberite ponudnika: **Google Drive**, **Dropbox**, **OneDrive** ali **S3-compatible bucket** (AWS S3, Cloudflare R2, Backblaze B2 itd.).
3. Za Google Drive, Dropbox ali OneDrive kliknite **Connect** (Poveži) in se prijavite ter odobrite dostop. Za shrambo S3 vnesite svoj ključ za dostop, skrivni ključ, ime shrambe (bucket) in osnovni javni URL.
4. Kliknite **Save**.

:::info
To vpliva le na nove datoteke, naložene v Datoteke na vašem spletnem mestu in podobna območja z vsebino. Slike iz galerije, sličice, logotipi in fotografije oseb vedno ostanejo v privzeti shrambi B1.
:::

## Napredovanje v razred

Če sledite **Grade** (razredu) pri otrocih in študentih, lahko B1 samodejno vse dvigne v višji razred na datum, ki ga izberete (na primer 1. avgust), namesto da bi morali vsak profil urejati ročno.

1. Na strani Settings kliknite **Grade Promotion** na seznamu na levi, nato pa kliknite **Edit** v razdelku **Grade Promotion**.
2. Vklopite stikalo (prikaže **Enabled**) in izberite **Month** (mesec) ter **Day** (dan), na katera se bodo razredi vsako leto napredovali. Na ta dan se vsak z razredom premakne v višji razred, osmošolci pa postanejo **Graduated** (diplomanti).
3. Shranite spremembe.

Če želite samodejno napredovanje ustaviti, izklopite stikalo, da prikazuje **Disabled** (Onemogočeno), in shranite. Datum napredovanja se odstrani, razredi pa se ne bodo več spreminjali sami od sebe.

## Prijava za prostovoljce {#volunteer-signup}

Privzeto si člani, ki pregledujejo [prijave za prostovoljce](../../b1-church/serving/volunteer-signup.md), ogledajo vse prihajajoče tedne, v katerih so prosta mesta. Če je seznam dolg, lahko namesto tega prikažete le naslednji teden za vsako vrsto načrta.

1. Na strani Settings kliknite **Volunteer Signup** na seznamu na levi, nato pa kliknite **Edit** v razdelku **Volunteer Signup**.
2. Vklopite možnost **Show only the next week of each plan type** (Prikaži samo naslednji teden za vsako vrsto načrta).
3. Shranite spremembe.

Ko je to vklopljeno, vsaka vrsta načrta prikaže le svoj naslednji prihajajoči načrt. Naslednji teden se prikaže, ko ta datum mine. Vrstica **Weeks shown** (Prikazani tedni) v razdelku prikaže **Only the next week of each plan type** (Le naslednji teden za vsako vrsto načrta) ali **All upcoming weeks** (Vsi prihajajoči tedni).

## Zasebnost darovanj {#giving-privacy}

Osebe z dostopom do darovanj običajno vidijo skupne zneske darovanj osebe na njenem [zapisu osebe](../people/adding-people.md#editing-details). Če ne želite, da se zneski ob vsakem odprtju zapisa prikazujejo na zaslonu, jih lahko skrijete, dokler jih nekdo ne zahteva.

1. Na strani Settings kliknite **Giving privacy** na seznamu na levi, nato pa kliknite **Edit** v razdelku **Giving privacy**.
2. Vklopite možnost **Hide giving on person records until clicked** (Skrij darovanja na zapisih oseb, dokler ne kliknete).
3. Shranite spremembe.

Ko je to vklopljeno, kartica darovanj na zapisu osebe prikaže »Giving is hidden on person records« (Darovanja so na zapisih oseb skrita). Kliknite **Show giving** (Prikaži darovanja), da naložite in prikažete darovanja te osebe. Ko odprete zapis druge osebe, se znova skrijejo. S tem se ne spremeni, kdo lahko vidi darovanja: kartico vidijo le osebe z dostopom do darovanj.

## Uvoz in izvoz

Povezava **Import/Export** pod imenom vaše cerkve na strani Settings odpre namensko orodje v novem brskalniškem oknu. Uporabite ga za:

- uvoz podatkov o članih iz drugega sistema za upravljanje cerkve;
- izvoz podatkov ChurchApps za varnostno kopijo ali selitev.

To je še posebej koristno, ko cerkev prvič nastavljate in morate obstoječe zapise prenesti v ChurchApps.

:::warning
Pred uvozom podatkov vedno najprej varnostno kopirajte obstoječe zapise. Uvozne operacije dodajajo podatke v sistem in lahko ustvarijo podvojene vnose, če se izvedejo večkrat.
:::
