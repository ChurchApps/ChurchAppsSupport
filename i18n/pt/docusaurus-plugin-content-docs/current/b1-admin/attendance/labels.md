---
title: "Designer de Etiquetas de Check-In"
---

# Designer de Etiquetas de Check-In

<div class="article-intro">

O Designer de Etiquetas permite que você crie e personalize os modelos de crachá de nome e aviso de busca que imprimem quando as famílias fazem check-in de suas crianças. Você pode controlar exatamente quais informações aparecem em cada etiqueta, onde ela é posicionada e como fica.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- Configure [Presença](setup) e configure pelo menos um horário de serviço com check-in habilitado
- Configure [Check-In](check-in) para que as etiquetas estejam imprimindo
- Você precisa de acesso administrativo à seção Presença

</div>

## Abrindo o Designer de Etiquetas

No B1 Admin, abra o [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (a barra de pesquisa no canto superior esquerdo), expanda **Celular**, e clique em **B1 CheckIn**. Então clique no botão **Design Labels** no card Check-in Labels. Você verá uma lista de seus modelos de etiqueta salvos, separados por tipo: **Crachá** e **Aviso de Busca**.

## Tipos de Etiqueta

- **Crachá** — impresso e anexado à criança. Normalmente inclui o nome da criança, sua sala de aula/sessão e um código de segurança.
- **Aviso de Busca** — entregue ao pai, mãe ou responsável. Normalmente inclui o código de segurança e uma lista das crianças que eles fizeram check-in.

O B1 começa com um modelo padrão de crachá e um modelo padrão de aviso de busca dimensionado para etiquetas térmicas padrão de 3,5 × 1,1 polegadas.

## Criando um Modelo de Etiqueta

1. Clique em **Adicionar** e escolha um ponto de partida do menu: **Crachá 3.5" x 1.1"**, **Aviso de Busca 3.5" x 1.1"**, ou **Em Branco**.
2. Um novo modelo se abre no editor de etiquetas.

### Editor de Etiquetas

O editor mostra uma visualização em escala da etiqueta no tamanho configurado. Ao longo do painel esquerdo você pode configurar:

- **Nome** — o nome do modelo (apenas para sua referência)
- **Tipo de Etiqueta** — Crachá ou Aviso de Busca
- **Largura / Altura** — tamanho da etiqueta em polegadas

### Adicionando Blocos

Uma etiqueta é construída a partir de blocos — peças individuais de conteúdo posicionadas na tela da etiqueta. Clique em **Adicionar Bloco** para inserir um novo bloco e escolha seu tipo:

- **Campo** — extrai um valor de dados no momento da impressão:
  - `person.displayName` — o nome completo da pessoa
  - `sessions` — o serviço/sala de aula para o qual eles fizeram check-in
  - `securityCode` — o código de segurança de busca gerado aleatoriamente
  - `children` — lista de crianças (para avisos de busca)
  - `person.nametagNotes` — quaisquer notas especiais no registro da pessoa
  - `person.isBirthdayWeek` — verdadeiro se o aniversário da pessoa (mês e dia) está dentro de 3 dias antes ou depois da data de check-in
  - `campus` — o nome do campus
- **Texto** — texto estático que você digita (para cabeçalhos, rótulos ou instruções)
- **Código de Barras** — um código de barras codificando o código de segurança

### Posicionando Blocos

Cada bloco tem campos **X**, **Y**, **Largura** e **Altura** expressos como porcentagens da tela da etiqueta (0–100). Ajuste-os para posicionar conteúdo com precisão. Você também pode definir:

- **Tamanho da Fonte** — tamanho do texto em pontos
- **Negrito** — alterne texto em negrito
- **Alinhar** — alinhamento de texto esquerdo, centro ou direito
- **Condição** — opcionalmente oculte o bloco se um campo estiver vazio (por exemplo, apenas mostre nametagNotes se tiver um valor). Isso também funciona com `person.isBirthdayWeek` para mostrar um gráfico ou texto de aniversário apenas em crachás para crianças cujo aniversário está dentro de poucos dias do check-in.

### Salvando

Clique em **Salvar** para salvar o modelo. O modelo atualizado será usado na próxima vez que as etiquetas forem impressas em B1 Checkin.

## Reordenando Modelos

Se você tiver múltiplos modelos de crachá ou aviso de busca, B1 Checkin usará o primeiro modelo da lista por padrão. Arraste os modelos para reordená-los.

## Deletando um Modelo

Clique no ícone de deletar em qualquer linha de modelo e confirme. Deletar o último modelo de um tipo restaura o modelo incorporado padrão.

:::tip
Faça uma impressão de teste depois de editar um modelo para confirmar que o layout fica certo antes de seu próximo serviço.
:::

## Artigos Relacionados

- [Configuração de Check-In](setup) — configure serviços e grupos para check-in
- [Completando Check-In](check-in) — o fluxo de check-in para famílias
- [B1 Checkin Introdução](../../b1-checkin/getting-started/) — o aplicativo de quiosque Checkin
