---
title: "Dizaineris: registracijos etikečių dizainas"
---

# Dizaineris: registracijos etikečių dizainas

<div class="article-intro">

Etikečių dizaineris leidžia kurti ir tinkinti vardelių bei atsiėmimo lapelių šablonus, kurie spausdinami, kai šeimos registruoja savo vaikus. Galite tiksliai nustatyti, kokia informacija rodoma kiekvienoje etiketėje, kur ji išdėstyta ir kaip atrodo.

</div>

<div class="prereqs">
<h4>Prieš pradedant</h4>

- Nustatykite [Lankomumą](setup) ir sukonfigūruokite bent vieną pamaldų laiką su įjungta registracija
- Nustatykite [Registraciją](check-in), kad etiketės būtų spausdinamos
- Jums reikalinga administratoriaus prieiga prie Lankomumo skilties

</div>

## Dizainerio atidarymas

B1 Admin programoje atidarykite [Greito perėjimo meniu](../introduction.md#getting-around-with-the-jump-menu) (paieškos juosta viršutiniame kairiajame kampe), išskleiskite **Mobile** ir spustelėkite **B1 CheckIn**. Tada spustelėkite mygtuką **Design Labels** kortelėje Check-in Labels. Pamatysite išsaugotų etikečių šablonų sąrašą, suskirstytą pagal tipą: **Nametag** ir **Pickup Slip**.

## Etikečių tipai

- **Nametag** — spausdinama ir pritvirtinama prie vaiko. Paprastai apima vaiko vardą, jo klasę ar sesiją ir saugumo kodą.
- **Pickup Slip** — atiduodama tėvams ar globėjams. Paprastai apima saugumo kodą ir vaikų, kuriuos jie užregistravo, sąrašą.

B1 pradeda su numatytuoju vardelio ir numatytuoju atsiėmimo lapelio šablonu, pritaikytais standartinėms 3,5 × 1,1 colio terminėms etiketėms.

## Etikečių šablono kūrimas

1. Spustelėkite **Add** ir meniu pasirinkite pradinį variantą: **Nametag 3.5" x 1.1"**, **Pickup Slip 3.5" x 1.1"** arba **Blank**.
2. Naujas šablonas atsidaro etikečių redaktoriuje.

### Etikečių redaktorius

Redaktoriuje rodoma etiketės peržiūra, pamasštabuota pagal nustatytą dydį. Kairiajame skydelyje galite konfigūruoti:

- **Name** — šablono pavadinimas (tik jūsų patogumui)
- **Label Type** — Nametag arba Pickup Slip
- **Width / Height** — etiketės dydis coliais

### Blokų pridėjimas

Etiketė sudaroma iš blokų — atskirų turinio elementų, išdėstytų etiketės drobėje. Spustelėkite **Add Block**, kad įterptumėte naują bloką, ir pasirinkite jo tipą:

- **Field** — spausdinimo metu įtraukia duomenų reikšmę:
  - `person.displayName` — asmens vardas ir pavardė
  - `sessions` — pamaldos ar klasė, į kurią asmuo užsiregistravo
  - `securityCode` — atsitiktinai sugeneruotas atsiėmimo saugumo kodas
  - `children` — vaikų sąrašas (atsiėmimo lapeliams)
  - `person.nametagNotes` — bet kokios specialios asmens įrašo pastabos
  - `person.isBirthdayWeek` — reikšmė „true“, jei asmens gimtadienis (mėnuo ir diena) patenka į 3 dienas prieš ar po registracijos datos
  - `campus` — filialo pavadinimas
- **Text** — jūsų įvedamas statinis tekstas (antraštėms, žymoms ar nurodymams)
- **Barcode** — brūkšninis kodas, koduojantis saugumo kodą

### Blokų išdėstymas

Kiekvienas blokas turi laukus **X**, **Y**, **Width** ir **Height**, išreikštus procentais nuo etiketės drobės (0–100). Pakoreguokite juos, kad tiksliai išdėstytumėte turinį. Taip pat galite nustatyti:

- **Font Size** — teksto dydis taškais
- **Bold** — įjungti ar išjungti paryškintą tekstą
- **Align** — teksto lygiavimas: kairėje, centre ar dešinėje
- **Condition** — neprivaloma: paslėpti bloką, jei laukas tuščias (pavyzdžiui, rodyti `person.nametagNotes` tik tada, kai jame yra reikšmė). Tai taip pat veikia su `person.isBirthdayWeek`, leidžiant rodyti gimtadienio grafiką ar tekstą tik ant vardelių vaikams, kurių gimtadienis yra artimiausiomis dienomis iki registracijos ar po jos.

### Išsaugojimas

Spustelėkite **Save**, kad išsaugotumėte šabloną. Atnaujintas šablonas bus naudojamas kitą kartą spausdinant etiketes B1 Checkin programoje.

## Šablonų perrikiavimas

Jei turite kelis vardelių ar atsiėmimo lapelių šablonus, B1 Checkin pagal numatymą naudos pirmąjį sąraše esantį šabloną. Norėdami pakeisti eilės tvarką, tempkite šablonus.

## Šablono ištrynimas

Spustelėkite šiukšliadėžės piktogramą bet kurioje šablono eilutėje ir patvirtinkite. Ištrynus paskutinį tam tikro tipo šabloną, atkuriamas numatytasis įmontuotas šablonas.

:::tip
Po šablono redagavimo atspausdinkite bandomąjį egzempliorių, kad prieš kitas pamaldas įsitikintumėte, jog išdėstymas atrodo teisingai.
:::

## Susiję straipsniai

- [Registracijos sąranka](setup) — pamaldų ir grupių konfigūravimas registracijai
- [Registracijos užbaigimas](check-in) — šeimų registracijos eiga
- [B1 Checkin pradžia](../../b1-checkin/getting-started/) — Checkin kioskų programa
