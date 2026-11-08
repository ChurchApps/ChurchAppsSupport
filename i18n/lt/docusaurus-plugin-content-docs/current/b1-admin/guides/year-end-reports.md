---
title: "Guide: Generuoti metinius aukų pažymas"
description: "B1 Admin sistemoje užbaikite metų aukų įrašus, patikrinkite fondų mokesčių nustatymus ir sugeneruokite mokesčių lengvatą suteikiančias aukų pažymas kiekvienam aukotojui."
---

# Metinių aukų pažymų generavimas

<div class="article-intro">

Peržiūrėkite metinį procesą: užbaikite aukų įrašus, patikrinkite fondų nustatymus ir sugeneruokite mokesčių lengvatą suteikiančias aukų pažymas kiekvienam aukotojui. Paprastai tai atliekama sausio pradžioje už praėjusius kalendorinius metus.

</div>

<div class="prereqs">
<h4>Prieš pradedant</h4>

- B1 Admin paskyra su prieiga prie finansų
- Aukos, įrašytos per metus (internetu per Stripe ir (arba) įvestos rankiniu būdu)
- Prieiga prie jūsų Stripe paskyros, jei priimate internetines aukas

</div>

## 1 veiksmas: importuokite paskutines Stripe operacijas

Įsitikinkite, kad visos metų pabaigos internetinės aukos yra jūsų sistemoje.

Vadovaukitės [Stripe importavimo](../donations/stripe-import.md) instrukcijomis, kad:

1. Eitumėte į Donations > Stripe Import
2. Pasirinktumėte datų intervalą, apimantį metų pabaigą (pvz., gruodžio 1 – gruodžio 31 d.)
3. Spustelėkite Preview, kad pirmiausia peržiūrėtumėte, tada Import Missing, kad užbaigtumėte

:::warning
Prieš generuodami pažymas, atlikite šį importavimą. Visos operacijos, kurių neimportavote, nebus rodomos aukotojų pažymose.
:::

## 2 veiksmas: peržiūrėkite aukų ataskaitas

Prieš generuodami pažymas, patikrinkite, ar įrašai teisingi.

Vadovaukitės [Aukų ataskaitų](../donations/donation-reports.md) instrukcijomis, kad:

1. Patikrintumėte visų metų aukų suvestinės puslapį
2. Peržiūrėtumėte sumas pagal fondą ir palygintumėte jas su banko išrašais, kad aptiktumėte neatitikimus
3. Prireikus spustelėtumėte atskiras partijas, kad patikrintumėte duomenis pagal aukotoją

## 3 veiksmas: patikrinkite fondų mokestinį statusą

Įsitikinkite, kad kiekvieno fondo nustatymas dėl mokesčių lengvatos yra teisingas, kad pažymos būtų tikslios.

Vadovaukitės [Fondų](../donations/funds.md) instrukcijomis, kad:

1. Atidarytumėte kiekvieną fondą ir patvirtintumėte, kad nustatymas dėl mokesčių lengvatos yra teisingas

:::info
Pažymose bus rodomos tik aukos fondams, pažymėtiems kaip mokesčių lengvatą suteikiantys. Jei fondas turėtų būti mokesčių lengvatą suteikiantis, bet taip nepažymėtas, prieš generuodami pažymas jį atnaujinkite.
:::

## 4 veiksmas: sugeneruokite aukų pažymas

Sukurkite oficialias aukotojams skirtas aukų pažymas.

Vadovaukitės [Aukų pažymų](../donations/giving-statements.md) instrukcijomis, kad:

1. Eitumėte į **Donations > Giving Statements**
2. Išskleidžiamajame sąraše pasirinktumėte metus ir peržiūrėtumėte suvestinės statistiką
3. Pasirinktumėte atsisiuntimo būdą:
   - **Download ZIP** — atskiri CSV failai, po vieną kiekvienam aukotojui
   - **Print All** — spausdinimui skirtas vaizdas, kiekviena pažyma atskirame puslapyje, viršuje su jūsų bažnyčios logotipu (jei įkėlėte)

:::tip
Generuokite pažymas sausio pradžioje, kol įrašai dar šviežūs. Tai suteiks laiko pastebėti problemas prieš siunčiant pažymas.
:::

## 5 veiksmas: pateikite pažymas aukotojams

Pasirūpinkite, kad pažymos pasiektų aukotojus.

1. Atspausdinkite ir išsiųskite pažymas paštu arba el. paštu išsiųskite atskirus CSV failus aukotojams
2. Nariai taip pat gali peržiūrėti savo aukų istoriją ir atsispausdinti pažymas [B1.church arba B1 App](../../b1-church/giving/donation-history.md) programėlėse

## Viskas atlikta!

Jūsų metinės aukų ataskaitos baigtos. Aukotojai gavo mokesčių lengvatą suteikiančias pažymas, o jūsų finansiniai įrašai už metus užbaigti.

## Susiję straipsniai

- [Stripe importavimas](../donations/stripe-import.md) — importuoti internetines operacijas
- [Aukų ataskaitos](../donations/donation-reports.md) — peržiūrėti aukojimo tendencijas ir sumas
- [Fondai](../donations/funds.md) — tvarkyti fondus ir mokesčių lengvatos nustatymus
- [Aukų pažymos](../donations/giving-statements.md) — generuoti metines pažymas
- [Aukų registravimas](../donations/recording-donations.md) — rankiniu būdu įvesti grynųjų ir čekių aukas
- [Aukų istorija (žiniatinklis)](../../b1-church/giving/donation-history.md) — savitarnos vaizdas nariams
- [Internetinių aukų nustatymo vadovas](./online-giving.md) — pradinis Stripe ir aukojimo nustatymas
