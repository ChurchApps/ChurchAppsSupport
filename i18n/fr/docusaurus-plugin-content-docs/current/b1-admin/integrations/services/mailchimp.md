---
title: "Mailchimp"
---

# Mailchimp

<div class="article-intro">

Acheminez les nouvelles personnes B1, les donateurs, ou les membres de groupe vers une audience Mailchimp afin que la prochaine série de bienvenue, l'appel de fin d'année, ou la newsletter des bénévoles s'appuie sur une liste toujours à jour. B1 n'a pas de synchronisation Mailchimp intégrée — le câblage se fait entièrement dans Zapier (ou Make) : B1 déclenche l'événement, Mailchimp ingère l'abonné.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Un compte [Mailchimp](https://mailchimp.com) avec au moins une audience vers laquelle vous voulez pousser les personnes B1
- Un compte [Zapier](https://zapier.com) (le forfait gratuit couvre les petites églises)
- Un utilisateur B1Admin avec l'autorisation **Modifier les paramètres** pour pouvoir générer une clé API

</div>

## Ce que vous pouvez connecter

| Direction | Déclencheur B1 | Action Mailchimp |
|---|---|---|
| B1 → Mailchimp | `person.created` | Ajouter/Mettre à jour un abonné |
| B1 → Mailchimp | `donation.created` | Ajouter l'abonné à une étiquette (par ex. « A donné en 2026 ») |
| B1 → Mailchimp | `group.member.added` | Ajouter l'abonné à une étiquette propre à ce groupe |
| Mailchimp → B1 | Nouvel abonné | B1 *Créer une personne* |

Le côté Mailchimp expose bien plus (campagnes, segments, automatisations) — consultez les [déclencheurs Zapier de Mailchimp](https://zapier.com/apps/mailchimp/integrations) pour la liste complète. Tout ce qui est mappable depuis l'enveloppe B1 est envisageable.

## Configuration

### 1. Générer une clé API B1

Dans B1Admin, allez dans **Paramètres → Développeur → Clés API → Nouvelle clé API**. Donnez-lui les portées dont le Zap a besoin :

- `settings:write` — requis pour que le déclencheur enregistre son webhook
- `people:read` — afin que le Zap puisse lire le prénom/nom, l'e-mail, etc.
- (Facultatif) `people:write` si vous prévoyez aussi une direction Mailchimp → B1

Enregistrez et copiez la chaîne `cak_…` — elle n'est affichée qu'une seule fois.

### 2. Construire le Zap

1. **Déclencheur :** `B1.church — Nouvelle personne`. À la première utilisation, Zapier vous demande de *Vous connecter à B1.church* ; collez la clé API.
2. **Action :** `Mailchimp — Ajouter/Mettre à jour un abonné`. Associez la sortie du déclencheur :
   - `data.contactInfo.email` → Adresse e-mail
   - `data.name.first` → Prénom
   - `data.name.last` → Nom
   - (Facultatif) `data.id` → un champ de fusion Mailchimp si vous voulez conserver l'id de la personne B1 en parallèle.
3. Activez le Zap. Zapier enregistre un webhook `person.created` sur B1 — vérifiez dans **Paramètres → Développeur → Webhooks** qu'une ligne nommée « Zapier — person.created » apparaît.

C'est tout. Ajoutez une personne dans B1Admin pour confirmer — le nouvel abonné apparaît dans Mailchimp en quelques secondes.

## Recettes courantes

### Étiqueter automatiquement les donateurs

- **Déclencheur** — B1 : Nouveau don
- **Action** — B1 : Rechercher une personne (recherche par `personId`) pour obtenir l'e-mail
- **Action** — Mailchimp : Ajouter l'abonné à une étiquette (étiquette `Gave-2026`)

### Lancer une série de bienvenue propre à un groupe

- **Déclencheur** — B1 : Nouveau membre de groupe, filtré par `data.groupId`
- **Action** — Mailchimp : Ajouter l'abonné à une étiquette nommée d'après le groupe ; déclenchez votre automatisation existante sur cette étiquette

### Bidirectionnel : les nouvelles inscriptions Mailchimp deviennent des contacts B1

- **Déclencheur** — Mailchimp : Nouvel abonné
- **Action** — B1 : Créer une personne (associer Prénom/Nom/E-mail)

## Alternative Make

L'[application Mailchimp](https://www.make.com/en/integrations/mailchimp) de Make couvre 44 modules — le câblage est identique, le déclencheur B1 *Surveiller les événements* remplaçant celui de Zapier. Consultez le [document de vue d'ensemble Make](../make) pour le côté B1.

## Limites et remarques

- **Le forfait gratuit de Mailchimp plafonne les contacts et les audiences** — un Zap qui inonde une audience gratuite au-delà de sa limite commencera à générer des erreurs `4xx Member limit reached`. Les journaux de Mailchimp rendent cela évident.
- **Mailchimp dédoublonne par e-mail**, donc relancer un Zap sur la même personne B1 la met à jour sur place ; cela ne crée pas de doublons.
- **Les désabonnements de Mailchimp ne remontent pas vers B1.** Si vous voulez que les désabonnements Mailchimp effacent la préférence « Envoyer des e-mails » de B1, créez explicitement le Zap inverse.

## Dépannage

- **Le Zap ne se déclenche jamais** — vérifiez `Paramètres → Développeur → Webhooks` pour la ligne `Zapier — person.created`. Si absente, la clé API manquait de `settings:write` lors de l'activation du Zap. Réémettez, reconnectez, désactivez puis réactivez le Zap.
- **Avertissement `Member exists` sur Ajouter/Mettre à jour** — basculez l'action de *Ajouter un abonné* vers *Ajouter/Mettre à jour un abonné* (le verbe compte). La variante upsert est idempotente.
- **Le prénom / nom arrivent vides** — les champs `data.name.first` et `data.name.last` de B1 ne sont renseignés que si ces champs sont définis sur la personne. Associez `data.name.display` en secours.

## Voir aussi

- [Zapier (vue d'ensemble)](../zapier) — le côté B1 de chaque recette Zapier
- [Make (vue d'ensemble)](../make) — même idée, constructeur visuel
- [Webhooks (référence développeur)](/docs/developer/api/webhooks#event-catalog)
