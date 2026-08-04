---
title: "Inscriptions aux événements"
---

# Inscriptions aux événements

<div class="article-intro">

L'inscription native aux événements vit dans le module content et, depuis la vague des inscriptions payantes, porte un modèle commercial complet : types de participants tarifés, sélections d'options tarifées, codes de réduction, paiements via la passerelle de dons existante de l'église, et une liste d'attente pilotée par statut. Le circuit de l'argent réutilise délibérément la pile de dons — le contrôleur d'inscription facture via la même abstraction `GatewayService` / `IGatewayProvider` documentée dans [Dons](./giving), si bien qu'aucune connaissance des données de carte ou du SDK de passerelle ne vit dans le module content. Cette page décrit le modèle de données, les règles de tarification et de capacité, et les flux d'inscription, de paiement, et de liste d'attente.

</div>

## Vue d'ensemble

```
┌──────────────────────────────┐            ┌─────────────────────────────────────────────┐
│ B1App (portail des membres)  │            │ Api — module content                        │
│  assistant d'inscription ·   │   HTTPS    │  RegistrationController                     │
│  Mes inscriptions            │ ─────────▶ │   /content/registrations                    │
├──────────────────────────────┤            │  RegistrationPricingHelper (tarif serveur)  │
│ B1Admin (personnel)          │            │  RegistrationHelper (e-mails)                │
│  paramètres d'inscription    │            └───────────────┬─────────────────────────────┘
│  · registre · export CSV     │                            │ processCharge
└──────────────────────────────┘                            ▼
                                            ┌─────────────────────────────────────────────┐
                                            │ abstraction de passerelle partagée (giving) │
                                            │  GatewayService → IGatewayProvider          │
                                            │  Stripe · PayPal · Kingdom Funding          │
                                            └─────────────────────────────────────────────┘
```

Trois règles tiennent sur l'ensemble de la pile :

1. **Le serveur détient le prix.** Les clients soumettent des id de type, des id de sélection, et des quantités ; `RegistrationPricingHelper.computeTotal()` calcule le total côté serveur et les coupons sont re-validés au moment de la charge. Un montant fourni par le client n'est jamais approuvé.
2. **La capacité est appliquée de manière atomique au moment de l'insertion.** Chaque insertion limitée en capacité utilise une instruction `INSERT … SELECT … FROM dual WHERE (nombre de lignes actives) < capacité`, si bien que deux inscriptions simultanées ne peuvent pas toutes deux prendre la dernière place. Les compteurs sont dérivés du statut (`pending`/`confirmed`), jamais stockés.
3. **Les paiements empruntent les rails des dons.** `RegistrationController` appelle le `GatewayService.processCharge` partagé avec la passerelle configurée de l'église — la même abstraction de fournisseur, le même modèle de tokenisation, et la même gestion SCA que pour les dons.

## Modèle de données (`Api/src/modules/content`)

Les modèles sont dans `models/Registration.ts` ; les correspondances de table dans `db/DatabaseTypes.ts` ; un référentiel par table sous `repositories/`.

| Table | Signification | Champs clés |
|-------|---------|-----------|
| `registrations` | Une inscription (un foyer/groupe pour un événement) | eventId, personId, householdId, **status** (`pending` / `confirmed` / `waitlisted` / `cancelled`), totalAmount, amountPaid, couponId, waitlistNotifiedDate, registeredDate, cancelledDate |
| `registrationMembers` | Un participant sur une inscription | registrationId, personId, firstName, lastName, **registrationTypeId** |
| `registrationTypes` | Types de participant par événement (par ex. Adulte / Enfant) | eventId, name, description, **price**, **capacity**, minAgeYears, maxAgeYears, formId, sort, active |
| `registrationSelections` | Options complémentaires nommées avec un prix (par ex. T-shirt) | eventId, name, description, **price**, **capacity**, **maxQuantity** (plafond par inscription), sort, active |
| `registrationSelectionChoices` | Quantité d'une sélection choisie par une inscription/un membre | registrationId, registrationMemberId, selectionId, **quantity** |
| `registrationPayments` | Une charge réussie contre une inscription | registrationId, gatewayId, provider, transactionId, method, amount, currency, kind (`charge`), status (`succeeded`), personId |
| `registrationCoupons` | Codes de réduction par événement | eventId, code, **discountType** (`percent` / `amount`), **value**, startDate, endDate, **minMembers**, **maxUses**, active |

Notes :

