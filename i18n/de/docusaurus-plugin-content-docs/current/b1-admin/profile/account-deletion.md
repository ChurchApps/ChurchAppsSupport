---
title: "Überprüfung von Kontolöschanfragen"
---

# Überprüfung von Kontolöschanfragen

<div class="article-intro">

Wenn eine Kirche eine Verzeichnis-Genehmigungsgruppe konfiguriert hat, erfolgt das Kontolöschen nicht mehr sofort – die Anfrage eines Mitglieds wird zu einer Aufgabe, die Ihre Genehmigungsgruppe überprüft, bevor etwas gelöscht wird. Diese Seite erklärt, wie die Anfrage gestellt wird, wie man sie genehmigt oder ablehnt, und was in jedem Fall passiert.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Eine **Directory Approval Group** (Verzeichnis-Genehmigungsgruppe) muss unter **Mobile → Member portal** konfiguriert sein. Ohne diese wird ein Klick auf **Delete my account** (Mein Konto löschen) auf der Profilseite das Konto sofort löschen, ohne einen Überprüfungsschritt. Siehe [Einstellungen der Mobilanwendung](../settings/mobile-app.md).
- Das Genehmigen oder Ablehnen einer Anfrage erfordert die Berechtigung **People > Edit** (Personen > Bearbeiten).

</div>

## Wie ein Mitglied die Löschung anfordert

Das Kontolöschen wird von der Seite **My Profile** (Mein Profil) angefordert – die gleiche gemeinsame Kontoseite, die in [Verwalten Sie Ihr Profil](./managing-profile.md) behandelt wird – unter ihrem Bereich **Account Deletion** (Kontolöschung). Wenn eine Genehmigungsgruppe konfiguriert ist, wird das Löschen durch Bestätigung nicht sofort durchgeführt. Stattdessen:

1. Wird eine offene Aufgabe mit dem Titel **"Account deletion request"** (Kontolöschanfrage) erstellt, die der Verzeichnis-Genehmigungsgruppe zugewiesen ist, unter **Serving → My Work** (Dienst → Meine Aufgaben).
2. Wird die Schaltfläche **Delete my account** (Mein Konto löschen) für diese Person deaktiviert und es wird ein Hinweis angezeigt, dass die Anfrage überprüft wird.

Wenn Sie eine zweite Anfrage einreichen, während bereits eine offen ist, wird nur die gleiche Aufgabe erneut geöffnet – eine Person kann gleichzeitig nur eine ausstehende Löschanfrage haben.

## Überprüfung einer Anfrage

1. Gehen Sie zu **Serving → My Work** (Dienst → Meine Aufgaben) (oder **Assigned to My Groups** (Meinen Gruppen zugewiesen) auf Ihrem Dashboard, derselbe Ort wie [Profiländerungsanfragen](./approving-profile-changes.md)).
2. Öffnen Sie die Aufgabe mit dem Titel **"Account deletion request from *Name*"** (Kontolöschanfrage von *Name*).
3. Sie sehen zwei Aktionen: **Approve deletion** (Löschung genehmigen) und **Decline** (Ablehnen).

### Genehmigen

Bestätigen Sie **"Permanently anonymize this person's record and remove their login? This cannot be undone."** (Diesen Datensatz dieser Person unwiederbringlich anonymisieren und ihre Anmeldung entfernen? Dies kann nicht rückgängig gemacht werden.) Dies ersetzt die persönlichen Daten der Person durch generische Werte (die gleiche Anonymisierung, die von der Aktion **Data Management > Anonymize** (Datenverwaltung > Anonymisieren) auf dem Personendatensatz einer Person verwendet wird – siehe [Datensicherheit](../settings/data-security.md)) und entfernt ihre Anmeldung. Die Aufgabe schließt sich automatisch, und das Mitglied wird benachrichtigt, dass seine Anfrage genehmigt wurde.

### Ablehnen

Das Ablehnen erfordert einen Grund, da die DSGVO das Ablehnen einer Löschanfrage nur aus rechtlichen Gründen erlaubt:

- **Rechtliche Aufbewahrung** (Spenden-, Steuern- oder Beschäftigungsunterlagen)
- **Erforderlich für einen Rechtsanspruch**
- **Sonstiges** – erklären Sie im Textfeld (mindestens 10 Zeichen)

Das Mitglied wird über die Entscheidung sowie den von Ihnen angegebenen Grund benachrichtigt und kann seine Anfrage erneut einreichen oder sich an eine Aufsichtsbehörde eskalieren, wenn es nicht einverstanden ist.

:::info
Kirchen haben 30 Tage Zeit, um auf eine Kontolöschanfrage zu reagieren. Die Aufgabe ist in 28 Tagen fällig, und die Genehmigungsgruppe erhält automatische Erinnerungen, wenn sie nach 21 und 27 Tagen noch offen ist.
:::

:::tip
Lösch- und Profiländerungsanfragen verwenden die gleiche Verzeichnis-Genehmigungsgruppe und den gleichen aufgabenbasierten Überprüfungsablauf – siehe [Genehmigung von Profiländerungen](./approving-profile-changes.md), wenn Sie auch Verzeichnisaktualisierungsanfragen überprüfen müssen.
:::

## Verwandte Artikel

- [Verwalten Sie Ihr Profil](./managing-profile.md) – Wo Mitglieder das Löschen ihrer eigenen Konten anfordern
- [Genehmigung von Profiländerungen](./approving-profile-changes.md) – Der ähnliche Überprüfungsablauf für Verzeichnisaktualisierungsanfragen
- [Datensicherheit](../settings/data-security.md) – DSGVO-Compliance und vom Administrator initiierte Anonymisierung
- [Einstellungen der Mobilanwendung](../settings/mobile-app.md) – Konfigurieren der Verzeichnis-Genehmigungsgruppe
