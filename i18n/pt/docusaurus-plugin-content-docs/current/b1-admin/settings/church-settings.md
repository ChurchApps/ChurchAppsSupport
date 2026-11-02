---
title: "Configurações da igreja"
---

# Configurações da igreja

<div class="article-intro">

A página Configurações da igreja é onde você configura as informações básicas da sua igreja, os dados de contato e a identidade visual. Esses dados são usados em todas as ferramentas do ChurchApps, incluindo o site B1.church e o aplicativo B1 Mobile.

</div>

## Vídeo de treinamento

<YouTube id="634zSbzDkYA" title="Configurando as informações e a identidade visual da igreja no B1" next="Funções, permissões e convite da sua equipe no B1" nextUrl="/docs/b1-admin/settings/roles-permissions" />

<div class="prereqs">
<h4>Antes de começar</h4>

- Você precisa da permissão "Editar configurações da igreja". Veja [Funções e permissões](./roles-permissions.md) se você não tiver acesso.
- Tenha em mãos o endereço, as informações de contato e o logotipo da sua igreja

</div>

## Editando as informações da igreja

1. No B1 Admin, abra o [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (a barra de pesquisa no canto superior esquerdo), expanda **Configurações** e clique em **Configurações**.
2. Na seção **Informações da igreja** (no topo da página), clique em **Editar**.
3. Atualize qualquer um dos campos a seguir:
   - **Nome da igreja** -- O nome exibido em todos os produtos do ChurchApps.
   - **Endereço** -- O endereço físico da sua igreja.
   - **Informações de contato** -- Telefone, e-mail e outros dados de contato.
   - **Fuso horário** -- O fuso horário da sua igreja. Veja [Fuso horário](#time-zone) abaixo.
4. Clique em **Salvar** para aplicar as alterações.

## Configurando seu subdomínio

Sua igreja recebe um subdomínio gratuito em **suaigreja.1.church**. Este é o endereço web onde membros e visitantes podem acessar a presença online da sua igreja.

1. Na página Configurações, clique em **Editar** na seção **Informações da igreja** e localize o campo **Subdomínio**.
2. Digite o subdomínio desejado (por exemplo, "igrejadagraca" para igrejadagraca.1.church).
3. Salve as alterações.

:::info
O seu subdomínio precisa ser exclusivo entre todas as igrejas do ChurchApps. Se o nome desejado já estiver em uso, tente acrescentar a sua cidade ou estado (por exemplo, "igrejadagraca-campinas").
:::

Se você quiser que os visitantes acessem o seu site pelo seu próprio domínio (por exemplo, **`www.igrejadagraca.org`**), veja [Domínio personalizado](./custom-domain.md).

## Configurando a identidade visual

Personalize a forma como a sua igreja aparece em todas as ferramentas do ChurchApps:

1. Envie o **logotipo da igreja** clicando na área do logotipo e selecionando um arquivo de imagem.
2. Adicione outras **imagens da igreja** usadas no seu site e no [aplicativo móvel](./mobile-app.md).

:::tip
Para melhores resultados, use um logotipo com fundo transparente, em formato PNG. Isso garante que ele fique bem em fundos claros e escuros.
:::

## Primeiro dia da semana

Escolha em qual dia da semana os seus calendários começam. A lista suspensa **Primeiro dia da semana** na seção Informações da igreja vem definida como **Domingo**, mas pode ser alterada para qualquer dia. Depois de alterada, ela é respeitada nas grades de calendário do B1 Admin e do portal de membros do B1.church — os calendários de grupos, os calendários selecionados e o editor de eventos montam as semanas começando no dia que você escolher.

## Fuso horário {#time-zone}

A lista suspensa **Fuso horário** na seção **Informações da igreja** define o fuso horário da sua igreja (por exemplo, *America/Sao_Paulo*). Escolha **Nenhum** para deixá-lo em branco. Depois de salvo, o fuso aparece no resumo das Informações da igreja.

O B1 usa esse fuso horário para horários de toda a igreja, como lembretes de eventos e as programações das TVs do [FreePlay](../../freeplay/scheduled-mode/scheduling-the-calendar.md). Os [cronogramas de check-in](../attendance/setup.md#setting-a-check-in-schedule) são medidos primeiro no fuso horário do [campus](./campuses.md) do culto, e usam o fuso da igreja somente quando esse campus não tiver um definido. Se todos os seus campi estiverem no mesmo fuso horário, defina-o tanto na igreja quanto em cada campus.

## Região (formato de data e telefone)

A configuração **Região** controla como datas e horários são escritos em todo o B1. Por padrão, as datas usam o formato dos Estados Unidos (por exemplo, "28 set 2026" e "9/28/2026"). Igrejas fora dos EUA podem trocar para o formato local — por exemplo, escolhendo Português (Brasil) a data aparece como "28 de set. de 2026" e "28/09/2026".

1. Na página Configurações, clique em **Região** na lista à esquerda e depois em **Editar** na seção **Região**.
2. Escolha sua região na lista suspensa **Região**. Cada opção mostra uma data de exemplo para que você veja exatamente como as datas vão aparecer.
3. Clique em **Salvar**.

A seção Região mostra então a região selecionada, um exemplo do **Formato de data** e o formato dos seus **Números de telefone**.

### Formato dos números de telefone

A mesma seção Região tem a configuração **Números de telefone**, que controla como os números de telefone são digitados no registro de uma pessoa:

- **Internacional (com código do país)** -- o padrão. Os campos de telefone mostram um seletor de bandeira do país e salvam os números com o código do país (por exemplo, +55 11 91234 5678).
- **Local (como digitado)** -- os campos de telefone viram caixas de texto simples e salvam os números exatamente como você digitar, sem acrescentar código de país (por exemplo, 11 91234-5678). Escolha esta opção se a sua igreja escreve os números em formato local e não quer que o B1 acrescente um código de país.

Quando **Local** está selecionado, a seção Região também mostra "Números de telefone locais" ao lado da sua região.

:::tip
O envio de textos funciona melhor quando os números incluem o código do país. Se você enviar textos pelo B1, mantenha o formato **Internacional**, ou certifique-se de que os números digitados no modo Local incluam o código do país.
:::

A sua região se aplica às datas e aos horários em todo o B1 Admin e no seu site B1.church e portal de membros, incluindo sermões, postagens de blog, calendários de grupos e planos de atendimento, para que os membros vejam as datas no mesmo formato que a sua equipe.

## Mensagens de texto (SMS) {#texting}

Conecte um provedor de SMS para enviar mensagens de texto a uma pessoa ou a um grupo inteiro a partir do B1 Admin. Os textos são enviados pela sua própria conta no provedor, então valem os preços e os limites dele.

1. Na página Configurações, clique em **Mensagens de texto** na lista à esquerda e depois em **Editar** na seção **Mensagens de texto**.
2. Escolha um **Provedor**:
   - **Clearstream** -- informe uma **Chave de API**. Crie uma em Configurações da sua conta Clearstream, em Chaves de API.
   - **Text In Church** -- informe uma **Chave de API**. Peça primeiro acesso à API de desenvolvedor ao suporte da Text In Church e depois crie uma chave na seção Configurações da conta > API de desenvolvedor.
   - **Nalo Solutions** (Gana) -- informe a chave de autenticação da sua conta Nalo Solutions como **Chave de API**, e um **ID do remetente** (até 11 caracteres) aprovado pela Nalo para você.
   - **Twilio** -- use a conta Twilio da sua própria igreja; a Twilio cobra diretamente de você. Copie o **Account SID** e o **Auth Token** do [Console da Twilio](https://console.twilio.com) e informe um **Número de origem** — um número de telefone Twilio registrado para A2P 10DLC, em um formato como `+15551234567`. Depois de salvar, cole a URL do webhook de entrada (veja abaixo) no campo **Quando uma mensagem chegar** do número, no Twilio, para que as respostas STOP também sejam registradas no B1.
3. Clique em **Salvar**.

Para parar de enviar textos, defina o **Provedor** como **Nenhum** e salve. Isso remove o provedor salvo.

### Cancelando o envio para quem responder STOP

Depois que um provedor estiver salvo, reabra a seção Mensagens de texto com **Editar**. Abaixo das configurações do provedor, um campo somente leitura **URL do webhook de entrada (STOP)** mostra um endereço web exclusivo da sua igreja. Clique no campo para selecionar o endereço, copie-o e cole-o na configuração de webhook de mensagens recebidas (respostas) do seu provedor de SMS. Isso funciona com qualquer um dos provedores acima que consiga encaminhar as respostas recebidas para um webhook.

Depois disso, quando alguém responder **STOP** (ou STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT, OPTOUT ou REVOKE) a um dos seus textos, o B1 encontra todas as pessoas cujo número de celular corresponde, marca-as como cancelaram a inscrição e desativa os lembretes por texto delas. Elas passam então a ser ignoradas nos textos de grupo. As demais respostas são ignoradas.

:::info
Isso usa a mesma configuração de cancelamento de **Ocultar-me do diretório de membros**, então quem responde STOP também aparece como **Oculto do diretório** no perfil. O campo só aparece enquanto o provedor salvo estiver selecionado — se você trocar a lista suspensa para outro provedor, salve primeiro para ver a URL novamente.
:::

Quando um provedor está conectado, a equipe com permissão para enviar textos vê um botão **Texto** na página de um grupo (**Enviar texto a este grupo**) e na de uma pessoa com celular (**Enviar mensagem de texto**). Digite a sua mensagem e clique em **Enviar**. A janela conta os caracteres e os segmentos de SMS. Para um grupo, ela mostra quantos membros receberão o texto antes do envio:

- Membros sem celular cadastrado são ignorados.
- Membros que escolheram **Ocultar-me do diretório de membros** são contados como cancelados e ignorados.
- Membros da família que compartilham um número de celular recebem o texto somente uma vez.

### Personalizando textos com campos de mesclagem {#personalizing-texts-with-merge-fields}

Abaixo da caixa de mensagem, a janela de texto mostra chips de marcadores: **Primeiro nome**, **Sobrenome**, **Nome de exibição** e **Nome da igreja**. Clique em um chip para inserir o marcador correspondente (`{{firstName}}`, `{{lastName}}`, `{{displayName}}` ou `{{churchName}}`) na posição do cursor. Quando o texto é enviado, cada marcador é substituído pelos dados do destinatário, de modo que um texto de grupo como `Oi {{firstName}}, nos vemos no domingo!` chega a cada membro com o próprio nome. Os marcadores funcionam tanto em textos de grupo quanto em textos para uma pessoa. Textos para um grupo também oferecem um chip **Nome do grupo** (`{{groupName}}`), que é substituído pelo nome do grupo.

Para reutilizar uma mensagem, salve-a como um [modelo de texto](./email-templates.md#text-templates) (um modelo de e-mail com a categoria **Texto**) e escolha-o em **Carregar modelo (opcional)** no topo da janela de Texto.

:::info
O limite de 1.600 caracteres se aplica à mensagem como você a digita. Depois que os marcadores são preenchidos, qualquer texto com mais de 1.600 caracteres é cortado nesse tamanho.
:::

Os textos também podem ser enviados automaticamente por uma etapa de [fluxo de trabalho](../serving/workflows.md#sending-a-text) com a ação **Enviar texto**, que usa o mesmo provedor e os mesmos marcadores.

## Armazenamento de arquivos

Por padrão, os arquivos que você envia ao seu site (pelo [Arquivos](../website/files.md)) e a outras áreas de conteúdo usam o armazenamento hospedado gratuito do B1, de até 100 MB. Se precisar de mais espaço, você pode conectar o seu próprio armazenamento em nuvem — os novos envios vão então diretamente para a sua conta, sem limite da plataforma.

1. Na página Configurações, clique em **Armazenamento de arquivos** na lista à esquerda e depois em **Editar** na seção **Armazenamento de arquivos**.
2. Escolha um provedor: **Google Drive**, **Dropbox**, **OneDrive** ou um **bucket compatível com S3** (AWS S3, Cloudflare R2, Backblaze B2 etc.).
3. Para Google Drive, Dropbox ou OneDrive, clique em **Conectar** e entre para autorizar o acesso. Para um bucket compatível com S3, informe sua chave de acesso, o segredo, o nome do bucket e a base de URL pública.
4. Clique em **Salvar**.

:::info
Isso afeta somente os novos envios para os Arquivos do seu site e áreas de conteúdo semelhantes. Imagens de galeria, miniaturas, logotipos e fotos de pessoas sempre permanecem no armazenamento padrão do B1.
:::

## Promoção de série

Se você acompanha a **Série** de crianças e adolescentes, o B1 pode avançar automaticamente todos uma série em uma data que você escolher (por exemplo, 1º de agosto), em vez de exigir que você edite cada perfil manualmente.

1. Na página Configurações, clique em **Promoção de série** na lista à esquerda e depois em **Editar** na seção **Promoção de série**.
2. Ative a chave (ela mostra **Ativada**) e escolha o **Mês** e o **Dia** em que as séries serão promovidas a cada ano. Nessa data, todos que têm uma série avançam uma série, e os alunos do 12º ano passam a **Formados**.
3. Salve as alterações.

Para interromper a promoção automática, desative a chave para que mostre **Desativada** e salve. A data de promoção é removida e as séries não mudarão mais por conta própria.

## Inscrição de voluntários {#volunteer-signup}

Por padrão, os membros que navegam pelas [inscrições de voluntários](../../b1-church/serving/volunteer-signup.md) veem todas as semanas futuras que têm posições abertas. Se essa lista ficar longa, você pode mostrar apenas a próxima semana de cada tipo de plano.

1. Na página Configurações, clique em **Inscrição de voluntários** na lista à esquerda e depois em **Editar** na seção **Inscrição de voluntários**.
2. Ative **Mostrar somente a próxima semana de cada tipo de plano**.
3. Salve as alterações.

Com essa opção ativada, cada tipo de plano mostra apenas o seu próximo plano futuro. A semana seguinte aparece assim que essa data passa. A linha **Semanas exibidas** da seção mostra **Somente a próxima semana de cada tipo de plano** ou **Todas as semanas futuras**.

## Privacidade das ofertas {#giving-privacy}

Pessoas com acesso às doações normalmente veem os totais de ofertas de uma pessoa no [registro dela](../people/adding-people.md#editing-details). Se você preferir não mostrar os valores na tela toda vez que um registro é aberto, pode ocultá-los até que alguém os solicite.

1. Na página Configurações, clique em **Privacidade das ofertas** na lista à esquerda e depois em **Editar** na seção **Privacidade das ofertas**.
2. Ative **Ocultar as ofertas nos registros de pessoas até clicar**.
3. Salve as alterações.

Com essa opção ativada, o cartão de ofertas no registro de uma pessoa diz "As ofertas estão ocultas nos registros de pessoas." Clique em **Mostrar ofertas** para carregar e exibir as ofertas daquela pessoa. Ele volta a ficar oculto quando você abre outra pessoa. Quem pode ver as ofertas não muda: somente quem tem acesso às doações vê o cartão.

## Importação e exportação

O link **Importar/Exportar**, abaixo do nome da sua igreja na página Configurações, abre uma ferramenta dedicada em uma nova janela do navegador. Use-a para:

- Importar dados de membros de outro sistema de gestão de igrejas.
- Exportar os seus dados do ChurchApps para backup ou migração.

Isso é especialmente útil quando você está configurando a sua igreja pela primeira vez e precisa transferir registros existentes para o ChurchApps.

:::warning
Ao importar dados, faça sempre um backup dos seus registros existentes primeiro. As operações de importação adicionam dados ao sistema e podem criar entradas duplicadas se forem executadas várias vezes.
:::
