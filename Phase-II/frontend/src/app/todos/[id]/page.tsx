'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import { Checkbox } from '@/components/ui/Checkbox';
import { FormField, Form } from '@/components/forms/Form';
import { AnimatedDiv } from '@/components/animations';
import { Todo } from '@/types/todo';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function TodoDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [todo, setTodo] = useState<Todo | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    title: '',
    description: '',
    completed: false,
    priority: 'medium' as 'low' | 'medium' | 'high',
  });

  // In a real app, this would come from an API
  useEffect(() => {
    // Mock data for demo purposes
    const mockTodos: Todo[] = [
      {
        id: '1',
        title: 'Complete project proposal',
        description: 'Finish the proposal document for the new project. This is a high priority task that needs to be completed by Friday.',
        completed: false,
        createdAt: new Date(Date.now() - 86400000).toISOString(), // yesterday
        updatedAt: new Date(Date.now() - 43200000).toISOString(), // 12 hours ago
        priority: 'high',
        tags: ['work', 'important', 'deadline'],
        userId: 'user1',
      },
      {
        id: '2',
        title: 'Buy groceries',
        description: 'Milk, eggs, bread, fruits, vegetables, and snacks for the weekend.',
        completed: true,
        createdAt: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
        updatedAt: new Date(Date.now() - 86400000).toISOString(), // yesterday
        priority: 'medium',
        tags: ['personal', 'shopping'],
        userId: 'user1',
      },
      {
        id: '3',
        title: 'Schedule meeting',
        description: 'With the team to discuss Q1 goals and objectives. Need to prepare agenda beforehand.',
        completed: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        priority: 'high',
        tags: ['work', 'meeting', 'team'],
        userId: 'user1',
      },
      {
        id: '4',
        title: 'Read new book chapter',
        description: 'Continue reading the new tech book about React patterns and best practices.',
        completed: false,
        createdAt: new Date(Date.now() - 259200000).toISOString(), // 3 days ago
        updatedAt: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
        priority: 'low',
        tags: ['personal', 'learning', 'reading'],
        userId: 'user1',
      },
    ];

    const foundTodo = mockTodos.find(t => t.id === id);
    if (foundTodo) {
      setTodo(foundTodo);
      setEditData({
        title: foundTodo.title,
        description: foundTodo.description || '',
        completed: foundTodo.completed,
        priority: foundTodo.priority,
      });
    } else {
      // If todo not found, redirect to todos page
      router.push('/todos');
    }
  }, [id, router]);

  const handleSave = () => {
    if (!todo) return;

    const updatedTodo: Todo = {
      ...todo,
      title: editData.title,
      description: editData.description,
      completed: editData.completed,
      priority: editData.priority,
      updatedAt: new Date().toISOString(),
    };

    setTodo(updatedTodo);
    setIsEditing(false);
  };

  const toggleCompletion = () => {
    if (!todo) return;
    
    const updatedTodo = {
      ...todo,
      completed: !todo.completed,
      updatedAt: new Date().toISOString()
    };
    
    setTodo(updatedTodo);
  };

  if (!todo) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground p-4 md:p-8">
      <div className="max-w-3xl mx-auto">
        <AnimatedDiv direction="down" delay={0.1}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" asChild>
                  <Link href="/todos">
                    <ArrowLeft className="h-4 w-4" />
                  </Link>
                </Button>
                <CardTitle>Todo Detail</CardTitle>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={toggleCompletion}>
                  {todo.completed ? 'Mark Incomplete' : 'Mark Complete'}
                </Button>
                <Button onClick={() => setIsEditing(!isEditing)}>
                  {isEditing ? 'Cancel' : 'Edit'}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {isEditing ? (
                <Form onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
                  <FormField label="Title" htmlFor="title" required>
                    <Input
                      id="title"
                      value={editData.title}
                      onChange={(e) => setEditData({...editData, title: e.target.value})}
                    />
                  </FormField>

                  <FormField label="Description" htmlFor="description">
                    <Input
                      id="description"
                      value={editData.description}
                      onChange={(e) => setEditData({...editData, description: e.target.value})}
                    />
                  </FormField>

                  <div className="flex items-center space-x-2 my-4">
                    <Checkbox
                      id="completed"
                      checked={editData.completed}
                      onCheckedChange={(checked) => setEditData({...editData, completed: Boolean(checked)})}
                    />
                    <label htmlFor="completed" className="text-sm font-medium">
                      Completed
                    </label>
                  </div>

                  <FormField label="Priority" htmlFor="priority">
                    <select
                      id="priority"
                      value={editData.priority}
                      onChange={(e) => setEditData({...editData, priority: e.target.value as 'low' | 'medium' | 'high'})}
                      className="w-full p-2 border rounded-md bg-background text-foreground"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </FormField>

                  <div className="mt-6 flex space-x-2">
                    <Button onClick={handleSave}>Save Changes</Button>
                    <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
                  </div>
                </Form>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div>
                    <div className="flex flex-wrap items-center gap-4 mb-4">
                      <h2 className="text-2xl font-bold">{todo.title}</h2>
                      <Badge
                        variant={todo.priority === 'high' ? 'destructive' : todo.priority === 'medium' ? 'default' : 'secondary'}
                      >
                        {todo.priority}
                      </Badge>
                      <Badge variant={todo.completed ? 'secondary' : 'outline'}>
                        {todo.completed ? 'Completed' : 'Pending'}
                      </Badge>
                    </div>
                  </div>

                  {todo.description && (
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Description</h3>
                      <p className="text-neutral-700 dark:text-neutral-300 bg-neutral-50 dark:bg-neutral-900 p-4 rounded-md">
                        {todo.description}
                      </p>
                    </div>
                  )}

                  {todo.tags && todo.tags.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Tags</h3>
                      <div className="flex flex-wrap gap-2">
                        {todo.tags.map(tag => (
                          <Badge key={tag} variant="outline">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-neutral-600 dark:text-neutral-400">
                    <div className="bg-neutral-50 dark:bg-neutral-900 p-4 rounded-md">
                      <p className="font-medium">Created</p>
                      <p>{new Date(todo.createdAt).toLocaleString()}</p>
                    </div>
                    <div className="bg-neutral-50 dark:bg-neutral-900 p-4 rounded-md">
                      <p className="font-medium">Updated</p>
                      <p>{new Date(todo.updatedAt).toLocaleString()}</p>
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <Button variant="outline" asChild>
                      <Link href="/todos">← Back to Todos</Link>
                    </Button>
                  </div>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </AnimatedDiv>
      </div>
    </div>
  );
}