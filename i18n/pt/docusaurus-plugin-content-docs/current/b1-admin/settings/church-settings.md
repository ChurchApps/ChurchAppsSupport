---
title: "Configurações da Igreja"
---

# Configurações da Igreja

<div class="article-intro">

A página Configurações da Igreja é onde você configura as informações básicas de sua igreja, detalhes de contato e marca. Esses detalhes são usados em todas as ferramentas ChurchApps, incluindo seu site B1.church e o aplicativo móvel B1.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- Você precisa da permissão "Editar Configurações da Igreja". Veja [Funções e Permissões](./roles-permissions.md) se você não tiver acesso.
- Tenha pronto o endereço de sua igreja, informações de contato e logotipo

</div>

## Editando Suas Informações da Igreja

1. No B1 Admin, abra o **menu de seção** no canto superior esquerdo (nome da seção com a pequena seta) e escolha **Configurações**.
2. Abra a seção **Informações da Igreja** e clique em seu ícone de edição (lápis).
3. Atualize qualquer um dos seguintes campos:
   - **Nome da Igreja** -- O nome exibido em todos os produtos ChurchApps.
   - **Endereço** -- O endereço físico de sua igreja.
   - **Informações de Contato** -- Número de telefone, email e outros detalhes de contato.
4. Clique em **Salvar** para aplicar suas alterações.

## Configurando Seu Subdomínio

Sua igreja recebe um subdomínio gratuito em **suaigreja.1.church**. Este é o endereço da web onde membros e visitantes podem acessar a presença online de sua igreja.

1. Na página Configurações, localize o campo **Subdomínio**.
2. Digite seu subdomínio preferido (por exemplo, "gracechurch" para gracechurch.1.church).
3. Salve suas alterações.

:::info
Seu subdomínio deve ser único em todas as igrejas ChurchApps. Se seu nome preferido estiver ocupado, tente adicionar sua cidade ou estado (por exemplo, "gracechurch-dallas").
:::

Se você deseja que os visitantes acessem seu site no seu próprio domínio (por exemplo, **www.gracechurch.org**), veja [Domínio Personalizado](./custom-domain.md).

## Configurando Marca

Personalize como sua igreja aparece em todas as ferramentas ChurchApps:

1. Faça o upload de seu **logotipo da igreja** clicando na área do logotipo e selecionando um arquivo de imagem.
2. Adicione qualquer **imagem da igreja** adicional usada no seu site e [aplicativo móvel](./mobile-app.md).

:::tip
Para melhores resultados, use um logotipo com fundo transparente no formato PNG. Isso garante que se veja bem em fundos claros e escuros.
:::

## Primeiro Dia da Semana

Escolha em que dia seus calendários começam. A lista suspensa **Primeiro Dia da Semana** na seção Informações da Igreja tem como padrão **Domingo**, mas pode ser definida para qualquer dia. Uma vez alterado, é respeitado em todas as grades de calendário no B1 Admin e no portal de membros B1.church -- calendários de grupo, calendários curados e o editor de eventos todos dispõem as semanas começando no dia que você escolher.

## Armazenamento de Arquivos

Por padrão, os arquivos que você faz upload do seu site (através de [Arquivos](../website/files.md)) e outras áreas de conteúdo usam armazenamento hospedado gratuito do B1, até 100MB. Se você precisar de mais espaço, pode conectar seu próprio armazenamento em nuvem -- os novos uploads vão direto para sua conta sem limite de plataforma.

1. Na página Configurações, encontre o cartão **Armazenamento de Arquivos** e clique para editá-lo.
2. Escolha um provedor: **Google Drive**, **Dropbox**, **OneDrive** ou um **bucket compatível com S3** (AWS S3, Cloudflare R2, Backblaze B2, etc.).
3. Para Google Drive, Dropbox ou OneDrive, clique em **Conectar** e faça login para autorizar o acesso. Para um bucket compatível com S3, digite sua chave de acesso, segredo, nome do bucket e base de URL pública.
4. Clique em **Salvar**.

:::info
Isso afeta apenas novos uploads para seus Arquivos do site e áreas de conteúdo similares. Imagens da galeria, miniaturas, logotipos e fotos de pessoas sempre permanecem no armazenamento padrão do B1.
:::

## Promoção de Série

Se você rastrear **Série** em crianças e alunos, o B1 pode promover automaticamente todos para uma série em uma data que você escolher (por exemplo, 1º de agosto) em vez de exigir que você edite cada perfil manualmente.

1. Na página Configurações, encontre a opção **Promoção de Série**.
2. Ative-a e escolha o **mês e dia** para promover séries a cada ano.
3. Salve suas alterações.

## Importar e Exportar

O botão **Importar/Exportar** no cabeçalho Configurações abre uma ferramenta dedicada em uma nova janela do navegador. Use isso para:

- Importar dados de membros de outro sistema de gerenciamento de igreja.
- Exportar seus dados ChurchApps para backup ou fins de migração.

Isso é especialmente útil quando você está configurando sua igreja pela primeira vez e precisa transferir registros existentes para o ChurchApps.

:::warning
Ao importar dados, sempre faça backup de seus registros existentes primeiro. As operações de importação adicionam dados ao seu sistema e podem criar entradas duplicadas se executadas várias vezes.
:::
