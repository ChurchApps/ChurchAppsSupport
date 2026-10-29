---
title: "Guida: Configurare il check-in del ministero dei bambini"
---

# Configurare il check-in del ministero dei bambini

<div class="article-intro">

Questa guida ti accompagna in tutto ciò che serve per avviare un sistema di check-in per i bambini nella tua chiesa — dall'inserimento delle famiglie nel database, alla configurazione dei gruppi per fascia d'età, fino alla stampa dei cartellini con il nome la domenica mattina. Alla fine, i genitori potranno registrare i figli su un tablet kiosk e ricevere un tagliando di sicurezza corrispondente.

</div>

## Video tutorial

<YouTube id="Ep9CBUcJwPI" title="Configurare il check-in dei bambini in B1" next="Registrare e tracciare le presenze in B1" nextUrl="/docs/b1-admin/attendance/recording-attendance" />

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Crea il tuo account della chiesa su [admin.b1.church](https://admin.b1.church)
- Assicurati di avere l'accesso amministratore — vedi [Ruoli e permessi](../people/roles-permissions.md) se necessario
- Facoltativo: prepara un file CSV con le famiglie se stai migrando da un altro sistema

</div>

## Passaggio 1: aggiungi le famiglie al database

Prima che il check-in possa funzionare, il sistema deve conoscere le tue famiglie. Ogni bambino deve essere collegato a un genitore tramite la funzione di nucleo familiare.

Segui la guida [Aggiungere persone](../people/adding-people.md) per aggiungere almeno una famiglia. Assicurati di:

- Aggiungere prima il genitore o i genitori
- Aggiungere ogni figlio
- Collegarli nello stesso nucleo familiare usando l'[editor del nucleo familiare](../people/adding-people.md#managing-households)

:::tip
Se hai più di qualche famiglia da inserire, usa lo strumento [Importazione CSV](../people/importing-data.md) invece di aggiungerle una per una. Puoi importare l'intera anagrafica in pochi minuti.
:::

## Passaggio 2: crea i gruppi per i bambini

I gruppi definiscono le classi in cui i bambini effettuano il check-in. Di solito conviene avere un gruppo per ogni fascia d'età.

Segui la guida [Creare gruppi](../groups/creating-groups.md) per creare gruppi come:

- **Nido** (0–2 anni)
- **Prescolare** (3–5 anni)
- **Elementari** (6–10 anni)

Puoi modificare i nomi e le fasce d'età in base alla struttura del tuo ministero.

## Passaggio 3: configura sedi e servizi

Il check-in è legato a orari di culto specifici. Devi avere configurati almeno una sede e un servizio.

Segui la guida [Configurazione delle presenze](../attendance/setup.md) per:

1. Aggiungere la tua sede (ad esempio "Sede principale")
2. Aggiungere un servizio (ad esempio "Domenica mattina")
3. Impostare l'orario del servizio (ad esempio "9:00") e, facoltativamente, una [pianificazione del check-in](../attendance/setup.md#setting-a-check-in-schedule) così che il check-in si apra automaticamente prima di ogni servizio e si chiuda dopo
4. Assegnare al servizio i gruppi dei bambini

## Passaggio 4: configura l'app di check-in

Ora collega tutto installando l'app di check-in su un tablet.

1. Installa l'**app B1 Checkin** — vedi l'articolo [Check-In](../attendance/check-in.md) per i link di download
2. Accedi con le tue credenziali di B1 Admin
3. Seleziona la sede e l'orario del servizio

Consulta l'articolo completo [Check-In](../attendance/check-in.md) per i passaggi dettagliati di configurazione.

## Passaggio 5: procurati l'hardware

Ti serve un tablet per il kiosk e, facoltativamente, una stampante per etichette Brother per i cartellini con il nome.

Come minimo:

- **Un tablet Android o Amazon Fire** — vedi [tablet consigliati](../attendance/check-in.md#recommended-hardware)
- **Una stampante per etichette Brother** — la QL-1110NWB è consigliata per il supporto Bluetooth e WiFi
- **Etichette Brother DK-1201** (1-1/7" x 3-1/2")

:::warning
Solo le stampanti per etichette Brother sono compatibili con l'app B1 Checkin. Le stampanti di altre marche non funzioneranno.
:::

## Passaggio 6: esegui una prova di check-in

Prima della domenica mattina, fai una prova:

1. Apri l'app B1 Checkin sul tablet
2. Seleziona la sede e l'orario corretto del servizio
3. Cerca una delle famiglie che hai inserito
4. Registra il check-in di un bambino e verifica:
   - che la presenza compaia in B1 Admin alla voce **Presenze**
   - se usi una stampante, che il cartellino con il nome venga stampato correttamente

:::tip
Prima del lancio, forma i volontari del team di accoglienza sulla procedura di check-in. Di solito basta un breve briefing di 5 minuti.
:::

## Hai finito!

Il check-in del ministero dei bambini è pronto. I genitori possono cercare la propria famiglia, selezionare i figli e registrarsi al kiosk. Le presenze vengono registrate automaticamente in B1 Admin.

## Articoli correlati

- [Aggiungere persone](../people/adding-people.md) — aggiungi altre famiglie man mano che arrivano
- [Creare gruppi](../groups/creating-groups.md) — gestisci i gruppi dei bambini
- [Configurazione delle presenze](../attendance/setup.md) — configura sedi e servizi
- [Check-In](../attendance/check-in.md) — configurazione dettagliata dell'app di check-in e dell'hardware
- [Tracciare le presenze](../attendance/tracking-attendance.md) — consulta i report di check-in
