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

## antd 库全局监听导致性能损失
e.stopPropagation();

## 高清图改造
1. 图片编辑由pixijs改为canvas进行dom缩放
1. 辅助调板，由pixijs改为image缩放

除高清外，由于没有pixijs更新，对老旧机器的拖拽性能带来很大提升

## 整体性能优化
1. 前处理改为、后处理时间，尽快的显示，目前大图能达到50ms左右
2. 避免react抖动，也就避免了UI影响, 减少约30ms
3. 避免pixijs实时渲染，改为手动更新
4. 针对填充，采用局部更新数据
5. debounce 实时保存， 这样可以减少保存次数， 降低密集操作带来的性能问题， 依然有问题，不过几率小了很多
6. 历史记录改为canvas快照而非Imagedata， 这样速度更快，不过代价是恢复历史记录要慢一点
7. 保存的toDataURL改为toBlob， 同样后端改造为http发送。 同步改异步，略有优势
8. 修复窗口关闭，内存没释问题

总结： 图片尺寸 5325 * 2571  
1. 显示速度对比， 150ms=>50ms左右
2. 整体速度对比
  * 优化前： 158+108+125 = 391
  * 优化后： 34+48 = 82   还有保存延后执行，次数变少

避免了大图连续快速操作的卡顿问题

<img width="696" alt="优化前" src="https://github.com/lichspace/lichspace.github.io/assets/5037114/8082d79c-1ffb-4f1f-9e70-49c8fdcbdbf7">
<img width="696" alt="优化后" src="https://github.com/lichspace/lichspace.github.io/assets/5037114/c100885d-700a-43cf-91ff-af672f1f6ee8">


