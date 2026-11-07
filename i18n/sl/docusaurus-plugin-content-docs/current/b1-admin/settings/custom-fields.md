---
title: "Polja po meri"
description: "V B1 Admin določite polja po meri za dodatne podatke o osebah, na primer datume poteka preverjanja preteklosti ali velikosti majic, nato pa jih uporabite pri iskanju in filtriranju."
---

# Polja po meri

<div class="article-intro">

**Polja po meri** vam omogočajo, da na vsakem zapisu osebe spremljate svoje podatke, za katere B1 nima vgrajenega polja, na primer datum poteka preverjanja preteklosti, velikost majice ali stanje tečaja krsta. Polje določite enkrat v nastavitvah, nato pa na profilu vsake osebe vnesete vrednost ter po njej iščete ali sestavljate sezname. S tem nadomestite starejšo rešitev, pri kateri ste za shranjevanje enega samega podatka po meri ustvarili obrazec za osebe.

</div>

## Usposabljalni video

<YouTube id="yUfDEbp2HQ4" title="Polja po meri, skupinsko urejanje in izvoz v B1" next="Ustvarjanje skupin in dodajanje članov v B1" nextUrl="/docs/b1-admin/groups/creating-groups" />

<div class="prereqs">
<h4>Preden začnete</h4>

- Za določanje polj in vnašanje vrednosti potrebujete dovoljenje za urejanje za **Osebe** ter dostop do območja **Nastavitve**. Vrednosti lahko vidi kdorkoli z dovoljenjem za ogled oseb. Glejte [Vloge in dovoljenja](./roles-permissions.md).
- Preden začnete, se odločite, kaj želite spremljati, in izberite vrsto, ki ji najbolj ustreza (besedilo, število, datum, odgovor da/ne ali seznam za izbiro).

</div>

## Odpiranje polj po meri

