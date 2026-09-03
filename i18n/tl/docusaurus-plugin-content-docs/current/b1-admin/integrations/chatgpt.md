---
title: "ChatGPT"
---

# ChatGPT

<div class="article-intro">

Ikonekta ang ChatGPT ng OpenAI sa data ng iyong B1 ng simbahan at hayaan itong gumawa ng mabigat na pag-angat. Kapag naka-konekta, makikita ng ChatGPT ang iyong mga buhay na rekord ng simbahan at makakatulong sa iyo na gawin ang mga bagay na magiging maraming hakbang sa B1 Admin — o na hindi mo kailanman maisip kung paano gawin.

**Ang ilang bagay na maaari mong tanungin na gawin:**
- *"I-setup ang Sunday School classrooms at ilagay ang bawat guro sa tamang kwarto base sa kanilang grupo"*
- *"Ipakita sa akin ang lahat na dumalo noong nakaraang linggo ngunit hindi pa nakatalagang naka-assign sa isang maliit na grupo"*
- *"Ihayag ang buwan na ito na pagbibigay ayon sa fund"*
- *"Sino ang aming mga pinakabagong miyembro at nag-follow up na ba kami sa kanila?"*
- *"Hindi ko maintindihan kung paano gawin ang X sa B1 — maaari mo ba akong gabayan o gawin ito para sa akin?"*

Ang ChatGPT ay nakakakuha ng mga sagot at tumatagal ng mga aksyon direkta mula sa iyong data ng B1, na-scope sa iyong simbahan lamang.

:::tip Inirerekomenda: Claude Code
Para sa pinakamahusay na MCP experience, ang [Claude Code](./claude) ay ang inirerekomendadong kliyente — ang setup ay nangangailangan ng isang command at gumagana out of the box. Ang ChatGPT ay gumagana din at isang mahusay na pagpipilian kung ang iyong koponan ay gumagamit na nito.
:::

Dalawang landas ay sinusuportahan: ang **MCP Connector** (built into ChatGPT) at isang **Custom GPT** para sa mga koponan na gusto ng shareable na assistant.

</div>

<div class="prereqs">
<h4>Bago Magsimula</h4>

- Isang admin ng simbahan na may **Edit Settings** permission sa B1 Admin (kinakailangan upang lumikha ng API key)
- Isang **ChatGPT Plus, Pro, Team, o Enterprise** account

</div>

## Hakbang 1 — Lumikha ng isang API Key sa B1 Admin

Bawat koneksyon sa B1 ay gumagamit ng API key na iyong ginawa. Ang susi na ito ay nag-identify sa iyong simbahan, kumokontrol sa kung ano ang makikita ng ChatGPT, at maaaring i-revoke anumang oras.

1. Buksan ang **B1 Admin** at pumunta sa **Settings → Developer → API Keys**.
2. I-click ang **New API Key**.
3. Bigyan ng pangalan ang susi — `ChatGPT` ay gumagana nang mabuti.
4. Piliin ang mga scope (permission) na dapat magkaroon ang ChatGPT. Isang magandang nagsisimulang set para sa read-only assistant:
   - `people:read`
   - `groups:read`
   - `attendance:read`
   - `donations:read`
5. I-click ang **Save**.
6. Kopyahin ang buong susi na lumalabas — ito ay nagsisimula sa `cak_` at ipinakita **isang beses lamang**. I-paste ito sa isang ligtas na lugar.

:::tip
Kung kailanman kailangan mong i-revoke ang access ng ChatGPT, bumalik sa **Settings → Developer → API Keys** at tanggalin ang susi. Ang access ay nagtatapos kaagad.
:::

---

## Landas A — ChatGPT MCP Connector (Inirerekomenda)

Ito ang pinakasimpleng paraan upang kumonekta. Ang ChatGPT ay may built-in na "Connect to a custom MCP" dialog na gumagana direkta sa MCP server ng B1 — walang Custom GPT na kailangan.

### Kung ano ang kailangan mo

- Ang iyong `cak_…` key mula sa Hakbang 1

### Buksan ang MCP connector sa ChatGPT

Sa ChatGPT, pumunta sa **Settings → Plugins → MCPs** at i-click ang **Add → Add MCP server**.

### Punan ang dialog

I-click ang **Streamable HTTP**, pagkatapos ay gamitin ang mga halaging ito:

| Field | Value |
|---|---|
| **Name** | `B1 Church` (o kahit anong pangalan na gusto mo) |
| **Type** | **Streamable HTTP** |
| **URL** | `https://api.churchapps.org/mcp` |
| **Bearer token env var** | Iwanan blangko |
| **Headers** | Key: `Authorization` / Value: `Bearer cak_yourprefix.yoursecret` |

Para sa Value field, i-type ang salitang `Bearer`, isang puwang, pagkatapos ay i-paste ang iyong susi — lahat sa parehong kahon. Halimbawa: `Bearer cak_prefix.secret`.

I-click ang **Save**.

### Tanungin ang ChatGPT ng isang bagay

Kapag naka-konekta, magtanong lamang sa natural na wika — walang espesyal na mga command na kailangan:

- *"Gaano karaming mga tao ang nasa aming simbahan?"*
- *"Sino ang sumali sa nakaraang 30 araw?"*
- *"Aling mga grupo ang aktibo ngayon?"*
- *"Ihayag ang buwan na ito na pagbibigay ayon sa fund."*

Ang ChatGPT ay tatawag sa B1 sa likod at sasagot mula sa iyong live data.

---

## Landas B — Custom GPT na may Mga Aksyon

Ang Custom GPT ay nagbibigay-daan sa iyo na lumikha ng isang dedikadong assistant na maaaring ibahagi ng buong koponan — bubuksan nila ang isang link at magsisimulang magtanong nang walang setup sa kanilang dulo. Ito ay nangangailangan ng ChatGPT Plus, Team, o Enterprise account at humigit-kumulang 10 minuto.

### 1. Lumikha ng API key

Sundin ang Hakbang 1 sa itaas kung hindi mo pa ginawa.

### 2. Bumuo ng Custom GPT

1. Sa ChatGPT, i-click ang iyong profile → **My GPTs** → **Create a GPT**.
2. Lumipat sa **Configure** tab, bigyan ng pangalan ang GPT (hal. "B1 Assistant") at magdagdag ng mga instruksyon

Para sa kumpletong OpenAPI spec at pabagong mga detalye, mangyaring tingnan ang originalang English na dokumentasyon sa B1 Admin.
