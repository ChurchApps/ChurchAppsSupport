---
title: "Používanje urejevalnika strani"
description: "V B1 Admin nastavite urejevalnik strani: dodajte razdelke in elemente, jih oblikujte, predogledate na mobilnih napravah in objavite osnutke. Zajema tudi razveljavitev in zgodovino različic."
---

# Používanje urejevalnika strani

<div class="article-intro">

Urejevalnik strani B1 je vizualni graditelj s povleci in spusti, ki vam omogoča oblikovanje spletnih strani vaše cerkve brez pisanja kode. Dodajate lahko oddelke in vsebinske bloke, prilagajate sloge, si ogledate predogled svojega dela in razveljavite spremembe – vse neposredno v brskalniku.

</div>

## Video za usposabljanje

<YouTube id="m2B_JxmfFm4" title="Urejanje strani in navigacije v B1" next="Povezovanje domene po meri v B1" nextUrl="/docs/b1-admin/settings/custom-domain" />

<div class="prereqs">
<h4>Preden začnete</h4>

- Dokončajte [začetno nastavitev](./initial-setup.md), da nastavite svojo spletno stran
- Ustvarite vsaj eno stran v [upravljanju strani](./managing-pages.md)
- Za dostop do urejevalnika potrebujete dovoljenje **content.edit**

</div>

## Odpiranje urejevalnika

