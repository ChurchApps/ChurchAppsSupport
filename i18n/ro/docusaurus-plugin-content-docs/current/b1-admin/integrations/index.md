---
title: "Integrări"
description: "Conectați B1 Admin la Slack, Discord, Zapier, Make, Google Sheets și asistenți AI precum Claude, cu pași de configurare și scopurile cheii API necesare."
---

# Integrări

<div class="article-intro">

B1 se conectează la instrumentele pe care echipa ta le folosește deja. Conectează Slack sau Discord pentru notificările echipei, automatizează fluxurile în Zapier sau Make sau exportă date la cerere în Google Sheets, fără să plătești o platformă de integrare separată și fără ca ChurchApps să găzduiască ceva în plus. Fiecare integrare rulează pe infrastructura proprie a terței părți și comunică cu biserica ta prin webhook-urile sau REST API-ul B1.

</div>

## Ce este disponibil

| Integrare | Ce face | Direcție | Efort de configurare |
|---|---|---|---|
| **[Slack](./slack-discord.md)** | Postează notificări ușor de citit (persoane noi, donații, înscrieri, …) într-un canal Slack | B1 → Slack | 2 minute |
| **[Discord](./slack-discord.md)** | Același lucru, într-un canal Discord | B1 → Discord | 2 minute |
| **[Zapier](./zapier.md)** | Folosește evenimentele B1 drept declanșatoare și acțiunile B1 în oricare dintre cele peste 7.000 de aplicații Zapier | Ambele sensuri | 5–10 min per Zap |
| **[Make](./make.md)** | Aceeași idee ca Zapier, în editorul vizual de scenarii Make | Ambele sensuri | 5–10 min per scenariu |
| **[Google Sheets](./google-sheets.md)** | Exportă Persoane / Donații / Grupuri / Prezență într-o foaie de calcul, la cerere | B1 → Foaie de calcul | 5 minute |
| **[Claude](./claude.md)** | Pune întrebări Claude de la Anthropic despre datele bisericii tale, în limita permisiunilor tale — poate fi încercat gratuit, recomandat | Ambele sensuri | Sub 3 minute |
| **[ChatGPT](./chatgpt.md)** | Aceeași idee, cu ChatGPT de la OpenAI (necesită un abonament ChatGPT plătit) | Ambele sensuri | 10 minute |
| **[Servicii conectate](./services/index.md)** | Rețete selectate pentru Mailchimp, Donorbox, Subsplash, VOMO, Clearstream, Text In Church, Mobile Message, Checkr | Variabil | 5–10 min fiecare |

## Cum alegi

- **Vrei doar o notificare în chat?** Folosește **Slack** sau **Discord** — fără cont la o terță parte, fără Zap de întreținut. Se configurează complet din B1Admin.
- **Vrei să automatizezi ceva între aplicații** (de exemplu „când cineva donează, adaugă-l pe lista mea Mailchimp și în #donations de pe Slack”)? Folosește **Zapier** sau **Make**. Zapier este mai prietenos; Make este mai ieftin la scară mare și are o logică mai flexibilă.
- **Ai nevoie de o extragere unică de date sau de un raport programat?** Folosește **Google Sheets** — lipește o cheie API în bara laterală a add-on-ului și apasă Export.
- **Vrei să pui întrebări în limbaj natural** („câți vizitatori noi au fost duminica trecută?”, „rezumă donațiile din luna aceasta”)? Începe cu **[Claude](./claude.md)** — poate fi încercat gratuit și se configurează în mai puțin de 3 minute. **[ChatGPT](./chatgpt.md)** funcționează și el, cu un abonament plătit. Claude se conectează prin autentificare cu contul tău B1; ChatGPT folosește o cheie API B1.
- **Construiești o integrare personalizată proprie?** Niciuna dintre cele de mai sus — vorbește direct cu [REST API](/docs/developer/api) folosind o [cheie API](/docs/developer/api/api-keys) sau abonează un server pe care îl controlezi la [webhook-uri](/docs/developer/api/webhooks).

## Ce au în comun

Fiecare integrare se autentifică cu o **cheie API B1**, creată în B1Admin la **Settings → Developer → API Keys**. Cheia:

- Este legată de o persoană anume din biserica ta și moștenește permisiunile acelei persoane
- Poate fi restrânsă prin **scope-uri** — de exemplu, un export în Google Sheets are nevoie doar de `people:read`, nu de `settings:write`
- Poate fi revocată oricând, oprind imediat accesul integrării fără să afecteze altceva

Câțiva conectori (Zapier, Make) înregistrează și ei un [webhook](/docs/developer/api/webhooks) în numele tău când Zap-ul sau scenariul este activat și îl șterg când îl dezactivezi — nu trebuie să gestionezi tu URL-ul webhook-ului.

:::tip
Pentru ca Zapier și Make să înregistreze automat webhook-urile, cheia API trebuie să aibă scope-ul **`settings:write`** (plus scope-urile de resurse pentru ceea ce atinge integrarea). O cheie doar-citire funcționează pentru acțiuni și exporturi, dar nu și pentru declanșatoare.
:::

## Costuri

ChurchApps este gratuit și open-source. Slack/Discord, [`@churchapps/integration-sdk`](https://www.npmjs.com/package/@churchapps/integration-sdk) și conectorii oficiali pentru Zapier / Make / Google Sheets sunt și ei gratuiți din partea noastră. Terții pot percepe taxe pentru propriile platforme (Zapier și Make au planuri gratuite generoase; Slack, Discord și Google Sheets sunt gratuite pentru acest scop).

## Construirea propriei integrări

Dacă niciuna dintre cele de mai sus nu se potrivește, fiecare suprafață B1 este deschisă:

- **[REST API](/docs/developer/api)** — apelează B1 din orice limbaj de programare, cu un header `Authorization: Bearer cak_…`
- **[Webhooks](/docs/developer/api/webhooks)** — abonează un endpoint HTTPS public la unul sau mai multe tipuri de evenimente și primești payload-uri JSON semnate
- **[OAuth + Connected Apps](/docs/developer/api/connected-apps)** — dacă construiești un produs SaaS folosit de multe biserici

## Pașii următori

- [Slack & Discord](./slack-discord.md) — trimite notificări în chat
- [Zapier](./zapier.md) — conectează-te la peste 7.000 de aplicații
- [Make](./make.md) — automatizare vizuală a fluxurilor de lucru
- [Google Sheets](./google-sheets.md) — exportă în foi de calcul
- [Claude](./claude.md) — întreabă Claude de la Anthropic despre datele bisericii tale
- [ChatGPT](./chatgpt.md) — întreabă ChatGPT de la OpenAI despre datele bisericii tale
- [Servicii conectate](./services/index.md) — rețete pentru fiecare serviciu (Mailchimp, Donorbox, Clearstream, …)
