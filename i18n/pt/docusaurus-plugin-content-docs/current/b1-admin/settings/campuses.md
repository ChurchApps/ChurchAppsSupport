---
title: "Campus"
description: "Configure os campus no B1 Admin para acompanhar a qual unidade cada pessoa e grupo pertence e, depois, filtrar pessoas, presença e demografia por localização."
---

# Campus

<div class="article-intro">

Se a sua igreja se reúne em mais de um local, os **Campus** permitem acompanhar a qual unidade cada pessoa e cada grupo pertence. Depois de configurados, os campus aparecem como opção nos perfis de pessoas, na configuração de presença e no painel de Demografia. Igrejas com várias unidades podem filtrar, pesquisar e gerar relatórios por campus em todo o B1 Admin.

</div>

<div class="prereqs">
<h4>Antes de começar</h4>

- Você precisa da permissão **Editar configurações da igreja** para gerenciar os campus. Veja [Funções e permissões](./roles-permissions.md).

</div>

## Abrindo as configurações de campus {#opening-campus-settings}

No B1 Admin, abra o [Menu de atalhos](../introduction.md#getting-around-with-the-jump-menu) (a barra de busca no canto superior esquerdo), escolha **Configurações > Configurações** e clique em **Campus** na lista à esquerda para rolar até a seção **Campus**. Você também pode ir diretamente para **/settings/campuses**. Você verá uma lista de todos os campus configurados, com nome, localização e fuso horário.

## Adicionando um campus {#adding-a-campus}

1. Clique em **Adicionar campus**.
2. Preencha os dados do campus:
   - **Nome** *(obrigatório)* — o nome de exibição usado em todo o B1 Admin (por exemplo, "Campus central" ou "Campus norte").
   - **Endereço** e **Complemento do endereço** — o endereço do campus (usado apenas para exibição informativa; não é o mesmo que o endereço principal da sua igreja nas Configurações da igreja).
   - **Cidade / Estado / CEP** — a localização do campus.
   - **Fuso horário** — o fuso horário IANA deste campus (por exemplo, *America/Chicago*). Os [horários de check-in](../attendance/setup.md#setting-a-check-in-schedule) dos cultos deste campus abrem e fecham nesse fuso horário. Se estiver definido como **Nenhum**, é usado o [Fuso horário](./church-settings.md#time-zone) da sua igreja. Útil quando os campus estão em fusos horários diferentes.
   - **Site** — uma URL opcional para a presença web própria deste campus.
3. Clique em **Salvar**.

A lista mostra o **Nome**, a **Localização** (cidade e estado) e o **Fuso horário** de cada campus, e o item **Campus** na lista à esquerda mostra quantas unidades você tem.

## Editando um campus {#editing-a-campus}

Clique em qualquer linha de campus na lista para abrir o editor no painel à direita. Atualize os campos e clique em **Salvar**, ou em **Cancelar** para fechar o editor sem salvar.

## Excluindo um campus {#deleting-a-campus}

Abra um campus para edição e clique em **Excluir**. Você será solicitado a confirmar. Excluir um campus não remove as pessoas atribuídas a ele — o campo de campus delas simplesmente fica em branco.

## Atribuindo pessoas a um campus {#assigning-people-to-a-campus}

Depois de criar os campus, a equipe pode atribuir uma pessoa a um campus a partir do perfil dela:

1. Abra o cadastro de uma pessoa em **Pessoas**.
2. Clique em **Editar**.
3. Escolha o campus na lista suspensa **Campus**.
4. Clique em **Salvar**.

Você também pode atualizar o campus em massa na página Pessoas. Selecione várias pessoas, use **Edição em massa** e defina o campo Campus para todas de uma vez.

## Filtrando por campus {#filtering-by-campus}

Depois de configurar os campus, você pode filtrar por campus em todo o B1 Admin:

- **Busca de pessoas** — adicione uma condição de Campus na busca avançada, ou carregue uma [Lista salva](../people/lists.md) limitada a um campus.
- **Demografia** — o [painel de Demografia](../people/demographics.md) mostra um gráfico de rosca de Campus quando pelo menos uma pessoa tem um campus atribuído.
- **Configuração de presença** — cada horário de culto na Presença pode ser vinculado a um campus.

:::tip
Igrejas com um único local não precisam configurar campus. Todos os recursos de campus são opcionais — se nenhum campus existir, os campos e gráficos de campus simplesmente não aparecem.
:::

## Artigos relacionados {#related-articles}

- [Configurações da igreja](./church-settings.md) — o endereço principal da sua igreja e a identidade visual (separados dos endereços dos campus)
- [Demografia](../people/demographics.md) — o gráfico de distribuição por Campus
- [Configuração de presença](../attendance/setup.md) — vincule os horários de culto a um campus
- [Edição em massa](../people/bulk-editing.md) — atribua campus a muitas pessoas de uma vez
