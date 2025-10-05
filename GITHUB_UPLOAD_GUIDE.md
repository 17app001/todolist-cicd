# GitHub 上傳指南

## 📋 準備工作

✅ Git 倉庫已初始化  
✅ 所有文件已添加並提交  
✅ 專案結構完整  
✅ CI/CD 配置就緒  

## 🚀 上傳到 GitHub 步驟

### 1. 在 GitHub 創建新倉庫

1. 登入 [GitHub](https://github.com)
2. 點擊右上角 `+` → `New repository`
3. 填寫倉庫資訊：
   - **Repository name**: `todolist`
   - **Description**: `A full-stack Todo List application with Django backend and vanilla JavaScript frontend`
   - **Visibility**: 選擇 `Public` 或 `Private`
   - **不要** 勾選 "Initialize this repository with a README"
   - **不要** 勾選 "Add .gitignore" 
   - **不要** 勾選 "Choose a license"

### 2. 添加遠端倉庫並推送

在終端機中執行以下命令 (請將 `yourusername` 替換為你的 GitHub 用戶名):

```bash
# 添加遠端倉庫
git remote add origin https://github.com/yourusername/todolist.git

# 推送到 GitHub
git branch -M main
git push -u origin main
```

### 3. 設定 GitHub Secrets (CI/CD 需要)

在 GitHub 倉庫頁面：

1. 進入 `Settings` → `Secrets and variables` → `Actions`
2. 點擊 `New repository secret`
3. 添加以下 secrets：

**基本配置:**
- `SECRET_KEY`: Django 秘密金鑰 (可在終端執行 `python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"` 生成)

**生產環境配置 (可選):**
- `PRODUCTION_DATABASE_URL`: 生產資料庫 URL
- `ALLOWED_HOSTS`: 允許的主機名稱
- `REDIS_URL`: Redis 連接 URL

## 🔧 GitHub Actions 設定

推送後，GitHub Actions 會自動：

1. **持續整合 (CI)**:
   - 執行 Python 測試
   - 程式碼品質檢查
   - 安全掃描
   - 前端測試

2. **持續部署 (CD)**:
   - 建置 Docker 映像
   - 創建部署套件
   - 上傳部署物件

## 📊 狀態徽章

推送成功後，可以更新 README.md 中的徽章 URLs：

將 README.md 中的 `username/todolist` 替換為你的實際倉庫路徑。

## 🛠️ 本地開發設定

其他開發者可以通過以下步驟設定專案：

```bash
# 克隆倉庫
git clone https://github.com/yourusername/todolist.git
cd todolist

# 初始化專案
chmod +x scripts/init.sh
./scripts/init.sh

# 啟動開發服務器
make run
```

## 📝 後續步驟

1. **更新 README 徽章**: 將 username 替換為實際的 GitHub 用戶名
2. **設定 branch protection**: 保護 main 分支，要求 PR 審查
3. **配置 Dependabot**: 自動更新依賴套件
4. **設定 Issue/PR 模板**: 標準化協作流程
5. **配置生產環境部署**: 連接實際的雲端服務

## 🔍 驗證上傳

上傳成功後檢查：

- [ ] 所有文件都在 GitHub 上
- [ ] GitHub Actions 工作流程運行正常
- [ ] README 顯示正確
- [ ] CI/CD 徽章顯示狀態

## 🎉 完成！

你的 Todo List 專案現在已經成功上傳到 GitHub，包含：

- ✅ 完整的應用程式碼
- ✅ 自動化 CI/CD 流程
- ✅ Docker 容器化支持
- ✅ Kubernetes 部署配置
- ✅ 完整的文檔和測試

下一步可以邀請協作者或開始部署到生產環境！