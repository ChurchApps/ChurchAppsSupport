---
title: "Check-Ins"
---

# Check-Ins

<div class="article-intro">

Check-in ist ein System mit drei Eingangstüren: die B1Checkin-Kiosk-App für besetzte und Selbstbedienungsstationen, Selbst-Check-in innerhalb des B1App-Mitgliederportals und admin-seitige Anwesenheit in B1Admin. Alle drei schreiben in dasselbe Anwesenheitsmodul der Kern-Api, und das Klassenzimmer-Routing wird vollständig von Groups gesteuert — es gibt keine separate „Standorte"- oder „Räume"-Entität. Darüber liegt eine Kindersicherheitsschicht: Check-in-Typen pro Besuch, serverseitige Kapazitäts- und Betreuungsschlüssel-Gates, kiosk-seitige Alters-/Klassenstufen-Eignung, vertrauenswürdige Abholverifizierung beim Check-out und Elternbenachrichtigung über den SMS-Anbieter der Gemeinde. Diese Seite bildet das Datenmodell, die Check-in-Abläufe, die Sicherheitsschicht und die Etikettendruck-Pipeline ab.

</div>

## Überblick

```
┌──────────────────────────┐──┐         ┌──────────────────────────────────────────────┐
│ B1Checkin (Expo kiosk)   │  │         │ Api                                          │
│  lookup → household →    │  │  HTTPS  │  ┌─ membership module ─────────────────────┐ │
│  groups → complete/print │  │         │  │ people · households · groups            │ │
├──────────────────────────┤  ├───────▶ │  └─────────────────────────────────────────┘ │
│ B1App (self check-in)    │──┤         │  ┌─ attendance module ─────────────────────┐ │
│  /mobile/checkin screen  │  │         │  │ campuses → services → serviceTimes      │ │
├──────────────────────────┤  │         │  │ groupServiceTimes  (room routing)       │ │
│ B1Admin (staff)          │──┘         │  │ sessions ← visitSessions → visits       │ │
│  setup · reports ·       │            │  │ labelTemplates                          │ │
│  label designer          │            │  └─────────────────────────────────────────┘ │
└──────────────────────────┘            └──────────────────────────────────────────────┘

Label print path (kiosk only):
POST /attendance/visits/checkin ──▶ { securityCode, streaks }
  └▶ LabelHelper (label templates, or bundled HTML fallback)
       └▶ LabelRenderer → HTML doc + inline SVG barcodes
            └▶ PrintUI: WebView render → ViewShot JPG capture
                 └▶ printer-helper native module → Brother QL / Zebra
```

| Oberfläche | Repo | Stack | Rolle |
|---------|------|-------|------|
| Kiosk | `B1Checkin` | Expo / React Native, expo-router-Datei-Routing; EAS-Builds für Android, Amazon Fire und iOS; OTA-Updates über `expo-updates` | Besetzte oder Selbstbedienungsstation mit Etikettendruck und verifiziertem Check-out |
| Selbst-Check-in | `B1App` | Next.js (b1.church-Mitgliederportal) | Angemeldete Mitglieder checken ihren Haushalt vom Handy aus ein; kein Drucken |
| Admin | `B1Admin` | React-SPA | Konfiguriert die Gottesdienststruktur, weist Gruppen Gottesdienstzeiten zu, gestaltet Etiketten, erfasst manuelle Anwesenheit, führt Berichte aus |

Alle drei rufen dieselben zwei API-Module über `ApiHelper` auf: **MembershipApi** (`/membership`) für Personen, Haushalte und Gruppen; **AttendanceApi** (`/attendance`) für alles Weitere.

## Datenmodell (`Api/src/modules/attendance`)

