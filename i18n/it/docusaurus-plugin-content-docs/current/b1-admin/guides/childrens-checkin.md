---
title: "Guida: Configurare il Check-In per il Ministero dei Bambini"
---

# Configurare il Check-In per il Ministero dei Bambini

<div class="article-intro">

Questa guida ti accompagna attraverso tutto il necessario per far funzionare un sistema di check-in per bambini nella tua chiesa — dall'inserimento delle famiglie nel database, alla configurazione di gruppi appropriati per età, alla stampa delle etichette con il nome la domenica mattina. Alla fine, i genitori potranno registrare i propri figli presso un tablet kiosk e ricevere un'etichetta di sicurezza corrispondente.

</div>

<div class="prereqs">
<h4>Prima di Iniziare</h4>

- Crea il tuo account della chiesa su [admin.b1.church](https://admin.b1.church)
- Assicurati di avere l'accesso amministratore — consulta [Ruoli e Permessi](../people/roles-permissions.md) se necessario
- Facoltativo: Prepara un file CSV delle famiglie se stai migrando da un altro sistema

</div>

## Passaggio 1: Aggiungi le Famiglie al Tuo Database

Prima che il check-in possa funzionare, il sistema deve conoscere le tue famiglie. Ogni bambino deve essere collegato a un genitore tramite la funzione nucleo familiare.

Segui la guida [Aggiungere Persone](../people/adding-people.md) per aggiungere almeno una famiglia. Assicurati di:

- Aggiungere prima il/i genitore/i
- Aggiungere ogni bambino
- Collegarli nello stesso nucleo familiare usando l'[editor del nucleo familiare](../people/adding-people.md#managing-households)

:::tip
Se hai più di qualche famiglia da aggiungere, usa lo strumento [Importazione CSV](../people/importing-data.md) invece di aggiungerle una per una. Puoi importare l'intera rubrica in pochi minuti.
:::

## Passaggio 2: Crea i Gruppi per Bambini

I gruppi definiscono le classi in cui i bambini fanno il check-in. Di solito vorrai un gruppo per ogni fascia d'età.

Segui la guida [Creare Gruppi](../groups/creating-groups.md) per creare gruppi come:

- **Asilo nido** (età 0–2)
- **Prescuola** (età 3–5)
- **Scuola elementare** (età 6–10)

Puoi adattare i nomi e le fasce d'età alla struttura del tuo ministero.

## Passaggio 3: Configura Campus e Servizi

Il check-in è legato a orari di servizio specifici. Hai bisogno di almeno un campus e un servizio configurati.

Segui la guida [Configurazione Presenze](../attendance/setup.md) per:

1. Aggiungere il tuo campus (es. "Campus Principale")
2. Aggiungere un servizio (es. "Culto della Domenica Mattina")
3. Impostare l'orario del servizio (es. "9:00")
4. Assegnare i tuoi gruppi per bambini al servizio

## Passaggio 4: Configura l'App di Check-In

Ora collega tutto installando l'app di check-in su un tablet.

1. Installa l'app **B1 Checkin** — consulta l'articolo [Check-In](../attendance/check-in.md) per i link di download
2. Accedi con le tue credenziali B1 Admin
3. Seleziona il tuo campus e l'orario del servizio

Consulta l'articolo completo [Check-In](../attendance/check-in.md) per i passaggi dettagliati di configurazione.

## Passaggio 5: Procurati l'Hardware

Hai bisogno di un tablet per il kiosk e opzionalmente di una stampante di etichette Brother per le targhette con il nome.

Come minimo:
- **Un tablet Android o Amazon Fire** — vedi [tablet consigliati](../attendance/check-in.md#recommended-hardware)
- **Una stampante di etichette Brother** — la QL-1110NWB è consigliata per il supporto Bluetooth e WiFi
- **Etichette Brother DK-1201** (1-1/7" x 3-1/2")

:::warning
Solo le stampanti di etichette Brother sono compatibili con l'app B1 Checkin. Altre marche di stampanti non funzioneranno.
:::

## Passaggio 6: Esegui un Check-In di Prova

Prima della domenica mattina, fai una prova:

1. Apri l'app B1 Checkin sul tuo tablet
2. Seleziona il tuo campus e l'orario del servizio corretto
3. Cerca una delle famiglie che hai aggiunto
4. Registra un bambino e verifica:
   - La presenza appare in B1 Admin sotto **Presenze**
   - Se stai usando una stampante, l'etichetta con il nome viene stampata correttamente

:::tip
Forma i volontari del team di accoglienza sul processo di check-in prima del lancio. Di solito basta una rapida sessione di 5 minuti.
:::

## Fatto!

Il check-in del ministero dei bambini è pronto. I genitori possono cercare la propria famiglia, selezionare i propri figli e registrarsi al kiosk. La presenza viene registrata automaticamente in B1 Admin.

## Articoli Correlati

- [Aggiungere Persone](../people/adding-people.md) — aggiungi altre famiglie quando visitano
- [Creare Gruppi](../groups/creating-groups.md) — gestisci i tuoi gruppi per bambini
- [Configurazione Presenze](../attendance/setup.md) — configura campus e servizi
- [Check-In](../attendance/check-in.md) — configurazione dettagliata dell'app di check-in e hardware
- [Monitoraggio Presenze](../attendance/tracking-attendance.md) — visualizza i report di check-in
