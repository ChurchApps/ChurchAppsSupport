---
title: "Načrtovani način"
description: "Nastavi FreePlay TV-je za predvajanje seznamov po koledarju v FreePlay Admin: zasloni se sami zaženejo in ustavijo ter ob izpadu Wi-Fi predvajajo naprej."
---

# Načrtovani način

<div class="article-intro">

Načrtovani način omogoča, da FreePlay TV deluje sam od sebe. Sezname predvajanja pripravite in jih razporedite v koledar v **FreePlay Admin** na naslovu [admin.freeplay.church](https://admin.freeplay.church). Vsak TV, povezan s tem koledarjem, prenese vnaprej naslednji teden in predvaja, kar je načrtovano, ob določenem času, brez pritiska na gumb Start. Ker so datoteke že prenesene, predvajanje nemoteno teče tudi, če se Wi-Fi povezava prekine.

</div>

:::tip
FreePlay Admin uporablja vašo prijavo v ChurchApps, to je isto, ki jo uporabljate za B1 Admin. Ni treba ustvariti nobenega ločenega računa.
:::

## Kako vse deluje skupaj

FreePlay Admin ima štiri glavne strani, navedene na vrhu spletnega mesta:

- **[Zasloni](./managing-screens.md)** - TV-ji, ki ste jih seznanili, njihovo stanje in **skupine zaslonov**, ki jim pripadajo. Zasloni v skupini si delijo en koledar in eno privzeto zanko
- **[Seznami predvajanja](./building-playlists.md)** - Zanke slik in videoposnetkov, ki jih izberete pri svojih ponudnikih vsebin
- **[Koledar](./scheduling-the-calendar.md)** - Kaj in kdaj predvaja posamezna skupina zaslonov
- **[Ponudniki](./building-playlists.md#connecting-providers)** - Viri vsebin, iz katerih vaši seznami predvajanja črpajo. Vsakega povežete enkrat za celotno cerkev

Kadar ni nič načrtovano, zasloni v skupini predvajajo njeno **privzeto zanko**. Če skupina nima privzete zanke, zasloni ostanejo temni.

## Kako se razlikuje od načina načrta

- **[Način načrta](../plan-mode/index.md)** sledi enemu tipu bogoslužnega načrta iz B1 Admin. Nekdo pritisne **Start Plan** na TV-ju in lekcija se predvaja, ko to stori
- **Načrtovani način** sledi koledarju. Vsebina se začne in ustavi ob časih, ki jih nastavite, zato dobro deluje za oglasne zanke v avli, obvestila in učilnice, kjer mora biti lekcija prikazana, preden kdo vstopi

Vnos v koledarju lahko še vedno predvaja bogoslužni načrt. Ko dodajate razpored, pod **Service plans** izberite tip načrta, zaslon pa bo tisti teden predvajal trenutni načrt iz B1 Admin. To velja tudi za lekcije Go Curriculum, tudi če ste jih v načrtu prilagodili. Zaslon uporabi prijavo v Go Curriculum, povezano s tipom načrta v B1 Admin, oziroma povezavo cerkve z Go Curriculum, če služba nima svoje.

## Začetek dela

Dokler ne opravite vsakega od teh korakov, stran **Zasloni** prikazuje seznam **Get started** s povezavo za vsak korak:

1. **Povežite ponudnika** - Na strani **Ponudniki** povežite Dropbox, OneDrive, Lessons.church ali drug vir
2. **Ustvarite seznam predvajanja** - Iz ponudnika izberite slike in videoposnetke
3. **Dodajte v koledar** - Izberite, kaj se predvaja kdaj, ali nastavite privzeto zanko za skupino
4. **Seznanite zaslon** - Vnesite štirimestno kodo, prikazano na TV-ju

Kliknite **Hide**, če želite seznam zapreti.

:::tip
Pritisnite **Ctrl+K** (**⌘K** na Macu) ali kliknite iskalno polje v glavi, da odprete paleto ukazov. Od tam lahko skočite na katero koli stran ali zaženete dejanje, kot so **Pair screen**, **Add playlist** ali **Add schedule**.
:::

## V tem razdelku

- **[Seznanjanje zaslona](./pairing-a-screen.md)** - Prikažite kodo na TV-ju in jo seznanite v FreePlay Admin
- **[Upravljanje zaslonov in skupin](./managing-screens.md)** - Preverite stanje in prenose ter razporedite zaslone v skupine
- **[Povezovanje ponudnikov in ustvarjanje seznamov predvajanja](./building-playlists.md)** - Povežite vire vsebin in ustvarite zanke slik in videoposnetkov
- **[Načrtovanje koledarja](./scheduling-the-calendar.md)** - Določite, kaj se predvaja kdaj in kaj se zgodi, ko se konča prej
- **[Predvajanje po urniku na TV-ju](./scheduled-playback.md)** - Kaj TV naredi sam od sebe in kako med predvajanjem uporabljati daljinec
