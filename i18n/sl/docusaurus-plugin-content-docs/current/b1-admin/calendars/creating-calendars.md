---
title: "Ustvarjanje koledarjev"
description: "Ustvarite koledar v B1 Admin, povežite skupine ali uvozite datoteke .ics ter na enem mestu upravljajte njegove dogodke, prijave in opombe."
---

# Ustvarjanje koledarjev

<div class="article-intro">

Ustvarjanje koledarja v B1 Admin vam omogoča, da z povezovanjem ene ali več skupin sestavite pregledno zbirko dogodkov. Dogodke v okviru svojih skupin upravljajo vodje skupin, vaš koledar pa vse te dogodke prikazuje na enem mestu. Skrbniki z dostopom za urejanje lahko dodajajo ali urejajo dogodke za katerokoli skupino. Vodje skupin brez skrbniških pravic lahko upravljajo le dogodke skupin, ki jih vodijo.

</div>

## Video z navodili

<YouTube id="Ko3kgsCSLFs" title="Ustvarjanje koledarjev, dogodkov in rezervacij prostorov v B1" next="Event Registration and Paid Events in B1" nextUrl="/docs/b1-admin/calendars/paid-registrations" />

<div class="prereqs">
<h4>Preden začnete</h4>

- Nastavite [skupine](../groups/creating-groups.md), katerih dogodke želite vključiti v koledar
- Potrebujete skrbniški dostop do razdelka Koledarji v B1 Admin

</div>

## Ustvarjanje novega koledarja

