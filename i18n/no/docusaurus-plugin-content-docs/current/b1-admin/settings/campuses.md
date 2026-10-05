---
title: "Menighetssteder"
---

# Menighetssteder

<div class="article-intro">

Hvis kirken din samles på flere steder, lar **Menighetssteder** deg følge med på hvilket sted hver person og gruppe tilhører. Når de er satt opp, vises menighetssteder som et valg på personprofiler, i oppsett av oppmøte og i demografidashbordet. Flerstedskirker kan filtrere, søke og rapportere etter menighetssted i hele B1 Admin.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Du trenger tillatelsen **Rediger kirkeinnstillinger** for å administrere menighetssteder. Se [Roller og tillatelser](./roles-permissions.md).

</div>

## Åpne innstillingene for menighetssteder

I B1 Admin åpner du [Jump-menyen](../introduction.md#getting-around-with-the-jump-menu) (søkefeltet øverst til venstre), velger **Innstillinger > Innstillinger** og klikker på kortet **Menighetssteder**. Du kan også gå direkte til **/settings/campuses**. Du ser en liste over alle konfigurerte menighetssteder med navn, sted og tidssone.

## Legge til et menighetssted

1. Klikk på **Legg til menighetssted** (eller **+**-knappen hvis det ikke finnes noen menighetssteder ennå).
2. Fyll ut detaljene om menighetsstedet:
   - **Navn** *(obligatorisk)* — visningsnavnet som vises i hele B1 Admin (for eksempel «Hovedkirken» eller «Nordkirken»).
   - **Adresse** — gateadressen til menighetsstedet (brukes til informasjon; ikke det samme som hovedadressen til kirken i kirkeinnstillingene).
   - **By / Fylke / Postnummer** — stedet for menighetsstedet.
   - **Tidssone** — IANA-tidssonen for dette menighetsstedet (for eksempel *Europe/Oslo*). Nyttig når menighetssteder ligger i ulike tidssoner.
   - **Nettsted** — en valgfri URL til menighetsstedets egen nettside.
3. Klikk på **Lagre**.

## Redigere et menighetssted

Klikk på en rad i listen for å åpne redigeringen i panelet til høyre. Oppdater feltene og klikk på **Lagre**.

## Slette et menighetssted

Åpne et menighetssted for redigering og klikk på **Slett**. Du blir bedt om å bekrefte. Når du sletter et menighetssted, fjernes ikke personene som er knyttet til det — menighetsstedfeltet deres blir bare tomt.

## Knytte personer til et menighetssted

Etter at du har opprettet menighetssteder, kan medarbeidere knytte en person til et menighetssted fra profilen deres:

1. Åpne personens profil under **Personer**.
2. Klikk på **Rediger**.
3. Velg menighetsstedet i nedtrekksmenyen **Menighetssted**.
4. Klikk på **Lagre**.

Du kan også oppdatere menighetssted i bulk fra siden Personer. Velg flere personer, bruk **Masseredigering** og sett feltet Menighetssted for alle på én gang.

## Filtrere etter menighetssted

Når menighetssteder er satt opp, kan du filtrere etter menighetssted i hele B1 Admin:

- **Personsøk** — legg til en betingelse for menighetssted i det avanserte søket, eller last inn en [lagret liste](../people/lists.md) avgrenset til et menighetssted.
- **Demografi** — [demografidashbordet](../people/demographics.md) viser et smultringdiagram for menighetssted når minst én person har fått tildelt et menighetssted.
- **Oppsett av oppmøte** — hvert gudstjenestetidspunkt under Oppmøte kan knyttes til et menighetssted.

:::tip
Kirker med bare ett sted trenger ikke å sette opp menighetssteder. Alle funksjoner for menighetssteder er valgfrie — hvis det ikke finnes noen menighetssteder, vises ikke feltene og diagrammene for menighetssted.
:::

## Relaterte artikler

- [Kirkeinnstillinger](./church-settings.md) — kirkens hovedadresse og profilering (adskilt fra adressene til menighetsstedene)
- [Demografi](../people/demographics.md) — diagrammet med fordeling etter menighetssted
- [Oppsett av oppmøte](../attendance/setup.md) — knytt gudstjenestetidspunkter til et menighetssted
- [Masseredigering](../people/bulk-editing.md) — knytt mange personer til et menighetssted samtidig
