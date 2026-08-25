---
title: "Configurações da Igreja"
---

# Configurações da Igreja

<div class="article-intro">

A página Configurações da Igreja é onde você configura as informações básicas de sua igreja, detalhes de contato e marca. Estes detalhes são usados em todas as ferramentas ChurchApps, incluindo seu site B1.church e o aplicativo B1 Mobile.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- Você precisa da permissão "Editar Configurações da Igreja". Consulte [Funções e Permissões](./roles-permissions.md) se não tiver acesso.
- Tenha seu endereço de igreja, informações de contato e logo prontos

</div>

## Editando Suas Informações da Igreja

1. Em B1 Admin, abra o **menu de seção** no canto superior esquerdo (o nome da seção com a seta pequena) e escolha **Configurações**.
2. Clique no botão **Editar Configurações** no cabeçalho.
3. Atualize qualquer um dos seguintes campos:
   - **Church Name** -- O nome exibido em todos os produtos ChurchApps.
   - **Address** -- Seu endereço físico de igreja.
   - **Contact Information** -- Número de telefone, email e outros detalhes de contato.
4. Clique em **Salvar** para aplicar suas alterações.

## Configurando Seu Subdomínio

Sua igreja consegue um subdomínio gratuito em **seua-igreja.b1.church**. Este é o endereço web onde membros e visitantes podem acessar sua presença online da igreja.

1. Na página Configurações, localize o campo **Subdomain**.
2. Digite seu subdomínio preferido (por exemplo, "gracechurch" para gracechurch.b1.church).
3. Salve suas alterações.

:::info
Seu subdomínio deve ser único em todas as igrejas ChurchApps. Se seu nome preferido estiver tomado, tente adicionar sua cidade ou estado (por exemplo, "gracechurch-dallas").
:::

## Configurando Marca

Customize como sua igreja aparece em todas as ferramentas ChurchApps:

1. Faça upload de seu **logo de igreja** clicando na área de logo e selecionando um arquivo de imagem.
2. Adicione qualquer **imagens de igreja** adicionais usadas no seu site e [aplicativo móvel](./mobile-app.md).

:::tip
Para melhores resultados, use um logo com fundo transparente em formato PNG. Isto garante que pareça ótimo tanto em fundos claros quanto escuros.
:::

## Primeiro Dia da Semana

Escolha qual dia seus calendários começam. O dropdown **First Day of Week** na seção de Info de Igreja padrão para **Sunday**, mas pode ser definido para qualquer dia. Uma vez alterado, é honrado em grades de calendário em B1 Admin e no portal de membro B1.church -- calendários de grupo, calendários curados e o editor de eventos todos começam na semana no dia que você escolher.

## Armazenamento de Arquivo

Por padrão, os arquivos que você carrega para seu site (através de [Files](../website/files.md)) e outras áreas de conteúdo usam o armazenamento hospedado gratuito do B1, até 100MB. Se você precisa de mais espaço, pode conectar seu próprio armazenamento em nuvem em vez disso -- novos uploads então vão direto para sua conta sem limite de plataforma.

1. Na página Configurações, encontre o cartão **File Storage** e clique para editá-lo.
2. Escolha um provedor: **Google Drive**, **Dropbox**, **OneDrive** ou um **bucket compatível com S3** (AWS S3, Cloudflare R2, Backblaze B2, etc.).
3. Para Google Drive, Dropbox ou OneDrive, clique em **Connect** e faça login para autorizar acesso. Para um bucket compatível com S3, digite sua chave de acesso, segredo, nome de bucket e base de URL pública.
4. Clique em **Salvar**.

:::info
Isto apenas afeta novos uploads para seus Arquivos de Website e áreas de conteúdo similares. Imagens de galeria, miniaturas, logos e fotos de pessoa sempre ficam no armazenamento padrão do B1.
:::

## Promoção de Série

Se você rastreia **Grade** em crianças e estudantes, B1 pode automaticamente promover todo mundo uma série em uma data que você escolhe (por exemplo, 1º de Agosto) em vez de exigir que você edite cada perfil manualmente.

1. Na página Configurações, encontre a opção **Grade Promotion**.
2. Ligue-a e escolha o **mês e dia** para promover séries cada ano.
3. Salve suas alterações.

## Importar e Exportar

O botão **Import/Export** no cabeçalho Configurações abre uma ferramenta dedicada em uma nova janela do navegador. Use isto para:

- Importar dados de membros de outro sistema de gerenciamento de igrejas.
- Exportar seus dados ChurchApps para backup ou propósitos de migração.

Isto é especialmente útil quando você está configurando inicialmente sua igreja e precisa transferir registros existentes para ChurchApps.

:::warning
Ao importar dados, sempre faça backup de seus registros existentes primeiro. Operações de importação adicionam dados ao seu sistema e podem criar entradas duplicadas se executadas múltiplas vezes.
:::
