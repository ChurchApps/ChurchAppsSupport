---
title: "Vadovas: internetinių aukų nustatymas"
---

# Internetinių aukų nustatymas

<div class="article-intro">

Peržiūrėkite viską, ko reikia, kad bažnyčia galėtų priimti internetines aukas: nuo aukojimo fondų sukūrimo iki Stripe prijungimo mokėjimams apdoroti ir aukojimo puslapio bendrinimo su bendruomene. Baigę šiuos veiksmus, nariai galės aukoti per jūsų svetainę ir mobiliąją programėlę.

</div>

<div class="prereqs">
<h4>Prieš pradedant</h4>

- B1 Admin paskyra su administratoriaus teisėmis. Žr. [Vaidmenys ir leidimai](../people/roles-permissions.md)
- Stripe paskyra (jei reikia, nemokamai sukurkite ją adresu [stripe.com](https://stripe.com))

</div>

## 1 žingsnis: sukurkite aukojimo fondus

Fondai yra kategorijos, kurioms aukotojai gali aukoti. Kol nesukursite bent vieno fondo, negalėsite priimti aukų.

Vadovaudamiesi [Fondų](../donations/funds.md) vadovu, nustatykite aukojimo kategorijas:

1. Sukurkite dažniausiai naudojamus fondus (pvz., „Bendrasis fondas“, „Statybų fondas“, „Misijos“)
2. Tinkamai pažymėkite fondus, nuo kurių aukos atskaitomos nuo mokesčių. Tai turi įtakos metinėms aukojimo ataskaitoms.

:::tip
Fondus galite pridėti bet kada. Pradėkite nuo dažniausiai naudojamų aukojimo kategorijų.
:::

## 2 žingsnis: prijunkite Stripe

Stripe tvarko visus mokėjimus. Prijungsite savo Stripe paskyrą prie B1 Admin, kad aukos patektų į jūsų banko sąskaitą.

Vadovaudamiesi [Internetinio aukojimo nustatymo](../donations/online-giving-setup.md) vadovu, prijunkite Stripe:

1. Prisijunkite prie savo Stripe valdymo skydelio ir gaukite viešąjį raktą (Publishable Key) bei slaptąjį raktą (Secret Key)
2. B1 Admin eikite į Nustatymai ir įveskite abu raktus

:::warning
Stripe slaptąjį raktą rodo tik vieną kartą. Prieš išeidami iš Stripe valdymo skydelio, nukopijuokite jį ir išsaugokite. Jei jį pamestumėte, reikės sugeneruoti naują.
:::

## 3 žingsnis: pridėkite aukojimo puslapį prie savo svetainės

Padarykite aukojimą prieinamą, pridėdami aukojimo puslapį prie savo B1 svetainės.

Vadovaudamiesi [Internetinio aukojimo nustatymo](../donations/online-giving-setup.md) ir [Puslapių valdymo](../website/managing-pages.md) vadovais:

1. Pridėkite skirtuką „Aukoti“ prie savo B1.church svetainės
2. Jūsų aukojimo URL bus: `https://yoursubdomain.b1.church/donate`
3. Nariai gali aukoti neprisijungę (viešas puslapis) arba prisijungti, kad išsaugotų mokėjimo būdus ir matytų aukų istoriją

## 4 žingsnis: atlikite bandomąją auką

Prieš skelbdami bendruomenei, patikrinkite, ar viskas veikia.

1. Atlikite nedidelę bandomąją auką, kad patikrintumėte visą procesą nuo pradžios iki pabaigos
2. Patikrinkite, ar auka pasirodo B1 Admin skiltyje Aukos

:::tip
Jei norite patikrinti be tikrų mokėjimų, pirmiausia naudokite Stripe testavimo režimą, o prieš skelbdami bendruomenei perjunkite į tiesioginį (live) režimą.
:::

## 5 žingsnis: paskelbkite bendruomenei

Praneškite, kad nariai gali aukoti internetu.

1. Bendrinkite aukojimo URL per savo svetainę, el. pašto naujienlaiškius, biuletenius ir socialinius tinklus
2. Nariai taip pat gali aukoti per [B1 Mobile programėlę](../../b1-mobile/giving/). Aukojimo funkcija jau įtraukta į programėlę.

:::info
Prisijungę nariai gali išsaugoti mokėjimo būdus, nustatyti pasikartojančias aukas ir peržiūrėti savo aukojimo istoriją. Anoniminis aukojimas taip pat veikia, prisijungti nereikia.
:::

## 6 žingsnis: nuolatinis valdymas

Laikykite aukų įrašus atnaujintus ir generuokite ataskaitas visus metus.

1. Reguliariai (kas savaitę arba kas mėnesį) [importuokite Stripe operacijas](../donations/stripe-import.md), kad įrašai būtų atnaujinti
2. [Peržiūrėkite aukų ataskaitas](../donations/donation-reports.md), kad stebėtumėte aukojimo tendencijas ir sumas pagal fondą
3. [Sugeneruokite metinius aukojimo pažymėjimus](../donations/giving-statements.md) aukotojų mokesčių dokumentams

:::tip
Stripe importą vykdykite bent kartą per mėnesį, kad įrašai būtų atnaujinti. Visą metinį procesą rasite [Metinių ataskaitų vadove](./year-end-reports.md).
:::

## Viskas!

Jūsų bažnyčia dabar priima internetines aukas. Nariai gali aukoti per jūsų svetainę, B1 Mobile programėlę ar bet kurį įrenginį su naršykle. Visos aukos automatiškai registruojamos B1 Admin.

## Susiję straipsniai

- [Fondai](../donations/funds.md): kurkite ir tvarkykite aukojimo kategorijas
- [Paketai](../donations/batches.md): grupuokite aukas į paketus
- [Aukų įrašymas](../donations/recording-donations.md): rankiniu būdu įveskite grynųjų pinigų ir čekių aukas
- [Stripe importas](../donations/stripe-import.md): perkelkite internetines operacijas į B1 Admin
- [Aukų ataskaitos](../donations/donation-reports.md): peržiūrėkite aukojimo tendencijas ir sumas
- [Aukojimo pažymėjimai](../donations/giving-statements.md): generuokite metinius mokesčių pažymėjimus
- [Aukojimas (internetu)](../../b1-church/giving/making-donations.md): narių aukojimo patirtis
- [Aukojimas (mobiliesiems)](../../b1-mobile/giving/making-donations.md): aukojimas per mobiliąją programėlę
