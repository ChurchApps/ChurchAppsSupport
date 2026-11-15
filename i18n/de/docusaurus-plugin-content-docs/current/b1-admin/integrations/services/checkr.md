---
title: "Checkr"
description: "Verbinden Sie Anmeldungen von Ehrenamtlichen in B1 Admin mit Checkr-Hintergrundprüfungen über Make.com, mit optionalen Statusmeldungen für Ihre Koordination für den Schutz von Minderjährigen."
---

# Checkr

<div class="article-intro">

[Checkr](https://checkr.com) führt Hintergrundprüfungen für Mitarbeitende und Ehrenamtliche durch – ein nahezu allgemeiner Bedarf für jede Gemeinde mit einem Kinder- oder Jugendprogramm. B1 hat **keine eingebaute Funktion für Hintergrundprüfungen** – das Beauftragen von Prüfungen, das Nachverfolgen der Ergebnisse und die Einhaltung der Prüfvorgaben finden alle bei Checkr statt; das folgende Rezept verbindet lediglich B1-Ereignisse mit Checkr. Checkr hat keine Zapier-App, aber die [Checkr-Integration von Make.com](https://www.make.com/en/integrations/checkr) ist geprüft und stellt die Aktionen bereit, die Sie benötigen, um aus einem B1-Ereignis eine Prüfung zu starten.

</div>

:::caution
Dieses Rezept verwendet die Make-App für B1.church, die noch nicht veröffentlicht ist (siehe [Make](../make.md)). Bis dahin muss die B1-Seite dieser Szenarien mit dem Modul **HTTP** von Make aufgebaut werden, das die [REST-API](/docs/developer/api) von B1 aufruft.
:::

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Ein [Checkr](https://checkr.com)-Konto mit API-Zugang und mindestens einem konfigurierten Prüfpaket
- Ein [Make](https://www.make.com)-Konto
- Ein B1Admin-Benutzer mit der Berechtigung **Einstellungen bearbeiten**

</div>

## Was Sie verbinden können {#what-you-can-wire-up}

Die Checkr-App von Make stellt 1 Auslöser und 6 Aktionen bereit:

| Richtung | B1- / Make-Auslöser | Aktion |
|---|---|---|
| B1 → Checkr | B1 `group.member.added` (gefiltert auf ein Ehrenamtsteam) | Checkr: Kandidat erstellen → Einladung zur Hintergrundprüfung erstellen |
| Checkr → B1 | Checkr-Webhook (Einladungs- / Berichtsereignis) | B1: Datensatz der Person aktualisieren (z. B. Markierung „Checkr bestanden“) |

Die Checkr-Aktionen von Make: Kandidat erstellen, Einladung zur Hintergrundprüfung erstellen, Kandidat abrufen, Bericht abrufen, voraussichtliche Dauer des Berichts abrufen und Einladung abrufen. Dazu kommen 4 Suchmodule.

## Einrichtung {#setup}

### 1. Einen B1-API-Schlüssel erstellen {#1-mint-a-b1-api-key}

**Einstellungen → Entwickler → API-Schlüssel → Neuer API-Schlüssel**:

- `settings:write` – für den Auslöser-Webhook
- `people:read` – um Name und E-Mail-Adresse der Person nachzuschlagen, wenn eine Prüfung gestartet wird
- (Optional) `people:write`, wenn Sie den Berichtsstatus als benutzerdefiniertes Feld oder als Markierung zurückschreiben möchten

### 2. Das Szenario „Prüfung bei Anmeldung von Ehrenamtlichen starten“ in Make erstellen {#2-build-the-kick-off-a-check-on-volunteer-signup-scenario-in-make}

1. **Auslöser** – B1.church: Ereignisse beobachten (`group.member.added`).
2. **Filter** – nur fortfahren, wenn `data.groupId` mit Ihrem Team „Ehrenamtliche Kinderarbeit“ (oder einem gleichwertigen Team) übereinstimmt.
3. **Aktion** – B1.church: Person suchen (anhand von `data.personId`), um E-Mail-Adresse sowie Vor- und Nachname zu erhalten.
4. **Aktion** – Checkr: Kandidat erstellen. Ordnen Sie Vorname, Nachname und E-Mail-Adresse aus Schritt 3 zu.
5. **Aktion** – Checkr: Einladung zur Hintergrundprüfung erstellen. Ordnen Sie die neue Kandidaten-ID aus Schritt 4 dem Feld *candidate_id* zu. Wählen Sie das Prüfpaket (z. B. `tasker_standard` oder was Ihr Konto anbietet).
6. (Optional) **Aktion** – Slack: Ihre Koordination für den Schutz von Minderjährigen darüber informieren, dass eine Prüfung eingeleitet wurde.

Schalten Sie das Szenario ein. Neue Ehrenamtliche im betreffenden Team erhalten automatisch eine Checkr-Einladung per E-Mail; sie füllen sie auf ihrem Telefon oder Laptop aus, und Checkr führt die Prüfung durch.

### 3. (Optional) Den Bericht zurückerhalten {#3-optional-receive-the-report-back}

1. **Auslöser** – Checkr: Ereignisse beobachten (Webhook). Make registriert beim Aktivieren einen Checkr-Webhook.
2. **Filter** – nur fortfahren, wenn `event_type = report.completed`.
3. **Aktion** – Checkr: Bericht abrufen (mit der Berichts-ID aus dem Webhook).
4. **Aktion** – B1.church: Person suchen (anhand der E-Mail-Adresse des Kandidaten).
5. **Aktion** – Bedingte Benachrichtigung über Slack / E-Mail: die Koordination mit dem Status `clear` / `consider` / `suspended` informieren.

Hinweis: B1 hat derzeit kein eingebautes Feld für den Status der Hintergrundprüfung. Praktische Möglichkeiten sind (a) das Ergebnis zur Prüfung in einen privaten Slack-Kanal zu posten, (b) es zur Nachvollziehbarkeit in eine Google Tabelle zu schreiben oder (c) die Person bei `clear` einer B1-Gruppe „Geprüfte Ehrenamtliche“ hinzuzufügen.

## Häufige Rezepte {#common-recipes}

### Ehrenamtliche alle 2 Jahre erneut prüfen {#re-screen-volunteers-every-2-years}

Kombinieren Sie das Obige mit einem zeitgesteuerten Auslöser in Make:

- **Auslöser** – Make: Zeitplan (monatlich)
- **Aktion** – HTTP – Anfrage senden: GET auf `/membership/groupmembers?groupId=…` der B1-API für Ihre Gruppe „Geprüfte Ehrenamtliche“ (die B1.church-App hat keine Listenaktion)
- **Aktion** – Filter in Make: Prüfdatum älter als 22 Monate
- **Aktion** – Checkr: Einladung zur Hintergrundprüfung erstellen (wie beim ersten Ablauf)

### Zugang der Stufe 1 sperren, bis die Prüfung abgeschlossen ist {#block-stage-1-access-until-check-completes}

Wenn Ihre Gemeinde die Gruppenzugehörigkeit in B1 nutzt, um den Zugang zu steuern (z. B. erscheinen nur Mitglieder der Gruppe „Geprüft“ in den Dienstplänen), halten Sie neue Ehrenamtliche in einer Wartegruppe, bis das Checkr-Ereignis `report.completed` sie freigibt.

## Einschränkungen und Hinweise {#limits--notes}

- **Checkr ist für die meisten Prüfpakete nur in den USA verfügbar.** Gemeinden in Australien, Großbritannien und Kanada benötigen eine Alternative.
- **Die Preisgestaltung** erfolgt pro Prüfung – jede Einladung, die Sie in Make erstellen, verbraucht eine echte Prüfung. Testen Sie zuerst in der Sandbox- bzw. Testumgebung von Checkr (die Checkr-App in Make verwendet die Zugangsdaten der Verbindung, daher wechseln Sie zwischen Test- und Live-Betrieb, indem Sie die Zugangsdaten tauschen).
- **Der API-Zugang bei Checkr hängt vom Tarif ab.** Kleinere Checkr-Konten sind unter Umständen nur über die Oberfläche nutzbar; wenden Sie sich an Checkr, um die API freizuschalten.

## Fehlerbehebung {#troubleshooting}

- **Kandidat erstellen schlägt mit `403` fehl** – das Checkr-API-Token ist nur lesend oder hat nicht die richtigen Kontoberechtigungen. Stellen Sie es im Checkr-Dashboard mit Schreibberechtigung neu aus.
- **Die Einladung kommt nie an** – prüfen Sie die E-Mail-Adresse des Kandidaten in Schritt 3; in B1 ist das Feld für diese Person unter Umständen leer. Fügen Sie vor dem Checkr-Schritt einen Filter ein, der eine E-Mail-Adresse verlangt.
- **Der Webhook-Auslöser startet nicht** – die Webhook-Registrierung bei Checkr schlägt manchmal stillschweigend fehl, wenn Ihr Make-Konto nicht in einem kostenpflichtigen Tarif ist, der ausgehende Webhooks unterstützt. Prüfen Sie auf der Seite *Webhooks* im Checkr-Dashboard, ob die URL von Make aufgeführt ist.

## Siehe auch {#see-also}

- [Make (Überblick)](../make.md) – die B1-Seite jedes Make-Szenarios
- [Mobile Message](./mobile-message.md) – für SMS-Anbieter ohne Zapier-App, mit demselben Webhook-/HTTP-Muster wie die Make-Verbindung zu Checkr
- [Checkr-API-Dokumentation](https://docs.checkr.com/)
