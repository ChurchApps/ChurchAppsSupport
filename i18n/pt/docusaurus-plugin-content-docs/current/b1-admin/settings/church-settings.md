---
title: "Configurações da Igreja"
---

# Configurações da Igreja

<div class="article-intro">

A página Configurações da Igreja é onde você configura as informações básicas da sua igreja, os dados de contato e a identidade visual. Esses dados são usados em todas as ferramentas da ChurchApps, incluindo o seu site B1.church e o aplicativo B1 Mobile.

</div>

<div class="prereqs">
<h4>Antes de começar</h4>

- Você precisa da permissão "Editar Configurações da Igreja". Veja [Funções e Permissões](./roles-permissions.md) se não tiver acesso.
- Tenha em mãos o endereço, as informações de contato e o logotipo da sua igreja

</div>

## Editando as informações da igreja

1. No B1 Admin, abra o [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (a barra de busca no canto superior esquerdo), expanda **Configurações** e clique em **Configurações**.
2. Na seção **Informações da Igreja** (no topo da página), clique em **Editar**.
3. Atualize qualquer um dos campos a seguir:
   - **Nome da Igreja** -- O nome exibido em todos os produtos da ChurchApps.
   - **Endereço** -- O endereço físico da sua igreja.
   - **Informações de Contato** -- Telefone, e-mail e outros dados de contato.
   - **Fuso Horário** -- O fuso horário da sua igreja. Veja [Fuso Horário](#time-zone) abaixo.
4. Clique em **Salvar** para aplicar as alterações.

## Configurando seu subdomínio

Sua igreja recebe um subdomínio gratuito em **suaigreja.1.church**. Este é o endereço web onde membros e visitantes podem acessar a presença online da sua igreja.

1. Na página Configurações, clique em **Editar** na seção **Informações da Igreja** e localize o campo **Subdomínio**.
2. Digite o subdomínio desejado (por exemplo, "igrejaesperanca" para igrejaesperanca.1.church).
3. Salve as alterações.

:::info
Seu subdomínio precisa ser exclusivo entre todas as igrejas da ChurchApps. Se o nome desejado já estiver em uso, tente acrescentar sua cidade ou estado (por exemplo, "igrejaesperanca-curitiba").
:::

Se você quiser que os visitantes acessem seu site por um domínio próprio (por exemplo, **www.igrejaesperanca.org.br**), veja [Domínio Personalizado](./custom-domain.md).

## Configurando a identidade visual

Personalize a forma como sua igreja aparece em todas as ferramentas da ChurchApps:

1. Envie o **logotipo da igreja** clicando na área do logotipo e selecionando um arquivo de imagem.
2. Adicione outras **imagens da igreja** usadas no seu site e no [aplicativo móvel](./mobile-app.md).

:::tip
Para melhores resultados, use um logotipo em formato PNG com fundo transparente. Assim ele fica ótimo tanto em fundos claros quanto escuros.
:::

## Primeiro dia da semana

Escolha em qual dia seus calendários começam. A lista suspensa **Primeiro Dia da Semana**, na seção Informações da Igreja, vem definida como **Domingo**, mas pode ser ajustada para qualquer dia. Depois de alterada, a escolha é respeitada nas grades de calendário do B1 Admin e do portal de membros do B1.church: calendários de grupos, calendários curados e o editor de eventos montam as semanas a partir do dia escolhido.

## Fuso horário

A lista suspensa **Fuso Horário**, na seção **Informações da Igreja**, define o fuso horário da sua igreja (por exemplo, *America/Sao_Paulo*). Escolha **Nenhum** para deixar em branco. Depois de salvo, o fuso aparece no resumo das Informações da Igreja.

O B1 usa esse fuso horário para os horários de toda a igreja, como lembretes de eventos e as programações das suas TVs com [FreePlay](../../freeplay/scheduled-mode/scheduling-the-calendar.md). Os [horários de check-in](../attendance/setup.md#setting-a-check-in-schedule) são medidos primeiro no fuso horário do [campus](./campuses.md) do culto, e só usam o fuso horário da igreja quando o campus não tem um. Se todos os seus campus estiverem no mesmo fuso horário, defina-o tanto na igreja quanto em cada campus.

## Região (formato de data e telefone)

A configuração **Região** controla como datas e horários são escritos em todo o B1. Por padrão, as datas usam o formato dos Estados Unidos (por exemplo, "Sep 28, 2026" e "9/28/2026"). Igrejas fora dos EUA podem mudar para o formato do seu país. Por exemplo, ao escolher Português (Brasil), as datas aparecem como "28 de set. de 2026" e "28/09/2026".

1. Na página Configurações, clique em **Região** na lista à esquerda e depois em **Editar**, na seção **Região**.
2. Escolha sua região na lista suspensa **Região**. Cada opção mostra uma data de exemplo, para que você veja exatamente como as datas vão aparecer.
3. Clique em **Salvar**.

A seção Região então mostra a região selecionada, um exemplo do **Formato de data** e o formato dos seus **Números de telefone**.

### Formato do número de telefone

A mesma seção Região tem a configuração **Números de telefone**, que controla como os telefones são digitados no cadastro de uma pessoa:

- **Internacional (com código do país)**: o padrão. Os campos de telefone mostram um seletor de bandeira do país e salvam os números com o código do país (por exemplo, +55 41 91234 5678).
- **Local (como digitado)**: os campos de telefone viram caixas de texto simples e salvam os números exatamente como você os digita, sem acrescentar código do país (por exemplo, 41 91234-5678). Escolha esta opção se a sua igreja escreve os números em formato local e não quer que o B1 acrescente um código de país.

Quando **Local** está selecionado, a seção Região também mostra "Números de telefone locais" ao lado da sua região.

:::tip
O envio de mensagens de texto funciona melhor quando os números incluem o código do país. Se você envia mensagens pelo B1, mantenha o formato **Internacional** ou certifique-se de que os números digitados no modo Local incluam o código do país.
:::

Sua região se aplica a datas e horários em todo o B1 Admin e no seu site e portal de membros do B1.church, incluindo sermões, posts do blog, calendários de grupos e planos de serviço, para que os membros vejam as datas no mesmo formato que a equipe.

## Mensagens de texto {#texting}

Conecte um provedor de mensagens de texto para enviar SMS a uma pessoa ou a um grupo inteiro pelo B1 Admin. As mensagens são enviadas pela sua própria conta no provedor, então valem os preços e os limites dele.

1. Na página Configurações, clique em **Mensagens de texto** na lista à esquerda e depois em **Editar**, na seção **Mensagens de texto**.
2. Escolha um **Provedor**:
   - **Clearstream**: informe uma **Chave de API**. Crie uma nas Configurações da sua conta Clearstream, em Chaves de API.
   - **Text In Church**: informe uma **Chave de API**. Peça primeiro acesso à API para desenvolvedores ao suporte da Text In Church e, depois, crie uma chave em Configurações da conta > seção API para Desenvolvedores.
   - **Nalo Solutions** (Gana): informe a chave de autenticação da sua conta Nalo Solutions como **Chave de API** e um **ID de remetente** (até 11 caracteres) aprovado pela Nalo para você.
   - **Twilio**: use a conta Twilio da sua igreja; a Twilio cobra diretamente de você. Copie o **Account SID** e o **Auth Token** do [Console da Twilio](https://console.twilio.com) e informe um **Número de origem**: um número de telefone da Twilio registrado para A2P 10DLC, em um formato como `+15551234567`. Depois de salvar, cole a URL do webhook de entrada (veja abaixo) no webhook **A message comes in** do número na Twilio, para que as respostas STOP também sejam registradas no B1.
3. Clique em **Salvar**.

Para parar de enviar mensagens, defina o **Provedor** como **Nenhum** e salve. Isso remove o provedor salvo.

### Cancelando o envio para pessoas que respondem STOP

Depois que um provedor é salvo, reabra a seção Mensagens de texto com **Editar**. Abaixo das configurações do provedor, um campo somente leitura **URL do webhook de entrada (STOP)** mostra um endereço web exclusivo da sua igreja. Clique no campo para selecionar o endereço, copie-o e cole-o na configuração de webhook de mensagens recebidas (respostas) do seu provedor de mensagens de texto. Isso funciona com qualquer um dos provedores acima que consiga encaminhar as respostas recebidas para um webhook.

Depois disso, quando alguém responder **STOP** (ou STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT, OPTOUT ou REVOKE) a uma das suas mensagens, o B1 localiza todas as pessoas cujo número de celular corresponde, as marca como cancelada e desativa os lembretes por mensagem de texto delas. Elas são então ignoradas nos envios em grupo. Outras respostas são ignoradas.

:::info
Isso usa a mesma configuração de cancelamento de **Ocultar-me do diretório de membros**, então quem responde STOP também aparece como **Oculto do diretório** no perfil. O campo só aparece enquanto o provedor salvo estiver selecionado: se você trocar a seleção para outro provedor, salve primeiro para ver a URL novamente.
:::

Depois que um provedor estiver conectado, a equipe com permissão para enviar mensagens vê um botão **Mensagem de texto** na página de um grupo (**Enviar mensagem de texto a este grupo**) e na página de uma pessoa com celular (**Enviar mensagem de texto**). Digite sua mensagem e clique em **Enviar**. A caixa de diálogo conta os caracteres e os segmentos de SMS. Para um grupo, ela mostra quantos membros receberão a mensagem antes do envio:

- Membros sem celular cadastrado são ignorados.
- Membros que escolheram **Ocultar-me do diretório de membros** são contados como cancelados e ignorados.
- Familiares que compartilham o mesmo número de celular recebem a mensagem apenas uma vez.

### Personalizando as mensagens com campos de mesclagem {#personalizing-texts-with-merge-fields}

Abaixo da caixa de mensagem, a caixa de diálogo de Mensagem de texto mostra chips de marcadores: **Nome**, **Sobrenome**, **Nome de Exibição** e **Nome da Igreja**. Clique em um chip para inserir seu marcador (`{{firstName}}`, `{{lastName}}`, `{{displayName}}` ou `{{churchName}}`) na posição do cursor. Quando a mensagem é enviada, cada marcador é substituído pelos dados do destinatário. Assim, uma mensagem em grupo como `Oi {{firstName}}, nos vemos no domingo!` chega a cada membro com o próprio nome. Os marcadores funcionam tanto em mensagens para grupos quanto para uma pessoa só.

:::info
O limite de 1.600 caracteres se aplica à mensagem como você a digita. Depois que os marcadores são preenchidos, qualquer texto com mais de 1.600 caracteres é cortado nesse tamanho.
:::

As mensagens também podem ser enviadas automaticamente por uma etapa de [fluxo de trabalho](../serving/workflows.md#sending-a-text) com a ação **Enviar Mensagem de Texto**, que usa o mesmo provedor e os mesmos marcadores.

## Armazenamento de arquivos

Por padrão, os arquivos que você envia ao seu site (pela área de [Arquivos](../website/files.md)) e a outras áreas de conteúdo usam o armazenamento hospedado gratuito do B1, de até 100 MB. Se precisar de mais espaço, você pode conectar seu próprio armazenamento em nuvem. Assim, os novos envios vão direto para a sua conta, sem limite da plataforma.

1. Na página Configurações, clique em **Armazenamento de Arquivos** na lista à esquerda e depois em **Editar**, na seção **Armazenamento de Arquivos**.
2. Escolha um provedor: **Google Drive**, **Dropbox**, **OneDrive** ou um **bucket compatível com S3** (AWS S3, Cloudflare R2, Backblaze B2 etc.).
3. Para Google Drive, Dropbox ou OneDrive, clique em **Conectar** e faça login para autorizar o acesso. Para um bucket compatível com S3, informe sua chave de acesso, a chave secreta, o nome do bucket e a base de URL pública.
4. Clique em **Salvar**.

:::info
Isso afeta apenas os novos envios para os Arquivos do seu site e áreas de conteúdo semelhantes. Imagens de galeria, miniaturas, logotipos e fotos de pessoas sempre permanecem no armazenamento padrão do B1.
:::

## Promoção de série

Se você registra a **Série** de crianças e estudantes, o B1 pode avançar automaticamente todos uma série em uma data que você escolher (por exemplo, 1º de agosto), em vez de exigir que você edite cada perfil manualmente.

1. Na página Configurações, clique em **Promoção de Série** na lista à esquerda e depois em **Editar**, na seção **Promoção de Série**.
2. Ative a chave (ela mostra **Ativado**) e escolha o **Mês** e o **Dia** em que as séries serão promovidas a cada ano. Nessa data, todos com uma série avançam uma série, e os alunos da 12ª série passam a **Formados**.
3. Salve as alterações.

Para interromper a promoção automática, desligue a chave para que ela mostre **Desativado** e salve. A data de promoção é removida e as séries não mudam mais sozinhas.

## Inscrição de voluntários {#volunteer-signup}

Por padrão, os membros que navegam pelas [inscrições de voluntários](../../b1-church/serving/volunteer-signup.md) veem todas as semanas futuras que têm posições abertas. Se essa lista ficar longa, você pode mostrar apenas a próxima semana de cada tipo de plano.

1. Na página Configurações, clique em **Inscrição de Voluntários** na lista à esquerda e depois em **Editar**, na seção **Inscrição de Voluntários**.
2. Ative **Mostrar apenas a próxima semana de cada tipo de plano**.
3. Salve as alterações.

Com essa opção ativada, cada tipo de plano mostra apenas o próximo plano. A semana seguinte aparece quando essa data passa. A linha **Semanas exibidas** da seção mostra **Somente a próxima semana de cada tipo de plano** ou **Todas as semanas futuras**.

## Privacidade de doações {#giving-privacy}

Pessoas com acesso a doações normalmente veem os totais de doação de uma pessoa no [cadastro dela](../people/adding-people.md#editing-details). Se você preferir não mostrar os valores na tela toda vez que um cadastro é aberto, pode ocultá-los até que alguém os solicite.

1. Na página Configurações, clique em **Privacidade de doações** na lista à esquerda e depois em **Editar**, na seção **Privacidade de doações**.
2. Ative **Ocultar doações nos cadastros de pessoas até clicar**.
3. Salve as alterações.

Com essa opção ativada, o cartão de doações no cadastro de uma pessoa diz "As doações estão ocultas nos cadastros de pessoas." Clique em **Mostrar doações** para carregar e exibir as doações daquela pessoa. Elas são ocultadas novamente quando você abre outra pessoa. Quem pode ver as doações não muda: apenas as pessoas com acesso a doações veem o cartão.

## Importação e exportação

O link **Importar/Exportar**, abaixo do nome da sua igreja na página Configurações, abre uma ferramenta dedicada em uma nova janela do navegador. Use-a para:

- Importar dados de membros de outro sistema de gestão de igrejas.
- Exportar seus dados da ChurchApps para backup ou migração.

Isso é especialmente útil quando você está configurando a sua igreja pela primeira vez e precisa transferir cadastros existentes para a ChurchApps.

:::warning
Ao importar dados, faça sempre um backup dos seus cadastros existentes antes. As operações de importação adicionam dados ao sistema e podem criar registros duplicados se forem executadas mais de uma vez.
:::
