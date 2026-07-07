---
title: "Sjekkinn-sikkerhet"
---

# Sjekkinn-sikkerhet

<div class="article-intro">

B1 inkluderer et sett barnevernsregler for sjekking: romkapasitet grenser og frivillig-til-barn forhold, alder og klasse veiledning ved kioskjen, sjekkinn-typer som skiller medlemmer, gjester og frivillige, og en liste over pålitelige opphenter per husstand som verifiseres ved utsjekking. Denne siden dekker hvordan du konfigurerer hver sikkerhetsfunksjon i B1 Admin.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Sett opp din [oppmøte struktur](setup.md) og [sjekk-inn kioskjer](check-in.md)
- Rommene er [grupper](../groups/creating-groups.md) knyttet til servicetider -- sikkerhetstillingene nedenfor bor på gruppen
- Side-forelder og nødkringkasting krever en tilkoblet tekstleverandør ([Text In Church](../integrations/services/text-in-church), [Clearstream](../integrations/services/clearstream) eller Mutual Ministry)

</div>

## Romkapasitet og lukking av et rom

Hvert sjekk-inn-rom (gruppe) kan håndheve sine egne grenser. Åpne gruppen, klikk på **blyant-ikonet** for å redigere innstillingene, og finn **Sjekking Kapasitet**-seksjonen:

- **Kapasitet** -- Det maksimale antallet personer som kan sjekkes inn i dette rommet på en gang. Når rommet er fullt, blokkeres sjekking av det og kioskjen nevner det fulle rommet.
- **Gjestkapasitet** -- En valgfritt separat grense for hvor mange gjester rommet kan holde.
- **Lukket for sjekking** -- Sett til **Ja** for å stoppe all sjekking til dette rommet umiddelbart (for eksempel når en klasse blir avlyst eller et rom er utilgjengelig). Utheckinger fungerer fortsatt.

## Frivilligforhold

Den samme **Sjekking Kapasitet**-seksjonen på gruppen inkluderer bemanning regler:

- **Barn per frivillig** -- Det maksimale antallet barn hver innsjekket frivillig kan dekke (f.eks. 5 betyr en frivillig per fem barn).
- **Minimum frivillige** -- Det minste antallet frivillige som må sjekkes inn før barn kan sjekkes inn i rommet.

Frivillige teller mot disse reglene når de sjekker inn med **Frivillig**-typen ved kioskjen (se [Sjekkintyper](#check-in-types) nedenfor).

### Velge advarsel versus blokkering

Hvor strengt forhold håndheves er en kirkebred innstilling:

1. I B1 Admin, gå til **Innstillinger > Administrer kirke** og åpne **Sjekking**-flisen.
2. Sett **Frivillig forhold håndhevel**:
   - **Advarsel (tillat med bekrefting)** -- Kioskjen viser en advarsel når et rom er over forhold eller under dets minimum frivillige, og en ansatt kan bekrefte for å fortsette likevel. Dette er standard.
   - **Blokk (forhindrer sjekking)** -- Sjekking i rommet nektes til nok frivillige er sjekket inn.

:::info
Kapasitet og lukket for sjekking er alltid harde grenser -- advarsel/blokk-valget gjelder kun frivillig forhold.
:::

## Sjekkintyper

Hver sjekking registrerer om personen er en **Medlem**, **Gjest** eller **Frivillig**. Typen velges med chips på kioskjen husstand-skjerm (Medlem er standard). Typer gir sikkerhet reglene -- frivillige gir forhold dekning, og gjester teller mot rommet Gjest Kapasitet.

## Alder og klasse rom veiledning

Du kan gi hvert rom alder eller klasse grenser slik at kioskjen veileder familier til passende rom:

- På gruppens innstillinger, bruk **Alder & Klasse**-seksjonen for å sette minimum/maksimum alder (år og måneder) og/eller klasse for rommet.
- Ved kioskjen, er rom et barn kvalifiserer for fremhevet og rom de ikke er dim. Et dimmet rom kan fortsatt velges med en ansatt bekreftelse -- veiledningen er aldri hard-blokkerer.

Klasser ruller over på din kirkes **klassefremming dato**:

1. I B1 Admin, gå til **Innstillinger > Administrer kirke** og åpne klassefremming flisen.
2. Sett måneden og dagen din kirke promoterer studenter (for eksempel 1. august). Alder og klasser ved kioskjen beregnes fra den mest nylige fremming datoen.

## Pålitelig og ikke-autorisert opphent personer

Hver husstand kan bære en liste over mennesker som er - eller ikke er - tillatt å hente opp barna sine.

1. Åpne en persons side i **Folk** og finn **Opphent**-kortet.
2. Klikk **Legg til**. Søk etter en eksisterende person, eller legg til noen ikke i systemet ved å skrive inn deres **Navn**, **Forhold** og et bilde.
3. Sett **Statusen**:
   - **Pålitelig** -- Ved utsjekking, denne personen vises som et tappbar opphent kort med sitt bilde, gjør verifisert opphenting raskt.
   - **Ikke godkjent** -- Hvis noen forsøker opphent under dette navnet, blokkerer kioskjen utsjekking med en advarsel. En ansatt kan overstyre, og overstyringen registreres på oppmøte posten.

Klikk på en persons status chip på kortet for å veksle mellom pålitelig og ikke autorisert.

:::tip
Legg til bilder for pålitelige opphent mennesker når som helst mulig -- utsjekking skjermen viser bildet slik frivillige kan visuelt verifisere personen som står foran dem.
:::

## Side-forelder og nødkringkasting

Begge funksjonene sender tekstmeldinger gjennom din kirkes tilkoblede tekstleverandør -- det er ingen innebygd SMS-tjeneste, så en av de støttede leverandørene må konfigureres først.

- **Side en forelder** -- Fra en bemannt kioskjs utsjekking skjerm, kan personalet tekst en innsjekket barns foreldre/foresatte (for eksempel, "Vennligst kom til børnestuen").
- **Nødkringkasting** -- Fra kioskjs admin innstillinger, kan personalet tekst hver innsjekket husstands foresatte for den valgte tjenesten på en gang. Sending krever skriving av **NØDSSITUASJON** for å bekrefte.

Folk som har meldt seg ut av tekster, eller som ikke har mobilnummer på fil, hoppes over automatisk -- kioskjen rapporterer hvor mange meldinger som ble sendt og hvor mange som ble hoppet over.

Se kioskj-siden gjennomgang i [Utsjekking & barnevernssikkerhet](../../b1-checkin/check-in/checking-out).

## Relaterte artikler

- [Sjekking](check-in.md) -- kiosk oppsett og maskinvare
- [Utsjekking & barnevernssikkerhet](../../b1-checkin/check-in/checking-out) -- kioskj utsjekking, opphent verifikasjon og side flyter
- [Opprett grupper](../groups/creating-groups.md) -- hvor rominnstillinger bor
- [Oppmøte oppsett](setup.md) -- tjenester, servicetider og romavsignering
