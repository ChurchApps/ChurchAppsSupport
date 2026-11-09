---
title: "Einstellungen der mobilen App"
description: "Navigationsreiter, Kacheln auf dem Startbildschirm, Anmeldeaufforderung und Datenschutz des Mitgliederverzeichnisses für die Mitglieder-App B1.church in B1 Admin konfigurieren."
---

# Einstellungen der mobilen App

<div class="article-intro">

Auf der Seite Einstellungen der mobilen App konfigurieren Sie die Navigationsreiter, die in der **mobilen Erfahrung von B1.church (PWA)** für Ihre Gemeindemitglieder erscheinen. Sie bestimmen, welche Reiter sichtbar sind, wohin sie führen und wie sie dargestellt werden.

</div>

## Schulungsvideo

<YouTube id="ydY7WGK16fE" title="Die Mitglieder-App Ihrer Gemeinde in B1 anpassen" />

:::info
Die hier konfigurierten Reiter erscheinen in der B1-App, die Mitglieder als [Progressive Web App (PWA)](../../b1-church/getting-started/installing-pwa.md) installieren können. Teilen Sie mit Ihren Mitgliedern die Installationsseite Ihrer Gemeinde: `https://ihrgemeindename.b1.church/mobile/install`. Dort werden sie Schritt für Schritt durch die Installation der App auf ihrem Gerät geführt. Ein Download aus dem App Store oder von Google Play ist nicht nötig.
:::

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Sie benötigen die Berechtigung „Gemeindeeinstellungen bearbeiten“. Wenn Sie keinen Zugriff haben, lesen Sie [Rollen & Berechtigungen](./roles-permissions.md).
- Konfigurieren Sie zuerst Ihre [Gemeindeeinstellungen](./church-settings.md), einschließlich Name und Erscheinungsbild Ihrer Gemeinde.

</div>

## Die Navigationseinstellungen öffnen

