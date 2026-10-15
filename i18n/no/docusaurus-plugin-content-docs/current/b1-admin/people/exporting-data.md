---
title: "Eksportere data"
---

# Eksportere data

<div class="article-intro">

B1 Admin lar deg eksportere kirkens data slik at du kan bruke den i regneark, dele den med teamet ditt eller ta en sikkerhetskopi. Enten du trenger en rask liste med navn og e-postadresser eller en fullstendig eksport av databasen, finnes det alternativer som passer behovet ditt.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Du trenger en aktiv B1 Admin-konto med tillatelse til å se dataene du vil eksportere. Se [Roller og tillatelser](roles-permissions.md) hvis du er usikker på tilgangsnivået ditt.
- For en fullstendig databaseeksport trenger du tilgang til området **Innstillinger**.

</div>

## Eksportere fra personsiden

Den raskeste måten å eksportere katalogen din på, er direkte fra siden **Personer**:

1. Åpne [Hurtigmenyen](../introduction.md#getting-around-with-the-jump-menu) (søkefeltet øverst til venstre i B1 Admin), utvid **Personer**, og klikk på **Personer**.
2. Bruk søkefeltet eller filtrene for å begrense resultatene du vil eksportere (eller la det være ufiltrert for å eksportere alle). Se [Søke etter personer](searching-people.md) for tips om filtrering.
3. Klikk på knappen **Eksporter** i sidehodet på Personer-siden.
4. En CSV-fil lastes ned til datamaskinen din med personene som er i resultatene dine akkurat nå, inkludert navn, kontaktinformasjon, adresse og andre standardfelt.

:::tip
Eksporten inkluderer alle i de gjeldende resultatene dine. Kjør et søk, last inn en [lagret liste](./lists.md), eller bruk **Avansert** søk først for å eksportere bare de personene du trenger.
:::

## Fullstendig dataeksport fra innstillinger

For en fullstendig eksport av alle B1-dataene dine (ikke bare personer), bruk eksportverktøyet i Innstillinger:

1. I Hurtigmenyen velger du **Innstillinger > Innstillinger**.
2. Klikk på lenken **Import/Eksport** under kirkens navn øverst i den venstre innstillingsmenyen.
3. Velg **B1-database** i rullegardinmenyen **Datakilde**.
4. Gjennomgå forhåndsvisningen av dataene og klikk på **Fortsett til mål**.
5. Velg **B1 eksport-zip** som eksportmål.
6. Følg fremdriften til eksporten til alle elementer viser grønne haker.
7. Eksportfilen lastes ned automatisk. Se etter filen `B1Export` i nedlastingsmappen din.
8. Pakk ut filen for å få tilgang til de enkelte CSV-filene (for eksempel `people.csv`) som du kan åpne i Excel, Google Sheets eller Numbers.

:::info
B1 eksport-zip er en fullstendig sikkerhetskopi av kirkens data. Den inneholder:

- personer (med bilder) og husstander, inkludert kontakter for henting av barn i husstanden
- campus, gudstjenester og gudstjenestetider
- grupper og gruppemedlemmer
- fond og gaver, inkludert gaver fordelt på flere fond
- oppmøte
- skjemaer, spørsmål, innsendinger og svar
- egendefinerte felt og verdiene deres
- lagrede personlister

For å gjenopprette den, velg **B1 import-zip** som kilde og **B1-database** som mål (se [Importere data](./importing-data.md)). Husstander, kontakter for henting og lagrede lister bygges opp igjen sammen med personene. Filtrene for lagrede lister peker mot de gjenopprettede gruppene, fondene, campusene og egendefinerte feltene.
:::

## Eksportere gruppedata

Du kan også eksportere medlemslister for enkeltgrupper. Fra siden **Grupper** åpner du en gruppe og klikker på **nedlastingsikonet** for å eksportere gruppens medlemsliste. Se [Gruppemedlemmer](../groups/group-members.md) for flere detaljer.

:::info
Eksporterte CSV-filer fungerer med alle større regnearkprogrammer, inkludert Microsoft Excel, Google Sheets og Apple Numbers.
:::
