# centos前端环境搭建
腾讯云centeos系统搭建

## 基础命令

```
yum install lrzsz
yum install git-all
git --version
```

## nodejs安装
```
wget https://nodejs.org/dist/v12.16.2/node-v12.16.2-linux-x64.tar.xz
tar xf node-v12.16.2-linux-x64.tar.xz 
cd node-v12.16.2-linux-x64/
# 软连接
ln -s /usr/local/src/node-v12.16.2-linux-x64/bin/node /usr/local/bin/
ln -s /usr/local/src/node-v12.16.2-linux-x64/bin/npm /usr/local/bin/
ln -s /usr/local/src/node-v12.16.2-linux-x64/bin/npx /usr/local/bin/
```

## vscode remote
windows也能拥有linux开发环境，并且多台电脑可以共享开发环境不用同步

- 腾讯云主机配置ssh密匙，这里不要自己配置
- 首先确保能够ssh无密码登录

