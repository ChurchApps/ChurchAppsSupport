---
title: "Blogbeiträge für Ihre Website in B1 Admin schreiben"
sidebar_label: "Blog"
description: "Erstellen, planen und veröffentlichen Sie Blogbeiträge auf der Website Ihrer Gemeinde in B1 Admin, einschließlich Auszügen, Kategorien, Schlagwörtern, Kopfbildern und Kommentar-Einbettungen."
---

# Blog

<div class="article-intro">

Die Seite Blog ermöglicht es Ihnen, Neuigkeiten, Updates und Andachten auf der Website Ihrer Gemeinde zu veröffentlichen. Beiträge erscheinen in einer Kartenübersicht unter `/blog`, unter ihrer eigenen Adresse und in einem RSS-Feed, den andere Werkzeuge (etwa Zapier) auf neue Beiträge überwachen können.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Schließen Sie die [Ersteinrichtung](./initial-setup.md) für Ihre Website ab
- Fügen Sie über [Seiten verwalten](./managing-pages.md) einen Navigationslink zu `/blog` hinzu, wenn Besucher Ihren Blog über das Menü finden sollen

</div>

## Auf den Blog zugreifen {#accessing-the-blog}

1. Öffnen Sie in B1 Admin das [Sprungmenü](../introduction.md#getting-around-with-the-jump-menu) (die Suchleiste oben links) und klappen Sie **Website** auf.
2. Klicken Sie auf **Blog**.
3. Die Seite Blog listet jeden Beitrag mit seinem Status und Veröffentlichungsdatum auf.

## Einen Beitrag hinzufügen {#adding-a-post}

1. Klicken Sie oben rechts auf **Beitrag hinzufügen**.
2. Geben Sie einen **Titel** ein. Eine für Adressen geeignete **Web-Adresse** (Slug) wird beim Tippen automatisch erzeugt – Sie können sie direkt bearbeiten, wenn Sie eine andere Adresse möchten.
3. Fügen Sie einen **Auszug** hinzu – eine kurze Zusammenfassung, die in der Beitragsübersicht, in den Meta-Beschreibungen und im RSS-Feed angezeigt wird. Lassen Sie das Feld leer, wird automatisch ein Auszug aus dem Anfang Ihres Beitragsinhalts erzeugt.
4. Schreiben Sie den Beitragstext im Editor **Inhalt** mit Markdown. Klicken Sie auf **Vorschau**, um zu sehen, wie der formatierte Beitrag aussehen wird.
5. Wählen Sie eine **Kategorie** (eine vorhandene oder eine neue) und optionale, durch Kommas getrennte **Schlagwörter**.
6. Klicken Sie auf **Bild auswählen**, um ein Foto aus Ihrer Galerie unter [Dateien](./files.md) zu wählen, oder laden Sie ein neues hoch. Hochgeladene Fotos öffnen ein integriertes Zuschneidewerkzeug mit festem Seitenverhältnis 16:9, sodass Sie jedes Foto passend für das Kopfbild des Beitrags und die Übersichtskarten zuschneiden können.
7. Legen Sie den **Autor** fest – standardmäßig sind Sie es selbst, Sie können aber jede Person in Ihrer Datenbank suchen und auswählen.
8. Aktivieren Sie **Veröffentlicht**, wenn der Beitrag öffentlich werden soll. Es erscheint ein Feld **Veröffentlichungsdatum**, das auf heute gesetzt ist; ändern Sie es, wenn Sie ein anderes Datum möchten. Lassen Sie den Schalter auf **Entwurf**, um den Beitrag als Entwurf zu speichern.
9. Klicken Sie auf **Speichern**. Ein Beitrag braucht einen Titel und eine Web-Adresse, die kein anderer Beitrag verwendet.

:::tip
Legen Sie ein **Veröffentlichungsdatum** in der Zukunft fest, um einen Beitrag zu planen. Er bleibt für Besucher verborgen und zeigt in der Blogliste ein Etikett **Geplant**, bis dieses Datum erreicht ist.
:::

## Beitragsstatus {#post-states}

Jeder Beitrag in der Liste zeigt einen von drei Status:

- **Entwurf** -- Nicht veröffentlicht. Nur im Administrationsbereich sichtbar.
- **Geplant** -- Veröffentlicht ist aktiviert, das Veröffentlichungsdatum liegt aber in der Zukunft.
- **Veröffentlicht** -- Live auf Ihrer Website und im RSS-Feed enthalten.

## Beiträge bearbeiten, ansehen und löschen {#editing-previewing-and-deleting-posts}

- Klicken Sie neben einem Beitrag auf **Bearbeiten**, um Änderungen vorzunehmen.
- Klicken Sie auf **Auf der Website ansehen** (bei veröffentlichten Beiträgen angezeigt), um den live geschalteten Beitrag auf Ihrer Website in einem neuen Tab zu öffnen.
- Klicken Sie auf **Löschen**, um einen Beitrag dauerhaft zu entfernen.

## So sehen Besucher Ihren Blog {#how-visitors-see-your-blog}

Veröffentlichte Beiträge erscheinen unter `{yoursite}/blog`, 10 pro Seite, mit Links **Ältere Beiträge**/**Neuere Beiträge**, um durch Ihr Archiv zu blättern. Dazu kommen Kategorie-Chips, die die Liste filtern, sowie die Zeile mit Autor und Foto jedes Beitrags. Schlagwörter erscheinen am Ende jedes Beitrags als anklickbare Chips, mit denen Besucher die Liste ebenso nach Schlagwort filtern können. Einzelne Beiträge liegen unter `{yoursite}/blog/{slug}` und enden mit einem Abschnitt **Mehr in** *Kategorie*, der bis zu drei weitere Beiträge aus derselben Kategorie auflistet. Was Besucher sehen, erfahren Sie im Leitfaden [Blog](../../b1-church/content/blog.md) für B1.church. Die Blogseite stellt außerdem einen RSS-Feed bereit, den Feed-Reader und Automatisierungswerkzeuge wie Zapier automatisch finden.

Veröffentlichte Beiträge können auch im Abschnitt **Nachrichten** auf dem Startbildschirm der App Ihrer Gemeinde erscheinen, wenn Sie das aktivieren – siehe [Abschnitte auf dem Startbildschirm](../settings/mobile-app.md#home-screen-sections).

:::info
Blogbeiträge sind ein eigener Inhaltstyp, getrennt von regulären Website-Seiten. Sie werden nicht im [Seiteneditor](./page-editor.md) erstellt und erscheinen nicht in der Liste der Seiten. So bleibt das Verfassen von Blogbeiträgen schnell und auf das Schreiben konzentriert.
:::

## Kommentare unter Beiträgen hinzufügen {#adding-comments-below-posts}

B1 hostet selbst keine Blog-Kommentare, Sie können aber einen Kommentardienst einbinden. Außerdem können Sie unter jedem Beitrag beliebige andere Inhalte platzieren, etwa ein Newsletter-Formular oder einen Spenden-Button.

1. Registrieren Sie sich bei einem Kommentardienst wie [Hyvor Talk](https://talk.hyvor.com), [FastComments](https://fastcomments.com) oder [Disqus](https://disqus.com) und kopieren Sie dessen Einbettungscode.
2. Scrollen Sie auf der Seite Blog zu **Unter jedem Beitrag**.
3. Fügen Sie den Einbettungscode ein und klicken Sie auf **Speichern**.

Der Code erscheint unter dem Inhalt jedes veröffentlichten Beitrags. Der Kommentardienst übernimmt die Moderation und die Spam-Filterung; prüfen Sie sein Dashboard daher regelmäßig.

:::tip
Leeren Sie das Feld und klicken Sie auf **Speichern**, um den Code aus allen Beiträgen zu entfernen. Nur Personen, die die Kircheneinstellungen bearbeiten dürfen, sehen dieses Feld.
:::

## Nächste Schritte {#next-steps}

- [Seiten verwalten](./managing-pages.md) -- Einen Navigationslink zu Ihrem Blog hinzufügen
- [Dateien](./files.md) -- Fotos für Ihre Beiträge hochladen
- [Zapier-Integration](../integrations/zapier.md) -- Automatisierungen auslösen, wenn neue Beiträge veröffentlicht werden
