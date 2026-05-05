---
title: "Criando Calendários"
---

# Criando Calendários

<div class="article-intro">

Criar um calendário no B1 Admin permite construir uma visualização curada de eventos conectando um ou mais grupos. Os eventos são gerenciados pelos líderes de grupo dentro de seus grupos, e seu calendário exibe esses eventos em um só lugar. Mesmo um administrador de domínio não pode adicionar ou editar eventos diretamente na seção de calendário, a menos que seja líder do grupo ao qual os eventos pertencem.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- Configure os [grupos](../groups/creating-groups.md) cujos eventos você deseja incluir em seu calendário
- Você precisa de acesso administrativo à seção Calendários no B1 Admin

</div>

## Criando um Novo Calendário

1. No B1 Admin, navegue até **Website** e depois até a seção **Calendars**.
2. Clique em **Add Calendar**.
3. Insira um **nome** para o seu calendário (por exemplo, "Eventos do Ministério de Jovens" ou "Calendário Principal da Igreja").
4. Adicione uma **descrição** opcional para ajudar sua equipe a entender para que serve este calendário.
5. Clique em **Create** para salvar seu novo calendário.

## A Página de Detalhes do Calendário

Depois de criar um calendário, clique nele para abrir a página de detalhes. Esta página tem duas áreas principais:

- **Coluna esquerda** -- Uma visualização do calendário mostrando eventos extraídos dos grupos conectados.
- **Coluna direita** -- A lista de grupos associados. É aqui que você gerencia quais grupos estão incluídos neste calendário.

## Conectando Grupos

Grupos que possuem eventos no calendário aparecem automaticamente na lista de grupos no lado direito da página de detalhes.

1. Clique em **Add** na seção de grupos para associar um grupo ao seu calendário.
2. Selecione o grupo no menu suspenso.
3. Escolha se deseja incluir **todos os eventos** desse grupo ou apenas **eventos específicos**.
4. Clique em **Save**.

:::tip
Conectar grupos ao seu calendário é uma maneira poderosa de agregar eventos automaticamente. Quando um líder de grupo adiciona um evento ao seu [grupo](../groups/creating-groups.md), ele pode fluir para o calendário de toda a igreja sem nenhum trabalho extra de sua parte.
:::

:::info
Se você deseja criar um único calendário que extrai eventos de vários grupos em sua igreja, consulte [Curated Calendar](curated-calendar) para uma abordagem simplificada.
:::

## Habilitando Registro de Eventos

Você pode habilitar o registro para qualquer evento do calendário para que os membros possam se inscrever através do site B1 ou aplicativo móvel.

1. Clique em um evento existente ou crie um novo.
2. No editor de eventos, ative **Registration** para habilitá-lo.
3. Configure as definições de registro:
   - **Capacity** (opcional) -- Defina um número máximo de registros. Deixe em branco para ilimitado.
   - **Registration Opens** -- A data e hora em que o registro fica disponível.
   - **Registration Closes** -- A data e hora em que o registro fecha.
   - **Tags** -- Etiquetas separadas por vírgulas (por exemplo, "jovens, retiro, ebd") para ajudar a categorizar eventos registráveis.
4. Salve o evento.

Uma vez que o registro esteja habilitado, os membros verão um botão **Register for this Event** quando visualizarem o evento no [site B1](../../b1-church/events/registering) ou [aplicativo B1 Mobile](../../b1-mobile/events/registering).

### Gerenciando Registros

Para visualizar e gerenciar registros para seus eventos:

1. Navegue até a página **Registrations** no B1 Admin.
2. Você verá uma tabela de todos os eventos com registro habilitado, mostrando o título do evento, data, contagem atual de registros vs. capacidade e tags.
3. Clique em um evento para ver a lista completa de registros, incluindo nomes, contagem de membros, status e data de registro.
4. Na página de detalhes, você pode:
   - **Cancelar** registros individuais
   - **Excluir** registros permanentemente
   - **Exportar** todos os registros para CSV

:::tip
Use a barra de progresso de capacidade para monitorar com que rapidez os eventos estão sendo preenchidos. A barra fica vermelha quando um evento está em capacidade máxima ou acima dela.
:::

## Próximos Passos

- [Curated Calendar](curated-calendar) -- Crie um calendário que extrai de vários grupos
- [Event Registration Guide](../guides/event-registration) -- Guia passo a passo para configurar o registro de eventos
- [Calendars Overview](./) -- Retornar à visão geral de calendários
