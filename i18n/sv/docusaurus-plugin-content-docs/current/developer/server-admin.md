---
title: "Serveradministration"
description: "Endast för Server.Admin-användare: återställ tvåfaktorsinloggning, imitera konton, modera Commons och godkänn kyrkans e-post i B1 Admin."
---

# Serveradministration

<div class="article-intro">

Serveradministrationsfunktionerna i ChurchApps är endast tillgängliga för användare med behörigheten **Server.Admin**. Verktygen används för plattformens drift, support och felsökning för alla kyrkor i systemet.

</div>

:::warning Begränsad åtkomst
Funktionerna på den här sidan kräver behörigheten **Server.Admin** och är inte tillgängliga för vanliga kyrkoadministratörer. De är endast avsedda för plattformsoperatörer och supportpersonal.
:::

## Så här öppnar du Serveradministration

Användare med behörigheten Server.Admin kan öppna serveradministrationspanelen från B1 Admin:

1. Logga in på [admin.b1.church](https://admin.b1.church)
2. Öppna [Hoppmenyn](../b1-admin/introduction.md#getting-around-with-the-jump-menu), expandera **Inställningar** och klicka på **Server Admin**. (Du kan också gå direkt till `admin.b1.church/admin`.)
3. Panelen för Server Admin visar sina avsnitt i en vänsterkolumn, indelade i tre grupper: **Katalog** (Kyrkor, Användare, Simulera användare), **Drift** (Bakgrundsjobb, Commons, Användningstrender) och **System** (Översättningsuppslag, Serverhälsa, Databasmigreringar)

## Återställa tvåstegsinloggning

Om en användare har [tvåstegsinloggning](../b1-admin/profile/managing-profile.md#two-factor-sign-in) aktiverad och har förlorat både sin telefon och sina reservkoder, kan en serveradministratör stänga av den:

1. Öppna avsnittet **Användare** i panelen för Server Admin och sök upp användaren.
2. Användare med tvåstegsinloggning visar en bricka med texten **Tvåstegsinloggning på**. Klicka på **Återställ 2FA** bredvid den.
3. Bekräfta frågan. Gör detta först efter att du har verifierat vem du pratar med.

Användaren kan sedan logga in med enbart sitt lösenord och konfigurera tvåstegsinloggningen igen från sin profil. Återställningar skrivs till granskningsloggen som `mfa_reset`. Slutpunkten är `POST /membership/users/mfa/reset/:userId` och kräver Server.Admin.

## Simulera användare

Funktionen för att simulera användare gör det möjligt för serveradministratörer att logga in som en annan användare för support och felsökning. Det är till hjälp när man undersöker problem som användare rapporterat eller hjälper kyrkor att konfigurera sina system.

### Så här simulerar du en användare

1. Öppna avsnittet **Simulera användare** i panelen för Server Admin
2. Skriv användarens namn eller e-postadress i sökfältet
3. Klicka på **Sök** eller tryck på Enter
4. Klicka på användaren du vill simulera bland sökresultaten
5. Bekräfta simuleringen i dialogrutan som visas
6. Du loggas in som den användaren och omdirigeras till deras konto

### Viktiga noteringar

- Simulering skapar en ny session med målanvändarens behörigheter och kyrkåtkomst
- Din ursprungliga administratörssession avslutas när du simulerar en annan användare
- Alla åtgärder som utförs under simuleringen loggas i granskningsloggen
- För att återgå till ditt administratörskonto loggar du ut och loggar in igen med dina egna uppgifter
- Använd simulering endast när det är nödvändigt för supportändamål, och informera alltid användaren när du öppnar hens konto för support

### API-slutpunkt

Funktionen för att simulera användare bygger på slutpunkten `/users/:userId/impersonate` i Membership-API:et. Se [Membership-slutpunkter](/docs/developer/api/endpoints/membership#users) för tekniska detaljer.

### Säkerhetsöverväganden

- Simulering kräver behörigheten Server.Admin. Den bör delas ut sparsamt och endast till betrodda plattformsoperatörer
- Alla simuleringshändelser loggas med administratörens användar-ID och målanvändarens användar-ID
- Kyrkor meddelas inte när simulering sker, så upprätta tydliga riktlinjer för när och hur funktionen ska användas
- Överväg att dokumentera simuleringshändelser i ert supportärendesystem för ansvarsskyldighet

## Commons-moderering

Commons är den gemensamma moderationskön för användarinskickat innehåll över produkterna. WorshipCommons-sånger, Lessons.church-lektioner, FreeShow-mallar och mallar för B1:s webbplatsbyggare flödar alla genom samma kö i stället för separata granskningsverktyg per produkt.

### Öppna Commons

1. Gå till fliken **Commons** i panelen för Server Admin.
2. Du ser tre underflikar: **Kö**, **Rapporter** och **Tillgångar**.

En begränsad roll för **musikredigerare** kan också se fliken Kö, men kan inte godkänna inlämningar som ändrar en sångs rättigheter eller licensiering.

### Kö

Kön visar alla väntande inlämningar över alla produkter, och du kan filtrera efter produkt och tillgångstyp. Varje rad visar om inlämningen är en ny tillgång, en redigering av den ursprungliga upphovspersonen eller en redigering av en tredje part, tillsammans med inlämnarens godkännandehistorik och hur länge inlämningen har väntat (markeras när den passerat 72 timmar).

Klicka på **Granska** för att öppna en panel med fältvisa jämförelser, filförhandsvisningar och en inbäddad skrivskyddad förhandsvisning av objektet. Använd genvägarna **a**/**r** för att godkänna eller avvisa, och **j**/**k** för att gå till nästa eller föregående inlämning utan att lämna panelen. Vid avvisning måste du välja en anledning (till exempel kvalitet, dubblett, licensiering, ccli, ai eller off-topic) och skriva en notering.

### Rapporter

Fliken Rapporter hanterar upphovsrättsrapporter och rapporter om policy/kvalitet som lämnats mot redan publicerade tillgångar. Den är uppdelad i separata köer för Upphovsrätt och Policy & övrigt, plus en historik över åtgärdade ärenden. Ta över en rapport för att börja arbeta med den och avsluta den sedan med en resolution (upprätthållen, avvisad eller dubblett) och en åtgärd (ingen, avpublicera eller ta bort).

### Tillgångar

Fliken Tillgångar är en sökbar översikt över publicerat innehåll, med åtgärderna **Utvalt** för att lyfta fram en tillgång på produktens startsida, **Avpublicera**/**Publicera igen** samt **Ta bort** (med en upphovsrätts- eller policyanledning).

För sånger är det också här en sång blir **redo för söndag** och kan visas i en kyrkas sökning av sånger i B1 Admin. En granskare öppnar tillgången och markerar varje publicerad tonart som **Lyssnad** när hen har lyssnat igenom den och bekräftat att noterna, ackorden och bilderna finns med. En sång blir redo för söndag först när varje tonart har bockats av.

:::info
Commons-moderering är endast för personal. Enskilda kyrkor ser aldrig den här kön. Det enda ställe där en enskild kyrkas B1 Admin berör Commons-data är avsnittet "WorshipCommons — gratis" i [sångsökningen](/docs/b1-admin/serving/songs#free-songs-from-worshipcommons), som endast visar sånger som redan har gått igenom granskningsprocessen.
:::

Se sidan [Content Commons-arkitektur](/docs/developer/architecture/commons) för den underliggande datamodellen och inlämningens livscykel.

## Godkännande av gruppmejl

Kyrkor kan inte skicka kyrkoskrivna e-postmeddelanden (gruppmejl, uppföljningar av formulär, arbetsflödesmejl och inbjudningar till konton) förrän en serveradministratör har godkänt dem. Detta förhindrar att bot-registrerade kyrkor använder den gemensamma ChurchApps avsändaradress för skräppost.

1. Öppna fliken **Kyrkor** i panelen för Server Admin.
2. Varje kyrka visar en bricka för **Gruppmejl**: **Godkänd** (grön) eller **Ej godkänd** (kantlinje).
3. Klicka på brickan och bekräfta för att godkänna kyrkan eller för att återkalla ett godkännande.

Kyrkans personal begär godkännande med knappen **Begär granskning** i dialogrutan Skicka e-post i B1 Admin. Begäran skickas via e-post till supportadressen och innehåller kyrkans namn, ID, registreringsdatum, plats och vem som begärde. En kyrka kan skicka en begäran per vecka. Se [Begränsningar för kyrkoskriven e-post](/docs/developer/architecture/notifications#church-authored-email-limits) för den dagliga kvoten och den automatiska pausen vid studsar och klagomål.

## Databasmigreringar

Arbetsflödet **Deploy Prod** tillämpar väntande migreringar själv. De hostade databaserna accepterar bara anslutningar från insidan av Api:ets nätverk, så en GitHub-runner kan inte nå dem. I stället anropar arbetsflödet direkt efter `serverless deploy` Api:ets Lambda-funktion `migrate` (`api-Prod-migrate`), som kör alla väntande migreringar för varje modul med samma körmiljö som den här fliken, och misslyckar deployen om någon modul ger fel eller avvisas. **Rollback Prod** återställer endast Lambda-koden. Tillämpade migreringar förblir tillämpade. Fliken **Databasmigreringar** är till för att kontrollera status, köra det som en deploy inte körde (till exempel i demomiljön, vars deploy inte migrerar), och för att registrera startpunkten för moduler utan historik. (Självhostade Docker-installationer kör fortfarande migreringar automatiskt när Api-containern startar.)

Fliken visar den aktuella miljön och en rad per modul (membership, attendance, giving och så vidare) med dess status, antalet tillämpade och väntande migreringar, samt den senast tillämpade.

- **Kör väntande migreringar** tillämpar varje väntande migrering, en modul i taget och i ordning. Den stannar vid första felet och visar vad som tillämpats för varje modul.
- En modul markerad med **Ingen historik** har en databas som är äldre än migreringsspårningen. Den körs aldrig automatiskt, eftersom det skulle spela upp gamla datamigreringar mot aktiva tabeller. Klicka i stället på **Kontrollera schema** för den modulen. Api:et jämför tabellerna, kolumnerna och index som varje migrering skapar med den aktiva databasen och markerar varje migrering som **Redan tillämpad**, **Saknas**, **Delvis tillämpad** eller **Endast data**. Kontrollen ändrar ingenting.
- I kontrollresultaten skriver **Registrera som redan tillämpad** de identifierade migreringarna till migreringshistoriken utan att köra dem (efter bekräftelse). Allt upp till den sista migreringen som är **Redan tillämpad** registreras, inklusive **Endast data**-migreringar inom det intervallet. Migreringar som är **Saknas** förblir väntande och kan sedan köras normalt med **Kör väntande migreringar**.
- En migrering som är **Delvis tillämpad** blockerar registrering. Om migreringen är säker att köra igen (läs den först) kryssar du i **Kör om** så att den förblir väntande och körs igen från början.

Panelen för Server Admin och CLI:t (`yarn migrate:up`) använder samma Kysely-migrerare och tabellen `kysely_migration`, så de är alltid överens om vad som har tillämpats. Bakomliggande slutpunkter är `GET /membership/serverHealth/migrations`, `POST /membership/serverHealth/migrations/:module/run`, `GET .../:module/detect` och `POST .../:module/baseline`, alla endast för Server.Admin.

## Relaterade sidor

- [Autentisering och behörigheter](/docs/developer/api/endpoints/authentication) — Behörighetsmodell och JWT-autentisering
- [Membership-slutpunkter](/docs/developer/api/endpoints/membership) — API för användare och kyrkor
- [Granskningslogg](/docs/b1-admin/reports/audit-log) — Visa aktivitetsloggar för en kyrka
- [Content Commons-arkitektur](/docs/developer/architecture/commons) — Modell för delade tillgångar och moderationens livscykel
