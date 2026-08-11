---
title: "Diffusion en direct"
---

# Diffusion en direct

<div class="article-intro">

La page Heures de diffusion en direct vous permet de configurer l'horaire de diffusion de votre église, de gérer les heures de service et de personnaliser l'expérience du spectateur. Configurez des services hebdomadaires récurrents ou des événements ponctuels, configurez les paramètres de chat et de vidéo et contrôlez quand votre flux se met en direct.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Vous avez besoin de la permission **contentApi.streamingServices.edit**. Voir [Rôles et permissions](../settings/roles-permissions.md) si vous n'avez pas l'accès.
- Ayez votre ID de chaîne YouTube à portée de main si vous prévoyez d'utiliser la diffusion en direct automatisée
- Ajoutez au moins un [sermon](managing-sermons) ou une URL de diffusion permanente à utiliser comme source de flux

</div>

La page a deux onglets principaux : **Services** pour gérer votre horaire de diffusion en direct et **Paramètres** pour configurer votre page de diffusion.

## Gestion des services

### Ajout d'un service

1. Dans B1 Admin, ouvrez le **menu de section** dans le coin supérieur gauche (le nom de la section avec la petite flèche) et choisissez **Sermons**, puis cliquez sur l'onglet **Heures de diffusion en direct**.
2. Cliquez sur le bouton **Ajouter un service** pour créer un nouveau service planifié.
3. Entrez un **Nom du service** (par exemple, "Dimanche matin").
4. Définissez l'**Heure du service** -- choisissez le jour et l'heure à laquelle votre service commence.
5. Définissez **Récurrence hebdomadaire** sur **Oui** pour les services hebdomadaires réguliers, ou **Non** pour un événement ponctuel.

### Configuration des paramètres de chat et vidéo

6. Sous **Paramètres de chat**, définissez combien de minutes avant et après le service le chat doit être activé. Cela permet aux visiteurs de commencer à discuter avant le service et de continuer après.
7. Sous **Paramètres vidéo**, définissez à quelle heure lancer la diffusion vidéo pour le compte à rebours ou le contenu pré-service.
8. Sélectionnez quel sermon lire dans le menu déroulant :
   - **Dernier sermon** -- Joue automatiquement votre vidéo la plus récemment ajoutée.
   - **Service en direct actuel** -- Joue votre flux en direct actuel de YouTube en utilisant votre ID de chaîne.
   - Vous pouvez aussi choisir n'importe quel sermon spécifique que vous avez déjà enregistré.
9. Cliquez sur **Enregistrer** pour planifier votre service.

:::info
Votre service se mettra à jour automatiquement chaque semaine s'il est défini pour être récurrent. Vous pouvez ajouter autant de services que vous en avez besoin. Les visiteurs verront l'heure du prochain service planifié quand ils visiteront votre page de diffusion.
:::

## Paramètres de la page de diffusion

Cliquez sur l'onglet **Paramètres** pour personnaliser les onglets et les liens qui apparaissent à côté de votre flux en direct.

### Ajout d'onglets

1. Cliquez sur le bouton **Ajouter** pour ajouter un nouvel onglet à votre page de flux en direct.
2. Choisissez l'onglet pré-conçu **Chat** ou ajoutez un onglet personnalisé avec une URL externe.
3. Pour l'onglet Chat, donnez-lui simplement un nom dans la zone **Texte d'onglet** et la configuration est complète.
4. Pour un onglet lié, entrez le nom de l'onglet, choisissez une icône en cliquant sur le bouton d'icône, et entrez l'URL.
5. Vos onglets configurés apparaîtront sur la page de diffusion en direct pour que les spectateurs accèdent aux ressources supplémentaires et aux fonctionnalités interactives.

### Aperçu de votre flux

Cliquez sur le bouton **Voir votre flux** pour voir exactement comment votre page de diffusion en direct ressemblera aux visiteurs, incluant votre logo, les heures de service et les onglets configurés.

## Configuration de votre diffusion en direct YouTube

Pour connecter votre chaîne YouTube pour la diffusion en direct automatisée :

