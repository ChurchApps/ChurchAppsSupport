---
title: "Înregistrări la evenimente"
description: "Cum funcționează înscrierile la evenimente în B1 Admin și B1App: tipurile de participanți, suplimentele plătite, codurile de reducere, plățile prin gateway-ul de donații și promovarea din lista de așteptare."
---

# Înregistrări la evenimente

<div class="article-intro">

Înregistrarea nativă la evenimente se află în modulul content și, de la valul de înregistrări cu plată, are un model comercial complet: tipuri de participanți cu preț, opțiuni suplimentare cu preț, coduri de reducere, plăți prin gateway-ul de donații existent al bisericii și o listă de așteptare bazată pe stări. Fluxul de bani reutilizează intenționat stiva de donații. Controllerul de înregistrare taxează prin aceeași abstracție `GatewayService` / `IGatewayProvider` documentată în [Donații](./giving.md), astfel încât modulul content nu conține date de card și nici cunoștințe despre SDK-ul gateway-ului. Această pagină descrie modelul de date, regulile de preț și capacitate, precum și fluxurile de înregistrare, plată și listă de așteptare.

</div>

## Prezentare generală

```
┌──────────────────────────────┐            ┌─────────────────────────────────────────────┐
│ B1App (portalul membrilor)   │            │ Api — modulul content                       │
│  asistentul de înregistrare ·│   HTTPS    │  RegistrationController                     │
│  Înregistrările mele         │ ─────────▶ │   /content/registrations                    │
├──────────────────────────────┤            │  RegistrationPricingHelper (preț pe server) │
│ B1Admin (personal)           │            │  RegistrationHelper (e-mailuri)             │
│  setările înregistrărilor    │            └───────────────┬─────────────────────────────┘
│  · lista · export CSV        │                            │ processCharge
└──────────────────────────────┘                            ▼
                                            ┌─────────────────────────────────────────────┐
                                            │ abstracția gateway partajată (donații)      │
                                            │  GatewayService → IGatewayProvider          │
                                            │  Stripe · PayPal · Kingdom Funding          │
                                            └─────────────────────────────────────────────┘
```

Trei reguli se aplică în toată stiva:

1. **Serverul stabilește prețul.** Clienții trimit id-uri de tipuri, id-uri de selecții și cantități; `RegistrationPricingHelper.computeTotal()` calculează totalul pe server, iar cupoanele sunt revalidate la momentul taxării. O sumă trimisă de client nu este niciodată luată în considerare.
2. **Capacitatea este aplicată atomic la inserare.** Fiecare inserare cu limită de capacitate folosește o instrucțiune `INSERT … SELECT … FROM dual WHERE (numărul de rânduri active) < capacitate`, astfel încât două înregistrări simultane nu pot ocupa amândouă ultimul loc. Numărătorile se derivă din stare (`pending`/`confirmed`) și nu sunt stocate.
3. **Plățile folosesc circuitele donațiilor.** `RegistrationController` apelează `GatewayService.processCharge` partajat, cu gateway-ul configurat de biserică. Este aceeași abstracție de provider, același model de tokenizare și aceeași gestionare SCA ca la donații.

## Modelul de date (`Api/src/modules/content`)

Modelele se află în `models/Registration.ts`, maparea tabelelor în `db/DatabaseTypes.ts`, iar câte un repository pentru fiecare tabel se află în `repositories/`.

| Tabel | Înseamnă | Câmpuri cheie |
|-------|----------|---------------|
| `registrations` | O înregistrare (o gospodărie sau un grup pentru un eveniment) | eventId, personId, householdId, **status** (`pending` / `confirmed` / `waitlisted` / `cancelled`), totalAmount, amountPaid, couponId, waitlistNotifiedDate, registeredDate, cancelledDate |
| `registrationMembers` | Un participant la o înregistrare | registrationId, personId, firstName, lastName, **registrationTypeId** |
| `registrationTypes` | Tipuri de participanți pe eveniment (de ex. Adult / Copil) | eventId, name, description, **price**, **capacity**, minAgeYears, maxAgeYears, formId, sort, active |
| `registrationSelections` | Opțiuni suplimentare denumite, cu preț (de ex. tricou) | eventId, name, description, **price**, **capacity**, **maxQuantity** (limita per înregistrare), sort, active |
| `registrationSelectionChoices` | Cantitatea dintr-o selecție aleasă de o înregistrare sau de un membru | registrationId, registrationMemberId, selectionId, **quantity** |
| `registrationPayments` | O plată reușită pentru o înregistrare | registrationId, gatewayId, provider, transactionId, method, amount, currency, kind (`charge`), status (`succeeded`), personId |
| `registrationCoupons` | Coduri de reducere pe eveniment | eventId, code, **discountType** (`percent` / `amount`), **value**, startDate, endDate, **minMembers**, **maxUses**, active |

