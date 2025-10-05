#!/bin/bash

# Todo List 應用程式部署腳本

set -e  # 遇到錯誤就停止

echo "🚀 開始部署 Todo List 應用程式..."

# 檢查環境變數
if [ -z "$ENVIRONMENT" ]; then
    echo "⚠️  警告: ENVIRONMENT 環境變數未設定，預設為 'production'"
    ENVIRONMENT="production"
fi

echo "💻 目前環境: $ENVIRONMENT"

# 備份資料庫 (仅生產環境)
if [ "$ENVIRONMENT" = "production" ]; then
    echo "💾 正在備份資料庫..."
    python manage.py dbbackup --settings=backend.settings_production
fi

# 更新程式碼
echo "🔄 正在更新程式碼..."
git pull origin main

# 安裝/更新依賴
echo "📦 正在安裝依賴..."
pip install -r requirements.txt

# 執行資料庫遷移
echo "🗄 正在執行資料庫遷移..."
python manage.py migrate --settings=backend.settings_$ENVIRONMENT

# 收集靜態檔案
echo "🎨 正在收集靜態檔案..."
python manage.py collectstatic --noinput --settings=backend.settings_$ENVIRONMENT

# 重新啟動服務 (使用 systemd)
if command -v systemctl &> /dev/null; then
    echo "🔄 正在重新啟動服務..."
    sudo systemctl restart todolist
    sudo systemctl restart nginx
fi

# 清理緩存
echo "🧹 正在清理緩存..."
find . -type f -name "*.pyc" -delete
find . -type d -name "__pycache__" -delete

# 健康檢查
echo "❤️  正在執行健康檢查..."
sleep 5
if curl -f http://localhost/api/todos/ &> /dev/null; then
    echo "✅ 部署成功！應用程式正在正常運行。"
else
    echo "❌ 部署失敗！應用程式未正常運行。"
    exit 1
fi

echo "🎉 部署完成！"