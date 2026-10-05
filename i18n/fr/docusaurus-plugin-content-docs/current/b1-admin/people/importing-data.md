---
title: "Importation de données"
---

# Importation de données

<div class="article-intro">

L'outil B1 Transfer facilite l'importation de vos données existantes dans B1, que vous commenciez à zéro à partir d'une feuille de calcul, que vous migriez d'une autre plateforme de gestion d'église ou que vous importiez des dossiers de dons. Il peut également être utilisé pour exporter ou sauvegarder vos données à tout moment.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Vous avez besoin d'un compte B1 Admin actif avec accès aux **Paramètres**.
- Vous devez avoir vos données exportées et prêtes depuis votre système précédent avant de commencer.
- Cet outil est destiné à la migration initiale des données. Si vous utilisez déjà B1 depuis un certain temps, une nouvelle importation peut créer des dossiers en double.

</div>

## Accès à l'outil de transfert

1. Connectez-vous à **B1 Admin**.
2. Ouvrez le [menu Sauter](../introduction.md#getting-around-with-the-jump-menu) (la barre de recherche en haut à gauche), développez **Paramètres**, et cliquez sur **Paramètres**.
3. Cliquez sur le bouton **Importation/Exportation** en haut à droite de l'en-tête de la page.
4. Cela ouvrira l'outil **B1 Transfer** dans un nouvel onglet à [transfer.b1.church](https://transfer.b1.church).

L'outil de transfert vous guide à travers quatre étapes : Source, Aperçu, Destination et Exécution.

---

## Étape 1 - Choisir votre source

Sélectionnez d'où proviennent vos données. Il y a sept options :

- **Base de données B1** — Extrait les données directement de votre église B1 existante. Utile pour créer une sauvegarde ou convertir vos données dans un autre format. Vous devez être connecté pour utiliser cette option.
- **Importation ZIP B1** — Un fichier zip au format propre à B1. Ceci est principalement utilisé pour restaurer une exportation B1 précédente.
- **Importation ZIP Breeze** — Un fichier zip contenant les fichiers exportés de Breeze ChMS.
- **ZIP Planning Center** — Un fichier zip ou CSV exporté de Planning Center.
- **CSV / Excel personnalisé** — Tout fichier CSV ou Excel contenant des données de personnes. Après le téléchargement, vous mapperez vos colonnes aux champs B1 avant que l'importation ne procède.
- **CSV Tithe.ly** — Un fichier d'exportation de personnes ou de dons de Tithe.ly (format CSV ou Excel accepté).
- **CSV CCB / Pushpay** — Un CSV d'exportation de personnes ou de dons de Church Community Builder ou Pushpay.

Vous pouvez glisser-déposer votre fichier sur la zone de téléchargement, ou cliquer pour le parcourir.

---

## Étape 1b - Mapper vos champs (CSV / Excel personnalisé uniquement)

Si vous avez sélectionné **CSV / Excel personnalisé**, après le téléchargement de votre fichier, l'outil affichera un écran de mappage des champs avant de passer à l'aperçu.

Chaque colonne de votre fichier est répertoriée à côté d'un exemple de valeur. Pour chaque colonne, utilisez la liste déroulante pour choisir le champ B1 correspondant. L'outil détectera automatiquement les noms de colonnes courants comme « Prénom », « E-mail » ou « Code postal », mais vous devez examiner chaque ligne et corriger tout ce qu'il a manqué.

Les champs B1 disponibles incluent :

- Prénom, Nom de famille, Deuxième prénom, Surnom, Nom d'affichage, Titre/Préfixe, Suffixe
- E-mail, Téléphone domicile, Téléphone mobile, Téléphone professionnel
- Adresse ligne 1, Adresse ligne 2, Ville, État, Code postal
- Date de naissance, Anniversaire, Sexe, État civil, Statut d'adhésion
- Nom du ménage/Famille
- Nom du groupe — assigne la personne à un groupe par nom
- **Champ personnalisé (correspondance par nom)** — enregistre la colonne dans l'un de vos champs de personne personnalisée [](../settings/custom-fields.md) de l'église. Une zone **Nom du champ B1** apparaît, remplie avec l'en-tête de colonne. Changez-la en le nom du champ exactement tel qu'il apparaît dans B1 (la casse n'a pas d'importance).
- **Réponse au formulaire (champ personnalisé)** — enregistre la valeur de cette colonne en tant que champ personnalisé attaché au dossier de la personne. Si vous utilisez cette option, on vous demandera de donner un nom au formulaire.

Les dates peuvent être dans des formats courants tels que `9/17/1994` et sont converties automatiquement. Pour les champs personnalisés, les champs Oui/Non acceptent des valeurs comme Oui, Non, O, N, Vrai, Faux, 1 et 0, et les champs à choix multiple acceptent soit le texte du choix soit sa valeur.

:::info
Créez vos champs de personnes personnalisées dans B1 Admin avant l'importation. Lorsque l'importation se termine, l'étape **Champs personnalisés** répertorie tous les noms de colonnes qui ne correspondent pas à un champ B1 et compte toute valeur qui ne s'adapte pas au type du champ. Ces valeurs sont ignorées et le reste de l'importation se termine quand même.
:::

Les colonnes que vous ne souhaitez pas importer peuvent être définies sur **(Ignorer)**. Au moins un champ de nom (Prénom ou Nom de famille) doit être mappé avant que vous puissiez continuer.

Cliquez sur **Confirmer le mappage et importer** pour passer à l'aperçu.

---

## Étape 2 - Aperçu de vos données

Après le téléchargement, l'outil affiche un aperçu de tout ce qui sera importé. Utilisez les onglets pour examiner chaque type de données :

- **Personnes** — Répertoriées par ménage, avec des photos si incluses.
- **Groupes** — Organisés par site, service, heure et catégorie.
- **Présence** — Dates des sessions, groupes et décomptes des visites.
- **Dons** — Lots, fonds, donateurs et montants.
- **Formulaires** — Noms des formulaires et types de contenu.

Examinez ceci attentivement avant de continuer. Si quelque chose semble incorrect, cliquez sur **Recommencer** et corrigez votre fichier source.

---

## Étape 3 - Choisir votre destination

Sélectionnez où vous souhaitez que les données aillent :

- **Base de données B1** — Importe directement dans la base de données B1 de votre église. Après avoir sélectionné cela, l'outil affichera un décompte final des dossiers à ajouter. Cliquez sur **Démarrer le transfert** pour confirmer.
- **Exportation ZIP de B1** — Télécharge vos données sous forme de fichier zip au format B1. Bon pour les sauvegardes.
- **Exportation ZIP Breeze** — Convertit vos données au format Breeze.
- **ZIP Planning Center** — Convertit vos données au format Planning Center.

:::warning
La source et la destination ne peuvent pas être au même format. S'ils correspondent, l'outil vous avertira pour prévenir la duplication accidentelle.
:::

---

## Étape 4 - Exécution

L'outil traite le transfert et montre la progression pour chaque étape :

- Campuses, Services et Heures
- Personnes
- Photos
- Groupes et membres du groupe
- Dons
- Présence
- Formulaires, Questions, Réponses et Soumissions de formulaires
- Champs personnalisés (lorsque vous avez mappé des colonnes de champs personnalisés)
- Compression (pour les destinations fichier zip uniquement)

Lorsque la destination est **Base de données B1**, la carte de progression est intitulée **Progression de l'importation** et se termine par **Importation terminée!** (ou **Importation terminée avec erreurs**). Pour les destinations fichier zip, les mêmes messages disent **Exportation**.

:::warning
Ne fermez pas votre navigateur pendant que le transfert est en cours. Attendez que toutes les étapes soient terminées.
:::

---

## Préparation d'une importation ZIP Breeze

1. Dans Breeze, allez à **Paramètres** et cliquez sur **Exporter** dans la barre latérale gauche.
2. Exportez trois fichiers séparés : **Personnes**, **Tags** et **Contributions**.
3. Sélectionnez les trois fichiers, cliquez avec le bouton droit et compressez-les dans un seul fichier zip.
   - Sur un Mac : sélectionnez les fichiers, cliquez avec le bouton droit et choisissez **Compresser**.
   - Sur un PC : sélectionnez les fichiers, cliquez avec le bouton droit, choisissez **Envoyer vers**, puis **Dossier compressé (zippé)**.
4. Téléchargez le fichier zip en utilisant l'option **Importation ZIP Breeze** à l'étape 1.

L'importation Breeze transfère les personnes, les groupes (tags) et les dossiers de dons automatiquement.

---

## Préparation d'une exportation Planning Center

1. Connectez-vous à Planning Center et ouvrez le produit **Personnes**.
2. Dans la barre latérale gauche, cliquez sur **Listes** et créez une liste qui inclut tout le monde que vous souhaitez importer. (Si vous avez déjà une liste de toute votre congrégation, utilisez celle-ci.)
3. Ouvrez la liste et utilisez son option **exporter** pour télécharger vos personnes sous forme de fichier **CSV**. Incluez les champs que vous souhaitez conserver — le nom, l'e-mail, le téléphone, l'adresse, la date de naissance, le sexe et le statut d'adhésion se mappent tous sur B1.
4. Si Planning Center vous donne plus d'un fichier, sélectionnez-les tous, cliquez avec le bouton droit et compressez-les dans un seul zip.
   - Sur un Mac : sélectionnez les fichiers, cliquez avec le bouton droit et choisissez **Compresser**.
   - Sur un PC : sélectionnez les fichiers, cliquez avec le bouton droit, choisissez **Envoyer vers**, puis **Dossier compressé (zippé)**.
5. Téléchargez le CSV ou le zip en utilisant l'option **ZIP Planning Center** à l'étape 1.

Après le téléchargement, continuez vers l'aperçu et confirmez que vos personnes et ménages semblent corrects avant d'exécuter l'importation.

---

## Préparation d'une exportation Tithe.ly

1. Dans Tithe.ly, exportez vos données **Personnes** sous forme de fichier CSV ou Excel. Vous pouvez également exporter un fichier **Dons** séparé si vous souhaitez importer des dossiers de dons.
2. L'outil détectera automatiquement si le fichier contient des données de personnes ou de dons en fonction des noms de colonnes.
3. Téléchargez le fichier en utilisant l'option **CSV Tithe.ly** à l'étape 1.

:::info
Les exportations Tithe.ly peuvent être importées un fichier à la fois. Exécutez le processus deux fois si vous devez importer séparément les dossiers de personnes et de dons.
:::

---

## Préparation d'une exportation CCB ou Pushpay

1. Dans Church Community Builder ou Pushpay, exportez vos données **Personnes** sous forme de fichier CSV. Vous pouvez également exporter un fichier de dons/contributions séparé.
2. L'outil détectera automatiquement si le fichier contient des données de personnes ou de dons en fonction des noms de colonnes.
3. Téléchargez le fichier en utilisant l'option **CSV CCB / Pushpay** à l'étape 1.

---

## Après l'importation

Une fois le transfert terminé, prenez quelques minutes pour vérifier vos données :

1. Parcourez la page [Personnes](../people/adding-people.md) et vérifiez quelques profils.
2. Confirmez que les noms, e-mails, numéros de téléphone et adresses sont correctement venus.
3. Vérifiez que les connexions des ménages sont intactes.
4. Examinez les groupes importés et les dossiers de dons.

Si vous remarquez des problèmes, vous pouvez éditer des profils individuels depuis la page Personnes. Vous pouvez également réexécuter l'outil de transfert pour [exporter vos données](exporting-data.md) en tant que sauvegarde.
