---
title: "Diffusion en direct"
---

# Diffusion en direct

<div class="article-intro">

La page Heures de diffusion en direct vous permet de configurer le calendrier de diffusion de votre église, de gérer les heures de services et de personnaliser l'expérience des spectateurs. Configurez des services hebdomadaires récurrents ou des événements ponctuels, réglez le clavardage et la vidéo, et contrôlez le moment où votre diffusion démarre.

</div>

## Vidéo de formation

<YouTube id="tpEY-sEYW6A" title="Configurer la diffusion en direct dans B1" next="Personnaliser l'application membre de votre église dans B1" nextUrl="/docs/b1-admin/settings/mobile-app" />

<div class="prereqs">
<h4>Avant de commencer</h4>

- Vous avez besoin de l'autorisation **contentApi.streamingServices.edit**. Consultez [Rôles et autorisations](../settings/roles-permissions.md) si vous n'y avez pas accès.
- Ayez votre identifiant de chaîne YouTube sous la main si vous prévoyez utiliser la diffusion en direct automatisée
- Ajoutez au moins un [sermon](managing-sermons) ou une URL de diffusion en direct permanente à utiliser comme source de diffusion

</div>

La diffusion en direct se gère à partir de deux pages de la section **Sermons** du menu de navigation rapide : **Heures de diffusion en direct** pour gérer le calendrier de diffusion, et **Paramètres** pour configurer les onglets de votre page de diffusion.

## Gérer les services

### Ajouter un service

