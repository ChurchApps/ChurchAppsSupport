---
title: "Architektur von Benachrichtigungen & Erinnerungen"
description: "Wie die B1-Admin-API Benachrichtigungen, geplante Erinnerungen, E-Mail-Limits der Gemeinden und Abmeldungen von Textnachrichten über einen gemeinsamen Zustellweg und ein Präferenz-Gate leitet."
---

# Architektur von Benachrichtigungen & Erinnerungen

<div class="article-intro">

Jede Nachricht, die ein Gemeindemitglied außerhalb der Seite sieht, auf der es gerade ist, etwa eine Zähleranzeige, eine Push-Benachrichtigung oder eine Übersichts-E-Mail, läuft durch eine von zwei Türen im MessagingApi. Diese Seite beschreibt den Weg, den Erinnerungsmotor, der ihn zeitgesteuert speist, und das Präferenzmodell, das entscheidet, was eine Person tatsächlich erreicht.

</div>

## Überblick: zwei Türen

```
scheduled anything ──▶ ReminderEngine (definitions → occurrences → scan) ─┐
scheduled staff push ─▶ scheduledNotifications (1-minute timer) ───────────┤
chat / requests / workflow / bulk sends ──────────────────────────────────┼─▶ createNotifications()
                                                                          │    in_app gate → socket → push → email
     (reminder channels include sms) ──▶ ReminderEngine.sendSms() ──▶ sms gate → sendPersonText() via church provider
provider STOP reply ──▶ POST /messaging/texting/inbound/:churchId/:token ──▶ SmsOptOutHelper.optOut()
account/legal mail ──▶ TransactionalEmailHelper.sendTransactional()  [allowlisted, lint-enforced]
```

1. **Alles, was einer Person etwas mitteilt,** läuft über `NotificationHelper.createNotifications()` im Messaging-Modul. Die Funktion speichert eine Zeile in `notifications` und eskaliert von Socket über Push zu E-Mail. Dabei prüft `PreferenceGateHelper` jeden Kanal, auch `in_app` auf Stufe 0.
2. **Alles, was geplant ist,** ist eine `reminderDefinition` (auf Ebene einer Entität oder eines Bereichs). Sie wird in `reminderOccurrences` aufgelöst und von `ReminderEngine.scan()` auf einem wiederkehrenden Timer verschickt. Es gibt einen Expander, einen Versender und ein Sendeprotokoll (`reminderSentLog`). Eine Ausnahme bildet ein Push von Mitarbeitenden, den Sie auf der Seite **Mobile > Push-Benachrichtigungen** von B1Admin oder über den Dialog **Benachrichtigen** einer Gruppe planen. Er ist eine Zeile in `scheduledNotifications` (Zielgruppe `church` oder `group`) und wird von `ScheduledNotificationHelper.dispatchDue()` auf dem Ein-Minuten-Timer gesendet. Eine Zeile, die beim ersten Versuch mehr als 30 Minuten nach ihrem `sendAt` liegt, wird als fehlgeschlagen mit `missed send window` markiert, statt verspätet gesendet. Ein fehlgeschlagener Versand wird bis zu dreimal wiederholt. Die Empfänger werden zum Sendezeitpunkt von `PushAudienceHelper` aufgelöst, demselben Helfer, den auch der sofortige Gruppenversand nutzt. Zugestellt werden sie über `createNotifications()` als `churchPushNotification` (Präferenzkategorie `announcements`) oder `groupPushNotification`.
3. **Direkte E-Mails** gibt es nur über `TransactionalEmailHelper.sendTransactional()`. Eine ESLint-Regel erzwingt dies zur Kompilierzeit. Siehe unten.

:::tip Die E-Mail-Tür wird per Lint erzwungen, nicht nur per Konvention
`Api/tools/eslint-rules/email-door.cjs` definiert `no-direct-email-helper`. Jeder Aufruf von `EmailHelper.sendTemplatedEmail()` oder `EmailHelper.sendEmail()` außerhalb von `NotificationHelper.ts` oder `TransactionalEmailHelper.ts` schlägt im Lint fehl. Wenn Sie eine E-Mail senden müssen, leiten Sie sie über den Zustellweg (`createNotifications` mit `emailImmediate`) oder über `TransactionalEmailHelper.sendTransactional()`. Einen dritten Weg, der die CI besteht, gibt es nicht.
:::

