---
title: "Inscrições Pagas"
description: "Configure inscrições pagas em eventos no B1 Admin: tipos de participante com preço, complementos, códigos de desconto, listas de espera e cobrança do pagamento pelo seu provedor de doações."
---

# Inscrições Pagas

<div class="article-intro">

A inscrição em eventos pode ir além de um simples controle de quantidade. Você pode definir tipos de participante com preço (como Adulto e Criança), oferecer complementos opcionais com preços e quantidades próprios, criar códigos de desconto e cobrar o pagamento na inscrição pelo provedor de doações que a sua igreja já utiliza. Quando um evento lota, uma lista de espera opcional mantém os membros interessados na fila e os promove automaticamente à medida que surgem vagas.

</div>

## Vídeo de Treinamento {#training-video}

<YouTube id="eGSZv24Dlzk" title="Inscrições em Eventos e Eventos Pagos no B1" next="Lançando o Site da Sua Igreja no B1" nextUrl="/docs/b1-admin/guides/launch-website" />

<div class="prereqs">
<h4>Antes de Começar</h4>

- Habilite as inscrições no evento primeiro -- veja [Criando Calendários](./creating-calendars.md#enabling-event-registration)
- Para receber pagamentos online, a sua igreja precisa ter [doações online configuradas](../donations/online-giving-setup.md) (Stripe, PayPal ou Kingdom Funding). Eventos gratuitos não precisam de configuração de doações. Sem doações online, as inscrições pagas continuam funcionando, mas as pessoas pagam diretamente à igreja -- veja [Igrejas Sem Doações Online](#churches-without-online-giving).

</div>

## Abrindo as Configurações de Inscrição {#opening-registration-settings}

1. No B1 Admin, abra o [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (a barra de busca no canto superior esquerdo), escolha **Calendários > Inscrições** e clique no seu evento (ou clique no evento no calendário correspondente e escolha **Gerenciar Inscrições**).
2. Clique em **Editar configurações**. O cartão **Configurações de Inscrição** mostra o básico -- **Habilitar Inscrições**, **Capacidade**, **Habilitar Lista de Espera**, **Inscrições Abrem/Encerram**, **Tags** e **Perguntas da Inscrição** -- com um botão **Salvar Configurações**.
3. Abaixo do básico há três seções expansíveis: **Tipos de Participante**, **Seleções** e **Códigos de Desconto**. Cada uma tem seu próprio botão **Salvar**, separado de **Salvar Configurações**; o B1 avisa se você tentar sair com alterações não salvas nelas. Clique em **Voltar para Inscrições** para retornar à lista.

## Tipos de Participante {#attendee-types}

Os tipos de participante permitem cobrar preços diferentes para diferentes tipos de participantes -- e limitar cada um separadamente.

1. Expanda a seção **Tipos de Participante** e clique em **Adicionar Tipo**.
2. Informe um **Nome** (por exemplo, "Adulto", "Criança", "Estudante").
3. Defina um **Preço**. Use 0 para um tipo gratuito.
4. Opcionalmente, defina uma **Capacidade** apenas para este tipo (por exemplo, somente 20 vagas de Criança). Deixe em branco para não ter limite por tipo.
5. Opcionalmente, defina a **Ordem** para controlar a sequência em que os tipos são listados.
6. Clique em **Salvar**.

Para remover um tipo salvo, clique no ícone de exclusão e confirme; ele é removido imediatamente. Seleções e códigos de desconto são removidos da mesma forma.

Durante a inscrição, cada participante escolhe um tipo; os tipos esgotados aparecem como **Esgotado** e não podem ser selecionados. A lista mostra o tipo de cada participante e as contagens acumuladas por tipo.

## Seleções {#selections}

As seleções são complementos opcionais com preço -- camisetas, planos de refeição, upgrades de atividades.

1. Expanda a seção **Seleções** e clique em **Adicionar Seleção**.
2. Informe um **Nome**, uma **Descrição** opcional e um **Preço** (0 aparece como "Gratuito").
3. Opcionalmente, defina uma **Capacidade** (total disponível em todas as inscrições) e uma **Qtd. máx.** (o máximo que uma inscrição pode pedir).
4. Clique em **Salvar**.

Os inscritos escolhem as quantidades durante a inscrição, e os totais são contados na capacidade, para que você nunca venda além do limite.

## Códigos de Desconto {#discount-codes}

1. Expanda a seção **Códigos de Desconto** e clique em **Adicionar Código de Desconto**.
2. Informe o **Código** que os inscritos vão digitar.
3. Escolha o **Tipo** -- **Percentual** ou **Valor** -- e o seu **Valor**.
4. Opcionalmente, limite o código com uma **Data inicial** / **Data final**, um **Mín. de participantes** (número mínimo de participantes na inscrição) e um **Máx. de usos**.
5. Clique em **Salvar**.

Cada código mostra uma contagem de **Usos**, para que você veja com que frequência ele foi utilizado. Os inscritos recebem retorno imediato ao aplicar um código -- inclusive mensagens claras quando o código está expirado, ainda não começou ou exige mais participantes.

## Lista de Espera {#waitlist}

Ative **Habilitar Lista de Espera** no cartão Configurações de Inscrição. Quando o evento atinge a capacidade:

- Os novos inscritos recebem uma vaga na lista de espera em vez de serem recusados. Eles concluem a mesma inscrição (o pagamento é dispensado enquanto estiverem na lista de espera).
- Quando alguém cancela, a inscrição mais antiga da lista de espera é **promovida automaticamente** e recebe um e-mail informando que surgiu uma vaga. Se houver saldo em aberto, o e-mail leva a pessoa a [Minhas Inscrições](../../b1-church/events/my-registrations.md) no site B1 da sua igreja, onde ela pode concluir o pagamento.
- Você pode promover alguém manualmente a qualquer momento com a ação **Promover** em uma linha da lista de espera -- útil depois de aumentar a capacidade do evento.

:::info
As inscrições promovidas permanecem *pendentes* até que qualquer saldo seja pago; o pagamento (ou a ausência de valor a pagar) as confirma.
:::

## A Lista de Inscritos {#the-registration-roster}

Abra um evento na página Inscrições para ver todas as inscrições. O título do cartão mostra quantas inscrições ocupam uma vaga em relação à capacidade (por exemplo, *Inscrições (18 / 20)*). Somente inscrições pendentes e confirmadas contam; quando há pessoas na lista de espera, o título acrescenta a contagem (por exemplo, *· 3 na lista de espera*), e a mesma contagem aparece abaixo da barra de capacidade. O número maior acima da barra de capacidade conta **pessoas** em vez de inscrições -- todos os integrantes de cada inscrição pendente ou confirmada -- assim, uma família de quatro pessoas conta como quatro. O limite de capacidade em si continua contando inscrições. A tabela mostra **Nome**, **Membros**, **Tipo** (o tipo de cada participante), **Pago / Total** (com um aviso de saldo quando ainda há valor em aberto), **Situação** e **Data**, além de fichas com as contagens por tipo acima da tabela.

- Clique no ícone de detalhes de uma linha para abrir a caixa **Detalhes da Inscrição** -- membros, seleções, valores pagos e saldo, e uma tabela de **Pagamentos** com cada cobrança (valor, forma e data).
- **Exportar CSV** baixa a lista completa, com colunas para membros, tipos de participante, seleções, pago/total/saldo, situação e uma coluna para cada pergunta da inscrição.
- **Adicionar Participante** registra uma inscrição feita presencialmente ou por telefone para qualquer pessoa da sua igreja. Escolha a pessoa e, em um evento pago, o tipo de participante dela. O cartão dela não é cobrado: uma inscrição paga é salva como **pendente**, com o valor total como saldo devedor. Se a sua igreja tiver doações online, a pessoa pode pagar pelo [Minhas Inscrições](../../b1-church/events/my-registrations.md); caso contrário, receba o valor pessoalmente. Para adicionar participantes, você precisa da permissão de Editar Inscrições.

:::info
Reembolsos não são processados dentro do B1. Se precisar reembolsar uma inscrição paga cancelada, faça o reembolso pelo painel do seu provedor de doações (por exemplo, Stripe).
:::

## Como Funciona o Pagamento {#how-payment-works}

Os pagamentos passam pelo mesmo gateway de doações que a sua igreja já usa -- os dados do cartão vão direto para o provedor e nunca passam pelos servidores do B1. Os preços são sempre calculados no servidor a partir dos tipos, seleções e códigos de desconto configurados, de modo que um inscrito não consegue alterar o total. Membros conectados podem pagar com um cartão salvo. Os convidados informam o cartão no checkout e precisam marcar a caixa **Não sou um robô** antes de pagar.

### Igrejas Sem Doações Online {#churches-without-online-giving}

Se a sua igreja não tiver um provedor de doações configurado, os eventos pagos ainda podem receber inscrições. A etapa de pagamento informa aos inscritos que o pagamento online não está disponível e que podem pagar diretamente à igreja, e um botão **Inscrever e Pagar Depois** salva a inscrição. Ela fica salva como **pendente**, com o valor total como saldo devedor, e aparece na lista com um aviso de saldo. Receba o dinheiro da forma que a sua igreja normalmente faz.

:::info
O B1 não tem como marcar um pagamento feito fora do sistema como recebido. O saldo devedor permanece na lista e no cartão de [Minhas Inscrições](../../b1-church/events/my-registrations.md) do inscrito depois que você receber o valor, por isso mantenha um registro próprio de quem pagou.
:::

## Artigos Relacionados {#related-articles}

- [Criando Calendários](./creating-calendars.md#enabling-event-registration) — habilite as inscrições e as configurações básicas
- [Configuração de Doações Online](../donations/online-giving-setup.md) — configure o gateway de pagamento usado no checkout
- [Inscrevendo-se em Eventos](../../b1-church/events/registering.md) — o que os membros veem ao se inscrever
- [Minhas Inscrições](../../b1-church/events/my-registrations.md) — como os membros pagam saldos e editam inscrições
