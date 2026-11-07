---
title: "Uvoz iz Stripe"
description: "Uvozite darove iz Stripe v B1 Admin s predogledom, ki označi vsako plačilo kot novo, že uvoženo ali preskočeno, preden potrdite uvoz."
---

# Uvoz iz Stripe

<div class="article-intro">

Če sprejemate spletna darila prek Stripe, vam orodje Uvoz iz Stripe omogoča, da te transakcije prenesete v B1 Admin, tako da so vsi podatki o darovanjih na enem mestu. To je še posebej uporabno za iskanje transakcij, ki se niso samodejno sinhronizirale.

</div>

<div class="prereqs">
<h4>Preden začnete</h4>

- Dokončajte [Nastavitev spletnih darovanj](online-giving-setup.md), da povežete svoj račun Stripe z B1 Admin. Menijska postavka **Uvoz iz Stripe** in gumb na strani Paketi se prikažeta le, če je plačilni ponudnik za darovanja vaše cerkve Stripe, in samo za osebe, ki lahko urejajo darila
- Preverite, ali imate v nadzorni plošči Stripe darila za časovno obdobje, ki ga želite uvoziti

</div>

## Kako deluje

Postopek uvoza poteka v dveh korakih: najprej si ogledate predogled, kaj bi bilo uvoženo, nato uvoz potrdite. Ta pristop s suhim zagonom vam omogoča, da vse pregledate, preden se ustvarijo kakršni koli podatki.

## Uvoz transakcij

1. V **B1 Admin** pojdite na **Donacije > Uvoz iz Stripe**. (Lahko kliknete tudi **Uvozi manjkajoče transakcije Stripe** na vrhu strani **Paketi**.)
2. Odpre se stran **Uvoz iz Stripe**.
3. Izberite **časovno obdobje** za transakcije, ki jih želite uvoziti.
4. Kliknite **Predogled**, da zaženete preverjanje s suhim zagonom.

## Pregled predogleda

Predogled prikaže vsako transakcijo iz Stripe skupaj s statusnim indikatorjem:

- **Novo** -- ta transakcija še ni bila uvožena in bo vključena, če nadaljujete.
- **Že uvoženo** -- ta transakcija že obstaja v B1 Admin in bo preskočena.
- **Preskočeno** -- ta transakcija je bila izključena iz drugega razloga (npr. vračilo ali neuspešno plačilo).

Povzetek na vrhu prikazuje skupno število transakcij v vsaki kategoriji in zneske v dolarjih, ki so vključeni.

:::info
Korak predogleda ne ustvari nobenih zapisov. Gre za pregled samo za branje, da lahko preverite, kaj se bo zgodilo, preden se zavežete.
:::

## Dokončanje uvoza

1. Preglejte rezultate predogleda in skupne vsote v povzetku.
2. Kliknite **Uvozi manjkajoče**, da uvozite vse transakcije, označene kot **Novo**.
3. Po zaključku uvoza se statusne oznake ob vsaki transakciji posodobijo in prikažejo rezultat.

## Nasveti za uporabo uvoza iz Stripe

- Uvoz izvajajte redno (tedensko ali mesečno), da bodo vaši zapisi ažurni.
- Če je transakcija prikazana kot **Že uvoženo**, to pomeni, da B1 Admin že ima ustrezen zapis -- ukrepanje ni potrebno.
- Če iščete določene transakcije, uporabite filter časovnega obdobja, da se osredotočite na določeno obdobje.

:::tip
Po uvozu obiščite stran [Paketi](batches.md), da preverite, ali se uvožena darila pravilno prikazujejo in ali se vsote ujemajo s tistim, kar vidite v nadzorni plošči Stripe.
:::

## Naslednji koraki

- Oglejte si [Poročila o darovanjih](donation-reports.md), da pregledate uvožene transakcije skupaj z drugimi podatki o darovanjih
- Poskrbite, da bodo uvožena darila dodeljena pravilnim [skladom](funds.md) za točne [izpiske darovanj](giving-statements.md)
