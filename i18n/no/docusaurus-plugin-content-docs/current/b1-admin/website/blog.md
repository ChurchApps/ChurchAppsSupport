---
title: "Blogg"
---

# Blogg

<div class="article-intro">

Blogg-siden lar deg publisere nyheter, oppdateringer, og andakter til menighetens nettsted. Innlegg vises i en kortliste på `/blog`, på sin egen URL, og i en RSS-feed som andre verktøy (som Zapier) kan overvåke for nye innlegg.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Fullfør [Innledende oppsett](initial-setup) for nettstedet ditt
- Legg til en navigasjonslenke til `/blog` fra [Administrere sider](managing-pages) hvis du vil at besøkende skal finne bloggen din fra menyen

</div>

## Åpne bloggen

1. I B1 Admin, klikk **Nettsted** i venstremenyen.
2. Klikk **Blogg**-fanen øverst i visningen Nettstedsider.
3. Blogg-siden lister alle innlegg sammen med status og publiseringsdato.

## Legge til et innlegg

1. Klikk **Legg til innlegg** øverst til høyre.
2. Skriv inn en **Tittel**. En URL-vennlig slug genereres automatisk mens du skriver -- du kan redigere den direkte hvis du vil ha en annen adresse.
3. Legg til et **Utdrag** -- et kort sammendrag som vises i innleggslisten, meta-beskrivelser, og RSS-feed. Hvis du lar det stå tomt, genereres det automatisk fra begynnelsen av innleggsinnholdet ditt.
4. Skriv innleggsteksten i **Innhold**-editoren ved hjelp av Markdown. Klikk **Forhåndsvis** for å se hvordan det formaterte innlegget vil se ut.
5. Velg en **Kategori** (velg en eksisterende eller skriv en ny) og valgfrie kommaseparerte **Merkelapper**.
6. Klikk **Velg bilde** for å velge et bilde fra [Filer](files)-galleriet ditt, eller last opp et nytt. Opplastede bilder åpnes i et innebygd beskjæringsverktøy låst til et 16:9-forhold, slik at du kan tilpasse ethvert bilde til å passe innleggshodet og listekortene.
7. Sett **Forfatter** -- den er som standard deg, men du kan søke etter og velge hvilken som helst person i databasen din.
8. Slå på **Publisert** og sett en **Publiseringsdato** når du er klar til å gjøre innlegget offentlig. La det stå av for å lagre innlegget som et utkast.

:::tip
Sett en **Publiseringsdato** i fremtiden for å planlegge et innlegg. Det forblir skjult for besøkende og viser en **Planlagt**-brikke i Blogg-listen frem til datoen inntreffer.
:::

## Innleggsstatuser

Hvert innlegg i listen viser en av tre statuser:

- **Utkast** -- Ikke publisert. Bare synlig i administrasjonen.
- **Planlagt** -- Publisert er på, men publiseringsdatoen er i fremtiden.
- **Publisert** -- Live på nettstedet ditt og inkludert i RSS-feeden.

## Redigere, forhåndsvise og slette innlegg

- Klikk **Rediger**-ikonet ved siden av et innlegg for å gjøre endringer.
- Klikk **Vis**-ikonet (synlig på publiserte innlegg) for å åpne det direkte innlegget på nettstedet ditt i en ny fane.
- Klikk **Slett**-ikonet for å fjerne et innlegg permanent.

## Hvordan besøkende ser bloggen din

Publiserte innlegg vises på `{yoursite}/blog`, 10 per side med **Eldre**/**Nyere**-lenker for å bla gjennom arkivet ditt, sammen med et kategorifilter og hvert innleggs byline og bilde. Merkelapper vises også som klikkbare brikker, slik at besøkende kan filtrere listen på samme måte etter merkelapp. Enkeltinnlegg ligger på `{yoursite}/blog/{slug}` og inkluderer relaterte innlegg fra samme kategori. Blogg-siden publiserer også en RSS-feed, automatisk oppdagbar av feed-lesere og automatiseringsverktøy som Zapier.

:::info
Blogginnlegg er en egen innholdstype fra vanlige nettsteder -- de bygges ikke i [sideeditoren](page-editor) og vises ikke i Sider-listen. Dette holder blogging rask og fokusert på skriving.
:::

## Neste steg

- [Administrere sider](managing-pages) -- Legg til en navigasjonslenke til bloggen din
- [Filer](files) -- Last opp bilder til bruk i innleggene dine
- [Zapier-integrasjon](../integrations/zapier.md) -- Utløs automatiseringer når nye innlegg publiseres
