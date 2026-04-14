---
title: "Accueil"
---

# Accueil

<div class="article-intro">

B1 Admin supporte l'accueil automatisé aux services grâce à l'application compagne **B1 Checkin**. Les membres peuvent se pointer eux-mêmes et leur famille aux bornes ou appareils dédiés à leur arrivée, ce qui accélère le processus et réduit la charge de travail de vos bénévoles. Chaque accueil est automatiquement enregistré comme présence.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Vos campus, heures de service et groupes doivent être configurés dans [Configuration de la présence](setup.md).
- Vous devez avoir [des personnes dans votre base de données](../people/adding-people.md) avec [des ménages](../people/adding-people.md#managing-households) configurés pour que les familles puissent s'accueillir ensemble.
- Vous aurez besoin d'une tablette et optionnellement d'une imprimante Brother (voir [recommandations de matériel](#recommended-hardware) ci-dessous).

</div>

## Comment ça fonctionne

L'application B1 Checkin se connecte à votre configuration de présence B1 Admin. Lorsqu'un membre s'accueille, sa présence est automatiquement enregistrée par rapport au campus, à l'heure de service et au groupe appropriés. Vous n'avez pas besoin d'entrer la présence manuellement pour quiconque utilise le système d'accueil.

## Configuration de l'accueil

1. **Configurez d'abord votre structure de présence.** Dans B1 Admin, allez à **Présence > Configuration** et assurez-vous que vos campus, heures de service et groupes sont en place. L'application d'accueil dépend de cette configuration. Voir [Configuration de la présence](setup.md) pour les détails.
2. **Installez l'application B1 Checkin** sur les appareils que vous envisagez d'utiliser. L'application est disponible sur les plateformes suivantes :
   - **Tablettes Android/Samsung :** [Google Play Store](https://play.google.com/store/apps/details?id=church.b1.checkin)
   - **Tablettes Amazon Fire :** [Amazon App Store](https://www.amazon.com/Live-Church-Solutions-B1-Check-In/dp/B0FW5HKRB5/)
3. **Connectez-vous à l'application B1 Checkin** en utilisant les identifiants de compte de votre église.
4. **Sélectionnez le campus et l'heure de service** pour la réunion actuelle.
5. Les membres peuvent maintenant chercher leur nom sur l'appareil et s'accueillir.

:::tip
Placez les appareils d'accueil à des endroits visibles et faciles d'accès comme l'entrée du hall ou le pupitre d'accueil. Une brève annonce pendant les services aide les membres à savoir que l'option est disponible.
:::

:::tip
Si votre église a plusieurs campus, vous devrez répéter la configuration pour chaque campus dans [Configuration de la présence](setup.md). Chaque appareil d'accueil peut être configuré pour un campus différent.
:::

## Matériel recommandé

**Tablettes** — n'importe lequel de ceux-ci fonctionne bien avec l'application :

- **Compact :** Samsung Galaxy Tab A7 Lite 8,7"
- **Grand écran :** Samsung Galaxy Tab A8 10,5"
- **Budget :** Amazon Fire HD 10

**Imprimantes** — les accueils fonctionnent avec les imprimantes Brother pour imprimer les étiquettes nominatives :

- **Meilleur :** Brother QL-1110NWB (supporte plusieurs tablettes via Bluetooth et WiFi)
- **Bon :** Brother QL-810W (supporte plusieurs tablettes via WiFi)
- **Budget :** Brother QL-1100 (WiFi uniquement)

**Étiquettes :** Brother DK-1201 (1-1/7" x 3-1/2")

:::warning
Seules les imprimantes Brother sont compatibles avec l'application B1 Checkin. Les autres marques d'imprimantes ne fonctionneront pas pour imprimer les étiquettes nominatives.
:::

:::info
Suivez les instructions de configuration de votre imprimante pour la connecter au même réseau WiFi que votre tablette. Vous pouvez trouver les pilotes et guides de configuration Brother sur le [site de support Brother](https://support.brother.com).
:::

## Personnalisation de l'apparence de la borne

Vous pouvez personnaliser l'apparence de l'application B1 Checkin pour correspondre à l'image de marque de votre église. Dans B1 Admin, allez à **Présence > Thème de borne** pour configurer :

### Couleurs

Personnalisez huit paramètres de couleur pour correspondre à votre image de marque d'église :

- **Principal** et **Contraste principal** -- Couleur de marque principale et sa couleur de texte.
- **Secondaire** et **Contraste secondaire** -- Couleur d'accent et sa couleur de texte.
- **Arrière-plan d'en-tête** et **Arrière-plan de sous-en-tête** -- Couleurs pour les zones d'en-tête de la borne.
- **Arrière-plan du bouton** et **Texte du bouton** -- Couleurs pour les boutons interactifs.

### Image de fond

Téléchargez une image de fond optionnelle pour les écrans d'accueil et de recherche de la borne. La taille recommandée est 1920x1080 pixels.

### Écran inactif / Économiseur d'écran

Configurez un économiseur d'écran qui s'active après une période d'inactivité :

1. Activez ou désactivez l'écran inactif.
2. Réglez le **délai d'attente** (nombre de secondes d'inactivité avant le démarrage de l'économiseur d'écran, minimum 10 secondes).
3. Ajoutez une ou plusieurs **diapositives** -- chaque diapositive a une image et une durée d'affichage (minimum 3 secondes).

:::tip
Utilisez l'écran inactif pour afficher des annonces, des événements à venir ou des messages de bienvenue lorsque la borne n'est pas activement utilisée.
:::

## Enregistrement des invités via code QR

La borne d'accueil peut afficher un code QR que les visiteurs scannent pour s'enregistrer eux-mêmes et leur famille sur leur propre téléphone. Cela accélère le processus d'accueil pour les premiers visiteurs.

Lorsqu'un invité scanne le code QR, il est dirigé vers une [page d'enregistrement des invités](../../b1-church/checkin/guest-registration) où il entre son nom, son e-mail et les membres de sa famille. Un bénévole peut alors le chercher sur la borne et l'accueillir.

### Activation de l'enregistrement des invités par code QR

Pour activer l'affichage du code QR :

1. Dans B1 Admin, allez à **Mobile** dans la barre latérale gauche (icône téléphone).
2. Sélectionnez l'onglet **Accueil**.
3. Basculez **Enregistrement des invités par code QR** sur activé.

:::note
Ce paramètre se trouve sous **Mobile**, pas sous Présence > Thème de borne.
:::

## Ce qui est enregistré

Chaque accueil crée un enregistrement de présence dans B1 Admin. Vous pouvez voir ces enregistrements dans les onglets [Présence](tracking-attendance.md) et [Groupes](../groups/group-members.md) tout comme la présence saisie manuellement. Il n'y a aucune différence dans la façon dont les données apparaissent -- les deux méthodes alimentent les mêmes rapports.
