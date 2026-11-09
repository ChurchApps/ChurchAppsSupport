---
title: "Skrive blogginnlegg for nettstedet ditt i B1 Admin"
sidebar_label: "Blogg"
description: "Lag, planlegg og publiser blogginnlegg på menighetens nettsted i B1 Admin, med ingresser, kategorier, emneord, overskriftsbilder og innebygde kommentarer."
---

# Blogg

<div class="article-intro">

Bloggsiden lar deg publisere nyheter, oppdateringer og andakter på menighetens nettsted. Innleggene vises i en kortliste på `/blog`, på sin egen nettadresse, og i en RSS-feed som andre verktøy (som Zapier) kan følge for nye innlegg.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Fullfør [førstegangsoppsettet](./initial-setup.md) for nettstedet ditt
- Legg til en navigasjonslenke til `/blog` fra [Administrere sider](./managing-pages.md) hvis du vil at besøkende skal finne bloggen din fra menyen

</div>

## Åpne bloggen

1. I B1 Admin åpner du [hurtigmenyen](../introduction.md#getting-around-with-the-jump-menu) (søkefeltet øverst til venstre) og utvider **Nettsted**.
2. Klikk **Blogg**.
3. Bloggsiden lister alle innlegg sammen med status og publiseringsdato.

## Legge til et innlegg

1. Klikk **Legg til innlegg** øverst til høyre.
2. Skriv inn en **tittel**. En nettadresse (slug) som passer for web, lages automatisk mens du skriver -- du kan redigere den direkte hvis du vil ha en annen adresse.
3. Legg til en **ingress** -- et kort sammendrag som vises i innleggslisten, i metabeskrivelser og i RSS-feeden. Hvis du lar den stå tom, lages en automatisk fra starten av innholdet ditt.
4. Skriv innleggsteksten i redigeringsverktøyet for **innhold** med Markdown. Klikk **Forhåndsvis** for å se hvordan det formaterte innlegget vil se ut.
5. Velg en **kategori** (velg en eksisterende eller skriv inn en ny) og eventuelt **emneord** adskilt med komma.
6. Klikk **Velg bilde** for å velge et bilde fra galleriet ditt under [Filer](./files.md), eller last opp et nytt. Opplastede bilder åpnes i et innebygd beskjæringsverktøy låst til 16:9, slik at du kan velge utsnitt av ethvert bilde som passer til overskriften og listekortene.
7. Velg **forfatter** -- den er som standard deg, men du kan søke etter og velge hvilken som helst person i databasen din.
8. Slå på **Publisert** og angi en **publiseringsdato** når du er klar til å gjøre innlegget offentlig. La den være av for å lagre innlegget som utkast.

:::tip
Sett en **publiseringsdato** fram i tid for å planlegge et innlegg. Det holdes skjult for besøkende og viser en brikke for **Planlagt** i listen til datoen kommer.
:::

## Innleggsstatuser

Hvert innlegg i listen viser én av tre statuser:

- **Utkast** -- Ikke publisert. Bare synlig i administrasjonen.
- **Planlagt** -- Publisert er på, men publiseringsdatoen er i fremtiden.
- **Publisert** -- Live på nettstedet ditt og med i RSS-feeden.

## Redigere, forhåndsvise og slette innlegg

- Klikk **Rediger** ved siden av et innlegg for å gjøre endringer.
- Klikk **Vis på nettstedet** (vises på publiserte innlegg) for å åpne det publiserte innlegget på nettstedet ditt i en ny fane.
- Klikk **Slett** for å fjerne et innlegg for godt.

## Hvordan besøkende ser bloggen din

Publiserte innlegg vises på `{dinside}/blog`, 10 per side, med lenkene **Eldre** og **Nyere** for å bla gjennom arkivet ditt, sammen med et kategorifilter og hvert innleggs byline og bilde. Emneord vises også som klikkbare brikker, slik at besøkende kan filtrere listen etter emneord på samme måte. Enkeltinnlegg ligger på `{dinside}/blog/{slug}` og inkluderer relaterte innlegg fra samme kategori. Bloggsiden publiserer også en RSS-feed, som leses automatisk av feedlesere og automatiseringsverktøy som Zapier.

Publiserte innlegg kan også vises i en seksjon **Nyheter** på startskjermen i menighetens app, hvis du slår det på -- se [Seksjoner på startskjermen](../settings/mobile-app.md#home-screen-sections).

:::info
Blogginnlegg er en egen innholdstype, separat fra vanlige nettstedsider -- de lages ikke i [sideeditoren](./page-editor.md) og vises ikke i listen over sider. Dette holder skriving av blogginnlegg rask og fokusert på selve teksten.
:::

## Legge til kommentarer under innlegg

B1 er ikke vert for blogg-kommentarer selv, men du kan legge til en kommentartjeneste. Du kan også legge inn hva som helst annet under hvert innlegg, for eksempel en påmelding til nyhetsbrev eller en giveknapp.

1. Registrer deg hos en kommentartjeneste, for eksempel [Hyvor Talk](https://talk.hyvor.com), [FastComments](https://fastcomments.com) eller [Disqus](https://disqus.com), og kopier innbyggingskoden.
2. På bloggsiden blar du ned til **Under hvert innlegg**.
3. Lim inn innbyggingskoden og klikk **Lagre**.

Koden vises under innholdet i hvert publiserte innlegg. Kommentartjenesten din håndterer moderering og filtrering av spam, så sjekk dashbordet deres jevnlig.

:::tip
Tøm boksen og klikk **Lagre** for å fjerne koden fra alle innlegg. Bare personer som kan redigere kirkeinnstillinger ser denne boksen.
:::

## Neste steg

- [Administrere sider](./managing-pages.md) -- Legg til en navigasjonslenke til bloggen din
- [Filer](./files.md) -- Last opp bilder du vil bruke i innleggene dine
- [Zapier-integrasjon](../integrations/zapier.md) -- Utløs automatiseringer når nye innlegg publiseres
