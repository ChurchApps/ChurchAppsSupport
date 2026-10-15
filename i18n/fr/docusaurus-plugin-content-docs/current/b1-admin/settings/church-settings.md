---
title: "Paramètres de l'église"
---

# Paramètres de l'église

<div class="article-intro">

La page Paramètres de l'église vous permet de configurer les informations de base de votre église, ses coordonnées et son identité visuelle. Ces informations sont utilisées par l'ensemble des outils ChurchApps, y compris votre site Web B1.church et l'application mobile B1.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Vous devez disposer de l'autorisation « Modifier les paramètres de l'église ». Voir [Rôles et autorisations](./roles-permissions.md) si vous n'y avez pas accès.
- Ayez à portée de main l'adresse, les coordonnées et le logo de votre église

</div>

## Modifier les informations de l'église

1. Dans B1 Admin, ouvrez le [menu de saut](../introduction.md#getting-around-with-the-jump-menu) (la barre de recherche en haut à gauche), développez **Paramètres**, et cliquez sur **Paramètres**.
2. Dans la section **Informations sur l'église** (en haut de la page), cliquez sur **Modifier**.
3. Mettez à jour l'un des champs suivants :
   - **Nom de l'église** -- Le nom affiché dans l'ensemble des produits ChurchApps.
   - **Adresse** -- L'adresse physique de votre église.
   - **Coordonnées** -- Numéro de téléphone, e-mail et autres informations de contact.
4. Cliquez sur **Enregistrer** pour appliquer vos modifications.

## Configurer votre sous-domaine

Votre église reçoit un sous-domaine gratuit à l'adresse **votre-eglise.1.church**. C'est l'adresse Web à laquelle les membres et les visiteurs peuvent accéder à la présence en ligne de votre église.

1. Sur la page Paramètres, cliquez sur **Modifier** dans la section **Informations sur l'église** et repérez le champ **Sous-domaine**.
2. Saisissez le sous-domaine de votre choix (par exemple, "egliseduchene" pour egliseduchene.1.church).
3. Enregistrez vos modifications.

:::info
Votre sous-domaine doit être unique parmi toutes les églises ChurchApps. Si le nom souhaité est déjà pris, essayez d'ajouter votre ville ou votre région (par exemple, "egliseduchene-lyon").
:::

Si vous souhaitez que les visiteurs accèdent à votre site depuis votre propre nom de domaine (par exemple, **www.egliseduchene.org**), consultez [Domaine personnalisé](./custom-domain.md).

## Configurer l'identité visuelle

Personnalisez l'apparence de votre église dans l'ensemble des outils ChurchApps :

1. Téléversez le **logo de votre église** en cliquant sur la zone du logo et en sélectionnant un fichier image.
2. Ajoutez les **images de l'église** supplémentaires utilisées sur votre site Web et dans votre [application mobile](./mobile-app.md).

:::tip
Pour de meilleurs résultats, utilisez un logo au format PNG avec un fond transparent. Il s'affichera ainsi correctement sur les fonds clairs comme sur les fonds sombres.
:::

## Premier jour de la semaine

Choisissez le jour de début de vos calendriers. La liste déroulante **Premier jour de la semaine** de la section Informations sur l'église est réglée par défaut sur **Dimanche**, mais peut être définie sur n'importe quel jour. Une fois modifiée, cette valeur est respectée dans les grilles de calendrier de B1 Admin et du portail membre B1.church -- calendriers de groupes, calendriers sélectionnés et éditeur d'événements affichent tous les semaines à partir du jour que vous avez choisi.

## Région (format de date et de téléphone)

Le paramètre **Région** contrôle la manière dont les dates et les heures sont écrites dans l'ensemble de B1. Par défaut, les dates suivent le format américain (par exemple, « Sep 28, 2026 » et « 9/28/2026 »). Les églises situées hors des États-Unis peuvent passer à leur propre format -- par exemple, en choisissant English (United Kingdom), on obtient « 28 Sept 2026 » et « 28/09/2026 ».

1. Sur la page Paramètres, cliquez sur **Région** dans la liste de gauche, puis cliquez sur **Modifier** dans la section **Région**.
2. Choisissez votre région dans la liste déroulante **Région**. Chaque option affiche un exemple de date pour que vous puissiez voir exactement l'aspect des dates.
3. Cliquez sur **Enregistrer**.

La section Région affiche alors la région sélectionnée, un exemple du **Format de date**, et votre format de **Numéros de téléphone**.

### Format des numéros de téléphone

La même section Région comporte un paramètre **Numéros de téléphone** qui contrôle la manière dont les numéros de téléphone sont saisis sur la fiche d'une personne :

- **International (avec indicatif pays)** -- la valeur par défaut. Les champs téléphone affichent un sélecteur de drapeau de pays et enregistrent les numéros avec l'indicatif pays (par exemple, +1 918 555 1234).
- **Local (tel que saisi)** -- les champs téléphone deviennent de simples zones de texte et enregistrent les numéros exactement comme vous les saisissez, sans ajouter d'indicatif pays (par exemple, 0701 234 5678). Choisissez cette option si votre église écrit les numéros dans un format local et ne souhaite pas que B1 ajoute un indicatif pays.

Lorsque **Local** est sélectionné, la section Région affiche aussi « Numéros de téléphone locaux » à côté de votre région.

:::tip
La messagerie SMS fonctionne mieux lorsque les numéros incluent l'indicatif pays. Si vous envoyez des SMS depuis B1, conservez le format **International**, ou assurez-vous que les numéros saisis en mode Local incluent l'indicatif pays.
:::

Votre région s'applique aux dates et aux heures dans l'ensemble de B1 Admin, sur votre site Web B1.church et dans le portail membre, y compris les sermons, les articles de blog, les calendriers de groupes et les plans de service, afin que les membres voient les dates dans le même format que votre personnel.

## SMS {#texting}

Connectez un fournisseur de SMS pour envoyer des messages texte à une personne ou à un groupe entier depuis B1 Admin. Les SMS sont envoyés via votre propre compte auprès du fournisseur, de sorte que ses tarifs et ses limites s'appliquent.

1. Sur la page Paramètres, cliquez sur **SMS** dans la liste de gauche, puis cliquez sur **Modifier** dans la section **SMS**.
2. Choisissez un **Fournisseur** :
   - **Clearstream** -- saisissez une **clé API**. Créez-en une dans les paramètres de votre compte Clearstream, sous Clés API.
   - **Text In Church** -- saisissez une **clé API**. Demandez d'abord un accès développeur à l'API auprès du support Text In Church, puis créez une clé dans la section Paramètres du compte > API développeur.
   - **Nalo Solutions** (Ghana) -- saisissez la clé d'authentification de votre compte Nalo Solutions comme **clé API**, ainsi qu'un **identifiant d'expéditeur** (jusqu'à 11 caractères) approuvé par Nalo pour vous.
