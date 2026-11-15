---
title: "Google Sheets"
description: "Connectez B1 Admin à Google Sheets grâce au module complémentaire B1 Export pour importer les personnes, les dons, les groupes et la fréquentation dans des onglets de tableur, à la demande."
---

# Google Sheets

<div class="article-intro">

**B1 Export** est le module complémentaire officiel de Google Sheets pour B1.church. Il ajoute un panneau latéral à n'importe quel tableur afin d'exporter les personnes, les dons, les groupes ou la fréquentation de votre église B1 vers des onglets nommés — à la demande, en un seul clic. Le module complémentaire fonctionne entièrement dans le compte Google de l'utilisateur ; il ne touche aux serveurs de ChurchApps qu'à travers les appels API en lecture seule effectués par chaque exportation.

</div>

:::caution Pas encore disponible
Le module complémentaire B1 Export n'est pas encore publié sur la Google Workspace Marketplace : vous ne pouvez donc pas l'installer aujourd'hui. D'ici là, exportez les personnes depuis B1Admin (voir [Exporter des données](../people/exporting-data.md)) et importez le fichier CSV dans Google Sheets. Tout ce qui suit décrit le fonctionnement du module complémentaire une fois publié.
:::

<div class="prereqs">
<h4>Avant de commencer</h4>

- Un compte Google disposant d'un accès en modification au tableur dans lequel vous souhaitez exporter
- Un administrateur d'église (ou une personne ayant un accès en lecture aux données à exporter) capable de créer une clé API B1
- Le module complémentaire B1 Export installé depuis la Google Workspace Marketplace

</div>

## Ce qu'il exporte {#what-it-exports}

| Élément de menu | Onglet du tableur | Données |
|---|---|---|
| Exporter les personnes | `B1 People` | ID, Display Name, First, Last, Email, Membership Status |
| Exporter les dons | `B1 Donations` | ID, Person ID, Date, Amount, Method, Batch ID |
| Exporter les groupes | `B1 Groups` | ID, Name, Category, Member Count |
| Exporter la fréquentation | `B1 Attendance` | ID, Person ID, Visit Date, Service ID, Group ID |

Chaque exportation **remplace** le contenu de son onglet nommé — relancer une exportation donne un instantané à jour, et non des lignes ajoutées à la suite. Les autres onglets du tableur ne sont pas modifiés.

## Configuration {#setup}

### 1. Créer une clé API B1 avec les bonnes autorisations {#1-create-a-b1-api-key-with-the-right-scopes}

1. Dans B1Admin, allez dans **Paramètres → Développeur → Clés API**.
2. Cliquez sur **Nouvelle clé API**, nommez-la « Export Sheets », et accordez les autorisations **lecture** correspondant à ce que vous souhaitez exporter :
   - `people:read` pour l'export des personnes
   - `donations:read` pour les dons
   - `groups:read` pour les groupes
   - `attendance:read` pour la fréquentation
3. Une clé qui ne sert qu'aux exportations n'a **pas** besoin de `settings:write` — cette autorisation est réservée aux connecteurs qui enregistrent des webhooks (Zapier / Make). Gardez cette clé aussi restreinte que possible.
4. Enregistrez et copiez la clé `cak_…`.

### 2. Installer le module complémentaire {#2-install-the-add-on}

1. Ouvrez le tableur dans lequel vous souhaitez exporter.
2. **Extensions → Modules complémentaires → Obtenir des modules complémentaires**.
3. Recherchez **B1 Export** et installez-le. Google vous demande d'accorder l'accès à vos feuilles de calcul et aux requêtes HTTP externes (afin que le module puisse appeler l'API B1).

Après l'installation, une entrée **B1 Export** apparaît dans le menu **Extensions** de chaque tableur ouvert avec ce compte Google.

### 3. Connecter la clé {#3-connect-the-key}

1. **Extensions → B1 Export → Connecter…** (ou **B1 Export → Connecter…** dans la barre de menus après la première ouverture).
2. Collez la clé API dans le panneau latéral, laissez l'URL de base sur `https://api.churchapps.org` (sauf si vous testez sur l'environnement de préproduction), puis cliquez sur **Enregistrer**.
3. Cliquez sur **Tester la connexion** — un message vert « Connexion OK » confirme que la clé fonctionne.

