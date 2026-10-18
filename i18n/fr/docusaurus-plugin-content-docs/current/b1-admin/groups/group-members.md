---
title: "Membres du groupe"
---

# Membres du groupe

<div class="article-intro">

Une fois que vous avez créé un groupe, l'étape suivante consiste à ajouter des membres. Depuis la page de détail d'un groupe, vous pouvez rechercher des personnes, les ajouter au groupe, désigner des responsables, envoyer des messages et exporter la liste des membres. La gestion des membres d'un groupe est essentielle pour coordonner les petits groupes, les comités et les classes.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Vous devez avoir au moins un groupe configuré dans B1 Admin. Consultez [Créer des groupes](creating-groups.md) si vous n'en avez pas encore créé.
- Les personnes que vous souhaitez ajouter doivent déjà figurer dans votre répertoire [Personnes](../people/adding-people.md). Si ce n'est pas le cas, vous pouvez les créer depuis la recherche de membres (voir ci-dessous).

</div>

## Ajouter des membres à un groupe

1. Dans le [menu de navigation rapide](../introduction.md#getting-around-with-the-jump-menu), choisissez **Personnes > Groupes** puis cliquez sur le groupe que vous souhaitez gérer.
2. Dans la section **Membres** de la page du groupe, cliquez sur **Tous les membres**. (Les équipes et les ministères ouvrent directement leur liste de membres.)
3. Dans la zone **Ajouter une personne** sous la liste des membres, saisissez le nom de la personne à ajouter, puis appuyez sur **Entrée** ou cliquez sur l'icône de recherche.
4. Cliquez sur le nom de la personne, ou sur l'icône d'ajout à côté, dans les résultats de recherche.
5. La personne apparaît maintenant dans la liste des membres du groupe.

:::tip
Avant de saisir quoi que ce soit, la zone **Ajouter une personne** affiche une courte liste de **Personnes récentes** que vous pouvez ajouter en un clic.
:::

Lorsque vous avez terminé, cliquez sur le lien **Retour à** suivi du nom du groupe pour revenir à la page du groupe. La page du groupe affiche un résumé des **Membres**, des **Sessions**, du **Calendrier** et de l'**État**, chacun avec un lien vers sa vue complète.

### Ajouter une personne qui n'est pas encore dans B1

Si votre recherche ne donne aucun résultat, la recherche affiche **Aucun enregistrement trouvé** avec un lien **Ajouter une nouvelle personne**. Cliquez dessus, saisissez le prénom, le nom et (facultativement) l'adresse e-mail de la personne, puis cliquez sur **Ajouter**. La nouvelle personne est créée dans votre répertoire Personnes et ajoutée au groupe en une seule étape : vous n'avez pas besoin de la rechercher à nouveau.

## Désigner des responsables de groupe

Les responsables de groupe disposent de privilèges particuliers : ils peuvent modifier le [calendrier du groupe](group-calendar.md), gérer les événements et aider à coordonner le groupe.

1. Dans la liste des membres du groupe, repérez la personne que vous souhaitez nommer responsable.
2. Cliquez sur l'**icône étoile** (**Nommer responsable**) à côté de son nom.
3. La personne est maintenant désignée comme responsable de groupe et affiche un badge **Responsable**.

Pour retirer le statut de responsable, cliquez à nouveau sur l'icône étoile (**Retirer l'accès responsable**).

:::info
Tous les membres du groupe peuvent consulter le calendrier et les événements du groupe, mais seuls les responsables peuvent ajouter ou modifier des événements du calendrier.
:::

## Envoyer des messages aux membres du groupe

Vous pouvez communiquer directement avec tous les membres d'un groupe depuis B1 Admin :

1. Dans la liste des membres du groupe, cliquez sur l'icône **Envoyer un message aux membres** au-dessus de la liste.
2. Saisissez votre message dans la zone de texte (ou choisissez-en un dans les **Modèles**).
3. Cliquez sur **Envoyer**.

Votre message sera distribué à tous les membres du groupe.

## Envoyer des e-mails aux membres du groupe

Vous pouvez envoyer des e-mails mis en forme à tous les membres d'un groupe :

