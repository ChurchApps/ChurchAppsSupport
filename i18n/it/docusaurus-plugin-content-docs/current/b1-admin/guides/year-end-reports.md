---
title: "Guida: Generare i report di fine anno sulle offerte"
---

# Generare i report di fine anno sulle offerte

<div class="article-intro">

Scopri il processo di fine anno per finalizzare i tuoi registri delle donazioni, verificare le impostazioni dei fondi e generare i rendiconti fiscali deducibili per ogni donatore. Questo viene tipicamente fatto all'inizio di gennaio per l'anno solare precedente.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Account B1 Admin con accesso finanziario
- Donazioni registrate durante tutto l'anno (online tramite Stripe e/o inserite manualmente)
- Accesso al tuo account Stripe se accetti donazioni online

</div>

## Passo 1: Importare le ultime transazioni Stripe

Assicurati che tutte le donazioni online della fine dell'anno siano nel tuo sistema.

Segui la guida [Importazione Stripe](../donations/stripe-import.md) per:

1. Navigare su Donations > Batches > Stripe Import
2. Selezionare un intervallo di date che copra la fine dell'anno (es. 1 dicembre - 31 dicembre)
3. Cliccare prima Preview per rivedere, poi Import Missing per finalizzare

:::warning
Esegui questa importazione prima di generare i rendiconti. Qualsiasi transazione non importata non apparirà sui rendiconti dei donatori.
:::

## Passo 2: Rivedere i report delle donazioni

Verifica che i tuoi registri siano accurati prima di generare i rendiconti.

Segui la guida [Report donazioni](../donations/donation-reports.md) per:

1. Controllare la pagina riepilogo donazioni per l'intero anno
2. Rivedere i totali per fondo e confrontarli con gli estratti conto bancari per individuare eventuali discrepanze
3. Cliccare sui singoli lotti per verificare i dettagli a livello di donatore se necessario

## Passo 3: Verificare lo stato fiscale dei fondi

Assicurati che l'impostazione di deducibilità fiscale di ogni fondo sia corretta affinché i rendiconti siano accurati.

Segui la guida [Fondi](../donations/funds.md) per:

1. Aprire ogni fondo e confermare che l'impostazione di deducibilità fiscale sia corretta

:::info
Solo le donazioni ai fondi contrassegnati come deducibili appariranno sui rendiconti delle offerte. Se un fondo dovrebbe essere deducibile ma non è contrassegnato in quel modo, aggiornalo prima di generare i rendiconti.
:::

## Passo 4: Generare i rendiconti delle offerte

Crea i rendiconti ufficiali per i tuoi donatori.

Segui la guida [Rendiconti delle offerte](../donations/giving-statements.md) per:

1. Navigare su Donations > Statements
2. Selezionare l'anno dal menu a tendina e rivedere le statistiche riepilogative
3. Scegliere il metodo di download:
   - **Scarica ZIP** — file CSV individuali, uno per donatore
   - **Stampa tutto** — vista stampabile con ogni rendiconto su una nuova pagina

:::tip
Genera i rendiconti all'inizio di gennaio quando i registri sono freschi. Questo ti dà tempo per individuare eventuali problemi prima di spedirli.
:::

## Passo 5: Distribuire ai donatori

Consegna i rendiconti ai tuoi donatori.

1. Stampa e spedisci i rendiconti, o invia via email i CSV individuali ai donatori
2. I membri possono anche visualizzare la propria cronologia delle offerte e stampare i rendiconti da [B1.church](../../b1-church/giving/donation-history.md) e dall'[app B1 Mobile](../../b1-mobile/giving/donation-history.md)

## Hai finito!

I tuoi report di fine anno sulle offerte sono completi. I donatori hanno i loro rendiconti fiscali deducibili e i tuoi registri finanziari sono finalizzati per l'anno.

## Articoli correlati

- [Importazione Stripe](../donations/stripe-import.md) — importa transazioni online
- [Report donazioni](../donations/donation-reports.md) — visualizza tendenze e totali delle offerte
- [Fondi](../donations/funds.md) — gestisci fondi e impostazioni di deducibilità fiscale
- [Rendiconti delle offerte](../donations/giving-statements.md) — genera rendiconti di fine anno
- [Registrazione donazioni](../donations/recording-donations.md) — inserisci manualmente donazioni in contanti/assegni
- [Cronologia donazioni (Web)](../../b1-church/giving/donation-history.md) — vista self-service per i membri
- [Guida alla configurazione donazioni online](./online-giving.md) — configurazione iniziale di Stripe e donazioni
