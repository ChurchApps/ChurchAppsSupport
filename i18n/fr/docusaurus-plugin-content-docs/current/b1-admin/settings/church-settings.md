---
title: "Paramètres de l'église"
---

# Paramètres de l'église

<div class="article-intro">

La page Paramètres de l'église vous permet de configurer les informations de base de votre église, ses coordonnées et son image de marque. Ces données sont utilisées dans tous les outils ChurchApps, y compris votre site web B1.church et l'application B1 Mobile.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Vous devez disposer de l'autorisation « Edit Church Settings ». Consultez [Rôles et autorisations](./roles-permissions.md) si vous n'y avez pas accès.
- Ayez à portée de main l'adresse, les coordonnées et le logo de votre église

</div>

## Modifier les informations de votre église

1. Dans B1 Admin, ouvrez le [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (la barre de recherche en haut à gauche), développez **Settings**, puis cliquez sur **Settings**.
2. Dans la section **Church Information** (en haut de la page), cliquez sur **Edit**.
3. Mettez à jour l'un des champs suivants :
   - **Church Name** -- Le nom affiché dans tous les produits ChurchApps.
   - **Address** -- L'adresse physique de votre église.
   - **Contact Information** -- Numéro de téléphone, adresse e-mail et autres coordonnées.
   - **Time Zone** -- Le fuseau horaire de votre église. Voir [Fuseau horaire](#time-zone) ci-dessous.
4. Cliquez sur **Save** pour appliquer vos modifications.

## Configurer votre sous-domaine

Votre église reçoit gratuitement un sous-domaine à l'adresse **votreeglise.1.church**. C'est l'adresse web à laquelle les membres et les visiteurs peuvent accéder à la présence en ligne de votre église.

1. Sur la page Settings, cliquez sur **Edit** dans la section **Church Information** et repérez le champ **Subdomain**.
2. Saisissez le sous-domaine souhaité (par exemple « gracechurch » pour gracechurch.1.church).
3. Enregistrez vos modifications.

:::info
Votre sous-domaine doit être unique parmi toutes les églises ChurchApps. Si le nom souhaité est déjà pris, essayez d'ajouter le nom de votre ville ou de votre région (par exemple « gracechurch-dallas »).
:::

Si vous souhaitez que les visiteurs accèdent à votre site via votre propre nom de domaine (par exemple **`www.gracechurch.org`**), consultez [Domaine personnalisé](./custom-domain.md).

## Configurer l'image de marque

Personnalisez la façon dont votre église apparaît dans tous les outils ChurchApps :

1. Téléversez le **logo de votre église** en cliquant sur la zone du logo et en sélectionnant un fichier image.
2. Ajoutez les éventuelles **images de l'église** supplémentaires utilisées sur votre site web et dans l'[application mobile](./mobile-app.md).

:::tip
Pour un meilleur résultat, utilisez un logo au format PNG avec fond transparent. Il restera lisible sur les fonds clairs comme sur les fonds sombres.
:::

## Premier jour de la semaine

Choisissez le jour de début de vos calendriers. La liste déroulante **First Day of Week** de la section Church Info est réglée par défaut sur **Sunday**, mais elle peut être définie sur n'importe quel jour. Une fois modifiée, cette valeur est appliquée aux grilles de calendrier dans B1 Admin et dans le portail des membres B1.church : les calendriers de groupes, les calendriers personnalisés et l'éditeur d'événements affichent tous les semaines à partir du jour que vous avez choisi.

## Fuseau horaire

La liste déroulante **Time Zone** de la section **Church Information** définit le fuseau horaire de votre église (par exemple *America/Chicago*). Choisissez **None** pour la laisser vide. Une fois enregistré, le fuseau apparaît dans le résumé des informations de l'église.

B1 utilise ce fuseau horaire pour les horaires communs à toute l'église, comme les rappels d'événements et les programmes de vos téléviseurs [FreePlay](../../freeplay/scheduled-mode/scheduling-the-calendar.md). Les [horaires de pointage](../attendance/setup.md#setting-a-check-in-schedule) sont mesurés en priorité selon le fuseau horaire du [campus](./campuses.md) du service, et n'utilisent le fuseau horaire de l'église que si ce campus n'en a pas. Si vos campus sont tous dans un même fuseau horaire, définissez-le à la fois pour l'église et pour chaque campus.

## Région (format des dates et des numéros de téléphone)

Le paramètre **Region** détermine la manière dont les dates et les heures sont écrites dans l'ensemble de B1. Par défaut, les dates suivent le format américain (par exemple « Sep 28, 2026 » et « 9/28/2026 »). Les églises situées hors des États-Unis peuvent choisir leur propre format : par exemple, en sélectionnant English (United Kingdom), les dates s'affichent sous la forme « 28 Sept 2026 » et « 28/09/2026 ».

1. Sur la page Settings, cliquez sur **Region** dans la liste de gauche, puis cliquez sur **Edit** dans la section **Region**.
2. Choisissez votre région dans la liste déroulante **Region**. Chaque option affiche un exemple de date pour que vous puissiez voir exactement le rendu.
3. Cliquez sur **Save**.

La section Region affiche ensuite la région sélectionnée, un exemple du **Date format** et le format de vos **Phone numbers**.

### Format des numéros de téléphone

La même section Region comporte un paramètre **Phone numbers** qui détermine la façon dont les numéros de téléphone sont saisis dans la fiche d'une personne :

- **International (with country code)** -- la valeur par défaut. Les champs téléphone affichent un sélecteur de drapeau de pays et enregistrent les numéros avec l'indicatif du pays (par exemple +1 918 555 1234).
- **Local (as typed)** -- les champs téléphone deviennent de simples zones de texte et enregistrent les numéros exactement tels que vous les saisissez, sans ajouter d'indicatif de pays (par exemple 0701 234 5678). Choisissez cette option si votre église écrit les numéros dans un format local et ne souhaite pas que B1 ajoute un indicatif.

Lorsque **Local** est sélectionné, la section Region affiche également « Local phone numbers » à côté de votre région.

:::tip
L'envoi de SMS fonctionne mieux lorsque les numéros incluent l'indicatif du pays. Si vous envoyez des SMS depuis B1, conservez le format **International**, ou assurez-vous que les numéros saisis en mode Local incluent l'indicatif du pays.
:::

Votre région s'applique aux dates et heures dans B1 Admin, sur votre site B1.church et dans le portail des membres, y compris pour les sermons, les articles de blog, les calendriers de groupes et les plans de service. Les membres voient ainsi les dates dans le même format que votre personnel.

## SMS {#texting}

Connectez un fournisseur de SMS pour envoyer des messages texte à une personne ou à un groupe entier depuis B1 Admin. Les SMS sont envoyés via votre propre compte chez le fournisseur ; ses tarifs et ses limites s'appliquent donc.

1. Sur la page Settings, cliquez sur **Texting** dans la liste de gauche, puis cliquez sur **Edit** dans la section **Texting**.
2. Choisissez un **Provider** :
   - **Clearstream** -- saisissez une **API Key**. Créez-la dans les paramètres de votre compte Clearstream, sous API Keys.
   - **Text In Church** -- saisissez une **API Key**. Demandez d'abord un accès développeur à l'API auprès du support de Text In Church, puis créez une clé dans la section Developer API de vos paramètres de compte.
   - **Nalo Solutions** (Ghana) -- saisissez la clé d'authentification de votre compte Nalo Solutions comme **API Key**, ainsi qu'un **Sender ID** (jusqu'à 11 caractères) approuvé par Nalo pour votre église.
   - **Twilio** -- utilisez le compte Twilio de votre église ; Twilio vous facture directement. Copiez l'**Account SID** et le **Auth Token** depuis la [console Twilio](https://console.twilio.com), puis saisissez un **From Number** — un numéro de téléphone Twilio enregistré pour A2P 10DLC, au format `+15551234567`. Après l'enregistrement, collez l'URL du webhook entrant (voir ci-dessous) dans le champ **A message comes in** du numéro dans Twilio afin que les réponses STOP soient également enregistrées dans B1.
3. Cliquez sur **Save**.

Pour arrêter l'envoi de SMS, réglez **Provider** sur **None** et enregistrez. Cela supprime le fournisseur enregistré.

### Désabonner les personnes qui répondent STOP

Une fois un fournisseur enregistré, rouvrez la section Texting avec **Edit**. Sous les paramètres du fournisseur, un champ en lecture seule **Inbound (STOP) webhook URL** affiche une adresse web propre à votre église. Cliquez sur le champ pour sélectionner l'adresse, copiez-la et collez-la dans le paramètre de webhook des messages entrants (réponses) de votre fournisseur de SMS. Cela fonctionne avec tous les fournisseurs ci-dessus capables de transmettre les réponses reçues à un webhook.

Ensuite, lorsqu'une personne répond **STOP** (ou STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT, OPTOUT ou REVOKE) à l'un de vos SMS, B1 retrouve toutes les personnes dont le numéro de mobile correspond, les marque comme désabonnées et désactive leurs rappels par SMS. Elles sont alors ignorées lors des envois de SMS de groupe. Les autres réponses sont ignorées.

:::info
Ce mécanisme utilise le même paramètre de désabonnement que **Hide me from the member directory** : les personnes qui répondent STOP apparaissent donc aussi comme **Hidden from directory** sur leur profil. Ce champ n'apparaît que lorsque le fournisseur enregistré est sélectionné — si vous changez de fournisseur dans la liste, enregistrez d'abord pour revoir l'URL.
:::

Dès qu'un fournisseur est connecté, le personnel autorisé à envoyer des SMS voit un bouton **Text** sur la page d'un groupe (**Text this group**) et sur celle d'une personne ayant un téléphone mobile (**Send text message**). Saisissez votre message et cliquez sur **Send**. La boîte de dialogue compte les caractères et les segments SMS. Pour un groupe, elle indique combien de membres recevront le message avant l'envoi :

- Les membres sans téléphone mobile enregistré sont ignorés.
- Les membres ayant choisi **Hide me from the member directory** sont comptés comme désabonnés et ignorés.
- Les membres d'une même famille partageant un numéro de mobile ne reçoivent le message qu'une seule fois.

### Personnaliser les SMS avec des champs de fusion {#personalizing-texts-with-merge-fields}

Sous la zone de message, la boîte de dialogue Text affiche des puces d'espace réservé : **First Name**, **Last Name**, **Display Name** et **Church Name**. Cliquez sur une puce pour insérer son espace réservé (`{{firstName}}`, `{{lastName}}`, `{{displayName}}` ou `{{churchName}}`) à l'emplacement du curseur. Au moment de l'envoi, chaque espace réservé est remplacé par les informations du destinataire ; ainsi, un SMS de groupe tel que `Hi {{firstName}}, see you Sunday!` parvient à chaque membre avec son propre prénom. Les espaces réservés fonctionnent aussi bien pour les SMS de groupe que pour les SMS adressés à une seule personne.

:::info
La limite de 1 600 caractères s'applique au message tel que vous le saisissez. Une fois les espaces réservés remplacés, tout texte dépassant 1 600 caractères est tronqué à cette longueur.
:::

Des SMS peuvent aussi être envoyés automatiquement depuis une étape de [workflow](../serving/workflows.md#sending-a-text) grâce à l'action **Send Text**, qui utilise le même fournisseur et les mêmes espaces réservés.

## Stockage des fichiers

Par défaut, les fichiers que vous téléversez sur votre site web (via [Fichiers](../website/files.md)) et dans les autres zones de contenu utilisent le stockage hébergé gratuit de B1, jusqu'à 100 Mo. Si vous avez besoin de plus d'espace, vous pouvez connecter votre propre stockage cloud : les nouveaux fichiers sont alors envoyés directement sur votre compte, sans limite imposée par la plateforme.

1. Sur la page Settings, cliquez sur **File Storage** dans la liste de gauche, puis cliquez sur **Edit** dans la section **File Storage**.
2. Choisissez un fournisseur : **Google Drive**, **Dropbox**, **OneDrive** ou un **bucket compatible S3** (AWS S3, Cloudflare R2, Backblaze B2, etc.).
3. Pour Google Drive, Dropbox ou OneDrive, cliquez sur **Connect** et connectez-vous pour autoriser l'accès. Pour un bucket compatible S3, saisissez votre clé d'accès, votre clé secrète, le nom du bucket et l'URL publique de base.
4. Cliquez sur **Save**.

:::info
Cela ne concerne que les nouveaux fichiers téléversés dans vos Fichiers de site web et zones de contenu similaires. Les images de galerie, les miniatures, les logos et les photos des personnes restent toujours sur le stockage par défaut de B1.
:::

## Passage de niveau scolaire

Si vous suivez le **Grade** des enfants et des élèves, B1 peut faire passer automatiquement tout le monde au niveau supérieur à une date de votre choix (par exemple le 1er août), au lieu de vous obliger à modifier chaque fiche à la main.

1. Sur la page Settings, cliquez sur **Grade Promotion** dans la liste de gauche, puis cliquez sur **Edit** dans la section **Grade Promotion**.
2. Activez l'interrupteur (il affiche **Enabled**) et choisissez le **Month** et le **Day** auxquels les niveaux passent chaque année. À cette date, toute personne ayant un niveau passe au niveau supérieur, et les élèves de terminale deviennent **Graduated**.
3. Enregistrez vos modifications.

Pour arrêter le passage automatique, désactivez l'interrupteur (il affiche alors **Disabled**) et enregistrez. La date de passage est supprimée et les niveaux ne changeront plus d'eux-mêmes.

## Inscription des bénévoles {#volunteer-signup}

Par défaut, les membres qui consultent les [inscriptions de bénévoles](../../b1-church/serving/volunteer-signup.md) voient toutes les semaines à venir comportant des postes ouverts. Si cette liste devient longue, vous pouvez n'afficher que la semaine suivante pour chaque type de plan.

1. Sur la page Settings, cliquez sur **Volunteer Signup** dans la liste de gauche, puis cliquez sur **Edit** dans la section **Volunteer Signup**.
2. Activez **Show only the next week of each plan type**.
3. Enregistrez vos modifications.

Avec cette option activée, chaque type de plan n'affiche que son prochain plan à venir. La semaine suivante apparaît une fois cette date passée. La ligne **Weeks shown** de la section affiche **Only the next week of each plan type** ou **All upcoming weeks**.

## Confidentialité des dons {#giving-privacy}

Les personnes ayant accès aux dons voient normalement les totaux de dons d'une personne sur sa [fiche](../people/adding-people.md#editing-details). Si vous préférez ne pas afficher les montants à chaque ouverture d'une fiche, vous pouvez les masquer jusqu'à ce que quelqu'un en fasse la demande.

1. Sur la page Settings, cliquez sur **Giving privacy** dans la liste de gauche, puis cliquez sur **Edit** dans la section **Giving privacy**.
2. Activez **Hide giving on person records until clicked**.
3. Enregistrez vos modifications.

Avec cette option activée, la carte des dons sur une fiche affiche « Giving is hidden on person records ». Cliquez sur **Show giving** pour charger et afficher les dons de cette personne. Ils se masquent à nouveau lorsque vous ouvrez une autre fiche. Cette option ne modifie pas qui peut voir les dons : seules les personnes disposant de l'accès aux dons voient la carte.

## Import et export

Le lien **Import/Export** sous le nom de votre église, sur la page Settings, ouvre un outil dédié dans une nouvelle fenêtre du navigateur. Vous pouvez l'utiliser pour :

- Importer les données des membres depuis un autre système de gestion d'église.
- Exporter vos données ChurchApps pour une sauvegarde ou une migration.

Cet outil est particulièrement utile lors de la configuration initiale de votre église, lorsqu'il faut transférer des fiches existantes vers ChurchApps.

:::warning
Lors d'un import, sauvegardez toujours d'abord vos fiches existantes. Les opérations d'import ajoutent des données à votre système et peuvent créer des doublons si elles sont exécutées plusieurs fois.
:::
