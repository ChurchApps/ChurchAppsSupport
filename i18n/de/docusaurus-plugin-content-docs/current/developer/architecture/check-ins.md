---
title: "Check-Ins"
---

# Check-Ins

<div class="article-intro">

Check-in ist ein System mit drei Eingangstüren: die B1Checkin-Kiosk-App für bemannte und Selbstbedienungs-Stationen, Self-Check-in in B1App-Mitgliederportal und Admin-seitige Anwesenheit in B1Admin. Alle drei schreiben in das gleiche Anwesenheits-Modul in der Core-Api, und Klassenzimmer-Routing wird vollständig von Gruppen angetrieben – es gibt keine separate "Orte"- oder "Räume"-Entität. Eine Kindersicherheits-Schicht sitzt oben drauf: Pro-Besuch-Check-in-Typen, serverseitige Kapazitäts- und Freiwilligen-Verhältnis-Gates, Kiosk-seitige Alters-/Klassenberechtigung, vertrauenswürdige Abholperson-Verifikation beim Check-out und Eltern-Paging über den Texting-Anbieter der Kirche. Diese Seite verweist das Datenmodell, die Check-in-Flows, die Sicherheits-Schicht und die Label-Druckleitung.

</div>

## Übersicht

```
┌──────────────────────────┐
│ B1Checkin (Expo-Kiosk)   │──┐         ┌──────────────────────────────────────────────┐
│  Lookup → Haushalt →     │  │         │ Api                                          │
│  Gruppen → Abschließen   │  │  HTTPS  │  ┌─ Mitgliedschafts-Modul ─────────────────┐ │
├──────────────────────────┤  ├───────▶ │  │ Personen · Haushalte · Gruppen          │ │
│ B1App (Self-Check-in)    │──┤         │  └─────────────────────────────────────────┘ │
│  /mobile/Checkin-Bildschirm│  │         │  ┌─ Anwesenheits-Modul ───────────────────┐ │
├──────────────────────────┤  │         │  │ Campuses → Services → ServiceTimes      │ │
│ B1Admin (Mitarbeiter)    │──┘         │  │ groupServiceTimes  (Raum-Routing)       │ │
│  Setup · Berichte ·      │            │  │ Sessions ← visitSessions → Besuche      │ │
│  Label-Designer          │            │  │ labelTemplates                          │ │
└──────────────────────────┘            │  └─────────────────────────────────────────┘ │
                                        └──────────────────────────────────────────────┘

Label-Druckpfad (nur Kiosk):
POST /attendance/visits/checkin ──▶ { securityCode, streaks }
  └▶ LabelHelper (Label-Vorlagen, oder gebündelt HTML-Fallback)
       └▶ LabelRenderer → HTML-Dokument + inline SVG-Barcodes
            └▶ PrintUI: WebView-Render → ViewShot-JPG-Erfassung
                 └▶ printer-helper nativer Modul → Brother QL / Zebra
```

| Oberfläche | Repo | Stack | Rolle |
|---------|------|-------|------|
| Kiosk | `B1Checkin` | Expo / React Native, Expo-Router-Datei-Routing; EAS-Builds für Android, Amazon Fire und iOS; OTA-Updates über `expo-updates` | Bemannte oder Selbstbedienungs-Station mit Label-Druck und verifiziertem Check-out |
| Self-Check-in | `B1App` | Next.js (b1.church-Mitgliederportal) | Angemeldete Mitglieder checken ihren Haushalt von einem Telefon ein; keine Druckerei |
| Admin | `B1Admin` | React SPA | Konfiguriert die Service-Struktur, weist Gruppen Dienstzeiten zu, entwirft Labels, nimmt manuelle Anwesenheit auf, führt Berichte aus |

Alle drei rufen die gleichen zwei API-Module über `ApiHelper` auf: **MembershipApi** (`/membership`) für Personen, Haushalte und Gruppen; **AttendanceApi** (`/attendance`) für alles unten.

## Datenmodell (`Api/src/modules/attendance`)

