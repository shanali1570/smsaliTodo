'use client'

import { useState } from 'react'

type Todo = {
  id: number
  text: string
  done: boolean
}

export default function TodoWithEdit() {
  const [input, setInput] = useState('')
  const [todos, setTodos] = useState<Todo[]>([])
  const [editId, setEditId] = useState<number | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    if (editId !== null) {
      // Update existing todo
      const updated = todos.map(todo =>
        todo.id === editId ? { ...todo, text: input } : todo
      )
      setTodos(updated)
      setEditId(null)
    } else {
      // Add new todo
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
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    )
  }

  const handleEdit = (todo: Todo) => {
    setInput(todo.text)
    setEditId(todo.id)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold text-center text-gray-800">
          Step 5: Edit Todo
        </h1>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 mt-6">
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
              editId !== null
                ? 'bg-purple-600 hover:bg-purple-700'
                : 'bg-blue-600 hover:bg-blue-700'
            } text-white px-4 py-2 rounded transition duration-200`}
          >
            {editId !== null ? 'Update' : 'Add'}
          </button>
        </form>

        {/* Show Todos */}
        <ul className="mt-6 space-y-2">
          {todos.map(todo => (
            <li
              key={todo.id}
              className="bg-gray-50 p-3 rounded border border-gray-300 flex justify-between items-center shadow-sm"
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
