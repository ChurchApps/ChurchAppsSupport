---
title: "Menighetsenheter"
description: "Sett opp menighetsenheter i B1 Admin for å følge med på hvilken lokasjon hver person og gruppe tilhører, og filtrer deretter personer, oppmøte og demografi etter sted."
---

# Menighetsenheter

<div class="article-intro">

Hvis menigheten din samles på mer enn ett sted, lar **menighetsenheter** deg følge med på hvilken lokasjon hver person og gruppe tilhører. Når de er satt opp, vises menighetsenheter som et valg på personprofiler, i oppsettet for oppmøte og i demografioversikten. Menigheter med flere lokasjoner kan filtrere, søke og rapportere etter menighetsenhet overalt i B1 Admin.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Du trenger tillatelsen **Rediger kirkeinnstillinger** for å administrere menighetsenheter. Se [Roller og tillatelser](./roles-permissions.md).

</div>

## Åpne innstillinger for menighetsenheter {#opening-campus-settings}

I B1 Admin åpner du [Hurtigmenyen](../introduction.md#getting-around-with-the-jump-menu) (søkefeltet øverst til venstre), velger **Innstillinger > Innstillinger** og klikker på **Menighetsenheter** i listen til venstre for å scrolle til delen **Menighetsenheter**. Du kan også gå direkte dit på **/settings/campuses**. Du ser en liste over alle konfigurerte menighetsenheter med navn, sted og tidssone.

## Legge til en menighetsenhet {#adding-a-campus}

1. Klikk på **Legg til menighetsenhet**.
2. Fyll inn detaljene for menighetsenheten:
   - **Navn** *(obligatorisk)* — visningsnavnet som vises gjennomgående i B1 Admin (for eksempel «Hovedmenighet» eller «Nordre menighet»).
   - **Adresse** og **Adresselinje 2** — gatadressen til menighetsenheten (brukes til informasjon; er ikke det samme som hovedadressen til menigheten din i kirkeinnstillingene).
   - **By / Stat / Postnummer** — lokasjonen til menighetsenheten.
   - **Tidssone** — IANA-tidssonen for denne menighetsenheten (for eksempel *America/Chicago*). [Innsjekkingsplaner](../attendance/setup.md#setting-a-check-in-schedule) for gudstjenester på denne lokasjonen åpnes og lukkes i denne tidssonen. Hvis den står på **Ingen**, brukes i stedet menighetens [tidssone](./church-settings.md#time-zone). Nyttig når menighetsenhetene ligger i ulike tidssoner.
   - **Nettside** — en valgfri URL for menighetsenhetens egen nettside.
3. Klikk på **Lagre**.

Listen viser hver menighetsenhets **navn**, **sted** (by og stat) og **tidssone**, og punktet **Menighetsenheter** i listen til venstre viser hvor mange lokasjoner du har.

## Redigere en menighetsenhet {#editing-a-campus}

Klikk på en hvilken som helst rad for menighetsenheter i listen for å åpne redigeringsverktøyet i panelet til høyre. Oppdater feltene og klikk på **Lagre**, eller **Avbryt** for å lukke redigeringsverktøyet uten å lagre.

## Slette en menighetsenhet {#deleting-a-campus}

Åpne en menighetsenhet for redigering og klikk på **Slett**. Du blir bedt om å bekrefte. Å slette en menighetsenhet fjerner ikke personene som er tilordnet den — feltet for menighetsenhet deres blir bare tomt.

## Tilordne personer til en menighetsenhet {#assigning-people-to-a-campus}

Etter at du har opprettet menighetsenheter, kan medarbeidere tilordne en person til en menighetsenhet fra profilen deres:

1. Åpne en persons registrering under **Personer**.
2. Klikk på **Rediger**.
3. Velg menighetsenheten i nedtrekkslisten **Menighetsenhet**.
4. Klikk på **Lagre**.

Du kan også oppdatere menighetsenhet for mange samtidig fra siden Personer. Velg flere personer, bruk **Massredigering**, og sett feltet Menighetsenhet for alle på én gang.

## Filtrere etter menighetsenhet {#filtering-by-campus}

Når menighetsenheter er satt opp, kan du filtrere på tvers av B1 Admin etter menighetsenhet:

- **Personsøk** — legg til en betingelse for Menighetsenhet i avansert søk, eller last inn en [lagret liste](../people/lists.md) avgrenset til en menighetsenhet.
- **Demografi** — [demografioversikten](../people/demographics.md) viser et ringdiagram for menighetsenheter når minst én person har en menighetsenhet tilordnet.
- **Oppsett for oppmøte** — hvert gudstjenestetidspunkt i oppmøte kan knyttes til en menighetsenhet.

:::tip
Menigheter med bare én lokasjon trenger ikke å sette opp menighetsenheter. Alle funksjoner for menighetsenheter er valgfrie — hvis det ikke finnes noen menighetsenheter, vises ikke felt og diagrammer for menighetsenheter.
:::

## Relaterte artikler {#related-articles}

- [Kirkeinnstillinger](./church-settings.md) — hovedadressen og merkevaren til menigheten din (separat fra adressene til menighetsenhetene)
- [Demografi](../people/demographics.md) — diagrammet for fordeling etter menighetsenhet
- [Oppsett for oppmøte](../attendance/setup.md) — koble gudstjenestetider til en menighetsenhet
- [Massredigering](../people/bulk-editing.md) — tilordne menighetsenhet til mange personer samtidig
