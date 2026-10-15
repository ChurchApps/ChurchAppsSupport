---
title: "Configurações da Igreja"
---

# Configurações da Igreja

<div class="article-intro">

A página de Configurações da Igreja é onde você configura as informações básicas da sua igreja, os dados de contato e a identidade visual. Essas informações são usadas em todas as ferramentas do ChurchApps, incluindo o site da sua igreja no B1.church e o aplicativo B1 Mobile.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- Você precisa da permissão "Editar Configurações da Igreja". Consulte [Funções e Permissões](./roles-permissions.md) se você não tiver acesso.
- Tenha em mãos o endereço, as informações de contato e o logotipo da sua igreja

</div>

## Editando as Informações da Sua Igreja

1. No B1 Admin, abra o [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (a barra de pesquisa no canto superior esquerdo), expanda **Configurações** e clique em **Configurações**.
2. Na seção **Informações da Igreja** (no topo da página), clique em **Editar**.
3. Atualize qualquer um dos campos a seguir:
   - **Nome da Igreja** -- O nome exibido em todos os produtos do ChurchApps.
   - **Endereço** -- O endereço físico da sua igreja.
   - **Informações de Contato** -- Telefone, e-mail e outros dados de contato.
4. Clique em **Salvar** para aplicar as alterações.

## Configurando Seu Subdomínio

Sua igreja recebe um subdomínio gratuito em **suaigreja.1.church**. Este é o endereço web onde membros e visitantes podem acessar a presença online da sua igreja.

1. Na página de Configurações, clique em **Editar** na seção **Informações da Igreja** e localize o campo **Subdomínio**.
2. Digite o subdomínio desejado (por exemplo, "igrejagraca" para igrejagraca.1.church).
3. Salve as alterações.

:::info
Seu subdomínio deve ser exclusivo entre todas as igrejas do ChurchApps. Se o nome desejado já estiver em uso, tente acrescentar sua cidade ou estado (por exemplo, "igrejagraca-curitiba").
:::

Se você quiser que os visitantes acessem seu site pelo seu próprio domínio (por exemplo, **www.igrejagraca.org**), consulte [Domínio Personalizado](./custom-domain.md).

## Configurando a Identidade Visual

Personalize como sua igreja aparece em todas as ferramentas do ChurchApps:

1. Envie o **logotipo da igreja** clicando na área do logotipo e selecionando um arquivo de imagem.
2. Adicione quaisquer **imagens da igreja** adicionais usadas no seu site e no [aplicativo mobile](./mobile-app.md).

:::tip
Para melhores resultados, use um logotipo com fundo transparente em formato PNG. Isso garante que ele fique bem tanto em fundos claros quanto escuros.
:::

## Primeiro Dia da Semana

Escolha em qual dia seus calendários começam. O menu suspenso **Primeiro Dia da Semana**, na seção de Informações da Igreja, vem definido como **Domingo**, mas pode ser ajustado para qualquer dia. Depois de alterado, ele é respeitado nas grades de calendário do B1 Admin e do portal de membros do B1.church -- os calendários de grupos, os calendários selecionados e o editor de eventos montam as semanas começando pelo dia que você escolher.

## Região (Formato de Data e Telefone)

A configuração de **Região** controla como datas e horas são escritas em todo o B1. Por padrão, as datas usam o formato dos Estados Unidos (por exemplo, "Sep 28, 2026" e "9/28/2026"). Igrejas fora dos EUA podem mudar para o formato do seu país -- por exemplo, escolher Português (Brasil) mostra "28 de set. de 2026" e "28/09/2026".

1. Na página de Configurações, clique em **Região** na lista à esquerda e, em seguida, clique em **Editar** na seção **Região**.
2. Escolha sua região no menu suspenso **Região**. Cada opção mostra uma data de exemplo para que você veja exatamente como as datas ficarão.
3. Clique em **Salvar**.

A seção Região exibe então a região selecionada, um exemplo do **Formato de data** e o formato dos seus **Números de telefone**.

### Formato dos Números de Telefone

A mesma seção Região tem uma configuração de **Números de telefone** que controla como os números de telefone são digitados no registro de uma pessoa:

- **Internacional (com código do país)** -- o padrão. Os campos de telefone mostram um seletor de bandeira do país e salvam os números com o código do país (por exemplo, +55 41 91234 5678).
- **Local (como digitado)** -- os campos de telefone viram caixas de texto simples e salvam os números exatamente como você os digita, sem acrescentar código do país (por exemplo, 0701 234 5678). Escolha esta opção se sua igreja anota os números em formato local e não quer que o B1 acrescente um código de país.

Quando **Local** está selecionado, a seção Região também mostra "Números de telefone locais" ao lado da sua região.

:::tip
As mensagens de texto funcionam melhor quando os números incluem o código do país. Se você envia mensagens pelo B1, mantenha o formato **Internacional** ou certifique-se de que os números digitados no modo Local incluam o código do país.
:::

Sua região se aplica às datas e horas em todo o B1 Admin e no seu site e portal de membros do B1.church, incluindo sermões, postagens do blog, calendários de grupos e planos de culto, para que os membros vejam as datas no mesmo formato que a sua equipe.

## Mensagens de Texto {#texting}

Conecte um provedor de mensagens de texto para enviar SMS para uma pessoa ou para um grupo inteiro a partir do B1 Admin. As mensagens são enviadas pela sua própria conta no provedor, então valem os preços e limites dele.

1. Na página de Configurações, clique em **Mensagens de Texto** na lista à esquerda e, em seguida, clique em **Editar** na seção **Mensagens de Texto**.
2. Escolha um **Provedor**:
   - **Clearstream** -- informe uma **Chave de API**. Crie uma em Configurações da Conta no Clearstream, na seção de Chaves de API.
   - **Text In Church** -- informe uma **Chave de API**. Peça primeiro acesso à API para desenvolvedores ao Suporte do Text In Church e depois crie uma chave em Configurações da Conta > seção API para Desenvolvedores.
   - **Nalo Solutions** (Gana) -- informe a chave de autenticação da sua conta na Nalo Solutions como **Chave de API**, e um **ID do Remetente** (até 11 caracteres) aprovado pela Nalo para a sua conta.
3. Clique em **Salvar**.

Para parar de enviar mensagens de texto, defina o **Provedor** como **Nenhum** e salve. Isso remove o provedor salvo.

### Cancelando o Recebimento para Quem Responder SAIR

Depois que um provedor for salvo, reabra a seção Mensagens de Texto com **Editar**. Abaixo das configurações do provedor, um campo somente leitura **URL do webhook de entrada (SAIR)** mostra um endereço web exclusivo da sua igreja. Clique no campo para selecionar o endereço, copie-o e cole-o na configuração de webhook de mensagens recebidas (respostas) do seu provedor de mensagens de texto. Isso funciona com qualquer um dos provedores acima que possa encaminhar respostas recebidas para um webhook.

Depois disso, quando alguém responder **SAIR** (ou STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT, OPTOUT ou REVOKE) a uma das suas mensagens, o B1 encontra todas as pessoas cujo número de celular corresponde, as marca como descadastradas e desativa seus lembretes por mensagem de texto. Elas passam então a ser ignoradas pelas mensagens de grupo. Outras respostas são ignoradas.

:::info
Isso usa a mesma configuração de cancelamento de **Ocultar-me do diretório de membros**, portanto, quem responder SAIR também aparecerá como **Oculto do diretório** no perfil. O campo só aparece enquanto o provedor salvo estiver selecionado -- se você trocar o menu para outro provedor, salve primeiro para ver a URL novamente.
:::

Depois que um provedor estiver conectado, a equipe com permissão para enviar mensagens verá um botão **Texto** na página de um grupo (**Enviar texto a este grupo**) e de uma pessoa com celular (**Enviar mensagem de texto**). Digite sua mensagem e clique em **Enviar**. O diálogo conta os caracteres e os segmentos de SMS. No caso de um grupo, ele mostra quantos membros receberão a mensagem antes do envio:

- Membros sem celular cadastrado são ignorados.
- Membros que escolheram **Ocultar-me do diretório de membros** são contados como descadastrados e ignorados.
- Familiares que compartilham um número de celular recebem a mensagem apenas uma vez.

### Personalizando Mensagens com Campos de Mesclagem {#personalizing-texts-with-merge-fields}

Abaixo da caixa de mensagem, o diálogo de Texto mostra chips de marcadores: **Nome**, **Sobrenome**, **Nome de Exibição** e **Nome da Igreja**. Clique em um chip para inserir seu marcador (`{{firstName}}`, `{{lastName}}`, `{{displayName}}` ou `{{churchName}}`) na posição do cursor. Quando a mensagem é enviada, cada marcador é substituído pelos dados do destinatário, de modo que uma mensagem de grupo como `Oi {{firstName}}, nos vemos no domingo!` chega a cada membro com o próprio nome. Os marcadores funcionam tanto para mensagens de grupo quanto para mensagens a uma única pessoa.

:::info
O limite de 1.600 caracteres se aplica à mensagem como você a digita. Depois que os marcadores são preenchidos, qualquer texto com mais de 1.600 caracteres é cortado nesse tamanho.
:::

As mensagens também podem ser enviadas automaticamente por uma etapa de [fluxo de trabalho](../serving/workflows.md#sending-a-text) com a ação **Enviar Texto**, que usa o mesmo provedor e os mesmos marcadores.

## Armazenamento de Arquivos

Por padrão, os arquivos que você envia para o seu site (pela seção [Arquivos](../website/files.md)) e para outras áreas de conteúdo usam o armazenamento hospedado gratuito do B1, de até 100 MB. Se precisar de mais espaço, você pode conectar seu próprio armazenamento em nuvem -- os novos envios vão então direto para a sua conta, sem limite da plataforma.

1. Na página de Configurações, clique em **Armazenamento de Arquivos** na lista à esquerda e, em seguida, clique em **Editar** na seção **Armazenamento de Arquivos**.
2. Escolha um provedor: **Google Drive**, **Dropbox**, **OneDrive** ou um **bucket compatível com S3** (AWS S3, Cloudflare R2, Backblaze B2 etc.).
3. Para Google Drive, Dropbox ou OneDrive, clique em **Conectar** e faça login para autorizar o acesso. Para um bucket compatível com S3, informe sua chave de acesso, a chave secreta, o nome do bucket e a base da URL pública.
4. Clique em **Salvar**.

:::info
Isso afeta apenas os novos envios para os Arquivos do seu site e áreas de conteúdo semelhantes. Imagens de galeria, miniaturas, logotipos e fotos de pessoas sempre permanecem no armazenamento padrão do B1.
:::

## Promoção de Série

Se você registra a **Série** de crianças e estudantes, o B1 pode avançar automaticamente todos uma série em uma data que você escolher (por exemplo, 1º de agosto), em vez de exigir que você edite cada perfil manualmente.

1. Na página de Configurações, clique em **Promoção de Série** na lista à esquerda e, em seguida, clique em **Editar** na seção **Promoção de Série**.
2. Ative a chave (ela mostra **Ativado**) e escolha o **Mês** e o **Dia** em que as séries serão promovidas a cada ano. Nessa data, todos que têm uma série avançam uma série, e os alunos do 12º ano passam a **Formados**.
3. Salve as alterações.

Para interromper a promoção automática, desative a chave para que ela mostre **Desativado** e salve. A data de promoção é removida e as séries não mudarão mais sozinhas.

## Inscrição de Voluntários {#volunteer-signup}

Por padrão, os membros que navegam pelas [inscrições de voluntários](../../b1-church/serving/volunteer-signup.md) veem todas as semanas futuras que têm vagas abertas. Se essa lista ficar longa, você pode mostrar apenas a próxima semana de cada tipo de plano.

1. Na página de Configurações, clique em **Inscrição de Voluntários** na lista à esquerda e, em seguida, clique em **Editar** na seção **Inscrição de Voluntários**.
2. Ative **Mostrar apenas a próxima semana de cada tipo de plano**.
3. Salve as alterações.

Com essa opção ativada, cada tipo de plano mostra apenas o seu próximo plano futuro. A semana seguinte aparece assim que essa data passa. A linha **Semanas exibidas** da seção mostra **Apenas a próxima semana de cada tipo de plano** ou **Todas as semanas futuras**.

## Privacidade das Ofertas {#giving-privacy}

Pessoas com acesso às ofertas normalmente veem os totais de contribuição de uma pessoa no [registro dela](../people/adding-people.md#editing-details). Se você preferir não ter os valores na tela toda vez que um registro for aberto, pode ocultá-los até que alguém os solicite.

1. Na página de Configurações, clique em **Privacidade das ofertas** na lista à esquerda e, em seguida, clique em **Editar** na seção **Privacidade das ofertas**.
2. Ative **Ocultar ofertas nos registros de pessoas até clicar**.
3. Salve as alterações.

Com essa opção ativada, o cartão de ofertas no registro de uma pessoa diz "As ofertas estão ocultas nos registros de pessoas." Clique em **Mostrar ofertas** para carregar e exibir as contribuições dessa pessoa. Elas são ocultadas novamente quando você abre outra pessoa. Quem pode ver as ofertas não muda: apenas as pessoas com acesso a ofertas veem o cartão.

## Importação e Exportação

O link **Importar/Exportar**, abaixo do nome da sua igreja na página de Configurações, abre uma ferramenta dedicada em uma nova janela do navegador. Use-a para:

- Importar dados de membros de outro sistema de gestão de igrejas.
- Exportar seus dados do ChurchApps para backup ou migração.

Isso é especialmente útil quando você está configurando sua igreja pela primeira vez e precisa transferir registros existentes para o ChurchApps.

:::warning
Ao importar dados, faça sempre um backup dos seus registros existentes antes. As operações de importação adicionam dados ao sistema e podem criar entradas duplicadas se forem executadas várias vezes.
:::
