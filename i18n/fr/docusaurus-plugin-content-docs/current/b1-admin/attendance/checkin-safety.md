---
title: "Sécurité de l'enregistrement"
---

# Sécurité de l'enregistrement

<div class="article-intro">

B1 inclut un ensemble de contrôles de sécurité pour les enfants lors de l'enregistrement : limites de capacité des salles et ratios bénévoles-enfants, conseils d'âge et de niveau au kiosque, types d'enregistrement qui distinguent les membres, les invités et les bénévoles, et une liste de personne autorisée pour la prise en charge par foyer qui est vérifiée à la sortie. Cette page explique comment configurer chaque fonction de sécurité dans B1 Admin.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Configurez votre [structure de présence](setup.md) et vos [kiosques d'enregistrement](check-in.md)
- Les salles sont des [groupes](../groups/creating-groups.md) liés aux heures de service — les paramètres de sécurité ci-dessous se trouvent sur le groupe
- L'appel des parents et la diffusion d'urgence nécessitent un fournisseur de messages texte connecté ([Text In Church](../integrations/services/text-in-church), [Clearstream](../integrations/services/clearstream), ou Mutual Ministry)

</div>

## Capacité des salles et fermeture d'une salle

Chaque salle d'enregistrement (groupe) peut appliquer ses propres limites. Ouvrez le groupe, cliquez sur l'**icône en forme de crayon** pour modifier ses paramètres, et trouvez la section **Capacité d'enregistrement** :

- **Capacité** -- Le nombre maximal de personnes qui peuvent être enregistrées dans cette salle à la fois. Lorsque la salle est pleine, l'enregistrement y est bloqué et le kiosque nomme la salle complète.
- **Capacité pour les invités** -- Un plafond optionnel séparé pour le nombre d'invités que la salle peut accueillir.
- **Fermée pour l'enregistrement** -- Définissez sur **Oui** pour arrêter immédiatement tous les enregistrements dans cette salle (par exemple, lorsqu'une classe est annulée ou qu'une salle n'est pas disponible). Les sorties fonctionnent toujours.

## Ratios de bénévoles

La même section **Capacité d'enregistrement** sur le groupe inclut les règles de personnel :

- **Enfants par bénévole** -- Le nombre maximal d'enfants que chaque bénévole enregistré peut couvrir (par exemple, 5 signifie un bénévole pour cinq enfants).
- **Bénévoles minimum** -- Le plus petit nombre de bénévoles qui doivent être enregistrés avant que les enfants puissent être enregistrés dans la salle.

Les bénévoles comptent dans ces règles lorsqu'ils s'enregistrent avec le type **Bénévole** au kiosque (voir [Types d'enregistrement](#types-d'enregistrement) ci-dessous).

### Choisir Avertir ou Bloquer

La rigueur avec laquelle les ratios sont appliqués est un paramètre à l'échelle de l'église :

