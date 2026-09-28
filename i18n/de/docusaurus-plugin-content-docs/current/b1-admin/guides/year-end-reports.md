---
title: "Anleitung: Generiere Jahresend-Spendendberichte"
---

# Generiere Jahresend-Spendendberichte

<div class="article-intro">

Gehe durch den Jahresendprozess des Finalisierens deiner Spendendatensätze, der Überprüfung von Fondseinstellungen und der Generierung von steuerabzugsfähigen Spendendbestätigungen für jeden Spender. Dies wird normalerweise Anfang Januar für das vorherige Kalenderjahr durchgeführt.

</div>

<div class="prereqs">
<h4>Bevor du beginnst</h4>

- B1 Admin-Konto mit Finanzenzugriff
- Während des Jahres aufgezeichnete Spenden (online über Stripe und/oder manuell eingegeben)
- Zugriff auf dein Stripe-Konto, wenn du Online-Spenden akzeptierst

</div>

## Schritt 1: Importiere endgültige Stripe-Transaktionen

Stelle sicher, dass alle Online-Spenden vom Ende des Jahres in deinem System sind.

Folge der Anleitung [Stripe-Import](../donations/stripe-import.md):

1. Navigiere zu Spenden > Chargen > Stripe-Import
2. Wähle einen Datumsbereich, der das Ende des Jahres abdeckt (z. B. 1. Dezember - 31. Dezember)
3. Klicke zuerst auf Vorschau, um zu überprüfen, dann Import fehlender zum Finalisieren

:::warning
Führe diesen Import vor der Generierung von Bestätigungen aus. Alle Transaktionen, die du nicht importiert hast, erscheinen nicht auf Spenderbestätigungen.
:::

## Schritt 2: Überprüfe Spendendberichte

Überprüfe, ob deine Aufzeichnungen genau sind, bevor du Bestätigungen generierst.

Folge der Anleitung [Spendendberichte](../donations/donation-reports.md):

1. Überprüfe die Spendendzusammenfassungsseite für das ganze Jahr
2. Überprüfe Summen nach Fonds und vergleiche sie mit deinen Kontoauszügen, um Abweichungen zu erkennen
3. Klicke auf einzelne Chargen, um Spenderdetails bei Bedarf zu überprüfen

## Schritt 3: Überprüfe Fonds-Steuerstatus

Stelle sicher, dass jeder Fonds-Steuerstatus korrekt ist, damit Bestätigungen genau sind.

Folge der Anleitung [Fonds](../donations/funds.md):

1. Öffne jeden Fonds und bestätige, dass die Steuerabzugsfähig-Einstellung korrekt ist

:::info
Nur Spenden zu Fonds, die als steuerabzugsfähig markiert sind, erscheinen auf Spendendbestätigungen. Wenn ein Fonds steuerabzugsfähig sein sollte, aber nicht so markiert ist, aktualisiere ihn, bevor du Bestätigungen generierst.
:::

## Schritt 4: Generiere Spendendbestätigungen

Erstelle die offiziellen Spendendbestätigungen für deine Spender.

Folge der Anleitung [Spendendbestätigungen](../donations/giving-statements.md):

1. Navigiere zu **Spenden > Spendendbestätigungen**
2. Wähle das Jahr aus der Dropdown-Liste und überprüfe die Zusammenfassungsstatistiken
3. Wähle deine Download-Methode:
   - **ZIP herunterladen** -- einzelne CSV-Dateien, eine pro Spender
   - **Alle drucken** -- druckbare Ansicht mit jeder Bestätigung auf einer neuen Seite

:::tip
Generiere Bestätigungen Anfang Januar, während Aufzeichnungen frisch sind. Dies gibt dir Zeit, Probleme zu erkennen, bevor du sie verschickst.
:::

## Schritt 5: Verteile an Spender

Bekomme die Bestätigungen in die Hände deiner Spender.

1. Drucke und verschicke Bestätigungen, oder sende einzelne CSVs per E-Mail an Spender
2. Mitglieder können auch ihre eigene Spendendhistorie einsehen und Bestätigungen von [B1.church](../../b1-church/giving/donation-history.md) und der [B1 Mobile App](../../b1-mobile/giving/donation-history.md) drucken

## Du bist fertig!

Deine Jahresend-Spendendberichte sind abgeschlossen. Spender haben ihre steuerabzugsfähigen Bestätigungen und deine Finanzaufzeichnungen sind für das Jahr finalisiert.

## Verwandte Artikel

- [Stripe-Import](../donations/stripe-import.md) -- importiere Online-Transaktionen
- [Spendendberichte](../donations/donation-reports.md) -- zeige Spendendtrends und -summen
- [Fonds](../donations/funds.md) -- verwalte Fonds und Steuerabzugsfähig-Einstellungen
- [Spendendbestätigungen](../donations/giving-statements.md) -- generiere Jahresend-Bestätigungen
- [Spenden aufzeichnen](../donations/recording-donations.md) -- erfasse manuell Bar-/Scheckspenden
- [Spendendhistorie (Web)](../../b1-church/giving/donation-history.md) -- Mitglieder-Selbstservice-Ansicht
- [Online-Spenden einrichten Anleitung](./online-giving.md) -- erste Stripe und Spenden-Einrichtung
