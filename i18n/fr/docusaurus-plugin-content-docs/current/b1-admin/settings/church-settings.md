---
title: "Paramètres de l'église"
---

# Paramètres de l'église

<div class="article-intro">

La page Paramètres de l'église est l'endroit où vous configurez les informations de base, les coordonnées et la marque de votre église. Ces détails sont utilisés dans tous les outils ChurchApps, y compris votre site web B1.church et l'application mobile B1.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Vous avez besoin de la permission « Modifier les paramètres de l'église ». Voir [Rôles et autorisations](./roles-permissions.md) si vous n'avez pas accès.
- Ayez l'adresse de votre église, les coordonnées de contact et le logo prêts

</div>

## Modification de vos informations d'église

1. Dans B1 Admin, ouvrez le [menu Accès rapide](../introduction.md#getting-around-with-the-jump-menu) (la barre de recherche en haut à gauche), développez **Paramètres**, et cliquez sur **Paramètres**.
2. Ouvrez la section **Informations de l'église** et cliquez sur son icône de modification (crayon).
3. Mettez à jour l'un des champs suivants :
   - **Nom de l'église** -- Le nom affiché dans tous les produits ChurchApps.
   - **Adresse** -- L'adresse physique de votre église.
   - **Informations de contact** -- Numéro de téléphone, e-mail et autres détails de contact.
4. Cliquez sur **Enregistrer** pour appliquer vos modifications.

## Configuration de votre sous-domaine

Votre église obtient un sous-domaine gratuit à **votreeglise.1.church**. C'est l'adresse web où les membres et les visiteurs peuvent accéder à la présence en ligne de votre église.

1. Sur la page Paramètres, localisez le champ **Sous-domaine**.
2. Entrez votre sous-domaine préféré (par exemple, « eglisedesgrace » pour eglisedesgrace.1.church).
3. Enregistrez vos modifications.

:::info
Votre sous-domaine doit être unique dans toutes les églises ChurchApps. Si votre nom préféré est déjà pris, essayez d'ajouter votre ville ou état (par exemple, « eglisedesgrace-paris »).
:::

Si vous souhaitez que les visiteurs accèdent à votre site sur votre propre domaine (par exemple, **www.eglisedesgrace.fr**), voir [Domaine personnalisé](./custom-domain.md).

## Configuration de la marque

Personnalisez l'apparence de votre église dans tous les outils ChurchApps :

1. Téléchargez votre **logo d'église** en cliquant sur la zone du logo et en sélectionnant un fichier image.
2. Ajoutez les **images d'église** supplémentaires utilisées sur votre site web et [application mobile](./mobile-app.md).

:::tip
Pour de meilleurs résultats, utilisez un logo avec un arrière-plan transparent au format PNG. Cela garantit qu'il a l'air excellent sur les arrière-plans clairs et sombres.
:::

## Premier jour de la semaine

Choisissez le jour par lequel vos calendriers commencent. La liste déroulante **Premier jour de la semaine** de la section Infos d'église est par défaut **Dimanche**, mais peut être définie sur n'importe quel jour. Une fois changé, il est respecté dans les grilles de calendrier de B1 Admin et du portail des membres B1.church -- les calendriers de groupe, les calendriers soignés et l'éditeur d'événements disposent tous les semaines à partir du jour que vous choisissez.

## Région (format de date et de téléphone)

Le paramètre **Région** contrôle la façon dont les dates et les heures sont écrites dans tout B1. Par défaut, les dates utilisent le format américain (par exemple, « 28 sept 2026 » et « 28/09/2026 »). Les églises en dehors des États-Unis peuvent passer à leur propre format -- par exemple, en choisissant Anglais (Royaume-Uni), on affiche « 28 Sept 2026 » et « 28/09/2026 » à la place.

1. Sur la page Paramètres, trouvez la fiche **Région** et cliquez pour la modifier.
2. Choisissez votre région dans la liste déroulante **Région**. Chaque option affiche une date d'exemple pour que vous puissiez voir exactement comment les dates seront affichées.
3. Cliquez sur **Enregistrer**.

La fiche Région affiche alors votre région sélectionnée, un échantillon du **format de date** et votre format de **numéros de téléphone**.

### Format des numéros de téléphone

La même fiche Région comporte un paramètre **Numéros de téléphone** qui contrôle la façon dont les numéros de téléphone sont saisis dans la fiche d'une personne :

- **International (avec indicatif du pays)** -- la valeur par défaut. Les champs de téléphone affichent un sélecteur de drapeau de pays et enregistrent les numéros avec l'indicatif du pays (par exemple, +1 918 555 1234).
- **Local (tel que saisi)** -- les champs de téléphone deviennent de simples zones de texte et enregistrent les numéros exactement comme vous les saisissez, sans ajouter d'indicatif du pays (par exemple, 0701 234 5678). Choisissez cette option si votre église écrit les numéros dans un format local et ne veut pas que B1 ajoute un indicatif du pays.

Lorsque **Local** est sélectionné, la fiche Région affiche aussi « Numéros de téléphone locaux » à côté de votre région.

:::tip
Les SMS fonctionnent mieux lorsque les numéros comprennent l'indicatif du pays. Si vous envoyez des textos depuis B1, gardez le format **International**, ou assurez-vous que les numéros saisis en mode Local comprennent l'indicatif du pays.
:::

Votre région s'applique aux dates et heures dans tout B1 Admin et sur votre site web B1.church et le portail des membres, y compris les sermons, les articles de blog, les calendriers de groupe et les plans de service, afin que les membres voient les dates au même format que votre personnel.

## SMS

Connectez un fournisseur de SMS pour envoyer des messages texte à une personne ou à un groupe entier à partir de B1 Admin. Les textes sont envoyés via votre propre compte auprès du fournisseur, de sorte que ses tarifs et limites s'appliquent.

1. Sur la page Paramètres, trouvez la fiche **SMS** et cliquez pour la modifier.
2. Choisissez un **Fournisseur** :
   - **Clearstream** -- entrez une **Clé API**. Créez-en une dans Paramètres du compte Clearstream sous Clés API.
   - **Text In Church** -- entrez une **Clé API**. Demandez d'abord l'accès à l'API de développement au support Text In Church, puis créez une clé dans vos Paramètres du compte > section API de développeur.
   - **Nalo Solutions** (Ghana) -- entrez la clé d'authentification de votre compte Nalo Solutions comme **Clé API**, et un **ID d'expéditeur** (jusqu'à 11 caractères) qu'Nalo a approuvé pour vous.
3. Cliquez sur **Enregistrer**.

Pour arrêter la messagerie texte, définissez **Fournisseur** sur **Aucun** et enregistrez. Cela supprime le fournisseur enregistré.

Une fois qu'un fournisseur est connecté, le personnel autorisé à envoyer des textes voir une icône de texte dans l'en-tête d'un groupe (**Texte à ce groupe**) et d'une personne avec un téléphone mobile (**Envoyer un message texte**). Tapez votre message et cliquez sur **Envoyer**. La boîte de dialogue compte les caractères et les segments SMS. Pour un groupe, elle affiche combien de membres recevront le texte avant que vous l'envoyiez :

- Les membres sans numéro de téléphone mobile archivé sont ignorés.
- Les membres qui ont choisi **Me cacher de l'annuaire des membres** sont comptés comme désabonnés et ignorés.
- Les membres de la famille qui partagent un numéro de téléphone mobile ne reçoivent le texte qu'une seule fois.

### Personnalisation des textes avec des champs de fusion

Sous la zone de message, la boîte de dialogue Texte affiche les puces d'espace réservé : **Prénom**, **Nom**, **Nom d'affichage**, et **Nom de l'église**. Cliquez sur une puce pour insérer son espace réservé (`{{firstName}}`, `{{lastName}}`, `{{displayName}}`, ou `{{churchName}}`) à votre curseur. Lorsque le texte est envoyé, chaque espace réservé est remplacé par les détails du destinataire, donc un texte de groupe comme `Bonjour {{firstName}}, à bientôt le dimanche !` atteint chaque membre avec son propre nom. Les espaces réservés fonctionnent à la fois pour les textes de groupe et les textes à une seule personne.

:::info
La limite de 1600 caractères s'applique au message tel que vous le tapez. Une fois que les espaces réservés sont remplis, tout texte plus long que 1600 caractères est coupé à cette longueur.
:::

Les textes peuvent également être envoyés automatiquement à partir d'une étape de [flux de travail](../serving/workflows.md#sending-a-text) avec l'action **Envoyer un texte**, qui utilise le même fournisseur et les mêmes espaces réservés.

## Stockage de fichiers

Par défaut, les fichiers que vous téléchargez sur votre site web (via [Fichiers](../website/files.md)) et d'autres zones de contenu utilisent le stockage hébergé gratuit de B1, jusqu'à 100 Mo. Si vous avez besoin de plus d'espace, vous pouvez connecter votre propre stockage cloud à la place -- les nouveaux téléchargements vont alors directement sur votre compte sans limite de plate-forme.

1. Sur la page Paramètres, trouvez la fiche **Stockage de fichiers** et cliquez pour la modifier.
2. Choisissez un fournisseur : **Google Drive**, **Dropbox**, **OneDrive**, ou un **bucket compatible S3** (AWS S3, Cloudflare R2, Backblaze B2, etc.).
3. Pour Google Drive, Dropbox ou OneDrive, cliquez sur **Connecter** et connectez-vous pour autoriser l'accès. Pour un bucket compatible S3, entrez votre clé d'accès, secret, nom du bucket et base d'URL publique.
4. Cliquez sur **Enregistrer**.

:::info
Cela affecte uniquement les nouveaux téléchargements vers les Fichiers de votre site web et les zones de contenu similaires. Les images de galerie, les vignettes, les logos et les photos de profil restent toujours sur le stockage par défaut de B1.
:::

## Promotion de classe

Si vous suivez la **classe** sur les enfants et les étudiants, B1 peut automatiquement promouvoir tout le monde une classe à une date que vous choisissez (par exemple, le 1er août) plutôt que de vous obliger à modifier chaque profil à la main.

1. Sur la page Paramètres, trouvez l'option **Promotion de classe**.
2. Activez le commutateur (il affiche **Activé**) et choisissez le **Mois** et le **Jour** pour promouvoir les classes chaque année. À cette date, chacun avec une classe monte d'une classe, et les élèves de 12e année deviennent **Diplômés**.
3. Enregistrez vos modifications.

Pour arrêter la promotion automatique, éteignez le commutateur pour qu'il affiche **Désactivé** et enregistrez. La date de promotion est supprimée et les classes ne changeront plus d'elles-mêmes.

## Importation et exportation

Le bouton **Importation/Exportation** dans l'en-tête des Paramètres ouvre un outil dédié dans une nouvelle fenêtre de navigateur. Utilisez ceci pour :

- Importer les données des membres d'un autre système de gestion d'église.
- Exporter vos données ChurchApps pour la sauvegarde ou à titre de migration.

Ceci est particulièrement utile lorsque vous configurez votre église pour la première fois et que vous avez besoin de transférer les dossiers existants dans ChurchApps.

:::warning
Lors de l'importation de données, toujours sauvegarder vos dossiers existants en premier. Les opérations d'importation ajoutent des données à votre système et peuvent créer des entrées en double si elles sont exécutées plusieurs fois.
:::

