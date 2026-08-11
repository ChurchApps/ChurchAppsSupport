---
title: "Importation de données"
---

# Importation de données

<div class="article-intro">

L'outil B1 Transfer rend facile l'importation de vos données existantes dans B1, que vous commencez à nouveau à partir d'une feuille de calcul, migrez depuis une autre plateforme de gestion d'église ou importez des dossiers de dons. Il peut aussi être utilisé pour exporter ou sauvegarder vos données à tout moment.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Vous avez besoin d'un compte B1 Admin actif avec l'accès à **Paramètres**.
- Ayez vos données exportées et prêtes de votre système antérieur avant de commencer.
- Cet outil est destiné à la migration de données initiales. Si vous utilisez déjà B1 depuis un moment, réimporter peut créer des dossiers en double.

</div>

## Accès à l'outil de transfert

1. Connectez-vous à **B1 Admin**.
2. Ouvrez le **menu de section** dans le coin supérieur gauche (le nom de la section avec la petite flèche) et choisissez **Paramètres**.
3. Cliquez sur le bouton **Importation/Exportation** en haut à droite de l'en-tête de la page.
4. Cela ouvrira l'outil **B1 Transfer** dans un nouvel onglet à [transfer.b1.church](https://transfer.b1.church).

L'outil de transfert vous guide dans quatre étapes : Source, Aperçu, Destination et Exécution.

---

## Étape 1 - Choisissez votre source

Sélectionnez où viennent vos données. Il y a sept options :

- **Base de données B1** — Tire les données directement de votre église B1 existante. Utile pour faire une sauvegarde ou convertir vos données vers un autre format. Vous devez être connecté pour utiliser cette option.
- **Zip d'importation B1** — Un fichier zip au format propre de B1. Ceci est principalement utilisé pour restaurer une exportation B1 précédente.
- **Zip d'importation Breeze** — Un fichier zip contenant les fichiers exportés de Breeze ChMS.
- **Zip de Planning Center** — Un fichier zip ou CSV exporté de Planning Center.
- **CSV/Excel personnalisé** — N'importe quel fichier CSV ou Excel contenant des données de personnes. Après téléchargement, vous cartographierez vos colonnes aux champs B1 avant que l'importation ne procède.
- **CSV Tithe.ly** — Un fichier d'exportation de personnes ou de dons de Tithe.ly (format CSV ou Excel accepté).
- **CSV CCB / Pushpay** — Un CSV d'exportation de personnes ou de dons de Church Community Builder ou Pushpay.

Vous pouvez glisser-déposer votre fichier sur la zone de téléchargement, ou cliquer pour le parcourir.

---

## Étape 1b - Cartographie de vos champs (CSV/Excel personnalisé uniquement)

Si vous avez sélectionné **CSV/Excel personnalisé**, après avoir téléchargé votre fichier l'outil affichera un écran de cartographie de champs avant de passer à l'aperçu.

Chaque colonne de votre fichier est listée à côté d'une valeur d'exemple. Pour chaque colonne, utilisez le menu déroulant pour choisir le champ B1 correspondant. L'outil détectera automatiquement les noms de colonnes communs comme "Prénom", "Email" ou "Code postal", mais vous devez examiner chaque ligne et corriger ce qu'il a manqué.

Les champs B1 disponibles incluent :

- Prénom, Nom, Deuxième prénom, Surnom, Nom d'affichage, Titre/Préfixe, Suffixe
- Email, Téléphone domicile, Téléphone mobile, Téléphone travail
- Adresse ligne 1, Adresse ligne 2, Ville, État, Code postal
- Date de naissance, Sexe, État matrimonial, Statut d'adhésion
- Nom du ménage/Famille
- Nom du groupe — assigne la personne à un groupe par nom
- **Réponse de formulaire (champ personnalisé)** — enregistre la valeur de cette colonne comme un champ personnalisé attaché au dossier de la personne. Si vous utilisez cette option, on vous demandera de donner un nom au formulaire.

Les colonnes que vous ne voulez pas importer peuvent être définies sur **(Ignorer)**. Au moins un champ de nom (Prénom ou Nom) doit être cartographié avant de pouvoir continuer.

Cliquez sur **Confirmer la cartographie et importer** pour passer à l'aperçu.

---

## Étape 2 - Aperçu de vos données

Après le téléchargement, l'outil affiche un aperçu de tout ce qui sera importé. Utilisez les onglets pour examiner chaque type de données :

