---
title: "Check-Ins"
---

# Check-Ins

<div class="article-intro">

Check-In ist ein System mit drei Vordertüren: die B1Checkin Kiosk-App für bestückte und Self-Serve-Stationen, Self Check-In innerhalb des B1App-Mitglieder-Portals und Admin-seitige Anwesenheit in B1Admin. Alle drei schreiben in das gleiche Anwesenheits-Modul in der Core-Api, und Klassenzimmer-Routing wird vollständig von Gruppen angetrieben — es gibt keine separate "Orte" oder "Zimmer" Entität. Eine Kindersicherheits-Schicht sitzt oben auf: Pro-Besuchs-Check-In-Typen, Server-seitige Kapazitäts- und Freiwilligen-Verhältnis-Gates, Kiosk-seitige Alter-/Klassenstufen-Berechtigung, vertrauenswürdige Abholer-Überprüfung bei Abmeldung und Eltern-Paging über den SMS-Anbieter der Kirche. Diese Seite ordnet das Datenmodell, die Check-In-Flüsse, die Sicherheits-Schicht und die Label-Druck-Pipeline.

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

Label-Druck-Pfad (nur Kiosk):
POST /attendance/visits/checkin ──▶ { securityCode, streaks }
  └▶ LabelHelper (label templates, or bundled HTML fallback)
       └▶ LabelRenderer → HTML doc + inline SVG barcodes
            └▶ PrintUI: WebView render → ViewShot JPG capture
                 └▶ printer-helper native module → Brother QL / Zebra
