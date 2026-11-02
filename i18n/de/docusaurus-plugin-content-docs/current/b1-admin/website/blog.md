---
title: "Blog"
---

# Blog

<div class="article-intro">

Auf der Seite Blog veröffentlichen Sie Neuigkeiten, Updates und Andachten auf Ihrer Kirchenwebsite. Beiträge erscheinen in einer Kartenübersicht unter `/blog`, jeweils mit eigener URL und in einem RSS-Feed, den andere Werkzeuge (etwa Zapier) auf neue Beiträge überwachen können.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Schließen Sie die [Erstkonfiguration](initial-setup) für Ihre Website ab
- Fügen Sie unter [Seiten verwalten](managing-pages) einen Navigationslink zu `/blog` hinzu, wenn Besucher Ihren Blog über das Menü finden sollen

</div>

## Auf den Blog zugreifen

1. Öffnen Sie in B1 Admin das [Sprungmenü](../introduction.md#getting-around-with-the-jump-menu) (das Suchfeld oben links) und klappen Sie **Website** auf.
2. Klicken Sie auf **Blog**.
3. Die Seite Blog listet jeden Beitrag mit seinem Status und Veröffentlichungsdatum auf.

## Einen Beitrag hinzufügen

1. Klicken Sie oben rechts auf **Beitrag hinzufügen**.
2. Geben Sie einen **Titel** ein. Eine für Webadressen geeignete **Webadresse** (Slug) wird beim Tippen automatisch erzeugt – Sie können sie direkt bearbeiten, wenn Sie eine andere Adresse möchten.
3. Fügen Sie einen **Auszug** hinzu – eine kurze Zusammenfassung, die in der Beitragsübersicht, in den Meta-Beschreibungen und im RSS-Feed angezeigt wird. Lassen Sie das Feld leer, wird automatisch ein Auszug aus dem Anfang Ihres Beitragsinhalts erzeugt.
4. Schreiben Sie den Beitragstext im Editor **Inhalt** mit Markdown. Klicken Sie auf **Vorschau**, um zu sehen, wie der formatierte Beitrag aussehen wird.
5. Wählen Sie eine **Kategorie** (eine vorhandene oder eine neue) und optional durch Kommas getrennte **Schlagwörter**.
6. Klicken Sie auf **Bild auswählen**, um ein Foto aus Ihrer Galerie unter [Dateien](files) zu wählen, oder laden Sie ein neues hoch. Hochgeladene Fotos öffnen sich in einem integrierten Zuschneidewerkzeug, das auf ein Seitenverhältnis von 16:9 festgelegt ist, sodass Sie jedes Foto so zuschneiden können, dass es in den Beitragskopf und auf die Übersichtskarten passt.
7. Legen Sie den **Autor** fest – standardmäßig sind Sie es selbst, Sie können aber nach jeder Person in Ihrer Datenbank suchen und sie auswählen.
8. Schalten Sie **Veröffentlicht** ein und legen Sie ein **Veröffentlichungsdatum** fest, wenn der Beitrag öffentlich werden soll. Lassen Sie den Schalter aus, um den Beitrag als Entwurf zu speichern.

:::tip
Legen Sie ein **Veröffentlichungsdatum** in der Zukunft fest, um einen Beitrag zu planen. Er bleibt Besuchern verborgen und zeigt in der Liste Blog ein Kennzeichen **Geplant**, bis dieses Datum erreicht ist.
:::

## Beitragsstatus

Jeder Beitrag in der Liste zeigt einen von drei Status:

- **Entwurf** – Nicht veröffentlicht. Nur im Admin sichtbar.
- **Geplant** – Veröffentlicht ist eingeschaltet, das Veröffentlichungsdatum liegt aber in der Zukunft.
- **Veröffentlicht** – Live auf Ihrer Website und im RSS-Feed enthalten.

## Beiträge bearbeiten, ansehen und löschen

- Klicken Sie neben einem Beitrag auf **Bearbeiten**, um Änderungen vorzunehmen.
- Klicken Sie auf **Auf der Website ansehen** (bei veröffentlichten Beiträgen angezeigt), um den live geschalteten Beitrag auf Ihrer Website in einem neuen Tab zu öffnen.
- Klicken Sie auf **Löschen**, um einen Beitrag dauerhaft zu entfernen.

## So sehen Besucher Ihren Blog

Veröffentlichte Beiträge erscheinen unter `{ihreseite}/blog`, zehn pro Seite mit den Links **Ältere**/**Neuere**, mit denen Besucher durch Ihr Archiv blättern können. Dazu gibt es einen Kategoriefilter, und jeder Beitrag zeigt Autorzeile und Foto. Schlagwörter werden ebenfalls als anklickbare Chips dargestellt, sodass Besucher die Liste auf dieselbe Weise nach Schlagwort filtern können. Einzelne Beiträge liegen unter `{ihreseite}/blog/{slug}` und enthalten verwandte Beiträge aus derselben Kategorie. Die Blog-Seite veröffentlicht außerdem einen RSS-Feed, den Feed-Reader und Automatisierungswerkzeuge wie Zapier automatisch finden.

:::info
Blogbeiträge sind ein eigener Inhaltstyp, getrennt von regulären Website-Seiten – sie werden nicht im [Seiteneditor](page-editor) erstellt und erscheinen nicht in der Liste der Seiten. So bleibt das Verfassen von Blogbeiträgen schnell und auf das Schreiben konzentriert.
:::

## Kommentare unter Beiträgen hinzufügen

B1 hostet selbst keine Blog-Kommentare, aber Sie können einen Kommentardienst einbinden. Sie können unter jedem Beitrag außerdem alles andere platzieren, etwa ein Newsletter-Anmeldefeld oder eine Schaltfläche für Spenden.

1. Melden Sie sich bei einem Kommentardienst an, etwa [Hyvor Talk](https://talk.hyvor.com), [FastComments](https://fastcomments.com) oder [Disqus](https://disqus.com), und kopieren Sie dessen Einbettungscode.
2. Scrollen Sie auf der Seite Blog zu **Unter jedem Beitrag**.
3. Fügen Sie den Einbettungscode ein und klicken Sie auf **Speichern**.

Der Code erscheint unter dem Inhalt jedes veröffentlichten Beitrags. Ihr Kommentardienst übernimmt die Moderation und Spam-Filterung, daher sehen Sie regelmäßig in dessen Dashboard nach.

:::tip
Leeren Sie das Feld und klicken Sie auf **Speichern**, um den Code aus allen Beiträgen zu entfernen. Nur Personen, die Kircheneinstellungen bearbeiten dürfen, sehen dieses Feld.
:::

## Nächste Schritte

- [Seiten verwalten](managing-pages) – einen Navigationslink zu Ihrem Blog hinzufügen
- [Dateien](files) – Fotos hochladen, die Sie in Ihren Beiträgen verwenden möchten
- [Zapier-Integration](../integrations/zapier.md) – Automatisierungen auslösen, wenn neue Beiträge veröffentlicht werden
