import mongoose, { Schema } from 'mongoose'

const todoSchema = new Schema(
  {
    text: { type: String, required: true },
    done: { type: Boolean, default: false }
  },
  { timestamps: true }
)

const Todo = mongoose.models.Todo || mongoose.model("Todo", todoSchema)

export default Todo
