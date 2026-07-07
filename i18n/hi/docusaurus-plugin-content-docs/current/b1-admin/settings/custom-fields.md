---
title: "कस्टम फील्ड्स"
---

# कस्टम फील्ड्स

<div class="article-intro">

**कस्टम फील्ड्स** आपको हर person record पर अपनी स्वयं की जानकारी को track करने देते हैं -- चीजें जिनके लिए B1 के पास एक built-in field नहीं है, जैसे एक background-check expiration date, एक T-shirt size, या एक baptism class status। आप एक field को एक बार Settings में define करते हैं, फिर प्रत्येक person के profile पर एक value fill करते हैं और इस पर search करते हैं या lists बनाते हैं। यह एक single piece of custom data store करने के लिए केवल एक People form बनाने के पुराने workaround को replace करता है।

</div>

<div class="prereqs">
<h4>शुरू करने से पहले</h4>

- Fields को define करने के लिए और values fill करने के लिए आपको **People** edit permission की आवश्यकता है, और **Settings** area को access करने की। Anyone with People view permission values को देख सकते हैं। [Roles & Permissions](./roles-permissions.md) देखें।
- Decide करें कि आप क्या track करना चाहते हैं और कौन सा type best fit करता है (text, एक number, एक date, एक yes/no answer, या एक pick-list) शुरू करने से पहले।

</div>

## Custom Fields को खोलना

B1 Admin में, बाईं sidebar में **Settings** पर जाएं और **Custom Fields** card को select करें। आप सीधे **/settings/custom-fields** पर जा सकते हैं। आप हर field की एक list देखेंगे जिसे आपने define किया है, इसका **Name** और **Field Type** दिखाते हुए। यदि आपने अभी तक कोई create नहीं किया है, panel *"No custom fields have been added yet."* पढ़ता है।

## एक Field जोड़ना

1. **Add Field** को click करें।
2. Editor में जो दाईं ओर खुलता है, एक **Name** enter करें -- यह label है जो staff को person profiles पर और search में दिखाई देगा (उदाहरण के लिए, *Background check expires*)।
3. एक **Field Type** चुनें:
   - **Textbox** -- free-form short text।
   - **Whole Number** -- numbers without decimals (उदाहरण के लिए, एक count)।
   - **Decimal** -- numbers जो decimals को include कर सकते हैं।
   - **Date** -- एक calendar date।
   - **Yes/No** -- एक simple yes-or-no answer।
   - **Multiple Choice** -- एक pick-list। जब आप इस type को choose करते हैं, एक **choices editor** दिखाई देता है ताकि आप प्रत्येक option को add कर सकें जो लोग select कर सकते हैं।
4. **Save** को click करें।

Field अब हर person के profile पर उपलब्ध है।

:::info
Field types [form questions](../forms/creating-forms.md) के लिए उपयोग किए जाने वाले same set हैं, तो values B1 भर में consistently behave करते हैं।
:::

## एक Field को Edit करना

List में किसी भी field row को click करें इसे editor में फिर से खोलने के लिए। Name, type, या choices change करें और **Save** को click करें।

:::warning
एक field के **Field Type** को change करना जिसके पास पहले से values हैं (उदाहरण के लिए, Textbox से Date तक) previously entered values को एक format में छोड़ सकता है जो अब नए type से match नहीं करता। एक बार staff ने field को fill करना शुरू कर दिया तो types को सावधानी से change करें।
:::

## एक Field को Delete करना

संपादन के लिए एक field को खोलें और **Delete** को click करें। आपको confirm करने के लिए पूछा जाएगा: *"Are you sure you wish to delete this custom field? Its stored values will also be removed."* एक field को delete करना permanently इसे **और इसके लिए stored हर value को** सभी लोगों पर remove करता है -- यह undo नहीं किया जा सकता।

## एक Person पर Values Fill करना

एक बार कम से कम एक custom field exist करने के बाद, इसके values built-in details के साथ सही अगल-बगल रहते हैं प्रत्येक person के record पर -- आप उन्हें **Personal Details** में view करते हैं और same form पर edit करते हैं जो आप person की rest जानकारी के लिए use करते हैं। जब तक आप अपनी पहली field define नहीं करते तब तक कुछ भी extra appear नहीं होता।

1. **People** में एक person के record को खोलें।
2. **Personal Details** section में, **Edit** (pencil) button को click करें।
3. Edit form के bottom पर **Custom Fields** area पर scroll करें और प्रत्येक field के लिए एक value fill करें। प्रत्येक field input दिखाता है जो इसके type से match करता है -- Date fields के लिए एक date picker, Yes/No fields के लिए एक yes/no dropdown, Multiple Choice के लिए एक pick-list, आदि।
4. **Save** को click करें। आपके custom-field values person के बाकी details के साथ save होते हैं।

Profile पर वापस, कोई भी field जिसके पास एक value है अब **Personal Details** section में दिखाई देता है (Yes/No answers *Yes* या *No* के रूप में read करते हैं, और Multiple Choice option का label दिखाता है)। Blank किए गए fields simply hidden हैं। एक value को remove करने के लिए, person को edit करें, field को clear करें, और save करें -- एक empty value record से delete किया जाता है बजाय blank के रूप में stored होने के।

:::tip
Classic use case volunteer safety है: एक **Date** field create करें *Background check expires* कहा जाता है, प्रत्येक volunteer के date को record करें, फिर एक [Saved List](../people/lists.md) build करें जो कोई भी flag करता है जिसका date pass हो गया है।
:::

## Custom Fields पर Searching और Building Lists

कस्टम fields fully searchable हैं:

1. **People** page पर, [Advanced Search](../people/searching-people.md) को खोलें।
2. **Custom Fields** category को expand करें।
3. Field को check करें जिस पर आप filter करना चाहते हैं, एक operator choose करें, और एक value enter करें। Operators offered field के type से match करते हैं:
   - **Textbox** -- contains, equals, starts with, ends with।
   - **Whole Number / Decimal** -- equals, greater than, greater than or equal, less than, less than or equal।
   - **Date** -- equals, after (greater than), before (less than)।
   - **Yes/No** -- equals Yes या No।
   - **Multiple Choice** -- equals या contains एक choices में से।

कोई भी custom-field search को एक [List](../people/lists.md) के रूप में save करें। Lists live queries हैं, तो एक list *Background check expires is before today* पर built हर बार जब आप इसे खोलते हैं तो हर person को फिर से check करता है -- कोई manual upkeep नहीं।

## Merge पर क्या होता है

जब आप [two person records को merge करते हैं](../people/adding-people.md), custom-field values स्वचालित रूप से carry over करते हैं। Person जिसे आप keep करते हैं अपने स्वयं के values को hold करता है; किसी भी field के लिए जहां केवल removed person के पास value था, वह value copy किया जाता है ताकि कुछ भी lost न हो।

## संबंधित लेख

- [Searching People](../people/searching-people.md) -- advanced search, including the Custom Fields category
- [Saved Lists](../people/lists.md) -- एक custom-field search को save करें और इसे फिर से live करें
- [Roles & Permissions](./roles-permissions.md) -- कौन fields को define कर सकते हैं और values को edit कर सकते हैं
- [Creating Forms](../forms/creating-forms.md) -- multi-question data collection के लिए जहां एक full form single fields से बेहतर fit करता है
