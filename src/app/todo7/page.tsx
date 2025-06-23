"use client"

import { useEffect, useState } from "react"

interface Todo {
  _id: string
  text: string
  done: boolean
}

export default function TodoMongo() {
  const [input, setInput] = useState("")
  const [todos, setTodos] = useState<Todo[]>([])
  const [editId, setEditId] = useState<string | null>(null)

  const fetchTodos = async () => {
    const res = await fetch("/api/todos")
    const data = await res.json()
    setTodos(data)
  }

  useEffect(() => {
    fetchTodos()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    if (editId) {
      const res = await fetch(`/api/todos/${editId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: input })
      })
      const updated = await res.json()
      setTodos(todos.map(todo => (todo._id === editId ? updated : todo)))
      setEditId(null)
    } else {
      const res = await fetch("/api/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: input })
      })
      const newTodo = await res.json()
      setTodos([newTodo, ...todos])
    }

    setInput("")
  }

  const handleDelete = async (id: string) => {
    await fetch(`/api/todos/${id}`, { method: "DELETE" })
    setTodos(todos.filter(todo => todo._id !== id))
  }

  const handleToggleDone = async (id: string, done: boolean) => {
    const res = await fetch(`/api/todos/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ done: !done })
    })
    const updated = await res.json()
    setTodos(todos.map(todo => (todo._id === id ? updated : todo)))
  }

  const handleEdit = (todo: Todo) => {
    setInput(todo.text)
    setEditId(todo._id)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">
          Step 7: MongoDB Version
        </h1>

        {/* Form */}
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
              editId ? 'bg-purple-600 hover:bg-purple-700' : 'bg-blue-600 hover:bg-blue-700'
            } text-white px-4 py-2 rounded transition`}
          >
            {editId ? 'Update' : 'Add'}
          </button>
        </form>

        {/* Todo List */}
        <ul className="mt-6 space-y-2">
          {todos.map(todo => (
            <li
              key={todo._id}
              className="bg-gray-50 p-3 rounded border border-gray-300 flex justify-between items-center"
            >
              <span className={todo.done ? 'line-through text-gray-400 italic' : 'text-gray-800'}>
                {todo.text}
              </span>

              <div className="flex gap-2">
                <button
                  onClick={() => handleToggleDone(todo._id, todo.done)}
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
                  onClick={() => handleDelete(todo._id)}
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
