# Struttura dei moduli

<div class="article-intro">

Ogni modulo API segue una struttura interna coerente con controller, repository, modelli e helper. Comprendere questo layout rende semplice navigare nella codebase e aggiungere nuove funzionalità a qualsiasi modulo.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Imposta l'API localmente -- vedi [Configurazione locale dell'API](./local-setup)
- Rivedi l'architettura [Database](./database) per comprendere il livello di accesso ai dati

</div>

## Layout della directory

I moduli vivono sotto `src/modules/{name}/`. Un modulo tipico contiene quattro directory:

```
src/modules/{name}/
├── controllers/    <- Gestori di percorsi (endpoint Express)
├── repositories/   <- Livello di accesso ai dati (query SQL tipizzate)
├── models/         <- Interfacce e tipi TypeScript
└── helpers/        <- Logica aziendale specifica del modulo
```

## Articoli correlati

- **[Database](./database)** -- Stringhe di connessione, script di schema e pattern di accesso ai dati
- **[Configurazione locale dell'API](./local-setup)** -- Guida completa passo dopo passo
- **[ApiHelper](../shared-libraries/api-helper)** -- La libreria condivisa che fornisce `CustomBaseController` e middleware di autenticazione
