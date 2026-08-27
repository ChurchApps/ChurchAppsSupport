---
title: "Enregistrements payants"
---

# Enregistrements payants

<div class="article-intro">

L'enregistrement aux événements peut aller au-delà d'un simple comptage des têtes. Vous pouvez définir des types de participants à prix (comme Adulte et Enfant), proposer des modules complémentaires optionnels avec leurs propres prix et quantités, créer des codes de réduction, et collecter le paiement à l'enregistrement via le fournisseur de dons existant de votre église. Lorsqu'un événement se remplit, une liste d'attente optionnelle garde les membres intéressés en ligne et les promeut automatiquement à mesure que les places se libèrent.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Activez d'abord l'enregistrement sur l'événement — consultez [Création de calendriers](creating-calendars#enabling-event-registration)
- Pour collecter les paiements, votre église a besoin d'[une donation en ligne configurée](../donations/online-giving-setup.md) (Stripe, PayPal ou Kingdom Funding). Les événements gratuits ne nécessitent aucune configuration de dons.

</div>

## Ouverture des paramètres d'enregistrement

1. Dans B1 Admin, allez à la page **Enregistrements** et ouvrez votre événement (ou ouvrez l'événement à partir de son calendrier).
2. La carte **Paramètres d'enregistrement** affiche les éléments de base -- **Activer l'enregistrement**, **Capacité**, **L'enregistrement s'ouvre/ferme**, **Étiquettes** et **Questions d'enregistrement**.
3. Sous les éléments de base se trouvent trois accordéons : **Types de participants**, **Sélections** et **Codes de réduction**.

## Types de participants

Les types de participants vous permettent de facturer différents prix pour différentes sortes de participants -- et de limiter chacun séparément.

1. Développez l'accordéon **Types de participants** et cliquez sur **Ajouter un type**.
2. Entrez un **Nom** (par exemple, « Adulte », « Enfant », « Étudiant »).
3. Définissez un **Prix**. Utilisez 0 pour un type gratuit.
4. Définissez éventuellement une **Capacité** pour seulement ce type (par exemple, seulement 20 places pour enfants). Laissez vide pour aucune limite par type.
5. Cliquez sur **Enregistrer**.

Lors de l'enregistrement, chaque participant choisit un type ; les types épuisés sont affichés comme **Épuisé** et ne peuvent pas être sélectionnés. La feuille de présence affiche le type de chaque participant et les décomptes en cours par type.

## Sélections

Les sélections sont des modules complémentaires optionnels à prix -- T-shirts, plans de repas, améliorations d'activités.

1. Développez l'accordéon **Sélections** et cliquez sur **Ajouter une sélection**.
2. Entrez un **Nom**, une **Description** optionnelle et un **Prix** (0 s'affiche comme « Gratuit »).
3. Définissez éventuellement une **Capacité** (total disponible dans tous les enregistrements) et une **Qtés max** (le plus qu'un enregistrement peut commander).
4. Cliquez sur **Enregistrer**.

Les participants choisissent des quantités lors de l'inscription, et les totaux comptent contre la capacité afin que vous ne survendiez jamais.

## Codes de réduction

1. Développez l'accordéon **Codes de réduction** et cliquez sur **Ajouter un code de réduction**.
2. Entrez le **Code** que les participants tapent.
3. Choisissez le **Type** -- **Pourcentage** ou **Montant** -- et sa **Valeur**.
4. Limitez éventuellement le code avec une **Date de début** / **Date de fin**, un **Minimum de membres** (nombre minimum de participants sur l'enregistrement) et **Nombre maximal d'utilisations**.
5. Cliquez sur **Enregistrer**.

Chaque code affiche un compte d'**Utilisations** afin que vous puissiez voir le nombre de fois qu'il a été échangé. Les participants reçoivent un retour instantané lorsqu'ils appliquent un code -- y compris des messages clairs lorsqu'un code a expiré, n'a pas commencé ou nécessite plus de participants.

## Liste d'attente

Activez **Activer la liste d'attente** dans la carte Paramètres d'enregistrement. Lorsque l'événement atteint la capacité :

- Les nouveaux participants se voient proposer une place sur la liste d'attente au lieu d'être rejetés. Ils complètent l'inscription de la même manière (le paiement est ignoré pendant qu'ils sont sur la liste d'attente).
- Lorsque quelqu'un annule, l'enregistrement sur la liste d'attente le plus ancien est **promu automatiquement** et reçoit un e-mail qu'une place s'est libérée. S'ils doivent un solde, l'e-mail les relie pour effectuer le paiement.
- Vous pouvez promouvoir quelqu'un manuellement à tout moment avec l'action **Promouvoir** sur une ligne sur la liste d'attente -- utile après avoir augmenté la capacité de l'événement.

:::info
Les enregistrements promus restent *en attente* jusqu'à ce que tout solde soit payé ; payer (ou n'avoir rien à payer) les confirme.
:::

## La feuille de présence d'enregistrement

Ouvrez un événement à partir de la page Enregistrements pour voir chaque enregistrement. Le tableau affiche **Nom**, **Membres**, **Type** (type de chaque participant), **Payé / Total** (avec avertissement de solde lorsque de l'argent est dû), **Statut** et **Date**, plus des puces de décompte par type au-dessus du tableau.

- Cliquez sur l'icône de détails d'une ligne pour ouvrir la boîte de dialogue **Détails d'enregistrement** -- membres, sélections, payé/solde, et un tableau **Paiements** listant chaque charge (montant, méthode, date).
- **Exporter CSV** télécharge la feuille de présence complète avec des colonnes pour les membres, les types de participants, les sélections, les montants payé/total/solde, le statut et une colonne par question d'enregistrement.
- **Ajouter un participant** vous permet toujours d'enregistrer les inscriptions hors ligne manuellement.

:::info
Les remboursements ne sont pas traités dans B1. Si vous devez rembourser un enregistrement payant annulé, émettre le remboursement à partir du tableau de bord de votre fournisseur de dons (par exemple, Stripe).
:::

## Comment fonctionne le paiement

Les paiements passent par la même passerelle de dons que votre église utilise déjà pour les donations -- les détails de la carte vont directement au fournisseur et ne touchent jamais les serveurs de B1. Les prix sont toujours calculés sur le serveur à partir de vos types, sélections et codes de réduction configurés, donc un participant ne peut pas falsifier le total. Les membres connectés peuvent payer avec une carte enregistrée ; les invités entrent une carte à la caisse.

## Articles connexes

- [Création de calendriers](creating-calendars#enabling-event-registration) — activez l'enregistrement et les paramètres de base
- [Configuration de la donation en ligne](../donations/online-giving-setup.md) — configurez la passerelle de paiement utilisée à la caisse
- [Enregistrement aux événements](../../b1-church/events/registering) -- ce que les membres voient lorsqu'ils s'inscrivent
- [Mes enregistrements](../../b1-church/events/my-registrations) -- comment les membres paient les soldes et modifient les enregistrements
