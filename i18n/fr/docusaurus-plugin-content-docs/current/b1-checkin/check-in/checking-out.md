---
title: "Départ et sécurité des enfants"
---

# Départ et sécurité des enfants

<div class="article-intro">

Le départ ferme la boucle sur l'enregistrement des enfants : un parent présente le code de sécurité de son étiquette de retrait, le kiosque vérifie qui vient chercher, et les enfants sont enregistrés comme partis. Les stations avec personnel obtiennent également des outils de sécurité -- vérification de la prise en charge de confiance, textes de page-un-parent, réimpressions d'étiquette de sécurité et diffusion d'urgence.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Le départ est disponible sur les stations définies en mode **manned** dans les paramètres d'administration du kiosque
- Les enfants doivent avoir été [enregistrés](./completing-checkin) avec une étiquette de retrait imprimée portant le code de sécurité
- La pagination et les diffusions d'urgence nécessitent que votre église ait un fournisseur de texte connecté dans B1 Admin

</div>

## Démarrage d'un départ

1. Sur une station avec personnel, tapez **Départ** sur l'écran de recherche.
2. Entrez le code de sécurité à 4 caractères de l'étiquette de retrait de la famille. Vous pouvez le taper, utiliser le clavier à l'écran ou scanner le code-barres de l'étiquette avec un scanner USB ou Bluetooth -- le code se soumet automatiquement une fois tous les 4 caractères entrés.
   - Pas de scanner ? Tapez **Analyser** sous le champ de code pour utiliser plutôt la caméra de la tablette. Tenez le code QR ou le code-barres de l'étiquette de retrait face à la caméra dans la fenêtre **Analyser le code de retrait** et le code est entré pour vous. La caméra arrière est utilisée par défaut ; tapez le bouton de retournement pour basculer les caméras, ou tapez **Annuler** pour revenir à la saisie.
3. Le kiosque affiche les enfants enregistrés sous ce code.

## Vérification de qui vient chercher

L'écran de départ demande qui vient chercher les enfants :

- Les **personnes de prise en charge de confiance** pour le ménage apparaissent comme des cartes tapables avec leur photo et relation -- tapez la personne devant vous.
- Les **adultes du ménage** apparaissent également dans une grille de photos.
- **Autre** vous permet de taper un nom pour quelqu'un ne figurant pas sur la liste.

Si un nom tapé correspond à quelqu'un marqué comme **Non autorisé** pour ce ménage, le kiosque bloque le départ avec un avertissement. Un membre du personnel peut choisir de **Remplacer** pour continuer quand même -- le remplacement est enregistré sur le dossier de participation avec le nom de la personne.

Une fois la personne qui prend en charge confirmée, appuyez sur le départ. Le nom de la personne qui reprend est stocké avec le dossier de participation.

:::info
Les personnes de prise en charge de confiance et non autorisées sont gérées par le personnel de l'église sur la page de chaque personne dans B1 Admin -- consultez [Sécurité de l'enregistrement](../../b1-admin/attendance/checkin-safety#trusted-and-not-authorized-pickup-people).
:::

## Appel d'un parent

Vous avez besoin d'un parent pendant le service -- un changement de couche, un enfant qui pleure ? À partir de l'écran de départ sur une station avec personnel, le personnel peut envoyer une **page** : un message texte aux parents ou tuteurs de l'enfant via le fournisseur de texte de l'église. Les parents qui ont refusé les textes ou qui n'ont pas de numéro de mobile sont ignorés, et le kiosque affiche le nombre de messages envoyés.

## Réimpression des étiquettes

Si une étiquette de nom ou une étiquette de retrait est perdue ou endommagée, le personnel d'une station avec personnel peut **réimprimer** les étiquettes de la famille à partir de l'écran de départ après avoir entré le code de sécurité. La réimpression utilise la même imprimante et les mêmes modèles d'étiquette que l'enregistrement d'origine.

## Diffusion d'urgence

En cas d'urgence, le personnel peut envoyer un message texte aux tuteurs de **chaque enfant enregistré** pour le service actuel en une seule fois :

1. Ouvrez les **paramètres d'administration** du kiosque (7 appuis rapides sur le logo d'en-tête, plus le code PIN le cas échéant).
2. Appuyez sur **Diffusion d'urgence**.
3. Entrez le message, puis tapez **URGENCE** dans le champ de confirmation -- le bouton **Envoyer la diffusion** reste désactivé jusqu'à ce que vous le fassiez.
4. Le kiosque rapporte combien de téléphones ont reçu le message et combien de personnes ont été ignorées (ont refusé ou n'ont pas de numéro de mobile).

:::warning
La diffusion va à chaque ménage enregistré pour le service sélectionné. Utilisez-le pour les urgences réelles -- évacuations, confinement, intempéries graves.
:::

## Articles connexes

- [Fin de l'enregistrement](./completing-checkin) -- d'où proviennent les codes de sécurité et les étiquettes de retrait
- [Sécurité de l'enregistrement](../../b1-admin/attendance/checkin-safety) -- configuration des capacités, ratios, personnes de prise en charge et exigence du fournisseur de texte
- [Configuration de l'imprimante](../getting-started/printer-setup) -- configuration de l'imprimante d'étiquettes
