---
title: "Campuser"
---

# Campuser

<div class="article-intro">

Hvis kirken din samles på mer enn ett sted, lar **Campuser** deg holde styr på hvilket sted hver person og gruppe tilhører. Når de er satt opp, vises campuser som et valg på personprofiler, i oppmøteoppsett og på demografidashbordet. Kirker med flere lokasjoner kan filtrere, søke og rapportere etter campus i hele B1 Admin.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Du trenger tillatelsen **Rediger kirkeinnstillinger** for å administrere campuser. Se [Roller og tillatelser](./roles-permissions.md).

</div>

## Åpne campusinnstillingene

I B1 Admin åpner du [Hurtigmenyen](../introduction.md#getting-around-with-the-jump-menu) (søkefeltet øverst til venstre), velger **Innstillinger > Innstillinger** og klikker på **Campuser** i listen til venstre for å rulle til seksjonen **Campuser**. Du kan også gå direkte dit på **/settings/campuses**. Du ser en liste over alle konfigurerte campuser med navn, plassering og tidssone.

## Legge til en campus

1. Klikk på **Legg til campus**.
2. Fyll ut opplysningene om campusen:
   - **Navn** *(påkrevd)* — visningsnavnet som vises i hele B1 Admin (for eksempel «Hovedcampus» eller «Nord-campus»).
   - **Adresse** — gateadressen til campusen (brukes til informasjon; er ikke det samme som hovedadressen til kirken din i kirkeinnstillingene).
   - **By / Fylke / Postnummer** — campusens plassering.
   - **Tidssone** — IANA-tidssonen for denne campusen (for eksempel *America/Chicago*). [Innsjekkingsplaner](../attendance/setup.md#setting-a-check-in-schedule) for gudstjenester på denne campusen åpner og stenger i denne tidssonen. Hvis den er satt til **Ingen**, brukes kirkens [tidssone](./church-settings.md#time-zone) i stedet. Nyttig når campuser ligger i ulike tidssoner.
   - **Nettside** — en valgfri URL for campusens egen nettilstedeværelse.
3. Klikk på **Lagre**.

## Redigere en campus

Klikk på en campusrad i listen for å åpne redigeringsverktøyet i panelet til høyre. Oppdater feltene og klikk på **Lagre**.

## Slette en campus

Åpne en campus for redigering og klikk på **Slett**. Du blir bedt om å bekrefte. Å slette en campus fjerner ikke personene som er tilordnet den — campusfeltet deres blir bare tomt.

## Tilordne personer til en campus

Etter at du har opprettet campuser, kan ansatte tilordne en person til en campus fra profilen sin:

1. Åpne en persons post i **Personer**.
2. Klikk på **Rediger**.
3. Velg campusen fra rullegardinlisten **Campus**.
4. Klikk på **Lagre**.

Du kan også oppdatere campus for mange samtidig fra siden Personer. Velg flere personer, bruk **Masseredigering**, og angi campusfeltet for alle på én gang.

## Filtrere etter campus

Når campuser er satt opp, kan du filtrere på tvers av B1 Admin etter campus:

- **Personsøk** — legg til en betingelse for Campus i det avanserte søket, eller last inn en [lagret liste](../people/lists.md) avgrenset til en campus.
- **Demografi** — [demografidashbordet](../people/demographics.md) viser et ringdiagram for campus når minst én person har en campus tilordnet.
- **Oppmøteoppsett** — hver gudstjenestetid i Oppmøte kan knyttes til en campus.

:::tip
Kirker med ett sted trenger ikke sette opp campuser. Alle campusfunksjoner er valgfrie — hvis det ikke finnes noen campuser, vises ikke campusfeltene og diagrammene.
:::

## Relaterte artikler

- [Kirkeinnstillinger](./church-settings.md) — hovedadressen og merkevaren til kirken din (skilt fra campusadressene)
- [Demografi](../people/demographics.md) — diagrammet for fordeling på campus
- [Oppmøteoppsett](../attendance/setup.md) — koble gudstjenestetider til en campus
- [Masseredigering](../people/bulk-editing.md) — tilordne campus til mange personer samtidig
