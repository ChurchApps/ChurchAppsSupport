---
title: "Concepteur d'étiquettes d'enregistrement"
description: "Personnalisez les modèles de badges et de coupons de récupération imprimés lors de l'enregistrement dans B1 Admin, y compris les champs, le positionnement et les conditions d'anniversaire ou de notes."
---

# Concepteur d'étiquettes d'enregistrement

<div class="article-intro">

Le concepteur d'étiquettes vous permet de créer et de personnaliser les modèles de badges et de coupons de récupération imprimés lorsque les familles enregistrent leurs enfants. Vous contrôlez exactement les informations qui apparaissent sur chaque étiquette, leur position et leur apparence.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Configurez les [Présences](./setup.md) et paramétrez au moins un horaire de service avec l'enregistrement activé
- Configurez l'[Enregistrement](./check-in.md) afin que les étiquettes s'impriment
- Vous devez disposer de l'autorisation **Modifier les présences**

</div>

## Ouvrir le concepteur d'étiquettes {#opening-the-label-designer}

Dans B1 Admin, ouvrez le [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (la barre de recherche en haut à gauche), développez **Mobile** et cliquez sur **Étiquettes**. Vous pouvez aussi cliquer sur **B1 CheckIn**, puis sur **Concevoir les étiquettes** dans la carte **Étiquettes d'enregistrement**.

La page **Étiquettes d'enregistrement** liste vos modèles enregistrés avec leur **Nom**, leur **Type** (**Badge** ou **Coupon de récupération**) et leur **Taille**. Si vous n'en avez pas encore créé, la page indique **Aucun modèle d'étiquette**, et B1 Checkin imprime son badge et son coupon de récupération intégrés.

## Types d'étiquettes {#label-types}

- **Badge** — imprimé et attaché à l'enfant. Comprend généralement le nom de l'enfant, sa classe ou sa séance, et un code de sécurité.
- **Coupon de récupération** — remis au parent ou au tuteur. Comprend généralement le code de sécurité et la liste des enfants qu'il a enregistrés.

Les deux modèles de départ sont dimensionnés pour des étiquettes thermiques standard de 3,5 × 1,1 pouce (Brother DK-1201).

## Créer un modèle d'étiquette {#creating-a-label-template}

1. Cliquez sur **Ajouter une étiquette** et choisissez un point de départ : **Badge 3,5" x 1,1"**, **Coupon de récupération 3,5" x 1,1"** ou **Vierge**.
2. Le modèle s'ouvre dans l'éditeur d'étiquettes, avec un aperçu de l'étiquette remplie de données d'exemple.

### Éditeur d'étiquettes {#label-editor}

En haut de l'éditeur, vous pouvez définir :

- **Nom** — le nom du modèle (pour votre référence seulement ; obligatoire)
- **Type** — Badge ou Coupon de récupération
- **Largeur (po)** / **Hauteur (po)** — dimensions de l'étiquette en pouces

### Ajouter des blocs {#adding-blocks}

Une étiquette est composée de blocs — des éléments de contenu individuels placés sur l'étiquette. Cliquez sur un bouton du panneau **Ajouter un bloc** pour en ajouter un :

- **Champs** — insèrent une valeur au moment de l'impression. Les badges proposent **Nom d'affichage**, **Prénom**, **Nom**, **Surnom**, **Notes du badge** (les notes de la fiche de la personne), **Anniversaire cette semaine** (vrai lorsque l'anniversaire de la personne tombe dans les 3 jours avant ou après la date d'enregistrement), **Séances** (les horaires de service et les salles où elle s'est enregistrée), **Code de sécurité**, **Date** et **Nom de l'église**. Les coupons de récupération proposent **Enfants**, **Enfants et allergies**, **Code de sécurité**, **Date** et **Nom de l'église**.
- **Texte** — texte statique que vous saisissez (pour les titres, les libellés ou les instructions)
- **Code-barres** — un code-barres Code 128 ou Code 39 d'un champ, comme le code de sécurité
- **Code QR** — un code QR d'un champ
- **Boîte** — un rectangle avec une couleur de remplissage et une bordure facultatives

### Positionner et styliser les blocs {#positioning-and-styling-blocks}

Faites glisser un bloc sur l'étiquette pour le déplacer, ou cliquez dessus et utilisez le panneau **Propriétés**. **X**, **Y**, **L** et **H** sont des pourcentages de l'étiquette (0 à 100). Selon le bloc, vous pouvez aussi définir :

- **Taille de police** — taille du texte, proportionnelle à la hauteur de l'étiquette
- **Gras** et **Italique**
- **Alignement** — Gauche, Centre ou Droite
- **Symbologie** et **Valeur** — pour les codes-barres et les codes QR
- **Remplissage** et **Bordure** — pour les boîtes
- **Condition** — **Toujours** affiche le bloc. Choisissez un champ pour n'afficher le bloc que lorsque ce champ **n'est pas vide**, **est vide**, **est égal à** ou **n'est pas égal à** une valeur. Par exemple, n'afficher les notes du badge que lorsqu'elles sont remplies, ou afficher un graphique d'anniversaire seulement lorsque **Anniversaire cette semaine** est égal à `true`.

Cliquez sur **Supprimer le bloc** pour effacer le bloc sélectionné.

### Enregistrer {#saving}

Cliquez sur **Enregistrer** pour sauvegarder le modèle, ou sur **Annuler** pour abandonner vos modifications. B1 Checkin utilise le modèle mis à jour la prochaine fois qu'il charge ses paramètres.

## Choisir le modèle par défaut {#choosing-the-default-template}

Si vous avez plusieurs modèles d'un même type, cliquez sur **Définir par défaut** pour celui que B1 Checkin doit imprimer. Il affiche un badge **Par défaut**, et tout autre modèle de ce type cesse d'être celui par défaut. Si aucun modèle d'un type n'est marqué par défaut, la borne utilise le premier.

## Supprimer un modèle {#deleting-a-template}

Cliquez sur **Supprimer** sur la ligne du modèle et confirmez. Si vous supprimez tous les modèles d'un type, B1 Checkin revient à l'étiquette intégrée pour ce type.

:::tip
Faites une impression test après avoir modifié un modèle pour vérifier que la mise en page est correcte avant votre prochain service.
:::

## Articles connexes {#related-articles}

- [Configuration des présences](./setup.md) — configurer les services et les groupes pour l'enregistrement
- [Enregistrement](./check-in.md) — configurer la borne B1 Checkin
- [Premiers pas avec B1 Checkin](../../b1-checkin/getting-started/index.md) — l'application de borne Checkin
