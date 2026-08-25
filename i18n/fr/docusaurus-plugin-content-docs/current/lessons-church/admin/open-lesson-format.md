---
title: "Format de leçon ouvert"
---

# Format de leçon ouvert

<div class="article-intro">

Le format de leçon ouvert est un schéma JSON standardisé qui permet aux fournisseurs de contenu tiers de publier du curriculum pour Lessons.church. N'importe quelle organisation qui héberge un flux dans ce format peut être ajoutée en tant que fournisseur externe, rendant son contenu consultable et lisible aux côtés de la bibliothèque intégrée.

</div>

## Comment ça fonctionne

Un fournisseur héberge deux types de points de terminaison :

1. **Arborescence du fournisseur** -- Une seule URL qui renvoie le catalogue complet des programmes, études, leçons et lieux.
2. **Flux du lieu** -- Une URL par lieu, renvoyant le contenu complet de la leçon.

Quand une église ajoute l'URL de votre fournisseur dans Lessons.church, la plate-forme récupère votre arborescence pour découvrir le contenu disponible, puis récupère les flux individuels du lieu à la demande.

## Arborescence du fournisseur

Votre URL de fournisseur doit renvoyer un objet JSON avec cette structure :

\\\json
{
  "programs": [
    {
      "id": "program-1",
      "name": "Gospel of Mark",
      "slug": "gospel-of-mark",
      "image": "https://example.com/images/mark.jpg",
      "about": "A 12-week study through the Gospel of Mark.",
      "studies": [...]
    }
  ]
}
\\\

## Champs de l'arborescence

| Champ | Type | Description |
|-------|------|-------------|
| \programs[].id\ | string | Identifiant de programme unique |
| \programs[].name\ | string | Nom d'affichage |
| \programs[].slug\ | string | Nom convivial pour l'URL |
| \studies[].id\ | string | Identifiant d'étude unique |
| \lessons[].id\ | string | Identifiant de leçon unique |
| \enues[].id\ | string | Identifiant de lieu unique |
| \enues[].name\ | string | Nom du lieu (par ex. « Kids », « Adults ») |
| \enues[].apiUrl\ | string | URL renvoyant le flux du lieu |
