---
title: "Stripe importas"
---

# Stripe importas

<div class="article-intro">

Jei priimate internetines aukas per Stripe, Stripe importo įrankis leidžia perkelti tas operacijas į B1 Admin, kad visi jūsų aukų duomenys būtų vienoje vietoje. Tai ypač naudinga norint surasti operacijas, kurios nebuvo automatiškai sinchronizuotos.

</div>

<div class="prereqs">
<h4>Prieš pradedant</h4>

- Atlikite [Internetinių aukų nustatymą](online-giving-setup.md), kad prijungtumėte savo Stripe paskyrą prie B1 Admin. Meniu punktas **Stripe importas** ir mygtukas Partijų puslapyje rodomi tik tada, kai jūsų bažnyčios aukų vartai yra Stripe, ir tik asmenims, kurie gali redaguoti aukas
- Įsitikinkite, kad jūsų Stripe valdymo skydelyje yra aukų už laikotarpį, kurį norite importuoti

</div>

## Kaip tai veikia

Importavimo procesas vyksta dviem etapais: pirmiausia peržiūrite, ką būtų importuota, o tada patvirtinate importavimą. Šis bandomasis režimas leidžia viską peržiūrėti prieš sukuriant bet kokius duomenis.

## Operacijų importavimas

1. Programoje **B1 Admin** eikite į **Aukos > Stripe importas**. (Taip pat galite spustelėti **Importuoti trūkstamas Stripe operacijas** viršuje **Partijos** puslapyje.)
2. Atsidaro **Stripe importas** puslapis.
3. Pasirinkite **datos intervalą** operacijoms, kurias norite importuoti.
4. Spustelėkite **Peržiūra**, kad paleistumėte bandomąjį patikrinimą.

## Peržiūros nagrinėjimas

Peržiūroje rodoma kiekviena Stripe operacija su būsenos žymeniu:

- **Nauja** -- ši operacija dar neimportuota ir bus įtraukta, jei tęsite.
- **Jau importuota** -- ši operacija jau yra B1 Admin ir bus praleista.
- **Praleista** -- ši operacija buvo neįtraukta dėl kitos priežasties (pvz., grąžinimas arba nepavykęs mokėjimas).

Viršuje esanti santrauka rodo bendrą operacijų skaičių kiekvienoje kategorijoje ir susijusias sumas.

:::info
Peržiūros etapas nekuria jokių įrašų. Tai tik skaitymo patikrinimas, kad galėtumėte prieš patvirtinant pamatyti, kas įvyks.
:::

## Importavimo užbaigimas

1. Peržiūrėkite peržiūros rezultatus ir santraukos sumas.
2. Spustelėkite **Importuoti trūkstamas**, kad importuotumėte visas operacijas, pažymėtas kaip **Nauja**.
3. Baigus importavimą, būsenos žymenys šalia kiekvienos operacijos atsinaujina ir parodo rezultatą.

## Patarimai naudojant Stripe importą

- Importuokite reguliariai (kas savaitę arba kas mėnesį), kad įrašai būtų atnaujinti.
- Jei operacija rodoma kaip **Jau importuota**, tai reiškia, kad B1 Admin jau turi atitinkamą įrašą -- jokių veiksmų nereikia.
- Naudokite datos intervalo filtrą, kad sutelktumėte dėmesį į konkretų laikotarpį, jei ieškote tam tikrų operacijų.

:::tip
Baigę importavimą, apsilankykite [Partijos](batches.md) puslapyje, kad patikrintumėte, ar importuotos aukos rodomos teisingai ir sumos sutampa su tuo, ką matote savo Stripe valdymo skydelyje.
:::

## Kiti žingsniai

- Peržiūrėkite [Aukų ataskaitas](donation-reports.md), kad galėtumėte palyginti importuotas operacijas su kitais aukų duomenimis
- Įsitikinkite, kad importuotos aukos priskirtos teisingiems [fondams](funds.md), kad [aukų pažymos](giving-statements.md) būtų tikslios
