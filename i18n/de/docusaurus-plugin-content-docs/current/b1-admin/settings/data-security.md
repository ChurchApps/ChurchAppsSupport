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

ChurchApps unterstützt derzeit keine DSGVO-Konformität aufgrund der erheblichen technischen und finanziellen Anforderungen. Die DSGVO würde erfordern, dass wir Daten auf EU-basierten Servern hosten und eine separate Infrastruktur zur regionalen Datenweiterleitung und -speicherung aufbauen, was unsere Hosting- und Entwicklungskosten praktisch verdoppeln würde. Als gemeinnützige Organisation, die Gemeinden kostenlose Tools anbietet, verfügen wir derzeit nicht über die Ressourcen, dies zu unterstützen.

:::warning
Wenn Ihre Gemeinde Mitglieder in der Europäischen Union hat, beachten Sie, dass ChurchApps derzeit nicht die DSGVO-Anforderungen erfüllt. Konsultieren Sie Ihren Rechtsberater bezüglich der Compliance-Verpflichtungen, bevor Sie EU-Mitgliederdaten speichern.
:::
