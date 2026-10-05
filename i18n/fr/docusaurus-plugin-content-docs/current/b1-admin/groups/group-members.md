---
title: "Membres du groupe"
---

# Membres du groupe

<div class="article-intro">

Une fois que vous avez créé un groupe, l'étape suivante consiste à ajouter des membres. À partir de la page de détail d'un groupe, vous pouvez rechercher des personnes, les ajouter au groupe, assigner des leaders, envoyer des messages et exporter la liste des membres. Gérer l'adhésion au groupe est essentiel pour coordonner les petits groupes, les comités et les classes.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Vous avez besoin d'au moins un groupe configuré dans B1 Admin. Voir [Creating Groups](creating-groups.md) si vous n'en avez pas créé un encore.
- Les personnes que vous voulez ajouter doivent déjà être dans votre [People](../people/adding-people.md) directory. Si quelqu'un ne l'est pas, vous pouvez les créer à partir de la recherche de membre (voir ci-dessous).

</div>

## Ajouter des membres à un groupe

1. Dans le [menu de saut](../introduction.md#getting-around-with-the-jump-menu), choisissez **People > Groups** et cliquez sur le groupe que vous voulez gérer.
2. Cliquez sur l'onglet **Members**.
3. Dans la boîte de recherche, tapez le nom de la personne que vous voulez ajouter.
4. Cliquez sur **Add** à côté du nom de la personne dans les résultats de la recherche.
5. La personne apparaît maintenant dans la liste des membres du groupe.

:::tip
Laissez la boîte de recherche vide et cliquez sur **Search** pour parcourir votre répertoire entier. Cela est utile si vous n'êtes pas sûr de l'orthographe exacte du nom de quelqu'un.
:::

### Ajouter quelqu'un qui n'est pas encore dans B1

Si votre recherche ne trouve personne, la recherche affiche **No records found** avec un lien **Add New Person**. Cliquez dessus, entrez le prénom, le nom et (optionnellement) l'email de la personne, et cliquez sur **Add**. La nouvelle personne est créée dans votre répertoire des personnes et ajoutée au groupe en une seule étape -- vous n'avez pas besoin de la rechercher à nouveau.

## Désigner les leaders de groupe

Les leaders de groupe ont des privilèges spéciaux -- ils peuvent modifier le [calendrier du groupe](group-calendar.md), gérer les événements et aider à coordonner le groupe.

1. Dans la liste des membres du groupe, trouvez la personne que vous voulez faire leader.
2. Cliquez sur l'**icône de clé verte** à côté de son nom.
3. La personne est maintenant désignée en tant que leader de groupe.

Pour supprimer le statut de leader, cliquez à nouveau sur l'icône de clé verte.

:::info
N'importe quel membre du groupe peut consulter le calendrier du groupe et les événements, mais seuls les leaders peuvent ajouter ou modifier les événements du calendrier.
:::

## Envoyer des messages aux membres du groupe

Vous pouvez communiquer avec tous les membres d'un groupe directement depuis B1 Admin :

1. Depuis la page de détail du groupe, cherchez la zone de messagerie.
2. Tapez votre message dans la boîte de texte.
3. Cliquez sur **Send**.

Votre message sera livré à tous les membres du groupe.

## Envoyer des emails aux membres du groupe

Vous pouvez envoyer des emails formatés à tous les membres d'un groupe :

1. Depuis la page de détail du groupe, cliquez sur l'**icône d'email**.
2. La boîte de dialogue Envoyer un email s'ouvre, affichant combien de membres recevront l'email et combien n'ont pas d'adresse email enregistrée.
3. Sélectionnez optionnellement un **email template** dans la liste déroulante, ou composez un message à partir de zéro. Cliquez sur **Manage Templates** pour créer ou modifier les templates.
4. Entrez une **subject line**. Vous pouvez insérer les champs de fusion en cliquant sur les chips de champ : `{{firstName}}`, `{{lastName}}`, `{{displayName}}`, `{{email}}`, `{{churchName}}`.
5. Composez le **corps de l'email** en utilisant l'éditeur HTML. Les mêmes champs de fusion sont disponibles ici.
6. Cliquez sur **Send**.
7. Un résumé affiche combien d'emails ont été envoyés avec succès et combien de membres ont été ignorés (pas d'email enregistré).

:::tip
Créez des templates d'email réutilisables pour les communications récurrentes comme les mises à jour hebdomadaires, les annonces d'événements ou les demandes de prière. Les templates économisent du temps et garantissent une messagerie cohérente.
:::

### Activer le courrier électronique de groupe pour votre église

Toutes les églises sur B1 envoient des emails à partir de la même adresse, elles partagent donc une réputation d'envoi. Pour garder l'email de tout le monde hors des dossiers de spam, l'équipe ChurchApps examine chaque église une fois avant qu'elle puisse envoyer du courrier électronique de groupe.

Si votre église n'a pas encore été examinée, la boîte de dialogue Envoyer un email affiche **Group email needs a quick review** à la place de l'éditeur de message :

