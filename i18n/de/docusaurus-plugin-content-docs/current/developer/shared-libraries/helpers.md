---
title: "Helpers"
---

# Helpers

<div class="article-intro">

Das `@churchapps/helpers`-Package bietet Basis-Utilities, die von allen ChurchApps-Projekten genutzt werden, sowohl Frontend als auch Backend. Es ist Framework-agnostisch und enthält allgemeine Helfer wie `DateHelper`, `ApiHelper`, `CurrencyHelper` und andere gemeinsame Utilities.

</div>

<div class="prereqs">
<h4>Vor dem Start</h4>

- Installieren Sie **Node.js** und **Git** — siehe [Voraussetzungen](../setup/prerequisites)
- Machen Sie sich mit dem [`npm link`-Workflow](./index.md) für lokale Entwicklung vertraut

</div>

## Setup für lokale Entwicklung

1. Repository klonen:

   ```bash
   git clone https://github.com/ChurchApps/Helpers.git
   ```

2. Abhängigkeiten installieren:

   ```bash
   cd Helpers && npm install
   ```

3. Package bauen (kompiliert TypeScript zu `dist/`):

   ```bash
   npm run build
   ```

4. Verfügbar machen für lokales Linking:

   ```bash
   npm link
   ```

Sie können es dann in ein beliebiges konsumierendes Projekt verlinken:

```bash
cd ../YourProject && npm link @churchapps/helpers
```

## Veröffentlichung

Um eine neue Version zu npm zu veröffentlichen:

1. Version in `package.json` aktualisieren
2. Veröffentlichen:

   ```bash
   npm publish --access=public
   ```

:::warning
Da dieses Package von jedem ChurchApps-Projekt genutzt wird, haben Änderungen hier eine breite Auswirkung. Testen Sie gründlich mit `npm link` in mindestens einer konsumierenden API und einer konsumierenden Web-App vor der Veröffentlichung.
:::

## Verwandte Artikel

- **[ApiHelper](./api-helper)** — Server-seitige Utilities, die dieses Package abhängen
- **[AppHelper](./app-helper)** — React-Komponenten, die dieses Package abhängen
- **[Gemeinsame Biblioteken-Übersicht](./index.md)** — `npm link`-Workflow und Package-Übersicht
