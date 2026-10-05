---
title: "Check-Ins"
---

# Check-Ins

<div class="article-intro">

Check-in ist ein System mit drei Eingangstüren: die B1Checkin-Kiosk-App für bemannten und Self-Service-Stationen, Self-Check-in im B1App-Mitgliederportal und Admin-seitige Anwesenheit in B1Admin. Alle drei schreiben zum gleichen Anwesenheitsmodul im Core Api, und das Classroom-Routing wird vollständig von Gruppen gesteuert -- es gibt keine separate Entität "Orte" oder "Räume". Ein Kindersicherheits-Layer sitzt oben: Check-in-Typen pro Besuch, Server-seitige Kapazitäts- und Freiwilligen-Verhältnis-Gates, Kiosk-seitige Alters-/Klassenstufen-Berechtigung, vertrauenswürdige Abholverifizierung beim Check-out und Parent-Paging über den SMS-Anbieter der Kirche. Diese Seite kartiert das Datenmodell, die Check-in-Arbeitsabläufe, den Sicherheitslayer und die Etikettendruck-Pipeline.

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
|---------|------|-------|-------|
| Kiosk | `B1Checkin` | Expo / React Native, expo-router file routing; EAS builds für Android, Amazon Fire und iOS; OTA-Updates via `expo-updates` | Bemanneter oder Self-Service-Station mit Etikettendruck und verifiziertem Check-out |
| Self check-in | `B1App` | Next.js (b1.church Mitgliederportal) | Angemeldete Mitglieder checken ihren Haushalt von einem Telefon ein; kein Druck |
| Admin | `B1Admin` | React SPA | Konfiguriert die Service-Struktur, weist Gruppen Service-Zeiten zu, entwirft Etiketten, erfasst manuell Anwesenheit, führt Berichte durch |

Alle drei rufen die gleichen zwei API-Module durch `ApiHelper` auf: **MembershipApi** (`/membership`) für Personen, Haushalte und Gruppen; **AttendanceApi** (`/attendance`) für alles darunter.

## Datenmodell (`Api/src/modules/attendance`)

| Entität / Tabelle | Schlüsselfelder | Bedeutung |
|----------------|-----------|---------|
| `campuses` | name, address | Veraltet hier -- Campusse werden im Mitgliedschafts-Modul (`/membership/campuses`) gemastert; die Anwesenheitskopie ist für Legacy-Leser eingefroren (`models/Campus.ts`) |
| `services` | campusId, name | Ein regelmäßiger Treffen, z.B. "Sonntagmorgen" (`models/Service.ts`) |
| `serviceTimes` | serviceId, name | Ein Zeitslot innerhalb eines Service, z.B. "9:00 Uhr" (`models/ServiceTime.ts`) |
| `groupServiceTimes` | groupId, serviceTimeId | Join-Tabelle: welche Gruppen (Klassenzimmer) treffen sich zu welcher Service-Zeit (`models/GroupServiceTime.ts`) |
| `sessions` | groupId, serviceTimeId, sessionDate | Eines Gruppentreffen an einem Datum -- faulhaft bei Check-in-Zeit erstellt (`models/Session.ts`) |
| `visits` | personId, serviceId, visitDate, checkinTime, securityCode, checkinType, checkedInById, checkoutTime, checkedOutBy, checkedOutById | Eine Person besucht an einem Datum (`models/Visit.ts`). `checkinType` ist `member` / `guest` / `volunteer` (NULL = legacy member), set by the kiosk and consumed by the capacity/ratio gates |
| `visitSessions` | visitId, sessionId | Welche Session(s) ein Besuch deckt -- ein Kind, das zwei Service-Zeiten eingecheckt wird, bekommt zwei Zeilen (`models/VisitSession.ts`) |
| `labelTemplates` | name, labelType (`nametag`/`pickup`), width, height, isDefault, content (JSON blocks) | Designbare Etiketten-Layouts (`models/LabelTemplate.ts`) |

### Wie ein abgeschlossener Check-in persistiert wird

`VisitController.postCheckin` (`Api/src/modules/attendance/controllers/VisitController.ts`) verarbeitet `POST /attendance/visits/checkin?serviceId=&peopleIds=`. Der Body ist ein Array von `Visit` Objekten, jedes mit `visitSessions`, deren eingebettete `session` nur ein `(serviceTimeId, groupId)` Paar nennt. Der Server dann:

