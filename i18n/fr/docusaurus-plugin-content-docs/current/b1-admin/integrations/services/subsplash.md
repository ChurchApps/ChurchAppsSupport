---
title: "Subsplash"
description: "Reliez les dons, les nouvelles personnes et les réponses de formulaires Subsplash à B1 avec Zapier, afin que les dons et les profils arrivent automatiquement dans B1 Admin."
---

# Subsplash

<div class="article-intro">

Si vous utilisez Subsplash pour l'application de votre église, les dons ou les formulaires, mais que vous souhaitez que B1 soit le système de référence pour les personnes et les dons, l'application Zapier de Subsplash peut acheminer en temps réel les dons, les nouveaux profils et les réponses de formulaires vers B1. Notez que l'application Zapier de Subsplash ne propose actuellement que des **déclencheurs** — la liaison ne fonctionne donc que dans un sens (Subsplash → B1).

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Un compte Subsplash avec un forfait incluant l'accès **API + Zapier** (renseignez-vous auprès de votre responsable de la réussite client Subsplash : ces fonctions dépendent du niveau de forfait)
- Un compte [Zapier](https://zapier.com)
- Un utilisateur B1Admin disposant de l'autorisation **Modifier les paramètres**

</div>

## Ce que vous pouvez configurer {#what-you-can-wire-up}

Tous les déclencheurs ci-dessous proviennent de Subsplash. Les actions sont celles de B1.

| Déclencheur Subsplash | Action B1 |
|---|---|
| Nouveau don | Rechercher une personne → Ajouter un don (Créer une personne si elle n'existe pas) |
| Nouvel engagement de don | Ajouter un don (avec `notes` = « Engagement : … ») |
| Nouvelle personne créée | Créer une personne |
| Profil de personne mis à jour | (pas d'action directe dans B1 — consigner dans un Google Sheet pour un examen manuel) |
| Nouvelle réponse à un formulaire | Créer une personne + (facultatif) Ajouter un membre de groupe selon le formulaire |

Subsplash → B1 est pour l'instant le seul sens pris en charge par l'application Subsplash.

## Configuration {#setup}

### 1. Créer une clé API B1 {#1-mint-a-b1-api-key}

Dans B1Admin : **Paramètres → Développeur → Clés API → Nouvelle clé API**. Portées :

- `people:read` — pour retrouver le donateur par courriel
- `people:write` — pour le créer s'il n'existe pas
- `donations:write` — pour enregistrer le don
- `settings:write` — Zapier vérifie chaque clé B1 par rapport à la liste des webhooks de B1 lors de la connexion ; sans cette portée, la connexion échoue (même si c'est Subsplash, et non B1, qui possède le déclencheur ici)

### 2. Connecter Subsplash à Zapier {#2-connect-subsplash-to-zapier}

Suivez le [guide d'intégration Zapier de Subsplash](https://support.subsplash.com/en/articles/9825926-zapier-integration). Subsplash émet depuis son tableau de bord un jeton d'API que Zapier utilise pour authentifier le côté déclencheur.

### 3. Créer le Zap « enregistrer un don » {#3-build-the-record-a-donation-zap}

1. **Déclencheur** — Subsplash : Nouveau don
2. **Action** — B1.church : Rechercher une personne (par courriel)
3. **Action** — B1.church : Ajouter un don, en utilisant l'identifiant de la personne issu de l'étape 2. Associez le montant, la date, le fonds, le mode = « Online », et les notes = l'identifiant de transaction Subsplash.

L'étape *Rechercher une personne* de B1 arrête le Zap avec une erreur « No person found » lorsque personne ne correspond ; une étape Filtre ou Chemin ne peut donc pas en faire une branche. Pour gérer les premiers dons, activez la gestion des erreurs de Zapier pour l'étape Rechercher une personne et, dans son chemin d'erreur, exécutez B1.church : Créer une personne → B1.church : Ajouter un don (en utilisant l'identifiant de la personne nouvellement créée).

Activez le Zap. Les futurs dons Subsplash arriveront dans **B1Admin → Dons** en quelques secondes.

## Recettes courantes {#common-recipes}

### Envoyer un message de remerciement lors d'un premier don {#send-a-thank-you-when-a-first-time-gift-lands}

- **Déclencheur** — Subsplash : Nouveau don
- **Action** — Filtre Zapier : ne poursuivre que s'il s'agit du premier don du donateur (utilisez une *Table de recherche* sur le courriel du donateur, dans un Google Sheet listant les donateurs précédents, ou une étape *Chemins* de Zapier sur la date de création du donateur)
- **Action** — Mailchimp / SMTP / SendGrid : envoyer le message de remerciement pour le premier don
- **Action** — B1.church : Ajouter un don (comme d'habitude)

### Séparer les engagements du flux de dons habituel {#filter-pledges-off-the-regular-giving-flow}

- **Déclencheur** — Subsplash : Nouvel engagement de don
- **Action** — B1.church : Ajouter un don avec `notes = "Pledge — Subsplash"` et un fonds nommé `Pledges` (distinct de votre fonds de fonctionnement) afin de pouvoir établir des rapports sur les engagements séparément dans **B1Admin → Dons → Résumé**.

### Synchroniser les nouveaux utilisateurs de l'application comme personnes B1 {#sync-new-app-users-as-b1-people}

- **Déclencheur** — Subsplash : Nouvelle personne créée
- **Action** — B1.church : Créer une personne, en renseignant le nom, le courriel et le téléphone. Étiquetez-la dans B1 en ajoutant la nouvelle personne à un groupe tel que « Utilisateurs de l'application Subsplash ».

## Limites et remarques {#limits--notes}

- **L'application Zapier de Subsplash ne propose que des déclencheurs.** Si vous voulez que des changements effectués dans B1 (par exemple, une nouvelle personne B1) soient aussi transmis à Subsplash, il faudrait construire cette passerelle à partir des déclencheurs de l'application Zapier de B1 en appelant l'API REST de Subsplash via une action personnalisée *Webhooks by Zapier — POST*. Il s'agit d'une intégration sur mesure, et non d'une simple recette.
- **L'accès à l'API dépend du forfait.** Si la connexion Zapier échoue avec `403 Forbidden`, votre forfait Subsplash ne comprend probablement pas l'accès à l'API — contactez votre responsable de la réussite client.
- **La correspondance des fonds est manuelle.** Subsplash transmet le nom d'une campagne ou d'une catégorie ; B1 a besoin de l'un de ses propres fonds. Choisissez le fonds dans la liste déroulante **Fonds** de l'étape Ajouter un don, ou tenez à jour une *Table de recherche* Zapier associant les campagnes Subsplash aux fonds B1.

## Dépannage {#troubleshooting}

- **Aucun déclencheur ne se déclenche après un don** — vérifiez dans le tableau de bord Zapier de Subsplash que la connexion affiche toujours *Connected*. Si le jeton d'API a été renouvelé côté Subsplash, le Zap s'arrête silencieusement ; reconnectez-le.
- **L'étape *Ajouter un don* de B1 enregistre le don sans fonds** — le champ **Fonds** était vide ou associé à une valeur qui n'est pas un identifiant de fonds B1. Choisissez le fonds dans la liste déroulante **Fonds** de l'étape (elle affiche les fonds sous **Dons → Fonds** dans B1Admin), ou associez une Table de recherche qui produit des identifiants de fonds B1.
- **Le premier don déclenche deux fois** — Subsplash renvoie parfois un déclencheur si Zapier n'a pas accusé réception. Ajoutez un *Filtre Zapier* sur l'identifiant du don (Subsplash en envoie un dans la charge utile) pour éliminer les doublons.

## Voir aussi {#see-also}

- [Donorbox](./donorbox.md) — même structure de recette, avec une autre plateforme de dons
- [Zapier (présentation)](../zapier.md) — volet B1 de chaque recette Zapier
- [Guide d'intégration Zapier de Subsplash](https://support.subsplash.com/en/articles/9825926-zapier-integration) (documentation de Subsplash)