1. Dans B1 Admin, ouvrez le [menu de navigation rapide](../introduction.md#getting-around-with-the-jump-menu) (la barre de recherche en haut à gauche), développez **Sermons**, puis cliquez sur **Heures de diffusion en direct**.
2. Cliquez sur le bouton **Ajouter un service** en haut de la page pour créer un nouveau service planifié. Les services existants sont listés dans un tableau indiquant le nom, l'heure, le fournisseur et la durée de chaque service ; cliquez sur l'icône de modification d'une ligne pour la modifier.
3. Saisissez un **nom de service** (par exemple « Culte du dimanche matin »).
4. Définissez l'**heure du service** -- choisissez le jour et l'heure de début du service.
5. Réglez **Récurrence hebdomadaire** sur **Oui** pour les services hebdomadaires réguliers, ou sur **Non** pour un événement ponctuel.

### Configurer le clavardage et la vidéo

6. Sous **Paramètres du clavardage**, indiquez le nombre de minutes avant et après le service pendant lequel le clavardage doit être activé. Cela permet aux visiteurs de commencer à clavarder avant le début du service et de continuer après.
7. Sous **Paramètres vidéo**, indiquez à quel moment démarrer le flux vidéo pour un compte à rebours ou un contenu précédant le service. Le clavardage s'ouvre ce nombre de minutes *avant* le début anticipé de la vidéo ; l'heure affichée à côté du réglage de clavardage avant le service tient donc compte des deux nombres. Par exemple, pour un service à 10 h avec 15 minutes de clavardage avant et un démarrage anticipé de 5 minutes, le clavardage s'ouvre à 9 h 40.
8. Sélectionnez le sermon à diffuser dans la liste déroulante :
   - **Dernier sermon** -- Diffuse automatiquement la vidéo ajoutée le plus récemment.
   - **Service en direct actuel** -- Diffuse votre diffusion en direct actuelle de YouTube à l'aide de votre identifiant de chaîne.
   - Vous pouvez aussi choisir n'importe quel sermon déjà enregistré.
9. Cliquez sur **Enregistrer** pour programmer votre service.

:::info
Votre service se mettra à jour automatiquement chaque semaine s'il est récurrent. Il reste à la même heure locale lors du début et de la fin de l'heure avancée. Vous pouvez ajouter autant de services que nécessaire. Les visiteurs verront la prochaine heure de service programmée lorsqu'ils visiteront votre page de diffusion.
:::

## Paramètres de la page de diffusion

Pour personnaliser les onglets et les liens qui apparaissent à côté de votre diffusion en direct, ouvrez le menu de navigation rapide, développez **Sermons**, puis cliquez sur **Paramètres**. La page **Paramètres de diffusion** affiche votre liste d'**onglets de contenu**.

### Ajouter des onglets

1. Cliquez sur le bouton **Ajouter** pour ajouter un nouvel onglet à votre page de diffusion en direct.
2. Choisissez un **type de lien** : **URL externe** pour un lien personnalisé, ou l'un des onglets prédéfinis **Clavardage** ou **Prière**.
3. Pour l'onglet Clavardage, il suffit de lui donner un nom dans la case **Texte de l'onglet** : la configuration est terminée.
4. Pour un onglet avec lien, saisissez le nom de l'onglet, choisissez une icône en cliquant sur le bouton d'icône, puis saisissez l'URL.
5. Vos onglets configurés apparaîtront sur la page de diffusion en direct, afin que les spectateurs puissent accéder à des ressources supplémentaires et à des fonctions interactives.

### Prévisualiser votre diffusion

Sur la page **Heures de diffusion en direct**, cliquez sur **Voir votre diffusion** en haut de la page pour voir exactement l'apparence de votre page de diffusion pour les visiteurs, y compris votre logo, les heures de service et les onglets configurés.

## Configurer votre diffusion YouTube en direct

Pour connecter votre chaîne YouTube afin d'activer la diffusion en direct automatique :

1. Allez à **Sermons**, cliquez sur **Ajouter un sermon**, puis sélectionnez **Ajouter une URL de diffusion en direct permanente**.
2. Le fournisseur vidéo est **Diffusion YouTube en direct actuelle** par défaut. Saisissez votre **identifiant de chaîne YouTube**.
3. Ajoutez un titre et une description, puis cliquez sur **Enregistrer**.
4. Dans **Heures de diffusion en direct**, créez un service et sélectionnez votre URL de diffusion en direct permanente dans la liste déroulante des sermons.

:::tip
Pour trouver l'identifiant de votre chaîne YouTube, allez dans les paramètres avancés de votre chaîne YouTube et copiez la valeur de l'identifiant de chaîne.
:::

## Personnaliser les couleurs et le logo

Votre page de diffusion en direct utilise les paramètres d'[Apparence](../website/appearance) de votre site web :

- La **couleur d'accent claire** avec un texte foncé est utilisée pour l'en-tête.
- La **couleur d'accent foncée** avec un texte clair est utilisée pour la barre latérale.
- Votre **logo pour fond clair** apparaît sur la page de diffusion. Utilisez une image à fond transparent et au rapport 4:1.

Pour modifier ces éléments, allez à **Site web**, puis **Apparence**, et mettez à jour vos paramètres de [Palette de couleurs](../website/appearance#color-palette) et de [Logo](../website/appearance#logo-and-branding).

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

Si votre diffusion YouTube automatisée ne s'affiche pas correctement avec l'option « Diffusion YouTube en direct actuelle » et votre identifiant de chaîne, essayez les étapes suivantes :

**Symptômes :**
- L'intégration de la diffusion affiche « Vidéo non disponible »
- La page se charge, mais aucune vidéo n'apparaît
- Les intégrations YouTube directes fonctionnent, mais la diffusion automatisée de la chaîne ne fonctionne pas

**Solution :**
Vérifiez dans votre chaîne YouTube s'il reste d'anciennes diffusions en direct programmées ou à venir, puis supprimez-les :

1. Allez dans YouTube Studio.
2. Accédez à **Contenu**, puis à **Diffusions en direct**.
3. Repérez les anciennes diffusions programmées ou les diffusions à venir.
4. Supprimez ces anciennes entrées de diffusion en direct ou ces diffusions programmées.
5. Testez de nouveau votre page de diffusion en direct.

:::warning
L'intégration automatisée de la diffusion en direct de la chaîne YouTube peut être bloquée lorsque plusieurs entrées de diffusion programmées ou passées existent dans votre chaîne. Les supprimer permet à YouTube de reconnaître et de diffuser correctement votre diffusion en cours.
:::

**Exigences supplémentaires :**
- Votre diffusion en direct doit être réglée sur **Public** (et non Non répertoriée ni Privée).
- L'intégration doit être autorisée dans les paramètres de diffusion de votre YouTube.
- Assurez-vous d'utiliser le fournisseur **Diffusion YouTube en direct actuelle** (avec identifiant de chaîne), et non le fournisseur **YouTube** (avec identifiant de vidéo).

## Et ensuite

- [Gérer les sermons](managing-sermons) -- ajouter des sermons à votre bibliothèque
- [Listes de lecture](playlists) -- organiser les sermons en séries
