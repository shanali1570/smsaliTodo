'use client'

// ✅ Task 1: Simple Input Box + Button
// 🎯 Goal:

// Input box me text likho

// "Add" button pe click karo

// Console me likha hua text print ho



import { useState } from 'react'

export default function TodoInputOnly() {
  const [input, setInput] = useState('') // Input ka state

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("User ne likha:", input)
    setInput('') // Input box clear
  }

  return (
    <div className="p-6 max-w-md mx-auto bg-white">
      <h1 className="text-2xl font-bold text-center">Step 1: Input Only</h1>

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
    </div>
  )
}

