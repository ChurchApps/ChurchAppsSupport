---
title: "Sécurité de l'enregistrement"
---

# Sécurité de l'enregistrement

<div class="article-intro">

B1 inclut un ensemble de contrôles de sécurité pour enfants lors de l'enregistrement : des limites de capacité de salle et des ratios bénévole/enfant, des indications d'âge et de niveau scolaire au kiosque, des types d'enregistrement qui distinguent les membres, les invités et les bénévoles, et une liste de personnes autorisées à récupérer les enfants par foyer, vérifiée au moment du départ. Cette page explique comment configurer chaque fonctionnalité de sécurité dans B1 Admin.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Configurez votre [structure de présence](setup.md) et vos [kiosques d'enregistrement](check-in.md)
- Les salles sont des [groupes](../groups/creating-groups.md) liés à des horaires de service — les paramètres de sécurité ci-dessous se trouvent sur le groupe
- L'appel des parents et la diffusion d'urgence nécessitent un fournisseur de messagerie texte connecté ([Text In Church](../integrations/services/text-in-church), [Clearstream](../integrations/services/clearstream), ou Mutual Ministry)

</div>

## Capacité de salle et fermeture d'une salle

Chaque salle d'enregistrement (groupe) peut appliquer ses propres limites. Ouvrez le groupe, cliquez sur l'**icône crayon** pour modifier ses paramètres, et trouvez la section **Capacité d'enregistrement** :

- **Capacité** -- Le nombre maximum de personnes pouvant être enregistrées dans cette salle en même temps. Lorsque la salle est pleine, l'enregistrement y est bloqué et le kiosque signale que la salle est complète.
- **Capacité invités** -- Un plafond distinct facultatif sur le nombre d'invités que la salle peut accueillir.
- **Fermée pour l'enregistrement** -- Réglez sur **Oui** pour arrêter immédiatement tous les enregistrements dans cette salle (par exemple, lorsqu'un cours est annulé ou qu'une salle est indisponible). Les départs continuent de fonctionner.

## Ratios de bénévoles

La même section **Capacité d'enregistrement** sur le groupe inclut des règles de personnel :

- **Enfants par bénévole** -- Le nombre maximum d'enfants que chaque bénévole enregistré peut encadrer (par exemple, 5 signifie un bénévole pour cinq enfants).
- **Bénévoles minimum** -- Le plus petit nombre de bénévoles devant être enregistrés avant que des enfants puissent être enregistrés dans la salle.

