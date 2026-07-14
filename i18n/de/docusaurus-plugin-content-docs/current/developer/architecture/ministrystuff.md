---
title: "MinistryStuff (Bezahlte Speicherung & SMS)"
---

# MinistryStuff (Bezahlte Speicherung & SMS)

MinistryStuff.org ist der separate bezahlte Dienst, der die beiden Dinge finanziert, die ChurchApps nicht kostenlos geben kann – Massenspeicherung (1 TB+) und SMS-Guthaben – als Pauschal-Monats-Abos. ChurchApps selbst bleibt 100% kostenlos; nichts in B1 erfordert ein MinistryStuff-Abonnement.

## Komponenten

| Komponente | Repo | Rolle |
|---|---|---|
| MinistryStuffApi | `MinistryStuffApi/` | Abrechnung (Stripe), SMS-Versand + Guthaben-Ledger, Speicherung (S3 + Quota) |
| MinistryStuffWeb | `MinistryStuffWeb/` | Marketing, Preisgestaltung, Konto-Portal |
| Texting-Anbieter | `Packages/texting` | SMS-Versand über MinistryStuff |
| Speicher-Seam | `Packages/apihelper` | `IStorageProvider` / `StorageProviderFactory` |

## Identität & Vertrauen

- **Gleiche Konten, gleiche Kirchen:** MinistryStuffApi verifiziert ChurchApps JWTs mit dem gemeinsamen `JWT_SECRET`
- **Server-zu-Server:** `X-Service-Key` Header + explizite `churchId`
