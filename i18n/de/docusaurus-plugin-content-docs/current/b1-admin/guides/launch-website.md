---
title: "Anleitung: Ihre Kirchenwebsite starten"
description: "Richten Sie in B1 Admin eine Kirchenwebsite ein: Startseite aufbauen, Farben und Logo abstimmen, wichtige Seiten hinzufügen, eine eigene Domain verbinden und Formulare für Spenden hinzufügen."
---

# Ihre Kirchenwebsite starten

<div class="article-intro">

B1.church enthält einen vollständigen Website-Baukasten ohne Mehrkosten. Diese Anleitung führt Sie durch die Erstellung Ihrer Kirchenwebsite von Grund auf: Einrichtung der Startseite, Gestaltung von Aussehen und Stil, Hinzufügen wichtiger Seiten und optional die Anbindung von Formularen für Online-Spenden und Veranstaltungsanmeldungen.

</div>

## Schulungsvideo {#training-video}

<YouTube id="aA4UahZpmXg" title="Ihre Kirchenwebsite in B1 starten" next="Seiten und Navigation in B1 bearbeiten" nextUrl="/docs/b1-admin/website/page-editor" />

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Halten Sie das Logo Ihrer Kirche bereit (PNG mit transparentem Hintergrund funktioniert am besten)
- Wählen Sie 2–3 Markenfarben für Ihre Website
- Wenn Sie eine eigene Domain verwenden (z. B. yourchurch.com), benötigen Sie Zugriff auf Ihren DNS-Anbieter (GoDaddy, Cloudflare usw.)
- Wenn Sie auf Ihrer Website Online-Spenden anbieten möchten, schließen Sie zuerst die [Einrichtung der Online-Spenden](../donations/online-giving-setup.md) (Stripe) ab

</div>

## Schritt 1: Die Website einrichten {#step-1-initial-website-setup}

Beginnen Sie mit der Erstellung Ihrer Startseite und der grundlegenden Struktur Ihrer Website.

Folgen Sie der Anleitung [Ersteinrichtung der Website](../website/initial-setup.md), um:

1. im [Sprungmenü](../introduction.md#getting-around-with-the-jump-menu) **Website > Seiten** zu wählen
2. auf **Seite hinzufügen** zu klicken, **Leer** zu wählen, „Startseite“ als **Seitentitel** einzugeben und auf **Speichern** zu klicken. Setzen Sie unter **Seiteneinstellungen** den **URL-Pfad** auf `/`
3. auf **Inhalt bearbeiten** zu klicken, einen **Abschnitt** hinzuzufügen und dann Ihren Hauptbereich, Ihre Willkommensnachricht, den Namen und den Leitsatz Ihrer Kirche sowie weitere wichtige Informationen einzufügen

:::tip
Beginnen Sie von vorn? Eine [Website-Vorlage](../website/managing-pages.md#starting-from-a-site-template) legt eine Reihe fertiger Seiten an (Startseite, Über uns, Kontakt, Geben und weitere) mit bereits verknüpfter Navigation – ersetzen Sie die Platzhalterinhalte durch Ihre eigenen.
:::

## Schritt 2: Das Erscheinungsbild konfigurieren {#step-2-configure-appearance}

Legen Sie die visuelle Identität Ihrer Website fest – Farben, Schriften, Logo und Fußzeile.

Folgen Sie der Anleitung [Erscheinungsbild](../website/appearance.md), um:

1. im Sprungmenü **Website > Erscheinungsbild** zu wählen
2. unter **Logo** ein **Logo für helle Hintergründe** und ein **Logo für dunkle Hintergründe** hochzuladen
3. unter **Farbpalette** Ihre Markenfarben festzulegen und auf **Palette speichern** zu klicken, danach Ihre **Schriften** auszuwählen
4. mit **Navigation** die Navigationsleiste zu gestalten und mit **Website-Fußzeile** die Fußzeile zu erstellen, die auf jeder Seite erscheint

:::tip
Halten Sie Ihre Farbpalette schlicht – meist reichen eine Hauptfarbe und eine Akzentfarbe. Den Rest erledigt der Website-Baukasten.
:::

## Schritt 3: Inhaltsseiten hinzufügen {#step-3-add-content-pages}

Erstellen Sie die Seiten, die Besucherinnen und Besucher am meisten brauchen.

Folgen Sie der Anleitung [Seiten verwalten](../website/managing-pages.md), um Seiten wie diese zu erstellen:

- **Über uns** – die Geschichte, Überzeugungen und Leitung Ihrer Kirche
- **Predigten** – Verlinkung zu Ihrem [Predigtarchiv](../sermons/managing-sermons.md)
- **Veranstaltungen** – kommende Veranstaltungen und Anmeldung
- **Geben** – Seite für Online-Spenden (erfordert die [Stripe-Einrichtung](../donations/online-giving-setup.md))
- **Kontakt** – Standort, Gottesdienstzeiten und Kontaktdaten

## Schritt 4: Ihre Domain verbinden {#step-4-connect-your-domain}

Wenn Sie Ihren eigenen Domainnamen (etwa yourchurch.com) statt der Standard-B1-Adresse verwenden möchten:

Folgen Sie der Anleitung [Eigene Domain](../settings/custom-domain.md), um:

1. bei Ihrem Domainanbieter einen **CNAME**-Eintrag für `www` anzulegen, der auf `proxy.b1.church` zeigt (oder einen **A**-Eintrag für Ihre Hauptdomain, der auf `3.23.251.61` zeigt)
2. im Sprungmenü **Einstellungen > Einstellungen** zu wählen, im Bereich **Domains** auf **Bearbeiten** zu klicken, Ihre Domain einzugeben und auf **Speichern** zu klicken

:::info
Richten Sie zuerst das DNS ein: B1 speichert die Domain sofort, lädt Ihre Website aber (und holt das SSL-Zertifikat) erst, wenn das DNS auf B1 zeigt. DNS-Änderungen können wenige Minuten bis einige Stunden dauern. Die Standard-B1-Adresse funktioniert in dieser Zeit durchgehend weiter.
:::

## Schritt 5: Spenden und Formulare hinzufügen {#step-5-add-giving-and-forms}

Ergänzen Sie Ihre Website um interaktive Elemente:

- **Online-Spenden** – Fügen Sie ein Element **Spende** hinzu, damit Mitglieder direkt über Ihre Website spenden können. Stripe konfigurieren Sie zuvor unter [Einrichtung der Online-Spenden](../donations/online-giving-setup.md).
- **Anmeldeformulare** – Betten Sie [eigenständige Formulare](../forms/creating-forms.md) für Veranstaltungsanmeldungen, Besucherkarten oder Anträge für Ehrenamtliche mit dem Element **Formular** ein. Wie Sie Elemente zu jeder Seite hinzufügen, erfahren Sie im [Seiteneditor](../website/page-editor.md).

## Fertig! {#youre-done}

Ihre Kirchenwebsite ist online. Teilen Sie die Adresse mit Ihrer Gemeinde und in den sozialen Medien. Sie können Inhalte aktualisieren, neue Seiten hinzufügen und das Erscheinungsbild jederzeit über den Bereich **Website** in B1 Admin anpassen.

## Verwandte Artikel {#related-articles}

- [Ersteinrichtung der Website](../website/initial-setup.md) – ausführliche Anleitung zur Einrichtung
- [Seiten verwalten](../website/managing-pages.md) – Seiten hinzufügen und bearbeiten
- [Erscheinungsbild](../website/appearance.md) – Farben, Logo und Layout
- [Seiteneditor](../website/page-editor.md) – Abschnitte, Text, Bilder, Formulare und Spenden hinzufügen
- [Eigene Domain](../settings/custom-domain.md) – eigene Webadresse verwenden
- [Dateien verwalten](../website/files.md) – Bilder und Dokumente hochladen
- [Einrichtung der Online-Spenden](../donations/online-giving-setup.md) – Stripe konfigurieren
- [Formulare erstellen](../forms/creating-forms.md) – Anmelde- und Umfrageformulare erstellen
