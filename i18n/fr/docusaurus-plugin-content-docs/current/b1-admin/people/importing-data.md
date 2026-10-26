---
title: "Importer des données"
---

# Importer des données

<div class="article-intro">

L'outil B1 Transfer facilite l'intégration de vos données existantes dans B1, que vous partiez d'un tableur vierge, que vous migriez depuis une autre plateforme de gestion d'église ou que vous importiez des enregistrements de dons. Il peut aussi servir à exporter ou sauvegarder vos données à tout moment.

</div>

## Vidéo de formation

<YouTube id="G-VnhzACYIU" title="Importing Your People Database in B1" next="Searching People and Building Lists in B1" nextUrl="/docs/b1-admin/people/searching-people" />

<div class="prereqs">
<h4>Avant de commencer</h4>

- Vous devez disposer d'un compte B1 Admin actif avec accès aux **Paramètres**.
- Exportez et préparez vos données depuis votre ancien système avant de commencer.
- Cet outil est destiné à la migration initiale des données. Si vous utilisez déjà B1 depuis un certain temps, une nouvelle importation risque de créer des doublons.

</div>

## Accéder à l'outil de transfert

1. Connectez-vous à **B1 Admin**.
2. Ouvrez le [menu Aller à](../introduction.md#getting-around-with-the-jump-menu) (la barre de recherche en haut à gauche), développez **Paramètres**, puis cliquez sur **Paramètres**.
3. Cliquez sur le lien **Import/Export** sous le nom de votre église, en haut du menu des paramètres à gauche.
4. L'outil **B1 Transfer** s'ouvre dans un nouvel onglet, à l'adresse [transfer.b1.church](https://transfer.b1.church).

L'outil de transfert vous guide en quatre étapes : Source, Aperçu, Destination et Exécution.

---

## Étape 1 - Choisir la source

Sélectionnez l'origine de vos données. Sept options sont disponibles :

- **Base de données B1** : récupère les données directement depuis votre église B1 existante. Utile pour effectuer une sauvegarde ou convertir vos données dans un autre format. Vous devez être connecté pour utiliser cette option.
- **Archive ZIP B1** : un fichier zip au format propre à B1. Il sert principalement à restaurer une exportation B1 précédente. Charger une archive ZIP d'exportation B1 dans la **Base de données B1** restaure toutes les données contenues dans l'exportation (voir [Exporter les données](./exporting-data.md#full-data-export-from-settings)). Si le fichier ne peut pas être lu, l'outil affiche l'erreur au lieu de recommencer.
- **Archive ZIP Breeze** : un fichier zip contenant les fichiers exportés depuis Breeze ChMS.
- **Archive ZIP Planning Center** : un fichier zip ou CSV exporté depuis Planning Center.
- **CSV / Excel personnalisé** : tout fichier CSV ou Excel contenant des données de personnes. Après le téléversement, vous devrez faire correspondre vos colonnes aux champs B1 avant que l'importation ne se poursuive.
- **CSV Tithe.ly** : un fichier d'export de personnes ou de dons depuis Tithe.ly (formats CSV ou Excel acceptés).
- **CSV CCB / Pushpay** : un export CSV de personnes ou de dons depuis Church Community Builder ou Pushpay.

Vous pouvez glisser-déposer votre fichier dans la zone de téléversement, ou cliquer pour le rechercher sur votre ordinateur.

---

## Étape 1b - Faire correspondre les champs (CSV / Excel personnalisé uniquement)

Si vous avez sélectionné **CSV / Excel personnalisé**, après le téléversement de votre fichier, l'outil affiche un écran de correspondance des champs avant de passer à l'aperçu.

Chaque colonne de votre fichier est listée avec une valeur d'exemple. Pour chaque colonne, utilisez la liste déroulante pour choisir le champ B1 correspondant. L'outil détecte automatiquement les noms de colonnes courants comme « Prénom », « E-mail » ou « Code postal », mais vous devez vérifier chaque ligne et corriger ce qu'il a pu manquer.

Les champs B1 disponibles comprennent :

- Prénom, Nom, Deuxième prénom, Surnom, Nom d'affichage, Titre/Civilité, Suffixe
- E-mail, Téléphone domicile, Téléphone portable, Téléphone professionnel
- Adresse ligne 1, Adresse ligne 2, Ville, Région/État, Code postal
- Date de naissance, Date d'anniversaire de mariage, Genre, Situation matrimoniale, Statut d'adhésion
- Nom du foyer/de la famille
- Nom du groupe : rattache la personne à un groupe selon son nom
- **Champ personnalisé (correspondance par nom)** : enregistre la colonne dans l'un de vos [champs personnalisés de personne](../settings/custom-fields.md). Une zone **Nom du champ B1** apparaît, pré-remplie avec l'en-tête de la colonne. Modifiez-la pour saisir le nom exact du champ tel qu'il apparaît dans B1 (la casse n'a pas d'importance).
- **Réponse de formulaire (champ personnalisé)** : enregistre la valeur de cette colonne comme champ personnalisé rattaché à la fiche de la personne. Si vous utilisez cette option, il vous sera demandé de donner un nom au formulaire.

Les dates peuvent être saisies dans des formats courants tels que `17/09/1994` et sont converties automatiquement. Pour les champs personnalisés, les champs Oui/Non acceptent des valeurs telles que Oui, Non, O, N, Vrai, Faux, 1 et 0, et les champs à choix multiple acceptent soit le texte du choix, soit sa valeur.

:::info
Créez vos champs personnalisés de personne dans B1 Admin avant l'importation. Une fois l'importation terminée, l'étape **Champs personnalisés** répertorie les noms de colonnes qui ne correspondent à aucun champ B1 et compte les valeurs qui ne correspondent pas au type du champ. Ces valeurs sont ignorées, et le reste de l'importation se termine normalement.
:::

Les colonnes que vous ne souhaitez pas importer peuvent être réglées sur **(Ignorer)**. Au moins un champ de nom (Prénom ou Nom) doit être associé avant de pouvoir continuer.

Cliquez sur **Confirmer la correspondance et importer** pour passer à l'aperçu.

---

## Étape 2 - Aperçu des données

Après le téléversement, l'outil affiche un aperçu de tout ce qui sera importé. Utilisez les onglets pour examiner chaque type de données :

- **Personnes** : classées par foyer, avec les photos si elles sont incluses.
- **Groupes** : organisés par campus, service, horaire et catégorie.
- **Présence** : dates des sessions, groupes et nombre de visites.
- **Dons** : lots, fonds, donateurs et montants.
- **Formulaires** : noms des formulaires et types de contenu.

Vérifiez attentivement avant de poursuivre. Si quelque chose semble incorrect, cliquez sur **Recommencer** et corrigez votre fichier source.

---

## Étape 3 - Choisir la destination

Sélectionnez l'endroit où vous souhaitez envoyer les données :

- **Base de données B1** : importe directement dans la base de données B1 de votre église. Après avoir sélectionné cette option, l'outil affiche le nombre final d'enregistrements à ajouter. Cliquez sur **Démarrer le transfert** pour confirmer.
- **Archive ZIP d'exportation B1** : télécharge vos données sous forme de fichier zip au format B1, qui pourra être restauré plus tard avec **Archive ZIP B1**. Idéal pour les sauvegardes.
- **Archive ZIP d'exportation Breeze** : convertit vos données au format Breeze.
- **Archive ZIP Planning Center** : convertit vos données au format Planning Center.

:::warning
La source et la destination ne peuvent pas être du même format. S'ils sont identiques, l'outil vous en avertit pour éviter une duplication accidentelle.
:::

---

## Étape 4 - Exécution

L'outil traite le transfert et affiche la progression de chaque étape :

- Campus, services et horaires
- Personnes
- Photos
- Groupes et membres de groupes
- Dons
- Présence
- Formulaires, questions, réponses et réponses aux formulaires
- Champs personnalisés (si vous avez associé des colonnes de champs personnalisés)
- Compression (uniquement pour les destinations en fichier zip)

Lorsque la destination est la **Base de données B1**, la carte de progression s'intitule **Progression de l'importation** et se termine par **Importation terminée !** (ou **Importation terminée avec des erreurs**). Pour les destinations en fichier zip, les mêmes messages utilisent le mot **Exportation**.

:::info
Lors de la restauration d'une **Archive ZIP B1**, les enregistrements qui renvoient à un élément absent du fichier sont ignorés au lieu d'interrompre l'importation : adhésions aux groupes de personnes ou de groupes absents du zip, présences pour des groupes ou des personnes supprimés, et liens entre des groupes et des horaires de service supprimés. Les sessions de présence qui n'étaient pas rattachées à un horaire de service sont tout de même restaurées. De même, lors d'une exportation, une photo qui ne peut pas être téléchargée ou lue est omise afin que l'étape **Photos** puisse se poursuivre.
:::

:::warning
Ne fermez pas votre navigateur pendant le transfert. Attendez que toutes les étapes affichent la mention terminée.
:::

---

## Préparer une archive ZIP Breeze

1. Dans Breeze, accédez à **Paramètres** et cliquez sur **Exporter** dans le menu de gauche.
2. Exportez trois fichiers distincts : **Personnes**, **Étiquettes** et **Contributions**.
3. Sélectionnez les trois fichiers, faites un clic droit et compressez-les dans un seul fichier zip.
   - Sur Mac : sélectionnez les fichiers, faites un clic droit et choisissez **Compresser**.
   - Sur PC : sélectionnez les fichiers, faites un clic droit, choisissez **Envoyer vers**, puis **Dossier compressé (zippé)**.
4. Téléversez le fichier zip à l'aide de l'option **Archive ZIP Breeze** à l'étape 1.

L'importation Breeze transfère automatiquement les personnes, les groupes (étiquettes) et les enregistrements de dons.

---

## Préparer une exportation Planning Center

1. Connectez-vous à Planning Center et ouvrez le produit **People**.
2. Dans le menu de gauche, cliquez sur **Lists** et créez une liste incluant toutes les personnes que vous souhaitez transférer. (Si vous disposez déjà d'une liste de l'ensemble de votre assemblée, utilisez-la.)
3. Ouvrez la liste et utilisez son option **export** pour télécharger vos personnes au format **CSV**. Incluez les champs que vous souhaitez conserver : le nom, l'e-mail, le téléphone, l'adresse, la date de naissance, le genre et le statut d'adhésion sont tous transférés vers B1.
4. Si Planning Center vous fournit plusieurs fichiers, sélectionnez-les tous, faites un clic droit et compressez-les dans un seul fichier zip.
   - Sur Mac : sélectionnez les fichiers, faites un clic droit et choisissez **Compresser**.
   - Sur PC : sélectionnez les fichiers, faites un clic droit, choisissez **Envoyer vers**, puis **Dossier compressé (zippé)**.
5. Téléversez le CSV ou le zip à l'aide de l'option **Archive ZIP Planning Center** à l'étape 1.

Après le téléversement, passez à l'aperçu et vérifiez que vos personnes et vos foyers sont corrects avant de lancer l'importation.

---

## Préparer une exportation Tithe.ly

1. Dans Tithe.ly, exportez vos données **Personnes** au format CSV ou Excel. Vous pouvez aussi exporter un fichier **Dons** distinct si vous souhaitez importer les enregistrements de dons.
2. L'outil détecte automatiquement si le fichier contient des données de personnes ou de dons, en fonction des noms de colonnes.
3. Téléversez le fichier à l'aide de l'option **CSV Tithe.ly** à l'étape 1.

:::info
Les exports Tithe.ly peuvent être importés un fichier à la fois. Relancez le processus deux fois si vous devez importer séparément les personnes et les dons.
:::

---

## Préparer une exportation CCB ou Pushpay

1. Dans Church Community Builder ou Pushpay, exportez vos données **Personnes** au format CSV. Vous pouvez aussi exporter un fichier distinct de dons ou de contributions.
2. L'outil détecte automatiquement si le fichier contient des données de personnes ou de dons, en fonction des noms de colonnes.
3. Téléversez le fichier à l'aide de l'option **CSV CCB / Pushpay** à l'étape 1.

---

## Après l'importation

Une fois le transfert terminé, prenez quelques minutes pour vérifier vos données :

1. Parcourez la page [Personnes](../people/adding-people.md) et contrôlez quelques fiches au hasard.
2. Vérifiez que les noms, e-mails, numéros de téléphone et adresses sont correctement importés.
3. Vérifiez que les liens entre les membres d'un même foyer sont intacts. Le rôle de chaque personne dans le foyer (Chef de famille, Conjoint, Enfant ou Autre) est repris lorsque la source en contient un : la colonne **householdRole** dans une archive ZIP B1, **Family Role** dans Breeze ou Tithe.ly, et **Family Position** dans CCB / Pushpay. Des rôles tels que « Head of Household », « Primary », « Wife » ou « Son » sont convertis en rôle B1 correspondant. Les importations Planning Center et CSV / Excel personnalisé ne comportent pas de colonne de rôle : les personnes concernées sont donc définies comme **Autre**. Vous pouvez modifier un rôle depuis le foyer de la personne sur la page [Personnes](../people/adding-people.md#managing-households).
4. Vérifiez les groupes et les enregistrements de dons importés.

Si vous constatez des problèmes, vous pouvez modifier les fiches individuelles depuis la page Personnes. Vous pouvez aussi relancer l'outil de transfert pour [exporter vos données](exporting-data.md) à titre de sauvegarde.
