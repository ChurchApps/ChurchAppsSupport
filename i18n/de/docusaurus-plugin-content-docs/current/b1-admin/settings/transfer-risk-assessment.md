---
title: "Bewertung des Transferrisikos"
---

# Bewertung des Transferrisikos

<div class="article-intro">

Dieses Dokument enthält die Bewertung von ChurchApps zu Risiken, die mit internationalen Übertragungen personenbezogener Daten von Großbritannien/EWR in die Vereinigten Staaten verbunden sind, wie vom UK GDPR und EU GDPR erforderlich. Dies ist ein internes Compliance-Dokument, das von ChurchApps als Datenverarbeiter gepflegt wird.

</div>

**Zuletzt überprüft:** April 2026

## 1. Übertragungsdetails

| Element | Details |
|---|---|
| **Datenexporteur** | Kirchengemeinden, die ChurchApps verwenden (Datenverantwortliche), in Großbritannien/EWR |
| **Datenimporteur** | ChurchApps (Datenverarbeiter), tätig in den Vereinigten Staaten |
| **Kategorien von Datensubjekten** | Kirchengemeinde-Mitglieder, Besucher, Gäste, Spender, Freiwillige, Kinder (verwaltet von Eltern/Administratoren) |
| **Kategorien personenbezogener Daten** | Namen, E-Mail-Adressen, Telefonnummern, Postanschriften, Geburtsdaten, Geschlecht, Familienstand, Profilfotos, Spendendaten, Anwesenheitsdaten, Gruppenmitgliedschaften, Freiwilligenaufgaben, Nachrichtenverlauf |
| **Sensible Daten** | Keine absichtlich erhoben. Es werden keine Gesundheitsdaten, biometrischen Daten oder Strafregister gespeichert. Finanzkontodetails (Kreditkarten, Bankkonten) werden nie von ChurchApps gespeichert -- diese werden direkt von Stripe verwaltet. |
| **Zweck der Übertragung** | Bereitstellung von Kirchengemeinde-Verwaltungssoftware-Services (Mitgliederverwaltung, Spenden, Anwesenheitsverfolgung, Kommunikation, Freiwilligenplanung, Ereignisregistrierung) |
| **Zielland** | Vereinigte Staaten |
| **Übertragungsmechanismus** | EU Standardvertragsklauseln (SCCs) und UK Internationale Datentransfer-Zusatzbestimmung (IDTA), integriert über das AWS Datenschutzabkommen |

## 2. Unterauftragsverarbeiter

| Unterauftragsverarbeiter | Rolle | Ort | Übertragungsmechanismus |
|---|---|---|---|
| **Amazon Web Services (AWS)** | Infrastruktur-Hosting, Datenspeicherung, Content Delivery (us-east-2 Region) | Vereinigte Staaten | AWS DPA mit SCCs (automatisch in AWS-Servicebedingungen enthalten) |
| **Stripe** | Zahlungsverarbeitung für Spenden | Vereinigte Staaten | Stripe DPA mit SCCs |

Kreditkarten- und Bankkontodetails werden direkt vom Browser des Benutzers an Stripe übertragen und werden nie auf ChurchApps-Servern gespeichert oder über diese übertragen.

## 3. Risikobewertung

### 3.1 Verschlüsselung

- **In Transit:** Alle Daten werden mit TLS/HTTPS für alle Kommunikationen zwischen Benutzern und ChurchApps-Servern verschlüsselt.
- **Im Ruhezustand:** Auf AWS gespeicherte Daten werden mit AWS-verwalteter Verschlüsselung verschlüsselt.

### 3.2 Zugriffskontrollen

- Der Zugriff auf Produktionsserver ist auf zwei Personen begrenzt, die Mitglieder des ChurchApps-Vorstands sind.
- Entwickler, Freiwillige und andere Vorstandsmitglieder haben keinen Zugriff auf Produktionsserver oder Datenbanken.
- Datenbankserver befinden sich hinter einer Firewall und sind nicht direkt über das Internet zugänglich.
- Kirchengemeinde-Daten sind logisch getrennt -- jede Kirchengemeinde kann über Anwendungsebenen-Zugriffskontrolle nur auf ihre eigenen Daten zugreifen.

### 3.3 Datentrennung

