---
title: "Membros do Grupo"
---

# Membros do Grupo

<div class="article-intro">

Uma vez que você criou um grupo, o próximo passo é adicionar membros. Na página de detalhes de um grupo, você pode pesquisar pessoas, adicioná-las ao grupo, designar líderes, enviar mensagens e exportar a lista de membros. Gerenciar a associação do grupo é essencial para coordenar pequenos grupos, comitês e classes.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- Você precisa de pelo menos um grupo configurado em B1 Admin. Consulte [Criando Grupos](creating-groups.md) se você ainda não criou um.
- As pessoas que você deseja adicionar devem já existir em seu diretório de [Pessoas](../people/adding-people.md).

</div>

## Adicionando Membros a um Grupo

1. No [menu Jump](../introduction.md#getting-around-with-the-jump-menu), escolha **Pessoas > Grupos** e clique no grupo que deseja gerenciar.
2. Clique na aba **Membros**.
3. Na caixa de pesquisa, digite o nome da pessoa que deseja adicionar.
4. Clique em **Adicionar** ao lado do nome da pessoa nos resultados da pesquisa.
5. A pessoa agora aparece na lista de membros do grupo.

:::tip
Deixe a caixa de pesquisa em branco e clique em **Pesquisar** para procurar em todo o seu diretório. Isso é útil se você não tiver certeza da grafia exata do nome de alguém.
:::

### Adicionando Alguém Que Não Está em B1 Ainda

Se sua pesquisa não encontrar ninguém, a pesquisa mostra **Nenhum registro encontrado** com um link **Adicionar Nova Pessoa**. Clique nele, digite o primeiro nome, sobrenome e (opcionalmente) email da pessoa e clique em **Adicionar**. A nova pessoa é criada em seu diretório de Pessoas e adicionada ao grupo em uma única etapa -- você não precisa procurá-la novamente.

## Designando Líderes do Grupo

Líderes do grupo têm privilégios especiais -- eles podem editar o [calendário do grupo](group-calendar.md), gerenciar eventos e ajudar a coordenar o grupo.

1. Na lista de membros do grupo, encontre a pessoa que deseja tornar líder.
2. Clique no **ícone de chave verde** ao lado de seu nome.
3. A pessoa agora é designada como líder do grupo.

Para remover o status de líder, clique no ícone de chave verde novamente.

:::info
Qualquer membro do grupo pode visualizar o calendário e eventos do grupo, mas apenas líderes podem adicionar ou editar eventos do calendário.
:::

## Enviando Mensagens aos Membros do Grupo

Você pode se comunicar com todos os membros de um grupo diretamente do B1 Admin:

1. Na página de detalhes do grupo, procure pela área de mensagens.
2. Digite sua mensagem na caixa de texto.
3. Clique em **Enviar**.

Sua mensagem será entregue a todos os membros do grupo.

## Enviando E-mail aos Membros do Grupo

Você pode enviar e-mails formatados para todos os membros de um grupo:

1. Na página de detalhes do grupo, clique no **ícone de e-mail**.
2. O diálogo Enviar E-mail abre, mostrando quantos membros receberão o e-mail e quantos não têm endereço de e-mail registrado.
3. Opcionalmente, selecione um **modelo de e-mail** na lista suspensa ou redija uma mensagem do zero. Clique em **Gerenciar Modelos** para criar ou editar modelos.
4. Digite uma **linha de assunto**. Você pode inserir campos de mesclagem clicando nos chips de campo: `{{firstName}}`, `{{lastName}}`, `{{displayName}}`, `{{email}}`, `{{churchName}}`.
5. Redija o **corpo do e-mail** usando o editor HTML. Os mesmos campos de mesclagem estão disponíveis aqui.
6. Clique em **Enviar**.
7. Um resumo mostra quantos e-mails foram enviados com sucesso e quantos membros foram ignorados (sem e-mail registrado).

:::tip
Crie modelos de e-mail reutilizáveis para comunicações recorrentes, como atualizações semanais, anúncios de eventos ou pedidos de oração. Os modelos economizam tempo e garantem mensagens consistentes.
:::

### Ativando E-mail de Grupo para Sua Igreja

Todas as igrejas em B1 enviam e-mail do mesmo endereço, portanto compartilham uma reputação de envio. Para manter o e-mail de todos longe das pastas de spam, a equipe ChurchApps analisa cada igreja uma vez antes de ela poder enviar e-mail de grupo.

Se sua igreja ainda não foi analisada, o diálogo Enviar E-mail mostra **E-mail de grupo precisa de uma análise rápida** em vez do editor de mensagens:

1. Clique em **Solicitar análise**. A equipe de suporte ChurchApps é notificada.
2. O diálogo muda para **Análise solicitada**. Você pode fechá-lo.
3. O e-mail de grupo geralmente é ativado em um dia útil. Abra o diálogo Enviar E-mail novamente depois disso para enviar sua mensagem.

Até que sua igreja seja aprovada, B1 também não envia [e-mails de acompanhamento de formulário](../forms/creating-forms.md#sending-a-follow-up-email) ou a etapa **Enviar e-mail** em [fluxos de trabalho](../serving/workflows.md).

:::info Limites de envio
Após a aprovação, uma igreja pode enviar até 150 e-mails escritos pela igreja por dia. O limite aumenta conforme sua igreja constrói um histórico de envio limpo, até 2.000 por dia. Se mensagens recentes ricochetearam ou foram marcadas como spam, o e-mail de grupo pausa e o diálogo pede a você para entrar em contato com o suporte. Se um envio ultrapassar seu limite diário, B1 não o envia e mostra um erro.
:::

## Enviando Notificações de Texto aos Membros do Grupo

Depois que sua igreja tiver conectado um [provedor de mensagens de texto](../settings/church-settings.md#texting), um ícone de texto (**Enviar texto para este grupo**) aparece no cabeçalho do grupo.

1. Na página de detalhes do grupo, clique no **ícone de texto**.
2. O diálogo mostra quantos membros receberão a mensagem de texto. Membros sem número de celular registrado ou que optaram por não participar são ignorados.
3. Digite sua mensagem. Para personalizá-la, clique em um chip de espaço reservado abaixo da caixa de mensagem -- **Primeiro Nome**, **Sobrenome**, **Nome de Exibição** ou **Nome da Igreja** -- para inseri-lo em seu cursor. Cada espaço reservado é preenchido com os próprios detalhes do destinatário quando a mensagem de texto é enviada.
4. Clique em **Enviar**.

Consulte [Personalizando Textos com Campos de Mesclagem](../settings/church-settings.md#personalizing-texts-with-merge-fields) para mais detalhes.

## Exportando Dados do Grupo

Para baixar a lista de membros do grupo como um arquivo:

1. Na página de detalhes do grupo, clique no **ícone de download**.
2. Um arquivo CSV contendo as informações dos membros do grupo será baixado para seu computador.

Uma exportação CSV é útil para importar dados em outras ferramentas ou manter registros offline. Para mais opções de exportação, consulte [Exportando Dados](../people/exporting-data.md).

## Imprimindo a Lista de Membros {#printing-the-member-list}

Clique no ícone **Imprimir Folha de Chamada** (impressora) acima da lista de membros e escolha um layout. A página abre em uma nova aba e a caixa de diálogo de impressão do seu navegador aparece automaticamente.

- **Folha de Presença** -- uma lista de classe sem data com caixas **Presente** e **Ausente** para os professores marcarem à mão. Consulte [Imprimindo uma Folha de Chamada](../attendance/recording-attendance.md#printing-a-roll-sheet).
- **Lista de Contatos** -- uma lista de contatos do grupo, datada de hoje e com o nome da sua igreja e o nome do grupo no cabeçalho. Cada membro tem uma linha com seu **Nome**, **Telefone**, **E-mail** e **Endereço**. Os líderes são listados primeiro e marcados como **Líder**, depois todos os demais por sobrenome. O telefone exibido é o número de celular do membro, ou o número residencial ou comercial se não houver celular. Os dados de contato ficam em branco para quem optou por não participar.

:::warning
Uma lista de contatos contém informações pessoais de contato dos membros. Compartilhe cópias impressas apenas com os líderes do grupo e outras pessoas que precisem delas.
:::

## Enviando Notificações por Push aos Membros do Grupo

Você pode enviar uma notificação por push diretamente para todos os membros do grupo que têm o aplicativo B1.church instalado no dispositivo com notificações por push ativadas.

1. Na página de detalhes do grupo, clique no **ícone de sino** na barra de ferramentas do cabeçalho (ao lado dos ícones de e-mail e texto -- o ícone de texto aparece depois que um [provedor de mensagens de texto](../settings/church-settings.md#texting) está conectado).
2. Um diálogo abre mostrando quantos membros do seu grupo têm push ativado.
3. Preencha os detalhes da notificação:
   - **Título** *(obrigatório)* -- Um resumo curto, até 80 caracteres.
   - **Mensagem** *(obrigatória)* -- O corpo da notificação, até 240 caracteres.
   - **Abrir link ou URL do panfleto** *(opcional)* -- Um caminho relativo do aplicativo (por exemplo, `/mobile/groups`) ou uma URL completa `https://` que a notificação abre quando tocada.
   - **URL da imagem** *(opcional)* -- Uma URL `https://` para uma imagem que aparece junto da notificação em dispositivos compatíveis.
4. Uma visualização ao vivo mostra como a notificação aparecerá no dispositivo.
5. Clique em **Enviar Notificação**.

:::info
As notificações por push são entregues apenas aos membros do grupo que têm o PWA B1.church instalado e não desativaram as notificações por push. Membros sem um dispositivo push registrado ou com push desativado são contados como ignorados, e o resumo de envio mostra quantos foram alcançados versus ignorados.
:::

:::tip
Após enviar, o diálogo mostra quantas notificações foram enfileiradas com sucesso. Se a maioria dos membros estiver aparecendo como ignorada, lembre-os de visitar seu site B1.church, instalá-lo como um aplicativo da tela inicial e permitir notificações quando solicitado.
:::

## Removendo Membros

Para remover alguém de um grupo, localize seu nome na lista de membros e clique no botão **remover** ao lado de sua entrada.

:::info
Remover uma pessoa de um grupo não a deleta do seu diretório da igreja. Ela ainda aparecerá na seção [Pessoas](../people/adding-people.md) e pode ser adicionada ao grupo novamente a qualquer momento.
:::
