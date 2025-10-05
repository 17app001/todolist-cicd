.PHONY: help install test lint format clean run build deploy

help: ## 顯示幫助訊息
	@echo "可用的命令:"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

install: ## 安裝依賴
	pip install -r requirements.txt

test: ## 執行測試
	pytest

test-coverage: ## 執行測試並生成覆蓋率報告
	coverage run -m pytest
	coverage report
	coverage html

lint: ## 執行程式碼檢查
	flake8 .
	black --check .
	isort --check-only .
	bandit -r . -x tests/

format: ## 格式化程式碼
	black .
	isort .

security: ## 執行安全檢查
	bandit -r . -x tests/
	safety check

clean: ## 清理緩存檔案
	find . -type f -name "*.pyc" -delete
	find . -type d -name "__pycache__" -delete
	find . -type d -name "*.egg-info" -exec rm -rf {} +

run: ## 啟動開發服務器
	python manage.py runserver

migrate: ## 執行資料庫遷移
	python manage.py makemigrations
	python manage.py migrate

collectstatic: ## 收集靜態檔案
	python manage.py collectstatic --noinput

build: ## 建置 Docker 鏡像
	docker build -t todolist .

up: ## 啟動 Docker Compose 服務
	docker-compose up -d

down: ## 停止 Docker Compose 服務
	docker-compose down

logs: ## 查看 Docker 日誌
	docker-compose logs -f

deploy-k8s: ## 部署到 Kubernetes
	kubectl apply -f k8s-deployment.yaml

ci: lint test ## 執行 CI 檢查

setup: install migrate collectstatic ## 初始化專案