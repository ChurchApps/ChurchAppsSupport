---
title: "Importando dados"
---

# Importando dados

<div class="article-intro">

A ferramenta B1 Transfer facilita trazer os seus dados existentes para o B1, seja você começando do zero a partir de uma planilha, migrando de outra plataforma de gestão de igrejas ou importando registros de doações. Ela também pode ser usada para exportar ou fazer backup dos seus dados a qualquer momento.

</div>

## Vídeo de treinamento

<YouTube id="G-VnhzACYIU" title="Importing Your People Database in B1" next="Searching People and Building Lists in B1" nextUrl="/docs/b1-admin/people/searching-people" />

<div class="prereqs">
<h4>Antes de começar</h4>

- Você precisa de uma conta ativa no B1 Admin com acesso às **Configurações**.
- Tenha os seus dados exportados e prontos do sistema anterior antes de começar.
- Esta ferramenta foi feita para a migração inicial de dados. Se você já usa o B1 há algum tempo, importar novamente pode criar registros duplicados.

</div>

## Acessando a ferramenta de transferência

1. Entre no **B1 Admin**.
2. Abra o [menu de atalhos](../introduction.md#getting-around-with-the-jump-menu) (a barra de pesquisa no canto superior esquerdo), expanda **Configurações** e clique em **Configurações**.
3. Clique no link **Importar/Exportar** abaixo do nome da sua igreja, no topo do menu de configurações à esquerda.
4. Isso abrirá a ferramenta **B1 Transfer** em uma nova aba, em [transfer.b1.church](https://transfer.b1.church).

A ferramenta de transferência guia você por quatro etapas: Origem, Pré-visualização, Destino e Execução.

---

## Etapa 1 - Escolha a origem

Selecione de onde vêm os seus dados. Há sete opções:

- **Banco de dados do B1** — Puxa os dados diretamente da sua igreja no B1. Útil para fazer um backup ou converter os seus dados para outro formato. Você precisa estar conectado para usar esta opção.
- **Arquivo ZIP do B1** — Um arquivo zip no formato próprio do B1. É usado principalmente para restaurar uma exportação anterior do B1. Carregar um Arquivo ZIP de Exportação do B1 de volta no **Banco de dados do B1** restaura tudo o que a exportação contém (veja [Exportando dados](./exporting-data.md#full-data-export-from-settings)). Se o arquivo não puder ser lido, a ferramenta mostra o erro em vez de começar do zero.
- **Arquivo ZIP do Breeze** — Um arquivo zip com arquivos exportados do Breeze ChMS.
- **Arquivo ZIP do Planning Center** — Um arquivo zip ou CSV exportado do Planning Center.
- **CSV / Excel personalizado** — Qualquer arquivo CSV ou Excel com dados de pessoas. Depois do envio, você mapeará as suas colunas para os campos do B1 antes de a importação prosseguir.
- **CSV do Tithe.ly** — Um arquivo de exportação de pessoas ou de doações do Tithe.ly (aceita os formatos CSV ou Excel).
- **CSV do CCB / Pushpay** — Uma exportação CSV de pessoas ou de doações do Church Community Builder ou do Pushpay.

Você pode arrastar e soltar o seu arquivo na área de envio ou clicar para procurá-lo.

---

## Etapa 1b - Mapeie os seus campos (somente CSV / Excel personalizado)

Se você selecionou **CSV / Excel personalizado**, depois de enviar o seu arquivo a ferramenta mostrará uma tela de mapeamento de campos antes de avançar para a pré-visualização.

Cada coluna do seu arquivo aparece ao lado de um valor de exemplo. Para cada coluna, use a lista suspensa para escolher o campo correspondente do B1. A ferramenta detecta automaticamente nomes de colunas comuns como "First Name", "Email" ou "Zip Code", mas você deve revisar todas as linhas e corrigir o que ela não tiver identificado.

Os campos disponíveis do B1 incluem:

- Nome, Sobrenome, Nome do meio, Apelido, Nome de exibição, Título/Prefixo, Sufixo
- E-mail, Telefone residencial, Celular, Telefone comercial
- Endereço linha 1, Endereço linha 2, Cidade, Estado, CEP
- Data de nascimento, Aniversário de casamento, Gênero, Estado civil, Situação de membro
- Nome do domicílio/família
- Nome do grupo — atribui a pessoa a um grupo pelo nome
- **Campo personalizado (correspondência pelo nome)** — salva a coluna em um dos [campos personalizados de pessoas](../settings/custom-fields.md) da sua igreja. Aparece uma caixa **Nome do campo no B1**, preenchida com o cabeçalho da coluna. Altere-a para o nome do campo exatamente como aparece no B1 (maiúsculas e minúsculas não importam).
- **Resposta de formulário (campo personalizado)** — salva o valor dessa coluna como um campo personalizado vinculado ao registro da pessoa. Se você usar esta opção, será solicitado um nome para o formulário.

Datas podem estar em formatos comuns como `9/17/1994` e são convertidas automaticamente. Para campos personalizados, campos Sim/Não aceitam valores como Sim, Não, Y, N, True, False, 1 e 0, e campos de múltipla escolha aceitam o texto da opção ou o seu valor.

:::info
Crie os seus campos personalizados de pessoas no B1 Admin antes de importar. Quando a importação terminar, a etapa **Campos personalizados** lista quaisquer nomes de colunas que não correspondam a um campo do B1 e conta quaisquer valores que não se encaixem no tipo do campo. Esses valores são ignorados, e o restante da importação é concluído normalmente.
:::

Colunas que você não quer importar podem ser definidas como **(Ignorar)**. Pelo menos um campo de nome (Nome ou Sobrenome) precisa estar mapeado antes de você continuar.

Clique em **Confirmar mapeamento e importar** para avançar para a pré-visualização.

---

## Etapa 2 - Pré-visualize os seus dados

Depois do envio, a ferramenta mostra uma pré-visualização de tudo o que será importado. Use as abas para revisar cada tipo de dado:

- **Pessoas** — Listadas por domicílio, com fotos, se incluídas.
- **Grupos** — Organizados por campus, culto, horário e categoria.
- **Presença** — Datas das sessões, grupos e contagem de visitas.
- **Doações** — Lotes, fundos, doadores e valores.
- **Formulários** — Nomes e tipos de conteúdo dos formulários.

Revise com cuidado antes de prosseguir. Se algo parecer errado, clique em **Recomeçar** e corrija o seu arquivo de origem.

---

## Etapa 3 - Escolha o destino

Selecione para onde você quer enviar os dados:

- **Banco de dados do B1** — Importa diretamente para o banco de dados da sua igreja no B1. Depois de selecionar esta opção, a ferramenta mostrará a contagem final de registros a serem adicionados. Clique em **Iniciar transferência** para confirmar.
- **Arquivo ZIP de exportação do B1** — Baixa os seus dados como um arquivo zip no formato do B1, que pode ser restaurado depois com o **Arquivo ZIP do B1**. Bom para backups.
- **Arquivo ZIP de exportação do Breeze** — Converte os seus dados para o formato do Breeze.
- **Arquivo ZIP de exportação do Planning Center** — Converte os seus dados para o formato do Planning Center.

:::warning
A origem e o destino não podem ser o mesmo formato. Se forem iguais, a ferramenta avisará para evitar duplicação acidental.
:::

---

## Etapa 4 - Execução

A ferramenta processa a transferência e mostra o progresso de cada etapa:

- Campi, Cultos e Horários
- Pessoas
- Fotos
- Grupos e Membros de Grupos
- Doações
- Presença
- Formulários, Perguntas, Respostas e Envios de Formulários
- Campos personalizados (quando você mapeou colunas de Campo personalizado)
- Compactação (somente para destinos de arquivo zip)

Quando o destino é o **Banco de dados do B1**, o cartão de progresso se intitula **Progresso da importação** e termina com **Importação concluída!** (ou **Importação concluída com erros**). Para destinos de arquivo zip, as mesmas mensagens dizem **Exportação**.

:::info
Ao restaurar um **Arquivo ZIP do B1**, registros que apontam para algo que não está mais no arquivo são ignorados em vez de interromper a importação: participações em grupos de pessoas ou grupos que não estão no zip, presenças de grupos ou pessoas excluídos, e vínculos entre grupos e horários de culto excluídos. Sessões de presença que nunca foram associadas a um horário de culto ainda são restauradas. Da mesma forma, ao exportar, uma foto que não puder ser baixada ou lida fica de fora para que a etapa **Fotos** continue.
:::

:::warning
Não feche o navegador enquanto a transferência estiver em andamento. Aguarde até que todas as etapas apareçam como concluídas.
:::

---

## Preparando um arquivo ZIP de importação do Breeze

1. No Breeze, acesse **Configurações** e clique em **Exportar** no menu lateral esquerdo.
2. Exporte três arquivos separados: **Pessoas**, **Tags** e **Contribuições**.
3. Selecione os três arquivos, clique com o botão direito e compacte-os em um único arquivo zip.
   - No Mac: selecione os arquivos, clique com o botão direito e escolha **Comprimir**.
   - No PC: selecione os arquivos, clique com o botão direito, escolha **Enviar para** e depois **Pasta compactada (em zip)**.
4. Envie o arquivo zip usando a opção **Arquivo ZIP do Breeze** na Etapa 1.

A importação do Breeze transfere automaticamente pessoas, grupos (tags) e registros de doações.

---

## Preparando uma exportação do Planning Center

1. Entre no Planning Center e abra o produto **People**.
2. No menu lateral esquerdo, clique em **Lists** e crie uma lista que inclua todas as pessoas que você quer trazer. (Se você já tiver uma lista de toda a congregação, use essa.)
3. Abra a lista e use a opção **export** para baixar as pessoas como um arquivo **CSV**. Inclua os campos que você quer manter — nome, e-mail, telefone, endereço, data de nascimento, gênero e situação de membro são todos mapeados para o B1.
4. Se o Planning Center gerar mais de um arquivo, selecione todos, clique com o botão direito e compacte-os em um único zip.
   - No Mac: selecione os arquivos, clique com o botão direito e escolha **Comprimir**.
   - No PC: selecione os arquivos, clique com o botão direito, escolha **Enviar para** e depois **Pasta compactada (em zip)**.
5. Envie o CSV ou o zip usando a opção **Arquivo ZIP do Planning Center** na Etapa 1.

Depois do envio, continue até a pré-visualização e confirme se as suas pessoas e os seus domicílios estão corretos antes de executar a importação.

---

## Preparando uma exportação do Tithe.ly

1. No Tithe.ly, exporte os seus dados de **People** como um arquivo CSV ou Excel. Você também pode exportar um arquivo separado de **Giving** se quiser trazer registros de doações.
2. A ferramenta detectará automaticamente se o arquivo contém dados de pessoas ou de doações com base nos nomes das colunas.
3. Envie o arquivo usando a opção **CSV do Tithe.ly** na Etapa 1.

:::info
As exportações do Tithe.ly podem ser importadas um arquivo por vez. Execute o processo duas vezes se precisar importar pessoas e doações separadamente.
:::

---

## Preparando uma exportação do CCB ou do Pushpay

1. No Church Community Builder ou no Pushpay, exporte os seus dados de **People** como um arquivo CSV. Você também pode exportar um arquivo separado de doações/contribuições.
2. A ferramenta detectará automaticamente se o arquivo contém dados de pessoas ou de doações com base nos nomes das colunas.
3. Envie o arquivo usando a opção **CSV do CCB / Pushpay** na Etapa 1.

---

## Depois da importação

Quando a transferência terminar, reserve alguns minutos para verificar os seus dados:

1. Navegue pela página de [Pessoas](../people/adding-people.md) e confira alguns perfis aleatoriamente.
2. Confirme se nomes, e-mails, telefones e endereços foram importados corretamente.
3. Verifique se as conexões de domicílio estão intactas. O papel de cada pessoa no domicílio (Responsável, Cônjuge, Filho ou Outro) é mantido quando a origem o tem: a coluna **householdRole** em um Arquivo ZIP do B1, **Family Role** no Breeze ou no Tithe.ly, e **Family Position** no CCB / Pushpay. Papéis como "Head of Household", "Primary", "Wife" ou "Son" são convertidos para o papel correspondente do B1. As importações do Planning Center e de CSV / Excel personalizado não têm coluna de papel, então essas pessoas são definidas como **Outro**; você pode alterar um papel a partir do domicílio da pessoa na página de [Pessoas](../people/adding-people.md#managing-households).
4. Revise quaisquer grupos e registros de doações importados.

Se você notar problemas, pode editar perfis individuais na página de Pessoas. Você também pode executar a ferramenta de transferência novamente para [exportar os seus dados](exporting-data.md) como backup.
