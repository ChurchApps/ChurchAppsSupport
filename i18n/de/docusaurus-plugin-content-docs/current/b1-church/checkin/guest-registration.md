---
title: "Gästeregistrierung"
description: "Registrieren Sie sich und Ihre Familie als Erstbesucher über das QR-Formular in B1 Checkin, damit Freiwillige Sie bei Ihrer Ankunft einchecken können."
---

# Gästeregistrierung {#guest-registration}

<div class="article-intro">

Wenn Sie zum ersten Mal eine Gemeinde besuchen, können Sie sich und Ihre Familie über die Seite zur Gästeregistrierung als Gäste anmelden. Dadurch wird ein Datensatz im System der Gemeinde erstellt, damit Freiwillige Sie bei Ihrer Ankunft einchecken können.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Ihre Gemeinde muss die QR-Gästeregistrierung aktiviert haben. Ist sie nicht aktiviert, zeigt die Seite „Die Gastregistrierung ist für diese Gemeinde nicht aktiviert.“ an.
- Scannen Sie den QR-Code am Check-in-Kiosk, tippen Sie am Kiosk auf **Hier registrieren**, oder erhalten Sie einen Link von einem Freiwilligen der Gemeinde

</div>

## So funktioniert die Gästeregistrierung {#how-guest-registration-works}

Die Gästeregistrierung ist für Besucher gedacht, die noch kein Konto haben. Tippen Sie am Check-in-Kiosk der Gemeinde auf **Als Gast registrieren**, um einen QR-Code anzuzeigen, der zur Registrierungsseite führt. Sie können den Link auch von einem Freiwilligen oder Begrüßungsteam erhalten oder auf einem Flyer bzw. der Website der Gemeinde finden.

