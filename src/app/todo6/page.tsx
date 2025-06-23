'use client'

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

  // ✅ Load from localStorage once on first render
  useEffect(() => {
    const saved = localStorage.getItem('todos')
    if (saved) {
      setTodos(JSON.parse(saved))
    }
  }, [])

  // ✅ Save todos to localStorage when todos change
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
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">
          Step 6: LocalStorage
        </h1>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            placeholder="Type or edit todo..."
            className="border border-gray-300 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            type="submit"
            className={`${
              editId !== null ? 'bg-purple-600 hover:bg-purple-700' : 'bg-blue-600 hover:bg-blue-700'
            } text-white px-4 py-2 rounded transition`}
          >
            {editId !== null ? 'Update' : 'Add'}
          </button>
        </form>

        {/* Todo List */}
        <ul className="mt-6 space-y-2">
          {todos.map(todo => (
            <li
              key={todo.id}
              className="bg-gray-50 p-3 rounded border border-gray-300 flex justify-between items-center"
            >
              <span className={todo.done ? 'line-through text-gray-400 italic' : 'text-gray-800'}>
                {todo.text}
              </span>

              <div className="flex gap-2">
                <button
                  onClick={() => handleToggleDone(todo.id)}
                  className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded transition"
                >
                  {todo.done ? 'Undo' : 'Done'}
                </button>

                <button
                  onClick={() => handleEdit(todo)}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded transition"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(todo.id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
