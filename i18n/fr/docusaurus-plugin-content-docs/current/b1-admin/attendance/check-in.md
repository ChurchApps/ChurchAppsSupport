---
title: "Enregistrement en libre-service avec B1 Checkin et B1 Admin"
sidebar_label: "Enregistrement"
description: "Configurez l'enregistrement en libre-service pour les services avec l'application B1 Checkin dans B1 Admin : appareils, comptes kiosque, horaires, image de marque et inscription des visiteurs par code QR."
---

# Enregistrement {#check-in}

<div class="article-intro">

B1 Admin prend en charge l'enregistrement en libre-service lors des services grâce à l'application compagnon **B1 Checkin**. Les membres peuvent s'enregistrer eux-mêmes, ainsi que leur famille, sur des bornes ou des appareils dédiés à leur arrivée, ce qui accélère le processus et réduit la charge de travail de vos bénévoles. Chaque enregistrement est automatiquement consigné comme présence.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Vos campus, horaires de services et groupes doivent être configurés dans [Configuration des présences](setup.md).
- Vous devez avoir [des personnes dans votre base de données](../people/adding-people.md) avec des [foyers](../people/adding-people.md#managing-households) configurés afin que les familles puissent s'enregistrer ensemble.
- Il vous faut une tablette et, en option, une imprimante d'étiquettes Brother (voir les [recommandations matérielles](#recommended-hardware) ci-dessous).

</div>

## Fonctionnement {#how-it-works}

L'application B1 Checkin se connecte à votre configuration de présences dans B1 Admin. Lorsqu'un membre s'enregistre, sa présence est automatiquement consignée pour le bon campus, le bon horaire de service et le bon groupe. Vous n'avez pas besoin de saisir manuellement la présence des personnes qui utilisent le système d'enregistrement.

## Configurer l'enregistrement {#setting-up-check-in}

1. **Configurez d'abord la structure de vos présences.** Dans B1 Admin, allez dans **Personnes > Présences** et cliquez sur **Configuration** pour vous assurer que vos campus, horaires de services et groupes sont en place. L'application d'enregistrement s'appuie sur cette configuration. Vous pouvez aussi attribuer à chaque horaire de service un [calendrier d'enregistrement](setup.md#setting-a-check-in-schedule) afin que l'enregistrement s'ouvre et se ferme automatiquement chaque semaine. Les calendriers utilisent le fuseau horaire du campus du service, ou celui de votre église si le campus n'en a pas défini ; la borne affiche comme **Fermé** les horaires de service dont la période est terminée et indique aux familles à quelle heure l'enregistrement ouvre. Voir [Configuration des présences](setup.md) pour plus de détails.
2. **Installez l'application B1 Checkin** sur les appareils que vous comptez utiliser. L'application est disponible sur les plateformes suivantes :
   - **iPad/iOS :** [Apple App Store](https://apps.apple.com/us/app/b1-church-check-in/id6775081998)
   - **Tablettes Android/Samsung :** [Google Play Store](https://play.google.com/store/apps/details?id=church.b1.checkin)
   - **Tablettes Amazon Fire :** [Amazon App Store](https://www.amazon.com/Live-Church-Solutions-B1-Check-In/dp/B0FW5HKRB5/)
3. **Connectez-vous à l'application B1 Checkin** avec un compte disposant de l'autorisation de présence **Checkin** (ou **Modifier les présences**). Voir [Comptes kiosque d'enregistrement](../settings/roles-permissions.md#check-in-kiosk-accounts).
4. **Sélectionnez le campus et l'horaire de service** pour le rassemblement en cours.
5. Les membres peuvent maintenant rechercher leur nom sur l'appareil et s'enregistrer.

:::tip
Placez les appareils d'enregistrement dans des endroits visibles et faciles d'accès, comme les entrées du hall ou les bureaux d'accueil. Une brève annonce pendant les services aide les membres à savoir que cette option est disponible.
:::

:::tip
Si votre église compte plusieurs campus, vous devrez répéter la configuration pour chaque campus dans [Configuration des présences](setup.md). Chaque appareil d'enregistrement peut être configuré pour un campus différent.
:::

## Matériel recommandé {#recommended-hardware}

**Tablettes** — l'une de celles-ci fonctionne bien avec l'application :

- **Compacte :** Samsung Galaxy Tab A7 Lite 8,7"
- **Grand écran :** Samsung Galaxy Tab A8 10,5"
- **Économique :** Amazon Fire HD 10

**Imprimantes** — l'enregistrement fonctionne avec les imprimantes d'étiquettes Brother pour imprimer les badges :

- **Meilleure :** Brother QL-1110NWB (prend en charge plusieurs tablettes via Bluetooth et Wi-Fi)
- **Bonne :** Brother QL-810W (prend en charge plusieurs tablettes via Wi-Fi)
- **Économique :** Brother QL-1100 (Wi-Fi uniquement)

**Étiquettes :** Brother DK-1201 (1-1/7" x 3-1/2")

:::warning
Seules les imprimantes d'étiquettes Brother sont compatibles avec l'application B1 Checkin. Les imprimantes d'autres marques ne fonctionneront pas pour imprimer les badges.
:::

:::info
Suivez les instructions de configuration de votre imprimante pour la connecter au même réseau Wi-Fi que votre tablette. Vous trouverez les pilotes et les guides de configuration des imprimantes Brother sur le [site d'assistance Brother](https://support.brother.com).
:::

## Personnaliser l'apparence de la borne {#customizing-the-kiosk-appearance}

Vous pouvez personnaliser l'apparence de l'application B1 Checkin pour correspondre à l'image de marque de votre église. Dans B1 Admin, allez dans **Mobile > B1 CheckIn** (ou cliquez sur **Borne** sur la page Présences) et utilisez la carte **Thème de la borne**. Cliquez sur **Enregistrer** sur la carte après avoir effectué des modifications.

### Couleurs {#colors}

La borne utilise les mêmes couleurs que l'application de votre église. Définissez-les dans **Mobile > Thème de l'application** ; la carte Thème de la borne n'a pas ses propres paramètres de couleur.

### Image d'arrière-plan {#background-image}

Sous **Image d'arrière-plan**, cliquez sur **Télécharger une image** pour ajouter un arrière-plan facultatif aux écrans d'accueil et de recherche de la borne. La taille recommandée est de 1920 x 1080 pixels. Utilisez **Changer l'image** ou **Supprimer** pour la remplacer ou l'effacer.

### Écran de veille {#idle-screen--screensaver}

Configurez un économiseur d'écran qui s'active après une période d'inactivité :

1. Ouvrez **Écran de veille** et activez **Activer l'écran de veille**.
2. Définissez **Délai (secondes)** -- le nombre de secondes d'inactivité avant le démarrage de l'économiseur d'écran (minimum 10).
3. Cliquez sur **Ajouter une diapositive** pour chaque diapositive, cliquez sur **Télécharger** pour choisir son image, puis définissez sa **Durée (s)** (minimum 3 secondes).

:::tip
Utilisez l'écran de veille pour afficher des annonces, les prochains événements ou des messages de bienvenue lorsque la borne n'est pas utilisée.
:::

## Inscription des visiteurs par code QR {#guest-registration-via-qr-code}

La borne d'enregistrement peut afficher un code QR que les visiteurs scannent pour s'inscrire eux-mêmes, ainsi que leur famille, sur leur propre téléphone. Cela accélère le processus d'enregistrement pour les visiteurs qui viennent pour la première fois.

Lorsqu'un visiteur scanne le code QR, il est dirigé vers une [page d'inscription des visiteurs](../../b1-church/checkin/guest-registration.md) où il saisit les noms de sa famille et les autres informations que vous choisissez de demander. Un bénévole peut ensuite le rechercher sur la borne et l'enregistrer.

### Activer l'inscription des visiteurs par code QR {#enabling-qr-guest-registration}

Pour activer l'affichage du code QR :

1. Dans B1 Admin, ouvrez le [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (la barre de recherche en haut à gauche) et développez **Mobile**.
2. Cliquez sur **B1 CheckIn**.
3. Activez **Inscription des visiteurs par QR** et cliquez sur **Enregistrer**.

:::note
Ce paramètre se trouve sous **Mobile > B1 CheckIn** (la même page que la carte **Thème de la borne**), et non sous Présences. L'action **Borne** de la page Présences contient un lien vers cette page.
:::

Une fois l'option activée, les autres options ci-dessous apparaissent dans la même carte **Inscription des visiteurs par QR**. Cliquez sur **Enregistrer** sur la carte après avoir modifié l'une d'elles.

### Choisir les champs d'inscription {#choosing-sign-up-fields}

La liste **Champs d'inscription** contrôle ce que demande le formulaire d'inscription. **Prénom** et **Nom** sont toujours présents sur le formulaire et toujours obligatoires pour chaque membre de la famille. Pour chacun des autres champs, activez **Inclure** pour l'ajouter au formulaire, puis activez **Obligatoire** si les visiteurs doivent le remplir. **Obligatoire** ne peut être activé que pour un champ inclus, et désactiver **Inclure** le réinitialise.

| Champ | Demandé pour | Inclus par défaut |
|-------|--------------|-------------------|
| **Titre** | Chaque membre de la famille, sous forme de liste déroulante devant le nom (M., Mme, Mlle, Mme, Dr, Prof, Rév., Pasteur) | Non |
| **E-mail** | Chaque membre de la famille. Lorsqu'il est obligatoire, seul le contact principal doit le remplir. | Oui (facultatif) |
| **Téléphone** | Chaque membre de la famille. Lorsqu'il est obligatoire, seul le contact principal doit le remplir. | Oui (facultatif) |
| **Rôle dans le foyer** | Chaque membre de la famille après le contact principal -- Conjoint, Enfant ou Autre. Le contact principal est le chef d'un nouveau foyer. Toute personne sans rôle est enregistrée comme Autre. | Oui (facultatif) |
| **Adresse personnelle** | Une seule fois pour la famille -- rue, complément d'adresse, ville, province/État et code postal. Lorsqu'elle est obligatoire, tous les champs sauf le complément d'adresse doivent être remplis. L'adresse est enregistrée pour chaque membre de la famille. | Non |
| **Date de naissance** | Chaque membre de la famille | Non |
| **Sexe** | Chaque membre de la famille | Non |
| **Situation matrimoniale** | Contact principal uniquement | Non |
| **Niveau scolaire** | Chaque membre de la famille (de la maternelle à la 12e année, ou Diplômé) | Non |
| **Commentaires** | Une seule fois, dans une zone sous les membres de la famille (jusqu'à 1 000 caractères) | Non |
| **Photo** | Chaque membre de la famille, avec un bouton **Ajouter une photo** qui ouvre un outil de recadrage. La photo devient la photo de profil de la nouvelle personne. Lorsqu'elle est obligatoire, seul le contact principal doit en ajouter une. | Non |

Les champs que vous désactivez ne sont jamais enregistrés, même si quelqu'un les transmet au formulaire d'une autre manière. Les commentaires sont enregistrés sous forme de note dans la fiche du contact principal (publiée comme « Inscription visiteur »), afin que vous puissiez les lire dans la section **Notes** de son profil.

### Ajouter les visiteurs à un groupe {#adding-guests-to-a-group}

Utilisez **Ajouter les nouveaux visiteurs au groupe** pour placer automatiquement toutes les personnes qui s'inscrivent dans l'un de vos groupes -- par exemple un groupe « Nouveaux venus » ou un groupe pour l'événement de ce week-end. Choisissez **Aucun** (par défaut) pour ignorer cette étape. Les visiteurs ne voient jamais le groupe et ne le choisissent jamais ; il n'est défini qu'ici. Modifiez-le avant chaque événement afin de pouvoir suivre ensemble les visiteurs de cet événement.

### Consigner la présence {#recording-attendance}

Lorsqu'un groupe est sélectionné, un interrupteur **Enregistrer aussi la présence** apparaît. Activez-le pour marquer les visiteurs comme présents dès leur inscription, sans avoir à les enregistrer séparément.

La présence n'est consignée que si l'inscription a lieu pendant l'un des horaires **programmés** du groupe sélectionné :

- Le groupe doit être lié à un ou plusieurs horaires de service, et ces horaires doivent avoir un [calendrier d'enregistrement](setup.md#setting-a-check-in-schedule) (un **Jour** et une **Heure de début**).
- « Pendant » signifie à l'intérieur de la fenêtre d'enregistrement de cet horaire -- à partir des minutes **Ouvrir l'enregistrement** avant le début, jusqu'aux minutes **Fermer l'enregistrement** après la fin (ou après le début, si aucune heure de fin n'est définie ; sans heure de fin ni minutes de fermeture, jusqu'à la fin de la journée), dans le même fuseau horaire que celui utilisé par le calendrier d'enregistrement.
- Chaque membre de la famille est marqué présent dans le groupe pour chacun de ses horaires de service ouverts à ce moment-là, à la date du jour.
- Les inscriptions effectuées à un autre moment, ou pour un groupe dont les horaires de service n'ont pas de calendrier, sont ajoutées au groupe mais ne sont pas comptées comme présences.

### Photo d'en-tête {#header-photo}

Sous **Photo d'en-tête**, cliquez sur **Changer la photo** pour choisir ou télécharger une image (recadrée au format 16:9) à afficher en haut de la page d'inscription à la place de l'icône par défaut. Cliquez sur **Supprimer** pour revenir à l'icône.

### Partager le lien d'inscription {#sharing-the-registration-link}

Une fois l'inscription par code QR activée, une section **Partager le code QR d'inscription** apparaît au bas de la carte. Elle vous offre deux façons d'amener les visiteurs au formulaire d'inscription, en plus du code QR de la borne :

- **Copier le lien** -- copie l'URL d'inscription pour que vous puissiez la coller sur le site web de votre église, dans des courriels ou partout en ligne.
- **Télécharger le PNG** -- télécharge le code QR sous forme d'image que vous pouvez imprimer sur des dépliants, des bulletins ou de la signalétique.

:::tip
Ajoutez le lien d'inscription à la page « Préparer votre visite » ou « Je suis nouveau » du site web de votre église afin que les visiteurs puissent s'inscrire avant même d'arriver.
:::

### Ce qui se passe après l'inscription d'un visiteur {#what-happens-after-a-guest-signs-up}

B1 cherche d'abord les personnes déjà présentes dans **Personnes**. Un membre de la famille est associé à une personne existante lorsqu'une seule personne a le même prénom et le même courriel ou numéro de téléphone. Un enfant saisi sans courriel ni téléphone est associé par son prénom au sein du foyer qui a été associé. Les personnes associées sont réutilisées telles quelles -- l'inscription ne modifie jamais leurs coordonnées ni leur statut de membre -- et toute personne nouvelle rejoint le foyer associé.

Lorsqu'aucune correspondance n'est trouvée, l'inscription crée un nouveau foyer portant le nom de famille du contact principal, avec une fiche personne pour chaque membre de la famille. Toutes les nouvelles personnes sont ajoutées à **Personnes** avec le statut de membre **Visiteur**, le contact principal étant le chef de foyer.

Les personnes associées comme les nouvelles sont ajoutées au groupe choisi (si elles n'en font pas déjà partie) et voient leur présence consignée lorsque cette option est activée. Les commentaires sont enregistrés sous forme de note sur le contact principal.

Pour assurer un suivi automatique, ajoutez un [déclencheur de flux de travail](../serving/workflows.md#triggers) tel que **Personne · Créée** avec la condition *Statut de membre est Visiteur*, ou **Groupe · Membre ajouté** pour le groupe que vous avez choisi ci-dessus.

## Ce qui est enregistré {#what-gets-recorded}

Chaque enregistrement crée une fiche de présence dans B1 Admin. Vous pouvez consulter ces fiches sur la page [Présences](tracking-attendance.md) et dans les [séances](../groups/group-members.md) de chaque groupe, exactement comme pour les présences saisies manuellement. Les données apparaissent de la même façon ; les deux méthodes alimentent les mêmes rapports.
