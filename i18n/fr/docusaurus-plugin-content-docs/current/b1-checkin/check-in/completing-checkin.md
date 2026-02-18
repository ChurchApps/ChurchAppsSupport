---
title: "Finalisation de l'enregistrement"
---

# Finalisation de l'enregistrement

<div class="article-intro">

Une fois que vous avez vérifié votre foyer et effectué les affectations de groupe nécessaires, vous êtes prêt à finaliser l'enregistrement. C'est la dernière étape du processus au kiosque -- l'application soumet la présence, imprime les étiquettes et se réinitialise pour la famille suivante.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- [Vérifiez votre foyer](./household-review) sur l'écran de vérification du foyer
- [Assignez des groupes](./group-assignment) aux membres de la famille qui doivent s'enregistrer dans une classe ou un programme spécifique
- Optionnellement, [ajoutez des visiteurs](./adding-guests) qui accompagnent votre famille

</div>

## Comment s'enregistrer

1. Depuis l'**écran de vérification du foyer**, appuyez sur le bouton **Check-in** en bas de l'écran.
2. L'application soumet les données de présence au serveur et affiche un **écran de confirmation** avec une coche verte et un message de bienvenue.

C'est tout ce qu'il faut faire. La présence de votre famille a été enregistrée.

## Impression des étiquettes

Si une imprimante réseau est configurée, l'application imprime automatiquement les étiquettes après l'enregistrement :

- **Les étiquettes nominatives** sont imprimées pour chaque personne assignée à un groupe dont le paramètre **Print Nametag** est activé. Les étiquettes nominatives incluent le nom de la personne, son affectation de groupe et les informations sur les allergies/notes le cas échéant.
- **Les reçus de récupération parentale** sont imprimés lorsqu'une personne enregistrée se trouve dans un groupe dont le paramètre **Parent Pickup** est activé. Le reçu de récupération liste les enfants, leurs affectations de groupe et un **code de sécurité unique à 4 caractères**.

:::info
Le même code de sécurité apparaît à la fois sur l'étiquette nominative de l'enfant et sur le reçu de récupération du parent. Au moment de la récupération, les bénévoles comparent les codes pour vérifier que le bon adulte récupère chaque enfant.
:::

Le code de sécurité est généré à chaque enregistrement et utilise uniquement des consonnes et des chiffres (les voyelles sont exclues pour éviter de former des mots inappropriés).

:::warning
Si les étiquettes ne s'impriment pas, vérifiez la barre d'état de l'imprimante en haut de l'écran. Vous pouvez appuyer dessus pour accéder aux paramètres de l'imprimante et vérifier la connexion. Consultez [Configuration de l'imprimante](../getting-started/printer-setup) pour les étapes de dépannage.
:::

## Ce qui se passe après l'enregistrement

- Si une imprimante est configurée, l'application imprime toutes les étiquettes puis revient automatiquement à l'**écran de recherche**, prête pour la famille suivante.
- Si aucune imprimante n'est configurée, l'écran de confirmation s'affiche pendant quelques secondes puis revient automatiquement à l'**écran de recherche**.

Vous n'avez pas besoin d'appuyer sur quoi que ce soit pour revenir à l'écran de recherche -- l'application gère la transition automatiquement.

:::tip
L'application se réinitialise complètement après chaque enregistrement, il n'y a donc aucun risque qu'une famille voie les informations d'une autre famille.
:::

## Ce qui est enregistré

Lorsque vous appuyez sur **Check-in**, l'application envoie les informations suivantes au serveur pour chaque membre du foyer ayant une affectation de groupe :

- La **personne** qui s'enregistre
- Le **culte** auquel elle assiste
- L'**horaire de culte** et le **groupe** auxquels elle est assignée

Ces données apparaissent dans B1 Admin dans la section Présence, où les administrateurs de votre église peuvent consulter et gérer les registres de présence. Consultez le [guide d'administration de l'enregistrement](../../b1-admin/attendance/check-in.md) pour plus de détails.
