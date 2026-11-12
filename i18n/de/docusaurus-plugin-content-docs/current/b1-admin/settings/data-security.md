---
title: "Datensicherheit"
description: "Erfahren Sie, wie ChurchApps die Daten Ihrer Gemeinde in B1 Admin schützt – von gehashten Passwörtern und HTTPS bis zu getrennten Datenbanken und DSGVO-Werkzeugen."
---

# Datensicherheit

<div class="article-intro">

Ein vollkommen sicheres System gibt es nicht, doch ChurchApps nimmt Datensicherheit ernst. Diese Seite erläutert die Maßnahmen, mit denen alle Daten geschützt werden, die in B1.church Admin und anderen ChurchApps-Produkten eingegeben werden.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Lesen Sie diese Seite, um zu verstehen, wie die Daten Ihrer Gemeinde geschützt werden
- Richten Sie [Rollen und Berechtigungen](./roles-permissions.md) ein, um festzulegen, wer auf sensible Informationen zugreifen darf
- Machen Sie sich mit der [Datenschutzerklärung](https://churchapps.org/privacy) vertraut

</div>

## Begrenzung der gespeicherten sensiblen Daten {#limiting-sensitive-data-stored}

Unser erster Ansatz besteht darin, nicht mehr sensible Daten zu speichern als nötig. Das bedeutet, dass wir niemals Kreditkarten- oder Bankdaten speichern, die für Spenden verwendet werden. Wenn ein Nutzer über B1.church Admin oder B1 spendet, werden die Kreditkartendaten nie an unsere Server übertragen, sondern nur an Ihren Zahlungsdienstleister (Stripe). Selbst bei einer Datenpanne wären somit keine Kreditkarten- oder Bankdaten betroffen.

Außerdem speichern wir in unserem System niemals Passwörter. Alle Passwörter werden durch ein Einweg-Hashverfahren verarbeitet, bei dem ein Teil der Daten unwiderruflich verworfen wird. Daher ist es für niemanden möglich, Passwörter aus der Datenbank wiederherzustellen – auch nicht für uns. Zur Überprüfung eines Passworts muss der eingegebene Wert denselben Einweg-Hash durchlaufen und dasselbe Ergebnis liefern.

Nach Entfernung dieser beiden Quellen bleiben als einzige sensible Daten eine Liste von Namen und Kontaktdaten übrig.

:::tip
Da ChurchApps niemals Kreditkarten- oder Bankdaten speichert, würden selbst bei einer Datenpanne im schlimmsten Fall keine Finanzkontodaten offengelegt. Nur Namen und Kontaktdaten wären gefährdet.
:::

## Anwendung bewährter Standardverfahren {#using-standard-best-practices}

Wir wenden die branchenüblichen bewährten Verfahren für Sicherheit an, einschließlich der Verschlüsselung aller Daten bei der Übertragung zu und von unseren Servern über HTTPS. Alle Server werden in einem gesicherten physischen Rechenzentrum bei Amazon Web Services betrieben. Alle Datenbankserver liegen hinter einer Firewall und sind aus dem Internet nicht erreichbar.

## Trennung der Daten {#data-segregation}

Die Daten werden je nach Zuständigkeit in verschiedene Datenbanken aufgeteilt. Jedes unserer Module (Mitgliederverwaltung, Spenden, Anwesenheit, Nachrichten, Dienste und Inhalte) ist ein eigenständiger Datenbereich mit eigenen Datenbanken. Wird einer davon kompromittiert, ist der Nutzen der Daten ohne Kompromittierung der anderen stark eingeschränkt. Wäre zum Beispiel die Spenden-API bzw. -Datenbank betroffen, könnte ein Angreifer möglicherweise eine Liste von Spenden und Daten einsehen (niemals aber Karten- oder Bankdaten). Er hätte jedoch keinen Zugriff darauf, welche Nutzer gespendet haben oder für welche Gemeinden die Spenden bestimmt waren, da diese Daten in der getrennten Mitgliederdatenbank gespeichert sind.

:::info
Die Datentrennung bedeutet, dass die Kompromittierung eines Systems nicht den Zugriff auf alle Daten einer Gemeinde ermöglicht. Jede API arbeitet unabhängig mit ihrer eigenen Datenbank, was die Auswirkungen einer möglichen Datenpanne begrenzt.
:::

## Eingeschränkter Zugriff {#limited-access}

Der Zugriff auf die Produktionsserver ist strikt auf die Serveradministratoren beschränkt, die ihn benötigen. Derzeit sind dies zwei Personen, die zugleich Mitglieder des Vorstands sind. Entwickler, Ehrenamtliche und andere Vorstandsmitglieder haben keinen Zugriff auf die Produktionsserver.

## Datenschutzerklärung {#privacy-policy}

Ihre Daten gehören Ihnen und werden niemals an Dritte verkauft. Unsere vollständige Datenschutzerklärung können Sie [hier](https://churchapps.org/privacy) lesen.

## DSGVO-Konformität {#gdpr-compliance}

ChurchApps unterstützt die DSGVO-Konformität für Gemeinden mit Mitgliedern im Vereinigten Königreich oder in der Europäischen Union. So erfüllen wir die wichtigsten Anforderungen:

### Rechte der betroffenen Personen {#data-subject-rights}

ChurchApps stellt Werkzeuge bereit, mit denen Gemeinden auf Anfragen betroffener Personen reagieren können:

- **Auskunftsrecht (Artikel 15)** — Mitglieder können eine Kopie ihrer personenbezogenen Daten anfordern, indem sie sich an ihre Gemeinde wenden. Administratoren können die Daten jeder Person über **Daten exportieren** im Datensatz der Person oder im Bereich **Datenverwaltung** des Bearbeitungsformulars der Person in B1.church Admin exportieren.
- **Recht auf Löschung (Artikel 17)** — Mitglieder können die Löschung ihres Kontos selbst über ihre Profilseite beantragen (siehe [Anfragen zur Kontolöschung prüfen](../profile/account-deletion.md)) oder sich direkt an ihre Gemeinde wenden. Administratoren können die Daten einer Person außerdem im Bereich **Datenverwaltung** auf der Detailseite der Person über alle Module hinweg anonymisieren. Bei der Anonymisierung werden persönliche Angaben durch allgemeine Werte ersetzt, während zusammengefasste Datensätze (Spendensummen, Anwesenheitszahlen) erhalten bleiben, die für die Finanzberichterstattung der Gemeinde nötig sind.
- **Recht auf Einschränkung der Verarbeitung (Artikel 18)** — Mitglieder können die Einschränkung der Verarbeitung beantragen, indem sie sich an ihre Gemeinde wenden, auch um sich von Mitteilungen abzumelden.
- **Recht auf Datenübertragbarkeit (Artikel 20)** — Administratoren können personenbezogene Daten im Namen von Mitgliedern, die dies verlangen, in einem strukturierten, maschinenlesbaren JSON-Format exportieren.

### Verwendung der Werkzeuge zur Datenverwaltung {#using-the-data-management-tools}

So greifen Sie für eine einzelne Person auf die DSGVO-Werkzeuge zu:

1. Gehen Sie in B1 Admin zu **Personen** und öffnen Sie den Datensatz der Person.
2. Klicken Sie auf **Bearbeiten**, um in den Bearbeitungsmodus zu wechseln.
3. Scrollen Sie zum Abschnitt **Datenverwaltung** (standardmäßig eingeklappt) und klappen Sie ihn auf.
4. Verwenden Sie **Daten exportieren**, um eine JSON-Datei mit allen für diese Person gespeicherten Daten herunterzuladen. (Derselbe Link **Daten exportieren** steht auch unter den Aktionen neben dem Namen der Person, ohne dass Sie das Bearbeitungsformular öffnen müssen.)
5. Verwenden Sie **Anonymisieren**, um persönliche Angaben durch allgemeine Werte zu ersetzen. Sie werden aufgefordert, zur Bestätigung `ANONYMIZE` einzugeben – diese Aktion kann nicht rückgängig gemacht werden.

:::warning
Die Anonymisierung ist endgültig. Spendensummen und Anwesenheitszahlen bleiben für die Finanzberichterstattung erhalten, aber alle persönlichen Kennzeichen (Name, E-Mail, Adresse usw.) werden entfernt und können nicht wiederhergestellt werden.
:::

### Datenverarbeitung {#data-processing}

ChurchApps handelt als **Auftragsverarbeiter** im Namen Ihrer Gemeinde (dem **Verantwortlichen**). Unsere [Vereinbarung zur Auftragsverarbeitung](https://churchapps.org/terms) legt die Pflichten jeder Partei fest, einschließlich der Nutzung von Unterauftragsverarbeitern, der Verfahren bei Meldungen von Datenpannen und des Umgangs mit Daten bei Beendigung.

### Internationale Datenübermittlungen {#international-data-transfers}

Die Daten von ChurchApps werden bei Amazon Web Services (AWS) in den Vereinigten Staaten gehostet. Internationale Datenübermittlungen aus dem Vereinigten Königreich bzw. der EU sind durch die Standardvertragsklauseln (SCCs) von AWS im Rahmen des [AWS-Auftragsverarbeitungszusatzes](https://aws.amazon.com/compliance/data-processing-addendum/) abgedeckt. Der AWS-Auftragsverarbeitungszusatz ist für alle Kunden automatisch Bestandteil der AWS-Dienstbedingungen. Ein Hosting in der EU ist nicht erforderlich, wenn geeignete Übermittlungsmechanismen wie SCCs bestehen.

Einzelheiten dazu, wie Übermittlungsrisiken bewertet wurden, finden Sie in der [Übermittlungsrisikobewertung](./transfer-risk-assessment.md).

### Unterauftragsverarbeiter {#sub-processors}

- **Amazon Web Services (AWS)** — Infrastrukturhosting, Datenspeicherung und Auslieferung von Inhalten
- **Stripe** — Zahlungsabwicklung für Spenden (ChurchApps speichert keine Kartendaten)

:::info
Vollständige Angaben dazu, wie wir personenbezogene Daten verarbeiten, finden Sie in unserer [Datenschutzerklärung](https://churchapps.org/privacy) und unseren [Nutzungsbedingungen](https://churchapps.org/terms). Bei Fragen zur DSGVO-Konformität erreichen Sie uns unter support@churchapps.org.
:::
