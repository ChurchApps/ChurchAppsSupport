---
title: "Styles de Navigation"
---

# Styles de Navigation

<div class="article-intro">

Personnalisez les couleurs de la barre de navigation de votre site Web d'église pour correspondre à votre image de marque. Vous pouvez configurer les couleurs pour à la fois les arrière-plans solides et les superpositions transparentes, vous donnant un contrôle complet sur l'apparence de votre navigation dans toutes les pages.

</div>

<div class="prereqs">
<h4>Avant de Commencer</h4>

- Vous avez besoin d'une permission pour gérer votre site Web d'église. Voir [Rôles et Permissions](../people/roles-permissions.md) pour plus de détails.
- Ayez vos couleurs de marque prêtes, y compris les codes de couleur hexadécimaux (par exemple, #03A9F4).
- Comprenez la différence entre les styles de navigation solides et transparents sur votre site Web.

</div>

## Comprendre les Modes de Navigation

La navigation de votre site Web peut apparaître dans deux styles différents selon la page :

- **Navigation solide** -- Barre de navigation avec une couleur d'arrière-plan, généralement utilisée sur les pages de contenu
- **Navigation transparente** -- Navigation qui se superpose au contenu de la page, généralement utilisée sur les pages avec des images de héros ou des arrière-plans en plein écran

Vous pouvez personnaliser les couleurs pour les deux modes indépendamment.

## Accéder aux Styles de Navigation

1. Allez à **Site Web** dans B1 Admin
2. Cliquez sur **Apparence** dans la barre latérale
3. Faites défiler jusqu'à la section **Styles de Navigation**
4. Cliquez sur **Modifier les Styles de Navigation**

## Configurer la Navigation Solide

La navigation solide apparaît avec une couleur d'arrière-plan derrière la barre de navigation. Vous pouvez personnaliser :

### Couleur d'Arrière-Plan

1. Basculez le commutateur **Remplacer** pour **Couleur d'Arrière-Plan**
2. Cliquez sur le sélecteur de couleur
3. Choisissez votre couleur d'arrière-plan désirée
4. La valeur par défaut est blanc (#FFFFFF)

### Couleur du Lien

1. Basculez le commutateur **Remplacer** pour **Couleur du Lien**
2. Choisissez la couleur du texte du lien de navigation
3. Cela affecte les liens dans leur état par défaut
4. La valeur par défaut est gris foncé (#555555)

### Couleur du Survol du Lien

1. Basculez le commutateur **Remplacer** pour **Couleur du Survol du Lien**
2. Choisissez la couleur à laquelle les liens changent lorsque les utilisateurs les survolent
3. Cela fournit un retour visuel pour les liens cliquables
4. La valeur par défaut est bleu clair (#03A9F4)

### Couleur Active

1. Basculez le commutateur **Remplacer** pour **Couleur Active**
2. Choisissez la couleur du lien de page actuellement actif
3. Cela aide les utilisateurs à savoir sur quelle page ils se trouvent
4. La valeur par défaut est bleu clair (#03A9F4)

## Configurer la Navigation Transparente

La navigation transparente se superpose à votre contenu de page sans arrière-plan. Vous pouvez personnaliser :

### Couleur du Lien

1. Basculez le commutateur **Remplacer** pour **Couleur du Lien**
2. Choisissez une couleur qui contraste bien avec votre arrière-plan de page
3. Souvent, les couleurs blanches ou claires fonctionnent mieux sur les arrière-plans sombres
4. La valeur par défaut est gris foncé (#555555)

### Couleur du Survol du Lien

1. Basculez le commutateur **Remplacer** pour **Couleur du Survol du Lien**
2. Choisissez la couleur d'état du survol
3. Assurez-vous qu'elle est visible contre l'arrière-plan de votre page
4. La valeur par défaut est bleu clair (#03A9F4)

### Couleur Active

1. Basculez le commutateur **Remplacer** pour **Couleur Active**
2. Choisissez la couleur de l'indicateur de page active
3. Devrait se démarquer tout en s'intégrant à votre design
4. La valeur par défaut est bleu clair (#03A9F4)

:::info
La navigation transparente n'a pas de paramètre de couleur d'arrière-plan puisqu'elle se superpose au contenu de la page directement.
:::

## Enregistrer Vos Modifications

1. Après avoir configuré vos couleurs, cliquez sur **Enregistrer les Styles de Navigation**
2. Vos modifications s'appliquent immédiatement à votre site Web en direct
3. Visitez votre site Web pour voir la navigation dans les deux modes

## Réinitialiser aux Valeurs Par Défaut

Si vous souhaitez revenir aux couleurs par défaut :

1. Basculez les commutateurs **Remplacer** pour toutes les couleurs personnalisées
2. Cliquez sur **Enregistrer les Styles de Navigation**
3. La navigation revient au schéma de couleurs par défaut

Ou cliquez sur **Annuler** pour abandonner toutes les modifications sans enregistrer.

## Bonnes Pratiques

### Contraste des Couleurs

- **Lisibilité** -- Assurez-vous que les couleurs des liens ont un contraste suffisant avec l'arrière-plan
- **Conformité WCAG** -- Visez un rapport de contraste d'au moins 4,5:1 pour l'accessibilité
- **Tester les deux modes** -- Prévisualisez votre site avec la navigation solide et transparente

### Cohérence de Marque

- **Utiliser vos couleurs de marque** -- Correspondre à votre logo et à votre thème de site Web
- **Limiter votre palette** -- Tenez-vous en à 2-3 couleurs pour un look cohérent
- **Considérer vos images** -- Si vous utilisez la navigation transparente, testez-la contre les arrière-plans de page typiques

### États de Survol et Active

- **Retour Clair** -- Rendez les états de survol évidemment différents des liens par défaut
- **Distinguer les Pages Actives** -- Utilisez une couleur distincte afin que les utilisateurs sachent où ils se trouvent
- **Transitions Lisses** -- Le système anime automatiquement les changements de couleur

## Dépannage

### Les Couleurs ne Semblent Pas Correctes

- **Effacer le cache** -- La mise en cache du navigateur peut afficher les anciennes couleurs
- **Vérifier les codes hexadécimaux** -- Assurez-vous que vous avez entré des codes de couleur hexadécimaux valides
- **Tester sur différents arrière-plans** -- Les couleurs peuvent différer selon la page

### Navigation non Visible

- **Mode transparent** -- Si vous utilisez la navigation transparente sur les images claires, le texte foncé peut être difficile à voir
- **Solution** -- Ajustez vos couleurs de lien ou utilisez des arrière-plans de page plus sombres
- **Alternative** -- Ajoutez une ombre subtile ou une superposition d'arrière-plan à la zone de navigation

## Détails Techniques

Les styles de navigation sont stockés en tant que JSON et appliqués en utilisant les variables CSS :

- Les modifications prennent effet immédiatement sans reconstruire le site
- Les couleurs en cascade vers tous les éléments de navigation
- Les remplacements sont optionnels ; les couleurs non définies utilisent les valeurs par défaut du thème

## Articles Connexes

- [Apparence](./appearance.md) -- Personnalisez l'apparence générale et la convivialité de votre site Web
- [Gérer les Pages](./managing-pages.md) -- Créez et organisez les pages de votre site Web
- [Éditeur de Pages](./page-editor.md) -- Conception des mises en page de pages et du contenu
