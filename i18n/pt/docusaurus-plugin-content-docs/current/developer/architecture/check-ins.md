---
title: "Check-ins"
---

# Check-ins

<div class="article-intro">

O check-in é um único sistema com três pontos de acesso: o aplicativo de quiosque B1Checkin, para estações com ou sem equipe; o self check-in dentro do portal de membros B1App; e a presença administrativa no B1Admin. Os três gravam no mesmo módulo de presença (attendance) da Api principal, e o roteamento para as salas de aula é feito inteiramente por Grupos — não existe uma entidade separada de "locais" ou "salas". Uma camada de segurança infantil fica por cima: tipos de check-in por visita, bloqueios de capacidade e de proporção de voluntários no servidor, verificação de elegibilidade por idade/série no quiosque, verificação de retirada confiável no check-out, e chamada dos pais pelo provedor de mensagens de texto da igreja. Esta página mapeia o modelo de dados, os fluxos de check-in, a camada de segurança e o pipeline de impressão de etiquetas.

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
|---------|------|-------|------|
| Quiosque | `B1Checkin` | Expo / React Native, roteamento de arquivos do expo-router; builds EAS para Android, Amazon Fire e iOS; atualizações OTA via `expo-updates` | Estação com equipe ou de autoatendimento, com impressão de etiquetas e check-out verificado |
| Self check-in | `B1App` | Next.js (portal de membros b1.church) | Membros logados fazem o check-in da própria família pelo celular; sem impressão |
| Admin | `B1Admin` | SPA React | Configura a estrutura de cultos, atribui grupos aos horários de culto, cria etiquetas, registra presença manual e gera relatórios |

Todas as três superfícies chamam os mesmos dois módulos da API por meio de `ApiHelper`: **MembershipApi** (`/membership`) para pessoas, famílias e grupos; e **AttendanceApi** (`/attendance`) para tudo o que está descrito abaixo.

## Modelo de dados (`Api/src/modules/attendance`)

