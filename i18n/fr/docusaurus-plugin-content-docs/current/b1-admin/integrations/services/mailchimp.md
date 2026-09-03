---
title: "Mailchimp"
---

# Mailchimp

<div class="article-intro">

Gardez une audience Mailchimp synchronisée avec B1 automatiquement : les gens y arrivent avec leur nom, e-mail et téléphone ; l'adhésion au groupe et à la liste devient des étiquettes Mailchimp ; les gens supprimés sont archivés. La synchronisation est intégrée à B1 — pas de service tiers, pas de mesure par tâche, et les modifications arrivent en temps quasi réel plutôt que sur un horaire nightly.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Un compte [Mailchimp](https://mailchimp.com) avec l'audience que vous voulez que B1 gère
- Une **clé API** Mailchimp (Mailchimp : icône de profil → **Compte et facturation → Extras → Clés API**)
- Votre **ID d'Audience** (Mailchimp : **Audience → Paramètres → Nom et valeurs par défaut de l'audience**)
- Un utilisateur B1Admin avec la permission **Éditer les Paramètres**

</div>

## Ce Qui Se Synchronise

| Changement B1 | Effet Mailchimp |
|---|---|
| Personne ajoutée ou mise à jour | Abonné ajouté/mis à jour (prénom, nom, téléphone ; les nouveaux abonnés arrivent comme `subscribed`) |
| Personne supprimée (ou GDPR-effacée) | Abonné archivé |
| Personne rejoint un groupe | Étiquette nommée d'après le groupe ajoutée |
| Personne quitte un groupe | Cette étiquette supprimée |
| Personne entre une liste enregistrée | Étiquette nommée d'après la liste ajoutée |
| Personne quitte une liste enregistrée | Cette étiquette supprimée |

**Les listes enregistrées sont généralement une meilleure source d'étiquettes.** Une [liste enregistrée](/docs/b1-admin/people/lists) B1 est une audience basée sur des règles qui se réévalue — "tous les membres au campus Nord", "les membres qui ont accepté les e-mails pastoraux". Pointez vos segments Mailchimp vers les étiquettes de liste et la synchronisation les maintient ; utilisez les étiquettes de groupe pour les envois des équipes de ministère.

La synchronisation est **unidirectionnelle** (B1 → Mailchimp) et touche uniquement les champs standard de Mailchimp, donc elle ne peut pas entrer en conflit avec les champs de fusion ou les segments que vous gérez dans Mailchimp.

## Configuration

1. Dans B1Admin, allez à **Paramètres → Développeur → Webhooks → Ajouter un Webhook**.
2. Définissez **Type de Connecteur** sur **Mailchimp**.
3. Collez votre **Clé API Mailchimp** et **ID d'Audience**. La clé est stockée cryptée et n'est jamais affichée à nouveau.
4. Les événements pertinents sont pré-sélectionnés ; décochez ceux que vous ne voulez pas (p. ex. laissez les événements de personne activés mais ignorez les étiquettes de groupe).
5. Enregistrer. B1 vérifie la clé et l'audience par rapport à Mailchimp avant d'accepter — une erreur d'orthographe échoue immédiatement avec une raison.

Utilisez **Envoyer un Test** à tout moment pour reverrifier la connexion. Chaque tentative de synchronisation est enregistrée dans l'historique de livraison du webhook avec la réponse réelle de Mailchimp, et les livraisons échouées se réessaient automatiquement avec backoff pendant environ cinq jours.

## Importation Initiale

Le connecteur synchronise les *changements* à partir du moment où il est activé ; il ne remplit pas votre répertoire existant. Pour le jour de la configuration :

1. Dans B1Admin, allez à **Personnes**, recherchez les personnes que vous voulez (ou exécutez une liste enregistrée), et cliquez sur **Exporter** pour télécharger un CSV.
2. Dans Mailchimp, utilisez **Audience → Importer les contacts** pour charger le CSV, en appliquant tous les étiquettes pendant l'importation.

Faire le chargement initial via l'importateur de Mailchimp vous garde en contrôle de la question de consentement — importez uniquement les personnes qui ont réellement accepté de recevoir vos e-mails. L'importation en masse d'un répertoire entier en tant que contacts abonnés peut violer les conditions de Mailchimp et la loi anti-spam (CAN-SPAM/RGPD).

## Limites et Notes

- **Synchronisation unidirectionnelle.** Les désinscriptions, les rejets et les éditions effectués dans Mailchimp ne reflux pas vers B1. Quelqu'un qui se désabonne dans Mailchimp peut toujours recevoir des e-mails envoyés directement de B1 — traitez Mailchimp comme la source de vérité pour le consentement à la messagerie en masse.
- **Les personnes sans adresse e-mail sont ignorées** (enregistrées comme telles dans l'historique de livraison) — les abonnés Mailchimp sont clés par e-mail.
