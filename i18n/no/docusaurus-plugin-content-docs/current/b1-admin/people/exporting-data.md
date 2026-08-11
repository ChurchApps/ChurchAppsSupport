---
title: "Eksportering av data"
---

# Eksportering av data

<div class="article-intro">

B1 Admin lar deg eksportere kirkens data slik at du kan bruke det i regneark, dele det med laget eller oppbevare en sikkerhetskopi. Enten du trenger en rask liste over navn og e-post eller en fullstendig databaseksport, finnes det alternativer som passer dine behov.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Du trenger en aktiv B1 Admin-konto med tillatelse til å vise dataene du vil eksportere. Se [Roller og tillatelser](roles-permissions.md) hvis du er usikker på tilgangsnivået ditt.
- For en fullstendig databaseksport, trenger du tilgang til **Innstillinger**-området.

</div>

## Eksportering fra mennesker-siden

Den raskeste måten å eksportere mappen på er direkte fra **Mennesker**-siden:

1. Åpne **seksjonsmenyene** i det øvre venstre hjørnet og velg **Mennesker**.
2. Bruk søkestolpen eller filterene for å begrense resultatene du vil eksportere (eller la det være ufiltrert for å eksportere alle). Se [Søk i mennesker](searching-people.md) for tips om filtrering.
3. Bruk **kolonnevelgeren** for å velge hvilke kolonner du vil inkludere i eksporten (for eksempel navn, e-post, telefon, adresse).
4. Klikk **Eksport**-knappen.
5. En CSV-fil blir lastet ned til datamaskinen din med dataene som vises i tabellen for øyeblikket.

:::tip
Tilpass kolonnene dine før eksportering. CSV-filen vil inkludere nøyaktig kolonnene du har synlige, slik at du kan tilpasse eksporten til dine behov uten å redigere filen etterpå.
:::

## Fullstendig dataksport fra innstillinger

For en fullstendig eksport av alle B1-data (ikke bare mennesker), bruk eksportverktøyet i Innstillinger:

1. Åpne **seksjonsmenyene** i det øvre venstre hjørnet og velg **Innstillinger**.
2. Klikk **Importer/Eksport** i den øverste navigasjonen.
3. Velg **B1-database** fra **Datakilde**-rullemenyene.
4. Gjennomgå dataforhåndsvisningen og klikk **Fortsett til destinasjon**.
5. Velg **B1 Export Zip** som eksportdestinasjon.
6. Overvåk eksportfremgangen til alle elementer viser grønne haker.
7. Eksportfilen blir lastet ned automatisk. Se etter filen `B1Export` i nedlastingsmappen.
8. Pakk opp filen for å få tilgang til individuelle CSV-filer (som `people.csv`) som du kan åpne i Excel, Google Sheets eller Numbers.

:::info
Fullstendige dataeksporter inkluderer mennesker, grupper, donasjoner, oppmøte og mer -- alt i B1-databasen. Dette er også en fin måte å lage en periodisk sikkerhetskopi av kirkens journaler.
:::

## Eksportering av gruppedata

Du kan også eksportere medlemslister for individuelle grupper. Fra **Grupper**-siden, åpne en gruppe og klikk **nedlastingsikonet** for å eksportere gruppens medlemsliste. Se [Gruppemedlemmer](../groups/group-members.md) for mer informasjon.

:::info
Eksporterte CSV-filer fungerer med alle større regnearksprogram inkludert Microsoft Excel, Google Sheets og Apple Numbers.
:::
