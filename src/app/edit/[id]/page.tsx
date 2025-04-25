import type { Metadata } from "next"
import { TodoListForm } from "@/components/todo-list-form"

export const metadata: Metadata = {
  title: "Edit Todo List",
  description: "Edit your todo list and accountability partners",
}

// Mock data - would come from Firebase in the real app
const mockTodoLists = [
  {
    id: "1",
    title: "Fitness Goals",
    description: "My workout and nutrition plan",
    tasks: [
      { id: "t1", text: "Go to the gym 3x this week", completed: false, nudges: 2 },
      { id: "t2", text: "Meal prep on Sunday", completed: true, nudges: 0 },
      { id: "t3", text: "Track calories daily", completed: false, nudges: 1 },
    ],
    partners: [
      { id: "p1", name: "Alex", phone: "+1234567890", confirmed: true },
      { id: "p2", name: "Jamie", phone: "+0987654321", confirmed: false },
    ],
  },
  {
    id: "2",
    title: "Work Projects",
    description: "Deadlines and milestones",
    tasks: [
      { id: "t4", text: "Complete project proposal", completed: false, nudges: 0 },
      { id: "t5", text: "Schedule client meeting", completed: false, nudges: 0 },
    ],
    partners: [{ id: "p3", name: "Taylor", phone: "+1122334455", confirmed: true }],
  },
]

export default function EditPage({ params }) {
  // In a real app, you would fetch this from Firebase
  const todoList = mockTodoLists.find((list) => list.id === params.id)

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold tracking-tight mb-8">Edit Todo List</h1>
      <TodoListForm existingList={todoList} />
    </div>
  )
}

