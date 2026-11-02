---
title: "Check-ins"
---

# Check-ins

<div class="article-intro">

Der Check-in ist ein System mit drei Zugängen: die Kiosk-App B1Checkin für besetzte und Selbstbedienungs-Stationen, Selbst-Check-in im Mitgliederbereich von B1App sowie die Anwesenheitserfassung durch Mitarbeitende in B1Admin. Alle drei schreiben in dasselbe Anwesenheitsmodul der zentralen Api, und die Raumzuordnung wird vollständig durch Gruppen gesteuert — es gibt keine eigene Entität für „Standorte“ oder „Räume“. Darüber liegt eine Sicherheitsschicht für Kinder: Check-in-Typen pro Besuch, serverseitige Kapazitäts- und Betreuungsschlüssel-Prüfungen, Altersprüfung und Klassenstufen-Prüfung auf dem Kiosk, verifizierte Abholung beim Check-out sowie Eltern-Benachrichtigung über den Texting-Anbieter der Gemeinde. Diese Seite beschreibt das Datenmodell, die Check-in-Abläufe, die Sicherheitsschicht und die Druckpipeline für Etiketten.

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
| Kiosk | `B1Checkin` | Expo / React Native, Dateirouting über expo-router; EAS-Builds für Android, Amazon Fire und iOS; OTA-Updates über `expo-updates` | Besetzte oder Selbstbedienungs-Station mit Etikettendruck und verifiziertem Check-out |
| Selbst-Check-in | `B1App` | Next.js (Mitgliederportal b1.church) | Angemeldete Mitglieder checken ihren Haushalt vom Telefon aus ein; kein Druck |
| Admin | `B1Admin` | React-SPA | Konfiguriert die Gottesdienststruktur, weist Gruppen Gottesdienstzeiten zu, gestaltet Etiketten, erfasst manuelle Anwesenheit und erstellt Berichte |

Alle drei greifen über `ApiHelper` auf dieselben zwei API-Module zu: **MembershipApi** (`/membership`) für Personen, Haushalte und Gruppen; **AttendanceApi** (`/attendance`) für alles Weitere unten.

## Datenmodell (`Api/src/modules/attendance`)

