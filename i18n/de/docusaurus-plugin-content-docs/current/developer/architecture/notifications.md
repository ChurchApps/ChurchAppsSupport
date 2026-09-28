---
title: "Benachrichtigungen & Erinnerungen Architektur"
---

# Benachrichtigungen & Erinnerungen Architektur

<div class="article-intro">

Jede Nachricht, die ein Kirchenmitglied außerhalb der Seite sieht, die es gerade anschaut – ein Badge-Count, eine Push-Benachrichtigung, eine Digest-E-Mail – durchläuft eine von zwei Türen in der MessagingApi. Diese Seite dokumentiert den Trichter, die Erinnerungsmaschine, die ihn nach einem Zeitplan speist, und das Präferenzmodell, das entscheidet, was eine Person tatsächlich erreicht.

</div>

## Übersicht – zwei Türen

```
scheduled anything ──▶ ReminderEngine (definitions → occurrences → scan) ─┐
chat / requests / workflow / bulk sends ──────────────────────────────────┼─▶ createNotifications()
                                                                          │    in_app gate → socket → push → email (→ sms slot)
account/legal mail ──▶ TransactionalEmailHelper.sendTransactional()  [allowlisted, lint-enforced]
```

1. **Alles, das einer Person etwas mitteilt** geht durch `NotificationHelper.createNotifications()` im Messaging-Modul. Es bleibt eine `notifications`-Zeile bestehen und eskaliert Socket → Push → E-Mail, wobei `PreferenceGateHelper` pro Kanal ausgewertet wird – einschließlich `in_app` auf Ebene 0.
2. **Alles Geplante** ist eine `reminderDefinition` (Entitäts-Ebene oder Umfangs-Ebene), die in `reminderOccurrences` erweitert und von `ReminderEngine.scan()` auf einem wiederkehrenden Timer versandt wird. Ein Expander, ein Dispatcher, ein Send-Ledger (`reminderSentLog`).
3. **Direkte E-Mail** existiert nur hinter `TransactionalEmailHelper.sendTransactional()`. Eine ESLint-Regel erzwingt dies zur Compile-Zeit – siehe unten.

:::tip Die E-Mail-Tür ist lint-erzwungen, nicht nur eine Konvention
`Api/tools/eslint-rules/email-door.cjs` definiert `no-direct-email-helper`: Jeder Aufruf von `EmailHelper.sendTemplatedEmail()` oder `EmailHelper.sendEmail()` außerhalb von `NotificationHelper.ts` oder `TransactionalEmailHelper.ts` schlägt lint fehl. Wenn Sie eine E-Mail senden müssen, leiten Sie sie durch den Trichter (`createNotifications` mit `emailImmediate`) oder durch `TransactionalEmailHelper.sendTransactional()` – es gibt keine dritte Möglichkeit, die CI passiert.
:::

## Der Benachrichtigungstrichter

`NotificationHelper.createNotifications()` ist der einzelne Einstiegspunkt für alles, das nicht geplant oder transaktional ist:

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

Für jeden Empfänger speichert es eine Zeile in `notifications` und ruft `attemptDeliveryWithEscalation` auf, die die Kanalleiter unten hinuntergeht. Eine noch ungelesene Zeile für das gleiche `(contentType, contentId)` unterdrückt Neuerstellung – dieser Dedup-Schutz wird bei `emailImmediate`-Sends übersprungen (Reminder-Offsets, Personal "E-Mail an alle", Workflow-Schritte besitzen ihre eigene Dedup) und für direkte Nachrichten, die immer das Socket pingen.

`shared/helpers/NotificationService.ts` spiegelt die gleiche Signatur (`NotificationServiceOptions`) für Aufrufer außerhalb des Messaging-Moduls und ist beim Boot mit dem Messaging-Modul registriert.

## Kanaleskala tionkette

