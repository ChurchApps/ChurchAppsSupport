---
title: "Entrada de Contagem de Frequência e Tendência"
---

# Entrada de Contagem de Frequência e Tendência

<div class="article-intro">

Contagens de frequência permitem registrar um número total simples de presença - para um serviço, um horário de serviço ou um grupo - sem registrar um rol nominativo. Use isto quando você apenas precisa "quantas pessoas estavam aqui" e combine com o relatório de Tendência de Contagem de Frequência para observar esse número ao longo do tempo.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- Seus campi, serviços e horários de serviço devem estar configurados. Consulte [Configuração de Presença](setup.md).
- Inserir uma contagem de frequência requer a permissão **Presença > Editar**; visualizar o relatório de tendência requer **Presença > Visualizar**. Consulte [Funções e Permissões](../settings/roles-permissions.md).

</div>

:::info
Contagens de frequência são uma alternativa somente de total para [Registrando Presença](recording-attendance.md). Se você precisa saber **quem** compareceu - por exemplo, para acompanhar pessoas que não voltaram - continue usando presença de sessão nominativa na aba Sessões de um grupo. Contagens de frequência armazenam apenas um número.
:::

## Registrando uma Contagem de Frequência

1. Abra **B1 Admin**, abra o **menu de seção** no canto superior esquerdo e escolha **Pessoas**, depois clique na aba **Presença**.
2. Selecione a sub-aba **Contagens de Frequência**.
3. Preencha o formulário:
   - **Serviço** *(obrigatório)*
   - **Horário do Serviço** -- deixe em branco para registrar um total em todos os horários de serviço
   - **Grupo** -- opcional; apenas grupos com Rastrear Presença habilitado são listados. Deixe em branco para "Nenhum grupo (serviço inteiro)."
   - **Data**
   - **Contagem de Frequência** -- o número total de pessoas presentes
4. Clique em **Salvar**.

A tabela **Contagens de Frequência Recentes** à direita lista suas últimas entradas com data, serviço, horário de serviço, grupo e contagem. Clique em uma linha para carregá-la de volta no formulário se precisar corrigi-la ou excluí-la.

## Relatório de Tendência de Contagem de Frequência

1. Na mesma aba **Presença**, selecione a sub-aba **Tendência de Contagem de Frequência**.
2. Use os filtros **Campus**, **Serviço**, **Horário do Serviço** e **Grupo** para refinar o relatório.

O relatório mostra suas contagens de frequência registradas somadas por semana, tanto como gráfico de linha quanto como tabela - o mesmo estilo de relatório usado pelas [abas de tendência de Presença e Grupos](tracking-attendance.md).

## Páginas Relacionadas

- [Registrando Presença](recording-attendance.md) -- presença de sessão nominativa por pessoa
- [Rastreando Presença](tracking-attendance.md) -- relatórios de tendência de presença e grupos
- [Configuração de Presença](setup.md) -- configurar campi, serviços e horários de serviço