| Entität / Tabelle | Schlüsselfelder | Bedeutung |
|----------------|-----------|---------|
| `campuses` | name, address | Hier veraltet — Standorte werden im Membership-Modul (`/membership/campuses`) verwaltet; die Attendance-Kopie ist für Legacy-Leser eingefroren-schreibgeschützt (`models/Campus.ts`) |
| `services` | campusId, name | Ein wiederkehrendes Zusammenkommen, z. B. „Sonntagvormittag" (`models/Service.ts`) |
| `serviceTimes` | serviceId, name | Ein Zeitfenster innerhalb eines Gottesdienstes, z. B. „9:00 Uhr" (`models/ServiceTime.ts`) |
| `groupServiceTimes` | groupId, serviceTimeId | Verknüpfungstabelle: welche Gruppen (Klassenzimmer) sich zu welchen Gottesdienstzeiten treffen (`models/GroupServiceTime.ts`) |
| `sessions` | groupId, serviceTimeId, sessionDate | Ein Treffen einer Gruppe an einem Datum — wird zum Check-in-Zeitpunkt lazy erstellt (`models/Session.ts`) |
| `visits` | personId, serviceId, visitDate, checkinTime, securityCode, checkinType, checkedInById, checkoutTime, checkedOutBy, checkedOutById | Eine Person, die an einem Datum teilnimmt (`models/Visit.ts`). `checkinType` ist `member` / `guest` / `volunteer` (NULL = Legacy-Mitglied), vom Kiosk gesetzt und von den Kapazitäts-/Verhältnis-Gates konsumiert |
| `visitSessions` | visitId, sessionId | Welche Session(s) ein Besuch abdeckt — ein zu zwei Gottesdienstzeiten eingechecktes Kind erhält zwei Zeilen (`models/VisitSession.ts`) |
| `labelTemplates` | name, labelType (`nametag`/`pickup`), width, height, isDefault, content (JSON-Blöcke) | Gestaltbare Etikettenlayouts (`models/LabelTemplate.ts`) |

### Wie ein abgeschlossener Check-in gespeichert wird

`VisitController.postCheckin` (`Api/src/modules/attendance/controllers/VisitController.ts`) behandelt `POST /attendance/visits/checkin?serviceId=&peopleIds=`. Der Body ist ein Array von `Visit`-Objekten, jedes mit eingebetteten `visitSessions`, deren eingebettete `session` nur ein `(serviceTimeId, groupId)`-Paar benennt. Der Server dann:

1. **Prüft Kapazität und Verhältnisse vor jedem Schreibvorgang.** `evaluateGates()` → `CheckinGateHelper.evaluate()` prüft die Kapazität, Gastkapazität, das Geschlossen-Flag und das Betreuungsverhältnis jedes anvisierten Raums gegen die aktuelle Belegung. postCheckin ist **nicht transaktional**, daher muss das Gate vor dem ersten Speichern laufen — eine harte Verletzung liefert ein 409, das die betroffenen Räume benennt, und nichts wird persistiert. Siehe [Kapazitäts- und Betreuungsschlüssel-Gates](#kapazitats-und-betreuungsschlussel-gates).
2. **Löst Sessions lazy auf.** `getSessionId()` findet oder erstellt die `sessions`-Zeile für `(groupId, serviceTimeId, heute)` — Session-IDs werden pro Datum im Prozess zwischengespeichert. Neue Sessions lösen einen `session.created`-Webhook aus. Die Schleife ist ein awaiteter `for..of` — ein früheres Fire-and-forget `forEach(async …)` lief dem Speichern davon und schrieb bei der ersten Session-Erstellung NULL-Session-IDs (behoben; vermerkt in einem Codekommentar an der Schleife).
3. **Ersetzt die Datensätze des Tages.** Alle bestehenden Besuche dieser Personen bei diesem Gottesdienst heute werden zusammen mit ihren visitSessions gelöscht, dann wird der eingereichte Satz gespeichert. Das erneute Einchecken einer Familie ist daher eine idempotente „das ist der aktuelle Zustand"-Operation, kein Anhängen. Wird stattdessen `?checkDuplicates=true` übergeben, liefert dies `{ duplicates: [personId…] }` ohne zu schreiben — so warnt der Kiosk vor dem Überschreiben.
4. **Erzeugt einen Sicherheitscode pro Batch.** `SecurityCodeHelper.generate()` erzeugt einen 4-stelligen Code aus dem Alphabet `23456789BCDFGHJKLMNPQRSTVWXYZ` (keine Vokale oder mehrdeutigen Zeichen, sodass Codes keine Wörter buchstabieren oder falsch gelesen werden können). Der Server wiederholt bei Kollision gegen die offenen Besuche derselben Gemeinde am selben Tag und stempelt den Code auf jeden Besuch im Batch.
5. **Liefert `{ streaks, securityCode }`.** `streaks` ordnet der personId die Anzahl aufeinanderfolgender Wochen mit Anwesenheit zu; der Kiosk feiert Meilensteine (jede 5. Woche) mit Konfetti.

Jeder gespeicherte Besuch löst auch einen `attendance.recorded`-Webhook aus. Die Leseseite, `GET /attendance/visits/checkin`, liefert die Besuche der Personen von ihrem **letzten protokollierten Datum** — war das eine vorherige Woche, werden die IDs entfernt, sodass der Client eine vorausgefüllte Kopie der letztwöchigen Raumauswahlen erhält, die als neue Datensätze gespeichert werden.

### Check-out

Zwei Endpunkte schließen den Kreis (`VisitController`):

- `GET /attendance/visits/code/:code` — die heutigen, noch nicht ausgecheckten Besuche mit diesem Sicherheitscode, mit befüllten Sessions.
- `POST /attendance/visits/checkout` — Body `{ visitIds, checkedOutBy?, checkedOutById? }`; stempelt `checkoutTime` und wer abgeholt hat, und löst einen `attendance.checkout`-Webhook pro Besuch aus.

Berechtigungen: Kiosks authentifizieren sich mit `attendance.checkin`, was genau die Check-in-/Check-out-/Etikettenvorlagen-Oberfläche gewährt; `attendance.view`/`attendance.edit` decken Berichte und manuelle Erfassung ab; die Struktur (Gottesdienste, Gottesdienstzeiten, Gruppenzuweisungen) erfordert `services.edit`.

## Groups steuern das Raum-Routing

Es gibt nirgendwo im System eine Raum- oder Klassenzimmer-Entität. Ein „Raum" ist eine Membership-**Gruppe** mit aktiviertem `trackAttendance`, verknüpft mit einer oder mehreren Gottesdienstzeiten über `groupServiceTimes`. Die Gruppenfelder (in `Api/src/modules/membership/models/Group.ts`), die das Kiosk-Verhalten prägen:

| Feld | Wirkung |
|------|--------|
| `trackAttendance` | Gruppe nimmt überhaupt an der Anwesenheitserfassung teil; der Setup-Baum von B1Admin markiert `trackAttendance`-Gruppen ohne `groupServiceTimes`-Zeile als nicht zugewiesen |
| `parentPickup` | Markiert einen Kinderraum: Das Einchecken dort macht den Besuch zu einem „Kind"-Besuch, was ein Familien-Abholetikett druckt und den Sicherheitscode auf das Namensschild setzt |
| `printNametag` | Ob Check-ins in diese Gruppe überhaupt ein Namensschild drucken |
| `capacity` / `guestCapacity` / `checkinClosed` | Raumkapazitätsgrenzen und ein harter „Geschlossen"-Schalter, serverseitig durch das Check-in-Gate durchgesetzt (bearbeitet in den Gruppeneinstellungen von B1Admin unter „Check-In-Kapazität") |
| `volunteerRatio` / `minVolunteers` | Kinder-pro-Betreuer-Verhältnis und Mindest-Betreueranzahl, durchgesetzt gemäß der gemeindeweiten Einstellung `ratioEnforcement` |
| `minAgeMonths` / `maxAgeMonths` / `minGrade` / `maxGrade` | Kiosk-seitig ausgewertete Alters-/Klassenstufen-Eignungsgrenzen, um Räume hervorzuheben oder abzudunkeln |

