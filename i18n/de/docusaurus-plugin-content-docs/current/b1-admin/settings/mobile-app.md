---
title: "Einstellungen der mobilen App"
---

# Einstellungen der mobilen App

<div class="article-intro">

Die Seite Einstellungen der mobilen App lässt Sie die Navigationsreiter konfigurieren, die im **B1.church-Mobilerlebnis (PWA)** für Ihre Gemeindemitglieder erscheinen. Sie bestimmen, welche Reiter sichtbar sind, wohin sie verlinken und wie sie dargestellt werden.

</div>

## Einführungsvideo

<YouTube id="ydY7WGK16fE" title="Die Mitglieder-App Ihrer Kirche in B1 anpassen" />

:::info Die native B1-Mobile-App ist veraltet
Die hier konfigurierten Reiter werden über die [B1.church Progressive Web App (PWA)](/docs/b1-church/getting-started/installing-pwa) ausgeliefert, die die native B1-Mobile-App ersetzt hat. Teilen Sie die Installationsseite Ihrer Kirche -- `https://ihrekirchenname.b1.church/mobile/install` -- mit Ihren Mitgliedern. Sie führt sie durch die Installation der App auf ihrem Gerät, ganz ohne Download aus dem App Store oder von Google Play.
:::

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Sie benötigen die Berechtigung "Kircheneinstellungen bearbeiten". Falls Sie keinen Zugriff haben, lesen Sie [Rollen und Berechtigungen](./roles-permissions.md).
- Konfigurieren Sie zuerst Ihre [Kircheneinstellungen](./church-settings.md), einschließlich Kirchenname und Branding

</div>

## Navigationseinstellungen öffnen

