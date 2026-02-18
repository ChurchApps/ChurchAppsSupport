---
title: "Diffusion en direct"
---

# Diffusion en direct

<div class="article-intro">

La page Horaires de diffusion en direct vous permet de configurer le programme de diffusion de votre église, de gérer les horaires de service et de personnaliser l'expérience des spectateurs. Définissez des services hebdomadaires récurrents ou des événements ponctuels, configurez les paramètres de chat et de vidéo, et contrôlez le moment où votre diffusion passe en direct.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Vous avez besoin de la permission **contentApi.streamingServices.edit**. Consultez [Rôles et permissions](../settings/roles-permissions.md) si vous n'avez pas accès.
- Ayez votre identifiant de chaîne YouTube prêt si vous prévoyez d'utiliser la diffusion en direct automatisée
- Ajoutez au moins une [prédication](managing-sermons) ou une URL de direct permanente à utiliser comme source de diffusion

</div>

La page comporte deux onglets principaux : **Services** pour gérer votre programme de diffusion en direct et **Paramètres** pour configurer votre page de diffusion.

## Gérer les services

### Ajouter un service

1. Dans B1 Admin, cliquez sur **Prédications** dans la barre latérale gauche, puis cliquez sur l'onglet **Horaires de diffusion en direct**.
2. Cliquez sur le bouton **Ajouter un service** pour créer un nouveau service planifié.
3. Saisissez un **Nom de service** (par exemple, « Culte du dimanche matin »).
4. Définissez l'**Horaire du service** -- choisissez le jour et l'heure de début de votre service.
5. Réglez **Récurrence hebdomadaire** sur **Oui** pour les services hebdomadaires réguliers, ou **Non** pour un événement ponctuel.

### Configurer les paramètres de chat et de vidéo

6. Dans **Paramètres de chat**, définissez combien de minutes avant et après le service le chat doit être activé. Cela permet aux visiteurs de commencer à discuter avant le début du service et de continuer après.
7. Dans **Paramètres vidéo**, définissez combien de temps à l'avance la diffusion vidéo doit commencer pour le compte à rebours ou le contenu d'avant-service.
8. Sélectionnez la prédication à diffuser dans le menu déroulant :
   - **Dernière prédication** -- Diffuse automatiquement votre vidéo la plus récemment ajoutée.
   - **Service en direct actuel** -- Diffuse votre flux en direct actuel depuis YouTube en utilisant votre identifiant de chaîne.
   - Vous pouvez également choisir n'importe quelle prédication spécifique que vous avez déjà enregistrée.
9. Cliquez sur **Enregistrer** pour planifier votre service.

:::info
Votre service se mettra automatiquement à jour chaque semaine s'il est configuré en récurrence. Vous pouvez ajouter autant de services que nécessaire. Les visiteurs verront le prochain horaire de service prévu lorsqu'ils visiteront votre page de diffusion.
:::

## Paramètres de la page de diffusion

Cliquez sur l'onglet **Paramètres** pour personnaliser les onglets et les liens qui apparaissent à côté de votre diffusion en direct.

### Ajouter des onglets

1. Cliquez sur le bouton **Ajouter** pour ajouter un nouvel onglet à votre page de diffusion en direct.
2. Choisissez parmi les onglets prédéfinis (**Chat** ou **Prière**) ou ajoutez un onglet personnalisé avec une URL externe.
3. Pour les onglets prédéfinis, donnez-lui simplement un nom dans la case **Texte de l'onglet** et la configuration est terminée.
4. Pour un onglet avec lien, saisissez le nom de l'onglet, choisissez une icône en cliquant sur le bouton d'icône, et saisissez l'URL.
5. Vos onglets configurés apparaîtront sur la page de diffusion en direct pour que les spectateurs puissent accéder à des ressources supplémentaires et des fonctionnalités interactives.

### Prévisualiser votre diffusion

Cliquez sur le bouton **Voir votre diffusion** pour voir exactement à quoi ressemblera votre page de diffusion en direct pour les visiteurs, y compris votre logo, les horaires de service et les onglets configurés.

## Configurer votre diffusion en direct YouTube

Pour connecter votre chaîne YouTube pour la diffusion en direct automatique :

