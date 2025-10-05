# Todo List 代辦事項應用程式

[![CI/CD Pipeline](https://github.com/17app001/todolist-cicd/workflows/CI/CD%20Pipeline/badge.svg)](https://github.com/17app001/todolist-cicd/actions)
[![Frontend Tests](https://github.com/17app001/todolist-cicd/workflows/Frontend%20Tests/badge.svg)](https://github.com/17app001/todolist-cicd/actions)
[![codecov](https://codecov.io/gh/17app001/todolist-cicd/branch/master/graph/badge.svg)](https://codecov.io/gh/17app001/todolist-cicd)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Live Demo](https://img.shields.io/badge/Live-Demo-blue)](https://17app001.github.io/todolist-cicd/frontend/)

這是一個全端的代辦事項應用程式，使用 Django 作為後端 API，原生 JavaScript 作為前端。

## 專案結構

```
todolist/
├── backend/                # Django 專案設定
│   ├── settings.py        # Django 設定
│   ├── urls.py           # 主要 URL 配置
│   └── ...
├── todos/                 # Todo 應用程式
│   ├── models.py         # 資料模型
│   ├── views.py          # API 視圖
│   ├── serializers.py    # 序列化器
│   ├── urls.py           # API URL 配置
│   └── ...
├── frontend/             # 前端檔案
│   ├── index.html        # 主頁面
│   ├── css/
│   │   └── style.css     # 樣式檔
│   └── js/
│       └── app.js        # JavaScript 應用程式
├── manage.py             # Django 管理腳本
└── requirements.txt      # Python 依賴
```

## 功能特色

### 後端 (Django REST Framework)
- ✅ RESTful API 設計
- ✅ Todo CRUD 操作 (新增、讀取、更新、刪除)
- ✅ 完成狀態切換功能
- ✅ CORS 支援前端跨域請求
- ✅ SQLite 資料庫
- ✅ 自動時間戳記

### 前端 (Vanilla JavaScript)
- ✅ 響應式設計
- ✅ 新增待辦事項
- ✅ 標記完成/未完成
- ✅ 編輯待辦事項
- ✅ 刪除待辦事項
- ✅ 過濾功能 (全部/待完成/已完成)
- ✅ 統計顯示
- ✅ 錯誤處理

## 環境需求

- Python 3.8+
- Django 5.2+
- Django REST Framework
- django-cors-headers

## 安裝與執行

### 1. 克隆專案
```bash
git clone <repository-url>
cd todolist
```

### 2. 建立虛擬環境
```bash
python -m venv .venv
# Windows
.venv\Scripts\activate
# macOS/Linux
source .venv/bin/activate
```

### 3. 安裝依賴
```bash
pip install django djangorestframework django-cors-headers
```

### 4. 執行資料庫遷移
```bash
python manage.py makemigrations
python manage.py migrate
```

### 5. 建立超級使用者 (可選)
```bash
python manage.py createsuperuser
```

### 6. 啟動後端服務器
```bash
python manage.py runserver
```

### 7. 開啟前端
在瀏覽器中打開 `frontend/index.html` 或使用簡易 HTTP 服務器：

```bash
# 在 frontend 目錄中
python -m http.server 8080
```

然後訪問 `http://localhost:8080`

## API 端點

| 方法 | 端點 | 描述 |
|------|------|------|
| GET | `/api/todos/` | 獲取所有待辦事項 |
| POST | `/api/todos/` | 建立新的待辦事項 |
| GET | `/api/todos/{id}/` | 獲取特定待辦事項 |
| PUT | `/api/todos/{id}/` | 更新特定待辦事項 |
| DELETE | `/api/todos/{id}/` | 刪除特定待辦事項 |
| PATCH | `/api/todos/{id}/toggle_complete/` | 切換完成狀態 |

## 資料模型

```python
class Todo(models.Model):
    title = models.CharField(max_length=200)          # 標題
    description = models.TextField(blank=True)        # 描述 (可選)
    completed = models.BooleanField(default=False)    # 完成狀態
    created_at = models.DateTimeField(default=timezone.now)  # 建立時間
    updated_at = models.DateTimeField(auto_now=True)  # 更新時間
```

## 使用說明

1. **新增待辦事項**: 在表單中輸入標題和描述，點擊「新增」
2. **標記完成**: 點擊待辦事項前的核取方塊
3. **編輯**: 點擊「編輯」按鈕修改內容
4. **刪除**: 點擊「刪除」按鈕移除項目
5. **過濾**: 使用「全部」、「待完成」、「已完成」按鈕過濾顯示

## 開發功能

### Django Admin
訪問 `http://127.0.0.1:8000/admin/` 使用 Django 管理介面

### API 測試
使用 `http://127.0.0.1:8000/api/todos/` 測試 API 端點

## 技術細節

- **後端**: Django REST Framework 提供 RESTful API
- **前端**: 原生 JavaScript ES6+ 使用 Fetch API
- **資料庫**: SQLite (開發環境)
- **樣式**: CSS3 與響應式設計
- **跨域**: django-cors-headers 處理 CORS

## CI/CD 流程

此專案使用 GitHub Actions 實現自動化的 CI/CD 流程：

### 持續整合 (CI)
- 自動執行測試套件
- 程式碼品質檢查 (flake8, black, isort)
- 安全漏洞掃描 (bandit, safety)
- 覆蓋率報告 (coverage)

### 持續部署 (CD)
- 自動建置部署套件
- Docker 容器化部署
- Kubernetes 支援

### 快速啟動
```bash
# 使用初始化腳本
chmod +x scripts/init.sh
./scripts/init.sh

# 或者使用 Make 命令
make setup  # 初始化專案
make run    # 啟動開發服務器
make test   # 執行測試
make lint   # 程式碼檢查
```

### Docker 部署
```bash
# 本地開發
make up     # 啟動服務
make down   # 停止服務
make logs   # 查看日誌

# 生產環境
docker-compose up -d
```

## 測試

### 執行所有測試
```bash
pytest
```

### 生成覆蓋率報告
```bash
pytest --cov=. --cov-report=html
```

### 測試類型
- **單元測試**: 測試模型和序列化器
- **API 測試**: 測試 REST API 端點
- **整合測試**: 測試完整的應用程式流程

## 部署

### 手動部署
```bash
chmod +x scripts/deploy.sh
ENVIRONMENT=production ./scripts/deploy.sh
```

### 自動部署
推送到 `main` 分支會自動觸發 GitHub Actions 部署流程。

## 監控

- **健康檢查**: `/api/todos/` 和 `/health`
- **日誌**: 使用 Django logging 配置
- **效能監控**: Nginx 訪問日誌和應用程式指標

## 授權

此專案使用 MIT 授權。