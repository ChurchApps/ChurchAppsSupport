---
title: "Apparence"
---

# Apparence

<div class="article-intro">

La page Apparence vous permet de personnaliser l'apparence générale de votre site web d'église. Des couleurs et des polices à l'espacement et au CSS personnalisé, vous pouvez contrôler chaque aspect visuel de votre site en un seul endroit.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Complétez la [configuration initiale](initial-setup) de votre site web
- Préparez le logo de votre église au format PNG avec un fond transparent et un rapport d'aspect 4:1
- Connaissez les couleurs de marque de votre église (valeurs hexadécimales) si vous avez un guide de style existant

</div>

## Accès aux paramètres d'apparence

1. Dans B1 Admin, ouvrez le [menu Sauter](../introduction.md#getting-around-with-the-jump-menu) (la barre de recherche en haut à gauche) et développez **Site web**.
2. Cliquez sur **Apparence**.
3. La page **Styles du site** s'ouvre. La carte **Thème, polices et pied de page** affiche la liste **Paramètres de style** à gauche et un aperçu d'un site exemple à droite. En dessous se trouvent les cartes **Annonce et widgets** et **Redirections et analyse**.

## Palette de couleurs {#color-palette}

1. Cliquez sur **Palette de couleurs** dans le panneau Paramètres de style.
2. Vous verrez les **Couleurs de base** (nuances claires, accent et sombres) et les **Couleurs sémantiques** (Primaire, Secondaire, Succès, Avertissement et Erreur).
3. Cliquez sur n'importe quel échantillon de couleur pour ouvrir le sélecteur de couleur. Faites glisser le sélecteur ou entrez une valeur hexadécimale pour choisir votre couleur.
4. L'**Aperçu des combinaisons de couleurs** montre comment vos couleurs sélectionnées fonctionnent ensemble.
5. Utilisez les **Palettes suggérées** pour appliquer rapidement un schéma de couleurs prédéfini.
6. Cliquez sur **Enregistrer la palette** lorsque vous êtes satisfait.

## Typographie

1. Cliquez sur **Polices** dans le panneau Paramètres de style.
2. Cliquez sur le bouton **Police des titres** ou **Police du texte** pour ouvrir le navigateur de polices. Vous pouvez rechercher par nom ou parcourir les catégories comme Serif, Sans Serif, Affichage, Écriture manuscrite et Monospace. Vous pouvez aussi choisir l'une des **Combinaisons de polices populaires**.
3. Cliquez sur **Enregistrer les polices** pour appliquer vos choix de police.
4. Pour ajuster la hiérarchie des tailles des en-têtes 1 à 4, cliquez sur **Échelle de typographie** dans le panneau Paramètres de style. Utilisez les champs **Échelle typographique**, **Taille de base** et **Hauteur de ligne** pour affiner, puis cliquez sur **Enregistrer la typographie**.

## Espacement

1. Cliquez sur **Échelle d'espacement** dans le panneau Paramètres de style.
2. Ajustez les valeurs d'espacement de Très petit à Très grand. Des exemples pratiques montrent comment chaque valeur affecte la mise en page.
3. Cliquez sur **Enregistrer l'espacement** pour appliquer les valeurs sur l'ensemble de votre site.

## Logo et image de marque {#logo-and-branding}

1. Cliquez sur **Logo** dans le panneau Paramètres de style.
2. Téléchargez votre **Logo sur fond clair** et **Logo sur fond sombre**. Utilisez des images avec un fond transparent et un rapport d'aspect 4:1 pour de meilleurs résultats.
3. Téléchargez une **Image pour les réseaux sociaux** pour les aperçus de lien et une **Favicon** pour l'icône de l'onglet du navigateur.

:::tip
Pour de meilleurs résultats, utilisez un logo avec un fond transparent au format PNG. Cela garantit qu'il s'affiche bien sur les fonds clairs et sombres sur votre site web et l'[application mobile](../settings/mobile-app.md).
:::

## Styles de navigation

Personnalisez les couleurs de la barre de navigation de votre site web pour les modes solide et transparent :

1. Cliquez sur **Navigation** dans le panneau Paramètres de style
2. Configurez les couleurs de **En-tête (plein)** et **En-tête sur le héros (transparent)**
3. Cliquez sur **Enregistrer la navigation** pour appliquer vos couleurs de navigation

Pour des instructions détaillées, consultez [Styles de navigation](./navigation-styles.md).

## Annonces et widgets

Les widgets du site apparaissent sur chaque page de votre site, flottant au-dessus du contenu de la page :

- **Banneau d'annonces** -- Une barre masquable en haut de votre site pour les messages sensibles au temps, comme un événement à venir ou un changement de service.
- **Lanceur** -- Un bouton flottant qui ouvre un menu d'accès rapide, par exemple des liens pour faire un don, vous enregistrer ou afficher le bulletin.

1. Repérez la carte **Annonce et widgets** sous les paramètres de style.
2. Activez les widgets que vous souhaitez et configurez leur texte, leurs liens et leurs couleurs.
3. Cliquez sur **Enregistrer**.

## Redirections et analyse

La carte **Redirections et analyse** (sous les paramètres de style) contient deux paramètres non liés mais couramment nécessaires :

- **Analyse** -- Ajoutez votre **ID de mesure GA4** (au format `G-XXXXXXXXXX`) pour suivre le trafic des visiteurs sur votre site web. Ce même ID suit aussi les pages vues dans l'application B1 de votre église (le portail des membres à `/mobile`, y compris l'application installée), avec un `display_mode` valant `installed` ou `browser`, afin de distinguer dans Google Analytics les visites depuis l'application installée et celles depuis le navigateur.
- **Redirections** -- Mappez un ancien chemin d'URL vers un nouveau, afin que les liens vers une page que vous avez déplacée ou renommée continuent à fonctionner au lieu de donner 404. Entrez l'ancien chemin **De** et le nouveau chemin **À**, puis cliquez sur **Enregistrer**. Une redirection a aussi priorité sur les pages intégrées de B1 (`/sermons`, `/stream`, `/donate`, `/bible` et `/votd`), ce qui vous permet d'envoyer cette adresse ailleurs (par exemple, vers votre propre page de sermons ou une chaîne YouTube). Elle ne remplace pas une page que vous avez créée vous-même à la même adresse. Supprimez d'abord cette page si vous voulez que la redirection s'applique.

