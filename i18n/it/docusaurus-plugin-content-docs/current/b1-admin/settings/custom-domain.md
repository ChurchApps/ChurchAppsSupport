---
title: "Dominio personalizzato"
---

# Dominio personalizzato

<div class="article-intro">

Puoi puntare il tuo dominio (ad esempio, **www.yourchurch.org**) al tuo sito B1 in modo che i visitatori lo raggiungano all'indirizzo web reale della tua chiesa invece dell'indirizzo predefinito yourchurch.1.church.

</div>

## Passaggio 1 - Aggiungi prima il record DNS

Prima di aggiungere il tuo dominio in B1, devi puntarlo ai server di B1 presso il tuo registrar di domini (GoDaddy, Namecheap, Cloudflare, ecc.).

Aggiungi uno di questi record - CNAME è preferito:

| Tipo | Host | Valore |
|------|------|-------|
| CNAME | `www` | `proxy.b1.church` |
| A | `yourchurch.org` | `3.23.251.61` |

Utilizza il **CNAME** per il tuo indirizzo `www`. Utilizza il **record A** se il tuo registrar non supporta CNAME su un dominio root/apex (senza www), o se vuoi che il dominio root funzioni anche.

I cambiamenti DNS possono richiedere da alcuni minuti a poche ore per avere effetto.

## Passaggio 2 - Aggiungi il dominio in B1

Una volta che DNS punta a B1:

1. Vai a **Settings** in B1 Admin.
2. Fai clic su **Domains**.
3. Digita il tuo dominio nel campo e fai clic su **Save**.

Non è necessario fare clic prima sul pulsante **+** - un dominio digitato nel campo viene aggiunto quando salvi. Utilizza **+** (o premi **Enter**) quando desideri aggiungere più domini all'elenco prima di salvare.

B1 gestisce automaticamente SSL - nessun acquisto di certificato è necessario.

:::warning
Se aggiungi il dominio in B1 prima che i tuoi record DNS siano in posto, non si salverà. Imposta sempre prima il DNS.
:::

## Verifica se sta funzionando

Dopo il salvataggio, visita il tuo dominio in un browser. Se carica il tuo sito B1, hai finito. Se vedi un errore, il DNS potrebbe ancora essere propagato, attendi alcuni minuti e riprova.

Puoi anche controllare la propagazione DNS su [dnschecker.org](https://dnschecker.org) - cerca il tuo dominio e controlla che il tuo record CNAME o A compaia.
