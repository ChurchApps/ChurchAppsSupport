---
title: "Mobile App Settings"
---

# Mobile App Settings

<div class="article-intro">

Die Seite Mobile App Settings ermöglicht es Ihnen, die Navigationsreiter zu konfigurieren, die in der **B1.church-Mobile-Erfahrung (PWA)** für Ihre Kirchenmitglieder angezeigt werden. Sie kontrollieren, welche Reiter sichtbar sind, worauf sie verweisen und wie sie angezeigt werden.

</div>

:::info Die native B1 Mobile-App ist veraltet
Die hier konfigurierten Reiter werden über die [B1.church Progressive Web App (PWA)](/docs/b1-church/getting-started/installing-pwa) bereitgestellt, die die native B1 Mobile-App ersetzt hat. Teilen Sie die Installationsseite Ihrer Kirche – `https://yourchurchname.b1.church/mobile/install` – mit Mitgliedern; sie führt sie durch die Installation der App auf ihrem Gerät, ohne dass ein Download im App Store oder Google Play erforderlich ist.
:::

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Sie benötigen die Berechtigung "Edit Church Settings". Siehe [Rollen & Berechtigungen](./roles-permissions.md), wenn Sie keinen Zugriff haben.
- Konfigurieren Sie zunächst Ihre [Church Settings](./church-settings.md), einschließlich Ihres Kirchennamens und des Brandings

</div>

## Zugriff auf Navigationseinstellungen

