---
title: "Uporaba urejevalnika strani"
description: "Nastavite urejevalnik strani v B1 Admin tako, da dodajate razdelke in elemente, jih oblikujete, predogledate na mobilni napravi in objavljate osnutke. Opisano je tudi razveljavljanje sprememb in zgodovina različic."
---

# Uporaba urejevalnika strani

<div class="article-intro">

Urejevalnik strani B1 je vizualni graditelj z vlečenjem in spuščanjem, ki vam omogoča oblikovanje strani vaše cerkvene spletne strani brez pisanja kode. Dodajate lahko razdelke in vsebinske bloke, prilagajate sloge, predogledujete svoje delo in razveljavljate spremembe, vse neposredno v brskalniku.

</div>

## Video o uporabi

<YouTube id="m2B_JxmfFm4" title="Urejanje strani in navigacije v B1" next="Povezovanje domene po meri v B1" nextUrl="/docs/b1-admin/settings/custom-domain" />

<div class="prereqs">
<h4>Preden začnete</h4>

- Dokončajte [začetno nastavitev](./initial-setup.md), da bo vaša spletna stran nastavljena
- V razdelku [Upravljanje strani](./managing-pages.md) ustvarite vsaj eno stran
- Za dostop do urejevalnika potrebujete dovoljenje **content.edit**

</div>

## Odpiranje urejevalnika

