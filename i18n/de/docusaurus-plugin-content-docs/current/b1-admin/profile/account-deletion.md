---
title: "Überprüfung von Kontolösch-Anfragen"
---

# Überprüfung von Kontolösch-Anfragen

<div class="article-intro">

Wenn eine Gemeinde eine Verzeichnis-Genehmigungsgruppe konfiguriert hat, erfolgt das Kontolöschen nicht mehr sofort – die Anfrage eines Mitglieds wird zu einer Aufgabe, die Ihre Genehmigungsgruppe überprüft, bevor etwas gelöscht wird. Diese Seite erklärt, wie die Anfrage gestellt wird, wie man sie genehmigt oder ablehnt, und was in jedem Fall passiert.

</div>

<div class="prereqs">
<h4>Bevor Sie Beginnen</h4>

- Eine **Directory Approval Group** muss unter **Mobile → Member portal** konfiguriert sein. Ohne eine konfigurierte Gruppe wird ein Klick auf **Delete my account** auf der Profilseite das Konto sofort löschen, ohne einen Überprüfungsschritt. Siehe [Einstellungen der Mobilanwendung](../settings/mobile-app.md).
- Das Genehmigen oder Ablehnen einer Anfrage erfordert die Berechtigung **People > Edit**.

</div>

## Wie ein Mitglied die Löschung Anfordert

Das Kontolöschen wird von der Seite **My Profile** angefordert – die gleiche gemeinsame Kontoseite, die in [Managing Your Profile](./managing-profile.md) behandelt wird – unter ihrem Bereich **Account Deletion**. Wenn eine Genehmigungsgruppe konfiguriert ist, wird das Löschen durch Bestätigung nicht sofort durchgeführt. Stattdessen:

1. Wird eine offene Aufgabe mit dem Titel **"Account deletion request"** erstellt, die der Verzeichnis-Genehmigungsgruppe zugewiesen ist, unter **Serving → Tasks**.
2. Wird die Schaltfläche **Delete my account** für diese Person deaktiviert und es wird ein Hinweis angezeigt, dass die Anfrage überprüft wird.

Wenn Sie eine zweite Anfrage einreichen, während bereits eine offen ist, wird nur die gleiche Aufgabe erneut geöffnet – eine Person kann gleichzeitig nur eine ausstehende Löschanfrage haben.

## Überprüfung einer Anfrage

1. Gehen Sie zu **Serving → Tasks** (oder **Assigned to My Groups** auf Ihrem Dashboard, derselbe Ort wie [profile change requests](./approving-profile-changes.md)).
2. Öffnen Sie die Aufgabe mit dem Titel **"Account deletion request from *Name*"**.
3. Sie sehen zwei Aktionen: **Approve deletion** und **Decline**.

### Genehmigen

Bestätigen Sie **"Permanently anonymize this person's record and remove their login? This cannot be undone."** Dies ersetzt die persönlichen Daten der Person durch generische Werte (die gleiche Anonymisierung, die von der Aktion **Data Management > Anonymize** auf der Personalakte einer Person verwendet wird – siehe [Data Security](../settings/data-security.md)) und entfernt ihre Anmeldung. Die Aufgabe schließt sich automatisch, und das Mitglied wird benachrichtigt, dass seine Anfrage genehmigt wurde.

### Ablehnen

Das Ablehnen erfordert einen Grund, da die DSGVO das Ablehnen einer Löschanfrage nur aus rechtlichen Gründen erlaubt:

- **Rechtliche Aufbewahrung** (Spenden, Steuern oder Beschäftigungsunterlagen)
- **Erforderlich für einen Rechtsanspruch**
- **Sonstiges** – erklären Sie im Textfeld (mindestens 10 Zeichen)

Das Mitglied wird über die Entscheidung sowie den von Ihnen angegebenen Grund benachrichtigt und kann seine Anfrage erneut einreichen oder sich an eine Aufsichtsbehörde eskalieren, wenn es nicht einverstanden ist.

:::info
Gemeinden haben 30 Tage Zeit, um auf eine Löschanfrage zu reagieren. Die Aufgabe ist in 28 Tagen fällig, und die Genehmigungsgruppe erhält automatische Erinnerungen, wenn sie nach 21 und 27 Tagen noch offen ist.
:::

:::tip
Lösch- und Profiländerungsanfragen verwenden die gleiche Verzeichnis-Genehmigungsgruppe und den gleichen aufgabenbasierten Überprüfungsablauf – siehe [Approving Profile Changes](./approving-profile-changes.md), wenn Sie auch Verzeichnisaktualisierungsanfragen überprüfen müssen.
:::

## Verwandte Artikel

- [Managing Your Profile](./managing-profile.md) – Wo Mitglieder das Löschen ihrer eigenen Konten anfordern
- [Approving Profile Changes](./approving-profile-changes.md) – Der ähnliche Überprüfungsablauf für Verzeichnisaktualisierungsanfragen
- [Data Security](../settings/data-security.md) – DSGVO-Compliance und vom Administrator initiierte Anonymisierung
- [Mobile App Settings](../settings/mobile-app.md) – Konfigurieren der Verzeichnis-Genehmigungsgruppe