3. Cliquez sur **Enregistrer**.

Pour arrêter l'envoi de SMS, réglez le **Fournisseur** sur **Aucun** et enregistrez. Cela supprime le fournisseur enregistré.

### Désabonner les personnes qui répondent STOP

Une fois un fournisseur enregistré, rouvrez la section SMS avec **Modifier**. Sous les paramètres du fournisseur, un champ en lecture seule **URL du webhook de réponse STOP** affiche une adresse Web propre à votre église. Cliquez sur le champ pour sélectionner l'adresse, copiez-la, et collez-la dans le paramètre de webhook de messages entrants (réponses) de votre fournisseur de SMS. Cela fonctionne avec tous les fournisseurs ci-dessus capables de transmettre les réponses entrantes à un webhook.

Ensuite, lorsqu'une personne répond **STOP** (ou STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT, OPTOUT ou REVOKE) à l'un de vos messages, B1 trouve toutes les personnes dont le numéro de portable correspond, les marque comme désabonnées et désactive leurs rappels par SMS. Elles sont ensuite ignorées par les SMS de groupe. Les autres réponses sont ignorées.

:::info
Cette fonctionnalité utilise le même paramètre de désabonnement que **Me masquer de l'annuaire des membres** : les personnes qui répondent STOP apparaissent donc aussi comme **Masqué de l'annuaire** sur leur fiche. Le champ n'apparaît que lorsque le fournisseur enregistré est sélectionné -- si vous changez le fournisseur dans la liste, enregistrez d'abord pour voir de nouveau l'URL.
:::

