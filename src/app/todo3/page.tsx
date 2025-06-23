'use client';

// ✅ Task 3: Add Delete Button to Remove Todo
// 🎯 Goal:

// Har todo ke sath ek Delete button ho

// Jab button dabao → wo todo list se hata diya jaye


import { useState } from 'react'

export default function TodoListWithDelete() {
  const [input, setInput] = useState('')
  const [todos, setTodos] = useState<{ id: number; text: string }[]>([])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!input.trim()) return

    const newTodo = {
      id: Date.now(),  // unique ID
      text: input
    }

    setTodos([newTodo, ...todos])
    setInput('')
  }

  const handleDelete = (id: number) => {
    const updated = todos.filter(todo => todo.id !== id)
    setTodos(updated)
  }

  return (
    <div className="p-6 max-w-md mx-auto bg-white min-h-screen">
      <h1 className="text-2xl font-bold text-center">Step 3: Delete Todo</h1>

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
        {todos.map(todo => (
          <li
            key={todo.id}
            className="bg-gray-100 p-2 rounded border border-gray-300 flex justify-between items-center"
          >
            <span>{todo.text}</span>
            <button
              onClick={() => handleDelete(todo.id)}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
