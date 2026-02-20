---
title: "Sicurezza dei Dati"
---

# Sicurezza dei Dati

<div class="article-intro">

Sebbene non esista un sistema perfettamente sicuro, ChurchApps prende la sicurezza dei dati molto seriamente. Questa pagina spiega le misure adottate per proteggere tutti i dati inseriti in B1.church Admin e altri prodotti ChurchApps.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Leggi questa pagina per capire come sono protetti i dati della tua chiesa
- Configura [Ruoli e Autorizzazioni](./roles-permissions.md) per controllare chi può accedere alle informazioni sensibili
- Familiarizza con la [politica sulla privacy](https://churchapps.org/privacy)

</div>

## Limitazione dei dati sensibili memorizzati

Il nostro primo approccio è non memorizzare più dati sensibili del necessario. Questo significa non memorizzare mai dettagli di carte di credito o conti bancari utilizzati per le donazioni. Quando un utente effettua una donazione tramite B1.church Admin o B1, i dati della carta di credito non vengono mai trasmessi ai nostri server, ma solo al tuo gateway di pagamento (Stripe). Ciò significa che in caso di violazione dei dati, nessun dato di carte di credito o bancario verrebbe compromesso.

Inoltre, non memorizziamo mai le password nel nostro sistema. Tutte le password vengono elaborate attraverso un algoritmo di hashing unidirezionale in cui parte dei dati viene distrutta, rendendo impossibile per chiunque recuperare le password dal database, nemmeno per noi. Per verificare le password, il valore inserito deve passare attraverso lo stesso hash unidirezionale e produrre lo stesso risultato.

Dopo aver rimosso queste due fonti, gli unici dati sensibili che rimangono sono un elenco di nomi e informazioni di contatto.

:::tip
Poiché ChurchApps non memorizza mai informazioni su carte di credito o bancarie, anche nel peggiore dei casi una violazione dei dati non esporrebbe i dettagli dei conti finanziari. Solo nomi e informazioni di contatto sarebbero a rischio.
:::

## Utilizzo delle migliori pratiche standard

Utilizziamo le migliori pratiche standard del settore per la sicurezza, inclusa la crittografia di tutti i dati in transito da e verso i nostri server tramite HTTPS. Tutti i server sono ospitati in un datacenter fisico sicuro con Amazon Web Services. Tutti i server di database sono protetti da un firewall e non sono accessibili da Internet.

## Segregazione dei dati

I dati sono separati in diversi database in base all'ambito. Ciascuna delle nostre API (Membership, Giving, Attendance, Messaging, Doing e Lessons) è un silo indipendente di dati con il proprio database. Se uno di essi viene compromesso, l'utilità dei dati è limitata senza che anche gli altri vengano compromessi. Ad esempio, se l'API/database Giving venisse compromesso, un malintenzionato potrebbe potenzialmente accedere a un elenco di donazioni e date (ma mai a dati di carte/bancari). Tuttavia, non avrebbe accesso a quali utenti hanno effettuato le donazioni o per quali chiese, poiché quei dati sono memorizzati nel database separato Membership.

:::info
La segregazione dei dati significa che compromettere un sistema non dà accesso a tutti i dati della chiesa. Ogni API opera in modo indipendente con il proprio database, limitando l'impatto di qualsiasi potenziale violazione.
:::

## Accesso limitato

L'accesso ai server di produzione è strettamente limitato agli amministratori di sistema che necessitano dell'accesso. Attualmente si tratta di due persone che sono anche membri del consiglio. Sviluppatori, volontari e altri membri del consiglio non hanno il permesso di accedere ai server di produzione.

## Politica sulla privacy

I tuoi dati sono tuoi e non saranno mai venduti a terze parti. Puoi leggere la nostra politica sulla privacy completa [qui](https://churchapps.org/privacy).

## Conformità GDPR

ChurchApps attualmente non supporta la conformità GDPR a causa dei significativi requisiti tecnici e finanziari coinvolti. Il GDPR richiederebbe di ospitare i dati su server basati nell'UE e costruire un'infrastruttura separata per instradare e memorizzare i dati regionalmente, raddoppiando di fatto i nostri costi di hosting e sviluppo. Come organizzazione no-profit che offre strumenti gratuiti alle chiese, non abbiamo le risorse per supportare questo al momento.

:::warning
Se la tua chiesa ha membri nell'Unione Europea, tieni presente che ChurchApps attualmente non soddisfa i requisiti GDPR. Consulta il tuo consulente legale sugli obblighi di conformità prima di memorizzare dati di membri dell'UE.
:::
