---
title: "Planos de Serviço"
---

# Planos de Serviço

<div class="article-intro">

Os planos de serviço organizam quem está servindo e quando. Cada plano está vinculado a uma data e um ministério específicos, o que facilita coordenar suas equipes de voluntários semana a semana e garantir que todos os cultos estejam totalmente preenchidos.

</div>

<div class="prereqs">
<h4>Antes de começar</h4>

- Configure seus ministérios e equipes na área de Serviço
- Certifique-se de que os voluntários foram adicionados ao seu [diretório de pessoas](../people/adding-people.md) e atribuídos às equipes

</div>

## Acessando os planos

1. No B1 Admin, abra o [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (a barra de busca no canto superior esquerdo), expanda **Serviço** e clique em **Planos**.
2. Selecione uma **aba de ministério** no topo da página.
3. Clique em um **tipo de plano** para ver a lista de planos desse tipo. Use **Próximos** e **Anteriores** acima da lista para alternar entre planos futuros e passados. **Próximos** lista os planos a partir de hoje, do mais próximo para o mais distante, com os planos sem data no final. **Anteriores** lista apenas os planos passados, do mais recente para o mais antigo.
4. Clique em um plano específico para abri-lo.

Cada página de plano mostra links de volta para o seu tipo de plano e para **Planos**, para que você possa voltar sem usar o botão Voltar do navegador.

:::info
Não é necessário acesso administrativo completo para gerenciar planos. Qualquer pessoa que seja membro de um ministério pode acessar Serviço e criar, editar e agendar planos do seu próprio ministério, sem precisar da permissão Editar Planos. Editores com a função Editar Planos podem gerenciar planos em todos os ministérios.
:::

## Criando um plano

1. Na página do tipo de plano, clique em **Novo Plano** no topo da página.
2. Dê um nome ao plano ou use a data como nome. Selecione a **data** do culto.
3. Se o seu ministério tiver [modelos](./plan-templates.md), você pode escolher um em **Começar a partir de um modelo** para preencher a ordem do culto, as posições e as observações de uma só vez.
4. Caso contrário, se quiser copiar de um plano anterior, use **Copiar do Plano Anterior** para escolher **Somente posições** ou **Posições e atribuições**. Se não quiser copiar, escolha **Nada**. Você também pode marcar **Copiar Ordem do Culto**. Ao copiar de um plano anterior, o novo plano também mantém as **Observações**, o **Prazo de inscrição**, a opção **Mostrar nomes dos voluntários na página de inscrição** e a configuração de substituição automática desse plano, para que você não precise preenchê-las novamente toda semana. Você pode alterar qualquer uma delas nas configurações do novo plano.
5. Para montar várias semanas de uma vez enquanto copia, informe um número em **Repetir semanalmente por este número de semanas** (até 12). O B1 cria um plano por semana, cada um copiado do anterior. Se o plano for nomeado pela data, cada novo plano recebe o nome da sua própria data.
6. Opcionalmente, defina o **Prazo de inscrição (horas antes do culto)**. Um novo plano começa com o prazo do plano anterior, e você pode alterá-lo aqui. Deixe em branco para não ter prazo. Veja [Configurações do plano](#plan-settings) para saber como o prazo é contado.
7. Salve o plano. Agora você pode começar a atribuir membros da equipe e montar a [ordem do culto](./service-order.md).

:::tip
**Repetir semanalmente por este número de semanas** só está disponível enquanto você estiver copiando algo do plano anterior (posições, atribuições ou a ordem do culto).
:::

## A página de detalhes do plano

Ao abrir um plano, o nome, o ministério, o tipo de plano e a data do culto aparecem no topo, com os botões **Editar** e **Imprimir**. Abaixo disso, tudo fica em uma única página:

- **[Ordem do Culto](./service-order.md)** -- Monte a ordem do culto com elementos como músicas de louvor, orações, avisos e a mensagem.
- **Atribuições da Equipe de Serviço** -- Gerencie quais membros da equipe estão atribuídos a este plano. Você pode adicionar pessoas das suas equipes existentes e ver quem já confirmou ou ainda está pendente. Os links acima das posições permitem abrir as **Observações** e os **Horários** do plano.

## Atribuindo membros da equipe

1. Abra um plano e role até **Atribuições da Equipe de Serviço**.
2. Clique em **Adicionar Posição**. Preencha as informações no formulário de nova posição. Para o nome da categoria, use o que preferir. Para permitir que qualquer pessoa da sua igreja preencha a posição (e não apenas membros de uma equipe), deixe **Grupo de Voluntários** definido como **Nenhum**.
3. Clique em **Pessoas Necessárias** e escolha os voluntários para preencher essa posição. Se a posição tiver um **Grupo de Voluntários**, você escolhe entre os membros desse grupo. Se o Grupo de Voluntários estiver definido como **Nenhum**, você pode buscar qualquer pessoa da sua igreja.
4. Adicione membros da lista da sua equipe clicando em **Adicionar**.
5. Os membros atribuídos aparecerão em sua equipe com o status da atribuição.
6. Clique em notificar voluntários para avisá-los pelo aplicativo do B1 ou por e-mail. Se o plano usar um [fluxo de confirmação](#plan-settings), notificar também inicia um cartão de fluxo que acompanha cada solicitação até o voluntário responder.

Cada posição mostra um indicador de contagem (por exemplo, "2/3") para que você veja, de relance, quantas vagas estão preenchidas. Abaixo do título **Atribuições da Equipe de Serviço**, um resumo ("X de Y posições preenchidas") mostra a situação geral de preenchimento do plano, junto com quantas ainda são necessárias, mudando para **Totalmente preenchido** quando todas as posições estiverem cobertas.

:::tip
Configure suas equipes nas configurações do ministério antes de criar os planos. Assim, você terá um grupo de voluntários pronto para atribuir.
:::

### Copiando posições para um plano vazio

Se um plano ainda não tiver posições e houver um plano anterior do mesmo tipo, um link **Copiar do Plano Anterior** aparece em **Atribuições da Equipe de Serviço**. Escolha **Somente posições** ou **Posições e atribuições** para preencher o plano aberto com as posições (e os voluntários) do plano anterior. A cópia vai para o plano atual; ela não cria um segundo plano para a mesma data.

## Configurações do plano

Cada plano tem configurações adicionais que você pode ajustar clicando em **Editar** ao lado do plano na lista do tipo de plano, ou no botão **Editar** no topo da página do plano. Clique em **Concluído** (ou no nome do plano) para voltar ao plano. Entre elas estão:

- **Prazo de inscrição (horas antes do culto)** -- o número de horas antes do culto em que as inscrições dos voluntários são encerradas. As horas são contadas a partir do primeiro horário de **Culto** do plano (ensaios e outros horários são ignorados, a menos que o plano não tenha mais nenhum horário), então um prazo de 2 horas para um culto às 10h00 encerra as inscrições às 8h00 daquela manhã. Se o plano não tiver horários, o prazo é contado a partir das 9h00 da data do culto, no fuso horário da sua igreja. Depois que ele passa, os voluntários não podem se inscrever nem se remover. Informe um número negativo para manter as inscrições abertas após o início do culto. Deixe em branco, ou apague o valor, para não ter prazo.
- **Fluxo de confirmação** -- escolha um [fluxo de confirmação de atribuição de serviço](./workflows.md#serving-assignment-confirmations) para acompanhar as solicitações de serviço deste plano por e-mail e mensagem de texto até que cada voluntário aceite ou recuse. Quando você **Notifica** os voluntários em um plano publicado, cada nova solicitação recebe seu próprio cartão no quadro desse fluxo, e uma nota acima do link de notificação diz *"Novas solicitações usam o fluxo de confirmação."* Deixe em **Usar notificações de atribuição existentes** para manter as notificações habituais. Somente fluxos de confirmação ativos aparecem na lista; crie um em **Serviço > Fluxos de Trabalho** antes.
- **Mostrar nomes dos voluntários na página de inscrição** -- quando marcada, os voluntários que estão conectados podem ver quem mais já se inscreveu em cada posição na página de inscrição de voluntários do B1.church. Os nomes nunca são exibidos para visitantes que não estão conectados.
- **Em modo lápis** -- oculta as atribuições dos voluntários até que você esteja pronto para publicar a escala.
- **Agendar automaticamente um substituto quando um voluntário recusar** -- quando marcada, se um voluntário atribuído recusar sua posição, o B1 entrará em contato automaticamente com a próxima pessoa disponível na lista da equipe e perguntará se ela pode servir. Isso continua na lista até que alguém aceite, mantendo as posições preenchidas sem acompanhamento manual.

:::tip
Na página de inscrição de membros, as posições abertas de cada plano são listadas por categoria e depois por nome. Os membros veem todas as próximas semanas com posições abertas, a menos que você ative **Mostrar apenas a próxima semana de cada tipo de plano** em [Configurações > Inscrição de Voluntários](../settings/church-settings.md#volunteer-signup).
:::

## Lembretes para voluntários {#volunteer-reminders}

O B1 pode lembrar automaticamente os voluntários antes dos cultos para os quais estão escalados, para que você não precise correr atrás da equipe toda semana. Os lembretes são enviados para **todos os escalados**, tanto os que já confirmaram quanto os que ainda não responderam. A exceção é uma solicitação enviada por um [fluxo de confirmação](./workflows.md#serving-assignment-confirmations): esse voluntário recebe lembretes somente depois de aceitar, já que o fluxo cuida dos acompanhamentos até lá. Cada e-mail de lembrete inclui a(s) posição(ões) do voluntário, a data do culto, as observações do plano e sua mensagem personalizada.

O horário e o conteúdo dos lembretes são definidos por **tipo de plano**, para que cada tipo de culto possa ter sua própria programação.

1. Na área **Serviço**, selecione o ministério que contém o tipo de plano.
2. Na lista **Tipos de Plano**, clique em **Editar** ao lado do tipo de plano.
3. Expanda a seção **Lembretes** e ative **Enviar lembretes para planos deste tipo**.
4. Em **Quando os lembretes devem ser enviados?**, escolha até três momentos: **7 dias antes**, **3 dias antes**, **2 dias antes**, **1 dia antes** ou **No dia**.
5. Defina o **Horário** em que os lembretes serão enviados.
6. Opcionalmente, adicione uma **Mensagem**. Deixe em branco para usar o texto padrão do lembrete.
7. Em **Enviar por**, escolha **Push**, **E-mail** e, se a sua igreja tiver um [provedor de mensagens de texto](../settings/church-settings.md#texting) conectado, **Mensagem de texto**.
8. Clique em **Salvar Lembretes**.

Os lembretes ficam desativados para um tipo de plano até que você os ative.

:::tip
Os voluntários que ainda não confirmaram recebem os botões **Aceitar** e **Recusar** diretamente no e-mail de lembrete, para que possam responder sem precisar fazer login.
:::

### Lembretes por mensagem de texto

A opção **Mensagem de texto** só aparece quando a sua igreja tem um provedor de mensagens de texto conectado. As mensagens são enviadas pelo provedor de mensagens da sua igreja, e cada uma pode gerar custos para ela. Um voluntário só recebe um lembrete por texto se tiver ativado **Mensagens de texto** em suas [Preferências de Notificação](../../b1-church/getting-started/notification-preferences.md) e tiver um número de celular no perfil. Cada mensagem começa com o nome da sua igreja, é mantida em uma única mensagem de texto e termina com "Responda STOP para cancelar." Quem responder STOP deixa de receber mensagens de texto da sua igreja. Para que as respostas STOP cheguem ao B1, cole a **URL do webhook de entrada (STOP)** das suas [configurações de mensagens de texto](../settings/church-settings.md#texting) no webhook de mensagens recebidas do seu provedor.

Para enviar mensagem de texto a todos os escalados em um intervalo de datas imediatamente, use **Enviar Texto aos Voluntários** na [Visão Geral dos Planos](./plans-overview.md#texting-everyone-scheduled).

:::info
Cada lembrete é enviado uma única vez. Os lembretes por mensagem de texto são enviados além do push e do e-mail, e não no lugar deles.
:::

## Associando grupos a um tipo de plano

Abaixo da lista de planos, na página do tipo de plano, a seção **Grupos Associados** permite decidir quais grupos podem ver os planos deste tipo a partir do portal de membros. É uma forma rápida de mostrar os próximos cultos às equipes certas, sem dar acesso administrativo a elas.

1. Na página do tipo de plano, clique em **Grupos Associados** no topo da página (ou role até essa seção).
2. Clique em **Adicionar Grupo** e escolha um grupo na lista suspensa.
3. Na coluna **Exibe**, escolha se os membros desse grupo devem ver **Somente planos anteriores**, **Somente planos próximos** ou **Planos anteriores e próximos** para este tipo de plano.
4. Repita para associar outros grupos, ou clique no ícone de lixeira para remover um grupo.

:::info
Somente grupos marcados como **Padrão** aparecem na lista de seleção. Os membros de um grupo associado veem automaticamente os planos deste tipo na página do grupo, no portal de membros do B1, limitados ao período que você selecionou.
:::

Se os planos forem lições do Lessons.church, os membros do grupo associado também veem um cartão **A lição desta semana** na página do grupo (linha de apoio, versículo e uma pergunta para os pais). Associe aqui um grupo de pais e defina o filtro como **Somente planos anteriores** para que a lição de hoje seja incluída. As equipes de voluntários normalmente usam **Somente planos próximos** ou **Planos anteriores e próximos**.

## Imprimindo planos

Você pode imprimir um plano para distribuir à sua equipe. Abra o plano e clique em **Imprimir** no topo da página para gerar uma versão para impressão que inclui as atribuições e a ordem do culto. No topo da impressão aparecem o logotipo da sua igreja (o **Logotipo para Fundo Claro** de [Site > Aparência](../website/appearance.md), caso você tenha enviado um) com o nome da igreja abaixo, e o nome do plano, para que as folhas soltas sejam fáceis de identificar. Isso é útil para entregar nos ensaios ou afixar em uma área comum.

:::info
Os planos são organizados por ministério. Certifique-se de estar na aba do ministério correto antes de criar ou visualizar planos.
:::

## Próximos passos

- Use a [Visão Geral dos Planos](./plans-overview.md) para ver todas as atribuições próximas em várias semanas em uma única grade, identificar posições não preenchidas e atribuir voluntários diretamente pela grade
- Salve a estrutura de um plano como um [Modelo de Plano](./plan-templates.md) para aplicá-la a planos futuros com um único clique
- Monte sua [Ordem do Culto](./service-order.md) com músicas, leituras e outros elementos
- Adicione [músicas](./songs.md) da sua biblioteca diretamente na ordem do culto
- Use as [Tarefas](./tasks.md) para atribuir ações de acompanhamento aos membros da equipe
- Exiba o conteúdo atual das lições em uma TV do lobby com a [Sinalização Digital](./digital-signage.md)
