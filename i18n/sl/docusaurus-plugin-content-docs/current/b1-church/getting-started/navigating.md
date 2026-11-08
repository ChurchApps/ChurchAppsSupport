---
title: "Krmarjenje po aplikaciji B1App"
description: "Poiščite pot po portalu za člane B1.church na telefonu ali računalniku: nadzorna plošča Domov, spodnja vrstica zavihkov, stran Več in stran Jaz."
---

# Krmarjenje po aplikaciji B1App

<div class="article-intro">

Portal za člane na B1.church je spletna aplikacija, namenjena predvsem telefonom, ki se nahaja pod `/mobile`. Deluje v vsakem brskalniku in jo lahko namestite na začetni zaslon. Ta stran pojasni nadzorno ploščo Domov, spodnjo vrstico zavihkov, stran Več in stran Jaz.

</div>

## Predstavitveni video

<YouTube id="8XKRZvvAbXg" title="Predstavitev člansko aplikacije B1.church" next="Predstavitev B1 Check-In" nextUrl="/docs/b1-checkin" />

<div class="prereqs">
<h4>Preden začnete</h4>

- Za ogled osebnih podatkov se morate [prijaviti](./logging-in.md). Obiskovalci, ki niso prijavljeni, si lahko še vedno ogledajo javno vsebino, pri funkcijah, ki zahtevajo račun, pa se jim prikaže gumb **Prijava**.

</div>

## Domov {#home}

Če odprete `https://yourchurchname.b1.church/mobile`, se odpre nadzorna plošča **Domov** na naslovu `/mobile/dashboard`. Domov je začetna stran portala za člane. Na vrhu je pozdrav („Dobro jutro“, „Dober dan“ ali „Dober večer“ z vašim imenom) in današnji datum, sledijo pa odseki, ki se prikažejo le, kadar so relevantni:

