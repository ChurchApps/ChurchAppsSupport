---
title: "Apparence"
---

# Apparence

<div class="article-intro">

La page Apparence vous permet de personnaliser l'aspect général de votre site web d'église. Des couleurs et polices jusqu'à l'espacement et au CSS personnalisé, vous contrôlez chaque aspect visuel de votre site depuis un seul endroit.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Effectuez la [configuration initiale](initial-setup) de votre site web
- Préparez le logo de votre église au format PNG, avec fond transparent et un rapport de 4:1
- Connaissez les couleurs de marque de votre église (valeurs hexadécimales) si vous disposez d'une charte graphique

</div>

## Accéder aux paramètres d'apparence

1. Dans B1 Admin, ouvrez le [menu Accès rapide](../introduction.md#getting-around-with-the-jump-menu) (la barre de recherche en haut à gauche) et développez **Site web**.
2. Cliquez sur **Apparence**.
3. La page **Styles du site** s'ouvre. La carte **Thème, polices et pied de page** affiche la liste **Paramètres de style** à gauche et un aperçu d'un site exemple à droite. Sous celle-ci se trouvent les cartes **Annonce et widgets** et **Redirections et statistiques**.

## Palette de couleurs {#color-palette}

1. Cliquez sur **Palette de couleurs** dans le panneau Paramètres de style.
2. Vous verrez les **Couleurs de base** (nuances claire, d'accent et foncée) et les **Couleurs sémantiques** (Principale, Secondaire, Succès, Avertissement et Erreur).
3. Cliquez sur n'importe quel échantillon de couleur pour ouvrir le sélecteur de couleurs. Faites glisser le curseur ou saisissez une valeur hexadécimale pour choisir votre couleur.
4. L'**Aperçu des combinaisons de couleurs** montre comment vos couleurs sélectionnées fonctionnent ensemble.
5. Utilisez les **Palettes suggérées** pour appliquer rapidement un jeu de couleurs prédéfini.
6. Cliquez sur **Enregistrer la palette** lorsque vous êtes satisfait.

## Typographie

1. Cliquez sur **Polices** dans le panneau Paramètres de style.
2. Cliquez sur le bouton **Police des titres** ou **Police du texte** pour ouvrir le navigateur de polices. Vous pouvez rechercher par nom ou parcourir les catégories Serif, Sans Serif, Display, Manuscrite et Monospace. Vous pouvez aussi choisir l'une des **Combinaisons de polices populaires**.
3. Cliquez sur **Enregistrer les polices** pour appliquer vos choix de polices.
4. Pour ajuster la hiérarchie des tailles des titres 1 à 4, cliquez sur **Échelle typographique** dans le panneau Paramètres de style. Utilisez les champs **Multiplicateur d'échelle**, **Taille de base** et **Hauteur de ligne** pour affiner, puis cliquez sur **Enregistrer la typographie**.

## Espacement

1. Cliquez sur **Échelle d'espacement** dans le panneau Paramètres de style.
2. Ajustez les valeurs d'espacement, de Très petit à Très grand. Des exemples concrets montrent l'effet de chaque valeur sur la mise en page.
3. Cliquez sur **Enregistrer l'espacement** pour appliquer les valeurs à l'ensemble de votre site.

## Logo et identité visuelle {#logo-and-branding}

1. Cliquez sur **Logo** dans le panneau Paramètres de style.
2. Importez votre **Logo sur fond clair** et votre **Logo sur fond sombre**. Utilisez des images à fond transparent et au rapport de 4:1 pour de meilleurs résultats.
3. Importez une **Image pour les réseaux sociaux** pour les aperçus de liens et une **Icône de site (favicon)** pour l'icône de l'onglet du navigateur.
4. Cliquez sur **Enregistrer les modifications**. Les images importées ne sont pas stockées tant que vous n'avez pas enregistré ; si vous tentez de fermer ou de recharger l'onglet du navigateur avant cela, celui-ci vous avertit que des modifications n'ont pas été enregistrées.

:::tip
Pour de meilleurs résultats, utilisez un logo au format PNG avec fond transparent. Il sera ainsi parfaitement lisible sur fonds clair et sombre, sur votre site web comme dans l'[application mobile](../settings/mobile-app.md).
:::

## Styles de navigation

Personnalisez les couleurs de la barre de navigation de votre site, pour les modes plein et transparent :

1. Cliquez sur **Navigation** dans le panneau Paramètres de style
2. Configurez les couleurs de **En-tête (plein)** et de **En-tête au-dessus du bandeau (transparent)**
3. Cliquez sur **Enregistrer la navigation** pour appliquer vos couleurs de navigation

Pour des instructions détaillées, voir [Styles de navigation](./navigation-styles.md).

## Annonce et widgets

Les widgets du site apparaissent sur chaque page de votre site, au-dessus du contenu :

- **Bandeau d'annonce** : une barre fermable en haut de votre site, pour les messages urgents, comme un événement à venir ou un changement de culte.
- **Lanceur** : un bouton flottant qui ouvre un menu d'accès rapide, par exemple vers les dons, l'enregistrement ou le bulletin.

1. Repérez la carte **Annonce et widgets** sous les Paramètres de style.
2. Activez les widgets souhaités et configurez leur texte, leurs liens et leurs couleurs.
3. Cliquez sur **Enregistrer**.

## Redirections et statistiques

La carte **Redirections et statistiques** (sous les Paramètres de style) regroupe deux réglages sans rapport direct, mais souvent nécessaires :

- **Statistiques** : saisissez votre **identifiant de mesure GA4** (au format `G-XXXXXXXXXX`) pour suivre la fréquentation de votre site web. Le même identifiant suit aussi les pages vues dans l'application B1 de votre église (le portail membre à `/mobile`, y compris l'application installée), avec un `display_mode` valant `installed` ou `browser`, afin de distinguer, dans Google Analytics, les visites depuis l'application installée des visites depuis le navigateur.
- **Redirections** : faites correspondre un ancien chemin d'URL à un nouveau, afin que les liens vers une page déplacée ou renommée continuent de fonctionner au lieu d'afficher une erreur 404. Saisissez le chemin d'origine dans **De** et le nouveau chemin dans **Vers**, puis cliquez sur **Enregistrer**. Une redirection est également prioritaire sur les pages intégrées de B1 (`/sermons`, `/stream`, `/donate`, `/bible` et `/votd`), ce qui vous permet d'envoyer cette adresse ailleurs (par exemple, vers votre propre page de prédications ou une chaîne YouTube). Elle ne remplace pas une page que vous avez créée vous-même à la même adresse : supprimez d'abord cette page si vous voulez que la redirection s'applique.

## CSS et JavaScript personnalisés

1. Cliquez sur **CSS et Javascript** dans le panneau Paramètres de style.
2. Ajoutez du **CSS personnalisé** pour remplacer les styles par défaut dans le cadre d'une personnalisation avancée.
3. Ajoutez du **HTML personnalisé** pour les codes de suivi ou autres scripts.
4. Utilisez la section **Exemples de JavaScript courants** pour des extraits comme l'intégration de Google Analytics.

:::warning
Le CSS personnalisé est puissant, mais il peut casser la mise en page de votre site s'il est mal utilisé. La plupart des églises peuvent obtenir le rendu souhaité avec les réglages intégrés de couleurs, de polices et d'espacement. N'utilisez le CSS personnalisé que si vous êtes à l'aise avec le développement web.
:::

:::info
Votre site applique une politique de sécurité du contenu (Content Security Policy) qui bloque les scripts intégrés provenant de toute autre source. Le champ **HTML personnalisé** ici, ainsi que l'[élément HTML](page-editor#using-the-html-element) sur les pages individuelles, font exception : le code que vous enregistrez à cet endroit s'exécute tel quel. Ne collez donc que des scripts provenant de sources de confiance (balises d'analyse, widgets de chat et intégrations similaires).
:::

## Thèmes de style

Si vous souhaitez un point de départ rapide, les **Palettes suggérées** de la section Palette de couleurs proposent des thèmes prédéfinis qui appliquent des couleurs cohérentes en un seul clic. Vous pouvez toujours affiner chaque paramètre après avoir appliqué un thème.

## Étapes suivantes

- [Gérer les pages](managing-pages) : créer et organiser les pages de votre site
- [Fichiers](files) : importer les ressources multimédias de votre site
