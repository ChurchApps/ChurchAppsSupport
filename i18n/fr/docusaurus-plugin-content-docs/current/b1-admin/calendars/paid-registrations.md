---
title: "Inscriptions payantes"
description: "Configurez les inscriptions payantes aux événements dans B1 Admin : types de participants tarifés, options, codes de réduction, listes d'attente et encaissement via votre prestataire de dons."
---

# Inscriptions payantes

<div class="article-intro">

L'inscription à un événement peut aller au-delà d'un simple décompte. Vous pouvez définir des types de participants avec prix (comme Adulte et Enfant), proposer des suppléments facultatifs avec leurs propres prix et quantités, créer des codes de réduction et encaisser le paiement lors de l'inscription via le fournisseur de dons existant de votre église. Lorsqu'un événement se remplit, une liste d'attente facultative garde les membres intéressés en file et les promeut automatiquement au fur et à mesure que des places se libèrent.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Activez d'abord l'inscription sur l'événement -- voir [Créer des calendriers](./creating-calendars.md#enabling-event-registration)
- Pour encaisser les paiements en ligne, votre église doit avoir [configuré les dons en ligne](../donations/online-giving-setup.md) (Stripe, PayPal ou Kingdom Funding). Les événements gratuits n'exigent aucune configuration de dons. Sans dons en ligne, les inscriptions payantes fonctionnent tout de même, mais les personnes paient directement l'église -- voir [Églises sans dons en ligne](#churches-without-online-giving).

</div>

## Ouvrir les paramètres d'inscription

1. Dans B1 Admin, ouvrez le [menu de navigation rapide](../introduction.md#getting-around-with-the-jump-menu) (la barre de recherche en haut à gauche), choisissez **Calendriers > Inscriptions**, puis ouvrez votre événement (ou ouvrez-le depuis son calendrier).
2. La carte **Paramètres d'inscription** affiche les éléments de base -- **Activer l'inscription**, **Capacité**, **Ouverture/Fermeture des inscriptions**, **Étiquettes** et **Questions d'inscription**.
3. Sous les éléments de base se trouvent trois sections dépliables : **Types de participants**, **Options** et **Codes de réduction**.

## Types de participants

Les types de participants vous permettent de facturer des prix différents selon les catégories de participants -- et de plafonner chacune séparément.

1. Développez la section **Types de participants** et cliquez sur **Ajouter un type**.
2. Saisissez un **nom** (par exemple « Adulte », « Enfant », « Étudiant »).
3. Définissez un **prix**. Utilisez 0 pour un type gratuit.
4. Vous pouvez facultativement définir une **capacité** pour ce seul type (par exemple seulement 20 places Enfant). Laissez vide pour aucune limite par type.
5. Cliquez sur **Enregistrer**.

Lors de l'inscription, chaque participant choisit un type ; les types épuisés sont affichés comme **Épuisé** et ne peuvent pas être sélectionnés. La liste des inscrits affiche le type de chaque participant et les compteurs cumulés par type.

## Options

Les options sont des suppléments payants facultatifs -- t-shirts, forfaits repas, améliorations d'activités.

1. Développez la section **Options** et cliquez sur **Ajouter une option**.
2. Saisissez un **nom**, une **description** facultative et un **prix** (0 s'affiche comme « Gratuit »).
3. Vous pouvez facultativement définir une **capacité** (total disponible pour toutes les inscriptions) et une **Qté max** (le nombre maximal qu'une inscription peut commander).
4. Cliquez sur **Enregistrer**.

Les inscrits choisissent les quantités lors de l'inscription, et les totaux sont décomptés de la capacité afin que vous ne vendiez jamais plus que ce qui est disponible.

## Codes de réduction

1. Développez la section **Codes de réduction** et cliquez sur **Ajouter un code de réduction**.
2. Saisissez le **code** que les inscrits devront taper.
3. Choisissez le **type** -- **Pourcentage** ou **Montant** -- et sa **valeur**.
4. Vous pouvez facultativement limiter le code avec une **date de début** / **date de fin**, un **nombre minimum de membres** (nombre minimal de participants sur l'inscription) et un **nombre maximal d'utilisations**.
5. Cliquez sur **Enregistrer**.

Chaque code affiche un compteur **Utilisations** pour que vous puissiez voir à quelle fréquence il a été utilisé. Les inscrits reçoivent une réponse immédiate lorsqu'ils appliquent un code, y compris des messages clairs lorsqu'un code est expiré, n'a pas encore commencé ou exige davantage de participants.

## Liste d'attente {#waitlist}

Activez **Activer la liste d'attente** dans la carte Paramètres d'inscription. Lorsque l'événement atteint sa capacité :

- Les nouveaux inscrits se voient proposer une place sur la liste d'attente au lieu d'être refusés. Ils complètent la même inscription (le paiement est ignoré pendant qu'ils sont en attente).
- Lorsqu'une personne annule, l'inscription la plus ancienne en liste d'attente est **promue automatiquement** et reçoit un courriel indiquant qu'une place s'est libérée. Si elle doit un solde, le courriel la dirige vers [Mes inscriptions](../../b1-church/events/my-registrations.md) sur le site B1 de votre église, où elle peut effectuer le paiement.
- Vous pouvez promouvoir quelqu'un manuellement à tout moment avec l'action **Promouvoir** sur une ligne en liste d'attente -- utile après avoir augmenté la capacité de l'événement.

:::info
Les inscriptions promues restent *en attente* jusqu'au paiement de tout solde ; le paiement (ou l'absence de solde à payer) les confirme.
:::

## La liste des inscrits {#the-registration-roster}

Ouvrez un événement depuis la page Inscriptions pour voir toutes les inscriptions. Le titre de la carte indique combien d'inscriptions occupent une place par rapport à la capacité (par exemple *Inscriptions (18 / 20)*). Seules les inscriptions en attente et confirmées sont comptées ; lorsque des personnes sont en liste d'attente, le titre ajoute leur nombre (par exemple *· 3 en liste d'attente*), et ce même nombre apparaît sous la barre de capacité. Le tableau affiche **Nom**, **Membres**, **Type** (le type de chaque participant), **Payé / Total** (avec un avertissement de solde lorsqu'un montant reste dû), **Statut** et **Date**, ainsi que des pastilles de compteur par type au-dessus du tableau.

- Cliquez sur l'icône de détails d'une ligne pour ouvrir la boîte de dialogue **Détails de l'inscription** -- membres, options, payé/solde, et un tableau **Paiements** listant chaque transaction (montant, mode, date).
- **Exporter en CSV** télécharge la liste complète avec des colonnes pour les membres, les types de participants, les options, le total payé/solde, le statut et une colonne par question d'inscription.
- **Ajouter un participant** enregistre une inscription hors ligne ou par téléphone pour toute personne de votre église. Choisissez la personne et, pour un événement payant, son type de participant. Sa carte n'est pas débitée : une inscription payante est enregistrée comme **en attente** avec le montant total comme solde dû. Si votre église dispose de dons en ligne, la personne peut payer depuis [Mes inscriptions](../../b1-church/events/my-registrations.md) ; sinon, encaissez-le en personne. Vous devez avoir l'autorisation Modifier les inscriptions pour ajouter des participants.

:::info
Les remboursements ne sont pas traités dans B1. Si vous devez rembourser une inscription payante annulée, émettez le remboursement depuis le tableau de bord de votre fournisseur de dons (par exemple Stripe).
:::

## Fonctionnement des paiements

Les paiements transitent par la même passerelle de dons que votre église utilise déjà pour les dons -- les coordonnées de carte vont directement au fournisseur et ne passent jamais par les serveurs de B1. Les prix sont toujours calculés sur le serveur à partir de vos types, options et codes de réduction configurés, de sorte qu'un inscrit ne peut pas modifier le total. Les membres connectés peuvent payer avec une carte enregistrée. Les visiteurs saisissent une carte au moment du paiement et doivent cocher la case **Je ne suis pas un robot** avant de payer.

### Églises sans dons en ligne {#churches-without-online-giving}

Si votre église n'a pas de fournisseur de dons configuré, les événements payants peuvent tout de même accepter des inscriptions. L'étape de paiement indique aux inscrits que le paiement en ligne n'est pas disponible et qu'ils peuvent payer directement l'église, et un bouton **Inscrire et payer plus tard** enregistre l'inscription. Elle est enregistrée comme **en attente** avec le montant total comme solde dû, et apparaît dans la liste avec un avertissement de solde. Encaissez l'argent de la façon habituelle de votre église.

:::info
B1 n'a aucun moyen de marquer un paiement hors ligne comme reçu. Le solde dû reste dans la liste et sur la carte [Mes inscriptions](../../b1-church/events/my-registrations.md) de l'inscrit après que vous l'avez encaissé ; conservez donc votre propre registre de qui a payé.
:::

## Articles connexes

- [Créer des calendriers](./creating-calendars.md#enabling-event-registration) — activer l'inscription et les paramètres de base
- [Dons en ligne](../donations/online-giving-setup.md) — configurer la passerelle de paiement utilisée lors du paiement
- [S'inscrire aux événements](../../b1-church/events/registering.md) — ce que voient les membres lorsqu'ils s'inscrivent
- [Mes inscriptions](../../b1-church/events/my-registrations.md) — comment les membres paient leurs soldes et modifient leurs inscriptions
