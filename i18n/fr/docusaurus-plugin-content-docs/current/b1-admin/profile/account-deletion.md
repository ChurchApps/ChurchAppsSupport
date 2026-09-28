---
title: "Examiner les demandes de suppression de compte"
---

# Examiner les demandes de suppression de compte

<div class="article-intro">

Lorsqu'une église a un groupe d'approbation d'annuaire configuré, la suppression de compte ne se fait plus instantanément - la demande d'un membre devient une tâche que votre groupe d'approbation examine avant que quoi que ce soit ne soit supprimé. Cette page explique comment la demande est faite, comment l'approuver ou la refuser, et ce qui se passe dans chaque cas.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Un **Groupe d'approbation d'annuaire** doit être configuré sous **Mobile → Portail des membres**. Sans l'un, cliquer sur **Supprimer mon compte** sur la page Profil supprime toujours le compte immédiatement, sans étape d'examen. Voir [Paramètres de l'application mobile](../settings/mobile-app.md).
- L'approbation ou le refus d'une demande nécessite la permission **Personnes > Modifier**.

</div>

## Comment un membre demande la suppression

La suppression de compte est demandée à partir de la page **Mon profil** - la même page de compte partagée couverte dans [Gestion de votre profil](./managing-profile.md) - dans sa section **Suppression de compte**. Lorsqu'un groupe d'approbation est configuré, confirmer la demande ne supprime rien immédiatement. Au lieu de cela, cela :

1. Crée une tâche ouverte intitulée **« Demande de suppression de compte »**, assignée au groupe d'approbation d'annuaire, sous **Service → Mon travail**.
2. Désactive le bouton **Supprimer mon compte** pour cette personne et affiche un avis indiquant que la demande est en attente d'examen.

Soumettre une deuxième demande alors qu'une est déjà ouverte réouvre simplement la même tâche - une personne ne peut avoir qu'une seule demande de suppression en attente à la fois.

## Examiner une demande

1. Allez à **Service → Mon travail** (ou **Assigné à mes groupes** sur votre tableau de bord, le même endroit où [les demandes de changement de profil](./approving-profile-changes.md) apparaissent).
2. Ouvrez la tâche intitulée **« Demande de suppression de compte de *Nom* »**.
3. Vous verrez deux actions : **Approuver la suppression** et **Refuser**.

### Approuver

Confirmez **« Anonymiser définitivement le dossier de cette personne et supprimer son identifiant de connexion ? Cela ne peut pas être annulé. »** Cela remplace les informations personnelles de la personne par des valeurs génériques (la même anonymisation utilisée par l'action **Gestion des données > Anonymiser** sur le dossier d'une personne - voir [Sécurité des données](../settings/data-security.md)) et supprime son identifiant de connexion. La tâche se ferme automatiquement et le membre est notifié que sa demande a été approuvée.

### Refuser

Le refus nécessite une raison, car le RGPD n'autorise que le refus d'une demande d'effacement pour une exception légale :

- **Retention légale** (dons, impôts ou dossiers d'emploi)
- **Nécessaire pour une réclamation légale**
- **Autre** - expliquez dans la zone de texte (au moins 10 caractères)

Le membre est notifié de la décision ainsi que de la raison que vous avez donnée, et peut soumettre à nouveau sa demande ou escalader vers une autorité de surveillance s'il n'est pas d'accord.

:::info
Les églises ont 30 jours pour répondre à une demande de suppression. La tâche est due dans 28 jours, et le groupe d'approbation reçoit des rappels automatiques si elle est toujours ouverte après 21 et 27 jours.
:::

:::tip
Les demandes de suppression et de changement de profil utilisent le même groupe d'approbation d'annuaire et le même flux d'examen basé sur les tâches - voir [Approuver les changements de profil](./approving-profile-changes.md) si vous devez également examiner les demandes de mise à jour d'annuaire.
:::

## Articles connexes

- [Gestion de votre profil](./managing-profile.md) - Où les membres demandent la suppression de leur propre compte
- [Approuver les changements de profil](./approving-profile-changes.md) - Le flux d'examen similaire pour les demandes de mise à jour d'annuaire
- [Sécurité des données](../settings/data-security.md) - Conformité RGPD et anonymisation initiée par l'administrateur
- [Paramètres de l'application mobile](../settings/mobile-app.md) - Configuration du groupe d'approbation d'annuaire
