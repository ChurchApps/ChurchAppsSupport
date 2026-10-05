---
title: "Blog"
---

# Blog

<div class="article-intro">

Die Blog-Seite ermöglicht es Ihnen, Nachrichten, Updates und Andachten auf Ihrer Kirchenwebsite zu veröffentlichen. Posts werden in einer Kartenliste unter `/blog`, unter ihrer eigenen URL und in einem RSS-Feed angezeigt, den andere Tools (wie Zapier) beobachten können.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Führen Sie die [Initiale Einrichtung](initial-setup) für Ihre Website durch
- Fügen Sie einen Navigations-Link zu `/blog` von [Managing Pages](managing-pages) hinzu, wenn Sie möchten, dass Besucher Ihren Blog aus dem Menü finden

</div>

## Zugriff auf den Blog

1. Öffnen Sie in B1 Admin das [Jump-Menü](../introduction.md#getting-around-with-the-jump-menu) (die Suchleiste oben links) und erweitern Sie **Website**.
2. Klicken Sie auf **Blog**.
3. Die Blog-Seite listet jeden Post zusammen mit seinem Status und Veröffentlichungsdatum auf.

## Einen Post hinzufügen

1. Klicken Sie auf **Add Post** in der oberen rechten Ecke.
2. Geben Sie einen **Title** ein. Ein URL-freundlicher Slug wird beim Tippen automatisch für Sie generiert -- Sie können ihn direkt bearbeiten, wenn Sie eine andere Adresse möchten.
3. Fügen Sie ein **Excerpt** hinzu -- eine kurze Zusammenfassung, die in der Post-Liste, Meta-Beschreibungen und RSS-Feeds angezeigt wird. Wenn Sie es leer lassen, wird eines automatisch vom Anfang Ihres Post-Inhalts generiert.
4. Schreiben Sie den Post-Body im **Content**-Editor mit Markdown. Klicken Sie auf **Preview**, um zu sehen, wie der formatierte Post aussieht.
5. Wählen Sie eine **Category** (wählen Sie eine bestehende oder geben Sie eine neue ein) und optional kommagetrennte **Tags**.
6. Klicken Sie auf **Select Image**, um ein Foto aus Ihrer [Files](files)-Galerie zu wählen oder laden Sie ein neues hoch. Hochgeladene Fotos werden in einem integrierten Zuschneide-Tool geöffnet, das auf ein 16:9-Verhältnis gesperrt ist, damit Sie jedes Foto so rahmen können, dass es in die Post-Kopfzeile und Listenkartenpasst.
7. Legen Sie den **Author** fest -- standardmäßig sind Sie es, aber Sie können jede Person in Ihrer Datenbank suchen und auswählen.
8. Aktivieren Sie **Published** und legen Sie ein **Publish Date** fest, wenn Sie den Post öffentlich machen möchten. Lassen Sie es deaktiviert, um den Post als Entwurf zu speichern.

:::tip
Legen Sie ein **Publish Date** in der Zukunft fest, um einen Post zu planen. Er bleibt für Besucher verborgen und zeigt einen **Scheduled**-Chip in der Blog-Liste an, bis dieses Datum erreicht ist.
:::

## Post-Zustände

Jeder Post in der Liste zeigt einen von drei Zuständen:

- **Draft** -- Nicht veröffentlicht. Nur im Admin sichtbar.
- **Scheduled** -- Published ist aktiviert, aber das Veröffentlichungsdatum liegt in der Zukunft.
- **Published** -- Live auf Ihrer Website und im RSS-Feed enthalten.

## Posts bearbeiten, in der Vorschau anzeigen und löschen

- Klicken Sie auf das **Edit**-Symbol neben einem Post, um Änderungen vorzunehmen.
- Klicken Sie auf das **View**-Symbol (sichtbar auf veröffentlichten Posts), um den Live-Post auf Ihrer Website in einem neuen Tab zu öffnen.
- Klicken Sie auf das **Delete**-Symbol, um einen Post dauerhaft zu entfernen.

## Wie Besucher Ihren Blog sehen

Veröffentlichte Posts werden unter `{yoursite}/blog` angezeigt, 10 pro Seite mit **Ältere**/**Neuere**-Links, um Ihr Archiv zu durchsuchen, zusammen mit einem Kategoriefilter und der Byline und dem Foto jedes Posts. Tags werden auch als anklickbare Chips angezeigt, sodass Besucher die Liste wie bei Kategorien nach Tag filtern können. Individuelle Posts befinden sich unter `{yoursite}/blog/{slug}` und enthalten verwandte Posts aus der gleichen Kategorie. Die Blog-Seite veröffentlicht auch einen RSS-Feed, der von Feed-Readern und Automatisierungstools wie Zapier automatisch erkannt wird.

:::info
Blog-Posts sind ein separater Inhaltstyp von regulären Website-Seiten -- sie werden nicht im [Seiten-Editor](page-editor) erstellt und erscheinen nicht in der Seiten-Liste. Dies hält das Blog-Authoring schnell und konzentriert auf das Schreiben.
:::

## Nächste Schritte

- [Managing Pages](managing-pages) -- Fügen Sie einen Navigations-Link zu Ihrem Blog hinzu
- [Files](files) -- Laden Sie Fotos hoch, um sie in Ihren Posts zu verwenden
- [Zapier Integration](../integrations/zapier.md) -- Lösen Sie Automatisierungen aus, wenn neue Posts veröffentlicht werden
