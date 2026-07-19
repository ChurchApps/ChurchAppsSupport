---
title: "Finaliser l'enregistrement"
---

# Finaliser l'enregistrement

<div class="article-intro">

Une fois que vous avez examiné votre ménage et effectué les attributions de groupes nécessaires, vous êtes prêt à finaliser l'enregistrement. C'est la dernière étape du flux de travail du kiosque : l'application soumet la présence, imprime les étiquettes et réinitialise pour la famille suivante.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- [Examinez votre ménage](./household-review) sur l'écran d'examen du ménage
- [Attribuez des groupes](./group-assignment) à tous les membres de la famille qui doivent s'enregistrer pour une classe ou un programme spécifique
- Éventuellement, [ajoutez des invités](./adding-guests) qui visitent votre famille

</div>

## Comment vous enregistrer

1. À partir de l'**écran d'examen du ménage**, appuyez sur le bouton **Check-in** au bas de l'écran.
2. L'application soumet les données de présence au serveur et affiche un **écran de succès** avec une coche verte et un message de bienvenue.

C'est tout ce qu'il faut. La présence de votre famille a été enregistrée.

## Salles pleines et ratios de bénévoles

Si votre église a configuré des [limites de sécurité](../../b1-admin/attendance/checkin-safety) sur ses salles, le serveur les vérifie avant d'enregistrer :

- Si une salle sélectionnée est **pleine ou fermée**, l'enregistrement n'aboutit pas et l'application nomme la salle pour que vous puissiez en choisir une autre.
- Si une salle pour enfants est **à court de bénévoles** pour son ratio, l'application affiche soit un avertissement qu'un membre du personnel peut confirmer pour continuer, soit bloque complètement l'enregistrement, selon la façon dont votre église a configuré l'application du ratio.

## Impression d'étiquettes

Si une imprimante réseau est configurée, l'application imprime automatiquement les étiquettes après l'enregistrement :

- Les **étiquettes nominatives** sont imprimées pour chaque personne assignée à un groupe ayant le paramètre **Print Nametag** activé. Les étiquettes nominatives incluent le nom de la personne, son attribution de groupe et les informations d'allergies/notes s'il y en a un fichier.
- Les **bordereaux de récupération des parents** sont imprimés lorsqu'une personne enregistrée se trouve dans un groupe ayant le paramètre **Parent Pickup** activé. Le bordereau liste les enfants, leurs attributions de groupe et un **code de sécurité à 4 caractères** unique.

:::info
Le même code de sécurité apparaît à la fois sur l'étiquette nominative de l'enfant et sur le bordereau de récupération du parent. Au moment de la récupération, les bénévoles font correspondre les codes pour vérifier que le bon adulte récupère chaque enfant.
:::

Le code de sécurité est généré à nouveau pour chaque enregistrement et utilise uniquement des consonnes et des chiffres (les voyelles sont exclues pour éviter de former des mots inappropriés).

:::warning
Si les étiquettes ne s'impriment pas, ouvrez les paramètres d'administration en appuyant sur le **logo de l'église** sept fois, puis appuyez sur **Change Printer** pour vérifier la connexion de l'imprimante. Consultez [Configuration de l'imprimante](../getting-started/printer-setup) pour obtenir des étapes de dépannage.
:::

## Ce qui se passe après l'enregistrement

- Si une imprimante est configurée, l'application imprime toutes les étiquettes, puis revient automatiquement à l'**écran de recherche**, prêt pour la famille suivante.
- Si aucune imprimante n'est configurée, l'écran de succès s'affiche pendant quelques secondes, puis revient automatiquement à l'**écran de recherche**.

Vous n'avez besoin de rien appuyer pour revenir à l'écran de recherche : l'application gère la transition automatiquement.

:::tip
L'application se réinitialise complètement après chaque enregistrement, il n'y a donc aucun risque qu'une famille voie les informations d'une autre famille.
:::

## Ce qui est enregistré

Lorsque vous appuyez sur **Check-in**, l'application envoie les éléments suivants au serveur pour chaque membre du ménage ayant une attribution de groupe :

- La **personne** qui s'enregistre
- Le **service** auquel ils assistent
- L'**heure du service** et le **groupe** auquel ils sont assignés

Ces données apparaissent dans B1 Admin sous la section Présence, où vos administrateurs d'église peuvent voir et gérer les dossiers de présence. Consultez le [guide d'administration de l'enregistrement](../../b1-admin/attendance/check-in.md) pour plus de détails.