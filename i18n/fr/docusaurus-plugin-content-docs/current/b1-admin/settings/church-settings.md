---
title: "Paramètres de l'église"
---

# Paramètres de l'église

<div class="article-intro">

La page Paramètres de l'église vous permet de configurer les renseignements de base de votre église, ses coordonnées et son image de marque. Ces renseignements sont utilisés par tous les outils ChurchApps, y compris votre site web B1.church et l'application mobile B1.

</div>

## Vidéo de formation

<YouTube id="634zSbzDkYA" title="Configurer les renseignements et l'image de marque de l'église dans B1" next="Rôles, autorisations et invitation de votre équipe dans B1" nextUrl="/docs/b1-admin/settings/roles-permissions" />

<div class="prereqs">
<h4>Avant de commencer</h4>

- Vous avez besoin de l'autorisation « Modifier les paramètres de l'église ». Voir [Rôles et autorisations](./roles-permissions.md) si vous n'y avez pas accès.
- Ayez à portée de main l'adresse, les coordonnées et le logo de votre église

</div>

## Modifier les renseignements de votre église

1. Dans B1 Admin, ouvrez le [menu de navigation rapide](../introduction.md#getting-around-with-the-jump-menu) (la barre de recherche en haut à gauche), développez **Paramètres**, puis cliquez sur **Paramètres**.
2. Dans la section **Renseignements sur l'église** (en haut de la page), cliquez sur **Modifier**.
3. Mettez à jour l'un des champs suivants :
   - **Nom de l'église** -- Le nom affiché dans tous les produits ChurchApps.
   - **Adresse** -- L'adresse physique de votre église.
   - **Coordonnées** -- Numéro de téléphone, courriel et autres coordonnées.
   - **Fuseau horaire** -- Le fuseau horaire de votre église. Voir [Fuseau horaire](#time-zone) ci-dessous.
4. Cliquez sur **Enregistrer** pour appliquer vos modifications.

## Configurer votre sous-domaine

Votre église reçoit gratuitement un sous-domaine à l'adresse **votreéglise.1.church**. C'est l'adresse web où les membres et les visiteurs peuvent accéder à la présence en ligne de votre église.

1. Sur la page Paramètres, cliquez sur **Modifier** dans la section **Renseignements sur l'église** et repérez le champ **Sous-domaine**.
2. Saisissez le sous-domaine de votre choix (par exemple « gracechurch » pour gracechurch.1.church).
3. Enregistrez vos modifications.

:::info
Votre sous-domaine doit être unique parmi toutes les églises ChurchApps. Si le nom souhaité est déjà pris, essayez d'ajouter votre ville ou votre province/État (par exemple « gracechurch-dallas »).
:::

Si vous voulez que les visiteurs accèdent à votre site à votre propre domaine (par exemple **`www.gracechurch.org`**), consultez [Domaine personnalisé](./custom-domain.md).

## Configurer l'image de marque

Personnalisez la façon dont votre église apparaît dans tous les outils ChurchApps :

1. Téléversez le **logo de votre église** en cliquant sur la zone du logo et en sélectionnant un fichier image.
2. Ajoutez les autres **images de l'église** utilisées sur votre site web et dans l'[application mobile](./mobile-app.md).

:::tip
Pour de meilleurs résultats, utilisez un logo au format PNG avec un fond transparent. Il s'affichera bien sur les fonds clairs comme sur les fonds sombres.
:::

## Premier jour de la semaine

Choisissez le jour où commencent vos calendriers. La liste déroulante **Premier jour de la semaine** de la section Renseignements sur l'église est réglée par défaut sur **dimanche**, mais peut être réglée sur n'importe quel jour. Une fois modifié, ce réglage est respecté dans les grilles de calendrier de B1 Admin et du portail des membres B1.church -- les calendriers de groupe, les calendriers organisés et l'éditeur d'événements affichent tous les semaines à partir du jour que vous choisissez.

## Fuseau horaire {#time-zone}

La liste déroulante **Fuseau horaire** de la section **Renseignements sur l'église** définit le fuseau horaire de votre église (par exemple *America/Chicago*). Choisissez **Aucun** pour la laisser vide. Une fois enregistré, le fuseau apparaît dans le résumé des renseignements de l'église.

B1 utilise ce fuseau horaire pour les heures communes à toute l'église, comme les rappels d'événements et les horaires des téléviseurs [FreePlay](../../freeplay/scheduled-mode/scheduling-the-calendar.md). Les [calendriers de pointage](../attendance/setup.md#setting-a-check-in-schedule) sont mesurés d'abord dans le fuseau horaire du [campus](./campuses.md) du service, et ne recourent au fuseau horaire de l'église que lorsque ce campus n'en a pas. Si vos campus sont tous dans un même fuseau horaire, réglez-le à la fois sur l'église et sur chaque campus.

## Région (format des dates et des numéros de téléphone)

Le paramètre **Région** détermine la façon dont les dates et les heures sont écrites dans B1. Par défaut, les dates utilisent le format américain (par exemple « 28 sept. 2026 » et « 9/28/2026 »). Les églises situées hors des États-Unis peuvent passer à leur propre format -- par exemple, choisir français (Canada) affiche plutôt « 28 sept. 2026 » et « 2026-09-28 ».

1. Sur la page Paramètres, cliquez sur **Région** dans la liste de gauche, puis cliquez sur **Modifier** dans la section **Région**.
2. Choisissez votre région dans la liste déroulante **Région**. Chaque option affiche un exemple de date pour que vous voyiez exactement à quoi ressembleront les dates.
3. Cliquez sur **Enregistrer**.

La section Région affiche alors la région choisie, un exemple du **format de date** et votre format de **numéros de téléphone**.

### Format des numéros de téléphone

La même section Région comporte un paramètre **Numéros de téléphone** qui contrôle la façon dont les numéros sont saisis sur la fiche d'une personne :

- **International (avec indicatif du pays)** -- la valeur par défaut. Les champs téléphone affichent un sélecteur de drapeau de pays et enregistrent les numéros avec l'indicatif (par exemple +1 918 555 1234).
- **Local (tel que saisi)** -- les champs téléphone deviennent de simples zones de texte et enregistrent les numéros exactement comme vous les saisissez, sans ajouter d'indicatif (par exemple 0701 234 5678). Choisissez cette option si votre église écrit les numéros dans un format local et ne veut pas que B1 ajoute un indicatif.

Lorsque **Local** est sélectionné, la section Région affiche aussi « Numéros de téléphone locaux » à côté de votre région.

:::tip
L'envoi de textos fonctionne mieux lorsque les numéros incluent l'indicatif du pays. Si vous envoyez des textos depuis B1, conservez le format **International**, ou assurez-vous que les numéros saisis en mode Local incluent l'indicatif du pays.
:::

Votre région s'applique aux dates et aux heures dans l'ensemble de B1 Admin, sur votre site web B1.church et dans le portail des membres, y compris les sermons, les articles de blogue, les calendriers de groupe et les plans de service. Ainsi, les membres voient les dates dans le même format que votre personnel.

## Messages texte {#texting}

Connectez un fournisseur de messages texte pour envoyer des SMS à une personne ou à un groupe entier depuis B1 Admin. Les textos sont envoyés par votre propre compte auprès du fournisseur ; ses tarifs et ses limites s'appliquent donc.

1. Sur la page Paramètres, cliquez sur **Messages texte** dans la liste de gauche, puis cliquez sur **Modifier** dans la section **Messages texte**.
2. Choisissez un **fournisseur** :
   - **Clearstream** -- saisissez une **clé API**. Créez-la dans les paramètres de votre compte Clearstream, sous Clés API.
   - **Text In Church** -- saisissez une **clé API**. Demandez d'abord l'accès développeur à l'API au soutien de Text In Church, puis créez une clé dans la section Paramètres du compte > API développeur.
   - **Nalo Solutions** (Ghana) -- saisissez la clé d'authentification de votre compte Nalo Solutions comme **clé API**, ainsi qu'un **identifiant d'expéditeur** (jusqu'à 11 caractères) approuvé par Nalo pour vous.
   - **Twilio** -- utilisez le compte Twilio de votre église ; Twilio vous facture directement. Copiez le **SID du compte** et le **jeton d'authentification** depuis la [console Twilio](https://console.twilio.com), et saisissez un **numéro d'expédition** -- un numéro de téléphone Twilio enregistré pour A2P 10DLC, dans un format tel que `+15551234567`. Après l'enregistrement, collez l'URL du webhook entrant (voir ci-dessous) dans le webhook **Un message arrive** du numéro dans Twilio, afin que les réponses STOP soient aussi consignées dans B1.
3. Cliquez sur **Enregistrer**.

Pour arrêter l'envoi de textos, réglez **Fournisseur** sur **Aucun** et enregistrez. Cela supprime le fournisseur enregistré.

### Désabonner les personnes qui répondent STOP

Une fois un fournisseur enregistré, rouvrez la section Messages texte avec **Modifier**. Sous les paramètres du fournisseur, un champ en lecture seule **URL du webhook entrant (STOP)** affiche une adresse web propre à votre église. Cliquez dans le champ pour sélectionner l'adresse, copiez-la et collez-la dans le paramètre de webhook de réponse aux messages entrants de votre fournisseur de messages texte. Cela fonctionne avec tous les fournisseurs ci-dessus capables de transmettre les réponses entrantes à un webhook.

Ensuite, lorsqu'une personne répond **STOP** (ou STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT, OPTOUT ou REVOKE) à l'un de vos textos, B1 trouve toutes les personnes dont le numéro mobile correspond, les marque comme désabonnées et désactive leurs rappels par texto. Elles sont ensuite ignorées par les textos de groupe. Les autres réponses sont ignorées.

:::info
Cela utilise le même paramètre de désabonnement que **Me masquer de l'annuaire des membres** ; les personnes qui répondent STOP apparaissent donc aussi comme **Masqué de l'annuaire** sur leur profil. Le champ n'apparaît que lorsque le fournisseur enregistré est sélectionné -- si vous changez le fournisseur dans la liste déroulante, enregistrez d'abord pour revoir l'URL.
:::

Une fois un fournisseur connecté, le personnel autorisé à envoyer des textos voit un bouton **Texto** (**Envoyer un texto à ce groupe**) sur la page d'un groupe, et un bouton **Envoyer un texto** sur la page d'une personne ayant un téléphone mobile. Saisissez votre message et cliquez sur **Envoyer**. La boîte de dialogue compte les caractères et les segments SMS. Pour un groupe, elle indique combien de membres recevront le texto avant l'envoi :

- Les membres sans téléphone mobile au dossier sont ignorés.
- Les membres qui ont choisi **Me masquer de l'annuaire des membres** sont comptés comme désabonnés et ignorés.
- Les membres d'une même famille qui partagent un numéro mobile ne reçoivent le texto qu'une seule fois.

### Personnaliser les textos avec des champs de fusion {#personalizing-texts-with-merge-fields}

Sous la zone de message, la boîte de dialogue Texto affiche des pastilles de substitution : **Prénom**, **Nom**, **Nom d'affichage** et **Nom de l'église**. Cliquez sur une pastille pour insérer son espace réservé (`{{firstName}}`, `{{lastName}}`, `{{displayName}}` ou `{{churchName}}`) à l'emplacement du curseur. Lors de l'envoi, chaque espace réservé est remplacé par les renseignements du destinataire ; ainsi, un texto de groupe comme `Bonjour {{firstName}}, à dimanche !` atteint chaque membre avec son propre prénom. Les espaces réservés fonctionnent aussi bien pour les textos de groupe que pour les textos à une seule personne. Les textos destinés à un groupe proposent aussi une pastille **Nom du groupe** (`{{groupName}}`), remplacée par le nom du groupe.

Pour réutiliser un message, enregistrez-le comme [modèle de texto](./email-templates.md#text-templates) (un modèle de courriel dans la catégorie **Texte**) et choisissez-le dans **Charger un modèle (facultatif)** en haut de la fenêtre Texto.

:::info
La limite de 1 600 caractères s'applique au message tel que vous le saisissez. Une fois les espaces réservés remplacés, tout texte dépassant 1 600 caractères est tronqué à cette longueur.
:::

Des textos peuvent aussi être envoyés automatiquement depuis une étape de [flux de travail](../serving/workflows.md#sending-a-text) avec l'action **Envoyer un texto**, qui utilise le même fournisseur et les mêmes espaces réservés.

## Stockage des fichiers

Par défaut, les fichiers que vous téléversez sur votre site web (via [Fichiers](../website/files.md)) et dans les autres zones de contenu utilisent le stockage hébergé gratuit de B1, jusqu'à 100 Mo. Si vous avez besoin de plus d'espace, vous pouvez plutôt connecter votre propre stockage infonuagique -- les nouveaux téléversements vont alors directement dans votre compte, sans limite de la plateforme.

1. Sur la page Paramètres, cliquez sur **Stockage des fichiers** dans la liste de gauche, puis cliquez sur **Modifier** dans la section **Stockage des fichiers**.
2. Choisissez un fournisseur : **Google Drive**, **Dropbox**, **OneDrive** ou un **compartiment compatible S3** (AWS S3, Cloudflare R2, Backblaze B2, etc.).
3. Pour Google Drive, Dropbox ou OneDrive, cliquez sur **Connecter** et connectez-vous pour autoriser l'accès. Pour un compartiment compatible S3, saisissez votre clé d'accès, votre clé secrète, le nom du compartiment et la base de l'URL publique.
4. Cliquez sur **Enregistrer**.

:::info
Cela ne concerne que les nouveaux téléversements dans les Fichiers de votre site web et les zones de contenu similaires. Les images de galerie, les vignettes, les logos et les photos de personnes restent toujours sur le stockage par défaut de B1.
:::

## Promotion des niveaux scolaires

Si vous suivez le **niveau scolaire** des enfants et des étudiants, B1 peut faire passer automatiquement tout le monde au niveau supérieur à une date de votre choix (par exemple le 1er août), plutôt que de vous obliger à modifier chaque profil à la main.

1. Sur la page Paramètres, cliquez sur **Promotion des niveaux** dans la liste de gauche, puis cliquez sur **Modifier** dans la section **Promotion des niveaux**.
2. Activez l'interrupteur (il affiche **Activée**) et choisissez le **mois** et le **jour** où les niveaux sont promus chaque année. À cette date, chaque personne ayant un niveau passe au niveau suivant, et les élèves de 12e année deviennent **Diplômés**.
3. Enregistrez vos modifications.

Pour arrêter la promotion automatique, désactivez l'interrupteur de sorte qu'il affiche **Désactivée**, puis enregistrez. La date de promotion est alors supprimée, et les niveaux ne changeront plus d'eux-mêmes.

## Inscription des bénévoles {#volunteer-signup}

Par défaut, les membres qui consultent les [inscriptions des bénévoles](../../b1-church/serving/volunteer-signup.md) voient chaque semaine à venir comportant des postes ouverts. Si cette liste devient longue, vous pouvez plutôt afficher seulement la semaine suivante de chaque type de plan.

1. Sur la page Paramètres, cliquez sur **Inscription des bénévoles** dans la liste de gauche, puis cliquez sur **Modifier** dans la section **Inscription des bénévoles**.
2. Activez **Afficher seulement la semaine suivante de chaque type de plan**.
3. Enregistrez vos modifications.

Avec cette option activée, chaque type de plan n'affiche que son prochain plan à venir. La semaine suivante apparaît une fois cette date passée. La ligne **Semaines affichées** de la section indique **Seulement la semaine suivante de chaque type de plan** ou **Toutes les semaines à venir**.

## Confidentialité des dons {#giving-privacy}

Les personnes ayant accès aux dons voient normalement les totaux de dons d'une personne sur sa [fiche](../people/adding-people.md#editing-details). Si vous préférez ne pas afficher les montants à chaque ouverture d'une fiche, vous pouvez les masquer jusqu'à ce que quelqu'un en fasse la demande.

1. Sur la page Paramètres, cliquez sur **Confidentialité des dons** dans la liste de gauche, puis cliquez sur **Modifier** dans la section **Confidentialité des dons**.
2. Activez **Masquer les dons sur les fiches jusqu'à ce qu'on clique**.
3. Enregistrez vos modifications.

Avec cette option activée, la carte des dons sur une fiche indique « Les dons sont masqués sur les fiches. » Cliquez sur **Afficher les dons** pour charger et afficher les dons de cette personne. Ils se masquent à nouveau lorsque vous ouvrez une autre personne. Qui peut voir les dons ne change pas : seules les personnes ayant accès aux dons voient cette carte.

## Importation et exportation

Le lien **Importer/Exporter** sous le nom de votre église, sur la page Paramètres, ouvre un outil dédié dans une nouvelle fenêtre du navigateur. Utilisez-le pour :

- Importer les données des membres depuis un autre système de gestion d'église.
- Exporter vos données ChurchApps à des fins de sauvegarde ou de migration.

C'est particulièrement utile lorsque vous configurez votre église pour la première fois et devez transférer les dossiers existants dans ChurchApps.

:::warning
Lors d'une importation, sauvegardez toujours d'abord vos dossiers existants. Les opérations d'importation ajoutent des données à votre système et peuvent créer des doublons si elles sont exécutées plusieurs fois.
:::
