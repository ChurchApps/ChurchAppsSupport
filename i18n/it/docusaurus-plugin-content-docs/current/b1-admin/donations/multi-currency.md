---
title: "Supporto Multi-Valuta"
---

# Supporto Multi-Valuta

<div class="article-intro">

La funzione multi-valuta di B1 consente alla tua chiesa di accettare e tracciare donazioni in diverse valute. Questo è particolarmente utile per le chiese con membri internazionali, missionari o più sedi in paesi diversi.

</div>

<div class="prereqs">
<h4>Prima di Iniziare</h4>

- Hai bisogno del permesso per gestire le donazioni. Vedi [Ruoli e Autorizzazioni](../people/roles-permissions.md) per i dettagli.
- Configura il tuo [online giving](./online-giving-setup.md) con Stripe, che supporta le transazioni multi-valuta.
- Comprendi le esigenze contabili della tua chiesa per la gestione di più valute.

</div>

## Abilitazione Multi-Valuta

Il supporto multi-valuta è ora abilitato per impostazione predefinita in B1. Una volta abilitato:

- I membri possono donare nella loro valuta locale quando donano online
- Puoi registrare manualmente le donazioni in qualsiasi valuta
- I rapporti sulle donazioni mostrano gli importi nella loro valuta originale
- Stripe gestisce automaticamente la conversione di valuta per le donazioni online

## Valute Supportate

Il sistema supporta tutte le principali valute mondiali, tra cui:

- **USD** -- Dollaro Statunitense
- **EUR** -- Euro
- **GBP** -- Sterlina Britannica
- **CAD** -- Dollaro Canadese
- **AUD** -- Dollaro Australiano
- **MXN** -- Peso Messicano
- **BRL** -- Real Brasiliano
- **INR** -- Rupia Indiana
- **CNY** -- Yuan Cinese
- **JPY** -- Yen Giapponese
- E molte altre...

Le valute disponibili per le donazioni online dipendono dalle valute supportate dal tuo account Stripe.

## Registrazione di Donazioni in Diverse Valute

### Donazioni Online

Quando un membro dona online tramite Stripe:

1. Seleziona la sua valuta preferita al checkout
2. Stripe elabora il pagamento in quella valuta
3. La donazione viene registrata in B1 con l'importo della valuta originale
4. Stripe gestisce automaticamente qualsiasi conversione di valuta necessaria nella valuta predefinita del tuo account

### Immissione Manuale

Per registrare una donazione in contanti o assegno in una valuta diversa:

1. Accedi a **Donazioni** in B1 Admin
2. Fai clic su **Aggiungi Donazione**
3. Seleziona la valuta dal menu a discesa della valuta
4. Inserisci l'importo in quella valuta
5. Completa il resto dei dettagli della donazione
6. Fai clic su **Salva**

## Visualizzazione delle Donazioni Multi-Valuta

### Rapporti sulle Donazioni

I rapporti sulle donazioni visualizzano gli importi nella loro valuta originale:

- I record di donazione individuali mostrano il codice valuta (ad es. "$100,00 USD")
- I totali vengono calcolati per valuta
- Puoi filtrare per valute specifiche

### Estratti Conto di Donazione

Quando generi estratti conto di donazione:

- Ogni donazione appare con la sua valuta originale
- I totali sono suddivisi per valuta
- I membri vedono esattamente cosa hanno donato in ogni valuta

## Integrazione Stripe

Per le donazioni online, Stripe gestisce le transazioni multi-valuta:

- **Conversione automatica** -- Stripe converte le valute nella valuta predefinita del tuo account
- **Tassi di cambio** -- Stripe utilizza i tassi di cambio di mercato attuali
- **Commissioni** -- La conversione di valuta può comportare commissioni Stripe aggiuntive
- **Valuta di pagamento** -- I fondi vengono depositati nella valuta predefinita del tuo account

:::info
Controlla il tuo dashboard Stripe per visualizzare i tassi di conversione attuali e tutte le commissioni associate alle transazioni multi-valuta.
:::

## Considerazioni Contabili

Quando lavori con più valute:

- **Tenuta dei registri** -- Tiene traccia degli importi di donazione originali e delle valute per una segnalazione accurata
- **Tassi di cambio** -- Nota che i tassi di conversione di Stripe possono differire dai tassi della tua banca
- **Ricevute fiscali** -- Consulta il tuo commercialista su come segnalare le donazioni in diverse valute ai fini fiscali
- **Allocazione dei fondi** -- Puoi allocare le donazioni a fondi specifici indipendentemente dalla valuta

## Migliori Pratiche

- **Valuta predefinita** -- Imposta la valuta principale della tua chiesa come predefinita per la maggior parte delle transazioni
- **Comunicazione chiara** -- Comunica ai donatori in quale valuta stanno donando durante il processo di checkout
- **Segnalazione coerente** -- Decidi se segnalare nelle valute originali o convertire in una singola valuta per i riepiloghi
- **Riconciliazione regolare** -- Riconcilia i pagamenti Stripe con i tuoi record di donazione, tenendo conto delle conversioni di valuta

## Limitazioni

- La conversione di valuta è gestita da Stripe solo per le donazioni online
- Le donazioni manuali vengono registrate come immesse senza conversione automatica
- I rapporti storici mostrano le donazioni nelle loro valute originali
- I calcoli totali vengono eseguiti per valuta, non tra le valute

## Articoli Correlati

- [Configurazione Online Giving](./online-giving-setup.md) -- Configura Stripe per accettare donazioni
- [Registrazione Donazioni](./recording-donations.md) -- Immetti manualmente i record di donazione
- [Rapporti sulle Donazioni](./donation-reports.md) -- Genera e visualizza i riepiloghi delle donazioni
- [Estratti Conto di Donazione](./giving-statements.md) -- Crea estratti conto di fine anno
