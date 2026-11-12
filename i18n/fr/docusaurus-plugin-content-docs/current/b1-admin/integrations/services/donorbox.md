---
title: "Donorbox"
description: "Reliez Donorbox à B1 Admin avec Zapier pour que les dons en ligne créent automatiquement des enregistrements de dons et des fiches de donateurs, sans export manuel."
---

# Donorbox

<div class="article-intro">

Si votre église reçoit des dons par Donorbox mais suit les personnes et les relevés dans B1, vous pouvez faire en sorte que les déclencheurs instantanés Zapier de Donorbox créent les enregistrements de dons correspondants dans B1 — et créent le donateur comme personne B1 s'il n'existe pas encore. Aucun rapprochement manuel, aucun export mensuel.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Un compte [Donorbox](https://donorbox.org) avec au moins une campagne
- Un compte [Zapier](https://zapier.com)
- Un utilisateur B1Admin disposant de l'autorisation **Modifier les paramètres**

</div>

## Ce que vous pouvez configurer {#what-you-can-wire-up}

| Sens | Déclencheur Donorbox | Action B1 |
|---|---|---|
| Donorbox → B1 | Don nouveau ou mis à jour (instantané) | Rechercher une personne → Ajouter un don |
| Donorbox → B1 | Donateur nouveau ou mis à jour | Créer une personne |
| Donorbox → B1 | Plan nouveau ou mis à jour (récurrent) | Rechercher une personne → Ajouter un don (utiliser l'identifiant du plan comme note) |

Donorbox publie ses déclencheurs comme **instantanés** — ils se déclenchent quelques secondes après un don réel. Aucun délai d'interrogation.

## Configuration {#setup}

### 1. Créer une clé API B1 {#1-mint-a-b1-api-key}

Dans B1Admin : **Paramètres → Développeur → Clés API → Nouvelle clé API**. Portées :

- `people:read` — pour retrouver le donateur par courriel
- `people:write` — pour le créer s'il est nouveau
- `donations:write` — pour enregistrer le don

- `settings:write` — Zapier vérifie chaque clé B1 par rapport à la liste des webhooks de B1 lors de la connexion ; sans cette portée, la connexion échoue (même si c'est Donorbox, et non B1, qui possède le déclencheur ici)

### 2. Créer le Zap « enregistrer un don » {#2-build-the-record-a-donation-zap}

1. **Déclencheur** — Donorbox : Nouveau don. Connectez-vous avec la clé API de Donorbox (dans Donorbox : *Compte → Profil → Paramètres de l'API*).
2. **Action** — B1.church : Rechercher une personne. Associez le courriel du donateur issu du déclencheur au champ *Courriel*.
3. **Action** — B1.church : Ajouter un don. Associez :
   - Personne → l'identifiant de l'étape 2
   - Montant → le montant du don issu du déclencheur
   - Date du don → la date du don issue du déclencheur
   - Fonds → choisissez le fonds B1 qui correspond à la campagne Donorbox (Zapier vous permet de changer de fonds selon un filtre ou une étape de mise en forme)
   - Mode → « Online »
   - Notes → l'identifiant de transaction Donorbox (pratique lors des rapprochements)

Activez le Zap. Le prochain don en direct passé par Donorbox apparaît automatiquement dans **B1Admin → Dons**.

L'étape *Rechercher une personne* de B1 arrête le Zap avec une erreur « No person found » lorsque personne n'a ce courriel ; une étape Filtre ne peut donc pas en faire une branche. Pour gérer les premiers dons, activez la gestion des erreurs de Zapier pour l'étape Rechercher une personne et, dans son chemin d'erreur, exécutez B1.church : Créer une personne (associez prénom, nom et courriel), puis Ajouter un don avec l'identifiant de la nouvelle personne. Vous pouvez aussi exécuter le Zap *Nouveau donateur* → *Créer une personne* du tableau ci-dessus afin que les donateurs existent dans B1 avant l'arrivée de leur don.

## Recettes courantes {#common-recipes}

### Un Zap par fonds {#one-zap-per-fund}

Si vous gérez plusieurs campagnes Donorbox correspondant à des fonds distincts dans B1, la meilleure organisation consiste à créer un Zap par campagne, avec un filtre de *campagne* Donorbox en tête : l'association aux fonds est ainsi fixe, et vous évitez l'étape de recherche.

### Traiter les dons modifiés comme des corrections {#treat-updated-donations-as-corrections}

Le déclencheur *Don nouveau ou mis à jour* de Donorbox se déclenche aussi lors des modifications. Utilisez une étape *Chemin* de Zapier sur `event_type` pour bifurquer : « new » → Ajouter un don, « updated » → Rechercher le don + Mettre à jour (remarque : l'application Zapier de B1 ne dispose pas actuellement d'une action Mettre à jour un don — pour l'instant, consignez les événements « updated » dans un canal Slack pour un examen manuel).

### Synchroniser les modifications des plans récurrents dans un canal Slack {#sync-recurring-plan-changes-to-a-slack-channel}

- **Déclencheur** — Donorbox : Plan nouveau ou mis à jour
- **Action** — Slack : Envoyer un message à `#donations` (par exemple « Plan modifié — le don mensuel de Sarah est maintenant de 200 $ »)

## Limites et remarques {#limits--notes}

- **Associez les donateurs par courriel.** Donorbox ne partage pas l'identifiant de personne de B1 ; la seule clé de jointure fiable est le courriel. Les donateurs qui donnent avec un courriel différent créeront une nouvelle personne B1 — votre rapprochement mensuel doit les repérer.
- **Les remboursements ne sont pas exposés séparément** — Donorbox émet une mise à jour de statut sur le même don. L'application Zapier de B1 ne dispose pas actuellement d'une action *Mettre à jour un don* ; la méthode sûre aujourd'hui consiste à consigner les remboursements hors du système et à ajuster le don manuellement.
- **Testez d'abord dans le bac à sable de Donorbox** pour éviter de créer de faux dons dans la B1 de production. Donorbox fournit des identifiants de mode test distincts de ceux de production.

## Dépannage {#troubleshooting}

- **Erreurs « No person found »** — le donateur n'est pas encore dans B1 (ou il a donné avec un autre courriel). Ajoutez le chemin d'erreur décrit ci-dessus, et vérifiez que la clé API comporte `people:write` pour que *Créer une personne* puisse s'exécuter.
- **Le montant du don semble 100 fois trop grand ou trop petit** — Donorbox envoie les centimes dans certaines variantes de charge utile et les dollars dans d'autres. Utilisez une étape *Formatter by Zapier — Numbers* pour diviser par 100 si nécessaire.
- **Dons en double pour un même don** — Donorbox déclenche à la fois *Don nouveau* et *Don mis à jour*. Filtrez soit sur `event_type = "donation.succeeded"`, soit créez deux Zaps aux filtres non chevauchants.

## Voir aussi {#see-also}

- [Zapier (présentation)](../zapier.md) — volet B1 de chaque recette Zapier
- [Subsplash](./subsplash.md) — autre plateforme de dons dotée d'une application Zapier
- [Mailchimp](./mailchimp.md) — enchaîner « nouveau don » vers une étiquette de courriel
