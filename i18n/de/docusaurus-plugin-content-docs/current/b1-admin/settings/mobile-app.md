---
title: "Einstellungen der mobilen App"
---

# Einstellungen der mobilen App

<div class="article-intro">

Auf der Seite Einstellungen der mobilen App konfigurieren Sie die Navigationsreiter, die im **mobilen Angebot von B1.church (PWA)** für Ihre Mitglieder erscheinen. Sie bestimmen, welche Reiter sichtbar sind, wohin sie verlinken und wie sie dargestellt werden.

</div>

:::info Die native App B1 Mobile wird nicht mehr unterstützt
Die hier konfigurierten Reiter werden über die [Progressive Web App (PWA) von B1.church](/docs/b1-church/getting-started/installing-pwa) ausgeliefert, die die native App B1 Mobile abgelöst hat. Teilen Sie die Installationsseite Ihrer Kirche – `https://ihrekirche.b1.church/mobile/install` – mit Ihren Mitgliedern. Dort wird ihnen Schritt für Schritt erklärt, wie sie die App auf ihrem Gerät installieren. Ein Download aus dem App Store oder von Google Play ist nicht nötig.
:::

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Sie benötigen die Berechtigung „Kircheneinstellungen bearbeiten“. Falls Sie keinen Zugriff haben, lesen Sie [Rollen & Berechtigungen](./roles-permissions.md).
- Konfigurieren Sie zuerst Ihre [Kircheneinstellungen](./church-settings.md), einschließlich Name der Kirche und Branding.

</div>

## Zu den Navigationseinstellungen gelangen

