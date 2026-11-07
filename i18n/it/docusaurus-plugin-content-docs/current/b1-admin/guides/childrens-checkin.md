---
title: "Guida: configurare il check-in del ministero dei bambini"
description: "Imposta il check-in dei bambini in B1 Admin: collega le famiglie, crea gruppi per età, configura i culti e stampa i cartellini per il chiosco B1 Checkin."
---

# Configurare il check-in del ministero dei bambini

<div class="article-intro">

Questa guida ti accompagna in tutto ciò che serve per far funzionare un sistema di check-in per bambini nella tua chiesa: dall'inserimento delle famiglie nel database, alla configurazione dei gruppi per fasce d'età, fino alla stampa dei cartellini con il nome la domenica mattina. Alla fine, i genitori potranno registrare i propri figli su un tablet-chiosco e ricevere un tagliando di sicurezza corrispondente.

</div>

## Video di formazione

<YouTube id="Ep9CBUcJwPI" title="Configurare il check-in dei bambini in B1" next="Registrare e monitorare le presenze in B1" nextUrl="/docs/b1-admin/attendance/recording-attendance" />

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Crea l'account della tua chiesa su [admin.b1.church](https://admin.b1.church)
- Assicurati di avere l'accesso amministrativo -- vedi [Ruoli e permessi](../people/roles-permissions.md) se necessario
- Facoltativo: prepara un file CSV con le famiglie se stai migrando da un altro sistema

</div>

## Passo 1: aggiungere le famiglie al database

Prima che il check-in possa funzionare, il sistema deve conoscere le tue famiglie. Ogni bambino deve essere collegato a un genitore tramite la funzione dei nuclei familiari.

Segui la guida [Aggiungere persone](../people/adding-people.md) per aggiungere almeno una famiglia. Assicurati di:

- Aggiungere prima il/i genitore/i
- Aggiungere ogni figlio
- Collegarli nello stesso nucleo familiare usando l'[editor dei nuclei familiari](../people/adding-people.md#managing-households)

:::tip
Se hai più di qualche manciata di famiglie da aggiungere, usa lo strumento [Importazione CSV](../people/importing-data.md) invece di aggiungerle una per una. Puoi importare l'intera rubrica in pochi minuti.
:::

## Passo 2: creare i gruppi per i bambini

I gruppi definiscono le classi in cui i bambini effettuano il check-in. Di solito conviene avere un gruppo per ogni fascia d'età.

Segui la guida [Creare gruppi](../groups/creating-groups.md) per creare gruppi come:

- **Nido** (da 0 a 2 anni)
- **Scuola materna** (da 3 a 5 anni)
- **Elementari** (da 6 a 10 anni)

Puoi modificare i nomi e le fasce d'età per adattarli alla struttura del tuo ministero.

## Passo 3: configurare sedi e culti

Il check-in è legato a specifici orari dei culti. Ti serve almeno una sede e un culto configurati.

Segui la guida [Configurazione presenze](../attendance/setup.md) per:

1. Aggiungere la tua sede (ad esempio "Sede principale")
2. Aggiungere un culto (ad esempio "Culto della domenica mattina")
3. Impostare l'orario del culto (ad esempio "9:00") e, facoltativamente, una [pianificazione del check-in](../attendance/setup.md#setting-a-check-in-schedule) così il check-in si apre automaticamente prima di ogni culto e si chiude dopo
4. Assegnare al culto i gruppi dei bambini

## Passo 4: configurare l'app di check-in

Ora collega tutto installando l'app di check-in su un tablet.

1. Installa l'**app B1 Checkin** -- vedi l'articolo [Check-In](../attendance/check-in.md) per i link di download
2. Accedi con le tue credenziali di B1 Admin
3. Seleziona la tua sede e l'orario del culto

Vedi l'articolo completo [Check-In](../attendance/check-in.md) per i passaggi di configurazione dettagliati.

## Passo 5: procurarsi l'hardware

Ti serve un tablet per il chiosco e, facoltativamente, una stampante per etichette Brother per i cartellini con il nome.

Come minimo:
- **Un tablet Android o Amazon Fire** -- vedi [tablet consigliati](../attendance/check-in.md#recommended-hardware)
- **Una stampante per etichette Brother** -- il QL-1110NWB è consigliato per il supporto Bluetooth e WiFi
- **Etichette Brother DK-1201** (1-1/7" x 3-1/2")

:::warning
Solo le stampanti per etichette Brother sono compatibili con l'app B1 Checkin. Le altre marche non funzionano.
:::

## Passo 6: eseguire una prova di check-in

Prima della domenica mattina, fai una prova:

1. Apri l'app B1 Checkin sul tuo tablet
2. Seleziona la tua sede e l'orario del culto corretto
3. Cerca una delle famiglie che hai aggiunto
4. Effettua il check-in di un bambino e verifica:
   - Che la presenza compaia in B1 Admin, sotto **Presenze**
   - Se usi una stampante, che un cartellino con il nome venga stampato correttamente

:::tip
Prima del lancio, forma i volontari dell'équipe di accoglienza sulla procedura di check-in. Di solito basta una rapida spiegazione di 5 minuti.
:::

## Hai finito!

Il check-in del tuo ministero dei bambini è pronto. I genitori possono cercare la propria famiglia, selezionare i figli ed effettuare il check-in al chiosco. Le presenze vengono registrate automaticamente in B1 Admin.

## Articoli correlati

- [Aggiungere persone](../people/adding-people.md) -- aggiungi altre famiglie man mano che arrivano
- [Creare gruppi](../groups/creating-groups.md) -- gestisci i gruppi dei bambini
- [Configurazione presenze](../attendance/setup.md) -- configura sedi e culti
- [Check-In](../attendance/check-in.md) -- configurazione dettagliata dell'app di check-in e dell'hardware
- [Monitorare le presenze](../attendance/tracking-attendance.md) -- visualizza i report sul check-in
