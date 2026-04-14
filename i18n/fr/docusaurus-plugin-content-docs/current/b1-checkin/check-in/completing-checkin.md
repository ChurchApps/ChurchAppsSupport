---
title: "Compléter l'accueil"
---

# Compléter l'accueil

<div class="article-intro">

Une fois que vous avez examiné votre ménage et effectué les affectations de groupe nécessaires, vous êtes prêt à finaliser l'accueil. C'est la dernière étape du flux de kiosque -- l'application soumet la présence, imprime les étiquettes et se réinitialise pour la prochaine famille.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- [Examinez votre ménage](./household-review) sur l'écran d'examen du ménage
- [Assignez les groupes](./group-assignment) à tous les membres de la famille qui ont besoin de s'enregistrer dans une classe ou un programme spécifique
- Optionnellement [ajoutez des invités](./adding-guests) qui visitent avec votre famille

</div>

## Comment s'enregistrer

1. À partir de l'**écran d'examen du ménage**, appuyez sur le bouton **Accueil** au bas de l'écran.
2. L'application soumet les données de présence au serveur et affiche un **écran de succès** avec une coche verte et un message de bienvenue.

C'est tout ce qu'il faut. La présence de votre famille a été enregistrée.

## Impression d'étiquettes

Si une imprimante réseau est configurée, l'application imprime automatiquement les étiquettes après l'accueil :

- Les **étiquettes de noms** sont imprimées pour chaque personne assignée à un groupe qui a le paramètre **Imprimer l'étiquette de nom** activé. Les étiquettes de noms incluent le nom de la personne, son affectation de groupe et les informations d'allergies/notes si elles sont en dossier.
- Les **bulletins de récupération des parents** sont imprimés quand une personne enregistrée se trouve dans un groupe qui a le paramètre **Récupération parentale** activé. Le bulletin de récupération énumère les enfants, leurs affectations de groupe et un **code de sécurité à 4 caractères** unique.

:::info
Le même code de sécurité apparaît sur l'étiquette de nom de l'enfant et sur le bulletin de récupération du parent. Au moment de la récupération, les bénévoles font correspondre les codes pour vérifier que le bon adulte récupère chaque enfant.
:::

Le code de sécurité est généré à nouveau pour chaque accueil et utilise uniquement les consonnes et les chiffres (les voyelles sont exclues pour éviter de former des mots inappropriés).

:::warning
Si les étiquettes n'impriment pas, ouvrez les paramètres d'administration en appuyant sur le **logo de l'église** sept fois, puis appuyez sur **Changer d'imprimante** pour vérifier la connexion de l'imprimante. Consultez [Configuration de l'imprimante](../getting-started/printer-setup) pour les étapes de dépannage.
:::

## Que se passe-t-il après l'accueil

- Si une imprimante est configurée, l'application imprime toutes les étiquettes puis revient automatiquement à l'**écran de recherche**, prêt pour la prochaine famille.
- Si aucune imprimante n'est configurée, l'écran de succès s'affiche pendant quelques secondes puis revient automatiquement à l'**écran de recherche**.

Vous n'avez pas besoin d'appuyer sur quoi que ce soit pour revenir à l'écran de recherche -- l'application gère la transition automatiquement.

:::tip
L'application se réinitialise complètement après chaque accueil, il n'y a donc aucun risque qu'une famille voie les informations d'une autre famille.
:::

## Ce qui est enregistré

Lorsque vous appuyez sur **Accueil**, l'application envoie ce qui suit au serveur pour chaque membre du ménage qui a une affectation de groupe :

- La **personne** enregistrée
- Le **service** auquel ils assistent
- L'**heure de service** et le **groupe** auxquels ils sont assignés

Ces données apparaissent dans B1 Admin sous la section Présence, où vos administrateurs d'église peuvent afficher et gérer les dossiers de présence. Consultez le [guide d'administration de l'accueil](../../b1-admin/attendance/check-in.md) pour plus de détails.
