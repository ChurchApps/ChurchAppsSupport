---
title: "Eksportere data"
description: "Eksporter personer til CSV, medlemslister for grupper eller en fullstendig sikkerhetskopi av B1-databasen fra B1 Admin, og se hva B1-eksportzipen inneholder."
---

# Eksportere data

<div class="article-intro">

B1 Admin lar deg eksportere kirkedataene dine, slik at du kan bruke dem i regneark, dele dem med teamet ditt eller ta en sikkerhetskopi. Enten du trenger en rask liste med navn og e-postadresser, eller en fullstendig databaseeksport, finnes det alternativer som passer behovet ditt.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Du trenger en aktiv B1 Admin-konto med tillatelse til å se dataene du vil eksportere. Se [Roller og tillatelser](roles-permissions.md) hvis du er usikker på tilgangsnivået ditt.
- For en fullstendig databaseeksport trenger du tilgang til området **Innstillinger**.

</div>

## Eksportere fra siden Personer {#exporting-from-the-people-page}

Den raskeste måten å eksportere katalogen din på er direkte fra siden **Personer**:

1. Åpne [Hurtigmenyen](../introduction.md#getting-around-with-the-jump-menu) (søkefeltet øverst til venstre i B1 Admin), utvid **Personer**, og klikk på **Personer**.
2. Bruk søkefeltet eller filtrene for å snevre inn resultatene du vil eksportere (eller la det være ufiltrert for å eksportere alle). Se [Søke etter personer](searching-people.md) for tips om filtrering.
3. Klikk på knappen **Eksporter** i sidetoppen på siden Personer.
4. En CSV-fil med navnet `people.csv` lastes ned til datamaskinen din. Den inneholder personene som nå er i resultatene dine, med navn, kontaktinformasjon, adresse og andre standardfelt. Hvis du ikke har søkt, inneholder eksporten hele katalogen din, selv når siden bare viser den første delen av den.

:::tip
Eksporten inneholder alle i de nåværende resultatene dine. Kjør et søk, last inn en [lagret liste](./lists.md), eller bruk **Avansert** søk først for å eksportere akkurat de personene du trenger.
:::

## Fullstendig dataeksport fra Innstillinger {#full-data-export-from-settings}

For en fullstendig eksport av alle B1-dataene dine (ikke bare personer), bruk eksportverktøyet i Innstillinger:

1. I Hurtigmenyen velger du **Innstillinger > Innstillinger**.
2. Klikk på lenken **Import/eksport** under kirkens navn øverst i den venstre innstillingsmenyen.
3. Velg **B1-database** i nedtrekksmenyen **Datakilde**.
4. Gå gjennom forhåndsvisningen av dataene og klikk på **Fortsett til mål**.
5. Velg **B1-eksport-zip** som eksportmål.
6. Følg fremdriften til alle elementer viser grønne haker.
7. Eksportfilen lastes ned automatisk. Se etter filen `B1Export` i nedlastingsmappen din.
8. Pakk ut filen for å få tilgang til de enkelte CSV-filene (for eksempel `people.csv`), som du kan åpne i Excel, Google Sheets eller Numbers.

:::info
B1-eksport-zipen er en fullstendig sikkerhetskopi av kirkedataene dine. Den inneholder:

- personer (med bilder) og husstander, inkludert kontakter for henting i husstander
- kampuser, gudstjenester og gudstjenestetider
- grupper og gruppemedlemmer
- fond og gaver, inkludert gaver fordelt på flere fond
- oppmøte
- skjemaer, spørsmål, innsendinger og svar
- egendefinerte felt og verdiene deres
- lagrede personlister

Hvis et personbilde ikke kan lastes ned eller leses under eksporten, hoppes bildet over, og eksporten fortsetter uten det.

For å gjenopprette den velger du **B1-import-zip** som kilde og **B1-database** som mål (se [Importere data](./importing-data.md)). Husstander, kontakter for henting og lagrede lister gjenskapes sammen med personene. Filtrene for lagrede lister peker til de gjenopprettede gruppene, fondene, kampusene og egendefinerte feltene.
:::

## Eksportere gruppedata {#exporting-group-data}

Du kan også eksportere medlemslister for enkeltgrupper. Fra siden **Grupper** åpner du en gruppe og klikker på **nedlastingsikonet** for å eksportere medlemslisten til gruppen. Se [Gruppemedlemmer](../groups/group-members.md) for flere detaljer.

:::info
Eksporterte CSV-filer fungerer med alle store regnearkprogrammer, inkludert Microsoft Excel, Google Sheets og Apple Numbers.
:::
