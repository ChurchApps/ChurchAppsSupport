---
title: "Erste Einrichtung"
---

# Erste Einrichtung

<div class="article-intro">

Jedes B1-Konto wird mit einer einsatzbereiten Website ausgeliefert. Diese Anleitung führt dich durch die Einrichtung deiner Kirchendomain, die Konfiguration des Aussehens deiner Website, das Erstellen deiner ersten Seiten und die Organisation deiner Navigation.

</div>

<div class="prereqs">
<h4>Bevor du anfängst</h4>

- Du benötigst ein B1.church-Konto mit Administratorzugriff
- Wenn du eine benutzerdefinierte Domain verwendest, halte die Anmeldedaten deines DNS-Anbieters bereit (z. B. GoDaddy, Cloudflare oder AWS)
- Bereite dein Kirchenlogo im PNG-Format mit transparentem Hintergrund für beste Ergebnisse vor

</div>

## Richte deine Domain ein

Deine Kirche erhält automatisch eine Subdomain auf B1.church (z. B. `denekirche.b1.church`). Du kannst deine eigene benutzerdefinierte Domain auch auf deine B1-Website verweisen.

1. Gehe zu **B1.church Admin**, indem du admin.b1.church besuchst oder auf dein Profilmenü klickst und **App wechseln** auswählst.
2. Öffne das **Abschnittmenü** in der oberen linken Ecke (der Abschnittsname mit dem kleinen Pfeil) und wähle **Einstellungen**.
3. Öffne den Abschnitt **Kircheninformationen**, um deine Subdomain anzuzeigen. Setze sie auf etwas Kurzes und Erkennbares ohne Leerzeichen.
4. Um eine benutzerdefinierte Domain zu verwenden, melde dich bei deinem DNS-Anbieter an (z. B. GoDaddy, Cloudflare oder AWS) und füge zwei Einträge hinzu:
   - Ein **A-Eintrag** für deine Root-Domain, der auf `3.23.251.61` zeigt
   - Ein **CNAME-Eintrag** für `www`, der auf `proxy.b1.church` zeigt
5. Kehre zu B1.church Admin zurück, füge deine benutzerdefinierte Domain zur Liste hinzu und klicke auf **Hinzufügen** und dann **Speichern**. Deine Website ist in wenigen Minuten über deine benutzerdefinierte Domain erreichbar.

:::tip
Wenn du die Option Einstellungen nicht siehst, bitte die Person, die dein Kirchenkonto eingerichtet hat, dir die Berechtigung "Kircheneinstellungen bearbeiten" zu gewähren. Weitere Details findest du unter [Rollen & Berechtigungen](../settings/roles-permissions.md).
:::

## Erstelle deine erste Seite

1. Klicke in B1 Admin auf **Website** im linken Menü, um die Website-Seiten-Ansicht zu öffnen.
2. Klicke in der oberen rechten Ecke auf **Seite hinzufügen**.
3. Wähle **Leer** als Seitentyp und nenne sie "Startseite".
4. Klicke auf **Seiteneinstellungen** und setze den URL-Pfad auf `/` (einen Schrägstrich ohne Text) für deine Startseite. Andere Seiten verwenden `/seitenname`.
5. Klicke auf **Inhalt bearbeiten**, um mit dem Erstellen zu beginnen. Jede Seite muss mit einem **Abschnitt** beginnen – dies ist der Container für alle anderen Elemente.
6. Nachdem du einen Abschnitt hinzugefügt hast, klicke erneut auf **Inhalt hinzufügen**, um Text, Bilder, Videos, Karten, Formulare und mehr durch Ziehen in deinen Abschnitt einzufügen.

:::info
Detaillierte Anweisungen zum Arbeiten mit Seiten und Navigation findest du unter [Seiten verwalten](managing-pages). Einen umfassenden Leitfaden zum visuellen Editor findest du unter [Verwenden des Seiten-Editors](page-editor).
:::

## Konfiguriere das Aussehen der Website

1. Klicke in der Website-Seiten-Ansicht auf die Registerkarte **Aussehen** oben.
2. Verwende die **Farbpalette**, um deine Markenfarben für primär, sekundär und Akzent festzulegen.
3. Wähle unter **Typografie-Einstellungen** deine Überschrifts- und Body-Schriften aus dem Schrift-Browser.
4. Lade dein Kirchenlogo unter **Logo** in den Style-Einstellungen hoch. Stelle sowohl eine Version für hellem Hintergrund als auch für dunklem Hintergrund bereit.
5. Konfiguriere deinen **Website-Footer** mit den Kontaktinformationen und Links deiner Kirche.

:::info
Änderungen, die du in Aussehen vorgenommst, gelten für deine gesamte Website. Detaillierte Anweisungen zu jeder Einstellung findest du auf der Seite [Aussehen](appearance).
:::

## Richte Navigation ein

Deine Navigationslinks erscheinen in der Website-Seiten-Ansicht. Um sie zu organisieren:

1. Klicke auf **Hinzufügen**, um einen neuen Navigationslink zu erstellen und ihn auf eine deiner Seiten zu verweisen.
2. Ziehe und versetze Links, um sie neu zu ordnen oder sie unter übergeordnete Elemente zu verschachteln.
3. Zeige eine Vorschau deiner Website an, um zu bestätigen, dass die Navigation korrekt aussieht.

## Nächste Schritte

- [Seiten verwalten](managing-pages) – Erfahre, wie du im Detail mit Seiten und Navigation arbeitest
- [Aussehen](appearance) – Verfeinere die Farben, Schriften und das Layout deiner Website
- [Dateien](files) – Lade Bilder und Dokumente für deine Website hoch