La clé est stockée dans les **propriétés par utilisateur** (`PropertiesService.getUserProperties()`) : elle est liée à votre compte Google, n'est jamais écrite dans le tableur et n'est jamais visible par les autres éditeurs du tableur.

## Lancer une exportation {#running-an-export}

Au choix :

- **Depuis le menu** — **Extensions → B1 Export → Exporter les personnes** (ou Dons / Groupes / Fréquentation)
- **Depuis le panneau latéral** — ouvrez le panneau (Connecter…) et cliquez sur le bouton correspondant au jeu de données

Un message confirme la fin de l'opération : « _N_ ligne(s) écrite(s) dans 'B1 People' ».

## Créer des rapports à partir des données {#building-reports-on-top}

Les onglets exportés sont des données Google Sheets ordinaires. Créez vos propres analyses en faisant référence à ces onglets :

- Un **onglet de synthèse** avec `=SUMIF('B1 Donations'!E:E, "card", 'B1 Donations'!D:D)` pour totaliser les dons par carte
- Une **vue filtrée** des seuls membres avec `=FILTER('B1 People'!A:F, 'B1 People'!F:F = "Member")`
- Un **graphique** des tendances de fréquentation à partir de `B1 Attendance`

Relancer l'exportation actualise l'onglet source ; vos formules se mettent à jour automatiquement.

## Planifier des exportations récurrentes {#scheduling-recurring-exports}

Le module complémentaire fonctionne à la demande par défaut. Pour des exportations hebdomadaires ou mensuelles, utilisez les déclencheurs temporels intégrés d'Apps Script :

1. **Extensions → Apps Script** dans le tableur (cela ouvre le script lié au module complémentaire).
2. Cliquez sur l'icône **⏰ Déclencheurs** dans la barre latérale gauche.
3. **Ajouter un déclencheur** pour `exportPeople` (ou toute autre fonction d'exportation) — choisissez *Basé sur le temps*, *Minuteur hebdomadaire*, par exemple *Tous les lundis à 6 h*.

L'exportation s'exécute en arrière-plan sous votre compte Google. Si la clé API est remplacée ou révoquée, le déclencheur vous envoie un courriel la prochaine fois qu'il échoue.

## Autorisations et confidentialité {#permissions--privacy}

- Le module complémentaire ne demande que `spreadsheets.currentonly` (il ne peut accéder qu'au tableur ouvert) et `script.external_request` (afin que `UrlFetchApp` puisse appeler l'API B1). Il **ne** voit **pas** votre Drive, votre Gmail ni vos autres données Google.
- La clé API B1 est stockée par utilisateur : les autres éditeurs du même tableur ne peuvent pas la voir.
- Tous les appels à l'API B1 sont effectués en HTTPS avec `Authorization: Bearer cak_…`.

## Dépannage {#troubleshooting}

- **« No API key set »** — ouvrez **Extensions → B1 Export → Connecter…** et collez la clé.
- **« B1 rejected the API key (401) »** — la clé a été supprimée ou elle est erronée. Créez une nouvelle clé et collez-la.
- **« This API key lacks permission for /giving/donations (403) »** — la clé ne dispose pas de `donations:read`. Les autorisations d'une clé existante ne peuvent pas être modifiées : créez une nouvelle clé avec les bonnes autorisations dans B1Admin.
- **Le tableur ne s'actualise pas** après l'exécution — vérifiez que vous regardez le *bon* nom d'onglet (`B1 People`, etc.). L'exportation crée l'onglet s'il n'existe pas.
- **« Quota exceeded »** — Apps Script impose des quotas quotidiens par utilisateur sur `UrlFetchApp` (généralement des milliers d'appels par jour). Une grande église avec de nombreux enregistrements peut devoir répartir ses exportations sur plusieurs jours, ou utiliser [Make](./make.md) ou une intégration personnalisée pour une synchronisation à grand volume.

## Une colonne manque ? {#missing-a-column}

Si vous souhaitez une colonne que nous n'exportons pas, un jeu de données supplémentaire ou un autre format de sortie, écrivez à [support@churchapps.org](mailto:support@churchapps.org).

## Voir aussi {#see-also}

- [Zapier](./zapier.md) — pour une synchronisation en temps réel plutôt qu'une exportation à la demande
- [Make](./make.md) — pour une synchronisation avec des transformations plus complexes
- [Clés API (référence développeur)](/docs/developer/api/api-keys)
