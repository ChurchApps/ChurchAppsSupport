---
title: "Aanwezigenaantal invoeren & trend"
description: "Voer in B1 Admin een totaal aantal aanwezigen in voor een dienst of groep zonder naamlijst en volg die totalen week voor week in het Headcount Trend-rapport."
---

# Aanwezigenaantal invoeren & trend

<div class="article-intro">

Met een aanwezigenaantal (headcount) registreer je een eenvoudig totaal aan aanwezigen -- voor een dienst, een dienstijd of een groep -- zonder een genoemde ledenlijst af te vinken. Gebruik dit wanneer je alleen wilt weten "hoeveel mensen er waren", en combineer het met het rapport Headcount Trend om dat getal in de loop van de tijd te volgen.

</div>

<div class="prereqs">
<h4>Voordat je begint</h4>

- Je campussen, diensten en dienstijden moeten zijn ingesteld. Zie [Aanwezigheid instellen](setup.md).
- Een aanwezigenaantal invoeren vereist het recht **Attendance &gt; Edit**; het trendrapport bekijken vereist **Attendance &gt; View**. Zie [Rollen & rechten](../settings/roles-permissions.md).

</div>

:::info
Aanwezigenaantallen zijn een alternatief dat alleen het totaal bijhoudt, zonder namen, in plaats van [Aanwezigheid registreren](recording-attendance.md). Als je moet weten **wie** er aanwezig was -- bijvoorbeeld om contact op te nemen met mensen die niet meer zijn teruggekomen -- gebruik dan nog steeds de aanwezigheid per naam in de Sessions van een groep. Aanwezigenaantallen slaan alleen een getal op.
:::

## Een aanwezigenaantal registreren

1. Open **B1 Admin**, open het [Jump-menu](../introduction.md#getting-around-with-the-jump-menu) (de zoekbalk linksboven), vouw **People** uit en klik op **Attendance**.
2. Klik in de linkerkolom op **Enter headcount**.
3. Vul het formulier in:
   - **Service** *(verplicht)*
   - **Service Time** -- laat leeg om een totaal over alle dienstijden te registreren
   - **Group** -- optioneel; alleen groepen met Track Attendance ingeschakeld worden getoond. Laat leeg voor "No group (whole service)."
   - **Date** -- de datum
   - **Headcount** -- het totale aantal aanwezige personen
4. Klik op **Save**.

De tabel **Recent Headcounts** naast het formulier toont je laatste invoeren met datum, dienst, dienstijd, groep en aantal. Klik op een rij om die terug in het formulier te laden als je hem wilt corrigeren of verwijderen.

## Rapport Headcount Trend

1. Klik op dezelfde pagina **Attendance** in de linkerkolom op **All years** en selecteer vervolgens het tabblad **Headcount Trend**.
2. Gebruik de filters **Campus**, **Service**, **Service Time** en **Group** om het rapport te verfijnen.

Het rapport toont je geregistreerde aanwezigenaantallen per week opgeteld, zowel als lijndiagram als tabel -- in dezelfde stijl als de tabbladen [Attendance Trend en Group Attendance](tracking-attendance.md). Aanwezigenaantallen die voor de huidige week zijn ingevoerd, verschijnen ook onder **Headcounts this week** op de hoofdpagina van Attendance.

## Gerelateerde pagina's

- [Aanwezigheid registreren](recording-attendance.md) -- benoemde aanwezigheid per persoon per sessie
- [Aanwezigheid bijhouden](tracking-attendance.md) -- rapporten over aanwezigheid en groepstrends
- [Aanwezigheid instellen](setup.md) -- campussen, diensten en dienstijden configureren
