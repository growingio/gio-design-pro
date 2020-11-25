# GrowingIO Design Pro

GrowingIO business components and utils.

## Usage

```bash
$ yarn storybook
```

## 生成 GraphQL 的各种类型

```bash
$ cp .env-example .env
```

更新 `.env` 文件里的 `SCHEMA_PATH` 和 `SESSION` 字段。当 GraphQL Schema 更新后，直接运行：

```bash
$ yarn codegen
```
