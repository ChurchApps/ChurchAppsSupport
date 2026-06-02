---
title: "VOMO"
---

# VOMO

<div class="article-intro">

VOMO est une plate-forme d'engagement des bénévoles — les gens s'inscrivent aux projets, se présentent au kiosque et accumulent les heures. Si vous utilisez VOMO pour la programmation des bénévoles mais B1 pour les dossiers des personnes, Zapier peut synchroniser l'adhésion et les présentations entre eux pour que ni l'un ni l'autre ne dérivent.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Un compte [VOMO](https://vomo.org) sur un plan qui expose Zapier (consultez le support VOMO si vous n'êtes pas sûr)
- Un compte [Zapier](https://zapier.com)
- Un utilisateur B1Admin avec la permission **Modifier les paramètres**

</div>

## Ce que vous pouvez connecter

L'application Zapier de VOMO expose quatre déclencheurs instantanés et quatre actions. Les recettes que la plupart des églises veulent :

| Direction | Déclencheur | Action |
|---|---|---|
| VOMO → B1 | Adhésion VOMO (créée) | B1 : Trouver une personne → Créer une personne (si nouvelle) |
| VOMO → B1 | Présentation au kiosque VOMO | B1 : Ajouter un membre de groupe à un groupe « Actuellement au service », ou enregistrer comme participation |
| B1 → VOMO | B1 `person.created` | VOMO : Trouver l'organisateur (par email); sinon étape personnalisée |
| Soit | Participation VOMO (inscriptions) | B1 : Ajouter un membre de groupe au groupe spécifique au projet |

Les actions VOMO sont limitées à **projets brouillon** et **trouver** les organisateurs/projets existants — il n'y a pas d'action « ajouter cette personne à un projet VOMO » aujourd'hui. Le câblage intéressant est principalement VOMO → B1.

## Configuration

### 1. Créer une clé API B1

**Paramètres → Développeur → Clés API → Nouvelle clé API**. Scopes :

- `people:read`, `people:write` — pour rechercher et créer des bénévoles en tant que personnes B1
- `groups:write` — pour les ajouter à des groupes d'équipe de service
- (Optionnel) `attendance:write` si vous traitez les présentations au kiosque comme une participation

### 2. Créer le Zap de synchronisation d'adhésion

1. **Déclencheur** — VOMO : Adhésion (événement = `created`).
2. **Action** — B1.church : Trouver une personne, appariée sur l'email.
3. **Filtre / Chemin** — bifurquer sur trouvée vs. non trouvée :
   - Non trouvée → B1.church : Créer une personne, puis Ajouter un membre de groupe au groupe de bénévoles approprié.
   - Trouvée → B1.church : Ajouter un membre de groupe directement.
4. Activez. Les nouveaux bénévoles VOMO apparaissent maintenant dans B1 avec l'adhésion au groupe appropriée.

### 3. (Optionnel) Créer le Zap de présentation au kiosque

1. **Déclencheur** — VOMO : Kiosque
2. **Action** — B1.church : Trouver une personne (par email)
3. **Action** — votre choix :
   - *Si traiter comme participation* — Webhooks by Zapier POST au point de terminaison `/attendance/visits` de B1 (l'application Zapier B1 n'a pas encore d'action *Enregistrer la participation* de première classe). La [clé API](/docs/developer/api/api-keys) B1 va dans l'en-tête `Authorization: Bearer cak_…`.
   - *Si traiter comme adhésion au groupe* — B1.church : Ajouter un membre de groupe avec un groupe « Actuellement au service (Aujourd'hui) », et un deuxième Zap plus tard dans la journée les supprime via un nettoyage programmé.

## Recettes courantes

### Synchronisation de groupe par projet

- **Déclencheur** — VOMO : Participation (créée)
- **Action** — Filtre par Zapier sur l'id du projet, puis
- **Action** — B1.church : Ajouter un membre de groupe à un groupe B1 dont le nom reflète le projet VOMO.

Quand le projet VOMO se termine, effacez manuellement le groupe B1 (ou associez cela avec un déclencheur *Participation supprimée* qui les supprime).

### Envoyer un « merci de vous être inscrit » texte via SMS

Chaîne VOMO Participation → Clearstream Envoyer un texte ou Text In Church Envoyer un message dans le même Zap. Les deux ont des actions Zapier de première classe — voir [Clearstream](./clearstream) et [Text In Church](./text-in-church).

### Détecter l'abandon

Exécutez un déclencheur *Horaire* Zapier quotidien qui appelle Trouver l'organisateur dans VOMO pour une liste de personnes B1 qui ont rejoint l'équipe de service ce mois-ci — si VOMO retourne « non trouvé », ils n'ont pas activé VOMO et ont besoin d'une poussée.

## Limites et remarques

- **L'email est la clé de jointure.** Les payloads VOMO exposent un email d'utilisateur mais pas d'id de personne B1. Les donateurs qui utilisent des emails différents dans chaque système créeront des doublons.
- **Pas d'action « Ajouter à un projet » dans l'application Zapier de VOMO aujourd'hui.** Si vous avez besoin d'inscriptions au projet B1 → VOMO, vous posteriez à l'API REST de VOMO à partir d'une étape *Webhooks by Zapier*, ce qui est une intégration personnalisée.
- **Les niveaux gratuits / inférieurs de VOMO peuvent ne pas inclure Zapier.** Confirmez avec le support VOMO avant de promettre une date de câblage.

## Dépannage

- **Le déclencheur ne se déclenche jamais** — les déclencheurs instantanés de VOMO nécessitent que le jeton API reste valide. Re-testez le Zap; reconnectez VOMO si le jeton a été tourné.
- **B1 *Ajouter un membre de groupe* échoue avec 422** — l'id du groupe dans l'action n'existe pas. Ouvrez **B1Admin → Groupes**, cliquez sur le groupe, et copiez le segment d'id de l'URL dans l'étape Zap.
- **Personnes B1 doublées à partir d'un seul bénévole VOMO** — ils se sont probablement inscrits sous un email différent de celui qu'ils avaient déjà dans B1. Soit standardisez les emails, soit ajoutez un *Chemin* Zapier qui cherche aussi par téléphone avant de créer.

## Voir aussi

- [Zapier (aperçu)](../zapier) — côté B1 de chaque recette Zapier
- [Clearstream](./clearstream), [Text In Church](./text-in-church) — associez les inscriptions de bénévoles aux confirmations SMS
- [Webhooks (référence développeur)](/docs/developer/api/webhooks) — les événements sur lesquels VOMO peut se déclencher