| Entidade / tabela | Campos principais | Significado |
|----------------|-----------|---------|
| `campuses` | name, address | Obsoleta aqui — os campi são mantidos no módulo de membership (`/membership/campuses`); a cópia de attendance fica congelada, somente leitura, para leitores legados (`models/Campus.ts`) |
| `services` | campusId, name | Um encontro recorrente, por exemplo "Culto de Domingo de Manhã" (`models/Service.ts`) |
| `serviceTimes` | serviceId, name, dayOfWeek, startTime, endTime, checkinOpenMinutes, checkinCloseMinutes | Um horário dentro de um culto, por exemplo "9:00 AM" (`models/ServiceTime.ts`). As colunas de agenda são opcionais (migração `tools/migrations/attendance/2026-10-10_service_time_schedule.ts`) e definem a [janela de check-in](#scheduled-check-in-windows) |
| `groupServiceTimes` | groupId, serviceTimeId | Tabela de junção: quais grupos (salas de aula) se reúnem em quais horários de culto (`models/GroupServiceTime.ts`) |
| `sessions` | groupId, serviceTimeId, sessionDate | Um encontro de um grupo em uma data — criado de forma lazy no momento do check-in (`models/Session.ts`) |
| `visits` | personId, serviceId, visitDate, checkinTime, securityCode, checkinType, checkedInById, checkoutTime, checkedOutBy, checkedOutById | Uma pessoa participando em uma data (`models/Visit.ts`). `checkinType` é `member` / `guest` / `volunteer` (NULL = membro legado), definido pelo quiosque e usado pelos bloqueios de capacidade/proporção |
| `visitSessions` | visitId, sessionId | Quais sessões uma visita cobre — uma criança feita check-in em dois horários de culto recebe duas linhas (`models/VisitSession.ts`) |
| `labelTemplates` | name, labelType (`nametag`/`pickup`), width, height, isDefault, content (blocos JSON) | Layouts de etiquetas desenháveis (`models/LabelTemplate.ts`) |

### Como um check-in concluído é persistido

`VisitController.postCheckin` (`Api/src/modules/attendance/controllers/VisitController.ts`) trata `POST /attendance/visits/checkin?serviceId=&peopleIds=`. O corpo é um array de objetos `Visit`, cada um carregando `visitSessions` cujo `session` embutido indica apenas um par `(serviceTimeId, groupId)`. Em seguida, o servidor:

1. **Verifica capacidade e proporções antes de qualquer gravação.** `evaluateGates()` → `CheckinGateHelper.evaluate()` verifica a capacidade de cada sala visada, a capacidade de convidados, a flag de fechada e a proporção de voluntários em relação à ocupação atual. O postCheckin **não é transacional**, então o bloqueio precisa rodar antes do primeiro save — uma violação grave retorna 409 indicando a(s) sala(s) envolvida(s), e nada é persistido. Veja [Bloqueios de capacidade e de proporção de voluntários](#capacity-and-volunteer-ratio-gates).
2. **Resolve as sessões de forma lazy.** `getSessionId()` encontra ou cria a linha em `sessions` para `(groupId, serviceTimeId, hoje)` — os ids de sessão ficam em cache no processo, por data. Novas sessões emitem um webhook `session.created`. O loop é um `for..of` com await — um `forEach(async …)` com fire-and-forget usado antes competia com o save e gravava sessionIds NULL na criação da primeira sessão (corrigido; registrado em um comentário de código no loop).
3. **Substitui os registros do dia.** Quaisquer visitas existentes dessas pessoas naquele culto, hoje, são excluídas junto com seus visitSessions, e então o conjunto enviado é salvo. Fazer check-in novamente para uma família é, portanto, uma operação idempotente de "este é o estado atual", e não um acréscimo. Passar `?checkDuplicates=true` retorna `{ duplicates: [personId…] }` sem gravar, e é assim que o quiosque avisa antes de sobrescrever.
4. **Gera um código de segurança por lote.** `SecurityCodeHelper.generate()` produz um código de 4 caracteres a partir do alfabeto `23456789BCDFGHJKLMNPQRSTVWXYZ` (sem vogais nem caracteres ambíguos, para que os códigos não formem palavras nem sejam lidos de forma errada). O servidor tenta novamente em caso de colisão com as visitas abertas do mesmo dia na mesma igreja e grava o código em todas as visitas do lote.
5. **Retorna `{ streaks, securityCode }`.** `streaks` mapeia personId para a contagem de semanas consecutivas de presença; o quiosque comemora os marcos (a cada 5ª semana) com confete.

Cada visita salva também emite um webhook `attendance.recorded`. O lado de leitura, `GET /attendance/visits/checkin`, retorna as visitas das pessoas a partir da sua **última data registrada** — se essa data for de uma semana anterior, os ids são removidos, e o cliente recebe uma cópia pré-preenchida das seleções de salas da semana passada, que serão salvas como novos registros.

### Check-out

Dois endpoints fecham o ciclo (`VisitController`):

- `GET /attendance/visits/code/:code` — visitas de hoje ainda não retiradas que carregam esse código de segurança, com as sessões preenchidas.
- `POST /attendance/visits/checkout` — corpo `{ visitIds, checkedOutBy?, checkedOutById? }`; grava `checkoutTime` e quem retirou, e emite um webhook `attendance.checkout` por visita.

Permissões: os quiosques se autenticam com `attendance.checkin`, que concede exatamente a superfície de check-in, check-out e modelos de etiqueta; `attendance.view`/`attendance.edit` cobrem relatórios e lançamentos manuais; a estrutura (cultos, horários de culto, atribuições de grupos) exige `services.edit`. O self check-in de membros (B1App) não exige permissão alguma: qualquer usuário autenticado com uma pessoa vinculada na igreja pode chamar `GET`/`POST /attendance/visits/checkin`, e o servidor restringe os `personId`s enviados à família do próprio chamador (403 caso contrário — essa barreira é o que impede que os `securityCode`s de outras famílias sejam lidos). Ser membro é a concessão em si; se os membros *veem* o recurso é controlado pelas abas de navegação do B1App da igreja. Os demais endpoints de check-in (`code/:code`, `checkout`, `guardians`, `CheckinController`) continuam restritos a quiosques e equipe.

## Grupos direcionam o roteamento das salas

Não existe entidade de sala ou de classe em nenhum lugar do sistema. Uma "sala" é um **grupo** de membership com `trackAttendance` habilitado, vinculado a um ou mais horários de culto por meio de `groupServiceTimes`. Os campos do grupo (em `Api/src/modules/membership/models/Group.ts`) que moldam o comportamento do quiosque são:

| Campo | Efeito |
|------|--------|
| `trackAttendance` | O grupo participa da presença; a árvore de configuração do B1Admin marca os grupos com `trackAttendance` sem nenhuma linha em `groupServiceTimes` como não atribuídos |
| `parentPickup` | Marca uma sala infantil: fazer check-in nela torna a visita uma visita "infantil", que imprime uma etiqueta de retirada da família e coloca o código de segurança na etiqueta de nome |
| `printNametag` | Se os check-ins nesse grupo imprimem ou não uma etiqueta de nome |
| `capacity` / `guestCapacity` / `checkinClosed` | Limites de capacidade da sala e uma chave rígida de "fechada", aplicados no servidor pelo bloqueio de check-in (editados em "Capacidade de Check-In" nas configurações do grupo no B1Admin) |
| `volunteerRatio` / `minVolunteers` | Proporção de crianças por voluntário e número mínimo de voluntários, aplicados conforme a configuração `ratioEnforcement` da igreja |
| `minAgeMonths` / `maxAgeMonths` / `minGrade` / `maxGrade` | Limites de elegibilidade por idade/série avaliados no quiosque para destacar ou esmaecer as salas |

Todos os clientes desnormalizam da mesma forma (por exemplo, `B1Checkin/app/services.tsx`, `B1App/src/app/[sdSlug]/mobile/components/screens/CheckinPage.tsx`): carregam em paralelo `GET /attendance/servicetimes?serviceId=`, `GET /attendance/groupservicetimes` e `GET /membership/groups`, e então, para cada horário de culto, reúnem em `serviceTime.groups` os grupos cuja linha em `groupServiceTimes` aponta para ele. Esse array é o que o seletor de salas mostra, organizado pela `categoryName` do grupo.

As atribuições são editadas na página do grupo no B1Admin (`B1Admin/src/groups/components/ServiceTimesEdit.tsx` — `POST`/`DELETE /attendance/groupservicetimes`), e toda a árvore Campus → Culto → Horário de Culto → Grupo é visualizada em `B1Admin/src/attendance/components/AttendanceSetup.tsx` por meio de `GET /attendance/attendancerecords/tree`.

:::info
Como os grupos são a única fonte da verdade, a mesma associação de grupo alimenta o roteamento do quiosque, a presença em formato de lista nas páginas de grupo do B1Admin e os relatórios de presença — atribuir um grupo a um horário de culto é o único passo necessário para torná-lo um destino de check-in.
:::

## Segurança infantil

### Tipos de check-in

Cada visita carrega um `checkinType` — `member`, `guest` ou `volunteer` (NULL significa legado/membro; migração `tools/migrations/attendance/2026-07-03_checkin_type.ts`). O tipo é escolhido **no quiosque**: os chips Membro / Convidado / Voluntário na linha expandida do membro (`B1Checkin/src/components/MemberServiceTimes.tsx`) são gravados em cada visita pendente ao concluir (`app/checkinComplete.tsx`, com padrão `member`). O servidor usa isso no bloqueio — voluntários contam para a cobertura da proporção em vez de contar contra a capacidade, e convidados contam contra `guestCapacity`.

### Bloqueios de capacidade e de proporção de voluntários

`CheckinGateHelper.evaluate()` (`Api/src/modules/attendance/helpers/CheckinGateHelper.ts`) roda dentro de `postCheckin`, antes de qualquer gravação (o endpoint não é transacional, então bloquear antes de salvar é o mecanismo de correção). Ele carrega a ocupação atual de cada grupo visado (`VisitRepo.countActiveByGroupToday`) e a configuração do grupo pelo gateway do módulo de membership, e então classifica as violações:

- **Graves (sempre bloqueiam):** `checkinClosed`, `atual + entrando > capacity`, número de convidados acima de `guestCapacity`. O lote é rejeitado com `409 { error: "capacity", groups: [{ groupId, groupName, reason }] }` — o quiosque mostra a sala indicada.
- **Proporção (avisam ou bloqueiam):** não voluntários entrando em uma sala onde `volunteers < minVolunteers`, sem voluntário algum, ou `children > volunteers × volunteerRatio`. A gravidade segue a configuração por igreja `ratioEnforcement` (`"warn"` por padrão / `"block"`, editada em B1Admin → Gerenciar Igreja → Check-In, `CheckinSettingsEdit.tsx`). No modo de aviso, retorna `409 { warning: true, error: "ratio", … }`, a menos que o cliente reenvie com `acknowledgeWarnings=true` — esse reenvio é a confirmação da equipe no quiosque.

### Janelas de check-in agendadas

Um horário de culto pode ter uma agenda semanal opcional (`dayOfWeek` de 0 a 6, sendo 0 = domingo; `startTime`/`endTime` como `HH:mm`; `checkinOpenMinutes`; `checkinCloseMinutes`), editada no formulário de horário de culto em **Presença → Configuração** do B1Admin (`B1Admin/src/attendance/components/ServiceTimeEdit.tsx`, "Agenda de Check-in"). `CheckinGateHelper.hasSchedule()` considera um horário de culto agendado somente quando `dayOfWeek` e `startTime` estão definidos; horários sem agenda nunca são limitados por tempo. `isServiceTimeOpen()` calcula a janela no horário local de relógio (`DateHelper.toChurchTime`). O fuso é resolvido por horário de culto por `CheckinTimeZoneHelper.load()` (`Api/src/modules/attendance/helpers/CheckinTimeZoneHelper.ts`): primeiro vale o `timezone` do campus do culto (`service.campusId`, via `MembershipModuleGateway.loadCampusTimeZones`), depois o `timeZone` da igreja (definido em Informações da Igreja no B1Admin), depois o primeiro campus não removido que tenha um `timezone` (`loadCampusTimeZone`), e só então `America/New_York`. O campus vem primeiro porque muitas igrejas tiveram `America/New_York` preenchido retroativamente como fuso da igreja. Tanto a listagem quanto os caminhos de postagem abaixo resolvem o fuso da mesma forma. A janela vai de `checkinOpenMinutes` antes do início até `checkinCloseMinutes` depois do fim (ou depois do início, quando não há fim), tratando janelas que cruzam a meia-noite ou a fronteira da semana.

A janela é aplicada em dois lugares:

- **Listagem:** `GET /attendance/servicetimes` adiciona a cada linha um booleano calculado `checkinOpen`. O self check-in do B1App (`CheckinPage.tsx`) e o seletor de cultos do B1Checkin (`app/services.tsx`) mantêm todos os horários. Quando todos os horários de um culto estão fechados, exibem a próxima abertura ("Check-in abre dom 9:30 AM." no B1App; "O check-in para este culto abre dom 9:30 AM." no B1Checkin, a partir de `CheckinHelper.opensLabel` / `ServiceTimeHelper.getOpensLabel`), recorrendo a "O check-in não está aberto para este culto no momento." quando nenhuma abertura pode ser calculada (o quiosque oferece um botão Voltar para escolher outro culto). Caso contrário, horários fechados aparecem como uma linha não selecionável "Fechado" / "Fechado · abre 9:30 AM". A tela de família do B1Checkin (`MemberServiceTimes.tsx`) reavalia a abertura ao vivo, pelo relógio do dispositivo, com `ServiceTimeHelper.isCheckinOpen()` (fuso do dispositivo, e não o da igreja), para que um quiosque deixado ligado abra e feche no horário certo; e mostra "Sala Infantil 1 · Check-in realizado" (nome do grupo) em um horário fechado no qual a pessoa já está.
- **Gravação:** dentro de `evaluateGates()`, antes da avaliação de capacidade/proporção, `findClosedServiceTimeGroups()` rejeita o lote com `409 { error: "notOpen", groups: [{ groupId, groupName, reason: "notOpen" }] }` se o horário de culto de alguma sessão visada estiver fora da janela. Como as visitas existentes de hoje de uma família são reenviadas a cada check-in, as sessões que a pessoa já possui (`personId|sessionId` nas visitas existentes) pulam essa barreira — assim, adicionar um horário de culto posterior não é recusado só porque uma janela anterior já fechou. O B1Checkin exibe isso pela tela de barreira com o motivo "o check-in não está aberto no momento" (violações de capacidade continuam dizendo "a sala está cheia ou fechada").

### Elegibilidade por idade/série (no quiosque)

A elegibilidade das salas é uma interface consultiva, avaliada no quiosque e não imposta pelo servidor. `B1Checkin/src/helpers/EligibilityHelper.ts` compara a data de nascimento/série da pessoa com `minAgeMonths`/`maxAgeMonths`/`minGrade`/`maxGrade` do grupo (ordem das séries: PreK, K, 1–12, Graduated) e retorna `eligible` / `ineligible` / `unknown` — dados ausentes resultam em `unknown` e nunca ocultam uma sala. Idades e séries são calculadas na **data de promoção de série** da igreja (configuração `gradePromotionDate`, `"MM-DD"`, editada em `B1Admin/src/settings/components/GradePromotionSettingsEdit.tsx`); o quiosque a busca em `GET /attendance/checkin/settings`, e `resolveAsOfDate` escolhe a ocorrência mais recente em ou antes de hoje. O seletor de salas destaca as salas elegíveis e esmaece as inelegíveis; escolher uma sala esmaecida exige confirmação da equipe.

### Retirada confiável e não autorizada

As pessoas autorizadas a retirar crianças são uma entidade de membership, por família: `householdPickupPeople` (`Api/src/modules/membership/models/HouseholdPickupPerson.ts` — householdId, personId opcional, nome, photoUrl, relationship, `status` `trusted` / `notAuthorized`, notas). O CRUD é `GET /membership/householdpickup/:householdId` (qualquer usuário autenticado da igreja, para que os quiosques possam lê-la), mais `POST` / `DELETE` protegidos por `people.edit`. A equipe gerencia a lista no cartão **Retirada** da página da pessoa (`B1Admin/src/people/components/PickupPeople.tsx`) — foto, parentesco e um chip de status Confiável / Não Autorizado.

No check-out (`B1Checkin/app/checkout.tsx`), o quiosque carrega a lista de retirada da família: as entradas `trusted` aparecem como cartões tocáveis ao lado da grade de fotos dos adultos da família, e um nome digitado livremente em "Outro" é comparado de forma aproximada (Levenshtein, `src/helpers/PickupMatchHelper.ts`) com as entradas `notAuthorized` — uma correspondência bloqueia o check-out com uma folha de aviso e um botão **Substituir** para a equipe. A substituição fica registrada na própria visita: ela envia `checkedOutBy` como `"OVERRIDE: {name}"` pelo `POST /attendance/visits/checkout` normal, de modo que aparece no registro de presença e no webhook `attendance.checkout`, em vez de em uma tabela de auditoria separada.

### Chamada aos pais e transmissão de emergência

`CheckinController` (`Api/src/modules/attendance/controllers/CheckinController.ts`, `/attendance/checkin`) expõe dois endpoints de SMS:

- `POST /page` — `{ visitId, message }`: chama os responsáveis de uma criança com check-in feito (tela de check-out do quiosque, modo com equipe).
- `POST /broadcast` — `{ serviceId, message }`: envia uma mensagem de texto para os adultos de todas as famílias com check-in feito em um culto (configurações de administrador do quiosque, atrás de uma folha de confirmação que exige digitar `EMERGENCY`, em `B1Checkin/app/adminSettings.tsx`).

Ambos resolvem os adultos da família pelo gateway de membership e entregam o envio a **`MessagingModuleGateway.sendBulkText`** (`Api/src/shared/modules/MessagingModuleGateway.ts`) — a porta entre módulos para o provedor de mensagens de texto configurado pela igreja (`@churchapps/texting`: TextInChurch, Clearstream ou MutualMinistry; não há um remetente de SMS embutido). O gateway registra uma linha `sentText` mais entradas `deliveryLog` por destinatário e limita um lote a 500 destinatários; sem provedor configurado, retorna `no_provider`, que o quiosque exibe como "Nenhum provedor de SMS configurado". O `dispatch()` do controlador remove números de telefone duplicados e ignora pessoas sem celular ou com `optedOut` marcado, retornando `{ sent, failed, skippedOptedOut, skippedNoPhone }` para que o quiosque mostre o que foi ignorado.

## O quiosque (B1Checkin)

As telas são arquivos do expo-router em `B1Checkin/app/`; o estado compartilhado entre telas fica em uma classe estática `CachedData` (`src/helpers/CachedData.ts`), e não em estado do React.

```
index (boot/auto-login) → selectChurch → services ──▶ lookup ──▶ household ──▶ checkinComplete
                                          │             │  ▲         │ │            │
             loads serviceTimes, groups,  │             │  └─────────┘ └▶ addGuest  └▶ print labels,
             groupServiceTimes,           │             └▶ checkout (manned)           auto-return
             labelTemplates               │                                            to lookup
```

1. **Busca** (`app/lookup.tsx`) — pesquisa por telefone (`GET /membership/people/search/phone?number=`, últimos 4 dígitos ou número completo) ou por nome (`GET /membership/people/search?term=`). Ao selecionar uma correspondência, carrega a família (`GET /membership/people/household/{householdId}`) e as visitas existentes (`GET /attendance/visits/checkin`), preenchendo `pendingVisits` com as seleções da semana passada.
2. **Revisão da família** (`app/household.tsx`, `src/components/MemberList.tsx`) — cada linha de membro mostra um selo de já feito check-in, um selo de alergia/`nametagNotes` e os chips das salas atuais. Ao expandir um membro, lista cada horário de culto com um botão de sala e os chips de tipo de check-in Membro / Convidado / Voluntário (`MemberServiceTimes.tsx`). Abaixo do nome de cada horário de culto, `ServiceTimeHelper.getGroupSummary()` mostra os grupos oferecidos ali (os nomes em `serviceTime.groups`, sem espaços extras, sem duplicatas que diferem só por maiúsculas, separados por vírgula); nada é exibido quando o horário não tem grupos.
3. **Atribuição de grupo** (`app/selectGroup.tsx`) — uma árvore de categorias construída a partir de `serviceTime.groups`, com as salas elegíveis por idade/série destacadas e as inelegíveis esmaecidas atrás de uma confirmação da equipe (veja [Elegibilidade por idade/série](#agegrade-eligibility-kiosk-side)); escolher uma sala grava um visitSession `{ session: { serviceTimeId, groupId } }` na visita pendente daquela pessoa (`src/helpers/VisitSessionHelper.ts`). "Nenhum" limpa a escolha.
4. **Concluir** (`app/checkinComplete.tsx`) — `POST /attendance/visits/checkin` com `pendingVisits` (cada um com seu `checkinType`), depois imprime as etiquetas se houver uma impressora configurada e volta automaticamente para a busca. Uma resposta `409` de capacidade ou `notOpen` mostra a sala indicada com o motivo (cheia/fechada, ou check-in não aberto); um aviso de proporção oferece uma confirmação da equipe que reenvia com `acknowledgeWarnings=true`.

A tela de **check-out** (`app/checkout.tsx`) aceita o código de segurança de 4 caracteres por um campo com foco automático — assim, leitores de código de barras com teclado USB/Bluetooth funcionam sem câmera — ou por um teclado na tela que usa o mesmo alfabeto, com envio automático ao atingir 4 caracteres. Um botão **Escanear** abre uma folha com a câmera compartilhada `src/components/CodeScanner.tsx` (voltada para trás por padrão, aceitando QR, Code 128 e Code 39), para que estações sem leitor de teclado possam ler a etiqueta de retirada; um código escaneado segue o mesmo caminho `handleCode()` da entrada digitada. A tela busca o código, mostra as crianças que estão sendo retiradas e apresenta as **pessoas autorizadas a retirar da família** como cartões tocáveis, ao lado de uma grade de fotos dos adultos da família (mais uma opção de texto livre "Outro", verificada de forma aproximada contra os nomes não autorizados — veja [Retirada confiável e não autorizada](#trusted-and-not-authorized-pickup)), e então envia `POST /attendance/visits/checkout` com o nome/id escolhido. No modo com equipe, a tela também oferece **Chamar um responsável** (`POST /attendance/checkin/page`) e a **reimpressão da etiqueta de segurança** — `reprint()` reconstrói as etiquetas da família com `LabelHelper.getAllLabelsFor(...)` e as envia pelo mesmo pipeline `PrintUI` do check-in.

O modo da estação é definido por uma flag do AsyncStorage `@StationMode` (`"self"` | `"manned"`, alternada em `app/adminSettings.tsx`). O modo com equipe adiciona o ponto de entrada de check-out na tela de busca e a edição de perfil por membro (`POST /membership/people`) na tela da família. O endurecimento do quiosque é embutido: um PIN opcional (`app/setPin.tsx`, `src/components/PinEntryModal.tsx`) protege as telas de administrador e de impressora, a tela de administrador só abre com 7 toques rápidos no logo do cabeçalho, e uma tela de atração ociosa (`src/hooks/useInactivityTimer.ts`) assume entre as famílias.

## Self check-in (B1App)

Os membros fazem check-in pelo portal b1.church, na tela `/mobile/checkin` (roteada por `B1App/src/app/[sdSlug]/mobile/components/ScreenRouter.tsx` para `screens/CheckinPage.tsx`). Ela exige um usuário logado e percorre as mesmas quatro etapas do quiosque — cultos → família → grupos → concluir — contra os mesmos endpoints, com o estado mantido em `B1App/src/helpers/CheckinHelper.ts`. As diferenças em relação ao quiosque: a família vem do `householdId` do próprio usuário logado (sem etapa de busca), e não há impressão de etiquetas — em vez disso, a tela de conclusão mostra o código de segurança do lote como QR (`qrcode.react`), com a dica "mostre isto em uma estação de check-in". Se a família já tiver check-in feito quando a página carregar, um botão "Mostrar código de check-in" exibe novamente o QR a partir da primeira visita existente (de `GET /attendance/visits/checkin`) que tenha um `securityCode`. O check-in é registrado imediatamente no envio (não há estado pendente); o QR serve apenas para acionar a impressão de etiquetas no quiosque.

**Impressão de etiquetas do celular para o quiosque** (`B1Checkin/app/scan.tsx`, acessada pelo botão "Escanear código" do QR na tela de busca): o quiosque mostra `CodeScanner` (um `CameraView` do `expo-camera`, voltado para a frente por padrão, com possibilidade de inverter) procurando códigos QR. `ScanCodeHelper.parse()` aceita um conteúdo somente se for um código puro de 4 caracteres do alfabeto de código de segurança, e `ScanCodeHelper.isRepeat()` ignora o mesmo código por 4 segundos, de modo que tanto o QR do B1App quanto o bloco de QR de uma etiqueta impressa funcionam. Em seguida, a tela segue o caminho de reimpressão do check-out — `GET /attendance/visits/code/{code}` → `GET /membership/people/ids` → `LabelHelper.getAllLabelsFor(visits, people, code)` → `PrintUI` — e volta para a busca. Nenhuma gravação de presença acontece no momento da leitura; são apenas etiquetas. Códigos sem visitas ativas, estações sem impressora e grupos sem etiqueta exibem um aviso e retornam para a busca.

Os tipos e `ApiHelper`/`ArrayHelper` vêm de `@churchapps/helpers` e `@churchapps/apphelper`; nenhum componente React é compartilhado com o B1Admin.

## Presença administrativa (B1Admin)

- **Configuração** — `/attendance` (`B1Admin/src/attendance/AttendancePage.tsx`) renderiza a árvore da estrutura e cria cultos (`ServiceEdit.tsx`) e horários de culto (`ServiceTimeEdit.tsx`). Os dados de campus vêm do membership pelo hook `useCampuses()`.
- **Presença manual** fica no lado de Grupos, e não na seção de presença: `B1Admin/src/groups/components/GroupSessionsTab.tsx` cria sessões (`POST /attendance/sessions`; ao adicionar, `SessionEdit.tsx` pode incluir uma sessão para cada outro grupo que compartilhe o horário de culto escolhido, pulando os grupos que já têm uma sessão naquela data) e marca pessoas como presentes por meio de `POST /attendance/visitsessions/log`, que encontra ou cria a visita daquela pessoa e sessão. Líderes de grupo podem registrar presença nos próprios grupos sem a permissão `attendance.edit` — os controladores verificam `au.leaderGroupIds`.
- **Relatórios** — a tendência de presença e a presença por grupo são relatórios definidos pelo servidor (`B1Admin/src/components/reporting/ReportWithFilter.tsx` contra a ReportingApi; definições em `Api/reports/*.json`). Ambos recebem `startDate`/`endDate` (data final inclusiva); o relatório de tendência usa como padrão o período de um ano atrás até hoje e adiciona uma coluna `sessionDates` por semana, e a árvore de presença por grupo na tela inclui o `checkinTime` de cada visita e o `membershipStatus` da pessoa. O CSV de presença por grupo vem do relatório complementar `groupAttendanceDownload`, transformado por `GroupAttendanceDownloadHelper` em uma linha por membro do grupo, com uma coluna de presente/ausente para cada sessão datada; o histórico por pessoa é `GET /attendance/attendancerecords?personId=` (`B1Admin/src/people/components/PersonAttendance.tsx`).

## Impressão de etiquetas

### Modelos e o designer

As igrejas criam suas próprias etiquetas no B1Admin, em `/mobile/checkin/labels` (`B1Admin/src/attendance/LabelsPage.tsx` + `components/LabelEditor.tsx`, acessada pela página de configurações de Check-In). Um modelo é uma linha de `labelTemplates` cujo `content` é um array JSON de blocos — `text`, `field`, `barcode`, `qrcode` ou `box` — cada um posicionado em coordenadas percentuais, com fonte, alinhamento, simbologia (`code39`/`code128`/`qr`) e condições de visibilidade opcionais (por exemplo, exibir a caixa de alergia somente quando `person.nametagNotes` não estiver vazio). Existem dois `labelType`s: `nametag` (uma por pessoa com check-in; campos como `person.displayName`, `sessions`, `securityCode` e `person.isBirthdayWeek` — `"true"` quando o mês/dia do aniversário está a até 3 dias de hoje, incluindo a virada do ano, calculado por `LabelHelper.isBirthdayWithin()`) e `pickup` (uma por família; campos como `children` e `childrenAllergies`). O servidor impõe um único padrão por tipo, por igreja (`LabelTemplateController.save`). O designer traz modelos iniciais que espelham as etiquetas embutidas do quiosque e faz pré-visualizações com dados de exemplo.

### Renderização e impressão no quiosque

Ao concluir o check-in, `B1Checkin/src/helpers/LabelHelper.ts` decide o que imprimir a partir das flags de grupo de cada visita pendente: etiquetas de nome para os grupos com `printNametag`, mais uma etiqueta de retirada da família se alguma visita atingiu um grupo `parentPickup`. Visitas com `checkinType` `volunteer` são ignoradas por `LabelHelper.selectChildVisits()`, então um voluntário da creche em uma sala de Retirada dos Pais nunca dispara uma etiqueta de retirada. O código de segurança da resposta de check-in vai para as etiquetas de nome das crianças e para a etiqueta de retirada; etiquetas de nome de adultos são impressas sem código. Se a igreja tiver modelos, `LabelRenderer` (`src/helpers/LabelRenderer.ts`) transforma os blocos e um contexto de campos em um documento HTML independente; caso contrário, são usadas as etiquetas HTML embutidas em `B1Checkin/assets/labels/`, com substituição de marcadores.

Os códigos de barras são gerados como SVG inline por codificadores em TypeScript puro em `B1Checkin/src/helpers/barcode.ts` — tabelas de padrões de Code 39 e tabelas de largura de Code 128 (conjunto B com checksum mod-103), além de QR pelo pacote `qrcode`. **Esses codificadores são intencionalmente duplicados no B1Admin** (`LabelEditor.tsx` incorpora as mesmas tabelas, indicado em um comentário de código), para que as pré-visualizações do designer sejam fiéis, pixel a pixel, à saída do quiosque; uma mudança em um dos lados precisa ser replicada no outro.

O pipeline de impressão (`src/components/PrintUI.tsx`) renderiza cada etiqueta HTML em um `WebView`, captura-a como JPG com `react-native-view-shot` e entrega as URIs das imagens ao módulo Expo nativo **printer-helper** (`B1Checkin/modules/printer-helper/`). O módulo expõe `scan()`, `checkInit()`, `printUris()` e eventos de status, com um provedor por marca em ambas as plataformas:

| Marca | Android | iOS | Observações |
|-------|---------|-----|-------|
| Brother | `BrotherProvider.kt` (Brother print SDK) | `BrotherProvider.swift` (`BRLMPrinterKit.xcframework`) | Impressoras de rede da série QL (QL-800/810W/820NWB/1100/1110NWB…), etiquetas recortadas 29×90, o padrão recomendado |
| Zebra | `ZebraProvider.kt` (Link-OS SDK) | `ZebraProvider.swift` + `ZebraBridge` | Descoberta na rede + impressão de imagem via TCP/ZPL |

A seleção de impressora fica em `app/printers.tsx` (a varredura de rede retorna entradas `brand~model~ip`; a escolha é persistida no AsyncStorage), e `src/helpers/PrinterLog.ts` mantém um log diagnóstico no dispositivo, exibido por um indicador de status ao vivo no cabeçalho do quiosque.

## Cadastro de visitantes

Dois caminhos criam uma pessoa durante o check-in:

- **No quiosque** — o "Adicionar visitante" da tela da família abre `B1Checkin/app/addGuest.tsx`, que primeiro busca `GET /membership/people/search?term=` por uma correspondência de não membro e, caso contrário, cria uma nova com `POST /membership/people`, vinculada à família atual. O visitante então segue pela atribuição de grupo como qualquer membro.
- **Autoatendimento via QR** — quando a configuração da igreja `enableQRGuestRegistration` está ativada (configurada nas configurações de Check-In do B1Admin e lida de `GET /membership/settings/public/{churchId}`), a tela de busca do quiosque mostra um código QR apontando para `https://{subdomain}.b1.church/guest-register?serviceId=`. Essa página do B1App (`src/app/[sdSlug]/(public)/guest-register/page.tsx`) permite que uma família visitante se cadastre pelo próprio celular pelo endpoint anônimo `POST /membership/people/guest-register`, mantendo a fila do quiosque andando. A folha do QR também tem um botão **Cadastrar aqui** que abre a mesma página no quiosque (`app/guestRegister.tsx`) em um `WebView` anônimo, sem cache; `src/helpers/GuestRegisterHelper.ts` monta a URL tanto para o QR quanto para o WebView e bloqueia a navegação para fora de `https://{subdomain}.b1.church/guest-register`. A tela volta para a busca ao tocar em **Concluído**, ao voltar, ou após 120 segundos de inatividade (a digitação no formulário é repassada do WebView como atividade), desmontando o WebView para que os dados de uma família nunca cheguem à próxima.

A inscrição por QR é controlada pelas configurações da igreja salvas no cartão **Cadastro de visitantes por QR** do B1Admin (`src/mobile/CheckInPage.tsx`):

| Configuração | Visibilidade | Finalidade |
|---|---|---|
| `enableQRGuestRegistration` | pública | Chave de ativação do QR do quiosque e dos endpoints anônimos |
| `guestRegistrationFields` | pública | Mapa JSON de `email`, `phone`, `address`, `birthDate`, `gender`, `maritalStatus`, `grade`, `comments` → `"off"` / `"optional"` / `"required"`. Padrão: e-mail e telefone opcionais, o restante desativado. Nome e sobrenome são sempre obrigatórios |
| `guestRegistrationImage` | pública | URL da foto de cabeçalho; o B1App a exibe em 16:9 no lugar do ícone no formulário e na tela de confirmação |
| `guestRegistrationGroupId` | privada | Grupo ao qual todo cadastro é adicionado (os visitantes nunca veem nem escolhem) |
| `guestRegistrationRecordAttendance` | privada | `"true"` para também registrar a presença nesse grupo |

`B1App/src/components/checkin/GuestRegister.tsx` busca a lista de campos do endpoint anônimo `GET /membership/people/guest-register/options?churchId=` e renderiza apenas os campos incluídos (e-mail, telefone, estado civil e endereço no contato principal; data de nascimento, gênero e série por membro; uma caixa de comentários), enviando somente esses. O servidor reaplica a lista em `GuestRegistrationHelper.sanitize()` — campos desativados são descartados, valores obrigatórios ausentes ou fora da lista resultam em 400 — antes de `PersonHelper.registerGuestHousehold()` criar uma nova família (sem deduplicação por e-mail), com cada membro como `membershipStatus: "Visitor"`, emitindo `person.created` para cada um. Depois disso, as falhas são registradas em log em vez de retornadas: os membros são adicionados ao grupo configurado (`group.member.added`); se o registro de presença estiver ativo, `AttendanceModuleGateway.recordAttendance()` marca cada membro como presente em cada horário de culto do grupo que tenha agenda e cuja janela de check-in (`CheckinGateHelper.isServiceTimeOpen`) esteja aberta neste momento, criando a sessão da data local da igreja, se necessário — horários sem agenda e cadastros fora da janela não registram nada; e os comentários viram uma conversa oculta de anotação na pessoa sobre o chefe da família (autor da mensagem "Cadastro de visitante"), vinculada por `person.conversationId`.

## Páginas relacionadas

- [Endpoints de Presença](../api/endpoints/attendance) -- Superfície REST completa para campi, cultos, sessões, visitas e visitas por sessão
- [Endpoints de Membership](../api/endpoints/membership) -- Pessoas, famílias e grupos
- [Webhooks](../api/webhooks) -- Os eventos `session.created`, `attendance.recorded` e `attendance.checkout`
- [Estrutura de Módulos](../api/module-structure) -- Como o módulo de presença é organizado no servidor
