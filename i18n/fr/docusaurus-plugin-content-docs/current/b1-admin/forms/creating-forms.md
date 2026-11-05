---
title: "Créer des formulaires"
---

# Créer des formulaires

<div class="article-intro">

Créez des formulaires personnalisés pour recueillir des renseignements auprès de votre communauté. Vous pouvez créer des formulaires pour les inscriptions aux événements, les sondages, les fiches de visiteurs, les demandes d'adhésion et plus encore. Les formulaires peuvent être liés à des personnes de votre base de données ou utilisés comme pages autonomes, avec leur propre adresse web publique.

</div>

## Vidéo de formation

<YouTube id="sr9wxEj9ghQ" title="Créer des formulaires et gérer les soumissions dans B1" next="Lancer le site web de votre église dans B1" nextUrl="/docs/b1-admin/guides/launch-website" />

<div class="prereqs">
<h4>Avant de commencer</h4>

- Pour les formulaires de type **Personnes** (liés aux fiches des personnes), vous devez d'abord avoir [des personnes dans votre base de données](../people/adding-people.md).
- Pour les formulaires qui recueillent des **paiements**, vous devez avoir [configuré Stripe pour les dons en ligne](../donations/online-giving-setup.md).

</div>

## Créer un nouveau formulaire

1. Ouvrez le [menu de navigation rapide](../introduction.md#getting-around-with-the-jump-menu) (la barre de recherche en haut à gauche de B1 Admin), développez **Personnes**, puis cliquez sur **Formulaires**.
2. Cliquez sur **Ajouter un formulaire**.
3. Saisissez un **nom** pour votre formulaire.
4. Choisissez le type de formulaire dans la liste déroulante **Associer à** :
   - **Personnes** -- Associe les soumissions aux [fiches des personnes](../people/adding-people.md) de votre base de données. Les formulaires de personnes se remplissent à partir de la fiche d'une personne ; ils n'ont donc pas de lien à partager.
   - **Autonome** -- Crée un formulaire indépendant avec sa propre adresse web publique, idéal pour les inscriptions externes. Seuls les formulaires autonomes proposent une [photo d'en-tête](#adding-a-header-photo), un [code QR](#sharing-a-form-with-a-qr-code), un [groupe lié](#linking-a-form-to-a-group) et l'option **Créer une fiche de personne à partir des soumissions**.
5. Cliquez sur **Enregistrer** pour créer le formulaire.

Votre nouveau formulaire apparaîtra dans la liste. Cliquez dessus pour commencer à ajouter des questions.

## Imprimer un formulaire vierge {#printing-a-blank-form}

Besoin d'une copie papier à distribuer -- pour une fiche de visiteur au comptoir d'accueil, ou un formulaire qu'une personne sans accès à Internet pourra remplir à la main ? Cliquez sur **Imprimer** à côté d'un formulaire dans la liste principale des formulaires pour ouvrir un aperçu, puis cliquez sur **Imprimer**. Les champs vierges s'impriment avec une ligne ou une case pour chaque question afin que les personnes puissent les remplir à la main ; les questions obligatoires sont marquées d'un astérisque. Le haut de la page affiche le logo de votre église (le **logo pour fond clair** de [Site web > Apparence](../website/appearance.md), si vous en avez téléversé un), suivi du nom de votre église, puis du nom du formulaire. Il n'existe aucune autre option d'impression : vous imprimez le formulaire complet ou rien.

## Partager un formulaire avec un code QR {#sharing-a-form-with-a-qr-code}

Les formulaires autonomes ont un lien **Code QR** à côté d'eux dans la liste principale des formulaires (les formulaires archivés n'en ont pas). Cliquez dessus pour ouvrir un code QR menant à l'adresse web publique du formulaire, avec le lien affiché en dessous. Cliquez sur **Télécharger le PNG** pour enregistrer le code sous forme d'image que vous pouvez imprimer sur les bulletins ou afficher sur des diapositives. Quiconque le numérise ouvre le formulaire sur son téléphone.

## Ajouter des questions {#adding-questions}

1. Ouvrez votre formulaire et allez à l'onglet **Questions**.
2. Cliquez sur **Ajouter une question**.
3. Sélectionnez un **type de champ** dans la liste déroulante Fournisseur. Les types disponibles incluent :
   - **Zone de texte** -- Pour des réponses courtes
   - **Date** -- Pour la sélection de dates
   - **Courriel** -- Pour les adresses courriel
   - **Numéro de téléphone** -- Pour la saisie de numéros de téléphone
   - **Choix multiple** -- Pour choisir parmi des options prédéfinies
   - **Paiement** -- Pour recueillir des paiements
4. Saisissez un **titre** et une **description** facultative pour la question. La description apparaît sous la question lorsque les personnes remplissent le formulaire ; utilisez-la pour donner des indications comme « Indiquez toute allergie que nous devrions connaître. »
5. Cochez **Exiger une réponse** si le champ est obligatoire.
6. Cliquez sur **Enregistrer**.
7. Répétez l'opération pour ajouter d'autres questions.

:::warning
Le type de champ **Paiement** exige que Stripe soit configuré. Si vous n'avez pas encore configuré les dons en ligne, consultez [Configuration des dons en ligne](../donations/online-giving-setup.md) avant d'ajouter des champs de paiement. Les personnes qui paient sur un formulaire sans se connecter doivent cocher la case **Je ne suis pas un robot** avant que la carte soit acceptée.
:::

## Gérer les membres du formulaire {#managing-form-members}

1. Ouvrez votre formulaire et allez à l'onglet **Membres du formulaire**.
2. Recherchez une personne et ajoutez-la avec un rôle :
   - **Administrateur** -- Peut modifier le formulaire et voir toutes les soumissions.
   - **Lecture seule** -- Peut voir les soumissions, mais ne peut pas modifier le formulaire.

## Lier un formulaire à un groupe {#linking-a-form-to-a-group}

Vous pouvez lier n'importe quel formulaire autonome à un groupe -- par exemple, un formulaire de demande de prière pour un petit groupe, ou une autorisation médicale pour un voyage de jeunes :

1. Ouvrez les **Détails** de votre formulaire.
2. Sous **Groupe lié**, sélectionnez le groupe, ou laissez la valeur **Aucun**.
3. Cliquez sur **Enregistrer**.

Une fois un formulaire lié :

- Les **membres du groupe** voient le formulaire dans une section **Formulaires** de la page du groupe sur B1.church tant qu'il est ouvert, avec un bouton **Remplir** qui l'ouvre (voir [Détails du groupe](../../b1-church/groups/group-details.md#linked-forms)).
- Les **responsables de groupe** voient aussi les formulaires fermés, et peuvent lire les réponses de chaque soumission et les imprimer (une soumission ou **Tout imprimer**). Les responsables peuvent seulement consulter les réponses -- ils ne peuvent pas modifier le formulaire, sauf s'ils sont aussi [membres du formulaire](#managing-form-members).
- **Dans B1 Admin**, la page du groupe affiche une section **Formulaires liés** qui liste chaque formulaire lié comme **Ouvert** ou **Fermé**. Elle apparaît pour les responsables du groupe et pour les personnes qui peuvent administrer les formulaires. Voir [Membres du groupe](../groups/group-members.md#linked-forms).

Un formulaire est fermé lorsqu'il se trouve en dehors de sa période de disponibilité. Les formulaires archivés ne sont pas affichés sur la page du groupe.

### Ajouter automatiquement les personnes qui soumettent au groupe {#automatically-adding-submitters-to-a-group}

Lier un formulaire à un groupe n'ajoute personne au groupe à lui seul. Pour ajouter chaque personne qui soumet le formulaire à la liste du groupe lié, activez aussi **Créer une fiche de personne à partir des soumissions** dans les détails du formulaire, puis cliquez sur **Enregistrer**.

Chaque fois qu'une personne soumet le formulaire, la personne correspondante ou nouvellement créée est ajoutée au groupe (les membres déjà présents sont ignorés). Cela est utile, par exemple, pour un formulaire d'inscription à un camp qui doit créer automatiquement la liste du groupe du camp.

### Envoyer un courriel de suivi {#sending-a-follow-up-email}

Avec l'option **Créer une fiche de personne à partir des soumissions** activée, vous pouvez aussi envoyer un courriel à chaque personne qui soumet le formulaire. Remplissez **Objet du courriel de suivi** et **Corps du courriel de suivi** dans les détails du formulaire. Vous pouvez utiliser les jetons `{firstName}` et `{churchName}` dans les deux champs. Le courriel n'est envoyé que lorsque les deux champs sont remplis.

:::info
Les courriels de suivi ne sont envoyés qu'après l'approbation de votre église pour l'envoi de courriels de groupe, et ils comptent dans la limite quotidienne de courriels de votre église. Voir [Activer les courriels de groupe pour votre église](../groups/group-members.md#turning-on-group-email-for-your-church).
:::

## Dupliquer un formulaire

Pour réutiliser un formulaire comme point de départ d'un nouveau, cliquez sur **Dupliquer** à côté du formulaire dans la liste des formulaires, puis confirmez. B1 crée une copie exacte du formulaire -- y compris toutes les questions -- que vous pouvez ensuite renommer et modifier indépendamment.

:::tip
La duplication est pratique pour les événements récurrents dont les questions d'inscription restent les mêmes d'une année à l'autre. Dupliquez le formulaire de l'an dernier, mettez à jour le nom et les dates, et vous êtes prêt.
:::

## Configurer les propriétés du formulaire

Vous pouvez modifier le nom et les paramètres de votre formulaire à tout moment. Pour les formulaires autonomes, vous verrez aussi une **adresse web publique** unique que vous pouvez partager avec n'importe qui, ainsi qu'un champ **Description** -- un texte affiché au-dessus des questions sur la page publique du formulaire, utile pour expliquer à quoi sert le formulaire avant que les personnes ne commencent à le remplir.

### Ajouter une photo d'en-tête {#adding-a-header-photo}

Les formulaires autonomes peuvent afficher une **photo d'en-tête** en haut du formulaire. Dans les détails du formulaire, cliquez sur la zone photo ou sur **Ajouter une photo**, puis choisissez ou téléversez une image (elle est recadrée au format 16:9). Cliquez sur **Enregistrer**. La photo apparaît sous le nom du formulaire, au-dessus de la description, sur la page de l'adresse web publique du formulaire et partout où le formulaire est intégré à l'aide de l'élément **Formulaire** du site web. Utilisez **Changer la photo** pour la remplacer ou **Retirer** pour la supprimer.

Utilisez le champ **Message de remerciement** pour définir ce que les personnes voient après avoir soumis le formulaire, y compris sur la page de l'adresse web publique du formulaire. Si vous le laissez vide, elles voient « Merci d'avoir soumis le formulaire ! »

:::tip
Les formulaires autonomes conviennent parfaitement aux inscriptions à des événements. Partagez l'adresse web publique par courriel ou sur les réseaux sociaux, ou intégrez directement le formulaire sur le site web de votre église.
:::

:::info
Pour intégrer un formulaire sur votre site web B1, ouvrez l'éditeur de votre site, ajoutez une nouvelle section et sélectionnez l'élément **Formulaire**. Choisissez ensuite le formulaire à afficher. Consultez [Gérer les pages](../website/managing-pages.md) pour plus de détails sur la modification de votre site web.
:::
