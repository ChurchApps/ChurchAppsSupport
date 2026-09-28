---
title: "Importer des données"
---

# Importer des données

<div class="article-intro">

L'outil B1 Transfer vous permet de facilement apporter vos données existantes dans B1, que vous commenciez de zéro à partir d'une feuille de calcul, que vous migriez depuis une autre plateforme de gestion d'église, ou que vous importiez des enregistrements de dons. Il peut également être utilisé pour exporter ou sauvegarder vos données à tout moment.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Vous devez avoir un compte B1 Admin actif avec accès aux **Paramètres**.
- Ayez vos données exportées et prêtes de votre système précédent avant de commencer.
- Cet outil est destiné à la migration initiale des données. Si vous utilisez B1 depuis un certain temps, la réimportation peut créer des enregistrements en double.

</div>

## Accéder à l'outil de transfert

1. Connectez-vous à **B1 Admin**.
2. Ouvrez le **menu de section** dans le coin supérieur gauche (le nom de la section avec la petite flèche) et choisissez **Paramètres**.
3. Cliquez sur le bouton **Importer/Exporter** dans le coin supérieur droit de l'en-tête de la page.
4. Cela ouvrira l'outil **B1 Transfer** dans un nouvel onglet à [transfer.b1.church](https://transfer.b1.church).

L'outil de transfert vous guide à travers quatre étapes : Source, Aperçu, Destination et Exécution.

---

## Étape 1 - Choisir votre source

Sélectionnez d'où viennent vos données. Il y a sept options :

- **B1 Database** — Extrait les données directement de votre église B1 existante. Utile pour faire une sauvegarde ou convertir vos données dans un autre format. Vous devez être connecté pour utiliser cette option.
- **B1 Import Zip** — Un fichier zip au format propre de B1. Ceci est principalement utilisé pour restaurer une exportation B1 précédente.
- **Breeze Import Zip** — Un fichier zip contenant des fichiers exportés de Breeze ChMS.
- **Planning Center Zip** — Un fichier zip ou CSV exporté de Planning Center.
- **Custom CSV / Excel** — N'importe quel fichier CSV ou Excel contenant des données de personnes. Après le téléchargement, vous mapperez vos colonnes aux champs B1 avant que l'importation ne se termine.
- **Tithe.ly CSV** — Un fichier d'exportation de personnes ou de dons de Tithe.ly (format CSV ou Excel accepté).
- **CCB / Pushpay CSV** — Un CSV d'exportation de personnes ou de dons de Church Community Builder ou Pushpay.

Vous pouvez faire glisser et déposer votre fichier sur la zone de téléchargement, ou cliquer pour le parcourir.

---

## Étape 1b - Mapper vos champs (Custom CSV / Excel uniquement)

Si vous avez sélectionné **Custom CSV / Excel**, après avoir téléchargé votre fichier, l'outil affichera un écran de mappage des champs avant de passer à l'aperçu.

Chaque colonne de votre fichier est listée à côté d'une valeur d'exemple. Pour chaque colonne, utilisez la liste déroulante pour choisir le champ B1 correspondant. L'outil détectera automatiquement les noms de colonnes courants comme « First Name », « Email » ou « Zip Code », mais vous devez examiner chaque ligne et corriger ce qui manque.

Les champs B1 disponibles incluent :

- Prénom, Nom de famille, Deuxième prénom, Surnom, Nom d'affichage, Titre/Préfixe, Suffixe
- E-mail, Téléphone à domicile, Téléphone mobile, Téléphone professionnel
- Adresse Ligne 1, Adresse Ligne 2, Ville, État, Code postal
- Date de naissance, Anniversaire, Genre, État matrimonial, État d'adhésion
- Nom du ménage/Famille
- Nom du groupe — assigne la personne à un groupe par nom
- **Champ personnalisé (correspondance par nom)** — enregistre la colonne dans l'un des [champs de personne personnalisés](../settings/custom-fields.md) de votre église. Une boîte **Nom du champ B1** apparaît, remplie avec l'en-tête de la colonne. Changez-le au nom exact du champ tel qu'il apparaît dans B1 (la capitalisation n'a pas d'importance).
- **Réponse de formulaire (champ personnalisé)** — enregistre la valeur de cette colonne en tant que champ personnalisé joint à l'enregistrement de la personne. Si vous utilisez cette option, vous serez invité à donner un nom au formulaire.

Les dates peuvent être dans des formats courants tels que `9/17/1994` et sont converties automatiquement. Pour les champs personnalisés, les champs Oui/Non acceptent des valeurs comme Oui, Non, O, N, Vrai, Faux, 1 et 0, et les champs à choix multiples acceptent soit le texte du choix, soit sa valeur.

:::info
Créez vos champs de personne personnalisés dans B1 Admin avant d'importer. Quand l'importation se termine, l'étape **Champs personnalisés** répertorie tous les noms de colonnes qui ne correspondent pas à un champ B1 et compte toutes les valeurs qui ne correspondent pas au type du champ. Ces valeurs sont ignorées et le reste de l'importation se termine quand même.
:::

Les colonnes que vous ne souhaitez pas importer peuvent être définies sur **(Ignorer)**. Au moins un champ de nom (Prénom ou Nom de famille) doit être mappé avant de pouvoir continuer.

Cliquez sur **Confirmer le mappage et importer** pour procéder à l'aperçu.

---

## Étape 2 - Prévisualiser vos données

Après le téléchargement, l'outil affiche un aperçu de tout ce qui sera importé. Utilisez les onglets pour examiner chaque type de données :

