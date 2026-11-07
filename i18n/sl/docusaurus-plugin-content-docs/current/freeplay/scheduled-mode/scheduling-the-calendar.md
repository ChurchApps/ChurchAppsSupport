---
title: "Planiranje koledarja"
description: "Nastavi tedenski ali enkratni urnik v koledarju FreePlay Admin: seznami, načrti ali mape ponudnikov na skupinah zaslonov, privzete zanke pa kot rezerva."
---

# Planiranje koledarja

<div class="article-intro">

Stran **Koledar** v FreePlay Admin določa, kaj vsaka skupina zaslonov predvaja in kdaj. Dodajte urnik za seznam predvajanja, načrt bogoslužja ali mapo ponudnika ter ga nastavite, da se ponavlja tedensko ali se predvaja enkrat. Kadar ni nobenega urnika, se predvaja privzeta zanka skupine.

</div>

<div class="prereqs">
<h4>Preden začnete</h4>

- Ustvarite vsaj eno skupino zaslonov. Glejte [Upravljanje zaslonov in skupin](./managing-screens.md#screen-groups)
- [Sestavite seznam predvajanja](./building-playlists.md) ali pa imejte nastavljen tip načrta v B1 Admin

</div>

## Branje koledarja

1. Pojdite na **Koledar**.
2. Izberite skupino zaslonov na zavihkih na vrhu. Vsak zavihek prikazuje, koliko urnikov ima skupina.
3. Tedenski pregled poteka od ponedeljka do nedelje, od 6. do 22. ure. Rdeča črta označuje trenutni čas.
4. S puščicama se premaknite na prejšnji ali naslednji teden ali kliknite **Danes**, da se vrnete na ta teden.

Podnaslov strani prikazuje časovni pas, ki se uporablja za koledar. Urniki sledijo časovnemu pasu vaše cerkve, ki ga nastavite v B1 Admin pod [Podatki o cerkvi](../../b1-admin/settings/church-settings.md#time-zone). Če vaša cerkev nima nastavljenega časovnega pasu, FreePlay uporabi časovni pas vašega kampusa. Koledar in vaši televizorji uporabljajo isti časovni pas, zato se blok, postavljen ob 9.00 na koledarju, predvaja ob 9.00 na zaslonu, tudi če je vaš računalnik nastavljen na drug časovni pas.

Urniki so barvno označeni glede na vrsto. Legenda razlaga barve:

- **Privzeta zanka** - Črtkano ozadje, prikazano za vsem drugim, kadar ima skupina privzeto zanko
- **Seznam predvajanja**
- **Načrt bogoslužja**
- **Mapa ponudnika**

Vsak blok prikazuje svoje ime, višji bloki pa prikazujejo tudi čase, to ali se ponavlja (**tedensko** ali **enkrat**) in kaj se zgodi, ko se konča zgodaj.

## Nastavitev privzete zanke

Privzeta zanka se predvaja na zaslonih skupine vedno, kadar nič ni načrtovano.

1. Na strani **Koledar** kliknite **Privzeta zanka…** v glavi. Če je privzeta zanka že nastavljena, gumb prikazuje **Privzeta zanka:** in za njim ime seznama predvajanja.
2. Izberite **Seznam predvajanja** ali izberite **Brez — zaslon potemni**.
3. Kliknite **Shrani**.

## Dodajanje urnika

Nov urnik lahko začnete na tri načine:

- Kliknite prazno mesto na koledarju. Obrazec se odpre z义 izbranim dnevom in polurnim intervalom.
- Kliknite **Dodaj urnik** v glavi.
- Izberite **Dodaj urnik** iz ukazne palete (**Ctrl+K** ali **⌘K**).

Nato izpolnite obrazec:

1. **Predvajanje** - Izberite, kaj se predvaja:
   - **Seznami predvajanja** - Vsak seznam predvajanja, ki ste ga sestavili
   - **Načrti bogoslužja** - Tip načrta iz B1 Admin, označen z **(trenutni načrt)**. Zaslon vsak teden predvaja trenutni načrt za ta tip načrta, vključno z lekcijami Go Curriculum (tudi prilagojenimi), ki uporabljajo prijavo Go, povezano z ministrstvom tipa načrta
   - **Mapa ponudnika…** - Odpre **Izberite mapo ponudnika**. Pomaknite se do mape in kliknite **Uporabi to mapo**. Če kasneje želite izbrati drugo mapo, kliknite **Spremeni**
2. **Ponavljanje** - Izberite dneve v tednu, ko se urnik predvaja. Če želite namesto tega en datum, vklopite **Enkrat** in izberite **Datum**.
3. **Začetek** in **Konec** - Časa, ob katerih se urnik začne in konča.
4. **Če se konča zgodaj** - Kaj storiti, ko vsebina zmanjka pred končnim časom:
   - **Zanka do končnega časa** - Začne se znova od začetka. Primerno za zanke signalizacije, obvestila in odštevanje
   - **Tempo določa učitelj** - Diapozitivi čakajo na daljinski upravljalnik učitelja. Lekcija ostane na zaslonu čez končni čas, dokler ne pride do zadnjega diapozitiva
   - **Predvajaj enkrat, nato se vrni na privzeto zanko**
5. Pri urnikih, ki se ponavljajo, nastavite **Začne se** na prvi datum. Pod **Konča se** izberite **Nikoli** ali izberite **Na datum** in vnesite **Datum konca**.
6. Kliknite **Shrani**.

:::info
**Tempo določa učitelj** je nadomestilo za prejšnjo možnost »zadnji diapozitiv ostane na zaslonu«. Urniki, shranjeni s to možnostjo, se zdaj predvajajo kot tempo določa učitelj.
:::

## Urejanje ali brisanje urnika

1. Kliknite blok urnika na koledarju.
2. Spremenite poljubno polje in kliknite **Shrani** ali kliknite **Izbriši**, da odstranite urnik.

## Prekrivajoči se urniki

Če se dva urnika prekrivata, obrazec prikaže opozorilo: **Prekriva se z drugim urnikom. Zmaga tisti, ki se začne kasneje.** Medtem ko se poznejši urnik izvaja, ga zasloni predvajajo. Ko se konča, se vrnejo na prejšnji urnik, če ta še teče.

## Kako zasloni prevzamejo spremembe

Seznanjeni zasloni prenesejo vse, kar je načrtovano za naslednjih 7 dni, in sami preverjajo, ali so se spremembe zgodile. Po urejanju koledarja se ne rabite dotikati televizorja. Da vidite, kdaj ima zaslon vse, kar potrebuje, preverite **Pripravljeno do** na [strani Zasloni](./managing-screens.md).

## Sorodni članki

- **[Sestavljanje seznamov predvajanja](./building-playlists.md)** - Ustvarite sezname predvajanja, ki jih načrtujete
- **[Predvajanje po urniku na televizorju](./scheduled-playback.md)** - Kako na televizorju delujeta lekcije s tempom učitelja in daljinski upravljalnik
- **[Upravljanje zaslonov in skupin](./managing-screens.md)** - Dodajanje skupin in preverjanje prenosov vsakega zaslona
- **[Ohranjanje le dela vsake lekcije](/docs/b1-admin/serving/scheduling-lessons#keeping-only-part-of-every-lesson)** - Skrajšajte vsako načrtovano lekcijo v tipu načrta na dele, ki jih vaša soba predvaja
