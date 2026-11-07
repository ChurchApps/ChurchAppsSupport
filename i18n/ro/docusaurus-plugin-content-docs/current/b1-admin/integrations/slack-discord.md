---
title: "Slack și Discord"
description: "Publicați în B1 Admin evenimente precum persoane noi, donații și formulare trimise pe un canal Slack sau Discord, printr-un webhook, fără Zapier."
---

# Slack și Discord

<div class="article-intro">

Trimiteți notificări ușor de citit de la B1 direct într-un canal Slack sau Discord: persoane noi, donații, înscrieri în grupuri, trimiteri de formulare, evenimente din calendar și multe altele. Nu este nevoie de un cont terț și nici de un Zap de întreținut: B1 transformă evenimentele în mesaje de chat și le trimite singur către URL-ul webhook al canalului.

</div>

<div class="prereqs">
<h4>Înainte de a începe</h4>

- Aveți nevoie de permisiunea **Edit Settings** în B1Admin
- Un administrator din spațiul de lucru Slack sau din serverul Discord trebuie să creeze Incoming Webhook-ul canalului
- Stabiliți ce canal doriți pentru notificări (puteți folosi același canal pentru mai multe tipuri de evenimente sau le puteți separa pe mai multe canale)

</div>

## Cum funcționează

B1 are un **Connector Type** integrat pentru platformele de chat. Când creați un webhook de tipul **Slack** sau **Discord**, motorul de webhook-uri își păstrează fluxul obișnuit de livrare, reîncercare și antete semnate, dar corpul trimis este reformatat din envelope-ul obișnuit B1 `{event,churchId,data}` într-un mesaj simplu `{text}` (Slack) sau `{content}` (Discord), pe care aceste servicii le așteaptă.

Serverele B1 nu contactează Slack pentru fiecare biserică în parte, în afara fluxului existent de webhook-uri de ieșire. Nu există nimic nou de găzduit și nimic suplimentar de plătit.

## Slack — pas cu pas

### 1. Obțineți un URL Incoming Webhook pentru Slack

