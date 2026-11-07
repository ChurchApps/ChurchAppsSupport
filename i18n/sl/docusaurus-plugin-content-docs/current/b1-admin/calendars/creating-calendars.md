---
title: "Ustvarjanje koledarjev"
---

# Ustvarjanje koledarjev

<div class="article-intro">

Ustvarjanje koledarja v B1 Admin vam omogoča pripravo pregleda dogodkov, ki združuje eno ali več skupin. Dogodke v svojih skupinah upravljajo vodje skupin, koledar pa vam prikazuje vse dogodke na enem mestu. Skrbniki z dostopom za urejanje lahko dodajajo ali urejajo dogodke za katero koli skupino. Vodje skupin, ki niso skrbniki, lahko upravljajo samo dogodke skupin, ki jih vodijo.

</div>

## Video za usposabljanje

<YouTube id="Ko3kgsCSLFs" title="Ustvarjanje koledarjev, dogodkov in rezervacij prostorov v B1" next="Prijave na dogodke in plačljivi dogodki v B1" nextUrl="/docs/b1-admin/calendars/paid-registrations" />

<div class="prereqs">
<h4>Preden začnete</h4>

- Nastavite [skupine](../groups/creating-groups.md), katerih dogodke želite vključiti v koledar
- Potrebujete skrbniški dostop do razdelka Calendars v B1 Admin

</div>

## Ustvarjanje novega koledarja