1. Allez à **Sermons** et cliquez sur **Ajouter un sermon**, puis sélectionnez **Ajouter une URL de diffusion permanente**.
2. Le fournisseur vidéo est par défaut **Flux en direct YouTube actuel**. Entrez votre **ID de chaîne YouTube**.
3. Ajoutez un titre et une description, puis cliquez sur **Enregistrer**.
4. Dans **Heures de diffusion en direct**, créez un service et sélectionnez votre URL de diffusion permanente dans le menu déroulant des sermons.

:::tip
Pour trouver votre ID de chaîne YouTube, allez aux paramètres avancés de votre chaîne YouTube et copiez la valeur de l'ID de chaîne.
:::

## Personnalisation des couleurs et du logo

Votre page de flux en direct utilise les paramètres d'[Apparence](../website/appearance) de votre site web :

- La **couleur d'accent clair** avec texte sombre est utilisée pour l'en-tête.
- La **couleur d'accent sombre** avec texte clair est utilisée pour la barre latérale.
- Votre **Logo de fond clair** apparaît sur la page de diffusion. Utilisez une image avec un arrière-plan transparent et un rapport d'aspect 4:1.

Pour modifier ceux-ci, allez à **Site web** puis **Apparence** et mettez à jour vos paramètres de [Palette de couleurs](../website/appearance#color-palette) et de [Logo](../website/appearance#logo-and-branding).

## Ajout d'hôtes de diffusion

Pour donner aux membres de l'équipe l'accès au chat réservé aux hôtes à côté du chat public :

1. Ouvrez le **menu de section** dans le coin supérieur gauche (le nom de la section avec la petite flèche), choisissez **Paramètres** et cliquez sur **Rôles**.
2. Cliquez sur le bouton plus et sélectionnez **Ajouter un rôle personnalisé**.
3. Nommez le rôle "Hôte de diffusion" et cliquez sur **Enregistrer**.
4. Cliquez sur le nouveau rôle, puis cliquez sur **Ajouter** dans la section Membres pour ajouter des personnes.
5. Faites défiler jusqu'à **Modifier les permissions**, développez la section **Contenu** et cochez **Chat d'hôte**.

Quand les hôtes se connectent à la page de flux en direct, un onglet **Chat d'hôte** privé apparaît à côté du chat public pour la conversation réservée au personnel pendant la diffusion.

:::info
Pour plus de détails sur la création de rôles et la gestion des permissions, voir [Rôles et permissions](../settings/roles-permissions.md).
:::

## Dépannage

Si votre flux en direct YouTube automatisé ne s'affiche pas correctement quand vous utilisez l'option "Flux en direct YouTube actuel" avec votre ID de chaîne, essayez ce qui suit :

**Symptômes :**
- L'intégration du flux en direct affiche "Vidéo indisponible"
- La page charge mais aucune vidéo n'apparaît
- Les intégrations YouTube directes fonctionnent, mais le flux en direct de chaîne automatisé ne fonctionne pas

**Solution**
Vérifiez votre chaîne YouTube pour les anciens flux en direct ou les flux planifiés à venir et supprimez-les :

1. Allez dans YouTube Studio.
2. Naviguez vers **Contenu** puis **En direct**.
3. Cherchez les anciennes diffusions en direct programmées ou les flux en direct programmés à venir.
4. Supprimez ces anciennes entrées ou diffusions en direct programmées.
5. Testez à nouveau votre page de diffusion en direct.

:::warning
Le flux en direct de chaîne automatisé de YouTube peut être bloqué quand il y a plusieurs entrées de diffusion en direct programmées ou passées dans votre chaîne. La suppression de celles-ci permet à YouTube d'identifier correctement et de servir votre flux en direct actuel.
:::

**Exigences supplémentaires :**
- Votre flux en direct doit être défini sur **Public** (pas Non listé ou Privé).
- L'intégration doit être autorisée dans vos paramètres de flux en direct YouTube.
- Assurez-vous d'utiliser le fournisseur **Flux en direct YouTube actuel** (avec ID de chaîne), pas le fournisseur **YouTube** (avec ID vidéo).

## Prochaines étapes

- [Gestion des sermons](managing-sermons) -- Ajoutez des sermons à votre bibliothèque
- [Playlists](playlists) -- Organisez les sermons en séries
