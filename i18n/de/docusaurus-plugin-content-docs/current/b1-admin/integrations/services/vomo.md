---
title: "VOMO"
description: "Verbinden Sie Anmeldungen von Ehrenamtlichen und Kiosk-Check-ins von VOMO über Zapier mit Personen und Gruppen in B1 Admin – inklusive Berechtigungen der API-Schlüssel und Einrichtungsschritten."
---

# VOMO

<div class="article-intro">

VOMO ist eine Plattform für das Engagement von Ehrenamtlichen – Menschen melden sich für Projekte an, checken am Kiosk ein und sammeln Stunden. Wenn Sie VOMO für die Planung von Ehrenamtlichen nutzen, B1 aber für die Personendaten, kann Zapier Mitgliedschaften und Check-ins zwischen beiden synchronisieren, damit keine Seite auseinanderläuft.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Ein [VOMO](https://vomo.org)-Konto mit einem Tarif, der Zapier unterstützt (fragen Sie im Zweifel den VOMO-Support)
- Ein [Zapier](https://zapier.com)-Konto
- Ein B1Admin-Benutzer mit der Berechtigung **Einstellungen bearbeiten**

</div>

## Was Sie verbinden können {#what-you-can-wire-up}

Die Zapier-App von VOMO bietet vier sofortige Auslöser und vier Aktionen. Die Rezepte, die sich die meisten Gemeinden wünschen:

| Richtung | Auslöser | Aktion |
|---|---|---|
| VOMO → B1 | VOMO-Mitgliedschaft (erstellt) | B1: Person suchen → Person erstellen (falls neu) |
| VOMO → B1 | VOMO-Kiosk-Check-in | B1: Gruppenmitglied zur Gruppe „Derzeit im Dienst“ hinzufügen oder als Anwesenheit erfassen |
| B1 → VOMO | B1 `person.created` | VOMO: Organisator suchen (anhand der E-Mail-Adresse); sonst eigener Schritt |
| Beides | VOMO-Teilnahme (Anmeldungen) | B1: Gruppenmitglied zur projektbezogenen Gruppe hinzufügen |

Die Aktionen von VOMO beschränken sich auf **Projektentwürfe** und das **Suchen** vorhandener Organisatoren bzw. Projekte – eine Aktion „Diese Person einem VOMO-Projekt hinzufügen“ gibt es derzeit nicht. Die spannende Verbindung verläuft vor allem von VOMO → B1.

## Einrichtung {#setup}

### 1. Einen B1-API-Schlüssel erstellen {#1-mint-a-b1-api-key}

**Einstellungen → Entwickler → API-Schlüssel → Neuer API-Schlüssel**. Berechtigungen:

- `settings:write` – Zapier prüft beim Verbinden jeden B1-Schlüssel gegen die Webhook-Liste von B1; ohne diese Berechtigung schlägt die Verbindung fehl
- `people:read`, `people:write` – um Ehrenamtliche als Personen in B1 nachzuschlagen und anzulegen
- `groups:write` – um sie Dienst-Teams als Gruppen hinzuzufügen
- (Optional) `attendance:write`, wenn Sie Kiosk-Check-ins als Anwesenheit behandeln

### 2. Den Zap zur Synchronisation der Mitgliedschaft erstellen {#2-build-the-membership-sync-zap}

1. **Auslöser** – VOMO: Mitgliedschaft (Ereignis = `created`).
2. **Aktion** – B1.church: Person suchen, abgeglichen über die E-Mail-Adresse.
3. **Aktion** – B1.church: Gruppenmitglied hinzufügen und die Person aus Schritt 2 der passenden Ehrenamtsgruppe zuordnen.

   Die Funktion *Person suchen* von B1 bricht den Zap mit dem Fehler „No person found“ ab, wenn niemand passt. Für Ehrenamtliche, die noch nicht in B1 sind, aktivieren Sie die Fehlerbehandlung von Zapier für den Schritt Person suchen und führen Sie im Fehlerpfad B1.church: Person erstellen und danach Gruppenmitglied hinzufügen aus.
4. Einschalten. Neue Ehrenamtliche von VOMO erscheinen nun in B1 mit der richtigen Gruppenzugehörigkeit.

### 3. (Optional) Den Zap für Kiosk-Check-ins erstellen {#3-optional-build-the-kiosk-check-in-zap}

1. **Auslöser** – VOMO: Kiosk
2. **Aktion** – B1.church: Person suchen (anhand der E-Mail-Adresse)
3. **Aktion** – je nach Bedarf:
   - *Wenn Sie es als Anwesenheit behandeln* – Webhooks by Zapier POST an den Endpunkt `/attendance/visits` der B1-API (die Zapier-App von B1 hat noch keine eigene Aktion *Anwesenheit erfassen*). Der B1-[API-Schlüssel](/docs/developer/api/api-keys) wird im Header `Authorization: Bearer cak_…` übergeben.
   - *Wenn Sie es als Gruppenmitgliedschaft behandeln* – B1.church: Gruppenmitglied hinzufügen mit der Gruppe „Derzeit im Dienst (heute)“. Ein zweiter Zap später am Tag entfernt sie über eine geplante Bereinigung wieder.

## Häufige Rezepte {#common-recipes}

### Synchronisation je Projekt {#per-project-group-sync}

- **Auslöser** – VOMO: Teilnahme (erstellt)
- **Aktion** – Filter von Zapier auf die Projekt-ID, danach
- **Aktion** – B1.church: Gruppenmitglied zu einer B1-Gruppe hinzufügen, deren Name dem VOMO-Projekt entspricht.

Wenn das VOMO-Projekt endet, leeren Sie die B1-Gruppe manuell (oder kombinieren Sie dies mit einem Auslöser *Teilnahme gelöscht*, der die Personen entfernt).

### Eine Dank-SMS für die Anmeldung senden {#send-a-thanks-for-signing-up-text-via-sms}

Verketten Sie im selben Zap VOMO-Teilnahme → Clearstream *Textnachricht senden* oder Text In Church *Nachricht senden*. Beide haben eigene Zapier-Aktionen – siehe [Clearstream](./clearstream.md) und [Text In Church](./text-in-church.md).

### Abbrecher erkennen {#detect-drop-off}

Führen Sie täglich einen Zapier-Auslöser *Zeitplan* aus, der in VOMO *Organisator suchen* für eine Liste von B1-Personen aufruft, die diesen Monat dem Dienst-Team beigetreten sind. Meldet VOMO „not found“, haben sie VOMO nicht aktiviert und brauchen eine Erinnerung.

## Einschränkungen und Hinweise {#limits--notes}

- **Die E-Mail-Adresse ist der Verknüpfungsschlüssel.** Die Nutzdaten von VOMO enthalten eine E-Mail-Adresse, aber keine Personen-ID von B1. Spender, die in beiden Systemen unterschiedliche E-Mail-Adressen verwenden, erzeugen Dubletten.
- **Derzeit keine Aktion „Zum Projekt hinzufügen“ in der Zapier-App von VOMO.** Wenn Sie B1-Personen in VOMO-Projekte einschreiben möchten, müssten Sie von einem Schritt *Webhooks by Zapier* aus per POST an die REST-API von VOMO senden. Das ist eine eigene Integration.
- **Die kostenlosen bzw. niedrigeren Tarife von VOMO enthalten Zapier unter Umständen nicht.** Klären Sie dies mit dem VOMO-Support, bevor Sie einen Termin für die Anbindung zusagen.

## Fehlerbehebung {#troubleshooting}

- **Der Auslöser startet nie** – die sofortigen Auslöser von VOMO benötigen ein gültiges API-Token. Testen Sie den Zap erneut; verbinden Sie VOMO neu, falls das Token rotiert wurde.
- **B1 *Gruppenmitglied hinzufügen* schlägt fehl** – die Gruppe in der Aktion existiert nicht mehr. Wählen Sie die Gruppe im Dropdown **Gruppe** des Schritts erneut aus oder öffnen Sie die Gruppe in B1Admin (**Personen > Gruppen**) und kopieren Sie die ID vom Ende ihrer Web-Adresse.
- **Doppelte Personen in B1 aus einer einzigen VOMO-Ehrenamtlichen** – sie haben sich vermutlich mit einer anderen E-Mail-Adresse angemeldet als in B1 hinterlegt. Vereinheitlichen Sie entweder die E-Mail-Adressen oder fügen Sie einen Zapier-*Pfad* hinzu, der vor dem Anlegen auch nach der Telefonnummer sucht.

## Siehe auch {#see-also}

- [Zapier (Überblick)](../zapier.md) – die B1-Seite jedes Zapier-Rezepts
- [Clearstream](./clearstream.md), [Text In Church](./text-in-church.md) – Anmeldungen von Ehrenamtlichen mit SMS-Bestätigungen verbinden
- [Webhooks (Entwickler-Referenz)](/docs/developer/api/webhooks) – die Ereignisse, die VOMO auslösen kann
