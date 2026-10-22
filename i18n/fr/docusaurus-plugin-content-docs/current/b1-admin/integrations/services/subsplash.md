---
title: "Subsplash"
---

# Subsplash {#subsplash}

<div class="article-intro">

Si vous utilisez Subsplash pour votre application d'église, vos dons ou vos formulaires, mais que vous souhaitez utiliser B1 comme système de référence pour les personnes et les dons, l'application Zapier de Subsplash peut transmettre en temps réel les dons, les nouveaux profils et les réponses aux formulaires vers B1. Notez que l'application Zapier de Subsplash ne propose actuellement que des **déclencheurs** : la liaison est donc à sens unique (Subsplash → B1).

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Un compte Subsplash avec un forfait incluant l'accès **API + Zapier** (renseignez-vous auprès de votre gestionnaire de réussite client Subsplash, car cet accès dépend du niveau du forfait)
- Un compte [Zapier](https://zapier.com)
- Un utilisateur B1Admin disposant de l'autorisation **Modifier les paramètres**

</div>

## Ce que vous pouvez configurer {#what-you-can-wire-up}

Tous les déclencheurs ci-dessous proviennent de Subsplash. Les actions sont celles de B1.

| Déclencheur Subsplash | Action B1 |
|---|---|
| Nouveau don | Rechercher une personne → Ajouter un don (Créer la personne si elle n'existe pas) |
| Nouvel engagement | Ajouter un don (avec `notes` = « Engagement : … ») |
| Nouvelle personne créée | Créer une personne |
| Profil de personne mis à jour | (aucune action B1 directe ; enregistrer dans une feuille Google pour examen manuel) |
| Nouvelle réponse de formulaire | Créer une personne + (facultatif) Ajouter un membre de groupe selon le formulaire |

Subsplash → B1 est la seule direction prise en charge actuellement par l'application Subsplash.

## Configuration {#setup}

### 1. Générer une clé API B1 {#1-mint-a-b1-api-key}

Dans B1Admin : **Paramètres → Développeur → Clés API → Nouvelle clé API**. Portées :

- `people:read` : pour rechercher le donateur par e-mail
- `people:write` : pour le créer s'il n'existe pas
- `donations:write` : pour enregistrer le don
- (Aucune portée `settings:write` nécessaire : c'est Subsplash, et non B1, qui gère le déclencheur ici.)

### 2. Connecter Subsplash à Zapier {#2-connect-subsplash-to-zapier}

Suivez le [guide d'intégration Zapier de Subsplash](https://support.subsplash.com/en/articles/9825926-zapier-integration). Subsplash délivre depuis son tableau de bord un jeton API que Zapier utilise pour authentifier le déclencheur.

### 3. Créer le Zap « enregistrer un don » {#3-build-the-record-a-donation-zap}

1. **Déclencheur** : Subsplash : Nouveau don
2. **Action** : B1.church : Rechercher une personne (par e-mail)
3. **Filtre / Chemin** : bifurquer selon « personne trouvée » :
   - **Trouvée** : B1.church : Ajouter un don. Associez le montant, la date, le fonds, le mode = « En ligne » et les notes = identifiant de transaction Subsplash.
   - **Non trouvée** : B1.church : Créer une personne → B1.church : Ajouter un don (en utilisant l'identifiant de la personne nouvellement créée).

Activez le Zap. Les futurs dons Subsplash apparaîtront dans **B1Admin → Dons** en quelques secondes.

## Recettes courantes {#common-recipes}

### Envoyer un remerciement lors d'un premier don {#send-a-thank-you-when-a-first-time-gift-lands}

- **Déclencheur** : Subsplash : Nouveau don
- **Action** : Filtre Zapier : ne poursuivre que s'il s'agit du tout premier don du donateur (utilisez une *table de correspondance* sur l'e-mail du donateur par rapport à une feuille Google des anciens donateurs, ou une étape *Chemins* de Zapier basée sur la date de création du donateur)
- **Action** : Mailchimp / SMTP / SendGrid : envoyer le message de remerciement pour le premier don
- **Action** : B1.church : Ajouter un don (comme d'habitude)

### Sortir les engagements du flux de dons habituel {#filter-pledges-off-the-regular-giving-flow}

- **Déclencheur** : Subsplash : Nouvel engagement
- **Action** : B1.church : Ajouter un don avec `notes = "Engagement — Subsplash"` et un fonds nommé `Engagements` (distinct de votre fonds de fonctionnement), afin de pouvoir établir des rapports sur les engagements séparément dans **B1Admin → Dons → Résumé**.

### Synchroniser les nouveaux utilisateurs de l'application en tant que personnes B1 {#sync-new-app-users-as-b1-people}

- **Déclencheur** : Subsplash : Nouvelle personne créée
- **Action** : B1.church : Créer une personne, en renseignant le nom, l'e-mail et le téléphone. Marquez-la dans B1 en l'ajoutant à un groupe comme « Utilisateurs de l'application Subsplash ».

## Limites et remarques {#limits-notes}

- **L'application Zapier de Subsplash ne propose que des déclencheurs.** Si vous voulez des modifications côté B1 (par exemple qu'une nouvelle personne B1 apparaisse aussi dans Subsplash), il faudrait créer ce pont à partir des déclencheurs de l'application Zapier de B1 en appelant l'API REST de Subsplash via une action personnalisée *Webhooks by Zapier — POST*. Il s'agit d'une intégration sur mesure, et non d'une recette.
- **L'accès à l'API dépend du forfait.** Si la connexion Zapier échoue avec `403 Forbidden`, votre forfait Subsplash n'inclut probablement pas l'accès à l'API : contactez votre gestionnaire de réussite client.
- **La correspondance des fonds est manuelle.** Subsplash transmet le nom d'une campagne ou d'une catégorie, alors que B1 a besoin d'un identifiant numérique de fonds. Soit vous codez le fonds en dur dans le Zap, soit vous maintenez une *table de correspondance* Zapier associant les campagnes Subsplash aux fonds B1.

## Dépannage {#troubleshooting}

- **Aucun déclencheur ne se lance après un don** : vérifiez dans le tableau de bord Zapier de Subsplash que la connexion affiche toujours *Connecté*. Si le jeton API a été renouvelé côté Subsplash, le Zap s'arrête silencieusement ; reconnectez-le.
- **L'action *Ajouter un don* de B1 échoue avec une erreur 422** : le plus souvent, `fundId` est absent ou non reconnu. Listez vos fonds via **B1Admin → Dons → Fonds** et copiez l'identifiant exact dans l'étape du Zap.
- **Le premier don déclenche deux fois** : Subsplash renvoie parfois un déclencheur si Zapier n'a pas accusé réception. Ajoutez un *Filtre Zapier* sur l'identifiant du don (Subsplash en envoie un dans la charge utile) pour supprimer les doublons.

## Voir aussi {#see-also}

- [Donorbox](./donorbox) : même structure de recette, avec une autre plateforme de dons
- [Zapier (vue d'ensemble)](../zapier) : le côté B1 de toutes les recettes Zapier
- [Guide d'intégration Zapier de Subsplash](https://support.subsplash.com/en/articles/9825926-zapier-integration) (documentation de Subsplash)
