---
title: "Implementarea API"
---

# Implementarea API

<div class="article-intro">

API-urile ChurchApps sunt implementate ca funcții AWS Lambda folosind Serverless Framework. Această pagină descrie fluxul de lucru pentru compilare, implementare și configurare pentru mediile demo și de producție.

</div>

<div class="prereqs">
<h4>Înainte de a începe</h4>

- Configurați API-ul local -- consultați [Configurarea locală a API-ului](../api/local-setup)
- Configurați credențialele AWS pe computerul dumneavoastră
- Asigurați-vă că aveți acces la contul AWS țintă

</div>

## Compilare

API-urile se compilează pentru producție folosind o configurație TypeScript dedicată:

```bash
npm run build:prod
```

Această comandă folosește `tsconfig.prod.json` pentru a compila proiectul pentru runtime-ul Lambda.

## Implementare

Implementați în mediul demo:

```bash
npm run deploy-demo
```

Implementați în producție:

```bash
npm run deploy-prod
```

În practică, API-ul este implementat de GitHub Actions: **Deploy Demo** rulează la fiecare push în `main`, iar **Deploy Prod** este pornit manual (workflow dispatch). Nu mai există un mediu de staging.

## Migrări ale bazei de date

**Deploy Prod** aplică migrările de bază de date în așteptare ca parte a implementării. Bazele de date de producție acceptă conexiuni doar din interiorul VPC, așa că imediat după `serverless deploy`, workflow-ul invocă funcția Lambda `migrate` (`api-Prod-migrate`), care rulează migrările în așteptare ale fiecărui modul și returnează `{ ok, environment, modules }`. Dacă un modul eșuează sau este refuzat (de exemplu, o bază de date fără istoric de migrări), jobul eșuează, astfel încât schema să nu rămână în urma codului. **Rollback Prod** revine doar la codul Lambda; migrările rămân aplicate, de aceea păstrați-le aditive. Consultați [Administrarea serverului -- Migrări ale bazei de date](../server-admin#database-migrations) pentru verificarea stării sau rularea manuală a migrărilor.

## Ce se creează

Fiecare implementare a API-ului creează sau actualizează următoarele funcții AWS Lambda:

| Funcție | Scop |
|----------|---------|
| `web` | Gestionarul cererilor HTTP prin API Gateway |
| `socket` | Gestionarul conexiunilor WebSocket |
| `timer15Min` | Sarcină programată care rulează la fiecare 30 de minute (numele este istoric) |
| `timerMidnight` | Sarcină programată care rulează zilnic la miezul nopții |
| `migrate` | Aplică migrările de bază de date în așteptare; invocată de workflow-ul Deploy Prod |

## Configurarea mediului

În mediile implementate, configurația este citită din **AWS SSM Parameter Store**, nu din fișiere `.env`. Acest lucru păstrează secretele în afara pachetului de implementare și permite modificarea configurației fără o nouă implementare.

:::warning
Nu includeți niciodată credențiale de producție în depozitul de cod. Toate configurațiile sensibile trebuie stocate în AWS SSM Parameter Store și accesate în timpul rulării.
:::

:::tip
Fiecare îmbinare în `main` se implementează mai întâi în mediul demo. Verificați modificarea acolo (de exemplu, pe [demo.b1.church](https://demo.b1.church)) înainte de a rula Deploy Prod.
:::

## Articole conexe

- **[Configurarea locală a API-ului](../api/local-setup)** -- Configurarea API-ului pentru dezvoltare
- **[Structura modulelor](../api/module-structure)** -- Înțelegerea arhitecturii funcțiilor Lambda
- **[Implementarea aplicațiilor web](./web-apps)** -- Implementarea aplicațiilor frontend
