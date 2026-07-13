---
title: "Sikkerhed ved check-in"
---

# Sikkerhed ved check-in

<div class="article-intro">

B1 indeholder et sæt sikkerhedskontroller for børn til check-in: kapacitetsgrænser for lokaler og forholdet mellem frivillige og børn, alders- og klassevejledning ved kiosken, check-in-typer der skelner mellem medlemmer, gæster og frivillige, samt en liste over betroede afhentere pr. husstand, som verificeres ved udtjekning. Denne side gennemgår, hvordan du konfigurerer hver sikkerhedsfunktion i B1 Admin.

</div>

<div class="prereqs">
<h4>Før du begynder</h4>

- Opsæt din [tilstedeværelsesstruktur](setup.md) og [check-in-kiosker](check-in.md)
- Lokaler er [grupper](../groups/creating-groups.md) knyttet til gudstjenestetider — sikkerhedsindstillingerne nedenfor findes på gruppen
- Tilkald-forælder og nødudsendelse kræver en forbundet SMS-udbyder ([Text In Church](../integrations/services/text-in-church), [Clearstream](../integrations/services/clearstream) eller Mutual Ministry)

</div>

## Lokalekapacitet og lukning af et lokale

Hvert check-in-lokale (gruppe) kan håndhæve sine egne grænser. Åbn gruppen, klik på **blyantikonet** for at redigere dens indstillinger, og find sektionen **Check-In-kapacitet**:

- **Kapacitet** -- Det maksimale antal personer, der kan tjekkes ind i dette lokale ad gangen. Når lokalet er fuldt, blokeres check-in til det, og kiosken navngiver det fulde lokale.
- **Gæstekapacitet** -- Et valgfrit separat loft for, hvor mange gæster lokalet kan rumme.
- **Lukket for check-in** -- Sæt til **Ja** for straks at stoppe al check-in til dette lokale (for eksempel når en klasse aflyses, eller et lokale ikke er tilgængeligt). Udtjekning fungerer stadig.

## Forholdet mellem frivillige og børn

Den samme sektion **Check-In-kapacitet** på gruppen indeholder bemandingsregler:

- **Børn pr. frivillig** -- Det maksimale antal børn, hver checket ind frivillig kan dække (f.eks. betyder 5, at der er én frivillig pr. fem børn).
- **Minimum frivillige** -- Det mindste antal frivillige, der skal være tjekket ind, før børn kan tjekkes ind i lokalet.

Frivillige tæller med i disse regler, når de tjekker ind med typen **Frivillig** på kiosken (se [Check-in-typer](#check-in-types) nedenfor).

### Valg mellem advarsel og blokering

Hvor strengt forholdene håndhæves, er en kirkedækkende indstilling:

1. Gå til **Indstillinger > Administrer kirke** i B1 Admin, og åbn feltet **Check-In**.
2. Indstil **Håndhævelse af frivillig-forhold**:
   - **Advar (tillad med bekræftelse)** -- Kiosken viser en advarsel, når et lokale overskrider forholdet eller er under sit minimum af frivillige, og et personalemedlem kan bekræfte for at fortsætte alligevel. Dette er standarden.
   - **Blokér (forhindrer check-in)** -- Check-in til lokalet afvises, indtil der er tjekket nok frivillige ind.

:::info
Kapacitet og Lukket for check-in er altid hårde grænser — valget mellem advar/blokér gælder kun for forholdet mellem frivillige og børn.
:::

## Check-in-typer

Hver check-in registrerer, om personen er et **Medlem**, en **Gæst** eller en **Frivillig**. Typen vælges med chips på kioskens husstandsskærm (Medlem er standard). Typerne fodrer sikkerhedsreglerne — frivillige giver forholdsdækning, og gæster tæller med i lokalets gæstekapacitet.

## Alders- og klassevejledning for lokaler

Du kan give hvert lokale alders- eller klassegrænser, så kiosken guider familier til passende lokaler:

- Brug sektionen **Alder & klasse** i gruppens indstillinger til at angive minimums-/maksimumsalder (år og måneder) og/eller klasse for lokalet.
- På kiosken fremhæves lokaler, som et barn kvalificerer sig til, mens lokaler, det ikke gør, nedtones. Et nedtonet lokale kan stadig vælges med en personalebekræftelse — vejledningen blokerer aldrig hårdt.

Klasser rykker op på din kirkes **dato for klasseoprykning**:

1. Gå til **Indstillinger > Administrer kirke** i B1 Admin, og åbn feltet for klasseoprykning.
2. Angiv måneden og dagen, hvor din kirke rykker eleverne op (for eksempel 1. august). Alder og klasse på kiosken beregnes ud fra den seneste oprykningsdato.

## Betroede og ikke-godkendte afhentere

Hver husstand kan have en liste over personer, der — eller ikke — må hente dens børn.

1. Åbn en persons side i **Folk**, og find kortet **Afhentning**.
2. Klik **Tilføj**. Søg efter en eksisterende person, eller tilføj en person, der ikke er i systemet, ved at indtaste deres **Navn**, **Relation** og et foto.
3. Angiv **Status**:
   - **Betroet** -- Ved udtjekning vises denne person som et trykbart afhentningskort med deres foto, hvilket gør verificeret afhentning hurtig.
   - **Ikke godkendt** -- Hvis nogen forsøger at hente under dette navn, blokerer kiosken udtjekning med en advarsel. Et personalemedlem kan tilsidesætte dette, og tilsidesættelsen registreres på tilstedeværelsesregistreringen.

Klik på en persons statuschip på kortet for at skifte mellem Betroet og Ikke godkendt.

:::tip
Tilføj fotos til betroede afhentere, når det er muligt — udtjekningsskærmen viser fotoet, så frivillige visuelt kan verificere personen, der står foran dem.
:::

## Tilkald-forælder og nødudsendelse

Begge funktioner sender sms-beskeder gennem din kirkes forbundne SMS-udbyder — der er ingen indbygget SMS-tjeneste, så en af de understøttede udbydere skal konfigureres først.

- **Tilkald forælder** -- Fra en bemandet kiosks udtjekningsskærm kan personalet sende en sms til et indtjekket barns forældre/værger (for eksempel "Kom venligst til vuggestuen").
- **Nødudsendelse** -- Fra kioskens administrationsindstillinger kan personalet sende en sms til alle indtjekkede husstandes værger for den valgte gudstjeneste på én gang. Afsendelse kræver, at man skriver **EMERGENCY** for at bekræfte.

Personer, der har fravalgt sms'er, eller som ikke har et mobilnummer registreret, springes automatisk over — kiosken rapporterer, hvor mange beskeder der blev sendt, og hvor mange der blev sprunget over.

Se gennemgangen på kiosksiden i [Udtjekning og børnesikkerhed](../../b1-checkin/check-in/checking-out).

## Relaterede artikler

- [Check-in](check-in.md) — kioskopsætning og hardware
- [Udtjekning og børnesikkerhed](../../b1-checkin/check-in/checking-out) — kioskens udtjekning, afhentningsverificering og tilkaldelsesforløb
- [Opret grupper](../groups/creating-groups.md) — hvor lokaleindstillinger findes
- [Opsætning af tilstedeværelse](setup.md) — gudstjenester, gudstjenestetider og lokaletildelinger