- **Personnes** — Listées par ménage, avec photos si incluses.
- **Groupes** — Organisés par campus, service, heure et catégorie.
- **Présence** — Dates de session, groupes et décomptes de visites.
- **Donations** — Lots, fonds, donateurs et montants.
- **Formulaires** — Noms de formulaires et types de contenu.

Passez-le soigneusement en revue avant de procéder. Si quelque chose n'a pas l'air correct, cliquez sur **Recommencer** et corrigez votre fichier source.

---

## Étape 3 - Choisissez votre destination

Sélectionnez où vous voulez que les données aillent :

- **Base de données B1** — Importe directement dans la base de données B1 de votre église. Après la sélection, l'outil affichera un décompte final des dossiers à ajouter. Cliquez sur **Démarrer le transfert** pour confirmer.
- **Zip d'exportation B1** — Télécharge vos données comme un fichier zip au format B1. Bon pour les sauvegardes.
- **Zip d'exportation Breeze** — Convertit vos données au format Breeze.
- **Zip de Planning Center** — Convertit vos données au format Planning Center.

:::warning
La source et la destination ne peuvent pas être du même format. S'ils correspondent, l'outil vous avertira pour empêcher la duplication accidentelle.
:::

---

## Étape 4 - Exécution

L'outil traite le transfert et affiche la progression pour chaque étape :

- Campus, Services et Heures
- Personnes
- Photos
- Groupes et membres des groupes
- Donations
- Présence
- Formulaires, Questions, Réponses et Soumissions de formulaires
- Compression (pour les destinations de fichiers zip uniquement)

:::warning
Ne fermez pas votre navigateur pendant le transfert. Attendez que toutes les étapes soient marquées comme complètes.
:::

---

## Préparation d'un Zip d'importation Breeze

1. Dans Breeze, allez à **Paramètres** et cliquez sur **Exporter** dans la barre latérale gauche.
2. Exportez trois fichiers séparés : **Personnes**, **Étiquettes** et **Contributions**.
3. Sélectionnez tous les trois fichiers, cliquez droit et compressez-les dans un seul fichier zip.
   - Sur un Mac : sélectionnez les fichiers, cliquez droit et choisissez **Compresser**.
   - Sur un PC : sélectionnez les fichiers, cliquez droit, choisissez **Envoyer vers**, puis **Dossier compressé (zippé)**.
4. Téléchargez le fichier zip en utilisant l'option **Zip d'importation Breeze** à l'étape 1.

L'importation Breeze transfère automatiquement les personnes, les groupes (étiquettes) et les dossiers de dons.

---

## Préparation d'une exportation Planning Center

1. Dans Planning Center, exportez vos données de personnes en tant que fichier CSV ou zip.
2. Téléchargez-le en utilisant l'option **Zip de Planning Center** à l'étape 1.

---

## Préparation d'une exportation Tithe.ly

1. Dans Tithe.ly, exportez vos données de **Personnes** en tant que fichier CSV ou Excel. Vous pouvez aussi exporter un fichier **Dons** séparé si vous voulez apporter des dossiers de dons.
2. L'outil détectera automatiquement si le fichier contient des données de personnes ou de dons en fonction des noms de colonnes.
3. Téléchargez le fichier en utilisant l'option **CSV Tithe.ly** à l'étape 1.

:::info
Les exportations Tithe.ly peuvent être importées un fichier à la fois. Exécutez le processus deux fois si vous avez besoin d'importer à la fois les dossiers de personnes et de dons séparément.
:::

---

## Préparation d'une exportation CCB ou Pushpay

1. Dans Church Community Builder ou Pushpay, exportez vos données de **Personnes** en tant que fichier CSV. Vous pouvez aussi exporter un fichier séparé de dons/contributions.
2. L'outil détectera automatiquement si le fichier contient des données de personnes ou de dons en fonction des noms de colonnes.
3. Téléchargez le fichier en utilisant l'option **CSV CCB / Pushpay** à l'étape 1.

---

## Après l'importation

Une fois le transfert terminé, prenez quelques minutes pour vérifier vos données :

1. Parcourez la page [Personnes](../people/adding-people.md) et faites un spot-check de quelques profils.
2. Confirmez que les noms, les emails, les numéros de téléphone et les adresses sont arrivés correctement.
3. Vérifiez que les connexions des ménages sont intactes.
4. Examinez les groupes importés et les dossiers de dons.

Si vous remarquez des problèmes, vous pouvez modifier des profils individuels depuis la page Personnes. Vous pouvez aussi réexécuter l'outil de transfert pour [exporter vos données](exporting-data.md) comme une sauvegarde.