Note:

- **Nu există tabel pentru lista de așteptare.** Grupurile de pe lista de așteptare sunt rânduri din `registrations` cu `status = 'waitlisted'`. Întregul ciclu de viață al listei de așteptare înseamnă tranziții de stare pe acest singur tabel.
- **Fără contoare stocate.** Numărătorile de „vândute” sau „folosite” (capacitatea evenimentului, capacitatea pe tip, capacitatea pe selecție, utilizările cupoanelor) se calculează cu subinterogări corelate peste rândurile cu stare în `('pending','confirmed')` (`RegistrationTypeRepo.loadActiveWithUsage`, `RegistrationRepo.countActiveForEvent` / `countActiveForCoupon`). Prin urmare, anularea unei înregistrări eliberează capacitatea fără nicio evidență suplimentară.
- Prețurile sunt coloane MySQL DECIMAL (transmise ca șiruri de caractere) și sunt convertite cu `Number()` în interiorul helper-ului de preț.

## Suprafața REST

Totul se află sub `/content/registrations` (`controllers/RegistrationController.ts`) și este protejat de `Permissions.registrations` (`view` / `edit`):

| Rută | Acces | Scop |
|------|-------|------|
| `POST /register` | anonim | Trimitere completă: oaspete, membru sau Add Attendee de către personal; preț calculat pe server, verificări de capacitate, taxare opțională |
| `GET /types/event/:eventId`, `GET /selections/event/:eventId` | public | Tipuri și selecții cu `used` / `remainingCapacity` calculate, pentru asistent |
| `POST /types`, `DELETE /types/:id` (la fel pentru `/selections`, `/coupons`) | `registrations.edit` | Operații CRUD din setările pentru personal |
| `POST /coupons/validate` | public | Validarea inline a codului de reducere în timpul asistentului |
| `GET /coupons/event/:eventId` | personal | Cupoane cu numărul de utilizări |
| `GET /event/:eventId` · `GET /event/:eventId/count` | personal · public | Lista participanților; numărul activ pentru afișarea capacității |
| `GET /person/:personId` · `GET /:id` · `GET /payments/:registrationId` | autentificat | Înregistrările mele, detalii, istoricul plăților |
| `PUT /:id` | proprietar / personal | Editare după trimitere: înlocuiește membrii și alegerile de selecții, cu verificări atomice noi de capacitate, și recalculează `totalAmount`; nu taxează și nu rambursează niciodată automat |
| `POST /:id/pay` | proprietar | „Finalizează plata”: taxează `totalAmount − amountPaid` și trece `waitlisted` / `pending` → `confirmed` |
| `POST /:id/promote` | personal | Promovare manuală de pe lista de așteptare |
| `POST /:id/cancel` · `DELETE /:id` | proprietar · personal | Anulare sau ștergere; ambele declanșează promovarea automată de pe lista de așteptare |

O înregistrare existentă, care nu este anulată, pentru același `personId` la același eveniment este respinsă cu 409. Fiecare înregistrare creată emite un webhook `registration.created` prin `WebhookDispatcher`.

## Prețuri și coduri de reducere

`helpers/RegistrationPricingHelper.ts` este unica autoritate pentru calculele financiare:

- `computeTotal()` adună prețul tipului fiecărui membru plus `preț × cantitate` pentru fiecare alegere de selecție.
- `validateCoupon()` verifică indicatorul de activare, intervalul de date (`startDate` / `endDate`), `minMembers` față de dimensiunea grupului trimis și `maxUses` față de numărul de utilizări derivat din stare.
- `applyDiscount()`: `percent` scade `total × value/100`, iar `amount` scade `value`. Ambele opresc la zero, deci reducerea nu poate face totalul negativ.

