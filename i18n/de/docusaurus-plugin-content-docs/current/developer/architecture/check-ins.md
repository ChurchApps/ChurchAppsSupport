---
title: "Check-Ins"
---

# Check-Ins

<div class="article-intro">

Check-in ist ein System mit drei Eingangstüren: die B1Checkin Kiosk-App für Mitarbeiter- und Selbstbedienungs-Stationen, Selbst-Check-in innerhalb des B1App Mitglieder-Portals und Verwaltungs-Anwesenheit in B1Admin. Alle drei schreiben in dasselbe Anwesenheits-Modul im Kern-API, und Klassenzimmer-Routing wird vollständig von Gruppen angetrieben — es gibt keine separate Entität „Orte" oder „Räume". Eine Kindersicherheits-Schicht sitzt darauf: Pro-Besuch-Check-in-Typen, Server-seitige Kapazitäts- und Freiwilligenquoten-Gates, Kiosk-seitige Alters-/Klassenstufen-Berechtigung, vertrauenswürdige Abhol-Überprüfung beim Auschecken und Eltern-Benachrichtigungen über den Texting-Anbieter der Gemeinde. Diese Seite zeigt das Datenmodell, die Check-in-Flows, die Sicherheits-Schicht und die Etikett-Druck-Pipeline.

</div>

## Überblick

Das System umfasst drei Clients:
- **B1Checkin** (Expo Kiosk) — Staffed oder Self-serve Stationen mit Etikett-Druck und überprüftem Auschecken
- **B1App** (Self check-in) — Angemeldete Mitglieder checken ihren Haushalt von einem Telefon ein; kein Druck
- **B1Admin** (Mitarbeiter) — Konfiguriert die Dienst-Struktur, weist Gruppen Dienst-Zeiten zu, gestaltet Etiketten, erfasst manuell Anwesenheit, führt Berichte durch

## Datenmodell

| Entität / Tabelle | Schlüssel-Felder | Bedeutung |
|---|---|---|
| `services` | campusId, name | Ein wiederkehrendes Treffen, z. B. „Sonntag-Morgen" |
| `serviceTimes` | serviceId, name | Ein Zeit-Slot innerhalb eines Services, z. B. „9:00 Uhr" |
| `groupServiceTimes` | groupId, serviceTimeId | Join-Tabelle: Welche Gruppen (Klassenzimmer) treffen sich bei welchen Dienst-Zeiten |
| `sessions` | groupId, serviceTimeId, sessionDate | Ein Treffen einer Gruppe an einem Datum |
| `visits` | personId, serviceId, visitDate, checkinTime, securityCode, checkinType | Eine Person besucht an einem Datum (checkinType ist member/guest/volunteer) |
| `visitSessions` | visitId, sessionId | Welche Sessions ein Besuch abdeckt |

## Kind-Sicherheit

Check-in-Typen (`member`, `guest`, `volunteer`) werden am Kiosk gewählt und verbraucht von der Gate-Überprüfung. Kapazitäts- und Freiwilligenquoten-Gates laufen vor jeder Schreibvorgabe. Alters-/Klassenstufen-Berechtigung ist nur Benutzeroberflächen-Führung, von der Server nicht durchgesetzt. Vertrauenswürdige und nicht-autorisierte Abhol-Personen sind eine Mitgliedschafts-Entität pro Haushalt mit `status` (vertrauenswürdig / nicht autorisiert).

## Verwandte Artikel

- [Attendance Endpoints](../api/endpoints/attendance) — Vollständige REST-Oberfläche
- [Membership Endpoints](../api/endpoints/membership) — Personen, Haushalte und Gruppen
- [Webhooks](../api/webhooks) — session.created, attendance.recorded und attendance.checkout Ereignisse
- [Modul-Struktur](../api/module-structure) — Wie das Anwesenheits-Modul Server-seitig organisiert ist
