---
title: "Einstellungen der mobilen App"
description: "Konfigurieren Sie in B1 Admin die Navigationsreiter, Kacheln des Startbildschirms, die Anmeldeaufforderung und die Datenschutzeinstellungen des Mitgliederverzeichnisses für die Mitglieder-App von B1.church."
---

# Einstellungen der mobilen App

<div class="article-intro">

Auf der Seite Einstellungen der mobilen App konfigurieren Sie die Navigationsreiter, die in der **mobilen Erfahrung von B1.church (PWA)** für Ihre Gemeindemitglieder erscheinen. Sie bestimmen, welche Reiter sichtbar sind, wohin sie führen und wie sie dargestellt werden.

</div>

## Schulungsvideo {#training-video}

<YouTube id="7x2CQG_pH6o" title="Anpassen der Mitglieder-App Ihrer Gemeinde in B1" />

:::info
Hier konfigurierte Reiter erscheinen in der B1-App, die Mitglieder als [Progressive Web App (PWA)](../../b1-church/getting-started/installing-pwa.md) installieren können. Teilen Sie mit Ihren Mitgliedern die Installationsseite Ihrer Gemeinde – `https://yourchurchname.b1.church/mobile/install`. Dort werden sie Schritt für Schritt durch die Installation der App auf ihrem Gerät geführt, ganz ohne Download aus dem App Store oder Google Play.
:::

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Sie benötigen die Berechtigung „Kircheneinstellungen bearbeiten“. Falls Sie keinen Zugriff haben, lesen Sie [Rollen und Berechtigungen](./roles-permissions.md).
- Richten Sie zuerst Ihre [Kircheneinstellungen](./church-settings.md) ein, einschließlich des Namens Ihrer Gemeinde und des Erscheinungsbilds

</div>

## Die Navigationseinstellungen öffnen {#accessing-navigation-settings}

