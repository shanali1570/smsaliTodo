"use client"

import { useEffect, useState } from "react"

// MongoDB Todo type
interface Todo {
  _id: string
  text: string
  done: boolean
}

export default function TodoMongo() {
  const [input, setInput] = useState("")
  const [todos, setTodos] = useState<Todo[]>([])
  const [editId, setEditId] = useState<string | null>(null)

  // ✅ Load from MongoDB
  const fetchTodos = async () => {
    const res = await fetch("/api/todos")
    const data = await res.json()
    setTodos(data)
  }

  useEffect(() => {
    fetchTodos()
  }, [])

  // ✅ Add or Edit Todo
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

  // ✅ Delete Todo
  const handleDelete = async (id: string) => {
    await fetch(`/api/todos/${id}`, { method: "DELETE" })
    setTodos(todos.filter(todo => todo._id !== id))
  }

  // ✅ Mark as done / undo
  const handleToggleDone = async (id: string, done: boolean) => {
    const res = await fetch(`/api/todos/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ done: !done })
    })
    const updated = await res.json()
    setTodos(todos.map(todo => (todo._id === id ? updated : todo)))
  }

  // ✅ Edit mode
  const handleEdit = (todo: Todo) => {
    setInput(todo.text)
    setEditId(todo._id)
  }

  return (
    <div className="p-6 max-w-md mx-auto bg-white min-h-screen">
      <h1 className="text-2xl font-bold text-center">Step 7: MongoDB Version</h1>

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
          {editId ? "Update" : "Add"}
        </button>
      </form>

      {/* List */}
      <ul className="mt-6 space-y-2">
        {todos.map(todo => (
          <li
            key={todo._id}
            className="bg-gray-100 p-2 rounded border border-gray-300 flex justify-between items-center"
          >
            <span className={todo.done ? "line-through text-gray-500" : ""}>
              {todo.text}
            </span>

            <div className="flex gap-2">
              <button
                onClick={() => handleToggleDone(todo._id, todo.done)}
                className="bg-green-500 text-white px-3 py-1 rounded"
              >
                {todo.done ? "Undo" : "Done"}
              </button>

              <button
                onClick={() => handleEdit(todo)}
                className="bg-yellow-500 text-white px-3 py-1 rounded"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(todo._id)}
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