Jeder Client denormalisiert auf dieselbe Weise (z. B. `B1Checkin/app/services.tsx`, `B1App/src/app/[sdSlug]/mobile/components/screens/CheckinPage.tsx`): Lädt `GET /attendance/servicetimes?serviceId=`, `GET /attendance/groupservicetimes` und `GET /membership/groups` parallel, dann sammelt es für jede Gottesdienstzeit die Gruppen, deren `groupServiceTimes`-Zeile darauf zeigt, in `serviceTime.groups`. Dieses Array ist es, was der Raumwähler zeigt, organisiert nach Gruppen-`categoryName`.

Zuweisungen werden von der Seite der Gruppe in B1Admin bearbeitet (`B1Admin/src/groups/components/ServiceTimesEdit.tsx` — `POST`/`DELETE /attendance/groupservicetimes`), und der gesamte Baum Standort → Gottesdienst → Gottesdienstzeit → Gruppe wird in `B1Admin/src/attendance/components/AttendanceSetup.tsx` über `GET /attendance/attendancerecords/tree` visualisiert.

:::info
Da Gruppen die einzige Quelle der Wahrheit sind, treibt dieselbe Gruppenmitgliedschaft das Kiosk-Routing, die listenartige Anwesenheit in den Gruppenseiten von B1Admin und die Anwesenheitsberichterstattung an — eine Gruppe einer Gottesdienstzeit zuzuweisen ist der einzige Schritt, der nötig ist, um sie zu einem Check-in-Ziel zu machen.
:::

## Kindersicherheit

### Check-in-Typen

