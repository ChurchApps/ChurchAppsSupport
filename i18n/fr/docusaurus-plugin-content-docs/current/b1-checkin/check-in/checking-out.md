---
title: "Départ et sécurité des enfants"
---

# Départ et sécurité des enfants

<div class="article-intro">

Le départ boucle le processus d'enregistrement des enfants : un parent présente le code de sécurité de son étiquette de récupération, le kiosque vérifie qui vient chercher l'enfant, et les enfants sont pris en charge pour le départ. Les postes encadrés bénéficient aussi d'outils de sécurité — vérification des personnes autorisées à récupérer les enfants, textos d'appel des parents, réimpression d'étiquettes de sécurité, et diffusion d'urgence.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Le départ est disponible sur les postes réglés en mode **encadré** dans les paramètres d'administration du kiosque
- Les enfants doivent avoir été [enregistrés](./completing-checkin) avec une étiquette de récupération imprimée portant le code de sécurité
- L'appel des parents et les diffusions d'urgence nécessitent que votre église ait un fournisseur de messagerie texte connecté dans B1 Admin

</div>

## Démarrer un départ

1. Sur un poste encadré, appuyez sur **Départ** sur l'écran de recherche.
2. Saisissez le **code de sécurité** à 4 caractères de l'étiquette de récupération de la famille. Vous pouvez le taper, utiliser le pavé numérique à l'écran, ou scanner le code-barres de l'étiquette avec un scanner USB ou Bluetooth — le code se soumet automatiquement une fois les 4 caractères saisis.
3. Le kiosque affiche les enfants enregistrés sous ce code.

## Vérifier qui vient chercher l'enfant

L'écran de départ demande qui vient chercher les enfants :

- Les **personnes autorisées à récupérer** du foyer apparaissent comme des cartes sélectionnables avec leur photo et leur relation — appuyez sur la personne qui se trouve devant vous.
- Les **adultes du foyer** apparaissent également dans une grille de photos.
- **Autre** vous permet de saisir un nom pour quelqu'un qui n'est pas sur la liste.

Si un nom saisi correspond à quelqu'un marqué **Non autorisé** pour ce foyer, le kiosque bloque le départ avec un avertissement. Un membre du personnel peut choisir **Passer outre** pour continuer quand même — la dérogation est enregistrée sur le dossier de présence avec le nom de la personne.

Une fois la personne confirmée, appuyez sur départ. Le nom de la personne venant chercher l'enfant est enregistré avec le dossier de présence.

:::info
Les personnes autorisées et non autorisées à récupérer les enfants sont gérées par le personnel de l'église sur la page de chaque personne dans B1 Admin — voir [Sécurité de l'enregistrement](../../b1-admin/attendance/checkin-safety#trusted-and-not-authorized-pickup-people).
:::

## Appeler un parent

Besoin d'un parent pendant le service — un changement de couche, un enfant qui pleure ? Depuis l'écran de départ d'un poste encadré, le personnel peut envoyer un **appel** : un message texte aux parents ou tuteurs de l'enfant via le fournisseur de messagerie texte de l'église. Les parents ayant refusé les textos ou n'ayant pas de numéro de mobile sont ignorés, et le kiosque affiche combien de messages ont été envoyés.

## Réimprimer des étiquettes

Si une étiquette nominative ou de récupération est perdue ou endommagée, le personnel d'un poste encadré peut **réimprimer** les étiquettes de la famille depuis l'écran de départ après avoir saisi le code de sécurité. La réimpression utilise la même imprimante et les mêmes modèles d'étiquettes que l'enregistrement d'origine.

## Diffusion d'urgence

En cas d'urgence, le personnel peut envoyer un texto aux tuteurs de **chaque enfant enregistré** pour le service en cours, tous en même temps :

1. Ouvrez les **paramètres d'administration** du kiosque (7 appuis rapides sur le logo de l'en-tête, plus le code PIN s'il y en a un).
2. Appuyez sur **Diffusion d'urgence**.
3. Saisissez le message, puis tapez **EMERGENCY** dans le champ de confirmation — le bouton **Envoyer la diffusion** reste désactivé tant que vous ne l'avez pas fait.
4. Le kiosque indique combien de téléphones ont reçu le message et combien de personnes ont été ignorées (refus ou absence de numéro de mobile).

:::warning
La diffusion est envoyée à chaque foyer enregistré pour le service sélectionné. Utilisez-la pour de véritables urgences — évacuations, confinements, intempéries sévères.
:::

## Articles associés

- [Terminer l'enregistrement](./completing-checkin) — d'où proviennent les codes de sécurité et les étiquettes de récupération
- [Sécurité de l'enregistrement](../../b1-admin/attendance/checkin-safety) — configurer les capacités, ratios, personnes autorisées à récupérer, et l'exigence de fournisseur de messagerie texte
- [Configuration de l'imprimante](../getting-started/printer-setup) — configuration de l'imprimante d'étiquettes
