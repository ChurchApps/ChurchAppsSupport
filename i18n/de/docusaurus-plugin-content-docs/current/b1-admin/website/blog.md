---
title: "Blogbeiträge für Ihre Website in B1 Admin schreiben"
sidebar_label: "Blog"
description: "Blogbeiträge für die Website Ihrer Gemeinde in B1 Admin erstellen, planen und veröffentlichen, mit Auszügen, Kategorien, Schlagwörtern, Kopfbildern und Kommentar-Einbettungen."
---

# Blog

<div class="article-intro">

Auf der Seite Blog veröffentlichen Sie Neuigkeiten, Updates und Andachten auf der Website Ihrer Gemeinde. Beiträge erscheinen in einer Kartenübersicht unter `/blog`, unter einer eigenen URL und in einem RSS-Feed, den andere Werkzeuge (etwa Zapier) auf neue Beiträge überwachen können.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Schließen Sie die [Ersteinrichtung](./initial-setup.md) für Ihre Website ab
- Fügen Sie über [Seiten verwalten](./managing-pages.md) einen Navigationslink zu `/blog` hinzu, wenn Besuchende Ihren Blog über das Menü finden sollen

</div>

## Auf den Blog zugreifen

1. Öffnen Sie in B1 Admin das [Sprungmenü](../introduction.md#getting-around-with-the-jump-menu) (die Suchleiste oben links) und klappen Sie **Website** auf.
2. Klicken Sie auf **Blog**.
3. Die Seite Blog listet alle Beiträge mit ihrem Status und dem Veröffentlichungsdatum auf.

## Einen Beitrag hinzufügen

1. Klicken Sie oben rechts auf **Beitrag hinzufügen**.
2. Geben Sie einen **Titel** ein. Während Sie tippen, wird automatisch eine URL-freundliche **Web-Adresse** (Slug) erzeugt. Sie können sie direkt bearbeiten, wenn Sie eine andere Adresse möchten.
3. Fügen Sie einen **Auszug** hinzu, eine kurze Zusammenfassung, die in der Beitragsübersicht, in den Meta-Beschreibungen und im RSS-Feed erscheint. Lassen Sie das Feld leer, wird automatisch ein Auszug aus dem Anfang Ihres Beitragsinhalts erzeugt.
4. Schreiben Sie den Beitragstext im Editor **Inhalt** mit Markdown. Klicken Sie auf **Vorschau**, um zu sehen, wie der formatierte Beitrag aussieht.
5. Wählen Sie eine **Kategorie** (eine vorhandene oder eine neue, die Sie eintippen) und optional **Schlagwörter**, durch Kommas getrennt.
6. Klicken Sie auf **Bild auswählen**, um ein Foto aus Ihrer Galerie [Dateien](./files.md) zu wählen oder ein neues hochzuladen. Hochgeladene Fotos öffnen sich in einem eingebauten Zuschneidewerkzeug mit festem Seitenverhältnis 16:9. So können Sie jedes Foto für das Kopfbild des Beitrags und die Kartenübersicht passend zuschneiden.
7. Legen Sie den **Autor** fest. Standardmäßig sind Sie es, Sie können aber auch eine beliebige Person aus Ihrer Datenbank suchen und auswählen.
8. Aktivieren Sie **Veröffentlicht** und legen Sie ein **Veröffentlichungsdatum** fest, sobald der Beitrag öffentlich sein soll. Ist die Option ausgeschaltet, wird der Beitrag als Entwurf gespeichert.

:::tip
Legen Sie ein **Veröffentlichungsdatum** in der Zukunft fest, um einen Beitrag zu planen. Er bleibt für Besuchende verborgen und zeigt in der Blogliste ein Etikett **Geplant**, bis das Datum erreicht ist.
:::

## Status der Beiträge

Jeder Beitrag in der Liste zeigt einen von drei Status:

- **Entwurf** -- Nicht veröffentlicht. Nur im Admin sichtbar.
- **Geplant** -- Veröffentlicht ist aktiv, das Veröffentlichungsdatum liegt aber in der Zukunft.
- **Veröffentlicht** -- Live auf Ihrer Website und im RSS-Feed enthalten.

## Beiträge bearbeiten, in der Vorschau ansehen und löschen

- Klicken Sie neben einem Beitrag auf **Bearbeiten**, um Änderungen vorzunehmen.
- Klicken Sie auf **Auf der Website ansehen** (bei veröffentlichten Beiträgen angezeigt), um den Live-Beitrag auf Ihrer Website in einem neuen Tab zu öffnen.
- Klicken Sie auf **Löschen**, um einen Beitrag dauerhaft zu entfernen.

## Wie Besuchende Ihren Blog sehen

Veröffentlichte Beiträge erscheinen unter `{ihreseite}/blog`, zehn pro Seite, mit den Links **Ältere** und **Neuere**, mit denen man durch das Archiv blättert. Dazu kommen ein Kategoriefilter und die Autorenzeile und das Foto jedes Beitrags. Schlagwörter werden ebenfalls als anklickbare Chips dargestellt, sodass Besuchende die Liste genauso nach Schlagwort filtern können. Einzelne Beiträge liegen unter `{ihreseite}/blog/{slug}` und enthalten verwandte Beiträge aus derselben Kategorie. Die Blogseite veröffentlicht außerdem einen RSS-Feed, den Feed-Reader und Automatisierungswerkzeuge wie Zapier automatisch finden.

Veröffentlichte Beiträge können auch im Abschnitt **Neuigkeiten** auf dem Startbildschirm der App Ihrer Gemeinde erscheinen, wenn Sie das aktivieren. Siehe [Abschnitte auf dem Startbildschirm](../settings/mobile-app.md#home-screen-sections).

:::info
Blogbeiträge sind ein eigener Inhaltstyp und unterscheiden sich von regulären Website-Seiten. Sie werden nicht im [Seiteneditor](./page-editor.md) gestaltet und erscheinen nicht in der Liste der Seiten. So bleibt das Verfassen von Blogbeiträgen schnell und auf das Schreiben konzentriert.
:::

## Kommentare unter Beiträgen hinzufügen

B1 hostet selbst keine Blogkommentare. Sie können aber einen Kommentardienst einbinden. Außerdem können Sie unter jedem Beitrag etwas anderes platzieren, etwa eine Newsletter-Anmeldung oder eine Schaltfläche für Spenden.

1. Registrieren Sie sich bei einem Kommentardienst wie [Hyvor Talk](https://talk.hyvor.com), [FastComments](https://fastcomments.com) oder [Disqus](https://disqus.com) und kopieren Sie dessen Einbettungscode.
2. Scrollen Sie auf der Seite Blog zu **Unter jedem Beitrag**.
3. Fügen Sie den Einbettungscode ein und klicken Sie auf **Speichern**.

Der Code erscheint unter dem Inhalt jedes veröffentlichten Beitrags. Der Kommentardienst übernimmt die Moderation und die Spam-Filterung. Prüfen Sie daher regelmäßig dessen Dashboard.

:::tip
Leeren Sie das Feld und klicken Sie auf **Speichern**, um den Code aus allen Beiträgen zu entfernen. Nur Personen, die die Gemeindeeinstellungen bearbeiten dürfen, sehen dieses Feld.
:::

## Nächste Schritte

- [Seiten verwalten](./managing-pages.md) -- Einen Navigationslink zu Ihrem Blog hinzufügen
- [Dateien](./files.md) -- Fotos für Ihre Beiträge hochladen
- [Zapier-Integration](../integrations/zapier.md) -- Automatisierungen auslösen, wenn neue Beiträge veröffentlicht werden
