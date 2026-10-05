---
title: "Enregistrements payants"
---

# Enregistrements payants

<div class="article-intro">

L'enregistrement aux événements peut aller au-delà d'un simple décompte. Vous pouvez définir des types de participants avec prix (comme Adulte et Enfant), offrir des modules complémentaires optionnels avec leurs propres prix et quantités, créer des codes de réduction, et collecter le paiement lors de l'enregistrement via le fournisseur de dons existant de votre église. Quand un événement est complet, une liste d'attente optionnelle garde les membres intéressés en attente et les promeut automatiquement quand des places se libèrent.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Activez d'abord l'enregistrement sur l'événement — voir [Créer des calendriers](creating-calendars#enabling-event-registration)
- Pour collecter les paiements, votre église doit avoir [les dons en ligne configurés](../donations/online-giving-setup.md) (Stripe, PayPal ou Kingdom Funding). Les événements gratuits n'ont besoin d'aucune configuration de dons.

</div>

## Ouverture des paramètres d'enregistrement

1. Dans B1 Admin, ouvrez le [menu Accès rapide](../introduction.md#getting-around-with-the-jump-menu) (la barre de recherche en haut à gauche), choisissez **Calendriers > Enregistrements**, et ouvrez votre événement (ou ouvrez l'événement de son calendrier).
2. La carte **Paramètres d'enregistrement** montre les bases — **Activer l'enregistrement**, **Capacité**, **L'enregistrement commence/se termine**, **Étiquettes**, et **Questions d'enregistrement**.
3. Sous les bases se trouvent trois accordéons : **Types de participants**, **Sélections**, et **Codes de réduction**.

## Types de participants

Les types de participants vous permettent de facturer des prix différents pour différentes sortes de participants — et de plafonner chacun séparément.

1. Développez l'accordéon **Types de participants** et cliquez sur **Ajouter un type**.
2. Entrez un **Nom** (par exemple, « Adulte », « Enfant », « Étudiant »).
3. Définissez un **Prix**. Utilisez 0 pour un type gratuit.
4. Optionnellement définissez une **Capacité** pour seulement ce type (par exemple, seulement 20 places Enfant). Laissez vide pour aucune limite par type.
5. Cliquez sur **Enregistrer**.

Pendant l'enregistrement, chaque participant choisit un type ; les types épuisés sont affichés comme **Épuisé** et ne peuvent pas être sélectionnés. Le registre affiche le type de chaque participant et le décompte courant par type.

## Sélections

Les sélections sont des modules complémentaires optionnels avec prix — t-shirts, plans de repas, améliorations d'activités.

1. Développez l'accordéon **Sélections** et cliquez sur **Ajouter une sélection**.
2. Entrez un **Nom**, une **Description** optionnelle, et un **Prix** (0 s'affiche comme « Gratuit »).
3. Optionnellement définissez une **Capacité** (total disponible dans tous les enregistrements) et une **Quantité max** (la quantité maximale qu'un enregistrement peut commander).
4. Cliquez sur **Enregistrer**.

Les inscrits choisissent les quantités lors de l'inscription, et les totaux comptent par rapport à la capacité pour que vous ne survendiez jamais.

## Codes de réduction

1. Développez l'accordéon **Codes de réduction** et cliquez sur **Ajouter un code de réduction**.
2. Entrez le **Code** que les inscrits vont taper.
3. Choisissez le **Type** — **Pourcentage** ou **Montant** — et sa **Valeur**.
4. Optionnellement limitez le code avec une **Date de début** / **Date de fin**, un **Nombre minimum de membres** (nombre minimum de participants dans l'enregistrement), et **Utilisations max**.
5. Cliquez sur **Enregistrer**.

Chaque code affiche un décompte **Utilisations** pour que vous puissiez voir la fréquence de sa rédemption. Les inscrits obtiennent des commentaires instantanés lorsqu'ils appliquent un code — y compris des messages clairs quand un code a expiré, n'a pas commencé, ou a besoin de plus de participants.

## Liste d'attente

Activez l'option **Activer la liste d'attente** dans la carte Paramètres d'enregistrement. Lorsque l'événement atteint la capacité :

- Les nouveaux inscrits se voient offrir une place en liste d'attente au lieu d'être refusés. Ils complètent le même processus d'inscription (le paiement est ignoré tant qu'ils sont en liste d'attente).
- Quand quelqu'un annule, l'enregistrement le plus ancien en liste d'attente est **promu automatiquement** et reçoit un e-mail indiquant qu'une place s'est libérée. S'il doit une balance, l'e-mail le renvoie pour compléter le paiement.
- Vous pouvez promouvoir quelqu'un manuellement à tout moment avec l'action **Promouvoir** sur une ligne en liste d'attente — utile après avoir augmenté la capacité de l'événement.

:::info
Les enregistrements promus restent *en attente* jusqu'à ce que tout solde soit payé ; payer (ou ne rien avoir à payer) les confirme.
:::

## Le registre d'enregistrement

Ouvrez un événement depuis la page Enregistrements pour voir chaque enregistrement. Le tableau affiche le **Nom**, les **Membres**, le **Type** (type de chaque participant), **Payé / Total** (avec un avertissement de solde quand de l'argent est toujours dû), le **Statut**, et la **Date**, plus les puces de comptage par type au-dessus du tableau.

- Cliquez sur l'icône de détails d'une ligne pour ouvrir la boîte de dialogue **Détails de l'enregistrement** — membres, sélections, payé/solde, et un tableau **Paiements** listant chaque charge (montant, méthode, date).
- **Exporter CSV** télécharge le registre complet avec des colonnes pour les membres, les types de participants, les sélections, payé/total/solde, statut, et une colonne par question d'enregistrement.
- **Ajouter un participant** vous permet toujours d'enregistrer manuellement les inscriptions hors ligne.

:::info
Les remboursements ne sont pas traités dans B1. Si vous avez besoin de rembourser un enregistrement annulé et payant, émettez le remboursement à partir du tableau de bord de votre fournisseur de dons (par exemple, Stripe).
:::

## Comment fonctionne le paiement

Les paiements s'effectuent par le même réseau de dons que votre église utilise déjà pour les dons — les détails de la carte vont directement au fournisseur et ne touchent jamais les serveurs de B1. Les prix sont toujours calculés sur le serveur à partir de vos types configurés, sélections et codes de réduction, donc un inscrit ne peut pas modifier le total. Les membres connectés peuvent payer avec une carte enregistrée ; les invités entrent une carte lors du paiement.

## Articles connexes

- [Créer des calendriers](creating-calendars#enabling-event-registration) — activer l'enregistrement et les paramètres de base
- [Configuration des dons en ligne](../donations/online-giving-setup.md) — configurer la passerelle de paiement utilisée lors du paiement
- [S'inscrire à des événements](../../b1-church/events/registering) — ce que les membres voient quand ils s'inscrivent
- [Mes enregistrements](../../b1-church/events/my-registrations) — comment les membres paient les soldes et modifient les enregistrements
