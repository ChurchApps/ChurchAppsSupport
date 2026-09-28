---
title: "Guida: Genera Rapporti di Donazione di Fine Anno"
---

# Genera Rapporti di Donazione di Fine Anno

<div class="article-intro">

Guida attraverso il processo di fine anno di finalizzazione dei tuoi record di donazione, verifica delle impostazioni dei fondi e generazione di dichiarazioni di donazione deducibili dalle tasse per ogni donatore. Questo viene solitamente fatto all'inizio di gennaio per l'anno civile precedente.

</div>

<div class="prereqs">
<h4>Prima di Iniziare</h4>

- Account B1 Admin con accesso finanziario
- Donazioni registrate durante tutto l'anno (online tramite Stripe e/o inserite manualmente)
- Accesso al tuo account Stripe se accetti donazioni online

</div>

## Passaggio 1: Importa le Transazioni Stripe Finali

Assicurati che tutte le donazioni online dalla fine dell'anno siano nel tuo sistema.

Segui la guida [Importazione Stripe](../donations/stripe-import.md) per:

1. Naviga su Donazioni > Batch > Importazione Stripe
2. Seleziona un intervallo di date che copra la fine dell'anno (ad es. 1-31 dicembre)
3. Fai clic su Anteprima prima per rivedere, quindi Importa Mancanti per finalizzare

:::warning
Esegui questa importazione prima di generare dichiarazioni. Qualsiasi transazione che non hai importato non apparirà sulle dichiarazioni del donatore.
:::

## Passaggio 2: Rivedi Rapporti di Donazione

Verifica che i tuoi record siano accurati prima di generare dichiarazioni.

Segui la guida [Rapporti di Donazione](../donations/donation-reports.md) per:

1. Controlla la pagina di riepilogo donazione per l'anno completo
2. Rivedi i totali per fondo e confronta con i tuoi estratti bancari per individuare eventuali discrepanze
3. Fai clic su singoli batch per verificare i dettagli a livello di donatore se necessario

## Passaggio 3: Verifica lo Stato Fiscale dei Fondi

Assicurati che l'impostazione deducibile dalle tasse di ogni fondo sia corretta in modo che le dichiarazioni siano accurate.

Segui la guida [Fondi](../donations/funds.md) per:

1. Apri ogni fondo e conferma che l'impostazione deducibile dalle tasse è corretta

:::info
Solo le donazioni a fondi contrassegnati come deducibili dalle tasse appariranno sulle dichiarazioni di donazione. Se un fondo dovrebbe essere deducibile dalle tasse ma non è contrassegnato in questo modo, aggiornalo prima di generare le dichiarazioni.
:::

## Passaggio 4: Genera Dichiarazioni di Donazione

Crea le dichiarazioni di donazione ufficiali per i tuoi donatori.

Segui la guida [Dichiarazioni di Donazione](../donations/giving-statements.md) per:

1. Naviga su **Donazioni > Dichiarazioni di Donazione**
2. Seleziona l'anno dal menu a discesa e rivedi le statistiche di riepilogo
3. Scegli il tuo metodo di download:
   - **Scarica ZIP** - file CSV individuali, uno per donatore
   - **Stampa Tutto** - visualizzazione stampabile con ogni dichiarazione su una nuova pagina

:::tip
Genera dichiarazioni all'inizio di gennaio mentre i record sono freschi. Questo ti dà il tempo di individuare eventuali problemi prima di spedirli.
:::

## Passaggio 5: Distribuisci ai Donatori

Metti le dichiarazioni nelle mani dei tuoi donatori.

1. Stampa e invia dichiarazioni per posta, o invia CSV individuali ai donatori via email
2. I membri possono anche visualizzare la loro storia di donazione e stampare dichiarazioni da [B1.church](../../b1-church/giving/donation-history.md) e dall'[app Mobile B1](../../b1-mobile/giving/donation-history.md)

## Fatto!

I tuoi rapporti di donazione di fine anno sono completi. I donatori hanno le loro dichiarazioni deducibili dalle tasse e i tuoi record finanziari sono finalizzati per l'anno.

## Articoli Correlati

- [Importazione Stripe](../donations/stripe-import.md) - importa transazioni online
- [Rapporti di Donazione](../donations/donation-reports.md) - visualizza i trend e i totali di donazione
- [Fondi](../donations/funds.md) - gestisci fondi e impostazioni deducibili dalle tasse
- [Dichiarazioni di Donazione](../donations/giving-statements.md) - genera dichiarazioni di fine anno
- [Registrazione Donazioni](../donations/recording-donations.md) - inserisci manualmente donazioni in contanti/assegni
- [Cronologia Donazioni (Web)](../../b1-church/giving/donation-history.md) - visualizzazione self-service dei membri
- [Guida alla Configurazione delle Donazioni Online](./online-giving.md) - configurazione iniziale di Stripe e donazioni
