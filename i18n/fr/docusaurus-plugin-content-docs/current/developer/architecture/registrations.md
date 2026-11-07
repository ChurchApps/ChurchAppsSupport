---
title: "Inscriptions aux événements"
description: "Inscriptions aux événements dans B1 Admin et B1App : types de participants, options payantes, codes promo, paiements via la passerelle et liste d’attente."
---

# Inscriptions aux événements

<div class="article-intro">

L'inscription native aux événements réside dans le module content et, depuis la vague des inscriptions payantes, dispose d'un modèle commercial complet : types de participants à prix, sélections optionnelles à prix, codes de réduction, paiements par la passerelle de dons existante de l'église, et une liste d'attente pilotée par les statuts. Le circuit de l'argent réutilise volontairement la pile des dons — le contrôleur d'inscription débite par la même abstraction `GatewayService` / `IGatewayProvider` décrite dans [Dons](./giving.md), de sorte qu'aucune donnée de carte ni connaissance de SDK de passerelle ne réside dans le module content. Cette page décrit le modèle de données, les règles de tarification et de capacité, et les flux d'inscription, de paiement et de liste d'attente.

</div>

## Vue d'ensemble

```
┌──────────────────────────────┐            ┌─────────────────────────────────────────────┐
│ B1App (portail des membres)  │            │ Api — module content                        │
│  assistant d'inscription ·   │   HTTPS    │  RegistrationController                     │
│  Mes inscriptions            │ ─────────▶ │   /content/registrations                    │
├──────────────────────────────┤            │  RegistrationPricingHelper (tarif serveur)  │
│ B1Admin (personnel)          │            │  RegistrationHelper (courriels)             │
│  paramètres d'inscription ·  │            └───────────────┬─────────────────────────────┘
│  liste · export CSV          │                            │ processCharge
└──────────────────────────────┘                            ▼
                                            ┌─────────────────────────────────────────────┐
                                            │ abstraction de passerelle partagée (giving) │
                                            │  GatewayService → IGatewayProvider          │
                                            │  Stripe · PayPal · Kingdom Funding          │
                                            └─────────────────────────────────────────────┘
```

Trois règles tiennent dans toute la pile :

1. **Le serveur fixe le prix.** Les clients soumettent des identifiants de types, de sélections et des quantités ; `RegistrationPricingHelper.computeTotal()` calcule le total côté serveur, et les codes de réduction sont revalidés au moment du débit. Un montant envoyé par le client n'est jamais retenu.
2. **La capacité est appliquée de façon atomique à l'insertion.** Chaque insertion limitée en capacité utilise une instruction `INSERT … SELECT … FROM dual WHERE (nombre de lignes actives) < capacité`, de sorte que deux inscriptions simultanées ne puissent pas prendre toutes deux la dernière place. Les décomptes sont dérivés du statut (`pending`/`confirmed`), jamais stockés.
3. **Les paiements passent par les rails des dons.** `RegistrationController` appelle le `GatewayService.processCharge` partagé avec la passerelle de dons configurée de l'église — la même abstraction de fournisseur, le même modèle de tokenisation et la même gestion SCA que pour les dons.

## Modèle de données (`Api/src/modules/content`)

Les modèles se trouvent dans `models/Registration.ts` ; les correspondances de tables dans `db/DatabaseTypes.ts` ; un dépôt par table sous `repositories/`.

| Table | Signification | Champs clés |
|-------|-----------|-----------|
| `registrations` | Une inscription (un foyer ou un groupe pour un événement) | eventId, personId, householdId, **status** (`pending` / `confirmed` / `waitlisted` / `cancelled`), totalAmount, amountPaid, couponId, waitlistNotifiedDate, registeredDate, cancelledDate |
| `registrationMembers` | Un participant d'une inscription | registrationId, personId, firstName, lastName, **registrationTypeId** |
| `registrationTypes` | Types de participants par événement (par ex. Adulte / Enfant) | eventId, name, description, **price**, **capacity**, minAgeYears, maxAgeYears, formId, sort, active |
| `registrationSelections` | Options supplémentaires nommées avec un prix (par ex. t-shirt) | eventId, name, description, **price**, **capacity**, **maxQuantity** (plafond par inscription), sort, active |
| `registrationSelectionChoices` | Quantité d'une sélection choisie par une inscription ou un membre | registrationId, registrationMemberId, selectionId, **quantity** |
| `registrationPayments` | Un débit réussi sur une inscription | registrationId, gatewayId, provider, transactionId, method, amount, currency, kind (`charge`), status (`succeeded`), personId |
| `registrationCoupons` | Codes de réduction par événement | eventId, code, **discountType** (`percent` / `amount`), **value**, startDate, endDate, **minMembers**, **maxUses**, active |