Asistentul apelează `POST /coupons/validate` pentru feedback inline, dar `register` revalidează și reaplică cuponul pe server. Totalul afișat de client are doar rol informativ.

## Idiomul de capacitate atomică

Fiecare inserare cu limită de capacitate concurează în siguranță fără tranzacții sau blocări, deoarece verificarea capacității face parte din chiar `INSERT`. La nivel de eveniment (`RegistrationRepo.atomicInsertWithCapacityCheck`):

```sql
INSERT INTO registrations (id, churchId, eventId, ...)
  SELECT ?, ?, ?, ...
  FROM dual
  WHERE (SELECT COUNT(*) FROM registrations
         WHERE eventId=? AND churchId=? AND status IN ('pending','confirmed')) < ?
```

Zero rânduri afectate înseamnă „la capacitate”. Același idiom protejează inserările pe tip (`RegistrationMemberRepo.atomicInsertWithTypeCapacity`, care numără membrii asociați înregistrărilor active) și cantitățile pe selecție (`RegistrationSelectionChoiceRepo.atomicInsertWithCapacityCheck`, care folosește `COALESCE(SUM(quantity),0) + ? <= capacity`). Dacă o inserare de membru sau de selecție eșuează în mijlocul unei înregistrări, controllerul anulează înregistrarea parțială cu `deleteCascade()` și raportează ce tip sau ce selecție s-a epuizat.

## Fluxul de plată

`processRegistrationCharge` din controller este singurul loc în care înregistrările ating banii, iar acesta este un client subțire al stivei de donații:

```
RegistrationController ─▶ RepoManager.getRepos("giving").gateway
                       ─▶ GatewayService.getGatewayForChurch(churchId, …)
                       ─▶ GatewayService.processCharge(gateway, chargeData)
                             └▶ IGatewayProvider.processCharge  (Stripe / PayPal / Kingdom Funding)
```

Tokenizarea are loc în browser exact ca la donații (vezi [Donații](./giving.md)). Asistentul reutilizează registrul de provideri de plată apphelper, astfel încât membrii autentificați pot plăti cu carduri salvate, iar oaspeții tokenizează un card nou. Controllerul reproduce particularitățile providerilor din `DonateController`: id-urile metodei de plată `pm-{id}` pentru Kingdom Funding și răspunsurile SCA `requires_action` de la Stripe, care sunt returnate clientului fără să înregistreze o plată. O taxare reușită scrie un rând în `registrationPayments`, actualizează `amountPaid` și confirmă înregistrarea. **Rambursările nu sunt implementate.** O înregistrare plătită și anulată își păstrează rândurile de plată, iar orice rambursare se face separat, în panoul gateway-ului.

Ambele puncte de intrare trec prin același cod: `register` (plată la înscriere) și `pay` (plata soldului sau finalizarea din lista de așteptare).

`register` nu taxează în două cazuri și salvează înregistrarea ca `pending`, cu `amountPaid = 0`, lăsând totalul complet ca sold de plată:

- **Add Attendee de către personal.** Corpul cererii conține un `personId` care nu este al apelantului, fără `guestInfo`, iar apelantul are `registrations.edit` în acea biserică. Persoana trebuie să existe (altfel 404), filtrul de membri ai gospodăriei este ocolit și nu se taxează niciun card.
- **Fără gateway.** Biserica nu are un gateway de donații (`hasGateway` verifică `gateway.loadAll`). Pasul de plată din B1App afișează **Înregistrează-te și plătești mai târziu** în loc de formularul de card.

Oaspeții (fără `au.id`) cu înregistrări cu preț trebuie să trimită un `captchaPass` obținut de la `POST /giving/donate/captcha-verify`. `CaptchaPass.verify` (acum în `shared/helpers`) rulează chiar înainte de taxare, deci înscrierile pe lista de așteptare și cele gratuite nu sunt afectate. Când `CAPTCHA_ENFORCE=true` și pass-ul lipsește sau este invalid, noua înregistrare este anulată cu `deleteCascade()`, iar apelul returnează 403. `RegistrationPaymentForm` din B1App afișează căsuța reCAPTCHA oaspeților și trimite pass-ul atât cu salvarea cardului, cât și cu înregistrarea.

## Ciclul de viață al listei de așteptare

