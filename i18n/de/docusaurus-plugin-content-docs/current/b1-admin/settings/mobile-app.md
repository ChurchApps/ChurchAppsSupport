---
title: "Mobile-App-Einstellungen"
description: "Konfigurieren Sie die Navigationsreiter, die Kacheln des Startbildschirms, die Anmeldeaufforderung und die Datenschutzeinstellungen des Mitgliederverzeichnisses für die B1.church-Mitglieder-App in B1 Admin."
---

# Mobile-App-Einstellungen

<div class="article-intro">

Auf der Seite Mobile-App-Einstellungen konfigurieren Sie die Navigationsreiter, die in der **B1.church-Mobilerfahrung (PWA)** für Ihre Gemeindemitglieder angezeigt werden. Sie legen fest, welche Reiter sichtbar sind, wohin sie verlinken und wie sie dargestellt werden.

</div>

## Schulungsvideo

<YouTube id="ydY7WGK16fE" title="Die Mitglieder-App Ihrer Gemeinde in B1 anpassen" />

:::info
Die hier konfigurierten Reiter erscheinen in der B1 App, die Mitglieder als [Progressive Web App (PWA) installieren](../../b1-church/getting-started/installing-pwa.md) können. Teilen Sie die Installationsseite Ihrer Gemeinde — `https://yourchurchname.b1.church/mobile/install` — mit den Mitgliedern. Dort werden sie Schritt für Schritt durch die Installation der App auf ihrem Gerät geführt, ohne dass ein Download im App Store oder bei Google Play nötig ist.
:::

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Sie benötigen die Berechtigung „Kircheneinstellungen bearbeiten“. Falls Sie keinen Zugriff haben, lesen Sie [Rollen & Berechtigungen](./roles-permissions.md).
- Konfigurieren Sie zuerst Ihre [Kircheneinstellungen](./church-settings.md), einschließlich des Kirchennamens und des Erscheinungsbilds

</div>

## Navigationseinstellungen öffnen

