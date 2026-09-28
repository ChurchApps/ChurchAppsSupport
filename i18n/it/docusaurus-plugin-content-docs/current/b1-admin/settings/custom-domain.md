---
title: "Dominio personalizzato"
---

# Dominio personalizzato

<div class="article-intro">

Puoi puntare il tuo dominio (ad esempio, **www.tuachiesa.org**) al tuo sito B1 in modo che i visitatori lo raggiungano all'indirizzo Web reale della tua chiesa invece dell'indirizzo predefinito tuachiesa.1.church.

</div>

## Passaggio 1 -- Aggiungi il record DNS per primo

Prima di aggiungere il tuo dominio in B1, devi puntarlo ai server B1 dal tuo registrar di dominio (GoDaddy, Namecheap, Cloudflare, ecc.).

Aggiungi uno di questi record -- CNAME è preferito:

| Tipo | Host | Valore |
|------|------|-------|
| CNAME | `www` | `proxy.b1.church` |
| A | `tuachiesa.org` | `3.23.251.61` |

Utilizza **CNAME** per il tuo indirizzo `www`. Utilizza il **record A** se il tuo registrar non supporta CNAME su un dominio root/apex (senza www), o se vuoi che il dominio root funzioni anche.

Le modifiche DNS possono richiedere da alcuni minuti a poche ore per avere effetto.

## Passaggio 2 -- Aggiungi il dominio in B1

Una volta che il DNS punta a B1:

1. Vai a **Impostazioni** in B1 Admin.
2. Fai clic su **Domini**.
3. Digita il tuo dominio nel campo e fai clic su **Salva**.

B1 gestisce SSL automaticamente -- non è necessario acquistare un certificato.

:::warning
Se aggiungi il dominio in B1 prima che i tuoi record DNS siano in posizione, non verrà salvato. Configura sempre il DNS per primo.
:::

## Verifica se funziona

Dopo aver salvato, visita il tuo dominio in un browser. Se carica il tuo sito B1, hai finito. Se vedi un errore, il DNS potrebbe ancora essere in propagazione -- attendi alcuni minuti e riprova.

Puoi anche controllare la propagazione DNS su [dnschecker.org](https://dnschecker.org) -- cerca il tuo dominio e cerca il tuo record CNAME o A.
