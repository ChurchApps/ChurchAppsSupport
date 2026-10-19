---
title: "Eksportere data"
---

# Eksportere data

<div class="article-intro">

B1 Admin lar deg eksportere menighetsdataene dine slik at du kan bruke dem i regneark, dele dem med teamet ditt eller ta en sikkerhetskopi. Enten du trenger en rask liste med navn og e-postadresser eller en komplett databaseeksport, finnes det alternativer som passer behovene dine.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Du trenger en aktiv B1 Admin-konto med tillatelse til å se dataene du vil eksportere. Se [Roller og tillatelser](roles-permissions.md) hvis du er usikker på tilgangsnivået ditt.
- For en fullstendig databaseeksport trenger du tilgang til området **Innstillinger**.

</div>

## Eksportere fra siden Personer

Den raskeste måten å eksportere katalogen din på er direkte fra siden **Personer**:

1. Åpne [Jump-menyen](../introduction.md#getting-around-with-the-jump-menu) (søkefeltet øverst til venstre i B1 Admin), utvid **Personer** og klikk på **Personer**.
2. Bruk søkefeltet eller filtrene for å snevre inn resultatene du vil eksportere (eller la det være ufiltrert for å eksportere alle). Se [Søke etter personer](searching-people.md) for tips om filtrering.
3. Klikk på knappen **Eksporter** i sidehodet for siden Personer.
4. En CSV-fil lastes ned til datamaskinen din med personene i de gjeldende resultatene, inkludert navn, kontaktopplysninger, adresse og andre standardfelt.

:::tip
Eksporten inkluderer alle i de gjeldende resultatene dine. Kjør et søk, last inn en [lagret liste](./lists.md), eller bruk **Avansert** søk først for å eksportere bare de personene du trenger.
:::

## Full dataeksport fra Innstillinger {#full-data-export-from-settings}

For en komplett eksport av alle B1-dataene dine (ikke bare personer), bruker du eksportverktøyet i Innstillinger:

1. I Jump-menyen velger du **Innstillinger > Innstillinger**.
2. Klikk på lenken **Import/eksport** under menighetens navn øverst i den venstre innstillingsmenyen.
3. Velg **B1-database** i rullegardinlisten **Datakilde**.
4. Gå gjennom forhåndsvisningen av dataene og klikk på **Fortsett til mål**.
5. Velg **B1 Export Zip** som eksportmål.
6. Følg fremdriften av eksporten til alle elementene viser grønne haker.
7. Eksportfilen lastes ned automatisk. Se etter filen `B1Export` i nedlastingsmappen din.
8. Pakk ut filen for å få tilgang til de enkelte CSV-filene (for eksempel `people.csv`) som du kan åpne i Excel, Google Sheets eller Numbers.

:::info
B1 Export Zip er en fullstendig sikkerhetskopi av menighetsdataene dine. Den inneholder:

- personer (med bilder) og husstander, inkludert kontaktpersoner for henting i husstanden
- kampuser, tjenester og gudstjenestetidspunkter
- grupper og gruppemedlemmer
- fond og donasjoner, inkludert gaver fordelt på flere fond
- oppmøte
- skjemaer, spørsmål, innsendinger og svar
- egendefinerte felt og deres verdier
- lagrede personlister

Hvis et bilde av en person ikke kan lastes ned eller leses under eksporten, hoppes det bildet over, og eksporten fortsetter uten det.

For å gjenopprette den, velger du **B1 Import Zip** som kilde og **B1-database** som mål (se [Importere data](./importing-data.md)). Husstander, kontaktpersoner for henting og lagrede lister gjenopprettes sammen med personene. Filtrene for lagrede lister peker mot de gjenopprettede gruppene, fondene, kampusene og egendefinerte feltene.
:::

## Eksportere gruppedata

Du kan også eksportere medlemslister for enkeltgrupper. Åpne en gruppe fra siden **Grupper** og klikk på **nedlastingsikonet** for å eksportere gruppens medlemsliste. Se [Gruppemedlemmer](../groups/group-members.md) for mer informasjon.

:::info
Eksporterte CSV-filer fungerer med alle større regnearkprogrammer, inkludert Microsoft Excel, Google Sheets og Apple Numbers.
:::
