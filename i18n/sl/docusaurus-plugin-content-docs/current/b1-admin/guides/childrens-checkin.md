---
title: "Vodnik: Nastavitev prijave otrok v otroški službi"
---

# Nastavitev prijave otrok v otroški službi

<div class="article-intro">

Ta vodnik vas korak za korakom popelje skozi vse, kar je potrebno za delovanje sistema prijave otrok v vaši cerkvi – od vnosa družin v bazo podatkov, do nastavitve skupin, primernih za starost, in tiskanja imenskih nalepk v nedeljo zjutraj. Ko boste končali, bodo starši lahko prijavili svoje otroke na tabličnem kiosku in prejeli ustrezno varnostno oznako.

</div>

## Video za usposabljanje

<YouTube id="Ep9CBUcJwPI" title="Nastavitev prijave otrok v B1" next="Beleženje in sledenje udeležbi v B1" nextUrl="/docs/b1-admin/attendance/recording-attendance" />

<div class="prereqs">
<h4>Preden začnete</h4>

- Ustvarite svoj cerkveni račun na [admin.b1.church](https://admin.b1.church)
- Poskrbite, da imate skrbniški dostop – če je potrebno, glejte [Vloge in dovoljenja](../people/roles-permissions.md)
- Neobvezno: pripravite datoteko CSV z družinami, če prehajate iz drugega sistema

</div>

## 1. korak: Dodajanje družin v bazo podatkov

Preden lahko prijava deluje, mora sistem poznati vaše družine. Vsak otrok mora biti povezan s staršem prek funkcije gospodinjstva.

Sledite vodniku [Dodajanje oseb](../people/adding-people.md), da dodate vsaj eno družino. Pazite, da:

- najprej dodate starše
- dodate vsakega otroka
- ju povežete v istem gospodinjstvu z uporabo [urejevalnika gospodinjstev](../people/adding-people.md#managing-households)

:::tip
Če imate več kot nekaj družin za dodajanje, namesto dodajanja posameznega človeka uporabite orodje [uvoz CSV](../people/importing-data.md). Celoten imenik lahko uvozite v nekaj minutah.
:::

## 2. korak: Ustvarjanje skupin za otroke

Skupine določajo razrede, v katere se otroci prijavljajo. Običajno boste želeli eno skupino za vsak starostni razpon.

Sledite vodniku [Ustvarjanje skupin](../groups/creating-groups.md), da ustvarite skupine, kot so:

- **Vrtec** (od 0 do 2 let)
- **Predšolski** (od 3 do 5 let)
- **Osnovnošolski** (od 6 do 10 let)

Imena in starostne razpone lahko prilagodite, da ustrezajo strukturi vaše službe.

## 3. korak: Nastavitev lokacij in bogoslužij

Prijava je vezana na določene čase bogoslužij. Potrebujete vsaj eno lokacijo in eno bogoslužje.

Sledite vodniku [Nastavitev udeležbe](../attendance/setup.md), da:

1. dodate svojo lokacijo (npr. »Glavna lokacija«)
2. dodate bogoslužje (npr. »Nedeljsko jutro«)
3. nastavite čas bogoslužja (npr. »9.00«) in neobvezno [urnik prijave](../attendance/setup.md#setting-a-check-in-schedule), tako da se prijava samodejno odpre pred vsakim bogoslužjem in zapre po njem
4. dodelite skupine za otroke temu bogoslužju

## 4. korak: Nastavitev aplikacije za prijavo

Zdaj vse povežite z namestitvijo aplikacije za prijavo na tablico.

1. Namestite aplikacijo **B1 Checkin** – za povezave za prenos glejte članek [Prijava](../attendance/check-in.md)
2. Prijavite se s svojimi poverilnicami za B1 Admin
3. Izberite svojo lokacijo in čas bogoslužja

Za podrobne korake nastavitve glejte celoten članek [Prijava](../attendance/check-in.md).

## 5. korak: Pridobitev strojne opreme

Potrebujete tablico za kiosk in neobvezno tiskalnik nalepk Brother za imenske nalepke.

Vsaj to:
- **eno tablico Android ali Amazon Fire** – glejte [priporočene tablice](../attendance/check-in.md#recommended-hardware)
- **en tiskalnik nalepk Brother** – priporočamo model QL-1110NWB zaradi podpore za Bluetooth in WiFi
- **nalepke Brother DK-1201** (1-1/7" x 3-1/2")

:::warning
Aplikacija B1 Checkin je združljiva samo s tiskalniki nalepk Brother. Tiskalniki drugih znamk ne bodo delovali.
:::

## 6. korak: Preizkusna prijava

Pred nedeljskim jutrom opravite preizkusni zagon:

1. Na tablici odprite aplikacijo B1 Checkin
2. Izberite svojo lokacijo in pravilen čas bogoslužja
3. Poiščite eno od družin, ki ste jih dodali
4. Prijavite otroka in preverite:
   - ali se udeležba prikaže v B1 Admin pod **Udeležba**
   - ali se, če uporabljate tiskalnik, imenska nalepka pravilno natisne

:::tip
Pred začetkom uporabe usposobite prostovoljce za sprejem obiskovalcev o postopku prijave. Običajno zadostuje hiter 5-minutni pregled.
:::

## Konec!

Prijava v otroški službi je pripravljena. Starši lahko poiščejo svojo družino, izberejo svoje otroke in se prijavijo na kiosku. Udeležba se samodejno zabeleži v B1 Admin.

## Sorodni članki

- [Dodajanje oseb](../people/adding-people.md) – dodajanje novih družin, ko obiskujejo službo
- [Ustvarjanje skupin](../groups/creating-groups.md) – upravljanje skupin za otroke
- [Nastavitev udeležbe](../attendance/setup.md) – nastavitev lokacij in bogoslužij
- [Prijava](../attendance/check-in.md) – podrobna nastavitev aplikacije za prijavo in strojne opreme
- [Sledenje udeležbi](../attendance/tracking-attendance.md) – ogled poročil o prijavah
