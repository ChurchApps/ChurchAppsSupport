---
title: "Check-ins"
---

# Check-ins

<div class="article-intro">

Der Check-in ist ein System mit drei Zugängen: die B1Checkin-Kiosk-App für besetzte und Selbstbedienungsstationen, der Self-Check-in im Mitgliederportal B1App und die Anwesenheitserfassung im Admin-Bereich B1Admin. Alle drei schreiben in dasselbe Anwesenheitsmodul der zentralen Api, und die Zuordnung zu Kinderräumen wird ausschließlich über Gruppen gesteuert – es gibt keine eigene Entität für „Standorte“ oder „Räume“. Darüber liegt eine Schicht zum Schutz von Kindern: Check-in-Typen pro Besuch, serverseitige Prüfungen von Kapazität und Betreuungsschlüssel, Prüfung von Alter und Klassenstufe am Kiosk, verifizierte Abholung beim Check-out und Benachrichtigung der Eltern über den Textnachrichtendienst der Kirche. Diese Seite beschreibt das Datenmodell, die Check-in-Abläufe, die Schutzschicht und die Pipeline für den Etikettendruck.

</div>

## Übersicht

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
| Kiosk | `B1Checkin` | Expo / React Native, Dateirouting über expo-router; EAS-Builds für Android, Amazon Fire und iOS; OTA-Updates über `expo-updates` | Besetzte oder Selbstbedienungsstation mit Etikettendruck und verifiziertem Check-out |
| Self-Check-in | `B1App` | Next.js (Mitgliederportal b1.church) | Angemeldete Mitglieder checken ihren Haushalt per Smartphone ein; kein Druck |
| Admin | `B1Admin` | React SPA | Konfiguriert die Gottesdienststruktur, weist Gruppen Gottesdienstzeiten zu, gestaltet Etiketten, erfasst manuelle Anwesenheit und erstellt Berichte |

Alle drei greifen über `ApiHelper` auf dieselben zwei API-Module zu: **MembershipApi** (`/membership`) für Personen, Haushalte und Gruppen sowie **AttendanceApi** (`/attendance`) für alles Weitere.

## Datenmodell (`Api/src/modules/attendance`)

