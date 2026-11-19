---
title: "Paramètres de l'église"
description: "Définissez le nom, l'adresse, le sous-domaine, le fuseau horaire, le format régional, le fournisseur de messages texte et le stockage des fichiers de votre église dans la page Paramètres de l'église de B1 Admin."
---

# Paramètres de l'église

<div class="article-intro">

La page Paramètres de l'église vous permet de configurer les informations de base de votre église, ses coordonnées et son image de marque. Ces renseignements sont utilisés dans tous les outils ChurchApps, y compris votre site web B1.church et l'application B1.

</div>

## Vidéo de formation {#training-video}

<YouTube id="634zSbzDkYA" title="Configurer les informations et l'image de marque de l'église dans B1" next="Rôles, autorisations et inviter votre équipe dans B1" nextUrl="/docs/b1-admin/settings/roles-permissions" />

<div class="prereqs">
<h4>Avant de commencer</h4>

- Vous avez besoin de l'autorisation « Modifier les paramètres de l'église ». Voir [Rôles et autorisations](./roles-permissions.md) si vous n'y avez pas accès.
- Ayez à portée de main l'adresse, les coordonnées et le logo de votre église

</div>

## Modifier les informations de votre église {#editing-your-church-information}

1. Dans B1 Admin, ouvrez le [menu de navigation rapide](../introduction.md#getting-around-with-the-jump-menu) (la barre de recherche en haut à gauche), développez **Paramètres**, puis cliquez sur **Paramètres**.
2. Dans la section **Informations sur l'église** (en haut de la page), cliquez sur **Modifier**.
3. Mettez à jour l'un des champs suivants :
   - **Nom de l'église** *(obligatoire)* -- Le nom affiché dans tous les produits ChurchApps.
   - **Sous-domaine** *(obligatoire)* -- Votre adresse web B1 gratuite. Voir [Configurer votre sous-domaine](#setting-up-your-subdomain) ci-dessous.
   - **Adresse, ligne 1**, **Adresse, ligne 2**, **Ville**, **Province**, **Code postal** et **Pays** -- L'adresse physique de votre église.
   - **Premier jour de la semaine** -- Voir [Premier jour de la semaine](#first-day-of-week) ci-dessous.
   - **Fuseau horaire** -- Le fuseau horaire de votre église. Voir [Fuseau horaire](#time-zone) ci-dessous.
4. Cliquez sur **Enregistrer** pour appliquer vos modifications, ou sur **Annuler** pour les abandonner.

Le nom, le sous-domaine et l'adresse de l'église s'affichent aussi dans le panneau en haut à gauche de la page Paramètres.

## Configurer votre sous-domaine {#setting-up-your-subdomain}

Votre église reçoit un sous-domaine gratuit à l'adresse **yourchurch.b1.church**. C'est l'adresse web où les membres et les visiteurs peuvent accéder à la présence en ligne de votre église.

1. Sur la page Paramètres, cliquez sur **Modifier** dans la section **Informations sur l'église** et repérez le champ **Sous-domaine**.
2. Saisissez le sous-domaine souhaité (par exemple, « gracechurch » pour gracechurch.b1.church).
3. Enregistrez vos modifications.

:::info
Votre sous-domaine doit être unique parmi toutes les églises ChurchApps. Si le nom souhaité est déjà pris, essayez d'ajouter votre ville ou votre province (par exemple, « gracechurch-dallas »).
:::

Si vous voulez que les visiteurs accèdent à votre site par votre propre domaine (par exemple, **`www.gracechurch.org`**), voir [Domaine personnalisé](./custom-domain.md).

## Configurer l'image de marque {#configuring-branding}

Le logo et les couleurs de votre église ne se définissent pas sur la page Paramètres. Téléversez le logo de votre église et choisissez vos couleurs sous **Site web > Apparence** -- voir [Logo et image de marque](../website/appearance.md#logo-and-branding). Les couleurs utilisées par l'application B1, le portail des membres et la borne de pointage se définissent sous **Mobile > Thème de l'application** -- voir [Thème de l'application](./mobile-app.md#app-theme).

## Général (contact de soutien) {#general-support-contact}

La section **Général** contient votre **contact de soutien** : l'adresse courriel ou le lien du formulaire de contact que les personnes utilisent pour joindre votre église. Cliquez sur **Modifier** dans la section **Général**, saisissez l'adresse dans le champ **Lien**, puis cliquez sur **Enregistrer**. Tant que vous n'en avez pas défini un, la section affiche **Non défini**.

## Premier jour de la semaine {#first-day-of-week}

Choisissez le jour par lequel commencent vos calendriers. La liste **Premier jour de la semaine** de la section Informations sur l'église est réglée par défaut sur **dimanche**, mais elle peut être changée pour n'importe quel jour. Une fois modifié, ce réglage est respecté dans les grilles de calendrier de B1 Admin et du portail des membres B1.church : les calendriers de groupes, les calendriers organisés et l'éditeur d'événements affichent tous les semaines à partir du jour que vous choisissez.

## Fuseau horaire {#time-zone}

La liste **Fuseau horaire** de la section **Informations sur l'église** définit le fuseau horaire de votre église (par exemple, *America/Chicago*). Choisissez **Aucun** pour le laisser vide. Une fois enregistré, le fuseau apparaît dans le résumé des informations de l'église.

B1 utilise ce fuseau horaire pour les heures à l'échelle de l'église, comme les rappels d'événements et les horaires affichés sur vos téléviseurs [FreePlay](../../freeplay/scheduled-mode/scheduling-the-calendar.md). Les [horaires de pointage](../attendance/setup.md#setting-a-check-in-schedule) sont mesurés d'abord selon le fuseau horaire du [campus](./campuses.md) du service, et utilisent le fuseau horaire de l'église seulement lorsque ce campus n'en a pas. Si vos campus se trouvent tous dans un même fuseau horaire, réglez-le à la fois pour l'église et pour chaque campus.

## Région (format des dates et des numéros de téléphone) {#region-date-and-phone-format}

Le paramètre **Région** détermine la façon dont les dates et les heures sont écrites dans B1. Par défaut, les dates utilisent le format américain (par exemple, « Sep 28, 2026 » et « 9/28/2026 »). Les églises situées hors des États-Unis peuvent passer à leur propre format -- par exemple, en choisissant English (United Kingdom), les dates s'affichent sous la forme « 28 Sept 2026 » et « 28/09/2026 ».

1. Sur la page Paramètres, cliquez sur **Région** dans la liste de gauche, puis cliquez sur **Modifier** dans la section **Région**.
2. Choisissez votre région dans la liste déroulante **Région**. Chaque option affiche un exemple de date afin que vous voyiez exactement comment les dates apparaîtront.
3. Cliquez sur **Enregistrer**.

La section Région affiche alors la région choisie, un exemple du **format de date** et votre format de **numéros de téléphone**.

### Format des numéros de téléphone {#phone-number-format}

La même section Région comporte un paramètre **Numéros de téléphone** qui contrôle la façon dont les numéros sont saisis sur la fiche d'une personne :

- **International (avec indicatif du pays)** -- la valeur par défaut. Les champs de téléphone affichent un sélecteur de drapeau de pays et enregistrent les numéros avec l'indicatif du pays (par exemple, +1 918 555 1234).
- **Local (tel que saisi)** -- les champs de téléphone deviennent de simples zones de texte et enregistrent les numéros exactement comme vous les saisissez, sans ajouter d'indicatif du pays (par exemple, 0701 234 5678). Choisissez cette option si votre église écrit les numéros dans un format local et ne veut pas que B1 ajoute un indicatif de pays.

Lorsque **Local** est sélectionné, la section Région affiche aussi « Numéros de téléphone locaux » à côté de votre région.

:::tip
L'envoi de messages texte fonctionne mieux lorsque les numéros comprennent l'indicatif du pays. Si vous envoyez des textos depuis B1, conservez le format **International**, ou assurez-vous que les numéros saisis en mode Local comprennent l'indicatif du pays.
:::

Votre région s'applique aux dates et aux heures dans toute l'application B1 Admin et sur votre site web B1.church ainsi que dans le portail des membres, y compris pour les prédications, les billets de blogue, les calendriers de groupes et les plans de service. Les membres voient ainsi les dates dans le même format que votre personnel.

### Jour du culte {#worship-day}

La section Région comporte aussi un paramètre **Jour du culte** pour le jour où se tient votre culte principal. Il est **dimanche** à moins que vous ne le modifiiez. Les églises qui se réunissent le samedi (ou un autre jour) peuvent choisir ce jour, et le tableau de bord le suit : le titre principal affiche « Ce samedi », les panneaux latéraux affichent « Service samedi » et « Samedi dernier », la date de culte affichée est le samedi à venir, et le compteur en direct « dans la salle » s'active lors des pointages du samedi.

Lorsque le jour du culte n'est pas le dimanche, l'entrée Région de la liste de gauche affiche aussi ce jour à côté de votre région.

## Messagerie texte {#texting}

Connectez un fournisseur de messages texte pour envoyer des SMS à une personne ou à un groupe entier depuis B1 Admin. Les messages sont envoyés par votre propre compte auprès du fournisseur ; sa tarification et ses limites s'appliquent donc.

1. Sur la page Paramètres, cliquez sur **Messagerie texte** dans la liste de gauche, puis cliquez sur **Modifier** dans la section **Messagerie texte**.
2. Choisissez un **fournisseur** :
   - **Clearstream** -- saisissez une **clé d'API**. Créez-la dans les paramètres de votre compte Clearstream, sous Clés d'API.
   - **Text In Church** -- saisissez une **clé d'API**. Demandez d'abord l'accès développeur à l'API auprès du support de Text In Church, puis créez une clé dans la section Paramètres du compte > API développeur.
   - **Nalo Solutions** (Ghana) -- saisissez la clé d'authentification de votre compte Nalo Solutions comme **clé d'API**, ainsi qu'un **identifiant d'expéditeur** (jusqu'à 11 caractères) que Nalo a approuvé pour vous.
   - **Twilio** -- utilisez le propre compte Twilio de votre église ; Twilio vous facture directement. Copiez le **SID du compte** et le **jeton d'authentification** depuis la [console Twilio](https://console.twilio.com), puis saisissez un **numéro d'expédition** -- un numéro de téléphone Twilio enregistré pour A2P 10DLC, au format `+15551234567`. Après l'enregistrement, collez l'URL du webhook entrant (voir ci-dessous) dans le webhook **Un message arrive** du numéro dans Twilio afin que les réponses STOP soient aussi consignées dans B1.
3. Cliquez sur **Enregistrer**.

Pour cesser d'envoyer des messages texte, réglez **Fournisseur** sur **Aucun** et enregistrez. Cela supprime le fournisseur enregistré.

### Retirer de la liste les personnes qui répondent STOP {#opting-out-people-who-reply-stop}

Une fois un fournisseur enregistré, rouvrez la section Messagerie texte avec **Modifier**. Sous les paramètres du fournisseur, un champ en lecture seule **URL du webhook entrant (STOP)** affiche une adresse web propre à votre église. Cliquez dans le champ pour sélectionner l'adresse, copiez-la et collez-la dans le paramètre de webhook de messages entrants (réponses) de votre fournisseur. Cela fonctionne avec tous les fournisseurs ci-dessus capables de transmettre les réponses entrantes à un webhook.

Ensuite, lorsqu'une personne répond **STOP** (ou STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT, OPTOUT ou REVOKE) à l'un de vos textos, B1 trouve toutes les personnes dont le numéro mobile correspond, les marque comme désabonnées et désactive leurs rappels par texto. Elles sont ensuite ignorées dans les textos de groupe. Les autres réponses sont ignorées.

:::info
Ceci utilise le même paramètre de désabonnement que **Me masquer du répertoire des membres** ; les personnes qui répondent STOP apparaissent donc aussi comme **Masqué du répertoire** sur leur profil. Le champ n'apparaît que lorsque le fournisseur enregistré est sélectionné -- si vous changez la liste déroulante pour un autre fournisseur, enregistrez d'abord pour revoir l'URL.
:::

Une fois un fournisseur connecté, le personnel autorisé à envoyer des textos voit un bouton **Texto** sur la page d'un groupe (**Envoyer un texto à ce groupe**) et sur celle d'une personne ayant un téléphone mobile (**Envoyer un message texte**). Saisissez votre message et cliquez sur **Envoyer**. La boîte de dialogue compte les caractères et les segments SMS. Pour un groupe, elle indique combien de membres recevront le texto avant l'envoi :

- Les membres sans téléphone mobile au dossier sont ignorés.
- Les membres qui ont choisi **Me masquer du répertoire des membres** sont comptés comme désabonnés et ignorés.
- Les membres d'une même famille qui partagent un numéro mobile ne reçoivent le texto qu'une seule fois.

### Personnaliser les textos avec des champs de fusion {#personalizing-texts-with-merge-fields}

Sous la zone de message, la boîte de dialogue d'envoi de texto affiche des puces d'espaces réservés : **Prénom**, **Nom**, **Nom d'affichage** et **Nom de l'église**. Cliquez sur une puce pour insérer son espace réservé (`{{firstName}}`, `{{lastName}}`, `{{displayName}}` ou `{{churchName}}`) à l'emplacement de votre curseur. Lors de l'envoi, chaque espace réservé est remplacé par les renseignements du destinataire ; ainsi, un texto de groupe comme `Hi {{firstName}}, see you Sunday!` atteint chaque membre avec son propre prénom. Les espaces réservés fonctionnent aussi bien pour les textos de groupe que pour les textos à une seule personne. Les textos destinés à un groupe proposent aussi une puce **Nom du groupe** (`{{groupName}}`), remplacée par le nom du groupe.

Pour réutiliser un message, enregistrez-le comme [modèle de texte](./email-templates.md#text-templates) (un modèle de courriel de la catégorie **Texte**) et choisissez-le dans **Charger un modèle (facultatif)** en haut de la fenêtre d'envoi de texto.

:::info
La limite de 1 600 caractères s'applique au message tel que vous le saisissez. Une fois les espaces réservés remplis, tout texte dépassant 1 600 caractères est tronqué à cette longueur.
:::

Des textos peuvent aussi être envoyés automatiquement par une étape de [flux de travail](../serving/workflows.md#sending-a-text) avec l'action **Envoyer un texto**, qui utilise le même fournisseur et les mêmes espaces réservés.

## Stockage des fichiers {#file-storage}

Par défaut, les fichiers que vous téléversez sur votre site web (via [Fichiers](../website/files.md)) et dans les autres zones de contenu utilisent l'hébergement gratuit de B1, jusqu'à 100 Mo. Si vous avez besoin de plus d'espace, vous pouvez connecter votre propre stockage infonuagique : les nouveaux téléversements vont alors directement dans votre compte, sans limite de la plateforme.

1. Sur la page Paramètres, cliquez sur **Stockage des fichiers** dans la liste de gauche, puis cliquez sur **Modifier** dans la section **Stockage des fichiers**.
2. Choisissez un **fournisseur** : **Google Drive**, **Dropbox** ou **Compartiment compatible S3 (S3, R2, B2)** (AWS S3, Cloudflare R2, Backblaze B2, etc.). **ChurchApps (gratuit)** est le stockage intégré.
3. Pour Google Drive ou Dropbox, cliquez sur **Connecter le compte** et connectez-vous pour autoriser l'accès. Un insigne **Compte connecté** apparaît une fois la connexion réussie ; vous devez vous connecter avant de pouvoir enregistrer. Pour un compartiment compatible S3, saisissez l'**identifiant de clé d'accès**, la **clé d'accès secrète**, le **compartiment**, le **point de terminaison** (laissez vide pour AWS), la **région** et la **base de l'URL publique**. Le **compartiment** et la **base de l'URL publique** sont obligatoires, et le compartiment doit autoriser les lectures publiques ainsi que les téléversements CORS depuis B1.
4. Cliquez sur **Enregistrer**.

Pour revenir au stockage gratuit, choisissez **ChurchApps (gratuit)** et enregistrez. Les fichiers déjà téléversés restent à leur emplacement.

:::info
Cela ne concerne que les nouveaux téléversements dans les Fichiers de votre site web et les zones de contenu similaires. Les images de galerie, les vignettes, les logos et les photos des personnes restent toujours sur le stockage par défaut de B1.
:::

## Dons {#giving}

La section **Dons** connecte votre fournisseur de paiement et définit la devise de votre église pour les dons en ligne et les inscriptions payantes. Voir [Configuration des dons en ligne](../donations/online-giving-setup.md). Elle n'apparaît que pour les personnes pouvant modifier les paramètres des dons.

## Pointage {#check-in}

La section **Pointage** définit l'**application des ratios de bénévoles** -- si le pointage ne fait qu'avertir (**Avertir (permettre avec confirmation)**) ou s'il bloque un pointage (**Bloquer (empêcher le pointage)**) lorsqu'une salle manque de bénévoles. Voir [Ratios de bénévoles](../attendance/checkin-safety.md#volunteer-ratios). Le lien **Borne de pointage, codes QR et étiquettes** situé sous ce réglage ouvre les paramètres de la borne sur la page Mobile.

## Passage au niveau supérieur {#grade-promotion}

Si vous suivez le **niveau scolaire** des enfants et des élèves, B1 peut faire passer automatiquement tout le monde au niveau supérieur à une date de votre choix (par exemple, le 1er août) au lieu de vous obliger à modifier chaque profil à la main.

1. Sur la page Paramètres, cliquez sur **Passage au niveau supérieur** dans la liste de gauche, puis cliquez sur **Modifier** dans la section **Passage au niveau supérieur**.
2. Activez l'interrupteur (il affiche **Activé**) et choisissez le **mois** et le **jour** du passage au niveau supérieur chaque année. À cette date, chaque personne ayant un niveau passe au niveau suivant, et les élèves de 12e année deviennent **Diplômés**.
3. Enregistrez vos modifications.

Pour arrêter le passage automatique, désactivez l'interrupteur afin qu'il affiche **Désactivé**, puis enregistrez. La date de passage est retirée et les niveaux ne changeront plus d'eux-mêmes.

## Inscription des bénévoles {#volunteer-signup}

Par défaut, les membres qui consultent les [inscriptions de bénévoles](../../b1-church/serving/volunteer-signup.md) voient toutes les semaines à venir comportant des postes ouverts. Si cette liste devient longue, vous pouvez plutôt n'afficher que la semaine suivante de chaque type de plan.

1. Sur la page Paramètres, cliquez sur **Inscription des bénévoles** dans la liste de gauche, puis cliquez sur **Modifier** dans la section **Inscription des bénévoles**.
2. Activez **Afficher seulement la semaine suivante de chaque type de plan**.
3. Enregistrez vos modifications.

Avec ce réglage activé, chaque type de plan n'affiche que son prochain plan à venir. La semaine suivante apparaît une fois cette date passée. La ligne **Semaines affichées** de la section indique **Seulement la semaine suivante de chaque type de plan** ou **Toutes les semaines à venir**.

## Confidentialité des dons {#giving-privacy}

Les personnes ayant accès aux dons voient normalement les totaux de dons d'une personne sur sa [fiche](../people/adding-people.md#editing-details). Si vous préférez ne pas afficher les montants à chaque ouverture d'une fiche, vous pouvez les masquer jusqu'à ce que quelqu'un le demande.

1. Sur la page Paramètres, cliquez sur **Confidentialité des dons** dans la liste de gauche, puis cliquez sur **Modifier** dans la section **Confidentialité des dons**.
2. Activez **Masquer les dons sur les fiches des personnes jusqu'au clic**.
3. Enregistrez vos modifications.

Avec ce réglage activé, la carte des dons sur une fiche de personne indique « Les dons sont masqués sur les fiches des personnes. » Cliquez sur **Afficher les dons** pour charger et afficher les dons de cette personne. Ils se masquent de nouveau lorsque vous ouvrez une autre personne. Qui peut voir les dons ne change pas : seules les personnes ayant accès aux dons voient jamais la carte.

## Importation et exportation {#import-and-export}

Le lien **Importer/Exporter** situé sous le nom de votre église, sur la page Paramètres, ouvre un outil dédié dans une nouvelle fenêtre du navigateur. Utilisez-le pour :

- Importer des données de membres depuis un autre système de gestion d'église.
- Exporter vos données ChurchApps à des fins de sauvegarde ou de migration.

Cela est particulièrement utile lorsque vous configurez votre église pour la première fois et que vous devez transférer des dossiers existants dans ChurchApps.

:::warning
Lorsque vous importez des données, sauvegardez toujours d'abord vos dossiers existants. Les opérations d'importation ajoutent des données à votre système et peuvent créer des doublons si elles sont exécutées plusieurs fois.
:::
