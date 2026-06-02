---
title: "Clearstream"
---

# Clearstream

<div class="article-intro">

Déclenchez un message texte [Clearstream](https://clearstream.io) à partir de n'importe quel événement B1 — nouvelle personne, nouveau don, soumission de formulaire, mise à jour de calendrier — et récupérez les réponses en tant que dossiers B1. L'application Zapier de Clearstream expose les deux directions, donc le câblage entier est une recette et non du code personnalisé.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Un compte [Clearstream](https://clearstream.io) avec au moins une liste et une allocation SMS
- Un compte [Zapier](https://zapier.com)
- Un utilisateur B1Admin avec la permission **Modifier les paramètres**

</div>

## Ce que vous pouvez connecter

| Direction | Déclencheur | Action |
|---|---|---|
| B1 → Clearstream | B1 `person.created` | Clearstream : Créer/Mettre à jour un abonné + Envoyer un texte au numéro |
| B1 → Clearstream | B1 `donation.created` | Clearstream : Envoyer un texte à une liste (par exemple notifier l'équipe financière) |
| B1 → Clearstream | B1 `form.submission.created` | Clearstream : Envoyer un texte à une liste de routage (par exemple l'équipe de demandes de prière) |
| Clearstream → B1 | Nouveau texte entrant | B1 : Créer une personne; ajouter un tag avec le mot-clé qu'ils ont envoyé par texte |

Les actions Zapier de Clearstream : *Envoyer un texte au numéro*, *Envoyer un texte à une liste*, *Créer/Mettre à jour un abonné*, *Ajouter un abonné à un flux de travail automatisé*, *Ajouter un tag à un abonné*, *Supprimer un abonné d'une liste*.

## Configuration

### 1. Créer une clé API B1

**Paramètres → Développeur → Clés API → Nouvelle clé API** :

- `settings:write` — requis pour que B1 enregistre le webhook de déclencheur
- `people:read` — nécessaire pour rechercher la personne à partir de l'événement (`personId` → nom/téléphone/email)
- (Optionnel) `people:write` si les réponses Clearstream doivent créer des contacts B1

### 2. Créer le Zap « texte sur nouveau don »

1. **Déclencheur** — B1.church : Nouveau don
2. **Action** — B1.church : Trouver une personne (le `personId` du don)
3. **Action** — Clearstream : Envoyer un texte au numéro. Utilisez le téléphone de la personne à partir de l'étape 2 comme destinataire, composez le message (`« Merci pour votre don, {first}! … »`).

Activez le Zap. B1 enregistre le webhook de don à l'activation; vous verrez `Zapier — donation.created` apparaître dans **Paramètres → Développeur → Webhooks**.

### 3. (Optionnel) Récupérer les réponses en tant que dossiers B1

1. **Déclencheur** — Clearstream : Nouveau texte entrant
2. **Action** — Filtre par Zapier sur le mot-clé — par exemple continuer uniquement si le corps du texte commence par `PRAY`
3. **Action** — B1.church : Trouver une personne (par téléphone)
4. **Action** — Filtre / Chemin — si non trouvée, créez-la; de toute façon, classez le corps du texte quelque part (Slack, Google Sheet, ou une soumission de formulaire B1 via Webhooks by Zapier).

## Recettes courantes

### Pagination de l'équipe de bénévoles

- **Déclencheur** — B1.church : Nouvelle soumission de formulaire (filtrée sur l'id du formulaire de demande de prière)
- **Action** — Clearstream : Envoyer un texte à une liste, où la liste est votre équipe pastorale de garde. Composez le corps comme `Nouvelle demande de prière: {data.questions.0.answer}`.

### Séquence de suivi des visiteurs pour la première fois

- **Déclencheur** — B1.church : Nouvelle personne, filtrée sur un tag de personne B1 « Visitant pour la première fois »
- **Action** — Clearstream : Ajouter un abonné à un flux de travail automatisé. Mappez l'id du flux de travail à un goutte-à-goutte texte pré-construit de 7 jours.

### Adhésion au groupe activée par mot-clé

- **Déclencheur** — Clearstream : Nouveau texte entrant (filtre sur le mot-clé `MENS`)
- **Action** — B1.church : Trouver une personne (par téléphone); bifurquer sur non-trouvée → Créer une personne
- **Action** — B1.church : Ajouter un membre de groupe au groupe du ministère des hommes

## Limites et remarques

- **Clearstream mesure les SMS par message.** Chaque action Envoyer un texte consomme un ou plusieurs crédits selon la longueur et le nombre de destinataires — vérifiez l'allocation de votre plan.
- **Le téléphone doit être au format E.164** (par exemple `+15555550199`) pour *Envoyer un texte au numéro*. Le dossier de personne B1 stocke ce qui a été saisi; utilisez une étape *Formatrice par Zapier — Nombres → Formater le numéro de téléphone* si vous ne pouvez pas garantir le format.
- **Aucun en-tête n'est requis du côté B1** — l'authentification de Clearstream vit entièrement à l'intérieur de sa connexion Zapier.

## Dépannage

- **Le déclencheur ne se déclenche jamais** — `Paramètres → Développeur → Webhooks` devrait afficher une ligne `Zapier — <event>` après que le Zap soit activé. Si ce n'est pas le cas, la clé API B1 manque `settings:write`. Re-créez et reconnectez.
- **Clearstream retourne « Numéro de téléphone invalide »** — le champ du destinataire n'est pas au format E.164. Ajoutez une étape Formater le numéro de téléphone.
- **Envoyer un texte à une liste échoue avec `403`** — l'utilisateur API Clearstream manque de permissions pour cette liste, ou l'id de la liste est incorrect. Les id de liste sont visibles sur la page de détails de la liste Clearstream.

## Voir aussi

- [Text In Church](./text-in-church) — plate-forme SMS alternative, forme de câblage similaire
- [Mobile Message](./mobile-message) — pour les églises en dehors des États-Unis
- [Zapier (aperçu)](../zapier) — le côté B1 de chaque recette Zapier
- [Docs API Clearstream](https://api-docs.clearstream.io/) — pour les intégrations personnalisées au-delà de l'application Zapier
