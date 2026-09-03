---
title: "Sécurité du Pointage"
---

# Sécurité du Pointage

<div class="article-intro">

B1 comprend un ensemble de contrôles de sécurité pour enfants lors du pointage : les limites de capacité des salles et les ratios bénévole-enfant, les conseils d'âge et de niveau à la borne, les types de pointage qui distinguent les membres, les invités et les bénévoles, et une liste de personnes autorisées à récupérer par ménage qui est vérifiée au départ. Cette page explique comment configurer chaque fonction de sécurité dans B1 Admin.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Configurez votre [structure de participation](setup.md) et vos [bornes de pointage](check-in.md)
- Les salles sont des [groupes](../groups/creating-groups.md) liés aux heures de service — les paramètres de sécurité ci-dessous se trouvent sur le groupe
- L'appel aux parents et la diffusion d'urgence nécessitent un fournisseur de textos connecté ([Text In Church](../integrations/services/text-in-church), [Clearstream](../integrations/services/clearstream), ou Mutual Ministry)

</div>

## Capacité de la Salle et Fermeture d'une Salle

Chaque salle de pointage (groupe) peut imposer ses propres limites. Ouvrez le groupe, cliquez sur l'**icône crayon** pour modifier ses paramètres, et trouvez la section **Capacité de Pointage** :

- **Capacité** -- Le nombre maximal de personnes qui peuvent être pointées dans cette salle à la fois. Lorsque la salle est pleine, le pointage y est bloqué et la borne nomme la salle pleine.
- **Capacité des Invités** -- Un plafond facultatif séparé sur le nombre d'invités que la salle peut accueillir.
- **Fermée pour le Pointage** -- Réglez sur **Oui** pour arrêter immédiatement tous les pointages dans cette salle (par exemple, lorsqu'un cours est annulé ou qu'une salle n'est pas disponible). Les départs continuent à fonctionner.

## Ratios de Bénévoles

La même section **Capacité de Pointage** sur le groupe inclut les règles de personnel :

- **Enfants par Bénévole** -- Le nombre maximal d'enfants que chaque bénévole pointé peut couvrir (par ex. 5 signifie un bénévole pour cinq enfants).
- **Bénévoles Minimum** -- Le plus petit nombre de bénévoles qui doivent être pointés avant que les enfants puissent être pointés dans la salle.

Les bénévoles comptent pour ces règles lorsqu'ils pointent avec le type **Bénévole** à la borne (voir [Types de Pointage](#types-de-pointage) ci-dessous).

### Choisir Avertir vs. Bloquer

La façon dont les ratios sont appliqués est un paramètre au niveau de l'église :

1. Dans B1 Admin, allez à **Paramètres > Gérer l'Église** et ouvrez la vignette **Pointage**.
2. Réglez l'**Application des Ratios de Bénévoles** :
   - **Avertir (autoriser avec confirmation)** -- La borne affiche un avertissement lorsqu'une salle est hors ratio ou en deçà de ses bénévoles minimum, et un membre du personnel peut confirmer pour continuer quand même. C'est la valeur par défaut.
   - **Bloquer (empêcher le pointage)** -- Le pointage dans la salle est refusé jusqu'à ce que suffisamment de bénévoles soient pointés.

:::info
La capacité et la fermeture pour le pointage sont toujours des limites strictes — le choix avertir/bloquer s'applique uniquement aux ratios de bénévoles.
:::

## Types de Pointage

Chaque pointage enregistre si la personne est un **Membre**, un **Invité**, ou un **Bénévole**. Le type est choisi avec des jetons sur l'écran du ménage de la borne (Membre est la valeur par défaut). Les types alimentent les règles de sécurité — les bénévoles fournissent une couverture de ratio, et les invités comptent pour la capacité des invités de la salle.

## Conseils d'Âge et de Niveau pour les Salles

Vous pouvez donner à chaque salle des limites d'âge ou de niveau pour que la borne guide les familles vers les salles appropriées :

- Dans les paramètres du groupe, utilisez la section **Âge & Niveau** pour définir l'âge minimum/maximum (années et mois) et/ou le niveau pour la salle.
- À la borne, les salles pour lesquelles un enfant se qualifie sont mises en évidence et les salles pour lesquelles il ne se qualifie pas sont estompées. Une salle estompée peut toujours être choisie avec une confirmation du personnel — les conseils ne bloquent jamais.

Les niveaux se déroulent à la **date de promotion de niveau** de votre église :

1. Dans B1 Admin, allez à **Paramètres > Gérer l'Église** et ouvrez la vignette de promotion de niveau.
2. Définissez le mois et le jour où votre église promeut les étudiants (par exemple, 1er août). Les âges et niveaux à la borne sont calculés à partir de la date de promotion la plus récente.

## Personnes Autorisées et Non Autorisées à Récupérer

Chaque ménage peut avoir une liste de personnes qui sont — ou ne sont pas — autorisées à récupérer ses enfants.

1. Ouvrez la page d'une personne dans **Personnes** et trouvez la carte **Récupération**.
2. Cliquez sur **Ajouter**. Recherchez une personne existante, ou ajoutez quelqu'un ne figurant pas dans le système en entrant son **Nom**, sa **Relation**, et une photo.
3. Réglez le **Statut** :
   - **Autorisée** -- À la sortie, cette personne apparaît comme une carte de récupération tapable avec sa photo, ce qui rend la vérification rapide.
   - **Non Autorisée** -- Si quelqu'un tente de récupérer sous ce nom, la borne bloque la sortie avec un avertissement. Un membre du personnel peut ignorer, et le remplacement est enregistré dans le dossier de participation.

Cliquez sur le jeton de statut d'une personne sur la carte pour basculer entre Autorisée et Non Autorisée.

:::tip
Ajoutez des photos aux personnes autorisées à récupérer autant que possible — l'écran de sortie affiche la photo pour que les bénévoles puissent vérifier visuellement la personne qui se tient devant eux.
:::

## Appel aux Parents et Diffusion d'Urgence

Ces deux fonctions envoient des messages texte via le fournisseur de textos connecté de votre église — il n'y a pas de service SMS intégré, donc l'un des fournisseurs pris en charge doit être configuré en premier.

- **Appeler un parent** -- Depuis l'écran de sortie d'une borne mannequin, le personnel peut envoyer un texto aux parents/tuteurs d'un enfant pointé (par exemple, "Veuillez venir à la pouponnière").
- **Diffusion d'urgence** -- Depuis les paramètres d'administration de la borne, le personnel peut envoyer un texto à tous les tuteurs des ménages pointés pour le service sélectionné à la fois. L'envoi nécessite de taper **URGENCE** pour confirmer.

Les personnes qui se sont désinscrites des textos, ou qui n'ont pas de numéro mobile en dossier, sont automatiquement ignorées — la borne rapporte combien de messages ont été envoyés et combien ont été ignorés.

Voir la présentation du côté de la borne dans [Sortie et Sécurité des Enfants](../../b1-checkin/check-in/checking-out).

## Articles Connexes

- [Pointage](check-in.md) — configuration et matériel de la borne
- [Sortie et Sécurité des Enfants](../../b1-checkin/check-in/checking-out) — la sortie de la borne, la vérification de récupération et les flux d'appel
- [Création de Groupes](../groups/creating-groups.md) — où vivent les paramètres de salle
- [Configuration de la Participation](setup.md) — services, heures de service et affectations de salles
- [Âge Minimum pour les Messages Privés](../settings/mobile-app.md#member-directory--messaging-settings) — bloque les nouvelles conversations de messages privés avec les enfants tout en les gardant dans le répertoire
