---
title: "Vodič: Generisanje godišnjih izveštaja o donacijama"
description: "U B1 Admin-u završite evidenciju donacija za godinu, proverite poreska podešavanja fondova i generišite potvrde o donacijama za poreski odbitak za svakog donatora."
---

# Generisanje godišnjih izveštaja o donacijama

<div class="article-intro">

Prođite kroz godišnji proces finalizovanja evidencije donacija, proveravanja podešavanja fondova i generisanja potvrda o donacijama za poreski odbitak za svakog donatora. Ovo se obično radi početkom januara za prethodnu kalendarsku godinu.

</div>

<div class="prereqs">
<h4>Pre nego što počnete</h4>

- Nalog B1 Admin sa finansijskim pristupom
- Donacije evidentirane tokom godine (onlajn preko Stripe-a i/ili ručno unete)
- Pristup vašem Stripe nalogu ako primate onlajn donacije

</div>

## Korak 1: Uvezite poslednje Stripe transakcije

Proverite da su sve onlajn donacije sa kraja godine u vašem sistemu.

Pratite vodič [Stripe uvoz](../donations/stripe-import.md) da biste:

1. Otišli na Donations > Stripe Import
2. Izabrali period koji pokriva kraj godine (npr. 1. decembar – 31. decembar)
3. Kliknuli na Preview da pregledate, a zatim na Import Missing da završite uvoz

:::warning
Pokrenite ovaj uvoz pre generisanja potvrda. Transakcije koje niste uvezli neće se pojaviti na potvrdama donatora.
:::

## Korak 2: Pregledajte izveštaje o donacijama

Proverite da su vaši podaci tačni pre generisanja potvrda.

Pratite vodič [Izveštaji o donacijama](../donations/donation-reports.md) da biste:

1. Proverili stranicu sa pregledom donacija za celu godinu
2. Pregledali ukupne iznose po fondu i uporedili ih sa izvodima iz banke kako biste uočili eventualna odstupanja
3. Po potrebi kliknuli na pojedinačne serije (batches) da proverite podatke o donacijama po donatorima

## Korak 3: Proverite poreski status fondova

Uverite se da je poreska podešenost svakog fonda ispravna kako bi potvrde bile tačne.

Pratite vodič [Fondovi](../donations/funds.md) da biste:

1. Otvorili svaki fond i potvrdili da je podešavanje poreskog odbitka ispravno

:::info
Na potvrdama o donacijama pojaviće se samo donacije namenjene fondovima označenim kao poreski odbitni. Ako fond treba da bude poreski odbitan, a nije tako označen, ažurirajte ga pre generisanja potvrda.
:::

## Korak 4: Generišite potvrde o donacijama

Kreirajte zvanične potvrde o donacijama za svoje donatore.

Pratite vodič [Potvrde o donacijama](../donations/giving-statements.md) da biste:

1. Otišli na **Donations > Giving Statements**
2. Izabrali godinu iz padajućeg menija i pregledali sumarne statistike
3. Izabrali način preuzimanja:
   - **Download ZIP** — pojedinačne CSV datoteke, jedna po donatoru
   - **Print All** — prikaz za štampu sa svakom potvrdom na novoj strani, uz logo vaše crkve na vrhu (ako ste ga otpremili)

:::tip
Generišite potvrde početkom januara dok su podaci sveži. Tako imate vremena da otklonite eventualne probleme pre slanja.
:::

## Korak 5: Dostavite donatorima

Obezbedite da potvrde stignu do vaših donatora.

1. Odštampajte i pošaljite potvrde poštom ili pojedinačne CSV datoteke pošaljite donatorima e-poštom
2. Članovi takođe mogu pregledati sopstvenu istoriju donacija i štampati potvrde na [B1.church ili u B1 App-u](../../b1-church/giving/donation-history.md)

## Gotovo!

Vaši godišnji izveštaji o donacijama su završeni. Donatori imaju potvrde za poreski odbitak, a vaša finansijska evidencija za godinu je finalizovana.

## Povezani članci

- [Stripe uvoz](../donations/stripe-import.md) — uvoz onlajn transakcija
- [Izveštaji o donacijama](../donations/donation-reports.md) — pregled trendova i ukupnih iznosa donacija
- [Fondovi](../donations/funds.md) — upravljanje fondovima i podešavanjima poreskog odbitka
- [Potvrde o donacijama](../donations/giving-statements.md) — generisanje godišnjih potvrda
- [Evidentiranje donacija](../donations/recording-donations.md) — ručni unos gotovinskih i čekovnih donacija
- [Istorija donacija (veb)](../../b1-church/giving/donation-history.md) — samoposluga za članove
- [Vodič za podešavanje onlajn davanja](./online-giving.md) — početno podešavanje Stripe-a i davanja
