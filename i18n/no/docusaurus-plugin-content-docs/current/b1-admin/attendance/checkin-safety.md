---
title: "Sikkerhet ved innsjekking"
---

# Sikkerhet ved innsjekking

<div class="article-intro">

B1 inkluderer et sett med sikkerhetskontroller for barn ved innsjekking: romskapasitetsgrenser og frivillig-til-barn-forhold, aldersog klasseveivising på kiosken, innsjekkingstyper som skiller medlemmer, gjester og frivillige, og en liste over godkjente uthentingspersoner per husstand som blir verifisert ved utsjekking. Denne siden dekker hvordan du konfigurerer hver sikkerhetsfunksjon i B1 Admin.

</div>

<div class="prereqs">
<h4>Før du starter</h4>

- Sett opp din [innsjekking-struktur](setup.md) og [innsjekk-kiosker](check-in.md)
- Rom er [grupper](../groups/creating-groups.md) som er knyttet til servicetider — sikkerhetinnstillingene nedenfor ligger på gruppen
- Page-a-parent og emergency broadcast krever en tilkoblet tekstmeldingsleverandør ([Text In Church](../integrations/services/text-in-church), [Clearstream](../integrations/services/clearstream), eller Mutual Ministry)

</div>

## Romskapasitet og lukking av rom

Hver innsjekk-rom (gruppe) kan håndheve sine egne grenser. Åpne gruppen, klikk på **blyant-ikonet** for å redigere innstillingene, og finn delen **Innsjekk-kapasitet**:

- **Kapasitet** -- Det maksimale antallet personer som kan sjekkes inn i dette rommet på en gang. Når rommet er fullt, blir innsjekking til det blokkert og kiosken viser at rommet er fullt.
- **Gjestkapasitet** -- En valgfri separat grense for hvor mange gjester rommet kan holde.
- **Lukket for innsjekking** -- Sett til **Ja** for å stoppe all innsjekking til dette rommet umiddelbart (for eksempel når en klasse blir kansellert eller et rom ikke er tilgjengelig). Utsjekk fungerer fortsatt.

## Frivillig-forhold

Den samme **Innsjekk-kapasitet**-delen på gruppen inkluderer bemanningsregler:

- **Barn per frivillig** -- Det maksimale antallet barn som hver innsjekket frivillig kan være ansvarlig for (for eksempel 5 betyr en frivillig per fem barn).
- **Minimum frivillige** -- Det minste antallet frivillige som må sjekkes inn før barn kan sjekkes inn i rommet.

Frivillige teller mot disse reglene når de sjekker inn med typen **Frivillig** på kiosken (se [Innsjekkingstyper](#innsjekkingstyper) nedenfor).

### Valg mellom advarsel og blokk

Hvor strengt forhold blir håndhevet er en innstilling for hele kirken:

1. Gå til **Innstillinger > Administrer kirke** i B1 Admin og åpne **Innsjekking**-flisen.
2. Sett **Håndhevelse av frivillig-forhold**:
   - **Advarsel (tillat med bekreftelse)** -- Kiosken viser en advarsel når et rom er over forhold eller under sine minimale frivillige, og en personalmedlem kan bekrefte for å fortsette likevel. Dette er standardinnstillingen.
   - **Blokk (forhindre innsjekking)** -- Innsjekking til rommet blir nektet inntil nok frivillige er innsjekket.

:::info
Kapasitet og Lukket for innsjekking er alltid harde grenser — valget advarsel/blokk gjelder kun frivillig-forhold.
:::

## Innsjekkingstyper

Hver innsjekking registrerer om personen er en **Medlem**, **Gjest**, eller **Frivillig**. Typen velges med brikker på kioskens husstandsskjerm (Medlem er standarden). Typer påvirker sikkerhetreglene — frivillige gir forholdsdekning, og gjester teller mot romskapasiteten for gjester.

## Aldersog klasseveivising for rom

Du kan gi hvert rom alderseller klassegrenser slik at kiosken guider familier til passende rom:

- Bruk **Alder & klasse**-delen på gruppens innstillinger for å angi minimum/maksimal alder (år og måneder) og/eller klasse for rommet.
- På kiosken er rom som et barn kvalifiserer for uthevet og rom de ikke gjør er dimmet. Et dimmet rom kan fortsatt velges med en personalbekreftelse — veiledningen blokkerer aldri hardt.

Klassetrinn rulles over på kirkens **klassepromoteringsdato**:

1. Gå til **Innstillinger > Administrer kirke** i B1 Admin og åpne flisen for klassepromoteringsdato.
2. Sett måneden og dagen kirken promoterer elever (for eksempel 1. august). Alder og klassetrinn på kiosken beregnes fra den seneste promoteringsdatoen.

## Godkjente og ikke-autoriserte uthentingspersoner

Hver husstand kan ha en liste over personer som — eller ikke er — tillatt å hente ut barnene sine.

1. Åpne en persons side i **Personer** og finn **Uthenting**-kortet.
2. Klikk **Legg til**. Søk etter en eksisterende person, eller legg til noen som ikke er i systemet ved å angi deres **Navn**, **Forhold** og et foto.
3. Sett **Status**:
   - **Godkjent** -- Ved utsjekking vises denne personen som et uthentingskort med fotoet sitt, noe som gjør verifisert uthenting raskt.
   - **Ikke autorisert** -- Hvis noen prøver uthenting under dette navnet, blokkerer kiosken utsjekking med en advarsel. En personalmedlem kan åsidosette, og åsidosetelsen er registrert på innsjekk-posten.

Klikk en persons statusbrikke på kortet for å veksle mellom Godkjent og Ikke autorisert.

:::tip
Legg til fotos til godkjente uthentingspersoner når det er mulig — utsjekk-skjermen viser fotoet slik at frivillige kan visuelt bekrefte personen som står foran dem.
:::

## Page-a-parent og nødsendelse

Begge funksjoner sender tekstmeldinger gjennom kirkens tilkoblede tekstmeldingsleverandør — det er ingen innebygd SMS-tjeneste, så en av de støttede leverandørene må konfigureres først.

- **Page a parent** -- Fra en bemannt kiosks utsjekk-skjerm kan personalet sende tekstmelding til en innsjekket barns foreldre/foresatte (for eksempel "Vennligst kom til barnestugen").
- **Nødsendelse** -- Fra kiosken admin-innstillinger kan personalet sende tekstmelding til hver innsjekket husstands foresatte for den valgte servicen på en gang. Sending krever at du skriver **EMERGENCY** for å bekrefte.

Personer som har valgt bort tekstmeldinger, eller som ikke har mobilnummer på fil, hoppes automatisk over — kiosken rapporterer hvor mange meldinger som ble sendt og hvor mange som ble hoppet over.

Se kioskside-gjennomgangen i [Utsjekking og barnesikkerhet](../../b1-checkin/check-in/checking-out).

## Relaterte artikler

- [Innsjekking](check-in.md) — kiosk-oppsett og maskinvare
- [Utsjekking og barnesikkerhet](../../b1-checkin/check-in/checking-out) — kiosk utsjekk, uthentingsverifisering og paging-flyter
- [Opprette grupper](../groups/creating-groups.md) — hvor rominnstillinger ligger
- [Innsjekking-oppsett](setup.md) — tjenester, servicetider og romtildelinger
- [Minimumsalder for private meldinger](../settings/mobile-app.md#member-directory--messaging-settings) — blokkerer nye private-meldingssamtaler med barn mens de holdes i mappen
