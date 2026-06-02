---
title: "Zapier"
---

# Zapier

<div class="article-intro">

B1.church上的官方Zapier应用让Zap对教会中的事件（新人、新捐献、新小组成员等）作出反应，并将记录写回B1。无需编码，无需基础设施——您在Zapier的拖放编辑器中进行配置，粘贴API密钥，然后打开Zap即可。

</div>

<div class="prereqs">
<h4>开始前</h4>

- 一个[Zapier](https://zapier.com)账户（免费层足以用于少量Zaps）
- 一位在B1Admin中具有**编辑设置**权限的教会管理员（您将创建API密钥）
- 一个想法，了解您想要做什么——例如"当B1中添加人员时，将其添加到我的Mailchimp列表"

</div>

## 触发器和操作

| 类型 | 内容 | B1事件/端点 |
|---|---|---|
| **触发器** | 新人员 | `person.created` |
| **触发器** | 更新的人员 | `person.updated` |
| **触发器** | 新捐献 | `donation.created` |
| **触发器** | 新小组成员 | `group.member.added` |
| **触发器** | 新表单提交 | `form.submission.created` |
| **操作** | 创建人员 | 添加新人员 |
| **操作** | 添加捐献 | 记录捐献 |
| **操作** | 添加小组成员 | 将人员添加到小组 |
| **搜索** | 查找人员 | 按名称或电子邮件查找人员 |

可以将这些与Zapier支持的7000多个应用中的任何一个自由组合。

## 设置

### 1. 创建B1 API密钥

1. 在B1Admin中，转到**设置→开发者→API密钥**。
2. 点击**新API密钥**，给它一个名称，如"Zapier"，然后选择Zap需要的范围。
3. **重要：** Zapier触发器在您打开Zap时代表您注册一个webhook，这需要**`settings:write`**范围。如果任何Zap使用B1触发器，始终包括`settings:write`。
4. 同时授予操作需要的范围——例如"添加捐献"操作需要`donations:write`，"创建人员"需要`people:write`。
5. 保存。完整的`cak_…`密钥仅显示**一次**——复制它。

### 2. 将Zapier连接到B1

1. 在Zapier中，创建一个新Zap。
2. 当您首次为B1选择触发器或操作时，Zapier会要求您**登录B1.church**。
3. 粘贴第1步中的API密钥，然后点击**是，继续**。Zapier将对其进行验证。

该连接被保存在Zapier中，并被您账户上的每个Zap重复使用。

### 3. 构建Zap

选择一个触发器，然后添加一个或多个操作步骤。下面是示例。

## 常见配方

### 将新B1人员添加到Mailchimp

- **触发器** — B1：新人员
- **操作** — Mailchimp：添加/更新订户。将B1的`name__first`、`name__last`、`contactInfo__email`映射到Mailchimp的"名字/姓氏/电子邮件"字段。

### 将捐献发布到Slack频道，显示比内置连接器更丰富的卡片

- **触发器** — B1：新捐献
- **操作** — Slack：发送频道消息。组合任何布局——按钮、附件等——内置[Slack连接器](./slack-discord)无法实现。

### 将新小组成员添加到Google Group

- **触发器** — B1：新小组成员（过滤到特定`groupId`）
- **操作** — 按Zapier过滤：仅在B1小组是您关心的那个时继续
- **操作** — B1：查找人员（使用触发器的`personId`获取电子邮件）
- **操作** — Google Groups：添加成员

### 将表单提交转发到项目跟踪器

- **触发器** — B1：新表单提交
- **操作** — Notion / Linear / Asana / Trello：创建页面/问题/任务

## 触发器在后台的工作原理

触发器是**REST hooks**，而不是轮询——Zapier不会每15分钟ping一次B1。当您打开Zap时，Zapier会要求B1注册一个指向私人Zapier URL的webhook；当事件发生时，B1会将信封POST到Zapier，您的Zap在**几秒内**启动。关闭Zap，Zapier会要求B1删除webhook——没有孤立的订阅。

这意味着触发器仅对打开Zap**之后**发生的事件触发。没有回填——打开Zap不会重放昨天的捐献。

## 限制和注意事项

- **具有相同触发器的多个Zaps** 每个都注册自己的B1 webhook——没有冲突，但如果您检查**设置→开发者→Webhooks**并想知道为什么有三行相同的`Zapier — donation.created`行，值得了解。
- **Zap设置中的测试数据** ——当您构建Zap时，Zapier会要求提供示例数据来映射字段。如果有的话，它将从B1拉取最近的匹配事件；否则它从应用定义中使用合成样本。
- **操作失败显示为Zap错误** 在Zapier的任务历史中。常见原因：API密钥缺少正确的范围（例如"添加捐献"操作需要`donations:write`）。用正确的范围重新生成密钥，然后在Zapier中重新连接。
- **出站API调用配额** ——来自操作的每个B1 API调用都计入您的Zapier任务配额，而不是B1的任何东西。

## 故障排除

- **连接时"身份验证失败"** ——API密钥错误、已撤销或缺少Zap需要的范围。在B1Admin中用至少`settings:write`加上Zap接触的任何资源范围重新生成它，然后更新连接。
- **触发器永远不会触发** ——确认webhook实际上已注册：在B1Admin中，**设置→开发者→Webhooks**现在应显示一行名为"Zapier — &lt;event&gt;"。如果不存在，API密钥可能在您打开Zap时缺少`settings:write`。修复密钥，关闭并打开Zap。
- **触发器触发两次** ——如果Zapier的确认丢失，Zapier偶尔会重新交付。如果您需要严格的去重，请在唯一id（例如人员的`id`）上使用"按Zapier过滤"步骤。

## 另请参阅

- [Make](./make) — 相同的模式，不同的平台
- [Slack和Discord](./slack-discord) — 更简单的聊天通知，无需Zapier
- [Webhooks（开发者参考）](/docs/developer/api/webhooks)
