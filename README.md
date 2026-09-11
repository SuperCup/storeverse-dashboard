# StoreVerse 门店运营 AI（演示）

DSR 拍照进店后先看销售看板，再生成 AI 运营建议；采纳或忽略后，总部可看使用记录。

## 本地预览

```bash
npm install
npm run dev
```

浏览器打开 http://localhost:5173/

## GitHub / Netlify

- 仓库：https://github.com/SuperCup/storeverse-dashboard
- Netlify：Build command `npm run build`，Publish directory `dist`（已写在 `netlify.toml`）
- 连接 GitHub 仓库后，推送 `main` 即自动发布

## 演示走法

1. 选 **DSR 拍店** → 拍一拍 → 进入**永辉超市(南岸万达广场店)** 销售看板（真实 sg_store_id 36575）。
2. 看板可见：POI、淘宝闪购覆盖、ROI 5.87、笔单价、商品满减券、69码 Top SKU。
3. 点 **生成运营建议** → **采纳 / 忽略**。
4. 切 **总部监控台**，看一线动态、采纳漏斗、样例门店库。
5. 历史门店可进广州西城都荟、西安小寨西路（真实字段不同平台/机制）。

样例数据：`docs/sample-data/`（账单统计标签 + POI 标签 + 字段说明）。

## 文档

- [Word 版 PRD v0.2](docs/PRD-门店颗粒度一线赋能.docx)
- [Markdown 版 PRD](docs/PRD-门店颗粒度一线赋能.md)
- [面聊原文](docs/面聊原文-2026-09-08-门店运营AI工具设计.md)
- [用户足迹](docs/用户足迹.md)
