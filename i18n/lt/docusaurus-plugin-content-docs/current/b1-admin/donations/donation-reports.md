---
title: "Aukų ataskaitos"
---

# Aukų ataskaitos

<div class="article-intro">

B1 Admin suteikia keletą būdų peržiūrėti ir analizuoti jūsų bažnyčios aukų duomenis. Aukų valdymo skydelis **Summary** puslapyje pateikia vaizdinę apžvalgą su diagramomis ir filtrais, o skiltyje Reports galite rasti išsamesnę **Donation Summary** ataskaitą. Naudokite šias priemones aukojimo tendencijoms sekti, pasiruošti valdybos susirinkimams ar suderinti savo įrašus.

</div>

<div class="prereqs">
<h4>Prieš pradedant</h4>

- Įsitikinkite, kad aukos buvo [įrašytos paketais](recording-donations.md) arba [importuotos iš Stripe](stripe-import.md)
- Patikrinkite, ar jūsų [fondai](funds.md) nustatyti teisingai, kad aukos būtų tinkamai priskirtos kategorijoms

</div>

## Aukų valdymo skydelis

Aukų valdymo skydelis yra **Dashboard** rodinys **Summary** puslapyje – tai pirmasis puslapis, kurį matote atidarę skiltį **Donations**.

1. Atidarykite [Jump meniu](../introduction.md#getting-around-with-the-jump-menu) (paieškos laukas viršutiniame kairiajame B1 Admin kampe), išskleiskite **Donations** ir spustelėkite **Summary**. Puslapis **Summary** atsidarys **Dashboard** rodinyje. Viršutiniame dešiniajame kampe esantis **View** perjungiklis leidžia pereiti tarp **Dashboard** ir **Lapsed Givers**.
2. Naudokite virš ataskaitos esantį perjungiklį **Weekly**, **Monthly** ar **Quarterly**, kad pasirinktumėte, kaip grupuoti aukas.
3. Skydelyje **Filter Report** nustatykite **Start Date** ir **End Date** (pagal numatytuosius nustatymus – nuo praėjusių metų iki vakar), o pasirinktinai – **Fund**, tada spustelėkite **Run Report**. Atidarius puslapį ataskaita paleidžiama automatiškai su numatytosiomis reikšmėmis.
4. Keturios **KPI** kortelės rodo jūsų aukų rodiklius pasirinktam laikotarpiui:
   - **Total Giving** -- bendra paaukota suma.
   - **Average Gift** -- vidutinė aukos suma.
   - **Unique Donors** -- skirtingų asmenų, kurie aukojo, skaičius.
   - **Total Donations** -- atskirų aukų bendras skaičius.
5. Po KPI rodikliais stulpelinė diagrama rodo aukas pagal savaitę, mėnesį ar ketvirtį, suskirstytas pagal fondą.
6. Spustelėkite **Download Options** ir pasirinkite **Summary**, kad eksportuotumėte CSV failą su sumomis pagal laikotarpį ir fondą, arba spustelėkite spausdinimo piktogramą, kad atspausdintumėte ataskaitą. Jūsų bažnyčios logotipas (**Light Background Logo** iš [Website > Appearance](../website/appearance.md), jei jį įkėlėte) ir pavadinimas spausdintos ataskaitos viršuje rodomi centre. Spaudinyje naudojamas tamsus tekstas ir šviesi diagrama, net jei B1 Admin naudojate tamsiajame režime.

Jei laikotarpiu aukos buvo gautos keliomis valiutomis, KPI sumos konvertuojamos į jūsų bažnyčios valiutą, o po kortelėmis pasirodo pastaba **Converted at current exchange rates**. Išsamesnės informacijos rasite skyriuje [Daugiavaliutė palaikymas](./multi-currency.md#converted-totals).

:::info
Valdymo skydelyje rodomi bendri aukų duomenys. Aukotojų vardai juose nerodomi. Išsamiai informacijai apie kiekvieno aukotojo aukas naudokite puslapį [Batches](batches.md).
:::

## Nebeaukojantys aukotojai

Pasirinkite **Lapsed Givers** perjungiklyje **View**, kad pamatytumėte asmenis, kurie aukojo tam tikru laikotarpiu, bet nuo tada nebeaukojo. Pagal numatytuosius nustatymus lyginami praėjusieji kalendoriniai metai su šiais metais iki šios dienos. Norėdami išplėsti ar susiaurinti paiešką, pakeiskite bet kurią datų sritį. Kiekvienoje eilutėje rodomas asmuo, jo paskutinės aukos data ir jo suma ankstesniu laikotarpiu. Pasirinkus **Download Options > Summary**, sąrašas atsisiunčiamas CSV formatu, kad galėtumėte jį naudoti laiškams ar skambučiams.

## Išsamesnė informacija apie aukotojus

Norėdami sužinoti, kas aukojo, kiek ir kuriam fondui:

1. Eikite į **Donations > Batches**.
2. Spustelėkite **batch name**, kad jį atidarytumėte.
3. Paketo informacijos puslapyje išvardytos kiekvienos aukos detalės: būdas (ir čekio numeris ar kortelės paskutiniai skaitmenys), aukotojo vardas, data, pastabos ir suma. Apačioje rodoma bendra suma.
4. Spustelėkite **Edit** prie aukos eilutės, kad atidarytumėte visą tos aukos informaciją, įskaitant jos fondą.
5. Spustelėkite **Export** virš sąrašo, kad atsisiųstumėte CSV failą su visa aukotojo ir aukos informacija už tą paketą.

## Aukų suvestinės ataskaita

Aukų ataskaitų funkcija yra tiesiogiai įdiegta skiltyje Donations – Summary puslapis yra jūsų aukų suvestinės ataskaita:

1. Jump meniu pasirinkite **Donations > Summary**.
2. **Dashboard** rodinyje nustatykite **Start Date** ir **End Date** skydelyje **Filter Report** ir spustelėkite **Run Report**.
3. Spustelėkite **Download Options** ir pasirinkite **Summary**, kad ataskaitą eksportuotumėte kaip CSV failą.

## Duomenų eksportavimas

Aukų duomenis galite eksportuoti iš kelių vietų:

- **Summary puslapis** -- atsisiųskite CSV failą su aukų sumomis pagal savaitę, mėnesį ar ketvirtį ir fondą
- **Paketo informacijos puslapis** -- atsisiųskite CSV failą su atskiromis aukomis ir aukotojų duomenimis
- **Fondo informacijos puslapis** -- atsisiųskite konkretaus fondo aukų istoriją

:::tip
Metų pabaigos ataskaitoms sujunkite Summary puslapio eksportą su įrankiu [Giving Statements](giving-statements.md), kad gautumėte ir bendras tendencijas, ir atskirų aukotojų pažymas.
:::

## Kiti žingsniai

- Metų pabaigoje sugeneruokite [Giving Statements](giving-statements.md) savo aukotojams
- Peržiūrėkite atskirus [paketus](batches.md), kad patikrintumėte aukų informaciją
- Patikrinkite [fondų](funds.md) informacijos puslapius, kad pamatytumėte aukų suskirstymą pagal kategorijas
