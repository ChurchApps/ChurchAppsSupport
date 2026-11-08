---
title: "Gastregistrierung"
description: "Registrieren Sie sich und Ihre Familie als Erstbesucher über das QR-Formular in B1 Checkin, damit Ehrenamtliche Sie bei Ihrer Ankunft einchecken können."
---

# Gastregistrierung

<div class="article-intro">

Wenn Sie zum ersten Mal eine Kirche besuchen, können Sie sich und Ihre Familie über die Gastregistrierungsseite als Gäste registrieren. Dadurch wird ein Eintrag im System der Kirche erstellt, sodass Ehrenamtliche Sie bei Ihrer Ankunft einchecken können.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- In Ihrer Kirche muss die QR-Gastregistrierung aktiviert sein. Ist sie es nicht, zeigt die Seite die Meldung „Gastregistrierung ist für diese Kirche nicht aktiviert.“ an.
- Scannen Sie den QR-Code, der am Check-in-Terminal angezeigt wird, tippen Sie am Terminal auf **Hier registrieren**, oder erhalten Sie einen Link von einem Ehrenamtlichen.

</div>

## So funktioniert die Gastregistrierung

Die Gastregistrierung ist für Besucher gedacht, die noch kein Konto haben. Tippen Sie am Check-in-Terminal der Kirche auf **Als Gast registrieren**, um einen QR-Code anzuzeigen, der zur Registrierungsseite führt. Den Link können Sie auch von einem Ehrenamtlichen oder Empfangsmitarbeiter erhalten oder auf einem Flyer bzw. der Website der Kirche finden.

Kein Handy zur Hand? Tippen Sie im selben QR-Code-Fenster am Terminal auf **Hier registrieren**, um das Formular direkt am Terminal auszufüllen. Wie das am Terminal funktioniert, erfahren Sie unter [Als Gast registrieren](../../b1-checkin/check-in/looking-up-members.md#registering-as-a-guest).

Die Seite öffnet sich mit dem Titel **Gastregistrierung**. Hat die Kirche ein Kopfbild hinzugefügt, erscheint es oben auf der Seite; andernfalls sehen Sie ein kleines Symbol.

## Ihre Familie registrieren

1. **Scannen Sie den QR-Code** am Check-in-Terminal oder öffnen Sie den Link zur Gastregistrierung auf Ihrem Handy. (Wenn Sie am Terminal auf **Hier registrieren** getippt haben, ist das Formular bereits geöffnet.)
2. Füllen Sie die Karte **Hauptkontakt** aus. **Vorname** und **Nachname** sind immer erforderlich. Je nachdem, was Ihre Kirche abfragt, sehen Sie möglicherweise außerdem:
   - **Anrede** (z. B. Herr, Frau, Dr. oder Pastor), vor dem Namen
   - **E-Mail** und **Telefon**
   - **Familienstand**
   - **Wohnadresse** -- **Straße**, **Adresszusatz**, **Ort**, **Bundesland** und **PLZ**. Diese Angaben gelten für die ganze Familie.
3. Das Formular beginnt mit einer zweiten Karte für **Familienmitglied 2**. Geben Sie Vor- und Nachnamen ein oder tippen Sie auf das **X** in der Ecke der Karte, um sie zu entfernen, falls Sie sich allein registrieren.
4. Um weitere Personen hinzuzufügen, tippen Sie auf **Familienmitglied hinzufügen**. Die neue Karte übernimmt automatisch den Nachnamen des Hauptkontakts. Sie können bis zu 10 Personen gleichzeitig registrieren.
5. Falls Ihre Kirche diese Angaben verlangt, kann die Karte jeder Person außerdem **Anrede**, **Telefon**, **Geburtsdatum**, **Geschlecht** und **Klasse** enthalten. Ab dem Hauptkontakt kann jede weitere Karte zudem eine **Rolle im Haushalt** abfragen -- **Ehepartner**, **Kind** oder **Sonstige** --, damit die Kirche weiß, in welcher Beziehung jede Person zum Hauptkontakt steht.
6. Falls Ihre Kirche unter den Familienmitgliedern ein Feld **Kommentare** vorsieht, nutzen Sie es, um alles mitzuteilen, was die Kirche wissen sollte (bis zu 1.000 Zeichen).
7. Tippen Sie auf **Registrieren**, um das Formular abzusenden.

Mit einem Sternchen (`*`) markierte Felder sind Pflichtfelder. Sind welche leer, zeigt das Formular die Meldung „Bitte füllen Sie alle Pflichtfelder aus.“ an, und es wird erst etwas gesendet, wenn Sie diese ausgefüllt haben.

## Nach der Registrierung

Sobald Sie das Formular abgesendet haben, erscheint ein Bestätigungsbildschirm mit der Meldung: „Registrierung abgeschlossen -- Alles erledigt! Ein Mitarbeiter wird Sie in Kürze einchecken.“

Ihre Registrierung erstellt Einträge in der Datenbank der Kirche:

- Ein **Haushalt** wird unter dem Nachnamen des Hauptkontakts angelegt, wobei der Hauptkontakt als Haushaltsvorstand eingetragen wird.
- Für jedes Familienmitglied werden **Personendatensätze** mit dem Mitgliedsstatus „Besucher“ angelegt. Jedes Familienmitglied erhält die Haushaltsrolle, die Sie ausgewählt haben, oder **Sonstige**, falls keine abgefragt wurde.
- Eingegebene Kommentare werden als Notiz im Datensatz des Hauptkontakts gespeichert, damit das Kirchenpersonal sie lesen kann.
- Wenn die Kirche eine Gruppe für neue Gäste festgelegt hat, wird Ihre Familie dieser Gruppe hinzugefügt. Die Kirche kann außerdem Ihre Anwesenheit automatisch erfassen, wenn Sie sich während eines planmäßigen Gottesdienstes dieser Gruppe registrieren.
- Ein Ehrenamtlicher oder Administrator kann Ihre Familie anschließend über das [B1 Checkin](../../b1-checkin/check-in/looking-up-members.md)-Terminal einchecken.

:::info
Wenn Sie sich erneut mit demselben Vornamen und derselben E-Mail-Adresse oder Telefonnummer registrieren, erkennt das System der Kirche Sie und verwendet Ihr bestehendes Profil, anstatt ein Duplikat anzulegen. Andere Personen werden als neue Einträge hinzugefügt. Wenn Sie sich bereits registriert haben, können Sie am Terminal auch einfach nach Ihrem Namen oder Ihrer Telefonnummer suchen.
:::

:::tip
Wenn das Formular nach Ihrer E-Mail-Adresse fragt, hilft deren Angabe der Kirche, sich nach Ihrem Besuch bei Ihnen zu melden.
:::

## Verwandte Artikel

- [Selbst-Check-in](./self-checkin.md) -- Check-in für sich selbst nach der Registrierung
- [Gäste hinzufügen (Terminal)](../../b1-checkin/check-in/adding-guests.md) -- Wie Ehrenamtliche Gäste am Terminal hinzufügen
- [Check-in](../../b1-admin/attendance/check-in.md#guest-registration-via-qr-code) -- Wie Kirchenadministratoren die QR-Gastregistrierung einrichten
