---
title: "Check-in"
description: "So funktioniert der Check-in in B1Checkin, B1App und B1 Admin: das Datenmodell für Anwesenheit, Gruppen als Räume, Kapazitätsgrenzen und Sicherheitsregeln bei der Abholung."
---

# Check-in {#check-ins}

<div class="article-intro">

Der Check-in ist ein System mit drei Zugängen: die Kiosk-App B1Checkin für besetzte und selbstbediente Stationen, der Selbst-Check-in im Mitgliederbereich von B1App und die Anwesenheitsverwaltung in B1Admin. Alle drei schreiben in dasselbe Anwesenheitsmodul der zentralen Api, und die Zuweisung zu Klassenräumen erfolgt ausschließlich über Gruppen. Es gibt keine eigene Entität für „Standorte“ oder „Räume“. Darüber liegt eine Kinderschutz-Ebene mit Check-in-Typen pro Besuch, serverseitigen Kapazitäts- und Betreuungsschlüssel-Prüfungen, altersbezogenen und klassenbezogenen Prüfungen am Kiosk, der Verifizierung vertrauenswürdiger Abholpersonen beim Check-out sowie der Benachrichtigung der Eltern über den Textnachrichten-Anbieter der Kirche. Diese Seite beschreibt das Datenmodell, die Check-in-Abläufe, die Sicherheitsebene und die Druckpipeline für Etiketten.

</div>

## Überblick {#overview}

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

| Oberfläche | Repository | Technik | Rolle |
|---------|------|-------|------|
| Kiosk | `B1Checkin` | Expo / React Native, Dateirouting über expo-router; EAS-Builds für Android, Amazon Fire und iOS; OTA-Updates über `expo-updates` | Besetzte oder selbstbediente Station mit Etikettendruck und geprüftem Check-out |
| Selbst-Check-in | `B1App` | Next.js (Mitgliederbereich b1.church) | Angemeldete Mitglieder checken ihren Haushalt mit dem Handy ein; kein Druck |
| Verwaltung | `B1Admin` | React-SPA | Konfiguriert die Gottesdienststruktur, weist Gruppen Gottesdienstzeiten zu, gestaltet Etiketten, erfasst manuelle Anwesenheit und erstellt Auswertungen |

Alle drei greifen über `ApiHelper` auf dieselben zwei API-Module zu: **MembershipApi** (`/membership`) für Personen, Haushalte und Gruppen; **AttendanceApi** (`/attendance`) für alles Weitere unten.

## Datenmodell (`Api/src/modules/attendance`) {#data-model-apisrcmodulesattendance}

