---
title: "Datensicherheit"
---

# Datensicherheit

<div class="article-intro">

Auch wenn es kein perfekt sicheres System gibt, nimmt ChurchApps die Datensicherheit ernst. Diese Seite erläutert die Maßnahmen, die zum Schutz aller in B1.church Admin und anderen ChurchApps-Produkten eingegebenen Daten ergriffen werden.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Lesen Sie diese Seite, um zu verstehen, wie die Daten Ihrer Gemeinde geschützt werden
- Richten Sie [Rollen & Berechtigungen](./roles-permissions.md) ein, um zu kontrollieren, wer auf sensible Informationen zugreifen kann
- Machen Sie sich mit der [Datenschutzerklärung](https://churchapps.org/privacy) vertraut

</div>

## Begrenzung gespeicherter sensibler Daten

Unser erster Ansatz ist, nicht mehr sensible Daten als nötig zu speichern. Das bedeutet, dass niemals Kreditkarten- oder Bankdaten, die für Spenden verwendet werden, gespeichert werden. Wenn ein Benutzer eine Spende über B1.church Admin oder B1 tätigt, werden die Kreditkartendaten niemals an unsere Server übertragen, sondern nur an Ihren Zahlungsdienstleister (Stripe). Das bedeutet, dass im Falle eines Datenlecks keine Kreditkarten- oder Bankdaten kompromittiert würden.

Wir speichern auch niemals Passwörter in unserem System. Alle Passwörter werden durch einen Einweg-Hash-Algorithmus verarbeitet, bei dem ein Teil der Daten zerstört wird, sodass es niemandem möglich ist, Passwörter aus der Datenbank abzurufen -- auch uns nicht. Zur Verifizierung von Passwörtern muss der eingegebene Wert denselben Einweg-Hash durchlaufen und dasselbe Ergebnis erzeugen.

Nach Entfernung dieser beiden Quellen verbleiben als einzige sensible Daten eine Liste von Namen und Kontaktinformationen.

:::tip
Da ChurchApps niemals Kreditkarten- oder Bankdaten speichert, würde selbst im schlimmsten Fall eines Datenlecks keine Finanzkontodaten offengelegt. Nur Namen und Kontaktinformationen wären gefährdet.
:::

## Einsatz bewährter Standardpraktiken

Wir verwenden die branchenüblichen Best Practices für Sicherheit, einschließlich der Verschlüsselung aller Daten bei der Übertragung zu und von unseren Servern mittels HTTPS. Alle Server werden in einem physisch gesicherten Rechenzentrum bei Amazon Web Services gehostet. Alle Datenbankserver befinden sich hinter einer Firewall und sind vom Internet aus nicht zugänglich.

## Datentrennung

Daten werden je nach Bereich in verschiedene Datenbanken aufgeteilt. Jede unserer APIs (Membership, Giving, Attendance, Messaging, Doing und Lessons) bildet ein unabhängiges Datensilo mit eigener Datenbank. Wird eine davon kompromittiert, ist der Nutzen der Daten ohne Zugriff auf die anderen begrenzt. Wenn beispielsweise die Giving-API/Datenbank kompromittiert würde, könnte ein Angreifer möglicherweise Zugang zu einer Liste von Spenden und Daten erhalten (aber niemals zu Karten-/Bankdaten). Allerdings hätte er keinen Zugang dazu, welche Benutzer die Spenden getätigt haben oder zu welchen Gemeinden sie gehören, da diese Daten in der separaten Membership-Datenbank gespeichert sind.

:::info
Datentrennung bedeutet, dass die Kompromittierung eines Systems keinen Zugriff auf alle Gemeindedaten ermöglicht. Jede API arbeitet unabhängig mit eigener Datenbank, was die Auswirkungen eines möglichen Sicherheitsvorfalls begrenzt.
:::

## Eingeschränkter Zugang

Der Zugang zu den Produktionsservern ist streng auf die Serveradministratoren beschränkt, die Zugang benötigen. Derzeit sind dies zwei Personen, die auch Vorstandsmitglieder sind. Entwickler, Freiwillige und andere Vorstandsmitglieder haben keinen Zugang zu den Produktionsservern.

## Datenschutzerklärung

Ihre Daten gehören Ihnen und werden niemals an Dritte verkauft. Sie können unsere vollständige Datenschutzerklärung [hier](https://churchapps.org/privacy) lesen.

## DSGVO-Konformität

ChurchApps unterstützt die DSGVO-Konformität für Gemeinden mit Mitgliedern im Vereinigten Königreich oder der Europäischen Union. So gehen wir auf die wichtigsten Anforderungen ein:

### Rechte der betroffenen Personen

ChurchApps stellt Werkzeuge bereit, um Gemeinden bei der Beantwortung von Anfragen betroffener Personen zu unterstützen:

- **Auskunftsrecht (Artikel 15)** — Mitglieder können alle ihre personenbezogenen Daten über das Mitgliederportal mit der Schaltfläche „Meine Daten herunterladen" herunterladen. Administratoren können die Daten jeder Person auch über die Personendetailseite exportieren.
- **Recht auf Löschung (Artikel 17)** — Mitglieder können ihr eigenes Konto über das Mitgliederportal löschen. Administratoren können die Daten einer Person über alle Module hinweg anonymisieren oder endgültig löschen. Die Anonymisierung ersetzt personenbezogene Informationen durch generische Werte, wobei aggregierte Datensätze (Spendensummen, Anwesenheitszahlen) erhalten bleiben, die für die finanzielle Berichterstattung der Gemeinde benötigt werden.
- **Recht auf Einschränkung der Verarbeitung (Artikel 18)** — Mitglieder können die Verarbeitung ihrer Daten einschränken, einschließlich der Abmeldung von Kommunikation.
- **Recht auf Datenübertragbarkeit (Artikel 20)** — Die Datenexportfunktion stellt alle personenbezogenen Daten in einem strukturierten, maschinenlesbaren JSON-Format bereit.

### Datenverarbeitung

ChurchApps handelt als **Auftragsverarbeiter** im Auftrag Ihrer Gemeinde (des **Verantwortlichen**). Unser [Auftragsverarbeitungsvertrag](https://churchapps.org/terms) beschreibt die Verantwortlichkeiten jeder Partei, einschließlich der Nutzung von Unterauftragsverarbeitern, der Verfahren zur Meldung von Datenschutzverletzungen und der Datenverarbeitung bei Vertragsbeendigung.

### Internationale Datenübermittlungen

Die Daten von ChurchApps werden auf Amazon Web Services (AWS) in den Vereinigten Staaten gehostet. Internationale Datenübermittlungen aus dem Vereinigten Königreich/der EU werden durch die Standardvertragsklauseln (SCCs) von AWS im Rahmen des [AWS-Datenverarbeitungsnachtrags](https://aws.amazon.com/compliance/data-processing-addendum/) abgedeckt. Ein Hosting in der EU ist nicht erforderlich, wenn geeignete Übermittlungsmechanismen wie SCCs vorhanden sind.

### Unterauftragsverarbeiter

- **Amazon Web Services (AWS)** — Infrastruktur-Hosting, Datenspeicherung und Inhaltsbereitstellung
- **Stripe** — Zahlungsabwicklung für Spenden (keine Kartendaten werden von ChurchApps gespeichert)

:::info
Ausführliche Informationen zum Umgang mit personenbezogenen Daten finden Sie in unserer [Datenschutzerklärung](https://churchapps.org/privacy) und unseren [Nutzungsbedingungen](https://churchapps.org/terms). Bei Fragen zur DSGVO-Konformität kontaktieren Sie uns unter support@churchapps.org.
:::
