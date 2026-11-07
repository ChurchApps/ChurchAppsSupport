---
title: "Hantera din profil"
---

# Hantera din profil

<div class="article-intro">

Sidan Profil låter dig redigera dina personliga kontoinställningar. Din profil delas mellan alla ChurchApps-produkter, så eventuella ändringar du gör här syns överallt där du använder ChurchApps.

</div>

<div class="prereqs">
<h4>Innan du börjar</h4>

- Du måste vara inloggad på ditt ChurchApps-konto
- Ha din nya e-postadress eller ditt nya lösenord redo om du tänker uppdatera dem

</div>

## Profilinformation

Sidan Profil visar ditt namn och din e-postadress till vänster, med en knapp **Redigera** under dem. Klicka på **Redigera** för att öppna formuläret **Redigera konto**, som innehåller dina grundläggande kontouppgifter:

1. **E-post** -- Din e-postadress som används för inloggning och för att ta emot aviseringar.
2. **Förnamn** och **Efternamn** -- Ditt visningsnamn i ChurchApps.
3. **Lösenord** -- Uppdatera ditt kontolösenord.

För att uppdatera dina uppgifter redigerar du fälten och klickar på knappen **Spara ändringar**. Klicka på **Avbryt** (eller länken **Tillbaka till** med ditt namn) för att återgå till din profil utan att spara.

## Byta lösenord

1. Klicka på **Redigera** på sidan Profil.
2. Ange ditt **Nuvarande lösenord**.
3. Ange ditt nya lösenord i fältet **Nytt lösenord**.
4. Ange det igen i fältet **Verifiera lösenord**.
5. Klicka på **Spara ändringar**.

:::info
Ditt lösenord måste vara minst 8 tecken långt. Se till att fälten för lösenord och bekräftelse matchar exakt. Du måste bekräfta ditt nuvarande lösenord för att kunna byta det -- om du inte känner till det kan du använda länken **Glömt lösenord** på inloggningssidan i stället.
:::

## Länkade konton

Avsnittet **Länkade konton** visar alla externa tjänster som är kopplade till ditt ChurchApps-konto. Här kan du se vilka konton som är länkade och hantera dessa kopplingar.

## Tvåfaktorsinloggning

Tvåfaktorsinloggning lägger till ett extra steg vid inloggning: efter ditt lösenord (eller inloggning med Google, Microsoft eller en e-postlänk) anger du även en sexsiffrig kod från en autentiseringsapp i telefonen, till exempel Google Authenticator, Microsoft Authenticator, 1Password eller Authy. Funktionen är valfri och är avstängd som standard. När den är påslagen gäller den för varje ChurchApps-inloggning som använder ditt konto -- B1 Admin, din kyrkas B1.church-webbplats och app, B1 Church Checkin, Lessons.church, FreePlay och övriga tjänster.

### Så slår du på den

1. På sidan Profil hittar du avsnittet **Tvåfaktorsinloggning** och klickar på **Aktivera**.
2. Skanna QR-koden med din autentiseringsapp. Om du inte kan skanna den skriver du in nyckeln som visas under **Kan du inte skanna? Ange den här nyckeln:** i appen i stället.
3. Ange den **sexsiffriga koden** som appen visar och klicka på **Verifiera**.
4. B1 Admin visar tio **reservkoder**. Varje kod loggar in dig en gång om du tappar bort telefonen. Klicka på **Kopiera** eller skriv ned dem, förvara dem på ett säkert ställe och klicka på **Jag har sparat dem**.

:::warning
Reservkoderna visas bara en gång. Om du tappar bort telefonen och inte har några reservkoder kvar måste en serveradministratör för ChurchApps stänga av tvåfaktorsinloggningen för dig, efter att ha bekräftat vem du är.
:::

När tvåfaktorsinloggning är påslagen visar avsnittet **På** och hur många reservkoder du har kvar.

### Logga in med en kod

Efter att du har angett ditt lösenord frågar inloggningsskärmen efter en kod. Ange den sexsiffriga koden från din autentiseringsapp, eller en av dina reservkoder, och skicka in den. Varje reservkod fungerar bara en gång. Om koden är fel visas meddelandet "Den koden fungerade inte. Försök igen." Efter för många felaktiga koder pausas inloggningarna för ditt konto en stund.

Om du redan är inloggad på en enhet där du tidigare loggat in behöver du inte ange någon kod igen. Koden efterfrågas bara när du loggar in på nytt.

### Så stänger du av den

1. Klicka på **Stäng av** i avsnittet **Tvåfaktorsinloggning**.
2. Ange en aktuell kod från din autentiseringsapp, eller en reservkod.
3. Klicka på **Verifiera**.

:::info
Tvåfaktorsinloggning kan inte konfigureras för demokonton, så avsnittet är dolt där.
:::

## Temainställningar

B1 Admin låter dig välja ett färgtema och ett ljust eller mörkt visningsläge:

1. Klicka på din profilbild längst upp till höger i B1 Admin för att öppna din användarmeny.
2. Under **Temainställningar** väljer du ett tema:
   - **Standard** -- Det nuvarande utseendet i B1 Admin: ramade paneler på en ren bakgrund. Nya användare ser detta tema tills de väljer ett annat.
   - **Klassisk** -- Det tidigare utseendet i B1 Admin, med en färgad sidbanner, kort med skugga och en grå bakgrund. Om du använde B1 Admin på den här enheten innan det nya utseendet kom och aldrig valde ett tema, fortsätter du att använda Klassisk.
   - **Anpassad** -- Standardutseendet byggt på din kyrkas egen färg. Det använder primärfärgen för ljust läge från **Mobil > App-tema**, eller din webbplats primärfärg om ingen appfärg är angiven, så att B1 Admin matchar din medlemsapp.
3. Under temana väljer du **Ljust läge** eller **Mörkt läge**.
4. Gränssnittet uppdateras direkt för att spegla ditt val.

Dina val sparas på just den enheten och i just den webbläsaren.

## Radera konto

I avsnittet **Radera konto** på sidan Profil hittar du alternativet att radera ditt konto.

- Om din kyrka **inte** har konfigurerat en grupp för godkännande av katalogen tar det bort ditt konto och tillhörande data direkt när du klickar på **Radera mitt konto**. Det går inte att ångra.
- Om din kyrka **har** konfigurerat en grupp för godkännande av katalogen skickas din begäran i stället till den gruppen för granskning. Knappen är inaktiverad medan begäran väntar, och du får ett meddelande när din kyrka godkänner eller nekar den. Se [Granska begäranden om kontoradering](./account-deletion.md) för vad som händer härefter.

:::warning
Radering av konto -- oavsett om den sker direkt eller efter godkännande av din kyrka -- är permanent och kan inte ångras.
:::

:::info
Om du är **domänadministratör** ska du överföra administrativt ansvar till en annan användare innan du raderar ditt konto. Se [Roller och behörigheter](../settings/roles-permissions.md) för information om hur administratörsroller hanteras.
:::

:::info
Redigering av profilen är inaktiverad i demoläge. Om du använder ett demokonto kan du inte göra några ändringar i dina profilinställningar.
:::

## Nästa steg

- [Hantera enheter](./devices.md) -- Visa och hantera dina anslutna ChurchAppsPlayer-enheter
