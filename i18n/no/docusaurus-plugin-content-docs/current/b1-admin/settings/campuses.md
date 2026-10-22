---
title: "Campuser"
---

# Campuser {#campuses}

<div class="article-intro">

Hvis kirken din samles på mer enn ett sted, lar **Campuser** deg følge med på hvilket sted hver person og gruppe tilhører. Når campusene er konfigurert, vises de som et alternativ på personprofiler, i oppmøteoppsett og på demografidashbordet. Kirker med flere lokasjoner kan filtrere, søke og rapportere etter campus i hele B1 Admin.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Du trenger tillatelsen **Rediger kirkeinnstillinger** for å administrere campuser. Se [Roller og tillatelser](./roles-permissions.md).

</div>

## Åpne campusinnstillingene {#opening-campus-settings}

I B1 Admin åpner du [Hurtigmenyen](../introduction.md#getting-around-with-the-jump-menu) (søkefeltet øverst til venstre), velger **Innstillinger > Innstillinger**, og klikker på **Campuser** i listen til venstre for å bla til delen **Campuser**. Du kan også gå direkte dit på **/settings/campuses**. Du ser en liste over alle konfigurerte campuser med navn, sted og tidssone.

## Legge til et campus {#adding-a-campus}

1. Klikk på **Legg til campus**.
2. Fyll inn detaljene for campus:
   - **Navn** *(påkrevd)* – visningsnavnet som vises i hele B1 Admin (for eksempel «Hovedcampus» eller «Nordcampus»).
   - **Adresse** – gatenavnet for campus (brukes til informasjon; er ikke det samme som hovedadressen til kirken din i Kirkeinnstillinger).
   - **By / Fylke / Postnummer** – plasseringen til campus.
   - **Tidssone** – IANA-tidssonen for dette campuset (for eksempel *America/Chicago*). [Innsjekkplaner](../attendance/setup.md#setting-a-check-in-schedule) for gudstjenester på dette campuset åpner og lukker i denne tidssonen. Hvis den er satt til **Ingen**, brukes kirkens [tidssone](./church-settings.md#time-zone) i stedet. Nyttig når campusene ligger i forskjellige tidssoner.
   - **Nettside** – en valgfri URL for campusets egen nettside.
3. Klikk på **Lagre**.

## Redigere et campus {#editing-a-campus}

Klikk på en campusrad i listen for å åpne redigeringsverktøyet i panelet til høyre. Oppdater feltene og klikk på **Lagre**.

## Slette et campus {#deleting-a-campus}

Åpne et campus for redigering og klikk på **Slett**. Du blir bedt om å bekrefte. Å slette et campus fjerner ikke personene som er tilknyttet det – feltet for campus deres blir bare tomt.

## Tildele personer til et campus {#assigning-people-to-a-campus}

Etter at du har opprettet campuser, kan ansatte tildele en person til et campus fra profilen deres:

1. Åpne en persons post under **Personer**.
2. Klikk på **Rediger**.
3. Velg campuset i nedtrekkslisten **Campus**.
4. Klikk på **Lagre**.

Du kan også oppdatere campus for mange samtidig fra siden Personer. Velg flere personer, bruk **Massredigering**, og angi feltet Campus for alle på én gang.

## Filtrere etter campus {#filtering-by-campus}

Når campusene er satt opp, kan du filtrere på tvers av B1 Admin etter campus:

- **Personsøk** – legg til en betingelse for Campus i det avanserte søket, eller last inn en [lagret liste](../people/lists.md) som er avgrenset til et campus.
- **Demografi** – [demografidashbordet](../people/demographics.md) viser et ringdiagram for Campus når minst én person har et campus tilordnet.
- **Oppmøteoppsett** – hver gudstjenestetid i Oppmøte kan knyttes til et campus.

:::tip
Kirker med ett sted trenger ikke å konfigurere campuser. Alle campusfunksjoner er valgfrie – hvis ingen campuser finnes, vises ikke campusfeltene og -diagrammene.
:::

## Relaterte artikler {#related-articles}

- [Kirkeinnstillinger](./church-settings.md) – hovedadressen og profileringen til kirken din (adskilt fra campusadresser)
- [Demografi](../people/demographics.md) – diagrammet for fordeling etter campus
- [Oppmøteoppsett](../attendance/setup.md) – knytt gudstjenestetider til et campus
- [Massredigering](../people/bulk-editing.md) – tildel campus til mange personer samtidig