| Entität / Tabelle | Wichtige Felder | Bedeutung |
|----------------|-----------|---------|
| `campuses` | name, address | Hier veraltet — Standorte werden im Membership-Modul gepflegt (`/membership/campuses`); die Kopie im Anwesenheitsmodul ist für ältere Lesezugriffe eingefroren und schreibgeschützt (`models/Campus.ts`) |
| `services` | campusId, name | Eine wiederkehrende Zusammenkunft, z. B. „Sonntagmorgen“ (`models/Service.ts`) |
| `serviceTimes` | serviceId, name, dayOfWeek, startTime, endTime, checkinOpenMinutes, checkinCloseMinutes | Ein Zeitfenster innerhalb eines Gottesdienstes, z. B. „9:00 Uhr“ (`models/ServiceTime.ts`). Die Zeitplan-Spalten sind optional (Migration `tools/migrations/attendance/2026-10-10_service_time_schedule.ts`) und steuern das [Check-in-Fenster](#scheduled-check-in-windows) |
| `groupServiceTimes` | groupId, serviceTimeId | Verbindungstabelle: welche Gruppen (Klassenräume) zu welchen Gottesdienstzeiten zusammenkommen (`models/GroupServiceTime.ts`) |
| `sessions` | groupId, serviceTimeId, sessionDate | Eine Zusammenkunft einer Gruppe an einem Datum — wird beim Check-in bei Bedarf angelegt (`models/Session.ts`) |
| `visits` | personId, serviceId, visitDate, checkinTime, securityCode, checkinType, checkedInById, checkoutTime, checkedOutBy, checkedOutById | Die Teilnahme einer Person an einem Datum (`models/Visit.ts`). `checkinType` ist `member` / `guest` / `volunteer` (NULL = älteres Mitgliederdatensatz), wird vom Kiosk gesetzt und von den Kapazitäts- und Betreuungsschlüssel-Prüfungen ausgewertet |
| `visitSessions` | visitId, sessionId | Welche Sitzung(en) ein Besuch abdeckt — ein Kind, das zu zwei Gottesdienstzeiten eingecheckt wird, erhält zwei Zeilen (`models/VisitSession.ts`) |
| `labelTemplates` | name, labelType (`nametag`/`pickup`), width, height, isDefault, content (JSON-Blöcke) | Frei gestaltbare Etikettenlayouts (`models/LabelTemplate.ts`) |

### So wird ein abgeschlossener Check-in gespeichert

`VisitController.postCheckin` (`Api/src/modules/attendance/controllers/VisitController.ts`) verarbeitet `POST /attendance/visits/checkin?serviceId=&peopleIds=`. Der Body ist ein Array von `Visit`-Objekten; jedes enthält `visitSessions`, deren eingebettete `session` nur ein Paar `(serviceTimeId, groupId)` angibt. Der Server führt dann folgende Schritte aus:

1. **Prüft Kapazität und Schlüssel, bevor etwas geschrieben wird.** `evaluateGates()` → `CheckinGateHelper.evaluate()` prüft für jeden betroffenen Raum Kapazität, Gästekapazität, das Geschlossen-Kennzeichen und den Betreuungsschlüssel gegenüber der aktuellen Belegung. postCheckin ist **nicht transaktional**, daher muss die Prüfung vor dem ersten Speichern laufen — eine harte Verletzung liefert eine 409 mit den betroffenen Räumen, und es wird nichts gespeichert. Siehe [Kapazitäts- und Betreuungsschlüssel-Prüfungen](#capacity-and-volunteer-ratio-gates).
2. **Löst Sitzungen verzögert auf.** `getSessionId()` findet oder erstellt den Datensatz `sessions` für `(groupId, serviceTimeId, heute)` — Sitzungs-IDs werden pro Datum im Prozess zwischengespeichert. Neue Sitzungen lösen einen Webhook `session.created` aus. Die Schleife ist ein erwartetes `for..of` — ein früheres Fire-and-forget-`forEach(async …)` war mit dem Speichern in einem Wettlauf und schrieb bei der Erstellung der ersten Sitzung NULL-Sitzungs-IDs (behoben; im Code an der Schleife kommentiert).
3. **Ersetzt die Datensätze des Tages.** Bestehende Besuche dieser Personen bei diesem Gottesdienst heute werden samt ihren visitSessions gelöscht, danach wird der übermittelte Satz gespeichert. Ein erneuter Check-in einer Familie ist daher eine idempotente Operation „dies ist der aktuelle Stand“ und kein Anhängen. Mit `?checkDuplicates=true` wird stattdessen `{ duplicates: [personId…] }` ohne Schreibvorgang zurückgegeben; so warnt der Kiosk, bevor er überschreibt.
4. **Erzeugt einen Sicherheitscode pro Stapel.** `SecurityCodeHelper.generate()` erzeugt einen 4-stelligen Code aus dem Alphabet `23456789BCDFGHJKLMNPQRSTVWXYZ` (keine Vokale oder mehrdeutigen Zeichen, damit Codes keine Wörter bilden und nicht falsch gelesen werden). Der Server wiederholt bei Kollisionen gegen die offenen Besuche derselben Gemeinde am selben Tag und vergibt den Code allen Besuchen des Stapels.
5. **Gibt `{ streaks, securityCode }` zurück.** `streaks` ordnet personId die Anzahl aufeinanderfolgender Wochen mit Anwesenheit zu; der Kiosk feiert Meilensteine (jede 5. Woche) mit Konfetti.

Jeder gespeicherte Besuch löst außerdem einen Webhook `attendance.recorded` aus. Die Leseseite, `GET /attendance/visits/checkin`, liefert die Besuche der Personen ab ihrem **letzten erfassten Datum** — lag dieses in einer früheren Woche, werden die IDs entfernt, sodass der Client eine vorausgefüllte Kopie der Raumauswahl von letzter Woche erhält, die als neue Datensätze gespeichert wird.

### Check-out

Zwei Endpunkte schließen den Ablauf ab (`VisitController`):

- `GET /attendance/visits/code/:code` — die heute noch nicht ausgecheckten Besuche mit diesem Sicherheitscode, mit geladenen Sitzungen.
- `POST /attendance/visits/checkout` — Body `{ visitIds, checkedOutBy?, checkedOutById? }`; setzt `checkoutTime` und vermerkt, wer abgeholt hat, und löst pro Besuch einen Webhook `attendance.checkout` aus.

Berechtigungen: Kioske authentifizieren sich mit `attendance.checkin`, das genau den Check-in-/Check-out-/Etikettenvorlagen-Bereich gewährt; `attendance.view`/`attendance.edit` decken Berichte und manuelle Erfassung ab; die Struktur (Gottesdienste, Gottesdienstzeiten, Gruppenzuordnungen) erfordert `services.edit`. Die Selbst-Check-in-Funktion von Mitgliedern (B1App) benötigt überhaupt keine Berechtigung: Jeder angemeldete Benutzer mit einer verknüpften Person in der Gemeinde darf `GET`/`POST /attendance/visits/checkin` aufrufen, und der Server beschränkt die übermittelten `personId`s auf den eigenen Haushalt des Aufrufers (sonst 403) — diese Absicherung verhindert, dass die `securityCode`s anderer Familien gelesen werden können. Die Mitgliedschaft ist die Berechtigung; ob Mitglieder die Funktion *sehen*, steuern die Navigationsreiter von B1App der Gemeinde. Die übrigen Check-in-Endpunkte (`code/:code`, `checkout`, `guardians`, `CheckinController`) bleiben Kiosken und Mitarbeitenden vorbehalten.

## Gruppen steuern die Raumzuordnung

Im gesamten System gibt es keine Raum- oder Klassenraum-Entität. Ein „Raum“ ist eine Gruppe des Membership-Moduls mit aktivierter Option `trackAttendance`, die über `groupServiceTimes` mit einer oder mehreren Gottesdienstzeiten verknüpft ist. Die Gruppenfelder (in `Api/src/modules/membership/models/Group.ts`), die das Kiosk-Verhalten prägen:

| Feld | Wirkung |
|------|--------|
| `trackAttendance` | Die Gruppe nimmt überhaupt an der Anwesenheitserfassung teil; der Einrichtungsbaum in B1Admin markiert `trackAttendance`-Gruppen ohne Eintrag in `groupServiceTimes` als nicht zugeordnet |
| `parentPickup` | Kennzeichnet einen Kinderraum: Ein Check-in in diesen Raum macht den Besuch zu einem „Kinder“-Besuch, der ein Etikett für die Familienabholung druckt und den Sicherheitscode auf das Namensschild setzt |
| `printNametag` | Ob Check-ins in diese Gruppe überhaupt ein Namensschild drucken |
| `capacity` / `guestCapacity` / `checkinClosed` | Raumkapazitätsgrenzen und ein hartes Schalter-„geschlossen“, serverseitig durch die Check-in-Prüfung erzwungen (bearbeitet in den Gruppeneinstellungen von B1Admin unter „Check-In Capacity“) |
| `volunteerRatio` / `minVolunteers` | Verhältnis Kinder pro Betreuungsperson und Mindestanzahl Ehrenamtlicher, durchgesetzt gemäß der gemeindeweiten Einstellung `ratioEnforcement` |
| `minAgeMonths` / `maxAgeMonths` / `minGrade` / `maxGrade` | Grenzen für Alter und Klassenstufe, auf dem Kiosk ausgewertet, um Räume hervorzuheben oder abzudunkeln |

Alle Clients verarbeiten die Daten auf dieselbe Weise (z. B. `B1Checkin/app/services.tsx`, `B1App/src/app/[sdSlug]/mobile/components/screens/CheckinPage.tsx`): Sie laden parallel `GET /attendance/servicetimes?serviceId=`, `GET /attendance/groupservicetimes` und `GET /membership/groups` und sammeln dann für jede Gottesdienstzeit die Gruppen, deren Eintrag in `groupServiceTimes` auf sie zeigt, in `serviceTime.groups`. Dieses Array ist es, das die Raumauswahl anzeigt, gegliedert nach der `categoryName` der Gruppe.

Zuweisungen werden auf der Gruppenseite in B1Admin bearbeitet (`B1Admin/src/groups/components/ServiceTimesEdit.tsx` — `POST`/`DELETE /attendance/groupservicetimes`). Der gesamte Baum Standort → Gottesdienst → Gottesdienstzeit → Gruppe wird in `B1Admin/src/attendance/components/AttendanceSetup.tsx` über `GET /attendance/attendancerecords/tree` visualisiert.

:::info
Da Gruppen die einzige Quelle der Wahrheit sind, versorgt dieselbe Gruppenmitgliedschaft die Raumzuordnung am Kiosk, die klassenlistenartige Anwesenheit auf den Gruppenseiten in B1Admin und die Anwesenheitsberichte — die Zuweisung einer Gruppe zu einer Gottesdienstzeit ist der einzige Schritt, der sie zu einem Check-in-Ziel macht.
:::

## Kindersicherheit

### Check-in-Typen {#check-in-types}

Jeder Besuch trägt einen `checkinType` — `member`, `guest` oder `volunteer` (NULL bedeutet älteres Mitglied; Migration `tools/migrations/attendance/2026-07-03_checkin_type.ts`). Der Typ wird **auf dem Kiosk** gewählt: Die Chips Member / Guest / Volunteer in der aufgeklappten Mitgliederzeile (`B1Checkin/src/components/MemberServiceTimes.tsx`) werden beim Abschluss jedem ausstehenden Besuch zugewiesen (`app/checkinComplete.tsx`, Standard ist `member`). Der Server wertet ihn in der Prüfung aus — Ehrenamtliche zählen zur Betreuungsabdeckung statt gegen die Kapazität, und Gäste zählen gegen `guestCapacity`.

### Kapazitäts- und Betreuungsschlüssel-Prüfungen {#capacity-and-volunteer-ratio-gates}

`CheckinGateHelper.evaluate()` (`Api/src/modules/attendance/helpers/CheckinGateHelper.ts`) läuft in `postCheckin` vor jedem Speichern (der Endpunkt ist nicht transaktional, daher ist die Prüfung vor dem Speichern der Mechanismus für Korrektheit). Sie lädt die aktuelle Belegung pro betroffener Gruppe (`VisitRepo.countActiveByGroupToday`) und die Gruppenkonfiguration über das Gateway des Membership-Moduls und klassifiziert dann die Verletzungen:

- **Hart (blockiert immer):** `checkinClosed`, `aktuell + eingehend > capacity`, Gästezahl über `guestCapacity`. Der Stapel wird mit `409 { error: "capacity", groups: [{ groupId, groupName, reason }] }` abgelehnt — der Kiosk zeigt den betroffenen Raum an.
- **Betreuungsschlüssel (Warnung oder Blockade):** eingehende Nicht-Ehrenamtliche in einem Raum, in dem `volunteers < minVolunteers` gilt, keine Ehrenamtlichen vorhanden sind oder `children > volunteers × volunteerRatio`. Die Schwere richtet sich nach der gemeindespezifischen Einstellung `ratioEnforcement` (`"warn"` als Standard / `"block"`, bearbeitet in B1Admin unter Manage Church → Check-In, `CheckinSettingsEdit.tsx`). Im Warnmodus gibt der Server `409 { warning: true, error: "ratio", … }` zurück, sofern der Client nicht mit `acknowledgeWarnings=true` erneut sendet — diese erneute Übermittlung ist die Bestätigung durch Mitarbeitende am Kiosk.

### Geplante Check-in-Fenster {#scheduled-check-in-windows}

Eine Gottesdienstzeit kann einen optionalen wöchentlichen Zeitplan haben (`dayOfWeek` 0–6, wobei 0 = Sonntag, `startTime`/`endTime` als `HH:mm`, `checkinOpenMinutes`, `checkinCloseMinutes`). Er wird im Formular für die Gottesdienstzeit unter **Attendance → Setup** in B1Admin bearbeitet (`B1Admin/src/attendance/components/ServiceTimeEdit.tsx`, „Check-in Schedule“). `CheckinGateHelper.hasSchedule()` behandelt eine Gottesdienstzeit nur dann als geplant, wenn `dayOfWeek` und `startTime` gesetzt sind; ungeplante Zeiten werden nie zeitlich begrenzt. `isServiceTimeOpen()` berechnet das Fenster in der lokalen Wanduhrzeit (`DateHelper.toChurchTime`). Die Zeitzone wird pro Gottesdienstzeit von `CheckinTimeZoneHelper.load()` bestimmt (`Api/src/modules/attendance/helpers/CheckinTimeZoneHelper.ts`): Zuerst gilt die `timezone` des Standorts des Gottesdienstes (`service.campusId`, über `MembershipModuleGateway.loadCampusTimeZones`), dann die `timeZone` der Gemeinde (festgelegt in den Gemeindeinformationen von B1Admin), danach der erste nicht entfernte Standort mit einer `timezone` (`loadCampusTimeZone`), und erst zuletzt `America/New_York`. Der Standort kommt zuerst, weil den meisten Gemeinden `America/New_York` nachträglich als Gemeindezeitzone eingetragen wurde. Sowohl der Listen- als auch der Buchungspfad unten lösen die Zeitzone gleich auf. Das Fenster reicht von `checkinOpenMinutes` vor dem Beginn bis `checkinCloseMinutes` nach dem Ende (oder nach dem Beginn, wenn es kein Ende gibt) und berücksichtigt Fenster, die über Mitternacht oder die Wochengrenze reichen.

Das Fenster wird an zwei Stellen durchgesetzt:

- **Auflistung:** `GET /attendance/servicetimes` versieht jede Zeile mit dem berechneten booleschen Wert `checkinOpen`. Der Selbst-Check-in von B1App (`CheckinPage.tsx`) und die Gottesdienstauswahl von B1Checkin (`app/services.tsx`) behalten jede Zeit bei. Sind alle Zeiten eines Gottesdienstes geschlossen, zeigen sie die nächste Öffnung an („Check-in opens Sun 9:30 AM.“ in B1App, „Check-in for this service opens Sun 9:30 AM.“ in B1Checkin, aus `CheckinHelper.opensLabel` / `ServiceTimeHelper.getOpensLabel`). Lässt sich keine Öffnung berechnen, erscheint „Check-in isn't open for this service right now.“ (der Kiosk bietet eine Schaltfläche „Zurück“, um einen anderen Gottesdienst zu wählen). Andernfalls werden geschlossene Zeiten als nicht auswählbare Zeile „Closed“ / „Closed · opens 9:30 AM“ dargestellt. Der Haushaltsbildschirm von B1Checkin (`MemberServiceTimes.tsx`) prüft die Öffnung live anhand der Gerätezeit mit `ServiceTimeHelper.isCheckinOpen()` (Zeitzone des Geräts, nicht der Gemeinde), sodass ein laufender Kiosk pünktlich öffnet und schließt, und zeigt bei einer geschlossenen Zeit, die die Person bereits besitzt, „Kids Room 1 · Checked in“ (Gruppenname) an.
- **Buchung:** Innerhalb von `evaluateGates()`, vor der Kapazitäts- und Betreuungsschlüssel-Prüfung, weist `findClosedServiceTimeGroups()` den Stapel mit `409 { error: "notOpen", groups: [{ groupId, groupName, reason: "notOpen" }] }` ab, wenn die Gottesdienstzeit einer betroffenen Sitzung außerhalb ihres Fensters liegt. Da bestehende Besuche eines Haushalts für heute bei jedem Check-in erneut gebucht werden, überspringen Sitzungen, die die Person bereits besitzt (`personId|sessionId` in den bestehenden Besuchen), diese Prüfung; so wird das Hinzufügen einer späteren, offenen Gottesdienstzeit nicht abgelehnt, nur weil ein früheres Fenster schon geschlossen ist. B1Checkin zeigt dies auf seinem Bildschirm für harte Sperren mit dem Grund „check-in isn't open right now“ an (Kapazitätsverletzungen lauten weiterhin „room is full or closed“).

### Alters- und Klassenstufen-Berechtigung (auf dem Kiosk) {#agegrade-eligibility-kiosk-side}

Die Raumberechtigung ist eine beratende Oberfläche, die auf dem Kiosk ausgewertet und nicht vom Server erzwungen wird. `B1Checkin/src/helpers/EligibilityHelper.ts` vergleicht Geburtsdatum/Klassenstufe einer Person mit den Feldern `minAgeMonths`/`maxAgeMonths`/`minGrade`/`maxGrade` der Gruppe (Reihenfolge der Klassenstufen: PreK, K, 1–12, Graduated) und liefert `eligible` / `ineligible` / `unknown` — fehlende Daten ergeben `unknown` und blenden einen Raum nie aus. Alter und Klassenstufe werden zum **Stichtag der Klassenstufenversetzung** der Gemeinde berechnet (Einstellung `gradePromotionDate`, `"MM-DD"`, bearbeitet in `B1Admin/src/settings/components/GradePromotionSettingsEdit.tsx`); der Kiosk ruft sie über `GET /attendance/checkin/settings` ab, und `resolveAsOfDate` wählt das jüngste Vorkommen am oder vor dem heutigen Tag. Die Raumauswahl hebt berechtigte Räume hervor und blendet nicht berechtigte aus; die Auswahl eines abgeblendeten Raums erfordert eine Bestätigung durch Mitarbeitende.

### Vertrauenswürdige und nicht autorisierte Abholung {#trusted-and-not-authorized-pickup}

Abholpersonen sind eine Entität des Membership-Moduls, je Haushalt: `householdPickupPeople` (`Api/src/modules/membership/models/HouseholdPickupPerson.ts` — householdId, optional personId, name, photoUrl, relationship, `status` `trusted` / `notAuthorized`, notes). Die CRUD-Funktionen sind `GET /membership/householdpickup/:householdId` (jeder angemeldete Benutzer der Gemeinde, damit Kioske sie lesen können) sowie `POST` / `DELETE`, geschützt durch `people.edit`. Mitarbeitende pflegen die Liste auf der Karte **Pickup** der Personenseite (`B1Admin/src/people/components/PickupPeople.tsx`) — mit Foto, Beziehung und einem Statuschip „Trusted“ bzw. „Not Authorized“.

Beim Check-out (`B1Checkin/app/checkout.tsx`) lädt der Kiosk die Abholliste des Haushalts: Einträge mit `trusted` erscheinen als antippbare Abholkarten neben dem Fotoraster der erwachsenen Haushaltsmitglieder. Ein frei eingegebener Name „Other“ wird unscharf (Levenshtein, `src/helpers/PickupMatchHelper.ts`) mit den Einträgen `notAuthorized` verglichen — eine Übereinstimmung blockiert den Check-out mit einem Warnhinweis und einer Schaltfläche **Override** für Mitarbeitende. Die Überschreibung wird im Besuch selbst protokolliert: Sie sendet `checkedOutBy` als `"OVERRIDE: {name}"` über den regulären `POST /attendance/visits/checkout`, sodass sie im Anwesenheitsdatensatz und im Webhook `attendance.checkout` landet und nicht in einer separaten Prüftabelle.

### Eltern benachrichtigen und Notfall-Rundnachricht

`CheckinController` (`Api/src/modules/attendance/controllers/CheckinController.ts`, `/attendance/checkin`) stellt zwei SMS-Endpunkte bereit:

- `POST /page` — `{ visitId, message }`: benachrichtigt die Erziehungsberechtigten eines eingecheckten Kindes (Check-out-Bildschirm des Kiosks, besetzter Modus).
- `POST /broadcast` — `{ serviceId, message }`: sendet allen erwachsenen Angehörigen aller eingecheckten Haushalte für einen Gottesdienst eine Textnachricht (Administrationseinstellungen des Kiosks, hinter einem Bestätigungsdialog, der den Typ `EMERGENCY` verlangt, in `B1Checkin/app/adminSettings.tsx`).

Beide Endpunkte ermitteln die erwachsenen Haushaltsmitglieder über das Membership-Gateway und übergeben die Zustellung dann an **`MessagingModuleGateway.sendBulkText`** (`Api/src/shared/modules/MessagingModuleGateway.ts`) — die modulübergreifende Schnittstelle zum konfigurierten Texting-Anbieter der Gemeinde (`@churchapps/texting`: TextInChurch, Clearstream oder MutualMinistry; es gibt keinen eingebauten SMS-Versender). Das Gateway protokolliert einen Eintrag `sentText` plus Einträge `deliveryLog` je Empfänger und begrenzt einen Stapel auf 500 Empfänger. Ist kein Anbieter konfiguriert, liefert es `no_provider`, was der Kiosk als „No SMS provider configured“ anzeigt. Die Methode `dispatch()` des Controllers entfernt doppelte Telefonnummern und überspringt Personen ohne Mobilnummer oder mit gesetztem `optedOut`; sie liefert `{ sent, failed, skippedOptedOut, skippedNoPhone }`, damit der Kiosk anzeigen kann, was übersprungen wurde.

## Der Kiosk (B1Checkin)

Die Bildschirme sind expo-router-Dateien unter `B1Checkin/app/`; der bildschirmübergreifende Zustand liegt in einer statischen Klasse `CachedData` (`src/helpers/CachedData.ts`), nicht im React-State.

```
index (boot/auto-login) → selectChurch → services ──▶ lookup ──▶ household ──▶ checkinComplete
                                          │             │  ▲         │ │            │
             loads serviceTimes, groups,  │             │  └─────────┘ └▶ addGuest  └▶ print labels,
             groupServiceTimes,           │             └▶ checkout (manned)           auto-return
             labelTemplates               │                                            to lookup
```

1. **Suche** (`app/lookup.tsx`) — Suche nach Telefonnummer (`GET /membership/people/search/phone?number=`, letzte 4 Ziffern oder vollständig) oder nach Name (`GET /membership/people/search?term=`). Die Auswahl eines Treffers lädt den Haushalt (`GET /membership/people/household/{householdId}`) und die bestehenden Besuche (`GET /attendance/visits/checkin`) und füllt `pendingVisits` mit den Auswahlen von letzter Woche vor.
2. **Haushaltsprüfung** (`app/household.tsx`, `src/components/MemberList.tsx`) — jede Mitgliederzeile zeigt eine Markierung „bereits eingecheckt“, eine Markierung für Allergien/`nametagNotes` und die aktuellen Raum-Chips. Beim Aufklappen eines Mitglieds werden alle Gottesdienstzeiten mit einer Raumschaltfläche sowie die Chips Member / Guest / Volunteer für den Check-in-Typ aufgelistet (`MemberServiceTimes.tsx`). Unter jedem Gottesdienstzeitnamen zeigt `ServiceTimeHelper.getGroupSummary()` die dort angebotenen Gruppen (die Namen aus `serviceTime.groups`, gekürzt, ohne Groß-/Kleinschreibung dedupliziert, durch Kommas getrennt); ist der Zeit keine Gruppe zugeordnet, wird nichts angezeigt.
3. **Gruppenzuordnung** (`app/selectGroup.tsx`) — ein Kategoriebaum aus `serviceTime.groups`, wobei altersgerechte bzw. klassenstufengerechte Räume hervorgehoben und nicht berechtigte abgeblendet sind und eine Bestätigung durch Mitarbeitende erfordern (siehe [Alters-/Klassenstufen-Berechtigung](#agegrade-eligibility-kiosk-side)); die Wahl eines Raums schreibt eine `{ session: { serviceTimeId, groupId } }`-visitSession in den ausstehenden Besuch der Person (`src/helpers/VisitSessionHelper.ts`). „None“ hebt die Auswahl auf.
4. **Abschluss** (`app/checkinComplete.tsx`) — `POST /attendance/visits/checkin` mit `pendingVisits` (jeder mit seinem `checkinType` versehen); danach werden Etiketten gedruckt, sofern ein Drucker konfiguriert ist, und die Anzeige kehrt automatisch zur Suche zurück. Eine Antwort `409` für Kapazität oder `notOpen` zeigt den betroffenen Raum mit dem Grund an (voll/geschlossen bzw. Check-in nicht geöffnet); eine Warnung zum Betreuungsschlüssel bietet eine Bestätigung durch Mitarbeitende, die mit `acknowledgeWarnings=true` erneut sendet.

Der Bildschirm **Check-out** (`app/checkout.tsx`) nimmt den 4-stelligen Sicherheitscode über ein automatisch fokussiertes Eingabefeld entgegen — sodass USB- oder Bluetooth-Barcodescanner ohne Kamera funktionieren — oder über ein Tastenfeld auf dem Bildschirm mit demselben Alphabet, das bei 4 Zeichen automatisch absendet. Eine Schaltfläche **Scan** öffnet ein Blatt mit der gemeinsam genutzten Kamera `src/components/CodeScanner.tsx` (standardmäßig die Rückkamera, akzeptiert QR-Code, Code 128 und Code 39), damit Stationen ohne Keyboard-Wedge-Scanner das Abholetikett lesen können; ein gescannter Code läuft über denselben Pfad `handleCode()` wie eine Eingabe. Der Bildschirm sucht den Code, zeigt die abgeholten Kinder an und präsentiert die **vertrauenswürdigen Abholpersonen** des Haushalts als antippbare Karten neben einem Fotoraster der erwachsenen Haushaltsmitglieder (zusätzlich die Option „Other“ als Freitext, die gegen nicht autorisierte Namen unscharf geprüft wird — siehe [Vertrauenswürdige und nicht autorisierte Abholung](#trusted-and-not-authorized-pickup)). Anschließend sendet er `POST /attendance/visits/checkout` mit Name/ID der auswählenden Person. Im besetzten Modus bietet der Bildschirm außerdem **Page a parent** (`POST /attendance/checkin/page`) und den **Neudruck des Sicherheitsetiketts** an — `reprint()` erstellt die Etiketten der Familie mit `LabelHelper.getAllLabelsFor(...)` neu und führt sie über dieselbe Druckpipeline `PrintUI` wie beim Check-in.

Die Rolle der Station wird durch das AsyncStorage-Kennzeichen `@StationMode` festgelegt (`"self"` | `"manned"`, umgeschaltet in `app/adminSettings.tsx`). Der besetzte Modus fügt auf dem Suchbildschirm den Einstieg zum Check-out hinzu und ermöglicht auf dem Haushaltsbildschirm das Bearbeiten einzelner Personenprofile (`POST /membership/people`). Der Kiosk ist eingebaut abgesichert: Eine optionale PIN (`app/setPin.tsx`, `src/components/PinEntryModal.tsx`) schützt den Admin- und den Druckerbildschirm, der Admin-Bildschirm öffnet sich nur nach siebenmaligem schnellem Antippen des Logos in der Kopfzeile, und ein inaktiver Ruhebildschirm (`src/hooks/useInactivityTimer.ts`) übernimmt zwischen den Familien.

## Selbst-Check-in (B1App)

Mitglieder checken sich über das Portal b1.church auf dem Bildschirm `/mobile/checkin` ein (über `B1App/src/app/[sdSlug]/mobile/components/ScreenRouter.tsx` an `screens/CheckinPage.tsx` weitergeleitet). Er erfordert einen angemeldeten Benutzer und durchläuft dieselben vier Schritte wie der Kiosk — Gottesdienste → Haushalt → Gruppen → Abschluss — mit denselben Endpunkten; der Zustand wird in `B1App/src/helpers/CheckinHelper.ts` gehalten. Die Unterschiede zum Kiosk: Der Haushalt stammt aus der eigenen `householdId` des angemeldeten Benutzers (kein Suchschritt), und es gibt keinen Etikettendruck. Stattdessen zeigt der Abschlussbildschirm den Sicherheitscode des Stapels als QR-Code (`qrcode.react`) mit dem Hinweis „show this at a check-in station“. Ist der Haushalt beim Laden der Seite bereits eingecheckt, zeigt die Schaltfläche „Show check-in code“ den QR-Code aus dem ersten bestehenden Besuch (aus `GET /attendance/visits/checkin`) erneut an, der einen `securityCode` trägt. Der Check-in wird beim Absenden sofort gespeichert (es gibt keinen ausstehenden Zustand); der QR-Code steuert nur den Etikettendruck am Kiosk.

**Etikettendruck vom Telefon am Kiosk** (`B1Checkin/app/scan.tsx`, erreichbar über die Schaltfläche „Scan code“ am QR-Code auf dem Suchbildschirm): Der Kiosk zeigt `CodeScanner` (eine `expo-camera`-`CameraView`, standardmäßig die Frontkamera, umschaltbar) und sucht nach QR-Codes. `ScanCodeHelper.parse()` akzeptiert eine Nutzlast nur, wenn es sich um einen reinen 4-stelligen Code aus dem Sicherheitscode-Alphabet handelt, und `ScanCodeHelper.isRepeat()` ignoriert denselben Code 4 Sekunden lang; so funktionieren sowohl der QR-Code aus B1App als auch der QR-Block eines gedruckten Etiketts. Der Bildschirm folgt anschließend dem Pfad für den Neudruck beim Check-out — `GET /attendance/visits/code/{code}` → `GET /membership/people/ids` → `LabelHelper.getAllLabelsFor(visits, people, code)` → `PrintUI` — und kehrt zur Suche zurück. Beim Scannen wird nichts in der Anwesenheit geschrieben; es werden nur Etiketten gedruckt. Codes ohne aktive Besuche, Stationen ohne Drucker und Gruppen ohne Etikettenzuordnung zeigen jeweils eine Meldung (Toast) an und kehren zur Suche zurück.

Typen sowie `ApiHelper`/`ArrayHelper` stammen aus `@churchapps/helpers` und `@churchapps/apphelper`; mit B1Admin werden keine React-Komponenten geteilt.

## Anwesenheit in B1Admin (Administration)

- **Einrichtung** — `/attendance` (`B1Admin/src/attendance/AttendancePage.tsx`) zeigt den Strukturbaum und legt Gottesdienste (`ServiceEdit.tsx`) und Gottesdienstzeiten (`ServiceTimeEdit.tsx`) an. Die Standortdaten stammen aus dem Membership-Modul über den Hook `useCampuses()`.
- **Manuelle Anwesenheit** befindet sich im Bereich Gruppen, nicht im Bereich Anwesenheit: `B1Admin/src/groups/components/GroupSessionsTab.tsx` legt Sitzungen an (`POST /attendance/sessions`; beim Hinzufügen kann `SessionEdit.tsx` für jede andere Gruppe, die dieselbe Gottesdienstzeit teilt, eine Sitzung einschließen, wobei Gruppen übersprungen werden, die an diesem Datum bereits eine Sitzung haben) und markiert Personen über `POST /attendance/visitsessions/log` als anwesend. Dieser Endpunkt findet oder erstellt den Besuch dieser Person und Sitzung. Gruppenleitungen können die Anwesenheit ihrer eigenen Gruppen ohne die Berechtigung `attendance.edit` erfassen — die Controller prüfen `au.leaderGroupIds`.
- **Berichte** — Anwesenheitstrends und Gruppenanwesenheit sind serverseitig definierte Berichte (`B1Admin/src/components/reporting/ReportWithFilter.tsx` gegenüber ReportingApi; die Definitionen liegen in `Api/reports/*.json`). Beide erwarten `startDate`/`endDate` (Enddatum einschließlich). Der Trendbericht umfasst standardmäßig den Zeitraum von vor einem Jahr bis heute und fügt eine Spalte `sessionDates` pro Woche hinzu; die Baumansicht der Gruppenanwesenheit enthält für jeden Besuch die `checkinTime` und den `membershipStatus` der Person. Die CSV-Datei der Gruppenanwesenheit stammt aus dem zugehörigen Bericht `groupAttendanceDownload` und wird von `GroupAttendanceDownloadHelper` in eine Zeile je Gruppenmitglied mit einer Spalte für anwesend/abwesend je datiertem Termin umgesetzt; der Anwesenheitsverlauf einer Person ist über `GET /attendance/attendancerecords?personId=` abrufbar (`B1Admin/src/people/components/PersonAttendance.tsx`).

## Etikettendruck

### Vorlagen und Gestaltung

Gemeinden gestalten ihre Etiketten selbst in B1Admin unter `/mobile/checkin/labels` (`B1Admin/src/attendance/LabelsPage.tsx` + `components/LabelEditor.tsx`, erreichbar über die Seite Check-In-Einstellungen). Eine Vorlage ist eine Zeile `labelTemplates`, deren `content` ein JSON-Array von Blöcken ist — `text`, `field`, `barcode`, `qrcode` oder `box` —, jeweils in Prozentkoordinaten mit Schrift, Ausrichtung, Symbologie (`code39`/`code128`/`qr`) und optionalen Sichtbarkeitsbedingungen positioniert (z. B. das Allergiefeld nur anzeigen, wenn `person.nametagNotes` nicht leer ist). Es gibt zwei `labelType`s: `nametag` (eines pro eingecheckter Person; Felder wie `person.displayName`, `sessions`, `securityCode` und `person.isBirthdayWeek` — `"true"`, wenn Monat und Tag des Geburtstags innerhalb von 3 Tagen von heute liegen, auch über den Jahreswechsel, berechnet durch `LabelHelper.isBirthdayWithin()`) und `pickup` (eines pro Familie; Felder wie `children`, `childrenAllergies`). Der Server erzwingt je Typ und Gemeinde genau eine Standardvorlage (`LabelTemplateController.save`). Der Designer enthält Startvorlagen, die die gebündelten Etiketten des Kiosks nachbilden, und zeigt Vorschauen mit Beispieldaten an.

### Rendering und Druck am Kiosk

Beim Abschluss des Check-ins entscheidet `B1Checkin/src/helpers/LabelHelper.ts` anhand der Gruppenkennzeichen jedes ausstehenden Besuchs, was gedruckt wird: Namensschilder für Gruppen mit `printNametag` sowie ein Familien-Abholetikett, wenn ein Besuch eine Gruppe mit `parentPickup` getroffen hat. Besuche mit `checkinType` `volunteer` überspringt `LabelHelper.selectChildVisits()`; so löst eine Betreuungsperson in einem Raum mit Abholung nie ein Abholetikett aus. Der Sicherheitscode aus der Check-in-Antwort wird auf die Namensschilder der Kinder und das Abholetikett gesetzt; Namensschilder für Erwachsene werden ohne Code gedruckt. Hat die Gemeinde Vorlagen, wandelt `LabelRenderer` (`src/helpers/LabelRenderer.ts`) Blöcke und einen Feldkontext in ein eigenständiges HTML-Dokument um; andernfalls werden die gebündelten HTML-Etiketten in `B1Checkin/assets/labels/` mit Platzhalterersetzung verwendet.

Barcodes werden als Inline-SVG von rein in TypeScript geschriebenen Encodern in `B1Checkin/src/helpers/barcode.ts` erzeugt — Code-39-Musterteile und Code-128-Breitentabellen (Codeset B mit Mod-103-Prüfsumme) sowie QR über das Paket `qrcode`. **Diese Encoder sind bewusst in B1Admin dupliziert** (`LabelEditor.tsx` enthält dieselben Tabellen, im Code kommentiert), damit die Vorschauen des Designers mit der Ausgabe des Kiosks pixelgenau übereinstimmen; eine Änderung an einem der beiden muss im anderen nachgezogen werden.

Die Druckpipeline (`src/components/PrintUI.tsx`) rendert jedes HTML-Etikett in einer `WebView`, erfasst es mit `react-native-view-shot` als JPG und übergibt die Bild-URIs an das native Expo-Modul **printer-helper** (`B1Checkin/modules/printer-helper/`). Das Modul stellt `scan()`, `checkInit()`, `printUris()` und Statusereignisse bereit, mit einem Anbieter pro Marke auf beiden Plattformen:

| Marke | Android | iOS | Hinweise |
|-------|---------|-----|-------|
| Brother | `BrotherProvider.kt` (Brother Print SDK) | `BrotherProvider.swift` (`BRLMPrinterKit.xcframework`) | Netzwerkdrucker der QL-Serie (QL-800/810W/820NWB/1100/1110NWB…), Stanzetiketten 29×90, die empfohlene Standardeinstellung |
| Zebra | `ZebraProvider.kt` (Link-OS SDK) | `ZebraProvider.swift` + `ZebraBridge` | Netzwerkerkennung + TCP-Druck von Bildern in ZPL |

Die Auswahl des Druckers erfolgt in `app/printers.tsx` (der Netzwerk-Scan liefert Einträge der Form `brand~model~ip`; die Auswahl wird in AsyncStorage gespeichert). `src/helpers/PrinterLog.ts` führt ein gerätespezifisches Diagnoseprotokoll, das über einen Live-Statuspunkt in der Kopfzeile des Kiosks angezeigt wird.

## Gästeanmeldung

Zwei Wege legen eine Person während des Check-ins an:

- **Am Kiosk** — die Schaltfläche „Add guest“ auf dem Haushaltsbildschirm öffnet `B1Checkin/app/addGuest.tsx`. Dieser sucht zuerst mit `GET /membership/people/search?term=` nach einem vorhandenen Nicht-Mitglied-Treffer und legt andernfalls mit `POST /membership/people` eine neue Person an, die dem aktuellen Haushalt zugeordnet wird. Der Gast durchläuft danach die Gruppenzuordnung wie jedes Mitglied.
- **Selbstbedienung per QR-Code** — ist die Gemeindeeinstellung `enableQRGuestRegistration` aktiv (konfiguriert in den Check-In-Einstellungen von B1Admin, gelesen über `GET /membership/settings/public/{churchId}`), zeigt der Suchbildschirm am Kiosk einen QR-Code, der auf `https://{subdomain}.b1.church/guest-register?serviceId=` verweist. Diese Seite von B1App (`src/app/[sdSlug]/(public)/guest-register/page.tsx`) lässt eine Besucherfamilie sich auf dem eigenen Telefon über den anonymen Endpunkt `POST /membership/people/guest-register` registrieren, sodass die Schlange am Kiosk vorankommt. Das QR-Blatt hat außerdem eine Schaltfläche **Register here**, die dieselbe Seite am Kiosk (`app/guestRegister.tsx`) in einer `WebView` im Inkognitomodus ohne Cache öffnet; `src/helpers/GuestRegisterHelper.ts` erstellt die URL für QR-Code und WebView und blockiert Navigationen außerhalb von `https://{subdomain}.b1.church/guest-register`. Der Bildschirm kehrt bei **Done**, bei Zurück oder nach 120 Sekunden Inaktivität zur Suche zurück (Eingaben im Formular werden aus der WebView als Aktivität übermittelt). Dabei wird die WebView abgebaut, sodass die Eingaben einer Familie nie an die nächste gelangen.

Die Anmeldung per QR-Code wird über die Gemeindeeinstellungen gesteuert, die in der Karte **QR Guest Registration** in B1Admin gespeichert werden (`src/mobile/CheckInPage.tsx`):

| Einstellung | Sichtbarkeit | Zweck |
|---|---|---|
| `enableQRGuestRegistration` | öffentlich | Opt-in-Schalter für den QR-Code am Kiosk und die anonymen Endpunkte |
| `guestRegistrationFields` | öffentlich | JSON-Zuordnung von `email`, `phone`, `address`, `birthDate`, `gender`, `maritalStatus`, `grade`, `comments` → `"off"` / `"optional"` / `"required"`. Standard: E-Mail und Telefon optional, der Rest aus. Vor- und Nachname sind immer erforderlich |
| `guestRegistrationImage` | öffentlich | URL des Kopfzeilenfotos; B1App zeigt es im Format 16:9 anstelle des Symbols auf dem Formular und auf dem Bestätigungsbildschirm an |
| `guestRegistrationGroupId` | privat | Gruppe, der jede Anmeldung hinzugefügt wird (Gäste sehen oder wählen sie nie) |
| `guestRegistrationRecordAttendance` | privat | `"true"`, um für diese Gruppe außerdem die Anwesenheit zu erfassen |

`src/components/checkin/GuestRegister.tsx` in B1App lädt die Checkliste über den anonymen Endpunkt `GET /membership/people/guest-register/options?churchId=` und zeigt nur die einbezogenen Felder an (E-Mail, Telefon, Familienstand und Adresse bei der Hauptkontaktperson; Geburtsdatum, Geschlecht und Klassenstufe je Mitglied; ein Kommentarfeld) und sendet nur diese. Der Server wendet die Checkliste in `GuestRegistrationHelper.sanitize()` erneut an — deaktivierte Felder werden verworfen, fehlende Pflichtfelder oder Werte außerhalb der Liste ergeben einen 400 — bevor `PersonHelper.registerGuestHousehold()` läuft. Zuerst ruft er für jedes Mitglied mit E-Mail oder Telefon `PersonRepo.findGuestMatch()` auf: Genau eine aktive Person mit demselben Vornamen und derselben E-Mail oder denselben Telefonziffern wird wiederverwendet (null oder mehrere Treffer legen eine neue Person an, es wird also nie geraten). Ein Mitglied ohne Kontaktdaten wird über den Vornamen innerhalb des zugeordneten Haushalts zugeordnet. Wiederverwendete Personen werden nie verändert, sodass ein anonymes Formular gespeicherte Daten nicht überschreiben kann, und die Antwort gibt die übermittelten Namen zurück. Nicht zugeordnete Mitglieder treten dem zugeordneten oder einem neuen Haushalt bei, als `membershipStatus: "Visitor"`, und `person.created` wird für jede neue Person ausgelöst. Danach werden Fehler protokolliert, statt zurückgegeben zu werden: Mitglieder werden der konfigurierten Gruppe hinzugefügt (`group.member.added`); ist die Erfassung der Anwesenheit aktiv, markiert `AttendanceModuleGateway.recordAttendance()` jedes Mitglied als anwesend für jede Gottesdienstzeit der Gruppe, die einen Zeitplan hat und deren Check-in-Fenster (`CheckinGateHelper.isServiceTimeOpen`) gerade geöffnet ist, und legt bei Bedarf die Sitzung für das heutige Datum nach der Ortszeit der Gemeinde an — ungeplante Gottesdienstzeiten und Anmeldungen außerhalb des Fensters erfassen nichts. Kommentare werden zu einer verborgenen Notiz-Unterhaltung über den Haushaltsvorstand (Nachrichtenautor „Guest sign-up“), verknüpft über `person.conversationId`.

## Verwandte Seiten

- [Attendance-Endpunkte](../api/endpoints/attendance) -- Vollständige REST-Schnittstelle für Standorte, Gottesdienste, Sitzungen, Besuche und Besuchssitzungen
- [Membership-Endpunkte](../api/endpoints/membership) -- Personen, Haushalte und Gruppen
- [Webhooks](../api/webhooks) -- Die Ereignisse `session.created`, `attendance.recorded` und `attendance.checkout`
- [Modulstruktur](../api/module-structure) -- Wie das Anwesenheitsmodul serverseitig organisiert ist
