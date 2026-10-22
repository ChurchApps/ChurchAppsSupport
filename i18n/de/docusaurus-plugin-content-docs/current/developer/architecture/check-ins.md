---
title: "Check-ins"
---

# Check-ins

<div class="article-intro">

Der Check-in ist ein System mit drei Zugängen: die Kiosk-App B1Checkin für besetzte und selbstbediente Stationen, der Selbst-Check-in im Mitgliederportal B1App und die Verwaltung der Anwesenheit in B1Admin. Alle drei schreiben in dasselbe Anwesenheitsmodul der zentralen API, und die Zuordnung der Klassenräume erfolgt ausschließlich über Gruppen – es gibt keine eigene Entität für „Standorte“ oder „Räume“. Darüber liegt eine Schutzschicht für Kinder: Check-in-Typen pro Besuch, serverseitige Kapazitäts- und Betreuungsschlüssel-Prüfungen, Altersprüfungen am Kiosk, die Verifizierung vertrauenswürdiger Abholpersonen beim Check-out sowie das Anpiepsen von Eltern über den SMS-Anbieter der Kirche. Diese Seite beschreibt das Datenmodell, die Check-in-Abläufe, die Schutzschicht und die Pipeline für den Etikettendruck.

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

| Zugang | Repository | Technik | Aufgabe |
|---------|------|------|------|
| Kiosk | `B1Checkin` | Expo / React Native, Dateirouting über expo-router; EAS-Builds für Android, Amazon Fire und iOS; OTA-Updates über `expo-updates` | Besetzte oder selbstbediente Station mit Etikettendruck und geprüftem Check-out |
| Selbst-Check-in | `B1App` | Next.js (Mitgliederportal b1.church) | Angemeldete Mitglieder checken ihren Haushalt per Telefon ein; kein Druck |
| Verwaltung | `B1Admin` | React-SPA | Konfiguriert die Gottesdienststruktur, ordnet Gruppen Gottesdienstzeiten zu, gestaltet Etiketten, erfasst die Anwesenheit manuell und erstellt Berichte |

Alle drei rufen über `ApiHelper` dieselben beiden API-Module auf: **MembershipApi** (`/membership`) für Personen, Haushalte und Gruppen sowie **AttendanceApi** (`/attendance`) für alles Übrige.

## Datenmodell (`Api/src/modules/attendance`)

