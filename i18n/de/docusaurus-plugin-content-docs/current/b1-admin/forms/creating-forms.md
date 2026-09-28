---
title: "Formulare erstellen"
---

# Formulare erstellen

<div class="article-intro">

Erstelle benutzerdefinierte Formulare, um Informationen von deiner Gemeinde zu sammeln. Du kannst Formulare für Veranstaltungsregistrierungen, Umfragen, Besucherkarten, Mitgliedschaftsanträge und mehr erstellen. Formulare können mit Personen in deiner Datenbank verknüpft werden oder als eigenständige Seiten mit eigener öffentlicher URL verwendet werden.

</div>

<div class="prereqs">
<h4>Bevor du beginnst</h4>

- Für **Personen**-Formulare (verknüpft mit Personendatensätzen) brauchst du [Personen in deiner Datenbank](../people/adding-people.md) zuerst.
- Für Formulare, die **Zahlungen** sammeln, musst du [Stripe für Online-Spenden konfiguriert](../donations/online-giving-setup.md) haben.

</div>

## Ein neues Formular erstellen

1. Öffne **Personen** aus dem Menü „Bereich", klicke dann auf **Formulare** in der Navigationsleiste.
2. Klicke auf **Formular hinzufügen**.
3. Gib einen **Namen** für dein Formular ein.
4. Wähle den Formulartyp aus der Dropdown-Liste:
   - **Personen** — Verknüpft Einreichungen mit [Personendatensätzen](../people/adding-people.md) in deiner Datenbank.
   - **Eigenständig** -- Erstellt ein unabhängiges Formular mit eigener öffentlicher URL, ideal für externe Registrierungen.
5. Klicke auf **Speichern**, um das Formular zu erstellen.

Dein neues Formular wird in der Liste angezeigt. Klicke darauf, um Fragen hinzuzufügen.

## Ein leeres Formular drucken

Brauchst du eine Papierkopie zum Verteilen -- für eine Besucherkarte am Willkommensschalter oder ein Formular, das jemand ohne Internetzugang von Hand ausfüllen kann? Klicke auf das **Druckersymbol** neben einem Formular in der Hauptformularliste, um eine Vorschau zu öffnen, klicke dann auf **Drucken**. Leere Felder werden mit einer Unterstreichung oder Kontrollkästchen für jede Frage gedruckt, damit Personen sie von Hand ausfüllen können; erforderliche Fragen sind mit einem Sternchen gekennzeichnet. Es gibt keine anderen Druckoptionen -- drucke das ganze Formular oder nichts.

## Fragen hinzufügen

1. Öffne dein Formular und gehe zur Registerkarte **Fragen**.
2. Klicke auf **Frage hinzufügen**.
3. Wähle einen **Feldtyp** aus der Dropdown-Liste Provider. Verfügbare Typen umfassen:
   - **Textfeld** -- Für kurze Textantworten
   - **Datum** -- Für Datumsauswahl
   - **E-Mail** -- Für E-Mail-Adressen
   - **Telefonnummer** -- Für Telefoneingabe
   - **Mehrfachauswahl** -- Zur Auswahl aus vordefinierten Optionen
   - **Zahlung** -- Zur Erfassung von Zahlungen
4. Gib einen **Titel** und eine optionale **Beschreibung** für die Frage ein.
5. Aktiviere **Antwort erforderlich**, wenn das Feld erforderlich ist.
6. Klicke auf **Speichern**.
7. Wiederhole den Vorgang, um weitere Fragen hinzuzufügen.

:::warning
Der Feldtyp **Zahlung** erfordert, dass Stripe konfiguriert ist. Wenn du Online-Spenden noch nicht eingerichtet hast, siehe [Online-Spenden einrichten](../donations/online-giving-setup.md), bevor du Zahlungsfelder hinzufügst.
:::

## Formularmitglieder verwalten

