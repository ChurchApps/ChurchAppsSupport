---
title: "Upravljanje zaslonov in skupin"
description: "Preveri, kateri FreePlay TV-ji so na spletu in pripravljeni za nedeljo, nato uredi nastavitve zaslonov in skupine, ki delijo en koledar v FreePlay Admin."
---

# Upravljanje zaslonov in skupin

<div class="article-intro">

Stran **Zasloni** v FreePlay Admin prikazuje vse televizorje, povezane z vašo cerkvijo, ter to, kaj vsak od njih trenutno predvaja, in ali je pripravljen za nedeljo. Tu upravljate tudi **skupine zaslonov**. Zasloni v isti skupini delijo en koledar in eno privzeto zanko.

</div>

<div class="prereqs">
<h4>Preden začnete</h4>

- Prijavite se v FreePlay Admin na [admin.freeplay.church](https://admin.freeplay.church)
- [Seznanite vsaj en zaslon](./pairing-a-screen.md)

</div>

## Stran Zasloni

Na vrhu tri številke omogočajo hiter pregled stanja:

- **Zdaj na spletu** - Zasloni, ki so se prijavili v zadnjih 15 minutah
- **Pripravljeni za nedeljo** - Koliko načrtovanih zaslonov ima vso vsebino prenesено do prihodnje nedelje
- **Potrebuje pozornost** - Zasloni, ki so brez povezave ali jim manjkajo datoteke

Spodaj uporabite **Iskanje zaslonov**, da poiščete zaslon po oznaki, skupini ali vsebini, ki jo predvaja. Filtrirni gumbi zožijo seznam na **Vse**, **Načrtovano**, **Ročno**, **Potrebuje pozornost** ali posamezno skupino. Med pogledoma **Tabela** in **Mreža** preklapljate s stikalom na desni.

Vsak zaslon prikazuje:

- **Oznako** in model naprave
- **Skupino**
- **Način** - **Načrtovano** ali **Ročno**
- **Zdaj predvaja** - Kar je trenutno na zaslonu. Ročni zasloni prikazujejo **Učilnica · učitelj pritisne Začni**
- **Pripravljen do** - Datum, do katerega je zaslon prenesel vsebino. Če datoteke niso bile prenesene, namesto tega prikaže **manjka N datotek**. Nov zaslon prikaže **Čakam na prvo sinhronizacijo**
- **Nazadnje viden** - Kdaj se je zaslon nazadnje prijavil. Zaslon, ki se dalj časa ni prijavil, prikaže **Brez povezave**, zaslon, ki se sploh ni nikoli povezal, pa **Nikoli viden**

Uporabite **Predstavi**, da koledar zaslona predvajate v brskalniku, ali **Uredi**, da spremenite njegove nastavitve.

## Ogled zaslona

Kliknite oznako zaslona, da odprete njegovo stran. Na levi strani so na voljo:

- **Predstavi v brskalniku** - Predvajajte koledar tega zaslona čez celoten zaslon v brskalniku, tako kot bi izgledal na televizorju. Glejte [Predstavljanje iz brskalnika](./scheduled-playback.md#presenting-from-a-browser)
- **Uredi** - Spremenite oznako, skupino ali način
- **Več** > **Prekini seznanitev** - Odklopite televizor. Ta se vrne na prikaz kode za seznanitev

Preostali del strani ima naslednje razdelke:

- **Zdaj in naslednje** - Kaj se predvaja zdaj in do kdaj, ter vse, kar je načrtovano za naslednjih 7 dni. Kliknite **Odpri koledar**, da odprete koledar te skupine
- **Prenosi** - **Pripravljen do** datuma, ko je vse preneseno, ali seznam manjkajočih datotek
- **Naprava** - ID naprave, platforma, model, različica aplikacije FreePlay, IP naslov, uporabljen in prost pomnilnik, nazadnje viden in način
- **Nedavno** - Zadnje dejavnosti, ki jih je zaslon poročal

:::tip
Če zaslon prikazuje manjkajoče datoteke, preverite, ali je na spletu in ali ima dovolj prostega pomnilnika. Televizor bo manjkajoče datoteke prenesel sam, ob naslednji prijavi.
:::

## Urejanje zaslona

1. Kliknite **Uredi** ob zaslonu ali na njegovi strani.
2. Spremenite **Oznako**, **Skupino** ali **Način** (**Načrtovano** ali **Ročno**).
3. Kliknite **Shrani**.

Če zaslon premaknete v drugo skupino, preklopi na koledar te skupine.

## Skupine zaslonov

Skupina zaslonov je nabor zaslonov, ki v istem času predvajajo isto vsebino, na primer „Vhod“ ali „Otroški kotiček“. Vsaka skupina ima svoj koledar in lahko ima **privzeto zanko**, ki se predvaja, kadar ni nič načrtovano.

Za upravljanje skupin kliknite **Skupine** na vrhu strani **Zasloni**. Seznam **Skupine zaslonov** prikazuje ime vsake skupine, število zaslonov v njej in njeno privzeto zanko. Kliknite **Zasloni**, da se vrnete nazaj.

### Dodajanje skupine

1. V pogledu **Skupine zaslonov** kliknite **Dodaj skupino**.
2. Vnesite **Ime**, na primer „Vhod“.
3. Izberite seznam predvajanja za **Privzeto zanko** ali pustite **Brez — zaslon ugasne**.
4. Kliknite **Shrani**.

Skupino lahko ustvarite tudi med seznanjanjem zaslona, tako da v polju **Skupina** izberete **＋ Nova skupina…**.

### Urejanje ali brisanje skupine

1. Kliknite **Uredi** ob skupini.
2. Spremenite ime ali privzeto zanko in kliknite **Shrani**.
3. Če želite skupino odstraniti, kliknite **Izbriši** in potrdite.

:::warning
Brisanje skupine izbriše tudi njen urnik. Zasloni v tej skupini ugasnejo, dokler jih ne premaknete v drugo skupino.
:::

## Sorodni članki

- **[Seznanjanje zaslona](./pairing-a-screen.md)** - Dodajte nov televizor
- **[Načrtovanje koledarja](./scheduling-the-calendar.md)** - Nastavite, kaj vsaka skupina predvaja, in njeno privzeto zanko
- **[Načrtovano predvajanje na televizorju](./scheduled-playback.md)** - Kaj pomeni datum „Pripravljen do“ na samem televizorju
