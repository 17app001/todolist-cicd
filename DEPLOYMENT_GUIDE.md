# 部署指南

## 🚀 一鍵部署 - Railway (推薦)

### 1. 前往 Railway
1. 訪問 [Railway](https://railway.app/)
2. 使用 GitHub 登入
3. 點擊 "Deploy from GitHub repo"

### 2. 選擇你的倉庫
- 選擇 `17app001/todolist-cicd`
- Railway 會自動偵測 Django 應用程式

### 3. 設定環境變數
在 Railway 領板中新增以下變數：

```env
SECRET_KEY=endqvigneb!d&#0dfxs77vwbsqeggv(c70rf7i2cpm4j*5&-3t
DEBUG=False
ALLOWED_HOSTS=*.railway.app,*.up.railway.app
```

### 4. 新增 PostgreSQL 資料庫
1. 在 Railway 領板中點擊 "New"
2. 選擇 "Database" > "PostgreSQL"
3. Railway 會自動生成 `DATABASE_URL`

### 5. 部署完成！
- Railway 會自動建置和部署
- 你會得到類似 `https://todolist-cicd-production.up.railway.app` 的 URL

---

## 🆓 其他免費選項

### GitHub Pages (僅前端)
1. 在 GitHub 倉庫設定中啟用 Pages
2. 選擇 `master` 分支
3. 前端將在 `https://17app001.github.io/todolist-cicd/frontend/` 可用

### Render
1. 訪問 [Render](https://render.com/)
2. 連接 GitHub 帳號
3. 選擇你的倉庫並設定環境變數

### Vercel (僅前端)
1. 訪問 [Vercel](https://vercel.com/)
2. 使用 GitHub 登入
3. 選擇你的倉庫並設定 build 路徑為 `frontend/`

---

## 🔧 本地測試生產環境

```bash
# 使用 Docker
docker-compose up -d

# 或者使用 Make
make up
```

## 📊 監控和日誌

部署後，你可以：
- 查看應用程式日誌
- 設定自定義網域
- 啟用自動部署 (推送到 master 分支時)
- 設定環境變數
- 查看效能指標

## 🔒 安全性

生產環境中：
- DEBUG 為 False
- 使用 HTTPS
- 設定正確的 ALLOWED_HOSTS
- 使用環境變數存放敏感資訊

---

選擇你喜歡的部署平台開始吧！🚀