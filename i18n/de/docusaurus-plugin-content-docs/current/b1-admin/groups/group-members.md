---
title: "Gruppenmitglieder"
---

# Gruppenmitglieder

<div class="article-intro">

Sobald du eine Gruppe erstellt hast, ist der nächste Schritt das Hinzufügen von Mitgliedern. Auf der Seite Gruppendetails kannst du nach Personen suchen, sie zur Gruppe hinzufügen, Leiter zuweisen, Nachrichten senden und die Mitgliederliste exportieren. Das Verwalten der Gruppenmitgliedschaft ist wesentlich für die Koordination von Kleingruppen, Komitees und Klassen.

</div>

<div class="prereqs">
<h4>Bevor du beginnst</h4>

- Du brauchst mindestens eine Gruppe in B1 Admin eingerichtet. Siehe [Gruppen erstellen](creating-groups.md), falls du noch keine erstellt hast.
- Die Personen, die du hinzufügen möchtest, müssen bereits in deinem [Personen](../people/adding-people.md)-Verzeichnis vorhanden sein.

</div>

## Mitglieder zu einer Gruppe hinzufügen

1. Navigiere zur Seite **Gruppen** und klicke auf die Gruppe, die du verwalten möchtest.
2. Klicke auf die Registerkarte **Mitglieder**.
3. Gib im Suchfeld den Namen der Person ein, die du hinzufügen möchtest.
4. Klicke auf **Hinzufügen** neben dem Namen der Person in den Suchergebnissen.
5. Die Person erscheint jetzt in der Gruppenmitgliederliste.

:::tip
Lasse das Suchfeld leer und klicke auf **Suchen**, um durch dein gesamtes Verzeichnis zu blättern. Dies ist hilfreich, wenn du nicht sicher über die genaue Schreibweise eines Namens bist.
:::

## Gruppenmitglieder als Leiter bestimmen

Gruppenleiter haben besondere Privilegien -- sie können den [Gruppenkalender](group-calendar.md) bearbeiten, Veranstaltungen verwalten und bei der Koordination der Gruppe helfen.

1. Finde in der Gruppenmitgliederliste die Person, die du zum Leiter machen möchtest.
2. Klicke auf das **grüne Schlüsselsymbol** neben ihrem Namen.
3. Die Person ist jetzt als Gruppenleiter bestimmt.

Um den Leiterstatus zu entfernen, klicke erneut auf das grüne Schlüsselsymbol.

:::info
Jedes Gruppenmitglied kann den Gruppenkalender und Veranstaltungen anzeigen, aber nur Leiter können Kalenderereignisse hinzufügen oder bearbeiten.
:::

## Nachrichten an Gruppenmitglieder senden

Du kannst direkt von B1 Admin aus mit allen Mitgliedern einer Gruppe kommunizieren:

1. Suche auf der Seite Gruppendetails nach dem Nachrichten-Bereich.
2. Gib deine Nachricht in das Textfeld ein.
3. Klicke auf **Senden**.

Deine Nachricht wird an alle Mitglieder der Gruppe geliefert.

## E-Mails an Gruppenmitglieder senden

Du kannst formatierte E-Mails an alle Mitglieder einer Gruppe senden:

1. Klicke auf der Seite Gruppendetails auf das **E-Mail-Symbol**.
2. Das Dialogfeld E-Mail senden wird geöffnet und zeigt, wie viele Mitglieder die E-Mail erhalten und wie viele keine E-Mail-Adresse haben.
3. Wähle optional eine **E-Mail-Vorlage** aus der Dropdown-Liste, oder verfasse eine Nachricht von Grund auf. Klicke auf **Vorlagen verwalten**, um Vorlagen zu erstellen oder zu bearbeiten.
4. Gib eine **Betreffzeile** ein. Du kannst Zusammenführungsfelder einfügen, indem du auf die Feldchips klickst: `{{firstName}}`, `{{lastName}}`, `{{displayName}}`, `{{email}}`, `{{churchName}}`.
5. Verfasse den **E-Mail-Body** mit dem HTML-Editor. Die gleichen Zusammenführungsfelder sind hier verfügbar.
6. Klicke auf **Senden**.
7. Eine Zusammenfassung zeigt, wie viele E-Mails erfolgreich versendet wurden und wie viele Mitglieder übersprungen wurden (keine E-Mail vorhanden).

:::tip
Erstelle wiederverwendbare E-Mail-Vorlagen für wiederkehrende Kommunikation wie wöchentliche Updates, Veranstaltungsankündigungen oder Gebetsanfragen. Vorlagen sparen Zeit und gewährleisten konsistente Nachrichten.
:::

### Gruppen-E-Mail für deine Kirche aktivieren

Alle Kirchen auf B1 senden E-Mails von der gleichen Adresse, so dass sie einen Sendeverruf teilen. Um die E-Mails aller aus Spam-Ordnern zu halten, überprüft das ChurchApps-Team jede Kirche einmal, bevor sie Gruppen-E-Mail senden kann.

