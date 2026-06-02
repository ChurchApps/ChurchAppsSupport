---
title: "Google Sheets"
---

# Google Sheets

<div class="article-intro">

**B1 Export** est le module complémentaire officiel Google Sheets pour B1.church. Il ajoute une barre latérale à n'importe quel tableur qui exporte Personnes, Donations, Groupes ou Présences de votre église B1 dans des onglets nommés — à la demande, en un clic. Le module complémentaire s'exécute entièrement dans le compte Google de l'utilisateur; rien à ce sujet ne touche les serveurs ChurchApps au-delà des appels API en lecture seule que chaque export effectue.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Un compte Google avec accès en édition au tableur dans lequel vous souhaitez exporter
- Un administrateur de l'église (ou quelqu'un ayant accès en lecture aux données que vous souhaitez exporter) capable de créer une clé API B1
- Le module complémentaire B1 Export installé depuis Google Workspace Marketplace

</div>

## Ce qu'il exporte

| Élément du menu | Onglet du tableur | Données |
|---|---|---|
| Exporter les personnes | `B1 People` | ID, Nom d'affichage, Prénom, Nom, Email, Statut d'adhésion |
| Exporter les donations | `B1 Donations` | ID, ID personne, Date, Montant, Méthode, ID lot |
| Exporter les groupes | `B1 Groups` | ID, Nom, Catégorie, Nombre de membres |
| Exporter les présences | `B1 Attendance` | ID, ID personne, Date de visite, ID service, ID groupe |

Chaque export **remplace** le contenu de son onglet nommé — réexécuter un export vous donne un nouvel instantané, pas des lignes ajoutées. Les autres onglets du tableur ne sont pas affectés.

## Configuration

### 1. Créer une clé API B1 avec les bons scopes

1. Dans B1Admin allez à **Paramètres → Développeur → Clés API**.
2. Cliquez sur **Nouvelle clé API**, nommez-la « Sheets Export », et accordez les scopes **en lecture** pour tout ce que vous prévoyez d'exporter :
   - `people:read` pour l'export Personnes
   - `donations:read` pour Donations
   - `groups:read` pour Groupes
   - `attendance:read` pour Présences
3. Une clé qui fait uniquement des exports **n'a pas besoin** de `settings:write` — ce scope est uniquement pour les connecteurs qui enregistrent des webhooks (Zapier / Make). Gardez cette clé étroite.
4. Enregistrez et copiez la clé `cak_…`.

### 2. Installer le module complémentaire

1. Ouvrez le tableur dans lequel vous souhaitez exporter.
2. **Extensions → Modules complémentaires → Obtenir des modules complémentaires**.
3. Recherchez **B1 Export** et installez-le. Google vous demande d'accorder l'accès à vos feuilles et au HTTP externe (pour que le module complémentaire puisse appeler l'API B1).

Après l'installation, une entrée **B1 Export** apparaît dans le menu **Extensions** de chaque tableur que vous ouvrez avec ce compte Google.

### 3. Connecter la clé

1. **Extensions → B1 Export → Connecter…** (ou **B1 Export → Connecter…** du menu après la première ouverture).
2. Collez la clé API dans la barre latérale, laissez l'URL de base comme `https://api.churchapps.org` (sauf si vous testez sur staging), et cliquez sur **Enregistrer**.
3. Cliquez sur **Tester la connexion** — une vérification « Connexion OK » confirme que la clé fonctionne.

La clé est stockée dans les **propriétés par utilisateur** (`PropertiesService.getUserProperties()`) — elle est liée à votre compte Google, jamais écrite dans la feuille, et jamais visible aux autres éditeurs du tableur.

## Exécuter une exportation

Soit :

- **Depuis le menu** — **Extensions → B1 Export → Exporter les personnes** (ou Donations / Groupes / Présences)
- **Depuis la barre latérale** — ouvrez la barre latérale (Connecter…) et cliquez sur le bouton du jeu de données approprié

Une notification confirme quand c'est fait — « _N_ ligne(s) écrite(s) dans 'B1 People'. »

## Créer des rapports par-dessus

Les onglets exportés sont des données Google Sheets ordinaires. Créez votre propre analyse en référençant les onglets :

- Un **onglet de résumé** avec `=SUMIF('B1 Donations'!E:E, "card", 'B1 Donations'!D:D)` pour totaliser les dons par carte
- Une **vue filtrée** uniquement les membres avec `=FILTER('B1 People'!A:F, 'B1 People'!F:F = "Member")`
- Un **graphique** des tendances de présence tirant de `B1 Attendance`

Réexécuter l'export actualise l'onglet sous-jacent; vos formules se mettent à jour automatiquement.

## Planifier les exportations récurrentes

Le module complémentaire est à la demande par défaut. Pour les exportations hebdomadaires ou mensuelles, utilisez les déclencheurs horaires intégrés d'Apps Script :

1. **Extensions → Apps Script** dans le tableur (cela ouvre le script lié du module complémentaire).
2. Cliquez sur l'icône **⏰ Déclencheurs** dans la barre latérale gauche.
3. **Ajouter un déclencheur** pour `exportPeople` (ou toute fonction d'export) — choisissez *Piloté par le temps*, *Minuteur par semaine*, par exemple *Chaque lundi 6h*.

L'export s'exécute en arrière-plan dans votre compte Google. Si la clé API est tournée ou révoquée, le déclencheur vous envoie un email la prochaine fois qu'il échoue.

## Permissions et confidentialité

- Le module complémentaire demande uniquement `spreadsheets.currentonly` (il ne peut toucher que le tableur dans lequel il est ouvert) et `script.external_request` (pour que `UrlFetchApp` puisse appeler l'API B1). Il **ne voit pas** votre Drive, Gmail ou autres données Google.
- La clé API B1 est stockée par utilisateur — les autres éditeurs du même tableur ne peuvent pas la voir.
- Tous les appels API B1 se font sur HTTPS avec `Authorization: Bearer cak_…`.

## Dépannage

- **« Aucune clé API définie »** — ouvrez **Extensions → B1 Export → Connecter…** et collez la clé.
- **« B1 a rejeté la clé API (401) »** — la clé a été révoquée ou est incorrecte. Créez-en une nouvelle et re-collez-la.
- **« Cette clé API manque la permission pour /giving/donations (403) »** — la clé n'a pas `donations:read`. Mettez à jour les scopes de la clé dans B1Admin.
- **Le tableur ne s'actualise pas** après exécution — assurez-vous que vous regardez le *bon* nom d'onglet (`B1 People` etc.). L'export crée l'onglet s'il n'existait pas.
- **« Quota dépassé »** — Apps Script impose des quotas quotidiens par utilisateur sur `UrlFetchApp` (généralement des milliers d'appels par jour). Une grande église avec beaucoup de dossiers peut avoir besoin de diviser les exportations sur plusieurs jours ou d'utiliser [Make](./make) / une intégration personnalisée pour la synchronisation à haut volume.

## Personnaliser le module complémentaire

Le module complémentaire est open source — le projet Apps Script vit dans le dépôt `B1Integrations/GoogleSheetsAddon/`. Si vous voulez une colonne que nous n'exportons pas, un jeu de données supplémentaire, ou un format de sortie différent, ouvrez une issue ou PR là.

## Voir aussi

- [Zapier](./zapier) — pour la synchronisation en temps réel plutôt que l'export à la demande
- [Make](./make) — pour synchroniser avec des transformations plus complexes
- [Clés API (référence développeur)](/docs/developer/api/api-keys)
