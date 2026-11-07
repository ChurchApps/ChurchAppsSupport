---
title: "Configuration de l'enregistrement autonome avec B1 Checkin et B1 Admin"
sidebar_label: "Pointage"
description: "Configurez l'enregistrement autonome aux services avec l'application B1 Checkin dans B1 Admin : appareils, comptes kiosque, horaires, image de marque et inscription des visiteurs par code QR."
---

# Pointage

<div class="article-intro">

B1 Admin prend en charge le pointage autonome lors des services grâce à l'application compagnon **B1 Checkin**. Les membres peuvent s'enregistrer eux-mêmes ainsi que leur famille sur des bornes ou des appareils dédiés à leur arrivée, ce qui accélère le processus et réduit la charge de travail de vos bénévoles. Chaque pointage est automatiquement enregistré comme présence.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Vos campus, horaires de services et groupes doivent être configurés dans [Configuration des présences](setup.md).
- Vous avez besoin de [personnes dans votre base de données](../people/adding-people.md) avec des [foyers](../people/adding-people.md#managing-households) configurés afin que les familles puissent pointer ensemble.
- Vous aurez besoin d'une tablette et, éventuellement, d'une imprimante d'étiquettes Brother (voir les [recommandations matérielles](#recommended-hardware) ci-dessous).

</div>

## Fonctionnement

L'application B1 Checkin se connecte à la configuration des présences de votre B1 Admin. Lorsqu'un membre pointe, sa présence est automatiquement enregistrée pour le bon campus, le bon horaire de service et le bon groupe. Vous n'avez pas besoin de saisir manuellement la présence des personnes qui utilisent le système de pointage.

## Configurer le pointage

1. **Configurez d'abord votre structure de présences.** Dans B1 Admin, allez dans **Personnes > Présences** et cliquez sur **Configuration** pour vous assurer que vos campus, horaires de services et groupes sont en place. L'application de pointage s'appuie sur cette configuration. Vous pouvez aussi attribuer à chaque horaire de service un [calendrier de pointage](setup.md#setting-a-check-in-schedule) afin que le pointage s'ouvre et se ferme automatiquement chaque semaine. Les calendriers utilisent le fuseau horaire du campus du service, ou le fuseau horaire de votre église si le campus n'en a pas défini; la borne affiche les horaires de service dont la fenêtre est fermée comme **Fermé** et indique aux familles quand le pointage ouvrira. Voir [Configuration des présences](setup.md) pour plus de détails.
2. **Installez l'application B1 Checkin** sur les appareils que vous prévoyez d'utiliser. L'application est disponible sur les plateformes suivantes :
   - **iPad/iOS :** [Apple App Store](https://apps.apple.com/us/app/b1-church-check-in/id6775081998)
   - **Tablettes Android/Samsung :** [Google Play Store](https://play.google.com/store/apps/details?id=church.b1.checkin)
   - **Tablettes Amazon Fire :** [Amazon App Store](https://www.amazon.com/Live-Church-Solutions-B1-Check-In/dp/B0FW5HKRB5/)
3. **Connectez-vous à l'application B1 Checkin** avec un compte qui possède l'autorisation de présences **Checkin** (ou **Modifier les présences**). Voir [Comptes des bornes de pointage](../settings/roles-permissions.md#check-in-kiosk-accounts).
4. **Sélectionnez le campus et l'horaire de service** pour le rassemblement en cours.
5. Les membres peuvent maintenant rechercher leur nom sur l'appareil et pointer.

:::tip
Placez les appareils de pointage dans des endroits visibles et faciles d'accès, comme l'entrée du hall ou les bureaux d'accueil. Une brève annonce pendant les services aide les membres à savoir que cette option est disponible.
:::

:::tip
Si votre église compte plusieurs campus, vous devrez répéter la configuration pour chaque campus dans [Configuration des présences](setup.md). Chaque appareil de pointage peut être configuré pour un campus différent.
:::

## Matériel recommandé {#recommended-hardware}

**Tablettes** — chacune de ces options fonctionne bien avec l'application :

- **Compacte :** Samsung Galaxy Tab A7 Lite 8,7"
- **Grand écran :** Samsung Galaxy Tab A8 10,5"
- **Économique :** Amazon Fire HD 10

**Imprimantes** — le pointage fonctionne avec les imprimantes d'étiquettes Brother pour l'impression des badges :

- **Meilleure :** Brother QL-1110NWB (prend en charge plusieurs tablettes via Bluetooth et WiFi)
- **Bonne :** Brother QL-810W (prend en charge plusieurs tablettes via WiFi)
- **Économique :** Brother QL-1100 (WiFi uniquement)

**Étiquettes :** Brother DK-1201 (1-1/7" x 3-1/2")

:::warning
Seules les imprimantes d'étiquettes Brother sont compatibles avec l'application B1 Checkin. Les imprimantes d'autres marques ne fonctionneront pas pour imprimer les badges.
:::

:::info
Suivez les instructions de configuration de votre imprimante pour la connecter au même réseau WiFi que votre tablette. Vous trouverez les pilotes et guides de configuration des imprimantes Brother sur le [site d'assistance Brother](https://support.brother.com).
:::

## Personnaliser l'apparence de la borne

Vous pouvez personnaliser l'apparence de l'application B1 Checkin pour l'adapter à l'identité visuelle de votre église. Dans B1 Admin, allez dans **Mobile > B1 CheckIn** et utilisez la carte **Thème de la borne** pour configurer :

### Couleurs

Personnalisez huit couleurs pour correspondre à l'identité de votre église :

- **Principale** et **Contraste principal** -- Couleur principale de la marque et sa couleur de texte.
- **Secondaire** et **Contraste secondaire** -- Couleur d'accent et sa couleur de texte.
- **Arrière-plan de l'en-tête** et **Arrière-plan du sous-en-tête** -- Couleurs des zones d'en-tête de la borne.
- **Arrière-plan des boutons** et **Texte des boutons** -- Couleurs des boutons interactifs.

### Image d'arrière-plan

Téléversez une image d'arrière-plan facultative pour les écrans d'accueil et de recherche de la borne. La taille recommandée est de 1920x1080 pixels.

### Écran de veille

Configurez un économiseur d'écran qui s'active après une période d'inactivité :

1. Activez ou désactivez l'écran de veille.
2. Définissez le **délai d'attente** (nombre de secondes d'inactivité avant le lancement de l'économiseur, 10 secondes minimum).
3. Ajoutez une ou plusieurs **diapositives** -- chaque diapositive comporte une image et une durée d'affichage (3 secondes minimum).

:::tip
Utilisez l'écran de veille pour afficher des annonces, des événements à venir ou des messages de bienvenue lorsque la borne n'est pas utilisée.
:::

## Inscription des visiteurs par code QR {#guest-registration-via-qr-code}

La borne de pointage peut afficher un code QR que les visiteurs scannent pour s'inscrire eux-mêmes et leur famille sur leur propre téléphone. Cela accélère le pointage pour les visiteurs qui viennent pour la première fois.

Lorsqu'un visiteur scanne le code QR, il accède à une [page d'inscription des visiteurs](../../b1-church/checkin/guest-registration.md) où il saisit les noms de sa famille ainsi que les autres informations que vous choisissez de demander. Un bénévole peut ensuite le rechercher sur la borne et le pointer.

### Activer l'inscription par code QR

Pour activer l'affichage du code QR :

1. Dans B1 Admin, ouvrez le [menu de navigation rapide](../introduction.md#getting-around-with-the-jump-menu) (la barre de recherche en haut à gauche) et développez **Mobile**.
2. Cliquez sur **B1 CheckIn**.
3. Activez **Inscription des visiteurs par QR** et cliquez sur **Enregistrer**.

:::note
Ce paramètre se trouve sous **Mobile > B1 CheckIn** (la même page que la carte **Thème de la borne**), et non sous Présences. L'action **Borne** de la page Présences contient un lien vers cette page.
:::

Une fois l'option activée, les autres options ci-dessous apparaissent dans la même carte **Inscription des visiteurs par QR**. Cliquez sur **Enregistrer** dans la carte après avoir modifié l'une d'elles.

### Choisir les champs d'inscription

La liste **Champs d'inscription** détermine ce que demande le formulaire d'inscription. **Prénom** et **Nom** sont toujours présents sur le formulaire et toujours obligatoires pour chaque membre de la famille. Pour chacun des autres champs, activez **Inclure** pour l'ajouter au formulaire, puis activez **Obligatoire** si les visiteurs doivent le remplir. **Obligatoire** ne peut être activé que pour un champ inclus, et désactiver **Inclure** le réinitialise.

| Champ | Demandé pour | Inclus par défaut |
|-------|--------------|-------------------|
| **Courriel** | Contact principal uniquement | Oui (facultatif) |
| **Téléphone** | Contact principal uniquement | Oui (facultatif) |
| **Adresse domiciliaire** | Une fois pour la famille -- rue, ligne d'adresse 2, ville, province/état et code postal. Lorsqu'il est obligatoire, tout doit être rempli sauf la ligne d'adresse 2. L'adresse est enregistrée pour chaque membre de la famille. | Non |
| **Date de naissance** | Chaque membre de la famille | Non |
| **Genre** | Chaque membre de la famille | Non |
| **État civil** | Contact principal uniquement | Non |
| **Niveau scolaire** | Chaque membre de la famille (de la maternelle à la 12e année, ou Diplômé) | Non |
| **Commentaires** | Une fois, dans une case sous les membres de la famille (jusqu'à 1 000 caractères) | Non |

Les champs désactivés ne sont jamais enregistrés, même si quelqu'un les envoie à l'inscription par un autre moyen. Les commentaires sont enregistrés comme note sur la fiche du contact principal (publiée sous « Inscription visiteur »), afin que vous puissiez les lire dans la section **Notes** de son profil.

### Ajouter les visiteurs à un groupe

Utilisez **Ajouter les nouveaux visiteurs au groupe** pour inscrire automatiquement toutes les personnes qui s'inscrivent dans l'un de vos groupes -- par exemple, un groupe « Nouveaux venus » ou un groupe pour l'événement de ce week-end. Choisissez **Aucun** (par défaut) pour ignorer cette option. Les visiteurs ne voient jamais le groupe et ne le choisissent pas; il est défini uniquement ici. Modifiez-le avant chaque événement afin de pouvoir assurer le suivi des visiteurs de cet événement ensemble.

### Enregistrer la présence

Lorsqu'un groupe est sélectionné, un interrupteur **Enregistrer aussi la présence** apparaît. Activez-le pour marquer les visiteurs présents au moment où ils s'inscrivent, afin que vous n'ayez pas à les pointer séparément.

La présence n'est enregistrée que si l'inscription a lieu pendant l'un des horaires de service **planifiés** du groupe sélectionné :

- Le groupe doit être lié à un ou plusieurs horaires de service, et ces horaires doivent avoir un [calendrier de pointage](setup.md#setting-a-check-in-schedule) (un **jour** et une **heure de début**).
- « Pendant » signifie à l'intérieur de la fenêtre de pointage de cet horaire de service -- de **Ouvrir le pointage** minutes avant le début jusqu'à **Fermer le pointage** minutes après la fin (ou après le début, si aucune heure de fin n'est définie), dans le même fuseau horaire que celui utilisé par le calendrier de pointage.
- Chaque membre de la famille est marqué présent dans le groupe pour chacun des horaires de service de ce groupe qui est ouvert à ce moment-là, à la date du jour.
- Les inscriptions effectuées à tout autre moment, ou pour un groupe dont les horaires de service n'ont pas de calendrier, sont ajoutées au groupe mais ne sont pas comptées comme présentes.

### Photo d'en-tête

Sous **Photo d'en-tête**, cliquez sur **Changer la photo** pour choisir ou téléverser une image (recadrée au format 16:9) à afficher en haut de la page d'inscription à la place de l'icône par défaut. Cliquez sur **Supprimer** pour revenir à l'icône.

### Partager le lien d'inscription

Une fois l'inscription par code QR activée, une section **Partager le code QR d'inscription** apparaît au bas de la carte. Elle vous offre deux façons de conduire les visiteurs au formulaire d'inscription, en plus du code QR de la borne :

- **Copier le lien** -- copie l'URL d'inscription afin que vous puissiez la coller sur le site web de votre église, dans des courriels ou n'importe où en ligne.
- **Télécharger le PNG** -- télécharge le code QR sous forme d'image que vous pouvez imprimer sur des dépliants, des bulletins ou de la signalisation.

:::tip
Ajoutez le lien d'inscription à la page « Planifiez votre visite » ou « Je suis nouveau » du site web de votre église afin que les visiteurs puissent s'inscrire avant même d'arriver.
:::

### Ce qui se passe après l'inscription d'un visiteur

B1 cherche d'abord les personnes déjà présentes dans **Personnes**. Un membre de la famille est associé à une personne existante lorsqu'exactement une personne a le même prénom et le même courriel ou numéro de téléphone. Un enfant saisi sans courriel ni téléphone est associé par son prénom au sein du foyer associé. Les personnes associées sont réutilisées telles quelles -- l'inscription ne modifie jamais leurs informations ni leur statut de membre -- et toute nouvelle personne rejoint le foyer associé.

Lorsqu'aucune correspondance n'est trouvée, l'inscription crée un nouveau foyer portant le nom de famille du contact principal, avec une fiche de personne pour chaque membre de la famille. Toutes les nouvelles personnes sont ajoutées à **Personnes** avec le statut de membre **Visiteur**, le contact principal étant le chef de foyer.

Les personnes associées et les nouvelles personnes sont toutes ajoutées au groupe que vous avez choisi (si elles n'en font pas déjà partie) et voient leur présence enregistrée lorsque cette option est activée. Les commentaires sont enregistrés comme note sur le contact principal.

Pour assurer le suivi automatiquement, ajoutez un [déclencheur de flux de travail](../serving/workflows.md#triggers) comme **Personne · Créée** avec la condition *Statut de membre est Visiteur*, ou **Groupe · Membre ajouté** pour le groupe que vous avez choisi ci-dessus.

## Ce qui est enregistré

Chaque pointage crée un enregistrement de présence dans B1 Admin. Vous pouvez consulter ces enregistrements sur la page [Présences](tracking-attendance.md) et dans les séances de chaque [groupe](../groups/group-members.md), tout comme les présences saisies manuellement. Il n'y a aucune différence dans l'affichage des données : les deux méthodes alimentent les mêmes rapports.
