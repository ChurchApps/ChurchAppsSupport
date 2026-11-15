---
title: "Gastregistrierung"
description: "Registrieren Sie sich und Ihre Familie als Erstbesucher über das QR-Formular in B1 Checkin, damit ehrenamtlich Tätige Sie bei Ihrer Ankunft einchecken können."
---

# Gastregistrierung

<div class="article-intro">

Wenn Sie eine Gemeinde zum ersten Mal besuchen, können Sie sich und Ihre Familie über die Seite zur Gastregistrierung als Gäste anmelden. Dadurch wird ein Datensatz im System der Gemeinde angelegt, sodass ehrenamtlich Tätige Sie bei Ihrer Ankunft einchecken können.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Ihre Gemeinde muss die QR-Gastregistrierung aktiviert haben. Ist dies nicht der Fall, zeigt die Seite „Die Gastregistrierung ist für diese Gemeinde nicht aktiviert.“
- Scannen Sie den QR-Code am Check-in-Terminal, tippen Sie am Terminal auf **Hier registrieren** oder erhalten Sie einen Link von einer ehrenamtlich tätigen Person der Gemeinde

</div>

## So funktioniert die Gastregistrierung {#how-guest-registration-works}

Die Gastregistrierung ist für Besucher gedacht, die noch kein Konto haben. Tippen Sie am Check-in-Terminal der Gemeinde auf **Als Gast registrieren**, um einen QR-Code anzuzeigen, der zur Registrierungsseite führt. Den Link erhalten Sie auch von einer ehrenamtlich tätigen Person oder einem Empfangsteam oder finden ihn auf einem Flyer oder der Website der Gemeinde.

Haben Sie kein Telefon zur Hand? Tippen Sie im selben QR-Code-Fenster am Terminal auf **Hier registrieren**, um das Formular direkt am Terminal auszufüllen. Wie das am Terminal funktioniert, erfahren Sie unter [Sich als Gast registrieren](../../b1-checkin/check-in/looking-up-members.md#registering-as-a-guest).

Die Seite öffnet sich mit dem Titel **Gastregistrierung**. Hat die Gemeinde ein Kopfbild hinterlegt, erscheint es oben auf der Seite; andernfalls sehen Sie ein kleines Symbol.

## Ihre Familie registrieren {#registering-your-family}

1. **Scannen Sie den QR-Code** am Check-in-Terminal oder öffnen Sie den Link zur Gastregistrierung auf Ihrem Telefon. (Haben Sie am Terminal auf **Hier registrieren** getippt, ist das Formular bereits geöffnet.)
2. Füllen Sie die Karte **Hauptkontakt** aus. **Vorname** und **Nachname** sind immer erforderlich. Je nachdem, was Ihre Gemeinde abfragt, sehen Sie möglicherweise außerdem:
   - **Anrede** (etwa Herr, Frau, Dr. oder Pastor) vor dem Namen
   - **E-Mail** und **Telefon**
   - **Familienstand**
   - **Privatanschrift** -- **Straße**, **Adresszusatz**, **Ort**, **Bundesland** und **Postleitzahl**. Sie gilt für die ganze Familie.
3. Das Formular beginnt mit einer zweiten Karte für **Familienmitglied 2**. Tragen Sie Vor- und Nachname ein oder tippen Sie auf das **X** in der Ecke der Karte, um sie zu entfernen, wenn Sie sich allein registrieren.
4. Um weitere Personen hinzuzufügen, tippen Sie auf **Familienmitglied hinzufügen**. Die neue Karte übernimmt automatisch den Nachnamen des Hauptkontakts. Sie können bis zu 10 Personen auf einmal registrieren.
5. Falls Ihre Gemeinde diese Angaben abfragt, kann die Karte jeder Person außerdem **Anrede**, **Telefon**, **Geburtsdatum**, **Geschlecht** und **Klassenstufe** enthalten. Jede Karte nach dem Hauptkontakt kann außerdem nach der **Rolle im Haushalt** fragen – **Ehepartner**, **Kind** oder **Sonstige** –, damit die Gemeinde weiß, wie jede Person mit dem Hauptkontakt verwandt ist.
6. Gibt es unter den Familienmitgliedern ein Feld **Kommentare**, nutzen Sie es, um alles mitzuteilen, was die Gemeinde wissen sollte (bis zu 1.000 Zeichen).
7. Tippen Sie auf **Registrieren**, um das Formular abzuschicken.

Mit einem Sternchen (`*`) gekennzeichnete Felder sind Pflichtfelder. Jede Karte braucht Vor- und Nachnamen – fehlt einer davon, zeigt das Formular „Für jedes Mitglied sind Vor- und Nachname erforderlich.“ Fehlt ein anderes Pflichtfeld, zeigt es „Bitte füllen Sie alle Pflichtfelder aus.“ Erst wenn Sie alles ausgefüllt haben, wird etwas abgeschickt.

## Nach der Registrierung {#after-registering}

Sobald Sie das Formular abschicken, erscheint ein Bestätigungsbildschirm mit der Meldung: „Registrierung abgeschlossen – alles erledigt! Ein Mitarbeitender wird Sie in Kürze einchecken.“

Ihre Registrierung legt Datensätze in der Datenbank der Gemeinde an:

- Ein **Haushalt** wird mit dem Nachnamen des Hauptkontakts angelegt; der Hauptkontakt ist der Haushaltsvorstand.
- Für jedes Familienmitglied wird ein **Personendatensatz** mit dem Mitgliedsstatus „Besucher“ angelegt. Jedes Familienmitglied erhält die Rolle im Haushalt, die Sie gewählt haben, oder **Sonstige**, wenn keine abgefragt wurde.
- Alle Kommentare, die Sie eingegeben haben, werden als Notiz im Datensatz des Hauptkontakts gespeichert, damit das Personal der Gemeinde sie lesen kann.
- Hat die Gemeinde eine Gruppe für neue Gäste festgelegt, wird Ihre Familie dieser Gruppe hinzugefügt. Die Gemeinde kann Ihre Anwesenheit außerdem automatisch erfassen, wenn Sie sich während eines geplanten Gottesdienstes dieser Gruppe registrieren.
- Eine ehrenamtlich tätige Person oder ein Administrator kann Ihre Familie dann am [B1-Checkin](../../b1-checkin/check-in/looking-up-members.md)-Terminal einchecken.

:::info
Wenn Sie sich erneut mit demselben Vornamen und derselben E-Mail-Adresse oder Telefonnummer registrieren, erkennen Sie die Datensätze der Gemeinde und verwenden Ihr vorhandenes Profil, anstatt ein Duplikat anzulegen. Alle anderen werden als neu angelegt. Wenn Sie sich bereits registriert haben, können Sie am Terminal auch einfach nach Ihrem Namen oder Ihrer Telefonnummer suchen.
:::

:::tip
Fragt das Formular nach Ihrer E-Mail-Adresse, hilft deren Angabe der Gemeinde, nach Ihrem Besuch Kontakt mit Ihnen aufzunehmen.
:::

## Verwandte Artikel {#related-articles}

- [Selbst-Check-in](./self-checkin.md) -- Sich nach der Registrierung selbst einchecken
- [Gäste hinzufügen (Terminal)](../../b1-checkin/check-in/adding-guests.md) -- Wie ehrenamtlich Tätige Gäste am Terminal hinzufügen
- [Check-in](../../b1-admin/attendance/check-in.md#guest-registration-via-qr-code) -- Wie Gemeindeadministratoren die QR-Gastregistrierung einrichten
