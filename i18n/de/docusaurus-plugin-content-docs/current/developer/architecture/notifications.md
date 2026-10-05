---
title: "Architektur für Benachrichtigungen und Erinnerungen"
---

# Architektur für Benachrichtigungen und Erinnerungen

<div class="article-intro">

Jede Nachricht, die ein Kirchenmitglied außerhalb der Seite sieht, auf der es sich gerade befindet – ein Badge, eine Push-Benachrichtigung, eine Digest-E-Mail – durchläuft eine von zwei Türen in der MessagingApi. Diese Seite dokumentiert den Trichter, die Erinnerungsmaschine, die ihn nach einem Zeitplan speist, und das Präferenzmodell, das entscheidet, was eine Person tatsächlich erreicht.

</div>

## Übersicht – zwei Türen

```
scheduled anything ──▶ ReminderEngine (definitions → occurrences → scan) ─┐
chat / requests / workflow / bulk sends ──────────────────────────────────┼─▶ createNotifications()
                                                                          │    in_app gate → socket → push → email (→ sms slot)
account/legal mail ──▶ TransactionalEmailHelper.sendTransactional()  [allowlisted, lint-enforced]
```

1. **Alles, das einer Person etwas mitteilt**, geht durch `NotificationHelper.createNotifications()` im Messaging-Modul. Es speichert eine Reihe `notifications` und eskaliert socket → push → email, wobei `PreferenceGateHelper` pro Kanal ausgewertet wird – einschließlich `in_app` auf Stufe 0.
2. **Alles Geplante** ist eine `reminderDefinition` (auf Entitätsebene oder Bereichsebene), die in `reminderOccurrences` erweitert und von `ReminderEngine.scan()` nach einem wiederkehrenden Timer versendet wird. Ein Expander, ein Dispatcher, ein Sendeverzeichnis (`reminderSentLog`).
3. **Direkte E-Mail** existiert nur hinter `TransactionalEmailHelper.sendTransactional()`. Eine ESLint-Regel erzwingt dies zur Compile-Zeit – siehe unten.

:::tip Die E-Mail-Tür ist Lint-erzwungen, nicht nur Konvention
`Api/tools/eslint-rules/email-door.cjs` definiert `no-direct-email-helper`: Jeder Aufruf zu `EmailHelper.sendTemplatedEmail()` oder `EmailHelper.sendEmail()` außerhalb von `NotificationHelper.ts` oder `TransactionalEmailHelper.ts` schlägt Lint fehl. Wenn Sie eine E-Mail senden müssen, leiten Sie sie durch den Trichter (`createNotifications` mit `emailImmediate`) oder durch `TransactionalEmailHelper.sendTransactional()` – es gibt keinen dritten Weg, der CI passiert.
:::

## Der Benachrichtigungstrichter

`NotificationHelper.createNotifications()` ist der einzige Eintrittspunkt für alles, das nicht geplant oder transaktional ist:

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

