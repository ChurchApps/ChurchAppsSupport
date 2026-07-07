---
title: "Sécurité de l'accueil"
---

# Sécurité de l'accueil

<div class="article-intro">

B1 comprend un ensemble de contrôles de sécurité des enfants pour l'accueil : limites de capacité des salles et ratios bénévole-enfant, orientation en âge et en niveau à la borne, types d'accueil qui distinguent les membres, les invités et les bénévoles, et une liste de ramassage de confiance par ménage qui est vérifiée au départ. Cette page explique comment configurer chaque fonction de sécurité dans B1 Admin.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Configurer votre [structure de participation](setup.md) et [bornes d'accueil](check-in.md)
- Les salles sont des [groupes](../groups/creating-groups.md) liés aux heures de service -- les paramètres de sécurité ci-dessous vivent sur le groupe
- L'appel de parent et la diffusion d'urgence nécessitent un fournisseur de textos connecté ([Text In Church](../integrations/services/text-in-church), [Clearstream](../integrations/services/clearstream), ou Mutual Ministry)

</div>

## Capacité de la salle et fermeture d'une salle

Chaque salle d'accueil (groupe) peut appliquer ses propres limites. Ouvrir le groupe, cliquer sur l'**icône du crayon** pour modifier ses paramètres et trouver la section **Capacité d'accueil** :

- **Capacité** -- Le nombre maximum de personnes qui peuvent être accueillies dans cette salle à la fois. Quand la salle est pleine, l'accueil y est bloqué et la borne nomme la salle complète.
- **Capacité des invités** -- Un plafond séparé optionnel sur le nombre d'invités que la salle peut accueillir.
- **Fermé pour accueil** -- Mettre à **Oui** pour arrêter tous les accueils à cette salle immédiatement (par exemple, quand une classe est annulée ou une salle n'est pas disponible). Les départs fonctionnent encore.

## Ratios des bénévoles

La même section **Capacité d'accueil** sur le groupe comprend les règles d'effectif :

- **Enfants par bénévole** -- Le nombre maximum d'enfants que chaque bénévole accueilli peut couvrir (par ex. 5 signifie un bénévole pour cinq enfants).
- **Bénévoles minimum** -- Le plus petit nombre de bénévoles qui doivent être accueillis avant que les enfants puissent être accueillis à la salle.

Les bénévoles comptent pour ces règles quand ils s'accueillent avec le type **Bénévole** à la borne (voir [Types d'accueil](#types-d'accueil) ci-dessous).

### Choisir Avertir vs Bloquer

La manière dont les ratios sont appliqués strictement est un paramètre à l'échelle de l'église :

1. Dans B1 Admin, accédez à **Paramètres > Gérer l'église** et ouvrir la vignette **Accueil**.
2. Mettre **Application du ratio des bénévoles** :
   - **Avertir (autoriser avec confirmation)** -- La borne affiche un avertissement quand une salle est hors ratio ou sous ses bénévoles minimum, et un membre du personnel peut confirmer pour continuer de toute façon. C'est la valeur par défaut.
   - **Bloquer (empêcher l'accueil)** -- L'accueil à la salle est refusé jusqu'à ce qu'assez de bénévoles soient accueillis.

:::info
La capacité et la fermeture pour accueil sont toujours des limites strictes -- le choix avertir/bloquer s'applique uniquement aux ratios des bénévoles.
:::

## Types d'accueil

Chaque accueil enregistre si la personne est un **Membre**, un **Invité** ou un **Bénévole**. Le type est choisi avec des puces sur l'écran des ménages de la borne (Membre est le défaut). Les types alimentent les règles de sécurité -- les bénévoles fournissent une couverture de ratio, et les invités comptent par rapport à la Capacité des invités de la salle.

## Orientation en âge et en niveau des salles

Vous pouvez donner à chaque salle des bornes en âge ou en niveau pour que la borne guide les familles vers des salles appropriées :

- Sur les paramètres du groupe, utilisez la section **Âge et niveau** pour définir l'âge minimum/maximum (années et mois) et/ou le niveau pour la salle.
- À la borne, les salles qu'un enfant se qualifie pour sont surlignées et les salles qu'il ne remplit pas sont estompées. Une salle estompée peut toujours être choisie avec une confirmation du personnel -- l'orientation ne bloquerait jamais à titre définitif.

Les niveaux roulent à la date de promotion en classe de votre église :

1. Dans B1 Admin, accédez à **Paramètres > Gérer l'église** et ouvrir la vignette de promotion de classe.
2. Définir le mois et le jour où votre église promeut les étudiants (par exemple, le 1er août). Les âges et niveaux à la borne sont calculés à partir de la date de promotion la plus récente.

## Personnes de ramassage de confiance et non autorisées

Chaque ménage peut porter une liste de personnes qui sont -- ou ne sont pas -- autorisées à ramasser ses enfants.

1. Ouvrir la page d'une personne dans **Personnes** et trouver la carte **Ramassage**.
2. Cliquer **Ajouter**. Rechercher une personne existante, ou ajouter quelqu'un hors du système en entrant son **Nom**, sa **Relation** et une photo.
3. Définir l'**État** :
   - **De confiance** -- Au départ, cette personne apparaît comme une carte de ramassage appuyable avec sa photo, rendant la vérification du ramassage rapide.
   - **Non autorisé** -- Si quelqu'un tente le ramassage sous ce nom, la borne bloque le départ avec un avertissement. Un membre du personnel peut passer outre, et le remplacement est enregistré sur l'enregistrement de participation.

Cliquer sur la puce d'état d'une personne sur la carte pour basculer entre De confiance et Non autorisé.

:::tip
Ajouter des photos aux personnes de ramassage de confiance autant que possible -- l'écran de départ affiche la photo afin que les bénévoles puissent vérifier visuellement la personne debout devant eux.
:::

## Appel de parent et diffusion d'urgence

Les deux fonctionnalités envoient des messages texte via le fournisseur de textos connecté de votre église -- il n'y a pas de service SMS intégré, donc l'un des fournisseurs pris en charge doit être configuré en premier.

- **Appeler un parent** -- À partir de l'écran de départ d'une borne dirigée, le personnel peut envoyer un SMS aux parents/tuteurs de l'enfant accueilli (par exemple, « Veuillez vous rendre à la crèche »).
- **Diffusion d'urgence** -- À partir des paramètres d'administration de la borne, le personnel peut envoyer un SMS à chaque tuteur du ménage accueilli pour le service sélectionné à la fois. L'envoi nécessite de taper **URGENCE** pour confirmer.

Les personnes qui se sont désabonnées des textos ou qui n'ont pas de numéro de mobile enregistré sont ignorées automatiquement -- la borne signale combien de messages ont été envoyés et combien ont été ignorés.

Voir la procédure pas à pas côté borne dans [Départ et sécurité des enfants](../../b1-checkin/check-in/checking-out).

## Articles connexes

- [Accueil](check-in.md) -- Configuration de la borne et matériel
- [Départ et sécurité des enfants](../../b1-checkin/check-in/checking-out) -- La sortie de la borne, la vérification du ramassage et les flux d'appel
- [Création de groupes](../groups/creating-groups.md) -- Où vivent les paramètres de la salle
- [Configuration de la participation](setup.md) -- Services, heures de service et affectations de salles
