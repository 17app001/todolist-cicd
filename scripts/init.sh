#!/bin/bash

# Todo List 應用程式初始化腳本

set -e

echo "🚀 初始化 Todo List 應用程式..."

# 檢查 Python 版本
echo "🐍 檢查 Python 版本..."
python_version=$(python3 --version 2>&1 | awk '{print $2}')
echo "目前 Python 版本: $python_version"

# 建立虛擬環境
if [ ! -d ".venv" ]; then
    echo "🏠 正在建立虛擬環境..."
    python3 -m venv .venv
else
    echo "✅ 虛擬環境已存在"
fi

# 啟動虛擬環境
echo "🔌 啟動虛擬環境..."
source .venv/bin/activate

# 安裝依賴
echo "📦 正在安裝依賴..."
pip install --upgrade pip
pip install -r requirements.txt

# 創建 .env 檔案
if [ ! -f ".env" ]; then
    echo "📋 正在建立 .env 檔案..."
    cp .env.example .env
    echo "⚠️  請編輯 .env 檔案並設定您的環境變數"
else
    echo "✅ .env 檔案已存在"
fi

# 執行資料庫遷移
echo "🗄 正在執行資料庫遷移..."
python manage.py makemigrations
python manage.py migrate

# 收集靜態檔案
echo "🎨 正在收集靜態檔案..."
python manage.py collectstatic --noinput

# 創建超級用戶 (可選)
read -p "是否要創建超級用戶？ (y/n): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    python manage.py createsuperuser
fi

# 執行測試
echo "🧪 正在執行測試..."
pytest --no-cov -q

echo "✅ 初始化完成！"
echo ""
echo "接下來的步驟:"
echo "1. 編輯 .env 檔案並設定您的環境變數"
echo "2. 執行 'source .venv/bin/activate' 啟動虛擬環境"
echo "3. 執行 'python manage.py runserver' 啟動開發服務器"
echo "4. 或者使用 'make run' 啟動應用程式"
echo "5. 畤器中訪問 http://localhost:8000/admin/ 管理後台"