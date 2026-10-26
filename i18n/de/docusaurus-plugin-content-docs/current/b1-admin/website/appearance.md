---
title: "Erscheinungsbild"
---

# Erscheinungsbild

<div class="article-intro">

Die Seite Erscheinungsbild ermöglicht es Ihnen, das gesamte Erscheinungsbild Ihrer Gemeindewebsite anzupassen. Von Farben und Schriften bis hin zu Abständen und benutzerdefiniertem CSS können Sie jeden visuellen Aspekt Ihrer Website an einer zentralen Stelle steuern.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Schließen Sie die [Ersteinrichtung](initial-setup) für Ihre Website ab.
- Halten Sie das Logo Ihrer Gemeinde im PNG-Format mit transparentem Hintergrund und einem Seitenverhältnis von 4:1 bereit.
- Kennen Sie die Markenfarben Ihrer Gemeinde (Hexadezimalwerte), falls Sie einen bestehenden Styleguide haben.

</div>

## Einstellungen für das Erscheinungsbild öffnen

1. Öffnen Sie in B1 Admin das [Jump-Menü](../introduction.md#getting-around-with-the-jump-menu) (die Suchleiste oben links) und klappen Sie **Website** auf.
2. Klicken Sie auf **Erscheinungsbild**.
3. Die Seite **Website-Stile** wird geladen. Die Karte **Design, Schriften & Fußzeile** zeigt links die Liste **Stileinstellungen** und rechts eine Vorschau einer Beispielwebsite. Darunter befinden sich die Karten **Ankündigung & Widgets** und **Weiterleitungen & Analyse**.

## Farbpalette {#color-palette}

1. Klicken Sie im Bereich Stileinstellungen auf **Farbpalette**.
2. Sie sehen **Basisfarben** (helle, akzentuierte und dunkle Töne) und **Semantische Farben** (Primär, Sekundär, Erfolg, Warnung und Fehler).
3. Klicken Sie auf ein beliebiges Farbfeld, um den Farbwähler zu öffnen. Ziehen Sie den Auswahlpunkt oder geben Sie einen Hexadezimalwert ein, um Ihre Farbe zu wählen.
4. Die **Vorschau der Farbkombinationen** zeigt, wie Ihre ausgewählten Farben zusammenwirken.
5. Verwenden Sie **Vorgeschlagene Paletten**, um schnell ein vorgefertigtes Farbschema anzuwenden.
6. Klicken Sie auf **Palette speichern**, wenn Sie zufrieden sind.

## Typografie

1. Klicken Sie im Bereich Stileinstellungen auf **Schriften**.
2. Klicken Sie auf die Schaltfläche **Überschriftenschrift** oder **Fließtextschrift**, um die Schriftauswahl zu öffnen. Sie können nach Namen suchen oder Kategorien wie Serife, Serifenlos, Display, Handschrift und Nichtproportional durchsuchen. Sie können auch eine der **Beliebten Schriftkombinationen** wählen.
3. Klicken Sie auf **Schriften speichern**, um Ihre Schriftauswahl zu übernehmen.
4. Um die Größenabstufung der Überschriften 1 bis 4 anzupassen, klicken Sie im Bereich Stileinstellungen auf **Typografie-Skala**. Verwenden Sie die Felder **Typen-Multiplikator**, **Basisgröße** und **Zeilenhöhe** zur Feinabstimmung und klicken Sie dann auf **Typografie speichern**.

## Abstände

1. Klicken Sie im Bereich Stileinstellungen auf **Abstandsskala**.
2. Passen Sie die Abstandswerte von Extra klein bis Extra groß an. Praxisbeispiele zeigen, wie sich jeder Wert auf das Layout auswirkt.
3. Klicken Sie auf **Abstände speichern**, um die Werte auf Ihre gesamte Website anzuwenden.

## Logo und Branding {#logo-and-branding}

1. Klicken Sie im Bereich Stileinstellungen auf **Logo**.
2. Laden Sie Ihr **Logo für helle Hintergründe** und Ihr **Logo für dunkle Hintergründe** hoch. Für beste Ergebnisse verwenden Sie Bilder mit transparentem Hintergrund und einem Seitenverhältnis von 4:1.
3. Laden Sie ein **Bild für soziale Medien** für Linkvorschauen und ein **Favicon** für das Symbol im Browser-Tab hoch.
4. Klicken Sie auf **Änderungen speichern**. Hochgeladene Bilder werden erst nach dem Speichern übernommen. Wenn Sie den Browser-Tab vorher schließen oder neu laden, warnt Sie Ihr Browser vor nicht gespeicherten Änderungen.

:::tip
Für beste Ergebnisse verwenden Sie ein Logo im PNG-Format mit transparentem Hintergrund. So wirkt es sowohl auf hellen als auch auf dunklen Hintergründen gut – auf Ihrer Website und in der [mobilen App](../settings/mobile-app.md).
:::

## Navigationsstile

Passen Sie die Farben Ihrer Navigationsleiste sowohl für den einfarbigen als auch den transparenten Modus an:

1. Klicken Sie im Bereich Stileinstellungen auf **Navigation**.
2. Konfigurieren Sie die Farben für **Kopfzeile (einfarbig)** und **Kopfzeile über Hero-Bereich (transparent)**.
3. Klicken Sie auf **Navigation speichern**, um Ihre Navigationsfarben zu übernehmen.

Ausführliche Anleitungen finden Sie unter [Navigationsstile](./navigation-styles.md).

## Ankündigung & Widgets

Website-Widgets erscheinen auf jeder Seite Ihrer Website und schweben über dem Seiteninhalt:

- **Ankündigungsbanner** – Ein schließbarer Balken am oberen Rand Ihrer Website für zeitkritische Mitteilungen, etwa einen bevorstehenden Termin oder eine Änderung des Gottesdienstes.
- **Launcher** – Eine schwebende Schaltfläche, die ein Schnellzugriffsmenü öffnet, zum Beispiel mit Links zu Spenden, Check-in oder dem Gemeindebrief.

1. Suchen Sie die Karte **Ankündigung & Widgets** unterhalb der Stileinstellungen.
2. Aktivieren Sie die gewünschten Widgets und konfigurieren Sie deren Texte, Links und Farben.
3. Klicken Sie auf **Speichern**.

## Weiterleitungen & Analyse

Die Karte **Weiterleitungen & Analyse** (unterhalb der Stileinstellungen) enthält zwei unabhängige, aber häufig benötigte Einstellungen:

- **Analyse** – Tragen Sie Ihre **GA4-Messungs-ID** (Format `G-XXXXXXXXXX`) ein, um die Besucherzahlen Ihrer Website zu erfassen. Dieselbe ID erfasst auch Seitenaufrufe in der B1-App Ihrer Gemeinde (dem Mitgliederportal unter `/mobile`, einschließlich der installierten App). Diese werden mit einem `display_mode` von `installed` oder `browser` markiert, sodass Sie in Google Analytics Besuche der installierten App von Browserbesuchen unterscheiden können.
- **Weiterleitungen** – Ordnen Sie einen alten URL-Pfad einem neuen zu, damit Links zu einer verschobenen oder umbenannten Seite weiterhin funktionieren und nicht mit einem Fehler 404 enden. Geben Sie den alten Pfad unter **Von** und den neuen Pfad unter **Nach** ein und klicken Sie dann auf **Speichern**. Eine Weiterleitung hat zudem Vorrang vor den eingebauten Seiten von B1 (`/sermons`, `/stream`, `/donate`, `/bible` und `/votd`), sodass Sie diese Adresse an einen anderen Ort leiten können, etwa zu Ihrer eigenen Predigtseite oder einem YouTube-Kanal. Eine selbst erstellte Seite unter derselben Adresse wird dadurch nicht überschrieben. Löschen Sie diese Seite zuerst, wenn die Weiterleitung greifen soll.

## Benutzerdefiniertes CSS und JavaScript

1. Klicken Sie im Bereich Stileinstellungen auf **CSS & JavaScript**.
2. Fügen Sie **Benutzerdefiniertes CSS** hinzu, um Standardstile für fortgeschrittene Anpassungen zu überschreiben.
3. Fügen Sie **Benutzerdefiniertes HTML** für Tracking-Codes oder andere Skripte hinzu.
4. Verwenden Sie den Bereich **Gängige JavaScript-Beispiele** für Codeschnipsel, etwa die Einbindung von Google Analytics.

:::warning
Benutzerdefiniertes CSS ist mächtig, kann bei falscher Verwendung aber das Layout Ihrer Website zerstören. Die meisten Gemeinden können das gewünschte Erscheinungsbild mit den eingebauten Steuerelementen für Farben, Schriften und Abstände erreichen. Verwenden Sie benutzerdefiniertes CSS nur, wenn Sie sich mit Webentwicklung auskennen.
:::

:::info
Ihre Website setzt eine Content Security Policy durch, die Inline-Skripte aus anderen Quellen blockiert. Das Feld **Benutzerdefiniertes HTML** hier sowie das [HTML-Element](page-editor#using-the-html-element) auf einzelnen Seiten sind die vertrauenswürdigen Ausnahmen. Code, den Sie dort speichern, wird unverändert ausgeführt. Fügen Sie daher nur Skripte aus vertrauenswürdigen Quellen ein, etwa Analyse-Tags, Chat-Widgets und ähnliche Einbettungen.
:::

## Design-Vorlagen

Wenn Sie einen schnellen Ausgangspunkt suchen, bieten die **Vorgeschlagenen Paletten** im Bereich Farbpalette vorgefertigte Designs, die mit einem Klick aufeinander abgestimmte Farben setzen. Sie können einzelne Einstellungen nach der Anwendung eines Designs jederzeit feinabstimmen.

## Nächste Schritte

- [Seiten verwalten](managing-pages) – Ihre Website-Seiten erstellen und organisieren
- [Dateien](files) – Medienelemente für Ihre Website hochladen
