---
title: "Architektur für Benachrichtigungen & Erinnerungen"
description: "Wie die B1-Admin-API Benachrichtigungen, geplante Erinnerungen, E-Mail-Limits der Gemeinde und Abmeldungen von Texten über eine gemeinsame Zustellung und eine Präferenzprüfung leitet."
---

# Architektur für Benachrichtigungen & Erinnerungen

<div class="article-intro">

Jede Nachricht, die ein Gemeindemitglied außerhalb der Seite sieht, die es gerade betrachtet -- ein Abzeichen mit Anzahl, eine Push-Benachrichtigung, eine Zusammenfassungs-E-Mail -- durchläuft eine von zwei Türen im MessagingApi. Diese Seite dokumentiert den Trichter, die Erinnerungsengine, die ihn nach Zeitplan speist, und das Präferenzmodell, das entscheidet, was eine Person tatsächlich erreicht.

</div>

## Überblick -- zwei Türen {#overview--two-doors}

```
scheduled anything ──▶ ReminderEngine (definitions → occurrences → scan) ─┐
scheduled staff push ─▶ scheduledNotifications (1-minute timer) ───────────┤
chat / requests / workflow / bulk sends ──────────────────────────────────┼─▶ createNotifications()
                                                                          │    in_app gate → socket → push → email
     (reminder channels include sms) ──▶ ReminderEngine.sendSms() ──▶ sms gate → sendPersonText() via church provider
provider STOP reply ──▶ POST /messaging/texting/inbound/:churchId/:token ──▶ SmsOptOutHelper.optOut()
account/legal mail ──▶ TransactionalEmailHelper.sendTransactional()  [allowlisted, lint-enforced]
```

1. **Alles, was einer Person etwas mitteilt**, läuft über `NotificationHelper.createNotifications()` im Messaging-Modul. Es speichert eine Zeile in `notifications` und eskaliert über Socket → Push → E-Mail, wobei `PreferenceGateHelper` für jeden Kanal ausgewertet wird -- einschließlich `in_app` auf Stufe 0.
2. **Alles, was geplant ist**, ist eine `reminderDefinition` (auf Ebene einer Entität oder eines Bereichs), die in `reminderOccurrences` expandiert und von `ReminderEngine.scan()` auf einem wiederkehrenden Timer versendet wird. Ein Expander, ein Versender, ein Sendeprotokoll (`reminderSentLog`). Die einzige Ausnahme ist ein Push des Personals, der über die Seite **Mobil > Push-Benachrichtigungen** im B1Admin oder den Dialog **Benachrichtigen** einer Gruppe geplant wird: Er ist eine Zeile in `scheduledNotifications` (Zielgruppe `church` oder `group`) und wird von `ScheduledNotificationHelper.dispatchDue()` auf dem Minuten-Timer gesendet. Eine Zeile, die mehr als 30 Minuten nach ihrem `sendAt` beim ersten Versuch noch nicht gesendet wurde, wird als fehlgeschlagen mit `missed send window` markiert statt verspätet gesendet, und ein fehlgeschlagener Versand wird bis zu 3-mal wiederholt. Empfänger werden zur Sendezeit von `PushAudienceHelper` aufgelöst, demselben Helfer, den der sofortige Gruppenversand nutzt, und über `createNotifications()` als `churchPushNotification` (Präferenzkategorie `announcements`) oder `groupPushNotification` zugestellt.
3. **Direkte E-Mail** existiert nur hinter `TransactionalEmailHelper.sendTransactional()`. Eine ESLint-Regel erzwingt dies zur Kompilierzeit -- siehe unten.

:::tip Die E-Mail-Tür wird durch Lint erzwungen, nicht nur durch Konvention
`Api/tools/eslint-rules/email-door.cjs` definiert `no-direct-email-helper`: Jeder Aufruf von `EmailHelper.sendTemplatedEmail()` oder `EmailHelper.sendEmail()` außerhalb von `NotificationHelper.ts` oder `TransactionalEmailHelper.ts` schlägt beim Lint fehl. Wenn du eine E-Mail senden musst, leite sie über den Trichter (`createNotifications` mit `emailImmediate`) oder über `TransactionalEmailHelper.sendTransactional()` -- einen dritten Weg, der die CI besteht, gibt es nicht.
:::

