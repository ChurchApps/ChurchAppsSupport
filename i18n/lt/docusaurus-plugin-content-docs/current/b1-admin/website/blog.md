---
title: "Tinklaraštis"
---

# Tinklaraštis

<div class="article-intro">

Puslapis Tinklaraštis leidžia skelbti naujienas, atnaujinimus ir devocijas jūsų bažnyčios svetainėje. Įrašai rodomi kortelių sąraše adresu `/blog`, kiekvienas turi savo URL, o taip pat yra RSS kanale, kurį kiti įrankiai (pvz., Zapier) gali stebėti ir pastebėti naujus įrašus.

</div>

<div class="prereqs">
<h4>Prieš pradedant</h4>

- Užbaikite [Pradinį sąranką](initial-setup) savo svetainei
- Jei norite, kad lankytojai rastų tinklaraštį iš meniu, pridėkite navigacijos nuorodą į `/blog` per [Puslapių tvarkymas](managing-pages)

</div>

## Tinklaraščio atidarymas

1. B1 Admin programoje atidarykite [Greitojo šuolio meniu](../introduction.md#getting-around-with-the-jump-menu) (paieškos juostą viršutiniame kairiajame kampe) ir išskleiskite **Svetainė**.
2. Spustelėkite **Tinklaraštis**.
3. Puslapyje Tinklaraštis pateikiami visi įrašai kartu su jų būsena ir paskelbimo data.

## Naujo įrašo pridėjimas

1. Viršutiniame dešiniajame kampe spustelėkite **Pridėti įrašą**.
2. Įveskite **Pavadinimą**. Rašant automatiškai sugeneruojamas **Interneto adresas** (trumpinys), kurį, jei norite kitokio adreso, galite tiesiogiai redaguoti.
3. Pridėkite **Santrauką** – trumpą apibendrinimą, rodomą įrašų sąraše, meta aprašymuose ir RSS kanale. Jei jos nepaliksite tuščios, ji bus sugeneruota automatiškai iš įrašo turinio pradžios.
4. Įrašo tekstą parašykite **Turinio** redaktoriuje naudodami Markdown. Spustelėkite **Peržiūra**, kad pamatytumėte, kaip suformatuotas įrašas atrodys.
5. Pasirinkite **Kategoriją** (pasirinkite esamą arba įveskite naują) ir, jei norite, įveskite **Žymas**, atskirtas kableliais.
6. Spustelėkite **Pasirinkti nuotrauką**, kad išrinktumėte nuotrauką iš savo [Failų](files) galerijos, arba įkelkite naują. Įkeltos nuotraukos atsidaro įmontuotame kirpimo įrankyje, užrakintame 16:9 santykiu, todėl bet kurią nuotrauką galite pritaikyti įrašo antraštei ir kortelėms sąraše.
7. Nustatykite **Autorių** – pagal numatytuosius nustatymus tai esate jūs, bet galite ieškoti ir pasirinkti bet kurį asmenį savo duomenų bazėje.
8. Kai būsite pasiruošę viešinti įrašą, įjunkite **Paskelbta** ir nustatykite **Paskelbimo datą**. Jei paliksite išjungta, įrašas bus išsaugotas kaip juodraštis.

:::tip
Nustatykite ateities **Paskelbimo datą**, kad įrašą suplanuotumėte. Iki tos datos jis lankytojams nebus matomas, o Tinklaraščio sąraše rodys žymą **Suplanuota**.
:::

## Įrašų būsenos

Kiekvienas sąraše esantis įrašas rodo vieną iš trijų būsenų:

- **Juodraštis** – Nepaskelbta. Matoma tik administravimo sąsajoje.
- **Suplanuota** – Įjungta Paskelbta, bet paskelbimo data yra ateityje.
- **Paskelbta** – Matoma jūsų svetainėje ir įtraukta į RSS kanalą.

## Įrašų redagavimas, peržiūra ir trynimas

- Spustelėkite **Redaguoti** šalia įrašo, kad jį pakeistumėte.
- Spustelėkite **Peržiūrėti svetainėje** (rodoma paskelbtiems įrašams), kad atidarytumėte gyvą įrašą savo svetainėje naujame skirtuke.
- Spustelėkite **Ištrinti**, kad visam laikui pašalintumėte įrašą.

## Kaip lankytojai mato jūsų tinklaraštį

Paskelbti įrašai rodomi adresu `{yoursite}/blog`, po 10 vienam puslapiui, su nuorodomis **Senesni**/**Naujesni**, kad galėtumėte naršyti archyvą. Taip pat pateikiamas kategorijų filtras, o kiekvieno įrašo autorius ir nuotrauka matomi. Žymos rodomos kaip spustelėjami elementai, todėl lankytojai gali filtruoti sąrašą pagal žymas tokiu pačiu būdu. Atskiri įrašai pasiekiami adresu `{yoursite}/blog/{slug}` ir apima susijusius įrašus iš tos pačios kategorijos. Tinklaraščio puslapis taip pat publikuoja RSS kanalą, kurį skaitytuvai ir automatizavimo įrankiai, pavyzdžiui, Zapier, gali automatiškai aptikti.

:::info
Tinklaraščio įrašai yra atskiras turinio tipas, skirtingas nuo įprastų svetainės puslapių – jie nekuriami [puslapių redaktoriuje](page-editor) ir nerodomi Puslapių sąraše. Taip rašymas tinklaraštyje tampa greitesnis ir labiau sutelktas į tekstą.
:::

## Komentarų pridėjimas po įrašais

B1 pati nepriima tinklaraščio komentarų, tačiau galite pridėti komentarų paslaugą. Taip pat po kiekvienu įrašu galite įdėti bet ką kita, pavyzdžiui, naujienlaiškio prenumeratos formą ar aukojimo mygtuką.

1. Užsiregistruokite komentarų paslaugoje, pavyzdžiui, [Hyvor Talk](https://talk.hyvor.com), [FastComments](https://fastcomments.com) arba [Disqus](https://disqus.com), ir nukopijuokite jos įterpimo kodą.
2. Tinklaraščio puslapyje slinkite iki **Po kiekvienu įrašu**.
3. Įklijuokite įterpimo kodą ir spustelėkite **Išsaugoti**.

Kodas rodomas po kiekvienu paskelbtu įrašo turiniu. Jūsų komentarų paslauga tvarko moderavimą ir šlamšto filtravimą, todėl reguliariai tikrinkite jos valdymo skydelį.

:::tip
Ištuštinkite laukelį ir spustelėkite **Išsaugoti**, kad pašalintumėte kodą iš visų įrašų. Šį laukelį mato tik asmenys, galintys redaguoti bažnyčios nustatymus.
:::

## Kiti žingsniai

- [Puslapių tvarkymas](managing-pages) – pridėkite navigacijos nuorodą į savo tinklaraštį
- [Failai](files) – įkelkite nuotraukas, kurias naudosite savo įrašuose
- [Zapier integracija](../integrations/zapier.md) – paleiskite automatizacijas, kai paskelbiami nauji įrašai