1. Öffnen Sie in B1 Admin das [Sprungmenü](../introduction.md#getting-around-with-the-jump-menu) (das Suchfeld oben links) und klappen Sie **Mobile** auf.
2. Klicken Sie auf **Navigation** (`/mobile/navigation`).
3. Die Seite Navigation zeigt Ihre aktuellen App-Reiter an.

## Einen neuen Reiter hinzufügen {#adding-a-new-tab}

1. Klicken Sie oben auf der Seite auf die Schaltfläche **Reiter hinzufügen**.
2. Füllen Sie die Angaben zum Reiter aus:
   - **Name** – die Beschriftung, die auf dem Reiter erscheint (zum Beispiel „Predigten“ oder „Geben“).
   - **Symbol** – Klicken Sie auf die Symbolauswahl, um ein Symbol für Ihren Reiter zu wählen.
   - **Bild** – Klicken Sie auf **Bild auswählen** (oder **Bild ändern**), um dem Reiter ein Foto zu geben. Reiter mit einem Foto erscheinen als Fotokacheln auf dem Startbildschirm der App – siehe [Kacheln auf dem Startbildschirm](#home-screen-tiles).
   - **Reiter-Typ** – Wählen Sie aus Optionen wie Bibel, Livestream, Spende, Website und weitere.
   - **URL** – Geben Sie die Webadresse ein, auf die der Reiter verlinken soll.
   - **Sichtbarkeit** – Legen Sie fest, wer diesen Reiter sehen kann (alle, nur Mitglieder usw.). Bei einem Reiter **Mitgliederverzeichnis** steuert dies nur, wer den Reiter selbst sieht. Wer das Verzeichnis öffnen darf, legen Sie über **Im Verzeichnis anzeigen** auf der Seite Mitgliederportal fest (siehe [Einstellungen für Mitgliederverzeichnis & Nachrichten](#member-directory--messaging-settings)).
3. Klicken Sie auf **Reiter speichern**, um ihn Ihrer App hinzuzufügen.

## Einen vorhandenen Reiter bearbeiten

1. Klicken Sie in der Liste **App-Reiter** auf einen beliebigen vorhandenen Reiter.
2. Aktualisieren Sie Name, Symbol, URL, Typ oder die Sichtbarkeit des Reiters.
3. Klicken Sie auf **Reiter speichern**, um Ihre Änderungen zu übernehmen.

## Reiter neu anordnen

Sie können die Reihenfolge ändern, in der die Reiter in der mobilen App erscheinen. Ziehen Sie die Reiter in der Liste per Drag-and-Drop in die gewünschte Reihenfolge. Die Reihenfolge auf dieser Seite entspricht der Reihenfolge, die Ihre Mitglieder in der App sehen.

:::info
Manche Reiter erscheinen automatisch, wenn bestimmte Bedingungen erfüllt sind. Ein Reiter für den Livestream kann beispielsweise erscheinen, sobald ein Stream läuft. Manuell hinzugefügte Reiter geben Ihnen dagegen die volle Kontrolle darüber, was Ihre Mitglieder jederzeit sehen.
:::

:::tip
Halten Sie die Anzahl der Reiter überschaubar. Drei bis fünf Reiter funktionieren für die meisten Kirchen gut. Zu viele Reiter machen die Navigation für Ihre Mitglieder unübersichtlich.
:::

## Einstellungen für Mitgliederverzeichnis & Nachrichten {#member-directory--messaging-settings}

Der Eintrag **Mitgliederportal** im selben Bereich Mobile enthält die Einstellungen für das Mitgliederverzeichnis und private Nachrichten im Angebot B1.church:

- **Genehmigungsgruppe für das Verzeichnis** – Die Gruppe, die Aktualisierungen des Mitgliederverzeichnisses sowie [Löschanfragen für Konten](../profile/account-deletion.md) prüft, bevor sie wirksam werden.
- **Im Verzeichnis anzeigen** – Wer das Mitgliederverzeichnis öffnen kann und wer darin aufgeführt ist: **Nur Mitarbeitende**, **Mitglieder & Mitarbeitende** (die Standardeinstellung), **Regelmäßige Besucher und höher** oder **Alle (einschließlich Gäste)**. Personen, deren Mitgliedsstatus unterhalb der gewählten Stufe liegt, sehen das Verzeichnis nicht und werden darin nicht aufgeführt. Mitarbeitende mit der Berechtigung Personen > Anzeigen können das Verzeichnis immer öffnen und alle sehen, unabhängig von dieser Einstellung.
- **Sichtbarkeitsvorgabe** – Legt den kirchenweiten Standard für Mitglieder fest, die noch keine eigene Einstellung gewählt haben. **Adresse**, **Telefonnummer** und **E-Mail** haben jeweils ein eigenes Auswahlmenü mit denselben fünf Stufen, die überall dort verfügbar sind, wo Sichtbarkeit eingestellt wird:
  - **Alle** – für alle sichtbar, auch für anonyme Besucher
  - **Mitglieder** – nur für Personen mit einem Datensatz als Mitglied oder Mitarbeitende sichtbar
  - **Nur Gruppen** – nur für Personen sichtbar, die mit dieser Person in einer Gruppe sind
  - **Meine Gruppenleitenden und Mitarbeitende** – nur für Leitende einer Gruppe, zu der diese Person gehört, sowie für Mitarbeitende sichtbar
  - **Nur Mitarbeitende** – nur für Mitarbeitende mit der Berechtigung Personen > Anzeigen sowie für die Person selbst sichtbar

  Mitglieder können diese Vorgaben für ihren eigenen Datensatz auf dem Reiter **Datenschutz** ihres Profils in der PWA von B1.church überschreiben. Siehe [Ihr Profil bearbeiten](/docs/b1-church/getting-started/me-page).
- **Mindestalter für private Nachrichten** – Eine Schutzfunktion für Kinder. B1 öffnet **keine neue** private Nachrichtenunterhaltung, wenn eine der beiden Personen unter diesem Alter ist. Maßgeblich ist das Geburtsdatum (fehlt es, wird die Haushaltsrolle als Ersatz verwendet). Personen unter diesem Alter bleiben im Verzeichnis vollständig sichtbar – blockiert wird nur die direkte Nachricht, und zwar **in beide Richtungen**, für alle, auch für Mitarbeitende. Gruppenunterhaltungen und Nachrichten an die Eltern eines Kindes funktionieren weiterhin. Zur Auswahl stehen Aus, 13, 16 oder 18; die Standardeinstellung ist **18**. Bestehende Unterhaltungen bleiben unberührt.

:::tip
Da die Altersprüfung auf Geburtsdaten beruht, achten Sie darauf, dass bei den Kindern Ihrer Gemeinde Geburtsdaten eingetragen sind. Diese Einstellung gehört zur gleichen Gruppe von Schutzfunktionen wie die [Sicherheitseinstellungen für den Check-in](../attendance/checkin-safety.md).
:::

### Anmeldeaufforderung auf dem Startbildschirm {#home-screen-sign-in-prompt}

Besucher, die die [Startseite](/docs/b1-church/getting-started/navigating#home) der App öffnen, ohne sich anzumelden, sehen einen kurzen Hinweis – standardmäßig *„Melden Sie sich an, um Ihre Gruppen, Spenden und mehr zu sehen.“* – neben einer Schaltfläche **Anmelden**. Mit den Einstellungen **Anmeldeaufforderung auf dem Startbildschirm** auf derselben Seite des Mitgliederportals (`/mobile/b1-mobile`) können Sie dies ändern:

- **Anmeldeaufforderung auf dem Startbildschirm der App anzeigen** – Schalten Sie diese Option aus, um Hinweis und Schaltfläche **Anmelden** auf dem Startbildschirm auszublenden. Besucher können sich weiterhin über das Menü der App anmelden.
- **Text der Anmeldeaufforderung** – Ersetzen Sie den Standardtext durch Ihre eigene Nachricht (bis zu 150 Zeichen). Lassen Sie das Feld leer, um den Standardtext zu verwenden. Dieses Feld ist deaktiviert, solange die Aufforderung ausgeschaltet ist.

Klicken Sie auf **Speichern**, um die Änderungen zu übernehmen. Beim Speichern werden die zwischengespeicherten Einstellungen der App aktualisiert, sodass die Änderung beim nächsten Laden des Startbildschirms sichtbar ist.

### Kacheln auf dem Startbildschirm {#home-screen-tiles}

Reiter mit einem Foto (siehe **Bild** unter [Einen neuen Reiter hinzufügen](#adding-a-new-tab)) erscheinen auf dem [Startbildschirm](/docs/b1-church/getting-started/navigating#home) der App als Fotokacheln in einem Abschnitt mit dem Namen Ihrer Kirche. Dazu gehört auch ein Reiter „Vers des Tages“, wenn Sie ihm ein Foto geben. Reiter mit Fotos erscheinen zusätzlich auch in der Reiterleiste.

Die Einstellung **Kacheln auf dem Startbildschirm** auf derselben Seite des Mitgliederportals (`/mobile/b1-mobile`) bestimmt, wie diese Kacheln angeordnet werden. Wählen Sie ein **Layout**:

- **Raster** – Zwei Kacheln pro Zeile (die Standardeinstellung). Ist die Anzahl der Kacheln ungerade, nimmt die erste Kachel die volle Breite ein.
- **Scrollende Zeile** – Eine Zeile mit Kacheln, die Mitglieder seitlich wischen.
- **Liste** – Eine Liste mit einem kleinen Foto neben dem Namen jedes Reiters.

Klicken Sie auf **Speichern**, um die Änderungen zu übernehmen.

## Wo diese Reiter erscheinen

Die hier konfigurierten Reiter werden in der **PWA von B1.church** angezeigt, die Ihre Mitglieder von jeder Seite unter `https://ihrekirche.b1.church` installieren. Änderungen auf dieser Seite erscheinen beim nächsten Öffnen der App durch ein Mitglied.

Auf dem Smartphone zeigt die untere Reiterleiste **Startseite**, bis zu drei Ihrer Reiter und **Mehr**; auf dem Computer zeigt die Kopfzeile bis zu fünf. Eingebaute Bereiche (etwa Predigten, Spenden oder Gruppen) erhalten diese Plätze zuerst, und Reiter vom Typ **Interne Seite** füllen freie Plätze. Reiter vom Typ **Externe URL** und **Vers des Tages** erhalten nie einen Platz. Jeder Reiter, auch wenn er keinen Platz findet, wird auf der Seite **Mehr** der App aufgelistet. Was Mitglieder sehen, erfahren Sie unter [Navigation in der App B1](/docs/b1-church/getting-started/navigating). (Reiter werden auch von der älteren [nativen App B1 Mobile](/docs/b1-mobile/) dargestellt, die noch von manchen Mitgliedern genutzt wird. Diese App gilt jedoch als veraltet und wird nicht mehr aktualisiert.)

## Nächste Schritte

- [Kircheneinstellungen](./church-settings.md) – Informationen und Branding Ihrer Kirche konfigurieren
- [Rollen & Berechtigungen](./roles-permissions.md) – Zugriffe für Ihr Team verwalten
