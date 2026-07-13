---
title: "Navigationsstile"
---

# Navigationsstile

<div class="article-intro">

Tilpas farverne på din kirkes hjemmesides navigationslinje, så de matcher din branding. Du kan konfigurere farver for både faste baggrunde og gennemsigtige overlejringer, hvilket giver dig fuld kontrol over, hvordan din navigation ser ud på tværs af forskellige sider.

</div>

<div class="prereqs">
<h4>Før du begynder</h4>

- Du skal have tilladelse til at administrere din kirkes hjemmeside. Se [Roller og tilladelser](../people/roles-permissions.md) for detaljer.
- Hav dine brandfarver klar, inklusive hex-farvekoder (f.eks. #03A9F4).
- Forstå forskellen mellem faste og gennemsigtige navigationsstile på din hjemmeside.

</div>

## Forstå navigationstilstande

Din hjemmesides navigation kan vises i to forskellige stile afhængigt af siden:

- **Fast navigation** -- Navigationslinje med en baggrundsfarve, typisk brugt på indholdssider
- **Gennemsigtig navigation** -- Navigation der overlejrer sideindholdet, typisk brugt på sider med hero-billeder eller fuldskærmsbaggrunde

Du kan tilpasse farver for begge tilstande uafhængigt.

## Tilgå navigationsstile

1. Naviger til **Hjemmeside** i B1 Admin
2. Klik på **Udseende** i sidebjælken
3. Rul ned til **Navigationsstile**-sektionen
4. Klik **Rediger navigationsstile**

## Konfigurere fast navigation

Fast navigation vises med en baggrundsfarve bag navigationslinjen. Du kan tilpasse:

### Baggrundsfarve

1. Slå **Tilsidesæt**-kontakten til for **Baggrundsfarve**
2. Klik på farvevælgeren
3. Vælg din ønskede baggrundsfarve
4. Standarden er hvid (#FFFFFF)

### Linkfarve

1. Slå **Tilsidesæt**-kontakten til for **Linkfarve**
2. Vælg farven til navigationslinktekst
3. Dette påvirker links i deres standardtilstand
4. Standarden er mørkegrå (#555555)

### Link hover-farve

1. Slå **Tilsidesæt**-kontakten til for **Link hover-farve**
2. Vælg farven links skifter til, når brugere holder musen over dem
3. Dette giver visuel feedback for klikbare links
4. Standarden er lyseblå (#03A9F4)

### Aktiv farve

1. Slå **Tilsidesæt**-kontakten til for **Aktiv farve**
2. Vælg farven til det aktuelt aktive sidelink
3. Dette hjælper brugere med at vide, hvilken side de er på
4. Standarden er lyseblå (#03A9F4)

## Konfigurere gennemsigtig navigation

Gennemsigtig navigation overlejrer dit sideindhold uden baggrund. Du kan tilpasse:

### Linkfarve

1. Slå **Tilsidesæt**-kontakten til for **Linkfarve**
2. Vælg en farve der kontrasterer godt med din sidebaggrund
3. Hvide eller lyse farver fungerer ofte bedst over mørke baggrunde
4. Standarden er mørkegrå (#555555)

### Link hover-farve

1. Slå **Tilsidesæt**-kontakten til for **Link hover-farve**
2. Vælg hover-tilstandsfarven
3. Sørg for at den er synlig mod din sidebaggrund
4. Standarden er lyseblå (#03A9F4)

### Aktiv farve

1. Slå **Tilsidesæt**-kontakten til for **Aktiv farve**
2. Vælg farven til den aktive sideindikator
3. Bør skille sig ud, mens den stadig passer til dit design
4. Standarden er lyseblå (#03A9F4)

:::info
Gennemsigtig navigation har ikke en baggrundsfarveindstilling, da den overlejrer sideindholdet direkte.
:::

## Gemme dine ændringer

1. Efter du har konfigureret dine farver, klik **Gem navigationsstile**
2. Dine ændringer gælder øjeblikkeligt på din live hjemmeside
3. Besøg din hjemmeside for at se navigationen i begge tilstande

## Nulstille til standardindstillinger

Hvis du ønsker at gå tilbage til standardfarverne:

1. Slå **Tilsidesæt**-kontakterne fra for eventuelle brugerdefinerede farver
2. Klik **Gem navigationsstile**
3. Navigationen vender tilbage til standardfarveskemaet

Eller klik **Annuller** for at forkaste alle ændringer uden at gemme.

## Bedste praksis

### Farvekontrast

- **Læsbarhed** -- Sørg for at linkfarver har tilstrækkelig kontrast med baggrunden
- **WCAG-overensstemmelse** -- Sigt efter mindst 4,5:1 kontrastforhold for tilgængelighed
- **Test begge tilstande** -- Forhåndsvis din side med både fast og gennemsigtig navigation

### Brand-konsistens

- **Brug dine brandfarver** -- Match dit logo og hjemmesidetema
- **Begræns din palet** -- Hold dig til 2-3 farver for et sammenhængende udseende
- **Overvej dine billeder** -- Hvis du bruger gennemsigtig navigation, test den mod typiske sidebaggrunde

### Hover- og aktiv-tilstande

- **Klar feedback** -- Gør hover-tilstande tydeligt forskellige fra standardlinks
- **Skeln aktive sider** -- Brug en tydelig farve, så brugere ved, hvor de er
- **Glidende overgange** -- Systemet animerer automatisk farveændringer

## Fejlfinding

### Farverne ser ikke rigtige ud

- **Ryd din cache** -- Browser-caching kan vise gamle farver
- **Tjek hex-koder** -- Sørg for at du har indtastet gyldige hex-farvekoder
- **Test på forskellige baggrunde** -- Farver kan se forskellige ud afhængigt af siden

### Navigation ikke synlig

- **Gennemsigtig tilstand** -- Hvis du bruger gennemsigtig navigation over lyse billeder, kan mørk tekst være svær at se
- **Løsning** -- Juster dine linkfarver eller brug mørkere sidebaggrunde
- **Alternativ** -- Tilføj en subtil skygge eller baggrundsoverlejring til navigationsområdet

## Tekniske detaljer

Navigationsstile gemmes som JSON og anvendes ved hjælp af CSS-variabler:

- Ændringer træder øjeblikkeligt i kraft uden at genopbygge siden
- Farver kaskaderer til alle navigationselementer
- Tilsidesættelser er valgfrie; ikke-indstillede farver bruger temaets standardværdier

## Relaterede artikler

- [Udseende](./appearance.md) -- Tilpas din hjemmesides overordnede udseende og fornemmelse
- [Administrer sider](./managing-pages.md) -- Opret og organiser dine hjemmesider
- [Sideeditor](./page-editor.md) -- Design sidelayout og indhold