- **Il n'y a pas de table de liste d'attente.** Les groupes en liste d'attente sont des lignes `registrations` avec `status = 'waitlisted'` ; tout le cycle de vie de la liste d'attente n'est que des transitions de statut sur cette table unique.
- **Aucun compteur stocké.** Les décomptes « vendu » / « utilisé » (capacité de l'événement, capacité par type, capacité par sélection, utilisations de coupon) sont calculés avec des sous-requêtes corrélées sur les lignes dont le statut est dans `('pending','confirmed')` (`RegistrationTypeRepo.loadActiveWithUsage`, `RegistrationRepo.countActiveForEvent` / `countActiveForCoupon`). Annuler une inscription libère donc de la capacité sans aucune comptabilité.
- Les prix sont des colonnes DECIMAL MySQL (chaînes sur le fil) converties avec `Number()` à l'intérieur de l'aide de tarification.

## Surface REST

Tout se trouve sous `/content/registrations` (`controllers/RegistrationController.ts`), protégé par `Permissions.registrations` (`view` / `edit`) :

| Route | Accès | Objet |
|-------|--------|---------|
| `POST /register` | anonyme | Soumission complète : invité ou membre, tarification serveur, vérifications de capacité, charge optionnelle |
| `GET /types/event/:eventId`, `GET /selections/event/:eventId` | public | Types/sélections avec `used` / `remainingCapacity` dérivés pour l'assistant |
| `POST /types`, `DELETE /types/:id` (idem pour `/selections`, `/coupons`) | `registrations.edit` | CRUD des paramètres du personnel |
| `POST /coupons/validate` | public | Validation de code de réduction en ligne pendant l'assistant |
| `GET /coupons/event/:eventId` | personnel | Coupons avec compteurs d'utilisation |
| `GET /event/:eventId` · `GET /event/:eventId/count` | personnel · public | Registre ; compte actif pour l'affichage de la capacité |
| `GET /person/:personId` · `GET /:id` · `GET /payments/:registrationId` | authentifié | Mes inscriptions, détail, historique de paiement |
| `PUT /:id` | propriétaire/personnel | Édition post-soumission — remplace les membres et les choix de sélection avec de nouvelles vérifications de capacité atomiques, recalcule `totalAmount` ; ne facture ni ne rembourse jamais automatiquement |
| `POST /:id/pay` | propriétaire | « Compléter le paiement » : facture `totalAmount − amountPaid`, bascule `waitlisted`/`pending` → `confirmed` |
| `POST /:id/promote` | personnel | Promotion manuelle depuis la liste d'attente |
| `POST /:id/cancel` · `DELETE /:id` | propriétaire · personnel | Annuler / supprimer ; les deux déclenchent la promotion automatique de liste d'attente |

Une inscription existante non annulée pour la même `personId` sur le même événement est rejetée avec 409, et chaque inscription créée émet un webhook `registration.created` via `WebhookDispatcher`.

## Tarification et codes de réduction

`helpers/RegistrationPricingHelper.ts` est l'autorité unique en matière de calcul monétaire :

- `computeTotal()` additionne le prix de type de chaque membre plus le `price × quantity` de chaque choix de sélection.
- `validateCoupon()` applique le drapeau actif, la fenêtre de dates (`startDate`/`endDate`), `minMembers` par rapport à la taille du groupe soumis, et `maxUses` par rapport au compte de rachat dérivé du statut.
- `applyDiscount()` — `percent` soustrait `total × value/100` ; `amount` soustrait `value` ; les deux ont un plancher à zéro.

L'assistant appelle `POST /coupons/validate` pour un retour en ligne, mais `register` re-valide et ré-applique le coupon côté serveur — le total affiché côté client n'est qu'indicatif.

## L'idiome atomique de capacité

Chaque insertion limitée en capacité s'exécute en toute sécurité en situation de concurrence, sans transactions ni verrous, en intégrant la vérification de capacité à l'`INSERT` lui-même. Au niveau événement (`RegistrationRepo.atomicInsertWithCapacityCheck`) :

```sql
INSERT INTO registrations (id, churchId, eventId, ...)
  SELECT ?, ?, ?, ...
  FROM dual
  WHERE (SELECT COUNT(*) FROM registrations
         WHERE eventId=? AND churchId=? AND status IN ('pending','confirmed')) < ?
```

Zéro ligne affectée signifie « à capacité ». Le même idiome protège les insertions par type (`RegistrationMemberRepo.atomicInsertWithTypeCapacity`, comptant les membres joints aux inscriptions actives) et les quantités par sélection (`RegistrationSelectionChoiceRepo.atomicInsertWithCapacityCheck`, en utilisant `COALESCE(SUM(quantity),0) + ? <= capacity`). Quand une insertion de membre ou de sélection échoue en cours d'inscription, le contrôleur annule l'inscription partielle avec `deleteCascade()` et signale quel type ou quelle sélection s'est épuisé.

## Flux de paiement

`processRegistrationCharge` dans le contrôleur est le seul endroit où les inscriptions touchent à l'argent, et c'est un client léger de la pile de dons :

```
RegistrationController ─▶ RepoManager.getRepos("giving").gateway
                       ─▶ GatewayService.getGatewayForChurch(churchId, …)
                       ─▶ GatewayService.processCharge(gateway, chargeData)
                             └▶ IGatewayProvider.processCharge  (Stripe / PayPal / Kingdom Funding)
```

La tokenisation se produit dans le navigateur exactement comme pour les dons (voir [Dons](./giving)) — l'assistant réutilise le registre de fournisseurs de paiement apphelper, si bien que les membres connectés peuvent payer avec des cartes enregistrées et les invités tokenisent une nouvelle carte. Le contrôleur reflète les particularités de fournisseur de `DonateController` (id de méthode de paiement `pm-{id}` de Kingdom Funding, réponses SCA `requires_action` de Stripe renvoyées au client sans enregistrer un paiement). Une charge réussie écrit une ligne `registrationPayments`, augmente `amountPaid`, et confirme l'inscription. **Les remboursements ne sont pas implémentés** — une inscription payée annulée conserve ses lignes de paiement, et tout remboursement est géré hors bande dans le tableau de bord de la passerelle.

Les deux points d'entrée passent par le même chemin de code : `register` (payer à l'inscription) et `pay` (paiement de solde / achèvement de liste d'attente).

## Cycle de vie de la liste d'attente

Quand l'événement est complet et que le drapeau `waitlistEnabled` de l'événement est activé, `register` enregistre le groupe comme `waitlisted` (en ignorant les vérifications de capacité) et envoie l'e-mail de confirmation normal marqué comme une place en liste d'attente. La promotion se produit de trois façons — `cancel`, `delete`, et le point de terminaison `promote` du personnel — toutes convergeant vers `RegistrationRepo.promoteFromWaitlist`, qui choisit la ligne en liste d'attente la plus ancienne et la fait basculer atomiquement :

```sql
UPDATE registrations SET status='pending', waitlistNotifiedDate=NOW()
  WHERE id=? AND status='waitlisted'
    AND (…compte actif pour l'événement…) < ?
```

Le garde-fou `status='waitlisted'` signifie que des promotions concurrentes ne peuvent pas promouvoir une même ligne deux fois, et la sous-requête de capacité signifie qu'une promotion ne peut pas survendre. Les lignes promues atterrissent sur `pending` — pas `confirmed` — car un solde peut encore être dû ; `RegistrationHelper.sendWaitlistAvailabilityEmail` indique à l'inscrit que sa place s'est libérée et, quand `totalAmount − amountPaid > 0`, renvoie vers la page de paiement du solde. Payer (ou n'avoir aucun solde) les confirme.

