"use client"

// ✅ Task 2: Add Todo to List & Show on Screen
// 🎯 Goal:

// Jo user likhe, wo screen pe list ki form me nazar aaye

// Har new todo list ke top pe aaye

// Abhi sirf show karna hai — delete/edit/done nahi


import { useState } from 'react'

export default function TodoList() {
  const [input, setInput] = useState('')
  const [todos, setTodos] = useState<string[]>([]) // sirf text ka array

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!input.trim()) return

    // Add new todo
    setTodos([input, ...todos])
    setInput('') // clear input
  }

  return (
    <div className="p-6 max-w-md mx-auto bg-white min-h-screen">
      <h1 className="text-2xl font-bold text-center">Step 2: Show Todo List</h1>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="flex gap-2 mt-4">
        <input
          type="text"
          placeholder="Type something..."
          className="border border-gray-300 p-2 rounded w-full"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add
        </button>
      </form>

      {/* Show Todos */}
      <ul className="mt-6 space-y-2">
        {todos.map((todo, index) => (
          <li
            key={index}
            className="bg-gray-100 p-2 rounded border border-gray-300"
          >
            {todo}
          </li>
        ))}
      </ul>
    </div>
  )
}
