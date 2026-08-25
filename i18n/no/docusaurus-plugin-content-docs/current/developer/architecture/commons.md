---
title: "Content Commons"
---

# Content Commons — Delt eiendelbibliotek & Moderering

Brukersendinginnhold delt på tvers av produkter (WorshipCommons-sanger, Lessons.church-leksjoner, FreeShow-maler) går gjennom ett moderasjonskø i stedet for en per-produkt-gjennomgangflyt. Denne siden dekker innsending/godkjenningssyklus og der moderering bor.

## Eiendelsspinen

To tabeller bærer hver commons-element, uavhengig av produkt:

- **`assets`** -- den offentlige identitetsraden. `status`: `pending` | `published` | `unpublished` | `removed`.
- **`submissions`** -- moderasjonsenheten. Livssyklus: `draft → pending → approved | rejected | withdrawn`.

Godkjenning av en innsending kjører en produkt-spesifikk **publiserings-hook** som utvider innsendingen til produktets egne poster.

## Innsendelsesflyt

`CommonsSubmissionController` (`Api/src/modules/commons/`) er end-bruker-vendt API: opprett en skisse, presign og legg til filer, submit for gjennomgang, eller trekk tilbake.

## Moderasjonskø

Køen bor i **B1Admin → Server Admin → Commons**, gated av `Permissions.server.admin`-tillatelse -- samme en som gates Churches/Impersonate/Jobs på den siden. Dette er et ChurchApps-stab-only internt verktøy, ikke noe individuelle kirker ser.

Tre underavdelinger:

- **Queue** -- hver ventende innsending på tvers av alle produkter. Hver rad viser en ny-eiendelel-vs-rediger-av-forfatter-vs-rediger-av-tredjepartsmerke, innsenders godkjennings-sporingshistorie, en felts/fil-diff-sammendrag, og alder (flagget forbi 72h).
- **Reports** -- opphavsrett og policy/kvalitets-rapporter på publisert eiendelel, split inn i to køer pluss løst historie.
- **Assets** -- et søkbare browser av publisert innhold med per-eiendelel-handlinger: funksjon, unpublisere/republisere, eller fjerne.

Hver endepunkt under `/commons/admin/*` uavhengig re-sjekker server-admin-tillatelsen.

:::info
Denne designen intensjonelt har en enkelt kø: WorshipCommons sin egen `/admin`-moderasjons-UI ble pensjonert til fordel for rutting alle produkters innsendinger gjennom B1Admin s Server Admin-verktøy.
:::

## Spenner

Api (commons-modul), B1Admin (Server Admin), og de eksterne produsent-sidene: WorshipCommons, Lessons.church, FreeShow, B1 nettsted-bygger-maler.

