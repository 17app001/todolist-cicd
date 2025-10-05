import json
from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from todos.models import Todo


class TodoViewSetTest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.todo = Todo.objects.create(
            title="Test Todo",
            description="Test Description",
            completed=False
        )
        self.valid_payload = {
            'title': 'New Todo',
            'description': 'New Description',
            'completed': False
        }
        self.invalid_payload = {
            'title': '',  # 空標題
            'description': 'Description',
            'completed': False
        }

    def test_get_all_todos(self):
        """測試獲取所有 todos"""
        response = self.client.get('/api/todos/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)

    def test_get_single_todo(self):
        """測試獲取單個 todo"""
        response = self.client.get(f'/api/todos/{self.todo.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['title'], 'Test Todo')

    def test_create_valid_todo(self):
        """測試創建有效的 todo"""
        response = self.client.post(
            '/api/todos/',
            data=json.dumps(self.valid_payload),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Todo.objects.count(), 2)

    def test_create_invalid_todo(self):
        """測試創建無效的 todo"""
        response = self.client.post(
            '/api/todos/',
            data=json.dumps(self.invalid_payload),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(Todo.objects.count(), 1)

    def test_update_todo(self):
        """測試更新 todo"""
        updated_payload = {
            'title': 'Updated Todo',
            'description': 'Updated Description',
            'completed': True
        }
        response = self.client.put(
            f'/api/todos/{self.todo.id}/',
            data=json.dumps(updated_payload),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
        updated_todo = Todo.objects.get(id=self.todo.id)
        self.assertEqual(updated_todo.title, 'Updated Todo')
        self.assertTrue(updated_todo.completed)

    def test_delete_todo(self):
        """測試刪除 todo"""
        response = self.client.delete(f'/api/todos/{self.todo.id}/')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Todo.objects.count(), 0)

    def test_toggle_complete(self):
        """測試切換完成狀態"""
        response = self.client.patch(f'/api/todos/{self.todo.id}/toggle_complete/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
        updated_todo = Todo.objects.get(id=self.todo.id)
        self.assertTrue(updated_todo.completed)

    def test_get_nonexistent_todo(self):
        """測試獲取不存在的 todo"""
        response = self.client.get('/api/todos/999/')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)