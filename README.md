# WXReadingGetCover

Tampermonkey 脚本：在微信读书页面自动给封面图添加“复制封面链接”按钮。

## 项目定位

- 目标：快速提取微信读书页面封面图链接（`img.src`）
- 场景：整理书单封面、做自动化归档、快速分享封面地址

## 推荐 GitHub Topics

`tampermonkey`, `userscript`, `wechat-reading`, `weread`, `javascript`

## 功能

- 支持页面：
  - `https://weread.qq.com/web/bookDetail/*`
  - `https://weread.qq.com/web/reader/*`
- 自动通过 XPath 查找封面图 `img`
- 在封面图右下角注入按钮
- 点击按钮复制封面图 `src`

## 使用方式

1. 安装浏览器扩展 Tampermonkey。
2. 新建脚本并粘贴 [WXReadingGetCover.js](WXReadingGetCover.js) 的内容。
3. 打开微信读书目标页面，封面图右下角会出现复制按钮。

## XPath

- `bookDetail` 页面：
  - `//*[@id="routerView"]/div[1]/div[2]/div[1]/div[1]/img`
- `reader` 页面：
  - `//*[@id="routerView"]/div/div[1]/div[2]/div/div/div[2]/div[2]/div/div[1]/div[1]/div/img`

## 变更记录

- [CHANGELOG.md](CHANGELOG.md)

## 许可证

MIT
