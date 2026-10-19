---
title: "Enregistrement"
---

# Enregistrement

<div class="article-intro">

B1 Admin prend en charge l'auto-enregistrement aux services grâce à l'application compagnon **B1 Checkin**. Les membres peuvent s'enregistrer eux-mêmes ainsi que leur famille sur des bornes ou des appareils dédiés à leur arrivée, ce qui rend le processus rapide et allège la charge de vos bénévoles. Chaque enregistrement est automatiquement consigné comme présence.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Vos campus, horaires de service et groupes doivent être configurés dans la [Configuration des présences](setup.md).
- Vous avez besoin de [personnes dans votre base de données](../people/adding-people.md) avec des [foyers](../people/adding-people.md#managing-households) configurés afin que les familles puissent s'enregistrer ensemble.
- Il vous faut une tablette et, éventuellement, une imprimante d'étiquettes Brother (voir les [recommandations matérielles](#recommended-hardware) ci-dessous).

</div>

## Fonctionnement

L'application B1 Checkin se connecte à votre configuration des présences dans B1 Admin. Lorsqu'un membre s'enregistre, sa présence est automatiquement enregistrée pour le bon campus, le bon horaire de service et le bon groupe. Vous n'avez pas besoin de saisir manuellement les présences de toute personne qui utilise le système d'enregistrement.

## Configurer l'enregistrement

1. **Commencez par configurer la structure de vos présences.** Dans B1 Admin, allez dans **Personnes > Présences** et cliquez sur **Configuration** pour vous assurer que vos campus, horaires de service et groupes sont en place. L'application d'enregistrement s'appuie sur cette configuration. Vous pouvez aussi attribuer à chaque horaire de service un [calendrier d'enregistrement](setup.md#setting-a-check-in-schedule) afin que l'enregistrement s'ouvre et se ferme automatiquement chaque semaine. Les calendriers utilisent le fuseau horaire de votre église, ou celui de votre campus si l'église n'en a pas défini ; la borne masque les horaires de service dont la fenêtre est fermée et indique aux familles quand l'enregistrement n'est pas encore ouvert. Consultez la [Configuration des présences](setup.md) pour plus de détails.
2. **Installez l'application B1 Checkin** sur les appareils que vous comptez utiliser. L'application est disponible sur les plateformes suivantes :
   - **iPad/iOS :** [Apple App Store](https://apps.apple.com/us/app/b1-church-check-in/id6775081998)
   - **Tablettes Android/Samsung :** [Google Play Store](https://play.google.com/store/apps/details?id=church.b1.checkin)
   - **Tablettes Amazon Fire :** [Amazon App Store](https://www.amazon.com/Live-Church-Solutions-B1-Check-In/dp/B0FW5HKRB5/)
3. **Connectez-vous à l'application B1 Checkin** avec les identifiants du compte de votre église.
4. **Sélectionnez le campus et l'horaire de service** du rassemblement en cours.
5. Les membres peuvent désormais rechercher leur nom sur l'appareil et s'enregistrer.

:::tip
Placez les appareils d'enregistrement dans des endroits visibles et faciles d'accès, comme l'entrée du hall ou les tables d'accueil. Une brève annonce pendant les services aide les membres à savoir que cette option est disponible.
:::

:::tip
Si votre église compte plusieurs campus, vous devrez répéter la configuration pour chaque campus dans la [Configuration des présences](setup.md). Chaque appareil d'enregistrement peut être configuré pour un campus différent.
:::

## Matériel recommandé {#recommended-hardware}

**Tablettes** -- l'une de ces options fonctionne bien avec l'application :

- **Compacte :** Samsung Galaxy Tab A7 Lite 8,7"
- **Grand écran :** Samsung Galaxy Tab A8 10,5"
- **Économique :** Amazon Fire HD 10

**Imprimantes** -- les enregistrements fonctionnent avec les imprimantes d'étiquettes Brother pour imprimer les badges :

- **Meilleure :** Brother QL-1110NWB (prend en charge plusieurs tablettes via Bluetooth et Wi-Fi)
- **Bonne :** Brother QL-810W (prend en charge plusieurs tablettes via Wi-Fi)
- **Économique :** Brother QL-1100 (Wi-Fi uniquement)

**Étiquettes :** Brother DK-1201 (1-1/7" x 3-1/2")

:::warning
Seules les imprimantes d'étiquettes Brother sont compatibles avec l'application B1 Checkin. Les imprimantes d'autres marques ne fonctionneront pas pour imprimer les badges.
:::

:::info
Suivez les instructions de configuration de votre imprimante pour la connecter au même réseau Wi-Fi que votre tablette. Vous trouverez les pilotes et guides d'installation des imprimantes Brother sur le [site d'assistance Brother](https://support.brother.com).
:::

## Personnaliser l'apparence de la borne

Vous pouvez personnaliser l'aspect de l'application B1 Checkin pour l'adapter à l'identité visuelle de votre église. Dans B1 Admin, allez dans **Mobile > B1 CheckIn** et utilisez la carte **Thème de la borne** pour configurer :

### Couleurs

Personnalisez les huit paramètres de couleur pour les adapter à l'identité de votre église :

- **Principale** et **Contraste principal** -- Couleur principale de la marque et sa couleur de texte.
- **Secondaire** et **Contraste secondaire** -- Couleur d'accent et sa couleur de texte.
- **Fond de l'en-tête** et **Fond du sous-en-tête** -- Couleurs des zones d'en-tête de la borne.
- **Fond des boutons** et **Texte des boutons** -- Couleurs des boutons interactifs.

### Image de fond

Importez une image de fond facultative pour les écrans d'accueil et de recherche de la borne. La taille recommandée est de 1920x1080 pixels.

### Écran de veille

Configurez un économiseur d'écran qui s'active après une période d'inactivité :

1. Activez ou désactivez l'écran de veille.
2. Définissez le **délai** (le nombre de secondes d'inactivité avant le lancement de l'économiseur, 10 secondes minimum).
3. Ajoutez une ou plusieurs **diapositives** -- chaque diapositive comporte une image et une durée d'affichage (3 secondes minimum).

:::tip
Utilisez l'écran de veille pour afficher des annonces, les prochains événements ou des messages de bienvenue lorsque la borne n'est pas utilisée.
:::

## Inscription des visiteurs par code QR

La borne d'enregistrement peut afficher un code QR que les visiteurs scannent pour s'inscrire eux-mêmes ainsi que leur famille sur leur propre téléphone. Cela accélère l'enregistrement des visiteurs qui viennent pour la première fois.

Lorsqu'un visiteur scanne le code QR, il est dirigé vers une [page d'inscription des visiteurs](../../b1-church/checkin/guest-registration) où il saisit son nom, son e-mail et les membres de sa famille. Un bénévole peut ensuite le rechercher sur la borne et l'enregistrer.

### Activer l'inscription des visiteurs par code QR

Pour activer l'affichage du code QR :

1. Dans B1 Admin, ouvrez le [menu Accès rapide](../introduction.md#getting-around-with-the-jump-menu) (la barre de recherche en haut à gauche) et développez **Mobile**.
2. Cliquez sur **B1 CheckIn**.
3. Activez **Inscription des visiteurs par QR** puis cliquez sur **Enregistrer**.

:::note
Ce paramètre se trouve dans **Mobile > B1 CheckIn** (la même page que la carte **Thème de la borne**), et non dans Présences. L'action **Borne** sur la page Présences contient un lien vers cette page.
:::

### Partager le lien d'inscription

Une fois l'inscription des visiteurs par QR activée, une section **Partager le code QR d'inscription** apparaît sous l'interrupteur. Elle vous offre deux moyens, en plus du code QR de la borne, de faire parvenir les visiteurs au formulaire d'inscription :

- **Copier le lien** -- copie l'URL d'inscription pour que vous puissiez la coller sur le site web de votre église, dans des e-mails ou partout en ligne.
- **Télécharger le PNG** -- télécharge le code QR sous forme d'image que vous pouvez imprimer sur des tracts, des bulletins ou une signalétique.

:::tip
Ajoutez le lien d'inscription à la page « Planifiez votre visite » ou « Je suis nouveau » du site web de votre église afin que les visiteurs puissent s'inscrire avant même d'arriver.
:::

## Ce qui est enregistré

Chaque enregistrement crée une fiche de présence dans B1 Admin. Vous pouvez consulter ces fiches sur la page [Présences](tracking-attendance.md) et dans les [sessions de chaque groupe](../groups/group-members.md), exactement comme les présences saisies manuellement. Les données s'affichent de la même façon quel que soit le mode de saisie : les deux méthodes alimentent les mêmes rapports.
