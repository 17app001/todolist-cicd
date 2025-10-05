# CI/CD Pipeline 文檔

## 概述

此 Todo List 專案使用 GitHub Actions 實現自動化的 CI/CD 流程。

## CI/CD 流程

### 1. 持續整合 (Continuous Integration)

#### 觸發條件
- Push 到 `main` 或 `develop` 分支
- 向 `main` 分支提交 Pull Request

#### 工作流程
1. **測試階段** (`test` job)
   - 設置 Python 3.13 環境
   - 啟動 PostgreSQL 測試服務
   - 安裝依賴套件
   - 執行 Django 測試
   - 生成覆蓋率報告
   - 上傳到 Codecov

2. **程式碼檢查階段** (`lint` job)
   - 使用 flake8 進行語法檢查
   - 使用 black 檢查程式碼格式
   - 使用 isort 檢查 import 排列

3. **安全檢查階段** (`security` job)
   - 使用 bandit 進行安全漏洞掃描
   - 使用 safety 檢查已知安全漏洞

### 2. 持續部署 (Continuous Deployment)

#### 觸發條件
- 只有當 push 到 `main` 分支且所有前置檢查通過時才會執行

#### 流程
1. **建置應用程式** (`build-and-deploy` job)
   - 安裝依賴
   - 收集靜態檔案
   - 創建部署套件
   - 上傳部署物件
   - (可選) 部署到生產環境

## 本地開發流程

### 初始設定
```bash
# 1. 克隆專案
git clone <repository-url>
cd todolist

# 2. 執行初始化腳本
chmod +x scripts/init.sh
./scripts/init.sh

# 3. 啟動開發環境
make run
```

### 開發流程
1. 建立功能分支
```bash
git checkout -b feature/new-feature
```

2. 執行本地測試
```bash
make test
make lint
```

3. 提交變更
```bash
git add .
git commit -m "feat: add new feature"
git push origin feature/new-feature
```

4. 建立 Pull Request

## Docker 部署

### 本地 Docker 開發
```bash
# 建置鏡像
make build

# 啟動服務
make up

# 查看日誌
make logs

# 停止服務
make down
```

### 生產環境 Docker 部署
```bash
# 使用 docker-compose
docker-compose -f docker-compose.yml up -d

# 或者使用 Kubernetes
kubectl apply -f k8s-deployment.yaml
```

## 環境變數設定

### 開發環境
複製 `.env.example` 為 `.env` 並修改相關設定。

### 生產環境
在 CI/CD 系統中設定以下環境變數：

- `SECRET_KEY`: Django 的秘密金鑰
- `DATABASE_URL`: 資料庫連接 URL
- `ALLOWED_HOSTS`: 允許的主機名稱
- `REDIS_URL`: Redis 連接 URL
- `ENVIRONMENT`: 環境名稱 (production/staging/development)

## 監控和日誌

### 健康檢查
- **API 健康檢查**: `GET /api/todos/`
- **Nginx 健康檢查**: `GET /health`
- **Docker 容器健康檢查**: 自動檢查 API 可用性

### 日誌
- **開發環境**: 輸出到控制台
- **生產環境**: 同時輸出到檔案和控制台
- **日誌級別**: INFO 及以上

## 安全考量

1. **秘密管理**
   - 使用 GitHub Secrets 存放敏感資訊
   - 生產環境中使用環境變數

2. **容器安全**
   - 使用非 root 用戶執行應用程式
   - 定期更新基礎鏡像

3. **網路安全**
   - HTTPS 加密
   - CORS 設定
   - 安全標頭設定

## 效能優化

1. **緩存策略**
   - Nginx 靜態檔案緩存
   - Redis 資料緩存
   - CDN 加速

2. **資料庫優化**
   - 連接池設定
   - 索引優化
   - 測試環境使用內存資料庫

## 異常處理

### 常見問題
1. **測試失敗**: 檢查測試輸出和日誌
2. **部署失敗**: 檢查環境變數和網路連接
3. **效能問題**: 檢查資料庫連接和緩存設定

### 回滾策略
1. 使用 Git tag 標記版本
2. 保留前一個版本的部署物件
3. 資料庫備份和還原程序

## 相關連結

- [GitHub Repository](https://github.com/username/todolist)
- [Production Deployment](https://todolist.example.com)
- [Staging Environment](https://staging-todolist.example.com)
- [CI/CD Dashboard](https://github.com/username/todolist/actions)