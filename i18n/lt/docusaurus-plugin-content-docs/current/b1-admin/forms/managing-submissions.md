---
title: "Upravljanje prijavama"
---

# Upravljanje prijavama

<div class="article-intro">

Kada vaš obrazac bude aktivan, prijave će početi pristizati. Kartica **Form Submissions** omogućava vam da pregledate svaki odgovor, pratite ko je poslao prijavu i koristite podatke kako biste na vreme kontaktirali svoju zajednicu.

</div>

<div class="prereqs">
<h4>Prije nego što počnete</h4>

- [Kreirajte obrazac](./creating-forms.md) sa najmanje jednim pitanjem
- Podelite obrazac putem njegove javne URL adrese ili ga ugradite na svoju [web stranicu](../website/managing-pages.md)

</div>

## Pregled prijava

1. Otvorite [Jump meni](../introduction.md#getting-around-with-the-jump-menu) (traku za pretragu u gornjem levom uglu B1 Admin-a), proširite **People** i kliknite na **Forms**.
2. Kliknite na obrazac koji želite da pregledate.
3. Idite na karticu **Form Submissions**.

Videćete listu svih odgovora primljenih za taj obrazac. Svaka prijava prikazuje podatke o osobi koja ju je poslala i datum slanja, a zatim po jednu kolonu za svako pitanje na obrascu. Ako vaš obrazac ima mnogo pitanja, pomerite tabelu udesno kako biste videli ostale kolone.

## Pregled pojedinačnih prijava

Kliknite na bilo koju prijavu da biste videli sve detalje. Videćete sve odgovore koje je osoba dala na svako pitanje u obrascu.

Kliknite na **ikonu štampača** pored prijave da biste odštampali popunjene odgovore te osobe. Ovo je korisno za papirnu dokumentaciju ili potpisanu saglasnost koju treba da čuvate. Na štampanom dokumentu se u sredini na vrhu nalazi logotip vaše crkve (**Logo za svetlu pozadinu** iz [Website > Appearance](../website/appearance.md), ako ste ga otpremili), ispod kojeg je naziv vaše crkve. Štampani dokumenti uvek koriste tamni tekst na beloj stranici, čak i ako koristite B1 Admin u tamnom režimu. Ovo je odvojeno od [štampanja praznog obrasca](./creating-forms.md#printing-a-blank-form); ova opcija štampa odgovore jedne osobe koji su već poslati, a ne prazan primerak. Ikona štampača se pojavljuje svuda gde se prikazuje prijava, uključujući i [profil osobe](../people/adding-people.md#working-with-forms).

## Promena osobe povezane sa prijavom

Ako je prijava povezana sa pogrešnom osobom — na primer, dva člana porodice dele istu adresu e-pošte — možete je premestiti na pravu osobu ili je otkačiti.

1. Na kartici **Form Submissions** kliknite na ikonu **Change person** (dve strelice) pored imena osobe. Ista ikona se pojavljuje pored prijave i na [profilu osobe](../people/adding-people.md#working-with-forms).
2. U dijalogu **Change person** potražite pravu osobu i kliknite na **Move to this person**.
3. Ili kliknite na **Unlink (Anonymous)** da biste odvojili prijavu od bilo koje osobe. Tada će se prikazivati kao **Anonymous**.

Menja se samo veza. Odgovori ostaju isti, a ponovo se ne šalju e-poruke za praćenje.

:::info
Kod obrazaca koji kreiraju zapis o osobi, kada je neko prijavljen na sajt vaše crkve dok šalje obrazac, prijava se povezuje sa njegovim sopstvenim zapisom, čak i ako neka druga osoba u vašoj bazi podataka deli istu adresu e-pošte. Kada [spojite dva zapisa o osobi](../people/adding-people.md), prijave obrasca uklonjene osobe prelaze na osobu koju zadržavate.
:::

## Kako se prijave prikupljaju

Prijave mogu stizati kroz nekoliko kanala:

- **Javna URL adresa** -- Ako vaš obrazac ima javnu URL adresu (samostalni obrasci), svako ko ima link može poslati odgovor. Podelite URL putem e-pošte, društvenih mreža ili tekstualnih poruka.
- **Ugrađeno na vašoj web stranici** -- Obrasci ugrađeni na vaš B1 sajt automatski prikupljaju prijave kada ih posetioci popune.
- **Interna upotreba** -- Zaposleni i volonteri mogu takođe popunjavati obrasce u ime drugih direktno u okviru B1 Admin-a.

:::tip
Redovno proveravajte karticu **Form Submissions** za obrasce kao što su kartice posetilaca ili molbe za molitvu, kako biste mogli brzo da reagujete.
:::

## Korišćenje podataka iz prijava

Podaci prikupljeni putem obrazaca mogu vam pomoći da:

- Pratite prijave za događaje i planirate u skladu s tim
- Kontaktirate posetioce ili nove članove
- Prikupite povratne informacije iz anketa za planiranje službi
- Obradite uplate za događaje ili programe

:::info
Članovi obrasca sa ulogama **Admin** ili **View Only** mogu pristupiti kartici **Form Submissions**. Vodite računa da pravi ljudi u vašem timu imaju pristup obrascima koji su im potrebni, tako što ćete upravljati ulogama na kartici **Form Members**.
:::

:::info
Ako je samostalni obrazac [povezan sa grupom](./creating-forms.md#linking-a-form-to-a-group), lideri te grupe mogu čitati i štampati njegove prijave sa stranice grupe na B1.church, bez potrebe da budu članovi obrasca. Lideri takođe mogu tamo pregledati odgovore na pitanja za registraciju za događaje svoje grupe. Pogledajte [Group Details](../../b1-church/groups/group-details.md#linked-forms).
:::

:::tip
Ako je samostalni obrazac podešen da kreira zapis o osobi, sve prijave koje se podudaraju sa postojećom osobom takođe se prikazuju u odeljku **Forms** na stranici te osobe u People — ne samo kod obrazaca tipa People.
:::

## Sledeći koraci

- Saznajte kako da kreirate i prilagodite obrasce u [Creating Forms](./creating-forms.md)
- Dodajte osobe iz prijava obrazaca u vaš [imenik osoba](../people/adding-people.md) radi daljeg praćenja
- [Povežite obrazac sa grupom](./creating-forms.md#linking-a-form-to-a-group) kako bi lideri mogli da čitaju odgovore, ili [automatski dodajte podnosioce u grupu](./creating-forms.md#automatically-adding-submitters-to-a-group) kako bi samostalni obrazac za prijavu sam formirao spisak članova grupe