```

| Oberfläche | Reposit | Stapel | Rolle |
|---------|------|-------|-------|
| Kiosk | `B1Checkin` | Expo / React Native, expo-router Datei-Routing; EAS baut für Android, Amazon Fire und iOS; OTA Updates über `expo-updates` | Bestückte oder Self-Serve-Station mit Label-Druck und verifytem Check-Out |
| Self Check-In | `B1App` | Next.js (b1.church-Mitglieder-Portal) | Angemeldete Mitglieder checken ihren Haushalt von einem Telefon ein; kein Druck |
| Admin | `B1Admin` | React SPA | Konfiguriert die Service-Struktur, weist Gruppen zu Service-Zeiten zu, gestaltet Labels, notiert manuelle Anwesenheit, führt Berichte aus |

Alle drei rufen die gleichen zwei API-Module über `ApiHelper` auf: **MembershipApi** (`/membership`) für Personen, Haushalte und Gruppen; **AttendanceApi** (`/attendance`) für alles unten.

## Datenmodell (`Api/src/modules/attendance`)

| Entität / Tabelle | Schlüsselfelder | Bedeutung |
|----------------|-----------|---------|
| `campuses` | name, address | Veraltet hier — Campus werden im Mitgliedschafts-Modul (`/membership/campuses`) registriert; die Anwesenheits-Kopie ist schreibgeschützt für Legacy-Leser (`models/Campus.ts`) |
| `services` | campusId, name | Ein regelmäßiger Treffpunkt, z. B. "Sonntags-Morgen" (`models/Service.ts`) |
| `serviceTimes` | serviceId, name | Ein Zeitpunkt innerhalb eines Services, z. B. "9:00 Uhr" (`models/ServiceTime.ts`) |
| `groupServiceTimes` | groupId, serviceTimeId | Verknüpfungstabelle: welche Gruppen (Klassenzimmer) treffen sich zu welchen Service-Zeiten (`models/GroupServiceTime.ts`) |
| `sessions` | groupId, serviceTimeId, sessionDate | Eines Treffens eine Gruppe an einem Datum — erstellt träge bei Check-In-Zeit (`models/Session.ts`) |
| `visits` | personId, serviceId, visitDate, checkinTime, securityCode, checkinType, checkedInById, checkoutTime, checkedOutBy, checkedOutById | Ein Besuch einer Person an einem Datum (`models/Visit.ts`). `checkinType` ist `member` / `guest` / `volunteer` (NULL = Legacy-Mitglied), gesetzt durch den Kiosk und konsumiert durch die Kapazitäts-/Verhältnis-Gates |
| `visitSessions` | visitId, sessionId | Welche Sitzung(en) ein Besuch abdeckt — ein Kind, das sich für zwei Service-Zeiten einloggt, bekommt zwei Reihen (`models/VisitSession.ts`) |
| `labelTemplates` | name, labelType (`nametag`/`pickup`), width, height, isDefault, content (JSON blocks) | Gestaltbare Label-Layouts (`models/LabelTemplate.ts`) |

### Wie ein abgeschlossenes Check-In gepuffert wird

`VisitController.postCheckin` (`Api/src/modules/attendance/controllers/VisitController.ts`) verarbeitet `POST /attendance/visits/checkin?serviceId=&peopleIds=`. Der Körper ist eine Anordnung von `Visit`-Objekten, jede tragend `visitSessions` deren eingebettete `session` nur ein `(serviceTimeId, groupId)`-Paar nennt. Der Server dann:

1. **Gates-Kapazität und -Verhältnisse vor jeglichem Schreiben.** `evaluateGates()` → `CheckinGateHelper.evaluate()` überprüft jeden gezielten Raums Kapazität, Gast-Kapazität, geschlossenes Flagge und Freiwilligen-Verhältnis gegen aktuelle Auslastung. postCheckin ist **nicht transaktional**, daher muss das Gate vor der ersten Speicherung ausgeführt werden — ein harter Verstoß gibt 409 zurück, das beleidigende Zimmer nennend und nichts ist persistent. Siehe [Kapazitäts- und Freiwilligen-Verhältnis-Gates](#kapazitäts--und-freiwilligen-verhältnis-gates).
2. **Löst Sitzungen träge auf.** `getSessionId()` findet oder erstellt die `sessions` Reihe für `(groupId, serviceTimeId, heute)` — Session-IDs sind in-Prozess pro Datum gepuffert. Neue Sitzungen senden ein `session.created` Webhook. Die Schleife ist ein erwartet `for..of` — ein früherer Fire-and-Forget `forEach(async …)` raste die Speicherung und schrieb NULL sessionIds bei der First-Session-Erstellung (behoben; notiert in einem Code-Kommentar bei der Schleife).
3. **Ersetzt die Tages-Datensätze.** Jegliche bestehenden Besuche für diese Personen bei diesem Service heute werden gelöscht, zusammen mit ihren visitSessions, dann wird die eingereichte Menge gespeichert. Ein Familien-Neueinchecken ist daher eine idempotent "das ist der aktuell Zustand" Operation, nicht ein Anhängsel. Die Übergabe `?checkDuplicates=true` gibt stattdessen `{ duplicates: [personId…] }` zurück ohne zu schreiben, was, wie der Kiosk vorher warnt, bevor es überschreibt.
4. **Generiert einen Sicherheitscode pro Batch.** `SecurityCodeHelper.generate()` erzeugt einen 4-stelligen Code aus dem Alphabet `23456789BCDFGHJKLMNPQRSTVWXYZ` (keine Vokale oder mehrdeutigen Zeichen, daher können Codes keine Wörter buchstabieren oder falsch lesen). Der Server versucht erneut bei Zusammenstoß gegen die gleiche Kirche's gleich-Tag offene Besuche und stempel den Code auf jeden Besuch im Batch.
5. **Gibt `{ streaks, securityCode }` zurück.** `streaks` ordnet personId zu aufeinanderfolgend-Wochen Anwesenheitszählung; der Kiosk feiert Meilensteine (alle 5. Wochen) mit Konfetti.

Jeder gespeicherte Besuch sendet auch ein `attendance.recorded` Webhook. Die Lesseite, `GET /attendance/visits/checkin`, gibt die Besuche der Menschen von ihrem **letztem protokollierten Datum** zurück — wenn das eine vorherige Woche war, werden die IDs gestreift, daher erhält der Client eine vorgefüllte Kopie der letzten Wochen-Raumwahlen, die als neue Datensätze speichern.

### Abmeldung

Zwei Endpunkte vervollständigen die Schleife (`VisitController`):

- `GET /attendance/visits/code/:code` — Besuche von heute nicht-noch-abgemeldet, die diesen Sicherheitscode tragen, mit Sitzungen bevölkert.
- `POST /attendance/visits/checkout` — Body `{ visitIds, checkedOutBy?, checkedOutById? }`; Zeitstempel `checkoutTime` und wer abholt, und sendet ein `attendance.checkout` Webhook pro Besuch.

Berechtigungen: Kiosks authentifizieren mit `attendance.checkin`, das genau die Check-In/Check-Out/Label-Template-Oberfläche gewährt; `attendance.view`/`attendance.edit` decken Reporting und manuellen Eintrag; die Struktur (Dienstleistungen, Dienstzeiten, Gruppen-Zuordnungen) erfordert `services.edit`. Mitglied-Self-Check-In (B1App) benötigt überhaupt keine Berechtigung: jeder authentifizierte Benutzer mit einer verbundenen Person in der Kirche darf `GET`/`POST /attendance/visits/checkin` aufrufen, und der Server beschränkt die eingereichten `personId`s auf den Haushalt des Aufrufers (403 ansonsten — dieser Zaun ist, was andere Familien' `securityCode`s uneinsehbar hält). Mitgliedschaft ist der Zuschuss; ob Mitglieder *sehen* die Funktion ist durch die B1App-Navigations-Reiter der Kirche gesteuert. Die anderen Check-In-Endpunkte (`code/:code`, `checkout`, `guardians`, `CheckinController`) bleiben Kiosk/Personal-nur.

## Gruppen fahren Raumrouting

Es gibt keine Raum- oder Klassenzimmer-Entität irgendwo im System. Ein "Raum" ist eine Mitgliedschafts-**Gruppe** mit `trackAttendance` aktiviert, verbunden zu einer oder mehreren Service-Zeiten über `groupServiceTimes`. Die Gruppen-Felder (auf `Api/src/modules/membership/models/Group.ts`) die Kiosk-Verhalten formen:

| Feld | Wirkung |
|------|--------|
| `trackAttendance` | Gruppe nimmt an Anwesenheit überhaupt teil; B1Admin's Setup-Baum kennzeichnet `trackAttendance` Gruppen mit keiner `groupServiceTimes` Reihe als nicht zugewiesen |
| `parentPickup` | Kennzeichnet einen Kinder-Raum: Einchecken dazu macht den Besuch ein "Kind"-Besuch, der eine Familie-Abholerlabel druckt und den Sicherheitscode auf dem Namenss-Tag setzt |
| `printNametag` | Ob Check-Ins zu dieser Gruppe über ein Namenss-Tag drucken |
| `capacity` / `guestCapacity` / `checkinClosed` | Raumkapazitätsgrenzen und ein harter "Schließen"-Schalter, Server-seitig von das Check-In-Gate erzwungen (bearbeitet in B1Admin's Gruppen-Einstellungen unter "Check-In-Kapazität") |
| `volunteerRatio` / `minVolunteers` | Kinder-pro-Freiwilligen-Verhältnis und minimale Freiwilligen-Kopfzahl, pro die Kirchen-weit `ratioEnforcement` Einstellung erzwungen |
| `minAgeMonths` / `maxAgeMonths` / `minGrade` / `maxGrade` | Alter-/Klassenstufen-Berechtigung Grenzen Kiosk-seitig ausgewertet um Zimmer hervorzuheben oder zu blassen |

Jeden Client denormalisiert der gleiche Weg (z. B. `B1Checkin/app/services.tsx`, `B1App/src/app/[sdSlug]/mobile/components/screens/CheckinPage.tsx`): Laden Sie `GET /attendance/servicetimes?serviceId=`, `GET /attendance/groupservicetimes` und `GET /membership/groups` parallel, dann für jede Service-Zeit sammel Sie die Gruppen deren `groupServiceTimes` Reihe zeigt darauf hinein `serviceTime.groups`. Dieses Anordnung ist das, was der Raum-Picker zeigt, organisiert nach Gruppen `categoryName`.

Zuordnungen sind bearbeitet von der Gruppen-Seite in B1Admin (`B1Admin/src/groups/components/ServiceTimesEdit.tsx` — `POST`/`DELETE /attendance/groupservicetimes`), und der ganze Campus → Service → Service-Zeit → Gruppen-Baum ist visualisiert in `B1Admin/src/attendance/components/AttendanceSetup.tsx` über `GET /attendance/attendancerecords/tree`.

:::info
Da Gruppen die einzelne Wahrheit-Quelle sind, fährt die gleiche Gruppen-Mitgliedschaft Kiosk-Routing, Roster-Stil-Anwesenheit auf B1Admin's Gruppen-Seiten und Anwesenheit-Berichte — Zuweisung eine Gruppe zu einer Service-Zeit ist der einzige notwendige Schritt, damit es ein Check-In-Ziel ist.
:::

## Kindesicherheit

### Check-In-Typen

Jeder Besuch trägt einen `checkinType` — `member`, `guest` oder `volunteer` (NULL bedeutet Legacy/Mitglied; Migration `tools/migrations/attendance/2026-07-03_checkin_type.ts`). Der Typ ist **Kiosk-seitig** ausgewählt: Member / Guest / Volunteer-Chips auf der erweiterten Mitglied-Reihe (`B1Checkin/src/components/MemberServiceTimes.tsx`), gestempelt auf jeden einzige Besuch bei Fertigstellung (`app/checkinComplete.tsx`, Standard zu `member`). Der Server konsumiert es im Gate — Freiwillige zählen zu Verhältnis-Abdeckung anstatt gegen Kapazität, und Gäste zählen gegen `guestCapacity`.

### Kapazitäts- und Freiwilligen-Verhältnis-Gates

`CheckinGateHelper.evaluate()` (`Api/src/modules/attendance/helpers/CheckinGateHelper.ts`) läuft innerhalb `postCheckin` vor jedem Speicherung (der Endpunkt ist nicht transaktional, daher ist Gating-vor-Speicher der Richtigkeit-Mechanismus). Es lädt aktuelle Auslastung pro gezielter Gruppe (`VisitRepo.countActiveByGroupToday`) und die Gruppen-Konfiguration durch das Mitgliedschafts-Modul-Gateway, dann ordnet Verstöße ein:

- **Hart (immer blockieren):** `checkinClosed`, `aktuelle + eingehend > Kapazität`, Gast-Zählung über `guestCapacity`. Das Batch wird mit `409 { error: "capacity", groups: [{ groupId, groupName, reason }] }` zurückgewiesen — der Kiosk zeigt das genannte Zimmer.
- **Verhältnis (warnen oder blockieren):** Eingehender Nicht-Freiwilliger in einen Raum wo `Freiwillige < minVolunteers`, keine Freiwilligen überhaupt, oder `Kinder > Freiwillige × volunteerRatio`. Der Schweregrad folgt die pro-Kirche Einstellung `ratioEnforcement` (`"warn"` Standard / `"block"`, bearbeitet in B1Admin Manage Church → Check-In, `CheckinSettingsEdit.tsx`). Warn-Modus gibt `409 { warning: true, error: "ratio", … }` zurück wenn der Client nicht erneut einsendet mit `acknowledgeWarnings=true` — diesen erneuten Eingang ist die Kiosk's Personal-bestätigt Übersteuerung.

### Alter-/Klassenstufen-Berechtigung (Kiosk-seitig)

Raumberechtigungen sind beratende UI, Kiosk-seitig ausgewertet, nicht Server-seitig erzwungen. `B1Checkin/src/helpers/EligibilityHelper.ts` vergleicht eine Person's Geburtsdatum/Klassenstufe gegen die Gruppen `minAgeMonths`/`maxAgeMonths`/`minGrade`/`maxGrade` (Klassenstufen-Reihenfolge: PreK, K, 1–12, Graduated) und gibt `berechtigt` / `berechtigt` / `unbekannt` zurück — fehlende Daten gibt `unbekannt` zurück und versteckt nie einen Raum. Alter und Klassenstufen werden berechnet seit der Kirchen-**Klassenstufen-Förderungs-Datum** (`gradePromotionDate` Einstellung, `"MM-DD"`, bearbeitet in `B1Admin/src/settings/components/GradePromotionSettingsEdit.tsx`); der Kiosk holt es von `GET /attendance/checkin/settings`, und `resolveAsOfDate` nimmt die jüngste Vorkommenheit auf oder bevor heute. Der Raumauswahl hebt berechtigte Zimmer hervor und verwischt berechtigte; Wählung eines verwischten Raums erfordert eine Personal-Bestätigung.

### Vertrauenswürdige und nicht-autorisierte Abholer

Abholer-Personen sind eine Mitgliedschafts-Entität, pro Haushalt: `householdPickupPeople` (`Api/src/modules/membership/models/HouseholdPickupPerson.ts` — householdId, optional personId, name, photoUrl, relationship, `status` `trusted` / `notAuthorized`, notes). CRUD ist `GET /membership/householdpickup/:householdId` (jeder authentifizierte Kirchenbenutzer, daher Kiosks können es lesen) plus `POST` / `DELETE` Personal-nur (`people.edit`). Personal-Verwaltung der Liste auf der Personen-Seite's **Abholer**-Karte (`B1Admin/src/people/components/PickupPeople.tsx`) — Photo, Verhältnis, und ein Vertrauenswürdig/Nicht Autorisiert Status-Chip.

Bei Abmeldung (`B1Checkin/app/checkout.tsx`) der Kiosk lädt die Haushalt's Abholer-Liste: `vertrauenswürdig` Einträge rendern als Tippbar-Abholer-Karten neben der Haushalt-Erwachsenen-Photo-Gitter und ein frei-getippter "Anderer" Name ist Fuzzy-verglichen (Levenshtein, `src/helpers/PickupMatchHelper.ts`) gegen `notAuthorized` Einträge — ein Treffer blockiert Check-Out mit einer Warnblatt und eine Personal- **Übersteuerung**-Knopf. Die Übersteuerung wird auf dem Besuch selbst protokolliert: es postet `checkedOutBy` als `"OVERRIDE: {name}"` durch die normal `POST /attendance/visits/checkout`, daher landen es im Anwesenheits-Datensatz und das `attendance.checkout` Webhook anstatt eine separate Audittabelle.

### Eltern-Paging und Notfall-Übertragung

`CheckinController` (`Api/src/modules/attendance/controllers/CheckinController.ts`, `/attendance/checkin`) legt zwei SMS-Endpunkte frei:

- `POST /page` — `{ visitId, message }`: Seiten die Wächter eines eingecheckten Kindes (Kiosk-Abmeldungs-Bildschirm, mannierter Modus).
- `POST /broadcast` — `{ serviceId, message }`: Texte jeden eingecheckten Haushalt's Erwachsenen für einen Service (Kiosk-Admin-Einstellungen, hinter einem Typ-`NOTFALL`-zu-bestätigen-Blatt in `B1Checkin/app/adminSettings.tsx`).

Beide lösen Haushalt-Erwachsene über das Mitgliedschafts-Gateway auf, dann Hand-Zustellung zu **`MessagingModuleGateway.sendBulkText`** (`Api/src/shared/modules/MessagingModuleGateway.ts`) — die Kreuz-Modul-Tür in der Kirche's konfigurierten SMS-Anbieter (`@churchapps/texting`: TextInChurch, Clearstream, oder MutualMinistry; es gibt keinen integrierten SMS-Sender). Das Gateway protokolliert einen `sentText` Reihe plus pro-Empfänger `deliveryLog` Einträge und deckelt einen Batch bei 500 Empfänger; mit keinem konfigurierten Anbieter gibt es `no_provider` zurück, das der Kiosk als "Kein SMS-Anbieter konfiguriert" umgestaltet. Der Controller's `dispatch()` entfernt Duplikat-Telefonnummern und überspringt Personen mit kein Mobil oder `optedOut` eingestellt, gebend `{ sent, failed, skippedOptedOut, skippedNoPhone }` damit der Kiosk zeigen kann, was übersprungen wurde.

## Der Kiosk (B1Checkin)

Bildschirme sind Expo-Router-Dateien unter `B1Checkin/app/`; Kreuz-Bildschirm-Status lebt in einer statischen `CachedData` Klasse (`src/helpers/CachedData.ts`), nicht React-Zustand.

```
index (boot/auto-login) → selectChurch → services ──▶ lookup ──▶ household ──▶ checkinComplete
                                          │             │  ▲         │ │            │
             loads serviceTimes, groups,  │             │  └─────────┘ └▶ addGuest  └▶ print labels,
             groupServiceTimes,           │             └▶ checkout (manned)           auto-return
             labelTemplates               │                                            to lookup
