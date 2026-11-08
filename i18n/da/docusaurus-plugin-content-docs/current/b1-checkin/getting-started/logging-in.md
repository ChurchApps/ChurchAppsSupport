---
title: "Log ind i B1 Church Checkin"
sidebar_label: "Log ind"
description: "Log ind i kiosk-appen B1 Church Checkin, vælg din kirke, og forstå automatisk login, adminindstillinger og log ud på check-in-tabletten."
---

# Log ind

<div class="article-intro">

Før kiosken kan bruges til check-in, skal du logge ind med en ChurchApps-konto, der har adgang til din kirke. Denne side dækker den første login-proces, valg af kirke, automatisk login og hvordan du logger ud.

</div>

<div class="prereqs">
<h4>Før du begynder</h4>

- Installer B1 Church Checkin på din Android-tablet (se [Kom i gang](./index.md))
- Have din ChurchApps-e-mail og adgangskode klar
- Kontoen skal have tilladelsen **Checkin** (eller **Redigér fremmøde**) i din kirke. En administrator tilføjer den i B1 Admin under **Indstillinger > Roller** — se [Check-in-kioskkonti](../../b1-admin/settings/roles-permissions.md#check-in-kiosk-accounts)

</div>

## Første gangs login

1. Åbn appen B1 Church Checkin. Efter opstartsskærmen ser du login-skærmen med B1 Church Checkin-logoet.
2. Indtast din **e-mailadresse** i det første felt.
3. Indtast din **adgangskode** i det andet felt.
4. Tryk på knappen **Log ind**.

Appen validerer dine oplysninger og logger dig ind. Hvis e-mailen eller adgangskoden er forkert, vises en fejlmeddelelse nederst på skærmen.

Hvis kontoen har [tofaktorlogin](../../b1-admin/profile/managing-profile.md#two-factor-sign-in) slået til, beder appen herefter om en kode. Indtast den 6-cifrede kode fra kontoejerens autentificeringsapp, eller en af deres backupkoder, og tryk på **Log ind** igen. Du skal kun bruge koden ved dette første login; herefter forbliver kiosken logget ind.

:::info
Det er den samme e-mail og adgangskode, du bruger til B1 Admin eller et andet ChurchApps-produkt. Du behøver ikke en separat konto til check-in-kiosken.
:::

## Valg af din kirke

Efter et vellykket login indlæser appen de kirker, hvor din konto har tilladelsen **Checkin** eller **Redigér fremmøde**. Kirker, hvor du kun har andre tilladelser, udelades. Hvis ingen er tilbage, viser appen **Ingen adgang til check-in** og beder dig få din kirkeadministrator til at tilføje Checkin-tilladelsen til en af dine roller. Hver kirke vises som et kort med kirkens navn og logo (hvis et er konfigureret i B1 Admin).

- Hvis din konto kun er knyttet til **én kirke**, vises valgskærmen stadig. Tryk på din kirke for at fortsætte.
- Hvis din konto er knyttet til **flere kirker**, skal du trykke på den kirke, som denne kiosk skal betjene.

Når du har valgt en kirke, indlæser appen kirkens branding- og udseendeindstillinger. Din kirkes logo vises i headeren på alle efterfølgende skærme.

## Automatisk login ved gentagne besøg

Efter det første vellykkede login gemmer appen et sikkert login-token og din valgte kirke på tabletten. Den gemmer ikke din adgangskode. Ved fremtidige opstarter:

- Appen logger dig automatisk ind igen med det gemte token.
- Hvis du tidligere valgte en kirke, genskaber appen valget og fører dig direkte til **gudstjenesteskærmen**.
- Hvis det gemte login ikke længere er gyldigt, vender appen tilbage til login-skærmen, så du kan logge ind igen.

:::tip
Fordi kiosken logger ind automatisk, skal du kun indtaste loginoplysninger én gang under den indledende opsætning. Herefter kan tabletten tændes, og den er klar til brug.
:::

## Adminindstillinger

Adminindstillinger er bevidst skjult, så kirkemedlemmer, der bruger kiosken, ikke ved en fejl kan ændre konfigurationen. Sådan får du adgang til dem:

1. Tryk syv gange hurtigt efter hinanden (inden for to sekunder) på **kirkens logo** i headeren.
2. Hvis der er angivet en kiosk-pinkode, skal du indtaste pinkoden, når du bliver bedt om det.
3. Skærmen **Adminindstillinger** åbnes med følgende muligheder:
   - **Skift gudstjeneste** — skift det valgte gudstjenestetidspunkt
   - **Skift printer** — åbn [printerindstillinger](./printer-setup.md) for at søge efter og vælge en printer
   - **Angiv admin-pinkode** (eller **Skift admin-pinkode**, når en er angivet) — angiv eller opdater kiosk-pinkoden, der beskytter adgangen til admin
   - **Nødudsendelse** — send sms til forældre eller værger for alle indtjekkede husstande (se [Nødudsendelse](../check-in/checking-out.md#emergency-broadcast))
   - **Bemandet stationstilstand** — en kontakt, der tilføjer udtjekning, sideopkald, genudskrivning og redigering af profiler til denne station (se [Udtjekning](../check-in/checking-out.md))
   - **Log ud** — log af og vend tilbage til login-skærmen

   Tryk på **Tilbage til kiosk** for at vende tilbage til check-in.

:::warning
At logge ud rydder alle gemte loginoplysninger og kirkevalget. Du skal indtaste din e-mail og adgangskode igen for at bruge kiosken. Log kun ud, når du skal skifte konto eller konfigurere kiosken igen.
:::

## Næste skridt

Når du er logget ind, kan du [opsætte en printer](./printer-setup.md) eller gå direkte til [check-in-arbejdsgangen](../check-in/index.md).
