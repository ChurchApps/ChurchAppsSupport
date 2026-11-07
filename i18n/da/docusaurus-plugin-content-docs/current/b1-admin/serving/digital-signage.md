---
title: "Digital Signage"
---

# Digital Signage

<div class="article-intro">

Send dit lektionsindhold til en TV i lobbyen eller på gangen via et digital signage-feed. Hver planstype får en feed-URL, der altid viser den aktuelle plans indhold, så der er intet at opdatere uge for uge. Hvis dine TV'er kører FreePlay, kan du i stedet planlægge planstypen på dem i FreePlay Admin.

</div>

<div class="prereqs">
<h4>Før du begynder</h4>

- Opret en [planstype](./plans.md) med [Lessons.church](../../b1-church/content/lessons.md) eller andet lektionsindhold planlagt
- Have en [SignPresenter](https://www.signpresenter.com)-konto og en enhed sat op til at vise den, eller en TV med [FreePlay](../../freeplay/)

</div>

## Hent feed-URL'en

1. Gå til **Serving**, vælg den tjeneste, der indeholder din planstype, og klik på planstypen for at åbne den.
2. Klik på **Digital Signage** (tv-ikonet) øverst på siden for planstypen.
3. I dialogen **Digital Signage Feed** klikker du på kopiknappen ved siden af **Feed Url**.

:::info
Feed-URL'en er knyttet til planstypen, ikke til en enkelt plan. Den følger automatisk den plan, der er planlagt som aktuel for den planstype, så du kun skal opsætte den én gang.
:::

## Tilslut til SignPresenter

Feedet er bygget til at fungere med [SignPresenter](https://www.signpresenter.com), en digital signage-app fra en tredjepart. Indsæt den kopierede URL i SignPresenter som et eksternt feed for at vise dit aktuelle lektionsindhold på en tilsluttet skærm.

For trin-for-trin-opsætning i SignPresenter, se [SignPresenters vejledning til Lessons.church](https://support.signpresenter.com/topics/lessons-dot-church.html). Dialogen linker også til disse instruktioner.

## Brug FreePlay-TV'er i stedet

Hvis dine skærme kører [FreePlay](../../freeplay/), behøver du ikke feed-URL'en. Dialogen **Digital Signage Feed** linker til **admin.freeplay.church/calendar**, hvor du kan planlægge denne planstype på dine FreePlay-TV'er:

1. Klik på linket **admin.freeplay.church/calendar** i dialogen. FreePlay Admin bruger samme login som B1 Admin.
2. Vælg skærmgruppen for dine TV'er, og klik på **Add schedule**.
3. Under **Play** vælger du din planstype under **Service plans**. Den er markeret med **(current plan)**.
4. Angiv dage og tidspunkter, og klik derefter på **Save**.

TV'erne viser den plan, der er aktuel for planstypen hver uge, på de tidspunkter du har angivet. Dette fungerer også med Go Curriculum-lektioner, inklusive planer du har tilpasset. FreePlay logger ind med den Go Curriculum-konto, der er knyttet til tjenesten under **Content Providers** (se [Planlægning af lektioner](./scheduling-lessons.md)), eller kirkens Go Curriculum-forbindelse, hvis tjenesten ikke har en. Se [Planlægning af kalenderen](../../freeplay/scheduled-mode/scheduling-the-calendar) for alle mulighederne, og [Parring af en skærm](../../freeplay/scheduled-mode/pairing-a-screen) for at tilføje en TV.

:::note
Feed-URL'en inkluderer ikke Go Curriculum-medier, fordi dette indhold kræver din kirkes Go Curriculum-login. For at vise en Go Curriculum-lektion på en TV i lobbyen eller klasselokalet, brug FreePlay.
:::

## Næste skridt

- Administrer de planer, der forsyner denne digital signage-visning, på siden [Plans](./plans.md)
- Planlæg indhold med [Lessons.church](./scheduling-lessons.md)
- Sæt FreePlay-TV'er på en kalender med [Scheduled Mode](../../freeplay/scheduled-mode/)
