---
title: "Finaliser l'enregistrement"
---

# Finaliser l'enregistrement

<div class="article-intro">

Une fois que vous avez vérifié votre foyer et effectué les affectations de groupes nécessaires, vous êtes prêt à finaliser l'enregistrement. C'est la dernière étape du parcours sur borne : l'application envoie la présence, imprime les étiquettes, puis se réinitialise pour la famille suivante.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- [Vérifiez votre foyer](./household-review) sur l'écran de vérification du foyer
- [Affectez des groupes](./group-assignment) aux membres de la famille qui doivent s'inscrire à une classe ou un programme précis
- Facultatif : [ajoutez les invités](./adding-guests) qui accompagnent votre famille

</div>

## Comment s'enregistrer

1. Depuis l'**écran de vérification du foyer**, appuyez sur le bouton **Enregistrement** en bas de l'écran.
2. L'application envoie les données de présence au serveur et affiche un **écran de succès** avec une coche verte et un message de bienvenue.

Il suffit de cela. La présence de votre famille a été enregistrée.

## Salles complètes et ratios de bénévoles

Si votre église a configuré des [limites de sécurité](../../b1-admin/attendance/checkin-safety) sur ses salles, le serveur les vérifie avant l'enregistrement :

- Si une salle sélectionnée est **complète ou fermée**, l'enregistrement n'aboutit pas et l'application indique le nom de la salle afin que vous puissiez en choisir une autre.
- Si le créneau de culte dispose d'un [calendrier d'enregistrement](../../b1-admin/attendance/setup#setting-a-check-in-schedule) et que sa fenêtre d'enregistrement n'est pas ouverte actuellement, l'enregistrement dans les salles de ce créneau est également refusé. L'écran **Impossible de s'enregistrer encore** affiche la salle avec la raison « l'enregistrement n'est pas ouvert actuellement » ; appuyez sur **Changer de salles** pour choisir un autre créneau de culte ou un autre groupe. (Les créneaux déjà clôturés sont affichés comme **Fermé** sur [l'écran du foyer](./household-review) et ne peuvent pas être sélectionnés ; vous ne verrez donc ce cas que si une fenêtre se ferme en cours d'enregistrement.)
- Un foyer déjà enregistré pour un créneau de culte antérieur peut revenir plus tard et ajouter un créneau ouvert, même après la fermeture de la fenêtre précédente. Ses enregistrements existants sont conservés et n'empêchent pas le nouvel enregistrement.
- Si une salle des enfants manque de **bénévoles** pour respecter son ratio, l'application affiche soit un avertissement qu'un membre du personnel peut confirmer pour continuer, soit bloque complètement l'enregistrement, selon la configuration de l'application des ratios par votre église.

## Impression des étiquettes

Si une imprimante réseau est configurée, l'application imprime automatiquement les étiquettes après l'enregistrement :

- Les **étiquettes de nom** sont imprimées pour chaque personne affectée à un groupe dont le paramètre **Imprimer l'étiquette de nom** est activé. Elles comportent le nom de la personne, son affectation de groupe et les informations d'allergies ou de remarques éventuellement enregistrées.
- Les **bulletins de retrait parental** sont imprimés lorsqu'une personne enregistrée appartient à un groupe dont le paramètre **Retrait parental** est activé. Les personnes enregistrées en tant que **Bénévole** sont ignorées : un employé de la garderie affecté à une salle de retrait parental ne reçoit donc pas de bulletin. Le bulletin énumère les enfants, leurs affectations de groupe et un **code de sécurité unique de 4 caractères**.

:::info
Le même code de sécurité apparaît sur l'étiquette de nom de l'enfant et sur le bulletin de retrait du parent. Au moment du retrait, les bénévoles comparent les codes pour vérifier que le bon adulte vient chercher chaque enfant.
:::

Le code de sécurité est généré à nouveau pour chaque enregistrement et n'utilise que des consonnes et des chiffres (les voyelles sont exclues pour éviter de former des mots inappropriés).

:::warning
Si les étiquettes ne s'impriment pas, ouvrez les paramètres d'administration en appuyant sept fois sur le **logo de l'église**, puis appuyez sur **Changer d'imprimante** pour vérifier la connexion de l'imprimante. Voir [Configuration de l'imprimante](../getting-started/printer-setup) pour les étapes de dépannage.
:::

## Ce qui se passe après l'enregistrement

- Si une imprimante est configurée, l'application imprime toutes les étiquettes, puis revient automatiquement à l'**écran de recherche**, prêt pour la famille suivante.
- Si aucune imprimante n'est configurée, l'application revient également automatiquement à l'**écran de recherche**.

Dans les deux cas, l'écran de succès reste affiché pendant au moins 6 secondes à compter de son apparition (8 secondes lorsqu'il célèbre le jalon de présence d'une personne), afin que les familles puissent voir que l'enregistrement a réussi. Si l'impression prend plus de temps, l'application revient environ une seconde et demie après la fin de l'impression.

Vous n'avez besoin d'appuyer sur rien pour revenir à l'écran de recherche : l'application gère la transition automatiquement. Une fois l'écran affiché pendant un moment, vous pouvez le toucher pour revenir immédiatement ; un appui dans la première seconde et demie est ignoré, de sorte qu'un double appui rapide sur **Enregistrement** ne saute pas cet écran.

:::tip
L'application se réinitialise complètement après chaque enregistrement : il n'y a donc aucun risque qu'une famille voie les informations d'une autre famille.
:::

## Ce qui est enregistré

Lorsque vous appuyez sur **Enregistrement**, l'application envoie au serveur, pour chaque membre du foyer ayant une affectation de groupe :

- la **personne** enregistrée ;
- le **service** auquel elle participe ;
- le **créneau de culte** et le **groupe** auxquels elle est affectée.

Ces données apparaissent dans B1 Admin, dans la section Présence, où les administrateurs de l'église peuvent consulter et gérer les enregistrements de présence. Voir le [guide d'administration de l'enregistrement](../../b1-admin/attendance/check-in.md) pour plus de détails.
