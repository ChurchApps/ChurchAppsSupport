---
title: "Criando Calendários"
---

# Criando Calendários

<div class="article-intro">

Criar um calendário no B1 Admin permite que você crie uma visualização selecionada de eventos conectando um ou mais grupos. Os eventos são gerenciados pelos líderes dos grupos dentro de seus grupos, e seu calendário exibe esses eventos em um único lugar. Nem mesmo um administrador de domínio pode adicionar ou editar eventos diretamente na seção de calendário, a menos que seja líder do grupo ao qual os eventos pertencem.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- Configure os [grupos](../groups/creating-groups.md) cujos eventos você deseja incluir em seu calendário
- Você precisa de acesso administrativo à seção Calendários no B1 Admin

</div>

## Criando um Novo Calendário

1. No B1 Admin, navegue até **Site**, depois para a seção **Calendários**.
2. Clique em **Adicionar Calendário**.
3. Digite um **nome** para seu calendário (por exemplo, "Eventos do Ministério da Juventude" ou "Calendário Principal da Igreja").
4. Adicione uma **descrição** opcional para ajudar sua equipe a entender para que serve este calendário.
5. Clique em **Criar** para salvar seu novo calendário.

## A Página de Detalhe do Calendário

Depois de criar um calendário, clique nele para abrir a página de detalhe. Esta página tem duas áreas principais:

- **Coluna esquerda** -- Uma visualização do calendário mostrando eventos extraídos de grupos conectados.
- **Coluna direita** -- A lista de grupos associados. É aqui que você gerencia quais grupos estão incluídos neste calendário.

## Conectando Grupos

Os grupos que possuem eventos no calendário aparecem automaticamente na lista de grupos no lado direito da página de detalhe.

1. Clique em **Adicionar** na seção de grupos para associar um grupo ao seu calendário.
2. Selecione o grupo no menu suspenso.
3. Escolha se deseja incluir **todos os eventos** desse grupo ou apenas **eventos específicos**.
4. Clique em **Salvar**.

:::tip
Conectar grupos ao seu calendário é uma forma poderosa de agregar eventos automaticamente. Quando um líder do grupo adiciona um evento ao seu [grupo](../groups/creating-groups.md), ele pode fluir para o calendário de toda a igreja sem nenhum trabalho extra da sua parte.
:::

:::info
Se você deseja criar um único calendário que agregue eventos de muitos grupos em sua igreja, consulte [Calendário Selecionado](curated-calendar) para uma abordagem simplificada.
:::

## Habilitando Registro de Eventos

Você pode habilitar o registro para qualquer evento do calendário para que os membros possam se inscrever através do site B1 ou do aplicativo móvel.

1. Clique em um evento existente ou crie um novo.
2. No editor de eventos, alterne **Registro** para habilitá-lo.
3. Configure as configurações de registro:
   - **Capacidade** (opcional) -- Defina um número máximo de registros. Deixe em branco para ilimitado.
   - **Registro Abre** -- A data e hora em que o registro fica disponível.
   - **Registro Fecha** -- A data e hora em que o registro fecha.
   - **Tags** -- Rótulos separados por vírgula (por exemplo, "juventude, retiro, vbs") para ajudar a categorizar eventos registráveis.
   - **Perguntas de Registro** -- Opcionalmente, anexe um [formulário](../forms/creating-forms.md) para que os registrantes respondam perguntas extras (restrições dietéticas, tamanho da camiseta, contato de emergência, etc.) como parte do registro. Escolha **Nenhum** para pular perguntas.
   - **Habilitar Lista de Espera** -- Quando o evento ficar cheio, permita que registrantes adicionais entrem em uma lista de espera em vez de serem rejeitados. Consulte [Registros Pagos](paid-registrations#waitlist).
4. Salve o evento.

Para eventos pagos, a mesma página de configurações permite que você defina **Tipos de Participante** com preço, **Seleções** opcionais (complementos) e **Códigos de Desconto**, com pagamento coletado através do provedor de doações da sua igreja. Consulte [Registros Pagos](paid-registrations) para o guia completo.

Depois que o registro estiver habilitado, os membros verão um botão **Registre-se neste Evento** quando visualizarem o evento no [site B1](../../b1-church/events/registering) ou [aplicativo B1](../../b1-mobile/events/registering). Se você anexou um formulário, os registrantes verão uma etapa **Perguntas** durante o registro e suas respostas serão salvas com seu registro.

:::info
Perguntas de Registro funcionam apenas com formulários que **não** estão marcados como Restritos. Um formulário restrito é pulado automaticamente durante o registro em vez de ser mostrado, então use um formulário irrestrito ao anexar perguntas a um evento.
:::

### Gerenciando Registros

Para visualizar e gerenciar registros de seus eventos:

1. Navegue até a página **Registros** no B1 Admin.
2. Você verá uma tabela de todos os eventos com registro habilitado, mostrando o título do evento, data, contagem de registro atual versus capacidade e tags.
3. Clique em um evento para ver a lista completa de registros, incluindo nomes, contagem de membros, tipos de participante, status de pagamento e data de registro.
4. Na página de detalhe, você pode:
   - **Adicionar Participante** -- Registre manualmente alguém que se inscreveu offline ou por telefone.
   - **Cancelar** registros individuais
   - **Deletar** registros permanentemente
   - **Promover** registros na lista de espera quando um lugar se abre
   - **Exportar CSV** -- Baixe todos os registros, incluindo tipos de participante, seleções, valores de pagamento e respostas às perguntas

Se o evento tiver Perguntas de Registro anexadas, a página de detalhe também mostra um filtro **Apenas perguntas sem resposta** para encontrar rapidamente registrantes que ainda não enviaram respostas, e um botão **Ver Respostas** em cada registro respondido para ver suas respostas. Eventos pagos adicionam uma coluna **Tipo**, uma coluna **Pago / Total**, contagens por tipo e um diálogo de detalhes de pagamentos -- consulte [Registros Pagos](paid-registrations#the-registration-roster).

:::tip
Use a barra de progresso de capacidade para monitorar com que rapidez os eventos estão preenchendo. A barra fica vermelha quando um evento está na ou acima da capacidade.
:::

## Próximos Passos

- [Calendário Selecionado](curated-calendar) -- Crie um calendário que agregue de múltiplos grupos
- [Registros Pagos](paid-registrations) -- Tipos de participante, seleções de complementos, códigos de desconto, pagamentos e listas de espera
- [Guia de Registro de Eventos](../guides/event-registration) -- Guia passo a passo para configurar registro de eventos
- [Visão Geral de Calendários](./) -- Retornar à visão geral de calendários