- **Personnes** — Listées par ménage, avec des photos si incluses.
- **Groupes** — Organisés par campus, service, heure et catégorie.
- **Participation** — Dates de session, groupes et décomptes de visite.
- **Dons** — Lots, fonds, donateurs et montants.
- **Formulaires** — Noms de formulaires et types de contenu.

Examinez ceci attentivement avant de continuer. Si quelque chose semble mal, cliquez sur **Recommencer** et corrigez votre fichier source.

---

## Étape 3 - Choisir votre destination

Sélectionnez où vous souhaitez que les données aillent :

- **B1 Database** — Importe directement dans la base de données B1 de votre église. Après sélection, l'outil affichera un décompte final des enregistrements à ajouter. Cliquez sur **Démarrer le transfert** pour confirmer.
- **B1 Export Zip** — Télécharge vos données sous forme de fichier zip au format B1. Bon pour les sauvegardes.
- **Breeze Export Zip** — Convertit vos données au format Breeze.
- **Planning Center Zip** — Convertit vos données au format Planning Center.

:::warning
La source et la destination ne peuvent pas être du même format. S'ils correspondent, l'outil vous avertira pour éviter la duplication accidentelle.
:::

---

## Étape 4 - Exécuter

L'outil traite le transfert et affiche la progression pour chaque étape :

- Campus, services et horaires
- Personnes
- Photos
- Groupes et membres du groupe
- Dons
- Participation
- Formulaires, questions, réponses et soumissions de formulaires
- Champs personnalisés (lorsque vous avez mappé des colonnes de champ personnalisé)
- Compression (pour les destinations de fichiers zip uniquement)

:::warning
Ne fermez pas votre navigateur pendant que le transfert est en cours. Attendez que tous les étapes soient terminées.
:::

---

## Préparation d'un fichier Breeze Import Zip

1. Dans Breeze, allez à **Paramètres** et cliquez sur **Exporter** dans la barre latérale gauche.
2. Exportez trois fichiers distincts : **Personnes**, **Balises** et **Contributions**.
3. Sélectionnez les trois fichiers, cliquez avec le bouton droit et compressez-les dans un seul fichier zip.
   - Sur un Mac : sélectionnez les fichiers, cliquez avec le bouton droit et choisissez **Compresser**.
   - Sur un PC : sélectionnez les fichiers, cliquez avec le bouton droit, choisissez **Envoyer vers**, puis **Dossier compressé (zippé)**.
4. Téléchargez le fichier zip en utilisant l'option **Breeze Import Zip** à l'étape 1.

L'importation Breeze transfère automatiquement les personnes, les groupes (balises) et les enregistrements de dons.

---

## Préparation d'une exportation Planning Center

1. Connectez-vous à Planning Center et ouvrez le produit **Personnes**.
2. Dans la barre latérale gauche, cliquez sur **Listes** et créez une liste qui inclut tout le monde que vous souhaitez reprendre. (Si vous avez déjà une liste de toute votre congrégation, utilisez-la.)
3. Ouvrez la liste et utilisez son option **exporter** pour télécharger vos personnes en tant que fichier **CSV**. Incluez les champs que vous souhaitez conserver — le nom, l'e-mail, le téléphone, l'adresse, la date de naissance, le genre et l'état d'adhésion se mappent tous sur B1.
4. Si Planning Center vous donne plus d'un fichier, sélectionnez-les tous, cliquez avec le bouton droit et compressez-les dans un seul fichier zip.
   - Sur un Mac : sélectionnez les fichiers, cliquez avec le bouton droit et choisissez **Compresser**.
   - Sur un PC : sélectionnez les fichiers, cliquez avec le bouton droit, choisissez **Envoyer vers**, puis **Dossier compressé (zippé)**.
5. Téléchargez le CSV ou le zip en utilisant l'option **Planning Center Zip** à l'étape 1.

Après le téléchargement, continuez à l'aperçu et confirmez que vos personnes et ménages semblent corrects avant d'exécuter l'importation.

---

## Préparation d'une exportation Tithe.ly

1. Dans Tithe.ly, exportez vos données **Personnes** en tant que fichier CSV ou Excel. Vous pouvez également exporter un fichier **Dons** séparé si vous souhaitez apporter des enregistrements de dons.
2. L'outil détectera automatiquement si le fichier contient des données de personnes ou de dons en fonction des noms de colonnes.
3. Téléchargez le fichier en utilisant l'option **Tithe.ly CSV** à l'étape 1.

:::info
Les exportations Tithe.ly peuvent être importées un fichier à la fois. Exécutez le processus deux fois si vous devez importer à la fois les personnes et les enregistrements de dons séparément.
:::

---

## Préparation d'une exportation CCB ou Pushpay

1. Dans Church Community Builder ou Pushpay, exportez vos données **Personnes** en tant que fichier CSV. Vous pouvez également exporter un fichier de dons/contributions séparé.
2. L'outil détectera automatiquement si le fichier contient des données de personnes ou de dons en fonction des noms de colonnes.
3. Téléchargez le fichier en utilisant l'option **CCB / Pushpay CSV** à l'étape 1.

---

## Après l'importation

Une fois le transfert terminé, prenez quelques minutes pour vérifier vos données :

1. Parcourez la page [Personnes](../people/adding-people.md) et vérifiez quelques profils.
2. Confirmez que les noms, les e-mails, les numéros de téléphone et les adresses ont bien été transmis.
3. Vérifiez que les connexions du ménage sont intactes.
4. Examinez tous les groupes importés et les enregistrements de dons.

Si vous remarquez des problèmes, vous pouvez modifier des profils individuels à partir de la page Personnes. Vous pouvez également exécuter à nouveau l'outil de transfert pour [exporter vos données](exporting-data.md) en tant que sauvegarde.
