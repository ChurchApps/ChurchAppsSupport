---
title: "Mailchimp"
---

# Mailchimp

<div class="article-intro">

Canalisez les nouvelles personnes B1, les donateurs ou les membres du groupe dans un public Mailchimp afin que la prochaine série de bienvenue, appel de fin d'année ou infolettre bénévole tire d'une liste toujours à jour. B1 n'a pas de synchronisation Mailchimp intégrée -- le câblage vit entièrement dans Zapier (ou Make) : B1 déclenche l'événement, Mailchimp ingère l'abonné.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Un compte [Mailchimp](https://mailchimp.com) avec au moins un public dans lequel vous souhaitez que les personnes B1 soient poussées
- Un compte [Zapier](https://zapier.com) (le niveau gratuit couvre les petites églises)
- Un utilisateur B1Admin avec l'autorisation **Modifier les paramètres** afin que vous puissiez menthe une clé API

</div>

## Ce que vous pouvez câbler

| Direction | Déclencheur B1 | Action Mailchimp |
|---|---|---|
| B1 → Mailchimp | `person.created` | Ajouter/Mettre à jour l'abonné |
| B1 → Mailchimp | `donation.created` | Ajouter l'abonné à la balise (par exemple « Donné en 2026 ») |
| B1 → Mailchimp | `group.member.added` | Ajouter l'abonné à la balise limitée à ce groupe |
| Mailchimp → B1 | Nouvel abonné | B1 *Créer une personne* |

Le côté Mailchimp expose beaucoup plus (campagnes, segments, automations) -- consultez [les déclencheurs Zapier de Mailchimp](https://zapier.com/apps/mailchimp/integrations) pour la liste complète. Tout ce qui est mappable à partir de l'enveloppe B1 est un jeu équitable.

## Configuration

### 1. Menthe une clé API B1

Dans B1Admin, allez à **Paramètres → Développeur → Clés API → Nouvelle clé API**. Donnez-lui les portées dont le Zap a besoin :

- `settings:write` -- requis pour que le déclencheur enregistre son webhook
- `people:read` -- afin que le Zap puisse lire le prénom/nom, l'e-mail, etc.
- (Optionnel) `people:write` si vous envisagez également une direction Mailchimp → B1

Enregistrez et copiez la chaîne `cak_…` -- elle n'est affichée qu'une fois.

### 2. Construire le Zap

1. **Déclencheur :** `B1.church — Nouvelle personne`. À la première utilisation, Zapier vous demande de *Vous connecter à B1.church* ; collez la clé API.
2. **Action :** `Mailchimp — Ajouter/Mettre à jour l'abonné`. Mappez la sortie du déclencheur :
   - `data.contactInfo.email` → Adresse e-mail
   - `data.name.first` → Prénom
   - `data.name.last` → Nom de famille
   - (Optionnel) `data.id` → un champ de fusion Mailchimp si vous souhaitez conserver l'ID de personne de B1 à côté.
3. Activez le Zap. Zapier enregistre un webhook `person.created` sur B1 -- vérifiez dans **Paramètres → Développeur → Webhooks** qu'une ligne nommée « Zapier — person.created » apparaît.

C'est tout. Ajoutez une personne dans B1Admin pour confirmer -- le nouvel abonné apparaît dans Mailchimp en quelques secondes.

## Recettes courantes

### Marquer automatiquement les donateurs

- **Déclencheur** -- B1 : Nouveau don
- **Action** -- B1 : Trouver une personne (recherche par `personId`) pour obtenir l'e-mail
- **Action** -- Mailchimp : Ajouter l'abonné à la balise (balise `Gave-2026`)

### Déposer une série de bienvenue spécifique au groupe

- **Déclencheur** -- B1 : Nouveau membre du groupe, filtré par `data.groupId`
- **Action** -- Mailchimp : Ajouter l'abonné à la balise nommée d'après le groupe ; déclenchez votre automatisation existante sur cette balise

### Bidirectionnel : les nouveaux abonnés Mailchimp deviennent des contacts B1

- **Déclencheur** -- Mailchimp : Nouvel abonné
- **Action** -- B1 : Créer une personne (carte Prénom/Nom/E-mail)

## Alternative Make

L'[application Mailchimp](https://www.make.com/en/integrations/mailchimp) de Make couvre 44 modules -- le câblage est identique, avec le déclencheur *Watch Events* de B1 remplaçant celui de Zapier. Consultez le [document de présentation de Make](../make) pour le côté B1.

## Limites et notes

- **Le niveau gratuit de Mailchimp plafonne les contacts et les audiences** -- un Zap qui inonde une audience gratuite au-delà de sa limite commencera à échouer avec `4xx Member limit reached`. Les journaux de Mailchimp le rendent évident.
- **Mailchimp déduplique par e-mail**, de sorte que la réexécution d'un Zap sur la même personne B1 les met à jour sur place ; cela ne crée pas de doublons.
- **Les désinscriptions de Mailchimp ne reviennent pas à B1.** Si vous souhaitez que les désinscriptions de Mailchimp effacent la préférence « Envoyer un e-mail » de B1, construisez explicitement le Zap inverse.

## Dépannage

- **Le Zap ne s'active jamais** -- vérifiez `Paramètres → Développeur → Webhooks` pour la ligne `Zapier — person.created`. S'il est absent, la clé API manquait `settings:write` quand le Zap s'est activé. Rementz, reconnectez, basculez le Zap et allumez-le.
- **Avertissement `Member exists` sur Ajouter/Mettre à jour** -- basculez l'action de *Ajouter l'abonné* à *Ajouter/Mettre à jour l'abonné* (le verbe est important). La variante upsert est idempotente.
- **Le prénom / le nom apparaissent vides** -- `data.name.first` et `data.name.last` de B1 ne sont remplis que si ces champs sont définis sur la personne. Mappez `data.name.display` comme secours.

## Voir aussi

- [Zapier (aperçu)](../zapier) -- le côté B1 de chaque recette Zapier
- [Make (aperçu)](../make) -- même idée, générateur visuel
- [Webhooks (référence développeur)](/docs/developer/api/webhooks#event-catalog)
