---
title: "Paramètres de l'église"
---

# Paramètres de l'église

<div class="article-intro">

La page Paramètres de l'église vous permet de configurer les renseignements de base de votre église, ses coordonnées et son image de marque. Ces détails sont utilisés dans tous les outils ChurchApps, y compris votre site web B1.church et l'application mobile B1.

</div>

## Vidéo de formation

<YouTube id="634zSbzDkYA" title="Configurer les renseignements et l'image de marque de l'église dans B1" next="Rôles, autorisations et invitation de votre équipe dans B1" nextUrl="/docs/b1-admin/settings/roles-permissions" />

<div class="prereqs">
<h4>Avant de commencer</h4>

- Vous devez avoir l'autorisation « Modifier les paramètres de l'église ». Consultez [Rôles et autorisations](./roles-permissions.md) si vous n'y avez pas accès.
- Ayez à portée de main l'adresse, les coordonnées et le logo de votre église

</div>

## Modifier les renseignements de votre église

1. Dans B1 Admin, ouvrez le [menu Accès rapide](../introduction.md#getting-around-with-the-jump-menu) (la barre de recherche en haut à gauche), développez **Paramètres**, et cliquez sur **Paramètres**.
2. Dans la section **Renseignements de l'église** (en haut de la page), cliquez sur **Modifier**.
3. Mettez à jour l'un des champs suivants :
   - **Nom de l'église** -- Le nom affiché dans tous les produits ChurchApps.
   - **Adresse** -- L'adresse physique de votre église.
   - **Coordonnées** -- Numéro de téléphone, e-mail et autres coordonnées.
   - **Fuseau horaire** -- Le fuseau horaire de votre église. Consultez [Fuseau horaire](#time-zone) ci-dessous.
4. Cliquez sur **Enregistrer** pour appliquer vos modifications.

## Configurer votre sous-domaine

Votre église reçoit un sous-domaine gratuit à l'adresse **votreeglise.1.church**. C'est l'adresse web où les membres et les visiteurs peuvent accéder à la présence en ligne de votre église.

1. Sur la page Paramètres, cliquez sur **Modifier** dans la section **Renseignements de l'église** et repérez le champ **Sous-domaine**.
2. Saisissez le sous-domaine de votre choix (par exemple « egliseGrace » pour egliseGrace.1.church).
3. Enregistrez vos modifications.

:::info
Votre sous-domaine doit être unique parmi toutes les églises ChurchApps. Si le nom que vous souhaitez est déjà pris, essayez d'ajouter votre ville ou votre province (par exemple « egliseGrace-montreal »).
:::

Si vous voulez que les visiteurs accèdent à votre site par votre propre domaine (par exemple **`www.egliseGrace.org`**), consultez [Domaine personnalisé](./custom-domain.md).

## Configurer l'image de marque

Personnalisez l'apparence de votre église dans tous les outils ChurchApps :

1. Téléversez le **logo de votre église** en cliquant sur la zone du logo et en sélectionnant un fichier image.
2. Ajoutez toutes les **images de l'église** supplémentaires utilisées sur votre site web et dans l'[application mobile](./mobile-app.md).

:::tip
Pour de meilleurs résultats, utilisez un logo au format PNG avec un arrière-plan transparent. Cela garantit qu'il s'affiche bien sur les arrière-plans clairs comme sombres.
:::

## Premier jour de la semaine

Choisissez le jour où commencent vos calendriers. La liste déroulante **Premier jour de la semaine** de la section Renseignements de l'église est réglée par défaut sur **dimanche**, mais peut être définie sur n'importe quel jour. Une fois modifié, ce réglage est respecté dans les grilles de calendrier de B1 Admin et du portail membre B1.church -- les calendriers de groupe, les calendriers organisés et l'éditeur d'événements affichent tous les semaines à partir du jour que vous choisissez.

## Fuseau horaire {#time-zone}

La liste déroulante **Fuseau horaire** de la section **Renseignements de l'église** définit le fuseau horaire de votre église (par exemple *America/Chicago*). Choisissez **Aucun** pour la laisser vide. Une fois enregistré, le fuseau apparaît dans le résumé des renseignements de l'église.

B1 utilise ce fuseau horaire pour les heures de l'église, comme les rappels d'événements et les horaires de vos téléviseurs [FreePlay](../../freeplay/scheduled-mode/scheduling-the-calendar.md). Les [calendriers d'enregistrement](../attendance/setup.md#setting-a-check-in-schedule) sont mesurés dans le fuseau horaire du [campus](./campuses.md) du service d'abord, et n'utilisent le fuseau horaire de l'église que lorsque ce campus n'en a pas. Si tous vos campus se trouvent dans un même fuseau horaire, définissez-le à la fois pour l'église et pour chaque campus.

## Région (format des dates et des numéros de téléphone)

Le paramètre **Région** contrôle la façon dont les dates et les heures sont écrites dans B1. Par défaut, les dates utilisent le format américain (par exemple « Sep 28, 2026 » et « 9/28/2026 »). Les églises situées hors des États-Unis peuvent passer à leur propre format -- par exemple, en choisissant English (United Kingdom), on verra « 28 Sept 2026 » et « 28/09/2026 » à la place.

1. Sur la page Paramètres, cliquez sur **Région** dans la liste à gauche, puis sur **Modifier** dans la section **Région**.
2. Choisissez votre région dans la liste déroulante **Région**. Chaque option affiche un exemple de date pour que vous puissiez voir exactement comment les dates s'afficheront.
3. Cliquez sur **Enregistrer**.

La section Région affiche ensuite la région choisie, un exemple du **Format de date** et votre format de **Numéros de téléphone**.

### Format des numéros de téléphone

La même section Région comporte un paramètre **Numéros de téléphone** qui contrôle la façon dont les numéros de téléphone sont saisis dans la fiche d'une personne :

- **International (avec indicatif de pays)** -- la valeur par défaut. Les champs de téléphone affichent un sélecteur de drapeau de pays et enregistrent les numéros avec l'indicatif (par exemple +1 918 555 1234).
- **Local (tel que saisi)** -- les champs de téléphone deviennent de simples zones de texte et enregistrent les numéros exactement comme vous les tapez, sans ajouter d'indicatif (par exemple 0701 234 5678). Choisissez cette option si votre église écrit les numéros dans un format local et ne souhaite pas que B1 ajoute un indicatif de pays.

Lorsque **Local** est sélectionné, la section Région affiche aussi « Numéros de téléphone locaux » à côté de votre région.

:::tip
La messagerie texte fonctionne mieux lorsque les numéros incluent l'indicatif de pays. Si vous envoyez des textos depuis B1, conservez le format **International**, ou assurez-vous que les numéros saisis en mode Local incluent l'indicatif de pays.
:::

Votre région s'applique aux dates et aux heures dans B1 Admin et sur votre site web B1.church et le portail membre, y compris les sermons, les billets de blog, les calendriers de groupe et les plans de service, afin que les membres voient les dates dans le même format que votre personnel.

## Messagerie texte {#texting}

Connectez un fournisseur de messagerie texte pour envoyer des SMS à une personne ou à un groupe entier depuis B1 Admin. Les textos sont envoyés par l'intermédiaire de votre propre compte chez le fournisseur ; ses tarifs et ses limites s'appliquent donc.

1. Sur la page Paramètres, cliquez sur **Messagerie texte** dans la liste à gauche, puis sur **Modifier** dans la section **Messagerie texte**.
2. Choisissez un **Fournisseur** :
   - **Clearstream** -- saisissez une **clé API**. Créez-en une dans les paramètres de votre compte Clearstream, sous Clés API.
   - **Text In Church** -- saisissez une **clé API**. Demandez d'abord à l'équipe de soutien de Text In Church l'accès API développeur, puis créez une clé dans la section Paramètres du compte > API développeur.
   - **Nalo Solutions** (Ghana) -- saisissez la clé d'authentification de votre compte Nalo Solutions comme **clé API**, ainsi qu'un **identifiant d'expéditeur** (jusqu'à 11 caractères) que Nalo a approuvé pour vous.
   - **Twilio** -- utilisez le compte Twilio de votre église ; Twilio vous facture directement. Copiez le **SID du compte** et le **jeton d'authentification** depuis la [Console Twilio](https://console.twilio.com), puis saisissez un **numéro d'envoi** -- un numéro de téléphone Twilio enregistré pour A2P 10DLC, dans un format comme `+15551234567`. Après l'enregistrement, collez l'URL du webhook entrant (voir ci-dessous) dans le champ **Un message arrive** du numéro dans Twilio afin que les réponses STOP soient aussi consignées dans B1.
3. Cliquez sur **Enregistrer**.

Pour cesser d'envoyer des textos, réglez **Fournisseur** sur **Aucun** et enregistrez. Cela supprime le fournisseur enregistré.

### Désabonner les personnes qui répondent STOP

Une fois un fournisseur enregistré, rouvrez la section Messagerie texte avec **Modifier**. Sous les paramètres du fournisseur, un champ **URL du webhook de réponse (STOP)** en lecture seule affiche une adresse web propre à votre église. Cliquez sur le champ pour sélectionner l'adresse, copiez-la et collez-la dans le paramètre de webhook de messages entrants (réponses) de votre fournisseur de messagerie texte. Cela fonctionne avec tous les fournisseurs ci-dessus qui peuvent transmettre les réponses entrantes à un webhook.

Ensuite, lorsqu'une personne répond **STOP** (ou STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT, OPTOUT ou REVOKE) à l'un de vos textos, B1 trouve toutes les personnes dont le numéro mobile correspond, les marque comme désabonnées et désactive leurs rappels textuels. Elles sont alors ignorées par les textos de groupe. Les autres réponses sont ignorées.

:::info
Cela utilise le même paramètre de désabonnement que **Me masquer de l'annuaire des membres** ; les personnes qui répondent STOP apparaissent donc aussi comme **Masqué de l'annuaire** sur leur profil. Le champ n'apparaît que lorsque le fournisseur enregistré est sélectionné -- si vous changez la liste déroulante pour un autre fournisseur, enregistrez d'abord pour revoir l'URL.
:::

Une fois un fournisseur connecté, le personnel autorisé à envoyer des textos voit un bouton **Texto** sur la page d'un groupe (**Envoyer un texto à ce groupe**) et sur celle d'une personne ayant un téléphone mobile (**Envoyer un message texte**). Saisissez votre message et cliquez sur **Envoyer**. La boîte de dialogue compte les caractères et les segments SMS. Pour un groupe, elle indique combien de membres recevront le texto avant l'envoi :

- Les membres sans téléphone mobile enregistré sont ignorés.
- Les membres qui ont choisi **Me masquer de l'annuaire des membres** sont comptés comme désabonnés et ignorés.
- Les membres d'une même famille qui partagent un numéro mobile ne reçoivent le texto qu'une seule fois.

### Personnaliser les textos avec des champs de fusion {#personalizing-texts-with-merge-fields}

Sous la zone de message, la boîte de dialogue Texto affiche des puces de champs : **Prénom**, **Nom**, **Nom d'affichage** et **Nom de l'église**. Cliquez sur une puce pour insérer son champ (`{{firstName}}`, `{{lastName}}`, `{{displayName}}` ou `{{churchName}}`) à l'emplacement de votre curseur. Lorsque le texto est envoyé, chaque champ est remplacé par les renseignements du destinataire ; ainsi, un texto de groupe comme `Bonjour {{firstName}}, à dimanche !` atteint chaque membre avec son propre prénom. Les champs fonctionnent aussi bien pour les textos de groupe que pour les textos adressés à une seule personne. Les textos destinés à un groupe proposent aussi une puce **Nom du groupe** (`{{groupName}}`), qui est remplacée par le nom du groupe.

Pour réutiliser un message, enregistrez-le comme [modèle de texto](./email-templates.md#text-templates) (un modèle d'e-mail avec la catégorie **Texte**) et choisissez-le dans **Charger un modèle (facultatif)** en haut de la fenêtre Texto.

:::info
La limite de 1 600 caractères s'applique au message tel que vous le saisissez. Une fois les champs remplis, tout texte dépassant 1 600 caractères est tronqué à cette longueur.
:::

Les textos peuvent aussi être envoyés automatiquement depuis une étape de [flux de travail](../serving/workflows.md#sending-a-text) avec l'action **Envoyer un texto**, qui utilise le même fournisseur et les mêmes champs.

## Stockage de fichiers

Par défaut, les fichiers que vous téléversez sur votre site web (par l'intermédiaire de [Fichiers](../website/files.md)) et dans les autres zones de contenu utilisent le stockage hébergé gratuit de B1, jusqu'à 100 Mo. Si vous avez besoin de plus d'espace, vous pouvez connecter votre propre stockage en nuage à la place -- les nouveaux téléversements vont alors directement dans votre compte, sans limite de la plateforme.

1. Sur la page Paramètres, cliquez sur **Stockage de fichiers** dans la liste à gauche, puis sur **Modifier** dans la section **Stockage de fichiers**.
2. Choisissez un fournisseur : **Google Drive**, **Dropbox**, **OneDrive** ou un **compartiment compatible S3** (AWS S3, Cloudflare R2, Backblaze B2, etc.).
3. Pour Google Drive, Dropbox ou OneDrive, cliquez sur **Connecter** et connectez-vous pour autoriser l'accès. Pour un compartiment compatible S3, saisissez votre clé d'accès, votre clé secrète, le nom du compartiment et l'URL publique de base.
4. Cliquez sur **Enregistrer**.

:::info
Cela n'affecte que les nouveaux téléversements dans les Fichiers de votre site web et dans les zones de contenu similaires. Les images de galerie, les vignettes, les logos et les photos des personnes restent toujours sur le stockage par défaut de B1.
:::

## Promotion de niveau scolaire

Si vous suivez le **niveau scolaire** des enfants et des étudiants, B1 peut faire passer automatiquement tout le monde au niveau supérieur à une date de votre choix (par exemple le 1er août), plutôt que de vous obliger à modifier chaque profil à la main.

1. Sur la page Paramètres, cliquez sur **Promotion de niveau** dans la liste à gauche, puis sur **Modifier** dans la section **Promotion de niveau**.
2. Activez l'interrupteur (il affiche **Activée**) et choisissez le **mois** et le **jour** où les niveaux sont promus chaque année. À cette date, chaque personne ayant un niveau passe au niveau suivant, et les élèves de 12e année deviennent **Diplômés**.
3. Enregistrez vos modifications.

Pour arrêter la promotion automatique, désactivez l'interrupteur pour qu'il affiche **Désactivée** et enregistrez. La date de promotion est supprimée et les niveaux ne changeront plus d'eux-mêmes.

## Inscription des bénévoles {#volunteer-signup}

Par défaut, les membres qui consultent les [inscriptions des bénévoles](../../b1-church/serving/volunteer-signup.md) voient chaque semaine à venir qui comporte des postes ouverts. Si cette liste devient longue, vous pouvez plutôt n'afficher que la semaine suivante de chaque type de plan.

1. Sur la page Paramètres, cliquez sur **Inscription des bénévoles** dans la liste à gauche, puis sur **Modifier** dans la section **Inscription des bénévoles**.
2. Activez **Afficher seulement la semaine suivante de chaque type de plan**.
3. Enregistrez vos modifications.

Avec cette option activée, chaque type de plan n'affiche que son prochain plan à venir. La semaine suivante apparaît une fois que cette date est passée. La ligne **Semaines affichées** de la section indique **Seulement la semaine suivante de chaque type de plan** ou **Toutes les semaines à venir**.

## Confidentialité des dons {#giving-privacy}

Les personnes qui ont accès aux dons voient normalement les totaux de dons d'une personne sur sa [fiche](../people/adding-people.md#editing-details). Si vous préférez ne pas afficher les montants à l'écran à chaque ouverture d'une fiche, vous pouvez les masquer jusqu'à ce que quelqu'un le demande.

1. Sur la page Paramètres, cliquez sur **Confidentialité des dons** dans la liste à gauche, puis sur **Modifier** dans la section **Confidentialité des dons**.
2. Activez **Masquer les dons sur les fiches des personnes jusqu'à ce qu'on clique**.
3. Enregistrez vos modifications.

Avec cette option activée, la carte des dons sur une fiche de personne affiche « Les dons sont masqués sur les fiches des personnes. » Cliquez sur **Afficher les dons** pour charger et afficher les dons de cette personne. Ils se masquent à nouveau lorsque vous ouvrez une autre personne. Cela ne change pas qui peut voir les dons : seules les personnes ayant accès aux dons voient la carte.

## Importation et exportation

Le lien **Importer/Exporter** sous le nom de votre église, sur la page Paramètres, ouvre un outil dédié dans une nouvelle fenêtre du navigateur. Utilisez-le pour :

- Importer les données des membres depuis un autre système de gestion d'église.
- Exporter vos données ChurchApps à des fins de sauvegarde ou de migration.

Cela est particulièrement utile lorsque vous configurez votre église pour la première fois et devez transférer les fiches existantes vers ChurchApps.

:::warning
Lorsque vous importez des données, sauvegardez toujours vos fiches existantes au préalable. Les opérations d'importation ajoutent des données à votre système et peuvent créer des doublons si elles sont exécutées plusieurs fois.
:::
