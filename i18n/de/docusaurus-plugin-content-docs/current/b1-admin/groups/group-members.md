---
title: "Gruppenmitglieder"
---

# Gruppenmitglieder

<div class="article-intro">

Nachdem Sie eine Gruppe erstellt haben, besteht der nächste Schritt darin, Mitglieder hinzuzufügen. Auf der Detailseite einer Gruppe können Sie nach Personen suchen, sie zur Gruppe hinzufügen, Leiter zuweisen, Nachrichten senden und die Mitgliederliste exportieren. Die Verwaltung der Gruppenmitgliedschaft ist für die Koordination von Kleingruppen, Ausschüssen und Klassen unerlässlich.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Sie benötigen mindestens eine Gruppe, die in B1 Admin eingerichtet ist. Siehe [Gruppen erstellen](creating-groups.md), wenn Sie noch keine erstellt haben.
- Die Personen, die Sie hinzufügen möchten, müssen bereits in Ihrem [Personen](../people/adding-people.md)-Verzeichnis vorhanden sein.

</div>

## Mitglieder zu einer Gruppe hinzufügen

1. Navigieren Sie zur Seite **Gruppen** und klicken Sie auf die Gruppe, die Sie verwalten möchten.
2. Klicken Sie auf die Registerkarte **Mitglieder**.
3. Geben Sie im Suchfeld den Namen der Person ein, die Sie hinzufügen möchten.
4. Klicken Sie auf **Hinzufügen** neben dem Namen der Person in den Suchergebnissen.
5. Die Person erscheint nun in der Liste der Gruppenmitglieder.

:::tip
Lassen Sie das Suchfeld leer und klicken Sie auf **Suchen**, um Ihr gesamtes Verzeichnis zu durchsuchen. Dies ist hilfreich, wenn Sie sich bei der genauen Schreibweise des Namens einer Person nicht sicher sind.
:::

## Gruppenleiter designieren

Gruppenleiter haben besondere Rechte – sie können den [Gruppenkalender](group-calendar.md) bearbeiten, Veranstaltungen verwalten und bei der Koordination der Gruppe helfen.

1. Suchen Sie in der Liste der Gruppenmitglieder die Person, die Sie zum Leiter machen möchten.
2. Klicken Sie auf das **grüne Schlüsselsymbol** neben ihrem Namen.
3. Die Person ist nun als Gruppenleiter bestimmt.

Um den Leiterstatus zu entfernen, klicken Sie erneut auf das grüne Schlüsselsymbol.

:::info
Jedes Gruppenmitglied kann den Gruppenkalender und die Veranstaltungen anzeigen, aber nur Leiter können Kalenderveranstaltungen hinzufügen oder bearbeiten.
:::

## Nachrichten an Gruppenmitglieder senden

Sie können direkt aus B1 Admin mit allen Mitgliedern einer Gruppe kommunizieren:

1. Suchen Sie auf der Detailseite der Gruppe nach dem Nachrichtenbereich.
2. Geben Sie Ihre Nachricht in das Textfeld ein.
3. Klicken Sie auf **Senden**.

Ihre Nachricht wird an alle Mitglieder der Gruppe zugestellt.

## E-Mails an Gruppenmitglieder senden

Sie können formatierte E-Mails an alle Mitglieder einer Gruppe senden:

1. Klicken Sie auf der Detailseite der Gruppe auf das **E-Mail-Symbol**.
2. Das Dialogfeld „E-Mail senden" wird geöffnet und zeigt, wie viele Mitglieder die E-Mail erhalten und wie viele keine E-Mail-Adresse gespeichert haben.
3. Wählen Sie optional eine **E-Mail-Vorlage** aus der Dropdown-Liste aus, oder verfassen Sie eine Nachricht von Grund auf neu. Klicken Sie auf **Vorlagen verwalten**, um Vorlagen zu erstellen oder zu bearbeiten.
4. Geben Sie eine **Betreffzeile** ein. Sie können Zusammenführungsfelder einfügen, indem Sie auf die Feldchips klicken: `{{firstName}}`, `{{lastName}}`, `{{displayName}}`, `{{email}}`, `{{churchName}}`.
5. Verfassen Sie den **E-Mail-Text** mit dem HTML-Editor. Die gleichen Zusammenführungsfelder sind auch hier verfügbar.
6. Klicken Sie auf **Senden**.
7. Eine Zusammenfassung zeigt, wie viele E-Mails erfolgreich versendet wurden und wie viele Mitglieder übersprungen wurden (keine E-Mail gespeichert).

