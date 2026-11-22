---
title: "Configurações da igreja"
description: "Defina o nome, o endereço, o subdomínio, o fuso horário, o formato regional, o provedor de SMS e o armazenamento de arquivos da sua igreja na página Configurações da igreja do B1 Admin."
---

# Configurações da igreja

<div class="article-intro">

A página Configurações da igreja é onde você configura as informações básicas da sua igreja, os dados de contato e a identidade visual. Esses dados são usados em todas as ferramentas da ChurchApps, incluindo o seu site B1.church e o aplicativo B1.

</div>

## Vídeo de treinamento {#training-video}

<YouTube id="634zSbzDkYA" title="Configurando as informações da igreja e a identidade visual no B1" next="Funções, permissões e convidando sua equipe no B1" nextUrl="/docs/b1-admin/settings/roles-permissions" />

<div class="prereqs">
<h4>Antes de começar</h4>

- Você precisa da permissão "Editar configurações da igreja". Veja [Funções e permissões](./roles-permissions.md) se você não tiver acesso.
- Tenha em mãos o endereço, as informações de contato e o logo da sua igreja

</div>

## Editando as informações da igreja {#editing-your-church-information}

1. No B1 Admin, abra o [Menu de atalhos](../introduction.md#getting-around-with-the-jump-menu) (a barra de busca no canto superior esquerdo), expanda **Configurações** e clique em **Configurações**.
2. Na seção **Informações da igreja** (no topo da página), clique em **Editar**.
3. Atualize qualquer um dos campos a seguir:
   - **Nome da igreja** *(obrigatório)* -- O nome exibido em todos os produtos da ChurchApps.
   - **Subdomínio** *(obrigatório)* -- Seu endereço web gratuito no B1. Veja [Configurando seu subdomínio](#setting-up-your-subdomain) abaixo.
   - **Endereço linha 1**, **Endereço linha 2**, **Cidade**, **Estado**, **CEP** e **País** -- O endereço físico da sua igreja.
   - **Primeiro dia da semana** -- Veja [Primeiro dia da semana](#first-day-of-week) abaixo.
   - **Fuso horário** -- O fuso horário da sua igreja. Veja [Fuso horário](#time-zone) abaixo.
4. Clique em **Salvar** para aplicar as alterações, ou em **Cancelar** para descartá-las.

O nome da igreja, o subdomínio e o endereço também aparecem no painel no canto superior esquerdo da página Configurações.

## Configurando seu subdomínio {#setting-up-your-subdomain}

Sua igreja recebe um subdomínio gratuito em **yourchurch.b1.church**. Este é o endereço web onde membros e visitantes podem acessar a presença online da sua igreja.

1. Na página Configurações, clique em **Editar** na seção **Informações da igreja** e localize o campo **Subdomínio**.
2. Digite o subdomínio desejado (por exemplo, "gracechurch" para gracechurch.b1.church).
3. Salve as alterações.

:::info
O seu subdomínio precisa ser único entre todas as igrejas da ChurchApps. Se o nome desejado já estiver em uso, tente acrescentar sua cidade ou estado (por exemplo, "gracechurch-dallas").
:::

Se você quiser que os visitantes acessem seu site pelo seu próprio domínio (por exemplo, **`www.gracechurch.org`**), veja [Domínio personalizado](./custom-domain.md).

## Configurando a identidade visual {#configuring-branding}

O logo e as cores da sua igreja não são definidos na página Configurações. Envie o logo da igreja e escolha as cores em **Site > Aparência** -- veja [Logo e identidade visual](../website/appearance.md#logo-and-branding). As cores usadas pelo aplicativo B1, pelo portal de membros e pelo quiosque de check-in são definidas em **Mobile > Tema do aplicativo** -- veja [Tema do aplicativo](./mobile-app.md#app-theme).

## Geral (contato de suporte) {#general-support-contact}

A seção **Geral** guarda o seu **Contato de suporte**: o e-mail ou o link do formulário de contato que as pessoas usam para falar com a sua igreja. Clique em **Editar** na seção **Geral**, digite-o no campo **Link** e clique em **Salvar**. Enquanto você não definir um, a seção mostra **Não definido**.

## Primeiro dia da semana {#first-day-of-week}

Escolha em qual dia da semana começam os seus calendários. A lista suspensa **Primeiro dia da semana** na seção Informações da igreja vem definida como **Domingo**, mas pode ser ajustada para qualquer dia. Depois de alterada, a configuração é respeitada nas grades de calendário do B1 Admin e do portal de membros do B1.church -- os calendários de grupos, os calendários selecionados e o editor de eventos organizam as semanas a partir do dia que você escolher.

## Fuso horário {#time-zone}

A lista suspensa **Fuso horário**, na seção **Informações da igreja**, define o fuso horário da sua igreja (por exemplo, *America/Chicago*). Escolha **Nenhum** para deixá-lo em branco. Depois de salvo, o fuso aparece no resumo das Informações da igreja.

O B1 usa esse fuso horário para os horários de toda a igreja, como os lembretes de eventos e as programações das TVs do [FreePlay](../../freeplay/scheduled-mode/scheduling-the-calendar.md). Os [horários de check-in](../attendance/setup.md#setting-a-check-in-schedule) são medidos primeiro no fuso horário do [campus](./campuses.md) do culto, e usam o fuso horário da igreja somente quando o campus não tem um. Se todos os seus campus estiverem em um mesmo fuso horário, defina-o tanto na igreja quanto em cada campus.

## Região (formato de data e telefone) {#region-date-and-phone-format}

A configuração **Região** controla como datas e horários são escritos em todo o B1. Por padrão, as datas usam o formato dos Estados Unidos (por exemplo, "Sep 28, 2026" e "9/28/2026"). Igrejas fora dos EUA podem trocar para o formato local -- por exemplo, escolhendo Inglês (Reino Unido), as datas aparecem como "28 Sept 2026" e "28/09/2026".

1. Na página Configurações, clique em **Região** na lista à esquerda e depois em **Editar** na seção **Região**.
2. Escolha sua região na lista suspensa **Região**. Cada opção mostra uma data de exemplo, para que você veja exatamente como as datas ficarão.
3. Clique em **Salvar**.

A seção Região então mostra a região selecionada, um exemplo do **Formato de data** e o formato dos seus **Números de telefone**.

### Formato de número de telefone {#phone-number-format}

A mesma seção Região tem a configuração **Números de telefone**, que controla como os números de telefone são digitados no cadastro de uma pessoa:

- **Internacional (com código do país)** -- o padrão. Os campos de telefone mostram um seletor de bandeira do país e salvam os números com o código do país (por exemplo, +1 918 555 1234).
- **Local (como digitado)** -- os campos de telefone viram caixas de texto simples e salvam os números exatamente como você os digita, sem acrescentar código de país (por exemplo, 0701 234 5678). Escolha esta opção se a sua igreja escreve os números em formato local e não quer que o B1 acrescente um código de país.

Quando **Local** está selecionado, a seção Região também mostra "Números de telefone locais" ao lado da sua região.

:::tip
O envio de SMS funciona melhor quando os números incluem o código do país. Se você envia SMS pelo B1, mantenha o formato **Internacional**, ou certifique-se de que os números digitados no modo Local incluam o código do país.
:::

A sua região se aplica às datas e aos horários em todo o B1 Admin e no seu site B1.church e portal de membros, incluindo sermões, postagens do blog, calendários de grupos e planos de culto, para que os membros vejam as datas no mesmo formato que a sua equipe.

### Dia do culto {#worship-day}

A seção Região também tem a configuração **Dia do culto**, para o dia em que o seu culto principal acontece. Ela é **Domingo**, a menos que você a altere. Igrejas que celebram o culto aos sábados (ou em outro dia) podem escolher esse dia, e o Painel acompanha essa escolha: o título principal diz "Este sábado", os painéis laterais dizem "Servindo no sábado" e "No último sábado", a data do culto exibida é o próximo sábado, e a contagem ao vivo "na sala" acende nos check-ins de sábado.

Quando o dia do culto não é domingo, a entrada Região na lista à esquerda também mostra o dia ao lado da sua região.

## SMS {#texting}

Conecte um provedor de SMS para enviar mensagens de texto a uma pessoa ou a um grupo inteiro pelo B1 Admin. Os SMS são enviados pela sua própria conta no provedor, então os preços e os limites dele se aplicam.

1. Na página Configurações, clique em **SMS** na lista à esquerda e depois em **Editar** na seção **SMS**.
2. Escolha um **Provedor**:
   - **Clearstream** -- digite uma **Chave de API**. Crie uma em Configurações da sua conta Clearstream, na seção Chaves de API.
   - **Text In Church** -- digite uma **Chave de API**. Peça antes ao suporte do Text In Church o acesso à API para desenvolvedores e depois crie uma chave em Configurações da conta > seção API para desenvolvedores.
   - **Nalo Solutions** (Gana) -- digite a chave de autenticação da sua conta Nalo Solutions como **Chave de API**, e um **ID do remetente** (até 11 caracteres) aprovado pela Nalo para a sua conta.
   - **Twilio** -- use a conta Twilio da sua igreja; a Twilio cobra diretamente de você. Copie o **Account SID** e o **Auth Token** do [Console da Twilio](https://console.twilio.com) e digite um **Número de origem** -- um número de telefone da Twilio registrado para A2P 10DLC, em um formato como `+15551234567`. Depois de salvar, cole a URL do webhook de mensagens recebidas (veja abaixo) no webhook **Quando uma mensagem chegar** do número na Twilio, para que as respostas STOP também sejam registradas no B1.
3. Clique em **Salvar**.

Para parar de enviar SMS, defina o **Provedor** como **Nenhum** e salve. Isso remove o provedor salvo.

### Cancelando o envio para quem responde STOP {#opting-out-people-who-reply-stop}

Depois que um provedor é salvo, reabra a seção SMS com **Editar**. Abaixo das configurações do provedor, um campo somente leitura **URL do webhook de mensagens recebidas (STOP)** mostra um endereço web exclusivo da sua igreja. Clique no campo para selecionar o endereço, copie-o e cole-o na configuração de webhook de mensagens recebidas (respostas) do seu provedor de SMS. Isso funciona com qualquer um dos provedores acima que possa encaminhar respostas recebidas para um webhook.

Depois disso, quando alguém responder **STOP** (ou STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT, OPTOUT ou REVOKE) a um dos seus SMS, o B1 localiza todas as pessoas cujo número de celular corresponde, as marca como tendo optado por não receber e desativa os lembretes por SMS delas. Elas então são ignoradas nos SMS para grupos. As demais respostas são ignoradas.

:::info
Isto usa a mesma configuração de cancelamento de **Ocultar-me do diretório de membros**, então quem responde STOP também aparece como **Oculto do diretório** no perfil. O campo só aparece enquanto o provedor salvo estiver selecionado -- se você trocar a lista suspensa para outro provedor, salve primeiro para ver a URL novamente.
:::

Depois que um provedor está conectado, a equipe com permissão para enviar SMS vê um botão **SMS** na página de um grupo (**Enviar SMS a este grupo**) e na página de uma pessoa com celular (**Enviar mensagem de texto**). Digite a sua mensagem e clique em **Enviar**. A caixa de diálogo conta os caracteres e os segmentos de SMS. Para um grupo, ela mostra quantos membros receberão o SMS antes do envio:

- Membros sem celular cadastrado são ignorados.
- Membros que escolheram **Ocultar-me do diretório de membros** são contados como tendo optado por não receber e são ignorados.
- Familiares que compartilham o mesmo número de celular recebem o SMS apenas uma vez.

### Personalizando SMS com campos de mesclagem {#personalizing-texts-with-merge-fields}

Abaixo da caixa de mensagem, a janela de SMS mostra botões de marcadores: **Nome**, **Sobrenome**, **Nome de exibição** e **Nome da igreja**. Clique em um botão para inserir o marcador correspondente (`{{firstName}}`, `{{lastName}}`, `{{displayName}}` ou `{{churchName}}`) na posição do cursor. Quando o SMS é enviado, cada marcador é substituído pelos dados do destinatário; assim, um SMS para o grupo como `Hi {{firstName}}, see you Sunday!` chega a cada membro com o nome dele. Os marcadores funcionam tanto em SMS para grupos quanto para uma pessoa. Os SMS para um grupo também oferecem o botão **Nome do grupo** (`{{groupName}}`), que é substituído pelo nome do grupo.

Para reutilizar uma mensagem, salve-a como um [modelo de SMS](./email-templates.md#text-templates) (um modelo de e-mail da categoria **SMS**) e escolha-o em **Carregar modelo (opcional)** no topo da janela de SMS.

:::info
O limite de 1.600 caracteres se aplica à mensagem conforme você a digita. Depois que os marcadores são preenchidos, qualquer texto com mais de 1.600 caracteres é cortado nesse tamanho.
:::

Os SMS também podem ser enviados automaticamente por uma etapa de [fluxo de trabalho](../serving/workflows.md#sending-a-text) com a ação **Enviar SMS**, que usa o mesmo provedor e os mesmos marcadores.

## Armazenamento de arquivos {#file-storage}

Por padrão, os arquivos que você envia ao seu site (pelos [Arquivos](../website/files.md)) e a outras áreas de conteúdo usam o armazenamento hospedado gratuito do B1, de até 100 MB. Se precisar de mais espaço, você pode conectar o seu próprio armazenamento em nuvem -- os novos envios vão direto para a sua conta, sem limite da plataforma.

1. Na página Configurações, clique em **Armazenamento de arquivos** na lista à esquerda e depois em **Editar** na seção **Armazenamento de arquivos**.
2. Escolha um **Provedor**: **Google Drive**, **Dropbox** ou **Bucket compatível com S3 (S3, R2, B2)** (AWS S3, Cloudflare R2, Backblaze B2 etc.). **ChurchApps (gratuito)** é o armazenamento integrado.
3. Para o Google Drive ou o Dropbox, clique em **Conectar conta** e faça login para autorizar o acesso. Um selo **Conta conectada** aparece quando funciona; é preciso conectar antes de poder salvar. Para um bucket compatível com S3, informe o **Access Key Id**, o **Secret Access Key**, o **Bucket**, o **Endpoint** (deixe em branco para a AWS), a **Região** e a **URL pública base**. **Bucket** e **URL pública base** são obrigatórios, e o bucket precisa permitir leituras públicas e envios por CORS a partir do B1.
4. Clique em **Salvar**.

Para voltar ao armazenamento gratuito, escolha **ChurchApps (gratuito)** e salve. Os arquivos já enviados permanecem onde estão.

:::info
Isto afeta apenas os novos envios para os Arquivos do seu site e áreas de conteúdo semelhantes. Imagens de galeria, miniaturas, logos e fotos de pessoas sempre permanecem no armazenamento padrão do B1.
:::

## Doações {#giving}

A seção **Doações** conecta o seu provedor de pagamentos e define a moeda da sua igreja para as doações online e as inscrições pagas. Veja [Configuração de doações online](../donations/online-giving-setup.md). Ela só aparece para as pessoas que podem editar as configurações de doações.

## Check-in {#check-in}

A seção **Check-in** define a **Aplicação da proporção de voluntários** -- se o check-in apenas avisa (**Avisar (permitir com confirmação)**) ou bloqueia um check-in (**Bloquear (impedir o check-in)**) quando uma sala está com falta de voluntários. Veja [Proporção de voluntários](../attendance/checkin-safety.md#volunteer-ratios). O link **Quiosque de check-in, QR e etiquetas**, abaixo dele, abre as configurações do quiosque na página Mobile.

## Promoção de séries {#grade-promotion}

Se você registra a **Série** de crianças e alunos, o B1 pode avançar automaticamente todos para a série seguinte em uma data que você escolher (por exemplo, 1º de agosto), em vez de exigir que você edite cada perfil manualmente.

1. Na página Configurações, clique em **Promoção de séries** na lista à esquerda e depois em **Editar** na seção **Promoção de séries**.
2. Ative a chave (ela mostra **Ativada**) e escolha o **Mês** e o **Dia** em que as séries são promovidas a cada ano. Nessa data, todos que têm uma série avançam uma série, e os alunos da 12ª série passam a **Formados**.
3. Salve as alterações.

Para interromper a promoção automática, desligue a chave para que ela mostre **Desativada** e salve. A data de promoção é removida e as séries deixam de mudar sozinhas.

## Inscrição de voluntários {#volunteer-signup}

Por padrão, os membros que navegam pelas [inscrições de voluntários](../../b1-church/serving/volunteer-signup.md) veem todas as semanas futuras que têm vagas abertas. Se essa lista ficar longa, você pode mostrar apenas a próxima semana de cada tipo de plano.

1. Na página Configurações, clique em **Inscrição de voluntários** na lista à esquerda e depois em **Editar** na seção **Inscrição de voluntários**.
2. Ative **Mostrar apenas a próxima semana de cada tipo de plano**.
3. Salve as alterações.

Com isso ativado, cada tipo de plano mostra apenas o seu próximo plano futuro. A semana seguinte aparece assim que essa data passa. A linha **Semanas exibidas** da seção mostra **Apenas a próxima semana de cada tipo de plano** ou **Todas as semanas futuras**.

## Privacidade de doações {#giving-privacy}

Pessoas com acesso a doações normalmente veem os totais de doações de uma pessoa no [cadastro dela](../people/adding-people.md#editing-details). Se preferir não mostrar os valores na tela sempre que um cadastro é aberto, você pode ocultá-los até que alguém peça para vê-los.

1. Na página Configurações, clique em **Privacidade de doações** na lista à esquerda e depois em **Editar** na seção **Privacidade de doações**.
2. Ative **Ocultar doações nos cadastros de pessoas até clicar**.
3. Salve as alterações.

Com isso ativado, o cartão de doações no cadastro de uma pessoa diz "As doações estão ocultas nos cadastros de pessoas." Clique em **Mostrar doações** para carregar e exibir as doações daquela pessoa. Elas voltam a ficar ocultas quando você abre outra pessoa. Quem pode ver as doações não muda: somente pessoas com acesso a doações veem o cartão.

## Importação e exportação {#import-and-export}

O link **Importar/Exportar**, abaixo do nome da sua igreja na página Configurações, abre uma ferramenta dedicada em uma nova janela do navegador. Use-a para:

- Importar dados de membros de outro sistema de gestão de igrejas.
- Exportar seus dados da ChurchApps para backup ou migração.

Isso é especialmente útil quando você está configurando a sua igreja pela primeira vez e precisa transferir cadastros existentes para a ChurchApps.

:::warning
Ao importar dados, faça sempre um backup dos seus cadastros existentes antes. As operações de importação adicionam dados ao sistema e podem criar registros duplicados se forem executadas mais de uma vez.
:::
