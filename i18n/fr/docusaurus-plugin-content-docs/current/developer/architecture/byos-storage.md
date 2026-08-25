---
title: "Stockage apporté par l'utilisateur"
---

# Stockage apporté par l'utilisateur (BYOS)

Les églises reçoivent environ 100 Mo de stockage de fichiers gratuit hébergé. BYOS permet à une église de lier son propre stockage cloud -- **Google Drive, Dropbox, OneDrive ou tout seau compatible S3** -- pour que les nouveaux téléchargements atterrissent dans le compte de l'église sans plafond de plate-forme. ChurchApps reste gratuit ; le compte de l'église est la limite.

## Flux de téléchargement

Même contrat en trois étapes qu'avant, avec une forme presign étendue. `POST /content/files/postUrl` renvoie `PresignedPostData` qui porte maintenant optionnellement `method`, `rawBody`, `headers`, `chunkSize` et `externalIdField`.

## Téléchargements publics

Les nuages des consommateurs ne peuvent pas être actifs (les liens Drive limitent le quota, les liens Dropbox/OneDrive expirent), donc pour le trio OAuth `contentPath` pointe vers un itinéraire Api stable : `GET /content/files/download/:id` charge la ligne de fichier, frappe un lien direct de courte durée via `getDownloadUrl` du fournisseur, le met en cache en mémoire pendant 30 minutes, et effectue une redirection 302 avec `Cache-Control: max-age=300`. La bande passante circule entre le navigateur et le fournisseur, jamais via l'Api. 

Les suppression et les téléchargements routent par `files.provider` ; les lignes héritées sans cela reviennent au routage par préfixe d'URL. Les renommages sont DB uniquement pour les fichiers BYOS.
