'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import { Checkbox } from '@/components/ui/Checkbox';
import { AnimatedDiv } from '@/components/animations';
import { useTheme } from '@/hooks/useTheme';
import { Plus, Search, Calendar, Filter } from 'lucide-react';
import ProtectedRoute from '@/components/providers/ProtectedRoute';
import Link from 'next/link';

interface Todo {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  user_id: string;
  created_at: string;
  updated_at: string;
}

export default function TodosPage() {
  const { theme, toggleTheme } = useTheme();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState({ title: '', description: '', priority: 'medium' as 'low' | 'medium' | 'high' });
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch todos from API
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const { getTodos } = await import('@/lib/api');
        const result = await getTodos();

        if (result.success && result.data?.todos) {
          setTodos(result.data.todos);
        } else {
          console.warn('Failed to fetch todos:', result.error || result.message);
          setTodos([]);
        }
      } catch (error) {
        console.error('Error fetching todos:', error);
        setTodos([]);
      }
    };

    fetchTodos();
  }, []);

  const filteredTodos = (todos || []).filter(todo => {
    const matchesFilter = filter === 'all' ||
                         (filter === 'active' && !todo.completed) ||
                         (filter === 'completed' && todo.completed);

    const matchesSearch = todo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (todo.description?.toLowerCase() || '').includes(searchTerm.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  const addTodo = async () => {
    if (!newTodo.title.trim()) return;

    try {
      const { createTodo } = await import('@/lib/api');
      const result = await createTodo({
        title: newTodo.title,
        description: newTodo.description,
        priority: newTodo.priority as 'low' | 'medium' | 'high'
      });

      if (result.success && result.data) {
        setTodos([result.data, ...todos]);
        setNewTodo({ title: '', description: '', priority: 'medium' });
      } else {
        console.error("Failed to add todo:", result.error);
      }
    } catch (error) {
      console.error('Error creating todo:', error);
    }
  };

  const toggleTodo = async (id: string) => {
    const todo = todos.find(t => t.id === id);
    if (!todo) return;

    try {
      const { updateTodo } = await import('@/lib/api');
      const result = await updateTodo(id, { completed: !todo.completed });

      if (result.success) {
        setTodos(todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
      }
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const deleteTodo = async (id: string) => {
    try {
      const { deleteTodo: deleteTodoApi } = await import('@/lib/api');
      const result = await deleteTodoApi(id);

      if (result.success) {
        setTodos(todos.filter(t => t.id !== id));
      }
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-indigo-900/20 dark:via-purple-900/20 dark:to-pink-900/20 text-foreground p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <AnimatedDiv direction="down" delay={0.1}>
              <h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">All Tasks</h1>
              <p className="text-indigo-800 dark:text-indigo-400 text-lg font-medium">View and manage all your tasks</p>
            </AnimatedDiv>

            <div className="flex flex-wrap gap-3">
              <Link href="/dashboard">
                <Button variant="outline" className="border-2 border-indigo-300 text-indigo-700 dark:text-indigo-300 dark:border-indigo-600">
                  Dashboard
                </Button>
              </Link>
              <Button variant="outline" onClick={toggleTheme} className="flex items-center gap-2 border-2 border-purple-300 text-purple-700 dark:text-purple-300 dark:border-purple-600">
                {theme === 'light' ? '🌙' : '☀️'} {theme === 'light' ? 'Dark' : 'Light'} Mode
              </Button>
            </div>
          </header>

          {/* Add Todo Form */}
          <AnimatedDiv direction="up" delay={0.2}>
            <Card className="mb-8 bg-gradient-to-b from-white to-purple-50/50 dark:from-gray-800/50 dark:to-purple-900/20 border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">Add New Task</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      placeholder="Task title..."
                      value={newTodo.title}
                      onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
                      className="border-2 border-indigo-200 dark:border-indigo-700 focus:border-indigo-500"
                    />
                    <select
                      value={newTodo.priority}
                      onChange={(e) => setNewTodo({ ...newTodo, priority: e.target.value as 'low' | 'medium' | 'high' })}
                      className="px-4 py-2 rounded-lg border-2 border-indigo-200 dark:border-indigo-700 bg-white dark:bg-gray-700 focus:border-indigo-500"
                    >
                      <option value="low">Low Priority</option>
                      <option value="medium">Medium Priority</option>
                      <option value="high">High Priority</option>
                    </select>
                  </div>
                  <Input
                    placeholder="Task description (optional)..."
                    value={newTodo.description}
                    onChange={(e) => setNewTodo({ ...newTodo, description: e.target.value })}
                    className="border-2 border-indigo-200 dark:border-indigo-700 focus:border-indigo-500"
                  />
                  <Button
                    onClick={addTodo}
                    className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-600 text-white font-bold py-3 text-base flex items-center justify-center gap-2"
                  >
                    <Plus size={20} />
                    Add Task
                  </Button>
                </div>
              </CardContent>
            </Card>
          </AnimatedDiv>

          {/* Search and Filter */}
          <AnimatedDiv direction="up" delay={0.3}>
            <Card className="mb-8 bg-gradient-to-b from-white to-purple-50/50 dark:from-gray-800/50 dark:to-purple-900/20 border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-4 items-center">
                  <div className="flex-1 w-full">
                    <Input
                      placeholder="Search tasks..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="border-2 border-indigo-200 dark:border-indigo-700 focus:border-indigo-500"
                    />
                  </div>
                  <div className="flex gap-2 flex-wrap justify-center md:justify-end">
                    {(['all', 'active', 'completed'] as const).map((f) => (
                      <Button
                        key={f}
                        variant={filter === f ? 'default' : 'outline'}
                        onClick={() => setFilter(f)}
                        className={filter === f ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white' : ''}
                      >
                        {f.charAt(0).toUpperCase() + f.slice(1)}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </AnimatedDiv>

          {/* Todos List */}
          <AnimatedDiv direction="up" delay={0.4}>
            <Card className="bg-gradient-to-b from-white to-purple-50/50 dark:from-gray-800/50 dark:to-purple-900/20 border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
                  All Tasks ({filteredTodos.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                {filteredTodos.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-indigo-800 dark:text-indigo-400 text-lg">No tasks found</p>
                  </div>
                ) : (
                  <div className="space-y-3 max-h-[600px] overflow-y-auto">
                    {filteredTodos.map((todo) => (
                      <motion.div
                        key={todo.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="flex items-center gap-4 p-4 bg-white dark:bg-gray-700/50 rounded-lg border border-indigo-100 dark:border-indigo-900 hover:shadow-md transition-all"
                      >
                        <Checkbox
                          checked={todo.completed}
                          onChange={() => toggleTodo(todo.id)}
                          className="w-5 h-5"
                        />
                        <div className="flex-1 cursor-pointer" onClick={() => toggleTodo(todo.id)}>
                          <p className={`font-semibold ${todo.completed ? 'line-through text-gray-400' : 'text-gray-900 dark:text-white'}`}>
                            {todo.title}
                          </p>
                          {todo.description && (
                            <p className="text-sm text-gray-600 dark:text-gray-400">{todo.description}</p>
                          )}
                        </div>
                        <Badge className={`
                          ${todo.priority === 'high' ? 'bg-red-500 hover:bg-red-600' : ''}
                          ${todo.priority === 'medium' ? 'bg-yellow-500 hover:bg-yellow-600' : ''}
                          ${todo.priority === 'low' ? 'bg-green-500 hover:bg-green-600' : ''}
                          text-white
                        `}>
                          {todo.priority}
                        </Badge>
                        <Button
                          variant="ghost"
                          onClick={() => deleteTodo(todo.id)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                        >
                          🗑️
                        </Button>
                      </motion.div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </AnimatedDiv>
        </div>
      </div>
    </ProtectedRoute>
  );
}