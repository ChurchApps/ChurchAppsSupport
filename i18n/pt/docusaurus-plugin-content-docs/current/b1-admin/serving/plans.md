---
title: "Planos de Serviço"
---

# Planos de Serviço

<div class="article-intro">

Os planos de serviço organizam quem está servindo e quando. Cada plano está vinculado a uma data e a um ministério específicos, facilitando a coordenação das equipes de voluntários semana a semana e garantindo que cada culto esteja com a escala completa.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- Configure seus ministérios e equipes na área Servindo
- Certifique-se de que os voluntários foram adicionados ao seu [diretório de pessoas](../people/adding-people.md) e atribuídos às equipes

</div>

## Acessando os Planos

1. No B1 Admin, abra o [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (a barra de pesquisa no canto superior esquerdo), expanda **Servindo** e clique em **Planos**.
2. Selecione uma **aba de ministério** na parte superior da página.
3. Clique em um **tipo de plano** para ver a lista de planos desse tipo. Use **Próximos** e **Passados** acima da lista para alternar entre planos futuros e anteriores.
4. Clique em um plano específico para abri-lo.

Cada página de plano mostra links de volta ao seu tipo de plano e a **Planos**, para que você possa voltar sem usar o botão de voltar do navegador.

:::info
Não é preciso ser administrador completo para gerenciar planos. Qualquer membro de um ministério pode acessar Servindo e criar, editar e agendar planos do seu próprio ministério sem precisar da permissão Plans Edit. Editores com a função Plans Edit podem gerenciar planos de todos os ministérios.
:::

## Criando um Plano

1. Na página do tipo de plano, clique em **Novo Plano** na parte superior da página.
2. Dê um nome ao plano ou use a data como nome. Selecione a **data** do culto.
3. Se o seu ministério tiver [modelos](./plan-templates.md), você pode escolher um em **Começar a partir de modelo** para preencher a ordem do culto, as posições e as observações de uma só vez.
4. Caso contrário, se quiser copiar de um plano anterior, use **Copiar do Plano Anterior** para escolher **Apenas Posições** ou **Posições e Atribuições**. Se não quiser copiar, escolha **Nada**. Você também pode marcar **Copiar Ordem do Culto**. Ao copiar de um plano anterior, o novo plano também mantém as **Observações**, o **Prazo de Inscrição**, a opção **Mostrar nomes de voluntários na página de inscrição** e a configuração de substituição automática desse plano, para que você não precise digitá-las novamente toda semana. Você pode alterar qualquer uma delas nas configurações do novo plano.
5. Para configurar várias semanas de uma vez ao copiar, digite um número em **Repetir semanalmente por este número de semanas** (até 12). O B1 cria um plano por semana, cada um copiado do anterior. Se o plano for nomeado pela data, cada novo plano recebe o nome da sua própria data.
6. Opcionalmente, defina o **Prazo de Inscrição (horas antes do serviço)**. Um novo plano começa com o prazo do plano anterior, e você pode alterá-lo aqui. Deixe em branco para não ter prazo.
7. Salve o plano. Agora você pode começar a atribuir membros da equipe e montar a [ordem do culto](./service-order.md).

:::tip
**Repetir semanalmente por este número de semanas** só está disponível enquanto você copia algo do plano anterior (posições, atribuições ou a ordem do culto).
:::

## A Página de Detalhes do Plano

Ao abrir um plano, o nome, o ministério, o tipo de plano e a data do serviço aparecem no topo, com os botões **Editar** e **Imprimir**. Abaixo disso, tudo fica em uma única página:

- **[Ordem do Culto](./service-order.md)** -- Monte a ordem do culto com elementos como cânticos de louvor, orações, anúncios e a mensagem.
- **Atribuições da Equipe de Serviço** -- Gerencie quais membros da equipe estão atribuídos a este plano. Você pode adicionar pessoas das suas equipes existentes e ver quem confirmou ou ainda está pendente. Os links acima das posições permitem abrir as **Observações** e os **Horários** do plano.

## Atribuindo Membros da Equipe {#assigning-team-members}

1. Abra um plano e role até **Atribuições da Equipe de Serviço**.
2. Clique em **Adicionar Posição**. Preencha as informações no formulário de adição de posição. Para o nome da categoria, use o que preferir. Para permitir que qualquer pessoa da sua igreja preencha a posição (e não apenas membros de uma equipe), deixe o **Grupo de Voluntários** em **Nenhum**.
3. Clique em **Pessoas Necessárias** e escolha os voluntários para preencher a posição. Se a posição tiver um **Grupo de Voluntários**, você escolhe entre os membros desse grupo. Se o Grupo de Voluntários estiver como **Nenhum**, você pode pesquisar qualquer pessoa da sua igreja.
4. Adicione membros da lista da sua equipe clicando em **Adicionar**.
5. Os membros atribuídos aparecerão em sua equipe com o status da atribuição.
6. Clique em notificar os voluntários para avisá-los pelo aplicativo B1 ou por e-mail.

Cada posição mostra um contador (por exemplo, "2/3") para que você veja rapidamente quantas vagas estão preenchidas. Abaixo do título **Atribuições da Equipe de Serviço**, um resumo ("X de Y posições preenchidas") mostra a escala geral do plano, junto com quantas ainda são necessárias, passando a exibir **Totalmente escalado** quando todas as posições estiverem cobertas.

:::tip
Configure suas equipes nas configurações do ministério antes de criar os planos. Assim, você terá um grupo pronto de voluntários para atribuir.
:::

### Copiando Posições para um Plano Vazio {#copying-positions-into-an-empty-plan}

Se um plano ainda não tiver posições e existir um plano anterior do mesmo tipo, aparece um link **Copiar do Plano Anterior** em **Atribuições da Equipe de Serviço**. Escolha **Apenas Posições** ou **Posições e Atribuições** para preencher o plano aberto com as posições (e voluntários) do plano anterior. A cópia vai para o plano atual; ela não cria um segundo plano para a mesma data.

## Configurações do Plano

Cada plano tem configurações adicionais que você pode ajustar clicando em **Editar** ao lado do plano na lista do tipo de plano, ou no botão **Editar** no topo da página do plano. Clique em **Concluído** (ou no nome do plano) para voltar ao plano. Entre elas estão:

- **Prazo de Inscrição (horas antes do serviço)** -- o número de horas antes do serviço em que as inscrições dos voluntários são encerradas. Digite um número negativo para manter as inscrições abertas depois do horário de início do serviço. Deixe em branco para não ter prazo.
- **Mostrar nomes de voluntários na página de inscrição** -- quando marcada, os voluntários conectados podem ver quem mais já está inscrito em cada posição na página de inscrição do B1.church. Os nomes nunca são mostrados a visitantes que não estão conectados.
- **Esboçado** -- oculta as atribuições dos voluntários até que você esteja pronto para publicar a escala.
- **Agendar automaticamente um substituto quando um voluntário recusa** -- quando marcada, se um voluntário atribuído recusar a posição, o B1 entrará em contato automaticamente com a próxima pessoa disponível na lista da equipe e perguntará se ela pode servir. Isso continua até que alguém aceite, mantendo as posições preenchidas sem acompanhamento manual.

## Lembretes para Voluntários {#volunteer-reminders}

O B1 pode lembrar automaticamente os voluntários antes dos cultos para os quais estão escalados, para que você não precise cobrar sua equipe toda semana. Os lembretes são enviados para **todos os escalados** -- tanto os que confirmaram quanto os que ainda não responderam. Cada e-mail de lembrete inclui a posição (ou posições) do voluntário, a data do serviço, as observações do plano e a sua mensagem personalizada.

O horário e o conteúdo dos lembretes são definidos por **tipo de plano**, de modo que cada tipo de culto pode ter sua própria programação.

1. Na área **Servindo**, selecione o ministério que contém o tipo de plano.
2. Na lista **Tipos de Plano**, clique em **Editar** ao lado do tipo de plano.
3. Expanda a seção **Lembretes** e ative **Enviar lembretes para planos deste tipo**.
4. Em **Quando os lembretes devem ser enviados?**, escolha até três momentos: **7 dias antes**, **3 dias antes**, **2 dias antes**, **1 dia antes** ou **No dia**.
5. Defina a **Hora do Dia** em que os lembretes serão enviados.
6. Opcionalmente, adicione uma **Mensagem**. Deixe em branco para usar o texto padrão do lembrete.
7. Em **Enviar Por**, escolha **Push**, **Email** e, se sua igreja tiver um [provedor de mensagens de texto](../settings/church-settings.md#texting) conectado, **Texto**.
8. Clique em **Salvar Lembretes**.

Os lembretes ficam desativados para um tipo de plano até que você os ative.

:::tip
Voluntários que ainda não confirmaram recebem os botões **Aceitar** e **Recusar** diretamente no e-mail de lembrete, para que possam responder sem precisar fazer login.
:::

### Lembretes por Texto {#text-reminders}

A opção **Texto** só aparece quando sua igreja tem um provedor de mensagens de texto conectado. Os textos são enviados pelo provedor da sua igreja, e cada texto pode gerar custos para ela. Um voluntário só recebe um lembrete por texto se tiver ativado **Mensagens de texto** nas suas [Preferências de Notificação](../../b1-church/getting-started/notification-preferences.md) e tiver um número de celular no perfil. Cada texto começa com o nome da sua igreja, é mantido em uma única mensagem de texto e termina com "Responda STOP para cancelar." Quem responder STOP deixa de receber textos da sua igreja. Para que as respostas STOP cheguem ao B1, cole a **URL do webhook de entrada (STOP)** das suas [configurações de mensagens de texto](../settings/church-settings.md#texting) no webhook de mensagens recebidas do seu provedor.

Para enviar textos a todos os escalados em um intervalo de datas imediatamente, use **Enviar Texto aos Voluntários** na [Visão Geral de Planos](./plans-overview.md#texting-everyone-scheduled).

:::info
Cada lembrete é enviado uma única vez. Os lembretes por texto são enviados além do push e do e-mail, e não no lugar deles.
:::

## Associando Grupos a um Tipo de Plano

Abaixo da lista de planos na página do tipo de plano, a seção **Grupos Associados** permite decidir quais grupos podem ver os planos deste tipo pelo portal de membros. É uma forma rápida de mostrar os próximos cultos às equipes certas sem dar acesso de administrador.

1. Na página do tipo de plano, clique em **Grupos Associados** no topo da página (ou role até essa seção).
2. Clique em **Adicionar Grupo** e escolha um grupo na lista suspensa.
3. Na coluna **Mostra**, escolha se os membros desse grupo devem ver **Apenas planos passados**, **Apenas planos futuros** ou **Planos passados e futuros** para este tipo de plano.
4. Repita para associar outros grupos, ou clique no ícone de lixeira para remover um grupo.

:::info
Somente grupos marcados como **Padrão** aparecem na lista de seleção. Os membros de um grupo associado veem automaticamente os planos deste tipo na página do grupo no portal de membros do B1 -- limitados ao período selecionado.
:::

Se os planos forem lições do Lessons.church, os membros do grupo associado também veem um cartão **Lição desta semana** na página do grupo (mensagem central, versículo e uma pergunta para os pais). Associe aqui um grupo de pais e defina o filtro como **Apenas planos passados** para que a lição de hoje seja incluída. Equipes de voluntários normalmente usam **Apenas planos futuros** ou **Planos passados e futuros**.

## Imprimindo Planos

Você pode imprimir um plano para distribuir à sua equipe. Abra o plano e clique em **Imprimir** no topo da página para gerar uma versão para impressão que inclui as atribuições e a ordem do culto. No topo da impressão aparecem o logotipo da sua igreja (o **Logotipo para Fundo Claro** em [Website > Aparência](../website/appearance.md), se você tiver enviado um) com o nome da sua igreja abaixo, e o nome do plano, para que as folhas avulsas sejam fáceis de identificar. Isso é útil para distribuir em ensaios ou afixar em uma área comum.

:::info
Os planos são organizados por ministério. Certifique-se de estar na aba do ministério correta antes de criar ou visualizar planos.
:::

## Próximos Passos

- Use a [Visão Geral de Planos](./plans-overview.md) para ver todas as atribuições futuras de várias semanas em uma única grade, identificar posições não preenchidas e atribuir voluntários diretamente pela grade
- Salve a estrutura de um plano como um [Modelo de Plano](./plan-templates.md) para aplicá-la em planos futuros com um único clique
- Monte sua [Ordem do Culto](./service-order.md) com cânticos, leituras e outros elementos
- Adicione [cânticos](./songs.md) da sua biblioteca diretamente na ordem do culto
- Use [Tarefas](./tasks.md) para atribuir itens de acompanhamento aos membros da equipe
- Exiba o conteúdo atual das lições em uma TV do saguão com [Sinalização Digital](./digital-signage.md)
