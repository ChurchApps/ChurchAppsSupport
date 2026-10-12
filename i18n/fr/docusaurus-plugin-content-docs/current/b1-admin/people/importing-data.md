---
title: "Importer des données"
---

# Importer des données

<div class="article-intro">

L'outil B1 Transfer vous permet d'intégrer facilement vos données existantes dans B1, que vous partiez d'un tableur, que vous migriez depuis une autre plateforme de gestion d'église ou que vous importiez des historiques de dons. Il peut également servir à exporter ou sauvegarder vos données à tout moment.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Vous devez disposer d'un compte B1 Admin actif avec accès aux **Paramètres**.
- Préparez et exportez vos données depuis votre ancien système avant de commencer.
- Cet outil est destiné à la migration initiale des données. Si vous utilisez déjà B1 depuis un certain temps, une nouvelle importation risque de créer des doublons.

</div>

## Accéder à l'outil de transfert

1. Connectez-vous à **B1 Admin**.
2. Ouvrez le [menu de navigation rapide](../introduction.md#getting-around-with-the-jump-menu) (la barre de recherche en haut à gauche), développez **Paramètres**, puis cliquez sur **Paramètres**.
3. Cliquez sur le lien **Importer/Exporter** sous le nom de votre église, en haut du menu des paramètres à gauche.
4. Cela ouvrira l'outil **B1 Transfer** dans un nouvel onglet, à l'adresse [transfer.b1.church](https://transfer.b1.church).

L'outil de transfert vous guide en quatre étapes : Source, Aperçu, Destination et Exécution.

---

## Étape 1 - Choisir votre source

Sélectionnez l'origine de vos données. Il existe sept options :

- **Base de données B1** — Extrait les données directement de votre église B1 existante. Utile pour faire une sauvegarde ou convertir vos données dans un autre format. Vous devez être connecté pour utiliser cette option.
- **Archive ZIP B1** — Un fichier zip au format propre à B1. Il sert principalement à restaurer un export B1 précédent.
- **Archive ZIP Breeze** — Un fichier zip contenant des fichiers exportés depuis Breeze ChMS.
- **Archive ZIP Planning Center** — Un fichier zip ou CSV exporté depuis Planning Center.
- **CSV / Excel personnalisé** — Tout fichier CSV ou Excel contenant des données de personnes. Après le téléversement, vous associerez vos colonnes aux champs B1 avant de poursuivre l'importation.
- **CSV Tithe.ly** — Un fichier d'export de personnes ou de dons depuis Tithe.ly (formats CSV ou Excel acceptés).
- **CSV CCB / Pushpay** — Un export CSV de personnes ou de dons depuis Church Community Builder ou Pushpay.

Vous pouvez glisser-déposer votre fichier dans la zone de téléversement, ou cliquer pour le rechercher sur votre ordinateur.

---

## Étape 1b - Associer vos champs (CSV / Excel personnalisé uniquement)

Si vous avez sélectionné **CSV / Excel personnalisé**, après le téléversement de votre fichier, l'outil affiche un écran d'association des champs avant de passer à l'aperçu.

Chaque colonne de votre fichier est listée avec une valeur d'exemple. Pour chaque colonne, utilisez la liste déroulante pour choisir le champ B1 correspondant. L'outil détecte automatiquement les noms de colonnes courants comme « Prénom », « E-mail » ou « Code postal », mais vous devez vérifier chaque ligne et corriger ce qui n'a pas été reconnu.

Les champs B1 disponibles incluent :

- Prénom, Nom, Deuxième prénom, Surnom, Nom d'affichage, Civilité/Titre, Suffixe
- E-mail, Téléphone domicile, Téléphone mobile, Téléphone travail
- Adresse ligne 1, Adresse ligne 2, Ville, Région, Code postal
- Date de naissance, Date d'anniversaire de mariage, Genre, Situation familiale, Statut de membre
- Nom du foyer/de la famille
- Nom du groupe — affecte la personne à un groupe par son nom
- **Champ personnalisé (correspondance par nom)** — enregistre la colonne dans l'un des [champs personnalisés de personne](../settings/custom-fields.md) de votre église. Une zone **Nom du champ B1** apparaît, pré-remplie avec l'en-tête de la colonne. Modifiez-la pour y saisir le nom du champ exactement tel qu'il apparaît dans B1 (la casse n'a pas d'importance).
- **Réponse de formulaire (champ personnalisé)** — enregistre la valeur de cette colonne comme champ personnalisé rattaché à la fiche de la personne. Si vous utilisez cette option, il vous sera demandé de donner un nom au formulaire.

Les dates peuvent être dans des formats courants comme `9/17/1994` et sont converties automatiquement. Pour les champs personnalisés, les champs Oui/Non acceptent des valeurs comme Oui, Non, O, N, Vrai, Faux, 1 et 0, et les champs à choix multiple acceptent soit le texte du choix, soit sa valeur.

:::info
Créez vos champs personnalisés de personne dans B1 Admin avant l'importation. Une fois l'importation terminée, l'étape **Champs personnalisés** liste les noms de colonnes qui ne correspondent à aucun champ B1 et compte les valeurs qui ne correspondent pas au type du champ. Ces valeurs sont ignorées, et le reste de l'importation se termine normalement.
:::

Les colonnes que vous ne souhaitez pas importer peuvent être réglées sur **(Ignorer)**. Au moins un champ de nom (Prénom ou Nom) doit être associé avant de pouvoir continuer.

Cliquez sur **Confirmer l'association et importer** pour passer à l'aperçu.

---

## Étape 2 - Prévisualiser vos données

Après le téléversement, l'outil affiche un aperçu de tout ce qui sera importé. Utilisez les onglets pour examiner chaque type de données :

- **Personnes** — Classées par foyer, avec les photos si elles sont incluses.
- **Groupes** — Organisés par campus, culte, horaire et catégorie.
- **Présences** — Dates des sessions, groupes et nombre de visites.
- **Dons** — Lots, fonds, donateurs et montants.
- **Formulaires** — Noms des formulaires et types de contenu.

Vérifiez attentivement avant de continuer. Si quelque chose semble incorrect, cliquez sur **Recommencer** et corrigez votre fichier source.

---

## Étape 3 - Choisir votre destination

Sélectionnez l'endroit où vous souhaitez envoyer les données :

- **Base de données B1** — Importe directement dans la base de données B1 de votre église. Après avoir sélectionné cette option, l'outil affiche le nombre final d'enregistrements à ajouter. Cliquez sur **Démarrer le transfert** pour confirmer.
- **Archive ZIP d'export B1** — Télécharge vos données sous forme d'archive zip au format B1. Idéal pour les sauvegardes.
- **Archive ZIP d'export Breeze** — Convertit vos données au format Breeze.
- **Archive ZIP Planning Center** — Convertit vos données au format Planning Center.

:::warning
La source et la destination ne peuvent pas être dans le même format. Si elles correspondent, l'outil vous avertit pour éviter une duplication accidentelle.
:::

---

## Étape 4 - Exécution

L'outil traite le transfert et affiche la progression de chaque étape :

- Campus, cultes et horaires
- Personnes
- Photos
- Groupes et membres de groupes
- Dons
- Présences
- Formulaires, questions, réponses et réponses de formulaires
- Champs personnalisés (si vous avez associé des colonnes de champs personnalisés)
- Compression (uniquement pour les destinations en archive zip)

Lorsque la destination est **Base de données B1**, la carte de progression s'intitule **Progression de l'importation** et se termine par **Importation terminée !** (ou **Importation terminée avec des erreurs**). Pour les destinations en archive zip, les mêmes messages utilisent le mot **Export**.

:::warning
Ne fermez pas votre navigateur pendant le transfert. Attendez que toutes les étapes apparaissent comme terminées.
:::

---

## Préparer une archive ZIP d'importation Breeze

1. Dans Breeze, accédez aux **Paramètres** et cliquez sur **Exporter** dans la barre latérale gauche.
2. Exportez trois fichiers distincts : **Personnes**, **Étiquettes** et **Contributions**.
3. Sélectionnez les trois fichiers, faites un clic droit et compressez-les dans un seul fichier zip.
   - Sur un Mac : sélectionnez les fichiers, faites un clic droit et choisissez **Compresser**.
   - Sur un PC : sélectionnez les fichiers, faites un clic droit, choisissez **Envoyer vers**, puis **Dossier compressé (zippé)**.
4. Téléversez le fichier zip à l'aide de l'option **Archive ZIP Breeze** à l'étape 1.

L'importation Breeze transfère automatiquement les personnes, les groupes (étiquettes) et les dons.

---

## Préparer un export Planning Center

1. Connectez-vous à Planning Center et ouvrez le produit **People**.
2. Dans la barre latérale gauche, cliquez sur **Listes** et créez une liste qui inclut toutes les personnes que vous souhaitez transférer. (Si vous avez déjà une liste de l'ensemble de votre communauté, utilisez-la.)
3. Ouvrez la liste et utilisez son option **export** pour télécharger vos personnes au format **CSV**. Incluez les champs que vous souhaitez conserver : nom, e-mail, téléphone, adresse, date de naissance, genre et statut de membre sont tous transférés vers B1.
4. Si Planning Center vous fournit plusieurs fichiers, sélectionnez-les tous, faites un clic droit et compressez-les dans une seule archive zip.
   - Sur un Mac : sélectionnez les fichiers, faites un clic droit et choisissez **Compresser**.
   - Sur un PC : sélectionnez les fichiers, faites un clic droit, choisissez **Envoyer vers**, puis **Dossier compressé (zippé)**.
5. Téléversez le CSV ou le fichier zip à l'aide de l'option **Archive ZIP Planning Center** à l'étape 1.

Après le téléversement, passez à l'aperçu et vérifiez que vos personnes et vos foyers sont corrects avant de lancer l'importation.

---

## Préparer un export Tithe.ly

1. Dans Tithe.ly, exportez vos données **Personnes** au format CSV ou Excel. Vous pouvez également exporter un fichier **Dons** distinct si vous souhaitez importer des enregistrements de dons.
2. L'outil détecte automatiquement si le fichier contient des données de personnes ou de dons, en fonction des noms de colonnes.
3. Téléversez le fichier à l'aide de l'option **CSV Tithe.ly** à l'étape 1.

:::info
Les exports Tithe.ly s'importent un fichier à la fois. Lancez le processus deux fois si vous devez importer séparément les personnes et les dons.
:::

---

## Préparer un export CCB ou Pushpay

1. Dans Church Community Builder ou Pushpay, exportez vos données **Personnes** au format CSV. Vous pouvez également exporter un fichier distinct de dons ou de contributions.
2. L'outil détecte automatiquement si le fichier contient des données de personnes ou de dons, en fonction des noms de colonnes.
3. Téléversez le fichier à l'aide de l'option **CSV CCB / Pushpay** à l'étape 1.

---

## Après l'importation

Une fois le transfert terminé, prenez quelques minutes pour vérifier vos données :

1. Parcourez la page [Personnes](../people/adding-people.md) et examinez quelques fiches au hasard.
2. Vérifiez que les noms, e-mails, numéros de téléphone et adresses ont été correctement importés.
3. Vérifiez que les liens entre les foyers sont intacts. Le rôle de chaque personne dans son foyer (Chef de famille, Conjoint, Enfant ou Autre) est conservé lorsque la source en contient un : la colonne **householdRole** dans une archive ZIP B1, **Family Role** dans Breeze ou Tithe.ly, et **Family Position** dans CCB / Pushpay. Les rôles tels que « Head of Household », « Primary », « Wife » ou « Son » sont convertis au rôle B1 correspondant. Les importations Planning Center et CSV / Excel personnalisé ne comportent pas de colonne de rôle : ces personnes sont donc définies sur **Autre**. Vous pouvez modifier le rôle depuis le foyer de la personne sur la page [Personnes](../people/adding-people.md#managing-households).
4. Examinez les groupes et les enregistrements de dons importés.

Si vous remarquez des problèmes, vous pouvez modifier les fiches individuelles depuis la page Personnes. Vous pouvez également relancer l'outil de transfert pour [exporter vos données](exporting-data.md) comme sauvegarde.
