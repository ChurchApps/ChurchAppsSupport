---
title: "Gruppenmitglieder"
---

# Gruppenmitglieder

<div class="article-intro">

Nachdem Sie eine Gruppe erstellt haben, besteht der nächste Schritt darin, Mitglieder hinzuzufügen. Von der Detailseite einer Gruppe aus können Sie Personen suchen, sie zur Gruppe hinzufügen, Leiter zuweisen, Nachrichten senden und die Mitgliederliste exportieren. Die Verwaltung der Gruppenmitgliedschaft ist essentiell für die Koordination von Kleingruppen, Komitees und Klassen.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Sie benötigen mindestens eine in B1 Admin eingerichtete Gruppe. Siehe [Creating Groups](creating-groups.md), falls Sie noch keine erstellt haben.
- Die Personen, die Sie hinzufügen möchten, sollten bereits in Ihrem [People](../people/adding-people.md)-Verzeichnis sein. Wenn jemand nicht vorhanden ist, können Sie ihn von der Mitgliedersuche aus erstellen (siehe unten).

</div>

## Mitglieder zu einer Gruppe hinzufügen

1. Wählen Sie im [Jump-Menü](../introduction.md#getting-around-with-the-jump-menu) **People > Groups** (Personen > Gruppen) und klicken Sie auf die Gruppe, die Sie verwalten möchten.
2. Klicken Sie auf die Registerkarte **Members** (Mitglieder).
3. Geben Sie in das Suchfeld den Namen der Person ein, die Sie hinzufügen möchten.
4. Klicken Sie auf **Add** (Hinzufügen) neben dem Namen der Person in den Suchergebnissen.
5. Die Person wird jetzt in der Gruppenmitgliederliste angezeigt.

:::tip
Lassen Sie das Suchfeld leer und klicken Sie auf **Search** (Suchen), um durch Ihr gesamtes Verzeichnis zu blättern. Dies ist hilfreich, wenn Sie sich nicht sicher über die genaue Schreibweise eines Namens sind.
:::

### Hinzufügen von jemandem, der noch nicht in B1 ist

Wenn Ihre Suche niemanden findet, zeigt die Suche **No records found** (Keine Datensätze gefunden) mit einem Link **Add New Person** (Neue Person hinzufügen). Klicken Sie darauf, geben Sie den Vor- und Nachnamen der Person und (optional) ihre E-Mail ein, und klicken Sie auf **Add** (Hinzufügen). Die neue Person wird in Ihrem Personenverzeichnis erstellt und in einem Schritt zur Gruppe hinzugefügt – Sie müssen nicht danach suchen.

## Designieren von Gruppenleitern

Gruppenleiter haben spezielle Privilegien – sie können den [Gruppenkalender](group-calendar.md) bearbeiten, Veranstaltungen verwalten und die Gruppe koordinieren.

1. Suchen Sie in der Gruppenmitgliederliste die Person, die Sie zum Leiter machen möchten.
2. Klicken Sie auf das **grüne Schlüsselsymbol** neben ihrem Namen.
3. Die Person ist jetzt als Gruppenleiter ausgewiesen.

Um den Leiterstatus zu entfernen, klicken Sie erneut auf das grüne Schlüsselsymbol.

:::info
Jedes Gruppenmitglied kann den Gruppenkalender und Veranstaltungen anzeigen, aber nur Leiter können Kalenderereignisse hinzufügen oder bearbeiten.
:::

## Senden von Nachrichten an Gruppenmitglieder

Sie können direkt von B1 Admin aus mit allen Mitgliedern einer Gruppe kommunizieren:

1. Suchen Sie von der Gruppenseite nach dem Nachrichtenbereich.
2. Geben Sie Ihre Nachricht in das Textfeld ein.
3. Klicken Sie auf **Send** (Senden).

Ihre Nachricht wird an alle Mitglieder der Gruppe zugestellt.

## Versenden von E-Mails an Gruppenmitglieder

Sie können formatierte E-Mails an alle Mitglieder einer Gruppe versenden:

1. Klicken Sie von der Gruppenseite aus auf das **E-Mail-Symbol**.
2. Das Dialog-Fenster "Send Email" (E-Mail senden) wird geöffnet und zeigt, wie viele Mitglieder die E-Mail erhalten und wie viele keine E-Mail-Adresse in der Datei haben.
3. Wählen Sie optional eine **E-Mail-Vorlage** aus dem Dropdown aus, oder verfassen Sie eine Nachricht von Grund auf. Klicken Sie auf **Manage Templates** (Vorlagen verwalten), um Vorlagen zu erstellen oder zu bearbeiten.
4. Geben Sie eine **Betreffzeile** ein. Sie können Zusammenführungsfelder einfügen, indem Sie auf die Feldchips klicken: `{{firstName}}`, `{{lastName}}`, `{{displayName}}`, `{{email}}`, `{{churchName}}`.
5. Verfassen Sie den **E-Mail-Text** mit dem HTML-Editor. Die gleichen Zusammenführungsfelder sind hier verfügbar.
6. Klicken Sie auf **Send** (Senden).
7. Eine Zusammenfassung zeigt, wie viele E-Mails erfolgreich versendet wurden und wie viele Mitglieder übersprungen wurden (keine E-Mail in der Datei).

:::tip
Erstellen Sie wiederverwendbare E-Mail-Vorlagen für wiederkehrende Kommunikation wie wöchentliche Updates, Veranstaltungsankündigungen oder Gebetsanfragen. Vorlagen sparen Zeit und stellen eine konsistente Nachrichtengestaltung sicher.
:::

### Aktivieren von Gruppen-E-Mail für Ihre Kirche

Alle Kirchen bei B1 senden E-Mail von derselben Adresse, daher teilen sie einen Sendeinputruf. Um die E-Mails aller aus Spam-Ordnern zu halten, überprüft das ChurchApps-Team jede Kirche einmal, bevor sie Gruppen-E-Mail versenden kann.

Wenn Ihre Kirche noch nicht überprüft wurde, zeigt das Dialog-Fenster "Send Email" (E-Mail senden) statt des Nachrichtmeditors **Group email needs a quick review** (Gruppen-E-Mail benötigt eine schnelle Überprüfung):

1. Klicken Sie auf **Request review** (Überprüfung anfordern). Das ChurchApps-Support-Team wird benachrichtigt.
2. Das Dialog-Fenster ändert sich zu **Review requested** (Überprüfung angefordert). Sie können es schließen.
3. Gruppen-E-Mail wird normalerweise innerhalb eines Geschäftstages aktiviert. Öffnen Sie das Dialog-Fenster "Send Email" danach erneut, um Ihre Nachricht zu versenden.

Bis Ihre Kirche genehmigt ist, sendet B1 auch keine [Formular-Follow-up-E-Mails](../forms/creating-forms.md#sending-a-follow-up-email) oder den Schritt **Send email** (E-Mail senden) in [Workflows](../serving/workflows.md).

:::info Sendegrenzen
Nach der Genehmigung kann eine Kirche bis zu 150 von der Kirche verfasste E-Mails pro Tag versenden. Das Limit wächst, wenn Ihre Kirche eine saubere Versendungshistorie aufbaut, bis zu 2.000 pro Tag. Wenn aktuelle Nachrichten zurückgesprungen oder als Spam markiert wurden, pausiert Gruppen-E-Mail und das Dialog-Fenster fordert Sie auf, Support zu kontaktieren. Wenn ein Versand Ihr tägliches Limit überschreitet, sendet B1 es nicht und zeigt einen Fehler.
:::

## Textnachrichten an Gruppenmitglieder

Sobald Ihre Kirche einen [Texting-Provider](../settings/church-settings.md#texting) verbunden hat, wird ein Textsymbol (**Text this group** (Diese Gruppe texten)) in der Kopfzeile der Gruppe angezeigt.

1. Klicken Sie von der Gruppenseite aus auf das **Textsymbol**.
2. Das Dialog-Fenster zeigt, wie viele Mitglieder die Textnachricht erhalten. Mitglieder ohne Mobiltelefonnummer in der Datei oder die sich abgemeldet haben, werden übersprungen.
3. Geben Sie Ihre Nachricht ein. Um sie zu personalisieren, klicken Sie auf einen Platzhalter-Chip unter dem Nachrichtenfeld – **First Name** (Vorname), **Last Name** (Nachname), **Display Name** (Anzeigename) oder **Church Name** (Kirchenname) – um ihn an Ihrer Cursorposition einzufügen. Jeder Platzhalter wird mit den Einzelheiten des Empfängers ausgefüllt, wenn die Textnachricht versendet wird.
4. Klicken Sie auf **Send** (Senden).

Siehe [Personalizing Texts with Merge Fields](../settings/church-settings.md#personalizing-texts-with-merge-fields) für weitere Details.

## Exportieren von Gruppendaten

So laden Sie die Gruppenmitgliederliste als Datei herunter:

1. Klicken Sie von der Gruppenseite aus auf das **Download-Symbol**.
2. Eine CSV-Datei mit den Gruppenmitgliedinformationen wird auf Ihren Computer heruntergeladen.

Ein CSV-Export ist nützlich zum Importieren von Daten in andere Tools oder zum Führen von Offline-Datensätzen. Weitere Exportoptionen finden Sie unter [Exporting Data](../people/exporting-data.md).

## Mitgliederliste drucken {#printing-the-member-list}

Klicken Sie auf das Symbol **Print Roll Sheet** (Anwesenheitsblatt drucken, Drucker) über der Mitgliederliste und wählen Sie ein Layout. Die Seite öffnet sich in einem neuen Tab, und der Druckdialog Ihres Browsers erscheint automatisch.

- **Anwesenheitsblatt** – eine undatierte Klassenliste mit Kästchen für **Anwesend** und **Abwesend**, die Lehrer von Hand markieren können. Siehe [Printing a Roll Sheet](../attendance/recording-attendance.md#printing-a-roll-sheet).
- **Kontaktliste** – eine Kontaktliste für die Gruppe, mit dem heutigen Datum sowie dem Namen Ihrer Kirche und dem Gruppennamen in der Kopfzeile. Jedes Mitglied hat eine Zeile mit **Name**, **Telefon**, **E-Mail** und **Adresse**. Leiter werden zuerst aufgeführt und mit **Leiter** gekennzeichnet, danach alle anderen nach Nachnamen. Als Telefonnummer wird die Mobilnummer des Mitglieds angezeigt, oder die private bzw. geschäftliche Nummer, falls keine Mobilnummer vorhanden ist. Die Kontaktdaten bleiben leer bei allen, die sich dagegen entschieden haben.

:::warning
Eine Kontaktliste enthält die persönlichen Kontaktdaten von Mitgliedern. Geben Sie ausgedruckte Exemplare nur an die Leiter der Gruppe und andere Personen weiter, die sie benötigen.
:::

## Senden von Push-Benachrichtigungen an Gruppenmitglieder

Sie können eine Push-Benachrichtigung direkt an alle Gruppenmitglieder senden, die die B1.church-App auf ihrem Gerät installiert haben und Push-Benachrichtigungen aktiviert haben.

1. Klicken Sie von der Gruppenseite aus auf das **Glockensymbol** in der Symbolleiste (neben dem E-Mail- und Textsymbol – das Textsymbol wird angezeigt, sobald ein [Texting-Provider](../settings/church-settings.md#texting) verbunden ist).
2. Ein Dialog-Fenster wird geöffnet und zeigt, wie viele Ihrer Gruppenmitglieder Push aktiviert haben.
3. Füllen Sie die Benachrichtigungsdetails aus:
   - **Title** (Titel) *(erforderlich)* -- Eine kurze Zusammenfassung bis zu 80 Zeichen.
   - **Message** (Nachricht) *(erforderlich)* -- Der Benachrichtigungstext bis zu 240 Zeichen.
   - **Open link or flyer URL** (Link oder Flyer-URL öffnen) *(optional)* -- Ein relativer App-Pfad (z. B. `/mobile/groups`) oder eine vollständige `https://`-URL, die die Benachrichtigung beim Antippen öffnet.
   - **Image URL** (Bild-URL) *(optional)* -- Eine `https://`-URL zu einem Bild, das auf unterstützten Geräten neben der Benachrichtigung angezeigt wird.
4. Eine Live-Vorschau zeigt, wie die Benachrichtigung auf dem Gerät angezeigt wird.
5. Klicken Sie auf **Send Notification** (Benachrichtigung senden).

:::info
Push-Benachrichtigungen werden nur an Gruppenmitglieder zugestellt, die die B1.church PWA installiert haben und Push-Benachrichtigungen nicht deaktiviert haben. Mitglieder ohne registriertes Push-Gerät oder mit ausgeschaltetem Push werden als übersprungen gezählt, und die Versend-Zusammenfassung zeigt, wie viele erreicht wurden im Vergleich zu übersprungen.
:::

:::tip
Nach dem Versenden zeigt das Dialog-Fenster an, wie viele Benachrichtigungen erfolgreich in die Warteschlange eingereiht wurden. Wenn die meisten Mitglieder als übersprungen angezeigt werden, erinnern Sie sie daran, ihre B1.church-Website zu besuchen, sie als Home-Screen-App zu installieren und Benachrichtigungen zuzulassen, wenn sie dazu aufgefordert werden.
:::

## Entfernen von Mitgliedern

Um jemanden aus einer Gruppe zu entfernen, suchen Sie seinen Namen in der Mitgliederliste und klicken Sie auf die Schaltfläche **Entfernen** neben seinem Eintrag.

:::info
Das Entfernen einer Person aus einer Gruppe löscht sie nicht aus Ihrem Kirchenverzeichnis. Sie werden immer noch im Bereich [People](../people/adding-people.md) angezeigt und können jederzeit erneut zur Gruppe hinzugefügt werden.
:::