1. Öffnen Sie in B1 Admin das [Sprungmenü](../introduction.md#getting-around-with-the-jump-menu) (die Suchleiste oben links) und klappen Sie **Mobil** auf.
2. Klicken Sie auf **Navigation** (`/mobile/navigation`).
3. Die Seite Navigation zeigt Ihre aktuellen App-Reiter.

## Einen neuen Reiter hinzufügen {#adding-a-new-tab}

1. Klicken Sie oben auf der Seite auf die Schaltfläche **Reiter hinzufügen**.
2. Füllen Sie die Angaben zum Reiter aus:
   - **Name** -- Die Beschriftung, die auf dem Reiter erscheint (zum Beispiel "Predigten" oder "Geben").
   - **Symbol** -- Klicken Sie auf die Symbolauswahl, um ein Symbol für Ihren Reiter zu wählen.
   - **Bild** -- Klicken Sie auf **Bild auswählen** (oder **Bild ändern**), um dem Reiter ein Foto zu geben. Reiter mit Foto erscheinen auf dem Startbildschirm der App als Fotokacheln -- siehe [Startbildschirm-Kacheln](#home-screen-tiles).
   - **Reitertyp** -- Wählen Sie aus Optionen wie Bibel, Livestream, Spende, Website und weitere.
   - **URL** -- Geben Sie die Webadresse ein, auf die der Reiter verlinken soll.
   - **Sichtbarkeit** -- Legen Sie fest, wer diesen Reiter sieht (alle, nur Mitglieder usw.). Bei einem Reiter **Mitgliederverzeichnis** bestimmt dies nur, wer den Reiter selbst sieht; wer das Verzeichnis öffnen darf, legt die Einstellung **Im Verzeichnis anzeigen** auf der Seite Mitgliederportal fest (siehe [Einstellungen für Mitgliederverzeichnis & Nachrichten](#member-directory--messaging-settings)).
3. Klicken Sie auf **Reiter speichern**, um ihn Ihrer App hinzuzufügen.

## Einen bestehenden Reiter bearbeiten

1. Klicken Sie auf einen bestehenden Reiter in der Liste **App-Reiter**.
2. Aktualisieren Sie Name, Symbol, URL, Typ oder Sichtbarkeit des Reiters.
3. Klicken Sie auf **Reiter speichern**, um Ihre Änderungen zu übernehmen.

## Reiter neu anordnen

Sie können die Reihenfolge ändern, in der die Reiter in der mobilen App erscheinen. Ziehen Sie die Reiter in der Liste per Drag & Drop, um sie umzuordnen. Die Reihenfolge auf dieser Seite entspricht der Reihenfolge, die Ihre Mitglieder in der App sehen.

:::info
Manche Reiter erscheinen automatisch, wenn bestimmte Bedingungen erfüllt sind -- zum Beispiel kann ein Reiter für den Livestream erscheinen, sobald ein Stream läuft. Manuell hinzugefügte Reiter geben Ihnen dagegen volle Kontrolle darüber, was Ihre Mitglieder jederzeit sehen.
:::

:::tip
Halten Sie die Anzahl der Reiter überschaubar. Drei bis fünf Reiter funktionieren für die meisten Kirchen gut. Zu viele Reiter können die Navigation für Ihre Mitglieder verwirrend machen.
:::

## Einstellungen für Mitgliederverzeichnis & Nachrichten {#member-directory--messaging-settings}

Der Eintrag **Mitgliederportal** im selben Bereich Mobil enthält die Einstellungen, die das Mitgliederverzeichnis und private Nachrichten im B1.church-Erlebnis steuern:

- **Genehmigungsgruppe für das Verzeichnis** -- Die Gruppe, die Aktualisierungen des Mitgliederverzeichnisses und [Anfragen zur Löschung von Konten](../profile/account-deletion.md) prüft, bevor sie wirksam werden.
- **Im Verzeichnis anzeigen** -- Wer das Mitgliederverzeichnis öffnen darf und wer darin aufgeführt wird: **Nur Administratoren**, **Mitglieder und höher** (der Standard), **Regelmäßige Besucher und höher** oder **Gäste und höher**. Personen, deren Mitgliedsstatus unter der gewählten Stufe liegt, sehen das Verzeichnis nicht und werden darin nicht aufgeführt. **Nur Administratoren** sperrt das Verzeichnis für alle außer Mitarbeitern mit der Berechtigung Personen > Anzeigen (ein Mitarbeiterstatus allein genügt nicht). Diese können das Verzeichnis immer öffnen und alle sehen, unabhängig von dieser Einstellung. Gäste werden nie aufgeführt, da sich jede Person, die sich online selbst registriert, zunächst als Gast anmeldet.
- **Sichtbarkeitseinstellung** -- Legt den gemeindeweiten Standard für Mitglieder fest, die noch keine eigene Einstellung gewählt haben. **Adresse**, **Telefonnummer** und **E-Mail** haben jeweils ein eigenes Dropdown-Menü mit denselben fünf Stufen, die überall dort verfügbar sind, wo Sichtbarkeit konfiguriert wird:
  - **Alle** -- sichtbar für jede Person, auch für anonyme Besucher
  - **Mitglieder** -- nur sichtbar für Personen mit einem Mitglieds- oder Mitarbeiterdatensatz
  - **Nur Gruppen** -- nur sichtbar für Personen, die mit dieser Person eine Gruppe teilen, sowie für Mitarbeiter
  - **Meine Gruppenleitungen und Mitarbeiter** -- nur sichtbar für Leitungen einer Gruppe, zu der diese Person gehört, sowie für Mitarbeiter
  - **Nur Mitarbeiter** -- nur sichtbar für Mitarbeiter (Personen mit dem Mitgliedsstatus Mitarbeiter oder mit der Berechtigung Personen > Anzeigen) sowie für die Person selbst

  "Mitarbeiter" bedeutet in diesen Stufen jede Person mit dem Mitgliedsstatus Mitarbeiter oder mit der Berechtigung Personen > Anzeigen. Änderungen an Gruppen wirken sofort: Wer einer Gruppe beitritt oder zur Gruppenleitung ernannt wird, sieht die passenden Angaben der Stufen **Nur Gruppen** bzw. **Meine Gruppenleitungen und Mitarbeiter** zu den Mitgliedern dieser Gruppe, ohne sich ab- und wieder anzumelden.

  Mitglieder können diese Standardwerte für ihren eigenen Datensatz über den Reiter **Datenschutz** ihres Profils in der B1.church-PWA überschreiben -- siehe [Ihr Profil bearbeiten](/docs/b1-church/getting-started/me-page).
- **Mindestalter für private Nachrichten** -- Eine Schutzeinstellung für Kinder. B1 öffnet **keine neue** private Nachrichtenunterhaltung, wenn eine der beiden Personen jünger als dieses Alter ist; maßgeblich ist das Geburtsdatum (ersatzweise die Haushaltsrolle, falls kein Geburtsdatum hinterlegt ist). Personen unter diesem Alter bleiben im Verzeichnis vollständig sichtbar -- blockiert wird nur die direkte Nachrichtenübermittlung, und zwar **in beide Richtungen**, für alle, auch für Mitarbeiter. Gruppenunterhaltungen und Nachrichten an die Eltern eines Kindes funktionieren weiterhin. Zur Auswahl stehen Aus, 13, 16 oder 18; der Standard ist **18**. Bestehende Unterhaltungen bleiben unberührt.

:::tip
Da die Prüfung des Mindestalters auf Geburtsdaten beruht, achten Sie darauf, dass für Kinder Ihrer Gemeinde Geburtsdaten hinterlegt sind. Diese Einstellung gehört zur gleichen Familie von Schutzfunktionen wie die [Sicherheitseinstellungen für den Check-in](../attendance/checkin-safety.md).
:::

### Anmeldeaufforderung auf dem Startbildschirm {#home-screen-sign-in-prompt}

Besucher, die den [Startbildschirm](/docs/b1-church/getting-started/navigating#home) der App öffnen, ohne sich anzumelden, sehen einen kurzen Hinweis -- standardmäßig *"Melden Sie sich an, um Ihre Gruppen, Spenden und mehr zu sehen."* -- neben einer Schaltfläche **Anmelden**. Mit den Einstellungen **Anmeldeaufforderung auf dem Startbildschirm** auf derselben Seite Mitgliederportal (`/mobile/b1-mobile`) können Sie sie ändern:

- **Anmeldeaufforderung auf dem Startbildschirm der App anzeigen** -- Schalten Sie diese Option aus, um sowohl den Hinweis als auch die Schaltfläche **Anmelden** auf dem Startbildschirm zu verbergen. Besucher können sich weiterhin über das Menü der App anmelden.
- **Text der Anmeldeaufforderung** -- Ersetzen Sie den Standardtext durch Ihre eigene Nachricht (bis zu 150 Zeichen). Lassen Sie das Feld leer, um den Standardtext zu verwenden. Dieses Feld ist deaktiviert, solange die Aufforderung ausgeschaltet ist.

Klicken Sie auf **Speichern**, um die Änderungen zu übernehmen. Eine Meldung **Gespeichert** bestätigt die Änderung. Beim Speichern werden die zwischengespeicherten Einstellungen der App aktualisiert, sodass die Änderung beim nächsten Laden des Startbildschirms sichtbar ist.

### Startbildschirm-Kacheln {#home-screen-tiles}

Reiter mit einem Foto (siehe **Bild** unter [Einen neuen Reiter hinzufügen](#adding-a-new-tab)) erscheinen auf dem [Startbildschirm](/docs/b1-church/getting-started/navigating#home) der App als Fotokacheln in einem Abschnitt, der mit dem Namen Ihrer Kirche überschrieben ist. Dazu gehört auch ein Reiter "Vers des Tages", wenn Sie ihm ein Foto geben. Reiter mit Foto erscheinen außerdem weiterhin in der Reiterleiste.

Die Einstellung **Startbildschirm-Kacheln** auf derselben Seite Mitgliederportal (`/mobile/b1-mobile`) steuert, wie diese Kacheln angeordnet sind. Wählen Sie ein **Layout**:

- **Raster** -- Zwei Kacheln pro Zeile (der Standard). Ist die Anzahl der Kacheln ungerade, nimmt die erste Kachel die volle Breite ein.
- **Scrollende Zeile** -- Eine Zeile mit Kacheln, die Mitglieder seitlich wischen.
- **Scrollend (automatisch)** -- Dieselbe seitliche Zeile, die sich aber auch von selbst bewegt und etwa alle vier Sekunden eine Kachel weiterschaltet und am Ende wieder von vorn beginnt. Die Bewegung pausiert, sobald ein Mitglied die Zeile berührt, darüber fährt oder sie per Tabulatortaste erreicht, und setzt einige Sekunden später wieder ein. Auf Geräten mit reduzierter Bewegung bleibt die Zeile stehen und funktioniert wie **Scrollende Zeile**.
- **Liste** -- Eine Liste mit einem kleinen Foto-Vorschaubild neben dem Namen jedes Reiters.

Klicken Sie auf **Speichern**, um die Änderungen zu übernehmen.

### Abschnitte auf dem Startbildschirm {#home-screen-sections}

Angemeldete Mitglieder sehen ihren eigenen Anwesenheitsverlauf und ihre eingereichten Formulare immer auf der [Me-Seite](/docs/b1-church/getting-started/me-page). Mit den Schaltern **Abschnitte auf dem Startbildschirm** auf derselben Seite Mitgliederportal (`/mobile/b1-mobile`) können Sie diese auch auf dem Startbildschirm anzeigen:

- **Meine Anwesenheit auf dem Startbildschirm anzeigen** -- Fügt einen Abschnitt **Meine Anwesenheit** hinzu, mit der Anzahl der Besuche in den letzten 90 Tagen, den beiden letzten Besuchen und einem Link **Verlauf** zur vollständigen Anwesenheitsliste.
- **Meine Formulare auf dem Startbildschirm anzeigen** -- Fügt einen Abschnitt **Meine Formulare** hinzu, mit den beiden letzten Formulareinsendungen des Mitglieds und einem Link **Alle Formulare**.

Beide Optionen sind standardmäßig ausgeschaltet. Ein Abschnitt erscheint nur für angemeldete Mitglieder, die mindestens einen Eintrag anzuzeigen haben. Klicken Sie auf **Speichern**, um die Änderungen zu übernehmen.

## Wo diese Reiter erscheinen

Die Reiter, die Sie hier konfigurieren, werden in der **B1.church-PWA** angezeigt, die Ihre Mitglieder von jeder Seite unter `https://ihrekirchenname.b1.church` installieren. Änderungen auf dieser Seite werden beim nächsten Öffnen der App durch ein Mitglied übernommen.

Auf dem Telefon zeigt die untere Reiterleiste **Startseite**, bis zu drei Ihrer Reiter und **Mehr**; am Computer zeigt die Kopfzeile bis zu fünf. Integrierte Bereiche (etwa Predigten, Spenden oder Gruppen) erhalten ihre Plätze zuerst, und Reiter vom Typ **Interne Seite** füllen die freien Plätze. Reiter vom Typ **Externe URL** und **Vers des Tages** erhalten nie einen Platz. Jeder Reiter, auch jene, die keinen Platz finden, wird auf der Seite **Mehr** der App aufgelistet. Siehe [Navigation in B1App](/docs/b1-church/getting-started/navigating), um zu erfahren, was Mitglieder sehen. (Reiter werden außerdem von der alten [nativen B1-Mobile-App](/docs/b1-mobile/) dargestellt, für Mitglieder, die sie noch nutzen. Diese App ist jedoch veraltet und wird nicht mehr aktualisiert.)

## Nächste Schritte

- [Kircheneinstellungen](./church-settings.md) -- Angaben und Branding Ihrer Kirche konfigurieren
- [Rollen und Berechtigungen](./roles-permissions.md) -- Zugriff für Ihr Team verwalten
