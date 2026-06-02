---
title: "Text In Church"
---

# Text In Church

<div class="article-intro">

[Text In Church](https://textinchurch.com) regroupe les SMS plus les workflows de goutte-à-goutte et les automatisations de carte de connexion. Son application Zapier expose les deux directions — canalisez les événements B1 dans un flux de travail Text In Church, et tirez les déclencheurs de carte de connexion ou de nouveau contact de l'autre côté dans B1.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Un compte [Text In Church](https://textinchurch.com) sur un plan qui inclut l'intégration Zapier
- Un compte [Zapier](https://zapier.com)
- Un utilisateur B1Admin avec la permission **Modifier les paramètres**

</div>

## Ce que vous pouvez connecter

| Direction | Déclencheur | Action |
|---|---|---|
| B1 → Text In Church | B1 `person.created` | Créer/Mettre à jour une personne + Ajouter à un groupe |
| B1 → Text In Church | B1 `form.submission.created` | Envoyer un message texte via l'équipe pertinente |
| B1 → Text In Church | B1 `group.member.added` | Ajouter à un groupe (miroir l'adhésion au groupe) |
| Text In Church → B1 | Carte de connexion soumise | B1 : Créer une personne + Ajouter un membre de groupe |
| Text In Church → B1 | Personne créée | B1 : Créer une personne |
| Text In Church → B1 | Personne a rejoint un groupe | B1 : Ajouter un membre de groupe |

Les actions Text In Church incluent aussi *Envoyer un message texte*, *Envoyer une diffusion vocale*, *Créer une tâche*, *Trouver une personne/groupe*, et ajouter/supprimer l'adhésion au groupe.

## Configuration

### 1. Créer une clé API B1

**Paramètres → Développeur → Clés API → Nouvelle clé API** :

- `settings:write` — requis pour les Zaps déclenchés par B1
- `people:read`, `people:write` — pour trouver ou créer la personne
- `groups:write` — pour synchroniser l'adhésion au groupe
- (Optionnel) `donations:write` si vous connectez les confirmations de cadeaux à TIC

### 2. Connecter Text In Church à Zapier

Suivez le [guide d'intégration Zapier de Text In Church](https://help.textinchurch.com/en/articles/3943363-text-in-church-s-zapier-integration). Ils génèrent un jeton API à partir du tableau de bord TIC.

### 3. Créer le Zap « carte de connexion à B1 »

La direction la plus courante. Les cartes de connexion déclenchées par TIC deviennent automatiquement de nouvelles personnes B1.

1. **Déclencheur** — Text In Church : Carte de connexion soumise.
2. **Action** — B1.church : Trouver une personne (par email).
3. **Chemin** — bifurquer sur trouvée / non trouvée :
   - Non trouvée → B1.church : Créer une personne.
   - Trouvée → continuer.
4. **Action** — B1.church : Ajouter un membre de groupe à un groupe « Nouveau contact ».

Activez le Zap. La prochaine carte de connexion soumise via TIC arrive dans **B1Admin → Personnes** automatiquement.

## Recettes courantes

### Déclencher un flux de travail de style carte de connexion à partir d'un formulaire B1

- **Déclencheur** — B1.church : Nouvelle soumission de formulaire (filtre sur l'id du formulaire « Je suis nouveau ici »)
- **Action** — Text In Church : Créer/Mettre à jour une personne, mappant les réponses email / téléphone / nom du formulaire
- **Action** — Text In Church : Ajouter à un groupe, où le groupe a un flux de travail de bienvenue pré-construit attaché

### Miroir l'adhésion au groupe

- **Déclencheur** — B1.church : Nouveau membre du groupe, filtré sur un `groupId` spécifique
- **Action** — Text In Church : Ajouter à un groupe (même personne, groupe miroir). Associer avec un Zap `group.member.removed` si vous voulez la synchronisation complète.

### Appeler un leader quand quelqu'un rejoint

- **Déclencheur** — B1.church : Nouveau membre du groupe
- **Action** — Text In Church : Envoyer un message texte, destinataire = le téléphone du leader du groupe, corps = `"{first} {last} vient de rejoindre {group}"`.

## Limites et remarques

- **L'application Zapier de TIC se place derrière le niveau du plan.** Si l'intégration Zapier est grisée dans le tableau de bord TIC, contactez le support TIC pour l'activer sur votre plan.
- **Les ids de groupe sont ceux de TIC, pas de B1.** Lors de la mise en miroir, vous maintiendrez un tableau de mappage quelque part (une *Lookup Table* Zapier, ou codé en dur par Zap).
- **Envoyer un message texte coûte des crédits.** Chaque Zap qui se déclenche *Envoyer un message texte* consomme de votre allocation SMS TIC.

## Dépannage

- **Le déclencheur Connect-Card ne se déclenche pas** — TIC a besoin du basculement d'intégration Zapier activé. Aussi vérifiez que le formulaire que vous avez testé est configuré comme une « Carte de connexion », pas une enquête générique.
- **Créer une personne dans B1 échoue avec 401** — la clé API est incorrecte, révoquée, ou manque `people:write`. Re-créez.
- **Personnes B1 doublées** — TIC envoie à la fois *Personne créée* et *Carte de connexion soumise* pour le même événement. Choisissez l'une comme source de vérité et ajoutez un Filtre Zapier sur l'autre.

## Voir aussi

- [Clearstream](./clearstream) — plate-forme SMS alternative avec forme Zapier similaire
- [Zapier (aperçu)](../zapier) — côté B1 de chaque recette Zapier
- [Guide Zapier Text In Church](https://help.textinchurch.com/en/articles/3943363-text-in-church-s-zapier-integration) (docs TIC)
