'use client';

// ✅ Task 4: Mark as Done / Undo
// 🎯 Goal:

// Har todo ke sath ek "Done" button ho

// Jab button dabao, todo line-through ho jaye (jaise cut hua text)

// Dobara dabao to Undo ho jaye


'use client'
import { useState } from 'react'

type Todo = {
  id: number
  text: string
  done: boolean
}

export default function TodoWithDone() {
  const [input, setInput] = useState('')
  const [todos, setTodos] = useState<Todo[]>([])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const newTodo: Todo = {
      id: Date.now(),
      text: input,
      done: false
    }

    setTodos([newTodo, ...todos])
    setInput('')
  }

  const handleDelete = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  const handleToggleDone = (id: number) => {
    const updated = todos.map(todo =>
      todo.id === id ? { ...todo, done: !todo.done } : todo
    )
    setTodos(updated)
  }

  return (
    <div className="p-6 max-w-md mx-auto bg-white min-h-screen">
      <h1 className="text-2xl font-bold text-center">Step 4: Mark as Done</h1>

      {/* Input */}
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
            <span className={todo.done ? 'line-through text-gray-500' : ''}>
              {todo.text}
            </span>

            <div className="flex gap-2">
              <button
                onClick={() => handleToggleDone(todo.id)}
                className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
              >
                {todo.done ? 'Undo' : 'Done'}
              </button>

              <button
                onClick={() => handleDelete(todo.id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
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
