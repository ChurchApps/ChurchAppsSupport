---
title: "Mailchimp"
---

# Mailchimp

<div class="article-intro">

Gardez une audience Mailchimp synchronisée avec B1 automatiquement : les personnes arrivent avec leur nom, e-mail et téléphone ; l'appartenance à un groupe et à une liste devient des balises Mailchimp ; les personnes supprimées sont archivées. La synchronisation est intégrée à B1 — aucun service tiers, pas de facturation par tâche, et les modifications arrivent en temps quasi réel plutôt que sur un calendrier nocturne.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Un compte [Mailchimp](https://mailchimp.com) avec l'audience que vous souhaitez que B1 gère
- Une **clé API Mailchimp** (Mailchimp : icône de profil → **Compte et facturation → Extras → Clés API**)
- Votre **ID d'audience** (Mailchimp : **Audience → Paramètres → Nom d'audience et paramètres par défaut**)
- Un utilisateur B1Admin avec la permission **Modifier les paramètres**

</div>

## Ce qui se synchronise

| Modification B1 | Effet Mailchimp |
|---|---|
| Personne ajoutée ou mise à jour | Abonné ajouté/mis à jour (prénom, nom, téléphone ; les nouveaux abonnés arrivent comme `subscribed`) |
| Personne supprimée (ou effacée RGPD) | Abonné archivé |
| Une personne rejoint un groupe | Balise nommée d'après le groupe ajoutée |
| Une personne quitte un groupe | Cette balise supprimée |
| Une personne entre dans une liste sauvegardée | Balise nommée d'après la liste ajoutée |
| Une personne quitte une liste sauvegardée | Cette balise supprimée |

**Les listes sauvegardées sont généralement une meilleure source de balise.** Une [liste sauvegardée](/docs/b1-admin/people/lists) B1 est une audience basée sur des règles qui se réévalue elle-même — « tout le monde au campus Nord », « les membres qui ont opté pour les e-mails pastoraux ». Pointez vos segments Mailchimp sur les balises de liste et la synchronisation les maintient ; utilisez les balises de groupe pour les envois de l'équipe du ministère.

La synchronisation est **unidirectionnelle** (B1 → Mailchimp) et touche uniquement les champs standard de Mailchimp, elle ne peut donc pas entrer en conflit avec les champs de fusion ou les segments que vous gérez dans Mailchimp.

## Configuration

1. Dans B1Admin allez à **Paramètres → Développeur → Webhooks → Ajouter Webhook**.
2. Définissez **Type de connecteur** sur **Mailchimp**.
3. Collez votre **Clé API Mailchimp** et **ID d'audience**. La clé est stockée chiffrée et jamais affichée à nouveau.
4. Les événements pertinents sont pré-sélectionnés ; décochez ceux que vous ne voulez pas (par ex. laissez les événements de suppression de personne mais ignorez les balises de groupe).
5. Enregistrez. B1 vérifie la clé et l'audience contre Mailchimp avant d'accepter — une erreur de frappe échoue immédiatement avec une raison.

Utilisez **Envoyer un test** à tout moment pour re-vérifier la connexion. Chaque tentative de synchronisation est enregistrée dans l'historique de livraison du webhook avec la réponse réelle de Mailchimp, et les livraisons échouées se réessaient automatiquement avec un backoff pendant environ cinq jours.

## Import initial

Le connecteur synchronise les *modifications* à partir du moment où il est activé ; il ne remplit pas votre répertoire existant. Pour le jour de la configuration :

1. Dans B1Admin allez à **Personnes**, recherchez les personnes que vous voulez (ou exécutez une liste sauvegardée), et cliquez sur **Exporter** pour télécharger un CSV.
2. Dans Mailchimp utilisez **Audience → Importer des contacts** pour charger le CSV, en appliquant les balises pendant l'import.

Faire le chargement initial via l'importeur de Mailchimp vous garde en contrôle de la question de consentement — importez uniquement les personnes qui ont réellement accepté de recevoir vos e-mails. L'import en masse d'un répertoire entier comme abonnés peut violer les conditions de Mailchimp et la loi anti-spam (CAN-SPAM/RGPD).

