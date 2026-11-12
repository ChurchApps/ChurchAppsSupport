---
title: "Créer des formulaires"
description: "Créez des formulaires personnalisés dans B1 Admin pour les inscriptions aux événements, les sondages et les cartes de visiteur, puis partagez-les par lien, code QR ou impression."
---

# Créer des formulaires

<div class="article-intro">

Créez des formulaires personnalisés pour recueillir des informations auprès de votre communauté. Vous pouvez créer des formulaires pour les inscriptions aux événements, les sondages, les cartes de visiteur, les demandes d'adhésion et bien plus encore. Les formulaires peuvent être liés aux personnes de votre base de données ou utilisés comme pages autonomes avec leur propre adresse web publique.

</div>

## Vidéo de formation {#training-video}

<YouTube id="UZ4dGCNIFw4" title="Créer des formulaires et gérer les soumissions dans B1" next="Lancer votre site web d'église dans B1" nextUrl="/docs/b1-admin/guides/launch-website" />

<div class="prereqs">
<h4>Avant de commencer</h4>

- Pour les formulaires **Personnes** (liés aux fiches personnes), vous devez d'abord avoir [des personnes dans votre base de données](../people/adding-people.md).
- Pour les formulaires qui recueillent des **paiements**, vous devez avoir [configuré Stripe pour les dons en ligne](../donations/online-giving-setup.md).

</div>

## Créer un nouveau formulaire {#creating-a-new-form}