Remarques :

- **Il n'existe pas de table de liste d'attente.** Les groupes en liste d'attente sont des lignes `registrations` avec `status = 'waitlisted'` ; tout le cycle de vie de la liste d'attente se réduit à des transitions de statut sur cette seule table.
- **Aucun compteur stocké.** Les décomptes de places « vendues » / « utilisées » (capacité de l'événement, capacité par type, capacité par sélection, utilisations des coupons) sont calculés par des sous-requêtes corrélées sur les lignes dont le statut est dans `('pending','confirmed')` (`RegistrationTypeRepo.loadActiveWithUsage`, `RegistrationRepo.countActiveForEvent` / `countActiveForCoupon`). Annuler une inscription libère donc la capacité sans aucune comptabilité.
- Les prix sont des colonnes DECIMAL de MySQL (chaînes sur le réseau) converties avec `Number()` dans l'aide de tarification.

## Surface REST

Tout se trouve sous `/content/registrations` (`controllers/RegistrationController.ts`), protégé par `Permissions.registrations` (`view` / `edit`) :

| Route | Accès | Rôle |
|-------|-------|------|
| `POST /register` | anonyme | Soumission complète : visiteur, membre ou Ajouter un participant par le personnel ; tarification serveur, contrôles de capacité, débit facultatif |
| `GET /types/event/:eventId`, `GET /selections/event/:eventId` | publique | Types/sélections avec `used` / `remainingCapacity` dérivés pour l'assistant |
| `POST /types`, `DELETE /types/:id` (idem pour `/selections`, `/coupons`) | `registrations.edit` | CRUD des paramètres par le personnel |
| `POST /coupons/validate` | publique | Validation en ligne du code de réduction pendant l'assistant |
| `GET /coupons/event/:eventId` | personnel | Coupons avec leurs compteurs d'utilisation |
| `GET /event/:eventId` · `GET /event/:eventId/count` | personnel · publique | Liste ; décompte des actifs pour l'affichage de la capacité |
| `GET /person/:personId` · `GET /:id` · `GET /payments/:registrationId` | authentifié | Mes inscriptions, détail, historique des paiements |
| `PUT /:id` | propriétaire/personnel | Modification après soumission — remplace les membres et les choix de sélection par de nouveaux contrôles de capacité atomiques, recalcule `totalAmount` ; ne débite ni ne rembourse jamais automatiquement |
| `POST /:id/pay` | propriétaire | « Finaliser le paiement » : débite `totalAmount − amountPaid`, fait passer `waitlisted`/`pending` à `confirmed` |
| `POST /:id/promote` | personnel | Promotion manuelle depuis la liste d'attente |
| `POST /:id/cancel` · `DELETE /:id` | propriétaire · personnel | Annuler / supprimer ; les deux déclenchent la promotion automatique depuis la liste d'attente |

Une inscription non annulée existante pour le même `personId` sur le même événement est rejetée avec un 409, et chaque inscription créée émet un webhook `registration.created` via `WebhookDispatcher`.

## Tarification et codes de réduction

`helpers/RegistrationPricingHelper.ts` est l'unique autorité pour les calculs financiers :

- `computeTotal()` additionne le prix du type de chaque membre et le `prix × quantité` de chaque choix de sélection.
- `validateCoupon()` applique l'indicateur actif, la fenêtre de dates (`startDate`/`endDate`), `minMembers` par rapport à la taille de l'inscription soumise, et `maxUses` par rapport au nombre d'utilisations dérivé des statuts.
- `applyDiscount()` — `percent` soustrait `total × value/100` ; `amount` soustrait `value` ; les deux plafonnent à zéro.

L'assistant appelle `POST /coupons/validate` pour un retour en ligne, mais `register` revalide et réapplique le coupon côté serveur — le total affiché par le client n'est qu'indicatif.

## L'idiome de capacité atomique

Chaque insertion limitée en capacité se déroule en sécurité sans transactions ni verrous, en rendant la vérification de capacité partie intégrante de l'`INSERT` lui-même. Au niveau de l'événement (`RegistrationRepo.atomicInsertWithCapacityCheck`) :

```sql
INSERT INTO registrations (id, churchId, eventId, ...)
  SELECT ?, ?, ?, ...
  FROM dual
  WHERE (SELECT COUNT(*) FROM registrations
         WHERE eventId=? AND churchId=? AND status IN ('pending','confirmed')) < ?
```

Zéro ligne affectée signifie « capacité atteinte ». Le même idiome protège les insertions par type (`RegistrationMemberRepo.atomicInsertWithTypeCapacity`, qui compte les membres joints aux inscriptions actives) et les quantités par sélection (`RegistrationSelectionChoiceRepo.atomicInsertWithCapacityCheck`, avec `COALESCE(SUM(quantity),0) + ? <= capacity`). Lorsqu'une insertion de membre ou de sélection échoue en cours d'inscription, le contrôleur annule l'inscription partielle avec `deleteCascade()` et indique quel type ou quelle sélection est épuisé.

## Flux de paiement {#payment-flow}

`processRegistrationCharge` dans le contrôleur est le seul endroit où les inscriptions touchent à l'argent, et c'est un client léger de la pile des dons :

```
RegistrationController ─▶ RepoManager.getRepos("giving").gateway
                       ─▶ GatewayService.getGatewayForChurch(churchId, …)
                       ─▶ GatewayService.processCharge(gateway, chargeData)
                             └▶ IGatewayProvider.processCharge  (Stripe / PayPal / Kingdom Funding)
```

La tokenisation se fait dans le navigateur exactement comme pour les dons (voir [Dons](./giving.md)) — l'assistant réutilise le registre des fournisseurs de paiement d'apphelper, de sorte que les membres connectés peuvent payer avec des cartes enregistrées et que les visiteurs tokenisent une nouvelle carte. Le contrôleur reprend les particularités des fournisseurs de `DonateController` (identifiants de moyens de paiement `pm-{id}` de Kingdom Funding, réponses SCA `requires_action` de Stripe renvoyées au client sans enregistrer de paiement). Un débit réussi écrit une ligne `registrationPayments`, incrémente `amountPaid`, et confirme l'inscription. **Les remboursements ne sont pas implémentés** — une inscription payante annulée conserve ses lignes de paiement, et tout remboursement se traite hors de la plateforme, dans le tableau de bord de la passerelle.

Les deux points d'entrée passent par le même chemin de code : `register` (paiement à l'inscription) et `pay` (paiement du solde / finalisation d'une liste d'attente).

