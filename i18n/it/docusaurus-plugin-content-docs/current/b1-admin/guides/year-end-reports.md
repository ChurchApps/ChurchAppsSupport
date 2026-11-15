---
title: "Guida: Genera le ricevute annuali delle donazioni"
description: "In B1 Admin, completa le registrazioni delle donazioni dell'anno, verifica le impostazioni fiscali dei fondi e genera le ricevute di donazione detraibili per ogni donatore."
---

# Genera le ricevute annuali delle donazioni

<div class="article-intro">

Segui il processo di fine anno per completare le registrazioni delle donazioni, verificare le impostazioni dei fondi e generare le ricevute di donazione detraibili per ogni donatore. Di solito si fa a inizio gennaio per l'anno solare precedente.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Account B1 Admin con accesso alla gestione finanziaria
- Donazioni registrate durante l'anno (online tramite Stripe e/o inserite manualmente)
- Accesso al tuo account Stripe, se accetti donazioni online

</div>

## Passaggio 1: Importa le ultime transazioni Stripe {#step-1-import-final-stripe-transactions}

Assicurati che tutte le donazioni online di fine anno siano nel sistema.

Segui la guida [Importazione da Stripe](../donations/stripe-import.md) per:

1. Nel [menu Jump](../introduction.md#getting-around-with-the-jump-menu), scegli **Donazioni > Importazione Stripe** (compare solo se il tuo fornitore di donazioni è Stripe)
2. Imposta la **Data di inizio** e la **Data di fine** per coprire la fine dell'anno (ad esempio, dal 1° al 31 dicembre)
3. Clicca prima su **Anteprima** per controllare, poi su **Importa mancanti** per completare l'operazione

:::warning
Esegui questa importazione prima di generare le ricevute. Le transazioni che non hai importato non compariranno nelle ricevute dei donatori.
:::

## Passaggio 2: Controlla i report sulle donazioni {#step-2-review-donation-reports}

Verifica che le registrazioni siano corrette prima di generare le ricevute.

Segui la guida [Report sulle donazioni](../donations/donation-reports.md) per:

1. Nel menu Jump, scegli **Donazioni > Riepilogo**, imposta la **Data di inizio** e la **Data di fine** in **Filtra report** sull'intero anno, e clicca su **Esegui report**
2. Controlla i totali per fondo e confrontali con gli estratti conto bancari per individuare eventuali discrepanze. Clicca su **Opzioni di download** e scegli **Riepilogo** per ottenere un CSV
3. Se necessario, apri i singoli lotti in **Donazioni > Lotti** per verificare i dettagli di ogni donatore

## Passaggio 3: Verifica lo stato fiscale dei fondi {#step-3-verify-fund-tax-status}

Assicurati che l'impostazione di detraibilità di ciascun fondo sia corretta, così le ricevute saranno accurate.

Segui la guida [Fondi](../donations/funds.md) per:

1. Nel menu Jump, scegli **Donazioni > Fondi** e controlla lo **Stato fiscale** di ogni fondo
2. Clicca su **Modifica** su un fondo per cambiare l'impostazione **Detraibile fiscalmente**

:::info
Nelle ricevute compaiono solo le donazioni destinate a fondi contrassegnati come detraibili. Se un fondo dovrebbe essere detraibile ma non è contrassegnato come tale, aggiornalo prima di generare le ricevute.
:::

## Passaggio 4: Genera le ricevute di donazione {#step-4-generate-giving-statements}

Crea le ricevute ufficiali per i tuoi donatori.

Segui la guida [Ricevute di donazione](../donations/giving-statements.md) per:

1. Nel menu Jump, scegli **Donazioni > Ricevute di donazione**
2. Seleziona l'**Anno** e controlla le statistiche di riepilogo. Le chiese in Canada, Australia o Nuova Zelanda possono cliccare su **Formato ricevuta** per passare al modello ufficiale di ricevuta del loro paese
3. Scegli il metodo di download:
   - **Scarica ZIP** — file CSV individuali, uno per donatore
   - **Stampa tutto** — vista stampabile con ogni ricevuta su una pagina nuova, con il logo della chiesa in alto (se ne hai caricato uno)

:::tip
Genera le ricevute a inizio gennaio, quando le registrazioni sono ancora fresche. Così hai tempo di risolvere eventuali problemi prima di spedirle.
:::

## Passaggio 5: Consegna le ricevute ai donatori {#step-5-distribute-to-donors}

Fai arrivare le ricevute nelle mani dei tuoi donatori.

1. Stampa e spedisci le ricevute, oppure invia via email i singoli CSV ai donatori
2. I membri possono anche consultare la propria cronologia delle donazioni e stampare le ricevute su [B1.church o nell'app B1](../../b1-church/giving/donation-history.md)

## Hai finito! {#youre-done}

Le tue ricevute annuali delle donazioni sono complete. I donatori hanno le loro ricevute detraibili e le registrazioni finanziarie dell'anno sono chiuse.

## Articoli correlati {#related-articles}

- [Importazione da Stripe](../donations/stripe-import.md) — importa le transazioni online
- [Report sulle donazioni](../donations/donation-reports.md) — consulta andamento e totali delle donazioni
- [Fondi](../donations/funds.md) — gestisci i fondi e le impostazioni di detraibilità
- [Ricevute di donazione](../donations/giving-statements.md) — genera le ricevute di fine anno
- [Registrare le donazioni](../donations/recording-donations.md) — inserisci manualmente donazioni in contanti o con assegno
- [Cronologia donazioni (web)](../../b1-church/giving/donation-history.md) — vista self-service per i membri
- [Guida alla configurazione delle donazioni online](./online-giving.md) — configurazione iniziale di Stripe e delle donazioni
