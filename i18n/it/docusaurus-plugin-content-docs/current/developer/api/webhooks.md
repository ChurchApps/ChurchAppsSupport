---
title: "Webhook"
---

# Webhook

<div class="article-intro">

I webhook permettono a una chiesa di inviare notifiche in tempo reale a strumenti di terze parti — piattaforme di automazione (Zapier, Make, n8n), CRM, sistemi contabili o qualsiasi cosa che accetti un POST HTTP. Quando una persona, un gruppo o una famiglia cambia in B1, B1 invia un payload JSON firmato a ogni URL sottoscritto a quell'evento.

</div>

<div class="prereqs">
<h4>Prima di Iniziare</h4>

- Un admin di chiesa con il permesso **Edit Church Settings** registra e gestisce i webhook
- L'endpoint di ricezione deve essere raggiungibile su **HTTPS** a un indirizzo pubblico
- Avere un modo per archiviare il segreto di firma in modo sicuro — viene mostrato solo una volta

</div>

## Panoramica

I webhook sono **solo in uscita**: B1 chiama il tuo endpoint, tu non chiami B1. Ogni webhook è una sottoscrizione per chiesa costituita da un URL di destinazione, un segreto di firma e un elenco di eventi sottoscritti.

La consegna utilizza una **posta in uscita durabile**: quando si verifica un evento sottoscritto, B1 registra una riga di consegna e un worker di background POST entro circa un minuto. Le consegne non riuscite vengono riprovate con backoff esponenziale. Niente viene perso se una consegna è lenta o il tuo endpoint è brevemente inattivo.

## Registrazione di un Webhook

### In B1Admin

Vai a **Settings → Developer → Webhooks → New Webhook**. Immetti un nome, l'URL del payload e seleziona gli eventi a cui sottoscriverti. Al salvataggio, il **segreto di firma viene visualizzato una volta** — copialo immediatamente e archivialo con la tua integrazione. Non viene mai più mostrato (puoi ruotarlo in seguito, ma non puoi recuperare l'originale).

### Via l'API

Tutti gli endpoint si trovano sotto il percorso base del modulo Membership `/membership/webhooks` e richiedono un JWT da un admin di chiesa con il permesso `Settings / Edit`, **o una [chiave API](./api-keys) coniata con l'ambito `settings:write`**. Le stesse route accettano entrambi.

## Evento Catalogo

I nomi degli eventi seguono il modello `{entity}.{action}`. I nomi validi includono: `person.created`, `person.updated`, `person.destroyed`, `household.created`, `household.updated`, `household.destroyed`, `group.created`, `group.updated`, `group.destroyed`, `group.member.added`, `group.member.removed`, `donation.created`, `donation.updated`, `attendance.recorded`, `session.created`, `form.submission.created`, `event.created`, `event.updated`, `event.destroyed`.

## Consumo dei Webhook

Ogni webhook viene consegnato come POST HTTP a un URL pubblico fornito dalla chiesa, con una firma HMAC-SHA256 nel header `X-Signature` e il timestamp nel header `X-Signature-Timestamp`.

