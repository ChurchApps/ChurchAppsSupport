---
title: "Exportera data"
description: "Exportera personer till CSV, gruppmedlemslistor eller en fullständig säkerhetskopia av B1-databasen från B1 Admin och se vad B1 Export Zip innehåller."
---

# Exportera data

<div class="article-intro">

B1 Admin låter dig exportera din församlingsdata så att du kan använda den i kalkylblad, dela den med ditt team eller spara en säkerhetskopia. Oavsett om du behöver en snabb lista med namn och e-postadresser eller en komplett databasexport finns det alternativ som passar dina behov.

</div>

<div class="prereqs">
<h4>Innan du börjar</h4>

- Du behöver ett aktivt B1 Admin-konto med behörighet att visa de uppgifter du vill exportera. Se [Roller och behörigheter](roles-permissions.md) om du är osäker på vilken åtkomstnivå du har.
- För en komplett databasexport behöver du åtkomst till området **Inställningar**.

</div>

## Exportera från sidan Personer

Det snabbaste sättet att exportera din katalog är direkt från sidan **Personer**:

1. Öppna [Hoppmenyn](../introduction.md#getting-around-with-the-jump-menu) (sökfältet längst upp till vänster i B1 Admin), expandera **Personer** och klicka på **Personer**.
2. Använd sökfältet eller filtren för att avgränsa de resultat du vill exportera (eller lämna det ofiltrerat för att exportera alla). Se [Söka efter personer](searching-people.md) för tips om filtrering.
3. Klicka på knappen **Exportera** i sidhuvudet för sidan Personer.
4. En CSV-fil laddas ner till din dator med de personer som för närvarande finns i dina resultat, inklusive namn, kontaktuppgifter, adress och andra standardfält.

:::tip
Exporten omfattar alla i dina aktuella resultat. Gör en sökning, öppna en [sparad lista](./lists.md) eller använd först **Avancerat**-sökningen för att exportera just de personer du behöver.
:::

## Fullständig dataexport från Inställningar

För en komplett export av all din B1-data (inte bara personer) använder du exportverktyget i Inställningar:

1. I Hoppmenyn väljer du **Inställningar > Inställningar**.
2. Klicka på länken **Import/Export** under din församlings namn högst upp i den vänstra inställningsmenyn.
3. Välj **B1 Database** i listrutan **Datakälla**.
4. Granska förhandsvisningen av data och klicka på **Fortsätt till mål**.
5. Välj **B1 Export Zip** som exportmål.
6. Följ exportens förlopp tills alla objekt visar gröna bockar.
7. Exportfilen laddas ner automatiskt. Leta efter filen `B1Export` i mappen för nedladdningar.
8. Packa upp filen för att komma åt de enskilda CSV-filerna (till exempel `people.csv`) som du kan öppna i Excel, Google Sheets eller Numbers.

:::info
B1 Export Zip är en fullständig säkerhetskopia av din församlingsdata. Den innehåller:

- personer (med foton) och hushåll, inklusive hushållets kontakter för upphämtning
- campus, gudstjänster och gudstjänsttider
- grupper och gruppmedlemmar
- fonder och gåvor, inklusive gåvor som fördelats på flera fonder
- närvaro
- formulär, frågor, inlämningar och svar
- anpassade fält och deras värden
- sparade personlistor

Om en persons foto inte kan laddas ner eller läsas under exporten hoppas just det fotot över och exporten fortsätter utan det.

För att återställa den väljer du **B1 Import Zip** som källa och **B1 Database** som mål (se [Importera data](./importing-data.md)). Hushåll, kontakter för upphämtning och sparade listor återskapas tillsammans med personerna. Filtren för sparade listor pekar på de återställda grupperna, fonderna, campusen och anpassade fälten.
:::

## Exportera gruppdata

Du kan även exportera medlemslistor för enskilda grupper. Från sidan **Grupper** öppnar du en grupp och klickar på **nedladdningsikonen** för att exportera gruppens medlemslista. Se [Gruppmedlemmar](../groups/group-members.md) för mer information.

:::info
Exporterade CSV-filer fungerar med alla större kalkylprogram, bland annat Microsoft Excel, Google Sheets och Apple Numbers.
:::
