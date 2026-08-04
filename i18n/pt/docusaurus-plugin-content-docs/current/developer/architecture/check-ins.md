---
title: "Registros de Entrada"
---

# Registros de Entrada

<div class="article-intro">

O check-in é um sistema com três portas de entrada: o aplicativo quiosque B1Checkin para estações com equipe e autoatendimento, self check-in dentro do portal de membros B1App, e presença do lado admin no B1Admin. Todos os três escrevem no mesmo módulo de presença no Api principal, e o roteamento de sala de aula é totalmente acionado por Grupos — não existe uma entidade "locais" ou "salas" separada. Uma camada de segurança infantil fica por cima: tipos de check-in por visita, portões de proporção de capacidade e voluntários no lado do servidor, elegibilidade de idade/série no lado do quiosque, verificação de retirada confiável no check-out, e página de responsável sobre o provedor de mensagens de texto da igreja. Esta página mapeia o modelo de dados, os fluxos de check-in, a camada de segurança e o pipeline de impressão de rótulos.

</div>

## Visão Geral

```
┌──────────────────────────┐
│ B1Checkin (Expo kiosk)   │──┐         ┌──────────────────────────────────────────────┐
│  lookup → household →    │  │         │ Api                                          │
│  groups → complete/print │  │  HTTPS  │  ┌─ membership module ─────────────────────┐ │
├──────────────────────────┤  ├───────▶ │  │ people · households · groups            │ │
│ B1App (self check-in)    │──┤         │  └─────────────────────────────────────────┘ │
│  /mobile/checkin screen  │  │         │  ┌─ attendance module ─────────────────────┐ │
├──────────────────────────┤  │         │  │ campuses → services → serviceTimes      │ │
│ B1Admin (staff)          │──┘         │  │ groupServiceTimes  (room routing)       │ │
│  setup · reports ·       │            │  │ sessions ← visitSessions → visits       │ │
│  label designer          │            │  │ labelTemplates                          │ │
└──────────────────────────┘            │  └─────────────────────────────────────────┘ │
                                        └──────────────────────────────────────────────┘

Label print path (kiosk only):
POST /attendance/visits/checkin ──▶ { securityCode, streaks }
  └▶ LabelHelper (label templates, or bundled HTML fallback)
       └▶ LabelRenderer → HTML doc + inline SVG barcodes
            └▶ PrintUI: WebView render → ViewShot JPG capture
                 └▶ printer-helper native module → Brother QL / Zebra
```

| Superfície | Repo | Stack | Papel |
|---------|------|-------|------|
| Quiosque | `B1Checkin` | Expo / React Native, roteamento de arquivo expo-router; construções EAS para Android, Amazon Fire e iOS; atualizações OTA via `expo-updates` | Estação com equipe ou autoatendimento com impressão de rótulos e check-out verificado |
| Self check-in | `B1App` | Next.js (portal de membros b1.church) | Membros conectados fazem o check-in de sua família a partir de um telefone; sem impressão |
| Admin | `B1Admin` | React SPA | Configura a estrutura de serviço, atribui grupos a horários de serviço, projeta rótulos, registra presença manual, executa relatórios |

Todos os três chamam os mesmos dois módulos API através de `ApiHelper`: **MembershipApi** (`/membership`) para pessoas, famílias e grupos; **AttendanceApi** (`/attendance`) para tudo abaixo.

## Modelo de dados (`Api/src/modules/attendance`)

| Entidade / tabela | Campos principais | Significado |
|----------------|-----------|---------|
| `campuses` | name, address | Descontinuado aqui — campi são dominados no módulo de associação (`/membership/campuses`); a cópia de presença fica congelada, somente leitura, para leitores legados (`models/Campus.ts`) |
| `services` | campusId, name | Uma reunião recorrente, por exemplo, "Domingo de Manhã" (`models/Service.ts`) |
| `serviceTimes` | serviceId, name | Um horário dentro de um serviço, por exemplo, "9:00 AM" (`models/ServiceTime.ts`) |
| `groupServiceTimes` | groupId, serviceTimeId | Tabela de junção: quais grupos (salas de aula) se reúnem em quais horários de serviço (`models/GroupServiceTime.ts`) |
| `sessions` | groupId, serviceTimeId, sessionDate | Uma reunião de um grupo em uma data — criada de forma preguiçosa no momento do check-in (`models/Session.ts`) |
| `visits` | personId, serviceId, visitDate, checkinTime, securityCode, checkinType, checkedInById, checkoutTime, checkedOutBy, checkedOutById | Uma pessoa presente em uma data (`models/Visit.ts`). `checkinType` é `member` / `guest` / `volunteer` (NULL = membro legado), definido pelo quiosque e consumido pelos portões de capacidade/proporção |
| `visitSessions` | visitId, sessionId | Qual(is) sessão(ões) uma visita cobre — uma criança registrada em dois horários de serviço recebe duas linhas (`models/VisitSession.ts`) |
| `labelTemplates` | name, labelType (`nametag`/`pickup`), width, height, isDefault, content (blocos JSON) | Layouts de rótulo personalizáveis (`models/LabelTemplate.ts`) |

