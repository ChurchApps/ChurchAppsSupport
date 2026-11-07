---
title: "Logga in"
---

# Logga in

<div class="article-intro">

Innan kiosken kan användas för incheckning måste du logga in med ett ChurchApps-konto som har åtkomst till din församling. Den här sidan beskriver den första inloggningen, val av församling, automatisk inloggning vid återbesök och hur du loggar ut.

</div>

<div class="prereqs">
<h4>Innan du börjar</h4>

- Installera B1 Church Checkin på din Android-surfplatta (se [Komma igång](./index.md))
- Ha din e-postadress och ditt lösenord för ChurchApps-kontot redo
- Kontot behöver behörigheten **Checkin** (eller **Redigera närvaro**) i din församling. En administratör lägger till den i B1 Admin under **Inställningar > Roller**. Se [Incheckningskiosk-konton](../../b1-admin/settings/roles-permissions.md#check-in-kiosk-accounts)

</div>

## Första inloggningen

1. Öppna appen B1 Church Checkin. Efter startbilden visas inloggningsskärmen med B1 Church Checkin-logotypen.
2. Ange din **e-postadress** i det första fältet.
3. Ange ditt **lösenord** i det andra fältet.
4. Tryck på knappen **Logga in**.

Appen verifierar dina uppgifter och loggar in dig. Om e-postadressen eller lösenordet är felaktigt visas ett felmeddelande längst ner på skärmen.

Om kontot har [tvåstegsverifiering](../../b1-admin/profile/managing-profile.md#two-factor-sign-in) aktiverad frågar appen sedan efter en kod. Ange den 6-siffriga koden från kontoägarens autentiseringsapp, eller en av deras reservkoder, och tryck på **Logga in** igen. Du behöver bara koden vid den här första inloggningen. Därefter förblir kiosken inloggad.

:::info
Det här är samma e-postadress och lösenord som du använder för B1 Admin eller någon annan ChurchApps-produkt. Du behöver inte ett separat konto för incheckningskiosken.
:::

## Välj din församling

Efter lyckad inloggning hämtar appen de församlingar där ditt konto har behörigheten **Checkin** eller **Redigera närvaro**. Församlingar där du bara har andra behörigheter utelämnas. Om inga finns kvar visar appen **Ingen åtkomst till incheckning** och ber dig att be din församlingsadministratör lägga till behörigheten Checkin till någon av dina roller. Varje församling visas som ett kort med församlingens namn och logotyp (om en har konfigurerats i B1 Admin).

- Om ditt konto bara är kopplat till **en församling** visas ändå väljarskärmen. Tryck på din församling för att fortsätta.
- Om ditt konto är kopplat till **flera församlingar** trycker du på den församling som kiosken ska användas för.

När du har valt en församling läser appen in den församlingens varumärkesprofil och utseendeinställningar. Din församlings logotyp visas i sidhuvudet på alla efterföljande skärmar.

## Automatisk inloggning vid återbesök

Efter den första lyckade inloggningen sparar appen en säker inloggningstoken och din valda församling på surfplattan. Den sparar inte ditt lösenord. Vid framtida starter gäller följande:

- Appen loggar in dig igen med den sparade token.
- Om du tidigare valt en församling återställs det valet och du tas direkt till **tjänstskärmen**.
- Om den sparade inloggningen inte längre är giltig återgår appen till inloggningsskärmen så att du kan logga in igen.

:::tip
Eftersom kiosken loggar in automatiskt behöver du bara ange dina uppgifter en gång vid den första konfigurationen. Därefter kan surfplattan slås på och är redo att användas.
:::

## Administratörsinställningar

Administratörsinställningarna är avsiktligt dolda så att församlingsmedlemmar som använder kiosken inte oavsiktligt ändrar konfigurationen. Så här öppnar du dem:

1. Tryck på **församlingens logotyp** i sidhuvudet **sju gånger** i snabb följd (inom två sekunder).
2. Om en kiosk-PIN-kod är angiven, ange PIN-koden när du uppmanas.
3. Skärmen **Administratörsinställningar** öppnas med följande alternativ:
   - **Byt tjänst**: växla till en annan vald tjänsttid
   - **Byt skrivare**: öppna [skrivarinställningarna](./printer-setup) för att söka efter och välja en skrivare
   - **Ange/ändra PIN-kod**: ange eller uppdatera kiosk-PIN-koden som skyddar administratörsåtkomsten
   - **Logga ut**: logga ut och återgå till inloggningsskärmen

:::warning
Att logga ut rensar alla sparade uppgifter och din valda församling. Du måste ange din e-postadress och ditt lösenord igen för att använda kiosken. Logga bara ut när du behöver byta konto eller konfigurera om kiosken.
:::

## Nästa steg

När du är inloggad kan du [konfigurera en skrivare](./printer-setup) eller gå direkt till [incheckningsflödet](../check-in/).
