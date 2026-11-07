---
title: "Ustvarjanje obrazcev"
---

# Ustvarjanje obrazcev

<div class="article-intro">

Ustvarite obrazce po meri, s katerimi zbirate podatke od članov občine. Obrazce lahko ustvarite za prijave na dogodke, ankete, obiskovalne kartice, prijave za članstvo in podobno. Obrazci so lahko povezani z osebami v vaši bazi podatkov ali uporabljeni kot samostojne strani z lastnim javnim naslovom URL.

</div>

## Video za usposabljanje

<YouTube id="sr9wxEj9ghQ" title="Ustvarjanje obrazcev in upravljanje oddaj v B1" next="Objava vaše cerkvene spletne strani v B1" nextUrl="/docs/b1-admin/guides/launch-website" />

<div class="prereqs">
<h4>Preden začnete</h4>

- Za obrazce **Osebe** (povezane z zapisi oseb) najprej potrebujete [osebe v vaši bazi podatkov](../people/adding-people.md).
- Za obrazce, ki zbirajo **plačila**, morate imeti [nastavljen Stripe za spletno darovanje](../donations/online-giving-setup.md).

</div>

## Ustvarjanje novega obrazca

1. Odprite [meni Skoči](../introduction.md#getting-around-with-the-jump-menu) (iskalna vrstica na vrhu levo v B1 Admin), razširite **Osebe** in kliknite **Obrazci**.
2. Kliknite **Dodaj obrazec**.
3. Vnesite **ime** obrazca.
4. V spustnem meniju **Poveži z** izberite vrsto obrazca:
   - **Osebe** — Poveže oddaje z [zapisi oseb](../people/adding-people.md) v vaši bazi podatkov. Obrazci za osebe se izpolnijo iz zapisa osebe, zato nimajo povezave za deljenje.
   - **Samostojno** — Ustvari neodvisen obrazec z lastnim javnim naslovom URL, idealen za zunanje prijave. Samo samostojni obrazci ponujajo [fotografijo glave](#adding-a-header-photo), [QR kodo](#sharing-a-form-with-a-qr-code), [povezano skupino](#linking-a-form-to-a-group) in **Ustvari zapis osebe iz oddaj**.
5. Kliknite **Shrani**, da ustvarite obrazec.

Vaš novi obrazec se bo prikazal na seznamu. Kliknite nanj, da začnete dodajati vprašanja.

## Tiskanje praznega obrazca {#printing-a-blank-form}

Potrebujete papirno kopijo za razdelitev – na primer obiskovalno kartico za pult za dobrodošlico ali obrazec, ki ga nekdo brez dostopa do interneta lahko izpolni ročno? Kliknite **Natisni** poleg obrazca na glavnem seznamu Obrazci, da odprete predogled, nato kliknite **Natisni**. Prazna polja se natisnejo s podčrtajem ali potrditvenim poljem za vsako vprašanje, da jih lahko ljudje izpolnijo ročno; obvezna vprašanja so označena z zvezdico. Na vrhu strani je logotip vaše cerkve (**logotip za svetle površine** iz [Spletna stran > Videz](../website/appearance.md), če ste ga naložili), pod njim ime cerkve, nato ime obrazca. Drugih možnosti tiskanja ni – natisnete cel obrazec ali nič.

## Deljenje obrazca s QR kodo {#sharing-a-form-with-a-qr-code}

Samostojni obrazci imajo poleg sebe na glavnem seznamu Obrazci povezavo **QR koda** (arhivirani obrazci je nimajo). Kliknite jo, da odprete QR kodo za javni naslov URL obrazca; pod njo je prikazana povezava. Kliknite **Prenesi PNG**, da shranite kodo kot sliko, ki jo lahko natisnete na biltene ali prikažete na diapozitivih. Kdorkoli jo skenira, odpre obrazec na svojem telefonu.

## Dodajanje vprašanj {#adding-questions}

1. Odprite svoj obrazec in pojdite na zavihek **Vprašanja**.
2. Kliknite **Dodaj vprašanje**.
3. V spustnem meniju Ponudnik izberite **vrsto polja**. Na voljo so med drugim:
   - **Besedilno polje** — Za kratke tekstovne odgovore
   - **Datum** — Za izbiro datuma
   - **E-pošta** — Za e-poštne naslove
   - **Telefonska številka** — Za vnos telefonske številke
   - **Izbira med možnostmi** — Za izbiro med vnaprej določenimi možnostmi
   - **Plačilo** — Za zbiranje plačil
4. Vnesite **Naslov** in izbirni **Opis** vprašanja. Opis se pod vprašanjem prikaže, ko ljudje izpolnjujejo obrazec, zato ga uporabite za namige, kot je „Navedite morebitne alergije, ki bi jih morali poznati.“
5. Označite **Zahtevaj odgovor**, če je polje obvezno.
6. Kliknite **Shrani**.
7. Ponovite za dodajanje več vprašanj.

:::warning
Vrsta polja **Plačilo** zahteva nastavljen Stripe. Če še niste nastavili spletnega darovanja, si oglejte [Nastavitev spletnega darovanja](../donations/online-giving-setup.md), preden dodate polja za plačilo. Ljudje, ki plačajo na obrazcu brez prijave, morajo pred sprejemom kartice označiti potrditveno polje **Nisem robot**.
:::

## Upravljanje članov obrazca {#managing-form-members}

1. Odprite svoj obrazec in pojdite na zavihek **Člani obrazca**.
2. Poiščite osebo in jo dodajte z vlogo:
   - **Skrbnik** — Lahko ureja obrazec in pregleduje vse oddaje.
   - **Samo ogled** — Lahko pregleduje oddaje, vendar ne more urejati obrazca.

## Povezovanje obrazca s skupino {#linking-a-form-to-a-group}

Katerikoli samostojni obrazec lahko povežete s skupino – na primer obrazec za prošnje za molitev za malo skupino ali zdravstveno soglasje za mladinsko potovanje:

1. Odprite **Podrobnosti** svojega obrazca.
2. Pod **Povezana skupina** izberite skupino ali pustite nastavljeno na **Brez**.
3. Kliknite **Shrani**.

Ko je obrazec povezan:

- **Člani skupine** vidijo obrazec v razdelku **Obrazci** na strani skupine na B1.church, medtem ko je obrazec odprt, z gumbom **Izpolni**, ki ga odpre (glejte [Podrobnosti skupine](../../b1-church/groups/group-details.md#linked-forms)).
- **Vodje skupin** vidijo tudi zaprte obrazce in lahko preberejo odgovore vsake oddaje ter jih natisnejo (eno oddajo ali **Natisni vse**). Vodje lahko odgovore samo pregledujejo – obrazca ne morejo urejati, razen če so tudi [člani obrazca](#managing-form-members).
- **V B1 Admin** stran skupine prikazuje razdelek **Povezani obrazci**, ki navaja vsak povezani obrazec kot **Odprt** ali **Zaprt**. Razdelek se prikaže vodjem skupine in osebam, ki lahko upravljajo obrazce. Glejte [Člani skupine](../groups/group-members.md#linked-forms).

Obrazec je zaprt, ko je zunaj svojega časovnega okvira razpoložljivosti. Arhivirani obrazci se na strani skupine ne prikazujejo.

### Samodejno dodajanje oddajalcev v skupino {#automatically-adding-submitters-to-a-group}

Povezava obrazca s skupino sama po sebi nikogar ne doda vanjo. Če želite vsakega oddajalca dodati na seznam članov povezane skupine, v podrobnostih obrazca vklopite tudi **Ustvari zapis osebe iz oddaj** in kliknite **Shrani**.

Vsakič, ko nekdo odda obrazec, se ujemajoča ali na novo ustvarjena oseba doda v skupino (obstoječi člani skupine se preskočijo). To je uporabno na primer za prijavni obrazec za tabor, ki naj samodejno ustvari seznam skupine za tabor.

### Pošiljanje sporočila za nadaljnje sledenje

Ko je vklopljena možnost **Ustvari zapis osebe iz oddaj**, lahko tudi vsaki osebi, ki odda obrazec, pošljete e-poštno sporočilo. V podrobnostih obrazca izpolnite **Zadeva e-pošte za nadaljnje sledenje** in **Besedilo e-pošte za nadaljnje sledenje**. V obeh lahko uporabite žetona `{firstName}` in `{churchName}`. E-pošta se pošlje samo, ko sta obe polji izpolnjeni.

:::info
Sporočila za nadaljnje sledenje se pošljejo šele, ko vaši cerkvi odobrijo pošiljanje skupinske e-pošte, in štejejo v dnevno omejitev e-pošte vaše cerkve. Glejte [Vklop skupinske e-pošte za vašo cerkev](../groups/group-members.md#turning-on-group-email-for-your-church).
:::

## Podvajanje obrazca

Če želite obrazec uporabiti kot izhodišče za novega, kliknite **Podvoji** poleg obrazca na seznamu Obrazci in potrdite. B1 ustvari natančno kopijo obrazca – vključno z vsemi vprašanji –, ki jo nato lahko preimenujete in neodvisno urejate.

:::tip
Podvajanje je priročno za ponavljajoče se dogodke, pri katerih vprašanja za prijavo ostajajo enaka iz leta v leto. Podvojite lanski obrazec, posodobite ime in datume, in ste pripravljeni.
:::

## Konfiguriranje lastnosti obrazca

Ime in nastavitve obrazca lahko kadarkoli posodobite. Za samostojne obrazce boste videli tudi edinstven **javni naslov URL**, ki ga lahko delite s komer koli, ter polje **Opis** – besedilo, prikazano nad vprašanji na javni strani obrazca, uporabno za to, da ljudem pred izpolnjevanjem povete, čemu obrazec služi.

### Dodajanje fotografije glave {#adding-a-header-photo}

Samostojni obrazci lahko na vrhu prikažejo **fotografijo glave**. V podrobnostih obrazca kliknite okvir za fotografijo ali **Dodaj fotografijo**, nato izberite ali naložite sliko (obreže se na obliko 16:9). Kliknite **Shrani**. Fotografija se prikaže pod imenom obrazca, nad opisom, na strani javnega naslova URL obrazca in povsod, kjer je obrazec vdelan z elementom spletne strani **Obrazec**. Uporabite **Spremeni fotografijo**, da jo zamenjate, ali **Odstrani**, da jo odstranite.

Polje **Sporočilo zahvale** uporabite, da nastavite, kaj ljudje vidijo po oddaji obrazca, vključno na strani javnega naslova URL obrazca. Če ga pustite prazno, vidijo „Hvala za oddajo obrazca!“

:::tip
Samostojni obrazci so odlični za prijave na dogodke. Javni naslov URL delite prek e-pošte ali družbenih omrežij ali pa obrazec vdelajte neposredno na svojo cerkveno spletno stran.
:::

:::info
Za vdelavo obrazca na vašo spletno stran B1 pojdite v urejevalnik spletne strani, dodajte nov razdelek in izberite element **Obrazec**. Nato izberite obrazec, ki ga želite prikazati. Podrobnosti o urejanju spletne strani najdete v [Upravljanje strani](../website/managing-pages.md).
:::