- **Fotografske ploščice** -- zavihki, ki jih je vaša cerkev opremila s fotografijo (vključno z Vers dneva), se pod imenom vaše cerkve prikažejo kot fotografske ploščice. Glede na izbiro vaše cerkve so razporejene v dvostolpčno mrežo, v vrsto, ki jo pomikate vstran (ta se lahko premika tudi sama), ali v seznam z majhno sličico ob vsakem imenu -- glejte [Ploščice na začetnem zaslonu](../../b1-admin/settings/mobile-app.md#home-screen-tiles). Kadar je v vrsti, ki jo pomikate vstran, več ploščic, kot jih lahko prikaže zaslon, pod njo pikice pokažejo, kje se nahajate; če se dotaknete pikice, preskočite na to ploščico. Vrsta se pomika naprej in se po zadnji ploščici znova začne pri prvi. Tu se prikažejo vsi zavihki s fotografijo, tudi tisti, ki imajo prostor tudi v spodnji vrstici zavihkov.
- **Zadnja pridiga** -- najnovejša pridiga vaše cerkve s povezavo **Vse pridige**
- **Vers dneva** -- današnji vers; če se ga dotaknete, se odpre celotna stran [Vers dneva](../content/verse-of-the-day.md)
- **Služite** -- vaše naslednje prihajajoče naloge pri služenju s povezavo **Vsi načrti**. Če naloga še čaka na vaš odgovor, se prikaže najprej, z značko **Čaka na odgovor** in gumboma **Sprejmi** / **Zavrni**, da lahko odgovorite kar na zaslonu Domov (pred zavrnitvijo vas aplikacija vpraša za potrditev). Sicer se vaše naslednje naloge prikažejo z značko **Sprejeto** ali **Potrjeno**. Če se dotaknete naloge, se odpre njen načrt.
- **Vaše skupine** -- do tri vaše skupine z uro in krajem srečanja ter povezavo **Vse skupine**
- **Prihajajoči dogodki** -- ko ste prijavljeni, se skupaj in po datumu razvrščeni prikažejo vaši naslednji trije prihajajoči dogodki skupin in prijave na dogodke, vsak z datumom in uro (ter sličico, če ima dogodek fotografijo). Vsaka vrstica ima oznako **Dogodek** (dogodek iz skupine, katere član ste) ali **Prijava** (dogodek, na katerega ste [prijavljeni](../events/registering.md)); dogodek, na katerega ste prijavljeni, se prikaže samo enkrat, kot prijava. Če se dotaknete dogodka, se odpre dogodki njegove skupine, če se dotaknete prijave, pa vaše [prijave](../events/my-registrations.md). Če se dotaknete **Vsi prihajajoči dogodki**, se na vaši [strani Jaz](./me-page.md#upcoming) odpre celoten seznam prihajajočih dogodkov, ki vključuje tudi vaše naloge pri služenju in prijave.
- **Moja udeležba** in **Moji obrazci** -- če jih vaša cerkev vklopi, število vaših obiskov v zadnjih 90 dneh z dvema najnovejšima obiskoma ter dve najnovejši oddaji obrazcev s povezavama na celotna seznama. To se vedno prikaže tudi na vaši [strani Jaz](./me-page.md), ne glede na nastavitev -- glejte [Odseki na začetnem zaslonu](../../b1-admin/settings/mobile-app.md#home-screen-sections).
- **Darovanje** -- koliko ste letos daroval(a) („Darovano v“ tekočem letu), gumb **Daruj** (prikaže se le, če vaša cerkev ponuja spletno darovanje) in povezava **Zgodovina** do vaše [zgodovine donacij](../giving/donation-history.md). Odsek je skrit, če je vaša cerkev omejila zgodovino darovanja članov na prejšnje leto ali jo skrila; v tem primeru se orodje za darovanje vaše cerkve prikaže kot gumb pod **Več od**.
- **Več od** *vaše cerkve* -- gumbi za preostala orodja, ki jih je vaša cerkev vklopila in ki niso že v spodnji vrstici zavihkov ali prikazana zgoraj. Tista, ki jih uporabljate najpogosteje, so na prvem mestu.

Odseki za službe, skupine, udeležbo, obrazce in darovanje se prikažejo samo, če ste prijavljeni, če ima vaša cerkev to orodje vklopljeno in če je kaj za prikaz -- na primer prihajajoča naloga ali vsaj ena skupina. Na računalniku je zaslon Domov razporejen v dva stolpca.

Če niste prijavljeni, Domov namesto pozdrava prikaže naslov **Dobrodošli**, kratko vabilo („Prijavite se, če želite videti svoje skupine, darovanja in več.“) ter gumb **Prijava**. Vabilo se prikaže tudi, kadar vaša cerkev na zaslonu Domov še ni ničesar nastavila. Vaša cerkev lahko to vabilo prepiše ali skrije -- glejte [Nastavitve mobilne aplikacije](../../b1-admin/settings/mobile-app.md#home-screen-sign-in-prompt). Kadar je skrito, se še vedno lahko prijavite z strani **Več** ali strani **Jaz**.

## Spodnja vrstica zavihkov

Na telefonu je vrstica zavihkov pritrjena na spodnji rob zaslona:

- **Domov** -- vedno prvi zavihek
- Do tri zavihki, ki jih je nastavila vaša cerkev
- **Več** -- odpre stran Več

Vgrajeni zasloni (na primer Skupine, Darovanje ali Načrti) dobijo mesta v vrstici najprej; prosta mesta pripadajo prilagojenim straneh vaše cerkve. Povezave do zunanjih spletnih strani in Vers dneva nikoli niso dodeljene zavihku. Če je vaša cerkev nastavila več zavihkov, kot jih lahko prikaže vrstica, se preostali ne izgubijo: prikažejo se na strani **Več** in v odseku **Več od** na zaslonu Domov. Vrstni red zavihkov nastavijo skrbniki cerkve v B1 Admin pod **Mobilno → Navigacija**.

### Zavihki z mapami {#folder-tabs}

Vaša cerkev lahko več zavihkov združi v **mapo**. Mapa se prikaže kot kateri koli drugi zavihek -- v spodnji vrstici zavihkov, na strani **Več** ali kot fotografska ploščica na zaslonu Domov. Če se je dotaknete, se odpre zaslon z imenom mape, ki navede zavihke v njej. Če imajo vsi zavihki v mapi fotografijo, so prikazani kot fotografske ploščice, sicer kot seznam. Povezave do zunanjih spletnih strani v mapi se odprejo v novem zavihku brskalnika. Zavihki v mapi se prikažejo samo na zaslonu mape, ne v spodnji vrstici zavihkov ali na strani **Več**. Mapa, v kateri ni ničesar, kar bi lahko videli, je skrita.

## Na računalniku

Na večjem zaslonu, kot je računalnik ali velik tablični računalnik, spodnjo vrstico zavihkov nadomesti glava na vrhu zaslona v barvi vaše cerkve. Prikazuje logotip vaše cerkve oziroma njen ime, če logotip ni nastavljen (če kliknete nanj, se vrnete na Domov), **Domov**, do pet zavihkov, ki jih je nastavila vaša cerkev, in **Več**, na desni pa zvonec in vašo profilno fotografijo. Ko odprete podrobni zaslon, se nad vsebino strani prikaže povezava **Nazaj**.

## Stran Več

Če se dotaknete **Več**, se odpre stran Več na naslovu `/mobile/more`. Vsebuje:

- Vaše ime in fotografijo s povezavo **Uredi profil** -- glejte [Urejanje profila](./editing-your-profile.md)
- Vse zavihke, ki jih je nastavila vaša cerkev, v vrstnem redu, pod imenom vaše cerkve. Povezave do zunanjih spletnih strani se odprejo v novem zavihku brskalnika.
- Odsek **Račun** z:
  - **Jaz** -- vaša osebna stran (samo za prijavljene)
  - **Videz** -- preklop med **Svetlim načinom** in **Temnim načinom**
  - **Skrbniški portal** -- prikaže se samo, če imate skrbniška dovoljenja v vaši cerkvi; odpre B1 Admin v novem zavihku
  - **Namesti aplikacijo** -- odpre [navodila za namestitev](./installing-pwa.md) na naslovu `/mobile/install` (skrito, ko je aplikacija že nameščena)
- **Odjava** ali gumb **Prijava**, če niste prijavljeni
- Ime vaše cerkve in povezavo do politike zasebnosti

## Glava aplikacije

Na telefonu vrstica na vrhu vsakega zaslona prikazuje:

- Logotip vaše cerkve (oziroma njen ime, če cerkev ni naložila logotipa) na zaslonu Domov in drugih glavnih zaslonih ali puščico nazaj, kadar ste odprli podrobni zaslon. Naslov zaslona je na vrhu same strani.
- Ikono **zvonca** za obvestila in sporočila z značko za neprebrane elemente -- glejte [Obvestila in sporočila](#notifications-and-messages) spodaj
- Vašo **profilno fotografijo**, ki odpre vaš profil na naslovu `/mobile/profileEdit` -- glejte [Urejanje profila](./editing-your-profile.md)

Zvonec in profilna fotografija se prikažeta samo, ko ste prijavljeni.

## Obvestila in sporočila

Če se dotaknete zvonca, se odpre plošča z dvema odsekoma:

- **Sporočila** -- vaši najnovejši zasebni pogovori s povezavo **Novo sporočilo** za začetek novega
- **Obvestila** -- vaša najnovejša obvestila z značko **Novo** pri neprebranih. Če se dotaknete obvestila, se odpre skupina, načrt ali pogovor, iz katerega izvira.

Vsak odsek prikaže, koliko neprebranih elementov vsebuje. Če se na dnu dotaknete **Prikaži vse**, se odpre celoten nabiralnik na naslovu `/mobile/notifications`.

## Strani z odseki

Podrobne strani -- skupina, načrt, vaša stran Jaz ter zaslona Načrti in Darovanje -- so zasnovane kot ena stran z odseki namesto zavihkov. Vsak odsek prikazuje kratek predogled, povezava v glavi odseka (na primer **Vsi člani**, **Vsi dogodki** ali **Celoten potek bogoslužja**) pa odpre celoten seznam. Povezava **Nazaj na** na vrhu tega pogleda vas vrne na stran, s katere ste prišli.

## Stran Jaz

**Jaz** (`/mobile/me`) je vaše osebno središče. Prikazuje vaše ime in fotografijo z gumboma **Uredi profil** in **Nastavitve** ([nastavitve obvestil](./notification-preferences.md)), nato pa, kaj vas čaka -- naloge pri služenju, prijave na dogodke in dogodke skupin -- sledijo vaše gospodinjstvo, vaše skupine, vaše [darovanje](../giving/index.md) letos, obrazci, ki ste jih oddali, zgodovina udeležbe, vaše [prijave](../events/my-registrations.md) ter vaša nedavna obvestila in sporočila. Podrobnosti najdete na [strani Jaz](./me-page.md).

Če niste prijavljeni, namesto tega stran Jaz prikaže gumb **Prijava**.

## Namestitev na začetni zaslon

Portal za člane je progresivna spletna aplikacija (PWA). Obiščite `/mobile/install` (ali izberite **Namesti aplikacijo** na strani Več) za navodila po korakih za vašo napravo. Ko je aplikacija nameščena, se odpre čez cel zaslon z začetnega zaslona, brez elementov brskalnika. Glejte [Namestitev kot aplikacija (PWA)](./installing-pwa.md).

## Javna spletna stran vaše cerkve

Zunaj portala za člane ima javna spletna stran vaše cerkve svojo navigacijo v glavi s povezavami, ki so jih nastavili vaši skrbniki -- strani, kot so [pridige](../content/sermons.md), [Biblija](../content/bible.md), [prenosi v živo](../content/live-streaming.md) in javni seznam skupin. Na telefonu so te povezave skrite za ikono hamburgerja v zgornjem desnem kotu glave.

:::info
Zavihki in orodja, ki jih vidite, se razlikujejo glede na cerkev. Skrbniki z B1 Admin nadzorujejo, kateri odseki so članom vidni, zato, če ne vidite funkcije, ki je tu opisana, je morda vaša cerkev ni vklopila.
:::
