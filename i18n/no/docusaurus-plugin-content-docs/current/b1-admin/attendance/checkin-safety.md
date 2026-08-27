---
title: "Sikkerhet ved innsjekking"
---

# Sikkerhet ved innsjekking

<div class="article-intro">

B1 inneholder et sett med sikkerhetskontroller for barns sikkerhet under innsjekking: grenser for romkapasitet og frivillig-til-barn-forhold, alders- og klassetrinveiledning ved selvbetjent skjerm, innsjekkingstyper som skiller medlemmer, gjester og frivillige, og en liste over pålitelige hentepersoner per husstand som blir verifisert ved utsjekking. Denne siden dekker hvordan du konfigurerer hver sikkerhetsfunksjon i B1 Admin.

</div>

<div class="prereqs">
<h4>Før du starter</h4>

- Sett opp din [oppsett av oppmøte](setup.md) og [innsjekkingsterminaler](check-in.md)
- Rom er [grupper](../groups/creating-groups.md) knyttet til tider for gudstjeneste — sikkerhetisinnstillingene nedenfor ligger på gruppen
- Page-a-parent og nødkringkast krever en tilkoblet tekstingsleverandør ([Text In Church](../integrations/services/text-in-church), [Clearstream](../integrations/services/clearstream), eller Mutual Ministry)

</div>

## Romkapasitet og lukking av rom

Hvert innsjekking-rom (gruppe) kan håndheve sine egne grenser. Åpne gruppen, klikk på **blyantsymbolen** for å redigere innstillingene, og finn **Innsjekking-kapasitet**-delen:

- **Kapasitet** -- Det maksimale antallet mennesker som kan sjekkes inn til dette rommet på samme tid. Når rommet er fullt, blokkeres innsjekking til det og terminalen viser at rommet er fullt.
- **Gjestekapasitet** -- En valgfri separat grense for hvor mange gjester rommet kan holde.
- **Lukket for innsjekking** -- Sett til **Ja** for å stoppe all innsjekking til dette rommet umiddelbart (for eksempel når en klasse blir avlyst eller et rom er utilgjengelig). Utsjekking fungerer fortsatt.

## Frivillig-til-barn-forhold

Den samme **Innsjekking-kapasitet**-delen på gruppen inkluderer personalebestemmelser:

- **Barn per frivillig** -- Det maksimale antallet barn som hver innsjekket frivillig kan dekke (f.eks. 5 betyr en frivillig per fem barn).
- **Minimum frivillige** -- Det minste antallet frivillige som må være innsjekket før barn kan sjekkes inn på rommet.

Frivillige teller mot disse reglene når de sjekker inn med **Frivillig**-typen ved terminalen (se [Innsjekking-typer](#innsjekking-typer) nedenfor).

### Valg av advarsel vs. blokkering

Hvor streng håndheving av forhold er en kirkelig innstilling:

1. I B1 Admin, gå til **Innstillinger > Administrer kirke** og åpne **Innsjekking**-flisen.
2. Sett **Håndheving av frivillig-forhold**:
   - **Advarsel (tillat med bekreftelse)** -- Terminalen viser en advarsel når et rom er over forhold eller under minimumsantallet frivillige, og en stab-medlem kan bekrefte for å fortsette likevel. Dette er standard.
   - **Blokker (forhindrer innsjekking)** -- Innsjekking til rommet blir nektet inntil nok frivillige er innsjekket.

:::info
Kapasitet og Lukket for innsjekking er alltid harde grenser — advarsel/blokker-valget gjelder bare for frivillig-forhold.
:::

## Innsjekking-typer

Hver innsjekking registrerer om personen er en **Medlem**, **Gjest**, eller **Frivillig**. Typen velges med knapper på husholdningsskjermen til terminalen (Medlem er standard). Typer påvirker sikkerheetsreglene — frivillige gir forhold-dekning, og gjester teller mot romets gjestekapasitet.

## Alders- og klassetrinveiledning for rom

Du kan gi hvert rom alders- eller klassetrinn-grenser slik at terminalen veileder familier til passende rom:

- På gruppens innstillinger, bruk **Alder & klassetrinn**-delen for å sette minimum/maksimum alder (år og måneder) og/eller klassetrinn for rommet.
- Ved terminalen, fremheves rom som et barn kvalifiserer for og rom de ikke gjør blir nedtonet. Et nedtonet rom kan fortsatt velges med stab-bekreftelse — veiledningen blokkerer aldri.

Klassetrinn ruller over på kirkens **dato for klassetrinn-forfremmelse**:

1. I B1 Admin, gå til **Innstillinger > Administrer kirke** og åpne flisen for klassetrinn-forfremmelse.
2. Sett måneden og dagen kirken promoverer elever (for eksempel 1. august). Aldre og klassetrinn ved terminalen beregnes fra den siste promoteringsdatoen.

## Pålitelige og ikke-autoriserte hentepersoner

Hver husstand kan ha en liste over mennesker som — eller ikke — er tillatt å hente barna.

1. Åpne en persons side i **Mennesker** og finn **Hente**-kortet.
2. Klikk **Legg til**. Søk etter en eksisterende person, eller legg til noen som ikke er i systemet ved å skrive inn deres **Navn**, **Forhold**, og et foto.
3. Sett **Status**:
   - **Pålitelig** -- Ved utsjekking vises denne personen som et klikk-hente-kort med deres foto, noe som gjør verifisert henting rask.
   - **Ikke autorisert** -- Hvis noen forsøker å hente barn under dette navnet, blokkerer terminalen utsjekking med en advarsel. En stab-medlem kan overstyre, og overstyringen blir registrert på innsjekkings-posten.

Klikk på status-knappen til en person på kortet for å bytte mellom Pålitelig og Ikke autorisert.

:::tip
Legg til fotos av pålitelige hentepersoner når det er mulig — utsjekking-skjermen viser fotoet slik at frivillige kan visuelt verifisere personen som står foran dem.
:::

## Page-a-parent og nødkringkast

Begge funktionene sender tekstmeldinger gjennom kirkens tilkoblede tekstingsleverandør — det er ingen innebygd SMS-tjeneste, så en av de støttede leverandørene må konfigureres først.

- **Page a parent** -- Fra en betjent terminals utsjekking-skjerm, kan stab sende tekstmelding til en innsjekket barms foreldre/verger (for eksempel, "Kom vær så snill til barnehagen").
- **Nødkringkast** -- Fra terminals administrasjons-innstillinger, kan stab sende tekstmelding til hver innsjekket husholds verger for den valgte gudstjenesten på en gang. Sending krever at du skriver **NØDTILFELLE** for å bekrefte.

Mennesker som har meldt seg av tekstmeldinger, eller som ikke har mobilnummer på fil, blir hoppet over automatisk — terminalen rapporterer hvor mange meldinger som ble sendt og hvor mange som ble hoppet over.

Se terminalsiden gjennomgangen i [Utsjekking & barns sikkerhet](../../b1-checkin/check-in/checking-out).

## Relaterte artikler

- [Innsjekking](check-in.md) — terminal oppsett og maskinvare
- [Utsjekking & barns sikkerhet](../../b1-checkin/check-in/checking-out) — terminal utsjekking, henteveifisering, og page-funksjoner
- [Opprett grupper](../groups/creating-groups.md) — hvor romsinnstillingene ligger
- [Oppsett av oppmøte](setup.md) — gudstjenester, tider for gudstjeneste, og romdokumenter
- [Minimum alder for private meldinger](../settings/mobile-app.md#medlem-katalog--meldingsinnstillinger) — blokkerer nye private-melding-samtaler med barn mens de holdes i katalogen
