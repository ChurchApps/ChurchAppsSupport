---
title: "Arhitectură"
---

# Arhitectură

<div class="article-intro">

Aceste pagini sunt hărți ale sistemului între depozite: documentează cum funcționează de la un capăt la altul un sistem de bază ChurchApps — prin aplicații, modulele API și bibliotecile partajate — și nu cum este configurat un anumit proiect. Citiți-le înainte de a modifica comportamentul unui sistem; citiți [Configurare](../setup/) pentru a porni un proiect și [secțiunea API](../api/) pentru referința la nivel de endpoint.

</div>

## Ecosistemul dintr-o privire

ChurchApps are ~20 de depozite independente (nu un monorepo). Aplicațiile client comunică cu un set mic de API-uri backend prin HTTPS și WebSocket și partajează cod prin pachete npm publicate sub domeniul `@churchapps`.

```
┌────────────────────────────────┐            ┌──────────────────────────────────────────────┐
│  Clients                       │            │  Api — core modular monolith (AWS Lambda)    │
│                                │            │                                              │
│  B1Admin    staff dashboard    │   HTTPS    │   membership    attendance    content        │
│  B1App      member portal +    │ ─────────▶ │   giving        messaging     doing          │
│             church websites    │            │                                              │
│  B1Checkin  check-in kiosk     │ ◀───WS───▶ │   one MySQL database per module (6 total)    │
│  B1Mobile   (maintenance-only) │            └──────────────────────────────────────────────┘
│  FreePlay   TV content player  │            ┌──────────────────────────────────────────────┐
└───────────────┬────────────────┘            │  LessonsApi — Lessons.church backend         │
                │                             └──────────────────────────────────────────────┘
                │  shared code via npm (@churchapps/*)
                ▼
   helpers (cross-app interfaces) · apphelper (React components) · apihelper (Express/server utilities)
```

Două reguli structurale modelează tot ce este documentat în această secțiune:

1. **Modulele sunt izolate.** Fiecare modul Api își deține baza de date și tabelele; celelalte module și aplicații ajung la datele sale doar prin endpoint-urile REST. Vezi [Structura modulului](../api/module-structure).
2. **Codul partajat se livrează ca pachete npm.** Aplicațiile nu importă codul sursă una de la alta; orice este reutilizat trece granițele depozitelor prin `@churchapps/helpers`, `@churchapps/apphelper` sau `@churchapps/apihelper`. Vezi [Biblioteci partajate](../shared-libraries/).

## Hărți ale sistemului

| Pagină | Ce acoperă | Se extinde pe |
|------|----------------|-------|
| [Notificări și memento-uri](./notifications) | Cum îi transmite cineva unei persoane o informație: cele două uși de expediere, lanțul de escaladare a canalelor și motorul de memento-uri | Api (messaging), B1Admin, B1App |
| [Arhitectura în timp real](../realtime) | Cadrul de livrare prin WebSocket din spatele chatului, prezenței și livrării în aplicație | Api (messaging), toate aplicațiile web |
| [Notificări push web](../web-push) | Canalul push al browserului: chei VAPID, stocarea abonamentelor, livrarea | Api (messaging), toate aplicațiile web |
| [Donații](./giving) | Furnizorii de plăți și gateway-urile, fluxurile de donații, fondurile și loturile, webhook-urile gateway-ului | Api (giving), apphelper, B1App, B1Admin |
| [Înscrieri la evenimente](./registrations) | Modelul comercial al înscrierilor: tipurile de participanți, selecțiile, codurile de reducere, plățile prin gateway-ul de donații și lista de așteptare | Api (content + giving), B1App, B1Admin |
| [Check-in](./check-ins) | Check-in la chioșc și self check-in, modelul de date al prezenței, rutarea camerelor, stratul de siguranță pentru copii, tipărirea etichetelor | B1Checkin, B1App, B1Admin, Api (attendance + membership) |
| [Constructorul de site-uri](./website-builder) | Arborele pagină/secțiune/element, contractul tipurilor de elemente și randatorii, blogul, paginile cu acces restricționat, SEO și generarea cu AI | Api (content), AskApi, helpers/apphelper, B1Admin, B1App |
| [Rutarea site-urilor și multi-site](./websites) | Cum se rezolvă o cerere către o biserică și un anumit site, modelul de date multi-site `siteId` și marginea domeniilor personalizate Caddy | B1App, Api (membership + content), B1Admin |
| [Integrări](./integrations) | Suprafața de extensii: OAuth, chei API, webhook-uri, furnizori de conținut, MCP | Api, bibliotecile partajate, aplicații externe |
| [Jurnalul de audit și loturile reversibile](./audit-log) | Auditarea implicită activă a fiecărei modificări la punctul de control al controllerului și stratul de loturi care face importurile și acțiunile în masă reversibile | Api (toate modulele), B1Admin, B1Transfer |
| [MinistryStuff](./ministrystuff) | Serviciul plătit de stocare și credite pentru mesaje text: identitate prin JWT partajat, S2S cu cheie de serviciu, punctele de extensie pentru furnizorii de mesaje și stocare, facturarea Stripe | MinistryStuffApi, MinistryStuffWeb, Api (content + messaging), pachetele texting/apihelper, B1Admin |
| [Stocare proprie](./byos-storage) | Bisericile își conectează Google Drive, Dropbox, OneDrive sau un bucket compatibil S3 pentru încărcări peste limita gratuită de 100 MB: conectare OAuth, forme de încărcare specifice fiecărui furnizor, redirecționarea publică pentru descărcare | Api (content + membership), pachetele helpers/apphelper, B1Admin, B1App |
| [Content Commons](./commons) | Structura comună de active și trimiteri din spatele conținutului generat de utilizatori între produse și coada unică de moderare, rezervată personalului, din Administrarea serverului B1Admin | Api (modulul commons), B1Admin, WorshipCommons, Lessons.church, FreeShow |

:::tip
Când o modificare schimbă modul în care funcționează unul dintre aceste sisteme — nu doar o pagină dintr-o aplicație — harta sistemului corespunzătoare de aici trebuie actualizată în același efort. Astfel, această secțiune rămâne de încredere ca prim punct de referință pentru noii contribuitori.
:::

## Propuneri

Aceste documente descriu lucrări propuse spre analiză, nu comportamentul disponibil al produsului.

| Propunere | Ce acoperă |
|---|---|
| [Twilio BYOK](./twilio-byok-proposal) | Cont deținut de biserică, chei, serviciu și număr de telefon; domeniul integrării, consimțământul, livrarea, estimările și verificările de lansare |
| [Schiță de integrare a bisericii cu Twilio](./twilio-byok-onboarding-draft) | Setările propuse pentru formularul de înscriere B1, exemple de campanii specifice bisericii și liste de verificare pentru aprobare și operare |
