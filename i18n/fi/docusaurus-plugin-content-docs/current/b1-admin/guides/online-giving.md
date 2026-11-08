---
title: "Vodič: Postavljanje online davanja"
description: "Postavite online davanje u B1 Admin kreiranjem fondova za donacije, povezivanjem sa Stripeom i dodavanjem stranice Donate na vaš B1.church web-sajt za članove."
---

# Postavljanje online davanja

<div class="article-intro">

Prođite kroz sve što je potrebno za prihvatanje online donacija u vašoj crkvi — od kreiranja fondova za donacije, preko povezivanja Stripea za obradu plaćanja, do dijeljenja stranice za davanje sa vašom zajednicom. Na kraju, članovi će moći davati online putem vašeg web-sajta i mobilne aplikacije.

</div>

<div class="prereqs">
<h4>Prije nego što počnete</h4>

- B1 Admin nalog sa administratorskim pristupom — pogledajte [Uloge i dozvole](../people/roles-permissions.md)
- Stripe nalog (kreirajte besplatno na [stripe.com](https://stripe.com) ako je potrebno)

</div>

## Korak 1: Kreirajte fondove za donacije

Fondovi su kategorije u koje donatori mogu davati. Potreban vam je najmanje jedan fond prije nego što možete prihvatati donacije.

Pratite vodič [Fondovi](../donations/funds.md) da postavite svoje kategorije davanja:

1. Kreirajte najčešće korištene fondove (npr. „Opći fond“, „Fond za zgradu“, „Misije“)
2. Označite fondove koji su porezno olakšani na odgovarajući način — ovo utiče na godišnje izvještaje o davanju

:::tip
Fondove možete dodavati u bilo kom trenutku. Počnite sa svojim najčešćim kategorijama davanja.
:::

## Korak 2: Povežite Stripe

Stripe obrađuje sva plaćanja. Povezat ćete svoj Stripe nalog sa B1 Adminom kako bi donacije išle direktno na vaš bankovni račun.

Pratite vodič [Postavljanje online davanja](../donations/online-giving-setup.md) da povežete Stripe:

1. Prijavite se na svoju Stripe kontrolnu tablu i preuzmite svoj javni ključ (Publishable Key) i tajni ključ (Secret Key)
2. U B1 Adminu idite na Postavke i unesite oba ključa

:::warning
Stripe prikazuje vaš tajni ključ samo jednom. Kopirajte ga i sačuvajte prije nego što napustite Stripe kontrolnu tablu. Ako ga izgubite, morat ćete generisati novi.
:::

## Korak 3: Dodajte stranicu za davanje na vaš web-sajt

Učinite davanje dostupnim dodavanjem stranice za donacije na vaš B1 web-sajt.

Pratite vodiče [Postavljanje online davanja](../donations/online-giving-setup.md) i [Upravljanje stranicama](../website/managing-pages.md) da:

1. Dodate karticu „Donate“ na vaš B1.church sajt
2. Vaš URL za davanje će biti: `https://yoursubdomain.b1.church/donate`
3. Članovi mogu davati bez prijave (javna stranica) ili se prijaviti radi čuvanja načina plaćanja i historije donacija

## Korak 4: Napravite probnu donaciju

Prije objavljivanja zajednici, provjerite da sve radi.

1. Napravite malu probnu donaciju da provjerite da tok funkcioniše od početka do kraja
2. Provjerite da se donacija pojavljuje u B1 Adminu pod Donacije

:::tip
Ako želite provjeriti bez stvarnih naplata, prvo koristite Stripe test režim, a zatim prebacite na live režim prije objavljivanja zajednici.
:::

## Korak 5: Obavijestite svoju zajednicu

Recite ljudima da mogu davati online.

1. Podijelite URL za davanje putem web-sajta, e-mail biltena, biltena za bogoslužje i društvenih mreža
2. Članovi mogu davati i putem [B1 aplikacije](../../b1-church/giving/index.md) — funkcija davanja je ugrađena

:::info
Članovi koji se prijave mogu čuvati načine plaćanja, postaviti ponavljajuće donacije i pregledati historiju davanja. Anonimno davanje također funkcioniše — nije potrebna prijava.
:::

## Korak 6: Tekuće upravljanje

Redovno ažurirajte evidenciju donacija i generišite izvještaje tokom cijele godine.

1. [Uvezite Stripe transakcije](../donations/stripe-import.md) redovno (sedmično ili mjesečno) da evidencija ostane ažurna
2. [Pregledajte izvještaje o donacijama](../donations/donation-reports.md) da pratite trendove davanja i ukupne iznose po fondu
3. [Generišite godišnje izvještaje o davanju](../donations/giving-statements.md) za porezne evidencije vaših donatora

:::tip
Uvoz Stripe podataka pokrećite najmanje mjesečno da vaša evidencija ostane ažurna. Pogledajte [Vodič za godišnje izvještaje](./year-end-reports.md) za cijeli godišnji proces.
:::

## Gotovo!

Vaša crkva sada prihvata online donacije. Članovi mogu davati putem vašeg web-sajta, B1 aplikacije ili bilo kojeg uređaja sa web preglednikom. Sve donacije se automatski prate u B1 Adminu.

## Povezani članci

- [Fondovi](../donations/funds.md) — kreiranje i upravljanje kategorijama donacija
- [Serije](../donations/batches.md) — organizujte donacije u grupe
- [Evidentiranje donacija](../donations/recording-donations.md) — ručni unos gotovinskih i čekovnih donacija
- [Stripe uvoz](../donations/stripe-import.md) — preuzmite online transakcije u B1 Admin
- [Izvještaji o donacijama](../donations/donation-reports.md) — pregled trendova davanja i ukupnih iznosa
- [Izvještaji o davanju](../donations/giving-statements.md) — generišite godišnje porezne izvještaje
- [Davanje](../../b1-church/giving/making-donations.md) — iskustvo davanja za članove na B1.church i u B1 aplikaciji
