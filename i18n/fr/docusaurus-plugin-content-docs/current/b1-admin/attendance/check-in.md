---
title: "Enregistrement à l'arrivée"
---

# Enregistrement à l'arrivée

<div class="article-intro">

B1 Admin prend en charge l'enregistrement autonome aux services grâce à l'application complémentaire **B1 Checkin**. Les membres peuvent s'enregistrer eux-mêmes ainsi que leur famille sur des bornes ou des appareils dédiés à leur arrivée, ce qui rend le processus rapide et allège la charge de travail de vos bénévoles. Chaque enregistrement est automatiquement consigné comme présence.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Vos campus, horaires de service et groupes doivent être configurés dans [Configuration de la présence](setup.md).
- Vous devez disposer de [personnes dans votre base de données](../people/adding-people.md) avec des [foyers](../people/adding-people.md#managing-households) configurés pour que les familles puissent s'enregistrer ensemble.
- Vous aurez besoin d'une tablette et, éventuellement, d'une imprimante d'étiquettes Brother (voir [matériel recommandé](#recommended-hardware) ci-dessous).

</div>

## Fonctionnement

L'application B1 Checkin se connecte à la configuration de présence de votre B1 Admin. Lorsqu'un membre s'enregistre, sa présence est automatiquement consignée pour le bon campus, le bon horaire de service et le bon groupe. Vous n'avez pas besoin de saisir manuellement la présence des personnes qui utilisent le système d'enregistrement.

## Configurer l'enregistrement à l'arrivée

1. **Configurez d'abord votre structure de présence.** Dans B1 Admin, allez dans **Personnes > Présence** et cliquez sur **Configuration** pour vous assurer que vos campus, horaires de service et groupes sont en place. L'application d'enregistrement s'appuie sur cette configuration. Vous pouvez éventuellement attribuer à chaque horaire de service un [calendrier d'enregistrement](setup.md#setting-a-check-in-schedule) afin que l'enregistrement s'ouvre et se ferme automatiquement chaque semaine. Les calendriers utilisent le fuseau horaire du campus du service, ou le fuseau horaire de votre église si le campus n'en a pas défini. La borne affiche les horaires de service dont la fenêtre est fermée comme **Fermé** et indique aux familles quand l'enregistrement ouvrira. Consultez [Configuration de la présence](setup.md) pour plus de détails.
2. **Installez l'application B1 Checkin** sur les appareils que vous prévoyez d'utiliser. L'application est disponible sur les plateformes suivantes :
   - **iPad/iOS :** [Apple App Store](https://apps.apple.com/us/app/b1-church-check-in/id6775081998)
   - **Tablettes Android/Samsung :** [Google Play Store](https://play.google.com/store/apps/details?id=church.b1.checkin)
   - **Tablettes Amazon Fire :** [Amazon App Store](https://www.amazon.com/Live-Church-Solutions-B1-Check-In/dp/B0FW5HKRB5/)
3. **Connectez-vous à l'application B1 Checkin** avec les identifiants du compte de votre église.
4. **Sélectionnez le campus et l'horaire de service** du rassemblement en cours.
5. Les membres peuvent maintenant rechercher leur nom sur l'appareil et s'enregistrer.

:::tip
Placez les appareils d'enregistrement dans des endroits visibles et faciles d'accès, comme les entrées du hall ou les bureaux d'accueil. Une brève annonce pendant les services aide les membres à savoir que cette option existe.
:::

:::tip
Si votre église compte plusieurs campus, vous devrez répéter la configuration pour chaque campus dans [Configuration de la présence](setup.md). Chaque appareil d'enregistrement peut être configuré pour un campus différent.
:::

## Matériel recommandé

**Tablettes** — l'une de celles-ci fonctionne bien avec l'application :

- **Compacte :** Samsung Galaxy Tab A7 Lite 8,7"
- **Grand écran :** Samsung Galaxy Tab A8 10,5"
- **Économique :** Amazon Fire HD 10

**Imprimantes** — l'enregistrement fonctionne avec les imprimantes d'étiquettes Brother pour imprimer les badges :

- **Meilleure :** Brother QL-1110NWB (prend en charge plusieurs tablettes via Bluetooth et WiFi)
- **Bonne :** Brother QL-810W (prend en charge plusieurs tablettes via WiFi)
- **Économique :** Brother QL-1100 (WiFi uniquement)

**Étiquettes :** Brother DK-1201 (1-1/7" x 3-1/2")

:::warning
Seules les imprimantes d'étiquettes Brother sont compatibles avec l'application B1 Checkin. Les autres marques d'imprimantes ne fonctionneront pas pour imprimer les badges.
:::

:::info
Suivez les instructions de configuration de votre imprimante pour la connecter au même réseau WiFi que votre tablette. Vous trouverez les pilotes et guides de configuration des imprimantes Brother sur le [site d'assistance Brother](https://support.brother.com).
:::

## Personnaliser l'apparence de la borne

Vous pouvez personnaliser l'apparence de l'application B1 Checkin pour qu'elle corresponde à l'identité visuelle de votre église. Dans B1 Admin, allez dans **Mobile > B1 CheckIn** et utilisez la carte **Thème de la borne** pour configurer :

### Couleurs

Personnalisez les huit couleurs pour correspondre à l'identité visuelle de votre église :

- **Principale** et **Contraste principal** -- La couleur de marque principale et sa couleur de texte.
- **Secondaire** et **Contraste secondaire** -- La couleur d'accent et sa couleur de texte.
- **Arrière-plan de l'en-tête** et **Arrière-plan du sous-en-tête** -- Les couleurs des zones d'en-tête de la borne.
- **Arrière-plan des boutons** et **Texte des boutons** -- Les couleurs des boutons interactifs.

### Image de fond

Ajoutez une image de fond facultative pour les écrans d'accueil et de recherche de la borne. La taille recommandée est de 1920 x 1080 pixels.

### Écran de veille

Configurez un économiseur d'écran qui s'active après une période d'inactivité :

1. Activez ou désactivez l'écran de veille avec le bouton **Activé** ou **Désactivé**.
2. Définissez le **délai** (le nombre de secondes d'inactivité avant le démarrage de l'économiseur d'écran, minimum 10 secondes).
3. Ajoutez une ou plusieurs **diapositives** -- chaque diapositive comporte une image et une durée d'affichage (minimum 3 secondes).

:::tip
Utilisez l'écran de veille pour afficher des annonces, les événements à venir ou des messages de bienvenue lorsque la borne n'est pas utilisée.
:::

## Inscription des invités par code QR

La borne d'enregistrement peut afficher un code QR que les visiteurs scannent pour s'inscrire eux-mêmes ainsi que leur famille sur leur téléphone. Cela accélère l'enregistrement des nouveaux invités.

Lorsqu'un invité scanne le code QR, il est dirigé vers une [page d'inscription des invités](../../b1-church/checkin/guest-registration) où il saisit les noms des membres de sa famille et les autres informations que vous avez choisi de demander. Un bénévole peut ensuite le rechercher sur la borne et l'enregistrer.

### Activer l'inscription des invités par code QR

Pour activer l'affichage du code QR :

1. Dans B1 Admin, ouvrez le [menu Accès rapide](../introduction.md#getting-around-with-the-jump-menu) (la barre de recherche en haut à gauche) et développez **Mobile**.
2. Cliquez sur **B1 CheckIn**.
3. Activez **Inscription des invités par QR** et cliquez sur **Enregistrer**.

:::note
Ce paramètre se trouve dans **Mobile > B1 CheckIn** (la même page que la carte **Thème de la borne**), et non dans Présence. L'action **Borne** de la page Présence contient un lien vers cette page.
:::

Une fois l'option activée, les autres options ci-dessous apparaissent dans la même carte **Inscription des invités par QR**. Cliquez sur **Enregistrer** dans la carte après avoir modifié l'une d'elles.

### Choisir les champs d'inscription

La liste **Champs d'inscription** détermine ce que demande le formulaire d'inscription. **Prénom** et **Nom** sont toujours présents sur le formulaire et toujours obligatoires pour chaque membre de la famille. Pour chaque autre champ, activez **Inclure** pour l'ajouter au formulaire, puis activez **Obligatoire** si les invités doivent le remplir. **Obligatoire** ne peut être activé que pour un champ inclus, et désactiver **Inclure** le réinitialise.

| Champ | Demandé pour | Inclus par défaut |
|-------|--------------|-------------------|
| **Courriel** | Contact principal uniquement | Oui (facultatif) |
| **Téléphone** | Contact principal uniquement | Oui (facultatif) |
| **Adresse du domicile** | Une fois pour la famille -- rue, complément d'adresse, ville, province ou état, et code postal. Lorsqu'elle est obligatoire, tous les éléments sauf le complément d'adresse doivent être remplis. L'adresse est enregistrée pour chaque membre de la famille. | Non |
| **Date de naissance** | Chaque membre de la famille | Non |
| **Genre** | Chaque membre de la famille | Non |
| **État civil** | Contact principal uniquement | Non |
| **Niveau scolaire** | Chaque membre de la famille (de la maternelle à la 12e année, ou Diplômé) | Non |
| **Commentaires** | Une fois, dans une zone sous les membres de la famille (jusqu'à 1 000 caractères) | Non |

Les champs désactivés ne sont jamais enregistrés, même si quelqu'un les envoie au formulaire d'une autre manière. Les commentaires sont enregistrés comme note dans la fiche du contact principal (publiée sous « Inscription invité »), afin que vous puissiez les lire dans la section **Notes** de son profil.

### Ajouter les invités à un groupe

Utilisez **Ajouter les nouveaux invités au groupe** pour inscrire automatiquement toutes les personnes qui s'inscrivent dans l'un de vos groupes, par exemple un groupe « Nouveaux venus » ou un groupe pour l'événement du week-end. Choisissez **Aucun** (par défaut) pour ne pas utiliser cette option. Les invités ne voient jamais le groupe et ne le choisissent pas ; il n'est défini qu'ici. Modifiez-le avant chaque événement afin de pouvoir assurer le suivi des invités de cet événement ensemble.

### Enregistrer la présence

Lorsqu'un groupe est sélectionné, un interrupteur **Enregistrer aussi la présence** apparaît. Activez-le pour marquer les invités comme présents dès leur inscription, sans avoir à les enregistrer séparément.

La présence n'est enregistrée que si l'inscription a lieu pendant un des **horaires de service planifiés** du groupe sélectionné :

- Le groupe doit être associé à un ou plusieurs horaires de service, et ces horaires doivent avoir un [calendrier d'enregistrement](setup.md#setting-a-check-in-schedule) (un **Jour** et une **Heure de début**).
- « Pendant » signifie à l'intérieur de la fenêtre d'enregistrement de cet horaire de service -- à partir des minutes de **Ouverture de l'enregistrement** avant le début jusqu'aux minutes de **Fermeture de l'enregistrement** après la fin (ou après le début, si aucune heure de fin n'est définie), dans le même fuseau horaire que celui utilisé par le calendrier d'enregistrement.
- Chaque membre de la famille est marqué présent dans le groupe pour chacun de ses horaires de service ouverts à ce moment-là, à la date du jour.
- Les inscriptions effectuées à tout autre moment, ou pour un groupe dont les horaires de service n'ont pas de calendrier, sont ajoutées au groupe mais ne sont pas comptées comme présences.

### Photo d'en-tête

Sous **Photo d'en-tête**, cliquez sur **Changer la photo** pour choisir ou téléverser une image (recadrée au format 16:9) à afficher en haut de la page d'inscription à la place de l'icône par défaut. Cliquez sur **Retirer** pour revenir à l'icône.

### Partager le lien d'inscription

Une fois l'inscription par QR activée, une section **Partager le code QR d'inscription** apparaît au bas de la carte. Elle vous offre deux moyens, en plus du code QR de la borne, de diriger les invités vers le formulaire d'inscription :

- **Copier le lien** -- copie l'URL d'inscription pour que vous puissiez la coller sur le site web de votre église, dans des courriels ou partout en ligne.
- **Télécharger le PNG** -- télécharge le code QR sous forme d'image que vous pouvez imprimer sur des dépliants, des bulletins ou de la signalétique.

:::tip
Ajoutez le lien d'inscription à la page « Planifiez votre visite » ou « Je suis nouveau » du site web de votre église afin que les invités puissent s'inscrire avant même d'arriver.
:::

### Ce qui se passe après l'inscription d'un invité

Chaque inscription crée un nouveau foyer portant le nom de famille du contact principal, avec une fiche personne pour chaque membre de la famille. Toutes les personnes sont ajoutées à **Personnes** avec le statut de membre **Visiteur**, le contact principal étant le chef de famille.

Pour assurer un suivi automatique, ajoutez un [déclencheur de flux de travail](../serving/workflows.md#triggers) tel que **Personne · Créée** avec la condition *Statut de membre est Visiteur*, ou **Groupe · Membre ajouté** pour le groupe que vous avez choisi ci-dessus.

## Ce qui est enregistré

Chaque enregistrement crée une fiche de présence dans B1 Admin. Vous pouvez consulter ces fiches sur la page [Présence](tracking-attendance.md) et dans les [séances de chaque groupe](../groups/group-members.md), exactement comme pour les présences saisies manuellement. Il n'y a aucune différence dans la façon dont les données apparaissent : les deux méthodes alimentent les mêmes rapports.
