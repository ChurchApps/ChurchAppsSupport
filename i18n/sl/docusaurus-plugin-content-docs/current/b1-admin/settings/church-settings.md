---
title: "Nastavitve cerkve"
description: "Na strani Nastavitve cerkve v B1 Admin nastavite ime, naslov, poddomeno, časovni pas, obliko regije, ponudnika SMS-ov in shranjevanje datotek za vašo cerkev."
---

# Nastavitve cerkve

<div class="article-intro">

Stran Nastavitve cerkve je mesto, kjer nastavite osnovne podatke o svoji cerkvi, kontaktne podatke in vizualno podobo. Ti podatki se uporabljajo v vseh orodjih ChurchApps, vključno s spletno stranjo B1.church in aplikacijo B1 Mobile.

</div>

## Video za usposabljanje

<YouTube id="634zSbzDkYA" title="Nastavitev podatkov o cerkvi in vizualne podobe v B1" next="Vloge, dovoljenja in povabilo ekipe v B1" nextUrl="/docs/b1-admin/settings/roles-permissions" />

<div class="prereqs">
<h4>Preden začnete</h4>

- Potrebujete dovoljenje »Edit Church Settings« (Uredi nastavitve cerkve). Če nimate dostopa, glejte [Vloge in dovoljenja](./roles-permissions.md).
- Pripravite naslov, kontaktne podatke in logotip svoje cerkve

</div>

## Urejanje podatkov o cerkvi

