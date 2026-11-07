---
title: "Krmarjenje po B1App"
description: "Krmarite po portalu članov B1.church na telefonu ali računalniku: nadzorna plošča Domov, spodnja vrstica zavihkov, stran Več in stran Jaz."
---

# Krmarjenje po B1App

<div class="article-intro">

Spletni portal za člane na B1.church je spletna aplikacija za telefone, ki deluje pod potjo `/mobile`. Deluje v vseh brskalnikih in jo lahko namestite na začetni zaslon. Ta stran pojasnjuje nadzorno ploščo Domov, spodnjo vrstico zavihkov, stran Več in stran Jaz.

</div>

## Predstavitveni video

<YouTube id="8XKRZvvAbXg" title="Ogled aplikacije za člane B1.church" next="Ogled B1 prijave" nextUrl="/docs/b1-checkin" />

<div class="prereqs">
<h4>Preden začnete</h4>

- Za ogled osebnih podatkov morate biti [prijavljeni](./logging-in.md). Obiskovalci brez prijave si lahko še vedno ogledajo javno vsebino, kjer funkcija zahteva račun, pa se jim prikaže gumb **Prijava**.

</div>

## Domov {#home}

Ko odprete `https://yourchurchname.b1.church/mobile`, vas bo stran popeljala na nadzorno ploščo **Domov** na naslovu `/mobile/dashboard`. Domov je začetna stran portala za člane. Začne se s pozdravom (»Dobro jutro«, »Dober dan« ali »Dober večer« in vaše ime) ter današnjim datumom, nato pa sledijo razdelki, ki se prikažejo le, kadar so pomembni:

- **Ploščice s fotografijami** -- zavihki, ki jim je vaša cerkev dodelila fotografijo (vključno z Verzom dneva), se prikažejo kot ploščice s fotografijami pod imenom vaše cerkve. Glede na izbiro vaše cerkve so razporejene v dvostolpčno mrežo, vrsto, ki jo lahko pomikate vstran (ki se lahko tudi samodejno premika), ali seznam z majhno sličico ob vsakem imenu -- glejte [Ploščice na začetnem zaslonu](../../b1-admin/settings/mobile-app.md#home-screen-tiles). Vsak zavihek s fotografijo se prikaže tukaj, tudi če ima svoje mesto že v vrstici zavihkov.
- **Najnovejša pridiga** -- najnovejša pridiga vaše cerkve, s povezavo **Vse pridige**
- **Verz dneva** -- današnji verz; dotaknite se ga, da odprete celotno stran [Verz dneva](../content/verse-of-the-day.md)
- **Služite** -- vaše naslednje dodeljene službe, s povezavo **Vsi načrti**. Če katera od dodelitev še čaka na vaš odgovor, so te prikazane najprej z oznako **Potrebuje odgovor** ter gumboma **Sprejmi** in **Zavrni**, da se lahko odzovete kar na strani Domov (pri **Zavrni** morate najprej potrditi). Sicer imajo vaše naslednje dodelitve oznako **Sprejeto** ali **Potrjeno**. Dotaknite se dodelitve, da odprete njen načrt.
- **Vaše skupine** -- do tri vaše skupine z njihovim časom srečanja in lokacijo ter povezavo **Vse skupine**
- **Prihajajoči dogodki** -- ko ste prijavljeni, se prikažejo naslednji trije prihajajoči dogodki iz skupin, katerih član ste, vsak z datumom in časom (ter sličico, če ima dogodek fotografijo). Dotaknite se dogodka, da odprete dogodke njegove skupine. Dotaknite se **Vsi prihajajoči dogodki**, da na strani [Jaz](./me-page.md#upcoming) odprete celoten seznam prihajajočih dogodkov, ki vključuje tudi vaše dodelitve služb in prijave.
- **Moja udeležba** in **Moji obrazci** -- če jih vaša cerkev vklopi, koliko ste se udeležili v zadnjih 90 dneh z vašima dvema zadnjima obiskoma ter vaši dve zadnji oddaji obrazcev, s povezavami do celotnih seznamov. Ti razdelki se vedno prikažejo na vaši strani [Jaz](./me-page.md), ne glede na to -- glejte [Razdelki na začetnem zaslonu](../../b1-admin/settings/mobile-app.md#home-screen-sections).
- **Darovanja** -- koliko ste darovali letos (»Darovano v« tekočem letu), gumb **Daruj** (prikazan le, če vaša cerkev ponuja spletna darovanja) in povezava **Zgodovina** do vaše [zgodovine darovanj](../giving/donation-history.md). Skrito je, če je vaša cerkev omejila zgodovino darovanj članov na prejšnje leto ali jo skrila. V tem primeru se orodje za darovanja vaše cerkve prikaže kot gumb pod **Več od**.
- **Več od** *vaše cerkve* -- gumbi za preostala orodja, ki jih je vaša cerkev vklopila in ki še niso v vrstici zavihkov ali prikazana zgoraj. Tiste, ki jih najpogosteje uporabljate, se premaknejo na začetek.

Razdelki za službe, skupine, udeležbo, obrazce in darovanja se prikažejo le, če ste prijavljeni, če ima vaša cerkev to orodje vklopljeno in če je kaj za prikaz -- na primer prihajajoča dodelitev ali vsaj ena skupina. Na računalniku je stran Domov razporejena v dva stolpca.

Če niste prijavljeni, Domov namesto pozdrava prikaže naslov **Dobrodošli**, kratek poziv (»Prijavite se, če želite videti svoje skupine, darovanja in še več.«) ter gumb **Prijava**. Poziv se prikaže tudi takrat, ko vaša cerkev na strani Domov še ničesar ni nastavila. Vaša cerkev lahko ta poziv preoblikuje ali skrije -- glejte [Nastavitve mobilne aplikacije](../../b1-admin/settings/mobile-app.md#home-screen-sign-in-prompt). Ko je skrit, se še vedno lahko prijavite prek strani **Več** ali strani **Jaz**.

## Spodnja vrstica zavihkov

Na telefonu je vrstica zavihkov pritrjena na spodnji rob zaslona:

- **Domov** -- vedno prvi zavihek
- Do tri zavihki, ki jih je nastavila vaša cerkev
- **Več** -- odpre stran Več

Zaslone, vgrajene v aplikacijo (na primer Skupine, Darovanja ali Načrti), dobijo mesta v vrstici zavihkov najprej; morebitna prosta mesta pripadnejo lastnim straneh vaše cerkve. Povezave do zunanjih spletnih strani in Verz dneva nikoli ne dobijo zavihka. Če je vaša cerkev nastavila več zavihkov, kot jih lahko prikaže vrstica, ostanejo ostali izgubljeni: prikažejo se na strani **Več** in v razdelku **Več od** na strani Domov. Skrbniki cerkve nastavijo vrstni red zavihkov v B1 Admin pod **Mobilna aplikacija → Navigacija**.

## Na računalniku

Na širših zaslonih, kot so računalniki ali veliki tablični računalniki, je spodnja vrstica zavihkov nadomeščena z glavo na vrhu zaslona v barvi vaše cerkve. Prikazuje logotip vaše cerkve oziroma njeno ime, če logotip ni nastavljen (kliknite ga, da se vrnete na Domov), **Domov**, do pet zavihkov, ki jih je nastavila vaša cerkev, in **Več**, na desni pa zvonec ter vašo profilno fotografijo. Ko odprete podrobni zaslon, se nad vsebino strani prikaže povezava **Nazaj**.

## Stran Več

Dotik na **Več** odpre stran Več na naslovu `/mobile/more`. Vsebuje:

- Vaše ime in fotografijo s povezavo **Uredi profil** -- glejte [Urejanje profila](./editing-your-profile.md)
- Vsak zavihek, ki ga je nastavila vaša cerkev, v vrstnem redu, pod imenom vaše cerkve. Povezave do zunanjih spletnih strani se odprejo v novem zavihku brskalnika.
- Razdelek **Račun** z naslednjimi možnostmi:
  - **Jaz** -- vaša osebna stran (samo za prijavljene)
  - **Videz** -- preklop med **Svetli način** in **Temni način**
  - **Skrbniški portal** -- prikazan le, če imate skrbniška dovoljenja v svoji cerkvi; odpre B1 Admin v novem zavihku
  - **Namesti aplikacijo** -- odpre [navodila za namestitev](./installing-pwa.md) na naslovu `/mobile/install` (skrito, ko je aplikacija že nameščena)
- **Odjava** oziroma gumb **Prijava**, če niste prijavljeni
- Ime vaše cerkve in povezavo do pravilnika o zasebnosti

## Vrstica aplikacije

Na telefonu vrstica na vrhu vsakega zaslona prikazuje:

- Logotip vaše cerkve (oziroma njeno ime, če cerkev ni naložila logotipa) na strani Domov in drugih glavnih zaslonih ali puščico nazaj, kadar ste se pomaknili na podrobni zaslon. Naslov zaslona se prikaže na vrhu same strani.
- Ikono **zvončka** za obvestila in sporočila z značko za neprebrane elemente -- glejte [Obvestila in sporočila](#notifications-and-messages) spodaj
- Vašo **profilno fotografijo**, ki odpre vaš profil na naslovu `/mobile/profileEdit` -- glejte [Urejanje profila](./editing-your-profile.md)

Zvonec in profilna fotografija se prikažeta le, ko ste prijavljeni.

## Obvestila in sporočila

Dotik zvončka odpre okno z dvema razdeloma:

- **Sporočila** -- vaši zadnji zasebni pogovori s povezavo **Novo sporočilo** za začetek novega
- **Obvestila** -- vaša zadnja obvestila z oznako **Novo** pri neprebranih. Dotaknite se obvestila, da odprete skupino, načrt ali pogovor, iz katerega izvira.

Vsak razdelek prikazuje, koliko neprebranih elementov vsebuje. Dotaknite se **Poglej vse** na dnu, da odprete celoten nabiralnik na naslovu `/mobile/notifications`.

## Strani z razdelki

Podrobne strani -- skupina, načrt, vaša stran Jaz ter zaslona Načrti in Darovanja -- so zasnovane kot ena stran z razdelki namesto zavihkov. Vsak razdelek prikazuje kratek predogled, povezava v glavi razdelka (na primer **Vsi člani**, **Vsi dogodki** ali **Celoten vrstni red bogoslužja**) pa odpre celoten seznam. Povezava **Nazaj na** na vrhu tega pogleda vas vrne na stran, s katere ste prišli.

## Stran Jaz

**Jaz** (`/mobile/me`) je vaše osebno središče. Prikazuje vaše ime in fotografijo z gumboma **Uredi profil** in **Nastavitve** (za [nastavitve obveščanja](./notification-preferences.md)), nato pa, kaj vas čaka -- dodelitve služb, prijave na dogodke in dogodke skupin -- ter vaše gospodinjstvo, vaše skupine, vaša [darovanja](../giving/index.md) v letu, obrazce, ki ste jih oddali, zgodovino udeležbe, vaše [prijave](../events/my-registrations.md) ter nedavna obvestila in sporočila. Podrobnosti najdete v razdelku [Stran Jaz](./me-page.md).

Če niste prijavljeni, stran Jaz namesto tega prikaže gumb **Prijava**.

## Namestitev na začetni zaslon

Portal za člane je progresivna spletna aplikacija (PWA). Obiščite `/mobile/install` (ali izberite **Namesti aplikacijo** na strani Več) za navodila po korakih za vašo napravo. Ko je aplikacija nameščena, se odpre čez cel zaslon z začetnega zaslona, brez elementov brskalnika. Glejte [Namestitev kot aplikacija (PWA)](./installing-pwa.md).

## Javna spletna stran vaše cerkve

Zunaj portala za člane ima javna spletna stran vaše cerkve svojo glavno navigacijo s povezavami, ki so jih nastavili vaši skrbniki -- strani, kot so [pridige](../content/sermons.md), [Biblija](../content/bible.md), [prenosi v živo](../content/live-streaming.md) in javni seznam skupin. Na telefonu so te povezave skrite za ikono hamburgerja v zgornjem desnem kotu glave.

:::info
Zavihki in orodja, ki jih vidite, se razlikujejo glede na cerkev. Skrbniki preko B1 Admin nadzirajo, kateri razdelki so članom vidni, zato če ne vidite funkcije, opisane tukaj, je morda vaša cerkev ni vklopila.
:::
