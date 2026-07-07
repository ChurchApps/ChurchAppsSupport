---
title: "Helpers"
---

# Helpers

Das Paket `@churchapps/helpers` bietet Basis-Hilfsfunktionen, die von allen ChurchApps-Projekten verwendet werden, sowohl Frontend als auch Backend. Es ist Framework-agnostisch und umfasst gängige Helfer wie `DateHelper`, `ApiHelper`, `CurrencyHelper`, sowie die freigegebenen TypeScript-Schnittstellen, die den Datenvertrag zwischen Apps und APIs bilden.

## Wer nutzt dies

Jede ChurchApps-API (die Kern-Api, AskApi und LessonsApi) und jedes Web-Frontend (B1Admin, B1App, B1Transfer, LessonsApp) hängt direkt von diesem Paket ab. Frontends erhalten auch viele seiner Exporte (über `@churchapps/apphelper` erneut exportiert).

## Lokale Entwicklung

```bash
git clone https://github.com/ChurchApps/Packages.git
cd Packages && yarn install
yarn workspace @churchapps/helpers build
```

Oder führen Sie `yarn build` in der Root aus, um jedes Paket in Abhängigkeitsreihenfolge zu erstellen.

Um Änderungen in einem verbrauchenden Projekt zu testen, verwenden Sie ein temporäres Yarn-Portal.

## Veröffentlichung

Releases verwenden Changesets anstelle von manuellen Versionsbumps. Lesen Sie die Übersicht [Freigegebene Bibliotheken](./index.md) für den vollständigen Fluss.

Neue freigegebene Schnittstellen gehen in `helpers/src/interfaces/` und werden durch die Paket-Barrel erneut exportiert. Der Website-Builder Element-Typ-Katalog (`ElementTypes.ts` -- 35 Typen mit ihren Answer-Schemas) lebt auch hier.

:::warning
Da dieses Paket von jedem ChurchApps-Projekt verwendet wird, haben Änderungen hier eine breite Auswirkung. Testen Sie mit einem Yarn-Portal in mindestens einer verbrauchenden API und einer verbrauchenden Web-App, bevor Sie veröffentlichen.
:::