1. Depuis la page de détail du groupe, cliquez sur le bouton **E-mail** à gauche de la page.
2. La boîte de dialogue Envoyer un e-mail s'ouvre et indique combien de membres recevront l'e-mail et combien n'ont pas d'adresse e-mail enregistrée.
3. Vous pouvez éventuellement sélectionner un **modèle d'e-mail** dans la liste déroulante, ou rédiger un message à partir de zéro. Cliquez sur **Gérer les modèles** pour créer ou modifier des modèles.
4. Saisissez un **objet**. Vous pouvez insérer des champs de fusion en cliquant sur les puces de champs : `{{firstName}}`, `{{lastName}}`, `{{displayName}}`, `{{email}}`, `{{churchName}}`.
5. Rédigez le **corps de l'e-mail** à l'aide de l'éditeur HTML. Les mêmes champs de fusion sont disponibles ici.
6. Cliquez sur **Envoyer**.
7. Un récapitulatif indique le nombre d'e-mails envoyés avec succès et le nombre de membres ignorés (aucune adresse e-mail enregistrée).

:::tip
Créez des modèles d'e-mails réutilisables pour les communications récurrentes, comme les mises à jour hebdomadaires, les annonces d'événements ou les demandes de prière. Les modèles vous font gagner du temps et garantissent la cohérence des messages.
:::

### Activer l'e-mail de groupe pour votre église {#turning-on-group-email-for-your-church}

Toutes les églises utilisant B1 envoient des e-mails depuis la même adresse, et partagent donc la même réputation d'envoi. Pour que les e-mails de chacun restent hors des dossiers de courrier indésirable, l'équipe ChurchApps examine chaque église une fois avant qu'elle puisse envoyer des e-mails de groupe.

Si votre église n'a pas encore été examinée, la boîte de dialogue Envoyer un e-mail affiche **L'e-mail de groupe nécessite un examen rapide** à la place de l'éditeur de messages :

1. Cliquez sur **Demander un examen**. L'équipe de support ChurchApps est alertée.
2. La boîte de dialogue affiche **Examen demandé**. Vous pouvez la fermer.
3. L'e-mail de groupe est généralement activé dans un délai d'un jour ouvrable. Ouvrez à nouveau la boîte de dialogue Envoyer un e-mail après ce délai pour envoyer votre message.

