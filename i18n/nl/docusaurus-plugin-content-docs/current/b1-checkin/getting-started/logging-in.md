---
title: "Inloggen bij B1 Church Checkin"
sidebar_label: "Inloggen"
description: "Meld u aan bij de B1 Church Checkin-kioskapp, kies uw kerk en lees over automatisch inloggen, beheerinstellingen en uitloggen op de incheck-tablet."
---

# Inloggen

<div class="article-intro">

Voordat de kiosk voor inchecken kan worden gebruikt, moet u zich aanmelden met een ChurchApps-account dat toegang heeft tot uw kerk. Deze pagina behandelt het eerste inlogproces, de kerkselectie, het gedrag van automatisch inloggen en hoe u uitlogt.

</div>

<div class="prereqs">
<h4>Voordat u begint</h4>

- Installeer B1 Church Checkin op uw Android-tablet (zie [Aan de slag](./index.md))
- Zorg dat u uw e-mailadres en wachtwoord voor uw ChurchApps-account bij de hand hebt
- Het account heeft het recht **Checkin** (of **Aanwezigheid bewerken**) nodig bij uw kerk. Een beheerder voegt dit toe in B1 Admin onder **Instellingen > Rollen**. Zie [Accounts voor incheckkiosken](../../b1-admin/settings/roles-permissions.md#check-in-kiosk-accounts)

</div>

## Eerste keer inloggen

1. Open de app B1 Church Checkin. Na het startscherm ziet u het inlogscherm met het logo van B1 Church Checkin.
2. Voer uw **e-mailadres** in het eerste veld in.
3. Voer uw **wachtwoord** in het tweede veld in.
4. Tik op de knop **Inloggen**.

De app controleert uw gegevens en meldt u aan. Als het e-mailadres of wachtwoord onjuist is, ziet u onderaan het scherm een foutmelding.

Als voor het account [tweestapsverificatie](../../b1-admin/profile/managing-profile.md#two-factor-sign-in) is ingeschakeld, vraagt de app daarna om een code. Voer de 6-cijferige code in uit de authenticator-app van de accounteigenaar, of een van de back-upcodes, en tik opnieuw op **Inloggen**. U hebt de code alleen nodig bij deze eerste keer inloggen. Daarna blijft de kiosk ingelogd.

:::info
Dit zijn dezelfde e-mail en hetzelfde wachtwoord die u gebruikt voor B1 Admin of een ander ChurchApps-product. U hebt geen apart account nodig voor de incheckkiosk.
:::

## Uw kerk selecteren

Na een geslaagde inlog laadt de app de kerken waar uw account het recht **Checkin** of **Aanwezigheid bewerken** heeft. Kerken waar u alleen andere rechten hebt, worden weggelaten. Als er geen over blijven, toont de app **Geen toegang tot inchecken** en vraagt de app u uw kerkbeheerder te laten het Checkin-recht toe te voegen aan een van uw rollen. Elke kerk wordt getoond als kaart met de naam en het logo van de kerk (als dat in B1 Admin is ingesteld).

- Als uw account aan **slechts één kerk** is gekoppeld, ziet u toch het selectiescherm. Tik op uw kerk om door te gaan.
- Als uw account aan **meerdere kerken** is gekoppeld, tik dan op de kerk die deze kiosk moet bedienen.

Zodra u een kerk selecteert, laadt de app de huisstijl en weergave-instellingen van die kerk. Het logo van uw kerk verschijnt daarna in de koptekst op alle volgende schermen.

## Automatisch inloggen bij terugkerende bezoeken

Na de eerste geslaagde inlog bewaart de app op de tablet een veilig inlogtoken en de door u geselecteerde kerk. Uw wachtwoord wordt niet opgeslagen. Bij de volgende keren dat de app wordt geopend:

- Meldt de app u automatisch opnieuw aan met het opgeslagen token.
- Als u eerder een kerk had geselecteerd, herstelt de app die keuze en gaat direct naar het **scherm met diensten**.
- Als de opgeslagen inlog niet meer geldig is, keert de app terug naar het inlogscherm zodat u opnieuw kunt inloggen.

:::tip
Omdat de kiosk automatisch inlogt, hoeft u de inloggegevens alleen bij de eerste installatie in te voeren. Daarna kan de tablet worden ingeschakeld en is hij meteen klaar voor gebruik.
:::

## Beheerinstellingen

Beheerinstellingen zijn bewust verborgen, zodat kerkleden die de kiosk gebruiken de configuratie niet per ongeluk kunnen wijzigen. Om ze te openen:

1. Tik zeven keer snel achter elkaar (binnen twee seconden) op het **kerklogo** in de koptekst.
2. Als er een kiosk-pincode is ingesteld, voer dan de pincode in wanneer daarom wordt gevraagd.
3. Het scherm **Beheerinstellingen** opent met de volgende opties:
   - **Dienst wijzigen**: wissel de geselecteerde diensttijd
   - **Printer wijzigen**: open de [printerinstellingen](./printer-setup.md) om naar een printer te zoeken en die te selecteren
   - **Beheer-pincode instellen** (of **Beheer-pincode wijzigen** zodra die is ingesteld): stel de kiosk-pincode in of wijzig deze. Die pincode beschermt de beheertoegang.
   - **Noodbroadcast**: stuur een sms naar de voogden van elk ingecheckt gezin (zie [Noodbroadcast](../check-in/checking-out.md#emergency-broadcast))
   - **Modus bemande post**: een schakelaar die uitchecken, oproepen, opnieuw afdrukken en profielbewerking aan dit station toevoegt (zie [Uitchecken](../check-in/checking-out.md))
   - **Uitloggen**: meld af en keer terug naar het inlogscherm

   Tik op **Terug naar kiosk** om terug te keren naar inchecken.

:::warning
Uitloggen wist alle opgeslagen inloggegevens en de kerkselectie. U moet uw e-mailadres en wachtwoord opnieuw invoeren om de kiosk weer te gebruiken. Log alleen uit wanneer u van account wilt wisselen of de kiosk opnieuw wilt configureren.
:::

## Volgende stappen

Zodra u bent ingelogd, kunt u [een printer instellen](./printer-setup.md) of direct naar de [incheckworkflow](../check-in/index.md) gaan.
