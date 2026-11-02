---
title: "Guia: Configurar o check-in do ministério infantil"
---

# Configurar o check-in do ministério infantil

<div class="article-intro">

Este guia orienta você em tudo o que é necessário para colocar um sistema de check-in infantil em funcionamento na sua igreja — desde cadastrar as famílias no banco de dados, até configurar grupos adequados a cada faixa etária e imprimir crachás no domingo de manhã. Ao final, os pais poderão fazer o check-in dos filhos em um tablet de quiosque e receber uma etiqueta de segurança correspondente.

</div>

## Vídeo de treinamento

<YouTube id="Ep9CBUcJwPI" title="Configurando o check-in infantil no B1" next="Registrando e acompanhando a presença no B1" nextUrl="/docs/b1-admin/attendance/recording-attendance" />

<div class="prereqs">
<h4>Antes de começar</h4>

- Crie a conta da sua igreja em [admin.b1.church](https://admin.b1.church)
- Certifique-se de ter acesso de administrador — veja [Funções e permissões](../people/roles-permissions.md) se necessário
- Opcional: prepare um arquivo CSV com as famílias, caso esteja migrando de outro sistema

</div>

## Etapa 1: Adicione as famílias ao seu banco de dados

Antes que o check-in possa funcionar, o sistema precisa conhecer as suas famílias. Cada criança precisa estar vinculada a um dos pais por meio do recurso de domicílio.

Siga o guia [Adicionando pessoas](../people/adding-people.md) para cadastrar pelo menos uma família. Certifique-se de:

- Cadastrar primeiro o(s) pai(s) ou mãe(s)
- Cadastrar cada filho
- Vinculá-los ao mesmo domicílio usando o [editor de domicílios](../people/adding-people.md#managing-households)

:::tip
Se você tiver mais do que algumas famílias para cadastrar, use a ferramenta de [importação por CSV](../people/importing-data.md) em vez de adicioná-las uma a uma. Você pode importar todo o seu diretório em minutos.
:::

## Etapa 2: Crie os grupos infantis

Os grupos definem as turmas em que as crianças fazem check-in. Normalmente, você vai querer um grupo por faixa etária.

Siga o guia [Criando grupos](../groups/creating-groups.md) para criar grupos como:

- **Berçário** (0 a 2 anos)
- **Pré-escola** (3 a 5 anos)
- **Ensino fundamental** (6 a 10 anos)

Você pode ajustar os nomes e as faixas etárias para combinar com a estrutura do seu ministério.

## Etapa 3: Configure campi e cultos

O check-in está vinculado a horários de culto específicos. Você precisa de pelo menos um campus e um culto configurados.

Siga o guia [Configuração de presença](../attendance/setup.md) para:

1. Adicionar o seu campus (por exemplo, "Campus Principal")
2. Adicionar um culto (por exemplo, "Domingo de manhã")
3. Definir o horário do culto (por exemplo, "9:00") e, opcionalmente, um [cronograma de check-in](../attendance/setup.md#setting-a-check-in-schedule) para que o check-in abra automaticamente antes de cada culto e feche depois dele
4. Vincular os grupos infantis ao culto

## Etapa 4: Configure o aplicativo de check-in

Agora conecte tudo instalando o aplicativo de check-in em um tablet.

1. Instale o **aplicativo B1 Checkin** — veja o artigo [Check-in](../attendance/check-in.md) para os links de download
2. Entre com suas credenciais do B1 Admin
3. Selecione o seu campus e o horário de culto

Veja o artigo completo sobre [Check-in](../attendance/check-in.md) para os passos detalhados de configuração.

## Etapa 5: Providencie o hardware

Você precisa de um tablet para o quiosque e, opcionalmente, de uma impressora de etiquetas Brother para os crachás.

No mínimo:
- **Um tablet Android ou Amazon Fire** — veja os [tablets recomendados](../attendance/check-in.md#recommended-hardware)
- **Uma impressora de etiquetas Brother** — a QL-1110NWB é recomendada pelo suporte a Bluetooth e Wi-Fi
- **Etiquetas Brother DK-1201** (1-1/7" x 3-1/2")

:::warning
Somente impressoras de etiquetas Brother são compatíveis com o aplicativo B1 Checkin. Outras marcas não funcionarão.
:::

## Etapa 6: Faça um check-in de teste

Antes do domingo de manhã, faça um teste:

1. Abra o aplicativo B1 Checkin no seu tablet
2. Selecione o seu campus e o horário de culto correto
3. Pesquise uma das famílias que você cadastrou
4. Faça o check-in de uma criança e verifique:
   - Se a presença aparece no B1 Admin, em **Presença**
   - Se estiver usando impressora, se o crachá é impresso corretamente

:::tip
Treine os voluntários da equipe de recepção no processo de check-in antes do lançamento. Uma apresentação rápida de 5 minutos costuma ser suficiente.
:::

## Pronto!

O check-in do seu ministério infantil está pronto. Os pais podem pesquisar a família, selecionar os filhos e fazer o check-in no quiosque. A presença é registrada automaticamente no B1 Admin.

## Artigos relacionados

- [Adicionando pessoas](../people/adding-people.md) — cadastre mais famílias conforme elas visitam a igreja
- [Criando grupos](../groups/creating-groups.md) — gerencie os grupos infantis
- [Configuração de presença](../attendance/setup.md) — configure campi e cultos
- [Check-in](../attendance/check-in.md) — configuração detalhada do aplicativo de check-in e do hardware
- [Acompanhando a presença](../attendance/tracking-attendance.md) — veja os relatórios de check-in