Die Bereitstellung beginnt auf einer Ebene (Standard 0, oder höher für Erinnerungen/explizite Sends) und schreitet nur zum nächsten Kanal vor, wenn der vorherige nicht erfolgreich war. Jede Ebene wird vor dem Versuch durch `PreferenceGateHelper` abgesperrt.

| Ebene | Kanal | Verhalten |
|-------|---------|----------|
| 0 | **in_app / socket** | Das `in_app`-Gate wird zuerst überprüft. Wenn es unterdrückt wird (stummgeschaltet), bleibt die Zeile mit `isNew=false` bestehen und die Zustellung stoppt vollständig – kein Socket-Ping, kein Badge, keine weitere Eskalation. Andernfalls schaut der Server nach offenen Socket-Verbindungen für den `alerts`-Room der Person und sendet einen `notification`- (oder `privateMessage`-) Frame. Bei gewöhnlichen Benachrichtigungen stoppt eine erfolgreiche Socket-Zustellung die Kette hier – der 30-Minuten-Timer überprüft ungelesene Elemente erneut und eskaliert sie später. Direkte Nachrichten stoppen nie beim Socket: Eine installierte PWA kann den Alerts-Socket im Hintergrund offen halten, was andernfalls den OS-Level-Push unterdrücken würde. |
| 1 | **push** | Gated auf `allowPush` / Kategorie Opt-out / ruhige Stunden. Sendet an beide Expo-Push-Token und Web-Push-Abos, die in den `devices`-Zeilen der Person gefunden wurden, dedupliziert nach Endpunkt und bereinigt veraltete Token unterwegs. |
| 2 | **email** | Gated auf `emailFrequency` und Kategorie Opt-out. Unmittelbare Sends (`emailImmediate`) werden sofort gerendert und schreiben eine `deliveryLogs`-Zeile; andernfalls bleibt die Benachrichtigung für die Batch-Digest ausstehend, die unten beschrieben wird. |
| — | **sms** | Präferenzinstallation (`allowSms`, per-Kategorie-Kanallisten) berücksichtigt bereits einen SMS-Kanal, aber kein Producer sendet heute durch ihn – er bleibt für das Bulk-SMS-Produkt reserviert, das als separater, isolierter Fluss über `TextingController` / `@churchapps/texting` läuft. |

Ungelesene Benachrichtigungen, die bei Socket oder Push verbleiben, werden durch den 30-Minuten-Timer eskaliert (`NotificationHelper.escalateDelivery`). Batch-E-Mail wird von `NotificationHelper.sendEmailNotifications(frequency)` gesendet, angetrieben von der `emailFrequency`-Präferenz jeder Person: `individual` läuft auf dem 30-Minuten-Timer, `daily` läuft auf dem nächtlichen Timer. (`weekly` ist ein gültiger Präferenzwert, hat aber noch keine dedizierte Batch-Run.)

## Erinnerungsmaschine

Geplante Erinnerungen – Ereignis-Erinnerungen, Aufgaben-Fälligkeitsdaten, Bedienung/Plan-Zuweisungs-Erinnerungen – gehen alle durch eine verallgemeinerte Maschine anstatt besprechter Pro-Feature-Cron-Logik.

```
reminderDefinitions ──expand──▶ reminderOccurrences ──scan (30 min)──▶ createNotifications()
     │                                  │                                    │
     ▼                                  ▼                                    ▼
 entity- or scope-level          one row per (definition,              deliveryStartLevel: 1
 offsets/channels/message        entity, occurrence, offset)           + reminderSentLog ledger
```

**Definitionen** (`reminderDefinitions`) sind entweder Entitäts-Ebene (`entityId` gesetzt – ein spezifisches Ereignis, eine Aufgabe oder ein Plan) oder Umfangs-Ebene (`entityId` null, `scopeId` gesetzt – z.B. jeder Plan unter einem Bedienungs-Plan-Typ). Eine Definition trägt eine CSV von Minuten-Offsets (`offsets`, z.B. `"1440,60"` für ein Tag und eine Stunde davor), eine lokale Sendezeit (`sendLocalTime`), eine CSV von Kanälen (`channels` – einschließlich `email` löst eine unmittelbare Rich-E-Mail zum Sendzeitpunkt aus), einen `recipientMode` und eine optionale benutzerdefinierte `message`.