Une fois un fournisseur connecté, le personnel autorisé à envoyer des SMS voit un bouton **SMS** sur la page d'un groupe (**Envoyer un SMS à ce groupe**) et sur celle d'une personne disposant d'un téléphone portable (**Envoyer un SMS**). Saisissez votre message et cliquez sur **Envoyer**. La boîte de dialogue compte les caractères et les segments SMS. Pour un groupe, elle indique combien de membres recevront le message avant l'envoi :

- Les membres sans téléphone portable enregistré sont ignorés.
- Les membres qui ont choisi **Me masquer de l'annuaire des membres** sont comptés comme désabonnés et ignorés.
- Les membres d'une même famille qui partagent un numéro de portable ne reçoivent le message qu'une seule fois.

### Personnaliser les SMS avec des champs de fusion {#personalizing-texts-with-merge-fields}

Sous la zone de message, la boîte de dialogue SMS affiche des étiquettes d'espace réservé : **Prénom**, **Nom**, **Nom d'affichage** et **Nom de l'église**. Cliquez sur une étiquette pour insérer son espace réservé (`{{firstName}}`, `{{lastName}}`, `{{displayName}}` ou `{{churchName}}`) à l'emplacement de votre curseur. Lors de l'envoi, chaque espace réservé est remplacé par les informations du destinataire ; ainsi, un SMS de groupe tel que `Bonjour {{firstName}}, à dimanche !` parvient à chaque membre avec son propre prénom. Les espaces réservés fonctionnent aussi bien pour les SMS de groupe que pour les SMS adressés à une seule personne.

:::info
La limite de 1 600 caractères s'applique au message tel que vous le saisissez. Une fois les espaces réservés remplis, tout texte dépassant 1 600 caractères est tronqué à cette longueur.
:::

