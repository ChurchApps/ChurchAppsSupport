---
title: "Dominio personalizzato"
---

# Dominio personalizzato

<div class="article-intro">

Puoi collegare un tuo dominio (ad esempio **`www.tuachiesa.org`**) al tuo sito B1, così i visitatori raggiungono il sito all'indirizzo web reale della chiesa invece che all'indirizzo predefinito tuachiesa.b1.church.

</div>

## Passo 1 — Aggiungi prima il record DNS

Prima di aggiungere il tuo dominio in B1, devi indirizzarlo ai server di B1 presso il tuo registrar di domini (GoDaddy, Namecheap, Cloudflare, ecc.).

Aggiungi uno di questi record — il CNAME è preferibile:

| Tipo | Host | Valore |
|------|------|-------|
| CNAME | `www` | `proxy.b1.church` |
| A | `tuachiesa.org` | `3.23.251.61` |

Usa il **CNAME** per l'indirizzo `www`. Usa il **record A** se il tuo registrar non supporta il CNAME sul dominio principale (senza www), oppure se vuoi che funzioni anche il dominio principale.

Le modifiche DNS possono richiedere da qualche minuto a qualche ora per avere effetto.

## Passo 2 — Aggiungi il dominio in B1

Una volta che il DNS punta a B1:

1. Vai su **Impostazioni** in B1 Admin.
2. Clicca su **Domini** nell'elenco a sinistra, poi clicca su **Modifica** nella sezione **Domini**.
3. Digita il tuo dominio nel campo e clicca su **Salva**.

Non serve cliccare prima sul pulsante **+** -- un dominio lasciato digitato nel campo viene aggiunto al salvataggio. Usa **+** (oppure premi **Invio**) quando vuoi aggiungere più domini all'elenco prima di salvare.

B1 gestisce automaticamente il certificato SSL — non serve acquistare alcun certificato.

:::warning
Se aggiungi il dominio in B1 prima che i record DNS siano in place, il salvataggio non andrà a buon fine. Configura sempre prima il DNS.
:::

## Verificare che funzioni

Dopo il salvataggio, visita il tuo dominio nel browser. Se si carica il tuo sito B1, hai finito. Se vedi un errore, il DNS potrebbe essere ancora in propagazione — attendi qualche minuto e riprova.

Puoi anche verificare la propagazione DNS su [dnschecker.org](https://dnschecker.org) — cerca il tuo dominio e controlla che il tuo record CNAME o A risulti visibile.
