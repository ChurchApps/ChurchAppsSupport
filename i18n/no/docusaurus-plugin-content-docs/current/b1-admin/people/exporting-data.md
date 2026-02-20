---
title: "Eksportere data"
---

# Eksportere data

<div class="article-intro">

B1 Admin lar deg eksportere kirkedataene dine slik at du kan bruke dem i regneark, dele dem med teamet ditt eller ta en sikkerhetskopi. Enten du trenger en rask liste over navn og e-poster eller en komplett databaseeksport, finnes det alternativer som passer dine behov.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Du trenger en aktiv B1 Admin-konto med tillatelse til å se dataene du vil eksportere. Se [Roller og tillatelser](roles-permissions.md) hvis du er usikker på tilgangsnivået ditt.
- For en fullstendig databaseeksport trenger du tilgang til **Innstillinger**-området.

</div>

## Eksportere fra Personer-siden

Den raskeste måten å eksportere registeret ditt på er direkte fra **Personer**-siden:

1. Naviger til **Personer** i venstre sidefelt.
2. Bruk søkefeltet eller filtrene for å begrense resultatene du vil eksportere (eller la det være ufiltrert for å eksportere alle). Se [Søke etter personer](searching-people.md) for tips om filtrering.
3. Bruk **kolonnevelgeren** for å velge hvilke kolonner du vil inkludere i eksporten (for eksempel Navn, E-post, Telefon, Adresse).
4. Klikk på **Eksporter**-knappen.
5. En CSV-fil lastes ned til datamaskinen din med dataene som vises i tabellen.

:::tip
Tilpass kolonnene dine før du eksporterer. CSV-filen inkluderer nøyaktig de kolonnene du har synlige, slik at du kan skreddersy eksporten til dine behov uten å redigere filen etterpå.
:::

## Fullstendig dataeksport fra Innstillinger

For en komplett eksport av alle B1-dataene dine (ikke bare personer), bruk eksportverktøyet i Innstillinger:

1. Klikk på **Innstillinger** i venstre sidefelt.
2. Klikk på **Import/Eksport** i toppnavigasjonen.
3. Velg **B1 Database** fra **Datakilde**-rullegardinmenyen.
4. Gjennomgå dataforhåndsvisningen og klikk **Fortsett til destinasjon**.
5. Velg **B1 Export Zip** som eksportdestinasjon.
6. Overvåk eksportfremdriften til alle elementer viser grønne haker.
7. Eksportfilen lastes ned automatisk. Se etter `B1Export`-filen i nedlastingsmappen din.
8. Pakk ut filen for å få tilgang til individuelle CSV-filer (som `people.csv`) som du kan åpne i Excel, Google Sheets eller Numbers.

:::info
Fullstendige dataeksporter inkluderer personer, grupper, donasjoner, oppmøte og mer -- alt i B1-databasen din. Dette er også en fin måte å lage en periodisk sikkerhetskopi av menighetens registre.
:::

## Eksportere gruppedata

Du kan også eksportere medlemslister for individuelle grupper. Fra **Grupper**-siden, åpne en gruppe og klikk på **nedlastingsikonet** for å eksportere gruppens medlemsliste. Se [Gruppemedlemmer](../groups/group-members.md) for flere detaljer.

:::info
Eksporterte CSV-filer fungerer med alle store regnearkprogrammer, inkludert Microsoft Excel, Google Sheets og Apple Numbers.
:::
