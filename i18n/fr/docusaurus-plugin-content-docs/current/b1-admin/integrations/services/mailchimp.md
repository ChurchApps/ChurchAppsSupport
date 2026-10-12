---
title: "Mailchimp"
---

# Mailchimp

<div class="article-intro">

Gardez une audience Mailchimp synchronisée avec B1 automatiquement : les personnes y arrivent avec leur nom, leur e-mail et leur téléphone ; l'appartenance à un groupe ou à une liste devient des étiquettes Mailchimp ; les personnes supprimées sont archivées. La synchronisation est intégrée à B1 — pas de service tiers, pas de facturation à la tâche, et les modifications arrivent presque en temps réel plutôt que selon un horaire nocturne.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Un compte [Mailchimp](https://mailchimp.com) avec l'audience que vous voulez que B1 gère
- Une **clé API** Mailchimp (Mailchimp : icône de profil → **Account & billing → Extras → API keys**)
- Votre **Audience ID** (Mailchimp : **Audience → Settings → Audience name and defaults**)
- Un utilisateur B1Admin avec la permission **Edit Settings**

</div>

## Ce qui se synchronise

| Modification dans B1 | Effet dans Mailchimp |
|---|---|
| Personne ajoutée ou mise à jour | Abonné ajouté/mis à jour (prénom, nom, téléphone ; les nouveaux abonnés arrivent avec le statut `subscribed`) |
| Personne supprimée (ou effacée au titre du RGPD) | Abonné archivé |
| Personne rejoint un groupe | Étiquette portant le nom du groupe ajoutée |
| Personne quitte un groupe | Cette étiquette supprimée |
| Personne entre dans une liste enregistrée | Étiquette portant le nom de la liste ajoutée |
| Personne quitte une liste enregistrée | Cette étiquette supprimée |

**Les listes enregistrées sont généralement une meilleure source d'étiquettes.** Une [liste enregistrée](/docs/b1-admin/people/lists) B1 est une audience basée sur des règles qui se réévalue d'elle-même — « tous les membres du campus Nord », « les membres ayant accepté les e-mails pastoraux ». Associez vos segments Mailchimp aux étiquettes de liste et la synchronisation les maintient à jour ; utilisez les étiquettes de groupe pour les envois aux équipes de ministère.

La synchronisation est **à sens unique** (B1 → Mailchimp) et ne modifie que les champs standard de Mailchimp ; elle ne peut donc pas entrer en conflit avec les champs de fusion ou les segments que vous gérez dans Mailchimp.

## Configuration

1. Dans B1Admin, allez dans **Settings → Developer → Webhooks → New Webhook**.
2. Définissez **Connector Type** sur **Mailchimp**.
3. Collez votre **clé API Mailchimp** et votre **Audience ID**. La clé est stockée chiffrée et n'est plus jamais affichée.
4. Les événements pertinents sont présélectionnés ; décochez ceux que vous ne voulez pas (par exemple, gardez les événements de personne activés mais ignorez les étiquettes de groupe).
5. Enregistrez. B1 vérifie la clé et l'audience auprès de Mailchimp avant d'accepter — une faute de frappe échoue immédiatement avec un motif.

Utilisez **Send Test** à tout moment pour vérifier à nouveau la connexion. Chaque tentative de synchronisation est consignée dans l'historique des envois du webhook, avec la réponse réelle de Mailchimp, et les envois échoués sont relancés automatiquement avec un délai croissant pendant environ cinq jours.

## Importation initiale

Le connecteur synchronise les *modifications* à partir du moment où il est activé ; il ne récupère pas rétroactivement votre répertoire existant. Pour le jour de la configuration :

1. Dans B1Admin, allez dans **People**, recherchez les personnes voulues (ou exécutez une liste enregistrée), puis cliquez sur **Export** pour télécharger un CSV.
2. Dans Mailchimp, utilisez **Audience → Import contacts** pour charger le CSV, en appliquant les étiquettes voulues pendant l'importation.

