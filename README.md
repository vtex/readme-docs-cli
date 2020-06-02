readme-docs-cli
===============

Readme.com CLI

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/readme-docs-cli.svg)](https://npmjs.org/package/readme-docs-cli)
[![Downloads/week](https://img.shields.io/npm/dw/readme-docs-cli.svg)](https://npmjs.org/package/readme-docs-cli)
[![License](https://img.shields.io/npm/l/readme-docs-cli.svg)](https://github.com/gris/readme-docs-cli/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g readme-docs-cli
$ readme COMMAND
running command...
$ readme (-v|--version|version)
readme-docs-cli/0.4.2 darwin-x64 node-v12.14.0
$ readme --help [COMMAND]
USAGE
  $ readme COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`readme bulk-category-change CSVFILEPATH`](#readme-bulk-category-change-csvfilepath)
* [`readme change-category DOCSLUG NEWCATEGORYSLUG`](#readme-change-category-docslug-newcategoryslug)
* [`readme help [COMMAND]`](#readme-help-command)

## `readme bulk-category-change CSVFILEPATH`

Change category of docs in bulk by reading a CSV file

```
USAGE
  $ readme bulk-category-change CSVFILEPATH

OPTIONS
  -h, --help  show CLI help

EXAMPLE
  $ readme bulk-category-change example.csv
```

_See code: [src/commands/bulk-category-change.ts](https://github.com/vtex/readme-docs-cli/blob/v0.4.2/src/commands/bulk-category-change.ts)_

## `readme change-category DOCSLUG NEWCATEGORYSLUG`

Change category of a documentation

```
USAGE
  $ readme change-category DOCSLUG NEWCATEGORYSLUG

OPTIONS
  -h, --help  show CLI help

EXAMPLE
  $ readme change-category "vtex_io-documentation_customizing-your-stores-typography" "Style Recipes"
```

_See code: [src/commands/change-category.ts](https://github.com/vtex/readme-docs-cli/blob/v0.4.2/src/commands/change-category.ts)_

## `readme help [COMMAND]`

display help for readme

```
USAGE
  $ readme help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.0.1/src/commands/help.ts)_
<!-- commandsstop -->
