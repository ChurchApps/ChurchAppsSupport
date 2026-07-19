---
title: "Check-Ins"
---

# Check-Ins

<div class="article-intro">

Check-in ist ein System mit drei Eingängen: die B1Checkin-Kiosk-App für bemannte und Self-Service-Stationen, Self-Check-in innerhalb des B1App-Mitgliederportals sowie admin-seitige Anwesenheitserfassung in B1Admin. Alle drei schreiben in dasselbe Attendance-Modul der Core-Api, und das Routing auf Klassenräume wird vollständig von Groups gesteuert — es gibt keine eigenständige „Locations“- oder „Rooms“-Entität. Darüber liegt eine Kindersicherheits-Schicht: pro-Besuch-Check-in-Typen, serverseitige Kapazitäts- und Betreuungsschlüssel-Gates, kioskseitige Alters-/Klassenstufen-Berechtigung, verifizierte Abholung beim Check-out und Elternbenachrichtigung über den Textnachrichten-Anbieter der Kirche. Diese Seite beschreibt das Datenmodell, die Check-in-Abläufe, die Sicherheits-Schicht und die Etikettendruck-Pipeline.

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

| Oberfläche | Repo | Stack | Rolle |
|---------|------|-------|------|
| Kiosk | `B1Checkin` | Expo / React Native, expo-router-Datei-Routing; EAS-Builds für Android, Amazon Fire und iOS; OTA-Updates über `expo-updates` | Bemannte oder Self-Service-Station mit Etikettendruck und verifiziertem Check-out |
| Self-Check-in | `B1App` | Next.js (b1.church-Mitgliederportal) | Angemeldete Mitglieder checken ihren Haushalt vom Telefon aus ein; kein Druck |
| Admin | `B1Admin` | React SPA | Konfiguriert die Dienststruktur, weist Groups Dienstzeiten zu, gestaltet Etiketten, erfasst manuelle Anwesenheit, führt Berichte aus |

Alle drei rufen über `ApiHelper` dieselben zwei API-Module auf: **MembershipApi** (`/membership`) für Personen, Haushalte und Groups; **AttendanceApi** (`/attendance`) für alles Weitere unten.

## Datenmodell (`Api/src/modules/attendance`)

| Entität / Tabelle | Schlüsselfelder | Bedeutung |
|----------------|-----------|---------|
| `campuses` | name, address | Hier veraltet — Campuses werden im Membership-Modul geführt (`/membership/campuses`); die Attendance-Kopie ist für Legacy-Leser eingefroren und nur lesbar (`models/Campus.ts`) |
| `services` | campusId, name | Eine wiederkehrende Zusammenkunft, z. B. „Sunday Morning“ (`models/Service.ts`) |
| `serviceTimes` | serviceId, name | Ein Zeitfenster innerhalb eines Service, z. B. „9:00 AM“ (`models/ServiceTime.ts`) |
| `groupServiceTimes` | groupId, serviceTimeId | Verknüpfungstabelle: welche Groups (Klassenräume) zu welchen Dienstzeiten treffen (`models/GroupServiceTime.ts`) |
| `sessions` | groupId, serviceTimeId, sessionDate | Ein Treffen einer Group an einem Datum — wird beim Check-in verzögert erzeugt (`models/Session.ts`) |
| `visits` | personId, serviceId, visitDate, checkinTime, securityCode, checkinType, checkedInById, checkoutTime, checkedOutBy, checkedOutById | Eine Person, die an einem Datum teilnimmt (`models/Visit.ts`). `checkinType` ist `member` / `guest` / `volunteer` (NULL = Legacy-Mitglied), vom Kiosk gesetzt und von den Kapazitäts-/Verhältnis-Gates ausgewertet |
| `visitSessions` | visitId, sessionId | Welche Session(s) ein Besuch abdeckt — ein Kind, das für zwei Dienstzeiten eingecheckt wird, erhält zwei Zeilen (`models/VisitSession.ts`) |
| `labelTemplates` | name, labelType (`nametag`/`pickup`), width, height, isDefault, content (JSON-Blöcke) | Gestaltbare Etikett-Layouts (`models/LabelTemplate.ts`) |

### Wie ein abgeschlossener Check-in gespeichert wird

