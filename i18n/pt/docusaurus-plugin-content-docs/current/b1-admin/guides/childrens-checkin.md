---
title: "Guia: Configurando o Check-In do Ministério Infantil"
description: "Configure o check-in infantil no B1 Admin: vincule as famílias, crie grupos por faixa etária, configure os cultos e imprima crachás para o quiosque do B1 Checkin."
---

# Configurando o Check-In do Ministério Infantil

<div class="article-intro">

Este guia orienta você por tudo o que é necessário para colocar em funcionamento um sistema de check-in infantil na sua igreja -- desde o cadastro das famílias no banco de dados, passando pela configuração de grupos adequados a cada idade, até a impressão dos crachás no domingo de manhã. Ao final, os pais poderão fazer o check-in dos filhos em um tablet de quiosque e receber uma etiqueta de segurança correspondente.

</div>

## Vídeo de Treinamento {#training-video}

<YouTube id="Ep9CBUcJwPI" title="Configurando o Check-in Infantil no B1" next="Registrando e Acompanhando a Presença no B1" nextUrl="/docs/b1-admin/attendance/recording-attendance" />

<div class="prereqs">
<h4>Antes de Começar</h4>

- Crie a conta da sua igreja em [admin.b1.church](https://admin.b1.church)
- Certifique-se de que você tem acesso de administrador -- veja [Funções e Permissões](../people/roles-permissions.md), se necessário
- Opcional: prepare um arquivo CSV com as famílias, caso esteja migrando de outro sistema

</div>

## Passo 1: Adicione as Famílias ao Seu Banco de Dados {#step-1-add-families-to-your-database}

Antes que o check-in possa funcionar, o sistema precisa conhecer as suas famílias. Cada criança precisa estar vinculada a um dos pais por meio do recurso de domicílio.

Siga o guia [Adicionando Pessoas](../people/adding-people.md) para cadastrar pelo menos uma família. Certifique-se de:

- Cadastrar primeiro o(s) pai(s) ou mãe(s)
- Cadastrar cada criança
- Vinculá-los ao mesmo domicílio usando o [editor de domicílios](../people/adding-people.md#managing-households)

:::tip
Se você tiver mais de algumas poucas famílias para cadastrar, use a ferramenta de [Importação por CSV](../people/importing-data.md) em vez de adicioná-las uma a uma. Você pode importar todo o seu cadastro em poucos minutos.
:::

## Passo 2: Crie os Grupos Infantis {#step-2-create-childrens-groups}

Os grupos definem as turmas nas quais as crianças fazem o check-in. Normalmente, você vai querer um grupo para cada faixa etária.

Siga o guia [Criando Grupos](../groups/creating-groups.md) para criar grupos como:

- **Berçário** (de 0 a 2 anos)
- **Pré-escolar** (de 3 a 5 anos)
- **Fundamental** (de 6 a 10 anos)

Você pode ajustar os nomes e as faixas etárias para combinar com a estrutura do seu ministério. Depois, abra as configurações de cada grupo (clique em **Editar** na página do grupo) e:

- Defina **Controlar presença** como **Sim**, para que o grupo possa receber check-ins
- Ative **Imprimir crachá** (e **Retirada pelos pais**, se você imprimir etiquetas de retirada)
- Opcionalmente, defina os limites de **Idade e série**, para que o quiosque sugira a sala certa -- veja [Segurança no Check-In](../attendance/checkin-safety.md)

## Passo 3: Configure as Unidades e os Cultos {#step-3-configure-campuses-and-services}

O check-in está vinculado a horários de culto específicos. Você precisa de pelo menos uma unidade e um culto configurados.

Siga o guia [Configuração de Presença](../attendance/setup.md) para:

1. Acessar **Pessoas > Presença** e clicar em **Configuração**
2. Adicionar a sua unidade (por exemplo, "Unidade Central")
3. Adicionar um culto (por exemplo, "Culto da Manhã de Domingo")
4. Adicionar o horário de culto (por exemplo, "9:00") e, opcionalmente, um [horário de check-in](../attendance/setup.md#setting-a-check-in-schedule), para que o check-in abra automaticamente antes de cada culto e feche depois dele
5. Vincular cada grupo infantil ao horário de culto: abra o grupo, clique em **Editar**, escolha o horário em **Adicionar horário de culto** e clique no botão de mais

## Passo 4: Configure o Aplicativo de Check-In {#step-4-set-up-the-check-in-app}

Agora conecte tudo instalando o aplicativo de check-in em um tablet.

1. Instale o **aplicativo B1 Checkin** -- veja o artigo [Check-In](../attendance/check-in.md) para os links de download
2. Entre com uma conta que tenha a permissão de presença **Checkin** (ou **Editar Presença**) -- veja [Contas de Quiosque para Check-In](../settings/roles-permissions.md#check-in-kiosk-accounts)
3. Selecione a sua unidade e o seu horário de culto

Veja o artigo completo [Check-In](../attendance/check-in.md) para as etapas detalhadas de configuração.

## Passo 5: Providencie o Seu Hardware {#step-5-get-your-hardware}

Você precisa de um tablet para o quiosque e, opcionalmente, de uma impressora de etiquetas Brother para os crachás.

No mínimo:
- **Um tablet iPad, Android ou Amazon Fire** -- veja os [tablets recomendados](../attendance/check-in.md#recommended-hardware)
- **Uma impressora de etiquetas Brother** -- a QL-1110NWB é recomendada pelo suporte a Bluetooth e Wi-Fi
- **Etiquetas Brother DK-1201** (1-1/7" x 3-1/2")

:::warning
Somente impressoras de etiquetas Brother são compatíveis com o aplicativo B1 Checkin. Outras marcas não funcionarão.
:::

## Passo 6: Faça um Check-In de Teste {#step-6-run-a-test-check-in}

Antes do domingo de manhã, faça um teste:

1. Abra o aplicativo B1 Checkin no seu tablet
2. Selecione a sua unidade e o horário de culto correto
3. Pesquise uma das famílias que você cadastrou
4. Faça o check-in de uma criança e verifique:
   - Se a presença aparece no B1 Admin, em **Pessoas > Presença**
   - Se estiver usando uma impressora, se o crachá é impresso corretamente

:::tip
Treine os voluntários da equipe de recepção no processo de check-in antes do lançamento. Uma apresentação rápida de 5 minutos costuma ser suficiente.
:::

## Pronto! {#youre-done}

O check-in do seu ministério infantil está pronto. Os pais podem pesquisar a sua família, selecionar os filhos e fazer o check-in no quiosque. A presença é registrada automaticamente no B1 Admin.

## Artigos Relacionados {#related-articles}

- [Adicionando Pessoas](../people/adding-people.md) — adicione mais famílias conforme elas visitarem a igreja
- [Criando Grupos](../groups/creating-groups.md) — gerencie os grupos infantis
- [Configuração de Presença](../attendance/setup.md) — configure as unidades e os cultos
- [Check-In](../attendance/check-in.md) — configuração detalhada do aplicativo de check-in e do hardware
- [Acompanhamento de Presença](../attendance/tracking-attendance.md) — veja os relatórios de check-in
