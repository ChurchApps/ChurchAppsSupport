---
title: "Inscrições pagas"
description: "Configure inscrições pagas no B1 Admin: tipos de participante com preço, adicionais, cupons, lista de espera e cobrança pelo seu provedor de doações."
---

# Inscrições pagas

<div class="article-intro">

A inscrição em eventos pode ir além de uma simples contagem de pessoas. Você pode definir tipos de participante com preço (como Adulto e Criança), oferecer complementos opcionais com preços e quantidades próprias, criar códigos de desconto e cobrar o pagamento na inscrição pelo provedor de doações que a sua igreja já usa. Quando um evento lota, uma lista de espera opcional mantém os membros interessados na fila e os promove automaticamente conforme as vagas surgem.

</div>

<div class="prereqs">
<h4>Antes de começar</h4>

- Ative a inscrição no evento primeiro — veja [Criando calendários](./creating-calendars.md#enabling-event-registration)
- Para cobrar pagamentos online, a sua igreja precisa ter [doações online configuradas](../donations/online-giving-setup.md) (Stripe, PayPal ou Kingdom Funding). Eventos gratuitos não precisam de configuração de doações. Sem doações online, as inscrições pagas ainda funcionam, mas as pessoas pagam diretamente à igreja — veja [Igrejas sem doações online](#churches-without-online-giving).

</div>

## Abrindo as configurações de inscrição

1. No B1 Admin, abra o [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (a barra de pesquisa no canto superior esquerdo), escolha **Calendários > Inscrições** e abra o seu evento (ou abra o evento a partir do seu calendário).
2. O cartão **Configurações de inscrição** mostra o básico — **Ativar inscrições**, **Capacidade**, **Inscrições abrem/fecham**, **Tags** e **Perguntas de inscrição**.
3. Abaixo do básico há três acordeões: **Tipos de participante**, **Opções** e **Códigos de desconto**.

## Tipos de participante

Os tipos de participante permitem cobrar preços diferentes para cada tipo de pessoa — e limitar cada um separadamente.

1. Expanda o acordeão **Tipos de participante** e clique em **Adicionar tipo**.
2. Digite um **Nome** (por exemplo, "Adulto", "Criança", "Estudante").
3. Defina um **Preço**. Use 0 para um tipo gratuito.
4. Opcionalmente, defina uma **Capacidade** só para este tipo (por exemplo, apenas 20 vagas de Criança). Deixe em branco para não ter limite por tipo.
5. Clique em **Salvar**.

Durante a inscrição, cada participante escolhe um tipo; os tipos esgotados aparecem como **Esgotado** e não podem ser selecionados. A lista de inscritos mostra o tipo de cada participante e as contagens acumuladas por tipo.

## Opções

As opções são complementos pagos e opcionais — camisetas, planos de refeição, upgrades de atividades.

1. Expanda o acordeão **Opções** e clique em **Adicionar opção**.
2. Digite um **Nome**, uma **Descrição** opcional e um **Preço** (0 aparece como "Grátis").
3. Opcionalmente, defina uma **Capacidade** (total disponível em todas as inscrições) e uma **Qtd. máxima** (a maior quantidade que uma inscrição pode pedir).
4. Clique em **Salvar**.

Os inscritos escolhem as quantidades durante a inscrição, e os totais contam para a capacidade, para que você nunca venda além do limite.

## Códigos de desconto

1. Expanda o acordeão **Códigos de desconto** e clique em **Adicionar código de desconto**.
2. Digite o **Código** que os inscritos vão digitar.
3. Escolha o **Tipo** — **Percentual** ou **Valor** — e o seu **Valor**.
4. Opcionalmente, limite o código com uma **Data de início** / **Data de término**, um **Mín. de membros** (número mínimo de participantes na inscrição) e **Máx. de usos**.
5. Clique em **Salvar**.

Cada código mostra uma contagem de **Usos**, para que você veja com que frequência ele foi resgatado. Os inscritos recebem retorno instantâneo ao aplicar um código — incluindo mensagens claras quando o código está expirado, ainda não começou ou exige mais participantes.

## Lista de espera {#waitlist}

Ative **Ativar lista de espera** no cartão Configurações de inscrição. Quando o evento atinge a capacidade:

- Novos inscritos recebem uma vaga na lista de espera em vez de serem recusados. Eles completam a mesma inscrição (o pagamento é pulado enquanto estiverem na lista de espera).
- Quando alguém cancela, a inscrição mais antiga da lista de espera é **promovida automaticamente** e recebe um e-mail avisando que surgiu uma vaga. Se tiverem saldo em aberto, o e-mail leva a [Minhas inscrições](../../b1-church/events/my-registrations.md) no site B1 da sua igreja, onde podem concluir o pagamento.
- Você pode promover alguém manualmente a qualquer momento com a ação **Promover** em uma linha da lista de espera — útil depois de aumentar a capacidade do evento.

:::info
Inscrições promovidas permanecem *pendentes* até que qualquer saldo seja pago; ao pagar (ou quando não há nada a pagar), elas são confirmadas.
:::

## A lista de inscritos {#the-registration-roster}

Abra um evento na página de Inscrições para ver todas as inscrições. O título do cartão mostra quantas inscrições ocupam uma vaga em relação à capacidade (por exemplo, *Inscrições (18 / 20)*). Somente inscrições pendentes e confirmadas contam; quando há pessoas na lista de espera, o título acrescenta a contagem (por exemplo, *· 3 na lista de espera*), e a mesma contagem aparece abaixo da barra de capacidade. A tabela mostra **Nome**, **Membros**, **Tipo** (o tipo de cada participante), **Pago / Total** (com um aviso de saldo quando ainda há valor em aberto), **Situação** e **Data**, além de chips com a contagem por tipo acima da tabela.

- Clique no ícone de detalhes de uma linha para abrir a janela **Detalhes da inscrição** — membros, opções, pago/saldo e uma tabela de **Pagamentos** listando cada cobrança (valor, forma, data).
- **Exportar CSV** baixa a lista completa com colunas para membros, tipos de participante, opções, pago/total/saldo, situação e uma coluna por pergunta de inscrição.
- **Adicionar participante** registra uma inscrição feita presencialmente ou por telefone para qualquer pessoa da sua igreja. Escolha a pessoa e, em um evento pago, o tipo de participante. O cartão dela não é cobrado: uma inscrição paga é salva como **pendente**, com o valor total como saldo devedor. Se a sua igreja tiver doações online, a pessoa pode pagar em [Minhas inscrições](../../b1-church/events/my-registrations.md); caso contrário, cobre pessoalmente. Você precisa da permissão Editar inscrições para adicionar participantes.

:::info
Reembolsos não são processados dentro do B1. Se precisar reembolsar uma inscrição paga cancelada, emita o reembolso pelo painel do seu provedor de doações (por exemplo, Stripe).
:::

## Como funciona o pagamento

Os pagamentos passam pelo mesmo gateway de doações que a sua igreja já usa — os dados do cartão vão direto para o provedor e nunca passam pelos servidores do B1. Os preços são sempre calculados no servidor a partir dos seus tipos, opções e códigos de desconto configurados, de modo que um inscrito não consegue alterar o total. Membros logados podem pagar com um cartão salvo. Visitantes digitam um cartão no checkout e precisam marcar a caixa **Não sou um robô** antes de pagar.

### Igrejas sem doações online {#churches-without-online-giving}

Se a sua igreja não tiver um provedor de doações configurado, os eventos pagos ainda podem receber inscrições. A etapa de pagamento informa aos inscritos que o pagamento online não está disponível e que eles podem pagar diretamente à igreja, e um botão **Inscrever e pagar depois** salva a inscrição. Ela é salva como **pendente**, com o valor total como saldo devedor, e aparece na lista com um aviso de saldo. Cobre o valor da forma que a sua igreja normalmente faz.

:::info
O B1 não tem como marcar um pagamento offline como recebido. O saldo devedor permanece na lista e no cartão de [Minhas inscrições](../../b1-church/events/my-registrations.md) do inscrito depois que você cobrar, então mantenha seu próprio registro de quem pagou.
:::

## Artigos relacionados

- [Criando calendários](./creating-calendars.md#enabling-event-registration) — ative as inscrições e as configurações básicas
- [Configuração de doações online](../donations/online-giving-setup.md) — configure o gateway de pagamento usado no checkout
- [Inscrevendo-se em eventos](../../b1-church/events/registering.md) — o que os membros veem ao se inscrever
- [Minhas inscrições](../../b1-church/events/my-registrations.md) — como os membros pagam saldos e editam inscrições
