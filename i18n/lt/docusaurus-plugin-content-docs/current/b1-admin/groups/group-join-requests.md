---
title: "Grupių prisijungimo prašymai"
description: "Peržiūrėkite ir tvirtinkite grupių prisijungimo užklausas B1 Admin, raskite laukiančias kaip vadovas ar administratorius ir nurodykite atmetimo priežastį."
---

# Grupių prisijungimo prašymai

<div class="article-intro">

Kai grupė sukonfigūruota su prisijungimo politika, reikalaujančia patvirtinimo, žmonės gali pateikti prašymus prisijungti. Grupių vadovai ir administratoriai peržiūri šiuos prašymus ir juos patvirtina arba atmeta. Taip bažnyčia išlaiko kontrolę nad grupių narystėmis, o žmonėms paprasta išreikšti norą prisijungti.

</div>

## Mokomasis vaizdo įrašas

<YouTube id="1vj-suCiIsE" title="Grupių prisijungimo prašymai ir grupių kalendoriai B1 sistemoje" next="Paslaugų ir lankomumo nustatymas B1 sistemoje" nextUrl="/docs/b1-admin/attendance/setup" />

<div class="prereqs">
<h4>Prieš pradedant</h4>

- Jums reikia leidimo valdyti grupes arba turėti konkrečios grupės vadovo vaidmenį. Išsamesnės informacijos rasite [Vaidmenys ir leidimai](../people/roles-permissions.md).
- Grupės prisijungimo politika turi būti nustatyta į **Prašymas** (reikia patvirtinimo). Kaip sukonfigūruoti prisijungimo politiką, žr. [Grupių kūrimas](./creating-groups.md).

</div>

## Prisijungimo politikų supratimas

Grupės gali turėti tris skirtingas prisijungimo politikas:

- **Atvira** -- Bet kas gali prisijungti iš karto, be patvirtinimo
- **Prašymas** -- Žmonės pateikia prisijungimo prašymą, kuriam reikia patvirtinimo
- **Uždara** -- Niekas negali prašyti prisijungti (nariai turi būti pridedami rankiniu būdu)

Kai grupė naudoja **Prašymo** politiką, visi prisijungimo bandymai eina per šiame puslapyje aprašytą patvirtinimo eigą.

## Laukiančių prašymų peržiūra

### Grupių vadovams

