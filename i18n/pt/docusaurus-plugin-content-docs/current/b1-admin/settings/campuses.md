---
title: "Campi"
---

# Campi

<div class="article-intro">

Se sua igreja se reúne em mais de um local, **Campi** permitem que você acompanhe qual site cada pessoa e grupo pertence. Uma vez configurados, os campi aparecem como uma opção nos perfis de pessoa, na configuração de frequência e no painel de Demografia. Igrejas multi-site podem filtrar, pesquisar e reportar por campus em todo o B1 Admin.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- Você precisa da permissão **Editar Configurações da Igreja** para gerenciar campi. Veja [Funções e Permissões](./roles-permissions.md).

</div>

## Abrindo Configurações de Campus

No B1 Admin, vá para **Configurações** na barra lateral esquerda e selecione **Campi** da navegação de Configurações. Você verá uma lista de todos os campi configurados com seu nome, local e fuso horário.

## Adicionando um Campus

1. Clique em **Adicionar Campus** (ou no botão **+** se nenhum campus existir ainda).
2. Preencha os detalhes do campus:
   - **Nome** *(obrigatório)* — o nome de exibição mostrado em todo o B1 Admin (por exemplo, "Campus Principal" ou "Campus Norte").
   - **Endereço** — o endereço da rua do campus (usado para exibição informacional; não é o mesmo que seu endereço principal da igreja em Configurações da Igreja).
   - **Cidade / Estado / CEP** — a localização do campus.
   - **Fuso Horário** — o fuso horário IANA para este campus (por exemplo, *America/Chicago*). Útil quando campi estão em diferentes fusos horários.
   - **Website** — uma URL opcional para a própria presença web deste campus.
3. Clique em **Salvar**.

## Editando um Campus

Clique em qualquer linha de campus na lista para abrir seu editor no painel à direita. Atualize os campos e clique em **Salvar**.

## Deletando um Campus

Abra um campus para edição e clique em **Deletar**. Você será solicitado a confirmar. Deletar um campus não remove as pessoas atribuídas a ele -- seu campo de campus simplesmente fica em branco.

## Atribuindo Pessoas a um Campus

Depois de criar campi, a equipe pode atribuir uma pessoa a um campus a partir de seu perfil:

1. Abra o registro de uma pessoa em **Pessoas**.
2. Clique em **Editar**.
3. Escolha o campus da lista suspensa **Campus**.
4. Clique em **Salvar**.

Você também pode atualizar campus em massa na página Pessoas. Selecione várias pessoas, use **Editar em Lote** e defina o campo Campus para todos de uma vez.

## Filtrando por Campus

Uma vez que os campi estão configurados, você pode filtrar em todo o B1 Admin por campus:

- **Busca de Pessoas** -- adicione uma condição de Campus na busca avançada ou carregue uma [Lista Salva](../people/lists.md) limitada a um campus.
- **Demografia** -- o [painel de Demografia](../people/demographics.md) mostra um gráfico de rosca de Campus quando pelo menos uma pessoa tem um campus atribuído.
- **Configuração de Frequência** -- cada horário de serviço em Frequência pode ser vinculado a um campus.

:::tip
Igrejas em um único local não precisam configurar campi. Todos os recursos de campus são opcionais -- se nenhum campus existe, os campos de campus e gráficos simplesmente não aparecem.
:::

## Artigos Relacionados

- [Configurações da Igreja](./church-settings.md) -- seu endereço principal da igreja e marca (separado dos endereços do campus)
- [Demografia](../people/demographics.md) -- o gráfico de divisão de Campus
- [Configuração de Frequência](../attendance/setup.md) -- vincule horários de serviço a um campus
- [Edição em Lote](../people/bulk-editing.md) -- atribua campus a muitas pessoas de uma vez
