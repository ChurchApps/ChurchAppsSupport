---
title: "Datasäkerhet"
description: "Läs om hur ChurchApps skyddar din kyrkas data i B1 Admin, från hashade lösenord och HTTPS till separata databaser och GDPR-verktyg för data."
---

# Datasäkerhet

<div class="article-intro">

Även om det inte finns något helt säkert system tar ChurchApps datasäkerhet på allvar. Den här sidan förklarar de åtgärder som vidtas för att skydda all data som registreras i B1.church Admin och andra ChurchApps-produkter.

</div>

<div class="prereqs">
<h4>Innan du börjar</h4>

- Läs igenom den här sidan för att förstå hur din kyrkas data skyddas
- Konfigurera [Roller och behörigheter](./roles-permissions.md) för att styra vem som har åtkomst till känslig information
- Sätt dig in i [integritetspolicyn](https://churchapps.org/privacy)

</div>

## Begränsning av lagrade känsliga uppgifter

Vårt första tillvägagångssätt är att inte lagra mer känsliga uppgifter än nödvändigt. Det innebär att vi aldrig lagrar kreditkorts- eller bankkontouppgifter som används för att göra gåvor. När en användare gör en gåva via B1.church Admin eller B1 skickas kreditkortsuppgifterna aldrig till någon av våra servrar, utan endast till din betalningsleverantör (Stripe). Det innebär att inga kreditkorts- eller bankuppgifter skulle kunna komprometteras vid ett dataintrång.

Vi lagrar heller aldrig lösenord i vårt system. Alla lösenord bearbetas med en envägshashningsalgoritm där delar av datan förstörs, vilket gör det omöjligt för någon att hämta lösenord från databasen, inte ens för oss. För att verifiera ett lösenord måste det angivna värdet passera samma envägshash och ge samma resultat.

Efter att dessa två källor har tagits bort återstår endast en lista med namn och kontaktuppgifter som känslig data.

:::tip
Eftersom ChurchApps aldrig lagrar kreditkorts- eller bankuppgifter skulle inte ens ett värsta tänkbara dataintrång röja finansiella kontouppgifter. Endast namn och kontaktuppgifter skulle vara i fara.
:::

## Använda branschens bästa praxis

Vi följer branschens standarder för säkerhet, inklusive kryptering av all data som överförs till och från våra servrar med HTTPS. Alla servrar är placerade i ett säkert fysiskt datacenter hos Amazon Web Services. Alla databasservrar är placerade bakom en brandvägg och är otillgängliga från internet.

## Datasegregering

Data är uppdelad i olika databaser beroende på omfattning. Var och en av våra API:er (Membership, Giving, Attendance, Messaging, Doing och Lessons) är oberoende datasilor med egna databaser. Om en av dem komprometteras är datans användbarhet begränsad utan att de andra också komprometteras. Om till exempel Giving-API:et/databasen komprometterades skulle en illasinnad aktör potentiellt kunna få tillgång till en lista över gåvor och datum (men aldrig kort- eller bankuppgifter). De skulle dock inte ha tillgång till vilka användare som gjort gåvorna eller vilka kyrkor de var avsedda för, eftersom den datan lagras i den separata Membership-databasen.

:::info
Datasegregering innebär att ett intrång i ett system inte ger åtkomst till all kyrkdata. Varje API fungerar oberoende med sin egen databas, vilket begränsar konsekvenserna av ett eventuellt dataintrång.
:::

## Begränsad åtkomst

Åtkomst till produktionsservrarna är strikt begränsad till de serveradministratörer som behöver den. För närvarande är det två personer som också är styrelseledamöter. Utvecklare, volontärer och andra styrelseledamöter har inte tillåtelse att komma åt produktionsservrarna.

## Integritetspolicy

Din data tillhör dig och kommer aldrig att säljas till tredje part. Du kan läsa vår fullständiga integritetspolicy [här](https://churchapps.org/privacy).

## GDPR-efterlevnad

ChurchApps stöder GDPR-efterlevnad för kyrkor med medlemmar i Storbritannien eller Europeiska unionen. Så här hanterar vi de viktigaste kraven:

### Registrerades rättigheter

ChurchApps tillhandahåller verktyg som hjälper kyrkor att besvara förfrågningar från registrerade personer:

- **Rätt till tillgång (artikel 15)** — Medlemmar kan begära en kopia av sina personuppgifter genom att kontakta sin kyrka. Administratörer kan exportera en persons alla uppgifter från avsnittet **Datahantering** på personens detaljsida i B1.church Admin.
- **Rätt till radering (artikel 17)** — Medlemmar kan själva begära radering av sitt konto från sin profilsida (se [Granska begäranden om kontoradering](../profile/account-deletion.md)), eller genom att kontakta sin kyrka direkt. Administratörer kan även anonymisera en persons uppgifter i alla moduler från avsnittet **Datahantering** på personens detaljsida. Anonymisering ersätter personuppgifter med generiska värden, samtidigt som sammanlagda poster (gåvosummor, närvaroantal) bevaras, eftersom de behövs för kyrkans ekonomiska rapportering.
- **Rätt till begränsning av behandling (artikel 18)** — Medlemmar kan begära begränsning av behandlingen genom att kontakta sin kyrka, inklusive att avregistrera sig från kommunikation.
- **Rätt till dataportabilitet (artikel 20)** — Administratörer kan exportera personuppgifter i ett strukturerat, maskinläsbart JSON-format på uppdrag av medlemmar som begär det.

### Använda verktygen för datahantering

För att komma åt GDPR-verktygen för en enskild person:

1. Gå till **Personer** i B1 Admin och öppna personens post.
2. Klicka på **Redigera** för att gå in i redigeringsläge.
3. Rulla ned till avsnittet **Datahantering** (ihopfällt som standard) och klicka för att expandera det.
4. Använd **Exportera data** för att ladda ned en JSON-fil med all data som lagrats för personen.
5. Använd **Anonymisera** för att ersätta personuppgifter med generiska värden. Du uppmanas att skriva `ANONYMIZE` för att bekräfta. Den här åtgärden kan inte ångras.

:::warning
Anonymisering är permanent. Gåvosummor och närvaroantal bevaras för ekonomisk rapportering, men alla personliga identifierare (namn, e-post, adress m.m.) tas bort och kan inte återställas.
:::

### Databehandling

ChurchApps agerar som **personuppgiftsbiträde** på uppdrag av din kyrka (den **personuppgiftsansvarige**). Vårt [databehandlingsavtal](https://churchapps.org/terms) beskriver varje parts ansvar, inklusive användning av underbiträden, rutiner för incidentanmälan och hantering av data vid avslutat avtal.

### Internationella överföringar av data

ChurchApps data är lagrad hos Amazon Web Services (AWS) i USA. Internationella överföringar av data från Storbritannien/EU omfattas av AWS:s standardavtalsklausuler (SCC) enligt [AWS:s tillägg för databehandling](https://aws.amazon.com/compliance/data-processing-addendum/). AWS-tillägget ingår automatiskt i AWS-tjänstevillkoren för alla kunder. EU-baserad lagring krävs inte när lämpliga överföringsmekanismer, som SCC, finns på plats.

Information om hur överföringsrisker har utvärderats finns i [Bedömning av överföringsrisk](./transfer-risk-assessment.md).

### Underbiträden

- **Amazon Web Services (AWS)** — Infrastrukturhosting, datalagring och innehållsleverans
- **Stripe** — Betalningshantering för gåvor (inga kortuppgifter lagras av ChurchApps)

:::info
För fullständig information om hur vi hanterar personuppgifter, se vår [integritetspolicy](https://churchapps.org/privacy) och [användarvillkor](https://churchapps.org/terms). Om du har frågor om GDPR-efterlevnad, kontakta oss på support@churchapps.org.
:::
