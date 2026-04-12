---
title: "Enregistrement"
---

# Enregistrement

<div class="article-intro">

B1 Admin prend en charge l'enregistrement en libre-service lors des cultes grâce à l'application compagnon **B1 Checkin**. Les membres peuvent s'enregistrer eux-mêmes ainsi que leur famille sur des bornes ou des appareils dédiés à leur arrivée, rendant le processus rapide et réduisant la charge de travail de vos bénévoles. Chaque enregistrement est automatiquement comptabilisé comme présence.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Vos campus, horaires de culte et groupes doivent être configurés dans [Configuration de la présence](setup.md).
- Vous avez besoin de [personnes dans votre base de données](../people/adding-people.md) avec des [foyers](../people/adding-people.md#managing-households) configurés pour que les familles puissent s'enregistrer ensemble.
- Vous aurez besoin d'une tablette et éventuellement d'une imprimante d'étiquettes Brother (voir les [recommandations matérielles](#recommended-hardware) ci-dessous).

</div>

## Comment ça fonctionne

L'application B1 Checkin se connecte à la configuration de présence de votre B1 Admin. Lorsqu'un membre s'enregistre, sa présence est automatiquement enregistrée pour le bon campus, horaire de culte et groupe. Vous n'avez pas besoin de saisir manuellement la présence des personnes qui utilisent le système d'enregistrement.

## Configurer l'enregistrement

1. **Configurez d'abord votre structure de présence.** Dans B1 Admin, allez dans **Présence > Configuration** et assurez-vous que vos campus, horaires de culte et groupes sont en place. L'application d'enregistrement s'appuie sur cette configuration. Voir [Configuration de la présence](setup.md) pour plus de détails.
2. **Installez l'application B1 Checkin** sur les appareils que vous prévoyez d'utiliser. L'application est disponible sur les plateformes suivantes :
   - **Tablettes Android/Samsung :** [Google Play Store](https://play.google.com/store/apps/details?id=church.b1.checkin)
   - **Tablettes Amazon Fire :** [Amazon App Store](https://www.amazon.com/Live-Church-Solutions-B1-Check-In/dp/B0FW5HKRB5/)
3. **Connectez-vous à l'application B1 Checkin** avec les identifiants du compte de votre église.
4. **Sélectionnez le campus et l'horaire de culte** pour le rassemblement en cours.
5. Les membres peuvent maintenant rechercher leur nom sur l'appareil et s'enregistrer.

:::tip
Placez les appareils d'enregistrement dans des endroits visibles et faciles d'accès comme les entrées du hall ou les bureaux d'accueil. Une brève annonce pendant les cultes aide les membres à savoir que cette option est disponible.
:::

:::tip
Si votre église a plusieurs campus, vous devrez répéter la configuration pour chaque campus dans [Configuration de la présence](setup.md). Chaque appareil d'enregistrement peut être configuré pour un campus différent.
:::

## Matériel recommandé

**Tablettes** — toutes celles-ci fonctionnent bien avec l'application :

- **Compacte :** Samsung Galaxy Tab A7 Lite 8.7"
- **Grand écran :** Samsung Galaxy Tab A8 10.5"
- **Économique :** Amazon Fire HD 10

**Imprimantes** — les enregistrements fonctionnent avec les imprimantes d'étiquettes Brother pour imprimer des badges nominatifs :

- **Meilleur choix :** Brother QL-1110NWB (prend en charge plusieurs tablettes via Bluetooth et WiFi)
- **Bon choix :** Brother QL-810W (prend en charge plusieurs tablettes via WiFi)
- **Économique :** Brother QL-1100 (WiFi uniquement)

**Étiquettes :** Brother DK-1201 (29 mm x 90 mm)

:::warning
Seules les imprimantes d'étiquettes Brother sont compatibles avec l'application B1 Checkin. Les autres marques d'imprimantes ne fonctionneront pas pour l'impression de badges nominatifs.
:::

:::info
Suivez les instructions de configuration de votre imprimante pour la connecter au même réseau WiFi que votre tablette. Vous pouvez trouver les pilotes et guides de configuration des imprimantes Brother sur le [site d'assistance Brother](https://support.brother.com).
:::

## Personnaliser l'apparence de la borne

Vous pouvez personnaliser l'apparence de l'application B1 Checkin pour correspondre à l'image de marque de votre église. Dans B1 Admin, allez dans **Présence > Thème de la borne** pour configurer :

### Couleurs

Personnalisez huit paramètres de couleurs pour correspondre à l'image de marque de votre église :

- **Primaire** et **Contraste primaire** -- Couleur principale de la marque et sa couleur de texte.
- **Secondaire** et **Contraste secondaire** -- Couleur d'accentuation et sa couleur de texte.
- **Arrière-plan de l'en-tête** et **Arrière-plan du sous-en-tête** -- Couleurs pour les zones d'en-tête de la borne.
- **Arrière-plan du bouton** et **Texte du bouton** -- Couleurs pour les boutons interactifs.

### Image d'arrière-plan

Téléchargez une image d'arrière-plan optionnelle pour les écrans d'accueil et de recherche de la borne. La taille recommandée est de 1920x1080 pixels.

### Écran de veille / Économiseur d'écran

Configurez un économiseur d'écran qui s'active après une période d'inactivité :

1. Activez ou désactivez l'écran de veille.
2. Définissez le **délai d'attente** (nombre de secondes d'inactivité avant que l'économiseur d'écran ne se déclenche, minimum 10 secondes).
3. Ajoutez une ou plusieurs **diapositives** -- chaque diapositive a une image et une durée d'affichage (minimum 3 secondes).

:::tip
Utilisez l'écran de veille pour afficher des annonces, des événements à venir ou des messages de bienvenue lorsque la borne n'est pas activement utilisée.
:::

## Inscription des visiteurs par QR Code

La borne d'enregistrement peut afficher un QR code que les visiteurs scannent pour s'inscrire eux-mêmes ainsi que leur famille sur leur propre téléphone. Cela accélère le processus d'enregistrement pour les visiteurs qui viennent pour la première fois.

Lorsqu'un visiteur scanne le QR code, il est dirigé vers une [page d'inscription des visiteurs](../../b1-church/checkin/guest-registration) où il saisit son nom, son adresse e-mail et les membres de sa famille. Un bénévole peut ensuite le rechercher sur la borne et l'enregistrer.

### Activer l'inscription des visiteurs par QR Code

Pour activer l'affichage du QR code :

1. Dans B1 Admin, allez dans **Mobile** dans la barre latérale gauche (icône de téléphone).
2. Sélectionnez l'onglet **Enregistrement**.
3. Activez **Inscription des visiteurs par QR**.

:::note
Ce paramètre se trouve sous **Mobile**, et non sous Présence > Thème de la borne.
:::

## Ce qui est enregistré

Chaque enregistrement crée un enregistrement de présence dans B1 Admin. Vous pouvez consulter ces enregistrements dans les onglets [Présence](tracking-attendance.md) et [Groupes](../groups/group-members.md) exactement comme la présence saisie manuellement. Il n'y a aucune différence dans l'affichage des données — les deux méthodes alimentent les mêmes rapports.
