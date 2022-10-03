---
title: Sheets
description: Add support for Spreadsheets to store data.
docs: plugins/sheets.ts/~/Options
tags:
  - data_format
---

## Installation

Import this plugin in your `_config.ts` file to use it:

```js
import lume from "lume/mod.ts";
import sheets from "lume/plugins/sheets.ts";

const site = lume();

site.use(sheets());

export default site;
```

## Description

This plugin use [SheetJS](https://sheetjs.com/) to read any spreadsheet document
as _data files, so you can use this data to render your pages.

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

```html
<table>
  <tr>
    {% for key, column in people[0] %}
      <th>{{ key }}</th>
    {% endfor %}
  </tr>

  {% for row in people %}
    <tr>
      {% for key, column in row %}
        <td>{{ column }}</td>
      {% endfor %}
    </tr>
  {% endfor %}
</table>
```

### Auto

If the `sheets` value is set to `auto`, it returns all sheets found in the
document and you have to use the sheet name to access to its content.

For example, if the file `_data/people.xlsx` contains the sheets "Women" and
"Men", you can access to the data in this way:

```html
<h1>Women</h1>
<ul>
  {% for person in people["Women"] %}
    <li>
      {{ person.name }} - {{ person.surname }}
    </li>
  {% endfor %}
</ul>

<h1>Men</h1>
<ul>
  {% for person in people["Men"] %}
    <li>
      {{ person.name }} - {{ person.surname }}
    </li>
  {% endfor %}
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