## CSS et JavaScript personnalisés

1. Cliquez sur **CSS et JavaScript** dans le panneau Paramètres de style.
2. Ajoutez un **CSS personnalisé** pour remplacer les styles par défaut pour une personnalisation avancée.
3. Ajoutez un **HTML personnalisé** pour les codes de suivi ou d'autres scripts.
4. Utilisez la section **Exemples JavaScript courants** pour les extraits comme l'intégration de Google Analytics.

:::warning
Le CSS personnalisé est puissant mais peut casser la mise en page de votre site s'il est utilisé incorrectement. La plupart des églises peuvent obtenir l'apparence qu'elles souhaitent en utilisant les contrôles intégrés de couleur, de police et d'espacement. Utilisez le CSS personnalisé uniquement si vous êtes à l'aise avec le développement web.
:::

:::info
Votre site applique une politique de sécurité du contenu qui bloque les scripts en ligne de toute autre source. Le champ **HTML personnalisé** ici, ainsi que [l'élément HTML](page-editor#using-the-html-element) des pages individuelles, sont les exceptions de confiance -- le code que vous y enregistrez s'exécute tel quel, donc collez uniquement des scripts provenant de sources de confiance (balises d'analyse, widgets de chat et incorporations similaires).
:::

## Thèmes de style

Si vous souhaitez un point de départ rapide, les **Palettes suggérées** dans la section Palette de couleurs offrent des thèmes prédéfinis qui définissent des couleurs coordonnées en un clic. Vous pouvez toujours affiner les paramètres individuels après l'application d'un thème.

## Étapes suivantes

- [Gestion des pages](managing-pages) -- Créez et organisez vos pages de site web
- [Fichiers](files) -- Téléchargez des ressources médias pour votre site