Tant que votre église n'est pas approuvée, B1 n'envoie pas non plus les [e-mails de suivi des formulaires](../forms/creating-forms.md#sending-a-follow-up-email) ni l'étape **Envoyer un e-mail** des [flux de travail](../serving/workflows.md).

:::info Limites d'envoi
Après approbation, une église peut envoyer jusqu'à 150 e-mails rédigés par l'église par jour. Cette limite augmente à mesure que votre église constitue un historique d'envoi propre, jusqu'à 2 000 par jour. Si des messages récents ont fait l'objet de rebonds ou ont été marqués comme spam, l'envoi d'e-mails de groupe est suspendu et la boîte de dialogue vous demande de contacter le support. Si un envoi dépasse votre limite quotidienne, B1 ne l'envoie pas et affiche une erreur.
:::

## Envoyer des SMS aux membres du groupe

Une fois que votre église a connecté un [fournisseur de SMS](../settings/church-settings.md#texting), un bouton **SMS** (**Envoyer un SMS à ce groupe**) apparaît à côté du bouton **E-mail** sur la page du groupe.

1. Depuis la page de détail du groupe, cliquez sur **SMS**.
2. La boîte de dialogue indique combien de membres recevront le SMS. Les membres sans numéro de téléphone mobile enregistré, ou ayant refusé les messages, sont ignorés.
3. Saisissez votre message. Pour le personnaliser, cliquez sur une puce de champ sous la zone de message — **Prénom**, **Nom**, **Nom d'affichage** ou **Nom de l'église** — pour l'insérer à la position de votre curseur. Chaque champ est remplacé par les informations du destinataire au moment de l'envoi du SMS.
4. Cliquez sur **Envoyer**.

Consultez [Personnaliser les SMS avec des champs de fusion](../settings/church-settings.md#personalizing-texts-with-merge-fields) pour plus de détails.

## Exporter les données du groupe

Pour télécharger la liste des membres du groupe sous forme de fichier :

1. Dans la liste des membres du groupe, cliquez sur **Exporter** au-dessus de la liste.
2. Un fichier CSV contenant les informations des membres du groupe sera téléchargé sur votre ordinateur.

Un export CSV est utile pour importer des données dans d'autres outils ou conserver des archives hors ligne. Pour d'autres options d'exportation, consultez [Exporter les données](../people/exporting-data.md).

## Imprimer la liste des membres

Dans la liste des membres du groupe, cliquez sur l'icône **Imprimer la feuille d'appel** (imprimante) au-dessus de la liste, puis choisissez une mise en page. La page s'ouvre dans un nouvel onglet et la boîte de dialogue d'impression de votre navigateur apparaît automatiquement.

- **Feuille de présence** — Une liste de classe non datée avec des cases **Présent** et **Absent** que les enseignants peuvent cocher à la main. Consultez [Imprimer une feuille d'appel](../attendance/recording-attendance.md#printing-a-roll-sheet).
- **Liste de contacts** — Une liste de contacts pour le groupe, datée du jour et en-tête avec le logo de votre église (le **logo pour fond clair** défini dans [Site web > Apparence](../website/appearance.md), si vous en avez téléversé un) suivi du nom de votre église, ainsi que du nom du groupe. Chaque membre occupe une ligne avec son **Nom**, son **Téléphone**, son **E-mail** et son **Adresse**. Les responsables sont listés en premier et marqués **Responsable**, puis les autres membres par nom de famille. Le téléphone affiché est le numéro mobile du membre ou, à défaut, son numéro de domicile ou professionnel. Les coordonnées restent vides pour les personnes qui ont refusé de les partager.

:::warning
Une liste de contacts contient les coordonnées personnelles des membres. Ne partagez les copies imprimées qu'avec les responsables du groupe et les autres personnes qui en ont besoin.
:::

## Envoyer des notifications push aux membres du groupe

Vous pouvez envoyer une notification push directement à tous les membres du groupe qui ont installé l'application B1.church sur leur appareil et activé les notifications push.

1. Depuis la page de détail du groupe, cliquez sur **Notifier** (sous les boutons **E-mail** et **SMS** — le bouton **SMS** apparaît dès qu'un [fournisseur de SMS](../settings/church-settings.md#texting) est connecté).
2. Une boîte de dialogue s'ouvre et indique combien de membres de votre groupe ont activé les notifications push.
3. Renseignez les détails de la notification :
   - **Titre** *(obligatoire)* — Un bref résumé, de 80 caractères maximum.
   - **Message** *(obligatoire)* — Le contenu de la notification, de 240 caractères maximum.
   - **Lien à ouvrir ou URL du dépliant** *(facultatif)* — Un chemin relatif de l'application (par exemple, `/mobile/groups`) ou une URL `https://` complète que la notification ouvre lorsqu'on la touche.
   - **URL de l'image** *(facultatif)* — Une URL `https://` vers une image qui s'affiche avec la notification sur les appareils compatibles.
4. Un aperçu en direct montre l'apparence de la notification sur l'appareil.
5. Cliquez sur **Envoyer la notification**.

:::info
Les notifications push ne sont distribuées qu'aux membres du groupe qui ont installé la PWA B1.church et n'ont pas désactivé les notifications push. Les membres sans appareil enregistré pour les notifications push, ou dont les notifications sont désactivées, sont comptés comme ignorés, et le récapitulatif d'envoi indique combien de personnes ont été atteintes et combien ont été ignorées.
:::

:::tip
Après l'envoi, la boîte de dialogue indique combien de notifications ont été mises en file d'attente avec succès. Si la plupart des membres apparaissent comme ignorés, rappelez-leur de visiter leur site B1.church, de l'installer comme application sur l'écran d'accueil et d'autoriser les notifications lorsqu'on le leur demande.
:::

## Retirer des membres

Pour retirer une personne d'un groupe, repérez son nom dans la liste des membres et cliquez sur le bouton **retirer** à côté de son entrée.

:::info
Retirer une personne d'un groupe ne la supprime pas de votre annuaire d'église. Elle figurera toujours dans la section [Personnes](../people/adding-people.md) et pourra être ajoutée à nouveau au groupe à tout moment.
:::
