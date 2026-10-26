---
title: "Subsplash"
---

# Subsplash

<div class="article-intro">

Si vous utilisez Subsplash pour l'application de votre église, les dons ou les formulaires, mais que vous voulez B1 comme système de référence pour les personnes et les dons, l'application Zapier de Subsplash peut transmettre en temps réel les dons, les nouveaux profils et les réponses aux formulaires vers B1. Notez que l'application Zapier de Subsplash ne propose actuellement que des **déclencheurs** : la liaison est donc à sens unique (Subsplash → B1).

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Un compte Subsplash dont le forfait inclut l'accès à **l'API et à Zapier** (renseignez-vous auprès de votre gestionnaire de réussite client Subsplash, car ces fonctions dépendent du niveau du forfait)
- Un compte [Zapier](https://zapier.com)
- Un utilisateur B1Admin disposant de l'autorisation **Modifier les paramètres**

</div>

## Ce que vous pouvez configurer

Tous les déclencheurs ci-dessous proviennent de Subsplash. Les actions proviennent de B1.

| Déclencheur Subsplash | Action B1 |
|---|---|
| Nouveau don | Rechercher une personne → Ajouter un don (Créer une personne si elle n'existe pas) |
| Nouvel engagement | Ajouter un don (avec `notes` = « Engagement : … ») |
| Nouvelle personne créée | Créer une personne |
| Profil de personne mis à jour | (aucune action directe dans B1 : consigner dans une Google Sheet pour vérification manuelle) |
| Nouvelle réponse à un formulaire | Créer une personne + (facultatif) Ajouter un membre au groupe selon le formulaire |

Pour l'instant, le seul sens pris en charge par l'application Subsplash est Subsplash → B1.

## Configuration

### 1. Créer une clé API B1

Dans B1Admin : **Paramètres → Développeur → Clés API → Nouvelle clé API**. Portées :

- `people:read` : pour rechercher le donateur par adresse e-mail
- `people:write` : pour le créer s'il n'existe pas
- `donations:write` : pour enregistrer le don
- (Aucune portée `settings:write` n'est nécessaire : c'est Subsplash, et non B1, qui gère le déclencheur ici.)

### 2. Connecter Subsplash à Zapier

Suivez le [guide d'intégration Zapier de Subsplash](https://support.subsplash.com/en/articles/9825926-zapier-integration). Subsplash délivre un jeton API depuis le tableau de bord Subsplash, que Zapier utilise pour authentifier le déclencheur côté Subsplash.

### 3. Créer le Zap « enregistrer un don »

1. **Déclencheur :** Subsplash : Nouveau don
2. **Action :** B1.church : Rechercher une personne (par e-mail)
3. **Filtre / Chemin :** divisez selon « personne trouvée » :
   - **Trouvée :** B1.church : Ajouter un don. Associez le montant, la date, le fonds, le mode = « En ligne » et les notes = identifiant de transaction Subsplash.
   - **Non trouvée :** B1.church : Créer une personne → B1.church : Ajouter un don (en utilisant l'identifiant de la personne nouvellement créée).

Activez le Zap. Les futurs dons Subsplash apparaîtront dans **B1Admin → Dons** en quelques secondes.

## Recettes courantes

### Envoyer un message de remerciement lorsqu'un premier don est reçu

- **Déclencheur :** Subsplash : Nouveau don
- **Action :** Filtre Zapier : continuer uniquement s'il s'agit du premier don du donateur (utilisez une *table de recherche* sur l'e-mail du donateur, comparée à une Google Sheet des anciens donateurs, ou une étape *Chemins* de Zapier basée sur la date de création du donateur)
- **Action :** Mailchimp / SMTP / SendGrid : envoyer le message de remerciement pour le premier don
- **Action :** B1.church : Ajouter un don (comme d'habitude)

### Séparer les engagements du flux de dons habituel

- **Déclencheur :** Subsplash : Nouvel engagement
- **Action :** B1.church : Ajouter un don avec `notes = "Engagement : Subsplash"` et un fonds nommé `Engagements` (distinct de votre fonds de fonctionnement), afin de pouvoir établir des rapports sur les engagements séparément dans **B1Admin → Dons → Résumé**.

### Synchroniser les nouveaux utilisateurs de l'application comme personnes B1

- **Déclencheur :** Subsplash : Nouvelle personne créée
- **Action :** B1.church : Créer une personne, en renseignant le nom, l'e-mail et le téléphone. Marquez la personne dans B1 en l'ajoutant à un groupe tel que « Utilisateurs de l'application Subsplash ».

## Limites et remarques

- **L'application Zapier de Subsplash ne propose que des déclencheurs.** Si vous voulez que des modifications effectuées dans B1 se répercutent dans Subsplash (par exemple, qu'une nouvelle personne créée dans B1 apparaisse aussi dans Subsplash), vous devrez créer ce pont à partir des déclencheurs de l'application Zapier de B1, en appelant l'API REST de Subsplash via une action personnalisée *Webhooks by Zapier — POST*. Il s'agit d'une intégration sur mesure, et non d'une simple recette.
- **L'accès à l'API dépend du forfait.** Si la connexion Zapier échoue avec une erreur `403 Forbidden`, votre forfait Subsplash n'inclut probablement pas l'accès à l'API. Contactez votre gestionnaire de réussite client.
- **La correspondance des fonds est manuelle.** Subsplash transmet le nom d'une campagne ou d'une catégorie, alors que B1 a besoin d'un identifiant numérique de fonds. Vous pouvez soit fixer le fonds directement dans le Zap, soit tenir à jour une *table de recherche* Zapier associant les campagnes Subsplash aux fonds B1.

## Dépannage

- **Aucun déclencheur ne se lance après un don :** vérifiez dans le tableau de bord Zapier de Subsplash que la connexion affiche toujours *Connecté*. Si le jeton API a été renouvelé côté Subsplash, le Zap s'arrête silencieusement : reconnectez-le.
- **L'action *Ajouter un don* de B1 échoue avec une erreur 422 :** le plus souvent, l'identifiant `fundId` est absent ou non reconnu. Listez vos fonds via **B1Admin → Dons → Fonds** et copiez l'identifiant exact dans l'étape du Zap.
- **Le premier don déclenche deux fois l'action :** Subsplash renvoie parfois un déclencheur si Zapier n'a pas accusé réception à temps. Ajoutez un *Filtre Zapier* sur l'identifiant du don (Subsplash en envoie un dans la charge utile) pour supprimer les doublons.

## Voir aussi

- [Donorbox](./donorbox) : même principe de recette, avec une autre plateforme de dons
- [Zapier (présentation)](../zapier) : le côté B1 de chaque recette Zapier
- [Guide d'intégration Zapier de Subsplash](https://support.subsplash.com/en/articles/9825926-zapier-integration) (documentation de Subsplash)
