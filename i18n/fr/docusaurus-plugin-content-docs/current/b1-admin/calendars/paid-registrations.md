---
title: "Inscriptions payantes"
description: "Configurez les inscriptions payantes aux événements dans B1 Admin : types de participants avec prix, options supplémentaires, codes de réduction, listes d'attente et encaissement des paiements via votre fournisseur de dons."
---

# Inscriptions payantes

<div class="article-intro">

L'inscription à un événement peut aller bien au-delà d'un simple décompte. Vous pouvez définir des types de participants avec un prix (par exemple Adulte et Enfant), proposer des options supplémentaires facultatives avec leurs propres prix et quantités, créer des codes de réduction et encaisser le paiement lors de l'inscription par l'intermédiaire du fournisseur de dons existant de votre église. Lorsqu'un événement se remplit, une liste d'attente facultative conserve l'ordre d'arrivée des membres intéressés et les promeut automatiquement à mesure que des places se libèrent.

</div>

## Vidéo de formation {#training-video}

<YouTube id="eGSZv24Dlzk" title="Inscriptions aux événements et événements payants dans B1" next="Lancer votre site web d'église dans B1" nextUrl="/docs/b1-admin/guides/launch-website" />

<div class="prereqs">
<h4>Avant de commencer</h4>

- Activez d'abord l'inscription sur l'événement -- voir [Création de calendriers](./creating-calendars.md#enabling-event-registration)
- Pour encaisser des paiements en ligne, votre église doit avoir [configuré les dons en ligne](../donations/online-giving-setup.md) (Stripe, PayPal ou Kingdom Funding). Les événements gratuits ne nécessitent aucune configuration de dons. Sans dons en ligne, les inscriptions payantes fonctionnent toujours, mais les personnes paient directement l'église -- voir [Églises sans dons en ligne](#churches-without-online-giving).

</div>

## Ouvrir les paramètres d'inscription {#opening-registration-settings}