:::info
Une augmentation de capacité ne promeut pas automatiquement d'elle-même — le personnel utilise l'action Promouvoir du registre après avoir augmenté la capacité. Les annulations et suppressions promeuvent automatiquement.
:::

## Surfaces clientes

- **Assistant B1App** — un hook partagé, `B1App/src/components/registration/useEventRegistration.ts`, pilote à la fois le composant du site web (`components/registration/EventRegister.tsx`) et l'écran du portail mobile (`app/[sdSlug]/mobile/components/screens/EventRegisterPage.tsx`) via les étapes `info → members → selections → questions → payment → confirm` (les étapes intermédiaires ne se rendent que quand l'événement a des sélections, un formulaire attaché, ou un total non nul). Les étapes info/membres affichent des sélecteurs par type de participant avec la capacité restante en direct et les états d'épuisement ; le paiement (`RegistrationPaymentForm.tsx`) affiche le résumé de commande, la saisie de code de réduction, et — pour les membres connectés — les méthodes de paiement enregistrées via le registre de fournisseurs apphelper, les invités tokenisant une nouvelle carte. L'écran mobile **Inscriptions** (`screens/RegistrationsPage.tsx`) est Mes inscriptions : statut, solde dû, Compléter le paiement (`POST /:id/pay`), Modifier (`PUT /:id` — contact, types de membres, quantités de sélection), et Annuler.
- **Paramètres B1Admin** — `B1Admin/src/registrations/components/RegistrationSettingsEdit.tsx` ajoute le commutateur Activer la liste d'attente plus des accordéons pour les Types de participant, Sélections, et Codes de réduction (`RegistrationTypesEdit.tsx` / `RegistrationSelectionsEdit.tsx` / `RegistrationCouponsEdit.tsx`), tous en CRUD contre les routes `/types`, `/selections`, `/coupons`.
- **Registre B1Admin** — `B1Admin/src/registrations/RegistrationDetailsPage.tsx` : colonne Type par participant, colonne Payé/Total avec puce de solde, puces de compte par type, une boîte de dialogue de détail des paiements (`RegistrationDetailDialog.tsx`, depuis `GET /payments/:registrationId`), l'action de ligne Promouvoir de la liste d'attente, et un export CSV incluant les types de participant, sélections, payé/total/solde, et réponses aux questions.

Les recherches inter-modules (résoudre ou créer la personne invitée, charger l'église pour les e-mails) passent par `getMembershipModuleGateway()` — le module content ne lit jamais directement les tables d'adhésion.

## Pages connexes

- [Dons](./giving) — l'abstraction de passerelle, le registre de fournisseurs, et le modèle de tokenisation que cette fonctionnalité réutilise
- [Points de terminaison de contenu](../api/endpoints/content) — la surface REST du module content
- [Webhooks](../api/webhooks) — l'événement `registration.created`
- [Structure des modules](../api/module-structure) — comment le module content est organisé côté serveur