**Erweiterung** materialisiert Fire-Zeilen für den Horizont voraus (ein rollendes Mehrtagsfenster). Sie läuft auf dem nächtlichen Timer und synchron, wenn eine Definition gespeichert wird, damit eine Erinnerung für ein Last-Minute-Ereignis immer noch feuert. Umfangsdefinitionen verteilen sich über den `loadScopeEntities` des Adapters, erzeugen einen Vorkommen-Satz pro konkrete Entität; Entitäts-Ebene Vorkommen verwenden den Schlüssel `definitionId:occurrenceISO:offset`, während scoped Vorkommen nach Entitäts-ID namensprägen, damit sie nie kollidieren. Das Upsert eines Auftretens **weckt** eine zuvor gelöschte Zeile – cancel-then-re-expand ist die Standardmethode, eine Erinnerung nach dem Ändern der zugrunde liegenden Entität neu zu synchronisieren; Zeilen, die bereits `sent`, `failed` oder `processing` sind, werden unberührt gelassen.

**Dispatch** (`ReminderEngine.scan()`) läuft auf dem 30-Minuten-Timer. Es beansprucht fällige Vorkommen (ein Mietvertrag verhindert doppelte Verarbeitung), lädt Empfänger durch den Adapter der Entität, filtert jeden aus, der bereits in `reminderSentLog` für diesen Auftritt aufgezeichnet ist, und ruft `createNotifications` mit `deliveryStartLevel: 1` auf (überspringen Sie direkt zum Push) plus `emailImmediate`/`emailByPerson`, wenn die Definitionskanäle E-Mail einschließen.

Ein interner Ereignisbus reagiert auf Entitätsmutationen, ohne auf die nächtliche Erweiterung zu warten: Content-Ereignisse (über den Webhook-Dispatcher) und Plan-/Aufgaben-Update-Ereignisse auslösen unmittelbare Wiederexpansion oder Stornierung für die betroffene Entität, und eine Plan-Aktualisierung re-expands auch alle Umfangsdefinitionen, die an ihren Plan-Typ gebunden sind.

### Adapter

Die Maschine ist Entitäts-agnostisch; jeder unterstützte Entitätstyp steckt über einen Adapter ein (`helpers/adapters/`):

| Entitätstyp | Adapter | Notizen |
|-------------|---------|-------|
| `event` | `EventReminderAdapter` | Empfänger umfasst die Anmeldung oder Gruppenmitglieder, je nach Ereignis und `recipientMode`. |
| `plan` | `PlanReminderAdapter` | Empfänger sind Akzeptiert + Unbestätigte Plan-Zuweisungen. `buildEmails` ruft in `DoingModuleGateway.buildPlanReminderEmails` ein, die Positionen, Notizen und eine benutzerdefinierte Nachricht über `doing/helpers/PlanReminderEmailHelper` rendert, einschließlich Accept/Decline-Schaltflächen, die von `ReminderTokenHelper` signiert sind und zu einem öffentlichen Zuweisungs-Antwort-Endpunkt gepostet werden. |
| `task` | `TaskReminderAdapter` | Empfänger sind die Auftraggeber der Aufgabe. |

### Endpunkte

