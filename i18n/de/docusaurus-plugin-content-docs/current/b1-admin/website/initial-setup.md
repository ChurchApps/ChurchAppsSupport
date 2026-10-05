---
title: "Initiale Einrichtung"
---

# Initiale Einrichtung

<div class="article-intro">

Jedes B1-Konto kommt mit einer sofort einsatzbereiten Website. Dieser Leitfaden führt Sie durch die Einrichtung Ihrer Kirchendomäne, die Konfiguration des Website-Designs, das Erstellen Ihrer ersten Seiten und das Organisieren Ihrer Navigation.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Sie benötigen ein B1.church-Konto mit Administratorzugriff
- Wenn Sie eine benutzerdefinierte Domäne verwenden, halten Sie Ihre DNS-Anbieter-Anmeldedaten bereit (z. B. GoDaddy, Cloudflare oder AWS)
- Bereiten Sie Ihr Kirchenlogo im PNG-Format mit transparentem Hintergrund vor, um beste Ergebnisse zu erhalten

</div>

## Einrichtung Ihrer Domäne

Ihre Kirche erhält automatisch eine Subdomäne auf B1.church (zum Beispiel `yourchurch.b1.church`). Sie können auch Ihre eigene benutzerdefinierte Domäne auf Ihre B1-Website verweisen.

1. Gehen Sie zu **B1.church Admin**, indem Sie admin.b1.church besuchen oder Ihr Profilmenü öffnen und **Switch App** wählen.
2. Öffnen Sie das [Jump-Menü](../introduction.md#getting-around-with-the-jump-menu) (die Suchleiste oben links), erweitern Sie **Settings** und klicken Sie auf **Settings**.
3. Öffnen Sie den Abschnitt **Church Information**, um Ihre Subdomäne anzuzeigen. Legen Sie sie auf etwas Kurzes und Erkennbares ohne Leerzeichen fest.
4. Um eine benutzerdefinierte Domäne zu verwenden, melden Sie sich bei Ihrem DNS-Anbieter an (z. B. GoDaddy, Cloudflare oder AWS) und fügen Sie zwei Einträge hinzu:
   - Einen **A record** für Ihre Root-Domäne mit Verweis auf `3.23.251.61`
   - Einen **CNAME record** für `www` mit Verweis auf `proxy.b1.church`
5. Kehren Sie zu B1.church Admin zurück, fügen Sie Ihre benutzerdefinierte Domäne zur Liste hinzu und klicken Sie auf **Add** und dann **Save**. Ihre Website ist in wenigen Minuten über Ihre benutzerdefinierte Domäne erreichbar.

:::tip
Wenn Sie die Settings-Option nicht sehen, bitten Sie die Person, die Ihr Kirchenkonto eingerichtet hat, Ihnen die Berechtigung "Edit Church Settings" zu erteilen. Siehe [Roles & Permissions](../settings/roles-permissions.md) für Details.
:::

## Erstellen Ihrer ersten Seite

1. Öffnen Sie in B1 Admin das [Jump-Menü](../introduction.md#getting-around-with-the-jump-menu) (die Suchleiste oben links), erweitern Sie **Website** und klicken Sie auf **Pages**.
2. Klicken Sie auf **Add Page** in der oberen rechten Ecke.
3. Wählen Sie **Blank** als Seitentyp und benennen Sie es "Home".
4. Klicken Sie auf **Page Settings** und legen Sie den URL-Pfad auf `/` (ein Schrägstrich ohne Text) für Ihre Startseite fest. Andere Seiten verwenden `/page-name`.
5. Klicken Sie auf **Edit Content**, um mit dem Erstellen zu beginnen. Jede Seite muss mit einem **Section** beginnen -- dies ist der Container für alle anderen Elemente.
6. Nachdem Sie einen Abschnitt hinzugefügt haben, klicken Sie erneut auf **Add Content**, um Text, Bilder, Videos, Karten, Formulare und mehr hinzuzufügen, indem Sie sie in Ihren Abschnitt ziehen.

:::info
Ausführliche Anweisungen zum Arbeiten mit Seiten und Navigation finden Sie unter [Managing Pages](managing-pages). Eine vollständige Anleitung zum visuellen Editor finden Sie unter [Using the Page Editor](page-editor).
:::

## Konfigurieren des Website-Designs

1. Wählen Sie im Jump-Menü **Website > Appearance**.
2. Verwenden Sie die **Color Palette**, um Ihre Markenfarben für primäre, sekundäre und Akzentfarben festzulegen.
3. Unter **Typography Settings** wählen Sie Ihre Überschriften- und Textkörperfonts aus dem Schriftartenbrowser.
4. Laden Sie Ihr Kirchenlogo unter **Logo** in den Style Settings hoch. Geben Sie sowohl eine Hell- als auch eine Dunkelversion an.
5. Konfigurieren Sie Ihren **Site Footer** mit den Kontaktinformationen und Links Ihrer Kirche.

:::info
Änderungen, die Sie in Appearance vornehmen, gelten für Ihre gesamte Website. Siehe die [Appearance](appearance)-Seite für ausführliche Anweisungen zu jeder Einstellung.
:::

## Einrichtung der Navigation

Ihre Navigations-Links werden in der Website Pages-Ansicht angezeigt. Um sie zu organisieren:

1. Klicken Sie auf **Add**, um einen neuen Navigations-Link zu erstellen und ihn auf eine Ihrer Seiten zu verweisen.
2. Ziehen Sie Links per Drag & Drop, um sie neu zu ordnen oder unter übergeordneten Elementen zu verschachteln.
3. Zeigen Sie eine Vorschau Ihrer Website an, um zu bestätigen, dass die Navigation korrekt aussieht.

## Nächste Schritte

- [Managing Pages](managing-pages) -- Erfahren Sie, wie Sie im Detail mit Seiten und Navigation arbeiten
- [Appearance](appearance) -- Optimieren Sie die Farben, Schriftarten und das Layout Ihrer Website
- [Files](files) -- Laden Sie Bilder und Dokumente für Ihre Website hoch
