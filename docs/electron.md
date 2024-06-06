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

## extraResource导致签名不完整
解决办法： https://github.com/electron/notarize/issues/185

> For anyone using electron forge this fixed the error with dlopen(.... different team Ids.
> 1. Add entitlements.plist to the root of your project.
> <!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd"> <plist version="1.0"> <dict> <key>com.apple.security.cs.allow-unsigned-executable-memory</key> <true/> <key>com.apple.security.cs.disable-library-validation</key> <true/> <key>com.apple.security.cs.allow-jit</key> > > <true/> </dict> </plist>
> 2. In forge.config.js add this to osxSign:
>       optionsForFile: (filePath) => { // Here, we keep it simple and return a single entitlements.plist file. // You can use this callback to map different sets of entitlements // to specific files in your packaged app. return { entitlements: './entitlements.plist' }; }
