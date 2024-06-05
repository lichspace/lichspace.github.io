# electron
记录electron开发过程中的一些问题

## 生产环境debug日志
https://github.com/pd4d10/debugtron

## electronfore配置

```
extraResource: 'lib'
// 注入到子进程
if (app.isPackaged) {
  process.env.resourcesPath = process.resourcesPath;
}
```
