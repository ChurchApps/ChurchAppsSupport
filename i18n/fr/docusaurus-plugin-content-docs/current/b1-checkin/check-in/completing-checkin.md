---
title: "Fin de l'enregistrement"
---

# Fin de l'enregistrement

<div class="article-intro">

Après avoir examiné votre ménage et effectué les assignations de groupe nécessaires, vous êtes prêt à finaliser l'enregistrement. C'est la dernière étape du flux de travail du kiosque -- l'application soumet l'assistance, imprime les étiquettes et se réinitialise pour la famille suivante.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- [Examinez votre ménage](./household-review) sur l'écran d'examen du ménage
- [Assignez les groupes](./group-assignment) à tous les membres de la famille qui doivent s'enregistrer dans une classe ou un programme spécifique
- [Ajoutez éventuellement les invités](./adding-guests) qui visitent avec votre famille

</div>

## Comment s'enregistrer

1. À partir de l'**écran d'examen du ménage**, appuyez sur le bouton **Check-in** au bas de l'écran.
2. L'application soumet les données de participation au serveur et affiche un **écran de succès** avec une coche verte et un message de bienvenue.

C'est tout ce qu'il faut. L'assistance de votre famille a été enregistrée.

## Salles pleines et ratios de bénévoles

Si votre église a configuré des [limites de sécurité](../../b1-admin/attendance/checkin-safety) sur ses salles, le serveur les vérifie avant l'enregistrement:

- Si une salle sélectionnée est **pleine ou fermée**, l'enregistrement ne se fait pas et l'application nomme la salle pour que vous puissiez en choisir une autre.
- Si une salle pour enfants est **à court de bénévoles** pour son ratio, l'application affiche soit un avertissement qu'un membre du personnel peut confirmer pour continuer, soit bloque complètement l'enregistrement -- selon la façon dont votre église a configuré l'application des ratios.

## Impression d'étiquettes

Si une imprimante réseau est configurée, l'application imprime automatiquement les étiquettes après l'enregistrement:

- Les **étiquettes de nom** sont imprimées pour chaque personne assignée à un groupe qui a le paramètre **Print Nametag** activé. Les étiquettes de nom incluent le nom de la personne, son assignation de groupe et les informations d'allergie/notes le cas échéant.
- Les **listes de retrait des parents** sont imprimées lorsqu'une personne enregistrée se trouve dans un groupe qui a le paramètre **Parent Pickup** activé. Les personnes enregistrées en tant que **Volunteer** sont ignorées, donc un travailleur de garde d'enfants servant dans une salle Parent Pickup ne reçoit pas de bordereau de retrait. La bordereau de retrait répertorie les enfants, leurs assignations de groupe et un unique **code de sécurité à 4 caractères**.

:::info
Le même code de sécurité apparaît à la fois sur l'étiquette de nom de l'enfant et sur la bordereau de retrait des parents. Au moment du retrait, les bénévoles font correspondre les codes pour vérifier que le bon adulte reprend chaque enfant.
:::

Le code de sécurité est généré à nouveau pour chaque enregistrement et utilise uniquement les consonnes et les chiffres (les voyelles sont exclues pour éviter de former des mots inappropriés).

:::warning
Si les étiquettes ne s'impriment pas, ouvrez les paramètres Admin en appuyant sur le **logo d'église** sept fois, puis appuyez sur **Change Printer** pour vérifier la connexion de l'imprimante. Voir [Printer Setup](../getting-started/printer-setup) pour les étapes de dépannage.
:::

## Ce qui se passe après l'enregistrement

- Si une imprimante est configurée, l'application imprime toutes les étiquettes, puis retourne automatiquement à l'**écran de recherche**, prête pour la famille suivante.
- Si aucune imprimante n'est configurée, l'écran de succès s'affiche pendant quelques secondes, puis revient automatiquement à l'**écran de recherche**.

Vous n'avez pas besoin d'appuyer sur rien pour revenir à l'écran de recherche -- l'application gère la transition automatiquement.

:::tip
L'application se réinitialise complètement après chaque enregistrement, il n'y a donc aucun risque qu'une famille voie les informations d'une autre famille.
:::

## Ce qui est enregistré

Lorsque vous appuyez sur **Check-in**, l'application envoie le suivant au serveur pour chaque membre du ménage qui a une assignation de groupe:

- La **personne** en cours d'enregistrement
- Le **service** qu'ils assistent
- L'**heure du service** et le **groupe** auquel ils sont assignés

Ces données apparaissent dans B1 Admin sous la section Attendance, où les administrateurs de votre église peuvent afficher et gérer les enregistrements de participation. Voir le [guide d'administration de l'enregistrement](../../b1-admin/attendance/check-in.md) pour les détails.
