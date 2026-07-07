---
title: "Inscriptions aux événements"
---

# Inscriptions aux événements

<div class="article-intro">

L'inscription aux événements native vit dans le module de contenu et, depuis l'onde de registrations payantes, porte un modèle commercial complet : types de participants tarifés, sélections de modules tarifées, codes de réduction, paiements via la passerelle de dons existante de l'église, et une liste d'attente pilotée par statut. Le chemin d'argent réutilise intentionnellement la pile de dons — le contrôleur d'inscription facture via la même abstraction `GatewayService` / `IGatewayProvider` documentée dans [Dons](./giving), donc aucune connaissance de données de carte ou de SDK de passerelle ne vit dans le module de contenu. Cette page mappe le modèle de données, les règles de prix et de capacité, et les flux d'inscription, paiement, et liste d'attente.

</div>

## Aperçu

```
┌──────────────────────────────┐            ┌─────────────────────────────────────────────┐
│ B1App (portail des membres)        │            │ Api — module de contenu                        │
│  assistant inscription ·       │   HTTPS    │  RegistrationController                     │
│  Mes inscriptions            │ ─────────▶ │   /content/registrations                    │
├──────────────────────────────┤            │  RegistrationPricingHelper (prix serveur) │
│ B1Admin (personnel)              │            │  RegistrationHelper (e-mails)                │
│  paramètres inscription d'événement │            │  └───────────────┬─────────────────────────┘
│  · roster · export CSV       │                            │ processCharge
└──────────────────────────────┘                            ▼
                                            ┌─────────────────────────────────────────────┐
                                            │ abstraction passerelle partagée (dons)         │
                                            │  GatewayService → IGatewayProvider          │
                                            │  Stripe · PayPal · Kingdom Funding          │
                                            └─────────────────────────────────────────────┘
```

Trois règles tiennent dans toute la pile :

1. **Le serveur possède le prix.** Les clients soumettent les ids de type, les ids de sélection, et les quantités ; `RegistrationPricingHelper.computeTotal()` calcule le total côté serveur et les coupons sont re-validés au moment de la charge. Un montant fourni par client n'est jamais approuvé.
2. **La capacité est appliquée de manière atomique au moment de l'insertion.** Chaque insertion limitée à la capacité utilise une statement `INSERT … SELECT … FROM dual WHERE (le compte de lignes actives) < capacité`, donc deux inscriptions simultanées ne peuvent pas toutes les deux prendre la dernière place. Les comptes sont dérivés du statut (`pending`/`confirmed`), jamais stockés.
3. **Les paiements montent les rails de dons.** `RegistrationController` appelle le `GatewayService.processCharge` partagé avec la passerelle configurée de l'église — la même abstraction de fournisseur, le même modèle de tokenisation, et le même gestion SCA que les dons.

## Modèle de données (`Api/src/modules/content`)

Les modèles sont dans `models/Registration.ts` ; les cartographies de table dans `db/DatabaseTypes.ts` ; un référentiel par table sous `repositories/`.

| Table | Sens | Champs clés |
|-------|---------|-----------|
| `registrations` | Une inscription (un ménage/parti pour un événement) | eventId, personId, householdId, **status** (`pending` / `confirmed` / `waitlisted` / `cancelled`), totalAmount, amountPaid, couponId, waitlistNotifiedDate, registeredDate, cancelledDate |
| `registrationMembers` | Un participant sur une inscription | registrationId, personId, firstName, lastName, **registrationTypeId** |
| `registrationTypes` | Types de participant par événement (par ex. Adulte / Enfant) | eventId, name, description, **price**, **capacity**, minAgeYears, maxAgeYears, formId, sort, active |
| `registrationSelections` | Options de module nommées avec un prix (par ex. T-shirt) | eventId, name, description, **price**, **capacity**, **maxQuantity** (plafond par inscription), sort, active |
| `registrationSelectionChoices` | Quantité d'une sélection choisie par une inscription/membre | registrationId, registrationMemberId, selectionId, **quantity** |
| `registrationPayments` | Une charge réussie contre une inscription | registrationId, gatewayId, provider, transactionId, method, amount, currency, kind (`charge`), status (`succeeded`), personId |
| `registrationCoupons` | Codes de réduction par événement | eventId, code, **discountType** (`percent` / `amount`), **value**, startDate, endDate, **minMembers**, **maxUses**, active |

Notes :

