---
title: "Finaliser l'enregistrement"
---

# Finaliser l'enregistrement

<div class="article-intro">

Une fois que vous avez passé en revue votre foyer et effectué les affectations de groupe nécessaires, vous êtes prêt à finaliser l'enregistrement. C'est la dernière étape du parcours au kiosque -- l'application soumet la présence, imprime les étiquettes et se réinitialise pour la famille suivante.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- [Passez en revue votre foyer](./household-review) sur l'écran de revue du foyer
- [Affectez des groupes](./group-assignment) à tout membre de la famille qui doit s'enregistrer dans une classe ou un programme spécifique
- Facultativement, [ajoutez des invités](./adding-guests) qui accompagnent votre famille

</div>

## Comment s'enregistrer

1. Depuis l'**écran de revue du foyer**, appuyez sur le bouton **Enregistrement** en bas de l'écran.
2. L'application soumet les données de présence au serveur et affiche un **écran de réussite** avec une coche verte et un message de bienvenue.

C'est tout ce qu'il faut faire. La présence de votre famille a été enregistrée.

## Salles complètes et ratios de bénévoles

Si votre église a configuré des [limites de sécurité](../../b1-admin/attendance/checkin-safety) sur ses salles, le serveur les vérifie avant d'enregistrer :

- Si une salle sélectionnée est **pleine ou fermée**, l'enregistrement n'aboutit pas et l'application nomme la salle afin que vous puissiez en choisir une autre.
- Si une salle pour enfants **manque de bénévoles** par rapport à son ratio, l'application affiche soit un avertissement qu'un membre du personnel peut confirmer pour continuer, soit bloque entièrement l'enregistrement -- selon la manière dont votre église a configuré l'application du ratio.

## Impression des étiquettes

Si une imprimante réseau est configurée, l'application imprime automatiquement les étiquettes après l'enregistrement :

- Des **étiquettes nominatives** sont imprimées pour chaque personne affectée à un groupe pour lequel le paramètre **Imprimer l'étiquette nominative** est activé. Les étiquettes nominatives comprennent le nom de la personne, son affectation de groupe et les informations d'allergies/notes si elles figurent au dossier.
- Des **bordereaux de récupération parentale** sont imprimés lorsqu'une personne enregistrée fait partie d'un groupe pour lequel le paramètre **Récupération par un parent** est activé. Le bordereau de récupération liste les enfants, leurs affectations de groupe et un **code de sécurité unique à 4 caractères**.

:::info
Le même code de sécurité apparaît à la fois sur l'étiquette nominative de l'enfant et sur le bordereau de récupération du parent. Au moment de la récupération, les bénévoles font correspondre les codes pour vérifier que le bon adulte récupère chaque enfant.
:::

Le code de sécurité est généré de manière unique pour chaque enregistrement et n'utilise que des consonnes et des chiffres (les voyelles sont exclues pour éviter de former des mots inappropriés).

:::warning
Si les étiquettes ne s'impriment pas, ouvrez les Paramètres d'administration en appuyant sept fois sur le **logo de l'église**, puis appuyez sur **Changer d'imprimante** pour vérifier la connexion de l'imprimante. Consultez [Configuration de l'imprimante](../getting-started/printer-setup) pour les étapes de dépannage.
:::

## Ce qui se passe après l'enregistrement

- Si une imprimante est configurée, l'application imprime toutes les étiquettes puis retourne automatiquement à l'**écran de recherche**, prêt pour la famille suivante.
- Si aucune imprimante n'est configurée, l'écran de réussite s'affiche pendant quelques secondes puis retourne automatiquement à l'**écran de recherche**.

Vous n'avez besoin d'appuyer sur rien pour revenir à l'écran de recherche -- l'application gère la transition automatiquement.

:::tip
L'application se réinitialise complètement après chaque enregistrement, il n'y a donc aucun risque qu'une famille voie les informations d'une autre famille.
:::

## Ce qui est enregistré

Lorsque vous appuyez sur **Enregistrement**, l'application envoie les informations suivantes au serveur pour chaque membre du foyer disposant d'une affectation de groupe :

- La **personne** qui s'enregistre
- Le **service** auquel elle assiste
- L'**heure du service** et le **groupe** auxquels elle est affectée

Ces données apparaissent dans B1 Admin sous la section Présence, où les administrateurs de votre église peuvent consulter et gérer les registres de présence. Consultez le [guide d'administration de l'enregistrement](../../b1-admin/attendance/check-in.md) pour plus de détails.
