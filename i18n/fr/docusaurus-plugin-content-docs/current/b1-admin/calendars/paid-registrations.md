---
title: "Inscriptions payantes"
---

# Inscriptions payantes

<div class="article-intro">

L'inscription aux événements peut aller au-delà d'un simple décompte de participants. Vous pouvez définir des types de participants avec des tarifs (comme Adulte et Enfant), proposer des options supplémentaires facultatives avec leurs propres tarifs et quantités, créer des codes de réduction, et collecter le paiement lors de l'inscription via le fournisseur de dons existant de votre église. Lorsqu'un événement est complet, une liste d'attente facultative garde les membres intéressés en file et les fait automatiquement passer dès qu'une place se libère.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Activez d'abord l'inscription sur l'événement — voir [Créer des calendriers](creating-calendars#enabling-event-registration)
- Pour collecter des paiements, votre église a besoin des [dons en ligne configurés](../donations/online-giving-setup.md) (Stripe, PayPal ou Kingdom Funding). Les événements gratuits n'ont besoin d'aucune configuration de dons.

</div>

## Ouvrir les paramètres d'inscription

1. Dans B1 Admin, allez à la page **Inscriptions** et ouvrez votre événement (ou ouvrez l'événement depuis son calendrier).
2. La carte **Paramètres d'inscription** affiche les éléments de base — **Activer l'inscription**, **Capacité**, **Ouverture/Fermeture des inscriptions**, **Étiquettes**, et **Questions d'inscription**.
3. Sous les éléments de base se trouvent trois accordéons : **Types de participants**, **Sélections**, et **Codes de réduction**.

## Types de participants

Les types de participants vous permettent de facturer des tarifs différents pour différents types de participants — et de plafonner chacun séparément.

1. Développez l'accordéon **Types de participants** et cliquez sur **Ajouter un type**.
2. Saisissez un **Nom** (par exemple, « Adulte », « Enfant », « Étudiant »).
3. Définissez un **Tarif**. Utilisez 0 pour un type gratuit.
4. Définissez éventuellement une **Capacité** pour ce seul type (par exemple, seulement 20 places Enfant). Laissez vide pour aucune limite par type.
5. Cliquez sur **Enregistrer**.

Pendant l'inscription, chaque participant choisit un type ; les types épuisés sont affichés comme **Épuisé** et ne peuvent pas être sélectionnés. Le registre affiche le type de chaque participant et les décomptes courants par type.

## Sélections

Les sélections sont des options supplémentaires facultatives et payantes — t-shirts, formules repas, mises à niveau d'activités.

1. Développez l'accordéon **Sélections** et cliquez sur **Ajouter une sélection**.
2. Saisissez un **Nom**, une **Description** facultative, et un **Tarif** (0 s'affiche comme « Gratuit »).
3. Définissez éventuellement une **Capacité** (total disponible sur toutes les inscriptions) et une **Qté max** (le maximum qu'une inscription peut commander).
4. Cliquez sur **Enregistrer**.

Les inscrits choisissent les quantités pendant l'inscription, et les totaux comptent dans la capacité afin que vous ne survendiez jamais.

## Codes de réduction

1. Développez l'accordéon **Codes de réduction** et cliquez sur **Ajouter un code de réduction**.
2. Saisissez le **Code** que les inscrits saisiront.
3. Choisissez le **Type** — **Pourcentage** ou **Montant** — et sa **Valeur**.
4. Limitez éventuellement le code avec une **Date de début** / **Date de fin**, un **Nombre minimum de membres** (nombre minimum de participants sur l'inscription), et un **Nombre d'utilisations maximum**.
5. Cliquez sur **Enregistrer**.

Chaque code affiche un décompte d'**Utilisations** afin que vous puissiez voir la fréquence à laquelle il a été utilisé. Les inscrits reçoivent un retour instantané lorsqu'ils appliquent un code — y compris des messages clairs lorsqu'un code a expiré, n'a pas encore commencé, ou nécessite plus de participants.

## Liste d'attente

Activez **Activer la liste d'attente** dans la carte Paramètres d'inscription. Lorsque l'événement atteint sa capacité :

- Les nouveaux inscrits se voient proposer une place sur liste d'attente au lieu d'être refusés. Ils effectuent la même inscription (le paiement est ignoré tant qu'ils sont en liste d'attente).
- Lorsque quelqu'un annule, l'inscription en liste d'attente la plus ancienne est **promue automatiquement** et reçoit un e-mail indiquant qu'une place s'est libérée. Si un solde est dû, l'e-mail renvoie vers la finalisation du paiement.
- Vous pouvez promouvoir quelqu'un manuellement à tout moment avec l'action **Promouvoir** sur une ligne en liste d'attente — utile après avoir augmenté la capacité de l'événement.

:::info
Les inscriptions promues restent *en attente* jusqu'à ce que tout solde soit payé ; le paiement (ou l'absence de solde à payer) les confirme.
:::

## Le registre des inscriptions

Ouvrez un événement depuis la page Inscriptions pour voir chaque inscription. Le tableau affiche **Nom**, **Membres**, **Type** (le type de chaque participant), **Payé / Total** (avec un avertissement de solde lorsque de l'argent est encore dû), **Statut**, et **Date**, ainsi que des puces de décompte par type au-dessus du tableau.

- Cliquez sur l'icône de détails d'une ligne pour ouvrir la boîte de dialogue **Détails de l'inscription** — membres, sélections, payé/solde, et un tableau **Paiements** listant chaque transaction (montant, méthode, date).
- **Exporter en CSV** télécharge le registre complet avec des colonnes pour les membres, les types de participants, les sélections, payé/total/solde, le statut, et une colonne par question d'inscription.
- **Ajouter un participant** vous permet toujours d'enregistrer manuellement des inscriptions hors ligne.

:::info
Les remboursements ne sont pas traités dans B1. Si vous devez rembourser une inscription payante annulée, effectuez le remboursement depuis le tableau de bord de votre fournisseur de dons (par exemple, Stripe).
:::

## Comment fonctionne le paiement

Les paiements passent par la même passerelle de dons que votre église utilise déjà pour les dons — les détails de la carte vont directement au fournisseur et ne touchent jamais les serveurs de B1. Les tarifs sont toujours calculés côté serveur à partir de vos types, sélections et codes de réduction configurés, de sorte qu'un inscrit ne peut pas altérer le total. Les membres connectés peuvent payer avec une carte enregistrée ; les invités saisissent une carte lors du paiement.

## Articles associés

- [Créer des calendriers](creating-calendars#enabling-event-registration) — activer l'inscription et les paramètres de base
- [Configuration des dons en ligne](../donations/online-giving-setup.md) — configurer la passerelle de paiement utilisée au paiement
- [S'inscrire aux événements](../../b1-church/events/registering) — ce que voient les membres lorsqu'ils s'inscrivent
- [Mes inscriptions](../../b1-church/events/my-registrations) — comment les membres paient les soldes et modifient leurs inscriptions
