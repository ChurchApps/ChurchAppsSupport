---
title: "Blogg"
---

# Blogg

<div class="article-intro">

På siden Blogg kan du publisere nyheter, oppdateringer og andakter på kirkens nettsted. Innleggene vises som kort i en oversikt på `/blog`, på sin egen URL og i en RSS-strøm som andre verktøy (som Zapier) kan følge for å fange opp nye innlegg.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Fullfør [førstegangsoppsettet](initial-setup) for nettstedet ditt
- Legg til en navigasjonslenke til `/blog` under [Administrere sider](managing-pages) hvis du vil at besøkende skal finne bloggen i menyen

</div>

## Åpne bloggen

1. Åpne [Jump-menyen](../introduction.md#getting-around-with-the-jump-menu) i B1 Admin (søkefeltet øverst til venstre) og utvid **Nettsted**.
2. Klikk på **Blogg**.
3. Bloggsiden viser alle innlegg sammen med status og publiseringsdato.

## Legge til et innlegg

1. Klikk på **Legg til innlegg** øverst til høyre.
2. Skriv inn en **Tittel**. En nettvennlig slug genereres automatisk mens du skriver -- du kan redigere den direkte hvis du vil ha en annen adresse.
3. Legg til et **Utdrag** -- et kort sammendrag som vises i innleggsoversikten, i metabeskrivelser og i RSS-strømmen. Hvis du lar det stå tomt, genereres det automatisk fra begynnelsen av innholdet.
4. Skriv innleggsteksten i redigeringsfeltet **Innhold** med Markdown. Klikk på **Forhåndsvis** for å se hvordan det ferdige innlegget blir seende ut.
5. Velg en **Kategori** (velg en eksisterende eller skriv inn en ny) og eventuelle **Stikkord** adskilt med komma.
6. Klikk på **Velg bilde** for å velge et bilde fra [Filer](files)-galleriet, eller last opp et nytt. Opplastede bilder åpnes i et innebygd beskjæringsverktøy som er låst til sideforholdet 16:9, slik at du kan tilpasse ethvert bilde til innleggets topp og oversiktskortene.
7. Angi **Forfatter** -- den er som standard deg selv, men du kan søke etter og velge hvilken som helst person i databasen din.
8. Slå på **Publisert** og angi en **Publiseringsdato** når du er klar til å gjøre innlegget offentlig. La det stå av for å lagre innlegget som utkast.

:::tip
Angi en **Publiseringsdato** frem i tid for å planlegge et innlegg. Det er skjult for besøkende og vises med merket **Planlagt** i bloggoversikten til datoen inntreffer.
:::

## Innleggsstatus

Hvert innlegg i oversikten har én av tre statuser:

- **Utkast** -- Ikke publisert. Bare synlig i administrasjonen.
- **Planlagt** -- Publisert er slått på, men publiseringsdatoen ligger frem i tid.
- **Publisert** -- Live på nettstedet og tatt med i RSS-strømmen.

## Redigere, forhåndsvise og slette innlegg

- Klikk på ikonet **Rediger** ved siden av et innlegg for å gjøre endringer.
- Klikk på ikonet **Vis** (vises på publiserte innlegg) for å åpne det live innlegget på nettstedet i en ny fane.
- Klikk på ikonet **Slett** for å fjerne et innlegg permanent.

## Slik ser besøkende bloggen din

Publiserte innlegg vises på `{yoursite}/blog`, ti per side, med lenkene **Eldre**/**Nyere** for å bla gjennom arkivet, sammen med et kategorifilter og hvert innleggs byline og bilde. Stikkord vises også som klikkbare merker, slik at besøkende kan filtrere oversikten på stikkord på samme måte. Hvert enkelt innlegg ligger på `{yoursite}/blog/{slug}` og viser relaterte innlegg fra samme kategori. Bloggsiden publiserer også en RSS-strøm som kan oppdages automatisk av nyhetslesere og automatiseringsverktøy som Zapier.

:::info
Blogginnlegg er en egen innholdstype, adskilt fra vanlige nettsider -- de bygges ikke i [sideredigeringen](page-editor) og vises ikke i sideoversikten. Dermed blir bloggarbeidet raskt og konsentrert om skrivingen.
:::

## Neste steg

- [Administrere sider](managing-pages) -- Legg til en navigasjonslenke til bloggen
- [Filer](files) -- Last opp bilder du vil bruke i innleggene
- [Zapier-integrasjon](../integrations/zapier.md) -- Utløs automatiseringer når nye innlegg publiseres
