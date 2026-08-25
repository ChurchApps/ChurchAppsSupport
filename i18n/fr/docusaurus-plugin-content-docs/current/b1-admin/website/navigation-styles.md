---
title: "Styles de navigation"
---

# Styles de navigation

<div class="article-intro">

Personnalisez les couleurs de la barre de navigation de votre site web d'église pour qu'elles correspondent à votre image de marque. Vous pouvez configurer les couleurs pour les arrière-plans solides et les superpositions transparentes, ce qui vous donne un contrôle complet sur l'apparence de votre navigation dans toutes les pages.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Vous avez besoin de la permission de gérer le site web de votre église. Consultez [Rôles et permissions](../people/roles-permissions.md) pour plus de détails.
- Ayez vos couleurs de marque prêtes, y compris les codes couleur hexadécimaux (par exemple, #03A9F4).
- Comprendre la différence entre les styles de navigation solides et transparents sur votre site web.

</div>

## Comprendre les modes de navigation

La navigation de votre site web peut apparaître dans deux styles différents selon la page :

- **Navigation solide** -- Barre de navigation avec une couleur d'arrière-plan, généralement utilisée sur les pages de contenu
- **Navigation transparente** -- Navigation qui chevauche le contenu de la page, généralement utilisée sur les pages avec des images de héros ou des arrière-plans plein écran

Vous pouvez personnaliser les couleurs pour les deux modes indépendamment.

## Accès aux styles de navigation

1. Accédez à **Site web** dans B1 Admin
2. Cliquez sur l'onglet **Apparence** en haut de la vue Pages du site web
3. Faites défiler jusqu'à la section **Styles de navigation**
4. Cliquez sur **Éditer les styles de navigation**

## Configuration de la navigation solide

La navigation solide apparaît avec une couleur d'arrière-plan derrière la barre de navigation. Vous pouvez personnaliser :

### Couleur d'arrière-plan

1. Basculez le commutateur **Remplacer** pour **Couleur d'arrière-plan**
2. Cliquez sur le sélecteur de couleur
3. Choisissez votre couleur d'arrière-plan souhaitée
4. La valeur par défaut est blanc (#FFFFFF)

### Couleur du lien

1. Basculez le commutateur **Remplacer** pour **Couleur du lien**
2. Choisissez la couleur du texte du lien de navigation
3. Cela affecte les liens dans leur état par défaut
4. La valeur par défaut est gris foncé (#555555)

### Couleur de survol du lien

1. Basculez le commutateur **Remplacer** pour **Couleur de survol du lien**
2. Choisissez la couleur que les liens changent quand les utilisateurs les survolent
3. Cela fournit une rétroaction visuelle pour les liens cliquables
4. La valeur par défaut est bleu clair (#03A9F4)

### Couleur active

1. Basculez le commutateur **Remplacer** pour **Couleur active**
2. Choisissez la couleur du lien de la page actuellement active
3. Cela aide les utilisateurs à savoir sur quelle page ils sont
4. La valeur par défaut est bleu clair (#03A9F4)

## Configuration de la navigation transparente

La navigation transparente chevauche votre contenu de page sans arrière-plan. Vous pouvez personnaliser :

### Couleur du lien

1. Basculez le commutateur **Remplacer** pour **Couleur du lien**
2. Choisissez une couleur qui contraste bien avec votre arrière-plan de page
3. Souvent, les couleurs blanches ou claires fonctionnent mieux sur les arrière-plans sombres
4. La valeur par défaut est gris foncé (#555555)

### Couleur de survol du lien

1. Basculez le commutateur **Remplacer** pour **Couleur de survol du lien**
2. Choisissez la couleur d'état de survol
3. Assurez-vous qu'elle est visible par rapport à votre arrière-plan de page
4. La valeur par défaut est bleu clair (#03A9F4)

### Couleur active

1. Basculez le commutateur **Remplacer** pour **Couleur active**
2. Choisissez la couleur de l'indicateur de page active
3. Doit se démarquer tout en s'intégrant à votre conception
4. La valeur par défaut est bleu clair (#03A9F4)

:::info
La navigation transparente n'a pas de paramètre de couleur d'arrière-plan puisqu'elle chevauche le contenu de la page directement.
:::

## Enregistrement de vos modifications

1. Après avoir configuré vos couleurs, cliquez sur **Enregistrer les styles de navigation**
2. Vos modifications s'appliquent immédiatement à votre site web en direct
3. Visitez votre site web pour voir la navigation dans les deux modes

## Réinitialisation aux valeurs par défaut

Si vous souhaitez revenir aux couleurs par défaut :

1. Basculez les commutateurs **Remplacer** pour toutes les couleurs personnalisées
2. Cliquez sur **Enregistrer les styles de navigation**
3. La navigation revient au modèle de couleur par défaut

Ou cliquez sur **Annuler** pour abandonner toutes les modifications sans les enregistrer.

## Meilleures pratiques

### Contraste des couleurs

- **Lisibilité** -- Assurez-vous que les couleurs des liens ont un contraste suffisant avec l'arrière-plan
- **Conformité WCAG** -- Viser au moins un rapport de contraste 4.5:1 pour l'accessibilité
- **Tester les deux modes** -- Prévisualisez votre site avec une navigation solide et transparente

### Cohérence de la marque

- **Utilisez vos couleurs de marque** -- Correspondez à votre logo et au thème de votre site web
- **Limitez votre palette** -- Restez avec 2-3 couleurs pour un look cohérent
- **Considérez vos images** -- Si vous utilisez une navigation transparente, testez-la avec les arrière-plans typiques

### États de survol et actifs

- **Rétroaction claire** -- Faites des états de survol clairement différents des liens par défaut
- **Distinguez les pages actives** -- Utilisez une couleur distincte pour que les utilisateurs sachent où ils sont
- **Transitions fluides** -- Le système anime automatiquement les changements de couleur

## Dépannage

### Les couleurs ne semblent pas correctes

- **Effacez votre cache** -- La mise en cache du navigateur peut afficher les anciennes couleurs
- **Vérifiez les codes hexadécimaux** -- Assurez-vous d'avoir entré des codes couleur hexadécimaux valides
- **Tester sur les différents arrière-plans** -- Les couleurs peuvent sembler différentes en fonction de la page

### Navigation non visible

- **Mode transparent** -- Si vous utilisez une navigation transparente sur les images claires, le texte sombre peut être difficile à voir
- **Solution** -- Ajustez vos couleurs de lien ou utilisez des arrière-plans de pages plus sombres
- **Alternative** -- Ajoutez une légère ombre ou un chevauchement d'arrière-plan à la zone de navigation

## Détails techniques

Les styles de navigation sont stockés au format JSON et appliqués à l'aide de variables CSS :

- Les modifications prennent effet immédiatement sans reconstruire le site
- Les couleurs en cascade vers tous les éléments de navigation
- Les remplacements sont facultatifs ; les couleurs non définies utilisent les valeurs par défaut du thème

## Articles connexes

- [Apparence](./appearance.md) -- Personnalisez l'apparence générale et la sensation de votre site web
- [Gestion des pages](./managing-pages.md) -- Créez et organisez les pages de votre site web
- [Éditeur de page](./page-editor.md) -- Concevez les mises en page et le contenu des pages
