---
title: "Guia: Configurar o Check-In do Ministério Infantil"
---

# Configurar o Check-In do Ministério Infantil

<div class="article-intro">

Este guia orienta você em tudo o que é necessário para colocar em funcionamento um sistema de check-in infantil na sua igreja — desde inserir famílias no banco de dados, até configurar grupos apropriados por idade, até imprimir etiquetas de identificação no domingo de manhã. No final, os pais poderão fazer o check-in dos filhos em um tablet quiosque e receber uma etiqueta de segurança correspondente.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- Crie a conta da sua igreja em [admin.b1.church](https://admin.b1.church)
- Certifique-se de ter acesso de administrador — consulte [Funções e Permissões](../people/roles-permissions.md) se necessário
- Opcional: Prepare um arquivo CSV de famílias se estiver migrando de outro sistema

</div>

## Passo 1: Adicione Famílias ao Seu Banco de Dados

Antes que o check-in possa funcionar, o sistema precisa conhecer suas famílias. Cada criança precisa estar vinculada a um pai/mãe através do recurso de núcleo familiar.

Siga o guia [Adicionando Pessoas](../people/adding-people.md) para adicionar pelo menos uma família. Certifique-se de:

- Adicionar o(s) pai(s)/mãe(s) primeiro
- Adicionar cada criança
- Vinculá-los no mesmo núcleo familiar usando o [editor de núcleo familiar](../people/adding-people.md#managing-households)

:::tip
Se você tiver mais do que algumas famílias para adicionar, use a ferramenta de [Importação CSV](../people/importing-data.md) em vez de adicioná-las uma por uma. Você pode importar todo o seu diretório em minutos.
:::

## Passo 2: Crie Grupos Infantis

Os grupos definem as classes nas quais as crianças fazem check-in. Normalmente, você vai querer um grupo por faixa etária.

Siga o guia [Criando Grupos](../groups/creating-groups.md) para criar grupos como:

- **Berçário** (idades 0–2)
- **Pré-escola** (idades 3–5)
- **Ensino Fundamental** (idades 6–10)

Você pode ajustar os nomes e faixas etárias para corresponder à estrutura do seu ministério.

## Passo 3: Configure Campus e Cultos

O check-in está vinculado a horários de culto específicos. Você precisa de pelo menos um campus e um culto configurados.

Siga o guia [Configuração de Presença](../attendance/setup.md) para:

1. Adicionar seu campus (ex.: "Campus Principal")
2. Adicionar um culto (ex.: "Culto de Domingo pela Manhã")
3. Definir o horário do culto (ex.: "9:00")
4. Atribuir seus grupos infantis ao culto

## Passo 4: Configure o Aplicativo de Check-In

Agora conecte tudo instalando o aplicativo de check-in em um tablet.

1. Instale o aplicativo **B1 Checkin** — consulte o artigo [Check-In](../attendance/check-in.md) para links de download
2. Faça login com suas credenciais do B1 Admin
3. Selecione seu campus e horário de culto

Consulte o artigo completo [Check-In](../attendance/check-in.md) para etapas detalhadas de configuração.

## Passo 5: Obtenha Seu Hardware

Você precisa de um tablet para o quiosque e opcionalmente uma impressora de etiquetas Brother para as etiquetas de identificação.

No mínimo:
- **Um tablet Android ou Amazon Fire** — veja [tablets recomendados](../attendance/check-in.md#recommended-hardware)
- **Uma impressora de etiquetas Brother** — a QL-1110NWB é recomendada pelo suporte a Bluetooth e WiFi
- **Etiquetas Brother DK-1201** (1-1/7" x 3-1/2")

:::warning
Apenas impressoras de etiquetas Brother são compatíveis com o aplicativo B1 Checkin. Outras marcas de impressoras não funcionarão.
:::

## Passo 6: Faça um Check-In de Teste

Antes do domingo de manhã, faça um teste:

1. Abra o aplicativo B1 Checkin no seu tablet
2. Selecione seu campus e o horário de culto correto
3. Pesquise por uma das famílias que você adicionou
4. Faça o check-in de uma criança e verifique:
   - A presença aparece no B1 Admin em **Presença**
   - Se estiver usando uma impressora, a etiqueta de identificação é impressa corretamente

:::tip
Treine os voluntários da sua equipe de recepção sobre o processo de check-in antes do lançamento. Uma breve explicação de 5 minutos geralmente é suficiente.
:::

## Pronto!

O check-in do seu ministério infantil está pronto. Os pais podem pesquisar sua família, selecionar seus filhos e fazer o check-in no quiosque. A presença é registrada automaticamente no B1 Admin.

## Artigos Relacionados

- [Adicionando Pessoas](../people/adding-people.md) — adicione mais famílias conforme visitam
- [Criando Grupos](../groups/creating-groups.md) — gerencie seus grupos infantis
- [Configuração de Presença](../attendance/setup.md) — configure campus e cultos
- [Check-In](../attendance/check-in.md) — configuração detalhada do aplicativo de check-in e hardware
- [Acompanhamento de Presença](../attendance/tracking-attendance.md) — visualize relatórios de check-in
