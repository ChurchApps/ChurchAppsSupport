---
title: "Routing del Sito Web e Multi-Sito"
---

# Routing del Sito Web e Multi-Sito

<div class="article-intro">

Una singola chiesa può ora servire più di un sito web distinto e ognuno può vivere su un sottodominio `*.b1.church` o su un dominio completamente personalizzato di proprietà della chiesa. Questa pagina mappa il livello di routing che si trova *sotto* il builder: come una richiesta in arrivo si risolve a una chiesa **e** a un sito specifico.

</div>

## Panoramica

Una richiesta arriva al dominio personalizzato di una chiesa, viene risolta da proxy Caddy personalizzato su EC2 al sottodominio `*.b1.church` della chiesa e B1App risolve quel sottodominio a un church + siteId.

La tabella `domains` mappa i domini personalizzati ai subdomini B1. Un dominio salvato in B1Admin diventa instradabile entro ~5 minuti.

## Multi-Sito

Ogni chiesa ha un siteId predefinito (null per compatibilità indietro). Una chiesa può creare siti secondari; ogni sito ha una radice di contenuto separata.

## Routing Personalizzato Dominio

Caddy termina TLS e riscrive il Host in `{sub}.b1.church` per il proxy inverso a B1App tramite Vercel edge.
