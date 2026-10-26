---
title: "Architektur für Benachrichtigungen und Erinnerungen"
---

# Architektur für Benachrichtigungen und Erinnerungen

<div class="article-intro">

Jede Nachricht, die ein Gemeindemitglied außerhalb der Seite sieht, auf der es sich gerade befindet – ein Badge-Zähler, eine Push-Benachrichtigung, eine Zusammenfassungs-E-Mail –, durchläuft eine von zwei Schnittstellen in der MessagingApi. Diese Seite beschreibt diesen Trichter, die Erinnerungs-Engine, die ihn nach Zeitplan speist, und das Einstellungsmodell, das bestimmt, was eine Person tatsächlich erreicht.

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

1. **Alles, was einer Person etwas mitteilt**, läuft über `NotificationHelper.createNotifications()` im Messaging-Modul. Es speichert eine Zeile in `notifications` und eskaliert über Socket → Push → E-Mail, wobei `PreferenceGateHelper` für jeden Kanal ausgewertet wird – einschließlich `in_app` auf Stufe 0.
2. **Alles, was geplant ist**, ist eine `reminderDefinition` (auf Entitätsebene oder Bereichsebene), die in `reminderOccurrences` aufgelöst und von `ReminderEngine.scan()` über einen wiederkehrenden Timer verarbeitet wird. Ein Expander, ein Dispatcher, ein Sendeprotokoll (`reminderSentLog`).
3. **Direkte E-Mails** gibt es nur über `TransactionalEmailHelper.sendTransactional()`. Eine ESLint-Regel erzwingt dies zur Kompilierzeit – siehe unten.

:::tip Die E-Mail-Tür wird per Lint erzwungen, nicht nur per Konvention
`Api/tools/eslint-rules/email-door.cjs` definiert `no-direct-email-helper`: Jeder Aufruf von `EmailHelper.sendTemplatedEmail()` oder `EmailHelper.sendEmail()` außerhalb von `NotificationHelper.ts` oder `TransactionalEmailHelper.ts` schlägt beim Lint fehl. Wenn Sie eine E-Mail senden müssen, leiten Sie sie über den Trichter (`createNotifications` mit `emailImmediate`) oder über `TransactionalEmailHelper.sendTransactional()` – einen dritten Weg, der die CI besteht, gibt es nicht.
:::

## Der Benachrichtigungstrichter

`NotificationHelper.createNotifications()` ist der einzige Einstiegspunkt für alles, was weder geplant noch transaktional ist:

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

Für jeden Empfänger wird eine Zeile in `notifications` gespeichert und `attemptDeliveryWithEscalation` aufgerufen, das die unten beschriebene Kanalkette durchläuft. Eine noch ungelesene Zeile für dasselbe `(contentType, contentId)` verhindert eine erneute Erstellung. Diese Deduplizierungsprüfung entfällt bei `emailImmediate`-Sendungen (Erinnerungszeitpunkte, „E-Mail an alle“ durch Mitarbeitende, Workflow-Schritte, die ihre eigene Deduplizierung haben) und bei Direktnachrichten, die immer den Socket anstoßen.

`shared/helpers/NotificationService.ts` spiegelt dieselbe Signatur (`NotificationServiceOptions`) für Aufrufer außerhalb des Messaging-Moduls und wird beim Start beim Messaging-Modul registriert.

## Kanalkette für die Zustellung

Die Zustellung beginnt auf einer Stufe (standardmäßig 0 oder höher für Erinnerungen und explizite Sendungen) und geht nur dann zum nächsten Kanal über, wenn der vorherige nicht erfolgreich war. Jede Stufe wird von `PreferenceGateHelper` geprüft, bevor überhaupt ein Versuch unternommen wird.

