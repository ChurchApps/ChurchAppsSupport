---
title: "Terminer l'enregistrement"
---

# Terminer l'enregistrement {#completing-check-in}

<div class="article-intro">

Une fois que vous avez vérifié votre foyer et attribué les groupes nécessaires, vous êtes prêt à finaliser l'enregistrement. C'est la dernière étape du parcours sur la borne -- l'application transmet les présences, imprime les étiquettes et se réinitialise pour la famille suivante.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- [Vérifiez votre foyer](./household-review) sur l'écran de vérification du foyer
- [Attribuez des groupes](./group-assignment) aux membres de la famille qui doivent s'inscrire à une classe ou à un programme précis
- Facultatif : [ajoutez les invités](./adding-guests) qui accompagnent votre famille

</div>

## Comment s'enregistrer {#how-to-check-in}

1. Depuis l'**écran de vérification du foyer**, touchez le bouton **Enregistrer** au bas de l'écran.
2. L'application transmet les données de présence au serveur et affiche un **écran de confirmation** avec une coche verte et un message de bienvenue.

Il suffit de cela. La présence de votre famille a été enregistrée.

## Salles pleines et ratios de bénévoles {#full-rooms-and-volunteer-ratios}

Si votre église a configuré des [limites de sécurité](../../b1-admin/attendance/checkin-safety) pour ses salles, le serveur les vérifie avant d'enregistrer :

- Si une salle sélectionnée est **pleine ou fermée**, l'enregistrement n'aboutit pas et l'application indique le nom de la salle afin que vous puissiez en choisir une autre.
- Si l'heure de service comporte un [calendrier d'enregistrement](../../b1-admin/attendance/setup#setting-a-check-in-schedule) et que sa fenêtre d'enregistrement n'est pas ouverte en ce moment, l'enregistrement dans les salles de cette heure de service est également refusé. L'écran **Impossible de s'enregistrer pour l'instant** indique la salle avec la raison « l'enregistrement n'est pas ouvert en ce moment »; touchez **Changer de salles** pour choisir une autre heure de service ou un autre groupe. (Les heures de service déjà fermées sont affichées comme **Fermé** sur [l'écran du foyer](./household-review) et ne peuvent pas être choisies; vous ne verrez donc généralement cela que si une fenêtre se ferme pendant un enregistrement.)
- Un foyer qui s'est enregistré pour une heure de service antérieure peut revenir plus tard et ajouter une heure de service ouverte, même après la fermeture de la fenêtre précédente. Ses enregistrements existants sont conservés et n'entraînent pas le refus du nouvel enregistrement.
- Si une salle pour enfants manque de **bénévoles** pour respecter son ratio, l'application affiche soit un avertissement qu'un membre du personnel peut confirmer pour continuer, soit bloque complètement l'enregistrement, selon la manière dont votre église a configuré l'application des ratios.

## Impression des étiquettes {#label-printing}

Si une imprimante réseau est configurée, l'application imprime automatiquement les étiquettes après l'enregistrement :

- Des **étiquettes de nom** sont imprimées pour chaque personne attribuée à un groupe dont le paramètre **Imprimer l'étiquette** est activé. Les étiquettes de nom comprennent le nom de la personne, son groupe et, le cas échéant, les informations sur les allergies et les notes enregistrées.
- Des **bulletins de retrait parental** sont imprimés lorsqu'une personne enregistrée appartient à un groupe dont le paramètre **Retrait parental** est activé. Les personnes enregistrées comme **Bénévole** sont ignorées; ainsi, une personne de garderie qui sert dans une salle de retrait parental ne reçoit pas de bulletin. Le bulletin de retrait affiche les enfants, leurs groupes et un **code de sécurité de 4 caractères** unique.

:::info
Le même code de sécurité apparaît à la fois sur l'étiquette de nom de l'enfant et sur le bulletin de retrait du parent. Au moment du retrait, les bénévoles comparent les codes pour vérifier que le bon adulte vient chercher chaque enfant.
:::

Le code de sécurité est généré à nouveau pour chaque enregistrement et n'utilise que des consonnes et des chiffres (les voyelles sont exclues afin d'éviter la formation de mots inappropriés).

:::warning
Si les étiquettes ne s'impriment pas, ouvrez les paramètres d'administration en touchant le **logo de l'église** sept fois, puis touchez **Changer d'imprimante** pour vérifier la connexion de l'imprimante. Consultez [Configuration de l'imprimante](../getting-started/printer-setup) pour les étapes de dépannage.
:::

## Ce qui se passe après l'enregistrement {#what-happens-after-check-in}

- Si une imprimante est configurée, l'application imprime toutes les étiquettes, puis revient automatiquement à l'**écran de recherche**, prêt pour la famille suivante.
- Si aucune imprimante n'est configurée, l'écran de confirmation s'affiche pendant quelques secondes, puis revient automatiquement à l'**écran de recherche**.

Vous n'avez rien à toucher pour revenir à l'écran de recherche -- l'application gère la transition automatiquement.

:::tip
L'application se réinitialise complètement après chaque enregistrement; il n'y a donc aucun risque qu'une famille voie les informations d'une autre famille.
:::

## Ce qui est enregistré {#what-gets-recorded}

Lorsque vous touchez **Enregistrer**, l'application envoie les informations suivantes au serveur pour chaque membre du foyer ayant une attribution de groupe :

- La **personne** enregistrée
- Le **service** auquel elle assiste
- L'**heure de service** et le **groupe** auxquels elle est attribuée

Ces données apparaissent dans B1 Admin, sous la section Présences, où les administrateurs de votre église peuvent consulter et gérer les registres de présence. Consultez le [guide d'administration de l'enregistrement](../../b1-admin/attendance/check-in.md) pour plus de détails.