1. Öffnen Sie in B1 Admin das [Sprungmenü](../introduction.md#getting-around-with-the-jump-menu) (die Suchleiste oben links) und klappen Sie **Mobile** auf.
2. Klicken Sie auf **Navigation** (`/mobile/navigation`).
3. Die Navigationsseite zeigt Ihre aktuellen App-Reiter an.

## Neuen Reiter hinzufügen

1. Klicken Sie oben auf der Seite auf die Schaltfläche **Reiter hinzufügen**.
2. Füllen Sie die Reiterdetails aus:
   - **Name** -- Die Beschriftung, die auf dem Reiter erscheint (zum Beispiel „Predigten“ oder „Geben“).
   - **Symbol** -- Klicken Sie auf die Symbolauswahl, um ein Symbol für Ihren Reiter zu wählen.
   - **Bild** -- Klicken Sie auf **Bild auswählen** (bzw. **Bild ändern**), um dem Reiter ein Foto zuzuweisen. Reiter mit einem Foto erscheinen als Fotokacheln auf dem Startbildschirm der App -- siehe [Kacheln des Startbildschirms](#home-screen-tiles).
   - **Reitertyp** -- Wählen Sie aus Optionen wie Bibel, Livestream, Spende, Website und weiteren.
   - **URL** -- Geben Sie die Webadresse ein, auf die der Reiter verlinken soll.
   - **Sichtbarkeit** -- Legen Sie fest, wer diesen Reiter sehen kann (alle, nur Mitglieder usw.). Bei einem Reiter **Mitgliederverzeichnis** steuert dies nur, wer den Reiter selbst sieht; wer das Verzeichnis öffnen darf, wird über **Im Verzeichnis anzeigen** auf der Seite Mitgliederportal festgelegt (siehe [Einstellungen für Mitgliederverzeichnis & Nachrichten](#member-directory--messaging-settings)).
3. Klicken Sie auf **Reiter speichern**, um ihn Ihrer App hinzuzufügen.

## Vorhandenen Reiter bearbeiten

1. Klicken Sie in der Liste **App-Reiter** auf einen beliebigen vorhandenen Reiter.
2. Aktualisieren Sie Name, Symbol, URL, Typ oder Sichtbarkeitseinstellungen des Reiters.
3. Klicken Sie auf **Reiter speichern**, um Ihre Änderungen zu übernehmen.

## Reiter neu anordnen

Sie können die Reihenfolge ändern, in der die Reiter in der Mobil-App erscheinen. Ziehen Sie die Reiter in der Liste per Drag & Drop in die gewünschte Reihenfolge. Die Reihenfolge auf dieser Seite entspricht der Reihenfolge, die Ihre Mitglieder in der App sehen.

:::info
Manche Reiter erscheinen automatisch, wenn bestimmte Bedingungen erfüllt sind -- beispielsweise kann ein Reiter für den Livestream erscheinen, sobald ein Stream aktiv ist. Manuell hinzugefügte Reiter geben Ihnen dagegen jederzeit die volle Kontrolle darüber, was Ihre Mitglieder sehen.
:::

:::tip
Halten Sie die Anzahl der Reiter überschaubar. Drei bis fünf Reiter funktionieren für die meisten Gemeinden gut. Zu viele Reiter können die Navigation für Ihre Mitglieder unübersichtlich machen.
:::

## Einstellungen für Mitgliederverzeichnis & Nachrichten

Der Eintrag **Mitgliederportal** im selben Bereich Mobile enthält die Einstellungen, die das Mitgliederverzeichnis und die privaten Nachrichten in der B1.church-Erfahrung regeln:

- **Genehmigungsgruppe für das Verzeichnis** -- Die Gruppe, die Aktualisierungen im Mitgliederverzeichnis sowie [Anträge auf Kontolöschung](../profile/account-deletion.md) prüft, bevor sie wirksam werden.
- **Im Verzeichnis anzeigen** -- Legt fest, wer das Mitgliederverzeichnis öffnen kann und wer darin aufgeführt wird: **Nur Administratoren**, **Mitglieder und höher** (die Standardeinstellung), **Regelmäßige Besucher und höher** oder **Gäste und höher**. Personen, deren Mitgliedschaftsstatus unter der gewählten Stufe liegt, sehen das Verzeichnis nicht und werden darin nicht aufgeführt. **Nur Administratoren** sperrt das Verzeichnis für alle außer Mitarbeitende mit der Berechtigung Personen > Anzeigen (der Mitgliedschaftsstatus Mitarbeiter allein reicht nicht aus). Diese dürfen das Verzeichnis unabhängig von dieser Einstellung immer öffnen und alle Einträge sehen. Gäste werden nie aufgenommen, da sich Personen, die sich online selbst registrieren, zunächst als Gast anmelden.
- **Sichtbarkeitspräferenz** -- Legt den gemeindeweiten Standard für Mitglieder fest, die noch keine eigene Einstellung gewählt haben. **Adresse**, **Telefonnummer** und **E-Mail** haben jeweils eine eigene Auswahlliste mit denselben fünf Stufen, die überall verfügbar sind, wo Sichtbarkeit konfiguriert wird:
  - **Alle** -- für jede Person sichtbar, auch für anonyme Besucher
  - **Mitglieder** -- nur für Personen mit einem Mitglieds- oder Mitarbeiterdatensatz sichtbar
  - **Nur Gruppen** -- nur für Personen sichtbar, die mit dieser Person eine Gruppe teilen, sowie für Mitarbeitende
  - **Meine Gruppenleiter und Mitarbeitende** -- nur für Leiter einer Gruppe sichtbar, der diese Person angehört, sowie für Mitarbeitende
  - **Nur Mitarbeitende** -- nur für Mitarbeitende sichtbar (alle, deren Mitgliedschaftsstatus Mitarbeiter ist oder die die Berechtigung Personen > Anzeigen besitzen) sowie für die Person selbst

  „Mitarbeitende“ bedeutet in diesen Stufen jede Person, deren Mitgliedschaftsstatus Mitarbeiter ist oder die die Berechtigung Personen > Anzeigen besitzt. Änderungen bei Gruppen wirken sofort: Wer einer Gruppe beitritt oder zum Gruppenleiter ernannt wird, kann die Angaben der Mitglieder dieser Gruppe, die auf **Nur Gruppen** bzw. **Meine Gruppenleiter und Mitarbeitende** eingestellt sind, ohne erneutes Abmelden und Anmelden sehen.

  Mitglieder können diese Standardwerte für ihren eigenen Datensatz auf der Registerkarte **Datenschutz** ihres Profils in der B1.church-PWA überschreiben -- siehe [Ihr Profil bearbeiten](/docs/b1-church/getting-started/me-page).
- **Mindestalter für private Nachrichten** -- Eine Kinderschutzfunktion. B1 öffnet keine **neue** private Nachrichtenunterhaltung, wenn eine der beiden Personen unter diesem Alter ist. Maßgeblich ist das Geburtsdatum (fehlt es, wird die Haushaltsrolle als Ersatz herangezogen). Personen unter diesem Alter bleiben im Verzeichnis vollständig sichtbar -- blockiert wird nur die Direktnachricht, und zwar **in beide Richtungen**, für alle, auch für Mitarbeitende. Gruppenunterhaltungen und Nachrichten an die Eltern eines Kindes funktionieren weiterhin. Zur Auswahl stehen Aus, 13, 16 oder 18; Standard ist **18**. Bestehende Unterhaltungen bleiben unberührt.

:::tip
Da die Altersprüfung auf Geburtsdaten beruht, achten Sie darauf, dass bei den Kindern Ihrer Gemeinde Geburtsdaten hinterlegt sind. Diese Einstellung gehört zur selben Familie von Kinderschutzfunktionen wie die [Sicherheitsfunktionen beim Check-in](../attendance/checkin-safety.md).
:::

### Anmeldeaufforderung auf dem Startbildschirm

Besucher, die die App öffnen, ohne sich anzumelden, sehen auf dem [Startbildschirm](/docs/b1-church/getting-started/navigating#home) einen kurzen Hinweis -- standardmäßig *„Melden Sie sich an, um Ihre Gruppen, Spenden und mehr zu sehen.“* -- neben einer Schaltfläche **Anmelden**. Die Einstellungen **Anmeldeaufforderung auf dem Startbildschirm** auf derselben Seite Mitgliederportal (`/mobile/b1-mobile`) erlauben es, diesen Text zu ändern:

- **Anmeldeaufforderung auf dem Startbildschirm der App anzeigen** -- Deaktivieren Sie diese Option, um sowohl den Hinweis als auch die Schaltfläche **Anmelden** auf dem Startbildschirm auszublenden. Besucher können sich weiterhin über das App-Menü anmelden.
- **Text der Anmeldeaufforderung** -- Ersetzen Sie den Standardtext durch Ihre eigene Nachricht (bis zu 150 Zeichen). Lassen Sie das Feld leer, um den Standardtext zu verwenden. Dieses Feld ist deaktiviert, solange die Aufforderung ausgeschaltet ist.

Klicken Sie auf **Speichern**, um die Änderungen zu übernehmen. Eine Meldung **Gespeichert** bestätigt die Änderung. Beim Speichern werden die zwischengespeicherten Einstellungen der App aktualisiert, sodass die Änderung beim nächsten Laden des Startbildschirms sichtbar wird.

### Kacheln des Startbildschirms

Reiter mit einem Foto (siehe **Bild** unter [Neuen Reiter hinzufügen](#adding-a-new-tab)) erscheinen auf dem [Startbildschirm](/docs/b1-church/getting-started/navigating#home) der App als Fotokacheln in einem Abschnitt mit dem Namen Ihrer Gemeinde. Dazu gehört auch ein Reiter „Vers des Tages“, sofern Sie ihm ein Foto geben. Reiter mit Fotos erscheinen zusätzlich weiterhin in der Reiterleiste.

Die Einstellung **Kacheln des Startbildschirms** auf derselben Seite Mitgliederportal (`/mobile/b1-mobile`) steuert, wie diese Kacheln angeordnet sind. Wählen Sie ein **Layout**:

- **Raster** -- Zwei Kacheln pro Zeile (Standard). Ist die Anzahl der Kacheln ungerade, nimmt die erste Kachel die volle Breite ein.
- **Scrollende Zeile** -- Eine Zeile mit Kacheln, die Mitglieder seitlich wischen können.
- **Scrollend (automatisch)** -- Dieselbe seitlich scrollende Zeile, die sich aber auch von selbst bewegt und etwa alle vier Sekunden um eine Kachel weiterschaltet. Nach der letzten Kachel beginnt sie wieder bei der ersten. Sie hält an, sobald ein Mitglied die Zeile berührt, darüberfährt oder per Tabulatortaste hineinspringt, und setzt ein paar Sekunden später fort. Auf Geräten mit reduzierter Bewegung bleibt die Zeile stehen und verhält sich wie **Scrollende Zeile**.
- **Liste** -- Eine Liste mit einer kleinen Fotovorschau neben dem Namen jedes Reiters.

Bei beiden scrollenden Layouts erscheint unter den Kacheln, sofern mehr Kacheln vorhanden sind, als auf den Bildschirm passen, eine Reihe von Punkten -- einer pro Kachel. Der Punkt der aktuellen Kachel ist ausgefüllt. Mitglieder können auf einen Punkt tippen, um direkt zu dieser Kachel zu springen.

Klicken Sie auf **Speichern**, um die Änderungen zu übernehmen.

### Bereiche des Startbildschirms

Angemeldete Mitglieder sehen ihre eigene Anwesenheitshistorie und eingereichte Formulare immer auf der [Me-Seite](/docs/b1-church/getting-started/me-page). Mit den Schaltern **Bereiche des Startbildschirms** auf derselben Seite Mitgliederportal (`/mobile/b1-mobile`) können diese Angaben auch auf dem Startbildschirm angezeigt werden:

- **Meine Anwesenheit auf dem Startbildschirm anzeigen** -- Fügt einen Bereich **Meine Anwesenheit** hinzu, der angibt, wie oft das Mitglied in den letzten 90 Tagen anwesend war, die beiden letzten Besuche zeigt und einen Link **Verlauf** zur vollständigen Anwesenheitsliste enthält.
- **Meine Formulare auf dem Startbildschirm anzeigen** -- Fügt einen Bereich **Meine Formulare** hinzu, der die beiden letzten Formulareinreichungen des Mitglieds und einen Link **Alle Formulare** enthält.

Beide Optionen sind standardmäßig deaktiviert. Ein Bereich erscheint nur für angemeldete Mitglieder, die mindestens einen anzuzeigenden Eintrag haben. Klicken Sie auf **Speichern**, um die Änderungen zu übernehmen.

## Wo diese Reiter erscheinen

Die hier konfigurierten Reiter werden in der **B1.church-PWA** angezeigt, die Ihre Mitglieder von jeder Seite unter `https://yourchurchname.b1.church` installieren. Änderungen auf dieser Seite werden übernommen, sobald ein Mitglied die App das nächste Mal öffnet.

Auf einem Telefon zeigt die untere Reiterleiste **Startseite**, bis zu drei Ihrer Reiter und **Mehr** an; auf einem Computer zeigt der Kopfbereich bis zu fünf. Eingebaute Bildschirme (etwa Predigten, Geben oder Gruppen) erhalten diese Plätze zuerst, und Reiter vom Typ **Interne Seite** füllen freie Plätze auf. Reiter vom Typ **Externe URL** und **Vers des Tages** erhalten nie einen Platz. Jeder Reiter, auch wenn er keinen Platz findet, ist auf der Seite **Mehr** der App aufgelistet.

Eine Ausnahme bilden Reiter innerhalb eines **Ordner**-Reiters: Sie erscheinen nur auf dem eigenen Bildschirm des Ordners, den Mitglieder durch Antippen öffnen. Dieser Bildschirm zeigt die Reiter als Fotokacheln, wenn alle ein Bild haben, andernfalls als Liste. Ein Ordner, der keine Reiter enthält, die ein Mitglied sehen kann, wird für dieses Mitglied ausgeblendet. Siehe [Ordner-Reiter](../../b1-church/getting-started/navigating.md#folder-tabs). Was Mitglieder sehen, erfahren Sie unter [B1App navigieren](../../b1-church/getting-started/navigating.md).

## Nächste Schritte

- [Kircheneinstellungen](./church-settings.md) -- Konfigurieren Sie Ihre Gemeindeinformationen und Ihr Erscheinungsbild
- [Rollen & Berechtigungen](./roles-permissions.md) -- Zugriffe für Ihr Team verwalten
