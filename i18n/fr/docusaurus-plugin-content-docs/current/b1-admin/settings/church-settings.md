---
title: "Paramètres de l'église"
---

# Paramètres de l'église {#church-settings}

<div class="article-intro">

La page Paramètres de l'église vous permet de configurer les informations de base de votre église, ses coordonnées et son identité visuelle. Ces informations sont utilisées par tous les outils ChurchApps, y compris votre site web B1.church et l'application mobile B1.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Vous devez disposer de l'autorisation « Modifier les paramètres de l'église ». Voir [Rôles et permissions](./roles-permissions.md) si vous n'y avez pas accès.
- Ayez à portée de main l'adresse, les coordonnées et le logo de votre église

</div>

## Modifier les informations de l'église {#editing-your-church-information}

1. Dans B1 Admin, ouvrez le [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (la barre de recherche en haut à gauche), développez **Paramètres**, puis cliquez sur **Paramètres**.
2. Dans la section **Informations de l'église** (en haut de la page), cliquez sur **Modifier**.
3. Mettez à jour les champs suivants si besoin :
   - **Nom de l'église** : le nom affiché dans tous les produits ChurchApps.
   - **Adresse** : l'adresse physique de votre église.
   - **Coordonnées** : numéro de téléphone, e-mail et autres informations de contact.
   - **Fuseau horaire** : le fuseau horaire de votre église. Voir [Fuseau horaire](#time-zone) ci-dessous.
4. Cliquez sur **Enregistrer** pour appliquer vos modifications.

## Configurer votre sous-domaine {#setting-up-your-subdomain}

Votre église reçoit gratuitement un sous-domaine **yourchurch.1.church**. C'est l'adresse web où les membres et les visiteurs peuvent accéder à la présence en ligne de votre église.

1. Sur la page Paramètres, cliquez sur **Modifier** dans la section **Informations de l'église** et repérez le champ **Sous-domaine**.
2. Saisissez le sous-domaine souhaité (par exemple, « gracechurch » pour gracechurch.1.church).
3. Enregistrez vos modifications.

:::info
Votre sous-domaine doit être unique parmi toutes les églises ChurchApps. Si le nom souhaité est déjà pris, essayez d'ajouter votre ville ou votre région (par exemple, « gracechurch-dallas »).
:::

Si vous souhaitez que les visiteurs accèdent à votre site via votre propre domaine (par exemple, **www.gracechurch.org**), consultez [Domaine personnalisé](./custom-domain.md).

## Configurer l'image de marque {#configuring-branding}

Personnalisez l'apparence de votre église dans tous les outils ChurchApps :

1. Importez le **logo de l'église** en cliquant sur la zone du logo et en sélectionnant un fichier image.
2. Ajoutez les **images de l'église** supplémentaires utilisées sur votre site web et dans l'[application mobile](./mobile-app.md).

:::tip
Pour de meilleurs résultats, utilisez un logo au format PNG avec un fond transparent. Il sera ainsi bien visible sur les fonds clairs comme sombres.
:::

## Premier jour de la semaine {#first-day-of-week}

Choisissez le jour de début de vos calendriers. La liste déroulante **Premier jour de la semaine**, dans la section Informations de l'église, est réglée par défaut sur **dimanche**, mais peut être définie sur n'importe quel jour. Une fois modifié, ce réglage est appliqué aux grilles de calendrier de B1 Admin et du portail membre B1.church : les calendriers de groupes, les calendriers personnalisés et l'éditeur d'événements affichent tous des semaines commençant le jour choisi.

## Fuseau horaire {#time-zone}

La liste déroulante **Fuseau horaire**, dans la section **Informations de l'église**, définit le fuseau horaire de votre église (par exemple, *America/Chicago*). Choisissez **Aucun** pour la laisser vide. Une fois enregistré, le fuseau apparaît dans le résumé des informations de l'église.

B1 utilise ce fuseau horaire pour les heures à l'échelle de l'église, comme les rappels d'événements et les programmes affichés sur vos téléviseurs [FreePlay](../../freeplay/scheduled-mode/scheduling-the-calendar.md). Les [horaires d'enregistrement](../attendance/setup.md#setting-a-check-in-schedule) sont mesurés d'abord selon le fuseau horaire du [lieu d'implantation](./campuses.md) du service, et n'utilisent le fuseau de l'église que si ce lieu n'en a pas. Si vos lieux sont tous dans le même fuseau horaire, réglez-le à la fois sur l'église et sur chaque lieu.

## Région (format des dates et des numéros de téléphone) {#region-date-and-phone-format}

Le paramètre **Région** détermine la manière dont les dates et les heures sont écrites dans toute B1. Par défaut, les dates suivent le format américain (par exemple « Sep 28, 2026 » et « 9/28/2026 »). Les églises situées hors des États-Unis peuvent choisir leur propre format : par exemple, en sélectionnant « English (United Kingdom) », les dates s'affichent sous la forme « 28 Sept 2026 » et « 28/09/2026 ».

1. Sur la page Paramètres, cliquez sur **Région** dans la liste de gauche, puis sur **Modifier** dans la section **Région**.
2. Choisissez votre région dans la liste déroulante **Région**. Chaque option affiche un exemple de date pour que vous puissiez voir exactement l'affichage.
3. Cliquez sur **Enregistrer**.

La section Région affiche ensuite la région sélectionnée, un exemple de **Format de date** et votre format de **Numéros de téléphone**.

### Format des numéros de téléphone {#phone-number-format}

La même section Région contient un paramètre **Numéros de téléphone** qui détermine la façon dont les numéros sont saisis sur la fiche d'une personne :

- **International (avec indicatif pays)** : valeur par défaut. Les champs téléphone affichent un sélecteur de drapeaux de pays et enregistrent les numéros avec l'indicatif (par exemple, +1 918 555 1234).
- **Local (tel que saisi)** : les champs téléphone deviennent de simples zones de texte et enregistrent les numéros exactement comme vous les tapez, sans indicatif (par exemple, 0701 234 5678). Choisissez cette option si votre église écrit les numéros au format local et ne souhaite pas que B1 ajoute un indicatif.

Lorsque **Local** est sélectionné, la section Région affiche aussi « Numéros de téléphone locaux » à côté de votre région.

:::tip
L'envoi de SMS fonctionne mieux lorsque les numéros comportent l'indicatif pays. Si vous envoyez des textos depuis B1, conservez le format **International**, ou assurez-vous que les numéros saisis en mode Local incluent l'indicatif pays.
:::

Votre région s'applique aux dates et aux heures dans toute B1 Admin ainsi que sur votre site B1.church et le portail membre, y compris les sermons, les articles de blog, les calendriers de groupes et les plans de service, afin que les membres voient les dates dans le même format que votre personnel.

## Envoi de SMS {#texting}

Connectez un fournisseur de SMS pour envoyer des messages texte à une personne ou à un groupe entier depuis B1 Admin. Les textos sont envoyés via votre propre compte auprès du fournisseur ; ses tarifs et ses limites s'appliquent donc.

1. Sur la page Paramètres, cliquez sur **Envoi de SMS** dans la liste de gauche, puis sur **Modifier** dans la section **Envoi de SMS**.
2. Choisissez un **Fournisseur** :
   - **Clearstream** : saisissez une **clé API**. Créez-la dans les paramètres de votre compte Clearstream, sous Clés API.
   - **Text In Church** : saisissez une **clé API**. Demandez d'abord l'accès développeur à l'API auprès du support Text In Church, puis créez une clé dans la section Paramètres du compte > API développeur.
   - **Nalo Solutions** (Ghana) : saisissez la clé d'authentification de votre compte Nalo Solutions comme **clé API**, ainsi qu'un **identifiant d'expéditeur** (jusqu'à 11 caractères) approuvé pour vous par Nalo.
3. Cliquez sur **Enregistrer**.

Pour arrêter l'envoi de SMS, réglez **Fournisseur** sur **Aucun** et enregistrez. Cela supprime le fournisseur enregistré.

### Désabonner les personnes qui répondent STOP {#opting-out-people-who-reply-stop}

Une fois un fournisseur enregistré, rouvrez la section Envoi de SMS avec **Modifier**. Sous les paramètres du fournisseur, un champ en lecture seule **URL du webhook de désabonnement (STOP) entrant** affiche une adresse web propre à votre église. Cliquez dans le champ pour sélectionner l'adresse, copiez-la et collez-la dans le paramètre de webhook de réponse (messages entrants) de votre fournisseur de SMS. Cela fonctionne avec tous les fournisseurs ci-dessus capables de transmettre les réponses entrantes à un webhook.

Ensuite, lorsqu'une personne répond **STOP** (ou STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT, OPTOUT ou REVOKE) à l'un de vos textos, B1 trouve toutes les personnes dont le numéro mobile correspond, les marque comme désabonnées et désactive leurs rappels par SMS. Elles sont ensuite ignorées dans les envois groupés. Les autres réponses sont ignorées.

:::info
Ceci utilise le même paramètre de désabonnement que **Me masquer de l'annuaire des membres** : les personnes qui répondent STOP apparaissent donc aussi comme **Masqué de l'annuaire** sur leur profil. Le champ n'apparaît que lorsque le fournisseur enregistré est sélectionné : si vous changez le fournisseur dans la liste, enregistrez d'abord pour revoir l'URL.
:::

Une fois un fournisseur connecté, le personnel autorisé à envoyer des textos voit un bouton **Texto** sur la page d'un groupe (**Envoyer un texto à ce groupe**) et sur la page d'une personne disposant d'un téléphone mobile (**Envoyer un texto**). Saisissez votre message et cliquez sur **Envoyer**. La boîte de dialogue compte les caractères et les segments SMS. Pour un groupe, elle indique le nombre de membres qui recevront le texto avant l'envoi :

- Les membres sans téléphone mobile enregistré sont ignorés.
- Les membres qui ont choisi **Me masquer de l'annuaire des membres** sont comptés comme désabonnés et ignorés.
- Les membres d'une même famille qui partagent un numéro mobile ne reçoivent le texto qu'une seule fois.

### Personnaliser les textos avec des champs de fusion {#personalizing-texts-with-merge-fields}

Sous la zone de message, la boîte de dialogue d'envoi affiche des puces de champs : **Prénom**, **Nom**, **Nom d'affichage** et **Nom de l'église**. Cliquez sur une puce pour insérer son espace réservé (`{{firstName}}`, `{{lastName}}`, `{{displayName}}` ou `{{churchName}}`) à l'emplacement du curseur. Lors de l'envoi, chaque espace réservé est remplacé par les informations du destinataire ; ainsi, un message groupé comme `Bonjour {{firstName}}, à dimanche !` atteint chaque membre avec son propre prénom. Les espaces réservés fonctionnent aussi bien pour les textos groupés que pour les textos adressés à une seule personne.

:::info
La limite de 1 600 caractères s'applique au message tel que vous le saisissez. Une fois les espaces réservés remplis, tout texte dépassant 1 600 caractères est tronqué à cette longueur.
:::

Les textos peuvent aussi être envoyés automatiquement depuis une étape d'un [flux de travail](../serving/workflows.md#sending-a-text) grâce à l'action **Envoyer un texto**, qui utilise le même fournisseur et les mêmes espaces réservés.

## Stockage des fichiers {#file-storage}

Par défaut, les fichiers que vous importez sur votre site web (via [Fichiers](../website/files.md)) et dans les autres zones de contenu utilisent le stockage hébergé gratuit de B1, jusqu'à 100 Mo. Si vous avez besoin de plus d'espace, vous pouvez plutôt connecter votre propre stockage cloud : les nouveaux envois sont alors transférés directement vers votre compte, sans limite de la plateforme.

1. Sur la page Paramètres, cliquez sur **Stockage des fichiers** dans la liste de gauche, puis sur **Modifier** dans la section **Stockage des fichiers**.
2. Choisissez un fournisseur : **Google Drive**, **Dropbox**, **OneDrive** ou un **bucket compatible S3** (AWS S3, Cloudflare R2, Backblaze B2, etc.).
3. Pour Google Drive, Dropbox ou OneDrive, cliquez sur **Connecter** et connectez-vous pour autoriser l'accès. Pour un bucket compatible S3, saisissez votre clé d'accès, votre clé secrète, le nom du bucket et l'URL publique de base.
4. Cliquez sur **Enregistrer**.

:::info
Cela n'affecte que les nouveaux envois vers les Fichiers de votre site web et les zones de contenu similaires. Les images de galerie, les vignettes, les logos et les photos de personnes restent toujours sur le stockage par défaut de B1.
:::

## Passage de classe {#grade-promotion}

Si vous suivez le **niveau scolaire** des enfants et des élèves, B1 peut automatiquement faire passer tout le monde à la classe supérieure à une date de votre choix (par exemple, le 1er août), au lieu de vous obliger à modifier chaque fiche à la main.

1. Sur la page Paramètres, cliquez sur **Passage de classe** dans la liste de gauche, puis sur **Modifier** dans la section **Passage de classe**.
2. Activez le bouton (il affiche **Activé**) et choisissez le **Mois** et le **Jour** de passage chaque année. À cette date, toutes les personnes ayant un niveau passent à la classe supérieure, et les élèves de terminale passent au statut **Diplômé**.
3. Enregistrez vos modifications.

Pour arrêter le passage automatique, désactivez le bouton pour qu'il affiche **Désactivé**, puis enregistrez. La date de passage est supprimée et les niveaux ne changeront plus d'eux-mêmes.

## Inscription aux bénévolats {#volunteer-signup}

Par défaut, les membres qui consultent les [inscriptions aux bénévolats](../../b1-church/serving/volunteer-signup.md) voient toutes les semaines à venir comportant des postes ouverts. Si cette liste devient longue, vous pouvez n'afficher que la semaine suivante de chaque type de planification.

1. Sur la page Paramètres, cliquez sur **Inscription aux bénévolats** dans la liste de gauche, puis sur **Modifier** dans la section **Inscription aux bénévolats**.
2. Activez **Afficher uniquement la semaine suivante de chaque type de planification**.
3. Enregistrez vos modifications.

Avec cette option activée, chaque type de planification n'affiche que sa prochaine planification à venir. La semaine suivante apparaît une fois que cette date est passée. La ligne **Semaines affichées** de la section indique **Uniquement la semaine suivante de chaque type de planification** ou **Toutes les semaines à venir**.

## Confidentialité des dons {#giving-privacy}

Les personnes ayant accès aux dons voient normalement les totaux de dons d'une personne sur sa [fiche](../people/adding-people.md#editing-details). Si vous préférez ne pas afficher les montants à chaque ouverture d'une fiche, vous pouvez les masquer jusqu'à ce que quelqu'un le demande.

1. Sur la page Paramètres, cliquez sur **Confidentialité des dons** dans la liste de gauche, puis sur **Modifier** dans la section **Confidentialité des dons**.
2. Activez **Masquer les dons sur les fiches des personnes jusqu'à ce qu'on clique**.
3. Enregistrez vos modifications.

Avec cette option activée, la carte des dons sur une fiche affiche « Les dons sont masqués sur les fiches des personnes ». Cliquez sur **Afficher les dons** pour charger et afficher les dons de cette personne. Ils se masquent à nouveau lorsque vous ouvrez une autre fiche. Cela ne change pas qui peut voir les dons : seules les personnes ayant accès aux dons voient la carte.

## Importation et exportation {#import-and-export}

Le lien **Import/Export**, sous le nom de votre église sur la page Paramètres, ouvre un outil dédié dans une nouvelle fenêtre du navigateur. Utilisez-le pour :

- Importer les données des membres depuis un autre système de gestion d'église.
- Exporter vos données ChurchApps pour une sauvegarde ou une migration.

Cela est particulièrement utile lors de la configuration initiale de votre église, lorsque vous devez transférer des fiches existantes vers ChurchApps.

:::warning
Lors d'une importation, sauvegardez toujours vos fiches existantes au préalable. Les importations ajoutent des données à votre système et peuvent créer des doublons si elles sont exécutées plusieurs fois.
:::
