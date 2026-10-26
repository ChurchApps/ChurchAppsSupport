---
title: "Einstellungen der mobilen App"
---

# Einstellungen der mobilen App

<div class="article-intro">

Auf der Seite Einstellungen der mobilen App konfigurieren Sie die Navigationsregister, die in der **B1.church-Mobilerfahrung (PWA)** für Ihre Gemeindemitglieder erscheinen. Sie legen fest, welche Register sichtbar sind, wohin sie verlinken und wie sie dargestellt werden.

</div>

:::info Die native B1 Mobile App ist veraltet
Die hier konfigurierten Register werden über die [B1.church Progressive Web App (PWA)](/docs/b1-church/getting-started/installing-pwa) ausgeliefert, die die native B1 Mobile App ersetzt hat. Teilen Sie die Installationsseite Ihrer Gemeinde – `https://yourchurchname.b1.church/mobile/install` – mit den Mitgliedern. Dort werden sie Schritt für Schritt durch die Installation der App auf ihrem Gerät geführt, ohne Download aus dem App Store oder Google Play.
:::

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Sie benötigen die Berechtigung „Kircheneinstellungen bearbeiten“. Falls Sie keinen Zugriff haben, siehe [Rollen & Berechtigungen](./roles-permissions.md).
- Richten Sie zuerst Ihre [Kircheneinstellungen](./church-settings.md) ein, einschließlich Kirchenname und Branding.

</div>

## Navigationseinstellungen öffnen

