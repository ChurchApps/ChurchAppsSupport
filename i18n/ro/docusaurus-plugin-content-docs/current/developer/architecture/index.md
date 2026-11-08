---
title: "Arhitectură"
description: "Hărți ale sistemelor din mai multe depozite, care arată cum funcționează donațiile, check-in-urile, notificările și site-urile web în B1 Admin, B1.church și Api, înainte să le modificați."
---

# Arhitectură

<div class="article-intro">

Aceste pagini sunt hărți ale sistemelor din mai multe depozite. Ele documentează cum funcționează de la un capăt la altul un sistem central ChurchApps, prin aplicații, modulele Api și bibliotecile partajate, și nu cum este configurat un anumit proiect. Citiți-le înainte de a modifica comportamentul unui sistem. Citiți [Configurare](../setup/index.md) pentru a porni un proiect și [secțiunea API](../api/index.md) pentru referința la nivel de endpoint.

</div>

## Ecosistemul pe scurt

ChurchApps are ~20 de depozite independente (nu un monorepo). Aplicațiile client comunică cu un set mic de API-uri backend prin HTTPS și WebSocket și partajează cod prin pachete npm publicate sub scope-ul `@churchapps`.

```
┌────────────────────────────────┐            ┌──────────────────────────────────────────────┐
│  Clients                       │            │  Api — core modular monolith (AWS Lambda)    │
│                                │            │                                              │
│  B1Admin    staff dashboard    │   HTTPS    │   membership    attendance    content        │
│  B1App      member portal +    │ ─────────▶ │   giving        messaging     doing          │
│             church websites    │            │                                              │
│  B1Checkin  check-in kiosk     │ ◀───WS───▶ │   one MySQL database per module (6 total)    │
│                                │            └──────────────────────────────────────────────┘
│  FreePlay   TV content player  │            ┌──────────────────────────────────────────────┐
└───────────────┬────────────────┘            │  LessonsApi — Lessons.church backend         │
                │                             └──────────────────────────────────────────────┘
                │  shared code via npm (@churchapps/*)
                ▼
   helpers (cross-app interfaces) · apphelper (React components) · apihelper (Express/server utilities)
```

Două reguli structurale stau la baza tuturor celor documentate în această secțiune:

1. **Modulele sunt izolate.** Fiecare modul Api își deține baza de date și tabelele; celelalte module și aplicații ajung la datele sale doar prin endpoint-urile REST. Vezi [Structura modulului](../api/module-structure.md).
2. **Codul partajat se livrează ca pachete npm.** Aplicațiile nu importă codul sursă una de la alta; orice este reutilizat trece granițele depozitelor prin `@churchapps/helpers`, `@churchapps/apphelper` sau `@churchapps/apihelper`. Vezi [Biblioteci partajate](../shared-libraries/index.md).

## Hărțile sistemelor

| Pagină | Ce acoperă | Se întinde pe |
|------|----------------|-------|
| [Notificări și memento-uri](./notifications.md) | Cum transmite ceva unei persoane o informație: cele două uși de expediere, lanțul de escaladare a canalelor și motorul de memento-uri | Api (messaging), B1Admin, B1App |
| [Arhitectura în timp real](../realtime.md) | Cadrul de livrare WebSocket din spatele chatului, prezenței și livrării în aplicație | Api (messaging), toate aplicațiile web |
| [Notificări push web](../web-push.md) | Canalul push din browser: chei VAPID, stocarea abonamentelor, livrarea | Api (messaging), toate aplicațiile web |
| [Donații](./giving.md) | Furnizori de plăți și gateway-uri, fluxurile de donații, fonduri și loturi, webhook-urile gateway-urilor | Api (giving), apphelper, B1App, B1Admin |
| [Înregistrări la evenimente](./registrations.md) | Modelul comercial al înregistrărilor: tipuri de participanți, selecții, coduri de reducere, plăți prin gateway-ul de donații și lista de așteptare | Api (content + giving), B1App, B1Admin |
| [Check-in-uri](./check-ins.md) | Check-in la chioșc și self check-in, modelul de date al prezenței, rutarea camerelor, stratul de siguranță pentru copii, tipărirea etichetelor | B1Checkin, B1App, B1Admin, Api (attendance + membership) |
| [Constructorul de site-uri](./website-builder.md) | Arborele pagină/secțiune/element, contractul tipurilor de elemente și randatoarele, blogul, paginile cu acces restricționat, SEO și generarea cu AI | Api (content), AskApi, helpers/apphelper, B1Admin, B1App |
| [Rutarea site-urilor și multi-site](./websites.md) | Cum se rezolvă o cerere către o biserică și un anumit site, modelul de date multi-site cu `siteId` și marginea Caddy pentru domeniile personalizate | B1App, Api (membership + content), B1Admin |
| [Integrări](./integrations.md) | Suprafața de extindere: OAuth, chei API, webhook-uri, furnizori de conținut, MCP | Api, biblioteci partajate, aplicații externe |
| [Jurnal de audit și loturi anulabile](./audit-log.md) | Auditarea activată implicit a fiecărei modificări la punctul central al controllerelor și stratul de loturi care face importurile și acțiunile în masă anulabile | Api (toate modulele), B1Admin, B1Transfer |
| [MinistryStuff](./ministrystuff.md) | Serviciul plătit de stocare și credite pentru SMS: identitate prin JWT partajat, S2S cu cheie de serviciu, punctele de integrare pentru SMS și stocare, facturarea Stripe | MinistryStuffApi, MinistryStuffWeb, Api (content + messaging), pachetele texting/apihelper, B1Admin |
| [Stocare proprie (BYOS)](./byos-storage.md) | Bisericile leagă Google Drive, Dropbox, OneDrive sau un bucket compatibil S3 pentru încărcări peste limita gratuită de 100 MB: conectare OAuth, forme de încărcare pe furnizor, redirecționarea publică pentru descărcare | Api (content + membership), pachetele helpers/apphelper, B1Admin, B1App |
| [Content Commons](./commons.md) | Structura comună de active și trimiteri din spatele conținutului generat de utilizatori între produse și coada unică de moderare, accesibilă doar personalului, din B1Admin Server Admin | Api (modulul commons), B1Admin, WorshipCommons, Lessons.church, FreeShow |

:::tip
Când o modificare schimbă felul în care funcționează unul dintre aceste sisteme, nu doar o pagină dintr-o aplicație, harta sistemului corespunzătoare de aici trebuie actualizată în același efort. Așa rămâne această secțiune de încredere ca primul punct de referință pentru noii contribuitori.
:::

## Propuneri

Aceste documente descriu lucrări propuse spre analiză, nu comportamentul disponibil al produsului.

| Propunere | Ce acoperă |
|---|---|
| [Twilio BYOK](./twilio-byok-proposal.md) | Cont deținut de biserică, chei, serviciu și număr de telefon; domeniul integrării, consimțământul, livrarea, estimările și verificările de lansare |
| [Schiță de onboarding Twilio pentru biserici](./twilio-byok-onboarding-draft.md) | Setările propuse pentru formularul de înregistrare B1, exemple de campanii specifice bisericilor și liste de verificare pentru aprobare și operare |
