---
title: "Blogg"
---

# Blogg

<div class="article-intro">

Bloggsiden lar deg publisere nyheter, oppdateringer og andakter på kirkens nettsted. Innlegg vises i en kortliste på `/blog`, på sin egen URL, og i en RSS-feed som andre verktøy (som Zapier) kan følge for nye innlegg.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Fullfør [Første oppsett](initial-setup) for nettstedet ditt
- Legg til en navigasjonslenke til `/blog` fra [Administrere sider](managing-pages) hvis du vil at besøkende skal finne bloggen fra menyen

</div>

## Åpne bloggen

1. I B1 Admin åpner du [Hurtigmenyen](../introduction.md#getting-around-with-the-jump-menu) (søkefeltet øverst til venstre) og utvider **Nettsted**.
2. Klikk **Blogg**.
3. Bloggsiden lister alle innlegg sammen med status og publiseringsdato.

## Legge til et innlegg

1. Klikk **Legg til innlegg** øverst til høyre.
2. Skriv inn en **Tittel**. En URL-vennlig **nettadresse** (slug) genereres automatisk mens du skriver — du kan redigere den direkte hvis du vil ha en annen adresse.
3. Legg til et **Utdrag** — et kort sammendrag som vises i innleggslisten, metabeskrivelser og RSS-feeden. Hvis du lar det stå tomt, genereres et automatisk fra begynnelsen av innleggsinnholdet.
4. Skriv innleggsteksten i **Innhold**-editoren med Markdown. Klikk **Forhåndsvis** for å se hvordan det formaterte innlegget vil se ut.
5. Velg en **Kategori** (velg en eksisterende eller skriv en ny) og eventuelle **Emneord** atskilt med komma.
6. Klikk **Velg bilde** for å velge et bilde fra [Filer](files)-galleriet ditt, eller last opp et nytt. Opplastede bilder åpnes i et innebygd beskjæringsverktøy låst til et 16:9-forhold, slik at du kan tilpasse ethvert bilde til innleggets topptekst og listekort.
7. Velg **Forfatter** — den er satt til deg som standard, men du kan søke etter og velge hvilken som helst person i databasen din.
8. Slå på **Publisert** og angi en **Publiseringsdato** når du er klar til å gjøre innlegget offentlig. La den være av for å lagre innlegget som utkast.

:::tip
Sett en **Publiseringsdato** i fremtiden for å planlegge et innlegg. Det holdes skjult for besøkende og viser en brikke **Planlagt** i blogglisten til den datoen kommer.
:::

## Innleggsstatus

Hvert innlegg i listen viser en av tre statuser:

- **Utkast** — ikke publisert. Synlig bare i administrasjonen.
- **Planlagt** — Publisert er på, men publiseringsdatoen er i fremtiden.
- **Publisert** — live på nettstedet ditt og inkludert i RSS-feeden.

## Redigere, forhåndsvise og slette innlegg

- Klikk **Rediger** ved siden av et innlegg for å gjøre endringer.
- Klikk **Vis på nettstedet** (vises på publiserte innlegg) for å åpne det live innlegget på nettstedet ditt i en ny fane.
- Klikk **Slett** for å fjerne et innlegg permanent.

## Slik ser besøkende bloggen din

Publiserte innlegg vises på `{yoursite}/blog`, 10 per side med lenkene **Eldre**/**Nyere** for å bla gjennom arkivet ditt, sammen med et kategorifilter og hvert innleggs byline og bilde. Emneord vises også som klikkbare brikker, slik at besøkende kan filtrere listen etter emneord på samme måte. Enkeltinnlegg ligger på `{yoursite}/blog/{slug}` og inkluderer relaterte innlegg fra samme kategori. Bloggsiden publiserer også en RSS-feed, som automatisk kan oppdages av feedlesere og automatiseringsverktøy som Zapier.

:::info
Blogginnlegg er en egen innholdstype fra vanlige nettstedsider — de bygges ikke i [sideditoren](page-editor), og de vises ikke i listen over sider. Dette holder bloggskrivingen rask og fokusert på selve teksten.
:::

## Legge til kommentarer under innlegg

B1 er vert for ikke blogg-kommentarer selv, men du kan legge til en kommentartjeneste. Du kan også legge inn annet under hvert innlegg, som en påmelding til nyhetsbrev eller en gaveknapp.

1. Registrer deg hos en kommentartjeneste som [Hyvor Talk](https://talk.hyvor.com), [FastComments](https://fastcomments.com) eller [Disqus](https://disqus.com), og kopier innbyggingskoden.
2. På bloggsiden blar du ned til **Under hvert innlegg**.
3. Lim inn innbyggingskoden og klikk **Lagre**.

Koden vises under innholdet i hvert publisert innlegg. Kommentartjenesten din håndterer moderering og spamfiltrering, så sjekk dashbordet deres jevnlig.

:::tip
Tøm boksen og klikk **Lagre** for å fjerne koden fra alle innlegg. Bare personer som kan redigere kirkeinnstillinger ser denne boksen.
:::

## Neste steg

- [Administrere sider](managing-pages) — legg til en navigasjonslenke til bloggen din
- [Filer](files) — last opp bilder du vil bruke i innleggene dine
- [Zapier-integrasjon](../integrations/zapier.md) — utløs automatiseringer når nye innlegg publiseres
