---
title: "Membres du groupe"
---

# Membres du groupe

<div class="article-intro">

Une fois que vous avez créé un groupe, l'étape suivante consiste à ajouter des membres. À partir de la page de détail d'un groupe, vous pouvez rechercher des personnes, les ajouter au groupe, désigner des responsables, envoyer des messages et exporter la liste des membres. La gestion de l'adhésion au groupe est essentielle pour coordonner les petits groupes, les comités et les classes.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Vous devez avoir au moins un groupe configuré dans B1 Admin. Consultez [Créer des groupes](creating-groups.md) si vous n'en avez pas encore créé un.
- Les personnes que vous souhaitez ajouter doivent déjà exister dans votre répertoire [Personnes](../people/adding-people.md).

</div>

## Ajouter des membres à un groupe

1. Accédez à la page **Groupes** et cliquez sur le groupe que vous souhaitez gérer.
2. Cliquez sur l'onglet **Membres**.
3. Dans la zone de recherche, tapez le nom de la personne que vous souhaitez ajouter.
4. Cliquez sur **Ajouter** à côté du nom de la personne dans les résultats de recherche.
5. La personne apparaît maintenant dans la liste des membres du groupe.

:::tip
Laissez la zone de recherche vide et cliquez sur **Rechercher** pour parcourir l'intégralité de votre répertoire. Ceci est utile si vous n'êtes pas sûr de l'orthographe exacte du nom de quelqu'un.
:::

## Désigner les responsables du groupe

Les responsables du groupe ont des privilèges spéciaux - ils peuvent modifier le [calendrier du groupe](group-calendar.md), gérer les événements et aider à coordonner le groupe.

1. Dans la liste des membres du groupe, trouvez la personne que vous souhaitez faire responsable.
2. Cliquez sur la **clé verte** à côté de son nom.
3. La personne est maintenant désignée comme responsable du groupe.

Pour supprimer le statut de responsable, cliquez à nouveau sur la clé verte.

:::info
N'importe quel membre du groupe peut consulter le calendrier du groupe et les événements, mais seuls les responsables peuvent ajouter ou modifier des événements du calendrier.
:::

## Envoyer des messages aux membres du groupe

Vous pouvez communiquer avec tous les membres d'un groupe directement à partir de B1 Admin :

1. À partir de la page de détail du groupe, recherchez la zone de messagerie.
2. Tapez votre message dans la zone de texte.
3. Cliquez sur **Envoyer**.

Votre message sera remis à tous les membres du groupe.

## Envoyer des e-mails aux membres du groupe

Vous pouvez envoyer des e-mails formatés à tous les membres d'un groupe :

1. À partir de la page de détail du groupe, cliquez sur l'**icône de courrier électronique**.
2. La boîte de dialogue Envoyer un e-mail s'ouvre, indiquant le nombre de membres qui recevront l'e-mail et le nombre de personnes qui n'ont pas d'adresse e-mail dans le dossier.
3. Sélectionnez éventuellement un **modèle d'e-mail** dans la liste déroulante, ou composez un message à partir de zéro. Cliquez sur **Gérer les modèles** pour créer ou modifier des modèles.
4. Entrez une **ligne d'objet**. Vous pouvez insérer des champs de fusion en cliquant sur les puces de champ : `{{firstName}}`, `{{lastName}}`, `{{displayName}}`, `{{email}}`, `{{churchName}}`.
5. Composez le **corps de l'e-mail** à l'aide de l'éditeur HTML. Les mêmes champs de fusion sont disponibles ici.
6. Cliquez sur **Envoyer**.
7. Un résumé indique le nombre d'e-mails envoyés avec succès et le nombre de membres ignorés (pas d'e-mail dans le dossier).

:::tip
Créez des modèles d'e-mail réutilisables pour les communications récurrentes telles que les mises à jour hebdomadaires, les annonces d'événements ou les demandes de prière. Les modèles font gagner du temps et assurent une messagerie cohérente.
:::

### Activer la messagerie de groupe pour votre église

Toutes les églises sur B1 envoient des e-mails à partir de la même adresse, elles partagent donc une réputation d'envoi. Pour maintenir les e-mails de tous en dehors des dossiers de spam, l'équipe ChurchApps examine chaque église une fois avant qu'elle ne puisse envoyer des e-mails de groupe.

