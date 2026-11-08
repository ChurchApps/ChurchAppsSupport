---
title: "Configuration de l'enregistrement autonome avec B1 Checkin et B1 Admin"
sidebar_label: "Enregistrement"
description: "Configurez l'enregistrement autonome aux services avec l'application B1 Checkin dans B1 Admin : appareils, comptes de borne, horaires, personnalisation et inscription des visiteurs par code QR."
---

# Enregistrement

<div class="article-intro">

B1 Admin prend en charge l'enregistrement autonome aux services grâce à l'application compagnon **B1 Checkin**. Les membres peuvent s'enregistrer eux-mêmes, ainsi que leur famille, sur des bornes ou des appareils dédiés à leur arrivée. Le processus est ainsi plus rapide et la charge de travail de vos bénévoles est réduite. Chaque enregistrement est automatiquement consigné comme présence.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Vos campus, horaires de services et groupes doivent être configurés dans [Configuration de la présence](setup.md).
- Vous avez besoin de [personnes dans votre base de données](../people/adding-people.md) avec des [foyers](../people/adding-people.md#managing-households) configurés pour que les familles puissent s'enregistrer ensemble.
- Il vous faudra une tablette et, éventuellement, une imprimante d'étiquettes Brother (voir les [recommandations matérielles](#recommended-hardware) ci-dessous).

</div>

## Fonctionnement

L'application B1 Checkin se connecte à la configuration de la présence de votre B1 Admin. Lorsqu'un membre s'enregistre, sa présence est automatiquement enregistrée pour le bon campus, le bon horaire de service et le bon groupe. Vous n'avez pas besoin de saisir manuellement la présence de toute personne qui utilise le système d'enregistrement.

## Configurer l'enregistrement

1. **Configurez d'abord la structure de votre présence.** Dans B1 Admin, allez dans **Personnes > Présence** et cliquez sur **Configuration** pour vous assurer que vos campus, horaires de services et groupes sont en place. L'application d'enregistrement s'appuie sur cette configuration. Vous pouvez éventuellement attribuer à chaque horaire de service un [calendrier d'enregistrement](setup.md#setting-a-check-in-schedule) afin que l'enregistrement s'ouvre et se ferme automatiquement chaque semaine. Les calendriers utilisent le fuseau horaire du campus du service, ou celui de votre église si le campus n'en a pas défini. La borne affiche comme **Fermé** les horaires dont la période d'enregistrement est terminée et indique aux familles quand l'enregistrement ouvre. Pour plus de détails, consultez [Configuration de la présence](setup.md).
2. **Installez l'application B1 Checkin** sur les appareils que vous prévoyez d'utiliser. L'application est disponible sur les plateformes suivantes :
   - **iPad/iOS :** [Apple App Store](https://apps.apple.com/us/app/b1-church-check-in/id6775081998)
   - **Tablettes Android/Samsung :** [Google Play Store](https://play.google.com/store/apps/details?id=church.b1.checkin)
   - **Tablettes Amazon Fire :** [Amazon App Store](https://www.amazon.com/Live-Church-Solutions-B1-Check-In/dp/B0FW5HKRB5/)
3. **Connectez-vous à l'application B1 Checkin** avec un compte disposant de l'autorisation de présence **Enregistrement** (ou **Modifier la présence**). Voir [Comptes de borne d'enregistrement](../settings/roles-permissions.md#check-in-kiosk-accounts).
4. **Sélectionnez le campus et l'horaire de service** du rassemblement en cours.
5. Les membres peuvent désormais rechercher leur nom sur l'appareil et s'enregistrer.

:::tip
Placez les appareils d'enregistrement à des endroits visibles et faciles d'accès, comme l'entrée du hall ou le bureau d'accueil. Une brève annonce pendant les services aide les membres à savoir que cette option est disponible.
:::

:::tip
Si votre église compte plusieurs campus, vous devrez répéter la configuration pour chaque campus dans [Configuration de la présence](setup.md). Chaque appareil d'enregistrement peut être configuré pour un campus différent.
:::

## Matériel recommandé

**Tablettes** : chacune de ces options fonctionne bien avec l'application :

- **Compacte :** Samsung Galaxy Tab A7 Lite 8,7 po
- **Grand écran :** Samsung Galaxy Tab A8 10,5 po
- **Économique :** Amazon Fire HD 10

**Imprimantes** : les enregistrements fonctionnent avec les imprimantes d'étiquettes Brother pour imprimer les badges :

- **Meilleure :** Brother QL-1110NWB (prend en charge plusieurs tablettes via Bluetooth et Wi-Fi)
- **Bonne :** Brother QL-810W (prend en charge plusieurs tablettes via Wi-Fi)
- **Économique :** Brother QL-1100 (Wi-Fi uniquement)

**Étiquettes :** Brother DK-1201 (1-1/7 po x 3-1/2 po)

:::warning
Seules les imprimantes d'étiquettes Brother sont compatibles avec l'application B1 Checkin. Les imprimantes d'autres marques ne fonctionneront pas pour imprimer les badges.
:::

:::info
Suivez les instructions de configuration de votre imprimante pour la connecter au même réseau Wi-Fi que votre tablette. Vous trouverez les pilotes et les guides de configuration des imprimantes Brother sur le [site d'assistance Brother](https://support.brother.com).
:::

## Personnaliser l'apparence de la borne

Vous pouvez personnaliser l'apparence de l'application B1 Checkin pour qu'elle corresponde à l'identité visuelle de votre église. Dans B1 Admin, allez dans **Mobile > B1 CheckIn** et utilisez la carte **Thème de la borne** pour configurer :

### Couleurs

Personnalisez huit couleurs pour correspondre à l'identité de votre église :

- **Principale** et **Contraste principal** : couleur principale de la marque et sa couleur de texte.
- **Secondaire** et **Contraste secondaire** : couleur d'accent et sa couleur de texte.
- **Arrière-plan de l'en-tête** et **Arrière-plan du sous-en-tête** : couleurs des zones d'en-tête de la borne.
- **Arrière-plan des boutons** et **Texte des boutons** : couleurs des boutons interactifs.

### Image d'arrière-plan

Importez une image d'arrière-plan facultative pour les écrans d'accueil et de recherche de la borne. La taille recommandée est de 1920 x 1080 pixels.

### Écran de veille

Configurez un économiseur d'écran qui s'active après une période d'inactivité :

1. Activez ou désactivez l'écran de veille.
2. Définissez le **délai** (le nombre de secondes d'inactivité avant le démarrage de l'économiseur d'écran, minimum 10 secondes).
3. Ajoutez une ou plusieurs **diapositives** : chacune comprend une image et une durée d'affichage (minimum 3 secondes).

:::tip
Utilisez l'écran de veille pour afficher des annonces, des événements à venir ou des messages de bienvenue lorsque la borne n'est pas utilisée.
:::

## Inscription des visiteurs par code QR

La borne d'enregistrement peut afficher un code QR que les visiteurs scannent pour s'inscrire eux-mêmes et leur famille sur leur téléphone. Cela accélère le processus d'enregistrement pour les visiteurs qui viennent pour la première fois.

Lorsqu'un visiteur scanne le code QR, il est dirigé vers une [page d'inscription des visiteurs](../../b1-church/checkin/guest-registration.md) où il saisit les noms de sa famille et les autres informations que vous avez choisi de demander. Un bénévole peut ensuite le rechercher sur la borne et l'enregistrer.

### Activer l'inscription des visiteurs par code QR

Pour activer l'affichage du code QR :

1. Dans B1 Admin, ouvrez le [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (la barre de recherche en haut à gauche) et développez **Mobile**.
2. Cliquez sur **B1 CheckIn**.
3. Activez **Inscription des visiteurs par QR** et cliquez sur **Enregistrer**.

:::note
Ce paramètre se trouve sous **Mobile > B1 CheckIn** (la même page que la carte **Thème de la borne**), et non sous Présence. L'action **Borne** de la page Présence contient un lien vers cette page.
:::

Une fois l'option activée, les autres paramètres ci-dessous apparaissent dans la même carte **Inscription des visiteurs par QR**. Cliquez sur **Enregistrer** dans la carte après avoir modifié l'un d'eux.

### Choisir les champs d'inscription

La liste **Champs d'inscription** détermine ce que demande le formulaire. **Prénom** et **Nom** figurent toujours dans le formulaire et sont toujours obligatoires pour chaque membre de la famille. Pour chacun des autres champs, activez **Inclure** pour l'ajouter au formulaire, puis activez **Obligatoire** si les visiteurs doivent le remplir. **Obligatoire** ne peut être activé que pour un champ inclus, et désactiver **Inclure** l'efface.

| Champ | Demandé pour | Inclus par défaut |
|-------|--------------|-------------------|
| **Titre** | Chaque membre de la famille, sous forme de liste déroulante devant le nom (M., Mme, Mlle, Dr, Pr, Rév., Pasteur) | Non |
| **Courriel** | Contact principal uniquement | Oui (facultatif) |
| **Téléphone** | Chaque membre de la famille. Lorsqu'il est obligatoire, seul le contact principal doit le remplir. | Oui (facultatif) |
| **Rôle dans le foyer** | Chaque membre de la famille après le contact principal : conjoint, enfant ou autre. Le contact principal est le chef d'un nouveau foyer. Une personne sans rôle est enregistrée comme « Autre ». | Oui (facultatif) |
| **Adresse domiciliaire** | Une seule fois pour la famille : rue, complément d'adresse, ville, province ou État, et code postal. Lorsqu'elle est obligatoire, tous les champs sauf le complément d'adresse doivent être remplis. L'adresse est enregistrée pour chaque membre de la famille. | Non |
| **Date de naissance** | Chaque membre de la famille | Non |
| **Genre** | Chaque membre de la famille | Non |
| **État civil** | Contact principal uniquement | Non |
| **Niveau scolaire** | Chaque membre de la famille (de la maternelle à la 12e année, ou Diplômé) | Non |
| **Commentaires** | Une seule fois, dans une zone de texte sous les membres de la famille (jusqu'à 1 000 caractères) | Non |

Les champs désactivés ne sont jamais enregistrés, même si quelqu'un les transmet d'une autre manière à l'inscription. Les commentaires sont enregistrés comme note dans la fiche du contact principal (publiée sous « Inscription visiteur »), afin que vous puissiez les lire dans la section **Notes** de son profil.

### Ajouter les visiteurs à un groupe

Utilisez **Ajouter les nouveaux visiteurs au groupe** pour placer automatiquement toutes les personnes qui s'inscrivent dans l'un de vos groupes, par exemple un groupe « Nouveaux venus » ou un groupe pour l'événement de cette fin de semaine. Choisissez **Aucun** (par défaut) pour ignorer cette étape. Les visiteurs ne voient ni ne choisissent jamais le groupe : il n'est défini qu'ici. Modifiez-le avant chaque événement afin de pouvoir faire le suivi des visiteurs de cet événement ensemble.

### Enregistrer la présence

Lorsqu'un groupe est sélectionné, un interrupteur **Enregistrer aussi la présence** apparaît. Activez-le pour marquer les visiteurs présents dès leur inscription, sans avoir à les enregistrer séparément.

La présence n'est enregistrée que si l'inscription a lieu pendant l'un des horaires de service **planifiés** du groupe sélectionné :

- Le groupe doit être lié à un ou plusieurs horaires de service, et ces horaires doivent avoir un [calendrier d'enregistrement](setup.md#setting-a-check-in-schedule) (un **jour** et une **heure de début**).
- « Pendant » signifie à l'intérieur de la période d'enregistrement de cet horaire : des minutes **Ouvrir l'enregistrement** avant le début jusqu'aux minutes **Fermer l'enregistrement** après la fin (ou après le début, si aucune heure de fin n'est définie ; sans heure de fin ni minutes de fermeture, jusqu'à la fin de la journée), dans le même fuseau horaire que celui utilisé par le calendrier d'enregistrement.
- Chaque membre de la famille est marqué présent dans le groupe pour chacun de ses horaires de service ouverts à ce moment-là, à la date du jour.
- Les inscriptions effectuées à un autre moment, ou pour un groupe dont les horaires de service n'ont pas de calendrier, sont ajoutées au groupe mais ne sont pas comptées comme présences.

### Photo d'en-tête

Sous **Photo d'en-tête**, cliquez sur **Changer la photo** pour choisir ou importer une image (recadrée au format 16:9) à afficher en haut de la page d'inscription à la place de l'icône par défaut. Cliquez sur **Supprimer** pour revenir à l'icône.

### Partager le lien d'inscription

Une fois l'inscription par code QR activée, une section **Partager le code QR d'inscription** apparaît au bas de la carte. Elle vous offre deux façons d'amener les visiteurs au formulaire d'inscription, en plus du code QR de la borne :

- **Copier le lien** : copie l'adresse d'inscription pour que vous puissiez la coller sur le site Web de votre église, dans des courriels ou partout en ligne.
- **Télécharger le PNG** : télécharge le code QR sous forme d'image que vous pouvez imprimer sur des dépliants, des feuillets ou de la signalisation.

:::tip
Ajoutez le lien d'inscription à la page « Planifiez votre visite » ou « Je suis nouveau » du site Web de votre église afin que les visiteurs puissent s'inscrire avant même d'arriver.
:::

### Ce qui se passe après l'inscription d'un visiteur

B1 commence par rechercher les personnes déjà présentes dans **Personnes**. Un membre de la famille est associé à une personne existante lorsqu'une seule personne a le même prénom et le même courriel ou numéro de téléphone. Un enfant saisi sans courriel ni téléphone est associé par son prénom au sein du foyer qui a été retrouvé. Les personnes retrouvées sont conservées telles quelles : l'inscription ne modifie jamais leurs coordonnées ni leur statut de membre. Toute nouvelle personne rejoint le foyer retrouvé.

Si personne ne correspond, l'inscription crée un nouveau foyer portant le nom de famille du contact principal, avec une fiche pour chaque membre de la famille. Toute nouvelle personne est ajoutée à **Personnes** avec le statut de membre **Visiteur**, le contact principal étant le chef de foyer.

Les personnes retrouvées comme les nouvelles sont ajoutées au groupe que vous avez choisi (si elles n'en font pas déjà partie) et voient leur présence enregistrée si cette option est activée. Les commentaires sont enregistrés comme note du contact principal.

Pour faire un suivi automatique, ajoutez un [déclencheur de flux de travail](../serving/workflows.md#triggers) comme **Personne · Créée** avec la condition *Statut de membre est Visiteur*, ou **Groupe · Membre ajouté** pour le groupe que vous avez choisi ci-dessus.

## Ce qui est enregistré

Chaque enregistrement crée une fiche de présence dans B1 Admin. Vous pouvez consulter ces fiches sur la page [Présence](tracking-attendance.md) et dans les [séances](../groups/group-members.md) de chaque groupe, exactement comme les présences saisies manuellement. Les données s'affichent de la même façon : les deux méthodes alimentent les mêmes rapports.