## Der Benachrichtigungstrichter {#the-notification-funnel}

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

Für jeden Empfänger speichert sie eine Zeile in `notifications` und ruft `attemptDeliveryWithEscalation` auf, das die unten stehende Kanalleiter durchläuft. Eine noch ungelesene Zeile für dasselbe `(contentType, contentId)` unterdrückt das erneute Anlegen -- diese Deduplizierung entfällt bei `emailImmediate`-Versänden (Erinnerungs-Offsets, "Allen E-Mail senden" des Personals, Workflow-Schritte, die ihre eigene Deduplizierung haben) und bei Direktnachrichten, die immer den Socket anstoßen.

`shared/helpers/NotificationService.ts` spiegelt dieselbe Signatur (`NotificationServiceOptions`) für Aufrufer außerhalb des Messaging-Moduls und wird beim Start beim Messaging-Modul registriert.

## Kanalleiter bei der Eskalation {#channel-escalation-chain}

Die Zustellung beginnt auf einer Stufe (standardmäßig 0, bei Erinnerungen oder expliziten Versänden höher) und geht nur dann zum nächsten Kanal weiter, wenn der vorherige nicht erfolgreich war. Jede Stufe wird von `PreferenceGateHelper` geprüft, bevor etwas versucht wird.

| Stufe | Kanal | Verhalten |
|-------|---------|----------|
| 0 | **in_app / socket** | Zuerst wird das `in_app`-Gate geprüft. Ist es unterdrückt (stummgeschaltet), wird die Zeile mit `isNew=false` gespeichert und die Zustellung stoppt vollständig -- kein Socket-Ping, kein Abzeichen, keine weitere Eskalation. Andernfalls sucht der Server offene Socket-Verbindungen im Raum `alerts` der Person und sendet einen Frame `notification` (oder `privateMessage`). Bei gewöhnlichen Benachrichtigungen beendet eine erfolgreiche Socket-Zustellung die Kette hier -- der 30-Minuten-Timer prüft ungelesene Einträge erneut und eskaliert sie später. Direktnachrichten enden nie beim Socket: Eine installierte PWA kann den Alerts-Socket im Hintergrund offen halten, was sonst die Push-Benachrichtigung auf Betriebssystemebene unterdrücken würde. |
| 1 | **push** | Gesteuert durch `allowPush` / Abmeldung der Kategorie / Ruhezeiten. Sendet an Expo-Push-Token und Web-Push-Abonnements, die in den Zeilen `devices` der Person gefunden werden; dabei wird nach Endpunkt dedupliziert und veraltete Token werden entfernt. |
| 2 | **email** | Gesteuert durch `emailFrequency` und die Abmeldung der Kategorie. Sofortige Versände (`emailImmediate`) werden direkt gerendert und schreiben eine Zeile in `deliveryLogs`; andernfalls bleibt die Benachrichtigung für die Sammelzusammenfassung ausstehend, wie unten beschrieben. |
| -- | **sms** | Keine Stufe in der Eskalationsleiter. Der einzige geprüfte SMS-Erzeuger ist die Erinnerungsengine: Enthalten die `channels` einer Definition `sms`, sendet `ReminderEngine.sendSms()` jedem Empfänger **zusätzlich** zur Push-/E-Mail-Benachrichtigung eine SMS (siehe [Texterinnerungen](#text-reminders)). Massen-Texting (`TextingController` / `@churchapps/texting`), der Versand **Volunteers per Text** aus der Dienstübersicht (`MatrixTextHelper` → `MessagingModuleGateway.sendPersonText`) und die Workflow-Aktion **Text senden** (`StepActionHelper.sendText` → `sendPersonText`) senden alle direkt über den Anbieter der Gemeinde. Benachrichtigungseinstellungen und Ruhezeiten gelten dafür nicht -- nur das Flag `optedOut` der Person wird berücksichtigt. |

Ungelesene Benachrichtigungen, die bei Socket oder Push stehen geblieben sind, eskaliert der 30-Minuten-Timer (`NotificationHelper.escalateDelivery`). Die Sammel-E-Mail versendet `NotificationHelper.sendEmailNotifications(frequency)`, gesteuert durch die `emailFrequency`-Einstellung jeder Person: `individual` läuft auf dem 30-Minuten-Timer, `daily` läuft auf dem nächtlichen Timer. (`weekly` ist ein gültiger Einstellungswert, hat aber noch keinen eigenen Sammellauf.)

## Erinnerungsengine {#reminder-engine}

Geplante Erinnerungen -- Veranstaltungserinnerungen, Fälligkeitstermine von Aufgaben, Erinnerungen an Dienst- und Planeinteilungen -- laufen alle über eine verallgemeinerte Engine statt über eigene Cron-Logik je Funktion.

```
reminderDefinitions ──expand──▶ reminderOccurrences ──scan (30 min)──▶ createNotifications()
     │                                  │                                    │
     ▼                                  ▼                                    ▼
 entity- or scope-level          one row per (definition,              deliveryStartLevel: 1
 offsets/channels/message        entity, occurrence, offset)           + reminderSentLog ledger
```

**Definitionen** (`reminderDefinitions`) sind entweder auf Entitätsebene (`entityId` gesetzt -- eine bestimmte Veranstaltung, Aufgabe oder ein Plan) oder auf Bereichsebene (`entityId` null, `scopeId` gesetzt -- z. B. jeder Plan unter einem Dienstplan-Typ). Eine Definition enthält eine kommagetrennte Liste von Minuten-Offsets (`offsets`, z. B. `"1440,60"` für einen Tag und eine Stunde vorher), eine lokale Sendezeit (`sendLocalTime`), eine kommagetrennte Liste von Kanälen (`channels` -- `email` löst zur Sendezeit eine sofortige formatierte E-Mail aus), einen `recipientMode` und eine optionale eigene Nachricht.

**Expansion** legt Auslöse-Zeilen für den Zeitraum voraus an (ein rollierendes Fenster über mehrere Tage). Sie läuft auf dem nächtlichen Timer und synchron, sobald eine Definition gespeichert wird, damit auch eine Erinnerung für eine kurzfristige Veranstaltung ausgelöst wird. Bereichsdefinitionen werden über `loadScopeEntities` des Adapters verteilt, wobei für jede konkrete Entität ein eigener Satz Vorkommen entsteht; Vorkommen auf Entitätsebene verwenden den Schlüssel `definitionId:occurrenceISO:offset`, Vorkommen im Bereich werden nach Entitäts-ID getrennt, sodass sie nie kollidieren. Das Anlegen eines Vorkommens **belebt** eine zuvor stornierte Zeile wieder -- Stornieren und erneutes Expandieren ist der Standardweg, eine Erinnerung nach einer Änderung der zugrunde liegenden Entität erneut abzugleichen; Zeilen, die bereits `sent`, `failed` oder `processing` sind, bleiben unberührt.

**Versand** (`ReminderEngine.scan()`) läuft auf dem 30-Minuten-Timer. Er beansprucht fällige Vorkommen (eine Lease verhindert doppelte Verarbeitung), lädt die Empfänger über den Adapter der Entität, filtert alle heraus, die für dieses Vorkommen bereits in `reminderSentLog` stehen, und ruft `createNotifications` mit `deliveryStartLevel: 1` auf (direkt zu Push) sowie `emailImmediate`/`emailByPerson`, wenn die Kanäle der Definition E-Mail enthalten.

### Texterinnerungen {#text-reminders}

Enthalten die `channels` einer Definition `sms`, ruft `scan()` nach den Push-/E-Mail-Benachrichtigungen `ReminderEngine.sendSms()` für dieselben neuen Empfänger auf. Texte sind pro Mitglied eine Zustimmungssache:

- Jeder Empfänger durchläuft `PreferenceGateHelper.evaluate(..., "sms", ...)`, daher muss `allowSms` eingeschaltet sein (es ist standardmäßig aus und wird über den Schalter **Textnachrichten** in der B1App gesetzt), und der Kanal `sms` der Kategorie darf nicht abgeschaltet sein. `event_reminders`, `serving_schedule` und `tasks` führen `sms` sowohl in `defaultChannels` als auch in `allowedChannels`.
- Personen ohne `mobilePhone` oder mit gesetztem `optedOut` werden unterdrückt. Hat die Gemeinde keinen Texting-Anbieter, wird der Rest des Stapels mit dem Grund `no_provider` unterdrückt.
- Der Text wird von `ReminderEngine.smsBody()` gebaut: `"<Church name>: <message> Reply STOP to opt out."`, gekürzt auf ein Segment von 160 Zeichen.
- Jeder Empfänger erhält eine eigene Zeile in `reminderSentLog` mit `channel: "sms"` und dem Status `sent` / `suppressed` / `failed`, getrennt vom Push-/E-Mail-Eintrag geführt, sodass eine fehlgeschlagene SMS nie Push oder E-Mail erneut auslöst.

Editoren bieten **Text** nur an, wenn `GET /messaging/texting/status` `{ enabled: true }` zurückgibt (der erste Texting-Anbieter der Gemeinde ist aktiviert).

**Abmeldung per STOP.** `POST /messaging/texting/inbound/:churchId/:token` ist ein anonymer Webhook, den die Gemeinde beim Anbieter einträgt (B1Admin zeigt die URL aus `GET /messaging/texting/inboundUrl` in den Texting-Einstellungen). Das Token ist ein HMAC der Gemeinde-ID (`SmsOptOutHelper.token`). `SmsOptOutHelper.parse` akzeptiert Formularfelder im Twilio-Stil sowie JSON im Clearstream-/TextInChurch-Stil. Ist die Antwort genau ein Stopp-Wort des Netzbetreibers (`STOP`, `STOPALL`, `UNSUBSCRIBE`, `CANCEL`, `END`, `QUIT`, `OPTOUT`, `REVOKE`), erhält jede nicht entfernte Person der Gemeinde, deren Mobilnummer übereinstimmt, `people.optedOut = true` und `allowSms = false`. Andere Antworten werden bestätigt und ignoriert.

Ein internes Ereignis-Bus reagiert auf Änderungen an Entitäten, ohne auf die nächtliche Expansion zu warten: Inhaltsereignisse (über den Webhook-Dispatcher) sowie Plan- und Aufgaben-Update-Ereignisse lösen sofortige Neuexpansion oder Stornierung für die betroffene Entität aus, und ein Plan-Update expandiert außerdem alle Bereichsdefinitionen neu, die an seinen Plantyp gebunden sind.

### Adapter {#adapters}

Die Engine ist entitätsunabhängig; jeder unterstützte Entitätstyp wird über einen Adapter (`helpers/adapters/`) angebunden:

| Entitätstyp | Adapter | Hinweise |
|-------------|---------|----------|
| `event` | `EventReminderAdapter` | Empfänger sind je nach Veranstaltung und `recipientMode` auf Anmeldungen oder Gruppenmitglieder beschränkt. |
| `plan` | `PlanReminderAdapter` | Empfänger sind angenommene und unbestätigte Einteilungen in veröffentlichten (nicht entwurfsförmigen) Plänen. Unbestätigte Einteilungen, die über einen Bestätigungsworkflow für Dienste ausgestellt wurden, sind ausgeschlossen, bis sie angenommen werden (siehe unten). `buildEmails` ruft `DoingModuleGateway.buildPlanReminderEmails` auf, das Positionen, Notizen und eine eigene Nachricht über `doing/helpers/PlanReminderEmailHelper` rendert, einschließlich Schaltflächen Annehmen/Ablehnen, die von `ReminderTokenHelper` signiert werden und an einen öffentlichen Endpunkt für die Antwort auf Einteilungen senden. |
| `task` | `TaskReminderAdapter` | Empfänger sind die Verantwortlichen der Aufgabe. |

### Endpunkte {#endpoints}

| Methode | Pfad | Zweck |
|---------|------|-------|
| `GET` / `POST` | `/messaging/reminders/:entityType/:entityId` | Lädt oder speichert die Erinnerungsdefinition für eine Entität. |
| `GET` / `POST` | `/messaging/reminders/scope/:entityType/:scopeId` | Lädt oder speichert eine Erinnerungsdefinition auf Bereichsebene (geerbt). |
| `DELETE` | `/messaging/reminders/:defId` | Löscht eine Definition und storniert ihre ausstehenden Vorkommen. |
| `GET` | `/messaging/reminders/event/:eventId/preview` | Zeigt vor dem Speichern die Empfängeranzahl und die nächsten Auslösezeiten einer Veranstaltungserinnerung. |
| `GET` | `/messaging/reminders/log` | Verlauf der letzten Erinnerungsvorkommen einer Gemeinde. |
| `POST` | `/messaging/reminders/mute` | Stummschalten von Erinnerungen für eine bestimmte Entität. |

Das Speichern einer Definition löst eine synchrone Neuexpansion für die Entität oder den Bereich aus, sodass Editoren aktuelle "nächste Auslösungen" sehen, ohne auf den nächtlichen Lauf zu warten.

## Direktnachrichten {#direct-messages}

Direktnachrichten laufen über denselben Trichter wie alles andere, statt über einen eigenen Eskalationspfad. Jede ungelesene Unterhaltung erhält eine **Schattenzeile** in `notifications` (`contentType='privateMessage'`, `contentId` = die ID der privaten Nachricht, `category='direct_messages'`), die den gesamten Zustellstatus besitzt -- Eskalation über Socket/Push/E-Mail, Lesestatus, alles. Die Tabelle `privateMessages` selbst speichert die Nachrichtendaten und eine Spalte `notifyPersonId`; sie ist die Quelle des Abzeichens für ungelesene Nachrichten und wird gelöscht, sobald der Empfänger die Unterhaltung liest.

Schattenzeilen sind in der Glocke für Benachrichtigungen unsichtbar: Sie werden in der Abfrage der ungelesenen Anzahl, der Abfrage der Benachrichtigungsliste und den Abfragen zum Als-gelesen-Markieren und Löschen ausgeschlossen, die alle `contentType <> 'privateMessage'` filtern. Jeder DM-Ping erreicht den Socket unabhängig vom Lesestatus (Live-Chat-Semantik -- keine Deduplizierung), und Direktnachrichten enden nie bei der Socket-Zustellung wie gewöhnliche Benachrichtigungen, da eine im Hintergrund laufende PWA den Socket offen halten kann und dennoch eine Push-Benachrichtigung auf Betriebssystemebene braucht. Schaltet eine Person Benachrichtigungen für Direktnachrichten stumm, wird die Schattenzeile geparkt (`isNew=false`, `notifyPersonId` gelöscht) -- innerhalb der Unterhaltung selbst weiterhin sichtbar, nur ohne Abzeichen oder Alarme.

## Präferenzen und Gating {#preferences--gating}

Jeder Versand durchläuft `PreferenceGateHelper.evaluate()`, eine reine Funktion (der gesamte Zustand wird übergeben, keine Datenbankaufrufe im heißen Pfad), die `allow`, `suppress` oder `defer` zurückgibt. Die Schichten laufen in dieser Reihenfolge, und die erste, die entscheidet, gewinnt:

1. **Gesperrte Kategorie** -- einige Kategorien sind verpflichtend (Stufe 0) und umgehen alle anderen Schichten.
2. **Generelle Stummschaltung / Kanal-Aus** -- `masterMute`, `allowPush`, `allowSms` (standardmäßig aus -- Mitglieder stimmen zu) oder `emailFrequency='never'` unterdrücken sofort.
3. **Ruhezeiten** -- nur Push und SMS (E-Mail gilt als nicht störend). Liegt die aktuelle Wanduhrzeit in der Zeitzone der Person im Ruhefenster, kommt eine transaktionale Kategorie trotzdem durch; eine nicht transaktionale wird bis zum Ende des Ruhefensters aufgeschoben, berechnet als zeitzonenkorrekter UTC-Zeitpunkt über `TimezoneHelper.wallClockToUtc`.
4. **Präferenz-Überschreibung je Kategorie** -- eine ausdrückliche Abmeldung für ein Paar Kategorie × Kanal; fehlt sie, gilt der Standard der Kategorie.
5. **Stummschaltung je Entität** -- eine Stummschaltung für eine bestimmte Entität (z. B. eine Veranstaltung oder ein Plan) schränkt stärker ein als die Einstellung auf Kategorieebene, gilt aber nur, wenn der Aufrufer zusammen mit der Benachrichtigung eine Entitäts-ID und einen Entitätstyp angibt.

Beteiligte Tabellen: `notificationPreferences` (global -- `masterMute`, `emailFrequency` mit `individual|daily|weekly|never`, `allowPush`, das Ruhezeitfenster mit Zeitzone, `allowSms`), `notificationPreferenceOverrides` (je Kategorie × Kanal) und `notificationEntityMutes` (je Entität).

Dieses Gating wird für In-App (Stufe 0), Push (Stufe 1) und E-Mail (Stufe 2) innerhalb des Trichters durchgesetzt -- einschließlich sofortiger Erinnerungs- und Zusammenfassungs-E-Mails -- und für Erinnerungs-SMS in `ReminderEngine.sendSms()`. Transaktionale E-Mails (Anmeldecodes, Passwort-Zurücksetzungen, Einladungen, Spendenbelege) umgehen es absichtlich; genau dafür gibt es die zweite Tür.

### Bestätigungsworkflows für Dienste {#serving-confirmation-workflows}

Ein Plan kann sich für einen Workflow `workflowType = "assignmentConfirmation"` entscheiden (`plans.confirmationWorkflowId`). Veröffentlichen/Benachrichtigen ruft dann `POST /doing/plans/:id/issueRequests` statt der Benachrichtigung je Einteilung auf: Jede neue unbestätigte Einteilung erhält `notified` und `confirmationWorkflowId` sowie eine Workflow-Karte (`tasks.assignmentId`, eindeutiger `followupKey`). Die Karte sendet einen reinen App-Alarm (`appOnly: true` -- keine Eskalation über Push/E-Mail) und führt dann die Aktionen `sendAssignmentRequest` des Workflows aus, die über `MessagingModuleGateway.sendServingWorkflowMessage` laufen: E-Mail über `NotificationHelper.sendWorkflowEmail` (Präferenz-Gate + `ChurchEmailLimiter`, gezählt als `workflowEmail`), SMS über `sendPersonText` nur mit `allowSms` und dem Gate der Kategorie `serving_schedule`. Annehmen/Ablehnen (`assignment.updated` auf dem Ereignis-Bus) schließt die Karte; der 30-Minuten-Timer (`AssignmentWorkflowHelper.processPending`) repariert verpasste Starts und Ereignisse und wandelt eine unbeantwortete Anfrage nach Ablauf der Nachfrist in eine Prüfaufgabe für Leiter um. Vollständiger Lebenszyklus: `Api/docs/assignment-confirmation-workflows.md`.

## E-Mail-Limits der Gemeinde {#church-authored-email-limits}

E-Mails, deren Inhalt eine Gemeinde verfasst hat, werden über die gemeinsame SES-Identität von ChurchApps versendet und daher pro Gemeinde über `Api/src/shared/helpers/ChurchEmailLimiter.ts` gezählt. Vier Pfade nutzen ihn: Gruppen- und Vorlagenversand (`EmailTemplateController`, Inhaltstyp `email`), Nachfass-E-Mails zu Formularen (`FormSubmissionController`, `formFollowUp`), Workflow-Aktionen **E-Mail senden** (`NotificationHelper` mit `churchAuthored`, `workflowEmail`) und E-Mails mit Bestätigungsanfragen für Dienste (`NotificationHelper.sendWorkflowEmail`, `workflowEmail`). Systemmails (Anmeldecodes, Belege, Erinnerungen) sowie Rollen- und Gruppeneinladungen (`UserController.sendInviteEmail`, eine feste Vorlage) werden nicht gezählt.

- **Freigabe-Gate.** Eine Gemeinde versendet nichts, bis ein Serveradministrator `churches.emailApprovedDate` setzt (`POST /membership/churches/:id/emailApproval`, Serveradministration → Gemeinden → Chip **Gruppen-E-Mail**). Archivierte Gemeinden sind immer gesperrt. Der Dialog E-Mail senden im B1Admin liest `GET /messaging/emailTemplates/sendStatus` (`approved`, `paused`, `remaining`, `requested`) und zeigt bei fehlender Freigabe eine Karte **Prüfung anfordern** statt des Editors. Der Workflow-Schritt-Editor liest denselben Endpunkt (offen für `tasks.admin` wie für `groupMembers.edit`), um bei **E-Mail senden**-Aktionen zu warnen, wenn die Gemeinde nicht freigegeben oder pausiert ist. Zur Sendezeit gibt `MessagingModuleGateway.sendTemplatedEmail` `false` zurück, ohne eine Benachrichtigung anzulegen, wenn `ChurchEmailLimiter.remaining()` unter 1 liegt, damit der Verlauf der Karte nie **E-Mail gesendet** für verworfene Mails meldet. `POST /messaging/emailTemplates/requestApproval` schreibt dem Support, höchstens einmal pro Gemeinde und Woche.
- **Verdientes Kontingent.** Eine freigegebene Gemeinde erhält `max(150, 2 × ihr bester Tag mit eigenen E-Mails in den letzten 30 Tagen)`, begrenzt auf 2.000 pro gleitenden 24 Stunden. Die laufenden 24 Stunden werden beim "besten Tag" ausgeklammert, damit ein Ausbruch nicht sein eigenes Limit anhebt.
- **Reservieren, dann abrechnen.** `reserve()` schreibt vor dem Versand eine Zeile in `deliveryLogs` pro Empfänger, prüft das Kontingent erneut mit diesen Zeilen und zieht sich zurück, wenn zwei Anfragen das Limit gleichzeitig überschritten haben (der Versand liefert dann 429). `settle()` markiert jede Zeile als gesendet oder fehlgeschlagen.
- **Pause bei Beschwerden.** Die Lambda `sesFeedback` (`Api/src/lambda/ses-feedback-handler.ts`, gespeist von SES → SNS) ordnet jeden dauerhaften Bounce oder jede Beschwerde der Gemeinde zu, deren E-Mail mit eigenem Inhalt um diese Zeit diese Adresse erreichte, und speichert sie als `deliveryMethod` `sesBounce` / `sesComplaint`. Eine Gemeinde wird bei 2 oder mehr Beschwerden (≥ 0,3 % der Versände) oder 10 oder mehr harten Bounces (≥ 5 %) innerhalb von 7 Tagen pausiert.

## Zeitplanung {#scheduling}

Sowohl die Erinnerungsengine als auch die Benachrichtigungs-Zusammenfassung laufen auf bestehenden geplanten Timern, statt neue Infrastruktur einzuführen:

| Timer | Zeitplan | Läuft |
|-------|----------|-------|
| 30-Minuten-Timer | alle 30 Minuten | Eskaliert ungelesene Benachrichtigungen; versendet Zusammenfassungs-E-Mails mit Häufigkeit `individual`; löst fällige Erinnerungsvorkommen aus (`ReminderEngine.scan`); Genehmigungs-Zusammenfassungen; fällige Automatisierungsläufe |
| 1-Minuten-Timer (`timerWebhooks`) | jede Minute | Sendet fällige geplante Push-Benachrichtigungen (`ScheduledNotificationHelper.dispatchDue`, Job `scheduledNotifications`) |
| Nächtlicher Timer | 05:00 UTC | Anwesenheitserinnerungen für Gruppen; wiederkehrende Streaming-Gottesdienste weiterschalten; automatisch aktualisierte Listen erneuern; Erinnerungsvorkommen für den nächsten Horizont expandieren (`ReminderEngine.expandAll`); Zusammenfassungs-E-Mails mit Häufigkeit `daily` senden |

Lokal lässt sich dieselbe Logik auf Abruf mit `npm run timer:30min` und `npm run timer:midnight` aus dem Projekt `Api` auslösen.

## Dateiübersicht {#file-inventory}

| Bereich | Dateien |
|------|---------|
| Trichter | `Api/src/modules/messaging/helpers/NotificationHelper.ts`, `PreferenceGateHelper.ts`, `NotificationCategoryHelper.ts`, `WebPushHelper.ts`, `ExpoPushHelper.ts`, `SocketHelper.ts`, `DeliveryHelper.ts` |
| Gemeinsamer Einstieg | `Api/src/shared/helpers/NotificationService.ts` |
| Transaktionale Tür | `Api/src/shared/helpers/TransactionalEmailHelper.ts`, Lint-Regel `Api/tools/eslint-rules/email-door.cjs` |
| E-Mail-Limits der Gemeinde | `Api/src/shared/helpers/ChurchEmailLimiter.ts`, `Api/src/lambda/ses-feedback-handler.ts`, `Api/src/modules/messaging/repositories/DeliveryLogRepo.ts` |
| Erinnerungsengine | `Api/src/modules/messaging/helpers/ReminderEngine.ts`, `ReminderBootstrap.ts`, `helpers/adapters/*`, `controllers/ReminderController.ts` |
| Texting / Abmeldung per STOP | `Api/src/modules/messaging/helpers/SmsOptOutHelper.ts`, `controllers/TextingController.ts` (`/status`, `/inboundUrl`, `/inbound/:churchId/:token`), `Api/src/modules/doing/helpers/MatrixTextHelper.ts` (Dienstübersicht **Volunteers per Text**) |
| Repositories für Erinnerungen | `Api/src/modules/messaging/repositories/ReminderDefinitionRepo.ts`, `ReminderOccurrenceRepo.ts`, `ReminderSentLogRepo.ts` |
| Dienst-/Plan-E-Mail | `Api/src/modules/doing/helpers/PlanReminderEmailHelper.ts`, `ReminderTokenHelper.ts`, `Api/src/shared/modules/DoingModuleGateway.ts` |
| Erinnerungs-Editoren (B1Admin) | `serving/components/PlanTypeReminderEdit.tsx`, `calendars/components/EventReminderEdit.tsx`, `serving/tasks/components/TaskReminderEdit.tsx`, `hooks/useTextingEnabled.ts` |
| Erinnerungs-Editor / Präferenzen (B1App) | `EventReminderEdit.tsx`, `NotificationPrefsPage.tsx`, `useRealtimeNotifications.ts` |

## Verwandte Seiten {#related-pages}

- [Echtzeit-Architektur](../realtime.md) -- das WebSocket-Protokoll und die Client-Bausteine (`SocketHelper`, `SubscriptionManager`, `ConversationStore`), auf denen die Zustellung in der App aufsetzt
- [Web-Push-Benachrichtigungen](../web-push.md) -- VAPID-Einrichtung und der Browser-Push-Pfad für die Push-Eskalationsstufe
- [Messaging-Endpunkte](../api/endpoints/messaging.md) -- vollständige REST-Schnittstelle für Nachrichten, Unterhaltungen, Verbindungen sowie Benachrichtigungs- und Erinnerungsrouten
