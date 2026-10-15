---
title: "Importer des données"
---

# Importer des données

<div class="article-intro">

L'outil B1 Transfer vous permet d'intégrer facilement vos données existantes dans B1, que vous partiez de zéro à partir d'un tableur, que vous migriez depuis une autre plateforme de gestion d'église, ou que vous importiez des enregistrements de dons. Il peut également servir à exporter ou sauvegarder vos données à tout moment.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Vous devez disposer d'un compte B1 Admin actif avec accès aux **Paramètres**.
- Ayez vos données exportées et prêtes depuis votre ancien système avant de commencer.
- Cet outil est destiné à la migration initiale des données. Si vous utilisez déjà B1 depuis un certain temps, une nouvelle importation peut créer des doublons.

</div>

## Accéder à l'outil de transfert

1. Connectez-vous à **B1 Admin**.
2. Ouvrez le [menu de saut](../introduction.md#getting-around-with-the-jump-menu) (la barre de recherche en haut à gauche), développez **Paramètres**, et cliquez sur **Paramètres**.
3. Cliquez sur le lien **Importer/Exporter** sous le nom de votre église, en haut du menu Paramètres à gauche.
4. Cela ouvre l'outil **B1 Transfer** dans un nouvel onglet, à l'adresse [transfer.b1.church](https://transfer.b1.church).

L'outil de transfert vous guide à travers quatre étapes : Source, Aperçu, Destination et Exécution.

---

## Étape 1 - Choisir votre source

Sélectionnez l'origine de vos données. Il existe sept options :

- **B1 Database** — Récupère les données directement depuis votre église B1 existante. Utile pour faire une sauvegarde ou convertir vos données dans un autre format. Vous devez être connecté pour utiliser cette option.
- **B1 Import Zip** — Un fichier zip au format propre à B1. Il sert principalement à restaurer une exportation B1 précédente. Charger un B1 Export Zip dans **B1 Database** restaure tout ce que contient l'exportation (voir [Exporter des données](./exporting-data.md#full-data-export-from-settings)). Si le fichier ne peut pas être lu, l'outil affiche l'erreur au lieu de recommencer.
- **Breeze Import Zip** — Un fichier zip contenant les fichiers exportés depuis Breeze ChMS.
- **Planning Center Zip** — Un fichier zip ou CSV exporté depuis Planning Center.
- **CSV / Excel personnalisé** — Tout fichier CSV ou Excel contenant des données de personnes. Après le téléversement, vous associez vos colonnes aux champs B1 avant que l'importation ne se poursuive.
- **Tithe.ly CSV** — Un fichier d'exportation de personnes ou de dons depuis Tithe.ly (format CSV ou Excel accepté).
- **CCB / Pushpay CSV** — Un fichier CSV d'exportation de personnes ou de dons depuis Church Community Builder ou Pushpay.

Vous pouvez glisser-déposer votre fichier dans la zone de téléversement, ou cliquer pour le rechercher.

---

## Étape 1b - Associer vos champs (CSV / Excel personnalisé uniquement)

Si vous avez sélectionné **CSV / Excel personnalisé**, après le téléversement de votre fichier, l'outil affiche un écran d'association des champs avant de passer à l'aperçu.

Chaque colonne de votre fichier est listée avec une valeur d'exemple. Pour chaque colonne, utilisez la liste déroulante pour choisir le champ B1 correspondant. L'outil détecte automatiquement les noms de colonnes courants comme "First Name", "Email" ou "Zip Code", mais vous devez vérifier chaque ligne et corriger ce qu'il a manqué.

Les champs B1 disponibles incluent :

- Prénom, Nom, Deuxième prénom, Surnom, Nom d'affichage, Titre/Civilité, Suffixe
- E-mail, Téléphone domicile, Téléphone portable, Téléphone professionnel
- Adresse ligne 1, Adresse ligne 2, Ville, État/Province, Code postal
- Date de naissance, Anniversaire de mariage, Genre, Situation matrimoniale, Statut de membre
- Nom du foyer/de la famille
- Nom du groupe — affecte la personne à un groupe par son nom
- **Champ personnalisé (correspondance par nom)** — enregistre la colonne dans l'un des [champs personnalisés de personnes](../settings/custom-fields.md) de votre église. Une zone **Nom du champ B1** apparaît, pré-remplie avec l'en-tête de la colonne. Modifiez-la pour indiquer le nom du champ exactement tel qu'il apparaît dans B1 (la casse n'a pas d'importance).
- **Réponse de formulaire (champ personnalisé)** — enregistre la valeur de cette colonne comme champ personnalisé rattaché à la fiche de la personne. Si vous utilisez cette option, il vous sera demandé de donner un nom au formulaire.

Les dates peuvent être dans des formats courants tels que `9/17/1994` et sont converties automatiquement. Pour les champs personnalisés, les champs Oui/Non acceptent des valeurs comme Yes, No, Y, N, True, False, 1 et 0, et les champs à choix multiple acceptent soit le texte du choix, soit sa valeur.

:::info
Créez vos champs personnalisés de personnes dans B1 Admin avant l'importation. Une fois l'importation terminée, l'étape **Champs personnalisés** répertorie les noms de colonnes qui ne correspondent à aucun champ B1 et compte les valeurs qui ne correspondent pas au type du champ. Ces valeurs sont ignorées, et le reste de l'importation se termine normalement.
:::

Les colonnes que vous ne souhaitez pas importer peuvent être définies sur **(Ignorer)**. Au moins un champ de nom (Prénom ou Nom) doit être associé avant de pouvoir continuer.

Cliquez sur **Confirmer l'association et importer** pour passer à l'aperçu.

---

## Étape 2 - Vérifier vos données

Après le téléversement, l'outil affiche un aperçu de tout ce qui sera importé. Utilisez les onglets pour examiner chaque type de données :

- **Personnes** — Listées par foyer, avec les photos si elles sont incluses.
- **Groupes** — Organisés par campus, service, horaire, et catégorie.
- **Présence** — Dates de session, groupes et nombre de visites.
- **Dons** — Lots, fonds, donateurs et montants.
- **Formulaires** — Noms des formulaires et types de contenu.

Vérifiez attentivement avant de continuer. Si quelque chose semble incorrect, cliquez sur **Recommencer** et corrigez votre fichier source.

---

## Étape 3 - Choisir votre destination

Sélectionnez l'endroit où vous souhaitez envoyer les données :

- **B1 Database** — Importe directement dans la base de données B1 de votre église. Après avoir sélectionné cette option, l'outil affiche le nombre final d'enregistrements à ajouter. Cliquez sur **Démarrer le transfert** pour confirmer.
- **B1 Export Zip** — Télécharge vos données sous forme de fichier zip au format B1, qui pourra être restauré plus tard avec **B1 Import Zip**. Pratique pour les sauvegardes.
- **Breeze Export Zip** — Convertit vos données au format Breeze.
- **Planning Center Zip** — Convertit vos données au format Planning Center.

:::warning
La source et la destination ne peuvent pas être du même format. S'ils correspondent, l'outil vous en avertit pour éviter une duplication accidentelle.
:::

---

## Étape 4 - Exécution

L'outil traite le transfert et affiche la progression de chaque étape :

- Campus, Services et Horaires
- Personnes
- Photos
- Groupes et membres des groupes
- Dons
- Présence
- Formulaires, Questions, Réponses et Réponses soumises
- Champs personnalisés (si vous avez associé des colonnes de champs personnalisés)
- Compression (uniquement pour les destinations en fichier zip)

Lorsque la destination est **B1 Database**, la carte de progression s'intitule **Progression de l'importation** et se termine par **Importation terminée !** (ou **Importation terminée avec des erreurs**). Pour les destinations en fichier zip, les mêmes messages utilisent le mot **Exportation**.

:::warning
Ne fermez pas votre navigateur pendant l'exécution du transfert. Attendez que toutes les étapes affichent comme terminées.
:::

---

## Préparer un Breeze Import Zip

1. Dans Breeze, accédez à **Settings** et cliquez sur **Export** dans la barre latérale gauche.
2. Exportez trois fichiers distincts : **People**, **Tags** et **Contributions**.
3. Sélectionnez les trois fichiers, faites un clic droit et compressez-les dans un seul fichier zip.
   - Sur un Mac : sélectionnez les fichiers, faites un clic droit et choisissez **Compresser**.
   - Sur un PC : sélectionnez les fichiers, faites un clic droit, choisissez **Envoyer vers**, puis **Dossier compressé (zippé)**.
4. Téléversez le fichier zip à l'aide de l'option **Breeze Import Zip** à l'étape 1.

L'importation Breeze transfère automatiquement les personnes, les groupes (tags) et les enregistrements de dons.

---

## Préparer une exportation Planning Center

1. Connectez-vous à Planning Center et ouvrez le produit **People**.
2. Dans la barre latérale gauche, cliquez sur **Lists** et créez une liste qui inclut toutes les personnes que vous souhaitez transférer. (Si vous avez déjà une liste de toute votre communauté, utilisez-la.)
3. Ouvrez la liste et utilisez son option **export** pour télécharger vos personnes au format **CSV**. Incluez les champs que vous souhaitez conserver -- le nom, l'e-mail, le téléphone, l'adresse, la date de naissance, le genre et le statut de membre sont tous transférés vers B1.
4. Si Planning Center vous fournit plusieurs fichiers, sélectionnez-les tous, faites un clic droit et compressez-les dans un seul fichier zip.
   - Sur un Mac : sélectionnez les fichiers, faites un clic droit et choisissez **Compresser**.
   - Sur un PC : sélectionnez les fichiers, faites un clic droit, choisissez **Envoyer vers**, puis **Dossier compressé (zippé)**.
5. Téléversez le CSV ou le zip à l'aide de l'option **Planning Center Zip** à l'étape 1.

Après le téléversement, passez à l'aperçu et vérifiez que vos personnes et vos foyers sont corrects avant de lancer l'importation.

---

## Préparer une exportation Tithe.ly

1. Dans Tithe.ly, exportez vos données **People** au format CSV ou Excel. Vous pouvez aussi exporter un fichier **Giving** distinct si vous souhaitez importer des enregistrements de dons.
2. L'outil détecte automatiquement si le fichier contient des données de personnes ou de dons, en se basant sur les noms de colonnes.
3. Téléversez le fichier à l'aide de l'option **Tithe.ly CSV** à l'étape 1.

:::info
Les exportations Tithe.ly peuvent être importées un fichier à la fois. Relancez le processus deux fois si vous devez importer séparément les personnes et les dons.
:::

---

## Préparer une exportation CCB ou Pushpay

1. Dans Church Community Builder ou Pushpay, exportez vos données **People** au format CSV. Vous pouvez aussi exporter un fichier distinct de dons ou de contributions.
2. L'outil détecte automatiquement si le fichier contient des données de personnes ou de dons, en se basant sur les noms de colonnes.
3. Téléversez le fichier à l'aide de l'option **CCB / Pushpay CSV** à l'étape 1.

---

## Après l'importation

Une fois le transfert terminé, prenez quelques minutes pour vérifier vos données :

1. Parcourez la page [Personnes](../people/adding-people.md) et examinez quelques fiches au hasard.
2. Vérifiez que les noms, les e-mails, les numéros de téléphone et les adresses ont été correctement importés.
3. Vérifiez que les liens entre les foyers sont intacts. Le rôle de chaque personne dans son foyer (Chef de famille, Conjoint, Enfant ou Autre) est conservé lorsque la source en contient un : la colonne **householdRole** dans un B1 Import Zip, **Family Role** dans Breeze ou Tithe.ly, et **Family Position** dans CCB / Pushpay. Des rôles tels que "Head of Household", "Primary", "Wife" ou "Son" sont convertis vers le rôle B1 correspondant. Les importations Planning Center et CSV / Excel personnalisé n'ont pas de colonne de rôle : ces personnes sont donc définies sur **Autre** ; vous pouvez modifier un rôle depuis le foyer de la personne sur la page [Personnes](../people/adding-people.md#managing-households).
4. Examinez les groupes et les enregistrements de dons importés.

Si vous remarquez des problèmes, vous pouvez modifier les fiches individuelles depuis la page Personnes. Vous pouvez aussi relancer l'outil de transfert pour [exporter vos données](exporting-data.md) en sauvegarde.
