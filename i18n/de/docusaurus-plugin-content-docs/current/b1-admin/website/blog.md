---
title: "Blog"
---

# Blog

<div class="article-intro">

Auf der Seite Blog veröffentlichen Sie Neuigkeiten, Updates und Andachten auf Ihrer Kirchenwebsite. Beiträge erscheinen in einer Kartenliste unter `/blog`, jeweils unter ihrer eigenen Adresse und in einem RSS-Feed, den andere Werkzeuge (etwa Zapier) auf neue Beiträge überwachen können.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Schließen Sie die [Ersteinrichtung](initial-setup) für Ihre Website ab
- Fügen Sie über [Seiten verwalten](managing-pages) einen Navigationslink zu `/blog` hinzu, wenn Besucher Ihren Blog über das Menü finden sollen

</div>

## Auf den Blog zugreifen

1. Öffnen Sie in B1 Admin das [Sprungmenü](../introduction.md#getting-around-with-the-jump-menu) (die Suchleiste oben links) und klappen Sie **Website** auf.
2. Klicken Sie auf **Blog**.
3. Die Seite Blog listet jeden Beitrag mit seinem Status und Veröffentlichungsdatum auf.

## Einen Beitrag hinzufügen

1. Klicken Sie oben rechts auf **Beitrag hinzufügen**.
2. Geben Sie einen **Titel** ein. Eine URL-freundliche **Webadresse** (Slug) wird beim Tippen automatisch erzeugt -- Sie können sie direkt bearbeiten, wenn Sie eine andere Adresse möchten.
3. Fügen Sie einen **Auszug** hinzu -- eine kurze Zusammenfassung, die in der Beitragsliste, in den Meta-Beschreibungen und im RSS-Feed angezeigt wird. Lassen Sie das Feld leer, wird automatisch ein Auszug aus dem Anfang des Beitragsinhalts erzeugt.
4. Schreiben Sie den Beitragstext im Editor **Inhalt** mit Markdown. Klicken Sie auf **Vorschau**, um zu sehen, wie der formatierte Beitrag aussieht.
5. Wählen Sie eine **Kategorie** (eine vorhandene oder eine neue, die Sie eintippen) und optionale, durch Kommas getrennte **Schlagwörter**.
6. Klicken Sie auf **Bild auswählen**, um ein Foto aus Ihrer Bildergalerie unter [Dateien](files) zu wählen oder ein neues hochzuladen. Hochgeladene Fotos öffnen sich in einem integrierten Zuschneidewerkzeug mit festem Seitenverhältnis 16:9, sodass Sie jedes Foto passend für den Beitragskopf und die Kartenvorschau zuschneiden können.
7. Legen Sie den **Autor** fest -- standardmäßig sind Sie es selbst, Sie können aber jede Person in Ihrer Datenbank suchen und auswählen.
8. Aktivieren Sie **Veröffentlicht** und legen Sie ein **Veröffentlichungsdatum** fest, wenn der Beitrag öffentlich werden soll. Lassen Sie es aus, um den Beitrag als Entwurf zu speichern.

:::tip
Legen Sie ein **Veröffentlichungsdatum** in der Zukunft fest, um einen Beitrag zu planen. Er bleibt Besuchern verborgen und zeigt in der Blogliste einen Chip **Geplant**, bis dieses Datum erreicht ist.
:::

## Beitragsstatus

Jeder Beitrag in der Liste zeigt einen von drei Status:

- **Entwurf** -- Nicht veröffentlicht. Nur im Admin sichtbar.
- **Geplant** -- Veröffentlicht ist aktiviert, das Veröffentlichungsdatum liegt aber in der Zukunft.
- **Veröffentlicht** -- Live auf Ihrer Website und im RSS-Feed enthalten.

## Beiträge bearbeiten, in der Vorschau ansehen und löschen

- Klicken Sie neben einem Beitrag auf **Bearbeiten**, um Änderungen vorzunehmen.
- Klicken Sie auf **Auf der Website ansehen** (bei veröffentlichten Beiträgen angezeigt), um den live geschalteten Beitrag auf Ihrer Website in einem neuen Tab zu öffnen.
- Klicken Sie auf **Löschen**, um einen Beitrag endgültig zu entfernen.

## So sehen Besucher Ihren Blog

Veröffentlichte Beiträge erscheinen unter `{yoursite}/blog`, 10 pro Seite, mit Links **Ältere**/**Neuere**, um durch Ihr Archiv zu blättern, dazu ein Kategoriefilter sowie Autorzeile und Foto jedes Beitrags. Auch Schlagwörter werden als anklickbare Chips dargestellt, sodass Besucher die Liste ebenso nach Schlagwort filtern können. Einzelne Beiträge sind unter `{yoursite}/blog/{slug}` erreichbar und enthalten verwandte Beiträge aus derselben Kategorie. Die Blogseite stellt außerdem einen RSS-Feed bereit, den Feed-Reader und Automatisierungswerkzeuge wie Zapier automatisch finden.

:::info
Blogbeiträge sind ein eigener Inhaltstyp neben den regulären Websiteseiten -- sie werden nicht im [Seiteneditor](page-editor) erstellt und erscheinen nicht in der Seitenliste. So bleibt das Verfassen von Beiträgen schnell und konzentriert auf das Schreiben.
:::

## Kommentare unter Beiträgen hinzufügen

B1 hostet selbst keine Blogkommentare, Sie können aber einen Kommentardienst einbinden. Außerdem können Sie unter jedem Beitrag auch etwas anderes platzieren, etwa eine Newsletter-Anmeldung oder einen Spendenbutton.

1. Registrieren Sie sich bei einem Kommentardienst wie [Hyvor Talk](https://talk.hyvor.com), [FastComments](https://fastcomments.com) oder [Disqus](https://disqus.com) und kopieren Sie dessen Einbettungscode.
2. Scrollen Sie auf der Seite Blog zu **Unter jedem Beitrag**.
3. Fügen Sie den Einbettungscode ein und klicken Sie auf **Speichern**.

Der Code erscheint unter dem Inhalt jedes veröffentlichten Beitrags. Die Moderation und die Spamfilterung übernimmt Ihr Kommentardienst, daher sollten Sie dessen Dashboard regelmäßig prüfen.

:::tip
Leeren Sie das Feld und klicken Sie auf **Speichern**, um den Code aus jedem Beitrag zu entfernen. Nur Personen, die Kircheneinstellungen bearbeiten dürfen, sehen dieses Feld.
:::

## Wie geht es weiter?

- [Seiten verwalten](managing-pages) -- einen Navigationslink zu Ihrem Blog hinzufügen
- [Dateien](files) -- Fotos für Ihre Beiträge hochladen
- [Zapier-Integration](../integrations/zapier.md) -- Automatisierungen auslösen, sobald neue Beiträge veröffentlicht werden
