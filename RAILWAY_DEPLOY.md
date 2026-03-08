# Railway 部署指南

本文档说明如何将 ZsxqCrawler 部署到 Railway，实现 24 小时独立运行，无需依赖本地环境。

## 架构说明

Railway 上需要部署两个独立服务：

| 服务 | 说明 | 目录 |
|---|---|---|
| **后端 API** | FastAPI + Python，负责爬取知识星球数据 | 根目录 `/` |
| **前端 UI** | Next.js，提供可视化操作界面 | `frontend/` |

---

## 部署步骤

### 第一步：部署后端 API 服务

1. 登录 [Railway](https://railway.app)，点击 **New Project**
2. 选择 **Deploy from GitHub repo**，选择 `ZsxqCrawler` 仓库
3. Railway 会自动识别根目录的 `railway.toml` 并使用 `requirements.txt` 安装依赖
4. 部署完成后，在服务设置中点击 **Generate Domain**，获得后端地址（如 `https://zsxqcrawler-api.up.railway.app`）

### 第二步：部署前端 UI 服务

1. 在同一个 Railway 项目中，点击 **New Service** → **GitHub Repo**
2. 同样选择 `ZsxqCrawler` 仓库，但这次在 **Root Directory** 中填写 `frontend`
3. 在服务的 **Variables** 中添加环境变量：
   ```
   NEXT_PUBLIC_API_BASE_URL = https://zsxqcrawler-api.up.railway.app
   ```
   （替换为第一步获得的后端地址）
4. 部署完成后，生成前端域名，即可通过浏览器访问

### 第三步：配置知识星球 Cookie

1. 打开前端 UI 页面
2. 点击 **账号管理** 标签
3. 在 Cookie 输入框中粘贴您的知识星球 Cookie
4. 点击保存，系统会自动获取您加入的所有星球列表

---

## 获取知识星球 Cookie

1. 在 Chrome 浏览器中打开 [wx.zsxq.com](https://wx.zsxq.com) 并登录
2. 按 **F12** 打开开发者工具 → **Network** 标签
3. 刷新页面，点击 `settings` 请求
4. 在右侧 **Request Headers** 中找到 `cookie` 字段，右键 → **复制值**

> **注意**：Cookie 有效期约为 30 天，过期后需要重新配置。

---

## 数据持久化（重要）

Railway 的文件系统在重启后会重置，建议添加持久化存储：

1. 在后端服务中，点击 **Add Volume**
2. 挂载路径设为 `/data`
3. 在服务的 **Variables** 中添加：
   ```
   OUTPUT_DIR = /data/output
   ```

这样爬取的数据会保存在持久化卷中，重启后不会丢失。

---

## 费用参考

Railway 免费套餐每月提供 $5 额度，后端 + 前端两个服务通常在免费额度内即可运行。
