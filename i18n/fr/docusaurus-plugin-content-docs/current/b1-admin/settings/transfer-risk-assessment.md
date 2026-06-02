---
title: "Évaluation des Risques de Transfert"
---

# Évaluation des Risques de Transfert

<div class="article-intro">

Ce document enregistre l'évaluation de ChurchApps des risques associés aux transferts internationaux de données personnelles du Royaume-Uni/EEA vers les États-Unis, comme l'exige le Règlement Général sur la Protection des Données (RGPD) du Royaume-Uni et le Règlement Général sur la Protection des Données (RGPD) de l'UE. Il s'agit d'un dossier de conformité interne maintenu par ChurchApps en tant que processeur de données.

</div>

**Dernière révision :** Avril 2026

## 1. Détails du Transfert

| Élément | Détail |
|---|---|
| **Exportateur de Données** | Églises utilisant ChurchApps (Contrôleurs de Données) situées au Royaume-Uni/EEA |
| **Importateur de Données** | ChurchApps (Processeur de Données), opérant depuis les États-Unis |
| **Catégories de Sujets de Données** | Membres d'église, participants, visiteurs, donateurs, bénévoles, enfants (gérés par les parents/administrateurs) |
| **Catégories de Données Personnelles** | Noms, adresses e-mail, numéros de téléphone, adresses postales, dates de naissance, sexe, statut marital, photos de profil, dossiers de dons, dossiers de présence, adhésions à des groupes, affectations de bénévoles, historique de messagerie |
| **Données Sensibles** | Aucune intentionnellement collectée. Aucune donnée de santé, données biométriques ou antécédents criminels ne sont stockés. Les détails de compte financier (cartes de crédit, comptes bancaires) ne sont jamais stockés par ChurchApps -- ceux-ci sont gérés directement par Stripe. |
| **Objectif du Transfert** | Fournir des services de logiciel de gestion d'église (gestion des membres, dons, suivi de la présence, communications, planification du volontariat, inscription aux événements) |
| **Pays de Destination** | États-Unis |
| **Mécanisme de Transfert** | Clauses Contractuelles Types de l'Union Européenne (CCT) et Supplément au Transfert International de Données (STID) du Royaume-Uni, incorporés via l'Addendum de Traitement des Données AWS |

## 2. Sous-Processeurs

| Sous-Processeur | Rôle | Emplacement | Mécanisme de Transfert |
|---|---|---|---|
| **Amazon Web Services (AWS)** | Hébergement d'infrastructure, stockage de données, livraison de contenu (région us-east-2) | États-Unis | AWS DPA avec CCT (automatiquement inclus dans les Conditions de Service AWS) |
| **Stripe** | Traitement des paiements pour les dons | États-Unis | Stripe DPA avec CCT |

Les données de carte de crédit et de compte bancaire sont transmises directement du navigateur de l'utilisateur à Stripe et ne sont jamais stockées sur ou transmises via les serveurs de ChurchApps.

## 3. Évaluation des Risques

### 3.1 Chiffrement

- **En transit :** Toutes les données sont chiffrées en utilisant TLS/HTTPS pour toutes les communications entre les utilisateurs et les serveurs de ChurchApps.
- **Au repos :** Les données stockées sur AWS sont chiffrées au repos en utilisant le chiffrement géré par AWS.

### 3.2 Contrôles d'Accès

- L'accès au serveur de production est limité à deux individus qui sont membres du conseil d'administration de ChurchApps.
- Les développeurs, bénévoles et autres membres du conseil n'ont pas accès aux serveurs de production ou aux bases de données.
- Les serveurs de base de données sont derrière un pare-feu et ne sont pas directement accessibles depuis Internet.
- Les données de l'église sont logiquement séparées -- chaque église ne peut accéder qu'à ses propres données via les contrôles d'accès au niveau de l'application.

### 3.3 Séparation des Données

Les données sont distribuées dans six bases de données indépendantes (Adhésion, Dons, Présence, Messagerie, Actions, Contenu). La compromission d'une base de données n'expose pas les données des autres. Par exemple, la base de données Dons contient les montants et les dates de dons, mais pas les noms ou les informations de contact des donateurs (stockés dans Adhésion).

### 3.4 Minimisation des Données

- Aucune information de carte de crédit ou de compte bancaire ne sont stockées (gérée par Stripe).
- Les mots de passe sont stockés en utilisant un hachage unidirectionnel et ne peuvent pas être récupérés.
- Les églises contrôlent quelles données elles collectent auprès de leurs membres.

### 3.5 Droits des Sujets de Données

ChurchApps fournit des outils techniques permettant aux églises de satisfaire les demandes des sujets de données :

- **Accès et Portabilité :** Exportation de données complètes en format JSON lisible par machine.
- **Suppression :** Anonymisation dans les six bases de données, remplacement des données personnelles par des valeurs génériques tout en préservant les enregistrements agrégés requis pour les rapports financiers.
- **Restriction :** Le statut d'adhésion inactif exclut les individus de la recherche, du répertoire, des rapports et de la messagerie tout en conservant leur enregistrement.
- **Rectification :** Les membres et les administrateurs peuvent modifier les informations personnelles via l'application.

### 3.6 Notification de Violation

ChurchApps s'engage à notifier les églises affectées dans les 72 heures suivant le moment où elle apprend l'existence d'une violation de données personnelles, comme documenté dans les [Conditions d'Utilisation](https://churchapps.org/terms) (Section 11.6).

### 3.7 Risque d'Accès du Gouvernement des États-Unis

Le risque principal associé aux données hébergées aux États-Unis est l'accès potentiel par les autorités gouvernementales américaines selon l'article 702 du FISA ou l'Ordre Exécutif 12333. Ce risque est évalué comme **faible** pour les raisons suivantes :

- ChurchApps traite les données d'adhésion et de présence d'église, pas les données d'intérêt de renseignement.
- Les sujets de données sont les membres d'église et les participants -- pas les catégories généralement ciblées par les programmes de surveillance.
- Aucune donnée personnelle sensible (santé, comptes financiers, opinions politiques) n'est stockée.
- La DPA d'AWS comprend des engagements concernant les demandes d'accès du gouvernement et les rapports de transparence.
- Le Cadre de Confidentialité des Données États-Unis-UE (établi 2023) fournit des protections supplémentaires pour les transferts de données vers les organisations américaines certifiées.

## 4. Conclusion Générale du Risque

Le risque pour les sujets de données de ce transfert international est évalué comme **faible**. La combinaison de :

- Clauses Contractuelles Types comme mécanisme de transfert juridique
- Chiffrement en transit et au repos
- Contrôles d'accès stricts avec seulement deux individus autorisés
- Séparation des données dans des bases de données indépendantes
- Aucun stockage de détails de comptes financiers
- Faible sensibilité et faible valeur de renseignement des données traitées
- Outils techniques pour exercer tous les droits des sujets de données

fournit des mesures supplémentaires adéquates pour assurer que les données transférées reçoivent un niveau de protection essentiellement équivalent à celui garanti au Royaume-Uni/EEA.

## 5. Calendrier d'Examen

Cette évaluation sera examinée annuellement ou lors d'un changement matériel au traitement des données, aux sous-processeurs ou au cadre juridique régissant les transferts internationaux de données.
