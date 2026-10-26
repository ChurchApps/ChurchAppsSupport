---
title: "Campus"
---

# Campus

<div class="article-intro">

Se a sua igreja se reúne em mais de um local, os **Campus** permitem acompanhar a qual unidade cada pessoa e cada grupo pertence. Depois de configurados, os campus aparecem como opção nos perfis de pessoas, na configuração de presença e no painel de Demografia. Igrejas com várias unidades podem filtrar, pesquisar e gerar relatórios por campus em todo o B1 Admin.

</div>

<div class="prereqs">
<h4>Antes de começar</h4>

- Você precisa da permissão **Editar Configurações da Igreja** para gerenciar campus. Veja [Funções e Permissões](./roles-permissions.md).

</div>

## Abrindo as configurações de campus

No B1 Admin, abra o [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (a barra de busca no canto superior esquerdo), escolha **Configurações > Configurações** e clique em **Campus** na lista à esquerda para rolar até a seção **Campus**. Você também pode ir direto para **/settings/campuses**. Você verá uma lista de todos os campus configurados, com nome, localização e fuso horário.

## Adicionando um campus

1. Clique em **Adicionar Campus**.
2. Preencha os dados do campus:
   - **Nome** *(obrigatório)*: o nome de exibição usado em todo o B1 Admin (por exemplo, "Campus Principal" ou "Campus Norte").
   - **Endereço**: o endereço da rua do campus (usado apenas para exibição informativa; não é o mesmo que o endereço principal da igreja nas Configurações da Igreja).
   - **Cidade / Estado / CEP**: a localização do campus.
   - **Fuso Horário**: o fuso horário IANA deste campus (por exemplo, *America/Sao_Paulo*). [Horários de check-in](../attendance/setup.md#setting-a-check-in-schedule) dos cultos deste campus abrem e fecham nesse fuso horário. Se estiver definido como **Nenhum**, é usado o [Fuso Horário](./church-settings.md#time-zone) da sua igreja. É útil quando os campus ficam em fusos horários diferentes.
   - **Site**: um URL opcional para a presença web própria deste campus.
3. Clique em **Salvar**.

## Editando um campus

Clique em qualquer linha de campus na lista para abrir o editor no painel à direita. Atualize os campos e clique em **Salvar**.

## Excluindo um campus

Abra um campus para edição e clique em **Excluir**. Você será solicitado a confirmar. Excluir um campus não remove as pessoas vinculadas a ele: o campo de campus delas simplesmente fica em branco.

## Atribuindo pessoas a um campus

Depois de criar os campus, a equipe pode atribuir uma pessoa a um campus a partir do perfil dela:

1. Abra o cadastro de uma pessoa em **Pessoas**.
2. Clique em **Editar**.
3. Escolha o campus na lista **Campus**.
4. Clique em **Salvar**.

Você também pode atualizar o campus em massa na página Pessoas. Selecione várias pessoas, use **Edição em Massa** e defina o campo Campus para todas de uma vez.

## Filtrando por campus

Depois que os campus estiverem configurados, você pode filtrar o B1 Admin por campus:

- **Busca de pessoas**: adicione uma condição de Campus na busca avançada ou carregue uma [Lista Salva](../people/lists.md) restrita a um campus.
- **Demografia**: o [painel de Demografia](../people/demographics.md) mostra um gráfico de rosca de Campus quando pelo menos uma pessoa tem um campus atribuído.
- **Configuração de Presença**: cada horário de culto na Presença pode ser vinculado a um campus.

:::tip
Igrejas com um único local não precisam configurar campus. Todos os recursos de campus são opcionais: se nenhum campus existir, os campos e gráficos de campus simplesmente não aparecem.
:::

## Artigos relacionados

- [Configurações da Igreja](./church-settings.md): o endereço principal da sua igreja e a identidade visual (separados dos endereços dos campus)
- [Demografia](../people/demographics.md): o gráfico de distribuição por Campus
- [Configuração de Presença](../attendance/setup.md): vincule horários de culto a um campus
- [Edição em Massa](../people/bulk-editing.md): atribua campus a muitas pessoas de uma vez
