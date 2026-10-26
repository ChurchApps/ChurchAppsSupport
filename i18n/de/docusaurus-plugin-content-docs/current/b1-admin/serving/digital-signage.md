---
title: "Digital Signage"
---

# Digital Signage

<div class="article-intro">

Zeigen Sie Ihre Lerninhalte über einen Digital-Signage-Feed auf einem Fernseher in der Lobby oder im Flur an. Jeder Planungstyp erhält eine Feed-URL, die immer den Inhalt des aktuellen Plans abspielt, sodass Sie nichts wöchentlich aktualisieren müssen. Wenn Ihre Fernseher FreePlay verwenden, können Sie den Planungstyp stattdessen im FreePlay-Admin auf ihnen planen.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Richten Sie einen [Planungstyp](./plans.md) mit [Lessons.church](../../b1-church/content/lessons.md) oder anderen Lerninhalten ein, die geplant sind
- Halten Sie ein [SignPresenter](https://www.signpresenter.com)-Konto und ein Gerät bereit, auf dem es angezeigt wird, oder einen Fernseher mit [FreePlay](../../freeplay/)

</div>

## Feed-URL abrufen

1. Gehen Sie zu **Serving**, wählen Sie den Dienst, der Ihren Planungstyp enthält, und klicken Sie auf den Planungstyp, um ihn zu öffnen.
2. Klicken Sie oben auf der Seite des Planungstyps auf **Digital Signage** (das TV-Symbol).
3. Klicken Sie im Dialog **Digital-Signage-Feed** neben **Feed-URL** auf die Schaltfläche zum Kopieren.

:::info
Die Feed-URL ist an den Planungstyp gebunden, nicht an einen einzelnen Plan. Sie verfolgt automatisch den Plan, der für diesen Planungstyp als aktuell geplant ist, daher müssen Sie sie nur einmal einrichten.
:::

## Verbindung mit SignPresenter herstellen

Der Feed ist für die Zusammenarbeit mit [SignPresenter](https://www.signpresenter.com) ausgelegt, einer Digital-Signage-App eines Drittanbieters. Fügen Sie die kopierte URL in SignPresenter als externen Feed ein, um Ihre aktuellen Lerninhalte auf einem verbundenen Bildschirm anzuzeigen.

Eine Schritt-für-Schritt-Anleitung zur Einrichtung innerhalb von SignPresenter finden Sie in [SignPresenters Anleitung für Lessons.church](https://support.signpresenter.com/topics/lessons-dot-church.html). Auch der Dialog verlinkt auf diese Anleitung.

## Stattdessen FreePlay-Fernseher verwenden

Wenn Ihre Bildschirme [FreePlay](../../freeplay/) verwenden, benötigen Sie die Feed-URL nicht. Der Dialog **Digital-Signage-Feed** verlinkt auf **admin.freeplay.church/calendar**, wo Sie diesen Planungstyp auf Ihren FreePlay-Fernsehern planen können:

1. Klicken Sie im Dialog auf den Link **admin.freeplay.church/calendar**. FreePlay-Admin verwendet dieselbe Anmeldung wie B1 Admin.
2. Wählen Sie die Bildschirmgruppe für Ihre Fernseher aus und klicken Sie auf **Zeitplan hinzufügen**.
3. Wählen Sie unter **Wiedergabe** Ihren Planungstyp aus **Gottesdienstpläne** aus. Er ist mit **(aktueller Plan)** markiert.
4. Legen Sie die Tage und Uhrzeiten fest und klicken Sie dann auf **Speichern**.

Die Fernseher spielen jede Woche zu den von Ihnen festgelegten Zeiten den Plan ab, der für diesen Planungstyp gerade aktuell ist. Das funktioniert auch mit Go-Curriculum-Lektionen, einschließlich angepasster Pläne. FreePlay meldet sich mit dem Go-Curriculum-Konto an, das unter **Inhaltsanbieter** mit dem Dienst verknüpft ist (siehe [Lektionen planen](./scheduling-lessons.md)), oder mit der Go-Curriculum-Verbindung der Kirche, falls der Dienst keine hat. Alle Optionen finden Sie unter [Den Kalender planen](../../freeplay/scheduled-mode/scheduling-the-calendar), und unter [Einen Bildschirm koppeln](../../freeplay/scheduled-mode/pairing-a-screen) erfahren Sie, wie Sie einen Fernseher hinzufügen.

:::note
Die Feed-URL enthält keine Medien aus Go Curriculum, da dieser Inhalt Ihre Go-Curriculum-Anmeldung der Kirche erfordert. Um eine Go-Curriculum-Lektion auf einem Fernseher in der Lobby oder im Klassenzimmer anzuzeigen, verwenden Sie FreePlay.
:::

## Nächste Schritte

- Verwalten Sie die Pläne, die dieses Digital-Signage-Display speisen, auf der Seite [Pläne](./plans.md)
- Planen Sie Inhalte mit [Lessons.church](./scheduling-lessons.md)
- Stellen Sie FreePlay-Fernseher mit [Geplanter Modus](../../freeplay/scheduled-mode/) in einen Kalender
