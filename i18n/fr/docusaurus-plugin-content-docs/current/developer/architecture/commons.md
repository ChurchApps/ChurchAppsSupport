---
title: "Contenu Commons"
---

# Contenu Commons -- Bibliothèque d'actifs partagée et modération

Le contenu soumis par l'utilisateur et partagé entre produits (chansons WorshipCommons, leçons Lessons.church, modèles FreeShow, modèles de site web B1) passe par une seule file d'attente de modération plutôt que par un flux d'examen par produit. Cette page couvre le cycle de vie des soumissions/approbations, le modèle de données d'actifs partagés et l'emplacement de la modération.

## Épine dorsale des actifs

Deux tables portent chaque élément des commons, quel que soit le produit :

- **actifs** -- la ligne d'identité publique. Le statut : en attente | publié | dépublié | supprimé.
- **fichierActifs** -- chaque fichier attaché à un actif (audio, images, documents).
- **soumissions** -- l'unité de modération. Cycle de vie : brouillon → en attente → approuvé | rejeté | retiré.

Approuver une soumission exécute un hook de publication spécifique au produit qui développe la soumission dans les dossiers du produit.

## File d'attente de modération

La file d'attente se trouve dans **B1Admin → Server Admin → Commons**, limitée à la permission admin du serveur. C'est un outil interne exclusif au personnel de ChurchApps, pas quelque chose que les églises individuelles voient.

Trois sous-onglets :

- **File** -- chaque soumission en attente dans tous les produits, filtrable par produit/type d'actif.
- **Rapports** -- signalements de droits d'auteur et de politique/qualité sur les actifs publiés.
- **Actifs** -- navigateur consultable du contenu publié avec actions par actif.
