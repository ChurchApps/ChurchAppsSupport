---
title: "Vloge in dovoljenja"
---

# Vloge in dovoljenja

<div class="article-intro">

Z vlogami lahko nadzorujete, do česa imajo različni uporabniki dostop znotraj vašega računa ChurchApps. Ustvarite lahko prilagojene vloge za osebje, prostovoljce in druge člane ekipe, pri čemer ima vsaka svojo raven dostopa, s katero ohranjate varnost podatkov.

</div>

## Videoposnetek za usposabljanje

<YouTube id="ZzCIkinVMnE" title="Vloge, dovoljenja in povabilo ekipe v B1" next="Nastavitev storitev in prisotnosti v B1" nextUrl="/docs/b1-admin/attendance/setup" />

<div class="prereqs">
<h4>Preden začnete</h4>

- Potrebujete dostop skrbnika domene ali vlogo z dovoljenjem za upravljanje vlog
- Pripravite seznam članov ekipe in območij, do katerih potrebujejo dostop
- Preglejte spodaj navedene kategorije dovoljenj, da načrtujete svoje vloge

</div>

## Dostop do vlog

1. V aplikaciji B1 Admin odprite [meni Jump](../introduction.md#getting-around-with-the-jump-menu) (iskalno polje na vrhu levo) in razširite **Nastavitve**.
2. Kliknite **Vloge**.
3. Stran Vloge prikazuje vse trenutno določene vloge za vašo cerkev. Stolpec **Člani** kaže, koliko uporabnikov je v posamezni vlogi, vrstica **(Everyone)** pa prikazuje **Vsi uporabniki**.

## Razumevanje strani Vloge

Stran Vloge je razdeljena na dva dela:

- **Levo** -- Prikazuje seznam članov, dodeljenih izbrani vlogi.
- **Desno** -- Prikazuje nastavitve dovoljenj, ki jih lahko konfigurirate za to vlogo.

Kliknite na ime katere koli vloge, da si ogledate in upravljate njene člane in dovoljenja.

## Dodajanje uporabnikov v vlogo

1. Izberite vlogo, v katero želite dodati člane.
2. Z **iskalnim poljem** na levi strani poiščite osebo, ki jo želite dodati.
3. Izberite osebo iz rezultatov iskanja.
4. Oseba bo takoj dodana v vlogo.

## Odstranjevanje uporabnikov iz vloge

1. Izberite vlogo, ki vsebuje uporabnika, ki ga želite odstraniti.
2. Na seznamu članov na levi strani poiščite osebo.
3. Kliknite **gumb za odstranitev** ob njenem imenu.

## Konfiguriranje dovoljenj

Vsaka vloga je lahko deležna dostopa do določenih področij aplikacije B1 Admin. V podoknu **Uredi dovoljenja** so dovoljenja razvrščena v razdelke, ki jih lahko razširite, na primer **Prisotnost**, **Vsebina**, **Darovanja**, **Obrazci in načrti**, **Lekcije**, **Sporočila**, **Osebe in skupine** ter **Naloge**. V polje **Filtriraj dovoljenja** vnesite besedilo, da prikažete samo ustrezna dovoljenja.

Potrditveno polje označite ali odznačite, da vlogi dodelite ali odvzamete dovoljenje. Naslov vsakega razdelka prikazuje, koliko dovoljenj ima vloga v tem razdelku, na primer **2 od 5**, in število se posodobi, ko označujete ali odznačujete polja.

### Dovoljenja za darovanja

Razdelek **Darovanja** vsebuje ta dovoljenja:

- **Ogled povzetkov darovanj** -- ogled razdelka Darovanja, vključno s stranmi Povzetek, Paketi, Skladi, Kampanje in Izpiski darovanj.
- **Ogled darovanj** -- ogled posameznih darovanj, na primer darov znotraj paketa.
- **Urejanje darovanj** -- popoln nadzor: dodajanje, urejanje in brisanje darovanj ter paketov ter [zapiranje in ponovno odpiranje paketov](../donations/batches.md#closing-and-reopening-a-batch).
- **Vnašanje darovanj** -- dodajanje paketov ter vnos, urejanje ali brisanje darovanj, vendar samo v paketih, ki so še odprti. Osebe z samo tem dovoljenjem ne morejo brisati paketov, jih zapirati ali ponovno odpirati ali spreminjati darov, ki so prispeli prek spletnega darovanja.
- **Urejanje nastavitev** -- upravljanje nastavitev darovanj.

Oseba z dovoljenjem **Vnašanje darovanj**, ki nima dovoljenja **Ogled povzetkov darovanj**, v razdelku **Darovanja** vidi samo stran **Paketi**. Ekipi za štetje darovanj dodelite vlogo z dovoljenjema **Vnašanje darovanj** in **Ogled darovanj**, da lahko odpre paket in vidi darove, ki jih je vnesla. Podrobnosti najdete v razdelku [Kdo lahko spreminja paket](../donations/batches.md#who-can-change-a-batch).

### Samo imena oseb

Razdelek **Osebe in skupine** vsebuje dovoljenje **Ogled samo imen oseb**. Uporabite ga za prostovoljce, ki morajo iskati osebe po imenu -- na primer za izbiro osebe v iskalnem polju -- brez dostopa do celotnega imenika. Samo s tem dovoljenjem oseba:

- Lahko išče osebe po imenu in vidi seznam nedavno dodanih oseb, vendar vidi samo ime, fotografijo in status članstva vsake osebe
- Ne more iskati po e-pošti, videti kontaktnih podatkov ali odpreti imenika **Osebe**

Dovoljenje **Ogled samo imen oseb** združite z dovoljenjem **Ogled prisotnosti** ali **Urejanje prisotnosti** za prostovoljce, ki vodijo prisotnost pri verouku. Element **Osebe** v njihovem meniju nato odpre **Skupine**, kjer lahko odprejo seznam **Vse skupine** ter vidijo imena članov in srečanja posameznega razreda. Z dovoljenjem **Urejanje prisotnosti** lahko tudi [beležijo prisotnost](../attendance/recording-attendance.md) in dodajajo obiskovalce z iskanjem po imenih. Imena niso povezave do zapisov oseb, zaupne skupine pa ostanejo skrite, razen če je prostovoljec njihov član.

Aplikacija B1 Admin skriva povezave in gumbe, ki zahtevajo dovoljenja, ki jih vloga nima. Na primer, seznam **Vse skupine** je na voljo samo osebam, ki lahko urejajo skupine, ogledujejo člane skupin ali osebe, ali osebam z dovoljenjem **Ogled samo imen oseb** skupaj z **Ogled prisotnosti** ali **Urejanje prisotnosti** (druge se vrnejo na Nadzorno ploščo). Nastavitev prisotnosti se prikaže samo z dovoljenjem **Urejanje storitev**. Gumb **E-pošta** skupine se prikaže samo osebam z dovoljenjem **Urejanje članov skupine** (dovoljenje, potrebno za pošiljanje e-pošte skupini). Tisk seznama članov skupine zahteva dovoljenje **Ogled članov skupine** ali vodenje te skupine. Brisanje dogodka v koledarju zahteva dovoljenje **Urejanje vsebine** (ali preklic lastne čakajoče zahteve).

### Računi za prijavo na kiosk za prijavo

Račun, s katerim se prijavite na kiosk [B1 Checkin](../../b1-checkin/getting-started/logging-in.md), potrebuje dovoljenje **Prijava** v razdelku **Prisotnost** (ali **Urejanje prisotnosti**). Samo z dovoljenjem **Prijava** lahko kiosk poišče družine po imenu ali telefonski številki, jih prijavi in odjavi ter prikaže, kdo sme prevzeti otroka, brez dostopa do imenika oseb.

Dovoljenje **Prijava** ni več dodeljeno prek vrstice **(Everyone)**. Članstvo v vlogi z drugimi dovoljenji ne omogoča upravljanja kioska; dodajte dovoljenje **Prijava** vlogi, na primer »Prostovoljci za prijavo«, in vanjo dodajte račune kioska.

:::warning
**Skrbniki domene** imajo popoln dostop do vseh področij vašega računa ChurchApps. Njihovih dovoljenj ni mogoče spreminjati ali omejevati. To vlogo dodelite samo svojim najbolj zaupanja vrednim skrbnikom.
:::

:::tip
Ustvarite namenske vloge, na primer »Blagajnik« z dostopom samo do **Darovanj**, »Ekipa za štetje« z **Vnašanje darovanj** in **Ogled darovanj** ali »Prostovoljec za prijavo« samo z dostopom do **Prisotnosti**. To upošteva načelo najmanjših pravic in ohranja varnost vaših podatkov. Več o tem, kako ChurchApps ščiti vaše podatke, najdete v razdelku [Varnost podatkov](./data-security.md).
:::
