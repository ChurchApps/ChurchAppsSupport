---
title: "Check-ins"
---

# Check-ins

<div class="article-intro">

Check-in ist ein einziges System mit drei Zugängen: die B1Checkin-Kiosk-App für besetzte und selbstbediente Stationen, der Selbst-Check-in im B1App-Mitgliederportal und die Anwesenheitsverwaltung in B1Admin. Alle drei schreiben in dasselbe Anwesenheitsmodul der zentralen Api, und die Raumzuweisung erfolgt ausschließlich über Gruppen – es gibt keine eigene Entität für "Standorte" oder "Räume". Darüber liegt eine Kindersicherheits-Schicht mit Check-in-Typen pro Besuch, serverseitigen Kapazitäts- und Betreuerschlüssel-Prüfungen, altersbezogenen Berechtigungsprüfungen am Kiosk, der Verifizierung abholberechtigter Personen beim Check-out und der Benachrichtigung der Eltern über den SMS-Anbieter der Kirche. Diese Seite beschreibt das Datenmodell, die Check-in-Abläufe, die Sicherheitsschicht und die Pipeline für den Etikettendruck.

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

| Oberfläche | Repository | Stack | Aufgabe |
|---------|------|-------|------|
| Kiosk | `B1Checkin` | Expo / React Native, Dateirouting mit expo-router; EAS-Builds für Android, Amazon Fire und iOS; OTA-Updates über `expo-updates` | Besetzte oder selbstbediente Station mit Etikettendruck und verifiziertem Check-out |
| Selbst-Check-in | `B1App` | Next.js (b1.church-Mitgliederportal) | Angemeldete Mitglieder checken ihren Haushalt per Smartphone ein; kein Druck |
| Admin | `B1Admin` | React SPA | Konfiguriert die Gottesdienststruktur, weist Gruppen Gottesdienstzeiten zu, gestaltet Etiketten, erfasst manuelle Anwesenheit und erstellt Berichte |

Alle drei greifen über `ApiHelper` auf dieselben beiden API-Module zu: **MembershipApi** (`/membership`) für Personen, Haushalte und Gruppen sowie **AttendanceApi** (`/attendance`) für alles Weitere auf dieser Seite.

## Datenmodell (`Api/src/modules/attendance`)

