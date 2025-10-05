# 貢獲指南

感謝您對 Todo List 專案的興趣！以下是如何為此專案貢獻的指南。

## 如何貢獻

### 報告錯誤

如果您發現了錯誤，請在 [GitHub Issues](../../issues) 中創建一個 issue。請包含：

- 錯誤的詳細描述
- 重現步驟
- 預期行為和實際行為
- 環境資訊 (作業系統、Python 版本等)

### 提出新功能

在開始開發新功能之前，請先創建一個 issue 來討論您的想法。

### 提交 Pull Request

1. **Fork 專案**
```bash
git clone https://github.com/yourusername/todolist.git
cd todolist
```

2. **建立功能分支**
```bash
git checkout -b feature/amazing-feature
```

3. **設定開發環境**
```bash
./scripts/init.sh
```

4. **進行開發**
   - 遵循程式碼風格指南
   - 為新功能編寫測試
   - 更新文檔 (如果需要)

5. **運行測試**
```bash
make test
make lint
```

6. **提交變更**
```bash
git add .
git commit -m "feat: add amazing feature"
git push origin feature/amazing-feature
```

7. **建立 Pull Request**
   - 在 GitHub 上建立 Pull Request
   - 提供清楚的描述
   - 連結相關的 issue

## 程式碼風格

### Python
- 使用 [PEP 8](https://pep8.org/) 風格指南
- 使用 [Black](https://black.readthedocs.io/) 進行程式碼格式化
- 使用 [isort](https://pycqa.github.io/isort/) 排列 import
- 使用 [flake8](https://flake8.pycqa.org/) 進行語法檢查

### JavaScript
- 使用 ES6+ 語法
- 使用有意義的變數名稱
- 為復雜的函數添加註解

### Commit 訊息
使用 [Conventional Commits](https://www.conventionalcommits.org/) 格式：

- `feat:` 新功能
- `fix:` 錯誤修復
- `docs:` 文檔更新
- `style:` 程式碼風格調整
- `refactor:` 程式碼重構
- `test:` 測試相關
- `chore:` 其他雜務

## 測試

### 編寫測試
- 為所有新功能編寫測試
- 保持高測試覆蓋率 (>90%)
- 使用測試驅動開發 (TDD) 方法

### 測試類型
- **單元測試**: 測試個別函數和方法
- **整合測試**: 測試 API 端點
- **功能測試**: 測試完整的用戶流程

## 文檔

- 更新 README.md (如果需要)
- 為新的 API 端點添加文檔
- 更新配置說明

## 安全

- 不要提交敏感資訊 (密碼、API 金鑰等)
- 使用環境變數來管理配置
- 遵循安全最佳實踐

## 問題和幫助

如果您有任何問題，請：

1. 查看 [FAQ](docs/faq.md)
2. 搜尋現有的 [Issues](../../issues)
3. 創建新的 Issue
4. 加入我們的討論區

再次感謝您的貢獻！🎉