---
title: "Mailchimp"
description: "Synchronisez les personnes de B1 Admin et l'appartenance aux groupes ou aux listes enregistrées avec une audience Mailchimp sous forme d'étiquettes, avec les étapes de configuration, d'importation initiale et de dépannage."
---

# Mailchimp

<div class="article-intro">

Maintenez automatiquement une audience Mailchimp synchronisée avec B1 : les personnes arrivent avec leur nom, leur courriel et leur téléphone ; l'appartenance aux groupes et aux listes devient des étiquettes Mailchimp ; les personnes supprimées sont archivées. La synchronisation est intégrée à B1 — aucun service tiers, aucune facturation à la tâche, et les modifications arrivent presque en temps réel plutôt que selon une planification nocturne.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Un compte [Mailchimp](https://mailchimp.com) avec l'audience que vous souhaitez confier à B1
- Une **clé API** Mailchimp (Mailchimp : icône de profil → **Compte et facturation → Extras → Clés API**)
- Votre **identifiant d'audience** (Mailchimp : **Audience → Paramètres → Nom de l'audience et valeurs par défaut**)
- Un utilisateur B1Admin disposant de l'autorisation **Modifier les paramètres**

</div>

## Ce qui est synchronisé {#what-syncs}

| Modification dans B1 | Effet dans Mailchimp |
|---|---|
| Personne ajoutée ou mise à jour | Abonné ajouté ou mis à jour (prénom, nom, téléphone ; les nouveaux abonnés arrivent avec le statut `subscribed`) |
| Personne supprimée (ou effacée au titre du RGPD) | Abonné archivé |
| Personne rejoint un groupe | Étiquette portant le nom du groupe ajoutée |
| Personne quitte un groupe | Cette étiquette retirée |
| Personne entre dans une liste enregistrée | Étiquette portant le nom de la liste ajoutée |
| Personne quitte une liste enregistrée | Cette étiquette retirée |

**Les listes enregistrées sont généralement la meilleure source d'étiquettes.** Une [liste enregistrée](/docs/b1-admin/people/lists) de B1 est une audience fondée sur des règles qui se réévalue automatiquement — « toutes les personnes du campus Nord », « les membres ayant accepté les courriels pastoraux ». Associez vos segments Mailchimp aux étiquettes de liste : la synchronisation les maintient à jour. Utilisez les étiquettes de groupe pour les envois aux équipes de ministère.

La synchronisation est **à sens unique** (B1 → Mailchimp) et ne touche qu'aux champs standard de Mailchimp ; elle ne peut donc pas entrer en conflit avec les champs de fusion ou les segments que vous gérez dans Mailchimp.

## Configuration {#setup}

1. Dans B1Admin, allez dans **Paramètres → Développeur → Webhooks → Nouveau webhook**.
2. Définissez le **Type de connecteur** sur **Mailchimp**.
3. Collez votre **clé API Mailchimp** et votre **identifiant d'audience**. La clé est stockée chiffrée et n'est plus jamais affichée.
4. Les événements pertinents sont présélectionnés ; décochez ceux dont vous ne voulez pas (par exemple, gardez les événements de personnes mais ignorez les étiquettes de groupe).
5. Enregistrez. B1 vérifie la clé et l'audience auprès de Mailchimp avant de les accepter — une faute de frappe échoue immédiatement, avec la raison indiquée.

Rouvrez le webhook et cliquez sur **Envoyer un événement test** à tout moment pour revérifier la connexion (pour Mailchimp, cela contrôle votre clé et votre audience au lieu d'envoyer un abonné d'exemple). Chaque tentative de synchronisation est consignée dans l'historique des livraisons du webhook avec la réponse réelle de Mailchimp, et les livraisons en échec sont relancées automatiquement avec un espacement croissant pendant environ cinq jours.

## Importation initiale {#initial-import}

Le connecteur synchronise les *modifications* à partir du moment où il est activé ; il ne reprend pas rétroactivement votre annuaire existant. Pour le jour de la configuration :

1. Dans B1Admin, allez dans **Personnes**, recherchez les personnes souhaitées (ou exécutez une liste enregistrée), puis cliquez sur **Exporter** pour télécharger un fichier CSV.
2. Dans Mailchimp, utilisez **Audience → Importer des contacts** pour charger le fichier CSV, en appliquant les étiquettes souhaitées pendant l'importation.

