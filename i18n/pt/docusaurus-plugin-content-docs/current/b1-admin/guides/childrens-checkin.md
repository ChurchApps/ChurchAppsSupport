---
title: "Guia: Configurar o Check-In do Ministério Infantil"
---

# Configurar o Check-In do Ministério Infantil

<div class="article-intro">

Este guia orienta você em tudo o que é necessário para colocar um sistema de check-in infantil em funcionamento na sua igreja -- desde o cadastro das famílias no banco de dados, passando pela configuração de grupos por faixa etária, até a impressão de crachás no domingo de manhã. Ao final, os pais poderão fazer o check-in dos filhos em um tablet de quiosque e receber uma etiqueta de segurança correspondente.

</div>

## Vídeo de Treinamento

<YouTube id="Ep9CBUcJwPI" title="Setting Up Children's Check-In in B1" next="Recording and Tracking Attendance in B1" nextUrl="/docs/b1-admin/attendance/recording-attendance" />

<div class="prereqs">
<h4>Antes de Começar</h4>

- Crie a conta da sua igreja em [admin.b1.church](https://admin.b1.church)
- Certifique-se de ter acesso de administrador -- consulte [Funções e Permissões](../people/roles-permissions.md), se necessário
- Opcional: prepare um arquivo CSV com as famílias, caso esteja migrando de outro sistema

</div>

## Passo 1: Adicione as Famílias ao Seu Banco de Dados

Antes que o check-in possa funcionar, o sistema precisa conhecer as suas famílias. Cada criança precisa estar vinculada a um dos pais por meio do recurso de família.

Siga o guia [Adicionando Pessoas](../people/adding-people.md) para cadastrar pelo menos uma família. Certifique-se de:

- Cadastrar primeiro o(s) responsável(is)
- Cadastrar cada criança
- Vinculá-los na mesma família usando o [editor de famílias](../people/adding-people.md#managing-households)

:::tip
Se você tem mais do que algumas famílias para cadastrar, use a ferramenta de [Importação CSV](../people/importing-data.md) em vez de adicioná-las uma a uma. Você pode importar todo o seu diretório em minutos.
:::

## Passo 2: Crie os Grupos Infantis

Os grupos definem as turmas nas quais as crianças fazem check-in. Normalmente, você vai querer um grupo por faixa etária.

Siga o guia [Criando Grupos](../groups/creating-groups.md) para criar grupos como:

- **Berçário** (0 a 2 anos)
- **Pré-escola** (3 a 5 anos)
- **Infantil** (6 a 10 anos)

Você pode ajustar os nomes e as faixas etárias para combinar com a estrutura do seu ministério.

## Passo 3: Configure Campi e Cultos

O check-in está vinculado a horários de serviço específicos. Você precisa de pelo menos um campus e um culto configurados.

Siga o guia [Configuração de Presença](../attendance/setup.md) para:

1. Adicionar o seu campus (por exemplo, "Campus Central")
2. Adicionar um culto (por exemplo, "Culto da Manhã de Domingo")
3. Definir o horário de serviço (por exemplo, "9h00") e, opcionalmente, uma [programação de check-in](../attendance/setup.md#setting-a-check-in-schedule) para que o check-in abra automaticamente antes de cada culto e feche depois dele
4. Atribuir os grupos infantis ao culto

## Passo 4: Configure o Aplicativo de Check-In

Agora, conecte tudo instalando o aplicativo de check-in em um tablet.

1. Instale o **aplicativo B1 Checkin** -- consulte o artigo [Check-In](../attendance/check-in.md) para ver os links de download
2. Entre com as suas credenciais do B1 Admin
3. Selecione o seu campus e o horário de serviço

Consulte o artigo completo de [Check-In](../attendance/check-in.md) para as etapas detalhadas de configuração.

## Passo 5: Providencie o Hardware

Você precisa de um tablet para o quiosque e, opcionalmente, de uma impressora de etiquetas Brother para os crachás.

No mínimo:
- **Um tablet Android ou Amazon Fire** -- consulte os [tablets recomendados](../attendance/check-in.md#recommended-hardware)
- **Uma impressora de etiquetas Brother** -- a QL-1110NWB é recomendada pelo suporte a Bluetooth e Wi-Fi
- **Etiquetas Brother DK-1201** (1-1/7" x 3-1/2")

:::warning
Somente impressoras de etiquetas Brother são compatíveis com o aplicativo B1 Checkin. Outras marcas não funcionarão.
:::

## Passo 6: Faça um Teste de Check-In

Antes do domingo de manhã, faça um teste:

1. Abra o aplicativo B1 Checkin no seu tablet
2. Selecione o seu campus e o horário de serviço correto
3. Pesquise uma das famílias que você cadastrou
4. Faça o check-in de uma criança e verifique:
   - A presença aparece no B1 Admin, em **Presença**
   - Se estiver usando uma impressora, um crachá é impresso corretamente

:::tip
Treine os voluntários da equipe de boas-vindas no processo de check-in antes do lançamento. Uma apresentação rápida de 5 minutos costuma ser suficiente.
:::

## Pronto!

O check-in do seu ministério infantil está pronto. Os pais podem pesquisar a família, selecionar os filhos e fazer o check-in no quiosque. A presença é registrada automaticamente no B1 Admin.

## Artigos Relacionados

- [Adicionando Pessoas](../people/adding-people.md) -- adicione mais famílias conforme elas visitarem a igreja
- [Criando Grupos](../groups/creating-groups.md) -- gerencie os grupos das crianças
- [Configuração de Presença](../attendance/setup.md) -- configure campi e cultos
- [Check-In](../attendance/check-in.md) -- configuração detalhada do aplicativo de check-in e do hardware
- [Rastreamento de Presença](../attendance/tracking-attendance.md) -- veja os relatórios de check-in
