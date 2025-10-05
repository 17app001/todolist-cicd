import pytest
from django.test import TestCase
from django.utils import timezone
from todos.models import Todo


class TodoModelTest(TestCase):
    def setUp(self):
        self.todo = Todo.objects.create(
            title="Test Todo",
            description="Test Description",
            completed=False
        )

    def test_todo_creation(self):
        """測試 Todo 物件建立"""
        self.assertEqual(self.todo.title, "Test Todo")
        self.assertEqual(self.todo.description, "Test Description")
        self.assertFalse(self.todo.completed)
        self.assertIsNotNone(self.todo.created_at)
        self.assertIsNotNone(self.todo.updated_at)

    def test_todo_str(self):
        """測試 __str__ 方法"""
        self.assertEqual(str(self.todo), "Test Todo")

    def test_todo_ordering(self):
        """測試 Todo 排序"""
        todo2 = Todo.objects.create(
            title="Second Todo",
            description="Second Description"
        )
        todos = Todo.objects.all()
        # 最新的應該在前面
        self.assertEqual(todos.first(), todo2)

    def test_todo_update(self):
        """測試 Todo 更新"""
        original_updated_at = self.todo.updated_at
        self.todo.completed = True
        self.todo.save()
        
        self.assertTrue(self.todo.completed)
        self.assertGreater(self.todo.updated_at, original_updated_at)