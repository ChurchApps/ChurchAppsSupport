---
title: "Počætna nastavitev"
---

# Počætna nastavitev

<div class="article-intro">

Vsak račun B1 vključuje spletno mesto, ki je pripravljeno za uporabo. Ta vodnik vas popelje skozi nastavitev domene vaše cerkve, konfiguracijo videza spletnega mesta, ustvarjanje prvih strani in organizacijo navigacije.

</div>

<div class="prereqs">
<h4>Preden začnete</h4>

- Potrebujete račun B1.church s skrbniškim dostopom
- Če uporabljate domeno po meri, pripravite prijavne podatke za ponudnika DNS (npr. GoDaddy, Cloudflare ali AWS)
- Za najboljši rezultat pripravite logotip cerkve v formatu PNG s prozornim ozadjem

</div>

## Nastavitev domene

Vaša cerkev samodejno prejme poddomeno na B1.church (na primer `vasacerkev.b1.church`). Lahko pa tudi svojo domeno po meri usmerite na vaše spletno mesto B1.

1. Pojdite na **B1.church Admin** tako, da obiščete admin.b1.church ali kliknete na spustni meni svojega profila in izberete **Switch App**.
2. Odprite [meni Jump](../introduction.md#getting-around-with-the-jump-menu) (iskalno polje v zgornjem levem kotu), razširite **Settings** in kliknite **Settings**.
3. Odprite razdelek **Church Information**, da si ogledate svojo poddomeno. Nastavite jo na nekaj kratkega in prepoznavnega brez presledkov.
4. Če želite uporabiti domeno po meri, se prijavite pri svojem ponudniku DNS (na primer GoDaddy, Cloudflare ali AWS) in dodajte dva zapisa:
   - **A zapis** za vašo korensko domeno, ki kaže na `3.23.251.61`
   - **CNAME zapis** za `www`, ki kaže na `proxy.b1.church`
5. Vrnite se v B1.church Admin, na isti strani Settings odprite razdelek **Domains**, dodajte svojo domeno po meri na seznam in kliknite **Add**, nato **Save**. Vaše spletno mesto bo dostopno prek domene po meri v nekaj minutah.

:::tip
Če ne vidite možnosti Settings, prosite osebo, ki je nastavila vaš cerkveni račun, naj vam dodeli dovoljenje "Edit Church Settings". Podrobnosti najdete v razdelku [Vloge in dovoljenja](../settings/roles-permissions.md).
:::

## Ustvarjanje prve strani

1. V B1 Admin odprite [meni Jump](../introduction.md#getting-around-with-the-jump-menu) (iskalno polje v zgornjem levem kotu), razširite **Website** in kliknite **Pages**.
2. Kliknite **Add Page** v zgornjem desnem kotu.
3. Kot vrsto strani izberite **Blank** in jo poimenujte "Home".
4. Kliknite **Page Settings** in za domačo stran nastavite pot URL na `/` (poševnica brez besedila). Druge strani uporabljajo `/ime-strani`.
5. Kliknite **Edit Content**, da začnete graditi. Vsaka stran se mora začeti z **Section** – to je vsebnik za vse druge elemente.
6. Po dodajanju razdelka ponovno kliknite **Add Content**, da vstavite besedilo, slike, videoposnetke, kartice, obrazce in več, tako da jih povlečete v svoj razdelek.

:::info
Podrobna navodila za delo s stranmi in navigacijo najdete v razdelku [Upravljanje strani](managing-pages). Celoten vodnik po vizualnem urejevalniku najdete v razdelku [Uporaba urejevalnika strani](page-editor).
:::

## Konfiguracija videza spletnega mesta

1. V meniju Jump izberite **Website > Appearance**.
2. Z **Color Palette** nastavite barve svoje blagovne znamke za primarni, sekundarni in poudarjeni ton.
3. Pod **Fonts** izberite pisave za naslove in besedilo iz brskalnika pisav.
4. V razdelku **Logo** v nastavitvah sloga naložite logotip svoje cerkve. Priskrbite različico za svetlo in temno ozadje.
5. Konfigurirajte **Site Footer** s kontaktnimi podatki in povezavami vaše cerkve.

:::info
Spremembe, ki jih naredite v Appearance, veljajo za celotno vaše spletno mesto. Podrobna navodila za vsako nastavitev najdete na strani [Appearance](appearance).
:::

## Nastavitev navigacije

Vaše navigacijske povezave so prikazane v pogledu Website Pages. Za njihovo organizacijo:

1. Kliknite **Add**, da ustvarite novo navigacijsko povezavo, in jo usmerite na eno od svojih strani.
2. Povezave povlecite in spustite, da jih preuredite ali jih gnezdite pod nadrejene elemente.
3. Predogledajte svoje spletno mesto, da preverite, ali je navigacija pravilna.

## Naslednji koraki

- [Upravljanje strani](managing-pages) -- Podrobno se naučite delati s stranmi in navigacijo
- [Appearance](appearance) -- Natančno prilagodite barve, pisave in postavitev spletnega mesta
- [Datoteke](files) -- Naložite slike in dokumente za svoje spletno mesto
