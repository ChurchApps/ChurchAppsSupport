---
title: "Styles de navigation"
---

# Styles de navigation

<div class="article-intro">

Personnalisez les couleurs de la barre de navigation de votre site web d'église pour correspondre à votre image de marque. Vous pouvez configurer les couleurs pour les fonds solides et les superpositions transparentes, vous donnant un contrôle total sur l'apparence de votre navigation sur différentes pages.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Vous avez besoin de la permission de gérer le site web de votre église. Consultez [Rôles et permissions](../people/roles-permissions.md) pour plus de détails.
- Préparez vos couleurs de marque, y compris les codes de couleur hexadécimaux (par exemple, #03A9F4).
- Comprenez la différence entre les styles de navigation solide et transparente sur votre site web.

</div>

## Comprendre les modes de navigation

La navigation de votre site web peut apparaître dans deux styles différents selon la page :

- **Navigation solide** -- Barre de navigation avec une couleur de fond, généralement utilisée sur les pages de contenu
- **Navigation transparente** -- Navigation qui s'affiche sur le contenu de la page, généralement utilisée sur les pages avec des images hero ou des fonds en plein écran

Vous pouvez personnaliser les couleurs pour les deux modes indépendamment.

## Accès aux styles de navigation

1. Dans B1 Admin, ouvrez le [menu Sauter](../introduction.md#getting-around-with-the-jump-menu) (la barre de recherche en haut à gauche) et développez **Site web**
2. Cliquez sur **Apparence**
3. Faites défiler jusqu'à la section **Styles de navigation**
4. Cliquez sur **Éditer les styles de navigation**

## Configuration de la navigation solide

La navigation solide apparaît avec une couleur de fond derrière la barre de navigation. Vous pouvez personnaliser :

### Couleur de fond

1. Activez le commutateur **Remplacer** pour **Couleur de fond**
2. Cliquez sur le sélecteur de couleur
3. Choisissez votre couleur de fond souhaitée
4. La valeur par défaut est blanc (#FFFFFF)

### Couleur des liens

1. Activez le commutateur **Remplacer** pour **Couleur des liens**
2. Choisissez la couleur du texte des liens de navigation
3. Cela affecte les liens dans leur état par défaut
4. La valeur par défaut est gris foncé (#555555)

### Couleur de survol des liens

1. Activez le commutateur **Remplacer** pour **Couleur de survol des liens**
2. Choisissez la couleur dans laquelle les liens changent lorsque les utilisateurs les survolent
3. Cela fournit un retour visuel pour les liens cliquables
4. La valeur par défaut est bleu clair (#03A9F4)

### Couleur active

1. Activez le commutateur **Remplacer** pour **Couleur active**
2. Choisissez la couleur du lien de page actuellement actif
3. Cela aide les utilisateurs à savoir sur quelle page ils se trouvent
4. La valeur par défaut est bleu clair (#03A9F4)

## Configuration de la navigation transparente

La navigation transparente s'affiche sur votre contenu de page sans fond. Vous pouvez personnaliser :

### Couleur des liens

1. Activez le commutateur **Remplacer** pour **Couleur des liens**
2. Choisissez une couleur qui contraste bien avec le fond de votre page
3. Souvent, le blanc ou les couleurs claires fonctionnent mieux sur les fonds sombres
4. La valeur par défaut est gris foncé (#555555)

### Couleur de survol des liens

1. Activez le commutateur **Remplacer** pour **Couleur de survol des liens**
2. Choisissez la couleur d'état de survol
3. Assurez-vous qu'elle est visible sur le fond de votre page
4. La valeur par défaut est bleu clair (#03A9F4)

### Couleur active

1. Activez le commutateur **Remplacer** pour **Couleur active**
2. Choisissez la couleur de l'indicateur de page active
3. Doit ressortir tout en s'adaptant à votre conception
4. La valeur par défaut est bleu clair (#03A9F4)

:::info
La navigation transparente n'a pas de paramètre de couleur de fond puisqu'elle s'affiche directement sur le contenu de la page.
:::

## Enregistrement de vos modifications

1. Après avoir configuré vos couleurs, cliquez sur **Enregistrer les styles de navigation**
2. Vos modifications s'appliquent immédiatement à votre site web en direct
3. Visitez votre site web pour voir la navigation dans les deux modes

## Réinitialisation aux paramètres par défaut

Si vous souhaitez revenir aux couleurs par défaut :

1. Désactivez les commutateurs **Remplacer** pour les couleurs personnalisées
2. Cliquez sur **Enregistrer les styles de navigation**
3. La navigation revient au schéma de couleurs par défaut

Ou cliquez sur **Annuler** pour ignorer toutes les modifications sans les enregistrer.

## Bonnes pratiques

### Contraste des couleurs

- **Lisibilité** -- Assurez-vous que les couleurs des liens ont un contraste suffisant avec le fond
- **Conformité WCAG** -- Visez au moins un rapport de contraste 4.5:1 pour l'accessibilité
- **Testez les deux modes** -- Prévisualisez votre site avec la navigation solide et transparente

### Cohérence de la marque

- **Utilisez les couleurs de votre marque** -- Faites correspondre votre logo et le thème du site web
- **Limitez votre palette** -- Restez avec 2-3 couleurs pour un aspect cohésif
- **Considérez vos images** -- Si vous utilisez la navigation transparente, testez-la sur les fonds de page typiques

### États de survol et actifs

- **Retour clair** -- Rendez les états de survol clairement différents des liens par défaut
- **Distinguez les pages actives** -- Utilisez une couleur distincte pour que les utilisateurs sachent où ils se trouvent
- **Transitions fluides** -- Le système anime automatiquement les changements de couleur

## Dépannage

### Les couleurs ne semblent pas correctes

- **Videz votre cache** -- La mise en cache du navigateur peut afficher les anciennes couleurs
- **Vérifiez les codes hexadécimaux** -- Assurez-vous d'avoir saisi des codes de couleur hexadécimaux valides
- **Testez sur différents fonds** -- Les couleurs peuvent sembler différentes selon la page

### Navigation non visible

- **Mode transparent** -- Si vous utilisez la navigation transparente sur des images claires, le texte sombre peut être difficile à voir
- **Solution** -- Ajustez vos couleurs de liens ou utilisez des fonds de page plus sombres
- **Alternative** -- Ajoutez une ombre subtile ou une superposition de fond à la zone de navigation

## Détails techniques

Les styles de navigation sont stockés en JSON et appliqués à l'aide de variables CSS :

- Les modifications prennent effet immédiatement sans reconstruire le site
- Les couleurs s'appliquent à tous les éléments de navigation
- Les remplacements sont optionnels ; les couleurs non définies utilisent les paramètres par défaut du thème

## Articles connexes

- [Apparence](./appearance.md) -- Personnalisez l'apparence générale et la sensation de votre site web
- [Gestion des pages](./managing-pages.md) -- Créez et organisez vos pages de site web
- [Éditeur de page](./page-editor.md) -- Concevez les mises en page et le contenu des pages
