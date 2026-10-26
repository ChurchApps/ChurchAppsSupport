---
title: "Twilio BYOK (Vorschlag)"
description: "Vorgeschlagene kircheneigene Twilio-Integration, Einwilligungsmodell, Umfang der Umsetzung und Freigabekriterien."
---

# Vorschlag zur Twilio-BYOK-Integration

:::caution Vorschlag — keine verfügbare Integration
Dies ist ein Entwurf zur Prüfung durch die Maintainer, basierend auf öffentlichem Quellcode und der öffentlichen Twilio-Dokumentation, die am 22. Oktober 2026 gesichtet wurde. Seitdem wurde ein einfacher Twilio-Anbieter veröffentlicht (`@churchapps/texting` 0.6.0 und B1 Admin **Settings > Texting**): Die Kirche gibt ihre Account SID, ihren Auth Token und eine Absendernummer (From) ein. Der Anbieter akzeptiert außerdem eine Messaging Service SID, die mit `MG` beginnt; das Feld `fromNumber` ist jedoch weiterhin `varchar(20)` und damit zu kurz für eine 34 Zeichen lange SID. Textnachrichten werden pro Empfänger über die Messages API von Twilio versendet, und STOP-Antworten erreichen B1 über den vorhandenen eingehenden Webhook. Siehe [Kircheneinstellungen: Texting](../../b1-admin/settings/church-settings.md#texting). Das Einwilligungsmodell, die Behandlung von Advanced Opt-Out, der Zustellstatus und die Prüfungen der Einsatzbereitschaft unten sind weiterhin Vorschläge und kein ausgeliefertes Verhalten. Der begleitende [Entwurf für das Kircheneinrichtungs-Onboarding](./twilio-byok-onboarding-draft) enthält vorgeschlagene Einrichtungshinweise und kirchenspezifische Beispiele.
:::

## Empfohlener Weg

Twilio in das bestehende Texting-Anbietersystem von B1 aufnehmen, und zwar mit einem **kircheneigenen Twilio-Konto, eigenen API-Zugangsdaten, einem Messaging Service und einer SMS-fähigen Telefonnummer**. Die Kirche registriert ihre eigene juristische Person und ihre Messaging-Kampagne, bezahlt Twilio direkt, pflegt die Einwilligung der Empfänger und verwaltet die Genehmigung in der Twilio Console. ChurchApps stellt die Integration und die Dokumentation bereit.

Beginnen Sie mit einem Nachrichtenprogramm, einem Messaging Service und einem lokalen US-Absender nach 10DLC pro B1-Kirche. Unterstützt werden Einzel-, Gruppen- und Workflow-Textnachrichten sowie Erinnerungen mit Opt-in über die bestehenden B1-Bildschirme. Ein sinnvolles erstes Programm umfasst Gottesdienständerungen, Veranstaltungserinnerungen und die Einsatzplanung von Ehrenamtlichen, sofern alle drei in der Einwilligung und der genehmigten Kampagne dieser Kirche beschrieben sind. Spenden- oder Werbenachrichten erfordern einen separat geprüften Umfang und eine eigene Einwilligung; sie dürfen nicht stillschweigend in dieses Programm aufgenommen werden.

| Verantwortlichkeit | Kirche | B1 / ChurchApps |
|---|---|---|
| Twilio-Konto, Abrechnung, Rufnummernbesitz | Besitzt und verwaltet sie | Stellt kein Plattformkonto bereit und verkauft keine Guthaben weiter |
| Marke, Kampagne, Registrierung der Nummer | Reicht korrekte Angaben zur Kirche ein; übernimmt Prüfung und Korrekturen | Erklärt die Voraussetzungen und liest die verfügbaren Informationen zur Einsatzbereitschaft |
| Anmeldeseite, Richtlinien, Zweck der Nachricht | Veröffentlicht und pflegt sie | Stellt kompatible Formularelemente, Beispiele und Einwilligungsnachweise bereit |
| Empfängerberechtigung und STOP-Behandlung | Prüft die Einwilligungsnachweise und fordert außerhalb von SMS eingegangene an | Setzt Einwilligung, Sperrungen, Berechtigungen und signierte Webhooks durch |
| Zustellung und Support | Beobachtet Twilio-Fehler, den Kontostatus und eingehende Antworten | Zeigt den Status von Einreichung und Zustellung, ohne Genehmigungen zuzusichern |

Ein ChurchApps-eigenes übergeordnetes Twilio-Konto, Unterkonten für Kunden, der Kauf von Nummern, Trust-Hub-Einreichungen, Abrechnung, ein Konversations-Posteingang, MMS/WhatsApp, internationaler Versand und das Onboarding für gebührenfreie Nummern werden zurückgestellt. Gebührenfreie Nummern sind ein eigener Weg für verifizierte Absender und kein Umgehen der Registrierung. Diese Abgrenzungen sorgen dafür, dass die erste Version zum bestehenden Modell „Bring your own provider“ von B1 passt.

## Vorhandene Grundlage und Lücken

Die folgenden Beobachtungen beziehen sich auf bestimmte Quellcode-Stände und nicht auf die Annahme, was derzeit bereitgestellt ist:

| Komponente | Bestehendes Verhalten | Auswirkung |
|---|---|---|
| [Anbieterregister und Vertrag](https://github.com/ChurchApps/Packages/tree/68c93d610031d3ed56d3582055413e851c5cb2ee/texting/src) | `ITextingProvider` bietet Einzel- und Massenversand, Validierung, optionale Fähigkeiten für Abonnenten/Listen und eine Anbieter-Nachrichten-ID in den Ergebnissen. Es ist kein Twilio-Adapter registriert. | Twilio in `@churchapps/texting` ergänzen; es werden weder Abonnentenanlage noch vom Anbieter verwaltete Listen benötigt. |
| [Texting-Einstellungen](https://github.com/ChurchApps/B1Admin/blob/e33cc2386d96e2e3cb24e760d458a72b699c71c3/src/settings/components/TextingSettingsEdit.tsx) | Clearstream, Text In Church und Nalo sind auswählbar; MinistryStuff ist funktionsbeschränkt. Das Bearbeiten und Speichern des Absenders ist derzeit nur für Nalo vorgesehen. | Explizite Twilio-Felder, Validierung, Speichern des Absenders und Onboarding-Hilfe ergänzen. Ein Eintrag im Dropdown allein genügt nicht. |
| [Controller](https://github.com/ChurchApps/Api/blob/82eda28b6803754548ce007bd52177a21700f118/src/modules/messaging/controllers/TextingController.ts) und [Modul-Gateway](https://github.com/ChurchApps/Api/blob/82eda28b6803754548ce007bd52177a21700f118/src/shared/modules/MessagingModuleGateway.ts) | Zugangsdaten sind verschlüsselt und maskiert; manueller und automatischer Versand ermitteln den Anbieter einer Kirche. Gruppenversand entfernt doppelte Telefonnummern. | Diese Wege wiederverwenden und die Autorisierung beibehalten. Neue Gates für Einwilligung und Einsatzbereitschaft in einen gemeinsamen serverseitigen Pfad legen, damit Workflows sie nicht umgehen können. |
| [STOP-Helfer](https://github.com/ChurchApps/Api/blob/82eda28b6803754548ce007bd52177a21700f118/src/modules/messaging/helpers/SmsOptOutHelper.ts) | Verarbeitet Twilio-typische `From`/`Body`-Felder; prüft ein Kirchen-URL-Token; setzt `person.optedOut` und deaktiviert SMS-Erinnerungen. Andere Antworten werden ignoriert. | Ein nützlicher Ausgangspunkt, aber kein vollständiger Twilio-Webhook. Twilio-Signaturen und eine eigenständige SMS-Abonnementverwaltung ergänzen. |
| [Nachrichtenschema](https://github.com/ChurchApps/Api/blob/82eda28b6803754548ce007bd52177a21700f118/tools/migrations/messaging/2026-04-03_initial_schema.ts) | Speichert `apiKey`, `apiSecret` und eine `fromNumber` mit 20 Zeichen; Zustellprotokolle speichern sofortigen Erfolg/Fehler, nicht Anbieter-IDs oder endgültige Zustellstatus. | Eine E.164-Absendernummer passt; eine 34 Zeichen lange Messaging-Service-SID braucht ein eigenes Feld. Dauerhafte Speicherung von Anbieter-Nachrichten- und Statusdaten ergänzen. |
| [Öffentliche Formularseite](https://github.com/ChurchApps/B1App/blob/5ca19ee4ef947235b8ffba9fbb35af42d0dcb41d/src/app/%5BsdSlug%5D/%28public%29/%5BpageSlug%5D/%5Bid%5D/components/FormPage.tsx), [gemeinsamer Formular-Renderer](https://github.com/ChurchApps/Packages/blob/68c93d610031d3ed56d3582055413e851c5cb2ee/apphelper/src/forms/components/QuestionEdit.tsx) und [Controller für Einreichungen](https://github.com/ChurchApps/Api/blob/82eda28b6803754548ce007bd52177a21700f118/src/modules/membership/controllers/FormSubmissionController.ts) | Formulare ohne Einschränkung und optionale Kontrollkästchen sind vorhanden. Beschreibungen sind reiner Text. Einreichungen speichern Antworten, der Texting-Pfad hat jedoch kein kampagnenspezifisches Einwilligungsprotokoll. | Ein konfiguriertes SMS-Einwilligungselement mit echten Richtlinienlinks und serverseitiger Erfassung der Nachweise ergänzen. Ein allgemeines Kontrollkästchen oder eine Gruppenmitgliedschaft darf SMS nicht automatisch erlauben. |

Die [Dokumentation der Kircheneinstellungen](../../b1-admin/settings/church-settings#texting) für Endbenutzer erklärt außerdem, dass das aktuelle Opt-out-Flag mit der Datenschutzeinstellung des Verzeichnisses geteilt wird. Diese Kopplung ist ein Thema für die Freigabe: Das Antworten mit START darf die Sichtbarkeit im Verzeichnis niemals ändern.

## Konfiguration und Gestaltung der Zugangsdaten

Verwenden Sie explizite, additive Konfigurationsfelder, anstatt `fromNumber` zu überladen oder strukturierte Daten in einer API-Schlüssel-Zeichenfolge abzulegen:

| Feld | Vorgeschlagener Zweck |
|---|---|
| `accountSid` | Kennung des kircheneigenen Twilio-Kontos bzw. Projekts (`AC…`) |
| `apiKey`, `apiSecret` | Dedizierte Twilio-API-Key-SID (`SK…`) und Geheimnis für den ausgehenden API-Zugriff; verschlüsselt und maskiert |
| `webhookAuthToken` | Account Auth Token, den das Twilio-SDK zur Prüfung eingehender Signaturen verwendet; separat verschlüsselt und maskiert |
| `messagingServiceSid` | Messaging Service der Kirche (`MG…`, 34 Zeichen) |
| `fromNumber` | Ausgewählte SMS-fähige Nummer im E.164-Format, als Absender in diesem Konto bzw. Dienst verifiziert |
| Programmkonfiguration | Stabile Programm-ID, Name, zulässige Zwecke, URLs für Anmeldung/Richtlinien und Version des Hinweistexts |

Twilio [bevorzugt API-Schlüssel für die REST-Authentifizierung](https://www.twilio.com/docs/iam/api-keys). Verwenden Sie die engsten getesteten Berechtigungen des Schlüssels, die das Senden und die erforderlichen schreibgeschützten Einrichtungsprüfungen abdecken. Der Account Auth Token wird weiterhin für die [standardmäßige Signaturprüfung von Twilio-Webhooks](https://www.twilio.com/docs/usage/security) benötigt. Erklären Sie diesen Unterschied in der Benutzeroberfläche: Ein API-Geheimnis ist kein Webhook-Auth-Token. Bewahren Sie Zugangsdaten ausschließlich im serverseitigen Einstellungsspeicher auf, niemals auf öffentlichen Seiten, in Formularantworten, in Sendeanfragen aus dem Browser oder in Support-Tickets.

Die Kirche erstellt und verwaltet diese Ressourcen in der Console. Die Validierungsaktion von B1 darf nur den konfigurierten Dienst, die Absender und die Registrierungsinformationen lesen. Sie darf keine Nummern kaufen, keine Kampagnen anlegen, keine Twilio-Einstellungen ändern und auch keine Testnachricht als Nebenwirkung senden. Stellen Sie eine separate, ausdrücklich ausgelöste Testversand-Aktion bereit, die auf einen berechtigten, zustimmenden Empfänger beschränkt ist.

Behalten Sie maskierte Zugangsdaten nur bei, wenn der gleiche gespeicherte Anbieter bearbeitet wird. Der Wechsel zu Twilio muss eigene Zugangsdaten verlangen und veraltete anbieterspezifische Werte löschen; ein maskierter Clearstream- oder Nalo-Schlüssel darf nicht in eine Twilio-Konfiguration übernommen werden.

Begrenzen Sie jedes Laden und Aktualisieren auf die authentifizierte B1-Kirche. Binden Sie Rückrufe an eine gespeicherte Integration und das erwartete Twilio-Konto, den Dienst bzw. den Absender, und weisen Sie widersprüchliche kirchenübergreifende Zuordnungen zurück. Eine Rotation der Zugangsdaten oder die Trennung des Anbieters muss die Einsatzbereitschaft ungültig machen und die eingereihten Versendungen anhalten, ohne Einwilligungen oder bisherige Zustellprotokolle zu löschen.

## Einwilligung und Sperrung sind verpflichtende Freigabearbeiten

Führen Sie telefonnummerngebundene Abonnementdatensätze für das Twilio-Programm sowie anhängbare (nur ergänzbare) Ereignisse für Einwilligung und Sperrung ein. Als Mindestnachweis wird vorgeschlagen: Kirchen-ID, Programm-ID, normalisierte Telefonnummer, optionale verifizierte Zuordnung zu einer Person, bestätigende Handlung, Quell-Formular- bzw. Einreichungs-ID oder geprüfter externer Nachweis, serverseitiger Zeitstempel, Text bzw. Version des Hinweises, Quell-URL, Richtlinien-URLs sowie Ereignisse für Widerruf und Wiederaufnahme. Zugriff und Aufbewahrung sind im Rahmen der bestehenden Datenschutzrichtlinie der Kirche zu begrenzen.

Verwenden Sie Zustände wie `unknown`, `pending`, `active` und `suppressed`. Bestehende Mobilnummern, importierte Kontakte, Anwesenheit, Spenden, Gruppenmitgliedschaft, `person.optedOut = false` und `allowSms` sind keine bestätigende Einwilligung für das Programm. Der Import dokumentierter Einwilligungen muss eine berechtigte, protokollierte Aktion mit erfasster Quelle sein; eine Migration darf nicht alle einschreiben.

Für den anfänglichen Weg über das Web verwenden Sie den Standardmodus für öffentliche Formulare von B1. Fügen Sie eine ausdrücklich konfigurierte SMS-Einwilligungsfrage hinzu, die nicht angekreuzt beginnt, optional bleibt, anklickbare Richtlinienlinks anzeigt und einem Programm sowie einem Mobilfeld zugeordnet ist. Prüfen Sie diese Zuordnung serverseitig und speichern Sie beim Speichern einer bejahenden Antwort den angezeigten Hinweis als Momentaufnahme. Leiten Sie Einwilligung niemals aus beliebigen Fragetexten, aus konversationeller KI oder aus einer Workflow-Mitgliedschaft ab. Ein konversationelles Pendant darf erst aktiviert werden, wenn seine ausdrückliche bejahende Interaktion und die Erfassung der Nachweise getestet sind.

Eine nicht angekreuzte Einreichung erstellt kein Abonnement und darf eine bestehende Einwilligung einer anderen Person nicht zurückziehen. Binden Sie die Einwilligung an die eingereichte Telefonnummer; Mitarbeitende können mehrdeutige Personenzuordnungen auflösen, ohne Haushaltsdaten zusammenzuführen. Eine geänderte Mobilnummer benötigt eine eigene Einwilligung. Bei anonymen Formularen müssen Missbrauchsschutz angewendet und jede Prüfung der Rufnummernzugehörigkeit oder jeder Double-Opt-in-Schritt ausdrücklich gemacht werden; ein angekreuztes Feld allein belegt nicht, wem die Telefonnummer gehört. Wird eine Bestätigung verwendet, bleibt das Abonnement bis zu ihrem Abschluss ausstehend, und genau dieser Ablauf ist in den Anmeldeunterlagen zu beschreiben.

Trennen Sie bei Twilio die SMS-Sperrung von der Sichtbarkeit im Verzeichnis. Überführen Sie eine bestehende Opt-out-Angabe konservativ in einen Sperrdatensatz; andere bestehende Empfänger bleiben `unknown`. Eine ausdrücklich dokumentierte neue Anmeldung darf die SMS-Einwilligung begründen, während die Datenschutzeinstellung des Verzeichnisses unverändert bleibt. Das Verhalten anderer Anbieter bleibt erhalten, bis deren Migrationen separat geprüft sind.

Bei jedem tatsächlichen Versand muss die Kirchenintegration aktiviert bzw. einsatzbereit sein, für genau diese Telefonnummer muss eine aktuelle Programmeinwilligung vorliegen, es darf keine Sperre auf Telefonnummernebene bestehen, und die bestehende Berechtigung des Aufrufers muss gegeben sein. Erinnerungen berücksichtigen zusätzlich `allowSms`, Kategorieeinstellungen und Ruhezeiten. Prüfen Sie nach dem Einreihen erneut, lösen Sie Platzhalter auf, normalisieren und validieren Sie Nummern und entfernen Sie Duplikate anhand der Telefonnummer. STOP sperrt alle Versendungen für den Dienst bzw. das Programm, einschließlich manueller Versendungen und Workflows; die Sperre muss außerdem jede Person erfassen, die sich diese Telefonnummer teilt.

Stellen Sie die Identität der Kirche und den STOP-Hinweis einheitlich im gemeinsamen Twilio-Versandpfad dar und zeigen Sie die endgültige Anzahl der SMS bzw. Segmente in der Vorschau an. Platzhalter-Ersetzung und Längenbehandlung müssen diese Bestandteile erhalten; der Opt-out-Hinweis darf nicht stillschweigend gekürzt werden. Halten Sie Beispiele und die tatsächlichen Erinnerungs- und Workflow-Vorlagen aufeinander abgestimmt.

## Twilio-Versand, Antworten und Zustandsverfolgung

Implementieren Sie `TwilioProvider.sendMessage` über die Messages API mit dem gewählten Messaging Service und Absender. Geben Sie eine Nachrichten-SID des Anbieters und ein Ergebnis „angenommen/übermittelt“ zurück; die HTTP-Annahme bedeutet keine Zustellung am Endgerät. Ein Gruppenversand liefert Ergebnisse pro Empfänger in der Reihenfolge der Eingabe.

Begrenzen Sie die gleichzeitigen ausgehenden Anfragen für **sowohl** `sendBulk` als auch einzelne Versendungen: Der aktuelle Zweig für Platzhalter verteilt `sendMessage`-Aufrufe parallel. Speichern Sie Versandabsicht und abrufbare Arbeitsaufträge für Gruppen, die nicht in ein Zeitbudget einer Anfrage passen; nutzen Sie dafür das bestehende Bereitstellungsmodell, anstatt Kirchen einen weiteren Dienst betreiben zu lassen. Wiederholen Sie bekannte vorübergehende Fehler und Ratenbegrenzungen mit Backoff. Behandeln Sie unklare Zeitüberschreitungen als unbekanntes Ergebnis, das abgeglichen werden muss, und nicht als Aufforderung, blind erneut zu senden, was doppelte Nachrichten und Kosten riskieren würde.

Konfigurieren Sie kirchenspezifische URLs für eingehende Nachrichten und Statusrückrufe. Prüfen Sie `X-Twilio-Signature` mit dem SDK, der exakt konfigurierten externen URL, den ursprünglichen Formularparametern und dem passenden Account Auth Token. Eine geheime URL allein genügt nicht. Ordnen Sie Rückrufe gespeicherten Datensätzen von Kirche, Konto und Nachricht zu, behandeln Sie Duplikate und Rückrufe, die eintreffen, bevor das Sendeergebnis festgeschrieben ist, und verhindern Sie, dass ältere Ereignisse einen Endstatus überschreiben. Geben Sie für eingehende Bestätigungen leeres TwiML zurück und für Statusereignisse eine passende Erfolgsantwort. [Twilio-Sicherheit](https://www.twilio.com/docs/usage/security), [Statusrückrufe](https://www.twilio.com/docs/messaging/guides/track-outbound-message-status)

Empfohlen wird **Advanced Opt-Out** im Messaging Service. Twilio übernimmt die Bestätigungen für STOP/START/HELP; B1 verarbeitet authentifizierte `OptOutType`-Ereignisse, ohne doppelte Bestätigungen zu senden. STOP sperrt sofort. START stellt nur ein bekanntes Abonnement für genau dasselbe offengelegte Programm wieder her, mit einem neuen Wiederaufnahme-Ereignis; es darf keine neue Telefonnummer für unabhängige Nachrichten freischalten und keine Erinnerungseinstellungen aktivieren. HELP meldet niemanden an. Andere eingehende Antworten liegen außerhalb des Posteingangs von B1; Kirchen brauchen eine dokumentierte Möglichkeit, sie in Twilio zu überwachen. [Advanced Opt-Out](https://www.twilio.com/docs/messaging/tutorials/advanced-opt-out)

Speichern Sie die Twilio-Nachrichten-SID, die Zuordnung von Konto und Dienst, den Zeitpunkt der Einreichung, den endgültigen Status bzw. Fehlercode und den Zeitpunkt des Rückrufs zusammen mit dem Zustellprotokoll. Zeigen Sie „eingereiht/angenommen“, „zugestellt“, „fehlgeschlagen“, „nicht zugestellt“ oder „unbekannt“ korrekt an. Behalten Sie den bestehenden Antwortvertrag für andere Anbieter bei und legen Sie fest, ob Erfolgszählungen die Einreichung oder die Zustellung darstellen.

## Prüfung der Einsatzbereitschaft und Validierung der Genehmigung

Zeigen Sie getrennte Prüfpunkte für Zugangsdaten, Eigentum von Dienst bzw. Absender, Kampagnenverifizierung, Registrierung der Nummer, Webhook-Prüfungen und einen zugestellten Smoke-Test. Zeigen Sie niemals ein einziges grünes Abzeichen „genehmigt“ allein deshalb an, weil die Zugangsdaten funktionieren.

Lesen Sie bei lokalen US-Nummern die [Usa2p-Kampagnenressource](https://www.twilio.com/docs/messaging/api/usapptoperson-resource) des Dienstes und verlangen Sie, dass die betreffende Kampagne den Status `VERIFIED` hat. Prüfen Sie außerdem getrennt, dass die gewählte Nummer diesem Dienst zugeordnet ist und die Registrierung der Nummer abgeschlossen hat: Eine genehmigte Kampagne kann eine noch ausstehende Nummer haben. Stellt eine unterstützte Lese-API ein erforderliches Signal nicht bereit, zeigen Sie **manuelle Prüfung in der Console erforderlich** an und erfassen Sie die datierte Bestätigung des Kirchenadministrators als solche; kennzeichnen Sie sie nicht als per API verifiziert. Automatisierte Ereignisse zur Nummernregistrierung können später folgen. [Fehler bei der Nummernregistrierung](https://www.twilio.com/docs/api/errors/30035), [A2P-Registrierungsereignisse](https://www.twilio.com/docs/messaging/compliance/a2p-10dlc/event-streams-setup)

Verlangen Sie aktuelle Prüfungen, bevor Versendungen aktiviert werden. Protokollieren Sie, wann und wie die Einsatzbereitschaft geprüft wurde, lassen Sie veraltete Prüfungen ablaufen und pausieren Sie bei widerrufenen Zugangsdaten, geänderten Absendern, Registrierungsfehlern oder anhaltenden Kontofehlern. Die erfolgreiche Zustellung eines Smoke-Tests bestätigt nur den getesteten Weg, nicht eine allgemeine Genehmigung durch Mobilfunkbetreiber oder die Einwilligung eines Empfängers. Der begleitende Entwurf legt die Prüfungen der Kirche vor der Einreichung, vor dem Start und im laufenden Betrieb fest.

## Repository- und Freigabeplan

Der [Beitragsleitfaden der Organisation](https://github.com/ChurchApps/.github/blob/main/CONTRIBUTING.md) verweist Funktionswünsche für B1 an ChurchAppsSupport und Umsetzungs-PRs an die jeweils zuständigen Repositories. Verwenden Sie einen zentralen Funktionswunsch und verknüpfen Sie fokussierte Umsetzungs-PRs damit:

1. **ChurchAppsSupport:** Diesen Entwurf und den Onboarding-Entwurf prüfen, bevor Twilio als verfügbare Funktion für Benutzer dargestellt wird.
2. **Packages:** Den Twilio-Adapter, explizite gemeinsame Konfigurationen und Schnittstellen sowie das Rendering des SMS-Einwilligungsformulars ergänzen, soweit B1Admin und B1App es gemeinsam nutzen. Changesets aufnehmen und über den bestehenden Release-Workflow veröffentlichen, bevor Verbraucher aktualisiert werden.
3. **Api:** Additive Migrationen für Integrationsmetadaten, Einwilligung/Sperrung und Zustandsarten ergänzen; Validierung der Konfiguration, gemeinsame Versandsperren, Erfassung der Formularnachweise, Verarbeitung von Webhooks und die dauerhafte Speicherung von Versandaufträgen umsetzen.
4. **B1Admin:** Konfigurations- und Einsatzbereitschafts-Oberfläche für Twilio, Verwaltung von Programm und Einwilligung, anbieterabhängiges Speichern des Absenders sowie eine korrekte Zustellberichterstattung ergänzen. Keine Einwilligungsübersteuerung über gewöhnliche Personenbearbeitung anbieten.
5. **B1App:** Die öffentliche Formular- und Seitenerfahrung sowie das Erlebnis mit Richtlinienlinks gegenüber den gemeinsamen Steuerelementen prüfen, auch für anonyme Besucher und mobile Nutzer. Ein separater Twilio-Browser-Client ist nicht erforderlich.
6. **ChurchAppsSupport:** Nach der Veröffentlichung den Onboarding-Entwurf in unterstützte Einstellungs- und Hilfeseiten überführen, echte Bildschirmfotos ergänzen, von den Texting-Einstellungen aus verlinken und Übersetzungen organisieren.

Schema und gemeinsame Pakete müssen vor den Verbrauchern bereitgestellt werden. Halten Sie Twilio für einen kleinen, bewusst gewählten Pilotbetrieb hinter einem Feature-Schalter; bestehende Anbieter müssen weiter funktionieren. Ein Rollback deaktiviert den Twilio-Versand und bricht noch nicht eingereichte Aufträge ab, bewahrt aber Sperrungen und Nachweise; er darf Empfänger nicht automatisch auf einen anderen Anbieter oder Absender umstellen.

## Aufwandsabschätzung

Planungsschätzung für einen mit dem Ökosystem vertrauten Beitragenden; in dieser Abschätzung wurden keine Produktionszugangsdaten und keine echten SMS verwendet:

| Arbeit | Entwicklertage |
|---|---|
| Adapter, Erweiterungen der Konfiguration und des Schemas, Einstellungs-Oberfläche | 2–3 |
| Telefon-/Programmeinwilligung, unabhängige Sperrung, gemeinsame Versandsperren, Integration des öffentlichen Formulars | 3–5 |
| Signierte Rückrufe, dauerhafte Speicherung der Zustellung, begrenzter und dauerhafter Versand | 2–3 |
| Oberfläche zur Einsatzbereitschaft, Leitfaden für Kirchen, Integrations- und Regressionstests, Korrekturen im Pilotbetrieb | 3–4 |
| **Empfohlener Umfang für den Start** | **10–15 insgesamt** |

Ein einfacher Machbarkeitsnachweis für Adapter und Einstellungen dauert etwa 1–2 Tage. Eine Schätzung nur für den Absender schließt die Arbeit an Einwilligung und Onboarding aus, die für diese Empfehlung notwendig ist. Die Prüfzeit durch Twilio und die Mobilfunkbetreiber ist separat und schwankt; das Projekt darf weder ein Genehmigungsdatum noch ein Genehmigungsergebnis zusichern.

## Abnahmekriterien

- [ ] Die Kirche besitzt und bezahlt Konto, Dienst, registrierten Absender und Kampagne; es ist kein von ChurchApps verwaltetes Twilio-Konto erforderlich.
- [ ] Zugangsdaten sind verschlüsselt und maskiert, mandantengetrennt, rotierbar und weder in Protokollen noch in öffentlichen Inhalten enthalten; die Validierung ist schreibgeschützt.
- [ ] Eine optionale, nicht angekreuzte Einwilligung zeigt echte Richtlinienlinks an und speichert Programm-, Telefon- und Hinweisnachweise serverseitig; wer ablehnt, kann trotzdem die primäre Formularaktion ausführen.
- [ ] Alle manuellen, Gruppen-, Platzhalter-, Workflow- und Erinnerungswege erzwingen dieselbe Twilio-Berechtigungsprüfung. Unbekannte, nicht eingewilligte, geänderte oder gesperrte Empfänger werden mit einem verständlichen Grund übersprungen; die Darstellung erhält die Identität der Kirche und den STOP-Hinweis nach Ersetzung und Längenbehandlung.
- [ ] Die bestehende Verzeichnis-Datenschutzeinstellung meldet keine Empfänger an; STOP/START ändert niemals die Sichtbarkeit im Verzeichnis oder unabhängige Einstellungen. Fälle mit geteilter Telefonnummer und kirchenübergreifende Fälle sind getestet.
- [ ] Signierte STOP/START/HELP-Ereignisse, ungültige Signaturen, falsche Konten bzw. Dienste, doppelte Ereignisse, wiederholte Formularübermittlungen und gefälschte Einwilligungszuordnungen sind abgedeckt.
- [ ] Gruppengröße bzw. Zeitüberschreitungen, Ratenbegrenzungen, Teilausfälle, unklare Ergebnisse, Rennbedingungen bei Rückrufen und Ereignisse außerhalb der Reihenfolge sind ohne doppelte Versendungen getestet.
- [ ] Genehmigung der Kampagne und abgeschlossene Registrierung der Nummer sind klar von der Prüfung der Zugangsdaten getrennt. Manuelle Nachweise sind eindeutig gekennzeichnet; veraltete oder widerrufene Einsatzbereitschaft blockiert Versendungen.
- [ ] Eine Pilotkirche prüft ihre Anmeldeseite, den abgelehnten und den angenommenen Formularweg, die exakten Richtlinien-URLs sowie einen einwilligenden Testempfänger durch Einreichung, Zustellung, STOP-Sperrung und zulässige erneute Anmeldung.
- [ ] Die bestehenden Einstellungen und das Versandverhalten für Clearstream, Text In Church und Nalo bestehen die Regressionsprüfungen; der Hilfetext unterscheidet Vorschläge von veröffentlichten Funktionen.
