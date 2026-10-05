---
title: "Navigations-Styles"
---

# Navigations-Styles

<div class="article-intro">

Passen Sie die Farben der Navigationsleiste Ihrer Kirchenwebsite an, um Ihr Branding widerzuspiegeln. Sie können Farben für sowohl solide Hintergründe als auch transparente Overlays konfigurieren und erhalten so die vollständige Kontrolle über das Aussehen Ihrer Navigation auf verschiedenen Seiten.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Sie benötigen die Berechtigung zur Verwaltung Ihrer Kirchenwebsite. Siehe [Roles & Permissions](../people/roles-permissions.md) für Details.
- Halten Sie Ihre Markenfarben bereit, einschließlich Hex-Farbcodes (z. B. #03A9F4).
- Verstehen Sie den Unterschied zwischen soliden und transparenten Navigations-Stilen auf Ihrer Website.

</div>

## Navigations-Modi verstehen

Ihre Website-Navigation kann je nach Seite in zwei verschiedenen Stilen angezeigt werden:

- **Solid navigation** -- Navigationsleiste mit einer Hintergrundfarbe, normalerweise auf Inhaltsseiten verwendet
- **Transparent navigation** -- Navigation, die den Seiteninhalt überlagert, normalerweise auf Seiten mit Hero-Bildern oder Vollbild-Hintergründen verwendet

Sie können Farben für beide Modi unabhängig voneinander anpassen.

## Zugriff auf Navigations-Styles

1. Öffnen Sie in B1 Admin das [Jump-Menü](../introduction.md#getting-around-with-the-jump-menu) (die Suchleiste oben links) und erweitern Sie **Website**
2. Klicken Sie auf **Appearance**
3. Scrollen Sie zum Abschnitt **Navigation Styles**
4. Klicken Sie auf **Edit Navigation Styles**

## Konfigurieren von Solid Navigation

Solid Navigation erscheint mit einer Hintergrundfarbe hinter der Navigationsleiste. Sie können Folgendes anpassen:

### Background Color

1. Aktivieren Sie den **Override**-Schalter für **Background Color**
2. Klicken Sie auf die Farbauswahl
3. Wählen Sie Ihre gewünschte Hintergrundfarbe
4. Der Standard ist Weiß (#FFFFFF)

### Link Color

1. Aktivieren Sie den **Override**-Schalter für **Link Color**
2. Wählen Sie die Farbe für Navigations-Link-Text
3. Dies wirkt sich auf Links in ihrem Standard-Zustand aus
4. Der Standard ist Dunkelgrau (#555555)

### Link Hover Color

1. Aktivieren Sie den **Override**-Schalter für **Link Hover Color**
2. Wählen Sie die Farbe, auf die Links wechseln, wenn Benutzer darüber fahren
3. Dies bietet visuelles Feedback für anklickbare Links
4. Der Standard ist Hellblau (#03A9F4)

### Active Color

1. Aktivieren Sie den **Override**-Schalter für **Active Color**
2. Wählen Sie die Farbe für den derzeit aktiven Seiten-Link
3. Dies hilft Benutzern zu wissen, auf welcher Seite sie sich befinden
4. Der Standard ist Hellblau (#03A9F4)

## Konfigurieren von Transparent Navigation

Transparent Navigation überlagert Ihren Seiteninhalt ohne Hintergrund. Sie können Folgendes anpassen:

### Link Color

1. Aktivieren Sie den **Override**-Schalter für **Link Color**
2. Wählen Sie eine Farbe, die gut zu Ihrem Seitenhintergrund kontrastiert
3. Oft funktionieren weiße oder helle Farben gut über dunklen Hintergründen
4. Der Standard ist Dunkelgrau (#555555)

### Link Hover Color

1. Aktivieren Sie den **Override**-Schalter für **Link Hover Color**
2. Wählen Sie die Hover-Status-Farbe
3. Stellen Sie sicher, dass sie gegen Ihren Seitenhintergrund sichtbar ist
4. Der Standard ist Hellblau (#03A9F4)

### Active Color

1. Aktivieren Sie den **Override**-Schalter für **Active Color**
2. Wählen Sie die Farbe des aktiven Seiten-Indikators
3. Sollte auffallen, während das Design weiterhin passt
4. Der Standard ist Hellblau (#03A9F4)

:::info
Transparent Navigation hat keine Hintergrundfarb-Einstellung, da sie den Seiteninhalt direkt überlagert.
:::

## Speichern Ihrer Änderungen

1. Nachdem Sie Ihre Farben konfiguriert haben, klicken Sie auf **Save Navigation Styles**
2. Ihre Änderungen werden sofort auf Ihre Live-Website angewendet
3. Besuchen Sie Ihre Website, um die Navigation in beiden Modi zu sehen

## Zurücksetzen auf Standards

Wenn Sie zu den Standard-Farben zurückkehren möchten:

1. Deaktivieren Sie die **Override**-Schalter für alle benutzerdefinierten Farben
2. Klicken Sie auf **Save Navigation Styles**
3. Die Navigation kehrt zum Standard-Farbschema zurück

Oder klicken Sie auf **Cancel**, um alle Änderungen zu verwerfen, ohne sie zu speichern.

## Best Practices

### Farbkontrast

- **Lesbarkeit** -- Stellen Sie sicher, dass Link-Farben ausreichend zu dem Hintergrund kontrastieren
- **WCAG-Konformität** -- Streben Sie mindestens ein 4,5:1-Kontrastver hältnis für Barrierefreiheit an
- **Beide Modi testen** -- Zeigen Sie eine Vorschau Ihrer Website mit solider und transparenter Navigation an

### Marken-Konsistenz

- **Verwenden Sie Ihre Markenfarben** -- Entsprechen Sie Ihrem Logo und Website-Design
- **Begrenzen Sie Ihre Palette** -- Bleiben Sie bei 2-3 Farben für einen kohärenten Look
- **Berücksichtigen Sie Ihre Bilder** -- Wenn Sie transparente Navigation verwenden, testen Sie sie gegen typische Seitenhintergründe

### Hover und Active States

- **Klares Feedback** -- Machen Sie Hover-Zustände deutlich anders als Standard-Links
- **Unterscheiden Sie aktive Seiten** -- Verwenden Sie eine unterschiedliche Farbe, damit Benutzer wissen, wo sie sind
- **Sanfte Übergänge** -- Das System animiert automatisch Farbänderungen

## Fehlerbehebung

### Farben sehen nicht richtig aus

- **Cache löschen** -- Browser-Caching kann alte Farben anzeigen
- **Überprüfen Sie Hex-Codes** -- Stellen Sie sicher, dass Sie gültige Hex-Farbcodes eingegeben haben
- **Auf verschiedenen Hintergründen testen** -- Farben können je nach Seite unterschiedlich aussehen

### Navigation nicht sichtbar

- **Transparent-Modus** -- Wenn Sie transparente Navigation über hellen Bildern verwenden, kann dunkler Text schwer zu sehen sein
- **Lösung** -- Passen Sie Ihre Link-Farben an oder verwenden Sie dunklere Seitenhintergründe
- **Alternative** -- Fügen Sie einen subtilen Schatten oder Hintergrund-Overlay zum Navigationsbereich hinzu

## Technische Details

Navigations-Styles werden als JSON gespeichert und mit CSS-Variablen angewendet:

- Änderungen werden sofort wirksam, ohne die Website neu zu erstellen
- Farben werden auf alle Navigations-Elemente angewendet
- Overrides sind optional; nicht gesetzte Farben verwenden Theme-Standards

## Verwandte Artikel

- [Appearance](./appearance.md) -- Passen Sie das Gesamterscheinungsbild Ihrer Website an
- [Managing Pages](./managing-pages.md) -- Erstellen und organisieren Sie Ihre Website-Seiten
- [Page Editor](./page-editor.md) -- Entwerfen Sie Seitenlayouts und Inhalte
