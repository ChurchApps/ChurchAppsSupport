---
title: "Paramètres de l'église"
description: "Définissez le nom, l'adresse, le sous-domaine, le fuseau horaire, le format régional, le fournisseur de SMS et le stockage des fichiers de votre église sur la page Paramètres de l'église de B1 Admin."
---

# Paramètres de l'église

<div class="article-intro">

La page Paramètres de l'église permet de configurer les informations de base de votre église, ses coordonnées et son image de marque. Ces informations sont utilisées dans tous les outils ChurchApps, y compris votre site B1.church et l'application B1 App.

</div>

## Vidéo de formation

<YouTube id="634zSbzDkYA" title="Configurer les informations et l'image de marque de l'église dans B1" next="Rôles, autorisations et invitation de votre équipe dans B1" nextUrl="/docs/b1-admin/settings/roles-permissions" />

<div class="prereqs">
<h4>Avant de commencer</h4>

- Vous devez disposer de l'autorisation « Modifier les paramètres de l'église ». Consultez [Rôles et autorisations](./roles-permissions.md) si vous n'y avez pas accès.
- Préparez l'adresse, les coordonnées et le logo de votre église

</div>

## Modifier les informations de votre église

1. Dans B1 Admin, ouvrez le [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (la barre de recherche en haut à gauche), développez **Paramètres**, puis cliquez sur **Paramètres**.
2. Dans la section **Informations sur l'église** (en haut de la page), cliquez sur **Modifier**.
3. Mettez à jour l'un des champs suivants :
   - **Nom de l'église** -- Le nom affiché dans tous les produits ChurchApps.
   - **Adresse** -- L'adresse physique de votre église.
   - **Coordonnées** -- Numéro de téléphone, adresse e-mail et autres coordonnées.
   - **Fuseau horaire** -- Le fuseau horaire de votre église. Voir [Fuseau horaire](#time-zone) ci-dessous.
4. Cliquez sur **Enregistrer** pour appliquer vos modifications.

## Configurer votre sous-domaine

Votre église reçoit gratuitement un sous-domaine en **votreeglise.1.church**. C'est l'adresse web à laquelle les membres et les visiteurs peuvent accéder à la présence en ligne de votre église.

1. Sur la page Paramètres, cliquez sur **Modifier** dans la section **Informations sur l'église**, puis repérez le champ **Sous-domaine**.
2. Saisissez le sous-domaine de votre choix (par exemple « gracechurch » pour gracechurch.1.church).
3. Enregistrez vos modifications.

:::info
Votre sous-domaine doit être unique parmi toutes les églises ChurchApps. Si le nom souhaité est déjà pris, essayez d'ajouter le nom de votre ville ou de votre région (par exemple « gracechurch-dallas »).
:::

Si vous souhaitez que les visiteurs accèdent à votre site via votre propre domaine (par exemple **`www.gracechurch.org`**), consultez [Domaine personnalisé](./custom-domain.md).

## Configurer l'image de marque

Personnalisez l'apparence de votre église dans tous les outils ChurchApps :

1. Importez le **logo de votre église** en cliquant sur la zone du logo et en sélectionnant un fichier image.
2. Ajoutez les **images de l'église** supplémentaires utilisées sur votre site web et dans l'[application mobile](./mobile-app.md).

:::tip
Pour un meilleur résultat, utilisez un logo au format PNG avec un arrière-plan transparent. Il s'affichera ainsi correctement sur les fonds clairs comme sur les fonds sombres.
:::

## Premier jour de la semaine

Choisissez le jour de début de vos calendriers. La liste déroulante **Premier jour de la semaine** de la section Informations sur l'église est réglée par défaut sur **dimanche**, mais peut être définie sur n'importe quel jour. Une fois modifiée, cette option est appliquée à toutes les grilles de calendrier de B1 Admin et du portail membre B1.church : les calendriers de groupes, les calendriers organisés et l'éditeur d'événements affichent tous les semaines à partir du jour que vous avez choisi.

## Fuseau horaire

La liste déroulante **Fuseau horaire** de la section **Informations sur l'église** définit le fuseau horaire de votre église (par exemple *America/Chicago*). Choisissez **Aucun** pour laisser le champ vide. Une fois enregistré, le fuseau apparaît dans le récapitulatif des informations de l'église.

B1 utilise ce fuseau horaire pour les horaires communs à toute l'église, par exemple les rappels d'événements et les programmes affichés sur vos téléviseurs [FreePlay](../../freeplay/scheduled-mode/scheduling-the-calendar.md). Les [horaires d'enregistrement](../attendance/setup.md#setting-a-check-in-schedule) sont calculés d'abord selon le fuseau horaire du [campus](./campuses.md) où a lieu le culte, et n'utilisent le fuseau de l'église que si ce campus n'en a pas. Si tous vos campus se trouvent dans le même fuseau horaire, définissez-le à la fois pour l'église et pour chaque campus.

## Région (format des dates et des numéros de téléphone)

Le paramètre **Région** détermine la façon dont les dates et les heures sont écrites dans B1. Par défaut, les dates suivent le format des États-Unis (par exemple « Sep 28, 2026 » et « 9/28/2026 »). Les églises situées hors des États-Unis peuvent choisir leur propre format : par exemple, en sélectionnant Anglais (Royaume-Uni), les dates s'affichent sous la forme « 28 Sept 2026 » et « 28/09/2026 ».

1. Sur la page Paramètres, cliquez sur **Région** dans la liste de gauche, puis cliquez sur **Modifier** dans la section **Région**.
2. Choisissez votre région dans la liste déroulante **Région**. Chaque option affiche un exemple de date afin que vous puissiez voir exactement le rendu.
3. Cliquez sur **Enregistrer**.

La section Région affiche ensuite la région sélectionnée, un exemple du **format de date** et le format des **numéros de téléphone**.

### Format des numéros de téléphone

La même section Région comporte un paramètre **Numéros de téléphone** qui détermine la façon dont les numéros sont saisis dans la fiche d'une personne :

- **International (avec indicatif pays)** -- valeur par défaut. Les champs de téléphone affichent un sélecteur de drapeau de pays et enregistrent les numéros avec l'indicatif (par exemple +1 918 555 1234).
- **Local (tel que saisi)** -- les champs de téléphone deviennent de simples zones de texte et enregistrent les numéros exactement comme vous les saisissez, sans ajouter d'indicatif (par exemple 0701 234 5678). Choisissez cette option si votre église écrit les numéros selon un format local et ne souhaite pas que B1 ajoute un indicatif.

Lorsque **Local** est sélectionné, la section Région affiche également « Numéros de téléphone locaux » à côté de votre région.

:::tip
L'envoi de SMS fonctionne mieux lorsque les numéros incluent l'indicatif du pays. Si vous envoyez des SMS depuis B1, conservez le format **International**, ou assurez-vous que les numéros saisis en mode Local incluent l'indicatif.
:::

Votre région s'applique aux dates et aux heures dans B1 Admin, sur votre site B1.church et dans le portail membre, y compris pour les sermons, les articles de blog, les calendriers de groupes et les plannings de service. Ainsi, les membres voient les dates dans le même format que votre équipe.

## SMS {#texting}

Connectez un fournisseur de SMS pour envoyer des messages texte à une personne ou à un groupe entier depuis B1 Admin. Les SMS sont envoyés via votre propre compte chez le fournisseur ; ses tarifs et ses limites s'appliquent donc.

1. Sur la page Paramètres, cliquez sur **SMS** dans la liste de gauche, puis cliquez sur **Modifier** dans la section **SMS**.
2. Choisissez un **Fournisseur** :
   - **Clearstream** -- saisissez une **clé API**. Créez-en une dans les paramètres de votre compte Clearstream, sous Clés API.
   - **Text In Church** -- saisissez une **clé API**. Demandez d'abord un accès développeur à l'API auprès du support Text In Church, puis créez une clé dans la section Paramètres du compte > API développeur.
   - **Nalo Solutions** (Ghana) -- saisissez la clé d'authentification de votre compte Nalo Solutions comme **clé API**, ainsi qu'un **identifiant d'expéditeur** (11 caractères maximum) approuvé par Nalo pour votre église.
   - **Twilio** -- utilisez votre propre compte Twilio ; Twilio vous facture directement. Copiez le **SID du compte** et le **jeton d'authentification** depuis la [console Twilio](https://console.twilio.com), puis saisissez un **numéro d'expédition** -- un numéro de téléphone Twilio enregistré pour l'A2P 10DLC, au format `+15551234567`. Après l'enregistrement, collez l'URL du webhook entrant (voir ci-dessous) dans le webhook **A message comes in** du numéro, dans Twilio, afin que les réponses STOP soient également enregistrées dans B1.
3. Cliquez sur **Enregistrer**.

Pour arrêter l'envoi de SMS, définissez le **Fournisseur** sur **Aucun** et enregistrez. Cela supprime le fournisseur enregistré.

### Désabonner les personnes qui répondent STOP

Une fois un fournisseur enregistré, rouvrez la section SMS avec **Modifier**. Sous les paramètres du fournisseur, un champ en lecture seule **URL du webhook entrant (STOP)** affiche une adresse web propre à votre église. Cliquez dans le champ pour sélectionner l'adresse, copiez-la et collez-la dans le paramètre de webhook des messages entrants (réponses) de votre fournisseur de SMS. Cette méthode fonctionne avec tous les fournisseurs ci-dessus capables de transmettre les réponses entrantes à un webhook.

Ensuite, lorsqu'une personne répond **STOP** (ou STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT, OPTOUT ou REVOKE) à l'un de vos messages, B1 recherche tous les contacts dont le numéro de portable correspond, les marque comme désabonnés et désactive leurs rappels par SMS. Ils sont alors ignorés lors des envois groupés. Les autres réponses sont ignorées.

:::info
Ce réglage utilise le même paramètre de désabonnement que **Me masquer de l'annuaire des membres** : les personnes qui répondent STOP apparaissent donc aussi comme **Masqué de l'annuaire** sur leur profil. Le champ n'apparaît que lorsque le fournisseur enregistré est sélectionné. Si vous changez de fournisseur dans la liste déroulante, enregistrez d'abord pour revoir l'URL.
:::

Une fois un fournisseur connecté, les membres du personnel autorisés à envoyer des SMS voient un bouton **SMS** sur la page d'un groupe (**Envoyer un SMS à ce groupe**) et sur la page d'une personne disposant d'un téléphone portable (**Envoyer un SMS**). Saisissez votre message et cliquez sur **Envoyer**. La boîte de dialogue compte les caractères et les segments SMS. Pour un groupe, elle indique le nombre de membres qui recevront le message avant l'envoi :

- Les membres sans téléphone portable enregistré sont ignorés.
- Les membres qui ont choisi **Me masquer de l'annuaire des membres** sont considérés comme désabonnés et sont ignorés.
- Les membres d'une même famille qui partagent un numéro de portable ne reçoivent le message qu'une seule fois.

### Personnaliser les SMS avec des champs de fusion {#personalizing-texts-with-merge-fields}

Sous la zone de message, la boîte de dialogue SMS affiche des puces de champs : **Prénom**, **Nom**, **Nom d'affichage** et **Nom de l'église**. Cliquez sur une puce pour insérer son espace réservé (`{{firstName}}`, `{{lastName}}`, `{{displayName}}` ou `{{churchName}}`) à l'emplacement du curseur. Lors de l'envoi, chaque espace réservé est remplacé par les informations du destinataire. Ainsi, un message de groupe comme `Hi {{firstName}}, see you Sunday!` parvient à chaque membre avec son propre prénom. Les espaces réservés fonctionnent pour les SMS de groupe comme pour les SMS envoyés à une seule personne. Les SMS adressés à un groupe proposent aussi une puce **Nom du groupe** (`{{groupName}}`), remplacée par le nom du groupe.

Pour réutiliser un message, enregistrez-le comme [modèle de SMS](./email-templates.md#text-templates) (un modèle d'e-mail de la catégorie **Texte**) et sélectionnez-le dans **Charger un modèle (facultatif)** en haut de la fenêtre SMS.

:::info
La limite de 1 600 caractères s'applique au message tel que vous le saisissez. Une fois les espaces réservés remplis, tout texte dépassant 1 600 caractères est tronqué à cette longueur.
:::

Les SMS peuvent également être envoyés automatiquement depuis une étape de [workflow](../serving/workflows.md#sending-a-text) avec l'action **Envoyer un SMS**, qui utilise le même fournisseur et les mêmes espaces réservés.

## Stockage des fichiers

Par défaut, les fichiers que vous importez sur votre site web (via [Fichiers](../website/files.md)) et dans les autres zones de contenu utilisent le stockage hébergé gratuit de B1, jusqu'à 100 Mo. Si vous avez besoin de plus d'espace, vous pouvez connecter votre propre stockage cloud : les nouveaux fichiers sont alors enregistrés directement dans votre compte, sans limite imposée par la plateforme.

1. Sur la page Paramètres, cliquez sur **Stockage des fichiers** dans la liste de gauche, puis cliquez sur **Modifier** dans la section **Stockage des fichiers**.
2. Choisissez un fournisseur : **Google Drive**, **Dropbox**, **OneDrive** ou un **bucket compatible S3** (AWS S3, Cloudflare R2, Backblaze B2, etc.).
3. Pour Google Drive, Dropbox ou OneDrive, cliquez sur **Connecter** et connectez-vous pour autoriser l'accès. Pour un bucket compatible S3, saisissez votre clé d'accès, votre clé secrète, le nom du bucket et l'URL publique de base.
4. Cliquez sur **Enregistrer**.

:::info
Cela ne concerne que les nouveaux fichiers importés dans Fichiers de votre site web et dans les zones de contenu similaires. Les images de galerie, les vignettes, les logos et les photos des personnes restent toujours sur le stockage par défaut de B1.
:::

## Passage de classe

Si vous suivez le **niveau scolaire** des enfants et des étudiants, B1 peut faire passer automatiquement tout le monde au niveau supérieur à une date de votre choix (par exemple le 1er août), sans que vous ayez à modifier chaque fiche manuellement.

1. Sur la page Paramètres, cliquez sur **Passage de classe** dans la liste de gauche, puis cliquez sur **Modifier** dans la section **Passage de classe**.
2. Activez l'interrupteur (il affiche **Activé**), puis choisissez le **mois** et le **jour** du passage de classe chaque année. À cette date, tous les membres ayant un niveau scolaire passent au niveau suivant, et les élèves de terminale passent au statut **Diplômé**.
3. Enregistrez vos modifications.

Pour arrêter le passage automatique, désactivez l'interrupteur (il affiche alors **Désactivé**) et enregistrez. La date de passage est supprimée et les niveaux ne changeront plus automatiquement.

## Inscription aux bénévolats {#volunteer-signup}

Par défaut, les membres qui consultent les [inscriptions aux bénévolats](../../b1-church/serving/volunteer-signup.md) voient toutes les semaines à venir comportant des postes disponibles. Si cette liste devient longue, vous pouvez n'afficher que la semaine suivante pour chaque type de planning.

1. Sur la page Paramètres, cliquez sur **Inscription aux bénévolats** dans la liste de gauche, puis cliquez sur **Modifier** dans la section **Inscription aux bénévolats**.
2. Activez l'option **Afficher uniquement la semaine suivante pour chaque type de planning**.
3. Enregistrez vos modifications.

Avec cette option activée, chaque type de planning n'affiche que son prochain planning à venir. La semaine suivante apparaît une fois cette date passée. La ligne **Semaines affichées** de la section indique **Uniquement la semaine suivante pour chaque type de planning** ou **Toutes les semaines à venir**.

## Confidentialité des dons {#giving-privacy}

Les personnes ayant accès aux dons voient normalement les totaux des dons d'une personne sur sa [fiche personne](../people/adding-people.md#editing-details). Si vous préférez ne pas afficher les montants à chaque ouverture d'une fiche, vous pouvez les masquer jusqu'à ce qu'une personne en fasse la demande.

1. Sur la page Paramètres, cliquez sur **Confidentialité des dons** dans la liste de gauche, puis cliquez sur **Modifier** dans la section **Confidentialité des dons**.
2. Activez l'option **Masquer les dons sur les fiches personnes jusqu'au clic**.
3. Enregistrez vos modifications.

Avec cette option activée, la carte des dons d'une fiche personne affiche « Les dons sont masqués sur les fiches personnes ». Cliquez sur **Afficher les dons** pour charger et afficher les dons de cette personne. Ils sont de nouveau masqués lorsque vous ouvrez une autre fiche. Cela ne modifie pas les personnes autorisées à voir les dons : seules les personnes ayant accès aux dons voient cette carte.

## Importation et exportation

Le lien **Importation/Exportation** situé sous le nom de votre église, sur la page Paramètres, ouvre un outil dédié dans une nouvelle fenêtre du navigateur. Vous pouvez l'utiliser pour :

- Importer les données des membres depuis un autre système de gestion d'église.
- Exporter vos données ChurchApps à des fins de sauvegarde ou de migration.

Cet outil est particulièrement utile lorsque vous configurez votre église pour la première fois et devez transférer les fiches existantes dans ChurchApps.

:::warning
Avant toute importation, sauvegardez d'abord vos fiches existantes. Les opérations d'importation ajoutent des données à votre système et peuvent créer des doublons si elles sont exécutées plusieurs fois.
:::
