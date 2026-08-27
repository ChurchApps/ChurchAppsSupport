---
title: "Mailchimp"
---

# Mailchimp

<div class="article-intro">

Gardez une audience Mailchimp en sync avec B1 automatiquement : les personnes arrivent avec leur nom, e-mail et téléphone ; l'appartenance au groupe et à la liste devient des balises Mailchimp ; les personnes supprimées sont archivées. La synchronisation est intégrée à B1 -- aucun service tiers, aucune facturation par tâche, et les changements arrivent quasi en temps réel plutôt que selon un horaire nocturne.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Un compte [Mailchimp](https://mailchimp.com) avec l'audience que vous voulez que B1 gère
- Une **clé API** Mailchimp (Mailchimp : icône de profil → **Compte et facturation → Extras → Clés API**)
- Votre **ID d'audience** (Mailchimp : **Audience → Paramètres → Nom et paramètres par défaut de l'audience**)
- Un utilisateur B1Admin avec la permission **Modifier les paramètres**

</div>

## Quoi synchroniser

| Changement B1 | Effet Mailchimp |
|---|---|
| Personne ajoutée ou mise à jour | Abonné ajouté/mis à jour (prénom, nom, téléphone ; les nouveaux abonnés arrivent comme \subscribed\) |
| Personne supprimée (ou RGPD effacée) | Abonné archivé |
| La personne rejoint un groupe | Balise nommée d'après le groupe ajoutée |
| La personne quitte un groupe | Cette balise supprimée |
| La personne entre dans une liste enregistrée | Balise nommée d'après la liste ajoutée |
| La personne quitte une liste enregistrée | Cette balise supprimée |

**Les listes enregistrées sont généralement la meilleure source de balises.** Une [liste enregistrée](/docs/b1-admin/people/lists) B1 est une audience basée sur des règles qui se réévalue -- « tout le monde au campus Nord », « membres qui ont adhéré aux e-mails pastoraux ». Pointez vos segments Mailchimp vers les balises de liste et la synchronisation les maintient ; utilisez les balises de groupe pour les envois d'équipe de ministère.

La synchronisation est **unidirectionnelle** (B1 → Mailchimp) et touche uniquement les champs standard de Mailchimp, donc elle ne peut pas entrer en conflit avec les champs de fusion ou les segments que vous gérez dans Mailchimp.

## Configuration

1. Dans B1Admin allez à **Paramètres → Développeur → Webhooks → Ajouter Webhook**.
2. Définissez **Type de connecteur** sur **Mailchimp**.
3. Collez votre **Clé API Mailchimp** et votre **ID d'audience**. La clé est stockée chiffrée et n'est jamais affichée à nouveau.
4. Les événements pertinents sont pré-sélectionnés ; décochez ceux que vous ne voulez pas (par exemple, laissez les événements de personne mais ignorez les balises de groupe).
5. Enregistrez. B1 vérifie la clé et l'audience par rapport à Mailchimp avant d'accepter -- une faute de frappe échoue immédiatement avec une raison.

Utilisez **Envoyer un test** à tout moment pour reverifier la connexion. Chaque tentative de synchronisation est enregistrée dans l'historique de livraison du webhook avec la réponse réelle de Mailchimp, et les livraisons échouées se retrouvent automatiquement avec interruption pendant environ cinq jours.

## Import initial

Le connecteur synchronise *les changements* à partir du moment où il est activé ; il ne remplit pas en arrière votre annuaire existant. Pour le jour de la configuration :

1. Dans B1Admin allez à **Personnes**, recherchez les personnes que vous voulez (ou exécutez une liste enregistrée), et cliquez sur **Exporter** pour télécharger un CSV.
2. Dans Mailchimp utilisez **Audience → Importer des contacts** pour charger le CSV, en appliquant des balises lors de l'import.

Le chargement initial via l'importateur de Mailchimp vous garde en contrôle de la question du consentement -- n'importez que les personnes qui ont réellement accepté de recevoir vos e-mails. L'import en masse de tout un annuaire comme contacts abonnés peut violer les conditions de Mailchimp et la loi anti-spam (CAN-SPAM/RGPD).

