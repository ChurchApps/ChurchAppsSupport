---
title: "사용자 지정 도메인"
description: "B1 Admin에서 DNS 레코드를 설정하고 설정에서 도메인을 추가하여, www.yourchurch.org와 같은 자체 도메인이 B1 사이트를 가리키도록 하세요."
---

# 사용자 지정 도메인

<div class="article-intro">

자체 도메인(예: **`www.yourchurch.org`**)을 B1 사이트에 연결하면, 방문자가 기본 yourchurch.b1.church 주소 대신 교회의 실제 웹 주소로 사이트에 접속할 수 있습니다.

</div>

## 교육 동영상 {#training-video}

<YouTube id="L5yaDusHts8" title="B1에서 사용자 지정 도메인 연결하기" next="B1에서 실시간 스트리밍 설정하기" nextUrl="/docs/b1-admin/sermons/live-streaming" />

## 1단계 — 먼저 DNS 레코드 추가하기 {#step-1--add-the-dns-record-first}

B1에서 도메인을 추가하기 전에, 도메인 등록 기관(GoDaddy, Namecheap, Cloudflare 등)에서 도메인이 B1 서버를 가리키도록 설정해야 합니다.

다음 레코드 중 하나를 추가하세요. CNAME이 권장됩니다.

| 유형 | 호스트 | 값 |
|------|------|-------|
| CNAME | `www` | `proxy.b1.church` |
| A | `yourchurch.org` | `3.23.251.61` |

`www` 주소에는 **CNAME**을 사용하세요. 등록 기관이 www가 없는 루트(apex) 도메인에 대한 CNAME을 지원하지 않거나, 루트 도메인도 작동하기를 원한다면 **A 레코드**를 사용하세요.

DNS 변경 사항이 적용되는 데 몇 분에서 몇 시간이 걸릴 수 있습니다.

## 2단계 — B1에서 도메인 추가하기 {#step-2--add-the-domain-in-b1}

DNS가 B1을 가리키도록 설정되면:

1. B1 Admin에서 **Settings**(설정)로 이동하세요.
2. 왼쪽 목록에서 **Domains**(도메인)를 클릭한 다음 **Domains** 섹션에서 **Edit**를 클릭하세요.
3. 필드에 도메인을 입력하고 **Save**를 클릭하세요.

먼저 **+** 버튼을 누를 필요는 없습니다. 필드에 입력된 도메인은 저장할 때 추가됩니다. 저장하기 전에 여러 도메인을 목록에 추가하려면 **+**(또는 **Enter** 키)를 사용하세요. 도메인만 입력하세요(예: `www.yourchurch.org`). `https://`나 페이지 경로는 입력하지 마세요.

교회에 웹사이트가 둘 이상 있다면, 각 도메인에는 **Website**(웹사이트) 드롭다운도 생깁니다. **Main Website**(기본 웹사이트)로 두거나, 그 도메인이 열어야 할 사이트를 선택하세요.

도메인을 삭제하려면 해당 행의 삭제 아이콘을 클릭한 다음 **Save**를 클릭하세요.

B1이 SSL을 자동으로 처리하므로, 인증서를 따로 구매할 필요가 없습니다.

:::warning
DNS 레코드가 아직 설정되지 않아도 B1은 도메인을 저장합니다. 하지만 DNS가 B1을 가리키기 전까지는 도메인에서 사이트가 열리지 않으며, B1은 SSL 인증서를 발급할 수 없습니다. DNS를 먼저 설정하세요. 다른 교회가 이미 사용 중인 도메인은 추가할 수 없습니다.
:::

## 작동 여부 확인하기 {#checking-if-its-working}

저장한 후 브라우저에서 도메인에 접속하세요. B1 사이트가 열리면 완료된 것입니다. 오류가 보이면 DNS가 아직 전파되는 중일 수 있으니, 몇 분 기다린 후 다시 시도하세요.

[dnschecker.org](https://dnschecker.org)에서 DNS 전파 상태를 확인할 수도 있습니다. 도메인을 검색한 다음 CNAME 또는 A 레코드가 나타나는지 확인하세요.