1. V B1 Admin odprite [meni Jump](../introduction.md#getting-around-with-the-jump-menu) (iskalno polje v zgornjem levem kotu), razširite **Calendars** in kliknite **Calendars**.
2. Na vrhu strani kliknite **Add Calendar**. Obrazec za nov koledar se odpre pod seznamom koledarjev.
3. Vnesite **ime** koledarja (na primer „Dogodki mladinske službe“ ali „Glavni cerkveni koledar“).
4. Po želji dodajte **opis**, ki vaši ekipi pomaga razumeti, za kaj je ta koledar namenjen.
5. Kliknite **Create**, da shranite nov koledar.

## Stran s podrobnostmi koledarja

Po ustvarjanju koledarja kliknite **Manage Events** v njegovi vrstici, da odprete stran s podrobnostmi. Ta stran ima dve glavni območji:

- **Levi stolpec** -- Ime koledarja z dejanji (**New Event**, **Edit**, **Import .ics** in **Print**), nato seznam **Groups in Calendar**, ki prikazuje, katere skupine so vključene v ta koledar. Kliknite **Remove** poleg skupine, če jo želite odstraniti iz koledarja.
- **Glavno območje** -- Pogled **Calendar Events** sprejetimi dogodki iz povezanih skupin ter gumboma **Subscribe** in **Add Group** nad njim.

## Povezovanje skupin

Skupine, ki imajo dogodke v koledarju, se samodejno prikažejo na seznamu **Groups in Calendar** na levi strani strani s podrobnostmi.

1. Nad koledarjem kliknite **Add Group**, da skupino povežete s koledarjem.
2. Izberite skupino s spustnega seznama. Seznam vključuje vse skupine v vaši cerkvi, ne le tistih, ki jim pripadate.
3. Izberite, ali želite vključiti **all events** iz te skupine ali samo **specific events**.
4. Kliknite **Save**.

Vsak dogodek se v koledarju pojavi samo enkrat. Če dodate celotno skupino, se vsi njeni dogodki, ki ste jih prej dodali posamično, združijo v vnos skupine. Izbira posameznih dogodkov iz skupine, ki je že v koledarju, ne doda ničesar novega. Na seznamu **Groups in Calendar** so navedene samo skupine, dodane v celoti.

### Uvoz datoteke .ics

Kliknite **Import .ics**, da uvozite dogodke iz drugega koledarja. Izberite **Group**, ki naj pripada dogodkom, nato kliknite **Choose .ics file** ali prilepite vsebino datoteke, in kliknite **Import**. Dogodki se ustvarijo v tej skupini, skupina pa se doda koledarju, iz katerega ste uvažali, zato se dogodki takoj prikažejo tam.

### Odstranjevanje dogodka iz koledarja

Kliknite dogodek v koledarju, nato kliknite **Remove from Calendar**. S tem dogodek odstranite samo iz tega koledarja -- sam dogodek ostane v svoji skupini. Če je dogodek v koledarju zato, ker je bila dodana cela njegova skupina, bo odstranitev odstranila vse dogodke te skupine iz tega koledarja (dogodki kljub temu ostanejo v skupini). Če dogodek želite trajno izbrisati, ga izbrišite v [koledarju skupine](../groups/group-calendar.md).

:::tip
Povezovanje skupin z vašim koledarjem je zmogljiv način za samodejno združevanje dogodkov. Ko vodja skupine doda dogodek v svojo [skupino](../groups/creating-groups.md), se lahko samodejno prikaže v koledarju vse cerkve brez dodatnega dela z vaše strani.
:::

:::info
Če želite ustvariti en sam koledar, ki povlači dogodke iz številnih skupin v vaši cerkvi, si oglejte [Kurirani koledar](curated-calendar), kjer je opisan poenostavljen pristop.
:::

## Dodajanje in urejanje dogodkov {#adding-and-editing-events}

Na strani s podrobnostmi koledarja kliknite **New Event**, da dodate dogodek, ali kliknite dogodek v koledarju in nato **Edit**, da ga spremenite. Obrazec **New Event** / **Edit Event** ima ta polja:

- **Group** -- Skupina, ki ji dogodek pripada. Če ima vaša cerkev predloge dogodkov, lahko izberete tudi **Template**, s katero izpolnite obrazec.
- **Title**
- **Event photo** -- Kliknite **Add Photo** (ali prazno polje za fotografijo), da izberete ali naložite sliko, obrezano v širok format 16:9. Kliknite **Change Photo**, da jo zamenjate. Fotografija je prikazana na vrhu strani dogodka na vaši spletni strani in kot njegova ploščica, kadar element Calendar prikazuje **Upcoming events** (glejte [Prikazovanje dogodkov na vaši spletni strani](#showing-events-on-your-website)).
- **Description** -- Prikazan na strani dogodka na vaši spletni strani. Podprto je krepko besedilo, seznami in povezave.
- **Start** in **End**, **Repeats** ter **Visibility** (**Public** ali **Private**).
- **Tags** -- Oznake, ločene z vejicami, na primer `youth, students`. Element Calendar na vaši spletni strani lahko nastavite tako, da prikazuje samo dogodke z določeno oznako. To je isto polje **Tags**, ki je prikazano v nastavitvah prijav na dogodek.
- **Who can view notes** in **Who can post notes** -- Kdo lahko bere in dodaja zapiske dogodka (glejte [Zapiski dogodka](#event-notes)). Izberite **Staff only** (privzeto), **Group leaders** (vodje skupine dogodka) ali **Group members** (vsi v skupini dogodka, vključno z njenimi vodji).
- **Rooms** in **Resources** -- Rezervirajte prostor in opremo za dogodek. Glejte [Prostori, viri in razporejanje](rooms-resources).

Kliknite **Save**. Če se dogodek ponavlja, vas B1 prosi za potrditev, saj shranjevanje posodobi vsako ponovitev v seriji.

### Zapiski dogodka {#event-notes}

Vsak dogodek ima svojo nit zapiskov za načrtovanje in spremljanje. Kliknite dogodek na strani s podrobnostmi koledarja; pogovorno okno prikaže podrobnosti dogodka, njegove opomnike ter **Notes** pod njimi. Vnesite zapisek in ga objavite, da ga dodate v nit.

Osebje, ki ima dovoljenje za urejanje vsebine ali upravljanje koledarjev, lahko vedno bere in objavlja zapiske dogodkov. Nastavitvi **Who can view notes** in **Who can post notes** na dogodku določata, ali lahko to počnejo tudi vodje ali člani skupine dogodka.

### Prikazovanje dogodkov na vaši spletni strani {#showing-events-on-your-website}

Če želite koledar prikazati na svoji spletni strani, dodajte element **Calendar** na stran in izberite ta koledar. Element lahko prikaže mesečni koledar ali mrežo ploščic z nadolčajočimi dogodki ter je lahko omejen na dogodke z eno oznako. Obiskovalci, ki kliknejo dogodek, odprejo njegovo lastno stran. Glejte [Uporaba elementa Calendar](../website/page-editor.md#using-the-calendar-element).

## Omogočanje prijav na dogodke {#enabling-event-registration}

Prijave lahko omogočite za katerega koli dogodek v koledarju, da se člani lahko prijavijo prek spletne strani ali mobilne aplikacije B1.

1. Kliknite obstoječ dogodek ali ustvarite novega.
2. V urejevalniku dogodka vklopite **Registration**.
3. Nastavite možnosti prijave:
   - **Capacity** (neobvezno) -- Nastavite največje število prijav. Pustite prazno za neomejeno število.
   - **Registration Opens** -- Datum in čas, ko postane prijava na voljo.
   - **Registration Closes** -- Datum in čas, ko se prijave zaprejo.
   - **Tags** -- Oznake, ločene z vejicami (npr. „youth, retreat, vbs“), ki pomagajo razvrščati dogodke, na katere se je mogoče prijaviti.
   - **Registration Questions** -- Po želji priložite [obrazec](../forms/creating-forms.md), da prijavljenci med prijavo odgovorijo na dodatna vprašanja (prehranske omejitve, velikost majice, kontakt za nujne primere itd.). Izberite **None**, če želite vprašanja preskočiti.
   - **Enable Waitlist** -- Ko je dogodek poln, lahko dodatni prijavljenci vstopijo na čakalni seznam namesto da bi jih zavrnili. Glejte [Plačljive prijave](paid-registrations#waitlist).
4. Shranite dogodek.

Pri plačljivih dogodkih na isti strani z nastavitvami določite cenovne vrste udeležencev (**Attendee Types**), izbirne dodatke (**Selections**) in popustne kode (**Discount Codes**), plačila pa se zbirajo prek ponudnika darovanj vaše cerkve. Celoten postopek je opisan v [Plačljive prijave](paid-registrations).

Ko so prijave omogočene, bodo člani ob ogledu dogodka na [spletni strani B1](../../b1-church/events/registering) ali v [mobilni aplikaciji B1](../../b1-mobile/events/registering) videli gumb **Register for this Event**. Če ste priložili obrazec, bodo prijavljenci med prijavo videli korak **Questions**, njihovi odgovori pa bodo shranjeni skupaj s prijavo.

:::info
Vprašanja ob prijavi delujejo samo z obrazci, ki **niso** označeni kot Restricted. Omejen obrazec se med prijavo samodejno preskoči in ni prikazan, zato za vprašanja pri dogodku uporabite neomejen obrazec.
:::

### Upravljanje prijav

Za ogled in upravljanje prijav na vaše dogodke:

1. V meniju Jump izberite **Calendars > Registrations**.
2. Prikaže se tabela vseh dogodkov, pri katerih so prijave omogočene, s naslovom dogodka, datumom, trenutnim številom prijav v primerjavi s kapaciteto ter oznakami.
3. Kliknite dogodek, da vidite celoten seznam prijav, vključno z imeni, številom članov, vrstami udeležencev, stanjem plačila in datumom prijave.
4. Na strani s podrobnostmi lahko:
   - **Add Attendee** -- ročno prijavite nekoga, ki se je prijavil brez spleta ali po telefonu.
   - **Cancel** posamezne prijave
   - **Delete** prijave trajno
   - **Promote** prijave s čakalnega seznama, ko se sprosti mesto
   - **Export CSV** -- prenesete vse prijave, vključno z vrstami udeležencev, izbirnimi dodatki, zneski plačil in odgovori na vprašanja

Če so pri dogodku priložena vprašanja ob prijavi, stran s podrobnostmi prikazuje tudi filter **Unanswered questions only**, s katerim hitro najdete prijavljence, ki še niso oddali odgovorov, ter gumb **View Answers** pri vsaki odgovorjeni prijavi, s katerim si ogledate njihove odgovore. Plačljivi dogodki dodajo stolpec **Type**, stolpec **Paid / Total**, števce po vrstah in pogovorno okno s podrobnostmi plačil. Glejte [Plačljive prijave](paid-registrations#the-registration-roster).

:::tip
Z vrstico napredka kapacitete spremljajte, kako hitro se dogodki polnijo. Vrstica postane rdeča, ko je dogodek dosegel ali presegel kapaciteto.
:::

## Naslednji koraki

- [Kurirani koledar](curated-calendar) -- ustvarite koledar, ki povlači dogodke iz več skupin
- [Plačljive prijave](paid-registrations) -- vrste udeležencev, izbirni dodatki, popustne kode, plačila in čakalni seznami
- [Vodnik za prijave na dogodke](../guides/event-registration) -- postopen vodnik za nastavitev prijav na dogodke
- [Pregled koledarjev](./) -- vrnitev na pregled koledarjev
