---
title: "Nasazení API"
description: "Nasazení API ChurchApps na AWS Lambda pomocí Serverless: sestavení, workflow demo a produkce, migrace databáze a konfigurace SSM."
---

# Nasazení API

<div class="article-intro">

ChurchApps API se nasazují jako funkce AWS Lambda pomocí Serverless Frameworku. Tato stránka popisuje postup sestavení, nasazení a konfigurace pro demo a produkční prostředí.

</div>

<div class="prereqs">
<h4>Než začnete</h4>

- Nastavte API lokálně – viz [Lokální nastavení API](../api/local-setup.md)
- Nakonfigurujte přihlašovací údaje AWS na svém počítači
- Ujistěte se, že máte přístup k cílovému účtu AWS

</div>

## Sestavení

API se pro produkci sestavují pomocí samostatné konfigurace TypeScriptu:

```bash
npm run build:prod
```

Tento příkaz použije `tsconfig.prod.json` ke kompilaci projektu pro běhové prostředí Lambda.

## Nasazení

Nasazení do demo prostředí:

```bash
npm run deploy-demo
```

Nasazení do produkce:

```bash
npm run deploy-prod
```

V praxi API nasazuje GitHub Actions: **Deploy Demo** se spouští při každém pushi do `main` a **Deploy Prod** se spouští ručně (workflow dispatch). Staging prostředí již neexistuje.

## Migrace databáze

**Deploy Prod** aplikuje čekající migrace databáze jako součást nasazení. Produkční databáze přijímají připojení pouze zevnitř VPC, takže ihned po `serverless deploy` workflow zavolá funkci Lambda `migrate` (`api-Prod-migrate`). Ta spustí čekající migrace všech modulů a vrátí `{ ok, environment, modules }`. Pokud některý modul selže nebo je odmítnut (například databáze bez historie migrací), úloha selže, aby schéma nikdy nezůstalo pozadu za kódem. **Rollback Prod** vrací zpět pouze kód funkcí Lambda; migrace zůstávají aplikované, proto je udržujte aditivní. Informace o kontrole stavu nebo ručním spuštění migrací najdete v článku [Správa serveru -- Migrace databáze](../server-admin.md#database-migrations).

## Co se vytvoří

Každé nasazení API vytvoří nebo aktualizuje následující funkce AWS Lambda:

| Funkce | Účel |
|--------|------|
| `web` | Obsluha HTTP požadavků přes API Gateway |
| `socket` | Obsluha připojení WebSocket |
| `timer15Min` | Naplánovaná úloha spouštěná každých 30 minut (název je historický) |
| `timerMidnight` | Naplánovaná úloha spouštěná denně o půlnoci |
| `migrate` | Aplikuje čekající migrace databáze; volá ji workflow Deploy Prod |

## Konfigurace prostředí

V nasazených prostředích se konfigurace čte z **AWS SSM Parameter Store** namísto souborů `.env`. To udržuje tajné údaje mimo nasazovací balíček a umožňuje měnit konfiguraci bez nového nasazení.

:::warning
Nikdy nevkládejte produkční přihlašovací údaje do repozitáře. Veškerá citlivá konfigurace by měla být uložena v AWS SSM Parameter Store a načítána za běhu.
:::

:::tip
Každé sloučení do `main` nejprve nasadí změny do demo prostředí. Před spuštěním Deploy Prod si změnu ověřte tam (například na [demo.b1.church](https://demo.b1.church)).
:::

## Související články

- **[Lokální nastavení API](../api/local-setup.md)** -- Nastavení API pro vývoj
- **[Struktura modulů](../api/module-structure.md)** -- Pochopení architektury funkcí Lambda
- **[Nasazení webových aplikací](./web-apps.md)** -- Nasazení frontendových aplikací
