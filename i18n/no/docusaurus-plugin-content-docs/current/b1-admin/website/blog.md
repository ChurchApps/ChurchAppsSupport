---
title: "Skrive blogginnlegg for nettstedet ditt i B1 Admin"
sidebar_label: "Blogg"
description: "Lag, planlegg og publiser blogginnlegg på menighetens nettside i B1 Admin, inkludert utdrag, kategorier, emneord, overskriftsbilder og innbygde kommentarer."
---

# Blogg

<div class="article-intro">

Siden Blogg lar deg publisere nyheter, oppdateringer og andakter på menighetens nettside. Innleggene vises i en kortliste på `/blog`, på sin egen URL, og i en RSS-feed som andre verktøy (som Zapier) kan overvåke for nye innlegg.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Fullfør [førstegangsoppsettet](./initial-setup.md) for nettstedet ditt
- Legg til en navigasjonslenke til `/blog` fra [Administrere sider](./managing-pages.md) hvis du vil at besøkende skal finne bloggen din fra menyen

</div>

## Åpne bloggen {#accessing-the-blog}

1. I B1 Admin åpner du [Hurtigmenyen](../introduction.md#getting-around-with-the-jump-menu) (søkefeltet øverst til venstre) og utvider **Nettside**.
2. Klikk på **Blogg**.
3. Siden Blogg lister alle innlegg, med status og publiseringsdato.

## Legge til et innlegg {#adding-a-post}

1. Klikk på **Legg til innlegg** øverst til høyre.
2. Skriv inn en **tittel**. En URL-vennlig **webadresse** (slug) lages automatisk mens du skriver -- du kan redigere den direkte hvis du vil ha en annen adresse.
3. Legg til et **utdrag** -- et kort sammendrag som vises i innleggslisten, i metabeskrivelser og i RSS-feeden. Hvis du lar det stå tomt, lages det automatisk av starten på innleggsinnholdet.
4. Skriv innholdet i innlegget i editoren **Innhold** med Markdown. Klikk på **Forhåndsvisning** for å se hvordan det formaterte innlegget vil se ut.
5. Velg en **kategori** (velg en eksisterende eller skriv inn en ny) og eventuelle **emneord** separert med komma.
6. Klikk på **Velg bilde** for å velge et bilde fra galleriet ditt under [Filer](./files.md), eller last opp et nytt. Opplastede bilder åpnes i et innebygd beskjæringsverktøy låst til et sideforhold på 16:9, slik at du kan tilpasse ethvert bilde til overskriften på innlegget og kortene i listen.
7. Sett **forfatteren** -- den er som standard deg, men du kan søke etter og velge hvilken som helst person i databasen din.
8. Slå på **Publisert** når du er klar til å gjøre innlegget offentlig. Et felt for **publiseringsdato** vises, satt til i dag; endre den hvis du vil ha en annen dato. La bryteren stå på **Utkast** for å lagre innlegget som et utkast.
9. Klikk på **Lagre**. Et innlegg må ha en tittel og en webadresse som ingen andre innlegg bruker.

:::tip
Sett en **publiseringsdato** fram i tid for å planlegge et innlegg. Det holdes skjult for besøkende og viser en brikke **Planlagt** i listen over blogginnlegg til den datoen kommer.
:::

## Innleggsstatus {#post-states}

Hvert innlegg i listen viser en av tre statuser:

- **Utkast** -- Ikke publisert. Synlig bare i administrasjonen.
- **Planlagt** -- Publisert er slått på, men publiseringsdatoen ligger fram i tid.
- **Publisert** -- Live på nettstedet ditt og inkludert i RSS-feeden.

## Redigere, forhåndsvise og slette innlegg {#editing-previewing-and-deleting-posts}

- Klikk på **Rediger** ved siden av et innlegg for å gjøre endringer.
- Klikk på **Vis på nettstedet** (vises for publiserte innlegg) for å åpne det live innlegget på nettstedet ditt i en ny fane.
- Klikk på **Slett** for å fjerne et innlegg permanent.

## Slik ser besøkende bloggen din {#how-visitors-see-your-blog}

Publiserte innlegg vises på `{yoursite}/blog`, 10 per side med lenkene **Eldre innlegg**/**Nyere innlegg** for å bla gjennom arkivet, sammen med kategoribrikker som filtrerer listen, og forfatter og bilde for hvert innlegg. Emneord vises som klikkbare brikker nederst i hvert innlegg, slik at besøkende kan filtrere listen etter emneord på samme måte. Enkeltinnlegg ligger på `{yoursite}/blog/{slug}` og avsluttes med en seksjon **Mer i** *kategori* som lister opptil tre andre innlegg fra samme kategori. Se [Blogg](../../b1-church/content/blog.md) i B1.church-veiledningen for hva besøkende ser. Bloggsiden publiserer også en RSS-feed, som automatisk oppdages av feedlesere og automatiseringsverktøy som Zapier.

Publiserte innlegg kan også vises i en seksjon **Nyheter** på startskjermen i menighetens app, hvis du slår det på -- se [Seksjoner på startskjermen](../settings/mobile-app.md#home-screen-sections).

:::info
Blogginnlegg er en egen innholdstype fra vanlige nettstedsider -- de lages ikke i [sideeditoren](./page-editor.md) og vises ikke i listen over sider. Dette holder bloggskrivingen rask og fokusert på selve skrivingen.
:::

## Legge til kommentarer under innlegg {#adding-comments-below-posts}

B1 er ikke vert for blogg-kommentarer selv, men du kan legge til en kommentartjeneste. Du kan også legge alt annet under hvert innlegg, for eksempel et påmeldingsskjema for nyhetsbrev eller en gaveknapp.

1. Registrer deg hos en kommentartjeneste som [Hyvor Talk](https://talk.hyvor.com), [FastComments](https://fastcomments.com) eller [Disqus](https://disqus.com), og kopier innbyggingskoden.
2. På siden Blogg scroller du til **Under hvert innlegg**.
3. Lim inn innbyggingskoden og klikk på **Lagre**.

Koden vises under innholdet i hvert publiserte innlegg. Kommentartjenesten din håndterer moderering og spamfiltrering, så sjekk dashbordet deres jevnlig.

:::tip
Tøm boksen og klikk på **Lagre** for å fjerne koden fra alle innlegg. Bare personer som kan redigere kirkeinnstillinger ser denne boksen.
:::

## Neste steg {#next-steps}

- [Administrere sider](./managing-pages.md) -- Legg til en navigasjonslenke til bloggen din
- [Filer](./files.md) -- Last opp bilder du vil bruke i innleggene dine
- [Zapier-integrasjon](../integrations/zapier.md) -- Utløs automatiseringer når nye innlegg publiseres
