---
title: "Configuration de la présence"
---

# Configuration de la présence

<div class="article-intro">

Avant de pouvoir suivre la présence, vous devez dire à B1 Admin les emplacements physiques de votre église, quand les services ont lieu et quels groupes se réunissent à chaque service. Cette configuration unique crée la structure qui alimente tous le suivi de la présence et les rapports dans toute votre église.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Vous avez besoin d'un compte B1 Admin actif avec la permission de gérer la présence. Voir [Rôles et permissions](../people/roles-permissions.md) si vous n'êtes pas sûr de votre niveau d'accès.
- Si vous prévoyez d'assigner des groupes aux heures de service, assurez-vous que vos [groupes sont créés](../groups/creating-groups.md) d'abord.

</div>

## Concepts clés

- **Campus** -- un emplacement physique où votre église se réunit (par exemple, "Campus principal", "Campus nord"). Les campus sont gérés sous **Paramètres**.
- **Service** -- un rassemblement récurrent à un campus (par exemple, "Service du dimanche", "Médias").
- **Heure de service** -- une heure spécifique qu'un service a lieu (par exemple, "9h00", "11h00").
- **Groupe planifié** -- un groupe assigné à une heure de service spécifique. La présence est suivie dans le contexte de ce service.
- **Groupe non planifié** -- un groupe qui suit sa propre présence, sans être lié à une heure de service.

## Configuration de votre structure de présence

1. Ouvrez **B1 Admin**, cliquez sur le **menu de section** dans le coin supérieur gauche (le nom de la section avec la petite flèche) et choisissez **Personnes**.
2. Dans la barre de navigation, cliquez sur l'onglet **Présence**. L'onglet **Configuration** est sélectionné par défaut.
3. Cliquez sur **Gérer les campus** (haut à droite du panneau Configuration). Cela vous amène à **Paramètres → Campus**. Cliquez sur **Ajouter un campus**, entrez le nom de votre emplacement (l'adresse et le fuseau horaire sont optionnels), et cliquez sur **Enregistrer**.
4. Retournez à **Personnes → Présence → Configuration**. Votre campus apparaît maintenant dans le tableau de configuration.
5. Cliquez sur le **bouton + dans la colonne Service** sous votre campus. Entrez un nom de service comme "Service du dimanche" et cliquez sur **Enregistrer**.
6. Cliquez sur le **bouton + dans la colonne Heure** sous le service. Entrez une heure comme "9h00" et cliquez sur **Enregistrer**. Répétez pour chaque heure de service.
7. Pour connecter un groupe à une heure de service, ouvrez le groupe à partir de l'onglet **Groupes**, cliquez sur le crayon **Modifier**, et utilisez **Ajouter une heure de service** — voir la section suivante.

### Activation de Suivi de la présence sur un groupe

Avant qu'un groupe puisse avoir sa présence enregistrée, Suivi de la présence doit être activé pour ce groupe.

1. Cliquez sur **Groupes** dans la barre latérale et sélectionnez le groupe.
2. Cliquez sur l'icône crayon **Modifier**.
3. Définissez **Suivi de la présence** sur **Oui**.
4. Cliquez sur **Enregistrer**.

:::tip
Si vous avez assigné le groupe à une heure de service à l'étape précédente, utilisez aussi l'option **Ajouter une heure de service** sur l'écran de modification du groupe pour le lier au service correct. Cela garantit que les sessions sont connectées au bon campus et à la bonne heure.
:::

:::tip
Si un groupe se réunit en dehors d'un service régulier -- comme un petit groupe en milieu de semaine qui suit sa propre présence -- vous pouvez le laisser comme un groupe non planifié. Il apparaîtra toujours sur l'onglet Groupes pour le rapport de présence.
:::

## Modification de votre configuration

Vous pouvez mettre à jour votre configuration à tout moment. Sélectionnez un campus, une heure de service ou un groupe et cliquez sur **Modifier** pour changer ses détails, ou **Supprimer** pour le supprimer.

:::info
La suppression d'une heure de service ne supprime pas les dossiers de présence passés. Vos données historiques sont préservées même si vous changez votre horaire.
:::

## Prochaines étapes

Une fois vos campus, heures de service et groupes en place, vous êtes prêt à commencer à [enregistrer la présence](recording-attendance.md) manuellement ou à configurer l'[auto-enregistrement](check-in.md) pour vos services.