1. B1 Admin sistemoje atidarykite [Greitojo šuolio meniu](../introduction.md#getting-around-with-the-jump-menu) ir pasirinkite **People > Groups** (Žmonės > Grupės)
2. Spustelėkite grupės pavadinimą
3. Skiltyje **Members** (Nariai) nurodyta, kiek prašymų laukia. Spustelėkite **All members** (Visi nariai) -- šios grupės laukiantys prašymai rodomi narių sąrašo viršuje

### Administratoriams

Administratoriai, turintys grupių valdymo leidimus, gali peržiūrėti laukiančius prašymus visose grupėse:

1. Greitojo šuolio meniu pasirinkite **People > Groups** (Žmonės > Grupės)
2. Puslapio antraštėje spustelėkite mygtuką **pending requests** (laukiantys prašymai) (pavyzdžiui, „3 pending requests“). Jis rodomas tik tada, kai yra laukiančių prašymų.
3. Peržiūrėkite visus laukiančius prašymus visoje bažnyčioje

## Prisijungimo prašymo peržiūra

Kiekviename prisijungimo prašyme rodoma:

- **Asmens vardas ir nuotrauka** -- Asmuo, prašantis prisijungti
- **Neprivalomas pranešimas** -- Asmeninis pranešimas, paaiškinantis, kodėl norima prisijungti (jei pateiktas)
- **Prašymo data** -- Kada prašymas buvo pateiktas

Norėdami peržiūrėti prašymą:

1. Perskaitykite asmens pranešimą, jei jis buvo pateiktas
2. Prireikus spustelėkite asmens vardą, kad peržiūrėtumėte jo profilį
3. Nuspręskite, ar patvirtinti, ar atmesti

## Prašymo patvirtinimas

1. Spustelėkite **Approve** (Patvirtinti) prie prisijungimo prašymo
2. Asmuo iš karto pridedamas prie grupės kaip narys
3. Prašymą pateikęs asmuo gauna pranešimą, kad jo prašymas patvirtintas
4. Prašymas sistemoje pažymimas kaip patvirtintas

:::tip
Patvirtinus prašymą, asmuo tampa įprastu grupės nariu. Vėliau, prireikus, galite paskirti jį grupės vadovu puslapyje [Grupės nariai](./group-members.md).
:::

## Prašymo atmetimas

1. Spustelėkite **Decline** (Atmesti) prie prisijungimo prašymo
2. Neprivalomai nurodykite atmetimo priežastį (iki 500 simbolių)
3. Spustelėkite **Confirm** (Patvirtinti)
4. Prašymą pateikęs asmuo gauna pranešimą su jūsų nurodyta atmetimo priežastimi (jei ją nurodėte)
5. Prašymas sistemoje pažymimas kaip atmestas

:::info
Atmetimo priežasties nurodymas padeda asmeniui suprasti, kodėl jo prašymas nepatvirtintas, ir gali paskatinti jį bandyti vėliau arba pasirinkti kitas grupes.
:::

## Patvirtinimas iš užduočių puslapio

Kiekvienas prisijungimo prašymas taip pat sukuria užduotį skiltyje **Serving &rarr; My Work** (Tarnystė &rarr; Mano darbas), pavadinimu „*Asmuo* pateikė prašymą prisijungti prie *Grupė*.“ Ji priskiriama grupės vadovams. Jei grupė dar neturi vadovo, ji skiriama bet kuriam darbuotojui, turinčiam leidimą **Group Members &gt; Edit** (Grupės nariai &gt; Redaguoti), o jei tokio leidimo niekas neturi -- jūsų bažnyčios domeno administratoriams. Darbuotojai ir administratoriai, gavę šią užduotį, taip pat gauna pranešimą, kuris tiesiogiai nuveda į ją.

Atidarius užduotį, rodomas prašymą pateikusio asmens vardas, grupė ir jo neprivalomas pranešimas, o tiesiogiai užduoties kortelėje yra mygtukai **Approve** (Patvirtinti) ir **Decline** (Atmesti). (Mygtukas Decline atveria tą patį neprivalomo priežasties lauką, aprašytą aukščiau.) Taip vadovai turi antrą, pranešimais paremtą būdą tvarkyti prašymą nebeatidarydami grupės narių sąrašo.

Priėmus sprendimą dėl prašymo bet kurioje vietoje -- grupės narių sąraše arba jos užduočių kortelėje -- prašymas uždaromas visur, todėl vadovai niekada nemato pasenusios užduoties dėl jau išspręsto prašymo.

## Pranešimai

Prisijungimo prašymų sistema automatiškai siunčia pranešimus:

- **Kai prašymas pateiktas** -- Visi grupių vadovai gauna pranešimą. Jei grupė neturi vadovo, vietoj jų pranešama darbuotojams arba administratoriams, kuriems priskirta užduotis (žr. aukščiau).
- **Kai prašymas patvirtintas** -- Prašymą pateikęs asmuo gauna patvirtinimą
- **Kai prašymas atmestas** -- Prašymą pateikęs asmuo gauna pranešimą su atmetimo priežastimi (jei ji nurodyta)

Pranešimai rodomi naudotojo pranešimų centre B1.church svetainėje ir mobiliojoje programėlėje. B1 Admin pranešimų varpelyje spustelėjus prisijungimo prašymo pranešimą (arba jo **View Details** (Peržiūrėti išsamiai)) grupė atidaroma naujame skirtuke jūsų bažnyčios B1.church svetainėje.

## Prašymų valdymas iš asmens pusės

Asmenys gali valdyti savo prisijungimo prašymus B1.church svetainėje:

- Peržiūrėti savo laukiančių prašymų būseną grupės informacijos puslapyje
- Atšaukti laukiantį prašymą, jei apsigalvojo
- Sužinoti, ar jų prašymas buvo patvirtintas, ar atmestas

## Geriausia praktika

- **Reaguokite greitai** -- Stenkitės peržiūrėti prašymus per 24–48 valandas, kad žmonės nelaukтų be reikalo
- **Būkite aiškūs atmetimo priežastyse** -- Padėkite žmonėms suprasti tolesnius žingsnius ar alternatyvas
- **Tikrinkite profilius** -- Peržiūrėkite asmens profilį, kad įsitikintumėte, ar jis tinka grupei
- **Aiškiai nurodykite lūkesčius** -- Įsitikinkite, kad grupės aprašyme aiškiai nurodyta, kam skirta grupė

## Susiję straipsniai

- [Grupių kūrimas](./creating-groups.md) -- Sužinokite, kaip sukurti grupes ir sukonfigūruoti prisijungimo politikas
- [Grupės nariai](./group-members.md) -- Tvarkykite esamus grupės narius
- [Grupės kalendorius](./group-calendar.md) -- Planuokite grupės susitikimus ir renginius