Des SMS peuvent aussi être envoyés automatiquement depuis une étape de [flux de travail](../serving/workflows.md#sending-a-text) avec l'action **Envoyer un SMS**, qui utilise le même fournisseur et les mêmes espaces réservés.

## Stockage de fichiers

Par défaut, les fichiers que vous téléversez sur votre site Web (via [Fichiers](../website/files.md)) et dans les autres zones de contenu utilisent le stockage hébergé gratuit de B1, jusqu'à 100 Mo. Si vous avez besoin de plus d'espace, vous pouvez connecter votre propre stockage cloud : les nouveaux téléversements sont alors envoyés directement dans votre compte, sans limite de la plateforme.

1. Sur la page Paramètres, cliquez sur **Stockage de fichiers** dans la liste de gauche, puis cliquez sur **Modifier** dans la section **Stockage de fichiers**.
2. Choisissez un fournisseur : **Google Drive**, **Dropbox**, **OneDrive**, ou un **bucket compatible S3** (AWS S3, Cloudflare R2, Backblaze B2, etc.).
3. Pour Google Drive, Dropbox ou OneDrive, cliquez sur **Connecter** et connectez-vous pour autoriser l'accès. Pour un bucket compatible S3, saisissez votre clé d'accès, votre clé secrète, le nom du bucket et l'URL publique de base.
4. Cliquez sur **Enregistrer**.

:::info
Cela ne concerne que les nouveaux téléversements dans les Fichiers de votre site Web et dans les zones de contenu similaires. Les images de galerie, les miniatures, les logos et les photos des personnes restent toujours sur le stockage par défaut de B1.
:::

## Passage de niveau

Si vous suivez le **niveau scolaire** des enfants et des étudiants, B1 peut faire passer automatiquement tout le monde au niveau supérieur à une date de votre choix (par exemple, le 1er août), au lieu de vous obliger à modifier chaque fiche à la main.

1. Sur la page Paramètres, cliquez sur **Passage de niveau** dans la liste de gauche, puis cliquez sur **Modifier** dans la section **Passage de niveau**.
2. Activez l'interrupteur (il affiche **Activé**) et choisissez le **Mois** et le **Jour** de passage de niveau chaque année. À cette date, toute personne ayant un niveau passe au niveau supérieur, et les élèves de terminale deviennent **Diplômés**.
3. Enregistrez vos modifications.

Pour arrêter le passage automatique de niveau, désactivez l'interrupteur pour qu'il affiche **Désactivé**, puis enregistrez. La date de passage est supprimée et les niveaux ne changeront plus d'eux-mêmes.

## Inscription des bénévoles {#volunteer-signup}

Par défaut, les membres qui consultent les [inscriptions de bénévoles](../../b1-church/serving/volunteer-signup.md) voient chaque semaine à venir comportant des postes ouverts. Si cette liste devient longue, vous pouvez n'afficher que la semaine suivante de chaque type de plan.

1. Sur la page Paramètres, cliquez sur **Inscription des bénévoles** dans la liste de gauche, puis cliquez sur **Modifier** dans la section **Inscription des bénévoles**.
2. Activez **Afficher uniquement la semaine suivante de chaque type de plan**.
3. Enregistrez vos modifications.

Avec cette option activée, chaque type de plan n'affiche que son prochain plan à venir. La semaine suivante apparaît une fois que cette date est passée. La ligne **Semaines affichées** de la section indique **Uniquement la semaine suivante de chaque type de plan** ou **Toutes les semaines à venir**.

## Confidentialité des dons {#giving-privacy}

Les personnes ayant accès aux dons voient normalement les totaux de dons d'une personne sur sa [fiche personne](../people/adding-people.md#editing-details). Si vous préférez ne pas afficher les montants à chaque ouverture d'une fiche, vous pouvez les masquer jusqu'à ce que quelqu'un en fasse la demande.

1. Sur la page Paramètres, cliquez sur **Confidentialité des dons** dans la liste de gauche, puis cliquez sur **Modifier** dans la section **Confidentialité des dons**.
2. Activez **Masquer les dons sur les fiches personnes jusqu'au clic**.
3. Enregistrez vos modifications.

Avec cette option activée, la carte des dons sur une fiche personne indique « Les dons sont masqués sur les fiches personnes ». Cliquez sur **Afficher les dons** pour charger et afficher les dons de cette personne. Ils sont de nouveau masqués lorsque vous ouvrez une autre fiche. La visibilité des dons ne change pas : seules les personnes ayant accès aux dons voient la carte.

## Importation et exportation

Le lien **Importer/Exporter** sous le nom de votre église, sur la page Paramètres, ouvre un outil dédié dans une nouvelle fenêtre du navigateur. Utilisez-le pour :

- Importer des données de membres depuis un autre système de gestion d'église.
- Exporter vos données ChurchApps pour une sauvegarde ou une migration.

C'est particulièrement utile lorsque vous configurez votre église pour la première fois et devez transférer les enregistrements existants dans ChurchApps.

:::warning
Lors d'une importation de données, sauvegardez toujours d'abord vos enregistrements existants. Les importations ajoutent des données à votre système et peuvent créer des doublons si elles sont exécutées plusieurs fois.
:::