1. V programu B1 Admin odprite [meni za skok](../introduction.md#getting-around-with-the-jump-menu) (iskalno polje na vrhu levo), razširite **Website** in kliknite **Pages**.
2. V tabeli strani poiščite stran, ki jo želite urediti, in kliknite **Edit Content**.

Urejevalnik se odpre na celotnem zaslonu. Levi zaslon prikazuje strukturo vaše strani in razpoložljive vsebinske elemente; osrednje območje prikazuje predogled strani v živo.

:::info
Urejevalnik se vedno prikazuje v svetlem načinu, ne glede na nastavitev teme v programu B1 Admin, in uporablja pisave za naslove in besedilo, ki ste jih izbrali v [videzu](./appearance.md). Tako predogled natančno ustreza temu, kako bo stran videti obiskovalcem spletne strani.
:::

## Struktura strani: oddelki in elementi

Vsaka stran je zgrajena iz dveh ravni:

- **Oddelki** -- Najvišji vsebniki, ki razdelijo stran na vodoravne pasove (na primer glavni del, vsebinski blok ali noga strani). Vsaka stran mora imeti vsaj en oddelek, preden lahko dodate vsebino.
- **Elementi** -- Posamezni vsebinski deli znotraj oddelka, kot so besedilo, slike, gumbi, kartice, obrazci in koledarji.

### Dodajanje oddelka

1. Kliknite **Add Section** (ali gumb **+** na vrhu levega zaslona).
2. Izberite, kako želite začeti:
   - **Iz predloge** — prebrskajte galerijo predlog oddelkov, razvrščeno po kategorijah (Glavni del, O nas, Storitve, Darovanja itd.), in kliknite eno, da jo vstavite kot v celoti oblikovan, vnaprej izpolnjen oddelek. Vse lahko prilagodite po vstavitvi.
   - **Prazen oddelek** — izberite postavitev stolpcev (en stolpec, dva stolpca, trije stolpci itd.) in ga zgradite od začetka.
3. Novi oddelek se prikaže v predogledu. Kliknite nanj, da ga izberete, in nastavite barvo ozadja, odmik in druge slogovne možnosti.

### Spreminjanje postavitve oddelka

Ste že zgradili oddelek, a želite drugačno strukturo? Uporabite preklopnik postavitve na tem oddelku, da zamenjate razporeditev stolpcev z drugo iz galerije, medtem ko vaša obstoječa vsebina in elementi ostanejo na mestu.

### Dodajanje elementov v oddelek

1. Kliknite znotraj oddelka v predogledu, da ga izberete.
2. Kliknite **Add Content** in izberite vrsto elementa s seznama:
   - **Besedilo** -- Naslovi, odstavki in obogateno besedilo
   - **Slika** -- Naložite fotografijo ali jo povežite
   - **Gumb** -- Klikljiva povezava za poziv k dejanju
   - **Kartica** -- Slika z naslovom in opisom
   - **Obrazec** -- Vdelajte [obrazec](../forms/creating-forms.md) neposredno na stran. Če ima obrazec [glavno fotografijo](../forms/creating-forms.md#adding-a-header-photo), se prikaže nad vprašanji
   - **Koledar** -- Prikaz koledarja dogodkov
   - **FAQ** -- Bloki vprašanj in odgovorov v obliki harmonike
   - **Video** -- Vdelajte video z naslovom URL
   - **Brskalnik skupin** -- Filtrirani imenik vseh cerkvenih skupin z neobveznim iskanjem, filtrom kategorij in filtrom oznak
   - **Ikona s funkcijo** -- Ikona z naslovom in kratkim opisom, za poudarjanje značilnosti ali služb
   - **Galerija** -- Mreža več fotografij ali postavitev masonry
   - **Pričevanje** -- Ena ali več izjav z imenom avtorja, vlogo in fotografijo
   - **Družbena omrežja** -- Povezane ikone za profile vaše cerkve na družbenih omrežjih: Facebook, Instagram, WhatsApp, YouTube, X, TikTok, Vimeo in Podcast. Vnesite povezavo za vsakega, ki ga želite prikazati; za **WhatsApp** uporabite povezavo `https://wa.me/` s svojo številko ali povabilno povezavo v skupino
   - **Odštevanje** -- Časovnik, ki odšteva do datuma ali tedenskega časa bogoslužja
   - **Statistika** -- Vrsta velikih številk z oznakami (člani, leta, podružnice)
   - **Napredek kampanje** -- Živa vrstica napredka za kampanjo darovanj, ki prikazuje skupni znesek, zbran za cilj sklada
   - **Mreža osebja** -- Kartice s fotografijami članov skupine; skupina mora imeti vklopljeno možnost **javnega seznama**
   - **Časi bogoslužij** -- Urnik bogoslužij vaših podružnic, samodejno prevzet iz nastavitev obiskovanja
   - **Pridige** -- Vaša knjižnica pridig, kot celoten brskalnik ali v postavitvi mreže, seznama ali izpostavljene najnovejše
   - **Zemljevid** -- Vdelan zemljevid, centriran na naslov vaše cerkve
   - **Tabela** -- Preprosta mreža vrstic in stolpcev za tabelarično vsebino
   - **Besedilo s fotografijo** -- Besedilo in slika drug ob drugem
   - **Logotip** -- Logotip vaše cerkve, prevzet iz [videza](./appearance.md)
   - **Prenos v živo** -- Predvajalnik vašega prenosa v živo, vdelan neposredno na stran
   - **Podcast** -- Seznam epizod, pridobljenih iz zunanjega RSS vira podcasta, ki ga vnesete, z nastavitvami za število prikazanih epizod ter za prikaz datumov in opisov. Vsaka epizoda na objavljeni strani ima predvajalnik zvoka in povezavo **Prenesi**, ki shrani zvočno datoteko epizode pod naslovom epizode. To je namenjeno prikazu katerega koli vira podcasta na vaši strani; če želite objaviti lastne pridige kot podcast, glejte [upravljanje pridig](../sermons/managing-sermons.md#your-podcast-feed)
   - **Darovanje** -- Gumb za darovanje ali vdelan obrazec za darovanja
   - **HTML** -- Vaša lastna surova HTML koda za napredne primere, na primer vdelavo pripomočka tretje osebe (glejte [uporaba elementa HTML](#using-the-html-element))
   - **iFrame** -- Vdelajte zunanjo vsebino z naslovom URL
3. Element nastavite z nastavitvenim podoknom, ki se prikaže.

### Uporaba elementa HTML

Element **HTML** ima dve polji:

- **Vsebina HTML** -- Označevanje, ki se prikaže na strani. Vse oznake `<script>`, ki jih tukaj vključite, se izvedejo na vaši objavljeni strani.
- **JavaScript (brez oznake script)** -- Koda skripte, ki se izvede ob nalaganju strani. Sem lahko prilepite tudi vdelovalno kodo ponudnika z oznakami `<script>` in se bo izvedla na objavljeni strani.

Če v polje JavaScript prilepite samo spletni naslov (na primer povezavo do slike), se polje obarva rdeče z opozorilom *"To je spletni naslov, ne JavaScript."* Samo naslov v tem polju ne naredi ničesar. Če želite prikazati sliko, uporabite element **Slika** ali vnesite `<img src="...">` v **Vsebino HTML**.

### Uporaba elementa Koledar {#using-the-calendar-element}

Element **Koledar** prikazuje dogodke iz enega od vaših koledarjev:

1. Pod **Izberi** izberite **Skupinski koledar** (dogodki ene skupine -- seznam prikazuje skupine, katerih član ste) ali **Kuriran koledar** (koledar, ki ste ga sestavili pod **Koledarji**; glejte [kuriran koledar](../calendars/curated-calendar.md)).
2. Pod **Izberi koledar** izberite skupino ali koledar.
3. Pod **Prikaz** izberite, kako ga želite prikazati:
   - **Mesečni koledar** -- Mreža meseca, po kateri lahko obiskovalci brskajo.
   - **Prihajajoči dogodki** -- Mreža ploščic za naslednjih 12 prihajajočih dogodkov, pri čemer se ponavljajoči dogodek prikaže enkrat na njegov naslednji datum. Vsaka ploščica prikazuje fotografijo dogodka (ali njegov naslov na temni barvi vaše teme, če fotografije ni), značko datuma, dan in čas ter prvo vrstico opisa. Gumb **Naroči** nad ploščicami omogoča obiskovalcem, da kopirajo povezavo ICS koledarja ali jo prenesejo. Za ta prikaz se pojavi nastavitev **Postavitev**: **Mreža** (privzeto) ali **Drsenje (samodejno)**, ki razporedi ploščice v eno vrsto, ki se sama pomika.
4. Če želite prikazati samo nekatere dogodke, v polje **Samo dogodki z oznako** vnesite oznako -- na primer `mladina`. Prikazani bodo samo dogodki, katerih **Oznake** vsebujejo to besedo. Če polje pustite prazno, bodo prikazani vsi dogodki. Oznake nastavite pri vsakem dogodku; glejte [dodajanje in urejanje dogodkov](../calendars/creating-calendars.md#adding-and-editing-events).

V obeh prikazih klik na dogodek odpre njegovo lastno stran na vaši spletni strani. Stran dogodka prikazuje fotografijo dogodka, naslov, datum in čas ter opis, poleg polja z **Kdaj** (vključno z vzorcem ponavljanja za ponavljajoči dogodek) in **Kje** (sobe, rezervirane zanj). Prikaže tudi gumb **Prijava na dogodek**, kadar je prijava vklopljena, in povezavo **Dodaj v moj koledar**, ki dogodek prenese kot datoteko koledarja. Stran je pripravljena tako, da iskalniki lahko v rezultatih prikažejo datum in podrobnosti dogodka. Strani dogodkov iz kuriranih koledarjev, prikazane na vaših straneh (za dogodke v naslednjih šestih mesecih), so prav tako navedene v vašem mestnem zemljevidu, da jih iskalniki lahko najdejo.

### Ponovno razvrščanje vsebine

Povlecite oddelke ali elemente z ročico (šest pik) na levi strani vsakega elementa, da jih ponovno razvrstite. Elemente lahko povlečete znotraj oddelka ali jih premaknete med oddelke.

## Oblikovanje strani

### Slogi oddelkov

Kliknite kateri koli oddelek, da odprete njegovo podokno slogov. Nastavite lahko:

- **Ozadje** -- Enobarvno, prelivanje ali slika. Pri uporabi slike za ozadje vam izbirnik **Žariščna točka** omogoča, da kliknete in določite, kateri del slike ostane v središču, ko se oddelek prilagaja velikosti, možnost **Prekrivanje** pa vam omogoča dodajanje polprosojnega odtenka čez sliko za boljšo berljivost besedila
- **Odmik** -- Razmik nad in pod vsebino v oddelku
- **Širina** -- Čez celotno širino ali sredinsko/omejeno
- **Ločila** -- Dekorativni oblikovni ločevalniki (valovi, poševnice, krivulje, trikotniki in drugi) na zgornjem ali spodnjem robu oddelka, z možnostmi barve, višine in obračanja

### Slogi elementov

Kliknite kateri koli element, da odprete njegovo podokno slogov. Pogoste možnosti vključujejo velikost pisave, barvo, poravnavo, zunanji odmik in notranji odmik. Pri slikah lahko nastavite alternativno besedilo in cilje povezav.

### Lastni CSS

Za napredno oblikovanje ima vsak oddelek in element polje **Lastni CSS**, kamor lahko zapišete lastna pravila CSS. Ta so omejena na ta element, zato nehote ne vplivajo na preostanek strani.

:::tip
Če morate sloge uporabiti po celotni spletni strani -- na primer posebno pisavo ali globalno barvo -- uporabite nastavitve [videza](./appearance.md) namesto lastnega CSS-ja na posameznih straneh.
:::

## Predogled strani

Za preverjanje, kako vaša stran izgleda pri različnih velikostih zaslona, uporabite kontrolnike predogleda v orodni vrstici:

- **Namizje** -- Pogled brskalnika čez celotno širino
- **Mobilni** -- Ozek pogled v velikosti telefona

Na telefonih se stolpci v vrstici zložijo drug nad drugega na polno širino, razen če v nastavitvah vrstice zanje nastavite **Širino za mobilne**. Seznami pridig in podcastov prav tako na telefonih postavijo besedilo vsake epizode pod njeno sličico.

Če želite videti objavljeno stran natanko tako, kot jo bodo videli obiskovalci, se vrnite na seznam strani in kliknite pot strani. Odpre se v novem zavihku brskalnika.

## Preverjanje dostopnosti

Kliknite ikono **Dostopnost** v orodni vrstici, da hitro preverite pogoste težave -- slike brez alternativnega besedila, nizek barvni kontrast ali naslove v napačnem vrstnem redu. Vsaka težava se neposredno poveže z elementom, ki potrebuje pozornost, da jo lahko popravite na mestu.

## Razveljavitev sprememb

Urejevalnik samodejno beleži zgodovino urejanja. Za krmarjenje uporabite gumbe v orodni vrstici ali bližnjične tipke:

- **Razveljavi** (Ctrl+Z / Cmd+Z) -- Povrne vašo zadnjo dejanje
- **Uveljavi znova** (Ctrl+Shift+Z ali Ctrl+Y / Cmd+Shift+Z) -- Ponovno uveljavi razveljavljeno dejanje

Stran lahko obnovite tudi na prejšnji posnetek. Kliknite **Poglej zgodovino** v orodni vrstici, da vidite seznam shranjenih posnetkov z opisi, nato pa kliknite kateri koli vnos, da se vrnete na to točko.

:::warning
Obnovitev posnetka nadomesti trenutno vsebino strani z različico posnetka. Tega ni mogoče razveljaviti s standardnim gumbom za razveljavitev. Če želite ohraniti možnost vrnitve, shranite posnetek trenutnega stanja, preden obnovite starejšega.
:::

## Shranjevanje in objava

Spremembe se shranjujejo samodejno med delom. Indikator stanja v orodni vrstici prikazuje, ali so vaše spremembe shranjene.

### Stanje osnutka in objave

Strani lahko imajo stanje **objavljeno**, ki določa, kdaj obiskovalci vidijo vaše spremembe. Orodna vrstica prikazuje oznako s trenutnim stanjem:

- **V živo ob shranjevanju** -- Stran ne uporablja poteka objave. Vsaka shranjena sprememba takoj gre v živo. To je privzeto za nove strani.
- **Neobjavljene spremembe** -- Stran je bila že objavljena, vendar ste od zadnje objave naredili spremembe. Obiskovalci še vedno vidijo prej objavljeno različico.
- **Objavljeno** -- Stran je v živo in vaša shranjena vsebina ustreza temu, kar vidijo obiskovalci.

Za objavo sprememb kliknite gumb **Objavi** v orodni vrstici. Stran takoj postane vidna v živo.

Za povrnitev na zadnjo objavljeno različico, ne da bi to vplivalo na to, kar vidijo obiskovalci, odprite meni z možnostmi (⋮) in kliknite **Zavrzi neobjavljene spremembe**.

Za prenehanje uporabe poteka objave odprite meni z možnostmi in kliknite **Izklopi objavo**. Urejanja nato spet takoj gredo v živo.

:::tip
Potek osnutka/objave uporabite, kadar želite pripraviti stran -- na primer za prihajajoči dogodek -- in jo objaviti šele v pravem trenutku. Zgradite in si oglejte stran, nato kliknite Objavi, ko boste pripravljeni.
:::

## Sorodni članki

- [Upravljanje strani](./managing-pages.md) -- Ustvarjanje strani, nastavitev naslovov URL in upravljanje navigacije spletne strani
- [Videz](./appearance.md) -- Nastavitev barv, pisav in blagovne znamke za celotno spletno stran
- [Datoteke](./files.md) -- Nalaganje slik in dokumentov za uporabo v urejevalniku
- [Ustvarjanje obrazcev](../forms/creating-forms.md) -- Izdelava obrazcev, ki jih lahko vdelate na strani