Haben Sie kein Telefon zur Hand? Tippen Sie im selben QR-Code-Fenster am Kiosk auf **Hier registrieren**, um das Formular direkt am Kiosk auszufüllen. Wie das am Kiosk funktioniert, erfahren Sie unter [Als Gast registrieren](../../b1-checkin/check-in/looking-up-members.md#registering-as-a-guest).

Die Seite öffnet sich mit dem Titel **Gastregistrierung**. Hat die Gemeinde ein Kopfbild hinzugefügt, erscheint es oben auf der Seite; andernfalls sehen Sie ein kleines Symbol.

## Ihre Familie registrieren {#registering-your-family}

1. **Scannen Sie den QR-Code** am Check-in-Kiosk oder öffnen Sie den Link zur Gästeregistrierung auf Ihrem Telefon. (Wenn Sie am Kiosk auf **Hier registrieren** getippt haben, ist das Formular bereits geöffnet.)
2. Füllen Sie die Karte **Hauptkontakt** aus. **Vorname** und **Nachname** sind immer erforderlich. Je nachdem, was Ihre Gemeinde abfragt, sehen Sie möglicherweise außerdem:
   - **Anrede** (etwa Herr, Frau, Dr. oder Pastor) vor dem Namen
   - **E-Mail** und **Telefon**
   - **Familienstand**
   - **Privatanschrift** -- **Straße**, **Adresszusatz**, **Ort**, **Bundesland** und **Postleitzahl**. Diese Angabe gilt für die ganze Familie.
3. Das Formular beginnt mit einer zweiten Karte für **Familienmitglied 2**. Geben Sie deren Vor- und Nachnamen ein oder tippen Sie auf das **X** in der Ecke der Karte, um sie zu entfernen, falls Sie sich allein registrieren.
4. Um weitere Personen hinzuzufügen, tippen Sie auf **Familienmitglied hinzufügen**. Die neue Karte übernimmt automatisch den Nachnamen der Hauptkontaktperson. Sie können bis zu 10 Personen gleichzeitig registrieren.
5. Wenn Ihre Gemeinde sie abfragt, kann die Karte jeder Person auch **Anrede**, **E-Mail**, **Telefon**, **Geburtsdatum**, **Geschlecht** und **Klassenstufe** enthalten. Jede Karte nach der Hauptkontaktperson kann außerdem eine **Rolle im Haushalt** abfragen -- **Ehepartner**, **Kind** oder **Sonstige** --, damit die Gemeinde weiß, wie jede Person mit der Hauptkontaktperson verwandt ist.
   Fragt Ihre Gemeinde nach einem Foto, hat jede Karte eine Schaltfläche **Foto hinzufügen**. Tippen Sie darauf, wählen oder machen Sie ein Bild, schneiden Sie es zu und speichern Sie es; das Foto erscheint auf der Karte. Tippen Sie auf **Foto ändern**, um ein anderes zu wählen, oder auf **Foto entfernen**, um es zu entfernen. Das Foto wird beim Anlegen des Datensatzes als Profilfoto dieser Person gespeichert.
6. Befindet sich unter den Familienmitgliedern ein Feld **Kommentare**, nutzen Sie es, um alles mitzuteilen, was die Gemeinde wissen sollte (bis zu 1.000 Zeichen).
7. Tippen Sie auf **Registrieren**, um abzusenden.

Mit einem Sternchen (`*`) markierte Felder sind Pflichtfelder. Jede Karte benötigt Vor- und Nachnamen -- fehlt einer davon, zeigt das Formular „Für jedes Mitglied sind Vor- und Nachname erforderlich.“ an. Ist ein anderes Pflichtfeld leer, erscheint „Bitte füllen Sie alle Pflichtfelder aus.“. Erst wenn alles ausgefüllt ist, wird etwas abgesendet.

## Nach der Registrierung {#after-registering}

Sobald Sie das Formular absenden, erscheint ein Bestätigungsbildschirm mit der Meldung: „Registrierung abgeschlossen – alles erledigt! Ein Mitarbeitender wird Sie in Kürze einchecken.“

Ihre Registrierung legt Datensätze in der Datenbank der Gemeinde an:

- Ein **Haushalt** wird mit dem Nachnamen der Hauptkontaktperson angelegt, wobei die Hauptkontaktperson als Haushaltsvorstand eingetragen wird.
- Für jedes Familienmitglied werden **Personendatensätze** mit dem Mitgliedsstatus „Besucher“ angelegt. Jedes Familienmitglied erhält die Rolle im Haushalt, die Sie gewählt haben, oder **Sonstige**, falls keine abgefragt wurde.
- Eingegebene Kommentare werden als Notiz im Datensatz der Hauptkontaktperson gespeichert, damit Mitarbeitende der Gemeinde sie lesen können.
- Hat die Gemeinde eine Gruppe für neue Gäste festgelegt, wird Ihre Familie ihr hinzugefügt. Die Gemeinde kann Ihre Anwesenheit außerdem automatisch erfassen, wenn Sie sich während eines Gottesdienstzeitpunkts dieser Gruppe registrieren.
- Ein Freiwilliger oder Administrator der Gemeinde kann Ihre Familie anschließend am [B1-Checkin-Kiosk](../../b1-checkin/check-in/looking-up-members.md) einchecken.

:::info
Registrieren Sie sich erneut mit demselben Vornamen und derselben E-Mail-Adresse oder Telefonnummer, erkennen die Datensätze der Gemeinde Sie und verwenden Ihr bestehendes Profil, statt ein Duplikat anzulegen. Alle anderen werden als neue Personen angelegt. Wenn Sie sich bereits registriert haben, können Sie am Kiosk auch einfach nach Ihrem Namen oder Ihrer Telefonnummer suchen.
:::

:::tip
Wenn das Formular Ihre E-Mail-Adresse abfragt, hilft deren Angabe der Gemeinde, nach Ihrem Besuch nachzufassen.
:::

## Verwandte Artikel {#related-articles}

- [Selbst-Check-in](./self-checkin.md) -- Checken Sie sich nach der Registrierung selbst ein
- [Gäste hinzufügen (Kiosk)](../../b1-checkin/check-in/adding-guests.md) -- Wie Freiwillige am Kiosk Gäste hinzufügen
- [Check-in](../../b1-admin/attendance/check-in.md#guest-registration-via-qr-code) -- Wie Gemeindeadministratoren die QR-Gästeregistrierung einrichten
