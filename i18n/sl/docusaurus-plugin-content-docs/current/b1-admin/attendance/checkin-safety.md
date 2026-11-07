---
title: "Varnost pri prijavi"
---

# Varnost pri prijavi

<div class="article-intro">

B1 vključuje nabor nastavitev za varnost otrok pri prijavi: omejitve zmogljivosti prostorov in razmerja med prostovoljci in otroki, smernice glede starosti in razreda na kiosku, vrste prijave, ki ločujejo člane, goste in prostovoljce, ter seznam zaupanja vrednih oseb za prevzem, ki se za vsako družino preverja ob odjavi. Ta stran opisuje, kako v B1 Admin nastaviti posamezno varnostno funkcijo.

</div>

<div class="prereqs">
<h4>Preden začnete</h4>

- Nastavite [strukturo udeležbe](setup.md) in [kiosk za prijavo](check-in.md)
- Prostori so [skupine](../groups/creating-groups.md), povezane s časi bogoslužja. Spodnje varnostne nastavitve so shranjene na skupini.
- Obveščanje staršev in nujna množična sporočila zahtevajo povezanega ponudnika SMS sporočil ([Text In Church](../integrations/services/text-in-church), [Clearstream](../integrations/services/clearstream) ali Mutual Ministry)

</div>

## Zmogljivost prostora in zapiranje prostora

Vsak prostor za prijavo (skupina) lahko uveljavi lastne omejitve. Odprite skupino, kliknite **Uredi**, da urejate njene nastavitve, in poiščite razdelek **Zmogljivost prijave**:

- **Zmogljivost** -- Največje število oseb, ki so lahko hkrati prijavljene v ta prostor. Ko je prostor poln, je prijava vanj onemogočena, kiosk pa navede, da je prostor poln.
- **Zmogljivost za goste** -- Izbirna ločena omejitev števila gostov v prostoru.
- **Zaprto za prijavo** -- Nastavite na **Da**, da takoj ustavite vse prijave v ta prostor (na primer, ko je srečanje odpovedano ali prostor ni na voljo). Odjave še vedno delujejo.

## Razmerja s prostovoljci

Razdelek **Zmogljivost prijave** na skupini vsebuje tudi pravila o kadrovski zasedbi:

- **Otroci na prostovoljca** -- Največje število otrok, ki jih lahko pokrije vsak prijavljeni prostovoljec (npr. 5 pomeni enega prostovoljca na pet otrok).
- **Najmanj prostovoljcev** -- Najmanjše število prostovoljcev, ki morajo biti prijavljeni, preden se lahko otroci prijavijo v prostor.

