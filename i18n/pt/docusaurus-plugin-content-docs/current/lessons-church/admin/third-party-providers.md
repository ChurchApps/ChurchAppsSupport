---
title: "Provedores Externos"
description: "Adicione um feed de currículo no formato Open Lesson Format na página de Provedores Externos do Lessons.church e, depois, edite ou exclua-o para que sua igreja possa agendar as lições."
---

# Provedores Externos

<div class="article-intro">

O Lessons.church oferece suporte a provedores externos de currículo por meio do Open Lesson Format. Isso significa que sua igreja pode conectar currículos de outras organizações e agendá-los para suas classes ao lado da biblioteca integrada, para que sua equipe tenha currículos de várias fontes em um só lugar.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- Faça login no Lessons.church com uma conta que possa gerenciar as programações das classes da sua igreja
- Obtenha a URL do feed do provedor externo que você deseja conectar. Ela deve retornar lições no [Open Lesson Format](./open-lesson-format.md)

</div>

## Adicionando um Provedor

1. Clique em **External Providers** na navegação do Lessons.church. A página **External Lesson Providers** será aberta.
2. Clique em **Add Provider**. Se ainda não tiver adicionado nenhum, clique em **Add First Provider**.
3. Digite um **Provider Name**. Este é o nome que sua equipe verá ao escolher o provedor.
4. Digite a **API URL**. Este é o endereço onde o provedor publica seu currículo no Open Lesson Format.
5. Clique em **Save**.

O provedor é adicionado apenas para a sua igreja. Ele passa a aparecer como opção em **Provider** quando você [agenda uma lição](../classrooms/scheduling-lessons.md) para uma classe, e em **Source** quando você cria um [plano anual](./managing-year-plans.md).

## Gerenciando Provedores

A página **External Lesson Providers** lista todos os provedores que sua igreja adicionou. Para alterar um deles:

- **Editar** -- Clique no ícone **Edit provider** (lápis), altere o **Provider Name** ou a **API URL** e clique em **Save**.
- **Excluir** -- Clique no ícone **Edit provider**, depois clique no ícone de exclusão (lixeira) e confirme.

## O Que é o Open Lesson Format?

O Open Lesson Format é um esquema padronizado que descreve o conteúdo do currículo -- programas, estudos, lições, locais, seções e ações -- de forma estruturada. Qualquer organização que publique seu conteúdo nesse formato pode ser adicionada como provedor no Lessons.church.

Se você é um provedor de conteúdo interessado em disponibilizar seu currículo pelo Lessons.church, pode encontrar a documentação completa do esquema no guia [Open Lesson Format](./open-lesson-format.md).

## Por Que Usar Provedores Externos?

- **Mais opções para igrejas** -- As igrejas podem navegar por uma variedade maior de currículos sem sair da plataforma.
- **Um só lugar para tudo** -- Voluntários e coordenadores não precisam visitar vários sites para encontrar e agendar lições.
- **Configuração simples** -- Adicionar um provedor exige apenas um nome e uma URL de feed. Não há entrada manual de dados nem envio de arquivos.

:::info
O conteúdo de terceiros é gerenciado pelo provedor externo. Se você notar conteúdo ausente ou desatualizado de um provedor, o problema pode precisar ser resolvido do lado dele.
:::

:::tip
Para saber como são as lições de um provedor externo depois de agendadas, consulte [Provedores Externos](../browsing/external-providers.md) na seção Navegação.
:::
