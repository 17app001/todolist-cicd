class TodoApp {
    constructor() {
        this.apiUrl = 'http://127.0.0.1:8000/api/todos/';
        this.todos = [];
        this.currentFilter = 'all';
        this.init();
    }

    init() {
        this.bindEvents();
        this.loadTodos();
    }

    bindEvents() {
        // 表單提交事件
        document.getElementById('todoForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.addTodo();
        });

        // 過濾按鈕事件
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.setFilter(e.target.dataset.filter);
            });
        });

        // 事件委託處理 todo 項目的按鈕點擊
        document.getElementById('todoList').addEventListener('click', (e) => {
            const todoId = parseInt(e.target.dataset.todoId);
            
            if (e.target.classList.contains('btn-edit')) {
                this.editTodo(todoId);
            } else if (e.target.classList.contains('btn-delete')) {
                this.deleteTodo(todoId);
            }
        });

        // 處理 checkbox 變更
        document.getElementById('todoList').addEventListener('change', (e) => {
            if (e.target.classList.contains('todo-checkbox')) {
                const todoId = parseInt(e.target.dataset.todoId);
                this.toggleTodo(todoId);
            }
        });
    }

    async loadTodos() {
        try {
            this.showLoading();
            const response = await fetch(this.apiUrl);
            if (!response.ok) {
                throw new Error('無法載入待辦事項');
            }
            this.todos = await response.json();
            this.renderTodos();
            this.updateStats();
        } catch (error) {
            this.showError('載入待辦事項失敗: ' + error.message);
        }
    }

    async addTodo() {
        const title = document.getElementById('todoTitle').value.trim();
        const description = document.getElementById('todoDescription').value.trim();

        if (!title) {
            alert('請輸入待辦事項標題');
            return;
        }

        try {
            const response = await fetch(this.apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: title,
                    description: description,
                    completed: false
                })
            });

            if (!response.ok) {
                throw new Error('無法新增待辦事項');
            }

            const newTodo = await response.json();
            this.todos.unshift(newTodo); // 新增到最前面
            this.renderTodos();
            this.updateStats();
            this.clearForm();
        } catch (error) {
            this.showError('新增待辦事項失敗: ' + error.message);
        }
    }

    async toggleTodo(id) {
        try {
            const response = await fetch(`${this.apiUrl}${id}/toggle_complete/`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (!response.ok) {
                throw new Error('無法更新待辦事項');
            }

            const updatedTodo = await response.json();
            const index = this.todos.findIndex(todo => todo.id === id);
            if (index !== -1) {
                this.todos[index] = updatedTodo;
                this.renderTodos();
                this.updateStats();
            }
        } catch (error) {
            this.showError('更新待辦事項失敗: ' + error.message);
        }
    }

    async deleteTodo(id) {
        if (!confirm('確定要刪除這個待辦事項嗎？')) {
            return;
        }

        try {
            const response = await fetch(`${this.apiUrl}${id}/`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                throw new Error('無法刪除待辦事項');
            }

            this.todos = this.todos.filter(todo => todo.id !== id);
            this.renderTodos();
            this.updateStats();
        } catch (error) {
            this.showError('刪除待辦事項失敗: ' + error.message);
        }
    }

    async editTodo(id) {
        const todo = this.todos.find(t => t.id === id);
        if (!todo) return;

        const newTitle = prompt('修改標題:', todo.title);
        if (newTitle === null) return; // 用戶取消
        
        const newDescription = prompt('修改描述:', todo.description);
        if (newDescription === null) return; // 用戶取消

        try {
            const response = await fetch(`${this.apiUrl}${id}/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...todo,
                    title: newTitle.trim(),
                    description: newDescription.trim()
                })
            });

            if (!response.ok) {
                throw new Error('無法修改待辦事項');
            }

            const updatedTodo = await response.json();
            const index = this.todos.findIndex(t => t.id === id);
            if (index !== -1) {
                this.todos[index] = updatedTodo;
                this.renderTodos();
            }
        } catch (error) {
            this.showError('修改待辦事項失敗: ' + error.message);
        }
    }

    setFilter(filter) {
        this.currentFilter = filter;
        
        // 更新按鈕狀態
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-filter="${filter}"]`).classList.add('active');
        
        this.renderTodos();
    }

    getFilteredTodos() {
        switch (this.currentFilter) {
            case 'completed':
                return this.todos.filter(todo => todo.completed);
            case 'pending':
                return this.todos.filter(todo => !todo.completed);
            default:
                return this.todos;
        }
    }

    renderTodos() {
        const todoList = document.getElementById('todoList');
        const filteredTodos = this.getFilteredTodos();

        if (filteredTodos.length === 0) {
            todoList.innerHTML = '<div class="loading">沒有待辦事項</div>';
            return;
        }

        todoList.innerHTML = filteredTodos.map(todo => this.createTodoHTML(todo)).join('');
    }

    createTodoHTML(todo) {
        const createdDate = new Date(todo.created_at).toLocaleString('zh-TW');
        
        return `
            <div class="todo-item ${todo.completed ? 'completed' : ''}">
                <input type="checkbox" class="todo-checkbox" 
                       ${todo.completed ? 'checked' : ''} 
                       data-todo-id="${todo.id}">
                
                <div class="todo-content">
                    <div class="todo-title">${this.escapeHtml(todo.title)}</div>
                    ${todo.description ? `<div class="todo-description">${this.escapeHtml(todo.description)}</div>` : ''}
                </div>
                
                <div class="todo-date">${createdDate}</div>
                
                <div class="todo-actions">
                    <button class="btn-edit" data-todo-id="${todo.id}">編輯</button>
                    <button class="btn-delete" data-todo-id="${todo.id}">刪除</button>
                </div>
            </div>
        `;
    }

    updateStats() {
        const total = this.todos.length;
        const completed = this.todos.filter(todo => todo.completed).length;
        const pending = total - completed;

        document.getElementById('totalCount').textContent = `總計: ${total}`;
        document.getElementById('completedCount').textContent = `已完成: ${completed}`;
        document.getElementById('pendingCount').textContent = `待完成: ${pending}`;
    }

    clearForm() {
        document.getElementById('todoTitle').value = '';
        document.getElementById('todoDescription').value = '';
    }

    showLoading() {
        document.getElementById('todoList').innerHTML = '<div class="loading">載入中...</div>';
    }

    showError(message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error';
        errorDiv.textContent = message;
        
        const container = document.querySelector('.container');
        const existingError = container.querySelector('.error');
        if (existingError) {
            existingError.remove();
        }
        
        container.insertBefore(errorDiv, container.firstChild);
        
        // 3秒後自動移除錯誤訊息
        setTimeout(() => {
            errorDiv.remove();
        }, 3000);
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// 初始化應用程式
const app = new TodoApp();

// 確保 app 在全域作用域可訪問
window.app = app;