`VisitController.postCheckin` (`Api/src/modules/attendance/controllers/VisitController.ts`) bearbeitet `POST /attendance/visits/checkin?serviceId=&peopleIds=`. Der Body ist ein Array von `Visit`-Objekten, jedes mit `visitSessions`, deren eingebettete `session` nur ein Paar `(serviceTimeId, groupId)` benennt. Der Server tut dann Folgendes:

1. **Prüft Kapazität und Verhältnisse, bevor irgendetwas geschrieben wird.** `evaluateGates()` → `CheckinGateHelper.evaluate()` prüft für jeden angesteuerten Raum Kapazität, Gastkapazität, das Geschlossen-Flag und das Betreuungsverhältnis gegen die aktuelle Belegung. postCheckin ist **nicht transaktional**, daher muss das Gate vor dem ersten Speichern laufen — eine harte Verletzung liefert einen 409 zurück, der den betroffenen Raum/die betroffenen Räume benennt, und es wird nichts gespeichert. Siehe [Kapazitäts- und Betreuungsverhältnis-Gates](#kapazitäts--und-betreuungsverhältnis-gates).
2. **Löst Sessions verzögert auf.** `getSessionId()` findet oder erstellt die `sessions`-Zeile für `(groupId, serviceTimeId, heute)` — Session-IDs werden pro Datum im Prozess zwischengespeichert. Neue Sessions lösen einen `session.created`-Webhook aus. Die Schleife ist ein awaited `for..of` — ein früheres Fire-and-forget-`forEach(async …)` geriet mit dem Speichern in eine Race Condition und schrieb bei der ersten Session-Erstellung NULL-sessionIds (behoben; vermerkt in einem Code-Kommentar an der Schleife).
3. **Ersetzt die Datensätze des Tages.** Alle bestehenden Besuche dieser Personen bei diesem Service heute werden zusammen mit ihren visitSessions gelöscht, dann wird die übermittelte Menge gespeichert. Eine Familie erneut einzuchecken ist daher eine idempotente „das ist der aktuelle Zustand“-Operation, kein Anhängen. Wird stattdessen `?checkDuplicates=true` übergeben, liefert der Aufruf `{ duplicates: [personId…] }` zurück, ohne zu schreiben — so warnt der Kiosk, bevor er überschreibt.
4. **Erzeugt einen Sicherheitscode pro Batch.** `SecurityCodeHelper.generate()` erzeugt einen 4-stelligen Code aus dem Alphabet `23456789BCDFGHJKLMNPQRSTVWXYZ` (keine Vokale oder mehrdeutigen Zeichen, damit Codes keine Wörter ergeben oder falsch gelesen werden können). Der Server versucht bei Kollisionen mit den am selben Tag offenen Besuchen derselben Kirche erneut und trägt den Code auf jedem Besuch des Batches ein.
5. **Liefert `{ streaks, securityCode }` zurück.** `streaks` ordnet jeder personId die Anzahl aufeinanderfolgender Wochen mit Anwesenheit zu; der Kiosk feiert Meilensteine (jede 5. Woche) mit Konfetti.

Jeder gespeicherte Besuch löst außerdem einen `attendance.recorded`-Webhook aus. Die Leseseite, `GET /attendance/visits/checkin`, liefert die Besuche der Personen aus ihrem **zuletzt protokollierten Datum** — lag dieses in einer früheren Woche, werden die IDs entfernt, sodass der Client eine vorausgefüllte Kopie der Raumauswahl der Vorwoche erhält, die als neue Datensätze gespeichert wird.

### Check-out

Zwei Endpunkte schließen den Kreislauf ab (`VisitController`):

- `GET /attendance/visits/code/:code` — die heutigen, noch nicht ausgecheckten Besuche mit diesem Sicherheitscode, mit befüllten Sessions.
- `POST /attendance/visits/checkout` — Body `{ visitIds, checkedOutBy?, checkedOutById? }`; trägt `checkoutTime` und die abholende Person ein und löst pro Besuch einen `attendance.checkout`-Webhook aus.

Berechtigungen: Kiosks authentifizieren sich mit `attendance.checkin`, was genau die Check-in-/Check-out-/Etikettenvorlagen-Oberfläche gewährt; `attendance.view`/`attendance.edit` decken Reporting und manuelle Erfassung ab; die Struktur (Services, Dienstzeiten, Group-Zuweisungen) erfordert `services.edit`.

## Groups steuern das Raum-Routing

Es gibt im gesamten System keine Raum- oder Klassenzimmer-Entität. Ein „Raum“ ist eine Membership-**Group** mit aktiviertem `trackAttendance`, die über `groupServiceTimes` mit einer oder mehreren Dienstzeiten verknüpft ist. Die Group-Felder (in `Api/src/modules/membership/models/Group.ts`), die das Kiosk-Verhalten prägen:

| Feld | Wirkung |
|------|--------|
| `trackAttendance` | Group nimmt überhaupt an der Anwesenheitserfassung teil; B1Admins Setup-Baum markiert `trackAttendance`-Groups ohne `groupServiceTimes`-Zeile als nicht zugewiesen |
| `parentPickup` | Markiert einen Kinderraum: Das Einchecken dorthin macht den Besuch zu einem „Kind“-Besuch, wodurch ein Familien-Abholetikett gedruckt und der Sicherheitscode auf das Namensschild gesetzt wird |
| `printNametag` | Ob Check-ins in diese Group überhaupt ein Namensschild drucken |
| `capacity` / `guestCapacity` / `checkinClosed` | Raumkapazitätsgrenzen und ein harter „Geschlossen“-Schalter, serverseitig durch das Check-in-Gate durchgesetzt (bearbeitet in B1Admins Group-Einstellungen unter „Check-In Capacity“) |
| `volunteerRatio` / `minVolunteers` | Kind-pro-Betreuer-Verhältnis und Mindestanzahl an Betreuern, durchgesetzt gemäß der kirchenweiten Einstellung `ratioEnforcement` |
| `minAgeMonths` / `maxAgeMonths` / `minGrade` / `maxGrade` | Alters-/Klassenstufen-Berechtigungsgrenzen, kioskseitig ausgewertet, um Räume hervorzuheben oder abzublenden |

Jeder Client denormalisiert auf dieselbe Weise (z. B. `B1Checkin/app/services.tsx`, `B1App/src/app/[sdSlug]/mobile/components/screens/CheckinPage.tsx`): parallel `GET /attendance/servicetimes?serviceId=`, `GET /attendance/groupservicetimes` und `GET /membership/groups` laden, dann für jede Dienstzeit die Groups sammeln, deren `groupServiceTimes`-Zeile auf sie zeigt, in `serviceTime.groups`. Dieses Array ist es, was der Raum-Picker anzeigt, gegliedert nach der Group-`categoryName`.

Zuweisungen werden auf der Group-Seite in B1Admin bearbeitet (`B1Admin/src/groups/components/ServiceTimesEdit.tsx` — `POST`/`DELETE /attendance/groupservicetimes`), und der gesamte Baum Campus → Service → Service Time → Group wird in `B1Admin/src/attendance/components/AttendanceSetup.tsx` über `GET /attendance/attendancerecords/tree` visualisiert.

:::info
Da Groups die alleinige Quelle der Wahrheit sind, treibt dieselbe Group-Mitgliedschaft sowohl das Kiosk-Routing als auch die listenartige Anwesenheitserfassung in B1Admins Group-Seiten und das Anwesenheits-Reporting an — eine Group einer Dienstzeit zuzuweisen ist der einzige Schritt, der nötig ist, um sie zu einem Check-in-Ziel zu machen.
:::

## Kindersicherheit

### Check-in-Typen

Jeder Besuch trägt einen `checkinType` — `member`, `guest` oder `volunteer` (NULL bedeutet Legacy/Mitglied; Migration `tools/migrations/attendance/2026-07-03_checkin_type.ts`). Der Typ wird **kioskseitig** gewählt: Member-/Guest-/Volunteer-Chips auf der ausgeklappten Mitgliederzeile (`B1Checkin/src/components/MemberServiceTimes.tsx`), bei Abschluss auf jeden ausstehenden Besuch gestempelt (`app/checkinComplete.tsx`, standardmäßig `member`). Der Server wertet ihn im Gate aus — Volunteers zählen zur Betreuungsabdeckung statt gegen die Kapazität, und Guests zählen gegen `guestCapacity`.

### Kapazitäts- und Betreuungsverhältnis-Gates

`CheckinGateHelper.evaluate()` (`Api/src/modules/attendance/helpers/CheckinGateHelper.ts`) läuft innerhalb von `postCheckin`, bevor irgendetwas gespeichert wird (der Endpunkt ist nicht transaktional, daher ist das Gaten-vor-dem-Speichern der Korrektheitsmechanismus). Er lädt die aktuelle Belegung pro angesteuerter Group (`VisitRepo.countActiveByGroupToday`) sowie die Group-Konfiguration über das Membership-Modul-Gateway und klassifiziert dann Verstöße:

- **Hart (blockiert immer):** `checkinClosed`, `current + incoming > capacity`, Gastanzahl über `guestCapacity`. Der Batch wird mit `409 { error: "capacity", groups: [{ groupId, groupName, reason }] }` abgelehnt — der Kiosk zeigt den benannten Raum an.
- **Verhältnis (warnt oder blockiert):** eingehende Nicht-Volunteers in einen Raum, in dem `volunteers < minVolunteers` gilt, gar keine Volunteers vorhanden sind, oder `children > volunteers × volunteerRatio`. Der Schweregrad folgt der Kircheneinstellung `ratioEnforcement` (`"warn"` als Standard / `"block"`, bearbeitet in B1Admin unter Manage Church → Check-In, `CheckinSettingsEdit.tsx`). Der Warn-Modus liefert `409 { warning: true, error: "ratio", … }` zurück, es sei denn, der Client übermittelt erneut mit `acknowledgeWarnings=true` — diese erneute Übermittlung ist die Bestätigungs-Übersteuerung durch das Personal am Kiosk.

### Alters-/Klassenstufen-Berechtigung (kioskseitig)

Die Raum-Berechtigung ist beratende UI, die auf dem Kiosk ausgewertet wird, nicht serverseitig durchgesetzt. `B1Checkin/src/helpers/EligibilityHelper.ts` vergleicht das Geburtsdatum/die Klassenstufe einer Person mit den Group-Werten `minAgeMonths`/`maxAgeMonths`/`minGrade`/`maxGrade` (Klassenreihenfolge: PreK, K, 1–12, Graduated) und liefert `eligible` / `ineligible` / `unknown` zurück — fehlende Daten ergeben `unknown` und verbergen niemals einen Raum. Alter und Klassenstufe werden zum kirchlichen **Klassenstufen-Beförderungsdatum** berechnet (Einstellung `gradePromotionDate`, `"MM-DD"`, bearbeitet in `B1Admin/src/settings/components/GradePromotionSettingsEdit.tsx`); der Kiosk ruft es über `GET /attendance/checkin/settings` ab, und `resolveAsOfDate` wählt das jüngste Vorkommen an oder vor heute. Der Raum-Picker hebt berechtigte Räume hervor und blendet nicht berechtigte ab; die Auswahl eines abgeblendeten Raums erfordert eine Bestätigung durch das Personal.

### Vertrauenswürdige und nicht autorisierte Abholung

Abholpersonen sind eine Membership-Entität pro Haushalt: `householdPickupPeople` (`Api/src/modules/membership/models/HouseholdPickupPerson.ts` — householdId, optionale personId, name, photoUrl, relationship, `status` `trusted` / `notAuthorized`, notes). CRUD läuft über `GET /membership/householdpickup/:householdId` (jeder authentifizierte Kirchenbenutzer, sodass Kiosks lesend zugreifen können) sowie `POST` / `DELETE`, geschützt durch `people.edit`. Das Personal verwaltet die Liste auf der **Pickup**-Karte der Personenseite (`B1Admin/src/people/components/PickupPeople.tsx`) — Foto, Beziehung und ein Status-Chip Trusted/Not Authorized.

Beim Check-out (`B1Checkin/app/checkout.tsx`) lädt der Kiosk die Abholliste des Haushalts: `trusted`-Einträge werden als antippbare Abholkarten neben dem Fotoraster der Haushalts-Erwachsenen dargestellt, und ein frei eingetippter „Other“-Name wird per Fuzzy-Matching (Levenshtein, `src/helpers/PickupMatchHelper.ts`) gegen `notAuthorized`-Einträge abgeglichen — eine Übereinstimmung blockiert den Check-out mit einem Warnhinweis und einem Personal-**Override**-Button. Der Override wird direkt am Besuch protokolliert: Er sendet `checkedOutBy` als `"OVERRIDE: {name}"` über das normale `POST /attendance/visits/checkout`, sodass er im Anwesenheitsdatensatz und im `attendance.checkout`-Webhook landet, statt in einer separaten Audit-Tabelle.

### Elternbenachrichtigung und Notfall-Rundruf

`CheckinController` (`Api/src/modules/attendance/controllers/CheckinController.ts`, `/attendance/checkin`) stellt zwei SMS-Endpunkte bereit:

- `POST /page` — `{ visitId, message }`: benachrichtigt die Erziehungsberechtigten eines eingecheckten Kindes (Check-out-Bildschirm des Kiosks, im bemannten Modus).
- `POST /broadcast` — `{ serviceId, message }`: schickt allen eingecheckten Haushalts-Erwachsenen eines Service eine SMS (Kiosk-Admin-Einstellungen, hinter einem Bestätigungsdialog, der das Eintippen von „EMERGENCY“ verlangt, in `B1Checkin/app/adminSettings.tsx`).

Beide lösen die Haushalts-Erwachsenen über das Membership-Gateway auf und übergeben die Zustellung dann an **`MessagingModuleGateway.sendBulkText`** (`Api/src/shared/modules/MessagingModuleGateway.ts`) — die modulübergreifende Tür zum konfigurierten Textnachrichten-Anbieter der Kirche (`@churchapps/texting`: TextInChurch, Clearstream oder MutualMinistry; es gibt keinen eingebauten SMS-Versand). Das Gateway protokolliert eine `sentText`-Zeile plus pro-Empfänger-`deliveryLog`-Einträge und begrenzt einen Batch auf 500 Empfänger; ist kein Anbieter konfiguriert, liefert es `no_provider` zurück, was der Kiosk als „No SMS provider configured“ anzeigt. Die `dispatch()`-Methode des Controllers dedupliziert Telefonnummern und überspringt Personen ohne Mobilnummer oder mit gesetztem `optedOut`, wobei `{ sent, failed, skippedOptedOut, skippedNoPhone }` zurückgegeben wird, damit der Kiosk anzeigen kann, was übersprungen wurde.

## Der Kiosk (B1Checkin)

Bildschirme sind expo-router-Dateien unter `B1Checkin/app/`; bildschirmübergreifender Zustand lebt in einer statischen `CachedData`-Klasse (`src/helpers/CachedData.ts`), nicht im React-State.

```
index (boot/auto-login) → selectChurch → services ──▶ lookup ──▶ household ──▶ checkinComplete
                                          │             │  ▲         │ │            │
             loads serviceTimes, groups,  │             │  └─────────┘ └▶ addGuest  └▶ print labels,
             groupServiceTimes,           │             └▶ checkout (manned)           auto-return
             labelTemplates               │                                            to lookup
```

1. **Lookup** (`app/lookup.tsx`) — Suche per Telefonnummer (`GET /membership/people/search/phone?number=`, letzte 4 Ziffern oder vollständig) oder Name (`GET /membership/people/search?term=`). Die Auswahl eines Treffers lädt den Haushalt (`GET /membership/people/household/{householdId}`) und bestehende Besuche (`GET /attendance/visits/checkin`) und befüllt `pendingVisits` mit der Auswahl der Vorwoche.
2. **Haushaltsübersicht** (`app/household.tsx`, `src/components/MemberList.tsx`) — jede Mitgliederzeile zeigt ein Bereits-eingecheckt-Abzeichen, ein Allergie-/`nametagNotes`-Abzeichen und die aktuellen Raum-Chips. Beim Ausklappen eines Mitglieds erscheint jede Dienstzeit mit einem Raum-Button sowie den Check-in-Typ-Chips Member / Guest / Volunteer (`MemberServiceTimes.tsx`).
3. **Group-Zuweisung** (`app/selectGroup.tsx`) — ein aus `serviceTime.groups` aufgebauter Kategoriebaum, wobei alters-/klassenstufen-berechtigte Räume hervorgehoben und nicht berechtigte hinter einer Personal-Bestätigung abgeblendet werden (siehe [Alters-/Klassenstufen-Berechtigung](#altersklassenstufen-berechtigung-kioskseitig)); die Auswahl eines Raums schreibt eine `{ session: { serviceTimeId, groupId } }`-visitSession in den ausstehenden Besuch dieser Person (`src/helpers/VisitSessionHelper.ts`). „None“ löscht sie.
4. **Complete** (`app/checkinComplete.tsx`) — `POST /attendance/visits/checkin` mit `pendingVisits` (jeweils mit ihrem `checkinType` versehen), druckt anschließend Etiketten, falls ein Drucker konfiguriert ist, und kehrt automatisch zum Lookup zurück. Eine 409-Kapazitätsantwort zeigt den benannten vollen/geschlossenen Raum; eine Verhältnis-Warnung bietet eine Personal-Bestätigung an, die mit `acknowledgeWarnings=true` erneut übermittelt.

Der **Check-out**-Bildschirm (`app/checkout.tsx`) akzeptiert den 4-stelligen Sicherheitscode über ein automatisch fokussiertes Eingabefeld — sodass USB-/Bluetooth-Keyboard-Wedge-Barcode-Scanner ganz ohne Kamera funktionieren — oder einen Bildschirm-Ziffernblock mit demselben Alphabet, der bei 4 Zeichen automatisch absendet. Er sucht den Code, zeigt die abzuholenden Kinder und präsentiert die **vertrauenswürdigen Abholpersonen** des Haushalts als antippbare Karten neben einem Fotoraster der Haushalts-Erwachsenen (plus eine „Other“-Freitextoption, die gegen nicht autorisierte Namen fuzzy-geprüft wird — siehe [Vertrauenswürdige und nicht autorisierte Abholung](#vertrauenswürdige-und-nicht-autorisierte-abholung)) und sendet dann `POST /attendance/visits/checkout` mit Name/ID der abholenden Person. Im bemannten Modus bietet der Bildschirm zusätzlich **Page a parent** (`POST /attendance/checkin/page`) sowie einen **Sicherheitsetikett-Nachdruck** — `reprint()` baut die Familienetiketten mit `LabelHelper.getAllLabelsFor(...)` neu auf und leitet sie durch dieselbe `PrintUI`-Pipeline wie beim Check-in.

Die Stationspersönlichkeit ist ein AsyncStorage-Flag `@StationMode` (`"self"` | `"manned"`, umschaltbar in `app/adminSettings.tsx`). Der bemannte Modus fügt den Check-out-Einstiegspunkt auf dem Lookup-Bildschirm hinzu sowie die Bearbeitung von Mitgliederprofilen (`POST /membership/people`) vom Haushaltsbildschirm aus. Kiosk-Härtung ist eingebaut: eine optionale PIN (`app/setPin.tsx`, `src/components/PinEntryModal.tsx`) schützt die Admin- und Drucker-Bildschirme, der Admin-Bildschirm öffnet sich nur über 7 schnelle Taps auf das Kopfzeilen-Logo, und ein Leerlauf-Bildschirmschoner (`src/hooks/useInactivityTimer.ts`) übernimmt zwischen den Familien.

## Self-Check-in (B1App)

Mitglieder checken sich vom b1.church-Portal auf dem Bildschirm `/mobile/checkin` ein (geroutet von `B1App/src/app/[sdSlug]/mobile/components/ScreenRouter.tsx` zu `screens/CheckinPage.tsx`). Es erfordert einen angemeldeten Benutzer und durchläuft dieselben vier Schritte wie der Kiosk — Services → Haushalt → Groups → Complete — gegen die identischen Endpunkte, mit Zustand in `B1App/src/helpers/CheckinHelper.ts`. Die Unterschiede zum Kiosk: Der Haushalt stammt aus der eigenen `householdId` des angemeldeten Benutzers (kein Suchschritt), und es gibt keinen Etikettendruck — stattdessen zeigt der Abschlussbildschirm den Sicherheitscode des Batches als QR-Code (`qrcode.react`) mit dem Hinweis „an einer Check-in-Station vorzeigen“. Ist der Haushalt beim Laden der Seite bereits eingecheckt, zeigt ein Button „Show check-in code“ den QR-Code aus dem `securityCode` des bestehenden Besuchs erneut an. Der Check-in wird sofort beim Absenden erfasst (es gibt keinen ausstehenden Zustand); der QR-Code steuert lediglich den Etikettendruck am Kiosk.

**Etikettendruck vom Telefon zum Kiosk** (`B1Checkin/app/scan.tsx`, erreichbar über den Button „Scan code“ auf dem Lookup-Bildschirm): Der Kiosk öffnet eine `expo-camera`-`CameraView` (standardmäßig frontseitig, umschaltbar) und scannt nach QR-Codes. Ein gescannter Payload wird akzeptiert, wenn er ein reiner 4-stelliger Code im Sicherheitscode-Alphabet ist, sodass sowohl der B1App-QR-Code als auch der QR-Block eines gedruckten Etiketts funktionieren. Der Bildschirm folgt dann demselben Pfad wie der Check-out-Nachdruck — `GET /attendance/visits/code/{code}` → `GET /membership/people/ids` → `LabelHelper.getAllLabelsFor(visits, people, code)` → `PrintUI` — und kehrt zum Lookup zurück. Beim Scan wird keine Anwesenheit geschrieben; es werden nur Etiketten gedruckt. Codes ohne aktive Besuche, Stationen ohne Drucker und Groups ohne Etiketten zeigen jeweils eine Toast-Meldung und kehren zum Lookup zurück.

Typen sowie `ApiHelper`/`ArrayHelper` stammen aus `@churchapps/helpers` und `@churchapps/apphelper`; es werden keine React-Komponenten mit B1Admin geteilt.

## Admin-seitige Anwesenheitserfassung (B1Admin)

- **Setup** — `/attendance` (`B1Admin/src/attendance/AttendancePage.tsx`) rendert den Strukturbaum und erstellt Services (`ServiceEdit.tsx`) und Dienstzeiten (`ServiceTimeEdit.tsx`). Campus-Daten stammen über den Hook `useCampuses()` aus Membership.
- **Manuelle Anwesenheit** liegt auf der Groups-Seite, nicht im Attendance-Bereich: `B1Admin/src/groups/components/GroupSessionsTab.tsx` erstellt Sessions (`POST /attendance/sessions`) und markiert Personen als anwesend über `POST /attendance/visitsessions/log`, was den Besuch für diese Person und Session findet oder erstellt. Group-Leiter können für ihre eigenen Groups Anwesenheit erfassen, ohne die Berechtigung `attendance.edit` zu benötigen — die Controller prüfen `au.leaderGroupIds`.
- **Reporting** — Anwesenheitstrend und Group-Anwesenheit sind serverseitig definierte Berichte (`B1Admin/src/components/reporting/ReportWithFilter.tsx` gegen die ReportingApi); die Historie pro Person liefert `GET /attendance/attendancerecords?personId=` (`B1Admin/src/people/components/PersonAttendance.tsx`).

## Etikettendruck

### Vorlagen und der Designer

Kirchen gestalten ihre eigenen Etiketten in B1Admin unter `/mobile/checkin/labels` (`B1Admin/src/attendance/LabelsPage.tsx` + `components/LabelEditor.tsx`, erreichbar über die Check-In-Einstellungsseite). Eine Vorlage ist eine `labelTemplates`-Zeile, deren `content` ein JSON-Array von Blöcken ist — `text`, `field`, `barcode`, `qrcode` oder `box` —, jeder in Prozentkoordinaten positioniert, mit Schrift, Ausrichtung, Symbologie (`code39`/`code128`/`qr`) und optionalen Sichtbarkeitsbedingungen (z. B. die Allergiebox nur rendern, wenn `person.nametagNotes` nicht leer ist). Es gibt zwei `labelType`s: `nametag` (eines pro eingecheckter Person; Felder wie `person.displayName`, `sessions`, `securityCode`) und `pickup` (eines pro Familie; Felder wie `children`, `childrenAllergies`). Der Server erzwingt genau eine Standardvorlage pro Typ und Kirche (`LabelTemplateController.save`). Der Designer liefert Starter-Vorlagen, die die gebündelten Etiketten des Kiosks widerspiegeln, und zeigt Vorschauen anhand von Beispieldaten.

### Rendering und Druck am Kiosk

Bei Abschluss des Check-ins entscheidet `B1Checkin/src/helpers/LabelHelper.ts` anhand der Group-Flags jedes ausstehenden Besuchs, was gedruckt wird: Namensschilder für `printNametag`-Groups, plus ein Familien-Abholetikett, falls ein Besuch eine `parentPickup`-Group betraf. Der Sicherheitscode aus der Check-in-Antwort erscheint auf den Namensschildern der Kinder und auf dem Abholetikett; Namensschilder der Erwachsenen werden ohne Code gedruckt. Besitzt die Kirche Vorlagen, wandelt `LabelRenderer` (`src/helpers/LabelRenderer.ts`) Blöcke plus einen Feldkontext in ein eigenständiges HTML-Dokument um; andernfalls werden gebündelte HTML-Etiketten in `B1Checkin/assets/labels/` mit Platzhalter-Ersetzung verwendet.

Barcodes werden als Inline-SVG von reinen TypeScript-Encodern in `B1Checkin/src/helpers/barcode.ts` erzeugt — Code-39-Mustertabellen und Code 128 (Codesatz B mit Mod-103-Prüfsumme) Breitentabellen, plus QR über das Paket `qrcode`. **Diese Encoder sind absichtlich in B1Admin dupliziert** (`LabelEditor.tsx` bindet dieselben Tabellen inline ein, vermerkt in einem Code-Kommentar), damit Designer-Vorschauen pixelgenau der Kiosk-Ausgabe entsprechen; eine Änderung an einer Stelle muss in der anderen gespiegelt werden.

Die Druck-Pipeline (`src/components/PrintUI.tsx`) rendert jedes HTML-Etikett in einer `WebView`, erfasst es per `react-native-view-shot` als JPG und übergibt die Bild-URIs an das native Expo-Modul **printer-helper** (`B1Checkin/modules/printer-helper/`). Das Modul stellt `scan()`, `checkInit()`, `printUris()` und Status-Events bereit, mit je einem Provider pro Marke auf beiden Plattformen:

| Marke | Android | iOS | Hinweise |
|-------|---------|-----|-------|
| Brother | `BrotherProvider.kt` (Brother-Print-SDK) | `BrotherProvider.swift` (`BRLMPrinterKit.xcframework`) | QL-Serie-Netzwerkdrucker (QL-800/810W/820NWB/1100/1110NWB…), gestanzte 29×90-Etiketten, die empfohlene Standardvorgabe |
| Zebra | `ZebraProvider.kt` (Link-OS-SDK) | `ZebraProvider.swift` + `ZebraBridge` | Netzwerkerkennung + TCP/ZPL-Bilddruck |

Die Druckerauswahl liegt unter `app/printers.tsx` (Netzwerk-Scan liefert Einträge im Format `brand~model~ip`; die Wahl wird in AsyncStorage gespeichert), und `src/helpers/PrinterLog.ts` führt ein Diagnoseprotokoll auf dem Gerät, das über einen Live-Statuspunkt in der Kiosk-Kopfzeile angezeigt wird.

## Gastregistrierung

Zwei Wege erzeugen mitten im Check-in eine Person:

- **Am Kiosk** — der Button „Add guest“ auf dem Haushaltsbildschirm öffnet `B1Checkin/app/addGuest.tsx`, der zunächst über `GET /membership/people/search?term=` nach einer bestehenden Nichtmitglied-Übereinstimmung sucht und andernfalls mit `POST /membership/people` eine neue Person erstellt, verknüpft mit dem aktuellen Haushalt. Der Gast durchläuft anschließend die Group-Zuweisung wie jedes Mitglied.
- **Self-Service per QR-Code** — ist die Kircheneinstellung `enableQRGuestRegistration` aktiviert (konfiguriert in B1Admins Check-In-Einstellungen, ausgelesen über `GET /membership/settings/public/{churchId}`), zeigt der Lookup-Bildschirm des Kiosks einen QR-Code, der auf `https://{subdomain}.b1.church/guest-register?serviceId=` verweist. Diese B1App-Seite (`src/app/[sdSlug]/(public)/guest-register/page.tsx`) lässt eine besuchende Familie sich selbst über ihr eigenes Telefon per anonymem Endpunkt `POST /membership/people/guest-register` registrieren, sodass die Kioskschlange in Bewegung bleibt.

## Verwandte Themen

- [Attendance-Endpunkte](../api/endpoints/attendance) — Vollständige REST-Oberfläche für Campuses, Services, Sessions, Visits und Visit Sessions
- [Membership-Endpunkte](../api/endpoints/membership) — Personen, Haushalte und Groups
- [Webhooks](../api/webhooks) — Die Ereignisse `session.created`, `attendance.recorded` und `attendance.checkout`
- [Modulstruktur](../api/module-structure) — Wie das Attendance-Modul serverseitig organisiert ist