| Entität / Tabelle | Wichtige Felder | Bedeutung |
|----------------|-----------|---------|
| `campuses` | name, address | Hier veraltet — Standorte werden im Mitgliedschaftsmodul gepflegt (`/membership/campuses`); die Kopie im Anwesenheitsmodul ist für ältere Lesezugriffe eingefroren und nur lesbar (`models/Campus.ts`) |
| `services` | campusId, name | Eine wiederkehrende Zusammenkunft, z. B. „Sonntagmorgen“ (`models/Service.ts`) |
| `serviceTimes` | serviceId, name, dayOfWeek, startTime, endTime, checkinOpenMinutes, checkinCloseMinutes | Ein Zeitfenster innerhalb eines Gottesdienstes, z. B. „9:00 Uhr“ (`models/ServiceTime.ts`). Die Zeitplanspalten sind optional (Migration `tools/migrations/attendance/2026-10-10_service_time_schedule.ts`) und steuern das [Check-in-Fenster](#scheduled-check-in-windows) |
| `groupServiceTimes` | groupId, serviceTimeId | Verknüpfungstabelle: welche Gruppen (Klassenräume) zu welchen Gottesdienstzeiten zusammenkommen (`models/GroupServiceTime.ts`) |
| `sessions` | groupId, serviceTimeId, sessionDate | Eine Zusammenkunft einer Gruppe an einem Datum — wird erst beim Check-in angelegt (`models/Session.ts`) |
| `visits` | personId, serviceId, visitDate, checkinTime, securityCode, checkinType, checkedInById, checkoutTime, checkedOutBy, checkedOutById | Eine Person nimmt an einem Datum teil (`models/Visit.ts`). `checkinType` ist `member` / `guest` / `volunteer` (NULL = Altbestand, Mitglied); wird vom Kiosk gesetzt und von den Kapazitäts- und Betreuungsschlüssel-Prüfungen ausgewertet |
| `visitSessions` | visitId, sessionId | Welche Sitzung(en) ein Besuch umfasst — ein Kind, das zu zwei Gottesdienstzeiten eingecheckt wird, erhält zwei Zeilen (`models/VisitSession.ts`) |
| `labelTemplates` | name, labelType (`nametag`/`pickup`), width, height, isDefault, content (JSON-Blöcke) | Frei gestaltbare Etikettenlayouts (`models/LabelTemplate.ts`) |

### So wird ein abgeschlossener Check-in gespeichert {#how-a-completed-check-in-is-persisted}

`VisitController.postCheckin` (`Api/src/modules/attendance/controllers/VisitController.ts`) verarbeitet `POST /attendance/visits/checkin?serviceId=&peopleIds=`. Der Body ist ein Array von `Visit`-Objekten, jeweils mit `visitSessions`, deren eingebettete `session` nur ein Paar `(serviceTimeId, groupId)` nennt. Der Server führt dann folgende Schritte aus:

1. **Prüft Kapazität und Betreuungsschlüssel vor jedem Schreibvorgang.** `evaluateGates()` → `CheckinGateHelper.evaluate()` prüft für jeden angesteuerten Raum Kapazität, Gästekapazität, Schließstatus und Betreuungsschlüssel gegenüber der aktuellen Belegung. postCheckin ist **nicht transaktional**, daher muss die Prüfung vor dem ersten Speichern laufen — ein harter Verstoß führt zu einer 409-Antwort mit den betroffenen Räumen, und es wird nichts gespeichert. Siehe [Kapazitäts- und Betreuungsschlüssel-Prüfungen](#capacity-and-volunteer-ratio-gates).
2. **Löst Sitzungen bei Bedarf auf.** `getSessionId()` findet oder erstellt den Eintrag in `sessions` für `(groupId, serviceTimeId, heute)`; Sitzungs-IDs werden pro Datum im Prozess zwischengespeichert. Neue Sitzungen lösen ein Webhook `session.created` aus. Die Schleife ist ein awaited `for..of` — ein früheres fire-and-forget `forEach(async …)` war mit dem Speichern im Wettlauf und schrieb bei der Erstellung der ersten Sitzung NULL-Sitzungs-IDs (behoben; im Code an der Schleife kommentiert).
3. **Ersetzt die Datensätze des Tages.** Vorhandene Besuche dieser Personen bei diesem Gottesdienst am heutigen Tag werden samt ihren Besuchssitzungen gelöscht, danach wird der übermittelte Satz gespeichert. Ein erneuter Check-in einer Familie ist daher eine idempotente Operation „dies ist der aktuelle Stand“ und kein Anhängen. Wird stattdessen `?checkDuplicates=true` übergeben, gibt der Endpunkt `{ duplicates: [personId…] }` zurück, ohne etwas zu schreiben. So warnt der Kiosk vor dem Überschreiben.
4. **Erzeugt pro Stapel einen Sicherheitscode.** `SecurityCodeHelper.generate()` erzeugt einen 4-stelligen Code aus dem Zeichensatz `23456789BCDFGHJKLMNPQRSTVWXYZ` (ohne Vokale und mehrdeutige Zeichen, damit Codes keine Wörter bilden und nicht verwechselt werden). Bei Kollisionen mit offenen Besuchen derselben Kirche am selben Tag wiederholt der Server die Erzeugung und vergibt den Code an jeden Besuch des Stapels.
5. **Gibt `{ streaks, securityCode }` zurück.** `streaks` ordnet jeder personId die Anzahl aufeinanderfolgender Anwesenheitswochen zu; der Kiosk feiert Meilensteine (jede fünfte Woche) mit Konfetti.

Jeder gespeicherte Besuch löst außerdem ein Webhook `attendance.recorded` aus. Die Leseseite, `GET /attendance/visits/checkin`, liefert die Besuche der Personen ab ihrem **zuletzt erfassten Datum**. Lag dieses in einer früheren Woche, werden die IDs entfernt, sodass der Client eine vorausgefüllte Kopie der Raumauswahl der letzten Woche erhält, die als neue Datensätze gespeichert wird.

### Check-out {#check-out}

Drei Endpunkte schließen den Ablauf ab (`VisitController`):

- `GET /attendance/visits/code/:code` — heutige, noch nicht ausgecheckte Besuche mit diesem Sicherheitscode, mit befüllten Sitzungen.
- `GET /attendance/visits/active?peopleIds=` — heutige, noch nicht ausgecheckte Besuche der aufgelisteten Personen (mit beliebigem Sicherheitscode), mit befüllten Sitzungen; 400, wenn `peopleIds` leer ist. Wird für den Check-out per Name verwendet.
- `POST /attendance/visits/checkout` — Body `{ visitIds, checkedOutBy?, checkedOutById? }`; setzt `checkoutTime` und vermerkt, wer abgeholt hat, und löst pro Besuch ein Webhook `attendance.checkout` aus.

Berechtigungen: Kioske authentifizieren sich mit `attendance.checkin`. Diese Berechtigung umfasst genau den Check-in-, Check-out- und Etikettenvorlagen-Bereich sowie die Haushaltssuchen, die ein Kiosk ohne `people.view` braucht (Suche nach Telefon oder Name, Haushaltsmitglieder im Check-in-Modell und die Liste der Abholpersonen des Haushalts). Die Kontoauswahl in B1Checkin (`SessionHelper.filterChurches`) bietet nur Kirchen an, bei denen das Konto `Attendance/Checkin` oder `Attendance/Edit` besitzt. `Checkin` ist nicht mehr Teil der Berechtigungen für alle Benutzer ohne Rolle (`RoleHelper` und Migration `2026-11-01_remove_everyone_checkin`), es muss daher über eine echte Rolle vergeben werden. `attendance.view` und `attendance.edit` decken Auswertungen und manuelle Erfassung ab; die Struktur (Gottesdienste, Gottesdienstzeiten, Gruppenzuweisungen) erfordert `services.edit`. Der Selbst-Check-in von Mitgliedern (B1App) benötigt keine Berechtigung: Jeder angemeldete Benutzer mit einer verknüpften Person in der Kirche darf `GET`/`POST /attendance/visits/checkin` aufrufen, und der Server beschränkt die übermittelten `personId`s auf den eigenen Haushalt des Aufrufers (sonst 403). Diese Sperre verhindert, dass andere Familien ihre `securityCode`s auslesen können. Die Mitgliedschaft ist die Berechtigung; ob Mitglieder die Funktion *sehen*, steuert der B1App-Navigationsreiter der Kirche. Die übrigen Check-in-Endpunkte (`code/:code`, `active`, `checkout`, `guardians`, `CheckinController`) bleiben Kiosken und Mitarbeitenden vorbehalten.

## Gruppen steuern die Raumzuweisung {#groups-drive-room-routing}

Im gesamten System gibt es keine Entität für Räume oder Klassenzimmer. Ein „Raum“ ist eine Mitgliedschaftsgruppe mit aktiviertem `trackAttendance`, die über `groupServiceTimes` mit einer oder mehreren Gottesdienstzeiten verknüpft ist. Die Gruppenfelder (in `Api/src/modules/membership/models/Group.ts`), die das Kiosk-Verhalten bestimmen:

| Feld | Wirkung |
|------|--------|
| `trackAttendance` | Gruppe nimmt überhaupt an der Anwesenheitserfassung teil; die Struktur-Ansicht in B1Admin markiert `trackAttendance`-Gruppen ohne `groupServiceTimes`-Eintrag als nicht zugewiesen |
| `parentPickup` | Markiert einen Kinderraum: Der Check-in dort macht den Besuch zu einem „Kind“-Besuch, es wird ein Familien-Abholetikett gedruckt und der Sicherheitscode auf das Namensschild gesetzt |
| `printNametag` | Ob Check-ins in diese Gruppe überhaupt ein Namensschild drucken |
| `capacity` / `guestCapacity` / `checkinClosed` | Raumkapazitäten und ein hartes Schalter-„geschlossen“; serverseitig durch die Check-in-Prüfung erzwungen (bearbeitet in B1Admin unter den Gruppeneinstellungen unter „Check-in-Kapazität“) |
| `volunteerRatio` / `minVolunteers` | Verhältnis Kinder je Freiwilligem und minimale Anzahl Freiwilliger; durchgesetzt gemäß der kirchenweiten Einstellung `ratioEnforcement` |
| `minAgeMonths` / `maxAgeMonths` / `minGrade` / `maxGrade` | Grenzen für Alter und Klasse, die am Kiosk ausgewertet werden, um Räume hervorzuheben oder abzudunkeln |

Alle Clients lösen die Zuordnung auf die gleiche Weise auf (z. B. `B1Checkin/app/services.tsx`, `B1App/src/app/[sdSlug]/mobile/components/screens/CheckinPage.tsx`): Sie laden parallel `GET /attendance/servicetimes?serviceId=`, `GET /attendance/groupservicetimes` und `GET /membership/groups` und sammeln dann für jede Gottesdienstzeit die Gruppen, deren `groupServiceTimes`-Eintrag auf sie verweist, in `serviceTime.groups`. Dieses Array zeigt die Raumauswahl, gegliedert nach dem `categoryName` der Gruppe.

Zuweisungen werden auf der Gruppenseite in B1Admin bearbeitet (`B1Admin/src/groups/components/ServiceTimesEdit.tsx` — `POST`/`DELETE /attendance/groupservicetimes`). Der gesamte Baum Standort → Gottesdienst → Gottesdienstzeit → Gruppe wird in `B1Admin/src/attendance/components/AttendanceSetup.tsx` über `GET /attendance/attendancerecords/tree` dargestellt.

:::info
Da Gruppen die einzige Quelle der Wahrheit sind, speisen dieselben Gruppenmitgliedschaften das Raum-Routing am Kiosk, die listenartige Anwesenheitserfassung auf den Gruppenseiten in B1Admin und die Anwesenheitsauswertungen. Die Zuweisung einer Gruppe zu einer Gottesdienstzeit ist der einzige Schritt, damit sie zu einem Check-in-Ziel wird.
:::

## Kinderschutz {#child-safety}

### Check-in-Typen {#check-in-types}

Jeder Besuch hat einen `checkinType` — `member`, `guest` oder `volunteer` (NULL bedeutet Altbestand/Mitglied; Migration `tools/migrations/attendance/2026-07-03_checkin_type.ts`). Den Typ wählt der **Kiosk**: Die Auswahlchips Mitglied / Gast / Ehrenamtlich in der aufgeklappten Mitgliederzeile (`B1Checkin/src/components/MemberServiceTimes.tsx`) werden beim Abschluss jedem offenen Besuch zugewiesen (`app/checkinComplete.tsx`, Standard ist `member`). Der Server wertet ihn in der Prüfung aus: Freiwillige zählen für die Betreuungsschlüssel-Abdeckung statt gegen die Kapazität, Gäste zählen gegen `guestCapacity`.

### Kapazitäts- und Betreuungsschlüssel-Prüfungen {#capacity-and-volunteer-ratio-gates}

`CheckinGateHelper.evaluate()` (`Api/src/modules/attendance/helpers/CheckinGateHelper.ts`) läuft in `postCheckin` vor jedem Speichern (der Endpunkt ist nicht transaktional, daher ist die Prüfung vor dem Speichern der Mechanismus für Korrektheit). Sie lädt die aktuelle Belegung je angesteuerter Gruppe (`VisitRepo.countActiveByGroupToday`) sowie die Gruppenkonfiguration über das Gateway des Mitgliedschaftsmoduls und ordnet dann Verstöße ein:

- **Hart (blockiert immer):** `checkinClosed`, `aktuell + eingehend > capacity`, Gästeanzahl über `guestCapacity`. Der Stapel wird mit `409 { error: "capacity", groups: [{ groupId, groupName, reason }] }` abgelehnt — der Kiosk zeigt den betroffenen Raum an.
- **Betreuungsschlüssel (warnen oder blockieren):** eingehende Nicht-Freiwillige in einem Raum, in dem `volunteers < minVolunteers` gilt, keine Freiwilligen vorhanden sind oder `children > volunteers × volunteerRatio` gilt. Die Schwere richtet sich nach der kirchenspezifischen Einstellung `ratioEnforcement` (`"warn"` Standard / `"block"`, bearbeitet in B1Admin unter Gemeinde verwalten → Check-in, `CheckinSettingsEdit.tsx`). Im Warnmodus gibt der Endpunkt `409 { warning: true, error: "ratio", … }` zurück, sofern der Client nicht mit `acknowledgeWarnings=true` erneut sendet — dieses erneute Senden ist die Bestätigung durch Mitarbeitende am Kiosk.

### Geplante Check-in-Fenster {#scheduled-check-in-windows}

Eine Gottesdienstzeit kann einen optionalen wöchentlichen Zeitplan haben (`dayOfWeek` 0–6, wobei 0 = Sonntag, `startTime`/`endTime` als `HH:mm`, `checkinOpenMinutes`, `checkinCloseMinutes`). Er wird im Formular **Anwesenheit → Einrichtung** für die Gottesdienstzeit in B1Admin bearbeitet (`B1Admin/src/attendance/components/ServiceTimeEdit.tsx`, „Check-in-Zeitplan“). `CheckinGateHelper.hasSchedule()` behandelt eine Gottesdienstzeit nur dann als geplant, wenn sowohl `dayOfWeek` als auch `startTime` gesetzt sind; ungeplante Zeiten werden nie zeitlich begrenzt. `isServiceTimeOpen()` berechnet das Fenster in der lokalen Wanduhrzeit (`DateHelper.toChurchTime`). Die Zeitzone wird je Gottesdienstzeit von `CheckinTimeZoneHelper.load()` ermittelt (`Api/src/modules/attendance/helpers/CheckinTimeZoneHelper.ts`): Zuerst gilt die `timezone` des Standorts des Gottesdienstes (`service.campusId`, über `MembershipModuleGateway.loadCampusTimeZones`), dann die `timeZone` der Kirche (in B1Admin unter Gemeindeinformationen festgelegt), danach die erste nicht entfernte Standort mit einer `timezone` (`loadCampusTimeZone`), und erst zuletzt `America/New_York`. Der Standort kommt zuerst, weil viele Kirchen `America/New_York` als Kirchenzeitzone nachträglich eingetragen bekamen. Sowohl die Auflistung als auch der Übermittlungspfad unten ermitteln die Zeitzone auf dieselbe Weise. Das Fenster reicht von `checkinOpenMinutes` vor dem Beginn bis `checkinCloseMinutes` nach dem Ende (oder nach dem Beginn, wenn es kein Ende gibt) und berücksichtigt Fenster, die über Mitternacht oder die Wochengrenze hinausreichen.

Das Fenster wird an zwei Stellen erzwungen:

- **Auflistung:** `GET /attendance/servicetimes` versieht jede Zeile mit einem berechneten Boolean `checkinOpen`. Der Selbst-Check-in in B1App (`CheckinPage.tsx`) und die Gottesdienstauswahl in B1Checkin (`app/services.tsx`) behalten jede Zeit bei. Sind alle Zeiten eines Gottesdienstes geschlossen, zeigen sie die nächste Öffnung an („Check-in öffnet So. 9:30 Uhr.“ in B1App, „Der Check-in für diesen Gottesdienst öffnet So. 9:30 Uhr.“ in B1Checkin, aus `CheckinHelper.opensLabel` / `ServiceTimeHelper.getOpensLabel`). Lässt sich keine Öffnung berechnen, erscheint „Der Check-in ist für diesen Gottesdienst derzeit nicht geöffnet.“ (der Kiosk bietet dann eine Zurück-Schaltfläche, um einen anderen Gottesdienst zu wählen). Andernfalls werden geschlossene Zeiten als nicht auswählbare Zeile „Geschlossen“ / „Geschlossen · öffnet 9:30 Uhr“ dargestellt. Der Haushaltsbildschirm von B1Checkin (`MemberServiceTimes.tsx`) prüft die Öffnung live anhand der Geräte-Uhr über `ServiceTimeHelper.isCheckinOpen()` (Zeitzone des Geräts, nicht der Kirche), damit ein dauerhaft laufender Kiosk pünktlich öffnet und schließt. Bei einer geschlossenen Zeit, für die die Person bereits eingecheckt ist, zeigt er „Kinderraum 1 · Eingecheckt“ (Gruppenname) an.
- **Übermittlung:** Innerhalb von `evaluateGates()`, vor der Kapazitäts- und Betreuungsschlüssel-Prüfung, lehnt `findClosedServiceTimeGroups()` den Stapel mit `409 { error: "notOpen", groups: [{ groupId, groupName, reason: "notOpen" }] }` ab, wenn die Gottesdienstzeit einer angesteuerten Sitzung außerhalb ihres Fensters liegt. Da die heutigen Besuche eines Haushalts bei jedem Check-in erneut übermittelt werden, überspringen Sitzungen, die die Person bereits hat (`personId|sessionId` in den bestehenden Besuchen), diese Prüfung. So wird eine spätere, offene Gottesdienstzeit nicht abgelehnt, nur weil ein früheres Fenster bereits geschlossen ist. B1Checkin zeigt dies über den harten Prüfbildschirm mit dem Grund „Check-in ist im Moment nicht geöffnet“ an (Kapazitätsverstöße lauten weiterhin „Raum ist voll oder geschlossen“).

### Alters- und Klassenprüfung (am Kiosk) {#agegrade-eligibility-kiosk-side}

Die Eignung eines Raums ist eine beratende Anzeige, die am Kiosk ausgewertet, aber nicht vom Server erzwungen wird. `B1Checkin/src/helpers/EligibilityHelper.ts` vergleicht Geburtsdatum und Klasse einer Person mit `minAgeMonths`/`maxAgeMonths`/`minGrade`/`maxGrade` der Gruppe (Klassenreihenfolge: PreK, K, 1–12, Graduated) und gibt `eligible` / `ineligible` / `unknown` zurück. Fehlen Daten, ergibt sich `unknown`, und der Raum wird nie ausgeblendet. Alter und Klasse werden zum **Stichtag der Klassenstufe** berechnet (Einstellung `gradePromotionDate`, Format `"MM-DD"`, bearbeitet in `B1Admin/src/settings/components/GradePromotionSettingsEdit.tsx`); der Kiosk ruft sie über `GET /attendance/checkin/settings` ab, und `resolveAsOfDate` wählt das letzte Vorkommen am heutigen Tag oder davor. Die Raumauswahl hebt geeignete Räume hervor und dimmt ungeeignete ab; wer einen abgedimmten Raum wählt, benötigt die Bestätigung durch Mitarbeitende.

### Vertrauenswürdige und nicht zugelassene Abholpersonen {#trusted-and-not-authorized-pickup}

Abholpersonen sind eine Entität des Mitgliedschaftsmoduls und gehören zu einem Haushalt: `householdPickupPeople` (`Api/src/modules/membership/models/HouseholdPickupPerson.ts` — householdId, optional personId, name, photoUrl, relationship, `status` `trusted` / `notAuthorized`, notes). Die Verwaltung erfolgt über `GET /membership/householdpickup/:householdId` (für jeden angemeldeten Benutzer der Kirche, damit Kioske die Liste lesen können) sowie `POST` / `DELETE`, die durch `people.edit` geschützt sind. Mitarbeitende pflegen die Liste auf der Karte **Abholung** der Personenseite (`B1Admin/src/people/components/PickupPeople.tsx`) — mit Foto, Beziehung und einem Statuschip Vertrauenswürdig / Nicht autorisiert.

Beim Check-out (`B1Checkin/app/checkout.tsx`) lädt der Kiosk die Abholliste des Haushalts: Einträge mit `trusted` erscheinen als antippbare Abholkarten neben dem Fotoraster der erwachsenen Haushaltsmitglieder. Ein frei eingegebener Name unter „Andere“ wird unscharf (Levenshtein, `src/helpers/PickupMatchHelper.ts`) mit den Einträgen `notAuthorized` verglichen. Trifft er zu, blockiert ein Warnhinweis den Check-out und bietet eine Schaltfläche **Überschreiben** für Mitarbeitende. Die Übersteuerung wird im Besuch selbst protokolliert: Sie übermittelt `checkedOutBy` als `"OVERRIDE: {name}"` über den normalen `POST /attendance/visits/checkout`. Sie landet also im Anwesenheitsdatensatz und im Webhook `attendance.checkout`, nicht in einer eigenen Prüftabelle.

### Eltern benachrichtigen und Notfall-Rundsendung {#page-a-parent-and-emergency-broadcast}

`CheckinController` (`Api/src/modules/attendance/controllers/CheckinController.ts`, `/attendance/checkin`) stellt zwei SMS-Endpunkte bereit:

- `POST /page` — `{ visitId, message }`: benachrichtigt die Erziehungsberechtigten eines eingecheckten Kindes (Check-out-Bildschirm des Kiosks, besetzter Modus).
- `POST /broadcast` — `{ serviceId, message }`: sendet eine Textnachricht an alle Erwachsenen aller eingecheckten Haushalte für einen Gottesdienst (Admin-Einstellungen des Kiosks, hinter einem Bestätigungsdialog, bei dem `EMERGENCY` eingegeben werden muss, in `B1Checkin/app/adminSettings.tsx`).

Beide lösen die Erwachsenen der Haushalte über das Gateway des Mitgliedschaftsmoduls auf und übergeben die Zustellung an **`MessagingModuleGateway.sendBulkText`** (`Api/src/shared/modules/MessagingModuleGateway.ts`). Das ist die modulübergreifende Schnittstelle zum konfigurierten Textnachrichten-Anbieter der Kirche (`@churchapps/texting`: TextInChurch, Clearstream oder MutualMinistry; einen eingebauten SMS-Versand gibt es nicht). Das Gateway protokolliert einen Eintrag `sentText` plus je Empfänger Einträge in `deliveryLog` und begrenzt einen Stapel auf 500 Empfänger. Ist kein Anbieter konfiguriert, gibt es `no_provider` zurück, was der Kiosk als „Kein SMS-Anbieter konfiguriert“ anzeigt. Der `dispatch()`-Controller entfernt doppelte Telefonnummern und überspringt Personen ohne Mobilnummer oder mit gesetztem `optedOut`. Er gibt `{ sent, failed, skippedOptedOut, skippedNoPhone }` zurück, damit der Kiosk anzeigen kann, was übersprungen wurde.

## Der Kiosk (B1Checkin) {#the-kiosk-b1checkin}

Die Bildschirme sind expo-router-Dateien unter `B1Checkin/app/`. Zustand, der mehrere Bildschirme betrifft, liegt in der statischen Klasse `CachedData` (`src/helpers/CachedData.ts`), nicht im React-Zustand.

```
index (boot/auto-login) → selectChurch → services ──▶ lookup ──▶ household ──▶ checkinComplete
                                          │             │  ▲         │ │            │
             loads serviceTimes, groups,  │             │  └─────────┘ └▶ addGuest  └▶ print labels,
             groupServiceTimes,           │             └▶ checkout (manned)           auto-return
             labelTemplates               │                                            to lookup
```

1. **Suche** (`app/lookup.tsx`) — Suche nach Telefonnummer (`GET /membership/people/search/phone?number=`, letzte vier Ziffern oder vollständig) oder nach Name (`GET /membership/people/search?term=`). Die Auswahl eines Treffers lädt den Haushalt (`GET /membership/people/household/{householdId}`) und die vorhandenen Besuche (`GET /attendance/visits/checkin`) und befüllt `pendingVisits` mit den Auswahlen der letzten Woche.
2. **Haushaltsprüfung** (`app/household.tsx`, `src/components/MemberList.tsx`) — Jede Mitgliederzeile zeigt ein Abzeichen für bereits eingecheckt, ein Abzeichen für Allergie bzw. `nametagNotes` und ihre aktuellen Raumchips. Wird ein Mitglied aufgeklappt, listet es jede Gottesdienstzeit mit einer Raumschaltfläche und den Check-in-Typ-Chips Mitglied / Gast / Ehrenamtlich (`MemberServiceTimes.tsx`). Unter jedem Namen einer Gottesdienstzeit zeigt `ServiceTimeHelper.getGroupSummary()` die dort angebotenen Gruppen (die Namen aus `serviceTime.groups`, gekürzt, ohne Groß-/Kleinschreibung dedupliziert und durch Kommas verbunden). Hat die Zeit keine Gruppen, wird nichts angezeigt.
3. **Gruppenzuweisung** (`app/selectGroup.tsx`) — ein Kategorienbaum aus `serviceTime.groups`, in dem altersgerechte bzw. klassenpassende Räume hervorgehoben und ungeeignete hinter einer Bestätigung durch Mitarbeitende abgedimmt sind (siehe [Alters- und Klassenprüfung](#agegrade-eligibility-kiosk-side)). Wird ein Raum gewählt, schreibt der Kiosk einen Eintrag `{ session: { serviceTimeId, groupId } }` als visitSession in den offenen Besuch dieser Person (`src/helpers/VisitSessionHelper.ts`). „Keine“ hebt die Auswahl auf.
4. **Abschluss** (`app/checkinComplete.tsx`) — `POST /attendance/visits/checkin` mit `pendingVisits` (jeweils mit `checkinType` versehen). Danach werden Etiketten gedruckt, falls ein Drucker konfiguriert ist, und die Ansicht kehrt automatisch zur Suche zurück. Antwortet die Schnittstelle mit `409` für Kapazität oder `notOpen`, zeigt der Kiosk den betroffenen Raum mit dem Grund an (voll bzw. geschlossen oder Check-in nicht geöffnet). Ein Betreuungsschlüssel-Warnhinweis bietet eine Bestätigung durch Mitarbeitende, die mit `acknowledgeWarnings=true` erneut sendet.

Der **Check-out**-Bildschirm (`app/checkout.tsx`) nimmt den 4-stelligen Sicherheitscode über ein automatisch fokussiertes Eingabefeld entgegen, sodass USB- bzw. Bluetooth-Tastatur-Scanner ohne Kamera funktionieren, oder über ein Tastenfeld auf dem Bildschirm mit demselben Zeichensatz, das nach 4 Zeichen automatisch absendet. Die Schaltfläche **Scannen** öffnet ein Blatt mit der gemeinsamen Kamera-Komponente `src/components/CodeScanner.tsx` (standardmäßig die rückseitige Kamera; akzeptiert QR, Code 128 und Code 39). So können Stationen ohne Tastatur-Scanner das Abholetikett lesen. Ein gescannter Code läuft über denselben Pfad `handleCode()` wie eine eingegebene Zeichenfolge. Die Schaltfläche **Nach Name suchen** ersetzt die Codeeingabe durch `src/components/HouseholdSearch.tsx` (Suche nach Nachname oder Telefonnummer, über dieselben Endpunkte `/membership/people/search` wie bei der Suche). Wird eine Person gewählt, lädt der Kiosk ihren Haushalt (`GET /membership/people/household/{householdId}`) und ruft mit allen IDs der Mitglieder `GET /attendance/visits/active?peopleIds=` auf, sodass ein verlorenes Etikett die Abholung nicht blockiert. In jedem Fall zeigt der Bildschirm die abzuholenden Kinder und stellt die **vertrauenswürdigen Abholpersonen** des Haushalts als antippbare Karten neben ein Fotoraster der erwachsenen Haushaltsmitglieder (zusätzlich eine Option „Andere“ als Freitext, der gegen nicht zugelassene Namen unscharf geprüft wird — siehe [Vertrauenswürdige und nicht zugelassene Abholpersonen](#trusted-and-not-authorized-pickup)). Anschließend sendet er `POST /attendance/visits/checkout` mit Name und ID der abholenden Person. Im besetzten Modus bietet der Bildschirm außerdem **Eltern benachrichtigen** (`POST /attendance/checkin/page`) und einen erneuten Druck des **Sicherheitsetiketts**. `reprint()` erstellt die Etiketten der Familie mit `LabelHelper.getAllLabelsFor(...)` neu und leitet sie über dieselbe `PrintUI`-Pipeline wie beim Check-in.

Der Charakter der Station wird über das AsyncStorage-Flag `@StationMode` gesteuert (`"self"` | `"manned"`, umgeschaltet in `app/adminSettings.tsx`). Der besetzte Modus fügt auf dem Suchbildschirm den Einstieg zum Check-out hinzu und ermöglicht auf dem Haushaltsbildschirm die Bearbeitung der Personenprofile (`POST /membership/people`). Der Kiosk ist abgesichert: Eine optionale PIN (`app/setPin.tsx`, `src/components/PinEntryModal.tsx`) schützt den Admin- und Druckerbereich. Der Admin-Bildschirm öffnet sich nur nach 7 schnellen Tipps auf das Logo in der Kopfzeile, und ein Ruhebildschirm (`src/hooks/useInactivityTimer.ts`) übernimmt zwischen den Familien.

## Selbst-Check-in (B1App) {#self-check-in-b1app}

Mitglieder checken sich über das Portal b1.church auf dem Bildschirm `/mobile/checkin` ein (weitergeleitet von `B1App/src/app/[sdSlug]/mobile/components/ScreenRouter.tsx` an `screens/CheckinPage.tsx`). Dafür ist eine Anmeldung nötig. Der Ablauf umfasst dieselben vier Schritte wie am Kiosk — Gottesdienste → Haushalt → Gruppen → Abschluss — mit denselben Endpunkten. Der Zustand wird in `B1App/src/helpers/CheckinHelper.ts` gehalten. Die Unterschiede zum Kiosk: Der Haushalt stammt aus der eigenen `householdId` des angemeldeten Benutzers (kein Suchschritt), und es wird nichts gedruckt. Stattdessen zeigt der Abschlussbildschirm den Sicherheitscode des Stapels als QR-Code (`qrcode.react`) mit dem Hinweis „Zeigen Sie dies an einer Check-in-Station“. Ist der Haushalt beim Laden der Seite bereits eingecheckt, zeigt eine Schaltfläche „Check-in-Code anzeigen“ den QR-Code erneut an. Dafür wird der erste vorhandene Besuch mit einem `securityCode` aus `GET /attendance/visits/checkin` verwendet. Der Check-in wird sofort beim Absenden erfasst (es gibt keinen Zwischenstatus). Der QR-Code dient nur dem Etikettendruck am Kiosk.

**Etikettendruck vom Telefon am Kiosk** (`B1Checkin/app/scan.tsx`, erreichbar über die Schaltfläche „Code scannen“ beim QR-Code auf dem Suchbildschirm): Der Kiosk zeigt `CodeScanner` (eine `expo-camera`-`CameraView`, standardmäßig die Frontkamera, umschaltbar), der nach QR-Codes sucht. `ScanCodeHelper.parse()` akzeptiert eine Nutzlast nur, wenn sie ein reiner 4-stelliger Code aus dem Sicherheitscode-Zeichensatz ist. `ScanCodeHelper.isRepeat()` ignoriert denselben Code 4 Sekunden lang. So funktionieren sowohl der QR-Code aus B1App als auch der QR-Block eines gedruckten Etiketts. Der Bildschirm folgt dann dem Pfad für den erneuten Druck beim Check-out — `GET /attendance/visits/code/{code}` → `GET /membership/people/ids` → `LabelHelper.getAllLabelsFor(visits, people, code)` → `PrintUI` — und kehrt zur Suche zurück. Beim Scannen wird nichts in der Anwesenheit geschrieben; es werden nur Etiketten gedruckt. Codes ohne aktive Besuche, Stationen ohne Drucker und Gruppen ohne Etikett zeigen jeweils eine Kurzmeldung und führen zur Suche zurück.

Typen sowie `ApiHelper`/`ArrayHelper` stammen aus `@churchapps/helpers` und `@churchapps/apphelper`. React-Komponenten werden nicht mit B1Admin geteilt.

## Anwesenheit in der Verwaltung (B1Admin) {#admin-side-attendance-b1admin}

- **Einrichtung** — `/attendance` (`B1Admin/src/attendance/AttendancePage.tsx`) zeigt die Strukturansicht und legt Gottesdienste (`ServiceEdit.tsx`) und Gottesdienstzeiten (`ServiceTimeEdit.tsx`) an. Standortdaten kommen aus dem Mitgliedschaftsmodul über den Hook `useCampuses()`.
- **Manuelle Anwesenheit** liegt im Bereich Gruppen, nicht im Bereich Anwesenheit: `B1Admin/src/groups/components/GroupSessionsTab.tsx` legt Sitzungen an (`POST /attendance/sessions`; beim Hinzufügen kann `SessionEdit.tsx` für jede andere Gruppe mit derselben Gottesdienstzeit eine Sitzung anlegen und dabei Gruppen überspringen, die an diesem Datum bereits eine Sitzung haben). Personen werden über `POST /attendance/visitsessions/log` als anwesend markiert, was den Besuch der Person für diese Sitzung findet oder anlegt. Gruppenleiter können die Anwesenheit ihrer eigenen Gruppen erfassen, ohne die Berechtigung `attendance.edit` zu besitzen — die Controller prüfen `au.leaderGroupIds`.
- **Auswertung** — Anwesenheitstrend und Gruppenanwesenheit sind serverseitig definierte Berichte (`B1Admin/src/components/reporting/ReportWithFilter.tsx` gegen die ReportingApi; Definitionen in `Api/reports/*.json`). Beide erwarten `startDate`/`endDate` (Enddatum inklusive). Der Trendbericht umfasst standardmäßig den Zeitraum von vor einem Jahr bis heute und fügt eine Spalte `sessionDates` pro Woche hinzu. Die Baumansicht der Gruppenanwesenheit enthält den `checkinTime` jedes Besuchs und den `membershipStatus` der Person. Die CSV-Datei der Gruppenanwesenheit stammt aus dem zugehörigen Bericht `groupAttendanceDownload`, den `GroupAttendanceDownloadHelper` in eine Zeile pro Gruppenmitglied umwandelt, mit einer Spalte „anwesend/abwesend“ je datierter Sitzung. Der Anwesenheitsverlauf einer Person ist `GET /attendance/attendancerecords?personId=` (`B1Admin/src/people/components/PersonAttendance.tsx`).

## Etikettendruck {#label-printing}

### Vorlagen und Gestaltung {#templates-and-the-designer}

Kirchen gestalten ihre Etiketten in B1Admin unter `/mobile/checkin/labels` (`B1Admin/src/attendance/LabelsPage.tsx` + `components/LabelEditor.tsx`, erreichbar über die Check-in-Einstellungsseite). Eine Vorlage ist eine Zeile `labelTemplates`, deren `content` ein JSON-Array von Blöcken ist — `text`, `field`, `barcode`, `qrcode` oder `box`. Jeder Block ist in Prozentkoordinaten positioniert und hat Schriftart, Ausrichtung, Symbologie (`code39`/`code128`/`qr`) und optionale Sichtbarkeitsbedingungen (z. B. das Allergie-Feld nur anzeigen, wenn `person.nametagNotes` nicht leer ist). Es gibt zwei `labelType`-Werte: `nametag` (eines pro eingechecktem Person; mit Feldern wie `person.displayName`, `sessions`, `securityCode` und `person.isBirthdayWeek` — `"true"`, wenn Monat und Tag des Geburtstags höchstens 3 Tage von heute entfernt sind, auch über den Jahreswechsel, berechnet von `LabelHelper.isBirthdayWithin()`) und `pickup` (eines pro Familie; mit Feldern wie `children`, `childrenAllergies`). Der Server erzwingt je Typ und Kirche genau eine Standardvorlage (`LabelTemplateController.save`). Der Designer bringt Startvorlagen mit, die die gebündelten Etiketten des Kiosks nachbilden, und zeigt Vorschauen mit Beispieldaten an.

### Darstellung und Druck am Kiosk {#rendering-and-printing-on-the-kiosk}

Beim Abschluss des Check-ins entscheidet `B1Checkin/src/helpers/LabelHelper.ts` anhand der Gruppenmerkmale jedes offenen Besuchs, was gedruckt wird: Namensschilder für Gruppen mit `printNametag` und ein Familien-Abholetikett, sobald ein Besuch eine Gruppe mit `parentPickup` getroffen hat. Besuche mit `checkinType` `volunteer` werden von `LabelHelper.selectChildVisits()` übersprungen. Ein Betreuer in einem Raum mit Elternabholung löst also nie ein Abholetikett aus. Der Sicherheitscode aus der Check-in-Antwort kommt auf die Namensschilder der Kinder und auf das Abholetikett; Namensschilder für Erwachsene werden ohne Code gedruckt. Hat die Kirche Vorlagen, verwandelt `LabelRenderer` (`src/helpers/LabelRenderer.ts`) die Blöcke und einen Feldkontext in ein eigenständiges HTML-Dokument. Andernfalls werden die gebündelten HTML-Etiketten aus `B1Checkin/assets/labels/` mit Platzhalterersetzung verwendet.

Barcodes entstehen als Inline-SVG über rein in TypeScript geschriebene Kodierer in `B1Checkin/src/helpers/barcode.ts`: Musterlisten für Code 39 und Breitentabellen für Code 128 (Zeichensatz B mit Prüfsumme mod 103), dazu QR-Codes über das Paket `qrcode`. **Diese Kodierer sind bewusst in B1Admin doppelt vorhanden** (`LabelEditor.tsx` übernimmt dieselben Tabellen, im Code kommentiert), damit die Vorschauen im Designer pixelgenau dem Kiosk-Druck entsprechen. Eine Änderung an einer Stelle muss an der anderen nachgezogen werden.

Die Druckpipeline (`src/components/PrintUI.tsx`) stellt jedes HTML-Etikett in einer `WebView` dar, erfasst es über `react-native-view-shot` als JPG und übergibt die Bild-URIs an das native Expo-Modul **printer-helper** (`B1Checkin/modules/printer-helper/`). Das Modul stellt `scan()`, `checkInit()`, `printUris()` und Statusereignisse bereit, mit einem Anbieter je Hersteller auf beiden Plattformen:

| Hersteller | Android | iOS | Hinweise |
|-------|---------|-----|-------|
| Brother | `BrotherProvider.kt` (Brother-Print-SDK) | `BrotherProvider.swift` (`BRLMPrinterKit.xcframework`) | Netzwerkdrucker der QL-Serie (QL-800/810W/820NWB/1100/1110NWB…), Stanzetiketten 29×90, die empfohlene Standardeinstellung |
| Zebra | `ZebraProvider.kt` (Link-OS-SDK) | `ZebraProvider.swift` + `ZebraBridge` | Netzwerkerkennung + TCP/ZPL-Bilddruck |

Die Druckerauswahl befindet sich in `app/printers.tsx` (der Netzwerkscan liefert Einträge der Form `brand~model~ip`; die Auswahl wird in AsyncStorage gespeichert). `src/helpers/PrinterLog.ts` führt ein Diagnoseprotokoll auf dem Gerät, das über eine Statusanzeige im Kopfbereich des Kiosks sichtbar ist.

## Gastregistrierung {#guest-registration}

Zwei Wege legen eine Person während des Check-ins an:

- **Am Kiosk** — Die Schaltfläche „Gast hinzufügen“ auf dem Haushaltsbildschirm öffnet `B1Checkin/app/addGuest.tsx`. Diese sucht zuerst über `GET /membership/people/search?term=` nach einem vorhandenen Treffer, der kein Mitglied ist. Gibt es keinen, legt sie über `POST /membership/people` eine Person an, die dem aktuellen Haushalt zugeordnet wird. Der Gast durchläuft danach die Gruppenzuweisung wie jedes Mitglied.
- **Selbstbedienung per QR-Code** — Ist die Kircheneinstellung `enableQRGuestRegistration` aktiviert (in den Check-in-Einstellungen von B1Admin festgelegt und über `GET /membership/settings/public/{churchId}` gelesen), zeigt der Suchbildschirm des Kiosks einen QR-Code, der auf `https://{subdomain}.b1.church/guest-register?serviceId=` verweist. Diese Seite in B1App (`src/app/[sdSlug]/(public)/guest-register/page.tsx`) ermöglicht es einer Besucherfamilie, sich mit dem eigenen Telefon über den anonymen Endpunkt `POST /membership/people/guest-register` zu registrieren. So bleibt die Schlange am Kiosk in Bewegung. Das QR-Blatt hat außerdem eine Schaltfläche **Hier registrieren**, die dieselbe Seite am Kiosk (`app/guestRegister.tsx`) in einer `WebView` im Inkognito-Modus ohne Cache öffnet. `src/helpers/GuestRegisterHelper.ts` erstellt die URL für QR-Code und WebView und blockiert Navigation außerhalb von `https://{subdomain}.b1.church/guest-register`. Der Bildschirm kehrt über **Fertig**, die Zurück-Taste oder nach 120 Sekunden Inaktivität zur Suche zurück (Tippen im Formular wird von der WebView als Aktivität gemeldet). Dabei wird die WebView ausgehängt, damit die Eingaben einer Familie nie an die nächste gelangen.

Die Registrierung per QR-Code wird über die Kircheneinstellungen gesteuert, die in der Karte **QR-Gästeregistrierung** in B1Admin gespeichert werden (`src/mobile/CheckInPage.tsx`):

| Einstellung | Sichtbarkeit | Zweck |
|---|---|---|
| `enableQRGuestRegistration` | öffentlich | Ein-/Aus-Schalter für den QR-Code am Kiosk und die anonymen Endpunkte |
| `guestRegistrationFields` | öffentlich | JSON-Zuordnung von `email`, `phone`, `address`, `birthDate`, `gender`, `maritalStatus`, `grade`, `comments` → `"off"` / `"optional"` / `"required"`. Standard: E-Mail und Telefon optional, der Rest aus. Vor- und Nachname sind immer Pflicht |
| `guestRegistrationImage` | öffentlich | URL des Kopfbilds; B1App zeigt es im Format 16:9 anstelle des Symbols auf dem Formular und der Bestätigungsseite |
| `guestRegistrationGroupId` | privat | Gruppe, zu der jede Anmeldung hinzugefügt wird (Gäste sehen oder wählen sie nie) |
| `guestRegistrationRecordAttendance` | privat | `"true"`, um für diese Gruppe zusätzlich die Anwesenheit zu erfassen |

`src/components/checkin/GuestRegister.tsx` in B1App ruft die Checkliste über den anonymen Endpunkt `GET /membership/people/guest-register/options?churchId=` ab und zeigt nur die aktivierten Felder an (E-Mail, Telefon, Familienstand und Adresse bei der Hauptkontaktperson; Geburtsdatum, Geschlecht und Klasse je Mitglied; ein Kommentarfeld). Nur diese Felder werden übermittelt. Der Server wendet die Checkliste erneut an, in `GuestRegistrationHelper.sanitize()` — deaktivierte Felder werden verworfen, fehlende Pflichtfelder oder Werte außerhalb der Auswahl führen zu 400 —, bevor `PersonHelper.registerGuestHousehold()` läuft. Zuerst ruft diese Funktion für jedes Mitglied mit E-Mail oder Telefon `PersonRepo.findGuestMatch()` auf. Genau eine lebende Person mit demselben Vornamen und derselben E-Mail bzw. denselben Telefonziffern wird wiederverwendet. Keine oder mehrere Treffer führen zur Anlage einer neuen Person, sodass nie geraten wird. Ein Mitglied ohne Kontaktdaten wird über den Vornamen innerhalb des gefundenen Haushalts zugeordnet. Wiederverwendete Personen werden nie verändert, damit ein anonymes Formular keine gespeicherten Daten überschreiben kann. Die Antwort wiederholt die übermittelten Namen. Nicht zugeordnete Mitglieder werden dem gefundenen Haushalt oder einem neuen Haushalt zugeordnet, mit `membershipStatus: "Visitor"`, und für jede neue Person wird `person.created` ausgelöst. Danach werden Fehler protokolliert statt zurückgegeben: Mitglieder werden der konfigurierten Gruppe hinzugefügt (`group.member.added`). Ist die Anwesenheitserfassung aktiv, markiert `AttendanceModuleGateway.recordAttendance()` jedes Mitglied für jede Gottesdienstzeit der Gruppe, die einen Zeitplan hat und deren Check-in-Fenster (`CheckinGateHelper.isServiceTimeOpen`) gerade offen ist. Die Sitzung für das heutige Datum der Kirchenzeitzone wird bei Bedarf angelegt. Ungeplante Gottesdienstzeiten und Anmeldungen außerhalb des Fensters erfassen nichts. Kommentare werden zu einer verborgenen Personennotiz an der Hauptkontaktperson des Haushalts (Verfasser „Gast-Anmeldung“), verknüpft über `person.conversationId`.

## Verwandte Seiten {#related-pages}

- [Anwesenheits-Endpunkte](../api/endpoints/attendance.md) -- Vollständige REST-Schnittstelle für Standorte, Gottesdienste, Sitzungen, Besuche und Besuchssitzungen
- [Mitgliedschafts-Endpunkte](../api/endpoints/membership.md) -- Personen, Haushalte und Gruppen
- [Webhooks](../api/webhooks.md) -- Die Ereignisse `session.created`, `attendance.recorded` und `attendance.checkout`
- [Modulstruktur](../api/module-structure.md) -- Wie das Anwesenheitsmodul serverseitig organisiert ist