1. **Gates Kapazität und Verhältnisse vor jedem Schreiben.** `evaluateGates()` → `CheckinGateHelper.evaluate()` prüft die Kapazität, Gast-Kapazität, geschlossenes Flag und Freiwilligen-Verhältnis jedes angestrebten Raums gegen aktuelle Besetzung. postCheckin ist **nicht transaktional**, daher muss das Gate vor dem ersten Speichern laufen -- eine harte Verletzung gibt eine 409 zurück, die die Fachgruppe(n) nennt, und nichts wird persistiert. Siehe [Kapazitäts- und Freiwilligen-Verhältnis-Gates](#kapazitäts--und-freiwilligen-verhältnis-gates).
2. **Sessions faulhaft auflösen.** `getSessionId()` findet oder erstellt die `sessions` Zeile für `(groupId, serviceTimeId, today)` -- Session-IDs sind im Prozess pro Datum zwischengespeichert. Neue Sessions senden einen `session.created` Webhook. Die Schleife ist ein erwarteter `for..of` -- ein früherer Fire-and-Forget `forEach(async …)` raste das Speichern und schrieb NULL sessionIds beim erstmaligen Erstellen einer Session (behoben; vermerkt in einem Kommentar im Code in der Schleife).
3. **Ersetzt die Tagesdatensätze.** Alle vorhandenen Besuche für diese Menschen an diesem Service heute werden zusammen mit ihren visitSessions gelöscht, dann wird der eingereichte Satz gespeichert. Erneutes Einchecken einer Familie ist daher eine idempotente "dies ist der aktuelle Zustand" Operation, keine Hinzufügung. Das Übergeben von `?checkDuplicates=true` gibt stattdessen `{ duplicates: [personId…] }` ohne Schreiben zurück, das ist, wie der Kiosk vor dem Überschreiben warnt.
4. **Generiert einen Sicherheitscode pro Batch.** `SecurityCodeHelper.generate()` erzeugt einen 4-stelligen Code aus dem Alphabet `23456789BCDFGHJKLMNPQRSTVWXYZ` (keine Vokale oder mehrdeutigen Zeichen, daher können Codes keine Wörter buchstabieren oder misslesen). Der Server versucht erneut auf Kollision gegen die gleiche Kirche gleich-tagige offene Besuche und stampft den Code auf jeden Besuch im Batch.
5. **Gibt `{ streaks, securityCode }` zurück.** `streaks` kartiert personId zu aufeinanderfolgender Wochenanwesenheit-Zählung; der Kiosk feiert Meilensteine (jede 5. Woche) mit Konfetti.

Jeder gespeicherte Besuch sendet auch einen `attendance.recorded` Webhook. Die Lesseite, `GET /attendance/visits/checkin`, gibt die Besuche der Personen von ihrem **letzten angemeldeten Datum** zurück -- wenn das eine frühere Woche war, werden die IDs entfernt, daher erhält der Client eine vorausgefüllte Kopie der Raumauswahl der letzten Woche, die als neue Datensätze speichert.

### Check-out

Zwei Endpunkte schließen die Schleife (`VisitController`):

- `GET /attendance/visits/code/:code` -- Besuche von heute, die noch nicht eingecheckt wurden und diesen Sicherheitscode tragen, mit gefüllten Sessions.
- `POST /attendance/visits/checkout` -- Body `{ visitIds, checkedOutBy?, checkedOutById? }`; stampelt `checkoutTime` und wer abholen, und sendet einen `attendance.checkout` Webhook pro Besuch.

Berechtigungen: Kiosks authentifizieren sich mit `attendance.checkin`, was genau die Check-in-/Check-out-/Label-Template-Oberfläche erteilt; `attendance.view`/`attendance.edit` decken Reporting und manuellen Eintrag; die Struktur (Services, Service-Zeiten, Gruppenzuordnungen) erfordert `services.edit`. Mitglied-Self-Check-in (B1App) benötigt keine Berechtigung überhaupt: Jeder authentifizierte Benutzer mit einer verknüpften Person in der Kirche kann `GET`/`POST /attendance/visits/checkin` aufrufen, und der Server beschränkt die eingereichten `personId`s auf den Haushalt des Anrufers (403 sonst -- dieser Zaun ist, was andere Familien-`securityCode`s unlesbar hält). Mitgliedschaft ist die Berechtigung; ob Mitglieder *die Funktion sehen* ist über die Navigations-Tabs der B1App der Kirche gesteuert. Die anderen Check-in-Endpunkte (`code/:code`, `checkout`, `guardians`, `CheckinController`) bleiben nur Kiosk/Personal.

## Gruppen fahren Raum-Routing

Es gibt keine Raum- oder Klassenzimmer-Entität irgendwo im System. Ein "Raum" ist eine Mitgliedschafts-**Gruppe** mit `trackAttendance` aktiviert, verknüpft mit einer oder mehreren Service-Zeiten durch `groupServiceTimes`. Die Gruppen-Felder (auf `Api/src/modules/membership/models/Group.ts`), die das Kiosk-Verhalten formen:

| Feld | Effekt |
|------|--------|
| `trackAttendance` | Gruppe nimmt an Anwesenheit überhaupt teil; B1Admin's Setup-Baum kennzeichnet `trackAttendance` Gruppen ohne `groupServiceTimes` Zeile als nicht zugewiesen |
| `parentPickup` | Kennzeichnet einen Kindraum: Einchecken dazu macht den Besuch einen "Kind"-Besuch, der ein Familien-Abholungsetikett druckt und den Sicherheitscode auf dem Namensschild setzt |
| `printNametag` | Ob Check-ins zu dieser Gruppe überhaupt ein Namensschild drucken |
| `capacity` / `guestCapacity` / `checkinClosed` | Raumkapazitätsgrenzen und ein hartes "geschlossen" Schalter, Server-seitig von der Check-in-Gate durchgesetzt (bearbeitet in B1Admin's Gruppeneinstellungen unter "Check-In-Kapazität") |
| `volunteerRatio` / `minVolunteers` | Kinder-pro-Freiwilliger-Verhältnis und Mindest-Freiwilligen-Kopfzahl, durchgesetzt per der Kirchenweiten `ratioEnforcement` Einstellung |
| `minAgeMonths` / `maxAgeMonths` / `minGrade` / `maxGrade` | Alters-/Klassenstufen-Berechtigung grenzt Kiosk-seitig ausgewertet ab |

Jeder Client denormalisiert gleich (z.B. `B1Checkin/app/services.tsx`, `B1App/src/app/[sdSlug]/mobile/components/screens/CheckinPage.tsx`): lade `GET /attendance/servicetimes?serviceId=`, `GET /attendance/groupservicetimes` und `GET /membership/groups` in Parallel, dann für jede Service-Zeit sammeln die Gruppen, deren `groupServiceTimes` Zeile auf sie verweisen, in `serviceTime.groups`. Dieses Array ist, was der Raum-Wähler anzeigt, nach Gruppen-`categoryName` organisiert.

Zuordnungen werden von der Gruppenseite in B1Admin bearbeitet (`B1Admin/src/groups/components/ServiceTimesEdit.tsx` -- `POST`/`DELETE /attendance/groupservicetimes`), und der komplette Campus → Service → Service-Zeit → Gruppen-Baum wird in `B1Admin/src/attendance/components/AttendanceSetup.tsx` durch `GET /attendance/attendancerecords/tree` visualisiert.

:::info
Weil Gruppen die einzige Wahrheitsquelle sind, die gleiche Gruppenmitgliedschaft stellt Kiosk-Routing, Roster-Stil-Anwesenheit in B1Admin's Gruppenseiten und Anwesenheits-Berichterstattung an -- die Zuweisung einer Gruppe zu einer Service-Zeit ist der einzige Schritt nötig, um sie zu einem Check-in-Ziel zu machen.
:::

## Kindersicherheit

### Check-in-Typen

Jeder Besuch trägt einen `checkinType` -- `member`, `guest` oder `volunteer` (NULL bedeutet legacy/member; Migration `tools/migrations/attendance/2026-07-03_checkin_type.ts`). Der Typ wird **Kiosk-seitig** gewählt: Member / Gast / Freiwilliger-Chips auf der erweiterten Mitgliederzeile (`B1Checkin/src/components/MemberServiceTimes.tsx`), auf jeden ausstehenden Besuch beim Abschluss gestempelt (`app/checkinComplete.tsx`, Standard zu `member`). Der Server nutzt es im Gate -- Freiwillige zählen zum Verhältnis-Abdeckung statt gegen Kapazität, und Gäste zählen gegen `guestCapacity`.

### Kapazitäts- und Freiwilligen-Verhältnis-Gates

`CheckinGateHelper.evaluate()` (`Api/src/modules/attendance/helpers/CheckinGateHelper.ts`) läuft innerhalb `postCheckin` vor jedem Speichern (der Endpunkt ist nicht transaktional, daher ist Gating-vor-Speichern der Richtigkeitsmechanismus). Es lädt aktuelle Besetzung pro angestrebter Gruppe (`VisitRepo.countActiveByGroupToday`) und die Gruppenkonfiguration durch die Mitgliedschaftsmodul-Gateway, dann klassifiziert Verletzungen:

- **Hart (immer blockieren):** `checkinClosed`, `current + incoming > capacity`, Gastanzahl über `guestCapacity`. Der Batch wird mit `409 { error: "capacity", groups: [{ groupId, groupName, reason }] }` abgelehnt -- der Kiosk zeigt den benannten Raum.
- **Verhältnis (warnen oder blockieren):** Eingehende Nicht-Freiwillige in einen Raum wo `volunteers < minVolunteers`, überhaupt keine Freiwilligen oder `children > volunteers × volunteerRatio`. Schweregrad folgt der pro-Kirchen Einstellung `ratioEnforcement` (`"warn"` Standard / `"block"`, bearbeitet in B1Admin Kirche Verwalten → Check-In, `CheckinSettingsEdit.tsx`). Warn-Modus gibt `409 { warning: true, error: "ratio", … }` zurück, es sei denn der Client reicht mit `acknowledgeWarnings=true` erneut ein -- das Erneut-Einreichen ist die Kiosk-Personal-Bestätigungs-Überschreibung.

### Alters-/Klassenstufen-Berechtigung (Kiosk-seitig)

Raum-Berechtigung ist beratende Benutzeroberfläche, auf dem Kiosk ausgewertet, nicht vom Server durchgesetzt. `B1Checkin/src/helpers/EligibilityHelper.ts` vergleicht die Geburt-/Klassenstufe einer Person gegen die Gruppen-`minAgeMonths`/`maxAgeMonths`/`minGrade`/`maxGrade` (Klassenstufen-Reihenfolge: PreK, K, 1–12, Graduated) und gibt `eligible` / `ineligible` / `unknown` zurück -- fehlende Daten geben `unknown` zurück und verstecken nie einen Raum. Alter und Klassenstufen werden der Kirchen-**Klassenstufen-Beförderungsdatum** berechnet (`gradePromotionDate` Einstellung, `"MM-DD"`, bearbeitet in `B1Admin/src/settings/components/GradePromotionSettingsEdit.tsx`); der Kiosk holt es von `GET /attendance/checkin/settings`, und `resolveAsOfDate` wählt das jüngste Vorkommen an oder vor heute. Der Raum-Wähler hebt berechtigte Räume hervor und dimmt unberechtigte; das Wählen eines gedimmten Raums erfordert eine Personalbestätigung.

### Vertrauen und nicht-autorisierte Abholung

Abholungs-Personen sind eine Mitgliedschafts-Entität, pro Haushalt: `householdPickupPeople` (`Api/src/modules/membership/models/HouseholdPickupPerson.ts` -- householdId, optionale personId, name, photoUrl, relationship, `status` `trusted` / `notAuthorized`, notes). CRUD ist `GET /membership/householdpickup/:householdId` (jeder authentifizierte Kirchen-Benutzer, daher Kiosks können es lesen) plus `POST` / `DELETE` gated by `people.edit`. Personal verwalten die Liste auf der Personen-Seite **Abholung** Karte (`B1Admin/src/people/components/PickupPeople.tsx`) -- Foto, Beziehung und ein Vertraut/Nicht Autorisiert Status-Chip.

Beim Check-out (`B1Checkin/app/checkout.tsx`) lädt der Kiosk die Abholungs-Liste des Haushalts: `trusted` Einträge werden als tippbare Abholungs-Karten neben dem Haushalt-Erwachsenen-Foto-Gitter und ein frei-getippter "Anderer"-Name wird fuzzy-abgeglichen (Levenshtein, `src/helpers/PickupMatchHelper.ts`) gegen `notAuthorized` Einträge -- eine Übereinstimmung blockiert Check-out mit einer Warn-Seite und einer Personalschaltfläche **Überschreiben**. Die Überschreibung wird auf dem Besuch protokolliert: sie postet `checkedOutBy` als `"OVERRIDE: {name}"` über den normalen `POST /attendance/visits/checkout`, daher landet es im Anwesenheits-Datensatz und dem `attendance.checkout` Webhook statt einer separaten Audit-Tabelle.

### Page-a-parent und Notfall-Broadcast

`CheckinController` (`Api/src/modules/attendance/controllers/CheckinController.ts`, `/attendance/checkin`) stellt zwei SMS-Endpunkte aus:

- `POST /page` -- `{ visitId, message }`: pages die Erziehungsberechtigten eines eingecheckten Kindes (Kiosk-Check-out-Bildschirm, bemannter Modus).
- `POST /broadcast` -- `{ serviceId, message }`: SMS jeder eingecheckten Haushalts-Erwachsener für einen Service (Kiosk-Admin-Einstellungen, hinter einer Typ-`EMERGENCY`-zu-bestätigende-Seite in `B1Checkin/app/adminSettings.tsx`).

Beide lösen Haushalt-Erwachsene durch das Mitgliedschafts-Gateway auf, dann Hand-Lieferung zu **`MessagingModuleGateway.sendBulkText`** (`Api/src/shared/modules/MessagingModuleGateway.ts`) -- die Cross-Modul-Tür in den konfigurierten SMS-Anbieter der Kirche (`@churchapps/texting`: TextInChurch, Clearstream oder MutualMinistry; es gibt keinen eingebauten SMS-Sender). Das Gateway protokolliert eine `sentText` Zeile plus Pro-Empfänger `deliveryLog` Einträge und deckelt einen Batch auf 500 Empfänger; ohne konfigurierten Anbieter gibt es `no_provider` zurück, das der Kiosk als "Kein SMS-Anbieter konfiguriert" anzeigt. Der `dispatch()` des Controllers dedupliziert Telefonnummern und überspringt Personen ohne Mobil oder `optedOut` gesetzt, gibt `{ sent, failed, skippedOptedOut, skippedNoPhone }` zurück, daher kann der Kiosk anzeigen, was übersprungen wurde.

## Der Kiosk (B1Checkin)

Bildschirme sind expo-router Dateien unter `B1Checkin/app/`; Cross-Screen-Zustand lebt in einer statischen `CachedData` Klasse (`src/helpers/CachedData.ts`), nicht React-Zustand.

```
index (boot/auto-login) → selectChurch → services ──▶ lookup ──▶ household ──▶ checkinComplete
                                          │             │  ▲         │ │            │
             loads serviceTimes, groups,  │             │  └─────────┘ └▶ addGuest  └▶ print labels,
             groupServiceTimes,           │             └▶ checkout (manned)           auto-return
             labelTemplates               │                                            to lookup
```

1. **Lookup** (`app/lookup.tsx`) -- Suche nach Telefon (`GET /membership/people/search/phone?number=`, letzte-4 oder voll) oder Name (`GET /membership/people/search?term=`). Die Auswahl einer Übereinstimmung lädt den Haushalt (`GET /membership/people/household/{householdId}`) und vorhandene Besuche (`GET /attendance/visits/checkin`), besamt `pendingVisits` mit letzter-Woche-Auswahl.
2. **Haushalt-Überprüfung** (`app/household.tsx`, `src/components/MemberList.tsx`) -- jede Mitglieder-Zeile zeigt ein bereits-eingechecktes Badge, Allergie-/`nametagNotes` Badge und ihre aktuellen Raum-Chips. Die Erweiterung eines Mitglieds listet jede Service-Zeit mit einer Raum-Schaltfläche plus Member / Gast / Freiwilliger Check-in-Typ-Chips (`MemberServiceTimes.tsx`). Unter jedem Service-Zeit-Namen, `ServiceTimeHelper.getGroupSummary()` zeigt die dort angebotenen Gruppen (die `serviceTime.groups` Namen, gekürzt, dedupliziert case-insensitiv, Komma-verbunden); nichts wird gerendert, wenn die Zeit keine Gruppen hat.
3. **Gruppen-Zuweisung** (`app/selectGroup.tsx`) -- ein Kategoriebaum aus `serviceTime.groups`, mit alters-/klassenstufen-berechtigten Räumen hervorgehoben und unberechtigten hinter einer Personalbestätigung gedimmt (siehe [Alters-/Klassenstufen-Berechtigung](#agesgrade-eligibility-kiosk-side)); die Auswahl eines Raums schreibt einen `{ session: { serviceTimeId, groupId } }` visitSession in den ausstehenden Besuch dieser Person (`src/helpers/VisitSessionHelper.ts`). "Keine" löscht es.
4. **Abschluss** (`app/checkinComplete.tsx`) -- `POST /attendance/visits/checkin` mit `pendingVisits` (jede gestempelt mit ihrer `checkinType`), dann drucken Etiketten, falls ein Drucker konfiguriert ist und Auto-Return zu Lookup. Eine `409` Kapazität-Antwort zeigt den benannten vollen/geschlossenen Raum; eine Verhältnis-Warnung bietet eine Personalbestätigung, die mit `acknowledgeWarnings=true` erneut einreicht.

Der **Check-out** Bildschirm (`app/checkout.tsx`) akzeptiert den 4-stelligen Sicherheitscode durch eine Auto-fokussierte Eingabe -- daher funktionieren USB/Bluetooth-Tastaturkeil-Barcode-Scanner ohne Kamera -- oder ein On-Screen-Keypad mit dem gleichen Alphabet, Auto-Submit bei 4 Zeichen. Eine **Scan** Schaltfläche öffnet ein Sheet mit der gemeinsamen `src/components/CodeScanner.tsx` Kamera (rückwärts-gerichtet per Standard, akzeptiert QR, Code 128 und Code 39), daher Stationen ohne einen Keil-Scanner können das Abholungs-Etikett lesen; ein gescannter Code speist den gleichen `handleCode()` Pfad wie eingetippte Eingabe. Es schaut den Code auf, zeigt die Kinder, die abgeholt werden, und präsentiert die **vertrauten Abholungs-Personen** des Haushalts als tippbare Karten neben einem Foto-Gitter von Haushalts-Erwachsenen (plus eine "Anderer" frei-Text Option, die fuzzy-überprüft gegen nicht-autorisierte Namen -- siehe [Vertrauen und nicht-autorisierte Abholung](#trusted-and-not-authorized-pickup)), dann postet `POST /attendance/visits/checkout` mit dem Wählers Namen/id. Im bemannten Modus bietet der Bildschirm auch **Page a parent** (`POST /attendance/checkin/page`) und einen **Sicherheits-Etikett-Nachdruck** -- `reprint()` baut die Etiketten der Familie mit `LabelHelper.getAllLabelsFor(...)` wieder auf und speist sie durch die gleiche `PrintUI` Pipeline wie Check-in.

Stationen-Persönlichkeit ist eine AsyncStorage Flag `@StationMode` (`"self"` | `"manned"`, umgeschaltet in `app/adminSettings.tsx`). Der bemannter Modus fügt den Check-out Einstiegspunkt auf dem Lookup-Bildschirm und Pro-Mitglied Profil-Bearbeitung hinzu (`POST /membership/people`) aus dem Haushalt-Bildschirm. Kiosk-Härtung ist eingebaut: eine optionale PIN (`app/setPin.tsx`, `src/components/PinEntryModal.tsx`) gates das Admin- und Drucker-Bildschirme, der Admin-Bildschirm öffnet nur via 7 schnelle Taps auf das Kopfzeilenlogo und einen Idle-Anzieh-Bildschirm (`src/hooks/useInactivityTimer.ts`) übernimmt zwischen Familien.

## Self-Check-in (B1App)

Mitglieder checken von der b1.church Portal am `/mobile/checkin` Bildschirm ein (geroutet von `B1App/src/app/[sdSlug]/mobile/components/ScreenRouter.tsx` zu `screens/CheckinPage.tsx`). Es erfordert einen angemeldeten Benutzer und geht die gleichen vier Schritte wie der Kiosk -- Services → Haushalt → Gruppen → Abschluss -- gegen die identischen Endpunkte, mit Zustand in `B1App/src/helpers/CheckinHelper.ts`. Die Unterschiede vom Kiosk: Der Haushalt kommt vom angemeldeten Benutzer's eigener `householdId` (kein Such-Schritt) und es gibt keinen Etikett-Druck -- stattdessen der Abschluss-Bildschirm zeigt den Batch's Sicherheitscode als QR (`qrcode.react`) mit ein "zeige dies an einer Check-in Station" Hinweis. Falls der Haushalt bereits eingecheckt ist, wenn die Seite lädt, ein "Zeige Check-in Code" Schaltfläche zeigt erneut das QR vom ersten vorhandenen Besuch (von `GET /attendance/visits/checkin`), der einen `securityCode` trägt. Der Check-in wird sofort zum Submit-Zeit erfasst (es gibt keinen ausstehenden Zustand); das QR fährt nur Etikett-Druck am Kiosk.

**Telefon-zu-Kiosk Etikett-Druck** (`B1Checkin/app/scan.tsx`, erreicht vom QR "Scan code" Schaltfläche auf dem Lookup-Bildschirm): der Kiosk zeigt `CodeScanner` (eine `expo-camera` `CameraView`, vorne-gerichtet per Standard, umschaltbar) Scanning für QR Codes. `ScanCodeHelper.parse()` akzeptiert eine Nutzlast nur, wenn es ein bloßes 4-Zeichen Code im Sicherheitscode-Alphabet ist, und `ScanCodeHelper.isRepeat()` ignoriert den gleichen Code für 4 Sekunden, daher sowohl das B1App QR als auch ein gedrucktes Etikett's QR funktionieren. Der Bildschirm folgt dann dem Check-out Nachdruck-Pfad -- `GET /attendance/visits/code/{code}` → `GET /membership/people/ids` → `LabelHelper.getAllLabelsFor(visits, people, code)` → `PrintUI` -- und kehrt zu Lookup zurück. Kein Anwesenheit-Schreiben passiert zum Scan-Zeit; nur Etiketten. Codes ohne aktive Besuche, Stationen ohne Drucker und Etikett-lose Gruppen zeigen jeweils ein Toast und kehren zu Lookup zurück.

Types und `ApiHelper`/`ArrayHelper` kommt von `@churchapps/helpers` und `@churchapps/apphelper`; keine React-Komponenten werden mit B1Admin geteilt.

## Admin-Seite Anwesenheit (B1Admin)

- **Setup** -- `/attendance` (`B1Admin/src/attendance/AttendancePage.tsx`) rendert den Struktur-Baum und erstellt Services (`ServiceEdit.tsx`) und Service-Zeiten (`ServiceTimeEdit.tsx`). Campus-Daten kommen von Mitgliedschaft via dem `useCampuses()` Hook.
- **Manuell Anwesenheit** lebt auf der Gruppen-Seite, nicht der Anwesenheits-Sektion: `B1Admin/src/groups/components/GroupSessionsTab.tsx` erstellt Sessions (`POST /attendance/sessions`; wenn hinzufügend, `SessionEdit.tsx` kann eine Sitzung pro anderer Gruppe, die die gewählte Service-Zeit teilt, einschließlich, Gruppen überspringend, die bereits eine Sitzung an jenem Datum haben) und markiert Personen anwesend via `POST /attendance/visitsessions/log`, die findet-oder-erstellt den Besuch für diese Person und Sitzung. Gruppenmitglieder können Anwesenheit für ihre eigenen Gruppen erfassen ohne die `attendance.edit` Berechtigung -- die Controller überprüfen `au.leaderGroupIds`.
- **Berichterstattung** -- Anwesenheits-Trend und Gruppanwesenheit sind Server-definierte Berichte (`B1Admin/src/components/reporting/ReportWithFilter.tsx` gegen ReportingApi; Definitionen in `Api/reports/*.json`). Beide nehmen `startDate`/`endDate` (Enddatum einschließlich); der Trend-Bericht Standard zu einem Jahr die und heute und fügt eine Pro-Woche `sessionDates` Spalte hinzu und Gruppanwesenheit's On-Screen-Baum enthält jede Besuch's `checkinTime` und die Person's `membershipStatus`. Gruppanwesenheit's CSV kommt vom Gefährten `groupAttendanceDownload` Bericht, Pivot von `GroupAttendanceDownloadHelper` in eine Zeile pro Gruppenmitglied mit einer anwesend/abwesend Spalte pro datierten Sitzung; Pro-Person-Geschichte ist `GET /attendance/attendancerecords?personId=` (`B1Admin/src/people/components/PersonAttendance.tsx`).

## Etikett-Druck

### Vorlagen und der Designer

Kirchen entwerfen ihre eigenen Etiketten in B1Admin bei `/mobile/checkin/labels` (`B1Admin/src/attendance/LabelsPage.tsx` + `components/LabelEditor.tsx`, erreicht von der Check-In-Einstellungsseite). Eine Vorlage ist ein `labelTemplates` Zeile, deren `content` ein JSON-Array von Blöcken ist -- `text`, `field`, `barcode`, `qrcode` oder `box` -- jede in Prozent-Koordinaten mit Schrift, Ausrichtung, Symbologie (`code39`/`code128`/`qr`) und optionalen Sichtbedinungen (z.B. nur das Allergie-Box rendern, wenn `person.nametagNotes` nicht leer ist). Zwei `labelType`s existieren: `nametag` (eine pro eingecheckter Person; Felder wie `person.displayName`, `sessions`, `securityCode` und `person.isBirthdayWeek` -- `"true"`, wenn Geburtstag Monat/Tag innerhalb 3 Tage von heute ist, wrapping quer Jahr-Ende, berechnet von `LabelHelper.isBirthdayWithin()`) und `pickup` (eine pro Familie; Felder wie `children`, `childrenAllergies`). Der Server erzwingt einen einzigen Standard pro Typ pro Kirche (`LabelTemplateController.save`). Der Designer liefert Starter-Vorlagen, die den Kiosk's Bündel-Etiketten spiegeln und gegen Beispiel-Daten vorschauen.

### Rendern und Druck am Kiosk

Beim Check-in-Abschluss, `B1Checkin/src/helpers/LabelHelper.ts` entscheidet, was von den Gruppen-Flags auf jeden ausstehenden Besuch druckt: Namensschilde für `printNametag` Gruppen, plus eine Familie Abholungs-Etikett, wenn eine Besuch einen `parentPickup` Gruppe treffen. Besuche mit `checkinType` `volunteer` werden von `LabelHelper.selectChildVisits()` übersprungen, daher ein Kinderbetreuungs-Arbeiter in einem Parent Pickup Raum löst nie ein Abholungs-Etikett aus. Falls die Kirche Vorlagen hat, `LabelRenderer` (`src/helpers/LabelRenderer.ts`) dreht Blöcke + eine Feldkontextes in ein eigenständiges HTML-Dokument; sonst bündelte HTML-Etiketten in `B1Checkin/assets/labels/` werden mit Platzhalter-Substitution verwendet.

Barcode werden als eingebettete SVG durch reine-TypeScript-Encoder in `B1Checkin/src/helpers/barcode.ts` erzeugt -- Code 39 Muster-Tabellen und Code 128 (Code set B mit mod-103 Prüfsumme) Breite-Tabellen plus QR via das `qrcode` Paket. **Diese Encoder werden absichtlich in B1Admin dupliziert** (`LabelEditor.tsx` eingebettet die gleichen Tabellen, vermerkt in einem Code-Kommentar) daher Designer-Vorschauen sind Pixel-treu zum Kiosk-Output; ein Wechsel zu einem muss im anderen gespiegelt werden.

Der Druck-Pipeline (`src/components/PrintUI.tsx`) rendert jedes HTML-Etikett in einem `WebView`, erfasst es zu JPG via `react-native-view-shot` und Hand die Bild-URIs zur nativen **Drucker-Helfer** Expo-Modul (`B1Checkin/modules/printer-helper/`). Das Modul stellt `scan()`, `checkInit()`, `printUris()` und Status-Events aus, mit ein Provider pro Marke auf beide Plattformen:

| Marke | Android | iOS | Notizen |
|-------|---------|-----|-------|
| Brother | `BrotherProvider.kt` (Brother Print SDK) | `BrotherProvider.swift` (`BRLMPrinterKit.xcframework`) | QL-Serie Netzwerk-Drucker (QL-800/810W/820NWB/1100/1110NWB…), Die-Schnitt 29×90 Etiketten, der empfohlene Standard |
| Zebra | `ZebraProvider.kt` (Link-OS SDK) | `ZebraProvider.swift` + `ZebraBridge` | Netzwerk-Erkennung + TCP/ZPL Bild-Druck |

Drucker-Auswahl lebt auf `app/printers.tsx` (Netzwerk-Scan gibt `brand~model~ip` Einträge zurück; die Wahl persistiert zu AsyncStorage), und `src/helpers/PrinterLog.ts` hält ein On-Device-Diagnose-Log angezeigt durch einen Live-Status-Punkt im Kiosk-Header.

## Gast-Registrierung

Zwei Pfade erstellen eine Person Mid-Check-in:

- **Am Kiosk** -- Der Haushalt-Bildschirm's "Add guest" öffnet `B1Checkin/app/addGuest.tsx`, das zuerst sucht `GET /membership/people/search?term=` für einen vorhandenen Nicht-Mitglied-Treffer und sonst erstellt einen mit `POST /membership/people`, angefügt zum aktuellen Haushalt. Der Gast fließt dann Gruppen-Zuweisung wie jeder Mitglied.
- **Self-Serve via QR** -- Wenn die Kirchen-Einstellung `enableQRGuestRegistration` an ist (konfiguriert in B1Admin's Check-In-Einstellungen, gelesen von `GET /membership/settings/public/{churchId}`), der Kiosk-Lookup-Bildschirm zeigt einen QR-Code verlinkt zu `https://{subdomain}.b1.church/guest-register?serviceId=`. Das B1App-Seite (`src/app/[sdSlug]/(public)/guest-register/page.tsx`) läßt eine besuchende Familie sich auf ihrem eigenen Telefon durch den anonym `POST /membership/people/guest-register` Endpunkt selbst registrieren, haltend die Kiosk-Linie bewegend. Das QR-Blatt hat auch ein **Register here** Schaltfläche, die die gleiche Seite am Kiosk öffnet (`app/guestRegister.tsx`) in einem Inkognito, Cache-Deaktiviert `WebView`; `src/helpers/GuestRegisterHelper.ts` baut die URL für beide QR und WebView und blockiert Navigation weg `https://{subdomain}.b1.church/guest-register`. Der Bildschirm knallt zurück zu Lookup auf **Done**, zurück oder 120 Sekunden Inaktivität (Form-Typing wird von WebView als Aktivität relayed), entfernt WebView, daher eine Familie's Einträge erreichen nie nächste Familie.

## Verwandte Seiten

- [Anwesenheits-Endpunkte](../api/endpoints/attendance) -- Vollständige REST-Oberfläche für Campusse, Services, Sessions, Besuche und Visit-Sessions
- [Mitgliedschafts-Endpunkte](../api/endpoints/membership) -- Personen, Haushalte und Gruppen
- [Webhooks](../api/webhooks) -- Die `session.created`, `attendance.recorded` und `attendance.checkout` Events
- [Modulstruktur](../api/module-structure) -- Wie das Anwesenheits-Modul Server-Seite organisiert ist
