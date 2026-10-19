---
title: "API Deployment"
---

# API Deployment

<div class="article-intro">

ChurchApps APIs को Serverless Framework का उपयोग करके AWS Lambda functions के रूप में deploy किया जाता है। यह पेज demo और production environments के लिए build, deploy और configuration workflow को कवर करता है।

</div>

<div class="prereqs">
<h4>शुरू करने से पहले</h4>

- API को स्थानीय रूप से सेट अप करें -- [Local API Setup](../api/local-setup) देखें
- अपनी मशीन पर AWS credentials कॉन्फ़िगर करें
- लक्ष्य AWS account तक आपकी पहुंच सुनिश्चित करें

</div>

## Build

APIs को एक समर्पित TypeScript config का उपयोग करके production के लिए build किया जाता है:

```bash
npm run build:prod
```

यह Lambda runtime के लिए project compile करने हेतु `tsconfig.prod.json` का उपयोग करता है।

## Deploy

Demo environment पर deploy करें:

```bash
npm run deploy-demo
```

Production पर deploy करें:

```bash
npm run deploy-prod
```

व्यवहार में API GitHub Actions द्वारा deploy होता है: **Deploy Demo** हर `main` पर push होने पर चलता है, और **Deploy Prod** मैन्युअल रूप से (workflow dispatch से) शुरू किया जाता है। अब staging environment नहीं है।

## Database Migrations

**Deploy Prod** deploy के हिस्से के रूप में लंबित database migrations लागू करता है। Production databases केवल VPC के भीतर से connections स्वीकार करते हैं, इसलिए `serverless deploy` के ठीक बाद workflow `migrate` Lambda (`api-Prod-migrate`) को invoke करता है, जो हर module की लंबित migrations चलाता है और `{ ok, environment, modules }` लौटाता है। यदि कोई module fail होता है या उसे अस्वीकार किया जाता है (जैसे migration history न होने वाला database), तो job fail हो जाता है, ताकि schema कभी code से पीछे न छूटे। **Rollback Prod** केवल Lambda code को वापस लाता है; migrations लागू रहती हैं, इसलिए उन्हें additive रखें। स्थिति जांचने या migrations को हाथ से चलाने के लिए [Server Admin -- Database Migrations](../server-admin#database-migrations) देखें।

## क्या बनता है

हर API deployment निम्न AWS Lambda functions बनाता या अपडेट करता है:

| Function | उद्देश्य |
|----------|---------|
| `web` | API Gateway के माध्यम से HTTP request handler |
| `socket` | WebSocket connection handler |
| `timer15Min` | हर 30 मिनट पर चलने वाला scheduled task (नाम ऐतिहासिक है) |
| `timerMidnight` | हर दिन आधी रात को चलने वाला scheduled task |
| `migrate` | लंबित database migrations लागू करता है; Deploy Prod workflow द्वारा invoke होता है |

## Environment Configuration

Deployed environments में configuration `.env` files के बजाय **AWS SSM Parameter Store** से पढ़ी जाती है। इससे secrets deployment package से बाहर रहते हैं, और configuration बदलने के लिए दोबारा deploy करने की ज़रूरत नहीं पड़ती।

:::warning
Production credentials कभी repository में commit न करें। सभी संवेदनशील configuration AWS SSM Parameter Store में रखी जानी चाहिए और runtime पर वहीं से पढ़ी जानी चाहिए।
:::

:::tip
`main` पर हर merge पहले demo environment पर deploy होता है। Deploy Prod चलाने से पहले अपना बदलाव वहां जांचें (उदाहरण के लिए [demo.b1.church](https://demo.b1.church) पर)।
:::

## संबंधित लेख

- **[Local API Setup](../api/local-setup)** -- development के लिए API सेट अप करना
- **[Module Structure](../api/module-structure)** -- Lambda function architecture को समझना
- **[Web App Deployment](./web-apps)** -- frontend applications को deploy करना
