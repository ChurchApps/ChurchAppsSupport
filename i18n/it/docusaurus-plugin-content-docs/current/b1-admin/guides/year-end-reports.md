---
title: "Guida: Generare i rendiconti annuali delle donazioni"
description: "In B1 Admin, completa i registri delle donazioni dell'anno, verifica le impostazioni fiscali dei fondi e genera le ricevute di donazione detraibili per ogni donatore."
---

# Generare i rendiconti annuali delle donazioni

<div class="article-intro">

Ti guidiamo attraverso il processo di fine anno: completare i registri delle donazioni, verificare le impostazioni dei fondi e generare le ricevute di donazione detraibili per ogni donatore. Di solito questa operazione si svolge all'inizio di gennaio per l'anno solare precedente.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Account B1 Admin con accesso alla sezione finanziaria
- Donazioni registrate durante l'anno (online tramite Stripe e/o inserite manualmente)
- Accesso al tuo account Stripe, se accetti donazioni online

</div>

## Passo 1: Importare le transazioni Stripe finali

Assicurati che tutte le donazioni online di fine anno siano presenti nel sistema.

Segui la guida [Importazione Stripe](../donations/stripe-import.md) per:

1. Accedere a Donazioni > Importazione Stripe
2. Selezionare un intervallo di date che copra la fine dell'anno (ad esempio, dal 1° al 31 dicembre)
3. Fare clic su Anteprima per controllare i dati, quindi su Importa mancanti per completare l'operazione

:::warning
Esegui questa importazione prima di generare i rendiconti. Le transazioni non importate non compariranno nelle ricevute dei donatori.
:::

## Passo 2: Verificare i rapporti sulle donazioni

Controlla che i registri siano corretti prima di generare i rendiconti.

Segui la guida [Rapporti sulle donazioni](../donations/donation-reports.md) per:

1. Controllare la pagina di riepilogo delle donazioni per l'intero anno
2. Verificare i totali per fondo e confrontarli con gli estratti conto bancari per individuare eventuali discrepanze
3. Se necessario, fare clic sui singoli lotti per verificare i dettagli dei donatori

## Passo 3: Verificare lo stato fiscale dei fondi

Assicurati che l'impostazione di detraibilità fiscale di ogni fondo sia corretta, così che i rendiconti risultino accurati.

Segui la guida [Fondi](../donations/funds.md) per:

1. Aprire ciascun fondo e confermare che l'impostazione di detraibilità fiscale sia corretta

:::info
Nei rendiconti delle donazioni compaiono solo le donazioni destinate a fondi contrassegnati come detraibili. Se un fondo dovrebbe essere detraibile ma non è contrassegnato come tale, aggiornalo prima di generare i rendiconti.
:::

## Passo 4: Generare i rendiconti delle donazioni

Crea i rendiconti ufficiali delle donazioni per i tuoi donatori.

Segui la guida [Rendiconti delle donazioni](../donations/giving-statements.md) per:

1. Accedere a **Donazioni > Rendiconti delle donazioni**
2. Selezionare l'anno dal menu a tendina e verificare le statistiche di riepilogo
3. Scegliere il metodo di download:
   - **Scarica ZIP** — singoli file CSV, uno per donatore
   - **Stampa tutto** — vista stampabile con ogni rendiconto su una pagina separata, con il logo della chiesa in alto (se ne hai caricato uno)

:::tip
Genera i rendiconti all'inizio di gennaio, quando i dati sono ancora aggiornati. Così avrai tempo per risolvere eventuali problemi prima di spedirli.
:::

## Passo 5: Distribuire ai donatori

Fai in modo che i rendiconti arrivino nelle mani dei donatori.

1. Stampa e spedisci i rendiconti, oppure invia via email i singoli file CSV ai donatori
2. I membri possono anche consultare la propria cronologia delle donazioni e stampare i rendiconti su [B1.church o nella B1 App](../../b1-church/giving/donation-history.md)

## Operazione completata!

I rendiconti annuali delle donazioni sono pronti. I donatori hanno le loro ricevute detraibili e i registri finanziari dell'anno sono chiusi.

## Articoli correlati

- [Importazione Stripe](../donations/stripe-import.md) — importa le transazioni online
- [Rapporti sulle donazioni](../donations/donation-reports.md) — consulta le tendenze e i totali delle donazioni
- [Fondi](../donations/funds.md) — gestisci i fondi e le impostazioni di detraibilità fiscale
- [Rendiconti delle donazioni](../donations/giving-statements.md) — genera i rendiconti di fine anno
- [Registrare le donazioni](../donations/recording-donations.md) — inserisci manualmente donazioni in contanti o con assegno
- [Cronologia delle donazioni (web)](../../b1-church/giving/donation-history.md) — vista self-service per i membri
- [Guida: configurare le donazioni online](./online-giving.md) — configurazione iniziale di Stripe e delle donazioni