| Entität / Tabelle | Hauptfelder | Bedeutung |
|----------------|-----------|---------|
| `Campuses` | Name, Adresse | Veraltet hier – Campuses werden in der Mitgliedschafts-Modul mastered (`/membership/campuses`); die Anwesenheits-Kopie ist gefrorener Schreibschutz für Legacy-Leser (`models/Campus.ts`) |
| `Services` | Campusid, Name | Eine wiederkehrende Versammlung, z.B. "Sonntagmorgen" (`models/Service.ts`) |
| `ServiceTimes` | ServiceId, Name | Ein Zeitfenster in einem Service, z.B. "9:00 Uhr" (`models/ServiceTime.ts`) |
| `GroupServiceTimes` | GroupId, ServiceTimeId | Join-Tabelle: Welche Gruppen (Klassenzimmer) treffen sich zu welchen Dienstzeiten (`models/GroupServiceTime.ts`) |
| `Sessions` | GroupId, ServiceTimeId, SessionDate | Ein Treffen einer Gruppe an einem Datum – wird träge zur Check-in-Zeit erstellt (`models/Session.ts`) |
| `Visits` | PersonId, ServiceId, VisitDate, CheckinTime, SecurityCode, CheckinType, CheckedInById, CheckoutTime, CheckedOutBy, CheckedOutById | Ein Besuch einer Person an einem Datum (`models/Visit.ts`). `CheckinType` ist `member` / `guest` / `volunteer` (NULL = legacy-Mitglied), eingestellt durch den Kiosk und verbraucht durch die Kapazitäts-/Verhältnis-Gates |
| `VisitSessions` | VisitId, SessionId | Welche Session(s) ein Besuch abdeckt – ein Kind, das zu zwei Dienstzeiten eingecheckt wird, bekommt zwei Zeilen (`models/VisitSession.ts`) |
| `LabelTemplates` | Name, LabelType (`nametag`/`pickup`), Width, Height, isDefault, Content (JSON-Blöcke) | Designbare Label-Layouts (`models/LabelTemplate.ts`) |

### Wie ein abgeschlossenes Check-in beibehalten wird

`VisitController.postCheckin` (`Api/src/modules/attendance/controllers/VisitController.ts`) bearbeitet `POST /attendance/visits/checkin?serviceId=&peopleIds=`. Der Body ist ein Array von `Visit`-Objekten, jeder mit `visitSessions`, deren eingebettetem `session` nur ein `(serviceTimeId, groupId)`-Paar namentlich. Der Server dann:

