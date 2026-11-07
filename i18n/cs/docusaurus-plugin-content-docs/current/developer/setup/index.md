---
title: "Nastavení"
---

# Nastavení

<div class="article-intro">

Tato sekce vás provede nastavením místního vývojového prostředí pro projekty ChurchApps. Můžete buď nasměrovat frontend na sdílená demo API pro rychlý vývoj, nebo spustit celý systém lokálně pro práci na backendu.

</div>

## Dva přístupy

Existují dva způsoby místního vývoje, v závislosti na tom, kolik částí systému potřebujete:

### 1. Připojení k demo API (nejjednodušší)

Pokud pracujete na **frontendovém projektu** (webová aplikace, mobilní aplikace nebo desktopová aplikace), nejrychlejší cestou je nasměrovat lokální aplikaci na sdílená demo API. Není potřeba žádná databáze ani nastavení backendu.

Základní URL demo API je:

```
https://api.demo.churchapps.org
```

Každý modul API je dostupný na cestě pod tímto základem, například:

```
https://api.demo.churchapps.org/membership
https://api.demo.churchapps.org/attendance
https://api.demo.churchapps.org/giving
```

Demo prostředí běží na nejnovějším kódu z větve `main` a jeho ukázková data se každou noc obnovují, takže neočekávejte, že cokoli, co tam vytvoříte, vydrží. (Dřívější testovací prostředí `api.staging.churchapps.org` bylo vyřazeno. Některé ukázkové soubory `.env` mohou stále obsahovat URL testovacího prostředí -- nahraďte je URL demo nebo lokálního prostředí.)

:::tip
Tento přístup vám umožní začít provádět změny ve frontendu během několika minut. Je doporučenou cestou pro většinu přispěvatelů.
:::

### 2. Spuštění všeho lokálně

Pokud potřebujete upravovat kód API nebo pracovat offline, můžete spustit celý systém lokálně. To vyžaduje MySQL 8.0+ a další konfiguraci. Podrobné pokyny najdete v průvodci [místní nastavení API](../api/local-setup).

## Začínáme

Postupujte podle těchto stránek v uvedeném pořadí:

1. **[Předpoklady](prerequisites)** -- Instalace potřebných nástrojů (Node.js, Git, MySQL atd.)
2. **[Přehled projektů](project-overview)** -- Seznámení s tím, které projekty existují a co dělají
3. **[Proměnné prostředí](environment-variables)** -- Nastavení souborů `.env`, které propojí všechny části dohromady

:::info
Každý projekt ChurchApps je samostatný Git repozitář. Stačí naklonovat pouze konkrétní projekt nebo projekty, na kterých chcete pracovat.
:::