1. Öffne dein Formular und gehe zur Registerkarte **Mitglieder**.
2. Suche eine Person und füge sie mit einer Rolle hinzu:
   - **Admin** -- Kann das Formular bearbeiten und alle Einreichungen anzeigen.
   - **Nur anzeigen** -- Kann Einreichungen anzeigen, kann aber das Formular nicht bearbeiten.

## Einreicher automatisch zu einer Gruppe hinzufügen

Wenn **Eine Personenaufzeichnung aus Einreichungen erstellen** aktiviert ist, kannst du das Formular auch mit einer Gruppe verknüpfen, damit jeder Einreicher automatisch zur Rosterliste dieser Gruppe hinzugefügt wird:

1. Öffne die **Details** deines Formulars und schalte **Eine Personenaufzeichnung aus Einreichungen erstellen** ein.
2. Unter **Einreicher zu einer Gruppe hinzufügen** wähle die Gruppe aus, zu der Einreicher hinzugefügt werden sollen, oder lasse es auf **Keine** eingestellt.
3. Klicke auf **Speichern**.

Jedes Mal, wenn jemand das Formular einreicht, wird die gefundene oder neu erstellte Person zur Gruppe hinzugefügt (bestehende Gruppenmitglieder werden übersprungen). Dies ist nützlich für Dinge wie ein Lageranmeldeformular, das automatisch die Lagerroster-Gruppe erstellen sollte.

### E-Mail zur Nachverfolgung senden

Mit **Eine Personenaufzeichnung aus Einreichungen erstellen** aktiviert, kannst du auch jedem Kontakt eine E-Mail senden, der das Formular einreicht. Fülle **Betreff der Nachverfolgungs-E-Mail** und **Inhalt der Nachverfolgungs-E-Mail** in den Formulardetails aus. Du kannst die Token `{firstName}` und `{churchName}` in beiden verwenden. Die E-Mail wird nur gesendet, wenn beide Felder ausgefüllt sind.

:::info
Nachverfolgungs-E-Mails werden nur versendet, nachdem deine Kirche zum Versenden von Gruppen-E-Mails genehmigt wurde, und sie zählen zum täglichen E-Mail-Limit deiner Kirche. Siehe [Gruppen-E-Mail für deine Kirche aktivieren](../groups/group-members.md#turning-on-group-email-for-your-church).
:::

## Ein Formular duplizieren

Um ein Formular als Ausgangspunkt für ein neues zu verwenden, klicke auf das Symbol **Duplizieren** (Kopiersymbol) neben dem Formular in der Formulliste. B1 erstellt eine exakte Kopie des Formulars -- einschließlich aller Fragen -- die du dann unabhängig umbenennen und bearbeiten kannst.

:::tip
Verdopplung ist praktisch für wiederkehrende Veranstaltungen, bei denen die Registrierungsfragen von Jahr zu Jahr gleich bleiben. Verdopple das Formular des letzten Jahres, aktualisiere den Namen und die Daten, und du bist bereit.
:::

## Formulareigenschaften konfigurieren

Du kannst den Namen und die Einstellungen deines Formulars jederzeit aktualisieren. Für eigenständige Formulare siehst du auch eine eindeutige **öffentliche URL**, die du mit jedem teilen kannst, zusammen mit einem **Beschreibungsfeld** -- Text, der oben auf der öffentlichen Formularseite über den Fragen angezeigt wird, nützlich, um Personen zu sagen, wofür das Formular ist, bevor sie es ausfüllen.

:::tip
Eigenständige Formulare sind großartig für Veranstaltungsregistrierungen. Teile die öffentliche URL per E-Mail, in sozialen Medien oder bette das Formular direkt auf deine Kirchenwebsite ein.
:::

:::info
Um ein Formular auf deiner B1-Website einzubinden, gehe zu deinem Website-Editor, füge einen neuen Abschnitt hinzu und wähle das Element **Formular**. Wähle dann das Formular, das du anzeigen möchtest. Siehe [Seiten verwalten](../website/managing-pages.md) für Details zum Bearbeiten deiner Website.
:::