Wenn deine Kirche noch nicht überprüft wurde, zeigt das Dialogfeld E-Mail senden **Gruppen-E-Mail benötigt eine schnelle Überprüfung** anstelle des Nachrichtenshreditors:

1. Klicke auf **Überprüfung anfordern**. Das ChurchApps-Support-Team wird benachrichtigt.
2. Das Dialogfeld ändert sich zu **Überprüfung angefordert**. Du kannst es schließen.
3. Gruppen-E-Mail wird normalerweise innerhalb eines Werktags aktiviert. Öffne das Dialogfeld E-Mail senden später, um deine Nachricht zu senden.

Bis deine Kirche genehmigt ist, sendet B1 auch keine [Formularfolge-E-Mails](../forms/creating-forms.md#sending-a-follow-up-email) oder den Schritt **E-Mail senden** in [Workflows](../serving/workflows.md).

:::info Sendegrenzen
Nach der Genehmigung kann eine Kirche bis zu 150 kircheneigene E-Mails pro Tag versenden. Das Limit wächst, wenn deine Kirche eine saubere Sendevergangenheit aufbaut, bis zu 2.000 pro Tag. Wenn kürzliche Nachrichten abgesprungen sind oder als Spam markiert wurden, wird Gruppen-E-Mail angehalten und das Dialogfeld bietet dir an, den Support zu kontaktieren. Wenn ein Versand dein tägliches Limit überschreiten würde, versendet B1 ihn nicht und zeigt einen Fehler.
:::

## Gruppendaten exportieren

Um die Gruppenmitgliederliste als Datei herunterzuladen:

1. Klicke auf der Seite Gruppendetails auf das **Download-Symbol**.
2. Eine CSV-Datei mit den Mitgliederinformationen der Gruppe wird auf deinen Computer heruntergeladen.

Um stattdessen ein Anmeldeblatt für eine Klasse zu drucken, verwende **Klassenliste drucken** -- siehe [Klassenliste drucken](../attendance/recording-attendance.md#printing-a-roll-sheet).

Ein CSV-Export ist nützlich zum Importieren von Daten in andere Tools oder zum Führen von Offline-Aufzeichnungen. Für weitere Export-Optionen siehe [Daten exportieren](../people/exporting-data.md).

## Push-Benachrichtigungen an Gruppenmitglieder senden

Du kannst eine Push-Benachrichtigung direkt an alle Gruppenmitglieder senden, die die B1.church-App auf ihrem Gerät mit aktivierten Push-Benachrichtigungen haben.

1. Klicke auf der Seite Gruppendetails auf das **Glockensymbol** in der Header-Symbolleiste (neben den E-Mail- und SMS-Symbolen).
2. Ein Dialogfeld wird geöffnet, das zeigt, wie viele deiner Gruppenmitglieder Push aktiviert haben.
3. Fülle die Benachrichtigungsdetails:
   - **Titel** *(erforderlich)* -- Eine kurze Zusammenfassung, bis zu 80 Zeichen.
   - **Nachricht** *(erforderlich)* -- Der Benachrichtigungstext, bis zu 240 Zeichen.
   - **Link oder Flyer-URL öffnen** *(optional)* -- Ein relativer App-Pfad (z. B. `/mobile/groups`) oder eine vollständige `https://`-URL, die die Benachrichtigung öffnet, wenn sie angetippt wird.
   - **Bild-URL** *(optional)* -- Eine `https://`-URL zu einem Bild, das neben der Benachrichtigung auf unterstützten Geräten angezeigt wird.
4. Eine Live-Vorschau zeigt, wie die Benachrichtigung auf dem Gerät angezeigt wird.
5. Klicke auf **Benachrichtigung senden**.

:::info
Push-Benachrichtigungen werden nur an Gruppenmitglieder geliefert, die die B1.church-PWA installiert haben und Push-Benachrichtigungen nicht deaktiviert haben. Mitglieder ohne registriertes Push-Gerät oder mit deaktiviertem Push werden als übersprungen gezählt, und die Sendezusammenfassung zeigt, wie viele erreicht wurden versus übersprungen.
:::

:::tip
Nach dem Versand zeigt das Dialogfeld, wie viele Benachrichtigungen erfolgreich eingereiht wurden. Wenn die meisten Mitglieder als übersprungen angezeigt werden, erinnere sie daran, ihre B1.church-Website zu besuchen, sie als Home-Screen-App zu installieren und Benachrichtigungen zu genehmigen, wenn sie aufgefordert werden.
:::

## Mitglieder entfernen

Um jemanden aus einer Gruppe zu entfernen, finde seinen Namen in der Mitgliederliste und klicke auf die Schaltfläche **Entfernen** neben seinem Eintrag.

:::info
Das Entfernen einer Person aus einer Gruppe löscht sie nicht aus deinem Kirchenverzeichnis. Sie werden weiterhin im Bereich [Personen](../people/adding-people.md) angezeigt und können jederzeit erneut zur Gruppe hinzugefügt werden.
:::