1. Dans B1 Admin, ouvrez le [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (la barre de recherche en haut à gauche), choisissez **Calendriers > Inscriptions**, puis cliquez sur votre événement (ou cliquez sur l'événement dans son calendrier et choisissez **Gérer les inscriptions**).
2. Cliquez sur **Modifier les paramètres**. La carte **Paramètres d'inscription** affiche les éléments de base -- **Activer l'inscription**, **Capacité**, **Activer la liste d'attente**, **Ouverture / Fermeture des inscriptions**, **Étiquettes** et **Questions d'inscription** -- avec un bouton **Enregistrer les paramètres**.
3. Sous ces éléments de base, trois accordéons sont disponibles : **Types de participants**, **Options** et **Codes de réduction**. Chacun possède son propre bouton **Enregistrer**, distinct de **Enregistrer les paramètres** ; B1 vous avertit si vous tentez de quitter avec des modifications non enregistrées dans ces sections. Cliquez sur **Retour aux inscriptions** pour revenir à la liste des inscrits.

## Types de participants {#attendee-types}

Les types de participants vous permettent de facturer des prix différents selon les catégories de participants -- et de plafonner chacune séparément.

1. Développez l'accordéon **Types de participants** et cliquez sur **Ajouter un type**.
2. Saisissez un **Nom** (par exemple « Adulte », « Enfant », « Étudiant »).
3. Définissez un **Prix**. Utilisez 0 pour un type gratuit.
4. Vous pouvez éventuellement définir une **Capacité** pour ce seul type (par exemple seulement 20 places Enfant). Laissez vide pour aucune limite par type.
5. Vous pouvez éventuellement définir l'**Ordre** pour contrôler l'ordre d'affichage des types.
6. Cliquez sur **Enregistrer**.

Pour supprimer un type enregistré, cliquez sur son icône de suppression et confirmez ; il est retiré immédiatement. Les options et les codes de réduction se suppriment de la même façon.

Pendant l'inscription, chaque participant choisit un type ; les types épuisés sont affichés comme **Épuisé** et ne peuvent pas être sélectionnés. La liste des inscrits affiche le type de chaque participant et les totaux cumulés par type.

## Options {#selections}

Les options sont des suppléments payants facultatifs -- t-shirts, forfaits repas, améliorations d'activités.

1. Développez l'accordéon **Options** et cliquez sur **Ajouter une option**.
2. Saisissez un **Nom**, une **Description** facultative et un **Prix** (0 s'affiche comme « Gratuit »).
3. Vous pouvez éventuellement définir une **Capacité** (total disponible pour l'ensemble des inscriptions) et une **Qté max** (le nombre maximal qu'une même inscription peut commander).
4. Cliquez sur **Enregistrer**.

Les inscrits choisissent les quantités lors de l'inscription, et les totaux sont décomptés de la capacité, de sorte que vous ne vendez jamais plus que ce que vous avez.

## Codes de réduction {#discount-codes}

1. Développez l'accordéon **Codes de réduction** et cliquez sur **Ajouter un code de réduction**.
2. Saisissez le **Code** que les inscrits devront taper.
3. Choisissez le **Type** -- **Pourcentage** ou **Montant** -- et sa **Valeur**.
4. Vous pouvez éventuellement limiter le code avec une **Date de début** / **Date de fin**, un **Nombre min. de membres** (nombre minimal de participants sur l'inscription) et un **Nombre max. d'utilisations**.
5. Cliquez sur **Enregistrer**.

Chaque code affiche un compteur **Utilisations** pour que vous voyiez combien de fois il a été utilisé. Les inscrits reçoivent une réponse immédiate lorsqu'ils appliquent un code -- y compris des messages clairs lorsqu'un code est expiré, n'a pas encore commencé ou exige davantage de participants.

## Liste d'attente {#waitlist}

Activez **Activer la liste d'attente** dans la carte Paramètres d'inscription. Lorsque l'événement atteint sa capacité :

- Les nouveaux inscrits se voient proposer une place sur la liste d'attente au lieu d'être refusés. Ils complètent la même inscription (le paiement est ignoré pendant l'attente).
- Lorsqu'une personne annule, l'inscription en liste d'attente la plus ancienne est **promue automatiquement** et reçoit un courriel indiquant qu'une place s'est libérée. Si elle doit un solde, le courriel la renvoie vers [Mes inscriptions](../../b1-church/events/my-registrations.md) sur le site B1 de votre église, où elle peut effectuer le paiement.
- Vous pouvez promouvoir quelqu'un manuellement à tout moment avec l'action **Promouvoir** sur une ligne en liste d'attente -- utile après avoir augmenté la capacité de l'événement.

:::info
Les inscriptions promues restent *en attente* jusqu'au paiement de tout solde ; le paiement (ou l'absence de solde à régler) les confirme.
:::

## La liste des inscrits {#the-registration-roster}

Ouvrez un événement depuis la page Inscriptions pour voir toutes les inscriptions. Le titre de la carte indique combien d'inscriptions occupent une place par rapport à la capacité (par exemple *Inscriptions (18 / 20)*). Seules les inscriptions en attente et confirmées comptent ; lorsque des personnes sont en liste d'attente, le titre ajoute ce nombre (par exemple *· 3 en liste d'attente*), et le même nombre apparaît sous la barre de capacité. Le grand nombre au-dessus de la barre de capacité compte les **personnes** plutôt que les inscriptions -- toutes les personnes figurant sur chaque inscription en attente ou confirmée -- de sorte qu'une famille de quatre personnes compte pour quatre. La limite de capacité elle-même compte toujours les inscriptions. Le tableau affiche **Nom**, **Membres**, **Type** (le type de chaque participant), **Payé / Total** (avec un avertissement de solde lorsque de l'argent est encore dû), **Statut** et **Date**, ainsi que des pastilles de totaux par type au-dessus du tableau.

- Cliquez sur l'icône de détails d'une ligne pour ouvrir la boîte de dialogue **Détails de l'inscription** -- membres, options, payé / solde, et un tableau **Paiements** listant chaque transaction (montant, mode, date).
- **Exporter en CSV** télécharge la liste complète avec des colonnes pour les membres, les types de participants, les options, le payé / total / solde, le statut et une colonne par question d'inscription.
- **Ajouter un participant** enregistre une inscription hors ligne ou par téléphone pour n'importe quelle personne de votre église. Choisissez la personne et, pour un événement payant, son type de participant. Sa carte n'est pas débitée : une inscription payante est enregistrée comme **en attente** avec le montant total comme solde dû. Si votre église dispose de dons en ligne, la personne peut le payer depuis [Mes inscriptions](../../b1-church/events/my-registrations.md) ; sinon, encaissez-le en personne. Vous devez disposer de l'autorisation Modifier les inscriptions pour ajouter des participants.

:::info
Les remboursements ne sont pas traités dans B1. Si vous devez rembourser une inscription payante annulée, effectuez le remboursement depuis le tableau de bord de votre fournisseur de dons (par exemple Stripe).
:::

## Fonctionnement des paiements {#how-payment-works}

Les paiements passent par la même passerelle de dons que votre église utilise déjà pour les dons -- les données de carte vont directement au fournisseur et ne transitent jamais par les serveurs de B1. Les prix sont toujours calculés sur le serveur à partir de vos types, options et codes de réduction configurés, de sorte qu'un inscrit ne peut pas altérer le total. Les membres connectés peuvent payer avec une carte enregistrée. Les invités saisissent une carte au moment du paiement et doivent cocher la case **Je ne suis pas un robot** avant de payer.

### Églises sans dons en ligne {#churches-without-online-giving}

Si votre église n'a pas de fournisseur de dons configuré, les événements payants peuvent tout de même accepter des inscriptions. L'étape de paiement indique aux inscrits que le paiement en ligne n'est pas disponible et qu'ils peuvent payer directement l'église, et un bouton **S'inscrire et payer plus tard** enregistre l'inscription. Elle est enregistrée comme **en attente** avec le montant total comme solde dû, et elle apparaît dans la liste des inscrits avec un avertissement de solde. Encaissez l'argent de la façon habituelle de votre église.

:::info
B1 n'a aucun moyen de marquer un paiement hors ligne comme reçu. Le solde dû reste affiché dans la liste des inscrits et sur la carte [Mes inscriptions](../../b1-church/events/my-registrations.md) de l'inscrit après que vous l'avez encaissé ; conservez donc votre propre registre des personnes qui ont payé.
:::

## Articles connexes {#related-articles}

- [Création de calendriers](./creating-calendars.md#enabling-event-registration) — activer l'inscription et les paramètres de base
- [Configuration des dons en ligne](../donations/online-giving-setup.md) — configurer la passerelle de paiement utilisée au moment de la commande
- [S'inscrire à des événements](../../b1-church/events/registering.md) — ce que voient les membres lorsqu'ils s'inscrivent
- [Mes inscriptions](../../b1-church/events/my-registrations.md) — comment les membres règlent leurs soldes et modifient leurs inscriptions
