---
title: "Membres du groupe"
---

# Membres du groupe

<div class="article-intro">

Une fois que vous avez créé un groupe, l'étape suivante consiste à ajouter des membres. À partir de la page de détails d'un groupe, vous pouvez rechercher des personnes, les ajouter au groupe, assigner des responsables, envoyer des messages et exporter la liste des membres. La gestion de l'adhésion au groupe est essentielle pour coordonner les petits groupes, les comités et les classes.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Vous devez avoir au moins un groupe configuré dans B1 Admin. Consultez [Créer des groupes](creating-groups.md) si vous n'en avez pas encore créé.
- Les personnes que vous souhaitez ajouter doivent déjà exister dans votre répertoire [Personnes](../people/adding-people.md).

</div>

## Ajouter des membres à un groupe

1. Accédez à la page **Groupes** et cliquez sur le groupe que vous souhaitez gérer.
2. Cliquez sur l'onglet **Membres**.
3. Dans la zone de recherche, tapez le nom de la personne que vous souhaitez ajouter.
4. Cliquez sur **Ajouter** à côté du nom de la personne dans les résultats de recherche.
5. La personne apparaît maintenant dans la liste des membres du groupe.

:::tip
Laissez la zone de recherche vide et cliquez sur **Rechercher** pour parcourir tout votre répertoire. C'est utile si vous n'êtes pas sûr de l'orthographe exacte du nom de quelqu'un.
:::

## Assigner des responsables de groupe

Les responsables de groupe ont des privilèges spéciaux : ils peuvent modifier le [calendrier du groupe](group-calendar.md), gérer les événements et aider à coordonner le groupe.

1. Dans la liste des membres du groupe, trouvez la personne que vous souhaitez désigner comme responsable.
2. Cliquez sur l'**icône de clé verte** à côté de son nom.
3. La personne est maintenant désignée comme responsable du groupe.

Pour supprimer le statut de responsable, cliquez à nouveau sur l'icône de clé verte.

:::info
Tout membre du groupe peut consulter le calendrier et les événements du groupe, mais seuls les responsables peuvent ajouter ou modifier les événements du calendrier.
:::

## Envoyer des messages aux membres du groupe

Vous pouvez communiquer avec tous les membres d'un groupe directement à partir de B1 Admin :

1. À partir de la page de détails du groupe, recherchez la zone de messagerie.
2. Tapez votre message dans la zone de texte.
3. Cliquez sur **Envoyer**.

Votre message sera remis à tous les membres du groupe.

## Envoyer des e-mails aux membres du groupe

Vous pouvez envoyer des e-mails formatés à tous les membres d'un groupe :

1. À partir de la page de détails du groupe, cliquez sur l'**icône d'e-mail**.
2. La boîte de dialogue Envoyer un e-mail s'ouvre, indiquant le nombre de membres qui recevront l'e-mail et combien n'ont pas d'adresse e-mail enregistrée.
3. Sélectionnez éventuellement un **modèle d'e-mail** dans la liste déroulante, ou rédigez un message à partir de zéro. Cliquez sur **Gérer les modèles** pour créer ou modifier des modèles.
4. Entrez une **ligne d'objet**. Vous pouvez insérer des champs de fusion en cliquant sur les puces de champ : `{{firstName}}`, `{{lastName}}`, `{{displayName}}`, `{{email}}`, `{{churchName}}`.
5. Rédigez le **corps de l'e-mail** à l'aide de l'éditeur HTML. Les mêmes champs de fusion sont disponibles ici.
6. Cliquez sur **Envoyer**.
7. Un résumé indique combien d'e-mails ont été envoyés avec succès et combien de membres ont été ignorés (pas d'e-mail enregistré).

:::tip
Créez des modèles d'e-mail réutilisables pour les communications récurrentes telles que les mises à jour hebdomadaires, les annonces d'événements ou les demandes de prière. Les modèles font gagner du temps et garantissent un message cohérent.
:::

## Exporter les données du groupe

Pour télécharger la liste des membres du groupe sous forme de fichier :

1. À partir de la page de détails du groupe, cliquez sur l'**icône de téléchargement**.
2. Un fichier CSV contenant les informations sur les membres du groupe sera téléchargé sur votre ordinateur.

C'est utile pour créer des listes imprimées, importer des données dans d'autres outils ou conserver des enregistrements hors ligne. Pour plus d'options d'export, consultez [Exporter les données](../people/exporting-data.md).

## Envoyer des notifications push aux membres du groupe

Vous pouvez envoyer une notification push directement à tous les membres du groupe qui ont l'application B1.church installée sur leur appareil et les notifications push activées.

1. À partir de la page de détails du groupe, cliquez sur l'**icône de cloche** dans la barre d'outils d'en-tête (à côté des icônes d'e-mail et SMS).
2. Une boîte de dialogue s'ouvre indiquant combien de membres de votre groupe ont activé les notifications push.
3. Remplissez les détails de la notification :
   - **Titre** *(obligatoire)* -- Un court résumé, jusqu'à 80 caractères.
   - **Message** *(obligatoire)* -- Le corps de la notification, jusqu'à 240 caractères.
   - **Ouvrir le lien ou l'URL du prospectus** *(facultatif)* -- Un chemin d'application relatif (par exemple, `/mobile/groups`) ou une URL complète `https://` qui s'ouvre quand on appuie sur la notification.
   - **URL de l'image** *(facultatif)* -- Une URL `https://` vers une image qui s'affiche à côté de la notification sur les appareils compatibles.
4. Un aperçu en direct montre comment la notification s'affichera sur l'appareil.
5. Cliquez sur **Envoyer la notification**.

:::info
Les notifications push sont livrées uniquement aux membres du groupe qui ont installé la PWA B1.church et n'ont pas désactivé les notifications push. Les membres sans appareil push enregistré ou avec les notifications désactivées sont comptés comme ignorés, et le résumé d'envoi indique combien ont été atteints par rapport à ceux qui ont été ignorés.
:::

:::tip
Après l'envoi, la boîte de dialogue indique combien de notifications ont été mises en file d'attente avec succès. Si la plupart des membres sont affichés comme ignorés, rappellez-leur de visiter leur site B1.church, de l'installer comme application d'écran d'accueil et d'autoriser les notifications quand demandé.
:::

## Supprimer des membres

Pour supprimer quelqu'un d'un groupe, localisez son nom dans la liste des membres et cliquez sur le bouton **supprimer** à côté de son entrée.

:::info
La suppression d'une personne d'un groupe ne la supprime pas de votre répertoire d'église. Elle apparaîtra toujours dans la section [Personnes](../people/adding-people.md) et peut être réajoutée au groupe à tout moment.
:::
