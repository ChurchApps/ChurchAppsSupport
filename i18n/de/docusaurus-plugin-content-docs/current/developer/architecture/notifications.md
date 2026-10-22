---
title: "Architektur von Benachrichtigungen & Erinnerungen"
---

# Architektur von Benachrichtigungen & Erinnerungen

<div class="article-intro">

Jede Nachricht, die ein Mitglied außerhalb der gerade geöffneten Seite sieht – ein Zähler am Abzeichen, eine Push-Benachrichtigung, eine Übersichts-E-Mail –, läuft über eine von zwei Türen in der MessagingApi. Diese Seite beschreibt den Trichter, die Erinnerungs-Engine, die ihn planmäßig speist, und das Einstellungsmodell, das entscheidet, was eine Person tatsächlich erreicht.

</div>

## Überblick – zwei Türen

```
scheduled anything ──▶ ReminderEngine (definitions → occurrences → scan) ─┐
chat / requests / workflow / bulk sends ──────────────────────────────────┼─▶ createNotifications()
                                                                          │    in_app gate → socket → push → email
     (reminder channels include sms) ──▶ ReminderEngine.sendSms() ──▶ sms gate → sendPersonText() via church provider
provider STOP reply ──▶ POST /messaging/texting/inbound/:churchId/:token ──▶ SmsOptOutHelper.optOut()
account/legal mail ──▶ TransactionalEmailHelper.sendTransactional()  [allowlisted, lint-enforced]
```

1. **Alles, was einer Person etwas mitteilt**, läuft über `NotificationHelper.createNotifications()` im Messaging-Modul. Es speichert eine Zeile in `notifications` und eskaliert über Socket → Push → E-Mail; dabei wertet es `PreferenceGateHelper` für jeden Kanal aus – einschließlich `in_app` auf Stufe 0.
2. **Alles, was geplant ist**, ist eine `reminderDefinition` (auf Ebene einer Entität oder eines Bereichs), die in `reminderOccurrences` aufgelöst und von `ReminderEngine.scan()` auf einem wiederkehrenden Timer versandt wird. Ein Ausbreiter, ein Versender, ein Sendeprotokoll (`reminderSentLog`).
3. **Direkte E-Mails** gibt es nur über `TransactionalEmailHelper.sendTransactional()`. Eine ESLint-Regel erzwingt dies zur Übersetzungszeit – siehe unten.

:::tip Die E-Mail-Tür wird durch Lint erzwungen, nicht nur durch Konvention
`Api/tools/eslint-rules/email-door.cjs` definiert `no-direct-email-helper`: Jeder Aufruf von `EmailHelper.sendTemplatedEmail()` oder `EmailHelper.sendEmail()` außerhalb von `NotificationHelper.ts` oder `TransactionalEmailHelper.ts` lässt das Lint fehlschlagen. Wenn Sie eine E-Mail versenden müssen, leiten Sie sie über den Trichter (`createNotifications` mit `emailImmediate`) oder über `TransactionalEmailHelper.sendTransactional()` – einen dritten Weg, der die CI besteht, gibt es nicht.
:::

## Der Benachrichtigungstrichter

`NotificationHelper.createNotifications()` ist der einzige Einstiegspunkt für alles, was nicht geplant oder transaktional ist:

```typescript
createNotifications(
  peopleIds: string[],
  churchId: string,
  contentType: string,
  contentId: string,
  message: string,
  link?: string,
  triggeredByPersonId?: string,
  options?: {
    deliveryStartLevel?: number;      // 0 socket (default), 1 push, 2 email-only
    category?: string;                // preference axis; derived from contentType if omitted
    emailByPerson?: Record<string, { subject: string; html: string }>;
    emailImmediate?: boolean;         // send email now instead of waiting for the digest
  }
)
```

Für jeden Empfänger speichert er eine Zeile in `notifications` und ruft `attemptDeliveryWithEscalation` auf, das die unten stehende Kanalleiter durchläuft. Eine noch ungelesene Zeile für dasselbe `(contentType, contentId)` verhindert das erneute Anlegen. Diese Dublettensperre entfällt bei `emailImmediate`-Sendungen (Erinnerungs-Vorlaufzeiten, Massen-E-Mails der Mitarbeitenden, Workflow-Schritte, die ihre eigene Dublettenprüfung haben) und bei Direktnachrichten, die immer den Socket anstoßen.