1. **Gatet Kapazität und Verhältnisse vor irgendeinem Schreiben.** `evaluateGates()` → `CheckinGateHelper.evaluate()` überprüft jedes angestrebten Raums Kapazität, Gast-Kapazität, geschlossenes Flag und Freiwilligenverh ältnis gegen aktuelle Belegung. postCheckin ist **nicht transaktional**, daher muss das Gate vor dem ersten Speichern laufen – eine harte Verletzung gibt 409 zurück, die das beleidigte Klassenzimmer(n) benennt und nichts wird beibehalten. Siehe [Kapazitäts- und Freiwilligenverh ältnisse-Gates](#capacity-and-volunteer-ratio-gates).
2. **Löst Sessions träge auf.** `getSessionId()` findet oder erstellt die `Sessions`-Zeile für `(groupId, serviceTimeId, heute)` – Session-IDs werden im-Prozess pro Datum gecacht. Neue Sessions geben einen `session.created`-Webhook aus. Die Schleife ist ein erwarteter `for..of` – ein früherer Feuer-und-Vergessen-`forEach(async …)` raste den Speichern und schrieb NULL sessionIds auf Ersessions-Erstellung (behoben; bemerkt in einem Code-Kommentar bei der Schleife).
3. **Ersetzt des Tages Datensätze.** Irgendwelche bestehenden Besuche für diese Personen bei diesem Service heute werden zusammen mit ihren visitSessions gelöscht, dann wird die eingereichte Menge gespeichert. Eine Familie erneut einzuchecken ist daher ein idempotenter "dies ist der aktuelle Zustand"-Vorgang, nicht ein Anhänger. Das Weitergeben von `?checkDuplicates=true` gibt stattdessen `{ duplicates: [personId…] }` zurück ohne zu schreiben, was, wie der Kiosk warnt, bevor Overwrites.
4. **Generiert einen Sicherheitscode pro Batch.** `SecurityCodeHelper.generate()` erzeugt einen 4-Zeichen-Code aus dem Alphabet `23456789BCDFGHJKLMNPQRSTVWXYZ` (keine Vokale oder mehrdeutigen Zeichen, daher können Codes keine Worte buchstabieren oder falsch gelesen). Der Server wiederversucht auf Kollision gegen das gleiche Kirchen-gleich-Tag-offene Besuche und beurkunden den Code auf jedem Besuch im Batch.
5. **Gibt `{ streaks, securityCode }` zurück.** `streaks` ordnet personId aufeinander folgende Wochen-Anwesenheits-Zahl; der Kiosk feiert Meilensteine (alle 5. Woche) mit Konfetti.

Jeder gespeicherte Besuch gibt auch einen `attendance.recorded`-Webhook aus. Die Lesenseite, `GET /attendance/visits/checkin`, gibt die Besuche der Personen aus ihrem **letzten protokollierten Datum** – wenn das eine frühere Woche war, werden die IDs abgestreift, daher erhält der Client eine vor ausgefüllte Kopie der Klassenzimmer der letzten Woche, die neue Datensätze speichert.

### Check-out

Zwei Endpoints schließen die Schleife ab (`VisitController`):

- `GET /attendance/visits/code/:code` – die Besuche von heute noch nicht ausgecheckt mit diesem Sicherheitscode, mit Sitzungen aufgefüllt.
- `POST /attendance/visits/checkout` – Body `{ visitIds, checkedOutBy?, checkedOutById? }`; Stempel `checkoutTime` und wer abholt, und gibt einen `attendance.checkout`-Webhook pro Besuch aus.

Berechtigungen: Kiosks authentifizieren sich mit `attendance.checkin`, die genau die Check-in-/Check-out-/Label-Vorlage-Oberfläche gewährt; `attendance.view`/`attendance.edit` umfassen Berichterstattung und manuelle Eingabe; die Struktur (Services, Dienstzeiten, Gruppenzuweisungen) erfordert `services.edit`.

## Gruppen fahren Raum-Routing

Es gibt keine Raum- oder Klassenzimmer-Entität irgendwo im System. Ein "Raum" ist eine Mitgliedschafts-**Gruppe** mit `trackAttendance` aktiviert, mit einer oder mehr Dienstzeiten über `groupServiceTimes` verbunden. Die Gruppen-Felder (auf `Api/src/modules/membership/models/Group.ts`), die Kiosk-Verhalten formen:

| Feld | Effekt |
|------|--------|
| `trackAttendance` | Gruppe beteiligt sich an Anwesenheit überhaupt; B1Admin's Setup-Baum kennzeichnet `trackAttendance`-Gruppen ohne `groupServiceTimes`-Zeile als nicht zugewiesen |
| `parentPickup` | Markiert einen Kinder-Raum: das Einchecken dazu macht den Besuch einen "Kinder"-Besuch, die ein Familienabholp-Label druckt und den Sicherheitscode auf das Namensschildabels setzt |
| `printNametag` | Ob Check-ins in diese Gruppe ein Namensschild überhaupt drucken |
| `capacity` / `guestCapacity` / `checkinClosed` | Raum-Kapazitätsgrenzen und ein harter "geschlossener" Schalter, serverseitig durchgesetzt durch das Check-in-Gate (bearbeitet in B1Admin's Gruppen-Einstellungen unter "Check-in-Kapazität") |
| `volunteerRatio` / `minVolunteers` | Kinder-pro-Freiwilliger-Verhältnis und minimale Freiwilligen-Kopfzahl, durchgesetzt pro der Kirchen-weit `ratioEnforcement`-Einstellung |
| `minAgeMonths` / `maxAgeMonths` / `minGrade` / `maxGrade` | Alters-/Klassenberechtigung grenzt Kiosk-seitig evaluiert, um Klassenzimmer zu markieren oder abzublenden |

Jeder Client denormalisiert das gleiche (z.B. `B1Checkin/app/services.tsx`, `B1App/src/app/[sdSlug]/mobile/components/screens/CheckinPage.tsx`): Laden Sie `GET /attendance/servicetimes?serviceId=`, `GET /attendance/groupservicetimes` und `GET /membership/groups` parallel, dann für jede Dienstzeit sammeln Sie die Gruppen, deren `groupServiceTimes`-Zeile auf sie weist in `serviceTime.groups`. Dieses Array ist das, das der Raumwähler zeigt, organisiert nach Gruppen `categoryName`.

Zuweisungen werden von der Gruppen-Seite in B1Admin bearbeitet (`B1Admin/src/groups/components/ServiceTimesEdit.tsx` – `POST`/`DELETE /attendance/groupservicetimes`), und der ganze Campus → Service → Service Time → Gruppen-Baum wird in `B1Admin/src/attendance/components/AttendanceSetup.tsx` über `GET /attendance/attendancerecords/tree` visualisiert.

:::info
Weil Gruppen die einzelne Quelle der Wahrheit sind, nutzen die gleiche Gruppen-Mitgliedschaft Kiosk-Routing, Roster-artige Anwesenheit in B1Admin's Gruppen-Seiten und Anwesenheits-Berichterstattung – das Zuweisen einer Gruppe zu einer Dienstzeit ist der einzige notwendige Schritt, um es ein Check-in-Ziel zu machen.
:::

## Kindersicherheit

### Check-in-Typen

Jeder Besuch trägt einen `checkinType` – `member`, `guest` oder `volunteer` (NULL bedeutet Legacy/Mitglied; Migration `tools/migrations/attendance/2026-07-03_checkin_type.ts`). Der Typ wird **Kiosk-seitig** gewählt: Mitglied / Gast / Freiwilliger Chips auf der erweiterten Mitglied-Zeile (`B1Checkin/src/components/MemberServiceTimes.tsx`), gestempelt auf jeden ausstehenden Besuch bei Abschluss (`app/checkinComplete.tsx`, Standardwert zu `member`). Der Server verbraucht es im Gate – Freiwillige zählen zu Verhältnisabdeckung statt gegen Kapazität, und Gäste zählen gegen `guestCapacity`.

### Kapazitäts- und Freiwilligenverh ältnisse-Gates

`CheckinGateHelper.evaluate()` (`Api/src/modules/attendance/helpers/CheckinGateHelper.ts`) läuft innen `postCheckin` vor irgendeinem Speichern (der Endpoint ist nicht transaktional, daher ist Gating-vor-Speichern der Korrektheitsmechanismus). Es lädt aktuelle Belegung pro angezielter Gruppe (`VisitRepo.countActiveByGroupToday`) und die Gruppenkonfiguration durch das Mitgliedschafts-Modul-Gateway, dann klassifiziert Verletzungen:

- **Hart (immer blockieren):** `checkinClosed`, `current + incoming > capacity`, Gast-Zahl über `guestCapacity`. Der Batch wird mit `409 { error: "capacity", groups: [{ groupId, groupName, reason }] }` – der Kiosk zeigt das benannte Klassenzimmer abgelehnt.
- **Verhältnis (warnen oder blockieren):** eingehende Nicht-Freiwillige in einen Raum, wo `volunteers < minVolunteers`, keine Freiwilligen überhaupt, oder `children > volunteers × volunteerRatio`. Schweregrad folgt der Pro-Kirche-Einstellung `ratioEnforcement` (`"warn"` Standard / `"block"`, bearbeitet in B1Admin Manage Church → Check-in, `CheckinSettingsEdit.tsx`). Warn-Modus gibt `409 { warning: true, error: "ratio", … }` zurück, es sei denn, der Client reicht mit `acknowledgeWarnings=true` erneut ein – diese Resubmission ist die Kiosk's-Mitarbeiter-Bestätigung Übersteuerung.

### Alters-/Klassenberechtigung (Kiosk-seitig)

Raum-Berechtigung ist Empfehlung-UI, auf dem Kiosk evaluiert, nicht serverseitig durchgesetzt. `B1Checkin/src/helpers/EligibilityHelper.ts` vergleicht die Geburtstag/Klasse einer Person gegen die Gruppen-`minAgeMonths`/`maxAgeMonths`/`minGrade`/`maxGrade` (Klassenversteck: PreK, K, 1–12, Abgeschlossen) und gibt `berechtigt` / `nicht berechtigt` / `unbekannt` – fehlende Daten geben `unbekannt` und verbergen niemals einen Raum. Altersangaben und Klassen werden als der Kirchen-**Klassenbeförderungsdatum** berechnet (`gradePromotionDate`-Einstellung, `"MM-DD"`, bearbeitet in `B1Admin/src/settings/components/GradePromotionSettingsEdit.tsx`); der Kiosk ruft es ab vom `GET /attendance/checkin/settings`, und `resolveAsOfDate` wählt das jüngste Auftreten am oder vor heute. Der Raumwähler kennzeichnet berechtigte Klassenzimmer und blendet berechtigte ab; das Auswählen eines abgeblendeten Raums erfordert eine Mitarbeiter-Bestätigung.

### Vertrauenswürdige und nicht autorisierte Abhol-Personen

Abholpersonen sind eine Mitgliedschafts-Entität, pro Haushalt: `householdPickupPeople` (`Api/src/modules/membership/models/HouseholdPickupPerson.ts` – HouseholdId, optionale PersonId, Name, PhotoUrl, Beziehung, `Status` `vertrauenswürdig` / `notAuthorized`, Notizen). CRUD ist `GET /membership/householdpickup/:householdId` (irgendwelcher authentifizierter Kirchenbenutzer, daher können Kiosks ihn gelesen werden) plus `POST` / `DELETE` gated von `people.edit`. Mitarbeiter verwalten die Liste auf der Seite der Person **Abholen**-Karte (`B1Admin/src/people/components/PickupPeople.tsx`) – Foto, Beziehung und ein Vertrauenswürdig/Nicht autorisiert Status-Chip.
