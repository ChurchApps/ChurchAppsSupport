---
title: "Ersteinrichtung"
---

# Ersteinrichtung

<div class="article-intro">

Jedes B1-Konto wird mit einer sofort einsatzbereiten Website geliefert. Diese Anleitung führt Sie durch die Einrichtung Ihrer Gemeinde-Domain, die Konfiguration des Erscheinungsbilds Ihrer Website, die Erstellung Ihrer ersten Seiten und die Organisation Ihrer Navigation.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Sie benötigen ein B1.church-Konto mit administrativem Zugang
- Falls Sie eine eigene Domain verwenden, halten Sie Ihre DNS-Provider-Zugangsdaten bereit (z. B. GoDaddy, Cloudflare oder AWS)
- Bereiten Sie Ihr Gemeindelogo im PNG-Format mit transparentem Hintergrund für beste Ergebnisse vor

</div>

## Domain einrichten

Ihre Gemeinde erhält automatisch eine Subdomain auf B1.church (zum Beispiel `ihregemeinde.b1.church`). Sie können auch Ihre eigene Domain auf Ihre B1-Website verweisen lassen.

1. Gehen Sie zu **B1.church Admin**, indem Sie admin.b1.church besuchen oder auf Ihr Profil-Dropdown klicken und **App wechseln** wählen.
2. Klicken Sie auf **Dashboard** in der linken Seitenleiste und wählen Sie dann **Einstellungen** aus dem Dropdown-Menü.
3. Klicken Sie auf **Verwalten**, um Ihre Subdomain anzuzeigen. Setzen Sie sie auf etwas Kurzes und Erkennbares ohne Leerzeichen.
4. Um eine eigene Domain zu verwenden, melden Sie sich bei Ihrem DNS-Provider an (zum Beispiel GoDaddy, Cloudflare oder AWS) und fügen Sie zwei Einträge hinzu:
   - Einen **A-Eintrag** für Ihre Root-Domain, der auf `3.23.251.61` zeigt
   - Einen **CNAME-Eintrag** für `www`, der auf `proxy.b1.church` zeigt
5. Kehren Sie zu B1.church Admin zurück, fügen Sie Ihre eigene Domain zur Liste hinzu und klicken Sie auf **Hinzufügen** und dann auf **Speichern**. Ihre Website ist innerhalb weniger Minuten über Ihre eigene Domain erreichbar.

:::tip
Falls Sie die Option Einstellungen nicht sehen, bitten Sie die Person, die Ihr Gemeindekonto eingerichtet hat, Ihnen die Berechtigung "Gemeindeeinstellungen bearbeiten" zu erteilen. Siehe [Rollen & Berechtigungen](../settings/roles-permissions.md) für Details.
:::

## Ihre erste Seite erstellen

1. Klicken Sie in B1 Admin im linken Menü auf **Website**, um die Website-Seitenansicht zu öffnen.
2. Klicken Sie oben rechts auf **Seite hinzufügen**.
3. Wählen Sie **Leer** als Seitentyp und benennen Sie sie "Startseite".
4. Klicken Sie auf **Seiteneinstellungen** und setzen Sie den URL-Pfad auf `/` (ein Schrägstrich ohne Text) für Ihre Startseite. Andere Seiten verwenden `/seitenname`.
5. Klicken Sie auf **Inhalt bearbeiten**, um mit dem Aufbau zu beginnen. Jede Seite muss mit einem **Abschnitt** beginnen -- dies ist der Container für alle anderen Elemente.
6. Nach dem Hinzufügen eines Abschnitts klicken Sie erneut auf **Inhalt hinzufügen**, um Text, Bilder, Videos, Karten, Formulare und mehr einzufügen, indem Sie sie in Ihren Abschnitt ziehen.

:::info
Detaillierte Anleitungen zum Arbeiten mit Seiten, Navigation und Seitentypen finden Sie unter [Seiten verwalten](managing-pages).
:::

## Erscheinungsbild der Website konfigurieren

1. Klicken Sie in der Website-Seitenansicht oben auf den Tab **Erscheinungsbild**.
2. Verwenden Sie die **Farbpalette**, um Ihre Markenfarben für Primär-, Sekundär- und Akzenttöne festzulegen.
3. Wählen Sie unter **Typografie-Einstellungen** Ihre Überschriften- und Fließtext-Schriftarten im Schriftarten-Browser.
4. Laden Sie Ihr Gemeindelogo unter **Logo** in den Stil-Einstellungen hoch. Stellen Sie sowohl eine Version für hellen als auch für dunklen Hintergrund bereit.
5. Konfigurieren Sie Ihre **Website-Fußzeile** mit den Kontaktdaten und Links Ihrer Gemeinde.

:::info
Änderungen, die Sie im Erscheinungsbild vornehmen, gelten für Ihre gesamte Website. Siehe die Seite [Erscheinungsbild](appearance) für detaillierte Anleitungen zu jeder Einstellung.
:::

## Navigation einrichten

Ihre Navigationslinks erscheinen in der linken Seitenleiste der Website-Seitenansicht. So organisieren Sie sie:

1. Klicken Sie auf **Hinzufügen**, um einen neuen Navigationslink zu erstellen und ihn auf eine Ihrer Seiten zu verweisen.
2. Ziehen Sie Links per Drag & Drop, um sie neu zu ordnen oder unter übergeordneten Einträgen zu verschachteln.
3. Sehen Sie sich eine Vorschau Ihrer Website an, um zu bestätigen, dass die Navigation korrekt aussieht.

## Nächste Schritte

- [Seiten verwalten](managing-pages) -- Erfahren Sie im Detail, wie Sie mit Seiten und Navigation arbeiten
- [Erscheinungsbild](appearance) -- Feinabstimmung der Farben, Schriftarten und des Layouts Ihrer Website
- [Dateien](files) -- Laden Sie Bilder und Dokumente für Ihre Website hoch
