---
title: "Roller och behörigheter"
---

# Roller och behörigheter

<div class="article-intro">

Med roller kan du styra vad olika användare får komma åt i ditt ChurchApps-konto. Du kan skapa egna roller för personal, volontärer och andra teammedlemmar, där var och en har sin egen åtkomstnivå för att hålla dina uppgifter säkra.

</div>

## Utbildningsvideo

<YouTube id="ZzCIkinVMnE" title="Roller, behörigheter och att bjuda in ditt team i B1" next="Konfigurera gudstjänster och närvaro i B1" nextUrl="/docs/b1-admin/attendance/setup" />

<div class="prereqs">
<h4>Innan du börjar</h4>

- Du behöver åtkomst som Domain Admin eller en roll med behörighet att hantera roller
- Ha en lista över teammedlemmar och de områden de behöver åtkomst till
- Gå igenom de behörighetskategorier som finns nedan för att planera dina roller

</div>

## Så kommer du åt roller

1. I B1 Admin öppnar du [Hoppmenyn](../introduction.md#getting-around-with-the-jump-menu) (sökfältet upptill till vänster) och expanderar **Inställningar**.
2. Klicka på **Roller**.
3. Sidan Roller visar alla roller som finns för din kyrka. Kolumnen **Medlemmar** visar hur många användare som finns i varje roll, och raden **(Everyone)** visar **Alla användare**.

## Så fungerar sidan Roller

Sidan Roller är uppdelad i två paneler:

- **Vänster sida** -- Visar listan över medlemmar som är tilldelade den valda rollen.
- **Höger sida** -- Visar de behörighetsinställningar du kan konfigurera för rollen.

Klicka på ett rollnamn för att visa och hantera dess medlemmar och behörigheter.

## Lägga till användare i en roll

1. Välj den roll du vill lägga till medlemmar i.
2. Använd **sökfältet** på vänster sida för att hitta personen du vill lägga till.
3. Välj personen i sökresultaten.
4. Personen läggs till i rollen direkt.

## Ta bort användare från en roll

1. Välj den roll som innehåller användaren du vill ta bort.
2. Hitta personen i medlemslistan på vänster sida.
3. Klicka på **knappen för att ta bort** bredvid deras namn.

## Konfigurera behörigheter

Varje roll kan ges åtkomst till specifika områden i B1 Admin. I panelen **Redigera behörigheter** är behörigheterna grupperade i avsnitt som du kan expandera, till exempel **Närvaro**, **Innehåll**, **Gåvor**, **Formulär och planer**, **Lektioner**, **Meddelanden**, **Personer och grupper** och **Uppgifter**. Skriv i rutan **Filtrera behörigheter** för att bara visa de behörigheter som matchar.

Markera eller avmarkera en behörighet för att ge eller ta bort den för rollen. Varje avsnittsrubrik visar hur många av dess behörigheter rollen har, till exempel **2 av 5**, och antalet uppdateras när du markerar och avmarkerar rutor.

### Gåvobehörigheter

Avsnittet **Gåvor** har följande behörigheter:

- **Visa gåvosammanfattningar** -- se avsnittet Gåvor, inklusive sidorna Sammanfattning, Batcher, Fonder, Kampanjer och Gåvoutdrag.
- **Visa gåvor** -- se enskilda gåvor, till exempel gåvorna i en batch.
- **Redigera gåvor** -- fullständig kontroll: lägga till, redigera och ta bort gåvor och batcher, samt [stänga och återöppna batcher](../donations/batches.md#closing-and-reopening-a-batch).
- **Registrera gåvor** -- lägga till batcher och registrera, redigera eller ta bort gåvor, men bara i batcher som fortfarande är öppna. Personer med enbart denna behörighet kan inte ta bort batcher, stänga eller återöppna dem, eller ändra gåvor som kommit in via onlinegivande.
- **Redigera inställningar** -- hantera inställningar för gåvor.

Den som har **Registrera gåvor** men inte **Visa gåvosammanfattningar** ser bara sidan **Batcher** under **Gåvor**. Ge en räkneteam-roll både **Registrera gåvor** och **Visa gåvor** så att de kan öppna en batch och se de gåvor de registrerat. Se [Vem kan ändra en batch](../donations/batches.md#who-can-change-a-batch) för mer information.

### Endast namn på personer

Avsnittet **Personer och grupper** innehåller **Visa endast namn på personer**. Använd den för volontärer som behöver slå upp personer med namn, till exempel för att välja någon i ett sökfält, utan åtkomst till hela katalogen. Med endast denna behörighet kan en person:

- Söka efter personer med namn och se listan över nyligen tillagda personer, men ser bara varje persons namn, foto och medlemsstatus
- Inte söka med e-post, se kontaktuppgifter eller öppna katalogen **Personer**

Kombinera **Visa endast namn på personer** med **Visa närvaro** eller **Redigera närvaro** för volontärer som registrerar klassnärvaro. **Personer** i deras meny öppnar då **Grupper**, där de kan öppna listan **Alla grupper** och se varje klass medlemmars namn och tillfällen. Med **Redigera närvaro** kan de också [registrera närvaro](../attendance/recording-attendance.md) och lägga till besökare genom att söka på deras namn. Namnen är inte länkar till personposter, och konfidentiella grupper förblir dolda om inte volontären är medlem.

B1 Admin döljer länkar och knappar som kräver behörigheter som en roll saknar. Listan **Alla grupper** är till exempel bara tillgänglig för personer som kan redigera grupper, visa gruppmedlemmar eller visa personer, eller som har **Visa endast namn på personer** tillsammans med **Visa närvaro** eller **Redigera närvaro** (andra skickas tillbaka till startsidan). Närvaroinställningar visas bara med **Redigera gudstjänster**, knappen **E-post** för en grupp visas bara för personer med **Redigera gruppmedlemmar** (behörigheten som krävs för att skicka gruppmejl), och för att skriva ut en gruppförteckning krävs **Visa gruppmedlemmar** eller att man leder gruppen. Att ta bort en kalenderhändelse kräver **Redigera innehåll** (eller att man återkallar sin egen väntande begäran).

### Konton för incheckningskiosk

Kontot som loggar in i en [B1 Checkin](../../b1-checkin/getting-started/logging-in.md)-kiosk behöver behörigheten **Checkin** i avsnittet **Närvaro** (eller **Redigera närvaro**). Med enbart **Checkin** kan kiosken slå upp familjer med namn eller telefonnummer, checka in och ut dem och visa vem som får hämta ett barn, utan åtkomst till personkatalogen.

Checkin beviljas inte längre via raden **(Everyone)**. Att ha en roll med andra behörigheter gör inte att någon kan köra kiosken; lägg till **Checkin** i en roll, till exempel "Incheckningsvolontärer", och placera kioskkontona i den.

:::warning
**Domain Admins** har full åtkomst till alla områden i ditt ChurchApps-konto. Deras behörigheter kan inte ändras eller begränsas. Använd den här rollen endast för dina mest betrodda administratörer.
:::

:::tip
Skapa specifika roller som "Kassör" med enbart åtkomst till **Gåvor**, "Räkneteam" med **Registrera gåvor** och **Visa gåvor**, eller "Incheckningsvolontär" med enbart åtkomst till **Närvaro**. Detta följer principen om minsta möjliga behörighet och håller dina uppgifter säkra. Se [Datasäkerhet](./data-security.md) för mer om hur ChurchApps skyddar din information.
:::
