import type { Metadata } from "next"
import { TodoListForm } from "@/components/todo-list-form"

export const metadata: Metadata = {
  title: "Create Todo List",
  description: "Create a new todo list with accountability partners",
}

export default function CreatePage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold tracking-tight mb-8">Create Todo List</h1>
      <TodoListForm />
    </div>
  )
}

