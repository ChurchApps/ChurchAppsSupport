---
title: "Registrere oppmøte"
---

# Registrere oppmøte

<div class="article-intro">

Når campus, gudstjenestetider og grupper er satt opp, kan du registrere oppmøte manuelt etter hver samling. B1 Admin organiserer oppmøte rundt **økter** -- én økt per gruppe per møtedato. Du oppretter økten, markerer hvem som møtte opp, og dataene går direkte inn i oppmøterapportene dine.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Campus, gudstjenestetider og grupper må være konfigurert. Se [Oppmøteoppsett](setup.md) hvis du ikke har gjort dette ennå.
- Gruppene du vil følge må ha **Følg oppmøte** aktivert. Se [Oppmøteoppsett](setup.md) for detaljer.
- Du trenger tillatelsen **Rediger oppmøte** for å lagre oppmøte. Frivillige som bare har **Vis kun navn** for personer, kan fortsatt registrere oppmøte på denne måten -- de åpner klasser fra **Grupper** og ser medlemmene kun med navn. Se [Kun navn for personer](../settings/roles-permissions.md#people-names-only).

</div>

## Opprette en økt

En økt representerer én forekomst av et gruppemøte -- for eksempel 1.–3. klasse på en bestemt søndag.

1. Åpne **B1 Admin**, åpne [Hurtigmenyen](../introduction.md#getting-around-with-the-jump-menu) (søkefeltet øverst til venstre), utvid **Personer** og klikk **Grupper**.
2. Velg gruppen du vil registrere oppmøte for.
3. I seksjonen **Økter** på gruppens side klikker du **Alle økter**.
4. Klikk **Ny** for å opprette en ny økt.
5. Hvis gruppen er knyttet til en gudstjenestetid, velger du **Gudstjenestetid**. Hvis det er en ikke-planlagt gruppe, vises ikke dette feltet.
6. Velg **Øktdato** -- den kan være i dag, en tidligere dato eller en fremtidig dato.
7. Klikk **Lagre**.

### Legge til økter for alle klasser i en gudstjenestetid

Hvis andre grupper møtes på samme gudstjenestetid (for eksempel alle barneklassene dine kl. 09.00 på søndag), kan du opprette økter for dem i ett steg i stedet for å besøke hver gruppe.

1. Følg trinnene ovenfor og velg en **Gudstjenestetid**.
2. Kryss av for **Legg også til for de andre _N_ gruppene i _gudstjenestetiden_**. Avkrysningsboksen viser hvor mange andre grupper som er knyttet til gudstjenestetiden. Den vises bare når du legger til en ny økt, og minst én annen gruppe møtes på det tidspunktet.
3. Klikk **Lagre**.

Det opprettes en økt for den gjeldende gruppen og for hver av de andre gruppene på samme dato og gudstjenestetid. Grupper som allerede har en økt for den datoen og gudstjenestetiden, hoppes over, slik at du ikke får duplikater.

:::tip
Du kan opprette økter for tidligere datoer for å registrere oppmøte du ennå ikke har registrert, eller opprette dem på forhånd, slik at de er klare når gruppen møtes.
:::

## Øktnotater {#session-notes}

Hver økt kan ha notater -- en oppsummering av det som ble gjennomgått, kunngjøringer eller bønneemner.

1. Når du legger til en økt, eller etter å ha klikket på blyantikonet **Rediger** ved siden av en økt i listen, skriver du i boksen **Notater (hva som ble gjennomgått, kunngjøringer, bønneemner)** under datoen. Verktøylinjen lar deg legge til fet tekst, lister og lenker.
2. Klikk **Lagre**.

Notatene vises øverst i øktens oppmøteliste. De er også møtenotatene som gruppens medlemmer leser i delen **Møter** på gruppens side på B1.church, der gruppeledere også kan skrive og redigere dem. Se [Gruppedetaljer](../../b1-church/groups/group-details.md#meeting-notes-and-attendance).

## Markere oppmøte

Velg en økt for å se oppmøtelisten. Alle gruppemedlemmer vises med en avkrysningsboks, sortert etter etternavn, og alle som allerede er registrert som tilstede, er krysset av.

1. Kryss av boksen ved siden av hver person som møtte opp. Bruk **Velg alle** eller **Velg ingen** for å endre alle samtidig.
2. Antallet over listen (for eksempel «12 av 15 tilstede») oppdateres etter hvert som du krysser av.
3. Klikk **Lagre oppmøte**. Ingenting registreres før du lagrer, og en melding bekrefter når lagringen er fullført. Hvis du prøver å lukke eller laste inn nettleserfanen på nytt mens en lagring pågår, varsler nettleseren deg først, slik at endringene ikke går tapt.

Hvis du fjerner avkrysningen for noen som tidligere var registrert som tilstede, og deretter lagrer, fjernes de fra økten.

### Legge til gjester

For å registrere noen som ikke er medlem av gruppen, søker du etter dem i personsøket ved siden av oppmøtelisten. Hvis de ikke finnes i databasen din ennå, kan du opprette dem fra søket. Uansett blir de lagt til i listen allerede avkrysset. Klikk **Lagre oppmøte** for å registrere dem.

Personer som har sjekket inn på en kiosk, vises med en brikke **Frivillig** eller **Gjest**. Personer som ikke er medlemmer av gruppen, vises med en brikke **Gjest**.

## Sjekke hvilke grupper som fortsatt mangler oppmøte

Når flere klasser møtes på samme gudstjenestetid, kan du se med ett blikk hvilke som fortsatt mangler oppmøte for den datoen.

1. Åpne en økt som har en gudstjenestetid.
2. Klikk **Hvem mangler oppmøte** øverst i oppmøtelisten.
3. En dialog lister opp alle grupper knyttet til gudstjenestetiden, med et sammendrag som «5 av 8 grupper registrert» øverst.

Grupper uten noen markert som tilstede for den datoen vises med en brikke **Ikke registrert** og listes først. Grupper som har oppmøte, vises med **Registrert** og antallet personer som er markert som tilstede (for eksempel «Registrert (12)»). Klikk på en gruppes navn for å åpne gruppens økter med økten for samme dato allerede valgt, slik at du kan registrere oppmøtet med en gang. Hvis gruppen ikke har en økt for den datoen ennå, åpnes listen over gruppens økter, slik at du kan legge til en.

:::tip
Kombiner dette med **Skriv ut alle klasser** og [å legge til økter for alle klasser i en gudstjenestetid](#adding-sessions-for-every-class-in-a-service-time): opprett øktene, del ut navnelister, og bruk deretter **Hvem mangler oppmøte** for å se hvilke lister som ennå ikke er registrert.
:::

## Skrive ut en navneliste

En navneliste er en utskrivbar klasseliste som lærere kan krysse av for hånd og levere tilbake til deg for registrering senere. Hver liste viser menighetens logo (**Logo for lys bakgrunn** fra [Nettside > Utseende](../website/appearance.md), hvis du har lastet opp en) med menighetens navn under, klassen, en stor **Dato**-linje under klassenavnet, og gudstjenestetiden. Medlemmene listes i to kolonner (les nedover i venstre kolonne, og deretter i høyre), slik at flere navn får plass på en side, og hvert medlem har bokser for **Tilstede** og **Fraværende**. Det finnes tomme linjer for gjester og et felt for **Lærer / Notater**.

- **Fra en økt** -- Klikk på ikonet **Skriv ut navneliste** (skriver) øverst i øktens oppmøteliste. Listen er datert med øktens dato.
- **Alle klasser for en gudstjeneste** -- Hvis økten har en gudstjenestetid, klikker du **Skriv ut alle klasser** for å skrive ut én liste per klasse knyttet til gudstjenestetiden. Hver klasse skrives ut på sin egen side.
- **Fra medlemslisten** -- På gruppens side klikker du **Alle medlemmer**, deretter ikonet **Skriv ut navneliste** over medlemslisten og velger **Oppmøteliste** for å skrive ut en udatert liste. Den samme menyen har et oppsett for **Kontaktliste** med hvert medlems telefon, e-post og adresse -- se [Skrive ut medlemslisten](../groups/group-members.md#printing-the-member-list).

Listen åpnes i en ny fane, og nettleserens utskriftsdialog vises automatisk.

## Eksportere oppmøte til et regneark

Du kan laste ned en oversikt over økten som en CSV-fil for bruk i Excel, Numbers eller Google Sheets.

1. Åpne økten du vil eksportere.
2. Klikk på knappen **Eksporter** øverst i oppmøtelisten.
3. Åpne den nedlastede filen i regnearkprogrammet ditt.

## Se registrert oppmøte

Etter at du har registrert økter, vises dataene i oppmøterapportene dine.

- **Fane for oppmøtetrend** (under **Alle år** på siden Oppmøte) -- viser trender for hele menigheten over tid. Se [Følge oppmøte](tracking-attendance.md).
- **Fane for gruppeoppmøte** -- viser oppmøte fordelt på hver enkelt gruppe. Se [Oppmøterapporter](../reports/attendance-reports.md#group-attendance).

:::tip
Hvis en økt du nettopp opprettet ikke vises i rapportene med en gang, må du kontrollere at øktdatoen ligger innenfor datointervallet som er valgt i rapportfiltrene.
:::