1. Deschideți [api.slack.com/apps](https://api.slack.com/apps) în spațiul de lucru Slack în care doriți notificările.
2. Faceți clic pe **Create New App → From scratch**, denumiți aplicația ceva de genul „B1 Notifications” și alegeți spațiul de lucru.
3. În meniul din stânga alegeți **Incoming Webhooks** și comutați **Activate Incoming Webhooks** pe *On*.
4. Faceți clic pe **Add New Webhook to Workspace**, alegeți canalul (de exemplu `#donations`), apoi **Allow**.
5. Slack vă readuce pe pagină cu un **Webhook URL** nou, de forma `https://hooks.slack.com/services/T0XXXXXXX/B0YYYYYYY/zzz…`. Copiați-l: este singura informație de care are nevoie B1.

:::caution
Tratați URL-ul webhook Slack ca pe un secret. Oricine îl deține poate posta mesaje arbitrare în canal. Dacă îl expuneți din greșeală, regenerați-l din pagina aplicației Slack (regenerarea doar schimbă URL-ul; actualizați B1 ca să corespundă).
:::

### 2. Conectați-l în B1Admin

1. În B1Admin mergeți la **Settings → Developer → Webhooks**.
2. Faceți clic pe **New Webhook**.
3. Completați:
   - **Name**: un nume ușor de înțeles, de exemplu „Donații → #donations”. Îl vede doar echipa dumneavoastră.
   - **Connector Type**: alegeți **Slack**.
   - **Payload URL**: lipiți URL-ul Slack de la pasul 1.
   - **Events**: bifați evenimentele pe care doriți să le primiți ca mesaje. Pentru un canal de donații, doar `donation.created`. Pentru un canal #people, încercați `person.created` și `group.member.added`.
4. Faceți clic pe **Save**. Apare o fereastră „Signing Secret”. O puteți ignora pentru Slack (Slack nu verifică semnăturile B1) și o puteți închide.

### 3. Testați

Redeschideți webhook-ul din listă și faceți clic pe **Send Test Event**. În una-două secunde, un mesaj precum

> 💝 New donation: $50.00

apare în canalul dumneavoastră Slack, iar un rând nou apare în tabelul **Recent Deliveries** de pe același ecran, cu starea `succeeded`. Ați terminat.

## Discord — pas cu pas

### 1. Obțineți un URL webhook pentru Discord

1. În serverul Discord, treceți cu mouse-ul peste canalul pentru care doriți notificările și faceți clic pe **⚙ roata dințată** (Edit Channel).
2. Deschideți **Integrations → Webhooks → New Webhook**.
3. Dați-i un nume și, opțional, un avatar, apoi faceți clic pe **Copy Webhook URL**. Arată ca `https://discord.com/api/webhooks/123…/abc…`.

### 2. Conectați-l în B1Admin

Identic cu fluxul Slack de mai sus, cu excepția faptului că setați **Connector Type** pe **Discord**. Lipiți URL-ul Discord în **Payload URL** și salvați.

:::tip
**Nu** trebuie să adăugați `/slack` la finalul URL-ului Discord. B1 trimite payload-uri `{content}` native pentru Discord, nu compatibile cu Slack. Lipiți pur și simplu URL-ul primit de la Discord.
:::

### 3. Testați

Folosiți același buton **Send Test Event**. Discord afișează mesajul în canalul ales, iar jurnalul de livrare trece pe `succeeded`.

## Cum arată mesajele

| Eveniment | Exemplu de mesaj |
|---|---|
| `person.created` | 👤 Persoană nouă adăugată: Jordan Rivera |
| `person.updated` | 👤 Persoană actualizată: Jordan Rivera |
| `group.created` | 👥 Grup nou creat: Studiu biblic de marți |
| `group.member.added` | ➕ Cineva a fost adăugat într-un grup |
| `donation.created` | 💝 Donație nouă: $50.00 |
| `donation.updated` | 💝 Donație actualizată: $75.00 |
| `attendance.recorded` | ✅ Prezență înregistrată |
| `form.submission.created` | 📝 Formular nou trimis |
| `event.created` | 📅 Eveniment nou: Slujba de Paște |

Lista completă se află în [catalogul de evenimente webhook](/docs/developer/api/webhooks#event-catalog). Orice eveniment de acolo poate fi direcționat către Slack sau Discord.

## Un canal pentru fiecare subiect

Nu trebuie să puneți toate evenimentele în același loc. Majoritatea bisericilor configurează câteva webhook-uri:

- Un canal **#donations** care ascultă doar `donation.created`
- Un canal **#new-people** pentru `person.created` și `group.member.added`
- Un canal **#admin-alerts** pentru lucruri cu volum mic, precum `form.submission.created`

Nu există o limită privind numărul de webhook-uri pentru o biserică. Fiecare este independent: ștergerea sau dezactivarea unuia nu afectează celelalte.

## Verificarea livrărilor

Tabelul **Recent Deliveries** din editorul de webhook-uri arată ultimele 50 de încercări. Faceți clic pe un rând ca să vedeți payload-ul exact trimis și răspunsul primit. Pentru un conector Slack, payload-ul este `{"text":"💝 New donation: $50.00"}`, nu envelope-ul brut `{event,churchId,...}`, pentru că B1 îl reformatează înainte de livrare.

Dacă ceva a eșuat (o insignă roșie `failed` sau `exhausted`), fereastra afișează codul HTTP și corpul răspunsului, ca să vedeți exact ce nu a acceptat Slack sau Discord. De obicei este o greșeală de copiere-lipire în URL.

## Depanare

- **Nu apare niciun mesaj și starea livrării este `400`**: de obicei, **Connector Type** este setat pe **Standard**, dar URL-ul este de Slack sau Discord. Slack și Discord resping envelope-ul brut. Schimbați lista la **Slack** sau **Discord** și retrimiteți testul.
- **Webhook dezactivat automat**: după 3 livrări consecutive eșuate, B1 oprește webhook-ul. Corectați URL-ul (sau rotiți-l în Slack/Discord) și activați din nou **Active**.
- **Mesajul ajunge, dar lipsesc detalii**: fiecare platformă de chat limitează dimensiunea mesajelor. Mesajele B1 sunt intenționat scurte; pentru notificări mai bogate, folosiți [Zapier](./zapier.md) sau [Make](./make.md) ca să compuneți un mesaj Slack mai complet prin acțiunile lor pentru Slack.

## Schimbarea tipului de conector mai târziu

Puteți schimba Connector Type pentru un webhook existent. Modificarea se aplică la următoarea livrare. Dacă treceți de la Slack la Standard, direcționați URL-ul către propriul endpoint HTTPS. Aceeași signing secret (emisă la crearea webhook-ului) poate fi folosită atunci pentru a verifica envelope-ul brut.

## Vezi și

- [Zapier](./zapier.md): pentru fluxuri de lucru cu mai mulți pași, declanșate de evenimentele B1
- [Make](./make.md): constructor de scenarii vizual
- [Webhook-uri (referință pentru dezvoltatori)](/docs/developer/api/webhooks): formatul complet al payload-ului și al semnăturii, dacă vreodată direcționați un webhook către propriul server
