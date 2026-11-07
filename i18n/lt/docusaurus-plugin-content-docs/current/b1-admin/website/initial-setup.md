---
title: "Pradinis nustatymas"
---

# Pradinis nustatymas

<div class="article-intro">

Kiekviena B1 paskyra turi paruoštą svetainę. Šiame vadove rasite, kaip nustatyti savo bažnyčios domeną, sukonfigūruoti svetainės išvaizdą, sukurti pirmuosius puslapius ir sutvarkyti navigaciją.

</div>

<div class="prereqs">
<h4>Prieš pradedant</h4>

- Jums reikia B1.church paskyros su administratoriaus teisėmis
- Jei naudojate savo domeną, paruoškite DNS teikėjo prisijungimo duomenis (pvz., GoDaddy, Cloudflare arba AWS)
- Geriausiems rezultatams paruoškite bažnyčios logotipą PNG formatu su permatomu fonu

</div>

## Savo domeno nustatymas

Jūsų bažnyčia automatiškai gauna subdomeną B1.church (pavyzdžiui, `yourchurch.b1.church`). Taip pat galite nukreipti savo domeną į B1 svetainę.

1. Eikite į **B1.church Admin** apsilankę admin.b1.church arba spustelėdami profilio išskleidžiamąjį sąrašą ir pasirinkdami **Switch App**.
2. Atidarykite [Jump meniu](../introduction.md#getting-around-with-the-jump-menu) (paieškos laukas viršuje kairėje), išskleiskite **Settings** ir spustelėkite **Settings**.
3. Atidarykite skyrių **Church Information**, kad pamatytumėte savo subdomeną. Nustatykite trumpą ir lengvai atpažįstamą pavadinimą be tarpų.
4. Norėdami naudoti savo domeną, prisijunkite prie DNS teikėjo (pvz., GoDaddy, Cloudflare arba AWS) ir pridėkite du įrašus:
   - **A įrašą** šakniniam domenui, nukreiptą į `3.23.251.61`
   - **CNAME įrašą** `www`, nukreiptą į `proxy.b1.church`
5. Grįžkite į B1.church Admin, atidarykite skyrių **Domains** tame pačiame Settings puslapyje, pridėkite savo domeną į sąrašą ir spustelėkite **Add**, tada **Save**. Svetainė bus pasiekiama per jūsų domeną per kelias minutes.

:::tip
Jei nematote parinkties Settings, paprašykite asmens, kuris nustatė jūsų bažnyčios paskyrą, suteikti jums leidimą „Edit Church Settings“. Daugiau informacijos rasite skyriuje [Vaidmenys ir leidimai](../settings/roles-permissions.md).
:::

## Pirmojo puslapio kūrimas

1. B1 Admin atidarykite [Jump meniu](../introduction.md#getting-around-with-the-jump-menu) (paieškos laukas viršuje kairėje), išskleiskite **Website** ir spustelėkite **Pages**.
2. Viršutiniame dešiniajame kampe spustelėkite **Add Page**.
3. Puslapio tipu pasirinkite **Blank** ir pavadinkite jį „Home“.
4. Spustelėkite **Page Settings** ir pagrindiniam puslapiui nustatykite URL kelią `/` (pasvirasis brūkšnys be teksto). Kiti puslapiai naudoja `/puslapio-pavadinimas`.
5. Spustelėkite **Edit Content**, kad pradėtumėte kurti. Kiekvienas puslapis turi prasidėti **Section** elementu – tai visų kitų elementų konteineris.
6. Pridėję sekciją, vėl spustelėkite **Add Content**, kad įterptumėte tekstą, nuotraukas, vaizdo įrašus, kortelės, formas ir kt., įvilkdami juos į sekciją.

:::info
Išsamių nurodymų apie darbą su puslapiais ir navigacija ieškokite skyriuje [Puslapių valdymas](managing-pages). Visą vizualinio redaktoriaus vadovą rasite skyriuje [Puslapio redaktoriaus naudojimas](page-editor).
:::

## Svetainės išvaizdos konfigūravimas

1. Jump meniu pasirinkite **Website > Appearance**.
2. Naudodami **Color Palette** nustatykite savo prekės ženklo spalvas: pagrindinį, antrinį ir akcentinį toną.
3. Po **Fonts** iš šriftų naršyklės pasirinkite antraščių ir pagrindinio teksto šriftus.
4. Stiliaus nustatymuose, skiltyje **Logo**, įkelkite bažnyčios logotipą. Pateikite ir šviesaus, ir tamsaus fono versijas.
5. Sukonfigūruokite **Site Footer** su bažnyčios kontaktine informacija ir nuorodomis.

:::info
Pakeitimai, atlikti skyriuje Appearance, taikomi visai jūsų svetainei. Išsamių kiekvieno nustatymo aprašymų ieškokite puslapyje [Išvaizda](appearance).
:::

## Navigacijos nustatymas

Jūsų navigacijos nuorodos rodomos rodinyje Website Pages. Norėdami jas sutvarkyti:

1. Spustelėkite **Add**, kad sukurtumėte naują navigacijos nuorodą, ir nukreipkite ją į vieną iš savo puslapių.
2. Vilkite ir mesdami keiskite nuorodų eiliškumą arba įdėkite jas po tėvinėmis nuorodomis.
3. Peržiūrėkite svetainę, kad įsitikintumėte, jog navigacija atrodo teisingai.

## Kiti žingsniai

- [Puslapių valdymas](managing-pages) -- Sužinokite, kaip detaliai dirbti su puslapiais ir navigacija
- [Išvaizda](appearance) -- Smulkiai sureguliuokite svetainės spalvas, šriftus ir maketą
- [Failai](files) -- Įkelkite nuotraukas ir dokumentus savo svetainei