1. V aplikaciji B1 Admin odprite [meni Jump](../introduction.md#getting-around-with-the-jump-menu) (iskalna vrstica v zgornjem levem kotu), razširite **Nastavitve** in kliknite **Nastavitve**.
2. V razdelku **Church Information** (na vrhu strani) kliknite **Uredi**.
3. Posodobite katero koli od naslednjih polj:
   - **Church Name** -- Ime cerkve, ki je prikazano v vseh izdelkih ChurchApps.
   - **Address** -- Fizični naslov vaše cerkve.
   - **Contact Information** -- Telefonska številka, e-pošta in drugi kontaktni podatki.
   - **Time Zone** -- Časovni pas vaše cerkve. Glejte [Časovni pas](#time-zone) spodaj.
4. Kliknite **Shrani**, da uveljavite spremembe.

## Nastavitev poddomene

Vaša cerkev dobi brezplačno poddomeno **yourchurch.1.church**. To je spletni naslov, kjer lahko člani in obiskovalci dostopajo do spletne predstavitve vaše cerkve.

1. Na strani Nastavitve kliknite **Uredi** v razdelku **Church Information** in poiščite polje **Subdomain** (poddomena).
2. Vnesite želeno poddomeno (na primer „gracechurch“ za gracechurch.1.church).
3. Shranite spremembe.

:::info
Vaša poddomena mora biti edinstvena med vsemi cerkvami ChurchApps. Če je želeno ime zasedeno, poskusite dodati ime svojega mesta ali zvezne države (na primer „gracechurch-dallas“).
:::

Če želite, da obiskovalci pridejo na vašo stran prek lastne domene (na primer **`www.gracechurch.org`**), glejte [Lastna domena](./custom-domain.md).

## Nastavitev vizualne podobe

Prilagodite, kako se vaša cerkev prikazuje v vseh orodjih ChurchApps:

1. Naložite **logotip cerkve** tako, da kliknete območje logotipa in izberete slikovno datoteko.
2. Dodajte dodatne **slike cerkve**, ki se uporabljajo na vaši spletni strani in v [mobilni aplikaciji](./mobile-app.md).

:::tip
Za najboljše rezultate uporabite logotip v formatu PNG s prosojnim ozadjem. Tako bo lepo izgledal tako na svetlem kot na temnem ozadju.
:::

## Prvi dan v tednu

Izberite, s katerim dnem se začnejo vaši koledarji. Spustni meni **First Day of Week** v razdelku Church Info je privzeto nastavljen na **Sunday** (nedelja), vendar ga lahko nastavite na kateri koli dan. Ko ga spremenite, se upošteva v koledarskih mrežah v aplikaciji B1 Admin in na portalu za člane B1.church. Koledarji skupin, izbrani koledarji in urejevalnik dogodkov vsi postavijo tedne tako, da se začnejo z izbranim dnem.

## Časovni pas

Spustni meni **Time Zone** v razdelku **Church Information** nastavi časovni pas vaše cerkve (na primer *America/Chicago*). Izberite **None**, če želite pustiti polje prazno. Po shranjevanju se časovni pas prikaže v povzetku podatkov o cerkvi.

B1 uporablja ta časovni pas za čase, ki veljajo za celotno cerkev, na primer opomnike za dogodke in urnike na vaših televizorjih [FreePlay](../../freeplay/scheduled-mode/scheduling-the-calendar.md). [Urniki prijave](../attendance/setup.md#setting-a-check-in-schedule) se najprej merijo v časovnem pasu [kampusa](./campuses.md), na katerem poteka bogoslužje. Časovni pas cerkve se uporabi samo, če kampus nima svojega. Če so vsi vaši kampusi v istem časovnem pasu, ga nastavite tako za cerkev kot za vsak kampus.

## Regija (format datuma in telefona)

Nastavitev **Region** določa, kako so datumi in časi zapisani v celotnem B1. Privzeto se datumi prikazujejo v ameriškem formatu (na primer „Sep 28, 2026“ in „9/28/2026“). Cerkve zunaj ZDA lahko preklopijo na svoj format. Če izberete English (United Kingdom), se namesto tega prikaže „28 Sept 2026“ in „28/09/2026“.

1. Na strani Nastavitve kliknite **Region** na seznamu na levi, nato kliknite **Uredi** v razdelku **Region**.
2. Izberite svojo regijo v spustnem meniju **Region**. Vsaka možnost prikazuje vzorčni datum, da lahko natančno vidite, kako bodo datumi izgledali.
3. Kliknite **Shrani**.

Razdelek Region nato prikaže izbrano regijo, vzorec **Date format** (oblike datuma) in vašo obliko **Phone numbers** (telefonske številke).

### Oblika telefonskih številk

Isti razdelek Region vsebuje nastavitev **Phone numbers**, ki določa, kako se telefonske številke vnašajo v zapis osebe:

- **International (with country code)** -- privzeto. Polja za telefon prikažejo izbirnik zastavic držav in shranijo številke s klicno kodo države (na primer +1 918 555 1234).
- **Local (as typed)** -- polja za telefon postanejo navadna besedilna polja in shranijo številke natanko tako, kot jih vnesete, brez dodane klicne kode države (na primer 0701 234 5678). To izberite, če vaša cerkev zapisuje številke v lokalni obliki in ne želi, da B1 dodaja klicno kodo države.

Ko je izbrana možnost **Local**, razdelek Region poleg vaše regije prikaže tudi »Local phone numbers«.

:::tip
Pošiljanje SMS-ov najbolje deluje, če številke vsebujejo klicno kodo države. Če pošiljate SMS-e iz B1, ohranite obliko **International** ali poskrbite, da številke, ki jih vnesete v načinu Local, vsebujejo klicno kodo države.
:::

Vaša regija velja za datume in čase v celotnem B1 Admin ter na vaši spletni strani B1.church in portalu za člane. To vključuje pridige, objave v blogu, koledarje skupin in načrte služenja, tako da člani vidijo datume v isti obliki kot vaše osebje.

## Pošiljanje SMS-ov {#texting}

Povežite ponudnika SMS-ov, da lahko iz aplikacije B1 Admin pošiljate SMS-sporočila posamezni osebi ali celotni skupini. Sporočila se pošiljajo prek vašega lastnega računa pri ponudniku, zato veljajo njegove cene in omejitve.

1. Na strani Nastavitve kliknite **Texting** na seznamu na levi, nato kliknite **Uredi** v razdelku **Texting**.
2. Izberite **Provider** (ponudnika):
   - **Clearstream** -- vnesite **API Key**. Ustvarite ga v nastavitvah računa Clearstream pod API Keys.
   - **Text In Church** -- vnesite **API Key**. Najprej zaprosite podporo Text In Church za dostop do razvijalskega API-ja, nato ustvarite ključ v razdelku Account Settings > Developer API.
   - **Nalo Solutions** (Gana) -- kot **API Key** vnesite avtentikacijski ključ iz svojega računa Nalo Solutions ter **Sender ID** (do 11 znakov), ki ga je Nalo odobril za vas.
   - **Twilio** -- uporabite lasten račun Twilio svoje cerkve. Twilio vam zaračuna neposredno. Iz [konzole Twilio](https://console.twilio.com) kopirajte **Account SID** in **Auth Token**, nato vnesite **From Number**, to je telefonsko številko Twilio, registrirano za A2P 10DLC, v obliki kot `+15551234567`. Po shranjevanju prilepite URL dohodnega webhooka (glejte spodaj) v polje **A message comes in** za to številko v Twilio, da se odgovori STOP zabeležijo tudi v B1.
3. Kliknite **Shrani**.

Za prenehanje pošiljanja SMS-ov nastavite **Provider** na **None** in shranite. S tem se shranjeni ponudnik odstrani.

### Odjava oseb, ki odgovorijo STOP

Ko je ponudnik shranjen, znova odprite razdelek Texting z **Uredi**. Pod nastavitvami ponudnika polje **Inbound (STOP) webhook URL**, ki je samo za branje, prikazuje spletni naslov, edinstven za vašo cerkev. Kliknite polje, da izberete naslov, ga kopirajte in prilepite v nastavitev za dohodna (odgovorna) sporočila webhook pri svojem ponudniku SMS-ov. To deluje pri vseh zgoraj naštetih ponudnikih, ki lahko posredujejo dohodne odgovore na webhook.

Ko nekdo odgovori **STOP** (ali STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT, OPTOUT ali REVOKE) na eno od vaših sporočil, B1 poišče vse, katerih mobilna številka se ujema. Te osebe označi kot odjavljene in izklopi njihove SMS-opomnike. Nato so preskočene pri skupinskih sporočilih. Drugi odgovori se prezrejo.

:::info
To uporablja isto nastavitev odjave kot **Hide me from the member directory**, zato so osebe, ki odgovorijo STOP, na svojem profilu prikazane tudi kot **Hidden from directory**. Polje se prikaže samo, ko je izbran shranjeni ponudnik. Če v spustnem meniju preklopite na drugega ponudnika, najprej shranite, da znova vidite naslov URL.
:::

Ko je ponudnik povezan, osebje z dovoljenjem za pošiljanje sporočil na strani skupine vidi gumb **Text** (**Text this group**), na strani osebe z mobilno telefonsko številko pa gumb **Send text message**. Vnesite sporočilo in kliknite **Send**. Pogovorno okno šteje znake in SMS-segmente. Pri skupini pred pošiljanjem prikaže, koliko članov bo prejelo sporočilo:

- Člani brez mobilne številke v evidenci so preskočeni.
- Člani, ki so izbrali **Hide me from the member directory**, so šteti kot odjavljeni in preskočeni.
- Družinski člani, ki delijo mobilno številko, prejmejo sporočilo samo enkrat.

### Personalizacija sporočil s spremenljivkami {#personalizing-texts-with-merge-fields}

Pod poljem za sporočilo okno Text prikaže žetone z oznakami: **First Name**, **Last Name**, **Display Name** in **Church Name**. Kliknite žeton, da na mesto kurzorja vstavite njegovo oznako (`{{firstName}}`, `{{lastName}}`, `{{displayName}}` ali `{{churchName}}`). Ko se sporočilo pošlje, se vsaka oznaka zamenja s podatki prejemnika. Tako skupinsko sporočilo, kot je `Živjo {{firstName}}, se vidimo v nedeljo!`, pride do vsakega člana z njegovim imenom. Oznake delujejo tako pri skupinskih sporočilih kot pri sporočilih posamezni osebi. Pri sporočilih skupini je na voljo tudi žeton **Group Name** (`{{groupName}}`), ki se zamenja z imenom skupine.

Za ponovno uporabo sporočila ga shranite kot [predlogo sporočila](./email-templates.md#text-templates) (predloga e-pošte s kategorijo **Text**) in ga izberite pri **Load Template (optional)** na vrhu okna Text.

:::info
Omejitev 1.600 znakov velja za sporočilo, ko ga vnašate. Potem ko se oznake zamenjajo, se vsako besedilo, daljše od 1.600 znakov, odreže na tej dolžini.
:::

Sporočila se lahko samodejno pošljejo tudi iz koraka [delovnega procesa](../serving/workflows.md#sending-a-text) z dejanjem **Send Text**. To dejanje uporablja istega ponudnika in iste oznake.

## Shramba datotek

Privzeto datoteke, ki jih naložite na svojo spletno stran (prek [Datoteke](../website/files.md)) in v druga območja vsebine, uporabljajo brezplačno gostovano shrambo B1, do 100 MB. Če potrebujete več prostora, lahko namesto tega povežete lastno oblačno shrambo. Nove naložitve nato gredo neposredno na vaš račun brez omejitve platforme.

1. Na strani Nastavitve kliknite **File Storage** na seznamu na levi, nato kliknite **Uredi** v razdelku **File Storage**.
2. Izberite ponudnika: **Google Drive**, **Dropbox**, **OneDrive** ali **S3-compatible bucket** (AWS S3, Cloudflare R2, Backblaze B2 itd.).
3. Za Google Drive, Dropbox ali OneDrive kliknite **Connect** in se prijavite, da odobrite dostop. Za S3-compatible bucket vnesite svoj ključ za dostop, skrivni ključ, ime bucketa in osnovni javni URL.
4. Kliknite **Shrani**.

:::info
To vpliva samo na nove naložitve na datoteke vaše spletne strani in podobna območja vsebine. Slike iz galerije, sličice, logotipi in fotografije oseb vedno ostanejo v privzeti shrambi B1.
:::

## Napredovanje razredov

Če pri otrocih in učencih vodite **Grade** (razred), lahko B1 vse samodejno premakne za en razred na datum, ki ga izberete (na primer 1. avgust). Tako vam ni treba vsakega profila urejati ročno.

1. Na strani Nastavitve kliknite **Grade Promotion** na seznamu na levi, nato kliknite **Uredi** v razdelku **Grade Promotion**.
2. Vklopite stikalo (prikaže **Enabled**) in izberite **Month** in **Day**, na katerega se razredi napredujejo vsako leto. Na ta datum se vsak z razredom premakne za en razred višje, učenci 12. razreda pa dobijo status **Graduated**.
3. Shranite spremembe.

Za izklop samodejnega napredovanja izklopite stikalo, da prikazuje **Disabled**, in shranite. Datum napredovanja se odstrani in razredi se ne bodo več spreminjali sami od sebe.

## Prijava za prostovoljce {#volunteer-signup}

Privzeto člani, ki pregledujejo [prijave za prostovoljce](../../b1-church/serving/volunteer-signup.md), vidijo vsak prihajajoči teden, v katerem so prosta mesta. Če je ta seznam dolg, lahko namesto tega prikažete samo naslednji teden za vsak tip načrta.

1. Na strani Nastavitve kliknite **Volunteer Signup** na seznamu na levi, nato kliknite **Uredi** v razdelku **Volunteer Signup**.
2. Vklopite **Show only the next week of each plan type** (prikaži samo naslednji teden za vsak tip načrta).
3. Shranite spremembe.

Ko je to vklopljeno, vsak tip načrta prikaže samo svoj naslednji prihajajoči načrt. Naslednji teden se prikaže, ko ta datum mine. Vrstica **Weeks shown** v razdelku prikaže **Only the next week of each plan type** ali **All upcoming weeks**.

## Zasebnost darovanj {#giving-privacy}

Osebe z dostopom do darovanj običajno vidijo skupne zneske darovanj na [zapisu osebe](../people/adding-people.md#editing-details). Če ne želite, da so zneski na zaslonu ob vsakem odpiranju zapisa, jih lahko skrijete, dokler kdo ne zahteva.

1. Na strani Nastavitve kliknite **Giving privacy** na seznamu na levi, nato kliknite **Uredi** v razdelku **Giving privacy**.
2. Vklopite **Hide giving on person records until clicked** (skrij darovanja na zapisih oseb, dokler ni kliknjeno).
3. Shranite spremembe.

Ko je to vklopljeno, kartica darovanj na zapisu osebe prikaže »Darovanja so na zapisih oseb skrita.« Kliknite **Show giving**, da naložite in prikažete darovanja te osebe. Ko odprete drugo osebo, se skrije znova. Kdo lahko vidi darovanja, se ne spremeni: kartico vidijo samo osebe z dostopom do darovanj.

## Uvoz in izvoz

Povezava **Import/Export** pod imenom vaše cerkve na strani Nastavitve odpre namensko orodje v novem oknu brskalnika. Uporabite ga za:

- Uvoz podatkov o članih iz drugega sistema za upravljanje cerkve.
- Izvoz podatkov ChurchApps za varnostno kopijo ali selitev.

To je še posebej koristno, ko cerkev prvič nastavljate in morate obstoječe zapise prenesti v ChurchApps.

:::warning
Pred uvozom podatkov vedno najprej varnostno kopirajte obstoječe zapise. Uvozne operacije dodajajo podatke v sistem in lahko ob večkratnem zagonu ustvarijo podvojene vnose.
:::
