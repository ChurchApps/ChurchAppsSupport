---
title: "Sécurité de l'enregistrement"
---

# Sécurité de l'enregistrement

<div class="article-intro">

B1 inclut un ensemble de contrôles de sécurité des enfants pour l'enregistrement : les limites de capacité des salles et les ratios bénévoles-enfants, les conseils d'âge et de niveau au kiosque, les types d'enregistrement qui distinguent les membres, les invités et les bénévoles, et une liste de retrait de confiance par ménage qui est vérifiée au retrait. Cette page couvre la configuration de chaque fonction de sécurité dans B1 Admin.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Configurez votre [structure de présence](setup.md) et vos [kiosques d'enregistrement](check-in.md)
- Les salles sont des [groupes](../groups/creating-groups.md) liés aux heures de service — les paramètres de sécurité ci-dessous se trouvent sur le groupe
- L'appel aux parents et la diffusion d'urgence nécessitent un fournisseur de messages texte connecté ([Text In Church](../integrations/services/text-in-church), [Clearstream](../integrations/services/clearstream), ou Mutual Ministry)

</div>

## Capacité de la salle et fermeture d'une salle

Chaque salle d'enregistrement (groupe) peut appliquer ses propres limites. Ouvrez le groupe, cliquez sur l'**icône crayon** pour modifier ses paramètres, et trouvez la section **Capacité d'enregistrement** :

- **Capacité** -- Le nombre maximal de personnes qui peuvent être enregistrées dans cette salle en même temps. Quand la salle est pleine, l'enregistrement y est bloqué et le kiosque nomme la salle comme étant pleine.
- **Capacité des invités** -- Un plafond séparé optionnel sur le nombre d'invités que la salle peut accueillir.
- **Fermée pour l'enregistrement** -- Définissez sur **Oui** pour arrêter tous les enregistrements dans cette salle immédiatement (par exemple, quand un cours est annulé ou une salle n'est pas disponible). Les sorties fonctionnent toujours.

## Ratios des bénévoles

La même section **Capacité d'enregistrement** sur le groupe inclut les règles d'staffing :

- **Enfants par bénévole** -- Le nombre maximal d'enfants que chaque bénévole enregistré peut couvrir (par exemple, 5 signifie un bénévole pour cinq enfants).
- **Bénévoles minimum** -- Le plus petit nombre de bénévoles qui doivent être enregistrés avant que les enfants puissent s'enregistrer dans la salle.