1. Öffnen Sie in B1 Admin das [Jump-Menü](../introduction.md#getting-around-with-the-jump-menu) (die Suchleiste oben links) und klappen Sie **Mobile** auf.
2. Klicken Sie auf **Navigation** (`/mobile/navigation`).
3. Die Seite Navigation zeigt Ihre aktuellen App-Register an.

## Ein neues Register hinzufügen

1. Klicken Sie oben auf der Seite auf die Schaltfläche **Register hinzufügen**.
2. Füllen Sie die Angaben zum Register aus:
   - **Name** – die Bezeichnung, die auf dem Register erscheint (zum Beispiel „Predigten“ oder „Geben“).
   - **Symbol** – Klicken Sie auf die Symbolauswahl, um ein Symbol für Ihr Register zu wählen.
   - **Bild** – Klicken Sie auf **Bild auswählen** (oder **Bild ändern**), um dem Register ein Foto zuzuweisen. Register mit Foto erscheinen auf dem Startbildschirm der App als Fotokacheln – siehe [Kacheln auf dem Startbildschirm](#home-screen-tiles).
   - **Registertyp** – Wählen Sie aus Optionen wie Bibel, Livestream, Spende, Website und weitere.
   - **URL** – Geben Sie die Webadresse ein, auf die das Register verlinken soll.
   - **Sichtbarkeit** – Legen Sie fest, wer dieses Register sehen kann (alle, nur Mitglieder usw.). Bei einem Register **Mitgliederverzeichnis** steuert dies nur, wer das Register selbst sieht. Wer das Verzeichnis öffnen darf, legt die Einstellung **Im Verzeichnis anzeigen** auf der Seite Mitgliederportal fest (siehe [Einstellungen für Mitgliederverzeichnis & Nachrichten](#member-directory--messaging-settings)).
3. Klicken Sie auf **Register speichern**, um es zu Ihrer App hinzuzufügen.

## Ein vorhandenes Register bearbeiten

1. Klicken Sie in der Liste **App-Register** auf ein beliebiges vorhandenes Register.
2. Aktualisieren Sie Name, Symbol, URL, Typ oder Sichtbarkeitseinstellungen.
3. Klicken Sie auf **Register speichern**, um Ihre Änderungen zu übernehmen.

## Register neu anordnen

Sie können die Reihenfolge ändern, in der die Register in der mobilen App erscheinen. Ziehen Sie die Register in der Liste per Drag & Drop an die gewünschte Position. Die Reihenfolge auf dieser Seite entspricht der Reihenfolge, in der Ihre Mitglieder die App sehen.

:::info
Einige Register erscheinen automatisch, wenn bestimmte Bedingungen erfüllt sind. Ein Livestream-Register kann zum Beispiel erscheinen, sobald ein Stream aktiv ist. Manuell hinzugefügte Register geben Ihnen dagegen jederzeit volle Kontrolle darüber, was Ihre Mitglieder sehen.
:::

:::tip
Halten Sie die Anzahl der Register überschaubar. Drei bis fünf Register funktionieren für die meisten Gemeinden gut. Zu viele Register können die Navigation für Ihre Mitglieder unübersichtlich machen.
:::

## Einstellungen für Mitgliederverzeichnis & Nachrichten

Der Eintrag **Mitgliederportal** im selben Bereich Mobile enthält die Einstellungen für das Mitgliederverzeichnis und die private Nachrichtenfunktion in der B1.church-Erfahrung:

- **Genehmigungsgruppe für das Verzeichnis** – Die Gruppe, die Aktualisierungen des Mitgliederverzeichnisses sowie [Anträge auf Löschung des Kontos](../profile/account-deletion.md) prüft, bevor sie wirksam werden.
- **Im Verzeichnis anzeigen** – Wer das Mitgliederverzeichnis öffnen darf und wer darin aufgeführt wird: **Nur Administratoren**, **Mitglieder und höher** (Standard), **Regelmäßige Teilnehmende und höher** oder **Gäste und höher**. Personen, deren Mitgliedsstatus unter der gewählten Stufe liegt, sehen das Verzeichnis nicht und werden darin nicht aufgeführt. Bei **Nur Administratoren** ist das Verzeichnis für alle außer Mitarbeitenden mit der Berechtigung Personen > Anzeigen gesperrt (ein Mitgliedsstatus Mitarbeitende allein reicht nicht aus). Diese Mitarbeitenden können das Verzeichnis unabhängig von dieser Einstellung immer öffnen und alle Personen sehen. Gäste werden nie aufgenommen, da sich online selbst registrierte Personen zunächst als Gast anlegen.
- **Sichtbarkeitspräferenz** – Legt den gemeindeweiten Standard für Mitglieder fest, die noch keine eigene Einstellung gewählt haben. **Adresse**, **Telefonnummer** und **E-Mail** haben jeweils ein eigenes Auswahlmenü mit denselben fünf Stufen, die überall dort gelten, wo Sichtbarkeit konfiguriert wird:
  - **Alle** – für jeden sichtbar, auch für anonyme Besucher
  - **Mitglieder** – nur für Personen mit einem Mitglieds- oder Mitarbeitenden-Datensatz sichtbar
  - **Nur Gruppen** – nur für Personen sichtbar, die mit dieser Person eine Gruppe teilen, sowie für Mitarbeitende
  - **Meine Gruppenleitenden und Mitarbeitende** – nur für Leitende einer Gruppe sichtbar, der diese Person angehört, sowie für Mitarbeitende
  - **Nur Mitarbeitende** – nur für Mitarbeitende sichtbar (Personen mit dem Mitgliedsstatus Mitarbeitende oder der Berechtigung Personen > Anzeigen) sowie für die Person selbst

  „Mitarbeitende“ bedeutet in diesen Stufen jede Person mit dem Mitgliedsstatus Mitarbeitende oder der Berechtigung Personen > Anzeigen. Änderungen bei Gruppen wirken sofort: Wer einer Gruppe beitritt oder zum Gruppenleitenden gemacht wird, sieht die passenden Angaben **Nur Gruppen** oder **Meine Gruppenleitenden und Mitarbeitende** der Mitglieder dieser Gruppe, ohne sich ab- und wieder anzumelden.
  Mitglieder können diese Standardeinstellungen für ihren eigenen Datensatz auf dem Reiter **Datenschutz** ihres Profils in der B1.church-PWA überschreiben – siehe [Profil bearbeiten](/docs/b1-church/getting-started/me-page).
- **Mindestalter für private Nachrichten** – Eine Schutzeinstellung für Kinder. B1 öffnet **keine neue** private Nachrichtenunterhaltung, wenn eine der beiden Personen jünger als dieses Alter ist. Maßgeblich ist das Geburtsdatum (ersatzweise die Haushaltsrolle, falls kein Geburtsdatum hinterlegt ist). Personen unter diesem Alter bleiben im Verzeichnis vollständig sichtbar – blockiert ist nur die Direktnachricht, und zwar **in beide Richtungen** für alle, auch für Mitarbeitende. Gruppenunterhaltungen und Nachrichten an die Eltern eines Kindes funktionieren weiterhin. Zur Auswahl stehen Aus, 13, 16 oder 18; der Standard ist **18**. Bestehende Unterhaltungen bleiben unberührt.

:::tip
Da die Prüfung des Mindestalters auf Geburtsdaten beruht, achten Sie darauf, dass für Kinder in Ihrer Gemeinde Geburtsdaten eingetragen sind. Diese Einstellung gehört zur gleichen Gruppe von Schutzeinstellungen wie die [Sicherheitseinstellungen für den Check-in](../attendance/checkin-safety.md).
:::

### Anmeldeaufforderung auf dem Startbildschirm

Besucher, die die [Startseite](/docs/b1-church/getting-started/navigating#home) der App öffnen, ohne sich anzumelden, sehen einen kurzen Hinweis – standardmäßig *„Melden Sie sich an, um Ihre Gruppen, Spenden und mehr zu sehen.“* – neben einer Schaltfläche **Anmelden**. Die Einstellungen **Anmeldeaufforderung auf dem Startbildschirm** auf derselben Seite Mitgliederportal (`/mobile/b1-mobile`) ermöglichen Ihnen, dies zu ändern:

- **Anmeldeaufforderung auf dem Startbildschirm der App anzeigen** – Deaktivieren Sie diese Option, um sowohl den Hinweis als auch die Schaltfläche **Anmelden** auf dem Startbildschirm auszublenden. Besucher können sich weiterhin über das App-Menü anmelden.
- **Text der Anmeldeaufforderung** – Ersetzen Sie den Standardtext durch Ihre eigene Nachricht (bis zu 150 Zeichen). Lassen Sie das Feld leer, um den Standardtext zu verwenden. Dieses Feld ist deaktiviert, solange die Aufforderung ausgeschaltet ist.

Klicken Sie auf **Speichern**, um die Änderungen zu übernehmen. Eine Meldung **Gespeichert** bestätigt die Änderung. Beim Speichern werden die zwischengespeicherten Einstellungen der App aktualisiert, sodass die Änderung beim nächsten Laden des Startbildschirms sichtbar ist.

### Kacheln auf dem Startbildschirm

Register mit einem Foto (siehe **Bild** unter [Ein neues Register hinzufügen](#adding-a-new-tab)) erscheinen auf dem [Startbildschirm](/docs/b1-church/getting-started/navigating#home) der App als Fotokacheln in einem Bereich mit der Überschrift Ihres Gemeindenamens. Dazu gehört auch ein Register „Vers des Tages“, sofern Sie ihm ein Foto zuweisen. Register mit Foto erscheinen zusätzlich weiterhin in der Registerleiste.

Die Einstellung **Kacheln auf dem Startbildschirm** auf derselben Seite Mitgliederportal (`/mobile/b1-mobile`) steuert, wie diese Kacheln angeordnet sind. Wählen Sie ein **Layout**:

- **Raster** – Zwei Kacheln pro Zeile (Standard). Ist die Anzahl der Kacheln ungerade, nimmt die erste Kachel die volle Breite ein.
- **Scrollende Reihe** – Eine Reihe von Kacheln, die Mitglieder seitwärts wischen.
- **Scrollend (automatisch)** – Dieselbe seitliche Reihe, die sich jedoch selbstständig bewegt und etwa alle vier Sekunden um eine Kachel weiterrückt. Am Ende springt sie zum Anfang zurück. Sie hält an, sobald ein Mitglied die Reihe berührt, darüber fährt oder sie mit der Tabulatortaste erreicht, und läuft einige Sekunden später wieder weiter. Auf Geräten, die reduzierte Bewegung eingestellt haben, bleibt die Reihe stehen und funktioniert wie **Scrollende Reihe**.
- **Liste** – Eine Liste mit einem kleinen Foto als Vorschaubild neben dem Namen jedes Registers.

Klicken Sie auf **Speichern**, um die Änderungen zu übernehmen.

### Abschnitte auf dem Startbildschirm

Angemeldete Mitglieder sehen ihren eigenen Anwesenheitsverlauf und ihre eingereichten Formulare immer auf der [Me-Seite](/docs/b1-church/getting-started/me-page). Über die Schalter **Abschnitte auf dem Startbildschirm** auf derselben Seite Mitgliederportal (`/mobile/b1-mobile`) lassen sich diese Angaben auch auf dem Startbildschirm anzeigen:

- **Meine Anwesenheit auf der Startseite anzeigen** – Fügt einen Abschnitt **Meine Anwesenheit** hinzu. Er zeigt, wie oft das Mitglied in den letzten 90 Tagen anwesend war, seine beiden letzten Besuche sowie einen Link **Verlauf** zu seiner vollständigen Anwesenheitsliste.
- **Meine Formulare auf der Startseite anzeigen** – Fügt einen Abschnitt **Meine Formulare** hinzu, mit den beiden letzten Formularübermittlungen des Mitglieds und einem Link **Alle Formulare**.

Beide Optionen sind standardmäßig ausgeschaltet. Ein Abschnitt erscheint nur für angemeldete Mitglieder, die mindestens einen anzuzeigenden Eintrag haben. Klicken Sie auf **Speichern**, um die Änderungen zu übernehmen.

## Wo diese Register erscheinen

Die hier konfigurierten Register werden in der **B1.church-PWA** angezeigt, die Ihre Mitglieder von jeder Seite unter `https://yourchurchname.b1.church` installieren. Änderungen auf dieser Seite werden angezeigt, sobald ein Mitglied die App das nächste Mal öffnet.

Auf einem Telefon zeigt die untere Registerleiste **Startseite**, bis zu drei Ihrer Register und **Mehr** an; auf einem Computer zeigt die Kopfzeile bis zu fünf. Integrierte Bildschirme (etwa Predigten, Geben oder Gruppen) erhalten zuerst ihre Plätze, und Register vom Typ **Interne Seite** füllen freie Plätze auf. Register vom Typ **Externe URL** und **Vers des Tages** erhalten nie einen Platz. Jedes Register, auch jene, die keinen Platz finden, ist auf der Seite **Mehr** der App aufgeführt. Siehe [B1App-Navigation](/docs/b1-church/getting-started/navigating), was Mitglieder sehen. (Register werden auch von der älteren [nativen B1 Mobile App](/docs/b1-mobile/) dargestellt, die von Mitgliedern genutzt wird, die sie noch verwenden. Diese App ist jedoch veraltet und wird nicht mehr aktualisiert.)

## Nächste Schritte

- [Kircheneinstellungen](./church-settings.md) – Kircheninformationen und Branding konfigurieren
- [Rollen & Berechtigungen](./roles-permissions.md) – Zugriffe für Ihr Team verwalten
