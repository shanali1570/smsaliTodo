'use client'

import { useState } from 'react'

export default function TodoList() {
  const [input, setInput] = useState('')
  const [todos, setTodos] = useState<string[]>([])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return
    setTodos([input, ...todos])
    setInput('')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold text-center text-gray-800">
          Step 2: Show Todo List
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
          {todos.map((todo, index) => (
            <li
              key={index}
              className="bg-gray-100 p-3 rounded border border-gray-300 shadow-sm hover:shadow-md transition duration-150"
            >
              {todo}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