1. Öffnen Sie in B1 Admin das [Sprungmenü](../introduction.md#getting-around-with-the-jump-menu) (die Suchleiste oben links) und klappen Sie **Mobile** auf.
2. Klicken Sie auf **Navigation** (`/mobile/navigation`).
3. Die Seite Navigation zeigt Ihre aktuellen Reiter der App.

## Einen neuen Reiter hinzufügen {#adding-a-new-tab}

1. Klicken Sie oben auf der Seite auf die Schaltfläche **Reiter hinzufügen**.
2. Füllen Sie die Angaben zum Reiter aus:
   - **Name** -- Die Bezeichnung, die auf dem Reiter erscheint (zum Beispiel „Predigten“ oder „Geben“).
   - **Symbol** -- Klicken Sie auf die Symbolauswahl, um ein Symbol für Ihren Reiter zu wählen.
   - **Bild** -- Klicken Sie auf **Bild auswählen** (oder **Bild ändern**), um dem Reiter ein Foto zu geben. Reiter mit Foto erscheinen als Fotokacheln auf dem Startbildschirm der App. Siehe [Kacheln auf dem Startbildschirm](#home-screen-tiles).
   - **Reitertyp** -- Wählen Sie aus Optionen wie Bibel, Livestream, Spende, Anmeldungen, Anfragen, Website und mehr. **Anmeldungen** öffnet die Veranstaltungsanmeldungen des Mitglieds. **Anfragen** öffnet Meine Anfragen, wo ein Mitglied eine Veranstaltung anfragen und den Status früherer Anfragen sehen kann. Stellen Sie für diese Typen die Sichtbarkeit auf **Angemeldete Nutzende** oder **Mitglieder & Mitarbeitende**, denn sie setzen ein angemeldetes Mitglied voraus.
   - **URL** -- Geben Sie die Web-Adresse ein, auf die der Reiter verlinken soll.
   - **Sichtbarkeit** -- Legen Sie fest, wer diesen Reiter sieht (alle, nur Mitglieder usw.). Bei einem Reiter **Mitgliederverzeichnis** bestimmt dies nur, wer den Reiter selbst sieht. Wer das Verzeichnis öffnen kann, legen Sie über **Im Verzeichnis anzeigen** auf der Seite Mitgliederportal fest (siehe [Einstellungen für Mitgliederverzeichnis & Nachrichten](#member-directory--messaging-settings)).
3. Klicken Sie auf **Reiter speichern**, um ihn Ihrer App hinzuzufügen.

## Einen vorhandenen Reiter bearbeiten

1. Klicken Sie in der Liste **App-Reiter** auf einen beliebigen vorhandenen Reiter.
2. Ändern Sie Name, Symbol, URL, Typ oder Sichtbarkeit des Reiters.
3. Klicken Sie auf **Reiter speichern**, um die Änderungen zu übernehmen.

## Reiter neu anordnen

Sie können die Reihenfolge ändern, in der die Reiter in der mobilen App erscheinen. Ziehen Sie Reiter in der Liste per Drag-and-drop, um sie umzusortieren. Die Reihenfolge auf dieser Seite entspricht der Reihenfolge, die Ihre Mitglieder in der App sehen.

:::info
Manche Reiter erscheinen automatisch, wenn bestimmte Bedingungen erfüllt sind. Ein Reiter für den Livestream kann zum Beispiel erscheinen, sobald ein Stream läuft. Manuell hinzugefügte Reiter geben Ihnen dagegen volle Kontrolle darüber, was Ihre Mitglieder jederzeit sehen.
:::

:::tip
Halten Sie die Anzahl der Reiter überschaubar. Drei bis fünf Reiter funktionieren für die meisten Gemeinden gut. Zu viele Reiter machen die Navigation für Ihre Mitglieder unübersichtlich.
:::

## Einstellungen für Mitgliederverzeichnis & Nachrichten {#member-directory--messaging-settings}

Der Eintrag **Mitgliederportal** im selben Bereich Mobile enthält die Einstellungen für das Mitgliederverzeichnis und die private Nachrichtenfunktion in B1.church:

- **Verzeichnis-Genehmigungsgruppe** -- Die Gruppe, die Aktualisierungen des Mitgliederverzeichnisses sowie [Anfragen zur Kontolöschung](../profile/account-deletion.md) prüft, bevor sie wirksam werden.
- **Im Verzeichnis anzeigen** -- Wer das Mitgliederverzeichnis öffnen kann und wer darin aufgeführt wird: **Nur Administrator:innen**, **Mitglieder und höher** (die Standardeinstellung), **Regelmäßige Teilnehmende und höher** oder **Besuchende und höher**. Personen, deren Mitgliedsstatus unter der gewählten Stufe liegt, sehen das Verzeichnis nicht und werden darin nicht aufgeführt. **Nur Administrator:innen** sperrt das Verzeichnis für alle außer Mitarbeitende mit der Berechtigung Personen > Ansehen (der Mitgliedsstatus Mitarbeitende allein genügt nicht). Diese können das Verzeichnis immer öffnen und alle sehen, unabhängig von dieser Einstellung. Gäste sind nie enthalten, da alle, die sich online selbst registrieren, zunächst als Gäste geführt werden.
- **Sichtbarkeitsvoreinstellung** -- Legt den gemeindeweiten Standard für Mitglieder fest, die noch keine eigene Einstellung gewählt haben. **Adresse**, **Telefonnummer** und **E-Mail** haben jeweils ein eigenes Dropdown-Menü mit denselben fünf Stufen, die überall dort gelten, wo die Sichtbarkeit konfiguriert wird:
  - **Alle** -- für jeden sichtbar, auch für anonyme Besuchende
  - **Mitglieder** -- nur für Personen mit einem Datensatz als Mitglied oder Mitarbeitende sichtbar
  - **Nur Gruppen** -- nur für Personen sichtbar, die mit dieser Person eine Gruppe teilen, sowie für Mitarbeitende
  - **Meine Gruppenleitungen und Mitarbeitende** -- nur für Leitungen einer Gruppe sichtbar, der diese Person angehört, sowie für Mitarbeitende
  - **Nur Mitarbeitende** -- nur für Mitarbeitende sichtbar (alle, deren Mitgliedsstatus Mitarbeitende ist oder die die Berechtigung Personen > Ansehen haben), sowie für die Person selbst

  „Mitarbeitende“ bedeutet in diesen Stufen: jede Person mit dem Mitgliedsstatus Mitarbeitende oder mit der Berechtigung Personen > Ansehen. Änderungen bei Gruppen wirken sofort. Wer einer Gruppe beitritt oder zur Gruppenleitung gemacht wird, kann die passenden Angaben **Nur Gruppen** oder **Meine Gruppenleitungen und Mitarbeitende** der Mitglieder dieser Gruppe sehen, ohne sich ab- und wieder anzumelden.

  Mitglieder können diese Voreinstellungen für ihren eigenen Datensatz überschreiben, und zwar im Reiter **Datenschutz** ihres Profils in der B1.church-PWA. Siehe [Ihr Profil bearbeiten](/docs/b1-church/getting-started/me-page).
- **Mindestalter für private Nachrichten** -- Eine Funktion zum Schutz von Kindern. B1 öffnet keine **neue** private Nachrichtenkonversation, wenn eine der beiden Personen unter diesem Alter liegt. Das Alter wird anhand des Geburtsdatums ermittelt. Ist kein Geburtsdatum hinterlegt, wird ersatzweise die Haushaltsrolle herangezogen. Personen unter diesem Alter bleiben im Verzeichnis vollständig sichtbar. Blockiert wird nur die direkte Nachrichtenfunktion, und zwar **in beide Richtungen** für alle, auch für Mitarbeitende. Gruppenkonversationen und Nachrichten an die Eltern eines Kindes funktionieren weiterhin. Zur Auswahl stehen Aus, 13, 16 oder 18. Die Standardeinstellung ist **18**. Bestehende Konversationen sind nicht betroffen.

:::tip
Da die Altersprüfung auf Geburtsdaten beruht, stellen Sie sicher, dass bei den Kindern Ihrer Gemeinde die Geburtsdaten eingetragen sind. Diese Einstellung gehört zur gleichen Gruppe von Schutzfunktionen für Kinder wie die [Sicherheitseinstellungen für den Check-in](../attendance/checkin-safety.md).
:::

### Anmeldeaufforderung auf dem Startbildschirm {#home-screen-sign-in-prompt}

Besuchende, die die [Startseite](/docs/b1-church/getting-started/navigating#home) der App öffnen, ohne sich anzumelden, sehen einen kurzen Hinweis. Standardmäßig lautet er *„Melden Sie sich an, um Ihre Gruppen, Spenden und mehr zu sehen.“* Daneben steht eine Schaltfläche **Anmelden**. Mit den Einstellungen **Anmeldeaufforderung auf dem Startbildschirm** auf derselben Seite Mitgliederportal (`/mobile/b1-mobile`) können Sie den Text ändern:

- **Anmeldeaufforderung auf dem Startbildschirm der App anzeigen** -- Schalten Sie dies aus, um den Hinweis und die Schaltfläche **Anmelden** vom Startbildschirm zu entfernen. Besuchende können sich weiterhin über das Menü der App anmelden.
- **Text der Anmeldeaufforderung** -- Ersetzen Sie den Standardtext durch Ihre eigene Nachricht (bis zu 150 Zeichen). Lassen Sie das Feld leer, um den Standardtext zu verwenden. Dieses Feld ist deaktiviert, solange die Aufforderung ausgeschaltet ist.

Klicken Sie auf **Speichern**, um die Änderungen zu übernehmen. Eine Meldung **Gespeichert** bestätigt die Änderung. Beim Speichern werden die zwischengespeicherten Einstellungen der App aktualisiert, sodass die Änderung beim nächsten Laden des Startbildschirms sichtbar ist.

### Kacheln auf dem Startbildschirm {#home-screen-tiles}

Reiter mit einem Foto (siehe **Bild** unter [Einen neuen Reiter hinzufügen](#adding-a-new-tab)) erscheinen auf dem [Startbildschirm](/docs/b1-church/getting-started/navigating#home) der App als Fotokacheln, in einem Abschnitt mit dem Namen Ihrer Gemeinde als Überschrift. Dazu gehört auch ein Reiter „Vers des Tages“, wenn Sie ihm ein Foto geben. Reiter mit Foto erscheinen außerdem weiterhin in der Reiterleiste.

Die Einstellung **Kacheln auf dem Startbildschirm** auf derselben Seite Mitgliederportal (`/mobile/b1-mobile`) bestimmt das Layout dieser Kacheln. Wählen Sie ein **Layout**:

- **Raster** -- Zwei Kacheln pro Zeile (die Standardeinstellung). Ist die Anzahl der Kacheln ungerade, nimmt die erste Kachel die volle Breite ein.
- **Scrollende Zeile** -- Eine Zeile mit Kacheln, die Mitglieder seitlich wischen.
- **Scrollend (automatisch)** -- Dieselbe seitliche Zeile, die sich aber auch von selbst bewegt. Etwa alle vier Sekunden rückt sie um eine Kachel weiter. Nach der letzten Kachel beginnt sie wieder bei der ersten. Sie hält an, wenn ein Mitglied die Zeile berührt, darüberfährt oder mit der Tab-Taste hineinspringt, und läuft wenige Sekunden später weiter. Auf Geräten, bei denen die Bewegungsreduzierung aktiv ist, bleibt die Zeile stehen und funktioniert wie **Scrollende Zeile**.
- **Liste** -- Eine Liste mit einem kleinen Fotovorschaubild neben dem Namen jedes Reiters.
- **Raster und Liste** -- Die ersten drei Fotoreiter als Raster, wobei die erste Kachel die volle Breite einnimmt. Die übrigen werden darunter mit einem kleinen Vorschaubild neben jedem Namen aufgelistet. Gibt es mehr als drei, zeigt die Abschnittsüberschrift einen Link **Alle**, der die Seite **Mehr** der App öffnet. Sie listet jeden Reiter auf.
- **Scrollend (automatisch) und Liste** -- Die ersten drei Fotoreiter in der oben beschriebenen, sich selbst weiterbewegenden Zeile. Die übrigen werden darunter aufgelistet, mit demselben Link **Alle**.

In beiden scrollenden Layouts erscheint unter den Kacheln eine Reihe von Punkten, wenn mehr Kacheln vorhanden sind, als auf den Bildschirm passen. Pro Kachel gibt es einen Punkt, und der Punkt der aktuellen Kachel ist ausgefüllt. Mitglieder können auf einen Punkt tippen, um zu dieser Kachel zu springen.

Klicken Sie auf **Speichern**, um die Änderungen zu übernehmen.

### Abschnitte auf dem Startbildschirm {#home-screen-sections}

Angemeldete Mitglieder sehen ihre eigene Anwesenheitshistorie und ihre eingereichten Formulare immer auf der Seite [Ich](/docs/b1-church/getting-started/me-page). Mit den Schaltern **Abschnitte auf dem Startbildschirm** auf derselben Seite Mitgliederportal (`/mobile/b1-mobile`) können diese auch auf dem Startbildschirm erscheinen:

- **Meine Anwesenheit auf der Startseite anzeigen** -- Fügt einen Abschnitt **Meine Anwesenheit** hinzu. Er zeigt, wie oft das Mitglied in den letzten 90 Tagen anwesend war, seine beiden letzten Besuche und einen Link **Verlauf** zur vollständigen Anwesenheitsliste.
- **Meine Formulare auf der Startseite anzeigen** -- Fügt einen Abschnitt **Meine Formulare** hinzu. Er zeigt die beiden letzten Formulareinsendungen des Mitglieds und einen Link **Alle Formulare**.

Beide Schalter sind standardmäßig ausgeschaltet. Ein Abschnitt erscheint nur für angemeldete Mitglieder, die mindestens einen Eintrag anzuzeigen haben.

- **Neuigkeiten auf der Startseite anzeigen** -- Fügt direkt unter der Begrüßung einen Abschnitt **Neuigkeiten** hinzu. Er zeigt Ihre fünf neuesten veröffentlichten [Blogbeiträge](../website/blog.md) als Fotokarten in einer Reihe, die sich von selbst weiterbewegt. Ein Tipp auf eine Karte öffnet den vollständigen Beitrag direkt in der App. Ein Link **Alle Neuigkeiten** listet Ihre aktuellen Beiträge auf. Sobald diese Option aktiv ist, können Sie mit **Nur diese Kategorie** eine Blogkategorie auswählen (zum Beispiel *Ankündigungen*), damit nur diese Beiträge erscheinen. Bleibt die Auswahl auf **Alle Beiträge**, werden alle gezeigt. Neuigkeiten sind für alle sichtbar, die die App öffnen, angemeldet oder nicht, da Blogbeiträge auf Ihrer Website öffentlich sind. Die Option ist standardmäßig ausgeschaltet und erscheint nur, wenn mindestens ein veröffentlichter Beitrag vorhanden ist.

Klicken Sie auf **Speichern**, um die Änderungen zu übernehmen.

## Wo diese Reiter erscheinen

Die hier konfigurierten Reiter werden in der **B1.church-PWA** angezeigt, die Ihre Mitglieder von jeder Seite unter `https://ihrgemeindename.b1.church` installieren. Änderungen auf dieser Seite sind beim nächsten Öffnen der App für Mitglieder sichtbar.

Auf dem Telefon zeigt die untere Reiterleiste **Start**, bis zu drei Ihrer Reiter und **Mehr**. Auf dem Computer zeigt die Kopfzeile bis zu fünf Reiter. Integrierte Bereiche (etwa Predigten, Spenden oder Gruppen) erhalten die Plätze zuerst. **Interne Seite**-Reiter füllen freie Plätze. Reiter **Externe URL** und **Vers des Tages** erhalten nie einen Platz. Jeder Reiter, auch wenn er keinen Platz findet, steht auf der Seite **Mehr** der App.

Reiter, die in einen **Ordner**-Reiter gelegt werden, sind die Ausnahme. Sie erscheinen nur auf dem Bildschirm des Ordners, den Mitglieder durch Antippen des Ordners öffnen. Dieser Bildschirm zeigt die Reiter als Fotokacheln, wenn alle einen Bild haben, andernfalls als Liste. Ein Ordner, der keine Reiter enthält, die ein Mitglied sehen kann, wird diesem Mitglied ausgeblendet. Siehe [Ordner-Reiter](../../b1-church/getting-started/navigating.md#folder-tabs). Was Mitglieder sehen, erfahren Sie unter [Navigation in der B1-App](../../b1-church/getting-started/navigating.md).

## App-Design

Unter **Mobile > App-Design** legen Sie die Farben der App Ihrer Gemeinde sowohl für den hellen als auch für den dunklen Modus fest: **Hintergrund**, **Fläche**, **Primär**, **Primärer Kontrast**, **Sekundär** und **Textfarbe**. Wählen Sie eine Farbe aus dem Farbfeld oder geben Sie ihren Wert im Feld **Hex** daneben ein (zum Beispiel `#1565C0`; das `#` ist optional). Eine eingetippte Farbe wird übernommen, sobald alle sechs Hex-Ziffern eingegeben sind.

## Push-Benachrichtigungen

Um Push-Benachrichtigungen an alle mit Ihrer App oder an eine Gruppe zu senden oder zu planen, verwenden Sie **Mobile > Push-Benachrichtigungen**. Siehe [Push-Benachrichtigungen](./push-notifications.md).

## Nächste Schritte

- [Gemeindeeinstellungen](./church-settings.md) -- Gemeindeinformationen und Erscheinungsbild konfigurieren
- [Rollen & Berechtigungen](./roles-permissions.md) -- Zugriff für Ihr Team verwalten
