---
title: "Datensicherheit"
---

# Datensicherheit

<div class="article-intro">

Während es kein perfekt sicheres System gibt, nimmt ChurchApps Datensicherheit ernst. Diese Seite erklärt die Maßnahmen, die getroffen werden, um alle in B1.church Admin und anderen ChurchApps-Produkten eingegebenen Daten zu schützen.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Überprüfen Sie diese Seite, um zu verstehen, wie Ihre Kirchendaten geschützt sind
- Richten Sie [Rollen & Berechtigungen](./roles-permissions.md) ein, um zu steuern, wer auf sensible Informationen zugreifen kann
- Machen Sie sich mit der [Datenschutzrichtlinie](https://churchapps.org/privacy) vertraut

</div>

## Begrenzung von gespeicherten sensiblen Daten

Unser erster Ansatz ist es, nicht mehr sensible Daten zu speichern, als notwendig. Das bedeutet, dass niemals Kreditkarten- oder Bankkontodetails für Spenden gespeichert werden. Wenn ein Benutzer eine Spende mit B1.church Admin oder B1 tätigt, werden die Kreditkartendaten niemals an einen unserer Server übertragen, nur an Ihr Zahlungs-Gateway (Stripe). Das bedeutet, dass bei einem Datenleck keine Kreditkarte oder Bankdaten kompromittiert würden.

Wir speichern auch niemals Passwörter in unserem System. Alle Passwörter werden durch einen unidirektionalen Hash-Algorithmus verarbeitet, bei dem einige Daten zerstört werden, was es unmöglich macht, dass jemand Passwörter aus der Datenbank abruft, auch nicht wir. Um Passwörter zu überprüfen, muss der eingegebene Wert durch den gleichen unidirektionalen Hash gehen und das gleiche Ergebnis liefern.

Nach Entfernung dieser beiden Quellen sind die einzigen sensiblen Daten, die verbleiben, eine Liste von Namen und Kontaktinformationen.

:::tip
Da ChurchApps niemals Kreditkarten- oder Bankinformationen speichert, würde selbst ein worst-case Datenleck keine Finanzkontodaten offenlegen. Nur Namen und Kontaktinformationen würden gefährdet sein.
:::

## Verwenden von Standard-Best-Practices

Wir verwenden Industry-Standard-Best-Practices für Sicherheit, einschließlich Verschlüsselung aller Daten während der Übertragung zu und von unseren Servern mit HTTPS. Alle Server werden in einem sicheren physischen Rechenzentrum mit Amazon Web Services gehostet. Alle Datenbankserver werden hinter einer Firewall gespeichert und sind aus dem Internet nicht zugänglich.

## Datensegmentierung

Daten werden basierend auf dem Umfang in verschiedene Datenbanken unterteilt. Jedes unserer APIs (Membership, Giving, Attendance, Messaging, Doing und Lessons) sind unabhängige Datenlakonen mit eigenen Datenbanken. Wenn einer von ihnen kompromittiert ist, ist die Nützlichkeit der Daten ohne andere, die auch kompromittiert sind, begrenzt. Zum Beispiel, wenn die Giving API / Datenbank kompromittiert wäre, könnte ein Angreifer möglicherweise Zugriff auf eine Liste von Spenden und Daten erlangen (aber niemals Karten- / Bankdaten). Sie hätten jedoch keinen Zugriff auf, welche Benutzer die Spenden tätigt haben oder für welche Kirchen sie waren, da diese Daten in der separaten Membership-Datenbank gespeichert sind.

:::info
Datensegmentierung bedeutet, dass die Kompromittierung eines Systems nicht den Zugriff auf alle Kirchendaten ermöglicht. Jedes API funktioniert unabhängig mit seiner eigenen Datenbank, was die Auswirkungen eines möglichen Lecks begrenzt.
:::

## Begrenzte Zugriff

Der Zugriff auf die Produktionsserver ist streng auf Serveradministratoren begrenzt, die Zugriff benötigen. Dies sind derzeit zwei Personen, die auch Vorstandsmitglieder sind. Entwickler, Freiwillige und andere Vorstandsmitglieder haben keinen Zugriff auf die Produktionsserver.

## Datenschutzrichtlinie

Ihre Daten gehören Ihnen und werden niemals an Dritte verkauft. Sie können unsere vollständige Datenschutzrichtlinie [hier](https://churchapps.org/privacy) lesen.

## GDPR-Konformität

ChurchApps unterstützt GDPR-Konformität für Kirchen mit Mitgliedern im Vereinigten Königreich oder der Europäischen Union. Hier ist wie wir die Schlüsselanforderungen angehen:

### Rechte der Datensubjekte

ChurchApps bietet Tools, um Kirchen dabei zu helfen, auf Datenanfragen zu antworten:

- **Recht auf Zugriff (Artikel 15)** -- Mitglieder können eine Kopie ihrer persönlichen Daten anfordern, indem sie sich an ihre Kirche wenden. Administratoren können die Daten einer Person aus der Sektion **Datenverwaltung** auf der Seite mit Personaldetails in B1.church Admin exportieren.
- **Recht auf Löschung (Artikel 17)** -- Mitglieder können Kontolöschung anfordern, indem sie sich an ihre Kirche wenden. Administratoren können die Daten einer Person in allen Modulen aus der Sektion **Datenverwaltung** auf der Seite mit Personaldetails anonymisieren. Die Anonymisierung ersetzt persönliche Informationen durch generische Werte, während aggregierte Datensätze (Spendensummen, Anwesenheitszähl) beibehalten werden, die für die finanzielle Berichterstattung der Kirche benötigt werden.
- **Recht auf Einschränkung (Artikel 18)** -- Mitglieder können die Einschränkung der Verarbeitung anfordern, indem sie sich an ihre Kirche wenden, einschließlich Ablehnung der Kommunikation.
- **Recht auf Datenportabilität (Artikel 20)** -- Administratoren können persönliche Daten in einem strukturierten, maschinenlesbaren JSON-Format im Namen von Mitgliedern exportieren, die dies anfordern.

### Verwenden der Datenverwaltungs-Tools

Um auf GDPR-Daten-Tools für ein Individuum zuzugreifen:

1. Gehen Sie zu **Personen** in B1 Admin und öffnen Sie die Datensätze der Person.
2. Klicken Sie auf **Bearbeiten**, um den Bearbeitungsmodus einzugeben.
3. Scrollen Sie hinunter zur Sektion **Datenverwaltung** (standardmäßig zusammengeklappt) und klicken Sie, um sie zu erweitern.
4. Verwenden Sie **Daten exportieren**, um eine JSON-Datei aller Daten der Person herunterzuladen.
5. Verwenden Sie **Anonymisieren**, um persönliche Informationen durch generische Werte zu ersetzen. Sie werden aufgefordert, `ANONYMIZE` einzugeben, um zu bestätigen -- diese Aktion kann nicht rückgängig gemacht werden.

:::warning
Die Anonymisierung ist dauerhaft. Spendensummen und Anwesenheitszähl werden zu Zwecken der finanziellen Berichterstattung beibehalten, aber alle persönlichen Identifikatoren (Name, E-Mail, Adresse usw.) werden entfernt und können nicht wiederhergestellt werden.
:::

### Datenverarbeitung

ChurchApps fungiert als **Datenverarbeiter** im Auftrag Ihrer Kirche (des **Datencontrollers**). Unsere [Datenverarbeitungsvereinbarung](https://churchapps.org/terms) legt die Verantwortungen jeder Partei fest, einschließlich Unterverarbeiter-Nutzung, Verletzungsmitteilungsverfahren und Datenverwaltung bei Beendigung.

### Internationale Datentransfers

ChurchApps-Daten sind auf Amazon Web Services (AWS) in den Vereinigten Staaten gehostet. Internationale Datentransfers aus dem Vereinigten Königreich / der EU werden von AWSs Standard-Vertragsklauseln (SCCs) gemäß dem [AWS-Datenverarbeitungs-Zusatz](https://aws.amazon.com/compliance/data-processing-addendum/) abgedeckt. Der AWS DPA wird automatisch in die AWS Service-Bedingungen für alle Kunden aufgenommen. EU-basiertes Hosting ist nicht erforderlich, wenn angemessene Transfermechanismen wie SCCs vorhanden sind.

Für Details zur Bewertung von Transferrisiken siehe die [Transfer-Risikobewertung](./transfer-risk-assessment.md).

### Unterverarbeiter

- **Amazon Web Services (AWS)** -- Infrastruktur-Hosting, Datenspeicherung und Inhalt-Delivery
- **Stripe** -- Zahlungsverarbeitung für Spenden (keine Kartendaten werden von ChurchApps gespeichert)

:::info
Für vollständige Details darüber, wie wir persönliche Daten handhaben, siehe unsere [Datenschutzrichtlinie](https://churchapps.org/privacy) und [Nutzungsbedingungen](https://churchapps.org/terms). Wenn Sie Fragen zur GDPR-Konformität haben, kontaktieren Sie uns unter support@churchapps.org.
:::
