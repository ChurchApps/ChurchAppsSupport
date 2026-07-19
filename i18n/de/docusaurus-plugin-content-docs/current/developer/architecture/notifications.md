---
title: "Benachrichtigungs- & Erinnerungsarchitektur"
---

# Benachrichtigungs- & Erinnerungsarchitektur

<div class="article-intro">

Jede Nachricht, die ein Kirchenmitglied außerhalb der Seite sieht, die es gerade betrachtet — eine Badge-Anzahl, eine Push-Benachrichtigung, eine Digest-E-Mail — durchläuft eine von zwei Türen in der MessagingApi. Diese Seite dokumentiert den Trichter, die Erinnerungsengine, die ihn nach Zeitplan speist, und das Präferenzmodell, das entscheidet, was eine Person tatsächlich erreicht.

</div>

## Überblick — zwei Türen

```
scheduled anything ──▶ ReminderEngine (definitions → occurrences → scan) ─┐
chat / requests / workflow / bulk sends ──────────────────────────────────┼─▶ createNotifications()
                                                                          │    in_app gate → socket → push → email (→ sms slot)
account/legal mail ──▶ TransactionalEmailHelper.sendTransactional()  [allowlisted, lint-enforced]
```

1. **Alles, was einer Person etwas mitteilt**, läuft durch `NotificationHelper.createNotifications()` im Messaging-Modul. Es persistiert eine `notifications`-Zeile und eskaliert Socket → Push → E-Mail, wobei pro Kanal `PreferenceGateHelper` ausgewertet wird — einschließlich `in_app` auf Stufe 0.
2. **Alles Geplante** ist eine `reminderDefinition` (auf Entitäts- oder Scope-Ebene), die zu `reminderOccurrences` erweitert und von `ReminderEngine.scan()` auf einem wiederkehrenden Timer ausgeliefert wird. Ein Expander, ein Dispatcher, ein Versand-Ledger (`reminderSentLog`).
3. **Direkte E-Mail** existiert nur hinter `TransactionalEmailHelper.sendTransactional()`. Eine ESLint-Regel erzwingt dies zur Kompilierzeit — siehe unten.

:::tip Die E-Mail-Tür ist lint-erzwungen, nicht nur Konvention
`Api/tools/eslint-rules/email-door.cjs` definiert `no-direct-email-helper`: Jeder Aufruf von `EmailHelper.sendTemplatedEmail()` oder `EmailHelper.sendEmail()` außerhalb von `NotificationHelper.ts` oder `TransactionalEmailHelper.ts` lässt den Lint fehlschlagen. Wenn Sie eine E-Mail senden müssen, leiten Sie sie durch den Trichter (`createNotifications` mit `emailImmediate`) oder durch `TransactionalEmailHelper.sendTransactional()` — es gibt keinen dritten Weg, der die CI besteht.
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

