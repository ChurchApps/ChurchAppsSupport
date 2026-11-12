---
title: "Clearstream"
description: "Verbinden Sie Clearstream SMS über Zapier mit B1 Admin: Senden Sie Textnachrichten bei neuen Spenden oder Formular-Einsendungen und übernehmen Sie eingehende Antworten als Personen zurück in B1."
---

# Clearstream

<div class="article-intro">

Lösen Sie bei jedem B1-Ereignis – neue Person, neue Spende, Formular-Einsendung, Kalenderaktualisierung – eine [Clearstream](https://clearstream.io)-Textnachricht aus und übernehmen Sie Antworten als B1-Datensätze. Die Zapier-App von Clearstream unterstützt beide Richtungen, daher ist die gesamte Verbindung ein Rezept und kein eigener Code.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Ein [Clearstream](https://clearstream.io)-Konto mit mindestens einer Liste und einem SMS-Kontingent
- Ein [Zapier](https://zapier.com)-Konto
- Ein B1Admin-Benutzer mit der Berechtigung **Einstellungen bearbeiten**

</div>

## Was Sie verbinden können {#what-you-can-wire-up}

| Richtung | Auslöser | Aktion |
|---|---|---|
| B1 → Clearstream | B1 `person.created` | Clearstream: Abonnent erstellen/aktualisieren + Textnachricht an Nummer senden |
| B1 → Clearstream | B1 `donation.created` | Clearstream: Textnachricht an Liste senden (z. B. das Finanzteam benachrichtigen) |
| B1 → Clearstream | B1 `form.submission.created` | Clearstream: Textnachricht an eine Weiterleitungsliste senden (z. B. das Gebetsteam) |
| Clearstream → B1 | Neue eingehende Textnachricht | B1: Person erstellen; mit dem Stichwort markieren, das sie geschrieben haben |

Die Zapier-Aktionen von Clearstream: *Textnachricht an Nummer senden*, *Textnachricht an Liste senden*, *Abonnent erstellen/aktualisieren*, *Abonnent einem automatisierten Ablauf hinzufügen*, *Markierung zum Abonnenten hinzufügen*, *Abonnent von Liste entfernen*.

## Einrichtung {#setup}

### 1. Einen B1-API-Schlüssel erstellen {#1-mint-a-b1-api-key}

**Einstellungen → Entwickler → API-Schlüssel → Neuer API-Schlüssel**:

- `settings:write` – erforderlich, um den Schlüssel mit Zapier zu verbinden und damit B1 den Auslöser-Webhook registrieren kann
- `people:read` – nötig, um die Person aus dem Ereignis nachzuschlagen (`personId` → Name/Telefon/E-Mail)
- (Optional) `people:write`, wenn Antworten über Clearstream B1-Kontakte anlegen sollen

### 2. Den Zap „Textnachricht bei neuer Spende“ erstellen {#2-build-the-text-on-new-gift-zap}

1. **Auslöser** – B1.church: Neue Spende
2. **Aktion** – B1.church: Person suchen (die `personId` der Spende)
3. **Aktion** – Clearstream: Textnachricht an Nummer senden. Verwenden Sie die Telefonnummer der Person aus Schritt 2 als Empfänger und verfassen Sie die Nachricht (`"Thanks for your gift, {first}! …"`).

Schalten Sie den Zap ein. B1 registriert den Spenden-Webhook beim Aktivieren; Sie sehen dann `Zapier — donation.created` unter **Einstellungen → Entwickler → Webhooks**.

### 3. (Optional) Antworten als B1-Datensätze übernehmen {#3-optional-pull-replies-back-as-b1-records}

1. **Auslöser** – Clearstream: Neue eingehende Textnachricht
2. **Aktion** – Filter von Zapier nach dem Stichwort – z. B. nur fortfahren, wenn der Text mit `PRAY` beginnt
3. **Aktion** – Speichern Sie den Text der Nachricht dort, wo Ihr Team ihn sieht (Slack, eine Google Tabelle oder eine B1-Aufgabe). Die Funktion *Person suchen* von B1 sucht Personen nur über ID, E-Mail-Adresse oder Name, nicht über die Telefonnummer. Ordnen Sie die Antwort daher manuell einer B1-Person zu (oder fügen Sie einen Aufruf von Webhooks by Zapier per GET an den Endpunkt `/membership/people/search/phone?number=…` der B1-API hinzu).

## Häufige Rezepte {#common-recipes}

### Alarmierung des Ehrenamtsteams {#volunteer-team-paging}

- **Auslöser** – B1.church: Neue Formular-Einsendung (gefiltert nach der ID des Gebetsanliegen-Formulars)
- **Aktion** – Clearstream: Textnachricht an Liste senden, wobei die Liste Ihr diensthabendes Seelsorgeteam ist. Verfassen Sie den Text als `New prayer request: {data.questions.0.answer}`.

### Nachfassen bei Erstbesuchern {#first-time-visitor-follow-up-sequence}

- **Auslöser** – B1.church: Neue Person, gefiltert nach dem Mitgliedschaftsstatus der Person (zum Beispiel *Besucher*)
- **Aktion** – Clearstream: Abonnent einem automatisierten Ablauf hinzufügen. Ordnen Sie die ID des Ablaufs einer vorgefertigten 7-tägigen Textnachricht-Reihe zu.

### Gruppenbeitritt per Stichwort {#keyword-driven-group-join}

- **Auslöser** – Clearstream: Neue eingehende Textnachricht (gefiltert auf das Stichwort `MENS`)
- **Aktion** – B1.church: Person aus Name und Telefonnummer des Absenders erstellen (die Funktion *Person suchen* von B1 kann Personen nicht über die Telefonnummer finden, prüfen Sie daher später unter **Personen** auf Dubletten)
- **Aktion** – B1.church: Gruppenmitglied zur Gruppe Männerarbeit hinzufügen

## Einschränkungen und Hinweise {#limits--notes}

- **Clearstream berechnet SMS nach Nachrichten.** Jede Aktion „Textnachricht senden“ verbraucht je nach Länge und Anzahl der Empfänger einen oder mehrere Credits – prüfen Sie das Kontingent Ihres Tarifs.
- **Die Telefonnummer muss im Format E.164 vorliegen** (z. B. `+15555550199`) für *Textnachricht an Nummer senden*. Der Personendatensatz in B1 speichert, was eingegeben wurde; verwenden Sie einen Schritt *Formatter by Zapier — Numbers → Format Phone Number*, wenn Sie das Format nicht garantieren können.
- **Auf Seiten von B1 ist kein Header nötig** – die Authentifizierung von Clearstream liegt vollständig in der Zapier-Verbindung.

## Fehlerbehebung {#troubleshooting}

- **Der Auslöser startet nie** – unter `Settings → Developer → Webhooks` sollte nach dem Einschalten des Zaps eine Zeile `Zapier — <event>` erscheinen. Fehlt sie, fehlt dem B1-API-Schlüssel `settings:write`. Erstellen Sie den Schlüssel neu und verbinden Sie ihn erneut.
- **Clearstream meldet „Invalid phone number“** – das Empfängerfeld ist nicht im Format E.164. Fügen Sie einen Schritt Format Phone Number hinzu.
- **Textnachricht an Liste senden schlägt mit `403` fehl** – der Clearstream-API-Benutzer hat keine Berechtigung für diese Liste oder die Listen-ID ist falsch. Die Listen-IDs sehen Sie auf der Detailseite der Liste in Clearstream.

## Siehe auch {#see-also}

- [Text In Church](./text-in-church.md) – alternative SMS-Plattform mit ähnlichem Aufbau der Verbindung
- [Mobile Message](./mobile-message.md) – für Gemeinden außerhalb der USA
- [Zapier (Überblick)](../zapier.md) – die B1-Seite jedes Zapier-Rezepts
- [Clearstream-API-Dokumentation](https://api-docs.clearstream.io/) – für eigene Integrationen über die Zapier-App hinaus
