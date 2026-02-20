---
title: "Implantação de Aplicações Web"
---

# Implantação de Aplicações Web

<div class="article-intro">

As aplicações web do ChurchApps são implantadas como sites estáticos no **Amazon S3** com **CloudFront** como CDN. As implantações são automatizadas através do GitHub Actions, mas também podem ser executadas manualmente quando necessário.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- Configure a aplicação web localmente e verifique se ela compila -- veja [Aplicações Web](../web-apps/)
- Configure credenciais AWS com acesso ao S3 e CloudFront
- Saiba o nome do bucket S3 de destino e o ID de distribuição do CloudFront

</div>

## Etapas de Implantação

1. **Construir a aplicação** -- gerar a saída estática:

   ```bash
   npm run build
   ```

2. **Sincronizar com o S3** -- fazer upload da saída do build para o bucket S3:

   ```bash
   aws s3 sync build/ s3://bucket-name
   ```

3. **Invalidar o CloudFront** -- limpar o cache do CDN para que os usuários recebam a versão mais recente:

   ```bash
   aws cloudfront create-invalidation --distribution-id YOUR_DIST_ID --paths "/*"
   ```

## Implantações Automatizadas

Os workflows do GitHub Actions gerenciam a implantação automaticamente ao fazer push para a branch `main`. O workflow executa todas as três etapas acima -- build, sincronização S3 e invalidação CloudFront -- sem intervenção manual.

:::info
Normalmente você não precisa executar esses comandos manualmente. Fazer merge de um pull request na `main` aciona o pipeline de implantação automatizado.
:::

:::tip
Se você precisar verificar um build localmente antes de implantar, execute `npm run build` e inspecione a saída no diretório `build/`. Você pode servi-lo localmente com qualquer servidor de arquivos estáticos para confirmar que tudo funciona.
:::

## Artigos Relacionados

- **[Aplicações Web](../web-apps/)** -- Guias de configuração para B1Admin, B1App e LessonsApp
- **[Implantação de APIs](./apis)** -- Implantando as APIs do backend
- **[Implantação Móvel](./mobile)** -- Implantando aplicações móveis nas lojas de aplicativos
