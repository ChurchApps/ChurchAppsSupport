---
title: "Départ et sécurité des enfants"
description: "Faites sortir les enfants sur un poste B1 Checkin : codes de sécurité, personnes autorisées vérifiées, appel des parents, réimpression d'étiquettes et diffusions d'urgence."
---

# Départ et sécurité des enfants {#checking-out--child-safety}

<div class="article-intro">

Le départ ferme la boucle de l'enregistrement des enfants : un parent présente le code de sécurité de son étiquette de retrait, le kiosque vérifie qui vient chercher l'enfant, et les enfants sont enregistrés comme partis. Les postes avec personnel disposent aussi d'outils de sécurité -- vérification de la personne autorisée à reprendre l'enfant, messages texte pour appeler un parent, réimpression des étiquettes de sécurité et diffusion d'urgence.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Le départ est disponible sur les postes définis en mode **avec personnel** dans les paramètres d'administration du kiosque
- Les enfants doivent avoir été [enregistrés](./completing-checkin.md) avec une étiquette de retrait imprimée portant le code de sécurité
- L'appel de parents et les diffusions d'urgence nécessitent que votre église ait un fournisseur de messagerie texte connecté dans B1 Admin

</div>

## Démarrer un départ {#starting-a-check-out}

1. Sur un poste avec personnel, appuyez sur **Départ** à l'écran de recherche.
2. Saisissez le **code de sécurité** à 4 caractères de l'étiquette de retrait de la famille. Vous pouvez le taper, utiliser le clavier à l'écran ou scanner le code-barres de l'étiquette avec un scanner USB ou Bluetooth -- le code est soumis automatiquement dès que les 4 caractères sont saisis.
   - Pas de scanner ? Appuyez sur **Scanner** sous le champ du code pour utiliser plutôt la caméra de la tablette. Présentez le code QR ou le code-barres de l'étiquette de retrait devant la caméra, dans la fenêtre **Scanner le code de retrait**, et le code est saisi pour vous. La caméra arrière est utilisée par défaut ; appuyez sur le bouton de retournement pour changer de caméra, ou appuyez sur **Annuler** pour revenir à la saisie au clavier.
3. Le kiosque affiche les enfants enregistrés sous ce code.

### Retrouver une famille sans le code {#finding-a-family-without-the-code}

Si le parent a perdu son étiquette de retrait, recherchez plutôt la famille :

1. Sur l'écran **Départ**, appuyez sur **Rechercher par nom** (à côté de **Scanner**).
2. Saisissez le nom de famille et appuyez sur **Rechercher**, ou appuyez sur **Utiliser le numéro de téléphone** pour saisir un numéro de téléphone (au moins les 4 derniers chiffres) sur le clavier.
3. Appuyez sur la personne dans les résultats. Le kiosque trouve tous les membres de ce foyer enregistrés aujourd'hui et non encore sortis, et les affiche exactement comme si le code avait été saisi.

Si personne du foyer n'est enregistré, le kiosque affiche « Personne de ce foyer n'est enregistré pour le moment. » Appuyez sur **Nouvelle recherche** pour chercher à nouveau, ou sur **Saisir un code** pour revenir au champ du code.

La vérification de la personne qui vient chercher l'enfant s'applique toujours : les personnes autorisées de confiance et les adultes du foyer sont affichés, et les noms non autorisés restent bloqués.

## Vérifier qui vient chercher l'enfant {#verifying-who-is-picking-up}

L'écran de départ demande qui vient chercher les enfants :

- Les **personnes autorisées de confiance** du foyer apparaissent comme des cartes sur lesquelles on peut appuyer, avec leur photo et leur lien de parenté -- appuyez sur la personne qui se trouve devant vous.
- Les **adultes du foyer** apparaissent aussi dans une grille de photos.
- **Autre** vous permet de saisir le nom d'une personne absente de la liste.

Si un nom saisi correspond à une personne marquée **Non autorisée** pour ce foyer, le kiosque bloque le départ et affiche un avertissement. Un membre du personnel peut choisir **Passer outre** pour poursuivre quand même -- la dérogation est consignée sur le dossier de présence avec le nom de la personne.

Une fois la personne qui vient chercher l'enfant confirmée, appuyez sur sortir. Le nom de cette personne est enregistré avec le dossier de présence.

:::info
Les personnes autorisées de confiance et les personnes non autorisées sont gérées par le personnel de l'église sur la page de chaque personne dans B1 Admin -- voir [Sécurité de l'enregistrement](../../b1-admin/attendance/checkin-safety.md#trusted-and-not-authorized-pickup-people).
:::

## Appeler un parent {#paging-a-parent}

Vous avez besoin d'un parent pendant le service -- un changement de couche, un enfant qui pleure ? Depuis l'écran de départ d'un poste avec personnel, le personnel peut envoyer un **appel** : un message texte aux parents ou tuteurs de l'enfant, via le fournisseur de messagerie texte de l'église. Les parents qui ont refusé les textos ou qui n'ont pas de numéro de téléphone mobile sont ignorés, et le kiosque affiche le nombre de messages envoyés.

## Réimprimer les étiquettes {#reprinting-labels}

Si une étiquette de nom ou une étiquette de retrait est perdue ou endommagée, le personnel d'un poste avec personnel peut **réimprimer** les étiquettes de la famille depuis l'écran de départ, après avoir saisi le code de sécurité. La réimpression utilise la même imprimante et les mêmes modèles d'étiquettes que l'enregistrement d'origine.

## Diffusion d'urgence {#emergency-broadcast}

En cas d'urgence, le personnel peut envoyer un message texte aux tuteurs de **chaque enfant enregistré** pour le service en cours, en une seule fois :

1. Ouvrez les **paramètres d'administration** du kiosque (7 appuis rapides sur le logo de l'en-tête, plus le NIP s'il y en a un).
2. Appuyez sur **Diffusion d'urgence**.
3. Saisissez le message, puis tapez **EMERGENCY** dans le champ de confirmation -- le bouton **Envoyer la diffusion** reste désactivé tant que vous ne l'avez pas fait.
4. Le kiosque indique combien de téléphones ont reçu le message et combien de personnes ont été ignorées (désabonnées ou sans numéro de téléphone mobile).

:::warning
La diffusion est envoyée à chaque foyer enregistré pour le service sélectionné. Réservez-la aux véritables urgences -- évacuations, confinements, intempéries graves.
:::

## Articles connexes {#related-articles}

- [Terminer l'enregistrement](./completing-checkin.md) -- d'où proviennent les codes de sécurité et les étiquettes de retrait
- [Sécurité de l'enregistrement](../../b1-admin/attendance/checkin-safety.md) -- configuration des capacités, des ratios, des personnes autorisées et exigence du fournisseur de messagerie texte
- [Configuration de l'imprimante](../getting-started/printer-setup.md) -- configuration de l'imprimante d'étiquettes
