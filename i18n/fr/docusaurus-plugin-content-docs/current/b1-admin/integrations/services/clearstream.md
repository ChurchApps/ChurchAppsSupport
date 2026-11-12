---
title: "Clearstream"
description: "Reliez Clearstream SMS à B1 Admin grâce à Zapier : envoyez des messages texte lors de nouveaux dons ou de soumissions de formulaires, et importez les réponses reçues comme personnes dans B1."
---

# Clearstream

<div class="article-intro">

Déclenchez un message texte [Clearstream](https://clearstream.io) à partir de n'importe quel événement B1 — nouvelle personne, nouveau don, soumission de formulaire, mise à jour du calendrier — et réintégrez les réponses comme enregistrements B1. L'application Zapier de Clearstream prend en charge les deux sens : toute la configuration est donc une simple recette, sans code personnalisé.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Un compte [Clearstream](https://clearstream.io) avec au moins une liste et un quota de SMS
- Un compte [Zapier](https://zapier.com)
- Un utilisateur B1Admin disposant de l'autorisation **Modifier les paramètres**

</div>

## Ce que vous pouvez configurer {#what-you-can-wire-up}

| Sens | Déclencheur | Action |
|---|---|---|
| B1 → Clearstream | B1 `person.created` | Clearstream : Créer / mettre à jour un abonné + Envoyer un SMS à un numéro |
| B1 → Clearstream | B1 `donation.created` | Clearstream : Envoyer un SMS à une liste (par exemple, avertir l'équipe financière) |
| B1 → Clearstream | B1 `form.submission.created` | Clearstream : Envoyer un SMS à une liste d'acheminement (par exemple, l'équipe des demandes de prière) |
| Clearstream → B1 | Nouveau SMS entrant | B1 : Créer une personne ; l'étiqueter avec le mot-clé envoyé |

Les actions Zapier de Clearstream sont : *Envoyer un SMS à un numéro*, *Envoyer un SMS à une liste*, *Créer / mettre à jour un abonné*, *Ajouter un abonné à un flux de travail automatisé*, *Ajouter une étiquette à un abonné*, *Retirer un abonné d'une liste*.

## Configuration {#setup}

### 1. Créer une clé API B1 {#1-mint-a-b1-api-key}

**Paramètres → Développeur → Clés API → Nouvelle clé API** :

- `settings:write` — requis pour connecter la clé à Zapier et pour que B1 enregistre le webhook du déclencheur
- `people:read` — nécessaire pour retrouver la personne à partir de l'événement (`personId` → nom / téléphone / courriel)
- (Facultatif) `people:write` si les réponses Clearstream doivent créer des contacts B1

### 2. Créer le Zap « envoyer un SMS à chaque nouveau don » {#2-build-the-text-on-new-gift-zap}

1. **Déclencheur** — B1.church : Nouveau don
2. **Action** — B1.church : Rechercher une personne (le `personId` du don)
3. **Action** — Clearstream : Envoyer un SMS à un numéro. Utilisez le téléphone de la personne trouvé à l'étape 2 comme destinataire, et rédigez le message (`"Thanks for your gift, {first}! …"`).

Activez le Zap. B1 enregistre le webhook des dons à l'activation ; vous verrez `Zapier — donation.created` apparaître dans **Paramètres → Développeur → Webhooks**.

### 3. (Facultatif) Réintégrer les réponses comme enregistrements B1 {#3-optional-pull-replies-back-as-b1-records}

1. **Déclencheur** — Clearstream : Nouveau SMS entrant
2. **Action** — Filtre Zapier sur le mot-clé — par exemple, ne poursuivre que si le texte commence par `PRAY`
3. **Action** — Enregistrez le texte quelque part où votre équipe le verra (Slack, un Google Sheet ou une tâche B1). La fonction *Rechercher une personne* de B1 ne retrouve les personnes que par identifiant, courriel ou nom, et non par téléphone : associez donc la réponse à une personne B1 manuellement (ou ajoutez un GET Webhooks by Zapier vers le point de terminaison `/membership/people/search/phone?number=…` de B1).

## Recettes courantes {#common-recipes}

### Appel de l'équipe de bénévoles {#volunteer-team-paging}

- **Déclencheur** — B1.church : Nouvelle soumission de formulaire (filtrée sur l'identifiant du formulaire de demande de prière)
- **Action** — Clearstream : Envoyer un SMS à une liste, où la liste est votre équipe pastorale de garde. Rédigez le corps du message ainsi : `New prayer request: {data.questions.0.answer}`.

### Séquence de suivi des visiteurs venus pour la première fois {#first-time-visitor-follow-up-sequence}

- **Déclencheur** — B1.church : Nouvelle personne, filtrée sur le statut d'appartenance de la personne (par exemple, *Visiteur*)
- **Action** — Clearstream : Ajouter un abonné à un flux de travail automatisé. Associez l'identifiant du flux de travail à une série de SMS préconfigurée sur 7 jours.

### Adhésion à un groupe par mot-clé {#keyword-driven-group-join}

- **Déclencheur** — Clearstream : Nouveau SMS entrant (filtré sur le mot-clé `MENS`)
- **Action** — B1.church : Créer une personne à partir du nom et du téléphone de l'expéditeur (la fonction *Rechercher une personne* de B1 ne peut pas chercher par téléphone : vérifiez donc les doublons ensuite dans **Personnes**)
- **Action** — B1.church : Ajouter un membre de groupe au groupe Ministère des hommes

## Limites et remarques {#limits--notes}

- **Clearstream comptabilise les SMS par message.** Chaque action Envoyer un SMS consomme un ou plusieurs crédits selon la longueur et le nombre de destinataires — vérifiez le quota de votre forfait.
- **Le téléphone doit être au format E.164** (par exemple `+15555550199`) pour *Envoyer un SMS à un numéro*. La fiche de personne de B1 enregistre ce qui a été saisi ; utilisez une étape *Formatter by Zapier — Numbers → Format Phone Number* si vous ne pouvez pas garantir le format.
- **Aucun en-tête n'est requis côté B1** — l'authentification de Clearstream se fait entièrement dans sa connexion Zapier.

## Dépannage {#troubleshooting}

- **Le déclencheur ne se déclenche jamais** — `Settings → Developer → Webhooks` doit afficher une ligne `Zapier — <event>` après l'activation du Zap. Sinon, la clé API B1 ne comporte pas `settings:write`. Régénérez la clé et reconnectez-la.
- **Clearstream renvoie « Invalid phone number »** — le champ destinataire n'est pas au format E.164. Ajoutez une étape Format Phone Number.
- **Envoyer un SMS à une liste échoue avec `403`** — l'utilisateur de l'API Clearstream n'a pas l'autorisation sur cette liste, ou l'identifiant de la liste est erroné. Les identifiants des listes sont visibles sur la page de détail de la liste dans Clearstream.

## Voir aussi {#see-also}

- [Text In Church](./text-in-church.md) — autre plateforme SMS, avec une configuration similaire
- [Mobile Message](./mobile-message.md) — pour les églises situées hors des États-Unis
- [Zapier (présentation)](../zapier.md) — volet B1 de chaque recette Zapier
- [Documentation de l'API Clearstream](https://api-docs.clearstream.io/) — pour des intégrations personnalisées au-delà de l'application Zapier