## Der Zustellweg für Benachrichtigungen

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

Für jeden Empfänger wird eine Zeile in `notifications` gespeichert. Danach ruft die Funktion `attemptDeliveryWithEscalation` auf, die die Kanalkette unten durchläuft. Eine noch ungelesene Zeile für dasselbe `(contentType, contentId)` verhindert das erneute Anlegen. Diese Deduplizierung entfällt bei `emailImmediate`-Versänden (Erinnerungs-Offsets, „E-Mail an alle“ durch Mitarbeitende, Workflow-Schritte mit eigener Deduplizierung) und bei Direktnachrichten, die immer den Socket anstoßen.

`shared/helpers/NotificationService.ts` spiegelt dieselbe Signatur (`NotificationServiceOptions`) für Aufrufende außerhalb des Messaging-Moduls. Dort wird sie beim Start beim Messaging-Modul registriert.

## Eskalationskette der Kanäle

Die Zustellung beginnt auf einer Stufe (standardmäßig 0, bei Erinnerungen oder ausdrücklichen Versänden höher) und geht nur dann zum nächsten Kanal über, wenn der vorherige nicht erfolgreich war. Jede Stufe wird von `PreferenceGateHelper` geprüft, bevor überhaupt ein Versuch stattfindet.

| Stufe | Kanal | Verhalten |
|-------|-------|-----------|
| 0 | **in_app / Socket** | Zuerst wird das `in_app`-Gate geprüft. Ist es unterdrückt (stummgeschaltet), wird die Zeile mit `isNew=false` gespeichert und die Zustellung endet vollständig: kein Socket-Signal, kein Abzeichen, keine weitere Eskalation. Andernfalls sucht der Server offene Socket-Verbindungen im `alerts`-Raum der Person und sendet einen Rahmen `notification` (oder `privateMessage`). Bei gewöhnlichen Benachrichtigungen beendet eine erfolgreiche Socket-Zustellung die Kette an dieser Stelle. Der 30-Minuten-Timer prüft ungelesene Einträge erneut und eskaliert sie später. Direktnachrichten enden nie am Socket: Eine installierte PWA kann den Alerts-Socket im Hintergrund offen halten, und das würde eine Push-Benachrichtigung auf Betriebssystemebene sonst unterdrücken. |
| 1 | **Push** | Gesteuert durch `allowPush`, die Abmeldung der Kategorie und die Ruhezeiten. Sendet an Expo-Push-Token und an Web-Push-Abos, die in den Zeilen `devices` der Person stehen. Dabei werden Einträge nach Endpunkt dedupliziert und veraltete Token entfernt. |
| 2 | **E-Mail** | Gesteuert durch `emailFrequency` und die Abmeldung der Kategorie. Sofortige Versände (`emailImmediate`) werden direkt gerendert und schreiben eine Zeile in `deliveryLogs`. Andernfalls bleibt die Benachrichtigung für die Sammel-Übersicht ausstehend, die unten beschrieben ist. |
| — | **SMS** | Keine Stufe der Eskalationskette. Der einzige gesteuerte SMS-Erzeuger ist der Erinnerungsmotor: Schließen die `channels` einer Definition `sms` ein, sendet `ReminderEngine.sendSms()` jeder empfangenden Person zusätzlich zur Push- oder E-Mail-Benachrichtigung eine Textnachricht (siehe [Textnachricht-Erinnerungen](#text-reminders)). Massen-Textnachrichten (`TextingController` / `@churchapps/texting`), das Versenden von **Ehrenamtliche per Text erreichen** in der Dienste-Übersicht (`MatrixTextHelper` → `MessagingModuleGateway.sendPersonText`) und die Workflow-Aktion **Textnachricht senden** (`StepActionHelper.sendText` → `sendPersonText`) verschicken alle direkt über den Anbieter der Gemeinde. Benachrichtigungseinstellungen und Ruhezeiten gelten für sie daher nicht. Nur das Kennzeichen `optedOut` der Person wird beachtet. |

Ungelesene Benachrichtigungen, die auf Socket- oder Push-Stufe stehen geblieben sind, eskaliert der 30-Minuten-Timer (`NotificationHelper.escalateDelivery`). Den Sammelversand von E-Mails übernimmt `NotificationHelper.sendEmailNotifications(frequency)`, gesteuert durch die Einstellung `emailFrequency` jeder Person. `individual` läuft auf dem 30-Minuten-Timer, `daily` auf dem nächtlichen Timer. (`weekly` ist ein gültiger Einstellungswert, hat aber noch keinen eigenen Sammellauf.)

## Erinnerungsmotor

Geplante Erinnerungen (Veranstaltungserinnerungen, Fälligkeiten von Aufgaben, Erinnerungen an Dienst- und Planzuweisungen) laufen alle durch einen allgemeinen Motor und nicht durch eigene Cron-Logik je Funktion.

```
reminderDefinitions ──expand──▶ reminderOccurrences ──scan (30 min)──▶ createNotifications()
     │                                  │                                    │
     ▼                                  ▼                                    ▼
 entity- or scope-level          one row per (definition,              deliveryStartLevel: 1
 offsets/channels/message        entity, occurrence, offset)           + reminderSentLog ledger
```

**Definitionen** (`reminderDefinitions`) sind entweder auf Ebene einer Entität (`entityId` gesetzt, also eine bestimmte Veranstaltung, Aufgabe oder ein Plan) oder auf Bereichsebene (`entityId` null, `scopeId` gesetzt, z. B. jeder Plan unter einem Dienst-Plantyp). Eine Definition enthält eine kommagetrennte Liste von Minuten-Offsets (`offsets`, z. B. `"1440,60"` für einen Tag und eine Stunde vorher), eine lokale Sendezeit (`sendLocalTime`), eine kommagetrennte Liste von Kanälen (`channels`, wobei `email` eine sofortige, aufwendige E-Mail zum Sendezeitpunkt auslöst), einen `recipientMode` und optional eine eigene `message`.

**Die Expansion** legt Auslöse-Zeilen für den Horizont in der Zukunft an (ein rollierendes Fenster über mehrere Tage). Sie läuft auf dem nächtlichen Timer und synchron, sobald eine Definition gespeichert wird, damit auch eine Erinnerung für eine kurzfristige Veranstaltung ausgelöst wird. Bereichsdefinitionen verteilen sich über `loadScopeEntities` des Adapters und erzeugen je konkreter Entität einen eigenen Satz von Vorkommen. Entitätsbezogene Vorkommen verwenden den Schlüssel `definitionId:occurrenceISO:offset`, bereichsbezogene Vorkommen setzen die Entitäts-ID als Namensraum, sodass sie nicht kollidieren. Das Anlegen eines Vorkommens **belebt** eine zuvor abgebrochene Zeile wieder. Abbrechen und erneut expandieren ist daher der Standardweg, eine Erinnerung nach einer Änderung an der zugrunde liegenden Entität neu abzugleichen. Zeilen mit dem Status `sent`, `failed` oder `processing` bleiben unberührt.

**Der Versand** (`ReminderEngine.scan()`) läuft auf dem 30-Minuten-Timer. Er beansprucht fällige Vorkommen (eine Lease verhindert doppelte Verarbeitung), lädt die Empfänger über den Adapter der Entität, filtert Personen heraus, die für dieses Vorkommen bereits in `reminderSentLog` stehen, und ruft `createNotifications` mit `deliveryStartLevel: 1` auf (direkt zu Push), dazu `emailImmediate` und `emailByPerson`, wenn die Kanäle der Definition E-Mail enthalten.

### Textnachricht-Erinnerungen {#text-reminders}

Schließen die `channels` einer Definition `sms` ein, ruft `scan()` nach den Push- und E-Mail-Benachrichtigungen `ReminderEngine.sendSms()` für dieselben neuen Empfänger auf. Textnachrichten sind je Mitglied freiwillig:

- Jeder Empfänger durchläuft `PreferenceGateHelper.evaluate(..., "sms", ...)`. Dafür muss `allowSms` aktiv sein (standardmäßig aus, und es wird über den Schalter **Textnachrichten** der B1App gesetzt). Außerdem darf der SMS-Kanal der Kategorie nicht abgeschaltet überschrieben sein. `event_reminders`, `serving_schedule` und `tasks` führen `sms` sowohl in `defaultChannels` als auch in `allowedChannels`.
- Personen ohne `mobilePhone` oder mit gesetztem `optedOut` werden unterdrückt. Hat die Gemeinde keinen Anbieter für Textnachrichten, wird der Rest des Stapels mit dem Grund `no_provider` unterdrückt.
- Der Text entsteht in `ReminderEngine.smsBody()`: `"<Gemeindename>: <Nachricht> Reply STOP to opt out."`, auf ein 160-Zeichen-Segment gekürzt.
- Jeder Empfänger erhält eine eigene Zeile in `reminderSentLog` mit `channel: "sms"` und dem Status `sent`, `suppressed` oder `failed`. Sie ist getrennt von der Push- oder E-Mail-Zeile geführt, damit eine fehlgeschlagene Textnachricht nie Push oder E-Mail erneut auslöst.

Editoren bieten **Text** nur an, wenn `GET /messaging/texting/status` den Wert `{ enabled: true }` zurückgibt (der erste Anbieter für Textnachrichten der Gemeinde ist aktiviert).

**Abmeldung per STOP.** `POST /messaging/texting/inbound/:churchId/:token` ist ein anonymer Webhook, den die Gemeinde beim Anbieter einträgt. B1Admin zeigt die URL aus `GET /messaging/texting/inboundUrl` in den Einstellungen für Textnachrichten. Das Token ist ein HMAC der Gemeinde-ID (`SmsOptOutHelper.token`). `SmsOptOutHelper.parse` akzeptiert Formularfelder im Twilio-Stil sowie JSON im Stil von Clearstream bzw. TextInChurch. Ist die Antwort genau ein Stoppwort des Netzbetreibers (`STOP`, `STOPALL`, `UNSUBSCRIBE`, `CANCEL`, `END`, `QUIT`, `OPTOUT`, `REVOKE`), erhält jede nicht entfernte Person der Gemeinde, deren Mobilnummer passt, `people.optedOut = true` und `allowSms = false`. Andere Antworten werden bestätigt und ignoriert.

Ein internes Ereignissystem reagiert auf Änderungen an Entitäten, ohne auf die nächtliche Expansion zu warten. Inhaltsereignisse (über den Webhook-Dispatcher) sowie Plan- und Aufgaben-Ereignisse lösen sofort eine erneute Expansion oder einen Abbruch für die betroffene Entität aus. Eine Planaktualisierung expandiert außerdem alle Bereichsdefinitionen neu, die an den Plantyp gebunden sind.

### Adapter

Der Motor ist entitätsunabhängig. Jeder unterstützte Entitätstyp wird über einen Adapter eingebunden (`helpers/adapters/`):

| Entitätstyp | Adapter | Hinweise |
|-------------|---------|----------|
| `event` | `EventReminderAdapter` | Empfänger sind je nach Veranstaltung und `recipientMode` Angemeldete oder Gruppenmitglieder. |
| `plan` | `PlanReminderAdapter` | Empfänger sind Zuweisungen mit Status Angenommen und Unbestätigt in veröffentlichten (nicht entwurfsartigen) Plänen. Unbestätigte Zuweisungen, die über einen Bestätigungs-Workflow für Dienste ausgestellt wurden, sind ausgeschlossen, bis sie angenommen sind (siehe unten). `buildEmails` ruft `DoingModuleGateway.buildPlanReminderEmails` auf. Dieses rendert Positionen, Notizen und eine eigene Nachricht über `doing/helpers/PlanReminderEmailHelper`, einschließlich Schaltflächen Annehmen und Ablehnen. Sie werden von `ReminderTokenHelper` signiert und senden an einen öffentlichen Endpunkt für die Antwort auf Zuweisungen. |
| `task` | `TaskReminderAdapter` | Empfänger sind die zugewiesenen Personen der Aufgabe. |

### Endpunkte

| Methode | Pfad | Zweck |
|---------|------|-------|
| `GET` / `POST` | `/messaging/reminders/:entityType/:entityId` | Die Erinnerungsdefinition für eine Entität laden oder speichern. |
| `GET` / `POST` | `/messaging/reminders/scope/:entityType/:scopeId` | Eine Erinnerungsdefinition auf Bereichsebene (vererbt) laden oder speichern. |
| `DELETE` | `/messaging/reminders/:defId` | Eine Definition löschen und ihre ausstehenden Vorkommen abbrechen. |
| `GET` | `/messaging/reminders/event/:eventId/preview` | Vor dem Speichern Anzahl der Empfänger und nächste Auslösezeiten einer Veranstaltungserinnerung anzeigen. |
| `GET` | `/messaging/reminders/log` | Verlauf der letzten Erinnerungsvorkommen einer Gemeinde. |
| `POST` | `/messaging/reminders/mute` | Erinnerungen für eine bestimmte Entität stummschalten. |

Das Speichern einer Definition löst eine synchrone erneute Expansion für die Entität oder den Bereich aus. Editoren sehen so sofort aktuelle Angaben zu den „nächsten Auslösungen“, ohne auf den nächtlichen Lauf zu warten.

## Direktnachrichten

Direktnachrichten laufen über denselben Zustellweg wie alles andere und nicht über einen eigenen Eskalationspfad. Jede ungelesene Unterhaltung erhält eine **Schattenzeile** in `notifications` (`contentType='privateMessage'`, `contentId` = die ID der privaten Nachricht, `category='direct_messages'`). Sie besitzt sämtlichen Zustellstatus: Socket-, Push- und E-Mail-Eskalation sowie das Nachverfolgen des Lesens. Die Tabelle `privateMessages` selbst speichert den Nachrichteninhalt und eine Spalte `notifyPersonId`. Diese Spalte ist die Quelle des Abzeichens für ungelesene Nachrichten und wird gelöscht, sobald der Empfänger die Unterhaltung liest.

Schattenzeilen sind in der Glocke für Benachrichtigungen unsichtbar. Sie werden von der Abfrage der ungelesenen Anzahl, der Liste der Benachrichtigungen und den Abfragen zum Als-gelesen-Markieren und Löschen ausgeschlossen. Alle filtern auf `contentType <> 'privateMessage'`. Jede DM-Benachrichtigung trifft unabhängig vom Lesestatus den Socket (Live-Chat-Semantik ohne Deduplizierung). DMs enden nie am Socket, anders als gewöhnliche Benachrichtigungen. Eine im Hintergrund laufende PWA kann einen Socket offen halten und benötigt trotzdem eine Push-Benachrichtigung auf Betriebssystemebene. Stellt eine Person DM-Benachrichtigungen stumm, wird die Schattenzeile geparkt (`isNew=false`, `notifyPersonId` geleert). In der Unterhaltung selbst bleibt sie sichtbar, aber ohne Abzeichen oder Hinweise.

## Einstellungen & Gating

Jeder Versand durchläuft `PreferenceGateHelper.evaluate()`. Das ist eine reine Funktion (alle Zustände werden übergeben, auf dem heißen Pfad gibt es keine Datenbankaufrufe). Sie liefert `allow`, `suppress` oder `defer`. Die Ebenen werden der Reihe nach geprüft, und die erste Ebene, die entscheidet, gewinnt:

1. **Gesperrte Kategorie** -- einige Kategorien sind verpflichtend (Stufe 0) und umgehen alle übrigen Ebenen.
2. **Generelle Stummschaltung / Kanal aus** -- `masterMute`, `allowPush`, `allowSms` (standardmäßig aus, Mitglieder stimmen zu) oder `emailFrequency='never'` unterdrücken sofort.
3. **Ruhezeiten** -- nur für Push und SMS (E-Mail gilt als nicht aufdringlich). Liegt die aktuelle Uhrzeit der Person in ihrer Zeitzone im Ruhefenster, kommt eine transaktionale Kategorie trotzdem durch. Eine nicht transaktionale wird bis zum Ende des Ruhefensters zurückgestellt. Dieser Zeitpunkt wird als UTC-Instant berechnet, der die Sommerzeit berücksichtigt (`TimezoneHelper.wallClockToUtc`).
4. **Einstellung je Kategorie** -- eine ausdrückliche Abmeldung für eine Kombination aus Kategorie und Kanal. Fehlt sie, gilt der Standard der Kategorie.
5. **Stummschaltung je Entität** -- eine Stummschaltung für eine bestimmte Entität (z. B. eine Veranstaltung oder ein Plan) schränkt stärker ein als die Einstellung auf Kategorieebene. Sie greift nur, wenn der Aufrufende zusammen mit der Benachrichtigung auch eine Entitäts-ID und einen Entitätstyp angibt.

Beteiligte Tabellen: `notificationPreferences` (global: `masterMute`, `emailFrequency` mit den Werten `individual|daily|weekly|never`, `allowPush`, Ruhefenster und Zeitzone, `allowSms`), `notificationPreferenceOverrides` (je Kategorie und Kanal) und `notificationEntityMutes` (je Entität).

Dieses Gate gilt für In-App (Stufe 0), Push (Stufe 1) und E-Mail (Stufe 2) innerhalb des Zustellwegs, einschließlich sofortiger Erinnerungs- und Übersichts-E-Mails. Für Erinnerungs-Textnachrichten gilt es in `ReminderEngine.sendSms()`. Transaktionale E-Mails (Anmeldecodes, Passwort-Zurücksetzungen, Einladungen, Spendenquittungen) umgehen es mit Absicht. Genau dafür gibt es die zweite Tür.

### Bestätigungs-Workflows für Dienste

Ein Plan kann einen Workflow mit `workflowType = "assignmentConfirmation"` (`plans.confirmationWorkflowId`) aktivieren. Veröffentlichen oder Benachrichtigen ruft dann `POST /doing/plans/:id/issueRequests` statt der Benachrichtigung je Zuweisung auf. Jede neue unbestätigte Zuweisung erhält `notified` und `confirmationWorkflowId` sowie eine Workflow-Karte (`tasks.assignmentId`, eindeutiger `followupKey`). Die Karte sendet eine reine App-Benachrichtigung (`appOnly: true`, also ohne Eskalation zu Push oder E-Mail) und führt danach die Aktionen `sendAssignmentRequest` des Workflows aus. Diese laufen über `MessagingModuleGateway.sendServingWorkflowMessage`: E-Mail über `NotificationHelper.sendWorkflowEmail` (Präferenz-Gate und `ChurchEmailLimiter`, gezählt als `workflowEmail`), SMS über `sendPersonText`, aber nur mit `allowSms` und dem Gate der Kategorie `serving_schedule`. Annehmen oder Ablehnen (`assignment.updated` im Ereignissystem) schließt die Karte. Der 30-Minuten-Timer (`AssignmentWorkflowHelper.processPending`) holt verpasste Starts und Ereignisse nach. Eine unbeantwortete Anfrage wird zur Frist in eine Aufgabe zur Prüfung durch die Leitung umgewandelt. Den vollständigen Lebenszyklus beschreibt `Api/docs/assignment-confirmation-workflows.md`.

## E-Mail-Limits der Gemeinden

E-Mails mit Inhalten, die eine Gemeinde verfasst hat, gehen von der gemeinsamen SES-Identität von ChurchApps aus. Deshalb werden sie je Gemeinde durch `Api/src/shared/helpers/ChurchEmailLimiter.ts` begrenzt. Vier Pfade nutzen diesen Limiter: Versände an Gruppen und mit Vorlagen (`EmailTemplateController`, Inhaltstyp `email`), Nachfass-E-Mails aus Formularen (`FormSubmissionController`, `formFollowUp`), Workflow-Aktionen **E-Mail senden** (`NotificationHelper` mit `churchAuthored`, `workflowEmail`) sowie Anfrage-E-Mails für Bestätigungs-Workflows von Diensten (`NotificationHelper.sendWorkflowEmail`, `workflowEmail`). Systemmails (Anmeldecodes, Quittungen, Erinnerungen) sowie Rollen- und Gruppeneinladungen (`UserController.sendInviteEmail`, feste Vorlage) werden nicht begrenzt.

- **Freigabe-Gate.** Eine Gemeinde versendet nichts, bis ein Serveradministrator `churches.emailApprovedDate` setzt (`POST /membership/churches/:id/emailApproval`, Serveradministration → Gemeinden → Chip **Gruppen-E-Mail**). Archivierte Gemeinden sind immer gesperrt. Der Dialog E-Mail senden in B1Admin liest `GET /messaging/emailTemplates/sendStatus` (`approved`, `paused`, `remaining`, `requested`). Ist die Gemeinde nicht freigegeben, zeigt er statt des Editors die Karte **Prüfung anfordern**. Der Editor der Workflow-Schritte liest denselben Endpunkt (für `tasks.admin` und `groupMembers.edit` geöffnet) und warnt bei Aktionen **E-Mail senden**, wenn die Gemeinde nicht freigegeben oder pausiert ist. Beim Versand liefert `MessagingModuleGateway.sendTemplatedEmail` den Wert `false` ohne eine Benachrichtigung anzulegen, wenn `ChurchEmailLimiter.remaining()` unter 1 liegt. So behauptet der Verlauf der Karte nie **E-Mail gesendet** für eine verworfene Mail. `POST /messaging/emailTemplates/requestApproval` schreibt dem Support höchstens einmal pro Gemeinde und Woche.
- **Verdientes Kontingent.** Eine freigegebene Gemeinde erhält `max(150, 2 × ihr bester Tag mit eigenen E-Mails in den letzten 30 Tagen)`, begrenzt auf 2.000 je rollierende 24 Stunden. Die laufenden 24 Stunden zählen nicht zum „besten Tag“, damit ein Ausbruch das eigene Limit nicht erhöhen kann.
- **Reservieren, dann abrechnen.** `reserve()` schreibt vor dem Versand je Empfänger eine Zeile in `deliveryLogs`, prüft das Kontingent erneut mit diesen Zeilen und bricht ab, wenn zwei Anfragen das Limit gleichzeitig überschritten haben (der Versand liefert 429). `settle()` markiert jede Zeile als gesendet oder fehlgeschlagen.
- **Pause bei Beschwerden.** Die Lambda `sesFeedback` (`Api/src/lambda/ses-feedback-handler.ts`, gespeist von SES → SNS) ordnet jeden dauerhaften Bounce oder jede Beschwerde der Gemeinde zu, deren E-Mail zeitnah an diese Adresse ging. Gespeichert als `deliveryMethod` `sesBounce` bzw. `sesComplaint`. Eine Gemeinde wird bei 2 oder mehr Beschwerden (≥ 0,3 % der Versände) oder 10 oder mehr harten Bounces (≥ 5 %) in 7 Tagen pausiert.

## Zeitplanung

Erinnerungsmotor und Übersichts-Benachrichtigungen laufen auf bestehenden geplanten Timern und führen keine neue Infrastruktur ein:

| Timer | Zeitplan | Läuft |
|-------|----------|-------|
| 30-Minuten-Timer | alle 30 Minuten | Ungelesene Benachrichtigungen eskalieren; Übersichts-E-Mails mit Häufigkeit `individual` senden; fällige Erinnerungsvorkommen auslösen (`ReminderEngine.scan`); Genehmigungsübersichten; fällige Automatisierungsläufe |
| 1-Minuten-Timer (`timerWebhooks`) | jede Minute | Fällige geplante Push-Benachrichtigungen senden (`ScheduledNotificationHelper.dispatchDue`, Job `scheduledNotifications`) |
| Nächtlicher Timer | 05:00 UTC | Anwesenheitserinnerungen der Gruppen; wiederkehrende Streaming-Dienste fortschreiben; automatisch aktualisierte Listen erneuern; Erinnerungsvorkommen für den nächsten Horizont expandieren (`ReminderEngine.expandAll`); Übersichts-E-Mails mit Häufigkeit `daily` senden |

Lokal lässt sich dieselbe Logik mit `npm run timer:30min` und `npm run timer:midnight` im Projekt `Api` manuell auslösen.

## Dateiübersicht

| Bereich | Dateien |
|---------|---------|
| Zustellweg | `Api/src/modules/messaging/helpers/NotificationHelper.ts`, `PreferenceGateHelper.ts`, `NotificationCategoryHelper.ts`, `WebPushHelper.ts`, `ExpoPushHelper.ts`, `SocketHelper.ts`, `DeliveryHelper.ts` |
| Gemeinsamer Einstieg | `Api/src/shared/helpers/NotificationService.ts` |
| Transaktionale Tür | `Api/src/shared/helpers/TransactionalEmailHelper.ts`, Lint-Regel `Api/tools/eslint-rules/email-door.cjs` |
| E-Mail-Limits der Gemeinden | `Api/src/shared/helpers/ChurchEmailLimiter.ts`, `Api/src/lambda/ses-feedback-handler.ts`, `Api/src/modules/messaging/repositories/DeliveryLogRepo.ts` |
| Erinnerungsmotor | `Api/src/modules/messaging/helpers/ReminderEngine.ts`, `ReminderBootstrap.ts`, `helpers/adapters/*`, `controllers/ReminderController.ts` |
| Textnachrichten / Abmeldung per STOP | `Api/src/modules/messaging/helpers/SmsOptOutHelper.ts`, `controllers/TextingController.ts` (`/status`, `/inboundUrl`, `/inbound/:churchId/:token`), `Api/src/modules/doing/helpers/MatrixTextHelper.ts` (**Ehrenamtliche per Text erreichen** in der Dienste-Übersicht) |
| Repositories der Erinnerungen | `Api/src/modules/messaging/repositories/ReminderDefinitionRepo.ts`, `ReminderOccurrenceRepo.ts`, `ReminderSentLogRepo.ts` |
| E-Mails zu Diensten/Plänen | `Api/src/modules/doing/helpers/PlanReminderEmailHelper.ts`, `ReminderTokenHelper.ts`, `Api/src/shared/modules/DoingModuleGateway.ts` |
| Editoren für Erinnerungen (B1Admin) | `serving/components/PlanTypeReminderEdit.tsx`, `calendars/components/EventReminderEdit.tsx`, `serving/tasks/components/TaskReminderEdit.tsx`, `hooks/useTextingEnabled.ts` |
| Editor für Erinnerungen / Einstellungen (B1App) | `EventReminderEdit.tsx`, `NotificationPrefsPage.tsx`, `useRealtimeNotifications.ts` |

## Verwandte Seiten

- [Echtzeit-Architektur](../realtime.md) — das WebSocket-Protokoll und die Client-Bausteine (`SocketHelper`, `SubscriptionManager`, `ConversationStore`), auf denen die In-App-Zustellung aufsetzt
- [Web-Push-Benachrichtigungen](../web-push.md) — VAPID-Einrichtung und der Browser-Push-Weg für die Push-Stufe
- [Messaging-Endpunkte](../api/endpoints/messaging.md) — die vollständige REST-Oberfläche für Nachrichten, Unterhaltungen, Verbindungen sowie Benachrichtigungs- und Erinnerungsrouten