1. Allez dans **Prédications** et cliquez sur **Ajouter une prédication**, puis sélectionnez **Ajouter une URL de direct permanente**.
2. Le fournisseur vidéo est par défaut **Diffusion en direct YouTube actuelle**. Saisissez votre **identifiant de chaîne YouTube**.
3. Ajoutez un titre et une description, puis cliquez sur **Enregistrer**.
4. Dans **Horaires de diffusion en direct**, créez un service et sélectionnez votre URL de direct permanente dans le menu déroulant des prédications.

:::tip
Pour trouver votre identifiant de chaîne YouTube, allez dans les paramètres avancés de votre chaîne YouTube et copiez la valeur de l'identifiant de chaîne.
:::

## Personnaliser les couleurs et le logo

Votre page de diffusion en direct utilise les paramètres d'[Apparence](../website/appearance) de votre site web :

- La **couleur d'accent claire** avec du texte foncé est utilisée pour l'en-tête.
- La **couleur d'accent foncée** avec du texte clair est utilisée pour la barre latérale.
- Votre **Logo sur fond clair** apparaît sur la page de diffusion. Utilisez une image avec un fond transparent et un rapport d'aspect de 4:1.

Pour modifier ces paramètres, allez dans **Site web** puis **Apparence** et mettez à jour vos paramètres de [Palette de couleurs](../website/appearance#palette-de-couleurs) et de [Logo](../website/appearance#logo-et-image-de-marque).

## Ajouter des animateurs de diffusion

Pour donner à des membres de l'équipe des capacités d'animateur (modération du chat, réponses aux demandes de prière) :

1. Allez dans **Paramètres** dans la barre latérale gauche et cliquez sur **Rôles**.
2. Cliquez sur le bouton plus et sélectionnez **Ajouter un rôle personnalisé**.
3. Nommez le rôle « Animateur de diffusion » et cliquez sur **Enregistrer**.
4. Cliquez sur le nouveau rôle, puis cliquez sur **Ajouter** dans la section Membres pour ajouter des personnes.
5. Faites défiler jusqu'à **Modifier les permissions**, développez la section **Contenu** et cochez **Animer le chat**.

Lorsque les animateurs se connectent à la page de diffusion en direct, ils disposeront de capacités spéciales incluant la modération du chat et la gestion des demandes de prière.

:::info
Pour plus de détails sur la création de rôles et la gestion des permissions, consultez [Rôles et permissions](../settings/roles-permissions.md).
:::

## Dépannage

Si votre diffusion en direct YouTube automatisée ne s'affiche pas correctement lorsque vous utilisez l'option « Diffusion en direct YouTube actuelle » avec votre identifiant de chaîne, essayez ce qui suit :

**Symptômes :**
- L'intégration de la diffusion en direct affiche « Vidéo non disponible »
- La page se charge mais aucune vidéo n'apparaît
- Les intégrations YouTube directes fonctionnent, mais la diffusion automatisée de la chaîne ne fonctionne pas

**Solution :**
Vérifiez votre chaîne YouTube pour d'anciennes diffusions programmées ou à venir et supprimez-les :

1. Allez dans votre YouTube Studio.
2. Accédez à **Contenu** puis **En direct**.
3. Cherchez d'anciennes diffusions programmées ou des diffusions en direct à venir planifiées.
4. Supprimez ces anciennes entrées ou entrées de diffusion programmées.
5. Testez à nouveau votre page de diffusion en direct.

:::warning
L'intégration automatisée de la diffusion en direct de chaîne YouTube peut être bloquée lorsqu'il y a plusieurs entrées de diffusion en direct programmées ou passées dans votre chaîne. La suppression de celles-ci permet à YouTube d'identifier correctement et de servir votre diffusion en direct actuelle.
:::

**Exigences supplémentaires :**
- Votre diffusion en direct doit être définie sur **Public** (et non Non répertorié ou Privé).
- L'intégration doit être autorisée dans les paramètres de votre diffusion YouTube.
- Assurez-vous d'utiliser le fournisseur **Diffusion en direct YouTube actuelle** (avec l'identifiant de chaîne), et non le fournisseur **YouTube** (avec l'identifiant de vidéo).

## Prochaines étapes

- [Gérer les prédications](managing-sermons) -- Ajouter des prédications à votre bibliothèque
- [Playlists](playlists) -- Organiser les prédications en séries
