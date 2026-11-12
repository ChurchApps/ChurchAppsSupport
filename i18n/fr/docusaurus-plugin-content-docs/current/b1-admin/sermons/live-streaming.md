---
title: "Horaires de diffusion en direct et configuration dans B1 Admin"
sidebar_label: "Diffusion en direct"
description: "Planifiez des services de diffusion en direct hebdomadaires ou ponctuels, réglez le moment d'activation du clavardage et de la vidéo, connectez une chaîne YouTube et résolvez les problèmes d'intégration dans B1 Admin."
---

# Diffusion en direct

<div class="article-intro">

La page Horaires de diffusion en direct vous permet de configurer le calendrier de diffusion de votre église, de gérer les horaires de services et de personnaliser l'expérience des spectateurs. Définissez des services hebdomadaires récurrents ou des événements ponctuels, configurez les paramètres de clavardage et de vidéo, et contrôlez le moment où votre diffusion démarre.

</div>

## Vidéo de formation {#training-video}

<YouTube id="tpEY-sEYW6A" title="Configurer la diffusion en direct dans B1" next="Personnaliser l'application membre de votre église dans B1" nextUrl="/docs/b1-admin/settings/mobile-app" />

<div class="prereqs">
<h4>Avant de commencer</h4>

- Vous avez besoin de l'autorisation **Modifier les services** dans la section **Contenu** de votre rôle. Voir [Rôles et autorisations](../settings/roles-permissions.md) si vous n'y avez pas accès.
- Ayez à portée de main l'identifiant de votre chaîne YouTube si vous prévoyez d'utiliser la diffusion en direct automatisée
- Ajoutez au moins une [prédication](./managing-sermons.md) ou une URL de diffusion en direct permanente pour servir de source à votre diffusion

</div>

La diffusion en direct se gère depuis deux pages de la section **Prédications** du menu de navigation rapide : **Horaires de diffusion en direct** pour gérer le calendrier de diffusion, et **Paramètres** pour configurer les onglets de votre page de diffusion.

## Gérer les services {#managing-services}

### Ajouter un service {#adding-a-service}

