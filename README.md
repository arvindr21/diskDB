diskdb
======

A Lightweight Disk based JSON Database with a MongoDB like API

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/diskdb.svg)](https://npmjs.org/package/diskdb)
[![CircleCI](https://circleci.com/gh/arvindr21/diskdb/tree/master.svg?style=shield)](https://circleci.com/gh/arvindr21/diskdb/tree/master)
[![Appveyor CI](https://ci.appveyor.com/api/projects/status/github/arvindr21/diskdb?branch=master&svg=true)](https://ci.appveyor.com/project/arvindr21/diskdb/branch/master)
[![Codecov](https://codecov.io/gh/arvindr21/diskdb/branch/master/graph/badge.svg)](https://codecov.io/gh/arvindr21/diskdb)
[![Downloads/week](https://img.shields.io/npm/dw/diskdb.svg)](https://npmjs.org/package/diskdb)
[![License](https://img.shields.io/npm/l/diskdb.svg)](https://github.com/arvindr21/diskdb/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g diskdb
$ diskdb COMMAND
running command...
$ diskdb (-v|--version|version)
diskdb/0.2.0 darwin-x64 node-v12.18.3
$ diskdb --help [COMMAND]
USAGE
  $ diskdb COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`diskdb hello [FILE]`](#diskdb-hello-file)
* [`diskdb help [COMMAND]`](#diskdb-help-command)

## `diskdb hello [FILE]`

describe the command here

```
USAGE
  $ diskdb hello [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print

EXAMPLE
  $ diskdb hello
  hello world from ./src/hello.ts!
```

_See code: [src/commands/hello.ts](https://github.com/arvindr21/diskdb/blob/v0.2.0/src/commands/hello.ts)_

## `diskdb help [COMMAND]`

display help for diskdb

```
USAGE
  $ diskdb help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.2.0/src/commands/help.ts)_
<!-- commandsstop -->
