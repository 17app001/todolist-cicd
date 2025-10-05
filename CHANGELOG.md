# 更新日誌

所有重要的專案變更都會記錄在此檔案中。

格式基於 [Keep a Changelog](https://keepachangelog.com/zh-TW/1.0.0/)，
並且此專案遵循 [Semantic Versioning](https://semver.org/lang/zh-TW/)。

## [Unreleased]

### Added
- 初始專案設定
- Django REST API 後端
- 原生 JavaScript 前端
- Todo CRUD 功能
- 完整的 CI/CD 流程
- Docker 容器化支援
- Kubernetes 部署配置
- 自動化測試套件
- 程式碼品質檢查
- 安全掃描工具

### Security
- 新增 bandit 安全掃描
- 新增 safety 依賴漏洞檢查
- Docker 容器安全配置

## [1.0.0] - 2025-10-05

### Added
- 初始發布版本
- Todo 列表基本 CRUD 操作
- 前端用戶界面
- REST API 後端
- 資料庫模型
- CI/CD 流程

### Features
- 新增代辦事項
- 編輯代辦事項
- 刪除代辦事項
- 標記完成/未完成
- 過濾功能 (全部/待完成/已完成)
- 統計顯示
- 響應式設計

### Technical
- Django 5.2.7 後端
- Django REST Framework API
- 原生 JavaScript ES6+ 前端
- SQLite 資料庫 (開發環境)
- PostgreSQL 支援 (生產環境)
- Docker 容器化
- Nginx 反向代理
- GitHub Actions CI/CD

---

### 版本說明
- **Added** - 新增的功能
- **Changed** - 現有功能的變更
- **Deprecated** - 即將移除的功能
- **Removed** - 已移除的功能
- **Fixed** - 任何 bug 修復
- **Security** - 安全性相關的變更