1. Cliquez sur **Request review**. L'équipe de support ChurchApps est notifiée.
2. La boîte de dialogue change à **Review requested**. Vous pouvez la fermer.
3. Le courrier électronique de groupe est généralement activé dans un jour ouvrable. Ouvrez à nouveau la boîte de dialogue Envoyer un email après cela pour envoyer votre message.

Jusqu'à ce que votre église soit approuvée, B1 n'envoie pas non plus d'[emails de suivi de formulaire](../forms/creating-forms.md#sending-a-follow-up-email) ou l'étape **Send email** dans les [workflows](../serving/workflows.md).

:::info Limites d'envoi
Après approbation, une église peut envoyer jusqu'à 150 emails écrits par l'église par jour. La limite augmente à mesure que votre église établit un historique d'envoi propre, jusqu'à 2 000 par jour. Si les messages récents ont rebondi ou ont été marqués comme spam, le courrier électronique du groupe s'arrête et la boîte de dialogue vous demande de contacter le support. Si un envoi dépasserait votre limite quotidienne, B1 ne l'envoie pas et affiche une erreur.
:::

## Envoyer des messages texte aux membres du groupe

Une fois que votre église a connecté un [prestataire de textos](../settings/church-settings.md#texting), une icône de texte (**Text this group**) apparaît dans l'en-tête du groupe.

1. Depuis la page de détail du groupe, cliquez sur l'**icône de texte**.
2. La boîte de dialogue affiche combien de membres recevront le texte. Les membres sans numéro de téléphone mobile enregistré ou qui se sont désinscrits sont ignorés.
3. Tapez votre message. Pour le personnaliser, cliquez sur une chip d'espace réservé sous la boîte de message -- **First Name**, **Last Name**, **Display Name** ou **Church Name** -- pour l'insérer à votre curseur. Chaque espace réservé est rempli avec les propres détails du destinataire quand le texte est envoyé.
4. Cliquez sur **Send**.

Voir [Personalizing Texts with Merge Fields](../settings/church-settings.md#personalizing-texts-with-merge-fields) pour plus de détails.

## Exporter les données du groupe

Pour télécharger la liste des membres du groupe en tant que fichier :

1. Depuis la page de détail du groupe, cliquez sur l'**icône de téléchargement**.
2. Un fichier CSV contenant les informations des membres du groupe sera téléchargé sur votre ordinateur.

Pour imprimer une feuille de présence pour une classe à la place, utilisez **Print Roll Sheet** -- voir [Printing a Roll Sheet](../attendance/recording-attendance.md#printing-a-roll-sheet).

Un export CSV est utile pour importer des données dans d'autres outils, ou pour conserver des enregistrements hors ligne. Pour plus d'options d'export, voir [Exporting Data](../people/exporting-data.md).

## Envoyer des notifications push aux membres du groupe

Vous pouvez envoyer une notification push directement à tous les membres du groupe qui ont l'application B1.church installée sur leur appareil avec les notifications push activées.

1. Depuis la page de détail du groupe, cliquez sur l'**icône de cloche** dans la barre d'outils d'en-tête (à côté des icônes email et texte -- l'icône de texte apparaît une fois qu'un [prestataire de textos](../settings/church-settings.md#texting) est connecté).
2. Une boîte de dialogue s'ouvre affichant combien de membres de votre groupe ont le push activé.
3. Remplissez les détails de la notification :
   - **Title** *(requis)* -- Un bref résumé, jusqu'à 80 caractères.
   - **Message** *(requis)* -- Le corps de la notification, jusqu'à 240 caractères.
   - **Open link or flyer URL** *(optionnel)* -- Un chemin d'application relatif (par exemple, `/mobile/groups`) ou une URL complète `https://` que la notification ouvre quand elle est cliquée.
   - **Image URL** *(optionnel)* -- Une URL `https://` vers une image qui apparaît à côté de la notification sur les appareils pris en charge.
4. Un aperçu en direct affiche comment la notification apparaîtra sur l'appareil.
5. Cliquez sur **Send Notification**.

:::info
Les notifications push ne sont livrées qu'aux membres du groupe qui ont l'application web B1.church PWA installée et qui n'ont pas désactivé les notifications push. Les membres sans appareil push enregistré ou avec le push désactivé sont comptés comme ignorés, et le résumé d'envoi affiche combien ont été atteints par rapport à ignorés.
:::

:::tip
Après l'envoi, la boîte de dialogue affiche combien de notifications ont été mises en file d'attente avec succès. Si la plupart des membres s'affichent comme ignorés, rappelez-leur de visiter leur site B1.church, d'l'installer comme application d'écran d'accueil, et d'autoriser les notifications quand il le demande.
:::

## Supprimer des membres

Pour supprimer quelqu'un d'un groupe, localisez son nom dans la liste des membres et cliquez sur le bouton **remove** à côté de son entrée.

:::info
Supprimer une personne d'un groupe ne la supprime pas de votre répertoire d'église. Elle apparaîtra toujours dans la section [People](../people/adding-people.md) et peut être rajoutée au groupe à tout moment.
:::
