---
title: "Designer de Etiquetas de Check-In"
---

# Designer de Etiquetas de Check-In

<div class="article-intro">

O Designer de Etiquetas permite criar e personalizar os modelos de etiqueta de nome e comprovante de retirada que imprimem quando as famílias fazem check-in de seus filhos. Você pode controlar exatamente quais informações aparecem em cada etiqueta, onde são posicionadas e como se parecem.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- Configure [Presença](setup) e configure pelo menos um horário de serviço com check-in ativado
- Configure [Check-In](check-in) para que as etiquetas estejam imprimindo
- Você precisa de acesso administrativo à seção Presença

</div>

## Abrindo o Designer de Etiquetas

No B1 Admin, clique no **menu de seção** no canto superior esquerdo (o nome da seção atual com a pequena seta ao lado dele) e escolha **Móvel**. Na barra de navegação, selecione **B1 CheckIn** e clique no botão **Projetar Etiquetas** no cartão Etiquetas de Check-in. Você verá uma lista de seus modelos de etiqueta salvos, separados por tipo: **Etiqueta de Nome** e **Comprovante de Retirada**.

## Tipos de Etiqueta

- **Etiqueta de Nome** — impressa e presa à criança. Normalmente inclui o nome da criança, sua sala de aula/sessão e um código de segurança.
- **Comprovante de Retirada** — dado ao pai ou responsável. Normalmente inclui o código de segurança e uma lista das crianças que fizeram check-in.

B1 começa com um modelo de etiqueta de nome padrão e um modelo de comprovante de retirada padrão dimensionado para etiquetas térmicas padrão de 3,5 × 1,1 polegadas.

## Criando um Modelo de Etiqueta

1. Clique em **Adicionar Etiqueta de Nome** ou **Adicionar Comprovante de Retirada** (ou use o menu suspenso para escolher).
2. Um novo modelo abre no editor de etiquetas.

### Editor de Etiquetas

O editor mostra uma visualização dimensionada da etiqueta no tamanho configurado. No painel esquerdo você pode configurar:

- **Nome** — o nome do modelo (apenas para sua referência)
- **Tipo de Etiqueta** — Etiqueta de Nome ou Comprovante de Retirada
- **Largura / Altura** — tamanho da etiqueta em polegadas

### Adicionando Blocos

Uma etiqueta é construída a partir de blocos — pedaços individuais de conteúdo posicionados na tela da etiqueta. Clique em **Adicionar Bloco** para inserir um novo bloco e escolha seu tipo:

- **Campo** — puxa um valor de dados no momento da impressão:
  - `person.displayName` — o nome completo da pessoa
  - `sessions` — o serviço/sala de aula para o qual fizeram check-in
  - `securityCode` — o código de segurança de retirada gerado aleatoriamente
  - `children` — lista de crianças (para comprovantes de retirada)
  - `person.nametagNotes` — quaisquer notas especiais no registro da pessoa
  - `campus` — o nome do campus
- **Texto** — texto estático que você digita (para títulos, rótulos ou instruções)
- **Código de Barras** — um código de barras codificando o código de segurança

### Posicionando Blocos

Cada bloco tem campos **X**, **Y**, **Largura** e **Altura** expressos como percentuais da tela da etiqueta (0–100). Ajuste-os para posicionar conteúdo com precisão. Você também pode definir:

- **Tamanho da Fonte** — tamanho do texto em pontos
- **Negrito** — alternar texto em negrito
- **Alinhar** — alinhamento do texto à esquerda, centro ou direita
- **Condição** — opcionalmente ocultar o bloco se um campo estiver vazio (por exemplo, mostrar apenas nametagNotes se tiver um valor)

### Salvando

Clique em **Salvar** para salvar o modelo. O modelo atualizado será usado na próxima vez que as etiquetas forem impressas no B1 Checkin.

## Reorganizando Modelos

Se você tiver vários modelos de etiqueta de nome ou comprovante de retirada, B1 Checkin usará o primeiro modelo na lista por padrão. Arraste os modelos para reorganizá-los.

## Deletando um Modelo

Clique no ícone de exclusão em qualquer linha de modelo e confirme. Deletar o último modelo de um tipo restaura o modelo incorporado padrão.

:::tip
Faça uma impressão de teste após editar um modelo para confirmar se o layout ficou correto antes do seu próximo serviço.
:::

## Artigos Relacionados

- [Configuração de Check-In](setup) — configure serviços e grupos para check-in
- [Completando Check-In](check-in) — o fluxo de check-in para famílias
- [Introdução ao B1 Checkin](../../b1-checkin/getting-started/) — o aplicativo quiosque Checkin
