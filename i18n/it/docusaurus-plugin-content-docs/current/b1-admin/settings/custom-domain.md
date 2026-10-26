---
title: "Dominio personalizzato"
---

# Dominio personalizzato

<div class="article-intro">

Puoi puntare un tuo dominio (ad esempio, **`www.tuachiesa.org`**) al tuo sito B1 così i visitatori raggiungono il sito all'indirizzo web reale della chiesa invece che all'indirizzo predefinito tuachiesa.b1.church.

</div>

## Passo 1 — Aggiungi prima il record DNS

Prima di aggiungere il tuo dominio in B1, devi puntarlo ai server di B1 presso il tuo registrar di domini (GoDaddy, Namecheap, Cloudflare, ecc.).

Aggiungi uno di questi record — il CNAME è preferibile:

| Tipo | Host | Valore |
|------|------|-----------------------|
| CNAME | `www` | `proxy.b1.church` |
| A | `tuachiesa.org` | `3.23.251.61` |

Usa il **CNAME** per l'indirizzo `www`. Usa il **record A** se il tuo registrar non supporta il CNAME sul dominio radice (senza www), oppure se vuoi che anche il dominio radice funzioni.

Le modifiche DNS possono richiedere da pochi minuti a qualche ora per avere effetto.

## Passo 2 — Aggiungi il dominio in B1

Una volta che il DNS punta a B1:

1. Vai su **Impostazioni** in B1 Admin.
2. Fai clic su **Domini** nell'elenco a sinistra, poi fai clic su **Modifica** nella sezione **Domini**.
3. Digita il tuo dominio nel campo e fai clic su **Salva**.

Non serve fare clic prima sul pulsante **+** — un dominio lasciato scritto nel campo viene aggiunto al salvataggio. Usa **+** (o premi **Invio**) quando vuoi aggiungere più domini all'elenco prima di salvare.

B1 gestisce automaticamente l'SSL — non serve acquistare alcun certificato.

:::warning
Se aggiungi il dominio in B1 prima che i record DNS siano al loro posto, non verrà salvato. Configura sempre prima il DNS.
:::

## Verificare che funzioni

Dopo il salvataggio, visita il tuo dominio in un browser. Se carica il tuo sito B1, hai finito. Se vedi un errore, il DNS potrebbe essere ancora in propagazione — attendi qualche minuto e riprova.

Puoi anche controllare la propagazione DNS su [dnschecker.org](https://dnschecker.org) — cerca il tuo dominio e verifica che il tuo record CNAME o A risulti presente.
