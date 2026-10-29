---
title: "Check-ins"
---

# Check-ins

<div class="article-intro">

Der Check-in ist ein System mit drei Zugängen: die Kiosk-App B1Checkin für besetzte und Selbstbedienungsstationen, der Selbst-Check-in innerhalb des Mitgliederportals B1App sowie die Anwesenheitsverwaltung in B1Admin. Alle drei schreiben in dasselbe Anwesenheitsmodul der Core-API, und das Routing in die Kursräume wird vollständig durch Gruppen gesteuert -- es gibt keine eigene Entität für "Standorte" oder "Räume". Darüber liegt eine Schutzschicht für Kinder: Check-in-Typen pro Besuch, serverseitige Kapazitäts- und Betreuungsschlüssel-Prüfungen, altersbezogene Berechtigungsprüfung am Kiosk, die Verifizierung der Abholperson beim Check-out und die Benachrichtigung der Eltern über den SMS-Anbieter der Kirche. Diese Seite beschreibt das Datenmodell, die Check-in-Abläufe, die Schutzschicht und die Pipeline für den Etikettendruck.

</div>

## Überblick

```
┌──────────────────────────┐
│ B1Checkin (Expo kiosk)   │──┐         ┌──────────────────────────────────────────────┐
│  lookup → household →    │  │         │ Api                                          │
│  groups → complete/print │  │  HTTPS  │  ┌─ membership module ─────────────────────┐ │
├──────────────────────────┤  ├───────▶ │  │ people · households · groups            │ │
│ B1App (self check-in)    │──┤         │  └─────────────────────────────────────────┘ │
│  /mobile/checkin screen  │  │         │  ┌─ attendance module ─────────────────────┐ │
├──────────────────────────┤  │         │  │ campuses → services → serviceTimes      │ │
│ B1Admin (staff)          │──┘         │  │ groupServiceTimes  (room routing)       │ │
│  setup · reports ·       │            │  │ sessions ← visitSessions → visits       │ │
│  label designer          │            │  │ labelTemplates                          │ │
└──────────────────────────┘            │  └─────────────────────────────────────────┘ │
                                        └──────────────────────────────────────────────┘

Label print path (kiosk only):
POST /attendance/visits/checkin ──▶ { securityCode, streaks }
  └▶ LabelHelper (label templates, or bundled HTML fallback)
       └▶ LabelRenderer → HTML doc + inline SVG barcodes
            └▶ PrintUI: WebView render → ViewShot JPG capture
                 └▶ printer-helper native module → Brother QL / Zebra
```

| Oberfläche | Repository | Stack | Rolle |
|---------|------|-------|------|
| Kiosk | `B1Checkin` | Expo / React Native, Dateirouting über expo-router; EAS-Builds für Android, Amazon Fire und iOS; OTA-Updates über `expo-updates` | Besetzte oder Selbstbedienungsstation mit Etikettendruck und geprüftem Check-out |
| Selbst-Check-in | `B1App` | Next.js (Mitgliederportal b1.church) | Angemeldete Mitglieder checken ihren Haushalt vom Telefon aus ein; kein Druck |
| Verwaltung | `B1Admin` | React-SPA | Konfiguriert die Gottesdienststruktur, ordnet Gruppen Gottesdienstzeiten zu, gestaltet Etiketten, erfasst manuelle Anwesenheit, erstellt Berichte |

Alle drei rufen dieselben zwei API-Module über `ApiHelper` auf: **MembershipApi** (`/membership`) für Personen, Haushalte und Gruppen; **AttendanceApi** (`/attendance`) für alles Weitere unten.

## Datenmodell (`Api/src/modules/attendance`)

