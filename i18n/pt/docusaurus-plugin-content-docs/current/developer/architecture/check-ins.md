---
title: "Check-ins"
---

# Check-ins

<div class="article-intro">

O check-in é um único sistema com três portas de entrada: o aplicativo de quiosque B1Checkin para estações com equipe e de autoatendimento, o autoatendimento dentro do portal de membros B1App e a presença no lado administrativo do B1Admin. Todos gravam no mesmo módulo de presença da API principal, e o roteamento para as salas de aula é controlado inteiramente pelos Grupos — não existe uma entidade separada de "locais" ou "salas". Uma camada de segurança infantil fica por cima: tipos de check-in por visita, controles de capacidade e proporção de voluntários no servidor, elegibilidade por idade/série no quiosque, verificação de quem busca no check-out e chamadas aos pais pelo provedor de SMS da igreja. Esta página mapeia o modelo de dados, os fluxos de check-in, a camada de segurança e o pipeline de impressão de etiquetas.

</div>

## Visão geral

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

| Superfície | Repositório | Stack | Papel |
|------------|-------------|-------|-------|
| Quiosque | `B1Checkin` | Expo / React Native, roteamento de arquivos com expo-router; builds EAS para Android, Amazon Fire e iOS; atualizações OTA via `expo-updates` | Estação com equipe ou de autoatendimento com impressão de etiquetas e check-out verificado |
| Self check-in | `B1App` | Next.js (portal de membros b1.church) | Membros logados fazem o check-in da família pelo celular; sem impressão |
| Admin | `B1Admin` | SPA React | Configura a estrutura de cultos, atribui grupos aos horários de culto, cria modelos de etiquetas, registra a presença manual e executa relatórios |

Todas as três chamam os mesmos dois módulos da API por meio do `ApiHelper`: **MembershipApi** (`/membership`) para pessoas, domicílios e grupos; **AttendanceApi** (`/attendance`) para tudo o que está abaixo.

## Modelo de dados (`Api/src/modules/attendance`)

