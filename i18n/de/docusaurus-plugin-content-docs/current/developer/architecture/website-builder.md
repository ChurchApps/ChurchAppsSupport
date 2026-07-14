---
title: "Website-Builder Architektur"
---

# Website-Builder Architektur

<div class="article-intro">

Jede Kirchenwebsite, die von B1App bereitgestellt wird, wird aus einem Inhaltsbaum gerendert – Seiten, Abschnitte, Elemente – gespeichert in der ContentApi und visuell in B1Admin bearbeitet. Eine gemeinsame Komponentenbibliothek rendert sowohl die Editor-Vorschau als auch die Live-Website, ein Element-Typ-Katalog definiert, was auf einer Seite erscheinen kann, und ein separater KI-Dienst kann diesen Baum generieren oder umschreiben.

</div>

## Übersicht

Drei Regeln gelten über den gesamten Stack:

1. **Ein Baum, zwei Renderer.** Eine Seite ist ein `Seiten → Abschnitte → Elemente` Baum, in dem jeder Knoten seine Einstellungen als `answers` JSON-Blob trägt. Die gleichen Apphelper-Komponenten rendern den Drag-and-Drop-Editor in B1Admin und die Server-gerenderte öffentliche Website in B1App.
2. **Der Vertrag lebt in `@churchapps/helpers`.** `ElementTypes.ts` ist der einzelne Katalog von Element-Typen; Renderer werden durch eine Registry in Apphelper aufgelöst; Editor-Formulare leben in B1Admin.
3. **Die öffentliche Website liest anonyme Endpoints.** Alles, das B1App benötigt – der Seitenbaum, Einstellungen, Blog-Einträge, Weiterleitungen – ist öffentlich. Auth ist optional: Ein JWT auf dem anonymen Baum-Endpoint schaltet nur-Member-Seiten frei.

## Der Inhaltsbaum

| Tabelle | Rolle |
|-------|--------|
| `pages` | Eine Seite pro URL |
| `sections` | Horizontale Bänder auf einer Seite |
| `elements` | Inhaltsabschnitte in einem Abschnitt |
| `blocks` | Wiederverwendbare Abschnitt/Element-Gruppen |
| `posts` | Blog-Metadaten |

## Element-Katalog

**35 Typen versandt heute:** row, column, box, carousel, text, image, video, donation, form, calendar, sermons, und mehr.
