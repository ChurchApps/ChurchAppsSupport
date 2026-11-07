---
title: "Content Commons"
description: "Hvordan brugerindsendte sange, lektioner og skabeloner bevæger sig gennem den delte modereringskø i B1 Admins Server Admin, fra indsendelse til udgivelse."
---

# Content Commons — Delt aktivbibliotek og moderation

Brugerindsendt indhold, der deles på tværs af produkter (WorshipCommons-sange, Lessons.church-lektioner, FreeShow-skabeloner, B1-webstedsskabeloner), går gennem én fælles moderationskø i stedet for et separat gennemgangsflow for hvert produkt. Denne side beskriver indsendelses- og godkendelsesforløbet, den fælles datamodel for aktiver og hvor moderationen findes.

## Aktivernes rygrad

To tabeller indeholder alle fællesskabselementer, uanset produkt:

- **`assets`** — den offentlige identitetsrække. `status`: `pending` | `published` | `unpublished` | `removed`. Typespecifikke data (sangdetaljer, forfattere) ligger i satellittabeller, som er koblet via `assetId`.
- **`assetFiles`** — alle filer, der er knyttet til et aktiv (lyd, billeder, dokumenter). Tabellen erstatter de ældre kolonner `path` og kommaseparerede `files` i de enkelte indholdstabeller.
- **`submissions`** — moderationsenheden. Livscyklus: `draft → pending → approved | rejected | withdrawn`. En indsendelse kan være et helt nyt aktiv eller en redigering af et eksisterende publiceret aktiv (af den oprindelige forfatter eller en tredjepart).

Når en indsendelse godkendes, køres en produktspecifik **publiceringshook** (`Api/src/modules/commons/helpers/publishHooks/`, f.eks. `song.ts`), som udvider indsendelsen til produktets egne poster.

## Indsendelsesforløb

`CommonsSubmissionController` (`Api/src/modules/commons/`) er den API, slutbrugere anvender: opret et udkast, forudsign og vedhæft filer, indsend til gennemgang eller træk indsendelsen tilbage. Dens faktiske klienter er eksterne producentsites (WorshipCommons-siden, Lessons.church, FreeShow, B1-webstedsskabelongalleriet) — ikke B1Admin.

## Forbrug rettet mod kirker

Ud over moderation læser B1Admin også direkte fra fællesskabets rygrad: søgningen „Add Song“ under Serving → Songs forespørger `GET /songs?sundayReady=true` sammen med den eksisterende eksterne sangdatabase. Den viser publicerede WorshipCommons-sange, som medarbejdere har markeret som klar til søndag (se lyttegatet nedenfor), med et licensmærke. Når man vælger en sang, kobles den nye `SongDetail` til sin kilde via `songDetailLinks`. Dette er den ene vej, hvorpå en enkelt kirkes B1Admin rører ved fællesskabsdata direkte i stedet for via de kun for personale tilgængelige Server Admin-værktøjer. Se afsnittet [Gratis sange fra WorshipCommons](/docs/b1-admin/serving/songs#free-songs-from-worshipcommons) i supportdokumentationen for den kirkevendte beskrivelse.

## Moderationskø

Køen findes under **B1Admin → Server Admin → Commons** (`B1Admin/src/serverAdmin/components/CommonsTab.tsx`) og er låst af tilladelsen `Permissions.server.admin` — den samme, der låser Churches/Impersonate/Jobs på den side. Dette er et internt værktøj kun for ChurchApps-medarbejdere, ikke noget enkelte kirker ser.

Der er tre underfaner:

- **Queue** — alle ventende indsendelser på tværs af produkter, filtrerbare efter produkt/aktivtype. Hver række viser et mærke for nyt aktiv, redigering af forfatter eller redigering af tredjepart, indsenderens godkendelseshistorik, en oversigt over felt- og filforskelle samt alder (markeret, når den er over 72 timer). **Review** åbner et sidepanel med feltvise forskelle, filforhåndsvisninger og en indlejret skrivebeskyttet produktforhåndsvisning. Approve/Reject understøtter tastaturgenveje (j/k til navigation, a/r til handling).
- **Reports** — rapporter om ophavsret og politik/kvalitet for publicerede aktiver, opdelt i to køer samt en historik over løste sager. En medarbejder tager en rapport til sig og løser den derefter med en afgørelse (fastholdt/afvist/dublet) og en handling (ingen/fjern fra publicering/fjern).
- **Assets** — en søgbar oversigt over publiceret indhold med handlinger pr. aktiv: fremhæv, fjern fra publicering/publicer igen eller fjern (årsag: ophavsret/politik). For sange er et **lyttegate** her den måde, hvorpå en sang bliver „Sunday-ready“ (klar til søndag): medarbejdere markerer den, når de har lyttet igennem alle publicerede tonearter og bekræftet, at noderne, akkorderne og slides er til stede.

Alle endepunkter under `/commons/admin/*` (`CommonsAdminController.ts`) kontrollerer uafhængigt server-admin-tilladelsen igen.

:::info
Designet har bevidst én enkelt kø: WorshipCommons' egen moderations-brugerflade under `/admin` er blevet udfaset til fordel for, at alle produkters indsendelser sendes gennem B1Admins Server Admin-værktøjer.
:::

## Omfang

Api (commons-modulet), B1Admin (Server Admin) og de eksterne producentsites: WorshipCommons, Lessons.church, FreeShow og B1-webstedsbyggerens skabeloner.