### Como um check-in concluído é persistido

`VisitController.postCheckin` (`Api/src/modules/attendance/controllers/VisitController.ts`) trata `POST /attendance/visits/checkin?serviceId=&peopleIds=`. O corpo é um array de objetos `Visit`, cada um carregando `visitSessions` cuja `session` incorporada nomeia apenas um par `(serviceTimeId, groupId)`. O servidor então:

1. **Aplica portões de capacidade e proporção antes de qualquer escrita.** `evaluateGates()` → `CheckinGateHelper.evaluate()` verifica a capacidade de cada sala alvo, a capacidade de convidados, o sinalizador de fechado e a proporção de voluntários contra a ocupação atual. postCheckin **não é transacional**, então o portão precisa rodar antes da primeira gravação — uma violação grave retorna um 409 nomeando a(s) sala(s) infratora(s) e nada é persistido. Veja [Portões de capacidade e proporção de voluntários](#capacity-and-volunteer-ratio-gates).
2. **Resolve sessões de forma preguiçosa.** `getSessionId()` encontra ou cria a linha `sessions` para `(groupId, serviceTimeId, today)` — ids de sessão são armazenados em cache no processo por data. Novas sessões emitem um webhook `session.created`. O loop é um `for..of` aguardado — um `forEach(async …)` anterior de disparar-e-esquecer corria em paralelo com a gravação e escrevia sessionIds NULL na criação da primeira sessão (corrigido; anotado em um comentário de código no loop).
3. **Substitui os registros do dia.** Qualquer visita existente daquelas pessoas naquele serviço hoje é excluída junto com suas visitSessions, e então o conjunto enviado é salvo. Registrar novamente uma família é, portanto, uma operação idempotente "este é o estado atual", não uma adição. Passar `?checkDuplicates=true` em vez disso retorna `{ duplicates: [personId…] }` sem gravar, que é como o quiosque avisa antes de sobrescrever.
4. **Gera um código de segurança por lote.** `SecurityCodeHelper.generate()` produz um código de 4 caracteres a partir do alfabeto `23456789BCDFGHJKLMNPQRSTVWXYZ` (sem vogais nem caracteres ambíguos, para que os códigos não formem palavras nem sejam lidos incorretamente). O servidor tenta novamente em caso de colisão contra as visitas abertas do mesmo dia na mesma igreja e carimba o código em cada visita do lote.
5. **Retorna `{ streaks, securityCode }`.** `streaks` mapeia personId para a contagem de semanas consecutivas de presença; o quiosque celebra marcos (a cada 5ª semana) com confete.

Cada visita salva também emite um webhook `attendance.recorded`. O lado de leitura, `GET /attendance/visits/checkin`, retorna as visitas das pessoas a partir de sua **última data registrada** — se essa data foi em uma semana anterior, os ids são removidos, então o cliente recebe uma cópia pré-preenchida das seleções de sala da semana passada, que serão salvas como novos registros.

### Check-out

Dois pontos de extremidade completam o ciclo (`VisitController`):

- `GET /attendance/visits/code/:code` — visitas de hoje ainda não finalizadas que carregam esse código de segurança, com sessões preenchidas.
- `POST /attendance/visits/checkout` — corpo `{ visitIds, checkedOutBy?, checkedOutById? }`; carimba `checkoutTime` e quem retirou, e emite um webhook `attendance.checkout` por visita.

Permissões: os quiosques se autenticam com `attendance.checkin`, que concede exatamente a superfície de check-in/check-out/modelo de rótulo; `attendance.view`/`attendance.edit` cobrem relatórios e entrada manual; a estrutura (serviços, horários de serviço, atribuições de grupo) requer `services.edit`.

## Grupos direcionam o roteamento de salas

Não existe entidade de sala ou sala de aula em lugar nenhum do sistema. Uma "sala" é um **grupo** de associação com `trackAttendance` habilitado, vinculado a um ou mais horários de serviço através de `groupServiceTimes`. Os campos do grupo (em `Api/src/modules/membership/models/Group.ts`) que moldam o comportamento do quiosque:

| Campo | Efeito |
|------|--------|
| `trackAttendance` | O grupo participa da presença; a árvore de configuração do B1Admin sinaliza grupos `trackAttendance` sem linha `groupServiceTimes` como não atribuídos |
| `parentPickup` | Marca uma sala infantil: registrar-se nela torna a visita uma visita "infantil", que imprime um rótulo de retirada de família e coloca o código de segurança no crachá |
| `printNametag` | Se check-ins para este grupo imprimem um crachá |
| `capacity` / `guestCapacity` / `checkinClosed` | Limites de capacidade de sala e um interruptor "fechado" rígido, aplicados no servidor pelo portão de check-in (editado nas configurações de grupo do B1Admin em "Capacidade de Check-In") |
| `volunteerRatio` / `minVolunteers` | Proporção de crianças por voluntário e contagem mínima de voluntários, aplicada de acordo com a configuração `ratioEnforcement` de toda a igreja |
| `minAgeMonths` / `maxAgeMonths` / `minGrade` / `maxGrade` | Limites de elegibilidade de idade/série avaliados no lado do quiosque para destacar ou escurecer salas |

Todo cliente desnormaliza da mesma forma (por exemplo, `B1Checkin/app/services.tsx`, `B1App/src/app/[sdSlug]/mobile/components/screens/CheckinPage.tsx`): carrega `GET /attendance/servicetimes?serviceId=`, `GET /attendance/groupservicetimes` e `GET /membership/groups` em paralelo, depois, para cada horário de serviço, coleta os grupos cuja linha `groupServiceTimes` aponta para ele em `serviceTime.groups`. Esse array é o que o seletor de sala mostra, organizado pelo `categoryName` do grupo.

As atribuições são editadas na página do grupo no B1Admin (`B1Admin/src/groups/components/ServiceTimesEdit.tsx` — `POST`/`DELETE /attendance/groupservicetimes`), e toda a árvore Campus → Serviço → Horário de Serviço → Grupo é visualizada em `B1Admin/src/attendance/components/AttendanceSetup.tsx` via `GET /attendance/attendancerecords/tree`.

:::info
Como os grupos são a única fonte de verdade, a mesma associação de grupo alimenta o roteamento do quiosque, a presença estilo lista nas páginas de grupo do B1Admin e os relatórios de presença — atribuir um grupo a um horário de serviço é o único passo necessário para transformá-lo em um destino de check-in.
:::

## Segurança infantil

### Tipos de check-in

Toda visita carrega um `checkinType` — `member`, `guest` ou `volunteer` (NULL significa legado/membro; migração `tools/migrations/attendance/2026-07-03_checkin_type.ts`). O tipo é escolhido **no lado do quiosque**: chips Member / Guest / Volunteer na linha de membro expandida (`B1Checkin/src/components/MemberServiceTimes.tsx`), carimbados em cada visita pendente na conclusão (`app/checkinComplete.tsx`, com padrão `member`). O servidor o consome no portão — voluntários contam a favor da cobertura de proporção em vez de contra a capacidade, e convidados contam contra `guestCapacity`.

### Portões de capacidade e proporção de voluntários

`CheckinGateHelper.evaluate()` (`Api/src/modules/attendance/helpers/CheckinGateHelper.ts`) roda dentro de `postCheckin` antes de qualquer gravação (o ponto de extremidade não é transacional, então portão-antes-da-gravação é o mecanismo de correção). Ele carrega a ocupação atual por grupo alvo (`VisitRepo.countActiveByGroupToday`) e a configuração do grupo através da porta do módulo de associação, e então classifica as violações:

- **Rígida (sempre bloqueia):** `checkinClosed`, `current + incoming > capacity`, contagem de convidados acima de `guestCapacity`. O lote é rejeitado com `409 { error: "capacity", groups: [{ groupId, groupName, reason }] }` — o quiosque mostra a sala nomeada.
- **Proporção (avisa ou bloqueia):** não-voluntários entrando em uma sala onde `volunteers < minVolunteers`, nenhum voluntário presente, ou `children > volunteers × volunteerRatio`. A severidade segue a configuração por igreja `ratioEnforcement` (padrão `"warn"` / `"block"`, editada em B1Admin Gerenciar Igreja → Check-In, `CheckinSettingsEdit.tsx`). O modo de aviso retorna `409 { warning: true, error: "ratio", … }` a menos que o cliente reenvie com `acknowledgeWarnings=true` — esse reenvio é a substituição de confirmação da equipe do quiosque.

### Elegibilidade de idade/série (no lado do quiosque)

A elegibilidade de sala é uma UI consultiva, avaliada no quiosque, não imposta pelo servidor. `B1Checkin/src/helpers/EligibilityHelper.ts` compara a data de nascimento/série de uma pessoa contra `minAgeMonths`/`maxAgeMonths`/`minGrade`/`maxGrade` do grupo (ordem de série: PreK, K, 1–12, Formado) e retorna `eligible` / `ineligible` / `unknown` — dados ausentes resultam em `unknown` e nunca escondem uma sala. Idades e séries são calculadas em relação à **data de promoção de série** da igreja (configuração `gradePromotionDate`, `"MM-DD"`, editada em `B1Admin/src/settings/components/GradePromotionSettingsEdit.tsx`); o quiosque a obtém de `GET /attendance/checkin/settings`, e `resolveAsOfDate` escolhe a ocorrência mais recente em ou antes de hoje. O seletor de sala destaca salas elegíveis e escurece as inelegíveis; escolher uma sala escurecida requer confirmação da equipe.

### Retirada confiável e não autorizada

Pessoas de retirada são uma entidade de associação, por família: `householdPickupPeople` (`Api/src/modules/membership/models/HouseholdPickupPerson.ts` — householdId, personId opcional, name, photoUrl, relationship, `status` `trusted` / `notAuthorized`, notes). O CRUD é `GET /membership/householdpickup/:householdId` (qualquer usuário autenticado da igreja, para que os quiosques possam lê-lo) mais `POST` / `DELETE` controlados por `people.edit`. A equipe gerencia a lista no cartão **Pickup** da página da pessoa (`B1Admin/src/people/components/PickupPeople.tsx`) — foto, relacionamento e um chip de status Confiável/Não Autorizado.

No check-out (`B1Checkin/app/checkout.tsx`) o quiosque carrega a lista de retirada da família: entradas `trusted` são renderizadas como cartões de retirada tocáveis ao lado da grade de fotos dos adultos da família, e um nome "Outro" digitado livremente é comparado de forma aproximada (Levenshtein, `src/helpers/PickupMatchHelper.ts`) contra entradas `notAuthorized` — uma correspondência bloqueia o check-out com uma folha de aviso e um botão de **Substituição** da equipe. A substituição é registrada na própria visita: ela publica `checkedOutBy` como `"OVERRIDE: {name}"` através do `POST /attendance/visits/checkout` normal, então acaba no registro de presença e no webhook `attendance.checkout`, em vez de uma tabela de auditoria separada.

### Chamar um responsável e transmissão de emergência

`CheckinController` (`Api/src/modules/attendance/controllers/CheckinController.ts`, `/attendance/checkin`) expõe dois pontos de extremidade SMS:

- `POST /page` — `{ visitId, message }`: chama os responsáveis de uma criança registrada (tela de check-out do quiosque, modo com equipe).
- `POST /broadcast` — `{ serviceId, message }`: envia mensagem de texto para os adultos de toda família com check-in feito em um serviço (configurações de admin do quiosque, atrás de uma folha do tipo digite-`EMERGENCY`-para-confirmar em `B1Checkin/app/adminSettings.tsx`).

Ambos resolvem os adultos da família através da porta do módulo de associação, e então entregam a **`MessagingModuleGateway.sendBulkText`** (`Api/src/shared/modules/MessagingModuleGateway.ts`) — a porta entre módulos para o provedor de mensagens de texto configurado da igreja (`@churchapps/texting`: TextInChurch, Clearstream ou MutualMinistry; não há remetente de SMS embutido). A porta registra uma linha `sentText` mais entradas `deliveryLog` por destinatário e limita um lote a 500 destinatários; sem provedor configurado, ela retorna `no_provider`, que o quiosque exibe como "Nenhum provedor de SMS configurado". O `dispatch()` do controlador deduplica números de telefone e ignora pessoas sem celular ou com `optedOut` definido, retornando `{ sent, failed, skippedOptedOut, skippedNoPhone }` para que o quiosque possa mostrar o que foi ignorado.

## O Quiosque (B1Checkin)

As telas são arquivos expo-router sob `B1Checkin/app/`; o estado entre telas vive em uma classe estática `CachedData` (`src/helpers/CachedData.ts`), não em estado React.

```
index (boot/auto-login) → selectChurch → services ──▶ lookup ──▶ household ──▶ checkinComplete
                                          │             │  ▲         │ │            │
             loads serviceTimes, groups,  │             │  └─────────┘ └▶ addGuest  └▶ print labels,
             groupServiceTimes,           │             └▶ checkout (manned)           auto-return
             labelTemplates               │                                            to lookup
```

1. **Lookup** (`app/lookup.tsx`) — busca por telefone (`GET /membership/people/search/phone?number=`, últimos 4 dígitos ou completo) ou por nome (`GET /membership/people/search?term=`). Selecionar uma correspondência carrega a família (`GET /membership/people/household/{householdId}`) e as visitas existentes (`GET /attendance/visits/checkin`), semeando `pendingVisits` com as seleções da semana passada.
2. **Revisão da família** (`app/household.tsx`, `src/components/MemberList.tsx`) — cada linha de membro mostra um selo de já-registrado, um selo de alergia/`nametagNotes` e seus chips de sala atual. Expandir um membro lista todo horário de serviço com um botão de sala mais os chips de tipo de check-in Member / Guest / Volunteer (`MemberServiceTimes.tsx`).
3. **Atribuição de grupo** (`app/selectGroup.tsx`) — uma árvore de categoria construída a partir de `serviceTime.groups`, com salas elegíveis por idade/série destacadas e as inelegíveis escurecidas atrás de uma confirmação da equipe (veja [Elegibilidade de idade/série](#agegrade-eligibility-kiosk-side)); escolher uma sala grava um visitSession `{ session: { serviceTimeId, groupId } }` na visita pendente dessa pessoa (`src/helpers/VisitSessionHelper.ts`). "Nenhuma" a limpa.
4. **Concluir** (`app/checkinComplete.tsx`) — `POST /attendance/visits/checkin` com `pendingVisits` (cada uma carimbada com seu `checkinType`), depois imprime rótulos se uma impressora estiver configurada e retorna automaticamente para a busca. Uma resposta `409` de capacidade mostra a sala cheia/fechada nomeada; um aviso de proporção oferece uma confirmação da equipe que reenvia com `acknowledgeWarnings=true`.

A tela de **check-out** (`app/checkout.tsx`) aceita o código de segurança de 4 caracteres através de uma entrada com foco automático — para que leitores de código de barras USB/Bluetooth do tipo teclado funcionem sem câmera — ou um teclado na tela usando o mesmo alfabeto, enviando automaticamente ao completar 4 caracteres. Ela busca o código, mostra as crianças sendo retiradas e apresenta as **pessoas de retirada confiáveis** da família como cartões tocáveis ao lado de uma grade de fotos dos adultos da família (mais uma opção de texto livre "Outro" que é verificada de forma aproximada contra nomes não autorizados — veja [Retirada confiável e não autorizada](#trusted-and-not-authorized-pickup)), depois publica `POST /attendance/visits/checkout` com o nome/id de quem retirou. No modo com equipe, a tela também oferece **Chamar um responsável** (`POST /attendance/checkin/page`) e uma **reimpressão de rótulo de segurança** — `reprint()` reconstrói os rótulos da família com `LabelHelper.getAllLabelsFor(...)` e os alimenta pelo mesmo pipeline `PrintUI` do check-in.

A personalidade da estação é um sinalizador do AsyncStorage `@StationMode` (`"self"` | `"manned"`, alternado em `app/adminSettings.tsx`). O modo com equipe adiciona o ponto de entrada de check-out na tela de busca e a edição de perfil por membro (`POST /membership/people`) na tela de família. O endurecimento do quiosque já vem embutido: um PIN opcional (`app/setPin.tsx`, `src/components/PinEntryModal.tsx`) controla o acesso às telas de administração e impressora, a tela de admin abre apenas com 7 toques rápidos no logotipo do cabeçalho, e uma tela de atração ociosa (`src/hooks/useInactivityTimer.ts`) assume o controle entre uma família e outra.

## Self check-in (B1App)

Membros fazem check-in a partir do portal b1.church na tela `/mobile/checkin` (roteada por `B1App/src/app/[sdSlug]/mobile/components/ScreenRouter.tsx` para `screens/CheckinPage.tsx`). Requer um usuário conectado e percorre os mesmos quatro passos do quiosque — serviços → família → grupos → concluir — contra os pontos de extremidade idênticos, com estado mantido em `B1App/src/helpers/CheckinHelper.ts`. As diferenças em relação ao quiosque: a família vem do próprio `householdId` do usuário conectado (sem etapa de busca), e não há impressão de rótulos — em vez disso, a tela de conclusão mostra o código de segurança do lote como um QR (`qrcode.react`) com a dica "mostre isso em uma estação de check-in". Se a família já tiver feito check-in quando a página carregar, um botão "Mostrar código de check-in" reexibe o QR a partir do `securityCode` da visita existente. O check-in é registrado imediatamente no momento do envio (não há estado pendente); o QR apenas orienta a impressão de rótulos no quiosque.

**Impressão de rótulos do telefone para o quiosque** (`B1Checkin/app/scan.tsx`, acessado pelo botão "Escanear código" na tela de busca): o quiosque abre um `CameraView` do `expo-camera` (voltado para frente por padrão, invertível) buscando códigos QR. Uma carga escaneada é aceita quando é um código simples de 4 caracteres no alfabeto de código de segurança, então tanto o QR do B1App quanto o bloco de QR de um rótulo impresso funcionam. A tela então segue o caminho de reimpressão de check-out — `GET /attendance/visits/code/{code}` → `GET /membership/people/ids` → `LabelHelper.getAllLabelsFor(visits, people, code)` → `PrintUI` — e retorna à busca. Nenhuma gravação de presença acontece no momento da leitura; apenas rótulos. Códigos sem visitas ativas, estações sem impressora e grupos sem rótulo exibem, cada um, uma notificação e retornam à busca.

Tipos e `ApiHelper`/`ArrayHelper` vêm de `@churchapps/helpers` e `@churchapps/apphelper`; nenhum componente React é compartilhado com o B1Admin.

## Presença do lado admin (B1Admin)

- **Configuração** — `/attendance` (`B1Admin/src/attendance/AttendancePage.tsx`) renderiza a árvore de estrutura e cria serviços (`ServiceEdit.tsx`) e horários de serviço (`ServiceTimeEdit.tsx`). Os dados de campus vêm da associação via o hook `useCampuses()`.
- **A presença manual** vive no lado de Grupos, não na seção de presença: `B1Admin/src/groups/components/GroupSessionsTab.tsx` cria sessões (`POST /attendance/sessions`) e marca pessoas como presentes via `POST /attendance/visitsessions/log`, que encontra-ou-cria a visita para essa pessoa e sessão. Líderes de grupo podem registrar presença para seus próprios grupos sem a permissão `attendance.edit` — os controladores verificam `au.leaderGroupIds`.
- **Relatórios** — tendência de presença e presença de grupo são relatórios definidos pelo servidor (`B1Admin/src/components/reporting/ReportWithFilter.tsx` contra a ReportingApi); o histórico por pessoa é `GET /attendance/attendancerecords?personId=` (`B1Admin/src/people/components/PersonAttendance.tsx`).

## Impressão de rótulos

### Modelos e o designer

As igrejas projetam seus próprios rótulos no B1Admin em `/mobile/checkin/labels` (`B1Admin/src/attendance/LabelsPage.tsx` + `components/LabelEditor.tsx`, acessado pela página de configurações de Check-In). Um modelo é uma linha `labelTemplates` cujo `content` é um array JSON de blocos — `text`, `field`, `barcode`, `qrcode` ou `box` — cada um posicionado em coordenadas percentuais com fonte, alinhamento, simbologia (`code39`/`code128`/`qr`) e condições de visibilidade opcionais (por exemplo, renderizar a caixa de alergia apenas quando `person.nametagNotes` não estiver vazio). Existem dois `labelType`s: `nametag` (um por pessoa registrada; campos como `person.displayName`, `sessions`, `securityCode`) e `pickup` (um por família; campos como `children`, `childrenAllergies`). O servidor aplica um único padrão por tipo por igreja (`LabelTemplateController.save`). O designer vem com modelos iniciais que espelham os rótulos embutidos do quiosque e permite pré-visualização com dados de amostra.

### Renderização e impressão no quiosque

Ao concluir o check-in, `B1Checkin/src/helpers/LabelHelper.ts` decide o que imprimir a partir dos sinalizadores de grupo de cada visita pendente: crachás para grupos `printNametag`, mais um rótulo de retirada de família se alguma visita atingiu um grupo `parentPickup`. O código de segurança da resposta de check-in vai nos crachás das crianças e no rótulo de retirada; crachás de adultos são impressos sem código. Se a igreja tiver modelos, `LabelRenderer` (`src/helpers/LabelRenderer.ts`) transforma blocos + um contexto de campo em um documento HTML autônomo; caso contrário, os rótulos HTML embutidos em `B1Checkin/assets/labels/` são usados com substituição de espaços reservados.

Os códigos de barras são gerados como SVG inline por codificadores em TypeScript puro em `B1Checkin/src/helpers/barcode.ts` — tabelas de padrão do Código 39 e tabelas de largura do Código 128 (conjunto de código B com soma de verificação mod-103), além de QR via o pacote `qrcode`. **Esses codificadores são intencionalmente duplicados no B1Admin** (`LabelEditor.tsx` embute as mesmas tabelas, anotado em um comentário de código) para que as pré-visualizações do designer sejam fiéis em pixel à saída do quiosque; uma mudança em um deve ser espelhada no outro.

O pipeline de impressão (`src/components/PrintUI.tsx`) renderiza cada rótulo HTML em uma `WebView`, captura-o em JPG via `react-native-view-shot`, e passa os URIs de imagem para o módulo nativo Expo **printer-helper** (`B1Checkin/modules/printer-helper/`). O módulo expõe `scan()`, `checkInit()`, `printUris()` e eventos de status, com um provedor por marca em ambas as plataformas:

| Marca | Android | iOS | Notas |
|-------|---------|-----|-------|
| Brother | `BrotherProvider.kt` (Brother print SDK) | `BrotherProvider.swift` (`BRLMPrinterKit.xcframework`) | Impressoras de rede da série QL (QL-800/810W/820NWB/1100/1110NWB…), rótulos recortados 29×90, o padrão recomendado |
| Zebra | `ZebraProvider.kt` (Link-OS SDK) | `ZebraProvider.swift` + `ZebraBridge` | Descoberta de rede + impressão de imagem TCP/ZPL |

A seleção de impressora vive em `app/printers.tsx` (a varredura de rede retorna entradas `brand~model~ip`; a escolha persiste no AsyncStorage), e `src/helpers/PrinterLog.ts` mantém um registro de diagnóstico no dispositivo, exibido através de um indicador de status ao vivo no cabeçalho do quiosque.

## Registro de convidados

Dois caminhos criam uma pessoa no meio do check-in:

- **No quiosque** — o "Adicionar convidado" da tela de família abre `B1Checkin/app/addGuest.tsx`, que primeiro busca `GET /membership/people/search?term=` por uma correspondência de não membro existente e, caso contrário, cria uma com `POST /membership/people`, anexada à família atual. O convidado então flui pela atribuição de grupo como qualquer membro.
- **Autoatendimento via QR** — quando a configuração da igreja `enableQRGuestRegistration` está ativa (configurada nas configurações de Check-In do B1Admin, lida de `GET /membership/settings/public/{churchId}`), a tela de busca do quiosque mostra um código QR que leva a `https://{subdomain}.b1.church/guest-register?serviceId=`. Essa página do B1App (`src/app/[sdSlug]/(public)/guest-register/page.tsx`) permite que uma família visitante se registre em seu próprio telefone através do ponto de extremidade anônimo `POST /membership/people/guest-register`, mantendo a fila do quiosque em movimento.

## Páginas Relacionadas

- [Pontos de Extremidade de Presença](../api/endpoints/attendance) -- Superfície REST completa para campi, serviços, sessões, visitas e sessões de visita
- [Pontos de Extremidade de Associação](../api/endpoints/membership) -- Pessoas, famílias e grupos
- [Webhooks](../api/webhooks) -- Os eventos `session.created`, `attendance.recorded` e `attendance.checkout`
- [Estrutura de Módulo](../api/module-structure) -- Como o módulo de presença é organizado no lado do servidor
