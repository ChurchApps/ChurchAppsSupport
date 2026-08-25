---
title: "Architecture du constructeur de site web"
---

# Architecture du constructeur de site web

<div class="article-intro">

Chaque site web d'église servi par B1App est rendu à partir d'un arborescence de contenu -- pages, sections, éléments -- stockée dans ContentApi et éditée visuellement dans B1Admin. Une bibliothèque de composants partagée rend à la fois l'aperçu de l'éditeur et le site en direct, un catalogue de types d'éléments définit ce qui peut apparaître sur une page, et un service IA séparé peut générer ou réécrire cette arborescence. Cette page mappe toute la pile : le contrat d'élément dans \@churchapps/helpers\, le pipeline de rendu, les éléments de données d'église, les widgets à l'échelle du site, la couche de blog, les pages protégées par accès, le SEO, la génération d'IA et les formulaires conversationnels.

</div>

## Aperçu

Le site web de chaque église est construit autour d'un arborescence pages → sections → éléments, où chaque nœud porte ses paramètres comme un blob JSON. Le même ensemble de composants apphelper rend l'éditeur glisser-déposer dans B1Admin et le site public rendu côté serveur dans B1App.

## Éléments de contenu

L'arborescence de contenu est composée de :

| Table | Rôle |
|-------|------|
| pages | Une page par URL avec paramètres de visibilité et portage SEO |
| sections | Bandes horizontales sur une page avec arrière-plan et configuration de divagation en forme |
| elements | Morceaux de contenu à l'intérieur d'une section avec type et paramètres |
| posts | Articles de blog autonomes pour le contenu éditorial |
| settings | Paramètres à l'échelle de l'église pour les widgets et les analyses |

## Contrats d'éléments

35 types d'éléments expédient aujourd'hui :

| Catégorie | Types d'éléments |
|-----------|-----------------|
| disposition (6) | ligne, colonne, boîte, carrousel, espace blanc, bloc |
| contenu (11) | texte, texteAvecPhoto, carte, FAQ, caractéristique d'icône, témoignage, icônes sociales, compte à rebours, statistiques, tableau, lienBouton |
| médias (4) | image, galerie, vidéo, carte |
| église (12) | logo, sermons, flux, donation, lienDon, formulaire, calendrier, listeGroupes, groupes, progressionCampagne, grille du personnel, heuresdeService |
| avancé (2) | htmlBrut, iframe |

## Widgets à l'échelle du site

Deux widgets apparaissent sur chaque page publique : AnnouncementBanner et Launcher. Les deux sont configurés via des paramètres publics et rendus par apphelper.

## Blog

Le blog est un type de contenu autonome. Les articles sont publiés quand leur publishDate est définie et passée. Les articles programés ont une publishDate future et sont masqués publiquement mais affichés avec un chip Programmé dans admin.

## Pages réservées aux membres

Les pages peuvent être restreintes par visibilité : tous, visiteurs, membres, personnel, équipe ou groupes spécifiques. C'est une porte d'accès dure, pas seulement un filtre de navigation.

## SEO et découverte

- Descriptions meta 
- Redirects
- Données structurées
- Flux RSS pour le blog
- Sitemap

## Génération d'IA

La génération de page et de site s'exécute dans AskApi, un service distinct. Elle renvoie JSON et l'appelant (B1Admin) persiste le résultat via ContentApi.