| Methode | Pfad | Zweck |
|--------|------|---------|
| `GET` / `POST` | `/messaging/reminders/:entityType/:entityId` | Lade oder speichere die Erinnerungsdefinition für eine Entität. |
| `GET` / `POST` | `/messaging/reminders/scope/:entityType/:scopeId` | Lade oder speichere eine Umfangs-Ebene (geerbte) Erinnerungsdefinition. |
| `DELETE` | `/messaging/reminders/:defId` | Lösche eine Definition und storniere ihre ausstehenden Vorkommen. |
| `GET` | `/messaging/reminders/event/:eventId/preview` | Vorschau des Empfängerzählers und der nächsten Feuerzeitpunkte für eine Ereignis-Erinnerung vor dem Speichern. |
| `GET` | `/messaging/reminders/log` | Letzte Erinnerungs-Vorkommen-Historie für eine Kirche. |
| `POST` | `/messaging/reminders/mute` | Stumme Erinnerungen für eine spezifische Entität. |

Das Speichern einer Definition löst eine synchrone Wiederexpansion für diese Entität oder diesen Umfang aus, damit Redakteure aktuelle "nächste Brände" ohne Warten auf den nächtlichen Job sehen.

## Direkte Nachrichten

Direkte Nachrichten fahren durch denselben Trichter wie alles andere anstatt eines separaten Eskalationspfads. Jede ungelesene Unterhaltung erhält eine **Schattlinie** in `notifications` (`contentType='privateMessage'`, `contentId` = die Private-Message-ID, `category='direct_messages'`), die den gesamten Zustellungsstatus – Socket/Push/E-Mail-Eskalation, Leseverfolgung, alles – besitzt. Die `privateMessages`-Tabelle selbst behält die Nachrichtennutzlast und eine `notifyPersonId`-Spalte, die die Quelle des ungelesenen Badges ist und gelöscht wird, wenn der Empfänger die Unterhaltung liest.

Schattlinien sind unsichtbar für die Benachrichtigungsglocke: Sie werden aus der ungelesenen Zählabfrage, der Benachrichtigungslisten-Abfrage und den Markierungs-Lese-/Lösch-Abfragen ausgeschlossen, die alle `contentType <> 'privateMessage'` filtern. Jeder DM-Ping trifft das Socket unabhängig vom ungelesenen Zustand (Live-Chat-Semantik – keine Dedup), und DMs stoppen nie bei Socket-Zustellung so wie gewöhnliche Benachrichtigungen, da eine backgroundete PWA einen Socket offen halten kann, während sie immer noch einen OS-Level-Push benötigt. Wenn eine Person DM-Benachrichtigungen stummschaltet, wird die Schattlinie geparkt (`isNew=false`, `notifyPersonId` gelöscht) – immer noch in der Unterhaltung selbst sichtbar, nur ohne Badges oder Warnungen.

## Präferenzen & Gating

Jeder Send durchläuft `PreferenceGateHelper.evaluate()`, eine reine Funktion (alle State übergeben, keine DB-Aufrufe auf der heißen Bahn), die `allow`, `suppress` oder `defer` zurückgibt. Die Ebenen laufen der Reihe nach, und die erste, die entscheidet, gewinnt:

1. **Gesperrte Kategorie** – einige Kategorien sind obligatorisch (Tier 0) und umgehen jede andere Ebene.
2. **Master-Stumm / Kanal-Killaktion** – `masterMute`, `allowPush`, `allowSms` oder `emailFrequency='never'` unterdrücken rundheraus.
3. **Stille Stunden** – nur Push und SMS (E-Mail wird als nicht aufdringlich angesehen). Falls die aktuelle Wanduhr in der Zeitzone der Person in ihr stilles Fenster fällt, erreicht eine transaktionale Kategorie; eine nicht-transaktionale wird bis zum Ende des stillen Fensters aufgeschoben, berechnet als DST-korrekter UTC-Augenblick über `TimezoneHelper.wallClockToUtc`.
4. **Per-Kategorie-Präferenz-Überschreibung** – ein explizites Opt-out für ein Kategorie × Kanalpaar; Abwesenheit bedeutet das Kategorien-Standard.
5. **Per-Entitäts-Stumm** – eine auf eine spezifische Entität aufgezeichnete Stummschaltung (z.B. ein Ereignis, ein Plan) beschränkt sich weiter als die Kategorie-Ebenen-Einstellung, gilt aber nur, wenn der Aufrufer eine Entitäts-ID/Typ neben der Benachrichtigung bereitstellt.