`shared/helpers/NotificationService.ts` spiegelt dieselbe Signatur (`NotificationServiceOptions`) für Aufrufer außerhalb des Messaging-Moduls und wird beim Start beim Messaging-Modul registriert.

## Kanalleiter der Eskalation

Die Zustellung beginnt auf einer Stufe (standardmäßig 0 oder höher bei Erinnerungen und ausdrücklichen Sendungen) und wechselt nur dann zum nächsten Kanal, wenn der vorherige nicht erfolgreich war. Vor jedem Versuch prüft `PreferenceGateHelper` jede Stufe.

| Stufe | Kanal | Verhalten |
|-------|---------|----------|
| 0 | **in_app / Socket** | Zuerst wird die Sperre `in_app` geprüft. Ist sie unterdrückt (stummgeschaltet), wird die Zeile mit `isNew=false` gespeichert und die Zustellung endet vollständig – kein Socket-Signal, kein Abzeichen, keine weitere Eskalation. Andernfalls sucht der Server offene Socket-Verbindungen für den Raum `alerts` der Person und sendet einen Rahmen `notification` (oder `privateMessage`). Bei gewöhnlichen Benachrichtigungen beendet eine erfolgreiche Zustellung über den Socket die Kette hier – der 30-Minuten-Timer prüft ungelesene Einträge erneut und eskaliert sie später. Direktnachrichten enden nie beim Socket: Eine installierte PWA kann den Alarm-Socket im Hintergrund offen halten, was sonst die Push-Benachrichtigung auf Betriebssystemebene unterdrücken würde. |
| 1 | **Push** | Geprüft werden `allowPush`, die Abmeldung je Kategorie und die Ruhezeiten. Der Versand geht an Expo-Push-Token und Web-Push-Abonnements, die in den Zeilen `devices` der Person stehen; dabei werden Dubletten über den Endpunkt entfernt und veraltete Token bereinigt. |
| 2 | **E-Mail** | Geprüft werden `emailFrequency` und die Abmeldung je Kategorie. Sofortige Sendungen (`emailImmediate`) werden direkt gerendert und schreiben eine Zeile in `deliveryLogs`; andernfalls bleibt die Benachrichtigung für die Sammel-Übersicht offen, die unten beschrieben ist. |
| — | **SMS** | Keine Stufe der Eskalationsleiter. Der einzige geprüfte SMS-Erzeuger ist die Erinnerungs-Engine: Enthalten die `channels` einer Definition `sms`, sendet `ReminderEngine.sendSms()` jedem Empfänger **zusätzlich** zur Push- bzw. E-Mail-Benachrichtigung eine SMS (siehe [Textnachrichten als Erinnerung](#text-reminders)). Massen-SMS (`TextingController` / `@churchapps/texting`), das Versenden von **Ehrenamtliche per SMS** in der Dienstübersicht (`MatrixTextHelper` → `MessagingModuleGateway.sendPersonText`) und die Workflow-Aktion **SMS senden** (`StepActionHelper.sendText` → `sendPersonText`) schreiben alle direkt über den Anbieter der Kirche. Benachrichtigungseinstellungen und Ruhezeiten gelten dort nicht – berücksichtigt wird nur das Kennzeichen `optedOut` der Person. |

Ungelesene Benachrichtigungen, die auf Socket oder Push stehen geblieben sind, eskaliert der 30-Minuten-Timer (`NotificationHelper.escalateDelivery`). Die Sammel-E-Mail versendet `NotificationHelper.sendEmailNotifications(frequency)`, gesteuert von der Einstellung `emailFrequency` jeder Person: `individual` läuft im 30-Minuten-Timer, `daily` im nächtlichen Timer. (`weekly` ist ein gültiger Einstellungswert, hat aber noch keinen eigenen Sammellauf.)

## Die Erinnerungs-Engine

Geplante Erinnerungen – Veranstaltungserinnerungen, Fälligkeiten von Aufgaben, Erinnerungen an Dienst- und Planzuweisungen – laufen alle über eine einzige verallgemeinerte Engine, statt über eigene Cron-Logik je Funktion.

```
reminderDefinitions ──expand──▶ reminderOccurrences ──scan (30 min)──▶ createNotifications()
     │                                  │                                    │
     ▼                                  ▼                                    ▼
 entity- or scope-level          one row per (definition,              deliveryStartLevel: 1
 offsets/channels/message        entity, occurrence, offset)           + reminderSentLog ledger
```

**Definitionen** (`reminderDefinitions`) gelten entweder für eine Entität (`entityId` gesetzt – eine bestimmte Veranstaltung, Aufgabe oder ein bestimmter Plan) oder für einen Bereich (`entityId` leer, `scopeId` gesetzt – z. B. jeder Plan eines Plantyps). Eine Definition enthält eine kommagetrennte Liste von Minutenversätzen (`offsets`, z. B. `"1440,60"` für einen Tag und eine Stunde vorher), eine lokale Sendezeit (`sendLocalTime`), eine kommagetrennte Liste von Kanälen (`channels` – `email` löst beim Versand sofort eine aufwendige E-Mail aus), einen `recipientMode` und optional eine eigene `message`.

**Ausbreitung**: Die Erzeugung legt Auslöseeinträge für den kommenden Zeitraum an (ein rollendes Fenster über mehrere Tage). Sie läuft im nächtlichen Timer und synchron, sobald eine Definition gespeichert wird, damit auch eine Erinnerung für eine kurzfristige Veranstaltung ausgelöst wird. Bereichsdefinitionen verteilen sich über `loadScopeEntities` des Adapters und erzeugen je konkreter Entität eine eigene Menge an Vorkommen; Vorkommen auf Entitätsebene verwenden den Schlüssel `definitionId:occurrenceISO:offset`, bereichsbezogene Vorkommen tragen die ID der Entität im Namen, damit sie nicht kollidieren. Ein Vorkommen beim Speichern **belebt** eine zuvor abgebrochene Zeile wieder – „abbrechen und neu erzeugen“ ist der übliche Weg, eine Erinnerung nach einer Änderung der Entität neu abzugleichen. Zeilen mit dem Status `sent`, `failed` oder `processing` bleiben unverändert.

**Versand** (`ReminderEngine.scan()`) läuft im 30-Minuten-Timer. Er belegt fällige Vorkommen (eine Sperre verhindert die doppelte Verarbeitung), lädt die Empfänger über den Adapter der Entität, filtert alle heraus, die in `reminderSentLog` für dieses Vorkommen bereits verzeichnet sind, und ruft `createNotifications` mit `deliveryStartLevel: 1` auf (direkt zu Push) sowie mit `emailImmediate`/`emailByPerson`, wenn die Kanäle der Definition E-Mail enthalten.

### Textnachrichten als Erinnerung {#text-reminders}

Enthalten die `channels` einer Definition `sms`, ruft `scan()` nach den Push- bzw. E-Mail-Benachrichtigungen `ReminderEngine.sendSms()` für dieselben neuen Empfänger auf. Textnachrichten sind pro Mitglied freiwillig:

- Jeder Empfänger durchläuft `PreferenceGateHelper.evaluate(..., "sms", ...)`. `allowSms` muss daher eingeschaltet sein (standardmäßig aus; es wird über den Schalter **Textnachrichten** in der B1App gesetzt), und der Kanal `sms` der Kategorie darf nicht abgeschaltet sein. `event_reminders`, `serving_schedule` und `tasks` führen `sms` sowohl in `defaultChannels` als auch in `allowedChannels`.
- Personen ohne `mobilePhone` oder mit gesetztem `optedOut` werden unterdrückt. Hat die Kirche keinen Anbieter für Textnachrichten, wird der übrige Stapel mit dem Grund `no_provider` unterdrückt.
- Der Text wird von `ReminderEngine.smsBody()` gebaut: `"<Name der Kirche>: <Nachricht> Reply STOP to opt out."`, gekürzt auf ein Segment von 160 Zeichen.
- Jeder Empfänger erhält eine eigene Zeile in `reminderSentLog` mit `channel: "sms"` und dem Status `sent` / `suppressed` / `failed`. Sie wird getrennt von der Zeile für Push bzw. E-Mail geführt, sodass eine fehlgeschlagene SMS nie Push oder E-Mail erneut auslöst.

Die Editoren bieten **Text** nur an, wenn `GET /messaging/texting/status` den Wert `{ enabled: true }` zurückgibt (der erste Anbieter für Textnachrichten der Kirche ist aktiviert).

**Abmeldung mit STOP.** `POST /messaging/texting/inbound/:churchId/:token` ist ein anonymer Webhook, den die Kirche beim Anbieter einträgt (B1 Admin zeigt die URL aus `GET /messaging/texting/inboundUrl` in den Einstellungen für Textnachrichten). Das Token ist ein HMAC der Kirchen-ID (`SmsOptOutHelper.token`). `SmsOptOutHelper.parse` akzeptiert Formularfelder im Stil von Twilio sowie JSON im Stil von Clearstream und TextInChurch. Ist die Antwort genau ein Stoppwort des Netzbetreibers (`STOP`, `STOPALL`, `UNSUBSCRIBE`, `CANCEL`, `END`, `QUIT`, `OPTOUT`, `REVOKE`), erhält jede nicht entfernte Person der Kirche mit passender Mobilnummer `people.optedOut = true` und `allowSms = false`. Andere Antworten werden bestätigt und ignoriert.

Ein internes Ereignissystem reagiert auf Änderungen von Entitäten, ohne auf die nächtliche Ausbreitung zu warten: Inhaltsereignisse (über den Webhook-Dispatcher) sowie Aktualisierungen von Plänen und Aufgaben lösen eine sofortige erneute Ausbreitung bzw. das Abbrechen für die betroffene Entität aus. Eine Planaktualisierung erzeugt außerdem alle Bereichsdefinitionen neu, die an den Plantyp gebunden sind.

### Adapter

Die Engine kennt die Entitäten nicht; jeder unterstützte Entitätstyp wird über einen Adapter angebunden (`helpers/adapters/`):

| Entitätstyp | Adapter | Hinweise |
|-------------|---------|----------|
| `event` | `EventReminderAdapter` | Empfänger sind je nach Veranstaltung und `recipientMode` Angemeldete oder Gruppenmitglieder. |
| `plan` | `PlanReminderAdapter` | Empfänger sind Planzuweisungen mit Status „Angenommen“ und „Unbestätigt“. `buildEmails` ruft `DoingModuleGateway.buildPlanReminderEmails` auf, das Positionen, Notizen und eine eigene Nachricht über `doing/helpers/PlanReminderEmailHelper` rendert – einschließlich der Schaltflächen Annehmen/Ablehnen, die `ReminderTokenHelper` signiert und an einen öffentlichen Endpunkt für die Antwort auf die Zuweisung sendet. |
| `task` | `TaskReminderAdapter` | Empfänger sind die zugewiesenen Personen der Aufgabe. |

### Endpunkte

| Methode | Pfad | Zweck |
|--------|------|-------|
| `GET` / `POST` | `/messaging/reminders/:entityType/:entityId` | Erinnerungsdefinition für eine Entität laden bzw. speichern. |
| `GET` / `POST` | `/messaging/reminders/scope/:entityType/:scopeId` | Erinnerungsdefinition auf Bereichsebene (geerbt) laden bzw. speichern. |
| `DELETE` | `/messaging/reminders/:defId` | Eine Definition löschen und ihre ausstehenden Vorkommen abbrechen. |
| `GET` | `/messaging/reminders/event/:eventId/preview` | Vorschau der Empfängerzahl und der nächsten Auslösezeitpunkte einer Veranstaltungserinnerung vor dem Speichern. |
| `GET` | `/messaging/reminders/log` | Verlauf der letzten Erinnerungsvorkommen einer Kirche. |
| `POST` | `/messaging/reminders/mute` | Erinnerungen für eine bestimmte Entität stummschalten. |

Beim Speichern einer Definition erfolgt eine synchrone erneute Ausbreitung für die Entität oder den Bereich, sodass Editoren die aktuellen „nächsten Auslösungen“ sehen, ohne auf den nächtlichen Lauf zu warten.

## Direktnachrichten

Direktnachrichten nutzen denselben Trichter wie alles andere, statt eines eigenen Eskalationswegs. Jede ungelesene Unterhaltung erhält eine **Schattenzeile** in `notifications` (`contentType='privateMessage'`, `contentId` = die ID der Privatnachricht, `category='direct_messages'`), die die gesamte Zustellung verwaltet – Eskalation über Socket, Push und E-Mail, Lesestatus, alles. Die Tabelle `privateMessages` selbst enthält den Inhalt der Nachricht und eine Spalte `notifyPersonId`; sie speist das Abzeichen für ungelesene Einträge und wird gelöscht, sobald der Empfänger die Unterhaltung liest.

Schattenzeilen sind im Glockensymbol der Benachrichtigungen unsichtbar: Sie sind aus der Abfrage der ungelesenen Einträge, der Liste der Benachrichtigungen sowie den Abfragen zum Als-gelesen-Markieren und Löschen ausgeschlossen, die alle `contentType <> 'privateMessage'` filtern. Jede Direktnachricht-Benachrichtigung erreicht den Socket unabhängig vom Lesestatus (Verhalten wie im Live-Chat – keine Dublettensperre), und Direktnachrichten enden nie beim Socket wie gewöhnliche Benachrichtigungen, da eine im Hintergrund laufende PWA den Socket offen halten kann, aber dennoch eine Push-Benachrichtigung auf Betriebssystemebene braucht. Schaltet eine Person die Benachrichtigungen für Direktnachrichten aus, wird die Schattenzeile geparkt (`isNew=false`, `notifyPersonId` geleert): Sie bleibt innerhalb der Unterhaltung sichtbar, aber ohne Abzeichen oder Hinweise.

## Einstellungen & Sperren

Jeder Versand durchläuft `PreferenceGateHelper.evaluate()`, eine reine Funktion (der gesamte Zustand wird übergeben; auf dem Hauptpfad gibt es keine Datenbankaufrufe), die `allow`, `suppress` oder `defer` zurückgibt. Die Schichten laufen der Reihe nach, und die erste, die entscheidet, gewinnt:

1. **Gesperrte Kategorie** – einige Kategorien sind verpflichtend (Stufe 0) und umgehen alle anderen Schichten.
2. **Generelle Stummschaltung / Kanalabschaltung** – `masterMute`, `allowPush`, `allowSms` (standardmäßig aus – Mitglieder müssen zustimmen) oder `emailFrequency='never'` unterdrücken ohne weitere Prüfung.
3. **Ruhezeiten** – nur für Push und SMS (E-Mail gilt als nicht aufdringlich). Liegt die aktuelle Uhrzeit der Person in ihrer Zeitzone im Ruhefenster, kommt eine transaktionale Kategorie dennoch durch; eine nicht transaktionale wird bis zum Ende des Ruhefensters aufgeschoben. Dieses Ende wird als zeitzonenkorrekter UTC-Zeitpunkt über `TimezoneHelper.wallClockToUtc` berechnet.
4. **Einstellung je Kategorie** – eine ausdrückliche Abmeldung für eine Kombination aus Kategorie und Kanal; fehlt sie, gilt der Standard der Kategorie.
5. **Stummschaltung je Entität** – eine Stummschaltung für eine bestimmte Entität (z. B. eine Veranstaltung oder ein Plan) schränkt stärker ein als die Einstellung der Kategorie, gilt aber nur, wenn der Aufrufer zusammen mit der Benachrichtigung eine Entitäts-ID und einen Entitätstyp angibt.

Beteiligte Tabellen: `notificationPreferences` (global – `masterMute`, `emailFrequency` mit den Werten `individual|daily|weekly|never`, `allowPush`, Ruhefenster mit Zeitzone, `allowSms`), `notificationPreferenceOverrides` (je Kategorie und Kanal) und `notificationEntityMutes` (je Entität).

Diese Sperre wird für In-App- (Stufe 0), Push- (Stufe 1) und E-Mail-Benachrichtigungen (Stufe 2) im Trichter durchgesetzt – auch für sofortige Erinnerungs- und Übersichts-E-Mails – sowie für Erinnerungs-SMS in `ReminderEngine.sendSms()`. Transaktionale E-Mails (Anmeldecodes, Passwort-Zurücksetzungen, Einladungen, Spendenquittungen) umgehen sie absichtlich; genau dafür gibt es die zweite Tür.

## Von der Kirche verfasste E-Mails – Grenzwerte

E-Mails mit Inhalten, die eine Kirche verfasst hat, werden über die gemeinsame SES-Identität von ChurchApps versandt und daher je Kirche gezählt, durch `Api/src/shared/helpers/ChurchEmailLimiter.ts`. Drei Wege nutzen ihn: Gruppen- und Vorlagen-Sendungen (`EmailTemplateController`, Inhaltstyp `email`), Nachfass-E-Mails zu Formularen (`FormSubmissionController`, `formFollowUp`) sowie die Workflow-Aktion **E-Mail senden** (`NotificationHelper` mit `churchAuthored`, `workflowEmail`). Systemmails (Anmeldecodes, Quittungen, Erinnerungen) sowie Rollen- und Gruppeneinladungen (`UserController.sendInviteEmail`, feste Vorlage) werden nicht gezählt.

- **Freigabe-Schranke.** Eine Kirche versendet nichts, bis ein Serveradministrator `churches.emailApprovedDate` setzt (`POST /membership/churches/:id/emailApproval`, Serveradministration → Kirchen → Chip **Gruppen-E-Mail**). Archivierte Kirchen sind immer gesperrt. Das Dialogfeld „E-Mail senden“ in B1 Admin liest `GET /messaging/emailTemplates/sendStatus` (`approved`, `paused`, `remaining`, `requested`); ist die Kirche nicht freigegeben, zeigt es eine Karte **Überprüfung anfragen** anstelle des Editors. `POST /messaging/emailTemplates/requestApproval` schreibt an den Support – höchstens einmal je Kirche und Woche.
- **Verdientes Kontingent.** Eine freigegebene Kirche erhält `max(150, 2 × ihr bester Tag mit selbst verfassten E-Mails in den letzten 30 Tagen)`, begrenzt auf 2.000 je gleitende 24 Stunden. Die laufenden 24 Stunden bleiben bei der Ermittlung des besten Tags außen vor, damit ein Ausbruch das eigene Limit nicht erhöhen kann.
- **Reservieren, dann abrechnen.** `reserve()` schreibt vor dem Versand je Empfänger eine Zeile in `deliveryLogs`, prüft das Kontingent erneut mit diesen Zeilen und nimmt Anfragen zurück, die das Limit bei Gleichzeitigkeit überschritten haben (der Versand liefert 429). `settle()` markiert jede Zeile als gesendet oder fehlgeschlagen.
- **Pause bei Beschwerden.** Die Lambda-Funktion `sesFeedback` (`Api/src/lambda/ses-feedback-handler.ts`, gespeist von SES → SNS) ordnet jede dauerhafte Unzustellbarkeit oder Beschwerde der Kirche zu, deren selbst verfasste E-Mail um diese Zeit die Adresse erreicht hat; gespeichert als `deliveryMethod` `sesBounce` / `sesComplaint`. Eine Kirche wird bei 2 oder mehr Beschwerden (≥ 0,3 % der Sendungen) oder 10 oder mehr harten Unzustellbarkeiten (≥ 5 %) innerhalb von 7 Tagen pausiert.

## Zeitplanung

Die Erinnerungs-Engine und die Benachrichtigungs-Übersicht nutzen bestehende geplante Timer, statt eigene Infrastruktur einzuführen:

| Timer | Plan | Läuft |
|-------|----------|------|
| 30-Minuten-Timer | alle 30 Minuten | Eskaliert ungelesene Benachrichtigungen; versendet die Übersichts-E-Mails mit Häufigkeit `individual`; löst fällige Erinnerungsvorkommen aus (`ReminderEngine.scan`); Freigabe-Übersichten; fällige Automationsausführungen |
| Nächtlicher Timer | 05:00 UTC | Erinnerungen der Gruppenanwesenheit; setzt wiederkehrende Streaming-Dienste fort; aktualisiert automatisch zu aktualisierende Listen; erzeugt Erinnerungsvorkommen für den nächsten Zeitraum (`ReminderEngine.expandAll`); versendet die Übersichts-E-Mails mit Häufigkeit `daily` |

Lokal lassen sich dieselben Abläufe mit `npm run timer:30min` und `npm run timer:midnight` im Projekt `Api` auf Abruf auslösen.

## Dateiübersicht

| Bereich | Dateien |
|------|---------|
| Trichter | `Api/src/modules/messaging/helpers/NotificationHelper.ts`, `PreferenceGateHelper.ts`, `NotificationCategoryHelper.ts`, `WebPushHelper.ts`, `ExpoPushHelper.ts`, `SocketHelper.ts`, `DeliveryHelper.ts` |
| Gemeinsamer Einstieg | `Api/src/shared/helpers/NotificationService.ts` |
| Transaktionale Tür | `Api/src/shared/helpers/TransactionalEmailHelper.ts`, Lint-Regel `Api/tools/eslint-rules/email-door.cjs` |
| Grenzwerte für Kirchen-E-Mails | `Api/src/shared/helpers/ChurchEmailLimiter.ts`, `Api/src/lambda/ses-feedback-handler.ts`, `Api/src/modules/messaging/repositories/DeliveryLogRepo.ts` |
| Erinnerungs-Engine | `Api/src/modules/messaging/helpers/ReminderEngine.ts`, `ReminderBootstrap.ts`, `helpers/adapters/*`, `controllers/ReminderController.ts` |
| Textnachrichten / Abmeldung mit STOP | `Api/src/modules/messaging/helpers/SmsOptOutHelper.ts`, `controllers/TextingController.ts` (`/status`, `/inboundUrl`, `/inbound/:churchId/:token`), `Api/src/modules/doing/helpers/MatrixTextHelper.ts` (Dienstübersicht **Ehrenamtliche per SMS**) |
| Repositories der Erinnerungen | `Api/src/modules/messaging/repositories/ReminderDefinitionRepo.ts`, `ReminderOccurrenceRepo.ts`, `ReminderSentLogRepo.ts` |
| E-Mail zu Diensten/Plänen | `Api/src/modules/doing/helpers/PlanReminderEmailHelper.ts`, `ReminderTokenHelper.ts`, `Api/src/shared/modules/DoingModuleGateway.ts` |
| Editoren für Erinnerungen (B1 Admin) | `serving/components/PlanTypeReminderEdit.tsx`, `calendars/components/EventReminderEdit.tsx`, `serving/tasks/components/TaskReminderEdit.tsx`, `hooks/useTextingEnabled.ts` |
| Editor für Erinnerungen / Einstellungen (B1App) | `EventReminderEdit.tsx`, `NotificationPrefsPage.tsx`, `useRealtimeNotifications.ts` |

## Verwandte Seiten

- [Echtzeit-Architektur](../realtime) – das WebSocket-Protokoll und die Client-Bausteine (`SocketHelper`, `SubscriptionManager`, `ConversationStore`), auf denen die In-App-Zustellung aufsetzt
- [Web-Push-Benachrichtigungen](../web-push) – VAPID-Einrichtung und der Weg der Browser-Push-API, den die Push-Stufe nutzt
- [Messaging-Endpunkte](../api/endpoints/messaging) – vollständige REST-Schnittstelle für Nachrichten, Unterhaltungen, Verbindungen sowie Benachrichtigungs- und Erinnerungsrouten
