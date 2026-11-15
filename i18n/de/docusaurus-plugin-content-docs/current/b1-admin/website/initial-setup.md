---
title: "Erste Schritte mit Ihrer B1-Admin-Website"
sidebar_label: "Ersteinrichtung"
description: "Richten Sie die Website Ihrer Gemeinde in B1 Admin ein: Verknüpfen Sie eine Subdomain oder eine eigene Domain, erstellen Sie Ihre Startseite, wählen Sie Markenfarben und Logo und bauen Sie die Navigation auf."
---

# Ersteinrichtung

<div class="article-intro">

Jedes B1-Konto enthält eine sofort einsatzbereite Website. Diese Anleitung führt Sie durch die Einrichtung der Domain Ihrer Gemeinde, die Konfiguration des Erscheinungsbilds Ihrer Website, das Anlegen Ihrer ersten Seiten und die Organisation Ihrer Navigation.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Sie benötigen ein B1.church-Konto mit Administratorzugriff
- Wenn Sie eine eigene Domain verwenden, halten Sie die Zugangsdaten Ihres DNS-Anbieters bereit (z. B. GoDaddy, Cloudflare oder AWS)
- Bereiten Sie das Logo Ihrer Gemeinde im PNG-Format mit transparentem Hintergrund vor, um beste Ergebnisse zu erzielen

</div>

## Ihre Domain einrichten {#setting-up-your-domain}

Ihre Gemeinde erhält automatisch eine Subdomain auf B1.church (zum Beispiel `yourchurch.b1.church`). Sie können außerdem Ihre eigene Domain auf Ihre B1-Website verweisen lassen.

1. Gehen Sie zu **B1.church Admin**, indem Sie admin.b1.church aufrufen oder im Dropdown-Menü Ihres Profils **App wechseln** wählen.
2. Öffnen Sie das [Sprungmenü](../introduction.md#getting-around-with-the-jump-menu) (die Suchleiste oben links), klappen Sie **Einstellungen** auf und klicken Sie auf **Einstellungen**.
3. Öffnen Sie den Abschnitt **Gemeindeinformationen**, um Ihre Subdomain zu sehen. Legen Sie etwas Kurzes und Wiedererkennbares ohne Leerzeichen fest.
4. Um eine eigene Domain zu verwenden, melden Sie sich bei Ihrem DNS-Anbieter (etwa GoDaddy, Cloudflare oder AWS) an und fügen Sie zwei Einträge hinzu:
   - Einen **A-Eintrag** für Ihre Root-Domain, der auf `3.23.251.61` zeigt
   - Einen **CNAME-Eintrag** für `www`, der auf `proxy.b1.church` zeigt
5. Kehren Sie zu B1.church Admin zurück, öffnen Sie auf derselben Einstellungsseite den Abschnitt **Domains**, fügen Sie Ihre eigene Domain zur Liste hinzu und klicken Sie auf **Hinzufügen** und dann auf **Speichern**. Ihre Website ist danach innerhalb weniger Minuten über Ihre eigene Domain erreichbar.

:::tip
Wenn Sie die Option Einstellungen nicht sehen, bitten Sie die Person, die Ihr Gemeindekonto eingerichtet hat, Ihnen die Berechtigung „Kircheneinstellungen bearbeiten“ zu erteilen. Details finden Sie unter [Rollen und Berechtigungen](../settings/roles-permissions.md).
:::

## Ihre erste Seite erstellen {#creating-your-first-page}

1. Öffnen Sie in B1 Admin das [Sprungmenü](../introduction.md#getting-around-with-the-jump-menu) (die Suchleiste oben links), klappen Sie **Website** auf und klicken Sie auf **Seiten**.
2. Klicken Sie oben rechts auf **Seite hinzufügen**.
3. Wählen Sie **Leer** als Seitentyp, geben Sie „Startseite“ als **Seitentitel** ein und klicken Sie auf **Speichern**.
4. Klicken Sie in der Zeile der neuen Seite auf **Seiteneinstellungen** und ändern Sie den **URL-Pfad** für Ihre Startseite auf `/` (ein Schrägstrich ohne weiteren Text). Andere Seiten verwenden `/page-name`.
5. Klicken Sie auf **Inhalt bearbeiten**, um mit dem Aufbau zu beginnen. Jede Seite muss mit einem **Abschnitt** beginnen – er ist der Container für alle anderen Elemente. Klicken Sie auf **Inhalt hinzufügen** und ziehen Sie **Abschnitt** auf die Seite; wählen Sie dann ein fertiges Abschnittslayout oder **Leerer Abschnitt**.
6. Nachdem Sie einen Abschnitt hinzugefügt haben, klicken Sie erneut auf **Inhalt hinzufügen**, um Text, Bilder, Videos, Karten, Formulare und mehr einzufügen, indem Sie sie in Ihren Abschnitt ziehen.

:::info
Ausführliche Anleitungen zur Arbeit mit Seiten und Navigation finden Sie unter [Seiten verwalten](./managing-pages.md). Eine vollständige Anleitung zum visuellen Editor finden Sie unter [Den Seiteneditor verwenden](./page-editor.md).
:::

## Das Erscheinungsbild der Website konfigurieren {#configuring-site-appearance}

1. Wählen Sie im Sprungmenü **Website > Erscheinungsbild**.
2. Verwenden Sie die **Farbpalette**, um Ihre Markenfarben festzulegen – die hellen, Akzent- und dunklen Grundtöne sowie die Farben der primären und sekundären Schaltflächen – und klicken Sie dann auf **Palette speichern**.
3. Wählen Sie unter **Schriften** Ihre Überschriften- und Fließtextschrift aus dem Schriftenbrowser und klicken Sie auf **Schriften speichern**.
4. Laden Sie das Logo Ihrer Gemeinde unter **Logo** in den Stileinstellungen hoch. Stellen Sie sowohl eine Version für helle als auch für dunkle Hintergründe bereit und klicken Sie dann auf **Änderungen speichern**.
5. Klicken Sie auf **Fußzeile der Website**, um die Fußzeile im Blockeditor zu öffnen, und fügen Sie die Kontaktdaten und Links Ihrer Gemeinde hinzu.

:::info
Änderungen im Erscheinungsbild gelten für Ihre gesamte Website. Eine ausführliche Beschreibung jeder Einstellung finden Sie auf der Seite [Erscheinungsbild](./appearance.md).
:::

## Die Navigation einrichten {#setting-up-navigation}

Ihre Navigationslinks erscheinen in der Ansicht Seiten der Website. So organisieren Sie sie:

1. Klicken Sie im Bereich **Hauptnavigation** auf **Hinzufügen**, geben Sie den **Linktext** und den Pfad der Seite (zum Beispiel `/about`) als **URL** ein und klicken Sie auf **Speichern**.
2. Ziehen Sie Links per Drag-and-Drop, um sie neu anzuordnen oder unter übergeordneten Einträgen zu verschachteln.
3. Zeigen Sie eine Vorschau Ihrer Website an, um zu prüfen, ob die Navigation korrekt aussieht.

## Nächste Schritte {#next-steps}

- [Seiten verwalten](./managing-pages.md) -- Erfahren Sie im Detail, wie Sie mit Seiten und Navigation arbeiten
- [Erscheinungsbild](./appearance.md) -- Farben, Schriften und Layout Ihrer Website fein abstimmen
- [Dateien](./files.md) -- Bilder und Dokumente für Ihre Website hochladen
