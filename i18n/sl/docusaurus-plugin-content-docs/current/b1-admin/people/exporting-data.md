---
title: "Izvoz podatkov"
---

# Izvoz podatkov

<div class="article-intro">

B1 Admin vam omogoča izvoz podatkov vaše cerkve, da jih lahko uporabite v preglednicah, delite z ekipo ali shranite kot varnostno kopijo. Ne glede na to, ali potrebujete hiter seznam imen in e-poštnih naslovov ali popoln izvoz podatkovne baze, so na voljo možnosti, ki ustrezajo vašim potrebam.

</div>

<div class="prereqs">
<h4>Preden začnete</h4>

- Potrebujete aktiven račun B1 Admin z dovoljenjem za ogled podatkov, ki jih želite izvoziti. Če niste prepričani glede svoje ravni dostopa, si oglejte [Vloge in dovoljenja](roles-permissions.md).
- Za popoln izvoz podatkovne baze potrebujete dostop do območja **Settings**.

</div>

## Izvoz iz strani People

Najhitrejši način za izvoz imenika je neposredno iz strani **People**:

1. Odprite [meni Jump](../introduction.md#getting-around-with-the-jump-menu) (iskalna vrstica v zgornjem levem kotu B1 Admin), razširite **People** in kliknite **People**.
2. Z iskalno vrstico ali filtri zožite rezultate, ki jih želite izvoziti (ali pustite brez filtra, če želite izvoziti vse). Nasvete za filtriranje najdete v razdelku [Iskanje oseb](searching-people.md).
3. Kliknite gumb **Export** v glavi strani People.
4. V računalnik se prenese datoteka CSV z osebami, ki so trenutno v vaših rezultatih, vključno z imenom, kontaktnimi podatki, naslovom in drugimi standardnimi polji.

:::tip
Izvoz vključuje vse osebe v vaših trenutnih rezultatih. Najprej izvedite iskanje, naložite [shranjen seznam](./lists.md) ali uporabite iskanje **Advanced**, da izvozite samo osebe, ki jih potrebujete.
:::

## Celoten izvoz podatkov iz nastavitev

Za popoln izvoz vseh podatkov B1 (ne samo oseb) uporabite orodje za izvoz v nastavitvah:

1. V meniju Jump izberite **Settings > Settings**.
2. Kliknite povezavo **Import/Export** pod imenom vaše cerkve na vrhu levega menija z nastavitvami.
3. V spustnem meniju **Data Source** izberite **B1 Database**.
4. Preglejte predogled podatkov in kliknite **Continue to Destination**.
5. Kot cilj izvoza izberite **B1 Export Zip**.
6. Spremljajte napredek izvoza, dokler vsi elementi ne prikažejo zelenih kljukic.
7. Datoteka za izvoz se bo samodejno prenesla. Poiščite datoteko `B1Export` v mapi za prenose.
8. Razpakirajte datoteko in odprite posamezne datoteke CSV (na primer `people.csv`), ki jih lahko odprete v Excelu, Google Preglednicah ali Numbers.

:::info
B1 Export Zip je popolna varnostna kopija podatkov vaše cerkve. Vsebuje:

- osebe (s fotografijami) in gospodinjstva, vključno s kontakti za prevzem otrok v gospodinjstvu
- kampuse, bogoslužja in časovnice bogoslužij
- skupine in člane skupin
- sklade in donacije, vključno z darovi, razdeljenimi med več skladov
- obiskovanje
- obrazce, vprašanja, oddaje in odgovore
- polja po meri in njihove vrednosti
- shranjene sezname oseb

Če fotografije osebe med izvozom ni mogoče prenesti ali prebrati, se ta fotografija preskoči in izvoz se nadaljuje brez nje.

Za obnovo izberite **B1 Import Zip** kot vir in **B1 Database** kot cilj (glejte [Uvoz podatkov](./importing-data.md)). Gospodinjstva, kontakti za prevzem in shranjeni seznami se obnovijo skupaj z osebami. Filtri shranjenih seznamov se nanašajo na obnovljene skupine, sklade, kampuse in polja po meri.
:::

## Izvoz podatkov skupin

Člane posameznih skupin lahko izvozite tudi kot seznam. Na strani **Groups** odprite skupino in kliknite **ikono za prenos**, da izvozite seznam članov te skupine. Več podrobnosti najdete v razdelku [Člani skupine](../groups/group-members.md).

:::info
Izvožene datoteke CSV delujejo z vsemi glavnimi programi za preglednice, vključno z Microsoft Excel, Google Preglednicami in Apple Numbers.
:::
