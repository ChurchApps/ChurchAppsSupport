---
title: "Dokončení prijímania"
description: "Dokončite prijatie rodiny na kiosku v aplikácii B1 Checkin vrátane limitov miestností, tlače štítkov, bezpečnostných kódov pre vyzdvihnutie a toho, čo aplikácia urobí ďalej."
---

Ten výstup nie je správny, pretože som zvolil nesprávny jazyk. Úloha vyžaduje litovčinu (`lt`), nie slovenčinu. Tu je správny preklad:

---
title: "Baigiamas registravimas"
description: "Užbaikite šeimos registravimą kiosko režimu B1 Checkin programėlėje, įskaitant patalpų limitus, etikečių spausdinimą, saugumo kodus atsiimant vaikus ir tai, ką programėlė daro toliau."
---

# Baigiamas registravimas

<div class="article-intro">

Kai peržiūrėsite savo namų ūkį ir prireikus priskirsite grupes, galite baigti registravimą. Tai paskutinis kiosko darbo eigos žingsnis – programėlė pateikia lankomumo duomenis, spausdina etiketes ir paruošia ekraną kitai šeimai.

</div>

<div class="prereqs">
<h4>Prieš pradedant</h4>

- [Peržiūrėkite savo namų ūkį](./household-review.md) namų ūkio peržiūros ekrane
- [Priskirkite grupes](./group-assignment.md) šeimos nariams, kuriems reikia registruotis į konkrečią klasę ar programą
- Pasirinktinai [pridėkite svečius](./adding-guests.md), kurie lankosi kartu su jūsų šeima

</div>

## Kaip registruotis

1. Namų ūkio peržiūros ekrane palieskite mygtuką **Check-in** ekrano apačioje.
2. Programėlė perduoda lankomumo duomenis serveriui ir parodo **sėkmės ekraną** su žaliu varnelės ženklu ir sveikinimo žinute.

Viskas. Jūsų šeimos lankomumas užfiksuotas.

Jei kas nors iš pasirinktų asmenų jau šiandien užsiregistravo šioms pamaldoms, pirmiausia atsidaro langas **Already Checked In**, kuriame nurodomi tie asmenys. Palieskite **Check In Again**, kad išsaugotumėte naujus grupių pasirinkimus, arba **Cancel**, kad grįžtumėte į namų ūkio ekraną.

## Pilnos patalpos ir savanorių santykis

Jei jūsų bažnyčia nustatė [saugumo limitus](../../b1-admin/attendance/checkin-safety.md) savo patalpoms, serveris juos patikrina prieš išsaugodamas:

