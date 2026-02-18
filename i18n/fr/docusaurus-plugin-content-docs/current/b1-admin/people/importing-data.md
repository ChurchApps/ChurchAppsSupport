---
title: "Importer des données"
---

# Importer des données

<div class="article-intro">

B1 Admin facilite l'importation de vos données de membres existantes dans le système. Que vous migriez depuis une autre plateforme de gestion d'église ou que vous chargiez des données à partir d'un tableur, les outils d'importation vous évitent de saisir manuellement chaque personne. Vous pouvez importer à partir d'un fichier CSV ou migrer directement depuis Breeze ChMS.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Vous avez besoin d'un compte B1 Admin actif avec accès aux **Paramètres**. Consultez [Rôles et permissions](roles-permissions.md) si vous n'êtes pas sûr de votre niveau d'accès.
- Préparez vos données de membres dans un tableur ou exportez-les depuis votre système précédent.
- Si vous migrez depuis Breeze, assurez-vous d'avoir d'abord exporté vos fichiers Personnes, Tags et Contributions depuis Breeze.

</div>

## Importer depuis un CSV

Si vous avez des données de membres dans un tableur ou un autre système, vous pouvez les importer à l'aide d'un fichier CSV (valeurs séparées par des virgules).

1. Accédez à **Paramètres** dans la barre latérale gauche.
2. Cliquez sur **Import/Export** dans la navigation supérieure.
3. Sélectionnez **B1 Import Zip** dans le menu déroulant **Source de données**.
4. Cliquez sur le lien pour **télécharger les fichiers d'exemple** afin de voir le format attendu.
5. Ouvrez le fichier `people.csv` d'exemple et remplacez les données d'exemple par les vôtres. Conservez la ligne d'en-tête intacte.
6. Si vous avez des photos de membres, ajoutez-les au dossier en utilisant des images de 400x300px, en les nommant pour correspondre aux numéros `importKey` de votre CSV.
7. Compressez vos fichiers modifiés dans un fichier zip.
8. De retour dans B1 Admin, cliquez sur **Télécharger** et sélectionnez votre fichier zip.
9. Vérifiez l'aperçu des données et cliquez sur **Continuer vers la destination**.
10. Vérifiez que **B1 Database** est sélectionné, consultez le résumé de l'importation et cliquez sur **Démarrer le transfert**.
11. Attendez que l'importation soit terminée, puis cliquez sur **Aller à B1** pour retourner à votre tableau de bord.

:::tip
Téléchargez et examinez toujours les fichiers d'exemple en premier. Respecter le format de colonnes attendu évitera les erreurs d'importation.
:::

:::warning
L'importation de données ajoutera de nouveaux enregistrements à votre base de données. Si vous importez le même fichier deux fois, vous risquez de vous retrouver avec des doublons. Vérifiez bien votre fichier avant de lancer le transfert.
:::

## Importer depuis Breeze ChMS

Si vous migrez depuis Breeze, B1 dispose d'une option d'importation dédiée qui gère automatiquement la conversion.

1. Dans Breeze, accédez à **Paramètres** et cliquez sur **Exporter** dans la barre latérale gauche.
2. Exportez trois fichiers : **Personnes**, **Tags** et **Contributions**.
3. Sélectionnez les trois fichiers exportés, faites un clic droit et compressez-les dans un seul fichier zip.
4. Dans B1 Admin, accédez à **Paramètres** puis **Import/Export**.
5. Sélectionnez **Breeze Import Zip** dans le menu déroulant **Source de données**.
6. Téléchargez votre fichier zip et suivez les étapes à l'écran pour vérifier et terminer l'importation.

:::info
L'importation depuis Breeze transfère les personnes, les photos, les groupes, les dons, les présences, les formulaires et bien plus encore -- vous offrant une migration complète en une seule étape.
:::

## Après l'importation

Une fois votre importation terminée, prenez quelques minutes pour vérifier vos données :

1. Parcourez la page [Personnes](../people/adding-people.md) et vérifiez quelques profils au hasard.
2. Confirmez que les noms, e-mails, numéros de téléphone et adresses ont été correctement importés.
3. Vérifiez que les liens familiaux sont intacts.
4. Examinez les [groupes](../groups/creating-groups.md) ou tags qui ont été importés.

Si vous remarquez des problèmes, vous pouvez modifier les profils individuels directement depuis la page Personnes. Vous pouvez également [exporter vos données](exporting-data.md) à tout moment pour créer une sauvegarde.
