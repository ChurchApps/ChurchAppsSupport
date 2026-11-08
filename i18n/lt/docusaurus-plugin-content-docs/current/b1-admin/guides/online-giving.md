---
title: "Vadovas: Internetinių aukų rinkimo nustatymas"
description: "Nustatykite internetines aukas B1 Admin sistemoje: sukurkite aukų fondus, prijunkite Stripe ir pridėkite Aukoti puslapį prie savo B1.church svetainės nariams."
---

# Internetinių aukų rinkimo nustatymas

<div class="article-intro">

Peržiūrėkite viską, ko reikia, kad bažnyčia galėtų priimti internetines aukas: nuo aukų fondų kūrimo iki Stripe prijungimo mokėjimams apdoroti ir aukojimo puslapio pasidalijimo su bendruomene. Baigę šiuos veiksmus, nariai galės aukoti per jūsų svetainę ir mobiliąją programėlę.

</div>

<div class="prereqs">
<h4>Prieš pradedant</h4>

- B1 Admin paskyra su administratoriaus teisėmis — žr. [Vaidmenys ir leidimai](../people/roles-permissions.md)
- Stripe paskyra (prireikus sukurkite nemokamai adresu [stripe.com](https://stripe.com))

</div>

## 1 žingsnis: sukurkite aukų fondus

Fondai yra kategorijos, kuriomis aukotojai gali paaukoti. Kol nesukursite bent vieno fondo, negalėsite priimti aukų.

Vadovaukitės [Fondų](../donations/funds.md) vadovu, kad nustatytumėte savo aukojimo kategorijas:

1. Sukurkite dažniausiai naudojamus fondus (pvz., „Bendrasis fondas“, „Statybų fondas“, „Misijos“)
2. Tinkamai pažymėkite fondus, kurių aukos atskaitomos nuo mokesčių — tai turi įtakos metinėms aukų ataskaitoms

:::tip
Fondus galite pridėti bet kada. Pradėkite nuo dažniausiai naudojamų aukojimo kategorijų.
:::

## 2 žingsnis: prijunkite Stripe

Stripe tvarko visą mokėjimų apdorojimą. Prijungsite savo Stripe paskyrą prie B1 Admin, kad aukos būtų pervedamos į jūsų banko sąskaitą.

Vadovaukitės [Internetinių aukų nustatymo](../donations/online-giving-setup.md) vadovu, kad prijungtumėte Stripe:

1. Prisijunkite prie savo Stripe valdymo skydelio ir gaukite Viešąjį raktą (Publishable Key) bei Slaptąjį raktą (Secret Key)
2. B1 Admin sistemoje eikite į Nustatymus ir įveskite abu raktus

:::warning
Stripe Slaptąjį raktą rodo tik vieną kartą. Prieš palikdami Stripe valdymo skydelį, nukopijuokite ir išsaugokite jį. Jei jį prarasite, turėsite sugeneruoti naują.
:::

## 3 žingsnis: pridėkite aukojimo puslapį prie savo svetainės

Padarykite aukojimą prieinamą pridėdami aukojimo puslapį prie savo B1 svetainės.

Vadovaukitės [Internetinių aukų nustatymo](../donations/online-giving-setup.md) ir [Puslapių valdymo](../website/managing-pages.md) vadovais, kad:

1. Į savo B1.church svetainę pridėtumėte skirtuką „Aukoti“
2. Jūsų aukojimo nuoroda bus: `https://yoursubdomain.b1.church/donate`
3. Nariai gali aukoti neprisijungę (viešas puslapis) arba prisijungti, kad galėtų naudoti išsaugotus mokėjimo būdus ir matyti aukų istoriją

## 4 žingsnis: atlikite bandomąją auką

Prieš skelbdami bendruomenei, patikrinkite, ar viskas veikia.

1. Atlikite nedidelę bandomąją auką, kad patikrintumėte, ar procesas veikia nuo pradžios iki galo
2. Patikrinkite, ar auka matoma B1 Admin sistemoje skiltyje Aukos

:::tip
Jei norite patikrinti be tikrų mokėjimų, pirmiausia naudokite Stripe testavimo režimą, o prieš skelbdami bendruomenei perjunkite į tikrąjį režimą.
:::

## 5 žingsnis: paskelbkite bendruomenei

Praneškite apie galimybę aukoti internetu, kad nariai žinotų.

1. Pasidalykite aukojimo nuoroda per svetainę, el. naujienlaiškius, biuletenius ir socialinius tinklus
2. Nariai taip pat gali aukoti per [B1 programėlę](../../b1-church/giving/index.md) — aukojimo funkcija yra įtraukta

:::info
Prisijungę nariai gali išsaugoti mokėjimo būdus, nustatyti pasikartojančias aukas ir peržiūrėti savo aukų istoriją. Veikia ir anoniminės aukos — prisijungti nereikia.
:::

## 6 žingsnis: nuolatinis valdymas

Nuolat atnaujinkite aukų įrašus ir generuokite ataskaitas per visus metus.

1. [Importuokite Stripe operacijas](../donations/stripe-import.md) reguliariai (kas savaitę arba kas mėnesį), kad įrašai būtų aktualūs
2. [Peržiūrėkite aukų ataskaitas](../donations/donation-reports.md), kad sektumėte aukojimo tendencijas ir sumas pagal fondą
3. [Sugeneruokite metines aukų pažymas](../donations/giving-statements.md) aukotojų mokestinei apskaitai

:::tip
Stripe importus vykdykite bent kartą per mėnesį, kad jūsų įrašai būtų atnaujinti. Visą metinį procesą rasite [Metinių ataskaitų vadove](./year-end-reports.md).
:::

## Viskas paruošta!

Jūsų bažnyčia dabar priima internetines aukas. Nariai gali aukoti per jūsų svetainę, B1 programėlę ar bet kurį įrenginį su žiniatinklio naršykle. Visos aukos automatiškai registruojamos B1 Admin sistemoje.

## Susijusios straipsniai

- [Fondai](../donations/funds.md) — kurkite ir valdykite aukojimo kategorijas
- [Partijos](../donations/batches.md) — suskirstykite aukas į grupes
- [Aukų įrašymas](../donations/recording-donations.md) — rankiniu būdu įveskite grynųjų pinigų ir čekių aukas
- [Stripe importas](../donations/stripe-import.md) — perkelkite internetines operacijas į B1 Admin
- [Aukų ataskaitos](../donations/donation-reports.md) — peržiūrėkite aukojimo tendencijas ir sumas
- [Aukų pažymos](../donations/giving-statements.md) — generuokite metines mokestines pažymas
- [Aukojimas](../../b1-church/giving/making-donations.md) — narių aukojimo patirtis B1.church svetainėje ir B1 programėlėje
