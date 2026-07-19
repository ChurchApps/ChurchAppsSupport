---
title: "Blog"
---

# Blog

<div class="article-intro">

Die Seite "Blog" ermöglicht es dir, Nachrichten, Updates und Andachten auf deiner Kirchenwebsite zu veröffentlichen. Posts erscheinen in einer Kartenliste bei `/blog`, auf ihrer eigenen URL und in einem RSS-Feed, dem andere Tools (wie Zapier) neue Posts Überwachen können.

</div>

<div class="prereqs">
<h4>Bevor du beginnst</h4>

- Vollführe die [Anfangseinrichtung](initial-setup) für deine Website
- Füge einen Navigations-Link zu `/blog` von [Seiten verwalten](managing-pages) hinzu, wenn du möchtest, dass Besucher deinen Blog vom Menü aus finden

</div>

## Zugriff auf den Blog

1. Klicke in B1 Admin auf **Website** im linken Menü.
2. Klicke auf den Reiter **Blog** oben in der Ansicht "Website-Seiten".
3. Die Seite "Blog" listet jeden Post zusammen mit seinem Zustand und Veröffentlichungsdatum auf.

## Hinzufügen eines Posts

1. Klicke auf **Post hinzufügen** in der oberen rechten Ecke.
2. Gib einen **Titel** ein. Ein URL-freundlicher Slug wird dir automatisch generiert, während du gibst – du kannst ihn direkt bearbeiten, wenn du eine andere Adresse möchtest.
3. Füge einen **Excerpt** hinzu – eine kurze Zusammenfassung, die in der Post-Listing, Meta-Beschreibungen und RSS-Feed angezeigt wird. Wenn du ihn blank lässt, wird einer automatisch aus dem Anfang deines Post-Inhalts generiert.
4. Schreibe den Post-Body im **Inhalts**-Editor mit Markdown. Klicke auf **Vorschau**, um zu sehen, wie der formatierte Post aussieht.
5. Wähle eine **Kategorie** (wähle eine bestehende aus oder gib eine neue ein) und optionale kommagetrennte **Tags**.
6. Klicke auf **Bild auswählen**, um ein Foto aus deiner [Dateien](files)-Galerie auszuwählen. Verwende ein 16:9-Bild für die beste Anpassung in der Post-Kopfzeile und Listing-Karten.
7. Stelle den **Autor** ein – es ist standardmäßig dich, aber du kannst nach einer beliebigen Person in deiner Datenbank suchen und auswählen.
8. Schalte **Veröffentlicht** ein und stelle ein **Veröffentlichungsdatum** ein, wenn du den Post öffentlich machen möchtest. Lasse ihn aus, um den Post als Entwurf zu speichern.

:::tip
Stelle ein **Veröffentlichungsdatum** in der Zukunft ein, um einen Post zu planen. Er bleibt vor Besuchern verborgen und zeigt ein **Geplant**-Chip in der Blog-Liste, bis dieses Datum eintrifft.
:::

## Post-Zustände

Jeder Post in der Liste zeigt einen von drei Zuständen:

- **Entwurf** – Nicht veröffentlicht. Nur im Admin sichtbar.
- **Geplant** – Veröffentlicht ist an, aber das Veröffentlichungsdatum ist in der Zukunft.
- **Veröffentlicht** – Live auf deiner Website und enthalten im RSS-Feed.

## Bearbeiten, Vorschau und Löschen von Posts

- Klicke auf das Symbol **Bearbeiten** neben einem Post, um Änderungen vorzunehmen.
- Klicke auf das Symbol **Anzeigen** (sichtbar auf veröffentlichten Posts), um den Live-Post auf deiner Website in einem neuen Tab zu öffnen.
- Klicke auf das Symbol **Löschen**, um einen Post dauerhaft zu entfernen.

## Wie Besucher deinen Blog sehen

Veröffentlichte Posts erscheinen bei `{yoursite}/blog`, mit einem Kategoriefilter und jedem Posts Byline und Foto. Individuelle Posts leben bei `{yoursite}/blog/{slug}` und enthalten verwandte Posts aus der gleichen Kategorie. Die Blog-Seite veröffentlicht auch einen RSS-Feed, der von Feed-Readern und Automatisierungstools wie Zapier automatisch erkannt wird.

:::info
Blog-Posts sind ein separater Inhaltstyp von regulären Website-Seiten – sie werden nicht im [Page-Editor](page-editor) erstellt und erscheinen nicht in der Liste "Seiten". Dies hält das Blog-Schreiben schnell und konzentriert auf das Schreiben.
:::

## Nächste Schritte

- [Seiten verwalten](managing-pages) – Füge einen Navigations-Link zu deinem Blog hinzu
- [Dateien](files) – Lade Fotos hoch, um sie in deinen Posts zu verwenden
- [Zapier-Integration](../integrations/zapier.md) – Triggere Automatisierungen, wenn neue Posts veröffentlicht werden
