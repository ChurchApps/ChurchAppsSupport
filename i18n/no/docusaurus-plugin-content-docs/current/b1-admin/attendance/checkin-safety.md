---
title: "Innsjekking sikkerhet"
---

# Innsjekking sikkerhet

<div class="article-intro">

B1 inkluderer et sett med barnevernsettingelser for innsjekking: romskapasitets grenser og frivillig-til-barn-forhold, alder- og klasseledning ved kiosken, innsjekking-typer som skiller medlemmer, gjester og frivillige, og en liste over pålitelige hentefolk per hushold som blir verifisert ved utsjekk. Denne siden dekker hvordan du konfigurerer hver sikkerhetsfunksjon i B1 Admin.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Sett opp [oppmøte-strukturen](setup.md) og [innsjekk-kioskene](check-in.md)
- Rom er [grupper](../groups/creating-groups.md) knyttet til gudstjenesteklokkeslett -- sikkerhetinnstillingene nedenfor befinner seg på gruppen
- Side-a-forelder og nødkringkast krever en tilkoblet teksttilbyders ([Text In Church](../integrations/services/text-in-church), [Clearstream](../integrations/services/clearstream), eller Mutual Ministry)

</div>

## Romskapasitet og lukking av rom

Hvert innsjekk-rom (gruppe) kan håndheve sine egne grenser. Åpne gruppen, klikk **blyant-ikonet** for å redigere innstillingene, og finn seksjonen **Innsjekking kapasitet**:

- **Kapasitet** -- Maksimalt antall mennesker som kan sjekkes inn i dette rommet på en gang. Når rommet er fullt, er innsjekking til det blokkert og kiosken navngir det fulle rommet.
- **Gjestkapasitet** -- En valgfri egen grense for hvor mange gjester rommet kan holde.
- **Stengt for innsjekking** -- Sett til **Ja** for å stoppe all innsjekking til dette rommet umiddelbart (for eksempel når en klasse blir kansellert eller et rom er utilgjengelig). Utsjekk fungerer fremdeles.

## Frivilliges forhold

Den samme seksjonen **Innsjekking kapasitet** på gruppen inkluderer personellregler:

- **Barn per frivillig** -- Maksimalt antall barn hver innsjekket frivillig kan dekke (f.eks. 5 betyr en frivillig per fem barn).
- **Minste frivillige** -- Det minste antallet frivillige som må sjekkes inn før barn kan sjekke inn i rommet.

Frivillige regnes med i disse reglene når de sjekker inn med **Frivillig**-typen ved kiosken (se [Innsjekk-typer](#check-in-types) nedenfor).

### Valg mellom advarsel og blokk

Hvordan forhold håndheves strengt, er en kirkeomfattende innstilling:

1. I B1 Admin, gå til **Innstillinger > Administrer kirke** og åpne **Innsjekking**-flisen.
2. Sett **Frivilliges forhold håndhevelse**:
   - **Advarsel (tillat med bekreftelse)** -- Kiosken viser en advarsel når et rom er over forhold eller under sine minste frivillige, og et ansatt medlem kan bekrefte for å fortsette uansett. Dette er standarden.
   - **Blokk (forhindrer innsjekking)** -- Innsjekking til rommet nektes til nok frivillige er innsjekket.

:::info
Kapasitet og Stengt for innsjekking er alltid harde grenser -- advarsel/blokkvalget gjelder kun for frivilliges forhold.
:::

## Innsjekk-typer

Hver innsjekking registrerer om personen er **Medlem**, **Gjest** eller **Frivillig**. Typen velges med brikker på kioskens husholdsside (medlem er standarden). Typer fører sikkerhetreglene -- frivillige gir forhold dekning, og gjester regnes mot romsbaskapasitet.

## Alder- og klasse-romledning

Du kan gi hvert rom alder- eller klassegrenser slik at kiosken veileder familier til passende rom:

- På gruppens innstillinger, bruk **Alder & klasse**-seksjonen for å sette minimum/maksimum alder (år og måneder) og/eller klasse for rommet.
- Ved kiosken er rom som et barn kvalifiserer for fremhevet og rom de ikke gjør er svekket. Et svaknet rom kan fortsatt velges med en stabsbekreftelse -- ledningen blokkerer aldri hardt.

Klasser ruller over på kirkens **klassefremme dato**:

1. I B1 Admin, gå til **Innstillinger > Administrer kirke** og åpne klassefremmeflisen.
2. Sett måneden og dagen kirken din fremmer elever (for eksempel 1. august). Alder og klasser ved kiosken beregnes fra den seneste fremmedatoen.

## Pålitelige og ikke-autoriserte hentefolk

Hvert hushold kan bære en liste over mennesker som -- eller ikke er -- tillatt å hente barna sine.

1. Åpne en persons side i **Mennesker** og finn **Hente**-kortet.
2. Klikk **Legg til**. Søk etter en eksisterende person, eller legg til noen ikke i systemet ved å angi deres **Navn**, **Relasjon** og et foto.
3. Sett **Status**:
   - **Pålitelig** -- Ved utsjekk vises denne personen som et trykk på hentekortet med fotoet deres, noe som gjør verifisert henting raskt.
   - **Ikke autorisert** -- Hvis noen prøver å hente under dette navnet, blokkerer kiosken utsjekk med en advarsel. Et ansatt medlem kan overstyre, og overstyringen registreres på oppmøteregistreringen.

Klikk en persons statusbrikke på kortet for å veksle mellom Pålitelig og Ikke autorisert.

:::tip
Legg til foto til pålitelige hentefolk når det er mulig -- utsjekk-skjermen viser fotoet slik at frivillige kan visuelt verifisere personen som står foran dem.
:::

## Side-a-forelder og nødkringkast

Begge funksjonene sender tekstmeldinger gjennom kirkens tilkoblede tekstleverandør -- det er ingen innebygd SMS-tjeneste, så en av de støttede leverandørene må konfigureres først.

- **Side en forelder** -- Fra en bemanna kiosks utsjekk-skjerm, kan ansatt sende tekstmelding til en innsjekket barns foreldre/foresatte (for eksempel, "Vær god og kom til barnehagen").
- **Nødkringkast** -- Fra kioskens admin-innstillinger, kan ansatt sende tekstmelding til alle innsjekkets husholds foresatte for den valgte gudstjenesten på en gang. Sending krever skriving av **EMERGENCY** for å bekrefte.

Mennesker som har meldt seg av tekster, eller som ikke har mobilnummer på fil, blir utelatt automatisk -- kiosken rapporterer hvor mange meldinger som ble sendt og hvor mange som ble utelatt.

Se walkthrough på kioskssiden i [Utsjekk & barnesikkerhet](../../b1-checkin/check-in/checking-out).

## Relaterte artikler

- [Innsjekking](check-in.md) -- kiosk-oppsett og maskinvare
- [Utsjekk & barnesikkerhet](../../b1-checkin/check-in/checking-out) -- kiosk-utsjekk, hente verifisering, og personfunksjoner
- [Opprett grupper](../groups/creating-groups.md) -- hvor rominnstillinger befinner seg
- [Oppmøte Setup](setup.md) -- gudstjenester, gudstjenesteklokkeslett, og romoppgaver
- [Minste alder for private meldinger](../settings/mobile-app.md#member-directory--messaging-settings) -- blokkerer nye samtaler om privat melding med barn mens du holder dem i mappen
