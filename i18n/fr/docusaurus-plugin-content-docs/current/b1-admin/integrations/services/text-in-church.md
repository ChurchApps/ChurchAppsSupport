---
title: "Text In Church"
description: "Reliez B1 Admin et Text In Church avec Zapier : créez une clé API, construisez un Zap de la fiche de contact vers B1 et reflétez l'appartenance aux groupes."
---

# Text In Church

<div class="article-intro">

[Text In Church](https://textinchurch.com) regroupe les SMS, les flux de messages programmés et les automatisations des fiches de contact. Son application Zapier prend en charge les deux sens : vous pouvez envoyer les événements B1 vers un flux de travail Text In Church, et récupérer les déclencheurs de fiches de contact ou de nouveaux contacts pour les intégrer à B1.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Un compte [Text In Church](https://textinchurch.com) avec un forfait incluant l'intégration Zapier
- Un compte [Zapier](https://zapier.com)
- Un utilisateur B1Admin disposant de l'autorisation **Modifier les paramètres**

</div>

## Ce que vous pouvez configurer {#what-you-can-wire-up}

| Sens | Déclencheur | Action |
|---|---|---|
| B1 → Text In Church | B1 `person.created` | Créer / mettre à jour une personne + Ajouter à un groupe |
| B1 → Text In Church | B1 `form.submission.created` | Envoyer un SMS via l'équipe concernée |
| B1 → Text In Church | B1 `group.member.added` | Ajouter à un groupe (refléter l'appartenance au groupe) |
| Text In Church → B1 | Fiche de contact soumise | B1 : Créer une personne + Ajouter un membre de groupe |
| Text In Church → B1 | Personne créée | B1 : Créer une personne |
| Text In Church → B1 | Personne ayant rejoint un groupe | B1 : Ajouter un membre de groupe |

Les actions Text In Church comprennent aussi *Envoyer un SMS*, *Envoyer une diffusion vocale*, *Créer une tâche*, *Rechercher une personne / un groupe*, ainsi que l'ajout et le retrait de membres de groupe.

## Configuration {#setup}

### 1. Créer une clé API B1 {#1-mint-a-b1-api-key}

**Paramètres → Développeur → Clés API → Nouvelle clé API** :

- `settings:write` — requis pour connecter la clé à Zapier et pour les Zaps déclenchés par B1
- `people:read`, `people:write` — pour retrouver ou créer la personne
- `groups:write` — pour la synchronisation des groupes
- (Facultatif) `donations:write` si vous reliez les confirmations de dons à TIC

### 2. Connecter Text In Church à Zapier {#2-connect-text-in-church-to-zapier}

Suivez le [guide d'intégration Zapier de Text In Church](https://help.textinchurch.com/en/articles/3943363-text-in-church-s-zapier-integration). Ils génèrent un jeton d'API depuis le tableau de bord TIC.

### 3. Créer le Zap de la fiche de contact vers B1 {#3-build-the-connect-card-to-b1-zap}

C'est le sens le plus courant. Les fiches de contact envoyées depuis TIC deviennent automatiquement de nouvelles personnes dans B1.

1. **Déclencheur** — Text In Church : Fiche de contact soumise.
2. **Action** — B1.church : Rechercher une personne (par courriel).
3. **Action** — B1.church : Ajouter un membre de groupe à un groupe « Nouveau contact », en utilisant l'identifiant de la personne issu de l'étape 2.

L'étape *Rechercher une personne* de B1 arrête le Zap avec une erreur « No person found » lorsque personne ne correspond ; un Chemin ne peut donc pas en faire une branche. Pour les nouveaux contacts, activez la gestion des erreurs de Zapier pour l'étape Rechercher une personne et exécutez, dans son chemin d'erreur, B1.church : Créer une personne, puis Ajouter un membre de groupe.

Activez le Zap. La prochaine fiche de contact soumise via TIC arrive automatiquement dans **B1Admin → Personnes**.

## Recettes courantes {#common-recipes}

### Déclencher un flux de type fiche de contact à partir d'un formulaire B1 {#trigger-a-connect-card-style-workflow-from-a-b1-form}

- **Déclencheur** — B1.church : Nouvelle soumission de formulaire (filtré sur l'identifiant du formulaire « Je suis nouveau ici »)
- **Action** — Text In Church : Créer / mettre à jour une personne, en associant les réponses du formulaire (courriel / téléphone / nom)
- **Action** — Text In Church : Ajouter à un groupe, dont le groupe dispose d'un flux d'accueil préconfiguré

### Refléter l'appartenance aux groupes {#mirror-group-membership}

- **Déclencheur** — B1.church : Nouveau membre de groupe, filtré sur un `groupId` précis
- **Action** — Text In Church : Ajouter à un groupe (même personne, groupe miroir). Associez-le à un Zap `group.member.removed` si vous voulez une synchronisation complète.

### Alerter un responsable lorsqu'une personne rejoint le groupe {#page-a-leader-when-someone-joins}

- **Déclencheur** — B1.church : Nouveau membre de groupe
- **Action** — Text In Church : Envoyer un SMS, destinataire = le téléphone du responsable du groupe, corps = `"{first} {last} just joined {group}"`

## Limites et remarques {#limits--notes}

- **L'application Zapier de TIC dépend du forfait.** Si l'intégration Zapier est grisée dans le tableau de bord TIC, contactez le support TIC pour l'activer sur votre forfait.
- **Les identifiants de groupe sont ceux de TIC, et non ceux de B1.** Pour la mise en miroir, vous devrez tenir une table de correspondance quelque part (une *Table de recherche* Zapier, ou des valeurs fixes dans chaque Zap).
- **L'envoi de SMS consomme des crédits.** Chaque Zap qui déclenche un *Envoi de SMS* puise dans votre quota de SMS TIC.

## Dépannage {#troubleshooting}

- **Le déclencheur de fiche de contact ne se déclenche pas** — TIC doit avoir l'option d'intégration Zapier activée. Vérifiez aussi que le formulaire testé est configuré comme une « Fiche de contact » et non comme un sondage générique.
- **La création d'une personne dans B1 échoue avec 401** — la clé API est erronée, révoquée ou ne comporte pas `people:write`. Recréez-la.
- **Doublons de personnes dans B1** — TIC envoie à la fois *Personne créée* et *Fiche de contact soumise* pour un même événement. Choisissez-en un comme source de référence et ajoutez un Filtre Zapier sur l'autre.

## Voir aussi {#see-also}

- [Clearstream](./clearstream.md) — autre plateforme SMS à structure Zapier similaire
- [Zapier (présentation)](../zapier.md) — volet B1 de chaque recette Zapier
- [Guide Zapier de Text In Church](https://help.textinchurch.com/en/articles/3943363-text-in-church-s-zapier-integration) (documentation de TIC)
