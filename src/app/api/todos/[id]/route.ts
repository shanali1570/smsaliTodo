import { connectDB } from '@/lib/mongoose'
import Todo from '@/models/Todo'
import { NextResponse } from 'next/server'

// ✅ PATCH
export async function PATCH(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params
  await connectDB()

  const body = await req.json()
  const updateFields: { text?: string; done?: boolean } = {}

  if (typeof body.text === 'string') updateFields.text = body.text
  if (typeof body.done === 'boolean') updateFields.done = body.done

  const updated = await Todo.findByIdAndUpdate(id, updateFields, { new: true })
  return NextResponse.json(updated)
}

// ✅ DELETE
export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params
  await connectDB()

  await Todo.findByIdAndDelete(id)
  return NextResponse.json({ message: 'Todo deleted' })
}
