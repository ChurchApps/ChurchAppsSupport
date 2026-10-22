---
title: "Digital skilting"
---

# Digital skilting {#digital-signage}

<div class="article-intro">

Send leksjonsinnholdet ditt til en TV i lobbyen eller i en gang ved hjelp av en feed for digital skilting. Hver planType får en feed-URL som alltid spiller av innholdet til gjeldende plan, så det er ingenting å oppdatere uke for uke. Hvis TV-ene dine kjører FreePlay, kan du i stedet planlegge planType på dem i FreePlay Admin.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Sett opp en [planType](./plans.md) med [Lessons.church](../../b1-church/content/lessons.md) eller annet leksjonsinnhold planlagt
- Ha en konto hos [SignPresenter](https://www.signpresenter.com) og en enhet satt opp til å vise den, eller en TV som kjører [FreePlay](../../freeplay/)

</div>

## Hente feed-URL-en {#getting-the-feed-url}

1. Gå til **Tjeneste**, velg tjenesteområdet som inneholder planTypen din, og klikk på planTypen for å åpne den.
2. Klikk på **Digital skilting** (TV-ikonet) øverst på planTypesiden.
3. I dialogboksen **Feed for digital skilting** klikker du på kopieringsknappen ved siden av **Feed-URL**.

:::info
Feed-URL-en er knyttet til planTypen, ikke til én enkelt plan. Den følger automatisk den planen som er satt som gjeldende for planTypen, så du trenger bare å sette den opp én gang.
:::

## Koble til SignPresenter {#connecting-to-signpresenter}

Feeden er laget for å fungere med [SignPresenter](https://www.signpresenter.com), en tredjeparts app for digital skilting. Lim inn den kopierte URL-en i SignPresenter som en ekstern feed for å vise det gjeldende leksjonsinnholdet ditt på en tilkoblet skjerm.

For trinn-for-trinn-oppsett i SignPresenter, se [SignPresenters veiledning for Lessons.church](https://support.signpresenter.com/topics/lessons-dot-church.html). Dialogboksen har også lenker til disse instruksjonene.

## Bruke FreePlay-TV-er i stedet {#using-freeplay-tvs-instead}

Hvis skjermene dine kjører [FreePlay](../../freeplay/), trenger du ikke feed-URL-en. Dialogboksen **Feed for digital skilting** lenker til **admin.freeplay.church/calendar**, der du kan planlegge denne planTypen på FreePlay-TV-ene dine:

1. Klikk på lenken **admin.freeplay.church/calendar** i dialogboksen. FreePlay Admin bruker samme innlogging som B1 Admin.
2. Velg skjermgruppen for TV-ene dine og klikk på **Legg til plan**.
3. Under **Spill av** velger du planTypen din fra **Tjenesteplaner**. Den er merket **(gjeldende plan)**.
4. Angi dager og klokkeslett, og klikk deretter på **Lagre**.

TV-ene spiller av den planen som er gjeldende for planTypen hver uke, til tidspunktene du har angitt. Dette fungerer også med leksjoner fra Go Curriculum, inkludert planer du har tilpasset. FreePlay logger inn med Go Curriculum-kontoen som er koblet til tjenesteområdet under **Innholdsleverandører** (se [Planlegge leksjoner](./scheduling-lessons.md)), eller kirkens Go Curriculum-tilkobling hvis tjenesteområdet ikke har en. Se [Planlegge kalenderen](../../freeplay/scheduled-mode/scheduling-the-calendar) for alle alternativene, og [Koble til en skjerm](../../freeplay/scheduled-mode/pairing-a-screen) for å legge til en TV.

:::note
Feed-URL-en inkluderer ikke medier fra Go Curriculum, fordi dette innholdet krever kirkens Go Curriculum-innlogging. For å vise en Go Curriculum-leksjon på en TV i lobbyen eller klasserommet, bruk FreePlay.
:::

## Neste steg {#next-steps}

- Administrer planene som mater denne skiltvisningen, på siden [Planer](./plans.md)
- Planlegg innhold med [Lessons.church](./scheduling-lessons.md)
- Legg FreePlay-TV-er på en kalender med [Planlagt modus](../../freeplay/scheduled-mode/)
