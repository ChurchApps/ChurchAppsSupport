---
title: "Tilldela roller"
description: "Tilldela roller i B1 Admin så att personal och volontärer får tillgång endast till de områden för personer, gåvor, närvaro och grupper som de behöver."
---

# Tilldela roller

<div class="article-intro">

B1 Admin använder ett rollbaserat behörighetssystem för att styra vad varje användare i ditt team kan se och göra. Genom att tilldela roller kan du ge personal och volontärer åtkomst till exakt de områden de behöver, och inget mer. Bra rollhantering skyddar kyrkans data och gör att ditt team kan arbeta effektivt.

</div>

<div class="prereqs">
<h4>Innan du börjar</h4>

- Du behöver åtkomst som **Domain Admin** eller en roll med behörighet att hantera **Inställningar** i B1 Admin.
- Personerna du vill tilldela roller till måste redan finnas i din katalog. Se [Lägga till personer](adding-people.md) om du behöver lägga till dem först.

</div>

## Förstå roller

En roll är en uppsättning behörigheter som du tilldelar en eller flera användare. Du kan till exempel skapa en roll "Ekonomiteam" som ger åtkomst till [gåvoregistreringar](../donations/recording-donations.md), eller en roll "Incheckningsvolontär" som endast ger åtkomst till [närvarofunktioner](../attendance/check-in.md).

Varje roll styr åtkomst till specifika områden i B1 Admin, bland annat:

- **Personer** -- visa och redigera medlemsprofiler. Avsnittet Anteckningar på en personpost kräver **Redigera personer**, och en separat behörighet, **Visa konfidentiella anteckningar**, styr åtkomst till avsnittet Konfidentiella anteckningar (för själavård, personlig historik och liknande känsliga anteckningar). **Visa endast personers namn** låter någon söka upp personer med namn (där endast namn, foto och medlemsstatus syns) utan åtkomst till hela katalogen. Tillsammans med **Visa närvaro** eller **Redigera närvaro** kan en volontär öppna **Grupper** och se klasslistor med namn; med **Redigera närvaro** kan de dessutom [registrera närvaro](../attendance/recording-attendance.md). Se [Endast personers namn](../settings/roles-permissions.md#people-names-only).
- **Gåvor** -- hantera bidrag och ekonomiska rapporter. **Registrera gåvor** är ett smalare alternativ för räkneteam: det låter någon registrera gåvor, men endast i [batcher](../donations/batches.md#who-can-change-a-batch) som fortfarande är öppna.
- **Närvaro** -- registrera och visa närvarodata
- **Formulär** -- skapa och hantera [anpassade formulär](../forms/creating-forms.md)
- **Grupper** -- hantera [gruppmedlemskap](../groups/group-members.md) och kalendrar
- **Inställningar** -- konfigurera kyrkoövergripande inställningar

:::warning
**Domain Admins** har full åtkomst till alla områden i B1 Admin. Deras behörigheter kan inte redigeras eller begränsas. Använd denna roll endast för dina huvudsakliga administratörer.
:::

## Visa och hantera roller

1. Öppna [Hoppmenyn](../introduction.md#getting-around-with-the-jump-menu) (sökfältet längst upp till vänster i B1 Admin) och expandera **Inställningar**.
2. Klicka på **Roller**.
3. Du ser en lista över alla roller som är konfigurerade för din kyrka, med en kolumn **Medlemmar** som visar hur många användare som finns i varje roll.
4. Klicka på en roll för att visa dess medlemmar och behörigheter.

## Lägga till användare i en roll

1. I Hoppmenyn väljer du **Inställningar > Roller**.
2. Klicka på den roll du vill lägga till en användare i.
3. Under avsnittet **Medlemmar** söker du efter personen med namn.
4. Klicka på **Lägg till** för att tilldela personen till rollen.

Användaren får alla behörigheter som hör till rollen nästa gång de loggar in.

## Redigera rollbehörigheter

1. I Hoppmenyn väljer du **Inställningar > Roller**.
2. Klicka på den roll du vill ändra.
3. Under avsnittet **Behörigheter** markerar eller avmarkerar du de områden du vill att rollen ska ha åtkomst till. Varje behörighetsgrupp visar hur många av dess behörigheter som är markerade (till exempel **2 av 5**).
4. Varje ändring sparas så snart du markerar eller avmarkerar en ruta.

:::tip
Följ principen om minsta möjliga behörighet -- ge varje roll endast de behörigheter den verkligen behöver. Detta håller dina data säkra och minskar risken för oavsiktliga ändringar.
:::

## Vanliga rollexempel

- **Kontorspersonal** -- åtkomst till Personer, Gåvor, Närvaro och Formulär
- **Gruppledare** -- åtkomst endast till [Grupper](../groups/creating-groups.md)
- **Incheckningsvolontärer** -- behörigheten **Checkin** för närvaro, vilket krävs för kontot som loggar in på en [incheckningskiosk](../attendance/check-in.md)
- **Ekonomiteam** -- åtkomst till [Gåvor](../donations/recording-donations.md) och rapportering
- **Räkneteam** -- **Registrera gåvor** och **Visa gåvor**, så att volontärer kan registrera kollekten i öppna batcher utan att se givarsammanställningar

Se [Roller och behörigheter](../settings/roles-permissions.md) för en närmare titt på behörigheterna för gåvor och personer.
