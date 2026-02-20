---
title: "Importar dados"
---

# Importar dados

<div class="article-intro">

O B1 Admin facilita a importação dos dados de membros existentes para o sistema. Seja migrando de outra plataforma de gestão de igreja ou carregando registros de uma planilha, as ferramentas de importação evitam que você insira manualmente cada pessoa. Você pode importar de um arquivo CSV ou migrar diretamente do Breeze ChMS.

</div>

<div class="prereqs">
<h4>Antes de começar</h4>

- Você precisa de uma conta B1 Admin ativa com acesso às **Configurações**. Consulte [Funções e permissões](roles-permissions.md) se não tiver certeza sobre seu nível de acesso.
- Tenha seus dados de membros prontos em uma planilha ou exportados do seu sistema anterior.
- Se você está migrando do Breeze, certifique-se de ter exportado os arquivos People, Tags e Contributions do Breeze primeiro.

</div>

## Importando de CSV

Se você tem dados de membros em uma planilha ou outro sistema, pode importá-los usando um arquivo CSV (valores separados por vírgula).

1. Vá para **Configurações** na barra lateral esquerda.
2. Clique em **Importar/Exportar** na navegação superior.
3. Selecione **B1 Import Zip** no menu suspenso **Fonte de dados**.
4. Clique no link para **baixar arquivos de exemplo** para ver o formato esperado.
5. Abra o arquivo de exemplo `people.csv` e substitua os dados de exemplo pelos seus. Mantenha a linha de cabeçalho intacta.
6. Se você tem fotos de membros, adicione-as à pasta usando imagens de 400x300px, nomeando-as para corresponder aos números `importKey` no seu CSV.
7. Comprima seus arquivos editados em um arquivo zip.
8. De volta ao B1 Admin, clique em **Enviar** e selecione seu arquivo zip.
9. Revise a prévia dos dados e clique em **Continuar para destino**.
10. Verifique se **B1 Database** está selecionado, revise o resumo da importação e clique em **Iniciar transferência**.
11. Aguarde a conclusão da importação e clique em **Ir para B1** para retornar ao seu painel.

:::tip
Sempre baixe e revise os arquivos de exemplo primeiro. Seguir o formato de colunas esperado evitará erros de importação.
:::

:::warning
A importação de dados adicionará novos registros ao seu banco de dados. Se você importar o mesmo arquivo duas vezes, poderá acabar com entradas duplicadas. Verifique seu arquivo antes de iniciar a transferência.
:::

## Importando do Breeze ChMS

Se você está migrando do Breeze, o B1 tem uma opção de importação dedicada que lida com a conversão automaticamente.

1. No Breeze, vá para **Configurações** e clique em **Exportar** na barra lateral esquerda.
2. Exporte três arquivos: **People**, **Tags** e **Contributions**.
3. Selecione os três arquivos exportados, clique com o botão direito e comprima-os em um único arquivo zip.
4. No B1 Admin, vá para **Configurações** e depois **Importar/Exportar**.
5. Selecione **Breeze Import Zip** no menu suspenso **Fonte de dados**.
6. Envie seu arquivo zip e siga as etapas na tela para revisar e concluir a importação.

:::info
A importação do Breeze transfere pessoas, fotos, grupos, doações, presença, formulários e mais -- proporcionando uma migração completa em uma única etapa.
:::

## Após a importação

Após a conclusão da importação, reserve alguns minutos para verificar seus dados:

1. Navegue pela página [Pessoas](../people/adding-people.md) e verifique alguns perfis aleatoriamente.
2. Confirme que nomes, e-mails, números de telefone e endereços foram importados corretamente.
3. Verifique se as conexões familiares estão intactas.
4. Revise quaisquer [grupos](../groups/creating-groups.md) ou tags que foram importados.

Se notar problemas, você pode editar perfis individuais diretamente da página Pessoas. Você também pode [exportar seus dados](exporting-data.md) a qualquer momento para criar um backup.
