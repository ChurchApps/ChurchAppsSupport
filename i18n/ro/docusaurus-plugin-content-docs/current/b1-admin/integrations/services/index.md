---
title: "Servicii conectate"
---

# Servicii conectate

<div class="article-intro">

Cea mai rapidă modalitate de a conecta B1 cu un alt instrument tehnologic pentru biserici este, de obicei, o rețetă Zapier sau Make. Nu ai nevoie de o infrastructură nouă pentru B1, iar fluxul de lucru este găzduit de terța parte. Această pagină este o listă selectată de servicii despre care am confirmat că pot fi conectate astăzi, cu un ghid scurt de configurare, pe care îl poți copia și lipi, pentru fiecare.

</div>

## Pe scurt

| Serviciu | Categorie | Punte | Ce poți conecta |
|---|---|---|---|
| [Mailchimp](./mailchimp) | E-mail | Zapier sau Make | Sincronizează persoanele și donatorii noi din B1 într-o audiență Mailchimp |
| [Donorbox](./donorbox) | Donații | Zapier | Trimite donațiile și donatorii din Donorbox înapoi în B1 |
| [Subsplash](./subsplash) | Aplicație / Donații | Zapier | Aduce donațiile și persoanele din Subsplash în B1 |
| [VOMO](./vomo) | Voluntariat | Zapier | Sincronizează înscrierile voluntarilor între grupurile B1 și proiectele VOMO |
| [Clearstream](./clearstream) | SMS | Zapier | Declanșează un mesaj text Clearstream din evenimentele B1; preia răspunsurile ca înregistrări B1 |
| [Text In Church](./text-in-church) | SMS / Fluxuri de lucru | Zapier | Declanșează fluxurile Text In Church din B1; primește date din Connect Card |
| [Mobile Message](./mobile-message) | SMS (AU) | Webhooks by Zapier sau Make | Trimite SMS din orice eveniment B1 |
| [Checkr](./checkr) | Verificări de fundal | Make | Pornește o verificare de fundal când cineva se alătură unei echipe de slujire |

## Ce au în comun toate acestea

1. **Partea B1 a conexiunii este identică**: creează o cheie API cu scope-urile potrivite în **B1Admin → Settings → Developer → API Keys**, apoi fie lasă puntea să înregistreze un webhook pentru declanșator (Zapier și Make fac asta automat și necesită `settings:write`), fie apelează punctele finale REST ale B1 dintr-o acțiune ulterioară.
2. **Puntea te taxează pe tine, nu pe noi.** ChurchApps este gratuit. Zapier și Make au ambele planuri gratuite, care acoperă câteva rețete.
3. **Poți testa conexiunea fără să intri în producție.** Ambele punți au un buton „Test step”, care declanșează o dată evenimentul în B1 și îți arată structura datelor înainte să activezi rețeta.

## Alegerea unei punți

- **Zapier** este mai prietenos și are un catalog mai mare de aplicații. Folosește-l ca implicit, dacă costul nu este o problemă.
- **Make** este mai ieftin la scară mare și are o logică de rutare și filtrare mai flexibilă. Folosește-l când un singur flux de lucru are ramificări, condiții sau mulți pași.
- **Webhooks by Zapier** (folosit în documentația Mobile Message) este un adaptor generic care îți permite să trimiți POST către orice punct final HTTP dintr-un Zap, atunci când destinația nu este o aplicație Zapier de primă clasă.

Dacă vrei ceva ce nu apare în această listă, [API-ul REST](/docs/developer/api) și [webhook-urile](/docs/developer/api/webhooks) ale B1 sunt deschise. Poți construi o punte personalizată cu [`@churchapps/integration-sdk`](https://www.npmjs.com/package/@churchapps/integration-sdk) în câteva ore.

## Ce nu apare aici (și de ce)

Mai multe instrumente populare pentru biserici (Tithe.ly, Pushpay, Vanco, PastorsLine, Gloo, Notebird, KidCheck, MinistrySafe) nu au, în prezent, o aplicație Zapier publicată sau un modul Make. Au propriile API-uri, dar conectarea lor la B1 este o sarcină de cod personalizat, nu o rețetă, așa că nu se încadrează în această listă. Dacă un furnizor adaugă o aplicație Zapier sau un modul Make, vom adăuga documentația.

Am exclus, de asemenea, în mod deliberat instrumentele specifice Planning Center-Services (muzică, prezentare), produsele ChMS concurente, consultanții de migrare și instrumentele care doar curăță datele specifice PCO. Niciunul dintre ele nu are o cale utilă de conectare la B1.

## Vezi și

- [Zapier (prezentare generală)](../zapier): partea B1 a fiecărei rețete Zapier este identică, iar această documentație o acoperă o singură dată
- [Make (prezentare generală)](../make): la fel pentru scenariile Make
- [Slack & Discord](../slack-discord): notificări în chat, fără nicio punte
- [Google Sheets](../google-sheets): exporturi la cerere
- [Webhook-uri (referință pentru dezvoltatori)](/docs/developer/api/webhooks): catalogul de evenimente de care depind toate rețetele