1. V B1 Admin odprite [meni Jump](../introduction.md#getting-around-with-the-jump-menu) (iskalno polje v zgornjem levem kotu), razširite **Website** in kliknite **Pages**.
2. V tabeli strani poiščite stran, ki jo želite urediti, in kliknite **Edit Content**.

Urejevalnik se odpre v celozaslonskem načinu. Na levi plošči so prikazani struktura strani in razpoložljivi vsebinski elementi, osrednje območje pa prikazuje živi predogled vaše strani.

:::info
Urejevalnik se vedno prikazuje v svetlem načinu, ne glede na nastavitev teme v B1 Admin, in uporablja pisave za naslove in besedilo, ki ste jih izbrali v razdelku [Videz](./appearance.md). Tako se predogled natančno ujema s tem, kako bo stran videti obiskovalcem.
:::

## Struktura strani: razdelki in elementi

Vsaka stran je zgrajena iz dveh ravni:

- **Razdelki** -- Najvišje ravni vsebnikov, ki stran delijo na vodoravne pasove (na primer glavni razdelek, vsebinski blok ali pas noge strani). Preden lahko dodate vsebino, mora imeti stran vsaj en razdelek.
- **Elementi** -- Posamezni vsebinski kosi, nameščeni znotraj razdelka, na primer besedilo, slike, gumbi, kartice, obrazci in koledarji.

### Dodajanje razdelka

1. Kliknite **Add Section** (ali gumb **+** na vrhu leve plošče).
2. Izberite, kako začeti:
   - **Iz predloge** -- Brskajte po galeriji predlog razdelkov, urejenih po kategorijah (Hero, About, Services, Giving itd.), in kliknite eno, da vstavite popolnoma oblikovan razdelek z vnaprej pripravljeno vsebino. Vse lahko prilagodite po vstavljanju.
   - **Prazen razdelek** -- Izberite postavitev stolpcev (en stolpec, dva stolpca, trije stolpci itd.) in gradite od začetka.
3. Nov razdelek se prikaže v predogledu. Kliknite ga, da ga izberete, in nastavite barvo ozadja, odmik in druge slogovne možnosti.

### Spreminjanje postavitve razdelka

Ste razdelek že oblikovali, vendar želite drugačno strukturo? Uporabite preklopnik postavitve na tem razdelku, da zamenjate razporeditev stolpcev z drugo iz galerije, vsa obstoječa vsebina in elementi pa ostanejo na svojih mestih.

### Dodajanje elementov v razdelek

1. Kliknite znotraj razdelka v predogledu, da ga izberete.
2. Kliknite **Add Content** in izberite vrsto elementa s seznama:
   - **Text** -- Naslovi, odstavki in obogateno besedilo
   - **Image** -- Naložite fotografijo ali jo povežite
   - **Button** -- Klikljiv poziv k dejanju
   - **Card** -- Slika z naslovom in opisom
   - **Form** -- Vdelajte [obrazec](../forms/creating-forms.md) neposredno na stran. Če ima obrazec [glavno fotografijo](../forms/creating-forms.md#adding-a-header-photo), se prikaže nad vprašanji
   - **Calendar** -- Prikaz koledarja dogodkov
   - **FAQ** -- Vprašanja in odgovori v obliki harmonike
   - **Video** -- Vdelajte video z naslovom URL
   - **Groups Browser** -- Filtrirljiv imenik vseh cerkvenih skupin z možnim iskanjem, filtrom kategorij in filtrom oznak. Njegova **Layout** je lahko **Grid** (privzeto) ali **Scrolling (automatic)** -- glejte [Drsne postavitve](#scrolling-layouts)
   - **Group List** -- Ploščice za vaše javne skupine, po želji le skupine z določeno oznako. Njegova **Layout** je lahko **Grid** (privzeto; do tri ploščice v vrsti) ali **Scrolling (automatic)** -- glejte [Drsne postavitve](#scrolling-layouts)
   - **Icon Feature** -- Ikona z naslovom in kratkim opisom za poudarjanje lastnosti ali služenj
   - **Gallery** -- Mreža z več fotografijami ali postavitev masonry
   - **Testimonial** -- Ena ali več izjav z imenom avtorja, vlogo in fotografijo
   - **Social Icons** -- Povezane ikone za profile vaše cerkve na družbenih omrežjih: Facebook, Instagram, WhatsApp, YouTube, X, TikTok, Vimeo in Podcast. Vnesite povezavo za vsakega, ki ga želite prikazati; za **WhatsApp** uporabite povezavo `https://wa.me/` s svojo številko ali povabilom v skupino
   - **Countdown** -- Odštevalnik do datuma ali tedenskega termina bogoslužja
   - **Stats** -- Vrsta velikih številk z oznakami (člani, leta, podružnice)
   - **Campaign Progress** -- Živa vrstica napredka za dobrodelno kampanjo, ki prikazuje skupno zbrana sredstva glede na cilj sklada
   - **Staff Grid** -- Kartice s fotografijami za člane skupine; skupina mora imeti vklopljeno možnost **public roster**
   - **Service Times** -- Urnik bogoslužij vaših podružnic, samodejno prevzet iz nastavitev obiskovanja
   - **Sermons** -- Vaša knjižnica pridig kot celoten brskalnik ali v postavitvi mreže, seznama ali izpostavljene najnovejše pridige
   - **Map** -- Vdelana karta, centrirana na naslov vaše cerkve
   - **Table** -- Preprosta mreža vrstic in stolpcev za tabelarično vsebino
   - **Text with Photo** -- Besedilo in slika drug ob drugem
   - **Logo** -- Logotip vaše cerkve, prevzet iz [Videz](./appearance.md)
   - **Live Stream** -- Predvajalnik vašega neposrednega prenosa, vdelan neposredno na stran
   - **Podcast** -- Seznam epizod, pridobljen iz zunanjega RSS vira podcasta, ki ga vnesete, z nastavitvami, koliko epizod prikazati in ali prikazovati datume ter opise. Vsaka epizoda na objavljeni strani ima predvajalnik zvoka in povezavo **Download**, ki shrani zvočno datoteko epizode pod naslovom epizode. To je namenjeno predstavitvi katerega koli vira podcasta na vaši strani; če svoje pridige želite objaviti kot podcast, glejte namesto tega [Upravljanje pridig](../sermons/managing-sermons.md#your-podcast-feed)
   - **Donation** -- Gumb za darovanje ali vdelan obrazec za darovanje
   - **HTML** -- Vaša lastna surova koda HTML za napredne primere, na primer vdelavo pripomočka tretje osebe (glejte [Uporaba elementa HTML](#using-the-html-element))
   - **iFrame** -- Vdelajte zunanjo vsebino z naslovom URL
3. Element nastavite z nastavitvenim podoknom, ki se prikaže.

### Uporaba elementa HTML

Element **HTML** ima dve polji:

- **HTML Content** -- Oznake, ki se prikažejo na strani. Vse oznake `<script>`, ki jih tukaj vključite, se izvedejo na vaši objavljeni strani.
- **JavaScript (exclude script tag)** -- Koda skripte, ki se izvede ob nalaganju strani. Sem lahko prilepite tudi vdelani izsek dobavitelja z oznakami `<script>`, in izvedel se bo na objavljeni strani.

Če v polje JavaScript prilepite samo spletni naslov (na primer povezavo do slike), se polje obarva rdeče z opozorilom *„To je spletni naslov, ne JavaScript.“* Sam naslov v tem polju ne naredi ničesar. Če želite prikazati sliko, uporabite element **Image** ali vnesite `<img src="...">` v **HTML Content**.

### Uporaba elementa Calendar {#using-the-calendar-element}

Element **Calendar** prikazuje dogodke iz enega od vaših koledarjev:

1. Pod **Select** izberite **Group Calendar** (dogodke ene skupine -- seznam prikazuje skupine, katerih član ste) ali **Curated Calendar** (koledar, ki ste ga ustvarili pod **Calendars**; glejte [Kuriran koledar](../calendars/curated-calendar.md)).
2. Pod **Select Calendar** izberite skupino ali koledar.
3. Pod **Display** izberite, kako ga prikazati:
   - **Month calendar** -- Mreža meseca, po kateri lahko obiskovalci brskajo. Vsak dogodek je obarvan glede na skupino, ki ji pripada, zato imajo dogodki skupine na vsakem koledarju enako barvo. B1 barve izbere samodejno; ni ničesar za nastavljanje.
   - **Upcoming events** -- Mreža ploščic za naslednjih 12 dogodkov, pri čemer je ponavljajoči se dogodek prikazan enkrat na svojem naslednjem datumu. Vsaka ploščica prikazuje fotografijo dogodka (ali njegov naslov na temni barvi vaše teme, če fotografije nima), oznako datuma, dan in čas ter prvo vrstico opisa. Gumb **Subscribe** nad ploščicami omogoča obiskovalcem, da kopirajo povezavo ICS koledarja ali jo prenesejo. Za ta prikaz se pojavi nastavitev **Layout**: **Grid** (privzeto) ali **Scrolling (automatic)**, ki postavi ploščice v eno vrsto, ki se sama pomika (glejte [Drsne postavitve](#scrolling-layouts)). Za **Curated Calendar** vklopite nastavitev **Group badge**, da se ime skupine vsakega dogodka prikaže v zgornjem desnem kotu njegove ploščice, v barvi koledarja te skupine. Dogodki arhiviranih ali zaupnih skupin nimajo značke.
4. Če želite prikazati samo nekatere dogodke, v polje **Only events tagged** vpišite oznako -- na primer `youth`. Prikazani bodo samo dogodki, katerih **Tags** vključujejo to besedo. Če polje pustite prazno, bodo prikazani vsi dogodki. Oznake nastavite pri vsakem dogodku; glejte [Dodajanje in urejanje dogodkov](../calendars/creating-calendars.md#adding-and-editing-events).

V obeh prikazih klik na dogodek odpre njegovo lastno stran na vaši spletni strani. Stran dogodka prikazuje fotografijo dogodka, naslov, datum in čas ter opis, poleg polja z **When** (vključno z vzorcem ponavljanja za ponavljajoči se dogodek) in **Where** (prostori, rezervirani zanj). Prikaže tudi gumb **Register for this Event**, kadar je prijava vklopljena, in povezavo **Add to my calendar**, ki dogodek prenese kot datoteko koledarja. Stran je pripravljena tako, da iskalniki lahko prikažejo datum in podrobnosti dogodka v rezultatih. Strani dogodkov iz kuriranih koledarjev, prikazanih na vaših straneh (za dogodke v naslednjih šestih mesecih), so prav tako navedene v vaši karti strani, da jih iskalniki lahko najdejo.

### Drsne postavitve {#scrolling-layouts}

Postavitev **Scrolling (automatic)** pri **Groups Browser**, **Group List** in prikazu **Upcoming events** elementa Calendar postavi ploščice v eno vrsto namesto v mrežo. Na telefonu vsaka ploščica zapolni vrsto; na računalniku se sta dve ploščici postavljeni drug ob drugo. Kadar je ploščic več, kot jih lahko prikaže vrsta, se vrsta:

- Pomakne naprej za eno ploščico približno na vsake štiri sekunde in se po zadnji ploščici vrne na prvo.
- Ustavi, ko obiskovalec premakne miško nad njo, se je dotakne ali se nanjo premakne s tipko Tab, nato pa se po nekaj sekundah spet nadaljuje.
- Pod njo prikaže vrsto pik, eno za vsako ploščico, pri čemer je pika trenutne ploščice napolnjena. Obiskovalci lahko kliknejo piko, da preskočijo na to ploščico.

Na napravah, nastavljenih na zmanjšano gibanje, vrsta miruje, obiskovalci pa jo lahko podrsajo ali pomaknejo sami. Če se vse ploščice prikažejo naenkrat, se vrsta ne premika in pike se ne prikažejo.

### Preurejanje vsebine

Razdelke ali elemente povlecite z ročico (šest pik) na levi strani vsakega elementa, da jih preuredite. Elemente lahko premikate znotraj razdelka ali jih prenesete v druge razdelke.

## Oblikovanje strani

### Slogi razdelkov

Kliknite kateri koli razdelek, da odprete njegovo ploščo slogov. Nastavite lahko:

- **Background** -- Enobarvno ozadje, prehod barv ali slika. Pri ozadju s sliko izbirnik **Focal Point** omogoča, da kliknete in določite, kateri del slike ostane v središču, ko se razdelek spreminja v velikosti, možnost **Overlay** pa omogoča dodajanje polprosojnega barvnega odtenka čez sliko za boljšo berljivost besedila.
- **Padding** -- Zgornji in spodnji razmik znotraj razdelka
- **Width** -- Čez celotno širino ali centrirano/omejeno
- **Dividers** -- Dekorativne oblike ločilnikov (valovi, poševnice, lok, trikotnik in drugi) na zgornjem ali spodnjem robu razdelka, z možnostmi barve, višine in zrcaljenja

### Slogi elementov

Kliknite kateri koli element, da odprete njegovo ploščo slogov. Pogoste možnosti vključujejo velikost pisave, barvo, poravnavo, zamik in odmik. Pri slikah lahko nastavite nadomestno besedilo (alt) in cilje povezav.

### Slog po meri (CSS)

Za napredno oblikovanje ima vsak razdelek in element polje **Custom CSS**, kamor lahko zapišete lastna pravila CSS. Ta pravila veljajo samo za ta element, zato ne bodo nenamerno vplivala na preostanek strani.

:::tip
Če morate sloge uporabiti po vsej spletni strani -- na primer posebno pisavo ali splošno barvo --, uporabite nastavitve v razdelku [Videz](./appearance.md) namesto CSS po meri na posameznih straneh.
:::

## Predogled strani

Za preverjanje, kako vaša stran izgleda pri različnih velikostih zaslona, uporabite kontrole predogleda v orodni vrstici:

- **Desktop** -- Pogled v celotni širini brskalnika
- **Mobile** -- Ožji pogled v velikosti telefona

Na telefonih se stolpci v vrsti zlagajo drug nad drugega v polni širini, razen če za njih v nastavitvah vrste določite **Mobile Width**. Seznami pridig in podcastov prav tako na telefonih postavijo besedilo vsake epizode pod njeno sličico.

Če si želite živo stran ogledati natanko tako, kot jo bodo videli obiskovalci, se vrnite na seznam **Pages** in kliknite pot strani. Odpre se v novem zavihku brskalnika.

## Preverjanje dostopnosti

Kliknite ikono **Accessibility** v orodni vrstici, da zaženete hitro preverjanje pogostih težav -- manjkajoče nadomestno besedilo slik, nizek barvni kontrast ali naslovi v napačnem vrstnem redu. Vsaka težava neposredno povezuje na element, ki potrebuje pozornost, da ga lahko popravite kar na mestu.

## Razveljavljanje sprememb

Urejevalnik samodejno beleži zgodovino urejanja. Za krmarjenje uporabite gumbe v orodni vrstici ali bližnjice na tipkovnici:

- **Undo** (Ctrl+Z / Cmd+Z) -- Razveljavi vaše zadnje dejanje
- **Redo** (Ctrl+Shift+Z ali Ctrl+Y / Cmd+Shift+Z) -- Ponovno uveljavi razveljavljeno dejanje

Stran lahko obnovite tudi na prejšnji posnetek stanja. Kliknite **View history** v orodni vrstici, da si ogledate seznam shranjenih posnetkov z opisi, in kliknite katerikoli vnos, da se vrnete na to točko.

:::warning
Obnovitev posnetka nadomesti trenutno vsebino strani z različico iz posnetka. Tega ni mogoče razveljaviti s standardnim gumbom za razveljavitev. Če želite ohraniti možnost vrnitve, pred obnovitvijo starejšega posnetka shranite posnetek svojega trenutnega stanja.
:::

## Shranjevanje in objava

Spremembe se shranjujejo samodejno, medtem ko delate. Stanje v orodni vrstici prikazuje, ali so vaše spremembe shranjene.

### Stanje osnutka in objave

Strani imajo lahko stanje **published**, ki določa, kdaj obiskovalci vidijo vaše spremembe. Orodna vrstica prikazuje oznako s trenutnim stanjem:

- **Live on save** -- Stran ne uporablja poteka objave. Vsaka shranjena sprememba takoj postane vidna. To je privzeto za nove strani.
- **Unpublished changes** -- Stran je bila že prej objavljena, vi pa ste po zadnji objavi naredili spremembe. Obiskovalci še vedno vidijo prej objavljeno različico.
- **Published** -- Stran je objavljena in vaša shranjena vsebina se ujema s tem, kar vidijo obiskovalci.

Za objavo sprememb kliknite gumb **Publish** v orodni vrstici. Stran postane vidna takoj.

Če se želite vrniti na zadnjo objavljeno različico, ne da bi vplivali na to, kar vidijo obiskovalci, odprite meni s tremi pikami (⋮) in kliknite **Discard unpublished changes**.

Če želite prenehati uporabljati potek objave, odprite meni s tremi pikami in kliknite **Turn off publishing**. Urejanja nato spet takoj postanejo vidna.

:::tip
Potek osnutka/objave uporabite, kadar želite stran pripraviti -- na primer za prihajajoči dogodek -- in jo objaviti šele ob pravem trenutku. Stran zgradite in si jo oglejte v predogledu, nato pa, ko boste pripravljeni, kliknite Publish.
:::

## Sorodni članki

- [Upravljanje strani](./managing-pages.md) -- Ustvarjanje strani, nastavljanje naslovov URL in upravljanje navigacije strani
- [Videz](./appearance.md) -- Nastavitev barv, pisav in blagovne znamke za celotno spletno stran
- [Datoteke](./files.md) -- Nalaganje slik in dokumentov za uporabo v urejevalniku
- [Ustvarjanje obrazcev](../forms/creating-forms.md) -- Izdelava obrazcev, ki jih lahko vdelate na strani