| Stufe | Kanal | Verhalten |
|-------|-------|-----------|
| 0 | **in_app / socket** | Zuerst wird das `in_app`-Gate geprüft. Wenn die Zustellung unterdrückt ist (stummgeschaltet), wird die Zeile mit `isNew=false` gespeichert, und die Zustellung endet vollständig – kein Socket-Impuls, kein Badge, keine weitere Eskalation. Andernfalls sucht der Server nach offenen Socket-Verbindungen für den `alerts`-Raum der Person und sendet einen `notification`- (oder `privateMessage`-)Frame. Bei gewöhnlichen Benachrichtigungen beendet eine erfolgreiche Socket-Zustellung die Kette an dieser Stelle – der 30-Minuten-Timer prüft ungelesene Einträge später erneut und eskaliert sie. Direktnachrichten enden nie am Socket: Eine installierte PWA kann den Alerts-Socket im Hintergrund offen halten, was sonst die Push-Benachrichtigung auf Betriebssystemebene unterdrücken würde. |
| 1 | **push** | Abhängig von `allowPush`, der Abmeldung pro Kategorie und den Ruhezeiten. Sendet an Expo-Push-Token und Web-Push-Abonnements, die in den `devices`-Zeilen der Person gefunden werden; dabei wird nach Endpunkt dedupliziert und veraltete Token werden bereinigt. |
| 2 | **email** | Abhängig von `emailFrequency` und der Abmeldung pro Kategorie. Sofortige Sendungen (`emailImmediate`) werden direkt gerendert und schreiben eine Zeile in `deliveryLogs`; andernfalls bleibt die Benachrichtigung für die unten beschriebene Sammel-Zusammenfassung ausstehend. |
| — | **sms** | Keine Stufe in der Eskalationskette. Der einzige geprüfte SMS-Auslöser ist die Erinnerungs-Engine: Wenn die `channels` einer Definition `sms` enthalten, sendet `ReminderEngine.sendSms()` jeder Empfängerin bzw. jedem Empfänger **zusätzlich zur** Push- bzw. E-Mail-Benachrichtigung eine Textnachricht (siehe [Textnachrichten als Erinnerung](#text-reminders)). Massen-SMS (`TextingController` / `@churchapps/texting`), die Aktion **Text Volunteers** in der Dienstübersicht (`MatrixTextHelper` → `MessagingModuleGateway.sendPersonText`) und die Workflow-Aktion **Send Text** (`StepActionHelper.sendText` → `sendPersonText`) senden alle direkt über den Anbieter der Gemeinde. Benachrichtigungseinstellungen und Ruhezeiten gelten für sie daher nicht – nur das Kennzeichen `optedOut` der Person wird berücksichtigt. |

Ungelesene Benachrichtigungen, die auf Socket- oder Push-Ebene stehen geblieben sind, werden vom 30-Minuten-Timer (`NotificationHelper.escalateDelivery`) eskaliert. Sammel-E-Mails versendet `NotificationHelper.sendEmailNotifications(frequency)`, gesteuert durch die `emailFrequency`-Einstellung jeder Person: `individual` läuft über den 30-Minuten-Timer, `daily` läuft beim nächtlichen Timer. (`weekly` ist ein gültiger Einstellungswert, hat aber noch keinen eigenen Sammellauf.)

## Erinnerungs-Engine

Geplante Erinnerungen – Veranstaltungserinnerungen, Fälligkeitstermine für Aufgaben, Erinnerungen zu Dienst- und Planzuweisungen – laufen alle über eine einzige verallgemeinerte Engine und nicht über eigene Cron-Logik für jede Funktion.

```
reminderDefinitions ──expand──▶ reminderOccurrences ──scan (30 min)──▶ createNotifications()
     │                                  │                                    │
     ▼                                  ▼                                    ▼
 entity- or scope-level          one row per (definition,              deliveryStartLevel: 1
 offsets/channels/message        entity, occurrence, offset)           + reminderSentLog ledger
```

**Definitionen** (`reminderDefinitions`) sind entweder auf Entitätsebene (`entityId` gesetzt – ein bestimmtes Ereignis, eine Aufgabe oder ein Plan) oder auf Bereichsebene (`entityId` null, `scopeId` gesetzt – z. B. jeder Plan unter einem Dienstplantyp). Eine Definition enthält eine kommagetrennte Liste von Minutenversätzen (`offsets`, z. B. `"1440,60"` für einen Tag und eine Stunde vorher), eine lokale Sendezeit (`sendLocalTime`), eine kommagetrennte Liste von Kanälen (`channels` – `email` löst bei Sendung sofort eine aufwendig gestaltete E-Mail aus), einen `recipientMode` und optional eine eigene `message`.

**Expansion** erzeugt Auslöse-Zeilen für den vorausliegenden Horizont (ein rollierendes Fenster von mehreren Tagen). Sie läuft beim nächtlichen Timer und synchron bei jedem Speichern einer Definition, damit auch eine Erinnerung für ein kurzfristiges Ereignis ausgelöst wird. Bereichsdefinitionen werden über den `loadScopeEntities` des Adapters aufgefächert, wobei für jede konkrete Entität eine eigene Menge an Vorkommen entsteht. Vorkommen auf Entitätsebene verwenden den Schlüssel `definitionId:occurrenceISO:offset`, während Vorkommen im Bereich nach Entitäts-ID namensgebunden sind, damit sie nie kollidieren. Das Upsert eines Vorkommens **belebt** eine zuvor abgebrochene Zeile wieder – Abbrechen und erneutes Expandieren ist der Standardweg, eine Erinnerung nach einer Änderung an der zugrunde liegenden Entität neu abzugleichen. Zeilen mit dem Status `sent`, `failed` oder `processing` bleiben unverändert.

**Versand** (`ReminderEngine.scan()`) läuft über den 30-Minuten-Timer. Er beansprucht fällige Vorkommen (ein Lease verhindert doppelte Verarbeitung), lädt Empfänger über den Adapter der Entität, filtert alle heraus, die bereits in `reminderSentLog` für dieses Vorkommen erfasst sind, und ruft `createNotifications` mit `deliveryStartLevel: 1` (direkt zu Push) sowie `emailImmediate`/`emailByPerson` auf, wenn die Kanäle der Definition E-Mail enthalten.

### Textnachrichten als Erinnerung

Wenn die `channels` einer Definition `sms` enthalten, ruft `scan()` nach dem Erstellen der Push- und E-Mail-Benachrichtigungen `ReminderEngine.sendSms()` für dieselben neuen Empfänger auf. Textnachrichten sind pro Mitglied eine Opt-in-Option:

- Jeder Empfänger durchläuft `PreferenceGateHelper.evaluate(..., "sms", ...)`, daher muss `allowSms` aktiviert sein (standardmäßig ist es deaktiviert und wird über den Schalter **Text messages** in B1App gesetzt), und der Kanal `sms` der Kategorie darf nicht abgeschaltet sein. `event_reminders`, `serving_schedule` und `tasks` führen `sms` sowohl in `defaultChannels` als auch in `allowedChannels`.
- Personen ohne `mobilePhone` oder mit gesetztem `optedOut` werden unterdrückt. Hat die Gemeinde keinen Textnachrichten-Anbieter, wird der restliche Stapel mit dem Grund `no_provider` unterdrückt.
- Der Text wird von `ReminderEngine.smsBody()` erstellt: `"<Church name>: <message> Reply STOP to opt out."`, gekürzt auf ein einziges 160-Zeichen-Segment.
- Jeder Empfänger erhält eine eigene `reminderSentLog`-Zeile mit `channel: "sms"` und dem Status `sent` / `suppressed` / `failed`. Sie wird getrennt von der Push- bzw. E-Mail-Zeile geführt, sodass eine fehlgeschlagene Textnachricht nie Push oder E-Mail erneut auslöst.

Im Editor wird **Text** nur angeboten, wenn `GET /messaging/texting/status` `{ enabled: true }` zurückgibt (der erste Textnachrichten-Anbieter der Gemeinde ist aktiviert).

**STOP-Abmeldung.** `POST /messaging/texting/inbound/:churchId/:token` ist ein anonymer Webhook, den die Gemeinde in ihren Anbieter einträgt (B1Admin zeigt die URL aus `GET /messaging/texting/inboundUrl` in den Texteinstellungen an). Das Token ist ein HMAC der Gemeinde-ID (`SmsOptOutHelper.token`). `SmsOptOutHelper.parse` akzeptiert Formularfelder im Twilio-Stil sowie JSON im Clearstream-/TextInChurch-Stil. Lautet die Antwort exakt auf ein Carrier-Stoppwort (`STOP`, `STOPALL`, `UNSUBSCRIBE`, `CANCEL`, `END`, `QUIT`, `OPTOUT`, `REVOKE`), erhält jede nicht entfernte Person der Gemeinde, deren Mobilnummer übereinstimmt, `people.optedOut = true` und `allowSms = false`. Andere Antworten werden bestätigt und ignoriert.

Ein internes Event-Bus reagiert auf Änderungen an Entitäten, ohne auf die nächtliche Expansion zu warten: Inhaltsereignisse (über den Webhook-Dispatcher) sowie Ereignisse zur Aktualisierung von Plänen und Aufgaben lösen sofortige Neuexpansion oder Abbruch für die betroffene Entität aus, und eine Planaktualisierung expandiert außerdem alle Bereichsdefinitionen neu, die mit dem Plantyp verknüpft sind.

### Adapter

Die Engine ist entitätsunabhängig; jeder unterstützte Entitätstyp wird über einen Adapter (`helpers/adapters/`) angebunden:

| Entitätstyp | Adapter | Hinweise |
|-------------|---------|----------|
| `event` | `EventReminderAdapter` | Empfänger sind je nach Ereignis und `recipientMode` auf Anmeldungen oder Gruppenmitglieder beschränkt. |
| `plan` | `PlanReminderAdapter` | Empfänger sind die Zusagen (Accepted) und unbestätigten (Unconfirmed) Zuweisungen in veröffentlichten (nicht entwurfsartigen) Plänen. Unbestätigte Zuweisungen, die über einen Dienstbestätigungs-Workflow ausgestellt wurden, sind ausgeschlossen, bis sie angenommen werden (siehe unten). `buildEmails` ruft `DoingModuleGateway.buildPlanReminderEmails` auf, das Positionen, Notizen und eine eigene Nachricht über `doing/helpers/PlanReminderEmailHelper` rendert – einschließlich Schaltflächen zum Annehmen bzw. Ablehnen, die von `ReminderTokenHelper` signiert sind und an einen öffentlichen Endpunkt für Zuweisungsantworten senden. |
| `task` | `TaskReminderAdapter` | Empfänger sind die zugewiesenen Personen der Aufgabe. |

### Endpunkte

| Methode | Pfad | Zweck |
|---------|------|-------|
| `GET` / `POST` | `/messaging/reminders/:entityType/:entityId` | Erinnerungsdefinition für eine Entität laden oder speichern. |
| `GET` / `POST` | `/messaging/reminders/scope/:entityType/:scopeId` | Erinnerungsdefinition auf Bereichsebene (geerbt) laden oder speichern. |
| `DELETE` | `/messaging/reminders/:defId` | Definition löschen und ihre ausstehenden Vorkommen abbrechen. |
| `GET` | `/messaging/reminders/event/:eventId/preview` | Vorschau der Empfängeranzahl und nächsten Auslösezeitpunkte für eine Veranstaltungserinnerung vor dem Speichern. |
| `GET` | `/messaging/reminders/log` | Jüngster Verlauf der Erinnerungsvorkommen einer Gemeinde. |
| `POST` | `/messaging/reminders/mute` | Erinnerungen für eine bestimmte Entität stummschalten. |

Beim Speichern einer Definition wird die Expansion für diese Entität bzw. diesen Bereich synchron neu ausgeführt, damit Bearbeitende die aktuellen „nächsten Auslösungen“ sehen, ohne auf den nächtlichen Lauf zu warten.

## Direktnachrichten

Direktnachrichten laufen über denselben Trichter wie alles andere und nicht über einen eigenen Eskalationsweg. Jede ungelesene Unterhaltung erhält eine **Schattenzeile** in `notifications` (`contentType='privateMessage'`, `contentId` = die ID der Privatnachricht, `category='direct_messages'`), die den gesamten Zustellungsstatus verwaltet – Socket-/Push-/E-Mail-Eskalation, Lesestatus, alles. Die Tabelle `privateMessages` selbst speichert den Nachrichteninhalt und eine Spalte `notifyPersonId`; diese ist die Quelle des Badges für ungelesene Nachrichten und wird gelöscht, sobald die Empfängerin bzw. der Empfänger die Unterhaltung liest.

Schattenzeilen sind in der Glockenansicht für Benachrichtigungen unsichtbar: Sie sind von der Abfrage der ungelesenen Anzahl, der Abfrage der Benachrichtigungsliste und den Abfragen zum Als-gelesen-Markieren bzw. Löschen ausgeschlossen, die alle nach `contentType <> 'privateMessage'` filtern. Jede Direktnachricht-Benachrichtigung trifft unabhängig vom Lesestatus den Socket (Live-Chat-Semantik – keine Deduplizierung), und Direktnachrichten enden nie am Socket wie gewöhnliche Benachrichtigungen, da eine im Hintergrund laufende PWA einen Socket offen halten kann und dennoch eine Push-Benachrichtigung auf Betriebssystemebene benötigt. Stummschaltet eine Person Direktnachricht-Benachrichtigungen, wird die Schattenzeile geparkt (`isNew=false`, `notifyPersonId` gelöscht) – innerhalb der Unterhaltung selbst bleibt sie sichtbar, nur ohne Badges oder Warnungen.

## Einstellungen und Freigabe

Jeder Versand durchläuft `PreferenceGateHelper.evaluate()`, eine reine Funktion (der gesamte Zustand wird übergeben, keine Datenbankaufrufe im kritischen Pfad), die `allow`, `suppress` oder `defer` zurückgibt. Die Ebenen werden der Reihe nach geprüft, und die erste Ebene, die eine Entscheidung trifft, gewinnt:

1. **Gesperrte Kategorie** – einige Kategorien sind verpflichtend (Stufe 0) und umgehen alle anderen Ebenen.
2. **Generelle Stummschaltung / Kanalabschaltung** – `masterMute`, `allowPush`, `allowSms` (standardmäßig aus – Mitglieder müssen sich aktiv anmelden) oder `emailFrequency='never'` unterdrücken sofort.
3. **Ruhezeiten** – nur für Push und SMS (E-Mail gilt als nicht aufdringlich). Liegt die aktuelle Uhrzeit in der Zeitzone der Person innerhalb ihres Ruhefensters, kommt eine transaktionale Kategorie trotzdem durch; eine nicht-transaktionale wird bis zum Ende des Ruhefensters verschoben. Dieses Ende wird über `TimezoneHelper.wallClockToUtc` als zeitumstellungssicherer UTC-Zeitpunkt berechnet.
4. **Einstellung pro Kategorie** – eine ausdrückliche Abmeldung für eine Kombination aus Kategorie und Kanal; fehlt sie, gilt der Standardwert der Kategorie.
5. **Stummschaltung pro Entität** – eine für eine bestimmte Entität (z. B. ein Ereignis oder einen Plan) hinterlegte Stummschaltung schränkt stärker ein als die Einstellung auf Kategorieebene, gilt aber nur, wenn der Aufrufer zusammen mit der Benachrichtigung eine Entitäts-ID und einen Entitätstyp übergibt.

Beteiligte Tabellen: `notificationPreferences` (global – `masterMute`, `emailFrequency` mit den Werten `individual|daily|weekly|never`, `allowPush`, Ruhefenster und Zeitzone, `allowSms`), `notificationPreferenceOverrides` (pro Kategorie und Kanal) und `notificationEntityMutes` (pro Entität).

Dieses Gate wird für In-App- (Stufe 0), Push- (Stufe 1) und E-Mail-Benachrichtigungen (Stufe 2) innerhalb des Trichters durchgesetzt – einschließlich sofortiger Erinnerungs- und Zusammenfassungs-E-Mails – sowie für Erinnerungs-SMS in `ReminderEngine.sendSms()`. Transaktionale E-Mails (Anmeldecodes, Passwortzurücksetzungen, Einladungen, Spendenquittungen) umgehen es bewusst; genau dafür gibt es die zweite Tür.

### Dienstbestätigungs-Workflows

Ein Plan kann einen Workflow vom Typ `workflowType = "assignmentConfirmation"` verwenden (`plans.confirmationWorkflowId`). Dann ruft „Veröffentlichen/Benachrichtigen“ `POST /doing/plans/:id/issueRequests` auf, statt die Benachrichtigung pro Zuweisung zu senden: Jede neue unbestätigte Zuweisung erhält `notified` und `confirmationWorkflowId` sowie eine Workflow-Karte (`tasks.assignmentId`, eindeutiger `followupKey`). Die Karte sendet eine reine App-Benachrichtigung (`appOnly: true` – keine Eskalation über Push oder E-Mail) und führt anschließend die Aktionen `sendAssignmentRequest` des Workflows aus. Diese laufen über `MessagingModuleGateway.sendServingWorkflowMessage`: E-Mail über `NotificationHelper.sendWorkflowEmail` (Freigabe-Gate + `ChurchEmailLimiter`, erfasst als `workflowEmail`), SMS über `sendPersonText` nur bei `allowSms` und der Freigabe der Kategorie `serving_schedule`. Annehmen/Ablehnen (`assignment.updated` auf dem Event-Bus) schließt die Karte; der 30-Minuten-Timer (`AssignmentWorkflowHelper.processPending`) holt verpasste Starts und Ereignisse nach und wandelt eine unbeantwortete Anfrage nach Ablauf der Nachfrist in eine Prüfaufgabe für die Leitung um. Vollständiger Lebenszyklus: `Api/docs/assignment-confirmation-workflows.md`.

## Von der Gemeinde verfasste E-Mails – Limits

E-Mails mit Inhalten, die eine Gemeinde verfasst hat, werden über die gemeinsame SES-Identität von ChurchApps versendet. Daher wird ihr Volumen pro Gemeinde durch `Api/src/shared/helpers/ChurchEmailLimiter.ts` gemessen. Vier Pfade nutzen diesen Limiter: Gruppen- und Vorlagenversand (`EmailTemplateController`, Inhaltstyp `email`), Nachfass-E-Mails zu Formularen (`FormSubmissionController`, `formFollowUp`), Workflow-Aktionen **Send email** (`NotificationHelper` mit `churchAuthored`, `workflowEmail`) und E-Mails mit Dienstbestätigungsanfragen (`NotificationHelper.sendWorkflowEmail`, `workflowEmail`). Systemmails (Anmeldecodes, Quittungen, Erinnerungen) sowie Rollen- und Gruppeneinladungen (`UserController.sendInviteEmail`, eine feste Vorlage) werden nicht gemessen.

- **Freigabe-Gate.** Eine Gemeinde versendet nichts, bis ein Serveradministrator `churches.emailApprovedDate` setzt (`POST /membership/churches/:id/emailApproval`, Server Admin → Churches → Chip **Group Email**). Archivierte Gemeinden sind immer gesperrt. Der Dialog „Send Email“ in B1Admin liest `GET /messaging/emailTemplates/sendStatus` (`approved`, `paused`, `remaining`, `requested`) und zeigt bei fehlender Freigabe eine Karte **Request review** anstelle des Editors. Der Workflow-Schritt-Editor liest denselben Endpunkt (zugänglich für `tasks.admin` ebenso wie für `groupMembers.edit`), um bei **Send email**-Aktionen zu warnen, wenn die Gemeinde nicht freigegeben oder pausiert ist. Zum Versandzeitpunkt gibt `MessagingModuleGateway.sendTemplatedEmail` `false` zurück, ohne eine Benachrichtigung anzulegen, wenn `ChurchEmailLimiter.remaining()` kleiner als 1 ist – so zeigt der Verlauf der Karte nie **Email sent** für eine verworfene Mail. `POST /messaging/emailTemplates/requestApproval` sendet höchstens einmal pro Gemeinde und Woche eine E-Mail an den Support.
- **Verdientes Kontingent.** Eine freigegebene Gemeinde erhält `max(150, 2 × ihr bester Tag mit von der Gemeinde verfassten E-Mails in den vorherigen 30 Tagen)`, begrenzt auf 2.000 pro rollierenden 24 Stunden. Die laufenden 24 Stunden werden bei der Ermittlung des „besten Tages“ ausgenommen, damit ein Versandstoß nicht sein eigenes Limit erhöhen kann.
- **Reservieren, dann abrechnen.** `reserve()` schreibt vor dem Versand eine Zeile in `deliveryLogs` pro Empfänger, prüft das Kontingent erneut unter Berücksichtigung dieser Zeilen und nimmt die Reservierung zurück, wenn zwei Anfragen die Grenze gleichzeitig überschritten haben (der Versand liefert dann 429). `settle()` markiert jede Zeile als gesendet oder fehlgeschlagen.
- **Pause bei Beschwerden.** Die Lambda-Funktion `sesFeedback` (`Api/src/lambda/ses-feedback-handler.ts`, gespeist von SES → SNS) ordnet jede dauerhafte Zustellungsablehnung (Bounce) oder Beschwerde derjenigen Gemeinde zu, deren von der Gemeinde verfasste E-Mail um diese Zeit diese Adresse erreichte, und speichert sie als `deliveryMethod` `sesBounce` / `sesComplaint`. Eine Gemeinde wird bei 2 oder mehr Beschwerden (≥ 0,3 % der Sendungen) oder 10 oder mehr harten Bounces (≥ 5 %) innerhalb von 7 Tagen pausiert.

## Zeitplanung

Sowohl die Erinnerungs-Engine als auch die Zusammenfassung der Benachrichtigungen nutzen bestehende geplante Timer, statt neue Infrastruktur einzuführen:

| Timer | Zeitplan | Läuft |
|-------|----------|-------|
| 30-Minuten-Timer | alle 30 Minuten | Ungelesene Benachrichtigungen eskalieren; Zusammenfassungs-E-Mails mit Häufigkeit `individual` senden; fällige Erinnerungsvorkommen verarbeiten (`ReminderEngine.scan`); Freigabe-Zusammenfassungen; fällige Automatisierungsausführungen |
| Nächtlicher Timer | 05:00 UTC | Erinnerungen zur Gruppenanwesenheit; wiederkehrende Streaming-Gottesdienste fortschreiben; automatisch aktualisierte Listen aktualisieren; Erinnerungsvorkommen für den nächsten Horizont expandieren (`ReminderEngine.expandAll`); Zusammenfassungs-E-Mails mit Häufigkeit `daily` senden |

Lokal kann dieselbe Logik bei Bedarf über `npm run timer:30min` und `npm run timer:midnight` im Projekt `Api` ausgelöst werden.

## Dateiübersicht

| Bereich | Dateien |
|---------|---------|
| Trichter | `Api/src/modules/messaging/helpers/NotificationHelper.ts`, `PreferenceGateHelper.ts`, `NotificationCategoryHelper.ts`, `WebPushHelper.ts`, `ExpoPushHelper.ts`, `SocketHelper.ts`, `DeliveryHelper.ts` |
| Gemeinsamer Einstieg | `Api/src/shared/helpers/NotificationService.ts` |
| Transaktionale Tür | `Api/src/shared/helpers/TransactionalEmailHelper.ts`, Lint-Regel `Api/tools/eslint-rules/email-door.cjs` |
| E-Mail-Limits der Gemeinde | `Api/src/shared/helpers/ChurchEmailLimiter.ts`, `Api/src/lambda/ses-feedback-handler.ts`, `Api/src/modules/messaging/repositories/DeliveryLogRepo.ts` |
| Erinnerungs-Engine | `Api/src/modules/messaging/helpers/ReminderEngine.ts`, `ReminderBootstrap.ts`, `helpers/adapters/*`, `controllers/ReminderController.ts` |
| Textnachrichten / STOP-Abmeldung | `Api/src/modules/messaging/helpers/SmsOptOutHelper.ts`, `controllers/TextingController.ts` (`/status`, `/inboundUrl`, `/inbound/:churchId/:token`), `Api/src/modules/doing/helpers/MatrixTextHelper.ts` (Dienstübersicht **Text Volunteers**) |
| Repositories für Erinnerungen | `Api/src/modules/messaging/repositories/ReminderDefinitionRepo.ts`, `ReminderOccurrenceRepo.ts`, `ReminderSentLogRepo.ts` |
| E-Mails zu Diensten/Plänen | `Api/src/modules/doing/helpers/PlanReminderEmailHelper.ts`, `ReminderTokenHelper.ts`, `Api/src/shared/modules/DoingModuleGateway.ts` |
| Editoren für Erinnerungen (B1Admin) | `serving/components/PlanTypeReminderEdit.tsx`, `calendars/components/EventReminderEdit.tsx`, `serving/tasks/components/TaskReminderEdit.tsx`, `hooks/useTextingEnabled.ts` |
| Editor für Erinnerungen / Einstellungen (B1App) | `EventReminderEdit.tsx`, `NotificationPrefsPage.tsx`, `useRealtimeNotifications.ts` |

## Verwandte Seiten

- [Echtzeit-Architektur](../realtime) – das WebSocket-Protokoll und die Client-Bausteine (`SocketHelper`, `SubscriptionManager`, `ConversationStore`), auf denen die Zustellung innerhalb der App aufsetzt
- [Web-Push-Benachrichtigungen](../web-push) – VAPID-Einrichtung und der Browser-Push-API-Pfad, der für die Push-Eskalationsstufe verwendet wird
- [Nachrichten-Endpunkte](../api/endpoints/messaging) – vollständige REST-Schnittstelle für Nachrichten, Unterhaltungen, Verbindungen sowie Benachrichtigungs- und Erinnerungsrouten
