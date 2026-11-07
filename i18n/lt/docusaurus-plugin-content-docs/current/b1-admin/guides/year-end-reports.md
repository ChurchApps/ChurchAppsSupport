---
title: "Guide: Generate Year-End Giving Reports"
description: "Baikite metų aukų įrašus B1 Admin, patikrinkite fondų mokesčių nustatymus ir sukurkite mokestinėms lengvatoms tinkančias pažymas visiems aukotojams."
---

# Generate Year-End Giving Reports

<div class="article-intro">

Pratęskite metų pabaigos procesą: patikslinkite savo aukų įrašus, patikrinkite fondų nustatymus ir sugeneruokite kiekvienam aukotojui mokesčių lengvatą turinčias aukojimo ataskaitas. Tai paprastai daroma ankstyvą sausį už praėjusius kalendorinius metus.

</div>

<div class="prereqs">
<h4>Prieš pradedant</h4>

- B1 Admin paskyra su prieiga prie finansų
- Aukos, įrašytos per visus metus (internetu per Stripe ir (arba) įvestos rankiniu būdu)
- Prieiga prie jūsų Stripe paskyros, jei priimate internetines aukas

</div>

## Step 1: Import Final Stripe Transactions

Įsitikinkite, kad visos metų pabaigos internetinės aukos yra jūsų sistemoje.

Vadovaukitės [Stripe importo](../donations/stripe-import.md) vadovu, kad:

1. Eitumėte į Donations > Stripe Import
2. Pasirinktumėte datų intervalą, apimantį metų pabaigą (pvz., gruodžio 1 – gruodžio 31)
3. Spustelėtumėte Preview, kad pirmiausia peržiūrėtumėte, tada Import Missing, kad baigtumėte

:::warning
Prieš generuodami ataskaitas, atlikite šį importą. Visos transakcijos, kurių neimportavote, nebus rodomos aukotojų ataskaitose.
:::

## Step 2: Review Donation Reports

Prieš generuodami ataskaitas, patikrinkite, ar jūsų įrašai teisingi.

Vadovaukitės [Aukų ataskaitų](../donations/donation-reports.md) vadovu, kad:

1. Patikrintumėte aukų suvestinės puslapį už visus metus
2. Peržiūrėtumėte sumas pagal fondą ir palygintumėte jas su banko išrašais, kad rastumėte neatitikimus
3. Prireikus spustelėtumėte atskiras partijas, kad patikrintumėte duomenis apie kiekvieną aukotoją

## Step 3: Verify Fund Tax Status

Įsitikinkite, kad kiekvieno fondo mokesčių lengvatos nustatymas yra teisingas, kad ataskaitos būtų tikslios.

Vadovaukitės [Fondų](../donations/funds.md) vadovu, kad:

1. Atidarytumėte kiekvieną fondą ir patvirtintumėte, kad nustatymas dėl mokesčių lengvatos yra teisingas

:::info
Aukų ataskaitose bus rodomos tik aukos fondams, pažymėtiems kaip turintiems mokesčių lengvatą. Jei fondas turėtų turėti mokesčių lengvatą, bet taip nepažymėtas, prieš generuodami ataskaitas atnaujinkite jį.
:::

## Step 4: Generate Giving Statements

Sukurkite oficialias aukojimo ataskaitas savo aukotojams.

Vadovaukitės [Aukojimo ataskaitų](../donations/giving-statements.md) vadovu, kad:

1. Eitumėte į **Donations > Giving Statements**
2. Iš išskleidžiamojo sąrašo pasirinktumėte metus ir peržiūrėtumėte suvestinės statistiką
3. Pasirinktumėte atsisiuntimo būdą:
   - **Download ZIP** — atskiri CSV failai, po vieną kiekvienam aukotojui
   - **Print All** — spausdinimui skirtas vaizdas, kiekviena ataskaita – naujame puslapyje, viršuje – jūsų bažnyčios logotipas (jei jį įkėlėte)

:::tip
Ataskaitas generuokite ankstyvą sausį, kol įrašai dar šviežūs. Tai suteiks laiko ištaisyti problemas prieš siunčiant jas paštu.
:::

## Step 5: Distribute to Donors

Pateikite ataskaitas aukotojams.

1. Atspausdinkite ir išsiųskite ataskaitas paštu arba elektroniniu paštu atsiųskite atskirus CSV failus aukotojams
2. Nariai taip pat gali peržiūrėti savo aukojimo istoriją ir spausdinti ataskaitas iš [B1.church](../../b1-church/giving/donation-history.md) ir [B1 Mobile programėlės](../../b1-mobile/giving/donation-history.md)

## You're Done!

Jūsų metų pabaigos aukojimo ataskaitos paruoštos. Aukotojai gavo mokesčių lengvatą turinčias ataskaitas, o jūsų finansiniai įrašai už metus užbaigti.

## Related Articles

- [Stripe importas](../donations/stripe-import.md) — importuoti internetines transakcijas
- [Aukų ataskaitos](../donations/donation-reports.md) — peržiūrėti aukojimo tendencijas ir sumas
- [Fondai](../donations/funds.md) — tvarkyti fondus ir mokesčių lengvatos nustatymus
- [Aukojimo ataskaitos](../donations/giving-statements.md) — generuoti metų pabaigos ataskaitas
- [Aukų įrašymas](../donations/recording-donations.md) — rankiniu būdu įvesti grynųjų pinigų ar čekių aukas
- [Aukų istorija (internetu)](../../b1-church/giving/donation-history.md) — narių savitarnos peržiūra
- [Internetinio aukojimo nustatymo vadovas](./online-giving.md) — pradinis Stripe ir aukojimo nustatymas
