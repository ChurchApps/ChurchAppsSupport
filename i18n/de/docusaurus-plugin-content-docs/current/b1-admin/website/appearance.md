---
title: "Aussehen"
---

# Aussehen

<div class="article-intro">

Die Seite "Aussehen" ermöglicht es Ihnen, das Gesamterscheinungsbild Ihrer Kirchenwebsite anzupassen. Von Farben und Schriftarten bis hin zu Abständen und benutzerdefiniertem CSS können Sie jeden visuellen Aspekt Ihrer Website von einem zentralen Ort aus steuern.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Führen Sie die [Initiale Einrichtung](initial-setup) für Ihre Website durch
- Halten Sie Ihr Kirchenlogo als PNG-Datei mit transparentem Hintergrund und 4:1-Seitenverhältnis bereit
- Kennen Sie die Markenfarben Ihrer Kirche (Hex-Werte), wenn Sie bereits einen Stil-Guide haben

</div>

## Zugriff auf Appearance-Einstellungen

1. Öffnen Sie in B1 Admin das [Jump-Menü](../introduction.md#getting-around-with-the-jump-menu) (die Suchleiste oben links) und erweitern Sie **Website**.
2. Klicken Sie auf **Appearance**.
3. Die Seite "Site Styles" wird geladen, mit einer Live-Vorschau Ihrer Website auf der linken Seite und **Style Settings**-Optionen auf der rechten Seite.

## Farbpalette

1. Klicken Sie auf **Color Palette** im Style Settings-Bereich.
2. Sie sehen **Base Colors** (helle, Akzent- und dunkle Farbtöne) und **Semantic Colors** (Primary, Secondary, Success, Warning und Error).
3. Klicken Sie auf einen Farbfeld, um die Farbauswahl zu öffnen. Ziehen Sie den Selektor oder geben Sie einen Hex-Wert ein, um Ihre Farbe zu wählen.
4. Die **Color Combinations Preview** zeigt, wie Ihre ausgewählten Farben zusammenpassen.
5. Verwenden Sie **Suggested Palettes**, um schnell ein vordefiniertes Farbschema anzuwenden.
6. Klicken Sie auf **Save**, wenn Sie zufrieden sind.

## Typografie

1. Klicken Sie auf **Typography Settings** im Style Settings-Bereich.
2. Klicken Sie auf **Select a Font**, um den Schriftartenbrowser zu öffnen. Sie können nach Name suchen oder Kategorien wie Serif, Sans Serif, Display, Handwriting und Monospace durchsuchen.
3. Legen Sie Schriftarten für Überschriften und Text fest.
4. Klicken Sie auf **Typography Scale**, um die Größenhierarchie für Überschrift 1 bis Überschrift 4 anzupassen. Verwenden Sie die Skala-Multiplikator- und Basisgrößen-Felder zum Verfeinern.
5. Klicken Sie auf **Save**, um Ihre Schriftartenwahl zu übernehmen.

## Abstände

1. Klicken Sie auf **Spacing Scale** im Style Settings-Bereich.
2. Passen Sie Abstandswerte für Extra Small bis Extra Large an. Praktische Beispiele zeigen, wie sich jeder Wert auf das Layout auswirkt.
3. Klicken Sie auf **Save Spacing**, um die Werte auf Ihre gesamte Website anzuwenden.

## Logo und Branding

1. Klicken Sie auf **Logo** im Style Settings-Bereich.
2. Laden Sie Ihr **Light Background Logo** und **Dark Background Logo** hoch. Verwenden Sie Bilder mit transparentem Hintergrund und 4:1-Seitenverhältnis für beste Ergebnisse.
3. Laden Sie ein **Social Media Image** für Link-Vorschaubilder und ein **Favicon** für das Browser-Tab-Symbol hoch.

:::tip
Verwenden Sie für beste Ergebnisse ein Logo mit transparentem Hintergrund im PNG-Format. Dies stellt sicher, dass es auf hellen und dunklen Hintergründen in Ihrer Website und [mobilen App](../settings/mobile-app.md) großartig aussieht.
:::

## Navigation Styles

Passen Sie die Farben der Navigationsleiste Ihrer Website für Solid- und Transparent-Modi an:

1. Scrollen Sie zum Abschnitt **Navigation Styles**
2. Klicken Sie auf **Edit Navigation Styles**
3. Konfigurieren Sie Farben für feste Navigation (mit Hintergrund) und transparente Navigation (Overlay-Modus)
4. Klicken Sie auf **Save**, um Ihre Navigationsfarben anzuwenden

Ausführliche Anweisungen finden Sie unter [Navigation Styles](./navigation-styles.md).

## Ankündigung & Widgets

Website-Widgets werden auf jeder Seite Ihrer Website angezeigt und schweben über dem Seiteninhalt:

- **Announcement Banner** -- Eine schließbare Leiste oben auf Ihrer Website für zeitkritische Nachrichten, z. B. ein bevorstehendes Ereignis oder eine Dienständerung.
- **Launcher** -- Ein schwebender Button, der ein schnelles Zugriffsmenü öffnet, z. B. Links zum Spenden, Einchecken oder zum Ansehen des Bulletins.

1. Klicken Sie auf **Announcement & Widgets** im Style Settings-Bereich.
2. Aktivieren Sie die gewünschten Widgets und konfigurieren Sie ihren Text, Links und Farben.
3. Klicken Sie auf **Save**.

## Umleitungen & Analytik

Das **Redirects & Analytics**-Panel im Style Settings enthält zwei nicht zusammenhängende, aber häufig benötigte Einstellungen:

- **Analytics** -- Fügen Sie Ihre **Google Analytics 4 Measurement ID** hinzu, um den Besucherverkehr auf Ihrer Website zu verfolgen.
- **Redirects** -- Ordnen Sie einen alten URL-Pfad einem neuen zu, damit Links zu einer Seite, die Sie verschoben oder umbenannt haben, funktionieren statt 404 anzuzeigen. Geben Sie den alten **From**-Pfad und den neuen **To**-Pfad ein, und klicken Sie auf **Save**.

## Benutzerdefiniertes CSS und JavaScript

1. Klicken Sie auf **CSS and Javascript** im Style Settings-Bereich.
2. Fügen Sie **Custom CSS** hinzu, um Standardstile für erweiterte Anpassungen zu überschreiben.
3. Fügen Sie **Custom HTML** für Tracking-Codes oder andere Scripts hinzu.
4. Verwenden Sie den Abschnitt **Common Javascript Examples** für Ausschnitte wie Google Analytics-Integration.

:::warning
Benutzerdefiniertes CSS ist leistungsfähig, kann aber Ihr Website-Layout beschädigen, wenn es falsch verwendet wird. Die meisten Kirchen können das gewünschte Aussehen mit den integrierten Farb-, Schriftart- und Abstandskontrollen erzielen. Verwenden Sie benutzerdefiniertes CSS nur, wenn Sie mit der Web-Entwicklung vertraut sind.
:::

:::info
Ihre Website erzwingt eine Content Security Policy, die Inline-Skripte aus anderen Quellen blockiert. Das **Custom JavaScript**-Feld ist die eine vertrauenswürdige Ausnahme -- Code, den Sie dort speichern, wird so ausgeführt wie eingegeben. Daher sollten Sie nur Scripts aus Quellen einfügen, denen Sie vertrauen (Analytics-Tags, Chat-Widgets und ähnliche Einbettungen).
:::

## Style-Designs

Wenn Sie einen schnellen Ausgangspunkt möchten, bieten die **Suggested Palettes** im Color Palette-Abschnitt vordefinierte Designs, die auf Klick koordinierte Farben setzen. Sie können einzelne Einstellungen nach Anwendung eines Designs immer noch verfeinern.

## Nächste Schritte

- [Managing Pages](managing-pages) -- Erstellen und organisieren Sie Ihre Website-Seiten
- [Files](files) -- Laden Sie Mediendateien für Ihre Website hoch