Când evenimentul este plin și indicatorul `waitlistEnabled` al evenimentului este activ, `register` salvează grupul ca `waitlisted` (sărind peste verificările de capacitate) și trimite e-mailul obișnuit de confirmare, marcat ca loc pe lista de așteptare. Promovarea are loc în trei moduri: `cancel`, `delete` și endpoint-ul `promote` al personalului. Toate ajung în `RegistrationRepo.promoteFromWaitlist`, care alege cel mai vechi rând de pe listă și îl trece atomic:

```sql
UPDATE registrations SET status='pending', waitlistNotifiedDate=NOW()
  WHERE id=? AND status='waitlisted'
    AND (…active count for the event…) < ?
```

Condiția `status='waitlisted'` împiedică promovarea dublă a aceluiași rând de promovări concurente, iar subinterogarea de capacitate împiedică supravânzarea. Rândurile promovate ajung în `pending`, nu în `confirmed`, deoarece poate mai fi datorat un sold. `RegistrationHelper.sendWaitlistAvailabilityEmail` îl anunță pe înscris că s-a eliberat locul și, când `totalAmount − amountPaid > 0`, îi trimite un link către pagina B1 `/mobile/registrations` a bisericii (Înregistrările mele), construit din `B1AppRoot` și subdomeniul bisericii. Plata sau lipsa soldului îl confirmă.

:::info
O mărire a capacității nu promovează automat, de una singură. Personalul folosește acțiunea Promote din listă după ce mărește capacitatea. Anulările și ștergerile promovează automat.
:::

## Suprafețele pentru client

- **Asistentul B1App.** Un singur hook partajat, `B1App/src/components/registration/useEventRegistration.ts`, conduce atât componenta de site (`components/registration/EventRegister.tsx`), cât și ecranul din portalul mobil (`app/[sdSlug]/mobile/components/screens/EventRegisterPage.tsx`), prin pașii `info → members → selections → questions → payment → confirm`. Pașii din mijloc apar doar când evenimentul are selecții, un formular atașat sau un total diferit de zero. Pașii de informații și de membri afișează selectoare pe tipuri de participanți, cu capacitatea rămasă în timp real și stările de epuizare. Plata (`RegistrationPaymentForm.tsx`) afișează sumarul comenzii, câmpul pentru codul de reducere și, pentru membrii autentificați, metodele de plată salvate prin registrul de provideri apphelper. Oaspeții tokenizează un card nou. Ecranul mobil **Înregistrări** (`screens/RegistrationsPage.tsx`) este Înregistrările mele: starea, soldul de plată, Finalizează plata (`POST /:id/pay`), Editare (`PUT /:id`, pentru date de contact, tipuri de membri și cantități de selecții) și Anulare.
- **Setările din B1Admin.** `B1Admin/src/registrations/components/RegistrationSettingsEdit.tsx` adaugă comutatorul **Activează lista de așteptare** și acordeoanele **Tipuri de participanți**, **Selecții** și **Coduri de reducere** (`RegistrationTypesEdit.tsx` / `RegistrationSelectionsEdit.tsx` / `RegistrationCouponsEdit.tsx`). Toate au operații CRUD pe rutele `/types`, `/selections` și `/coupons`.
- **Lista din B1Admin.** `B1Admin/src/registrations/RegistrationDetailsPage.tsx` include: coloana Type per participant, coloana Paid/Total cu un indicator de sold, indicatoare cu numărul pe tip, o fereastră cu detaliile plăților (`RegistrationDetailDialog.tsx`, din `GET /payments/:registrationId`), acțiunea de rând Promote pentru lista de așteptare și exportul CSV cu tipurile de participanți, selecțiile, valorile paid/total/sold și răspunsurile la întrebări.

Consultările între module (rezolvarea sau crearea persoanei-oaspete, încărcarea bisericii pentru e-mailuri) trec prin `getMembershipModuleGateway()`. Modulul content nu citește niciodată direct tabelele de membership.

## Pagini conexe

- [Donații](./giving.md): abstracția gateway-ului, registrul de provideri și modelul de tokenizare pe care le reutilizează această funcție
- [Endpoint-uri Content](../api/endpoints/content.md): suprafața REST a modulului content
- [Webhook-uri](../api/webhooks.md): evenimentul `registration.created`
- [Structura modulului](../api/module-structure.md): modul în care este organizat modulul content pe server
