---
title: "Finaliser l'enregistrement"
---

# Finaliser l'enregistrement

<div class="article-intro">

Une fois que vous avez vérifié votre foyer et effectué les affectations de groupes nécessaires, vous êtes prêt à finaliser l'enregistrement. C'est la dernière étape du parcours sur la borne -- l'application envoie les présences, imprime les étiquettes et se réinitialise pour la famille suivante.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- [Vérifiez votre foyer](./household-review) sur l'écran de vérification du foyer
- [Affectez des groupes](./group-assignment) aux membres de la famille qui doivent s'inscrire à une classe ou un programme précis
- Vous pouvez éventuellement [ajouter des visiteurs](./adding-guests) qui accompagnent votre famille

</div>

## Comment s'enregistrer

1. Depuis l'**écran de vérification du foyer**, touchez le bouton **Enregistrer** en bas de l'écran.
2. L'application envoie les données de présence au serveur et affiche un **écran de confirmation** avec une coche verte et un message de bienvenue.

Il suffit de cela. La présence de votre famille est enregistrée.

## Salles pleines et ratios de bénévoles

Si votre église a configuré des [limites de sécurité](../../b1-admin/attendance/checkin-safety) pour ses salles, le serveur les vérifie avant l'enregistrement :

- Si une salle sélectionnée est **pleine ou fermée**, l'enregistrement n'aboutit pas et l'application indique le nom de la salle afin que vous puissiez en choisir une autre.
- Si l'horaire de service comporte un [calendrier d'enregistrement](../../b1-admin/attendance/setup#setting-a-check-in-schedule) et que sa fenêtre d'enregistrement n'est pas ouverte en ce moment, l'enregistrement dans les salles de cet horaire est également refusé. L'écran **Enregistrement impossible pour le moment** affiche la salle avec la raison « l'enregistrement n'est pas ouvert actuellement » ; touchez **Changer de salles** pour choisir un autre horaire de service ou un autre groupe. (Les horaires de service déjà fermés au moment où vous [sélectionnez un service](./selecting-service#when-check-in-isnt-open) sont masqués ; vous ne verrez donc généralement ce message que si une fenêtre se ferme en cours d'enregistrement.)
- Si une salle pour enfants **manque de bénévoles** par rapport à son ratio, l'application affiche soit un avertissement qu'un membre du personnel peut confirmer pour continuer, soit bloque complètement l'enregistrement -- selon la manière dont votre église a configuré l'application des ratios.

## Impression des étiquettes

Si une imprimante réseau est configurée, l'application imprime automatiquement les étiquettes après l'enregistrement :

- Les **étiquettes nominatives** sont imprimées pour chaque personne affectée à un groupe dont le paramètre **Imprimer le badge** est activé. Ces étiquettes comportent le nom de la personne, son affectation de groupe et, le cas échéant, les allergies et remarques enregistrées.
- Les **bons de retrait pour les parents** sont imprimés lorsqu'une personne enregistrée appartient à un groupe dont le paramètre **Retrait par les parents** est activé. Les personnes enregistrées en tant que **Bénévole** sont ignorées : un animateur de garderie qui sert dans une salle de retrait par les parents ne reçoit donc pas de bon de retrait. Le bon de retrait liste les enfants, leurs affectations de groupes et un **code de sécurité** unique de **4 caractères**.

:::info
Le même code de sécurité figure à la fois sur l'étiquette nominative de l'enfant et sur le bon de retrait du parent. Au moment du retrait, les bénévoles comparent les codes pour vérifier que le bon adulte vient chercher chaque enfant.
:::

Le code de sécurité est généré à neuf pour chaque enregistrement et n'utilise que des consonnes et des chiffres (les voyelles sont exclues afin d'éviter de former des mots inappropriés).

:::warning
Si les étiquettes ne s'impriment pas, ouvrez les paramètres d'administration en touchant **le logo de l'église** sept fois, puis touchez **Changer d'imprimante** pour vérifier la connexion à l'imprimante. Consultez la [Configuration de l'imprimante](../getting-started/printer-setup) pour les étapes de dépannage.
:::

## Ce qui se passe après l'enregistrement

- Si une imprimante est configurée, l'application imprime toutes les étiquettes puis revient automatiquement à l'**écran de recherche**, prêt pour la famille suivante.
- Si aucune imprimante n'est configurée, l'écran de confirmation s'affiche pendant quelques secondes, puis revient automatiquement à l'**écran de recherche**.

Vous n'avez rien à toucher pour revenir à l'écran de recherche : l'application gère la transition automatiquement.

:::tip
L'application se réinitialise complètement après chaque enregistrement ; il n'y a donc aucun risque qu'une famille voie les informations d'une autre famille.
:::

## Ce qui est enregistré

Lorsque vous touchez **Enregistrer**, l'application envoie au serveur, pour chaque membre du foyer qui a une affectation de groupe :

- La **personne** enregistrée
- Le **service** qu'elle fréquente
- L'**horaire de service** et le **groupe** auxquels elle est affectée

Ces données apparaissent dans B1 Admin, dans la section Présences, où les administrateurs de votre église peuvent consulter et gérer les fiches de présence. Consultez le [guide d'administration de l'enregistrement](../../b1-admin/attendance/check-in.md) pour plus de détails.
