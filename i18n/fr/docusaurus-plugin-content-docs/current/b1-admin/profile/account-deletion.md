---
title: "Examen des demandes de suppression de compte"
---

# Examen des demandes de suppression de compte

<div class="article-intro">

Lorsqu'une église a un groupe d'approbation de répertoire configuré, la suppression de compte n'a plus lieu instantanément - la demande d'un membre devient une tâche que votre groupe d'approbation examine avant la suppression de quoi que ce soit. Cette page explique comment la demande est faite, comment l'approuver ou la rejeter, et ce qui se passe dans chaque cas.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Un **groupe d'approbation de répertoire** doit être configuré sous **Mobile → Portail des membres**. Sans cela, cliquer sur **Supprimer mon compte** sur la page Profil supprime toujours le compte immédiatement, sans étape d'examen. Consultez [Paramètres de l'application mobile](../settings/mobile-app.md).
- L'approbation ou le rejet d'une demande nécessite la permission **Personnes &gt; Modifier**.

</div>

## Comment un membre demande la suppression

La suppression de compte est demandée à partir de la page **Mon profil** - la même page de compte partagée couverte dans [Gestion de votre profil](./managing-profile.md) - sous sa section **Suppression de compte**. Quand un groupe d'approbation est configuré, confirmer la demande ne supprime rien immédiatement. Au lieu de cela, elle :

1. Crée une tâche ouverte intitulée **"Demande de suppression de compte"**, assignée au groupe d'approbation de répertoire, sous **Serving &rarr; Tâches**.
2. Désactive le bouton **Supprimer mon compte** pour cette personne et affiche un avis que la demande attend examen.

Soumettre une deuxième demande tandis qu'une est déjà ouverte réouvre simplement la même tâche - une personne ne peut avoir qu'une seule demande de suppression en attente à la fois.

## Examen d'une demande

1. Allez à **Serving &rarr; Tâches** (ou **Assigné à mes groupes** sur votre tableau de bord, le même endroit où les [demandes de changement de profil](./approving-profile-changes.md) apparaissent).
2. Ouvrez la tâche intitulée **"Demande de suppression de compte de *Nom*"**.
3. Vous verrez deux actions : **Approuver la suppression** et **Rejeter**.

### Approbation

Confirmez **"Anonymiser de manière permanente le dossier de cette personne et supprimer sa connexion ? Ceci ne peut pas être annulé."** Cela remplace les informations personnelles de la personne par des valeurs génériques (l'anonymisation utilisée par l'action **Gestion des données &gt; Anonymiser** sur le dossier d'une personne - consultez [Sécurité des données](../settings/data-security.md)) et supprime sa connexion. La tâche se ferme automatiquement, et le membre est averti que sa demande a été approuvée.

### Rejet

Le rejet nécessite une raison, car le RGPD n'autorise que de refuser une demande d'effacement pour une exception légale :

- **Conservation légale** (dons, impôts ou dossiers d'emploi)
- **Nécessaire pour une réclamation légale**
- **Autre** — expliquez dans la zone de texte (au moins 10 caractères)

Le membre est averti de la décision ainsi que de la raison que vous avez donnée, et peut resoummettre sa demande ou escalader auprès d'une autorité de contrôle s'il ne s'accorde pas.

:::info
Les églises ont 30 jours pour répondre à une demande de suppression. La tâche est due en 28 jours, et le groupe d'approbation reçoit des rappels automatiques s'il est toujours ouvert après 21 et 27 jours.
:::

:::tip
La suppression et les demandes de changement de profil utilisent le même groupe d'approbation de répertoire et le même flux d'examen basé sur les tâches - consultez [Approbation des modifications de profil](./approving-profile-changes.md) si vous devez également examiner les demandes de mise à jour de répertoire.
:::

## Articles connexes

- [Gestion de votre profil](./managing-profile.md) — Où les membres demandent la suppression de leur propre compte
- [Approbation des modifications de profil](./approving-profile-changes.md) — Le flux d'examen similaire pour les demandes de mise à jour de répertoire
- [Sécurité des données](../settings/data-security.md) — Conformité RGPD et anonymisation initiée par l'administrateur
- [Paramètres de l'application mobile](../settings/mobile-app.md) — Configuration du groupe d'approbation de répertoire
