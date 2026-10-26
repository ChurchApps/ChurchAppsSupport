---
title: "Eingaben verwalten"
---

# Eingaben verwalten

<div class="article-intro">

Sobald Ihr Formular live ist, kommen Eingaben herein. Über den Reiter **Form Submissions** können Sie jede Antwort prüfen, nachverfolgen, wer das Formular ausgefüllt hat, und die Daten nutzen, um sich zeitnah bei Ihrer Gemeinde zu melden.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- [Erstellen Sie ein Formular](./creating-forms.md) mit mindestens einer Frage
- Teilen Sie das Formular über die öffentliche URL oder betten Sie es auf Ihrer [Website](../website/managing-pages.md) ein

</div>

## Eingaben ansehen

1. Öffnen Sie das [Jump-Menü](../introduction.md#getting-around-with-the-jump-menu) (das Suchfeld oben links in B1 Admin), klappen Sie **People** auf und klicken Sie auf **Forms**.
2. Klicken Sie auf das Formular, das Sie prüfen möchten.
3. Wechseln Sie zum Reiter **Form Submissions**.

Sie sehen eine Liste aller Antworten, die für dieses Formular eingegangen sind. Jede Eingabe zeigt die Angaben der absendenden Person und das Datum der Absendung, gefolgt von einer Spalte für jede Frage des Formulars. Hat Ihr Formular viele Fragen, können Sie die Tabelle seitlich scrollen, um die übrigen Spalten zu sehen.

## Einzelne Eingaben prüfen

Klicken Sie auf eine beliebige Eingabe, um alle Details anzuzeigen. Sie sehen alle Antworten, die die Person zu jeder Frage des Formulars gegeben hat.

Klicken Sie neben der Eingabe auf das **Druckersymbol**, um die ausgefüllten Antworten dieser Person zu drucken – nützlich für eine Papierablage oder eine unterschriebene Einverständniserklärung, die Sie aufbewahren müssen. Der Ausdruck zeigt oben mittig das Logo Ihrer Gemeinde (das **Light Background Logo** aus [Website > Appearance](../website/appearance.md), falls Sie eines hochgeladen haben) mit dem Namen Ihrer Gemeinde darunter. Ausdrucke erscheinen immer mit dunkler Schrift auf weißem Papier, auch wenn Sie B1 Admin im Dunkelmodus verwenden. Das ist unabhängig vom [Drucken eines leeren Formulars](./creating-forms.md#printing-a-blank-form); hier wird nur die bereits eingereichte Antwort einer Person gedruckt, nicht eine leere Kopie. Das Druckersymbol erscheint überall dort, wo eine Eingabe angezeigt wird, auch im [Profil einer Person](../people/adding-people.md#working-with-forms).

## Die Person einer Eingabe ändern

Wenn eine Eingabe der falschen Person zugeordnet ist – etwa weil zwei Familienmitglieder dieselbe E-Mail-Adresse verwenden –, können Sie sie der richtigen Person zuordnen oder die Verknüpfung lösen.

1. Klicken Sie im Reiter **Form Submissions** auf das Symbol **Change person** (zwei Pfeile) neben dem Namen der Person. Dasselbe Symbol erscheint neben einer Eingabe im [Profil einer Person](../people/adding-people.md#working-with-forms).
2. Suchen Sie im Dialog **Change person** die richtige Person und klicken Sie auf **Move to this person**.
3. Oder klicken Sie auf **Unlink (Anonymous)**, um die Eingabe von jeder Person zu lösen. Sie wird dann als **Anonymous** angezeigt.

Nur die Verknüpfung ändert sich. Die Antworten bleiben gleich, und es werden keine Nachfolge-E-Mails erneut versendet.

:::info
Bei Formularen, die einen Personendatensatz anlegen, wird eine Eingabe – wenn jemand beim Absenden auf der Website Ihrer Gemeinde angemeldet ist – mit dessen eigenem Datensatz verknüpft, auch wenn eine andere Person in Ihrer Datenbank dieselbe E-Mail-Adresse hat. Wenn Sie [zwei Personendatensätze zusammenführen](../people/adding-people.md), werden die Formulareingaben der entfernten Person auf die Person übertragen, die Sie behalten.
:::

## Wie Eingaben erfasst werden

Eingaben können über mehrere Wege eingehen:

- **Öffentliche URL** -- Wenn Ihr Formular eine öffentliche URL hat (Stand-Alone-Formulare), kann jeder mit dem Link eine Antwort absenden. Teilen Sie die URL per E-Mail, in sozialen Netzwerken oder per Textnachricht.
- **Auf Ihrer Website eingebettet** -- Formulare, die auf Ihrer B1-Website eingebettet sind, erfassen Eingaben automatisch, sobald Besucher sie ausfüllen.
- **Interne Nutzung** -- Mitarbeitende und Ehrenamtliche können Formulare auch direkt in B1 Admin im Namen anderer absenden.

:::tip
Prüfen Sie regelmäßig den Reiter **Form Submissions** bei Formularen wie Besucherkarten oder Gebetsanliegen, damit Sie zeitnah nachfassen können.
:::

## Die Formulardaten nutzen

Die über Formulare erfassten Daten helfen Ihnen dabei,

- Veranstaltungsanmeldungen auszuwerten und entsprechend zu planen
- Besucher oder neue Mitglieder nachzubetreuen
- Umfrageergebnisse für die Planung der Dienste zu sammeln
- Zahlungen für Veranstaltungen oder Programme abzuwickeln

:::info
Formularmitglieder mit der Rolle **Admin** oder **View Only** können auf den Reiter **Form Submissions** zugreifen. Achten Sie darauf, dass die richtigen Personen in Ihrem Team Zugang zu den Formularen haben, die sie benötigen, indem Sie die Rollen im Reiter **Form Members** verwalten.
:::

:::info
Wenn ein Stand-Alone-Formular [mit einer Gruppe verknüpft](./creating-forms.md#linking-a-form-to-a-group) ist, können die Leitungen dieser Gruppe die Eingaben auf der Seite der Gruppe auf B1.church lesen und drucken, ohne Formularmitglieder zu sein. Die Leitungen können dort auch die Antworten auf Anmeldefragen für Veranstaltungen ihrer Gruppe lesen. Siehe [Gruppendetails](../../b1-church/groups/group-details.md#linked-forms).
:::

:::tip
Wenn ein **Stand-Alone**-Formular so eingestellt ist, dass ein Personendatensatz angelegt wird, erscheinen Eingaben, die einer bereits vorhandenen Person zugeordnet wurden, auch im Abschnitt **Forms** auf der Seite dieser Person unter People – nicht nur bei Formularen vom Typ People.
:::

## Nächste Schritte

- Erfahren Sie in [Formulare erstellen](./creating-forms.md), wie Sie Formulare entwerfen und anpassen
- Fügen Sie Personen aus Formulareingaben Ihrem [Personenverzeichnis](../people/adding-people.md) hinzu, um sie weiter zu betreuen
- [Verknüpfen Sie ein Formular mit einer Gruppe](./creating-forms.md#linking-a-form-to-a-group), damit deren Leitungen die Antworten lesen können, oder [fügen Sie Absender automatisch der Gruppe hinzu](./creating-forms.md#automatically-adding-submitters-to-a-group), damit ein eigenständiges Anmeldeformular seine eigene Teilnehmerliste aufbaut