Für jeden Empfänger speichert es eine Zeile in `notifications` und ruft `attemptDeliveryWithEscalation` auf, das die untenstehende Kanalleiter durchläuft. Eine noch ungelesene Zeile für denselben `(contentType, contentId)` unterdrückt die Neuerstellung — diese Dedup-Sperre wird bei `emailImmediate`-Sendungen übersprungen (Erinnerungs-Offsets, „E-Mail an alle" durch Mitarbeiter, Workflow-Schritte besitzen ihre eigene Deduplizierung) sowie bei Direktnachrichten, die immer den Socket anpingen.

`shared/helpers/NotificationService.ts` spiegelt dieselbe Signatur (`NotificationServiceOptions`) für Aufrufer außerhalb des Messaging-Moduls und ist beim Boot beim Messaging-Modul registriert.

## Kanal-Eskalationskette

Die Zustellung beginnt auf einer Stufe (standardmäßig 0, oder höher für Erinnerungen/explizite Sendungen) und geht nur zum nächsten Kanal über, wenn der vorherige nicht erfolgreich war. Jede Stufe wird vor jedem Versuch durch `PreferenceGateHelper` geprüft.

| Stufe | Kanal | Verhalten |
|-------|---------|----------|
| 0 | **in_app / socket** | Das `in_app`-Gate wird zuerst geprüft. Ist es unterdrückt (stummgeschaltet), wird die Zeile mit `isNew=false` persistiert und die Zustellung stoppt vollständig — kein Socket-Ping, kein Badge, keine weitere Eskalation. Andernfalls sucht der Server offene Socket-Verbindungen für den `alerts`-Raum der Person und pusht einen `notification`- (oder `privateMessage`-)Frame. Bei gewöhnlichen Benachrichtigungen stoppt eine erfolgreiche Socket-Zustellung die Kette hier — der 30-Minuten-Timer prüft ungelesene Elemente erneut und eskaliert sie später. Direktnachrichten stoppen nie beim Socket: Eine installierte PWA kann den Alerts-Socket im Hintergrund offen halten, was sonst den Push auf Betriebssystemebene unterdrücken würde. |
| 1 | **push** | Wird über `allowPush` / Kategorie-Opt-out / Ruhezeiten gesteuert. Sendet sowohl an Expo-Push-Token als auch an Web-Push-Abonnements, die in den `devices`-Zeilen der Person gefunden werden, wobei nach Endpunkt dedupliziert und veraltete Token dabei bereinigt werden. |
| 2 | **email** | Wird über `emailFrequency` und Kategorie-Opt-out gesteuert. Sofortige Sendungen (`emailImmediate`) werden sofort gerendert und schreiben eine `deliveryLogs`-Zeile; andernfalls bleibt die Benachrichtigung für den unten beschriebenen Batch-Digest ausstehend. |
| — | **sms** | Die Präferenz-Verrohrung (`allowSms`, Kanallisten pro Kategorie) berücksichtigt bereits einen SMS-Kanal, aber kein Producer sendet heute darüber — er bleibt für das Massen-SMS-Produkt reserviert, das als separater, isolierter Ablauf über `TextingController` / `@churchapps/texting` läuft. |

Ungelesene Benachrichtigungen, die bei Socket oder Push stehen geblieben sind, werden vom 30-Minuten-Timer eskaliert (`NotificationHelper.escalateDelivery`). Batch-E-Mail wird von `NotificationHelper.sendEmailNotifications(frequency)` versendet, gesteuert von der `emailFrequency`-Präferenz jeder Person: `individual` läuft auf dem 30-Minuten-Timer, `daily` läuft auf dem nächtlichen Timer. (`weekly` ist ein gültiger Präferenzwert, hat aber noch keinen dedizierten Batch-Lauf.)

## Erinnerungsengine

Geplante Erinnerungen — Ereignis-Erinnerungen, Aufgabenfälligkeiten, Dienst-/Plan-Zuweisungserinnerungen — laufen alle durch eine verallgemeinerte Engine statt durch maßgeschneiderte Cron-Logik pro Feature.

```
reminderDefinitions ──expand──▶ reminderOccurrences ──scan (30 min)──▶ createNotifications()
     │                                  │                                    │
     ▼                                  ▼                                    ▼
 entity- or scope-level          one row per (definition,              deliveryStartLevel: 1
 offsets/channels/message        entity, occurrence, offset)           + reminderSentLog ledger
```

**Definitionen** (`reminderDefinitions`) sind entweder entitätsbezogen (`entityId` gesetzt — ein bestimmtes Ereignis, eine Aufgabe oder ein Plan) oder scope-bezogen (`entityId` null, `scopeId` gesetzt — z. B. jeder Plan unter einem Dienstplan-Typ). Eine Definition trägt eine CSV-Liste von Minuten-Offsets (`offsets`, z. B. `"1440,60"` für einen Tag und eine Stunde vorher), eine lokale Sendezeit (`sendLocalTime`), eine CSV-Liste von Kanälen (`channels` — die Einbeziehung von `email` löst zum Sendezeitpunkt eine sofortige, aufwendig gestaltete E-Mail aus), einen `recipientMode` und eine optionale benutzerdefinierte `message`.

**Expansion** materialisiert Auslösungszeilen für den bevorstehenden Horizont (ein rollierendes mehrtägiges Fenster). Sie läuft auf dem nächtlichen Timer sowie synchron jedes Mal, wenn eine Definition gespeichert wird, damit eine Erinnerung für ein kurzfristiges Ereignis trotzdem auslöst. Scope-Definitionen fächern über `loadScopeEntities` des Adapters auf und erzeugen einen Vorkommens-Satz pro konkreter Entität; entitätsbezogene Vorkommen verwenden den Schlüssel `definitionId:occurrenceISO:offset`, während scope-bezogene Vorkommen nach Entitäts-ID namensräumlich getrennt werden, sodass sie nie kollidieren. Das Upserten eines Vorkommens **erweckt** eine zuvor stornierte Zeile wieder — Stornieren-dann-Neu-Expandieren ist der Standardweg, eine Erinnerung nach Änderung der zugrunde liegenden Entität neu zu synchronisieren; Zeilen, die bereits `sent`, `failed` oder `processing` sind, werden nicht angetastet.

**Dispatch** (`ReminderEngine.scan()`) läuft auf dem 30-Minuten-Timer. Es beansprucht fällige Vorkommen (ein Lease verhindert doppelte Verarbeitung), lädt Empfänger über den Adapter der Entität, filtert alle heraus, die für dieses Vorkommen bereits in `reminderSentLog` erfasst sind, und ruft `createNotifications` mit `deliveryStartLevel: 1` (direkt zu Push springen) sowie `emailImmediate`/`emailByPerson` auf, wenn die Kanäle der Definition E-Mail einschließen.

Ein interner Event-Bus reagiert auf Entitätsänderungen, ohne auf die nächtliche Expansion zu warten: Content-Ereignisse (über den Webhook-Dispatcher) sowie Plan-/Aufgaben-Aktualisierungsereignisse lösen sofortige Neu-Expansion oder Stornierung für die betroffene Entität aus, und eine Plan-Aktualisierung expandiert zudem jede Scope-Definition neu, die an ihren Plan-Typ gebunden ist.

### Adapter

Die Engine ist entitäts-agnostisch; jeder unterstützte Entitätstyp klinkt sich über einen Adapter ein (`helpers/adapters/`):

| Entitätstyp | Adapter | Hinweise |
|-------------|---------|-------|
| `event` | `EventReminderAdapter` | Empfänger sind je nach Ereignis und `recipientMode` auf Anmelder oder Gruppenmitglieder beschränkt. |
| `plan` | `PlanReminderAdapter` | Empfänger sind Plan-Zuweisungen mit Status „Akzeptiert" + „Unbestätigt". `buildEmails` ruft `DoingModuleGateway.buildPlanReminderEmails` auf, das Positionen, Notizen und eine benutzerdefinierte Nachricht über `doing/helpers/PlanReminderEmailHelper` rendert, einschließlich Annehmen-/Ablehnen-Schaltflächen, die von `ReminderTokenHelper` signiert werden und an einen öffentlichen Endpunkt für Zuweisungs-Antworten posten. |
| `task` | `TaskReminderAdapter` | Empfänger sind der/die Zuständige(n) der Aufgabe. |

### Endpunkte

| Methode | Pfad | Zweck |
|--------|------|---------|
| `GET` / `POST` | `/messaging/reminders/:entityType/:entityId` | Die Erinnerungsdefinition für eine Entität laden oder speichern. |
| `GET` / `POST` | `/messaging/reminders/scope/:entityType/:scopeId` | Eine scope-bezogene (vererbte) Erinnerungsdefinition laden oder speichern. |
| `DELETE` | `/messaging/reminders/:defId` | Eine Definition löschen und ihre ausstehenden Vorkommen stornieren. |
| `GET` | `/messaging/reminders/event/:eventId/preview` | Empfängeranzahl und nächste Auslösezeiten für eine Ereigniserinnerung vor dem Speichern in der Vorschau anzeigen. |
| `GET` | `/messaging/reminders/log` | Jüngste Erinnerungs-Vorkommens-Historie für eine Kirche. |
| `POST` | `/messaging/reminders/mute` | Erinnerungen für eine bestimmte Entität stummschalten. |

Das Speichern einer Definition löst eine synchrone Neu-Expansion für diese Entität oder diesen Scope aus, sodass Bearbeiter aktuelle „nächste Auslösungen" sehen, ohne auf den nächtlichen Job zu warten.

## Direktnachrichten

Direktnachrichten fahren durch denselben Trichter wie alles andere, statt über einen separaten Eskalationspfad. Jede ungelesene Konversation erhält eine **Schattenzeile** in `notifications` (`contentType='privateMessage'`, `contentId` = die ID der privaten Nachricht, `category='direct_messages'`), die den gesamten Zustellungszustand besitzt — Socket-/Push-/E-Mail-Eskalation, Lese-Tracking, alles. Die Tabelle `privateMessages` selbst behält die Nachrichten-Payload und eine Spalte `notifyPersonId`, welche die Quelle des Ungelesen-Badges ist und beim Lesen der Konversation durch den Empfänger gelöscht wird.

Schattenzeilen sind für die Benachrichtigungsglocke unsichtbar: Sie sind von der Ungelesen-Zähler-Abfrage, der Benachrichtigungslisten-Abfrage und den Als-gelesen-markieren/Löschen-Abfragen ausgeschlossen, die alle nach `contentType <> 'privateMessage'` filtern. Jeder DM-Ping erreicht unabhängig vom Ungelesen-Status den Socket (Live-Chat-Semantik — keine Deduplizierung), und DMs halten nie beim Socket an, wie es gewöhnliche Benachrichtigungen tun, da eine im Hintergrund laufende PWA einen Socket offen halten kann, während sie trotzdem einen Push auf Betriebssystemebene benötigt. Schaltet eine Person DM-Benachrichtigungen stumm, wird die Schattenzeile geparkt (`isNew=false`, `notifyPersonId` geleert) — sie bleibt innerhalb der Konversation selbst sichtbar, nur ohne Badges oder Alerts.

## Präferenzen & Gating

Jeder Versand durchläuft `PreferenceGateHelper.evaluate()`, eine reine Funktion (aller Zustand wird übergeben, keine DB-Aufrufe auf dem heißen Pfad), die `allow`, `suppress` oder `defer` zurückgibt. Die Schichten laufen der Reihe nach ab, und die erste, die entscheidet, gewinnt:

1. **Gesperrte Kategorie** — manche Kategorien sind verpflichtend (Stufe 0) und umgehen jede andere Schicht.
2. **Master-Stummschaltung / Kanal-Kill** — `masterMute`, `allowPush`, `allowSms` oder `emailFrequency='never'` unterdrücken vollständig.
3. **Ruhezeiten** — nur Push und SMS (E-Mail gilt als nicht aufdringlich). Fällt die aktuelle Uhrzeit in der Zeitzone der Person in ihr Ruhefenster, kommt eine transaktionale Kategorie trotzdem durch; eine nicht-transaktionale wird bis zum Ende des Ruhefensters verschoben, berechnet als DST-korrekter UTC-Zeitpunkt über `TimezoneHelper.wallClockToUtc`.
4. **Präferenz-Override pro Kategorie** — ein expliziter Opt-out für ein Paar aus Kategorie × Kanal; fehlt er, gilt der Standard der Kategorie.
5. **Stummschaltung pro Entität** — eine gegen eine bestimmte Entität (z. B. ein Ereignis, ein Plan) erfasste Stummschaltung schränkt stärker ein als die Einstellung auf Kategorieebene, gilt aber nur, wenn der Aufrufer der Benachrichtigung eine Entitäts-ID/-Typ mitgibt.

Beteiligte Tabellen: `notificationPreferences` (global — `masterMute`, `emailFrequency` mit `individual|daily|weekly|never`, `allowPush`, Ruhezeitfenster + Zeitzone, `allowSms`), `notificationPreferenceOverrides` (pro Kategorie × Kanal) und `notificationEntityMutes` (pro Entität).

Dieses Gate wird für In-App (Stufe 0), Push (Stufe 1) und E-Mail (Stufe 2) innerhalb des Trichters erzwungen — einschließlich sofortiger Erinnerungs-/Digest-E-Mails. Transaktionale E-Mail (Auth-Codes, Passwort-Resets, Einladungen, Spendenquittungen) umgeht es absichtlich; genau das ist der Sinn der zweiten Tür.

## Zeitplanung

Sowohl die Erinnerungsengine als auch der Benachrichtigungs-Digest fahren auf bestehenden geplanten Timern mit, statt neue Infrastruktur einzuführen:

| Timer | Zeitplan | Läuft aus |
|-------|----------|------|
| 30-Minuten-Timer | alle 30 Minuten | Ungelesene Benachrichtigungen eskalieren; `individual`-Frequenz-Digest-E-Mails senden; fällige Erinnerungs-Vorkommen ausliefern (`ReminderEngine.scan`); Genehmigungs-Digests; fällige Automatisierungsausführungen |
| Nächtlicher Timer | 05:00 UTC | Gruppen-Anwesenheitserinnerungen; wiederkehrende Streaming-Dienste vorrücken; Auto-Refresh-Listen aktualisieren; Erinnerungs-Vorkommen für den nächsten Horizont expandieren (`ReminderEngine.expandAll`); `daily`-Frequenz-Digest-E-Mails senden |

Lokal kann dieselbe Logik mit `npm run timer:30min` und `npm run timer:midnight` aus dem `Api`-Projekt bei Bedarf ausgelöst werden.

## Dateiverzeichnis

| Bereich | Dateien |
|------|-------|
| Trichter | `Api/src/modules/messaging/helpers/NotificationHelper.ts`, `PreferenceGateHelper.ts`, `NotificationCategoryHelper.ts`, `WebPushHelper.ts`, `ExpoPushHelper.ts`, `SocketHelper.ts`, `DeliveryHelper.ts` |
| Gemeinsamer Einstiegspunkt | `Api/src/shared/helpers/NotificationService.ts` |
| Transaktionale Tür | `Api/src/shared/helpers/TransactionalEmailHelper.ts`, Lint-Regel `Api/tools/eslint-rules/email-door.cjs` |
| Erinnerungsengine | `Api/src/modules/messaging/helpers/ReminderEngine.ts`, `ReminderBootstrap.ts`, `helpers/adapters/*`, `controllers/ReminderController.ts` |
| Erinnerungs-Repositories | `Api/src/modules/messaging/repositories/ReminderDefinitionRepo.ts`, `ReminderOccurrenceRepo.ts`, `ReminderSentLogRepo.ts` |
| Dienst-/Plan-E-Mail | `Api/src/modules/doing/helpers/PlanReminderEmailHelper.ts`, `ReminderTokenHelper.ts`, `Api/src/shared/modules/DoingModuleGateway.ts` |
| Erinnerungs-Editoren (B1Admin) | `serving/components/PlanTypeReminderEdit.tsx`, `calendars/components/EventReminderEdit.tsx`, `serving/tasks/components/TaskReminderEdit.tsx` |
| Erinnerungs-Editor / Präferenzen (B1App) | `EventReminderEdit.tsx`, `NotificationPrefsPage.tsx`, `useRealtimeNotifications.ts` |

## Verwandte Seiten

- [Echtzeit-Architektur](../realtime) — das WebSocket-Protokoll und die Client-Primitive (`SocketHelper`, `SubscriptionManager`, `ConversationStore`), auf denen die In-App-Zustellstufe aufsetzt
- [Web-Push-Benachrichtigungen](../web-push) — VAPID-Setup und der Browser-Push-API-Pfad, der von der Push-Eskalationsstufe genutzt wird
- [Messaging-Endpunkte](../api/endpoints/messaging) — vollständige REST-Oberfläche für Nachrichten, Konversationen, Verbindungen und Benachrichtigungs-/Erinnerungsrouten
</content>
