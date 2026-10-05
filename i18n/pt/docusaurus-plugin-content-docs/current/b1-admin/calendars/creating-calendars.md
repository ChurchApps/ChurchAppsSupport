---
title: "Criando Calendários"
---

# Criando Calendários

<div class="article-intro">

Criar um calendário em B1 Admin permite que você crie uma visualização selecionada de eventos conectando um ou mais grupos. Os eventos são gerenciados pelos líderes de grupo dentro de seus grupos, e seu calendário exibe esses eventos em um único lugar. Administradores com acesso de edição podem adicionar ou editar eventos para qualquer grupo. Líderes de grupo não-admin podem apenas gerenciar eventos para grupos que lideram.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- Configure os [grupos](../groups/creating-groups.md) cujos eventos você deseja incluir em seu calendário
- Você precisa de acesso administrativo à seção de Calendários em B1 Admin

</div>

## Criando um Novo Calendário

1. Em B1 Admin, abra o [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (a barra de pesquisa no canto superior esquerdo), expanda **Calendários** e clique em **Calendários**.
2. Clique em **Adicionar Calendário**.
3. Digite um **nome** para seu calendário (por exemplo, "Eventos do Ministério da Juventude" ou "Calendário Principal da Igreja").
4. Adicione uma **descrição** opcional para ajudar sua equipe a entender para que serve este calendário.
5. Clique em **Criar** para salvar seu novo calendário.

## A Página de Detalhes do Calendário

Após criar um calendário, clique nele para abrir a página de detalhes. Esta página tem duas áreas principais:

- **Coluna esquerda** -- Uma visualização do calendário mostrando eventos extraídos de grupos conectados.
- **Coluna direita** -- A lista de grupos associados. É aqui que você gerencia quais grupos estão incluídos neste calendário.

## Conectando Grupos

Grupos que têm eventos no calendário aparecem automaticamente na lista de grupos no lado direito da página de detalhes.

1. Clique em **Adicionar** na seção de grupos para associar um grupo ao seu calendário.
2. Selecione o grupo no menu suspenso.
3. Escolha se deseja incluir **todos os eventos** desse grupo ou apenas **eventos específicos**.
4. Clique em **Salvar**.

:::tip
Conectar grupos ao seu calendário é uma forma poderosa de agregar eventos automaticamente. Quando um líder de grupo adiciona um evento ao seu [grupo](../groups/creating-groups.md), ele pode fluir para o calendário de toda a sua igreja sem nenhum trabalho extra de sua parte.
:::

:::info
Se você deseja criar um único calendário que extrai eventos de muitos grupos em toda a sua igreja, veja [Curated Calendar](curated-calendar) para uma abordagem simplificada.
:::

## Habilitando Registro de Eventos

Você pode habilitar o registro para qualquer evento de calendário para que os membros possam se inscrever através do site B1 ou aplicativo móvel.

1. Clique em um evento existente ou crie um novo.
2. No editor de eventos, alterne **Registro** para habilitá-lo.
3. Configure as configurações de registro:
   - **Capacidade** (opcional) -- Defina um número máximo de registros. Deixe em branco para ilimitado.
   - **Registro Abre** -- A data e hora quando o registro fica disponível.
   - **Registro Fecha** -- A data e hora quando o registro se fecha.
   - **Tags** -- Rótulos separados por vírgula (ex: "juventude, retiro, vbs") para ajudar a categorizar eventos registráveis.
   - **Perguntas de Registro** -- Opcionalmente anexe um [formulário](../forms/creating-forms.md) para que os inscritos respondam perguntas extras (restrições dietéticas, tamanho de camiseta, contato de emergência, etc.) como parte da inscrição. Escolha **Nenhum** para pular perguntas.
   - **Habilitar Lista de Espera** -- Quando o evento se encher, deixe inscritos adicionais ingressarem em uma lista de espera em vez de serem rejeitados. Veja [Paid Registrations](paid-registrations#waitlist).
4. Salve o evento.

Para eventos pagos, a mesma página de configurações permite que você defina **Tipos de Participantes** com preço, **Seleções** opcionais (complementos), e **Códigos de Desconto**, com pagamento coletado através do provedor de doações de sua igreja. Veja [Paid Registrations](paid-registrations) para o passo a passo completo.

Assim que o registro for habilitado, os membros verão um botão **Registrar para este Evento** quando visualizarem o evento no [site B1](../../b1-church/events/registering) ou [aplicativo B1 Mobile](../../b1-mobile/events/registering). Se você anexou um formulário, os inscritos veem uma etapa **Perguntas** durante o registro e suas respostas são salvas com seu registro.

:::info
Perguntas de Registro só funciona com formulários que **não** são marcados como Restritos. Um formulário restrito é ignorado automaticamente durante o registro em vez de ser mostrado, então use um formulário irrestrito ao anexar perguntas a um evento.
:::

### Gerenciando Registros

Para visualizar e gerenciar registros para seus eventos:

1. No menu Jump, escolha **Calendários > Registros**.
2. Você verá uma tabela de todos os eventos com registro habilitado, mostrando o título do evento, data, contagem de registro atual vs. capacidade, e tags.
3. Clique em um evento para ver a lista completa de registros, incluindo nomes, contagem de membros, tipos de participantes, status de pagamento, e data de registro.
4. Na página de detalhes, você pode:
   - **Adicionar Participante** -- Registrar manualmente alguém que se inscreveu offline ou por telefone.
   - **Cancelar** registros individuais
   - **Excluir** registros permanentemente
   - **Promover** registros em lista de espera quando um lugar se abre
   - **Exportar CSV** -- Baixar todos os registros, incluindo tipos de participantes, seleções, quantidades de pagamento, e respostas de perguntas

Se o evento tiver Perguntas de Registro anexadas, a página de detalhes também mostra um filtro **Apenas perguntas não respondidas** para encontrar rapidamente inscritos que ainda não enviaram respostas, e um botão **Ver Respostas** em cada registro respondido para ver suas respostas. Eventos pagos adicionam uma coluna **Tipo**, uma coluna **Pago / Total**, contagens por tipo, e um diálogo de detalhes de pagamentos -- veja [Paid Registrations](paid-registrations#the-registration-roster).

:::tip
Use a barra de progresso de capacidade para monitorar com que rapidez os eventos estão se enchendo. A barra fica vermelha quando um evento está em ou acima da capacidade.
:::

## Próximas Etapas

- [Curated Calendar](curated-calendar) -- Crie um calendário que extrai de múltiplos grupos
- [Paid Registrations](paid-registrations) -- Tipos de participantes, seleções de complementos, códigos de desconto, pagamentos e listas de espera
- [Event Registration Guide](../guides/event-registration) -- Guia passo a passo para configurar registro de eventos
- [Calendars Overview](./) -- Volte à visão geral de calendários