1. Öffnen Sie in B1 Admin das [Sprungmenü](../introduction.md#getting-around-with-the-jump-menu) (die Suchleiste oben links) und klappen Sie **Mobil** auf.
2. Klicken Sie auf **Navigation** (`/mobile/navigation`). Dafür benötigen Sie die Berechtigung **Inhalte bearbeiten**.
3. Die Liste **App-Reiter** zeigt Ihre aktuellen Reiter in der richtigen Reihenfolge, jeweils mit ihrer Sichtbarkeit. Reiter in einem Ordner sind darunter eingerückt.

Das Menü Mobil enthält außerdem **App-Design**, **Mitgliederportal**, **B1 Check-in**, **Etiketten** und **Push-Benachrichtigungen**. App-Design und Mitgliederportal werden unten beschrieben; zum Planen von Benachrichtigungen siehe [Push-Benachrichtigungen](#push-notifications).

## Einen neuen Reiter hinzufügen {#adding-a-new-tab}

1. Klicken Sie oben auf der Seite auf die Schaltfläche **Reiter hinzufügen**.
2. Füllen Sie die Angaben zum Reiter aus:
   - **Reitername** -- Die Beschriftung, die auf dem Reiter erscheint (zum Beispiel „Predigten“ oder „Geben“).
   - **Symbol** -- Klicken Sie auf die Symbolauswahl, um ein Symbol für Ihren Reiter zu wählen.
   - **Bild** -- Klicken Sie auf **Bild auswählen** (oder **Bild ändern**), um dem Reiter ein Foto zu geben. Reiter mit Foto erscheinen als Fotokacheln auf dem Startbildschirm der App – siehe [Kacheln auf dem Startbildschirm](#home-screen-tiles). Um das Foto zu entfernen, klicken Sie auf **Bild entfernen** und speichern; der Reiter erscheint dann als einfacher Reiter und nicht als Kachel auf dem Startbildschirm.
   - **Reitertyp** -- **Bibel**, **Livestream**, **Vers des Tages**, **Predigten**, **Check-in**, **Spende**, **Mitgliederverzeichnis**, **Meine Gruppen**, **Freiwilligenmöglichkeiten**, **Dienstpläne**, **Anmeldungen**, **Anfragen**, **Externe URL**, **Interne Seite** oder **Ordner**. **Anmeldungen** öffnet die Veranstaltungsanmeldungen des Mitglieds; **Anfragen** öffnet „Meine Anfragen“, wo ein Mitglied eine Veranstaltung anfragen und den Status früherer Anfragen sehen kann. Stellen Sie die Sichtbarkeit für diese Typen auf **Angemeldete Benutzer** oder **Mitglieder und Mitarbeitende**, da sie ein angemeldetes Mitglied benötigen.
   - **URL** -- Wird bei Reitern vom Typ **Externe URL** angezeigt: die Webadresse, die der Reiter öffnet.
   - **Seite** -- Wird bei Reitern vom Typ **Interne Seite** angezeigt: Wählen Sie eine der Seiten Ihrer Website.
   - **Übergeordneter Reiter** -- Legen Sie den Reiter in einen Reiter vom Typ **Ordner**, oder belassen Sie die Auswahl bei **Keiner (oberste Ebene)**. Siehe [Wo diese Reiter erscheinen](#where-these-tabs-appear).
   - **Sichtbarkeit** -- Wer diesen Reiter sieht: **Alle (einschließlich anonymer Besucher)**, **Angemeldete Benutzer**, **Mitglieder und Mitarbeitende**, **Nur Mitarbeitende**, **Mitglieder des Dienstteams** oder **Bestimmte Gruppen...** (dann die Gruppen anhaken). Bei einem Reiter **Mitgliederverzeichnis** steuert dies nur, wer den Reiter selbst sieht; wer das Verzeichnis öffnen darf, legt **Im Verzeichnis anzeigen** auf der Seite Mitgliederportal fest (siehe [Einstellungen für Mitgliederverzeichnis und Nachrichten](#member-directory--messaging-settings)).
3. Klicken Sie auf **Reiter speichern**, um ihn Ihrer App hinzuzufügen.

## Einen vorhandenen Reiter bearbeiten {#editing-an-existing-tab}

1. Klicken Sie in der Liste **App-Reiter** auf das Bearbeiten-Symbol (Stift) eines Reiters.
2. Ändern Sie den Namen, das Symbol, das Bild, den Typ oder die Sichtbarkeit des Reiters.
3. Klicken Sie auf **Reiter speichern**, um Ihre Änderungen zu übernehmen. Um den Reiter zu entfernen, klicken Sie stattdessen auf **Reiter löschen**. Beim Löschen eines Ordners werden die darin enthaltenen Reiter wieder auf die oberste Ebene verschoben.

## Reiter neu anordnen {#reordering-tabs}

Sie können die Reihenfolge ändern, in der die Reiter in der mobilen App erscheinen. Verwenden Sie die Pfeile **Nach oben verschieben** und **Nach unten verschieben** bei jedem Reiter, um sie umzuordnen. Reiter in einem Ordner bleiben innerhalb dieses Ordners. Die Reihenfolge auf dieser Seite entspricht der Reihenfolge, die Ihre Mitglieder in der App sehen.

:::info
Manche Reiter erscheinen automatisch, wenn bestimmte Bedingungen erfüllt sind – zum Beispiel kann ein Reiter für den Livestream auftauchen, sobald ein Stream aktiv ist. Manuell hinzugefügte Reiter geben Ihnen dagegen die volle Kontrolle darüber, was Ihre Mitglieder jederzeit sehen.
:::

:::tip
Halten Sie die Anzahl der Reiter überschaubar. Drei bis fünf Reiter funktionieren für die meisten Gemeinden gut. Zu viele Reiter können die Navigation für Ihre Mitglieder unübersichtlich machen.
:::

## App-Design {#app-theme}

**Mobil > App-Design** (`/mobile/theme`) legt die Farben fest, die von der B1-App, dem Mitgliederportal und dem Check-in-Terminal verwendet werden. Dafür benötigen Sie die Berechtigung **Kircheneinstellungen bearbeiten**.

1. Klappen Sie **Hellmodus** oder **Dunkelmodus** auf.
2. Wählen Sie für jede Farbe – **Hintergrund**, **Oberfläche**, **Primär**, **Primärer Kontrast** (Text auf Schaltflächen und Kopfzeilen in der Primärfarbe), **Sekundär** und **Textfarbe** – das Farbfeld, um eine Farbe auszuwählen, oder geben Sie sie im Feld **Hex** ein. Die **Vorschau** darunter zeigt eine Kopfzeile, eine Karte und eine Schaltfläche in Ihren Farben.
3. Klicken Sie auf **Speichern**.

Mit **Auf Standard zurücksetzen** kehren Sie zu den Standardfarben zurück. Das eigene Design **Benutzerdefiniert** von B1 Admin verwendet ebenfalls die Primärfarbe des Hellmodus – siehe [Ihr Profil verwalten](../profile/managing-profile.md).

## Einstellungen für Mitgliederverzeichnis und Nachrichten {#member-directory--messaging-settings}

Der Eintrag **Mitgliederportal** im selben Bereich Mobil (`/mobile/b1-mobile`, Überschrift **Portaleinstellungen**) enthält die Einstellungen für das Mitgliederverzeichnis und die private Nachrichtenfunktion in der Erfahrung von B1.church. Dafür benötigen Sie die Berechtigung **Kircheneinstellungen bearbeiten**. Ändern Sie eine der folgenden Einstellungen und klicken Sie unten auf der Seite auf **Speichern**:

- **Genehmigungsgruppe für das Verzeichnis** -- Die Gruppe, die Aktualisierungen des Mitgliederverzeichnisses sowie [Anfragen zur Kontolöschung](../profile/account-deletion.md) prüft, bevor sie wirksam werden.
- **Im Verzeichnis anzeigen** -- Wer das Mitgliederverzeichnis öffnen darf und wer darin aufgeführt wird: **Nur Administratoren**, **Mitglieder und höher** (die Voreinstellung), **Regelmäßige Besucher und höher** oder **Gäste und höher**. Personen, deren Mitgliedsstatus unterhalb der gewählten Stufe liegt, sehen das Verzeichnis nicht und werden darin nicht aufgeführt. **Nur Administratoren** sperrt das Verzeichnis für alle außer Mitarbeitenden mit der Berechtigung Personen &gt; Anzeigen (der Mitgliedsstatus Mitarbeitende allein reicht nicht aus); diese können das Verzeichnis immer öffnen und alle sehen, unabhängig von dieser Einstellung. Gäste werden nie aufgeführt, da jede Person, die sich online selbst registriert, zunächst als Gast gilt.
- **Sichtbarkeitseinstellung** -- Legt den gemeindeweiten Standard für Mitglieder fest, die noch keine eigene Einstellung gewählt haben. **Adresse**, **Telefonnummer** und **E-Mail** haben jeweils ein eigenes Auswahlfeld (jedes steht zunächst auf **Mitglieder**), mit denselben fünf Stufen, die überall dort gelten, wo die Sichtbarkeit festgelegt wird:
  - **Alle** -- für jeden sichtbar, auch für anonyme Besucher
  - **Mitglieder** -- nur für Personen mit einem Datensatz als Mitglied oder Mitarbeitende sichtbar
  - **Nur Gruppen** -- nur für Personen sichtbar, die mit dieser Person eine Gruppe teilen, sowie für Mitarbeitende
  - **Meine Gruppenleitenden und Mitarbeitende** -- nur für Leitende einer Gruppe, der diese Person angehört, sowie für Mitarbeitende sichtbar
  - **Nur Mitarbeitende** -- nur für Mitarbeitende sichtbar (alle, deren Mitgliedsstatus Mitarbeitende ist oder die die Berechtigung Personen &gt; Anzeigen haben) sowie für die Person selbst

  „Mitarbeitende“ bedeutet in diesen Stufen: alle, deren Mitgliedsstatus Mitarbeitende ist oder die die Berechtigung Personen &gt; Anzeigen haben. Änderungen an Gruppen wirken sofort: Wer einer Gruppe beitritt oder zur Gruppenleitung ernannt wird, sieht die passenden Angaben **Nur Gruppen** bzw. **Meine Gruppenleitenden und Mitarbeitende** der Mitglieder dieser Gruppe, ohne sich ab- und wieder anmelden zu müssen.

  Mitglieder können diese Standardwerte für ihren eigenen Datensatz über den Reiter **Datenschutz** in ihrem Profil in der B1.church-PWA überschreiben – siehe [Ihr Profil bearbeiten](/docs/b1-church/getting-started/me-page).
- **Mindestalter für private Nachrichten** -- Eine Schutzfunktion für Kinder. B1 öffnet **keine neue** private Nachrichtenunterhaltung, wenn eine der beiden Personen jünger als dieses Alter ist; maßgeblich ist das Geburtsdatum (ersatzweise die Haushaltsrolle, wenn kein Geburtsdatum hinterlegt ist). Personen unter diesem Alter bleiben im Verzeichnis vollständig sichtbar – blockiert wird nur die direkte Nachricht, und zwar **in beide Richtungen** für alle, auch für Mitarbeitende. Gruppenunterhaltungen und Nachrichten an die Eltern eines Kindes funktionieren weiterhin. Zur Auswahl stehen Aus, 13, 16 oder 18; Standard ist **18**. Bestehende Unterhaltungen bleiben unberührt.

:::tip
Da die Prüfung des Mindestalters auf Geburtsdaten beruht, achten Sie darauf, dass bei Kindern in Ihrer Gemeinde die Geburtsdaten eingetragen sind. Diese Einstellung gehört zur selben Familie von Schutzfunktionen wie die [Sicherheitsfunktionen des Check-ins](../attendance/checkin-safety.md).
:::

### Anmeldeaufforderung auf dem Startbildschirm {#home-screen-sign-in-prompt}

Besucher, die die App öffnen, ohne sich anzumelden, sehen auf dem [Startbildschirm](/docs/b1-church/getting-started/navigating#home) eine kurze Aufforderung – standardmäßig *„Melden Sie sich an, um Ihre Gruppen, Spenden und mehr zu sehen.“* – neben einer Schaltfläche **Anmelden**. Mit den Einstellungen **Anmeldeaufforderung auf dem Startbildschirm** auf derselben Seite Mitgliederportal (`/mobile/b1-mobile`) können Sie sie ändern:

- **Anmeldeaufforderung auf dem Startbildschirm der App anzeigen** -- Deaktivieren Sie dies, um sowohl die Aufforderung als auch die Schaltfläche **Anmelden** vom Startbildschirm auszublenden. Besucher können sich weiterhin über das Menü der App anmelden.
- **Text der Anmeldeaufforderung** -- Ersetzen Sie den Standardtext durch eine eigene Nachricht (bis zu 150 Zeichen). Lassen Sie das Feld leer, um den Standard zu verwenden. Dieses Feld ist deaktiviert, solange die Aufforderung ausgeschaltet ist.

Klicken Sie auf **Speichern**, um die Änderungen zu übernehmen. Eine Meldung **Gespeichert** bestätigt die Änderung. Beim Speichern werden die zwischengespeicherten Einstellungen der App aktualisiert, sodass die Änderung beim nächsten Laden des Startbildschirms sichtbar ist.

### Kacheln auf dem Startbildschirm {#home-screen-tiles}

Reiter mit einem Foto (siehe **Bild** unter [Einen neuen Reiter hinzufügen](#adding-a-new-tab)) erscheinen auf dem [Startbildschirm](/docs/b1-church/getting-started/navigating#home) der App als Fotokacheln in einem Abschnitt mit dem Namen Ihrer Gemeinde als Überschrift. Dazu gehört auch ein Reiter „Vers des Tages“, wenn Sie ihm ein Foto geben. Reiter mit Foto erscheinen zusätzlich auch in der Reiterleiste.

Die Einstellung **Kacheln auf dem Startbildschirm** auf derselben Seite Mitgliederportal (`/mobile/b1-mobile`) legt fest, wie diese Kacheln angeordnet werden. Wählen Sie ein **Layout**:

- **Raster** -- Zwei Kacheln pro Zeile (Standard). Bei einer ungeraden Anzahl Kacheln nimmt die erste Kachel die volle Breite ein.
- **Scrollende Reihe** -- Eine Reihe Kacheln, die Mitglieder seitlich wischen.
- **Scrollend (automatisch)** -- Dieselbe seitliche Reihe, die sich aber auch von selbst bewegt und etwa alle vier Sekunden um eine Kachel weiterrückt. Nach der letzten Kachel beginnt sie wieder bei der ersten. Sie hält an, sobald ein Mitglied die Reihe berührt, darüberfährt oder per Tabulator hineinspringt, und setzt ein paar Sekunden später fort. Auf Geräten mit reduzierter Bewegung bleibt die Reihe stehen und funktioniert wie **Scrollende Reihe**.
- **Liste** -- Eine Liste mit einem kleinen Fotovorschaubild neben dem Namen jedes Reiters.
- **Raster und Liste** -- Die ersten drei Fotoreiter als Raster, wobei die erste Kachel die volle Breite einnimmt, und die nächsten drei darunter als Liste mit einem kleinen Vorschaubild neben jedem Namen. Gibt es mehr als drei, zeigt die Abschnittsüberschrift einen Link **Alle**, der die Seite **Mehr** der App öffnet; dort sind alle Reiter aufgeführt.
- **Scrollend (automatisch) und Liste** -- Alle Fotoreiter in der oben beschriebenen, sich selbst weiterbewegenden Reihe, wobei die ersten drei zusätzlich darunter aufgelistet werden und bei mehr als drei derselbe Link **Alle** erscheint.

Bei beiden scrollenden Layouts erscheint unter den Kacheln eine Reihe Punkte, wenn mehr Kacheln vorhanden sind, als auf den Bildschirm passen – ein Punkt pro Kachel, wobei der Punkt der aktuellen Kachel gefüllt ist. Mitglieder können auf einen Punkt tippen, um direkt zu dieser Kachel zu springen.

Klicken Sie auf **Speichern**, um die Änderungen zu übernehmen.

### Abschnitte auf dem Startbildschirm {#home-screen-sections}

Angemeldete Mitglieder sehen ihren eigenen Anwesenheitsverlauf und eingereichte Formulare immer auf der [Seite Ich](/docs/b1-church/getting-started/me-page). Mit den Schaltern **Abschnitte auf dem Startbildschirm** auf derselben Seite Mitgliederportal (`/mobile/b1-mobile`) können Sie sie auch auf dem Startbildschirm anzeigen:

- **Meine Anwesenheit auf dem Startbildschirm anzeigen** -- Fügt einen Abschnitt **Meine Anwesenheit** hinzu, mit der Anzahl der Besuche des Mitglieds in den letzten 90 Tagen, seinen beiden letzten Besuchen und einem Link **Verlauf** zu seiner vollständigen Anwesenheitsliste.
- **Meine Formulare auf dem Startbildschirm anzeigen** -- Fügt einen Abschnitt **Meine Formulare** mit den beiden letzten Formulareinreichungen des Mitglieds und einem Link **Alle Formulare** hinzu.

Beide sind standardmäßig ausgeschaltet. Ein Abschnitt erscheint nur für angemeldete Mitglieder, die mindestens einen anzuzeigenden Eintrag haben.

- **Nachrichten auf dem Startbildschirm anzeigen** -- Fügt direkt unter der Begrüßung einen Abschnitt **Nachrichten** hinzu, der Ihre fünf neuesten veröffentlichten [Blogbeiträge](../website/blog.md) als Fotokarten in einer Reihe zeigt, die sich von selbst weiterbewegt. Ein Tipp auf eine Karte öffnet den vollständigen Beitrag in der App, und ein Link **Alle Nachrichten** listet Ihre aktuellen Beiträge auf. Ist die Option aktiv, können Sie mit **Nur diese Kategorie** eine Blogkategorie wählen (zum Beispiel *Ankündigungen*), sodass nur deren Beiträge erscheinen; belassen Sie es auf **Alle Beiträge**, um alles anzuzeigen. Nachrichten sind für alle sichtbar, die die App öffnen, angemeldet oder nicht, da Blogbeiträge auf Ihrer Website öffentlich sind. Die Option ist standardmäßig ausgeschaltet und erscheint nur, wenn mindestens ein veröffentlichter Beitrag vorhanden ist.

Klicken Sie auf **Speichern**, um die Änderungen zu übernehmen.

## Push-Benachrichtigungen {#push-notifications}

**Mobil > Push-Benachrichtigungen** (`/mobile/notifications`) sendet oder plant eine Push-Benachrichtigung an Personen, die die B1-App installiert und Benachrichtigungen aktiviert haben. Um an alle zu senden, benötigen Sie **Inhalte bearbeiten**; um an eine Gruppe zu senden, benötigen Sie **Gruppenmitglieder bearbeiten**.

1. Klicken Sie auf **Benachrichtigung senden**.
2. Wählen Sie die **Zielgruppe**: **Alle mit der App** oder eine Ihrer Gruppen. B1 zeigt an, wie viele Personen die Push-Nachricht erreicht und wie viele Push deaktiviert haben. Sie selbst erhalten Ihre eigene Push-Nachricht nicht.
3. Geben Sie einen **Titel** (bis zu 80 Zeichen) und eine **Nachricht** (bis zu 240 Zeichen) ein sowie optional eine **URL für Link oder Flyer öffnen** und eine **Bild-URL** (dieselben Felder wie bei einer [Gruppenbenachrichtigung](../groups/group-members.md#sending-push-notifications-to-group-members)).
4. Unter **Wann** behalten Sie **Jetzt senden** bei oder wählen Sie **Für später planen** und einen Zeitpunkt in der Zukunft unter **Senden um**.
5. Klicken Sie auf **Benachrichtigung senden** (oder **Benachrichtigung planen**).

Die Seite listet **Geplante** Benachrichtigungen (jeweils mit **Bearbeiten**, **Jetzt senden** und **Abbrechen**) und **Letzte** mit ihrem Status, etwa *Gesendet: 12 von 15*, *Abgebrochen* oder *Verpasst (Sendezeit ist vorbei)*. Mit **Entfernen** nehmen Sie eine abgeschlossene Benachrichtigung von der Liste, mit **Alle löschen** entfernen Sie alle gesendeten, fehlgeschlagenen und abgebrochenen. Die Zeiten werden in der [Zeitzone](./church-settings.md#time-zone) Ihrer Gemeinde angezeigt, oder in der Ihres Computers, falls die Gemeinde keine festgelegt hat. Wer eine geplante Benachrichtigung erhält, wird beim Versand erneut ermittelt.

Kann B1 eine Benachrichtigung mehr als 30 Minuten nach dem geplanten Zeitpunkt senden, wird sie als *Verpasst* markiert und nicht gesendet. Eine Benachrichtigung, die dreimal fehlschlägt, zeigt *Fehlgeschlagen* mit der Fehlermeldung. Das Entfernen einer Benachrichtigung von der Liste nimmt sie den Personen, die sie bereits erhalten haben, nicht wieder weg. Hat eine Push-Nachricht keinen Link, öffnet ein Tipp darauf bei einer gemeindeweiten Nachricht die Benachrichtigungsliste der App oder bei einer Gruppennachricht die Seite der Gruppe. Mitglieder, die **Gemeindeankündigungen** in ihren [Benachrichtigungseinstellungen](../../b1-church/getting-started/notification-preferences.md) deaktiviert haben, erhalten diese Push-Nachrichten nicht – unabhängig davon, ob sie an alle oder an eine Gruppe gehen.

## Wo diese Reiter erscheinen {#where-these-tabs-appear}

Die hier konfigurierten Reiter werden in der **B1.church-PWA** angezeigt, die Ihre Mitglieder von jeder Seite unter `https://yourchurchname.b1.church` installieren. Änderungen auf dieser Seite sind sichtbar, sobald ein Mitglied die App das nächste Mal öffnet.

Auf dem Telefon zeigt die untere Reiterleiste **Start**, bis zu drei Ihrer Reiter und **Mehr**; auf dem Computer zeigt die Kopfzeile bis zu fünf. Eingebaute Seiten (etwa Predigten, Spenden oder Gruppen) bekommen diese Plätze zuerst, und Reiter vom Typ **Interne Seite** füllen alle verbleibenden Plätze. **Externe-URL**- und **Vers des Tages**-Reiter bekommen nie einen Platz. Jeder Reiter, auch wenn er nicht hineinpasst, ist auf der Seite **Mehr** der App aufgeführt.

Eine Ausnahme sind Reiter, die in einem Reiter vom Typ **Ordner** liegen: Sie erscheinen nur auf der eigenen Seite des Ordners, die Mitglieder öffnen, indem sie auf den Ordner tippen. Diese Seite zeigt jeden Reiter mit einem Bild als Foto-Banner in voller Breite, darunter die Reiter ohne Bild als Liste. Ein Ordner, der keine für ein Mitglied sichtbaren Reiter enthält, wird diesem Mitglied ausgeblendet. Siehe [Ordner-Reiter](../../b1-church/getting-started/navigating.md#folder-tabs). Was Mitglieder sehen, erfahren Sie unter [Navigation in der B1-App](../../b1-church/getting-started/navigating.md).

## Nächste Schritte {#next-steps}

- [Kircheneinstellungen](./church-settings.md) -- Gemeindeinformationen und Erscheinungsbild konfigurieren
- [Rollen und Berechtigungen](./roles-permissions.md) -- Zugriff für Ihr Team verwalten
