---
title: "Registrere oppmøte"
---

# Registrere oppmøte

<div class="article-intro">

Når campuser, samlingstidspunkter og grupper er satt opp, kan du registrere oppmøte manuelt etter hver samling. B1 Admin organiserer oppmøte rundt **økter** -- én økt per gruppe per møtedato. Du oppretter økten, markerer hvem som kom, og dataene går rett inn i oppmøterapportene dine.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Campuser, samlingstidspunkter og grupper må være satt opp. Se [Oppsett av oppmøte](setup.md) hvis du ikke har gjort dette ennå.
- Gruppene du vil følge, må ha **Registrer oppmøte** aktivert. Se [Oppsett av oppmøte](setup.md) for detaljer.

</div>

## Opprette en økt

En økt er ett møte i en gruppe -- for eksempel klassen for 1.–3. trinn en bestemt søndag.

1. Åpne **B1 Admin**, åpne [Jump-menyen](../introduction.md#getting-around-with-the-jump-menu) (søkefeltet øverst til venstre), utvid **Personer** og klikk på **Grupper**.
2. Velg gruppen du vil registrere oppmøte for.
3. Klikk på fanen **Økter**.
4. Klikk på **Ny** for å opprette en ny økt.
5. Hvis gruppen er tilordnet et samlingstidspunkt, velger du **Samlingstidspunkt**. Hvis gruppen ikke har noen tidsplan, vises ikke dette feltet.
6. Velg **Øktdato** -- det kan være i dag, en tidligere dato eller en fremtidig dato.
7. Klikk på **Lagre**.

### Legge til økter for alle klasser i et samlingstidspunkt

Hvis andre grupper møtes på samme samlingstidspunkt (for eksempel alle barneklassene søndag kl. 9.00), kan du opprette øktene deres i ett steg i stedet for å åpne hver enkelt gruppe.

1. Følg trinnene ovenfor og velg et **Samlingstidspunkt**.
2. Kryss av for **Legg også til for de andre _N_ gruppene i _samlingstidspunkt_**. Avkrysningsboksen viser hvor mange andre grupper som er tilordnet samlingstidspunktet. Den vises bare når du legger til en ny økt og minst én annen gruppe møtes på det tidspunktet.
3. Klikk på **Lagre**.

Det opprettes en økt for den aktuelle gruppen og for hver av de andre gruppene på samme dato og samlingstidspunkt. Grupper som allerede har en økt for den datoen og det samlingstidspunktet, hoppes over, så du får ingen duplikater.

:::tip
Du kan opprette økter for tidligere datoer for å ta igjen oppmøte du ikke har registrert ennå, eller opprette dem på forhånd slik at de er klare når gruppen møtes.
:::

## Markere oppmøte

Velg en økt for å se oppmøtelisten. Hvert gruppemedlem vises med en avkrysningsboks, sortert etter etternavn, og alle som allerede er registrert som til stede, er avkrysset.

1. Kryss av for hver person som møtte opp. Bruk **Velg alle** eller **Fjern alle** for å endre alle samtidig.
2. Antallet over listen (for eksempel «12 av 15 til stede») oppdateres etter hvert som du krysser av.
3. Klikk på **Lagre oppmøte**. Ingenting registreres før du lagrer, og en melding bekrefter når lagringen er ferdig.

Hvis du fjerner avkrysningen for en som allerede var registrert som til stede, og deretter lagrer, fjernes vedkommende fra økten.

### Legge til besøkende

For å registrere noen som ikke er medlem av gruppen, søker du etter dem i personsøket ved siden av oppmøtelisten. Hvis de ikke finnes i databasen din ennå, kan du opprette dem fra søket. De legges til i listen med avkrysning. Klikk på **Lagre oppmøte** for å registrere dem.

Personer som har sjekket inn på en kiosk, får et merke for **Frivillig** eller **Gjest**. Personer som ikke er gruppemedlemmer, får et merke for **Gjest**.

## Se hvilke grupper som mangler oppmøte

Når flere klasser møtes på samme samlingstidspunkt, kan du med et blikk se hvilke som fortsatt mangler oppmøte for den datoen.

1. Åpne en økt som har et samlingstidspunkt.
2. Klikk på **Hvem mangler oppmøte** øverst i oppmøtelisten.
3. En dialogboks viser alle grupper som er tilordnet samlingstidspunktet, med en oppsummering som «5 av 8 grupper registrert» øverst.

Grupper uten noen markert som til stede for den datoen, får merket **Ikke registrert** og vises først. Grupper som har oppmøte, får **Registrert** med antallet som er markert som til stede (for eksempel «Registrert (12)»). Klikk på gruppens navn for å gå til gruppen og registrere oppmøtet.

:::tip
Bruk dette sammen med **Skriv ut alle klasser** og [å legge til økter for alle klasser i et samlingstidspunkt](#adding-sessions-for-every-class-in-a-service-time): opprett øktene, del ut oppmøtelister, og bruk deretter **Hvem mangler oppmøte** for å se hvilke lister som ikke er registrert ennå.
:::

## Skrive ut en oppmøteliste

En oppmøteliste er en utskrivbar klasseliste som lærere kan fylle ut for hånd og gi tilbake til deg for registrering senere. Hver liste viser menighetens navn, klassen, en stor **Dato**-linje under klassenavnet og samlingstidspunktet. Medlemmene vises i to spalter (les nedover i venstre spalte, deretter i høyre), slik at flere navn får plass på en side, og hvert medlem har ruter for **Til stede** og **Fraværende**. Det er tomme linjer til besøkende og et felt for **Lærer / Merknader**.

- **Fra en økt** -- Klikk på ikonet **Skriv ut oppmøteliste** (skriver) øverst i øktens oppmøteliste. Listen får øktens dato.
- **Alle klasser for en gudstjeneste** -- Hvis økten har et samlingstidspunkt, klikker du på **Skriv ut alle klasser** for å skrive ut én liste per klasse som er tilordnet samlingstidspunktet. Hver klasse skrives ut på sin egen side.
- **Fra fanen Medlemmer** -- Klikk på ikonet **Skriv ut oppmøteliste** over gruppens medlemsliste for å skrive ut en liste uten dato.

Listen åpnes i en ny fane, og nettleserens utskriftsdialog vises automatisk.

## Eksportere oppmøte til et regneark

Du kan laste ned en oversikt over økten som en CSV-fil som kan brukes i Excel, Numbers eller Google Sheets.

1. Åpne økten du vil eksportere.
2. Klikk på knappen **Eksporter** øverst i oppmøtelisten.
3. Åpne den nedlastede filen i regnearkprogrammet ditt.

## Se registrert oppmøte

Etter at du har registrert økter, vises dataene i oppmøterapportene dine.

- **Fanen Oppmøtetrend** -- viser trender for hele menigheten over tid. Se [Følge opp oppmøte](tracking-attendance.md).
- **Fanen Gruppeoppmøte** -- viser oppmøte fordelt på enkeltgrupper. Se [Oppmøterapporter](../reports/attendance-reports.md#group-attendance).

:::tip
Hvis en økt du nettopp har opprettet, ikke vises i rapportene med en gang, må du kontrollere at øktdatoen ligger innenfor datointervallet som er valgt i rapportfiltrene.
:::
