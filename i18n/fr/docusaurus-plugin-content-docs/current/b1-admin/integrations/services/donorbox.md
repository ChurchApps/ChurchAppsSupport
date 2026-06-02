---
title: "Donorbox"
---

# Donorbox

<div class="article-intro">

Si votre église reçoit les donations via Donorbox mais suit les personnes et les relevés dans B1, vous pouvez faire en sorte que les déclencheurs instantanés Zapier de Donorbox créent des dossiers de donation correspondants dans B1 — et créer le donateur en tant que personne B1 s'il n'existe pas déjà. Aucune réconciliation manuelle, aucune exportation mensuelle.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Un compte [Donorbox](https://donorbox.org) avec au moins une campagne
- Un compte [Zapier](https://zapier.com)
- Un utilisateur B1Admin avec la permission **Modifier les paramètres**

</div>

## Ce que vous pouvez connecter

| Direction | Déclencheur Donorbox | Action B1 |
|---|---|---|
| Donorbox → B1 | Donation nouvelle ou mise à jour (instantanée) | Trouver une personne → Ajouter une donation |
| Donorbox → B1 | Donateur nouveau ou mis à jour | Créer une personne |
| Donorbox → B1 | Plan nouveau ou mis à jour (récurrent) | Trouver une personne → Ajouter une donation (utiliser l'id du plan comme note) |

Donorbox publie ses déclencheurs comme **instantanés** — ils se déclenchent en quelques secondes d'une vraie donation. Aucun délai de polling.

## Configuration

### 1. Créer une clé API B1

Dans B1Admin : **Paramètres → Développeur → Clés API → Nouvelle clé API**. Scopes :

- `people:read` — pour rechercher le donateur par email
- `people:write` — pour le créer s'il est nouveau
- `donations:write` — pour enregistrer le don

Les déclencheurs dans cette direction sont ceux de Donorbox, pas B1, donc vous n'avez pas besoin `settings:write` ici.

### 2. Créer le Zap « enregistrer une donation »

1. **Déclencheur** — Donorbox : Nouvelle donation. Connectez-vous avec la clé API de Donorbox (dans Donorbox : *Compte → Profil → Paramètres API*).
2. **Action** — B1.church : Trouver une personne. Mappez l'email du donateur du déclencheur au champ de recherche *Email*.
3. **Action** — Filtre par Zapier (optionnel) : continuer uniquement si le donateur n'a pas été trouvé, puis…
4. **Action** — B1.church : Créer une personne. Mappez prénom/nom/email pour que le donateur arrive en tant que membre, pas juste un dossier de don.
5. **Action** — B1.church : Ajouter une donation. Mappez :
   - Montant → `data.amount`
   - Date de donation → date de donation du déclencheur
   - Fonds → choisissez le fonds B1 qui correspond à la campagne Donorbox (Zapier vous permet de basculer les fonds en fonction d'une étape de filtre ou de formatage)
   - Méthode → « En ligne »
   - Remarques → id de transaction Donorbox (pratique lors de la réconciliation)

Activez le Zap. Le prochain don en direct via Donorbox arrive dans **B1Admin → Donations** automatiquement.

## Recettes courantes

### Un Zap par fonds

Si vous exécutez plusieurs campagnes Donorbox qui correspondent à des fonds B1 séparés, la mise en page la plus propre est un Zap par campagne avec un filtre Donorbox *campaign* en haut — de cette façon le mappage des fonds est codé en dur et vous ignorez l'étape de recherche.

### Traiter les donations mises à jour comme des corrections

Le *Nouvelle ou mise à jour de donation* de Donorbox se déclenche aussi sur les modifications. Utilisez une étape *Chemin* Zapier sur `event_type` pour bifurquer : « new » → Ajouter une donation, « updated » → Trouver une donation + Mettre à jour (remarque : l'application Zapier B1 n'a actuellement pas d'action Mettre à jour une donation — pour l'instant, enregistrez les événements « updated » dans un canal Slack pour examen manuel).

### Synchroniser les changements de plan récurrent avec un canal Slack

- **Déclencheur** — Donorbox : Nouveau ou plan mis à jour
- **Action** — Slack : Envoyer un message à `#donations` (par exemple « Plan changé — le don mensuel de Sarah est maintenant 200 $ »)

## Limites et remarques

- **Faites correspondre les donateurs par email.** Donorbox ne partage pas l'id de personne de B1; la seule clé de jointure durable est l'email. Les donateurs qui donnent sous un email différent créeront une nouvelle personne B1 — votre réconciliation mensuelle devrait chercher celles-ci.
- **Les remboursements ne sont pas exposés séparément** — Donorbox émet une mise à jour d'état sur la même donation. L'application Zapier B1 n'a actuellement pas d'action *Mettre à jour une donation*; le motif sûr aujourd'hui est d'enregistrer les événements de remboursement hors bande et d'ajuster la donation manuellement.
- **Testez d'abord dans le bac à sable de Donorbox** pour éviter de créer de faux dons en B1 de production. Donorbox fournit des identifiants de mode test séparés de la production en direct.

## Dépannage

- **Avertissement « Personne non trouvée » à chaque exécution** — c'est bien si vous avez ordonné les étapes pour qu'une *Créer une personne* s'exécute dans la branche non-trouvée. Si l'étape Créer une personne ne s'exécute jamais non plus, vérifiez deux fois que la clé API a `people:write`.
- **Le montant de la donation semble 100 fois trop gros ou petit** — Donorbox envoie des centimes dans certaines variantes de payload et des dollars dans d'autres. Utilisez une étape *Formatrice par Zapier — Nombres* pour diviser par 100 si nécessaire.
- **Donations doublées à partir d'un seul don** — Donorbox se déclenche à la fois *Nouvelle donation* et *Donation mise à jour*. Soit filtre sur `event_type = "donation.succeeded"` ou créez deux Zaps avec des filtres qui ne se chevauchent pas.

## Voir aussi

- [Zapier (aperçu)](../zapier) — le côté B1 de chaque recette Zapier
- [Subsplash](./subsplash) — une autre plate-forme de donation avec une application Zapier
- [Mailchimp](./mailchimp) — chaînez « nouveau don » dans un tag email
