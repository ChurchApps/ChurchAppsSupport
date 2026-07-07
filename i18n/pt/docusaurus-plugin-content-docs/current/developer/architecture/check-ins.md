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
| Self check-in | `B1App` | Next.js (portal de membros b1.church) | Membros conectados verificam sua família a partir de um telefone; sem impressão |
| Admin | `B1Admin` | React SPA | Configura a estrutura de serviço, atribui grupos a horários de serviço, projeta rótulos, registra presença manual, executa relatórios |

Todos os três chamam os mesmos dois módulos API através de `ApiHelper`: **MembershipApi** (`/membership`) para pessoas, famílias e grupos; **AttendanceApi** (`/attendance`) para tudo abaixo.

## Modelo de dados (`Api/src/modules/attendance`)

| Entidade / tabela | Campos principais | Significado |
|----------------|-----------|---------|
| `campuses` | name, address | Descontinuado aqui — campanhas são dominadas no módulo de associação (`/membership/campuses`); a cópia de presença é congelada somente leitura para leitores legados (`models/Campus.ts`) |
| `services` | campusId, name | Uma reunião recorrente, por exemplo, "Domingo de Manhã" (`models/Service.ts`) |
| `serviceTimes` | serviceId, name | Um horário dentro de um serviço, por exemplo, "9:00 AM" (`models/ServiceTime.ts`) |
| `groupServiceTimes` | groupId, serviceTimeId | Tabela de junção: quais grupos (salas de aula) se reúnem em quais horários de serviço (`models/GroupServiceTime.ts`) |
| `sessions` | groupId, serviceTimeId, sessionDate | Uma reunião de um grupo em uma data — criada preguiçosamente no momento do check-in (`models/Session.ts`) |
| `visits` | personId, serviceId, visitDate, checkinTime, securityCode, checkinType, checkedInById, checkoutTime, checkedOutBy, checkedOutById | Uma pessoa comparecendo em uma data (`models/Visit.ts`). `checkinType` é `member` / `guest` / `volunteer` (NULL = membro legado), definido pelo quiosque e consumido pelos portões de capacidade/proporção |
| `visitSessions` | visitId, sessionId | Qual(is) sessão(ões) uma visita cobre — uma criança registrada em dois horários de serviço recebe duas linhas (`models/VisitSession.ts`) |
| `labelTemplates` | name, labelType (`nametag`/`pickup`), width, height, isDefault, content (JSON blocks) | Layouts de rótulo designáveis (`models/LabelTemplate.ts`) |

### Como um check-in completo é persistido

`VisitController.postCheckin` (`Api/src/modules/attendance/controllers/VisitController.ts`) trata `POST /attendance/visits/checkin?serviceId=&peopleIds=`. O corpo é um array de objetos `Visit`, cada um carregando `visitSessions` cuja `session` incorporada nomeia apenas um par `(serviceTimeId, groupId)`. O servidor então:

1. **Portões de capacidade e proporções antes de qualquer escrita.** `evaluateGates()` → `CheckinGateHelper.evaluate()` verifica a capacidade de cada sala alvo, capacidade de convidado, sinalizador fechado e proporção de voluntários contra ocupação atual. postCheckin é **não transacional**, então o portão deve ser executado antes da primeira economia — uma violação difícil retorna um 409 nomeando a(s) sala(s) ofensora(s) e nada é persistido. Veja [Portões de Capacidade e Proporção de Voluntários](#capacity-and-volunteer-ratio-gates).
2. **Resolve sessões preguiçosamente.** `getSessionId()` encontra ou cria a linha `sessions` para `(groupId, serviceTimeId, today)` — ids de sessão são armazenados em cache no processo por data. Novas sessões emitem um webhook `session.created`. O loop é um `for..of` aguardado — um anterior `forEach(async …)` de disparo-e-esquecimento correu a economia e escreveu sessionIds NULL na criação da primeira sessão (fixado; anotado em um comentário de código no loop).
3. **Substitui os registros do dia.** Qualquer visita existente para essas pessoas naquele serviço hoje é deletada junto com suas visitSessions, depois o conjunto enviado é salvo. Re-registrar uma família é, portanto, uma operação idempotente "este é o estado atual", não um acréscimo. Passando `?checkDuplicates=true` em vez disso retorna `{ duplicates: [personId…] }` sem escrever, que é como o quiosque avisa antes de sobrescrever.
4. **Gera um código de segurança por lote.** `SecurityCodeHelper.generate()` produz um código de 4 caracteres do alfabeto `23456789BCDFGHJKLMNPQRSTVWXYZ` (sem vogais ou caracteres ambíguos, então códigos não podem soletrar palavras ou ler mal). O servidor tenta novamente em colisão contra as visitas abertas do mesmo dia da mesma igreja e carimba o código em cada visita no lote.
5. **Retorna `{ streaks, securityCode }`.** `streaks` mapeia personId para contagem de presença de semana consecutiva; o quiosque celebra marcos (a cada 5ª semana) com confete.

Cada visita salva também emite um webhook `attendance.recorded`. O lado de leitura, `GET /attendance/visits/checkin`, retorna as visitas das pessoas de sua **última data registrada** — se foi uma semana anterior os ids são removidos, então o cliente recebe uma cópia pré-preenchida das seleções de sala da semana passada que serão salvas como novos registros.

### Check-out

Dois pontos de extremidade completam o loop (`VisitController`):

- `GET /attendance/visits/code/:code` — visitas não-ainda-verificadas de hoje carregando esse código de segurança, com sessões populadas.
- `POST /attendance/visits/checkout` — corpo `{ visitIds, checkedOutBy?, checkedOutById? }`; carimba `checkoutTime` e quem pegou, e emite um webhook `attendance.checkout` por visita.

Permissões: quiosques autenticam com `attendance.checkin`, que concede exatamente a superfície de check-in/check-out/modelo-de-rótulo; `attendance.view`/`attendance.edit` cobrem relatórios e entrada manual; a estrutura (serviços, horários de serviço, atribuições de grupo) requer `services.edit`.

## Grupos acionam roteamento de sala

Não existe uma entidade de sala ou sala de aula em lugar nenhum do sistema. Uma "sala" é um **grupo** de associação com `trackAttendance` habilitado, vinculado a um ou mais horários de serviço através de `groupServiceTimes`. Os campos do grupo (em `Api/src/modules/membership/models/Group.ts`) que moldam o comportamento do quiosque:

| Campo | Efeito |
|------|--------|
| `trackAttendance` | Grupo participa de presença em tudo; a árvore de configuração B1Admin sinaliza grupos `trackAttendance` sem linha `groupServiceTimes` como não atribuídos |
| `parentPickup` | Marca uma sala infantil: registrar nela torna a visita uma visita "infantil", que imprime um rótulo de retirada de família e coloca o código de segurança no crachá |
| `printNametag` | Se os check-ins para este grupo imprimem um crachá em tudo |
| `capacity` / `guestCapacity` / `checkinClosed` | Limites de capacidade de sala e um switch "fechado" duro, aplicados no servidor pela porta de check-in (editado nas configurações de grupo B1Admin sob "Capacidade de Check-In") |
| `volunteerRatio` / `minVolunteers` | Proporção crianças-por-voluntário e contagem mínima de cabeças de voluntários, aplicada por a configuração `ratioEnforcement` em toda a igreja |
| `minAgeMonths` / `maxAgeMonths` / `minGrade` / `maxGrade` | Limites de elegibilidade de idade/série avaliados no lado do quiosque para destacar ou escurecer salas |

Cada cliente desnormaliza da mesma forma (por exemplo, `B1Checkin/app/services.tsx`, `B1App/src/app/[sdSlug]/mobile/components/screens/CheckinPage.tsx`): carrega `GET /attendance/servicetimes?serviceId=`, `GET /attendance/groupservicetimes` e `GET /membership/groups` em paralelo, depois para cada horário de serviço coleta os grupos cuja linha `groupServiceTimes` aponta para ele em `serviceTime.groups`. Esse array é o que o seletor de sala mostra, organizado por `categoryName` do grupo.

As atribuições são editadas na página do grupo em B1Admin (`B1Admin/src/groups/components/ServiceTimesEdit.tsx` — `POST`/`DELETE /attendance/groupservicetimes`), e toda a árvore Campus → Serviço → Tempo de Serviço → Grupo é visualizada em `B1Admin/src/attendance/components/AttendanceSetup.tsx` via `GET /attendance/attendancerecords/tree`.

:::info
Como os grupos são a única fonte de verdade, a mesma associação de grupo capacita roteamento de quiosque, presença estilo lista em páginas de grupo B1Admin, e relatórios de presença — atribuir um grupo a um horário de serviço é o único passo necessário para torná-lo um destino de check-in.
:::

## Segurança infantil

### Tipos de check-in

Cada visita carrega um `checkinType` — `member`, `guest` ou `volunteer` (NULL significa legado/membro; migração `tools/migrations/attendance/2026-07-03_checkin_type.ts`). O tipo é escolhido **no lado do quiosque**: chips Member / Guest / Volunteer na linha de membro expandida (`B1Checkin/src/components/MemberServiceTimes.tsx`), carimbados em cada visita pendente na conclusão (`app/checkinComplete.tsx`, padronizando para `member`). O servidor o consome na porta — voluntários contam em direção à cobertura de proporção em vez de contra capacidade, e convidados contam contra `guestCapacity`.

### Portões de Capacidade e Proporção de Voluntários

`CheckinGateHelper.evaluate()` (`Api/src/modules/attendance/helpers/CheckinGateHelper.ts`) executa dentro de `postCheckin` antes de qualquer economia (o ponto de extremidade é não transacional, portanto gating-antes-save é o mecanismo de correção). Ele carrega ocupação atual por grupo alvo (`VisitRepo.countActiveByGroupToday`) e a configuração do grupo através da porta do módulo de associação, depois classifica violações:

- **Duro (sempre bloquear):** `checkinClosed`, `current + incoming > capacity`, contagem de convidados acima de `guestCapacity`. O lote é rejeitado com `409 { error: "capacity", groups: [{ groupId, groupName, reason }] }` — o quiosque mostra a sala nomeada.
- **Proporção (avisar ou bloquear):** não-voluntários recebidos em uma sala onde `volunteers < minVolunteers`, nenhum voluntário em tudo, ou `children > volunteers × volunteerRatio`. A gravidade segue a configuração por igreja `ratioEnforcement` (`"warn"` padrão / `"block"`, editado em B1Admin Gerenciar Igreja → Check-In, `CheckinSettingsEdit.tsx`). Modo de aviso retorna `409 { warning: true, error: "ratio", … }` a menos que o cliente reenvie com `acknowledgeWarnings=true` — esse reenvio é a confirmação de equipe de substituição do quiosque.

### Elegibilidade de Idade/Série (no lado do quiosque)

A elegibilidade de sala é consultivo de UI, avaliada no quiosque, não aplicada pelo servidor. `B1Checkin/src/helpers/EligibilityHelper.ts` compara a data de nascimento/série de uma pessoa contra `minAgeMonths`/`maxAgeMonths`/`minGrade`/`maxGrade` do grupo (ordem de série: PreK, K, 1–12, Graduado) e retorna `eligible` / `ineligible` / `unknown` — dados ausentes produzem `unknown` e nunca escondem uma sala. As idades e séries são computadas em relação à **data de promoção de série** da igreja (`gradePromotionDate` configuração, `"MM-DD"`, editado em `B1Admin/src/settings/components/GradePromotionSettingsEdit.tsx`); o quiosque a obtém de `GET /attendance/checkin/settings`, e `resolveAsOfDate` escolhe a ocorrência mais recente no ou antes de hoje. O seletor de sala destaca salas elegíveis e escurece as inelegíveis; escolher uma sala escurecida requer uma confirmação de equipe.

### Retirada Confiável e Não Autorizada

Pessoas de retirada são uma entidade de associação, por família: `householdPickupPeople` (`Api/src/modules/membership/models/HouseholdPickupPerson.ts` — householdId, personId opcional, name, photoUrl, relationship, `status` `trusted` / `notAuthorized`, notes). CRUD é `GET /membership/householdpickup/:householdId` (qualquer usuário de igreja autenticado, para que quiosques possam lê-lo) mais `POST` / `DELETE` controlados por `people.edit`. A equipe gerencia a lista na página de pessoa **Pickup** card (`B1Admin/src/people/components/PickupPeople.tsx`) — foto, relacionamento e um chip de status Confiável/Não Autorizado.

No check-out (`B1Checkin/app/checkout.tsx`) o quiosque carrega a lista de retirada da família: entradas `trusted` renderizam como cards de retirada tocáveis ao lado da grade de foto de adulto da família, e um nome "Outro" digitado livremente é fuzzy-matched (Levenshtein, `src/helpers/PickupMatchHelper.ts`) contra entradas `notAuthorized` — uma correspondência bloqueia check-out com uma folha de aviso e um botão de **Substituição** de equipe. A substituição é registrada na visita em si: ela publica `checkedOutBy` como `"OVERRIDE: {name}"` através do normal `POST /attendance/visits/checkout`, portanto aterrissa no registro de presença e no webhook `attendance.checkout` em vez de uma tabela de auditoria separada.

### Página de Responsável e Transmissão de Emergência

`CheckinController` (`Api/src/modules/attendance/controllers/CheckinController.ts`, `/attendance/checkin`) expõe dois pontos de extremidade SMS:

- `POST /page` — `{ visitId, message }`: páginas dos guardiões de uma criança registrada (tela de check-out do quiosque, modo atendido).
- `POST /broadcast` — `{ serviceId, message }`: textos cada grupo familiar de adultos da família registrada para um serviço (configurações de admin do quiosque, atrás de uma folha `type-`EMERGENCY`-to-confirm` em `B1Checkin/app/adminSettings.tsx`).

Ambos resolvem adultos da família através do portal de associação, depois entrega a **`MessagingModuleGateway.sendBulkText`** (`Api/src/shared/modules/MessagingModuleGateway.ts`) — a porta entre módulos para o provedor de mensagens de texto configurado da igreja (`@churchapps/texting`: TextInChurch, Clearstream ou MutualMinistry; não há remetente SMS integrado). O portal registra uma linha `sentText` mais entradas `deliveryLog` por destinatário e limita um lote a 500 destinatários; sem provedor configurado ele retorna `no_provider`, que o quiosque superfícies como "Nenhum provedor SMS configurado". O método `dispatch()` do controlador deduplica números de telefone e pula pessoas sem celular ou `optedOut` definido, retornando `{ sent, failed, skippedOptedOut, skippedNoPhone }` para que o quiosque possa mostrar o que foi pulado.

## O Quiosque (B1Checkin)

As telas são arquivos expo-router sob `B1Checkin/app/`; o estado entre telas vive em uma classe estática `CachedData` (`src/helpers/CachedData.ts`), não estado React.

```
index (boot/auto-login) → selectChurch → services ──▶ lookup ──▶ household ──▶ checkinComplete
                                          │             │  ▲         │ │            │
             loads serviceTimes, groups,  │             │  └─────────┘ └▶ addGuest  └▶ print labels,
             groupServiceTimes,           │             └▶ checkout (manned)           auto-return
             labelTemplates               │                                            to lookup
```

1. **Lookup** (`app/lookup.tsx`) — pesquisa por telefone (`GET /membership/people/search/phone?number=`, últimos 4 ou completo) ou por nome (`GET /membership/people/search?term=`). Selecionar um resultado carrega a família (`GET /membership/people/household/{householdId}`) e visitas existentes (`GET /attendance/visits/checkin`), semeando `pendingVisits` com seleções da semana passada.
2. **Revisão da família** (`app/household.tsx`, `src/components/MemberList.tsx`) — cada linha de membro mostra um badge já-registrado, badge de alergia/`nametagNotes` e seus chips de sala atual. Expandir um membro lista cada horário de serviço com um botão de sala mais os chips de tipo de check-in Member / Guest / Volunteer (`MemberServiceTimes.tsx`).
3. **Atribuição de grupo** (`app/selectGroup.tsx`) — uma árvore de categoria construída a partir de `serviceTime.groups`, com salas elegíveis por idade/série destacadas e inelegíveis escurecidas atrás de uma confirmação de equipe (veja [Elegibilidade de Idade/Série](#agegrade-eligibility-kiosk-side)); escolher uma sala escreve um visitSession `{ session: { serviceTimeId, groupId } }` na visita pendente dessa pessoa (`src/helpers/VisitSessionHelper.ts`). "Nenhum" limpa.
4. **Completo** (`app/checkinComplete.tsx`) — `POST /attendance/visits/checkin` com `pendingVisits` (cada carimbado com seu `checkinType`), depois imprime rótulos se uma impressora está configurada e retorna automaticamente à procura. Uma resposta `409` de capacidade mostra a sala cheia/fechada nomeada; um aviso de proporção oferece uma confirmação de equipe que reenviacom `acknowledgeWarnings=true`.

A tela **check-out** (`app/checkout.tsx`) aceita o código de segurança de 4 caracteres através de uma entrada com foco automático — para que scanners de código de barras USB/Bluetooth de cunha de teclado funcionem sem câmera — ou um teclado na tela usando o mesmo alfabeto, enviando automaticamente em 4 caracteres. Procura o código, mostra as crianças sendo apanhadas e apresenta as **pessoas de retirada confiáveis** da família como cards tocáveis ao lado de uma grade de foto de adultos da família (mais uma opção de texto livre "Outro" que é verificada contra nomes não autorizados — veja [Retirada Confiável e Não Autorizada](#trusted-and-not-authorized-pickup)), depois publica `POST /attendance/visits/checkout` com o nome/id do responsável. Em modo atendido a tela também oferece **Chamar um responsável** (`POST /attendance/checkin/page`) e uma **reimpressão de rótulo de segurança** — `reprint()` reconstrói os rótulos da família com `LabelHelper.getAllLabelsFor(...)` e os alimenta através do mesmo pipeline `PrintUI` que check-in.

A personalidade da estação é um sinalizador AsyncStorage `@StationMode` (`"self"` | `"manned"`, alternado em `app/adminSettings.tsx`). O modo atendido adiciona o ponto de entrada de check-out na tela de busca e edição de perfil por membro (`POST /membership/people`) da tela de família. O endurecimento do quiosque é integrado: um PIN opcional (`app/setPin.tsx`, `src/components/PinEntryModal.tsx`) portões as telas de administrador e impressora, a tela de admin abre apenas via 7 toques rápidos no logotipo do cabeçalho, e uma tela de atração inativa (`src/hooks/useInactivityTimer.ts`) assume entre famílias.

## Self check-in (B1App)

Os membros fazem check-in no portal b1.church em `/mobile/checkin` tela (roteado por `B1App/src/app/[sdSlug]/mobile/components/ScreenRouter.tsx` para `screens/CheckinPage.tsx`). Requer um usuário conectado e percorre os mesmos quatro passos do quiosque — serviços → família → grupos → completo — contra pontos de extremidade idênticos, com estado mantido em `B1App/src/helpers/CheckinHelper.ts`. As diferenças do quiosque: a família vem do `householdId` do usuário conectado (sem etapa de pesquisa), e o fluxo termina em uma tela de confirmação — sem exibição de código de segurança e sem impressão de rótulo. Tipos e `ApiHelper`/`ArrayHelper` vêm de `@churchapps/helpers` e `@churchapps/apphelper`; nenhum componente React é compartilhado com B1Admin.

## Presença do lado de Admin (B1Admin)

- **Configuração** — `/attendance` (`B1Admin/src/attendance/AttendancePage.tsx`) renderiza a árvore de estrutura e cria serviços (`ServiceEdit.tsx`) e horários de serviço (`ServiceTimeEdit.tsx`). Os dados do campus vêm de associação via o hook `useCampuses()`.
- **Presença manual** vive no lado dos Grupos, não na seção de presença: `B1Admin/src/groups/components/GroupSessionsTab.tsx` cria sessões (`POST /attendance/sessions`) e marca pessoas presentes via `POST /attendance/visitsessions/log`, que encontra-ou-cria a visita para essa pessoa e sessão. Líderes de grupo podem registrar presença para seus próprios grupos sem a permissão `attendance.edit` — os controladores verificam `au.leaderGroupIds`.
- **Relatórios** — tendência de presença e presença de grupo são relatórios definidos pelo servidor (`B1Admin/src/components/reporting/ReportWithFilter.tsx` contra ReportingApi); o histórico por pessoa é `GET /attendance/attendancerecords?personId=` (`B1Admin/src/people/components/PersonAttendance.tsx`).

## Impressão de Rótulos

### Modelos e o Designer

As igrejas projetam seus próprios rótulos no B1Admin em `/mobile/checkin/labels` (`B1Admin/src/attendance/LabelsPage.tsx` + `components/LabelEditor.tsx`, alcançado na página de configurações de Check-In). Um modelo é uma linha `labelTemplates` cuja `content` é um array JSON de blocos — `text`, `field`, `barcode`, `qrcode` ou `box` — cada um posicionado em coordenadas de percentual com fonte, alinhamento, simbologia (`code39`/`code128`/`qr`), e condições de visibilidade opcionais (por exemplo, renderizar apenas a caixa de alergia quando `person.nametagNotes` é não vazio). Dois `labelType`s existem: `nametag` (um por pessoa registrada; campos como `person.displayName`, `sessions`, `securityCode`) e `pickup` (um por família; campos como `children`, `childrenAllergies`). O servidor aplica um padrão único por tipo por igreja (`LabelTemplateController.save`). O designer envia modelos iniciais espelhando os rótulos empacotados do quiosque e visualiza contra dados de amostra.

### Renderizando e Imprimindo no Quiosque

Na conclusão do check-in, `B1Checkin/src/helpers/LabelHelper.ts` decide o que imprimir a partir dos sinalizadores de grupo em cada visita pendente: cracha para grupos `printNametag`, mais um rótulo de retirada de família se alguma visita atingir um grupo `parentPickup`. O código de segurança da resposta de check-in vai em crachás de criança e rótulo de retirada; crachás de adultos imprimem sem código. Se a igreja tem modelos, `LabelRenderer` (`src/helpers/LabelRenderer.ts`) transforma blocos + um contexto de campo em um documento HTML autossuficiente; caso contrário rótulos HTML empacotados em `B1Checkin/assets/labels/` são usados ​​com substituição de espaço reservado.

Códigos de barras são gerados como SVG inline por codificadores puro-TypeScript em `B1Checkin/src/helpers/barcode.ts` — tabelas de padrão de Código 39 e Código 128 (conjunto de código B com soma de verificação mod-103) tabelas de largura, além de QR via pacote `qrcode`. **Estes codificadores são intencionalmente duplicados em B1Admin** (`LabelEditor.tsx` inline as mesmas tabelas, anotadas em um comentário de código) para que visualizações do designer sejam fiéis em pixel para a saída do quiosque; uma mudança em um deve ser espelhada no outro.

O pipeline de impressão (`src/components/PrintUI.tsx`) renderiza cada rótulo HTML em um `WebView`, captura para JPG via `react-native-view-shot`, e passa os URIs de imagem para o módulo nativo **printer-helper** Expo (`B1Checkin/modules/printer-helper/`). O módulo expõe `scan()`, `checkInit()`, `printUris()` e eventos de status, com um provedor por marca em ambas as plataformas:

| Marca | Android | iOS | Notas |
|-------|---------|-----|-------|
| Brother | `BrotherProvider.kt` (Brother print SDK) | `BrotherProvider.swift` (`BRLMPrinterKit.xcframework`) | Impressoras de rede série QL (QL-800/810W/820NWB/1100/1110NWB…), rótulos troquilados 29×90, o padrão recomendado |
| Zebra | `ZebraProvider.kt` (Link-OS SDK) | `ZebraProvider.swift` + `ZebraBridge` | Descoberta de rede + impressão de imagem TCP/ZPL |

A seleção da impressora vive em `app/printers.tsx` (varredura de rede retorna entradas `brand~model~ip`; a escolha persiste para AsyncStorage), e `src/helpers/PrinterLog.ts` mantém um log de diagnóstico no dispositivo superfícié através de um ponto de status ao vivo no cabeçalho do quiosque.

## Registro de Convidado

Dois caminhos criam uma pessoa no meio do check-in:

- **No quiosque** — a tela de família "Adicionar convidado" abre `B1Checkin/app/addGuest.tsx`, que primeiro pesquisa `GET /membership/people/search?term=` para uma correspondência de não-membro existente e caso contrário cria uma com `POST /membership/people`, anexada à família atual. O convidado então flui através de atribuição de grupo como qualquer membro.
- **Self-serve via QR** — quando a configuração de igreja `enableQRGuestRegistration` está ativa (configurada nas configurações de Check-In B1Admin, lida de `GET /membership/settings/public/{churchId}`), a tela de busca do quiosque mostra um código QR vinculando a `https://{subdomain}.b1.church/guest-register?serviceId=`. Essa página B1App (`src/app/[sdSlug]/(public)/guest-register/page.tsx`) permite que uma família visitante se registre em seu próprio telefone através do ponto de extremidade anônimo `POST /membership/people/guest-register`, mantendo a fila do quiosque em movimento.

## Páginas Relacionadas

- [Pontos de Extremidade de Presença](../api/endpoints/attendance) -- Superfície REST completa para campanhas, serviços, sessões, visitas e sessões de visita
- [Pontos de Extremidade de Associação](../api/endpoints/membership) -- Pessoas, famílias e grupos
- [Webhooks](../api/webhooks) -- Os eventos `session.created`, `attendance.recorded` e `attendance.checkout`
- [Estrutura de Módulo](../api/module-structure) -- Como o módulo de presença é organizado no lado do servidor
