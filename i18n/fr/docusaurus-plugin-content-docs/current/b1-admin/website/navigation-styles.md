---
title: "Styles de navigation"
---

# Styles de navigation

<div class="article-intro">

Personnalisez les couleurs de la barre de navigation du site Web de votre église pour correspondre à votre image de marque. Vous pouvez configurer les couleurs pour les arrière-plans solides et les superpositions transparentes, vous donnant un contrôle complet sur l'apparence de votre navigation sur différentes pages.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Vous avez besoin de la permission de gérer le site Web de votre église. Consultez [Rôles et permissions](../people/roles-permissions.md) pour plus de détails.
- Ayez vos couleurs de marque prêtes, y compris les codes de couleur hexadécimaux (par exemple, #03A9F4).
- Comprenez la différence entre les styles de navigation solide et transparente sur votre site Web.

</div>

## Comprendre les modes de navigation

La navigation de votre site Web peut apparaître dans deux styles différents selon la page :

- **Navigation solide** -- Barre de navigation avec une couleur d'arrière-plan, généralement utilisée sur les pages de contenu
- **Navigation transparente** -- Navigation qui se superpose au contenu de la page, généralement utilisée sur les pages avec des images héros ou des arrière-plans plein écran

Vous pouvez personnaliser les couleurs pour les deux modes indépendamment.

## Accéder aux styles de navigation

1. Accédez à **Site Web** dans B1 Admin
2. Cliquez sur **Apparence** dans la barre latérale
3. Faites défiler jusqu'à la section **Styles de navigation**
4. Cliquez sur **Modifier les styles de navigation**

## Configurer la navigation solide

La navigation solide apparaît avec une couleur d'arrière-plan derrière la barre de navigation. Vous pouvez personnaliser :

### Couleur d'arrière-plan

1. Basculez le commutateur **Remplacer** pour **Couleur d'arrière-plan**
2. Cliquez sur le sélecteur de couleurs
3. Choisissez la couleur d'arrière-plan souhaitée
4. La valeur par défaut est blanc (#FFFFFF)

### Couleur des liens

1. Basculez le commutateur **Remplacer** pour **Couleur des liens**
2. Choisissez la couleur du texte des liens de navigation
3. Cela affecte les liens dans leur état par défaut
4. La valeur par défaut est gris foncé (#555555)

### Couleur de survol des liens

1. Basculez le commutateur **Remplacer** pour **Couleur de survol des liens**
2. Choisissez la couleur que les liens prennent lorsque les utilisateurs les survolent
3. Cela fournit un retour visuel pour les liens cliquables
4. La valeur par défaut est bleu clair (#03A9F4)

### Couleur active

1. Basculez le commutateur **Remplacer** pour **Couleur active**
2. Choisissez la couleur du lien de la page actuellement active
3. Cela aide les utilisateurs à savoir sur quelle page ils se trouvent
4. La valeur par défaut est bleu clair (#03A9F4)

## Configurer la navigation transparente

La navigation transparente se superpose au contenu de votre page sans arrière-plan. Vous pouvez personnaliser :

### Couleur des liens

1. Basculez le commutateur **Remplacer** pour **Couleur des liens**
2. Choisissez une couleur qui contraste bien avec l'arrière-plan de votre page
3. Souvent, les couleurs blanches ou claires fonctionnent mieux sur des arrière-plans sombres
4. La valeur par défaut est gris foncé (#555555)

### Couleur de survol des liens

1. Basculez le commutateur **Remplacer** pour **Couleur de survol des liens**
2. Choisissez la couleur de l'état de survol
3. Assurez-vous qu'elle est visible sur l'arrière-plan de votre page
4. La valeur par défaut est bleu clair (#03A9F4)

### Couleur active

1. Basculez le commutateur **Remplacer** pour **Couleur active**
2. Choisissez la couleur de l'indicateur de page active
3. Devrait se démarquer tout en s'intégrant à votre design
4. La valeur par défaut est bleu clair (#03A9F4)

:::info
La navigation transparente n'a pas de paramètre de couleur d'arrière-plan car elle se superpose directement au contenu de la page.
:::

## Enregistrer vos modifications

1. Après avoir configuré vos couleurs, cliquez sur **Enregistrer les styles de navigation**
2. Vos modifications s'appliquent immédiatement à votre site Web en direct
3. Visitez votre site Web pour voir la navigation dans les deux modes

## Réinitialiser aux valeurs par défaut

Si vous souhaitez revenir aux couleurs par défaut :

1. Désactivez les commutateurs **Remplacer** pour toutes les couleurs personnalisées
2. Cliquez sur **Enregistrer les styles de navigation**
3. La navigation revient au schéma de couleurs par défaut

Ou cliquez sur **Annuler** pour ignorer toutes les modifications sans enregistrer.

## Bonnes pratiques

### Contraste des couleurs

- **Lisibilité** -- Assurez-vous que les couleurs des liens ont suffisamment de contraste avec l'arrière-plan
- **Conformité WCAG** -- Visez au moins un rapport de contraste de 4,5:1 pour l'accessibilité
- **Testez les deux modes** -- Prévisualisez votre site avec la navigation solide et transparente

### Cohérence de la marque

- **Utilisez vos couleurs de marque** -- Faites correspondre votre logo et le thème de votre site Web
- **Limitez votre palette** -- Tenez-vous-en à 2-3 couleurs pour un look cohérent
- **Considérez vos images** -- Si vous utilisez la navigation transparente, testez-la sur des arrière-plans de page typiques

### États de survol et actifs

- **Retour clair** -- Rendez les états de survol manifestement différents des liens par défaut
- **Distinguez les pages actives** -- Utilisez une couleur distincte pour que les utilisateurs sachent où ils se trouvent
- **Transitions fluides** -- Le système anime automatiquement les changements de couleur

## Dépannage

### Les couleurs ne semblent pas correctes

- **Videz votre cache** -- La mise en cache du navigateur peut afficher d'anciennes couleurs
- **Vérifiez les codes hexadécimaux** -- Assurez-vous d'avoir saisi des codes de couleur hexadécimaux valides
- **Testez sur différents arrière-plans** -- Les couleurs peuvent sembler différentes selon la page

### Navigation non visible

- **Mode transparent** -- Si vous utilisez la navigation transparente sur des images claires, le texte sombre peut être difficile à voir
- **Solution** -- Ajustez vos couleurs de liens ou utilisez des arrière-plans de page plus sombres
- **Alternative** -- Ajoutez une ombre subtile ou une superposition d'arrière-plan à la zone de navigation

## Détails techniques

Les styles de navigation sont stockés au format JSON et appliqués à l'aide de variables CSS :

- Les modifications prennent effet immédiatement sans reconstruire le site
- Les couleurs se propagent à tous les éléments de navigation
- Les remplacements sont facultatifs ; les couleurs non définies utilisent les valeurs par défaut du thème

## Articles connexes

- [Apparence](./appearance.md) -- Personnalisez l'apparence générale de votre site Web
- [Gestion des pages](./managing-pages.md) -- Créez et organisez les pages de votre site Web
- [Éditeur de page](./page-editor.md) -- Concevez des mises en page et du contenu de page