Les bénévoles comptent dans ces règles quand ils s'enregistrent avec le type **Bénévole** au kiosque (voir [Types d'enregistrement](#check-in-types) ci-dessous).

### Choix entre Avertissement et Blocage

La rigueur avec laquelle les ratios sont appliqués est un paramètre d'église :

1. Dans B1 Admin, allez à **Paramètres > Gérer l'église** et ouvrez la tuile **Enregistrement**.
2. Définissez **Application des ratios de bénévoles** :
   - **Avertissement (autoriser avec confirmation)** -- Le kiosque affiche un avertissement quand une salle dépasse le ratio ou ne dispose pas de ses bénévoles minimum, et un membre du personnel peut confirmer pour continuer quand même. C'est la valeur par défaut.
   - **Blocage (empêcher l'enregistrement)** -- L'enregistrement dans la salle est refusé jusqu'à ce qu'assez de bénévoles soient enregistrés.

:::info
La capacité et Fermée pour l'enregistrement sont toujours des limites strictes — le choix avertissement/blocage s'applique uniquement aux ratios de bénévoles.
:::

## Types d'enregistrement

Chaque enregistrement enregistre si la personne est un **Membre**, un **Invité** ou un **Bénévole**. Le type est choisi avec des puces sur l'écran du ménage du kiosque (Membre est la valeur par défaut). Les types alimentent les règles de sécurité — les bénévoles fournissent une couverture de ratio, et les invités comptent par rapport à la capacité des invités de la salle.

## Conseils d'âge et de niveau pour la salle

Vous pouvez donner à chaque salle des limites d'âge ou de niveau pour que le kiosque guide les familles vers les bonnes salles :

- Sur les paramètres du groupe, utilisez la section **Âge et niveau** pour définir l'âge minimum/maximum (années et mois) et/ou le niveau pour la salle.
- Au kiosque, les salles dans lesquelles un enfant peut aller sont mises en évidence et les salles où il ne peut pas aller sont assombries. Une salle assombrie peut toujours être choisie avec la confirmation d'un membre du personnel — le conseil n'impose jamais un blocage dur.

Les niveaux passent à la date de promotion de niveau de votre église :

1. Dans B1 Admin, allez à **Paramètres > Gérer l'église** et ouvrez la tuile de promotion de niveau.
2. Définissez le mois et le jour où votre église promeut les étudiants (par exemple, 1er août). Les âges et les niveaux au kiosque sont calculés à partir de la date de promotion la plus récente.

## Personnes de retrait de confiance et non autorisées

Chaque ménage peut avoir une liste de personnes qui sont -- ou ne sont pas -- autorisées à retirer ses enfants.

1. Ouvrez la page d'une personne dans **Personnes** et trouvez la carte **Retrait**.
2. Cliquez sur **Ajouter**. Recherchez une personne existante, ou ajoutez quelqu'un ne figurant pas dans le système en entrant son **Nom**, sa **Relation** et une photo.
3. Définissez le **Statut** :
   - **De confiance** -- Au retrait, cette personne apparaît comme une carte de retrait tapable avec sa photo, ce qui rend le retrait vérifié rapide.
   - **Non autorisé** -- Si quelqu'un tente un retrait sous ce nom, le kiosque bloque le retrait avec un avertissement. Un membre du personnel peut remplacer, et le remplacement est enregistré sur le dossier de présence.

Cliquez sur la puce de statut d'une personne sur la carte pour basculer entre De confiance et Non autorisé.

:::tip
Ajoutez des photos aux personnes de retrait de confiance chaque fois que possible — l'écran de retrait affiche la photo pour que les bénévoles puissent vérifier visuellement la personne devant eux.
:::

## Appel aux parents et diffusion d'urgence

Les deux fonctionnalités envoient des messages texte par le biais du fournisseur de messages texte connecté de votre église — il n'y a pas de service SMS intégré, donc l'un des fournisseurs pris en charge doit être configuré d'abord.

- **Appel aux parents** -- À partir de l'écran de retrait d'un kiosque avec personnel, le personnel peut envoyer un SMS aux parents/tuteurs d'un enfant enregistré (par exemple, "Veuillez venir à la pouponnière").
- **Diffusion d'urgence** -- À partir des paramètres administrateur du kiosque, le personnel peut envoyer un SMS aux tuteurs de tous les ménages enregistrés pour le service sélectionné en même temps. L'envoi nécessite de taper **EMERGENCY** pour confirmer.

Les personnes qui se sont désabonnées des SMS, ou qui n'ont pas de numéro mobile en dossier, sont automatiquement ignorées — le kiosque rapporte combien de messages ont été envoyés et combien ont été ignorés.

Voir le guide du kiosque dans [Retrait et sécurité des enfants](../../b1-checkin/check-in/checking-out).

## Articles connexes

- [Enregistrement](check-in.md) — configuration du kiosque et matériel
- [Retrait et sécurité des enfants](../../b1-checkin/check-in/checking-out) — le retrait du kiosque, la vérification du retrait et les flux d'appel
- [Création de groupes](../groups/creating-groups.md) — où résident les paramètres de salle
- [Configuration de la présence](setup.md) — services, heures de service et assignations de salles
- [Âge minimum pour les messages privés](../settings/mobile-app.md#member-directory--messaging-settings) — bloque les nouvelles conversations de messages privés avec les enfants tout en les gardant dans le répertoire
