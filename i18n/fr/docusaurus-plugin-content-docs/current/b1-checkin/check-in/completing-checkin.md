---
title: "Finaliser l'enregistrement"
description: "Terminez l'enregistrement en borne d'une famille dans B1 Checkin : limites des salles, impression des étiquettes, codes de sécurité pour la récupération des enfants et ce que fait l'application ensuite."
---

# Finaliser l'enregistrement

<div class="article-intro">

Une fois que vous avez vérifié votre foyer et effectué les affectations de groupe nécessaires, vous êtes prêt à finaliser l'enregistrement. C'est la dernière étape du flux de travail en borne : l'application envoie la présence, imprime les étiquettes et se réinitialise pour la famille suivante.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- [Vérifiez votre foyer](./household-review.md) sur l'écran de vérification du foyer
- [Affectez des groupes](./group-assignment.md) aux membres de la famille qui doivent s'inscrire à une classe ou un programme particulier
- Facultatif : [ajoutez les invités](./adding-guests.md) qui accompagnent votre famille

</div>

## Comment enregistrer

1. Depuis l'**écran de vérification du foyer**, appuyez sur le bouton **Enregistrer** en bas de l'écran.
2. L'application envoie les données de présence au serveur et affiche un **écran de confirmation** avec une coche verte et un message de bienvenue.

C'est tout ce qu'il faut faire. La présence de votre famille a été enregistrée.

Si l'une des personnes sélectionnées s'est déjà enregistrée pour ce service aujourd'hui, une fenêtre **Déjà enregistré** s'affiche en premier et les nomme. Appuyez sur **Enregistrer à nouveau** pour sauvegarder leurs nouveaux choix de groupe, ou sur **Annuler** pour revenir à l'écran du foyer.

## Salles complètes et ratios de bénévoles

Si votre église a configuré des [limites de sécurité](../../b1-admin/attendance/checkin-safety.md) pour ses salles, le serveur les vérifie avant d'enregistrer :

- Si une salle sélectionnée est **complète ou fermée**, l'enregistrement n'aboutit pas et l'application nomme la salle afin que vous puissiez en choisir une autre.
- Si l'heure de service comporte un [calendrier d'enregistrement](../../b1-admin/attendance/setup.md#setting-a-check-in-schedule) et que sa fenêtre d'enregistrement n'est pas ouverte en ce moment, l'enregistrement dans les salles de cette heure de service est également refusé. L'écran **Impossible d'enregistrer pour le moment** affiche la salle avec la raison « l'enregistrement n'est pas ouvert actuellement » ; appuyez sur **Changer de salles** pour choisir une autre heure de service ou un autre groupe. (Les heures de service déjà fermées apparaissent comme **Fermé** sur l'[écran du foyer](./household-review.md) et ne peuvent pas être sélectionnées ; vous ne verrez donc généralement ce message que si une fenêtre se ferme pendant un enregistrement.)
- Un foyer qui s'est enregistré pour une heure de service antérieure peut revenir plus tard et ajouter une heure de service ouverte, même après la fermeture de la fenêtre précédente. Leurs enregistrements existants sont conservés et n'empêchent pas le nouvel enregistrement.
- Si une salle pour enfants manque de bénévoles pour son ratio, l'application affiche soit un avertissement qu'un membre du personnel peut confirmer pour continuer, soit bloque complètement l'enregistrement, selon la façon dont votre église a configuré l'application du ratio.

## Impression des étiquettes

Si une imprimante réseau est configurée, l'application imprime automatiquement les étiquettes après l'enregistrement :

- Les **étiquettes de nom** sont imprimées pour chaque personne affectée à un groupe dont le paramètre **Imprimer le badge** est activé. Elles comprennent le nom de la personne, son affectation de groupe et, s'il y en a, les informations sur les allergies ou les remarques.
- Les **coupons de récupération parent** sont imprimés lorsqu'une personne enregistrée figure dans un groupe dont le paramètre **Récupération parent** est activé. Les personnes enregistrées comme **Bénévole** sont ignorées : un employé de garderie qui sert dans une salle de récupération parent ne reçoit donc pas de coupon. Le coupon répertorie les enfants, leurs affectations de groupe et un **code de sécurité unique de 4 caractères**.

:::info
Le même code de sécurité apparaît sur l'étiquette de nom de l'enfant et sur le coupon de récupération du parent. Au moment de la récupération, les bénévoles comparent les codes pour vérifier que le bon adulte vient chercher chaque enfant.
:::

Le code de sécurité est généré à nouveau pour chaque enregistrement et n'utilise que des consonnes et des chiffres (les voyelles sont exclues afin d'éviter la formation de mots inappropriés).

:::warning
Si les étiquettes ne s'impriment pas, ouvrez les paramètres d'administration en appuyant sept fois sur le **logo de l'église**, puis appuyez sur **Changer d'imprimante** pour vérifier la connexion à l'imprimante. Consultez [Configuration de l'imprimante](../getting-started/printer-setup.md) pour les étapes de dépannage.
:::

## Ce qui se passe après l'enregistrement

- Si une imprimante est configurée, l'application imprime toutes les étiquettes puis revient automatiquement à l'**écran de recherche**, prêt pour la famille suivante.
- Si aucune imprimante n'est configurée, l'application revient également automatiquement à l'**écran de recherche**.

Dans les deux cas, l'écran de confirmation reste affiché pendant au moins 6 secondes à partir de son apparition (8 secondes lorsqu'il célèbre le jalon de présence d'une personne), afin que les familles puissent voir que l'enregistrement a réussi. Si l'impression prend plus de temps, l'application revient environ une seconde et demie après la fin de l'impression.

Vous n'avez pas besoin de toucher l'écran pour revenir à l'écran de recherche : l'application gère la transition automatiquement. Une fois l'écran affiché depuis un moment, vous pouvez appuyer dessus pour revenir immédiatement ; un appui dans la première seconde et demie est ignoré, de sorte qu'un double appui rapide sur **Enregistrer** ne saute pas cette étape.

:::tip
L'application se réinitialise complètement après chaque enregistrement ; il n'y a donc aucun risque qu'une famille voie les informations d'une autre famille.
:::

## Ce qui est enregistré

Lorsque vous appuyez sur **Enregistrer**, l'application envoie au serveur les éléments suivants pour chaque membre du foyer qui a une affectation de groupe :

- La **personne** enregistrée
- Le **service** auquel elle participe
- L'**heure de service** et le **groupe** auxquels elle est affectée

Ces données apparaissent dans B1 Admin, sous la section Présence, où les administrateurs de votre église peuvent consulter et gérer les registres de présence. Consultez le [guide d'administration de l'enregistrement](../../b1-admin/attendance/check-in.md) pour plus de détails.
