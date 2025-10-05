from django.test import TestCase
from todos.models import Todo
from todos.serializers import TodoSerializer


class TodoSerializerTest(TestCase):
    def setUp(self):
        self.todo = Todo.objects.create(
            title="Test Todo",
            description="Test Description",
            completed=False
        )
        self.serializer = TodoSerializer(instance=self.todo)

    def test_serializer_fields(self):
        """測試序列化器包含的欄位"""
        data = self.serializer.data
        expected_fields = {'id', 'title', 'description', 'completed', 'created_at', 'updated_at'}
        self.assertEqual(set(data.keys()), expected_fields)

    def test_serializer_content(self):
        """測試序列化器內容"""
        data = self.serializer.data
        self.assertEqual(data['title'], 'Test Todo')
        self.assertEqual(data['description'], 'Test Description')
        self.assertFalse(data['completed'])
        self.assertEqual(data['id'], self.todo.id)

    def test_valid_serializer(self):
        """測試有效的序列化器"""
        valid_data = {
            'title': 'New Todo',
            'description': 'New Description',
            'completed': False
        }
        serializer = TodoSerializer(data=valid_data)
        self.assertTrue(serializer.is_valid())

    def test_invalid_serializer(self):
        """測試無效的序列化器"""
        invalid_data = {
            'title': '',  # 空標題
            'description': 'Description',
            'completed': False
        }
        serializer = TodoSerializer(data=invalid_data)
        self.assertFalse(serializer.is_valid())
        self.assertIn('title', serializer.errors)

    def test_create_todo(self):
        """測試通過序列化器創建 todo"""
        valid_data = {
            'title': 'Serializer Todo',
            'description': 'Created via serializer',
            'completed': False
        }
        serializer = TodoSerializer(data=valid_data)
        self.assertTrue(serializer.is_valid())
        todo = serializer.save()
        
        self.assertEqual(todo.title, 'Serializer Todo')
        self.assertEqual(todo.description, 'Created via serializer')
        self.assertFalse(todo.completed)