1. V B1 Admin odprite [meni Jump](../introduction.md#getting-around-with-the-jump-menu) (iskalno polje v zgornjem levem kotu), razširite **Koledarji** in kliknite **Koledarji**.
2. Na vrhu strani kliknite **Dodaj koledar**. Pod seznamom koledarjev se odpre obrazec za nov koledar.
3. Vnesite **ime** koledarja (na primer »Dogodki mladinske skupine« ali »Glavni cerkveni koledar«).
4. Po želji dodajte **opis**, ki vaši ekipi pomaga razumeti, za kaj je koledar namenjen.
5. Kliknite **Ustvari**, da shranite novi koledar.

## Stran s podrobnostmi koledarja

Po ustvarjanju koledarja kliknite **Upravljaj dogodke** v njegovi vrstici, da odprete stran s podrobnostmi. Ta stran ima dve glavni območji:

- **Levi stolpec** -- Ime koledarja z dejanji (**Nov dogodek**, **Uredi**, **Uvozi .ics** in **Natisni**), nato seznam **Skupine v koledarju**, ki prikazuje skupine, vključene v ta koledar. Kliknite **Odstrani** ob skupini, da jo odstranite iz koledarja.
- **Glavno območje** -- Pogled **Dogodki koledarja** s dogodki iz povezanih skupin, nad katerim sta gumba **Naroči se** in **Dodaj skupino**.

## Povezovanje skupin

Skupine, ki imajo dogodke v koledarju, se samodejno prikažejo na seznamu **Skupine v koledarju** na levi strani strani s podrobnostmi.

1. Kliknite **Dodaj skupino** nad koledarjem, da skupino povežete s koledarjem.
2. Izberite skupino s spustnega seznama. Seznam vključuje vse skupine v vaši cerkvi, ne le tiste, katerih član ste.
3. Izberite, ali želite vključiti **vse dogodke** te skupine ali le **določene dogodke**.
4. Kliknite **Shrani**.

Vsak dogodek se v koledarju pojavi le enkrat. Če dodate celotno skupino, se vsi njeni dogodki, ki ste jih prej dodali posamezno, združijo v vnos skupine, izbira določenih dogodkov iz skupine, ki je že v koledarju, pa ne doda ničesar novega. Pod **Skupine v koledarju** so navedene le skupine, dodane v celoti.

### Uvoz datoteke .ics

Kliknite **Uvozi .ics**, da uvozite dogodke iz drugega koledarja. Izberite **Skupino**, ki naj bo lastnica dogodkov, nato kliknite **Izberi datoteko .ics** ali prilepite vsebino datoteke in kliknite **Uvozi**. Dogodki se ustvarijo v tej skupini, skupina pa se doda koledarju, iz katerega ste uvozili, zato se dogodki takoj prikažejo tam.

### Odstranjevanje dogodka iz koledarja

Kliknite dogodek v koledarju in nato kliknite **Odstrani iz koledarja**. To dogodek odstrani le iz tega koledarja -- sam dogodek ostane v svoji skupini. Če je dogodek v koledarju zato, ker je bila dodana cela skupina, odstranitev odstrani vse dogodke te skupine iz tega koledarja (dogodki ostanejo v skupini). Če želite dogodek trajno izbrisati, ga izbrišite v [koledarju skupine](../groups/group-calendar.md).

:::tip
Povezovanje skupin s koledarjem je zmogljiv način za samodejno zbiranje dogodkov. Ko vodja skupine doda dogodek v svojo [skupino](../groups/creating-groups.md), se lahko ta prikaže v vašem cerkvenem koledarju brez dodatnega dela z vaše strani.
:::

:::info
Če želite ustvariti en koledar, ki zbira dogodke iz številnih skupin v vaši cerkvi, si oglejte [Kurirani koledar](./curated-calendar.md) za preprostejši pristop.
:::

## Dodajanje in urejanje dogodkov {#adding-and-editing-events}

Kliknite **Nov dogodek** na strani s podrobnostmi koledarja, da dodate dogodek, ali kliknite dogodek v koledarju in nato **Uredi**, da ga spremenite. Obrazec **Nov dogodek** / **Uredi dogodek** ima naslednja polja:

- **Skupina** -- Skupina, ki ji dogodek pripada. Če ima vaša cerkev predloge dogodkov, lahko izberete tudi **Predlogo**, s katero napolnite obrazec.
- **Naslov**
- **Fotografija dogodka** -- Kliknite **Dodaj fotografijo** (ali prazno polje za fotografijo), da izberete ali naložite sliko, obrezano v široko obliko 16:9. Kliknite **Spremeni fotografijo**, da jo zamenjate. Fotografija je prikazana na vrhu strani dogodka na vaši spletni strani in kot ploščica, kadar element Koledar prikazuje **Prihajajoče dogodke** (glejte [Prikazovanje dogodkov na vaši spletni strani](#showing-events-on-your-website)).
- **Opis** -- Prikazan na strani dogodka na vaši spletni strani. Podprto je krepko besedilo, seznami in povezave.
- **Začetek** in **Konec**, **Ponavljanje** ter **Vidnost** (**Javno** ali **Zasebno**).
- **Oznake** -- Oznake, ločene z vejicami, na primer `youth, students`. Element Koledar na vaši spletni strani je lahko nastavljen tako, da prikazuje le dogodke z določeno oznako. To je isto polje **Oznake**, ki je prikazano v nastavitvah prijav na dogodek.
- **Kdo lahko vidi opombe** in **Kdo lahko objavi opombe** -- Kdo lahko bere in dodaja opombe k dogodku (glejte [Opombe k dogodku](#event-notes)). Izberete lahko **Samo osebje** (privzeto), **Vodje skupine** (vodje skupine dogodka) ali **Člani skupine** (vsi v skupini dogodka, vključno z njenimi vodji).
- **Prostori** in **Viri** -- Rezervirajte prostor in opremo za dogodek. Glejte [Prostori, viri in urnik](./rooms-resources.md).

Kliknite **Shrani**. Če se dogodek ponavlja, vas B1 prosi za potrditev, saj shranjevanje posodobi vse ponovitve v seriji.

### Opombe k dogodku {#event-notes}

Vsak dogodek ima lastno nit opomb za načrtovanje in spremljanje. Kliknite dogodek na strani s podrobnostmi koledarja; v pogovornem oknu so prikazane podrobnosti dogodka, njegovi opomniki in **Opombe** pod njimi. Vnesite opombo in jo objavite, da jo dodate v nit.

Osebje z dovoljenjem za urejanje vsebine ali upravljanje koledarjev lahko vedno bere in objavlja opombe k dogodku. Nastavitvi **Kdo lahko vidi opombe** in **Kdo lahko objavi opombe** pri dogodku določata, ali jih lahko berejo in objavljajo tudi vodje ali člani skupine dogodka.

### Prikazovanje dogodkov na vaši spletni strani {#showing-events-on-your-website}

Če želite koledar prikazati na svoji spletni strani, dodajte na stran element **Koledar** in izberite ta koledar. Element lahko prikaže mesečni koledar ali mrežo ploščic s prihajajočimi dogodki ter je lahko omejen na dogodke z eno oznako. Obiskovalci, ki kliknejo dogodek, odprejo njegovo lastno stran. Glejte [Uporaba elementa Koledar](../website/page-editor.md#using-the-calendar-element).

## Omogočanje prijav na dogodek {#enabling-event-registration}

Prijave lahko omogočite za kateri koli dogodek v koledarju, da se člani lahko prijavijo prek spletne strani B1 ali mobilne aplikacije.

1. Kliknite obstoječi dogodek ali ustvarite novega.
2. V urejevalniku dogodka vklopite **Prijave**.
3. Nastavite možnosti prijave:
   - **Zmogljivost** (neobvezno) -- Nastavite največje število prijav. Pustite prazno za neomejeno.
   - **Prijave se odprejo** -- Datum in čas, ko postanejo prijave na voljo.
   - **Prijave se zaprejo** -- Datum in čas, ko se prijave zaprejo.
   - **Oznake** -- Oznake, ločene z vejicami (npr. »youth, retreat, vbs«), ki pomagajo razvrstiti dogodke, na katere se je mogoče prijaviti.
   - **Vprašanja za prijavo** -- Po želji priložite [obrazec](../forms/creating-forms.md), da prijavljeni med prijavo odgovorijo na dodatna vprašanja (prehranske omejitve, velikost majice, kontakt za nujne primere itd.). Izberite **Brez**, če vprašanj ne želite.
   - **Omogoči čakalni seznam** -- Ko je dogodek poln, lahko dodatne prijavljene uvrstite na čakalni seznam namesto da jih zavrnete. Glejte [Plačljive prijave](./paid-registrations.md#waitlist).
4. Shranite dogodek.

Za plačljive dogodke lahko na isti strani nastavitev določite cenovno označene **Vrste udeležencev**, izbirne **Izbire** (dodatki) in **Popustne kode**, pri čemer se plačila zbirajo prek ponudnika darovanj vaše cerkve. Za celoten opis glejte [Plačljive prijave](./paid-registrations.md).

Ko so prijave omogočene, bodo člani ob ogledu dogodka na [B1.church ali v aplikaciji B1](../../b1-church/events/registering.md) videli gumb **Prijavi se na ta dogodek**. Če ste priložili obrazec, bodo prijavljeni med prijavo videli korak **Vprašanja**, njihovi odgovori pa bodo shranjeni skupaj z njihovo prijavo.

:::info
Vprašanja za prijavo delujejo le z obrazci, ki **niso** označeni kot omejeni. Omejeni obrazec se med prijavo samodejno preskoči in ni prikazan, zato za vprašanja pri dogodku uporabite neomejen obrazec.
:::

### Upravljanje prijav

Za ogled in upravljanje prijav na vaše dogodke:

1. V meniju Jump izberite **Koledarji > Prijave**.
2. Prikaže se tabela vseh dogodkov z omogočenimi prijavami, ki prikazuje naslov dogodka, datum, trenutno število prijav v primerjavi z zmogljivostjo ter oznake.
3. Kliknite dogodek, da vidite celoten seznam prijav, vključno z imeni, številom članov, vrstami udeležencev, stanjem plačila in datumom prijave.
4. Na strani s podrobnostmi lahko:
   - **Dodaj udeleženca** -- Ročno prijavite nekoga, ki se je prijavil brez povezave ali po telefonu.
   - **Prekliči** posamezne prijave
   - **Izbriši** prijave trajno
   - **Premakni** prijave s čakalnega seznama, ko se sprosti mesto
   - **Izvozi CSV** -- Prenesite vse prijave, vključno z vrstami udeležencev, izbirami, zneski plačil in odgovori na vprašanja

Če so pri dogodku priložena vprašanja za prijavo, stran s podrobnostmi prikazuje tudi filter **Samo neodgovorjena vprašanja**, s katerim hitro najdete prijavljene, ki še niso oddali odgovorov, ter gumb **Poglej odgovore** pri vsaki odgovorjeni prijavi, s katerim si ogledate njihove odgovore. Plačljivi dogodki dodajo stolpec **Vrsta**, stolpec **Plačano / Skupaj**, števce po vrstah in pogovorno okno s podrobnostmi plačil -- glejte [Plačljive prijave](./paid-registrations.md#the-registration-roster).

:::tip
Z vrstico napredka zmogljivosti spremljajte, kako hitro se dogodki polnijo. Vrstica postane rdeča, ko je dogodek dosegel ali presegel zmogljivost.
:::

## Naslednji koraki

- [Kurirani koledar](./curated-calendar.md) -- Ustvarite koledar, ki črpa iz več skupin
- [Plačljive prijave](./paid-registrations.md) -- Vrste udeležencev, dodatne izbire, popustne kode, plačila in čakalni seznami
- [Vodnik za prijave na dogodke](../guides/event-registration.md) -- Korak za korakom vodnik za nastavitev prijav na dogodke
- [Pregled koledarjev](./index.md) -- Vrnitev na pregled koledarjev
