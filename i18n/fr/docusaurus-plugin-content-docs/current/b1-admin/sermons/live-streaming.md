---
title: "Diffusion en direct"
---

# Diffusion en direct

<div class="article-intro">

La page Horaires de diffusion en direct vous permet de configurer le calendrier de diffusion de votre église, de gérer les horaires de service et de personnaliser l'expérience des spectateurs. Configurez des services hebdomadaires récurrents ou des événements ponctuels, configurez les paramètres du chat et de la vidéo, et contrôlez quand votre diffusion devient active.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Vous avez besoin de la permission **contentApi.streamingServices.edit**. Voir [Rôles et permissions](../settings/roles-permissions.md) si vous n'avez pas accès.
- Ayez votre identifiant de canal YouTube prêt si vous prévoyez d'utiliser la diffusion en direct automatisée
- Ajoutez au moins un [sermon](managing-sermons) ou une URL en direct permanente à utiliser comme source de votre flux

</div>

La page a deux onglets principaux : **Services** pour gérer votre calendrier de diffusion en direct et **Paramètres** pour configurer votre page de diffusion.

## Gestion des services

### Ajout d'un service

1. Dans B1 Admin, ouvrez le [menu de saut](../introduction.md#getting-around-with-the-jump-menu) (la barre de recherche en haut à gauche), développez **Sermons**, et cliquez sur **Horaires de diffusion en direct**.
2. Cliquez sur le bouton **Ajouter un service** pour créer un nouveau service planifié.
3. Entrez un **Nom du service** (par exemple, « Dimanche matin »).
4. Définissez l'**Heure du service** -- choisissez le jour et l'heure du début de votre service.
5. Définissez **Récurrence hebdomadaire** sur **Oui** pour les services hebdomadaires réguliers, ou **Non** pour un événement ponctuel.

### Configuration des paramètres du chat et de la vidéo

6. Sous **Paramètres du chat**, définissez combien de minutes avant et après le service le chat doit être activé. Cela permet aux visiteurs de commencer à discuter avant le début du service et de continuer après.
7. Sous **Paramètres vidéo**, définissez à quelle distance d'avance pour commencer le flux vidéo pour le compte à rebours ou le contenu avant le service.
8. Sélectionnez quel sermon jouer dans le menu déroulant :
   - **Dernier sermon** -- Joue automatiquement votre vidéo la plus récemment ajoutée.
   - **Service en direct actuel** -- Joue votre diffusion en direct actuelle depuis YouTube en utilisant votre identifiant de canal.
   - Vous pouvez également choisir n'importe quel sermon spécifique que vous avez déjà enregistré.
9. Cliquez sur **Enregistrer** pour planifier votre service.

:::info
Votre service sera automatiquement mis à jour chaque semaine s'il est défini comme récurrent. Vous pouvez ajouter autant de services que vous le souhaitez. Les visiteurs verront l'heure du prochain service planifié quand ils visiteront votre page de diffusion.
:::

## Paramètres de la page de diffusion

Cliquez sur l'onglet **Paramètres** pour personnaliser les onglets et les liens qui apparaissent aux côtés de votre diffusion en direct.

### Ajout d'onglets

1. Cliquez sur le bouton **Ajouter** pour ajouter un nouvel onglet à votre page de diffusion en direct.
2. Choisissez l'onglet prédéfini **Chat** ou ajoutez un onglet personnalisé avec une URL externe.
3. Pour l'onglet Chat, donnez-lui simplement un nom dans la boîte **Texte de l'onglet** et la configuration est terminée.
4. Pour un onglet lié, entrez le nom de l'onglet, choisissez une icône en cliquant sur le bouton d'icône, et entrez l'URL.
5. Vos onglets configurés apparaîtront sur la page de diffusion en direct pour que les spectateurs accèdent aux ressources supplémentaires et aux fonctionnalités interactives.

### Aperçu de votre diffusion

Cliquez sur le bouton **Voir votre diffusion** pour voir exactement comment votre page de diffusion en direct apparaîtra aux visiteurs, y compris votre logo, les horaires de service et les onglets configurés.

## Configuration de votre diffusion en direct YouTube

Pour connecter votre canal YouTube pour la diffusion en direct automatisée :

1. Allez à **Sermons** et cliquez sur **Ajouter un sermon**, puis sélectionnez **Ajouter une URL en direct permanente**.
2. Le fournisseur vidéo a pour défaut **Diffusion en direct YouTube actuelle**. Entrez votre **identifiant de canal YouTube**.
3. Ajoutez un titre et une description, puis cliquez sur **Enregistrer**.
4. Dans **Horaires de diffusion en direct**, créez un service et sélectionnez votre URL en direct permanente dans le menu déroulant des sermons.

:::tip
Pour trouver votre identifiant de canal YouTube, allez aux paramètres avancés de votre canal YouTube et copiez la valeur de l'identifiant de canal.
:::

## Personnalisation des couleurs et du logo

Votre page de diffusion en direct utilise les paramètres [Apparence](../website/appearance) de votre site Web :

- La **couleur d'accent clair** avec texte sombre est utilisée pour l'en-tête.
- La **couleur d'accent sombre** avec texte clair est utilisée pour la barre latérale.
- Votre **Logo de fond clair** apparaît sur la page de diffusion. Utilisez une image avec un arrière-plan transparent et un rapport d'aspect 4:1.

Pour modifier ceux-ci, allez à **Site Web** puis à **Apparence** et mettez à jour vos paramètres de [Palette de couleurs](../website/appearance#color-palette) et de [Logo](../website/appearance#logo-and-branding).

## Ajout d'animateurs de diffusion

Pour donner aux membres de l'équipe l'accès au chat réservé aux animateurs aux côtés du chat public :

1. Dans le menu de saut, choisissez **Paramètres > Rôles**.
2. Cliquez sur le bouton plus et sélectionnez **Ajouter un rôle personnalisé**.
3. Nommez le rôle « Animateur de diffusion » et cliquez sur **Enregistrer**.
4. Cliquez sur le nouveau rôle, puis cliquez sur **Ajouter** dans la section Membres pour ajouter des personnes.
5. Faites défiler vers le bas jusqu'à **Modifier les permissions**, développez la section **Contenu**, et cochez **Chat d'animateur**.

Quand les animateurs se connectent à la page de diffusion en direct, un onglet **Chat d'animateur** privé apparaît aux côtés du chat public pour la conversation réservée au personnel pendant la diffusion.

:::info
Pour plus de détails sur la création de rôles et la gestion des permissions, voir [Rôles et permissions](../settings/roles-permissions.md).
:::

## Dépannage

Si votre diffusion en direct YouTube automatisée ne s'affiche pas correctement lors de l'utilisation de l'option « Diffusion en direct YouTube actuelle » avec votre identifiant de canal, essayez les éléments suivants :

**Symptômes :**
- L'intégration de diffusion en direct affiche « Vidéo indisponible »
- La page se charge mais aucune vidéo n'apparaît
- Les intégrations YouTube directes fonctionnent, mais la diffusion en direct de canal automatisée ne fonctionne pas

**Solution**
Vérifiez votre canal YouTube pour les diffusions en direct anciennes ou à venir programmées et supprimez-les :

1. Allez à votre YouTube Studio.
2. Accédez à **Contenu** puis à **En direct**.
3. Recherchez les anciennes diffusions programmées ou les flux en direct programmés à venir.
4. Supprimez ces anciennes entrées ou entrées de diffusion en direct programmées.
5. Testez à nouveau votre page de diffusion en direct.

:::warning
L'intégration de diffusion en direct de canal automatisée de YouTube peut être bloquée lorsqu'il y a plusieurs entrées de diffusion en direct programmées ou passées dans votre canal. La suppression de celles-ci permet à YouTube d'identifier correctement et de servir votre diffusion en direct actuelle.
:::

**Exigences supplémentaires :**
- Votre diffusion en direct doit être définie sur **Publique** (pas Non listé ou Privé).
- L'intégration doit être autorisée dans vos paramètres de diffusion en direct YouTube.
- Assurez-vous que vous utilisez le fournisseur **Diffusion en direct YouTube actuelle** (avec identifiant de canal), pas le fournisseur **YouTube** (avec identifiant vidéo).

## Prochaines étapes

- [Gestion des sermons](managing-sermons) -- Ajoutez des sermons à votre bibliothèque
- [Listes de lecture](playlists) -- Organisez les sermons en séries
