---
title: "Styles de navigation"
description: "Personnalisez les couleurs des barres de navigation pleines et transparentes du site web dans B1 Admin, y compris les états de lien, de survol et d'activité pour le site de votre église."
---

# Styles de navigation

<div class="article-intro">

Personnalisez les couleurs de la barre de navigation de votre site web d'église pour l'harmoniser avec votre image de marque. Vous pouvez configurer les couleurs pour les arrière-plans pleins et les superpositions transparentes, ce qui vous donne un contrôle total sur l'apparence de votre navigation sur les différentes pages.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Vous avez besoin de l'autorisation de modifier le contenu du site web. Voir [Rôles et autorisations](../settings/roles-permissions.md) pour plus de détails.
- Ayez vos couleurs de marque à portée de main, y compris les codes couleur hexadécimaux (par ex. #03A9F4).
- Comprenez la différence entre les styles de navigation pleine et transparente sur votre site web.

</div>

## Comprendre les modes de navigation {#understanding-navigation-modes}

La navigation de votre site web peut apparaître sous deux styles différents selon la page :

- **Navigation pleine** -- Barre de navigation avec une couleur d'arrière-plan, généralement utilisée sur les pages de contenu
- **Navigation transparente** -- Navigation superposée au contenu de la page, généralement utilisée sur les pages avec des images de bannière ou des arrière-plans plein écran

Vous pouvez personnaliser les couleurs des deux modes indépendamment.

## Accéder aux styles de navigation {#accessing-navigation-styles}

1. Dans B1 Admin, ouvrez le [menu de navigation rapide](../introduction.md#getting-around-with-the-jump-menu) (la barre de recherche en haut à gauche) et développez **Site web**
2. Cliquez sur **Apparence**
3. Dans la liste **Paramètres de style**, cliquez sur **Navigation**

L'éditeur **Style de navigation** comporte deux cartes : **En-tête (plein)** et **En-tête au-dessus de la bannière (transparent)**.

## Configurer la navigation pleine {#configuring-solid-navigation}

La navigation pleine apparaît avec une couleur d'arrière-plan derrière la barre de navigation. Ces réglages se trouvent dans la carte **En-tête (plein)**. Chaque couleur est facultative : tant que son commutateur **Remplacer** est désactivé, la navigation conserve les couleurs normales de votre site. Vous pouvez personnaliser :

### Couleur d'arrière-plan {#background-color}

1. Activez le commutateur **Remplacer** pour **Couleur d'arrière-plan**
2. Cliquez sur le sélecteur de couleurs
3. Choisissez la couleur d'arrière-plan souhaitée (le sélecteur démarre sur le blanc, #FFFFFF)

### Couleur des liens {#link-color}

1. Activez le commutateur **Remplacer** pour **Couleur des liens**
2. Choisissez la couleur du texte des liens de navigation
3. Cela s'applique aux liens dans leur état par défaut (le sélecteur démarre sur le gris foncé, #555555)

### Couleur des liens au survol {#link-hover-color}

1. Activez le commutateur **Remplacer** pour **Couleur des liens au survol**
2. Choisissez la couleur que prennent les liens lorsque les utilisateurs passent la souris dessus
3. Cela donne un retour visuel pour les liens cliquables (le sélecteur démarre sur le bleu clair, #03A9F4)

### Couleur active {#active-color}

1. Activez le commutateur **Remplacer** pour **Couleur du lien actif**
2. Choisissez la couleur du lien de la page actuellement affichée
3. Cela aide les utilisateurs à savoir sur quelle page ils se trouvent (le sélecteur démarre sur le bleu clair, #03A9F4)

## Configurer la navigation transparente {#configuring-transparent-navigation}

La navigation transparente se superpose au contenu de la page, sans arrière-plan. Ces réglages se trouvent dans la carte **En-tête au-dessus de la bannière (transparent)**. Tant qu'un commutateur **Remplacer** est désactivé, cette couleur correspond automatiquement à la couleur du texte de la section de bannière. Vous pouvez personnaliser :

### Couleur des liens {#link-color-1}

1. Activez le commutateur **Remplacer** pour **Couleur des liens**
2. Choisissez une couleur qui contraste bien avec l'arrière-plan de votre page
3. Le blanc ou les couleurs claires fonctionnent souvent mieux sur les arrière-plans foncés

### Couleur des liens au survol {#link-hover-color-1}

1. Activez le commutateur **Remplacer** pour **Couleur des liens au survol**
2. Choisissez la couleur de l'état survolé
3. Assurez-vous qu'elle reste visible sur l'arrière-plan de votre page

### Couleur active {#active-color-1}

1. Activez le commutateur **Remplacer** pour **Couleur du lien actif**
2. Choisissez la couleur de l'indicateur de page active
3. Elle doit ressortir tout en s'intégrant à votre design

:::info
La navigation transparente n'a pas de réglage de couleur d'arrière-plan, puisqu'elle se superpose directement au contenu de la page.
:::

## Enregistrer vos modifications {#saving-your-changes}

1. Une fois vos couleurs configurées, cliquez sur **Enregistrer la navigation**
2. Vos modifications s'appliquent immédiatement à votre site web en ligne
3. Visitez votre site web pour voir la navigation dans les deux modes

## Revenir aux valeurs par défaut {#resetting-to-defaults}

Si vous voulez revenir aux couleurs par défaut :

1. Désactivez les commutateurs **Remplacer** de toutes les couleurs personnalisées
2. Cliquez sur **Enregistrer la navigation**
3. La navigation reprend les couleurs normales de votre site (et, sur une bannière, la couleur du texte de la bannière)

Vous pouvez aussi cliquer sur **Annuler** pour abandonner toutes les modifications sans les enregistrer.

## Bonnes pratiques {#best-practices}

### Contraste des couleurs {#color-contrast}

- **Lisibilité** -- Assurez-vous que les couleurs des liens contrastent suffisamment avec l'arrière-plan
- **Conformité WCAG** -- Visez un ratio de contraste d'au moins 4,5:1 pour l'accessibilité
- **Testez les deux modes** -- Prévisualisez votre site avec la navigation pleine et transparente

### Cohérence de la marque {#brand-consistency}

- **Utilisez vos couleurs de marque** -- Harmonisez-les avec votre logo et le thème de votre site web
- **Limitez votre palette** -- Restez sur 2 à 3 couleurs pour un ensemble cohérent
- **Tenez compte de vos images** -- Si vous utilisez la navigation transparente, testez-la sur des arrière-plans de page typiques

### États de survol et d'activité {#hover-and-active-states}

- **Retour clair** -- Les états de survol doivent être nettement différents des liens par défaut
- **Repérer les pages actives** -- Utilisez une couleur distincte pour que les utilisateurs sachent où ils se trouvent
- **Transitions fluides** -- Le système anime automatiquement les changements de couleur

## Dépannage {#troubleshooting}

### Les couleurs ne semblent pas correctes {#colors-dont-look-right}

- **Videz votre cache** -- La mise en cache du navigateur peut afficher d'anciennes couleurs
- **Vérifiez les codes hexadécimaux** -- Assurez-vous d'avoir saisi des codes couleur hexadécimaux valides
- **Testez sur différents arrière-plans** -- Les couleurs peuvent varier selon la page

### La navigation n'est pas visible {#navigation-not-visible}

- **Mode transparent** -- Si vous utilisez la navigation transparente sur des images claires, le texte foncé peut être difficile à voir
- **Solution** -- Ajustez les couleurs des liens ou utilisez des arrière-plans de page plus foncés
- **Alternative** -- Ajoutez une ombre discrète ou une superposition d'arrière-plan à la zone de navigation

## Détails techniques {#technical-details}

Les styles de navigation sont enregistrés au format JSON et appliqués à l'aide de variables CSS :

- Les modifications prennent effet immédiatement, sans reconstruction du site
- Les couleurs se propagent à tous les éléments de navigation
- Les remplacements sont facultatifs ; les couleurs non définies utilisent les valeurs par défaut du thème

## Articles connexes {#related-articles}

- [Apparence](./appearance.md) -- Personnaliser l'allure générale de votre site web
- [Gérer les pages](./managing-pages.md) -- Créer et organiser les pages de votre site web
- [Éditeur de pages](./page-editor.md) -- Concevoir les mises en page et le contenu des pages
