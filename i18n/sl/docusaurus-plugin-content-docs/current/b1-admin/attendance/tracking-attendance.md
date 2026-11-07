---
title: "Spremljanje udeležbe"
---

# Spremljanje udeležbe

<div class="article-intro">

Ko so vaše lokacije, časi bogoslužij in skupine nastavljeni, vam B1 Admin omogoča enostaven pregled podatkov o udeležbi in odkrivanje trendov. Stran Udeležba se odpre s povzetkom udeležbe za ta teden, poročila **Vsa leta** pa ponujata dva glavna pogleda: zavihek **Trend udeležbe** za trende na ravni celotne cerkve in zavihek **Udeležba skupin** za podrobnosti na ravni skupin. S temi orodji lahko razumete vzorce rasti, odkrivate upadanje angažiranosti in sprejemate odločitve na podlagi podatkov za vašo cerkev.

</div>

<div class="prereqs">
<h4>Preden začnete</h4>

- Vaša struktura udeležbe mora vsebovati vsaj eno lokacijo in en čas bogoslužja. Če tega še niste storili, si oglejte [Nastavitev udeležbe](setup.md).
- Preden se v poročilih pokažejo rezultati, morajo biti zabeleženi podatki o udeležbi. Podatki lahko prihajajo iz [ročnega vnosa](recording-attendance.md) ali [samostojne prijave](check-in.md).

</div>

## Ogled trendov udeležbe

1. Odprite **B1 Admin**, odprite [meni Jump](../introduction.md#getting-around-with-the-jump-menu) (iskalno polje v zgornjem levem kotu), razširite **Ljudje** in kliknite **Udeležba**.
2. V levem stolpcu kliknite **Vsa leta**. Privzeto je izbran zavihek **Trend udeležbe**.
3. Poročilo se samodejno zažene, ko se zavihek odpre, in prikaže skupno udeležbo za vsak teden.

:::tip
Za hiter pregled trenutnega tedna glavna stran Udeležba prikazuje, koliko ljudi je ta teden v prostoru, razčlenitev po sobah (skupinah), morebitne goste ter 13-tedenski stolpčni grafikon prijav. Poročilo za to ni potrebno.
:::

## Filtriranje podatkov

Za zožitev rezultatov uporabite filtre v polju **Filtriraj poročilo** in nato kliknite **Zaženi poročilo**:

- **Lokacija** -- izberite lokacijo, če želite videti udeležbo samo za to mesto.
- **Bogoslužje** -- omejite poročilo na eno bogoslužje.
- **Čas bogoslužja** -- izberite čas bogoslužja, če se želite osredotočiti na določeno srečanje.
- **Skupina** -- prikaže udeležbo za eno skupino.
- **Začetni datum** in **Končni datum** -- časovno obdobje, ki ga poročilo zajema. Privzeto poročilo zajema zadnje leto, od pred enega leta do danes, pri čemer je končni datum vključen v celoti.

Poročilo prikazuje stolpčni grafikon in tabelo skupnega števila obiskov na teden. Vsak teden je označen z datumom nedelje tega tedna. Tabela ima tudi stolpec **Datumi srečanj**, ki navaja dejanske datume v tem tednu, na katere je bila zabeležena udeležba (na primer „9/27, 9/30“). Tako lahko vidite, kdaj se srečanje sredi tedna šteje v isti teden kot nedeljsko bogoslužje.

:::info
Poročila se samodejno osvežijo vsakič, ko odprete zavihek Trend udeležbe, zato vedno vidite najnovejše številke, ne da bi morali klikniti gumb za osvežitev.
:::

## Udeležba skupin

Zavihek **Udeležba skupin** prikazuje, kdo je udeležil posamezno srečanje skupine. To je uporabno, kadar želite spremljati določen razred, ekipo za službo ali malo skupino, namesto da bi gledali splošne številke bogoslužij.

1. V poročilih **Vsa leta** izberite zavihek **Udeležba skupin**.
2. Po želji izberite **Lokacijo** in **Bogoslužje**.
3. Nastavite **Začetni datum** in **Končni datum**. Privzeto poročilo zajema od zadnje nedelje do danes.
4. Kliknite **Zaženi poročilo**.

Rezultati so razvrščeni po datumu srečanja, nato po času bogoslužja in skupini, pod vsako skupino pa so navedeni udeleženci. Časi bogoslužij, skupine in imena so razvrščeni po abecedi, tako da se vsaka naslovna vrstica pojavi enkrat. Vrstica vsake osebe prikazuje tudi stolpec **Prijavljen** s časom, ob katerem je bila udeležba zabeležena (prazno, če čas ni shranjen), in stolpec **Status članstva** (na primer Član ali Obiskovalec), tako da lahko hitro prepoznate goste.

Za prenos podatkov kliknite **Možnosti prenosa** in izberite **Povzetek**. Datoteka CSV vsebuje eno vrstico za vsakega člana skupine, razvrščeno po skupini in nato po imenu, ter stolpec za vsako datirano srečanje v obdobju (na primer „Nedelja - 9:00 (2026-09-27)“), označen z **prisoten** ali **odsoten**.

:::tip
Udeležba skupin je še posebej koristna za [vodje malih skupin](../groups/creating-groups.md), ki želijo spremljati angažiranost znotraj svoje skupine skozi čas.
:::

## Nasveti za uporabo podatkov o udeležbi

- Trende pregledujte mesečno, da zgodaj odkrijete sezonske vzorce.
- Primerjajte podatke na ravni lokacij, da ugotovite, katere lokacije rastejo.
- Uporabite poročila na ravni skupin, da sledite [skupinam](../groups/group-members.md), pri katerih udeležba upada.
- Vpogled v udeležbo kombinirajte z orodjem [AI iskanje](../people/ai-search.md), da najdete osebe, ki se v zadnjem času niso udeležile srečanj.

## Sorodne strani

- [Beleženje udeležbe](recording-attendance.md) -- ročni vnos udeležbe za srečanje skupine
- [Vnos števila oseb in trend](headcount-entry.md) -- preprostejša alternativa za skupno število, z lastnim tedenskim grafikonom trenda
- [Prijava](check-in.md) -- nastavitev samostojne prijave, da se udeležba beleži samodejno
