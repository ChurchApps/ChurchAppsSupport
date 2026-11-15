---
title: "Guida: configurare il check-in del ministero dei bambini"
description: "Configura il check-in dei bambini in B1 Admin: collega le famiglie, crea gruppi per fascia d'età, configura i culti e stampa i cartellini per il kiosk B1 Checkin."
---

# Configurare il check-in del ministero dei bambini

<div class="article-intro">

Questa guida ti accompagna in tutto ciò che serve per avviare un sistema di check-in per i bambini nella tua chiesa -- dall'inserimento delle famiglie nel database, alla configurazione di gruppi adatti alle diverse età, fino alla stampa dei cartellini la domenica mattina. Alla fine, i genitori potranno registrare i figli su un tablet kiosk e ricevere un tagliando di sicurezza corrispondente.

</div>

## Video di formazione {#training-video}

<YouTube id="Ep9CBUcJwPI" title="Configurare il check-in dei bambini in B1" next="Registrare e monitorare le presenze in B1" nextUrl="/docs/b1-admin/attendance/recording-attendance" />

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Crea l'account della tua chiesa su [admin.b1.church](https://admin.b1.church)
- Assicurati di avere l'accesso da amministratore -- consulta [Ruoli e permessi](../people/roles-permissions.md) se necessario
- Facoltativo: prepara un file CSV con le famiglie se stai migrando da un altro sistema

</div>

## Passo 1: aggiungi le famiglie al database {#step-1-add-families-to-your-database}

Prima che il check-in possa funzionare, il sistema deve conoscere le tue famiglie. Ogni bambino deve essere collegato a un genitore tramite la funzione dei nuclei familiari.

Segui la guida [Aggiungere persone](../people/adding-people.md) per aggiungere almeno una famiglia. Assicurati di:

- Aggiungere prima il genitore (o i genitori)
- Aggiungere ogni figlio
- Collegarli nello stesso nucleo familiare usando l'[editor dei nuclei familiari](../people/adding-people.md#managing-households)

:::tip
Se hai più di una manciata di famiglie da aggiungere, usa lo strumento [Importazione CSV](../people/importing-data.md) invece di aggiungerle una per una. Puoi importare l'intera rubrica in pochi minuti.
:::

## Passo 2: crea i gruppi dei bambini {#step-2-create-childrens-groups}

I gruppi definiscono le classi in cui i bambini si registrano. Di solito conviene avere un gruppo per ogni fascia d'età.

Segui la guida [Creare gruppi](../groups/creating-groups.md) per creare gruppi come:

- **Nido** (0-2 anni)
- **Scuola materna** (3-5 anni)
- **Scuola elementare** (6-10 anni)

Puoi modificare i nomi e le fasce d'età per adattarli alla struttura del tuo ministero. Poi apri le impostazioni di ciascun gruppo (fai clic su **Modifica** nella pagina del gruppo) e:

- Imposta **Traccia presenze** su **Sì**, così il gruppo può ricevere check-in
- Attiva **Stampa cartellino** (e **Ritiro dai genitori** se stampi i tagliandi di ritiro)
- Facoltativamente imposta i limiti di **Età e classe** così il kiosk suggerisce l'aula giusta -- vedi [Sicurezza del check-in](../attendance/checkin-safety.md)

## Passo 3: configura campus e culti {#step-3-configure-campuses-and-services}

Il check-in è collegato a orari di culto specifici. Ti serve almeno un campus e un culto configurati.

Segui la guida [Configurazione Presenze](../attendance/setup.md) per:

1. Andare su **Persone > Presenze** e fare clic su **Configurazione**
2. Aggiungere il tuo campus (ad esempio "Campus principale")
3. Aggiungere un culto (ad esempio "Culto della domenica mattina")
4. Aggiungere l'orario del culto (ad esempio "9:00") e, facoltativamente, un [programma di check-in](../attendance/setup.md#setting-a-check-in-schedule) così il check-in si apre automaticamente prima di ogni culto e si chiude dopo
5. Collegare ogni gruppo di bambini all'orario del culto: apri il gruppo, fai clic su **Modifica**, scegli l'orario in **Aggiungi orario del culto** e fai clic sul pulsante più

## Passo 4: configura l'app di check-in {#step-4-set-up-the-check-in-app}

Ora collega tutto installando l'app di check-in su un tablet.

1. Installa l'**app B1 Checkin** -- vedi l'articolo [Check-In](../attendance/check-in.md) per i link di download
2. Accedi con un account che abbia il permesso di presenze **Checkin** (oppure **Modifica presenze**) -- vedi [Account kiosk per il check-in](../settings/roles-permissions.md#check-in-kiosk-accounts)
3. Seleziona il tuo campus e l'orario del culto

Vedi l'articolo completo [Check-In](../attendance/check-in.md) per i passaggi dettagliati di configurazione.

## Passo 5: procurati l'hardware {#step-5-get-your-hardware}

Ti serve un tablet per il kiosk e, facoltativamente, una stampante per etichette Brother per i cartellini con il nome.

Come minimo:
- **Un tablet iPad, Android o Amazon Fire** -- vedi [tablet consigliati](../attendance/check-in.md#recommended-hardware)
- **Una stampante per etichette Brother** -- la QL-1110NWB è consigliata per il supporto Bluetooth e WiFi
- **Etichette Brother DK-1201** (1-1/7" x 3-1/2")

:::warning
Solo le stampanti per etichette Brother sono compatibili con l'app B1 Checkin. Le altre marche non funzionano.
:::

## Passo 6: esegui una prova di check-in {#step-6-run-a-test-check-in}

Prima della domenica mattina, fai una prova:

1. Apri l'app B1 Checkin sul tablet
2. Seleziona il tuo campus e l'orario del culto corretto
3. Cerca una delle famiglie che hai aggiunto
4. Registra un bambino e verifica che:
   - La presenza compaia in B1 Admin, in **Persone > Presenze**
   - Se usi una stampante, un cartellino venga stampato correttamente

:::tip
Prima del lancio, forma i volontari dell'accoglienza sulla procedura di check-in. Di solito basta una breve dimostrazione di 5 minuti.
:::

## Hai finito! {#youre-done}

Il check-in del tuo ministero dei bambini è pronto. I genitori possono cercare la propria famiglia, selezionare i figli e registrarli al kiosk. Le presenze vengono registrate automaticamente in B1 Admin.

## Articoli correlati {#related-articles}

- [Aggiungere persone](../people/adding-people.md) -- aggiungi altre famiglie quando vengono in visita
- [Creare gruppi](../groups/creating-groups.md) -- gestisci i gruppi dei bambini
- [Configurazione Presenze](../attendance/setup.md) -- configura campus e culti
- [Check-In](../attendance/check-in.md) -- configurazione dettagliata dell'app di check-in e dell'hardware
- [Monitorare le presenze](../attendance/tracking-attendance.md) -- consulta i report sui check-in