Jeder Besuch trägt einen `checkinType` — `member`, `guest` oder `volunteer` (NULL bedeutet Legacy/Mitglied; Migration `tools/migrations/attendance/2026-07-03_checkin_type.ts`). Der Typ wird **kiosk-seitig** gewählt: Mitglied-/Gast-/Betreuer-Chips auf der ausgeklappten Mitgliederzeile (`B1Checkin/src/components/MemberServiceTimes.tsx`), bei Abschluss auf jeden anstehenden Besuch gestempelt (`app/checkinComplete.tsx`, standardmäßig `member`). Der Server konsumiert ihn im Gate — Betreuer zählen zur Verhältnisabdeckung statt gegen die Kapazität, und Gäste zählen gegen `guestCapacity`.

### Kapazitäts- und Betreuungsschlüssel-Gates

`CheckinGateHelper.evaluate()` (`Api/src/modules/attendance/helpers/CheckinGateHelper.ts`) läuft innerhalb von `postCheckin` vor jedem Speichern (der Endpunkt ist nicht transaktional, daher ist Gating-vor-Speichern der Korrektheitsmechanismus). Er lädt die aktuelle Belegung pro anvisierter Gruppe (`VisitRepo.countActiveByGroupToday`) und die Gruppenkonfiguration über das Membership-Modul-Gateway und klassifiziert dann Verstöße:

- **Hart (immer blockieren):** `checkinClosed`, `current + incoming > capacity`, Gästezahl über `guestCapacity`. Der Batch wird mit `409 { error: "capacity", groups: [{ groupId, groupName, reason }] }` abgelehnt — der Kiosk zeigt den benannten Raum.
- **Verhältnis (warnen oder blockieren):** Eintreffende Nicht-Betreuer in einen Raum, in dem `volunteers < minVolunteers`, gar keine Betreuer, oder `children > volunteers × volunteerRatio`. Der Schweregrad folgt der Gemeinde-Einstellung `ratioEnforcement` (Standard `"warn"` / `"block"`, bearbeitet in B1Admin Gemeinde verwalten → Check-In, `CheckinSettingsEdit.tsx`). Der Warn-Modus liefert `409 { warning: true, error: "ratio", … }`, es sei denn, der Client reicht mit `acknowledgeWarnings=true` erneut ein — diese erneute Einreichung ist die Mitarbeiter-Bestätigungs-Übersteuerung des Kiosks.

### Alters-/Klassenstufen-Eignung (kiosk-seitig)

Raum-Eignung ist beratende UI, ausgewertet auf dem Kiosk, nicht vom Server durchgesetzt. `B1Checkin/src/helpers/EligibilityHelper.ts` vergleicht das Geburtsdatum/die Klassenstufe einer Person mit den `minAgeMonths`/`maxAgeMonths`/`minGrade`/`maxGrade` der Gruppe (Klassenstufen-Reihenfolge: PreK, K, 1–12, Absolviert) und liefert `eligible` / `ineligible` / `unknown` — fehlende Daten ergeben `unknown` und verbergen niemals einen Raum. Alter und Klassenstufen werden zum **Klassenstufen-Beförderungsdatum** der Gemeinde berechnet (Einstellung `gradePromotionDate`, `"MM-DD"`, bearbeitet in `B1Admin/src/settings/components/GradePromotionSettingsEdit.tsx`); der Kiosk ruft es von `GET /attendance/checkin/settings` ab, und `resolveAsOfDate` wählt das jüngste Vorkommen an oder vor heute. Der Raumwähler hebt geeignete Räume hervor und dunkelt ungeeignete ab; das Auswählen eines abgedunkelten Raums erfordert eine Mitarbeiterbestätigung.

### Vertrauenswürdige und nicht autorisierte Abholung

Abholpersonen sind eine Membership-Entität, pro Haushalt: `householdPickupPeople` (`Api/src/modules/membership/models/HouseholdPickupPerson.ts` — householdId, optionale personId, name, photoUrl, relationship, `status` `trusted` / `notAuthorized`, notes). CRUD ist `GET /membership/householdpickup/:householdId` (jeder authentifizierte Gemeinde-Nutzer, sodass Kiosks das lesen können) plus `POST` / `DELETE`, abgesichert durch `people.edit`. Mitarbeiter verwalten die Liste auf der Personenseite in der **Abholung**-Karte (`B1Admin/src/people/components/PickupPeople.tsx`) — Foto, Beziehung und ein Status-Chip Vertrauenswürdig/Nicht autorisiert.

