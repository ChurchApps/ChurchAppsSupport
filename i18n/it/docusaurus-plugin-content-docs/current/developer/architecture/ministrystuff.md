---
title: "MinistryStuff (Archiviazione Pagata e SMS)"
---

# MinistryStuff (Archiviazione Pagata e SMS)

<div class="article-intro">

MinistryStuff.org è il servizio pagato separato che finanzia le due cose che ChurchApps non può regalare — archiviazione di file in blocco (1TB+) e crediti SMS — come abbonamenti fissi mensili. ChurchApps stesso rimane 100% gratuito; niente in B1 richiede un abbonamento MinistryStuff e ogni punto di integrazione è un seam di fornitore che una terza parte potrebbe anche implementare.

</div>

## Componenti

| Parte | Repository | Ruolo |
|---|---|---|
| MinistryStuffApi | `MinistryStuffApi/` | Fatturazione (Stripe), invio SMS + ledger di crediti (AWS), archiviazione (S3 + contabilità di quota). Database MySQL unico `ministrystuff`. |
| MinistryStuffWeb | `MinistryStuffWeb/` | ministrystuff.org — marketing, prezzi e portale account. |
| Provider di SMS | `Packages/texting` → `MinistryStuffProvider` | Registrato come `ministrystuff`. |
| Seam di archiviazione | `Packages/apihelper` → `IStorageProvider` / `StorageProviderFactory` | Provider di archiviazione predefinito e configurabile. |
| Wiring Api | `Api/` | `MinistryStuffStorageProvider` + `StorageResolver` e `TextingConfigHelper` service-key injection. |

## Identità e Fiducia

- Stessi account, stesse chiese: MinistryStuffApi verifica i JWT di ChurchApps con il `JWT_SECRET` condiviso.
- Server-to-server: header `X-Service-Key` (`MINISTRYSTUFF_SERVICE_KEY`, entrambi i lati) + `churchId` esplicito.
