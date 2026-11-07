---
title: "Horaires et configuration du direct dans B1 Admin"
sidebar_label: "Diffusion en direct"
description: "Planifiez des diffusions ponctuelles ou hebdomadaires, réglez le chat et l'avance vidéo, connectez YouTube et dépannez les intégrations dans B1 Admin."
---

# Diffusion en direct

<div class="article-intro">

La page Heures de diffusion en direct vous permet de configurer le calendrier de diffusion de votre église, de gérer les horaires de service et de personnaliser l'expérience des téléspectateurs. Configurez des services hebdomadaires récurrents ou des événements ponctuels, réglez le clavardage et la vidéo, et contrôlez le moment où votre diffusion démarre.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Vous avez besoin de l'autorisation **contentApi.streamingServices.edit**. Voir [Rôles et autorisations](../settings/roles-permissions.md) si vous n'y avez pas accès.
- Ayez à portée de main l'identifiant de votre chaîne YouTube si vous prévoyez utiliser la diffusion en direct automatisée
- Ajoutez au moins un [sermon](./managing-sermons.md) ou une URL de diffusion permanente à utiliser comme source de votre flux

</div>

La diffusion en direct se gère depuis deux pages de la section **Sermons** du menu de navigation rapide : **Heures de diffusion en direct** pour gérer le calendrier de diffusion, et **Paramètres** pour configurer les onglets de votre page de diffusion.

## Gérer les services

### Ajouter un service