- Jei pasirinkta patalpa **pilna arba uždaryta**, registravimas neįvyksta, o programėlė nurodo patalpą, kad galėtumėte pasirinkti kitą.
- Jei pamaldų laikas turi [registravimo tvarkaraštį](../../b1-admin/attendance/setup.md#setting-a-check-in-schedule) ir jo registravimo langas šiuo metu neatidarytas, registravimas į to pamaldų laiko patalpas taip pat atmetamas. Ekrane **Can't check in yet** nurodoma patalpa ir priežastis „check-in isn't open right now“; palieskite **Change Rooms**, kad pasirinktumėte kitą pamaldų laiką ar grupę. (Jau pasibaigę pamaldų laikai [namų ūkio ekrane](./household-review.md) rodomi kaip **Closed** ir negali būti pasirinkti, todėl šį pranešimą paprastai matysite tik tada, jei langas užsidaro registravimo metu.)
- Namų ūkis, kuris anksčiau registravosi ankstesniam pamaldų laikui, gali vėliau grįžti ir pridėti atvirą pamaldų laiką, net jei ankstesnis langas jau uždarytas. Jų esami registravimai išsaugomi ir neužkerta kelio naujam registravimui.
- Jei vaikų patalpoje trūksta savanorių pagal nustatytą santykį, programėlė arba parodo įspėjimą, kurį darbuotojas gali patvirtinti norėdamas tęsti, arba visiškai blokuoja registravimą – priklausomai nuo to, kaip jūsų bažnyčia sukonfigūravo santykio taikymą.

## Etikečių spausdinimas

Jei sukonfigūruotas tinklo spausdintuvas, programėlė po registravimo automatiškai atspausdina etiketes:

- **Vardo etiketės** spausdinamos kiekvienam asmeniui, priskirtam grupei, kurioje įjungtas nustatymas **Print Nametag**. Vardo etiketėse nurodomas asmens vardas, grupės priskyrimas ir alergijos ar pastabų informacija, jei tokia įrašyta.
- **Tėvų atsiėmimo lapeliai** spausdinami, kai bet kuris užsiregistravęs asmuo yra grupėje, kurioje įjungtas nustatymas **Parent Pickup**. Asmenys, užsiregistravę kaip **Volunteer**, praleidžiami, todėl vaikų priežiūros darbuotojas, dirbantis kambaryje su Parent Pickup, lapelio negauna. Atsiėmimo lapelyje nurodomi vaikai, jų grupės ir unikalus **4 simbolių saugumo kodas**.

:::info
Tas pats saugumo kodas nurodomas ir vaiko vardo etiketėje, ir tėvų atsiėmimo lapelyje. Atsiimant vaikus savanoriai sutikrina kodus, kad įsitikintų, jog kiekvieną vaiką atsiima tinkamas suaugęs asmuo.
:::

Saugumo kodas generuojamas iš naujo kiekvienam registravimui ir naudoja tik priebalses bei skaitmenis (balsės neįtraukiamos, kad nesusidarytų netinkami žodžiai).

:::warning
Jei etiketės nespausdinamos, atverkite administratoriaus nustatymus palietę **bažnyčios logotipą** septynis kartus, tada palieskite **Change Printer**, kad patikrintumėte spausdintuvo ryšį. Trikčių šalinimo veiksmus rasite skyriuje [Spausdintuvo nustatymas](../getting-started/printer-setup.md).
:::

## Kas vyksta po registravimo

- Jei spausdintuvas sukonfigūruotas, programėlė atspausdina visas etiketes ir tada automatiškai grįžta į **paieškos ekraną**, paruoštą kitai šeimai.
- Jei spausdintuvas nesukonfigūruotas, programėlė taip pat automatiškai grįžta į **paieškos ekraną**.

Bet kuriuo atveju sėkmės ekranas rodomas bent 6 sekundes nuo jo atsiradimo (8 sekundes, kai švenčiamas kieno nors lankomumo etapas), kad šeimos matytų, jog registravimas pavyko. Jei spausdinimas trunka ilgiau, programėlė grįžta maždaug per pusantros sekundės po spausdinimo pabaigos.

Norėdami grįžti į paieškos ekraną, nieko spausti nereikia – programėlė perėjimą atlieka automatiškai. Kai ekranas jau kurį laiką rodomas, galite jį palieti, kad grįžtumėte iš karto; palietimas per pirmąsias pusantros sekundės ignoruojamas, todėl greitas dvigubas paspaudimas ant **Check-in** nepraleis ekrano.

:::tip
Po kiekvieno registravimo programėlė visiškai atsistato, todėl nekyla rizikos, kad viena šeima pamatys kitos šeimos informaciją.
:::

## Kas įrašoma

Kai palietete **Check-in**, programėlė serveriui kiekvienam namų ūkio nariui, turinčiam grupės priskyrimą, išsiunčia:

- **asmenį**, kuris registruojamas
- **pamaldas**, kuriose jis dalyvauja
- **pamaldų laiką** ir **grupę**, kuriai jis priskirtas

Šie duomenys rodomi B1 Admin programoje skyriuje Attendance, kur bažnyčios administratoriai gali peržiūrėti ir tvarkyti lankomumo įrašus. Išsamios informacijos ieškokite [registravimo administravimo vadove](../../b1-admin/attendance/check-in.md).
