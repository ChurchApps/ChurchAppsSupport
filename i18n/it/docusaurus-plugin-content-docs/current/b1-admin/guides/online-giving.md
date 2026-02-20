---
title: "Guida: Configurare le donazioni online"
---

# Configurare le donazioni online

<div class="article-intro">

Ti guideremo attraverso tutto il necessario per accettare donazioni online nella tua chiesa — dalla creazione dei fondi di donazione, al collegamento di Stripe per l'elaborazione dei pagamenti, alla condivisione della pagina delle offerte con la tua congregazione. Alla fine, i membri potranno donare online attraverso il tuo sito web e l'app mobile.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Account B1 Admin con accesso amministratore — vedi [Ruoli e permessi](../people/roles-permissions.md)
- Un account Stripe (creane uno gratuito su [stripe.com](https://stripe.com) se necessario)

</div>

## Passo 1: Creare i fondi di donazione

I fondi sono le categorie in cui i donatori possono donare. Hai bisogno di almeno un fondo prima di poter accettare donazioni.

Segui la guida [Fondi](../donations/funds.md) per configurare le tue categorie di donazione:

1. Crea i tuoi fondi più comuni (es. "Fondo Generale", "Fondo Edificio", "Missioni")
2. Contrassegna appropriatamente i fondi deducibili dalle tasse — questo influisce sui rendiconti di fine anno

:::tip
Puoi aggiungere altri fondi in qualsiasi momento. Inizia con le categorie di donazione più comuni.
:::

## Passo 2: Collegare Stripe

Stripe gestisce tutta l'elaborazione dei pagamenti. Collegherai il tuo account Stripe a B1 Admin in modo che le donazioni arrivino sul tuo conto bancario.

Segui la guida [Configurazione donazioni online](../donations/online-giving-setup.md) per collegare Stripe:

1. Accedi alla tua dashboard Stripe e recupera la tua Publishable Key e la Secret Key
2. In B1 Admin, vai su Settings e inserisci entrambe le chiavi

:::warning
Stripe mostra la tua Secret Key solo una volta. Copiala e salvala prima di uscire dalla dashboard Stripe. Se la perdi, dovrai generarne una nuova.
:::

## Passo 3: Aggiungere una pagina donazioni al tuo sito web

Rendi le donazioni accessibili aggiungendo una pagina donazioni al tuo sito B1.

Segui le guide [Configurazione donazioni online](../donations/online-giving-setup.md) e [Gestione pagine](../website/managing-pages.md) per:

1. Aggiungere una scheda "Dona" al tuo sito B1.church
2. Il tuo URL per le donazioni sarà: `https://yoursubdomain.b1.church/donate`
3. I membri possono donare senza effettuare l'accesso (pagina pubblica) o accedere per metodi di pagamento salvati e cronologia delle donazioni

## Passo 4: Effettuare una donazione di prova

Prima di annunciarlo alla tua congregazione, verifica che tutto funzioni.

1. Effettua una piccola donazione di prova per verificare che il flusso funzioni correttamente
2. Controlla che la donazione appaia in B1 Admin sotto Donazioni

:::tip
Usa prima la modalità test di Stripe se vuoi verificare senza addebiti reali, poi passa alla modalità live prima di annunciarlo alla tua congregazione.
:::

## Passo 5: Annunciare alla congregazione

Diffondi la notizia in modo che i membri sappiano che possono donare online.

1. Condividi l'URL delle donazioni tramite il tuo sito web, newsletter via email, bollettini e social media
2. I membri possono anche donare tramite l'[app B1 Mobile](../../b1-mobile/giving/) — la funzione donazioni è integrata

:::info
I membri che effettuano l'accesso possono salvare i metodi di pagamento, impostare donazioni ricorrenti e visualizzare la loro cronologia delle offerte. Le donazioni anonime funzionano anche — non è richiesto l'accesso.
:::

## Passo 6: Gestione continua

Mantieni aggiornati i tuoi registri delle donazioni e genera report durante tutto l'anno.

1. [Importa le transazioni Stripe](../donations/stripe-import.md) regolarmente (settimanalmente o mensilmente) per mantenere aggiornati i tuoi registri
2. [Visualizza i report delle donazioni](../donations/donation-reports.md) per tracciare le tendenze e i totali per fondo
3. [Genera i rendiconti di fine anno](../donations/giving-statements.md) per i registri fiscali dei tuoi donatori

:::tip
Esegui le importazioni Stripe almeno mensilmente per mantenere aggiornati i tuoi registri. Vedi la [Guida ai report di fine anno](./year-end-reports.md) per il processo completo di fine anno.
:::

## Hai finito!

La tua chiesa ora accetta donazioni online. I membri possono donare attraverso il tuo sito web, l'app B1 Mobile, o qualsiasi dispositivo con un browser web. Tutte le donazioni vengono automaticamente tracciate in B1 Admin.

## Articoli correlati

- [Fondi](../donations/funds.md) — crea e gestisci le categorie di donazione
- [Lotti](../donations/batches.md) — organizza le donazioni in gruppi
- [Registrazione donazioni](../donations/recording-donations.md) — inserisci manualmente donazioni in contanti e assegni
- [Importazione Stripe](../donations/stripe-import.md) — importa le transazioni online in B1 Admin
- [Report donazioni](../donations/donation-reports.md) — visualizza tendenze e totali delle offerte
- [Rendiconti delle offerte](../donations/giving-statements.md) — genera rendiconti fiscali di fine anno
- [Effettuare donazioni (Web)](../../b1-church/giving/making-donations.md) — l'esperienza di donazione per i membri
- [Effettuare donazioni (Mobile)](../../b1-mobile/giving/making-donations.md) — donare dall'app mobile
