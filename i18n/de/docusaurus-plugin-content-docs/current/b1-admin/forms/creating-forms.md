---
title: "Formulare erstellen"
---

# Formulare erstellen

<div class="article-intro">

Erstellen Sie benutzerdefinierte Formulare, um Informationen von Ihrer Gemeinde zu sammeln. Sie können Formulare für Veranstaltungsanmeldungen, Umfragen, Besucherkarten, Mitgliedsanträge und mehr erstellen. Formulare können mit Personen in Ihrer Datenbank verknüpft oder als eigenständige Seiten mit eigener öffentlicher URL verwendet werden.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Für **Personen**-Formulare (mit Personeneinträgen verknüpft) benötigen Sie zuerst [Personen in Ihrer Datenbank](../people/adding-people.md).
- Für Formulare, die **Zahlungen** erfassen, muss [Stripe für Online-Spenden konfiguriert](../donations/online-giving-setup.md) sein.

</div>

## Ein neues Formular erstellen

1. Navigieren Sie über das Hauptmenü zu **Formulare**.
2. Klicken Sie auf **Formular hinzufügen**.
3. Geben Sie einen **Namen** für Ihr Formular ein.
4. Wählen Sie den Formulartyp aus dem Dropdown-Menü:
   - **Personen** — Verknüpft Eingänge mit [Personeneinträgen](../people/adding-people.md) in Ihrer Datenbank.
   - **Eigenständig** — Erstellt ein unabhängiges Formular mit eigener öffentlicher URL, ideal für externe Anmeldungen.
5. Klicken Sie auf **Speichern**, um das Formular zu erstellen.

Ihr neues Formular erscheint in der Liste. Klicken Sie darauf, um Fragen hinzuzufügen.

## Fragen hinzufügen

1. Öffnen Sie Ihr Formular und gehen Sie zur Registerkarte **Fragen**.
2. Klicken Sie auf **Frage hinzufügen**.
3. Wählen Sie einen **Feldtyp** aus dem Anbieter-Dropdown. Verfügbare Typen sind:
   - **Textfeld** — Für kurze Textantworten
   - **Datum** — Für Datumsauswahl
   - **E-Mail** — Für E-Mail-Adressen
   - **Telefonnummer** — Für Telefoneingaben
   - **Mehrfachauswahl** — Zur Auswahl aus vordefinierten Optionen
   - **Zahlung** — Zum Erfassen von Zahlungen
4. Geben Sie einen **Titel** und eine optionale **Beschreibung** für die Frage ein.
5. Aktivieren Sie **Antwort erforderlich**, wenn das Feld obligatorisch sein soll.
6. Klicken Sie auf **Speichern**.
7. Wiederholen Sie den Vorgang, um weitere Fragen hinzuzufügen.

:::warning
Der Feldtyp **Zahlung** erfordert eine konfigurierte Stripe-Verbindung. Wenn Sie Online-Spenden noch nicht eingerichtet haben, lesen Sie [Online-Spenden einrichten](../donations/online-giving-setup.md), bevor Sie Zahlungsfelder hinzufügen.
:::

## Formularmitglieder verwalten

1. Öffnen Sie Ihr Formular und gehen Sie zur Registerkarte **Mitglieder**.
2. Suchen Sie eine Person und fügen Sie sie mit einer Rolle hinzu:
   - **Admin** — Kann das Formular bearbeiten und alle Eingänge einsehen.
   - **Nur Lesen** — Kann Eingänge einsehen, aber das Formular nicht bearbeiten.

## Formulareigenschaften konfigurieren

Sie können den Namen und die Einstellungen Ihres Formulars jederzeit aktualisieren. Bei eigenständigen Formularen sehen Sie auch eine eindeutige **öffentliche URL**, die Sie mit jedem teilen können.

:::tip
Eigenständige Formulare eignen sich hervorragend für Veranstaltungsanmeldungen. Teilen Sie die öffentliche URL per E-Mail, in sozialen Medien oder betten Sie das Formular direkt auf Ihrer Gemeinde-Website ein.
:::

:::info
Um ein Formular auf Ihrer B1-Website einzubetten, gehen Sie zu Ihrem Website-Editor, fügen Sie einen neuen Abschnitt hinzu und wählen Sie das Element **Formular**. Wählen Sie dann das Formular aus, das Sie anzeigen möchten. Siehe [Seiten verwalten](../website/managing-pages.md) für Details zur Bearbeitung Ihrer Website.
:::