Si votre église n'a pas encore été examinée, la boîte de dialogue Envoyer un e-mail affiche **La messagerie de groupe a besoin d'un examen rapide** au lieu de l'éditeur de messages :

1. Cliquez sur **Demander un examen**. L'équipe d'assistance ChurchApps est notifiée.
2. La boîte de dialogue devient **Examen demandé**. Vous pouvez la fermer.
3. La messagerie de groupe est généralement activée dans un jour ouvrable. Ouvrez à nouveau la boîte de dialogue Envoyer un e-mail après cela pour envoyer votre message.

Jusqu'à l'approbation de votre église, B1 n'envoie pas non plus les [e-mails de suivi du formulaire](../forms/creating-forms.md#sending-a-follow-up-email) ou l'étape **Envoyer un e-mail** dans les [flux de travail](../serving/workflows.md).

:::info Limites d'envoi
Après approbation, une église peut envoyer jusqu'à 150 e-mails écrits par l'église par jour. La limite augmente à mesure que votre église construit un historique d'envoi propre, jusqu'à 2 000 par jour. Si des messages récents ont rebondi ou ont été marqués comme spam, la messagerie de groupe s'interrompt et la boîte de dialogue vous demande de contacter le support. Si un envoi dépasserait votre limite quotidienne, B1 ne l'envoie pas et affiche une erreur.
:::

## Exporter les données du groupe

Pour télécharger la liste des membres du groupe en tant que fichier :

1. À partir de la page de détail du groupe, cliquez sur l'**icône de téléchargement**.
2. Un fichier CSV contenant les informations des membres du groupe sera téléchargé sur votre ordinateur.

Pour imprimer plutôt une feuille de présence pour une classe, utilisez **Imprimer la feuille de présence** - voir [Imprimer une feuille de présence](../attendance/recording-attendance.md#printing-a-roll-sheet).

Un export CSV est utile pour importer les données dans d'autres outils ou pour conserver des enregistrements hors ligne. Pour plus d'options d'export, voir [Exporter les données](../people/exporting-data.md).

## Envoyer des notifications push aux membres du groupe

Vous pouvez envoyer une notification push directement à tous les membres du groupe qui ont l'application B1.church installée sur leur appareil avec les notifications push activées.

1. À partir de la page de détail du groupe, cliquez sur l'**icône de cloche** dans la barre d'outils d'en-tête (à côté des icônes de courrier électronique et d'SMS).
2. Une boîte de dialogue s'ouvre, indiquant le nombre de membres de votre groupe qui ont activé les notifications push.
3. Remplissez les détails de la notification :
   - **Titre** *(requis)* -- Un court résumé, jusqu'à 80 caractères.
   - **Message** *(requis)* -- Le corps de la notification, jusqu'à 240 caractères.
   - **Ouvrir le lien ou l'URL du prospectus** *(facultatif)* -- Un chemin d'application relatif (par exemple, `/mobile/groups`) ou une URL `https://` complète qui s'ouvre quand la notification est tapotée.
   - **URL de l'image** *(facultatif)* -- Une URL `https://` vers une image qui apparaît à côté de la notification sur les appareils pris en charge.
4. Un aperçu en direct montre comment la notification apparaîtra sur l'appareil.
5. Cliquez sur **Envoyer la notification**.

:::info
Les notifications push sont remises uniquement aux membres du groupe qui ont installé le PWA B1.church et qui n'ont pas désactivé les notifications push. Les membres sans appareil push enregistré ou avec les notifications push désactivées sont comptabilisés comme ignorés, et le résumé d'envoi indique le nombre de personnes atteintes par rapport à celles ignorées.
:::

:::tip
Après l'envoi, la boîte de dialogue indique le nombre de notifications mises en file d'attente avec succès. Si la plupart des membres apparaissent comme ignorés, rappelez-leur de visiter leur site B1.church, de l'installer en tant qu'application d'écran d'accueil et d'autoriser les notifications lorsqu'ils y sont invités.
:::

## Supprimer des membres

Pour supprimer quelqu'un d'un groupe, localisez son nom dans la liste des membres et cliquez sur le bouton **Supprimer** à côté de son entrée.

:::info
La suppression d'une personne d'un groupe ne la supprime pas de votre répertoire d'église. Ils continueront à apparaître dans la section [Personnes](../people/adding-people.md) et pourront être rajoutés au groupe à tout moment.
:::
