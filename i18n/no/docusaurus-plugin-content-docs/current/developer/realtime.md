---
title: "Sanntidsarkitektur"
---

# Sanntidsarkitektur

:::info Teknisk dokumentasjon
Denne siden inneholder teknisk arkitekturdokumentasjon.
For fullstendig engelsk dokumentasjon, se [Real-time Architecture](/docs/developer/realtime) (engelsk versjon).
:::

<div class="article-intro">

ChurchApps bruker ett WebSocket-basert leveringsrammeverk for hver sanntidsflate -- gruppechat, private meldinger, innholdsnotater, direktestrømchat og tilstedeværelse/fremmøte. Denne siden dokumenterer protokollen, serveren og klientprimitivene som forbrukere bruker.

</div>

## Oversikt

Protokollen har tre deler:

1. **Én vedvarende WebSocket** per nettleserfane, åpnet av \`SocketHelper\`.
2. **Tilkoblingsrader** (\`POST /messaging/connections\`) registrert i \`connections\`-tabellen.
3. **Serverside fan-out** av \`DeliveryHelper.sendConversationMessages()\`.

For fullstendig dokumentasjon på engelsk, se [Real-time Architecture](/docs/developer/realtime).