| Entität / Tabelle | Wichtige Felder | Bedeutung |
|----------------|-----------|---------|
| `campuses` | name, address | Veraltet -- Standorte werden im Mitgliedschaftsmodul gepflegt (`/membership/campuses`); die Kopie im Anwesenheitsmodul ist für ältere Leser eingefroren und nur lesbar (`models/Campus.ts`) |
| `services` | campusId, name | Eine wiederkehrende Zusammenkunft, z. B. "Sonntagmorgen" (`models/Service.ts`) |
| `serviceTimes` | serviceId, name, dayOfWeek, startTime, endTime, checkinOpenMinutes, checkinCloseMinutes | Ein Zeitfenster innerhalb eines Gottesdienstes, z. B. "9:00 Uhr" (`models/ServiceTime.ts`). Die Zeitplan-Spalten sind optional (Migration `tools/migrations/attendance/2026-10-10_service_time_schedule.ts`) und steuern das [Check-in-Fenster](#zeitgesteuerte-check-in-fenster) |
| `groupServiceTimes` | groupId, serviceTimeId | Verbindungstabelle: welche Gruppen (Kursräume) zu welchen Gottesdienstzeiten zusammenkommen (`models/GroupServiceTime.ts`) |
| `sessions` | groupId, serviceTimeId, sessionDate | Eine Zusammenkunft einer Gruppe an einem Datum -- wird erst beim Check-in angelegt (`models/Session.ts`) |
| `visits` | personId, serviceId, visitDate, checkinTime, securityCode, checkinType, checkedInById, checkoutTime, checkedOutBy, checkedOutById | Eine Person, die an einem Datum teilnimmt (`models/Visit.ts`). `checkinType` ist `member` / `guest` / `volunteer` (NULL = älterer Mitgliedsdatensatz); wird vom Kiosk gesetzt und von den Kapazitäts- und Betreuungsprüfungen ausgewertet |
| `visitSessions` | visitId, sessionId | Welche Sitzung(en) ein Besuch abdeckt -- ein Kind, das zu zwei Gottesdienstzeiten eingecheckt wird, erhält zwei Zeilen (`models/VisitSession.ts`) |
| `labelTemplates` | name, labelType (`nametag`/`pickup`), width, height, isDefault, content (JSON-Blöcke) | Frei gestaltbare Etikettenlayouts (`models/LabelTemplate.ts`) |

### So wird ein abgeschlossener Check-in gespeichert

`VisitController.postCheckin` (`Api/src/modules/attendance/controllers/VisitController.ts`) verarbeitet `POST /attendance/visits/checkin?serviceId=&peopleIds=`. Der Body ist ein Array von `Visit`-Objekten; jedes trägt `visitSessions`, deren eingebettete `session` nur ein Paar `(serviceTimeId, groupId)` nennt. Der Server:

1. **Prüft Kapazität und Betreuungsschlüssel, bevor etwas geschrieben wird.** `evaluateGates()` → `CheckinGateHelper.evaluate()` prüft für jeden angesteuerten Raum Kapazität, Gastkapazität, das Schließ-Flag und den Betreuungsschlüssel gegen die aktuelle Belegung. postCheckin ist **nicht transaktional**, daher muss die Prüfung vor dem ersten Speichern laufen -- eine harte Verletzung liefert einen 409 mit dem Namen der betroffenen Räume, und es wird nichts gespeichert. Siehe [Kapazitäts- und Betreuungsschlüssel-Prüfungen](#kapazitäts-und-betreuungsschlüssel-prüfungen).
2. **Löst Sitzungen verzögert auf.** `getSessionId()` findet oder erstellt die Zeile `sessions` für `(groupId, serviceTimeId, today)`; Sitzungs-IDs werden pro Datum im Prozess zwischengespeichert. Neue Sitzungen lösen einen Webhook `session.created` aus. Die Schleife ist ein `await`-`for..of` -- ein früheres fire-and-forget `forEach(async …)` lief dem Speichern voraus und schrieb beim Anlegen der ersten Sitzung NULL-Sitzungs-IDs (behoben; ein Code-Kommentar an der Schleife verweist darauf).
3. **Ersetzt die Datensätze des Tages.** Bestehende Besuche dieser Personen bei diesem Gottesdienst heute werden samt ihren visitSessions gelöscht, dann wird die übermittelte Menge gespeichert. Ein erneuter Check-in einer Familie ist daher eine idempotente Operation "dies ist der aktuelle Stand" und kein Anhängen. Mit `?checkDuplicates=true` wird stattdessen `{ duplicates: [personId…] }` ohne Schreibvorgang geliefert -- so warnt der Kiosk, bevor er überschreibt.
4. **Erzeugt einen Sicherheitscode pro Stapel.** `SecurityCodeHelper.generate()` erzeugt einen 4-stelligen Code aus dem Alphabet `23456789BCDFGHJKLMNPQRSTVWXYZ` (ohne Vokale und mehrdeutige Zeichen, damit Codes keine Wörter bilden und nicht falsch gelesen werden). Der Server wiederholt die Erzeugung bei einer Kollision mit den offenen Besuchen derselben Kirche am selben Tag und schreibt den Code auf jeden Besuch des Stapels.
5. **Liefert `{ streaks, securityCode }`.** `streaks` ordnet jeder personId die Anzahl aufeinanderfolgender Wochen mit Anwesenheit zu; der Kiosk feiert Meilensteine (jede fünfte Woche) mit Konfetti.

Jeder gespeicherte Besuch löst außerdem einen Webhook `attendance.recorded` aus. Die Leseseite, `GET /attendance/visits/checkin`, liefert die Besuche der Personen ab ihrem **letzten erfassten Datum** -- lag dieses in einer früheren Woche, werden die IDs entfernt, sodass der Client eine vorausgefüllte Kopie der Raumauswahl der Vorwoche erhält, die als neue Datensätze gespeichert wird.

### Check-out

Zwei Endpunkte schließen den Ablauf ab (`VisitController`):

- `GET /attendance/visits/code/:code` — heutige, noch nicht ausgecheckte Besuche mit diesem Sicherheitscode, mit befüllten Sitzungen.
- `POST /attendance/visits/checkout` — Body `{ visitIds, checkedOutBy?, checkedOutById? }`; setzt `checkoutTime` und vermerkt, wer abgeholt hat, und löst pro Besuch einen Webhook `attendance.checkout` aus.

Berechtigungen: Kioske authentifizieren sich mit `attendance.checkin`, das genau die Oberfläche für Check-in, Check-out und Etikettenvorlagen gewährt; `attendance.view`/`attendance.edit` decken Berichte und manuelle Erfassung ab; die Struktur (Gottesdienste, Gottesdienstzeiten, Gruppenzuordnungen) verlangt `services.edit`. Der Selbst-Check-in von Mitgliedern (B1App) braucht keine Berechtigung: Jeder angemeldete Benutzer mit einer verknüpften Person in der Kirche darf `GET`/`POST /attendance/visits/checkin` aufrufen, und der Server beschränkt die übermittelten `personId`s auf den eigenen Haushalt des Aufrufers (sonst 403) -- diese Sperre verhindert, dass die `securityCode`s anderer Familien gelesen werden können. Die Mitgliedschaft ist die Berechtigung; ob Mitglieder die Funktion sehen, steuern die Navigations-Reiter der B1App der Kirche. Die übrigen Check-in-Endpunkte (`code/:code`, `checkout`, `guardians`, `CheckinController`) bleiben nur für Kiosk und Personal.

## Gruppen steuern das Raumrouting

Im gesamten System gibt es keine Entität für Räume oder Klassenzimmer. Ein "Raum" ist eine Mitgliedschafts-**Gruppe** mit aktivierter Option `trackAttendance`, die über `groupServiceTimes` mit einer oder mehreren Gottesdienstzeiten verknüpft ist. Die Gruppenfelder (in `Api/src/modules/membership/models/Group.ts`), die das Verhalten am Kiosk bestimmen:

| Feld | Wirkung |
|------|--------|
| `trackAttendance` | Die Gruppe nimmt überhaupt an der Anwesenheitserfassung teil; die Einrichtungsstruktur in B1Admin markiert `trackAttendance`-Gruppen ohne Zeile in `groupServiceTimes` als nicht zugeordnet |
| `parentPickup` | Kennzeichnet einen Kinderraum: Ein Check-in in diese Gruppe macht den Besuch zu einem "Kind"-Besuch, der ein Abholetikett für die Familie druckt und den Sicherheitscode auf das Namensschild setzt |
| `printNametag` | Ob Check-ins in diese Gruppe überhaupt ein Namensschild drucken |
| `capacity` / `guestCapacity` / `checkinClosed` | Kapazitätsgrenzen des Raumes und ein hartes "geschlossen"-Schalter, serverseitig durch die Check-in-Prüfung erzwungen (bearbeitet in den Gruppeneinstellungen von B1Admin unter "Check-In-Kapazität") |
| `volunteerRatio` / `minVolunteers` | Verhältnis Kinder pro Ehrenamtlichem und minimale Anzahl Ehrenamtlicher, durchgesetzt nach der kirchenweiten Einstellung `ratioEnforcement` |
| `minAgeMonths` / `maxAgeMonths` / `minGrade` / `maxGrade` | Grenzen für Alter und Klassenstufe, die am Kiosk ausgewertet werden, um Räume hervorzuheben oder abzudunkeln |

Jeder Client verarbeitet die Daten auf dieselbe Weise (z. B. `B1Checkin/app/services.tsx`, `B1App/src/app/[sdSlug]/mobile/components/screens/CheckinPage.tsx`): Er lädt parallel `GET /attendance/servicetimes?serviceId=`, `GET /attendance/groupservicetimes` und `GET /membership/groups` und sammelt dann für jede Gottesdienstzeit die Gruppen, deren Zeile in `groupServiceTimes` auf sie zeigt, in `serviceTime.groups`. Dieses Array speist die Raumauswahl, gegliedert nach der `categoryName` der Gruppe.

Zuordnungen werden auf der Gruppenseite in B1Admin bearbeitet (`B1Admin/src/groups/components/ServiceTimesEdit.tsx` — `POST`/`DELETE /attendance/groupservicetimes`). Der gesamte Baum Standort → Gottesdienst → Gottesdienstzeit → Gruppe wird in `B1Admin/src/attendance/components/AttendanceSetup.tsx` über `GET /attendance/attendancerecords/tree` dargestellt.

:::info
Da Gruppen die einzige Quelle der Wahrheit sind, speist dieselbe Gruppenmitgliedschaft das Kiosk-Routing, die Anwesenheitslisten auf den Gruppenseiten in B1Admin und die Anwesenheitsberichte. Eine Gruppe einer Gottesdienstzeit zuzuordnen ist der einzige Schritt, der sie zu einem Check-in-Ziel macht.
:::

## Kinderschutz

### Check-in-Typen

Jeder Besuch trägt einen `checkinType` -- `member`, `guest` oder `volunteer` (NULL bedeutet älter/Mitglied; Migration `tools/migrations/attendance/2026-07-03_checkin_type.ts`). Der Typ wird **am Kiosk** gewählt: Chips Mitglied / Gast / Ehrenamtlich in der erweiterten Mitgliederzeile (`B1Checkin/src/components/MemberServiceTimes.tsx`) und beim Abschluss auf jeden offenen Besuch geschrieben (`app/checkinComplete.tsx`, Standard `member`). Der Server wertet ihn in der Prüfung aus: Ehrenamtliche zählen für die Betreuungsquote, statt gegen die Kapazität, und Gäste zählen gegen `guestCapacity`.

### Kapazitäts- und Betreuungsschlüssel-Prüfungen

`CheckinGateHelper.evaluate()` (`Api/src/modules/attendance/helpers/CheckinGateHelper.ts`) läuft in `postCheckin` vor jedem Speichern (der Endpunkt ist nicht transaktional, daher ist das Prüfen vor dem Speichern der Mechanismus für Korrektheit). Er lädt die aktuelle Belegung je angesteuerter Gruppe (`VisitRepo.countActiveByGroupToday`) und die Gruppenkonfiguration über das Gateway des Mitgliedschaftsmoduls und ordnet dann die Verletzungen ein:

- **Hart (blockiert immer):** `checkinClosed`, `current + incoming > capacity`, Gästezahl über `guestCapacity`. Der Stapel wird mit `409 { error: "capacity", groups: [{ groupId, groupName, reason }] }` abgelehnt -- der Kiosk zeigt den genannten Raum.
- **Betreuungsschlüssel (warnen oder blockieren):** eingehende Nicht-Ehrenamtliche in einen Raum, in dem `volunteers < minVolunteers` gilt, keine Ehrenamtlichen anwesend sind oder `children > volunteers × volunteerRatio`. Die Schwere richtet sich nach der kirchenweiten Einstellung `ratioEnforcement` (`"warn"` als Standard / `"block"`, bearbeitet in B1Admin unter Kirche verwalten → Check-in, `CheckinSettingsEdit.tsx`). Im Warnmodus liefert der Server `409 { warning: true, error: "ratio", … }`, sofern der Client nicht mit `acknowledgeWarnings=true` erneut sendet -- dieses erneute Senden ist die Bestätigung durch Mitarbeitende am Kiosk.

### Zeitgesteuerte Check-in-Fenster

Eine Gottesdienstzeit kann einen optionalen wöchentlichen Zeitplan tragen (`dayOfWeek` 0–6 mit 0 = Sonntag, `startTime`/`endTime` als `HH:mm`, `checkinOpenMinutes`, `checkinCloseMinutes`). Bearbeitet wird er im Formular **Anwesenheit → Einrichtung** für Gottesdienstzeiten in B1Admin (`B1Admin/src/attendance/components/ServiceTimeEdit.tsx`, "Check-in-Zeitplan"). `CheckinGateHelper.hasSchedule()` behandelt eine Gottesdienstzeit nur dann als geplant, wenn `dayOfWeek` und `startTime` gesetzt sind; ungeplante Zeiten werden nie zeitlich begrenzt. `isServiceTimeOpen()` berechnet das Fenster in der Ortszeit (`DateHelper.toChurchTime`). Die Zeitzone wird je Gottesdienstzeit durch `CheckinTimeZoneHelper.load()` ermittelt (`Api/src/modules/attendance/helpers/CheckinTimeZoneHelper.ts`): Zuerst gilt die `timezone` des Standorts des Gottesdienstes (`service.campusId`, über `MembershipModuleGateway.loadCampusTimeZones`), dann die `timeZone` der Kirche (in B1Admins Kircheninformationen gesetzt), dann der erste nicht entfernte Standort mit einer `timezone` (`loadCampusTimeZone`) und erst zuletzt `America/New_York`. Der Standort kommt zuerst, weil vielen Kirchen `America/New_York` als Kirchenzeitzone nachträglich eingetragen wurde. Sowohl die Auflistung als auch der Schreibpfad unten lösen die Zeitzone auf dieselbe Weise auf. Das Fenster reicht von `checkinOpenMinutes` vor dem Beginn bis `checkinCloseMinutes` nach dem Ende (oder nach dem Beginn, wenn es kein Ende gibt) und behandelt auch Fenster, die über Mitternacht oder die Wochengrenze reichen.

Das Fenster wird an zwei Stellen durchgesetzt:

- **Auflistung:** `GET /attendance/servicetimes` versieht jede Zeile mit einem berechneten booleschen Wert `checkinOpen`. Der Selbst-Check-in von B1App (`CheckinPage.tsx`) und die Gottesdienstauswahl von B1Checkin (`app/services.tsx`) zeigen jede Zeit an. Sind alle Zeiten eines Gottesdienstes geschlossen, zeigen sie den nächsten Öffnungszeitpunkt ("Check-in öffnet So 9:30 Uhr." in B1App, "Der Check-in für diesen Gottesdienst öffnet So 9:30 Uhr." in B1Checkin, aus `CheckinHelper.opensLabel` / `ServiceTimeHelper.getOpensLabel`). Lässt sich kein Öffnungszeitpunkt berechnen, erscheint "Der Check-in ist für diesen Gottesdienst gerade nicht geöffnet." (der Kiosk bietet eine Zurück-Schaltfläche, um einen anderen Gottesdienst zu wählen). Sonst werden geschlossene Zeiten als nicht wählbare Zeile "Geschlossen" / "Geschlossen · öffnet 9:30 Uhr" dargestellt. Der Haushaltsbildschirm von B1Checkin (`MemberServiceTimes.tsx`) prüft die Öffnung live anhand der Uhr des Geräts mit `ServiceTimeHelper.isCheckinOpen()` (Zeitzone des Geräts, nicht der Kirche), damit ein Kiosk, der dauerhaft läuft, pünktlich öffnet und schließt. Bei einer geschlossenen Zeit, die die Person bereits belegt, zeigt er "Kinderraum 1 · Eingecheckt" (Gruppenname).
- **Schreiben:** innerhalb von `evaluateGates()`, vor der Kapazitäts- und Betreuungsprüfung, weist `findClosedServiceTimeGroups()` den Stapel mit `409 { error: "notOpen", groups: [{ groupId, groupName, reason: "notOpen" }] }` ab, wenn die Gottesdienstzeit einer angesteuerten Sitzung außerhalb ihres Fensters liegt. Da bestehende Besuche des Haushalts für heute mit jedem Check-in erneut gesendet werden, überspringen Sitzungen, die die Person bereits hält (`personId|sessionId` in den bestehenden Besuchen), diese Prüfung. So wird das Hinzufügen einer späteren, geöffneten Gottesdienstzeit nicht abgelehnt, nur weil ein früheres Fenster geschlossen ist. B1Checkin zeigt dies über den harten Prüfbildschirm mit dem Grund "Check-in ist gerade nicht geöffnet" (Kapazitätsverletzungen lauten weiterhin "Raum ist voll oder geschlossen").

### Prüfung von Alter und Klassenstufe (am Kiosk)

Die Eignung von Räumen ist eine beratende Oberflächenfunktion, die am Kiosk ausgewertet und nicht vom Server erzwungen wird. `B1Checkin/src/helpers/EligibilityHelper.ts` vergleicht Geburtsdatum und Klassenstufe einer Person mit `minAgeMonths`/`maxAgeMonths`/`minGrade`/`maxGrade` der Gruppe (Reihenfolge der Klassenstufen: PreK, K, 1–12, Graduated) und liefert `eligible` / `ineligible` / `unknown`. Fehlen Angaben, ergibt sich `unknown`, und der Raum wird nie ausgeblendet. Alter und Klassenstufe werden zum Stichtag des **Datums der Klassenstufenbeförderung** der Kirche berechnet (Einstellung `gradePromotionDate`, `"MM-DD"`, bearbeitet in `B1Admin/src/settings/components/GradePromotionSettingsEdit.tsx`). Der Kiosk holt sie aus `GET /attendance/checkin/settings`, und `resolveAsOfDate` wählt das jüngste Vorkommen am oder vor dem heutigen Tag. Die Raumauswahl hebt geeignete Räume hervor und dunkelt ungeeignete ab; die Wahl eines abgedunkelten Raumes erfordert eine Bestätigung durch Mitarbeitende.

### Vertrauenswürdige und nicht autorisierte Abholung

Abholpersonen sind ein Element des Mitgliedschaftsmoduls, je Haushalt: `householdPickupPeople` (`Api/src/modules/membership/models/HouseholdPickupPerson.ts` — householdId, optionale personId, name, photoUrl, relationship, `status` `trusted` / `notAuthorized`, notes). Die CRUD-Funktionen sind `GET /membership/householdpickup/:householdId` (jeder angemeldete Kirchenbenutzer, damit Kioske lesen können) sowie `POST` / `DELETE`, geschützt durch `people.edit`. Mitarbeitende verwalten die Liste auf der Karte **Abholung** der Personenseite (`B1Admin/src/people/components/PickupPeople.tsx`) -- Foto, Beziehung und ein Statuschip Vertrauenswürdig / Nicht autorisiert.

Beim Check-out (`B1Checkin/app/checkout.tsx`) lädt der Kiosk die Abholliste des Haushalts: Einträge mit `trusted` erscheinen als antippbare Abholkarten neben dem Fotoraster der erwachsenen Haushaltsmitglieder. Ein frei eingegebener Name unter "Andere" wird unscharf (Levenshtein, `src/helpers/PickupMatchHelper.ts`) mit den Einträgen `notAuthorized` verglichen -- bei einem Treffer blockiert der Check-out mit einem Warnblatt und einer Schaltfläche **Überschreiben** für Mitarbeitende. Die Überschreibung wird im Besuch selbst protokolliert: Sie sendet `checkedOutBy` als `"OVERRIDE: {name}"` über den normalen `POST /attendance/visits/checkout`, sodass sie im Anwesenheitsdatensatz und im Webhook `attendance.checkout` landet und nicht in einer eigenen Prüftabelle.

### Eltern benachrichtigen und Notfall-Rundruf

`CheckinController` (`Api/src/modules/attendance/controllers/CheckinController.ts`, `/attendance/checkin`) stellt zwei SMS-Endpunkte bereit:

- `POST /page` — `{ visitId, message }`: benachrichtigt die Erziehungsberechtigten eines eingecheckten Kindes (Check-out-Bildschirm des Kiosks, besetzter Modus).
- `POST /broadcast` — `{ serviceId, message }`: schreibt allen Erwachsenen aller eingecheckten Haushalte eines Gottesdienstes (Admin-Einstellungen des Kiosks, hinter einem Bestätigungsblatt, das den Typ `EMERGENCY` verlangt, in `B1Checkin/app/adminSettings.tsx`).

Beide ermitteln die erwachsenen Haushaltsmitglieder über das Gateway des Mitgliedschaftsmoduls und übergeben die Zustellung an **`MessagingModuleGateway.sendBulkText`** (`Api/src/shared/modules/MessagingModuleGateway.ts`) -- die modulübergreifende Schnittstelle zum konfigurierten SMS-Anbieter der Kirche (`@churchapps/texting`: TextInChurch, Clearstream oder MutualMinistry; ein eingebauter SMS-Versand existiert nicht). Das Gateway protokolliert einen Eintrag `sentText` sowie Einträge `deliveryLog` je Empfänger und begrenzt einen Stapel auf 500 Empfänger. Ist kein Anbieter konfiguriert, liefert es `no_provider`, was der Kiosk als "Kein SMS-Anbieter konfiguriert" anzeigt. Die Methode `dispatch()` des Controllers entfernt doppelte Telefonnummern und überspringt Personen ohne Mobilnummer oder mit gesetztem `optedOut`. Sie liefert `{ sent, failed, skippedOptedOut, skippedNoPhone }`, damit der Kiosk anzeigen kann, was übersprungen wurde.

## Der Kiosk (B1Checkin)

Die Bildschirme sind expo-router-Dateien unter `B1Checkin/app/`. Zustand, der mehrere Bildschirme betrifft, liegt in einer statischen Klasse `CachedData` (`src/helpers/CachedData.ts`) und nicht im React-State.

```
index (boot/auto-login) → selectChurch → services ──▶ lookup ──▶ household ──▶ checkinComplete
                                          │             │  ▲         │ │            │
             loads serviceTimes, groups,  │             │  └─────────┘ └▶ addGuest  └▶ print labels,
             groupServiceTimes,           │             └▶ checkout (manned)           auto-return
             labelTemplates               │                                            to lookup
```

1. **Suche** (`app/lookup.tsx`) — Suche nach Telefonnummer (`GET /membership/people/search/phone?number=`, letzte 4 oder vollständige Nummer) oder nach Name (`GET /membership/people/search?term=`). Die Auswahl eines Treffers lädt den Haushalt (`GET /membership/people/household/{householdId}`) und die bestehenden Besuche (`GET /attendance/visits/checkin`) und befüllt `pendingVisits` mit der Auswahl der Vorwoche.
2. **Prüfung des Haushalts** (`app/household.tsx`, `src/components/MemberList.tsx`) — Jede Mitgliederzeile zeigt ein Abzeichen "bereits eingecheckt", ein Abzeichen für Allergien/`nametagNotes` und die aktuellen Raum-Chips. Beim Aufklappen eines Mitglieds erscheinen alle Gottesdienstzeiten mit einer Raumschaltfläche und den Check-in-Typ-Chips Mitglied / Gast / Ehrenamtlich (`MemberServiceTimes.tsx`). Unter jedem Namen einer Gottesdienstzeit zeigt `ServiceTimeHelper.getGroupSummary()` die dort angebotenen Gruppen (die Namen aus `serviceTime.groups`, gekürzt, ohne Doppelungen ohne Berücksichtigung der Groß-/Kleinschreibung, durch Kommas getrennt); ohne Gruppen wird nichts angezeigt.
3. **Gruppenzuordnung** (`app/selectGroup.tsx`) — ein Kategorienbaum aus `serviceTime.groups`; Räume, deren Alter oder Klassenstufe passt, werden hervorgehoben und ungeeignete hinter einer Bestätigung durch Mitarbeitende abgedunkelt (siehe [Prüfung von Alter und Klassenstufe](#prüfung-von-alter-und-klassenstufe-am-kiosk)). Die Wahl eines Raumes schreibt eine visitSession `{ session: { serviceTimeId, groupId } }` in den offenen Besuch der Person (`src/helpers/VisitSessionHelper.ts`). "Keine" löscht die Zuordnung.
4. **Abschluss** (`app/checkinComplete.tsx`) — `POST /attendance/visits/checkin` mit `pendingVisits` (jeweils mit seinem `checkinType` versehen); druckt danach Etiketten, falls ein Drucker konfiguriert ist, und kehrt automatisch zur Suche zurück. Eine Antwort `409` für Kapazität oder `notOpen` zeigt den genannten Raum mit dem Grund (voll/geschlossen oder Check-in nicht geöffnet); eine Warnung zum Betreuungsschlüssel bietet eine Bestätigung durch Mitarbeitende, die mit `acknowledgeWarnings=true` erneut sendet.

Der Bildschirm **Check-out** (`app/checkout.tsx`) nimmt den 4-stelligen Sicherheitscode über ein automatisch fokussiertes Eingabefeld an -- so funktionieren USB- oder Bluetooth-Tastatur-Barcodescanner ohne Kamera -- oder über eine Bildschirmtastatur mit demselben Alphabet, die bei 4 Zeichen automatisch absendet. Eine Schaltfläche **Scannen** öffnet ein Blatt mit der gemeinsamen Kamera `src/components/CodeScanner.tsx` (standardmäßig rückseitig; akzeptiert QR, Code 128 und Code 39), damit auch Stationen ohne Keil-Scanner das Abholetikett lesen können. Ein gescannter Code läuft über denselben Pfad `handleCode()` wie eine Eingabe. Der Bildschirm sucht den Code, zeigt die Kinder, die abgeholt werden, und bietet die **vertrauenswürdigen Abholpersonen** des Haushalts als antippbare Karten neben einem Fotoraster der erwachsenen Haushaltsmitglieder an (zusätzlich die Option "Andere" für Freitext, die unscharf gegen die nicht autorisierten Namen geprüft wird -- siehe [Vertrauenswürdige und nicht autorisierte Abholung](#vertrauenswürdige-und-nicht-autorisierte-abholung)). Anschließend sendet er `POST /attendance/visits/checkout` mit Name/ID der abholenden Person. Im besetzten Modus bietet der Bildschirm außerdem **Eltern benachrichtigen** (`POST /attendance/checkin/page`) und einen **erneuten Druck des Sicherheitsetiketts** -- `reprint()` erstellt die Etiketten der Familie mit `LabelHelper.getAllLabelsFor(...)` neu und gibt sie über dieselbe Pipeline `PrintUI` wie beim Check-in aus.

Der Stationsmodus ist ein AsyncStorage-Flag `@StationMode` (`"self"` | `"manned"`, umgeschaltet in `app/adminSettings.tsx`). Der besetzte Modus fügt auf dem Suchbildschirm den Einstieg zum Check-out und auf dem Haushaltsbildschirm die Bearbeitung der Personendaten (`POST /membership/people`) hinzu. Der Kiosk ist gegen Missbrauch gehärtet: Eine optionale PIN (`app/setPin.tsx`, `src/components/PinEntryModal.tsx`) schützt die Bildschirme für Administration und Drucker, der Administrationsbildschirm öffnet sich nur nach 7 schnellen Tippern auf das Kopfzeilenlogo, und ein Ruhebildschirm (`src/hooks/useInactivityTimer.ts`) übernimmt zwischen den Familien.

## Selbst-Check-in (B1App)

Mitglieder checken sich über das Portal b1.church auf dem Bildschirm `/mobile/checkin` ein (über `B1App/src/app/[sdSlug]/mobile/components/ScreenRouter.tsx` zu `screens/CheckinPage.tsx` geleitet). Er setzt eine angemeldete Benutzersitzung voraus und durchläuft dieselben vier Schritte wie der Kiosk -- Gottesdienste → Haushalt → Gruppen → Abschluss -- mit denselben Endpunkten; der Zustand liegt in `B1App/src/helpers/CheckinHelper.ts`. Die Unterschiede zum Kiosk: Der Haushalt stammt aus der eigenen `householdId` des angemeldeten Benutzers (kein Suchschritt), und es gibt keinen Etikettendruck. Stattdessen zeigt der Abschlussbildschirm den Sicherheitscode des Stapels als QR-Code (`qrcode.react`) mit dem Hinweis "Zeigen Sie dies an einer Check-in-Station". Ist der Haushalt beim Laden der Seite bereits eingecheckt, zeigt eine Schaltfläche "Check-in-Code anzeigen" den QR-Code aus dem ersten bestehenden Besuch mit einem `securityCode` erneut an (aus `GET /attendance/visits/checkin`). Der Check-in wird beim Absenden sofort gespeichert (es gibt keinen Zwischenstand); der QR-Code dient nur dem Etikettendruck am Kiosk.

**Etikettendruck vom Telefon am Kiosk** (`B1Checkin/app/scan.tsx`, erreichbar über die Schaltfläche "Code scannen" beim QR-Code auf dem Suchbildschirm): Der Kiosk zeigt `CodeScanner` (eine `expo-camera`-`CameraView`, standardmäßig frontal, umschaltbar) und sucht nach QR-Codes. `ScanCodeHelper.parse()` akzeptiert nur eine reine 4-stellige Zeichenfolge aus dem Alphabet des Sicherheitscodes, und `ScanCodeHelper.isRepeat()` ignoriert denselben Code 4 Sekunden lang. So funktionieren sowohl der QR-Code der B1App als auch der QR-Block eines gedruckten Etiketts. Der Bildschirm folgt dann dem Pfad für den erneuten Druck beim Check-out -- `GET /attendance/visits/code/{code}` → `GET /membership/people/ids` → `LabelHelper.getAllLabelsFor(visits, people, code)` → `PrintUI` -- und kehrt zur Suche zurück. Beim Scannen erfolgt kein Schreibvorgang für die Anwesenheit; es werden nur Etiketten gedruckt. Codes ohne aktive Besuche, Stationen ohne Drucker und Gruppen ohne Etikett zeigen jeweils eine Meldung und führen zurück zur Suche.

Typen sowie `ApiHelper`/`ArrayHelper` stammen aus `@churchapps/helpers` und `@churchapps/apphelper`. Mit B1Admin werden keine React-Komponenten geteilt.

## Anwesenheit in der Verwaltung (B1Admin)

- **Einrichtung** — `/attendance` (`B1Admin/src/attendance/AttendancePage.tsx`) zeigt den Strukturbaum und legt Gottesdienste (`ServiceEdit.tsx`) und Gottesdienstzeiten (`ServiceTimeEdit.tsx`) an. Die Standortdaten stammen aus dem Mitgliedschaftsmodul über den Hook `useCampuses()`.
- **Manuelle Anwesenheit** liegt im Bereich Gruppen, nicht im Anwesenheitsbereich: `B1Admin/src/groups/components/GroupSessionsTab.tsx` legt Sitzungen an (`POST /attendance/sessions`; beim Hinzufügen kann `SessionEdit.tsx` für jede andere Gruppe mit derselben Gottesdienstzeit eine Sitzung einschließen und Gruppen überspringen, die an diesem Datum bereits eine Sitzung haben) und markiert Personen über `POST /attendance/visitsessions/log` als anwesend. Dieser Aufruf findet oder erstellt den Besuch der Person für die Sitzung. Gruppenleitungen können die Anwesenheit ihrer eigenen Gruppen ohne die Berechtigung `attendance.edit` erfassen -- die Controller prüfen `au.leaderGroupIds`.
- **Berichte** — Anwesenheitstrend und Gruppenanwesenheit sind serverseitig definierte Berichte (`B1Admin/src/components/reporting/ReportWithFilter.tsx` gegen ReportingApi; Definitionen in `Api/reports/*.json`). Beide nehmen `startDate`/`endDate` entgegen (Enddatum einschließlich). Der Trendbericht umfasst standardmäßig ein Jahr bis heute und ergänzt eine Spalte `sessionDates` je Woche; die Gruppenanwesenheit zeigt in der Bildschirmansicht zu jedem Besuch den `checkinTime` und den `membershipStatus` der Person. Die CSV-Datei der Gruppenanwesenheit stammt aus dem begleitenden Bericht `groupAttendanceDownload`, den `GroupAttendanceDownloadHelper` in eine Zeile je Gruppenmitglied mit einer Spalte "anwesend/abwesend" je datierter Sitzung umformt. Die Anwesenheitshistorie einer Person lautet `GET /attendance/attendancerecords?personId=` (`B1Admin/src/people/components/PersonAttendance.tsx`).

## Etikettendruck

### Vorlagen und Designer

Kirchen gestalten ihre Etiketten selbst in B1Admin unter `/mobile/checkin/labels` (`B1Admin/src/attendance/LabelsPage.tsx` + `components/LabelEditor.tsx`, erreichbar von der Seite Check-in-Einstellungen). Eine Vorlage ist eine Zeile `labelTemplates`, deren `content` ein JSON-Array von Blöcken ist -- `text`, `field`, `barcode`, `qrcode` oder `box`. Jeder Block ist in Prozentkoordinaten positioniert und hat Schrift, Ausrichtung, Symbologie (`code39`/`code128`/`qr`) und optionale Sichtbarkeitsbedingungen (z. B. das Allergiefeld nur anzeigen, wenn `person.nametagNotes` nicht leer ist). Es gibt zwei `labelType`s: `nametag` (eines pro eingechecktem Mitglied; Felder wie `person.displayName`, `sessions`, `securityCode` und `person.isBirthdayWeek` -- `"true"`, wenn Monat und Tag des Geburtstags innerhalb von 3 Tagen um heute liegen, auch über den Jahreswechsel, berechnet von `LabelHelper.isBirthdayWithin()`) und `pickup` (eines pro Familie; Felder wie `children`, `childrenAllergies`). Der Server erzwingt je Typ und Kirche genau eine Standardvorlage (`LabelTemplateController.save`). Der Designer liefert Startvorlagen, die die gebündelten Etiketten des Kiosks spiegeln, und zeigt Vorschauen mit Beispieldaten.

### Rendern und Drucken am Kiosk

Beim Abschluss des Check-ins entscheidet `B1Checkin/src/helpers/LabelHelper.ts` anhand der Gruppenmerkmale jedes offenen Besuchs, was gedruckt wird: Namensschilder für Gruppen mit `printNametag` und ein Familien-Abholetikett, sobald ein Besuch eine Gruppe mit `parentPickup` getroffen hat. Besuche mit `checkinType` `volunteer` übergeht `LabelHelper.selectChildVisits()`, sodass eine Betreuungsperson in einem Abholraum nie ein Abholetikett auslöst. Der Sicherheitscode aus der Check-in-Antwort kommt auf die Namensschilder der Kinder und auf das Abholetikett; Namensschilder Erwachsener werden ohne Code gedruckt. Hat die Kirche Vorlagen, macht `LabelRenderer` (`src/helpers/LabelRenderer.ts`) aus den Blöcken und einem Feldkontext ein eigenständiges HTML-Dokument. Andernfalls werden die gebündelten HTML-Etiketten aus `B1Checkin/assets/labels/` mit Platzhaltern verwendet.

Barcodes entstehen als eingebettetes SVG durch reine TypeScript-Encoder in `B1Checkin/src/helpers/barcode.ts` -- Code-39-Musterwerte und Code 128 (Codesatz B mit Prüfsumme mod 103) sowie QR über das Paket `qrcode`. **Diese Encoder sind bewusst in B1Admin dupliziert** (`LabelEditor.tsx` übernimmt dieselben Tabellen, im Code-Kommentar vermerkt), damit die Vorschau des Designers pixelgenau dem Ausdruck am Kiosk entspricht. Eine Änderung an einer Stelle muss an der anderen gespiegelt werden.

Die Druckpipeline (`src/components/PrintUI.tsx`) rendert jedes HTML-Etikett in einer `WebView`, nimmt es über `react-native-view-shot` als JPG auf und übergibt die Bild-URIs an das native Expo-Modul **printer-helper** (`B1Checkin/modules/printer-helper/`). Das Modul stellt `scan()`, `checkInit()`, `printUris()` und Statusereignisse bereit, mit einem Anbieter je Marke auf beiden Plattformen:

| Marke | Android | iOS | Hinweise |
|-------|---------|-----|-------|
| Brother | `BrotherProvider.kt` (Brother-Druck-SDK) | `BrotherProvider.swift` (`BRLMPrinterKit.xcframework`) | Netzwerkdrucker der QL-Serie (QL-800/810W/820NWB/1100/1110NWB…), Stanzetiketten 29×90, die empfohlene Vorgabe |
| Zebra | `ZebraProvider.kt` (Link-OS-SDK) | `ZebraProvider.swift` + `ZebraBridge` | Netzwerkerkennung + TCP-Druck von Bildern in ZPL |

Die Druckerauswahl liegt unter `app/printers.tsx` (der Netzwerkscan liefert Einträge `brand~model~ip`; die Auswahl wird in AsyncStorage gespeichert). `src/helpers/PrinterLog.ts` führt ein Diagnoseprotokoll auf dem Gerät, das über einen Live-Statuspunkt in der Kopfzeile des Kiosks sichtbar ist.

## Gastregistrierung

Zwei Wege legen mitten im Check-in eine Person an:

- **Am Kiosk** — Die Schaltfläche "Gast hinzufügen" des Haushaltsbildschirms öffnet `B1Checkin/app/addGuest.tsx`. Sie sucht zuerst per `GET /membership/people/search?term=` nach einem bestehenden Treffer, der kein Mitglied ist, und legt andernfalls über `POST /membership/people` eine neue Person an, die dem aktuellen Haushalt zugeordnet wird. Der Gast durchläuft danach die Gruppenzuordnung wie jedes Mitglied.
- **Selbstbedienung per QR-Code** — Ist die Kircheneinstellung `enableQRGuestRegistration` aktiv (eingerichtet in den Check-in-Einstellungen von B1Admin, gelesen aus `GET /membership/settings/public/{churchId}`), zeigt der Suchbildschirm des Kiosks einen QR-Code, der auf `https://{subdomain}.b1.church/guest-register?serviceId=` verweist. Diese Seite der B1App (`src/app/[sdSlug]/(public)/guest-register/page.tsx`) lässt eine Besucherfamilie sich über das eigene Telefon registrieren, über den anonymen Endpunkt `POST /membership/people/guest-register`, sodass die Schlange am Kiosk weiterläuft. Das QR-Blatt hat außerdem die Schaltfläche **Hier registrieren**, die dieselbe Seite am Kiosk (`app/guestRegister.tsx`) in einer `WebView` ohne Cache im Inkognitomodus öffnet; `src/helpers/GuestRegisterHelper.ts` erzeugt die URL für QR-Code und `WebView` und blockiert Navigation außerhalb von `https://{subdomain}.b1.church/guest-register`. Der Bildschirm kehrt bei **Fertig**, Zurück oder nach 120 Sekunden Inaktivität zur Suche zurück (Tippen im Formular wird von der `WebView` als Aktivität gemeldet). Dabei wird die `WebView` entfernt, sodass die Eingaben einer Familie nie die nächste erreichen.

Die QR-Anmeldung wird über die Kircheneinstellungen gesteuert, die auf der Karte **QR-Gastregistrierung** in B1Admin gespeichert werden (`src/mobile/CheckInPage.tsx`):

| Einstellung | Sichtbarkeit | Zweck |
|---|---|---|
| `enableQRGuestRegistration` | öffentlich | Opt-in-Schalter für den QR-Code am Kiosk und die anonymen Endpunkte |
| `guestRegistrationFields` | öffentlich | JSON-Zuordnung von `email`, `phone`, `address`, `birthDate`, `gender`, `maritalStatus`, `grade`, `comments` → `"off"` / `"optional"` / `"required"`. Standard: E-Mail und Telefon optional, der Rest aus. Vor- und Nachname sind immer Pflicht |
| `guestRegistrationImage` | öffentlich | URL des Kopfbilds; die B1App zeigt es im Format 16:9 anstelle des Symbols auf dem Formular und dem Bestätigungsbildschirm |
| `guestRegistrationGroupId` | privat | Gruppe, der jede Anmeldung hinzugefügt wird (Gäste sehen oder wählen sie nie) |
| `guestRegistrationRecordAttendance` | privat | `"true"`, um für diese Gruppe außerdem die Anwesenheit zu erfassen |

Die Komponente `src/components/checkin/GuestRegister.tsx` der B1App lädt die Checkliste vom anonymen Endpunkt `GET /membership/people/guest-register/options?churchId=` und zeigt nur die aktivierten Felder an (E-Mail, Telefon, Familienstand und Adresse bei der Hauptperson; Geburtsdatum, Geschlecht und Klassenstufe je Mitglied; ein Kommentarfeld) und sendet nur diese. Der Server wendet die Checkliste in `GuestRegistrationHelper.sanitize()` erneut an -- deaktivierte Felder werden verworfen, fehlende Pflichtfelder oder Werte außerhalb der Liste ergeben 400 -- bevor `PersonHelper.registerGuestHousehold()` läuft. Diese Funktion ruft für jedes Mitglied mit E-Mail oder Telefon zuerst `PersonRepo.findGuestMatch()` auf: Genau eine lebende Person mit demselben Vornamen und derselben E-Mail oder denselben Telefonziffern wird wiederverwendet; null oder mehrere Treffer legen eine neue Person an, sodass nie geraten wird. Ein Mitglied ohne Kontaktdaten wird über den Vornamen innerhalb des zugeordneten Haushalts gesucht. Wiederverwendete Personen werden nie verändert, sodass ein anonymes Formular gespeicherte Daten nicht überschreiben kann; die Antwort gibt die übermittelten Namen zurück. Nicht zugeordnete Mitglieder treten dem zugeordneten Haushalt bei oder bilden einen neuen Haushalt als `membershipStatus: "Visitor"`, wobei für jede neue Person `person.created` ausgelöst wird. Danach werden Fehler protokolliert statt zurückgegeben: Die Mitglieder werden der konfigurierten Gruppe hinzugefügt (`group.member.added`). Ist die Erfassung der Anwesenheit aktiv, markiert `AttendanceModuleGateway.recordAttendance()` jedes Mitglied als anwesend für jede Gottesdienstzeit der Gruppe, die einen Zeitplan hat und deren Check-in-Fenster (`CheckinGateHelper.isServiceTimeOpen`) gerade offen ist. Dabei wird die Sitzung für das heutige Datum der Kirchenzeitzone bei Bedarf angelegt. Ungeplante Gottesdienstzeiten und Anmeldungen außerhalb des Fensters erfassen nichts. Kommentare werden zu einer verborgenen Notizunterhaltung zur Person der Hauptperson (Nachrichtenautor "Gastanmeldung"), verknüpft über `person.conversationId`.

## Verwandte Seiten

- [Anwesenheits-Endpunkte](../api/endpoints/attendance) -- Vollständige REST-Schnittstelle für Standorte, Gottesdienste, Sitzungen, Besuche und Besuchssitzungen
- [Mitgliedschafts-Endpunkte](../api/endpoints/membership) -- Personen, Haushalte und Gruppen
- [Webhooks](../api/webhooks) -- Die Ereignisse `session.created`, `attendance.recorded` und `attendance.checkout`
- [Modulstruktur](../api/module-structure) -- Wie das Anwesenheitsmodul serverseitig organisiert ist
