---
title: "Fermeture et sécurité des enfants"
---

# Fermeture et sécurité des enfants

<div class="article-intro">

La fermeture termine la boucle de la présence des enfants : un parent présente le code de sécurité de son étiquette de récupération, le kiosque vérifie qui vient chercher, et les enfants sont fermés. Les stations gérées obtiennent également des outils de sécurité - vérification de la récupération approuvée, appels texte aux parents, réimpressions d'étiquettes de sécurité et une diffusion d'urgence.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- La fermeture est disponible sur les stations configurées en mode **géré** dans les paramètres d'administration du kiosque
- Les enfants doivent avoir été [enregistrés](./completing-checkin) avec une étiquette de récupération imprimée portant le code de sécurité
- L'appel et les diffusions d'urgence nécessitent que votre église ait un fournisseur de messagerie connecté dans B1 Admin

</div>

## Démarrage d'une fermeture

1. Sur une station gérée, appuyez sur **Fermer** sur l'écran de recherche.
2. Entrez le code de sécurité à **4 caractères** de l'étiquette de récupération de la famille. Vous pouvez le taper, utiliser le clavier à l'écran ou scanner le code-barres de l'étiquette avec un scanner USB ou Bluetooth - le code est soumis automatiquement une fois les 4 caractères saisis.
3. Le kiosque affiche les enfants enregistrés sous ce code.

## Vérification de qui récupère

L'écran de fermeture demande qui vient chercher les enfants :

- Les **personnes de récupération de confiance** pour la famille apparaissent sous forme de cartes appuyables avec leur photo et relation - appuyez sur la personne devant vous.
- Les **adultes du ménage** apparaissent également dans une grille de photos.
- **Autre** vous permet de taper un nom pour quelqu'un qui n'est pas sur la liste.

Si un nom tapé correspond à quelqu'un marqué comme **Non autorisé** pour ce ménage, le kiosque bloque la fermeture avec un avertissement. Un membre du personnel peut choisir **Remplacer** pour continuer quand même - le remplacement est enregistré sur l'enregistrement de présence avec le nom de la personne.

Une fois que la personne qui récupère est confirmée, appuyez sur fermer. Le nom de cette personne est stocké avec l'enregistrement de présence.

:::info
Les personnes de récupération approuvée et non autorisée sont gérées par le personnel de l'église sur la page de chaque personne dans B1 Admin - voir [Sécurité de la présence](../../b1-admin/attendance/checkin-safety#trusted-and-not-authorized-pickup-people).
:::

## Appel d'un parent

Vous avez besoin d'un parent pendant le service - un changement de couche, un enfant qui pleure ? Depuis l'écran de fermeture d'une station gérée, le personnel peut envoyer un **appel** : un message texte aux parents ou tuteurs de l'enfant via le fournisseur de messagerie texte de l'église. Les parents qui ont refusé les textes ou n'ont pas de numéro de téléphone mobile sont ignorés, et le kiosque affiche combien de messages ont été envoyés.

## Réimpression des étiquettes

Si une étiquette de nom ou une étiquette de récupération est perdue ou endommagée, le personnel d'une station gérée peut **réimprimer** les étiquettes de la famille depuis l'écran de fermeture après avoir entré le code de sécurité. La réimpression utilise la même imprimante et les mêmes modèles d'étiquette que l'enregistrement original.

## Diffusion d'urgence

En cas d'urgence, le personnel peut envoyer un texte aux tuteurs de **chaque enfant enregistré** pour le service actuel à la fois :

1. Ouvrez les **paramètres d'administration** du kiosque (7 appuis rapides sur le logo d'en-tête, plus le code PIN s'il en existe un).
2. Appuyez sur **Diffusion d'urgence**.
3. Entrez le message, puis tapez **URGENCE** dans le champ de confirmation - le bouton **Envoyer la diffusion** reste désactivé jusqu'à ce que vous le fassiez.
4. Le kiosque signale combien de téléphones ont reçu le message et combien de personnes ont été ignorées (refusé ou pas de numéro de téléphone mobile).

:::warning
La diffusion va à chaque ménage enregistré pour le service sélectionné. Utilisez-la pour les vraies urgences - évacuations, confinement, intempéries graves.
:::

## Articles connexes

- [Complétion de la présence](./completing-checkin) - d'où viennent les codes de sécurité et les étiquettes de récupération
- [Sécurité de la présence](../../b1-admin/attendance/checkin-safety) - configuration des capacités, ratios, personnes de récupération, et exigence du fournisseur de messagerie texte
- [Configuration de l'imprimante](../getting-started/printer-setup) - configuration de l'imprimante d'étiquettes