## Limites et notes

- **Synchronisation unidirectionnelle.** Les désabonnements, bounces et modifications effectuées dans Mailchimp ne reviennent pas à B1. Quelqu'un qui se désabonne dans Mailchimp peut toujours recevoir des e-mails envoyés directement de B1 -- traitez Mailchimp comme la source de vérité pour le consentement à la diffusion en masse.
- **Les personnes sans adresse e-mail sont ignorées** (enregistrées comme telles dans l'historique de livraison) -- les abonnés Mailchimp sont identifiés par e-mail.
- **Les changements d'adresse e-mail créent un nouvel abonné.** Mailchimp identifie les personnes par e-mail, donc modifier l'e-mail de quelqu'un dans B1 les ajoute sous la nouvelle adresse ; l'ancien abonné reste jusqu'à ce que vous l'archiviiez dans Mailchimp.
- **Seuls les champs standard se synchronisent** -- prénom, nom, téléphone. Le statut d'adhésion, le campus et les champs personnalisés B1 ne s'associent pas aux champs de fusion Mailchimp dans cette version ; utilisez des balises de liste pour segmenter à la place.
- **Les noms de balise sont les noms de groupe/liste.** Renommer un groupe ou une liste commence à baliser sous le nouveau nom ; l'ancienne balise reste sur les abonnés existants jusqu'à suppression dans Mailchimp.
- **Les limites de contact de Mailchimp s'appliquent toujours** -- une synchronisation qui pousse une audience de niveau gratuit au-delà de sa limite enregistrera les erreurs \Member limit reached\ dans l'historique de livraison.

## Autres recettes (Zapier / Make)

Tout au-delà de la synchronisation d'audience -- baliser les donateurs sur \donation.created\, une direction inverse Mailchimp → B1, ou synchroniser vers une plate-forme d'e-mail différente (Constant Contact, Brevo, etc.) -- est toujours disponible via [Zapier](../zapier) ou [Make](../make), qui se déclenchent sur les mêmes événements webhook :

- **Baliser les donateurs :** B1 *Nouvelle donation* → B1 *Trouver la personne* → Mailchimp *Ajouter un abonné à une balise* (\Gave-2026\)
- **Bidirectionnel :** Mailchimp *Nouvel abonné* → B1 *Créer une personne*

Si vous avez précédemment câblé la synchronisation personne/groupe via Zapier, désactivez ces Zaps après activation du connecteur natif -- l'exécution des deux double-traite chaque événement et brûle les tâches Zapier pour rien.

## Dépannage

- **L'enregistrement échoue avec « Mailchimp a rejeté la clé API »** -- la clé a été révoquée ou mal tapée. Les clés doivent se terminer par un suffixe de centre de données comme \-us21\.
- **L'enregistrement échoue avec « audience non trouvée »** -- l'ID d'audience n'existe pas sous ce compte. Copiez-le depuis **Audience → Paramètres → Nom et paramètres par défaut de l'audience** (ce n'est pas le nom de l'audience).
- **Une personne n'a jamais apparuque dans Mailchimp** -- vérifiez l'historique de livraison du webhook. « Ignoré : la personne n'a pas d'adresse e-mail » signifie exactement cela ; un \4xx\ de Mailchimp montre la raison dans le corps de la réponse.
- **Les livraisons se sont complètement arrêtées** -- après des livraisons épuisées répétées, le webhook se désactive automatiquement. Corriger la cause (généralement une clé révoquée), le réactiver et utiliser **Envoyer un test** pour confirmer.

## Voir aussi

- [Webhooks (référence développeur)](/docs/developer/api/webhooks) -- le moteur dessous, catalogue d'événements, sémantique de livraison/retry
- [Listes enregistrées](/docs/b1-admin/people/lists) -- audiences basées sur des règles qui correspondent naturellement aux balises Mailchimp
- [Zapier (aperçu)](../zapier) -- pour les recettes au-delà de la synchronisation d'audience
