---
title: "Enregistrement"
---

# Enregistrement

<div class="article-intro">

B1 Admin supporte l'auto-enregistrement aux services par le biais de l'application complémentaire **B1 Checkin**. Les membres peuvent s'enregistrer eux-mêmes et leurs familles aux kiosques ou sur des appareils dédiés à leur arrivée, ce qui accélère le processus et réduit la charge de travail de vos bénévoles. Chaque enregistrement est automatiquement enregistré comme une présence.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Vos campus, les heures de service et les groupes doivent être configurés dans [Configuration de la présence](setup.md).
- Vous avez besoin de [personnes dans votre base de données](../people/adding-people.md) avec [ménages](../people/adding-people.md#managing-households) configurés pour que les familles puissent s'enregistrer ensemble.
- Vous aurez besoin d'une tablette et éventuellement d'une imprimante d'étiquettes Brother (voir [recommandations matériel](#recommended-hardware) ci-dessous).

</div>

## Comment ça marche

L'application B1 Checkin se connecte à votre configuration de présence B1 Admin. Quand un membre s'enregistre, sa présence est automatiquement enregistrée par rapport au campus, à l'heure de service et au groupe corrects. Vous n'avez pas besoin d'entrer les présences manuellement pour quiconque utilise le système d'enregistrement.

## Configuration de l'enregistrement

1. **Configurez d'abord votre structure de présence.** Dans B1 Admin, allez à **Présence > Configuration** et assurez-vous que vos campus, heures de service et groupes sont en place. L'application d'enregistrement dépend de cette configuration. Voir [Configuration de la présence](setup.md) pour les détails.
2. **Installez l'application B1 Checkin** sur les appareils que vous prévoyez d'utiliser. L'application est disponible sur les plates-formes suivantes :
   - **iPad/iOS :** [Apple App Store](https://apps.apple.com/us/app/b1-church-check-in/id6775081998)
   - **Android/Samsung Tablets :** [Google Play Store](https://play.google.com/store/apps/details?id=church.b1.checkin)
   - **Amazon Fire Tablets :** [Amazon App Store](https://www.amazon.com/Live-Church-Solutions-B1-Check-In/dp/B0FW5HKRB5/)
3. **Connectez-vous à l'application B1 Checkin** avec vos identifiants de compte d'église.
4. **Sélectionnez le campus et l'heure de service** pour le rassemblement actuel.
5. Les membres peuvent maintenant rechercher leur nom sur l'appareil et s'enregistrer.

:::tip
Placez les appareils d'enregistrement dans des emplacements visibles et faciles d'accès, comme les entrées du hall ou les bureaux d'accueil. Une courte annonce pendant les services aide les membres à savoir que l'option est disponible.
:::

:::tip
Si votre église a plusieurs campus, vous devrez répéter la configuration pour chaque campus dans [Configuration de la présence](setup.md). Chaque appareil d'enregistrement peut être configuré pour un campus différent.
:::

## Matériel recommandé

**Tablettes** — l'une de ces fonctionnent bien avec l'application :

- **Compacte :** Samsung Galaxy Tab A7 Lite 8,7"
- **Grand écran :** Samsung Galaxy Tab A8 10,5"
- **Budget :** Amazon Fire HD 10

**Imprimantes** — les enregistrements fonctionnent avec les imprimantes d'étiquettes Brother pour imprimer les badges :

- **Meilleure :** Brother QL-1110NWB (supporte plusieurs tablettes via Bluetooth et WiFi)
- **Bien :** Brother QL-810W (supporte plusieurs tablettes via WiFi)
- **Budget :** Brother QL-1100 (WiFi uniquement)

**Étiquettes :** Brother DK-1201 (1-1/7" x 3-1/2")

:::warning
Seules les imprimantes d'étiquettes Brother sont compatibles avec l'application B1 Checkin. Les autres marques d'imprimantes ne fonctionneront pas pour imprimer les badges.
:::

:::info
Suivez les instructions de configuration de votre imprimante pour la connecter au même réseau WiFi que votre tablette. Vous pouvez trouver les pilotes d'imprimante Brother et les guides de configuration sur le [site d'assistance Brother](https://support.brother.com).
:::

## Personnalisation de l'apparence du kiosque

Vous pouvez personnaliser l'apparence de l'application B1 Checkin pour correspondre à la marque de votre église. Dans B1 Admin, allez à **Mobile > B1 CheckIn** et utilisez la carte **Thème du kiosque** pour configurer :

### Couleurs

Personnalisez huit paramètres de couleur pour correspondre à la marque de votre église :

- **Principal** et **Contraste principal** -- Couleur de marque principale et sa couleur de texte.
- **Secondaire** et **Contraste secondaire** -- Couleur d'accent et sa couleur de texte.
- **Couleur d'arrière-plan de l'en-tête** et **Couleur d'arrière-plan du sous-en-tête** -- Couleurs pour les zones d'en-tête du kiosque.
- **Couleur d'arrière-plan du bouton** et **Couleur du texte du bouton** -- Couleurs pour les boutons interactifs.

### Image d'arrière-plan

Téléchargez une image d'arrière-plan facultative pour l'accueil et les écrans de recherche du kiosque. La taille recommandée est de 1920x1080 pixels.

### Écran inactif / Économiseur d'écran

Configurez un économiseur d'écran qui s'active après une période d'inactivité :

1. Activez ou désactivez l'écran inactif.
2. Réglez le **délai d'attente** (nombre de secondes d'inactivité avant le démarrage de l'économiseur d'écran, minimum 10 secondes).
3. Ajoutez une ou plusieurs **diapositives** -- chaque diapositive a une image et une durée d'affichage (minimum 3 secondes).

:::tip
Utilisez l'écran inactif pour afficher des annonces, les événements à venir ou les messages de bienvenue lorsque le kiosque n'est pas activement utilisé.
:::

## Enregistrement des visiteurs via code QR

Le kiosque d'accueil peut afficher un code QR que les visiteurs scannent pour s'enregistrer, eux et leur famille, sur leur propre téléphone. Cela accélère le processus d'accueil pour les nouveaux visiteurs.

Lorsqu'un visiteur scanne le code QR, il est redirigé vers une [page d'enregistrement des visiteurs](../../b1-church/checkin/guest-registration) où il entre son nom, son e-mail et les membres de sa famille. Un bénévole peut alors les rechercher sur le kiosque et les enregistrer.

### Activation de l'enregistrement des visiteurs par code QR

Pour activer l'affichage du code QR :

1. Dans B1 Admin, ouvrez le [menu Sauter](../introduction.md#getting-around-with-the-jump-menu) (la barre de recherche en haut à gauche) et développez **Mobile**.
2. Cliquez sur **B1 CheckIn**.
3. Activez **Enregistrement des visiteurs par code QR** et cliquez sur **Enregistrer**.

:::note
Ce paramètre se trouve sous **Mobile > B1 CheckIn** (la même page que la carte **Thème du kiosque**), pas sous Présence.
:::

### Partage du lien d'enregistrement

Une fois l'enregistrement des visiteurs par code QR activé, une section **Partager le code QR d'enregistrement** apparaît sous le curseur. Cela vous donne deux façons de diriger les visiteurs vers le formulaire d'enregistrement en plus du code QR du kiosque :

- **Copier le lien** -- copie l'URL d'enregistrement pour que vous puissiez la coller sur le site Web de votre église, dans les e-mails ou n'importe où en ligne.
- **Télécharger PNG** -- télécharge le code QR sous forme d'image que vous pouvez imprimer sur des dépliants, des bulletins ou des panneaux.

:::tip
Ajoutez le lien d'enregistrement à la page "Planifier votre visite" ou "Je suis nouveau" de votre site Web afin que les visiteurs puissent s'enregistrer avant même d'arriver.
:::

## Ce qui est enregistré

Chaque enregistrement crée un dossier de présence dans B1 Admin. Vous pouvez consulter ces dossiers sur les onglets [Présence](tracking-attendance.md) et [Groupes](../groups/group-members.md) tout comme les présences saisies manuellement. Il n'y a aucune différence dans la façon dont les données apparaissent -- les deux méthodes alimentent les mêmes rapports.
