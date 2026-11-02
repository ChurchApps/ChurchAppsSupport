---
title: "Blogg"
---

# Blogg

<div class="article-intro">

Bloggsiden lar deg publisere nyheter, oppdateringer og andakter på kirkens nettsted. Innlegg vises i en kortliste på `/blog`, på sin egen nettadresse, og i en RSS-feed som andre verktøy (som Zapier) kan følge for nye innlegg.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Fullfør [førstegangsoppsettet](initial-setup) for nettstedet ditt
- Legg til en navigasjonslenke til `/blog` fra [Administrere sider](managing-pages) hvis du vil at besøkende skal finne bloggen fra menyen

</div>

## Åpne bloggen

1. I B1 Admin åpner du [hurtigmenyen](../introduction.md#getting-around-with-the-jump-menu) (søkefeltet øverst til venstre) og utvider **Nettsted**.
2. Klikk **Blogg**.
3. Siden Blogg lister alle innlegg sammen med status og publiseringsdato.

## Legge til et innlegg

1. Klikk **Legg til innlegg** øverst til høyre.
2. Skriv inn en **tittel**. En **nettadresse** (slug) som passer for URL-er genereres automatisk mens du skriver -- du kan redigere den direkte hvis du vil ha en annen adresse.
3. Legg til et **utdrag** -- et kort sammendrag som vises i listen over innlegg, i metabeskrivelser og i RSS-feeden. Hvis du lar det stå tomt, genereres et automatisk fra begynnelsen av innleggets innhold.
4. Skriv innholdet i innlegget i editoren for **Innhold** ved hjelp av Markdown. Klikk **Forhåndsvis** for å se hvordan det formaterte innlegget vil se ut.
5. Velg en **kategori** (velg en eksisterende eller skriv inn en ny) og eventuelle **emneord**, atskilt med komma.
6. Klikk **Velg bilde** for å velge et bilde fra [Filer](files)-galleriet ditt, eller last opp et nytt. Opplastede bilder åpnes i et innebygd beskjæringsverktøy låst til et 16:9-format, slik at du kan tilpasse ethvert bilde til toppteksten i innlegget og kortene i listen.
7. Sett **Forfatter** -- den er som standard deg, men du kan søke etter og velge hvilken som helst person i databasen din.
8. Slå på **Publisert** og angi en **publiseringsdato** når du er klar til å gjøre innlegget offentlig. La den være av for å lagre innlegget som et utkast.

:::tip
Sett en **publiseringsdato** fram i tid for å planlegge et innlegg. Det er skjult for besøkende og viser en brikke **Planlagt** i bloggListen til den datoen kommer.
:::

## Innleggsstatuser

Hvert innlegg i listen viser en av tre statuser:

- **Utkast** -- Ikke publisert. Synlig bare i administrasjonsdelen.
- **Planlagt** -- Publisert er på, men publiseringsdatoen er i fremtiden.
- **Publisert** -- Live på nettstedet ditt og inkludert i RSS-feeden.

## Redigere, forhåndsvise og slette innlegg

- Klikk **Rediger** ved siden av et innlegg for å gjøre endringer.
- Klikk **Vis på nettstedet** (vises på publiserte innlegg) for å åpne det live innlegget på nettstedet ditt i en ny fane.
- Klikk **Slett** for å fjerne et innlegg permanent.

## Slik ser besøkende bloggen din

Publiserte innlegg vises på `{dittnettsted}/blog`, 10 per side med lenkene **Eldre**/**Nyere** for å bla gjennom arkivet, sammen med et kategorifilter og hvert innleggs signatur og bilde. Emneord vises også som klikkbare brikker, slik at besøkende kan filtrere listen etter emneord på samme måte. Enkeltinnlegg ligger på `{dittnettsted}/blog/{slug}` og inkluderer relaterte innlegg fra samme kategori. Bloggsiden publiserer også en RSS-feed, som leses automatisk av feedlesere og automatiseringsverktøy som Zapier.

:::info
Bloggangsinnlegg er en egen innholdstype, separat fra vanlige nettstedssider -- de bygges ikke i [sideditoren](page-editor) og vises ikke i listen over sider. Dette gjør bloggskriving rask og fokusert på selve teksten.
:::

## Legge til kommentarer under innlegg

B1 er vert for ikke blogg-kommentarer selv, men du kan legge til en kommentartjeneste. Du kan også legge inn hva som helst annet under hvert innlegg, som en påmelding til nyhetsbrev eller en gaveknapp.

1. Registrer deg hos en kommentartjeneste som [Hyvor Talk](https://talk.hyvor.com), [FastComments](https://fastcomments.com) eller [Disqus](https://disqus.com), og kopier innbyggingskoden.
2. På siden Blogg blar du ned til **Under hvert innlegg**.
3. Lim inn innbyggingskoden og klikk **Lagre**.

Koden vises under innholdet i hvert publisert innlegg. Kommentartjenesten din håndterer moderering og filtrering av søppelpost, så sjekk oversikten deres jevnlig.

:::tip
Tøm boksen og klikk **Lagre** for å fjerne koden fra hvert innlegg. Bare personer som kan redigere kirkeinnstillinger ser denne boksen.
:::

## Neste steg

- [Administrere sider](managing-pages) -- Legg til en navigasjonslenke til bloggen din
- [Filer](files) -- Last opp bilder du kan bruke i innleggene dine
- [Zapier-integrasjon](../integrations/zapier.md) -- Utløs automatiseringer når nye innlegg publiseres
