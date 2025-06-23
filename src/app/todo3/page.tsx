'use client'

import { useState } from 'react'

export default function TodoListWithDelete() {
  const [input, setInput] = useState('')
  const [todos, setTodos] = useState<{ id: number; text: string }[]>([])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const newTodo = {
      id: Date.now(),
      text: input
    }

    setTodos([newTodo, ...todos])
    setInput('')
  }

  const handleDelete = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold text-center text-gray-800">
          Step 3: Delete Todo
        </h1>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 mt-6">
          <input
            type="text"
            placeholder="Type something..."
            className="border border-gray-300 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-200"
          >
            Add
          </button>
        </form>

        {/* Show Todos */}
        <ul className="mt-6 space-y-2">
          {todos.map(todo => (
            <li
              key={todo.id}
              className="bg-gray-50 p-3 rounded border border-gray-300 shadow-sm flex justify-between items-center"
            >
              <span className="text-gray-800">{todo.text}</span>
              <button
                onClick={() => handleDelete(todo.id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition duration-200"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
