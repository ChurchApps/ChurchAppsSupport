---
title: "Eksportere data"
---

# Eksportere data

<div class="article-intro">

Med B1 Admin kan du eksportere menighetens data slik at du kan bruke dem i regneark, dele dem med teamet eller ta sikkerhetskopi. Enten du trenger en rask liste over navn og e-postadresser eller en fullstendig databaseeksport, finnes det et alternativ som passer.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Du trenger en aktiv B1 Admin-konto med tillatelse til å se dataene du vil eksportere. Se [Roller og tillatelser](roles-permissions.md) hvis du er usikker på tilgangsnivået ditt.
- For en fullstendig databaseeksport må du ha tilgang til området **Innstillinger**.

</div>

## Eksportere fra siden Personer

Den raskeste måten å eksportere registeret på er direkte fra siden **Personer**:

1. Åpne [Jump-menyen](../introduction.md#getting-around-with-the-jump-menu) (søkefeltet øverst til venstre i B1 Admin), utvid **Personer** og klikk på **Personer**.
2. Bruk søkefeltet eller filtrene for å avgrense resultatene du vil eksportere (eller la det stå ufiltrert for å eksportere alle). Se [Søke etter personer](searching-people.md) for tips om filtrering.
3. Bruk **kolonnevelgeren** for å velge hvilke kolonner som skal være med i eksporten (for eksempel Navn, E-post, Telefon, Adresse).
4. Klikk på knappen **Eksporter**.
5. En CSV-fil lastes ned til datamaskinen din med dataene som vises i tabellen akkurat nå.

:::tip
Tilpass kolonnene før du eksporterer. CSV-filen inneholder nøyaktig de kolonnene som er synlige, slik at du kan tilpasse eksporten uten å redigere filen etterpå.
:::

## Fullstendig dataeksport fra Innstillinger

For en komplett eksport av alle B1-dataene dine (ikke bare personer) bruker du eksportverktøyet i Innstillinger:

1. I Jump-menyen velger du **Innstillinger > Innstillinger**.
2. Klikk på knappen **Import/eksport** øverst til høyre i sidehodet.
3. Velg **B1 Database** i nedtrekkslisten **Datakilde**.
4. Se gjennom dataforhåndsvisningen og klikk på **Fortsett til mål**.
5. Velg **B1 Export Zip** som eksportmål.
6. Følg med på eksportfremdriften til alle elementer har grønne haker.
7. Eksportfilen lastes ned automatisk. Se etter filen `B1Export` i nedlastingsmappen.
8. Pakk ut filen for å få tilgang til enkeltstående CSV-filer (som `people.csv`) som du kan åpne i Excel, Google Sheets eller Numbers.

:::info
Fullstendige dataeksporter inneholder personer, grupper, gaver, oppmøte og mer -- alt som ligger i B1-databasen din. Dette er også en fin måte å lage en jevnlig sikkerhetskopi av menighetens registre på.
:::

## Eksportere gruppedata

Du kan også eksportere medlemslister for enkeltgrupper. Fra siden **Grupper** åpner du en gruppe og klikker på **nedlastingsikonet** for å eksportere gruppens medlemsliste. Se [Gruppemedlemmer](../groups/group-members.md) for mer informasjon.

:::info
Eksporterte CSV-filer fungerer i alle store regnearkprogrammer, inkludert Microsoft Excel, Google Sheets og Apple Numbers.
:::
