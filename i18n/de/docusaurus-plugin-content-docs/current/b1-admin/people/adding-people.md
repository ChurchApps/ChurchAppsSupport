---
title: "Personen hinzufügen"
---

# Personen hinzufügen

<div class="article-intro">

Der Bereich "Personen" ist die Grundlage von B1 Admin -- es ist die Mitgliederdatenbank Ihrer Kirche. Alle anderen Features (Gruppen, Anwesenheit, Spenden, Formulare) beziehen sich auf Personendatensätze. Dieses Handbuch führt Sie durch das Hinzufügen von jemandem zu Ihrer Datenbank, das Bearbeiten seiner Details und das Verknüpfen von Familienmitgliedern in Haushalte.

</div>

<div class="prereqs">
<h4>Bevor Sie anfangen</h4>

- Sie benötigen ein aktives B1 Admin-Konto mit Berechtigung zur Verwaltung von Personen. Siehe [Rollen & Berechtigungen](roles-permissions.md), wenn Sie nicht sicher sind, welchen Zugriff Sie haben.
- Wenn Sie mehr als einige Personen hinzufügen, sollten Sie stattdessen das Tool [CSV Import](importing-data.md) verwenden.

</div>

## Person hinzufügen

1. Navigieren Sie zum B1.church Admin-Dashboard.
2. Klicken Sie auf **Personen** in der linken Seitenleiste.
3. Klicken Sie auf die Schaltfläche **Person hinzufügen** in der oberen rechten Ecke.
4. Füllen Sie Vorname, Nachname und E-Mail-Adresse der Person aus und klicken Sie auf **Hinzufügen**.

Die Profilseite der Person öffnet sich und ist bereit für Sie, weitere Details hinzuzufügen.

:::tip
Wenn Sie von einem anderen Kirchenverwaltungssystem migrieren, können Sie mit der Funktion [Daten importieren](importing-data.md) Ihr gesamtes Verzeichnis aus einer CSV-Datei importieren -- viel schneller, als Personen einzeln hinzuzufügen.
:::

## Details bearbeiten

1. Klicken Sie auf der Profilseite der Person auf den **Stift bearbeiten** neben ihrem Namen.
2. Füllen Sie zusätzliche Informationen wie zweiten Namen, Mitgliedschaftsstatus, Daten, Adresse und Telefonnummern aus.
3. Klicken Sie auf **Speichern**, um die Persönlichen Informationen zu speichern.

Das Profil enthält auch mehrere Registerkarten für zugehörige Informationen:

- **Notizen** -- Notizen über die Person hinzufügen (pastorale Fürsorge, Nachverfolgung usw.)
- **Gruppen** -- Anzeigen und Verwalten von [Gruppenmitgliedschaften](../groups/group-members.md)
- **Anwesenheit** -- Anzeigen von [Anwesenheitsdatensätzen](../attendance/tracking-attendance.md)
- **Spenden** -- Anzeige von [Spendenverlauf](../donations/recording-donations.md)

## Arbeiten mit Formularen

Sie können benutzerdefinierte Formulare direkt vom Profil einer Person ausfüllen. Dies sind benutzerdefinierte Formulare, die Sie erstellen können, indem Sie dem Leitfaden [Erstellen von Formularen](../forms/creating-forms.md) folgen.

1. Klicken Sie auf der Profilseite der Person auf das Dropdown **Formulare**, um ein Formular auszuwählen.
2. Klicken Sie auf **Formular hinzufügen**, um es zu öffnen.
3. Füllen Sie die Formulardetails aus und klicken Sie auf **Speichern**.

:::info
Formulare, die mit dem Profil einer Person verknüpft sind, verwenden den Formulartyp **Personen**. Wenn Sie ein eigenständiges Formular benötigen (wie eine Ereignisregistrierung), siehe die Option [Eigenständiges Formular](../forms/creating-forms.md) im Formularsanleitung.
:::

:::tip
Wenn Sie nur ein oder zwei zusätzliche Informationen zu Personen verfolgen müssen -- ein Datum, eine Nummer, eine Ja/Nein-Antwort -- verwenden Sie stattdessen [Benutzerdefinierte Felder](../settings/custom-fields.md). Sie gehen schneller zu füllen und können direkt in der erweiterten Suche durchsucht werden.
:::

## Verwaltung von Haushalten

Haushalte ermöglichen es Ihnen, Familienmitglieder zu verknüpfen. Dies ist besonders nützlich für [Einchecken](../attendance/check-in.md), wo ein Elternteil alle seine Kinder auf einmal einchecken kann.

1. Klicken Sie auf der Profilseite einer Person auf den **Stift bearbeiten** neben dem Haushalts-Namen.
2. Der Haushaltseditor öffnet sich. Wählen Sie die **Haushaltsrolle** für die aktuelle Person (z.B. Kopf, Ehepartner, Kind).
3. Klicken Sie auf **Hinzufügen**, um ein weiteres Haushalts-Mitglied hinzuzufügen.
4. Geben Sie den Namen der Person in das Suchfeld ein und klicken Sie auf **Suchen**.
5. Wenn die Person in den Suchergebnissen angezeigt wird, klicken Sie auf **Auswählen**.
6. Wählen Sie ihre Haushaltsrolle und klicken Sie auf **Speichern**, um die Haushaltseinrichtung zu vervollständigen.
