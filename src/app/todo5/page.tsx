'use client';

// ✅ Task 5: Edit Todo
// 🎯 Goal:

// Har todo ke sath Edit button ho

// Jab Edit dabao:

// Text input me purana text ajaye

// Button ka naam ho Update

// Jab Update dabao:

// Text update ho jaye list me

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
  const [editId, setEditId] = useState<number | null>(null) // kis todo ko edit karna hai

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    if (editId !== null) {
      // ✅ Editing existing todo
      const updated = todos.map(todo =>
        todo.id === editId ? { ...todo, text: input } : todo
      )
      setTodos(updated)
      setEditId(null) // editing end
    } else {
      // ✅ Adding new todo
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
    setInput(todo.text)     // input box me text dikhaye
    setEditId(todo.id)      // id save karein editing ke liye
  }

  return (
    <div className="p-6 max-w-md mx-auto bg-white min-h-screen">
      <h1 className="text-2xl font-bold text-center">Step 5: Edit Todo</h1>

      {/* Input Form */}
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
                onClick={() => handleEdit(todo)}
                className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
              >
                Edit
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