Beteiligte Tabellen: `notificationPreferences` (global – `masterMute`, `emailFrequency` von `individual|daily|weekly|never`, `allowPush`, stille Stunden Fenster + Zeitzone, `allowSms`), `notificationPreferenceOverrides` (pro Kategorie × Kanal) und `notificationEntityMutes` (pro Entität).

Dieses Gate wird durchgesetzt für in-app (Ebene 0), Push (Ebene 1) und E-Mail (Ebene 2) im Trichter – einschließlich unmittelbare Erinnerungs-/Digest-E-Mails. Transaktionale E-Mail (Authentifizierungscodes, Passwort-Rücksetzungen, Einladungen, Spendeneingänge) umgeht sie absichtlich; das ist der ganze Punkt der zweiten Tür.

## Kirchen-autorgebundene E-Mail-Limits

E-Mail, deren Inhalt eine Kirche schrieb, wird von der gemeinsamen ChurchApps SES-Identität gesendet, daher wird sie pro Kirche durch `Api/src/shared/helpers/ChurchEmailLimiter.ts` gemessen. Vier Pfade rufen es auf: Gruppen-/Template-Sends (`EmailTemplateController`, Inhaltstyp `email`), Form-Folge-E-Mails (`FormSubmissionController`, `formFollowUp`), Workflow **E-Mail senden** Aktionen (`NotificationHelper` mit `churchAuthored`, `workflowEmail`) und B1-Kontoinvites (`UserController.sendInviteEmail`, `invite`). System-Mail (Auth-Codes, Eingänge, Erinnerungen) wird nicht gemessen.

- **Genehmigungsgate.** Eine Kirche sendet nichts, bis ein Server-Admin `churches.emailApprovedDate` setzt (`POST /membership/churches/:id/emailApproval`, Server-Admin → Kirchen → **Gruppen-E-Mail** Chip). Archivierte Kirchen werden immer blockiert. B1Admins E-Mail senden Dialog liest `GET /messaging/emailTemplates/sendStatus` (`approved`, `paused`, `remaining`, `requested`) und zeigt bei fehlender Genehmigung eine **Genehmigung anfordern** Karte anstelle des Editors. `POST /messaging/emailTemplates/requestApproval` E-Mails unterstützen, höchstens einmal pro Kirche pro Woche.
- **Verdiente Zulage.** Eine genehmigte Kirche erhält `max(150, 2 × ihren besten Kirchen-autorisierten Tag in den vorangegangenen 30 Tagen)`, begrenzt auf 2.000 pro rollende 24 Stunden. Die aktuellen 24 Stunden werden aus „bester Tag" ausgeschlossen, damit ein Burst nicht sein eigenes Limit erhöhen kann.
- **Reservieren, dann abrechnen.** `reserve()` schreibt eine `deliveryLogs`-Zeile pro Empfänger vor dem Senden, prüft die Zulage mit diesen Zeilen gezählt erneut und zieht sich zurück, wenn zwei Anfragen die Grenze überschritten (der Send gibt 429 zurück). `settle()` markiert jede Zeile gesendet oder fehlgeschlagen.
- **Beschwerdepause.** Die `sesFeedback` Lambda (`Api/src/lambda/ses-feedback-handler.ts`, von SES → SNS gefüttert) heftet jeden permanenten Bounce oder Beschwerde an die Kirche, deren Kirchen-autorisierte E-Mail diese Adresse um diese Zeit erreichte, gespeichert als `deliveryMethod` `sesBounce` / `sesComplaint`. Eine Kirche wird bei 2+ Beschwerden (≥ 0,3% der Sends) oder 10+ hart Bounces (≥ 5%) über 7 Tage pausiert.