1. Ouvrez le [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (la barre de recherche en haut à gauche de B1 Admin), développez **Personnes** et cliquez sur **Formulaires**.
2. Cliquez sur **Ajouter un formulaire**.
3. Saisissez un **nom** pour votre formulaire.
4. Choisissez le type de formulaire dans la liste déroulante **Associer à** :
   - **Personnes** — Associe les soumissions aux [fiches personnes](../people/adding-people.md) de votre base de données. Les formulaires Personnes se remplissent à partir de la fiche d'une personne ; ils n'ont donc pas de lien partageable.
   - **Autonome** — Crée un formulaire indépendant avec sa propre adresse web publique, idéal pour les inscriptions externes. Seuls les formulaires Autonomes proposent une [photo d'en-tête](#adding-a-header-photo), un [code QR](#sharing-a-form-with-a-qr-code), un [groupe lié](#linking-a-form-to-a-group) et l'option **Créer une fiche personne à partir des soumissions**.
5. Pour un formulaire Autonome, vous pouvez renseigner dès maintenant le reste de ses [propriétés](#configuring-form-properties), ou plus tard.
6. Cliquez sur **Enregistrer** pour créer le formulaire.

Votre nouveau formulaire apparaîtra dans la liste. Cliquez dessus pour commencer à ajouter des questions.

## Imprimer un formulaire vierge {#printing-a-blank-form}

Vous avez besoin d'une copie papier à distribuer -- pour une carte de visiteur au bureau d'accueil, ou un formulaire qu'une personne sans accès à Internet pourra remplir à la main ? Cliquez sur **Imprimer** à côté d'un formulaire dans la liste principale des Formulaires pour ouvrir un aperçu, puis cliquez sur **Imprimer**. Les champs vierges s'impriment avec un trait de soulignement ou une case à cocher pour chaque question afin que les personnes puissent les remplir à la main ; les questions obligatoires sont marquées d'un astérisque. En haut de la page figurent le logo de votre église (le **logo pour fond clair** de [Site web > Apparence](../website/appearance.md), si vous en avez téléversé un) avec le nom de votre église en dessous, puis le nom du formulaire. Il n'y a pas d'autres options d'impression -- vous imprimez le formulaire complet ou rien.

## Partager un formulaire avec un code QR {#sharing-a-form-with-a-qr-code}

Les formulaires Autonomes ont un lien **Code QR** à côté d'eux dans la liste principale des Formulaires (les formulaires archivés n'en ont pas). Cliquez dessus pour ouvrir un code QR pointant vers l'adresse web publique du formulaire, avec le lien affiché en dessous. Cliquez sur **Télécharger le PNG** pour enregistrer le code sous forme d'image que vous pouvez imprimer sur les feuillets dominicaux ou afficher sur des diapositives. Quiconque le scanne ouvre le formulaire sur son téléphone.

## Ajouter des questions {#adding-questions}

1. Ouvrez votre formulaire et accédez à l'onglet **Questions**.
2. Cliquez sur **Ajouter une question**.
3. Sélectionnez un **Type de champ** :
   - **Zone de texte** — Pour de courtes réponses textuelles
   - **Nombre entier** et **Décimal** — Pour les nombres
   - **Date** — Pour la sélection de dates
   - **Oui/Non** — Pour une réponse par oui ou par non
   - **Courriel** — Pour les adresses courriel
   - **Numéro de téléphone** — Pour la saisie d'un numéro de téléphone
   - **Zone de texte long** — Pour les réponses plus longues
   - **Choix multiple** — Pour choisir une option parmi plusieurs
   - **Case à cocher** — Pour cocher autant d'options que souhaité
   - **Paiement** — Pour recueillir des paiements
4. Saisissez un **Titre** et une **Description** facultative pour la question. La description s'affiche sous la question lorsque les personnes remplissent le formulaire ; utilisez-la pour donner des indications comme « Indiquez les allergies que nous devrions connaître. »
5. Remplissez les champs supplémentaires selon le type choisi :
   - Pour les questions de texte, de nombre, de date, de courriel et de téléphone, un **Texte indicatif** facultatif affiche un exemple de texte dans la case vide.
   - Pour **Choix multiple** et **Case à cocher**, ajoutez chaque option sous **Choix** : saisissez une **Valeur** (ce qui est enregistré) et un **Texte** (ce que voient les personnes), puis cliquez sur le bouton d'ajout. Cliquez sur l'icône de retrait pour supprimer une option.
   - Pour **Paiement**, choisissez le **Fonds** qui reçoit l'argent et le **Montant**.
6. Cochez **Exiger une réponse pour cette question** si le champ est obligatoire. (Les questions de paiement n'ont pas cette option.)
7. Cliquez sur **Enregistrer**.
8. Répétez l'opération pour ajouter d'autres questions.

L'onglet **Questions** liste chaque question avec son type et indique si elle est obligatoire. Cliquez sur le titre d'une question pour la modifier, ou cliquez sur **Supprimer** dans le formulaire de la question et confirmez pour la retirer. Utilisez les flèches **Monter** et **Descendre** sur une ligne pour modifier l'ordre d'affichage des questions.

:::warning
Le type de champ **Paiement** exige que Stripe soit configuré. Si vous n'avez pas encore configuré les dons en ligne, consultez la [Configuration des dons en ligne](../donations/online-giving-setup.md) avant d'ajouter des champs de paiement. Les personnes qui paient sur un formulaire sans se connecter doivent cocher la case **Je ne suis pas un robot** avant que la carte soit acceptée.
:::

## Gérer les membres du formulaire {#managing-form-members}

Les formulaires Autonomes disposent d'un onglet **Membres du formulaire** qui permet de donner accès à ce seul formulaire.

1. Ouvrez votre formulaire et accédez à l'onglet **Membres du formulaire**.
2. Dans **Ajouter une personne**, recherchez une personne et cliquez sur l'icône d'ajout à côté de son nom. Les nouveaux membres commencent avec le rôle **Consultation seulement**.
3. Dans la colonne **Autorisation**, cliquez sur le rôle souhaité :
   - **Administrateur** — Peut modifier le formulaire et consulter toutes les soumissions.
   - **Consultation seulement** — Peut consulter les soumissions mais ne peut pas modifier le formulaire.
4. Activez **Notification par courriel** pour toute personne qui doit recevoir un courriel à chaque soumission du formulaire.

Pour retirer une personne du formulaire, cliquez sur **Retirer** sur sa ligne et confirmez.

## Lier un formulaire à un groupe {#linking-a-form-to-a-group}

Vous pouvez lier n'importe quel formulaire Autonome à un groupe -- par exemple un formulaire de demande de prière pour un petit groupe, ou une autorisation médicale pour un voyage de jeunes :

1. Ouvrez le formulaire et cliquez sur **Modifier le formulaire** (ou cliquez sur **Modifier** à côté du formulaire dans la liste des Formulaires).
2. Sous **Groupe lié**, sélectionnez le groupe, ou laissez sur **Aucun**.
3. Cliquez sur **Enregistrer**.

Une fois le formulaire lié :

- **Les membres du groupe** voient le formulaire dans une section **Formulaires** sur la page du groupe dans B1.church tant que le formulaire est ouvert, avec un bouton **Remplir** qui l'ouvre (voir [Détails du groupe](../../b1-church/groups/group-details.md#linked-forms)).
- **Les responsables du groupe** voient aussi les formulaires fermés, et peuvent lire les réponses de chaque soumission et les imprimer (une soumission ou **Tout imprimer**). Les responsables peuvent seulement consulter les réponses -- ils ne peuvent pas modifier le formulaire, sauf s'ils sont aussi [membres du formulaire](#managing-form-members).
- **Dans B1 Admin**, la page du groupe affiche une section **Formulaires liés** qui liste chaque formulaire lié comme **Ouvert** ou **Fermé**. Elle apparaît pour les responsables du groupe et pour les personnes qui peuvent administrer les formulaires. Voir [Membres du groupe](../groups/group-members.md#linked-forms).

Un formulaire est fermé lorsqu'il est en dehors de sa période de disponibilité. Les formulaires archivés ne sont pas affichés sur la page du groupe.

### Ajouter automatiquement les personnes qui soumettent au groupe {#automatically-adding-submitters-to-a-group}

Lier un formulaire à un groupe n'ajoute personne au groupe à lui seul. Pour ajouter chaque personne qui soumet le formulaire à la liste du groupe lié, cochez aussi **Créer une fiche personne à partir des soumissions** dans les paramètres du formulaire, puis cliquez sur **Enregistrer**.

Chaque fois qu'une personne soumet le formulaire, la personne associée ou nouvellement créée est ajoutée au groupe (les membres déjà présents sont ignorés). C'est utile pour un formulaire d'inscription à un camp qui doit créer automatiquement le groupe de participants du camp.

### Envoyer un courriel de suivi {#sending-a-follow-up-email}

Avec **Créer une fiche personne à partir des soumissions** coché, vous pouvez aussi envoyer un courriel à chaque personne qui soumet le formulaire. Renseignez **Objet du courriel de suivi** et **Corps du courriel de suivi** dans les paramètres du formulaire. Vous pouvez utiliser les jetons `{firstName}` et `{churchName}` dans les deux champs. Le courriel n'est envoyé que lorsque les deux champs sont remplis.

:::info
Les courriels de suivi ne sont envoyés qu'après l'approbation de votre église pour l'envoi de courriels de groupe, et ils comptent dans la limite quotidienne de courriels de votre église. Voir [Activer les courriels de groupe pour votre église](../groups/group-members.md#turning-on-group-email-for-your-church).
:::

## Dupliquer un formulaire {#duplicating-a-form}

Pour réutiliser un formulaire comme point de départ d'un nouveau, cliquez sur **Dupliquer** à côté du formulaire dans la liste des Formulaires et confirmez. Un message **Formulaire dupliqué** apparaît, et B1 crée une copie exacte du formulaire -- y compris toutes les questions -- que vous pouvez ensuite renommer et modifier indépendamment.

:::tip
La duplication est pratique pour les événements récurrents dont les questions d'inscription restent les mêmes d'une année à l'autre. Dupliquez le formulaire de l'an dernier, mettez à jour le nom et les dates, et vous êtes prêt.
:::

## Configurer les propriétés du formulaire {#configuring-form-properties}

Vous pouvez mettre à jour le nom et les paramètres de votre formulaire à tout moment : ouvrez le formulaire et cliquez sur **Modifier le formulaire** dans la partie gauche de la page, ou cliquez sur **Modifier** à côté du formulaire dans la liste des Formulaires. La partie gauche de la page du formulaire indique son type (**Personnes** ou **Autonome**) et, pour les formulaires Autonomes, s'il est **Public** ou **Restreint**, ainsi que son **adresse web publique** unique que vous pouvez partager avec n'importe qui.

Les paramètres de **Modifier le formulaire** sont :

- **Nom du formulaire** -- Le nom affiché dans B1 Admin et en haut du formulaire.
- **Description** *(Autonome)* -- Texte affiché au-dessus des questions sur la page publique du formulaire, utile pour expliquer à quoi sert le formulaire avant que les personnes ne commencent à le remplir.
- **Photo d'en-tête** *(Autonome)* -- Voir [Ajouter une photo d'en-tête](#adding-a-header-photo).
- **Accès au formulaire** *(Autonome)* -- **Public** permet à quiconque possède le lien de remplir le formulaire ; **Restreint** exige que les personnes se connectent au site de votre église avant de pouvoir l'ouvrir.
- **Définir une période de disponibilité du formulaire** *(Autonome)* -- Choisissez **Oui** et définissez une **Date de début de disponibilité** et une **Date de fin de disponibilité** pour n'accepter les soumissions que pendant ces dates. En dehors de celles-ci, le formulaire est fermé.
- **Message de remerciement** -- Ce que les personnes voient après avoir soumis le formulaire (voir ci-dessous).
- **Mode d'affichage** -- **Standard** affiche toutes les questions sur une seule page ; **Conversationnel (une question à la fois)** fait passer les questions une par une.
- **Créer une fiche personne à partir des soumissions** *(Autonome)*, **Groupe lié** et les champs du courriel de suivi -- Voir [Lier un formulaire à un groupe](#linking-a-form-to-a-group) et [Envoyer un courriel de suivi](#sending-a-follow-up-email).

Cliquez sur **Enregistrer** pour conserver vos modifications. Pour supprimer définitivement un formulaire, cliquez sur **Supprimer** dans les paramètres du formulaire et confirmez ; pour le conserver mais le masquer de la liste, [archivez-le](./index.md#what-you-can-do) plutôt.

### Ajouter une photo d'en-tête {#adding-a-header-photo}

Les formulaires Autonomes peuvent afficher une **Photo d'en-tête** en haut du formulaire. Dans les détails du formulaire, cliquez sur la case photo ou sur **Ajouter une photo**, puis choisissez ou téléversez une image (elle est recadrée au format 16:9). Cliquez sur **Enregistrer**. La photo apparaît sous le nom du formulaire, au-dessus de la description, sur la page de l'adresse web publique du formulaire et partout où le formulaire est intégré avec l'élément **Formulaire** du site web. Utilisez **Changer la photo** pour la remplacer ou **Retirer** pour la supprimer.

Utilisez le champ **Message de remerciement** pour définir ce que les personnes voient après avoir soumis le formulaire, y compris sur la page de l'adresse web publique du formulaire. Si vous le laissez vide, elles voient « Merci d'avoir soumis le formulaire ! »

:::tip
Les formulaires Autonomes sont parfaits pour les inscriptions aux événements. Partagez l'adresse web publique par courriel ou sur les réseaux sociaux, ou intégrez directement le formulaire sur le site web de votre église.
:::

:::info
Pour intégrer un formulaire sur votre site B1, allez dans l'éditeur de votre site web, ajoutez une nouvelle section et sélectionnez l'élément **Formulaire**. Choisissez ensuite le formulaire à afficher. Voir [Gérer les pages](../website/managing-pages.md) pour plus de détails sur la modification de votre site web.
:::