`register` saute le débit dans deux cas et enregistre l'inscription en `pending` avec `amountPaid = 0`, le total complet restant dû :

- **Ajouter un participant par le personnel.** Le corps porte un `personId` qui n'est pas celui de l'appelant, pas de `guestInfo`, et l'appelant dispose de `registrations.edit` dans cette église. La personne doit exister (404 sinon), le filtre des membres du foyer est contourné, et aucune carte n'est débitée.
- **Pas de passerelle.** L'église n'a pas de passerelle de dons (`hasGateway` vérifie `gateway.loadAll`). L'étape de paiement de B1App affiche **S'inscrire et payer plus tard** au lieu d'un formulaire de carte.

Les inscriptions tarifées d'un visiteur (sans `au.id`) doivent porter un `captchaPass` issu de `POST /giving/donate/captcha-verify`. `CaptchaPass.verify` (désormais dans `shared/helpers`) s'exécute juste avant le débit, de sorte que les inscriptions en liste d'attente et gratuites ne sont pas touchées. Lorsque `CAPTCHA_ENFORCE=true` et que le laissez-passer est absent ou invalide, la nouvelle inscription est annulée avec `deleteCascade()` et l'appel renvoie 403. Le `RegistrationPaymentForm` de B1App affiche la case reCAPTCHA aux visiteurs et envoie le laissez-passer avec l'enregistrement de la carte et l'inscription.

## Cycle de vie de la liste d'attente

