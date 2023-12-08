---
title: Sheets
description: Add support for Spreadsheets to store data.
mod: plugins/sheets.ts
tags:
  - data_format
---

## Description

This plugin use [SheetJS](https://sheetjs.com/) to read any spreadsheet document
as _data files, so you can use this data to render your pages.

## Installation

Import this plugin in your `_config.ts` file to use it:

```js
import lume from "lume/mod.ts";
import sheets from "lume/plugins/sheets.ts";

const site = lume();

site.use(sheets());

export default site;
```

## Formats

By default, it loads the `.xlsx`, `.numbers` and `.csv` files. You can use any
extension supported by SheetJS. See the
[file formats documentation](https://docs.sheetjs.com/docs/miscellany/formats)
for more info.

```js
import lume from "lume/mod.ts";
import sheets from "lume/plugins/sheets.ts";

const site = lume();

site.use(sheets({
  extensions: [".ods", "rtf", "xls"],
}));

export default site;
```

## Sheet mode

The plugin can work in two sheet modes: `first` and `auto`.

### First

In the `first` sheet mode, only the first sheet found in the document is
returned, even if it contains more. For example a file stored in
`_data/people.xlsx` containing two sheets, only the first one is returned:

```vento
<table>
  <tr>
    {{ for key, column of people[0] }}
      <th>{{ key }}</th>
    {{ /for }}
  </tr>

  {{ for row of people }}
    <tr>
      {{ for key, column of row }}
        <td>{{ column }}</td>
      {{ /for }}
    </tr>
  {{ /for }}
</table>
```

### Auto

If the `sheets` value is set to `auto`, it returns all sheets found in the
document and you have to use the sheet name to access to its content.

For example, if the file `_data/people.xlsx` contains the sheets "Women" and
"Men", you can access to the data in this way:

```vento
<h1>Women</h1>
<ul>
  {{ for person of people["Women"] }}
    <li>
      {{ person.name }} - {{ person.surname }}
    </li>
  {{ /for }}
</ul>

<h1>Men</h1>
<ul>
  {{ for person of people["Men"] }}
    <li>
      {{ person.name }} - {{ person.surname }}
    </li>
  {{ /for }}
</ul>
```

If the spreadsheet **contain only one sheet,** you don't have to access to the
data by the name. In this case **it works exactly as the "first" mode.**

The default mode is `auto`, to change it to `first`:

```js
import lume from "lume/mod.ts";
import sheets from "lume/plugins/sheets.ts";

const site = lume();

site.use(sheets({
  sheets: "first", // Return the first sheet found in each document
}));

export default site;
```
