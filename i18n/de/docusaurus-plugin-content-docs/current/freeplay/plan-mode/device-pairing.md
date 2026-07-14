---
title: "Gerät koppeln"
---

# Gerät koppeln

<div class="article-intro">

Um den Plan-Modus zu verwenden, müssen Sie Ihren Fernseher mit einem Plantyp in B1 Admin koppeln. FreePlay generiert einen eindeutigen Kopplungscode, der das Gerät mit dem Kirchenplan verbindet und die automatische Inhaltsbereitstellung jede Woche ermöglicht.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Installieren und starten Sie FreePlay -- siehe [Erste Schritte](../getting-started/)
- Wählen Sie **Mit Plan verbinden** auf dem [Pairing-Modus-Bildschirm](../getting-started/pairing-modes.md)
- Haben Sie Zugriff auf **B1 Admin** auf einem Computer oder Telefon, um die Kopplung abzuschließen

</div>

## Generieren des Kopplungscodes

1. Wählen Sie auf dem Bildschirm **Pairing-Modus auswählen** die Option **Mit Plan verbinden**
2. FreePlay kontaktiert den Server und generiert einen kurzen Kopplungscode
3. Der Code wird in großen Zeichen in der Bildschirmmitte angezeigt
4. Unter dem Code zeigt ein pulsierender Indikator **Auf Verbindung warten** an

Der Code wird als einzelne Zeichen angezeigt, um das Lesen aus der Ferne zu erleichtern.

## Code in B1 Admin eingeben

1. Gehen Sie auf einem Computer oder Telefon zu der unter dem Code auf dem Fernseher angezeigten Adresse (oder scannen Sie den QR-Code auf dem Bildschirm) – dies öffnet die Seite **Gerät autorisieren** in B1 Admin
2. Geben Sie den Kopplungscode ein, falls er nicht bereits vom QR-Code ausgefüllt wurde
3. Wählen Sie unter **Pläne anzeigen für** den Plantyp aus, dem dieser Bildschirm folgen soll (z.B. "Sonntagsgottesdienst"). Lassen Sie ihn auf **Keine** eingestellt, wenn Sie möchten, dass der Bildschirm nur zum Durchsuchen von Inhalten oder Benachrichtigungen verfügbar ist, ohne dass ein Plan damit verknüpft ist
4. Genehmigen Sie das Gerät

FreePlay fragt den Server alle paar Sekunden ab und überprüft, ob die Kopplung abgeschlossen ist. Sobald **B1 Admin** die Verbindung bestätigt, wird der Fernseher automatisch zum Plan-Download-Bildschirm verschoben.

:::tip
Geräte können auch über **Profil → Geräte → Gerät hinzufügen** in B1 Admin mit dem gleichen Code gekoppelt werden – es bietet die gleiche Auswahl **Pläne anzeigen für** Plantyp.
:::

## Plan-Inhalt herunterladen

Nach der Kopplung lädt FreePlay den aktuellen Plan für diesen Plantyp. Es werden angezeigt:

- Der Plan-Name und das Servicedatum
- Der Name der zugehörigen Lektion (falls der Plan Unterrichtsinhalte enthält)
- Ein Fortschrittsindikator mit **Download Element X von Y**

Wenn alle Mediendateien heruntergeladen sind, wird die Schaltfläche **Plan starten** angezeigt. Drücken Sie **Auswählen** auf Ihrer Fernbedienung, um die Wiedergabe zu starten.

:::tip
Der Plan wird automatisch jede Stunde aktualisiert. Wenn der Plan während des Tages aktualisiert wird, erfasst FreePlay die Änderungen ohne manuelle Eingriffe.
:::

## Alternative: Nach Kirchennamen suchen

Wenn Sie den Kopplungscode-Flow nicht verwenden möchten, können Sie unten auf dem Pairing-Bildschirm **oder nach Kirchennamen suchen** auswählen. Dies führt Sie zum Kirchensuchbildschirm, auf dem Sie Ihre Kirche suchen und sich stattdessen mit einem Klassenzimmer verbinden können.

## Falls die Kopplung fehlschlägt

Wenn der Kopplungscode nicht generiert werden kann (z.B. aufgrund eines Netzwerkproblems), wird eine Fehlermeldung mit einer Schaltfläche **Erneut versuchen** angezeigt. Stellen Sie sicher, dass Ihr Fernseher mit dem Internet verbunden ist, und versuchen Sie es erneut.

:::warning
Kopplungscodes verfallen nach einem bestimmten Zeitraum. Falls Sie zu lange warten, generieren Sie einen neuen Code, indem Sie zum Pairing-Bildschirm zurückkehren.
:::

## Verwandte Artikel

- **[Übersicht des Plan-Modus](./index.md)** - Verstehen Sie, wie sich der Plan-Modus vom Klassenzimmer-Modus unterscheidet
- **[Unterrichtslektionen abspielen](../classroom-mode/playing-lessons)** - Player-Steuerelemente sind in beiden Modi gleich