Effectuer le chargement initial avec l'outil d'importation de Mailchimp vous permet de garder le contrôle du consentement : n'importez que les personnes qui ont réellement accepté de recevoir vos courriels. Importer en masse tout un annuaire comme contacts abonnés peut enfreindre les conditions d'utilisation de Mailchimp et la législation anti-pourriel (CAN-SPAM / RGPD).

## Limites et remarques {#limits--notes}

- **Synchronisation à sens unique.** Les désabonnements, les rejets et les modifications effectués dans Mailchimp ne remontent pas vers B1. Une personne qui se désabonne dans Mailchimp peut toujours recevoir des courriels envoyés directement depuis B1 — considérez Mailchimp comme la source de référence pour le consentement aux envois en masse.
- **Les personnes sans adresse courriel sont ignorées** (et consignées comme telles dans l'historique des livraisons) — les abonnés Mailchimp sont identifiés par leur courriel.
- **Un changement d'adresse courriel crée un nouvel abonné.** Mailchimp identifie les personnes par courriel : si vous modifiez le courriel d'une personne dans B1, elle est ajoutée sous la nouvelle adresse ; l'ancien abonné subsiste jusqu'à ce que vous l'archiviez dans Mailchimp.
- **Seuls les champs standard sont synchronisés** — prénom, nom, téléphone. Le statut d'appartenance, le campus et les champs personnalisés de B1 ne correspondent pas aux champs de fusion de Mailchimp dans cette version ; utilisez plutôt les étiquettes de liste pour segmenter.
- **Les noms des étiquettes sont les noms des groupes ou des listes.** Renommer un groupe ou une liste fait commencer l'étiquetage sous le nouveau nom ; l'ancienne étiquette reste sur les abonnés existants jusqu'à ce que vous la retiriez dans Mailchimp.
- **Les limites de contacts de Mailchimp s'appliquent toujours** — une synchronisation qui fait dépasser à une audience gratuite son plafond consignera des erreurs `Member limit reached` dans l'historique des livraisons.

## Autres recettes (Zapier / Make) {#other-recipes-zapier--make}

Tout ce qui dépasse la synchronisation d'audience — étiqueter les donateurs sur `donation.created`, un sens inverse Mailchimp → B1, ou une synchronisation vers une autre plateforme de courriel (Constant Contact, Brevo, etc.) — reste possible avec [Zapier](../zapier.md) ou [Make](../make.md), qui se déclenchent sur les mêmes événements de webhook :

- **Étiqueter les donateurs :** B1 *Nouveau don* → B1 *Rechercher une personne* → Mailchimp *Ajouter un abonné à une étiquette* (`Gave-2026`)
- **Dans les deux sens :** Mailchimp *Nouvel abonné* → B1 *Créer une personne*

Si vous aviez déjà relié la synchronisation des personnes et des groupes via Zapier, désactivez ces Zaps après avoir activé le connecteur natif : les deux en parallèle traitent chaque événement en double et consomment des tâches Zapier inutilement.

## Dépannage {#troubleshooting}

- **L'enregistrement échoue avec « Mailchimp rejected the API key »** — la clé a été révoquée ou mal saisie. Les clés doivent se terminer par un suffixe de centre de données comme `-us21`.
- **L'enregistrement échoue avec « audience not found »** — l'identifiant d'audience n'existe pas sous ce compte. Copiez-le depuis **Audience → Paramètres → Nom de l'audience et valeurs par défaut** (ce n'est pas le nom de l'audience).
- **Une personne n'est jamais apparue dans Mailchimp** — consultez l'historique des livraisons du webhook. « Skipped: person has no email address » signifie exactement cela ; une erreur `4xx` de Mailchimp indique la raison dans le corps de la réponse.
- **Les livraisons se sont arrêtées complètement** — après des échecs répétés épuisant toutes les tentatives, le webhook se désactive automatiquement. Corrigez la cause (généralement une clé révoquée), réactivez-le, puis utilisez **Envoyer un événement test** pour confirmer.

## Voir aussi {#see-also}

- [Webhooks (référence développeur)](/docs/developer/api/webhooks) — le moteur sous-jacent, le catalogue d'événements et la sémantique des livraisons et des nouvelles tentatives
- [Listes enregistrées](/docs/b1-admin/people/lists) — audiences fondées sur des règles qui correspondent naturellement aux étiquettes Mailchimp
- [Zapier (présentation)](../zapier.md) — pour des recettes au-delà de la synchronisation d'audience
