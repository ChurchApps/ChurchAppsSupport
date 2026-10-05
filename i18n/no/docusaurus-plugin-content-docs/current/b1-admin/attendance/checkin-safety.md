---
title: "Sikkerhet ved innsjekking"
---

# Sikkerhet ved innsjekking

<div class="article-intro">

B1 har en rekke sikkerhetsfunksjoner for barn ved innsjekking: kapasitetsgrenser for rom og forholdstall mellom frivillige og barn, veiledning om alder og klassetrinn på kiosken, innsjekkingstyper som skiller mellom medlemmer, gjester og frivillige, og en liste over betrodde hentepersoner per husstand som kontrolleres ved utsjekking. Denne siden viser hvordan du setter opp hver av sikkerhetsfunksjonene i B1 Admin.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Sett opp [strukturen for oppmøte](setup.md) og [innsjekkingskioskene](check-in.md)
- Rom er [grupper](../groups/creating-groups.md) koblet til samlingstidspunkter – sikkerhetsinnstillingene nedenfor ligger på gruppen
- Tilkalling av foresatte og nødvarsling krever en tilkoblet tekstmeldingstjeneste ([Text In Church](../integrations/services/text-in-church), [Clearstream](../integrations/services/clearstream) eller Mutual Ministry)

</div>

## Romkapasitet og stenging av rom

Hvert innsjekkingsrom (gruppe) kan ha sine egne grenser. Åpne gruppen, klikk på **blyantikonet** for å redigere innstillingene og finn seksjonen **Innsjekkingskapasitet**:

- **Kapasitet** -- Det høyeste antallet personer som kan være sjekket inn i rommet samtidig. Når rommet er fullt, blokkeres innsjekking dit, og kiosken viser navnet på det fulle rommet.
- **Gjestekapasitet** -- En valgfri, egen grense for hvor mange gjester rommet kan romme.
- **Stengt for innsjekking** -- Sett til **Ja** for å stoppe all innsjekking til rommet umiddelbart (for eksempel når en klasse er avlyst eller et rom ikke er tilgjengelig). Utsjekking fungerer fortsatt.

## Forholdstall for frivillige

Den samme seksjonen **Innsjekkingskapasitet** på gruppen inneholder regler for bemanning:

- **Barn per frivillig** -- Det høyeste antallet barn hver innsjekkede frivillige kan ha ansvar for (for eksempel betyr 5 én frivillig per fem barn).
- **Minimum frivillige** -- Det minste antallet frivillige som må være sjekket inn før barn kan sjekkes inn i rommet.

Frivillige teller med i disse reglene når de sjekker inn med typen **Frivillig** på kiosken (se [Innsjekkingstyper](#check-in-types) nedenfor).

### Velge mellom advarsel og blokkering

Hvor strengt forholdstallene håndheves, er en innstilling for hele menigheten:

1. Gå til **Innstillinger** i B1 Admin og åpne seksjonen **Innsjekking**.
2. Angi **Håndheving av forholdstall for frivillige**:
   - **Advarsel (tillat med bekreftelse)** -- Kiosken viser en advarsel når et rom har for mange barn per frivillig eller for få frivillige, og en medarbeider kan bekrefte for å fortsette likevel. Dette er standard.
   - **Blokker (hindre innsjekking)** -- Innsjekking til rommet nektes til nok frivillige er sjekket inn.

:::info
Kapasitet og Stengt for innsjekking er alltid harde grenser – valget mellom advarsel og blokkering gjelder bare forholdstallene for frivillige.
:::

## Innsjekkingstyper

Hver innsjekking registrerer om personen er **Medlem**, **Gjest** eller **Frivillig**. Typen velges med knapper på kioskens husstandsskjerm (Medlem er standard). Typene inngår i sikkerhetsreglene – frivillige gir dekning for forholdstallene, og gjester teller mot rommets gjestekapasitet.

## Veiledning om alder og klassetrinn for rom

Du kan angi alders- eller klassetrinnsgrenser for hvert rom, slik at kiosken veileder familiene til passende rom:

- I gruppens innstillinger bruker du seksjonen **Alder og klassetrinn** til å angi laveste/høyeste alder (år og måneder) og/eller klassetrinn for rommet.
- På kiosken utheves rom som barnet passer inn i, og rom som barnet ikke passer inn i, dempes. Et nedtonet rom kan likevel velges med bekreftelse fra en medarbeider – veiledningen blokkerer aldri helt.

Klassetrinn rulleres på menighetens **dato for opprykk**:

1. Gå til **Innstillinger** i B1 Admin og åpne seksjonen **Opprykk**.
2. Angi måneden og dagen menigheten rykker elever opp (for eksempel 1. august). Alder og klassetrinn på kiosken beregnes ut fra den siste opprykksdatoen.

## Betrodde og ikke-autoriserte hentepersoner

Hver husstand kan ha en liste over personer som har – eller ikke har – lov til å hente barna.

1. Åpne en persons side under **Personer** og finn kortet **Henting**.
2. Klikk på **Legg til**. Søk etter en eksisterende person, eller legg til noen som ikke finnes i systemet ved å fylle inn **Navn**, **Relasjon** og et bilde.
3. Angi **Status**:
   - **Betrodd** -- Ved utsjekking vises denne personen som et hentekort man kan trykke på, med bilde, slik at kontrollert henting går raskt.
   - **Ikke autorisert** -- Hvis noen forsøker å hente under dette navnet, blokkerer kiosken utsjekkingen med en advarsel. En medarbeider kan overstyre, og overstyringen registreres på oppmøteregistreringen.

Klikk på en persons statusmerke på kortet for å bytte mellom Betrodd og Ikke autorisert.

:::tip
Legg til bilder av betrodde hentepersoner når det er mulig – utsjekkingsskjermen viser bildet, slik at frivillige kan se at personen som står foran dem, er den rette.
:::

## Tilkalling av foresatte og nødvarsling

Begge funksjonene sender tekstmeldinger via menighetens tilkoblede tekstmeldingstjeneste – det finnes ingen innebygd SMS-tjeneste, så en av de støttede tjenestene må settes opp først.

- **Tilkalling av foresatte** -- Fra utsjekkingsskjermen på en bemannet kiosk kan medarbeidere sende tekstmelding til foreldrene/de foresatte til et innsjekket barn (for eksempel «Kom til barnehagen, takk»).
- **Nødvarsling** -- Fra kioskens administratorinnstillinger kan medarbeidere sende tekstmelding til de foresatte i alle innsjekkede husstander for den valgte samlingen på én gang. For å sende må du skrive **EMERGENCY** som bekreftelse.

Personer som har reservert seg mot tekstmeldinger, eller som ikke har registrert mobilnummer, hoppes automatisk over – kiosken viser hvor mange meldinger som ble sendt og hvor mange som ble hoppet over.

Se gjennomgangen fra kioskens side i [Utsjekking og barnesikkerhet](../../b1-checkin/check-in/checking-out).

## Relaterte artikler

- [Innsjekking](check-in.md) — oppsett av kiosk og utstyr
- [Utsjekking og barnesikkerhet](../../b1-checkin/check-in/checking-out) — utsjekking på kiosken, kontroll av henting og tilkalling
- [Opprette grupper](../groups/creating-groups.md) — her ligger rominnstillingene
- [Oppsett av oppmøte](setup.md) — gudstjenester, samlingstidspunkter og romtildeling
- [Minimumsalder for private meldinger](../settings/mobile-app.md#member-directory--messaging-settings) — blokkerer nye private samtaler med barn, samtidig som de forblir i medlemsregisteret
