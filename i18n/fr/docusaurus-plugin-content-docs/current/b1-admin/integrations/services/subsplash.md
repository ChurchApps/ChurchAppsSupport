---
title: "Subsplash"
---

# Subsplash

<div class="article-intro">

Si vous utilisez Subsplash pour l'application de votre église, les donations ou les formulaires mais que vous voulez B1 comme système d'enregistrement pour les personnes et les donations, l'application Zapier de Subsplash peut canaliser les donations, les nouveaux profils et les réponses de formulaire dans B1 en temps réel. Remarquez que l'application Zapier de Subsplash est actuellement **uniquement des déclencheurs** — le câblage est unidirectionnel (Subsplash → B1).

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Un compte Subsplash sur un plan qui inclut l'accès **API + Zapier** (consultez votre gestionnaire de réussite client Subsplash — ceux-ci se trouvent derrière le niveau du plan)
- Un compte [Zapier](https://zapier.com)
- Un utilisateur B1Admin avec la permission **Modifier les paramètres**

</div>

## Ce que vous pouvez connecter

Tous les déclencheurs ci-dessous sont ceux de Subsplash. Les actions sont celles de B1.

| Déclencheur Subsplash | Action B1 |
|---|---|
| Nouveau don | Trouver une personne → Ajouter une donation (Créer une personne si manquante) |
| Nouvelle promesse | Ajouter une donation (avec `notes` = « Promesse : … ») |
| Nouvelle personne créée | Créer une personne |
| Profil de personne mis à jour | (aucune action B1 directe — enregistrer dans une Google Sheet pour examen manuel) |
| Nouvelle réponse de formulaire | Créer une personne + (optionnellement) Ajouter un membre de groupe selon le formulaire |

Subsplash → B1 est la seule direction que l'application de Subsplash supporte pour l'instant.

## Configuration

### 1. Créer une clé API B1

Dans B1Admin : **Paramètres → Développeur → Clés API → Nouvelle clé API**. Scopes :

- `people:read` — pour rechercher le donateur par email
- `people:write` — pour le créer s'il n'existe pas
- `donations:write` — pour enregistrer le don
- (Pas besoin de `settings:write` — Subsplash, pas B1, possède le déclencheur ici.)

### 2. Connecter Subsplash à Zapier

Suivez le [guide d'intégration Zapier de Subsplash](https://support.subsplash.com/en/articles/9825926-zapier-integration). Ils émettent un jeton API à partir du tableau de bord Subsplash que Zapier utilise pour authentifier le côté déclencheur.

### 3. Créer le Zap « enregistrer une donation »

1. **Déclencheur** — Subsplash : Nouveau don
2. **Action** — B1.church : Trouver une personne (par email)
3. **Filtre / Chemin** — bifurquer sur « personne trouvée » :
   - **Trouvée :** B1.church : Ajouter une donation. Mappez montant, date, fonds, méthode = « En ligne », notes = id de transaction Subsplash.
   - **Non trouvée :** B1.church : Créer une personne → B1.church : Ajouter une donation (en utilisant l'id de la personne nouvellement créée).

Activez le Zap. Les futures donations Subsplash flux vers **B1Admin → Donations** en quelques secondes.

## Recettes courantes

### Envoyer un remerciement quand un premier don arrive

- **Déclencheur** — Subsplash : Nouveau don
- **Action** — Filtre par Zapier : continuer uniquement si c'est le premier don du donateur (utilisez une *Lookup Table* sur l'email du donateur contre une Google Sheet de donateurs passés, ou une étape *Chemins* Zapier sur la date de création du donateur)
- **Action** — Mailchimp / SMTP / SendGrid : envoyer un message de remerciement pour le premier don
- **Action** — B1.church : Ajouter une donation (comme d'habitude)

### Filtrer les promesses du flux de dons régulier

- **Déclencheur** — Subsplash : Nouvelle promesse
- **Action** — B1.church : Ajouter une donation avec `notes = "Promesse — Subsplash"` et un fonds appelé `Promesses` (séparé de votre fonds de fonctionnement) pour que vous puissiez signaler les promesses indépendamment dans **B1Admin → Donations → Rapports**.

### Synchroniser les nouveaux utilisateurs d'applications en tant que personnes B1

- **Déclencheur** — Subsplash : Nouvelle personne créée
- **Action** — B1.church : Créer une personne, remplissant le nom, l'email, le téléphone. Taguez dans B1 en ajoutant la nouvelle personne à un groupe comme « Utilisateurs d'application Subsplash ».

## Limites et remarques

- **L'application Zapier de Subsplash est uniquement des déclencheurs.** Si vous voulez des changements côté B1 (par exemple une nouvelle personne B1 doit aussi atterrir dans Subsplash), vous devriez construire ce pont à partir des déclencheurs de l'application Zapier B1 appelant l'API REST de Subsplash via une action *Webhooks by Zapier — POST* personnalisée. C'est une intégration personnalisée, pas une recette.
- **L'accès à l'API est limité par plan.** Si la connexion Zapier échoue avec `403 Forbidden`, votre plan Subsplash n'inclut probablement pas l'accès à l'API — contactez votre gestionnaire de réussite client.
- **Le mappage des fonds est manuel.** Subsplash passe un nom de campagne ou de catégorie; B1 a besoin d'un id de fonds numérique. Soit codez en dur le fonds dans le Zap, soit maintenez une *Lookup Table* Zapier mappant les campagnes Subsplash aux fonds B1.

## Dépannage

- **Aucun déclencheur ne se déclenche après un don** — vérifiez dans votre tableau de bord Zapier Subsplash que la connexion affiche toujours *Connectée*. Si le jeton API a été tourné du côté Subsplash, le Zap s'arrête silencieusement; reconnectez.
- **B1 *Ajouter une donation* échoue avec 422** — le plus souvent un `fundId` manquant ou non reconnu. Énumérez vos fonds via **B1Admin → Donations → Fonds** et copiez l'id exact dans l'étape Zap.
- **Le premier don se déclenche deux fois** — Subsplash re-livre occasionnellement un déclencheur si Zapier a raté son ack. Ajoutez un *Filtre par Zapier* sur l'id du don (Subsplash en envoie un dans le payload) pour supprimer les doublons.

## Voir aussi

- [Donorbox](./donorbox) — même forme de recette, plate-forme de donation différente
- [Zapier (aperçu)](../zapier) — côté B1 de chaque recette Zapier
- [Guide d'intégration Zapier Subsplash](https://support.subsplash.com/en/articles/9825926-zapier-integration) (docs Subsplash)
