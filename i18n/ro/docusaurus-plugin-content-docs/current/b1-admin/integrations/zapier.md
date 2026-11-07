---
title: "Zapier"
description: "Conectați B1 Admin la Zapier pentru automatizări la persoane noi, donații și membri de grup și scrieți înapoi înregistrări în B1, fără cod."
---

# Zapier

<div class="article-intro">

Aplicația oficială B1.church de pe Zapier vă permite ca un Zap să reacționeze la evenimentele din biserica dumneavoastră (persoană nouă, donație nouă, membru nou într-un grup, …) și să scrie înregistrări înapoi în B1. Nu necesită cod și nicio infrastructură: o configurați în editorul drag-and-drop al Zapier, lipiți o cheie API și porniți Zap-ul.

</div>

:::caution Se așteaptă aprobarea Zapier
Aplicația B1.church este construită și funcționează, dar încă așteaptă revizuirea Zapier înainte de a apărea public în directorul de aplicații al editorului Zap. Până la aprobare, doar conturile invitate o pot folosi. Tot ce urmează descrie modul în care va funcționa după aprobare.
:::

<div class="prereqs">
<h4>Înainte de a începe</h4>

- Un cont [Zapier](https://zapier.com) (nivelul gratuit este suficient pentru câteva Zap-uri)
- Un administrator al bisericii cu permisiunea **Edit Settings** în B1Admin (veți crea o cheie API)
- O idee despre ce doriți să realizați, de exemplu „când o persoană este adăugată în B1, să fie adăugată și pe lista mea Mailchimp”

</div>

## Declanșatori și acțiuni

| Tip | Ce face | Eveniment B1 / endpoint |
|---|---|---|
| **Declanșator** | Persoană nouă | `person.created` |
| **Declanșator** | Persoană actualizată | `person.updated` |
| **Declanșator** | Donație nouă | `donation.created` |
| **Declanșator** | Membru nou într-un grup | `group.member.added` |
| **Declanșator** | Trimitere nouă de formular | `form.submission.created` |
| **Acțiune** | Creează persoană | adaugă o persoană nouă |
| **Acțiune** | Adaugă donație | înregistrează o donație |
| **Acțiune** | Adaugă membru în grup | adaugă o persoană într-un grup |
| **Acțiune** | Găsește persoana | caută o persoană după id, e-mail sau nume; eșuează sarcina dacă nu se potrivește nimeni |

Combinați-le liber cu oricare dintre cele peste 7.000 de aplicații acceptate de Zapier.

## Configurare

### 1. Creați o cheie API B1

1. În B1Admin, mergeți la **Settings → Developer → API Keys**.
2. Faceți clic pe **New API Key**, dați-i un nume precum „Zapier” și selectați permisiunile (scopes) de care are nevoie Zap-ul.
3. **Important:** declanșatorii Zapier înregistrează un webhook în numele dumneavoastră atunci când Zap-ul este pornit, iar acest lucru necesită permisiunea **`settings:write`**. Includeți întotdeauna `settings:write` dacă oricare dintre Zap-urile dumneavoastră folosește un declanșator B1.
4. Acordați și permisiunile necesare acțiunilor. De exemplu, acțiunea „Adaugă donație” necesită `donations:write`, iar „Creează persoană” necesită `people:write`.
5. Salvați. Cheia completă `cak_…` este afișată **o singură dată**. Copiați-o.

### 2. Conectați Zapier la B1

1. În Zapier, creați un Zap nou.
2. Când alegeți pentru prima dată un declanșator sau o acțiune B1, Zapier vă cere să vă **conectați la B1.church**.
3. Lipiți cheia API de la pasul 1 și faceți clic pe **Yes, Continue**. Zapier o validează pentru biserica dumneavoastră.

Conexiunea este salvată în Zapier și este reutilizată de fiecare Zap din contul dumneavoastră.

### 3. Construiți Zap-ul

Alegeți un declanșator, apoi adăugați unul sau mai mulți pași de acțiune. Exemple mai jos.

## Rețete frecvente

### Adăugați persoanele noi din B1 în Mailchimp

- **Declanșator** — B1: Persoană nouă
- **Acțiune** — Mailchimp: Add/Update Subscriber. Mapați `name__first`, `name__last` și `contactInfo__email` din B1 în câmpurile First Name / Last Name / Email din Mailchimp.

### Publicați donațiile într-un canal Slack, cu un card mai bogat decât conectorul integrat

- **Declanșator** — B1: Donație nouă
- **Acțiune** — Slack: Send Channel Message. Compuneți orice layout (butoane, atașamente etc.) pe care nu îl poate realiza [conectorul Slack](./slack-discord.md) integrat.

### Adăugați membrii noi ai grupurilor într-un Google Group

- **Declanșator** — B1: Membru nou într-un grup (filtrat după un `groupId` specific)
- **Acțiune** — Filter by Zapier: continuați doar dacă grupul B1 este cel care vă interesează
- **Acțiune** — B1: Găsește persoana (folosiți `personId` din declanșator pentru a obține e-mailul)
- **Acțiune** — Google Groups: Add Member

### Trimiteți trimiterile de formulare către un instrument de urmărire a proiectelor

- **Declanșator** — B1: Trimitere nouă de formular
- **Acțiune** — Notion / Linear / Asana / Trello: Create page / issue / task

## Cum funcționează declanșatorii

Declanșatorii sunt **REST hooks**, nu sondaj periodic. Zapier nu interoghează B1 la fiecare 15 minute. Când porniți Zap-ul, Zapier cere B1 să înregistreze un webhook care indică spre un URL privat Zapier. Când evenimentul se produce, B1 trimite mesajul către Zapier, iar Zap-ul pornește **în câteva secunde**. Când opriți Zap-ul, Zapier cere B1 să șteargă webhook-ul, deci nu rămân abonamente orfane.

Aceasta înseamnă că declanșatorul se activează doar pentru evenimentele care au loc **după** ce Zap-ul este pornit. Nu există completare retroactivă: pornirea unui Zap nu reia donațiile de ieri.

## Limite și observații

- **Mai multe Zap-uri cu același declanșator** își înregistrează fiecare propriul webhook B1. Nu există conflict, dar merită știut dacă inspectați **Settings → Developer → Webhooks** și vă întrebați de ce apar trei rânduri identice „Zapier — donation.created”.
- **Date de test în configurarea Zap-ului**: când construiți un Zap, Zapier cere date de exemplu pentru maparea câmpurilor. Va prelua cel mai recent eveniment potrivit din B1, dacă există; altfel folosește un exemplu sintetic din definiția aplicației.
- **Erorile acțiunilor apar ca erori ale Zap-ului** în istoricul sarcinilor Zapier. Cauza frecventă: o cheie API fără permisiunea potrivită (de exemplu, acțiunea „Adaugă donație” necesită `donations:write`). Generați din nou cheia cu permisiunile corecte și reconectați-o în Zapier.
- **Cote de apeluri API externe**: fiecare apel API B1 făcut de o acțiune se contorizează în cota de sarcini Zapier, nu în ceva din partea B1.

## Depanare

- **„Authentication failed”** la conectare: cheia API este greșită, revocată sau îi lipsesc permisiunile necesare Zap-ului. Generați-o din nou în B1Admin cu cel puțin `settings:write` plus permisiunile de resurse atinse de Zap, apoi actualizați conexiunea.
- **Declanșatorul nu se activează niciodată**: verificați dacă webhook-ul a fost înregistrat cu adevărat. În B1Admin, **Settings → Developer → Webhooks** ar trebui să afișeze acum un rând numit „Zapier — &lt;event&gt;”. Dacă nu apare, cheia API probabil nu avea `settings:write` când ați pornit Zap-ul. Corectați cheia, opriți Zap-ul și porniți-l din nou.
- **Declanșatorul se activează de două ori**: Zapier redistribuie uneori evenimentul dacă confirmarea s-a pierdut. Folosiți un pas „Filter by Zapier” pe un id unic (de exemplu, `id`-ul persoanei) dacă aveți nevoie de deduplicare strictă.

## Vezi și

- [Make](./make.md) — același model, altă platformă
- [Slack și Discord](./slack-discord.md) — notificări simple în chat, fără Zapier
- [Webhooks (referință pentru dezvoltatori)](/docs/developer/api/webhooks)
