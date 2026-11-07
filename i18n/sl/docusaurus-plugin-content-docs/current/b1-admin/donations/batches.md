---
title: "Skupine darov"
---

# Skupine darov

<div class="article-intro">

Skupine združujejo vaše darove, kar olajša sledenje in usklajevanje. Običajna skupina predstavlja eno zbiranje, na primer nedeljski dar ali posebni dogodek. Z uporabo skupin ostanete organizirani, preverjanje, ali se vaši zapisi ujemajo z dejanskimi nakazili, pa je preprosto.

</div>

<div class="prereqs">
<h4>Preden začnete</h4>

- Preverite, ali ste [nastavili sklade](funds.md), da so na voljo pri beleženju darov
- Za ogled strani Skupine potrebujete dovoljenje **Ogled povzetkov darov**, **Urejanje darov** ali **Vnos darov** (glejte [Kdo lahko spremeni skupino](#who-can-change-a-batch))

</div>

## Stran Skupine

Ko odprete **Darovi > Skupine**, boste videli seznam svojih skupin. Vsaka vrstica prikazuje:

- **Ime** -- oznako, ki ste jo dali skupini
- **Datum** -- datum zbiranja
- **Darovi** -- število posameznih darov v skupini
- **Skupaj** -- skupni znesek v dolarjih
- **Stanje** -- **Odprta** ali **Zaprta** (glejte [Zapiranje in ponovno odpiranje skupine](#closing-and-reopening-a-batch))

Nad seznamom gumbi za leto omogočajo prikaz samo skupin iz enega leta ali **Vse** skupine. Enovrstični povzetek prikazuje število skupin, število darov in skupni znesek prikazanih skupin.

## Ustvarjanje nove skupine

1. Na vrhu strani kliknite **Dodaj skupino**.
2. Vnesite opisno ime (npr. "Nedeljski dar - 9. feb.").
3. Izberite datum zbiranja.
4. Kliknite **Shrani**.

Nova skupina se prikaže na seznamu, pripravljena za dodajanje darov.

## Delo s skupinami

- **Ogled darov** -- kliknite ime skupine, da jo odprete in vidite vse posamezne darove, ki jo sestavljajo. Od tod lahko dodajate, urejate ali odstranjujete darove ali kliknete **Uvozi CSV**, da hkrati dodate veliko darov iz preglednice (glejte [Uvoz darov iz datoteke CSV](recording-donations.md#importing-donations-from-a-csv-file)).
- **Urejanje podrobnosti skupine** -- kliknite gumb **Uredi** v vrstici skupine, da spremenite ime ali datum. Skupino lahko izbriše samo oseba z dovoljenjem **Urejanje darov**.
- **Razvrščanje** -- z glavami stolpcev razvrstite skupine po imenu ali datumu.
- **Izvoz** -- kliknite **Izvozi** na vrhu strani, da prenesete prikazane skupine kot preglednico (CSV).
- **Neuspeli dogodki** -- če je vaš plačilni prehod javil težave, se na vrhu strani prikaže gumb **Neuspeli dogodki** (s številom nerešenih dogodkov). Kliknite ga, da prikažete ali skrijete seznam dogodkov pod skupinami.
- **Uvoz iz Stripe** -- kliknite **Uvozi manjkajoče transakcije Stripe** na vrhu strani, da odprete orodje [Uvoz iz Stripe](stripe-import.md). Gumb se prikaže samo, kadar je prehod za darovanje vaše cerkve Stripe.

## Kdo je vnesel posamezen dar

Vsak dar, vnesen v skupino, prikazuje **Vnesel/a** in ime osebe pod imenom darovalca, tako da lahko ugotovite, kdo ga je vnesel, brez podpisnega lista. B1 to samodejno beleži glede na prijavljenega uporabnika, poznejše urejanje darila pa tega ne spremeni. Darila, uvožena z **Uvoz CSV**, prikazujejo osebo, ki je uvoz izvedla.

Spletna darila, darila, dodana z orodjem [Uvoz iz Stripe](stripe-import.md), in darila, vnesena pred dodajanjem te funkcije novembra 2026, ne prikazujejo imena.

## Zapiranje in ponovno odpiranje skupine

Ko je skupina prešteta in nakazana, jo zaprite, da njeni darovi ostanejo točno takšni, kot so bili ob zaprtju.

1. Odprite skupino.
2. Na vrhu strani kliknite **Zapri skupino**.

Oznaka stanja ob imenu skupine se spremeni iz **Odprta** v **Zaprta**, skupina pa je na strani Skupine v stolpcu **Stanje** prikazana kot **Zaprta**, na vrhu skupine pa obvestilo pojasni, da je zaprta. Medtem ko je skupina zaprta, lahko osebe z dovoljenjem **Vnos darov** skupino še vedno pregledujejo, vendar ne morejo dodajati, urejati ali brisati njenih darov ali spreminjati njenega imena ali datuma.

Če želite spet spreminjati, odprite skupino in kliknite **Ponovno odpri skupino**. Nove skupine so vedno na začetku odprte.

:::info
Gumba **Zapri skupino** in **Ponovno odpri skupino** vidijo samo osebe z dovoljenjem **Urejanje darov**. Če je potreben popravek, lahko darove v zaprti skupini spreminjajo tudi brez ponovnega odpiranja.
:::

## Kdo lahko spremeni skupino

Dve [dovoljenji za vloge](../settings/roles-permissions.md) omogočata delo s skupinami:

- **Urejanje darov** -- popoln dostop: dodajanje in brisanje skupin, zapiranje in ponovno odpiranje ter dodajanje, urejanje ali brisanje katerega koli darila, ne glede na to, ali je skupina odprta ali zaprta.
- **Vnos darov** -- za ekipe za štetje in prostovoljce, ki vnašajo darove. Lahko dodajajo skupine ter dodajajo, urejajo ali brišejo darove, vendar samo, dokler je skupina odprta. Ne morejo brisati skupin, jih zapirati ali ponovno odpirati ali spreminjati daril, prejetih prek spletnega darovanja.

Oseba z dovoljenjem **Vnos darov**, ki pa nima **Ogled povzetkov darov**, v meniju B1 Admin vidi **Darovi**, ki neposredno vodi na stran Skupine. **Povzetek**, **Skladi**, **Kampanje** in **Izjave o darovanju** so zanje skriti. Za odpiranje skupine in ogled njenih darov vloga potrebuje tudi **Ogled darov**.

:::tip
Pogosta postavitev je vloga "Ekipa za štetje" z dovoljenjema **Vnos darov** in **Ogled darov** ter blagajnik z dovoljenjem **Urejanje darov**, ki zapre vsako skupino, ko je nakazilo usklajeno.
:::

## Tiskanje skupine

Odprite skupino in nad seznamom darov kliknite **Natisni**, da natisnete papirno kopijo za svojo ekipo za štetje ali evidenco nakazil. Izpis vključuje:

- Glavo cerkve -- vaš logotip (**Logotip za svetlo ozadje** iz [Spletna stran > Videz](../website/appearance.md), če ste ga naložili) z imenom cerkve pod njim -- nato ime skupine in datum skupine
- Vsak dar v skupini z imenom darovalca, osebo, ki ga je vnesla, načinom, opombami, datumom in zneskom (vrnjena darila so prečrtana in označena kot vrnjena)
- **Vmesne vsote po skladih** -- skupni znesek, namenjen posameznemu skladu v skupini
- **Skupni znesek skupine** -- skupni znesek za celotno skupino

Gumb **Natisni** se prikaže šele, ko ima skupina vsaj en dar.

### Tiskanje več skupin naenkrat

Če želite v enem koraku natisniti vse skupine iz določenega obdobja -- na primer vsa nakazila prejšnjega meseca -- kliknite **Natisni** na vrhu strani **Skupine**, poleg **Izvozi**. Stran **Tiskanje skupin** se odpre z **Začetnim datumom** in **Končnim datumom**, ki ustrezata skupinam na zaslonu: od 1. januarja do 31. decembra izbranega leta ali od najzgodnejšega do najpoznejšega datuma skupine, če je izbrano **Vse**. Za izbor drugega obdobja spremenite kateri koli datum.

Vsaka skupina, datirana znotraj obdobja (vključno z začetnim in končnim datumom), se natisne po vrstnem redu datumov, po ena skupina na stran, z enako postavitvijo kot pri izpisu ene skupine. Skupine brez darov so izpuščene. Če nobena skupina v obdobju nima darov, boste videli sporočilo "V tem obdobju ni skupin z dari." Kliknite **Natisni**, da odprete pogovorno okno za tiskanje brskalnika, ali **Zapri**, da se vrnete na seznam skupin.

## Izvoz skupine v QuickBooks Online

Odprite skupino in kliknite **Izvozi za QuickBooks**, da prenesete skupino kot knjižbo, ki jo QuickBooks Online lahko uvozi (**Settings > Import Data > Journal Entries**). Datoteka vsebuje eno debetno knjiženje na **Undeposited Funds** za skupni znesek skupine in po eno kreditno knjiženje za vsak sklad, pri čemer je ime vsakega sklada uporabljeno kot ime računa. QuickBooks med uvozom zahteva, da ta imena ujemate z vašim kontnim načrtom, zato svoje sklade poimenujte tako, kot knjigovodja poimenuje prihodkovne račune, ali pa jih enkrat preslikajte ob uvozu.

:::tip
Skupine poimenujte dosledno, da jih boste pozneje lahko hitro našli. Vključitev datuma in vrste zbiranja (npr. "Nedelja dopoldan - 2025-02-09") ohranja vaš seznam urejen, ko raste.
:::

## Naslednji koraki

Ko imate skupino, si oglejte [Beleženje darov](recording-donations.md), da izveste, kako vanjo dodajate posamezne darove. Lahko tudi [uvozite transakcije Stripe](stripe-import.md), da samodejno ustvarite skupine iz spletnega darovanja.