:::tip
Erstellen Sie wiederverwendbare E-Mail-Vorlagen für wiederkehrende Kommunikationen wie wöchentliche Updates, Veranstaltungsankündigungen oder Gebetsanfragen. Vorlagen sparen Zeit und gewährleisten konsistente Nachrichten.
:::

## Daten exportieren

Um die Liste der Gruppenmitglieder als Datei herunterzuladen:

1. Klicken Sie auf der Detailseite der Gruppe auf das **Download-Symbol**.
2. Eine CSV-Datei mit den Mitgliedsinformationen der Gruppe wird auf Ihren Computer heruntergeladen.

Dies ist nützlich zum Erstellen von gedruckten Namenslisten, zum Importieren von Daten in andere Tools oder zum Führen von Offline-Aufzeichnungen. Weitere Exportoptionen finden Sie unter [Daten exportieren](../people/exporting-data.md).

## Benachrichtigungen an Gruppenmitglieder senden

Sie können eine Benachrichtigung direkt an alle Gruppenmitglieder senden, die die B1.church-App auf ihrem Gerät mit aktivierten Push-Benachrichtigungen installiert haben.

1. Klicken Sie auf der Detailseite der Gruppe auf das **Glocken-Symbol** in der Kopfzeilensymbolleiste (neben den E-Mail- und SMS-Symbolen).
2. Ein Dialogfeld wird geöffnet, das zeigt, wie viele der Gruppenmitglieder Push aktiviert haben.
3. Füllen Sie die Benachrichtigungsdetails aus:
   - **Titel** *(erforderlich)* – Eine kurze Zusammenfassung mit bis zu 80 Zeichen.
   - **Nachricht** *(erforderlich)* – Der Benachrichtigungstext mit bis zu 240 Zeichen.
   - **Link oder Flyer-URL öffnen** *(optional)* – Ein relativer App-Pfad (zum Beispiel `/mobile/groups`) oder eine vollständige `https://`-URL, die die Benachrichtigung öffnet, wenn sie angetippt wird.
   - **Bild-URL** *(optional)* – Eine `https://`-URL zu einem Bild, das neben der Benachrichtigung auf unterstützten Geräten angezeigt wird.
4. Eine Live-Vorschau zeigt, wie die Benachrichtigung auf dem Gerät angezeigt wird.
5. Klicken Sie auf **Benachrichtigung senden**.

:::info
Push-Benachrichtigungen werden nur an Gruppenmitglieder zugestellt, die die B1.church-PWA installiert haben und Push-Benachrichtigungen nicht deaktiviert haben. Mitglieder ohne registriertes Push-Gerät oder mit deaktiviertem Push werden als übersprungen gezählt, und die Versandzusammenfassung zeigt, wie viele erreicht und wie viele übersprungen wurden.
:::

:::tip
Nach dem Versand zeigt das Dialogfeld, wie viele Benachrichtigungen erfolgreich in die Warteschlange eingereiht wurden. Wenn die meisten Mitglieder als übersprungen angezeigt werden, erinnern Sie sie daran, ihre B1.church-Website zu besuchen, sie als Home-Screen-App zu installieren und Benachrichtigungen bei Aufforderung zuzulassen.
:::

## Mitglieder entfernen

Um jemanden aus einer Gruppe zu entfernen, suchen Sie seinen Namen in der Mitgliederliste und klicken Sie auf die **Entfernen**-Schaltfläche neben seinem Eintrag.

:::info
Das Entfernen einer Person aus einer Gruppe löscht sie nicht aus Ihrem Kirchenverzeichnis. Sie werden immer noch im Bereich [Personen](../people/adding-people.md) angezeigt und können jederzeit wieder zur Gruppe hinzugefügt werden.
:::