| Entidade / tabela | Campos principais | Significado |
|-------------------|-------------------|-------------|
| `campuses` | name, address | Obsoleta aqui — os campi são mantidos no módulo de membership (`/membership/campuses`); a cópia de attendance fica congelada, somente leitura, para leitores legados (`models/Campus.ts`) |
| `services` | campusId, name | Um encontro recorrente, por exemplo "Culto de domingo de manhã" (`models/Service.ts`) |
| `serviceTimes` | serviceId, name, dayOfWeek, startTime, endTime, checkinOpenMinutes, checkinCloseMinutes | Um horário dentro de um culto, por exemplo "9:00" (`models/ServiceTime.ts`). As colunas de cronograma são opcionais (migração `tools/migrations/attendance/2026-10-10_service_time_schedule.ts`) e definem a [janela de check-in](#scheduled-check-in-windows) |
| `groupServiceTimes` | groupId, serviceTimeId | Tabela de junção: quais grupos (salas de aula) se reúnem em quais horários de culto (`models/GroupServiceTime.ts`) |
| `sessions` | groupId, serviceTimeId, sessionDate | Um encontro de um grupo em uma data — criado sob demanda no momento do check-in (`models/Session.ts`) |
| `visits` | personId, serviceId, visitDate, checkinTime, securityCode, checkinType, checkedInById, checkoutTime, checkedOutBy, checkedOutById | Uma pessoa presente em uma data (`models/Visit.ts`). `checkinType` é `member` / `guest` / `volunteer` (NULL = membro legado), definido pelo quiosque e usado pelos controles de capacidade/proporção |
| `visitSessions` | visitId, sessionId | Em qual(is) sessão(ões) uma visita se encaixa — uma criança feita check-in em dois horários de culto recebe duas linhas (`models/VisitSession.ts`) |
| `labelTemplates` | name, labelType (`nametag`/`pickup`), width, height, isDefault, content (blocos JSON) | Layouts de etiquetas personalizáveis (`models/LabelTemplate.ts`) |

### Como um check-in concluído é persistido

`VisitController.postCheckin` (`Api/src/modules/attendance/controllers/VisitController.ts`) trata `POST /attendance/visits/checkin?serviceId=&peopleIds=`. O corpo é um array de objetos `Visit`, cada um carregando `visitSessions` cuja `session` embutida nomeia apenas um par `(serviceTimeId, groupId)`. Em seguida, o servidor:

1. **Verifica capacidade e proporções antes de qualquer escrita.** `evaluateGates()` → `CheckinGateHelper.evaluate()` verifica a capacidade de cada sala de destino, a capacidade de convidados, o indicador de fechado e a proporção de voluntários em relação à ocupação atual. O postCheckin **não é transacional**, então o controle precisa rodar antes do primeiro save — uma violação grave retorna um 409 nomeando a(s) sala(s) ofensora(s) e nada é persistido. Veja [Controles de capacidade e proporção de voluntários](#capacity-and-volunteer-ratio-gates).
2. **Resolve as sessões de forma preguiçosa.** `getSessionId()` encontra ou cria a linha de `sessions` para `(groupId, serviceTimeId, hoje)` — os ids das sessões ficam em cache no processo, por data. Novas sessões emitem um webhook `session.created`. O laço é um `for..of` com await — um antigo `forEach(async …)` disparado e esquecido corria em paralelo com o save e gravava sessionIds NULL na criação da primeira sessão (corrigido; registrado em um comentário de código no laço).
3. **Substitui os registros do dia.** Quaisquer visitas existentes dessas pessoas naquele culto hoje são excluídas, junto com seus visitSessions, e então o conjunto enviado é salvo. Refazer o check-in de uma família é portanto uma operação idempotente de "este é o estado atual", e não um acréscimo. Passar `?checkDuplicates=true` no lugar retorna `{ duplicates: [personId…] }` sem gravar, e é assim que o quiosque avisa antes de sobrescrever.
4. **Gera um código de segurança por lote.** `SecurityCodeHelper.generate()` produz um código de 4 caracteres a partir do alfabeto `23456789BCDFGHJKLMNPQRSTVWXYZ` (sem vogais nem caracteres ambíguos, para que os códigos não formem palavras nem sejam lidos errado). O servidor tenta de novo em caso de colisão com as visitas abertas do mesmo dia da mesma igreja e grava o código em todas as visitas do lote.
5. **Retorna `{ streaks, securityCode }`.** `streaks` mapeia personId para a contagem de presenças em semanas consecutivas; o quiosque comemora os marcos (a cada 5ª semana) com confete.

Cada visita salva também emite um webhook `attendance.recorded`. O lado de leitura, `GET /attendance/visits/checkin`, retorna as visitas das pessoas a partir de sua **última data registrada** — se essa foi em uma semana anterior, os ids são removidos, e o cliente recebe uma cópia preenchida das seleções de salas da semana passada, que serão salvas como novos registros.

### Check-out

Dois endpoints completam o ciclo (`VisitController`):

- `GET /attendance/visits/code/:code` — as visitas de hoje ainda não concluídas com aquele código de segurança, com as sessões preenchidas.
- `POST /attendance/visits/checkout` — corpo `{ visitIds, checkedOutBy?, checkedOutById? }`; registra `checkoutTime` e quem buscou, e emite um webhook `attendance.checkout` por visita.

Permissões: os quiosques se autenticam com `attendance.checkin`, que concede exatamente a superfície de check-in/check-out/modelos de etiqueta, além das consultas de domicílio de que um quiosque precisa sem `people.view` (busca por telefone/nome, membros do domicílio no modelo de check-in e a lista de quem pode buscar do domicílio). O `SessionHelper.filterChurches` do B1Checkin só oferece as igrejas em que a conta tem `Attendance/Checkin` ou `Attendance/Edit`. `Checkin` não faz mais parte das permissões do Everyone (função nula) (`RoleHelper` e a migração `2026-11-01_remove_everyone_checkin`), então precisa ser concedido por meio de uma função real; `attendance.view`/`attendance.edit` cobrem relatórios e lançamento manual; a estrutura (cultos, horários de culto, atribuições de grupos) exige `services.edit`. O self check-in de membros (B1App) não exige nenhuma permissão: qualquer usuário autenticado com uma pessoa vinculada na igreja pode chamar `GET`/`POST /attendance/visits/checkin`, e o servidor restringe os `personId`s enviados ao domicílio do próprio chamador (403 caso contrário — essa barreira é o que impede que os `securityCode`s de outras famílias sejam lidos). A participação na igreja é a permissão; se os membros *veem* o recurso é controlado pelas abas de navegação do B1App da igreja. Os demais endpoints de check-in (`code/:code`, `checkout`, `guardians`, `CheckinController`) continuam restritos a quiosques e à equipe.

## Os grupos orientam o roteamento de salas

Não existe entidade de sala ou de turma em nenhum lugar do sistema. Uma "sala" é um **grupo** de membership com `trackAttendance` habilitado, vinculado a um ou mais horários de culto por meio de `groupServiceTimes`. Os campos do grupo (em `Api/src/modules/membership/models/Group.ts`) que moldam o comportamento do quiosque:

| Campo | Efeito |
|------|--------|
| `trackAttendance` | O grupo participa da presença; a árvore de configuração do B1Admin marca os grupos `trackAttendance` sem linha em `groupServiceTimes` como não atribuídos |
| `parentPickup` | Marca uma sala infantil: fazer check-in nela torna a visita uma visita "infantil", que imprime uma etiqueta de busca para a família e coloca o código de segurança na etiqueta de identificação |
| `printNametag` | Se os check-ins nesse grupo imprimem uma etiqueta de identificação |
| `capacity` / `guestCapacity` / `checkinClosed` | Limites de capacidade da sala e um interruptor de "fechado" definitivo, aplicados no servidor pelo controle de check-in (editados nas configurações do grupo no B1Admin, em "Capacidade de check-in") |
| `volunteerRatio` / `minVolunteers` | Proporção de crianças por voluntário e número mínimo de voluntários, aplicados conforme a configuração `ratioEnforcement` da igreja |
| `minAgeMonths` / `maxAgeMonths` / `minGrade` / `maxGrade` | Limites de elegibilidade por idade/série avaliados no quiosque para destacar ou esmaecer as salas |

Todos os clientes desnormalizam da mesma forma (por exemplo, `B1Checkin/app/services.tsx`, `B1App/src/app/[sdSlug]/mobile/components/screens/CheckinPage.tsx`): carregam em paralelo `GET /attendance/servicetimes?serviceId=`, `GET /attendance/groupservicetimes` e `GET /membership/groups`; em seguida, para cada horário de culto, reúnem os grupos cuja linha de `groupServiceTimes` aponta para ele em `serviceTime.groups`. Esse array é o que o seletor de salas exibe, organizado por `categoryName` do grupo.

As atribuições são editadas na página do grupo no B1Admin (`B1Admin/src/groups/components/ServiceTimesEdit.tsx` — `POST`/`DELETE /attendance/groupservicetimes`), e a árvore completa Campus → Culto → Horário de culto → Grupo é visualizada em `B1Admin/src/attendance/components/AttendanceSetup.tsx` por meio de `GET /attendance/attendancerecords/tree`.

:::info
Como os grupos são a única fonte da verdade, a mesma participação em grupos alimenta o roteamento do quiosque, a presença no estilo de lista nas páginas de grupos do B1Admin e os relatórios de presença — atribuir um grupo a um horário de culto é o único passo necessário para torná-lo um destino de check-in.
:::

## Segurança infantil

### Tipos de check-in {#check-in-types}

Cada visita carrega um `checkinType` — `member`, `guest` ou `volunteer` (NULL significa legado/membro; migração `tools/migrations/attendance/2026-07-03_checkin_type.ts`). O tipo é escolhido **no quiosque**: fichas Membro / Visitante / Voluntário na linha expandida do membro (`B1Checkin/src/components/MemberServiceTimes.tsx`), gravadas em cada visita pendente na conclusão (`app/checkinComplete.tsx`, com padrão `member`). O servidor usa o tipo no controle — voluntários contam para a cobertura de proporção em vez de contar contra a capacidade, e visitantes contam contra `guestCapacity`.

### Controles de capacidade e proporção de voluntários {#capacity-and-volunteer-ratio-gates}

`CheckinGateHelper.evaluate()` (`Api/src/modules/attendance/helpers/CheckinGateHelper.ts`) roda dentro do `postCheckin` antes de qualquer gravação (o endpoint não é transacional, então bloquear antes de salvar é o mecanismo de correção). Ele carrega a ocupação atual por grupo de destino (`VisitRepo.countActiveByGroupToday`) e a configuração do grupo pelo gateway do módulo de membership, depois classifica as violações:

- **Rígidas (sempre bloqueiam):** `checkinClosed`, `atual + entrando > capacity`, número de convidados acima de `guestCapacity`. O lote é rejeitado com `409 { error: "capacity", groups: [{ groupId, groupName, reason }] }` — o quiosque mostra a sala nomeada.
- **Proporção (avisa ou bloqueia):** participantes não voluntários entrando em uma sala onde `volunteers < minVolunteers`, sem nenhum voluntário, ou `children > volunteers × volunteerRatio`. A gravidade segue a configuração por igreja `ratioEnforcement` (`"warn"` por padrão / `"block"`, editada no B1Admin em Gerenciar igreja → Check-In, `CheckinSettingsEdit.tsx`). No modo de aviso retorna `409 { warning: true, error: "ratio", … }`, a menos que o cliente reenvie com `acknowledgeWarnings=true` — esse reenvio é o override de confirmação pela equipe do quiosque.

### Janelas de check-in agendadas {#scheduled-check-in-windows}

Um horário de culto pode ter um cronograma semanal opcional (`dayOfWeek` 0–6, com 0 = domingo, `startTime`/`endTime` como `HH:mm`, `checkinOpenMinutes`, `checkinCloseMinutes`), editado no formulário de horário de culto em **Presença → Configuração** do B1Admin (`B1Admin/src/attendance/components/ServiceTimeEdit.tsx`, "Cronograma de check-in"). `CheckinGateHelper.hasSchedule()` considera um horário de culto agendado somente quando `dayOfWeek` e `startTime` estão definidos; horários não agendados nunca são limitados por tempo. `isServiceTimeOpen()` calcula a janela no horário de relógio local (`DateHelper.toChurchTime`). O fuso horário é resolvido por horário de culto por `CheckinTimeZoneHelper.load()` (`Api/src/modules/attendance/helpers/CheckinTimeZoneHelper.ts`): o `timezone` do campus do culto (`service.campusId`, via `MembershipModuleGateway.loadCampusTimeZones`) vem primeiro, depois o `timeZone` da igreja (definido em Informações da igreja no B1Admin), depois o primeiro campus não removido que tenha um `timezone` (`loadCampusTimeZone`), e só então `America/New_York`. O campus vem primeiro porque muitas igrejas tinham `America/New_York` preenchido retroativamente como fuso da igreja. Tanto a listagem quanto os caminhos de envio abaixo resolvem o fuso da mesma forma. A janela vai de `checkinOpenMinutes` antes do início até `checkinCloseMinutes` depois do término (ou depois do início, quando não há término), tratando janelas que cruzam a meia-noite ou a fronteira da semana.

A janela é aplicada em dois lugares:

- **Listagem:** `GET /attendance/servicetimes` marca cada linha com um booleano `checkinOpen` calculado. O self check-in do B1App (`CheckinPage.tsx`) e o seletor de cultos do B1Checkin (`app/services.tsx`) mantêm todos os horários. Quando todos os horários de um culto estão fechados, eles mostram a próxima abertura ("Check-in abre dom 9:30 AM." no B1App, "O check-in para este culto abre dom 9:30 AM." no B1Checkin, a partir de `CheckinHelper.opensLabel` / `ServiceTimeHelper.getOpensLabel`), caindo para "O check-in não está aberto para este culto agora." quando não é possível calcular uma abertura (o quiosque oferece um botão Voltar para escolher outro culto). Caso contrário, horários fechados aparecem como uma linha não selecionável "Fechado" / "Fechado · abre 9:30 AM". A tela de domicílio do B1Checkin (`MemberServiceTimes.tsx`) reavalia a abertura ao vivo pelo relógio do dispositivo com `ServiceTimeHelper.isCheckinOpen()` (fuso horário do dispositivo, e não o da igreja), para que um quiosque deixado ligado abra e feche na hora certa, e mostra "Sala Infantil 1 · Check-in feito" (nome do grupo) em um horário fechado em que a pessoa já tem um check-in.
- **Envio:** dentro de `evaluateGates()`, antes da avaliação de capacidade/proporção, `findClosedServiceTimeGroups()` rejeita o lote com `409 { error: "notOpen", groups: [{ groupId, groupName, reason: "notOpen" }] }` se o horário de culto de qualquer sessão de destino estiver fora da janela. Como as visitas existentes de um domicílio para hoje são reenviadas com cada check-in, as sessões que a pessoa já possui (`personId|sessionId` nas visitas existentes) pulam essa barreira, de modo que adicionar um horário de culto posterior aberto não é recusado só porque uma janela anterior fechou. O B1Checkin apresenta isso pela sua tela de bloqueio com o motivo "o check-in não está aberto agora" (violações de capacidade ainda mostram "a sala está cheia ou fechada").

### Elegibilidade por idade/série (no quiosque) {#agegrade-eligibility-kiosk-side}

A elegibilidade das salas é apenas uma interface de orientação, avaliada no quiosque, e não aplicada pelo servidor. `B1Checkin/src/helpers/EligibilityHelper.ts` compara a data de nascimento/série de uma pessoa com `minAgeMonths`/`maxAgeMonths`/`minGrade`/`maxGrade` do grupo (ordem das séries: Pré, K, 1–12, Formado) e retorna `eligible` / `ineligible` / `unknown` — dados ausentes geram `unknown` e nunca escondem uma sala. Idades e séries são calculadas na data da **promoção de série** da igreja (configuração `gradePromotionDate`, `"MM-DD"`, editada em `B1Admin/src/settings/components/GradePromotionSettingsEdit.tsx`); o quiosque a obtém de `GET /attendance/checkin/settings`, e `resolveAsOfDate` escolhe a ocorrência mais recente em ou antes de hoje. O seletor de salas destaca as salas elegíveis e esmaece as inelegíveis; escolher uma sala esmaecida exige confirmação da equipe.

### Busca autorizada e pessoas não autorizadas {#trusted-and-not-authorized-pickup}

As pessoas autorizadas a buscar são uma entidade de membership, por domicílio: `householdPickupPeople` (`Api/src/modules/membership/models/HouseholdPickupPerson.ts` — householdId, personId opcional, name, photoUrl, relationship, `status` `trusted` / `notAuthorized`, notes). O CRUD é `GET /membership/householdpickup/:householdId` (qualquer usuário autenticado da igreja, para que os quiosques possam ler), além de `POST` / `DELETE` controlados por `people.edit`. A equipe gerencia a lista no cartão **Busca** da página da pessoa (`B1Admin/src/people/components/PickupPeople.tsx`) — foto, relação e um selo de situação Autorizado/Não autorizado.

No check-out (`B1Checkin/app/checkout.tsx`), o quiosque carrega a lista de quem pode buscar do domicílio: as entradas `trusted` aparecem como cartões tocáveis de busca junto com a grade de fotos dos adultos do domicílio, e um nome "Outro" digitado livremente é comparado de forma aproximada (distância de Levenshtein, `src/helpers/PickupMatchHelper.ts`) com as entradas `notAuthorized` — uma correspondência bloqueia o check-out com uma folha de aviso e um botão **Substituir** da equipe. O override é registrado na própria visita: envia `checkedOutBy` como `"OVERRIDE: {nome}"` pelo `POST /attendance/visits/checkout` normal, de modo que aparece no registro de presença e no webhook `attendance.checkout`, e não em uma tabela de auditoria separada.

### Chamada aos pais e alerta de emergência

`CheckinController` (`Api/src/modules/attendance/controllers/CheckinController.ts`, `/attendance/checkin`) expõe dois endpoints de SMS:

- `POST /page` — `{ visitId, message }`: chama os responsáveis de uma única criança com check-in (tela de check-out do quiosque, modo com equipe).
- `POST /broadcast` — `{ serviceId, message }`: envia texto a todos os adultos de cada domicílio com check-in em um culto (configurações administrativas do quiosque, atrás de uma folha de confirmação do tipo `EMERGENCY` em `B1Checkin/app/adminSettings.tsx`).

Ambos resolvem os adultos do domicílio pelo gateway de membership e entregam o envio ao **`MessagingModuleGateway.sendBulkText`** (`Api/src/shared/modules/MessagingModuleGateway.ts`) — a porta entre módulos para o provedor de SMS configurado pela igreja (`@churchapps/texting`: TextInChurch, Clearstream ou MutualMinistry; não há um remetente de SMS embutido). O gateway registra uma linha `sentText` mais entradas `deliveryLog` por destinatário e limita um lote a 500 destinatários; sem provedor configurado, retorna `no_provider`, que o quiosque exibe como "Nenhum provedor de SMS configurado". O `dispatch()` do controller elimina números de telefone duplicados e ignora pessoas sem celular ou com `optedOut` definido, retornando `{ sent, failed, skippedOptedOut, skippedNoPhone }` para que o quiosque mostre o que foi ignorado.

## O quiosque (B1Checkin)

As telas são arquivos do expo-router em `B1Checkin/app/`; o estado entre telas fica em uma classe estática `CachedData` (`src/helpers/CachedData.ts`), e não em estado do React.

```
index (boot/auto-login) → selectChurch → services ──▶ lookup ──▶ household ──▶ checkinComplete
                                          │             │  ▲         │ │            │
             loads serviceTimes, groups,  │             │  └─────────┘ └▶ addGuest  └▶ print labels,
             groupServiceTimes,           │             └▶ checkout (manned)           auto-return
             labelTemplates               │                                            to lookup
```

1. **Busca** (`app/lookup.tsx`) — pesquisa por telefone (`GET /membership/people/search/phone?number=`, últimos 4 dígitos ou completo) ou por nome (`GET /membership/people/search?term=`). Ao selecionar uma correspondência, carrega o domicílio (`GET /membership/people/household/{householdId}`) e as visitas existentes (`GET /attendance/visits/checkin`), preenchendo `pendingVisits` com as seleções da semana passada.
2. **Revisão do domicílio** (`app/household.tsx`, `src/components/MemberList.tsx`) — cada linha de membro mostra um selo de já com check-in, um selo de alergia/`nametagNotes` e as fichas com as salas atuais. Ao expandir um membro, são listados todos os horários de culto com um botão de sala e as fichas de tipo de check-in Membro / Visitante / Voluntário (`MemberServiceTimes.tsx`). Abaixo de cada nome de horário de culto, `ServiceTimeHelper.getGroupSummary()` mostra os grupos oferecidos ali (os nomes em `serviceTime.groups`, aparados, sem duplicatas sem diferenciar maiúsculas, separados por vírgula); nada é exibido quando o horário não tem grupos.
3. **Atribuição de grupo** (`app/selectGroup.tsx`) — uma árvore de categorias construída a partir de `serviceTime.groups`, com as salas elegíveis por idade/série destacadas e as inelegíveis esmaecidas atrás de uma confirmação da equipe (veja [Elegibilidade por idade/série](#agegrade-eligibility-kiosk-side)); escolher uma sala grava um visitSession `{ session: { serviceTimeId, groupId } }` na visita pendente daquela pessoa (`src/helpers/VisitSessionHelper.ts`). "Nenhum" limpa a escolha.
4. **Concluir** (`app/checkinComplete.tsx`) — `POST /attendance/visits/checkin` com `pendingVisits` (cada uma marcada com seu `checkinType`), depois imprime as etiquetas se houver uma impressora configurada e volta automaticamente para a busca. Uma resposta `409` de capacidade ou `notOpen` mostra a sala nomeada com o motivo (cheia/fechada, ou check-in não aberto); um aviso de proporção oferece uma confirmação da equipe que reenvia com `acknowledgeWarnings=true`.

A tela de **check-out** (`app/checkout.tsx`) aceita o código de segurança de 4 caracteres por um campo com foco automático — assim, scanners de código de barras por teclado USB/Bluetooth funcionam sem câmera — ou por um teclado na tela que usa o mesmo alfabeto, enviando automaticamente ao chegar a 4 caracteres. Um botão **Escanear** abre uma folha com a câmera compartilhada `src/components/CodeScanner.tsx` (por padrão a câmera traseira, aceitando QR, Code 128 e Code 39), para que estações sem scanner de teclado possam ler a etiqueta de busca; um código escaneado segue o mesmo caminho `handleCode()` da entrada digitada. A tela busca o código, mostra as crianças que estão sendo buscadas e apresenta as **pessoas autorizadas a buscar** do domicílio como cartões tocáveis junto com uma grade de fotos dos adultos do domicílio (mais a opção de texto livre "Outro", que passa por uma verificação aproximada contra os nomes não autorizados — veja [Busca autorizada e pessoas não autorizadas](#trusted-and-not-authorized-pickup)), e então envia `POST /attendance/visits/checkout` com o nome/id escolhido. No modo com equipe, a tela também oferece **Chamar um dos pais** (`POST /attendance/checkin/page`) e uma **reimpressão da etiqueta de segurança** — `reprint()` reconstrói as etiquetas da família com `LabelHelper.getAllLabelsFor(...)` e as envia pelo mesmo pipeline `PrintUI` do check-in.

A personalidade da estação é um flag do AsyncStorage `@StationMode` (`"self"` | `"manned"`, alternado em `app/adminSettings.tsx`). O modo com equipe adiciona o ponto de entrada de check-out na tela de busca e a edição de perfil por pessoa (`POST /membership/people`) a partir da tela do domicílio. O endurecimento do quiosque é embutido: um PIN opcional (`app/setPin.tsx`, `src/components/PinEntryModal.tsx`) protege as telas de administração e de impressora, a tela administrativa abre somente com 7 toques rápidos no logotipo do cabeçalho, e uma tela de atração ociosa (`src/hooks/useInactivityTimer.ts`) assume entre uma família e outra.

## Self check-in (B1App)

Os membros fazem o check-in pelo portal b1.church, na tela `/mobile/checkin` (roteada por `B1App/src/app/[sdSlug]/mobile/components/ScreenRouter.tsx` para `screens/CheckinPage.tsx`). Exige um usuário conectado e percorre as mesmas quatro etapas do quiosque — cultos → domicílio → grupos → conclusão — pelos mesmos endpoints, com o estado mantido em `B1App/src/helpers/CheckinHelper.ts`. As diferenças em relação ao quiosque: o domicílio vem do `householdId` do próprio usuário conectado (sem etapa de busca), e não há impressão de etiquetas — em vez disso, a tela de conclusão mostra o código de segurança do lote como QR (`qrcode.react`) com a dica "mostre isto em uma estação de check-in". Se o domicílio já tiver check-in ao carregar a página, um botão "Mostrar código de check-in" exibe novamente o QR a partir da primeira visita existente (de `GET /attendance/visits/checkin`) que tenha um `securityCode`. O check-in é registrado imediatamente no envio (não há estado pendente); o QR serve apenas para a impressão de etiquetas no quiosque.

**Impressão de etiquetas a partir do celular para o quiosque** (`B1Checkin/app/scan.tsx`, acessada pelo botão "Escanear código" do QR na tela de busca): o quiosque mostra o `CodeScanner` (um `CameraView` do `expo-camera`, câmera frontal por padrão, alternável) buscando QR codes. `ScanCodeHelper.parse()` aceita um conteúdo somente quando é um código de 4 caracteres puro no alfabeto de código de segurança, e `ScanCodeHelper.isRepeat()` ignora o mesmo código por 4 segundos, de modo que tanto o QR do B1App quanto o bloco de QR de uma etiqueta impressa funcionam. A tela então segue o caminho de reimpressão do check-out — `GET /attendance/visits/code/{code}` → `GET /membership/people/ids` → `LabelHelper.getAllLabelsFor(visits, people, code)` → `PrintUI` — e volta para a busca. Nenhuma escrita de presença acontece no momento da leitura; apenas etiquetas. Códigos sem visitas ativas, estações sem impressora e grupos sem etiquetas exibem cada um um aviso e voltam para a busca.

Tipos e `ApiHelper`/`ArrayHelper` vêm de `@churchapps/helpers` e `@churchapps/apphelper`; nenhum componente React é compartilhado com o B1Admin.

## Presença no lado administrativo (B1Admin)

- **Configuração** — `/attendance` (`B1Admin/src/attendance/AttendancePage.tsx`) exibe a árvore de estrutura e cria cultos (`ServiceEdit.tsx`) e horários de culto (`ServiceTimeEdit.tsx`). Os dados dos campi vêm de membership pelo hook `useCampuses()`.
- **Presença manual** fica na seção de Grupos, e não na seção de presença: `B1Admin/src/groups/components/GroupSessionsTab.tsx` cria sessões (`POST /attendance/sessions`; ao adicionar, `SessionEdit.tsx` pode incluir uma sessão para cada outro grupo que compartilhe o horário de culto escolhido, pulando os grupos que já têm uma sessão naquela data) e marca pessoas como presentes por `POST /attendance/visitsessions/log`, que encontra ou cria a visita daquela pessoa e sessão. Líderes de grupo podem registrar a presença dos próprios grupos sem a permissão `attendance.edit` — os controllers verificam `au.leaderGroupIds`.
- **Relatórios** — tendência de presença e presença por grupo são relatórios definidos no servidor (`B1Admin/src/components/reporting/ReportWithFilter.tsx` contra o ReportingApi; definições em `Api/reports/*.json`). Ambos recebem `startDate`/`endDate` (data final inclusiva); o relatório de tendência usa por padrão de um ano atrás até hoje e acrescenta uma coluna `sessionDates` por semana, e a árvore de presença por grupo na tela inclui o `checkinTime` de cada visita e o `membershipStatus` da pessoa. O CSV de presença por grupo vem do relatório complementar `groupAttendanceDownload`, pivotado por `GroupAttendanceDownloadHelper` em uma linha por membro do grupo com uma coluna presente/ausente por sessão datada; o histórico individual é `GET /attendance/attendancerecords?personId=` (`B1Admin/src/people/components/PersonAttendance.tsx`).

## Impressão de etiquetas

### Modelos e o designer

As igrejas criam suas próprias etiquetas no B1Admin em `/mobile/checkin/labels` (`B1Admin/src/attendance/LabelsPage.tsx` + `components/LabelEditor.tsx`, acessada pela página de configurações de Check-In). Um modelo é uma linha de `labelTemplates` cujo `content` é um array JSON de blocos — `text`, `field`, `barcode`, `qrcode` ou `box` — cada um posicionado em coordenadas percentuais com fonte, alinhamento, simbologia (`code39`/`code128`/`qr`) e condições de visibilidade opcionais (por exemplo, só renderizar a caixa de alergia quando `person.nametagNotes` não estiver vazio). Existem dois `labelType`s: `nametag` (um por pessoa com check-in; campos como `person.displayName`, `sessions`, `securityCode` e `person.isBirthdayWeek` — `"true"` quando o mês/dia do aniversário está a até 3 dias de hoje, com a virada do ano, calculado por `LabelHelper.isBirthdayWithin()`) e `pickup` (um por família; campos como `children`, `childrenAllergies`). O servidor impõe um único padrão por tipo em cada igreja (`LabelTemplateController.save`). O designer traz modelos iniciais que espelham as etiquetas embutidas do quiosque e exibe prévias com dados de exemplo.

### Renderização e impressão no quiosque

Na conclusão do check-in, `B1Checkin/src/helpers/LabelHelper.ts` decide o que imprimir a partir das flags de grupo de cada visita pendente: etiquetas de identificação para os grupos com `printNametag`, mais uma etiqueta de busca da família se alguma visita atingir um grupo com `parentPickup`. Visitas com `checkinType` `volunteer` são ignoradas por `LabelHelper.selectChildVisits()`, de modo que um voluntário de berçário em uma sala de Busca de Pais nunca dispara uma etiqueta de busca. O código de segurança da resposta do check-in vai para as etiquetas de identificação das crianças e para a etiqueta de busca; as etiquetas de identificação dos adultos são impressas sem código. Se a igreja tiver modelos, `LabelRenderer` (`src/helpers/LabelRenderer.ts`) transforma blocos + um contexto de campos em um documento HTML independente; caso contrário, são usadas as etiquetas HTML embutidas em `B1Checkin/assets/labels/` com substituição de marcadores.

Os códigos de barras são gerados como SVG inline por codificadores em TypeScript puro em `B1Checkin/src/helpers/barcode.ts` — tabelas de padrões do Code 39 e tabelas de larguras do Code 128 (conjunto B com checksum mod-103), além de QR pelo pacote `qrcode`. **Esses codificadores são intencionalmente duplicados no B1Admin** (`LabelEditor.tsx` embute as mesmas tabelas, o que é anotado em um comentário de código), para que as prévias do designer sejam fiéis pixel a pixel à saída do quiosque; uma alteração em um deles precisa ser espelhada no outro.

O pipeline de impressão (`src/components/PrintUI.tsx`) renderiza cada etiqueta HTML em um `WebView`, captura-a como JPG com `react-native-view-shot` e entrega as URIs das imagens ao módulo nativo do Expo **printer-helper** (`B1Checkin/modules/printer-helper/`). O módulo expõe `scan()`, `checkInit()`, `printUris()` e eventos de status, com um provedor por marca em ambas as plataformas:

| Marca | Android | iOS | Observações |
|-------|---------|-----|-------------|
| Brother | `BrotherProvider.kt` (SDK de impressão Brother) | `BrotherProvider.swift` (`BRLMPrinterKit.xcframework`) | Impressoras de rede da série QL (QL-800/810W/820NWB/1100/1110NWB…), etiquetas recortadas 29×90, o padrão recomendado |
| Zebra | `ZebraProvider.kt` (SDK Link-OS) | `ZebraProvider.swift` + `ZebraBridge` | Descoberta na rede + impressão de imagem TCP/ZPL |

A seleção de impressora fica em `app/printers.tsx` (a varredura da rede retorna entradas `marca~modelo~ip`; a escolha persiste no AsyncStorage), e `src/helpers/PrinterLog.ts` mantém um registro de diagnóstico no dispositivo, exibido por um indicador de status ao vivo no cabeçalho do quiosque.

## Cadastro de visitantes

Dois caminhos criam uma pessoa no meio do check-in:

- **No quiosque** — o "Adicionar visitante" da tela do domicílio abre `B1Checkin/app/addGuest.tsx`, que primeiro pesquisa `GET /membership/people/search?term=` por uma correspondência existente que não seja membro e, caso contrário, cria uma nova com `POST /membership/people`, vinculada ao domicílio atual. O visitante então segue a atribuição de grupo como qualquer membro.
- **Autoatendimento por QR** — quando a configuração da igreja `enableQRGuestRegistration` está ativada (configurada no cartão de Check-In do B1Admin e lida de `GET /membership/settings/public/{churchId}`), a tela de busca do quiosque mostra um QR code que aponta para `https://{subdomain}.b1.church/guest-register?serviceId=`. Essa página do B1App (`src/app/[sdSlug]/(public)/guest-register/page.tsx`) permite que uma família visitante se cadastre no próprio celular pelo endpoint anônimo `POST /membership/people/guest-register`, mantendo a fila do quiosque andando. A folha do QR também tem um botão **Cadastrar aqui** que abre a mesma página no quiosque (`app/guestRegister.tsx`) em um `WebView` anônimo, sem cache; `src/helpers/GuestRegisterHelper.ts` monta a URL para o QR e para o WebView e bloqueia a navegação para fora de `https://{subdomain}.b1.church/guest-register`. A tela volta para a busca ao tocar em **Concluído**, em voltar, ou após 120 segundos de inatividade (a digitação no formulário é repassada do WebView como atividade), desmontando o WebView para que os dados de uma família nunca cheguem à próxima.

O cadastro por QR é controlado pelas configurações da igreja salvas no cartão **Cadastro de visitantes por QR** do B1Admin (`src/mobile/CheckInPage.tsx`):

| Configuração | Visibilidade | Finalidade |
|---|---|---|
| `enableQRGuestRegistration` | pública | Interruptor de adesão para o QR do quiosque e os endpoints anônimos |
| `guestRegistrationFields` | pública | Mapa JSON de `email`, `phone`, `address`, `birthDate`, `gender`, `maritalStatus`, `grade`, `comments` → `"off"` / `"optional"` / `"required"`. Padrão: e-mail e telefone opcionais, o restante desativado. Nome e sobrenome são sempre obrigatórios |
| `guestRegistrationImage` | pública | URL da foto de cabeçalho; o B1App a renderiza em 16:9 no lugar do ícone no formulário e na tela de confirmação |
| `guestRegistrationGroupId` | privada | Grupo ao qual todo cadastro é adicionado (os visitantes nunca veem nem escolhem) |
| `guestRegistrationRecordAttendance` | privada | `"true"` para também registrar a presença nesse grupo |

`src/components/checkin/GuestRegister.tsx` do B1App busca a lista de verificação pelo endpoint anônimo `GET /membership/people/guest-register/options?churchId=` e renderiza somente os campos incluídos (e-mail, telefone, estado civil e endereço no contato principal; data de nascimento, gênero e série por membro; uma caixa de comentários), enviando somente esses. O servidor reaplica a lista em `GuestRegistrationHelper.sanitize()` — campos desativados são descartados, campos obrigatórios ausentes ou fora da lista resultam em 400 — antes de `PersonHelper.registerGuestHousehold()` rodar. Primeiro chama `PersonRepo.findGuestMatch()` para cada membro com e-mail ou telefone: exatamente uma pessoa ativa com o mesmo primeiro nome e o mesmo e-mail ou os mesmos dígitos de telefone é reutilizada (nenhuma ou várias correspondências criam uma nova pessoa, então nunca há um palpite). Um membro sem contato é correspondido pelo primeiro nome dentro do domicílio correspondido. Pessoas reutilizadas nunca são editadas, então um formulário anônimo não consegue sobrescrever dados guardados, e a resposta repete os nomes enviados. Membros não correspondidos entram no domicílio correspondido ou em um novo, como `membershipStatus: "Visitor"`, emitindo `person.created` para cada nova pessoa. Depois, as falhas são registradas em log em vez de retornadas: os membros são adicionados ao grupo configurado (`group.member.added`); se o registro de presença estiver ativo, `AttendanceModuleGateway.recordAttendance()` marca cada membro como presente em cada um dos horários de culto do grupo que tenha cronograma e cuja janela de check-in (`CheckinGateHelper.isServiceTimeOpen`) esteja aberta agora, criando a sessão para a data de hoje no fuso da igreja, se necessário — horários sem cronograma e cadastros fora da janela não registram nada; e os comentários viram uma conversa de nota privada na pessoa do chefe do domicílio (autor da mensagem "Guest sign-up"), vinculada por `person.conversationId`.

## Páginas relacionadas

- [Endpoints de Attendance](../api/endpoints/attendance) -- Superfície REST completa de campi, cultos, sessões, visitas e visitSessions
- [Endpoints de Membership](../api/endpoints/membership) -- Pessoas, domicílios e grupos
- [Webhooks](../api/webhooks) -- Os eventos `session.created`, `attendance.recorded` e `attendance.checkout`
- [Estrutura do módulo](../api/module-structure) -- Como o módulo de presença é organizado no servidor
