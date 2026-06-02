---
title: "Mailchimp"
---

# Mailchimp

<div class="article-intro">

Canalisez les nouvelles personnes B1, les donateurs ou les membres de groupe dans une audience Mailchimp pour que la prochaine série de bienvenue, l'appel de fin d'année, ou la lettre d'information des bénévoles tire d'une liste qui est toujours à jour. Le câblage vit entièrement dans Zapier (ou Make) — B1 déclenche l'événement, Mailchimp ingère l'abonné.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Un compte [Mailchimp](https://mailchimp.com) avec au moins une audience dans laquelle vous voulez que les personnes B1 soient poussées
- Un compte [Zapier](https://zapier.com) (le niveau gratuit couvre les petites églises)
- Un utilisateur B1Admin avec la permission **Modifier les paramètres** pour que vous puissiez créer une clé API

</div>

## Ce que vous pouvez connecter

| Direction | Déclencheur B1 | Action Mailchimp |
|---|---|---|
| B1 → Mailchimp | `person.created` | Ajouter/Mettre à jour un abonné |
| B1 → Mailchimp | `donation.created` | Ajouter un abonné à un tag (par exemple « A donné en 2026 ») |
| B1 → Mailchimp | `group.member.added` | Ajouter un abonné à un tag limité à ce groupe |
| Mailchimp → B1 | Nouvel abonné | B1 *Créer une personne* |

Le côté Mailchimp expose beaucoup plus (campagnes, segments, automatisations) — voir [les intégrations Zapier de Mailchimp](https://zapier.com/apps/mailchimp/integrations) pour la liste complète. Tout ce qui est mappable à partir de l'enveloppe B1 est correct.

## Configuration

### 1. Créer une clé API B1

Dans B1Admin allez à **Paramètres → Développeur → Clés API → Nouvelle clé API**. Donnez-lui les scopes dont le Zap a besoin :

- `settings:write` — requis pour que le déclencheur enregistre son webhook
- `people:read` — pour que le Zap puisse lire le prénom/nom, l'email, etc.
- (Optionnel) `people:write` si vous prévoyez aussi une direction Mailchimp → B1

Enregistrez et copiez la chaîne `cak_…` — elle n'est affichée qu'une fois.

### 2. Construire le Zap

1. **Déclencheur :** `B1.church — Nouvelle personne`. À la première utilisation, Zapier vous demande de *Se connecter à B1.church*; collez la clé API.
2. **Action :** `Mailchimp — Ajouter/Mettre à jour un abonné`. Mappez la sortie du déclencheur :
   - `data.contactInfo.email` → Adresse email
   - `data.name.first` → Prénom
   - `data.name.last` → Nom de famille
   - (Optionnel) `data.id` → un champ de fusion Mailchimp si vous voulez garder l'id de personne B1 à côté.
3. Activez le Zap. Zapier enregistre un webhook `person.created` sur B1 — vérifiez dans **Paramètres → Développeur → Webhooks** qu'une ligne nommée « Zapier — person.created » apparaît.

C'est tout. Ajoutez une personne dans B1Admin pour confirmer — le nouvel abonné apparaît dans Mailchimp en quelques secondes.

## Recettes courantes

### Marquer les donateurs automatiquement

- **Déclencheur** — B1 : Nouveau don
- **Action** — B1 : Trouver une personne (recherche par `personId`) pour obtenir l'email
- **Action** — Mailchimp : Ajouter un abonné à un tag (tag `Gave-2026`)

### Déposer une série de bienvenue spécifique au groupe

- **Déclencheur** — B1 : Nouveau membre du groupe, filtré par `data.groupId`
- **Action** — Mailchimp : Ajouter un abonné à un tag nommé d'après le groupe; déclenchez votre automatisation existante sur ce tag

### Bidirectionnel : les nouveaux abonnés Mailchimp deviennent des contacts B1

- **Déclencheur** — Mailchimp : Nouvel abonné
- **Action** — B1 : Créer une personne (mappez Prénom/Nom/Email)

## Alternative Make

L'[application Mailchimp](https://www.make.com/en/integrations/mailchimp) de Make couvre 44 modules — le câblage est identique, avec le déclencheur B1 *Surveiller les événements* remplaçant celui de Zapier. Voir le [doc d'aperçu Make](../make) pour le côté B1.

## Limites et remarques

- **Le niveau gratuit de Mailchimp limite les contacts et les audiences** — un Zap qui inonde une audience gratuite au-delà de sa limite commencera à produire une erreur avec `4xx Limite de membres atteinte`. Les journaux de Mailchimp le rendent évident.
- **Mailchimp déduplique par email**, donc réexécuter un Zap sur la même personne B1 la met à jour en place; cela ne crée pas de doublons.
- **Les désinscriptions de Mailchimp ne refluxent pas vers B1.** Si vous voulez que les désinscriptions Mailchimp effacent la préférence « Envoyer du courrier » de B1, construisez explicitement le Zap inverse.

## Dépannage

- **Le Zap ne se déclenche jamais** — vérifiez `Paramètres → Développeur → Webhooks` pour la ligne `Zapier — person.created`. Si absent, la clé API manquait `settings:write` quand le Zap s'est activé. Re-créez, reconnectez, basculez le Zap hors puis on.
- **Avertissement `Membre existe` sur Ajouter/Mettre à jour** — basculez l'action de *Ajouter un abonné* à *Ajouter/Mettre à jour un abonné* (le verbe compte). La variante upsert est idempotente.
- **Le prénom / nom de famille arrive vide** — les `data.name.first` et `data.name.last` de B1 ne sont remplis que si ces champs sont définis sur la personne. Mappez `data.name.display` comme solution de secours.

## Voir aussi

- [Zapier (aperçu)](../zapier) — le côté B1 de chaque recette Zapier
- [Make (aperçu)](../make) — même idée, constructeur visuel
- [Webhooks (référence développeur)](/docs/developer/api/webhooks#event-catalog)