1. Dans B1 Admin, allez à **Paramètres > Gérer l'église** et ouvrez le volet **Enregistrement**.
2. Définissez **Application des ratios de bénévoles** :
   - **Avertir (autoriser avec confirmation)** -- Le kiosque affiche un avertissement lorsqu'une salle dépasse le ratio ou n'atteint pas ses bénévoles minimum, et un membre du personnel peut confirmer pour continuer de toute façon. C'est la valeur par défaut.
   - **Bloquer (empêcher l'enregistrement)** -- L'enregistrement à la salle est refusé jusqu'à ce que suffisamment de bénévoles soient enregistrés.

:::info
La capacité et la fermeture pour l'enregistrement sont toujours des limites strictes — le choix avertir/bloquer s'applique uniquement aux ratios de bénévoles.
:::

## Types d'enregistrement

Chaque enregistrement enregistre si la personne est un **Membre**, un **Invité** ou un **Bénévole**. Le type est choisi avec des puces sur l'écran du ménage du kiosque (Membre est la valeur par défaut). Les types alimentent les règles de sécurité — les bénévoles fournissent une couverture de ratio, et les invités comptent contre la capacité d'invités de la salle.

## Conseils d'âge et de niveau pour les salles

Vous pouvez donner à chaque salle des limites d'âge ou de niveau afin que le kiosque guide les familles vers les salles appropriées :

- Sur les paramètres du groupe, utilisez la section **Âge et niveau** pour définir l'âge minimum/maximum (années et mois) et/ou le niveau pour la salle.
- Au kiosque, les salles qu'un enfant peut fréquenter sont en évidence et les salles qu'il ne peut pas fréquenter sont atténuées. Une salle atténuée peut toujours être choisie avec une confirmation du personnel — les conseils ne bloquent jamais.

Les niveaux changent à la **date de promotion de niveau** de votre église :

1. Dans B1 Admin, allez à **Paramètres > Gérer l'église** et ouvrez le volet de promotion de niveau.
2. Définissez le mois et le jour où votre église fait la promotion des étudiants (par exemple, 1er août). Les âges et niveaux au kiosque sont calculés à partir de la date de promotion la plus récente.

## Personnes de prise en charge autorisées et non autorisées

Chaque ménage peut avoir une liste de personnes qui sont — ou ne sont pas — autorisées à prendre en charge ses enfants.

1. Ouvrez la page d'une personne dans **Personnes** et trouvez la carte **Prise en charge**.
2. Cliquez sur **Ajouter**. Recherchez une personne existante, ou ajoutez une personne qui n'est pas dans le système en entrant son **Nom**, sa **Relation** et une photo.
3. Définissez le **Statut** :
   - **Autorisée** -- À la sortie, cette personne apparaît comme une carte de prise en charge exploitable avec sa photo, ce qui accélère la prise en charge vérifiée.
   - **Non autorisée** -- Si quelqu'un tente une prise en charge sous ce nom, le kiosque bloque la sortie avec un avertissement. Un membre du personnel peut annuler, et l'annulation est enregistrée sur le dossier de présence.

Cliquez sur la puce de statut d'une personne sur la carte pour basculer entre Autorisée et Non autorisée.

:::tip
Ajoutez des photos aux personnes autorisées pour la prise en charge chaque fois que possible — l'écran de sortie affiche la photo afin que les bénévoles puissent vérifier visuellement la personne qui se tient devant eux.
:::

## Appel des parents et diffusion d'urgence

Les deux fonctions envoient des messages texte par le fournisseur de messages texte connecté de votre église — il n'y a pas de service SMS intégré, donc un des fournisseurs pris en charge doit être configuré en premier.

- **Appeler un parent** -- À partir de l'écran de sortie d'un kiosque géré, le personnel peut envoyer un message texte aux parents/tuteurs d'un enfant enregistré (par exemple, « Veuillez venir à la crèche »).
- **Diffusion d'urgence** -- À partir des paramètres d'administration du kiosque, le personnel peut envoyer un message texte aux tuteurs de tous les ménages enregistrés pour le service sélectionné à la fois. L'envoi nécessite de taper **URGENCE** pour confirmer.

Les personnes qui se sont désabonnées des messages texte, ou qui n'ont pas de numéro de téléphone mobile, sont ignorées automatiquement — le kiosque signale le nombre de messages envoyés et le nombre ignorés.

Consultez la procédure pas à pas du côté du kiosque dans [Sortie et sécurité des enfants](../../b1-checkin/check-in/checking-out).

## Articles connexes

- [Enregistrement](check-in.md) — configuration du kiosque et matériel
- [Sortie et sécurité des enfants](../../b1-checkin/check-in/checking-out) — sortie du kiosque, vérification de la prise en charge et flux d'appel
- [Création de groupes](../groups/creating-groups.md) — où vivent les paramètres de salle
- [Configuration de la présence](setup.md) — services, heures de service et assignations de salles
- [Âge minimum pour les messages privés](../settings/mobile-app.md#member-directory--messaging-settings) — empêche les nouvelles conversations de messages privés avec les enfants tout en les gardant dans le répertoire
