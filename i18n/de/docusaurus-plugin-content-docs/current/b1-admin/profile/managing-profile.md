---
title: "Ihr Profil verwalten"
description: "Aktualisieren Sie Ihr ChurchApps-Konto in B1 Admin: Bearbeiten Sie Ihren Namen, Ihre E-Mail-Adresse und Ihr Passwort, aktivieren Sie die zweistufige Anmeldung, wählen Sie ein Design oder löschen Sie Ihr Konto."
---

# Ihr Profil verwalten

<div class="article-intro">

Auf der Profilseite bearbeiten Sie Ihre persönlichen Kontoeinstellungen. Ihr Profil wird in allen ChurchApps-Produkten geteilt, daher wirken sich Änderungen hier überall aus, wo Sie ChurchApps nutzen.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Sie müssen bei Ihrem ChurchApps-Konto angemeldet sein
- Halten Sie Ihre neue E-Mail-Adresse oder Ihr neues Passwort bereit, falls Sie diese ändern möchten

</div>

## Ihr Profil öffnen {#opening-your-profile}

Klicken Sie oben rechts in B1 Admin auf Ihr Profilbild und wählen Sie **Profil bearbeiten**. Die Profilseite zeigt links Ihren Namen und Ihre E-Mail-Adresse, rechts die Abschnitte **Verknüpfte Konten**, **Zweistufige Anmeldung** und **Kontolöschung**.

## Profilangaben {#profile-information}

Die Profilseite zeigt links Ihren Namen und Ihre E-Mail-Adresse, darunter befindet sich eine Schaltfläche **Bearbeiten**. Klicken Sie auf **Bearbeiten**, um das Formular **Konto bearbeiten** zu öffnen, das Ihre grundlegenden Kontodaten enthält:

1. **E-Mail** -- Ihre E-Mail-Adresse für die Anmeldung und den Empfang von Benachrichtigungen.
2. **Vorname** und **Nachname** -- Ihr Anzeigename in ChurchApps.
3. **Aktuelles Passwort**, **Neues Passwort** und **Passwort bestätigen** -- Füllen Sie diese Felder nur aus, wenn Sie Ihr Passwort ändern möchten; lassen Sie sie leer, um das bisherige beizubehalten.

Um Ihre Angaben zu aktualisieren, bearbeiten Sie die Felder und klicken Sie auf **Änderungen speichern**. Eine Meldung **Änderungen gespeichert.** bestätigt die Aktualisierung. Klicken Sie auf **Abbrechen** (oder auf den Link **Zurück zu** mit Ihrem Namen), um zum Profil zurückzukehren, ohne zu speichern. Klicken Sie auf das Augensymbol in einem Passwortfeld, um Ihre Eingabe ein- oder auszublenden.

## Ihr Passwort ändern {#changing-your-password}

1. Klicken Sie auf der Profilseite auf **Bearbeiten**.
2. Geben Sie Ihr **Aktuelles Passwort** ein.
3. Geben Sie Ihr neues Passwort im Feld **Neues Passwort** ein.
4. Wiederholen Sie es im Feld **Passwort bestätigen**.
5. Klicken Sie auf **Änderungen speichern**.

:::info
Ihr Passwort muss mindestens 8 Zeichen lang sein. Achten Sie darauf, dass Passwort und Bestätigung genau übereinstimmen. Um das Passwort zu ändern, müssen Sie Ihr aktuelles Passwort bestätigen -- wenn Sie es nicht kennen, nutzen Sie stattdessen den Link **Passwort vergessen** auf der Anmeldeseite.
:::

## Verknüpfte Konten {#linked-accounts}

Der Abschnitt **Verknüpfte Konten** zeigt die externen Dienste, die Sie mit Ihrem ChurchApps-Konto verbinden können. Derzeit ist das **PraiseCharts**, mit dem Sie Lieder finden und Akkorde sowie Notenblätter für [Lieder](../serving/songs.md) im Dienst herunterladen können. Der Status lautet **Verknüpft** oder **Nicht verknüpft**:

