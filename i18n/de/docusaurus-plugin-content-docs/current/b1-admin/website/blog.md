---
title: "Blog"
---

# Blog

<div class="article-intro">

Die Blog-Seite ermöglicht es Ihnen, Nachrichten, Aktualisierungen und Andachten auf Ihrer Kirchenwebseite zu veröffentlichen. Posts werden in einer Kartenliste unter `/blog`, unter ihrer eigenen URL und in einem RSS-Feed angezeigt, den andere Tools (wie Zapier) auf neue Posts ansehen können.

</div>

<div class="prereqs">
<h4>Vor dem Start</h4>

- Abschließende Schritte [Initial Setup](initial-setup) für Ihre Website
- Fügen Sie einen Navigationslink zu `/blog` aus [Managing Pages](managing-pages) hinzu, wenn Sie möchten, dass Besucher Ihren Blog aus dem Menü finden

</div>

## Zugriff auf den Blog

1. Klicken Sie in B1 Admin auf der linken Seite auf **Website**.
2. Klicken Sie auf die Registerkarte **Blog** oben in der Website Pages-Ansicht.
3. Die Blog-Seite listet jeden Post zusammen mit seinem Status und Veröffentlichungsdatum auf.

## Hinzufügen eines Posts

1. Klicken Sie oben rechts auf **Add Post**.
2. Geben Sie einen **Title** ein. Ein URL-freundlicher Slug wird für Sie automatisch während der Eingabe generiert — Sie können ihn direkt bearbeiten, wenn Sie eine andere Adresse wünschen.
3. Fügen Sie einen **Excerpt** hinzu — eine kurze Zusammenfassung, die in der Post-Listing, Meta-Beschreibungen und RSS-Feed angezeigt wird. Wenn Sie es leer lassen, wird eines automatisch aus dem Anfang Ihres Post-Inhalts generiert.
4. Schreiben Sie den Post-Body im Editor **Content** mit Markdown. Klicken Sie auf **Preview**, um zu sehen, wie der formatierte Post aussehen wird.
5. Wählen Sie eine **Category** (wählen Sie eine vorhandene oder geben Sie eine neue ein) und optionale kommagetrennte **Tags**.
6. Klicken Sie auf **Select Image**, um ein Foto aus Ihrer [Files](files) Galerie auszuwählen, oder laden Sie ein neues hoch. Hochgeladene Fotos öffnen sich in einem integrierten Zuschneide-Tool, das auf ein 16:9-Verhältnis beschränkt ist, damit Sie jeden Frame auf das Post-Header und die Listenkarten anpassen können.
7. Legen Sie den **Author** fest — es wird standardmäßig zu Ihnen, aber Sie können jede Person in Ihrer Datenbank suchen und auswählen.
8. Schalten Sie **Published** ein und legen Sie ein **Publish Date** fest, wenn Sie bereit sind, den Post öffentlich zu machen. Lassen Sie es aus, um den Post als Entwurf zu speichern.

:::tip
Legen Sie ein **Publish Date** in der Zukunft fest, um einen Post zu planen. Er bleibt für Besucher verborgen und zeigt einen **Scheduled**-Chip in der Blog-Liste an, bis dieses Datum ankommt.
:::

## Post-Zustände

Jeder Post in der Liste zeigt einen von drei Zuständen:

- **Draft** — Nicht veröffentlicht. Nur in der Admin sichtbar.
- **Scheduled** — Published ist an, aber das Veröffentlichungsdatum liegt in der Zukunft.
- **Published** — Live auf Ihrer Website und im RSS-Feed enthalten.

## Bearbeiten, Anzeigen einer Vorschau und Löschen von Posts

- Klicken Sie auf das Symbol **Edit** neben einem Post, um Änderungen vorzunehmen.
- Klicken Sie auf das Symbol **View** (sichtbar auf veröffentlichten Posts), um den Live-Post auf Ihrer Website in einer neuen Registerkarte zu öffnen.
- Klicken Sie auf das Symbol **Delete**, um einen Post dauerhaft zu entfernen.

## Wie Besucher Ihren Blog sehen

Veröffentlichte Posts werden unter `{yoursite}/blog` angezeigt, 10 pro Seite mit Links **Older**/**Newer**, um Ihr Archiv zu durchblättern, zusammen mit einem Kategoriefilter und der Byline und dem Foto jedes Posts. Tags werden auch als anklickbare Chips gerendert, da Besucher die Liste nach Tag auf die gleiche Weise filtern können. Einzelne Posts werden unter `{yoursite}/blog/{slug}` ausgeführt und enthalten zugehörige Posts aus der gleichen Kategorie. Die Blog-Seite veröffentlicht auch einen RSS-Feed, der von Feed-Readern und Automatisierungstools wie Zapier automatisch erkannt wird.

:::info
Blog-Posts sind ein separater Content-Typ von regulären Website-Seiten — sie werden nicht im [Seiten-Editor](page-editor) erstellt und erscheinen nicht in der Seitenliste. Dies hält das Blog-Authoring schnell und auf das Schreiben konzentriert.
:::

## Nächste Schritte

- [Managing Pages](managing-pages) — Addieren Sie einen Navigationslink zu Ihrem Blog
- [Files](files) — Laden Sie Fotos hoch, um sie in Ihren Posts zu verwenden
- [Zapier Integration](../integrations/zapier.md) — Trigger-Automatisierungen, wenn neue Posts veröffentlicht werden
