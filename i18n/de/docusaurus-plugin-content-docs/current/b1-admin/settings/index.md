---
title: "Einstellungen"
description: "Finden Sie sich in den Einstellungen von B1 Admin zurecht: Gemeindeinformationen, Erscheinungsbild, Standorte, benutzerdefinierte Felder, Benutzerrollen und die Navigation der B1.church-App."
---

# Einstellungen

<div class="article-intro">

Der Bereich Einstellungen dient in B1 Admin dazu, das Konto Ihrer Gemeinde, das Erscheinungsbild und die administrativen Optionen zu konfigurieren. Von hier aus verwalten Sie alles – vom Namen Ihrer Gemeinde und der Subdomain bis zu Benutzerberechtigungen und der Konfiguration der mobilen App.

</div>

## Was Sie hier finden {#what-you-will-find-here}

Der Bereich Einstellungen ist in die folgenden Unterbereiche gegliedert:

1. **Einstellungen** -- Konfigurieren Sie die Grundinformationen Ihrer Gemeinde, die Subdomain, die Region (Datums- und Telefonformat), Spenden, SMS-Anbieter, Dateispeicher und mehr. Details finden Sie unter [Kircheneinstellungen](./church-settings.md). Um Ihren eigenen Domainnamen (z. B. yourchurch.org) zu verwenden, lesen Sie [Eigene Domain](./custom-domain.md).
2. **Standorte** -- Fügen Sie mehrere physische Standorte Ihrer Gemeinde hinzu und verwalten Sie sie. Nach dem Anlegen erscheinen Standorte auf Personenprofilen, in der Einrichtung der Anwesenheit und im Demografie-Dashboard. Sie finden sie als Abschnitt auf der Hauptseite Einstellungen und nicht als eigenen Navigationspunkt. Details finden Sie unter [Standorte](./campuses.md).
3. **Benutzerdefinierte Felder** -- Definieren Sie eigene Felder zur Erfassung bei Personen (ein Datum, eine Zahl, eine Ja/Nein-Angabe oder eine Auswahlliste), tragen Sie diese dann auf den Profilen ein und durchsuchen Sie sie. Ebenfalls als Abschnitt auf der Hauptseite Einstellungen. Details finden Sie unter [Benutzerdefinierte Felder](./custom-fields.md).
4. **Rollen** -- Legen Sie fest, was jede Mitarbeiterin, jeder Mitarbeiter und jede ehrenamtlich tätige Person sehen und ändern darf. Siehe [Rollen und Berechtigungen](./roles-permissions.md).
5. **E-Mail-Vorlagen** -- Speichern Sie wiederverwendbare E-Mail-Inhalte zum manuellen Versand oder für einen Workflow. Details finden Sie unter [E-Mail-Vorlagen](./email-templates.md).
6. **Änderungsprotokoll** und **Stapel** -- Prüfen Sie die Änderungen in Ihrem Konto ([Änderungsprotokoll](../reports/audit-log.md)) und prüfen oder rückgängig machen Sie Massenimporte und Massenaktionen (**Stapel**).
7. **Server-Administration** -- Erweiterte Verwaltungswerkzeuge, die nur ChurchApps-Serveradministratoren angezeigt werden.

:::info
**Konfiguration der mobilen Apps** und **Formulare** haben jetzt eigene Navigationspunkte auf oberster Ebene – **Mobil** und **Formulare** (zu finden unter **Personen**) –, statt im Bereich Einstellungen zu liegen. Details finden Sie unter [Einstellungen der mobilen App](./mobile-app.md) und [Formulare erstellen](/docs/b1-admin/forms/creating-forms).
:::

## Die Hauptseite Einstellungen {#the-main-settings-page}

Wenn Sie die Seite Einstellungen zum ersten Mal öffnen, zeigt der Bereich links den **Namen Ihrer Gemeinde**, die **Subdomain** und die Adresse sowie einen Link **Import/Export**, der das Werkzeug zum Import und Export von Daten zwischen Systemen öffnet.

Darunter listet eine Liste **Konfiguration** jeden Einstellungsbereich: **Gemeindeinformationen**, **Allgemein**, **Region**, **Spenden**, **SMS-Versand**, **Dateispeicher**, **Domains**, **Klassenstufen-Übergang**, **Check-in**, **Freiwilligenanmeldung**, **Datenschutz bei Spenden**, **Standorte**, **Benutzerdefinierte Felder** und **Entwickler**. Jeder Eintrag zeigt eine einzeilige Zusammenfassung seiner aktuellen Einstellung, und Bereiche, die noch eingerichtet werden müssen (etwa Spenden, SMS-Versand oder Domains), sind mit einem kleinen Punkt markiert. **Spenden** erscheint nur für Personen, die Spendeneinstellungen bearbeiten dürfen. Auf dem Telefon ist die Liste ausgeblendet; scrollen Sie die Seite, um jeden Bereich zu erreichen. Alle Bereiche befinden sich auf einer Seite – klicken Sie in der Liste auf einen Namen, um dorthin zu scrollen, oder scrollen Sie einfach nach unten. Jeder Bereich zeigt seine aktuellen Einstellungen; klicken Sie in einem Bereich auf **Bearbeiten**, um sie zu ändern.

Der Bereich **Entwickler** hat drei Reiter: **API-Schlüssel**, **Webhooks** und **Verbundene Apps**. Siehe [API-Schlüssel](../../developer/api/api-keys.md), [Webhooks](../../developer/api/webhooks.md) und [Verbundene Apps](../../developer/api/connected-apps.md).

**E-Mail-Vorlagen**, **Änderungsprotokoll** und **Stapel** sind eigene Seiten – öffnen Sie sie über das [Sprungmenü](../introduction.md#getting-around-with-the-jump-menu) unter **Einstellungen**.

Beginnen Sie mit dem Bereich **Gemeindeinformationen**, um Name, Adresse und Kontaktdaten Ihrer Gemeinde zu bearbeiten – siehe [Kircheneinstellungen](./church-settings.md). Um Benutzerrollen zu verwalten, öffnen Sie das [Sprungmenü](../introduction.md#getting-around-with-the-jump-menu) und wählen Sie **Einstellungen > Rollen** – siehe [Rollen und Berechtigungen](./roles-permissions.md).

:::tip
Beginnen Sie damit, Name und Erscheinungsbild Ihrer Gemeinde unter **Gemeindeinformationen** einzurichten, und legen Sie dann [Rollen](./roles-permissions.md) fest, um Ihr Team mit der passenden Zugriffsstufe einzuladen.
:::

:::info
Informationen dazu, wie Ihre Daten geschützt werden, finden Sie unter [Datensicherheit](./data-security.md).
:::

## Nächste Schritte {#next-steps}

- [Kircheneinstellungen](./church-settings.md) -- Gemeindeinformationen und Erscheinungsbild konfigurieren
- [Standorte](./campuses.md) -- Standorte für Gemeinden mit mehreren Orten anlegen
- [Rollen und Berechtigungen](./roles-permissions.md) -- Benutzerrollen und Zugriffskontrolle einrichten
- [Einstellungen der mobilen App](./mobile-app.md) -- Navigationsreiter und Design-Farben der B1.church-PWA anpassen
- [Push-Benachrichtigungen](./mobile-app.md#push-notifications) -- Push-Benachrichtigungen an die Nutzer Ihrer App senden oder planen
- [Datensicherheit](./data-security.md) -- Erfahren Sie, wie Ihre Daten geschützt werden
