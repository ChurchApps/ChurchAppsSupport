---
title: "Check-In"
---

# Check-In

<div class="article-intro">

B1 Admin supporta il check-in autonomo durante i servizi tramite l'app companion **B1 Checkin**. I membri possono registrare se stessi e le loro famiglie presso chioschi o dispositivi dedicati al loro arrivo, rendendo il processo veloce e riducendo il carico di lavoro dei tuoi volontari. Ogni check-in viene automaticamente registrato come presenza.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Le tue sedi, gli orari dei servizi e i gruppi devono essere configurati nella [Configurazione presenze](setup.md).
- Hai bisogno di [persone nel tuo database](../people/adding-people.md) con [nuclei familiari](../people/adding-people.md#managing-households) configurati affinché le famiglie possano registrarsi insieme.
- Avrai bisogno di un tablet e opzionalmente di una stampante per etichette Brother (vedi [hardware consigliato](#recommended-hardware) di seguito).

</div>

## Come funziona

L'app B1 Checkin si connette alla configurazione delle presenze di B1 Admin. Quando un membro effettua il check-in, la sua presenza viene automaticamente registrata per la sede, l'orario di servizio e il gruppo corretti. Non è necessario inserire manualmente le presenze per chiunque utilizzi il sistema di check-in.

## Configurazione del check-in

1. **Configura prima la tua struttura delle presenze.** In B1 Admin, vai su **Attendance > Setup** e assicurati che le tue sedi, gli orari dei servizi e i gruppi siano configurati. L'app di check-in si basa su questa configurazione. Consulta [Configurazione presenze](setup.md) per i dettagli.
2. **Installa l'app B1 Checkin** sui dispositivi che intendi utilizzare. L'app è disponibile sulle seguenti piattaforme:
   - **Tablet Android/Samsung:** [Google Play Store](https://play.google.com/store/apps/details?id=church.b1.checkin)
   - **Tablet Amazon Fire:** [Amazon App Store](https://www.amazon.com/Live-Church-Solutions-B1-Check-In/dp/B0FW5HKRB5/)
3. **Accedi all'app B1 Checkin** utilizzando le credenziali dell'account della tua chiesa.
4. **Seleziona la sede e l'orario di servizio** per la riunione corrente.
5. I membri possono ora cercare il proprio nome sul dispositivo e registrarsi.

:::tip
Posiziona i dispositivi di check-in in luoghi visibili e facilmente accessibili come gli ingressi della hall o i banchi di accoglienza. Un breve annuncio durante i servizi aiuta i membri a sapere che l'opzione è disponibile.
:::

:::tip
Se la tua chiesa ha più sedi, dovrai ripetere la configurazione per ogni sede nella [Configurazione presenze](setup.md). Ogni dispositivo di check-in può essere configurato per una sede diversa.
:::

## Hardware consigliato

**Tablet** — tutti questi funzionano bene con l'app:

- **Compatto:** Samsung Galaxy Tab A7 Lite 8.7"
- **Schermo grande:** Samsung Galaxy Tab A8 10.5"
- **Economico:** Amazon Fire HD 10

**Stampanti** — i check-in funzionano con le stampanti per etichette Brother per la stampa dei badge nominativi:

- **Migliore:** Brother QL-1110NWB (supporta più tablet tramite Bluetooth e WiFi)
- **Buono:** Brother QL-810W (supporta più tablet tramite WiFi)
- **Economico:** Brother QL-1100 (solo WiFi)

**Etichette:** Brother DK-1201 (1-1/7" x 3-1/2")

:::warning
Solo le stampanti per etichette Brother sono compatibili con l'app B1 Checkin. Altre marche di stampanti non funzioneranno per la stampa dei badge nominativi.
:::

:::info
Segui le istruzioni di configurazione della tua stampante per collegarla alla stessa rete WiFi del tuo tablet. Puoi trovare i driver e le guide di configurazione delle stampanti Brother sul [sito di supporto Brother](https://support.brother.com).
:::

## Cosa viene registrato

Ogni check-in crea un record di presenza in B1 Admin. Puoi visualizzare questi record nelle schede [Presenze](tracking-attendance.md) e [Gruppi](../groups/group-members.md) proprio come le presenze inserite manualmente. Non c'è differenza nel modo in cui i dati vengono visualizzati — entrambi i metodi alimentano gli stessi report.
