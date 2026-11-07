---
title: "E-poštne predloge"
---

# E-poštne predloge

<div class="article-intro">

E-poštne predloge vam omogočajo, da shranite ponovno uporabljivo vsebino e-pošte -- sporočilo dobrodošlice, opomnik o dogodku, zahvalo za dar -- tako da jo lahko pošljete vi (ali [delovni tok](../serving/workflows.md)) z enim klikom, namesto da jo pišete od začetka vsakič. Isti seznam vsebuje tudi predloge SMS-sporočil za okna za pošiljanje besedilnih sporočil skupinam in posameznim osebam.

</div>

<div class="prereqs">
<h4>Preden začnete</h4>

- Potrebujete dostop do območja Nastavitve v B1 Admin.

</div>

## Dostop do e-poštnih predlog

1. V B1 Admin odprite [meni za hitri skok](../introduction.md#getting-around-with-the-jump-menu) (iskalno vrstico na zgornji levi strani) in razširite **Nastavitve**.
2. Kliknite **E-poštne predloge**.
3. Prikazal se bo seznam obstoječih predlog z njihovim zadevo, kategorijo in datumom zadnje spremembe.

## Ustvarjanje predloge

1. Kliknite **Nova predloga**.
2. Vnesite **Ime predloge**, s katerim jo boste prepoznali na seznamu, in izberite **Kategorijo** (Splošno, Dogodki, Skupine, Darovi, Dobrodošlica ali Besedilo), ki vam pomaga urediti predloge. Če želite ustvariti predlogo za SMS-sporočilo, izberite **Besedilo** (glejte [Predloge za besedilna sporočila](#text-templates) spodaj).
3. Vnesite vrstico **Zadeve**.
4. Napišite **Telo** sporočila v urejevalniku z obogatenim besedilom.
5. Kliknite **Shrani**.

## Polja za združevanje

Kliknite žeton polja za združevanje nad poljem Zadeva ali Telo, da ga vstavite na mesto kazalca. Najprej kliknite v besedilo, kamor želite polje vstaviti, nato kliknite žeton. Kazalec ostane na svojem mestu, zato lahko takoj nadaljujete s tipkanjem za vstavljenim poljem. Če kliknete žeton za Telo, ne da bi prej kliknili v telo sporočila, se polje doda na konec telesa. Ob pošiljanju e-pošte se vsako polje za združevanje zamenja z dejanskimi podatki prejemnika:

- `{{firstName}}`, `{{lastName}}`, `{{displayName}}` -- Ime prejemnika
- `{{email}}` -- E-poštni naslov prejemnika
- `{{churchName}}` -- Ime vaše cerkve

## Predloge za besedilna sporočila

Predloga s kategorijo **Besedilo** je navadno besedilno sporočilo za pošiljanje SMS-ov, ne e-pošta:

- Nima zadeve. Urejevalnik z obogatenim besedilom je nadomeščen s preprostim poljem **Besedilo sporočila**, ki sprejme do 1.600 znakov.
- Žetoni polj za združevanje nad poljem vstavijo `{{firstName}}`, `{{lastName}}`, `{{displayName}}`, `{{email}}` ali `{{churchName}}` na mesto kazalca.
- Predloge za besedilna sporočila se prikažejo v izbirniku **Naloži predlogo (neobvezno)** v oknu za besedilna sporočila za [skupino](../groups/group-members.md#texting-group-members) ali posamezno osebo. Ko izberete predlogo, se sporočilo samodejno izpolni, pred pošiljanjem pa ga lahko še urejate.
- Ne prikazujejo se v izbirnikih e-poštnih predlog, vključno z dejanjem **Pošlji e-pošto** v delovnih tokovih.

Za pošiljanje besedilnih sporočil je potreben povezan [ponudnik besedilnih sporočil](./church-settings.md#texting).

## Predogled predloge

Kliknite **Predogled**, da si pred shranjevanjem ali pošiljanjem ogledate, kako bosta zadeva in telo videti z vzorčnimi podatki v poljih za združevanje.

## Uporaba predloge

Shranjene predloge lahko izberete pri sestavljanju e-pošte za osebe ali skupino, prav tako pa jih lahko uporabite kot dejanje v [delovnih tokovih](../serving/workflows.md). Preden vaša cerkev lahko pošilja te predloge, mora ekipa ChurchApps enkrat odobriti pošiljanje e-pošte skupinam. Glejte [Vklop e-pošte za skupine v vaši cerkvi](../groups/group-members.md#turning-on-group-email-for-your-church).

## Urejanje in brisanje

Kliknite ikono **Uredi** ob predlogi, da jo posodobite, ali ikono **Izbriši**, da jo trajno odstranite.

## Naslednji koraki

- [Delovni tokovi](../serving/workflows.md) -- Samodejno sprožite e-pošto s predlogo na podlagi pravil
