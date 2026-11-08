---
title: "Logga in i B1 Church Checkin"
sidebar_label: "Inloggning"
description: "Logga in i kioskappen B1 Church Checkin, välj din kyrka och lär dig om automatisk inloggning, admininställningar och utloggning på incheckningsplattan."
---

# Inloggning

<div class="article-intro">

Innan kiosken kan användas för incheckning behöver du logga in med ett ChurchApps-konto som har åtkomst till din kyrka. Den här sidan beskriver den första inloggningen, val av kyrka, beteendet för automatisk inloggning och hur du loggar ut.

</div>

<div class="prereqs">
<h4>Innan du börjar</h4>

- Installera B1 Church Checkin på din Android-surfplatta (se [Komma igång](./index.md))
- Ha din e-postadress och ditt lösenord för ChurchApps-kontot till hands
- Kontot behöver behörigheten **Checkin** (eller **Redigera närvaro**) i din kyrka. En administratör lägger till den i B1 Admin under **Inställningar > Roller** — se [Konton för incheckningskiosk](../../b1-admin/settings/roles-permissions.md#check-in-kiosk-accounts)

</div>

## Första inloggningen

1. Öppna appen B1 Church Checkin. När startskärmen har visats ser du inloggningsskärmen med logotypen för B1 Church Checkin.
2. Ange din **e-postadress** i det första fältet.
3. Ange ditt **lösenord** i det andra fältet.
4. Tryck på knappen **Logga in**.

Appen verifierar dina uppgifter och loggar in dig. Om e-postadressen eller lösenordet är felaktigt visas ett felmeddelande längst ned på skärmen.

Om kontot har [tvåstegsverifiering](../../b1-admin/profile/managing-profile.md#two-factor-sign-in) aktiverad ber appen dig därefter om en kod. Ange den 6-siffriga koden från kontoinnehavarens autentiseringsapp, eller någon av deras reservkoder, och tryck på **Logga in** igen. Du behöver bara koden vid den här första inloggningen; efter det förblir kiosken inloggad.

:::info
Det här är samma e-postadress och lösenord som du använder för B1 Admin eller någon annan ChurchApps-produkt. Du behöver inget separat konto för incheckningskiosken.
:::

## Välja din kyrka

Efter en lyckad inloggning läser appen in de kyrkor där ditt konto har behörigheten **Checkin** eller **Redigera närvaro**. Kyrkor där du bara har andra behörigheter utelämnas. Om inga kyrkor återstår visar appen **Ingen åtkomst till incheckning** och ber dig be din kyrkoadministratör att lägga till Checkin-behörigheten i någon av dina roller. Varje kyrka visas som ett kort med kyrkans namn och logotyp (om en sådan har konfigurerats i B1 Admin).

- Om ditt konto bara är kopplat till **en kyrka** visas ändå väljarskärmen. Tryck på din kyrka för att fortsätta.
- Om ditt konto är kopplat till **flera kyrkor** trycker du på den kyrka som du vill att kiosken ska betjäna.

När du har valt en kyrka läser appen in den kyrkans varumärkesprofil och utseendeinställningar. Din kyrkas logotyp visas i sidhuvudet på alla efterföljande skärmar.

## Automatisk inloggning vid återbesök

Efter den första lyckade inloggningen sparar appen en säker inloggningstoken och din valda kyrka på surfplattan. Den sparar inte ditt lösenord. Vid framtida starter gäller följande:

- Appen loggar in dig igen med den sparade token.
- Om du tidigare valde en kyrka återställs det valet och du förs direkt till **tjänstskärmen**.
- Om den sparade inloggningen inte längre är giltig återgår appen till inloggningsskärmen så att du kan logga in igen.

:::tip
Eftersom kiosken loggar in automatiskt behöver du bara ange uppgifter en gång under den första konfigurationen. Därefter kan surfplattan slås på och är redo att användas.
:::

## Admininställningar

Admininställningarna är medvetet dolda så att kyrkomedlemmar som använder kiosken inte oavsiktligt ändrar konfigurationen. Så här öppnar du dem:

1. Tryck på **kyrkans logotyp** i sidhuvudet **sju gånger** i snabb följd (inom två sekunder).
2. Om en kiosk-PIN-kod är inställd anger du PIN-koden när du uppmanas till det.
3. Skärmen **Admininställningar** öppnas med följande alternativ:
   - **Byt tjänst** — byt vald gudstjänsttid
   - **Byt skrivare** — öppna [skrivarinställningar](./printer-setup.md) för att söka efter och välja en skrivare
   - **Ange admin-PIN** (eller **Ändra admin-PIN** när en redan är inställd) — ange eller uppdatera kiosk-PIN-koden som skyddar adminåtkomst
   - **Nödutskick** — skicka sms till vårdnadshavarna i alla incheckade hushåll (se [Nödutskick](../check-in/checking-out.md#emergency-broadcast))
   - **Bemannad station** — en omkopplare som lägger till utcheckning, personsökning, omutskrift och profilredigering till den här stationen (se [Utcheckning](../check-in/checking-out.md))
   - **Logga ut** — logga ut och återgå till inloggningsskärmen

   Tryck på **Tillbaka till kiosken** för att återgå till incheckningen.

:::warning
Om du loggar ut rensas alla sparade uppgifter och kyrkoval. Du måste ange din e-postadress och ditt lösenord igen för att använda kiosken. Logga bara ut när du behöver byta konto eller konfigurera om kiosken.
:::

## Nästa steg

När du är inloggad kan du [konfigurera en skrivare](./printer-setup.md) eller gå direkt till [incheckningsflödet](../check-in/index.md).
