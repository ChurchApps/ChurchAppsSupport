---
title: "Sdílené knihovny"
---

# Sdílené knihovny

<div class="article-intro">

Sdílený kód ChurchApps se publikuje na npm pod oborem `@churchapps/*`. Všechny sdílené balíčky jsou umístěny v jediném repozitáři -- [Packages](https://github.com/ChurchApps/Packages) -- který je spravován jako pracovní prostor Yarn (Berry) a verzován pomocí [changesets](https://github.com/changesets/changesets).

</div>

## Balíčky

| Balíček | Popis | Používá |
|---------|-------|---------|
| [`@churchapps/helpers`](./helpers) | Základní vrstva: pomocné funkce nezávislé na frameworku a sdílená rozhraní TypeScript, která tvoří společný datový kontrakt mezi aplikacemi | Všechny projekty |
| [`@churchapps/apihelper`](./api-helper) | Serverové pomocné nástroje pro Express: autentizace, základní kontroléry, přístup k databázi, integrace AWS a e-mailu | Všechna API |
| [`@churchapps/apphelper`](./app-helper) | Sdílené komponenty React a funkční moduly (přihlášení, dary, formuláře, markdown, webové stránky) | Všechny webové aplikace |
| `@churchapps/content-providers` | Abstrakce nad poskytovateli obsahu třetích stran (Lessons.church, Planning Center, Dropbox a další) | Api, B1Admin, B1App, FreePlay |
| `@churchapps/integration-sdk` | Sada nástrojů pro vytváření integrací B1.church: ověřování webhooků, typovaný klient REST, pomocné funkce pro OAuth | Vývojáři externích integrací |
| `@churchapps/texting` | Abstrakce poskytovatelů SMS (Text In Church, Clearstream, Mutual Ministry, MinistryStuff, Nalo Solutions, Twilio) | Api |

Směr závislostí je přísně shora dolů: aplikace závisí na `apihelper` a `apphelper`, které deklarují `@churchapps/helpers` jako **peer dependency**, takže každá aplikace používá přesně jednu kopii tohoto balíčku.

## Nastavení pracovního prostoru

```bash
git clone https://github.com/ChurchApps/Packages.git
cd Packages
yarn install
yarn build
```

Repozitář používá Yarn Berry (autoritativní je pole `packageManager` v kořenovém adresáři) s jediným souborem zámku. Příkaz `yarn build` sestaví všechny balíčky v pořadí podle závislostí; `yarn test` spustí testy všech balíčků.

## Vydávání pomocí Changesets

Každá změna balíčku se vydává spolu s changesetem:

1. Spusťte `yarn changeset` v kořenovém adresáři pracovního prostoru. Vyberte balíček nebo balíčky, kterých se změna týká, typ zvýšení verze (patch = oprava, minor = nový export nebo funkce, major = změna nekompatibilní se staršími verzemi) a napište jednořádkové shrnutí -- to se stane záznamem v CHANGELOGu.
2. Potvrďte vygenerovaný soubor `.changeset/*.md` spolu se svou změnou kódu. Hook pro pre-commit blokuje potvrzení, která mění zdrojový kód balíčku bez připraveného changesetu.
3. Až budete připraveni k publikaci, spusťte v kořenovém adresáři příkaz `yarn publish-all`. Ten zpracuje čekající changesety (zvýší verze, zapíše CHANGELOGy a sladí rozsahy verzí interních závislostí), sestaví vše v pořadí podle závislostí a publikuje zvýšené balíčky na npm. Poté potvrďte a odešlete změny verzí.

:::warning
Nikdy nespouštějte přímý příkaz `npm publish` uvnitř jednotlivého balíčku -- přeskočí se tím pořadí sestavení a evidence verzí, kterou řeší vydávací skript. Publikování vyžaduje účet npm s oprávněním publikovat do oboru `@churchapps`.
:::

## Místní vývoj proti spotřebující aplikaci

Uvnitř pracovního prostoru se balíčky sestavují přímo proti svým sousedům -- žádné propojování není potřeba. Chcete-li otestovat nepublikované sestavení balíčku uvnitř spotřebující aplikace (B1Admin, B1App atd.), přidejte do spotřebitele dočasný portál Yarn:

```bash
# in the consuming project
yarn link ../Packages/helpers
# ... test ...
yarn unlink ../Packages/helpers && yarn install
```

Nejprve sestavte balíček (příkazem `yarn build` v kořenovém adresáři pracovního prostoru) -- spotřebitel čte zkompilovaný výstup v `dist/`, nikoli zdrojový kód.

:::warning
Příkaz `yarn link` zapíše do `package.json` spotřebitele překlad závislosti na portál. Nikdy ho nepotvrzujte -- po dokončení vždy spusťte `yarn unlink` a znovu nainstalujte závislosti.
:::
