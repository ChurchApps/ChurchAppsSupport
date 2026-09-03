---
title: "Inscriptions Payantes"
---

# Inscriptions Payantes

<div class="article-intro">

L'inscription aux événements peut aller au-delà d'un simple comptage. Vous pouvez définir des types de participants au prix (comme Adulte et Enfant), offrir des suppléments facultatifs avec leurs propres prix et quantités, créer des codes de réduction, et collecter le paiement lors de l'inscription via le fournisseur de dons existant de votre église. Lorsqu'un événement se remplit, une liste d'attente facultative garde les membres intéressés en attente et les promeut automatiquement à mesure que les places se libèrent.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Activez d'abord l'inscription sur l'événement — voir [Création de Calendriers](creating-calendars#enabling-event-registration)
- Pour collecter les paiements, votre église a besoin de [dons en ligne configurés](../donations/online-giving-setup.md) (Stripe, PayPal, ou Kingdom Funding). Les événements gratuits n'ont besoin d'aucune configuration de dons.

</div>

## Ouverture des Paramètres d'Inscription

1. Dans B1 Admin, allez à la page **Inscriptions** et ouvrez votre événement (ou ouvrez l'événement depuis son calendrier).
2. La carte **Paramètres d'Inscription** affiche les bases — **Activer l'Inscription**, **Capacité**, **Ouverture/Fermeture de l'Inscription**, **Étiquettes**, et **Questions d'Inscription**.
3. Sous les bases se trouvent trois accordéons : **Types de Participants**, **Sélections**, et **Codes de Réduction**.

## Types de Participants

Les types de participants vous permettent de facturer des prix différents pour différents types de participants — et de limiter chacun séparément.

1. Développez l'accordéon **Types de Participants** et cliquez sur **Ajouter un Type**.
2. Entrez un **Nom** (par ex. "Adulte", "Enfant", "Étudiant").
3. Définissez un **Prix**. Utilisez 0 pour un type gratuit.
4. Définissez éventuellement une **Capacité** pour ce type uniquement (par ex. seulement 20 places Enfant). Laissez vide pour aucune limite par type.
5. Cliquez sur **Enregistrer**.

Lors de l'inscription, chaque participant choisit un type; les types épuisés sont affichés comme **Épuisé** et ne peuvent pas être sélectionnés. Le registre affiche le type de chaque participant et les comptages courants par type.

## Sélections

Les sélections sont des suppléments au prix facultatifs — T-shirts, plans de repas, mises à niveau d'activités.

1. Développez l'accordéon **Sélections** et cliquez sur **Ajouter une Sélection**.
2. Entrez un **Nom**, une **Description** facultative, et un **Prix** (0 s'affiche comme "Gratuit").
3. Définissez éventuellement une **Capacité** (total disponible pour toutes les inscriptions) et une **Qté Max** (le plus qu'une inscription peut commander).
4. Cliquez sur **Enregistrer**.

Les inscrits choisissent les quantités lors de l'inscription, et les totaux comptent pour la capacité pour que vous ne survendiez jamais.

## Codes de Réduction

1. Développez l'accordéon **Codes de Réduction** et cliquez sur **Ajouter un Code de Réduction**.
2. Entrez le **Code** que les inscrits taperont.
3. Choisissez le **Type** — **Pourcentage** ou **Montant** — et sa **Valeur**.
4. Limitez éventuellement le code avec une **Date de Début** / **Date de Fin**, un **Nombre de Participants Minimum** (nombre minimum de participants sur l'inscription), et **Utilisations Maximales**.
5. Cliquez sur **Enregistrer**.

Chaque code affiche un comptage **Utilisations** pour que vous puissiez voir combien de fois il a été utilisé. Les inscrits obtiennent un retour instantané lorsqu'ils appliquent un code — y compris des messages clairs lorsqu'un code a expiré, n'a pas commencé, ou a besoin de plus de participants.

## Liste d'Attente

Activez **Activer la Liste d'Attente** dans la carte Paramètres d'Inscription. Lorsque l'événement atteint la capacité :

- Les nouveaux inscrits se voient proposer une place sur liste d'attente au lieu d'être refusés. Ils complètent la même inscription (le paiement est ignoré en attente).
- Lorsque quelqu'un annule, l'inscription en liste d'attente la plus ancienne est **promue automatiquement** et reçoit un e-mail indiquant qu'une place s'est libérée. S'ils ont un solde à payer, l'e-mail les lie pour compléter le paiement.
- Vous pouvez promouvoir quelqu'un manuellement à tout moment avec l'action **Promouvoir** sur une ligne en attente — utile après avoir augmenté la capacité d'événement.

:::info
Les inscriptions promues restent *en attente* jusqu'à ce que tout solde soit payé ; payer (ou n'avoir rien à payer) les confirme.
:::

## Le Registre d'Inscription

Ouvrez un événement à partir de la page Inscriptions pour voir chaque inscription. Le tableau affiche **Nom**, **Membres**, **Type** (type de chaque participant), **Payé / Total** (avec un avertissement de solde lorsque de l'argent est encore dû), **Statut**, et **Date**, plus des jetons de comptage par type au-dessus du tableau.

- Cliquez sur l'icône de détails d'une ligne pour ouvrir la boîte de dialogue **Détails de l'Inscription** — membres, sélections, payé/solde, et un tableau **Paiements** énumérant chaque charge (montant, méthode, date).
- **Exporter CSV** télécharge le registre complet avec des colonnes pour les membres, les types de participants, les sélections, payé/total/solde, le statut, et une colonne par question d'inscription.
- **Ajouter un Participant** vous permet toujours d'enregistrer les inscriptions hors ligne manuellement.

:::info
Les remboursements ne sont pas traités dans B1. Si vous devez rembourser une inscription payante annulée, émettez le remboursement depuis le tableau de bord de votre fournisseur de dons (par ex. Stripe).
:::

## Comment Fonctionne le Paiement

Les paiements fonctionnent via la même passerelle de dons que votre église utilise déjà pour les donations — les détails de la carte vont directement au fournisseur et ne touchent jamais les serveurs de B1. Les prix sont toujours calculés sur le serveur à partir de vos types configurés, sélections et codes de réduction, donc un inscrit ne peut pas altérer le total. Les membres connectés peuvent payer avec une carte enregistrée; les invités entrent une carte à la caisse.

## Articles Connexes

- [Création de Calendriers](creating-calendars#enabling-event-registration) — activer l'inscription et les paramètres de base
- [Configuration des Dons en Ligne](../donations/online-giving-setup.md) — configurer la passerelle de paiement utilisée à la caisse
- [Inscription aux Événements](../../b1-church/events/registering) — ce que les membres voient lorsqu'ils s'inscrivent
- [Mes Inscriptions](../../b1-church/events/my-registrations) — comment les membres paient les soldes et modifient les inscriptions