- Klicken Sie auf **Verknüpfen** und melden Sie sich im sich öffnenden Fenster bei PraiseCharts an, um Ihr Konto zu verbinden.
- Klicken Sie auf **Registrieren**, um zuerst ein PraiseCharts-Konto zu erstellen.
- Klicken Sie auf **Trennen**, um die Verbindung zu lösen.

## Zweistufige Anmeldung {#two-factor-sign-in}

Die zweistufige Anmeldung fügt dem Anmelden einen zweiten Schritt hinzu: Nach Ihrem Passwort (oder der Anmeldung über Google, Microsoft oder einen E-Mail-Link) geben Sie zusätzlich einen 6-stelligen Code aus einer Authenticator-App auf Ihrem Telefon ein, etwa Google Authenticator, Microsoft Authenticator, 1Password oder Authy. Sie ist optional und standardmäßig ausgeschaltet. Ist sie einmal aktiviert, gilt sie für jede ChurchApps-Anmeldung, die Ihr Konto verwendet -- B1 Admin, die B1.church-Website und -App Ihrer Gemeinde, B1 Church Checkin, Lessons.church, FreePlay und die übrigen Angebote.

### Einschalten {#turning-it-on}

1. Suchen Sie auf der Profilseite den Abschnitt **Zweistufige Anmeldung** und klicken Sie auf **Einschalten**.
2. Scannen Sie den QR-Code mit Ihrer Authenticator-App. Falls Sie ihn nicht scannen können, geben Sie den Schlüssel, der unter **Scannen nicht möglich? Diesen Schlüssel eingeben:** angezeigt wird, stattdessen in die App ein.
3. Geben Sie den **6-stelligen Code** ein, den Ihre App anzeigt, und klicken Sie auf **Prüfen**.
4. B1 Admin zeigt zehn **Sicherungscodes**. Jeder davon meldet Sie einmal an, falls Sie Ihr Telefon verlieren. Klicken Sie auf **Kopieren** oder schreiben Sie die Codes auf, bewahren Sie sie an einem sicheren Ort auf und klicken Sie dann auf **Ich habe sie gespeichert**.

:::warning
Die Sicherungscodes werden nur einmal angezeigt. Wenn Sie Ihr Telefon verlieren und keine Sicherungscodes mehr haben, muss ein Serveradministrator von ChurchApps die zweistufige Anmeldung für Sie ausschalten, nachdem er Ihre Identität bestätigt hat.
:::

Ist die zweistufige Anmeldung aktiv, lautet der Abschnitt **Ein** und zeigt an, wie viele Sicherungscodes Sie noch haben.

### Mit einem Code anmelden {#signing-in-with-a-code}

Nachdem Sie Ihr Passwort eingegeben haben, fragt die Anmeldeseite nach einem Code. Geben Sie den 6-stelligen Code aus Ihrer Authenticator-App oder einen Ihrer Sicherungscodes ein und senden Sie ihn ab. Jeder Sicherungscode funktioniert nur einmal. Ist der Code falsch, sehen Sie die Meldung „Dieser Code hat nicht funktioniert. Bitte versuchen Sie es erneut.“ Nach zu vielen falschen Codes werden Anmeldungen für Ihr Konto für eine Weile angehalten.

Wenn Sie auf einem Gerät, auf dem Sie bereits angemeldet waren, angemeldet bleiben, wird nicht erneut nach einem Code gefragt; das passiert nur bei einer neuen Anmeldung.

### Ausschalten {#turning-it-off}

1. Klicken Sie im Abschnitt **Zweistufige Anmeldung** auf **Ausschalten**.
2. Geben Sie einen aktuellen Code aus Ihrer Authenticator-App oder einen Sicherungscode ein.
3. Klicken Sie auf **Prüfen**.

:::info
Die zweistufige Anmeldung lässt sich bei Demokonten nicht einrichten, daher ist der Abschnitt dort ausgeblendet.
:::

## Designeinstellungen {#theme-preferences}

