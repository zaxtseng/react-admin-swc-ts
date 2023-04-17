# React-admin-antd

## 介绍 📖

react-admin-antd，基于 React18、React-Router v6、React-Hooks、Redux && Redux-Toolkit、TypeScript、Vite3、Ant-Design V5 开源的一套后台管理框架。

🌈 Redux-Toolkit 版本请切换到 Redux-Toolkit 分支上

## 开发文档

项目开发文档: [develop.md](./develop.md)

# 选型

本项目以打造 React Admin Awesome 为目的.

选型上比较激进,尽量选择一些比较前沿的东西,虽然也有稍微保守的,但那是在追求创新的情况下力求稳定(斜眼笑).

## 基础选型

| 安装包           | 用途                                 |
| ---------------- | ------------------------------------ |
| react18          | 前端库(默认使用 Hooks)               |
| react-router@6   | 路由                                 |
| vite4            | 构建工具                             |
| plugin-react-swc | SWC+esbuild 编译,速度上天            |
| typescript       | js 的超集                            |
| antd5            | css 组件库(后期可能换 MUI,ChakraUI)  |
| linaria          | CSS-in-JS 库(后期可能换 tailwindcss) |
| zustand          | 轻量级状态管理库(替代 redux)         |
| axios            | 请求三方库                           |
| SWR              | 请求状态库(替代 useFetch,ReactQuery) |
| immer            | 数据持久化                           |

## 开发环境选型

主要是一些方便统一开发的插件.
安装包 | 用途
--|--
eslint|ts,js 代码检查
stylelint|css 样式检查
prettier|代码美化格式化
husky| git 预提交
lint-staged|只对暂存区的代码进行检验
commitlint|提交 commit 规范
commitizen|命令行提示工具，写出规范的 commit message
@commitlint/config-conventional|Angular 的提交规范
cz-git|标准输出格式的 commitizen 适配器
release-it|生成版本变更日志
