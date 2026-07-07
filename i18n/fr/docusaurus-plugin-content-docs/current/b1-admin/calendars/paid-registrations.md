---
title: "Inscriptions payantes"
---

# Inscriptions payantes

<div class="article-intro">

L'inscription aux événements peut aller au-delà d'un simple compte de têtes. Vous pouvez définir des types de participants tarifés (comme Adulte et Enfant), offrir des suppléments optionnels avec leurs propres prix et quantités, créer des codes de réduction et collecter le paiement lors de l'inscription via le fournisseur de donation existant de votre église. Quand un événement se remplit, une liste d'attente optionnelle garde les membres intéressés en file et les promeut automatiquement à mesure que les places s'ouvrent.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Activer l'inscription sur l'événement d'abord -- voir [Créer des calendriers](creating-calendars#enabling-event-registration)
- Pour collecter les paiements, votre église a besoin de [donation en ligne configurée](../donations/online-giving-setup.md) (Stripe, PayPal ou Kingdom Funding). Les événements gratuits n'ont besoin d'aucune configuration de donation.

</div>

## Ouverture des paramètres d'inscription

1. Dans B1 Admin, accédez à la page **Inscriptions** et ouvrir votre événement (ou ouvrir l'événement de son calendrier).
2. La carte **Paramètres d'inscription** affiche les bases -- **Activer l'inscription**, **Capacité**, **L'inscription s'ouvre/se ferme**, **Balises** et **Questions d'inscription**.
3. En dessous des bases se trouvent trois accordéons : **Types de participants**, **Sélections** et **Codes de réduction**.

## Types de participants

Les types de participants vous permettent de facturer différents prix pour différents types de participants -- et de plafonner chacun séparément.

1. Développer l'accordéon **Types de participants** et cliquer **Ajouter un type**.
2. Entrer un **Nom** (par ex. « Adulte », « Enfant », « Étudiant »).
3. Définir un **Prix**. Utiliser 0 pour un type gratuit.
4. Optionnellement définir une **Capacité** pour ce seul type (par ex. seulement 20 places Enfant). Laisser vide pour aucune limite par type.
5. Cliquer **Enregistrer**.

Lors de l'inscription, chaque participant choisit un type ; les types épuisés sont affichés comme **Épuisé** et ne peuvent pas être sélectionnés. La liste affiche le type de chaque participant et les comptages en cours par type.

## Sélections

Les sélections sont des suppléments tarifés optionnels -- T-shirts, plans de repas, mises à niveau d'activités.

1. Développer l'accordéon **Sélections** et cliquer **Ajouter une sélection**.
2. Entrer un **Nom**, une **Description** optionnelle et un **Prix** (0 s'affiche comme « Gratuit »).
3. Optionnellement définir une **Capacité** (total disponible sur toutes les inscriptions) et une **Qté max** (le maximum qu'une inscription peut commander).
4. Cliquer **Enregistrer**.

Les inscrits choisissent les quantités lors de l'inscription et les totaux comptent par rapport à la capacité pour ne jamais surcharger.

## Codes de réduction

1. Développer l'accordéon **Codes de réduction** et cliquer **Ajouter un code de réduction**.
2. Entrer le **Code** que les inscrits taperont.
3. Choisir le **Type** -- **Pourcentage** ou **Montant** -- et sa **Valeur**.
4. Optionnellement limiter le code avec une **Date de début** / **Date de fin**, un **Minimum de membres** (nombre minimum de participants sur l'inscription) et **Utilisations maximales**.
5. Cliquer **Enregistrer**.

Chaque code affiche un compteur **Utilisations** pour que vous puissiez voir combien de fois il a été utilisé. Les inscrits reçoivent un retour instantané quand ils appliquent un code -- y compris des messages clairs quand un code a expiré, n'a pas commencé ou a besoin de plus de participants.

## Liste d'attente

Activer **Activer la liste d'attente** dans la carte Paramètres d'inscription. Quand l'événement atteint la capacité :

- Les nouveaux inscrits se voient proposer une place sur liste d'attente au lieu d'être rejetés. Ils complètent la même inscription (le paiement est ignoré pendant qu'ils sont sur liste d'attente).
- Quand quelqu'un annule, l'inscription sur liste d'attente la plus ancienne est **promue automatiquement** et reçoit un e-mail qu'une place s'est ouverte. S'ils doivent un solde, l'e-mail les lie pour effectuer le paiement.
- Vous pouvez promouvoir quelqu'un manuellement à tout moment avec l'action **Promouvoir** sur une ligne sur liste d'attente -- utile après avoir augmenté la capacité de l'événement.

:::info
Les inscriptions promues restent *en attente* jusqu'à ce que tout solde soit payé ; payer (ou n'avoir rien à payer) les confirme.
:::

## La liste d'inscription

Ouvrir un événement à partir de la page Inscriptions pour voir toutes les inscriptions. Le tableau affiche **Nom**, **Membres**, **Type** (le type de chaque participant), **Payé / Total** (avec un avertissement de solde quand de l'argent est toujours dû), **État** et **Date**, plus les puces de comptage par type au-dessus du tableau.

- Cliquer sur l'icône de détails d'une ligne pour ouvrir la boîte de dialogue **Détails d'inscription** -- membres, sélections, payé/solde et un tableau **Paiements** listant chaque charge (montant, méthode, date).
- **Exporter CSV** télécharge la liste complète avec des colonnes pour les membres, les types de participants, les sélections, le payé/total/solde, l'état et une colonne par question d'inscription.
- **Ajouter un participant** permet toujours d'enregistrer les inscriptions hors ligne manuellement.

:::info
Les remboursements ne sont pas traités dans B1. Si vous avez besoin de rembourser une inscription payante annulée, traiter le remboursement à partir du tableau de bord de votre fournisseur de donation (par ex. Stripe).
:::

## Comment fonctionne le paiement

Les paiements passent par la même passerelle de donation que votre église utilise déjà pour les donations -- les détails de la carte vont directement au fournisseur et ne touchent jamais les serveurs de B1. Les prix sont toujours calculés sur le serveur à partir de vos types configurés, sélections et codes de réduction, donc un inscrit ne peut pas modifier le total. Les membres connectés peuvent payer avec une carte enregistrée ; les invités entrent une carte à la caisse.

## Articles connexes

- [Créer des calendriers](creating-calendars#enabling-event-registration) -- activer l'inscription et les paramètres de base
- [Configuration de la donation en ligne](../donations/online-giving-setup.md) -- configurer la passerelle de paiement utilisée à la caisse
- [S'inscrire aux événements](../../b1-church/events/registering) -- ce que les membres voient quand ils s'inscrivent
- [Mes inscriptions](../../b1-church/events/my-registrations) -- comment les membres paient les soldes et modifier les inscriptions
