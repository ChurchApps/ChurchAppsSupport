---
title: "Importando Dados"
---

# Importando Dados

<div class="article-intro">

A ferramenta B1 Transfer facilita trazer seus dados existentes para B1, quer você esteja começando do zero a partir de uma planilha, migrando de outra plataforma de gerenciamento de igrejas ou importando registros de doações. Ele também pode ser usado para exportar ou fazer backup de seus dados a qualquer momento.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- Você precisa de uma conta B1 Admin ativa com acesso às **Configurações**.
- Tenha seus dados exportados e prontos do seu sistema anterior antes de começar.
- Esta ferramenta é destinada à migração de dados inicial. Se você já vem usando B1 há um tempo, importar novamente pode criar registros duplicados.

</div>

## Acessando a Ferramenta de Transferência

1. Faça login no **B1 Admin**.
2. Abra o **menu de seção** no canto superior esquerdo (o nome da seção com a pequena seta) e escolha **Configurações**.
3. Clique no botão **Importar/Exportar** no canto superior direito do cabeçalho da página.
4. Isso abrirá a ferramenta **B1 Transfer** em uma nova aba em [transfer.b1.church](https://transfer.b1.church).

A ferramenta de transferência o guia por quatro etapas: Fonte, Visualização, Destino e Executar.

---

## Etapa 1 - Escolha Sua Fonte

Selecione de onde seus dados estão vindo. Existem sete opções:

- **Banco de Dados B1** — Puxa dados diretamente da sua igreja B1 existente. Útil para fazer uma cópia de segurança ou converter seus dados para outro formato. Você deve estar conectado para usar esta opção.
- **B1 Import Zip** — Um arquivo zip no formato próprio do B1. Isto é principalmente usado para restaurar uma exportação B1 anterior.
- **Breeze Import Zip** — Um arquivo zip contendo arquivos exportados do Breeze ChMS.
- **Planning Center Zip** — Um arquivo zip ou CSV exportado do Planning Center.
- **CSV Personalizado / Excel** — Qualquer arquivo CSV ou Excel contendo dados de pessoas. Após o upload, você mapeará suas colunas para campos B1 antes da importação continuar.
- **Tithe.ly CSV** — Um arquivo de pessoas ou doações exportado de Tithe.ly (formato CSV ou Excel aceito).
- **CCB / Pushpay CSV** — Um CSV de pessoas ou doações exportado do Church Community Builder ou Pushpay.

Você pode arrastar e soltar seu arquivo na área de upload ou clicar para procurar por ele.

---

## Etapa 1b - Mapear Seus Campos (Apenas CSV/Excel Personalizado)

Se você selecionou **CSV Personalizado / Excel**, após fazer upload do seu arquivo, a ferramenta mostrará uma tela de mapeamento de campo antes de passar para a visualização.

Cada coluna do seu arquivo é listada ao lado de um valor de amostra. Para cada coluna, use o menu suspenso para escolher o campo B1 correspondente. A ferramenta detectará automaticamente nomes de coluna comuns como "Nome", "Email" ou "Código Postal", mas você deve revisar cada linha e corrigir tudo que perdeu.

Os campos B1 disponíveis incluem:

- Nome, Sobrenome, Nome do Meio, Apelido, Nome de Exibição, Título/Prefixo, Sufixo
- Email, Telefone Residencial, Telefone Móvel, Telefone de Trabalho
- Endereço Linha 1, Endereço Linha 2, Cidade, Estado, Código Postal
- Data de Nascimento, Gênero, Estado Civil, Status de Associação
- Nome da Família
- Nome do Grupo — atribui a pessoa a um grupo por nome
- **Resposta do Formulário (campo personalizado)** — salva o valor dessa coluna como um campo personalizado anexado ao registro da pessoa. Se você usar esta opção, será solicitado que você dê um nome ao formulário.

Colunas que você não deseja importar podem ser definidas como **(Ignorar)**. Pelo menos um campo de nome (Nome ou Sobrenome) deve ser mapeado antes de você poder continuar.

Clique em **Confirmar Mapeamento e Importar** para prosseguir para a visualização.

---

## Etapa 2 - Visualize Seus Dados

Após fazer upload, a ferramenta exibe uma visualização de tudo que será importado. Use as abas para revisar cada tipo de dados:

- **Pessoas** — Listadas por família, com fotos se incluídas.
- **Grupos** — Organizados por campus, serviço, hora e categoria.
- **Presença** — Datas de sessão, grupos e contagens de visitas.
- **Doações** — Lotes, fundos, doadores e valores.
- **Formulários** — Nomes de formulários e tipos de conteúdo.

Revise isto cuidadosamente antes de prosseguir. Se algo parecer errado, clique em **Começar Novamente** e corrija seu arquivo de origem.

---

## Etapa 3 - Escolha Seu Destino

Selecione para onde você quer que os dados vão:

- **Banco de Dados B1** — Importa diretamente para o banco de dados B1 da sua igreja. Após selecionar isso, a ferramenta mostrará uma contagem final de registros a serem adicionados. Clique em **Iniciar Transferência** para confirmar.
- **B1 Export Zip** — Baixa seus dados como um arquivo zip no formato B1. Bom para cópias de segurança.
- **Breeze Export Zip** — Converte seus dados para formato Breeze.
- **Planning Center Zip** — Converte seus dados para formato Planning Center.

:::warning
A fonte e o destino não podem ser do mesmo formato. Se eles corresponderem, a ferramenta o avisará para evitar duplicação acidental.
:::

---

## Etapa 4 - Executar

A ferramenta processa a transferência e mostra progresso para cada etapa:

- Campi, Serviços e Horários
- Pessoas
- Fotos
- Grupos e Membros do Grupo
- Doações
- Presença
- Formulários, Perguntas, Respostas e Envios de Formulários
- Compactação (apenas para destinos de arquivo zip)

:::warning
Não feche seu navegador enquanto a transferência está em execução. Aguarde até que todas as etapas apareçam como completas.
:::

---

## Preparando um Breeze Import Zip

1. No Breeze, vá para **Configurações** e clique em **Exportar** na barra lateral esquerda.
2. Exporte três arquivos separados: **Pessoas**, **Tags** e **Contribuições**.
3. Selecione todos os três arquivos, clique com o botão direito e compacte-os em um único arquivo zip.
   - Em um Mac: selecione os arquivos, clique com o botão direito e escolha **Compactar**.
   - Em um PC: selecione os arquivos, clique com o botão direito, escolha **Enviar para**, depois **Pasta compactada (zipada)**.
4. Upload do arquivo zip usando a opção **Breeze Import Zip** na Etapa 1.

A importação de Breeze transfere pessoas, grupos (tags) e registros de doação automaticamente.

---

## Preparando uma Exportação do Planning Center

1. No Planning Center, exporte seus dados de pessoas como arquivo CSV ou zip.
2. Upload usando a opção **Planning Center Zip** na Etapa 1.

---

## Preparando uma Exportação de Tithe.ly

1. No Tithe.ly, exporte seus dados de **Pessoas** como arquivo CSV ou Excel. Você também pode exportar um arquivo **Doações** separado se quiser trazer registros de doações.
2. A ferramenta detectará automaticamente se o arquivo contém dados de pessoas ou doações com base nos nomes das colunas.
3. Upload do arquivo usando a opção **Tithe.ly CSV** na Etapa 1.

:::info
Exportações Tithe.ly podem ser importadas um arquivo por vez. Execute o processo duas vezes se você precisar importar registros de pessoas e doações separadamente.
:::

---

## Preparando uma Exportação de CCB ou Pushpay

1. No Church Community Builder ou Pushpay, exporte seus dados de **Pessoas** como arquivo CSV. Você também pode exportar um arquivo separado de doações/contribuições.
2. A ferramenta detectará automaticamente se o arquivo contém dados de pessoas ou doações com base nos nomes das colunas.
3. Upload do arquivo usando a opção **CCB / Pushpay CSV** na Etapa 1.

---

## Após Importar

Depois que a transferência for concluída, tire alguns minutos para verificar seus dados:

1. Navegue pela página [Pessoas](../people/adding-people.md) e verifique alguns perfis.
2. Confirme que nomes, emails, números de telefone e endereços vieram através corretamente.
3. Verifique que as conexões familiares estão intactas.
4. Revise quaisquer grupos importados e registros de doação.

Se você notar problemas, você pode editar perfis individuais na página Pessoas. Você também pode executar a ferramenta de transferência novamente para [exportar seus dados](exporting-data.md) como uma cópia de segurança.