| Entität / Tabelle | Wichtige Felder | Bedeutung |
|----------------|-----------|---------|
| `campuses` | name, address | Hier veraltet – Standorte werden im Mitgliedermodul gepflegt (`/membership/campuses`); die Kopie im Anwesenheitsmodul ist für ältere Leser eingefroren und nur lesbar (`models/Campus.ts`) |
| `services` | campusId, name | Eine wiederkehrende Zusammenkunft, z. B. „Sonntagmorgen“ (`models/Service.ts`) |
| `serviceTimes` | serviceId, name, dayOfWeek, startTime, endTime, checkinOpenMinutes, checkinCloseMinutes | Ein Zeitfenster innerhalb eines Gottesdienstes, z. B. „9:00 Uhr“ (`models/ServiceTime.ts`). Die Zeitplanspalten sind optional (Migration `tools/migrations/attendance/2026-10-10_service_time_schedule.ts`) und steuern das [Check-in-Zeitfenster](#scheduled-check-in-windows) |
| `groupServiceTimes` | groupId, serviceTimeId | Verknüpfungstabelle: Welche Gruppen (Kinderräume) treffen sich zu welchen Gottesdienstzeiten (`models/GroupServiceTime.ts`) |
| `sessions` | groupId, serviceTimeId, sessionDate | Eine Zusammenkunft einer Gruppe an einem Datum – wird beim Check-in bei Bedarf angelegt (`models/Session.ts`) |
| `visits` | personId, serviceId, visitDate, checkinTime, securityCode, checkinType, checkedInById, checkoutTime, checkedOutBy, checkedOutById | Eine Person nimmt an einem Datum teil (`models/Visit.ts`). `checkinType` ist `member` / `guest` / `volunteer` (NULL = älterer Mitgliedseintrag); er wird vom Kiosk gesetzt und von den Prüfungen für Kapazität und Schlüssel ausgewertet |
| `visitSessions` | visitId, sessionId | Welche Sitzung(en) ein Besuch umfasst – ein Kind, das für zwei Gottesdienstzeiten eingecheckt wird, erhält zwei Zeilen (`models/VisitSession.ts`) |
| `labelTemplates` | name, labelType (`nametag`/`pickup`), width, height, isDefault, content (JSON blocks) | Gestaltbare Etikettenlayouts (`models/LabelTemplate.ts`) |

### So wird ein abgeschlossener Check-in gespeichert

`VisitController.postCheckin` (`Api/src/modules/attendance/controllers/VisitController.ts`) verarbeitet `POST /attendance/visits/checkin?serviceId=&peopleIds=`. Der Body ist ein Array aus `Visit`-Objekten; jedes trägt `visitSessions`, deren eingebettete `session` nur ein Paar `(serviceTimeId, groupId)` nennt. Der Server führt dann folgende Schritte aus:

1. **Prüft Kapazität und Betreuungsschlüssel, bevor etwas geschrieben wird.** `evaluateGates()` → `CheckinGateHelper.evaluate()` prüft für jeden betroffenen Raum Kapazität, Gästekapazität, das Kennzeichen „geschlossen“ und den Betreuungsschlüssel gegenüber der aktuellen Belegung. postCheckin ist **nicht transaktional**, daher muss die Prüfung vor dem ersten Speichern laufen: Ein schwerer Verstoß liefert ein 409 mit dem oder den betroffenen Räumen, und nichts wird gespeichert. Siehe [Kapazitäts- und Betreuungsschlüssel-Prüfungen](#capacity-and-volunteer-ratio-gates).
2. **Löst Sitzungen bei Bedarf auf.** `getSessionId()` findet oder erstellt die `sessions`-Zeile für `(groupId, serviceTimeId, heute)`; Sitzungs-IDs werden pro Datum im Prozess zwischengespeichert. Neue Sitzungen lösen einen Webhook `session.created` aus. Die Schleife ist ein `await`-`for..of`: Ein früheres fire-and-forget-`forEach(async …)` lief dem Speichern voraus und schrieb beim Anlegen der ersten Sitzung NULL-sessionIds (behoben; im Code an der Schleife vermerkt).
3. **Ersetzt die Datensätze des Tages.** Vorhandene Besuche dieser Personen bei diesem Gottesdienst heute werden samt ihren visitSessions gelöscht, dann wird die übermittelte Menge gespeichert. Ein erneuter Check-in einer Familie ist daher eine idempotente Operation („dies ist der aktuelle Stand“), keine Ergänzung. Wird stattdessen `?checkDuplicates=true` übergeben, liefert der Server `{ duplicates: [personId…] }` ohne zu schreiben; so warnt der Kiosk, bevor er überschreibt.
4. **Erzeugt einen Sicherheitscode pro Batch.** `SecurityCodeHelper.generate()` erzeugt einen 4-stelligen Code aus dem Zeichensatz `23456789BCDFGHJKLMNPQRSTVWXYZ` (ohne Vokale und mehrdeutige Zeichen, damit Codes keine Wörter bilden und nicht falsch gelesen werden). Bei einer Kollision mit offenen Besuchen derselben Kirche am selben Tag wird neu erzeugt; der Code wird auf jeden Besuch im Batch gesetzt.
5. **Gibt `{ streaks, securityCode }` zurück.** `streaks` ordnet jeder personId die Anzahl aufeinanderfolgender Wochen mit Anwesenheit zu; der Kiosk feiert Meilensteine (jede 5. Woche) mit Konfetti.

Jeder gespeicherte Besuch löst außerdem einen Webhook `attendance.recorded` aus. Die Leseseite, `GET /attendance/visits/checkin`, liefert die Besuche der Personen ab ihrem **letzten erfassten Datum**. Lag dieses in einer früheren Woche, werden die IDs entfernt, sodass der Client eine vorausgefüllte Kopie der Raumauswahl der Vorwoche erhält, die als neue Datensätze gespeichert wird.

### Check-out

Zwei Endpunkte schließen den Ablauf ab (`VisitController`):

- `GET /attendance/visits/code/:code` – die heutigen, noch nicht ausgecheckten Besuche mit diesem Sicherheitscode, mit geladenen Sitzungen.
- `POST /attendance/visits/checkout` – Body `{ visitIds, checkedOutBy?, checkedOutById? }`; setzt `checkoutTime` und vermerkt, wer abgeholt hat, und löst pro Besuch einen Webhook `attendance.checkout` aus.

Berechtigungen: Kioske authentifizieren sich mit `attendance.checkin`, das genau den Bereich Check-in, Check-out und Etikettenvorlagen gewährt. `attendance.view` und `attendance.edit` decken Berichte und manuelle Erfassung ab; die Struktur (Gottesdienste, Gottesdienstzeiten, Gruppenzuweisungen) erfordert `services.edit`. Das Self-Check-in von Mitgliedern (B1App) benötigt überhaupt keine Berechtigung: Jeder angemeldete Benutzer mit einer verknüpften Person in der Kirche darf `GET`/`POST /attendance/visits/checkin` aufrufen, und der Server beschränkt die übermittelten `personId`s auf den eigenen Haushalt des Aufrufers (sonst 403). Diese Sperre verhindert, dass die `securityCode`s anderer Familien lesbar werden. Die Mitgliedschaft ist die Berechtigung; ob Mitglieder die Funktion *sehen*, steuern die Navigationsreiter von B1App der Kirche. Die übrigen Check-in-Endpunkte (`code/:code`, `checkout`, `guardians`, `CheckinController`) bleiben Kiosken und Mitarbeitenden vorbehalten.

## Gruppen steuern die Raumzuordnung

Im System gibt es keine Raum- oder Klassenraum-Entität. Ein „Raum“ ist eine Mitgliedschafts-**Gruppe** mit aktiviertem `trackAttendance`, die über `groupServiceTimes` mit einer oder mehreren Gottesdienstzeiten verknüpft ist. Die Gruppenfelder (in `Api/src/modules/membership/models/Group.ts`), die das Verhalten am Kiosk bestimmen:

| Feld | Wirkung |
|------|--------|
| `trackAttendance` | Die Gruppe nimmt überhaupt an der Anwesenheitserfassung teil; der Einrichtungsbaum in B1Admin markiert `trackAttendance`-Gruppen ohne `groupServiceTimes`-Eintrag als nicht zugeordnet |
| `parentPickup` | Kennzeichnet einen Kinderraum: Ein Check-in dort macht den Besuch zu einem „Kind“-Besuch, der ein Etikett für die Familienabholung druckt und den Sicherheitscode auf das Namensschild setzt |
| `printNametag` | Ob Check-ins in diese Gruppe überhaupt ein Namensschild drucken |
| `capacity` / `guestCapacity` / `checkinClosed` | Raumkapazitäten und ein hartes Kennzeichen „geschlossen“, das serverseitig von der Check-in-Prüfung durchgesetzt wird (bearbeitbar in den Gruppeneinstellungen in B1Admin unter „Check-in-Kapazität“) |
| `volunteerRatio` / `minVolunteers` | Verhältnis Kinder pro Betreuungsperson und Mindestzahl an Betreuenden, durchgesetzt gemäß der kirchenweiten Einstellung `ratioEnforcement` |
| `minAgeMonths` / `maxAgeMonths` / `minGrade` / `maxGrade` | Grenzen für Alter und Klassenstufe, die am Kiosk ausgewertet werden, um Räume hervorzuheben oder abzublenden |

Jeder Client verarbeitet die Daten auf dieselbe Weise (z. B. `B1Checkin/app/services.tsx`, `B1App/src/app/[sdSlug]/mobile/components/screens/CheckinPage.tsx`): Die Abfragen `GET /attendance/servicetimes?serviceId=`, `GET /attendance/groupservicetimes` und `GET /membership/groups` werden parallel geladen. Danach werden für jede Gottesdienstzeit die Gruppen, deren `groupServiceTimes`-Eintrag auf sie zeigt, in `serviceTime.groups` gesammelt. Dieses Array bildet die Raumauswahl, die nach der `categoryName` der Gruppe geordnet ist.

Zuordnungen werden auf der Gruppenseite in B1Admin bearbeitet (`B1Admin/src/groups/components/ServiceTimesEdit.tsx` – `POST`/`DELETE /attendance/groupservicetimes`). Der gesamte Baum Standort → Gottesdienst → Gottesdienstzeit → Gruppe wird in `B1Admin/src/attendance/components/AttendanceSetup.tsx` über `GET /attendance/attendancerecords/tree` dargestellt.

:::info
Da Gruppen die einzige Quelle der Wahrheit sind, speist dieselbe Gruppenzugehörigkeit die Raumzuordnung am Kiosk, die listenartige Anwesenheitserfassung auf den Gruppenseiten in B1Admin und die Anwesenheitsberichte. Eine Gruppe einer Gottesdienstzeit zuzuordnen ist der einzige Schritt, damit sie zu einem Check-in-Ziel wird.
:::

## Kindersicherheit

### Check-in-Typen

Jeder Besuch trägt einen `checkinType`: `member`, `guest` oder `volunteer` (NULL bedeutet älterer Datensatz bzw. Mitglied; Migration `tools/migrations/attendance/2026-07-03_checkin_type.ts`). Der Typ wird **am Kiosk** gewählt: Die Chips Mitglied / Gast / Betreuung in der aufgeklappten Mitgliederzeile (`B1Checkin/src/components/MemberServiceTimes.tsx`) werden beim Abschluss auf jeden offenen Besuch übertragen (`app/checkinComplete.tsx`, Standard `member`). Der Server wertet ihn in der Prüfung aus: Betreuende zählen für die Schlüsselabdeckung statt gegen die Kapazität, und Gäste zählen gegen `guestCapacity`.

### Kapazitäts- und Betreuungsschlüssel-Prüfungen {#capacity-and-volunteer-ratio-gates}

`CheckinGateHelper.evaluate()` (`Api/src/modules/attendance/helpers/CheckinGateHelper.ts`) läuft in `postCheckin` vor jedem Speichern (der Endpunkt ist nicht transaktional, daher ist die Prüfung vor dem Speichern der Mechanismus für Korrektheit). Sie lädt die aktuelle Belegung je betroffener Gruppe (`VisitRepo.countActiveByGroupToday`) und die Gruppenkonfiguration über das Gateway des Mitgliedermoduls und klassifiziert dann die Verstöße:

- **Hart (blockiert immer):** `checkinClosed`, `current + incoming > capacity`, Gästeanzahl über `guestCapacity`. Der Batch wird mit `409 { error: "capacity", groups: [{ groupId, groupName, reason }] }` abgelehnt; der Kiosk zeigt den betroffenen Raum.
- **Schlüssel (warnen oder blockieren):** Eingehende Nicht-Betreuende in einen Raum, in dem `volunteers < minVolunteers` gilt, keine Betreuenden vorhanden sind oder `children > volunteers × volunteerRatio`. Der Schweregrad folgt der kirchenspezifischen Einstellung `ratioEnforcement` (`"warn"` als Standard oder `"block"`; bearbeitbar in B1Admin unter Gemeinde verwalten → Check-in, `CheckinSettingsEdit.tsx`). Im Warnmodus liefert der Server `409 { warning: true, error: "ratio", … }`, sofern der Client nicht mit `acknowledgeWarnings=true` erneut sendet. Dieses erneute Senden ist die Bestätigung durch Mitarbeitende am Kiosk.

### Geplante Check-in-Zeitfenster {#scheduled-check-in-windows}

Eine Gottesdienstzeit kann einen optionalen Wochenplan haben (`dayOfWeek` 0–6, wobei 0 = Sonntag; `startTime`/`endTime` als `HH:mm`; `checkinOpenMinutes`, `checkinCloseMinutes`). Er wird in B1Admin im Formular **Anwesenheit → Einrichtung** für die Gottesdienstzeit bearbeitet (`B1Admin/src/attendance/components/ServiceTimeEdit.tsx`, „Check-in-Zeitplan“). `CheckinGateHelper.hasSchedule()` behandelt eine Gottesdienstzeit nur dann als geplant, wenn sowohl `dayOfWeek` als auch `startTime` gesetzt sind; ungeplante Zeiten werden nie zeitlich begrenzt. `isServiceTimeOpen()` berechnet das Zeitfenster in der Ortszeit der Kirche (`DateHelper.toChurchTime`). Maßgeblich ist die `timeZone` der Kirche. Kirchen ohne Eintrag greifen auf den ersten nicht entfernten Standort mit einer `timezone` zurück (`MembershipModuleGateway.loadCampusTimeZone`) und erst danach auf `America/New_York`. Sowohl die Auflistung als auch die Buchung unten lösen die Zeitzone auf dieselbe Weise auf. Das Fenster beginnt `checkinOpenMinutes` vor dem Start und endet `checkinCloseMinutes` nach dem Ende (oder nach dem Start, wenn kein Ende angegeben ist). Fenster, die über Mitternacht oder die Wochengrenze reichen, werden berücksichtigt.

Das Fenster wird an zwei Stellen durchgesetzt:

- **Auflistung:** `GET /attendance/servicetimes` versieht jede Zeile mit einem berechneten booleschen Wert `checkinOpen`. Das Self-Check-in von B1App (`CheckinPage.tsx`) und die Gottesdienstauswahl von B1Checkin (`app/services.tsx`) entfernen Zeiten mit `checkinOpen === false`. Hat ein Gottesdienst Zeiten, aber keine davon ist offen, erscheint der Hinweis „Check-in ist für diesen Gottesdienst gerade nicht geöffnet.“ (Der Kiosk bietet eine Schaltfläche Zurück, um einen anderen Gottesdienst zu wählen.)
- **Buchung:** Innerhalb von `evaluateGates()`, vor der Prüfung von Kapazität und Schlüssel, lehnt `findClosedServiceTimeGroups()` den Batch mit `409 { error: "notOpen", groups: [{ groupId, groupName, reason: "notOpen" }] }` ab, wenn die Gottesdienstzeit einer betroffenen Sitzung außerhalb ihres Fensters liegt. B1Checkin zeigt dies über den harten Sperrbildschirm mit dem Grund „Check-in ist gerade nicht geöffnet“ an (Kapazitätsverstöße lauten weiterhin „Raum ist voll oder geschlossen“).

### Alters- und Klassenstufenprüfung (am Kiosk) {#agegrade-eligibility-kiosk-side}

Die Raumberechtigung ist eine beratende Anzeige, die am Kiosk ausgewertet und nicht vom Server erzwungen wird. `B1Checkin/src/helpers/EligibilityHelper.ts` vergleicht Geburtsdatum und Klassenstufe einer Person mit `minAgeMonths`/`maxAgeMonths`/`minGrade`/`maxGrade` der Gruppe (Reihenfolge der Klassenstufen: PreK, K, 1–12, Graduated). Das Ergebnis ist `eligible`, `ineligible` oder `unknown`. Fehlende Daten ergeben `unknown` und blenden nie einen Raum aus. Alter und Klassenstufe werden zum **Stichtag der Klassenstufenversetzung** der Kirche berechnet (Einstellung `gradePromotionDate`, Format `"MM-DD"`, bearbeitbar in `B1Admin/src/settings/components/GradePromotionSettingsEdit.tsx`). Der Kiosk lädt sie über `GET /attendance/checkin/settings`, und `resolveAsOfDate` wählt das letzte Vorkommen am heutigen Tag oder davor. Die Raumauswahl hebt berechtigte Räume hervor und blendet nicht passende ab; wer einen abgeblendeten Raum wählt, benötigt eine Bestätigung durch Mitarbeitende.

### Abholung durch vertrauenswürdige und nicht berechtigte Personen {#trusted-and-not-authorized-pickup}

Abholberechtigte Personen sind ein Objekt der Mitgliedschaft, je Haushalt: `householdPickupPeople` (`Api/src/modules/membership/models/HouseholdPickupPerson.ts`; householdId, optionale personId, Name, photoUrl, relationship, `status` `trusted` / `notAuthorized`, notes). Verwaltet wird über `GET /membership/householdpickup/:householdId` (jeder angemeldete Benutzer der Kirche, damit Kioske die Liste lesen können) sowie über `POST` und `DELETE`, die `people.edit` erfordern. Mitarbeitende pflegen die Liste auf der Karte **Abholung** der Personenseite (`B1Admin/src/people/components/PickupPeople.tsx`): Foto, Beziehung und ein Statuschip „Vertrauenswürdig“ oder „Nicht berechtigt“.

Beim Check-out (`B1Checkin/app/checkout.tsx`) lädt der Kiosk die Abholliste des Haushalts. Einträge mit `trusted` erscheinen als antippbare Abholkarten neben dem Fotoraster der erwachsenen Haushaltsmitglieder. Ein frei eingegebener Name „Andere“ wird unscharf (Levenshtein, `src/helpers/PickupMatchHelper.ts`) mit den Einträgen `notAuthorized` abgeglichen. Ein Treffer blockiert den Check-out mit einem Warnblatt und einer Schaltfläche **Übersteuern** für Mitarbeitende. Die Übersteuerung wird im Besuch selbst protokolliert: Sie sendet `checkedOutBy` als `"OVERRIDE: {name}"` über den regulären `POST /attendance/visits/checkout`. Dadurch erscheint sie im Anwesenheitsdatensatz und im Webhook `attendance.checkout`, nicht in einer separaten Prüftabelle.

### Eltern benachrichtigen und Notfall-Rundsendung

`CheckinController` (`Api/src/modules/attendance/controllers/CheckinController.ts`, `/attendance/checkin`) stellt zwei SMS-Endpunkte bereit:

- `POST /page` mit `{ visitId, message }` benachrichtigt die Erziehungsberechtigten eines eingecheckten Kindes (Check-out-Bildschirm am Kiosk, bemannter Modus).
- `POST /broadcast` mit `{ serviceId, message }` sendet allen erwachsenen Mitgliedern der eingecheckten Haushalte eines Gottesdienstes eine Textnachricht (Administrationseinstellungen des Kiosks, hinter einem Blatt, das zur Bestätigung die Eingabe von `EMERGENCY` verlangt; `B1Checkin/app/adminSettings.tsx`).

Beide Endpunkte ermitteln die erwachsenen Haushaltsmitglieder über das Mitgliedergateway und übergeben die Zustellung an **`MessagingModuleGateway.sendBulkText`** (`Api/src/shared/modules/MessagingModuleGateway.ts`). Dies ist die modulübergreifende Schnittstelle zum konfigurierten Textnachrichtendienst der Kirche (`@churchapps/texting`: TextInChurch, Clearstream oder MutualMinistry; einen eingebauten SMS-Versand gibt es nicht). Das Gateway protokolliert eine Zeile `sentText` sowie Einträge `deliveryLog` je Empfänger und begrenzt einen Batch auf 500 Empfänger. Ohne konfigurierten Anbieter liefert es `no_provider`, was der Kiosk als „Kein SMS-Anbieter konfiguriert“ anzeigt. Die Funktion `dispatch()` des Controllers entfernt doppelte Telefonnummern und überspringt Personen ohne Mobilnummer oder mit gesetztem `optedOut`. Sie liefert `{ sent, failed, skippedOptedOut, skippedNoPhone }` zurück, damit der Kiosk anzeigen kann, was übersprungen wurde.

## Der Kiosk (B1Checkin)

Die Bildschirme sind expo-router-Dateien unter `B1Checkin/app/`. Der bildschirmübergreifende Zustand liegt in einer statischen Klasse `CachedData` (`src/helpers/CachedData.ts`) und nicht im React-State.

```
index (boot/auto-login) → selectChurch → services ──▶ lookup ──▶ household ──▶ checkinComplete
                                          │             │  ▲         │ │            │
             loads serviceTimes, groups,  │             │  └─────────┘ └▶ addGuest  └▶ print labels,
             groupServiceTimes,           │             └▶ checkout (manned)           auto-return
             labelTemplates               │                                            to lookup
```

1. **Suche** (`app/lookup.tsx`): Suche nach Telefonnummer (`GET /membership/people/search/phone?number=`, letzte 4 Ziffern oder vollständig) oder nach Name (`GET /membership/people/search?term=`). Wird ein Treffer gewählt, lädt der Kiosk den Haushalt (`GET /membership/people/household/{householdId}`) und vorhandene Besuche (`GET /attendance/visits/checkin`) und füllt `pendingVisits` mit den Auswahlen der Vorwoche.
2. **Prüfung des Haushalts** (`app/household.tsx`, `src/components/MemberList.tsx`): Jede Mitgliederzeile zeigt ein Abzeichen für bereits eingecheckt, ein Abzeichen für Allergien bzw. `nametagNotes` und ihre aktuellen Raum-Chips. Beim Aufklappen eines Mitglieds werden alle Gottesdienstzeiten mit einer Raumschaltfläche sowie die Chips für den Check-in-Typ Mitglied / Gast / Betreuung aufgelistet (`MemberServiceTimes.tsx`). Unter jedem Namen einer Gottesdienstzeit zeigt `ServiceTimeHelper.getGroupSummary()` die dort angebotenen Gruppen (die Namen aus `serviceTime.groups`, gekürzt, ohne Groß- und Kleinschreibung doppelt entfernt und durch Kommas getrennt). Hat die Zeit keine Gruppen, wird nichts angezeigt.
3. **Gruppenzuordnung** (`app/selectGroup.tsx`): Ein Kategoriebaum aus `serviceTime.groups`, in dem altersgerechte Räume hervorgehoben und nicht passende abgeblendet sind. Abgeblendete Räume sind nur nach Bestätigung durch Mitarbeitende wählbar (siehe [Alters- und Klassenstufenprüfung](#agegrade-eligibility-kiosk-side)). Die Wahl eines Raums schreibt eine visitSession `{ session: { serviceTimeId, groupId } }` in den offenen Besuch der Person (`src/helpers/VisitSessionHelper.ts`). „Keine“ hebt die Wahl auf.
4. **Abschluss** (`app/checkinComplete.tsx`): `POST /attendance/visits/checkin` mit `pendingVisits` (jeweils mit seinem `checkinType`). Danach werden Etiketten gedruckt, falls ein Drucker konfiguriert ist, und die Anzeige kehrt automatisch zur Suche zurück. Eine Antwort `409` wegen Kapazität oder `notOpen` zeigt den betroffenen Raum mit dem Grund (voll bzw. geschlossen oder Check-in nicht geöffnet). Eine Schlüsselwarnung bietet eine Bestätigung durch Mitarbeitende, die mit `acknowledgeWarnings=true` erneut sendet.

Der Bildschirm **Check-out** (`app/checkout.tsx`) nimmt den 4-stelligen Sicherheitscode über ein automatisch fokussiertes Eingabefeld entgegen. USB- oder Bluetooth-Barcodescanner, die sich als Tastatur ausgeben, funktionieren daher ohne Kamera. Alternativ gibt es ein Tastenfeld auf dem Bildschirm mit demselben Zeichensatz, das bei 4 Zeichen automatisch absendet. Eine Schaltfläche **Scannen** öffnet ein Blatt mit der gemeinsamen Kamera `src/components/CodeScanner.tsx` (standardmäßig rückseitig, akzeptiert QR, Code 128 und Code 39). So können auch Stationen ohne Tastatur-Scanner das Abholetikett lesen. Ein gescannter Code läuft über denselben Pfad `handleCode()` wie eingegebener Text. Der Bildschirm sucht den Code, zeigt die abzuholenden Kinder an und präsentiert die **vertrauenswürdigen Abholpersonen** des Haushalts als antippbare Karten neben einem Fotoraster der erwachsenen Haushaltsmitglieder. Dazu kommt eine Option „Andere“ mit Freitext, die unscharf gegen die nicht berechtigten Namen geprüft wird (siehe [Abholung durch vertrauenswürdige und nicht berechtigte Personen](#trusted-and-not-authorized-pickup)). Danach sendet er `POST /attendance/visits/checkout` mit Name und ID der gewählten Person. Im bemannten Modus bietet der Bildschirm außerdem **Eltern benachrichtigen** (`POST /attendance/checkin/page`) und einen **erneuten Druck des Sicherheitsetiketts**. `reprint()` erstellt die Etiketten der Familie mit `LabelHelper.getAllLabelsFor(...)` neu und leitet sie über dieselbe Pipeline `PrintUI` wie beim Check-in.

Der Stationsmodus wird über das AsyncStorage-Flag `@StationMode` gesteuert (`"self"` oder `"manned"`; umgeschaltet in `app/adminSettings.tsx`). Der bemannte Modus ergänzt den Einstieg zum Check-out auf dem Suchbildschirm und die Bearbeitung einzelner Personenprofile (`POST /membership/people`) vom Haushaltsbildschirm aus. Die Härtung des Kiosks ist eingebaut: Eine optionale PIN (`app/setPin.tsx`, `src/components/PinEntryModal.tsx`) schützt die Verwaltungs- und Druckerbildschirme. Der Verwaltungsbildschirm öffnet sich nur nach 7 schnellen Tippern auf das Logo in der Kopfzeile. Ein Ruhebildschirm (`src/hooks/useInactivityTimer.ts`) übernimmt zwischen den Familien.

## Self-Check-in (B1App)

Mitglieder checken sich über das Portal b1.church auf dem Bildschirm `/mobile/checkin` ein (weitergeleitet von `B1App/src/app/[sdSlug]/mobile/components/ScreenRouter.tsx` zu `screens/CheckinPage.tsx`). Er erfordert einen angemeldeten Benutzer und durchläuft dieselben vier Schritte wie der Kiosk (Gottesdienste, Haushalt, Gruppen, Abschluss) über dieselben Endpunkte. Der Zustand wird in `B1App/src/helpers/CheckinHelper.ts` gehalten. Die Unterschiede zum Kiosk: Der Haushalt stammt aus der eigenen `householdId` des angemeldeten Benutzers (kein Suchschritt), und es gibt keinen Etikettendruck. Stattdessen zeigt der Abschlussbildschirm den Sicherheitscode des Batches als QR-Code (`qrcode.react`) mit dem Hinweis „Zeigen Sie diesen an einer Check-in-Station vor“. Ist der Haushalt beim Laden der Seite bereits eingecheckt, zeigt die Schaltfläche „Check-in-Code anzeigen“ den QR-Code erneut an, und zwar aus dem ersten vorhandenen Besuch aus `GET /attendance/visits/checkin`, der einen `securityCode` trägt. Der Check-in wird beim Absenden sofort erfasst (es gibt keinen Zwischenzustand). Der QR-Code steuert nur den Etikettendruck am Kiosk.

**Etikettendruck vom Telefon am Kiosk** (`B1Checkin/app/scan.tsx`, erreichbar über die Schaltfläche „Code scannen“ am QR-Code auf dem Suchbildschirm): Der Kiosk zeigt `CodeScanner` (eine `expo-camera`-`CameraView`, standardmäßig zur Vorderseite gerichtet und umschaltbar), der nach QR-Codes sucht. `ScanCodeHelper.parse()` akzeptiert eine Nutzlast nur, wenn sie ein reiner 4-stelliger Code aus dem Zeichensatz der Sicherheitscodes ist. `ScanCodeHelper.isRepeat()` ignoriert denselben Code 4 Sekunden lang. So funktionieren sowohl der QR-Code aus B1App als auch der QR-Block eines gedruckten Etiketts. Der Bildschirm folgt danach dem Pfad für den erneuten Druck beim Check-out: `GET /attendance/visits/code/{code}` → `GET /membership/people/ids` → `LabelHelper.getAllLabelsFor(visits, people, code)` → `PrintUI`. Danach kehrt er zur Suche zurück. Beim Scannen findet keine Anwesenheitsbuchung statt, es werden nur Etiketten gedruckt. Codes ohne aktive Besuche, Stationen ohne Drucker und Gruppen ohne Etiketten zeigen jeweils eine Kurzmeldung und kehren zur Suche zurück.

Typen sowie `ApiHelper` und `ArrayHelper` stammen aus `@churchapps/helpers` und `@churchapps/apphelper`. React-Komponenten werden nicht mit B1Admin geteilt.

## Anwesenheit im Admin-Bereich (B1Admin)

- **Einrichtung**: `/attendance` (`B1Admin/src/attendance/AttendancePage.tsx`) zeigt den Strukturbaum und legt Gottesdienste (`ServiceEdit.tsx`) und Gottesdienstzeiten (`ServiceTimeEdit.tsx`) an. Standortdaten stammen über den Hook `useCampuses()` aus dem Mitgliedermodul.
- **Manuelle Anwesenheit** befindet sich im Bereich Gruppen, nicht im Bereich Anwesenheit: `B1Admin/src/groups/components/GroupSessionsTab.tsx` legt Sitzungen an (`POST /attendance/sessions`). Beim Hinzufügen kann `SessionEdit.tsx` für jede andere Gruppe mit der gewählten Gottesdienstzeit eine Sitzung einschließen; Gruppen, die an diesem Datum bereits eine Sitzung haben, werden übersprungen. Personen werden über `POST /attendance/visitsessions/log` als anwesend markiert, wobei der Besuch für diese Person und Sitzung gefunden oder angelegt wird. Gruppenleitungen können die Anwesenheit ihrer eigenen Gruppen erfassen, ohne die Berechtigung `attendance.edit`. Die Controller prüfen dazu `au.leaderGroupIds`.
- **Berichte**: Anwesenheitstrend und Gruppenanwesenheit sind serverseitig definierte Berichte (`B1Admin/src/components/reporting/ReportWithFilter.tsx` gegen ReportingApi; Definitionen in `Api/reports/*.json`). Beide nehmen `startDate` und `endDate` entgegen (Enddatum eingeschlossen). Der Trendbericht umfasst standardmäßig den Zeitraum von vor einem Jahr bis heute und fügt eine Spalte `sessionDates` pro Woche hinzu. Die Baumansicht der Gruppenanwesenheit enthält für jeden Besuch die `checkinTime` und den `membershipStatus` der Person. Die CSV-Datei der Gruppenanwesenheit stammt aus dem zugehörigen Bericht `groupAttendanceDownload`. `GroupAttendanceDownloadHelper` wandelt ihn in eine Zeile je Gruppenmitglied um, mit einer Spalte Anwesend/Abwesend je datierter Sitzung. Der Verlauf einer Person ist über `GET /attendance/attendancerecords?personId=` abrufbar (`B1Admin/src/people/components/PersonAttendance.tsx`).

## Etikettendruck

### Vorlagen und Designer

Kirchen gestalten ihre Etiketten in B1Admin unter `/mobile/checkin/labels` (`B1Admin/src/attendance/LabelsPage.tsx` mit `components/LabelEditor.tsx`; erreichbar über die Einstellungsseite Check-in). Eine Vorlage ist eine Zeile `labelTemplates`, deren `content` ein JSON-Array von Blöcken ist: `text`, `field`, `barcode`, `qrcode` oder `box`. Jeder Block ist in Prozentkoordinaten positioniert und hat Schrift, Ausrichtung, Symbologie (`code39`, `code128` oder `qr`) und optionale Sichtbarkeitsbedingungen. Beispiel: Der Allergiekasten wird nur angezeigt, wenn `person.nametagNotes` nicht leer ist. Es gibt zwei `labelType`s:

- `nametag`: einer pro eingechecktem Person. Felder sind z. B. `person.displayName`, `sessions`, `securityCode` und `person.isBirthdayWeek`. Letzteres ist `"true"`, wenn Monat und Tag des Geburtstags innerhalb von 3 Tagen um das heutige Datum liegen, auch über den Jahreswechsel hinweg (berechnet von `LabelHelper.isBirthdayWithin()`).
- `pickup`: einer pro Familie. Felder sind z. B. `children` und `childrenAllergies`.

Der Server erzwingt je Typ und Kirche genau eine Standardvorlage (`LabelTemplateController.save`). Der Designer enthält Startvorlagen, die die mitgelieferten Etiketten des Kiosks nachbilden, und zeigt Vorschauen mit Beispieldaten.

### Rendering und Drucken am Kiosk

Beim Abschluss des Check-ins entscheidet `B1Checkin/src/helpers/LabelHelper.ts` anhand der Gruppenkennzeichen jedes offenen Besuchs, was gedruckt wird: Namensschilder für Gruppen mit `printNametag` sowie ein Etikett für die Familienabholung, sobald ein Besuch eine Gruppe mit `parentPickup` betrifft. Besuche mit dem Check-in-Typ `volunteer` überspringt `LabelHelper.selectChildVisits()`. Eine Betreuungsperson in einem Raum für Elternabholung löst daher nie ein Abholetikett aus. Der Sicherheitscode aus der Check-in-Antwort wird auf die Namensschilder der Kinder und auf das Abholetikett gesetzt. Namensschilder für Erwachsene werden ohne Code gedruckt. Hat die Kirche Vorlagen, wandelt `LabelRenderer` (`src/helpers/LabelRenderer.ts`) Blöcke und einen Feldkontext in ein eigenständiges HTML-Dokument um. Andernfalls werden die mitgelieferten HTML-Etiketten aus `B1Checkin/assets/labels/` mit Platzhalterersetzung verwendet.

Barcodes werden als Inline-SVG durch rein in TypeScript geschriebene Encoder in `B1Checkin/src/helpers/barcode.ts` erzeugt: Code-39-Mustertabellen, Code-128-Breitentabellen (Zeichensatz B mit Modulo-103-Prüfsumme) und QR über das Paket `qrcode`. **Diese Encoder sind absichtlich in B1Admin doppelt vorhanden** (`LabelEditor.tsx` enthält dieselben Tabellen, dies ist in einem Codekommentar vermerkt), damit die Vorschauen im Designer pixelgenau dem Ausdruck am Kiosk entsprechen. Eine Änderung an einem muss im anderen nachgezogen werden.

Die Druckpipeline (`src/components/PrintUI.tsx`) rendert jedes HTML-Etikett in einer `WebView`, erfasst es mit `react-native-view-shot` als JPG und übergibt die Bild-URIs an das native Expo-Modul **printer-helper** (`B1Checkin/modules/printer-helper/`). Das Modul stellt `scan()`, `checkInit()`, `printUris()` und Statusereignisse bereit. Auf beiden Plattformen gibt es je Marke einen Anbieter:

| Marke | Android | iOS | Hinweise |
|-------|---------|-----|-------|
| Brother | `BrotherProvider.kt` (Brother-Druck-SDK) | `BrotherProvider.swift` (`BRLMPrinterKit.xcframework`) | Netzwerkdrucker der QL-Serie (QL-800/810W/820NWB/1100/1110NWB…), Stanzetiketten 29×90 mm, die empfohlene Standardeinstellung |
| Zebra | `ZebraProvider.kt` (Link-OS-SDK) | `ZebraProvider.swift` + `ZebraBridge` | Netzwerkerkennung und Druck von Bildern über TCP mit ZPL |

Die Druckerauswahl befindet sich in `app/printers.tsx`. Der Netzwerkscan liefert Einträge im Format `brand~model~ip`, und die Auswahl wird in AsyncStorage gespeichert. `src/helpers/PrinterLog.ts` führt ein Diagnoseprotokoll auf dem Gerät, das über einen Live-Statuspunkt in der Kopfzeile des Kiosks angezeigt wird.

## Gästeregistrierung

Zwei Wege legen während des Check-ins eine Person an:

- **Am Kiosk**: Die Schaltfläche „Gast hinzufügen“ auf dem Haushaltsbildschirm öffnet `B1Checkin/app/addGuest.tsx`. Dort wird zuerst über `GET /membership/people/search?term=` nach einem vorhandenen Nichtmitglied gesucht. Andernfalls wird über `POST /membership/people` eine neue Person angelegt, die dem aktuellen Haushalt zugeordnet ist. Der Gast durchläuft danach die Gruppenzuordnung wie jedes Mitglied.
- **Selbstregistrierung per QR-Code**: Ist die Kircheneinstellung `enableQRGuestRegistration` aktiviert (konfiguriert in den Check-in-Einstellungen von B1Admin und gelesen aus `GET /membership/settings/public/{churchId}`), zeigt der Suchbildschirm des Kiosks einen QR-Code. Er verweist auf `https://{subdomain}.b1.church/guest-register?serviceId=`. Diese Seite von B1App (`src/app/[sdSlug]/(public)/guest-register/page.tsx`) erlaubt einer Besucherfamilie, sich auf dem eigenen Smartphone über den anonymen Endpunkt `POST /membership/people/guest-register` zu registrieren. So bleibt die Schlange am Kiosk in Bewegung. Das QR-Blatt enthält außerdem eine Schaltfläche **Hier registrieren**, die dieselbe Seite am Kiosk (`app/guestRegister.tsx`) in einer `WebView` ohne Cache im Inkognito-Modus öffnet. `src/helpers/GuestRegisterHelper.ts` erstellt die URL für den QR-Code und die WebView und blockiert Navigation außerhalb von `https://{subdomain}.b1.church/guest-register`. Der Bildschirm kehrt bei **Fertig**, bei Zurück oder nach 120 Sekunden Inaktivität zur Suche zurück. Tippen im Formular zählt dabei als Aktivität, die aus der WebView gemeldet wird. Die WebView wird dann entfernt, sodass die Eingaben einer Familie nie die nächste erreichen.

## Verwandte Seiten

- [Anwesenheits-Endpunkte](../api/endpoints/attendance) – Vollständige REST-Schnittstelle für Standorte, Gottesdienste, Sitzungen, Besuche und Besuchssitzungen
- [Mitglieder-Endpunkte](../api/endpoints/membership) – Personen, Haushalte und Gruppen
- [Webhooks](../api/webhooks) – Die Ereignisse `session.created`, `attendance.recorded` und `attendance.checkout`
- [Modulstruktur](../api/module-structure) – Wie das Anwesenheitsmodul serverseitig organisiert ist