## Planung

Sowohl die Erinnerungsmaschine als auch die Benachrichtigungsdigest fahren auf bestehenden geplanten Timern, anstatt neue Infrastruktur einzuführen:

| Timer | Zeitplan | Läuft |
|-------|----------|------|
| 30-Minuten-Timer | alle 30 Minuten | Eskalieren ungelesener Benachrichtigungen; Versand `individual`-Frequenz Digest-E-Mails; Dispatch fällige Erinnerungs-Vorkommen (`ReminderEngine.scan`); Genehmigungs-Digests; fällige Automations-Ausführungen |
| Nächtlicher Timer | 05:00 UTC | Gruppen-Anwesenheits-Erinnerungen; Durchführung wiederkehrender Streaming-Dienste; Selbsterfrischt Listen aktualisieren; Erinnerungs-Vorkommen für den nächsten Horizont erweitern (`ReminderEngine.expandAll`); Versand `daily`-Frequenz Digest-E-Mails |

Lokal kann die gleiche Logik bei Bedarf mit `npm run timer:30min` und `npm run timer:midnight` aus dem `Api`-Projekt ausgelöst werden.

## Datei-Inventar

| Bereich | Dateien |
|------|-------|
| Trichter | `Api/src/modules/messaging/helpers/NotificationHelper.ts`, `PreferenceGateHelper.ts`, `NotificationCategoryHelper.ts`, `WebPushHelper.ts`, `ExpoPushHelper.ts`, `SocketHelper.ts`, `DeliveryHelper.ts` |
| Gemeinsamer Einstieg | `Api/src/shared/helpers/NotificationService.ts` |
| Transaktionale Tür | `Api/src/shared/helpers/TransactionalEmailHelper.ts`, Lint-Regel `Api/tools/eslint-rules/email-door.cjs` |
| Kirchen-E-Mail-Limits | `Api/src/shared/helpers/ChurchEmailLimiter.ts`, `Api/src/lambda/ses-feedback-handler.ts`, `Api/src/modules/messaging/repositories/DeliveryLogRepo.ts` |
| Erinnerungsmaschine | `Api/src/modules/messaging/helpers/ReminderEngine.ts`, `ReminderBootstrap.ts`, `helpers/adapters/*`, `controllers/ReminderController.ts` |
| Erinnerungs-Repositories | `Api/src/modules/messaging/repositories/ReminderDefinitionRepo.ts`, `ReminderOccurrenceRepo.ts`, `ReminderSentLogRepo.ts` |
| Bedienung/Plan-E-Mail | `Api/src/modules/doing/helpers/PlanReminderEmailHelper.ts`, `ReminderTokenHelper.ts`, `Api/src/shared/modules/DoingModuleGateway.ts` |
| Erinnerungs-Redakteure (B1Admin) | `serving/components/PlanTypeReminderEdit.tsx`, `calendars/components/EventReminderEdit.tsx`, `serving/tasks/components/TaskReminderEdit.tsx` |
| Erinnerungs-Editor / Präferenzen (B1App) | `EventReminderEdit.tsx`, `NotificationPrefsPage.tsx`, `useRealtimeNotifications.ts` |

## Verbundene Seiten

- [Real-time Architecture](../realtime) – das WebSocket-Protokoll und die Client-Primitive (`SocketHelper`, `SubscriptionManager`, `ConversationStore`), auf denen die in-app-Zustellungs-Ebene fährt
- [Web Push Notifications](../web-push) – VAPID-Setup und der Browser-Push-API-Pfad, den die Push-Eskalations-Ebene verwendet
- [Messaging Endpoints](../api/endpoints/messaging) – volle REST-Oberfläche für Nachrichten, Gespräche, Verbindungen und Benachrichtigungs-/Erinnerungsrouten
