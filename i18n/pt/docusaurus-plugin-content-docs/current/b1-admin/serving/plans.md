---
title: "Planos de Culto"
---

# Planos de Culto

<div class="article-intro">

Os planos de culto organizam quem está servindo e quando. Cada plano está vinculado a uma data e a um ministério específicos, o que facilita coordenar as equipes de voluntários semana a semana e garantir que cada culto esteja com a escala completa.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- Configure seus ministérios e equipes na área de Serviço
- Certifique-se de que os voluntários foram adicionados ao [diretório de pessoas](../people/adding-people.md) e atribuídos às equipes

</div>

## Acessando os Planos

1. No B1 Admin, abra o [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (a barra de pesquisa no canto superior esquerdo), expanda **Serviço** e clique em **Planos**.
2. Selecione uma **aba de ministério** no topo da página.
3. Clique em um **tipo de plano** para ver a lista de planos desse tipo. Use **Próximos** e **Anteriores** acima da lista para alternar entre planos futuros e passados. **Próximos** lista os planos a partir de hoje, do mais próximo para o mais distante, com os planos sem data no final. **Anteriores** lista somente os planos passados, do mais recente para o mais antigo.
4. Clique em um plano específico para abri-lo.

Cada página de plano mostra links de volta ao seu tipo de plano e a **Planos**, para que você possa voltar sem usar o botão de voltar do navegador.

:::info
Não é necessário ter acesso administrativo completo para gerenciar planos. Qualquer pessoa que seja membro de um ministério pode acessar Serviço e criar, editar e agendar planos para o próprio ministério, sem precisar da permissão Editar Planos. Editores com a função de Editar Planos podem gerenciar os planos de todos os ministérios.
:::

## Criando um Plano

1. Na página do tipo de plano, clique em **Novo Plano** no topo da página.
2. Dê um nome ao plano ou use a data como nome. Selecione a **data** do culto.
3. Se o seu ministério tiver [modelos](./plan-templates.md), você pode escolher um em **Começar a partir de um modelo** para preencher a ordem de culto, as posições e as observações de uma só vez.
4. Caso contrário, se quiser copiar de um plano anterior, use **Copiar do plano anterior** para escolher **Somente posições** ou **Posições e escalas**. Se não quiser copiar, escolha **Nada**. Você também pode marcar **Copiar ordem do culto**. Ao copiar de um plano anterior, o novo plano também mantém as **Observações**, o **Prazo de inscrição**, a opção **Mostrar nomes dos voluntários na página de inscrição** e a configuração de substituição automática desse plano, para que você não precise digitá-las novamente toda semana. Você pode alterar qualquer uma delas nas configurações do novo plano.
5. Para configurar várias semanas de uma vez durante a cópia, informe um número em **Repetir semanalmente por este número de semanas** (até 12). O B1 cria um plano por semana, cada um copiado do anterior. Se o plano for nomeado pela data, cada novo plano recebe o nome da sua própria data.
6. Opcionalmente, defina o **Prazo de inscrição (horas antes do culto)**. Um novo plano começa com o prazo do plano anterior, e você pode alterá-lo aqui. Deixe em branco para não ter prazo. Consulte [Configurações do Plano](#plan-settings) para saber como o prazo é contado.
7. Salve o plano. Agora você pode começar a escalar os membros da equipe e montar a [ordem do culto](./service-order.md).

:::tip
**Repetir semanalmente por este número de semanas** só está disponível enquanto você estiver copiando algo do plano anterior (posições, escalas ou a ordem do culto).
:::

## A Página de Detalhes do Plano

Ao abrir um plano, o nome, o ministério, o tipo de plano e a data do culto aparecem no topo, com os botões **Editar** e **Imprimir**. Abaixo disso, tudo fica em uma única página:

- **[Ordem do Culto](./service-order.md)** -- monte a ordem do culto com elementos como músicas de louvor, orações, avisos e a mensagem.
- **Escalas da Equipe** -- gerencie quais membros da equipe estão escalados para este plano. Você pode adicionar pessoas das suas equipes existentes e ver quem já confirmou ou ainda está pendente. Links acima das posições permitem abrir as **Observações** e os **Horários** do plano.

## Escalando Membros da Equipe

1. Abra um plano e role até **Escalas da Equipe**.
2. Clique em **Adicionar Posição**. Preencha as informações no formulário de adicionar posição. Para o nome da categoria, use o que preferir. Para permitir que qualquer pessoa da igreja preencha a posição (não apenas membros de uma equipe), deixe o **Grupo de voluntários** como **Nenhum**.
3. Clique em **Pessoas necessárias** e escolha os voluntários para preencher a posição. Se a posição tiver um **Grupo de voluntários**, você escolhe entre os membros desse grupo. Se o Grupo de voluntários estiver como **Nenhum**, você pode pesquisar qualquer pessoa da igreja.
4. Adicione membros da lista da sua equipe clicando em **Adicionar**.
5. Os membros escalados aparecerão na sua equipe com o status da escala.
6. Clique em notificar voluntários para avisá-los pelo aplicativo do B1 ou por e-mail. Se o plano usar um [fluxo de confirmação](#plan-settings), notificar também inicia um cartão de fluxo de trabalho que acompanha cada solicitação até que o voluntário responda.

Cada posição mostra um marcador com a contagem (por exemplo, "2/3") para que você veja de relance quantas vagas estão preenchidas. Abaixo do título **Escalas da Equipe**, um resumo ("X de Y posições preenchidas") mostra a situação geral do plano, junto com quantas ainda faltam, mudando para **Escala completa** quando todas as posições estiverem cobertas.

:::tip
Configure suas equipes nas configurações do ministério antes de criar os planos. Assim, você terá um grupo pronto de voluntários para escalar.
:::

### Copiando Posições para um Plano Vazio

Se um plano ainda não tiver posições e existir um plano anterior do mesmo tipo, um link **Copiar do plano anterior** aparece em **Escalas da Equipe**. Escolha **Somente posições** ou **Posições e escalas** para preencher o plano aberto com as posições (e voluntários) do plano anterior. A cópia vai para o plano atual; ela não cria um segundo plano para a mesma data.

## Configurações do Plano

Cada plano tem configurações adicionais que você pode ajustar clicando em **Editar** ao lado do plano na lista do tipo de plano, ou no botão **Editar** no topo da página do plano. Clique em **Concluído** (ou no nome do plano) para voltar ao plano. Elas incluem:

- **Prazo de inscrição (horas antes do culto)** — o número de horas antes do culto em que as inscrições dos voluntários se encerram. As horas são contadas a partir do primeiro horário de **Culto** do plano (ensaios e outros horários são ignorados, a menos que o plano não tenha mais nada), então um prazo de 2 horas para um culto às 10h00 encerra as inscrições às 8h00 daquela manhã. Se o plano não tiver horários, o prazo é contado a partir das 9h00 da data do culto, no fuso horário da sua igreja. Depois que ele passar, os voluntários não podem se inscrever nem se remover. Digite um número negativo para manter as inscrições abertas após o início do culto. Deixe em branco, ou apague o valor, para não ter prazo.
- **Fluxo de confirmação** — escolha um [fluxo de trabalho de Confirmação de Escala](./workflows.md#serving-assignment-confirmations) para acompanhar as solicitações de serviço deste plano por e-mail e SMS até que cada voluntário aceite ou recuse. Quando você **Notifica** os voluntários de um plano publicado, cada nova solicitação ganha seu próprio cartão no quadro desse fluxo de trabalho, e uma nota acima do link de notificação diz *"Novas solicitações usam o fluxo de confirmação."* Deixe em **Usar notificações de escala existentes** para manter as notificações habituais. Somente fluxos de confirmação ativos aparecem na lista; crie um em **Serviço > Fluxos de trabalho** primeiro.
- **Mostrar nomes dos voluntários na página de inscrição** — quando marcada, os voluntários conectados podem ver quem mais já está inscrito em cada posição na página de inscrição do B1.church. Os nomes nunca são mostrados a visitantes que não estão conectados.
- **Pré-escala** — oculta as escalas dos voluntários até que você esteja pronto para publicar a escala.
- **Substituir automaticamente quando um voluntário recusar** — quando marcada, se um voluntário escalado recusar a posição, o B1 entrará em contato automaticamente com a próxima pessoa disponível na lista da equipe e perguntará se ela pode servir. Isso continua na lista até que alguém aceite, mantendo as posições preenchidas sem acompanhamento manual.

:::tip
Na página de inscrição para membros, as posições abertas de cada plano são listadas por categoria e depois por nome. Os membros veem todas as semanas futuras com posições abertas, a menos que você ative **Mostrar somente a próxima semana de cada tipo de plano** em [Configurações > Inscrição de voluntários](../settings/church-settings.md#volunteer-signup).
:::

## Lembretes para Voluntários {#volunteer-reminders}

O B1 pode lembrar automaticamente os voluntários dos cultos para os quais estão escalados, para que você não precise cobrar sua equipe toda semana. Os lembretes são enviados a **todos os escalados** -- tanto aos que confirmaram quanto aos que ainda não responderam. A exceção é um pedido enviado por meio de um [fluxo de confirmação](./workflows.md#serving-assignment-confirmations): esse voluntário recebe lembretes somente depois de aceitar, já que o fluxo de trabalho cuida do acompanhamento até lá. Cada e-mail de lembrete inclui a(s) posição(ões) do voluntário, a data do culto, as observações do plano e a sua mensagem personalizada.

A antecedência e o conteúdo dos lembretes são definidos por **tipo de plano**, para que cada tipo de culto possa ter a sua própria programação.

1. Na área **Serviço**, selecione o ministério que contém o tipo de plano.
2. Na lista de **Tipos de plano**, clique em **Editar** ao lado do tipo de plano.
3. Expanda a seção **Lembretes** e ative **Enviar lembretes para planos deste tipo**.
4. Em **Quando os lembretes devem ser enviados?**, escolha até três antecedências: **7 dias antes**, **3 dias antes**, **2 dias antes**, **1 dia antes** ou **No dia**.
5. Defina a **Hora do dia** em que os lembretes serão enviados.
6. Opcionalmente, adicione uma **Mensagem**. Deixe em branco para usar o texto padrão do lembrete.
7. Em **Enviar por**, escolha **Push**, **E-mail** e, se a sua igreja tiver um [provedor de SMS](../settings/church-settings.md#texting) conectado, **SMS**.
8. Clique em **Salvar lembretes**.

Os lembretes ficam desativados para um tipo de plano até que você os ative.

:::tip
Voluntários que ainda não confirmaram recebem os botões **Aceitar** e **Recusar** diretamente no e-mail de lembrete, para que possam responder sem precisar entrar no sistema.
:::

### Lembretes por SMS

A opção **SMS** só aparece quando a sua igreja tem um provedor de SMS conectado. As mensagens são enviadas pelo provedor de SMS da sua igreja, e cada mensagem pode custar à sua igreja. Um voluntário só recebe um lembrete por SMS se tiver ativado **Mensagens de texto** nas suas [Preferências de notificação](../../b1-church/getting-started/notification-preferences.md) e tiver um número de celular no perfil. Cada SMS começa com o nome da sua igreja, é limitado a uma única mensagem de texto e termina com "Responda SAIR para cancelar." Quem responder SAIR deixa de receber SMS da sua igreja. Para que as respostas SAIR cheguem ao B1, cole a **URL do webhook de entrada (SAIR)** das suas [configurações de SMS](../settings/church-settings.md#texting) no webhook de mensagens recebidas do seu provedor.

Para enviar SMS a todos os escalados em um intervalo de datas imediatamente, use **Enviar SMS aos voluntários** na [Visão geral dos planos](./plans-overview.md#texting-everyone-scheduled).

:::info
Cada lembrete é enviado uma única vez. Os lembretes por SMS são enviados além dos de push e e-mail, não no lugar deles.
:::

## Associando Grupos a um Tipo de Plano

Abaixo da lista de planos, na página do tipo de plano, a seção **Grupos associados** permite definir quais grupos podem ver os planos desse tipo no portal do membro. É uma forma rápida de mostrar os cultos próximos às equipes certas sem dar acesso administrativo a elas.

1. Na página do tipo de plano, clique em **Grupos associados** no topo da página (ou role até essa seção).
2. Clique em **Adicionar grupo** e escolha um grupo na lista suspensa.
3. Na coluna **Mostra**, escolha se os membros desse grupo devem ver **Somente planos passados**, **Somente planos futuros** ou **Planos passados e futuros** para esse tipo de plano.
4. Repita para associar outros grupos, ou clique no ícone de lixeira para remover um grupo.

:::info
Somente grupos marcados como **Padrão** aparecem na lista de seleção. Os membros de um grupo associado veem automaticamente os planos desse tipo na página do grupo no portal do membro do B1 -- limitados à janela de tempo que você selecionou.
:::

Se os planos forem lições do Lessons.church, os membros do grupo associado também veem um cartão **Lição desta semana** na página do grupo (linha de rodapé, versículo e uma pergunta para os pais). Associe aqui um grupo de pais e defina o filtro como **Somente planos passados** para que a lição de hoje seja incluída. Equipes de voluntários normalmente usam **Somente planos futuros** ou **Planos passados e futuros**.

## Imprimindo Planos

Você pode imprimir um plano para distribuir à sua equipe. Abra o plano e clique em **Imprimir** no topo da página para gerar uma versão para impressão que inclui as escalas e a ordem do culto. No topo da impressão aparecem o logotipo da sua igreja (o **Logotipo para fundo claro** de [Site > Aparência](../website/appearance.md), caso você tenha enviado um) com o nome da igreja abaixo, e o nome do plano, para que as folhas avulsas sejam fáceis de identificar. Isso é útil para entregar nos ensaios ou afixar em uma área comum.

A impressão deixa de fora tudo o que estaria vazio. Se nenhum voluntário estiver escalado, não há caixa de equipe e a ordem do culto usa a largura total da página. Se nenhum item tiver duração, a coluna **Duração** é omitida, e se o plano não tiver horários de serviço nem durações, a coluna **Horário** também é omitida. Para remover a barra preta de cabeçalho **Ordem do Culto** com a data do serviço, desmarque **Mostrar cabeçalho da Ordem do Culto** no topo da página de impressão; o B1 Admin lembra a sua escolha neste navegador.

:::info
Os planos são organizados por ministério. Certifique-se de estar na aba do ministério correto antes de criar ou visualizar planos.
:::

## Próximos Passos

- Use a [Visão geral dos planos](./plans-overview.md) para ver todas as escalas futuras de várias semanas em uma única grade, identificar posições não preenchidas -- e escalar voluntários diretamente pela grade
- Salve a estrutura de um plano como um [Modelo de plano](./plan-templates.md) para aplicá-la a planos futuros com um clique
- Monte a sua [Ordem do Culto](./service-order.md) com músicas, leituras e outros elementos
- Adicione [músicas](./songs.md) da sua biblioteca diretamente na ordem do culto
- Use [Tarefas](./tasks.md) para atribuir itens de acompanhamento aos membros da equipe
- Exiba o conteúdo atual da lição em uma TV do saguão com a [Sinalização digital](./digital-signage.md)