Für jeden Empfänger speichert es eine Reihe in `notifications` und ruft `attemptDeliveryWithEscalation` auf, das die unten aufgelistete Kanal-Leiter hinuntergeht. Eine noch ungelesene Reihe für dasselbe `(contentType, contentId)` unterdrückt eine Neuerstellung – dieser Dedup-Schutz wird für `emailImmediate`-Sendevorgänge übersprungen (Erinnerungsversätze, Personal „E-Mail an alle", Workflow-Schritte haben ihr eigenes Dedup) und für direkte Nachrichten, die immer den Socket anpingen.

`shared/helpers/NotificationService.ts` spiegelt dieselbe Signatur (`NotificationServiceOptions`) für Aufrufer außerhalb des Messaging-Moduls wider und wird beim Start beim Messaging-Modul registriert.

## Kanaleskalationskette

Die Zustellung beginnt auf einer Ebene (0 standardmäßig oder höher für Erinnerungen/explizite Sendevorgänge) und geht nur zum nächsten Kanal über, wenn der vorherige erfolgreich war. Jede Ebene wird durch `PreferenceGateHelper` vor irgendeinem Versuch kontrolliert.

| Ebene | Kanal | Verhalten |
|-------|---------|----------|
| 0 | **in_app / socket** | Das `in_app`-Gate wird zuerst überprüft. Falls unterdrückt (stummgeschaltet), wird die Reihe mit `isNew=false` beibehalten und die Zustellung stoppt komplett – kein Socket-Ping, kein Badge, keine weitere Eskalation. Andernfalls sucht der Server nach offenen Socket-Verbindungen für den `alerts`-Raum der Person und sendet einen `notification`-Frame (oder `privateMessage`). Für gewöhnliche Benachrichtigungen stoppt eine erfolgreiche Socket-Zustellung die Kette hier – der 30-Minuten-Timer überprüft ungelesene Elemente erneut und eskaliert sie später. Direktnachrichten stoppen nie beim Socket: Eine installierte PWA kann den Alerts-Socket im Hintergrund geöffnet halten, was sonst die OS-Level-Push unterdrücken würde. |
| 1 | **push** | Kontrolliert auf `allowPush` / Kategorie-Opt-out / ruhige Stunden. Sendet an sowohl Expo Push-Token als auch Web Push-Abonnements, die auf den `devices`-Reihen der Person gefunden werden, deduplicating nach Endpoint und entfernen stale Tokens während des Vorgangs. |
| 2 | **email** | Kontrolliert auf `emailFrequency` und Kategorie-Opt-out. Sofortige Sendevorgänge (`emailImmediate`) werden sofort gerendert und schreiben eine `deliveryLogs`-Reihe; andernfalls wird die Benachrichtigung für die Batch-Zusammenfassung ausstehend gelassen, die unten beschrieben wird. |
| — | **sms** | Präferenz-Plumbing (`allowSms`, pro-Kategorie-Kanallisten) berücksichtigt bereits einen SMS-Kanal, aber kein Producer sendet über ihn heute – er bleibt für das Bulk-SMS-Produkt reserviert, das als separater, isolierter Flow über `TextingController` / `@churchapps/texting` läuft. Der Workflow-**Text senden**-Schritt-Action (`StepActionHelper.sendText` → `MessagingModuleGateway.sendPersonText`) umgeht auch diesen Trichter: Er textet die Kartenperson direkt über den Provider der Kirche, daher gelten Benachrichtigungspräferenzen und ruhige Stunden nicht – nur die `optedOut`-Flag der Person wird respektiert. |

Ungelesene Benachrichtigungen, die beim Socket oder Push verlassen werden, werden vom 30-Minuten-Timer eskaliert (`NotificationHelper.escalateDelivery`). Batch-E-Mail wird von `NotificationHelper.sendEmailNotifications(frequency)` gesendet, angetrieben durch die `emailFrequency`-Präferenz jeder Person: `individual` läuft auf dem 30-Minuten-Timer, `daily` läuft auf dem Nacht-Timer. (`weekly` ist ein gültiger Präferenzwert, hat aber noch keinen dedizierten Batch-Lauf.)

## Erinnerungsmaschine

Geplante Erinnerungen – Ereigniserinnerungen, Aufgabenfälligkeitsdaten, Serving-/Plan-Zuweisungserinnerungen – gehen alle durch eine verallgemeinerte Engine, anstatt besprechungsweise pro-Feature-Cron-Logik.

```
reminderDefinitions ──expand──▶ reminderOccurrences ──scan (30 min)──▶ createNotifications()
     │                                  │                                    │
     ▼                                  ▼                                    ▼
 entity- or scope-level          one row per (definition,              deliveryStartLevel: 1
 offsets/channels/message        entity, occurrence, offset)           + reminderSentLog ledger
```

**Definitionen** (`reminderDefinitions`) sind entweder auf Entitätsebene (`entityId` gesetzt – ein bestimmtes Ereignis, eine Aufgabe oder einen Plan) oder auf Bereichsebene (`entityId` null, `scopeId` gesetzt – z. B. jeder Plan unter einem Serving-Plan-Typ). Eine Definition enthält eine CSV von Minutenversätzen (`offsets`, z. B. `"1440,60"` für einen Tag und eine Stunde vorher), eine lokale Sendezeit (`sendLocalTime`), eine CSV von Kanälen (`channels` – einschließlich `email` löst sofort eine reiche E-Mail zur Sendezeit aus), einen `recipientMode` und eine optionale benutzerdefinierte `message`.

**Expansion** materialisiert Feuerreihen für den Horizont voraus (ein rollendes Multi-Tag-Fenster). Sie läuft auf dem Nacht-Timer und synchron, wenn eine Definition gespeichert wird, damit eine Erinnerung für ein Last-Minute-Ereignis noch abfeuert. Scope-Definitionen breiten sich über den Adapter's `loadScopeEntities` aus und erzeugen einen Occurrences-Satz pro konkreter Entität; Entity-Level-Occurrences verwenden den Schlüssel `definitionId:occurrenceISO:offset`, während scoped Occurrences nach Entity-ID einen Namespace erstellen, damit sie nie kollidieren. Upsert einer Occurrence **belebt** eine vorher abgebrochene Reihe – Cancel-then-Re-Expand ist der Standard-Weg, um eine Erinnerung nach der zugrunde liegenden Entity-Änderung neu zu synchronisieren; Reihen, die bereits `sent`, `failed` oder `processing` sind, bleiben unberührt.

**Dispatch** (`ReminderEngine.scan()`) läuft auf dem 30-Minuten-Timer. Es beansprucht fällige Occurrences (ein Leasing verhindert Doppelverarbeitung), lädt Empfänger durch den Adapter der Entität, filtert alle aus, die bereits in `reminderSentLog` für diese Occurrence aufgezeichnet sind, und ruft `createNotifications` mit `deliveryStartLevel: 1` auf (Skip direkt zum Push) plus `emailImmediate`/`emailByPerson`, wenn die Kanäle der Definition E-Mail enthalten.

Ein interner Event-Bus reagiert auf Entity-Mutationen, ohne auf die Nacht-Expansion zu warten: Content-Events (über den Webhook-Dispatcher) und Plan-/Task-Update-Events lösen sofortige Re-Expansion oder Stornierung für die betroffene Entität aus, und ein Plan-Update expandiert auch alle Scope-Definitionen, die an seinen Plan-Typ gebunden sind.

### Adapter

Die Engine ist Entity-agnostisch; jeder unterstützte Entity-Typ steckt durch einen Adapter ein (`helpers/adapters/`):

| Entity-Typ | Adapter | Notizen |
|-------------|---------|-------|
| `event` | `EventReminderAdapter` | Empfänger sind auf die Registranten oder Gruppenmitglieder beschränkt, je nach Ereignis und `recipientMode`. |
| `plan` | `PlanReminderAdapter` | Empfänger sind akzeptierte + unbestätigte Plan-Zuweisungen. `buildEmails` ruft in `DoingModuleGateway.buildPlanReminderEmails` auf, das Positionen, Notizen und eine benutzerdefinierte Nachricht über `doing/helpers/PlanReminderEmailHelper` rendert, einschließlich Akzeptieren/Ablehnen-Schaltflächen, die von `ReminderTokenHelper` signiert werden und an einen öffentlichen Zuweisungs-Response-Endpoint posten. |
| `task` | `TaskReminderAdapter` | Empfänger sind die Assignee der Aufgabe(n). |

### Endpoints

| Methode | Pfad | Zweck |
|--------|------|---------|
| `GET` / `POST` | `/messaging/reminders/:entityType/:entityId` | Erinnerungsdefinition für eine Entität laden oder speichern. |
| `GET` / `POST` | `/messaging/reminders/scope/:entityType/:scopeId` | Erinnerungsdefinition auf Bereichsebene (geerbt) laden oder speichern. |
| `DELETE` | `/messaging/reminders/:defId` | Definition löschen und ausstehende Occurrences abbrechen. |
| `GET` | `/messaging/reminders/event/:eventId/preview` | Empfängeranzahl und nächste Feuerzeiten für eine Ereigniserinnerung vor dem Speichern vorschauen. |
| `GET` | `/messaging/reminders/log` | Aktuelle Erinnerungs-Occurrence-Historie für eine Kirche. |
| `POST` | `/messaging/reminders/mute` | Erinnerungen für eine bestimmte Entität stummschalten. |

Das Speichern einer Definition löst eine synchrone Re-Expansion für diese Entität oder diesen Bereich aus, damit Bearbeiter aktuelle „nächste Feuer" ohne Warten auf den Nacht-Job sehen.

## Direktnachrichten

Direktnachrichten nutzen denselben Trichter wie alles andere, anstatt einen separaten Eskalationspfad zu haben. Jede ungelesene Konversation bekommt eine **Shadow-Reihe** in `notifications` (`contentType='privateMessage'`, `contentId` = die Privatnachrichten-ID, `category='direct_messages'`), die den gesamten Lieferstatus besitzt – Socket-/Push-/E-Mail-Eskalation, Leseverfolgung, alles. Die Tabelle `privateMessages` selbst speichert die Nachrichtennutzlast und eine `notifyPersonId`-Spalte, die die Quelle des ungelesenen Badges ist und gelöscht wird, wenn der Empfänger die Konversation liest.

Shadow-Reihen sind unsichtbar für die Benachrichtigungsglocke: Sie sind vom Query der ungelesenen Anzahl, dem Benachrichtigungslisten-Query und den Markieren-als-gelesen-/Löschen-Querys ausgeschlossen, die alle `contentType <> 'privateMessage'` filtern. Jeder DM-Ping trifft den Socket unabhängig vom ungelesenen Status (Live-Chat-Semantik – kein Dedup), und DMs stoppen nie bei Socket-Lieferung wie gewöhnliche Benachrichtigungen, da eine hintergrundierte PWA einen Socket offen halten kann, während sie immer noch einen OS-Level-Push benötigt. Falls eine Person DM-Benachrichtigungen stummschaltet, wird die Shadow-Reihe geparkt (`isNew=false`, `notifyPersonId` gelöscht) – immer noch sichtbar in der Konversation selbst, einfach ohne Badges oder Benachrichtigungen.

## Präferenzen & Gating

Jeder Sendvorgang geht durch `PreferenceGateHelper.evaluate()`, eine reine Funktion (alle Zustände werden weitergegeben, keine DB-Aufrufe auf dem Hot Path), die `allow`, `suppress` oder `defer` zurückgibt. Die Ebenen laufen in Reihenfolge ab, und die erste, die entscheidet, gewinnt:

1. **Gesperrte Kategorie** – einige Kategorien sind zwingend (Tier 0) und umgehen alle anderen Ebenen.
2. **Master-Mute / Kanal-Kill** – `masterMute`, `allowPush`, `allowSms` oder `emailFrequency='never'` unterdrücken ganz.
3. **Ruhige Stunden** – nur Push und SMS (E-Mail wird als nicht aufdringlich angesehen). Falls die aktuelle Wall-Clock-Zeit in der Zeitzone der Person in ihr ruhiges Fenster fällt, gelangt eine transaktionale Kategorie trotzdem hindurch; eine nicht-transaktionale wird bis zum Ende des ruhigen Fensters verschoben, berechnet als DST-korrekte UTC-Instant über `TimezoneHelper.wallClockToUtc`.
4. **Pro-Kategorie-Präferenz-Überschreibung** – ein expliziter Opt-Out für ein Kategorie × Kanal-Paar; Abwesenheit bedeutet den Standard der Kategorie.
5. **Pro-Entität-Mute** – ein Mute, das gegen eine bestimmte Entität aufgezeichnet ist (z. B. ein Ereignis, ein Plan), schränkt weiter ein als die Einstellung auf Kategorieebene, gilt aber nur, wenn der Anrufer eine Entitäts-ID/Typ zusammen mit der Benachrichtigung liefert.

Beteitigte Tabellen: `notificationPreferences` (global – `masterMute`, `emailFrequency` von `individual|daily|weekly|never`, `allowPush`, ruhiges-Fenster + Zeitzone, `allowSms`), `notificationPreferenceOverrides` (pro Kategorie × Kanal) und `notificationEntityMutes` (pro Entität).

Dieses Gate wird für in-app (Stufe 0), Push (Stufe 1) und E-Mail (Stufe 2) im Trichter durchgesetzt – einschließlich sofortiger Erinnerungs-/Digest-E-Mails. Transaktionale E-Mail (Auth-Codes, Passwort-Resets, Einladungen, Spendenquittungen) umgeht sie absichtlich; das ist der ganze Sinn der zweiten Tür.

## Kirchen-geschriebene E-Mail-Limits

E-Mail, deren Inhalt eine Kirche verfasst hat, geht aus der gemeinsamen ChurchApps SES-Identität heraus, daher wird sie pro Kirche gemessen von `Api/src/shared/helpers/ChurchEmailLimiter.ts`. Vier Pfade rufen es auf: Grup-/Template-Sendevorgänge (`EmailTemplateController`, Content-Typ `email`), Formular-Folgemailer (`FormSubmissionController`, `formFollowUp`), Workflow-**E-Mail senden**-Aktionen (`NotificationHelper` mit `churchAuthored`, `workflowEmail`) und B1-Kontoeinladungen (`UserController.sendInviteEmail`, `invite`). System-Mail (Auth-Codes, Quittungen, Erinnerungen) wird nicht gemessen.

- **Genehmigungsgate.** Eine Kirche sendet nichts, bis ein Server-Admin `churches.emailApprovedDate` setzt (`POST /membership/churches/:id/emailApproval`, Server Admin → Churches → **Group Email**-Chip). Archivierte Kirchen sind immer blockiert. B1Admin's Send Email-Dialog liest `GET /messaging/emailTemplates/sendStatus` (`approved`, `paused`, `remaining`, `requested`) und zeigt, wenn unapproved, stattdessen eine **Request review**-Karte. `POST /messaging/emailTemplates/requestApproval` E-Mails-Support, höchstens einmal pro Kirche pro Woche.
- **Verdiente Zulage.** Eine genehmigte Kirche bekommt `max(150, 2 × ihren besten kirchen-geschriebenen Tag in den letzten 30 Tagen)`, begrenzt auf 2.000 pro Rolling-24-Stunden. Die aktuellen 24 Stunden sind von „bester Tag" ausgeschlossen, so kann ein Burst seine eigene Grenze nicht erhöhen.
- **Reservieren, dann abgleichen.** `reserve()` schreibt eine `deliveryLogs`-Reihe pro Empfänger vor dem Senden, überprüft die Zulage mit diesen Reihen erneut gezählt und bricht ab, wenn zwei Anfragen vorbei sind Limit (der Send gibt 429 zurück). `settle()` markiert jede Reihe gesendet oder fehlgeschlagen.
- **Beschwerde-Pause.** Die `sesFeedback` Lambda (`Api/src/lambda/ses-feedback-handler.ts`, von SES → SNS gefüttert) heftet jeden permanenten Bounce oder Beschwerde an die Kirche an, deren kirchen-geschriebene E-Mail diese Adresse um diese Zeit herum erreichte, gespeichert als `deliveryMethod` `sesBounce` / `sesComplaint`. Eine Kirche ist auf 2+ Beschwerden (≥ 0,3% der Sendevorgänge) oder 10+ Hard Bounces (≥ 5%) über 7 Tage pausiert.

## Planung

Sowohl die Erinnerungsmaschine als auch die Benachrichtigungszusammenfassung nutzen vorhandene geplante Timer, anstatt neue Infrastruktur einzuführen:

| Timer | Zeitplan | Läuft |
|-------|----------|------|
| 30-Minuten-Timer | alle 30 Minuten | Ungelesene Benachrichtigungen eskalieren; `individual`-Frequenz-Digest-E-Mails senden; fällige Erinnerungs-Occurrences verteilen (`ReminderEngine.scan`); Genehmigungszusammenfassungen; fällige Automatisierungen ausführen |
| Nacht-Timer | 05:00 UTC | Gruppen-Anwesenheitserinnerungen; wiederkehrende Streaming-Services voranbringen; Auto-Refresh-Listen aktualisieren; Erinnerungs-Occurrences für den nächsten Horizont expandieren (`ReminderEngine.expandAll`); `daily`-Frequenz-Digest-E-Mails senden |

Lokal kann dieselbe Logik mit `npm run timer:30min` und `npm run timer:midnight` vom `Api`-Projekt an Abruf getriggert werden.

## Dateiinventar

| Bereich | Dateien |
|------|-------|
| Trichter | `Api/src/modules/messaging/helpers/NotificationHelper.ts`, `PreferenceGateHelper.ts`, `NotificationCategoryHelper.ts`, `WebPushHelper.ts`, `ExpoPushHelper.ts`, `SocketHelper.ts`, `DeliveryHelper.ts` |
| Gemeinsamer Eintrag | `Api/src/shared/helpers/NotificationService.ts` |
| Transaktionale Tür | `Api/src/shared/helpers/TransactionalEmailHelper.ts`, Lint-Regel `Api/tools/eslint-rules/email-door.cjs` |
| Kirchen-E-Mail-Limits | `Api/src/shared/helpers/ChurchEmailLimiter.ts`, `Api/src/lambda/ses-feedback-handler.ts`, `Api/src/modules/messaging/repositories/DeliveryLogRepo.ts` |
| Erinnerungsmaschine | `Api/src/modules/messaging/helpers/ReminderEngine.ts`, `ReminderBootstrap.ts`, `helpers/adapters/*`, `controllers/ReminderController.ts` |
| Erinnerungs-Repositories | `Api/src/modules/messaging/repositories/ReminderDefinitionRepo.ts`, `ReminderOccurrenceRepo.ts`, `ReminderSentLogRepo.ts` |
| Serving-/Plan-E-Mail | `Api/src/modules/doing/helpers/PlanReminderEmailHelper.ts`, `ReminderTokenHelper.ts`, `Api/src/shared/modules/DoingModuleGateway.ts` |
| Erinnerungs-Editoren (B1Admin) | `serving/components/PlanTypeReminderEdit.tsx`, `calendars/components/EventReminderEdit.tsx`, `serving/tasks/components/TaskReminderEdit.tsx` |
| Erinnerungs-Editor / Präferenzen (B1App) | `EventReminderEdit.tsx`, `NotificationPrefsPage.tsx`, `useRealtimeNotifications.ts` |

## Verwandte Seiten

- [Real-Time-Architektur](../realtime) – das WebSocket-Protokoll und Client-Primitive (`SocketHelper`, `SubscriptionManager`, `ConversationStore`), auf denen die in-app-Lieferungsebene reitet
- [Web Push-Benachrichtigungen](../web-push) – VAPID-Setup und der Browser-Push-API-Pfad, der von der Push-Eskalationsebene verwendet wird
- [Messaging-Endpoints](../api/endpoints/messaging) – vollständige REST-Oberfläche für Nachrichten, Konversationen, Verbindungen und Benachrichtigungs-/Erinnerungs-Routen
