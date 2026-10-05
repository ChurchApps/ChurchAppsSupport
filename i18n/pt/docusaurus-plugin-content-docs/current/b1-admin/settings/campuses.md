---
title: "Campi"
---

# Campi

<div class="article-intro">

Se sua igreja se reúne em mais de um local, **Campuses** (Campi) permitem que você acompanhe qual site cada pessoa e grupo pertence. Uma vez configurados, os campi aparecem como uma opção nos perfis de pessoas, na configuração de presença e no painel de Demografia. Igrejas multi-sites podem filtrar, pesquisar e relatar por campus em todo o B1 Admin.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- Você precisa da permissão **Edit Church Settings** (Editar Configurações da Igreja) para gerenciar campi. Consulte [Funções e Permissões](./roles-permissions.md).

</div>

## Abrindo Configurações de Campus

No B1 Admin, abra o [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (a barra de pesquisa no canto superior esquerdo), escolha **Settings > Settings** (Configurações > Configurações) e selecione o cartão **Campuses** (Campi). Você também pode ir diretamente para lá em **/settings/campuses**. Você verá uma lista de todos os campi configurados com seu nome, local e fuso horário.

## Adicionando um Campus

1. Clique em **Add Campus** (Adicionar Campus) (ou no botão **+** se nenhum campus existir ainda).
2. Preencha os detalhes do campus:
   - **Name** (Nome) *(required)* (obrigatório) — o nome de exibição mostrado em todo o B1 Admin (por exemplo, "Main Campus" (Campus Principal) ou "North Campus" (Campus Norte)).
   - **Address** (Endereço) — o endereço de rua do campus (usado para exibição informativa; não é o mesmo que seu endereço de igreja principal nas Configurações da Igreja).
   - **City / State / Zip** (Cidade / Estado / CEP) — o local do campus.
   - **Timezone** (Fuso Horário) — o fuso horário IANA para este campus (por exemplo, *America/Chicago*). Útil quando os campi estão em zonas horárias diferentes.
   - **Website** (Site) -- uma URL opcional para a própria presença na web deste campus.
3. Clique em **Save** (Salvar).

## Editando um Campus

Clique em qualquer linha de campus na lista para abrir seu editor no painel à direita. Atualize os campos e clique em **Save** (Salvar).

## Deletando um Campus

Abra um campus para edição e clique em **Delete** (Deletar). Você será solicitado a confirmar. A exclusão de um campus não remove as pessoas atribuídas a ele -- seu campo de campus simplesmente fica em branco.

## Atribuindo Pessoas a um Campus

Depois de criar os campi, a equipe pode atribuir uma pessoa a um campus a partir de seu perfil:

1. Abra o registro de uma pessoa em **People** (Pessoas).
2. Clique em **Edit** (Editar).
3. Escolha o campus no menu suspenso **Campus**.
4. Clique em **Save** (Salvar).

Você também pode atualizar o campus em massa a partir da página de Pessoas. Selecione várias pessoas, use **Bulk Edit** (Edição em Massa) e defina o campo Campus para todos de uma vez.

## Filtrando por Campus

Depois que os campi estão configurados, você pode filtrar em todo o B1 Admin por campus:

- **People search** (Pesquisa de Pessoas) -- adicione uma condição de Campus na pesquisa avançada ou carregue uma [Lista Salva](../people/lists.md) com escopo para um campus.
- **Demographics** (Demografia) -- o [painel de Demografia](../people/demographics.md) mostra um gráfico de rosca de Campus quando pelo menos uma pessoa tem um campus atribuído.
- **Attendance Setup** (Configuração de Presença) -- cada hora de serviço na Presença pode estar vinculada a um campus.

:::tip
Igrejas com localização única não precisam configurar campi. Todos os recursos de campus são opcionais -- se nenhum campus existir, os campos de campus e gráficos simplesmente não aparecem.
:::

## Artigos Relacionados

- [Church Settings](./church-settings.md) -- seu endereço de igreja principal e marca (separado dos endereços do campus)
- [Demographics](../people/demographics.md) -- o gráfico de divisão de Campus
- [Attendance Setup](../attendance/setup.md) -- vincule horários de serviço a um campus
- [Bulk Editing](../people/bulk-editing.md) -- atribua campus a muitas pessoas de uma vez