Les bénévoles comptent pour ces règles lorsqu'ils s'enregistrent avec le type **Bénévole** au kiosque (voir [Types d'enregistrement](#check-in-types) ci-dessous).

### Choisir entre avertir et bloquer

La rigueur de l'application des ratios est un paramètre à l'échelle de l'église :

1. Dans B1 Admin, allez à **Paramètres > Gérer l'église** et ouvrez la tuile **Enregistrement**.
2. Réglez **Application du ratio de bénévoles** :
   - **Avertir (autoriser avec confirmation)** -- Le kiosque affiche un avertissement lorsqu'une salle dépasse le ratio ou est en dessous de son minimum de bénévoles, et un membre du personnel peut confirmer pour continuer quand même. C'est l'option par défaut.
   - **Bloquer (empêcher l'enregistrement)** -- L'enregistrement dans la salle est refusé jusqu'à ce que suffisamment de bénévoles soient enregistrés.

:::info
La capacité et la fermeture pour l'enregistrement sont toujours des limites strictes — le choix avertir/bloquer s'applique uniquement aux ratios de bénévoles.
:::

## Types d'enregistrement

Chaque enregistrement note si la personne est un **Membre**, un **Invité** ou un **Bénévole**. Le type est choisi à l'aide de puces sur l'écran du foyer au kiosque (Membre est la valeur par défaut). Les types alimentent les règles de sécurité — les bénévoles fournissent la couverture des ratios, et les invités comptent dans la capacité invités de la salle.

## Indications d'âge et de niveau scolaire pour les salles

Vous pouvez donner à chaque salle des bornes d'âge ou de niveau scolaire afin que le kiosque guide les familles vers les salles appropriées :

- Dans les paramètres du groupe, utilisez la section **Âge et niveau scolaire** pour définir l'âge minimum/maximum (années et mois) et/ou le niveau scolaire de la salle.
- Au kiosque, les salles auxquelles un enfant est admissible sont mises en évidence et celles auxquelles il ne l'est pas sont estompées. Une salle estompée peut tout de même être choisie avec la confirmation d'un membre du personnel — l'indication ne bloque jamais complètement.

Les niveaux scolaires évoluent à la **date de passage de niveau** de votre église :

1. Dans B1 Admin, allez à **Paramètres > Gérer l'église** et ouvrez la tuile de passage de niveau.
2. Réglez le mois et le jour auxquels votre église fait passer les élèves au niveau supérieur (par exemple, le 1er août). Les âges et niveaux scolaires au kiosque sont calculés à partir de la date de passage la plus récente.

## Personnes autorisées et non autorisées à récupérer les enfants

Chaque foyer peut avoir une liste de personnes qui sont — ou ne sont pas — autorisées à récupérer ses enfants.

1. Ouvrez la page d'une personne dans **Personnes** et trouvez la carte **Récupération**.
2. Cliquez sur **Ajouter**. Recherchez une personne existante, ou ajoutez quelqu'un qui n'est pas dans le système en saisissant son **Nom**, sa **Relation** et une photo.
3. Réglez le **Statut** :
   - **Autorisé** -- Au départ, cette personne apparaît comme une carte de récupération sélectionnable avec sa photo, ce qui rend la vérification de récupération rapide.
   - **Non autorisé** -- Si quelqu'un tente une récupération sous ce nom, le kiosque bloque le départ avec un avertissement. Un membre du personnel peut passer outre, et cette dérogation est enregistrée sur le dossier de présence.

Cliquez sur la puce de statut d'une personne sur la carte pour basculer entre Autorisé et Non autorisé.

:::tip
Ajoutez des photos aux personnes autorisées à récupérer les enfants dès que possible — l'écran de départ affiche la photo afin que les bénévoles puissent vérifier visuellement la personne se tenant devant eux.
:::

## Appel des parents et diffusion d'urgence

Les deux fonctionnalités envoient des messages texte via le fournisseur de messagerie texte connecté de votre église — il n'y a pas de service SMS intégré, donc l'un des fournisseurs pris en charge doit d'abord être configuré.

- **Appeler un parent** -- Depuis l'écran de départ d'un kiosque encadré, le personnel peut envoyer un texto aux parents/tuteurs d'un enfant enregistré (par exemple, « Merci de venir à la nurserie »).
- **Diffusion d'urgence** -- Depuis les paramètres d'administration du kiosque, le personnel peut envoyer un texto à tous les tuteurs des foyers enregistrés pour le service sélectionné en une seule fois. L'envoi nécessite de taper **EMERGENCY** pour confirmer.

Les personnes qui ont refusé les textos, ou qui n'ont pas de numéro de mobile enregistré, sont automatiquement ignorées — le kiosque indique combien de messages ont été envoyés et combien ont été ignorés.

Consultez le déroulement côté kiosque dans [Départ et sécurité des enfants](../../b1-checkin/check-in/checking-out).

## Articles associés

- [Enregistrement](check-in.md) — configuration du kiosque et du matériel
- [Départ et sécurité des enfants](../../b1-checkin/check-in/checking-out) — le départ au kiosque, la vérification de récupération et les flux d'appel
- [Créer des groupes](../groups/creating-groups.md) — où se trouvent les paramètres de salle
- [Configuration de la présence](setup.md) — services, horaires de service et affectations de salle
