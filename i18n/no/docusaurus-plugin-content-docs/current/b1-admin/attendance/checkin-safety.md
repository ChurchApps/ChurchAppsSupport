---
title: "Innsjekk-sikkerhet"
---

# Innsjekk-sikkerhet

<div class="article-intro">

B1 inkluderer et sett med barnesikkerhetskontroller for innsjekk: kapasitetsgrenser for rom og forhold mellom frivillige og barn, alders- og trinnveiledning ved kiosken, innsjekk-typer som skiller mellom medlemmer, gjester og frivillige, og en liste over betrodde hentepersoner per husstand som blir verifisert ved utsjekk. Denne siden dekker hvordan du konfigurerer hver sikkerhetsfunksjon i B1 Admin.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Sett opp [oppmøtestrukturen](setup.md) og [innsjekk-kioskene](check-in.md)
- Rom er [grupper](../groups/creating-groups.md) knyttet til gudstjenestetider -- sikkerhetsinnstillingene nedenfor ligger på gruppen
- Ring-en-forelder og nødvarsling krever en tilkoblet SMS-leverandør ([Text In Church](../integrations/services/text-in-church), [Clearstream](../integrations/services/clearstream), eller Mutual Ministry)

</div>

## Romkapasitet og stenging av et rom

Hvert innsjekk-rom (gruppe) kan håndheve sine egne grenser. Åpne gruppen, klikk på **blyant-ikonet** for å redigere innstillingene, og finn seksjonen **Innsjekk-kapasitet**:

- **Kapasitet** -- Det maksimale antallet personer som kan sjekkes inn i dette rommet samtidig. Når rommet er fullt, blokkeres innsjekk til det, og kiosken opplyser om at rommet er fullt.
- **Gjestekapasitet** -- En valgfri egen grense for hvor mange gjester rommet kan romme.
- **Stengt for innsjekk** -- Sett til **Ja** for å stanse all innsjekk til rommet umiddelbart (for eksempel når en klasse er avlyst eller et rom ikke er tilgjengelig). Utsjekk fungerer fortsatt.

## Forhold mellom frivillige og barn

Den samme seksjonen **Innsjekk-kapasitet** på gruppen inkluderer bemanningsregler:

- **Barn per frivillig** -- Det maksimale antallet barn hver innsjekkede frivillig kan dekke (f.eks. 5 betyr én frivillig per fem barn).
- **Minimum frivillige** -- Det laveste antallet frivillige som må være sjekket inn før barn kan sjekke inn i rommet.

Frivillige telles med i disse reglene når de sjekker inn med typen **Frivillig** ved kiosken (se [Innsjekk-typer](#check-in-types) nedenfor).

### Velge mellom advar og blokker

Hvor strengt forholdstallene håndheves, er en menighetsomfattende innstilling:

1. I B1 Admin, gå til **Innstillinger > Administrer menighet** og åpne **Innsjekk**-flisen.
2. Sett **Håndheving av frivillig-forhold**:
   - **Advar (tillat med bekreftelse)** -- Kiosken viser en advarsel når et rom overskrider forholdstallet eller er under minimum antall frivillige, og en ansatt kan bekrefte for å fortsette likevel. Dette er standardinnstillingen.
   - **Blokker (forhindre innsjekk)** -- Innsjekk til rommet avvises inntil nok frivillige er sjekket inn.

:::info
Kapasitet og Stengt for innsjekk er alltid harde grenser -- valget mellom advar/blokker gjelder kun forholdstallene for frivillige.
:::

## Innsjekk-typer

Hver innsjekking registrerer om personen er et **Medlem**, en **Gjest**, eller en **Frivillig**. Typen velges med brikker på kioskens husstandsskjerm (Medlem er standard). Typene mater sikkerhetsreglene -- frivillige gir forholdstalls-dekning, og gjester telles mot rommets gjestekapasitet.

## Alders- og trinnveiledning for rom

Du kan gi hvert rom alders- eller trinngrenser slik at kiosken veileder familier til passende rom:

- På gruppens innstillinger, bruk seksjonen **Alder og trinn** til å sette minimums-/maksimumsalder (år og måneder) og/eller trinn for rommet.
- Ved kiosken fremheves rom et barn kvalifiserer for, og rom det ikke kvalifiserer for, tones ned. Et nedtonet rom kan fortsatt velges med en ansattbekreftelse -- veiledningen blokkerer aldri fullstendig.

Trinn rulles over på menighetens **trinnforfremmelsesdato**:

1. I B1 Admin, gå til **Innstillinger > Administrer menighet** og åpne trinnforfremmelses-flisen.
2. Sett måneden og dagen menigheten din forfremmer elever (for eksempel 1. august). Alder og trinn ved kiosken beregnes fra den siste forfremmelsesdatoen.

## Betrodde og ikke-godkjente hentepersoner

Hver husstand kan ha en liste over personer som — eller ikke — har lov til å hente barna deres.

1. Åpne en persons side i **Personer** og finn **Henting**-kortet.
2. Klikk **Legg til**. Søk etter en eksisterende person, eller legg til noen som ikke finnes i systemet ved å angi deres **Navn**, **Relasjon**, og et bilde.
3. Sett **Status**:
   - **Betrodd** -- Ved utsjekk vises denne personen som et trykkbart hentekort med bildet sitt, noe som gjør verifisert henting raskt.
   - **Ikke godkjent** -- Hvis noen forsøker å hente under dette navnet, blokkerer kiosken utsjekk med en advarsel. En ansatt kan overstyre, og overstyringen registreres på oppmøteposten.

Klikk statusbrikken til en person på kortet for å veksle mellom Betrodd og Ikke godkjent.

:::tip
Legg til bilder av betrodde hentepersoner når det er mulig -- utsjekk-skjermen viser bildet slik at frivillige visuelt kan verifisere personen som står foran dem.
:::

## Ring-en-forelder og nødvarsling

Begge funksjonene sender tekstmeldinger gjennom menighetens tilkoblede SMS-leverandør -- det finnes ingen innebygd SMS-tjeneste, så en av de støttede leverandørene må konfigureres først.

- **Ring en forelder** -- Fra en bemannet kiosks utsjekk-skjerm kan ansatte sende SMS til et innsjekket barns foreldre/foresatte (for eksempel "Vennligst kom til barnehagerommet").
- **Nødvarsling** -- Fra kioskens administrasjonsinnstillinger kan ansatte sende SMS til alle innsjekkede husstanders foresatte for den valgte gudstjenesten samtidig. Sending krever at man skriver **EMERGENCY** for å bekrefte.

Personer som har reservert seg mot tekstmeldinger, eller som ikke har et mobilnummer registrert, hoppes automatisk over -- kiosken rapporterer hvor mange meldinger som ble sendt og hvor mange som ble hoppet over.

Se gjennomgangen på kiosk-siden i [Utsjekk og barnesikkerhet](../../b1-checkin/check-in/checking-out).

## Relaterte artikler

- [Innsjekk](check-in.md) — kioskoppsett og maskinvare
- [Utsjekk og barnesikkerhet](../../b1-checkin/check-in/checking-out) — kioskens utsjekk, hentebekreftelse og varslingsflyter
- [Opprette grupper](../groups/creating-groups.md) — hvor rominnstillingene ligger
- [Oppmøteoppsett](setup.md) — gudstjenester, gudstjenestetider og romtildelinger