| Entität / Tabelle | Wichtige Felder | Bedeutung |
|----------------|-----------|---------|
| `campuses` | name, address | Veraltet – Standorte werden im Mitgliedermodul gepflegt (`/membership/campuses`); die Kopie im Anwesenheitsmodul ist für ältere Lesezugriffe eingefroren und nur lesbar (`models/Campus.ts`) |
| `services` | campusId, name | Eine wiederkehrende Zusammenkunft, z. B. "Sonntagmorgen" (`models/Service.ts`) |
| `serviceTimes` | serviceId, name, dayOfWeek, startTime, endTime, checkinOpenMinutes, checkinCloseMinutes | Ein Zeitfenster innerhalb eines Gottesdienstes, z. B. "9:00 Uhr" (`models/ServiceTime.ts`). Die Zeitplan-Spalten sind optional (Migration `tools/migrations/attendance/2026-10-10_service_time_schedule.ts`) und steuern das [Check-in-Fenster](#scheduled-check-in-windows) |
| `groupServiceTimes` | groupId, serviceTimeId | Verknüpfungstabelle: welche Gruppen (Klassenräume) zu welchen Gottesdienstzeiten zusammenkommen (`models/GroupServiceTime.ts`) |
| `sessions` | groupId, serviceTimeId, sessionDate | Ein Treffen einer Gruppe an einem Datum – wird erst zur Check-in-Zeit bei Bedarf angelegt (`models/Session.ts`) |
| `visits` | personId, serviceId, visitDate, checkinTime, securityCode, checkinType, checkedInById, checkoutTime, checkedOutBy, checkedOutById | Der Besuch einer Person an einem Datum (`models/Visit.ts`). `checkinType` ist `member` / `guest` / `volunteer` (NULL = älterer Mitgliedseintrag); wird vom Kiosk gesetzt und von den Kapazitäts- und Betreuerschlüssel-Prüfungen ausgewertet |
| `visitSessions` | visitId, sessionId | Welche Sitzung(en) ein Besuch abdeckt – ein Kind, das zu zwei Gottesdienstzeiten eingecheckt ist, erhält zwei Zeilen (`models/VisitSession.ts`) |
| `labelTemplates` | name, labelType (`nametag`/`pickup`), width, height, isDefault, content (JSON-Blöcke) | Frei gestaltbare Etikettenlayouts (`models/LabelTemplate.ts`) |

### So wird ein abgeschlossener Check-in gespeichert

`VisitController.postCheckin` (`Api/src/modules/attendance/controllers/VisitController.ts`) verarbeitet `POST /attendance/visits/checkin?serviceId=&peopleIds=`. Der Body ist ein Array von `Visit`-Objekten; jedes enthält `visitSessions`, deren eingebettete `session` nur ein Paar `(serviceTimeId, groupId)` angibt. Der Server führt dann folgende Schritte aus:

1. **Prüft Kapazität und Schlüssel, bevor etwas geschrieben wird.** `evaluateGates()` → `CheckinGateHelper.evaluate()` prüft für jeden angesprochenen Raum Kapazität, Gästekapazität, das Schließ-Flag und den Betreuerschlüssel gegen die aktuelle Belegung. postCheckin ist **nicht transaktional**, daher muss die Prüfung vor dem ersten Speichern laufen: Bei einem harten Verstoß kommt ein 409 mit den betroffenen Räumen zurück, und nichts wird gespeichert. Siehe [Kapazitäts- und Betreuerschlüssel-Prüfung](#capacity-and-volunteer-ratio-gates).
2. **Löst Sitzungen verzögert auf.** `getSessionId()` findet oder erstellt die Zeile in `sessions` für `(groupId, serviceTimeId, heute)`; Sitzungs-IDs werden pro Datum im Prozess zwischengespeichert. Neue Sitzungen lösen einen `session.created`-Webhook aus. Die Schleife ist ein awaited `for..of` – ein früheres fire-and-forget `forEach(async …)` lief dem Speichern voraus und schrieb bei der Erstellung der ersten Sitzung NULL-sessionIds (behoben; im Code an der Schleife kommentiert).
3. **Ersetzt die Datensätze des Tages.** Bestehende Besuche dieser Personen bei diesem Gottesdienst heute werden samt ihren visitSessions gelöscht, dann wird der übermittelte Satz gespeichert. Ein erneuter Check-in einer Familie ist daher ein idempotenter Vorgang, der den „aktuellen Stand“ setzt, und kein Anhängen. Mit `?checkDuplicates=true` wird stattdessen `{ duplicates: [personId…] }` ohne Schreibvorgang zurückgegeben; so warnt der Kiosk, bevor er überschreibt.
4. **Erzeugt pro Batch einen Sicherheitscode.** `SecurityCodeHelper.generate()` erzeugt einen 4-stelligen Code aus dem Zeichensatz `23456789BCDFGHJKLMNPQRSTVWXYZ` (ohne Vokale und mehrdeutige Zeichen, damit Codes keine Wörter bilden und nicht verwechselt werden). Bei einer Kollision mit offenen Besuchen derselben Kirche am selben Tag wird der Server wiederholt, und der Code wird auf jeden Besuch des Batches gesetzt.
5. **Gibt `{ streaks, securityCode }` zurück.** `streaks` ordnet jeder personId die Anzahl aufeinanderfolgender Wochen mit Anwesenheit zu; der Kiosk feiert Meilensteine (jede 5. Woche) mit Konfetti.

Jeder gespeicherte Besuch löst außerdem einen `attendance.recorded`-Webhook aus. Die Leseseite, `GET /attendance/visits/checkin`, liefert die Besuche der Personen ab ihrem **letzten erfassten Datum**. Lag dieses in einer früheren Woche, werden die IDs entfernt – der Client erhält dann eine vorausgefüllte Kopie der Raumauswahl der letzten Woche, die beim Speichern als neue Datensätze angelegt wird.

### Check-out

Zwei Endpunkte schließen den Ablauf ab (`VisitController`):

- `GET /attendance/visits/code/:code` – die heute noch nicht ausgecheckten Besuche mit diesem Sicherheitscode, mit geladenen Sitzungen.
- `POST /attendance/visits/checkout` – Body `{ visitIds, checkedOutBy?, checkedOutById? }`; setzt `checkoutTime` und vermerkt, wer abgeholt hat, und löst pro Besuch einen `attendance.checkout`-Webhook aus.

Berechtigungen: Kioske authentifizieren sich mit `attendance.checkin`, das genau den Bereich Check-in, Check-out und Etikettenvorlagen abdeckt; `attendance.view` und `attendance.edit` gelten für Berichte und manuelle Erfassung; die Struktur (Gottesdienste, Gottesdienstzeiten, Gruppenzuweisungen) erfordert `services.edit`. Der Selbst-Check-in von Mitgliedern (B1App) benötigt keine Berechtigung: Jeder angemeldete Benutzer mit einer verknüpften Person in der Kirche darf `GET`/`POST /attendance/visits/checkin` aufrufen, und der Server beschränkt die übermittelten `personId`s auf den eigenen Haushalt des Aufrufers (sonst 403). Diese Absicherung verhindert, dass die `securityCode`s anderer Familien lesbar werden. Die Mitgliedschaft ist also die Berechtigung; ob Mitglieder die Funktion *sehen*, steuern die Navigations-Tabs der B1App der Kirche. Die übrigen Check-in-Endpunkte (`code/:code`, `checkout`, `guardians`, `CheckinController`) bleiben Kiosk- und Personal-Endpunkten vorbehalten.

## Gruppen steuern die Raumzuweisung

Im gesamten System gibt es keine Raum- oder Klassenraum-Entität. Ein "Raum" ist eine Mitgliedschafts-**Gruppe** mit aktiviertem `trackAttendance`, die über `groupServiceTimes` mit einer oder mehreren Gottesdienstzeiten verknüpft ist. Die Gruppenfelder (in `Api/src/modules/membership/models/Group.ts`), die das Kiosk-Verhalten bestimmen:

| Feld | Wirkung |
|------|----------|
| `trackAttendance` | Die Gruppe nimmt überhaupt an der Anwesenheitserfassung teil; der Einrichtungsbaum in B1Admin markiert `trackAttendance`-Gruppen ohne `groupServiceTimes`-Eintrag als nicht zugewiesen |
| `parentPickup` | Kennzeichnet einen Kinderraum: Ein Check-in dorthin macht den Besuch zu einem "Kind"-Besuch, der ein Abhol-Etikett für die Familie druckt und den Sicherheitscode auf das Namensschild setzt |
| `printNametag` | Ob Check-ins in diese Gruppe überhaupt ein Namensschild drucken |
| `capacity` / `guestCapacity` / `checkinClosed` | Raumkapazitäten und ein hartes "geschlossen"-Flag, serverseitig durch die Check-in-Prüfung durchgesetzt (bearbeitbar in B1Admin unter den Gruppeneinstellungen unter "Check-In-Kapazität") |
| `volunteerRatio` / `minVolunteers` | Schlüssel Kinder pro Betreuer und Mindestanzahl an Betreuern, durchgesetzt gemäß der kirchenweiten Einstellung `ratioEnforcement` |
| `minAgeMonths` / `maxAgeMonths` / `minGrade` / `maxGrade` | Alters- und Klassenstufen-Grenzen, die am Kiosk ausgewertet werden, um Räume hervorzuheben oder abzudunkeln |

Alle Clients verarbeiten die Daten auf dieselbe Weise (z. B. `B1Checkin/app/services.tsx`, `B1App/src/app/[sdSlug]/mobile/components/screens/CheckinPage.tsx`): Sie laden parallel `GET /attendance/servicetimes?serviceId=`, `GET /attendance/groupservicetimes` und `GET /membership/groups` und sammeln dann für jede Gottesdienstzeit die Gruppen, deren `groupServiceTimes`-Eintrag auf sie zeigt, in `serviceTime.groups`. Dieses Array zeigt die Raumauswahl an, gegliedert nach der `categoryName` der Gruppe.

Zuweisungen werden auf der Gruppenseite in B1Admin bearbeitet (`B1Admin/src/groups/components/ServiceTimesEdit.tsx` – `POST`/`DELETE /attendance/groupservicetimes`). Der gesamte Baum Standort → Gottesdienst → Gottesdienstzeit → Gruppe wird in `B1Admin/src/attendance/components/AttendanceSetup.tsx` über `GET /attendance/attendancerecords/tree` visualisiert.

:::info
Da Gruppen die einzige Quelle der Wahrheit sind, speisen dieselben Gruppenzugehörigkeiten das Routing am Kiosk, die listenartige Anwesenheitserfassung auf den Gruppenseiten in B1Admin und die Anwesenheitsberichte. Eine Gruppe einer Gottesdienstzeit zuzuweisen ist der einzige Schritt, damit sie zu einem Check-in-Ziel wird.
:::

## Kindersicherheit

### Check-in-Typen

Jeder Besuch hat einen `checkinType` – `member`, `guest` oder `volunteer` (NULL bedeutet älteres Mitglied; Migration `tools/migrations/attendance/2026-07-03_checkin_type.ts`). Der Typ wird **am Kiosk** gewählt: über die Chips Mitglied / Gast / Betreuer in der aufgeklappten Mitgliederzeile (`B1Checkin/src/components/MemberServiceTimes.tsx`) und wird beim Abschluss jedem ausstehenden Besuch zugewiesen (`app/checkinComplete.tsx`, Standard ist `member`). Der Server wertet ihn bei der Prüfung aus: Betreuer zählen für den Betreuerschlüssel, statt die Kapazität zu belegen, und Gäste zählen gegen `guestCapacity`.

### Kapazitäts- und Betreuerschlüssel-Prüfung

`CheckinGateHelper.evaluate()` (`Api/src/modules/attendance/helpers/CheckinGateHelper.ts`) läuft in `postCheckin` vor jedem Speichern (der Endpunkt ist nicht transaktional, daher ist die Prüfung vor dem Speichern der Mechanismus für die Korrektheit). Sie lädt die aktuelle Belegung je angesprochener Gruppe (`VisitRepo.countActiveByGroupToday`) und die Gruppenkonfiguration über das Gateway des Mitgliedermoduls und ordnet dann Verstöße ein:

- **Hart (blockiert immer):** `checkinClosed`, `aktuell + eingehend > capacity`, Gästeanzahl über `guestCapacity`. Der Batch wird mit `409 { error: "capacity", groups: [{ groupId, groupName, reason }] }` abgelehnt – der Kiosk zeigt den betroffenen Raum an.
- **Schlüssel (warnen oder blockieren):** eingehende Nicht-Betreuer in einen Raum, in dem `volunteers < minVolunteers` gilt, keine Betreuer vorhanden sind oder `children > volunteers × volunteerRatio`. Die Schwere richtet sich nach der kirchenspezifischen Einstellung `ratioEnforcement` (`"warn"` als Standard / `"block"`, bearbeitbar in B1Admin unter Kirche verwalten → Check-In, `CheckinSettingsEdit.tsx`). Im Warnmodus kommt `409 { warning: true, error: "ratio", … }` zurück, sofern der Client nicht mit `acknowledgeWarnings=true` erneut sendet – dieses erneute Senden ist die Bestätigungsüberschreibung durch das Personal am Kiosk.

### Geplante Check-in-Fenster

Eine Gottesdienstzeit kann einen optionalen wöchentlichen Zeitplan haben (`dayOfWeek` 0–6, wobei 0 = Sonntag; `startTime`/`endTime` als `HH:mm`; `checkinOpenMinutes`, `checkinCloseMinutes`). Er wird im Formular der Gottesdienstzeit unter **Anwesenheit → Einrichtung** in B1Admin bearbeitet (`B1Admin/src/attendance/components/ServiceTimeEdit.tsx`, "Check-in-Zeitplan"). `CheckinGateHelper.hasSchedule()` betrachtet eine Gottesdienstzeit nur dann als geplant, wenn sowohl `dayOfWeek` als auch `startTime` gesetzt sind; ungeplante Zeiten werden nie zeitlich begrenzt. `isServiceTimeOpen()` berechnet das Fenster in der lokalen Wanduhrzeit (`DateHelper.toChurchTime`). Die Zeitzone wird pro Gottesdienstzeit durch `CheckinTimeZoneHelper.load()` ermittelt (`Api/src/modules/attendance/helpers/CheckinTimeZoneHelper.ts`): Zuerst gilt die `timezone` des Standorts des Gottesdienstes (`service.campusId`, über `MembershipModuleGateway.loadCampusTimeZones`), dann die `timeZone` der Kirche (in B1Admin unter Kircheninformationen gesetzt), danach der erste nicht entfernte Standort mit einer `timezone` (`loadCampusTimeZone`), und erst zuletzt `America/New_York`. Der Standort kommt zuerst, weil bei vielen Kirchen `America/New_York` nachträglich als Kirchenzeitzone eingetragen wurde. Sowohl die Auflistung als auch der Speichervorgang weiter unten lösen die Zeitzone auf dieselbe Weise auf. Das Fenster beginnt `checkinOpenMinutes` vor dem Start und endet `checkinCloseMinutes` nach dem Ende (oder nach dem Start, wenn kein Ende angegeben ist); es berücksichtigt Fenster, die über Mitternacht oder die Wochengrenze reichen.

Das Fenster wird an zwei Stellen durchgesetzt:

- **Auflistung:** `GET /attendance/servicetimes` versieht jede Zeile mit einem berechneten Wahrheitswert `checkinOpen`. Der Selbst-Check-in der B1App (`CheckinPage.tsx`) und die Gottesdienstauswahl der B1Checkin (`app/services.tsx`) zeigen jede Zeit an. Sind alle Zeiten eines Gottesdienstes geschlossen, zeigen sie den nächsten Öffnungszeitpunkt an ("Check-in öffnet So 9:30 Uhr." in der B1App, "Check-in für diesen Gottesdienst öffnet So 9:30 Uhr." in der B1Checkin, aus `CheckinHelper.opensLabel` / `ServiceTimeHelper.getOpensLabel`). Lässt sich kein Öffnungszeitpunkt berechnen, erscheint "Check-in ist für diesen Gottesdienst gerade nicht geöffnet." (der Kiosk bietet dann eine Zurück-Schaltfläche, um einen anderen Gottesdienst zu wählen). Andernfalls werden geschlossene Zeiten als nicht auswählbare Zeile "Geschlossen" bzw. "Geschlossen · öffnet 9:30 Uhr" dargestellt. Der Haushaltsbildschirm der B1Checkin (`MemberServiceTimes.tsx`) prüft die Öffnung live anhand der Geräteuhr mit `ServiceTimeHelper.isCheckinOpen()` (Zeitzone des Geräts, nicht der Kirche), damit ein dauerhaft laufender Kiosk pünktlich öffnet und schließt. Bei einer geschlossenen Zeit, für die die Person bereits eingecheckt ist, zeigt er "Kinderraum 1 · Eingecheckt" (Gruppenname).
- **Übermittlung:** Innerhalb von `evaluateGates()`, vor der Kapazitäts- und Schlüsselprüfung, lehnt `findClosedServiceTimeGroups()` den Batch mit `409 { error: "notOpen", groups: [{ groupId, groupName, reason: "notOpen" }] }` ab, wenn die Gottesdienstzeit einer angesprochenen Sitzung außerhalb ihres Fensters liegt. Da bestehende Besuche eines Haushalts für heute bei jedem Check-in erneut übermittelt werden, überspringen Sitzungen, die die Person bereits hält (`personId|sessionId` in den bestehenden Besuchen), diese Prüfung. So wird eine später liegende offene Gottesdienstzeit nicht abgelehnt, nur weil ein früheres Fenster bereits geschlossen ist. B1Checkin zeigt dies über den Bildschirm für harte Prüfungen mit dem Grund "Check-in ist gerade nicht geöffnet" an (Kapazitätsverstöße lauten weiterhin "Raum ist voll oder geschlossen").

### Altersbezogene Berechtigung und Klassenstufe (am Kiosk)

Die Berechtigung für Räume ist eine beratende Oberfläche, die am Kiosk ausgewertet und nicht vom Server erzwungen wird. `B1Checkin/src/helpers/EligibilityHelper.ts` vergleicht das Geburtsdatum und die Klassenstufe einer Person mit den Grenzen `minAgeMonths`/`maxAgeMonths`/`minGrade`/`maxGrade` der Gruppe (Reihenfolge der Klassenstufen: PreK, K, 1–12, Graduated) und liefert `eligible` / `ineligible` / `unknown` zurück. Fehlende Daten ergeben `unknown` und blenden einen Raum nie aus. Alter und Klassenstufe werden zum Stichtag der **Klassenstufen-Versetzung** der Kirche berechnet (Einstellung `gradePromotionDate`, Format `"MM-DD"`, bearbeitbar in `B1Admin/src/settings/components/GradePromotionSettingsEdit.tsx`); der Kiosk lädt sie über `GET /attendance/checkin/settings`, und `resolveAsOfDate` wählt das letzte Vorkommen am heutigen Tag oder davor. Die Raumauswahl hebt berechtigte Räume hervor und dunkelt nicht berechtigte ab; das Auswählen eines abgedunkelten Raums erfordert eine Bestätigung durch das Personal.

### Abholung durch vertrauenswürdige und nicht berechtigte Personen

Abholpersonen sind eine Entität der Mitgliedschaft, pro Haushalt: `householdPickupPeople` (`Api/src/modules/membership/models/HouseholdPickupPerson.ts` – householdId, optionale personId, Name, photoUrl, Beziehung, `status` `trusted` / `notAuthorized`, Notizen). Die Verwaltung erfolgt über `GET /membership/householdpickup/:householdId` (jeder angemeldete Benutzer der Kirche, damit Kioske die Liste lesen können) sowie `POST` / `DELETE`, geschützt durch `people.edit`. Das Personal pflegt die Liste auf der Karte **Abholung** der Personenseite (`B1Admin/src/people/components/PickupPeople.tsx`) – mit Foto, Beziehung und einem Chip für den Status Vertrauenswürdig / Nicht berechtigt.

Beim Check-out (`B1Checkin/app/checkout.tsx`) lädt der Kiosk die Abholliste des Haushalts: Einträge mit `trusted` erscheinen als antippbare Abholkarten neben dem Fotoraster der erwachsenen Haushaltsmitglieder. Ein frei eingegebener Name unter "Andere" wird per Levenshtein-Distanz (`src/helpers/PickupMatchHelper.ts`) mit den Einträgen `notAuthorized` abgeglichen. Bei einer Übereinstimmung wird der Check-out mit einem Warnblatt und einer Schaltfläche **Übersteuern** für das Personal blockiert. Die Übersteuerung wird im Besuch selbst protokolliert: Sie sendet `checkedOutBy` als `"OVERRIDE: {name}"` über den normalen `POST /attendance/visits/checkout`, sodass sie im Anwesenheitsdatensatz und im `attendance.checkout`-Webhook landet, statt in einer eigenen Prüftabelle.

### Eltern benachrichtigen und Notfall-Rundnachricht

`CheckinController` (`Api/src/modules/attendance/controllers/CheckinController.ts`, `/attendance/checkin`) stellt zwei SMS-Endpunkte bereit:

- `POST /page` – `{ visitId, message }`: benachrichtigt die Erziehungsberechtigten eines eingecheckten Kindes (Check-out-Bildschirm des Kiosks, besetzter Modus).
- `POST /broadcast` – `{ serviceId, message }`: sendet allen erwachsenen Mitgliedern aller eingecheckten Haushalte eines Gottesdienstes eine SMS (Einstellungen des Kiosk-Admins, hinter einem Blatt, das die Eingabe von `EMERGENCY` zur Bestätigung verlangt, in `B1Checkin/app/adminSettings.tsx`).

Beide ermitteln die erwachsenen Haushaltsmitglieder über das Mitglieder-Gateway und übergeben die Zustellung an **`MessagingModuleGateway.sendBulkText`** (`Api/src/shared/modules/MessagingModuleGateway.ts`) – die modulübergreifende Schnittstelle zum konfigurierten SMS-Anbieter der Kirche (`@churchapps/texting`: TextInChurch, Clearstream oder MutualMinistry; einen eingebauten SMS-Versand gibt es nicht). Das Gateway protokolliert eine Zeile `sentText` sowie pro Empfänger Einträge in `deliveryLog` und begrenzt einen Batch auf 500 Empfänger. Ist kein Anbieter konfiguriert, gibt es `no_provider` zurück, was der Kiosk als "Kein SMS-Anbieter konfiguriert" anzeigt. Die Methode `dispatch()` des Controllers entfernt doppelte Telefonnummern und überspringt Personen ohne Mobilnummer oder mit gesetztem `optedOut`. Sie gibt `{ sent, failed, skippedOptedOut, skippedNoPhone }` zurück, damit der Kiosk anzeigen kann, was übersprungen wurde.

## Der Kiosk (B1Checkin)

Die Bildschirme sind expo-router-Dateien unter `B1Checkin/app/`; der bildschirmübergreifende Zustand liegt in einer statischen Klasse `CachedData` (`src/helpers/CachedData.ts`) und nicht im React-State.

```
index (Start/Automatische Anmeldung) → selectChurch → services ──▶ lookup ──▶ household ──▶ checkinComplete
                                          │             │  ▲         │ │            │
             lädt serviceTimes, groups,   │             │  └─────────┘ └▶ addGuest  └▶ Etiketten drucken,
             groupServiceTimes,           │             └▶ checkout (besetzt)         automatische Rückkehr
             labelTemplates               │                                            zur Suche
```

1. **Suche** (`app/lookup.tsx`) – Suche nach Telefonnummer (`GET /membership/people/search/phone?number=`, letzte 4 Ziffern oder vollständig) oder nach Name (`GET /membership/people/search?term=`). Bei Auswahl eines Treffers wird der Haushalt (`GET /membership/people/household/{householdId}`) und es werden die bestehenden Besuche (`GET /attendance/visits/checkin`) geladen; damit werden `pendingVisits` mit der Auswahl der letzten Woche vorbefüllt.
2. **Prüfung des Haushalts** (`app/household.tsx`, `src/components/MemberList.tsx`) – jede Mitgliederzeile zeigt ein Abzeichen für bereits eingecheckt, ein Abzeichen für Allergien bzw. `nametagNotes` und die aktuellen Raum-Chips. Beim Aufklappen eines Mitglieds werden alle Gottesdienstzeiten mit einer Raumschaltfläche sowie die Chips für den Check-in-Typ Mitglied / Gast / Betreuer aufgelistet (`MemberServiceTimes.tsx`). Unter jedem Namen einer Gottesdienstzeit zeigt `ServiceTimeHelper.getGroupSummary()` die dort angebotenen Gruppen (die Namen aus `serviceTime.groups`, gekürzt, ohne Groß-/Kleinschreibung dedupliziert und durch Komma getrennt); ist der Zeit keine Gruppe zugeordnet, wird nichts angezeigt.
3. **Gruppenzuweisung** (`app/selectGroup.tsx`) – ein Kategoriebaum aus `serviceTime.groups`, wobei berechtigte Räume hervorgehoben und nicht berechtigte hinter einer Bestätigung durch das Personal abgedunkelt werden (siehe [Altersbezogene Berechtigung](#agegrade-eligibility-kiosk-side)). Die Auswahl eines Raums schreibt eine visitSession `{ session: { serviceTimeId, groupId } }` in den ausstehenden Besuch der Person (`src/helpers/VisitSessionHelper.ts`). "Keine" hebt die Auswahl wieder auf.
4. **Abschluss** (`app/checkinComplete.tsx`) – `POST /attendance/visits/checkin` mit `pendingVisits` (jeweils mit seinem `checkinType` versehen); danach werden Etiketten gedruckt, sofern ein Drucker eingerichtet ist, und die Anzeige kehrt automatisch zur Suche zurück. Eine Antwort `409` für Kapazität oder `notOpen` zeigt den betroffenen Raum mit dem Grund an (voll/geschlossen bzw. Check-in nicht geöffnet); eine Warnung zur Betreuerquote bietet eine Bestätigung durch das Personal, die mit `acknowledgeWarnings=true` erneut sendet.

Der Bildschirm für den **Check-out** (`app/checkout.tsx`) nimmt den 4-stelligen Sicherheitscode über ein automatisch fokussiertes Eingabefeld entgegen – so funktionieren USB- oder Bluetooth-Tastatur-Barcodescanner ohne Kamera – oder über ein Tastenfeld auf dem Bildschirm mit demselben Zeichensatz, das bei 4 Zeichen automatisch absendet. Eine Schaltfläche **Scannen** öffnet ein Blatt mit der gemeinsamen Kamera `src/components/CodeScanner.tsx` (standardmäßig die Rückkamera; akzeptiert QR, Code 128 und Code 39), damit auch Stationen ohne Tastatur-Scanner das Abholetikett lesen können. Ein gescannter Code läuft über denselben Pfad `handleCode()` wie eine Eingabe. Der Bildschirm sucht den Code, zeigt die Kinder an, die abgeholt werden, und präsentiert die **vertrauenswürdigen Abholpersonen** des Haushalts als antippbare Karten neben einem Fotoraster der erwachsenen Haushaltsmitglieder (dazu eine Option "Andere" mit Freitext, die gegen die nicht berechtigten Namen geprüft wird – siehe [Abholung durch vertrauenswürdige und nicht berechtigte Personen](#trusted-and-not-authorized-pickup)). Anschließend sendet er `POST /attendance/visits/checkout` mit Name und ID der ausgewählten Person. Im besetzten Modus bietet der Bildschirm außerdem **Eltern benachrichtigen** (`POST /attendance/checkin/page`) und einen **erneuten Druck des Sicherheitsetiketts** an. `reprint()` erstellt die Etiketten der Familie mit `LabelHelper.getAllLabelsFor(...)` neu und leitet sie durch dieselbe `PrintUI`-Pipeline wie beim Check-in.

Der Stationsmodus ist ein AsyncStorage-Flag `@StationMode` (`"self"` | `"manned"`, umgeschaltet in `app/adminSettings.tsx`). Der besetzte Modus fügt auf dem Suchbildschirm den Einstieg zum Check-out hinzu und ermöglicht auf dem Haushaltsbildschirm das Bearbeiten der Personenprofile (`POST /membership/people`). Die Kiosk-Absicherung ist eingebaut: Eine optionale PIN (`app/setPin.tsx`, `src/components/PinEntryModal.tsx`) schützt die Admin- und Druckerbildschirme, der Admin-Bildschirm öffnet sich nur nach 7 schnellen Tippern auf das Logo in der Kopfzeile, und ein Ruhebildschirm (`src/hooks/useInactivityTimer.ts`) übernimmt zwischen den Familien.

## Selbst-Check-in (B1App)

Mitglieder checken sich über das b1.church-Portal auf dem Bildschirm `/mobile/checkin` ein (weitergeleitet von `B1App/src/app/[sdSlug]/mobile/components/ScreenRouter.tsx` zu `screens/CheckinPage.tsx`). Dafür ist eine Anmeldung erforderlich. Der Ablauf umfasst dieselben vier Schritte wie am Kiosk – Gottesdienste → Haushalt → Gruppen → Abschluss – mit denselben Endpunkten; der Zustand wird in `B1App/src/helpers/CheckinHelper.ts` gehalten. Unterschiede zum Kiosk: Der Haushalt stammt aus der eigenen `householdId` des angemeldeten Benutzers (kein Suchschritt), und es gibt keinen Etikettendruck. Stattdessen zeigt der Abschlussbildschirm den Sicherheitscode des Batches als QR-Code (`qrcode.react`) mit dem Hinweis "Zeigen Sie diesen Code an einer Check-in-Station". Ist der Haushalt bereits eingecheckt, wenn die Seite geladen wird, zeigt eine Schaltfläche "Check-in-Code anzeigen" den QR-Code aus dem ersten bestehenden Besuch (aus `GET /attendance/visits/checkin`) erneut an, der einen `securityCode` trägt. Der Check-in wird beim Absenden sofort erfasst (es gibt keinen ausstehenden Zustand); der QR-Code dient nur dazu, am Kiosk Etiketten zu drucken.

**Etikettendruck vom Telefon am Kiosk** (`B1Checkin/app/scan.tsx`, erreichbar über die Schaltfläche "Code scannen" am QR-Code auf dem Suchbildschirm): Der Kiosk zeigt `CodeScanner` (ein `CameraView` von `expo-camera`, standardmäßig die Frontkamera, umschaltbar), der nach QR-Codes sucht. `ScanCodeHelper.parse()` akzeptiert nur eine Nutzlast, die ein nackter 4-stelliger Code aus dem Zeichensatz des Sicherheitscodes ist, und `ScanCodeHelper.isRepeat()` ignoriert denselben Code für 4 Sekunden. So funktionieren sowohl der QR-Code der B1App als auch der QR-Block eines gedruckten Etiketts. Der Bildschirm folgt anschließend dem Pfad für den erneuten Druck beim Check-out – `GET /attendance/visits/code/{code}` → `GET /membership/people/ids` → `LabelHelper.getAllLabelsFor(visits, people, code)` → `PrintUI` – und kehrt zur Suche zurück. Beim Scannen erfolgt kein Schreibvorgang für die Anwesenheit; es werden nur Etiketten gedruckt. Codes ohne aktive Besuche, Stationen ohne Drucker und Gruppen ohne Etiketten zeigen jeweils eine Meldung an und führen zurück zur Suche.

Typen und `ApiHelper`/`ArrayHelper` stammen aus `@churchapps/helpers` und `@churchapps/apphelper`; React-Komponenten werden mit B1Admin nicht geteilt.

## Anwesenheitsverwaltung (B1Admin)

- **Einrichtung** – `/attendance` (`B1Admin/src/attendance/AttendancePage.tsx`) zeigt den Strukturbaum und erstellt Gottesdienste (`ServiceEdit.tsx`) und Gottesdienstzeiten (`ServiceTimeEdit.tsx`). Standortdaten stammen aus der Mitgliedschaft über den Hook `useCampuses()`.
- **Manuelle Anwesenheit** findet im Bereich Gruppen statt, nicht im Bereich Anwesenheit: `B1Admin/src/groups/components/GroupSessionsTab.tsx` legt Sitzungen an (`POST /attendance/sessions`; beim Hinzufügen kann `SessionEdit.tsx` für jede andere Gruppe, die die gewählte Gottesdienstzeit teilt, eine Sitzung einschließen, wobei Gruppen übersprungen werden, die an diesem Datum bereits eine Sitzung haben). Anwesenheit wird über `POST /attendance/visitsessions/log` erfasst; dieser Endpunkt sucht den Besuch der Person für die Sitzung oder legt ihn an. Gruppenleiter können die Anwesenheit ihrer eigenen Gruppen erfassen, ohne die Berechtigung `attendance.edit` zu besitzen – die Controller prüfen `au.leaderGroupIds`.
- **Berichte** – Anwesenheitstrend und Gruppenanwesenheit sind serverseitig definierte Berichte (`B1Admin/src/components/reporting/ReportWithFilter.tsx` gegen ReportingApi; die Definitionen liegen in `Api/reports/*.json`). Beide nehmen `startDate`/`endDate` entgegen (das Enddatum ist eingeschlossen). Der Trendbericht umfasst standardmäßig den Zeitraum von vor einem Jahr bis heute und fügt eine Spalte `sessionDates` je Woche hinzu. Der Baum der Gruppenanwesenheit auf dem Bildschirm enthält für jeden Besuch die `checkinTime` und den `membershipStatus` der Person. Die CSV-Datei der Gruppenanwesenheit stammt aus dem zugehörigen Bericht `groupAttendanceDownload`, den `GroupAttendanceDownloadHelper` in eine Zeile pro Gruppenmitglied mit einer Spalte für anwesend/abwesend je datierter Sitzung umformt. Der Verlauf je Person ist `GET /attendance/attendancerecords?personId=` (`B1Admin/src/people/components/PersonAttendance.tsx`).

## Etikettendruck

### Vorlagen und Gestaltung

Kirchen gestalten ihre Etiketten selbst in B1Admin unter `/mobile/checkin/labels` (`B1Admin/src/attendance/LabelsPage.tsx` + `components/LabelEditor.tsx`, erreichbar über die Seite Check-in-Einstellungen). Eine Vorlage ist eine Zeile in `labelTemplates`, deren `content` ein JSON-Array aus Blöcken ist – `text`, `field`, `barcode`, `qrcode` oder `box`. Jeder Block ist in Prozentkoordinaten positioniert und hat Schriftart, Ausrichtung, Symbologie (`code39`/`code128`/`qr`) und optionale Sichtbarkeitsbedingungen (z. B. das Allergie-Feld nur anzeigen, wenn `person.nametagNotes` nicht leer ist). Es gibt zwei `labelType`-Werte: `nametag` (eines pro eingecheckter Person; mit Feldern wie `person.displayName`, `sessions`, `securityCode` und `person.isBirthdayWeek` – `"true"`, wenn Monat und Tag des Geburtstags höchstens 3 Tage von heute entfernt sind, auch über den Jahreswechsel, berechnet durch `LabelHelper.isBirthdayWithin()`) und `pickup` (eines pro Familie; mit Feldern wie `children`, `childrenAllergies`). Der Server erzwingt je Typ und Kirche genau eine Standardvorlage (`LabelTemplateController.save`). Der Designer enthält Startvorlagen, die die mitgelieferten Etiketten des Kiosks nachbilden, und zeigt Vorschauen mit Beispieldaten.

### Rendern und Drucken am Kiosk

Bei Abschluss des Check-ins entscheidet `B1Checkin/src/helpers/LabelHelper.ts` anhand der Gruppenmerkmale jedes ausstehenden Besuchs, was gedruckt wird: Namensschilder für Gruppen mit `printNametag`, dazu ein Familien-Abholetikett, falls ein Besuch eine Gruppe mit `parentPickup` getroffen hat. Besuche mit `checkinType` `volunteer` werden von `LabelHelper.selectChildVisits()` übersprungen, sodass eine Betreuungsperson in einem Raum mit Elternabholung nie ein Abholetikett auslöst. Der Sicherheitscode aus der Check-in-Antwort wird auf die Namensschilder der Kinder und das Abholetikett gesetzt; Namensschilder für Erwachsene werden ohne Code gedruckt. Hat die Kirche Vorlagen, wandelt `LabelRenderer` (`src/helpers/LabelRenderer.ts`) die Blöcke samt Feldkontext in ein eigenständiges HTML-Dokument um. Andernfalls werden die mitgelieferten HTML-Etiketten in `B1Checkin/assets/labels/` mit Platzhalterersetzung verwendet.

Barcodes entstehen als Inline-SVG über reine TypeScript-Encoder in `B1Checkin/src/helpers/barcode.ts` – Code-39-Musterklassen und Code-128-Breitentabellen (Zeichensatz B mit Prüfsumme Modulo 103) sowie QR-Codes über das Paket `qrcode`. **Diese Encoder sind bewusst in B1Admin dupliziert** (`LabelEditor.tsx` enthält dieselben Tabellen, was in einem Code-Kommentar vermerkt ist), damit die Vorschauen im Designer exakt der Ausgabe des Kiosks entsprechen. Eine Änderung an einem muss im anderen nachgezogen werden.

Die Druckpipeline (`src/components/PrintUI.tsx`) rendert jedes HTML-Etikett in einer `WebView`, erfasst es mit `react-native-view-shot` als JPG und übergibt die Bild-URIs an das native Expo-Modul **printer-helper** (`B1Checkin/modules/printer-helper/`). Das Modul stellt `scan()`, `checkInit()`, `printUris()` und Statusereignisse bereit, mit einem Anbieter je Marke auf beiden Plattformen:

| Marke | Android | iOS | Hinweise |
|-------|---------|-----|-------|
| Brother | `BrotherProvider.kt` (Brother-Print-SDK) | `BrotherProvider.swift` (`BRLMPrinterKit.xcframework`) | Netzwerkdrucker der QL-Serie (QL-800/810W/820NWB/1100/1110NWB…), Etiketten 29×90 mm mit Stanzung; die empfohlene Standardwahl |
| Zebra | `ZebraProvider.kt` (Link-OS-SDK) | `ZebraProvider.swift` + `ZebraBridge` | Netzwerkerkennung und Bilddruck über TCP/ZPL |

Die Druckerauswahl befindet sich in `app/printers.tsx` (der Netzwerkscan liefert Einträge im Format `brand~model~ip`; die Auswahl wird in AsyncStorage gespeichert). `src/helpers/PrinterLog.ts` führt ein lokales Diagnoseprotokoll, das über eine Statusanzeige in der Kopfzeile des Kiosks sichtbar wird.

## Gästeregistrierung

Auf zwei Wegen wird eine Person während des Check-ins angelegt:

- **Am Kiosk** – Die Schaltfläche "Gast hinzufügen" auf dem Haushaltsbildschirm öffnet `B1Checkin/app/addGuest.tsx`. Dort wird zuerst über `GET /membership/people/search?term=` nach einer bestehenden Person gesucht, die kein Mitglied ist. Wird keine gefunden, legt der Kiosk eine neue an (`POST /membership/people`), die dem aktuellen Haushalt zugeordnet wird. Der Gast durchläuft danach die Gruppenzuweisung wie jedes Mitglied.
- **Selbstbedienung per QR-Code** – Ist die Kircheneinstellung `enableQRGuestRegistration` aktiv (konfiguriert in den Check-in-Einstellungen von B1Admin und gelesen über `GET /membership/settings/public/{churchId}`), zeigt der Suchbildschirm des Kiosks einen QR-Code, der auf `https://{subdomain}.b1.church/guest-register?serviceId=` verweist. Diese Seite der B1App (`src/app/[sdSlug]/(public)/guest-register/page.tsx`) erlaubt einer Gastfamilie, sich auf dem eigenen Telefon zu registrieren – über den anonymen Endpunkt `POST /membership/people/guest-register`, sodass die Schlange am Kiosk weiterläuft. Der QR-Bereich enthält außerdem eine Schaltfläche **Hier registrieren**, die dieselbe Seite am Kiosk (`app/guestRegister.tsx`) in einer `WebView` im Inkognito-Modus ohne Zwischenspeicher öffnet. `src/helpers/GuestRegisterHelper.ts` erstellt die URL für den QR-Code und die WebView und blockiert jede Navigation außerhalb von `https://{subdomain}.b1.church/guest-register`. Der Bildschirm kehrt bei **Fertig**, bei Zurück oder nach 120 Sekunden Inaktivität zur Suche zurück (Tippen im Formular wird von der WebView als Aktivität gemeldet). Dabei wird die WebView entfernt, sodass die Eingaben einer Familie nie bei der nächsten ankommen.

Die QR-Anmeldung wird über die Kircheneinstellungen gesteuert, die in der Karte **QR-Gästeregistrierung** in B1Admin gespeichert werden (`src/mobile/CheckInPage.tsx`):

| Einstellung | Sichtbarkeit | Zweck |
|---|---|---|
| `enableQRGuestRegistration` | öffentlich | Schalter zur Aktivierung des QR-Codes am Kiosk und der anonymen Endpunkte |
| `guestRegistrationFields` | öffentlich | JSON-Zuordnung von `email`, `phone`, `address`, `birthDate`, `gender`, `maritalStatus`, `grade`, `comments` zu `"off"` / `"optional"` / `"required"`. Standard: E-Mail und Telefon optional, der Rest aus. Vor- und Nachname sind immer erforderlich |
| `guestRegistrationImage` | öffentlich | URL eines Titelfotos; die B1App zeigt es im Format 16:9 anstelle des Symbols im Formular und auf der Bestätigungsseite an |
| `guestRegistrationGroupId` | nicht öffentlich | Gruppe, der jede Anmeldung hinzugefügt wird (Gäste sehen oder wählen sie nie aus) |
| `guestRegistrationRecordAttendance` | nicht öffentlich | `"true"`, um zusätzlich die Anwesenheit für diese Gruppe zu erfassen |

`src/components/checkin/GuestRegister.tsx` der B1App lädt die Checkliste über den anonymen Endpunkt `GET /membership/people/guest-register/options?churchId=` und zeigt nur die aktivierten Felder an (E-Mail, Telefon, Familienstand und Adresse beim Hauptkontakt; Geburtsdatum, Geschlecht und Klassenstufe je Mitglied; ein Kommentarfeld) und sendet nur diese. Der Server wendet die Checkliste erneut an, in `GuestRegistrationHelper.sanitize()`: Deaktivierte Felder werden verworfen, fehlende Pflichtangaben oder Werte außerhalb der Auswahl ergeben einen Fehler 400. Danach erstellt `PersonHelper.registerGuestHousehold()` einen neuen Haushalt (ohne Dublettenprüfung per E-Mail), in dem jedes Mitglied den `membershipStatus: "Visitor"` erhält; dabei wird je Person `person.created` ausgelöst. Anschließend werden Fehler nur protokolliert und nicht zurückgegeben: Mitglieder werden der konfigurierten Gruppe hinzugefügt (`group.member.added`). Ist die Erfassung der Anwesenheit aktiv, markiert `AttendanceModuleGateway.recordAttendance()` jedes Mitglied für jede Gottesdienstzeit der Gruppe, die einen Zeitplan hat und deren Check-in-Fenster (`CheckinGateHelper.isServiceTimeOpen`) jetzt offen ist; dabei wird die Sitzung für das lokale Kirchendatum von heute bei Bedarf angelegt. Ungeplante Gottesdienstzeiten und Anmeldungen außerhalb des Fensters erfassen nichts. Kommentare werden zu einer verborgenen Notizunterhaltung beim Haupthaushaltsvorstand (Nachrichtenautor "Gast-Anmeldung") und sind über `person.conversationId` verknüpft.

## Verwandte Seiten

- [Anwesenheits-Endpunkte](../api/endpoints/attendance) -- Vollständige REST-Schnittstelle für Standorte, Gottesdienste, Sitzungen, Besuche und Besuchssitzungen
- [Mitglieder-Endpunkte](../api/endpoints/membership) -- Personen, Haushalte und Gruppen
- [Webhooks](../api/webhooks) -- Die Ereignisse `session.created`, `attendance.recorded` und `attendance.checkout`
- [Modulstruktur](../api/module-structure) -- Wie das Anwesenheitsmodul serverseitig aufgebaut ist
