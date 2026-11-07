---
title: "Skapa formulär"
description: "Skapa egna formulär i B1 Admin för eventanmälningar, enkäter och besökskort och dela dem via länk, QR-kod eller utskrift."
---

# Skapa formulär

<div class="article-intro">

Skapa egna formulär för att samla in information från din församling. Du kan skapa formulär för evenemangsanmälningar, enkäter, besökskort, medlemsansökningar och mycket annat. Formulär kan kopplas till personer i din databas eller användas som fristående sidor med en egen publik webbadress.

</div>

## Utbildningsvideo

<YouTube id="sr9wxEj9ghQ" title="Skapa formulär och hantera inskickningar i B1" next="Lansera din kyrkas webbplats i B1" nextUrl="/docs/b1-admin/guides/launch-website" />

<div class="prereqs">
<h4>Innan du börjar</h4>

- För **Personer**-formulär (kopplade till personposter) behöver du först [personer i din databas](../people/adding-people.md).
- För formulär som tar emot **betalningar** måste du ha [Stripe konfigurerat för onlinegivande](../donations/online-giving-setup.md).

</div>

## Skapa ett nytt formulär

1. Öppna [Hoppmenyn](../introduction.md#getting-around-with-the-jump-menu) (sökfältet längst upp till vänster i B1 Admin), expandera **Personer** och klicka på **Formulär**.
2. Klicka på **Lägg till formulär**.
3. Ange ett **namn** för ditt formulär.
4. Välj formulärtyp i rullgardinsmenyn **Koppla till**:
   - **Personer** – Kopplar inskickningar till [personposter](../people/adding-people.md) i din databas. Formulär för personer fylls i från en persons post, så de får ingen delbar länk.
   - **Fristående** – Skapar ett självständigt formulär med en egen publik webbadress, perfekt för externa anmälningar. Endast fristående formulär erbjuder en [rubrikbild](#adding-a-header-photo), en [QR-kod](#sharing-a-form-with-a-qr-code), en [kopplad grupp](#linking-a-form-to-a-group) och **Skapa en personpost från inskickningar**.
5. Klicka på **Spara** för att skapa formuläret.

Ditt nya formulär visas i listan. Klicka på det för att börja lägga till frågor.

## Skriva ut ett tomt formulär {#printing-a-blank-form}

Behöver du en pappersversion att dela ut, till exempel ett besökskort vid välkomstdisken eller ett formulär som någon utan internetåtkomst kan fylla i för hand? Klicka på **Skriv ut** bredvid ett formulär i huvudlistan över formulär för att öppna en förhandsvisning och klicka sedan på **Skriv ut**. Tomma fält skrivs ut med en understrykning eller kryssruta för varje fråga, så att folk kan fylla i dem för hand. Obligatoriska frågor markeras med en asterisk. Överst på sidan visas din kyrkas logotyp (**Logotyp för ljus bakgrund** från [Webbplats > Utseende](../website/appearance.md), om du har laddat upp en) med kyrkans namn under, följt av formulärets namn. Det finns inga andra utskriftsalternativ – du skriver ut hela formuläret eller ingenting.

## Dela ett formulär med en QR-kod {#sharing-a-form-with-a-qr-code}

Fristående formulär har en länk **QR-kod** bredvid sig i huvudlistan över formulär (arkiverade formulär har den inte). Klicka på den för att öppna en QR-kod för formulärets publika webbadress, med länken visad under koden. Klicka på **Ladda ner PNG** för att spara koden som en bild som du kan skriva ut på församlingsbladet eller visa på bilder. Den som skannar koden öppnar formuläret i sin telefon.

## Lägga till frågor {#adding-questions}

1. Öppna ditt formulär och gå till fliken **Frågor**.
2. Klicka på **Lägg till fråga**.
3. Välj en **fälttyp** i rullgardinsmenyn Leverantör. Tillgängliga typer inkluderar:
   - **Textruta** – För korta textsvar
   - **Datum** – För datumval
   - **E-post** – För e-postadresser
   - **Telefonnummer** – För telefoninmatning
   - **Flerval** – För att välja bland fördefinierade alternativ
   - **Betalning** – För att ta emot betalningar
4. Ange en **Titel** och eventuellt en **Beskrivning** för frågan. Beskrivningen visas under frågan när folk fyller i formuläret, så använd den för tips som "Ange eventuella allergier vi bör känna till."
5. Markera **Kräv svar** om fältet är obligatoriskt.
6. Klicka på **Spara**.
7. Upprepa för att lägga till fler frågor.

:::warning
Fälttypen **Betalning** kräver att Stripe är konfigurerat. Om du ännu inte har satt upp onlinegivande, se [Konfigurera onlinegivande](../donations/online-giving-setup.md) innan du lägger till betalningsfält. Personer som betalar via ett formulär utan att logga in måste markera kryssrutan **Jag är inte en robot** innan kortet godkänns.
:::

## Hantera formulärmedlemmar {#managing-form-members}

1. Öppna ditt formulär och gå till fliken **Formulärmedlemmar**.
2. Sök efter en person och lägg till henne eller honom med en roll:
   - **Administratör** – Kan redigera formuläret och visa alla inskickningar.
   - **Endast visning** – Kan visa inskickningar men inte redigera formuläret.

## Koppla ett formulär till en grupp {#linking-a-form-to-a-group}

Du kan koppla vilket fristående formulär som helst till en grupp – till exempel ett bönformulär för en smågrupp eller ett medicinskt godkännande för en ungdomsresa:

1. Öppna ditt formulärs **Detaljer**.
2. Under **Kopplad grupp** väljer du gruppen, eller lämnar den inställd på **Ingen**.
3. Klicka på **Spara**.

När ett formulär är kopplat:

- **Gruppmedlemmar** ser formuläret i avsnittet **Formulär** på gruppens sida i B1.church medan formuläret är öppet, med en knapp **Fyll i** som öppnar det (se [Gruppdetaljer](../../b1-church/groups/group-details.md#linked-forms)).
- **Gruppledare** ser även stängda formulär och kan läsa alla inskickningars svar och skriva ut dem (en inskickning eller **Skriv ut alla**). Ledare kan endast visa svar – de kan inte redigera formuläret om de inte också är [formulärmedlemmar](#managing-form-members).
- **I B1 Admin** visar gruppens sida ett avsnitt **Kopplade formulär** som listar varje kopplat formulär som **Öppet** eller **Stängt**. Det visas för gruppens ledare och för personer som kan administrera formulär. Se [Gruppmedlemmar](../groups/group-members.md#linked-forms).

Ett formulär är stängt när det ligger utanför sin tillgänglighetsperiod. Arkiverade formulär visas inte på gruppsidan.

### Lägg automatiskt till avsändare i en grupp {#automatically-adding-submitters-to-a-group}

Att koppla ett formulär till en grupp lägger inte till någon i gruppen av sig själv. För att lägga till alla som skickat in formuläret i gruppens medlemslista, aktivera också **Skapa en personpost från inskickningar** i formulärets detaljer och klicka på **Spara**.

Varje gång någon skickar in formuläret läggs den matchade eller nyskapade personen till i gruppen (befintliga gruppmedlemmar hoppas över). Detta är användbart för saker som en anmälan till läger som automatiskt ska bygga upp lägrets medlemslista.

### Skicka ett uppföljningsmejl

Med **Skapa en personpost från inskickningar** aktiverat kan du också skicka ett mejl till varje person som skickar in formuläret. Fyll i **Ämne för uppföljningsmejl** och **Text för uppföljningsmejl** i formulärets detaljer. Du kan använda token `{firstName}` och `{churchName}` i båda. Mejlet skickas endast när båda fälten är ifyllda.

:::info
Uppföljningsmejl skickas först när din kyrka har godkänts för att skicka gruppmejl, och de räknas mot din kyrkas dagliga mejlgräns. Se [Aktivera gruppmejl för din kyrka](../groups/group-members.md#turning-on-group-email-for-your-church).
:::

## Duplicera ett formulär

För att återanvända ett formulär som utgångspunkt för ett nytt, klicka på **Duplicera** bredvid formuläret i listan över formulär och bekräfta. B1 skapar en exakt kopia av formuläret – inklusive alla frågor – som du sedan kan byta namn på och redigera oberoende.

:::tip
Duplicering är praktiskt för återkommande evenemang där anmälningsfrågorna är desamma från år till år. Duplicera förra årets formulär, uppdatera namn och datum, så är du klar.
:::

## Konfigurera formulärets egenskaper

Du kan uppdatera ditt formulärs namn och inställningar när som helst. För fristående formulär ser du även en unik **publik webbadress** som du kan dela med vem som helst, tillsammans med ett fält för **Beskrivning** – text som visas ovanför frågorna på den publika formulärsidan, användbar för att berätta för folk vad formuläret är till för innan de börjar fylla i det.

### Lägga till en rubrikbild {#adding-a-header-photo}

Fristående formulär kan visa en **Rubrikbild** överst i formuläret. I formulärets detaljer klickar du på bildrutan eller **Lägg till bild**, väljer eller laddar upp en bild (den beskärs till 16:9-format). Klicka på **Spara**. Bilden visas under formulärets namn, ovanför beskrivningen, på formulärets publika webbadressida och överallt där formuläret är inbäddat med webbplatsens element **Formulär**. Använd **Byt bild** för att ersätta den eller **Ta bort** för att ta bort den.

Använd fältet **Tackmeddelande** för att ange vad folk ser efter att de har skickat in formuläret, även på formulärets publika webbadressida. Om du lämnar det tomt ser de "Tack för att du skickade formuläret!"

:::tip
Fristående formulär är perfekta för evenemangsanmälningar. Dela den publika webbadressen via e-post eller sociala medier, eller bädda in formuläret direkt på din kyrkas webbplats.
:::

:::info
För att bädda in ett formulär på din B1-webbplats, gå till din webbplatseditor, lägg till en ny sektion och välj elementet **Formulär**. Välj sedan det formulär du vill visa. Se [Hantera sidor](../website/managing-pages.md) för mer information om hur du redigerar din webbplats.
:::