## Limites et notes

- **Synchronisation unidirectionnelle.** Les désabonnements, les rebonds et les modifications faites dans Mailchimp ne reviennent pas à B1. Quelqu'un qui se désabonne dans Mailchimp peut toujours recevoir un e-mail envoyé directement depuis B1 — traitez Mailchimp comme la source de vérité pour le consentement aux envois groupés.
- **Les personnes sans adresse e-mail sont ignorées** (enregistrées comme telles dans l'historique de livraison) — les abonnés Mailchimp sont identifiés par e-mail.
- **Les modifications d'adresse e-mail créent un nouvel abonné.** Mailchimp identifie les personnes par e-mail, donc changer l'e-mail de quelqu'un dans B1 les ajoute sous la nouvelle adresse ; l'ancien abonné reste jusqu'à ce que vous l'archivez dans Mailchimp.
- **Seuls les champs standard se synchronisent** — prénom, nom, téléphone. L'état d'adhésion, le campus et les champs B1 personnalisés ne mappent pas aux champs de fusion Mailchimp dans cette version ; utilisez plutôt les balises de liste pour segmenter.
- **Les noms de balise sont les noms de groupe/liste.** Renommer un groupe ou une liste démarre le balisage sous le nouveau nom ; l'ancienne balise reste sur les abonnés existants jusqu'à ce qu'elle soit supprimée dans Mailchimp.
- **Les limites de contact de Mailchimp s'appliquent toujours** — une synchronisation qui pousse une audience du niveau gratuit au-delà de son plafond enregistrera des erreurs `Member limit reached` dans l'historique de livraison.

## Autres recettes (Zapier / Make)

Tout ce qui dépasse la synchronisation d'audience — balisage des donateurs sur `donation.created`, une direction inverse Mailchimp → B1, ou synchronisation vers une plateforme d'e-mail différente (Constant Contact, Brevo, etc.) — est toujours disponible via [Zapier](../zapier) ou [Make](../make), qui déclenchent sur les mêmes événements webhook :

- **Baliser les donateurs :** B1 *Nouvelle donation* → B1 *Trouver une personne* → Mailchimp *Ajouter un abonné à une balise* (`Gave-2026`)
- **Bidirectionnel :** Mailchimp *Nouvel abonné* → B1 *Créer une personne*

Si vous aviez auparavant connecté la synchronisation personne/groupe via Zapier, désactivez ces Zaps après l'activation du connecteur natif — exécuter les deux traite deux fois chaque événement et gaspille les tâches Zapier pour rien.

## Dépannage

- **La sauvegarde échoue avec "Mailchimp a rejeté la clé API"** — la clé a été révoquée ou mal dactylographiée. Les clés doivent se terminer par un suffixe de centre de données comme `-us21`.
- **La sauvegarde échoue avec "audience not found"** — l'ID d'audience n'existe pas sous ce compte. Copiez-le depuis **Audience → Paramètres → Nom d'audience et paramètres par défaut** (ce n'est pas le nom de l'audience).
- **Une personne n'a jamais apparue dans Mailchimp** — vérifiez l'historique de livraison du webhook. "Skipped: person has no email address" signifie exactement cela ; un `4xx` de Mailchimp affiche la raison dans le corps de la réponse.
- **Les livraisons se sont arrêtées complètement** — après les livraisons épuisées répétées, le webhook se désactive automatiquement. Corrigez la cause (généralement une clé révoquée), réactivez-la, et utilisez **Envoyer un test** pour confirmer.

## Voir aussi

- [Webhooks (référence développeur)](/docs/developer/api/webhooks) — le moteur dessous, le catalogue d'événements, la livraison et les sémantiques de retry
- [Listes sauvegardées](/docs/b1-admin/people/lists) — les audiences basées sur les règles qui mappent naturellement sur les balises Mailchimp
- [Zapier (aperçu)](../zapier) — pour les recettes au-delà de la synchronisation d'audience