Lorsque l'événement est complet et que l'indicateur `waitlistEnabled` de l'événement est activé, `register` enregistre le groupe en `waitlisted` (en contournant les contrôles de capacité) et envoie le courriel de confirmation habituel, marqué comme place en liste d'attente. La promotion se fait de trois façons — `cancel`, `delete` et le point de terminaison `promote` du personnel — qui aboutissent toutes à `RegistrationRepo.promoteFromWaitlist`, qui choisit la ligne en liste d'attente la plus ancienne et la fait basculer de façon atomique :

```sql
UPDATE registrations SET status='pending', waitlistNotifiedDate=NOW()
  WHERE id=? AND status='waitlisted'
    AND (…nombre actif de l'événement…) < ?
```

La garde `status='waitlisted'` empêche des promotions concurrentes de promouvoir deux fois une même ligne, et la sous-requête de capacité empêche une promotion de dépasser la capacité. Les lignes promues atterrissent en `pending` — et non en `confirmed` — car un solde peut encore être dû ; `RegistrationHelper.sendWaitlistAvailabilityEmail` informe l'inscrit que sa place s'est libérée et, lorsque `totalAmount − amountPaid > 0`, renvoie vers la page `/mobile/registrations` de B1 de l'église (Mes inscriptions), construite à partir de `B1AppRoot` et du sous-domaine de l'église. Le paiement (ou l'absence de solde) les confirme.

:::info
Une hausse de capacité ne déclenche pas la promotion automatique à elle seule — le personnel utilise l'action Promouvoir de la liste après avoir augmenté la capacité. Les annulations et les suppressions promeuvent automatiquement.
:::

## Surfaces côté client

- **Assistant de B1App** — un seul hook partagé, `B1App/src/components/registration/useEventRegistration.ts`, pilote à la fois le composant du site web (`components/registration/EventRegister.tsx`) et l'écran du portail mobile (`app/[sdSlug]/mobile/components/screens/EventRegisterPage.tsx`) à travers les étapes `info → members → selections → questions → payment → confirm` (les étapes du milieu ne s'affichent que si l'événement a des sélections, un formulaire attaché, ou un total non nul). Les étapes info/membres affichent des sélecteurs par type de participant avec capacité restante en direct et états épuisés ; le paiement (`RegistrationPaymentForm.tsx`) affiche le résumé de la commande, la saisie du code de réduction et — pour les membres connectés — les moyens de paiement enregistrés via le registre des fournisseurs d'apphelper, les visiteurs tokenisant une nouvelle carte. L'écran mobile **Inscriptions** (`screens/RegistrationsPage.tsx`) est Mes inscriptions : statut, solde dû, Finaliser le paiement (`POST /:id/pay`), Modifier (`PUT /:id` — coordonnées, types de membres, quantités de sélections) et Annuler.
- **Paramètres de B1Admin** — `B1Admin/src/registrations/components/RegistrationSettingsEdit.tsx` ajoute l'interrupteur Activer la liste d'attente ainsi que des accordéons pour les types de participants, les sélections et les codes de réduction (`RegistrationTypesEdit.tsx` / `RegistrationSelectionsEdit.tsx` / `RegistrationCouponsEdit.tsx`), tous en CRUD sur les routes `/types`, `/selections`, `/coupons`.
- **Liste de B1Admin** — `B1Admin/src/registrations/RegistrationDetailsPage.tsx` : colonne Type par participant, colonne Payé/Total avec pastille de solde, pastilles de décompte par type, une boîte de dialogue de détail des paiements (`RegistrationDetailDialog.tsx`, à partir de `GET /payments/:registrationId`), l'action de ligne Promouvoir de la liste d'attente, et l'export CSV incluant les types de participants, les sélections, payé/total/solde et les réponses aux questions.

Les recherches entre modules (résolution ou création de la personne visiteuse, chargement de l'église pour les courriels) passent par `getMembershipModuleGateway()` — le module content ne lit jamais directement les tables de membership.

## Pages connexes

- [Dons](./giving.md) — l'abstraction de passerelle, le registre des fournisseurs et le modèle de tokenisation que cette fonction réutilise
- [Points de terminaison Content](../api/endpoints/content.md) — la surface REST du module content
- [Webhooks](../api/webhooks.md) — l'événement `registration.created`
- [Structure des modules](../api/module-structure.md) — organisation côté serveur du module content