1. Dans B1 Admin, ouvrez le [menu de navigation rapide](../introduction.md#getting-around-with-the-jump-menu) (la barre de recherche en haut à gauche), développez **Prédications** et cliquez sur **Horaires de diffusion en direct**.
2. Cliquez sur le bouton **Ajouter un service** en haut de la page pour créer un nouveau service planifié. Les services existants sont listés dans un tableau indiquant le nom de chaque service (avec un repère **Hebdomadaire** pour les services récurrents), l'heure, le fournisseur et la durée ; survolez une ligne et cliquez sur l'icône de modification pour la changer.
3. Saisissez un **nom de service** (par exemple, « Dimanche matin »). Les nouveaux services commencent par « Dimanche matin ».
4. Définissez l'**heure du service** -- choisissez la date et l'heure de début de votre service. Les nouveaux services commencent à 9 h 00 le prochain dimanche.
5. Réglez **Récurrence hebdomadaire** sur **Oui** (**Hebdomadaire**) pour les services hebdomadaires réguliers, ou sur **Non** (**Ponctuel**) pour un événement ponctuel.

### Configurer le clavardage et la vidéo {#configuring-chat-and-video-settings}

6. Sous **Paramètres du clavardage**, définissez **Activer le clavardage - minutes avant** et **Activer le clavardage - minutes après** -- le nombre de minutes avant et après le service pendant lesquelles le clavardage doit être activé (10 chacune pour un nouveau service). Cela permet aux visiteurs de commencer à discuter avant le service et de continuer après. L'heure affichée à côté de chaque case indique quand le clavardage s'ouvre et se ferme.
7. Sous **Paramètres vidéo**, définissez **Démarrer la vidéo en avance** -- le nombre de minutes d'avance avec lequel démarrer le flux vidéo, pour un compte à rebours ou un contenu avant le service. Le clavardage s'ouvre ce nombre de minutes *avant* le début anticipé de la vidéo ; l'heure affichée à côté du réglage des minutes avant le clavardage tient donc compte des deux valeurs. Par exemple, pour un service à 10 h avec 15 minutes de clavardage avant et un démarrage anticipé de 5 minutes, le clavardage s'ouvre à 9 h 40.
8. Choisissez le contenu à diffuser dans la liste déroulante **Prédication** :
   - **Dernière prédication** (**Automatique**) -- Diffuse automatiquement la vidéo ajoutée le plus récemment.
   - Vos [URL de diffusion en direct permanentes](#setting-up-your-youtube-live-stream), listées ensuite -- chacune diffuse le direct en cours de votre chaîne YouTube, à partir de votre identifiant de chaîne. Une nouvelle URL s'appelle **Service en direct actuel** à moins que vous ne la renommiez.
   - Ci-dessous, toute prédication précise que vous avez déjà enregistrée.
9. Cliquez sur **Enregistrer** pour planifier votre service, ou sur **Annuler** pour fermer le formulaire.

Pour supprimer un service, modifiez-le, cliquez sur **Supprimer** et confirmez.

:::info
Si le service est récurrent, il se mettra à jour automatiquement chaque semaine. Il reste à la même heure locale lors du début ou de la fin de l'heure d'été. Vous pouvez ajouter autant de services que nécessaire. Les visiteurs verront le prochain service planifié lorsqu'ils consulteront votre page de diffusion.
:::

## Paramètres de la page de diffusion {#streaming-page-settings}

Pour personnaliser les onglets et les liens qui apparaissent à côté de votre diffusion en direct, ouvrez le menu de navigation rapide, développez **Prédications** et cliquez sur **Paramètres**. La page **Paramètres de diffusion** affiche votre liste d'**onglets de contenu**, dans l'ordre où les spectateurs les voient. Les onglets de lien externe ouvrent leur lien dans un nouvel onglet du navigateur lorsque vous cliquez dessus.

### Ajouter des onglets {#adding-tabs}

1. Cliquez sur le bouton **Ajouter** pour ajouter un nouvel onglet à votre page de diffusion en direct. La boîte de dialogue **Créer un nouvel onglet** s'ouvre.
2. Saisissez le nom de l'onglet dans la case **Texte de l'onglet**, puis choisissez une **icône** en cliquant sur le bouton d'icône.
3. Choisissez un **type de lien** : **URL externe** pour un lien personnalisé (par défaut), ou l'un des onglets intégrés **Clavardage** ou **Prière**.
4. Pour un onglet URL externe, saisissez l'adresse dans la case **URL externe**. Les onglets Clavardage et Prière ne nécessitent rien de plus.
5. Cliquez sur **Enregistrer l'onglet**. Les nouveaux onglets sont ajoutés à la fin de la liste.

Vos onglets configurés apparaîtront sur la page de diffusion en direct pour que les spectateurs puissent accéder à des ressources supplémentaires et à des fonctions interactives.

### Modifier, réordonner et supprimer les onglets {#editing-reordering-and-deleting-tabs}

Survolez un onglet et utilisez ses boutons :

- Flèches **Monter** et **Descendre** -- Modifient l'ordre des onglets.
- **Modifier** (crayon) -- Change le texte, l'icône, le type ou l'URL de l'onglet, puis cliquez sur **Enregistrer l'onglet**. Pour retirer l'onglet, cliquez sur **Supprimer** et confirmez dans la boîte de dialogue **Supprimer l'onglet**.

### Prévisualiser votre diffusion {#previewing-your-stream}

Sur la page **Horaires de diffusion en direct**, cliquez sur **Voir votre diffusion** en haut de la page pour voir exactement l'apparence de votre page de diffusion en direct pour les visiteurs, y compris votre logo, vos horaires de service et les onglets configurés.

## Configurer votre diffusion YouTube en direct {#setting-up-your-youtube-live-stream}

Pour connecter votre chaîne YouTube à la diffusion en direct automatique :

1. Allez dans **Prédications**, cliquez sur **Ajouter une prédication**, puis sélectionnez **Ajouter une URL de diffusion en direct permanente**. Le formulaire **Modifier l'URL de diffusion en direct permanente** s'ouvre.
2. Le **fournisseur vidéo** est **Diffusion YouTube en direct actuelle** par défaut. Saisissez votre **identifiant de chaîne YouTube** (et non l'URL de votre chaîne ; cliquez sur **Obtenir votre identifiant de chaîne** pour obtenir de l'aide).
3. Le titre commence par **Service en direct actuel**. Modifiez-le si vous le souhaitez, ajoutez une description, puis cliquez sur **Enregistrer**. Les URL de diffusion en direct permanentes n'ont ni playlist ni date de publication.
4. Dans **Horaires de diffusion en direct**, créez un service et sélectionnez votre URL de diffusion en direct permanente dans la liste déroulante **Prédication**.

:::tip
Pour trouver l'identifiant de votre chaîne YouTube, ouvrez les paramètres avancés de votre chaîne YouTube et copiez la valeur de l'identifiant de chaîne.
:::

## Personnaliser les couleurs et le logo {#customizing-colors-and-logo}

Votre page de diffusion en direct utilise les paramètres d'[apparence](../website/appearance.md) de votre site web :

- La **couleur d'accent claire** avec un texte foncé est utilisée pour l'en-tête.
- La **couleur d'accent foncée** avec un texte clair est utilisée pour la barre latérale.
- Votre **logo pour fond clair** apparaît sur la page de diffusion. Utilisez une image au fond transparent et au format 4:1.

Pour modifier ces éléments, allez dans **Site web** puis **Apparence** et mettez à jour vos paramètres de [palette de couleurs](../website/appearance.md#color-palette) et de [logo](../website/appearance.md#logo-and-branding).

## Ajouter des animateurs de diffusion {#adding-streaming-hosts}

Pour donner aux membres de l'équipe l'accès au clavardage réservé aux animateurs, en plus du clavardage public :

1. Dans le menu de navigation rapide, choisissez **Paramètres > Rôles**.
2. Cliquez sur **Ajouter un rôle** et sélectionnez **Ajouter un rôle personnalisé**.
3. Nommez le rôle « Animateur de diffusion » et cliquez sur **Enregistrer**.
4. Cliquez sur le nouveau rôle, puis recherchez des personnes dans sa liste de membres et ajoutez-les (voir [Ajouter des utilisateurs à un rôle](../settings/roles-permissions.md#adding-users-to-a-role)).
5. Faites défiler jusqu'à **Modifier les autorisations**, développez la section **Contenu** et cochez **Clavardage des animateurs**.

Lorsque les animateurs se connectent à la page de diffusion en direct, un onglet privé **Clavardage des animateurs** apparaît à côté du clavardage public, pour les échanges réservés au personnel pendant la diffusion.

:::info
Pour plus de détails sur la création de rôles et la gestion des autorisations, voir [Rôles et autorisations](../settings/roles-permissions.md).
:::

## Dépannage {#troubleshooting}

Si votre diffusion YouTube automatisée ne s'affiche pas correctement avec l'option « Diffusion YouTube en direct actuelle » et votre identifiant de chaîne, essayez les étapes suivantes :

**Symptômes :**
- L'intégration de la diffusion affiche « Vidéo indisponible »
- La page se charge mais aucune vidéo n'apparaît
- Les intégrations YouTube directes fonctionnent, mais la diffusion automatique de la chaîne ne fonctionne pas

**Solution :**
Vérifiez votre chaîne YouTube pour repérer d'anciennes diffusions en direct ou des diffusions à venir programmées, puis supprimez-les :

1. Accédez à votre YouTube Studio.
2. Allez dans **Contenu** puis **Direct**.
3. Repérez les anciens directs programmés ou les diffusions à venir.
4. Supprimez ces anciens directs ou diffusions programmées.
5. Testez à nouveau votre page de diffusion en direct.

:::warning
L'intégration automatique de la diffusion en direct de la chaîne YouTube peut être bloquée lorsque votre chaîne contient plusieurs diffusions en direct programmées ou passées. Les supprimer permet à YouTube d'identifier correctement votre diffusion en cours et de la diffuser.
:::

**Autres exigences :**
- Votre diffusion en direct doit être **Publique** (et non Non répertoriée ou Privée).
- L'intégration doit être autorisée dans les paramètres de diffusion de votre chaîne YouTube.
- Assurez-vous d'utiliser le fournisseur **Diffusion YouTube en direct actuelle** (avec l'identifiant de chaîne), et non le fournisseur **YouTube** (avec l'identifiant de vidéo).

## Étapes suivantes {#next-steps}

- [Gérer les prédications](./managing-sermons.md) -- Ajouter des prédications à votre bibliothèque
- [Playlists](./playlists.md) -- Organiser les prédications en séries
