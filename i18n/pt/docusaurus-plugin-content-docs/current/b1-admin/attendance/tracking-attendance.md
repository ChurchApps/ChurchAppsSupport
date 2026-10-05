---
title: "Rastreando Presença"
---

# Rastreando Presença

<div class="article-intro">

Uma vez que seus campi, horários de serviço e grupos estão configurados, o B1 Admin facilita revisar dados de presença e perceber tendências. A página Presença fornece duas visualizações de relatório -- a aba **Tendência de Presença** para tendências de toda a igreja e a aba **Presença do Grupo** para detalhe no nível de grupo. Use essas ferramentas para entender padrões de crescimento, identificar engajamento em declínio, e fazer decisões baseadas em dados para sua igreja.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- Sua estrutura de presença deve estar configurada com pelo menos um campus e horário de serviço. Veja [Configuração de Presença](setup.md) se você ainda não fez isso.
- Dados de presença precisam ser registrados antes que relatórios mostrem resultados. Os dados podem vir de [entrada manual](recording-attendance.md) ou [check-in automático](check-in.md).

</div>

## Visualizando Tendências de Presença

1. Abra **B1 Admin**, abra o [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (a barra de pesquisa no canto superior esquerdo), expanda **Pessoas**, e clique em **Presença**.
2. Clique na aba **Tendência de Presença**.
3. O relatório é executado automaticamente quando a aba abre, mostrando presença total para cada semana.

## Filtrando Seus Dados

Use os filtros na caixa **Filtrar Relatório** para estreitar os resultados, depois clique em **Executar Relatório**:

- **Campus** -- selecione um campus para ver presença apenas para aquela localização.
- **Serviço** -- limite o relatório a um serviço.
- **Horário do Serviço** -- escolha um horário de serviço para detalhar uma reunião específica.
- **Grupo** -- mostre presença para um único grupo.
- **Data de Início** e **Data de Fim** -- o intervalo de datas a incluir. Por padrão o relatório cobre o ano passado, de um ano atrás até hoje, e a data de fim é incluída completamente.

O relatório mostra um gráfico de barras e uma tabela de visitas totais por semana. Cada semana é rotulada com a data do domingo daquela semana. A tabela também tem uma coluna **Datas de Sessão** listando as datas reais naquela semana que tiveram presença (por exemplo, "27/9, 30/9"), para que você possa ver quando uma reunião de midweek é contada na mesma semana que domingo.

:::info
Relatórios executam automaticamente cada vez que você abre a aba Tendência de Presença, para que você sempre veja números atualizados sem precisar clicar um botão de atualização.
:::

## Presença do Grupo

A aba **Presença do Grupo** mostra quem compareceu a cada sessão de grupo. Isso é útil quando você quer monitorar uma classe específica, equipe de ministério, ou pequeno grupo em vez de olhar números de serviço geral.

1. Selecione a aba **Presença do Grupo**.
2. Opcionalmente escolha um **Campus** e **Serviço**.
3. Defina a **Data de Início** e **Data de Fim**. Por padrão o relatório cobre domingo passado até hoje.
4. Clique em **Executar Relatório**.

Os resultados são agrupados por data de sessão, depois por horário de serviço e grupo, com as pessoas que compareceram listadas sob cada grupo. Horários de serviço, grupos e nomes são ordenados alfabeticamente para que cada cabeçalho aparece uma vez. A linha de cada pessoa também mostra uma coluna **Verificado** com o tempo em que sua presença foi registrada (em branco quando nenhum tempo está no arquivo) e uma coluna **Status de Membro** (por exemplo, Membro ou Visitante), para que você possa perceber hóspedes num relance.

Para baixar os dados, clique em **Opções de Download** e escolha **Resumo**. O CSV tem uma linha por membro do grupo, ordenado por grupo e depois nome, e uma coluna para cada sessão datada no intervalo (por exemplo, "Domingo - 9:00 AM (27/09/2026)") marcada **presente** ou **ausente**.

:::tip
A presença do grupo é especialmente valiosa para líderes de [pequeno grupo](../groups/creating-groups.md) que querem rastrear engajamento dentro de seu grupo ao longo do tempo.
:::

## Dicas para Usar Dados de Presença

- Revise tendências mensalmente para pegar padrões sazonais cedo.
- Compare dados no nível de campus para entender quais localizações estão crescendo.
- Use relatórios no nível de grupo para acompanhar [grupos](../groups/group-members.md) que mostram presença em declínio.
- Combine insights de presença com a ferramenta [Busca AI](../people/ai-search.md) para encontrar pessoas que não compareceram recentemente.

## Páginas Relacionadas

- [Registrando Presença](recording-attendance.md) -- registre manualmente presença para uma sessão de grupo
- [Entrada de Contagem de Presentes e Tendência](headcount-entry.md) -- uma alternativa de contagem total mais simples, com seu próprio gráfico de tendência semanal
- [Check-In](check-in.md) -- configure check-in automático para que a presença seja registrada automaticamente
