---
title: "Planos de culto"
---

# Planos de culto

<div class="article-intro">

Os planos de culto organizam quem está servindo e quando. Cada plano está vinculado a uma data e a um ministério específicos, o que facilita coordenar suas equipes de voluntários semana a semana e garantir que cada culto tenha a equipe completa.

</div>

## Vídeo de treinamento

<YouTube id="47DstBXKl74" title="Criando planos e escalando voluntários no B1" next="Montando a ordem do culto e a biblioteca de músicas no B1" nextUrl="/docs/b1-admin/serving/service-order" />

<div class="prereqs">
<h4>Antes de começar</h4>

- Configure seus ministérios e equipes na área de Atendimento
- Certifique-se de que os voluntários foram adicionados ao seu [diretório de pessoas](../people/adding-people.md) e atribuídos a equipes

</div>

## Acessando os planos

1. No B1 Admin, abra o [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (a barra de pesquisa no canto superior esquerdo), expanda **Atendimento** e clique em **Planos**.
2. Selecione uma **aba de ministério** no topo da página.
3. Clique em um **tipo de plano** para ver a lista de planos desse tipo. Use **Próximos** e **Passados** acima da lista para alternar entre planos futuros e anteriores. **Próximos** lista os planos de hoje em diante, do mais próximo para o mais distante, com os planos sem data no final. **Passados** lista somente os planos anteriores, do mais recente para o mais antigo.
4. Clique em um plano específico para abri-lo.

Cada página de plano mostra links de volta ao seu tipo de plano e a **Planos**, para que você possa subir de nível sem usar o botão voltar do navegador.

:::info
Não é necessário acesso total de administrador para gerenciar planos. Qualquer pessoa que seja membro de um ministério pode acessar Atendimento e criar, editar e agendar planos para o seu próprio ministério, sem precisar da permissão Editar planos. Editores com a função Editar planos podem gerenciar os planos de todos os ministérios.
:::

## Criando um plano

1. Na página do tipo de plano, clique em **Novo plano** no topo da página.
2. Dê um nome ao plano ou use a data como nome. Selecione a **data** do culto.
3. Se o seu ministério tiver [modelos](./plan-templates.md), você pode escolher um em **Começar a partir de um modelo** para preencher a ordem do culto, as posições e as notas de uma só vez.
4. Caso contrário, se quiser copiar de um plano anterior, use **Copiar do plano anterior** para escolher **Somente posições** ou **Posições e atribuições**. Se não quiser copiar, escolha **Nada**. Você também pode marcar **Copiar ordem do culto**. Ao copiar de um plano anterior, o novo plano também mantém as **Notas**, o **Prazo de inscrição**, a opção **Mostrar nomes dos voluntários na página de inscrição** e a configuração de substituição automática desse plano, para que você não precise digitá-las novamente toda semana. Você pode alterar qualquer uma delas nas configurações do novo plano.
5. Para configurar vários planos de uma vez enquanto copia, escolha **Repetir a cada** e a **Frequência** (Dia, Semana ou Mês), depois informe o **Número de planos** (até 12). Para Mês, **Em** permite manter o mesmo dia do mês ou o mesmo dia da semana, como o segundo sábado. O B1 lista as datas antes de você salvar e cria um plano para cada data, cada um copiado do anterior. Se o plano for nomeado pela data, cada novo plano recebe o nome da sua própria data.
6. Opcionalmente, defina o **Prazo de inscrição (horas antes do culto)**. Um novo plano começa com o prazo do plano anterior, e você pode alterá-lo aqui. Deixe em branco para não ter prazo. Veja [Configurações do plano](#plan-settings) para saber como o prazo é contado.
7. Salve o plano. Agora você pode começar a designar membros da equipe e a montar a [ordem do culto](./service-order.md).

:::tip
As configurações de repetição só estão disponíveis enquanto você estiver copiando algo do plano anterior (posições, atribuições ou a ordem do culto).
:::

## A página de detalhes do plano

Ao abrir um plano, o nome do plano, o ministério, o tipo de plano e a data do culto aparecem no topo, com os botões **Editar** e **Imprimir**. Abaixo disso, tudo fica em uma única página:

- **[Ordem do culto](./service-order.md)** -- Monte a ordem do culto com elementos como músicas de louvor, orações, anúncios e o sermão.
- **Atribuições da equipe de atendimento** -- Gerencie quais membros da equipe estão designados a este plano. Você pode adicionar pessoas das suas equipes existentes e ver quem confirmou ou ainda está pendente. Links acima das posições permitem abrir as **Notas** e os **Horários** do plano.

## Designando membros da equipe {#assigning-team-members}

1. Abra um plano e role até **Atribuições da equipe de atendimento**.
2. Clique em **Adicionar posição**. Preencha as informações no formulário de adicionar posição. Para o nome da categoria, use a categoria que preferir. Para permitir que qualquer pessoa da sua igreja preencha a posição (e não apenas os membros de uma equipe), deixe o **Grupo de voluntários** em **Nenhum**.
3. Clique em **Pessoas necessárias** e escolha os voluntários para preencher a posição. Se a posição tiver um **Grupo de voluntários**, você escolherá entre os membros desse grupo. Se o Grupo de voluntários estiver em **Nenhum**, você pode pesquisar qualquer pessoa da sua igreja.
4. Adicione membros da lista da sua equipe clicando em **Adicionar**.
5. Os membros designados aparecerão na sua equipe com o status da atribuição.
6. Clique em notificar voluntários para avisá-los dentro do aplicativo do B1 ou por e-mail. Se o plano usar um [fluxo de confirmação](#plan-settings), notificar também inicia um cartão de fluxo de trabalho que acompanha cada solicitação até que o voluntário responda.

Cada posição mostra um selo de contagem (por exemplo, "2/3") para que você veja de relance quantas vagas estão preenchidas. Abaixo do título **Atribuições da equipe de atendimento**, um resumo ("X de Y posições preenchidas") mostra a escala geral do plano, junto com quantas ainda são necessárias, mudando para **Equipe completa** quando todas as posições estiverem cobertas.

:::tip
Configure suas equipes nas configurações do ministério antes de criar os planos. Assim, você terá um grupo pronto de voluntários para designar.
:::

### Copiando posições para um plano vazio

Se um plano não tiver posições ainda e existir um plano anterior do mesmo tipo, um link **Copiar do plano anterior** aparece em **Atribuições da equipe de atendimento**. Escolha **Somente posições** ou **Posições e atribuições** para preencher o plano aberto com as posições (e os voluntários) do plano anterior. A cópia vai para o plano atual; ela não cria um segundo plano para a mesma data.

## Configurações do plano {#plan-settings}

Cada plano tem configurações adicionais que você pode definir clicando em **Editar** ao lado do plano na lista do tipo de plano, ou no botão **Editar** no topo da página do plano. Clique em **Concluído** (ou no nome do plano) para voltar ao plano. Elas incluem:

- **Prazo de inscrição (horas antes do culto)** — o número de horas antes do culto em que as inscrições dos voluntários são encerradas. As horas são contadas a partir do primeiro horário de **Culto** do plano (ensaios e outros horários são ignorados, a menos que o plano não tenha mais nada), então um prazo de 2 horas em um culto às 10:00 encerra as inscrições às 8:00 daquela manhã. Se o plano não tiver horários, o prazo é contado a partir das 9:00 da data do culto, no fuso horário da sua igreja. Depois que ele passa, os voluntários não podem se inscrever nem se remover. Digite um número negativo para manter as inscrições abertas depois do início do culto. Deixe em branco, ou limpe o campo, para não ter prazo.
- **Fluxo de confirmação** — escolha um [fluxo de trabalho de Confirmação de atribuição de atendimento](./workflows.md#serving-assignment-confirmations) para acompanhar as solicitações de atendimento deste plano por e-mail e texto até que cada voluntário aceite ou recuse. Quando você **Notifica** os voluntários no plano publicado, cada nova solicitação ganha um cartão próprio no quadro desse fluxo de trabalho, e uma nota acima do link de notificação diz *"Novas solicitações usam o fluxo de confirmação."* Deixe em **Usar notificações de atribuição existentes** para manter as notificações habituais. Somente fluxos de confirmação ativos aparecem na lista; crie um em **Atendimento > Fluxos de trabalho** antes.
- **Mostrar nomes dos voluntários na página de inscrição** — quando marcada, os voluntários conectados podem ver quem mais já está inscrito em cada posição na página de inscrição do B1.church. Os nomes nunca são mostrados a visitantes que não estão conectados.
- **Reservado** — oculta as atribuições dos voluntários até que você esteja pronto para publicar a escala.
- **Agendar automaticamente um substituto quando um voluntário recusar** — quando marcada, se um voluntário designado recusar sua posição, o B1 entrará em contato automaticamente com a próxima pessoa disponível na lista da equipe e perguntará se ela pode servir. Isso continua na lista até que alguém aceite, mantendo as posições preenchidas sem acompanhamento manual.

:::tip
Na página de inscrição para membros, as posições abertas de cada plano são listadas por categoria e depois por nome. Os membros veem todas as semanas futuras com posições abertas, a menos que você ative **Mostrar somente a próxima semana de cada tipo de plano** em [Configurações > Inscrição de voluntários](../settings/church-settings.md#volunteer-signup).
:::

## Lembretes para voluntários {#volunteer-reminders}

O B1 pode lembrar automaticamente os voluntários antes dos cultos para os quais estão escalados, para que você não precise cobrar a equipe toda semana. Os lembretes vão para **todos os escalados** — tanto os que confirmaram quanto os que ainda não responderam. A exceção é uma solicitação enviada por meio de um [fluxo de confirmação](./workflows.md#serving-assignment-confirmations): esse voluntário só recebe lembretes depois de aceitar, pois o fluxo de trabalho cuida do acompanhamento até lá. Cada e-mail de lembrete inclui a(s) posição(ões) do voluntário, a data do culto, as notas do plano e a sua mensagem personalizada.

O horário e o conteúdo dos lembretes são definidos por **tipo de plano**, para que cada tipo de culto possa ter sua própria programação.

1. Na área **Atendimento**, selecione o ministério que contém o tipo de plano.
2. Na lista **Tipos de plano**, clique em **Editar** ao lado do tipo de plano.
3. Expanda a seção **Lembretes** e ative **Enviar lembretes para planos deste tipo**.
4. Em **Quando os lembretes devem ser enviados?**, escolha até três momentos: **7 dias antes**, **3 dias antes**, **2 dias antes**, **1 dia antes** ou **No dia**.
5. Defina a **Hora do dia** em que os lembretes serão enviados.
6. Opcionalmente, adicione uma **Mensagem**. Deixe em branco para usar o texto padrão do lembrete.
7. Em **Enviar por**, escolha **Push**, **E-mail** e, se a sua igreja tiver um [provedor de SMS](../settings/church-settings.md#texting) conectado, **Texto**.
8. Clique em **Salvar lembretes**.

Os lembretes ficam desativados para um tipo de plano até que você os ative.

:::tip
Voluntários que ainda não confirmaram recebem os botões **Aceitar** e **Recusar** diretamente no e-mail de lembrete, para que possam responder sem precisar entrar.
:::

### Lembretes por texto {#text-reminders}

A opção **Texto** só aparece quando a sua igreja tem um provedor de SMS conectado. Os textos são enviados pelo provedor de SMS da sua igreja, e cada texto pode gerar custo para ela. Um voluntário só recebe um lembrete por texto se tiver ativado **Mensagens de texto** nas suas [Preferências de notificação](../../b1-church/getting-started/notification-preferences.md) e tiver um número de celular no perfil. Cada texto começa com o nome da sua igreja, é mantido em uma única mensagem de texto e termina com "Responda STOP para cancelar." Quem responder STOP deixa de receber textos da sua igreja. Para que as respostas STOP cheguem ao B1, cole a **URL do webhook de entrada (STOP)** das suas [configurações de SMS](../settings/church-settings.md#texting) no webhook de mensagens recebidas do seu provedor.

Para enviar um texto a todos os escalados de um intervalo de datas imediatamente, use **Enviar texto aos voluntários** na [Visão geral dos planos](./plans-overview.md#texting-everyone-scheduled).

:::info
Cada lembrete é enviado uma vez. Os lembretes por texto são enviados além do push e do e-mail, e não no lugar deles.
:::

## Associando grupos a um tipo de plano

Abaixo da lista de planos na página do tipo de plano, a seção **Grupos associados** permite decidir quais grupos podem ver os planos desse tipo a partir do portal do membro. É uma forma rápida de mostrar os próximos cultos às equipes certas sem dar acesso de administrador a elas.

1. Na página do tipo de plano, clique em **Grupos associados** no topo da página (ou role até essa seção).
2. Clique em **Adicionar grupo** e escolha um grupo na lista suspensa.
3. Na coluna **Exibe**, escolha se os membros desse grupo devem ver **Somente planos passados**, **Somente planos futuros** ou **Planos passados e futuros** para este tipo de plano.
4. Repita para associar outros grupos, ou clique no ícone de lixeira para remover um grupo.

:::info
Somente grupos marcados como **Padrão** aparecem no seletor. Os membros de um grupo associado veem automaticamente os planos deste tipo na página do grupo no portal de membros do B1 — limitados à janela que você selecionou.
:::

Se os planos forem lições do Lessons.church, os membros do grupo associado também veem um cartão **Lição desta semana** na página do grupo (linha de base, versículo e uma pergunta para os pais). Associe aqui um grupo de pais e defina o filtro como **Somente planos passados** para que a lição de hoje seja incluída. Equipes de voluntários normalmente usam **Somente planos futuros** ou **Planos passados e futuros**.

## Imprimindo planos {#printing-plans}

Você pode imprimir um plano para distribuir à sua equipe. Abra o plano e clique em **Imprimir** no topo da página para gerar uma versão imprimível que inclui as atribuições e a ordem do culto. No topo da impressão aparecem o logotipo da sua igreja (o **Logotipo para fundo claro** de [Site > Aparência](../website/appearance.md), se você tiver enviado um), com o nome da sua igreja abaixo, e o nome do plano, para que as folhas avulsas sejam fáceis de identificar. Isso é útil para entregar nos ensaios ou afixar em uma área comum.

A impressão deixa de fora tudo o que estaria vazio. Se nenhum voluntário estiver designado, não há caixa de equipe e a ordem do culto usa a largura total da página. Se nenhum item tiver duração, a coluna **Duração** é omitida, e se o plano não tiver horários de culto nem durações, a coluna **Horário** também é omitida. Para remover a barra preta de título **Ordem do culto** com a data do culto, desmarque **Mostrar título da ordem do culto** no topo da página de impressão; o B1 Admin lembra a sua escolha naquele navegador.

:::info
Os planos são organizados por ministério. Certifique-se de estar na aba de ministério correta antes de criar ou visualizar planos.
:::

## Próximos passos

- Use a [Visão geral dos planos](./plans-overview.md) para ver todas as escalas futuras de várias semanas em uma única grade e identificar posições não preenchidas — e designe voluntários diretamente pela grade
- Salve a estrutura de um plano como um [Modelo de plano](./plan-templates.md) para aplicá-la a planos futuros com um único clique
- Monte a sua [Ordem do culto](./service-order.md) com músicas, leituras e outros elementos
- Adicione [músicas](./songs.md) da sua biblioteca diretamente à ordem do culto
- Use as [Tarefas](./tasks.md) para atribuir itens de acompanhamento aos membros da equipe
- Exiba o conteúdo da lição atual em uma TV do saguão com [Sinalização digital](./digital-signage.md)
