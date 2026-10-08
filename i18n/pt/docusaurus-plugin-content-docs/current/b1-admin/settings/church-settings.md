---
title: "Configurações da Igreja"
---

# Configurações da Igreja

<div class="article-intro">

A página Church Settings (Configurações da Igreja) é onde você configura as informações básicas, detalhes de contato e marca de sua igreja. Esses detalhes são usados em todas as ferramentas ChurchApps, incluindo seu site B1.church e o aplicativo B1 Mobile.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- Você precisa da permissão "Edit Church Settings" (Editar Configurações da Igreja). Consulte [Funções e Permissões](./roles-permissions.md) se você não tiver acesso.
- Tenha o endereço, informações de contato e logotipo de sua igreja prontos

</div>

## Editando suas Informações da Igreja

1. No B1 Admin, abra o [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (a barra de pesquisa no canto superior esquerdo), expanda **Settings** (Configurações) e clique em **Settings** (Configurações).
2. Abra a seção **Church Information** (Informações da Igreja) e clique em seu ícone de edição (lápis).
3. Atualize qualquer um dos seguintes campos:
   - **Church Name** (Nome da Igreja) -- O nome exibido em todos os produtos ChurchApps.
   - **Address** (Endereço) -- O endereço físico de sua igreja.
   - **Contact Information** (Informações de Contato) -- Número de telefone, email e outros detalhes de contato.
4. Clique em **Save** (Salvar) para aplicar suas alterações.

## Configurando seu Subdomínio

Sua igreja obtém um subdomínio gratuito em **yourchurch.1.church**. Este é o endereço web onde membros e visitantes podem acessar a presença online de sua igreja.

1. Na página Configurações, localize o campo **Subdomain** (Subdomínio).
2. Digite seu subdomínio preferido (por exemplo, "gracechurch" para gracechurch.1.church).
3. Salve suas alterações.

:::info
Seu subdomínio deve ser único em todas as igrejas ChurchApps. Se seu nome preferido for utilizado, tente adicionar sua cidade ou estado (por exemplo, "gracechurch-dallas").
:::

Se você deseja que os visitantes alcancem seu site em seu próprio domínio (por exemplo, **www.gracechurch.org**), consulte [Domínio Personalizado](./custom-domain.md).

## Configurando Marca

Personalize como sua igreja aparece em todas as ferramentas ChurchApps:

1. Carregue seu **church logo** (logotipo da igreja) clicando na área do logotipo e selecionando um arquivo de imagem.
2. Adicione qualquer **church images** (imagem de igreja) adicional usada em seu site e [aplicativo móvel](./mobile-app.md).

:::tip
Para melhores resultados, use um logotipo com fundo transparente em formato PNG. Isso garante que fique ótimo em fundos claros e escuros.
:::

## Primeiro Dia da Semana

Escolha qual dia seus calendários começam. O menu suspenso **First Day of Week** (Primeiro Dia da Semana) na seção Informações da Igreja usa como padrão **Sunday** (Domingo), mas pode ser definido para qualquer dia. Uma vez alterado, é respeitado em todas as grades de calendário no B1 Admin e no portal de membros B1.church -- calendários de grupo, calendários curados e o editor de eventos são todos dispostos a partir do dia que você escolher.

## Região (Formato de Data)

A configuração **Region** (Região) controla como datas e horas são escritas em todo o B1. Por padrão, as datas usam o formato dos Estados Unidos (por exemplo, "Sep 28, 2026" (28 de setembro de 2026) e "9/28/2026"). Igrejas fora dos EUA podem mudar para seu próprio formato -- por exemplo, escolher English (United Kingdom) (Inglês (Reino Unido)) mostra "28 Sept 2026" (28 de setembro de 2026) e "28/09/2026" em vez disso.

1. Na página Configurações, encontre o cartão **Region** (Região) e clique para editar.
2. Escolha sua região no menu suspenso **Region** (Região). Cada opção mostra uma amostra de data para que você possa ver exatamente como as datas parecerão.
3. Clique em **Save** (Salvar).

O cartão Region então mostra sua região selecionada e uma amostra do **Date format** (Formato de Data).

Sua região se aplica a datas e horas em todo o B1 Admin e em seu site B1.church e portal de membros, incluindo sermões, posts de blog, calendários de grupo e planos de serviço, para que os membros vejam datas no mesmo formato que sua equipe.

## Mensagens de Texto

Conecte um provedor de mensagens de texto para enviar mensagens SMS para uma pessoa ou um grupo inteiro a partir do B1 Admin. Os textos são enviados através de sua própria conta com o provedor, portanto seus preços e limites se aplicam.

1. Na página Configurações, encontre o cartão **Texting** (Mensagens de Texto) e clique para editar.
2. Escolha um **Provider** (Provedor):
   - **Clearstream** -- digite uma **API Key** (Chave de API). Crie uma em suas Configurações de Conta Clearstream em API Keys.
   - **Text In Church** -- digite uma **API Key** (Chave de API). Peça ao Suporte do Text In Church para acessar o desenvolvedor API primeiro, depois crie uma chave em suas Configurações de Conta > seção API do Desenvolvedor.
   - **Nalo Solutions** (Gana) -- digite a chave de autenticação de sua conta Nalo Solutions como **API Key** (Chave de API), e um **Sender ID** (ID do Remetente) (até 11 caracteres) que Nalo aprovou para você.
3. Clique em **Save** (Salvar).

Para parar as mensagens de texto, defina **Provider** (Provedor) como **None** (Nenhum) e salve. Isso remove o provedor salvo.

Uma vez que um provedor está conectado, a equipe com permissão para enviar textos vê um ícone de texto no cabeçalho de um grupo (**Text this group** (Texto neste grupo)) e de uma pessoa com um telefone celular (**Send text message** (Enviar mensagem de texto)). Digite sua mensagem e clique em **Send** (Enviar). O diálogo conta caracteres e segmentos SMS. Para um grupo, mostra quantos membros receberão o texto antes de você enviar:

- Membros sem telefone celular em arquivo são ignorados.
- Membros que escolheram **Hide me from the member directory** (Esconda-me do diretório de membros) são contados como optando por não receber e ignorados.
- Membros da família que compartilham um número de telefone celular recebem o texto apenas uma vez.

### Personalizando Textos com Campos de Mesclagem

Abaixo da caixa de mensagem, o diálogo Text mostra crachás de espaço reservado: **First Name** (Primeiro Nome), **Last Name** (Sobrenome), **Display Name** (Nome de Exibição) e **Church Name** (Nome da Igreja). Clique em um crachá para inserir seu espaço reservado (`{{firstName}}`, `{{lastName}}`, `{{displayName}}` ou `{{churchName}}`) no seu cursor. Quando o texto é enviado, cada espaço reservado é substituído pelos detalhes do destinatário, para que um texto de grupo como `Hi {{firstName}}, see you Sunday!` (`Oi {{firstName}}, vejo você no domingo!`) chegue a cada membro com seu próprio nome. Os espaços reservados funcionam tanto para textos de grupo quanto para textos para uma única pessoa.

:::info
O limite de 1.600 caracteres se aplica à mensagem conforme você a digita. Depois que os espaços reservados são preenchidos, qualquer texto mais longo que 1.600 caracteres é cortado nesse comprimento.
:::

Os textos também podem sair automaticamente de uma etapa de [fluxo de trabalho](../serving/workflows.md#sending-a-text) com a ação **Send Text** (Enviar Texto), que usa o mesmo provedor e espaços reservados.

## Armazenamento de Arquivo

Por padrão, os arquivos que você carrega em seu site (através de [Files](../website/files.md)) e outras áreas de conteúdo usam armazenamento hospedado gratuito do B1, até 100 MB. Se você precisar de mais espaço, você pode conectar seu próprio armazenamento em nuvem em vez disso -- os novos uploads então vão direto para sua conta sem limite de plataforma.

1. Na página Configurações, encontre o cartão **File Storage** (Armazenamento de Arquivo) e clique para editar.
2. Escolha um provedor: **Google Drive**, **Dropbox**, **OneDrive** ou um **S3-compatible bucket** (bucket compatível com S3) (AWS S3, Cloudflare R2, Backblaze B2, etc.).
3. Para Google Drive, Dropbox ou OneDrive, clique em **Connect** (Conectar) e entre para autorizar o acesso. Para um bucket compatível com S3, digite sua chave de acesso, segredo, nome do bucket e URL base pública.
4. Clique em **Save** (Salvar).

:::info
Isso afeta apenas novos uploads para seus Arquivos de Site e áreas de conteúdo semelhantes. Imagens da galeria, miniaturas, logotipos e fotos de pessoas sempre permanecem no armazenamento padrão do B1.
:::

## Promoção de Série

Se você acompanha **Grade** (Série) em crianças e alunos, o B1 pode automaticamente promover todos em uma série em uma data que você escolher (por exemplo, 1º de agosto) em vez de exigir que você edite cada perfil manualmente.

1. Na página Configurações, encontre a opção **Grade Promotion** (Promoção de Série).
2. Ligue a chave (ela mostra **Enabled** (Habilitado)) e escolha o **Month** (Mês) e **Day** (Dia) para promover séries a cada ano. Nessa data, todos com uma série se movem para uma série, e os alunos de 12ª série se tornam **Graduated** (Formados).
3. Salve suas alterações.

Para parar a promoção automática, desligue a chave para que ela mostre **Disabled** (Desabilitado) e salve. A data de promoção é removida e as séries não mudarão mais por conta própria.

## Importar e Exportar

O botão **Import/Export** (Importar/Exportar) no cabeçalho Configurações abre uma ferramenta dedicada em uma nova janela do navegador. Use-o para:

- Importar dados de membros de outro sistema de gerenciamento de igrejas.
- Exportar seus dados do ChurchApps para fins de backup ou migração.

Isso é especialmente útil quando você está configurando sua igreja pela primeira vez e precisa transferir registros existentes para o ChurchApps.

:::warning
Ao importar dados, sempre faça backup de seus registros existentes primeiro. As operações de importação adicionam dados ao seu sistema e podem criar entradas duplicadas se executadas várias vezes.
:::
