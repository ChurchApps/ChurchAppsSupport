---
title: "Risikobeurteilung für Datentransfers"
---

# Risikobeurteilung für Datentransfers

<div class="article-intro">

Dieses Dokument dokumentiert die Bewertung von ChurchApps bezüglich der Risiken, die mit internationalen Übertragungen personenbezogener Daten vom UK/EEA in die Vereinigten Staaten verbunden sind, wie gemäß UK GDPR und EU GDPR erforderlich. Dies ist ein interner Compliance-Datensatz, der von ChurchApps als Datenverarbeiter gepflegt wird.

</div>

**Zuletzt überprüft:** April 2026

## 1. Übertragungsdetails

| Element | Detail |
|---|---|
| **Datenexporteur** | Kirchen, die ChurchApps nutzen (Datenverantwortliche), ansässig im UK/EEA |
| **Datenimporteur** | ChurchApps (Datenverarbeiter), tätig in den Vereinigten Staaten |
| **Kategorien der betroffenen Personen** | Gemeindeglieder, Besucher, Gäste, Spender, Freiwillige, Kinder (verwaltet durch Eltern/Administratoren) |
| **Kategorien personenbezogener Daten** | Namen, E-Mail-Adressen, Telefonnummern, Postanschriften, Geburtsdaten, Geschlecht, Familienstand, Profilfotos, Spendendaten, Besuchsdaten, Gruppenmitgliedschaften, Freiwilligenaufträge, Nachrichtenverlauf |
| **Sensible Daten** | Keine absichtlich gesammelten. Keine Gesundheitsdaten, biometrischen Daten oder Strafregister werden gespeichert. Finanzielle Kontodaten (Kreditkarten, Bankkonten) werden von ChurchApps niemals gespeichert — diese werden direkt von Stripe verwaltet. |
| **Zweck der Übertragung** | Bereitstellung von Kirchenverwaltungssoftware-Services (Mitgliederverwaltung, Spenden, Besuchsverfolgung, Kommunikation, Freiwilligenplanung, Veranstaltungsregistrierung) |
| **Zielland** | Vereinigte Staaten |
| **Übertragungsmechanismus** | EU Standard-Vertragsklauseln (SCCs) und UK International Data Transfer Addendum (IDTA), eingebunden über das AWS Data Processing Addendum |

## 2. Unterverwarbeiter

| Unterverwarbeiter | Rolle | Standort | Übertragungsmechanismus |
|---|---|---|---|
| **Amazon Web Services (AWS)** | Infrastruktur-Hosting, Datenspeicherung, Content Delivery (us-east-2 Region) | Vereinigte Staaten | AWS DPA mit SCCs (automatisch in AWS Service Terms enthalten) |
| **Stripe** | Zahlungsverarbeitung für Spenden | Vereinigte Staaten | Stripe DPA mit SCCs |

Kreditkarten- und Bankdaten werden direkt vom Browser des Benutzers zu Stripe übertragen und werden niemals auf ChurchApps-Servern gespeichert oder durch diese übertragen.

## 3. Risikobeurteilung

### 3.1 Verschlüsselung

- **In Transit:** Alle Daten werden mit TLS/HTTPS für alle Kommunikation zwischen Benutzern und ChurchApps-Servern verschlüsselt.
- **Im Ruhezustand:** Auf AWS gespeicherte Daten werden mit AWS-verwalteter Verschlüsselung im Ruhezustand verschlüsselt.

### 3.2 Zugriffskontrolle

- Der Zugriff auf Produktionsserver ist auf zwei Personen beschränkt, die Mitglieder des ChurchApps-Verwaltungsrats sind.
- Entwickler, Freiwillige und andere Vorstandsmitglieder haben keinen Zugriff auf Produktionsserver oder Datenbanken.
- Datenbankserver befinden sich hinter einer Firewall und sind nicht direkt aus dem Internet erreichbar.
- Kirchendaten sind logisch getrennt — jede Kirche kann über Zugriffskontrolle auf Anwendungsebene nur auf ihre eigenen Daten zugreifen.

### 3.3 Datentrennung