Beim Check-out (`B1Checkin/app/checkout.tsx`) lädt der Kiosk die Abholliste des Haushalts: `trusted`-Einträge werden als tippbare Abhol-Karten neben dem Foto-Raster der Haushalts-Erwachsenen gerendert, und ein frei eingegebener „Andere"-Name wird unscharf abgeglichen (Levenshtein, `src/helpers/PickupMatchHelper.ts`) gegen `notAuthorized`-Einträge — eine Übereinstimmung blockiert den Check-out mit einem Warnblatt und einer Mitarbeiter-**Übersteuerung**-Schaltfläche. Die Übersteuerung wird auf dem Besuch selbst protokolliert: Sie sendet `checkedOutBy` als `"OVERRIDE: {name}"` über den normalen `POST /attendance/visits/checkout`, sodass sie im Anwesenheitsdatensatz und im `attendance.checkout`-Webhook landet, statt in einer separaten Audit-Tabelle.

### Elternbenachrichtigung und Notfall-Rundruf

`CheckinController` (`Api/src/modules/attendance/controllers/CheckinController.ts`, `/attendance/checkin`) stellt zwei SMS-Endpunkte bereit:

- `POST /page` — `{ visitId, message }`: benachrichtigt die Erziehungsberechtigten eines eingecheckten Kindes (Check-out-Screen des Kiosks, besetzter Modus).
- `POST /broadcast` — `{ serviceId, message }`: sendet eine SMS an die Erwachsenen jedes eingecheckten Haushalts für einen Gottesdienst (Kiosk-Admin-Einstellungen, hinter einem Bestätigungsblatt, das Tippen von `EMERGENCY` erfordert, in `B1Checkin/app/adminSettings.tsx`).

Beide lösen die Haushalts-Erwachsenen über das Membership-Gateway auf und übergeben die Zustellung dann an **`MessagingModuleGateway.sendBulkText`** (`Api/src/shared/modules/MessagingModuleGateway.ts`) — die modulübergreifende Tür zum konfigurierten SMS-Anbieter der Gemeinde (`@churchapps/texting`: TextInChurch, Clearstream oder MutualMinistry; es gibt keinen eingebauten SMS-Versender). Das Gateway protokolliert eine `sentText`-Zeile plus `deliveryLog`-Einträge pro Empfänger und deckelt einen Batch bei 500 Empfängern; ohne konfigurierten Anbieter liefert es `no_provider`, was der Kiosk als „Kein SMS-Anbieter konfiguriert" darstellt. `dispatch()` des Controllers dedupliziert Telefonnummern und überspringt Personen ohne Mobilnummer oder mit gesetztem `optedOut`, und liefert `{ sent, failed, skippedOptedOut, skippedNoPhone }`, sodass der Kiosk zeigen kann, was übersprungen wurde.

## Der Kiosk (B1Checkin)

Screens sind expo-router-Dateien unter `B1Checkin/app/`; screen-übergreifender Zustand lebt in einer statischen `CachedData`-Klasse (`src/helpers/CachedData.ts`), nicht in React-Zustand.

```
index (boot/auto-login) → selectChurch → services ──▶ lookup ──▶ household ──▶ checkinComplete
                                          │             │  ▲         │ │            │
             loads serviceTimes, groups,  │             │  └─────────┘ └▶ addGuest  └▶ print labels,
             groupServiceTimes,           │             └▶ checkout (manned)           auto-return
             labelTemplates               │                                            to lookup
```

