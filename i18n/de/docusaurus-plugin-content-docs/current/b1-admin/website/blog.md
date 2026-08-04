---
title: "Blog"
---

# Blog

<div class="article-intro">

Auf der Blog-Seite können Sie Neuigkeiten, Updates und Andachten auf der Website Ihrer Gemeinde veröffentlichen. Beiträge erscheinen in einer Kartenliste unter `/blog`, unter ihrer eigenen URL und in einem RSS-Feed, den andere Tools (wie Zapier) auf neue Beiträge überwachen können.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Schließen Sie die [Ersteinrichtung](initial-setup) Ihrer Website ab
- Fügen Sie über [Seiten verwalten](managing-pages) einen Navigationslink zu `/blog` hinzu, wenn Besucher Ihren Blog über das Menü finden sollen

</div>

## Auf den Blog zugreifen

1. Klicken Sie in B1 Admin im linken Menü auf **Website**.
2. Klicken Sie oben in der Ansicht der Website-Seiten auf den Tab **Blog**.
3. Die Blog-Seite listet jeden Beitrag zusammen mit seinem Status und Veröffentlichungsdatum auf.

## Einen Beitrag hinzufügen

1. Klicken Sie oben rechts auf **Beitrag hinzufügen**.
2. Geben Sie einen **Titel** ein. Ein URL-freundlicher Slug wird beim Tippen automatisch für Sie generiert — Sie können ihn direkt bearbeiten, wenn Sie eine andere Adresse möchten.
3. Fügen Sie einen **Auszug** hinzu -- eine kurze Zusammenfassung, die in der Beitragsliste, in Meta-Beschreibungen und im RSS-Feed angezeigt wird. Wenn Sie ihn leer lassen, wird automatisch einer aus dem Anfang Ihres Beitragsinhalts generiert.
4. Verfassen Sie den Beitragstext im **Inhalt**-Editor mit Markdown. Klicken Sie auf **Vorschau**, um zu sehen, wie der formatierte Beitrag aussehen wird.
5. Wählen Sie eine **Kategorie** (eine vorhandene auswählen oder eine neue eingeben) und optionale, kommagetrennte **Tags**.
6. Klicken Sie auf **Bild auswählen**, um ein Foto aus Ihrer [Dateien](files)-Galerie auszuwählen, oder laden Sie ein neues hoch. Hochgeladene Fotos öffnen sich in einem integrierten Zuschneide-Werkzeug, das auf ein Verhältnis von 16:9 fixiert ist, sodass Sie jedes Foto passend für den Beitragskopf und die Listenkarten zuschneiden können.
7. Legen Sie den **Autor** fest -- standardmäßig sind Sie es, aber Sie können nach jeder Person in Ihrer Datenbank suchen und sie auswählen.
8. Aktivieren Sie **Veröffentlicht** und legen Sie ein **Veröffentlichungsdatum** fest, wenn Sie bereit sind, den Beitrag öffentlich zu machen. Lassen Sie es deaktiviert, um den Beitrag als Entwurf zu speichern.

:::tip
Legen Sie ein **Veröffentlichungsdatum** in der Zukunft fest, um einen Beitrag zu planen. Er bleibt für Besucher verborgen und zeigt in der Blog-Liste einen **Geplant**-Chip an, bis dieses Datum erreicht ist.
:::

## Beitragsstatus

Jeder Beitrag in der Liste zeigt einen von drei Zuständen:

- **Entwurf** -- Nicht veröffentlicht. Nur im Admin sichtbar.
- **Geplant** -- Veröffentlicht ist aktiviert, aber das Veröffentlichungsdatum liegt in der Zukunft.
- **Veröffentlicht** -- Live auf Ihrer Website und im RSS-Feed enthalten.

## Beiträge bearbeiten, in der Vorschau ansehen und löschen

- Klicken Sie neben einem Beitrag auf das Symbol **Bearbeiten**, um Änderungen vorzunehmen.
- Klicken Sie auf das Symbol **Ansehen** (bei veröffentlichten Beiträgen sichtbar), um den Live-Beitrag auf Ihrer Website in einem neuen Tab zu öffnen.
- Klicken Sie auf das Symbol **Löschen**, um einen Beitrag dauerhaft zu entfernen.

## Wie Besucher Ihren Blog sehen

Veröffentlichte Beiträge erscheinen unter `{ihresite}/blog`, 10 pro Seite mit Links **Älter**/**Neuer** zum Durchblättern Ihres Archivs, zusammen mit einem Kategoriefilter sowie Autorenzeile und Foto jedes Beitrags. Tags werden ebenfalls als anklickbare Chips dargestellt, sodass Besucher die Liste auf dieselbe Weise nach Tag filtern können. Einzelne Beiträge befinden sich unter `{ihresite}/blog/{slug}` und enthalten verwandte Beiträge aus derselben Kategorie. Die Blog-Seite veröffentlicht außerdem einen RSS-Feed, der von Feed-Readern und Automatisierungstools wie Zapier automatisch erkannt wird.

:::info
Blog-Beiträge sind ein eigener Inhaltstyp, getrennt von regulären Website-Seiten -- sie werden nicht im [Seiten-Editor](page-editor) erstellt und erscheinen nicht in der Seitenliste. So bleibt das Verfassen von Blog-Beiträgen schnell und auf das Schreiben konzentriert.
:::

## Nächste Schritte

- [Seiten verwalten](managing-pages) -- Einen Navigationslink zu Ihrem Blog hinzufügen
- [Dateien](files) -- Fotos hochladen, um sie in Ihren Beiträgen zu verwenden
- [Zapier-Integration](../integrations/zapier.md) -- Automatisierungen auslösen, wenn neue Beiträge veröffentlicht werden
