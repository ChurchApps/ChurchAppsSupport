---
title: "Twilio-Onboarding für Gemeinden (Entwurf)"
description: "Entwurf für die von der Gemeinde betriebene Twilio-Einrichtung in B1, öffentliche Anmeldehinweise, Kampagnenbeispiele und Freigabe-Checkliste."
---

# Von der Gemeinde betriebener Twilio-Onboarding-Entwurf

:::caution Entwurf für die geplante Integration
Dies ist ein vorgeschlagener Arbeitsablauf. B1 bietet inzwischen eine grundlegende Auswahl **Twilio** unter **Settings > Texting** (Account SID, Auth Token, From Number und den eingehenden STOP-Webhook) – siehe [Gemeindeeinstellungen: Texting](../../b1-admin/settings/church-settings.md#texting). Die zusätzlichen Steuerelemente für die B1-Einrichtung, die Zuordnung der Einwilligungen und die unten beschriebenen Prüfschritte sind Anforderungen für ein künftiges Release und keine Anleitung, bestehende Einstellungen zu suchen. Lesen Sie den [technischen Vorschlag](./twilio-byok-proposal) für Umfang und Abhängigkeiten. Die Twilio-Quellen wurden am 22. Oktober 2026 geprüft; prüfen Sie die aktuellen Anforderungen, bevor Sie eine Kampagne einreichen.
:::

## Die empfohlene Struktur

Ihre Gemeinde besitzt ihr kostenpflichtiges Twilio-Konto, ihre Telefonnummer, ihren Messaging Service, die Abrechnung und die Kampagnenregistrierung. B1 würde über diese Ressourcen senden, und zwar mit Zugangsdaten, die privat in den Gemeindeeinstellungen hinterlegt werden. Sorgen Sie dafür, dass mindestens zwei geeignete Gemeindeadministratorinnen oder -administratoren Zugriff auf das Twilio-Konto haben, aktivieren Sie die Kontosicherheit und benennen Sie eine verantwortliche Person für Einwilligungen, eingehende Antworten und Ablehnungshinweise.

Der hier vorgeschlagene erste Release umfasst eine lokale US-Telefonnummer und ein klar beschriebenes Gemeinde-Nachrichtenprogramm. Die Beispiele unten verwenden das fiktive Programm **Grace Community Church** mit dem Namen **Grace Church Updates** für Gottesdienständerungen, Veranstaltungserinnerungen und die Planung von Ehrenamtlichen. Ersetzen Sie jeden Namen, jede Domain, jede Häufigkeit, jeden Kontakt und jeden Zweck durch die tatsächliche Praxis Ihrer Gemeinde. Diese Beispiele illustrieren Twilios Regeln für eine bestimmte Gemeinde; sie sind keine vorab genehmigte Kampagne und kein Versprechen einer Freigabe.

## 1. Die öffentliche B1-Anmeldung vorbereiten

Veröffentlichen Sie eine Seite wie `https://www.example.org/text-updates` auf der B1-Website der Gemeinde, mit einem eingebetteten öffentlichen B1-Formular oder einem deutlichen Link zu dessen eigenständigem öffentlichen Formular. Veröffentlichen Sie außerdem `https://www.example.org/privacy` und `https://www.example.org/sms-terms`. Diese Adressen sind Platzhalter; reichen Sie die tatsächlich erreichbaren URLs ein.

Für das vorgeschlagene SMS-Anmeldeformular:

| Einstellung | Empfohlene Konfiguration |
|---|---|
| Zugang | Öffentlich/uneingeschränkt; während der Prüfung und der laufenden Anmeldung aktiv; ohne Login verfügbar |
| Formularmodus | Zunächst Standardmodus; der Gesprächsmodus benötigt die ausdrückliche Einwilligungsunterstützung, die im technischen Vorschlag beschrieben ist |
| Mobilnummer | Deutlich beschriftet mit Ländervorwahl; nur dann erforderlich, wenn die SMS-Anmeldung gewählt wird, sofern sie in einem allgemeinen Verbindungs-/Veranstaltungsformular verwendet wird |
| SMS-Auswahl | Separates optionales Kästchen, standardmäßig nicht angekreuzt, zugeordnet zu dem konkreten Programm und dem Feld für die Mobilnummer |
| Hinweise | Sichtbar neben der SMS-Auswahl: Gemeinde/Programm, Zweck und Häufigkeit der Nachrichten, mögliche Gebühren, STOP, HELP, Support-Kontakt sowie anklickbare Links zur Datenschutzerklärung bzw. zu den SMS-Bedingungen |
| Andere Aktionen | Gäste können die Verbindungskarte absenden, sich für eine Veranstaltung anmelden oder Informationen anfordern, ohne sich für SMS anzumelden |
| Nachweis | Speichern Sie Programm, genaue Telefonnummer, gewählte Einwilligung, eingereichte Quelle, Serverzeit und die Version der Hinweise bzw. Richtlinien; eine gewöhnliche Formularantwort allein meldet heute niemanden an |
| Automatisierung für Personen/Gruppen | Lassen Sie die automatische Anlage von Personen und die Gruppenzuweisung für eine erste Anmelde-Pilotphase ausgeschaltet, sofern nicht die bestehenden Abgleichsregeln der Gemeinde geprüft wurden. Die Gruppenzuweisung ist niemals die SMS-Einwilligung. |
| Bestehende Automatisierungen | Melden Sie nicht jede Person, die ein Formular absendet, oder jedes Gruppenmitglied in einen Textnachrichten-Workflow ein. Nur die vorgeschlagene, geprüfte Einwilligungszuordnung darf dieses Programm freigeben. |
| Dankestext | Bestätigen Sie den Eingang des Formulars, ohne eine SMS-Anmeldung zu behaupten, wenn das Kästchen abgelehnt wurde oder die Bestätigung bzw. Prüfung noch aussteht. |

Ein bestehendes Kontrollkästchen kann das Formular veranschaulichen, doch B1 benötigt weiterhin das Einwilligungsprotokoll und die Sendesperren. Der aktuelle gemeinsame Renderer zeigt Beschreibungen als reinen Text; Markdown oder eine URL dort einzugeben reicht nicht aus, um sicherzustellen, dass Richtlinien-Links anklickbar sind. Die Umsetzung muss ein barrierefreies Einwilligungselement mit tatsächlichen Links bereitstellen. Siehe [B1-Formulare erstellen](../../b1-admin/forms/creating-forms) und den [technischen Vorschlag](./twilio-byok-proposal#consent-and-suppression-are-required-release-work).

Twilio verlangt eine freiwillige, nachweisbare Einwilligung (Opt-in). Bündeln Sie SMS nicht mit verpflichtenden Mitgliedsbedingungen, E-Mail-/Telefonberechtigungen, Spendeneinwilligungen oder Veranstaltungsanmeldungen. Eine Mobilnummer auf einer Besucherkarte ist für sich genommen keine SMS-Einwilligung. Siehe Twilios [Anforderungen an die freiwillige Einwilligung](https://www.twilio.com/docs/api/errors/30923) und [Empfehlungen für Kampagnen](https://help.twilio.com/hc/en-us/articles/26149060902555-A2P-10DLC-Campaign-Registration-Recommendations).

### Beispieltext für die Anmeldung

Verwenden Sie dies erst, nachdem die Gemeinde die tatsächlichen Zwecke, den Absender und die Häufigkeit festgelegt hat. Das Kästchen ist optional und startet nicht angekreuzt; die Namen der Richtlinien müssen im gerenderten Formular Links sein.

> Ja, ich möchte, dass mir die Grace Community Church über Grace Church Updates per Textnachricht schreibt, zu Gottesdienständerungen, Gemeindeveranstaltungen und Ehrenamtsplänen, von [registrierte Gemeindenummer]. Rechnen Sie mit bis zu 4 Nachrichten pro Monat. Es können Nachrichten- und Datentarife anfallen. Antworten Sie mit STOP, um sich abzumelden, oder mit HELP, um Hilfe zu erhalten. Die SMS-Anmeldung ist freiwillig und nicht erforderlich, um am Gottesdienst teilzunehmen, sich anzumelden oder zu geben. Siehe unsere Datenschutzerklärung und die SMS-Bedingungen. Fragen: [Support-E-Mail oder Telefon der Gemeinde].

„Bis zu 4“ ist eine Beispielzusage und keine von Twilio vorgeschriebene Grenze. Ersetzen Sie sie durch eine Häufigkeit, die die Gemeinde tatsächlich einhalten kann; wenn sie schwankt, geben Sie das wahrheitsgemäß an und beschreiben Sie den erwarteten Rhythmus. Halten Sie werbliche Appelle oder zusätzliche Dienstprogramme außerhalb dieses Kästchens, sofern ihre Zwecke und Einwilligungen nicht gesondert geprüft wurden.

Bei einem allgemeinen Formular für Besucher oder Veranstaltungen muss das Absenden mit nicht angekreuztem Kästchen trotzdem gelingen. Ein eigenes Formular nur für SMS darf erklären, dass das Ankreuzen eine Anmeldung anfragt, darf aber niemals dazu führen, dass nicht zusammenhängende Gottesdienste von einer Anmeldung abhängen. Prüfen Sie das tatsächliche Verhalten sowohl auf dem Telefon als auch auf dem Desktop.

### Zu erstellende Richtlinieninhalte

Die Datenschutzseite der Gemeinde sollte erklären, welche Informationen sie für Textnachrichten erhebt, wie sie diese verwendet und schützt, sowie ihre Praxis zu Aufbewahrung und Kontakt. Sie sollte deutlich festhalten, dass Mobilnummern und Einwilligungen für Nachrichten nicht für Werbe- oder Marketingzwecke an Dritte oder verbundene Unternehmen verkauft oder weitergegeben werden. Erläutern Sie die notwendige Verarbeitung durch Dienstleister korrekt; behaupten Sie nicht, die Gemeinde setze nie einen Auftragsverarbeiter ein, während sie B1 und Twilio nutzt. Twilios [Hinweise zur Datenschutzerklärung](https://www.twilio.com/docs/api/errors/30908) und [Empfehlungen für Kampagnen](https://help.twilio.com/hc/en-us/articles/26149060902555-A2P-10DLC-Campaign-Registration-Recommendations) sind die Referenz für diese Unterscheidung.

Die SMS-Bedingungen sollten die Gemeinde und das Programm, die Zwecke, die tatsächliche Häufigkeit, mögliche Nachrichtengebühren, die Anweisungen zu STOP/HELP, den Support-Kontakt und den Link zur Datenschutzerklärung nennen; außerdem alle zusätzlichen Hinweise, die Twilios aktuelle Prüfung verlangt. Die Richtlinien-Links auf der Anmeldeseite müssen genau mit den URLs übereinstimmen, die in der Kampagne eingereicht werden. Seit dem 30. Juni 2026 verlangt Twilio für neue API-Kampagnenregistrierungen eigene öffentliche URLs zur Datenschutzerklärung und zu den Bedingungen; auch der Ablauf in der Console fragt sie ab. [Twilio-Anforderung](https://www.twilio.com/en-us/changelog/a2p-10dlc-campaign-registration-will-require-privacy-policy-and-)

Dies sind inhaltliche Anforderungen, die auf die tatsächlichen Richtlinien der Gemeinde anzuwenden sind. Sie ersetzen nicht die bestehenden Datenschutzpraktiken der Gemeinde und sind kein generischer Text, den man ungeprüft einfügt.

## 2. Die Gemeinde und ihr Nachrichtenprogramm bei Twilio registrieren

1. Erstellen Sie ein **kostenpflichtiges, der Gemeinde gehörendes Konto** oder nutzen Sie ein solches sowie eine SMS-fähige lokale US-Telefonnummer. Verwenden Sie den amtlichen Namen der Gemeinde, die EIN bzw. Registrierungsdaten des Unternehmens, die Adresse, die Website und die bevollmächtigte Vertretung durchgehend gleich. Ersetzen Sie die Identität von ChurchApps oder die Angaben einer anderen Gemeinde nicht.
2. Folgen Sie dem Ablauf für die Markenregistrierung (Brand) für Direktkunden bei Twilio, der zur tatsächlichen Rechtsform der Gemeinde passt. Für eine berechtigte gemeinnützige Organisation verwenden Sie die [Hinweise zur Registrierung für Non-Profits](https://www.twilio.com/docs/messaging/compliance/a2p-10dlc/onboarding-for-government-and-non-profit-agencies). Anwendungsfälle für Wohltätigkeits- bzw. 501(c)(3)-Organisationen hängen von der Berechtigung ab; der Name einer Gemeinde allein begründet keine Genehmigung oder Befreiung bei Twilio.
3. Erstellen Sie einen eigenen Messaging Service und reichen Sie die passende A2P-10DLC-Kampagne ein. Wählen Sie den Anwendungsfall, der die tatsächlichen Nachrichten und die Möglichkeiten dieser genehmigten Marke wahrheitsgemäß beschreibt; die Beispiele hier schreiben keinen allgemeingültigen Anwendungsfall-Code für Gemeinden vor.
4. Geben Sie die öffentliche Anmelde-URL, die URLs der Richtlinien, die vollständige Beschreibung der Einwilligung und des Nachrichtenablaufs sowie die angeforderten Musternachrichten an. Nennen Sie jede tatsächliche Anmeldemethode; stimmen Sie die Erklärungen zu eingebetteten Links bzw. Telefonnummern auf den tatsächlichen Inhalt ab. Führen Sie keine Anmeldung per Schlüsselwort oder Double-Opt-in auf, es sei denn, dieser Ablauf existiert und wurde getestet.
5. Ordnen Sie die sendende Nummer dem Dienst und der genehmigten Kampagne zu. Warten Sie auf die Verifizierung der Kampagne **und** den Abschluss der Nummernregistrierung, bevor Sie senden.

Führen Sie diese Schritte in der eigenen Twilio-Console der Gemeinde aus. Die vorgeschlagene B1-Integration reicht keine Registrierungen für Gemeinden ein. Twilios [Schnellstart zur Registrierung](https://www.twilio.com/docs/messaging/compliance/a2p-10dlc/quickstart) und die [Ressource für Kampagnen](https://www.twilio.com/docs/messaging/api/usapptoperson-resource) erklären die Registrierungsfelder und den Status. Eine noch ausstehende Nummer kann das Senden auch dann blockieren, wenn eine Kampagne bereits genehmigt ist. [Nummernregistrierung](https://www.twilio.com/docs/api/errors/30035)

### Beispiel für die Kampagnenbeschreibung

> Die Grace Community Church nutzt Grace Church Updates, um Änderungen am Gottesdienstplan, Erinnerungen an Gemeindeveranstaltungen und Mitteilungen zur Ehrenamts-Planung an Personen zu senden, die sich auf unserer öffentlichen Gemeindewebsite für dieses Programm entscheiden. Wir senden im Rahmen dieses Programms höchstens vier Nachrichten pro Monat. Empfängerinnen und Empfänger können diese Nachrichten jederzeit abbestellen. Dieses Programm umfasst keine gekauften Kontakte, keine Werbung Dritter und keine Spendenaufrufe.

Dieses Beispiel passt nur zu einer Gemeinde, die diese Grenzen und Ausschlüsse tatsächlich einhält. Wenn allein die Ehrenamts-Erinnerungen die zugesagte Häufigkeit überschreiten, ändern Sie das Programmdesign und die Angaben vor der Einreichung.

### Beispiel für die Beschreibung des Nachrichtenablaufs

> Besucherinnen und Besucher öffnen [tatsächliche Anmelde-URL der Gemeinde], geben ihre Mobilnummer ein und wählen unabhängig davon das optionale Kästchen für Grace Church Updates. Es ist beim Öffnen des Formulars nicht angekreuzt. Der Hinweis nennt die Grace Community Church, beschreibt Gottesdienständerungen, Veranstaltungserinnerungen und Ehrenamtspläne, nennt das monatliche Limit und mögliche Tarife und erklärt STOP und HELP. Die angezeigte Datenschutzerklärung und die SMS-Bedingungen verlinken auf [tatsächliche Datenschutz-URL] und [tatsächliche URL der SMS-Bedingungen]. Wer SMS ablehnt, verliert keine Teilnahme am Gottesdienst, keine Veranstaltungsanmeldung, keine Spende und keinen Zugang zum allgemeinen Verbindungsformular. B1 speichert die bewusste Auswahl, die Telefonnummer, den Zeitpunkt der Absendung und die Version des Hinweises. Wir senden dieses Programm nur an die dokumentierten Abonnentinnen und Abonnenten und unterdrücken Abmeldungen, bevor weitere Nachrichten gesendet werden.

Passen Sie diesen Absatz an den tatsächlich umgesetzten Ablauf an. Wenn eine Bestätigung per Telefon oder eine Prüfung durch Mitarbeitende eingesetzt wird, beschreiben Sie den ausstehenden Zustand und den genauen Aktivierungsschritt. Werden andere Methoden genutzt, nennen Sie jede Methode und ihren Nachweis. Befindet sich die Anmeldung hinter einem Login oder erfolgt sie auf Papier, verlangt Twilio öffentliche, geschwärzte Belege der tatsächlichen Anmeldung; geben Sie niemals ausgefüllte Formulare oder Mitgliederdaten preis. [Hinweise zur nachweisbaren Einwilligung](https://www.twilio.com/docs/api/errors/30923)

### Beispiele für ausgehende Nachrichten

Dies sind fiktive Muster zum Anpassen; verwenden Sie vor der Einreichung echte URLs der Gemeinde und ersetzen Sie die Werte in eckigen Klammern. Die Kampagnen-API von Twilio akzeptiert zwei bis fünf Muster. Muster sollten die Gemeinde nennen, den erklärten Zweck widerspiegeln und eine Anweisung zum Abbestellen enthalten. [Felder für Kampagnenmuster](https://www.twilio.com/docs/messaging/api/usapptoperson-resource)

```text
Grace Community Church: Der Gottesdienst am Sonntag beginnt aufgrund von [Grund] um [Uhrzeit]. Details: [Website-URL der Gemeinde]. Antworten Sie mit STOP, um die Nachrichten zu beenden.
```

```text
Grace Community Church: Zur Erinnerung: [Gemeindeveranstaltung] findet am [Datum] um [Uhrzeit] statt. Informationen: [URL der Gemeindeveranstaltung]. Antworten Sie mit STOP, um die Nachrichten zu beenden.
```

```text
Grace Community Church: Sie sind für den Dienst im Team [Team] am [Tag] eingeplant. Bitte prüfen Sie Ihren Plan: [URL des B1-Gemeindeportals]. Antworten Sie mit STOP, um die Nachrichten zu beenden.
```

Die Platzhalter-URLs stehen für Beispielvariablen; die eingereichten Muster sollten die echte Domain der Gemeinde und den tatsächlichen Linkstil zeigen. Ein Link zu einem Plan kann einen Login erfordern, aber die Anmeldeseite und die Richtlinien, die zur Prüfung dienen, sollten öffentlich einsehbar sein. Nehmen Sie keine privaten Notizen, Kinderdaten oder erkennbare Angaben zu Mitgliedern in Freigabemuster auf. Halten Sie die Musterinhalte konsistent mit dem, was die Vorlagen von B1 tatsächlich senden; versprechen Sie kein Antwort-Postfach und kein bestimmtes Erinnerungsverhalten, das nicht verfügbar ist.

### Antworten auf STOP, START und HELP

Verwenden Sie für diese Bestätigungen die Funktion Advanced Opt-Out des Messaging Service von Twilio und passen Sie Identität des Programms bzw. der Gemeinde sowie die Support-Angaben an. Beispiel für die beabsichtigten Antworten:

- **STOP:** Bestätigen Sie, dass Grace Church Updates beendet wurde, und erklären Sie den unterstützten Weg, es wieder zu aktivieren.
- **START:** Bestätigen Sie die Wiederaufnahme genau dieses Programms, einschließlich seiner Identität, Häufigkeit/Tarife und Hilfe- bzw. Abmeldehinweise, wie es die konfigurierte Abfolge verlangt.
- **HELP:** Nennen Sie die Grace Community Church und den tatsächlichen Support-Kontakt sowie Anweisungen zum Abmelden.

Senden Sie keine zweite Bestätigung aus B1, wenn Twilio bereits geantwortet hat. Eine HELP-Antwort ist keine Anmeldung. START darf niemanden für weitere Programme der Gemeinde anmelden und ihn nicht im Mitgliederverzeichnis sichtbar machen. [Twilio Advanced Opt-Out](https://www.twilio.com/docs/messaging/tutorials/advanced-opt-out)

## 3. Das Freigabepaket vor der Einreichung prüfen

- [ ] Die tatsächlichen rechtlichen Angaben, die Markenangaben, die Website-Identität und der Zweck der Kampagne der Gemeinde stimmen überein.
- [ ] Die Anmeldeseite und das aktive Formular öffnen sich ohne Login in einem privaten Browserfenster, auch auf einem Mobilgerät.
- [ ] Das SMS-Kästchen startet nicht angekreuzt und kann abgelehnt werden, während die Hauptaktion für Besucher oder Veranstaltungen abgeschlossen wird.
- [ ] Der Zweck des Programms, der Absender, die tatsächliche Häufigkeit, mögliche Kosten, STOP, HELP, der Support-Kontakt und die anklickbaren Richtlinien-Links erscheinen neben der SMS-Auswahl.
- [ ] Die genauen Datenschutz- und Bedingungs-URLs, die Twilio übermittelt wurden, sind öffentlich, funktionieren ohne Zugangsdaten und nennen dieselbe Gemeinde bzw. dasselbe Programm. Der Richtlinieninhalt stimmt mit der tatsächlichen Verarbeitung überein.
- [ ] Jedes Musterlabel passt zum Programm, zur tatsächlichen Absenderidentität und zum erwarteten Verhalten von Links bzw. Telefonnummern. Die Kampagne beschreibt jede tatsächliche Anmeldemethode.
- [ ] Geschwärzte Screenshots zeigen das leere Formular, das Kästchen bzw. die Hinweise und die Richtlinien-Links so, wie Prüfer sie sehen. Die Belege enthalten keine Mitgliederdatensätze und keine Schlüssel.
- [ ] Die Gemeinde hat einen praktischen Weg, Einwilligungsnachweise aufzubewahren und Widerrufe zu beachten, bevor gesendet wird – auch Anfragen, die per Telefon oder E-Mail eingehen.

Diese Prüfungen verringern vermeidbare Abweichungen; die Entscheidung über die Freigabe treffen Twilio und seine Prüfpartner. Halten Sie die echten Anmelde- und Richtlinien-URLs nicht nur während der Prüfung, sondern auch nach der Freigabe verfügbar.

## 4. Die künftige B1-Integration verbinden und prüfen

Nach Auslieferung der Integration sollte die vorgesehene Texting-Einrichtung von B1 die Account SID der Gemeinde, einen eigenen API-Key-SID/-Secret, ein separates Auth Token für den Webhook, die Messaging-Service-SID und den ausgewählten Absender abfragen. Erstellen Sie Schlüssel nur in der Console der Gemeinde und geben Sie Geheimnisse nur in den privaten B1-Einstellungen ein. [Hinweise zu Twilio-API-Keys](https://www.twilio.com/docs/iam/api-keys)

Kopieren Sie die gemeindespezifischen URLs für eingehende Nachrichten und Zustellstatus, die B1 bereitstellt, in die passende Konfiguration des Twilio-Dienstes. Aktivieren Sie Advanced Opt-Out und prüfen Sie, ob eingehende Nachrichten den konfigurierten Webhook erreichen. B1 sollte getrennte Prüfungen anzeigen für Zugangsdaten, Eigentum an Dienst und Absender, verifizierte Kampagne, abgeschlossene Nummernregistrierung, Überprüfung eingehender Nachrichten und die erfolgreich zugestellte Testnachricht. Eine gespeicherte Zugangsdaten-Angabe oder eine angenommene API-Anfrage ist noch keine endgültige Zustellung.

Wenn B1 ein Registrierungssignal nicht programmatisch prüfen kann, bestätigen Sie es direkt in der Console; die Oberfläche muss das datierte Ergebnis als von der Administration bestätigt kennzeichnen. Klären Sie den Status „ausstehend“ bzw. „fehlgeschlagen“, bevor Sie Produktionsnachrichten aktivieren. Verwenden Sie eine separate, ausdrücklich angeforderte Testnachricht an eine reale, einwilligende erwachsene Testempfängerin bzw. einen Testempfänger, und gehen Sie dann so vor:

1. Bestätigen Sie, dass eine passende dokumentierte Anmeldung den richtigen Einwilligungsdatensatz für Telefonnummer und Programm erzeugt. Eine Ablehnung oder eine Änderung der Telefonnummer darf niemanden stillschweigend anmelden.
2. Senden Sie eine Testnachricht, bestätigen Sie den Empfang und vergleichen Sie den Status in B1 mit der Twilio-Message-SID und dem Zustellergebnis.
3. Antworten Sie mit STOP und prüfen Sie, ob manuelle Nachrichten, Gruppennachrichten, Workflows und Erinnerungen diese Telefonnummer auslassen. Die Sichtbarkeit im Verzeichnis darf sich dadurch nicht ändern.
4. Prüfen Sie den dokumentierten erneuten Anmeldeablauf für dasselbe Programm und die HELP-Antwort; stellen Sie sicher, dass es keine doppelten Bestätigungen und keine unbeabsichtigten Änderungen an anderen Einstellungen gibt.

## 5. Das Programm betreuen

Benennen Sie eine verantwortliche Person in der Gemeinde, die Status der Kampagne und des Kontos, Guthaben- und Abrechnungswarnungen, Nachrichtenfehler und eingehende Antworten in Twilio überwacht. Der vorgeschlagene erste B1-Release hat keinen Posteingang für Konversationen per SMS. Veröffentlichen und überwachen Sie daher einen echten Hilfekontakt und prüfen Sie Antworten, statt davon auszugehen, dass Mitarbeitende sie in B1 sehen.

Bewahren Sie Einwilligungs- und Widerrufsverlauf, aktuelle Versionen der Hinweise bzw. Richtlinien, Kampagnen-IDs und geschwärzte Freigabenachweise in Unterlagen auf, die die Gemeinde kontrolliert. Fügen Sie niemals Schlüssel oder Empfängerlisten in öffentliche Support-Tickets ein. Wenn sich eine Nummer, ein Dienst, Zugangsdaten, der Anmeldeablauf, die Häufigkeit oder der Zweck ändert, prüfen Sie die Integration erneut und aktualisieren Sie Registrierung und Einwilligung, wo nötig, bevor Sie fortfahren. Prüfen Sie gemeinsam genutzte Haushaltsnummern und geänderte Nummern sorgfältig; maßgeblich für die Berechtigung sind die einwilligende Telefonnummer und das Programm, nicht der Datensatz jedes Familienmitglieds.

Bei einer Ablehnung lesen Sie den tatsächlichen Twilio-Fehler, korrigieren Sie die konkrete Unstimmigkeit sowohl auf der Website als auch in der Einreichung und reichen Sie die Kampagne erneut über die Console der Gemeinde ein. Bei nicht registrierten oder ausstehenden Absendern warten Sie auf den Abschluss der Registrierung, statt Nummern zu wechseln, um sie zu umgehen. Verwenden Sie die [Fehlerbehebung für die Registrierung bei Twilio](https://www.twilio.com/docs/messaging/compliance/a2p-10dlc/troubleshooting-a2p-brands) und das bereitgestellte Verzeichnis der Fehlercodes. Versprechen Sie keine feste Bearbeitungszeit.
