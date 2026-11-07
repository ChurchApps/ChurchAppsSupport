---
title: "Skrivning af blogindlæg til din hjemmeside i B1 Admin"
sidebar_label: "Blog"
description: "Opret, planlæg og publicér blogindlæg på din kirkes hjemmeside i B1 Admin, inklusive uddrag, kategorier, tags, headerbilleder og kommentarindlejringer."
---

# Blog

<div class="article-intro">

Siden Blog giver dig mulighed for at udgive nyheder, opdateringer og andagter på din kirkes hjemmeside. Indlæg vises i en kortoversigt på `/blog`, på deres egen URL og i et RSS-feed, som andre værktøjer (f.eks. Zapier) kan overvåge for nye indlæg.

</div>

<div class="prereqs">
<h4>Før du begynder</h4>

- Gennemfør [Indledende opsætning](./initial-setup.md) for din hjemmeside
- Tilføj et navigationslink til `/blog` fra [Administrer sider](./managing-pages.md), hvis besøgende skal kunne finde din blog via menuen

</div>

## Sådan får du adgang til bloggen

1. Åbn [Hopmenuen](../introduction.md#getting-around-with-the-jump-menu) (søgefeltet øverst til venstre) i B1 Admin, og udvid **Website**.
2. Klik på **Blog**.
3. Siden Blog viser alle indlæg sammen med deres status og udgivelsesdato.

## Tilføjelse af et indlæg

1. Klik på **Tilføj indlæg** i øverste højre hjørne.
2. Indtast en **Titel**. En URL-venlig **webadresse** (slug) genereres automatisk, mens du skriver. Du kan redigere den direkte, hvis du vil have en anden adresse.
3. Tilføj et **Uddrag**, en kort opsummering, der vises i indlægslisten, i metabeskrivelser og i RSS-feedet. Hvis du lader feltet stå tomt, genereres der automatisk et uddrag ud fra begyndelsen af indlæggets indhold.
4. Skriv indlæggets brødtekst i editoren **Indhold** ved hjælp af Markdown. Klik på **Forhåndsvisning** for at se, hvordan det formaterede indlæg vil se ud.
5. Vælg en **Kategori** (vælg en eksisterende eller skriv en ny) og eventuelle **Tags** adskilt af kommaer.
6. Klik på **Vælg billede** for at vælge et foto fra dit [Filer](./files.md)-galleri, eller upload et nyt. Uploadede fotos åbnes i et indbygget beskæringsværktøj, låst til et 16:9-format, så du kan tilpasse ethvert foto til indlæggets header og kortene i oversigten.
7. Angiv **Forfatter**. Den er som standard dig, men du kan søge efter og vælge enhver person i din database.
8. Slå **Udgivet** til og angiv en **Udgivelsesdato**, når du er klar til at gøre indlægget offentligt. Lad den være slået fra for at gemme indlægget som kladde.

:::tip
Angiv en **Udgivelsesdato** i fremtiden for at planlægge et indlæg. Det skjules for besøgende og viser et **Planlagt**-mærke i bloglisten, indtil datoen er nået.
:::

## Indlæggenes statusser

Hvert indlæg på listen viser en af tre statusser:

- **Kladde** -- Ikke udgivet. Kun synlig i administrationen.
- **Planlagt** -- Udgivet er slået til, men udgivelsesdatoen ligger i fremtiden.
- **Udgivet** -- Live på din hjemmeside og med i RSS-feedet.

## Redigering, forhåndsvisning og sletning af indlæg

- Klik på **Rediger** ud for et indlæg for at foretage ændringer.
- Klik på **Vis på siden** (vises på udgivne indlæg) for at åbne det live indlæg på din hjemmeside i en ny fane.
- Klik på **Slet** for at fjerne et indlæg permanent.

## Sådan ser besøgende din blog

Udgivne indlæg vises på `{yoursite}/blog`, 10 pr. side, med links til **Ældre**/**Nyere** for at bladre gennem dit arkiv. Der er også et kategorifilter, og hvert indlægs forfatter og billede vises. Tags vises som klikbare mærker, så besøgende kan filtrere listen efter tag på samme måde. Enkelte indlæg findes på `{yoursite}/blog/{slug}` og inkluderer relaterede indlæg fra samme kategori. Blogsiden udgiver også et RSS-feed, som feedlæsere og automatiseringsværktøjer som Zapier automatisk kan finde.

:::info
Blogindlæg er en separat indholdstype fra almindelige websider. De bygges ikke i [sideeditoren](./page-editor.md) og vises ikke på listen over sider. Dette holder bloggen hurtig at skrive i og fokuseret på selve skrivningen.
:::

## Tilføjelse af kommentarer under indlæg

B1 hoster ikke selv blogkommentarer, men du kan tilføje en kommentartjeneste. Du kan også placere andet under hvert indlæg, f.eks. en tilmelding til nyhedsbrevet eller en donationsknap.

1. Tilmeld dig en kommentartjeneste som [Hyvor Talk](https://talk.hyvor.com), [FastComments](https://fastcomments.com) eller [Disqus](https://disqus.com), og kopiér dens indlejringskode.
2. Rul på siden Blog ned til **Under hvert indlæg**.
3. Indsæt indlejringskoden, og klik på **Gem**.

Koden vises under indholdet i hvert udgivet indlæg. Din kommentartjeneste håndterer moderering og spamfiltrering, så tjek dens dashboard jævnligt.

:::tip
Ryd feltet, og klik på **Gem** for at fjerne koden fra alle indlæg. Kun personer, der kan redigere kirkeindstillinger, ser dette felt.
:::

## Næste trin

- [Administrer sider](./managing-pages.md) -- Tilføj et navigationslink til din blog
- [Filer](./files.md) -- Upload fotos, du vil bruge i dine indlæg
- [Zapier-integration](../integrations/zapier.md) -- Udløs automatiseringer, når nye indlæg udgives
