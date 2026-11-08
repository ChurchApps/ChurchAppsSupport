---
title: "Configurações da Igreja"
description: "Defina o nome, o endereço, o subdomínio, o fuso horário, o formato regional, o provedor de SMS e o armazenamento de arquivos da sua igreja na página Configurações da Igreja do B1 Admin."
---

# Configurações da Igreja

<div class="article-intro">

A página Configurações da Igreja é onde você configura as informações básicas da sua igreja, os dados de contato e a identidade visual. Essas informações são usadas em todas as ferramentas da ChurchApps, incluindo o seu site B1.church e o aplicativo B1 App.

</div>

## Vídeo de Treinamento

<YouTube id="634zSbzDkYA" title="Como Configurar as Informações e a Identidade Visual da Igreja no B1" next="Funções, Permissões e Como Convidar sua Equipe no B1" nextUrl="/docs/b1-admin/settings/roles-permissions" />

<div class="prereqs">
<h4>Antes de Começar</h4>

- Você precisa da permissão "Editar Configurações da Igreja". Consulte [Funções e Permissões](./roles-permissions.md) se você não tiver acesso.
- Tenha em mãos o endereço, as informações de contato e o logotipo da sua igreja

</div>

## Editando as Informações da Sua Igreja

1. No B1 Admin, abra o [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (a barra de pesquisa no canto superior esquerdo), expanda **Configurações** e clique em **Configurações**.
2. Na seção **Informações da Igreja** (no topo da página), clique em **Editar**.
3. Atualize qualquer um dos campos a seguir:
   - **Nome da Igreja** -- O nome exibido em todos os produtos da ChurchApps.
   - **Endereço** -- O endereço físico da sua igreja.
   - **Informações de Contato** -- Telefone, e-mail e outros dados de contato.
   - **Fuso Horário** -- O fuso horário da sua igreja. Consulte [Fuso Horário](#time-zone) abaixo.
4. Clique em **Salvar** para aplicar as alterações.

## Configurando o Seu Subdomínio

Sua igreja recebe um subdomínio gratuito em **suaigreja.1.church**. É o endereço web em que membros e visitantes podem acessar a presença online da sua igreja.

1. Na página Configurações, clique em **Editar** na seção **Informações da Igreja** e localize o campo **Subdomínio**.
2. Digite o subdomínio desejado (por exemplo, "gracechurch" para gracechurch.1.church).
3. Salve as alterações.

:::info
Seu subdomínio precisa ser exclusivo entre todas as igrejas da ChurchApps. Se o nome desejado já estiver em uso, tente acrescentar sua cidade ou estado (por exemplo, "gracechurch-dallas").
:::

Se você quiser que os visitantes acessem seu site pelo seu próprio domínio (por exemplo, **`www.gracechurch.org`**), consulte [Domínio Personalizado](./custom-domain.md).

## Configurando a Identidade Visual

Personalize a aparência da sua igreja em todas as ferramentas da ChurchApps:

1. Envie o **logotipo da igreja** clicando na área do logotipo e selecionando um arquivo de imagem.
2. Adicione outras **imagens da igreja** usadas no seu site e no [aplicativo móvel](./mobile-app.md).

:::tip
Para melhores resultados, use um logotipo com fundo transparente, em formato PNG. Assim ele fica bem tanto em fundos claros quanto escuros.
:::

## Primeiro Dia da Semana

Escolha o dia em que seus calendários começam. A lista suspensa **Primeiro Dia da Semana**, na seção Informações da Igreja, vem definida como **domingo**, mas pode ser alterada para qualquer dia. Depois da mudança, ela é respeitada em todas as grades de calendário do B1 Admin e do portal de membros do B1.church. Os calendários de grupos, os calendários personalizados e o editor de eventos passam a exibir as semanas começando no dia escolhido.

## Fuso Horário

A lista suspensa **Fuso Horário**, na seção **Informações da Igreja**, define o fuso horário da sua igreja (por exemplo, *America/Chicago*). Escolha **Nenhum** para deixar em branco. Depois de salvar, o fuso aparece no resumo das Informações da Igreja.

O B1 usa esse fuso horário para os horários de toda a igreja, como lembretes de eventos e as programações exibidas nas TVs do [FreePlay](../../freeplay/scheduled-mode/scheduling-the-calendar.md). Os [horários de check-in](../attendance/setup.md#setting-a-check-in-schedule) são medidos primeiro no fuso horário do [campus](./campuses.md) onde o culto acontece, e só usam o fuso da igreja quando o campus não tem um definido. Se todos os seus campi estiverem no mesmo fuso horário, defina-o tanto na igreja quanto em cada campus.

## Região (Formato de Data e Telefone)

A configuração **Região** controla como datas e horários são escritos em todo o B1. Por padrão, as datas usam o formato dos Estados Unidos (por exemplo, "Sep 28, 2026" e "9/28/2026"). Igrejas fora dos EUA podem mudar para o formato do próprio país. Por exemplo, ao escolher inglês (Reino Unido), as datas passam a aparecer como "28 de set. de 2026" e "28/09/2026".

1. Na página Configurações, clique em **Região** na lista à esquerda e depois em **Editar** na seção **Região**.
2. Escolha sua região na lista suspensa **Região**. Cada opção mostra uma data de exemplo, para que você veja exatamente como as datas ficarão.
3. Clique em **Salvar**.

A seção Região mostra então a região selecionada, um exemplo do **Formato de data** e o seu formato de **Números de telefone**.

### Formato de Número de Telefone

A mesma seção Região tem a configuração **Números de telefone**, que controla como os números são inseridos no registro de uma pessoa:

- **Internacional (com código do país)** -- o padrão. Os campos de telefone exibem um seletor de bandeira do país e salvam os números com o código do país (por exemplo, +1 918 555 1234).
- **Local (como digitado)** -- os campos de telefone viram caixas de texto simples e salvam os números exatamente como você digita, sem adicionar o código do país (por exemplo, 0701 234 5678). Escolha esta opção se a sua igreja escreve os números em formato local e não quer que o B1 acrescente o código do país.

Quando **Local** está selecionado, a seção Região também exibe "Números de telefone locais" ao lado da sua região.

:::tip
O envio de SMS funciona melhor quando os números incluem o código do país. Se você envia mensagens pelo B1, mantenha o formato **Internacional** ou certifique-se de que os números digitados no modo Local incluam o código do país.
:::

Sua região se aplica às datas e aos horários em todo o B1 Admin e no seu site e portal de membros do B1.church, incluindo sermões, posts do blog, calendários de grupos e planos de escala. Assim, os membros veem as datas no mesmo formato que a equipe.

## Mensagens de Texto (SMS) {#texting}

Conecte um provedor de SMS para enviar mensagens de texto a uma pessoa ou a um grupo inteiro pelo B1 Admin. As mensagens são enviadas pela sua própria conta no provedor, portanto valem os preços e os limites dele.

1. Na página Configurações, clique em **Mensagens de Texto** na lista à esquerda e depois em **Editar** na seção **Mensagens de Texto**.
2. Escolha um **Provedor**:
   - **Clearstream** -- insira uma **Chave de API**. Crie uma em Configurações da Conta no Clearstream, na seção Chaves de API.
   - **Text In Church** -- insira uma **Chave de API**. Primeiro peça acesso à API para desenvolvedores ao suporte da Text In Church e, depois, crie uma chave na seção Configurações da Conta > API para Desenvolvedores.
   - **Nalo Solutions** (Gana) -- insira a chave de autenticação da sua conta na Nalo Solutions como **Chave de API**, e um **ID do Remetente** (até 11 caracteres) aprovado pela Nalo para a sua conta.
   - **Twilio** -- use a conta Twilio da sua igreja; a cobrança é feita diretamente pela Twilio. Copie o **Account SID** e o **Auth Token** do [Twilio Console](https://console.twilio.com) e insira um **Número de Origem**, que é um número de telefone da Twilio registrado para A2P 10DLC, no formato `+15551234567`. Depois de salvar, cole a URL do webhook de entrada (veja abaixo) no campo **A message comes in** do número, na Twilio, para que as respostas STOP também sejam registradas no B1.
3. Clique em **Salvar**.

Para parar de enviar mensagens, defina o **Provedor** como **Nenhum** e salve. Isso remove o provedor salvo.

### Cancelando o Envio para Quem Responde STOP

Depois de salvar um provedor, reabra a seção Mensagens de Texto com **Editar**. Abaixo das configurações do provedor, um campo somente leitura, **URL do webhook de entrada (STOP)**, mostra um endereço web exclusivo da sua igreja. Clique no campo para selecionar o endereço, copie-o e cole-o na configuração de webhook de mensagens recebidas (respostas) do seu provedor. Isso funciona com qualquer um dos provedores acima que possa encaminhar respostas recebidas para um webhook.

A partir daí, quando alguém responder **STOP** (ou STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT, OPTOUT ou REVOKE) a uma das suas mensagens, o B1 encontra todas as pessoas com aquele número de celular, marca-as como descadastradas e desativa seus lembretes por texto. Elas passam a ser ignoradas nas mensagens para grupos. Outras respostas são ignoradas.

:::info
Isso usa a mesma configuração de cancelamento de **Ocultar-me do diretório de membros**, então quem responde STOP também aparece como **Oculto do diretório** no próprio perfil. O campo só aparece enquanto o provedor salvo estiver selecionado. Se você trocar a lista para outro provedor, salve antes para voltar a ver a URL.
:::

Quando um provedor está conectado, a equipe com permissão para enviar mensagens vê um botão **Texto** na página de um grupo (**Enviar texto para este grupo**) e na página de uma pessoa com celular (**Enviar mensagem de texto**). Digite a mensagem e clique em **Enviar**. A janela conta os caracteres e os segmentos de SMS. No caso de um grupo, ela mostra quantos membros receberão a mensagem antes do envio:

- Membros sem celular cadastrado são ignorados.
- Membros que escolheram **Ocultar-me do diretório de membros** são contados como descadastrados e ignorados.
- Familiares que compartilham o mesmo número de celular recebem a mensagem apenas uma vez.

### Personalizando as Mensagens com Campos de Mesclagem {#personalizing-texts-with-merge-fields}

Abaixo da caixa de mensagem, a janela de texto mostra os marcadores: **Nome**, **Sobrenome**, **Nome de Exibição** e **Nome da Igreja**. Clique em um marcador para inserir seu espaço reservado (`{{firstName}}`, `{{lastName}}`, `{{displayName}}` ou `{{churchName}}`) na posição do cursor. Ao enviar, cada espaço reservado é substituído pelos dados do destinatário. Assim, uma mensagem para grupo como `Hi {{firstName}}, see you Sunday!` chega a cada membro com o próprio nome. Os espaços reservados funcionam tanto em mensagens para grupos quanto em mensagens para uma pessoa. Mensagens para grupos também oferecem o marcador **Nome do Grupo** (`{{groupName}}`), que é substituído pelo nome do grupo.

Para reutilizar uma mensagem, salve-a como um [modelo de texto](./email-templates.md#text-templates) (um modelo de e-mail com a categoria **Texto**) e escolha-o em **Carregar Modelo (opcional)**, no topo da janela de texto.

:::info
O limite de 1.600 caracteres se aplica à mensagem conforme você digita. Depois que os espaços reservados são preenchidos, qualquer texto com mais de 1.600 caracteres é cortado nesse tamanho.
:::

As mensagens também podem ser enviadas automaticamente por uma etapa de um [fluxo de trabalho](../serving/workflows.md#sending-a-text) com a ação **Enviar Texto**, que usa o mesmo provedor e os mesmos espaços reservados.

## Armazenamento de Arquivos

Por padrão, os arquivos que você envia para o seu site (pela seção [Arquivos](../website/files.md)) e para outras áreas de conteúdo usam o armazenamento hospedado e gratuito do B1, com limite de 100 MB. Se você precisar de mais espaço, pode conectar seu próprio armazenamento em nuvem. Os novos envios vão direto para a sua conta, sem limite da plataforma.

1. Na página Configurações, clique em **Armazenamento de Arquivos** na lista à esquerda e depois em **Editar** na seção **Armazenamento de Arquivos**.
2. Escolha um provedor: **Google Drive**, **Dropbox**, **OneDrive** ou um **bucket compatível com S3** (AWS S3, Cloudflare R2, Backblaze B2, etc.).
3. Para Google Drive, Dropbox ou OneDrive, clique em **Conectar** e faça login para autorizar o acesso. Para um bucket compatível com S3, insira sua chave de acesso, a chave secreta, o nome do bucket e a URL base pública.
4. Clique em **Salvar**.

:::info
Isso afeta apenas os novos envios para os Arquivos do seu site e para áreas de conteúdo semelhantes. Imagens de galeria, miniaturas, logotipos e fotos de pessoas continuam sempre no armazenamento padrão do B1.
:::

## Promoção de Série

Se você registra a **Série** de crianças e alunos, o B1 pode avançar automaticamente todos para a série seguinte em uma data escolhida por você (por exemplo, 1º de agosto), sem que seja preciso editar cada perfil manualmente.

1. Na página Configurações, clique em **Promoção de Série** na lista à esquerda e depois em **Editar** na seção **Promoção de Série**.
2. Ative a chave (ela mostra **Ativado**) e escolha o **Mês** e o **Dia** em que as séries serão promovidas a cada ano. Nessa data, todos com uma série avançam uma série, e os alunos do 12º ano passam para **Formado**.
3. Salve as alterações.

Para interromper a promoção automática, desative a chave, para que ela mostre **Desativado**, e salve. A data de promoção é removida e as séries deixam de mudar sozinhas.

## Inscrição de Voluntários {#volunteer-signup}

Por padrão, os membros que consultam as [inscrições de voluntários](../../b1-church/serving/volunteer-signup.md) veem todas as semanas futuras com vagas abertas. Se essa lista ficar longa, você pode mostrar apenas a próxima semana de cada tipo de plano.

1. Na página Configurações, clique em **Inscrição de Voluntários** na lista à esquerda e depois em **Editar** na seção **Inscrição de Voluntários**.
2. Ative a opção **Mostrar apenas a próxima semana de cada tipo de plano**.
3. Salve as alterações.

Com essa opção ativada, cada tipo de plano mostra somente o seu próximo plano futuro. A semana seguinte aparece quando essa data passa. A linha **Semanas exibidas** da seção mostra **Somente a próxima semana de cada tipo de plano** ou **Todas as semanas futuras**.

## Privacidade das Doações {#giving-privacy}

Pessoas com acesso às doações normalmente veem os totais de doação de uma pessoa no [registro dela](../people/adding-people.md#editing-details). Se você preferir não mostrar os valores na tela sempre que um registro for aberto, pode ocultá-los até que alguém peça para vê-los.

1. Na página Configurações, clique em **Privacidade das doações** na lista à esquerda e depois em **Editar** na seção **Privacidade das doações**.
2. Ative a opção **Ocultar doações nos registros de pessoas até que sejam clicadas**.
3. Salve as alterações.

Com essa opção ativada, o cartão de doações no registro de uma pessoa exibe "As doações estão ocultas nos registros de pessoas." Clique em **Mostrar doações** para carregar e exibir as doações daquela pessoa. Elas são ocultadas novamente quando você abre outro registro. Quem pode ver as doações não muda: apenas as pessoas com acesso às doações veem o cartão.

## Importação e Exportação

O link **Importação/Exportação**, abaixo do nome da sua igreja na página Configurações, abre uma ferramenta dedicada em uma nova janela do navegador. Use-a para:

- Importar dados de membros de outro sistema de gestão de igrejas.
- Exportar seus dados da ChurchApps para backup ou migração.

Isso é especialmente útil quando você está configurando a igreja pela primeira vez e precisa transferir registros existentes para a ChurchApps.

:::warning
Ao importar dados, faça sempre um backup dos registros existentes antes. As operações de importação adicionam dados ao sistema e podem criar entradas duplicadas se forem executadas mais de uma vez.
:::