1. Öffnen Sie in B1 Admin das [Jump-Menü](../introduction.md#getting-around-with-the-jump-menu) (die Suchleiste oben links) und erweitern Sie **Mobile**.
2. Klicken Sie auf **Navigation** (`/mobile/navigation`).
3. Die Navigationsseite zeigt Ihre aktuellen App-Reiter an.

## Hinzufügen einer neuen Registerkarte

1. Klicken Sie auf die Schaltfläche **Add Tab** oben auf der Seite.
2. Füllen Sie die Tab-Details aus:
   - **Name** -- Das Label, das auf dem Reiter angezeigt wird (z. B. "Sermons" oder "Give").
   - **Icon** -- Klicken Sie auf den Icon-Selector, um ein Icon für Ihren Reiter zu wählen. Sie können auch ein benutzerdefiniertes Bild hochladen.
   - **Tab Type** -- Wählen Sie aus Optionen wie Bible, Live Stream, Donation, Website usw.
   - **URL** -- Geben Sie die Web-Adresse ein, auf die der Reiter verweisen soll.
   - **Visibility** -- Steuern Sie, wer diesen Reiter sehen kann (jeder, nur Mitglieder usw.).
3. Klicken Sie auf **Save Tab**, um ihn zu Ihrer App hinzuzufügen.

## Bearbeitung eines vorhandenen Reiters

1. Klicken Sie auf einen vorhandenen Reiter in der Liste **App Tabs**.
2. Aktualisieren Sie den Namen, das Symbol, die URL, den Typ oder die Sichtbarkeitseinstellungen des Reiters.
3. Klicken Sie auf **Save Tab**, um Ihre Änderungen anzuwenden.

## Neuanordnung von Reitern

Sie können die Reihenfolge ändern, in der die Reiter in der mobilen App angezeigt werden. Ziehen Sie Reiter in der Liste per Drag-and-Drop, um sie neu anzuordnen. Die auf dieser Seite angezeigte Reihenfolge entspricht der Reihenfolge, die Ihre Mitglieder in der App sehen.

:::info
Einige Reiter können automatisch angezeigt werden, wenn bestimmte Bedingungen erfüllt sind – zum Beispiel kann ein Live Stream-Reiter angezeigt werden, wenn ein Stream aktiv ist. Manuell hinzugefügte Reiter geben Ihnen jederzeit volle Kontrolle über das, was Ihre Mitglieder sehen.
:::

:::tip
Halten Sie die Anzahl der Reiter beherrschbar. Drei bis fünf Reiter funktionieren für die meisten Kirchen gut. Zu viele Reiter können die Navigation für Ihre Mitglieder verwirrend machen.
:::

## Mitgliederverzeichnis & Messaging-Einstellungen

Der Eintrag **Member portal** im gleichen Mobile-Abschnitt enthält die Einstellungen, die das Mitgliederverzeichnis und Private Messaging in der B1.church-Erfahrung steuern:

- **Directory Approval Group** -- Die Gruppe, die Mitgliederverzeichnis-Updates überprüft und [Account-Löschanfragen](../profile/account-deletion.md) übernimmt, bevor sie wirksam werden.
- **Show in Directory** -- Wer im Mitgliederverzeichnis erscheinen kann (nur Personal bis zu jedem).
- **Visibility Preference** -- Legt den Kirchenstandard für Mitglieder fest, die ihre eigene Einstellung noch nicht gewählt haben. **Address**, **Phone Number** und **Email** haben jeweils ihre eigene Dropdown-Liste, mit denselben fünf Ebenen überall dort, wo die Sichtbarkeit konfiguriert ist:
  - **Everyone** -- sichtbar für jeden, einschließlich anonymer Besucher
  - **Members** -- sichtbar nur für Personen mit einem Mitglieds- oder Personaldatensatz
  - **Groups Only** -- sichtbar nur für Personen, die eine Gruppe mit dieser Person teilen
  - **My Group Leaders and Staff** -- sichtbar nur für Anführer einer Gruppe, zu der diese Person gehört, plus Personal
  - **Staff Only** -- sichtbar nur für Personal mit der Berechtigung People > View und für die Person selbst

  Mitglieder können diese Standards für ihren eigenen Datensatz von der **Privacy**-Registerkarte ihres Profils im B1.church PWA überschreiben – siehe [Editing Your Profile](/docs/b1-church/getting-started/me-page).
- **Minimum Age for Private Messages** -- Eine Kindersicherheitsmaßnahme. B1 öffnet ein **neues** Messaging-Gespräch mit privaten Nachrichten nicht, wenn eine der Personen unter diesem Alter liegt, basierend auf ihrem Geburtsdatum (Haushaltrolle wird als Fallback verwendet, wenn kein Geburtsdatum in der Datei ist). Personen unter dem Alter bleiben vollständig im Verzeichnis sichtbar – nur das direkte Messaging wird in **beide Richtungen** für alle blockiert, einschließlich Personal. Gruppengespräche und Messaging an die Eltern eines Kindes funktionieren noch. Optionen sind Off, 13, 16 oder 18; der Standard ist **18**. Bestehende Gespräche sind nicht betroffen.

:::tip
Da die Altersüberprüfung auf Geburtsdaten angewiesen ist, stellen Sie sicher, dass Geburtsdaten für Kinder in Ihrer Gemeinde eingetragen sind. Diese Einstellung gehört zu der gleichen Familie der Kindersicherheit wie die [Check-in-Sicherheitskontrollen](../attendance/checkin-safety.md).
:::

### Home Screen Sign-In Prompt

Besucher, die die App-[Home-Screen](/docs/b1-church/getting-started/navigating#home) öffnen, ohne sich anzumelden, sehen eine kurze Aufforderung – standardmäßig, *"Sign in to see your groups, giving, and more."* – neben einer **Sign In**-Schaltfläche. Die **Home screen sign-in prompt** Einstellungen auf der gleichen Member Portal-Seite (`/mobile/b1-mobile`) ermöglichen es Ihnen, die Aufforderung zu ändern:

- **Show sign-in prompt on the app home screen** -- Schalten Sie dies aus, um sowohl die Aufforderung als auch die **Sign In**-Schaltfläche von der Home-Seite zu verbergen. Besucher können sich immer noch vom App-Menü aus anmelden.
- **Sign-in prompt text** -- Ersetzen Sie die Standardformulierung mit Ihrer eigenen Nachricht (bis zu 150 Zeichen). Lassen Sie es leer, um die Standard zu verwenden. Dieses Feld ist deaktiviert, während die Aufforderung ausgeschaltet ist.

Klicken Sie auf **Save**, um zu übernehmen. Das Speichern aktualisiert die zwischengespeicherten Einstellungen der App, daher wird die Änderung beim nächsten Laden der Home-Seite angezeigt.

## Wo diese Reiter angezeigt werden

Die Reiter, die Sie hier konfigurieren, werden im **B1.church PWA** angezeigt, das Ihre Mitglieder von jeder Seite in `https://yourchurchname.b1.church` installieren. Änderungen, die Sie auf dieser Seite vornehmen, werden widergespiegelt, wenn ein Mitglied die App das nächste Mal öffnet. (Reiter werden auch von der veralteten [B1 Mobile native app](/docs/b1-mobile/) für alle Mitglieder, die sie noch ausführen, gerendert, aber diese App ist veraltet und wird nicht mehr aktualisiert.)

## Nächste Schritte

- [Church Settings](./church-settings.md) -- Konfigurieren Sie Ihre Kircheninformationen und das Branding
- [Rollen & Berechtigungen](./roles-permissions.md) -- Verwalten Sie den Zugriff für Ihr Team
