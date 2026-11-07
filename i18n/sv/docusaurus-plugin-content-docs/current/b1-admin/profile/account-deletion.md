---
title: "Granskning av begäranden om kontoradering"
---

# Granskning av begäranden om kontoradering

<div class="article-intro">

När en kyrka har en godkännandegrupp för katalogen konfigurerad sker kontoradering inte längre direkt. En medlems begäran blir en uppgift som din godkännandegrupp granskar innan något tas bort. Den här sidan förklarar hur begäran görs, hur du godkänner eller avslår den och vad som händer i varje fall.

</div>

<div class="prereqs">
<h4>Innan du börjar</h4>

- En **godkännandegrupp för katalogen** måste vara konfigurerad under **Mobil &rarr; Medlemsportal**. Utan den raderar knappen **Radera mitt konto** på profilsidan fortfarande kontot direkt, utan något granskningssteg. Se [Inställningar för mobilappen](../settings/mobile-app.md).
- För att godkänna eller avslå en begäran krävs behörigheten **Personer &gt; Redigera**.

</div>

## Så begär en medlem radering

Kontoradering begärs från sidan **Min profil** — samma delade kontosida som beskrivs i [Hantera din profil](./managing-profile.md) — under avsnittet **Kontoradering**. När en godkännandegrupp är konfigurerad raderas inget direkt när personen bekräftar begäran. Istället:

1. Skapas en öppen uppgift med titeln **"Begäran om kontoradering"**, tilldelad godkännandegruppen för katalogen, under **Tjänst &rarr; Mitt arbete**.
2. Knappen **Radera mitt konto** inaktiveras för personen, och ett meddelande visas om att begäran väntar på granskning.

Om man skickar en ny begäran medan en redan är öppen, öppnas samma uppgift igen. En person kan bara ha en väntande raderingsbegäran åt gången.

## Granska en begäran

1. Gå till **Tjänst &rarr; Mitt arbete** (eller **Tilldelat till mina grupper** på din startsida, samma ställe där [begäranden om profiländringar](./approving-profile-changes.md) visas).
2. Öppna uppgiften med titeln **"Begäran om kontoradering från *Namn*"**.
3. Du ser två åtgärder: **Godkänn radering** och **Avslå**.

### Godkänna

Bekräfta **"Anonymisera den här personens uppgifter permanent och ta bort inloggningen? Detta kan inte ångras."** Det ersätter personens personuppgifter med generiska värden (samma anonymisering som används av åtgärden **Datahantering &gt; Anonymisera** på en persons post, se [Datasäkerhet](../settings/data-security.md)) och tar bort inloggningen. Uppgiften stängs automatiskt, och medlemmen får ett meddelande om att begäran godkänts.

### Avslå

Att avslå kräver en motivering, eftersom GDPR bara tillåter att en begäran om radering avslås på grund av ett juridiskt undantag:

- **Lagstadgad lagringsskyldighet** (gåvo-, skatte- eller anställningsuppgifter)
- **Behövs för ett rättsligt anspråk**
- **Annat** — förklara i textfältet (minst 10 tecken)

Medlemmen får besked om beslutet tillsammans med den motivering du angav, och kan skicka in begäran på nytt eller vända sig till en tillsynsmyndighet om hen inte håller med.

:::info
Kyrkor har 30 dagar på sig att svara på en raderingsbegäran. Uppgiften har en förfallodag om 28 dagar, och godkännandegruppen får automatiska påminnelser om uppgiften fortfarande är öppen efter 21 och 27 dagar.
:::

:::tip
Begäranden om radering och profiländringar använder samma godkännandegrupp för katalogen och samma uppgiftsbaserade granskningsflöde. Se [Godkänna profiländringar](./approving-profile-changes.md) om du också behöver granska begäranden om uppdateringar i katalogen.
:::

## Relaterade artiklar

- [Hantera din profil](./managing-profile.md) — Var medlemmar begär radering av sitt eget konto
- [Godkänna profiländringar](./approving-profile-changes.md) — Det liknande granskningsflödet för begäranden om uppdateringar i katalogen
- [Datasäkerhet](../settings/data-security.md) — GDPR-efterlevnad och anonymisering initierad av administratör
- [Inställningar för mobilappen](../settings/mobile-app.md) — Konfigurera godkännandegruppen för katalogen
