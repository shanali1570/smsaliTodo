import { connectDB } from '@/lib/mongoose'
import Todo from '@/models/Todo'

export async function GET() {
  await connectDB()
  const todos = await Todo.find().sort({ createdAt: -1 })
  return Response.json(todos)
}

export async function POST(req: Request) {
  await connectDB()
  const { text } = await req.json()
  const newTodo = await Todo.create({ text })
  return Response.json(newTodo)
}