- **Il n'y a aucune table de liste d'attente.** Les partis en liste d'attente sont des lignes `registrations` avec `status = 'waitlisted'` ; tout le cycle de vie de la liste d'attente est des transitions de statut sur cette seule table.
- **Pas de compteurs stockés.** Les comptes "Vendu" / "utilisé" (capacité d'événement, capacité par type, capacité par sélection, utilisation de coupon) sont calculés avec les sous-requêtes corrélées sur les lignes dont le statut est dans `('pending','confirmed')` (`RegistrationTypeRepo.loadActiveWithUsage`, `RegistrationRepo.countActiveForEvent` / `countActiveForCoupon`). Annuler une inscription libère donc la capacité sans comptabilité.
- Les prix sont des colonnes DECIMAL MySQL (chaînes sur le fil) coercé avec `Number()` à l'intérieur de l'aide de tarification.

## Surface REST

Tout est sous `/content/registrations` (`controllers/RegistrationController.ts`), ferme par `Permissions.registrations` (`view` / `edit`) :

| Route | Accès | Objet |
|-------|--------|---------|
| `POST /register` | anonyme | Soumission complète : invité ou membre, prix serveur, vérifications de capacité, charge optionnelle |
| `GET /types/event/:eventId`, `GET /selections/event/:eventId` | public | Types/sélections avec usage dérivé `used` / `remainingCapacity` pour l'assistant |
| `POST /types`, `DELETE /types/:id` (même pour `/selections`, `/coupons`) | `registrations.edit` | CRUD paramètres du personnel |
| `POST /coupons/validate` | public | Validation de code de réduction en ligne pendant l'assistant |
| `GET /coupons/event/:eventId` | personnel | Coupons avec comptes d'utilisation |
| `GET /event/:eventId` · `GET /event/:eventId/count` | personnel · public | Roster ; compte-actif pour l'affichage de capacité |
| `GET /person/:personId` · `GET /:id` · `GET /payments/:registrationId` | autentifié | Mes inscriptions, détail, historique de paiement |
| `PUT /:id` | propriétaire/personnel | Post-édition de soumission — remplace les membres et les choix de sélection avec les vérifications de capacité atomiques fraîches, recalcule `totalAmount` ; jamais auto-charges ou remboursements |
| `POST /:id/pay` | propriétaire | "Payer le solde" : facture `totalAmount − amountPaid`, bascule `waitlisted`/`pending` → `confirmed` |
| `POST /:id/promote` | personnel | Promotion manuelle de liste d'attente |
| `POST /:id/cancel` · `DELETE /:id` | propriétaire · personnel | Annuler / supprimer ; les deux déclenchent la promotion auto de liste d'attente |

Une inscription existante non-annulée pour le même `personId` sur le même événement est rejetée avec 409, et chaque inscription créée émet un webhook `registration.created` via `WebhookDispatcher`.

## Tarification et codes de réduction

`helpers/RegistrationPricingHelper.ts` est l'autorité unique de math d'argent :

- `computeTotal()` somme le prix de type de chaque membre plus le prix `price × quantity` de chaque choix de sélection.
- `validateCoupon()` applique le drapeau actif, la fenêtre de date (`startDate`/`endDate`), `minMembers` par rapport à la taille de parti soumise, et `maxUses` par rapport au compte de rachat dérivé du statut.
- `applyDiscount()` — `percent` soustrait `total × value/100` ; `amount` soustrait `value` ; les deux plancher à zéro.

L'assistant appelle `POST /coupons/validate` pour la rétroaction en ligne, mais `register` re-valide et re-applique le coupon côté serveur — le total affiché du client est consultatif seulement.

## L'idiome atomique de capacité

Chaque insertion limitée à la capacité court de manière sûre sans transactions ou verrous en faisant la vérification de capacité partie de l'`INSERT` elle-même. Au niveau événement (`RegistrationRepo.atomicInsertWithCapacityCheck`) :

```sql
INSERT INTO registrations (id, churchId, eventId, ...)
  SELECT ?, ?, ?, ...
  FROM dual
  WHERE (SELECT COUNT(*) FROM registrations
         WHERE eventId=? AND churchId=? AND status IN ('pending','confirmed')) < ?
```

Zéro lignes affectées signifie "à capacité". L'idiome même garde les insertions par type (`RegistrationMemberRepo.atomicInsertWithTypeCapacity`, comptage des membres joints aux inscriptions actives) et les quantités par sélection (`RegistrationSelectionChoiceRepo.atomicInsertWithCapacityCheck`, utilisant `COALESCE(SUM(quantity),0) + ? <= capacity`). Quand la sélection de membre ou d'insertion échoue à mi-inscription, le contrôleur revient l'inscription partielle avec `deleteCascade()` et signale quel type ou sélection s'est épuisée.

## Flux de paiement

`processRegistrationCharge` dans le contrôleur est le seul lieu où les inscriptions touchent l'argent, et c'est un client fin de la pile de dons :

```
RegistrationController ─▶ RepoManager.getRepos("giving").gateway
                       ─▶ GatewayService.getGatewayForChurch(churchId, …)
                       ─▶ GatewayService.processCharge(gateway, chargeData)
                             └▶ IGatewayProvider.processCharge  (Stripe / PayPal / Kingdom Funding)
```

La tokenisation arrive dans le navigateur exactement comme pour les dons (voir [Dons](./giving)) — l'assistant réutilise le registre de fournisseur de paiement apphelper, donc les membres connectés peuvent payer avec les cartes enregistrées et les invités tokenisent une nouvelle carte. Le contrôleur reflète les bizarreries du fournisseur de `DonateController` (ids de méthode de paiement `pm-{id}` de Kingdom Funding, les réponses Stripe SCA `requires_action` retournées au client sans enregistrer un paiement). Une charge réussie écrit une ligne `registrationPayments`, monte `amountPaid`, et confirme l'inscription. **Les remboursements ne sont pas implémentés** — une inscription payée annulée garde ses lignes de paiement et tout remboursement est géré en dehors dans le tableau de bord de passerelle.

Les deux points d'entrée acheminent via le même chemin de code : `register` (payer à l'inscription) et `pay` (paiement de solde / accomplissement de liste d'attente).

## Cycle de vie de liste d'attente

Quand l'événement est complet et le drapeau `waitlistEnabled` de l'événement est allumé, `register` sauvegarde le parti comme `waitlisted` (ignorant les vérifications de capacité) et envoie l'e-mail de confirmation normal marqué comme une place de liste d'attente. La promotion arrive trois voies — `cancel`, `delete`, et le point de terminaison `promote` du personnel — tous l'entonnoir dans `RegistrationRepo.promoteFromWaitlist`, qui choisit la ligne en liste d'attente la plus ancienne et la bascule de manière atomique :

```sql
UPDATE registrations SET status='pending', waitlistNotifiedDate=NOW()
  WHERE id=? AND status='waitlisted'
    AND (…le compte actif pour l'événement…) < ?
```

Le garde `status='waitlisted'` signifie que les promotions concurrentes ne peuvent pas double-promouvoir une ligne, et la sous-requête de capacité signifie qu'une promotion ne peut pas plus-vendre. Les lignes promues atterrissent sur `pending` — pas `confirmed` — parce qu'un solde peut toujours être dû ; `RegistrationHelper.sendWaitlistAvailabilityEmail` dit au registrant que sa place s'est ouverte et, quand `totalAmount − amountPaid > 0`, relie à la page de paiement du solde. Payer (ou ne pas avoir de solde) les confirme.

:::info
Une augmentation de capacité ne promeut pas automatiquement elle-même — le personnel utilisent l'action Promouvoir du roster après avoir augmenté la capacité. Les annulations et les suppressions promeuvent automatiquement.
:::

## Surfaces clientes

- **Assistant B1App** — un crochet partagé, `B1App/src/components/registration/useEventRegistration.ts`, pilote à la fois le composant de site web (`components/registration/EventRegister.tsx`) et l'écran du portail mobile (`app/[sdSlug]/mobile/components/screens/EventRegisterPage.tsx`) via les étapes `info → members → selections → questions → payment → confirm` (les étapes du milieu se rendent seulement quand l'événement a des sélections, un formulaire attaché, ou un total non-zéro). Les étapes info/membres affichent les sélecteurs par type de participant avec la capacité restante en direct et les états vendus ; le paiement (`RegistrationPaymentForm.tsx`) affiche le résumé de la commande, l'entrée de code de réduction, et — pour les membres connectés — les méthodes de paiement enregistrées via le registre de fournisseur apphelper, avec les invités tokenisant une nouvelle carte. L'écran **Inscriptions** mobile (`screens/RegistrationsPage.tsx`) est Mes inscriptions : statut, solde dû, Payer le solde (`POST /:id/pay`), Modifier (`PUT /:id` — contact, types de membres, quantités de sélection), et Annuler.
- **Paramètres B1Admin** — `B1Admin/src/registrations/components/RegistrationSettingsEdit.tsx` ajoute le commutateur Activer la liste d'attente plus les accordéons pour les types de participant, les sélections, et les codes de réduction (`RegistrationTypesEdit.tsx` / `RegistrationSelectionsEdit.tsx` / `RegistrationCouponsEdit.tsx`), tous CRUD par rapport aux routes `/types`, `/selections`, `/coupons`.
- **Roster B1Admin** — `B1Admin/src/registrations/RegistrationDetailsPage.tsx` : colonne type par participant, colonne Payé/Total avec pastille de solde, pastilles de compte par type, une boîte de dialogue des détails de paiement (`RegistrationDetailDialog.tsx`, à partir de `GET /payments/:registrationId`), l'action de ligne Promouvoir la liste d'attente du personnel, et l'export CSV y compris les types de participant, les sélections, payé/total/solde, et les réponses aux questions.

Les regardes inter-modules (résoudre ou créer la personne d'invité, charger l'église pour les e-mails) traversent `getMembershipModuleGateway()` — le module de contenu ne lit jamais les tables d'adhésion directement.

## Pages connexes

- [Dons](./giving) — l'abstraction de passerelle, le registre de fournisseur, et le modèle de tokenisation que cette fonctionnalité réutilise
- [Points de terminaison de contenu](../api/endpoints/content) — la surface REST du module de contenu
- [Webhooks](../api/webhooks) — l'événement `registration.created`
- [Structure des modules](../api/module-structure) — comment le module de contenu est organisé côté serveur