1. **Suche** (`app/lookup.tsx`) — Suche nach Telefonnummer (`GET /membership/people/search/phone?number=`, letzte 4 Ziffern oder vollständig) oder nach Name (`GET /membership/people/search?term=`). Die Auswahl einer Übereinstimmung lädt den Haushalt (`GET /membership/people/household/{householdId}`) und bestehende Besuche (`GET /attendance/visits/checkin`), wobei `pendingVisits` mit den letztwöchigen Auswahlen vorbelegt wird.
2. **Haushaltsüberprüfung** (`app/household.tsx`, `src/components/MemberList.tsx`) — jede Mitgliederzeile zeigt ein Bereits-eingecheckt-Abzeichen, ein Allergie-/`nametagNotes`-Abzeichen und ihre aktuellen Raum-Chips. Das Ausklappen eines Mitglieds listet jede Gottesdienstzeit mit einer Raum-Schaltfläche plus den Mitglied-/Gast-/Betreuer-Check-in-Typ-Chips (`MemberServiceTimes.tsx`).
3. **Gruppenzuweisung** (`app/selectGroup.tsx`) — ein aus `serviceTime.groups` aufgebauter Kategoriebaum, mit alters-/klassenstufengeeigneten Räumen hervorgehoben und ungeeigneten abgedunkelt hinter einer Mitarbeiterbestätigung (siehe [Alters-/Klassenstufen-Eignung](#alters-klassenstufen-eignung-kiosk-seitig)); das Auswählen eines Raums schreibt eine `{ session: { serviceTimeId, groupId } }`-visitSession in den anstehenden Besuch dieser Person (`src/helpers/VisitSessionHelper.ts`). „Keine" löscht es.
4. **Abschluss** (`app/checkinComplete.tsx`) — `POST /attendance/visits/checkin` mit `pendingVisits` (jeder mit seinem `checkinType` gestempelt), druckt dann Etiketten, wenn ein Drucker konfiguriert ist, und kehrt automatisch zur Suche zurück. Eine `409`-Kapazitätsantwort zeigt den benannten vollen/geschlossenen Raum; eine Verhältnis-Warnung bietet eine Mitarbeiterbestätigung an, die mit `acknowledgeWarnings=true` erneut einreicht.

Der **Check-out**-Screen (`app/checkout.tsx`) akzeptiert den 4-stelligen Sicherheitscode über ein automatisch fokussiertes Eingabefeld — sodass USB-/Bluetooth-Tastatur-Wedge-Barcode-Scanner ohne Kamera funktionieren — oder eine Bildschirmtastatur mit demselben Alphabet, die bei 4 Zeichen automatisch absendet. Er sucht den Code, zeigt die abzuholenden Kinder und präsentiert die **vertrauenswürdigen Abholpersonen** des Haushalts als tippbare Karten neben einem Fotoraster der Haushalts-Erwachsenen (plus eine „Andere"-Freitext-Option, die unscharf gegen nicht autorisierte Namen geprüft wird — siehe [Vertrauenswürdige und nicht autorisierte Abholung](#vertrauenswurdige-und-nicht-autorisierte-abholung)), dann sendet er `POST /attendance/visits/checkout` mit dem Namen/der ID der auswählenden Person. Im besetzten Modus bietet der Screen auch **Eltern benachrichtigen** (`POST /attendance/checkin/page`) und einen **Sicherheitsetikett-Nachdruck** — `reprint()` baut die Etiketten der Familie mit `LabelHelper.getAllLabelsFor(...)` neu auf und führt sie durch dieselbe `PrintUI`-Pipeline wie beim Check-in.

Die Stationspersönlichkeit ist ein AsyncStorage-Flag `@StationMode` (`"self"` | `"manned"`, umgeschaltet in `app/adminSettings.tsx`). Der besetzte Modus fügt den Check-out-Einstiegspunkt auf dem Suchbildschirm und die Bearbeitung des Mitgliederprofils pro Person (`POST /membership/people`) vom Haushaltsbildschirm aus hinzu. Die Kiosk-Härtung ist eingebaut: eine optionale PIN (`app/setPin.tsx`, `src/components/PinEntryModal.tsx`) sichert die Admin- und Drucker-Bildschirme ab, der Admin-Bildschirm öffnet sich nur über 7 schnelle Tipps auf das Kopfzeilen-Logo, und ein Leerlauf-Werbebildschirm (`src/hooks/useInactivityTimer.ts`) übernimmt zwischen Familien.

## Selbst-Check-in (B1App)

Mitglieder checken sich vom b1.church-Portal aus am Screen `/mobile/checkin` ein (geroutet von `B1App/src/app/[sdSlug]/mobile/components/ScreenRouter.tsx` zu `screens/CheckinPage.tsx`). Es erfordert einen angemeldeten Nutzer und durchläuft dieselben vier Schritte wie der Kiosk — Gottesdienste → Haushalt → Gruppen → Abschluss — gegen dieselben Endpunkte, mit Zustand gehalten in `B1App/src/helpers/CheckinHelper.ts`. Die Unterschiede zum Kiosk: Der Haushalt kommt von der eigenen `householdId` des angemeldeten Nutzers (kein Suchschritt), und es gibt kein Etikettendrucken — stattdessen zeigt der Abschlussbildschirm den Sicherheitscode des Batches als QR-Code (`qrcode.react`) mit dem Hinweis „Dies an einer Check-in-Station zeigen". Ist der Haushalt beim Laden der Seite bereits eingecheckt, zeigt eine Schaltfläche „Check-in-Code anzeigen" den QR-Code erneut aus dem `securityCode` des bestehenden Besuchs. Der Check-in wird sofort zum Zeitpunkt der Einreichung erfasst (es gibt keinen anstehenden Zustand); der QR-Code steuert nur das Etikettendrucken am Kiosk.

**Etikettendruck vom Handy zum Kiosk** (`B1Checkin/app/scan.tsx`, erreicht über die Schaltfläche „Code scannen" auf dem Suchbildschirm): Der Kiosk öffnet eine `expo-camera`-`CameraView` (standardmäßig frontseitig, umschaltbar), die nach QR-Codes scannt. Eine gescannte Payload wird akzeptiert, wenn sie ein reiner 4-stelliger Code im Sicherheitscode-Alphabet ist, sodass sowohl der B1App-QR-Code als auch der QR-Block eines gedruckten Etiketts funktionieren. Der Screen folgt dann dem Check-out-Nachdruck-Pfad — `GET /attendance/visits/code/{code}` → `GET /membership/people/ids` → `LabelHelper.getAllLabelsFor(visits, people, code)` → `PrintUI` — und kehrt zur Suche zurück. Beim Scannen erfolgt kein Anwesenheits-Schreibvorgang; nur Etiketten. Codes ohne aktive Besuche, Stationen ohne Drucker und Gruppen ohne Etiketten zeigen jeweils einen Toast und kehren zur Suche zurück.

Typen und `ApiHelper`/`ArrayHelper` kommen aus `@churchapps/helpers` und `@churchapps/apphelper`; keine React-Komponenten werden mit B1Admin geteilt.

## Admin-seitige Anwesenheit (B1Admin)

- **Setup** — `/attendance` (`B1Admin/src/attendance/AttendancePage.tsx`) rendert den Strukturbaum und erstellt Gottesdienste (`ServiceEdit.tsx`) und Gottesdienstzeiten (`ServiceTimeEdit.tsx`). Standortdaten kommen über den Hook `useCampuses()` aus Membership.
- **Manuelle Anwesenheit** liegt auf der Groups-Seite, nicht im Anwesenheitsabschnitt: `B1Admin/src/groups/components/GroupSessionsTab.tsx` erstellt Sessions (`POST /attendance/sessions`) und markiert Personen als anwesend über `POST /attendance/visitsessions/log`, was den Besuch für diese Person und Session findet oder erstellt. Gruppenleiter können die Anwesenheit für ihre eigenen Gruppen erfassen, ohne die Berechtigung `attendance.edit` — die Controller prüfen `au.leaderGroupIds`.
- **Berichte** — Anwesenheitstrend und Gruppenanwesenheit sind serverdefinierte Berichte (`B1Admin/src/components/reporting/ReportWithFilter.tsx` gegen ReportingApi); die Historie pro Person ist `GET /attendance/attendancerecords?personId=` (`B1Admin/src/people/components/PersonAttendance.tsx`).

## Etikettendruck

### Vorlagen und der Designer

Gemeinden gestalten ihre eigenen Etiketten in B1Admin unter `/mobile/checkin/labels` (`B1Admin/src/attendance/LabelsPage.tsx` + `components/LabelEditor.tsx`, erreicht von der Check-In-Einstellungsseite). Eine Vorlage ist eine `labelTemplates`-Zeile, deren `content` ein JSON-Array von Blöcken ist — `text`, `field`, `barcode`, `qrcode` oder `box` — jeder in Prozentkoordinaten positioniert mit Schriftart, Ausrichtung, Symbologie (`code39`/`code128`/`qr`) und optionalen Sichtbarkeitsbedingungen (z. B. die Allergie-Box nur rendern, wenn `person.nametagNotes` nicht leer ist). Es gibt zwei `labelType`s: `nametag` (eines pro eingecheckter Person; Felder wie `person.displayName`, `sessions`, `securityCode`) und `pickup` (eines pro Familie; Felder wie `children`, `childrenAllergies`). Der Server erzwingt eine einzelne Standardvorlage pro Typ pro Gemeinde (`LabelTemplateController.save`). Der Designer liefert Starter-Vorlagen aus, die die gebündelten Etiketten des Kiosks widerspiegeln, und Vorschauen gegen Beispieldaten.

### Rendering und Drucken am Kiosk

Beim Abschluss des Check-ins entscheidet `B1Checkin/src/helpers/LabelHelper.ts` anhand der Gruppenflags jedes anstehenden Besuchs, was gedruckt wird: Namensschilder für `printNametag`-Gruppen, plus ein Familien-Abholetikett, wenn ein Besuch eine `parentPickup`-Gruppe getroffen hat. Der Sicherheitscode aus der Check-in-Antwort gelangt auf Kinder-Namensschilder und das Abholetikett; Erwachsenen-Namensschilder werden ohne Code gedruckt. Wenn die Gemeinde Vorlagen hat, verwandelt `LabelRenderer` (`src/helpers/LabelRenderer.ts`) Blöcke + einen Feldkontext in ein eigenständiges HTML-Dokument; andernfalls werden gebündelte HTML-Etiketten in `B1Checkin/assets/labels/` mit Platzhalterersetzung verwendet.

Barcodes werden als Inline-SVG von reinen TypeScript-Encodern in `B1Checkin/src/helpers/barcode.ts` erzeugt — Code-39-Mustertabellen und Code-128-(Codesatz B mit Mod-103-Prüfsumme)-Breitentabellen, plus QR über das `qrcode`-Paket. **Diese Encoder sind bewusst in B1Admin dupliziert** (`LabelEditor.tsx` bindet dieselben Tabellen inline ein, vermerkt in einem Codekommentar), sodass Designer-Vorschauen pixelgenau der Kiosk-Ausgabe entsprechen; eine Änderung an einem muss im anderen gespiegelt werden.

Die Druck-Pipeline (`src/components/PrintUI.tsx`) rendert jedes HTML-Etikett in einer `WebView`, erfasst es über `react-native-view-shot` als JPG und übergibt die Bild-URIs an das native **printer-helper**-Expo-Modul (`B1Checkin/modules/printer-helper/`). Das Modul stellt `scan()`, `checkInit()`, `printUris()` und Status-Events bereit, mit einem Anbieter pro Marke auf beiden Plattformen:

| Marke | Android | iOS | Anmerkungen |
|-------|---------|-----|-------|
| Brother | `BrotherProvider.kt` (Brother-Print-SDK) | `BrotherProvider.swift` (`BRLMPrinterKit.xcframework`) | QL-Serie Netzwerkdrucker (QL-800/810W/820NWB/1100/1110NWB…), gestanzte 29×90-Etiketten, die empfohlene Standardeinstellung |
| Zebra | `ZebraProvider.kt` (Link-OS-SDK) | `ZebraProvider.swift` + `ZebraBridge` | Netzwerkerkennung + TCP-/ZPL-Bilddruck |

Die Druckerauswahl liegt bei `app/printers.tsx` (Netzwerk-Scan liefert `brand~model~ip`-Einträge; die Auswahl bleibt im AsyncStorage erhalten), und `src/helpers/PrinterLog.ts` führt ein geräteinternes Diagnoseprotokoll, das über einen Live-Status-Punkt in der Kiosk-Kopfzeile sichtbar ist.

## Gastregistrierung

Zwei Wege erstellen eine Person mitten im Check-in:

- **Am Kiosk** — „Gast hinzufügen" im Haushaltsbildschirm öffnet `B1Checkin/app/addGuest.tsx`, was zunächst `GET /membership/people/search?term=` nach einer bestehenden Nicht-Mitglieds-Übereinstimmung durchsucht und andernfalls eine mit `POST /membership/people` erstellt, angehängt an den aktuellen Haushalt. Der Gast durchläuft dann die Gruppenzuweisung wie jedes Mitglied.
- **Selbstbedienung via QR** — wenn die Gemeindeeinstellung `enableQRGuestRegistration` aktiv ist (konfiguriert in den Check-In-Einstellungen von B1Admin, gelesen aus `GET /membership/settings/public/{churchId}`), zeigt der Kiosk-Suchbildschirm einen QR-Code, der zu `https://{subdomain}.b1.church/guest-register?serviceId=` verlinkt. Diese B1App-Seite (`src/app/[sdSlug]/(public)/guest-register/page.tsx`) lässt eine besuchende Familie sich selbst auf ihrem eigenen Handy über den anonymen Endpunkt `POST /membership/people/guest-register` registrieren, wodurch die Kiosk-Schlange in Bewegung bleibt.

## Verwandte Seiten

- [Attendance-Endpunkte](../api/endpoints/attendance) -- Vollständige REST-Oberfläche für Standorte, Gottesdienste, Sessions, Besuche und Besuchs-Sessions
- [Membership-Endpunkte](../api/endpoints/membership) -- Personen, Haushalte und Gruppen
- [Webhooks](../api/webhooks) -- Die Ereignisse `session.created`, `attendance.recorded` und `attendance.checkout`
- [Modulstruktur](../api/module-structure) -- Wie das Attendance-Modul serverseitig organisiert ist
