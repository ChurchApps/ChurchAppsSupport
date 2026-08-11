---
title: "Campi"
---

# Campi

<div class="article-intro">

Se sua igreja se reúne em mais de um local, **Campi** permitem que você rastreie qual site cada pessoa e grupo pertence. Uma vez configurado, campi aparecem como uma opção em perfis de pessoa, na configuração de presença e no painel Dados Demográficos. Igrejas de múltiplos locais podem filtrar, pesquisar e relatar por campus em B1 Admin.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- Você precisa da permissão **Editar Configurações da Igreja** para gerenciar campi. Consulte [Funções e Permissões](./roles-permissions.md).

</div>

## Abrindo Configurações de Campus

No B1 Admin, abra o **menu de seção** no canto superior esquerdo (o nome da seção com a pequena seta), escolha **Configurações** e selecione **Campi** na navegação de Configurações. Você verá uma lista de todos os campi configurados com seu nome, local e fuso horário.

## Adicionando um Campus

1. Clique em **Adicionar Campus** (ou o botão **+** se nenhum campus existir ainda).
2. Preencha os detalhes do campus:
   - **Nome** *(obrigatório)* — o nome de exibição mostrado em B1 Admin (por exemplo, "Campus Principal" ou "Campus Norte").
   - **Endereço** — o endereço da rua do campus (usado para exibição informacional; não o mesmo que seu endereço principal da igreja em Configurações da Igreja).
   - **Cidade / Estado / CEP** — o local do campus.
   - **Fuso Horário** — o fuso horário IANA para este campus (por exemplo, *America/Chicago*). Útil quando campi estão em fusos horários diferentes.
   - **Website** — uma URL opcional para a própria presença na web deste campus.
3. Clique em **Salvar**.

## Editando um Campus

Clique em qualquer linha de campus na lista para abrir seu editor no painel à direita. Atualize os campos e clique em **Salvar**.

## Deletando um Campus

Abra um campus para edição e clique em **Deletar**. Você será solicitado a confirmar. Deletar um campus não remove as pessoas atribuídas a ele — seu campo de campus simplesmente fica em branco.

## Atribuindo Pessoas a um Campus

Depois de criar campi, a equipe pode atribuir uma pessoa a um campus de seu perfil:

1. Abra um registro de pessoa em **Pessoas**.
2. Clique em **Editar**.
3. Escolha o campus no menu suspenso **Campus**.
4. Clique em **Salvar**.

Você também pode atualizar campus em massa da página Pessoas. Selecione múltiplas pessoas, use **Edição em Massa** e defina o campo Campus para todos de uma vez.

## Filtrando por Campus

Depois que os campi estão configurados, você pode filtrar em B1 Admin por campus:

- **Busca de pessoas** — adicione uma condição de Campus na busca avançada ou carregue uma [Lista Salva](../people/lists.md) com escopo para um campus.
- **Dados Demográficos** — o [painel Dados Demográficos](../people/demographics.md) mostra um gráfico de rosca Campus quando pelo menos uma pessoa tem um campus atribuído.
- **Configuração de Presença** — cada horário de serviço em Presença pode ser vinculado a um campus.

:::tip
Igrejas de um único local não precisam configurar campi. Todos os recursos de campus são opcionais — se nenhum campus existir, campos de campus e gráficos simplesmente não aparecem.
:::

## Artigos Relacionados

- [Configurações da Igreja](./church-settings.md) — seu endereço principal da igreja e marca (separado de endereços de campus)
- [Dados Demográficos](../people/demographics.md) — o gráfico de detalhamento Campus
- [Configuração de Presença](../attendance/setup.md) — vincule horários de serviço a um campus
- [Edição em Massa](../people/bulk-editing.md) — atribua campus a muitas pessoas de uma vez
