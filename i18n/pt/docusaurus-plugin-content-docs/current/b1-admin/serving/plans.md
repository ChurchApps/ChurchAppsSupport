---
title: "Planos de culto"
description: "Configure a escala de voluntários no B1 Admin: crie planos de culto por data, copie de semanas anteriores, atribua membros da equipe às posições e gerencie prazos de inscrição e lembretes."
---

# Planos de culto

<div class="article-intro">

Os planos de culto organizam quem serve e quando. Cada plano está vinculado a uma data e a um ministério específicos, o que facilita coordenar suas equipes de voluntários semana a semana e garantir que cada culto esteja com a equipe completa.

</div>

## Vídeo de treinamento {#training-video}

<YouTube id="_ekj0UR6H5g" title="Criando planos e escalando voluntários no B1" next="Montando a ordem do culto e a biblioteca de músicas no B1" nextUrl="/docs/b1-admin/serving/service-order" />

<div class="prereqs">
<h4>Antes de começar</h4>

- Configure seus ministérios e equipes na área Servindo
- Certifique-se de que os voluntários foram adicionados ao seu [diretório de pessoas](../people/adding-people.md) e atribuídos às equipes

</div>

## Acessando os planos {#accessing-plans}

1. No B1 Admin, abra o [Menu de atalhos](../introduction.md#getting-around-with-the-jump-menu) (a barra de busca no canto superior esquerdo), expanda **Servindo** e clique em **Planos**.
2. Selecione uma **aba de ministério** no topo da página.
3. Clique em um **tipo de plano** para ver a lista de planos desse tipo. Use **Próximos** e **Anteriores** acima da lista para alternar entre os planos futuros e os anteriores. **Próximos** lista os planos a partir de hoje, do mais próximo para o mais distante, com os planos sem data no final. **Anteriores** lista somente os planos passados, do mais recente para o mais antigo.
4. Clique em um plano específico para abri-lo.

Cada página de plano mostra links de volta ao seu tipo de plano e a **Planos**, para que você possa voltar sem usar o botão de voltar do navegador.

:::info
Não é necessário ter acesso completo de administrador para gerenciar planos. Qualquer pessoa que seja membro de um ministério pode acessar Servindo e criar, editar e agendar planos para o próprio ministério, sem precisar da permissão de Editar planos. Editores com a função de Editar planos podem gerenciar planos de todos os ministérios.
:::

## Criando um plano {#creating-a-plan}

1. Na página do tipo de plano, clique em **Novo plano** no topo da página. O formulário **Adicionar um plano** é aberto.
2. Dê um nome ao plano ou use a data como nome. Selecione a **Data do culto**. Se a sua igreja tiver mais de um campus, você também pode escolher o **Campus** do plano.
3. Se o seu ministério tiver [modelos](./plan-templates.md), você pode escolher um em **Começar a partir de um modelo** para preencher a ordem do culto, as posições e as observações em um único passo.
4. Caso contrário, se quiser copiar de um plano anterior, use **Copiar do plano anterior** para escolher **Somente posições** ou **Posições e escalas**. Se não quiser copiar, escolha **Nada**. Você também pode marcar **Copiar a ordem do culto**. Ao copiar de um plano anterior, o novo plano também mantém as **Observações**, o **Prazo de inscrição**, a opção **Mostrar nomes dos voluntários na página de inscrição** e a configuração de substituição automática desse plano, para que você não precise preenchê-las novamente toda semana. Você pode alterar qualquer uma delas nas configurações do novo plano.
5. Para configurar vários planos de uma vez enquanto copia, escolha **Repetir a cada** e **Frequência** (Dia, Semana ou Mês), depois informe o **Número de planos** (até 12). Para Mês, **Em** permite manter o mesmo dia do mês ou o mesmo dia da semana, como o segundo sábado. O B1 lista as datas antes de você salvar e cria um plano para cada data, cada um copiado do anterior. Se o plano for nomeado pela data, cada novo plano recebe o nome da própria data.
6. Opcionalmente, defina o **Prazo de inscrição (horas antes do culto)**. Um novo plano começa com o prazo do plano anterior, e você pode alterá-lo aqui. Deixe em branco para não ter prazo. Veja [Configurações do plano](#plan-settings) para saber como o prazo é contado.
7. Salve o plano. Agora você pode começar a atribuir membros da equipe e a montar a [ordem do culto](./service-order.md).

:::tip
As configurações de repetição só estão disponíveis enquanto você copia algo do plano anterior (posições, escalas ou a ordem do culto).
:::

## A página do plano {#the-plan-page}

Ao abrir um plano, o ministério e o tipo de plano, o nome e a data do culto aparecem no topo, com os botões **Imprimir** e **Editar detalhes**. A página oferece uma visão geral do plano inteiro:

- Os blocos **Duração**, **Equipe de serviço** e **Respostas** mostram a duração da ordem do culto, quantas posições estão preenchidas (por exemplo, "10 de 13 preenchidas") e quantos voluntários aceitaram, estão pendentes ou recusaram.
- **Ordem do culto** mostra os primeiros itens da [ordem do culto](./service-order.md) com as respectivas durações. Clique em **Editar ordem do culto** para abrir a ordem completa em sua própria página.
- **Equipe de serviço** lista cada posição por categoria, com os voluntários atribuídos e quantos ainda são necessários. Se algo precisar de atenção, aparece uma linha como "1 conflito · 3 não notificados", com um link **Revisar**. Clique em **Gerenciar equipe de serviço** para abrir a página completa da equipe.
- **Horários** lista os horários de culto e de ensaio do plano. Veja [Horários do culto](#service-times).
- **Observações** guarda notas para toda a equipe. Clique em **Editar**, digite suas observações e clique em **Salvar observações**.

As páginas da ordem do culto e da equipe de serviço têm um link **Voltar ao plano** que retorna à visão geral.

## Horários do culto {#service-times}

Os horários informam ao B1 quando acontecem o culto e os eventuais ensaios. Eles são usados para o prazo de inscrição, a [validação do plano](./plan-validation.md), os lembretes aos voluntários e os horários da ordem do culto.

1. Na página do plano, clique em **Adicionar horário** ao lado de **Horários**.
2. Escolha o **Tipo**: **Culto**, **Ensaio** ou **Outro**.
3. Digite um **Nome de exibição** (por exemplo, "Culto de domingo" ou "Ensaio").
4. Defina o **Horário de início** e o **Horário de término**.
5. Em **Equipes de serviço necessárias**, marque as categorias de posição (por exemplo, Louvor ou Técnica) que servem nesse horário.
6. Clique em **Salvar**.

Clique no nome de um horário para editá-lo ou excluí-lo.

## Atribuindo membros da equipe {#assigning-team-members}

1. Abra um plano e clique em **Gerenciar equipe de serviço**.
2. Clique em **Adicionar posição**. Na caixa de diálogo **Adicionar uma posição**, escolha ou digite um **Nome da categoria** (por exemplo, Louvor ou Recepção), informe o **Nome** da posição e a **Quantidade de voluntários**, e escolha um **Grupo de voluntários**. Para que qualquer pessoa da sua igreja possa preencher a posição (e não apenas os membros de uma equipe), deixe o **Grupo de voluntários** em **Nenhum**. Marque **Permitir inscrição própria** para que os voluntários possam se inscrever nas vagas abertas, e adicione uma **Descrição** opcional, que os voluntários veem ao navegar pelas oportunidades de inscrição. Clique em **Salvar**.
3. Clique no link **Pessoas necessárias** ao lado da posição (por exemplo, "2 pessoas necessárias").
4. Na caixa de diálogo **Atribuir posição**, clique no nome de um membro da equipe para atribuí-lo. Se o Grupo de voluntários da posição estiver em **Nenhum**, pesquise qualquer pessoa da sua igreja e clique no ícone de adicionar pessoa ao lado dela. Clique em **Concluído** quando terminar.
5. Os voluntários atribuídos aparecem ao lado da posição. Um ponto verde na foto significa que aceitaram, e um ponto vermelho significa que recusaram.
6. Notifique os voluntários pelo painel **Validação** (veja [Notificando voluntários](./plan-validation.md#notifying-volunteers)). Se o plano usar um [fluxo de confirmação](#plan-settings), notificar também inicia um card de fluxo de trabalho que acompanha cada solicitação até que o voluntário responda.

Para alterar ou remover uma atribuição, clique no nome do voluntário e clique em **Excluir** na caixa de diálogo **Editar atribuição**. Para alterar uma posição, clique no nome dela; o botão **Excluir** na caixa de diálogo **Editar posição** remove a posição e desagenda quem estiver atribuído a ela.

Cada posição mostra um contador (por exemplo, "2/3", ou "1/2 inscrição" para posições de inscrição própria), para que você veja de relance quantas vagas estão preenchidas. No topo da página da equipe de serviço, um resumo ("X de Y posições preenchidas") mostra a escala geral do plano, com quantas ainda faltam, mudando para **Equipe completa** quando todas as posições estiverem cobertas.

:::tip
Configure suas equipes nas configurações do ministério antes de criar os planos. Assim, você terá um grupo de voluntários pronto para atribuir.
:::

### Preenchimento automático {#auto-assign}

Clique em **Preenchimento automático** na página da equipe de serviço para preencher todas as vagas abertas com o Grupo de voluntários de cada posição. Posições sem Grupo de voluntários são ignoradas. Para desfazer a atribuição dos voluntários que acabou de adicionar, clique em **Desfazer preenchimento automático**. Você também pode preencher vários planos de uma vez pela [Visão geral dos planos](./plans-overview.md#auto-scheduling-from-the-overview).

### Preferências de escala {#scheduling-preferences}

Na caixa de diálogo **Atribuir posição**, clique no ícone de controles ao lado de um membro da equipe para definir as **Preferências de escala** dele: **Máximo de vezes por mês**, **Horários de culto preferidos** e **Escala por família** (escalar a família junta, ou não no mesmo dia). A [validação do plano](./plan-validation.md) avisa quando uma atribuição contraria essas preferências.

### Copiando posições para um plano vazio {#copying-positions-into-an-empty-plan}

Se um plano ainda não tiver posições e houver um plano anterior do mesmo tipo, um link **Copiar do plano anterior** aparece na página da equipe de serviço. Escolha **Somente posições** ou **Posições e escalas** para preencher o plano aberto com as posições (e os voluntários) do plano anterior. A cópia vai para o plano atual; ela não cria um segundo plano para a mesma data.

## Configurações do plano {#plan-settings}

Cada plano tem configurações adicionais, que podem ser ajustadas clicando em **Editar** ao lado do plano na lista do tipo de plano, ou em **Editar detalhes** no topo da página do plano. Clique em **Concluído** (ou no nome do plano acima do formulário) para voltar ao plano. O mesmo formulário tem um botão **Excluir**, que exclui o plano, incluindo suas posições, escalas e a ordem do culto. As configurações incluem:

- **Prazo de inscrição (horas antes do culto)** — o número de horas antes do culto em que as inscrições dos voluntários são encerradas. As horas são contadas a partir do primeiro horário de **Culto** do plano (ensaios e outros horários são ignorados, a menos que o plano não tenha mais nada), de modo que um prazo de 2 horas em um culto às 10:00 AM encerra as inscrições às 8:00 AM daquela manhã. Se o plano não tiver horários, o prazo é contado a partir das 9:00 AM da data do culto, no fuso horário da sua igreja. Depois que o prazo passa, os voluntários não podem se inscrever nem se retirar. Digite um número negativo para manter as inscrições abertas após o início do culto. Deixe em branco, ou apague o valor, para não ter prazo.
- **Fluxo de confirmação** — escolha um [fluxo de trabalho de confirmação de escala de serviço](./workflows.md#serving-assignment-confirmations) para acompanhar as solicitações de serviço deste plano por e-mail e SMS até que cada voluntário aceite ou recuse. Quando você **Notifica** os voluntários de um plano publicado, cada nova solicitação ganha seu próprio card no quadro desse fluxo de trabalho, e uma nota acima do link de notificação diz *"Novas solicitações usam o fluxo de confirmação."* Deixe em **Usar notificações de escala existentes** para manter as notificações habituais. Somente os fluxos de confirmação ativos aparecem na lista; crie um antes em **Servindo > Fluxos de trabalho**.
- **Mostrar nomes dos voluntários na página de inscrição** — quando marcada, os voluntários conectados podem ver quem mais já se inscreveu em cada posição na página de inscrição do B1.church. Os nomes nunca são mostrados a visitantes que não estão conectados. Esta opção também controla se os voluntários responsáveis por cada item da ordem do culto são impressos ao lado dele (veja [Imprimindo planos](#printing-plans)).
- **Em análise** — oculta as escalas dos voluntários até que você esteja pronto para publicar a escala. Enquanto um plano está em análise, o painel **Validação** na página da equipe de serviço mostra um botão **Publicar plano** (ou **Publicar e notificar**, quando os voluntários ainda não foram notificados), que torna as escalas visíveis.
- **Agendar automaticamente um substituto quando um voluntário recusar** — quando marcada, se um voluntário escalado recusar a posição, o B1 entrará em contato automaticamente com a próxima pessoa disponível na lista da equipe e perguntará se ela pode servir. Isso continua até que alguém aceite, mantendo as posições preenchidas sem acompanhamento manual.

:::tip
Na página de inscrição de membros, as posições abertas de cada plano são listadas por categoria e depois por nome. Os membros veem todas as semanas futuras com posições abertas, a menos que você ative **Mostrar apenas a próxima semana de cada tipo de plano** em [Configurações > Inscrição de voluntários](../settings/church-settings.md#volunteer-signup).
:::

## Lembretes aos voluntários {#volunteer-reminders}

O B1 pode lembrar automaticamente os voluntários dos cultos para os quais foram escalados, para que você não precise cobrar sua equipe toda semana. Os lembretes são enviados a **todos os escalados** — tanto os que confirmaram quanto os que ainda não responderam. A exceção é uma solicitação enviada por um [fluxo de confirmação](./workflows.md#serving-assignment-confirmations): esse voluntário recebe lembretes somente depois de aceitar, já que o fluxo de trabalho faz o acompanhamento até lá. Cada e-mail de lembrete inclui a(s) posição(ões) do voluntário, a data do culto, as observações do plano e a sua mensagem personalizada.

O horário e o conteúdo dos lembretes são definidos por **tipo de plano**, para que cada tipo de culto mantenha sua própria programação.

1. Na área **Servindo**, selecione o ministério que contém o tipo de plano.
2. Na lista **Tipos de plano**, clique em **Editar** ao lado do tipo de plano.
3. Expanda a seção **Lembretes** e ative **Enviar lembretes para planos deste tipo**.
4. Em **Quando os lembretes devem ser enviados?**, escolha até três antecedências: **7 dias antes**, **3 dias antes**, **2 dias antes**, **1 dia antes** ou **No dia**.
5. Defina a **Hora do dia** em que os lembretes serão enviados.
6. Opcionalmente, adicione uma **Mensagem**. Deixe em branco para usar o texto padrão do lembrete.
7. Em **Enviar por**, escolha **Notificação push**, **E-mail** e, se a sua igreja tiver um [provedor de SMS](../settings/church-settings.md#texting) conectado, **SMS**.
8. Clique em **Salvar lembretes**.

Os lembretes ficam desativados para um tipo de plano até que você os ative.

:::tip
Voluntários que ainda não confirmaram recebem os botões **Aceitar** e **Recusar** dentro do próprio e-mail de lembrete, para que possam responder sem precisar entrar no sistema.
:::

### Lembretes por SMS {#text-reminders}

A opção **SMS** só aparece quando a sua igreja tem um provedor de SMS conectado. Os SMS são enviados pelo provedor de SMS da sua igreja, e cada mensagem pode gerar custos para a igreja. Um voluntário só recebe um lembrete por SMS se tiver ativado **Mensagens de texto** nas suas [Preferências de notificação](../../b1-church/getting-started/notification-preferences.md) e tiver um número de celular no perfil. A equipe com permissão para enviar mensagens de texto pode ativar **Lembretes por SMS** para um voluntário a partir do [registro](../people/adding-people.md#text-reminders) dele. Cada SMS começa com o nome da sua igreja, é mantido em uma única mensagem e termina com "Responda STOP para cancelar." Quem responder STOP deixa de receber SMS da sua igreja. Para que as respostas STOP cheguem ao B1, cole a **URL do webhook de mensagens recebidas (STOP)** das suas [configurações de SMS](../settings/church-settings.md#texting) no webhook de mensagens recebidas do seu provedor.

Para enviar SMS imediatamente a todos os escalados em um intervalo de datas, use **Enviar SMS aos voluntários** na [Visão geral dos planos](./plans-overview.md#texting-everyone-scheduled).

:::info
Cada lembrete é enviado uma única vez. Os lembretes por SMS são enviados além das notificações push e por e-mail, e não no lugar delas.
:::

## Associando grupos a um tipo de plano {#associating-groups-with-a-plan-type}

Abaixo da lista de planos na página do tipo de plano, a seção **Grupos associados** permite definir quais grupos podem ver os planos deste tipo pelo portal de membros. É uma forma rápida de divulgar os próximos cultos para as equipes certas, sem dar acesso de administrador a elas.

1. Na página do tipo de plano, clique em **Grupos associados** no topo da página (ou role até essa seção).
2. Clique em **Adicionar grupo** e escolha um grupo na lista.
3. Na coluna **Exibe**, escolha se os membros desse grupo devem ver **Somente planos passados**, **Somente planos futuros** ou **Planos passados e futuros** para este tipo de plano.
4. Repita para associar outros grupos, ou clique no ícone de lixeira para remover um grupo.

:::info
Somente grupos marcados como **Padrão** aparecem na lista de seleção. Os membros de um grupo associado veem automaticamente os planos deste tipo na página do grupo, no portal de membros do B1 — limitados à janela de datas que você selecionou.
:::

Se os planos forem lições do Lessons.church, os membros do grupo associado também veem um card **Lição desta semana** na página do grupo (linha de base, versículo e uma pergunta para os pais). Associe aqui um grupo de pais e defina o filtro como **Somente planos passados** para que a lição de hoje seja incluída. As equipes de voluntários normalmente usam **Somente planos futuros** ou **Planos passados e futuros**.

## Imprimindo planos {#printing-plans}

Você pode imprimir um plano para distribuir à sua equipe. Abra o plano e clique em **Imprimir** no topo da página para gerar uma versão para impressão que inclui as escalas e a ordem do culto. No topo da impressão aparecem o logo da sua igreja (o **Logo para fundo claro** de [Site > Aparência](../website/appearance.md), se você tiver enviado um) com o nome da igreja logo abaixo, e o nome do plano, para que as folhas avulsas sejam fáceis de identificar. Isso é útil para entregar nos ensaios ou afixar em uma área comum.

Quando o plano tem mais de um horário de culto, a impressão tem uma coluna de horário para cada culto, com o horário de início no cabeçalho. Um item excluído de um culto (veja [Incluindo itens em horários de culto específicos](./service-order.md#including-items-in-specific-service-times)) mostra um traço na coluna daquele culto.

A impressão omite o que estaria vazio. Se nenhum voluntário estiver atribuído, não há caixa de equipe e a ordem do culto usa a largura total da página. Se nenhum item tiver duração, a coluna **Duração** é omitida; e se o plano não tiver horários de culto nem durações, a coluna **Horário** também é omitida. Para remover a barra preta de título **Ordem do culto** com a data do culto, desmarque **Mostrar título da ordem do culto** no topo da página de impressão; o B1 Admin lembra sua escolha naquele navegador.

:::info
Os planos são organizados por ministério. Certifique-se de estar na aba do ministério correta antes de criar ou visualizar planos.
:::

## Próximos passos {#next-steps}

- Use a [Visão geral dos planos](./plans-overview.md) para ver todas as escalas futuras de várias semanas em uma única grade, identificar posições sem preenchimento e atribuir voluntários diretamente pela grade
- Salve a estrutura de um plano como [Modelo de plano](./plan-templates.md) para aplicá-la a planos futuros com um único clique
- Monte sua [Ordem do culto](./service-order.md) com músicas, leituras e outros elementos
- Adicione [músicas](./songs.md) da sua biblioteca diretamente na ordem do culto
- Use [Tarefas](./tasks.md) para atribuir itens de acompanhamento aos membros da equipe
- Exiba o conteúdo de lição atual em uma TV do saguão com [Sinalização digital](./digital-signage.md)