In B1 Admin wählen Sie ein Farbdesign sowie den hellen oder dunklen Anzeigemodus:

1. Klicken Sie oben rechts in B1 Admin auf Ihr Profilbild, um das Benutzermenü zu öffnen.
2. Wählen Sie unter **Designeinstellungen** ein Design:
   - **Standard** -- Das aktuelle Erscheinungsbild von B1 Admin: Panels mit Rahmen auf einer klaren Fläche. Neue Benutzer sehen dieses Design, bis sie ein anderes wählen.
   - **Klassisch** -- Das frühere Erscheinungsbild von B1 Admin mit einem farbigen Seitenbanner, Karten mit Schatten und grauem Hintergrund. Haben Sie B1 Admin auf diesem Gerät vor dem neuen Erscheinungsbild genutzt und nie ein Design gewählt, bleiben Sie bei Klassisch.
   - **Benutzerdefiniert** -- Das Standard-Erscheinungsbild, das mit der Farbe Ihrer Gemeinde aufgebaut wird. Es verwendet die Primärfarbe für den hellen Modus unter **Mobile > App-Design** oder, falls keine App-Farbe festgelegt ist, die Primärfarbe Ihrer Website, sodass B1 Admin zur App Ihrer Mitglieder passt.
3. Wählen Sie unter den Designs **Heller Modus** oder **Dunkler Modus**.
4. Die Oberfläche aktualisiert sich sofort entsprechend Ihrer Auswahl.

Ihre Auswahl wird auf diesem Gerät und in diesem Browser gespeichert.

## Kontolöschung {#account-deletion}

Im Abschnitt **Kontolöschung** der Profilseite finden Sie die Option, Ihr Konto zu löschen.

- Hat Ihre Gemeinde **keine** Verzeichnis-Genehmigungsgruppe eingerichtet, warnt der Abschnitt: *„Vorsicht, diese Aktionen sind endgültig“*. Klicken Sie auf **Mein Konto löschen** und bestätigen Sie. Ihr Konto und die zugehörigen Daten werden sofort entfernt, und Sie werden abgemeldet. Dies kann nicht rückgängig gemacht werden.
- Hat Ihre Gemeinde **eine** Verzeichnis-Genehmigungsgruppe eingerichtet, teilt der Abschnitt mit, dass Ihre Gemeinde Löschanfragen prüft. Klicken Sie auf **Mein Konto löschen** und dann auf **Anfrage senden**; die Anfrage geht stattdessen zur Prüfung an diese Gruppe. Die Schaltfläche ist deaktiviert, solange die Anfrage aussteht, und Sie werden benachrichtigt, sobald Ihre Gemeinde sie genehmigt oder ablehnt. Was danach geschieht, lesen Sie unter [Anfragen zur Kontolöschung prüfen](./account-deletion.md).

:::warning
Die Löschung eines Kontos -- ob sofort oder nach Genehmigung durch Ihre Gemeinde -- ist endgültig und kann nicht rückgängig gemacht werden.
:::

:::info
Wenn Sie der einzige **Domain-Administrator** Ihrer Gemeinde sind, löscht B1 Ihr Konto nicht. Es erscheint die Meldung: „Sie sind der einzige Domain-Administrator für *Gemeinde*. Machen Sie vor dem Löschen Ihres Kontos eine andere Person zum Domain-Administrator.“ Fügen Sie zuerst einen weiteren Benutzer zu **Domain-Administratoren** hinzu. Details zur Verwaltung von Administratorrollen finden Sie unter [Rollen & Berechtigungen](../settings/roles-permissions.md).
:::

:::info
Im Demomodus ist die Bearbeitung des Profils deaktiviert. Wenn Sie ein Demokonto verwenden, können Sie Ihre Profileinstellungen nicht ändern.
:::

## Nächste Schritte {#next-steps}

- [Geräte verwalten](./devices.md) -- Ihre verbundenen ChurchApps-Bildschirme für ChurchAppsPlayer und FreePlay ansehen und verwalten
