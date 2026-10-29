---
title: "Configurações da Igreja"
---

# Configurações da Igreja

<div class="article-intro">

A página Configurações da Igreja é onde você configura as informações básicas da sua igreja, os dados de contato e a identidade visual. Esses dados são usados em todas as ferramentas do ChurchApps, incluindo o seu site do B1.church e o aplicativo B1 Mobile.

</div>

## Vídeo de Treinamento

<YouTube id="634zSbzDkYA" title="Setting Up Church Info and Branding in B1" next="Roles, Permissions, and Inviting Your Team in B1" nextUrl="/docs/b1-admin/settings/roles-permissions" />

<div class="prereqs">
<h4>Antes de Começar</h4>

- Você precisa da permissão "Editar Configurações da Igreja". Consulte [Funções e Permissões](./roles-permissions.md) se você não tiver acesso.
- Tenha em mãos o endereço, as informações de contato e o logotipo da sua igreja

</div>

## Editando as Informações da Igreja

1. No B1 Admin, abra o [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (a barra de pesquisa no canto superior esquerdo), expanda **Configurações** e clique em **Configurações**.
2. Na seção **Informações da Igreja** (no topo da página), clique em **Editar**.
3. Atualize qualquer um dos campos a seguir:
   - **Nome da Igreja** -- O nome exibido em todos os produtos do ChurchApps.
   - **Endereço** -- O endereço físico da sua igreja.
   - **Informações de contato** -- Telefone, e-mail e outros dados de contato.
   - **Fuso horário** -- O fuso horário da sua igreja. Consulte [Fuso horário](#time-zone) abaixo.
4. Clique em **Salvar** para aplicar as alterações.

## Configurando o Seu Subdomínio

Sua igreja recebe um subdomínio gratuito em **yourchurch.1.church**. Este é o endereço web onde membros e visitantes podem acessar a presença online da sua igreja.

1. Na página Configurações, clique em **Editar** na seção **Informações da Igreja** e localize o campo **Subdomínio**.
2. Digite o subdomínio desejado (por exemplo, "gracechurch" para gracechurch.1.church).
3. Salve suas alterações.

:::info
Seu subdomínio precisa ser único entre todas as igrejas do ChurchApps. Se o nome desejado já estiver em uso, tente acrescentar sua cidade ou estado (por exemplo, "gracechurch-dallas").
:::

Se você quiser que os visitantes acessem seu site pelo seu próprio domínio (por exemplo, **`www.gracechurch.org`**), consulte [Domínio Personalizado](./custom-domain.md).

## Configurando a Identidade Visual

Personalize a aparência da sua igreja em todas as ferramentas do ChurchApps:

1. Envie o **logotipo da igreja** clicando na área do logotipo e selecionando um arquivo de imagem.
2. Adicione outras **imagens da igreja** usadas no seu site e no [aplicativo mobile](./mobile-app.md).

:::tip
Para melhores resultados, use um logotipo com fundo transparente no formato PNG. Assim ele fica ótimo tanto em fundos claros quanto escuros.
:::

## Primeiro Dia da Semana

Escolha em qual dia seus calendários começam. O menu suspenso **Primeiro Dia da Semana**, na seção Informações da Igreja, vem definido como **Domingo**, mas pode ser alterado para qualquer dia. Depois de alterado, essa configuração é respeitada nas grades de calendário do B1 Admin e do portal de membros do B1.church -- os calendários de grupos, os calendários selecionados e o editor de eventos montam as semanas começando no dia que você escolher.

## Fuso Horário {#time-zone}

O menu suspenso **Fuso horário**, na seção **Informações da Igreja**, define o fuso horário da sua igreja (por exemplo, *America/Chicago*). Escolha **Nenhum** para deixá-lo em branco. Depois de salvo, o fuso aparece no resumo das Informações da Igreja.

O B1 usa esse fuso horário para os horários de toda a igreja, como lembretes de eventos e as programações das TVs do seu [FreePlay](../../freeplay/scheduled-mode/scheduling-the-calendar.md). Os [horários de check-in](../attendance/setup.md#setting-a-check-in-schedule) são medidos primeiro no fuso horário do [campus](./campuses.md) do culto e só usam o fuso horário da igreja quando o campus não tiver um. Se todos os seus campi estiverem no mesmo fuso horário, defina-o tanto na igreja quanto em cada campus.

## Região (Formato de Data e Telefone)

A configuração **Região** controla como datas e horários são escritos em todo o B1. Por padrão, as datas usam o formato dos Estados Unidos (por exemplo, "Sep 28, 2026" e "9/28/2026"). Igrejas fora dos EUA podem alterar para o formato do seu país -- por exemplo, ao escolher Inglês (Reino Unido), as datas aparecem como "28 Sept 2026" e "28/09/2026".

1. Na página Configurações, clique em **Região** na lista à esquerda e, em seguida, clique em **Editar** na seção **Região**.
2. Escolha sua região no menu suspenso **Região**. Cada opção mostra uma data de exemplo para que você veja exatamente como as datas ficarão.
3. Clique em **Salvar**.

A seção Região exibe então a região selecionada, um exemplo do **Formato de data** e o formato de **Números de telefone**.

### Formato de Número de Telefone

A mesma seção Região tem a configuração **Números de telefone**, que controla como os números de telefone são digitados no cadastro de uma pessoa:

- **Internacional (com código do país)** -- o padrão. Os campos de telefone exibem um seletor de bandeira do país e salvam os números com o código do país (por exemplo, +1 918 555 1234).
- **Local (como digitado)** -- os campos de telefone viram caixas de texto simples e salvam os números exatamente como você os digita, sem adicionar o código do país (por exemplo, 0701 234 5678). Escolha esta opção se sua igreja escreve os números em um formato local e não quer que o B1 adicione um código de país.

Quando **Local** estiver selecionado, a seção Região também exibe "Números de telefone locais" ao lado da sua região.

:::tip
O envio de mensagens de texto funciona melhor quando os números incluem o código do país. Se você envia SMS pelo B1, mantenha o formato **Internacional** ou certifique-se de que os números digitados no modo Local incluam o código do país.
:::

Sua região se aplica às datas e horários em todo o B1 Admin e no seu site e portal de membros do B1.church, incluindo sermões, posts do blog, calendários de grupos e planos de escala, para que os membros vejam as datas no mesmo formato que a sua equipe.

## Mensagens de Texto {#texting}

Conecte um provedor de mensagens de texto para enviar SMS para uma pessoa ou para um grupo inteiro a partir do B1 Admin. As mensagens são enviadas pela sua própria conta no provedor, portanto os preços e limites dele se aplicam.

1. Na página Configurações, clique em **Mensagens de Texto** na lista à esquerda e, em seguida, clique em **Editar** na seção **Mensagens de Texto**.
2. Escolha um **Provedor**:
   - **Clearstream** -- informe uma **Chave de API**. Crie uma em Configurações da Conta no Clearstream, em Chaves de API.
   - **Text In Church** -- informe uma **Chave de API**. Peça primeiro acesso à API para desenvolvedores ao Suporte do Text In Church e, em seguida, crie uma chave na seção Developer API das Configurações da sua conta.
   - **Nalo Solutions** (Gana) -- informe a chave de autenticação da sua conta na Nalo Solutions como **Chave de API** e um **ID do Remetente** (de até 11 caracteres) aprovado pela Nalo para você.
   - **Twilio** -- use a conta Twilio da sua igreja; a Twilio cobra diretamente de você. Copie o **Account SID** e o **Auth Token** do [Console da Twilio](https://console.twilio.com) e informe um **Número de Origem** -- um número de telefone da Twilio registrado para A2P 10DLC, em um formato como `+15551234567`. Depois de salvar, cole a URL de webhook de entrada (veja abaixo) no campo **A message comes in** do número na Twilio, para que as respostas STOP também sejam registradas no B1.
3. Clique em **Salvar**.

Para parar de enviar mensagens de texto, defina o **Provedor** como **Nenhum** e salve. Isso remove o provedor salvo.

### Cancelando a Inscrição de Quem Responde STOP

Depois que um provedor estiver salvo, reabra a seção Mensagens de Texto com **Editar**. Abaixo das configurações do provedor, um campo somente leitura **URL de webhook de STOP (entrada)** mostra um endereço web exclusivo da sua igreja. Clique no campo para selecionar o endereço, copie-o e cole-o na configuração de webhook de mensagens recebidas (respostas) do seu provedor de mensagens de texto. Isso funciona com qualquer um dos provedores acima que possa encaminhar respostas recebidas para um webhook.

Depois disso, quando alguém responder **STOP** (ou STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT, OPTOUT ou REVOKE) a um dos seus textos, o B1 localiza todas as pessoas cujo número de celular corresponde, marca-as como descadastradas e desativa os lembretes de texto delas. Elas então são ignoradas nas mensagens em grupo. Outras respostas são ignoradas.

:::info
Isso usa a mesma configuração de cancelamento da opção **Ocultar-me do diretório de membros**, então quem responde STOP também aparece como **Oculto do diretório** no perfil. O campo só aparece enquanto o provedor salvo estiver selecionado -- se você trocar o menu suspenso para outro provedor, salve primeiro para ver a URL novamente.
:::

Quando um provedor estiver conectado, a equipe com permissão para enviar mensagens verá um botão **Texto** na página de um grupo (**Enviar texto para este grupo**) e na página de uma pessoa com celular (**Enviar mensagem de texto**). Digite sua mensagem e clique em **Enviar**. A janela conta os caracteres e os segmentos de SMS. Para um grupo, ela mostra quantos membros receberão a mensagem antes de você enviar:

- Membros sem celular cadastrado são ignorados.
- Membros que escolheram **Ocultar-me do diretório de membros** são contados como descadastrados e ignorados.
- Familiares que compartilham o mesmo número de celular recebem a mensagem apenas uma vez.

### Personalizando Mensagens com Campos de Mesclagem {#personalizing-texts-with-merge-fields}

Abaixo da caixa de mensagem, a janela de texto exibe chips de campos: **Nome**, **Sobrenome**, **Nome de Exibição** e **Nome da Igreja**. Clique em um chip para inserir o marcador correspondente (`{{firstName}}`, `{{lastName}}`, `{{displayName}}` ou `{{churchName}}`) na posição do cursor. Quando a mensagem é enviada, cada marcador é substituído pelos dados de cada destinatário, então uma mensagem em grupo como `Oi {{firstName}}, nos vemos no domingo!` chega a cada membro com o próprio nome. Os marcadores funcionam tanto para mensagens em grupo quanto para mensagens a uma única pessoa. As mensagens para um grupo também oferecem um chip **Nome do Grupo** (`{{groupName}}`), que é substituído pelo nome do grupo.

Para reutilizar uma mensagem, salve-a como um [modelo de texto](./email-templates.md#text-templates) (um modelo de e-mail com a categoria **Texto**) e escolha-o em **Carregar Modelo (opcional)**, no topo da janela de texto.

:::info
O limite de 1.600 caracteres se aplica à mensagem como você a digita. Depois que os marcadores são preenchidos, qualquer texto com mais de 1.600 caracteres é cortado nesse tamanho.
:::

As mensagens também podem ser enviadas automaticamente por uma etapa de [fluxo de trabalho](../serving/workflows.md#sending-a-text) com a ação **Enviar Texto**, que usa o mesmo provedor e os mesmos marcadores.

## Armazenamento de Arquivos

Por padrão, os arquivos que você envia para o seu site (pela seção [Arquivos](../website/files.md)) e outras áreas de conteúdo usam o armazenamento hospedado gratuito do B1, de até 100 MB. Se precisar de mais espaço, você pode conectar o seu próprio armazenamento em nuvem -- os novos envios vão direto para a sua conta, sem limite da plataforma.

1. Na página Configurações, clique em **Armazenamento de Arquivos** na lista à esquerda e, em seguida, clique em **Editar** na seção **Armazenamento de Arquivos**.
2. Escolha um provedor: **Google Drive**, **Dropbox**, **OneDrive** ou um **bucket compatível com S3** (AWS S3, Cloudflare R2, Backblaze B2, etc.).
3. Para Google Drive, Dropbox ou OneDrive, clique em **Conectar** e faça login para autorizar o acesso. Para um bucket compatível com S3, informe sua chave de acesso, o segredo, o nome do bucket e a base da URL pública.
4. Clique em **Salvar**.

:::info
Isso afeta apenas os novos envios para os Arquivos do seu site e áreas de conteúdo semelhantes. Imagens de galeria, miniaturas, logotipos e fotos de pessoas sempre ficam no armazenamento padrão do B1.
:::

## Promoção de Série

Se você registra a **Série** de crianças e alunos, o B1 pode avançar automaticamente todos uma série em uma data que você escolher (por exemplo, 1º de agosto), em vez de exigir que você edite cada perfil manualmente.

1. Na página Configurações, clique em **Promoção de Série** na lista à esquerda e, em seguida, clique em **Editar** na seção **Promoção de Série**.
2. Ative a chave (ela mostra **Ativado**) e escolha o **Mês** e o **Dia** em que as séries serão promovidas a cada ano. Nessa data, todos com uma série avançam uma série, e os alunos da 12ª série passam a **Formados**.
3. Salve suas alterações.

Para interromper a promoção automática, desative a chave para que ela mostre **Desativado** e salve. A data de promoção é removida e as séries deixam de mudar sozinhas.

## Inscrição de Voluntários {#volunteer-signup}

Por padrão, os membros que navegam pelas [inscrições de voluntários](../../b1-church/serving/volunteer-signup.md) veem todas as semanas futuras que têm vagas abertas. Se essa lista ficar longa, você pode mostrar apenas a próxima semana de cada tipo de escala.

1. Na página Configurações, clique em **Inscrição de Voluntários** na lista à esquerda e, em seguida, clique em **Editar** na seção **Inscrição de Voluntários**.
2. Ative a opção **Mostrar apenas a próxima semana de cada tipo de escala**.
3. Salve suas alterações.

Com essa opção ativada, cada tipo de escala mostra apenas a sua próxima escala. A semana seguinte aparece assim que essa data passar. A linha **Semanas exibidas** da seção mostra **Apenas a próxima semana de cada tipo de escala** ou **Todas as semanas futuras**.

## Privacidade de Doações {#giving-privacy}

Pessoas com acesso a doações normalmente veem os totais de doações de uma pessoa no [cadastro dela](../people/adding-people.md#editing-details). Se você preferir não mostrar os valores na tela sempre que um cadastro for aberto, pode ocultá-los até que alguém os solicite.

1. Na página Configurações, clique em **Privacidade de doações** na lista à esquerda e, em seguida, clique em **Editar** na seção **Privacidade de doações**.
2. Ative a opção **Ocultar doações nos cadastros de pessoas até clicar**.
3. Salve suas alterações.

Com essa opção ativada, o cartão de doações no cadastro de uma pessoa diz "As doações estão ocultas nos cadastros de pessoas." Clique em **Mostrar doações** para carregar e exibir as doações daquela pessoa. Ele volta a ficar oculto quando você abre outra pessoa. Quem pode ver as doações não muda: apenas as pessoas com acesso a doações veem o cartão.

## Importação e Exportação

O link **Importar/Exportar** abaixo do nome da sua igreja, na página Configurações, abre uma ferramenta dedicada em uma nova janela do navegador. Use-a para:

- Importar dados de membros de outro sistema de gestão de igrejas.
- Exportar seus dados do ChurchApps para backup ou migração.

Isso é especialmente útil quando você está configurando sua igreja pela primeira vez e precisa transferir cadastros existentes para o ChurchApps.

:::warning
Ao importar dados, sempre faça primeiro um backup dos seus cadastros existentes. As operações de importação adicionam dados ao sistema e podem criar registros duplicados se forem executadas várias vezes.
:::