Faire le chargement initial avec l'importateur de Mailchimp vous garde maître de la question du consentement : n'importez que les personnes qui ont réellement accepté de recevoir vos e-mails. Importer en masse un répertoire entier comme contacts abonnés peut enfreindre les conditions de Mailchimp ainsi que la législation anti-spam (CAN-SPAM/RGPD).

## Limites et remarques

- **Synchronisation à sens unique.** Les désabonnements, les rebonds et les modifications effectués dans Mailchimp ne remontent pas vers B1. Une personne qui se désabonne dans Mailchimp peut tout de même recevoir les e-mails envoyés directement depuis B1 — considérez Mailchimp comme la source de vérité pour le consentement aux envois groupés.
- **Les personnes sans adresse e-mail sont ignorées** (consignées comme telles dans l'historique des envois), car les abonnés Mailchimp sont identifiés par leur adresse e-mail.
- **Un changement d'adresse e-mail crée un nouvel abonné.** Mailchimp identifie les personnes par leur e-mail ; modifier l'adresse d'une personne dans B1 l'ajoute donc sous la nouvelle adresse, et l'ancien abonné subsiste jusqu'à ce que vous l'archiviez dans Mailchimp.
- **Seuls les champs standard sont synchronisés** — prénom, nom, téléphone. Le statut d'appartenance, le campus et les champs personnalisés de B1 ne correspondent pas aux champs de fusion Mailchimp dans cette version ; utilisez plutôt les étiquettes de liste pour segmenter.
- **Les noms des étiquettes sont les noms des groupes et des listes.** Renommer un groupe ou une liste commence à étiqueter sous le nouveau nom ; l'ancienne étiquette reste sur les abonnés existants jusqu'à ce qu'elle soit supprimée dans Mailchimp.
- **Les limites de contacts de Mailchimp s'appliquent toujours** — une synchronisation qui fait dépasser à une audience gratuite son plafond consignera des erreurs `Member limit reached` dans l'historique des envois.

## Autres recettes (Zapier / Make)

Tout ce qui dépasse la synchronisation d'audience — étiqueter les donateurs sur `donation.created`, un sens inverse Mailchimp → B1, ou une synchronisation vers une autre plateforme d'e-mailing (Constant Contact, Brevo, etc.) — reste possible via [Zapier](../zapier) ou [Make](../make), qui se déclenchent sur les mêmes événements de webhook :

- **Étiqueter les donateurs :** B1 *New Donation* → B1 *Find Person* → Mailchimp *Add Subscriber to Tag* (`Gave-2026`)
- **Dans les deux sens :** Mailchimp *New Subscriber* → B1 *Create Person*

Si vous avez déjà configuré la synchronisation des personnes et des groupes via Zapier, désactivez ces Zaps après avoir activé le connecteur natif : faire fonctionner les deux en parallèle traite chaque événement deux fois et consomme des tâches Zapier pour rien.

## Dépannage

- **L'enregistrement échoue avec « Mailchimp rejected the API key »** — la clé a été révoquée ou mal saisie. Les clés doivent se terminer par un suffixe de centre de données comme `-us21`.
- **L'enregistrement échoue avec « audience not found »** — l'Audience ID n'existe pas sous ce compte. Copiez-le depuis **Audience → Settings → Audience name and defaults** (ce n'est pas le nom de l'audience).
- **Une personne n'est jamais apparue dans Mailchimp** — consultez l'historique des envois du webhook. « Skipped: person has no email address » signifie exactement cela ; une erreur `4xx` de Mailchimp indique le motif dans le corps de la réponse.
- **Les envois se sont arrêtés complètement** — après des échecs répétés, le webhook se désactive automatiquement. Corrigez la cause (en général une clé révoquée), réactivez-le, puis utilisez **Send Test** pour confirmer.

## Voir aussi

- [Webhooks (référence développeur)](/docs/developer/api/webhooks) — le moteur sous-jacent, le catalogue d'événements, la sémantique des envois et des relances
- [Listes enregistrées](/docs/b1-admin/people/lists) — audiences basées sur des règles qui correspondent naturellement aux étiquettes Mailchimp
- [Zapier (présentation)](../zapier) — pour les recettes allant au-delà de la synchronisation d'audience
