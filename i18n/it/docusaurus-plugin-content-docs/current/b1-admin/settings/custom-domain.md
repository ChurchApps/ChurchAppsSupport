---
title: "Dominio personalizzato"
description: "Collega il tuo dominio, come www.yourchurch.org, al tuo sito B1 in B1 Admin configurando i record DNS e aggiungendo il dominio nelle Impostazioni."
---

# Dominio personalizzato

<div class="article-intro">

Puoi collegare il tuo dominio (ad esempio, **`www.yourchurch.org`**) al tuo sito B1, così i visitatori raggiungono il sito all'indirizzo web reale della chiesa invece che all'indirizzo predefinito yourchurch.b1.church.

</div>

## Video di formazione {#training-video}

<YouTube id="L5yaDusHts8" title="Collegare un dominio personalizzato in B1" next="Configurare la trasmissione in diretta in B1" nextUrl="/docs/b1-admin/sermons/live-streaming" />

## Passaggio 1 — Aggiungi prima il record DNS {#step-1--add-the-dns-record-first}

Prima di aggiungere il dominio in B1, devi puntarlo ai server di B1 presso il tuo registrar di domini (GoDaddy, Namecheap, Cloudflare, ecc.).

Aggiungi uno di questi record — il CNAME è quello consigliato:

| Tipo | Host | Valore |
|------|------|-------|
| CNAME | `www` | `proxy.b1.church` |
| A | `yourchurch.org` | `3.23.251.61` |

Usa il **CNAME** per l'indirizzo `www`. Usa il **record A** se il tuo registrar non supporta il CNAME sul dominio radice (senza www), oppure se vuoi che anche il dominio radice funzioni.

Le modifiche DNS possono richiedere da qualche minuto a qualche ora per avere effetto.

## Passaggio 2 — Aggiungi il dominio in B1 {#step-2--add-the-domain-in-b1}

Una volta che il DNS punta a B1:

1. Vai su **Impostazioni** in B1 Admin.
2. Fai clic su **Domini** nell'elenco a sinistra, quindi su **Modifica** nella sezione **Domini**.
3. Digita il tuo dominio nel campo e fai clic su **Salva**.

Non è necessario fare prima clic sul pulsante **+** — un dominio lasciato nel campo viene aggiunto al salvataggio. Usa **+** (oppure premi **Invio**) quando vuoi aggiungere più domini all'elenco prima di salvare. Inserisci solo il dominio, come `www.yourchurch.org` — non `https://` né un percorso di pagina.

Se la tua chiesa ha più di un sito web, a ogni dominio viene associato anche un menu a discesa **Sito web**. Lascialo su **Sito web principale**, oppure scegli il sito che quel dominio deve aprire.

Per rimuovere un dominio, fai clic sull'icona di eliminazione nella sua riga e poi su **Salva**.

B1 gestisce automaticamente l'SSL — non è necessario acquistare alcun certificato.

:::warning
B1 salva il dominio anche se i record DNS non sono ancora configurati, ma il dominio non caricherà il tuo sito e B1 non può emettere il suo certificato SSL finché il DNS non punta a B1. Configura prima il DNS. Non è possibile aggiungere un dominio già usato da un'altra chiesa.
:::

## Verificare che funzioni {#checking-if-its-working}

Dopo il salvataggio, visita il tuo dominio in un browser. Se carica il tuo sito B1, sei a posto. Se compare un errore, il DNS potrebbe essere ancora in propagazione: attendi qualche minuto e riprova.

Puoi anche controllare la propagazione DNS su [dnschecker.org](https://dnschecker.org) — cerca il tuo dominio e verifica che compaia il tuo record CNAME o A.
