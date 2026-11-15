---
title: "VOMO"
description: "Reliez les inscriptions de bénévoles et les pointages en borne VOMO aux personnes et aux groupes de B1 Admin avec Zapier, y compris les portées de clé API et les étapes de configuration."
---

# VOMO

<div class="article-intro">

VOMO est une plateforme d'engagement des bénévoles : les personnes s'inscrivent à des projets, pointent à la borne et cumulent des heures. Si vous utilisez VOMO pour la planification des bénévoles mais B1 pour les fiches de personnes, Zapier peut synchroniser l'appartenance et les pointages entre les deux, pour que les données ne divergent pas.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Un compte [VOMO](https://vomo.org) avec un forfait donnant accès à Zapier (renseignez-vous auprès du support VOMO en cas de doute)
- Un compte [Zapier](https://zapier.com)
- Un utilisateur B1Admin disposant de l'autorisation **Modifier les paramètres**

</div>

## Ce que vous pouvez configurer {#what-you-can-wire-up}

L'application Zapier de VOMO propose quatre déclencheurs instantanés et quatre actions. Les recettes les plus demandées par les églises :

| Sens | Déclencheur | Action |
|---|---|---|
| VOMO → B1 | Adhésion VOMO (créée) | B1 : Rechercher une personne → Créer une personne (si nouvelle) |
| VOMO → B1 | Pointage à la borne VOMO | B1 : Ajouter un membre de groupe à un groupe « En service actuellement », ou enregistrer comme fréquentation |
| B1 → VOMO | B1 `person.created` | VOMO : Rechercher un organisateur (par courriel) ; sinon étape personnalisée |
| Les deux | Participation VOMO (inscriptions) | B1 : Ajouter un membre de groupe au groupe propre au projet |

Les actions VOMO se limitent à **créer des brouillons de projets** et à **rechercher** des organisateurs ou des projets existants — il n'existe pas aujourd'hui d'action « ajouter cette personne à un projet VOMO ». L'essentiel de la liaison va donc de VOMO vers B1.

## Configuration {#setup}

### 1. Créer une clé API B1 {#1-mint-a-b1-api-key}

**Paramètres → Développeur → Clés API → Nouvelle clé API**. Portées :

- `settings:write` — Zapier vérifie chaque clé B1 par rapport à la liste des webhooks de B1 lors de la connexion ; sans cette portée, la connexion échoue
- `people:read`, `people:write` — pour rechercher et créer les bénévoles en tant que personnes B1
- `groups:write` — pour les ajouter aux groupes d'équipes de service
- (Facultatif) `attendance:write` si vous traitez les pointages à la borne comme des présences

### 2. Créer le Zap de synchronisation des adhésions {#2-build-the-membership-sync-zap}

1. **Déclencheur** — VOMO : Adhésion (événement = `created`).
2. **Action** — B1.church : Rechercher une personne, par courriel.
3. **Action** — B1.church : Ajouter un membre de groupe, en ajoutant la personne de l'étape 2 au groupe de bénévoles approprié.

   L'étape *Rechercher une personne* de B1 arrête le Zap avec une erreur « No person found » lorsque personne ne correspond. Pour les bénévoles qui ne sont pas encore dans B1, activez la gestion des erreurs de Zapier pour l'étape Rechercher une personne et exécutez, dans son chemin d'erreur, B1.church : Créer une personne, puis Ajouter un membre de groupe.
4. Activez. Les nouveaux bénévoles VOMO apparaissent désormais dans B1 avec la bonne appartenance à un groupe.

### 3. (Facultatif) Créer le Zap de pointage à la borne {#3-optional-build-the-kiosk-check-in-zap}

1. **Déclencheur** — VOMO : Borne
2. **Action** — B1.church : Rechercher une personne (par courriel)
3. **Action** — à votre choix :
   - *Si vous traitez le pointage comme une présence* — Webhooks by Zapier POST vers le point de terminaison `/attendance/visits` de B1 (l'application Zapier de B1 ne dispose pas encore d'une action *Enregistrer une présence* dédiée). La [clé API](/docs/developer/api/api-keys) de B1 va dans l'en-tête `Authorization: Bearer cak_…`.
   - *Si vous traitez le pointage comme une appartenance à un groupe* — B1.church : Ajouter un membre de groupe à un groupe « En service actuellement (aujourd'hui) », puis un second Zap planifié plus tard dans la journée les retire via un nettoyage programmé.

## Recettes courantes {#common-recipes}

### Synchronisation des groupes par projet {#per-project-group-sync}

- **Déclencheur** — VOMO : Participation (créée)
- **Action** — Filtre Zapier sur l'identifiant du projet, puis
- **Action** — B1.church : Ajouter un membre de groupe à un groupe B1 dont le nom reprend celui du projet VOMO.

Lorsque le projet VOMO se termine, videz manuellement le groupe B1 (ou associez cette recette à un déclencheur *Participation supprimée* qui retire les personnes).

### Envoyer un SMS de « merci pour votre inscription » {#send-a-thanks-for-signing-up-text-via-sms}

Enchaînez VOMO Participation → Clearstream Envoyer un SMS ou Text In Church Envoyer un message dans le même Zap. Ces deux services disposent d'actions Zapier de premier plan — voir [Clearstream](./clearstream.md) et [Text In Church](./text-in-church.md).

### Détecter les désengagements {#detect-drop-off}

Exécutez un déclencheur *Planification* Zapier quotidien qui appelle Rechercher un organisateur dans VOMO pour une liste de personnes B1 ayant rejoint l'équipe de service ce mois-ci — si VOMO répond « not found », elles n'ont pas activé leur compte VOMO et ont besoin d'un rappel.

## Limites et remarques {#limits--notes}

- **Le courriel est la clé de jointure.** Les charges utiles de VOMO exposent un courriel d'utilisateur mais aucun identifiant de personne B1. Les donateurs qui utilisent des courriels différents dans chaque système créeront des doublons.
- **Pas d'action « Ajouter à un projet » dans l'application Zapier de VOMO pour l'instant.** Si vous avez besoin d'inscrire une personne de B1 à un projet VOMO, vous devrez envoyer une requête POST à l'API REST de VOMO depuis une étape *Webhooks by Zapier*, ce qui constitue une intégration sur mesure.
- **Les forfaits gratuits ou d'entrée de gamme de VOMO peuvent ne pas inclure Zapier.** Confirmez auprès du support VOMO avant de promettre une date de mise en place.

## Dépannage {#troubleshooting}

- **Le déclencheur ne se déclenche jamais** — les déclencheurs instantanés de VOMO exigent que le jeton d'API reste valide. Testez de nouveau le Zap ; reconnectez VOMO si le jeton a été renouvelé.
- **L'action *Ajouter un membre de groupe* de B1 échoue** — le groupe indiqué dans l'action n'existe plus. Choisissez de nouveau le groupe dans la liste déroulante **Groupe** de l'étape, ou ouvrez le groupe dans B1Admin (**Personnes > Groupes**) et copiez l'identifiant à la fin de son adresse web.
- **Doublons de personnes B1 pour un même bénévole VOMO** — il s'est probablement inscrit avec un courriel différent de celui qu'il avait déjà dans B1. Uniformisez les courriels, ou ajoutez un *Chemin* Zapier qui recherche aussi par téléphone avant de créer.

## Voir aussi {#see-also}

- [Zapier (présentation)](../zapier.md) — volet B1 de chaque recette Zapier
- [Clearstream](./clearstream.md), [Text In Church](./text-in-church.md) — associer les inscriptions de bénévoles à des confirmations par SMS
- [Webhooks (référence développeur)](/docs/developer/api/webhooks) — les événements sur lesquels VOMO peut se déclencher
