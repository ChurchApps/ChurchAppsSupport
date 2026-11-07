---
title: "Schemalagt läge"
description: "Låt FreePlay-TV:ar spela spellistor enligt kalender i FreePlay Admin: skärmarna startar och stoppar själva och fortsätter spela vid Wi-Fi-avbrott."
---

# Schemalagt läge

<div class="article-intro">

Med schemalagt läge kan en FreePlay-TV köra sig själv. Du bygger spellistor och lägger dem i en kalender i **FreePlay Admin** på [admin.freeplay.church](https://admin.freeplay.church). Varje TV som är kopplad till kalendern laddar ner veckan som kommer och spelar upp det som är schemalagt, enligt klockan, utan att någon trycker på Start. Eftersom filerna redan är nedladdade fortsätter uppspelningen även om Wi-Fi-anslutningen bryts.

</div>

:::tip
FreePlay Admin använder ditt ChurchApps-konto, samma som du använder för B1 Admin. Du behöver inte skapa något separat konto.
:::

## Så hänger delarna ihop

FreePlay Admin har fyra huvudsidor, som visas överst på webbplatsen:

- **[Skärmar](./managing-screens.md)** - De TV-apparater du har parkopplat, deras status och de **skärmgrupper** de tillhör. Skärmar i en grupp delar en kalender och en standardloop
- **[Spellistor](./building-playlists.md)** - Loopar med bilder och videor som du väljer från dina innehållsleverantörer
- **[Kalender](./scheduling-the-calendar.md)** - Vad varje skärmgrupp spelar, och när
- **[Leverantörer](./building-playlists.md#connecting-providers)** - De innehållskällor som dina spellistor hämtar från. Du kopplar var och en en gång för hela församlingen

När inget är schemalagt spelar en grupps skärmar upp dess **standardloop**. Om gruppen saknar standardloop blir skärmarna svarta.

## Hur det skiljer sig från planläge

- **[Planläge](../plan-mode/index.md)** följer en gudstjänstplanstyp från B1 Admin. Någon trycker på **Starta plan** på TV:n, och lektionen spelas upp när de gör det
- **Schemalagt läge** följer en kalender. Innehållet startar och stoppar vid de tider du har angett, vilket fungerar bra för skyltning i foajén, meddelandeloopar och klassrum där lektionen ska visas innan någon kommer in

En kalenderpost kan fortfarande spela upp en gudstjänstplan. Välj plantyp under **Gudstjänstplaner** när du lägger till ett schema, så spelar skärmen den plan som är aktuell i B1 Admin den veckan. Det gäller även Go Curriculum-lektioner, även sådana du har anpassat i planen. Skärmen använder den Go Curriculum-inloggning som är kopplad till plantypens ministerium i B1 Admin, eller församlingens Go Curriculum-koppling om ministeriet saknar en.

## Komma igång

Tills du har gjort vart och ett av dessa steg visar sidan **Skärmar** en checklista med **Kom igång** och en länk för varje steg:

1. **Anslut en leverantör** - Koppla Dropbox, OneDrive, Lessons.church eller någon annan källa på sidan **Leverantörer**
2. **Bygg en spellista** - Välj bilder och videor från en leverantör
3. **Lägg den i kalendern** - Välj vad som spelas när, eller ange en standardloop för gruppen
4. **Para ihop en skärm** - Ange den fyrbokstavskod som visas på TV:n

Klicka på **Dölj** för att stänga checklistan.

:::tip
Tryck på **Ctrl+K** (**⌘K** på en Mac), eller klicka på sökrutan i sidhuvudet, för att öppna kommandopaletten. Därifrån kan du hoppa till valfri sida eller starta en åtgärd som **Para ihop skärm**, **Lägg till spellista** eller **Lägg till schema**.
:::

## I det här avsnittet

- **[Parkoppla en skärm](./pairing-a-screen.md)** - Visa koden på TV:n och para ihop den i FreePlay Admin
- **[Hantera skärmar och grupper](./managing-screens.md)** - Kontrollera status och nedladdningar, och organisera skärmar i grupper
- **[Koppla leverantörer och bygga spellistor](./building-playlists.md)** - Koppla innehållskällor och bygg loopar med bilder och videor
- **[Schemalägga kalendern](./scheduling-the-calendar.md)** - Bestäm vad som spelas när, och vad som händer när det avslutas tidigt
- **[Schemalagd uppspelning på TV:n](./scheduled-playback.md)** - Vad TV:n gör av sig själv, och hur du använder fjärrkontrollen under uppspelning