V B1 Admin odprite [meni za skok](../introduction.md#getting-around-with-the-jump-menu) (iskalno polje na vrhu levo), izberite **Nastavitve > Nastavitve** in v levem seznamu kliknite **Polja po meri**, da se pomaknete do razdelka **Polja po meri**. Do njega lahko pridete tudi neposredno na naslovu **/settings/custom-fields**. Prikaže se seznam vseh določenih polj z njihovim **imenom** in **vrsto polja**. Če še nobenega polja niste ustvarili, plošča prikaže sporočilo *„Polja po meri še niso dodana.“*

## Dodajanje polja

1. Kliknite **Dodaj polje**.
2. V urejevalniku, ki se odpre na desni, vnesite **ime**. To je oznaka, ki jo bo osebje videlo na profilih oseb in pri iskanju (na primer *Preverjanje preteklosti poteče*).
3. Izberite **vrsto polja**:
   - **Besedilno polje** – kratek prosto oblikovan besedilni zapis.
   - **Celo število** – števila brez decimalnih mest (na primer število).
   - **Decimalno število** – števila, ki lahko vsebujejo decimalna mesta.
   - **Datum** – koledarski datum.
   - **Da/Ne** – preprost odgovor da ali ne.
   - **Izbira iz možnosti** – seznam za izbiro. Ko izberete to vrsto, se prikaže **urejevalnik možnosti**, v katerem dodate vsako možnost, ki jo lahko osebe izberejo.
4. Kliknite **Shrani**.

Polje je zdaj na voljo na profilu vsake osebe.

:::info
Vrste polj so enake kot pri [vprašanjih v obrazcih](../forms/creating-forms.md), zato se vrednosti v celotnem B1 vedejo enotno.
:::

## Urejanje polja

Kliknite katero koli vrstico polja na seznamu, da ga znova odprete v urejevalniku. Spremenite ime, vrsto ali možnosti ter kliknite **Shrani**.

:::warning
Če spremenite **vrsto polja** polja, ki že vsebuje vrednosti (na primer iz besedilnega polja v datum), lahko prej vnesene vrednosti ostanejo v obliki, ki ne ustreza več novi vrsti. Vrste spreminjajte previdno, ko je osebje že začelo polje izpolnjevati.
:::

## Brisanje polja

Odprite polje za urejanje in kliknite **Izbriši**. Prikazalo se bo vprašanje za potrditev: *„Ali ste prepričani, da želite izbrisati to polje po meri? Shranjene vrednosti bodo prav tako odstranjene.“* Če polje izbrišete, ga trajno odstranite in z njim **vse shranjene vrednosti** pri vseh osebah. Tega dejanja ni mogoče razveljaviti.

## Vnašanje vrednosti za osebo

Ko obstaja vsaj eno polje po meri, so njegove vrednosti na zapisu vsake osebe prikazane poleg vgrajenih podatkov. Ogledate si jih skupaj s stičnimi podatki osebe na levi strani profila, urejate pa jih v istem obrazcu, ki ga uporabljate za preostale podatke osebe. Dokler ne določite prvega polja, se ne prikaže nič dodatnega.

1. Odprite zapis osebe v **Osebe**.
2. Na levi strani profila, pod stičnimi podatki osebe, kliknite gumb **Uredi**.
3. Pomaknite se do območja **Polja po meri** na dnu obrazca za urejanje in za vsako polje vnesite vrednost. Vsako polje prikaže vnosni element, ki ustreza njegovi vrsti: izbirnik datuma pri poljih datum, spustni seznam da/ne pri poljih da/ne, seznam za izbiro pri izbiri iz možnosti itd.
4. Kliknite **Shrani**. Vrednosti polj po meri se shranijo skupaj z drugimi podatki osebe.

Na profilu se zdaj pod stičnimi podatki osebe prikaže vsako polje, ki ima vrednost, v obliki *Ime polja: vrednost* (odgovori da/ne so prikazani kot *Da* ali *Ne*, pri izbiri iz možnosti pa je prikazana oznaka možnosti). Prazna polja se preprosto skrijejo. Če želite vrednost odstraniti, uredite osebo, izpraznite polje in shranite. Prazna vrednost se iz zapisa izbriše, namesto da bi bila shranjena kot prazna.

:::tip
Klasična uporaba je varnost prostovoljcev: ustvarite polje vrste **Datum** z imenom *Preverjanje preteklosti poteče*, vnesite datum za vsakega prostovoljca in nato ustvarite [shranjen seznam](../people/lists.md), ki označi vsakogar, čigar datum je že minil.
:::

## Iskanje in ustvarjanje seznamov na podlagi polj po meri

Polja po meri so v celoti iskalna:

1. Na strani **Osebe** odprite [napredno iskanje](../people/searching-people.md).
2. Razširite kategorijo **Polja po meri**.
3. Označite polje, po katerem želite filtrirati, izberite operator in vnesite vrednost. Ponujeni operatorji ustrezajo vrsti polja:
   - **Besedilno polje** – vsebuje, je enako, se začne z, se konča z.
   - **Celo število / Decimalno število** – je enako, je večje od, je večje ali enako, je manjše od, je manjše ali enako.
   - **Datum** – je enako, je po (večje od), je pred (manjše od).
   - **Da/Ne** – je enako Da ali Ne.
   - **Izbira iz možnosti** – je enako ali vsebuje eno od možnosti.

Katero koli iskanje po poljih po meri lahko shranite kot [seznam](../people/lists.md). Seznami so živi poizvedbe, zato seznam, sestavljen na podlagi *Preverjanje preteklosti poteče je pred danes*, ob vsakem odprtju znova preveri vsako osebo. Ročnega vzdrževanja ni potrebno.

## Prikaz polja po meri kot stolpca

Če želite hkrati videti vrednosti polja za vse, dodajte polje kot stolpec na stran **Osebe**. Pri **Prikaži kot** izberite **Tabela**, v glavi strani kliknite ikono **Izberi stolpce**, preklopite na zavihek **Po meri** in označite polje. Vrednost vsake osebe se prikaže v svojem stolpcu poleg vgrajenih stolpcev. Glejte [Prikaz polj po meri kot stolpcev](../people/searching-people.md#showing-custom-fields-as-columns).

## Kaj se zgodi ob združitvi

Ko [združite dva zapisa oseb](../people/adding-people.md), se vrednosti polj po meri samodejno prenesejo. Ohranjena oseba obdrži svoje vrednosti. Za vsako polje, pri katerem je imela vrednost samo odstranjena oseba, se ta vrednost prekopira, da se nič ne izgubi.

## Sorodni članki

- [Iskanje oseb](../people/searching-people.md) – napredno iskanje, vključno s kategorijo Polja po meri, ter prikaz polj po meri kot stolpcev
- [Shranjeni seznami](../people/lists.md) – shranite iskanje po polju po meri in ga znova zaženite v živo
- [Vloge in dovoljenja](./roles-permissions.md) – kdo lahko določa polja in ureja vrednosti
- [Ustvarjanje obrazcev](../forms/creating-forms.md) – za zbiranje podatkov z več vprašanji, kjer se celoten obrazec bolje prilega kot posamezna polja
