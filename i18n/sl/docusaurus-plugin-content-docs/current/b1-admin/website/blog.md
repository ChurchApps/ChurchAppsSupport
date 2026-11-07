---
title: "Blog"
---

# Blog

<div class="article-intro">

Stran Blog vam omogoča objavljanje novic, posodobitev in duhovnih premislekov na spletni strani vaše cerkve. Objave se prikažejo v seznamu kartic na `/blog`, na lastnem naslovu URL in v viru RSS, ki ga lahko spremljajo drugi programi (na primer Zapier) in zaznajo nove objave.

</div>

<div class="prereqs">
<h4>Preden začnete</h4>

- Dokončajte [začetno nastavitev](initial-setup) za svojo spletno stran
- Če želite, da obiskovalci najdejo vaš blog v meniju, dodajte povezavo na `/blog` prek [upravljanja strani](managing-pages)

</div>

## Dostop do bloga

1. V B1 Admin odprite [meni za hitri skok](../introduction.md#getting-around-with-the-jump-menu) (iskalno polje v zgornjem levem kotu) in razširite **Spletna stran**.
2. Kliknite **Blog**.
3. Stran Blog prikazuje vse objave skupaj z njihovim stanjem in datumom objave.

## Dodajanje objave

1. Kliknite **Dodaj objavo** v zgornjem desnem kotu.
2. Vnesite **Naslov**. Med tipkanjem se samodejno ustvari **spletni naslov** (slug), prijazen za URL. Če želite drug naslov, ga lahko neposredno uredite.
3. Dodajte **Povzetek** -- kratek opis, ki se prikaže na seznamu objav, v opisih za iskalnike in v viru RSS. Če ga pustite prazno, se samodejno ustvari iz začetka vsebine objave.
4. Napišite besedilo objave v urejevalniku **Vsebina** z uporabo Markdowna. Kliknite **Predogled**, da si ogledate, kako bo oblikovana objava videti.
5. Izberite **Kategorijo** (izberite obstoječo ali vpišite novo) in po želji vnesite **Oznake**, ločene z vejicami.
6. Kliknite **Izberi sliko**, da izberete fotografijo iz galerije [Datoteke](files), ali naložite novo. Naložene fotografije se odprejo v vgrajenem orodju za rezanje, ki je zaklenjeno na razmerje 16:9, tako da lahko fotografijo prilagodite glavi objave in karticam na seznamu.
7. Nastavite **Avtorja** -- privzeto ste to vi, lahko pa poiščete in izberete katerokoli osebo iz vaše baze podatkov.
8. Vklopite **Objavljeno** in nastavite **Datum objave**, ko boste pripravljeni objavo narediti javno. Če stikalo pustite izklopljeno, se objava shrani kot osnutek.

:::tip
Nastavite **Datum objave** v prihodnosti, če želite objavo načrtovati. Do tega datuma bo skrita pred obiskovalci, na seznamu Blog pa bo prikazana oznaka **Načrtovano**.
:::

## Stanja objav

Vsaka objava na seznamu prikazuje eno od treh stanj:

- **Osnutek** -- Ni objavljeno. Vidno je samo v skrbniškem vmesniku.
- **Načrtovano** -- Objavljeno je vklopljeno, vendar je datum objave v prihodnosti.
- **Objavljeno** -- Objava je dostopna na vaši spletni strani in vključena v vir RSS.

## Urejanje, predogled in brisanje objav

- Kliknite **Uredi** poleg objave, če želite opraviti spremembe.
- Kliknite **Ogled na strani** (prikazano pri objavljenih objavah), da odprete objavo na vaši spletni strani v novem zavihku.
- Kliknite **Izbriši**, če želite objavo trajno odstraniti.

## Kako obiskovalci vidijo vaš blog

Objavljene objave se prikažejo na naslovu `{yoursite}/blog`, po 10 na stran, z NAVIGACIJSKIMI povezavami za pregled arhiva, ter s filtrom po kategorijah, avtorjem in fotografijo vsake objave. Oznake so prikazane tudi kot klikljive značke, tako da lahko obiskovalci seznam filtrirajo po oznakah na enak način. Posamezne objave so dostopne na naslovu `{yoursite}/blog/{slug}` in vključujejo sorodne objave iz iste kategorije. Stran bloga objavlja tudi vir RSS, ki ga bralniki virov in orodja za avtomatizacijo, kot je Zapier, lahko samodejno zaznajo.

:::info
Objave v blogu so ločena vrsta vsebine od rednih spletnih strani -- ne ustvarjajo se v [urejevalniku strani](page-editor) in se ne prikažejo na seznamu Strani. Tako je pisanje objav hitrejše in osredotočeno na besedilo.
:::

## Dodajanje komentarjev pod objave

B1 sam ne gosti komentarjev v blogu, lahko pa dodate storitev za komentarje. Pod vsako objavo lahko dodate tudi kaj drugega, na primer prijavo na novice ali gumb za darovanje.

1. Registrirajte se pri storitvi za komentarje, kot so [Hyvor Talk](https://talk.hyvor.com), [FastComments](https://fastcomments.com) ali [Disqus](https://disqus.com), in kopirajte njihovo vdelovalno kodo.
2. Na strani Blog se pomaknite do **Pod vsako objavo**.
3. Prilepite vdelovalno kodo in kliknite **Shrani**.

Koda se prikaže pod vsebino vsake objavljene objave. Storitev za komentarje skrbi za moderiranje in filtriranje neželene pošte, zato redno preverjajte njeno nadzorno ploščo.

:::tip
Izpraznite polje in kliknite **Shrani**, da kodo odstranite iz vseh objav. To polje vidijo samo osebe, ki lahko urejajo nastavitve cerkve.
:::

## Naslednji koraki

- [Upravljanje strani](managing-pages) -- dodajte povezavo do svojega bloga v navigacijo
- [Datoteke](files) -- naložite fotografije za uporabo v objavah
- [Integracija z Zapierjem](../integrations/zapier.md) -- sprožite avtomatizacije ob objavi novih objav
