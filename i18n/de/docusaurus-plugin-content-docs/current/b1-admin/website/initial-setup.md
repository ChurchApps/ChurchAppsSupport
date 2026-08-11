---
title: "Anfangseinrichtung"
---

# Anfangseinrichtung

<div class="article-intro">

Jedes B1-Konto kommt mit einer einsatzbereiten Website. Dieser Leitfaden führt Sie durch das Einrichten Ihrer Kirchendomäne, das Konfigurieren des Erscheinungsbildes Ihrer Website, das Erstellen Ihrer ersten Seiten und das Organisieren Ihrer Navigation.

</div>

<div class="prereqs">
<h4>Voraussetzungen</h4>

- Sie benötigen ein B1.church-Konto mit Administratorberechtigung
- Wenn Sie eine benutzerdefinierte Domäne verwenden, halten Sie Ihre DNS-Anbieter-Anmeldedaten bereit (z.B. GoDaddy, Cloudflare oder AWS)
- Bereiten Sie Ihr Kirchenlogo im PNG-Format mit transparentem Hintergrund für beste Ergebnisse vor

</div>

## Einrichten Ihrer Domäne

Ihre Kirche erhält automatisch eine Subdomain auf B1.church (zum Beispiel, `yourchurch.b1.church`). Sie können auch Ihre eigene benutzerdefinierte Domäne an Ihre B1-Website verweisen.

1. Gehen Sie zu **B1.church Admin**, indem Sie admin.b1.church besuchen oder auf Ihr Profil-Dropdown klicken und **App wechseln** wählen.
2. Öffnen Sie das **Bereichsmenü** in der oberen linken Ecke (der Bereichsname mit dem kleinen Pfeil) und wählen Sie **Einstellungen**.
3. Klicken Sie auf **Verwalten**, um Ihre Subdomain anzuzeigen. Stellen Sie sie auf etwas Kurzes und Erkennbares ohne Leerzeichen ein.
4. Um eine benutzerdefinierte Domäne zu verwenden, melden Sie sich bei Ihrem DNS-Anbieter an (wie GoDaddy, Cloudflare oder AWS) und fügen Sie zwei Datensätze hinzu:
   - Ein **A-Datensatz** für Ihre Wurzel-Domäne, der zu `3.23.251.61` zeigt
   - Ein **CNAME-Datensatz** für `www`, der zu `proxy.b1.church` zeigt
5. Kehren Sie zu B1.church Admin zurück, fügen Sie Ihre benutzerdefinierte Domäne zur Liste hinzu und klicken Sie auf **Hinzufügen** dann **Speichern**. Ihre Website kann innerhalb weniger Minuten über Ihre benutzerdefinierte Domäne zugegriffen werden.

:::tip
Wenn Sie die Einstellungsoption nicht sehen, bitten Sie die Person, die Ihr Kirchenkonto eingerichtet hat, Ihnen die Berechtigung "Kircheneinstellungen bearbeiten" zu gewähren. Siehe [Rollen & Berechtigungen](../settings/roles-permissions.md) für Details.
:::

## Erstellen Ihrer ersten Seite

1. Klicken Sie in B1 Admin auf **Website** im linken Menü, um die Ansicht "Website-Seiten" zu öffnen.
2. Klicken Sie auf **Seite hinzufügen** in der oberen rechten Ecke.
3. Wählen Sie **Leer** als Seitentyp und nennen Sie ihn "Startseite".
4. Klicken Sie auf **Seiteneinstellungen** und stellen Sie den URL-Pfad auf `/` (ein Schrägstrich ohne Text) für Ihre Startseite ein. Andere Seiten verwenden `/page-name`.
5. Klicken Sie auf **Inhalt bearbeiten**, um mit dem Erstellen zu beginnen. Jede Seite muss mit einem **Abschnitt** beginnen -- dies ist der Container für alle anderen Elemente.
6. Klicken Sie nach dem Hinzufügen eines Abschnitts erneut auf **Inhalt hinzufügen**, um Text, Bilder, Videos, Karten, Formulare und mehr einzufügen, indem Sie sie in Ihren Abschnitt ziehen.

:::info
Für detaillierte Anweisungen zum Arbeiten mit Seiten und Navigation siehe [Seiten verwalten](managing-pages). Für einen vollständigen Leitfaden zum visuellen Editor siehe [Verwendung des Seiten-Editors](page-editor).
:::

## Konfigurieren des Website-Erscheinungsbildes

1. Klicken Sie aus der Ansicht "Website-Seiten" auf die Registerkarte **Erscheinungsbild**.
2. Verwenden Sie die **Farbpalette**, um Ihre Markenfarben für Primär-, Sekundär- und Akzent-Töne einzustellen.
3. Wählen Sie unter **Typographie-Einstellungen** Ihre Überschriften- und Body-Schriftarten aus dem Schrift-Browser.
4. Laden Sie Ihr Kirchenlogo unter **Logo** in den Stil-Einstellungen hoch. Geben Sie sowohl ein helles Hintergrund- als auch eine Dunkelversion an.
5. Konfigurieren Sie Ihren **Website-Fußzeile** mit den Kontaktinformationen und Links Ihrer Kirche.

:::info
Änderungen, die Sie in "Erscheinungsbild" vornehmen, gelten für Ihre gesamte Website. Siehe die [Erscheinungsbild](appearance)-Seite für detaillierte Anweisungen zu jeder Einstellung.
:::

## Einrichten der Navigation

Ihre Navigationslinks werden in der Ansicht "Website-Seiten" angezeigt. Um sie zu organisieren:

1. Klicken Sie auf **Hinzufügen**, um einen neuen Navigationslink zu erstellen und zu einer Ihrer Seiten zu verweisen.
2. Ziehen und legen Sie Links ab, um sie neu zu ordnen oder sie unter übergeordneten Elementen zu verschachteln.
3. Zeigen Sie Ihre Website an einer Vorschau in der Vorschau an, um zu bestätigen, dass die Navigation richtig aussieht.

## Nächste Schritte

- [Seiten verwalten](managing-pages) -- Erfahren Sie, wie Sie detailliert mit Seiten und Navigation arbeiten
- [Erscheinungsbild](appearance) -- Passen Sie die Farben, Schriftarten und Layout Ihrer Website an
- [Dateien](files) -- Laden Sie Bilder und Dokumente für Ihre Website hoch
