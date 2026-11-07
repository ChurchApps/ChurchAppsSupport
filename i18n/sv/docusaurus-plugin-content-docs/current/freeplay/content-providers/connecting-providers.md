---
title: "Conexión con proveedores"
description: "Anslut FreePlay till en innehållsleverantör med QR-kod, e-postinloggning eller direktåtkomst med ett klick, och hantera eller koppla bort anslutningen under Inställningar."
---

Eso es español, pero el usuario pidió sueco. Let me correct that: the output must be Swedish.

---
title: "Ansluta till leverantörer"
---

# Ansluta till leverantörer

<div class="article-intro">

Innan du kan bläddra bland innehåll från en leverantör behöver du ansluta till den. Vissa leverantörer kräver autentisering med en QR-kod eller e-postinloggning, medan andra kan anslutas med ett enda klick.

</div>

<div class="prereqs">
<h4>Innan du börjar</h4>

- Installera och starta FreePlay -- se [Komma igång](../getting-started/index.md)
- Ha din TV-fjärrkontroll redo för navigering
- För leverantörer som kräver inloggning, ha dina kontouppgifter tillgängliga

</div>

:::tip Konfigurerar du B1 Admin och FreePlay tillsammans?
Vår **<a href="/guides/freeplay-b1admin" target="_blank">steg-för-steg-guide</a>** går igenom hur du kopplar B1 Admin, schemalägger en lektion och ansluter FreePlay — allt på ett ställe. Öppna den i en ny flik för att följa med.
:::

## Bläddra bland tillgängliga leverantörer

1. Öppna **Inställningar** längst ned i sidofältet och välj sedan **Leverantörer** för att öppna skärmen **Innehållsleverantörer**
2. Du ser ett rutnät med leverantörskort, där varje kort visar leverantörens logotyp och namn
3. Anslutna leverantörer visar en grön märkning **Ansluten** under sitt namn
4. Leverantörer som ännu inte är tillgängliga visar en etikett **Kommer snart**

## Ansluta utan autentisering

Vissa leverantörer kräver ingen inloggning. När du väljer någon av dessa leverantörer ansluter FreePlay direkt och öppnar innehållsbläddraren. Inga uppgifter behövs.

## Autentisering med enhetsflöde (QR-kod)

Vissa leverantörer använder ett enhetsflöde, liknande hur du loggar in i streamingappar på en TV:

1. Välj leverantörskortet på skärmen **Innehållsleverantörer**
2. FreePlay visar skärmen **Anslut till** med leverantörens namn, en QR-kod och en verifieringswebbadress
3. Skanna QR-koden med din telefon eller besök den visade webbadressen på valfri enhet
4. Ange koden som visas på TV-skärmen
5. Slutför inloggningen på din telefon eller dator
6. FreePlay upptäcker den lyckade inloggningen och visar **Ansluten!**
7. Innehållsbläddraren öppnas automatiskt

:::info
En pulserande indikator **Väntar på bekräftelse** visar att FreePlay kontrollerar din inloggning. Skärmen visar hur många minuter som återstår innan koden går ut, så slutför processen snabbt. Välj **Generera ny kod** om koden går ut.
:::

## Inloggning med telefon (endast QR-kod)

**Dropbox**, **OneDrive** och **Go Curriculum** använder en något annorlunda QR-kodsinloggning, utan någon kod att skriva in:

1. Välj leverantörskortet på skärmen **Innehållsleverantörer**
2. FreePlay visar skärmen **Anslut till** med leverantörens namn och en QR-kod
3. Skanna QR-koden med din telefon och logga in på ditt konto hos leverantören (ditt Microsoft-konto för OneDrive eller ditt gocurriculum.com-konto för Go Curriculum)
4. Godkänn åtkomsten. TV:n ansluter automatiskt och visar **Ansluten!**

Skärmen visar hur många minuter du har kvar att slutföra inloggningen.

## Formulärinloggning

Andra leverantörer använder en traditionell e-post- och lösenordsinloggning:

1. Välj leverantörskortet
2. Ange din **e-postadress** och ditt **lösenord** med hjälp av skärmtangentbordet
3. Välj knappen **Logga in**
4. Om dina uppgifter stämmer visar FreePlay **Ansluten!** och öppnar innehållsbläddraren

:::tip
Använd riktningsknapparna på fjärrkontrollen för att flytta mellan e-postfältet, lösenordsfältet och knappen för inloggning. Tryck på **Välj** i ett textfält för att öppna skärmtangentbordet.
:::

## Leverantörsinställningar

När du väljer ett leverantörskort som visar märkningen **Ansluten** öppnas skärmen **Leverantörsinställningar**:

- **Bläddra i biblioteket** -- Visa eller dölj denna leverantörs innehållsbibliotek i sidofältet
- **Hämta dagens lektion automatiskt** -- Använd denna leverantör som källa för dagens lektion och ladda ned dess filer i förväg (visas endast för leverantörer som erbjuder en aktuell lektion)
- **Använd för tillkännagivanden** -- Välj en mapp från denna leverantör som ska loopas under objektet **Tillkännagivanden** i sidofältet. Se [Tillkännagivanden](./announcements.md)
- **Sök efter uppdateringar av tillkännagivanden** -- Visas när en mapp för tillkännagivanden har valts; hämtar nya bilder och tar bort borttagna
- **Koppla från** -- Tar bort anslutningen

## Koppla från en leverantör

Så här kopplar du från en leverantör som du redan har anslutit till:

1. Gå till skärmen **Innehållsleverantörer** (**Inställningar** > **Leverantörer**)
2. Välj leverantörskortet som visar märkningen **Ansluten**
3. Välj **Koppla från** på skärmen **Leverantörsinställningar**

Efter att du kopplat från försvinner leverantörens innehåll från ditt sidofält. Om du använde någon av dess mappar för tillkännagivanden tas även de bilderna bort.

:::warning
Att koppla från tar bort den sparade autentiseringen från din enhet. Du måste logga in igen om du vill ansluta på nytt senare.
:::

## Relaterade artiklar

- **[Bläddra bland och ladda ned innehåll](./browsing-content.md)** - Navigera i mappar och spela upp innehåll efter anslutning
- **[Tillkännagivanden](./announcements.md)** - Loopa en mapp med bilder från en ansluten leverantör
- **[Översikt över innehållsleverantörer](./index.md)** - Se alla tillgängliga leverantörer
