---
title: "Distribuzione delle Applicazioni Web"
description: "Come distribuire le web app di ChurchApps, come B1 Admin, su Amazon S3 e CloudFront: deploy automatici con GitHub Actions al merge o comandi manuali."
---

# Distribuzione delle Applicazioni Web

<div class="article-intro">

Le applicazioni web di ChurchApps vengono distribuite come siti statici su **Amazon S3** con **CloudFront** come CDN. Le distribuzioni sono automatizzate tramite GitHub Actions, ma possono anche essere eseguite manualmente quando necessario.

</div>

<div class="prereqs">
<h4>Prima di Iniziare</h4>

- Configura l'applicazione web in locale e verifica che si compili -- vedi [Applicazioni Web](../web-apps/index.md)
- Configura le credenziali AWS con accesso a S3 e CloudFront
- Conosci il nome del bucket S3 di destinazione e l'ID della distribuzione CloudFront

</div>

## Passaggi di Distribuzione

1. **Compila l'app** -- genera l'output statico:

   ```bash
   npm run build
   ```

2. **Sincronizza con S3** -- carica l'output della build nel bucket S3:

   ```bash
   aws s3 sync build/ s3://bucket-name
   ```

3. **Invalida CloudFront** -- svuota la cache del CDN in modo che gli utenti ricevano la versione più recente:

   ```bash
   aws cloudfront create-invalidation --distribution-id YOUR_DIST_ID --paths "/*"
   ```

## Distribuzioni Automatizzate

I workflow di GitHub Actions gestiscono la distribuzione automaticamente al push nel branch `main`. Il workflow esegue tutti e tre i passaggi sopra -- build, sincronizzazione S3 e invalidazione CloudFront -- senza intervento manuale.

:::info
In genere non è necessario eseguire questi comandi manualmente. L'unione di una pull request in `main` attiva la pipeline di distribuzione automatizzata.
:::

:::tip
Se devi verificare una build in locale prima della distribuzione, esegui `npm run build` e ispeziona l'output nella directory `build/`. Puoi servirla localmente con qualsiasi server di file statici per confermare che tutto funzioni.
:::

## Articoli Correlati

- **[Applicazioni Web](../web-apps/index.md)** -- Guide alla configurazione di B1Admin, B1App e LessonsApp
- **[Distribuzione delle API](./apis.md)** -- Distribuzione delle API backend
- **[Distribuzione Mobile](./mobile.md)** -- Distribuzione delle applicazioni mobile negli app store
