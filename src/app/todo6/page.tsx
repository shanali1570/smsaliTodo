'use client'

// ✅ Task 6: LocalStorage Integration
// 🎯 Goal:

// App band karo ya page reload karo → todos wapis milain

// Sab data browser ke andar localStorage me save hoga

import { useEffect, useState } from 'react'

type Todo = {
  id: number
  text: string
  done: boolean
}

export default function TodoWithLocalStorage() {
  const [input, setInput] = useState('')
  const [todos, setTodos] = useState<Todo[]>([])
  const [editId, setEditId] = useState<number | null>(null)

  // ✅ Load todos from localStorage
  useEffect(() => {
    const savedTodos = localStorage.getItem('todos')
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos))
    }
  }, [])

  // ✅ Save todos whenever they change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    if (editId !== null) {
      const updated = todos.map(todo =>
        todo.id === editId ? { ...todo, text: input } : todo
      )
      setTodos(updated)
      setEditId(null)
    } else {
      const newTodo: Todo = {
        id: Date.now(),
        text: input,
        done: false
      }
      setTodos([newTodo, ...todos])
    }

    setInput('')
  }

  const handleDelete = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  const handleToggleDone = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, done: !todo.done } : todo
    ))
  }

  const handleEdit = (todo: Todo) => {
    setInput(todo.text)
    setEditId(todo.id)
  }

  return (
    <div className="p-6 max-w-md mx-auto bg-white min-h-screen">
      <h1 className="text-2xl font-bold text-center">Step 6: LocalStorage</h1>

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex gap-2 mt-4">
        <input
          type="text"
          placeholder="Type or edit todo..."
          className="border border-gray-300 p-2 rounded w-full"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {editId !== null ? 'Update' : 'Add'}
        </button>
      </form>

      {/* List */}
      <ul className="mt-6 space-y-2">
        {todos.map(todo => (
          <li
            key={todo.id}
            className="bg-gray-100 p-2 rounded border border-gray-300 flex justify-between items-center"
          >
            <span className={todo.done ? 'line-through text-gray-500' : ''}>
              {todo.text}
            </span>

            <div className="flex gap-2">
              <button
                onClick={() => handleToggleDone(todo.id)}
                className="bg-green-500 text-white px-3 py-1 rounded"
              >
                {todo.done ? 'Undo' : 'Done'}
              </button>

              <button
                onClick={() => handleEdit(todo)}
                className="bg-yellow-500 text-white px-3 py-1 rounded"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(todo.id)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