```

1. **Suche** (`app/lookup.tsx`) — Nach Telefon suchen (`GET /membership/people/search/phone?number=`, letzte-4 oder vollständig) oder nach Name (`GET /membership/people/search?term=`). Ein Treffer auswählen lädt den Haushalt (`GET /membership/people/household/{householdId}`) und bestehende Besuche (`GET /attendance/visits/checkin`), Aussaat `pendingVisits` mit letzte Woche Auswahlen.
2. **Haushalt-Überprüfung** (`app/household.tsx`, `src/components/MemberList.tsx`) — jede Mitglied-Reihe zeigt ein bereits-eingecheckt Badge, Allergie/`nametagNotes` Badge, und ihre aktuelle Raum-Chips. Erweiterung eine Mitglied listet auf jede Service-Zeit mit einen Knopf für einen Raum plus die Mitglied / Gast / Freiwilligen Check-In-Typ-Chips (`MemberServiceTimes.tsx`).
3. **Gruppen-Zuordnung** (`app/selectGroup.tsx`) — ein Kategorien-Baum gebaut von `serviceTime.groups`, mit Alter-/Klassenstufen-berechtigte Zimmer hervorgehoben und berechtigte die hinter einer Personal-Bestätigung verwischt (siehe [Alter-/Klassenstufen-Berechtigung](#alterklassenstufen-berechtigung-kiosk-seitig)); Ein Raum auswählen schreibt einen `{ session: { serviceTimeId, groupId } }` visitSession zu dieser Person's einzige Besuch (`src/helpers/VisitSessionHelper.ts`). "Keiner" leert es.
4. **Vollständig** (`app/checkinComplete.tsx`) — `POST /attendance/visits/checkin` mit `pendingVisits` (jeder gestempelt mit seinen `checkinType`), danach Druck-Labels wenn ein Drucker konfiguriert ist und Auto-Rückkehr zu Suche. Einen `409` Kapazitäts-Antwort zeigt das genannte voll/geschlossene Zimmer; ein Verhältnis-Warnung bietet eine Personal-Bestätigung, die erneut mit `acknowledgeWarnings=true` einsendet.

Der **Abmeldungs**-Bildschirm (`app/checkout.tsx`) akzeptiert den 4-stelligen Sicherheitscode durch eine Auto-fokussierte Eingabe — so USB/Bluetooth Tastatur-Keil Barcode-Scanner funktionieren mit keinen Kamera — oder auf Seite Tastatur mit dem gleichen Alphabet, Auto-Absenden bei 4 Zeichen. Es schaut den Code auf, zeigt die Kinder Abholsituationen, und präsentiert die Haushalt's **Vertrauenswürdige Abholer-Personen** als Tippbar-Karten neben einem Photo-Gitter von Haushalt-Erwachsenen (plus ein "Anderer" frei-Text-Option das ist Fuzzy-überprüft gegen nicht-autorisiert Namen — siehe [Vertrauenswürdige und nicht-autorisierte Abholer](#vertrauenswürdige-und-nicht-autorisierte-abholer)), dann postet `POST /attendance/visits/checkout` mit der Abhol-Name/ID. Im mannierter Modus der Bildschirm bietet auch **Seite Eltern** (`POST /attendance/checkin/page`) und ein **Sicherheits-Label-Neudruck** — `reprint()` erneuert die Familie's Labels mit `LabelHelper.getAllLabelsFor(...)` und füttert sie über die gleiche `PrintUI` Pipeline als Check-In.

Stations-Persönlichkeit ist einen AsyncStorage-Flagge `@StationMode` (`"self"` | `"manned"`, ein- aus geschaltet in `app/adminSettings.tsx`). Mannierter Modus fügt den Check-Out-Einstiegspunkt auf der Suche-Bildschirm und pro-Mitglied-Profil-Bearbeitung (`POST /membership/people`) von der Haushalt-Bildschirm. Kiosk-Verstärkung ist gebaut: ein Optional-PIN (`app/setPin.tsx`, `src/components/PinEntryModal.tsx`) Gatter die Admin und Drucker-Bildschirme, die Admin-Bildschirm öffnet nur über 7 rasante Tappel auf die Kopfzeile-Logo und einen müßig-Anzug-Bildschirm (`src/hooks/useInactivityTimer.ts`) übernimmt zwischen Familien.

## Self Check-In (B1App)

Mitglieder checken ein von die b1.church Portal bei `/mobile/checkin` Bildschirm (engeführt durch `B1App/src/app/[sdSlug]/mobile/components/ScreenRouter.tsx` zu `screens/CheckinPage.tsx`). Es erfordert einen angemeldeten Benutzer und läuft die gleichen vier Schritte als der Kiosk — Dienstleistungen → Haushalt → Gruppen → Vollständig — gegen die identisch Endpunkte, mit Zustand, der sich `B1App/src/helpers/CheckinHelper.ts` hält. Die Unterschiede von Kiosk: den Haushalt kommt von des angemeldeten Benutzers eigener `householdId` (kein Suche Schritt), und es gibt kein Label-Druck — stattdessen die Fertig-Bildschirm zeigt des Batch's Sicherheitscode als ein QR (`qrcode.react`) mit einem "zeigen Sie das zu einer Check-In-Station" Hinweis. Wenn der Haushalt bereits eingecheckt ist, wenn die Seite lädt, eine "Zeigen Sie Check-In-Code"-Knopf zeige das QR von den bestehenden Besuch's `securityCode` erneut. Das Check-In wird sofort beim Absenden-Zeit notiert (es gibt keinen einzige Zustand); die QR nur fährt Label-Druck bei dem Kiosk.

**Telefon-zu-Kiosk Label-Druck** (`B1Checkin/app/scan.tsx`, erreicht von die "Scan-Code"-Knopf auf der Suche-Bildschirm): der Kiosk öffnet ein `expo-camera` `CameraView` (Front-seitig Standard, schaltbar) Scann für QR-Codes. Ein gescannter Nutzlast wird akzeptiert, wenn es ein blotterer 4-stelliger Code in dem Sicherheitscode-Alphabet ist, daher beide die B1App QR und ein gedruckt-Label's QR-Block funktioniert. Der Bildschirm folgt danach die Check-Out-Neudruck-Pfad — `GET /attendance/visits/code/{code}` → `GET /membership/people/ids` → `LabelHelper.getAllLabelsFor(visits, people, code)` → `PrintUI` — und kehrt zu Suche zurück. Keine Anwesenheit-Schreiben geschieht zu Scann-Zeit; Labels-nur. Codes mit keine aktive Besuche, Stationen mit kein Drucker, und Label-lose Gruppen Jede Oberfläche ein Toast und zurück zu Suche.

Typen und `ApiHelper`/`ArrayHelper` kommen von `@churchapps/helpers` und `@churchapps/apphelper`; keine React-Komponenten sind geteilt mit B1Admin.

## Admin-seitige Anwesenheit (B1Admin)

- **Setup** — `/attendance` (`B1Admin/src/attendance/AttendancePage.tsx`) rendert den Struktur-Baum und erstellt Dienstleistungen (`ServiceEdit.tsx`) und Service-Zeiten (`ServiceTimeEdit.tsx`). Campus-Daten kommen von Mitgliedschaft über das `useCampuses()` Haken.
- **Manuelle Anwesenheit** lebt auf der Gruppen-Seite, nicht dem Anwesenheits-Bereich: `B1Admin/src/groups/components/GroupSessionsTab.tsx` erstellt Sitzungen (`POST /attendance/sessions`) und kennzeichnet Personen anwesend via `POST /attendance/visitsessions/log`, welche findet-oder-erstellt der Besuch für diese Person und Sitzung. Gruppen-Leiter können Anwesenheit für ihre eigenen Gruppen notieren ohne der `attendance.edit` Berechtigung — die Controller überprüfen `au.leaderGroupIds`.
- **Berichte** — Anwesenheit-Strömung und Gruppen-Anwesenheit sind Server-definierten Berichte (`B1Admin/src/components/reporting/ReportWithFilter.tsx` gegen ReportingApi); pro-Personen-Historie ist `GET /attendance/attendancerecords?personId=` (`B1Admin/src/people/components/PersonAttendance.tsx`).

## Label-Druck

### Vorlagen und der Designer

Kirchen gestalten ihre eigenen Labels in B1Admin unter `/mobile/checkin/labels` (`B1Admin/src/attendance/LabelsPage.tsx` + `components/LabelEditor.tsx`, erreicht von die Check-In-Einstellungen-Seite). Eine Vorlage ist eine `labelTemplates` Reihe deren `content` ist ein JSON Anordnung von Blöcken — `text`, `field`, `barcode`, `qrcode`, oder `box` — jede positioniert in Prozent-Koordinaten mit Schrift, Ausrichtung, Symbologie (`code39`/`code128`/`qr`), und Sichtbarkeits-Bedingungen (z.B. nur Render die Allergie-Box wenn `person.nametagNotes` ist nicht-leert). Zwei `labelType`s bestehen: `nametag` (eins pro eingecheckt Person; Felder wie `person.displayName`, `sessions`, `securityCode`) und `pickup` (eins pro Familie; Felder wie `children`, `childrenAllergies`). Der Server erzwingt einen einzelnen Grundeinstellung pro Typ pro Kirche (`LabelTemplateController.save`). Der Designer verschifft Anfangs-Vorlagen spiegelnd den Kiosk's gebündelten Labels und Vorschau gegen Probe-Daten.

### Rendering und Druck auf dem Kiosk

Bei Check-In-Fertig, `B1Checkin/src/helpers/LabelHelper.ts` trifft eine Wahl, was zu drucken von den Gruppen-Flaggen auf jeden einzige Besuch: Namenss-Tags für `printNametag` Gruppen, plus ein Familie-Abhol-Label wenn jeglicher Besuch ein `parentPickup` Gruppen traf. Der Sicherheitscode von der Check-In-Antwort geht zu Kind-Namenss-Tags und die Abhol-Label; Erwachsenen-Namenss-Tags drucken ohne einen Code. Wenn Kirche Vorlagen haben, `LabelRenderer` (`src/helpers/LabelRenderer.ts`) Wendungen Blöcke + eine Feld-Kontext zu einen eigenständig HTML-Dokument; ansonsten gebündelt HTML-Labels in `B1Checkin/assets/labels/` sind mit Platzhalter-Austausch. 

Strichkodes sind erzeugt als Inline-SVG durch rein-TypeScript Kodierer in `B1Checkin/src/helpers/barcode.ts` — Code 39 Muster-Tabellen und Code 128 (Code setzen B mit mod-103 Checksum) Breite-Tabellen, plus QR über die `qrcode` Paket. **Diese Kodierer sind absichtlich dupliziert in B1Admin** (`LabelEditor.tsx` inline die gleichen Tabellen, notiert in einem Code-Kommentar) daher Designer-Vorschau sind Pixel-treu zu Kiosk-Ausgang; eine Änderung zu einen muß in die ander spiegeln.

Die Druck-Pipeline (`src/components/PrintUI.tsx`) rendert jeden HTML-Label in einer `WebView`, erfasst es zu JPG über `react-native-view-shot`, und verhandelt die Bild-URIs zum nativ **Drucker-Helfer** Expo-Modul (`B1Checkin/modules/printer-helper/`). Der Modul legt `scan()`, `checkInit()`, `printUris()` und Status-Ereignisse frei, mit einem Anbieter pro Marke auf beide Plattformen:

| Marke | Android | iOS | Notizen |
|-------|---------|-----|-------|
| Brother | `BrotherProvider.kt` (Brother-Druck-SDK) | `BrotherProvider.swift` (`BRLMPrinterKit.xcframework`) | QL-Serie Netzwerk-Drucker (QL-800/810W/820NWB/1100/1110NWB…), gestanzte 29×90 Labels, der empfohlene Grund |
| Zebra | `ZebraProvider.kt` (Link-OS SDK) | `ZebraProvider.swift` + `ZebraBridge` | Netzwerk-Entdeckung + TCP/ZPL Bild-Druck |

Drucker-Auswahl lebt bei `app/printers.tsx` (Netzwerk-Scan gibt `brand~model~ip` Einträge zurück; die Auswahl behält bis AsyncStorage), und `src/helpers/PrinterLog.ts` behält einen auf-Gerät diagnose-Log, der über einen leben Status-Punkt in die Kiosk-Kopfzeile gestellt.

## Gast-Registrierung

Zwei Pfade erstellen eine Person Mitte-Check-In:

- **Bei dem Kiosk** — die Haushalt-Bildschirm's "Gast hinzufügen" öffnet `B1Checkin/app/addGuest.tsx`, welche zuerst suchen `GET /membership/people/search?term=` für einen bestehend nicht-Mitglied Treffer und ansonsten erstellt eins mit `POST /membership/people`, beigefügt zum aktuelle Haushalt. Der Gast fließt danach durch Gruppen-Zuordnung wie jeglicher Mitglied.
- **Self-Serve über QR** — wenn die Kirche-Einstellung `enableQRGuestRegistration` ist an (konfiguriert in B1Admin's Check-In-Einstellungen, lesen von `GET /membership/settings/public/{churchId}`), Kiosk Suche-Bildschirm zeigt einen QR-Code verlinkung zu `https://{subdomain}.b1.church/guest-register?serviceId=`. Diesen B1App Seite (`src/app/[sdSlug]/(public)/guest-register/page.tsx`) lässt ein Besuch-Familie sich selbst auf ihrem eigenen Telefon registrieren über die anonym `POST /membership/people/guest-register` Endpunkt, hält die Kiosk-Linie fahrend.

## Zugehörige Seiten

- [Attendance-Endpunkte](../api/endpoints/attendance) — Vollständige REST-Oberfläche für Campus, Dienstleistungen, Sitzungen, Besuche und Besuch-Sitzungen
- [Membership-Endpunkte](../api/endpoints/membership) — Personen, Haushalte und Gruppen
- [Webhooks](../api/webhooks) — Die `session.created`, `attendance.recorded` und `attendance.checkout` Ereignisse
- [Modulstruktur](../api/module-structure) — Wie das Anwesenheits-Modul Server-seitig organisiert ist
