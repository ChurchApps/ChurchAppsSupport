---
title: "B1 Admin 웹사이트 시작하기"
sidebar_label: "초기 설정"
description: "B1 Admin 교회 웹사이트를 설정하세요. 하위 도메인이나 사용자 지정 도메인을 연결하고, 홈 페이지를 만들고, 브랜드 색상과 로고를 고르고, 탐색을 구성합니다."
---

# 초기 설정

<div class="article-intro">

모든 B1 계정에는 바로 사용할 수 있는 웹사이트가 포함되어 있습니다. 이 가이드는 교회 도메인을 설정하고, 사이트의 모양을 구성하고, 첫 페이지를 만들고, 탐색을 정리하는 과정을 안내합니다.

</div>

<div class="prereqs">
<h4>시작하기 전에</h4>

- 관리자 접근 권한이 있는 B1.church 계정이 필요합니다
- 사용자 지정 도메인을 사용한다면, DNS 제공업체 로그인 정보(예: GoDaddy, Cloudflare, AWS)를 준비하세요
- 가장 좋은 결과를 얻으려면 투명한 배경의 PNG 형식으로 교회 로고를 준비하세요

</div>

## 도메인 설정하기 {#setting-up-your-domain}

교회는 자동으로 B1.church의 하위 도메인(예: `yourchurch.b1.church`)을 받습니다. 자체 사용자 지정 도메인을 B1 사이트에 연결할 수도 있습니다.

1. admin.b1.church를 방문하거나 프로필 드롭다운에서 **Switch App**(앱 전환)을 선택하여 **B1.church Admin**으로 이동하세요.
2. [점프 메뉴](../introduction.md#getting-around-with-the-jump-menu)(왼쪽 상단의 검색창)를 열고 **Settings**(설정)를 펼친 다음 **Settings**를 클릭하세요.
3. **Church Information**(교회 정보) 섹션을 열어 하위 도메인을 확인하세요. 공백 없이 짧고 알아보기 쉬운 이름으로 설정하세요.
4. 사용자 지정 도메인을 사용하려면 DNS 제공업체(GoDaddy, Cloudflare, AWS 등)에 로그인하고 두 개의 레코드를 추가하세요.
   - 루트 도메인을 `3.23.251.61`로 가리키는 **A 레코드**
   - `www`를 `proxy.b1.church`로 가리키는 **CNAME 레코드**
5. B1.church Admin으로 돌아가 같은 설정 페이지의 **Domains**(도메인) 섹션을 열고, 사용자 지정 도메인을 목록에 추가한 다음 **Add**(추가)와 **Save**를 클릭하세요. 몇 분 안에 사용자 지정 도메인으로 사이트에 접속할 수 있습니다.

:::tip
설정 옵션이 보이지 않는다면, 교회 계정을 설정한 사람에게 "Edit Church Settings"(교회 설정 편집) 권한을 부여해 달라고 요청하세요. 자세한 내용은 [역할 및 권한](../settings/roles-permissions.md)을 참고하세요.
:::

## 첫 페이지 만들기 {#creating-your-first-page}

1. B1 Admin에서 [점프 메뉴](../introduction.md#getting-around-with-the-jump-menu)(왼쪽 상단의 검색창)를 열고 **Website**(웹사이트)를 펼친 다음 **Pages**(페이지)를 클릭하세요.
2. 오른쪽 상단의 **Add Page**(페이지 추가)를 클릭하세요.
3. 페이지 유형으로 **Blank**(빈 페이지)를 선택하고, **Page Title**(페이지 제목)에 "Home"(홈)을 입력한 다음 **Save**를 클릭하세요.
4. 새 페이지 행의 **Page Settings**(페이지 설정)를 클릭하고, 홈 페이지의 **URL Path**(URL 경로)를 `/`(글자 없이 슬래시 하나)로 바꾸세요. 다른 페이지는 `/page-name` 형식을 사용합니다.
5. **Edit Content**(콘텐츠 편집)를 클릭하여 만들기 시작하세요. 모든 페이지는 **Section**(섹션)으로 시작해야 합니다. 섹션은 다른 모든 요소를 담는 컨테이너입니다. **Add Content**(콘텐츠 추가)를 클릭하고 **Section**을 페이지로 드래그한 다음, 미리 만들어진 섹션 레이아웃이나 **Blank Section**(빈 섹션)을 고르세요.
6. 섹션을 추가한 후 다시 **Add Content**를 클릭하여 텍스트, 이미지, 영상, 카드, 양식 등을 섹션 안으로 드래그해 넣으세요.

:::info
페이지와 탐색 작업에 대한 자세한 방법은 [페이지 관리](./managing-pages.md)를 참고하세요. 시각적 편집기 전체 가이드는 [페이지 편집기 사용하기](./page-editor.md)를 참고하세요.
:::

## 사이트 모양 구성하기 {#configuring-site-appearance}

1. 점프 메뉴에서 **Website > Appearance**(웹사이트 > 모양)를 선택하세요.
2. **Color Palette**(색상 팔레트)를 사용하여 브랜드 색상을 설정하세요. 기본 밝은 색, 강조 색, 어두운 색과 기본 및 보조 버튼 색상이 포함됩니다. 그다음 **Save Palette**(팔레트 저장)를 클릭하세요.
3. **Fonts**(글꼴) 아래에서 글꼴 탐색기로 제목 글꼴과 본문 글꼴을 고르고 **Save Fonts**(글꼴 저장)를 클릭하세요.
4. Style Settings의 **Logo**(로고)에서 교회 로고를 업로드하세요. 밝은 배경용과 어두운 배경용 버전을 모두 제공한 다음 **Save Changes**(변경 사항 저장)를 클릭하세요.
5. **Site Footer**(사이트 바닥글)를 클릭하여 블록 편집기에서 바닥글을 열고, 교회의 연락처 정보와 링크를 추가하세요.

:::info
모양에서 바꾼 내용은 웹사이트 전체에 적용됩니다. 각 설정에 대한 자세한 방법은 [모양](./appearance.md) 페이지를 참고하세요.
:::

## 탐색 설정하기 {#setting-up-navigation}

탐색 링크는 웹사이트 페이지 보기에 나타납니다. 이를 정리하려면:

1. **Main Navigation**(주 탐색) 패널에서 **Add**(추가)를 클릭하고, **Link Text**(링크 텍스트)와 페이지 경로(예: `/about`)를 **URL**로 입력한 다음 **Save**를 클릭하세요.
2. 링크를 드래그 앤 드롭하여 순서를 바꾸거나, 상위 항목 아래에 중첩하세요.
3. 사이트를 미리 보기 하여 탐색이 올바르게 보이는지 확인하세요.

## 다음 단계 {#next-steps}

- [페이지 관리](./managing-pages.md) -- 페이지와 탐색을 자세히 다루는 방법 알아보기
- [모양](./appearance.md) -- 사이트의 색상, 글꼴, 레이아웃을 세부적으로 조정하기
- [파일](./files.md) -- 웹사이트용 이미지와 문서 업로드하기