1. Dans B1 Admin, ouvrez le [menu de navigation rapide](../introduction.md#getting-around-with-the-jump-menu) (la barre de recherche en haut à gauche), développez **Sermons**, puis cliquez sur **Heures de diffusion en direct**.
2. Cliquez sur le bouton **Ajouter un service** en haut de la page pour créer un nouveau service planifié. Les services existants sont listés dans un tableau indiquant le nom, l'heure, le fournisseur et la durée de chaque service ; cliquez sur l'icône de modification d'une ligne pour la modifier.
3. Saisissez un **nom de service** (par exemple « Dimanche matin »).
4. Réglez l'**heure du service** -- choisissez le jour et l'heure de début de votre service.
5. Réglez **Se répète chaque semaine** sur **Oui** pour les services hebdomadaires réguliers, ou **Non** pour un événement ponctuel.

### Configurer le clavardage et la vidéo

6. Sous **Paramètres du clavardage**, réglez le nombre de minutes avant et après le service pendant lesquelles le clavardage est activé. Cela permet aux visiteurs de commencer à discuter avant le service et de continuer après.
7. Sous **Paramètres vidéo**, réglez à quel moment démarrer le flux vidéo pour le compte à rebours ou le contenu précédant le service. Le clavardage s'ouvre ce nombre de minutes *avant* le début anticipé de la vidéo ; le temps affiché à côté du réglage des minutes avant le clavardage additionne donc les deux nombres. Par exemple, pour un service à 10 h avec 15 minutes de clavardage avant et un démarrage anticipé de 5 minutes, le clavardage s'ouvre à 9 h 40.
8. Sélectionnez le sermon à diffuser dans la liste déroulante :
   - **Dernier sermon** -- Lit automatiquement la vidéo la plus récemment ajoutée.
   - **Service en direct actuel** -- Diffuse votre flux en direct actuel depuis YouTube à l'aide de votre identifiant de chaîne.
   - Vous pouvez aussi choisir n'importe quel sermon précis déjà enregistré.
9. Cliquez sur **Enregistrer** pour planifier votre service.

:::info
Votre service se mettra automatiquement à jour chaque semaine s'il est récurrent. Il reste à la même heure locale lors du passage à l'heure avancée ou à l'heure normale. Vous pouvez ajouter autant de services que nécessaire. Les visiteurs verront la prochaine heure de service planifiée lorsqu'ils consulteront votre page de diffusion.
:::

## Paramètres de la page de diffusion

Pour personnaliser les onglets et les liens qui apparaissent à côté de votre diffusion en direct, ouvrez le menu de navigation rapide, développez **Sermons**, et cliquez sur **Paramètres**. La page **Paramètres de diffusion** affiche votre liste **Onglets de contenu**.

### Ajouter des onglets

1. Cliquez sur le bouton **Ajouter** pour ajouter un nouvel onglet à votre page de diffusion en direct.
2. Choisissez un **type de lien** : **URL externe** pour un lien personnalisé, ou l'un des onglets préconçus **Clavardage** ou **Prière**.
3. Pour l'onglet Clavardage, il suffit de lui donner un nom dans la zone **Texte de l'onglet** pour terminer la configuration.
4. Pour un onglet lié, saisissez le nom de l'onglet, choisissez une icône en cliquant sur le bouton d'icône, et saisissez l'URL.
5. Vos onglets configurés apparaîtront sur la page de diffusion en direct, pour que les téléspectateurs accèdent à des ressources supplémentaires et à des fonctions interactives.

### Prévisualiser votre diffusion

Sur la page **Heures de diffusion en direct**, cliquez sur **Voir votre diffusion** en haut de la page pour voir exactement l'apparence de votre page de diffusion en direct pour les visiteurs, y compris votre logo, vos horaires de service et vos onglets configurés.

## Configurer votre diffusion YouTube en direct

Pour connecter votre chaîne YouTube à la diffusion en direct automatisée :

1. Allez dans **Sermons** et cliquez sur **Ajouter un sermon**, puis sélectionnez **Ajouter une URL de diffusion permanente**.
2. Le fournisseur vidéo est réglé par défaut sur **Flux YouTube en direct actuel**. Saisissez votre **identifiant de chaîne YouTube**.
3. Ajoutez un titre et une description, puis cliquez sur **Enregistrer**.
4. Dans **Heures de diffusion en direct**, créez un service et sélectionnez votre URL de diffusion permanente dans la liste déroulante des sermons.

:::tip
Pour trouver l'identifiant de votre chaîne YouTube, allez dans les paramètres avancés de votre chaîne YouTube et copiez la valeur de l'identifiant de chaîne.
:::

## Personnaliser les couleurs et le logo

Votre page de diffusion en direct utilise les paramètres d'[apparence](../website/appearance.md) de votre site web :

- La **couleur d'accent claire** avec un texte foncé est utilisée pour l'en-tête.
- La **couleur d'accent foncée** avec un texte clair est utilisée pour la barre latérale.
- Votre **logo pour fond clair** apparaît sur la page de diffusion. Utilisez une image au fond transparent et au ratio 4:1.

Pour modifier ces éléments, allez dans **Site web**, puis **Apparence**, et mettez à jour vos paramètres de [palette de couleurs](../website/appearance.md#color-palette) et de [logo](../website/appearance.md#logo-and-branding).

## Ajouter des animateurs de diffusion

Pour donner aux membres de l'équipe accès au clavardage réservé aux animateurs, en plus du clavardage public :

1. Dans le menu de navigation rapide, choisissez **Paramètres > Rôles**.
2. Cliquez sur le bouton plus et sélectionnez **Ajouter un rôle personnalisé**.
3. Nommez le rôle « Animateur de diffusion » et cliquez sur **Enregistrer**.
4. Cliquez sur le nouveau rôle, puis sur **Ajouter** dans la section Membres pour ajouter des personnes.
5. Faites défiler jusqu'à **Modifier les autorisations**, développez la section **Contenu** et cochez **Clavardage des animateurs**.

Lorsque les animateurs se connectent à la page de diffusion en direct, un onglet privé **Clavardage des animateurs** apparaît à côté du clavardage public, pour des échanges réservés au personnel pendant la diffusion.

:::info
Pour plus de détails sur la création de rôles et la gestion des autorisations, consultez [Rôles et autorisations](../settings/roles-permissions.md).
:::

## Dépannage

Si votre diffusion YouTube automatisée ne s'affiche pas correctement lorsque vous utilisez l'option « Flux YouTube en direct actuel » avec votre identifiant de chaîne, essayez ce qui suit :

**Symptômes :**
- L'intégration du flux affiche « Vidéo indisponible »
- La page se charge mais aucune vidéo n'apparaît
- Les intégrations YouTube directes fonctionnent, mais le flux automatisé de la chaîne ne fonctionne pas

**Solution :**
Vérifiez dans votre chaîne YouTube s'il existe d'anciens flux en direct ou des flux à venir programmés, et supprimez-les :

1. Allez dans YouTube Studio.
2. Accédez à **Contenu**, puis **En direct**.
3. Repérez les anciens directs programmés ou les flux programmés à venir.
4. Supprimez ces anciennes entrées ou ces flux programmés.
5. Testez à nouveau votre page de diffusion en direct.

:::warning
L'intégration automatisée du flux en direct de la chaîne YouTube peut être bloquée lorsque votre chaîne compte plusieurs entrées de diffusion programmées ou passées. Les supprimer permet à YouTube de bien identifier et de diffuser votre flux en direct actuel.
:::

**Exigences supplémentaires :**
- Votre flux en direct doit être réglé sur **Public** (et non Non répertorié ou Privé).
- L'intégration doit être autorisée dans les paramètres de diffusion de votre YouTube.
- Assurez-vous d'utiliser le fournisseur **Flux YouTube en direct actuel** (avec identifiant de chaîne), et non le fournisseur **YouTube** (avec identifiant vidéo).

## Et ensuite

- [Gérer les sermons](./managing-sermons.md) -- Ajouter des sermons à votre bibliothèque
- [Listes de lecture](./playlists.md) -- Organiser les sermons en séries