Prostovoljci se pri teh pravilih štejejo, če se na kiosku prijavijo z vrsto **Prostovoljec** (glejte [vrste prijave](#check-in-types) spodaj).

### Izbira med opozorilom in blokiranjem

Kako strogo se razmerja uveljavljajo, je nastavitev za celotno cerkev:

1. V B1 Admin pojdite na **Nastavitve** in odprite razdelek **Prijava**.
2. Nastavite **Uveljavljanje razmerja s prostovoljci**:
   - **Opozori (dovoli s potrditvijo)** -- Kiosk prikaže opozorilo, če je prostor nad razmerjem ali pod najmanjšim številom prostovoljcev, osebje pa lahko potrdi, da kljub temu nadaljuje. To je privzeta nastavitev.
   - **Blokiraj (prepreči prijavo)** -- Prijava v prostor je zavrnjena, dokler ni prijavljeno dovolj prostovoljcev.

:::info
Zmogljivost in Zaprto za prijavo sta vedno trdi omejitvi. Izbira med opozorilom in blokiranjem velja samo za razmerja s prostovoljci.
:::

## Vrste prijave

Vsaka prijava zabeleži, ali je oseba **Član**, **Gost** ali **Prostovoljec**. Vrsto izberete s oznakami na zaslonu družine na kiosku (privzeto je Član). Vrste so vir za varnostna pravila: prostovoljci zagotavljajo pokritost za razmerja, gosti pa se štejejo v zmogljivost za goste v prostoru.

## Smernice za prostor glede starosti in razreda

Vsakemu prostoru lahko določite starostne ali razredne meje, da kiosk družine vodi do ustreznih prostorov:

- V nastavitvah skupine uporabite razdelek **Starost in razred**, da nastavite najnižjo/najvišjo starost (v letih in mesecih) in/ali razred za prostor.
- Na kiosku so prostori, za katere otrok ustreza, označeni, prostori, za katere ne ustreza, pa so zatemnjeni. Zatemnjen prostor lahko še vedno izberete s potrditvijo osebja. Smernice nikoli trdo ne blokirajo.

Razredi se premaknejo na vaš **datum napredovanja razredov**:

1. V B1 Admin pojdite na **Nastavitve** in odprite razdelek **Napredovanje razredov**.
2. Nastavite mesec in dan, ko vaša cerkev napreduje učence (na primer 1. avgust). Starosti in razredi na kiosku se izračunajo na dan zadnjega napredovanja.

## Zaupanja vredne osebe za prevzem in osebe, ki niso pooblaščene

Vsaka družina lahko ima seznam oseb, ki smejo ali ne smejo prevzeti njenih otrok.

1. Odprite stran osebe v **Ljudje** in poiščite kartico **Prevzem**.
2. Kliknite **Dodaj**. Poiščite obstoječo osebo ali dodajte nekoga, ki ni v sistemu, tako da vnesete **Ime**, **Sorodstveno razmerje** in fotografijo.
3. Nastavite **Status**:
   - **Zaupanja vredna** -- Ob odjavi je ta oseba prikazana kot kartica za prevzem, na katero se lahko dotaknete, s fotografijo, kar omogoča hiter preverjen prevzem.
   - **Ni pooblaščena** -- Če nekdo poskuša prevzeti otroka pod tem imenom, kiosk odjavo blokira z opozorilom. Osebje lahko preglasi odločitev, preglasitev pa se zabeleži na zapisu udeležbe.

Kliknite oznako statusa osebe na kartici, da preklapljate med Zaupanja vredna in Ni pooblaščena.

:::tip
Osebam, zaupanja vrednim za prevzem, kadarkoli dodajte fotografije. Zaslon za odjavo prikaže fotografijo, da lahko prostovoljci vizualno preverijo osebo, ki stoji pred njimi.
:::

## Obveščanje staršev in nujno množično sporočilo

Obe funkciji pošiljata besedilna sporočila prek povezanega ponudnika SMS sporočil cerkve. Vgrajene SMS storitve ni, zato mora biti najprej nastavljen eden od podprtih ponudnikov.

- **Obvesti starša** -- Osebje z zaslona za odjavo na zasedenem kiosku lahko pošlje sporočilo staršem ali skrbnikom prijavljenega otroka (na primer: „Prosimo, pridite v vrtec“).
- **Nujno množično sporočilo** -- Osebje z nastavitev skrbnika na kiosku lahko naenkrat pošlje sporočilo skrbnikom vseh prijavljenih družin za izbrano bogoslužje. Za pošiljanje je treba vpisati **EMERGENCY** za potrditev.

Osebe, ki so se odjavile od sporočil, ali osebe brez evidentirane mobilne številke, so samodejno preskočene. Kiosk poroča, koliko sporočil je bilo poslanih in koliko preskočenih.

Za postopek na kiosku glejte [Odjava in varnost otrok](../../b1-checkin/check-in/checking-out).

## Povezani članki

- [Prijava](check-in.md) — nastavitev kioska in strojne opreme
- [Odjava in varnost otrok](../../b1-checkin/check-in/checking-out) — odjava na kiosku, preverjanje prevzema in postopki obveščanja
- [Ustvarjanje skupin](../groups/creating-groups.md) — kje so nastavitve prostorov
- [Nastavitev udeležbe](setup.md) — bogoslužja, časi bogoslužij in dodelitve prostorov
- [Najnižja starost za zasebna sporočila](../settings/mobile-app.md#member-directory--messaging-settings) — blokira nove zasebne pogovore z otroki, medtem ko ostajajo v imeniku