| Entität / Tabelle | Wichtige Felder | Bedeutung |
|----------------|-----------|---------|
| `campuses` | name, address | Veraltet – Standorte werden im Membership-Modul gepflegt (`/membership/campuses`); die Kopie im Anwesenheitsmodul ist für alte Leser schreibgeschützt eingefroren (`models/Campus.ts`) |
| `services` | campusId, name | Eine regelmäßige Zusammenkunft, z. B. „Sonntagmorgen“ (`models/Service.ts`) |
| `serviceTimes` | serviceId, name, dayOfWeek, startTime, endTime, checkinOpenMinutes, checkinCloseMinutes | Ein Zeitfenster innerhalb eines Gottesdienstes, z. B. „9:00 Uhr“ (`models/ServiceTime.ts`). Die Zeitplanspalten sind optional (Migration `tools/migrations/attendance/2026-10-10_service_time_schedule.ts`) und steuern das [Check-in-Fenster](#scheduled-check-in-windows) |
| `groupServiceTimes` | groupId, serviceTimeId | Verbindungstabelle: welche Gruppen (Klassenräume) zu welchen Gottesdienstzeiten zusammenkommen (`models/GroupServiceTime.ts`) |
| `sessions` | groupId, serviceTimeId, sessionDate | Ein Treffen einer Gruppe an einem Datum – wird beim Check-in bei Bedarf angelegt (`models/Session.ts`) |
| `visits` | personId, serviceId, visitDate, checkinTime, securityCode, checkinType, checkedInById, checkoutTime, checkedOutBy, checkedOutById | Eine Person nimmt an einem Datum teil (`models/Visit.ts`). `checkinType` ist `member` / `guest` / `volunteer` (NULL = älteres Mitglied); es wird vom Kiosk gesetzt und von den Kapazitäts- und Schlüsselprüfungen ausgewertet |
| `visitSessions` | visitId, sessionId | Welche Sitzung(en) ein Besuch umfasst – ein Kind, das zu zwei Gottesdienstzeiten eingecheckt wurde, erhält zwei Zeilen (`models/VisitSession.ts`) |
| `labelTemplates` | name, labelType (`nametag`/`pickup`), width, height, isDefault, content (JSON-Blöcke) | Frei gestaltbare Etikettenlayouts (`models/LabelTemplate.ts`) |

### So wird ein abgeschlossener Check-in gespeichert

`VisitController.postCheckin` (`Api/src/modules/attendance/controllers/VisitController.ts`) verarbeitet `POST /attendance/visits/checkin?serviceId=&peopleIds=`. Der Körper ist ein Array von `Visit`-Objekten, jedes mit `visitSessions`, deren eingebettete `session` nur ein Paar `(serviceTimeId, groupId)` nennt. Der Server geht dann so vor:

1. **Prüft Kapazität und Schlüssel, bevor etwas geschrieben wird.** `evaluateGates()` → `CheckinGateHelper.evaluate()` prüft für jeden angesteuerten Raum Kapazität, Gästekapazität, Schließstatus und Betreuungsschlüssel anhand der aktuellen Belegung. `postCheckin` ist **nicht transaktional**, daher muss die Prüfung vor dem ersten Speichern laufen: Ein schwerer Verstoß liefert 409 mit dem betroffenen Raum bzw. den betroffenen Räumen, und nichts wird gespeichert. Siehe [Kapazitäts- und Betreuungsschlüssel-Prüfungen](#capacity-and-volunteer-ratio-gates).
2. **Löst Sitzungen bei Bedarf auf.** `getSessionId()` findet oder erstellt die Zeile `sessions` für `(groupId, serviceTimeId, heute)`; Sitzungs-IDs werden pro Datum im Prozess zwischengespeichert. Neue Sitzungen lösen einen Webhook `session.created` aus. Die Schleife ist ein erwartetes `for..of` – ein früheres `forEach(async …)` mit „Feuer und Vergessen“ lief parallel zum Speichern und schrieb bei der ersten Sitzung NULL-Sitzungs-IDs (behoben; im Code am Anfang der Schleife vermerkt).
3. **Ersetzt die Datensätze des Tages.** Vorhandene Besuche dieser Personen bei diesem Gottesdienst am heutigen Tag werden samt ihren Besuchssitzungen gelöscht, dann wird die übermittelte Menge gespeichert. Ein erneuter Check-in einer Familie ist daher eine idempotente Operation „dies ist der aktuelle Stand“ und kein Anhängen. Mit `?checkDuplicates=true` gibt die Anfrage stattdessen `{ duplicates: [personId…] }` zurück, ohne etwas zu schreiben – so warnt der Kiosk, bevor er überschreibt.
4. **Erzeugt pro Stapel einen Sicherheitscode.** `SecurityCodeHelper.generate()` erzeugt einen 4-stelligen Code aus dem Zeichenvorrat `23456789BCDFGHJKLMNPQRSTVWXYZ` (keine Vokale und keine mehrdeutigen Zeichen, damit keine Wörter entstehen und nichts falsch gelesen wird). Der Server wiederholt die Erzeugung bei einer Kollision mit offenen Besuchen derselben Kirche am selben Tag und vergibt den Code an jeden Besuch des Stapels.
5. **Liefert `{ streaks, securityCode }` zurück.** `streaks` ordnet jeder personId die Anzahl aufeinanderfolgender Wochen mit Anwesenheit zu; der Kiosk feiert Meilensteine (jede fünfte Woche) mit Konfetti.

Jeder gespeicherte Besuch löst außerdem einen Webhook `attendance.recorded` aus. Die Leseseite, `GET /attendance/visits/checkin`, liefert die Besuche der Personen ab ihrem **zuletzt erfassten Datum**. Lag dieses in einer früheren Woche, werden die IDs entfernt, sodass der Client eine vorausgefüllte Kopie der Raumauswahl der Vorwoche erhält, die als neue Datensätze gespeichert wird.

### Check-out

Zwei Endpunkte schließen den Kreislauf (`VisitController`):

- `GET /attendance/visits/code/:code` – die heutigen, noch nicht ausgecheckten Besuche mit diesem Sicherheitscode, mit geladenen Sitzungen.
- `POST /attendance/visits/checkout` – Körper `{ visitIds, checkedOutBy?, checkedOutById? }`; setzt `checkoutTime` und vermerkt, wer abgeholt hat, und löst pro Besuch einen Webhook `attendance.checkout` aus.

Berechtigungen: Kioske authentifizieren sich mit `attendance.checkin`, das genau die Oberfläche für Check-in, Check-out und Etikettenvorlagen freischaltet. `attendance.view` und `attendance.edit` decken Berichte und manuelle Erfassung ab; die Struktur (Gottesdienste, Gottesdienstzeiten, Gruppenzuordnungen) erfordert `services.edit`. Der Selbst-Check-in der Mitglieder (B1App) benötigt überhaupt keine Berechtigung: Jeder angemeldete Benutzer mit einer verknüpften Person in der Kirche darf `GET`/`POST /attendance/visits/checkin` aufrufen, und der Server beschränkt die übermittelten `personId`s auf den eigenen Haushalt des Aufrufers (sonst 403). Diese Schranke verhindert, dass die `securityCode`s anderer Familien lesbar werden. Die Mitgliedschaft ist die Berechtigung; ob Mitglieder die Funktion *sehen*, steuern die Navigationsreiter der B1App der Kirche. Die übrigen Check-in-Endpunkte (`code/:code`, `checkout`, `guardians`, `CheckinController`) bleiben Kiosk- und Mitarbeiterendpunkten vorbehalten.

## Gruppen steuern die Raumzuordnung

Im System gibt es nirgends eine Entität für Räume oder Klassenräume. Ein „Raum“ ist eine Mitgliedschafts-**Gruppe** mit aktiviertem `trackAttendance`, die über `groupServiceTimes` mit einer oder mehreren Gottesdienstzeiten verbunden ist. Die Gruppenfelder (in `Api/src/modules/membership/models/Group.ts`), die das Verhalten am Kiosk bestimmen:

| Feld | Wirkung |
|------|--------|
| `trackAttendance` | Die Gruppe nimmt überhaupt an der Anwesenheitserfassung teil; der Setup-Baum in B1Admin markiert `trackAttendance`-Gruppen ohne Zeile in `groupServiceTimes` als nicht zugeordnet |
| `parentPickup` | Markiert einen Kinderraum: Der Check-in dort macht den Besuch zu einem „Kind“-Besuch, der einen Abholzettel für die Familie druckt und den Sicherheitscode auf das Namensschild setzt |
| `printNametag` | Ob Check-ins in diese Gruppe überhaupt ein Namensschild drucken |
| `capacity` / `guestCapacity` / `checkinClosed` | Kapazitätsgrenzen des Raums und ein hartes Schalter „geschlossen“; serverseitig durch die Check-in-Prüfung erzwungen (bearbeitet in den Gruppeneinstellungen von B1Admin unter „Check-in-Kapazität“) |
| `volunteerRatio` / `minVolunteers` | Verhältnis Kinder zu Ehrenamtlichen und Mindestzahl der Ehrenamtlichen; gemäß der kirchenweiten Einstellung `ratioEnforcement` durchgesetzt |
| `minAgeMonths` / `maxAgeMonths` / `minGrade` / `maxGrade` | Grenzen für Alter und Klassenstufe, am Kiosk ausgewertet, um Räume hervorzuheben oder abzublenden |

Jeder Client verarbeitet dieselbe Struktur (z. B. `B1Checkin/app/services.tsx`, `B1App/src/app/[sdSlug]/mobile/components/screens/CheckinPage.tsx`): Er lädt parallel `GET /attendance/servicetimes?serviceId=`, `GET /attendance/groupservicetimes` und `GET /membership/groups` und sammelt dann für jede Gottesdienstzeit die Gruppen, deren Zeile in `groupServiceTimes` darauf verweist, in `serviceTime.groups`. Dieses Array ist die Raumauswahl, gegliedert nach der `categoryName` der Gruppe.

Die Zuordnungen werden auf der Gruppenseite in B1Admin bearbeitet (`B1Admin/src/groups/components/ServiceTimesEdit.tsx` – `POST`/`DELETE /attendance/groupservicetimes`), und der gesamte Baum Standort → Gottesdienst → Gottesdienstzeit → Gruppe wird in `B1Admin/src/attendance/components/AttendanceSetup.tsx` über `GET /attendance/attendancerecords/tree` dargestellt.

:::info
Da Gruppen die einzige Quelle der Wahrheit sind, speist dieselbe Gruppenmitgliedschaft die Raumzuordnung am Kiosk, die Anwesenheitsliste nach Gruppen auf den Gruppenseiten in B1Admin und die Anwesenheitsberichte. Die Zuordnung einer Gruppe zu einer Gottesdienstzeit ist daher der einzige Schritt, um sie zu einem Check-in-Ziel zu machen.
:::

## Kindersicherheit

### Check-in-Typen

Jeder Besuch trägt einen `checkinType` – `member`, `guest` oder `volunteer` (NULL bedeutet älteres Mitglied; Migration `tools/migrations/attendance/2026-07-03_checkin_type.ts`). Der Typ wird **am Kiosk** gewählt: über die Chips Mitglied / Gast / Ehrenamtlich in der aufgeklappten Zeile einer Person (`B1Checkin/src/components/MemberServiceTimes.tsx`) und beim Abschluss jedem offenen Besuch zugewiesen (`app/checkinComplete.tsx`, Standard `member`). Der Server wertet ihn in der Prüfung aus: Ehrenamtliche zählen zur Betreuungsabdeckung statt gegen die Kapazität, und Gäste zählen gegen `guestCapacity`.

### Kapazitäts- und Betreuungsschlüssel-Prüfungen {#capacity-and-volunteer-ratio-gates}

`CheckinGateHelper.evaluate()` (`Api/src/modules/attendance/helpers/CheckinGateHelper.ts`) läuft in `postCheckin` vor jedem Speichern (der Endpunkt ist nicht transaktional, daher ist die Prüfung vor dem Speichern der Mechanismus für Korrektheit). Sie lädt die aktuelle Belegung jeder angesteuerten Gruppe (`VisitRepo.countActiveByGroupToday`) und die Gruppenkonfiguration über das Gateway des Membership-Moduls und ordnet dann die Verstöße ein:

- **Hart (immer blockierend):** `checkinClosed`, `aktuell + hinzukommend > capacity`, Zahl der Gäste über `guestCapacity`. Der Stapel wird mit `409 { error: "capacity", groups: [{ groupId, groupName, reason }] }` abgelehnt – der Kiosk zeigt den betroffenen Raum.
- **Schlüssel (warnen oder blockieren):** Hinzukommende Nicht-Ehrenamtliche in einem Raum, in dem `volunteers < minVolunteers` gilt, keine Ehrenamtlichen vorhanden sind oder `children > volunteers × volunteerRatio`. Der Schweregrad folgt der kirchenweiten Einstellung `ratioEnforcement` (`"warn"` als Standard / `"block"`, bearbeitet in B1Admin unter Kirche verwalten → Check-in, `CheckinSettingsEdit.tsx`). Im Warnmodus liefert der Server `409 { warning: true, error: "ratio", … }`, sofern der Client nicht mit `acknowledgeWarnings=true` erneut sendet – dieses erneute Senden ist die Bestätigung durch Mitarbeitende am Kiosk.

### Geplante Check-in-Fenster {#scheduled-check-in-windows}

Eine Gottesdienstzeit kann einen optionalen Wochenplan haben (`dayOfWeek` 0–6, wobei 0 Sonntag ist, `startTime`/`endTime` als `HH:mm`, `checkinOpenMinutes`, `checkinCloseMinutes`). Er wird im Formular „Check-in-Zeitplan“ der Gottesdienstzeit unter **Anwesenheit → Setup** in B1Admin bearbeitet (`B1Admin/src/attendance/components/ServiceTimeEdit.tsx`). `CheckinGateHelper.hasSchedule()` behandelt eine Gottesdienstzeit nur dann als geplant, wenn `dayOfWeek` und `startTime` gesetzt sind; ungeplante Zeiten werden nie zeitlich begrenzt. `isServiceTimeOpen()` berechnet das Fenster in der Ortszeit (`DateHelper.toChurchTime`). Die Zeitzone bestimmt `CheckinTimeZoneHelper.load()` (`Api/src/modules/attendance/helpers/CheckinTimeZoneHelper.ts`) für jede Gottesdienstzeit: Zuerst zählt die `timezone` des Standorts des Gottesdienstes (`service.campusId` über `MembershipModuleGateway.loadCampusTimeZones`), danach die `timeZone` der Kirche (festgelegt in B1Admin unter Kircheninformationen), dann der erste nicht entfernte Standort mit einer `timezone` (`loadCampusTimeZone`) und erst zuletzt `America/New_York`. Der Standort kommt zuerst, weil viele Kirchen `America/New_York` nachträglich als Kirchenzeitzone eingetragen bekamen. Sowohl die Auflistung als auch die Übermittlung (unten) lösen die Zeitzone auf dieselbe Weise auf. Das Fenster reicht von `checkinOpenMinutes` vor dem Beginn bis `checkinCloseMinutes` nach dem Ende (bzw. nach dem Beginn, wenn es kein Ende gibt) und berücksichtigt Fenster, die Mitternacht oder die Wochengrenze überschreiten.

Das Fenster wird an zwei Stellen durchgesetzt:

- **Auflistung:** `GET /attendance/servicetimes` versieht jede Zeile mit dem berechneten booleschen Wert `checkinOpen`. Der Selbst-Check-in der B1App (`CheckinPage.tsx`) und die Gottesdienstauswahl der B1Checkin (`app/services.tsx`) zeigen alle Zeiten. Sind alle Zeiten eines Gottesdienstes geschlossen, zeigen sie den nächsten Öffnungszeitpunkt („Check-in öffnet So 9:30 Uhr.“ in der B1App, „Der Check-in für diesen Gottesdienst öffnet So 9:30 Uhr.“ in der B1Checkin, aus `CheckinHelper.opensLabel` / `ServiceTimeHelper.getOpensLabel`). Lässt sich kein Öffnungszeitpunkt berechnen, lautet der Text „Der Check-in für diesen Gottesdienst ist gerade nicht geöffnet.“ (der Kiosk bietet eine Schaltfläche Zurück, um einen anderen Gottesdienst zu wählen). Andernfalls erscheinen geschlossene Zeiten als nicht auswählbare Zeile „Geschlossen“ / „Geschlossen · öffnet 9:30 Uhr“. Die Haushaltsansicht der B1Checkin (`MemberServiceTimes.tsx`) prüft die Öffnung live über die Uhr des Geräts mit `ServiceTimeHelper.isCheckinOpen()` (Zeitzone des Geräts, nicht der Kirche), damit ein dauerhaft laufender Kiosk pünktlich öffnet und schließt. Eine geschlossene Zeit, die die Person bereits belegt, zeigt „Kinderraum 1 · Eingecheckt“ (Gruppenname).
- **Übermittlung:** In `evaluateGates()` lehnt `findClosedServiceTimeGroups()` den Stapel vor der Prüfung von Kapazität und Schlüssel mit `409 { error: "notOpen", groups: [{ groupId, groupName, reason: "notOpen" }] }` ab, sobald die Gottesdienstzeit einer angesteuerten Sitzung außerhalb ihres Fensters liegt. Da die bestehenden Besuche eines Haushalts für heute mit jedem Check-in erneut gesendet werden, überspringen Sitzungen, die die Person bereits hält (`personId|sessionId` in den bestehenden Besuchen), diese Prüfung. So wird das Hinzufügen einer späteren, geöffneten Gottesdienstzeit nicht abgelehnt, nur weil ein früheres Fenster geschlossen ist. Die B1Checkin zeigt dies über ihren Bildschirm für harte Sperren mit dem Grund „Check-in ist gerade nicht geöffnet“ (Kapazitätsverstöße lauten weiterhin „Raum ist voll oder geschlossen“).

### Alters- und Klassenprüfung (am Kiosk) {#agegrade-eligibility-kiosk-side}

Die Eignung eines Raums ist eine beratende Anzeige, die am Kiosk ausgewertet wird und vom Server nicht erzwungen wird. `B1Checkin/src/helpers/EligibilityHelper.ts` vergleicht Geburtsdatum und Klassenstufe einer Person mit `minAgeMonths`/`maxAgeMonths`/`minGrade`/`maxGrade` der Gruppe (Reihenfolge der Klassenstufen: PreK, K, 1–12, Graduated) und liefert `eligible` / `ineligible` / `unknown`. Fehlen Angaben, ergibt sich `unknown`, und der Raum wird nie ausgeblendet. Alter und Klassenstufe werden zum Stichtag der **Aufstiegsstichtag** der Kirche berechnet (Einstellung `gradePromotionDate`, Format `"MM-DD"`, bearbeitet in `B1Admin/src/settings/components/GradePromotionSettingsEdit.tsx`). Der Kiosk ruft ihn über `GET /attendance/checkin/settings` ab, und `resolveAsOfDate` wählt das jüngste Vorkommen am heutigen Tag oder davor. Die Raumauswahl hebt geeignete Räume hervor und blendet ungeeignete ab; die Auswahl eines abgeblendeten Raums erfordert eine Bestätigung durch Mitarbeitende.

### Vertrauenswürdige und nicht berechtigte Abholung {#trusted-and-not-authorized-pickup}

Abholpersonen sind eine Entität des Membership-Moduls, jeweils pro Haushalt: `householdPickupPeople` (`Api/src/modules/membership/models/HouseholdPickupPerson.ts` – householdId, optional personId, Name, photoUrl, relationship, `status` `trusted` / `notAuthorized`, Notizen). Die Verwaltung erfolgt über `GET /membership/householdpickup/:householdId` (jeder angemeldete Benutzer der Kirche, damit Kioske sie lesen können) sowie `POST` / `DELETE`, die `people.edit` erfordern. Mitarbeitende pflegen die Liste auf der Karte **Abholung** der Personenseite (`B1Admin/src/people/components/PickupPeople.tsx`) – mit Foto, Verwandtschaftsverhältnis und einem Statuschip „Vertrauenswürdig“ / „Nicht berechtigt“.

Beim Check-out (`B1Checkin/app/checkout.tsx`) lädt der Kiosk die Abholliste des Haushalts: Einträge mit `trusted` erscheinen als antippbare Abholkarten neben dem Fotoraster der erwachsenen Haushaltsmitglieder. Ein frei eingetragener Name unter „Andere“ wird unscharf (Levenshtein, `src/helpers/PickupMatchHelper.ts`) mit den Einträgen `notAuthorized` verglichen. Eine Übereinstimmung blockiert den Check-out mit einem Warnblatt und einer Schaltfläche **Überschreiben** für Mitarbeitende. Die Überschreibung wird am Besuch selbst protokolliert: Sie sendet `checkedOutBy` als `"OVERRIDE: {name}"` über den üblichen `POST /attendance/visits/checkout`, sodass sie im Anwesenheitsdatensatz und im Webhook `attendance.checkout` landet und nicht in einer eigenen Prüftabelle.

### Eltern anpiepsen und Notfallmeldung

`CheckinController` (`Api/src/modules/attendance/controllers/CheckinController.ts`, `/attendance/checkin`) stellt zwei SMS-Endpunkte bereit:

- `POST /page` – `{ visitId, message }`: piepst die Erziehungsberechtigten eines eingecheckten Kindes an (Check-out-Bildschirm des Kiosks, besetzter Modus).
- `POST /broadcast` – `{ serviceId, message }`: sendet eine SMS an alle erwachsenen Mitglieder jedes eingecheckten Haushalts eines Gottesdienstes (Admin-Einstellungen des Kiosks, hinter einem Blatt, das die Eingabe `EMERGENCY` zur Bestätigung verlangt; `B1Checkin/app/adminSettings.tsx`).

Beide Endpunkte ermitteln die erwachsenen Haushaltsmitglieder über das Membership-Gateway und übergeben die Zustellung dann an **`MessagingModuleGateway.sendBulkText`** (`Api/src/shared/modules/MessagingModuleGateway.ts`) – die modulübergreifende Schnittstelle zum konfigurierten SMS-Anbieter der Kirche (`@churchapps/texting`: TextInChurch, Clearstream oder MutualMinistry; einen eingebauten SMS-Versand gibt es nicht). Das Gateway protokolliert einen Eintrag `sentText` sowie einen Eintrag `deliveryLog` je Empfänger und begrenzt einen Stapel auf 500 Empfänger. Ist kein Anbieter konfiguriert, liefert es `no_provider`, was der Kiosk als „Kein SMS-Anbieter konfiguriert“ anzeigt. Die Methode `dispatch()` des Controllers entfernt doppelte Telefonnummern und überspringt Personen ohne Mobilnummer oder mit gesetztem `optedOut`. Sie liefert `{ sent, failed, skippedOptedOut, skippedNoPhone }`, damit der Kiosk anzeigen kann, was übersprungen wurde.

## Der Kiosk (B1Checkin)

Die Bildschirme sind Dateien des expo-router unter `B1Checkin/app/`. Der Zustand über Bildschirme hinweg liegt in einer statischen Klasse `CachedData` (`src/helpers/CachedData.ts`), nicht im React-Zustand.

```
index (boot/auto-login) → selectChurch → services ──▶ lookup ──▶ household ──▶ checkinComplete
                                          │             │  ▲         │ │            │
             loads serviceTimes, groups,  │             │  └─────────┘ └▶ addGuest  └▶ print labels,
             groupServiceTimes,           │             └▶ checkout (manned)           auto-return
             labelTemplates               │                                            to lookup
```

1. **Suche** (`app/lookup.tsx`) – Suche nach Telefonnummer (`GET /membership/people/search/phone?number=`, letzte vier oder vollständig) oder nach Name (`GET /membership/people/search?term=`). Wählt man einen Treffer, lädt die App den Haushalt (`GET /membership/people/household/{householdId}`) und die bestehenden Besuche (`GET /attendance/visits/checkin`) und füllt `pendingVisits` mit der Auswahl der Vorwoche vor.
2. **Haushaltsprüfung** (`app/household.tsx`, `src/components/MemberList.tsx`) – Jede Mitgliederzeile zeigt ein Abzeichen für bereits eingecheckte Personen, ein Abzeichen für Allergien bzw. `nametagNotes` und die aktuellen Raum-Chips. Beim Aufklappen eines Mitglieds erscheinen alle Gottesdienstzeiten mit einer Raumschaltfläche sowie die Chips Mitglied / Gast / Ehrenamtlich (`MemberServiceTimes.tsx`). Unter dem Namen jeder Gottesdienstzeit zeigt `ServiceTimeHelper.getGroupSummary()` die dort angebotenen Gruppen (die Namen aus `serviceTime.groups`, gekürzt, ohne Dubletten unabhängig von der Groß-/Kleinschreibung und durch Kommas getrennt); ist keine Gruppe vorhanden, erscheint nichts.
3. **Gruppenzuordnung** (`app/selectGroup.tsx`) – ein Kategoriebaum aus `serviceTime.groups`; für Alter und Klassenstufe geeignete Räume sind hervorgehoben, ungeeignete abgeblendet und erfordern eine Bestätigung durch Mitarbeitende (siehe [Alters- und Klassenprüfung](#agegrade-eligibility-kiosk-side)). Die Auswahl eines Raums schreibt eine Besuchssitzung `{ session: { serviceTimeId, groupId } }` in den offenen Besuch dieser Person (`src/helpers/VisitSessionHelper.ts`). „Keine“ löscht die Zuordnung.
4. **Abschluss** (`app/checkinComplete.tsx`) – `POST /attendance/visits/checkin` mit `pendingVisits` (jeweils mit seinem `checkinType` versehen); danach druckt die App die Etiketten, wenn ein Drucker konfiguriert ist, und kehrt automatisch zur Suche zurück. Eine Antwort `409` für Kapazität oder `notOpen` zeigt den betroffenen Raum mit dem Grund (voll oder geschlossen bzw. Check-in nicht geöffnet); eine Schlüsselwarnung bietet eine Bestätigung durch Mitarbeitende, die mit `acknowledgeWarnings=true` erneut sendet.

Der Bildschirm **Check-out** (`app/checkout.tsx`) nimmt den 4-stelligen Sicherheitscode über ein automatisch fokussiertes Eingabefeld an – damit funktionieren USB- oder Bluetooth-Scanner ohne Kamera – oder über ein Tastenfeld auf dem Bildschirm mit demselben Zeichenvorrat, das bei 4 Zeichen automatisch absendet. Die Schaltfläche **Scannen** öffnet ein Blatt mit der gemeinsamen Kamera `src/components/CodeScanner.tsx` (standardmäßig die rückseitige Kamera, akzeptiert QR-, Code-128- und Code-39-Codes), damit auch Stationen ohne Scanner das Abholetikett lesen können. Ein gescannter Code läuft über denselben Weg `handleCode()` wie eine Eingabe. Der Bildschirm sucht den Code, zeigt die abzuholenden Kinder und stellt die **vertrauenswürdigen Abholpersonen** des Haushalts als antippbare Karten dar, daneben ein Fotoraster der erwachsenen Haushaltsmitglieder (zusätzlich die Option „Andere“ mit Freitext, der unscharf gegen die Namen der nicht berechtigten Personen geprüft wird – siehe [Vertrauenswürdige und nicht berechtigte Abholung](#trusted-and-not-authorized-pickup)). Anschließend sendet er `POST /attendance/visits/checkout` mit Name und ID der Auswahl. Im besetzten Modus bietet der Bildschirm außerdem **Eltern anpiepsen** (`POST /attendance/checkin/page`) und einen **Nachdruck des Sicherheitsetiketts** – `reprint()` erzeugt die Etiketten der Familie mit `LabelHelper.getAllLabelsFor(...)` neu und gibt sie über dieselbe Druckpipeline `PrintUI` aus wie beim Check-in.

Der Charakter der Station wird über das AsyncStorage-Flag `@StationMode` festgelegt (`"self"` oder `"manned"`, umschaltbar in `app/adminSettings.tsx`). Der besetzte Modus fügt auf dem Suchbildschirm den Einstieg zum Check-out hinzu und erlaubt auf dem Haushaltsbildschirm das Bearbeiten der Personenprofile (`POST /membership/people`). Die Härtung des Kiosks ist eingebaut: Eine optionale PIN (`app/setPin.tsx`, `src/components/PinEntryModal.tsx`) schützt die Admin- und Druckerbildschirme; der Admin-Bildschirm öffnet sich nur mit siebenmaligem schnellem Tippen auf das Logo in der Kopfzeile; ein Ruhebildschirm (`src/hooks/useInactivityTimer.ts`) übernimmt zwischen den Familien.

## Selbst-Check-in (B1App)

Mitglieder checken im Portal b1.church auf dem Bildschirm `/mobile/checkin` ein (über `B1App/src/app/[sdSlug]/mobile/components/ScreenRouter.tsx` zu `screens/CheckinPage.tsx` geleitet). Er setzt eine Anmeldung voraus und durchläuft dieselben vier Schritte wie der Kiosk – Gottesdienste → Haushalt → Gruppen → Abschluss – über dieselben Endpunkte; der Zustand liegt in `B1App/src/helpers/CheckinHelper.ts`. Die Unterschiede zum Kiosk: Der Haushalt stammt aus der `householdId` des angemeldeten Benutzers (kein Suchschritt), und es gibt keinen Etikettendruck. Stattdessen zeigt der Abschlussbildschirm den Sicherheitscode des Stapels als QR-Code (`qrcode.react`) mit dem Hinweis „Zeigen Sie dies an einer Check-in-Station“. Ist der Haushalt beim Öffnen der Seite bereits eingecheckt, zeigt die Schaltfläche „Check-in-Code anzeigen“ den QR-Code aus dem ersten bestehenden Besuch (aus `GET /attendance/visits/checkin`), der einen `securityCode` trägt, erneut an. Der Check-in wird beim Absenden sofort gespeichert (es gibt keinen ausstehenden Zustand); der QR-Code steuert nur den Etikettendruck am Kiosk.

**Etikettendruck vom Telefon am Kiosk** (`B1Checkin/app/scan.tsx`, erreicht über die Schaltfläche „Code scannen“ des QR-Codes auf dem Suchbildschirm): Der Kiosk zeigt `CodeScanner` (ein `CameraView` von `expo-camera`, standardmäßig die Frontkamera, umschaltbar), der nach QR-Codes sucht. `ScanCodeHelper.parse()` akzeptiert eine Nutzlast nur, wenn sie ein reiner 4-stelliger Code aus dem Zeichenvorrat des Sicherheitscodes ist, und `ScanCodeHelper.isRepeat()` ignoriert denselben Code für 4 Sekunden. So funktionieren sowohl der QR-Code der B1App als auch der QR-Block eines gedruckten Etiketts. Der Bildschirm folgt danach dem Pfad für den Nachdruck beim Check-out – `GET /attendance/visits/code/{code}` → `GET /membership/people/ids` → `LabelHelper.getAllLabelsFor(visits, people, code)` → `PrintUI` – und kehrt zur Suche zurück. Beim Scannen erfolgt kein Schreibvorgang für die Anwesenheit; es werden nur Etiketten gedruckt. Codes ohne aktive Besuche, Stationen ohne Drucker und Gruppen ohne Etiketten zeigen jeweils einen kurzen Hinweis und führen zurück zur Suche.

Typen sowie `ApiHelper`/`ArrayHelper` stammen aus `@churchapps/helpers` und `@churchapps/apphelper`; mit B1Admin werden keine React-Komponenten geteilt.

## Anwesenheit in der Verwaltung (B1Admin)

- **Setup** – `/attendance` (`B1Admin/src/attendance/AttendancePage.tsx`) zeigt den Strukturbaum und legt Gottesdienste (`ServiceEdit.tsx`) und Gottesdienstzeiten (`ServiceTimeEdit.tsx`) an. Die Standortdaten stammen aus dem Membership-Modul über den Hook `useCampuses()`.
- **Manuelle Anwesenheit** findet sich im Bereich Gruppen, nicht im Bereich Anwesenheit: `B1Admin/src/groups/components/GroupSessionsTab.tsx` legt Sitzungen an (`POST /attendance/sessions`; beim Hinzufügen kann `SessionEdit.tsx` für jede andere Gruppe, die dieselbe Gottesdienstzeit teilt, eine Sitzung einschließen und Gruppen überspringen, die an diesem Datum bereits eine Sitzung haben) und markiert Personen als anwesend über `POST /attendance/visitsessions/log`. Dieser Aufruf findet oder erstellt den Besuch der Person für diese Sitzung. Gruppenleitende können die Anwesenheit ihrer eigenen Gruppen erfassen, ohne die Berechtigung `attendance.edit` – die Controller prüfen `au.leaderGroupIds`.
- **Berichte** – Trend der Anwesenheit und Anwesenheit nach Gruppen sind serverseitig definierte Berichte (`B1Admin/src/components/reporting/ReportWithFilter.tsx` über die ReportingApi; Definitionen in `Api/reports/*.json`). Beide nehmen `startDate`/`endDate` (das Enddatum ist eingeschlossen). Der Trendbericht umfasst standardmäßig den Zeitraum vom Vorjahr bis heute und ergänzt eine Spalte `sessionDates` je Woche; der Baum der Gruppenanwesenheit auf dem Bildschirm enthält für jeden Besuch die `checkinTime` und den `membershipStatus` der Person. Die CSV-Datei der Gruppenanwesenheit stammt aus dem begleitenden Bericht `groupAttendanceDownload`, den `GroupAttendanceDownloadHelper` in eine Zeile je Gruppenmitglied mit einer Spalte „anwesend/abwesend“ je datiertem Termin umformt. Die Historie je Person liefert `GET /attendance/attendancerecords?personId=` (`B1Admin/src/people/components/PersonAttendance.tsx`).

## Etikettendruck

### Vorlagen und Gestaltung

Kirchen gestalten ihre eigenen Etiketten in B1Admin unter `/mobile/checkin/labels` (`B1Admin/src/attendance/LabelsPage.tsx` + `components/LabelEditor.tsx`, erreichbar von der Seite Check-in-Einstellungen). Eine Vorlage ist eine Zeile `labelTemplates`, deren `content` ein JSON-Array von Blöcken ist – `text`, `field`, `barcode`, `qrcode` oder `box`. Jeder Block ist in Prozentkoordinaten positioniert und hat Schrift, Ausrichtung, Symbologie (`code39`/`code128`/`qr`) und optionale Sichtbarkeitsbedingungen (z. B. das Allergiefeld nur anzeigen, wenn `person.nametagNotes` nicht leer ist). Es gibt zwei `labelType`s: `nametag` (eines je eingecheckter Person; Felder wie `person.displayName`, `sessions`, `securityCode` und `person.isBirthdayWeek` – `"true"`, wenn Monat und Tag des Geburtstags innerhalb von drei Tagen um das heutige Datum liegen, wobei der Jahreswechsel berücksichtigt wird und `LabelHelper.isBirthdayWithin()` rechnet) und `pickup` (eines je Familie; Felder wie `children` und `childrenAllergies`). Der Server erzwingt pro Kirche und Typ genau eine Standardvorlage (`LabelTemplateController.save`). Der Designer enthält Startvorlagen, die die Etiketten des Kiosks nachbilden, und zeigt eine Vorschau mit Beispieldaten.

### Rendern und Drucken am Kiosk

Beim Abschluss des Check-ins entscheidet `B1Checkin/src/helpers/LabelHelper.ts`, was gedruckt wird – anhand der Gruppenkennzeichen jedes offenen Besuchs: Namensschilder für Gruppen mit `printNametag`, dazu ein Abholetikett für die Familie, wenn ein Besuch eine Gruppe mit `parentPickup` getroffen hat. Besuche mit dem Typ `volunteer` überspringt `LabelHelper.selectChildVisits()`, sodass eine Betreuungsperson in einem Raum mit Abholung durch Eltern nie ein Abholetikett auslöst. Der Sicherheitscode aus der Antwort des Check-ins wird auf die Namensschilder der Kinder und das Abholetikett gesetzt; Namensschilder Erwachsener werden ohne Code gedruckt. Hat die Kirche Vorlagen, wandelt `LabelRenderer` (`src/helpers/LabelRenderer.ts`) Blöcke und einen Feldkontext in ein eigenständiges HTML-Dokument um. Andernfalls werden die mitgelieferten HTML-Etiketten aus `B1Checkin/assets/labels/` mit Platzhalter-Ersetzung verwendet.

Barcodes entstehen als Inline-SVG durch reine TypeScript-Kodierer in `B1Checkin/src/helpers/barcode.ts` – Musterdefinitionen für Code 39 und Breitentabellen für Code 128 (Zeichensatz B mit Prüfsumme Modulo 103) – sowie QR-Codes über das Paket `qrcode`. **Diese Kodierer sind in B1Admin bewusst dupliziert** (`LabelEditor.tsx` übernimmt dieselben Tabellen, im Code vermerkt), damit die Vorschau im Designer dem Ausdruck am Kiosk genau entspricht. Eine Änderung an einer Stelle muss daher an der anderen nachgezogen werden.

Die Druckpipeline (`src/components/PrintUI.tsx`) rendert jedes HTML-Etikett in einer `WebView`, erfasst es mit `react-native-view-shot` als JPG und übergibt die Bild-URIs an das native Expo-Modul **printer-helper** (`B1Checkin/modules/printer-helper/`). Das Modul stellt `scan()`, `checkInit()`, `printUris()` und Statusereignisse bereit, mit einem Anbieter je Marke auf beiden Plattformen:

| Marke | Android | iOS | Hinweise |
|-------|---------|-----|-------|
| Brother | `BrotherProvider.kt` (Brother-Druck-SDK) | `BrotherProvider.swift` (`BRLMPrinterKit.xcframework`) | Netzwerkdrucker der QL-Serie (QL-800/810W/820NWB/1100/1110NWB …), Etiketten 29×90 mm (Stanzung), die empfohlene Standardeinstellung |
| Zebra | `ZebraProvider.kt` (Link-OS-SDK) | `ZebraProvider.swift` + `ZebraBridge` | Netzwerkerkennung und Druck von Bildern über TCP/ZPL |

Die Auswahl des Druckers erfolgt in `app/printers.tsx` (der Netzwerk-Scan liefert Einträge der Form `brand~model~ip`; die Auswahl wird in AsyncStorage gespeichert). `src/helpers/PrinterLog.ts` führt ein Diagnoseprotokoll auf dem Gerät, das über einen Statuspunkt im Kopfbereich des Kiosks sichtbar ist.

## Gästeregistrierung

Auf zwei Wegen entsteht während des Check-ins eine Person:

- **Am Kiosk** – Die Schaltfläche „Gast hinzufügen“ auf dem Haushaltsbildschirm öffnet `B1Checkin/app/addGuest.tsx`. Dort wird zuerst über `GET /membership/people/search?term=` nach einem vorhandenen Treffer unter den Nicht-Mitgliedern gesucht; andernfalls wird über `POST /membership/people` eine Person angelegt und dem aktuellen Haushalt zugeordnet. Der Gast durchläuft danach die Gruppenzuordnung wie jedes Mitglied.
- **Selbstbedienung per QR-Code** – Ist die Kircheneinstellung `enableQRGuestRegistration` aktiviert (in den Check-in-Einstellungen von B1Admin festgelegt und über `GET /membership/settings/public/{churchId}` gelesen), zeigt der Suchbildschirm des Kiosks einen QR-Code, der auf `https://{subdomain}.b1.church/guest-register?serviceId=` verweist. Diese Seite der B1App (`src/app/[sdSlug]/(public)/guest-register/page.tsx`) lässt eine Besucherfamilie sich mit dem eigenen Telefon über den anonymen Endpunkt `POST /membership/people/guest-register` registrieren, sodass die Schlange am Kiosk vorankommt. Das QR-Blatt hat außerdem die Schaltfläche **Hier registrieren**, die dieselbe Seite am Kiosk (`app/guestRegister.tsx`) in einer `WebView` ohne Cache öffnet, die im Inkognito-Modus läuft. `src/helpers/GuestRegisterHelper.ts` erzeugt die URL für den QR-Code und die WebView und blockiert jede Navigation außerhalb von `https://{subdomain}.b1.church/guest-register`. Der Bildschirm kehrt bei **Fertig**, bei Zurück oder nach 120 Sekunden Inaktivität zur Suche zurück (Tippen im Formular wird von der WebView als Aktivität gemeldet). Dabei wird die WebView entfernt, sodass die Eingaben einer Familie nie die nächste erreichen.

## Verwandte Seiten

- [Anwesenheit-Endpunkte](../api/endpoints/attendance) – vollständige REST-Schnittstelle für Standorte, Gottesdienste, Sitzungen, Besuche und Besuchssitzungen
- [Membership-Endpunkte](../api/endpoints/membership) – Personen, Haushalte und Gruppen
- [Webhooks](../api/webhooks) – die Ereignisse `session.created`, `attendance.recorded` und `attendance.checkout`
- [Modulstruktur](../api/module-structure) – Organisation des Anwesenheitsmoduls auf dem Server
