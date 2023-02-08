# formatjs-tool-vscode README
一个能够为多语言提供输入提示的插件

## Features
配置默认语言路径之后，输入相关的key或者value值都会有提示。
![示例](https://raw.githubusercontent.com/zhushibo/formatjs-tool-vscode/main/example/prompt.gif)
通过回车可自动带出 `formatMessage({id: "xxx"})`

## Extension Settings

可新建.formatool.json 文件配置 defaultPath 来指定默认语言位置。

比如我的设计稿中使用的是英文 （语言文件目前只支持json格式）

`.formatool.json` 配置
```
{
    "defaultPath":"src/locale/en.json" 
}
```

## Known Issues
[github](https://github.com/zhushibo/formatjs-tool-vscode/issues)

## Release Notes

### 1.0.0

基本语言提示

## Todo

- [ ] 通过命令转化表格为json语言文件，并按照规则生成key
- [ ] 自定义生成模版内容
- [ ] 点击跳转对应语言文件