Daten werden auf sechs unabhängige Datenbanken (Mitgliedschaft, Spenden, Anwesenheit, Nachrichten, Dienste, Inhalte) verteilt. Ein Kompromiss einer Datenbank legt keine Daten von den anderen Datenbanken offen. Beispielsweise enthält die Spenden-Datenbank Spendenbeträge und Daten, aber nicht die Namen oder Kontaktinformationen der Spender (in Mitgliedschaft gespeichert).

### 3.4 Datenminimierung

- Keine Kreditkarten- oder Bankkontodetails werden gespeichert (verwaltet von Stripe).
- Passwörter werden mit unidirektionaler Hashing gespeichert und können nicht abgerufen werden.
- Kirchengemeinden kontrollieren, welche Daten sie von ihren Mitgliedern sammeln.

### 3.5 Datenschutzrechte der Betroffenen

ChurchApps bietet technische Werkzeuge, um Kirchengemeinden bei der Erfüllung von Anfragen von Betroffenen zu unterstützen:

- **Zugang & Übertragbarkeit:** Vollständiger Datenexport in maschinenlesbarem JSON-Format.
- **Löschung:** Anonymisierung über alle sechs Datenbanken, Austausch personenbezogener Daten durch generische Werte, während Aggregatrecord, die für die Finanzberichterstattung erforderlich sind, beibehalten werden.
- **Einschränkung:** Der Status "Inaktive Mitgliedschaft" schließt Personen von Suche, Verzeichnis, Berichten und Nachrichten aus, während ihr Datensatz beibehalten wird.
- **Berichtigung:** Mitglieder und Administratoren können personenbezogene Informationen über die Anwendung bearbeiten.

### 3.6 Sicherheitsverletzungs-Meldung

ChurchApps verpflichtet sich, betroffene Kirchengemeinden innerhalb von 72 Stunden nach Kenntnisnahme eines Sicherheitsverstoßes personenbezogener Daten zu benachrichtigen, wie in den [Servicebedingungen](https://churchapps.org/terms) dokumentiert (Abschnitt 11.6).

### 3.7 Risiko des US-Regierungszugriffs

Das primäre Risiko bei in den USA gehosteten Daten ist der mögliche Zugriff durch US-Regierungsbehörden unter FISA Abschnitt 702 oder Exekutivverordnung 12333. Dieses Risiko wird aus den folgenden Gründen als **niedrig** eingestuft:

- ChurchApps verarbeitet Kirchengemeinde-Mitgliedschafts- und Anwesenheitsdaten, keine Daten von Nachrichtenwert.
- Datensubjekte sind Kirchengemeinde-Mitglieder und Besucher -- keine Kategorien, die typischerweise von Überwachungsprogrammen angepeilt werden.
- Es werden keine sensiblen personenbezogenen Daten (Gesundheit, Finanzkonten, politische Ansichten) gespeichert.
- Das AWS-DPA enthält Verpflichtungen zu Regierungszugriffsanfragen und Transparenzberichten.
- Das EU-US-Datenschutz-Framework (etabliert 2023) bietet zusätzliche Schutzmaßnahmen für Datentransfers zu zertifizierten US-Organisationen.

## 4. Gesamtrisiko-Schlussfolgerung

Das Risiko für Datensubjekte aus dieser internationalen Übertragung wird als **niedrig** eingestuft. Die Kombination von:

- Standardvertragsklauseln als Rechtsmechanismus für die Übertragung
- Verschlüsselung in Transit und im Ruhezustand
- Strikte Zugriffskontrollen mit nur zwei autorisierten Personen
- Datentrennung über unabhängige Datenbanken
- Keine Speicherung von Finanzkontodetails
- Niedrige Sensibilität und niedriger Nachrichtenwert der verarbeiteten Daten
- Technische Werkzeuge zum Ausüben aller Datenschutzrechte

bietet angemessene ergänzende Maßnahmen, um sicherzustellen, dass die übertragenen Daten einen Schutzniveau erhalten, der dem in Großbritannien/EWR garantierten im Wesentlichen äquivalent ist.

## 5. Überprüfungsplan

Diese Bewertung wird jährlich oder bei einer wesentlichen Änderung der Datenverarbeitung, Unterauftragsverarbeiter oder des gesetzlichen Rahmens für internationale Datentransfers überprüft.
