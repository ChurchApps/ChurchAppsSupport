---
title: "Registrere oppmøte"
---

# Registrere oppmøte

<div class="article-intro">

Når campus, gudstjenestetider og grupper er satt opp, kan du registrere oppmøte manuelt etter hver samling. B1 Admin organiserer oppmøte rundt **økter** – én økt per gruppe per møtedato. Du oppretter økten, markerer hvem som møtte opp, og dataene går direkte inn i oppmøterapportene dine.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Campus, gudstjenestetider og grupper må være konfigurert. Se [Oppsett av oppmøte](setup.md) hvis du ikke har gjort dette ennå.
- Gruppene du vil spore må ha **Spor oppmøte** aktivert. Se [Oppsett av oppmøte](setup.md) for detaljer.

</div>

## Opprette en økt

En økt representerer én forekomst av et gruppemøte – for eksempel klassen for barnehage til 3. klasse på en bestemt søndag.

1. Åpne **B1 Admin**, åpne [Hurtigmenyen](../introduction.md#getting-around-with-the-jump-menu) (søkefeltet øverst til venstre), utvid **Personer**, og klikk på **Grupper**.
2. Velg gruppen du vil registrere oppmøte for.
3. I delen **Økter** på gruppens side, klikk på **Alle økter**.
4. Klikk på **Ny** for å opprette en ny økt.
5. Hvis gruppen er knyttet til en gudstjenestetid, velg **Gudstjenestetid**. Hvis det er en uplanlagt gruppe, vises ikke dette feltet.
6. Velg **Øktdato** – dette kan være i dag, en tidligere dato eller en fremtidig dato.
7. Klikk på **Lagre**.

### Legge til økter for alle klasser i en gudstjenestetid

Hvis andre grupper møtes på samme gudstjenestetid (for eksempel alle barneklassene dine kl. 09.00 på søndag), kan du opprette øktene deres i ett steg i stedet for å besøke hver gruppe.

1. Følg trinnene over og velg en **Gudstjenestetid**.
2. Kryss av for **Legg også til for de andre _N_ gruppene i _gudstjenestetid_**. Avkrysningsboksen viser hvor mange andre grupper som er knyttet til den gudstjenestetiden. Den vises bare når du legger til en ny økt, og minst én annen gruppe møtes på det tidspunktet.
3. Klikk på **Lagre**.

Det opprettes en økt for den gjeldende gruppen og for hver av de andre gruppene på samme dato og gudstjenestetid. Grupper som allerede har en økt for den datoen og gudstjenestetiden, hoppes over, slik at du ikke får duplikater.

:::tip
Du kan opprette økter for tidligere datoer for å registrere oppmøte du ikke har ført ennå, eller opprette dem på forhånd slik at de er klare når gruppen din møtes.
:::

## Markere oppmøte

Velg en økt for å se listen over oppmøte. Alle gruppemedlemmer vises med en avkrysningsboks, sortert etter etternavn, og alle som allerede er registrert som tilstede, er avkrysset.

1. Kryss av boksen ved siden av hver person som møtte opp. Bruk **Velg alle** eller **Velg ingen** for å endre alle samtidig.
2. Antallet over listen (for eksempel «12 av 15 tilstede») oppdateres når du krysser av bokser.
3. Klikk på **Lagre oppmøte**. Ingenting registreres før du lagrer, og en melding bekrefter når lagringen er ferdig.

Hvis du fjerner krysset for noen som allerede var registrert som tilstede, og deretter lagrer, fjernes de fra økten.

### Legge til gjester

For å registrere noen som ikke er medlem av gruppen, søk etter dem i personsøket ved siden av oppmøtelisten. Hvis de ikke finnes i databasen din ennå, kan du opprette dem fra søket. Uansett blir de lagt til i listen allerede avkrysset. Klikk på **Lagre oppmøte** for å registrere dem.

Personer som har sjekket inn ved en kiosk, viser en brikke med **Frivillig** eller **Gjest**. Personer som ikke er medlemmer av gruppen, viser en brikke med **Gjest**.

## Se hvilke grupper som fortsatt mangler oppmøte

Når flere klasser møtes på samme gudstjenestetid, kan du se med ett blikk hvilke som fortsatt må få registrert oppmøte for den datoen.

1. Åpne en økt som har en gudstjenestetid.
2. Klikk på **Hvem mangler oppmøte** øverst i oppmøtelisten.
3. En dialog viser hver gruppe som er knyttet til gudstjenestetiden, med et sammendrag som «5 av 8 grupper registrert» øverst.

Grupper uten noen markert som tilstede for den datoen viser en brikke med **Ikke registrert** og listes først. Grupper som har oppmøte, viser **Registrert** med antallet personer som er markert som tilstede (for eksempel «Registrert (12)»). Klikk på en gruppes navn for å åpne den gruppens økter med økten for samme dato allerede valgt, slik at du kan registrere oppmøtet med én gang. Hvis gruppen ikke har en økt for den datoen ennå, åpnes listen over økter, slik at du kan legge til en.

:::tip
Kombiner dette med **Skriv ut alle klasser** og [å legge til økter for alle klasser i en gudstjenestetid](#adding-sessions-for-every-class-in-a-service-time): opprett øktene, del ut oppmøtelister, og bruk deretter **Hvem mangler oppmøte** for å se hvilke lister som ennå ikke er registrert.
:::

## Skrive ut en oppmøteliste

En oppmøteliste er en utskrivbar klasseliste som lærere kan krysse av for hånd og gi tilbake til deg for å registrere senere. Hver liste viser kirkens logo (**logo for lys bakgrunn** fra [Nettsted > Utseende](../website/appearance.md), hvis du har lastet opp en) med kirkens navn under, klassen, en stor **Dato**-linje under klassenavnet, og gudstjenestetiden. Medlemmene er oppført i to kolonner (les nedover venstre kolonne, deretter høyre) slik at flere navn får plass på en side, og hvert medlem har bokser for **Tilstede** og **Fraværende**. Det finnes tomme linjer for gjester og et område for **Lærer / Notater**.

- **Fra en økt** – Klikk på skriverikonet **Skriv ut oppmøteliste** øverst i øktens oppmøteliste. Listen dateres med øktens dato.
- **Alle klasser for en gudstjeneste** – Hvis økten har en gudstjenestetid, klikk på **Skriv ut alle klasser** for å skrive ut én liste per klasse knyttet til gudstjenestetiden. Hver klasse skrives ut på sin egen side.
- **Fra medlemslisten** – På gruppens side, klikk på **Alle medlemmer**, klikk deretter på skriverikonet **Skriv ut oppmøteliste** over medlemslisten og velg **Oppmøteliste** for å skrive ut en udatert liste. Den samme menyen har et oppsett for **Kontaktliste** med hvert medlems telefon, e-post og adresse – se [Skrive ut medlemslisten](../groups/group-members.md#printing-the-member-list).

Listen åpnes i en ny fane, og nettleserens utskriftsdialog vises automatisk.

## Eksportere oppmøte til et regneark

Du kan laste ned en oversikt over økten som en CSV-fil for bruk i Excel, Numbers eller Google Sheets.

1. Åpne økten du vil eksportere.
2. Klikk på knappen **Eksporter** øverst i oppmøtelisten.
3. Åpne den nedlastede filen i regnearkprogrammet ditt.

## Se registrert oppmøte

Etter at du har registrert økter, vises dataene i oppmøterapportene dine.

- **Fanen Oppmøtetrend** (under **Alle år** på siden Oppmøte) – viser trender for hele kirken over tid. Se [Spore oppmøte](tracking-attendance.md).
- **Fanen Gruppeoppmøte** – viser oppmøte fordelt på den enkelte gruppe. Se [Oppmøterapporter](../reports/attendance-reports.md#group-attendance).

:::tip
Hvis en økt du nettopp opprettet ikke vises i rapportene med en gang, sjekk at øktdatoen ligger innenfor datointervallet som er valgt i rapportfilterne.
:::