Daten sind über sechs unabhängige Datenbanken verteilt (Membership, Giving, Attendance, Messaging, Doing, Content). Eine Kompromittierung einer Datenbank legt Daten von anderen nicht frei. Zum Beispiel enthält die Giving-Datenbank Spendenbetrag und -datum, aber nicht die Namen oder Kontaktinformationen von Spendern (in der Membership gespeichert).

### 3.4 Datenvermeidung

- Keine Kreditkarten- oder Bankkonteninformationen werden gespeichert (werden von Stripe verwaltet).
- Passwörter werden mit einseitiger Hashing gespeichert und können nicht abgerufen werden.
- Kirchen kontrollieren, welche Daten sie von ihren Mitgliedern sammeln.

### 3.5 Rechte betroffener Personen

ChurchApps stellt technische Tools zur Verfügung, die Kirchen befähigen, Anfragen betroffener Personen zu erfüllen:

- **Zugriff & Portabilität:** Vollständiger Datenexport in maschinenlesbarem JSON-Format.
- **Löschung:** Anonymisierung über alle sechs Datenbanken, Ersetzung persönlicher Daten durch generische Werte, wobei Sammelaufzeichnungen für die Finanzberichterstattung erhalten bleiben.
- **Einschränkung:** Der Status inaktive Mitgliedschaft schließt Personen von Suche, Verzeichnis, Berichten und Nachrichten aus, während ihre Aufzeichnung beibehalten wird.
- **Berichtigung:** Mitglieder und Administratoren können persönliche Informationen über die Anwendung bearbeiten.

### 3.6 Verletzungsmitteilung

ChurchApps verpflichtet sich, betroffene Kirchen innerhalb von 72 Stunden nach Bekanntmachung einer Verletzung personenbezogener Daten zu benachrichtigen, wie in den [Nutzungsbedingungen](https://churchapps.org/terms) dokumentiert (Abschnitt 11.6).

### 3.7 Risiko für US-Regierungszugriff

Das primäre Risiko im Zusammenhang mit in den USA gehosteten Daten ist ein möglicher Zugriff durch US-Behörden gemäß FISA Section 702 oder Executive Order 12333. Dieses Risiko wird als **niedrig** eingestuft aus folgenden Gründen:

- ChurchApps verarbeitet Kirchenmitgliedschafts- und Besuchsdaten, keine Daten mit Nachrichtenwert.
- Betroffene Personen sind Gemeindeglieder und Besucher — nicht Kategorien, die typischerweise von Überwachungsprogrammen anvisiert werden.
- Keine sensiblen personenbezogenen Daten (Gesundheit, Finanzkonten, politische Ansichten) werden gespeichert.
- Das AWS DPA enthält Verpflichtungen bezüglich Behördenzugriffsanfragen und Transparenzbericht.
- Das EU-US-Datenschutzrahmenwerk (etabliert 2023) bietet zusätzliche Schutzmaßnahmen für Datentransfers zu zertifizierten US-Organisationen.

## 4. Gesamtrisikokonklusion

Das Risiko für betroffene Personen durch diesen internationalen Transfer wird als **niedrig** bewertet. Die Kombination aus:

- Standard-Vertragsklauseln als rechtlicher Übertragungsmechanismus
- Verschlüsselung in Transit und im Ruhezustand
- Strikte Zugriffskontrolle mit nur zwei autorisierten Personen
- Datentrennung über unabhängige Datenbanken
- Keine Speicherung von Finanzkontendetails
- Niedrige Sensibilität und niedriger Nachrichtenwert der verarbeiteten Daten
- Technische Werkzeuge zum Ausüben aller Rechte betroffener Personen

bietet angemessene Schutzmaßnahmen, um sicherzustellen, dass die übertragenen Daten ein Schutzniveau erhalten, das im Wesentlichen dem im UK/EEA garantierten entspricht.

## 5. Überprüfungsplan

Diese Beurteilung wird jährlich oder bei wesentlichen Änderungen der Datenverarbeitung, der Unterverwarbeiter oder des Rechtsrahmens für internationale Datentransfers überprüft.
