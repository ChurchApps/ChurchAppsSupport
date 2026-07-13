---
title: "Tincwadzi Letabelwanako"
---

# Tincwadzi Letabelwanako

<div class="article-intro">

Ikhodi lebelwanako ye-ChurchApps ishicilelwa ku-npm ngaphasi kwesikhala se-`@churchapps/*`. Onkhe emaphakheji labelwanako ahlala ku-repository linye -- [Packages](https://github.com/ChurchApps/Packages) -- lelilawulwa njenge-Yarn (Berry) workspace futsi lelinikwa tinombolo nge-[changesets](https://github.com/changesets/changesets).

</div>

## Emaphakheji

| Phakheji | Sichasiso | Isetjentiswa Ngubani |
|---------|-------------|---------|
| [`@churchapps/helpers`](./helpers) | Umatimba wesisekelo: tisebenti letingakabambeleli kufreyimu kanye netinhlobo te-TypeScript letabelwanako letakha sivumelwano selwati sendlula ema-app | Onkhe emaphrojekthi |
| [`@churchapps/apihelper`](./api-helper) | Tisebenti te-Express tase-server: kutivela, ema-base controller, kufinyelela ku-database, kanye nekuhlanganiswa ne-AWS ne-imeyili | Onkhe ema-API |
| [`@churchapps/apphelper`](./app-helper) | Tincenye te-React letabelwanako kanye netindzawo temisebenti (kungena, kuniketa, ema-form, i-markdown, wewebhusayithi) | Onkhe ema-web app |
| `@churchapps/content-providers` | Sento lesisembili phezu kwebahlinzeki belwati bangaphandle (Lessons.church, Planning Center, Dropbox, nalabanye) | Api, B1Admin, B1App, FreePlay |
| `@churchapps/integration-sdk` | Emathulusi ekwakha kuhlanganiswa kwe-B1.church: kutfolakala kwe-webhook, i-REST client lenetinhlobo, kanye netisebenti te-OAuth | Bafaki mtimba bangaphandle labakha kuhlanganiswa |
| `@churchapps/texting` | Sento lesisembili sebahlinzeki bema-SMS (Text In Church, Clearstream, Mutual Ministry) | Api |

Luhlelo lwekutsembeka lume ngendlela yeku-ehla ngesiciniseko: ema-app atsembela ku-`apihelper` na-`apphelper`, letimemetela `@churchapps/helpers` njenge-**peer dependency** kuze i-app ngayinye ihlanganise kukopi kunye kwayo.

## Kulungiselela Indzawo Yekusebenta

```bash
git clone https://github.com/ChurchApps/Packages.git
cd Packages
yarn install
yarn build
```

Le-repository isebentisa Yarn Berry (insimu ye-`packageManager` esekhundleni yekhulu ingumtsetfo losemtsetfweni) kanye ne-lockfile yinye. `yarn build` yakha wonkhe phakheji ngendlela yekutsembelana; `yarn test` isebentisa tonkhe tivivinyo temaphakheji.

## Kukhipha Ngekusebentisa Changesets

Nome nguluphi lushintjo kuphakheji luhamba ne-changeset:

1. Sebentisa `yarn changeset` ekucaleni kwe-workspace. Khetsa i(ma)phakheji lowutsintse yona, luhlobo lwekunyusa (patch = kulungisa, minor = kukhishwa lokusha nome sici lesisha, major = lokwephula) bese ubhala sifingqo lesimfishane -- sitawuba yingeniso ye-CHANGELOG.
2. Faka lifayela le-`.changeset/*.md` lelivele lakhiwe kanye nelushintjo lwakho lwekhodi. I-pre-commit hook ivimba kufaka lolushintja imtfombo yephakheji ngaphandle kwe-changeset lesele ifakiwe.
3. Nawusulungele kushicilela, sebentisa `yarn publish-all` ekucaleni. Loku kusebentisa ema-changeset lasalindzile (kunyusa tinombolo, kubhala ema-CHANGELOG, kuvumelanisa emabanga wekutsembelana wangekhatsi), kwakha konkhe ngendlela yekutsembelana, futsi kushicilele emaphakheji lanyusiwe ku-npm. Bese ufaka nekutfumela shintjo tinombolo.

:::warning
Ungakaze usebentise `npm publish` lengakalungiswanga ngekhatsi kwephakheji linye -- loko kweqa kuhleleka kwekwakha kanye nekugcinwa kwetinombolo lokwentiwa yiscripthi sekushicilela. Kushicilela kudzinga i-akhawunti ye-npm lenemalungelo ekushicilela endzaweni ye-`@churchapps`.
:::

## Kulungiselela Endzaweni Yakho Uchamana Ne-App Leyitsembelako

Ngekhatsi kwe-workspace, emaphakheji akhiwa ngco kuhlangana nawomakhelwane awo -- akudzingeki kuhlanganiswa. Kuhlola kwakhiwa kwephakheji lelingakashicilelwa ngekhatsi kwe-app leyitsembelako (B1Admin, B1App, njll.), faka i-Yarn portal yesikhashana ku-app leyitsembelako:

```bash
# in the consuming project
yarn link ../Packages/helpers
# ... test ...
yarn unlink ../Packages/helpers && yarn install
```

Cala ngekwakha phakheji (`yarn build` ekucaleni kwe-workspace) -- i-app leyitsembelako ifundza umphumela lohlanganisiwe we-`dist/`, hhayi imtfombo.

:::warning
`yarn link` ibhala sitfombiso se-portal ku-`package.json` ye-app leyitsembelako. Ungakaze ukufake ku-git -- njalo sebentisa `yarn unlink` bese uphindze ufake nawusucedzile.
:::
